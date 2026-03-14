(function(){const m=document.createElement("link").relList;if(m&&m.supports&&m.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const p of t)if(p.type==="childList")for(const s of p.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function e(t){const p={};return t.integrity&&(p.integrity=t.integrity),t.referrerPolicy&&(p.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?p.credentials="include":t.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(t){if(t.ep)return;t.ep=!0;const p=e(t);fetch(t.href,p)}})();const U={da:{selectLanguage:"Vælg sprog",title:"Træning i dansk",subtitle:"Vælg en kategori for at starte din træning.",dagensOpgave:"Dagens Opgave",dagensOpgaveDesc:"Nyt emne, ny grammatik. Løs opgaven!",modulTest:"Træning til modultest",modulTestDesc:"Forskellige opgaver samlet på ét sted.",notes:"Undervisningsnoter",notesDesc:"Læs og øv noter fra undervisningen.",lavSporgsmal:"Lav spørgsmål",lavSporgsmalDesc:"Lær at stille præcise spørgsmål ud fra billeder.",lavSporgsmalBtnText:"Lav spørgsmål - tryk her",samtaleTraening:"Samtaletræning",samtaleTraeningDesc:"Øv dine samtaler og få hjælp til dit dansk.",skriveHjaelp:"Skrivehjælp",skriveHjaelpDesc:"Indsæt din tekst og få feedback uden svar.",verbumLearning:"Lær danske verber",verbumLearningDesc:"Træn de 100 mest almindelige danske udsagnsord.",phase2_instruction:"Gæt verbet ud fra definitionen.",back:"Tilbage",enterPassword:"Indtast adgangskode for at se indholdet:",du1mod3:"DU1, modul 3 og 4",du2mod1:"DU2, modul 1",smaahistorier:"Små historier",du2mod5:"DU2, modul 5",emailLaan:"E-mail om lån",opdragelse:"Historie om opdragelse",enKlage:"En klage",du3mod4:"DU3, modul 4",laerEtNytOrd:"Lær et nyt ord",laerEtNytOrdDesc:"Udforsk hvordan ord hænger sammen i netværk.",wordNetworkExplanation:"Ord er forbundet med andre ord. Det hjælper dig til at huske ordet meget bedre, når du ved hvordan ordet er forbundet til andre ord.",targetWord:"Hund",hypernym:"Overbegreb",hypernymWord:"Dyr",synonym:"Synonym",synonymWord:"Vovse",antonym:"Antonym",antonymWord:"Kat",hyponym:"Underbegreb",hyponymWord:"Puddel",geminiBtnText:"Lær et ord - tryk her",geminiConsentText:"Ved at klikke på dette link er du indforstået med at du bruger et af Googles produkter og at Google træner kunstig intelligens med dine svar.",hverdagssamtale:"Hverdagssamtale",hverdagssamtaleDesc:"Øv dig i almindelige samtaler om hverdagen.",samtaleBolig:"Samtale om bolig",samtaleArbejde:"Samtale om arbejde",samtaleBtnText:"Start samtalen - tryk her",skriveHjaelpBtnText:"Skrivehjælp - tryk her",du1mod3Desc:"Vælg et emne at øve.",minHverdag:"Min hverdag",minBolig:"Min bolig",mitArbejde:"Mit arbejde",minHverdagDesc:"Opgaver om din dagligdag.",transportSprogskole:"Transport til sprogskolen",madlavning:"Madlavning",rengoering:"Rengøring",transportDesc:"Hvordan kommer du i skole?",padletDesc:"Del med klassen, hvordan du kommer til sprogskolen i dag.",padletBtnText:"Åbn Padlet",madlavningDesc:"Hvad kan du lide at lave af mad?",madlavningPadletDesc:"Del dine madoplevelser med klassen her.",rengoeringDesc:"Hvordan gør du rent?",rengoeringPadletDesc:"Del dine tanker om rengøring med klassen.",traenTidsudtryk:"Træn tidsudtryk",traenTidsudtrykDesc:"Hvordan bruger man forskellige tidsudtryk på dansk?",traenTidsudtrykBtnText:"Åbn tidsudtryk øvelse",ordstilling:"Ordstilling",ordstillingDesc:"Ryk rundt på ordene og sæt dem i den rigtige rækkefølge.",checkResult:"Tjek svar",correctOrder:"Flot! Rækkefølgen er rigtig.",wrongOrder:"Ikke helt rigtigt. Prøv igen!",ordstillingLet:"Ordstilling (Let)",ordstillingSvaer:"Ordstilling (Mellemsvær)",levelA1:"A1 sætninger",levelA2:"A2 sætninger",traenGrammatik:"Træn grammatik",grammatikDesc:"Udfyld hullerne med de rigtige ord i teksten.",let:"Let (A1)",mellemsvaer:"Mellemsvær (A2)",svaer:"Svær (B1)",modultest:"Modultest",modultestLongDesc:"En længere tekst på 10 linjer. Find de rigtige ord i listen og udfyld hullerne.",grammatikIntro:"Vælg et niveau for at starte øvelsen.",checkAnswers:"Tjek alle svar",allCorrect:"Fantastisk! Alle svar er korrekte.",someWrong:"Nogle af dine svar er ikke helt rigtige. Prøv igen!",newExercise:"Næste tekst",hintMean:"Dette ord giver ikke mening i sammenhængen.",hintTense:"Tjek tiden. Er det nutid eller datid?",hintForm:"Tjek ordets bøjning (f.eks. en/et eller ental/flertal).",hintPerson:"Tjek hvem der gør noget (jeg, du, han/hun).",hintContext:"Læs hele teksten igen. Hvad passer bedst her?",hintName:"Her skal du bruge et ord om navne.",hintPlace:"Her skal du bruge et ord om steder.",hintAction:"Dette ord beskriver en anden handling.",hintAdj:"Tjek tillægsordet (beskrivelse af en ting).",hintAdverb:"Tjek biordet (tid, sted eller måde).",derErDetEr:"Der er / Det er?",derErExpl:"Der er' åbner døren for noget nyt. 'Det er' peger på det, vi kender.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Husk: 'Der er' (introduktion) vs 'Det er' (identifikation).",hvilketOrd:"Hvilket ord skal jeg vælge?",hvilketOrdDesc:"Træn pronominer (stedord) og verber (udsagnsord) i forskellige sammenhænge.",hanHamHans:"Han / Ham / Hans?",gårGikGået:"Går / gik / er gået?",verberM3:"Lær danske verber (Nutid)",hvilketVerbDesc:"Vælg en kategori for at træne verber.",pronominerSubjekt:"Subjekt (Fokus)",pronominerObjekt:"Objekt (Ikke-fokus)",pronominerPossessiv:"Possessiv (Ejer)",verberBevaegelse:"Bevægelse (gå, køre, komme)",verberHandling:"Handling (gøre, lave, bruge)",verberHjaelpe:"Hjælpeverber (kan, skal, vil)",verberTilstand:"Tilstand & Besiddelse (er, har)",verberInteraktion:"Social interaktion (sige, spørge)",verberIndreLiv:"Det indre liv (se, tænke, vide)",verberDatid:"Datid (uregelmæssige)",verberTider:"Datid vs. Førnutid (Punktet & Broen)",hintPronominer:"Tjek hvem der er i fokus eller hvem der ejer noget.",howToBuildSentence:"Hvordan bygger man en sætning?",howToBuildSentenceDesc:"Lær hvordan ord ankres til virkeligheden.",groundingIntro:"Uden grammatik svæver ord frit som balloner. Vi bruger grammatik til at ankre dem til virkeligheden (HER OG NU).",groundingStep1:"1. Konceptet (Ballonen): 'Barn' er bare en idé. Vi ved ikke hvilket barn.",groundingStep2:"2. Handlingen: 'At spise' er bare en idé. Vi ved ikke hvornår.",groundingStep3:"3. Ankeret: Brug små ord (kendeord) og tid (bøjning) til at trække ballonerne ned.",sentenceGround:"Virkelighedens jord",wellDone:"Flot! Du har nu bygget en sætning, der er forankret i virkeligheden."},en:{selectLanguage:"Select language",title:"Danish Training",subtitle:"Select a category to start your training.",dagensOpgave:"Daily Task",dagensOpgaveDesc:"New topic, new grammar. Solve the task!",modulTest:"Module Test Training",modulTestDesc:"Various tasks gathered in one place.",notes:"Teaching Notes",notesDesc:"Read and practice notes from class.",lavSporgsmal:"Make Questions",lavSporgsmalDesc:"Learn to ask precise questions based on pictures.",lavSporgsmalBtnText:"Make questions - click here",samtaleTraening:"Conversation Training",samtaleTraeningDesc:"Practice conversations and get help with your Danish.",skriveHjaelp:"Writing Help",skriveHjaelpDesc:"Insert your text and get feedback without answers.",back:"Back",enterPassword:"Enter password to view content:",du1mod3:"DU1, Module 3 and 4",du2mod1:"DU2, Module 1",smaahistorier:"Short stories",du2mod5:"DU2, Module 5",emailLaan:"E-mail about loan",opdragelse:"Story about upbringing",enKlage:"A complaint",du3mod4:"DU3, Module 4",laerEtNytOrd:"Learn a new word",laerEtNytOrdDesc:"Explore how words are connected in networks.",wordNetworkExplanation:"Words are connected to other words. It helps you remember the word much better when you know how the word is connected to other words.",targetWord:"Dog",hypernym:"Hypernym",hypernymWord:"Animal",synonym:"Synonym",synonymWord:"Doggie",antonym:"Antonym",antonymWord:"Cat",hyponym:"Hyponym",hyponymWord:"Poodle",geminiBtnText:"Learn a word - click here",geminiConsentText:"By clicking this link, you agree that you are using a Google product and that Google trains artificial intelligence with your responses.",hverdagssamtale:"Everyday Conversation",hverdagssamtaleDesc:"Practice common everyday conversations.",samtaleBolig:"Conversation about housing",samtaleArbejde:"Conversation about work",samtaleBtnText:"Start conversation - click here",skriveHjaelpBtnText:"Writing help - click here",du1mod3Desc:"Choose a topic to practice.",minHverdag:"My everyday life",minBolig:"My housing",mitArbejde:"My work",minHverdagDesc:"Tasks about your daily life.",transportSprogskole:"Transport to language school",madlavning:"Cooking",rengoering:"Cleaning",transportDesc:"How do you get to school?",padletDesc:"Share with the class how you get to language school today.",padletBtnText:"Open Padlet",madlavningDesc:"What kind of food do you like to cook?",madlavningPadletDesc:"Share your cooking experiences with the class here.",rengoeringDesc:"How do you clean?",rengoeringPadletDesc:"Share your thoughts on cleaning with the class.",traenTidsudtryk:"Practice time expressions",traenTidsudtrykDesc:"How do you use different time expressions in Danish?",traenTidsudtrykBtnText:"Open time expressions exercise",ordstilling:"Word Order",ordstillingDesc:"Rearrange the words and put them in the correct order.",checkResult:"Check answer",correctOrder:"Great! The order is correct.",wrongOrder:"Not quite right. Try again!",ordstillingLet:"Word Order (Easy)",ordstillingSvaer:"Word Order (Medium)",levelA1:"A1 sentences",levelA2:"A2 sentences",traenGrammatik:"Practice Grammar",grammatikDesc:"Fill in the blanks with the correct words in the text.",let:"Easy (A1)",mellemsvaer:"Medium (A2)",svaer:"Hard (B1)",modultest:"Module Test",modultestLongDesc:"A longer 10-line text. Find the correct words in the list and fill in the blanks.",grammatikIntro:"Select a level to start the exercise.",checkAnswers:"Check all answers",allCorrect:"Fantastic! All answers are correct.",someWrong:"Some of your answers are not quite right. Try again!",newExercise:"Next text",hintMean:"This word doesn't make sense in this context.",hintTense:"Check the tense. Is it present or past?",hintForm:"Check the word form (e.g., gender or singular/plural).",hintPerson:"Check who is performing the action (I, you, he/she).",hintContext:"Read the whole text again. What fits best here?",hintName:"You need a word for names here.",hintPlace:"You need a word for places here.",hintAction:"This word describes a different action.",hintAdj:"Check the adjective (description of a thing).",hintAdverb:"Check the adverb (time, place, or manner).",derErDetEr:"Der er / Det er?",derErExpl:"'Der er' opens the door for new info. 'Det er' points to what we know.",derErIntro1:"Der er en bil på gaden.",derErIntro2:"Det er en flot bil.",hintDerDet:"Remember: 'Der er' (intro) vs 'Det er' (identification).",hvilketOrd:"Which word should I choose?",hvilketOrdDesc:"Practice pronouns and verbs in different contexts.",hanHamHans:"He / Him / His?",gårGikGået:"Go / went / has gone?",verberM3:"Learn Danish Verbs (Present)",hvilketVerbDesc:"Choose a category to practice verbs.",pronominerSubjekt:"Subject (Focus)",pronominerObjekt:"Object (Non-focus)",pronominerPossessiv:"Possessive (Owner)",verberBevaegelse:"Movement (go, drive, come)",verberHandling:"Action (do, make, use)",verberHjaelpe:"Helping Verbs (can, must, will)",verberTilstand:"State & Possession (be, have)",verberInteraktion:"Social Interaction (say, ask)",verberIndreLiv:"Inner Life (see, think, know)",verberDatid:"Past Tense (irregular)",verberTider:"Past vs. Present Perfect (The Point & The Bridge)",hintPronominer:"Check who is in focus or who owns something.",howToBuildSentence:"How to build a sentence?",howToBuildSentenceDesc:"Learn how words are anchored to reality.",groundingIntro:"Without grammar, words float freely like balloons. We use grammar to anchor them to reality (HERE AND NOW).",groundingStep1:"1. The Concept (Balloon): 'Child' is just an idea. We don't know which child.",groundingStep2:"2. The Action: 'To eat' is just an idea. We don't know when.",groundingStep3:"3. The Anchor: Use small words (determiners) and tense (inflection) to pull the balloons down.",sentenceGround:"The ground of reality",wellDone:"Well done! You have now built a sentence anchored in reality."},ar:{selectLanguage:"اختر لغة",title:"التدريب على الدنماركية",subtitle:"اختر فئة لبدء التدريب الخاص بك.",dagensOpgave:"المهمة اليومية",dagensOpgaveDesc:"موضوع جديد، قواعد جديدة. حل المهمة!",modulTest:"تدريب اختبار الوحدة",modulTestDesc:"مهام مختلفة مجمعة في مكان واحد.",notes:"ملاحظات التدريس",notesDesc:"اقرأ وتدرب على الملاحظات من الفصل.",lavSporgsmal:"طرح أسئلة",lavSporgsmalDesc:"تعلم طرح أسئلة دقيقة بناءً على الصور.",lavSporgsmalBtnText:"طرح الأسئلة - اضغط هنا",samtaleTraening:"تدريب المحادثة",samtaleTraeningDesc:"تمرن على المحادثات واحصل على مساعدة في الدنماركية.",skriveHjaelp:"مساعدة في الكتابة",skriveHjaelpDesc:"أدخل نصك واحصل على ملاحظات بدون إجابات.",back:"رجوع",du1mod3:"DU1، الوحدة 3 و 4",du2mod1:"DU2، الوحدة 1",du3mod4:"DU3، الوحدة 4",laerEtNytOrd:"تعلم كلمة جديدة",laerEtNytOrdDesc:"استكشف كيف ترتبط الكلمات في شبكات.",wordNetworkExplanation:"الكلمات مرتبطة بكلمات أخرى. يساعدك ذلك على تذكر الكلمة بشكل أفضل عندما تعرف كيف ترتبط الكلمة بكلمات أخرى.",targetWord:"كلب",hypernym:"مفهوم شامل (Hypernym)",hypernymWord:"حيوان",synonym:"مرادف",synonymWord:"كلب صغير",antonym:"مضاد",antonymWord:"قطة",hyponym:"مفهوم فرعي (Hyponym)",hyponymWord:"بودل",geminiBtnText:"تعلم كلمة - اضغط هنا",geminiConsentText:"بالنقر على هذا الرابط، فإنك توافق على استخدامك لمنتج من Google وأن Google تقوم بتدريب الذكاء الاصطناعي باستخدام إجاباتك.",hverdagssamtale:"محادثة يومية",hverdagssamtaleDesc:"تدرب على المحادثات اليومية الشائعة.",samtaleBolig:"محادثة حول السكن",samtaleArbejde:"محادثة حول العمل",samtaleBtnText:"ابدأ المحادثة - اضغط هنا",skriveHjaelpBtnText:"مساعدة في الكتابة - اضغط هنا",du1mod3Desc:"اختر موضوعًا للتدرب عليه.",minHverdag:"حياتي اليومية",minBolig:"سكني",mitArbejde:"عملي",minHverdagDesc:"مهام حول حياتك اليومية.",transportSprogskole:"النقل إلى مدرسة اللغة",madlavning:"طبخ",rengoering:"تنظيف",transportDesc:"كيف تذهب إلى المدرسة؟",padletDesc:"شارك مع الفصل كيف تذهب إلى مدرسة اللغة اليوم.",padletBtnText:"افتح بادليت",madlavningDesc:"ما نوع الطعام الذي تحب طهيه؟",madlavningPadletDesc:"شارك تجارب الطبخ الخاصة بك مع الفصل هنا.",rengoeringDesc:"كيف تنظف؟",rengoeringPadletDesc:"شارك أفكارك حول التنظيف مع الفصل.",traenTidsudtryk:"تدريب تعبيرات الوقت",traenTidsudtrykDesc:"كيف تستخدم تعبيرات الوقت المختلفة باللغة الدنماركية؟",traenTidsudtrykBtnText:"افتح تمرين تعبيرات الوقت",ordstilling:"ترتيب الكلمات",ordstillingDesc:"قم بإعادة ترتيب الكلمات ووضعها في الترتيب الصحيح.",checkResult:"تحقق من الإجابة",correctOrder:"رائع! الترتيب صحيح.",wrongOrder:"ليس تماماً. حاول مرة أخرى!",ordstillingLet:"ترتيب الكلمات (سهل)",ordstillingSvaer:"ترتيب الكلمات (صعب)",levelA1:"جمل A1",levelA2:"جمل A2",traenGrammatik:"تدريب القواعد",grammatikDesc:"املاً الفراغات بالكلمات الصحيحة في النص.",let:"سهل (A1)",mellemsvaer:"متوسط (A2)",svaer:"صعب (B1)",grammatikIntro:"اختر مستوى لبدء التمرين.",checkAnswers:"تحقق من جميع الإجابات",allCorrect:"رائع! جميع الإجابات صحيحة.",someWrong:"بعض إجاباتك ليست صحيحة تمامًا. حاول مرة أخرى!",newExercise:"النص التالي",hintMean:"هذه الكلمة لا معنى لها في هذا السياق.",hintTense:"تحقق من الزمن. هل هو مضارع أم ماضٍ؟",hintForm:"تحقق من صيغة الكلمة (مثل الجنس أو المفرد/الجمع).",hintPerson:"تحقق من يقوم بالفعل (أنا، أنت، هو/هي).",hintContext:"اقرأ النص بالكامل مرة أخرى. ما هو الأنسب هنا؟",hintName:"أنت بحاجة إلى كلمة للأسماء هنا.",hintPlace:"أنت بحاجة إلى كلمة للأماكن هنا.",hintAction:"هذه الكلمة تصف فعلاً مختلفاً.",hintAdj:"تحقق من الصفة (وصف لشيء ما).",hintAdverb:"تحقق من الظرف (الزمان أو المكان أو الطريقة).",hintConj:"تحقق من حرف العطف (يربط بين جملتين).",filled:"تمت تعبئته"},ur:{selectLanguage:"زبان منتخب کریں",title:"دانش کی تربیت",subtitle:"تربیت شروع کرنے کے لیے ایک زمرہ منتخب کریں۔",dagensOpgave:"آج کا کام",dagensOpgaveDesc:"نیا موضوع، نئی گرامر۔ کام حل کریں!",modulTest:"ماڈیول ٹیسٹ کی تربیت",modulTestDesc:"مختلف کام ایک ہی جگہ پر جمع ہیں۔",notes:"تدریسی نوٹس",notesDesc:"کلاس کے نوٹس پڑھیں اور ان کی مشق کریں۔",lavSporgsmal:"سوالات بنائیں",lavSporgsmalDesc:"تصاویر کی بنیاد پر درست سوالات پوچھنا سیکھیں۔",lavSporgsmalBtnText:"سوالات بنائیں - یہاں کلک کریں",samtaleTraening:"گفتگو کی تربیت",samtaleTraeningDesc:"اپنی گفتگو کی مشق کریں اور اپنی دانش میں مدد حاصل کریں۔",skriveHjaelp:"لکھنے میں مدد",skriveHjaelpDesc:"اپنا متن درج کریں اور جوابات کے بغیر فیڈ بیک حاصل کریں۔",back:"واپس",du1mod3:"DU1، ماڈیول 3 اور 4",du2mod1:"DU2، ماڈیول 1",du3mod4:"DU3، ماڈیول 4",laerEtNytOrd:"ایک نیا لفظ سیکھیں",laerEtNytOrdDesc:"دریافت کریں کہ الفاظ نیٹ ورکس میں کیسے جڑے ہوئے ہیں۔",wordNetworkExplanation:"الفاظ دوسرے الفاظ سے جڑے ہوتے ہیں۔ جب آپ کو معلوم ہو کہ لفظ دوسرے الفاظ سے کیسے جڑا ہوا ہے تو یہ آپ کو لفظ کو بہت بہتر طریقے سے یاد رکھنے میں مدد دیتا ہے۔",targetWord:"کتا",hypernym:"اعلیٰ تصور",hypernymWord:"جانور",synonym:"مترادف",synonymWord:"کتا (Vovse)",antonym:"متضاد",antonymWord:"بلی",hyponym:"ذیلی تصور",hyponymWord:"پوڈل",geminiBtnText:"لفظ سیکھیں - یہاں کلک کریں",geminiConsentText:"اس لنک پر کلک کر کے، آپ گوگل کی مصنوعات استعمال کرنے اور اپنے جوابات کے ذریعے مصنوعی ذہانت کو تربیت دینے پر رضامند ہو رہے ہیں۔",hverdagssamtale:"روزمرہ گفتگو",hverdagssamtaleDesc:"روزمرہ کی عام گفتگو کی مشق کریں۔",samtaleBolig:"رہائش کے بارے میں گفتگو",samtaleArbejde:"کام کے بارے میں گفتگو",samtaleBtnText:"گفتگو شروع کریں - یہاں کلک کریں",skriveHjaelpBtnText:"لکھنے میں مدد - یہاں کلک کریں",du1mod3Desc:"مشق کرنے کے لیے ایک موضوع منتخب کریں۔",minHverdag:"میری روزمرہ زندگی",minBolig:"میری رہائش",mitArbejde:"میرا کام",minHverdagDesc:"آپ کی روزمرہ زندگی کے بارے میں کام۔",transportSprogskole:"اسکول تک آمد و رفت",madlavning:"کھانا پکانا",rengoering:"صفائی",transportDesc:"آپ اسکول کیسے جاتے ہیں؟",padletDesc:"کلاس کے ساتھ شیئر کریں کہ آپ آج اسکول کیسے پہنچے۔",padletBtnText:"Padlet کھولیں",madlavningDesc:"آپ کو کھانا پکانے میں کیا پسند ہے؟",madlavningPadletDesc:"اپنی کھانے کی یادیں کلاس کے ساتھ شیئر کریں۔",rengoeringDesc:"آپ صفائی کیسے کرتے ہیں؟",rengoeringPadletDesc:"صفائی کے بارے میں اپنے خیالات کلاس کے ساتھ شیئر کریں۔",traenTidsudtryk:"وقت کے اظہار کی مشق",traenTidsudtrykDesc:"دانش میں وقت کے مختلف اظہار کیسے استعمال ہوتے ہیں؟",traenTidsudtrykBtnText:"وقت کے اظہار کی مشق کھولیں",ordstilling:"الفاظ کی ترتیب",ordstillingDesc:"الفاظ کو دوبارہ ترتیب دیں اور انہیں صحیح ترتیب میں رکھیں.",checkResult:"جواب چیک کریں",correctOrder:"بہت خوب! ترتیب درست ہے.",wrongOrder:"بالکل درست نہیں. دوبارہ کوشش کریں!",ordstillingLet:"الفاظ کی ترتیب (آسان)",ordstillingSvaer:"الفاظ کی ترتیب (مشکل)",levelA1:"A1 جملے",levelA2:"A2 جملے",traenGrammatik:"گرائمر کی مشق",grammatikDesc:"متن میں خالی جگہوں کو صحیح الفاظ سے پر کریں۔",let:"آسان (A1)",mellemsvaer:"درمیانہ (A2)",svaer:"مشکل (B1)",grammatikIntro:"مشق شروع کرنے کے لیے لیول منتخب کریں۔",checkAnswers:"تمام جوابات چیک کریں",allCorrect:"شاندار! تمام جوابات درست ہیں۔",someWrong:"آپ کے کچھ جوابات بالکل درست نہیں ہیں۔ دوبارہ کوشش کریں!",newExercise:"اگلا متن",hintMean:"اس تناظر میں یہ لفظ معنی نہیں رکھتا.",hintTense:"زمانہ چیک کریں. کیا یہ حال ہے یا ماضی؟",hintForm:"لفظ کی شکل چیک کریں (مثلاً جنس یا واحد/جمع).",hintPerson:"چیک کریں کہ عمل کون کر رہا ہے (میں، آپ، وہ).",hintContext:"پورا متن دوبارہ پڑھیں. یہاں سب سے بہتر کیا ہے؟",hintName:"آپ کو یہاں ناموں کے لیے ایک لفظ کی ضرورت ہے.",hintPlace:"آپ کو یہاں مقامات کے لیے ایک لفظ کی ضرورت ہے.",hintAction:"یہ لفظ ایک مختلف عمل بیان کرتا ہے.",hintAdj:"صفت چیک کریں (کسی چیز کی وضاحت).",hintAdverb:"متعلق فعل چیک کریں (وقت، جگہ یا طریقہ).",hintConj:"حرف عطف چیک کریں (دو جملوں کو جوڑتا ہے).",filled:"بھرا ہوا"},zh:{selectLanguage:"选择语言",title:"丹麦语训练",subtitle:"选择一个类别开始你的训练。",dagensOpgave:"今日任务",dagensOpgaveDesc:"新主题，新语法。完成任务！",modulTest:"模块测试训练",modulTestDesc:"各种任务集中在一起。",notes:"教学笔记",notesDesc:"阅读并练习课堂笔记。",lavSporgsmal:"提问练习",lavSporgsmalDesc:"学习根据图片提出精确的问题。",lavSporgsmalBtnText:"开始提问 - 点击这里",samtaleTraening:"对话训练",samtaleTraeningDesc:"练习对话并获得丹麦语帮助。",skriveHjaelp:"写作助手",skriveHjaelpDesc:"输入你的文本，获得无答案的反馈。",back:"返回",du1mod3:"DU1, 模块 3 和 4",du2mod1:"DU2, 模块 1",du3mod4:"DU3, 模块 4",laerEtNytOrd:"学习一个新单词",laerEtNytOrdDesc:"探索单词在网络中的联系。",wordNetworkExplanation:"单词与其他单词相连。了解单词如何与其他单词联系可以帮助你更好地记住它。",targetWord:"狗",hypernym:"上位词",hypernymWord:"动物",synonym:"同义词",synonymWord:"狗狗",antonym:"反义词",antonymWord:"猫",hyponym:"下位词",hyponymWord:"贵宾犬",geminiBtnText:"学习单词 - 点击这里",geminiConsentText:"点击此链接即表示你同意使用 Google 产品，且 Google 会利用你的回答训练人工智能。",hverdagssamtale:"日常对话",hverdagssamtaleDesc:"练习常见的日常对话。",samtaleBolig:"关于住房的对话",samtaleArbejde:"关于工作的对话",samtaleBtnText:"开始对话 - 点击这里",skriveHjaelpBtnText:"写作助手 - 点击这里",du1mod3Desc:"选择一个主题进行练习。",minHverdag:"我的日常生活",minBolig:"我的住房",mitArbejde:"我的工作",minHverdagDesc:"关于你日常生活的任务。",transportSprogskole:"去语言学校的交通",madlavning:"烹饪",rengoering:"清洁",transportDesc:"你怎么去学校？",padletDesc:"与全班分享你今天如何去学校。",padletBtnText:"打开 Padlet",madlavningDesc:"你喜欢做什样的食物？",madlavningPadletDesc:"在这里与全班分享你的烹饪经验。",rengoeringDesc:"你如何进行清洁？",rengoeringPadletDesc:"与全班分享你对清洁的看法。",traenTidsudtryk:"练习时间表达",traenTidsudtrykDesc:"如何在丹麦语中使用不同的时间表达？",traenTidsudtrykBtnText:"打开时间表达练习",ordstilling:"词序练习",ordstillingDesc:"重新排列单词，并将它们按正确的顺序排列。",checkResult:"检查答案",correctOrder:"太棒了！顺序正确。",wrongOrder:"不完全正确。再试一次！",ordstillingLet:"词序 (简单)",ordstillingSvaer:"词序 (困难)",levelA1:"A1 句子",levelA2:"A2 句子",traenGrammatik:"练习语法",grammatikDesc:"在文本的空格处填入正确的单词。",let:"简单 (A1)",mellemsvaer:"中等 (A2)",svaer:"困难 (B1)",grammatikIntro:"选择等级开始练习。",checkAnswers:"检查所有答案",allCorrect:"太棒了！所有答案都正确。",someWrong:"你的某些答案不完全正确。再试一次！",newExercise:"下一篇",hintMean:"这个词在这种语境下没有意义。",hintTense:"检查时态。是现在时还是过去时？",hintForm:"检查单词形式（例如：性别或单复数）。",hintPerson:"检查谁在执行动作（我、你、他/她）。",hintContext:"重新阅读全文。这里最适合什么？",hintName:"你需要一个关于名字的词。",hintPlace:"你需要一个关于地点的词。",hintAction:"这个词描述的是另一种动作。",hintAdj:"检查形容词（描述事物的词）。",hintAdverb:"检查副词（时间、地点或方式）。",hintConj:"检查连词（连接两个句子）。",filled:"已填写"},ru:{selectLanguage:"Выберите язык",title:"Изучение датского",subtitle:"Выберите категорию, чтобы начать обучение.",dagensOpgave:"Задание дня",dagensOpgaveDesc:"Новая тема, новая грамматика. Решите задачу!",modulTest:"Подготовка к тесту",modulTestDesc:"Различные задания, собранные в одном месте.",notes:"Конспекты занятий",notesDesc:"Читайте и практикуйте заметки с уроков.",lavSporgsmal:"Составление вопросов",lavSporgsmalDesc:"Научитесь задавать точные вопросы по картинкам.",lavSporgsmalBtnText:"Начать - нажмите здесь",samtaleTraening:"Разговорная практика",samtaleTraeningDesc:"Практикуйте общение и получайте помощь с датским.",skriveHjaelp:"Помощь в письме",skriveHjaelpDesc:"Введите текст и получите отзыв без готовых ответов.",back:"Назад",du1mod3:"DU1, модуль 3 и 4",laerEtNytOrd:"Выучить новое слово",laerEtNytOrdDesc:"Узнайте, как слова связаны в сети.",wordNetworkExplanation:"Слова связаны с другими словами. Это помогает лучше запоминать их.",targetWord:"Собака",hypernym:"Гипероним",hypernymWord:"Животное",synonym:"Синоним",synonymWord:"Пес",antonym:"Антоним",antonymWord:"Кошка",hyponym:"Гипоним",hyponymWord:"Пудель",geminiBtnText:"Выучить слово - нажмите здесь",geminiConsentText:"Нажимая на ссылку, вы соглашаетесь на использование продуктов Google и на то, что Google обучает ИИ на ваших ответах.",hverdagssamtale:"Повседневный разговор",hverdagssamtaleDesc:"Практикуйте обычные разговоры о жизни.",samtaleBolig:"Разговор о жилье",samtaleArbejde:"Разговор о работе",samtaleBtnText:"Начать разговор - нажмите здесь",skriveHjaelpBtnText:"Помощь в письме - нажмите здесь",du1mod3Desc:"Выберите тему для практики.",minHverdag:"Мои будни",minBolig:"Мое жилье",mitArbejde:"Моя работа",minHverdagDesc:"Задания о вашей повседневной жизни.",transportSprogskole:"Транспорт до школы",madlavning:"Готовка",rengoering:"Уборка",transportDesc:"Как вы добираетесь до школы?",padletDesc:"Поделитесь с классом, как вы добрались до школы сегодня.",padletBtnText:"Открыть Padlet",madlavningDesc:"Какую еду вы любите готовить?",madlavningPadletDesc:"Поделитесь своим кулинарным опытом с классом.",rengoeringDesc:"Как вы делаете уборку?",rengoeringPadletDesc:"Поделитесь своими мыслями об уборке с классом.",traenTidsudtryk:"Практика временных выражений",traenTidsudtrykDesc:"Как использовать различные временные выражения в датском?",traenTidsudtrykBtnText:"Открыть упражнение",ordstilling:"Порядок слов",ordstillingDesc:"Переставьте слова и расположите их в правильном порядке.",checkResult:"Проверить ответ",correctOrder:"Отлично! Порядок правильный.",wrongOrder:"Не совсем верно. Попробуйте еще раз!",ordstillingLet:"Порядок слов (Легко)",ordstillingSvaer:"Порядок слов (Сложно)",levelA1:"Предложения A1",levelA2:"Предложения A2",traenGrammatik:"Практика грамматики",grammatikDesc:"Заполните пропуски в тексте правильными словами.",let:"Легко (A1)",mellemsvaer:"Средне (A2)",svaer:"Сложно (B1)",grammatikIntro:"Выберите уровень, чтобы начать упражнение.",checkAnswers:"Проверить все ответы",allCorrect:"Фантастика! Все ответы верны.",someWrong:"Некоторые ваши ответы не совсем верны. Попробуйте еще раз!",newExercise:"Следующий текст",hintMean:"Это слово не имеет смысла в данном контексте.",hintTense:"Проверьте время. Это настоящее или прошедшее?",hintForm:"Проверьте форму слова (например, род или число).",hintPerson:"Проверьте, кто совершает действие (я, ты, он/она).",hintContext:"Прочитайте весь текст еще раз. Что здесь лучше всего подходит?",hintName:"Здесь нужно слово для имен.",hintPlace:"Здесь нужно слово для мест.",hintAction:"Это слово описывает другое действие.",hintAdj:"Проверьте прилагательное (описание предмета).",hintAdverb:"Проверьте наречие (время, место или образ действия).",hintConj:"Проверьте союз (соединяет два предложения).",filled:"заполнено"},ne:{selectLanguage:"भाषा छान्नुहोस्",title:"डेनिस प्रशिक्षण",subtitle:"प्रशिक्षण सुरु गर्न एक श्रेणी छान्नुहोस्।",dagensOpgave:"आजको कार्य",dagensOpgaveDesc:"नयाँ विषय, नयाँ व्याकरण। कार्य समाधान गर्नुहोस्!",modulTest:"मोड्युल परीक्षण प्रशिक्षण",modulTestDesc:"विभिन्न कार्यहरू एकै ठाउँमा संकलन गरिएको।",notes:"शिक्षण नोटहरू",notesDesc:"कक्षाबाट नोटहरू पढ्नुहोस् र अभ्यास गर्नुहोस्।",lavSporgsmal:"प्रश्नहरू बनाउनुहोस्",lavSporgsmalDesc:"चित्रहरूको आधारमा सटीक प्रश्नहरू सोध्न सिक्नुहोस्।",lavSporgsmalBtnText:"प्रश्नहरू बनाउनुहोस् - यहाँ क्लिक गर्नुहोस्",samtaleTraening:"कुराकानी प्रशिक्षण",samtaleTraeningDesc:"आफ्नो कुराकानी अभ्यास गर्नुहोस् र डेनिस भाषामा मद्दत लिनुहोस्।",skriveHjaelp:"लेखन मद्दत",skriveHjaelpDesc:"आफ्नो पाठ प्रविष्ट गर्नुहोस् र जवाफ बिना प्रतिक्रिया प्राप्त गर्नुहोस्।",back:"फिर्ता",du1mod3:"DU1, मोड्युल ३ र ४",laerEtNytOrd:"नयाँ शब्द सिक्नुहोस्",laerEtNytOrdDesc:"शब्दहरू नेटवर्कमा कसरी जोडिएका छन् पत्ता लगाउनुहोस्।",wordNetworkExplanation:"शब्दहरू अन्य शब्दहरूसँग जोडिएका हुन्छन्। शब्द कसरी जोडिएको छ थाहा पाउँदा सम्झन सजिलो हुन्छ।",targetWord:"कुकुर",hypernym:"माथिल्लो शब्द",hypernymWord:"जनावर",synonym:"पर्यायवाची",synonymWord:"कुकुर (Vovse)",antonym:"विपरीतार्थी",antonymWord:"बिरालो",hyponym:"तल्लो शब्द",hyponymWord:"पुडल",geminiBtnText:"शब्द सिक्नुहोस् - यहाँ थिच्नुहोस्",geminiConsentText:"यो लिङ्कमा क्लिक गरेर, तपाईं गुगल उत्पादन प्रयोग गर्न र गुगलले तपाईंको जवाफबाट एआईलाई तालिम दिन सहमत हुनुहुन्छ।",hverdagssamtale:"दैनिक कुराकानी",hverdagssamtaleDesc:"सामान्य दैनिक कुराकानी अभ्यास गर्नुहोस्।",samtaleBolig:"आवासको बारेमा कुराकानी",samtaleArbejde:"कामको बारेमा कुराकानी",samtaleBtnText:"कुराकानी सुरु गर्नुहोस् - यहाँ क्लिक गर्नुहोस्",skriveHjaelpBtnText:"लेखन मद्दत - यहाँ क्लिक गर्नुहोस्",du1mod3Desc:"अभ्यास गर्न विषय छान्नुहोस्।",minHverdag:"मेरो दैनिक जीवन",minBolig:"मेरो आवास",mitArbejde:"मेरो काम",minHverdagDesc:"तपाईंको दैनिक जीवनको बारेमा कार्यहरू।",transportSprogskole:"स्कूल सम्मको यातायात",madlavning:"खाना पकाउने",rengoering:"सरसफाई",transportDesc:"तपाईं स्कूल कसरी जानुहुन्छ?",padletDesc:"तपाईं आज स्कूल कसरी पुग्नुभयो कक्षामा साझा गर्नुहोस्।",padletBtnText:"Padlet खोल्नुहोस्",madlavningDesc:"तपाईंलाई कस्तो खाना पकाउन मन पर्छ?",madlavningPadletDesc:"तपाईंको खाना पकाउने अनुभव कक्षामा साझा गर्नुहोस्।",rengoeringDesc:"तपाई सरसफाई कसरी गर्नुहुन्छ?",rengoeringPadletDesc:"सरसफाईको बारेमा आफ्नो विचार साझा गर्नुहोस्।",traenTidsudtryk:"समय अभिव्यक्ति अभ्यास",traenTidsudtrykDesc:"डेनिसमा विभिन्न समय अभिव्यक्तिहरू कसरी प्रयोग गर्ने?",traenTidsudtrykBtnText:"समय अभिव्यक्ति अभ्यास खोल्नुहोस्",ordstilling:"शब्द क्रम",ordstillingDesc:"शब्दहरूलाई पुन: व्यवस्थित गर्नुहोस् र तिनीहरूलाई सही क्रममा राख्नुहोस्।",checkResult:"उत्तर जाँच गर्नुहोस्",correctOrder:"उत्कृष्ट! क्रम सही छ।",wrongOrder:"पुरै सही छैन। फेरि प्रयास गर्नुहोस्!",ordstillingLet:"शब्द क्रम (सजिलो)",ordstillingSvaer:"शब्द क्रम (कठिन)",levelA1:"A1 वाक्यहरू",levelA2:"A2 वाक्यहरू",traenGrammatik:"व्याकरण अभ्यास",grammatikDesc:"पाठका खाली ठाउँहरूमा सही शब्दहरू भर्नुहोस्।",let:"सजिलो (A1)",mellemsvaer:"मध्यम (A2)",svaer:"कठिन (B1)",grammatikIntro:"अभ्यास सुरु गर्न एक स्तर छान्नुहोस्।",checkAnswers:"सबै उत्तरहरू जाँच गर्नुहोस्",allCorrect:"शानदार! सबै उत्तरहरू सही छन्।",someWrong:"तपाईका केही उत्तरहरू पूर्ण रूपमा सही छैनन्। फेरि प्रयास गर्नुहोस्!",newExercise:"अर्को पाठ",hintMean:"यो शब्द यस सन्दर्भमा अर्थहीन छ।",hintTense:"काल जाँच गर्नुहोस्। यो वर्तमान हो कि भूत?",hintForm:"शब्दको रूप जाँच गर्नुहोस् (जस्तै लिङ्ग वा एकवचन/बहुवचन)।",hintPerson:"कार्य कसले गरिरहेको छ जाँच गर्नुहोस् (म, तिमी, उ/उनी)।",hintContext:"फेरि पूरा पाठ पढ्नुहोस्। यहाँ सबैभन्दा उपयुक्त के हुन्छ?",hintName:"तपाईंलाई यहाँ नामका लागि शब्द चाहिन्छ।",hintPlace:"तपाईंलाई यहाँ ठाउँका लागि शब्द चाहिन्छ।",hintAction:"यो शब्दले अर्कै कार्यलाई वर्णन गर्दछ।",hintAdj:"विशेषण जाँच गर्नुहोस् (चीजको विवरण)।",hintAdverb:"क्रियाविशेषण जाँच गर्नुहोस् (समय, स्थान वा तरिका)।",hintConj:"संयोजक जाँच गर्नुहोस् (दुईवटा वाक्यहरू जोड्छ)।",filled:"भरिएको"},th:{selectLanguage:"เลือกภาษา",title:"ฝึกภาษาเดนมาร์ก",subtitle:"เลือกหมวดหมู่เพื่อเริ่มการฝึกฝนของคุณ",dagensOpgave:"ภารกิจวันนี้",dagensOpgaveDesc:"หัวข้อใหม่ ไวยากรณ์ใหม่ แก้ปัญหาเลย!",modulTest:"ฝึกทำข้อสอบโมดูล",modulTestDesc:"รวบรวมงานต่างๆ ไว้ในที่เดียว",notes:"โน้ตการเรียน",notesDesc:"อ่านและฝึกฝนโน้ตจากทางห้องเรียน",lavSporgsmal:"สร้างคำถาม",lavSporgsmalDesc:"เรียนรู้การตั้งคำถามที่แม่นยำจากรูปภาพ",lavSporgsmalBtnText:"สร้างคำถาม - คลิกที่นี่",samtaleTraening:"ฝึกสนทนา",samtaleTraeningDesc:"ฝึกฝนการสนทนาและรับความช่วยเหลือเกี่ยวกับภาษาเดนมาร์ก",skriveHjaelp:"ตัวช่วยเขียน",skriveHjaelpDesc:"ใส่ข้อความของคุณและรับข้อเสนอแนะโดยไม่มีคำตอบ",back:"กลับ",du1mod3:"DU1, โมดูล 3 และ 4",laerEtNytOrd:"เรียนรู้คำศัพท์ใหม่",laerEtNytOrdDesc:"สำรวจความเชื่อมโยงของคำในเครือข่าย",wordNetworkExplanation:"คำศัพท์เชื่อมโยงกับคำอื่นๆ จะช่วยให้จำได้ดีขึ้นเมื่อรู้ความเชื่อมโยง",targetWord:"สุนัข",hypernym:"คำนามหลัก",hypernymWord:"สัตว์",synonym:"คำไวพจน์",synonymWord:"เจ้าตูบ",antonym:"คำตรงข้าม",antonymWord:"แมว",hyponym:"คำประเภทย่อย",hyponymWord:"พุดเดิ้ล",geminiBtnText:"เรียนรู้คำศัพท์ - กดที่นี่",geminiConsentText:"การคลิกที่ลิงก์นี้แสดงว่าคุณตกลงที่จะใช้ผลิตภัณฑ์ของ Google และให้ Google ฝึก AI ด้วยคำตอบของคุณ",hverdagssamtale:"สนทนาในชีวิตประจำวัน",hverdagssamtaleDesc:"ฝึกบทสนทนาทั่วไปเกี่ยวกับชีวิตประจำวัน",samtaleBolig:"คุยเรื่องที่อยู่อาศัย",samtaleArbejde:"คุยเรื่องงาน",samtaleBtnText:"เริ่มการสนทนา - กดที่นี่",skriveHjaelpBtnText:"ตัวช่วยเขียน - กดที่นี่",du1mod3Desc:"เลือกหัวข้อที่จะฝึกฝน",minHverdag:"ชีวิตประจำวันของฉัน",minBolig:"บ้านของฉัน",mitArbejde:"งานของฉัน",minHverdagDesc:"งานเกี่ยวกับชีวิตประจำวันของคุณ",transportSprogskole:"การเดินทางไปโรงเรียน",madlavning:"การทำอาหาร",rengoering:"การทำความสะอาด",transportDesc:"คุณมาโรงเรียนอย่างไร?",padletDesc:"แบ่งปันวิธีการมาโรงเรียนของคุณในวันนี้กับเพื่อนในห้อง",padletBtnText:"เปิด Padlet",madlavningDesc:"คุณชอบทำอาหารประเภทไหน?",madlavningPadletDesc:"แบ่งปันประสบการณ์การทำอาหารของคุณที่นี่",rengoeringDesc:"คุณทำความสะอาดอย่างไร?",rengoeringPadletDesc:"แบ่งปันความคิดเรื่องการทำความสะอาดกับเพื่อนในห้อง",traenTidsudtryk:"ฝึกการบอกเวลา",traenTidsudtrykDesc:"วิธีการใช้สำนวนเกี่ยวกับเวลาในภาษาเดนมาร์ก",traenTidsudtrykBtnText:"เปิดแบบฝึกหัดการบอกเวลา",ordstilling:"การเรียงลำดับคำ",ordstillingDesc:"จัดเรียงคำใหม่และวางตามลำดับที่ถูกต้อง",checkResult:"ตรวจคำตอบ",correctOrder:"ยอดเยี่ยม! ลำดับถูกต้อง",wrongOrder:"ยังไม่ถูกต้อง ลองอีกครั้ง!",ordstillingLet:"การเรียงลำดับคำ (ง่าย)",ordstillingSvaer:"การเรียงลำดับคำ (ยาก)",levelA1:"ประโยค A1",levelA2:"ประโยค A2",traenGrammatik:"ฝึกไวยากรณ์",grammatikDesc:"เติมคำที่ถูกต้องลงในช่องว่างในเนื้อข้อความ",let:"ง่าย (A1)",mellemsvaer:"ปานกลาง (A2)",svaer:"ยาก (B1)",grammatikIntro:"เลือกระดับเพื่อเริ่มแบบฝึกหัด",checkAnswers:"ตรวจคำตอบทั้งหมด",allCorrect:"สุดยอด! ทุกคำตอบถูกต้อง",someWrong:"คำตอบบางคำไม่ค่อยถูกต้อง ลองอีกครั้ง!",newExercise:"ข้อความถัดไป",hintMean:"คำนี้ไม่มีความหมายในบริบทนี้",hintTense:"ตรวจสอบกาล (Tense) เป็นปัจจุบันหรืออดีต?",hintForm:"ตรวจสอบรูปของคำ (เช่น เพศ หรือ เอกพจน์/พหูพจน์)",hintPerson:"ตรวจสอบว่าใครเป็นคนทำกริยานั้น (ฉัน, คุณ, เขา/เธอ)",hintContext:"อ่านข้อความทั้งหมดอีกครั้ง อะไรเหมาะที่สุดตรงนี้?",hintName:"คุณต้องการคำเรียกชื่อตรงนี้",hintPlace:"คุณต้องการคำระบุสถานที่ตรงนี้",hintAction:"คำนี้อธิบายการกระทำที่ต่างออกไป",hintAdj:"ตรวจสอบคำคุณศัพท์ (การบรรยายสิ่งของ)",hintAdverb:"ตรวจสอบคำวิเศษณ์ (เวลา สถานที่ หรืออาการ)",hintConj:"ตรวจสอบคำสันธาน (คำเชื่อมประโยค)",filled:"เติมแล้ว"},pt:{selectLanguage:"Escolher idioma",title:"Treino de Dinamarquês",subtitle:"Escolha uma categoria para começar o seu treino.",dagensOpgave:"Tarefa do Dia",dagensOpgaveDesc:"Novo tópico, nova gramática. Resolva a tarefa!",modulTest:"Treino para Teste de Módulo",modulTestDesc:"Várias tarefas reunidas num só lugar.",notes:"Notas de Aula",notesDesc:"Leia e pratique com as notas das aulas.",lavSporgsmal:"Criar Perguntas",lavSporgsmalDesc:"Aprenda a fazer perguntas precisas com base em imagens.",lavSporgsmalBtnText:"Criar perguntas - clique aqui",samtaleTraening:"Treino de Conversação",samtaleTraeningDesc:"Pratique as suas conversas e obtenha ajuda com o seu dinamarquês.",skriveHjaelp:"Ajuda na Escrita",skriveHjaelpDesc:"Insira o seu texto e obtenha feedback sem respostas.",back:"Voltar",du1mod3:"DU1, módulo 3 e 4",laerEtNytOrd:"Aprender uma palavra nova",laerEtNytOrdDesc:"Explore como as palavras se ligam em redes.",wordNetworkExplanation:"As palavras estão ligadas a outras palavras. Ajuda a lembrar-se muito melhor quando sabe as ligações.",targetWord:"Cão",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Cachorro",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Poodle",geminiBtnText:"Aprender uma palavra - prima aqui",geminiConsentText:"Ao clicar neste link, concorda em usar um produto da Google e que a Google treine inteligência artificial com as suas respostas.",hverdagssamtale:"Conversa do dia-a-dia",hverdagssamtaleDesc:"Pratique conversas comuns sobre o quotidiano.",samtaleBolig:"Conversa sobre habitação",samtaleArbejde:"Conversa sobre trabalho",samtaleBtnText:"Começar conversa - clicar aqui",skriveHjaelpBtnText:"Ajuda na escrita - clicar aqui",du1mod3Desc:"Escolha um tópico para praticar.",minHverdag:"O meu dia-a-dia",minBolig:"A minha casa",mitArbejde:"O meu trabalho",minHverdagDesc:"Tarefas sobre a sua rotina diária.",transportSprogskole:"Transporte para a escola",madlavning:"Culinária",rengoering:"Limpeza",transportDesc:"Como vem para a escola?",padletDesc:"Partilhe com a turma como chegou à escola hoje.",padletBtnText:"Abrir Padlet",madlavningDesc:"Que tipo de comida gosta de fazer?",madlavningPadletDesc:"Partilhe as suas experiências culinárias aqui.",rengoeringDesc:"Como faz as limpezas?",rengoeringPadletDesc:"Partilhe os seus pensamentos sobre limpezas.",traenTidsudtryk:"Treino de expressões de tempo",traenTidsudtrykDesc:"Como usar diferentes expressões de tempo em dinamarquês?",traenTidsudtrykBtnText:"Abrir exercício de expressões de tempo",ordstilling:"Ordem das Palavras",ordstillingDesc:"Reorganize as palavras e coloque-as na ordem correta.",checkResult:"Verificar resposta",correctOrder:"Excelente! A ordem está correta.",wrongOrder:"Não está bem. Tente novamente!",ordstillingLet:"Ordem das Palavras (Fácil)",ordstillingSvaer:"Ordem das Palavras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Treinar Gramática",grammatikDesc:"Preencha as lacunas com as palavras corretas no texto.",let:"Fácil (A1)",mellemsvaer:"Médio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Escolha um nível para começar o exercício.",checkAnswers:"Verificar todas as respostas",allCorrect:"Fantástico! Todas as respostas estão corretas.",someWrong:"Algumas das suas respostas não estão totalmente corretas. Tente novamente!",newExercise:"Próximo texto",hintMean:"Esta palavra não faz sentido neste contexto.",hintTense:"Verifique o tempo verbal. É presente ou passado?",hintForm:"Verifique a forma da palavra (ex: gênero ou singular/plural).",hintPerson:"Verifique quem está realizando a ação (eu, você, ele/ela).",hintContext:"Leia todo o texto novamente. O que melhor se encaixa aqui?",hintName:"Você precisa de uma palavra para nomes aqui.",hintPlace:"Você precisa de uma palavra para locais aqui.",hintAction:"Esta palavra descreve uma ação diferente.",hintAdj:"Verifique o adjetivo (descrição de uma coisa).",hintAdverb:"Verifique o advérbio (tempo, lugar ou modo).",hintConj:"Verifique a conjunção (conecta duas frases).",filled:"preenchido"},vi:{selectLanguage:"Chọn ngôn ngữ",title:"Luyện tiếng Đan Mạch",subtitle:"Chọn một danh mục để bắt đầu luyện tập.",dagensOpgave:"Nhiệm vụ hàng ngày",dagensOpgaveDesc:"Chủ đề mới, ngữ pháp mới. Hãy giải nhiệm vụ!",modulTest:"Luyện thi mô-đun",modulTestDesc:"Nhiều nhiệm vụ khác nhau được tập hợp tại một nơi.",notes:"Ghi chú bài giảng",notesDesc:"Đọc và thực hành các ghi chú từ lớp học.",lavSporgsmal:"Đặt câu hỏi",lavSporgsmalDesc:"Học cách đặt câu hỏi chính xác dựa trên hình ảnh.",lavSporgsmalBtnText:"Đặt câu hỏi - bấm vào đây",samtaleTraening:"Luyện hội thoại",samtaleTraeningDesc:"Thực hành hội thoại và nhận trợ giúp về tiếng Đan Mạch.",skriveHjaelp:"Trợ giúp viết",skriveHjaelpDesc:"Nhập văn bản của bạn và nhận phản hồi không có đáp án.",back:"Quay lại",du1mod3:"DU1, mô-đun 3",laerEtNytOrd:"Học một từ mới",laerEtNytOrdDesc:"Khám phá cách các từ kết nối trong mạng lưới.",wordNetworkExplanation:"Các từ được kết nối với các từ khác. Việc biết cách kết nối giúp bạn nhớ từ tốt hơn nhiều.",targetWord:"Con chó",hypernym:"Từ bao nghĩa",hypernymWord:"Động vật",synonym:"Từ đồng nghĩa",synonymWord:"Cún",antonym:"Từ trái nghĩa",antonymWord:"Con mèo",hyponym:"Từ nghĩa hẹp",hyponymWord:"Chó Poodle",geminiBtnText:"Học một từ - nhấn vào đây",geminiConsentText:"Bằng cách nhấp vào liên kết này, bạn đồng ý sử dụng sản phẩm của Google và để Google huấn luyện trí tuệ nhân tạo bằng câu trả lời của bạn.",hverdagssamtale:"Hội thoại hàng ngày",hverdagssamtaleDesc:"Thực hành các cuộc hội thoại thông thường về cuộc sống hàng ngày.",samtaleBolig:"Hội thoại về nhà ở",samtaleArbejde:"Hội thoại về công việc",samtaleBtnText:"Bắt đầu hội thoại - bấm tại đây",skriveHjaelpBtnText:"Trợ giúp viết - bấm tại đây",du1mod3Desc:"Chọn một chủ đề để thực hành.",minHverdag:"Cuộc sống hàng ngày của tôi",minBolig:"Nhà ở của tôi",mitArbejde:"Công việc của tôi",minHverdagDesc:"Các nhiệm vụ về cuộc sống hàng ngày của bạn.",transportSprogskole:"Phương tiện đến trường",madlavning:"Nấu ăn",rengoering:"Dọn dẹp",transportDesc:"Bạn đến trường bằng cách nào?",padletDesc:"Chia sẻ với cả lớp cách bạn đến trường hôm nay.",padletBtnText:"Mở Padlet",madlavningDesc:"Bạn thích nấu món ăn gì?",madlavningPadletDesc:"Chia sẻ kinh nghiệm nấu ăn của bạn với cả lớp tại đây.",rengoeringDesc:"Bạn dọn dẹp như thế nào?",rengoeringPadletDesc:"Chia sẻ suy nghĩ của bạn về việc dọn dẹp với cả lớp.",traenTidsudtryk:"Luyện tập các cụm từ chỉ thời gian",traenTidsudtrykDesc:"Cách sử dụng các cụm từ chỉ thời gian khác nhau trong tiếng Đan Mạch?",traenTidsudtrykBtnText:"Mở bài tập chỉ thời gian",ordstilling:"Trật tự từ",ordstillingDesc:"Sắp xếp lại các từ và đặt chúng theo đúng thứ tự.",checkResult:"Kiểm tra đáp án",correctOrder:"Tuyệt vời! Thứ tự đã đúng.",wrongOrder:"Chưa hoàn toàn đúng. Thử lại nhé!",ordstillingLet:"Trật tự từ (Dễ)",ordstillingSvaer:"Trật tự từ (Khó)",levelA1:"Câu A1",levelA2:"Câu A2",traenGrammatik:"Luyện ngữ pháp",grammatikDesc:"Điền các từ đúng vào chỗ trống trong văn bản.",let:"Dễ (A1)",mellemsvaer:"Trung bình (A2)",svaer:"Khó (B1)",grammatikIntro:"Chọn một cấp độ để bắt đầu bài tập.",checkAnswers:"Kiểm tra tất cả đáp án",allCorrect:"Tuyệt vời! Tất cả đáp án đều đúng.",someWrong:"Một số câu trả lời của bạn chưa hoàn toàn đúng. Thử lại nhé!",newExercise:"Văn bản tiếp theo",hintMean:"Từ này không có ý nghĩa trong ngữ cảnh này.",hintTense:"Kiểm tra thì của động từ. Là hiện tại hay quá khứ?",hintForm:"Kiểm tra hình thức của từ (ví dụ: giống hoặc số ít/số nhiều).",hintPerson:"Kiểm tra ai là người thực hiện hành động (tôi, bạn, anh ấy/cô ấy).",hintContext:"Đọc lại toàn bộ văn bản. Điều gì phù hợp nhất ở đây?",hintName:"Bạn cần một từ cho tên ở đây.",hintPlace:"Bạn cần một từ cho nơi chốn ở đây.",hintAction:"Từ này mô tả một hành động khác."},fa:{selectLanguage:"انتخاب زبان",title:"آموزش دانمارکی",subtitle:"یک دسته را برای شروع تمرین خود انتخاب کنید.",dagensOpgave:"تکلیف روز",dagensOpgaveDesc:"موضوع جدید، گرامر جدید. تکلیف را حل کنید!",modulTest:"تمرین آزمون ماژول",modulTestDesc:"وظایف مختلف در یک جا جمع شده‌اند.",notes:"یادداشت‌های آموزشی",notesDesc:"یادداشت‌های کلاس را بخوانید و تمرین کنید.",lavSporgsmal:"ساخت سوال",lavSporgsmalDesc:"یاد بگیرید بر اساس تصاویر سوالات دقیق بپرسید.",lavSporgsmalBtnText:"ساخت سوال - اینجا کلیک کنید",samtaleTraening:"تمرین مکالمه",samtaleTraeningDesc:"مکالمات خود را تمرین کنید و در زبان دانمارکی کمک بگیرید.",skriveHjaelp:"کمک در نوشتن",skriveHjaelpDesc:"متن خود را وارد کنید و بدون پاسخ، بازخورد بگیرید.",back:"بازگشت",du1mod3:"DU1، ماژول ۳",laerEtNytOrd:"یادگیری یک کلمه جدید",laerEtNytOrdDesc:"کشف کنید که کلمات چگونه در شبکه‌ها به هم متصل هستند.",wordNetworkExplanation:"کلمات به کلمات دیگر متصل هستند. وقتی بدانید کلمه چگونه متصل است، آن را خیلی بهتر به یاد می‌سپارید.",targetWord:"سگ",hypernym:"واژه فراگیر",hypernymWord:"حیوان",synonym:"مترادف",synonymWord:"هاپو",antonym:"متضاد",antonymWord:"گربه",hyponym:"واژه محدودتر",hyponymWord:"پودل",geminiBtnText:"یادگیری کلمه - اینجا کلیک کنید",geminiConsentText:"با کلیک بر روی این لینک، موافقت می‌کنید که از محصولات گوگل استفاده کنید و گوگل هوش مصنوعی را با پاسخ‌های شما آموزش دهد.",hverdagssamtale:"مکالمه روزمره",hverdagssamtaleDesc:"مکالمات معمول درباره زندگی روزمره را تمرین کنید.",samtaleBolig:"مکالمه درباره مسکن",samtaleArbejde:"مکالمه درباره کار",samtaleBtnText:"شروع مکالمه - اینجا کلیک کنید",skriveHjaelpBtnText:"کمک در نوشتن - اینجا کلیک کنید",du1mod3Desc:"یک موضوع را برای تمرین انتخاب کنید.",minHverdag:"زندگی روزمره من",minBolig:"مسکن من",mitArbejde:"کار من",minHverdagDesc:"تکالیفی درباره زندگی روزمره شما.",transportSprogskole:"رفت و آمد به مدرسه زبن",madlavning:"آشپزی",rengoering:"نظافت",transportDesc:"چطور به مدرسه می‌روید؟",padletDesc:"با کلاس در میان بگذارید که امروز چطور به مدرسه رسیدید.",padletBtnText:"باز کردن پدلت",madlavningDesc:"چه نوع غذایی دوست دارید درست کنید؟",madlavningPadletDesc:"تجربیات آشپزی خود را اینجا با کلاس به اشتراک بگذارید.",rengoeringDesc:"چطور نظافت می‌کنید؟",rengoeringPadletDesc:"نظرات خود را درباره نظافت با کلاس در میان بگذارید.",traenTidsudtryk:"تمرین اصطلاحات زمانی",traenTidsudtrykDesc:"چطور از اصطلاحات زمانی مختلف در دانمارکی استفاده کنیم؟",traenTidsudtrykBtnText:"باز کردن تمرین اصطلاحات زمانی",ordstilling:"ترتیب کلمات",ordstillingDesc:"کلمات را دوباره ترتیب دهید و آن‌ها را در جای درست بگذارید.",checkResult:"بررسی پاسخ",correctOrder:"عالی! ترتیب درست است.",wrongOrder:"کاملاً درست نیست. دوباره امتحان کنید!",ordstillingLet:"ترتیب کلمات (آسان)",ordstillingSvaer:"ترتیب کلمات (سخت)",levelA1:"جملات A1",levelA2:"جملات A2",traenGrammatik:"تمرین دستور زبان",grammatikDesc:"جاهای خالی متن را با کلمات درست پر کنید.",let:"آسان (A1)",mellemsvaer:"متوسط (A2)",svaer:"سخت (B1)",grammatikIntro:"یک سطح را برای شروع تمرین انتخاب کنید.",checkAnswers:"بررسی تمام پاسخ‌ها",allCorrect:"عالی! تمام پاسخ‌ها درست هستند.",someWrong:"برخی از پاسخ‌های شما کاملاً درست نیستند. دوباره امتحان کنید!",newExercise:"متن بعدی",hintMean:"این کلمه در این متن معنایی ندارد.",hintTense:"زمان فعل را بررسی کنید. حال است یا گذشته؟",hintForm:"شکل کلمه را بررسی کنید (مثلاً جنسیت یا مفرد/جمع).",hintPerson:"بررسی کنید چه کسی عمل را انجام می‌دهد (من، تو، او).",hintContext:"دوباره کل متن را بخوانید. چه چیزی اینجا بهتر است؟",hintName:"اینجا به کلمه‌ای برای نام‌ها نیاز دارید.",hintPlace:"اینجا به کلمه‌ای برای مکان‌ها نیاز دارید.",hintAction:"این کلمه عمل دیگری را توصیف می‌کند."},tr:{selectLanguage:"Dil seçin",title:"Danca Eğitimi",subtitle:"Eğitiminize başlamak için bir kategori seçin.",dagensOpgave:"Günün Ödevi",dagensOpgaveDesc:"Yeni konu, yeni dilbilgisi. Ödevi çözün!",modulTest:"Modül Testi Eğitimi",modulTestDesc:"Çeşitli görevler tek bir yerde toplandı.",notes:"Ders Notları",notesDesc:"Derslerdeki notları okuyun ve pratik yapın.",lavSporgsmal:"Soru Hazırlama",lavSporgsmalDesc:"Resimlere bakarak kesin sorular sormayı öğrenin.",lavSporgsmalBtnText:"Soru hazırlayın - buraya tıklayın",samtaleTraening:"Konuşma Eğitimi",samtaleTraeningDesc:"Konuşma pratiği yapın ve Dancanız için yardım alın.",skriveHjaelp:"Yazma Yardımı",skriveHjaelpDesc:"Metninizi girin ve cevaplar olmadan geri bildirim alın.",back:"Geri",du1mod3:"DU1, modül 3",du2mod1:"DU2, modül 1",du3mod4:"DU3, modül 4",laerEtNytOrd:"Yeni bir kelime öğrenin",laerEtNytOrdDesc:"Kelimelerin ağlar içinde nasıl bağlandığını keşfedin.",wordNetworkExplanation:"Kelimeler diğer kelimelere bağlıdır. Kelimenin diğer kelimelere nasıl bağlandığını bildiğinizde, kelimeyi çok daha iyi hatırlamanıza yardımcı olur.",targetWord:"Köpek",hypernym:"Üst Terim",hypernymWord:"Hayvan",synonym:"Eşanlamlı",synonymWord:"Köpecik (Vovse)",antonym:"Zıt Anlamlı",antonymWord:"Kedi",hyponym:"Alt Terim",hyponymWord:"Kaniş",geminiBtnText:"Kelime öğrenin - buraya tıklayın",geminiConsentText:"Bu bağlantıya tıklayarak bir Google ürünü kullandığınızı ve Google'ın yapay zekayı cevaplarınızla eğittiğini kabul etmiş olursunuz.",hverdagssamtale:"Günlük Konuşma",hverdagssamtaleDesc:"Günlük hayattan yaygın konuşmalar yapın.",samtaleBolig:"Konut hakkında konuşma",samtaleArbejde:"İş hakkında konuşma",samtaleBtnText:"Konuşmayı başlatın - buraya tıklayın",skriveHjaelpBtnText:"Yazma yardımı - buraya tıklayın",du1mod3Desc:"Pratik yapmak için bir konu seçin.",minHverdag:"Günlük hayatım",minBolig:"Konutum",mitArbejde:"İşim",minHverdagDesc:"Günlük hayatınızla ilgili görevler.",transportSprogskole:"Okula ulaşım",madlavning:"Yemek pişirme",rengoering:"Temizlik",transportDesc:"Okula nasıl geliyorsunuz?",padletDesc:"Bugün okula nasıl geldiğinizi sınıfla paylaşın.",padletBtnText:"Padlet'i aç",madlavningDesc:"Hangi yiyecekleri yapmayı seversiniz?",madlavningPadletDesc:"Yemek deneyimlerinizi burada sınıfla paylaşın.",rengoeringDesc:"Temizliği nasıl yaparsınız?",rengoeringPadletDesc:"Temizlikle ilgili düşüncelerinizi sınıfla paylaşın.",traenTidsudtryk:"Zaman ifadeleri çalışması",traenTidsudtrykDesc:"Dancada farklı zaman ifadeleri nasıl kullanılır?",traenTidsudtrykBtnText:"Zaman ifadeleri egzersizini aç",ordstilling:"Kelime Sıralaması",ordstillingDesc:"Kelimeleri yeniden düzenleyin ve doğru sıraya koyun.",checkResult:"Cevabı kontrol et",correctOrder:"Harika! Sıralama doğru.",wrongOrder:"Tam olarak doğru değil. Tekrar deneyin!",ordstillingLet:"Kelime Sıralaması (Kolay)",ordstillingSvaer:"Kelime Sıralaması (Zor)",levelA1:"A1 cümleleri",levelA2:"A2 cümleleri",traenGrammatik:"Gramer Çalışması",grammatikDesc:"Metindeki boşlukları doğru kelimelerle doldurun.",let:"Kolay (A1)",mellemsvaer:"Orta (A2)",svaer:"Zor (B1)",grammatikIntro:"Egzersize başlamak için bir seviye seçin.",checkAnswers:"Tüm cevapları kontrol et",allCorrect:"Harika! Tüm cevaplar doğru.",someWrong:"Bazı cevaplarınız tam olarak doğru değil. Tekrar deneyin!",newExercise:"Sonraki metin",hintMean:"Bu kelime bu bağlamda mantıklı değil.",hintTense:"Zamanı kontrol edin. Şimdiki zaman mı yoksa geçmiş zaman mı?",hintForm:"Kelime biçimini kontrol edin (örneğin cinsiyet veya tekil/çoğul).",hintPerson:"Eylemi kimin yaptığını kontrol edin (ben, sen, o).",hintContext:"Tüm metni tekrar okuyun. Buraya en iyi ne uyar?",hintName:"Burada isimler için bir kelimeye ihtiyacınız var.",hintPlace:"Burada yerler için bir kelimeye ihtiyacınız var.",hintAction:"Bu kelime farklı bir eylemi tanımlıyor."},es:{selectLanguage:"Seleccionar idioma",title:"Entrenamiento de Danés",subtitle:"Selecciona una categoría para empezar tu entrenamiento.",dagensOpgave:"Tarea del día",dagensOpgaveDesc:"Nuevo tema, nueva gramática. ¡Resuelve la tarea!",modulTest:"Entrenamiento para el examen de módulo",modulTestDesc:"Varias tareas reunidas en un solo lugar.",notes:"Notas de clase",notesDesc:"Lee y practica con las notas de las clases.",lavSporgsmal:"Crear preguntas",lavSporgsmalDesc:"Aprende a hacer preguntas precisas a partir de imágenes.",lavSporgsmalBtnText:"Crear preguntas - haz clic aquí",samtaleTraening:"Entrenamiento de conversación",samtaleTraeningDesc:"Practica tus conversaciones y obtén ayuda con tu danés.",skriveHjaelp:"Ayuda con la escritura",skriveHjaelpDesc:"Inserta tu texto y obtén retroalimentación sin respuestas.",back:"Atrás",du1mod3:"DU1, módulo 3",du2mod1:"DU2, módulo 1",du3mod4:"DU3, módulo 4",laerEtNytOrd:"Aprender una palabra nueva",laerEtNytOrdDesc:"Explora cómo se conectan las palabras en redes.",wordNetworkExplanation:"Las palabras están conectadas con otras palabras. Ayuda a recordar la palabra mucho mejor cuando sabes cómo se conecta con otras palabras.",targetWord:"Perro",hypernym:"Hiperónimo",hypernymWord:"Animal",synonym:"Sinónimo",synonymWord:"Perrito (Vovse)",antonym:"Antónimo",antonymWord:"Gato",hyponym:"Hipónimo",hyponymWord:"Caniche",geminiBtnText:"Aprender una palabra - haz clic aquí",geminiConsentText:"Al hacer clic en este enlace, aceptas que estás utilizando un producto de Google y que Google entrena la inteligencia artificial con tus respuestas.",hverdagssamtale:"Conversación diaria",hverdagssamtaleDesc:"Practica conversaciones comunes sobre la vida diaria.",samtaleBolig:"Conversación sobre vivienda",samtaleArbejde:"Conversación sobre trabajo",samtaleBtnText:"Empezar la conversación - haz clic aquí",skriveHjaelpBtnText:"Ayuda con la escritura - haz clic aquí",du1mod3Desc:"Elige un tema para practicar.",minHverdag:"Mi vida diaria",minBolig:"Mi vivienda",mitArbejde:"Mi trabajo",minHverdagDesc:"Tareas sobre tu vida cotidiana.",transportSprogskole:"Transporte a la escuela",madlavning:"Cocina",rengoering:"Limpieza",transportDesc:"¿Cómo vienes a la escuela?",padletDesc:"Comparte con la clase cómo has llegado a la escuela hoy.",padletBtnText:"Abrir Padlet",madlavningDesc:"¿Qué tipo de comida te gusta cocinar?",madlavningPadletDesc:"Comparte tus experiencias culinarias con la clase aquí.",rengoeringDesc:"¿Cómo haces la limpieza?",rengoeringPadletDesc:"Comparte tus pensamientos sobre la limpieza con la clase.",traenTidsudtryk:"Entrenamiento de expresiones de tiempo",traenTidsudtrykDesc:"¿Cómo se usan las diferentes expresiones de tiempo en danés?",traenTidsudtrykBtnText:"Abrir ejercicio de expresiones de tiempo",ordstilling:"Orden de las palabras",ordstillingDesc:"Reorganiza las palabras y ponlas en el orden correcto.",checkResult:"Comprobar respuesta",correctOrder:"¡Genial! El orden es correcto.",wrongOrder:"No es correcto. ¡Inténtalo de nuevo!",ordstillingLet:"Orden de las palabras (Fácil)",ordstillingSvaer:"Orden de las palabras (Difícil)",levelA1:"Frases A1",levelA2:"Frases A2",traenGrammatik:"Practicar Gramática",grammatikDesc:"Completa los huecos con las palabras correctas en el texto.",let:"Fácil (A1)",mellemsvaer:"Intermedio (A2)",svaer:"Difícil (B1)",grammatikIntro:"Selecciona un nivel para comenzar el ejercicio.",checkAnswers:"Comprobar todas las respuestas",allCorrect:"¡Fantástico! Todas las respuestas son correctas.",someWrong:"Algunas de tus respuestas no son del todo correctas. ¡Inténtalo de nuevo!",newExercise:"Siguiente texto",hintMean:"Esta palabra no tiene sentido en este contexto.",hintTense:"Comprueba el tiempo verbal. ¿Es presente o pasado?",hintForm:"Comprueba la forma de la palabra (p. ej., género o singular/plural).",hintPerson:"Comprueba quién realiza la acción (yo, tú, él/ella).",hintContext:"Lee todo el texto de nuevo. ¿Qué encaja mejor aquí?",hintName:"Necesitas una palabra para nombres aquí.",hintPlace:"Necesitas una palabra para lugares aquí.",hintAction:"Esta palabra describe una acción diferente."}},j={lang:localStorage.getItem("appLang")||null,currentView:"language"};function Q(){return j.lang||"da"}function a(g){const m=U[Q()];return m&&m[g]?m[g]:U.da[g]||g}function Z(g){j.lang=g,localStorage.setItem("appLang",g)}function X(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("h1");c.textContent="Træning i dansk";const t=document.createElement("p");t.className="subtitle",t.textContent="Vælg sprog / Select language";const p=document.createElement("div");p.className="lang-list",[{code:"da",label:"Dansk"},{code:"en",label:"English"},{code:"ar",label:"العربية"},{code:"ur",label:"اردو"},{code:"zh",label:"中文"},{code:"ru",label:"Русский"},{code:"ne",label:"नेपाली"},{code:"th",label:"ไทย"},{code:"pt",label:"Português"},{code:"vi",label:"Tiếng Việt"},{code:"fa",label:"فارسی"},{code:"tr",label:"Türkçe"},{code:"es",label:"Español"}].forEach(r=>{const i=document.createElement("button");i.className="lang-btn",i.textContent=r.label,i.onclick=()=>{Z(r.code),m("main")},p.appendChild(i)}),e.appendChild(c),e.appendChild(t),e.appendChild(p),g.appendChild(e)}function ee(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("h1");c.textContent=a("title");const t=document.createElement("p");t.className="subtitle",t.textContent=a("subtitle");const p=document.createElement("div");p.className="top-bar",p.style.justifyContent="flex-end",p.style.marginBottom="20px";const s=document.createElement("button");s.className="back-btn",s.textContent="🌐 "+a("selectLanguage"),s.onclick=()=>m("language"),p.appendChild(s);const r=[{icon:"✨",titleKey:"dagensOpgave",descKey:"dagensOpgaveDesc",action:()=>m("dagens_opgave")},{icon:"🎓",titleKey:"modulTest",descKey:"modulTestDesc",action:()=>alert("Mock: Gå til Træning til modultest")},{icon:"📘",titleKey:"notes",descKey:"notesDesc",action:()=>m("notes")},{icon:"💬",titleKey:"lavSporgsmal",descKey:"lavSporgsmalDesc",action:()=>m("lav_sporgsmal")},{icon:"🗣️",titleKey:"samtaleTraening",descKey:"samtaleTraeningDesc",action:()=>m("samtale_traening")},{icon:"✍️",titleKey:"skriveHjaelp",descKey:"skriveHjaelpDesc",action:()=>m("skrive_hjaelp")},{icon:"🏃",titleKey:"verbumLearning",descKey:"verbumLearningDesc",action:()=>m("verbum_learning")}],i=document.createElement("div");i.className="grid",r.forEach(l=>{const d=document.createElement("div");d.className="card",d.onclick=l.action;const n=document.createElement("div");n.className="card-icon",n.textContent=l.icon;const h=document.createElement("div");h.className="card-title",h.textContent=a(l.titleKey);const v=document.createElement("div");v.className="card-desc",v.textContent=a(l.descKey),d.appendChild(n),d.appendChild(h),d.appendChild(v),i.appendChild(d)});const o=document.createElement("footer");o.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(p),e.appendChild(c),e.appendChild(t),e.appendChild(i),e.appendChild(o),g.appendChild(e)}function te(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("notes");const s=document.createElement("p");s.className="subtitle",s.textContent=a("notesDesc");const r=(d,n,h)=>{if(localStorage.getItem(`access_${d}`)===h){m(n);return}const y=prompt(a("enterPassword"));y===h?(localStorage.setItem(`access_${d}`,h),m(n)):y!==null&&alert("Forkert adgangskode / Incorrect password")},i=[{icon:"📓",titleKey:"du1mod3",descKey:"",action:()=>r("du1_mod3","du1_modul3","dansk103")},{icon:"📖",titleKey:"du2mod1",descKey:"",action:()=>r("du2_mod1","du2_modul1","dansk307")},{icon:"📂",titleKey:"du2mod5",descKey:"",action:()=>m("du2_modul5")},{icon:"📚",titleKey:"du3mod4",descKey:"",action:()=>alert("Mock: Åbner DU3, modul 4")}],o=document.createElement("div");o.className="grid",i.forEach(d=>{const n=document.createElement("div");n.className="card",n.onclick=d.action;const h=document.createElement("div");h.className="card-icon",h.textContent=d.icon;const v=document.createElement("div");if(v.className="card-title",v.textContent=a(d.titleKey),n.appendChild(h),n.appendChild(v),d.descKey){const y=document.createElement("div");y.className="card-desc",y.textContent=a(d.descKey),n.appendChild(y)}o.appendChild(n)});const l=document.createElement("footer");l.innerHTML='© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.',e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(o),e.appendChild(l),g.appendChild(e)}function ne(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("dagensOpgave");const s=document.createElement("p");s.className="subtitle",s.textContent=a("dagensOpgaveDesc");const r=[{icon:"🧠",titleKey:"laerEtNytOrd",descKey:"laerEtNytOrdDesc",action:()=>m("word_learning")},{icon:"⏰",titleKey:"traenTidsudtryk",descKey:"traenTidsudtrykDesc",action:()=>m("traen_tidsudtryk")},{icon:"📖",titleKey:"traenGrammatik",descKey:"grammatikDesc",action:()=>m("traen_grammatik")},{icon:"🧩",titleKey:"ordstilling",descKey:"ordstillingDesc",action:()=>m("ordstilling")},{icon:"🫂",titleKey:"hvilketOrd",descKey:"hvilketOrdDesc",action:()=>m("pronomen")},{icon:"🏗️",titleKey:"howToBuildSentence",descKey:"howToBuildSentenceDesc",action:()=>m("grounding")}],i=document.createElement("div");i.className="grid",r.forEach(o=>{const l=document.createElement("div");l.className="card",l.onclick=o.action;const d=document.createElement("div");d.className="card-icon",d.textContent=o.icon;const n=document.createElement("div");if(n.className="card-title",n.textContent=a(o.titleKey),l.appendChild(d),l.appendChild(n),o.descKey){const h=document.createElement("div");h.className="card-desc",h.textContent=a(o.descKey),l.appendChild(h)}i.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),g.appendChild(e)}function ae(g,m){const e=document.createElement("div");e.className="view-container word-learning-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("dagens_opgave"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("laerEtNytOrd");const s=document.createElement("div");s.className="semantic-network",[{class:"node center",label:a("targetWord"),hint:""},{class:"node top",label:a("hypernymWord"),hint:a("hypernym")},{class:"node bottom",label:a("hyponymWord"),hint:a("hyponym")},{class:"node left",label:a("synonymWord"),hint:a("synonym")},{class:"node right",label:a("antonymWord"),hint:a("antonym")}].forEach(h=>{const v=document.createElement("div");v.className=h.class;const y=document.createElement("div");if(y.className="word",y.textContent=h.label,v.appendChild(y),h.hint){const A=document.createElement("div");A.className="hint",A.textContent=h.hint,v.appendChild(A)}s.appendChild(v)}),s.insertAdjacentHTML("afterbegin",`
      <svg class="network-lines" xmlns="http://www.w3.org/2000/svg">
        <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
      </svg>
    `);const i=document.createElement("p");i.className="word-explanation",i.textContent=a("wordNetworkExplanation");const o=document.createElement("div");o.className="consent-container";const l=document.createElement("input");l.type="checkbox",l.className="consent-checkbox",l.id="gemini-consent";const d=document.createElement("label");d.htmlFor="gemini-consent",d.className="consent-text",d.textContent=a("geminiConsentText"),o.appendChild(l),o.appendChild(d);const n=document.createElement("a");n.href="https://gemini.google.com/gem/1053Zk0akFAs0u3zMgYkZbtae9CO55Tyb?usp=sharing",n.target="_blank",n.className="gemini-btn disabled",n.textContent=a("geminiBtnText"),l.addEventListener("change",h=>{h.target.checked?n.classList.remove("disabled"):n.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),e.appendChild(o),e.appendChild(n),g.appendChild(e)}function re(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("samtaleTraening");const s=document.createElement("p");s.className="subtitle",s.textContent=a("samtaleTraeningDesc");const r=[{icon:"🗣",titleKey:"hverdagssamtale",action:()=>m("samtale_hverdag")},{icon:"🏠",titleKey:"samtaleBolig",action:()=>alert("Mock: Åbner "+a("samtaleBolig"))},{icon:"💼",titleKey:"samtaleArbejde",action:()=>alert("Mock: Åbner "+a("samtaleArbejde"))}],i=document.createElement("div");i.className="grid",r.forEach(o=>{const l=document.createElement("div");l.className="card",l.onclick=o.action;const d=document.createElement("div");d.className="card-icon",d.textContent=o.icon;const n=document.createElement("div");n.className="card-title",n.textContent=a(o.titleKey),l.appendChild(d),l.appendChild(n),i.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),g.appendChild(e)}function ie(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("samtale_traening"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("hverdagssamtale");const s=document.createElement("p");s.className="subtitle",s.textContent=a("hverdagssamtaleDesc");const r=document.createElement("div");r.className="consent-container",r.style.margin="2rem auto";const i=document.createElement("input");i.type="checkbox",i.className="consent-checkbox",i.id="gemini-consent-samtale";const o=document.createElement("label");o.htmlFor="gemini-consent-samtale",o.className="consent-text",o.textContent=a("geminiConsentText"),r.appendChild(i),r.appendChild(o);const l=document.createElement("div");l.style.textAlign="center";const d=document.createElement("a");d.href="https://gemini.google.com/gem/1SX-yUWDxh31wEL0RZ7BSacdDUvWGtn-8?usp=sharing",d.target="_blank",d.className="gemini-btn disabled",d.textContent=a("samtaleBtnText"),l.appendChild(d),i.addEventListener("change",n=>{n.target.checked?d.classList.remove("disabled"):d.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(r),e.appendChild(l),g.appendChild(e)}function oe(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("skriveHjaelp");const s=document.createElement("p");s.className="subtitle",s.textContent=a("skriveHjaelpDesc");const r=document.createElement("div");r.className="consent-container",r.style.margin="2rem auto";const i=document.createElement("input");i.type="checkbox",i.className="consent-checkbox",i.id="gemini-consent-skrive";const o=document.createElement("label");o.htmlFor="gemini-consent-skrive",o.className="consent-text",o.textContent=a("geminiConsentText"),r.appendChild(i),r.appendChild(o);const l=document.createElement("div");l.style.textAlign="center";const d=document.createElement("a");d.href="https://gemini.google.com/gem/1Ke_Ges6JxMDC51hTM744lHSQm_fi9BhQ?usp=sharing",d.target="_blank",d.className="gemini-btn disabled",d.textContent=a("skriveHjaelpBtnText"),l.appendChild(d),i.addEventListener("change",n=>{n.target.checked?d.classList.remove("disabled"):d.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(r),e.appendChild(l),g.appendChild(e)}function se(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("notes"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("du1mod3");const s=document.createElement("p");s.className="subtitle",s.textContent=a("du1mod3Desc");const r=[{icon:"📅",titleKey:"minHverdag",action:()=>m("du1_min_hverdag")},{icon:"🏠",titleKey:"minBolig",action:()=>alert("Mock: Åbner "+a("minBolig"))},{icon:"💼",titleKey:"mitArbejde",action:()=>alert("Mock: Åbner "+a("mitArbejde"))}],i=document.createElement("div");i.className="grid",r.forEach(o=>{const l=document.createElement("div");l.className="card",l.onclick=o.action;const d=document.createElement("div");d.className="card-icon",d.textContent=o.icon;const n=document.createElement("div");n.className="card-title",n.textContent=a(o.titleKey),l.appendChild(d),l.appendChild(n),i.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),g.appendChild(e)}function le(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du1_modul3"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("minHverdag");const s=document.createElement("p");s.className="subtitle",s.textContent=a("minHverdagDesc");const r=[{icon:"🚌",titleKey:"transportSprogskole",action:()=>m("transport_sprogskole")},{icon:"🍳",titleKey:"madlavning",action:()=>m("du1_madlavning")},{icon:"🧹",titleKey:"rengoering",action:()=>m("du1_rengoering")}],i=document.createElement("div");i.className="grid",r.forEach(o=>{const l=document.createElement("div");l.className="card",l.onclick=o.action;const d=document.createElement("div");d.className="card-icon",d.textContent=o.icon;const n=document.createElement("div");n.className="card-title",n.textContent=a(o.titleKey),l.appendChild(d),l.appendChild(n),i.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),g.appendChild(e)}function ce(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du1_min_hverdag"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("transportSprogskole");const s=document.createElement("p");s.className="subtitle",s.textContent=a("transportDesc");const r=document.createElement("div");r.className="transport-content",r.style.display="flex",r.style.flexDirection="column",r.style.alignItems="center",r.style.gap="2rem",r.style.marginTop="2rem",r.style.width="100%";const i=document.createElement("div");i.className="image-container",i.style.width="100%",i.style.maxWidth="600px",i.style.borderRadius="var(--border-radius)",i.style.overflow="hidden",i.style.boxShadow="var(--box-shadow)";const o=document.createElement("img");o.src=`${baseUrl}Gemini_Generated_Image_bnobabnobabnobab.png`,o.alt="Transport illustration",o.style.width="100%",o.style.height="auto",o.style.display="block",i.appendChild(o);const l=document.createElement("div");l.className="padlet-link-container",l.style.width="100%",l.style.maxWidth="600px",l.style.textAlign="center",l.style.backgroundColor="var(--card-bg)",l.style.padding="2rem",l.style.borderRadius="var(--border-radius)",l.style.boxShadow="var(--box-shadow)",l.style.border="1px solid var(--accent-red)";const d=document.createElement("p");d.textContent=a("padletDesc"),d.style.marginBottom="1.5rem",d.style.fontSize="1.2rem";const n=document.createElement("a");n.href="https://padlet.com/mibf/hvordan-kommer-du-til-sprogskole-gm97y985khw1csk1",n.target="_blank",n.className="padlet-btn",n.textContent=a("padletBtnText"),n.style.display="inline-block",n.style.padding="1rem 3rem",n.style.backgroundColor="var(--text-light)",n.style.color="var(--bg-deep-red)",n.style.textDecoration="none",n.style.borderRadius="30px",n.style.fontWeight="700",n.style.fontSize="1.2rem",n.style.transition="all 0.3s ease",n.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",n.onmouseover=()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)",n.style.outline="2px solid var(--text-light)",n.style.outlineOffset="2px"},n.onmouseout=()=>{n.style.transform="translateY(0)",n.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",n.style.outline="none"},l.appendChild(d),l.appendChild(n),r.appendChild(i),r.appendChild(l),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(r),g.appendChild(e)}function de(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du1_min_hverdag"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("madlavning");const s=document.createElement("p");s.className="subtitle",s.textContent=a("madlavningDesc");const r=document.createElement("div");r.className="madlavning-content",r.style.display="flex",r.style.flexDirection="column",r.style.alignItems="center",r.style.gap="2rem",r.style.marginTop="2rem",r.style.width="100%";const i=document.createElement("div");i.className="image-container",i.style.width="100%",i.style.maxWidth="600px",i.style.borderRadius="var(--border-radius)",i.style.overflow="hidden",i.style.boxShadow="var(--box-shadow)";const o=document.createElement("img");o.src=`${baseUrl}mad.png`,o.alt="Madlavning illustration",o.style.width="100%",o.style.height="auto",o.style.display="block",i.appendChild(o);const l=document.createElement("div");l.className="padlet-link-container",l.style.width="100%",l.style.maxWidth="600px",l.style.textAlign="center",l.style.backgroundColor="var(--card-bg)",l.style.padding="2rem",l.style.borderRadius="var(--border-radius)",l.style.boxShadow="var(--box-shadow)",l.style.border="1px solid var(--accent-red)";const d=document.createElement("p");d.textContent=a("madlavningPadletDesc"),d.style.marginBottom="1.5rem",d.style.fontSize="1.2rem";const n=document.createElement("a");n.href="https://padlet.com/mibf/b-rn-og-mad-fvyr130ka0n9f2yu",n.target="_blank",n.className="padlet-btn",n.textContent=a("padletBtnText"),n.style.display="inline-block",n.style.padding="1rem 3rem",n.style.backgroundColor="var(--text-light)",n.style.color="var(--bg-deep-red)",n.style.textDecoration="none",n.style.borderRadius="30px",n.style.fontWeight="700",n.style.fontSize="1.2rem",n.style.transition="all 0.3s ease",n.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",n.onmouseover=()=>{n.style.transform="translateY(-2px)",n.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)"},n.onmouseout=()=>{n.style.transform="translateY(0)",n.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"},l.appendChild(d),l.appendChild(n),r.appendChild(i),r.appendChild(l),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(r),g.appendChild(e)}function me(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du1_min_hverdag"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("rengoering");const s=document.createElement("p");s.className="subtitle",s.textContent=a("rengoeringDesc");const r=document.createElement("div");r.className="rengoering-content",r.style.display="flex",r.style.flexDirection="column",r.style.alignItems="center",r.style.gap="2rem",r.style.marginTop="2rem",r.style.width="100%";const i=document.createElement("div");i.style.display="grid",i.style.gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))",i.style.gap="1.5rem",i.style.width="100%",i.style.maxWidth="800px",["rent1.png","rent2.png"].forEach(n=>{const h=document.createElement("div");h.style.borderRadius="var(--border-radius)",h.style.overflow="hidden",h.style.boxShadow="var(--box-shadow)";const v=document.createElement("img");v.src=`${baseUrl}${n}`,v.alt="Rengøring illustration",v.style.width="100%",v.style.height="auto",v.style.display="block",h.appendChild(v),i.appendChild(h)});const o=document.createElement("div");o.className="padlet-link-container",o.style.width="100%",o.style.maxWidth="600px",o.style.textAlign="center",o.style.backgroundColor="var(--card-bg)",o.style.padding="2rem",o.style.borderRadius="var(--border-radius)",o.style.boxShadow="var(--box-shadow)",o.style.border="1px solid var(--accent-red)";const l=document.createElement("p");l.textContent=a("rengoeringPadletDesc"),l.style.marginBottom="1.5rem",l.style.fontSize="1.2rem";const d=document.createElement("a");d.href="https://padlet.com/mibf/jeg-g-r-rent-5udv7g0gczbo7vq9",d.target="_blank",d.className="padlet-btn",d.textContent=a("padletBtnText"),d.style.display="inline-block",d.style.padding="1rem 3rem",d.style.backgroundColor="var(--text-light)",d.style.color="var(--bg-deep-red)",d.style.textDecoration="none",d.style.borderRadius="30px",d.style.fontWeight="700",d.style.fontSize="1.2rem",d.style.transition="all 0.3s ease",d.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",d.onmouseover=()=>{d.style.transform="translateY(-2px)",d.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)"},d.onmouseout=()=>{d.style.transform="translateY(0)",d.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"},o.appendChild(l),o.appendChild(d),r.appendChild(i),r.appendChild(o),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(r),g.appendChild(e)}function pe(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("notes"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("du2mod1");const s=document.createElement("p");s.className="subtitle",s.textContent=a("du1mod3Desc");const r=[{icon:"📚",titleKey:"smaahistorier",action:()=>m("smaa_historier")}],i=document.createElement("div");i.className="grid",r.forEach(o=>{const l=document.createElement("div");l.className="card",l.onclick=o.action;const d=document.createElement("div");d.className="card-icon",d.textContent=o.icon;const n=document.createElement("div");n.className="card-title",n.textContent=a(o.titleKey),l.appendChild(d),l.appendChild(n),i.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),g.appendChild(e)}function ge(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du2_modul1"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("smaahistorier");const s=document.createElement("p");s.className="subtitle",s.textContent=a("du1mod3Desc");const r=[{icon:"📝",title:"Lisa og Jens",action:()=>window.open("https://padlet.com/mibf/historie-om-lisa-og-jens-omv7710nz0tnp49","_blank")},{icon:"📝",title:"Andrea",action:()=>window.open("https://padlet.com/mibf/historie-om-andrea-26kzbgxc28yhl436","_blank")}],i=document.createElement("div");i.className="grid",r.forEach(o=>{const l=document.createElement("div");l.className="card",l.onclick=o.action;const d=document.createElement("div");d.className="card-icon",d.textContent=o.icon;const n=document.createElement("div");n.className="card-title",n.textContent=o.title,l.appendChild(d),l.appendChild(n),i.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),g.appendChild(e)}function he(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("notes"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("du2mod5");const s=document.createElement("p");s.className="subtitle",s.textContent=a("du1mod3Desc");const r=[{icon:"📧",titleKey:"emailLaan",action:()=>m("email_laan")},{icon:"👨‍👩‍👧‍👦",titleKey:"opdragelse",action:()=>m("opdragelse")},{icon:"📢",titleKey:"enKlage",action:()=>m("en_klage")}],i=document.createElement("div");i.className="grid",r.forEach(o=>{const l=document.createElement("div");l.className="card",l.onclick=o.action;const d=document.createElement("div");d.className="card-icon",d.textContent=o.icon;const n=document.createElement("div");n.className="card-title",n.textContent=a(o.titleKey),l.appendChild(d),l.appendChild(n),i.appendChild(l)}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(i),g.appendChild(e)}function ue(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du2_modul5"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("emailLaan");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/e-mail-om-l-n-af-penge-pkdkrzrhemi6ftc4","_blank");const r=document.createElement("div");r.className="card-icon",r.textContent="📧";const i=document.createElement("div");i.className="card-title",i.textContent=a("emailLaan")+" (Padlet)",s.appendChild(r),s.appendChild(i),e.appendChild(c),e.appendChild(p),e.appendChild(s),g.appendChild(e)}function ke(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du2_modul5"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("opdragelse");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/fort-l-om-hvordan-du-blev-opdraget-se-opgave-16-side-48-i-fo-zhgtyifmg9e4f5ut","_blank");const r=document.createElement("div");r.className="card-icon",r.textContent="👨‍👩‍👧‍👦";const i=document.createElement("div");i.className="card-title",i.textContent=a("opdragelse")+" (Padlet)",s.appendChild(r),s.appendChild(i),e.appendChild(c),e.appendChild(p),e.appendChild(s),g.appendChild(e)}function be(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("du2_modul5"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("enKlage");const s=document.createElement("div");s.className="card",s.style.cursor="pointer",s.onclick=()=>window.open("https://padlet.com/mibf/en-klage-fv80qrahnyjw5e45","_blank");const r=document.createElement("div");r.className="card-icon",r.textContent="📢";const i=document.createElement("div");i.className="card-title",i.textContent=a("enKlage")+" (Padlet)",s.appendChild(r),s.appendChild(i),e.appendChild(c),e.appendChild(p),e.appendChild(s),g.appendChild(e)}function ve(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("dagens_opgave"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=a("traenTidsudtryk");const s=document.createElement("p");s.className="subtitle",s.textContent=a("traenTidsudtrykDesc"),e.appendChild(p),e.appendChild(s);const r=[{text:"Jeg drak kaffe [blank_0].",blanks:[{answer:"i morges",options:["i morges","i morgen","nu"],hint:"Se på verbet 'drak'. Er det nutid eller datid?"}]},{text:"Vi drikker vand [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Se på verbet 'drikker'. Er det nutid eller datid?"}]},{text:"Han skal til lægen [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","i går","nu"],hint:"Se på verbet 'skal'. Det indikerer noget, der sker senere."}]},{text:"Hun var i biografen [blank_0].",blanks:[{answer:"i går",options:["i går","nu","i næste uge"],hint:"Se på verbet 'var'. Er det nutid eller datid?"}]},{text:"De spiller fodbold [blank_0].",blanks:[{answer:"om søndagen",options:["om søndagen","i går","på fredag"],hint:"Her beskrives noget, man gør hver uge."}]},{text:"Vi rejser til Spanien [blank_0].",blanks:[{answer:"i næste uge",options:["i næste uge","nu","i går"],hint:"Det er en plan for fremtiden."}]},{text:"Jeg læste en bog [blank_0].",blanks:[{answer:"i lørdags",options:["i lørdags","på søndag","i morgen"],hint:"Se på verbet 'læste'. Er det nutid eller datid?"}]},{text:"[blank_0] drikker vi kaffe.",blanks:[{answer:"Om morgenen",options:["Om morgenen","I går","I morgen"],hint:"Vi gør det som en vane hver dag."}]},{text:"[blank_0] var jeg træt.",blanks:[{answer:"I går",options:["I går","Nu","På mandag"],hint:"Se på verbet 'var'. Det er datid."}]},{text:"Jeg køber ind [blank_0].",blanks:[{answer:"i morgen",options:["i morgen","nu","i går"],hint:"Her er tale om en plan for fremtiden."}]},{text:"[blank_0] skal vi på ferie.",blanks:[{answer:"I næste måned",options:["I næste måned","I går","Nu"],hint:"Det er noget, der skal ske i fremtiden."}]},{text:"Vi går en tur [blank_0].",blanks:[{answer:"hver dag",options:["hver dag","i går","i morgen"],hint:"Det er noget, vi gør fast."}]},{text:"[blank_0] drak jeg en øl.",blanks:[{answer:"I fredags",options:["I fredags","Nu","På søndag"],hint:"Se på verbet 'drak'. Det er datid."}]},{text:"[blank_0] skal hun til fest.",blanks:[{answer:"På lørdag",options:["På lørdag","I går","Nu"],hint:"Det er en plan for fremtiden."}]},{text:"De ser fjernsyn [blank_0].",blanks:[{answer:"nu",options:["nu","i går","på torsdag"],hint:"Det foregår lige nu."}]}];let i=0;const o=document.createElement("div");o.className="exercise-card",e.appendChild(o);function l(){o.innerHTML="";const d=r[i],n=document.createElement("div");n.className="exercise-progress",n.style.textAlign="center",n.style.marginBottom="1rem",n.style.fontSize="0.9rem",n.style.opacity="0.7",n.textContent=`${i+1} / ${r.length}`,o.appendChild(n);const h=document.createElement("div");h.className="grammatik-text-container",d.text.split(/(\[blank_\d+\])/).forEach(T=>{const E=T.match(/\[blank_(\d+)\]/);if(E){const S=E[1],H=document.createElement("span");H.className="select-wrapper";const C=document.createElement("select");C.className="grammatik-select",C.dataset.idx=S;const k=document.createElement("option");k.value="",k.textContent="...",C.appendChild(k),d.blanks[S].options.forEach(x=>{const b=document.createElement("option");b.value=x,b.textContent=x,C.appendChild(b)}),H.appendChild(C),h.appendChild(H)}else{const S=document.createElement("span");S.textContent=T,h.appendChild(S)}}),o.appendChild(h);const y=document.createElement("div");y.className="exercise-feedback",o.appendChild(y);const A=document.createElement("div");A.className="game-controls";const u=document.createElement("button");u.className="gemini-btn",u.textContent=a("checkAnswers"),u.onclick=()=>{const T=h.querySelectorAll("select");let E=!0,S="";T.forEach(H=>{const C=H.dataset.idx;H.value===d.blanks[C].answer?(H.classList.add("correct"),H.classList.remove("wrong")):(H.classList.add("wrong"),H.classList.remove("correct"),E=!1,S||(S=d.blanks[C].hint))}),E?(y.style.display="none",u.style.display="none",f.style.display="inline-block"):(y.textContent=S||a("hintContext"),y.style.display="block")};const f=document.createElement("button");f.className="gemini-btn",f.textContent=i<r.length-1?a("next"):a("finish"),f.style.display="none",f.onclick=()=>{i<r.length-1?(i++,l()):m("dagens_opgave")},A.appendChild(u),A.appendChild(f),o.appendChild(A)}l(),g.appendChild(e)}function ye(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("main"),c.appendChild(t);const p=document.createElement("h1");p.textContent=a("lavSporgsmal");const s=document.createElement("p");s.className="subtitle",s.textContent=a("lavSporgsmalDesc");const r=document.createElement("div");r.className="image-container",r.style.width="100%",r.style.maxWidth="600px",r.style.margin="2rem auto",r.style.borderRadius="var(--border-radius)",r.style.overflow="hidden",r.style.boxShadow="var(--box-shadow)";const i=document.createElement("img");i.src=`${$}questions.png`,i.alt="Spørgsmålsdannelse illustration",i.style.width="100%",i.style.height="auto",i.style.display="block",r.appendChild(i);const o=document.createElement("div");o.className="consent-container",o.style.margin="2rem auto";const l=document.createElement("input");l.type="checkbox",l.className="consent-checkbox",l.id="gemini-consent-lav-sporgsmal";const d=document.createElement("label");d.htmlFor="gemini-consent-lav-sporgsmal",d.className="consent-text",d.textContent=a("geminiConsentText"),o.appendChild(l),o.appendChild(d);const n=document.createElement("div");n.style.textAlign="center";const h=document.createElement("a");h.href="https://gemini.google.com/gem/1OKZRFhv_TlP2M32ApMHWsFVh4aCLHdNU?usp=sharing",h.target="_blank",h.className="gemini-btn disabled",h.textContent=a("lavSporgsmalBtnText"),n.appendChild(h),l.addEventListener("change",v=>{v.target.checked?h.classList.remove("disabled"):h.classList.add("disabled")}),e.appendChild(c),e.appendChild(p),e.appendChild(s),e.appendChild(r),e.appendChild(o),e.appendChild(n),g.appendChild(e)}function xe(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${a("back")}`,t.onclick=()=>{r.style.display==="block"?(r.style.display="none",s.style.display="block",p.textContent=a("ordstilling")):m("dagens_opgave")},c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=a("ordstilling"),e.appendChild(p);const s=document.createElement("div"),r=document.createElement("div");r.style.display="none";const i=document.createElement("p");i.className="subtitle",i.textContent=a("ordstillingDesc"),s.appendChild(i);const o=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"}],l=document.createElement("div");l.className="grid",o.forEach(n=>{const h=document.createElement("div");h.className="card",h.onclick=()=>d(n.level);const v=document.createElement("div");v.className="card-icon",v.textContent=n.icon;const y=document.createElement("div");y.className="card-title",y.textContent=a(n.key),h.appendChild(v),h.appendChild(y),l.appendChild(h)}),s.appendChild(l),e.appendChild(s);function d(n){s.style.display="none",r.style.display="block",r.innerHTML="",p.textContent=a(n==="A1"?"ordstillingLet":"ordstillingSvaer");const y=n==="A1"?["Jeg hedder Mikael.","Jeg kommer fra Danmark.","Hvor gammel er du?","Jeg bor i København.","Hvad laver du?","Jeg har en hund.","Min bil er rød.","Kaffen er varm."]:["Solen skinner altid i min have.","Jeg kan godt lide at lære dansk.","Vi ses i morgen på sprogskolen.","Kan du tale dansk og engelsk?","I går var jeg i biografen med min ven.","Jeg skal købe ind i supermarkedet nu.","Hvorfor kom du ikke til festen?","Det er vigtigt at øve sig hver dag."];let A=Math.floor(Math.random()*y.length),u,f,T,E;function S(){u=y[A],f=u.split(" "),T=[...f].sort(()=>Math.random()-.5),E=[]}const H=document.createElement("div");H.className="result-sentence-area";const C=document.createElement("div");C.className="word-pool";const k=document.createElement("div");k.className="game-feedback";const x=document.createElement("div");x.className="game-controls";const b=document.createElement("button");b.className="gemini-btn",b.textContent=a("checkResult"),b.onclick=()=>{E.join(" ")===u?(k.textContent=a("correctOrder"),k.className="game-feedback success",b.style.display="none",w.style.display="inline-block"):(k.textContent=a("wrongOrder"),k.className="game-feedback error")};const w=document.createElement("button");w.className="gemini-btn",w.textContent="Næste →",w.style.display="none",w.onclick=()=>{A=(A+1)%y.length,B()};function B(){S(),r.innerHTML="";const D=document.createElement("img");D.src=$+"v2_master_diagram.png",D.className="v2-illustration",r.appendChild(D),r.appendChild(H),r.appendChild(C),r.appendChild(k),x.innerHTML="",x.appendChild(b),x.appendChild(w),r.appendChild(x),b.style.display="inline-block",w.style.display="none",k.textContent="",N()}function N(){C.innerHTML="",T.forEach((D,M)=>{const P=document.createElement("div");P.className="word-chip",P.textContent=D,P.onclick=()=>{T.splice(M,1),E.push(D),N()},C.appendChild(P)}),H.innerHTML="",E.length===0?H.innerHTML='<div class="result-placeholder">...</div>':E.forEach((D,M)=>{const P=document.createElement("div");P.className="word-chip result-chip",P.textContent=D,P.onclick=()=>{E.splice(M,1),T.push(D),N()},H.appendChild(P)})}B()}if(e.appendChild(r),g.appendChild(e),!document.getElementById("ordstilling-styles")){const n=document.createElement("style");n.id="ordstilling-styles",n.textContent=`
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
        `,document.head.appendChild(n)}}function fe(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${a("back")}`,t.onclick=()=>m("main"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=a("traenGrammatik"),e.appendChild(p);const s=document.createElement("div"),r=document.createElement("div");r.style.display="none";const i=document.createElement("p");i.className="subtitle",i.textContent=a("grammatikIntro"),s.appendChild(i);const o=[{key:"let",level:"A1",icon:"🌱"},{key:"mellemsvaer",level:"A2",icon:"🌿"},{key:"svaer",level:"B1",icon:"🌳"},{key:"modultest",level:"modultest",icon:"🎓"}],l=document.createElement("div");l.className="grid",o.forEach(n=>{const h=document.createElement("div");h.className="card",h.onclick=()=>d(n.level);const v=document.createElement("div");v.className="card-icon",v.textContent=n.icon;const y=document.createElement("div");y.className="card-title",y.textContent=a(n.key),h.appendChild(v),h.appendChild(y),l.appendChild(h)}),s.appendChild(l),e.appendChild(s);function d(n){s.style.display="none",r.style.display="block",r.innerHTML="";const h=document.createElement("h2");h.textContent=a(n==="A1"?"let":n==="A2"?"mellemsvaer":n==="B1"?"svaer":"modultest"),h.style.textAlign="center",r.appendChild(h);const v=Ce(n);let y=0;function A(){r.innerHTML="",r.appendChild(h);const u=v[y];if(n==="modultest"){const b=document.createElement("div");b.className="word-list-hint";const B=[...u.blanks.map(N=>N.answer)].sort(()=>Math.random()-.5);b.textContent=B.join(", "),r.appendChild(b)}const f=document.createElement("div");f.className="grammatik-text-container",u.text.split(/(\[blank_\d+\])/).forEach(b=>{const w=b.match(/\[blank_(\d+)\]/);if(w){const B=w[1],N=document.createElement("span");N.className="select-wrapper";const D=document.createElement("select");D.className="grammatik-select",D.dataset.idx=B;const M=document.createElement("option");M.value="",M.textContent="...",D.appendChild(M);let P=[...u.blanks[B].options];P.sort(()=>Math.random()-.5),P.forEach(I=>{const L=document.createElement("option");L.value=I,L.textContent=I,D.appendChild(L)}),N.appendChild(D),f.appendChild(N)}else{const B=document.createElement("span");B.textContent=b,f.appendChild(B)}}),r.appendChild(f);const E=document.createElement("div");E.className="exercise-feedback",r.appendChild(E);const S=document.createElement("div");S.className="grammatik-summary",r.appendChild(S);function H(){const b=f.querySelectorAll("select"),w=Array.from(b).filter(D=>D.value!=="").length,B=Array.from(b).filter(D=>D.classList.contains("correct")).length,N=b.length;w===0?S.textContent="":B===N?(S.innerHTML=`<span class="success">${a("allCorrect")}</span>`,k.style.display="none",x.style.display="block",E.style.display="none"):S.textContent=`${w} / ${N} ${a("filled")||"udfyldt"}`}f.querySelectorAll("select").forEach(b=>{b.onchange=()=>{const w=b.dataset.idx;if(b.value==="")b.classList.remove("correct","wrong"),E.style.display="none";else if(b.value===u.blanks[w].answer)b.classList.add("correct"),b.classList.remove("wrong"),E.style.display="none";else{b.classList.add("wrong"),b.classList.remove("correct");const B=b.value,N=u.blanks[w].hints&&u.blanks[w].hints[B]||"hintContext";E.textContent=a(N),E.style.display="block"}H()}});const C=document.createElement("div");C.className="game-controls";const k=document.createElement("button");k.className="gemini-btn",k.textContent=a("checkAnswers"),k.onclick=()=>{const b=f.querySelectorAll("select");let w=!0,B="";b.forEach(N=>{const D=N.dataset.idx;if(N.value===u.blanks[D].answer)N.classList.add("correct"),N.classList.remove("wrong");else if(N.classList.add("wrong"),N.classList.remove("correct"),w=!1,!B){const M=u.blanks[D].hints&&u.blanks[D].hints[N.value]||"hintContext";B=a(M)}}),!w&&B?(E.textContent=B,E.style.display="block"):w&&(E.style.display="none"),H()};const x=document.createElement("button");x.className="gemini-btn",x.textContent=a("newExercise"),x.style.display="none",x.onclick=()=>{y=(y+1)%v.length,A()},C.appendChild(k),C.appendChild(x),r.appendChild(C),H()}A()}e.appendChild(r),g.appendChild(e)}function Ce(g){return g==="A1"?[{text:"Jeg [blank_0] i København. Jeg har en lille [blank_1]. Her bor jeg sammen med min [blank_2]. Vi [blank_3] ofte mad sammen i køkkenet. Min kone er en rigtig god [blank_4]. Om morgenen [blank_5] vi kaffe. Vi [blank_6] også en avis sammen. Det er en [blank_7] dag i dag. Vi er meget [blank_8] for vores liv.",blanks:[{answer:"bor",options:["bor","spiser","læser"],hints:{spiser:"hintAction",læser:"hintAction"}},{answer:"lejlighed",options:["lejlighed","bil","bord"],hints:{bil:"hintContext",bord:"hintPlace"}},{answer:"kone",options:["kone","ven","hund"],hints:{ven:"hintContext",hund:"hintContext"}},{answer:"laver",options:["laver","drikker","køber"],hints:{drikker:"hintAction",køber:"hintMean"}},{answer:"kok",options:["kok","bog","skole"],hints:{bog:"hintContext",skole:"hintPlace"}},{answer:"drikker",options:["drikker","spiser","ser"],hints:{spiser:"hintMean",ser:"hintAction"}},{answer:"læser",options:["læser","hører","går"],hints:{hører:"hintContext",går:"hintAction"}},{answer:"dejlig",options:["dejlig","sur","kold"],hints:{sur:"hintMean",kold:"hintContext"}},{answer:"glade",options:["glade","trætte","sure"],hints:{trætte:"hintContext",sure:"hintMean"}}]}]:g==="A2"?[{text:"Det er [blank_0] vejr i dag. Solen skinner [blank_1], og vi [blank_2] en tur i den grønne skov. Vi ser mange [blank_3] træer med friske blade. Vi går [blank_4] for at nyde den smukke natur. Fuglene [blank_5] lystigt i trætoppene. Det [blank_6] som om, at sommeren endelig er på vej. Vi [blank_7] os til at spise frokost i det fri bagefter. Det bliver en [blank_8] oplevelse for os alle.",blanks:[{answer:"dejligt",options:["dejligt","langsomt","aldrig"],hints:{langsomt:"hintAdj",aldrig:"hintAdverb"}},{answer:"kraftigt",options:["kraftigt","smukt","ofte"],hints:{smukt:"hintAdj",ofte:"hintAdverb"}},{answer:"går",options:["går","gik","gået"],hints:{gik:"hintTense",gået:"hintTense"}},{answer:"høje",options:["høje","høj","højt"],hints:{høj:"hintForm",højt:"hintForm"}},{answer:"langsomt",options:["langsomt","langsom","hurtig"],hints:{langsom:"hintForm",hurtig:"hintAdj"}},{answer:"synger",options:["synger","sang","sunget"],hints:{sang:"hintTense",sunget:"hintTense"}},{answer:"føles",options:["føles","føler","føltes"],hints:{føler:"hintForm",føltes:"hintTense"}},{answer:"glæder",options:["glæder","glædede","glade"],hints:{glædede:"hintTense",glade:"hintForm"}},{answer:"fantastisk",options:["fantastisk","fantastiske","fantastisket"],hints:{fantastiske:"hintForm",fantastisket:"hintMean"}}]}]:g==="B1"?[{text:"Jeg tager ofte bussen på arbejde, [blank_0] min bil desværre er gået i stykker igen. Selvom det regner [blank_1], foretrækker jeg dog normalt at køre selv. Det er [blank_2] irriterende, da jeg har mange [blank_3] aftaler i løbet af i dag. Jeg [blank_4] dog planlægge min rute [blank_5], så jeg ikke kommer for sent. Heldigvis [blank_6] bussen lige uden for min dør. Hvis jeg [blank_7] mig lidt, kan jeg lige præcis nå den. Det [blank_8] meget tålmodighed at bruge offentlig transport hver eneste dag.",blanks:[{answer:"fordi",options:["fordi","selvom","men"],hints:{selvom:"hintConj",men:"hintConj"}},{answer:"kraftigt",options:["kraftigt","kraftig","kraftige"],hints:{kraftig:"hintForm",kraftige:"hintForm"}},{answer:"temmelig",options:["temmelig","temmelige","temmeligt"],hints:{temmelige:"hintForm",temmeligt:"hintForm"}},{answer:"vigtige",options:["vigtige","vigtig","vigtigt"],hints:{vigtig:"hintForm",vigtigt:"hintForm"}},{answer:"må",options:["må","skal","kan"],hints:{skal:"hintContext",kan:"hintContext"}},{answer:"omhyggeligt",options:["omhyggeligt","omhyggelig","omhyggelige"],hints:{omhyggelig:"hintForm",omhyggelige:"hintForm"}},{answer:"holder",options:["holder","holdt","holdt"],hints:{holdt:"hintTense"}},{answer:"skynder",options:["skynder","skyndte","skyndet"],hints:{skyndte:"hintTense",skyndet:"hintTense"}},{answer:"kræver",options:["kræver","krævede","krævet"],hints:{krævede:"hintTense",krævet:"hintTense"}}]}]:g==="modultest"?[{text:"Velkommen til den store [blank_0], hvor vi skal teste dit danske sprog. Denne tekst er [blank_1] end de andre, da den fylder ti linjer. Du skal læse hele teksten [blank_2] for at forstå sammenhængen rigtigt. Det er vigtigt at du [blank_3] dig om, før du vælger et ord. Der er mange [blank_4] i listen ovenover, som du kan bruge. Hvis du laver en [blank_5], kan du altid prøve igen her. Vi håber at du får alle svar [blank_6] i første forsøg. Det kræver meget [blank_7] at lære et nyt sprog helt perfekt. Men vi ved at du [blank_8] gøre det, hvis du øver dig meget. Rigtig god [blank_9] med denne svære modultest opgave!",blanks:[{answer:"modultest",options:["modultest","eksamen","prøve"]},{answer:"længere",options:["længere","kort","sværere"]},{answer:"grundigt",options:["grundigt","hurtigt","nemt"]},{answer:"umager",options:["umager","gør","passer"]},{answer:"ord",options:["ord","tekster","sætninger"]},{answer:"fejl",options:["fejl","kage","pause"]},{answer:"rigtige",options:["rigtige","forkerte","sjove"]},{answer:"arbejde",options:["arbejde","hygge","mad"]},{answer:"kan",options:["kan","skal","får"]},{answer:"fornøjelse",options:["fornøjelse","lykke","held"]}]}]:[]}function we(g,m){const e=document.createElement("div");e.className="view-container";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.innerHTML=`← ${a("back")}`,c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=a("hvilketOrd"),e.appendChild(p);const s=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div"),o=document.createElement("div"),l=document.createElement("div");i.style.display="none",o.style.display="none",l.style.display="none";let d=1;const n=document.createElement("div");n.className="grid",n.style.marginTop="2rem";const h=document.createElement("div");h.className="card",h.innerHTML=`
        <div class="card-icon">👥</div>
        <div class="card-title">${a("hanHamHans")}</div>
    `,h.onclick=()=>u("pronomen");const v=document.createElement("div");v.className="card",v.innerHTML=`
        <div class="card-icon">🏃</div>
        <div class="card-title">${a("gårGikGået")}</div>
    `,v.onclick=()=>u("verbum");const y=document.createElement("div");y.className="card",y.innerHTML=`
        <div class="card-icon">🚪</div>
        <div class="card-title">${a("derErDetEr")}</div>
    `,y.onclick=()=>E(),n.appendChild(h),n.appendChild(v),n.appendChild(y),r.appendChild(n),s.appendChild(r);const A=document.createElement("div");A.className="grid",i.appendChild(A),s.appendChild(i);function u(C){d=2,r.style.display="none",i.style.display="block",o.style.display="none",A.innerHTML="",(C==="pronomen"?[{key:"pronominerSubjekt",type:"subjekt",icon:"🔦",img:"pronominer_spotlight.png"},{key:"pronominerObjekt",type:"objekt",icon:"👤",img:"pronominer_objekt.png"},{key:"pronominerPossessiv",type:"possessiv",icon:"🏠",img:"pronominer_possessiv.png"}]:[{key:"verberM3",type:"verber_nutid",icon:"🏃",img:"verber_kategorier.png"},{key:"verberDatid",type:"datid",icon:"🕰️",img:"verber_kategorier.png"},{key:"verberTider",type:"tider",icon:"🌉",img:"tider_guide.png"}]).forEach(x=>{const b=document.createElement("div");b.className="card",b.onclick=()=>{x.type==="verber_nutid"?T():x.key.startsWith("verber")?m("verbum_learning",{categoryId:x.type}):H(x)};const w=document.createElement("div");w.className="card-icon",w.textContent=x.icon;const B=document.createElement("div");B.className="card-title",B.textContent=a(x.key),b.appendChild(w),b.appendChild(B),A.appendChild(b)})}const f=document.createElement("div");f.className="grid",o.appendChild(f),s.appendChild(o);function T(){d=3,i.style.display="none",o.style.display="block",f.innerHTML="",[{key:"verberHjaelpe",type:"hjaelpe",icon:"💡"},{key:"verberTilstand",type:"tilstand",icon:"🏠"},{key:"verberBevaegelse",type:"bevaegelse",icon:"🚶"},{key:"verberHandling",type:"handling",icon:"🛠️"},{key:"verberInteraktion",type:"interaktion",icon:"🗣️"},{key:"verberIndreLiv",type:"indre_liv",icon:"🧠"}].forEach(k=>{const x=document.createElement("div");x.className="card",x.onclick=()=>m("verbum_learning",{categoryId:k.type});const b=document.createElement("div");b.className="card-icon",b.textContent=k.icon;const w=document.createElement("div");w.className="card-title",w.textContent=a(k.key),x.appendChild(b),x.appendChild(w),f.appendChild(x)})}t.onclick=()=>{l.style.display==="block"?(l.style.display="none",s.style.display="block",d===3?(o.style.display="block",i.style.display="none"):(i.style.display="block",o.style.display="none"),p.textContent=a("hvilketOrd")):o.style.display==="block"?(o.style.display="none",i.style.display="block",d=2,p.textContent=a("hvilketOrd")):i.style.display==="block"?(i.style.display="none",r.style.display="block",d=1,p.textContent=a("hvilketOrd")):m("dagens_opgave")};function E(){s.style.display="none",l.style.display="block",l.innerHTML="",p.textContent=a("derErDetEr");const C=document.createElement("div");C.className="der-er-explanation";const k=document.createElement("div");k.className="expl-slide",k.innerHTML=`
            <img src="${$}der_er_bil_gade.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${a("derErIntro1")}</div>
            <p class="expl-text">${a("derErExpl")}</p>
            <button class="gemini-btn next-slide-btn">Næste →</button>
        `;const x=document.createElement("div");x.className="expl-slide",x.style.display="none",x.innerHTML=`
            <img src="${$}det_er_bil_pegepind.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${a("derErIntro2")}</div>
            <p class="expl-text">Når vi kender tingen (den er inde i rummet), så bruger vi <b>det</b> til at pege.</p>
            <button class="gemini-btn start-practice-btn">Start øvelse!</button>
        `,k.querySelector(".next-slide-btn").onclick=()=>{k.style.display="none",x.style.display="block"},x.querySelector(".start-practice-btn").onclick=()=>{S()},C.appendChild(k),C.appendChild(x),l.appendChild(C)}function S(){l.innerHTML="";const C=[{text:"Se! [blank_0] en hund i haven.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en stor hund. Se den!",answer:"Det er",options:["Der er","Det er"]},{text:"Hvem banker på døren? [blank_0] nok min mor.",answer:"Det er",options:["Der er","Det er"]},{text:"[blank_0] mange mennesker i toget i dag.",answer:"Der er",options:["Der er","Det er"]},{text:"[blank_0] en dejlig kop kaffe, du har her.",answer:"Det er",options:["Der er","Det er"]}];let k=0;function x(){l.innerHTML="";const w=C[k],B=document.createElement("div");B.className="pronomen-exercise-content";const N=document.createElement("div");N.className="exercise-progress",N.textContent=`Opgave ${k+1} af ${C.length}`,B.appendChild(N);const D=document.createElement("div");D.className="grammatik-text-container",w.text.split(/(\[blank_0\])/).forEach(I=>{if(I==="[blank_0]"){const L=document.createElement("select");L.className="grammatik-select";const W=document.createElement("option");W.value="",W.textContent="...",L.appendChild(W),w.options.forEach(q=>{const O=document.createElement("option");O.value=q,O.textContent=q,L.appendChild(O)});const K=document.createElement("div");K.className="exercise-feedback";const V=document.createElement("span");V.className="select-wrapper",V.appendChild(L),D.appendChild(V),L.onchange=()=>{L.value===w.answer?(L.classList.add("correct"),L.classList.remove("wrong"),K.style.display="none",P.disabled=!1):L.value!==""?(L.classList.add("wrong"),L.classList.remove("correct"),K.textContent=a("hintDerDet"),K.style.display="block",P.disabled=!0):(L.classList.remove("correct","wrong"),K.style.display="none",P.disabled=!0)},B.appendChild(K)}else{const L=document.createElement("span");L.textContent=I,D.appendChild(L)}}),B.appendChild(D);const P=document.createElement("button");P.className="gemini-btn",P.textContent="Check",P.disabled=!0,P.onclick=()=>{k++,k<C.length?x():b()},B.appendChild(P),l.appendChild(B)}function b(){l.innerHTML=`
                <div class="pronomen-exercise-content">
                    <h2>Flot klaret! 🎉</h2>
                    <p>Du har styr på 'Der er' og 'Det er'.</p>
                    <button class="gemini-btn" onclick="location.reload()">Tilbage til menu</button>
                </div>
            `}x()}function H(C){s.style.display="none",l.style.display="block",l.innerHTML="",p.textContent=a(C.key);const k=document.createElement("img");k.src=$+C.img,k.className="pronomen-illustration",l.appendChild(k);const x=Ee(C.type);let b=0;function w(){l.querySelectorAll(".pronomen-exercise-content").forEach(V=>V.remove());const N=document.createElement("div");N.className="pronomen-exercise-content";const D=x[b],M=document.createElement("div");M.className="grammatik-text-container",D.text.split(/(\[blank_\d+\])/).forEach(V=>{const q=V.match(/\[blank_(\d+)\]/);if(q){const O=q[1],z=document.createElement("span");z.className="select-wrapper";const G=document.createElement("select");G.className="grammatik-select",G.dataset.idx=O;const R=document.createElement("option");R.value="",R.textContent="...",G.appendChild(R),[...D.blanks[O].options].sort(()=>Math.random()-.5).forEach(Y=>{const J=document.createElement("option");J.value=Y,J.textContent=Y,G.appendChild(J)}),M.appendChild(z)}else{const O=document.createElement("span");O.textContent=V,M.appendChild(O)}}),N.appendChild(M);const I=document.createElement("div");I.className="exercise-feedback",N.appendChild(I);const L=document.createElement("div");L.className="game-controls";const W=document.createElement("button");W.className="gemini-btn",W.textContent=a("checkAnswers"),W.onclick=()=>{const V=M.querySelectorAll("select");let q=!0,O="";V.forEach(z=>{const G=z.dataset.idx;z.value===D.blanks[G].answer?(z.classList.add("correct"),z.classList.remove("wrong")):(z.classList.add("wrong"),z.classList.remove("correct"),q=!1,O||(O=a("hintPronominer")))}),q?(I.style.display="none",W.style.display="none",K.style.display="inline-block"):(I.textContent=O,I.style.display="block")};const K=document.createElement("button");K.className="gemini-btn",K.textContent=a("newExercise"),K.style.display="none",K.onclick=()=>{b=(b+1)%x.length,w()},L.appendChild(W),L.appendChild(K),N.appendChild(L),l.appendChild(N)}w()}if(e.appendChild(s),e.appendChild(l),g.appendChild(e),!document.getElementById("pronomen-styles")){const C=document.createElement("style");C.id="pronomen-styles",C.textContent=`
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
        `,document.head.appendChild(C)}}function Ee(g){return g==="subjekt"?[{text:"Her er en mand. [blank_0] hedder Peter.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Mikael er lærer. [blank_0] bor i Aarhus.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Min far er gammel. [blank_0] er 80 år.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]},{text:"Drengen leger. [blank_0] er glad.",blanks:[{answer:"Han",options:["Han","Ham","Hans"]}]}]:g==="objekt"?[{text:"Jeg ser en mand. Jeg ser [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Peter er her. Jeg ringer til [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]},{text:"Mikael er træt. Vi hjælper [blank_0].",blanks:[{answer:"ham",options:["han","ham","hans"]}]}]:g==="possessiv"?[{text:"Her er Peter. [blank_0] bil er rød.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Mikael har en hund. [blank_0] hund er stor.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]},{text:"Min far er her. [blank_0] hus er gammelt.",blanks:[{answer:"Hans",options:["Han","Ham","Hans"]}]}]:[]}function De(g,m){const e=document.createElement("div");e.className="view-container grounding-view";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("dagens_opgave"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent=a("howToBuildSentence");const s=document.createElement("p");s.className="subtitle",s.textContent=a("howToBuildSentenceDesc"),e.appendChild(p),e.appendChild(s);const r=document.createElement("div");r.className="intro-area",r.innerHTML=`
        <div class="illustration-container">
            <img src="${$}images/grounding_balloon_child.png" alt="Balloon and Anchor" class="grounding-img">
        </div>
        <p class="grounding-text">${a("groundingIntro")}</p>
    `,e.appendChild(r);const i=document.createElement("div");i.className="exercise-container",e.appendChild(i);let o={step:1,nounAnchor:"",verbAnchor:"",sentenceParts:[]};function l(){i.innerHTML="",o.step===1?d():o.step===2?n():o.step===3&&h()}function d(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${a("groundingStep1")}</h3>
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
        `,i.appendChild(u);const f=u.querySelector("#noun-select");f.onchange=()=>{f.value&&(o.nounAnchor=f.value,o.step=2,setTimeout(l,1e3))}}function n(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${a("groundingStep2")}</h3>
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
        `,i.appendChild(u);const f=u.querySelector("#verb-select");f.onchange=()=>{f.value&&(o.verbAnchor=f.value,o.step=3,setTimeout(l,1e3))}}function h(){const u=document.createElement("div");u.className="step-content",u.innerHTML=`
            <h3>${a("groundingStep3")}</h3>
            <p>Træk ordene ned på jorden for at bygge din sætning.</p>
            
            <div class="drag-source" id="source">
                <div class="drag-item" draggable="true" data-word="${o.nounAnchor}">${o.nounAnchor}</div>
                <div class="drag-item" draggable="true" data-word="barn">barn</div>
                <div class="drag-item" draggable="true" data-word="${o.verbAnchor}">${o.verbAnchor}</div>
            </div>

            <div class="drop-zone-container">
                <p class="ground-label">${a("sentenceGround")}</p>
                <div class="drop-zone" id="ground"></div>
            </div>

            <div class="controls">
                <button class="gemini-btn" id="check-btn">${a("checkResult")}</button>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `,i.appendChild(u);const f=u.querySelectorAll(".drag-item"),T=u.querySelector("#ground"),E=u.querySelector("#source");f.forEach(k=>{k.ondragstart=x=>{x.dataTransfer.setData("text/plain",k.dataset.word),k.classList.add("dragging")},k.ondragend=()=>k.classList.remove("dragging")}),T.ondragover=k=>k.preventDefault(),T.ondrop=k=>{k.preventDefault();const x=k.dataTransfer.getData("text/plain"),b=E.querySelector(`.drag-item[data-word="${x}"]`)||T.querySelector(`.drag-item[data-word="${x}"]`);if(b){const w=S(T,k.clientX);w==null?T.appendChild(b):T.insertBefore(b,w)}};function S(k,x){return[...k.querySelectorAll(".drag-item:not(.dragging)")].reduce((w,B)=>{const N=B.getBoundingClientRect(),D=x-N.left-N.width/2;return D<0&&D>w.offset?{offset:D,element:B}:w},{offset:Number.NEGATIVE_INFINITY}).element}E.ondragover=k=>k.preventDefault(),E.ondrop=k=>{k.preventDefault();const x=document.querySelector(".drag-item.dragging");x&&E.appendChild(x)};const H=u.querySelector("#check-btn"),C=u.querySelector("#step-feedback");H.onclick=()=>{const k=Array.from(T.children).map(b=>b.dataset.word).join(" "),x=`${o.nounAnchor} barn ${o.verbAnchor}`.toLowerCase();k.toLowerCase()===x?(C.textContent="Flot! Se animationen nedenfor.",C.className="exercise-feedback success-text",C.style.display="block",H.disabled=!0,v(u,()=>{y(u),setTimeout(()=>{A(u)},5500)})):(C.textContent=a("wrongOrder"),C.className="exercise-feedback",C.style.display="block")}}function v(u,f){let T=u.querySelector(".focus-container");T||(T=document.createElement("div"),T.className="focus-container animate-in",u.appendChild(T));const E=o.nounAnchor.toLowerCase();let S="",H="";E==="mit"?(H="Mit barn (Relation)",S=`
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
            `):E==="et"?(H="Et barn (Ubestemt)",S=`
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
            `):E==="det"?(H="Det barn (Udpegning)",S=`
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
            `):E==="dette"&&(H="Dette barn (Nærhed)",S=`
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
                <h3>${H}</h3>
                ${S}
            </div>
        `,setTimeout(()=>{T.scrollIntoView({behavior:"smooth",block:"center"})},300),setTimeout(f,5e3)}function y(u){const f=u.querySelector(".focus-container");f&&(f.style.opacity="0.3",f.style.transition="opacity 0.5s");let T=u.querySelector(".timeline-container");T||(T=document.createElement("div"),T.className="timeline-container animate-in",u.appendChild(T)),T.innerHTML=`
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                <div class="timeline-points">
                    <div class="time-point" data-tense="past">Datid</div>
                    <div class="time-point" data-tense="present">Nutid</div>
                    <div class="time-point" data-tense="future">Fremtid</div>
                </div>
                <div class="timeline-pointer" id="timeline-pointer">📍</div>
            </div>
        `,setTimeout(()=>{T.scrollIntoView({behavior:"smooth",block:"center"})},300);const E=T.querySelector("#timeline-pointer");let S="50%";o.verbAnchor==="spiste"&&(S="15%"),o.verbAnchor==="skal spise"&&(S="85%"),setTimeout(()=>{E.style.left=S,E.classList.add("bouncing")},100)}function A(u){let f=u.querySelector(".final-completion-container");f||(f=document.createElement("div"),f.className="final-completion-container animate-in",u.appendChild(f)),f.innerHTML=`
            <div class="completion-box">
                <div class="success-icon">✨</div>
                <p class="success-msg">Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.</p>
                <div class="example-box">
                    <span class="example-label">Sætning:</span>
                    <span class="example-text">${o.nounAnchor} barn ${o.verbAnchor}.</span>
                </div>

                <div class="recommendation-box">
                    <h4>Vil du øve mere?</h4>
                    <p class="teaser-text">Sætningen er bygget... men hvem har egentlig kontrollen? Findes der en usynlig kraft mellem barnet og maden?</p>
                    <div class="recommendation-grid">
                        <button class="rec-btn spotlight-btn" id="start-modal">
                            <span class="rec-icon">✨</span>
                            <span class="rec-label">Modalverber (Usynlig kraft)</span>
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
        `,f.querySelector("#finish-btn").onclick=()=>m("dagens_opgave"),f.querySelector("#start-modal").onclick=()=>m("modal_force",o),f.querySelector("#rec-bestemthed").onclick=()=>m("bestemthed"),f.querySelector("#rec-pronomen").onclick=()=>m("pronomen"),f.querySelector("#rec-verber").onclick=()=>m("verbum_learning",{categoryId:"datid"}),setTimeout(()=>{f.scrollIntoView({behavior:"smooth",block:"center"})},100)}if(l(),!document.getElementById("grounding-styles")){const u=document.createElement("style");u.id="grounding-styles",u.textContent=`
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
        `,document.head.appendChild(u)}g.appendChild(e)}const F=[{id:"hjaelpe",title:"Hjælpeverber",verbs:["kan","skal","vil","må","bør"],exercises:[{title:"Modalverber - Sæt 1",instruction:"Vælg det rigtige hjælpeverbum.",segments:[{type:"text",content:"1. **[I can speak Danish]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"kan",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" tale dansk.\\n\\n2. **[I must go now]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"skal",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gå nu.\\n\\n3. **[I want to buy a cake]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"vil",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" gerne købe en kage.\\n\\n4. **[May I sit here?]**\\nDansk: "},{type:"gap",id:3,correct:"Må",options:["Må","Skal","Kan","Vil","Bør"],explanation:"hintAction"},{type:"text",content:" jeg sidde her?\\n\\n5. **[You should read this]**\\nDansk: Du "},{type:"gap",id:4,correct:"bør",options:["kan","skal","vil","må","bør"],explanation:"hintAction"},{type:"text",content:" læse denne bog."}],phase2_tasks:[{correct:"kan",definition:"Når man har evnen eller muligheden for at gøre noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Kan' udtrykker evne."},{correct:"skal",definition:"Når man er nødt til at gøre noget, eller har en plan.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Skal' udtrykker nødvendighed."},{correct:"vil",definition:"Når man har et ønske eller en lyst til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Vil' udtrykker ønske."},{correct:"må",definition:"Når man har tilladelse til noget.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Må' udtrykker tilladelse."},{correct:"bør",definition:"Når noget er en god idé eller moralsk rigtigt.",options:["kan","skal","vil","må","bør"],explanation:"Korrekt! 'Bør' udtrykker anbefaling."}]}]},{id:"tilstand",title:"Tilstand og Navne",verbs:["er","har","bor","hedder","bliver"],exercises:[{title:"Hvem er jeg? - Sæt 1",instruction:"Vælg det rigtige verbum om din tilstand.",segments:[{type:"text",content:"1. **[I am happy]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"er",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" glad.\\n\\n2. **[I have a dog]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" en hund.\\n\\n3. **[I live in Aarhus]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bor",options:["er","har","bor","hedder","bliver"],explanation:"hintPlace"},{type:"text",content:" i Aarhus.\\n\\n4. **[My name is Peter]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"hedder",options:["er","har","bor","hedder","bliver"],explanation:"hintName"},{type:"text",content:" Peter.\\n\\n5. **[I am becoming a doctor]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"bliver",options:["er","har","bor","hedder","bliver"],explanation:"hintContext"},{type:"text",content:" læge næste år."}],phase2_tasks:[{correct:"er",definition:"Bruges til at identificere sig selv eller sin tilstand.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"har",definition:"Når man ejer noget.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bor",definition:"Når man har sit hjem et bestemt sted.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"hedder",definition:"Bruges når man fortæller sit navn.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"},{correct:"bliver",definition:"Når man ændrer sig til noget nyt.",options:["er","har","bor","hedder","bliver"],explanation:"Korrekt!"}]}]},{id:"bevaegelse",title:"Bevægelse",verbs:["går","kører","rejser","falder","stiger"],exercises:[{title:"På farten - Sæt 1",instruction:"Vælg det rigtige verbum om bevægelse.",segments:[{type:"text",content:"1. **[I walk to school]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"går",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" til skole.\\n\\n2. **[I drive a car]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"kører",options:["går","kører","rejser","falder","stiger"],explanation:"hintAction"},{type:"text",content:" i bil.\\n\\n3. **[I travel to Spain]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"rejser",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" til Spanien i sommerferien.\\n\\n4. **[The apple falls from the tree]**\\nDansk: Æblet "},{type:"gap",id:3,correct:"falder",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" ned fra træet.\\n\\n5. **[The price increases]**\\nDansk: Prisen "},{type:"gap",id:4,correct:"stiger",options:["går","kører","rejser","falder","stiger"],explanation:"hintContext"},{type:"text",content:" hver måned."}],phase2_tasks:[{correct:"går",definition:"At flytte sig ved brug af benene.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"kører",definition:"At transportere sig i et køretøj som bil eller bus.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"rejser",definition:"At tage på en længere tur til et andet sted eller land.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"falder",definition:"At bevæge sig hurtigt mod jorden ved et uheld eller tyngdekraft.",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"},{correct:"stiger",definition:"At bevæge sig opad eller blive højere (f.eks. priser).",options:["går","kører","rejser","falder","stiger"],explanation:"Korrekt!"}]}]},{id:"interaktion",title:"Sprog og Kommunikation",verbs:["siger","taler","svarer","spørger","fortæller"],exercises:[{title:"Samtale - Sæt 1",instruction:"Vælg det rigtige verbum om kommunikation.",segments:[{type:"text",content:"1. **[What do you say?]**\\nDansk: Hvad "},{type:"gap",id:0,correct:"siger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" du?\\n\\n2. **[I speak Danish]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"taler",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" dansk.\\n\\n3. **[I answer the letter]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"svarer",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" på brevet.\\n\\n4. **[I ask a question]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"spørger",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" om vej.\\n\\n5. **[I tell a story]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"fortæller",options:["siger","taler","svarer","spørger","fortæller"],explanation:"hintAction"},{type:"text",content:" en god historie."}],phase2_tasks:[{correct:"siger",definition:"At bruge ord til at udtrykke noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"taler",definition:"At bruge stemmen og et bestemt sprog.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"svarer",definition:"At give respons på et spørgsmål eller brev.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"spørger",definition:"Når man vil have information fra en anden person.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"},{correct:"fortæller",definition:"At give en længere forklaring eller beretning om noget.",options:["siger","taler","svarer","spørger","fortæller"],explanation:"Korrekt!"}]}]},{id:"indre_liv",title:"Tanker og Følelser",verbs:["ved","tror","mener","tænker","synes"],exercises:[{title:"Indre liv - Sæt 1",instruction:"Vælg det rigtige verbum om dine tanker.",segments:[{type:"text",content:"1. **[I know it]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"ved",options:["ved","tror","mener","tænker","synes"],explanation:"hintAction"},{type:"text",content:" det godt.\\n\\n2. **[I believe in it]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"tror",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n3. **[What is your opinion?]**\\nDansk: Hvad "},{type:"gap",id:2,correct:"mener",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" du om det?\\n\\n4. **[I am thinking about you]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tænker",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" på dig.\\n\\n5. **[I think (opinion) it's fun]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"synes",options:["ved","tror","mener","tænker","synes"],explanation:"hintContext"},{type:"text",content:" det er sjovt."}],phase2_tasks:[{correct:"ved",definition:"Når man har faktuel information om noget.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tror",definition:"Når man antager noget eller har en religiøs overbevisning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"mener",definition:"Når man har en holdning eller vil udtrykke en betydning.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"tænker",definition:"Den generelle proces der foregår i hovedet.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"},{correct:"synes",definition:"Når man har en personlig, følelsesmæssig holdning eller smag.",options:["ved","tror","mener","tænker","synes"],explanation:"Korrekt!"}]}]},{id:"handling",title:"Handling og Præstation",verbs:["laver","gør","bruger","tager","finder"],exercises:[{title:"I gang - Sæt 1",instruction:"Vælg det rigtige verbum om handlinger.",segments:[{type:"text",content:"1. **[I am doing my homework]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"laver",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" lektier.\\n\\n2. **[I do my best]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"gør",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mit bedste.\\n\\n3. **[I use a computer]**\\nDansk: Jeg "},{type:"gap",id:2,correct:"bruger",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" en computer.\\n\\n4. **[I take the bus]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tager",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" bussen.\\n\\n5. **[I find my keys]**\\nDansk: Jeg "},{type:"gap",id:4,correct:"finder",options:["laver","gør","bruger","tager","finder"],explanation:"hintAction"},{type:"text",content:" mine nøgler."}],phase2_tasks:[{correct:"laver",definition:"At producere eller udføre noget (især lektier eller mad).",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"gør",definition:"At udføre en handling (især abstrakte ting som 'sit bedste').",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"bruger",definition:"At anvende et redskab eller en ressource.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"tager",definition:"At fatte om noget eller vælge en transportmulighed.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"},{correct:"finder",definition:"At opdage noget man leder efter.",options:["laver","gør","bruger","tager","finder"],explanation:"Korrekt!"}]}]},{id:"datid",title:"Verber i Datid",verbs:["så","gik","kom","tog","spiste"],exercises:[{title:"I går - Sæt 1",instruction:"Vælg det rigtige verbum i datid.",segments:[{type:"text",content:"1. **[Yesterday I saw a movie]**\\nDansk: I går "},{type:"gap",id:0,correct:"så",options:["så","ser","seet","tog","gik"],explanation:"hintContext"},{type:"text",content:" jeg en god film.\\n\\n2. **[We walked to the party]**\\nDansk: Vi "},{type:"gap",id:1,correct:"gik",options:["så","gik","går","gået","kom"],explanation:"hintContext"},{type:"text",content:" til fest i lørdags.\\n\\n3. **[He came late this morning]**\\nDansk: Han "},{type:"gap",id:2,correct:"kom",options:["kom","kommer","kommet","så","tog"],explanation:"hintContext"},{type:"text",content:" for sent i morges.\\n\\n4. **[I took a cake with me]**\\nDansk: Jeg "},{type:"gap",id:3,correct:"tog",options:["tog","tager","taget","så","gik"],explanation:"hintContext"},{type:"text",content:" en kage med i går.\\n\\n5. **[We ate dinner at 18]**\\nDansk: Vi "},{type:"gap",id:4,correct:"spiste",options:["spiser","spist","spiste","kom","tog"],explanation:"hintContext"},{type:"text",content:" aftensmad klokken 18 i går."}],phase2_tasks:[{correct:"så",definition:"At have set noget i fortiden (datid af 'se').",options:["så","ser","seet","tog","gik"],explanation:"Korrekt!"},{correct:"gik",definition:"At have gået et sted hen i fortiden (datid af 'gå').",options:["så","gik","går","gået","kom"],explanation:"Korrekt!"},{correct:"kom",definition:"At være ankommet i fortiden (datid af 'komme').",options:["kom","kommer","kommet","så","tog"],explanation:"Korrekt!"},{correct:"tog",definition:"At have taget noget i fortiden (datid af 'tage').",options:["tog","tager","taget","så","gik"],explanation:"Korrekt!"},{correct:"spiste",definition:"At have indtaget mad i fortiden (datid af 'spise').",options:["spiser","spist","spiste","kom","tog"],explanation:"Korrekt!"}]}]},{id:"tider",title:"Datid eller Førnutid?",verbs:["var","har været","kom","er kommet","drak","har drukket"],exercises:[{title:"Tidspunkter - Sæt 1",instruction:"Husk: Punktet (Datid) er et bestemt tidspunkt. Broen (Førnutid) forbinder fortid og nu.",segments:[{type:"text",content:"1. **[I was in the cinema yesterday]**\\nDansk: Jeg "},{type:"gap",id:0,correct:"var",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen i går.\\n\\n2. **[I have been in the cinema many times]**\\nDansk: Jeg "},{type:"gap",id:1,correct:"har været",options:["var","har været"],explanation:"hintContext"},{type:"text",content:" i biografen mange gange.\\n\\n3. **[In 2010 he came to Denmark]**\\nDansk: I 2010 "},{type:"gap",id:2,correct:"kom",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" han til Danmark.\\n\\n4. **[He has just come to Denmark]**\\nDansk: Han "},{type:"gap",id:3,correct:"er kommet",options:["kom","er kommet"],explanation:"hintContext"},{type:"text",content:" lige til Danmark.\\n\\n5. **[We drank coffee an hour ago]**\\nDansk: Vi "},{type:"gap",id:4,correct:"drak",options:["drak","har drukket"],explanation:"hintContext"},{type:"text",content:" kaffe for en time siden."}],phase2_tasks:[{correct:"var",definition:"Bruges om en tilstand på et bestemt tidspunkt i fortiden.",options:["var","har været"],explanation:"Korrekt!"},{correct:"har været",definition:"Bruges når vi ser på erfaringen frem til nu.",options:["var","har været"],explanation:"Korrekt!"},{correct:"kom",definition:"Bruges om ankomst på et bestemt årstal eller tidspunkt.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"er kommet",definition:"Bruges når handlingen lige er sket og er vigtig nu.",options:["kom","er kommet"],explanation:"Korrekt!"},{correct:"drak",definition:"Bruges om kaffedrikning på et bestemt tidspunkt i fortiden.",options:["drak","har drukket"],explanation:"Korrekt!"}]}]}];class Te{constructor(m,e=null){this.navigateFn=m,this.currentCategoryIndex=e?F.findIndex(c=>c.id===e):0,this.currentCategoryIndex===-1&&(this.currentCategoryIndex=0),this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={}}render(){const m=document.createElement("div");m.className="verbum-learning-view view-container";const e=F[this.currentCategoryIndex];if(!e)return m;const c=e.exercises[this.currentExerciseIndex];if(!c)return m;const t=localStorage.getItem("appLang")||"da",p=s=>U[t]?.[s]||U.da?.[s]||s;return m.innerHTML=`
      <div class="top-bar">
        <button class="back-btn" id="back-to-main">← ${a("back")}</button>
      </div>
      <h1>${e.title}</h1>
      
      <div class="exercise-card">
        <img src="${$}verber_kategorier.png" class="category-illustration" alt="Category Illustration">
        
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
          <button class="gemini-btn" id="check-answers">${a("checkAnswers")}</button>
          ${this.renderFooterButtons(e)}
        </div>
      </div>
`,this.attachEventListeners(m),this.ensureStyles(),m}getSummaryText(m){const c=(this.currentPhase===1?m.segments.filter(p=>p.type==="gap"):m.phase2_tasks).length,t=Object.values(this.feedback).filter(p=>p==="correct").length;return t===0?"":t===c?`<span class="success">${a("allCorrect")}</span>`:`${t} / ${c} ${a("filled")||"korrekte"}`}renderPhase1(m){return m.segments.map(e=>{if(e.type==="text")return`<span class="text-part">${e.content.replace(/\\n/g,"<br>")}</span>`;if(e.type==="gap"){const c=this.feedback[e.id]==="correct",t=this.feedback[e.id]==="wrong";return`
          <span class="select-wrapper">
            <div class="select-hint ${this.showHints[e.id]?"visible":""}">
                ${a(e.explanation||"hintContext")}
            </div>
            <select class="grammatik-select ${c?"correct":""} ${t?"wrong":""}" data-id="${e.id}" ${c?"disabled":""}>
              <option value="">...</option>
              ${e.options.map(s=>`<option value="${s}" ${this.answers[e.id]===s?"selected":""}>${s}</option>`).join("")}
            </select>
          </span>
        `}}).join("")}renderPhase2(m){return m.phase2_tasks.map((e,c)=>{const t=`phase2-${c}`,p=this.feedback[t]==="correct",s=this.feedback[t]==="wrong",r=this.showHints[t];return`
        <div class="phase2-item" style="margin-bottom: 2rem; text-align: left;">
          <p class="definition"><strong>${c+1}.</strong> ${e.definition}</p>
          <span class="select-wrapper">
            <div class="select-hint ${r?"visible":""}">
                ${e.explanation||"Prøv igen!"}
            </div>
            <select class="grammatik-select ${p?"correct":""} ${s?"wrong":""}" data-task-id="${t}" ${p?"disabled":""}>
              <option value="">...</option>
              ${e.options.map(i=>`<option value="${i}" ${this.answers[t]===i?"selected":""}>${i}</option>`).join("")}
            </select>
          </span>
        </div>
      `}).join("")}renderFooterButtons(m){const e=m.exercises[this.currentExerciseIndex],c=this.currentPhase===1?e.segments.filter(r=>r.type==="gap").length:e.phase2_tasks.length;if(!(Object.values(this.feedback).filter(r=>r==="correct").length===c))return"";const s=this.currentExerciseIndex===m.exercises.length-1;return this.currentPhase===1?'<button class="gemini-btn" id="next-phase">Næste fase →</button>':s?'<button class="gemini-btn" id="next-category">Næste kategori →</button>':'<button class="gemini-btn" id="next-exercise">Næste opgave →</button>'}attachEventListeners(m){m.querySelector("#back-to-main").onclick=()=>{this.navigateFn("main")},m.querySelectorAll(".grammatik-select").forEach(s=>{s.onchange=r=>{const i=r.target.dataset.id||r.target.dataset.taskId;this.answers[i]=r.target.value,delete this.feedback[i],this.showHints[i]=!1,this.updateView()}});const e=m.querySelector("#check-answers");if(e){e.onclick=()=>{const o=F[this.currentCategoryIndex].exercises[this.currentExerciseIndex];let l=!0,d="";this.currentPhase===1?o.segments.forEach(h=>{h.type==="gap"&&(this.answers[h.id]===h.correct?this.feedback[h.id]="correct":(this.feedback[h.id]="wrong",d||(d=a(h.explanation||"hintAction")),l=!1))}):o.phase2_tasks.forEach((h,v)=>{const y=`phase2-${v}`;this.answers[y]===h.correct?this.feedback[y]="correct":(this.feedback[y]="wrong",d||(d=h.explanation||a("hintAction")),l=!1)});const n=m.querySelector("#exercise-feedback");l?n.style.display="none":(n.textContent=d,n.style.display="block"),this.updateView()};const s=F[this.currentCategoryIndex].exercises[this.currentExerciseIndex],r=this.currentPhase===1?s.segments.filter(o=>o.type==="gap").length:s.phase2_tasks.length;Object.values(this.feedback).filter(o=>o==="correct").length===r&&(e.style.display="none")}const c=m.querySelector("#next-phase");c&&(c.onclick=()=>{this.currentPhase=2,this.answers={},this.feedback={},this.showHints={},this.updateView()});const t=m.querySelector("#next-exercise");t&&(t.onclick=()=>{this.currentExerciseIndex++,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()});const p=m.querySelector("#next-category");p&&(p.onclick=()=>{this.currentCategoryIndex++,this.currentExerciseIndex=0,this.currentPhase=1,this.answers={},this.feedback={},this.showHints={},this.updateView()})}updateView(){const m=document.querySelector(".verbum-learning-view");if(m){const e=this.render();m.replaceWith(e)}}}function Ne(g,m){const e=document.createElement("div");e.className="view-container bestemthed-view";const c=document.createElement("div");c.className="top-bar";const t=document.createElement("button");t.className="back-btn",t.textContent="← "+a("back"),t.onclick=()=>m("grounding"),c.appendChild(t),e.appendChild(c);const p=document.createElement("h1");p.textContent="Bestemthed - En eller Et?";const s=document.createElement("p");s.className="subtitle",s.textContent="Lær at vælge det rigtige kendeord (artikel) til navneord.",e.appendChild(p),e.appendChild(s);const r=document.createElement("div");r.className="exercise-container",e.appendChild(r);const i=[{word:"bil",correct:"en",icon:"🚗"},{word:"hus",correct:"et",icon:"🏠"},{word:"barn",correct:"et",icon:"👶"},{word:"kop",correct:"en",icon:"☕"},{word:"æble",correct:"et",icon:"🍎"},{word:"stol",correct:"en",icon:"🪑"}];let o=0,l=0;function d(){if(r.innerHTML="",o>=i.length){n();return}const h=i[o],v=document.createElement("div");v.className="step-content animate-in",v.innerHTML=`
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
        `,r.appendChild(v),v.querySelectorAll(".option-btn").forEach(y=>{y.onclick=()=>{const A=y.dataset.val,u=v.querySelector("#feedback");A===h.correct?(u.textContent="Korrekt! ✅",u.className="feedback-area success",l++,y.classList.add("correct"),setTimeout(()=>{o++,d()},1e3)):(u.textContent="Prøv igen! ❌",u.className="feedback-area error",y.classList.add("wrong"))}})}function n(){r.innerHTML=`
            <div class="step-content final-step animate-in">
                <div class="success-icon">🎉</div>
                <h2>Flot gået!</h2>
                <p>Du fik ${l} ud af ${i.length} rigtige.</p>
                <button class="gemini-btn" id="finish-btn">Tilbage til Grounding</button>
            </div>
        `,r.querySelector("#finish-btn").onclick=()=>m("grounding")}if(d(),!document.getElementById("bestemthed-styles")){const h=document.createElement("style");h.id="bestemthed-styles",h.textContent=`
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
        `,document.head.appendChild(h)}g.appendChild(e)}function Ae(g,m,e={}){const c=document.createElement("div");c.className="view-container modal-force-view";const t={nounAnchor:e.nounAnchor||"Et",verbAnchor:(e.verbAnchor||"spiser").replace(" (nu)","").replace(" (i går)","").replace(" (senere)",""),selectedModal:""},p=document.createElement("div");p.className="top-bar";const s=document.createElement("button");s.className="back-btn",s.textContent="← "+a("back"),s.onclick=()=>m("grounding"),p.appendChild(s),c.appendChild(p);const r=document.createElement("h1");r.textContent="Modalverber: Den Usynlige Kraft";const i=document.createElement("p");i.className="subtitle",i.textContent='Modalverber ændrer ikke handlingen, men de ændrer "kraften" bag den.',c.appendChild(r),c.appendChild(i);const o=document.createElement("div");o.className="exercise-container",c.appendChild(o);function l(){o.innerHTML=`
            <div class="step-content animate-in">
                <div class="force-visualization" id="force-viz">
                    <!-- SVG will be injected here -->
                    <div class="viz-placeholder">Vælg et modalverbum for at se kraften</div>
                </div>

                <div class="modal-interaction">
                    <span class="sentence-part">${t.nounAnchor} barn</span>
                    <select class="grammatik-select modal-select" id="modal-select">
                        <option value="">???</option>
                        <option value="skal">skal (Tvang/Plan)</option>
                        <option value="må">må (Tilladelse)</option>
                        <option value="vil">vil (Ønske)</option>
                        <option value="kan">kan (Evne/Sandsynlighed)</option>
                    </select>
                    <span class="sentence-part">spise</span>
                </div>

                <div class="force-explanation" id="force-expl"></div>
            </div>
            
            <div class="navigation-controls" style="margin-top: 2rem; display: none;" id="nav-controls">
                <button class="gemini-btn" id="finish-btn">Afslut</button>
            </div>
        `;const n=o.querySelector("#modal-select"),h=o.querySelector("#force-viz"),v=o.querySelector("#force-expl"),y=o.querySelector("#nav-controls");n.onchange=()=>{const A=n.value;t.selectedModal=A,d(A,h,v),A&&(y.style.display="block")},o.querySelector("#finish-btn").onclick=()=>m("dagens_opgave")}function d(n,h,v){h.innerHTML="",v.innerHTML="",v.className="force-explanation visible";let y="",A="";const u=`
            <style>
                .viz-svg { width: 100%; max-width: 500px; height: 300px; }
                .stickman { stroke: white; stroke-width: 3; fill: none; }
                .target { fill: #ffeb3b; filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.5)); }
                .force-line { stroke-width: 4; stroke-linecap: round; fill: none; }
            </style>
        `;n==="skal"?(A="<strong>SKAL (Social kraft):</strong> En ydre kraft eller en uundgåelig plan skubber barnet mod handlingen. Der er ingen vej udenom.",y=`
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
            `):n==="må"?(A='<strong>MÅ (Fjernelse af barriere):</strong> Vejen er spærret, men modalverbet "må" fjerner barrieren og giver tilladelse.',y=`
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
            `):n==="vil"?(A="<strong>VIL (Indre lyst):</strong> Kraften kommer indefra barnet selv. Det er et ønske eller en vilje, der trækker i retning af maden.",y=`
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
            `):n==="kan"&&(A="<strong>KAN (Evne/Potentiale):</strong> Barnet har energien og evnen til at udføre handlingen. Det er en indre ressource.",y=`
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
            `),h.innerHTML=u+y,v.innerHTML=A}if(l(),!document.getElementById("modal-force-styles")){const n=document.createElement("style");n.id="modal-force-styles",n.textContent=`
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
        `,document.head.appendChild(n)}g.appendChild(c)}const $="/Dansk/";function _(g,m={}){const e=document.querySelector("#app");if(e.innerHTML="",g==="language")j.currentView="language",X(e,_);else if(g==="main")j.currentView="main",ee(e,_);else if(g==="notes")j.currentView="notes",te(e,_);else if(g==="dagens_opgave")j.currentView="dagens_opgave",ne(e,_);else if(g==="word_learning")j.currentView="word_learning",ae(e,_);else if(g==="samtale_traening")j.currentView="samtale_traening",re(e,_);else if(g==="samtale_hverdag")j.currentView="samtale_hverdag",ie(e,_);else if(g==="skrive_hjaelp")j.currentView="skrive_hjaelp",oe(e,_);else if(g==="du1_modul3")j.currentView="du1_modul3",se(e,_);else if(g==="du2_modul1")j.currentView="du2_modul1",pe(e,_);else if(g==="smaa_historier")j.currentView="smaa_historier",ge(e,_);else if(g==="du2_modul5")j.currentView="du2_modul5",he(e,_);else if(g==="email_laan")j.currentView="email_laan",ue(e,_);else if(g==="opdragelse")j.currentView="opdragelse",ke(e,_);else if(g==="en_klage")j.currentView="en_klage",be(e,_);else if(g==="du1_min_hverdag")j.currentView="du1_min_hverdag",le(e,_);else if(g==="transport_sprogskole")j.currentView="transport_sprogskole",ce(e,_);else if(g==="du1_madlavning")j.currentView="du1_madlavning",de(e,_);else if(g==="du1_rengoering")j.currentView="du1_rengoering",me(e,_);else if(g==="traen_tidsudtryk")j.currentView="traen_tidsudtryk",ve(e,_);else if(g==="lav_sporgsmal")j.currentView="lav_sporgsmal",ye(e,_);else if(g==="ordstilling")j.currentView="ordstilling",xe(e,_);else if(g==="traen_grammatik")j.currentView="traen_grammatik",fe(e,_);else if(g==="pronomen")j.currentView="pronomen",we(e,_);else if(g==="verbum_learning"){j.currentView="verbum_learning";const c=new Te(_,m?.categoryId);e.appendChild(c.render())}else g==="grounding"?(j.currentView="grounding",De(e,_)):g==="bestemthed"?(j.currentView="bestemthed",Ne(e,_)):g==="modal_force"&&(j.currentView="modal_force",Ae(e,_,m))}document.addEventListener("DOMContentLoaded",()=>{j.lang?_("main"):_("language")});
