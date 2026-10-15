import { getTranslation, getLang } from '../utils/i18n.js';

/**
 * AdverbierSmaaordView - Felt 5: De 5 Magiske Småord (Modalpartiklerne i dialog)
 * 
 * 18 højfrekvente modalpartikler og samtalesmåord:
 * 1. jo (Fælles viden / selvfølge)
 * 2. da (Selvfølgelighed / opmuntring)
 * 3. nok (Eget logisk gæt / beroligelse)
 * 4. vel (Appel om bekræftelse / "ikke sandt?")
 * 5. vist (Ekstern kilde / rygte / usikker erindring)
 * 6. bare (Høflig tilladelse / minimum)
 * 7. lige (Høflighedsdæmper / hurtig handling)
 * 8. skam (Høflig understregning / beroligelse)
 * 9. godt (Indrømmelse / accept)
 * 10. sgu (Uformel emphase i talesprog)
 * 11. mon (Undren / retorisk spørgsmål)
 * 12. nu (Dæmpende / samtale-markør)
 * 13. endda (Overraskende tilføjelse / tilmed)
 * 14. heller (Negativ enighed: "heller ikke")
 * 15. ellers (I øvrigt / normalt / betingelse)
 * 16. engang (Forstærket benægtelse: "ikke engang")
 * 17. hellere (Præference: "vil hellere")
 * 18. helst (Stærkeste præference: "vil helst")
 * 
 * 7 didaktiske tabs:
 * 1. Det Interaktive Samtalerum & Vrimlebillede (18 hotspots, filter, ren illustration uden forstyrrende sideboks)
 * 2. Aha-værkstedet ("Hvem ved hvad?" Matrix & Sætnings-Transformeren)
 * 3. Dialog-Detektiven (10 nuancerede gåder bygget på AdverbDialogExerciseView.js)
 * 4. Sætningsbyggeren & Puslespillet (To-trins model: Subjekt = Grøn, Verbum = Rød, Småord = Turkis, Rest = Blå)
 * 5. Kontekst-testen (14 autentiske hverdagsdialoger)
 * 6. Heller, hellere, helst (9 øvelser i præference og negation)
 * 7. Forstærkende ord (9 øvelser i sgu, mon ikke, skam, sandelig)
 */
export function renderAdverbierSmaaordView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adverbier-smaaord-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_adverbier');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // 18 Words Data for Felt 5
    const ADVERBIER_SMAAORD_DATA = [
        {
                "id": "jo",
                "word": "jo",
                "category": "magiske",
                "x": 19,
                "y": 46,
                "meaning": "Fælles viden / selvfølge",
                "sceneDesc": "Kollegaen ler og minder bordet om, at de jo alle kender den sjove historie.",
                "sentence": "Det ved vi jo alle.",
                "contextSentence": "Du behøver ikke forklare det, for det ved vi jo alle.",
                "ruleHint": "Bruges når både taler og lytter kender svaret i forvejen (\"vi er enige\").",
                "translations": {
                        "en": {
                                "word": "as you know / obviously (shared knowledge)",
                                "sentence": "You don't need to explain, for as we all know."
                        },
                        "de": {
                                "word": "ja / doch (gemeinsames Wissen)",
                                "sentence": "Du brauchst es nicht erklären, das wissen wir ja alle."
                        },
                        "es": {
                                "word": "como ya sabes / obviamente",
                                "sentence": "No necesitas explicarlo, porque como todos sabemos."
                        },
                        "ar": {
                                "word": "كما تعلم / بالطبع (معرفة مشتركة)",
                                "sentence": "لا داعي للشرح، فكلنا نعرف ذلك بالطبع."
                        },
                        "tr": {
                                "word": "bildiğin gibi / zaten",
                                "sentence": "Açıklamana gerek yok, bunu hepimiz biliyoruz zaten."
                        },
                        "uk": {
                                "word": "як відомо / ж (спільне знання)",
                                "sentence": "Тобі не треба пояснювати, ми ж усі це знаємо."
                        }
                }
        },
        {
                "id": "da",
                "word": "da",
                "category": "magiske",
                "x": 9,
                "y": 45,
                "meaning": "Selvfølgelighed & opmuntring",
                "sceneDesc": "Manden slår ud med hånden og opmuntrer venligt: \"Det kan du da sagtens!\"",
                "sentence": "Det kan du da sagtens!",
                "contextSentence": "Vær ikke bange for opgaven – det kan du da sagtens klare!",
                "ruleHint": "Fjerner tvivl og opmuntrer modtageren (\"selvfølgelig, vær ikke genert!\").",
                "translations": {
                        "en": {
                                "word": "of course / surely (encouragement)",
                                "sentence": "Don't fear the task – you can surely manage that!"
                        },
                        "de": {
                                "word": "doch / natürlich / freilich",
                                "sentence": "Hab keine Angst vor der Aufgabe – das schaffst du doch mit Leichtigkeit!"
                        },
                        "es": {
                                "word": "por supuesto / claro que sí",
                                "sentence": "No temas la tarea, ¡claro que puedes hacerlo!"
                        },
                        "ar": {
                                "word": "بالتأكيد / بكل سرور",
                                "sentence": "لا تخف من المهمة، يمكنك بالتأكيد القيام بذلك بسهولة!"
                        },
                        "tr": {
                                "word": "elbette / tabii ki",
                                "sentence": "Görevden korkma, bunu kesinlikle kolayca yapabilirsin!"
                        },
                        "uk": {
                                "word": "звісно / авжеж",
                                "sentence": "Не бійся завдання – ти ж звісно впораєшся!"
                        }
                }
        },
        {
                "id": "nok",
                "word": "nok",
                "category": "magiske",
                "x": 26,
                "y": 48,
                "meaning": "Eget logisk gæt & trøst",
                "sceneDesc": "Manden med kaffen smiler beroligende: \"Det skal nok gå fint.\"",
                "sentence": "Det skal nok gå.",
                "contextSentence": "Tag det roligt foran præsentationen, det skal nok gå fint.",
                "ruleHint": "Udtrykker talerens eget logiske gæt eller en varm beroligelse.",
                "translations": {
                        "en": {
                                "word": "probably / it will be fine",
                                "sentence": "Take it easy before the presentation, it will all go fine."
                        },
                        "de": {
                                "word": "wohl / schon (Beruhigung)",
                                "sentence": "Bleib ruhig vor der Präsentation, es wird schon gut gehen."
                        },
                        "es": {
                                "word": "seguramente / todo irá bien",
                                "sentence": "Tranquilo antes de la presentación, seguro que todo saldrá bien."
                        },
                        "ar": {
                                "word": "على الأرجح / سيكون كل شيء بخير",
                                "sentence": "اهدأ قبل العرض، سوف تسير الأمور على ما يرام."
                        },
                        "tr": {
                                "word": "büyük ihtimalle / hallolur",
                                "sentence": "Sunumdan önce sakin ol, her şey yoluna girecektir."
                        },
                        "uk": {
                                "word": "напевно / все буде гаразд",
                                "sentence": "Заспокойся перед презентацією, все напевно буде добре."
                        }
                }
        },
        {
                "id": "bare",
                "word": "bare",
                "category": "stemning",
                "x": 6,
                "y": 79,
                "meaning": "Høflig tilladelse / opmuntring",
                "sceneDesc": "Kvinden byder venligt: \"Tag bare den sidste kanelsnegl!\"",
                "sentence": "Tag bare en stol.",
                "contextSentence": "Der er masser af plads ved bordet, så tag bare en stol.",
                "ruleHint": "Giver grønt lys og fjerner tøven (\"du gør det bare uden bekymring\").",
                "translations": {
                        "en": {
                                "word": "just / feel free (permission)",
                                "sentence": "There is plenty of room at the table, so just take a chair."
                        },
                        "de": {
                                "word": "nur / ruhig (Erlaubnis)",
                                "sentence": "Es gibt viel Platz am Tisch, nimm dir ruhig einen Stuhl."
                        },
                        "es": {
                                "word": "solo / con confianza",
                                "sentence": "Hay mucho espacio en la mesa, toma una silla con confianza."
                        },
                        "ar": {
                                "word": "فقط / تفضل براحتك",
                                "sentence": "يوجد متسع على الطاولة، تفضل وخذ كرسيًا بكل بساطة."
                        },
                        "tr": {
                                "word": "sadece / rahatça al",
                                "sentence": "Masada bolca yer var, rahatça bir sandalye al."
                        },
                        "uk": {
                                "word": "просто / вільно",
                                "sentence": "За столом багато місця, просто візьми стілець."
                        }
                }
        },
        {
                "id": "lige",
                "word": "lige",
                "category": "stemning",
                "x": 17,
                "y": 80,
                "meaning": "Høflighedsdæmper / hurtig handling",
                "sceneDesc": "Manden rækker ud og spørger: \"Må jeg lige låne servietterne?\"",
                "sentence": "Må jeg lige låne den?",
                "contextSentence": "Undskyld forstyrrelsen, må jeg lige låne din saks et øjeblik?",
                "ruleHint": "Gør en anmodning blød, høflig og uformel på ægte dansk.",
                "translations": {
                        "en": {
                                "word": "just / for a moment (polite softener)",
                                "sentence": "Excuse the interruption, may I just borrow your scissors for a moment?"
                        },
                        "de": {
                                "word": "mal / kurz (Höflichkeitsformel)",
                                "sentence": "Entschuldige die Störung, darf ich mir mal kurz deine Schere leihen?"
                        },
                        "es": {
                                "word": "un momento / solo",
                                "sentence": "Disculpa la molestia, ¿me prestas tus tijeras un segundo?"
                        },
                        "ar": {
                                "word": "لحظة / لو سمحت",
                                "sentence": "عذرًا على الإزعاج، هل يمكنني استعارة مقصك للحظة؟"
                        },
                        "tr": {
                                "word": "hemen / bir saniye",
                                "sentence": "Kusura bakmayın, makasınızı bir saniyeliğine ödünç alabilir miyim?"
                        },
                        "uk": {
                                "word": "на хвилинку / просто",
                                "sentence": "Вибачте, що турбую, можна я позичу ваші ножиці на хвилинку?"
                        }
                }
        },
        {
                "id": "mon",
                "word": "mon",
                "category": "talesprog",
                "x": 62,
                "y": 26,
                "meaning": "Undren / retorisk spørgsmål",
                "sceneDesc": "Kollegaen kigger nysgerrigt på kaffemaskinen: \"Mon der er mere kaffe?\"",
                "sentence": "Mon det regner i morgen?",
                "contextSentence": "Himlen ser lidt grå ud. Mon det regner i morgen?",
                "ruleHint": "Stiller et åbent, tænksomt spørgsmål (\"gad vide om...?\").",
                "translations": {
                        "en": {
                                "word": "I wonder if / could it be",
                                "sentence": "The sky looks a bit grey. I wonder if it will rain tomorrow?"
                        },
                        "de": {
                                "word": "wohl / ob wohl",
                                "sentence": "Der Himmel sieht grau aus. Ob es morgen wohl regnet?"
                        },
                        "es": {
                                "word": "¿será que...?",
                                "sentence": "El cielo se ve gris. ¿Será que llueve mañana?"
                        },
                        "ar": {
                                "word": "يا ترى هل...",
                                "sentence": "السماء تبدو رمادية، يا ترى هل ستمطر غدًا؟"
                        },
                        "tr": {
                                "word": "acaba",
                                "sentence": "Gökyüzü biraz gri görünüyor. Acaba yarın yağmur yağar mı?"
                        },
                        "uk": {
                                "word": "цікаво, чи...",
                                "sentence": "Небо трохи сіре. Цікаво, чи піде завтра дощ?"
                        }
                }
        },
        {
                "id": "skam",
                "word": "skam",
                "category": "stemning",
                "x": 76,
                "y": 26,
                "meaning": "Høflig understregning / beroligelse",
                "sceneDesc": "Manden rækker en kop frem og smiler: \"Det er skam friskbrygget kaffe.\"",
                "sentence": "Det gør skam ingenting.",
                "contextSentence": "Du skal ikke sige undskyld, det gør skam ingenting.",
                "ruleHint": "Høflig, pæn bekræftelse der beroliger modtageren.",
                "translations": {
                        "en": {
                                "word": "really / indeed (polite reassurance)",
                                "sentence": "You don't need to apologize, it really doesn't matter at all."
                        },
                        "de": {
                                "word": "durchaus / wirklich (höflich)",
                                "sentence": "Du brauchst dich nicht entschuldigen, das macht wirklich gar nichts."
                        },
                        "es": {
                                "word": "de verdad / ciertamente",
                                "sentence": "No tienes que disculparte, de verdad que no pasa nada."
                        },
                        "ar": {
                                "word": "حقًا / بكل تأكيد (بأدب)",
                                "sentence": "لا داعي للاعتذار، فالأمر لا بأس به حقًا."
                        },
                        "tr": {
                                "word": "gerçekten / kesinlikle",
                                "sentence": "Özür dilemene gerek yok, gerçekten hiç sorun değil."
                        },
                        "uk": {
                                "word": "справді / дійсно",
                                "sentence": "Не варто вибачатися, це справді нічого страшного."
                        }
                }
        },
        {
                "id": "vist",
                "word": "vist",
                "category": "magiske",
                "x": 53,
                "y": 25,
                "meaning": "Ekstern kilde / rygte / usikker erindring",
                "sceneDesc": "Kollegaen deler et rygte: \"Chefens møde er vist aflyst i dag.\"",
                "sentence": "Han kommer vist for sent.",
                "contextSentence": "Jeg hørte nogen nævne, at bussen vist er forsinket.",
                "ruleHint": "Viser at du har hørt det udefra eller ikke vil lægge hovedet på blokken.",
                "translations": {
                        "en": {
                                "word": "apparently / I hear (external rumor)",
                                "sentence": "I heard someone mention that the bus is delayed, apparently."
                        },
                        "de": {
                                "word": "wohl / angeblich",
                                "sentence": "Ich habe gehört, dass der Bus wohl Verspätung hat."
                        },
                        "es": {
                                "word": "al parecer / según parece",
                                "sentence": "Escuché a alguien mencionar que el autobús al parecer viene retrasado."
                        },
                        "ar": {
                                "word": "يبدو أن / على ما يبدو",
                                "sentence": "سمعت أحدهم يذكر أن الحافلة متأخرة على ما يبدو."
                        },
                        "tr": {
                                "word": "görünüşe göre / sanırım",
                                "sentence": "Birinin otobüsün görünüşe göre geciktiğini söylediğini duydum."
                        },
                        "uk": {
                                "word": "мабуть / здається (за чутками)",
                                "sentence": "Я чув, як хтось сказав, що автобус, здається, запізнюється."
                        }
                }
        },
        {
                "id": "sgu",
                "word": "sgu",
                "category": "talesprog",
                "x": 48,
                "y": 26,
                "meaning": "Uformel emphase i talesprog",
                "sceneDesc": "Kollegaen ler overrasket og udbryder: \"Det var sgu en god idé!\"",
                "sentence": "Det passer sgu!",
                "contextSentence": "Jeg troede ikke på det først, men det passer sgu.",
                "ruleHint": "Meget udbredt uformelt hverdagsord, der giver sætningen saft og kraft.",
                "translations": {
                        "en": {
                                "word": "damn well / truly (informal emphasis)",
                                "sentence": "I didn't believe it at first, but it is damn well true."
                        },
                        "de": {
                                "word": "verdammt noch mal / echt",
                                "sentence": "Ich habe es erst nicht geglaubt, aber es stimmt echt."
                        },
                        "es": {
                                "word": "vaya que sí / ciertamente",
                                "sentence": "No lo creía al principio, pero vaya que es verdad."
                        },
                        "ar": {
                                "word": "حقًا / بالتأكيد (عامية)",
                                "sentence": "لم أصدق ذلك في البداية، لكنه صحيح حقًا."
                        },
                        "tr": {
                                "word": "kesinlikle / valla",
                                "sentence": "Önce inanmadım ama valla doğru."
                        },
                        "uk": {
                                "word": "їй-богу / точно",
                                "sentence": "Спочатку я не повірив, але це їй-богу правда."
                        }
                }
        },
        {
                "id": "godt",
                "word": "godt",
                "category": "stemning",
                "x": 32,
                "y": 28,
                "meaning": "Indrømmelse / accept",
                "sceneDesc": "Manden i baggrunden nikker: \"Jeg ved godt, det var en svær opgave.\"",
                "sentence": "Jeg ved godt, det er svært.",
                "contextSentence": "Selvom du er træt, ved jeg godt, at du gør dit bedste.",
                "ruleHint": "Udtrykker forståelse, sympati eller indrømmelse.",
                "translations": {
                        "en": {
                                "word": "well / indeed (acknowledgment)",
                                "sentence": "Even though you are tired, I know well that you do your best."
                        },
                        "de": {
                                "word": "wohl / schon (Verständnis)",
                                "sentence": "Obwohl du müde bist, weiß ich wohl, dass du dein Bestes gibst."
                        },
                        "es": {
                                "word": "bien / ya sé",
                                "sentence": "Aunque estés cansado, bien sé que haces lo mejor que puedes."
                        },
                        "ar": {
                                "word": "تمامًا / أعلم جيدًا",
                                "sentence": "على الرغم من أنك متعب، أعلم جيدًا أنك تبذل قصارى جهدك."
                        },
                        "tr": {
                                "word": "gayet iyi / bilincindeyim",
                                "sentence": "Yorgun olsan da elinden geleni yaptığını gayet iyi biliyorum."
                        },
                        "uk": {
                                "word": "добре / чудово розумію",
                                "sentence": "Хоч ти й втомився, я добре знаю, що ти стараєшся."
                        }
                }
        },
        {
                "id": "ellers",
                "word": "ellers",
                "category": "valg",
                "x": 40,
                "y": 27,
                "meaning": "I øvrigt / normalt / betingelse",
                "sceneDesc": "Kollegaen spørger interesseret: \"Hvordan går det ellers med projektet?\"",
                "sentence": "Hvordan går det ellers?",
                "contextSentence": "Bortset fra det travle møde, hvordan går det ellers med arbejdet?",
                "ruleHint": "Skifter samtaleemne venligt (\"hvad med alt det andet?\").",
                "translations": {
                        "en": {
                                "word": "otherwise / by the way",
                                "sentence": "Apart from the busy meeting, how is work going otherwise?"
                        },
                        "de": {
                                "word": "sonst / übrigens",
                                "sentence": "Abgesehen von dem stressigen Meeting, wie läuft die Arbeit sonst?"
                        },
                        "es": {
                                "word": "por lo demás / en general",
                                "sentence": "Aparte de la reunión ocupada, ¿cómo va el trabajo por lo demás?"
                        },
                        "ar": {
                                "word": "على أي حال / بخلاف ذلك",
                                "sentence": "بصرف النظر عن الاجتماع المزدحم، كيف يسير العمل بخلاف ذلك؟"
                        },
                        "tr": {
                                "word": "bunun dışında / genel olarak",
                                "sentence": "Yoğun toplantı dışında, genel olarak işler nasıl gidiyor?"
                        },
                        "uk": {
                                "word": "інакше / взагалі",
                                "sentence": "Крім напруженої зустрічі, як взагалі йде робота?"
                        }
                }
        },
        {
                "id": "vel",
                "word": "vel",
                "category": "magiske",
                "x": 38,
                "y": 55,
                "meaning": "Appel om bekræftelse / \"ikke sandt?\"",
                "sceneDesc": "Kvinden med brillerne kigger spørgende: \"Du har vel ikke glemt rapporten?\"",
                "sentence": "Du er vel ikke sur?",
                "contextSentence": "Jeg kom lidt for sent, men du er vel ikke sur over det?",
                "ruleHint": "Søger bekræftelse fra den anden person (\"det er sådan, ikke sandt?\").",
                "translations": {
                        "en": {
                                "word": "presumably / right? (seeking confirmation)",
                                "sentence": "I was a bit late, but you aren't angry about that, are you?"
                        },
                        "de": {
                                "word": "wohl / doch (Bestätigung)",
                                "sentence": "Ich kam etwas zu spät, aber du bist wohl nicht sauer deswegen, oder?"
                        },
                        "es": {
                                "word": "¿verdad? / supongo que...",
                                "sentence": "Llegué un poco tarde, pero no estás enfadado por eso, ¿verdad?"
                        },
                        "ar": {
                                "word": "أليس كذلك؟ / لعلك...",
                                "sentence": "تأخرت قليلًا، لكنك لست غاضبًا من ذلك، أليس كذلك؟"
                        },
                        "tr": {
                                "word": "herhalde / değil mi?",
                                "sentence": "Biraz geç kaldım ama buna kızgın değilsin, değil mi?"
                        },
                        "uk": {
                                "word": "мабуть / чи не так?",
                                "sentence": "Я трохи запізнився, але ти ж не сердишся через це, правда?"
                        }
                }
        },
        {
                "id": "nu",
                "word": "nu",
                "category": "talesprog",
                "x": 48,
                "y": 52,
                "meaning": "Dæmpende samtale-markør",
                "sceneDesc": "Manden gestikulerer roligt: \"Hør nu lige her, det var sådan det skete.\"",
                "sentence": "Hør nu her.",
                "contextSentence": "Inden du bliver urolig, så hør nu lige hvad der skete.",
                "ruleHint": "Fanger opmærksomheden eller dæmper en diskussion i hverdagen.",
                "translations": {
                        "en": {
                                "word": "now / listen here (conversation marker)",
                                "sentence": "Before you get anxious, just listen now to what happened."
                        },
                        "de": {
                                "word": "nun / mal (Gesprächsmarker)",
                                "sentence": "Bevor du dich aufregst, hör jetzt mal zu, was passiert ist."
                        },
                        "es": {
                                "word": "ahora / oye bien",
                                "sentence": "Antes de que te preocupes, escucha ahora lo que sucedió."
                        },
                        "ar": {
                                "word": "الآن / استمع هنا",
                                "sentence": "قبل أن تقلق، استمع إليّ الآن لما حدث."
                        },
                        "tr": {
                                "word": "şimdi / dinle bak",
                                "sentence": "Endişelenmeden önce, ne olduğunu şimdi dinle."
                        },
                        "uk": {
                                "word": "ну ж бо / послухай",
                                "sentence": "Перш ніж хвилюватися, послухай-но зараз, що сталося."
                        }
                }
        },
        {
                "id": "heller",
                "word": "heller",
                "category": "valg",
                "x": 59,
                "y": 48,
                "meaning": "Negativ enighed (\"heller ikke\")",
                "sceneDesc": "Kollegaen hvisker samstemmende: \"Jeg forstår det heller ikke helt.\"",
                "sentence": "Jeg ved det heller ikke.",
                "contextSentence": "Du spurgte om retningen, men jeg ved det heller ikke.",
                "ruleHint": "Bruges altid med nægtelse (\"heller ikke\") for at vise fælles enighed.",
                "translations": {
                        "en": {
                                "word": "neither / either (negative agreement)",
                                "sentence": "You asked about the direction, but I don't know either."
                        },
                        "de": {
                                "word": "auch nicht (Verneinung)",
                                "sentence": "Du hast nach der Richtung gefragt, aber ich weiß es auch nicht."
                        },
                        "es": {
                                "word": "tampoco",
                                "sentence": "Preguntaste por la dirección, pero yo tampoco lo sé."
                        },
                        "ar": {
                                "word": "ولا أنا / أيضًا لا",
                                "sentence": "سألت عن الاتجاه، لكني لا أعلم ذلك أيضًا."
                        },
                        "tr": {
                                "word": "de ... değil / ben de",
                                "sentence": "Yönü sordun ama ben de bilmiyorum."
                        },
                        "uk": {
                                "word": "теж не / також не",
                                "sentence": "Ти запитав про дорогу, але я теж не знаю."
                        }
                }
        },
        {
                "id": "engang",
                "word": "engang",
                "category": "valg",
                "x": 66,
                "y": 49,
                "meaning": "Forstærket benægtelse (\"ikke engang\")",
                "sceneDesc": "Kollegaen med orange hår spærrer øjnene op: \"Ikke engang chefen vidste det!\"",
                "sentence": "Ikke engang min bror vidste det.",
                "contextSentence": "Nyheden var så hemmelig, at ikke engang lederen vidste det.",
                "ruleHint": "Understreger det uventede i en benægtelse (svarer til \"not even\").",
                "translations": {
                        "en": {
                                "word": "even (not even)",
                                "sentence": "The news was so secret that not even the manager knew it."
                        },
                        "de": {
                                "word": "einmal (nicht einmal)",
                                "sentence": "Die Nachricht war so geheim, dass nicht einmal der Chef es wusste."
                        },
                        "es": {
                                "word": "ni siquiera",
                                "sentence": "La noticia era tan secreta que ni siquiera el jefe lo sabía."
                        },
                        "ar": {
                                "word": "حتى (ولا حتى)",
                                "sentence": "كان الخبر سريًا لدرجة أن المدير نفسه لم يكن يعلم به."
                        },
                        "tr": {
                                "word": "bile (bile değil)",
                                "sentence": "Haber o kadar gizliydi ki müdür bile bilmiyordu."
                        },
                        "uk": {
                                "word": "навіть (навіть не)",
                                "sentence": "Новина була настільки таємною, що навіть керівник не знав."
                        }
                }
        },
        {
                "id": "endda",
                "word": "endda",
                "category": "talesprog",
                "x": 61,
                "y": 68,
                "meaning": "Overraskende tilføjelse / tilmed",
                "sceneDesc": "Manden i den grønne trøje nikker anerkendende: \"Han kom endda før tid!\"",
                "sentence": "Han kom endda til tiden.",
                "contextSentence": "Toget var forsinket, men han nåede frem og kom endda før tid.",
                "ruleHint": "Tilføjer en positiv eller overraskende bonus (svarer til \"tilmed / even\").",
                "translations": {
                        "en": {
                                "word": "even / furthermore",
                                "sentence": "The train was delayed, but he made it and even arrived ahead of time."
                        },
                        "de": {
                                "word": "sogar / obendrein",
                                "sentence": "Der Zug hatte Verspätung, aber er schaffte es und kam sogar vor der Zeit an."
                        },
                        "es": {
                                "word": "incluso / además",
                                "sentence": "El tren se retrasó, pero llegó e incluso antes de tiempo."
                        },
                        "ar": {
                                "word": "حتى / علاوة على ذلك",
                                "sentence": "تأخر القطار، لكنه وصل بل وجاء قبل الموعد."
                        },
                        "tr": {
                                "word": "hatta / üstelik",
                                "sentence": "Tren gecikti ama o başardı ve hatta vaktinden önce geldi."
                        },
                        "uk": {
                                "word": "навіть / до того ж",
                                "sentence": "Потяг затримався, але він встиг і навіть прибув раніше часу."
                        }
                }
        },
        {
                "id": "hellere",
                "word": "hellere",
                "category": "valg",
                "x": 77,
                "y": 64,
                "meaning": "Præference (\"vil hellere\")",
                "sceneDesc": "Manden tænker højt: \"Jeg vil hellere tage cyklen i dag end bussen.\"",
                "sentence": "Jeg vil hellere have kaffe.",
                "contextSentence": "Mange tak for tilbuddet om te, men jeg vil hellere have kaffe.",
                "ruleHint": "Udtrykker et personligt valg mellem to muligheder (komparativ).",
                "translations": {
                        "en": {
                                "word": "rather / prefer",
                                "sentence": "Many thanks for the offer of tea, but I would rather have coffee."
                        },
                        "de": {
                                "word": "lieber",
                                "sentence": "Vielen Dank für den Tee, aber ich möchte lieber Kaffee."
                        },
                        "es": {
                                "word": "más bien / preferir",
                                "sentence": "Muchas gracias por ofrecer té, pero prefiero café."
                        },
                        "ar": {
                                "word": "أفضل بالأحرى",
                                "sentence": "شكرًا جزيلاً على تقديم الشاي، لكني أفضل القهوة بالأحرى."
                        },
                        "tr": {
                                "word": "tercihen / daha ziyade",
                                "sentence": "Çay teklifi için çok teşekkürler ama kahveyi tercih ederim."
                        },
                        "uk": {
                                "word": "краще / скоріше",
                                "sentence": "Дуже дякую за пропозицію чаю, але я краще вип'ю кави."
                        }
                }
        },
        {
                "id": "helst",
                "word": "helst",
                "category": "valg",
                "x": 90,
                "y": 64,
                "meaning": "Stærkeste præference (\"vil helst\")",
                "sceneDesc": "Kvinden med tommelfingeren op smiler: \"Jeg vil helst sidde ved vinduet.\"",
                "sentence": "Jeg vil helst blive hjemme.",
                "contextSentence": "Vejret er koldt og blæsende, så jeg vil helst blive hjemme i dag.",
                "ruleHint": "Superlativ af præference: Den absolut bedste løsning for taleren.",
                "translations": {
                        "en": {
                                "word": "prefer most / preferably",
                                "sentence": "The weather is cold and windy, so I would preferably stay home today."
                        },
                        "de": {
                                "word": "am liebsten",
                                "sentence": "Das Wetter ist kalt und stürmisch, daher möchte ich heute am liebsten zu Hause bleiben."
                        },
                        "es": {
                                "word": "de preferencia / lo que más prefiero",
                                "sentence": "El tiempo está frío y ventoso, así que preferiría quedarme en casa hoy."
                        },
                        "ar": {
                                "word": "الأفضل على الإطلاق",
                                "sentence": "الطقس بارد وعاصف، لذا فإنني أفضل البقاء في المنزل اليوم."
                        },
                        "tr": {
                                "word": "en çok / en iyisi",
                                "sentence": "Hava soğuk ve rüzgarlı, bu yüzden bugün en çok evde kalmak isterim."
                        },
                        "uk": {
                                "word": "найбільше / найохочіше",
                                "sentence": "Погода холодна та вітряна, тому я найохочіше залишився б удома."
                        }
                }
        }
];

    // Helper for translation
    function getSmaaordTranslation(item) {
        const lang = getLang();
        if (item.translations && item.translations[lang]) {
            return item.translations[lang];
        }
        if (item.translations && item.translations['en']) {
            return item.translations['en'];
        }
        return { word: item.meaning, sentence: '' };
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .adverbier-smaaord-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 5rem;
            color: #f8fafc;
        }

        /* Hero Header */
        .smaaord-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .smaaord-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(6, 182, 212, 0.15);
            border: 1px solid #22d3ee;
            color: #22d3ee;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
        }
        .smaaord-hero h1 {
            font-size: 2.6rem;
            font-weight: 900;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #a5f3fc, #22d3ee, #0891b2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .smaaord-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 800px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        /* Golden Didactic Rule Banner */
        .golden-rule-banner {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9));
            border: 2px solid #06b6d4;
            border-radius: 20px;
            padding: 1.4rem 2rem;
            max-width: 900px;
            margin: 0 auto 2.5rem;
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.25);
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .rule-icon {
            font-size: 2.8rem;
            flex-shrink: 0;
        }
        .rule-content h4 {
            color: #a5f3fc;
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
        }
        .rule-content p {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .rule-pills-row {
            display: flex;
            gap: 0.6rem;
            margin-top: 0.8rem;
            flex-wrap: wrap;
        }
        .rule-pill {
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 800;
            background: rgba(6, 182, 212, 0.15);
            border: 1px solid #06b6d4;
            color: #22d3ee;
        }

        /* Tabs Navigation */
        .adv-tabs-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
            margin-bottom: 2.2rem;
            background: rgba(15, 23, 42, 0.6);
            padding: 0.6rem;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .adv-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .adv-tab-btn:hover {
            color: #f1f5f9;
            background: rgba(255, 255, 255, 0.05);
        }
        .adv-tab-btn.active {
            background: #0891b2;
            color: white;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
        }

        /* Tab 1: Vrimmel Layout (Clean, No Duplicate Inspector) */
        .vrimmel-layout {
            max-width: 1050px;
            margin: 0 auto;
        }
        .vrimmel-stage-card {
            background: #1e293b;
            border-radius: 20px;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .vrimmel-controls-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem 1.2rem;
            background: #0f172a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .vrimmel-filters {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .filter-btn {
            background: #334155;
            color: #cbd5e1;
            border: none;
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn.active {
            background: #0891b2;
            color: white;
        }
        .pure-toggle-btn {
            background: rgba(255, 255, 255, 0.08);
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s;
        }
        .pure-toggle-btn.active {
            background: #22d3ee;
            color: #0f172a;
            font-weight: 800;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            background: #020617;
            overflow: hidden;
        }
        .vrimmel-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            user-select: none;
        }

        /* Hotspot Pins */
        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #0891b2;
            border: 3px solid #ffffff;
            color: white;
            font-weight: 900;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), 0 0 12px rgba(6, 182, 212, 0.7);
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.3);
            background: #22d3ee;
            box-shadow: 0 6px 20px rgba(34, 211, 238, 0.9);
            z-index: 20;
        }
        .hotspot-pin.active {
            background: #06b6d4;
            transform: translate(-50%, -50%) scale(1.4);
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.95);
            z-index: 30;
        }
        .hotspot-label {
            position: absolute;
            top: 105%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.92);
            color: white;
            font-size: 0.74rem;
            font-weight: 800;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            white-space: nowrap;
            border: 1px solid rgba(34, 211, 238, 0.4);
            pointer-events: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5);
        }


        /* Inspector Card (Target Word Presentation below stage) */
        .vrimmel-inspector {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(6, 182, 212, 0.4);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.15);
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            gap: 2rem;
            margin-top: 1.8rem;
            animation: fadeIn 0.3s ease;
            transition: all 0.3s ease;
        }
        .vrimmel-inspector.updated {
            animation: inspectorPulse 0.4s ease-out;
            border-color: #22d3ee;
            box-shadow: 0 0 35px rgba(34, 211, 238, 0.45), 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        @keyframes inspectorPulse {
            0% { transform: translateY(6px) scale(0.99); }
            50% { transform: translateY(-2px) scale(1.01); }
            100% { transform: translateY(0) scale(1); }
        }
        @media (max-width: 850px) {
            .vrimmel-inspector {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }
        .inspector-left,
        .inspector-right {
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }
        .inspector-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.6rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.8rem;
            gap: 0.8rem;
            flex-wrap: wrap;
        }
        .inspector-badge-row {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            flex-wrap: wrap;
        }
        .inspector-badge {
            background: rgba(6, 182, 212, 0.2);
            border: 1px solid #22d3ee;
            color: #22d3ee;
            padding: 0.35rem 0.85rem;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 800;
        }
        .inspector-word-title {
            font-size: 2.2rem;
            font-weight: 900;
            color: white;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.7rem;
        }
        .inspector-audio-btn {
            background: #334155;
            color: #cbd5e1;
            border: none;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.2rem;
        }
        .inspector-audio-btn:hover {
            background: #0891b2;
            color: white;
            transform: scale(1.1);
        }
        .inspector-trans-box {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.18), rgba(15, 23, 42, 0.85));
            border: 1.5px solid #06b6d4;
            border-radius: 14px;
            padding: 0.9rem 1.3rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.2);
        }
        .trans-badge-label {
            font-size: 0.75rem;
            font-weight: 800;
            color: #22d3ee;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .trans-word-val {
            font-size: 1.35rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .inspector-scene-box {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 14px;
            padding: 1rem 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .scene-heading {
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 800;
            margin-bottom: 0.4rem;
            text-transform: uppercase;
        }
        .scene-text {
            font-size: 1.05rem;
            color: #cbd5e1;
            line-height: 1.5;
            margin: 0;
        }
        .inspector-sentence-card {
            background: rgba(6, 182, 212, 0.12);
            border: 1.5px solid rgba(6, 182, 212, 0.35);
            border-radius: 14px;
            padding: 1.1rem 1.3rem;
        }
        .sentence-quote-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
            line-height: 1.4;
            margin: 0 0 0.4rem 0;
        }
        .sentence-trans-text {
            font-size: 0.98rem;
            color: #cbd5e1;
            font-style: italic;
            margin: 0 0 0.8rem 0;
            line-height: 1.4;
        }
        .inspector-speak-btn {
            background: #0891b2;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .inspector-speak-btn:hover {
            background: #06b6d4;
            transform: translateY(-2px);
        }
        .inspector-actions {
            display: flex;
            gap: 0.8rem;
            margin-top: auto;
        }
        .inspector-btn-action {
            flex: 1;
            background: #334155;
            color: white;
            border: none;
            padding: 0.85rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .inspector-btn-action:hover {
            background: #475569;
        }

        /* Tab 2: Aha-værkstedet */
        .vaerksted-container {
            max-width: 950px;
            margin: 0 auto;
        }
        .vaerksted-subtabs {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .vaerksted-subtab-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 0.8rem 1.6rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .vaerksted-subtab-btn:hover {
            border-color: #22d3ee;
            color: white;
        }
        .vaerksted-subtab-btn.active {
            background: #0891b2;
            border-color: #22d3ee;
            color: white;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
        }

        /* Matrix Card */
        .matrix-table-wrap {
            background: #1e293b;
            border-radius: 20px;
            padding: 1.8rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            margin-bottom: 2rem;
            overflow-x: auto;
        }
        .matrix-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }
        .matrix-table th {
            padding: 1rem;
            background: #0f172a;
            color: #22d3ee;
            font-size: 0.95rem;
            font-weight: 800;
            border-bottom: 2px solid rgba(34, 211, 238, 0.3);
        }
        .matrix-table td {
            padding: 1.2rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.95rem;
            line-height: 1.5;
            color: #cbd5e1;
        }
        .matrix-word-badge {
            display: inline-block;
            background: rgba(6, 182, 212, 0.2);
            border: 1.5px solid #22d3ee;
            color: #22d3ee;
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-weight: 900;
            font-size: 1.1rem;
        }
        .matrix-row:hover {
            background: rgba(6, 182, 212, 0.08);
        }

        /* Sentence Transformer Card */
        .transformer-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid #06b6d4;
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.25);
            text-align: center;
        }
        .transformer-base {
            font-size: 1.2rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
        }
        .transformer-buttons-grid {
            display: flex;
            gap: 0.8rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }
        .trans-opt-btn {
            background: #0f172a;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.15);
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
        }
        .trans-opt-btn:hover {
            border-color: #22d3ee;
            transform: translateY(-2px);
        }
        .trans-opt-btn.active {
            background: #0891b2;
            border-color: #22d3ee;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
        }
        .trans-display-box {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.8rem;
            border: 2px solid rgba(34, 211, 238, 0.3);
            margin-bottom: 1.5rem;
        }
        .trans-quote {
            font-size: 1.8rem;
            font-weight: 900;
            color: white;
            margin-bottom: 0.8rem;
        }
        .trans-quote span.highlight {
            color: #22d3ee;
            text-decoration: underline;
        }
        .trans-explanation {
            font-size: 1.1rem;
            color: #cbd5e1;
            line-height: 1.5;
        }

        /* Tab 3: Dialog-Detektiven */
        .detektiv-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 850px;
            margin: 0 auto;
        }
        .detektiv-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 1.5rem;
        }
        .detektiv-context-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(6, 182, 212, 0.2);
            border: 1px solid #22d3ee;
            color: #22d3ee;
            padding: 0.35rem 0.9rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
        }
        .detektiv-prompt-text {
            font-size: 1.25rem;
            color: #f8fafc;
            line-height: 1.6;
            margin-bottom: 1.8rem;
            font-weight: 600;
        }
        .detektiv-sentence-quote {
            font-size: 1.45rem;
            font-weight: 800;
            color: white;
            background: rgba(15, 23, 42, 0.7);
            padding: 1.2rem;
            border-radius: 14px;
            border-left: 5px solid #06b6d4;
            margin-bottom: 2rem;
            text-align: center;
        }
        .detektiv-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .detektiv-opt-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 2px solid rgba(255, 255, 255, 0.12);
            padding: 1.1rem 1.4rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .detektiv-opt-btn:hover {
            border-color: #22d3ee;
            background: #334155;
            transform: translateY(-2px);
        }
        .detektiv-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .detektiv-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }
        .detektiv-feedback-box {
            border-radius: 14px;
            padding: 1.4rem;
            margin-top: 1.5rem;
            line-height: 1.6;
            font-size: 1.05rem;
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .detektiv-feedback-box.show { display: block; }
        .detektiv-feedback-box.correct {
            background: rgba(34, 197, 94, 0.12);
            border: 2px solid #22c55e;
            color: #86efac;
        }
        .detektiv-feedback-box.wrong {
            background: rgba(239, 68, 68, 0.12);
            border: 2px solid #ef4444;
            color: #fca5a5;
        }

        /* Tab 4: Sætningsbyggeren (To-trins model med konsistente farver) */
        .builder-container {
            max-width: 950px;
            margin: 0 auto;
        }
        .builder-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .builder-step-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(6, 182, 212, 0.2);
            border: 1px solid #22d3ee;
            color: #22d3ee;
            padding: 0.4rem 1rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.85rem;
            text-transform: uppercase;
            margin-bottom: 1.2rem;
        }

        /* Grammar Architecture Diagram */
        .flow-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.8rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 750px) {
            .flow-container { grid-template-columns: 1fr 1fr; }
        }
        .flow-step {
            background: #0f172a;
            border-radius: 12px;
            padding: 0.9rem;
            text-align: center;
            border: 2px solid;
        }
        .flow-step.flow-subjekt { border-color: #22c55e; }
        .flow-step.flow-verbum { border-color: #ef4444; }
        .flow-step.flow-smaaord { border-color: #06b6d4; }
        .flow-step.flow-rest { border-color: #0ea5e9; }
        .flow-step-num { font-size: 0.75rem; font-weight: 800; margin-bottom: 0.2rem; }
        .flow-step.flow-subjekt .flow-step-num { color: #86efac; }
        .flow-step.flow-verbum .flow-step-num { color: #fca5a5; }
        .flow-step.flow-smaaord .flow-step-num { color: #22d3ee; }
        .flow-step.flow-rest .flow-step-num { color: #7dd3fc; }
        .flow-step-title { font-size: 0.95rem; font-weight: 800; color: white; }

        /* Step 1 Target Sentence Display with Dashed Blank */
        .sb-sentence-display {
            font-size: 1.45rem;
            font-weight: 800;
            color: white;
            background: #0f172a;
            padding: 1.4rem;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            margin-bottom: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .sb-blank-slot {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 110px;
            padding: 0.2rem 1rem;
            border: 2.5px dashed #06b6d4;
            background: rgba(6, 182, 212, 0.15);
            border-radius: 10px;
            color: #22d3ee;
            font-weight: 900;
            letter-spacing: 2px;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
            transition: all 0.3s;
        }
        .sb-blank-slot.filled {
            border: 2px solid #22c55e;
            background: rgba(34, 197, 94, 0.22);
            color: #4ade80;
            letter-spacing: normal;
        }

        /* Puzzle Slots Grid */
        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-bottom: 1.8rem;
        }
        @media (max-width: 750px) {
            .sb-puzzle-slots { grid-template-columns: 1fr 1fr; }
        }
        .sb-puzzle-slot {
            background: #1e293b;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 14px;
            padding: 1.2rem 0.8rem;
            min-height: 95px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.2s;
            position: relative;
            cursor: pointer;
        }
        .sb-puzzle-slot.slot-smaaord {
            border: 2.5px dashed #06b6d4;
            background: rgba(6, 182, 212, 0.08);
            box-shadow: inset 0 0 15px rgba(6, 182, 212, 0.2);
        }
        .sb-puzzle-slot.filled.slot-subjekt {
            border-style: solid;
            border-color: #22c55e !important;
            background: rgba(34, 197, 94, 0.15) !important;
            color: #86efac !important;
        }
        .sb-puzzle-slot.filled.slot-verbum {
            border-style: solid;
            border-color: #ef4444 !important;
            background: rgba(239, 68, 68, 0.15) !important;
            color: #fca5a5 !important;
        }
        .sb-puzzle-slot.filled.slot-smaaord {
            border-style: solid;
            border-color: #06b6d4 !important;
            background: rgba(6, 182, 212, 0.25) !important;
            color: #22d3ee !important;
        }
        .sb-puzzle-slot.filled.slot-rest {
            border-style: solid;
            border-color: #0ea5e9 !important;
            background: rgba(14, 165, 233, 0.15) !important;
            color: #7dd3fc !important;
        }
        .slot-badge-callout {
            position: absolute;
            top: -12px;
            font-size: 0.72rem;
            font-weight: 800;
            padding: 0.15rem 0.6rem;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            white-space: nowrap;
        }
        .callout-subjekt { background: #22c55e; color: #022c22; }
        .callout-verbum { background: #ef4444; color: white; }
        .callout-smaaord { background: #06b6d4; color: #082f49; }
        .callout-rest { background: #0ea5e9; color: white; }

        .sb-puzzle-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            justify-content: center;
            margin-bottom: 1.8rem;
        }
        .sb-puzzle-chip {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.15);
            padding: 0.9rem 1.6rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-puzzle-chip:hover {
            background: #475569;
            border-color: #22d3ee;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.used {
            opacity: 0.25;
            pointer-events: none;
        }

        /* Tab 5: Kontekst-testen */
        .kontekst-container {
            max-width: 850px;
            margin: 0 auto;
        }
        .progress-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            font-weight: 800;
            color: #cbd5e1;
        }
        .progress-bar-wrap {
            height: 10px;
            background: #334155;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 2rem;
        }
        .progress-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #0891b2, #22d3ee);
            transition: width 0.3s ease;
        }
        .action-btn-primary {
            background: #0891b2;
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .action-btn-primary:hover {
            background: #0e7490;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
            transform: translateY(-2px);
        }

        /* Specialized Training Tabs */
        .special-tab-container {
            max-width: 920px;
            margin: 0 auto;
        }
        .special-intro-box {
            text-align: center;
            margin-bottom: 2rem;
        }
        .special-intro-box h2 {
            font-size: 2.2rem;
            color: #a5f3fc;
            margin-bottom: 0.5rem;
            font-weight: 900;
        }
        .special-intro-box p {
            color: #cbd5e1;
            font-size: 1.05rem;
            max-width: 750px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .special-rule-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2.2rem;
        }
        .special-rule-card {
            background: #1e293b;
            border-radius: 18px;
            padding: 1.3rem 1.4rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            transition: all 0.25s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }
        .special-rule-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(6, 182, 212, 0.25);
        }
        .special-rule-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .special-rule-word {
            font-size: 1.4rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .special-rule-role {
            font-size: 0.72rem;
            font-weight: 800;
            padding: 0.25rem 0.65rem;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .special-rule-desc {
            font-size: 0.95rem;
            color: #cbd5e1;
            line-height: 1.45;
        }
        .special-rule-example {
            background: rgba(15, 23, 42, 0.75);
            border-radius: 10px;
            padding: 0.65rem 0.9rem;
            font-size: 0.95rem;
            color: #f8fafc;
            font-style: italic;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-top: 0.2rem;
        }
        .rule-speak-btn {
            background: #334155;
            color: white;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.2s;
        }
        .rule-speak-btn:hover {
            background: #06b6d4;
            transform: scale(1.1);
        }

        .exercise-dialog-quote {
            font-size: 1.45rem;
            color: white;
            line-height: 1.8;
            margin-bottom: 2rem;
            background: rgba(15, 23, 42, 0.75);
            padding: 1.5rem;
            border-radius: 14px;
            border-left: 5px solid #06b6d4;
        }

        .score-celebration-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
            border: 2px solid #22d3ee;
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.35);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'smaaord-hero';
    hero.innerHTML = `
        <div class="smaaord-hero-tag">
            <span>💬</span> Felt 5 • 18 samtalesmåord
        </div>
        <h1>De 5 Magiske Småord</h1>
        <p>Mestre de danske modalpartikler i dialog: <strong>jo, da, nok, vel</strong> og <strong>vist</strong>. Lær hvem der ved hvad, og hvordan en enkelt stavelse forvandler hele samtalens stemning og tillid.</p>
    `;
    viewContainer.appendChild(hero);

    // Golden Didactic Rule Banner
    const goldenBanner = document.createElement('div');
    goldenBanner.className = 'golden-rule-banner';
    goldenBanner.innerHTML = `
        <div class="rule-icon">💡</div>
        <div class="rule-content">
            <h4>Nøglen til dialog: Hvem ved hvad?</h4>
            <p>
                Småord ændrer ikke <em>hvad</em> der sker, men <em>hvordan</em> du og din lytter deler viden.
            </p>
            <div class="rule-pills-row">
                <span class="rule-pill">jo = Fælles viden ("Det ved vi begge")</span>
                <span class="rule-pill">da = Selvfølgelighed ("Det må du da gerne!")</span>
                <span class="rule-pill">nok = Eget gæt / trøst ("Det skal nok gå")</span>
                <span class="rule-pill">vel = Bekræftelse ("Du er vel ikke sur?")</span>
                <span class="rule-pill">vist = Rygte udefra ("Det regner vist i morgen")</span>
            </div>
        </div>
    `;
    viewContainer.appendChild(goldenBanner);

    // Tabs Navigation
    const nav = document.createElement('div');
    nav.className = 'adv-tabs-nav';

    const tabs = [
        { id: 'vrimmel', label: '1. Frokoststuen (Vrimlebilledet)', icon: '🖼️' },
        { id: 'vaerksted', label: '2. Aha-værkstedet ("Hvem ved hvad?")', icon: '🧠' },
        { id: 'detektiv', label: '3. Dialog-Detektiven (10 gåder)', icon: '🔍' },
        { id: 'builder', label: '4. Sætningsbyggeren & Puslespillet', icon: '🧩' },
        { id: 'kontekst', label: '5. Kontekst-testen (14 opgaver)', icon: '🎯' },
        { id: 'hellere', label: '6. Heller, hellere, helst ⚖️', icon: '⚖️' },
        { id: 'boosters', label: '7. Forstærkere (sgu, mon ikke, skam...) 💥', icon: '💥' }
    ];

    let currentTab = 'vrimmel';

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${currentTab === tab.id ? 'active' : ''}`;
        btn.id = `tab-btn-${tab.id}`;
        btn.innerHTML = `<span>${tab.icon}</span> ${tab.label}`;
        btn.onclick = () => switchTab(tab.id);
        nav.appendChild(btn);
    });
    viewContainer.appendChild(nav);

    // Tab Content Container
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content-area';
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        nav.querySelectorAll('.adv-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#tab-btn-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'vrimmel') {
            renderTabVrimmel(tabContent);
        } else if (tabId === 'vaerksted') {
            renderTabVaerksted(tabContent);
        } else if (tabId === 'detektiv') {
            renderTabDetektiv(tabContent);
        } else if (tabId === 'builder') {
            renderTabBuilder(tabContent);
        } else if (tabId === 'kontekst') {
            renderTabKontekst(tabContent);
        } else if (tabId === 'hellere') {
            renderTabHellere(tabContent);
        } else if (tabId === 'boosters') {
            renderTabBoosters(tabContent);
        }
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET (Frokoststuen)
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = null;

    function renderTabVrimmel(parent) {
        parent.innerHTML = '';

        if (!selectedWord) {
            selectedWord = ADVERBIER_SMAAORD_DATA[0];
        }

        const layout = document.createElement('div');
        layout.className = 'vrimmel-layout';

        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        // Controls bar
        const controls = document.createElement('div');
        controls.className = 'vrimmel-controls-bar';

        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'vrimmel-filters';

        const filters = [
            { id: 'alle', label: 'Alle (18)' },
            { id: 'magiske', label: 'De 5 magiske ⭐' },
            { id: 'stemning', label: 'Høflighed & opmuntring' },
            { id: 'talesprog', label: 'Talesprog & emphase' },
            { id: 'valg', label: 'Enighed & præference' }
        ];

        filters.forEach(f => {
            const fBtn = document.createElement('button');
            fBtn.className = `filter-btn ${activeFilter === f.id ? 'active' : ''}`;
            fBtn.textContent = f.label;
            fBtn.onclick = () => {
                activeFilter = f.id;
                renderTabVrimmel(parent);
            };
            filtersDiv.appendChild(fBtn);
        });

        const pureBtn = document.createElement('button');
        pureBtn.className = `pure-toggle-btn ${isPureMode ? 'active' : ''}`;
        pureBtn.innerHTML = `<span>${isPureMode ? '👁️' : '🏷️'}</span> ${isPureMode ? 'Skjul ordmærker' : 'Vis ordmærker'}`;
        pureBtn.onclick = () => {
            isPureMode = !isPureMode;
            renderTabVrimmel(parent);
        };

        controls.appendChild(filtersDiv);
        controls.appendChild(pureBtn);
        stageCard.appendChild(controls);

        // Stage with Wimmelbild image
        const stage = document.createElement('div');
        stage.className = 'vrimmel-stage';

        const img = document.createElement('img');
        img.src = 'assets/adverbier_smaaord_vrimmel.jpg';
        img.alt = 'Samtaler og småord i frokoststuen';
        img.className = 'vrimmel-img';
        stage.appendChild(img);

        // Filter words
        const visibleWords = ADVERBIER_SMAAORD_DATA.filter(item => {
            if (activeFilter === 'alle') return true;
            return item.category === activeFilter;
        });

        // Place Hotspot Pins
        visibleWords.forEach((item, idx) => {
            const pin = document.createElement('div');
            pin.className = `hotspot-pin ${selectedWord && selectedWord.id === item.id ? 'active' : ''}`;
            pin.style.left = `${item.x}%`;
            pin.style.top = `${item.y}%`;
            pin.dataset.id = item.id;
            pin.innerHTML = `
                <span>${idx + 1}</span>
                ${!isPureMode ? `<span class="hotspot-label">${item.word}</span>` : ''}
            `;

            pin.onclick = (e) => {
                e.stopPropagation();
                updateInspector(item, true);
                speakDanish(item.sentence);
            };

            stage.appendChild(pin);
        });

        stageCard.appendChild(stage);
        layout.appendChild(stageCard);

        // Målords præsentation boks under vrimlebilledet
        const inspector = document.createElement('div');
        inspector.className = 'vrimmel-inspector';
        inspector.id = 'smaaord-inspector-box';
        layout.appendChild(inspector);
        parent.appendChild(layout);

        function updateInspector(item, shouldScroll = false) {
            selectedWord = item;

            // Opdater aktiv pin markør på vrimlebilledet
            stage.querySelectorAll('.hotspot-pin').forEach(p => {
                p.classList.toggle('active', p.dataset.id === item.id);
            });

            const trans = getSmaaordTranslation(item);
            const currentLang = getLang();
            const langLabel = currentLang === 'da' ? 'Engelsk (støtte)' : currentLang.toUpperCase();

            const catNames = {
                'magiske': 'De 5 Magiske Småord ⭐',
                'stemning': 'Høflighed & Opmuntring',
                'talesprog': 'Talesprog & Emphase',
                'valg': 'Enighed & Præference'
            };

            inspector.innerHTML = `
                <div class="inspector-left">
                    <div class="inspector-header">
                        <div class="inspector-badge-row">
                            <span class="inspector-badge" style="background: rgba(6, 182, 212, 0.25); border: 1.5px solid #22d3ee; color: #22d3ee; font-weight: 800;">📍 Målord: ${item.word}</span>
                            <span class="inspector-badge">${catNames[item.category] || 'Samtalesmåord'}</span>
                        </div>
                        <button class="inspector-audio-btn" id="inspector-audio-btn" title="Hør udtale">🔊</button>
                    </div>

                    <h2 class="inspector-word-title">
                        <span>💬</span> ${item.word}
                    </h2>

                    <div class="inspector-trans-box">
                        <div class="trans-badge-label">
                            <span>🌐</span> OVERSÆTTELSE (${langLabel})
                        </div>
                        <div class="trans-word-val">"${trans.word}"</div>
                    </div>

                    <div class="inspector-scene-box">
                        <div class="scene-heading">📍 I frokoststuen</div>
                        <p class="scene-text">${item.sceneDesc}</p>
                    </div>
                </div>

                <div class="inspector-right">
                    <div class="inspector-sentence-card">
                        <div class="scene-heading" style="color: #22d3ee;">💬 Eksempelsætning</div>
                        <p class="sentence-quote-text">"${item.contextSentence}"</p>
                        ${trans.sentence ? `<p class="sentence-trans-text">"${trans.sentence}"</p>` : ''}
                        <button class="inspector-speak-btn" id="inspector-action-speak">
                            <span>🗣️</span> Hør sætning
                        </button>
                    </div>

                    <div class="inspector-scene-box" style="border-left: 4px solid #06b6d4;">
                        <div class="scene-heading" style="color: #22d3ee;">💡 Didaktisk samtale-regel</div>
                        <p class="scene-text">${item.ruleHint}</p>
                    </div>

                    <div class="inspector-actions">
                        <button class="inspector-btn-action" id="inspector-action-prev">
                            ← Forrige ord
                        </button>
                        <button class="inspector-btn-action" style="background: #0891b2;" id="inspector-action-next">
                            Næste ord ➔
                        </button>
                    </div>
                </div>
            `;

            // Bind events
            inspector.querySelector('#inspector-audio-btn').onclick = () => speakDanish(item.word);
            inspector.querySelector('#inspector-action-speak').onclick = () => speakDanish(item.contextSentence);

            inspector.querySelector('#inspector-action-prev').onclick = () => {
                const currentIdx = ADVERBIER_SMAAORD_DATA.findIndex(w => w.id === item.id);
                const prevIdx = (currentIdx - 1 + ADVERBIER_SMAAORD_DATA.length) % ADVERBIER_SMAAORD_DATA.length;
                const prevItem = ADVERBIER_SMAAORD_DATA[prevIdx];
                updateInspector(prevItem, true);
                speakDanish(prevItem.sentence);
            };

            inspector.querySelector('#inspector-action-next').onclick = () => {
                const currentIdx = ADVERBIER_SMAAORD_DATA.findIndex(w => w.id === item.id);
                const nextIdx = (currentIdx + 1) % ADVERBIER_SMAAORD_DATA.length;
                const nextItem = ADVERBIER_SMAAORD_DATA[nextIdx];
                updateInspector(nextItem, true);
                speakDanish(nextItem.sentence);
            };

            // Trigger animation pulse så brugeren tydeligt ser den dukker frem
            inspector.classList.remove('updated');
            void inspector.offsetWidth;
            inspector.classList.add('updated');

            if (shouldScroll) {
                inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // Initialiser inspektøren med det valgte ord
        updateInspector(selectedWord, false);
    }

    // ==========================================
    // TAB 2: AHA-VÆRKSTEDET ("Hvem ved hvad?" Matrix & Nuance-Simulatoren)
    // ==========================================
    let vaerkstedSubTab = 'matrix'; // 'matrix' or 'transformer'
    let selectedTransformWord = 'jo';

    const TRANSFORM_EXAMPLES = {
        'jo': {
            word: 'jo',
            sentence: 'Toget kommer jo klokken 14:00.',
            highlightPart: 'jo',
            effect: 'Fælles viden',
            desc: 'Det ved vi begge to i forvejen! Kig på køreplanen eller huskesedlen. Vi er 100% enige.'
        },
        'da': {
            word: 'da',
            sentence: 'Toget kommer da klokken 14:00.',
            highlightPart: 'da',
            effect: 'Selvfølgelighed & fjerner tvivl',
            desc: 'Hvorfor er du i tvivl? Selvfølgelig gør det det! Det er helt oplagt.'
        },
        'nok': {
            word: 'nok',
            sentence: 'Toget kommer nok klokken 14:00.',
            highlightPart: 'nok',
            effect: 'Eget logisk gæt & beroligelse',
            desc: 'Det er mit eget gæt baseret på skærmen, men der kan være forsinkelser. Det skal nok gå.'
        },
        'vel': {
            word: 'vel',
            sentence: 'Toget kommer vel klokken 14:00?',
            highlightPart: 'vel',
            effect: 'Appel om bekræftelse',
            desc: 'Det tror jeg, men jeg vil gerne have, at du bekræfter det: "Det er rigtigt, ikke sandt?"'
        },
        'vist': {
            word: 'vist',
            sentence: 'Toget kommer vist klokken 14:00.',
            highlightPart: 'vist',
            effect: 'Ekstern kilde / rygte',
            desc: 'Det sagde højttaleren for lidt siden, men jeg hørte det ikke helt klart udefra.'
        }
    };

    function renderTabVaerksted(parent) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'vaerksted-container';

        wrap.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2.2rem; color: #a5f3fc; margin-bottom: 0.5rem;">Aha-værkstedet: "Hvem ved hvad?"</h2>
                <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 750px; margin: 0 auto;">
                    Få det fulde overblik over de 5 magiske småord, og se hvordan en enkelt stavelse forvandler en sætnings sociale betydning.
                </p>
            </div>

            <div class="vaerksted-subtabs">
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'matrix' ? 'active' : ''}" id="v-subtab-matrix">
                    📊 1. "Hvem ved hvad?"-Matricen
                </button>
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'transformer' ? 'active' : ''}" id="v-subtab-trans">
                    🔄 2. Sætnings-Transformeren
                </button>
            </div>

            <div id="vaerksted-slot"></div>
        `;

        const slot = wrap.querySelector('#vaerksted-slot');

        wrap.querySelector('#v-subtab-matrix').onclick = () => {
            vaerkstedSubTab = 'matrix';
            renderTabVaerksted(parent);
        };
        wrap.querySelector('#v-subtab-trans').onclick = () => {
            vaerkstedSubTab = 'transformer';
            renderTabVaerksted(parent);
        };

        if (vaerkstedSubTab === 'matrix') {
            renderMatrixSubtab(slot);
        } else {
            renderTransformerSubtab(slot);
        }

        parent.appendChild(wrap);
    }

    function renderMatrixSubtab(slot) {
        const card = document.createElement('div');
        card.className = 'matrix-table-wrap';

        card.innerHTML = `
            <table class="matrix-table">
                <thead>
                    <tr>
                        <th>Småord</th>
                        <th>🗣️ Talerens viden</th>
                        <th>👂 Lytterens viden</th>
                        <th>🧭 Videnskilde</th>
                        <th>💬 Typisk hverdags-eksempel</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="matrix-row">
                        <td><span class="matrix-word-badge">jo</span></td>
                        <td>✅ Ved det</td>
                        <td>✅ Forventes at vide det</td>
                        <td>Fælles viden / Erfaring</td>
                        <td>"Vi har <strong>jo</strong> fri i morgen, for det er helligdag!"</td>
                    </tr>
                    <tr class="matrix-row">
                        <td><span class="matrix-word-badge">da</span></td>
                        <td>✅ 100% sikker</td>
                        <td>❓ Tøver / tvivler</td>
                        <td>Selvindlysende / Opmuntring</td>
                        <td>"Du må <strong>da</strong> gerne smage et stykke kage!"</td>
                    </tr>
                    <tr class="matrix-row">
                        <td><span class="matrix-word-badge">nok</span></td>
                        <td>🧐 Eget logisk gæt</td>
                        <td>❓ Ved det ikke</td>
                        <td>Egne observationer / Trøst</td>
                        <td>"Der er mange skyer, så det regner <strong>nok</strong> snart."</td>
                    </tr>
                    <tr class="matrix-row">
                        <td><span class="matrix-word-badge">vel</span></td>
                        <td>❓ Formoder det</td>
                        <td>💡 Ved det bedst</td>
                        <td>Appel om bekræftelse</td>
                        <td>"Av, du slog foden! Det gør <strong>vel</strong> ondt?"</td>
                    </tr>
                    <tr class="matrix-row">
                        <td><span class="matrix-word-badge">vist</span></td>
                        <td>👂 Har hørt det</td>
                        <td>❓ Ved det ikke</td>
                        <td>Ekstern kilde / Rygte</td>
                        <td>"Jeg hørte i radioen, at toget <strong>vist</strong> er aflyst."</td>
                    </tr>
                </tbody>
            </table>
        `;
        slot.appendChild(card);
    }

    function renderTransformerSubtab(slot) {
        const card = document.createElement('div');
        card.className = 'transformer-card';

        const curr = TRANSFORM_EXAMPLES[selectedTransformWord];

        card.innerHTML = `
            <div class="transformer-base">
                Grundlæggende information: <strong>"Toget ankommer klokken 14:00."</strong>
            </div>

            <div class="transformer-buttons-grid">
                <button class="trans-opt-btn ${selectedTransformWord === 'jo' ? 'active' : ''}" data-word="jo">jo ⭐</button>
                <button class="trans-opt-btn ${selectedTransformWord === 'da' ? 'active' : ''}" data-word="da">da ⭐</button>
                <button class="trans-opt-btn ${selectedTransformWord === 'nok' ? 'active' : ''}" data-word="nok">nok ⭐</button>
                <button class="trans-opt-btn ${selectedTransformWord === 'vel' ? 'active' : ''}" data-word="vel">vel ⭐</button>
                <button class="trans-opt-btn ${selectedTransformWord === 'vist' ? 'active' : ''}" data-word="vist">vist ⭐</button>
            </div>

            <div class="trans-display-box">
                <div class="trans-quote">
                    "${curr.sentence}"
                </div>
                <div style="font-size: 0.9rem; color: #22d3ee; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">
                    Signalerer: ${curr.effect}
                </div>
                <div class="trans-explanation">
                    ${curr.desc}
                </div>
            </div>

            <button class="action-btn-primary" id="trans-listen-btn">
                <span>🔊</span> Hør udtale i dialog
            </button>
        `;

        card.querySelectorAll('.trans-opt-btn').forEach(btn => {
            btn.onclick = () => {
                selectedTransformWord = btn.getAttribute('data-word');
                speakDanish(TRANSFORM_EXAMPLES[selectedTransformWord].sentence);
                slot.innerHTML = '';
                renderTransformerSubtab(slot);
            };
        });

        card.querySelector('#trans-listen-btn').onclick = () => {
            speakDanish(curr.sentence);
        };

        slot.appendChild(card);
    }

    // ==========================================
    // TAB 6: HELLER, HELLERE ELLER HELST? (9 øvelser)
    // ==========================================
    const HELLERE_QUESTIONS = [
        {
            dialog: 'A: "Jeg har ikke læst den nye rapport endnu."<br>B: "Det har jeg ______ ikke."',
            options: ['heller', 'hellere', 'helst'],
            correct: 'heller',
            feedback: 'Korrekt! "Heller ikke" bruges altid ved benægtelse ("ikke") til at udtrykke negativ enighed (neither / nor).',
            ruleHighlight: 'Negativ enighed ("... heller ikke")'
        },
        {
            dialog: 'A: "Vil du have kaffe eller te?"<br>B: "Tak, jeg vil ______ have kaffe end te."',
            options: ['heller', 'hellere', 'helst'],
            correct: 'hellere',
            feedback: 'Korrekt! "Hellere ... end" er komparativ og bruges ved valg mellem to muligheder (would rather / prefer A over B).',
            ruleHighlight: 'Valg mellem 2 ("A frem for B")'
        },
        {
            dialog: 'A: "Hvor i lokalet vil du sidde?"<br>B: "Hvis jeg må vælge helt frit, vil jeg ______ sidde ved vinduet."',
            options: ['heller', 'hellere', 'helst'],
            correct: 'helst',
            feedback: 'Korrekt! "Helst" er superlativ og angiver den absolut bedste løsning / 1. prioritet (most prefer / ideally).',
            ruleHighlight: 'Absolut 1. prioritet ("Allerhelst")'
        },
        {
            dialog: 'A: "Jeg forstår slet ikke det nye IT-system."<br>B: "Nej, jeg forstår det ærlig talt ______ ikke!"',
            options: ['heller', 'hellere', 'helst'],
            correct: 'heller',
            feedback: 'Korrekt! Sætningen indeholder "ikke", så her hedder det altid "heller" (negativ enighed).',
            ruleHighlight: 'Negativ enighed med "ikke"'
        },
        {
            dialog: 'A: "Skal vi tage bussen eller cykle i det fine vejr?"<br>B: "Solen skinner, så jeg cykler ______!"',
            options: ['heller', 'hellere', 'helst'],
            correct: 'hellere',
            feedback: 'Korrekt! Valg af cyklen frem for bussen (to alternativer) ➔ "hellere".',
            ruleHighlight: 'Komparativ præference'
        },
        {
            dialog: 'A: "Hvilken ret på frokostmenuen frister dig mest?"<br>B: "Jeg vil ______ have dagens laks, den ser fantastisk ud."',
            options: ['heller', 'hellere', 'helst'],
            correct: 'helst',
            feedback: 'Korrekt! Din klare favorit blandt alle muligheder på menukortet ➔ "helst".',
            ruleHighlight: 'Superlativ / Førstevalg'
        },
        {
            dialog: 'A: "Peter kunne ikke komme til personalemødet i dag."<br>B: "Nej, og Maria kunne desværre ______ ikke nå det."',
            options: ['heller', 'hellere', 'helst'],
            correct: 'heller',
            feedback: 'Korrekt! Fælles benægtelse: Maria kunne heller ikke nå det.',
            ruleHighlight: 'Fælles benægtelse ("heller ikke")'
        },
        {
            dialog: 'A: "Skal vi gå i biografen eller blive hjemme og se en film?"<br>B: "Jeg vil ______ blive hjemme på sofaen i aften."',
            options: ['heller', 'hellere', 'helst'],
            correct: 'hellere',
            feedback: 'Korrekt! Sammenligning mellem to forslag ("blive hjemme frem for biografen") ➔ "hellere".',
            ruleHighlight: 'Valg mellem 2 forslag'
        },
        {
            dialog: 'A: "Hvad tid på dagen arbejder du bedst?"<br>B: "Jeg arbejder ______ om formiddagen, hvor jeg er mest frisk."',
            options: ['heller', 'hellere', 'helst'],
            correct: 'helst',
            feedback: 'Korrekt! Din generelle, optimale præference over alle andre tider ➔ "helst".',
            ruleHighlight: 'Overordnet favorit / 1. valg'
        }
    ];

    let hellereIdx = 0;
    let hellereScore = 0;
    let hellereAnswers = new Array(HELLERE_QUESTIONS.length).fill(null);

    function renderTabHellere(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'special-tab-container';

        // Introduktion og Regelkort
        container.innerHTML = `
            <div class="special-intro-box">
                <h2>Heller, hellere eller helst? ⚖️</h2>
                <p>
                    Tre ord der lyder næsten ens, men har vidt forskellige funktioner. Lær den gyldne forskel på <strong>negativ enighed</strong> og <strong>personlig præference</strong>:
                </p>
            </div>

            <!-- 3 Gyldne Regelkort -->
            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color: rgba(239, 68, 68, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #f87171;">
                            <span>🔴</span> heller
                        </div>
                        <span class="special-rule-role" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid #ef4444;">Negation</span>
                    </div>
                    <div class="special-rule-desc">
                        Bruges <strong>altid</strong> sammen med nægtelse (<em>ikke</em>, <em>aldrig</em>) for at udtrykke negativ enighed ("heller ikke" = neither / nor).
                    </div>
                    <div class="special-rule-example" style="border-left-color: #ef4444;">
                        <span>"Det ved jeg <strong>heller</strong> ikke."</span>
                        <button class="rule-speak-btn" data-speak="Det ved jeg heller ikke.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(34, 211, 238, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #22d3ee;">
                            <span>🟡</span> hellere
                        </div>
                        <span class="special-rule-role" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; border: 1px solid #06b6d4;">Komparativ</span>
                    </div>
                    <div class="special-rule-desc">
                        Bruges ved et <strong>valg mellem to alternativer</strong> ("A frem for B" / would rather / prefer).
                    </div>
                    <div class="special-rule-example" style="border-left-color: #06b6d4;">
                        <span>"Jeg vil <strong>hellere</strong> have te end kaffe."</span>
                        <button class="rule-speak-btn" data-speak="Jeg vil hellere have te end kaffe.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(34, 197, 94, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #4ade80;">
                            <span>🟢</span> helst
                        </div>
                        <span class="special-rule-role" style="background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid #22c55e;">Superlativ</span>
                    </div>
                    <div class="special-rule-desc">
                        Bruges om den <strong>absolut bedste løsning</strong> / 1. prioritet blandt alle muligheder (most prefer / ideally).
                    </div>
                    <div class="special-rule-example" style="border-left-color: #22c55e;">
                        <span>"Jeg vil <strong>helst</strong> blive hjemme i dag."</span>
                        <button class="rule-speak-btn" data-speak="Jeg vil helst blive hjemme i dag.">🔊</button>
                    </div>
                </div>
            </div>

            <div id="hellere-exercise-area"></div>
        `;

        // Bind audio on rule cards
        container.querySelectorAll('.rule-speak-btn').forEach(b => {
            b.onclick = () => speakDanish(b.getAttribute('data-speak'));
        });

        const exArea = container.querySelector('#hellere-exercise-area');
        renderHellereQuestion(exArea, parent);

        parent.appendChild(container);
    }

    function renderHellereQuestion(exArea, parentContainer) {
        exArea.innerHTML = '';

        if (hellereIdx >= HELLERE_QUESTIONS.length) {
            // Result / Celebration
            const resultCard = document.createElement('div');
            resultCard.className = 'score-celebration-card';
            resultCard.innerHTML = `
                <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🎉</div>
                <h3 style="font-size: 2rem; color: #a5f3fc; margin-bottom: 0.6rem;">Fremragende klaret!</h3>
                <p style="font-size: 1.25rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    Du fik <strong>${hellereScore}</strong> ud af <strong>${HELLERE_QUESTIONS.length}</strong> rigtige i præference-testen.
                </p>
                <div style="background: rgba(15, 23, 42, 0.7); padding: 1.2rem; border-radius: 12px; max-width: 500px; margin: 0 auto 2rem; text-align: left; font-size: 0.95rem; line-height: 1.5; color: #cbd5e1;">
                    ✔️ <strong>Huskereglen:</strong><br>
                    • <em>ikke</em> / <em>aldrig</em> ➔ altid <strong>heller</strong><br>
                    • Valg mellem to ting ➔ <strong>hellere</strong><br>
                    • Førstevalg / favorit ➔ <strong>helst</strong>
                </div>
                <button class="action-btn-primary" id="hellere-restart-btn">
                    <span>🔄</span> Start forfra
                </button>
            `;
            resultCard.querySelector('#hellere-restart-btn').onclick = () => {
                hellereIdx = 0;
                hellereScore = 0;
                hellereAnswers = new Array(HELLERE_QUESTIONS.length).fill(null);
                renderTabHellere(parentContainer);
            };
            exArea.appendChild(resultCard);
            return;
        }

        const q = HELLERE_QUESTIONS[hellereIdx];
        const isAnswered = hellereAnswers[hellereIdx] !== null;

        const card = document.createElement('div');
        card.className = 'exercise-action-card';

        card.innerHTML = `
            <div class="progress-header">
                <span>Spørgsmål ${hellereIdx + 1} af ${HELLERE_QUESTIONS.length}</span>
                <span>Score: ${hellereScore} / ${HELLERE_QUESTIONS.length}</span>
            </div>

            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${((hellereIdx + 1) / HELLERE_QUESTIONS.length) * 100}%;"></div>
            </div>

            <div class="detektiv-context-tag">
                <span>⚖️</span> ${q.ruleHighlight}
            </div>

            <div class="exercise-dialog-quote">
                ${q.dialog}
            </div>

            <div class="detektiv-options-grid" id="hellere-opts-grid"></div>

            <div class="detektiv-feedback-box ${isAnswered ? 'show ' + (hellereAnswers[hellereIdx] === q.correct ? 'correct' : 'wrong') : ''}" id="hellere-fb">
                ${isAnswered ? (hellereAnswers[hellereIdx] === q.correct ? `<strong>Flot!</strong> ${q.feedback}` : `<strong>Husk reglen:</strong> ${q.feedback}`) : ''}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                <button class="filter-btn" id="hellere-prev-btn" ${hellereIdx === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                    ← Forrige
                </button>
                <button class="action-btn-primary" id="hellere-next-btn">
                    ${hellereIdx < HELLERE_QUESTIONS.length - 1 ? 'Næste spørgsmål ➔' : 'Se samlet resultat 🏆'}
                </button>
            </div>
        `;

        const optsGrid = card.querySelector('#hellere-opts-grid');
        const fb = card.querySelector('#hellere-fb');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `detektiv-opt-btn ${isAnswered ? (opt === q.correct ? 'correct' : (opt === hellereAnswers[hellereIdx] ? 'wrong' : '')) : ''}`;
            btn.textContent = opt;

            btn.onclick = () => {
                if (hellereAnswers[hellereIdx] !== null) return;
                hellereAnswers[hellereIdx] = opt;

                if (opt === q.correct) {
                    hellereScore++;
                    btn.classList.add('correct');
                    fb.className = 'detektiv-feedback-box show correct';
                    fb.innerHTML = `<strong>Rigtigt!</strong> ${q.feedback}`;
                    speakDanish(q.dialog.replace(/<[^>]*>?/gm, ' ').replace('______', opt));
                } else {
                    btn.classList.add('wrong');
                    fb.className = 'detektiv-feedback-box show wrong';
                    fb.innerHTML = `<strong>Ikke helt:</strong> ${q.feedback}`;
                    // Highlight correct
                    optsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => {
                        if (b.textContent === q.correct) b.classList.add('correct');
                    });
                }
            };

            optsGrid.appendChild(btn);
        });

        card.querySelector('#hellere-prev-btn').onclick = () => {
            if (hellereIdx > 0) {
                hellereIdx--;
                renderHellereQuestion(exArea, parentContainer);
            }
        };

        card.querySelector('#hellere-next-btn').onclick = () => {
            hellereIdx++;
            renderHellereQuestion(exArea, parentContainer);
        };

        exArea.appendChild(card);
    }

    // ==========================================
    // TAB 7: FORSTÆRKERNE (sgu, mon ikke, skam, sandelig) (9 øvelser)
    // ==========================================
    const BOOSTER_QUESTIONS = [
        {
            dialog: 'A: "Er du helt sikker på, at jeg må tage kage i kantinen?"<br>B: "Ja, det kan du ______ roligt tro på! Værsgo og tag et stykke."',
            options: ['skam', 'sgu', 'mon ikke', 'vist'],
            correct: 'skam',
            feedback: 'Korrekt! "Skam" bruges som en høflig og venlig forsikring ("certainly / indeed"), der fjerner modpartens tøven eller beskedenhed.',
            badge: '🤝 Høflig forsikring'
        },
        {
            dialog: 'A: "Vejrudsigten truer med mørke skyer i eftermiddag."<br>B: "Bare rolig, ______ det holder tørvejr, indtil vi når frem?"',
            options: ['mon ikke', 'skam', 'sgu', 'sandelig'],
            correct: 'mon ikke',
            feedback: 'Korrekt! "Mon ikke" bruges til at tænke højt og udtrykke en formodning, man har stor tillid til ("surely / won\'t it...").',
            badge: '🔮 Håbefuld formodning'
        },
        {
            dialog: 'Kollegaen smiler overvældet over nyheden:<br>"Hvad, fik du jobbet?! Det var ______ en fantastisk nyhed!"',
            options: ['sgu', 'skam', 'mon ikke', 'nok'],
            correct: 'sgu',
            feedback: 'Korrekt! "Sgu" giver sætningen saft og kraft i uformelt hverdagssprog blandt venner og kolleger ("damn well / truly").',
            badge: '🌶️ Uformel emphase'
        },
        {
            dialog: 'Chefen roser teamet efter en stor indsats:<br>"I har ______ leveret et imponerende stykke arbejde i denne uge."',
            options: ['sandelig', 'sgu', 'mon ikke', 'ellers'],
            correct: 'sandelig',
            feedback: 'Korrekt! "Sandelig" bruges i en mere formel eller eftertrykkelig tone til at udtrykke oprigtig beundring og sandhed ("indeed / truly").',
            badge: '✨ Højtidelig bekræftelse'
        },
        {
            dialog: 'A: "Undskyld hvis jeg forstyrrer dig midt i frokostpausen!"<br>B: "Du forstyrrer ______ overhovedet ikke, sæt dig bare ned!"',
            options: ['skam', 'sgu', 'mon ikke', 'vel'],
            correct: 'skam',
            feedback: 'Korrekt! "Du forstyrrer skam overhovedet ikke" er den klassiske, venlige måde at fjerne en andens undskyldning på.',
            badge: '🤝 Venlig beroligelse'
        },
        {
            dialog: 'A: "Klokken er 14:25, og toget kører 14:30!"<br>B: "Slap bare af, ______ vi når det inden afgang?"',
            options: ['mon ikke', 'skam', 'sgu', 'engang'],
            correct: 'mon ikke',
            feedback: 'Korrekt! "Mon ikke vi når det?" beroliger med en forventning om, at det nok skal lykkes.',
            badge: '🔮 Tillidsfuld forventning'
        },
        {
            dialog: 'Kollegaen leder forvirret i tasken og på skrivebordet:<br>"Hvor er mine nøgler? De lå ______ lige her for to minutter siden!"',
            options: ['sgu', 'skam', 'mon ikke', 'vist'],
            correct: 'sgu',
            feedback: 'Korrekt! "De lå sgu lige her!" udtrykker ægte hverdags-forundring og tryk på udsagnet.',
            badge: '🌶️ Hverdags-eftertryk'
        },
        {
            dialog: 'A: "Vinteren i år har været ualmindelig kold og lang."<br>B: "Ja, det må man ______ sige!"',
            options: ['sandelig', 'mon ikke', 'lige', 'ellers'],
            correct: 'sandelig',
            feedback: 'Korrekt! Den faste vending "Det må man sandelig sige!" understreger 100% oprigtig enighed.',
            badge: '✨ Oprigtig enighed'
        },
        {
            dialog: 'A: "Huskede du at betale regningen til tiden?"<br>B: "Ja da, den har jeg ______ betalt for længe siden!"',
            options: ['skam', 'mon ikke', 'sgu', 'vel'],
            correct: 'skam',
            feedback: 'Korrekt! "Den har jeg skam betalt" forsikrer roligt og høfligt om, at sagen er i orden.',
            badge: '🤝 Høflig forsikring'
        }
    ];

    let boostersIdx = 0;
    let boostersScore = 0;
    let boostersAnswers = new Array(BOOSTER_QUESTIONS.length).fill(null);

    function renderTabBoosters(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'special-tab-container';

        // Introduktion og Booster-oversigt
        container.innerHTML = `
            <div class="special-intro-box">
                <h2>Forstærkende ord & samtale-boostere 💥</h2>
                <p>
                    Danskere krydrer deres sprog med småord, der viser entusiasme, høflig forsikring eller overbevisning. Mestre de fire mest almindelige hverdags-boostere:
                </p>
            </div>

            <!-- 4 Booster Regelkort -->
            <div class="special-rule-cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));">
                <div class="special-rule-card" style="border-color: rgba(249, 115, 22, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #fb923c;">
                            <span>🌶️</span> sgu
                        </div>
                        <span class="special-rule-role" style="background: rgba(249, 115, 22, 0.2); color: #fdba74; border: 1px solid #f97316;">Uformel</span>
                    </div>
                    <div class="special-rule-desc">
                        Giver sætningen <strong>kraft og saft</strong> blandt venner og kolleger. Ikke et grimt bandeord, men et folkeligt eftertryk.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #f97316;">
                        <span>"Det passer <strong>sgu</strong>!"</span>
                        <button class="rule-speak-btn" data-speak="Det passer sgu!">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(168, 85, 247, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #c084fc;">
                            <span>🔮</span> mon ikke
                        </div>
                        <span class="special-rule-role" style="background: rgba(168, 85, 247, 0.2); color: #d8b4fe; border: 1px solid #a855f7;">Formodning</span>
                    </div>
                    <div class="special-rule-desc">
                        Udtrykker en <strong>håbefuld forventning med tillid</strong> ("surely / won't it..."). Tænker højt for at berolige.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #a855f7;">
                        <span>"<strong>Mon ikke</strong> det går?"</span>
                        <button class="rule-speak-btn" data-speak="Mon ikke det går?">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(16, 185, 129, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #34d399;">
                            <span>🤝</span> skam
                        </div>
                        <span class="special-rule-role" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid #10b981;">Høflig</span>
                    </div>
                    <div class="special-rule-desc">
                        En <strong>venlig og beroligende forsikring</strong> ("certainly / indeed"), der fjerner tvivl eller undskyldninger.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #10b981;">
                        <span>"Det kan du <strong>skam</strong> godt!"</span>
                        <button class="rule-speak-btn" data-speak="Det kan du skam godt!">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(234, 179, 8, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #facc15;">
                            <span>✨</span> sandelig
                        </div>
                        <span class="special-rule-role" style="background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid #eab308;">Eftertryk</span>
                    </div>
                    <div class="special-rule-desc">
                        En <strong>højtidelig eller oprigtig bekræftelse</strong> ("truly / indeed"), der viser stærk anerkendelse eller enighed.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #eab308;">
                        <span>"Det var <strong>sandelig</strong> flot!"</span>
                        <button class="rule-speak-btn" data-speak="Det var sandelig flot!">🔊</button>
                    </div>
                </div>
            </div>

            <div id="boosters-exercise-area"></div>
        `;

        // Bind audio on rule cards
        container.querySelectorAll('.rule-speak-btn').forEach(b => {
            b.onclick = () => speakDanish(b.getAttribute('data-speak'));
        });

        const exArea = container.querySelector('#boosters-exercise-area');
        renderBoostersQuestion(exArea, parent);

        parent.appendChild(container);
    }

    function renderBoostersQuestion(exArea, parentContainer) {
        exArea.innerHTML = '';

        if (boostersIdx >= BOOSTER_QUESTIONS.length) {
            // Result / Celebration
            const resultCard = document.createElement('div');
            resultCard.className = 'score-celebration-card';
            resultCard.innerHTML = `
                <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🌟</div>
                <h3 style="font-size: 2rem; color: #a5f3fc; margin-bottom: 0.6rem;">Flot samtale-mesterskab!</h3>
                <p style="font-size: 1.25rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    Du fik <strong>${boostersScore}</strong> ud af <strong>${BOOSTER_QUESTIONS.length}</strong> rigtige i booster-testen.
                </p>
                <div style="background: rgba(15, 23, 42, 0.7); padding: 1.2rem; border-radius: 12px; max-width: 500px; margin: 0 auto 2rem; text-align: left; font-size: 0.95rem; line-height: 1.5; color: #cbd5e1;">
                    ✔️ <strong>Hurtigt overblik over boosterne:</strong><br>
                    • <strong>sgu:</strong> Uformel kraft og saft mellem venner<br>
                    • <strong>mon ikke:</strong> Håbefuld formodning med tillid<br>
                    • <strong>skam:</strong> Venlig og høflig forsikring<br>
                    • <strong>sandelig:</strong> Oprigtig anerkendelse og stærk enighed
                </div>
                <button class="action-btn-primary" id="boosters-restart-btn">
                    <span>🔄</span> Start forfra
                </button>
            `;
            resultCard.querySelector('#boosters-restart-btn').onclick = () => {
                boostersIdx = 0;
                boostersScore = 0;
                boostersAnswers = new Array(BOOSTER_QUESTIONS.length).fill(null);
                renderTabBoosters(parentContainer);
            };
            exArea.appendChild(resultCard);
            return;
        }

        const q = BOOSTER_QUESTIONS[boostersIdx];
        const isAnswered = boostersAnswers[boostersIdx] !== null;

        const card = document.createElement('div');
        card.className = 'exercise-action-card';

        card.innerHTML = `
            <div class="progress-header">
                <span>Spørgsmål ${boostersIdx + 1} af ${BOOSTER_QUESTIONS.length}</span>
                <span>Score: ${boostersScore} / ${BOOSTER_QUESTIONS.length}</span>
            </div>

            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${((boostersIdx + 1) / BOOSTER_QUESTIONS.length) * 100}%;"></div>
            </div>

            <div class="detektiv-context-tag">
                ${q.badge}
            </div>

            <div class="exercise-dialog-quote">
                ${q.dialog}
            </div>

            <div class="detektiv-options-grid" id="boosters-opts-grid"></div>

            <div class="detektiv-feedback-box ${isAnswered ? 'show ' + (boostersAnswers[boostersIdx] === q.correct ? 'correct' : 'wrong') : ''}" id="boosters-fb">
                ${isAnswered ? (boostersAnswers[boostersIdx] === q.correct ? `<strong>Flot!</strong> ${q.feedback}` : `<strong>Prøv igen:</strong> ${q.feedback}`) : ''}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                <button class="filter-btn" id="boosters-prev-btn" ${boostersIdx === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                    ← Forrige
                </button>
                <button class="action-btn-primary" id="boosters-next-btn">
                    ${boostersIdx < BOOSTER_QUESTIONS.length - 1 ? 'Næste spørgsmål ➔' : 'Se samlet resultat 🏆'}
                </button>
            </div>
        `;

        const optsGrid = card.querySelector('#boosters-opts-grid');
        const fb = card.querySelector('#boosters-fb');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `detektiv-opt-btn ${isAnswered ? (opt === q.correct ? 'correct' : (opt === boostersAnswers[boostersIdx] ? 'wrong' : '')) : ''}`;
            btn.textContent = opt;

            btn.onclick = () => {
                if (boostersAnswers[boostersIdx] !== null) return;
                boostersAnswers[boostersIdx] = opt;

                if (opt === q.correct) {
                    boostersScore++;
                    btn.classList.add('correct');
                    fb.className = 'detektiv-feedback-box show correct';
                    fb.innerHTML = `<strong>Rigtigt!</strong> ${q.feedback}`;
                    speakDanish(q.dialog.replace(/<[^>]*>?/gm, ' ').replace('______', opt));
                } else {
                    btn.classList.add('wrong');
                    fb.className = 'detektiv-feedback-box show wrong';
                    fb.innerHTML = `<strong>Ikke helt:</strong> ${q.feedback}`;
                    // Highlight correct
                    optsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => {
                        if (b.textContent === q.correct) b.classList.add('correct');
                    });
                }
            };

            optsGrid.appendChild(btn);
        });

        card.querySelector('#boosters-prev-btn').onclick = () => {
            if (boostersIdx > 0) {
                boostersIdx--;
                renderBoostersQuestion(exArea, parentContainer);
            }
        };

        card.querySelector('#boosters-next-btn').onclick = () => {
            boostersIdx++;
            renderBoostersQuestion(exArea, parentContainer);
        };

        exArea.appendChild(card);
    }

    // ==========================================
    // TAB 3: DIALOG-DETEKTIVEN (10 dybdegående gåder)
    // ==========================================
    const DETEKTIV_QUESTIONS = [
        {
            context: '📻 Nyheder fra radioen',
            prompt: 'Du hørte i morges en vejrudsigt i radioen. Hvilket småord viser, at din viden kommer fra en ekstern kilde?',
            quote: 'Jeg hørte i radioen i morges, at det ______ bliver regnvejr i eftermiddag.',
            options: ['nok', 'vel', 'vist'],
            correct: 'vist',
            hints: {
                nok: 'Nej. "Nok" udtrykker dit eget personlige gæt – men her bygger du på radioens officielle kilde.',
                vel: 'Nej. "Vel" appellerer til lytterens bekræftelse, men du videregiver en melding, du har hørt udefra.',
                vist: 'Korrekt! Du bruger "vist", fordi din viden stammer fra en ekstern kilde (radioen).'
            }
        },
        {
            context: '🩹 En kollega slår sig',
            prompt: 'En kollega skærer sig i fingeren i køkkenet. Du ser det ske og henvender dig direkte for at vise medfølelse:',
            quote: 'Av, du skar dig! Det gør ______ ondt?',
            options: ['nok', 'vel', 'vist'],
            correct: 'vel',
            hints: {
                nok: 'Nej. Du kan ikke selv mærke smerten, så det er ikke en neutral logisk beregning.',
                vist: 'Nej. Du har ikke hørt det som et rygte udefra – du står lige over for kollegaen.',
                vel: 'Korrekt! Du bruger "vel", fordi du appellerer direkte til modtagerens egen oplevelse ("ikke sandt?").'
            }
        },
        {
            context: '☁️ Mørke tordenskyer på himlen',
            prompt: 'Du kigger ud ad vinduet og ser tykke, sorte skyer. Hvilket ord viser din egen logiske konklusion?',
            quote: 'Mørke skyer trækker op. Det bliver ______ regnvejr.',
            options: ['nok', 'vel', 'vist'],
            correct: 'nok',
            hints: {
                vel: 'Nej. Du søger ikke bekræftelse, du drager en selvstændig logisk slutning ud fra skyerne.',
                vist: 'Nej. Du har ikke hørt det fra andre udefra; du observerer selv himlen.',
                nok: 'Korrekt! Du bruger "nok", fordi det er din egen logiske vurdering baseret på det, du ser.'
            }
        },
        {
            context: '🗣️ Kollegaens rapport',
            prompt: 'Peter kom ud fra chefen og så bekymret ud. Han sagde noget til dig, som du nu fortæller videre:',
            quote: 'Peter sagde til mig, at mødet ______ gik meget dårligt.',
            options: ['nok', 'vel', 'vist'],
            correct: 'vist',
            hints: {
                nok: 'Nej. Det er ikke din egen vurdering, du videreformidler Peters ord.',
                vel: 'Nej. Du appellerer ikke om enighed.',
                vist: 'Korrekt! "Vist" refererer til andres ord og rygter som din kilde.'
            }
        },
        {
            context: '📊 Regnearket og tidsplanen',
            prompt: 'Du har siddet hele formiddagen og beregnet tallene for projektet. Nu konkluderer du:',
            quote: 'Jeg har kigget grundigt på tallene, og vi klarer den ______ inden deadline.',
            options: ['nok', 'vel', 'vist'],
            correct: 'nok',
            hints: {
                vel: 'Nej. Du har selv lavet beregningerne og fremlægger din konklusion.',
                vist: 'Nej. Du bygger ikke på rygter, men på dine egne tal.',
                nok: 'Korrekt! "Nok" udtrykker din egen velovervejede vurdering af situationen.'
            }
        },
        {
            context: '🇩🇰 Sprogkundskaber i hverdagen',
            prompt: 'Du taler med en kollega, der har boet fem år i Danmark. Du forventer et bekræftende ja:',
            quote: 'Du har boet i Danmark i fem år, så du forstår ______ dansk nu?',
            options: ['nok', 'vel', 'vist'],
            correct: 'vel',
            hints: {
                nok: 'Nej. Du henvender dig direkte til personen og forventer en bekræftelse.',
                vist: 'Nej. Du kender personens baggrund, så det er et forventende spørgsmål.',
                vel: 'Korrekt! "Vel" bruges som en stærk forventning rettet mod modtageren.'
            }
        },
        {
            context: '✏️ Låne en blyant ved bordet',
            prompt: 'En kollega spørger: "Må jeg låne din blyant et øjeblik?" Hvad svarer du for at være imødekommende og fjerne al tvivl?',
            quote: 'Ja, det må du ______ gerne!',
            options: ['da', 'jo', 'vist'],
            correct: 'da',
            hints: {
                jo: 'Nej. "Jo" betyder fælles viden ("det ved du jo"), men her giver du tilladelse.',
                vist: 'Nej. "Vist" udtrykker usikkerhed eller rygte.',
                da: 'Korrekt! "Da" fjerner enhver tøven: "Selvfølgelig må du det, tag den endelig!"'
            }
        },
        {
            context: '☀️ Solskin og overtøj',
            prompt: 'Din ven ser dig tage overtøj på og spørger hvorfor. I har aftalt at gå en tur lige om lidt:',
            quote: 'Hvorfor tager du jakke på? – Vi skal ______ ud at gå en tur lige om lidt!',
            options: ['jo', 'nok', 'vel'],
            correct: 'jo',
            hints: {
                nok: 'Nej. Det er ikke et gæt – I har en fast fælles aftale.',
                vel: 'Nej. Du minder modtageren om noget, I begge to godt ved.',
                jo: 'Korrekt! "Jo" henviser til jeres fælles viden og aftale ("det ved vi jo begge").'
            }
        },
        {
            context: '🎂 Fødselsdagskagen på kontoret',
            prompt: 'En kasse kage står på bordet, men ingen rører den. Du hørte nogen sige, at teamet lige har spist:',
            quote: 'De tager ikke kage, for de har ______ lige spist frokost.',
            options: ['vist', 'nok', 'vel'],
            correct: 'vist',
            hints: {
                nok: 'Nej. Du bygger på noget, du hørte andre sige udefra.',
                vel: 'Nej. Du appellerer ikke til modtagerens oplevelse.',
                vist: 'Korrekt! "Vist" viser, at du videregiver noget, du har hørt fra andre.'
            }
        },
        {
            context: '☔ Paraplyen i entreen',
            prompt: 'Din bofælle siger "Husk paraplyen!", men himlen er fuldstændig skyfri. Du kigger ud:',
            quote: 'Det behøver jeg ikke, solen skinner og det regner ______ ikke i dag!',
            options: ['jo', 'da', 'vist'],
            correct: 'jo',
            hints: {
                da: 'Nej. "Da" bruges ofte til opmuntring eller indrømmelse.',
                vist: 'Nej. Du kan se det med dine egne øjne, så det er ikke et usikkert rygte.',
                jo: 'Korrekt! "Jo" appellerer til det åbenlyse faktum, I begge kan se lige foran jer.'
            }
        }
    ];

    let detektivIdx = 0;

    function renderTabDetektiv(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'detektiv-container';

        const q = DETEKTIV_QUESTIONS[detektivIdx];

        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.5rem; color: #a5f3fc; margin: 0;">Dialog-Detektiven (10 gåder)</h3>
                <span style="color: #94a3b8; font-weight: 800;">Gåde ${detektivIdx + 1} af ${DETEKTIV_QUESTIONS.length}</span>
            </div>

            <div class="detektiv-card">
                <div class="detektiv-context-tag">${q.context}</div>
                <div class="detektiv-prompt-text">${q.prompt}</div>
                <div class="detektiv-sentence-quote">"${q.quote}"</div>

                <div class="detektiv-options-grid" id="detektiv-opts"></div>
                <div class="detektiv-feedback-box" id="detektiv-feedback"></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="filter-btn" id="detektiv-prev-btn" ${detektivIdx === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                    ← Forrige gåde
                </button>
                <button class="action-btn-primary" id="detektiv-next-btn">
                    ${detektivIdx < DETEKTIV_QUESTIONS.length - 1 ? 'Næste gåde ➔' : 'Start forfra 🔄'}
                </button>
            </div>
        `;

        const optsGrid = container.querySelector('#detektiv-opts');
        const feedbackBox = container.querySelector('#detektiv-feedback');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => b.classList.remove('correct', 'wrong'));
                feedbackBox.className = 'detektiv-feedback-box show';

                if (opt === q.correct) {
                    btn.classList.add('correct');
                    feedbackBox.classList.add('correct');
                    feedbackBox.innerHTML = `<strong>Korrekt!</strong> ${q.hints[opt]}`;
                    speakDanish(q.quote.replace('______', opt));
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.classList.add('wrong');
                    feedbackBox.innerHTML = `<strong>Prøv igen:</strong> ${q.hints[opt]}`;
                }
            };

            optsGrid.appendChild(btn);
        });

        container.querySelector('#detektiv-prev-btn').onclick = () => {
            if (detektivIdx > 0) {
                detektivIdx--;
                renderTabDetektiv(parent);
            }
        };

        container.querySelector('#detektiv-next-btn').onclick = () => {
            if (detektivIdx < DETEKTIV_QUESTIONS.length - 1) {
                detektivIdx++;
            } else {
                detektivIdx = 0;
            }
            renderTabDetektiv(parent);
        };

        parent.appendChild(container);
    }

    // ==========================================
    // TAB 4: SÆTNINGSBYGGEREN (To-trins model med konsistente farver)
    // ==========================================
    const BUILDER_SENTENCES = [
        {
            subjekt: 'Vi',
            verbum: 'drikker',
            smaaord: 'jo',
            rest: 'kaffe i pausen',
            options: ['jo', 'nok', 'vel', 'da'],
            correctWord: 'jo',
            hint: 'Fælles viden for alle kolleger i frokoststuen.'
        },
        {
            subjekt: 'Han',
            verbum: 'kommer',
            smaaord: 'nok',
            rest: 'om ti minutter',
            options: ['nok', 'vist', 'vel', 'jo'],
            correctWord: 'nok',
            hint: 'Talerens eget logiske gæt baseret på klokken.'
        },
        {
            subjekt: 'Du',
            verbum: 'kender',
            smaaord: 'vel',
            rest: 'vores nye kollega?',
            options: ['vel', 'nok', 'vist', 'da'],
            correctWord: 'vel',
            hint: 'Taler appellerer om bekræftelse fra lytteren.'
        },
        {
            subjekt: 'Hun',
            verbum: 'hjælper',
            smaaord: 'da',
            rest: 'gerne med opgaven',
            options: ['da', 'jo', 'vel', 'nok'],
            correctWord: 'da',
            hint: 'Selvfølgelighed og venlig opmuntring.'
        },
        {
            subjekt: 'Mødet',
            verbum: 'blev',
            smaaord: 'vist',
            rest: 'aflyst af chefen',
            options: ['vist', 'nok', 'vel', 'da'],
            correctWord: 'vist',
            hint: 'Rygte eller ekstern kilde udefra.'
        },
        {
            subjekt: 'De',
            verbum: 'forstår',
            smaaord: 'godt',
            rest: 'den svære besked',
            options: ['godt', 'sgu', 'mon', 'nu'],
            correctWord: 'godt',
            hint: 'Indrømmelse og sympati for situationen.'
        },
        {
            subjekt: 'Jeg',
            verbum: 'vil',
            smaaord: 'hellere',
            rest: 'have kaffe i dag',
            options: ['heller', 'hellere', 'helst', 'nok'],
            correctWord: 'hellere',
            hint: 'Præference mellem to muligheder (kaffe frem for te).'
        },
        {
            subjekt: 'Det',
            verbum: 'var',
            smaaord: 'sgu',
            rest: 'en god idé',
            options: ['sgu', 'skam', 'heller', 'vel'],
            correctWord: 'sgu',
            hint: 'Uformel emphase og folkelig understregning.'
        }
    ];

    let builderSentenceIdx = 0;
    let builderStep = 1; // 1 = Vælg småord, 2 = Puslespil
    let puzzlePlaced = { subjekt: null, verbum: null, smaaord: null, rest: null };

    function renderTabBuilder(parent) {
        parent.innerHTML = '';

        const current = BUILDER_SENTENCES[builderSentenceIdx];
        const container = document.createElement('div');
        container.className = 'builder-container';

        const card = document.createElement('div');
        card.className = 'builder-card';

        // Step 1: Vælg det rigtige småord i sætningen med tydeligt markeret felt
        if (builderStep === 1) {
            card.innerHTML = `
                <div class="builder-step-badge">
                    <span>1️⃣</span> Trin 1: Vælg det rette småord i sætningslinjen
                </div>

                <h3 style="font-size: 1.4rem; color: white; margin-bottom: 0.5rem;">
                    Opgave ${builderSentenceIdx + 1} af ${BUILDER_SENTENCES.length}
                </h3>
                <p style="color: #94a3b8; font-size: 1rem; margin-bottom: 1.5rem;">
                    Kontekst: <em>${current.hint}</em>
                </p>

                <!-- Architecture flow diagram -->
                <div class="flow-container">
                    <div class="flow-step flow-subjekt">
                        <div class="flow-step-num">1. SUBJEKT</div>
                        <div class="flow-step-title">Hvem handler?</div>
                    </div>
                    <div class="flow-step flow-verbum">
                        <div class="flow-step-num">2. VERBUM</div>
                        <div class="flow-step-title">Hvad sker der?</div>
                    </div>
                    <div class="flow-step flow-smaaord">
                        <div class="flow-step-num">3. SMÅORD 💬</div>
                        <div class="flow-step-title">Hvem ved hvad?</div>
                    </div>
                    <div class="flow-step flow-rest">
                        <div class="flow-step-num">4. RESTLED</div>
                        <div class="flow-step-title">Hvad / hvor / hvornår?</div>
                    </div>
                </div>

                <!-- Display sentence with explicit blank slot -->
                <div class="sb-sentence-display">
                    <span>${current.subjekt}</span>
                    <span>${current.verbum}</span>
                    <span class="sb-blank-slot" id="sb-live-blank">_______</span>
                    <span>${current.rest}</span>
                </div>

                <div style="font-weight: 800; color: #22d3ee; margin-bottom: 1rem; text-align: center;">
                    Hvilket småord passer bedst her?
                </div>

                <div class="detektiv-options-grid" id="step1-opts"></div>
                <div class="detektiv-feedback-box" id="step1-feedback"></div>
            `;

            const optsGrid = card.querySelector('#step1-opts');
            const feedbackBox = card.querySelector('#step1-feedback');
            const blankSlot = card.querySelector('#sb-live-blank');

            current.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'detektiv-opt-btn';
                btn.textContent = opt;

                btn.onclick = () => {
                    optsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => b.classList.remove('correct', 'wrong'));
                    feedbackBox.className = 'detektiv-feedback-box show';

                    if (opt === current.correctWord) {
                        btn.classList.add('correct');
                        blankSlot.classList.add('filled');
                        blankSlot.textContent = opt;
                        feedbackBox.classList.add('correct');
                        feedbackBox.innerHTML = `
                            <strong>Perfekt!</strong> "${opt}" passer præcist til situationen.<br>
                            Lad os nu samle sætningen i det grammatiske puslespil!
                        `;
                        speakDanish(`${current.subjekt} ${current.verbum} ${opt} ${current.rest}`);

                        setTimeout(() => {
                            builderStep = 2;
                            puzzlePlaced = { subjekt: null, verbum: null, smaaord: null, rest: null };
                            renderTabBuilder(parent);
                        }, 1200);
                    } else {
                        btn.classList.add('wrong');
                        feedbackBox.classList.add('wrong');
                        feedbackBox.innerHTML = `<strong>Ikke helt:</strong> Tænk på konteksten: <em>${current.hint}</em>. Prøv igen!`;
                    }
                };

                optsGrid.appendChild(btn);
            });
        } else {
            // Step 2: Puslespil med farvekodede pladser
            card.innerHTML = `
                <div class="builder-step-badge">
                    <span>2️⃣</span> Trin 2: Puslespil & syntaks
                </div>

                <h3 style="font-size: 1.4rem; color: white; margin-bottom: 0.5rem;">
                    Placér brikkerne i den rette rækkefølge
                </h3>
                <p style="color: #cbd5e1; font-size: 1rem; margin-bottom: 1.8rem;">
                    Læg mærke til de faste farver: <strong>Grøn</strong> (Subjekt), <strong>Rød</strong> (Verbum), <strong>Turkis</strong> (Småord) og <strong>Blå</strong> (Restled).
                </p>

                <!-- 4 Colored Target Slots -->
                <div class="sb-puzzle-slots">
                    <div class="sb-puzzle-slot slot-subjekt ${puzzlePlaced.subjekt ? 'filled' : ''}" id="slot-subjekt">
                        <span class="slot-badge-callout callout-subjekt">1. Subjekt</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.subjekt || 'Tom plads'}</div>
                    </div>
                    <div class="sb-puzzle-slot slot-verbum ${puzzlePlaced.verbum ? 'filled' : ''}" id="slot-verbum">
                        <span class="slot-badge-callout callout-verbum">2. Verbum</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.verbum || 'Tom plads'}</div>
                    </div>
                    <div class="sb-puzzle-slot slot-smaaord ${puzzlePlaced.smaaord ? 'filled' : ''}" id="slot-smaaord">
                        <span class="slot-badge-callout callout-smaaord">3. Småord 💬</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.smaaord || 'Tom plads'}</div>
                    </div>
                    <div class="sb-puzzle-slot slot-rest ${puzzlePlaced.rest ? 'filled' : ''}" id="slot-rest">
                        <span class="slot-badge-callout callout-rest">4. Restled</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.rest || 'Tom plads'}</div>
                    </div>
                </div>

                <div style="font-weight: 800; color: #94a3b8; margin-bottom: 1rem; text-align: center;">
                    Klik på brikkerne i rigtig rækkefølge:
                </div>

                <!-- Chips pool -->
                <div class="sb-puzzle-chips" id="puzzle-chips"></div>

                <div class="detektiv-feedback-box" id="puzzle-feedback"></div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                    <button class="filter-btn" id="puzzle-reset-btn">
                        🔄 Nulstil brikker
                    </button>
                    <button class="action-btn-primary" id="puzzle-next-btn" style="display: none;">
                        Næste sætning ➔
                    </button>
                </div>
            `;

            // Prepare shuffled chips
            const chips = [
                { role: 'subjekt', text: current.subjekt },
                { role: 'verbum', text: current.verbum },
                { role: 'smaaord', text: current.correctWord },
                { role: 'rest', text: current.rest }
            ].sort(() => Math.random() - 0.5);

            const chipsPool = card.querySelector('#puzzle-chips');
            const feedbackBox = card.querySelector('#puzzle-feedback');
            const nextBtn = card.querySelector('#puzzle-next-btn');

            chips.forEach(chip => {
                const chipBtn = document.createElement('button');
                chipBtn.className = 'sb-puzzle-chip';
                chipBtn.textContent = chip.text;

                chipBtn.onclick = () => {
                    // Place next empty slot
                    if (!puzzlePlaced.subjekt && chip.role === 'subjekt') {
                        puzzlePlaced.subjekt = chip.text;
                        chipBtn.classList.add('used');
                    } else if (puzzlePlaced.subjekt && !puzzlePlaced.verbum && chip.role === 'verbum') {
                        puzzlePlaced.verbum = chip.text;
                        chipBtn.classList.add('used');
                    } else if (puzzlePlaced.subjekt && puzzlePlaced.verbum && !puzzlePlaced.smaaord && chip.role === 'smaaord') {
                        puzzlePlaced.smaaord = chip.text;
                        chipBtn.classList.add('used');
                    } else if (puzzlePlaced.subjekt && puzzlePlaced.verbum && puzzlePlaced.smaaord && !puzzlePlaced.rest && chip.role === 'rest') {
                        puzzlePlaced.rest = chip.text;
                        chipBtn.classList.add('used');
                    } else {
                        feedbackBox.className = 'detektiv-feedback-box show wrong';
                        feedbackBox.innerHTML = `Husk rækkefølgen: 1. Subjekt ➔ 2. Verbum ➔ 3. Småord ➔ 4. Restled.`;
                        return;
                    }

                    renderTabBuilder(parent);

                    if (puzzlePlaced.subjekt && puzzlePlaced.verbum && puzzlePlaced.smaaord && puzzlePlaced.rest) {
                        const fb = parent.querySelector('#puzzle-feedback');
                        const nBtn = parent.querySelector('#puzzle-next-btn');
                        if (fb) {
                            fb.className = 'detektiv-feedback-box show correct';
                            fb.innerHTML = `<strong>Korrekt opbygget!</strong> "${current.subjekt} ${current.verbum} ${current.correctWord} ${current.rest}".`;
                        }
                        if (nBtn) nBtn.style.display = 'inline-flex';
                        speakDanish(`${current.subjekt} ${current.verbum} ${current.correctWord} ${current.rest}`);
                    }
                };

                chipsPool.appendChild(chipBtn);
            });

            card.querySelector('#puzzle-reset-btn').onclick = () => {
                puzzlePlaced = { subjekt: null, verbum: null, smaaord: null, rest: null };
                renderTabBuilder(parent);
            };

            card.querySelector('#puzzle-next-btn').onclick = () => {
                builderStep = 1;
                builderSentenceIdx = (builderSentenceIdx + 1) % BUILDER_SENTENCES.length;
                puzzlePlaced = { subjekt: null, verbum: null, smaaord: null, rest: null };
                renderTabBuilder(parent);
            };
        }

        container.appendChild(card);
        parent.appendChild(container);
    }

    // ==========================================
    // TAB 5: KONTEKST-TESTEN (14 autentiske dialogøvelser)
    // ==========================================
    const KONTEKST_QUESTIONS = [
        {
            dialog: 'A: "Er denne plads i kantinen optaget?"<br>B: "Nej, du sætter dig ______!"',
            options: ['bare', 'slet', 'altid'],
            correct: 'bare',
            feedback: '"Bare" bruges her som en høflig og venlig tilladelse: "Tag roligt plads!"'
        },
        {
            dialog: 'A: "Har chefen sendt referatet ud endnu?"<br>B: "Ja, hun har ______ sendt det på mail til alle."',
            options: ['vist', 'godt', 'slet'],
            correct: 'vist',
            feedback: '"Vist" viser, at taleren husker eller har hørt det udefra uden 100% garanti.'
        },
        {
            dialog: 'A: "Skal du have mælk i kaffen?"<br>B: "Nej tak, jeg drikker den ______ helt sort."',
            options: ['helst', 'jo', 'da'],
            correct: 'helst',
            feedback: '"Helst" udtrykker personens klare førstevalg og stærkeste præference.'
        },
        {
            dialog: 'A: "Jeg er så nervøs for eksamen i morgen!"<br>B: "Tag det roligt, det skal ______ gå fint!"',
            options: ['nok', 'vel', 'vist'],
            correct: 'nok',
            feedback: '"Det skal nok gå" er den klassiske danske måde at trøste og berolige på.'
        },
        {
            dialog: 'A: "Hvorfor har du ikke paraply med?"<br>B: "Det behøver jeg ikke, det regner ______ ikke i dag!"',
            options: ['jo', 'nok', 'vel'],
            correct: 'jo',
            feedback: '"Jo" henviser til, at himlen er blå, og det er åbenlyst for begge parter.'
        },
        {
            dialog: 'A: "Du har prøvet at køre med den nye metro før, ______?"<br>B: "Ja, det har jeg mange gange."',
            options: ['vel', 'nok', 'vist'],
            correct: 'vel',
            feedback: '"Vel" appellerer til modtageren om bekræftelse ("ikke sandt?").'
        },
        {
            dialog: 'A: "Må jeg tage det sidste stykke wienerbrød?"<br>B: "Ja, det må du ______ gerne!"',
            options: ['da', 'vel', 'vist'],
            correct: 'da',
            feedback: '"Da" viser selvfølgelighed og fjerner enhver form for tøven eller beskedenhed.'
        },
        {
            dialog: 'A: "Hvor blev bussen af? Den er ti minutter forsinket."<br>B: "______ den er gået i stykker på vejen?"',
            options: ['Mon', 'Bare', 'Lige'],
            correct: 'Mon',
            feedback: '"Mon" indleder en undren eller et retorisk spørgsmål ("gad vide om...").'
        },
        {
            dialog: 'A: "Undskyld, kan du ______ holde døren et øjeblik?"<br>B: "Selvfølgelig, værsgo!"',
            options: ['lige', 'sgu', 'engang'],
            correct: 'lige',
            feedback: '"Lige" er det uundværlige høflighedsord, der blødgør anmodninger på dansk.'
        },
        {
            dialog: 'A: "Jeg kan virkelig ikke lide sild."<br>B: "Nej, det kan jeg ______ ikke!"',
            options: ['heller', 'hellere', 'helst'],
            correct: 'heller',
            feedback: '"Heller ikke" bruges til at udtrykke enighed i en benægtelse.'
        },
        {
            dialog: 'A: "Hvor er Maria i dag?"<br>B: "Hun er ______ blevet syg, sagde Peter."',
            options: ['vist', 'nok', 'vel'],
            correct: 'vist',
            feedback: '"Vist" angiver, at oplysningen stammer fra en ekstern kilde (Peter).'
        },
        {
            dialog: 'A: "Vidste kollegerne om flytningen?"<br>B: "Nej, ikke ______ ledelsen vidste det."',
            options: ['engang', 'heller', 'ellers'],
            correct: 'engang',
            feedback: '"Ikke engang" forstærker overraskelsen over, at ingen vidste det (not even).'
        },
        {
            dialog: 'A: "Det er en virkelig svær grammatisk regel!"<br>B: "Ja, jeg ved ______ at den kræver meget øvelse."',
            options: ['godt', 'sgu', 'mon'],
            correct: 'godt',
            feedback: '"Jeg ved godt" viser anerkendelse, indrømmelse og forståelse.'
        },
        {
            dialog: 'A: "Skynd dig at tage sko på!"<br>B: "Hvorfor?"<br>A: "______ kommer vi for sent til toget!"',
            options: ['Ellers', 'Heller', 'Bare'],
            correct: 'Ellers',
            feedback: '"Ellers" udtrykker konsekvensen, hvis man ikke skynder sig.'
        }
    ];

    let kontekstIdx = 0;
    let kontekstScore = 0;
    let userAnswers = new Array(KONTEKST_QUESTIONS.length).fill(null);

    function renderTabKontekst(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'kontekst-container';

        const q = KONTEKST_QUESTIONS[kontekstIdx];
        const isAnswered = userAnswers[kontekstIdx] !== null;

        container.innerHTML = `
            <div class="progress-header">
                <span>Spørgsmål ${kontekstIdx + 1} af ${KONTEKST_QUESTIONS.length}</span>
                <span>Score: ${kontekstScore} / ${KONTEKST_QUESTIONS.length}</span>
            </div>

            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${((kontekstIdx + 1) / KONTEKST_QUESTIONS.length) * 100}%;"></div>
            </div>

            <div class="detektiv-card">
                <div class="detektiv-context-tag">💬 Hverdagssamtale</div>
                <div style="font-size: 1.45rem; color: white; line-height: 1.8; margin-bottom: 2rem; background: rgba(15, 23, 42, 0.7); padding: 1.4rem; border-radius: 14px; border-left: 5px solid #06b6d4;">
                    ${q.dialog}
                </div>

                <div class="detektiv-options-grid" id="kontekst-opts"></div>
                <div class="detektiv-feedback-box ${isAnswered ? 'show ' + (userAnswers[kontekstIdx] === q.correct ? 'correct' : 'wrong') : ''}" id="kontekst-feedback">
                    ${isAnswered ? (userAnswers[kontekstIdx] === q.correct ? `<strong>Korrekt!</strong> ${q.feedback}` : `<strong>Ikke helt:</strong> ${q.feedback}`) : ''}
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="filter-btn" id="kontekst-prev-btn" ${kontekstIdx === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                    ← Forrige
                </button>
                <button class="action-btn-primary" id="kontekst-next-btn">
                    ${kontekstIdx < KONTEKST_QUESTIONS.length - 1 ? 'Næste spørgsmål ➔' : 'Se resultat / Start forfra 🔄'}
                </button>
            </div>
        `;

        const optsGrid = container.querySelector('#kontekst-opts');
        const feedbackBox = container.querySelector('#kontekst-feedback');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `detektiv-opt-btn ${isAnswered ? (opt === q.correct ? 'correct' : (opt === userAnswers[kontekstIdx] ? 'wrong' : '')) : ''}`;
            btn.textContent = opt;

            btn.onclick = () => {
                if (userAnswers[kontekstIdx] !== null) return;
                userAnswers[kontekstIdx] = opt;

                if (opt === q.correct) {
                    kontekstScore++;
                    btn.classList.add('correct');
                    feedbackBox.className = 'detektiv-feedback-box show correct';
                    feedbackBox.innerHTML = `<strong>Korrekt!</strong> ${q.feedback}`;
                    speakDanish(q.dialog.replace(/<[^>]*>?/gm, ' ').replace('______', opt));
                } else {
                    btn.classList.add('wrong');
                    feedbackBox.className = 'detektiv-feedback-box show wrong';
                    feedbackBox.innerHTML = `<strong>Ikke helt:</strong> ${q.feedback}`;
                }
                container.querySelector('.progress-header span:last-child').textContent = `Score: ${kontekstScore} / ${KONTEKST_QUESTIONS.length}`;
            };

            optsGrid.appendChild(btn);
        });

        container.querySelector('#kontekst-prev-btn').onclick = () => {
            if (kontekstIdx > 0) {
                kontekstIdx--;
                renderTabKontekst(parent);
            }
        };

        container.querySelector('#kontekst-next-btn').onclick = () => {
            if (kontekstIdx < KONTEKST_QUESTIONS.length - 1) {
                kontekstIdx++;
            } else {
                kontekstIdx = 0;
                kontekstScore = 0;
                userAnswers = new Array(KONTEKST_QUESTIONS.length).fill(null);
            }
            renderTabKontekst(parent);
        };

        parent.appendChild(container);
    }

    // Initial render
    switchTab('vrimmel');
    container.appendChild(viewContainer);
}
