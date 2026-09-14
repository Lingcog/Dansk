export const pronomenData = {
    subjekt: [
        {
            id: 'subjekt_set1',
            exercises: [
                {
                    text: "Det er en våd efterårsmorgen. [blank_0] tager min varme jakke på og åbner døren. [blank_1] knirker lidt i vinden. Udenfor står min nabo Peter. \"[blank_2] skal huske en paraply i dag,\" siger han og smiler. Peter og hans kone skal på arbejde. [blank_3] cykler altid sammen. \"[blank_4] ses senere!\" råber jeg efter dem, mens regnen falder. [blank_5] bliver en lang dag.",
                    blanks: [
                        { answer: "Jeg", options: ["Jeg", "Du", "Mig"], feedback: { 
                            "Du": {
                                da: "Det er personen selv (min jakke), der udfører handlingen. Derfor skal det være 1. person 'Jeg'.",
                                en: "It is the person themselves (my jacket) performing the action. Therefore, it must be 1st person 'Jeg' (I).",
                                de: "Es ist die Person selbst (meine Jacke), die die Handlung ausführt. Daher muss es die 1. Person 'Jeg' (Ich) sein.",
                                ar: "إن الشخص نفسه (سترتي) هو من يقوم بالفعل. لذلك يجب استخدام ضمير المتكلم 'Jeg' (أنا).",
                                es: "Es la propia persona (mi chaqueta) quien realiza la acción. Por lo tanto, debe ser la 1ª persona 'Jeg' (Yo).",
                                fa: "این خود شخص (کت من) است که عمل را انجام می دهد. بنابراین باید اول شخص 'Jeg' (من) باشد.",
                                ku: "Ev kes bi xwe ye (çakêtê min) ku çalakiyê dike. Ji ber vê yekê divê kesê yekem 'Jeg' (Ez) be.",
                                ne: "यो व्यक्ति आफैं (मेरो ज्याकेट) हो जसले कार्य गरिरहेको छ। तसर्थ, यो पहिलो व्यक्ति 'Jeg' (म) हुनुपर्छ।",
                                ps: "دا پخپله هغه کس دی (زما جاکټ) چې عمل ترسره کوي. له همدې امله دا باید لومړی کس 'Jeg' (زه) وي.",
                                pt: "É a própria pessoa (minha jaqueta) quem realiza a ação. Portanto, deve ser a 1ª pessoa 'Jeg' (Eu).",
                                ru: "Это сам человек (моя куртка) выполняет действие. Поэтому это должно быть 1-е лицо 'Jeg' (Я).",
                                th: "เป็นตัวบุคคลเอง (เสื้อแจ็คเก็ตของฉัน) ที่เป็นผู้กระทำ ดังนั้นจึงต้องเป็นบุรุษที่ 1 'Jeg' (ฉัน)",
                                tr: "Eylemi gerçekleştiren kişinin kendisidir (benim ceketim). Bu nedenle 1. tekil şahıs 'Jeg' (Ben) olmalıdır.",
                                uk: "Дію виконує сама людина (моя куртка). Тому має бути 1-ша особа 'Jeg' (Я).",
                                ur: "یہ خود شخص (میری جیکٹ) ہے جو عمل کر رہا ہے۔ اس لیے یہ پہلا شخص 'Jeg' (میں) ہونا چاہیے۔",
                                vi: "Đó chính là người thực hiện hành động (áo khoác của tôi). Do đó, nó phải là ngôi thứ nhất 'Jeg' (Tôi).",
                                zh: "是那个人自己（我的外套）在执行动作。所以必须是第一人称 'Jeg' (我)。"
                            }, 
                            "Mig": {
                                da: "'Mig' bruges, når man *ikke* er i fokus for handlingen. Her er man hovedpersonen, der gør noget (tager jakke på), så det er 'Jeg'.",
                                en: "'Mig' (Me) is used when you are *not* the focus of the action. Here you are the main character doing something (putting on a jacket), so it is 'Jeg' (I).",
                                de: "'Mig' (Mich) wird verwendet, wenn man *nicht* im Mittelpunkt der Handlung steht. Hier bist du die Hauptperson, die etwas tut (Jacke anziehen), also ist es 'Jeg' (Ich).",
                                ar: "تُستخدم 'Mig' (أنا - للمفعول به) عندما لا يكون الشخص هو محور الحدث. هنا أنت الشخصية الرئيسية التي تفعل شيئًا (ارتداء سترة)، لذلك نستخدم 'Jeg' (أنا - للفاعل).",
                                es: "'Mig' (Mí) se usa cuando uno *no* es el foco de la acción. Aquí eres el personaje principal que hace algo (ponerse la chaqueta), así que es 'Jeg' (Yo).",
                                fa: "'Mig' (من - مفعولی) زمانی استفاده می شود که شما در کانون توجه عمل *نیستید*. در اینجا شما شخصیت اصلی هستید که کاری انجام می دهید (پوشیدن کت)، بنابراین 'Jeg' (من - فاعلی) است.",
                                ku: "'Mig' (Min) tê bikar anîn gava ku hûn *ne* navenda çalakiyê ne. Li vir hûn karaktera sereke ne ku tiştek dike (li xwe kirina çakêt), ji ber vê yekê ew 'Jeg' (Ez) e.",
                                ne: "'Mig' (मलाई) प्रयोग गरिन्छ जब तपाईं कार्यको फोकस *हुनुहुन्न*। यहाँ तपाईं मुख्य पात्र हुनुहुन्छ जसले केही गरिरहेको छ (ज्याकेट लगाउँदै), त्यसैले यो 'Jeg' (म) हो।",
                                ps: "'Mig' (ما) هغه وخت کارول کیږي کله چې تاسو د عمل تمرکز *نه* یاست. دلته تاسو اصلي کرکټر یاست چې یو څه کوي (جاکټ اغوستل)، نو دا 'Jeg' (زه) دی.",
                                pt: "'Mig' é usado quando você *não* é o foco da ação. Aqui você é o personagem principal fazendo algo, então é 'Jeg' (Eu).",
                                ru: "'Mig' (Мне/Меня) используется, когда вы *не* в центре действия. Здесь вы главное действующее лицо, поэтому используется 'Jeg' (Я).",
                                th: "'Mig' (ฉัน - กรรม) จะใช้เมื่อคุณ *ไม่ได้* เป็นจุดศูนย์กลางของการกระทำ ดังนั้นจึงต้องใช้ 'Jeg' (ฉัน)",
                                tr: "'Mig' (Beni/Bana), eylemin odağında siz *olmadığınızda* kullanılır. Burada ana karaktersiniz, bu yüzden 'Jeg' (Ben) kullanılır.",
                                uk: "'Mig' (Мене/Мені) використовується, коли людина *не* є в центрі дії. Тут ви головний персонаж, який щось робить (надягає куртку), тому це 'Jeg' (Я).",
                                ur: "'Mig' (مجھے) استعمال ہوتا ہے جب آپ عمل کی توجہ کا مرکز *نہیں* ہوتے۔ یہاں آپ مرکزی کردار ہیں جو کچھ کر رہے ہیں، اس لیے یہ 'Jeg' (میں) ہے۔",
                                vi: "'Mig' (Tôi - tân ngữ) được dùng khi bạn *không* phải là trọng tâm của hành động. Ở đây bạn là nhân vật chính đang làm gì đó, vì vậy đó là 'Jeg' (Tôi).",
                                zh: "当你不*是*动作的焦点时，使用 'Mig' (我-宾格)。在这里你是做动作（穿外套）的主角，所以是 'Jeg' (我)。"
                            } 
                        } },
                        { answer: "Den", options: ["Den", "Det", "Dens"], feedback: { 
                            "Det": {
                                da: "Ordet er 'en dør' (fælleskøn), så vi bruger 'den', ikke 'det'.",
                                en: "The word is 'en dør' (common gender), so we use 'den', not 'det'.",
                                de: "Das Wort ist 'en dør' (Utrum), also verwenden wir 'den', nicht 'det'.",
                                ar: "الكلمة هي 'en dør' (جنس مشترك)، لذلك نستخدم 'den' وليس 'det'.",
                                es: "La palabra es 'en dør' (género común), así que usamos 'den', no 'det'.",
                                fa: "کلمه 'en dør' (جنسیت مشترک) است، بنابراین ما از 'den' استفاده می کنیم، نه 'det'.",
                                ku: "Peyv 'en dør' (zayenda hevpar) e, ji ber vê yekê em 'den' bikar tînin, ne 'det'.",
                                ne: "शब्द 'en dør' (साझा लिङ्ग) हो, त्यसैले हामी 'det' होइन, 'den' प्रयोग गर्छौं।",
                                ps: "کلمه 'en dør' (عام جنس) ده، نو موږ 'den' کاروو، نه 'det'.",
                                pt: "A palavra é 'en dør' (gênero comum), portanto usamos 'den', e não 'det'.",
                                ru: "Слово 'en dør' (общий род), поэтому мы используем 'den', а не 'det'.",
                                th: "คำว่า 'en dør' (เพศรวม) ดังนั้นเราจึงใช้ 'den' ไม่ใช่ 'det'",
                                tr: "Kelime 'en dør' (ortak cinsiyet), bu yüzden 'det' değil, 'den' kullanıyoruz.",
                                uk: "Слово 'en dør' (спільний рід), тому ми використовуємо 'den', а не 'det'.",
                                ur: "لفظ 'en dør' (مشترک جنس) ہے، اس لیے ہم 'den' استعمال کرتے ہیں، 'det' نہیں۔",
                                vi: "Từ này là 'en dør' (giống chung), vì vậy chúng ta dùng 'den', không phải 'det'.",
                                zh: "这个词是 'en dør' (通性)，所以我们用 'den'，而不是 'det'。"
                            }, 
                            "Dens": {
                                da: "'Dens' betyder, at tingen ejer noget. Her er døren i fokus (den knirker), så vi bruger 'den'.",
                                en: "'Dens' (Its) means the thing owns something. Here the door is in focus (it creaks), so we use 'den'.",
                                de: "'Dens' (Dessen/Ihre) bedeutet, dass das Ding etwas besitzt. Hier steht die Tür im Mittelpunkt (sie knarrt), also verwenden wir 'den'.",
                                ar: "تعني 'Dens' (لها/له) أن الشيء يمتلك شيئًا. هنا الباب هو محور التركيز (إنه يصر)، لذلك نستخدم 'den'.",
                                es: "'Dens' (Su/Sus) significa que la cosa posee algo. Aquí la puerta es el foco (cruje), así que usamos 'den'.",
                                fa: "'Dens' (مال آن) به معنای مالکیت چیزی است. در اینجا در کانون توجه است (صدا می دهد)، بنابراین از 'den' استفاده می کنیم.",
                                ku: "'Dens' (Ya wê/wî) tê wê wateyê ku tişt xwediyê tiştekî ye. Li vir derî di balê de ye (ew diqîje), ji ber vê yekê em 'den' bikar tînin.",
                                ne: "'Dens' (यसको) को अर्थ चीजले केही स्वामित्व राख्छ। यहाँ ढोका फोकसमा छ (यो कराउँछ), त्यसैले हामी 'den' प्रयोग गर्छौं।",
                                ps: "'Dens' (د هغې) پدې معنی ده چې شی د یو څه مالکیت لري. دلته دروازه په تمرکز کې ده (دا چیغې کوي)، نو موږ 'den' کاروو.",
                                pt: "'Dens' significa que a coisa possui algo. Aqui a porta é o foco, portanto usamos 'den'.",
                                ru: "'Dens' (Ее/Его) означает, что вещи что-то принадлежит. Здесь в фокусе дверь, поэтому мы используем 'den'.",
                                th: "'Dens' หมายถึงสิ่งนั้นเป็นเจ้าของบางอย่าง ในที่นี้ประตูเป็นจุดศูนย์กลาง ดังนั้นเราจึงใช้ 'den'",
                                tr: "'Dens', nesnenin bir şeye sahip olduğu anlamına gelir. Burada odak noktasında olan kapıdır, bu nedenle 'den' kullanıyoruz.",
                                uk: "'Dens' означає, що речі щось належить. Тут у центрі уваги двері, тому ми використовуємо 'den'.",
                                ur: "'Dens' کا مطلب ہے کہ چیز کسی چیز کی مالک ہے۔ یہاں دروازہ توجہ کا مرکز ہے، اس لیے ہم 'den' استعمال کرتے ہیں۔",
                                vi: "'Dens' có nghĩa là vật đó sở hữu cái gì đó. Ở đây cánh cửa là trọng tâm, vì vậy chúng ta dùng 'den'.",
                                zh: "'Dens' 意思是某物拥有某物。这里门是焦点，所以我们用 'den'。"
                            } 
                        } },
                        { answer: "Du", options: ["Du", "Jeg", "Dig"], feedback: { 
                            "Jeg": {
                                da: "Peter taler til personen (dig), så han siger 'Du'.",
                                en: "Peter is talking to the person (you), so he says 'Du' (You).",
                                de: "Peter spricht mit der Person (dir), also sagt er 'Du'.",
                                ar: "بيتر يتحدث إلى الشخص (أنت)، لذلك يقول 'Du' (أنت).",
                                es: "Peter le está hablando a la persona (tú), así que dice 'Du' (Tú).",
                                fa: "پیتر با شخص (شما) صحبت می کند، بنابراین می گوید 'Du' (شما).",
                                ku: "Peter bi kes (te) re diaxive, ji ber vê yekê ew dibêje 'Du' (Tu).",
                                ne: "पिटर व्यक्ति (तपाईं) सँग कुरा गर्दै हुनुहुन्छ, त्यसैले उहाँ 'Du' (तपाईं) भन्नुहुन्छ।",
                                ps: "پیټر له هغه کس (تاسو) سره خبرې کوي، نو هغه وايي 'Du' (تاسو).",
                                pt: "Peter está falando com a pessoa (você), então ele diz 'Du' (Você).",
                                ru: "Питер разговаривает с человеком (с тобой), поэтому он говорит 'Du' (Ты).",
                                th: "ปีเตอร์กำลังพูดกับบุคคล (คุณ) เขาจึงพูดว่า 'Du' (คุณ)",
                                tr: "Peter bu kişiyle (seninle) konuşuyor, bu yüzden 'Du' (Sen) diyor.",
                                uk: "Пітер говорить до людини (до тебе), тому він каже 'Du' (Ти).",
                                ur: "پیٹر شخص (آپ) سے بات کر رہا ہے، اس لیے وہ کہتا ہے 'Du' (تم/آپ)۔",
                                vi: "Peter đang nói chuyện với người đó (bạn), vì vậy anh ấy nói 'Du' (Bạn).",
                                zh: "彼得在对那个人（你）说话，所以他说 'Du' (你)。"
                            }, 
                            "Dig": {
                                da: "'Dig' bruges, når personen *ikke* er i fokus. Her er du hovedpersonen (den der skal huske), så det er 'Du'.",
                                en: "'Dig' (You - object) is used when the person is *not* in focus. Here you are the main character (the one who must remember), so it is 'Du' (You - subject).",
                                de: "'Dig' (Dich) wird verwendet, wenn die Person *nicht* im Mittelpunkt steht. Hier bist du die Hauptperson (diejenige, die sich erinnern muss), also ist es 'Du'.",
                                ar: "تُستخدم 'Dig' (أنت - للمفعول به) عندما لا يكون الشخص هو محور التركيز. هنا أنت الشخصية الرئيسية (الشخص الذي يجب أن يتذكر)، لذلك نستخدم 'Du' (أنت - للفاعل).",
                                es: "'Dig' (Te/A ti) se usa cuando la persona *no* es el foco. Aquí eres el personaje principal (el que debe recordar), así que es 'Du' (Tú).",
                                fa: "'Dig' (شما - مفعولی) زمانی استفاده می شود که شخص در کانون توجه *نیست*. در اینجا شما شخصیت اصلی هستید (کسی که باید به خاطر بسپارد)، بنابراین 'Du' (شما - فاعلی) است.",
                                ku: "'Dig' (Te) tê bikar anîn dema ku kes *ne* di navendê de ye. Li vir hûn karaktera sereke ne (yê ku divê bi bîr bîne), ji ber vê yekê ew 'Du' (Tu) ye.",
                                ne: "'Dig' (तपाईंलाई) प्रयोग गरिन्छ जब व्यक्ति फोकसमा *हुँदैन*। यहाँ तपाईं मुख्य पात्र हुनुहुन्छ (जसले याद गर्नुपर्छ), त्यसैले यो 'Du' (तपाईं) हो।",
                                ps: "'Dig' (تاسو - څیز) هغه وخت کارول کیږي کله چې شخص په تمرکز کې *نه* وي. دلته تاسو اصلي کرکټر یاست (هغه څوک چې باید په یاد ولري)، نو دا 'Du' (تاسو - موضوع) ده.",
                                pt: "'Dig' é usado quando a pessoa *não* é o foco. Aqui você é o personagem principal, então é 'Du'.",
                                ru: "'Dig' (Тебя/Тебе) используется, когда человек *не* в центре внимания. Здесь ты главное действующее лицо, поэтому это 'Du' (Ты).",
                                th: "'Dig' จะถูกใช้เมื่อบุคคล *ไม่ได้* เป็นจุดสนใจ ที่นี่คุณเป็นตัวเอก ดังนั้นจึงเป็น 'Du'",
                                tr: "'Dig' (Seni/Sana), kişi odak noktasında *olmadığında* kullanılır. Burada ana karakter sizsiniz, bu yüzden 'Du' (Sen) kullanılır.",
                                uk: "'Dig' використовується, коли людина *не* в центрі уваги. Тут ти головний персонаж, тому це 'Du' (Ти).",
                                ur: "'Dig' استعمال ہوتا ہے جب شخص توجہ کا مرکز *نہیں* ہوتا۔ یہاں آپ مرکزی کردار ہیں، اس لیے یہ 'Du' (آپ/تم) ہے۔",
                                vi: "'Dig' được dùng khi người đó *không* phải là trọng tâm. Ở đây bạn là nhân vật chính, vì vậy nó là 'Du' (Bạn).",
                                zh: "当那个人*不*是焦点时使用 'Dig' (你-宾格)。在这里你是主角，所以是 'Du' (你)。"
                            } 
                        } },
                        { answer: "De", options: ["De", "Vi", "Dem"], feedback: { 
                            "Vi": {
                                da: "Der tales om Peter og hans kone (flere andre personer), så det er 3. person flertal 'De'.",
                                en: "It is about Peter and his wife (several other people), so it is 3rd person plural 'De' (They).",
                                de: "Es geht um Peter und seine Frau (mehrere andere Personen), also ist es die 3. Person Plural 'De' (Sie).",
                                ar: "الحديث عن بيتر وزوجته (عدة أشخاص آخرين)، لذلك نستخدم ضمير الغائب للجمع 'De' (هم).",
                                es: "Se trata de Peter y su esposa (varias otras personas), así que es la 3ª persona del plural 'De' (Ellos).",
                                fa: "در مورد پیتر و همسرش (چندین نفر دیگر) صحبت می شود، بنابراین سوم شخص جمع 'De' (آنها) است.",
                                ku: "Ew li ser Peter û jina wî ye (çend kesên din), ji ber vê yekê ew kesê sêyemîn pirjimar 'De' (Ew) ye.",
                                ne: "यो पिटर र उनकी पत्नी (अन्य धेरै व्यक्तिहरू) को बारेमा हो, त्यसैले यो तेस्रो व्यक्ति बहुवचन 'De' (तिनीहरू) हो।",
                                ps: "دا د پیټر او د هغه د میرمن (څو نور خلک) په اړه دی، نو دا دریم شخص جمع 'De' (دوی) دی.",
                                pt: "Trata-se de Peter e sua esposa (várias outras pessoas), portanto, é a 3ª pessoa do plural 'De' (Eles).",
                                ru: "Речь идет о Питере и его жене (несколько других людей), поэтому это 3-е лицо множественного числа 'De' (Они).",
                                th: "กล่าวถึงปีเตอร์และภรรยาของเขา (บุคคลอื่นหลายคน) ดังนั้นจึงเป็นบุรุษที่ 3 พหูพจน์ 'De' (พวกเขา)",
                                tr: "Burada Peter ve eşinden (birden fazla başka kişiden) bahsediliyor, bu yüzden 3. çoğul şahıs 'De' (Onlar) kullanılır.",
                                uk: "Йдеться про Пітера та його дружину (кілька інших людей), тому це 3-тя особа множини 'De' (Вони).",
                                ur: "یہاں پیٹر اور اس کی بیوی (کئی دوسرے لوگوں) کی بات ہو رہی ہے، اس لیے یہ تیسرا شخص جمع 'De' (وہ) ہے۔",
                                vi: "Nói về Peter và vợ anh ấy (nhiều người khác), vì vậy đây là ngôi thứ ba số nhiều 'De' (Họ).",
                                zh: "这里说的是彼得和他的妻子（其他几个人），所以是第三人称复数 'De' (他们)。"
                            }, 
                            "Dem": {
                                da: "'Dem' bruges, når de *ikke* er i fokus. Her er de hovedpersonerne for handlingen (at cykle), så det er 'De'.",
                                en: "'Dem' (Them) is used when they are *not* in focus. Here they are the main characters of the action (cycling), so it is 'De' (They).",
                                de: "'Dem' (Ihnen/Sie) wird verwendet, wenn sie *nicht* im Mittelpunkt stehen. Hier sind sie die Hauptpersonen der Handlung (radfahren), also ist es 'De' (Sie).",
                                ar: "تُستخدم 'Dem' (هم - للمفعول به) عندما لا يكونون محور التركيز. هنا هم الشخصيات الرئيسية للحدث (ركوب الدراجة)، لذلك نستخدم 'De' (هم - للفاعل).",
                                es: "'Dem' (A ellos/Les) se usa cuando *no* son el foco. Aquí son los personajes principales de la acción (ir en bicicleta), así que es 'De' (Ellos).",
                                fa: "'Dem' (آنها - مفعولی) زمانی استفاده می شود که آنها در کانون توجه *نیستند*. در اینجا آنها شخصیت های اصلی عمل (دوچرخه سواری) هستند، بنابراین 'De' (آنها - فاعلی) است.",
                                ku: "'Dem' (Wan) tê bikar anîn gava ku ew *ne* di balê de bin. Li vir ew karakterên sereke yên çalakiyê ne (duçerxesiwarî), ji ber vê yekê ew 'De' (Ew - kirde) e.",
                                ne: "'Dem' (तिनीहरूलाई) प्रयोग गरिन्छ जब तिनीहरू फोकसमा *हुँदैनन्*। यहाँ तिनीहरू कार्य (साइकल चलाउने) को मुख्य पात्र हुन्, त्यसैले यो 'De' (तिनीहरू) हो।",
                                ps: "'Dem' (دوی ته) هغه وخت کارول کیږي کله چې دوی په تمرکز کې *نه* وي. دلته دوی د عمل (سایکل چلول) اصلي کرکټرونه دي، نو دا 'De' (دوی - موضوع) ده.",
                                pt: "'Dem' é usado quando eles *não* estão em foco. Aqui eles são os personagens principais da ação, então é 'De'.",
                                ru: "'Dem' (Их/Им) используется, когда они *не* в центре внимания. Здесь они главные действующие лица, поэтому это 'De' (Они).",
                                th: "'Dem' จะถูกใช้เมื่อพวกเขา *ไม่ได้* เป็นจุดสนใจ ที่นี่พวกเขาเป็นตัวเอกของการกระทำ ดังนั้นจึงเป็น 'De'",
                                tr: "'Dem' (Onları/Onlara), odak noktasında *olmadıklarında* kullanılır. Burada eylemin ana karakterleridir, bu yüzden 'De' kullanılır.",
                                uk: "'Dem' використовується, коли вони *не* в центрі уваги. Тут вони головні персонажі дії, тому це 'De' (Вони).",
                                ur: "'Dem' (انہیں) استعمال ہوتا ہے جب وہ توجہ کا مرکز *نہیں* ہوتے۔ یہاں وہ عمل کے مرکزی کردار ہیں، اس لیے یہ 'De' ہے۔",
                                vi: "'Dem' được dùng khi họ *không* phải là trọng tâm. Ở đây họ là nhân vật chính của hành động, vì vậy đó là 'De' (Họ).",
                                zh: "当他们*不*是焦点时使用 'Dem' (他们-宾格)。在这里他们是动作的主角，所以是 'De' (他们)。"
                            } 
                        } },
                        { answer: "Vi", options: ["Vi", "I", "Os"], feedback: { 
                            "I": {
                                da: "Personen inkluderer sig selv i afskeden, så det er 1. person flertal 'Vi'.",
                                en: "The person includes themselves in the farewell, so it is 1st person plural 'Vi' (We).",
                                de: "Die Person schließt sich selbst in den Abschied ein, also ist es die 1. Person Plural 'Vi' (Wir).",
                                ar: "الشخص يدرج نفسه في الوداع، لذلك نستخدم ضمير المتكلم للجمع 'Vi' (نحن).",
                                es: "La persona se incluye a sí misma en la despedida, así que es la 1ª persona del plural 'Vi' (Nosotros).",
                                fa: "شخص خود را در خداحافظی لحاظ می کند، بنابراین اول شخص جمع 'Vi' (ما) است.",
                                ku: "Kes xwe di xatirxwestinê de vedihewîne, ji ber vê yekê ew kesê yekemîn pirjimar 'Vi' (Em) ye.",
                                ne: "व्यक्तिले आफूलाई विदाईमा समावेश गर्दछ, त्यसैले यो पहिलो व्यक्ति बहुवचन 'Vi' (हामी) हो।",
                                ps: "شخص ځان په الوداع کې شاملوي، نو دا لومړی کس جمع 'Vi' (موږ) دی.",
                                pt: "A pessoa se inclui na despedida, então é a 1ª pessoa do plural 'Vi' (Nós).",
                                ru: "Человек включает себя в прощание, поэтому это 1-е лицо множественного числа 'Vi' (Мы).",
                                th: "บุคคลนั้นรวมตนเองในการบอกลาด้วย ดังนั้นจึงเป็นบุรุษที่ 1 พหูพจน์ 'Vi' (พวกเรา)",
                                tr: "Kişi vedaya kendisini de dahil ediyor, bu yüzden 1. çoğul şahıs 'Vi' (Biz) kullanılır.",
                                uk: "Людина включає себе в прощання, тому це 1-ша особа множини 'Vi' (Ми).",
                                ur: "شخص الوداع میں خود کو شامل کر رہا ہے، اس لیے یہ پہلا شخص جمع 'Vi' (ہم) ہے۔",
                                vi: "Người đó bao gồm cả bản thân mình trong lời tạm biệt, vì vậy đó là ngôi thứ nhất số nhiều 'Vi' (Chúng tôi).",
                                zh: "说话人在告别时把自己也包括进去了，所以是第一人称复数 'Vi' (我们)。"
                            }, 
                            "Os": {
                                da: "'Os' bruges, når vi *ikke* er i fokus. Her er vi hovedpersonerne (vi ses), så det er 'Vi'.",
                                en: "'Os' (Us) is used when we are *not* in focus. Here we are the main characters (we will see each other), so it is 'Vi' (We).",
                                de: "'Os' (Uns) wird verwendet, wenn wir *nicht* im Mittelpunkt stehen. Hier sind wir die Hauptpersonen (wir sehen uns), also ist es 'Vi' (Wir).",
                                ar: "تُستخدم 'Os' (نحن - للمفعول به) عندما لا نكون محور التركيز. هنا نحن الشخصيات الرئيسية (سنلتقي)، لذلك نستخدم 'Vi' (نحن - للفاعل).",
                                es: "'Os' (Nos/A nosotros) se usa cuando *no* somos el foco. Aquí somos los personajes principales (nos vemos), así que es 'Vi' (Nosotros).",
                                fa: "'Os' (ما - مفعولی) زمانی استفاده می شود که ما در کانون توجه *نیستیم*. در اینجا ما شخصیت های اصلی هستیم (همدیگر را می بینیم)، بنابراین 'Vi' (ما) است.",
                                ku: "'Os' (Mera) tê bikar anîn gava ku em *ne* di balê de bin. Li vir em karakterên sereke ne (em ê hevdû bibînin), ji ber vê yekê ew 'Vi' (Em) e.",
                                ne: "'Os' (हामीलाई) प्रयोग गरिन्छ जब हामी फोकसमा *हुँदैनौं*। यहाँ हामी मुख्य पात्र हौं (हामी एक अर्कालाई देख्नेछौं), त्यसैले यो 'Vi' (हामी) हो।",
                                ps: "'Os' (موږ ته) هغه وخت کارول کیږي کله چې موږ په تمرکز کې *نه* یو. دلته موږ اصلي کرکټرونه یو (موږ به یو بل سره ووینو)، نو دا 'Vi' (موږ) دی.",
                                pt: "'Os' é usado quando nós *não* estamos em foco. Aqui nós somos os personagens principais, então é 'Vi'.",
                                ru: "'Os' (Нас/Нам) используется, когда мы *не* в центре внимания. Здесь мы главные действующие лица, поэтому это 'Vi' (Мы).",
                                th: "'Os' จะถูกใช้เมื่อเรา *ไม่ได้* เป็นจุดสนใจ ที่นี่เราเป็นตัวเอก ดังนั้นจึงเป็น 'Vi'",
                                tr: "'Os' (Bizi/Bize), odak noktasında *olmadığımızda* kullanılır. Burada ana karakterler biziz, bu yüzden 'Vi' (Biz) kullanılır.",
                                uk: "'Os' (Нас/Нам) використовується, коли ми *не* в центрі уваги. Тут ми головні герої, тому це 'Vi' (Ми).",
                                ur: "'Os' استعمال ہوتا ہے جب ہم توجہ کا مرکز *نہیں* ہوتے۔ یہاں ہم مرکزی کردار ہیں، اس لیے یہ 'Vi' (ہم) ہے۔",
                                vi: "'Os' được dùng khi chúng ta *không* phải là trọng tâm. Ở đây chúng ta là nhân vật chính, vì vậy nó là 'Vi' (Chúng ta/Chúng tôi).",
                                zh: "当我们*不*是焦点时使用 'Os' (我们-宾格)。在这里我们是主角，所以是 'Vi' (我们)。"
                            } 
                        } },
                        { answer: "Det", options: ["Det", "Den", "Dets"], feedback: { 
                            "Den": {
                                da: "Når vi taler generelt om vejret eller dagen, bruger vi 'Det'.",
                                en: "When talking generally about the weather or the day, we use 'Det' (It).",
                                de: "Wenn wir allgemein über das Wetter oder den Tag sprechen, verwenden wir 'Det' (Es).",
                                ar: "عند التحدث بشكل عام عن الطقس أو اليوم، نستخدم 'Det' (إنه).",
                                es: "Cuando hablamos en general sobre el clima o el día, usamos 'Det' (Ello/Eso).",
                                fa: "وقتی به طور کلی در مورد آب و هوا یا روز صحبت می کنیم، از 'Det' (آن) استفاده می کنیم.",
                                ku: "Dema ku bi giştî qala hewa an rojê tê kirin, em 'Det' bikar tînin.",
                                ne: "मौसम वा दिनको बारेमा सामान्य कुरा गर्दा, हामी 'Det' (यो) प्रयोग गर्छौं।",
                                ps: "کله چې په عمومي ډول د هوا یا ورځې په اړه خبرې کوو، موږ 'Det' کاروو.",
                                pt: "Ao falar geralmente sobre o clima ou o dia, usamos 'Det'.",
                                ru: "Когда мы говорим в целом о погоде или дне, мы используем 'Det'.",
                                th: "เมื่อพูดถึงสภาพอากาศหรือวันโดยทั่วไป เราจะใช้ 'Det'",
                                tr: "Genel olarak hava durumu veya gün hakkında konuşurken 'Det' kullanırız.",
                                uk: "Коли ми говоримо загалом про погоду чи день, ми використовуємо 'Det'.",
                                ur: "جب ہم عام طور پر موسم یا دن کے بارے میں بات کرتے ہیں تو ہم 'Det' استعمال کرتے ہیں۔",
                                vi: "Khi chúng ta nói chung về thời tiết hoặc ngày tháng, chúng ta dùng 'Det'.",
                                zh: "当我们泛指天气或日子时，我们用 'Det'。"
                            }, 
                            "Dets": {
                                da: "'Dets' betyder at det ejer noget. Her skal vi bare bruge 'Det' om dagen.",
                                en: "'Dets' (Its) means that it owns something. Here we just need to use 'Det' (It) for the day.",
                                de: "'Dets' (Dessen) bedeutet, dass es etwas besitzt. Hier müssen wir nur 'Det' (Es) für den Tag verwenden.",
                                ar: "تعني 'Dets' (له) أنه يمتلك شيئًا. هنا نحتاج فقط إلى استخدام 'Det' للإشارة إلى اليوم.",
                                es: "'Dets' (Su) significa que posee algo. Aquí solo necesitamos usar 'Det' para referirnos al día.",
                                fa: "'Dets' (مال آن) به این معنی است که چیزی را در اختیار دارد. در اینجا ما فقط باید برای روز از 'Det' استفاده کنیم.",
                                ku: "'Dets' (Ya wê) tê wê wateyê ku ew xwediyê tiştekî ye. Li vir em tenê hewce ne ku 'Det' ji bo rojê bikar bînin.",
                                ne: "'Dets' (यसको) को अर्थ यसले केही स्वामित्व राख्छ। यहाँ हामीले दिनको लागि मात्र 'Det' प्रयोग गर्नुपर्छ।",
                                ps: "'Dets' (د هغې) پدې معنی ده چې دا د یو څه مالکیت لري. دلته موږ یوازې د ورځې لپاره 'Det' کارولو ته اړتیا لرو.",
                                pt: "'Dets' significa que ele possui algo. Aqui precisamos apenas usar 'Det' para o dia.",
                                ru: "'Dets' (Его) означает, что ему что-то принадлежит. Здесь нам просто нужно использовать 'Det' для дня.",
                                th: "'Dets' หมายถึงว่ามันเป็นเจ้าของบางอย่าง ที่นี่เราแค่ต้องใช้ 'Det' สำหรับวัน",
                                tr: "'Dets', bir şeye sahip olduğu anlamına gelir. Burada gün için sadece 'Det' kullanmamız gerekiyor.",
                                uk: "'Dets' означає, що йому щось належить. Тут нам просто потрібно використовувати 'Det' для дня.",
                                ur: "'Dets' کا مطلب ہے کہ وہ کسی چیز کا مالک ہے۔ یہاں ہمیں دن کے لیے صرف 'Det' استعمال کرنا ہے۔",
                                vi: "'Dets' có nghĩa là nó sở hữu cái gì đó. Ở đây chúng ta chỉ cần dùng 'Det' cho ngày.",
                                zh: "'Dets' 意思是它拥有某物。这里我们只需要在说日子时使用 'Det'。"
                            } 
                        } }
                    ]
                }
            ]
        },
        {
            id: 'subjekt_set2',
            exercises: [
                {
                    text: "Lars og Sofie er i skoven. [blank_0] finder en kastanje under et træ. Sofie kigger i græsset. Men [blank_1] kan ikke finde nogen. To børn leger også i skoven. [blank_2] kaster med blade. Lars spørger børnene: \"Har [blank_3] fundet mange kastanjer?\" Børnene siger ja. Lars og Sofie går hjem. \"[blank_4] skal lave sjove dyr i aften,\" siger Lars.",
                    blanks: [
                        { answer: "Han", options: ["Han", "Hun", "Hans"], feedback: { 
                            "Hun": {
                                da: "Lars er en mand, så pronomenet skal være 'Han'.",
                                en: "Lars is a man, so the pronoun must be 'Han' (He).",
                                de: "Lars ist ein Mann, daher muss das Pronomen 'Han' (Er) sein.",
                                ar: "لارس رجل، لذلك يجب أن يكون الضمير 'Han' (هو).",
                                es: "Lars es un hombre, por lo que el pronombre debe ser 'Han' (Él).",
                                fa: "لارس یک مرد است، بنابراین ضمیر باید 'Han' (او) باشد.",
                                ku: "Lars zilamek e, ji ber vê yekê cînav divê 'Han' (Ew) be.",
                                ne: "लार्स एक मानिस हो, त्यसैले सर्वनाम 'Han' (उनी) हुनुपर्छ।",
                                ps: "لارس یو سړی دی، نو ضمیر باید 'Han' (هغه) وي.",
                                pt: "Lars é um homem, portanto o pronome deve ser 'Han' (Ele).",
                                ru: "Ларс — мужчина, поэтому местоимение должно быть 'Han' (Он).",
                                th: "ลาร์สเป็นผู้ชาย ดังนั้นสรรพนามต้องเป็น 'Han' (เขา)",
                                tr: "Lars bir erkek, bu yüzden zamir 'Han' (O - erkek) olmalıdır.",
                                uk: "Ларс — чоловік, тому займенник має бути 'Han' (Він).",
                                ur: "لارس ایک مرد ہے، اس لیے ضمیر 'Han' (وہ - مرد) ہونا چاہیے۔",
                                vi: "Lars là đàn ông, vì vậy đại từ phải là 'Han' (Anh ấy).",
                                zh: "拉尔斯是个男人，所以代词必须是 'Han' (他)。"
                            }, 
                            "Hans": {
                                da: "'Hans' betyder, at han ejer noget. Her er han i fokus (han finder), så vi bruger 'Han'.",
                                en: "'Hans' (His) means that he owns something. Here he is in focus (he finds), so we use 'Han' (He).",
                                de: "'Hans' (Sein) bedeutet, dass er etwas besitzt. Hier steht er im Mittelpunkt (er findet), also verwenden wir 'Han' (Er).",
                                ar: "تعني 'Hans' (له) أنه يمتلك شيئًا. هنا هو محور التركيز (هو يجد)، لذلك نستخدم 'Han' (هو).",
                                es: "'Hans' (Su - de él) significa que él posee algo. Aquí él es el foco (él encuentra), así que usamos 'Han' (Él).",
                                fa: "'Hans' (مال او) به این معنی است که او چیزی دارد. در اینجا او در کانون توجه است (او پیدا می کند)، بنابراین از 'Han' (او) استفاده می کنیم.",
                                ku: "'Hans' (Yê wî) tê wê wateyê ku ew xwediyê tiştekî ye. Li vir ew di balê de ye (ew dibîne), ji ber vê yekê em 'Han' (Ew) bikar tînin.",
                                ne: "'Hans' (उसको) को अर्थ उसले केही स्वामित्व राख्छ। यहाँ ऊ फोकसमा छ (उसले फेला पार्छ), त्यसैले हामी 'Han' (ऊ) प्रयोग गर्छौं।",
                                ps: "'Hans' (د هغه) پدې معنی ده چې هغه د یو څه مالکیت لري. دلته هغه په تمرکز کې دی (هغه پیدا کوي)، نو موږ 'Han' (هغه) کاروو.",
                                pt: "'Hans' significa que ele possui algo. Aqui ele é o foco, então usamos 'Han'.",
                                ru: "'Hans' означает, что ему что-то принадлежит. Здесь он в фокусе, поэтому мы используем 'Han'.",
                                th: "'Hans' หมายถึงเขาเป็นเจ้าของบางอย่าง ที่นี่เขาเป็นจุดสนใจ ดังนั้นเราจึงใช้ 'Han'",
                                tr: "'Hans', onun bir şeye sahip olduğu anlamına gelir. Burada o odaktadır, bu yüzden 'Han' kullanıyoruz.",
                                uk: "'Hans' означає, що йому щось належить. Тут він у центрі уваги, тому ми використовуємо 'Han'.",
                                ur: "'Hans' کا مطلب ہے کہ وہ کسی چیز کا مالک ہے۔ یہاں وہ توجہ کا مرکز ہے، اس لیے ہم 'Han' استعمال کرتے ہیں۔",
                                vi: "'Hans' có nghĩa là anh ấy sở hữu một cái gì đó. Ở đây anh ấy là trọng tâm, vì vậy chúng ta dùng 'Han'.",
                                zh: "'Hans' 意思是他拥有某物。这里他是焦点，所以我们用 'Han'。"
                            } 
                        } },
                        { answer: "hun", options: ["hun", "han", "hende"], feedback: { 
                            "han": {
                                da: "Sofie er en kvinde, så vi bruger 'hun'.",
                                en: "Sofie is a woman, so we use 'hun' (she).",
                                de: "Sofie ist eine Frau, also verwenden wir 'hun' (sie).",
                                ar: "صوفي امرأة، لذلك نستخدم 'hun' (هي).",
                                es: "Sofie es una mujer, así que usamos 'hun' (ella).",
                                fa: "سوفی یک زن است، بنابراین از 'hun' (او - مؤنث) استفاده می کنیم.",
                                ku: "Sofie jinek e, ji ber vê yekê em 'hun' (ew) bikar tînin.",
                                ne: "सोफी एक महिला हुन्, त्यसैले हामी 'hun' (उनी) प्रयोग गर्छौं।",
                                ps: "سوفي یوه ښځه ده، نو موږ 'hun' (هغه - ښځینه) کاروو.",
                                pt: "Sofie é uma mulher, então usamos 'hun' (ela).",
                                ru: "Софи — женщина, поэтому мы используем 'hun' (она).",
                                th: "โซฟีเป็นผู้หญิง ดังนั้นเราจึงใช้ 'hun' (เธอ)",
                                tr: "Sofie bir kadın, bu yüzden 'hun' (o - kadın) kullanıyoruz.",
                                uk: "Софі — жінка, тому ми використовуємо 'hun' (вона).",
                                ur: "صوفی ایک عورت ہے، اس لیے ہم 'hun' (وہ - عورت) استعمال کرتے ہیں۔",
                                vi: "Sofie là phụ nữ, vì vậy chúng ta dùng 'hun' (cô ấy).",
                                zh: "索菲是个女人，所以我们用 'hun' (她)。"
                            }, 
                            "hende": {
                                da: "'hende' bruges, når hun *ikke* er i fokus. Her er det hende der gør noget (kan ikke finde), så det er 'hun'.",
                                en: "'hende' (her) is used when she is *not* in focus. Here it is her doing something (cannot find), so it is 'hun' (she).",
                                de: "'hende' (ihr/sie) wird verwendet, wenn sie *nicht* im Mittelpunkt steht. Hier ist sie diejenige, die etwas tut (kann nicht finden), also ist es 'hun' (sie).",
                                ar: "تُستخدم 'hende' (ها - للمفعول به) عندما لا تكون هي محور التركيز. هنا هي التي تفعل شيئًا (لا تستطيع أن تجد)، لذلك نستخدم 'hun' (هي - للفاعل).",
                                es: "'hende' (la/a ella) se usa cuando ella *no* es el foco. Aquí es ella quien hace algo (no puede encontrar), así que es 'hun' (ella).",
                                fa: "'hende' (او - مفعولی) زمانی استفاده می شود که او در کانون توجه *نیست*. در اینجا او کاری انجام می دهد (نمی تواند پیدا کند)، بنابراین 'hun' (او - فاعلی) است.",
                                ku: "'hende' (wê) tê bikar anîn dema ku ew *ne* di balê de ye. Li vir ew e ku tiştek dike (nikare bibîne), ji ber vê yekê ew 'hun' (ew - kirde) e.",
                                ne: "'hende' (उनलाई) प्रयोग गरिन्छ जब उनी फोकसमा *हुँदिनन्*। यहाँ उनले केही गरिरहेकी छिन् (फेला पार्न सक्दिनन्), त्यसैले यो 'hun' (उनी) हो।",
                                ps: "'hende' (هغې ته) هغه وخت کارول کیږي کله چې هغه په تمرکز کې *نه* وي. دلته هغه یو څه کوي (نه شي موندلی)، نو دا 'hun' (هغه - موضوع) ده.",
                                pt: "'hende' é usado quando ela *não* é o foco. Aqui é ela quem faz algo, então é 'hun' (ela).",
                                ru: "'hende' используется, когда она *не* в центре внимания. Здесь она действует, поэтому это 'hun'.",
                                th: "'hende' ใช้เมื่อเธอ *ไม่ได้* เป็นจุดสนใจ ที่นี่เธอเป็นผู้กระทำ ดังนั้นจึงเป็น 'hun'",
                                tr: "'hende', o odakta *olmadığında* kullanılır. Burada bir şey yapan odur, bu yüzden 'hun' kullanılır.",
                                uk: "'hende' використовується, коли вона *не* в центрі уваги. Тут діє вона, тому це 'hun' (вона).",
                                ur: "'hende' استعمال ہوتا ہے جب وہ توجہ کا مرکز *نہیں* ہوتی۔ یہاں وہ کچھ کر رہی ہے، اس لیے یہ 'hun' ہے۔",
                                vi: "'hende' được dùng khi cô ấy *không* phải là trọng tâm. Ở đây cô ấy là người đang làm gì đó, vì vậy nó là 'hun'.",
                                zh: "当她*不*是焦点时使用 'hende' (她-宾格)。这里是她在做某事，所以是 'hun' (她)。"
                            } 
                        } },
                        { answer: "De", options: ["De", "Vi", "Dem"], feedback: { 
                            "Vi": {
                                da: "Der tales om de to børn, så det er 3. person flertal 'De'.",
                                en: "It is about the two children, so it is 3rd person plural 'De' (They).",
                                de: "Es geht um die zwei Kinder, also ist es die 3. Person Plural 'De' (Sie).",
                                ar: "الحديث عن الطفلين، لذلك نستخدم ضمير الغائب للجمع 'De' (هم).",
                                es: "Se trata de los dos niños, así que es la 3ª persona del plural 'De' (Ellos).",
                                fa: "در مورد دو کودک صحبت می شود، بنابراین سوم شخص جمع 'De' (آنها) است.",
                                ku: "Ew li ser her du zarokan e, ji ber vê yekê ew kesê sêyemîn pirjimar 'De' (Ew) ye.",
                                ne: "यो दुई बच्चाहरूको बारेमा हो, त्यसैले यो तेस्रो व्यक्ति बहुवचन 'De' (तिनीहरू) हो।",
                                ps: "دا د دوو ماشومانو په اړه دی، نو دا دریم شخص جمع 'De' (دوی) دی.",
                                pt: "Trata-se das duas crianças, portanto, é a 3ª pessoa do plural 'De' (Eles).",
                                ru: "Речь идет о двух детях, поэтому это 3-е лицо множественного числа 'De' (Они).",
                                th: "กล่าวถึงเด็กสองคน ดังนั้นจึงเป็นบุรุษที่ 3 พหูพจน์ 'De' (พวกเขา)",
                                tr: "İki çocuktan bahsediliyor, bu yüzden 3. çoğul şahıs 'De' (Onlar) kullanılır.",
                                uk: "Йдеться про двох дітей, тому це 3-тя особа множини 'De' (Вони).",
                                ur: "دو بچوں کی بات ہو رہی ہے، اس لیے یہ تیسرا شخص جمع 'De' (وہ) ہے۔",
                                vi: "Nói về hai đứa trẻ, vì vậy đây là ngôi thứ ba số nhiều 'De' (Họ).",
                                zh: "说到这两个孩子，所以是第三人称复数 'De' (他们)。"
                            }, 
                            "Dem": {
                                da: "'Dem' bruges, når de *ikke* er i fokus for handlingen. Børnene er hovedpersonerne (de kaster), så det er 'De'.",
                                en: "'Dem' (Them) is used when they are *not* the focus of the action. The children are the main characters (they throw), so it is 'De' (They).",
                                de: "'Dem' (Ihnen/Sie) wird verwendet, wenn sie *nicht* im Mittelpunkt der Handlung stehen. Die Kinder sind die Hauptpersonen (sie werfen), also ist es 'De' (Sie).",
                                ar: "تُستخدم 'Dem' (هم - للمفعول به) عندما لا يكونون محور الحدث. الأطفال هم الشخصيات الرئيسية (هم يرمون)، لذلك نستخدم 'De' (هم - للفاعل).",
                                es: "'Dem' (A ellos/Les) se usa cuando *no* son el foco de la acción. Los niños son los personajes principales (ellos tiran), así que es 'De' (Ellos).",
                                fa: "'Dem' (آنها - مفعولی) زمانی استفاده می شود که آنها کانون عمل *نیستند*. بچه ها شخصیت های اصلی هستند (پرتاب می کنند)، بنابراین 'De' (آنها - فاعلی) است.",
                                ku: "'Dem' (Wan) tê bikar anîn gava ku ew *ne* navenda çalakiyê ne. Zarok karakterên sereke ne (ew davêjin), ji ber vê yekê ew 'De' (Ew - kirde) e.",
                                ne: "'Dem' (तिनीहरूलाई) प्रयोग गरिन्छ जब तिनीहरू कार्यको फोकस *हुँदैनन्*। बच्चाहरू मुख्य पात्र हुन् (तिनीहरूले फाल्छन्), त्यसैले यो 'De' (तिनीहरू) हो।",
                                ps: "'Dem' (دوی ته) هغه وخت کارول کیږي کله چې دوی د عمل تمرکز *نه* وي. ماشومان اصلي کرکټرونه دي (دوی غورځوي)، نو دا 'De' (دوی - موضوع) ده.",
                                pt: "'Dem' é usado quando eles *não* são o foco da ação. As crianças são os personagens principais, então é 'De'.",
                                ru: "'Dem' используется, когда они *не* в центре действия. Дети — главные действующие лица, поэтому это 'De'.",
                                th: "'Dem' ใช้เมื่อพวกเขา *ไม่ได้* เป็นจุดสนใจของการกระทำ เด็กๆ เป็นตัวเอก ดังนั้นจึงเป็น 'De'",
                                tr: "'Dem', eylemin odağında *olmadıklarında* kullanılır. Çocuklar ana karakterlerdir, bu yüzden 'De' kullanılır.",
                                uk: "'Dem' використовується, коли вони *не* в центрі дії. Діти — головні герої, тому це 'De' (Вони).",
                                ur: "'Dem' استعمال ہوتا ہے جب وہ عمل کی توجہ کا مرکز *نہیں* ہوتے۔ بچے مرکزی کردار ہیں، اس لیے یہ 'De' ہے۔",
                                vi: "'Dem' được dùng khi họ *không* phải là trọng tâm của hành động. Bọn trẻ là nhân vật chính, vì vậy nó là 'De'.",
                                zh: "当他们*不*是动作的焦点时使用 'Dem'。孩子们是主角，所以是 'De' (他们)。"
                            } 
                        } },
                        { answer: "I", options: ["I", "De", "Jer"], feedback: { 
                            "De": {
                                da: "Lars taler direkte til børnene, så han siger 'I'.",
                                en: "Lars speaks directly to the children, so he says 'I' (You - plural).",
                                de: "Lars spricht direkt mit den Kindern, also sagt er 'I' (Ihr).",
                                ar: "يتحدث لارس مباشرة إلى الأطفال، لذلك يقول 'I' (أنتم).",
                                es: "Lars le habla directamente a los niños, así que dice 'I' (Vosotros/Ustedes).",
                                fa: "لارس مستقیماً با بچه ها صحبت می کند، بنابراین می گوید 'I' (شما - جمع).",
                                ku: "Lars rasterast bi zarokan re diaxive, ji ber vê yekê ew dibêje 'I' (Hûn).",
                                ne: "लार्सले बच्चाहरूसँग सीधै कुरा गर्छन्, त्यसैले उहाँ 'I' (तपाईंहरू) भन्नुहुन्छ।",
                                ps: "لارس ماشومانو ته مستقیم خبرې کوي، نو هغه وايي 'I' (تاسو - جمع).",
                                pt: "Lars fala diretamente com as crianças, então ele diz 'I' (Vocês).",
                                ru: "Ларс говорит прямо с детьми, поэтому он говорит 'I' (Вы).",
                                th: "ลาร์สพูดกับเด็กๆ โดยตรง เขาจึงพูดว่า 'I' (พวกคุณ)",
                                tr: "Lars doğrudan çocuklarla konuşuyor, bu yüzden 'I' (Siz) diyor.",
                                uk: "Ларс говорить безпосередньо до дітей, тому він каже 'I' (Ви).",
                                ur: "لارس براہ راست بچوں سے بات کر رہا ہے، اس لیے وہ کہتا ہے 'I' (تم/آپ سب)۔",
                                vi: "Lars nói chuyện trực tiếp với bọn trẻ, vì vậy anh ấy nói 'I' (Các bạn).",
                                zh: "拉尔斯直接和孩子们说话，所以他说 'I' (你们)。"
                            }, 
                            "Jer": {
                                da: "'Jer' bruges, når man *ikke* er i fokus. Lars spørger 'Har I fundet...' hvor 'I' er i fokus.",
                                en: "'Jer' (You - object plural) is used when you are *not* in focus. Lars asks 'Have you found...' where 'I' (You - plural) is in focus.",
                                de: "'Jer' (Euch) wird verwendet, wenn man *nicht* im Mittelpunkt steht. Lars fragt 'Habt ihr gefunden...', wobei 'I' (Ihr) im Fokus steht.",
                                ar: "تُستخدم 'Jer' (أنتم - للمفعول به) عندما لا تكونوا محور التركيز. يسأل لارس 'هل وجدتم...' حيث 'I' (أنتم - للفاعل) هي محور التركيز.",
                                es: "'Jer' (Os/A vosotros) se usa cuando *no* se es el foco. Lars pregunta '¿Habéis encontrado...' donde 'I' (Vosotros) es el foco.",
                                fa: "'Jer' (شما - مفعولی جمع) زمانی استفاده می شود که در کانون توجه *نیستید*. لارس می‌پرسد «آیا پیدا کرده‌اید...» جایی که 'I' (شما - فاعلی جمع) در کانون توجه است.",
                                ku: "'Jer' (We) tê bikar anîn gava ku hûn *ne* di balê de bin. Lars dipirse 'We dît...' ku 'I' (Hûn) di balê de ye.",
                                ne: "'Jer' (तपाईंहरूलाई) प्रयोग गरिन्छ जब तपाईंहरू फोकसमा *हुनुहुन्न*। लार्स सोध्छन् 'के तपाईंहरूले फेला पार्नुभयो...' जहाँ 'I' (तपाईंहरू) फोकसमा छ।",
                                ps: "'Jer' (تاسو - څیز جمع) هغه وخت کارول کیږي کله چې تاسو په تمرکز کې *نه* یاست. لارس پوښتنه کوي 'ایا تاسو موندلي...' چیرې چې 'I' (تاسو - جمع) په تمرکز کې دی.",
                                pt: "'Jer' é usado quando você *não* é o foco. Lars pergunta 'Vocês encontraram...' onde 'I' é o foco.",
                                ru: "'Jer' используется, когда вы *не* в фокусе. Ларс спрашивает 'Вы нашли...', где 'I' в фокусе.",
                                th: "'Jer' ใช้เมื่อคุณ *ไม่ได้* เป็นจุดสนใจ ลาร์สถามว่า 'พวกคุณเจอ...' ซึ่ง 'I' เป็นจุดสนใจ",
                                tr: "'Jer', odakta *olmadığınızda* kullanılır. Lars 'Buldunuz mu...' diye soruyor, burada odak 'I'dır.",
                                uk: "'Jer' використовується, коли людина *не* у фокусі. Ларс запитує 'Ви знайшли...', де 'I' у фокусі.",
                                ur: "'Jer' استعمال ہوتا ہے جب آپ توجہ کا مرکز *نہیں* ہوتے۔ لارس پوچھتا ہے 'کیا آپ نے ڈھونڈ لیا...' جہاں 'I' توجہ کا مرکز ہے۔",
                                vi: "'Jer' được dùng khi bạn *không* phải là trọng tâm. Lars hỏi 'Các bạn đã tìm thấy...' trong đó 'I' là trọng tâm.",
                                zh: "当你不*是*焦点时使用 'Jer' (你们-宾格)。拉尔斯问 '你们找到了...'，这里 'I' (你们) 是焦点。"
                            } 
                        } },
                        { answer: "Vi", options: ["Vi", "I", "Vores"], feedback: { 
                            "I": {
                                da: "Lars taler om sig selv og Sofie samlet, så det er 'Vi'.",
                                en: "Lars is talking about himself and Sofie together, so it is 'Vi' (We).",
                                de: "Lars spricht über sich und Sofie gemeinsam, also ist es 'Vi' (Wir).",
                                ar: "يتحدث لارس عن نفسه وصوفي معًا، لذلك نستخدم 'Vi' (نحن).",
                                es: "Lars está hablando de sí mismo y de Sofie juntos, así que es 'Vi' (Nosotros).",
                                fa: "لارس در مورد خودش و سوفی با هم صحبت می کند، بنابراین 'Vi' (ما) است.",
                                ku: "Lars li ser xwe û Sofie bi hev re diaxive, ji ber vê yekê ew 'Vi' (Em) e.",
                                ne: "लार्सले आफू र सोफीको बारेमा सँगै कुरा गरिरहेका छन्, त्यसैले यो 'Vi' (हामी) हो।",
                                ps: "لارس د ځان او سوفي په اړه په ګډه خبرې کوي، نو دا 'Vi' (موږ) دی.",
                                pt: "Lars está falando dele mesmo e de Sofie juntos, então é 'Vi' (Nós).",
                                ru: "Ларс говорит о себе и Софи вместе, поэтому это 'Vi' (Мы).",
                                th: "ลาร์สพูดถึงตัวเองและโซฟีด้วยกัน ดังนั้นจึงเป็น 'Vi' (พวกเรา)",
                                tr: "Lars kendisi ve Sofie'den birlikte bahsediyor, bu yüzden 'Vi' (Biz) kullanılır.",
                                uk: "Ларс говорить про себе та Софі разом, тому це 'Vi' (Ми).",
                                ur: "لارس اپنے اور صوفی کے بارے میں ایک ساتھ بات کر رہا ہے، اس لیے یہ 'Vi' (ہم) ہے۔",
                                vi: "Lars nói về bản thân anh ấy và Sofie cùng nhau, vì vậy đó là 'Vi' (Chúng tôi).",
                                zh: "拉尔斯在说他和索菲，所以是 'Vi' (我们)。"
                            }, 
                            "Vores": {
                                da: "'Vores' betyder, at vi ejer noget. Her er vi i fokus (vi skal lave dyr), så det er 'Vi'.",
                                en: "'Vores' (Our) means that we own something. Here we are in focus (we are going to make animals), so it is 'Vi' (We).",
                                de: "'Vores' (Unser) bedeutet, dass wir etwas besitzen. Hier stehen wir im Mittelpunkt (wir werden Tiere basteln), also ist es 'Vi' (Wir).",
                                ar: "تعني 'Vores' (لنا) أننا نمتلك شيئًا. هنا نحن محور التركيز (سنقوم بصنع حيوانات)، لذلك نستخدم 'Vi' (نحن).",
                                es: "'Vores' (Nuestro) significa que poseemos algo. Aquí somos el foco (vamos a hacer animales), así que es 'Vi' (Nosotros).",
                                fa: "'Vores' (مال ما) به این معنی است که ما مالک چیزی هستیم. در اینجا ما در کانون توجه هستیم (ما حیوانات درست خواهیم کرد)، بنابراین 'Vi' (ما) است.",
                                ku: "'Vores' (Yê me) tê wê wateyê ku em xwediyê tiştekî ne. Li vir em di balê de ne (em ê heywanan çêkin), ji ber vê yekê ew 'Vi' (Em) e.",
                                ne: "'Vores' (हाम्रो) को अर्थ हामीले केही स्वामित्व राख्छौं। यहाँ हामी फोकसमा छौं (हामी जनावरहरू बनाउन जाँदैछौं), त्यसैले यो 'Vi' (हामी) हो।",
                                ps: "'Vores' (زموږ) پدې معنی ده چې موږ د یو څه مالکیت لرو. دلته موږ په تمرکز کې یو (موږ به څارویان جوړ کړو)، نو دا 'Vi' (موږ) دی.",
                                pt: "'Vores' significa que possuímos algo. Aqui nós somos o foco, então é 'Vi'.",
                                ru: "'Vores' означает, что мы чем-то владеем. Здесь мы в фокусе, поэтому это 'Vi'.",
                                th: "'Vores' หมายถึงเราเป็นเจ้าของบางอย่าง ที่นี่เราเป็นจุดสนใจ ดังนั้นจึงเป็น 'Vi'",
                                tr: "'Vores', bizim bir şeye sahip olduğumuz anlamına gelir. Burada biz odaktayız, bu yüzden 'Vi' kullanılır.",
                                uk: "'Vores' означає, що ми чимось володіємо. Тут ми у фокусі, тому це 'Vi' (Ми).",
                                ur: "'Vores' کا مطلب ہے کہ ہم کسی چیز کے مالک ہیں۔ یہاں ہم توجہ کا مرکز ہیں، اس لیے یہ 'Vi' ہے۔",
                                vi: "'Vores' có nghĩa là chúng tôi sở hữu cái gì đó. Ở đây chúng tôi là trọng tâm, vì vậy nó là 'Vi'.",
                                zh: "'Vores' 意思是我们的。这里我们是焦点，所以是 'Vi' (我们)。"
                            } 
                        } }
                    ]
                }
            ]
        },
        {
            id: 'subjekt_set3',
            exercises: [
                {
                    text: "Det er koldt og mørkt udenfor. Inde i stuen er der varmt. Mor laver kaffe. [blank_0] tænder lys. Min bror sidder i sofaen. [blank_1] spiller på sin iPad. Vores kat sover også. Pludselig vågner katten. [blank_2] kigger på mor. Mor smiler til min bror og mig. \"Vil [blank_3] have kage?\" spørger mor. Min bror og jeg siger ja. \"[blank_4] vil gerne have kage,\" siger vi. [blank_5] er en god aften.",
                    blanks: [
                        { answer: "Hun", options: ["Hun", "Han", "Hendes"], feedback: { 
                            "Han": {
                                da: "Mor er en kvinde, så vi bruger 'Hun'.",
                                en: "Mom is a woman, so we use 'Hun' (She).",
                                de: "Mama ist eine Frau, also verwenden wir 'Hun' (Sie).",
                                ar: "الأم امرأة، لذلك نستخدم 'Hun' (هي).",
                                es: "Mamá es una mujer, así que usamos 'Hun' (Ella).",
                                fa: "مادر یک زن است، بنابراین ما از 'Hun' (او - مؤنث) استفاده می کنیم.",
                                ku: "Dayik jinek e, ji ber vê yekê em 'Hun' (Ew) bikar tînin.",
                                ne: "आमा एक महिला हुनुहुन्छ, त्यसैले हामी 'Hun' (उनी) प्रयोग गर्छौं।",
                                ps: "مور یوه ښځه ده، نو موږ 'Hun' (هغه - ښځینه) کاروو.",
                                pt: "Mamãe é uma mulher, então usamos 'Hun' (Ela).",
                                ru: "Мама — женщина, поэтому мы используем 'Hun' (Она).",
                                th: "แม่เป็นผู้หญิง ดังนั้นเราจึงใช้ 'Hun' (เธอ)",
                                tr: "Anne bir kadın, bu yüzden 'Hun' (O - kadın) kullanıyoruz.",
                                uk: "Мама — жінка, тому ми використовуємо 'Hun' (Вона).",
                                ur: "ماں ایک عورت ہے، اس لیے ہم 'Hun' (وہ - عورت) استعمال کرتے ہیں۔",
                                vi: "Mẹ là phụ nữ, vì vậy chúng ta dùng 'Hun' (Cô ấy/Bà ấy).",
                                zh: "妈妈是个女人，所以我们用 'Hun' (她)。"
                            }, 
                            "Hendes": {
                                da: "'Hendes' betyder ejerskab. Her er mor i fokus for handlingen (at tænde lys), så vi bruger 'Hun'.",
                                en: "'Hendes' (Her) means ownership. Here mom is the focus of the action (turning on the light), so we use 'Hun' (She).",
                                de: "'Hendes' (Ihr) bedeutet Besitz. Hier ist Mama im Mittelpunkt der Handlung (Licht einschalten), also verwenden wir 'Hun' (Sie).",
                                ar: "تعني 'Hendes' (لها) الملكية. هنا الأم هي محور الحدث (تشغيل الضوء)، لذلك نستخدم 'Hun' (هي).",
                                es: "'Hendes' (Su - de ella) significa posesión. Aquí mamá es el foco de la acción (encender la luz), así que usamos 'Hun' (Ella).",
                                fa: "'Hendes' (مال او) به معنای مالکیت است. در اینجا مادر کانون عمل است (روشن کردن چراغ)، بنابراین از 'Hun' (او) استفاده می کنیم.",
                                ku: "'Hendes' (Ya wê) tê wateya xwedîtiyê. Li vir dayik navenda çalakiyê ye (pêxistina ronahiyê), ji ber vê yekê em 'Hun' (Ew) bikar tînin.",
                                ne: "'Hendes' (उनको) को अर्थ स्वामित्व हो। यहाँ आमा कार्यको फोकस हुनुहुन्छ (बत्ती बाल्ने), त्यसैले हामी 'Hun' (उनी) प्रयोग गर्छौं।",
                                ps: "'Hendes' (د هغې) پدې معنی ده چې مالکیت. دلته مور د عمل تمرکز ده (د ر light ا فعالول)، نو موږ 'Hun' (هغه) کاروو.",
                                pt: "'Hendes' significa posse. Aqui a mãe é o foco da ação, então usamos 'Hun'.",
                                ru: "'Hendes' означает принадлежность. Здесь мама в центре действия, поэтому мы используем 'Hun'.",
                                th: "'Hendes' หมายถึงความเป็นเจ้าของ ที่นี่แม่เป็นจุดศูนย์กลางของการกระทำ ดังนั้นเราจึงใช้ 'Hun'",
                                tr: "'Hendes' sahiplik anlamına gelir. Burada anne eylemin odağındadır, bu yüzden 'Hun' kullanıyoruz.",
                                uk: "'Hendes' означає приналежність. Тут мама в центрі дії, тому ми використовуємо 'Hun'.",
                                ur: "'Hendes' کا مطلب ملکیت ہے۔ یہاں ماں عمل کی توجہ کا مرکز ہے، اس لیے ہم 'Hun' استعمال کرتے ہیں۔",
                                vi: "'Hendes' có nghĩa là quyền sở hữu. Ở đây mẹ là trọng tâm của hành động, vì vậy chúng ta dùng 'Hun'.",
                                zh: "'Hendes' 意思是她的（所有权）。这里妈妈是动作的焦点，所以我们用 'Hun' (她)。"
                            } 
                        } },
                        { answer: "Han", options: ["Han", "Jeg", "Ham"], feedback: { 
                            "Jeg": {
                                da: "Det er broren (en anden person), der spiller, ikke personen selv, så 'Han'.",
                                en: "It is the brother (another person) who is playing, not the person themselves, so 'Han' (He).",
                                de: "Es ist der Bruder (eine andere Person), der spielt, nicht die Person selbst, also 'Han' (Er).",
                                ar: "الأخ (شخص آخر) هو من يلعب، وليس الشخص نفسه، لذلك نستخدم 'Han' (هو).",
                                es: "Es el hermano (otra persona) quien está jugando, no la propia persona, así que 'Han' (Él).",
                                fa: "این برادر (شخص دیگری) است که بازی می کند، نه خود شخص، بنابراین 'Han' (او) است.",
                                ku: "Bira (kesek din) e ku dilîze, ne kes bixwe ye, ji ber vê yekê 'Han' (Ew).",
                                ne: "यो भाइ (अर्को व्यक्ति) हो जो खेलिरहेको छ, व्यक्ति आफैं होइन, त्यसैले 'Han' (ऊ)।",
                                ps: "دا ورور (بل شخص) دی چې لوبه کوي، نه پخپله هغه کس، نو 'Han' (هغه).",
                                pt: "É o irmão (outra pessoa) quem está jogando, não a própria pessoa, então 'Han' (Ele).",
                                ru: "Это брат (другой человек) играет, а не сам человек, поэтому 'Han' (Он).",
                                th: "พี่ชาย (อีกคน) เป็นคนเล่น ไม่ใช่ตัวเอง ดังนั้นจึงเป็น 'Han' (เขา)",
                                tr: "Oynayan kişinin kendisi değil erkek kardeşi (başka biri), bu yüzden 'Han'.",
                                uk: "Це брат (інша людина) грає, а не сама людина, тому 'Han' (Він).",
                                ur: "یہ بھائی (کوئی اور شخص) ہے جو کھیل رہا ہے، خود وہ شخص نہیں، اس لیے 'Han' (وہ)۔",
                                vi: "Người đang chơi là anh/em trai (một người khác), không phải là người nói, vì vậy là 'Han' (Anh ấy).",
                                zh: "是哥哥/弟弟（另一个人）在玩，不是说话人自己，所以是 'Han' (他)。"
                            }, 
                            "Ham": {
                                da: "'Ham' bruges, når han *ikke* er i fokus. Her udfører han handlingen (spiller), så han er i fokus.",
                                en: "'Ham' (Him) is used when he is *not* in focus. Here he performs the action (plays), so he is in focus.",
                                de: "'Ham' (Ihn/Ihm) wird verwendet, wenn er *nicht* im Mittelpunkt steht. Hier führt er die Handlung aus (spielt), also steht er im Mittelpunkt.",
                                ar: "تُستخدم 'Ham' (هو - للمفعول به) عندما لا يكون محور التركيز. هنا هو يقوم بالفعل (يلعب)، لذلك فهو محور التركيز ونستخدم 'Han' (هو - للفاعل).",
                                es: "'Ham' (Lo/Le) se usa cuando él *no* es el foco. Aquí él realiza la acción (juega), por lo que es el foco y usamos 'Han' (Él).",
                                fa: "'Ham' (او - مفعولی) زمانی استفاده می شود که او در کانون توجه *نیست*. در اینجا او عمل را انجام می دهد (بازی می کند)، بنابراین او در کانون توجه است.",
                                ku: "'Ham' (Wî) tê bikar anîn dema ku ew *ne* di balê de ye. Li vir ew çalakiyê dike (dilîze), ji ber vê yekê ew di balê de ye.",
                                ne: "'Ham' (उसलाई) प्रयोग गरिन्छ जब ऊ फोकसमा *हुँदैन*। यहाँ उसले कार्य (खेल्छ) प्रदर्शन गर्दछ, त्यसैले ऊ फोकसमा छ।",
                                ps: "'Ham' (هغه ته) هغه وخت کارول کیږي کله چې هغه په تمرکز کې *نه* وي. دلته هغه عمل ترسره کوي (لوبه کوي)، نو هغه په تمرکز کې دی.",
                                pt: "'Ham' é usado quando ele *não* é o foco. Aqui ele realiza a ação, então ele é o foco.",
                                ru: "'Ham' используется, когда он *не* в фокусе. Здесь он выполняет действие, поэтому он в фокусе.",
                                th: "'Ham' ใช้เมื่อเขา *ไม่ได้* เป็นจุดสนใจ ที่นี่เขาเป็นผู้กระทำการ ดังนั้นเขาจึงเป็นจุดสนใจ",
                                tr: "'Ham', o odakta *olmadığında* kullanılır. Burada eylemi o gerçekleştiriyor, bu yüzden odaktadır.",
                                uk: "'Ham' використовується, коли він *не* у фокусі. Тут він виконує дію (грає), тому він у фокусі.",
                                ur: "'Ham' استعمال ہوتا ہے جب وہ توجہ کا مرکز *نہیں* ہوتا۔ یہاں وہ عمل کر رہا ہے، اس لیے وہ توجہ کا مرکز ہے۔",
                                vi: "'Ham' được dùng khi anh ấy *không* phải là trọng tâm. Ở đây anh ấy thực hiện hành động, vì vậy anh ấy là trọng tâm.",
                                zh: "当他*不*是焦点时使用 'Ham' (他-宾格)。这里他在执行动作，所以他是焦点。"
                            } 
                        } },
                        { answer: "Den", options: ["Den", "Det", "Dens"], feedback: { 
                            "Det": {
                                da: "Ordet er 'en kat' (fælleskøn), så vi bruger 'Den'.",
                                en: "The word is 'en kat' (common gender), so we use 'Den' (It).",
                                de: "Das Wort ist 'en kat' (Utrum), also verwenden wir 'Den' (Sie/Er).",
                                ar: "الكلمة هي 'en kat' (جنس مشترك)، لذلك نستخدم 'Den'.",
                                es: "La palabra es 'en kat' (género común), así que usamos 'Den' (Él/Ella).",
                                fa: "کلمه 'en kat' (جنسیت مشترک) است، بنابراین ما از 'Den' استفاده می کنیم.",
                                ku: "Peyv 'en kat' (zayenda hevpar) e, ji ber vê yekê em 'Den' bikar tînin.",
                                ne: "शब्द 'en kat' (साझा लिङ्ग) हो, त्यसैले हामी 'Den' प्रयोग गर्छौं।",
                                ps: "کلمه 'en kat' (عام جنس) ده، نو موږ 'Den' کاروو.",
                                pt: "A palavra é 'en kat' (gênero comum), então usamos 'Den'.",
                                ru: "Слово 'en kat' (общий род), поэтому мы используем 'Den'.",
                                th: "คำว่า 'en kat' (เพศรวม) ดังนั้นเราจึงใช้ 'Den'",
                                tr: "Kelime 'en kat' (ortak cinsiyet), bu yüzden 'Den' kullanıyoruz.",
                                uk: "Слово 'en kat' (спільний рід), тому ми використовуємо 'Den'.",
                                ur: "لفظ 'en kat' (مشترک جنس) ہے، اس لیے ہم 'Den' استعمال کرتے ہیں۔",
                                vi: "Từ này là 'en kat' (giống chung), vì vậy chúng ta dùng 'Den'.",
                                zh: "这个词是 'en kat' (通性)，所以我们用 'Den'。"
                            }, 
                            "Dens": {
                                da: "'Dens' betyder at den ejer noget. Her er katten i fokus, så vi bruger 'Den'.",
                                en: "'Dens' (Its) means that it owns something. Here the cat is in focus, so we use 'Den' (It).",
                                de: "'Dens' (Dessen) bedeutet, dass sie/er etwas besitzt. Hier steht die Katze im Fokus, also verwenden wir 'Den'.",
                                ar: "تعني 'Dens' (لها/له) أنها تمتلك شيئًا. هنا القطة هي محور التركيز، لذلك نستخدم 'Den'.",
                                es: "'Dens' (Su) significa que posee algo. Aquí el gato es el foco, así que usamos 'Den'.",
                                fa: "'Dens' (مال آن) به این معنی است که مالک چیزی است. در اینجا گربه در کانون توجه است، بنابراین از 'Den' استفاده می کنیم.",
                                ku: "'Dens' (Ya wê/wî) tê wê wateyê ku ew xwediyê tiştekî ye. Li vir pisîk di balê de ye, ji ber vê yekê em 'Den' bikar tînin.",
                                ne: "'Dens' (यसको) को अर्थ यसले केही स्वामित्व राख्छ। यहाँ बिरालो फोकसमा छ, त्यसैले हामी 'Den' प्रयोग गर्छौं।",
                                ps: "'Dens' (د هغې) پدې معنی ده چې دا د یو څه مالکیت لري. دلته پیشو په تمرکز کې ده، نو موږ 'Den' کاروو."
                            } 
                        } },
                        { answer: "I", options: ["I", "Vi", "Jeres"], feedback: { 
                            "Vi": {
                                da: "Mor taler direkte til to personer, så hun siger 'I'.",
                                en: "Mom speaks directly to two people, so she says 'I' (You - plural).",
                                de: "Mama spricht direkt zu zwei Personen, also sagt sie 'I' (Ihr).",
                                ar: "تتحدث الأم مباشرة إلى شخصين، لذلك تقول 'I' (أنتم).",
                                es: "Mamá le habla directamente a dos personas, así que dice 'I' (Vosotros/Ustedes).",
                                fa: "مادر مستقیماً با دو نفر صحبت می کند، بنابراین می گوید 'I' (شما - جمع).",
                                ku: "Dayik rasterast bi du kesan re diaxive, ji ber vê yekê ew dibêje 'I' (Hûn).",
                                ne: "आमा दुई व्यक्तिहरूसँग सीधै कुरा गर्नुहुन्छ, त्यसैले उहाँ 'I' (तपाईंहरू) भन्नुहुन्छ।",
                                ps: "مور مستقیم دوه خلکو ته خبرې کوي، نو هغه وايي 'I' (تاسو - جمع)."
                            }, 
                            "Jeres": {
                                da: "'Jeres' betyder ejerskab. Her er det personerne, der er i fokus (vil I have), så det er 'I'.",
                                en: "'Jeres' (Your) means ownership. Here the people are the focus (do you want), so it is 'I' (You - plural).",
                                de: "'Jeres' (Euer) bedeutet Besitz. Hier stehen die Personen im Fokus (wollt ihr), also ist es 'I' (Ihr).",
                                ar: "تعني 'Jeres' (لكم) الملكية. هنا الأشخاص هم محور التركيز (هل تريدون)، لذلك نستخدم 'I' (أنتم).",
                                es: "'Jeres' (Vuestro/Su) significa posesión. Aquí las personas son el foco (queréis), así que es 'I' (Vosotros/Ustedes).",
                                fa: "'Jeres' (مال شما) به معنای مالکیت است. در اینجا افراد کانون توجه هستند (آیا می خواهید)، بنابراین 'I' (شما - جمع) است.",
                                ku: "'Jeres' (Ya we) tê wateya xwedîtiyê. Li vir kes navend in (hûn dixwazin), ji ber vê yekê ew 'I' (Hûn) e.",
                                ne: "'Jeres' (तपाईंहरूको) को अर्थ स्वामित्व हो। यहाँ व्यक्तिहरू फोकस हुन् (के तपाईंहरू चाहनुहुन्छ), त्यसैले यो 'I' (तपाईंहरू) हो।",
                                ps: "'Jeres' (ستاسو) پدې معنی ده چې مالکیت. دلته خلک تمرکز دي (ایا تاسو غواړئ)، نو دا 'I' (تاسو - جمع) دی."
                            } 
                        } },
                        { answer: "Vi", options: ["Vi", "De", "Os"], feedback: { 
                            "De": {
                                da: "Personen taler på vegne af sig selv og sin bror, altså 'Vi'.",
                                en: "The person speaks on behalf of themselves and their brother, meaning 'Vi' (We).",
                                de: "Die Person spricht im Namen von sich und ihrem Bruder, also 'Vi' (Wir).",
                                ar: "يتحدث الشخص نيابة عن نفسه وعن أخيه، مما يعني استخدام 'Vi' (نحن).",
                                es: "La persona habla en nombre de sí misma y de su hermano, es decir, 'Vi' (Nosotros).",
                                fa: "شخص از طرف خود و برادرش صحبت می کند، به این معنی که 'Vi' (ما).",
                                ku: "Kes li ser navê xwe û birayê xwe diaxive, tê wateya 'Vi' (Em).",
                                ne: "व्यक्तिले आफू र आफ्नो भाइको तर्फबाट बोल्छ, जसको अर्थ 'Vi' (हामी) हो।",
                                ps: "شخص د ځان او خپل ورور په استازیتوب خبرې کوي، په معنی 'Vi' (موږ)."
                            }, 
                            "Os": {
                                da: "'Os' bruges, når vi *ikke* er i fokus. Her er vi hovedpersonerne, der udfører handlingen (vil have).",
                                en: "'Os' (Us) is used when we are *not* in focus. Here we are the main characters performing the action (want to have).",
                                de: "'Os' (Uns) wird verwendet, wenn wir *nicht* im Fokus stehen. Hier sind wir die Hauptpersonen, die die Handlung ausführen (wollen haben).",
                                ar: "تُستخدم 'Os' (نحن - للمفعول به) عندما لا نكون محور التركيز. هنا نحن الشخصيات الرئيسية التي تقوم بالفعل (نريد).",
                                es: "'Os' (Nos/A nosotros) se usa cuando *no* somos el foco. Aquí somos los personajes principales que realizan la acción (queremos tener).",
                                fa: "'Os' (ما - مفعولی) زمانی استفاده می شود که ما در کانون توجه *نیستیم*. در اینجا ما شخصیت های اصلی هستیم که عمل را انجام می دهیم (می خواهیم داشته باشیم).",
                                ku: "'Os' (Mera) tê bikar anîn dema ku em *ne* di balê de ne. Li vir em karakterên sereke ne ku çalakiyê dikin (dixwazin hebin).",
                                ne: "'Os' (हामीलाई) प्रयोग गरिन्छ जब हामी फोकसमा *हुँदैनौं*। यहाँ हामी कार्य गर्ने मुख्य पात्र हौं (चाहन्छौं)।",
                                ps: "'Os' (موږ ته) هغه وخت کارول کیږي کله چې موږ په تمرکز کې *نه* یو. دلته موږ اصلي کرکټرونه یو چې عمل ترسره کوو (غواړو ولرو)."
                            } 
                        } },
                        { answer: "Det", options: ["Det", "Den", "Dets"], feedback: { 
                            "Den": {
                                da: "Når vi taler generelt om en situation (det er en god aften), bruger vi 'Det'.",
                                en: "When talking generally about a situation (it is a good evening), we use 'Det' (It).",
                                de: "Wenn wir allgemein über eine Situation sprechen (es ist ein guter Abend), verwenden wir 'Det' (Es).",
                                ar: "عند التحدث بشكل عام عن موقف (إنه مساء جيد)، نستخدم 'Det' (إنه).",
                                es: "Cuando hablamos en general sobre una situación (es una buena tarde), usamos 'Det' (Ello/Eso).",
                                fa: "وقتی به طور کلی در مورد یک موقعیت صحبت می کنیم (این یک عصر خوب است)، از 'Det' (آن) استفاده می کنیم.",
                                ku: "Dema ku bi giştî qala rewşekê tê kirin (ev êvarek baş e), em 'Det' bikar tînin.",
                                ne: "कुनै अवस्थाको बारेमा सामान्य कुरा गर्दा (यो राम्रो साँझ हो), हामी 'Det' (यो) प्रयोग गर्छौं।",
                                ps: "کله چې په عمومي ډول د یو وضعیت په اړه خبرې کوو (دا یو ښه ماښام دی)، موږ 'Det' کاروو."
                            }, 
                            "Dets": {
                                da: "'Dets' betyder ejerskab. Vi skal bare bruge 'Det' her.",
                                en: "'Dets' (Its) means ownership. We just need to use 'Det' (It) here.",
                                de: "'Dets' (Dessen) bedeutet Besitz. Wir müssen hier nur 'Det' verwenden.",
                                ar: "تعني 'Dets' (له) الملكية. نحتاج فقط إلى استخدام 'Det' هنا.",
                                es: "'Dets' (Su) significa posesión. Aquí solo necesitamos usar 'Det'.",
                                fa: "'Dets' (مال آن) به معنای مالکیت است. در اینجا فقط باید از 'Det' استفاده کنیم.",
                                ku: "'Dets' (Ya wê) tê wateya xwedîtiyê. Li vir em tenê hewce ne ku 'Det' bikar bînin.",
                                ne: "'Dets' (यसको) को अर्थ स्वामित्व हो। हामीले यहाँ मात्र 'Det' प्रयोग गर्नुपर्छ।",
                                ps: "'Dets' (د هغې) پدې معنی ده چې مالکیت. موږ یوازې دلته 'Det' کارولو ته اړتیا لرو."
                            } 
                        } }
                    ]
                }
            ]
        }
    ],
    objekt: [
        {
            id: 'objekt_set1',
            exercises: [
                {
                    text: "Et besøg. Jeg besøger min ven, Jakob. Jeg kan rigtig godt lide [blank_0]. Han åbner døren. \"Dejligt at se [blank_1]!\" siger han til [blank_2]. Hans søster er der også. Jeg siger hej til [blank_3]. Hun kigger på [blank_4] og smiler. Det blæser meget udenfor, men herinde er der varmt.",
                    blanks: [
                        { answer: "ham", options: ["ham", "han", "hende"], feedback: { 
                            "han": {
                                da: "'han' bruges, når han er i fokus (den der gør noget). Her er handlingen at lide ham (han er *ikke* i fokus), derfor 'ham'.",
                                en: "'han' (he) is used when he is in focus (the one doing something). Here the action is liking him (he is *not* in focus), therefore 'ham' (him).",
                                de: "'han' (er) wird verwendet, wenn er im Fokus steht (derjenige, der etwas tut). Hier ist die Handlung, ihn zu mögen (er steht *nicht* im Fokus), daher 'ham' (ihn).",
                                ar: "تُستخدم 'han' (هو - للفاعل) عندما يكون هو محور التركيز (من يفعل شيئًا). هنا الحدث هو الإعجاب به (هو *ليس* محور التركيز)، لذلك نستخدم 'ham' (هو - للمفعول به).",
                                es: "'han' (él) se usa cuando él es el foco (el que hace algo). Aquí la acción es que te gusta (él *no* es el foco), por lo tanto 'ham' (lo/a él).",
                                fa: "'han' (او - فاعلی) زمانی استفاده می شود که او در کانون توجه است (کسی که کاری انجام می دهد). در اینجا عمل دوست داشتن اوست (او در کانون توجه *نیست*)، بنابراین 'ham' (او - مفعولی) است.",
                                ku: "'han' (ew - kirde) tê bikar anîn dema ku ew di balê de ye (yê ku tiştek dike). Li vir çalakî jê hezkirin e (ew *ne* di balê de ye), ji ber vê yekê 'ham' (wî).",
                                ne: "'han' (ऊ) प्रयोग गरिन्छ जब ऊ फोकसमा हुन्छ (केही गर्ने व्यक्ति)। यहाँ कार्य उसलाई मन पराउनु हो (ऊ फोकसमा *छैन*), त्यसैले 'ham' (उसलाई)।",
                                ps: "'han' (هغه - موضوع) هغه وخت کارول کیږي کله چې هغه په تمرکز کې وي (هغه څوک چې یو څه کوي). دلته عمل د هغه خوښول دي (هغه په تمرکز کې *نه* دی)، نو 'ham' (هغه - څیز)."
                            }, 
                            "hende": {
                                da: "Jakob er en mand, så det skal være 'ham'.",
                                en: "Jakob is a man, so it must be 'ham' (him).",
                                de: "Jakob ist ein Mann, also muss es 'ham' (ihn) sein.",
                                ar: "جاكوب رجل، لذلك يجب أن يكون 'ham' (هو - للمفعول به).",
                                es: "Jakob es un hombre, así que debe ser 'ham' (lo/a él).",
                                fa: "جاکوب یک مرد است، بنابراین باید 'ham' (او - مفعولی) باشد.",
                                ku: "Jakob zilamek e, ji ber vê yekê divê ew 'ham' (wî) be.",
                                ne: "ज्याकोब एक मानिस हो, त्यसैले यो 'ham' (उसलाई) हुनुपर्छ।",
                                ps: "جاکوب یو سړی دی، نو دا باید 'ham' (هغه - څیز) وي."
                            } 
                        } },
                        { answer: "dig", options: ["dig", "du", "mig"], feedback: { 
                            "du": {
                                da: "'du' bruges, når man er i fokus for handlingen. Her er det Jakob, der ser dig (du er *ikke* i fokus), så det er 'dig'.",
                                en: "'du' (you - subject) is used when you are the focus of the action. Here it is Jakob who sees you (you are *not* in focus), so it is 'dig' (you - object).",
                                de: "'du' (du) wird verwendet, wenn man im Mittelpunkt der Handlung steht. Hier ist es Jakob, der dich sieht (du stehst *nicht* im Mittelpunkt), also ist es 'dig' (dich).",
                                ar: "تُستخدم 'du' (أنت - للفاعل) عندما تكون أنت محور الحدث. هنا جاكوب هو من يراك (أنت *لست* محور التركيز)، لذلك نستخدم 'dig' (أنت - للمفعول به).",
                                es: "'du' (tú) se usa cuando uno es el foco de la acción. Aquí es Jakob quien te ve (tú *no* eres el foco), así que es 'dig' (te/a ti).",
                                fa: "'du' (شما - فاعلی) زمانی استفاده می شود که کانون عمل باشید. در اینجا این جاکوب است که شما را می بیند (شما در کانون توجه *نیستید*)، بنابراین 'dig' (شما - مفعولی) است.",
                                ku: "'du' (tu) tê bikar anîn gava ku hûn navenda çalakiyê ne. Li vir ew Jakob e ku we dibîne (hûn *ne* di balê de ne), ji ber vê yekê ew 'dig' (te) e.",
                                ne: "'du' (तपाईं) प्रयोग गरिन्छ जब तपाईं कार्यको फोकस हुनुहुन्छ। यहाँ ज्याकोबले तपाईंलाई देख्छन् (तपाईं फोकसमा *हुनुहुन्न*), त्यसैले यो 'dig' (तपाईंलाई) हो।",
                                ps: "'du' (تاسو - موضوع) هغه وخت کارول کیږي کله چې تاسو د عمل تمرکز یاست. دلته جاکوب دی چې تاسو ګوري (تاسو په تمرکز کې *نه* یاست)، نو دا 'dig' (تاسو - څیز) دی."
                            }, 
                            "mig": {
                                da: "Jakob taler til personen, så han siger 'se dig', ikke 'se mig'.",
                                en: "Jakob is talking to the person, so he says 'se dig' (see you), not 'se mig' (see me).",
                                de: "Jakob spricht mit der Person, also sagt er 'se dig' (dich sehen), nicht 'se mig' (mich sehen).",
                                ar: "جاكوب يتحدث إلى الشخص، لذلك يقول 'se dig' (أراك)، وليس 'se mig' (تراني).",
                                es: "Jakob le habla a la persona, así que dice 'se dig' (verte), no 'se mig' (verme).",
                                fa: "جاکوب با شخص صحبت می کند، بنابراین می گوید 'se dig' (دیدن تو)، نه 'se mig' (دیدن من).",
                                ku: "Jakob bi kes re diaxive, ji ber vê yekê ew dibêje 'se dig' (te bibînim), ne 'se mig' (min bibînim).",
                                ne: "ज्याकोब व्यक्तिसँग कुरा गर्दैछन्, त्यसैले उनी भन्छन् 'se dig' (तिमीलाई देख्नु), 'se mig' (मलाई देख्नु) होइन।",
                                ps: "جاکوب له هغه کس سره خبرې کوي، نو هغه وايي 'se dig' (تاسو وګورئ)، نه 'se mig' (ما وګورئ)."
                            } 
                        } },
                        { answer: "mig", options: ["mig", "jeg", "dig"], feedback: { 
                            "jeg": {
                                da: "Efter små ord som 'til' og 'på' er personen *ikke* i fokus. Derfor hedder det 'mig'.",
                                en: "After small words like 'til' (to) and 'på' (on/at), the person is *not* in focus. Therefore it is 'mig' (me).",
                                de: "Nach kleinen Wörtern wie 'til' (zu) und 'på' (auf/an) steht die Person *nicht* im Fokus. Daher heißt es 'mig' (mich/mir).",
                                ar: "بعد الكلمات الصغيرة مثل 'til' (إلى) و 'på' (على)، لا يكون الشخص محور التركيز. لذلك نستخدم 'mig' (أنا - للمفعول به).",
                                es: "Después de palabras pequeñas como 'til' (a/para) y 'på' (en/sobre), la persona *no* es el foco. Por lo tanto, es 'mig' (mí/me).",
                                fa: "پس از کلمات کوچک مانند 'til' (به) و 'på' (روی/در)، شخص در کانون توجه *نیست*. بنابراین 'mig' (من - مفعولی) است.",
                                ku: "Piştî peyvên piçûk ên mîna 'til' (ji bo) û 'på' (li ser), kes *ne* di balê de ye. Ji ber vê yekê ew 'mig' (min) e.",
                                ne: "साना शब्दहरू जस्तै 'til' (लाई) र 'på' (मा) पछि, व्यक्ति फोकसमा *हुँदैन*। तसर्थ यो 'mig' (मलाई) हो।",
                                ps: "د کوچنیو کلمو لکه 'til' (ته) او 'på' (په) وروسته، شخص په تمرکز کې *نه* دی. نو ځکه دا 'mig' (ما) دی."
                            }, 
                            "dig": {
                                da: "Han taler til fortælleren, så det er 'mig'.",
                                en: "He is talking to the narrator, so it is 'mig' (me).",
                                de: "Er spricht mit dem Erzähler, also ist es 'mig' (mir).",
                                ar: "إنه يتحدث إلى الراوي، لذلك نستخدم 'mig' (أنا - للمفعول به).",
                                es: "Él le habla al narrador, así que es 'mig' (mí/me).",
                                fa: "او با راوی صحبت می کند، بنابراین 'mig' (من) است.",
                                ku: "Ew bi vebêjer re diaxive, ji ber vê yekê ew 'mig' (min) e.",
                                ne: "ऊ कथाकारसँग कुरा गर्दैछ, त्यसैले यो 'mig' (मलाई) हो।",
                                ps: "هغه له راوی سره خبرې کوي، نو دا 'mig' (ما) دی."
                            } 
                        } },
                        { answer: "hende", options: ["hende", "hun", "ham"], feedback: { 
                            "hun": {
                                da: "Efter 'til' er personen *ikke* i fokus. Derfor bruges formen 'hende'.",
                                en: "After 'til' (to), the person is *not* in focus. Therefore, the form 'hende' (her) is used.",
                                de: "Nach 'til' (zu) steht die Person *nicht* im Fokus. Daher wird die Form 'hende' (ihr/sie) verwendet.",
                                ar: "بعد 'til' (إلى)، لا يكون الشخص محور التركيز. لذلك يتم استخدام الصيغة 'hende' (هي - للمفعول به).",
                                es: "Después de 'til' (a/para), la persona *no* es el foco. Por lo tanto, se usa la forma 'hende' (ella - objeto).",
                                fa: "پس از 'til' (به)، شخص در کانون توجه *نیست*. بنابراین، از فرم 'hende' (او - مفعولی) استفاده می شود.",
                                ku: "Piştî 'til' (ji bo), kes *ne* di balê de ye. Ji ber vê yekê, forma 'hende' (wê) tê bikar anîn.",
                                ne: "'til' (लाई) पछि, व्यक्ति फोकसमा *हुँदैन*। तसर्थ, 'hende' (उनलाई) फारम प्रयोग गरिन्छ।",
                                ps: "د 'til' (ته) وروسته، شخص په تمرکز کې *نه* دی. نو ځکه، د 'hende' (هغې ته) بڼه کارول کیږي."
                            }, 
                            "ham": {
                                da: "Søsteren er en kvinde, så det er 'hende', ikke 'ham'.",
                                en: "The sister is a woman, so it is 'hende' (her), not 'ham' (him).",
                                de: "Die Schwester ist eine Frau, also ist es 'hende' (ihr), nicht 'ham' (ihm).",
                                ar: "الأخت امرأة، لذلك نستخدم 'hende' (هي - للمفعول به)، وليس 'ham' (هو - للمفعول به).",
                                es: "La hermana es una mujer, así que es 'hende' (ella - objeto), no 'ham' (él - objeto).",
                                fa: "خواهر یک زن است، بنابراین 'hende' (او - مفعولی) است، نه 'ham' (او - مفعولی مذکر).",
                                ku: "Xwişk jinek e, ji ber vê yekê ew 'hende' (wê) ye, ne 'ham' (wî).",
                                ne: "बहिनी एक महिला हुन्, त्यसैले यो 'hende' (उनलाई) हो, 'ham' (उसलाई) होइन।",
                                ps: "خور یوه ښځه ده، نو دا 'hende' (هغې ته) دی، نه 'ham' (هغه ته)."
                            } 
                        } },
                        { answer: "os", options: ["os", "vi", "jer"], feedback: { 
                            "vi": {
                                da: "Efter 'på' er personerne *ikke* i fokus for handlingen (hun kigger på os). Derfor bruges 'os'.",
                                en: "After 'på' (at), the people are *not* the focus of the action (she looks at us). Therefore 'os' (us) is used.",
                                de: "Nach 'på' (auf/an) stehen die Personen *nicht* im Mittelpunkt der Handlung (sie schaut uns an). Daher wird 'os' (uns) verwendet.",
                                ar: "بعد 'på' (على/في)، لا يكون الأشخاص محور التركيز للحدث (هي تنظر إلينا). لذلك تُستخدم 'os' (نحن - للمفعول به).",
                                es: "Después de 'på' (a/en), las personas *no* son el foco de la acción (ella nos mira). Por lo tanto, se usa 'os' (nos/a nosotros).",
                                fa: "پس از 'på' (به)، افراد کانون عمل *نیستند* (او به ما نگاه می کند). بنابراین از 'os' (ما - مفعولی) استفاده می شود.",
                                ku: "Piştî 'på' (li), mirov *ne* navenda çalakiyê ne (ew li me dinêre). Ji ber vê yekê 'os' (me) tê bikar anîn.",
                                ne: "'på' (मा) पछि, व्यक्तिहरू कार्यको फोकस *हुँदैनन्* (उनी हामीलाई हेर्छिन्)। तसर्थ 'os' (हामीलाई) प्रयोग गरिन्छ।",
                                ps: "د 'på' (په) وروسته، خلک د عمل تمرکز *نه* دي (هغه موږ ته ګوري). نو ځکه 'os' (موږ ته) کارول کیږي."
                            }, 
                            "jer": {
                                da: "Hun kigger på fortælleren og Jakob samlet, så det er 'os'.",
                                en: "She looks at the narrator and Jakob together, so it is 'os' (us).",
                                de: "Sie sieht den Erzähler und Jakob gemeinsam an, also ist es 'os' (uns).",
                                ar: "هي تنظر إلى الراوي وجاكوب معًا، لذلك نستخدم 'os' (نحن - للمفعول به).",
                                es: "Ella mira al narrador y a Jakob juntos, así que es 'os' (nos/a nosotros).",
                                fa: "او به راوی و جاکوب با هم نگاه می کند، بنابراین 'os' (ما) است.",
                                ku: "Ew bi hev re li vebêjer û Jakob dinêre, ji ber vê yekê ew 'os' (me) ye.",
                                ne: "उनी कथाकार र ज्याकोबलाई सँगै हेर्छिन्, त्यसैले यो 'os' (हामीलाई) हो।",
                                ps: "هغه راوي او جاکوب ته په ګډه ګوري، نو دا 'os' (موږ ته) دی."
                            } 
                        } }
                    ]
                }
            ]
        },
        {
            id: 'objekt_set2',
            exercises: [
                {
                    text: "Mor og far køber ind. Jeg hjælper [blank_0] med poserne. Der ligger et æble i posen. Jeg vil gerne spise [blank_1] nu. Mor tager en stor kage frem. Vi skal gemme [blank_2] til i aften. Senere kommer mine venner. Jeg viser kagen til [blank_3]. \"Jeg har en overraskelse til [blank_4],\" siger jeg. De glæder sig.",
                    blanks: [
                        { answer: "dem", options: ["dem", "De", "os"], feedback: { 
                            "De": {
                                da: "'De' bruges, når de er i fokus. Her er det *jeg* der hjælper *dem* (de er ikke i fokus), så vi bruger 'dem'.",
                                en: "'De' (They) is used when they are in focus. Here it is *I* who help *them* (they are not in focus), so we use 'dem' (them).",
                                de: "'De' (Sie) wird verwendet, wenn sie im Fokus stehen. Hier bin *ich* es, der *ihnen* hilft (sie stehen nicht im Fokus), also verwenden wir 'dem' (ihnen).",
                                ar: "تُستخدم 'De' (هم - للفاعل) عندما يكونون محور التركيز. هنا *أنا* من يساعد*هم* (هم ليسوا محور التركيز)، لذلك نستخدم 'dem' (هم - للمفعول به).",
                                es: "'De' (Ellos) se usa cuando son el foco. Aquí soy *yo* quien *les* ayuda (ellos no son el foco), así que usamos 'dem' (les/a ellos).",
                                fa: "'De' (آنها - فاعلی) زمانی استفاده می شود که در کانون توجه باشند. در اینجا *من* هستم که به *آنها* کمک می کنم (آنها در کانون توجه نیستند)، بنابراین از 'dem' (آنها - مفعولی) استفاده می کنیم.",
                                ku: "'De' (Ew) tê bikar anîn dema ku ew di balê de bin. Li vir *ez* im ku alîkariya *wan* dikim (ew ne di balê de ne), ji ber vê yekê em 'dem' (wan) bikar tînin.",
                                ne: "'De' (तिनीहरू) प्रयोग गरिन्छ जब तिनीहरू फोकसमा हुन्छन्। यहाँ *म* हुँ जसले *तिनीहरूलाई* मद्दत गर्छु (तिनीहरू फोकसमा छैनन्), त्यसैले हामी 'dem' (तिनीहरूलाई) प्रयोग गर्छौं।",
                                ps: "'De' (دوی) هغه وخت کارول کیږي کله چې دوی په تمرکز کې وي. دلته دا *زه* یم چې له *دوی* سره مرسته کوم (دوی په تمرکز کې نه دي)، نو موږ 'dem' (دوی ته) کاروو."
                            }, 
                            "os": {
                                da: "Du hjælper mor og far (de andre), så det er 'dem'.",
                                en: "You are helping mom and dad (the others), so it is 'dem' (them).",
                                de: "Du hilfst Mama und Papa (den anderen), also ist es 'dem' (ihnen).",
                                ar: "أنت تساعد أمي وأبي (الآخرين)، لذلك نستخدم 'dem' (هم - للمفعول به).",
                                es: "Estás ayudando a mamá y a papá (los otros), así que es 'dem' (les/a ellos).",
                                fa: "شما به مادر و پدر (دیگران) کمک می کنید، بنابراین 'dem' (آنها) است.",
                                ku: "Hûn alîkariya dayik û bav dikin (yên din), ji ber vê yekê ew 'dem' (wan) e.",
                                ne: "तपाईंले आमा र बुबा (अरू) लाई मद्दत गर्दै हुनुहुन्छ, त्यसैले यो 'dem' (तिनीहरूलाई) हो।",
                                ps: "تاسو د مور او پلار (نورو) سره مرسته کوئ، نو دا 'dem' (دوی ته) دی."
                            } 
                        } },
                        { answer: "det", options: ["det", "den", "dem"], feedback: { 
                            "den": {
                                da: "Ordet er 'et æble' (intetkøn), så vi bruger 'det'.",
                                en: "The word is 'et æble' (neuter gender), so we use 'det' (it).",
                                de: "Das Wort ist 'et æble' (Neutrum), also verwenden wir 'det' (es).",
                                ar: "الكلمة هي 'et æble' (جنس محايد)، لذلك نستخدم 'det'.",
                                es: "La palabra es 'et æble' (género neutro), así que usamos 'det' (ello/lo).",
                                fa: "کلمه 'et æble' (جنسیت خنثی) است، بنابراین ما از 'det' استفاده می کنیم.",
                                ku: "Peyv 'et æble' (zayenda bêteref) e, ji ber vê yekê em 'det' bikar tînin.",
                                ne: "शब्द 'et æble' (नपुंसक लिङ्ग) हो, त्यसैले हामी 'det' प्रयोग गर्छौं।",
                                ps: "کلمه 'et æble' (بې طرفه جنس) ده، نو موږ 'det' کاروو."
                            }, 
                            "dem": {
                                da: "Der er kun ét æble, så det er ental 'det'.",
                                en: "There is only one apple, so it is singular 'det' (it).",
                                de: "Es gibt nur einen Apfel, also ist es Singular 'det' (es).",
                                ar: "يوجد تفاحة واحدة فقط، لذلك نستخدم المفرد 'det'.",
                                es: "Solo hay una manzana, así que es singular 'det' (ello/lo).",
                                fa: "فقط یک سیب وجود دارد، بنابراین مفرد 'det' است.",
                                ku: "Tenê sêvek heye, ji ber vê yekê ew yekjimar 'det' e.",
                                ne: "त्यहाँ एउटा मात्र स्याउ छ, त्यसैले यो एकवचन 'det' हो।",
                                ps: "یوازې یو مڼه شتون لري، نو دا واحد 'det' دی."
                            } 
                        } },
                        { answer: "den", options: ["den", "det", "hende"], feedback: { 
                            "det": {
                                da: "Ordet er 'en kage' (fælleskøn), så vi bruger 'den'.",
                                en: "The word is 'en kage' (common gender), so we use 'den' (it).",
                                de: "Das Wort ist 'en kage' (Utrum), also verwenden wir 'den' (sie).",
                                ar: "الكلمة هي 'en kage' (جنس مشترك)، لذلك نستخدم 'den'.",
                                es: "La palabra es 'en kage' (género común), así que usamos 'den' (ello/la).",
                                fa: "کلمه 'en kage' (جنسیت مشترک) است، بنابراین ما از 'den' استفاده می کنیم.",
                                ku: "Peyv 'en kage' (zayenda hevpar) e, ji ber vê yekê em 'den' bikar tînin.",
                                ne: "शब्द 'en kage' (साझा लिङ्ग) हो, त्यसैले हामी 'den' प्रयोग गर्छौं।",
                                ps: "کلمه 'en kage' (عام جنس) ده، نو موږ 'den' کاروو."
                            }, 
                            "hende": {
                                da: "En kage er en ting, så man bruger 'den', ikke 'hende'.",
                                en: "A cake is a thing, so you use 'den' (it), not 'hende' (her).",
                                de: "Ein Kuchen ist ein Ding, also verwendet man 'den' (sie/es), nicht 'hende' (ihr).",
                                ar: "الكعكة شيء، لذلك تستخدم 'den' وليس 'hende' (هي - للمفعول به).",
                                es: "Un pastel es una cosa, así que usas 'den' (ello/la), no 'hende' (ella - objeto).",
                                fa: "کیک یک چیز است، بنابراین شما از 'den' استفاده می کنید، نه 'hende'.",
                                ku: "Kek tiştek e, ji ber vê yekê hûn 'den' bikar tînin, ne 'hende'.",
                                ne: "केक एउटा चीज हो, त्यसैले तपाईं 'den' प्रयोग गर्नुहुन्छ, 'hende' होइन।",
                                ps: "کیک یو شی دی، نو تاسو 'den' کاروئ، نه 'hende'."
                            } 
                        } },
                        { answer: "dem", options: ["dem", "De", "jer"], feedback: { 
                            "De": {
                                da: "Efter 'til' er personerne *ikke* i fokus. Derfor skal vi bruge 'dem'.",
                                en: "After 'til' (to), the people are *not* in focus. Therefore we must use 'dem' (them).",
                                de: "Nach 'til' (zu) stehen die Personen *nicht* im Fokus. Daher müssen wir 'dem' (ihnen) verwenden.",
                                ar: "بعد 'til' (إلى)، لا يكون الأشخاص محور التركيز. لذلك يجب استخدام 'dem' (هم - للمفعول به).",
                                es: "Después de 'til' (a/para), las personas *no* son el foco. Por lo tanto, debemos usar 'dem' (les/a ellos).",
                                fa: "پس از 'til' (به)، افراد در کانون توجه *نیستند*. بنابراین ما باید از 'dem' (آنها - مفعولی) استفاده کنیم.",
                                ku: "Piştî 'til' (ji bo), mirov *ne* di balê de ne. Ji ber vê yekê divê em 'dem' (wan) bikar bînin.",
                                ne: "'til' (लाई) पछि, व्यक्तिहरू फोकसमा *हुँदैनन्*। तसर्थ हामीले 'dem' (तिनीहरूलाई) प्रयोग गर्नुपर्छ।",
                                ps: "د 'til' (ته) وروسته، خلک په تمرکز کې *نه* دي. نو موږ باید 'dem' (دوی ته) وکاروو."
                            }, 
                            "jer": {
                                da: "Det er vennerne, du viser den til (dem), du snakker ikke til dem i denne sætning.",
                                en: "It is the friends you show it to (them), you are not talking directly to them in this sentence.",
                                de: "Es sind die Freunde, denen du es zeigst (ihnen), du sprichst in diesem Satz nicht direkt mit ihnen.",
                                ar: "إنهم الأصدقاء الذين تعرضها عليهم (هم)، أنت لا تتحدث إليهم مباشرة في هذه الجملة.",
                                es: "Es a los amigos a quienes se lo muestras (a ellos), no les estás hablando directamente en esta oración.",
                                fa: "این دوستان هستند که به آنها نشان می دهید (آنها)، در این جمله مستقیماً با آنها صحبت نمی کنید.",
                                ku: "Ew hevalên ku hûn nîşanî wan didin (wan) e, hûn di vê hevokê de rasterast bi wan re naaxivin.",
                                ne: "यो साथीहरू हुन् जसलाई तपाईंले देखाउनुहुन्छ (तिनीहरूलाई), तपाईंले यस वाक्यमा उनीहरूसँग सीधै कुरा गरिरहनुभएको छैन।",
                                ps: "دا هغه ملګري دي چې تاسو یې دوی ته ښیې (دوی)، تاسو پدې جمله کې مستقیم له دوی سره خبرې نه کوئ."
                            } 
                        } },
                        { answer: "jer", options: ["jer", "I", "os"], feedback: { 
                            "I": {
                                da: "Efter 'til' er de *ikke* i fokus. Derfor skal vi bruge 'jer'.",
                                en: "After 'til' (for/to), they are *not* in focus. Therefore we must use 'jer' (you - plural object).",
                                de: "Nach 'til' (für/zu) stehen sie *nicht* im Fokus. Daher müssen wir 'jer' (euch) verwenden.",
                                ar: "بعد 'til' (لـ / إلى)، لا يكونون محور التركيز. لذلك يجب استخدام 'jer' (أنتم - للمفعول به).",
                                es: "Después de 'til' (para/a), ellos *no* son el foco. Por lo tanto, debemos usar 'jer' (os/a vosotros).",
                                fa: "پس از 'til' (برای/به)، آنها در کانون توجه *نیستند*. بنابراین ما باید از 'jer' (شما - مفعولی جمع) استفاده کنیم.",
                                ku: "Piştî 'til' (ji bo), ew *ne* di balê de ne. Ji ber vê yekê divê em 'jer' (we) bikar bînin.",
                                ne: "'til' (को लागि/लाई) पछि, तिनीहरू फोकसमा *हुँदैनन्*। तसर्थ हामीले 'jer' (तपाईंहरूलाई) प्रयोग गर्नुपर्छ।",
                                ps: "د 'til' (لپاره/ته) وروسته، دوی په تمرکز کې *نه* دي. نو موږ باید 'jer' (تاسو - څیز جمع) وکاروو."
                            }, 
                            "os": {
                                da: "Du taler direkte til vennerne, så det er 'jer'.",
                                en: "You are talking directly to the friends, so it is 'jer' (you - plural object).",
                                de: "Du sprichst direkt zu den Freunden, also ist es 'jer' (euch).",
                                ar: "أنت تتحدث مباشرة إلى الأصدقاء، لذلك نستخدم 'jer' (أنتم - للمفعول به).",
                                es: "Estás hablando directamente a los amigos, así que es 'jer' (os/a vosotros).",
                                fa: "شما مستقیماً با دوستان صحبت می کنید، بنابراین 'jer' (شما - مفعولی جمع) است.",
                                ku: "Hûn rasterast bi hevalan re diaxivin, ji ber vê yekê ew 'jer' (we) ye.",
                                ne: "तपाईंले साथीहरूसँग सीधै कुरा गर्दै हुनुहुन्छ, त्यसैले यो 'jer' (तपाईंहरूलाई) हो।",
                                ps: "تاسو مستقیم ملګرو ته خبرې کوئ، نو دا 'jer' (تاسو - څیز جمع) دی."
                            } 
                        } }
                    ]
                }
            ]
        },
        {
            id: 'objekt_set3',
            exercises: [
                {
                    text: "Det regner meget i dag. Far finder en rød paraply. Han åbner [blank_0]. Han holder paraplyen over [blank_1]. Vi går ned ad gaden. Vi møder to piger fra skolen. De kigger på [blank_2]. Far kender pigerne. Han vinker til [blank_3]. Den ene pige har ingen paraply. Far giver sin paraply til [blank_4]. Han er meget sød.",
                    blanks: [
                        { answer: "den", options: ["den", "det", "ham"], feedback: { 
                            "det": {
                                da: "Ordet er 'en paraply' (fælleskøn), så vi bruger 'den'.",
                                en: "The word is 'en paraply' (common gender), so we use 'den' (it).",
                                de: "Das Wort ist 'en paraply' (Utrum), also verwenden wir 'den' (sie).",
                                ar: "الكلمة هي 'en paraply' (جنس مشترك)، لذلك نستخدم 'den'.",
                                es: "La palabra es 'en paraply' (género común), así que usamos 'den' (ello/la).",
                                fa: "کلمه 'en paraply' (جنسیت مشترک) است، بنابراین ما از 'den' استفاده می کنیم.",
                                ku: "Peyv 'en paraply' (zayenda hevpar) e, ji ber vê yekê em 'den' bikar tînin.",
                                ne: "शब्द 'en paraply' (साझा लिङ्ग) हो, त्यसैले हामी 'den' प्रयोग गर्छौं।",
                                ps: "کلمه 'en paraply' (عام جنس) ده، نو موږ 'den' کاروو."
                            }, 
                            "ham": {
                                da: "Paraplyen er en ting, så vi bruger 'den', ikke 'ham'.",
                                en: "The umbrella is a thing, so we use 'den' (it), not 'ham' (him).",
                                de: "Der Regenschirm ist ein Ding, also verwenden wir 'den' (ihn), nicht 'ham' (ihm/ihn als Person).",
                                ar: "المظلة هي شيء، لذلك نستخدم 'den' وليس 'ham' (هو - للمفعول به).",
                                es: "El paraguas es una cosa, así que usamos 'den' (ello/lo), no 'ham' (él - objeto).",
                                fa: "چتر یک چیز است، بنابراین از 'den' استفاده می کنیم، نه 'ham'.",
                                ku: "Sîwan tiştek e, ji ber vê yekê em 'den' bikar tînin, ne 'ham'.",
                                ne: "छाता एउटा चीज हो, त्यसैले हामी 'den' प्रयोग गर्छौं, 'ham' होइन।",
                                ps: "چترۍ یو شی دی، نو موږ 'den' کاروو، نه 'ham'."
                            } 
                        } },
                        { answer: "mig", options: ["mig", "jeg", "dig"], feedback: { 
                            "jeg": {
                                da: "Efter ord som 'over' er personen *ikke* i fokus for handlingen. Derfor bruges 'mig'.",
                                en: "After words like 'over', the person is *not* in focus for the action. Therefore 'mig' (me) is used.",
                                de: "Nach Wörtern wie 'over' (über) steht die Person *nicht* im Fokus der Handlung. Daher wird 'mig' (mich/mir) verwendet.",
                                ar: "بعد الكلمات مثل 'over' (فوق)، لا يكون الشخص محور التركيز للحدث. لذلك تُستخدم 'mig' (أنا - للمفعول به).",
                                es: "Después de palabras como 'over' (sobre), la persona *no* es el foco de la acción. Por lo tanto, se usa 'mig' (mí/me).",
                                fa: "پس از کلماتی مانند 'over' (بالای)، شخص در کانون عمل *نیست*. بنابراین از 'mig' (من - مفعولی) استفاده می شود.",
                                ku: "Piştî peyvên mîna 'over' (li ser), kes *ne* navenda çalakiyê ye. Ji ber vê yekê 'mig' (min) tê bikar anîn.",
                                ne: "'over' (माथि) जस्ता शब्दहरू पछि, व्यक्ति कार्यको लागि फोकसमा *हुँदैन*। तसर्थ 'mig' (मलाई) प्रयोग गरिन्छ।",
                                ps: "د 'over' (دپاسه) په څیر کلمو وروسته، شخص د عمل لپاره تمرکز *نه* دی. نو ځکه 'mig' (ما) کارول کیږي."
                            }, 
                            "dig": {
                                da: "Far holder den over fortælleren, altså 'mig'.",
                                en: "Dad holds it over the narrator, meaning 'mig' (me).",
                                de: "Papa hält ihn über den Erzähler, also 'mig' (mich/mir).",
                                ar: "الأب يمسكها فوق الراوي، أي 'mig' (أنا - للمفعول به).",
                                es: "Papá lo sostiene sobre el narrador, es decir, 'mig' (mí/me).",
                                fa: "پدر آن را بالای راوی نگه می دارد، به این معنی که 'mig' (من).",
                                ku: "Bav wê li ser vebêjer digire, tê wateya 'mig' (min).",
                                ne: "बुबाले यसलाई कथाकारमाथि राख्नुहुन्छ, जसको अर्थ 'mig' (मलाई) हो।",
                                ps: "پلار یې د راوي په سر نیسي، په معنی 'mig' (ما)."
                            } 
                        } },
                        { answer: "os", options: ["os", "vi", "dem"], feedback: { 
                            "vi": {
                                da: "Efter 'på' er personerne *ikke* i fokus (pigerne kigger på *os*). Derfor bruges 'os'.",
                                en: "After 'på' (at), the people are *not* in focus (the girls look at *us*). Therefore 'os' (us) is used.",
                                de: "Nach 'på' (auf/an) stehen die Personen *nicht* im Fokus (die Mädchen schauen *uns* an). Daher wird 'os' (uns) verwendet.",
                                ar: "بعد 'på' (على/في)، لا يكون الأشخاص محور التركيز (الفتيات ينظرن إلي*نا*). لذلك تُستخدم 'os' (نحن - للمفعول به).",
                                es: "Después de 'på' (a/en), las personas *no* son el foco (las chicas *nos* miran). Por lo tanto, se usa 'os' (nos/a nosotros).",
                                fa: "پس از 'på' (به)، افراد در کانون توجه *نیستند* (دختران به *ما* نگاه می کنند). بنابراین از 'os' (ما - مفعولی) استفاده می شود.",
                                ku: "Piştî 'på' (li), mirov *ne* di balê de ne (keç li *me* dinêrin). Ji ber vê yekê 'os' (me) tê bikar anîn.",
                                ne: "'på' (मा) पछि, व्यक्तिहरू फोकसमा *हुँदैनन्* (केटीहरूले *हामीलाई* हेर्छन्)। तसर्थ 'os' (हामीलाई) प्रयोग गरिन्छ।",
                                ps: "د 'på' (په) وروسته، خلک په تمرکز کې *نه* دي (نجونې موږ ته ګوري). نو ځکه 'os' (موږ ته) کارول کیږي."
                            }, 
                            "dem": {
                                da: "De kigger på far og fortælleren, altså 'os'.",
                                en: "They look at dad and the narrator, meaning 'os' (us).",
                                de: "Sie schauen Papa und den Erzähler an, also 'os' (uns).",
                                ar: "إنهن ينظرن إلى الأب والراوي، أي 'os' (نحن - للمفعول به).",
                                es: "Ellas miran a papá y al narrador, es decir, 'os' (nos/a nosotros).",
                                fa: "آنها به پدر و راوی نگاه می کنند، به این معنی که 'os' (ما).",
                                ku: "Ew li bav û vebêjer dinêrin, tê wateya 'os' (me).",
                                ne: "तिनीहरू बुबा र कथाकारलाई हेर्छन्, जसको अर्थ 'os' (हामीलाई) हो।",
                                ps: "دوی پلار او راوي ته ګوري، په معنی 'os' (موږ ته)."
                            } 
                        } },
                        { answer: "dem", options: ["dem", "De", "jer"], feedback: { 
                            "De": {
                                da: "Efter 'til' er pigerne *ikke* i fokus. Derfor bruges 'dem'.",
                                en: "After 'til' (to), the girls are *not* in focus. Therefore 'dem' (them) is used.",
                                de: "Nach 'til' (zu) stehen die Mädchen *nicht* im Fokus. Daher wird 'dem' (ihnen) verwendet.",
                                ar: "بعد 'til' (إلى)، لا تكون الفتيات محور التركيز. لذلك تُستخدم 'dem' (هم - للمفعول به).",
                                es: "Después de 'til' (a/para), las chicas *no* son el foco. Por lo tanto, se usa 'dem' (les/a ellas).",
                                fa: "پس از 'til' (به)، دختران در کانون توجه *نیستند*. بنابراین از 'dem' (آنها - مفعولی) استفاده می شود.",
                                ku: "Piştî 'til' (ji bo), keç *ne* di balê de ne. Ji ber vê yekê 'dem' (wan) tê bikar anîn.",
                                ne: "'til' (लाई) पछि, केटीहरू फोकसमा *हुँदैनन्*। तसर्थ 'dem' (तिनीहरूलाई) प्रयोग गरिन्छ।",
                                ps: "د 'til' (ته) وروسته، نجونې په تمرکز کې *نه* دي. نو ځکه 'dem' (دوی ته) کارول کیږي."
                            }, 
                            "jer": {
                                da: "Far vinker til pigerne, ikke til nogen han snakker direkte til.",
                                en: "Dad waves to the girls, not to someone he is talking directly to.",
                                de: "Papa winkt den Mädchen zu, nicht jemandem, mit dem er direkt spricht.",
                                ar: "يُلوح الأب للفتيات، وليس لشخص يتحدث إليه مباشرة.",
                                es: "Papá saluda a las chicas, no a alguien a quien le está hablando directamente.",
                                fa: "پدر برای دختران دست تکان می دهد، نه به کسی که مستقیماً با او صحبت می کند.",
                                ku: "Bav ji keçan re destê xwe dihejîne, ne ji kesê ku ew rasterast bi wî re diaxive.",
                                ne: "बुबाले केटीहरूलाई हात हल्लाउनुहुन्छ, सीधै कुरा गरिरहेको व्यक्तिलाई होइन।",
                                ps: "پلار نجونو ته لاس خوځوي، نه هغه چا ته چې هغه ورسره مستقیم خبرې کوي."
                            } 
                        } },
                        { answer: "hende", options: ["hende", "hun", "ham"], feedback: { 
                            "hun": {
                                da: "Efter 'til' er personen *ikke* i fokus. Derfor bruges 'hende'.",
                                en: "After 'til' (to), the person is *not* in focus. Therefore 'hende' (her) is used.",
                                de: "Nach 'til' (zu) steht die Person *nicht* im Fokus. Daher wird 'hende' (ihr) verwendet.",
                                ar: "بعد 'til' (إلى)، لا يكون الشخص محور التركيز. لذلك تُستخدم 'hende' (هي - للمفعول به).",
                                es: "Después de 'til' (a/para), la persona *no* es el foco. Por lo tanto, se usa 'hende' (ella - objeto).",
                                fa: "پس از 'til' (به)، شخص در کانون توجه *نیست*. بنابراین از 'hende' (او - مفعولی) استفاده می شود.",
                                ku: "Piştî 'til' (ji bo), kes *ne* di balê de ye. Ji ber vê yekê 'hende' (wê) tê bikar anîn.",
                                ne: "'til' (लाई) पछि, व्यक्ति फोकसमा *हुँदैन*। तसर्थ 'hende' (उनलाई) प्रयोग गरिन्छ।",
                                ps: "د 'til' (ته) وروسته، شخص په تمرکز کې *نه* دی. نو ځکه 'hende' (هغې ته) کارول کیږي."
                            }, 
                            "ham": {
                                da: "Det er en pige, så vi bruger formen 'hende'.",
                                en: "It is a girl, so we use the form 'hende' (her).",
                                de: "Es ist ein Mädchen, also verwenden wir die Form 'hende' (ihr).",
                                ar: "إنها فتاة، لذلك نستخدم الصيغة 'hende' (هي - للمفعول به).",
                                es: "Es una chica, así que usamos la forma 'hende' (ella - objeto).",
                                fa: "این یک دختر است، بنابراین از شکل 'hende' (او - مفعولی) استفاده می کنیم.",
                                ku: "Ew keçek e, ji ber vê yekê em forma 'hende' (wê) bikar tînin.",
                                ne: "यो एउटी केटी हो, त्यसैले हामी 'hende' (उनलाई) फारम प्रयोग गर्छौं।",
                                ps: "دا یوه نجلۍ ده، نو موږ د 'hende' (هغې ته) بڼه کاروو."
                            } 
                        } }
                    ]
                }
            ]
        }
    ],
    possessiv: [
        {
            id: 'possessiv_set1',
            exercises: [
                {
                    text: "Peter er kok på en restaurant. [blank_0] mad er meget populær. Han har en hvid hat. \"Hvor er [blank_1] store kniv?\" spørger han. Han kigger på bordet. \"[blank_2] skærebræt ligger her,\" siger han glad. Tjeneren kommer ud i køkkenet. \"Gæsterne er glade. [blank_3] suppe smager dejligt,\" siger tjeneren.",
                    blanks: [
                        { answer: "Hans", options: ["Hans", "Hendes", "Han"], feedback: { 
                            "Hendes": {
                                da: "Peter er en mand, så det er 'Hans'.",
                                en: "Peter is a man, so it is 'Hans' (His).",
                                de: "Peter ist ein Mann, also ist es 'Hans' (Sein).",
                                ar: "بيتر رجل، لذلك نستخدم 'Hans' (له).",
                                es: "Peter es un hombre, así que es 'Hans' (Su - de él).",
                                fa: "پیتر یک مرد است، بنابراین 'Hans' (مال او) است.",
                                ku: "Peter zilamek e, ji ber vê yekê ew 'Hans' (Yê wî) ye.",
                                ne: "पिटर एक मानिस हो, त्यसैले यो 'Hans' (उसको) हो।",
                                ps: "پیټر یو سړی دی، نو دا 'Hans' (د هغه) دی."
                            }, 
                            "Han": {
                                da: "Vi skal vise hvem maden tilhører (ejerskab), så vi bruger 'Hans'.",
                                en: "We need to show who the food belongs to (ownership), so we use 'Hans' (His).",
                                de: "Wir müssen zeigen, wem das Essen gehört (Besitz), also verwenden wir 'Hans' (Sein).",
                                ar: "نحتاج إلى إظهار لمن ينتمي الطعام (الملكية)، لذلك نستخدم 'Hans' (له).",
                                es: "Necesitamos mostrar a quién pertenece la comida (propiedad), así que usamos 'Hans' (Su - de él).",
                                fa: "ما باید نشان دهیم که غذا به چه کسی تعلق دارد (مالکیت)، بنابراین از 'Hans' استفاده می کنیم.",
                                ku: "Pêdivî ye ku em nîşan bidin ku xwarin a kê ye (xwedîtî), ji ber vê yekê em 'Hans' bikar tînin.",
                                ne: "हामीले खाना कसको हो भनेर देखाउनु पर्छ (स्वामित्व), त्यसैले हामी 'Hans' प्रयोग गर्छौं।",
                                ps: "موږ باید وښیو چې خواړه د چا دي (مالکیت)، نو موږ 'Hans' کاروو.",
                                pt: "Precisamos mostrar a quem pertence a comida (propriedade), então usamos 'Hans'.",
                                ru: "Нам нужно показать, кому принадлежит еда (собственность), поэтому мы используем 'Hans'.",
                                th: "เราต้องแสดงว่าใครเป็นเจ้าของอาหาร ดังนั้นเราจึงใช้ 'Hans'",
                                tr: "Yemeğin kime ait olduğunu (sahiplik) göstermeliyiz, bu yüzden 'Hans' kullanıyoruz.",
                                uk: "Нам потрібно показати, кому належить їжа (приналежність), тому ми використовуємо 'Hans'.",
                                ur: "ہمیں یہ بتانا ہے کہ کھانا کس کا ہے (ملکیت)، اس لیے ہم 'Hans' استعمال کرتے ہیں۔",
                                vi: "Chúng ta cần chỉ ra thức ăn thuộc về ai (quyền sở hữu), vì vậy chúng ta dùng 'Hans'.",
                                zh: "我们需要指明食物的主人（所有权），所以我们用 'Hans' (他的)。"
                            } 
                        } },
                        { answer: "min", options: ["min", "mit", "mig"], feedback: { 
                            "mit": {
                                da: "Ordet er 'en kniv' (fælleskøn), så det hedder 'min'.",
                                en: "The word is 'en kniv' (common gender), so it is 'min' (my).",
                                de: "Das Wort ist 'en kniv' (Utrum), also heißt es 'min' (mein/meine).",
                                ar: "الكلمة هي 'en kniv' (جنس مشترك)، لذلك نستخدم 'min' (لي).",
                                es: "La palabra es 'en kniv' (género común), así que es 'min' (mi).",
                                fa: "کلمه 'en kniv' (جنسیت مشترک) است، بنابراین 'min' (مال من) است.",
                                ku: "Peyv 'en kniv' (zayenda hevpar) e, ji ber vê yekê ew 'min' e.",
                                ne: "शब्द 'en kniv' (साझा लिङ्ग) हो, त्यसैले यो 'min' (मेरो) हो।",
                                ps: "کلمه 'en kniv' (عام جنس) ده، نو دا 'min' (زما) دی.",
                                pt: "A palavra é 'en kniv' (gênero comum), então é 'min'.",
                                ru: "Слово 'en kniv' (общий род), поэтому это 'min'.",
                                th: "คำว่า 'en kniv' (เพศรวม) ดังนั้นจึงเป็น 'min'",
                                tr: "Kelime 'en kniv' (ortak cinsiyet), bu yüzden 'min'.",
                                uk: "Слово 'en kniv' (спільний рід), тому воно звучить як 'min'.",
                                ur: "لفظ 'en kniv' (مشترک جنس) ہے، اس لیے اسے 'min' کہا جاتا ہے۔",
                                vi: "Từ này là 'en kniv' (giống chung), vì vậy nó là 'min'.",
                                zh: "这个词是 'en kniv' (通性)，所以是 'min' (我的)。"
                            }, 
                            "mig": {
                                da: "'mig' bruges når personen *ikke* er i fokus. Her skal vi vise, hvem kniven tilhører (min).",
                                en: "'mig' (me) is used when the person is *not* in focus. Here we need to show who the knife belongs to (min).",
                                de: "'mig' (mich/mir) wird verwendet, wenn die Person *nicht* im Fokus steht. Hier müssen wir zeigen, wem das Messer gehört (min - mein).",
                                ar: "تُستخدم 'mig' (أنا - للمفعول به) عندما لا يكون الشخص محور التركيز. هنا نحتاج إلى إظهار لمن تنتمي السكين (min - لي).",
                                es: "'mig' (mí/me) se usa cuando la persona *no* es el foco. Aquí necesitamos mostrar a quién pertenece el cuchillo (min - mi).",
                                fa: "'mig' زمانی استفاده می شود که شخص در کانون توجه *نیست*. در اینجا باید نشان دهیم که چاقو متعلق به چه کسی است (min).",
                                ku: "'mig' (min) tê bikar anîn dema ku kes *ne* di balê de ye. Li vir divê em nîşan bidin ka kêr ya kê ye (min).",
                                ne: "'mig' प्रयोग गरिन्छ जब व्यक्ति फोकसमा *हुँदैन*। यहाँ हामीले चक्कु कसको हो भनेर देखाउनु पर्छ (min)।",
                                ps: "'mig' هغه وخت کارول کیږي کله چې شخص په تمرکز کې *نه* وي. دلته موږ باید وښیو چې چاقو د چا ده (min).",
                                pt: "'mig' é usado quando a pessoa *não* é o foco. Aqui precisamos mostrar a quem pertence a faca.",
                                ru: "'mig' используется, когда человек *не* в фокусе. Здесь нам нужно показать, кому принадлежит нож.",
                                th: "'mig' ใช้เมื่อบุคคล *ไม่ได้* เป็นจุดสนใจ ที่นี่เราต้องแสดงว่าใครเป็นเจ้าของมีด",
                                tr: "'mig', kişi odakta *olmadığında* kullanılır. Burada bıçağın kime ait olduğunu göstermeliyiz.",
                                uk: "'mig' використовується, коли людина *не* в центрі уваги. Тут нам потрібно показати, кому належить ніж (мій).",
                                ur: "'mig' استعمال ہوتا ہے جب شخص توجہ کا مرکز *نہیں* ہوتا۔ یہاں ہمیں یہ بتانا ہے کہ چاقو کس کا ہے (میرا)۔",
                                vi: "'mig' được dùng khi người đó *không* phải là trọng tâm. Ở đây chúng ta cần chỉ ra con dao thuộc về ai (của tôi).",
                                zh: "当人*不*是焦点时使用 'mig' (我-宾格)。这里我们需要指明刀属于谁（我的）。"
                            } 
                        } },
                        { answer: "Mit", options: ["Mit", "Min", "Jeg"], feedback: { 
                            "Min": {
                                da: "Ordet er 'et skærebræt' (intetkøn), så det hedder 'Mit'.",
                                en: "The word is 'et skærebræt' (neuter gender), so it is 'Mit' (My).",
                                de: "Das Wort ist 'et skærebræt' (Neutrum), also heißt es 'Mit' (Mein).",
                                ar: "الكلمة هي 'et skærebræt' (جنس محايد)، لذلك نستخدم 'Mit' (لي).",
                                es: "La palabra es 'et skærebræt' (género neutro), así que es 'Mit' (Mi).",
                                fa: "کلمه 'et skærebræt' (جنسیت خنثی) است، بنابراین 'Mit' (مال من) است.",
                                ku: "Peyv 'et skærebræt' (zayenda bêteref) e, ji ber vê yekê ew 'Mit' e.",
                                ne: "शब्द 'et skærebræt' (नपुंसक लिङ्ग) हो, त्यसैले यो 'Mit' (मेरो) हो।",
                                ps: "کلمه 'et skærebræt' (بې طرفه جنس) ده، نو دا 'Mit' (زما) دی.",
                                pt: "A palavra é 'et skærebræt' (gênero neutro), então é 'Mit'.",
                                ru: "Слово 'et skærebræt' (средний род), поэтому это 'Mit'.",
                                th: "คำว่า 'et skærebræt' (เพศเป็นกลาง) ดังนั้นจึงเป็น 'Mit'",
                                tr: "Kelime 'et skærebræt' (nötr cinsiyet), bu yüzden 'Mit'.",
                                uk: "Слово 'et skærebræt' (середній рід), тому воно звучить як 'Mit'.",
                                ur: "لفظ 'et skærebræt' (غیر جانبدار جنس) ہے، اس لیے اسے 'Mit' کہا جاتا ہے۔",
                                vi: "Từ này là 'et skærebræt' (giống trung), vì vậy nó là 'Mit'.",
                                zh: "这个词是 'et skærebræt' (中性)，所以是 'Mit' (我的)。"
                            }, 
                            "Jeg": {
                                da: "Her er skærebrættet i fokus. Vi skal vise, hvem der ejer det, så vi bruger 'Mit'.",
                                en: "Here the cutting board is in focus. We need to show who owns it, so we use 'Mit' (My).",
                                de: "Hier steht das Schneidebrett im Fokus. Wir müssen zeigen, wer es besitzt, also verwenden wir 'Mit' (Mein).",
                                ar: "هنا لوح التقطيع هو محور التركيز. نحتاج إلى إظهار من يمتلكه، لذلك نستخدم 'Mit' (لي).",
                                es: "Aquí la tabla de cortar es el foco. Necesitamos mostrar a quién pertenece, así que usamos 'Mit' (Mi).",
                                fa: "در اینجا تخته برش در کانون توجه است. ما باید نشان دهیم که چه کسی مالک آن است، بنابراین از 'Mit' استفاده می کنیم.",
                                ku: "Li vir tabloya qutkirinê di balê de ye. Pêdivî ye ku em nîşan bidin ka kê xwediyê wê ye, ji ber vê yekê em 'Mit' bikar tînin.",
                                ne: "यहाँ काट्ने बोर्ड फोकसमा छ। हामीले यसको स्वामित्व कसको छ भनेर देखाउनु पर्छ, त्यसैले हामी 'Mit' प्रयोग गर्छौं।",
                                ps: "دلته د پرې کولو تخته په تمرکز کې ده. موږ باید وښیو چې د چا مالکیت لري، نو موږ 'Mit' کاروو."
                            } 
                        } },
                        { answer: "Vores", options: ["Vores", "Jeres", "Vi"], feedback: { 
                            "Jeres": {
                                da: "Tjeneren inkluderer sig selv i restaurantens mad, så 'Vores'.",
                                en: "The waiter includes themselves in the restaurant's food, so 'Vores' (Our).",
                                de: "Der Kellner schließt sich selbst in das Essen des Restaurants ein, also 'Vores' (Unser).",
                                ar: "يدرج النادل نفسه في طعام المطعم، لذلك نستخدم 'Vores' (لنا).",
                                es: "El camarero se incluye a sí mismo en la comida del restaurante, así que 'Vores' (Nuestro).",
                                fa: "پیشخدمت خود را در غذای رستوران شریک می داند، بنابراین 'Vores' (مال ما) است.",
                                ku: "Garson xwe di xwarina xwaringehê de vedihewîne, ji ber vê yekê 'Vores' (Yê me).",
                                ne: "वेटरले आफूलाई रेस्टुरेन्टको खानामा समावेश गर्दछ, त्यसैले 'Vores' (हाम्रो)।",
                                ps: "ویټر ځان د رستورانت په خواړو کې شاملوي، نو 'Vores' (زموږ)."
                            }, 
                            "Vi": {
                                da: "Vi skal vise, hvem suppen tilhører (ejerskab), så vi bruger 'Vores'.",
                                en: "We need to show who the soup belongs to (ownership), so we use 'Vores' (Our).",
                                de: "Wir müssen zeigen, wem die Suppe gehört (Besitz), also verwenden wir 'Vores' (Unsere).",
                                ar: "نحتاج إلى إظهار لمن ينتمي الحساء (الملكية)، لذلك نستخدم 'Vores' (لنا).",
                                es: "Necesitamos mostrar a quién pertenece la sopa (propiedad), así que usamos 'Vores' (Nuestra).",
                                fa: "ما باید نشان دهیم که سوپ به چه کسی تعلق دارد (مالکیت)، بنابراین از 'Vores' استفاده می کنیم.",
                                ku: "Pêdivî ye ku em nîşan bidin ku şorbe a kê ye (xwedîtî), ji ber vê yekê em 'Vores' bikar tînin.",
                                ne: "हामीले सूप कसको हो भनेर देखाउनु पर्छ (स्वामित्व), त्यसैले हामी 'Vores' प्रयोग गर्छौं।",
                                ps: "موږ باید وښیو چې سوپ د چا دی (مالکیت)، نو موږ 'Vores' کاروو."
                            } 
                        } }
                    ]
                }
            ]
        },
        {
            id: 'possessiv_set2',
            exercises: [
                {
                    text: "Lars kører ud med mad. [blank_0] cykel er hurtig. Han ringer på en dør. En mand åbner. \"Her er [blank_1] pizza,\" siger Lars. Manden betaler. \"Husk [blank_2] drikkevarer,\" siger Lars. En dame står også i døren. \"Er maden varm?\" spørger hun. \"Ja, [blank_3] mad er meget varm,\" svarer Lars med et smil.",
                    blanks: [
                        { answer: "Hans", options: ["Hans", "Hendes", "Han"], feedback: { 
                            "Hendes": {
                                da: "Lars er en mand, så det er 'Hans'.",
                                en: "Lars is a man, so it is 'Hans' (His).",
                                de: "Lars ist ein Mann, also ist es 'Hans' (Sein).",
                                ar: "لارس رجل، لذلك نستخدم 'Hans' (له).",
                                es: "Lars es un hombre, así que es 'Hans' (Su - de él).",
                                fa: "لارس یک مرد است، بنابراین 'Hans' (مال او) است.",
                                ku: "Lars zilamek e, ji ber vê yekê ew 'Hans' (Yê wî) ye.",
                                ne: "लार्स एक मानिस हो, त्यसैले यो 'Hans' (उसको) हो।",
                                ps: "لارس یو سړی دی، نو دا 'Hans' (د هغه) دی."
                            }, 
                            "Han": {
                                da: "Vi skal vise hvem cyklen tilhører (ejerskab), så vi bruger 'Hans'.",
                                en: "We need to show who the bike belongs to (ownership), so we use 'Hans' (His).",
                                de: "Wir müssen zeigen, wem das Fahrrad gehört (Besitz), also verwenden wir 'Hans' (Sein).",
                                ar: "نحتاج إلى إظهار لمن تنتمي الدراجة (الملكية)، لذلك نستخدم 'Hans' (له).",
                                es: "Necesitamos mostrar a quién pertenece la bicicleta (propiedad), así que usamos 'Hans' (Su - de él).",
                                fa: "ما باید نشان دهیم که دوچرخه متعلق به چه کسی است (مالکیت)، بنابراین از 'Hans' استفاده می کنیم.",
                                ku: "Pêdivî ye ku em nîşan bidin ku bîsîklet a kê ye (xwedîtî), ji ber vê yekê em 'Hans' bikar tînin.",
                                ne: "हामीले साइकल कसको हो भनेर देखाउनु पर्छ (स्वामित्व), त्यसैले हामी 'Hans' प्रयोग गर्छौं।",
                                ps: "موږ باید وښیو چې بایسکل د چا دی (مالکیت)، نو موږ 'Hans' کاروو."
                            } 
                        } },
                        { answer: "din", options: ["din", "dit", "du"], feedback: { 
                            "dit": {
                                da: "Ordet er 'en pizza' (fælleskøn), så det hedder 'din'.",
                                en: "The word is 'en pizza' (common gender), so it is 'din' (your).",
                                de: "Das Wort ist 'en pizza' (Utrum), also heißt es 'din' (deine).",
                                ar: "الكلمة هي 'en pizza' (جنس مشترك)، لذلك نستخدم 'din' (لك).",
                                es: "La palabra es 'en pizza' (género común), así que es 'din' (tu).",
                                fa: "کلمه 'en pizza' (جنسیت مشترک) است، بنابراین 'din' (مال شما) است.",
                                ku: "Peyv 'en pizza' (zayenda hevpar) e, ji ber vê yekê ew 'din' e.",
                                ne: "शब्द 'en pizza' (साझा लिङ्ग) हो, त्यसैले यो 'din' (तपाईंको) हो।",
                                ps: "کلمه 'en pizza' (عام جنس) ده، نو دا 'din' (ستاسو) دی."
                            }, 
                            "du": {
                                da: "Her skal vi vise hvem pizzaen tilhører, så vi bruger ejefaldet 'din'.",
                                en: "Here we need to show who the pizza belongs to, so we use the possessive 'din' (your).",
                                de: "Hier müssen wir zeigen, wem die Pizza gehört, also verwenden wir das Possessivpronomen 'din' (deine).",
                                ar: "هنا نحتاج إلى إظهار لمن تنتمي البيتزا، لذلك نستخدم ضمير الملكية 'din' (لك).",
                                es: "Aquí necesitamos mostrar a quién pertenece la pizza, así que usamos el posesivo 'din' (tu).",
                                fa: "در اینجا باید نشان دهیم که پیتزا به چه کسی تعلق دارد، بنابراین از مالکیت 'din' استفاده می کنیم.",
                                ku: "Li vir divê em nîşan bidin ka pîzza ya kê ye, ji ber vê yekê em formê xwedîtiyê 'din' bikar tînin.",
                                ne: "यहाँ हामीले पिज्जा कसको हो भनेर देखाउनु पर्छ, त्यसैले हामी स्वामित्व 'din' प्रयोग गर्छौं।",
                                ps: "دلته موږ باید وښیو چې پیزا د چا ده، نو موږ ملکیت 'din' کاروو."
                            } 
                        } },
                        { answer: "dine", options: ["dine", "din", "dig"], feedback: { 
                            "din": {
                                da: "Drikkevarer er i flertal, så det bøjes til 'dine'.",
                                en: "Drinks (Drikkevarer) are plural, so it is conjugated to 'dine' (your).",
                                de: "Getränke (Drikkevarer) stehen im Plural, also wird es zu 'dine' (deine) gebeugt.",
                                ar: "المشروبات (Drikkevarer) جمع، لذلك تُصرف إلى 'dine' (لكم).",
                                es: "Bebidas (Drikkevarer) es plural, así que se conjuga a 'dine' (tus).",
                                fa: "نوشیدنی ها (Drikkevarer) جمع هستند، بنابراین به 'dine' (شما) تبدیل می شود.",
                                ku: "Vexwarin (Drikkevarer) pirjimar in, ji ber vê yekê ew bi 'dine' tê kişandin.",
                                ne: "पेयहरू (Drikkevarer) बहुवचन हुन्, त्यसैले यो 'dine' (तपाईंको) मा संयोजित हुन्छ।",
                                ps: "څښاکونه (Drikkevarer) جمع دي، نو دا 'dine' (ستاسو) ته بدل کیږي."
                            }, 
                            "dig": {
                                da: "'dig' bruges når personen *ikke* er i fokus. Her skal vi vise hvem der ejer drikkevarerne (dine).",
                                en: "'dig' (you - object) is used when the person is *not* in focus. Here we need to show who owns the drinks (dine - your).",
                                de: "'dig' (dich) wird verwendet, wenn die Person *nicht* im Fokus steht. Hier müssen wir zeigen, wer die Getränke besitzt (dine - deine).",
                                ar: "تُستخدم 'dig' (أنت - للمفعول به) عندما لا يكون الشخص محور التركيز. هنا نحتاج إلى إظهار من يمتلك المشروبات (dine - لك).",
                                es: "'dig' (te/a ti) se usa cuando la persona *no* es el foco. Aquí necesitamos mostrar a quién pertenecen las bebidas (dine - tus).",
                                fa: "'dig' زمانی استفاده می شود که شخص در کانون توجه *نیست*. در اینجا ما باید نشان دهیم که چه کسی صاحب نوشیدنی ها است (dine).",
                                ku: "'dig' tê bikar anîn dema ku kes *ne* di balê de ye. Li vir divê em nîşan bidin kî xwediyê vexwarinan e (dine).",
                                ne: "'dig' प्रयोग गरिन्छ जब व्यक्ति फोकसमा *हुँदैन*। यहाँ हामीले पेय पदार्थको मालिक को हो भनेर देखाउनु पर्छ (dine)।",
                                ps: "'dig' هغه وخت کارول کیږي کله چې شخص په تمرکز کې *نه* وي. دلته موږ باید وښیو چې د څښاک مالک څوک دی (dine)."
                            } 
                        } },
                        { answer: "jeres", options: ["jeres", "vores", "I"], feedback: { 
                            "vores": {
                                da: "Lars taler til manden og damen (2. person flertal), så 'jeres'.",
                                en: "Lars is talking to the man and the woman (2nd person plural), so 'jeres' (your).",
                                de: "Lars spricht mit dem Mann und der Frau (2. Person Plural), also 'jeres' (euer/eure).",
                                ar: "لارس يتحدث إلى الرجل والمرأة (ضمير المخاطب للجمع)، لذلك نستخدم 'jeres' (لكم).",
                                es: "Lars le habla al hombre y a la mujer (2ª persona del plural), así que 'jeres' (vuestro/su).",
                                fa: "لارس با مرد و زن (دوم شخص جمع) صحبت می کند، بنابراین 'jeres' (شما) است.",
                                ku: "Lars bi mêr û jinê re diaxive (kesê duyemîn pirjimar), ji ber vê yekê 'jeres' (yê we).",
                                ne: "लार्स मानिस र महिलासँग कुरा गर्दैछन् (दोस्रो व्यक्ति बहुवचन), त्यसैले 'jeres' (तपाईंहरूको)।",
                                ps: "لارس سړي او ښځې ته خبرې کوي (دوهم شخص جمع)، نو 'jeres' (ستاسو)."
                            }, 
                            "I": {
                                da: "Vi skal vise hvem maden tilhører (ejerskab), så vi bruger 'jeres'.",
                                en: "We need to show who the food belongs to (ownership), so we use 'jeres' (your).",
                                de: "Wir müssen zeigen, wem das Essen gehört (Besitz), also verwenden wir 'jeres' (euer/eure).",
                                ar: "نحتاج إلى إظهار لمن ينتمي الطعام (الملكية)، لذلك نستخدم 'jeres' (لكم).",
                                es: "Necesitamos mostrar a quién pertenece la comida (propiedad), así que usamos 'jeres' (vuestro/su).",
                                fa: "ما باید نشان دهیم که غذا به چه کسی تعلق دارد (مالکیت)، بنابراین از 'jeres' استفاده می کنیم.",
                                ku: "Pêdivî ye ku em nîşan bidin ku xwarin a kê ye (xwedîtî), ji ber vê yekê em 'jeres' bikar tînin.",
                                ne: "हामीले खाना कसको हो भनेर देखाउनु पर्छ (स्वामित्व), त्यसैले हामी 'jeres' प्रयोग गर्छौं।",
                                ps: "موږ باید وښیو چې خواړه د چا دي (مالکیت)، نو موږ 'jeres' کاروو."
                            } 
                        } }
                    ]
                }
            ]
        }
    ]
};
