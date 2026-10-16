import { getTranslation, getLang } from '../utils/i18n.js';

/**
 * AdverbierHoldningView - Felt 6: Sikkerhed, Tvivl & Holdning (Sandsynlighedsskalaen & Evaluative Adverbier)
 * 
 * 20 højfrekvente holdnings- og modaladverbier:
 * 1. sikkert (Helt sikkert / 100% vished)
 * 2. selvfølgelig (Åbenlys selvfølge)
 * 3. naturligvis (Formel selvfølgelighed)
 * 4. afgjort (Fastslået faktum / uden tvivl)
 * 5. faktisk (I virkeligheden / sandheden er)
 * 6. virkelig (Sandt / reelt / ægte)
 * 7. sandsynligvis (Høj sandsynlighed ~80-90%)
 * 8. formentlig (Logisk antagelse ~75-85%)
 * 9. tilsyneladende (Sådan ser det ud udefra / apparently)
 * 10. åbenbart (Det viser sig tydeligt / evidently)
 * 11. rimeligvis (Hvad man med rimelighed kan forvente)
 * 12. måske (50/50 mulighed og tvivl)
 * 13. muligvis (Teoretisk mulighed ~30-40%)
 * 14. næppe (Stærk tvivl / næsten usandsynligt ~10-15%)
 * 15. usandsynligt (Meget lav sandsynlighed ~5%)
 * 16. umuligt (0% sandsynlighed / udelukket)
 * 17. heldigvis (Positiv lettelse / godt sammentræf)
 * 18. desværre (Beklagelse / negativt udfald)
 * 19. forhåbentlig (Håb og forventning for fremtiden)
 * 20. ærlig talt (Oprigtig mening uden filter)
 * 
 * 8 didaktiske tabs:
 * 1. Planlægningsrummet (Vrimlebilledet - 20 hotspots, filtre & målordspræsentation)
 * 2. Aha-værkstedet (Sandsynlighedsbarometret 0-100% & Holdningstransformeren)
 * 3. Holdnings-Detektiven (10 gåder bygget på sandsynlighed og sociale nuancer)
 * 4. Sætningsbyggeren & Puslespillet (To-trins model: Subjekt = Grøn, Verbum = Rød, Adverbium = Turkis, Rest = Blå)
 * 5. Kontekst-testen (14 autentiske hverdagsdialoger)
 * 6. Tvivlens Grader: Næppe, usandsynligt, umuligt 📉 (8 øvelser)
 * 7. Social Tone: Heldigvis, desværre & forhåbentlig 🎭 (8 øvelser)
 * 8. Bevis-Detektiven (sandsynligvis, formentlig, åbenbart, tilsyneladende) 🔬 (10 øvelser)
 */
export function renderAdverbierHoldningView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adverbier-holdning-view';

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

    // 20 Words Data for Felt 6
    const ADVERBIER_HOLDNING_DATA = [
        {
            id: 'sikkert',
            word: 'sikkert',
            category: 'sikkerhed',
            x: 38,
            y: 44,
            meaning: 'Helt sikkert / 100% vished',
            sceneDesc: 'Meteorologen peger overbevist på vejrkortet: "Det bliver helt sikkert solskin i morgen!"',
            sentence: 'Det er sikkert den rigtige beslutning.',
            contextSentence: 'Vi har undersøgt alle data grundigt, og det er sikkert den rigtige løsning for projektet.',
            ruleHint: 'Udtrykker stærk overbevisning og næsten 100% vished hos taleren.',
            translations: {
                en: { word: 'certainly / surely', sentence: 'We examined all data, and this is certainly the right solution for the project.' },
                de: { word: 'sicher / bestimmt', sentence: 'Wir haben alle Daten geprüft, und das ist sicher die richtige Lösung.' },
                es: { word: 'seguramente / sin duda', sentence: 'Examinamos todos los datos, y seguramente es la solución correcta.' },
                ar: { word: 'بالتأكيد / حتمًا', sentence: 'لقد فحصنا جميع البيانات بعناية، وهذا بالتأكيد الحل الصحيح للمشروع.' },
                tr: { word: 'kesinlikle / şüphesiz', sentence: 'Tüm verileri inceledik ve proje için kesinlikle doğru çözüm bu.' },
                uk: { word: 'напевно / точно', sentence: 'Ми ретельно перевірили всі дані, і це точно правильне рішення для проєкту.' }
            }
        },
        {
            id: 'selvfoelgelig',
            word: 'selvfølgelig',
            category: 'sikkerhed',
            x: 43,
            y: 78,
            meaning: 'Åbenlys selvfølge',
            sceneDesc: 'Kollegaen smiler og bekræfter: "Selvfølgelig hjælper jeg dig med rapporten!"',
            sentence: 'Selvfølgelig vil jeg gerne hjælpe.',
            contextSentence: 'Du behøver ikke engang at spørge, for jeg vil selvfølgelig gerne hjælpe dig med opgaven.',
            ruleHint: 'Viser at noget er fuldstændig naturligt og uden den mindste tvivl.',
            translations: {
                en: { word: 'of course / obviously', sentence: 'You don\'t even need to ask, because of course I would like to help you.' },
                de: { word: 'selbstverständlich / natürlich', sentence: 'Du musst gar nicht erst fragen, denn selbstverständlich helfe ich dir gern.' },
                es: { word: 'por supuesto / naturalmente', sentence: 'Ni siquiera necesitas preguntar, porque por supuesto me encantaría ayudarte.' },
                ar: { word: 'بالطبع / بطبيعة الحال', sentence: 'لا داعي لأن تسأل حتى، فبالطبع يسعدني مساعدتك في المهمة.' },
                tr: { word: 'tabii ki / elbette', sentence: 'Sormana bile gerek yok, çünkü tabii ki sana görevde yardım etmek isterim.' },
                uk: { word: 'звісно / само собою', sentence: 'Тобі навіть не треба питати, бо я звісно ж залюбки допоможу тобі із завданням.' }
            }
        },
        {
            id: 'naturligvis',
            word: 'naturligvis',
            category: 'sikkerhed',
            x: 26,
            y: 74,
            meaning: 'Naturlig selvfølge (lidt mere formelt)',
            sceneDesc: 'Projektlederen forklarer tidsplanen: "Kvaliteten kommer naturligvis i første række."',
            sentence: 'Vi overholder naturligvis alle regler.',
            contextSentence: 'Når vi arbejder med budgettet, overholder vi naturligvis alle gældende retningslinjer.',
            ruleHint: 'Synonym med "selvfølgelig", men klinger mere formelt og sagligt på skrift og arbejde.',
            translations: {
                en: { word: 'naturally / of course', sentence: 'When we work with the budget, we naturally follow all guidelines.' },
                de: { word: 'natürlicherweise / selbstredend', sentence: 'Wenn wir am Budget arbeiten, beachten wir natürlich alle Richtlinien.' },
                es: { word: 'naturalmente / lógicamente', sentence: 'Cuando trabajamos con el presupuesto, naturalmente seguimos todas las directrices.' },
                ar: { word: 'طبيعيًا / من البديهي', sentence: 'عندما نعمل على الميزانية، نلتزم بطبيعة الحال بجميع الإرشادات السارية.' },
                tr: { word: 'doğal olarak', sentence: 'Bütçe üzerinde çalışırken doğal olarak tüm geçerli kurallara uyarız.' },
                uk: { word: 'природно / звісно', sentence: 'Коли ми працюємо над бюджетом, ми природно дотримуємося всіх діючих правил.' }
            }
        },
        {
            id: 'afgjort',
            word: 'afgjort',
            category: 'sikkerhed',
            x: 66,
            y: 45,
            meaning: 'Utvivlsomt / fastslået faktum',
            sceneDesc: 'Chefen ved whiteboardet tegner en pil: "Dette er afgjort vores vigtigste mål i år."',
            sentence: 'Det er afgjort den bedste plan.',
            contextSentence: 'Efter at have sammenlignet de tre forslag er dette afgjort den mest effektive plan.',
            ruleHint: 'Betyder "uden diskussion" – sagen er afgjort og diskussionen er slut.',
            translations: {
                en: { word: 'definitely / decidedly', sentence: 'After comparing the three proposals, this is decidedly the most effective plan.' },
                de: { word: 'entschieden / definitiv', sentence: 'Nach dem Vergleich der drei Vorschläge ist dies entschieden der beste Plan.' },
                es: { word: 'definitivamente / sin duda alguna', sentence: 'Tras comparar las tres propuestas, este es definitivamente el plan más eficaz.' },
                ar: { word: 'بشكل قاطع / دون شك', sentence: 'بعد مقارنة المقترحات الثلاثة، هذه بالتأكيد الخطة الأكثر فاعلية.' },
                tr: { word: 'kesinlikle / tartışmasız', sentence: 'Üç öneriyi karşılaştırdıktan sonra bu tartışmasız en etkili plan.' },
                uk: { word: 'однозначно / безумовно', sentence: 'Після порівняння трьох пропозицій це однозначно найефективніший план.' }
            }
        },
        {
            id: 'faktisk',
            word: 'faktisk',
            category: 'sikkerhed',
            x: 20,
            y: 53,
            meaning: 'I virkeligheden / sandheden er',
            sceneDesc: 'Kollegaen overraskes over nyheden: "Projektet er faktisk allerede godkendt!"',
            sentence: 'Jeg vidste det faktisk ikke.',
            contextSentence: 'Mange tror vi mangler godkendelse, men vi er faktisk helt færdige.',
            ruleHint: 'Korrigerer en misforståelse eller fremhæver en overraskende virkelighed.',
            translations: {
                en: { word: 'actually / in fact', sentence: 'Many think we lack approval, but actually we are completely done.' },
                de: { word: 'tatsächlich / eigentlich', sentence: 'Viele glauben wir warten noch, aber wir sind tatsächlich ganz fertig.' },
                es: { word: 'de hecho / realmente', sentence: 'Muchos creen que nos falta aprobación, pero de hecho ya hemos terminado.' },
                ar: { word: 'في الواقع / فعليًا', sentence: 'يعتقد الكثيرون أننا ننتظر الموافقة، لكننا في الواقع انتهينا بالكامل.' },
                tr: { word: 'aslında / gerçekten', sentence: 'Pek çok kişi onay beklediğimizi sanıyor ama aslında tamamen bitirdik.' },
                uk: { word: 'насправді / фактично', sentence: 'Багато хто думає, що ми чекаємо схвалення, але насправді ми вже все закінчили.' }
            }
        },
        {
            id: 'virkelig',
            word: 'virkelig',
            category: 'sikkerhed',
            x: 62,
            y: 17,
            meaning: 'Sandt / reelt / ægte',
            sceneDesc: 'Kvinden kigger ud ad det store vindue: "Solen skinner virkelig smukt i dag!"',
            sentence: 'Det er virkelig en stor hjælp.',
            contextSentence: 'Mange tak for din hurtige indsats, det er virkelig en kæmpe hjælp for os alle.',
            ruleHint: 'Forstærker sandhedsværdien af et udsagn med oprigtighed og tryk.',
            translations: {
                en: { word: 'really / truly', sentence: 'Thank you for your quick effort, it is really a huge help for us all.' },
                de: { word: 'wirklich / wahrhaftig', sentence: 'Vielen Dank für deinen schnellen Einsatz, das ist wirklich eine riesige Hilfe.' },
                es: { word: 'realmente / verdaderamente', sentence: 'Muchas gracias por tu rápida ayuda, realmente es un gran apoyo para todos.' },
                ar: { word: 'حقًا / فعلًا', sentence: 'شكرًا جزيلاً على جهدك السريع، إنها حقًا مساعدة هائلة لنا جميعًا.' },
                tr: { word: 'gerçekten / hakikaten', sentence: 'Hızlı çaban için çok teşekkürler, bu hepimiz için gerçekten büyük bir yardım.' },
                uk: { word: 'дійсно / справді', sentence: 'Дуже дякую за швидку допомогу, це справді величезна підтримка для нас усіх.' }
            }
        },
        {
            id: 'sandsynligvis',
            word: 'sandsynligvis',
            category: 'sandsynlighed',
            x: 84,
            y: 16,
            meaning: 'Høj sandsynlighed (~80-90%)',
            sceneDesc: 'Manden kigger op på de mørke skyer udenfor: "Det begynder sandsynligvis at regne snart."',
            sentence: 'Toget er sandsynligvis forsinket.',
            contextSentence: 'Vejret er dårligt og der er signalfejl, så toget er sandsynligvis forsinket.',
            ruleHint: 'Bygger på statistisk sandsynlighed eller klare tegn i omgivelserne.',
            translations: {
                en: { word: 'probably / in all likelihood', sentence: 'The weather is bad and signals failed, so the train is probably delayed.' },
                de: { word: 'wahrscheinlich / vermutlich', sentence: 'Das Wetter ist schlecht und es gibt Signalstörungen, der Zug ist also wahrscheinlich verspätet.' },
                es: { word: 'probablemente', sentence: 'El tiempo está malo y hay fallos de señal, así que el tren probablemente esté retrasado.' },
                ar: { word: 'على الأرجح / من المحتمل جدًا', sentence: 'الطقس سيء وهناك عطل بالإشارات، لذا من المرجح أن القطار متأخر.' },
                tr: { word: 'büyük olasılıkla / muhtemelen', sentence: 'Hava kötü ve sinyal hatası var, bu yüzden tren muhtemelen gecikecek.' },
                uk: { word: 'ймовірно / скоріш за все', sentence: 'Погода погана і є збій сигналів, тому поїзд, імовірно, затримується.' }
            }
        },
        {
            id: 'formentlig',
            word: 'formentlig',
            category: 'sandsynlighed',
            x: 77,
            y: 47,
            meaning: 'Logisk antagelse (~75-85%)',
            sceneDesc: 'Manden med papiret overvejer: "Mødet slutter formentlig inden klokken tre."',
            sentence: 'Hun er formentlig på sit kontor.',
            contextSentence: 'Hendes jakke hænger på stumtjeneren, så hun er formentlig på sit kontor lige nu.',
            ruleHint: 'En kvalificeret antagelse baseret på logiske indicier og erfaring.',
            translations: {
                en: { word: 'presumably / likely', sentence: 'Her jacket is hanging on the rack, so she is presumably in her office.' },
                de: { word: 'vermutlich / wohl', sentence: 'Ihre Jacke hängt an der Garderobe, sie ist vermutlich in ihrem Büro.' },
                es: { word: 'presumiblemente / probablemente', sentence: 'Su abrigo está colgado, así que presumiblemente está en su oficina.' },
                ar: { word: 'من المفترض / على الأرجح', sentence: 'معطفها معلق على الشماعة، لذا فهي على الأرجح في مكتبها الآن.' },
                tr: { word: 'tahminen / muhtemelen', sentence: 'Ceketi askıda duruyor, bu yüzden tahminen şu an ofisindedir.' },
                uk: { word: 'імовірно / очевидно', sentence: 'Її куртка висить на вішалці, тому вона, ймовірно, зараз у своєму кабінеті.' }
            }
        },
        {
            id: 'tilsyneladende',
            word: 'tilsyneladende',
            category: 'sandsynlighed',
            x: 46,
            y: 64,
            meaning: 'Sådan ser det ud udefra (overflade)',
            sceneDesc: 'Kvinden kigger på kortet: "Broen er tilsyneladende lukket for biltrafik i dag."',
            sentence: 'Han har tilsyneladende glemt aftalen.',
            contextSentence: 'Han tager ikke telefonen, og hans stol er tom, så han har tilsyneladende glemt vores møde.',
            ruleHint: 'Bruges om det umiddelbare indtryk, man kan observere, men hvor man tager forbehold.',
            translations: {
                en: { word: 'apparently / seemingly', sentence: 'He isn\'t picking up and his chair is empty, so he apparently forgot our meeting.' },
                de: { word: 'anscheinend / scheinbar', sentence: 'Er geht nicht ans Telefon und der Stuhl ist leer, anscheinend hat er das Meeting vergessen.' },
                es: { word: 'aparentemente / al parecer', sentence: 'No contesta el teléfono y su silla está vacía, al parecer olvidó nuestra reunión.' },
                ar: { word: 'ظاهريًا / فيما يبدو', sentence: 'إنه لا يجيب على الهاتف وكرسيه فارغ، فيما يبدو أنه نسي اجتماعنا.' },
                tr: { word: 'görünüşe göre', sentence: 'Telefona bakmıyor ve sandalyesi boş, görünüşe göre toplantımızı unuttu.' },
                uk: { word: 'мабуть / судячи з усього', sentence: 'Він не бере слухавку і його крісло порожнє, тож він, судячи з усього, забув про зустріч.' }
            }
        },
        {
            id: 'aabenbart',
            word: 'åbenbart',
            category: 'sandsynlighed',
            x: 54,
            y: 52,
            meaning: 'Det viser sig tydeligt / beviselig kendsgerning',
            sceneDesc: 'Kollegaen peger på computeren: "Systemet virker åbenbart ikke med den gamle browser."',
            sentence: 'Det var åbenbart en misforståelse.',
            contextSentence: 'Vi mødte begge op på forkerte adresser, så der var åbenbart sket en kommunikationsfejl.',
            ruleHint: 'Viser at noget nu er blevet afsløret eller bevist som en klar kendsgerning.',
            translations: {
                en: { word: 'evidently / clearly / apparently', sentence: 'We both arrived at wrong addresses, so evidently a communication error had occurred.' },
                de: { word: 'offenbar / offensichtlich', sentence: 'Wir kamen beide am falschen Ort an, offenbar gab es ein Missverständnis.' },
                es: { word: 'evidentemente / por lo visto', sentence: 'Ambos fuimos a direcciones equivocadas, por lo visto ocurrió un error de comunicación.' },
                ar: { word: 'من الواضح / جليًا', sentence: 'وصل كلانا إلى عناوين خاطئة، لذا فمن الواضح أنه حدث خطأ في التواصل.' },
                tr: { word: 'besbelli / anlaşılan', sentence: 'İkimiz de yanlış adrese gittik, anlaşılan bir iletişim hatası olmuş.' },
                uk: { word: 'очевидно / як виявилося', sentence: 'Ми обидва прийшли за неправильними адресами, тож, очевидно, сталася помилка зв\'язку.' }
            }
        },
        {
            id: 'rimeligvis',
            word: 'rimeligvis',
            category: 'sandsynlighed',
            x: 88,
            y: 55,
            meaning: 'Hvad man med rimelighed kan forvente',
            sceneDesc: 'Manden ved skrivebordet regner: "Budgettet rækker rimeligvis til resten af måneden."',
            sentence: 'Det bør rimeligvis løse problemet.',
            contextSentence: 'Vi har udskiftet den defekte reservedel, så maskinen bør rimeligvis køre uden fejl nu.',
            ruleHint: 'Bruges når en forventning er baseret på sund fornuft og teknisk rimelighed.',
            translations: {
                en: { word: 'reasonably / fairly expected', sentence: 'We replaced the broken part, so it should reasonably run smoothly now.' },
                de: { word: 'vernünftigerweise / billigerweise', sentence: 'Wir haben das defekte Teil ersetzt, vernünftigerweise sollte es nun laufen.' },
                es: { word: 'razonablemente', sentence: 'Reemplazamos la pieza rota, así que razonablemente debería funcionar sin problemas.' },
                ar: { word: 'بشكل معقول', sentence: 'لقد استبدلنا القطعة التالفة، لذا فمن المعقول أن تعمل الآلة بدون مشاكل الآن.' },
                tr: { word: 'makul ölçüde', sentence: 'Bozuk parçayı değiştirdik, bu yüzden makul ölçüde sorunsuz çalışması gerekir.' },
                uk: { word: 'цілком обґрунтовано', sentence: 'Ми замінили зламану деталь, тому цілком обґрунтовано очікувати бездоганної роботи.' }
            }
        },
        {
            id: 'maaske',
            word: 'måske',
            category: 'tvivl',
            x: 74,
            y: 73,
            meaning: '50/50 tvivl og mulighed',
            sceneDesc: 'Manden med brillerne trækker på skuldrene: "Måske skal vi overveje en anden plan?"',
            sentence: 'Måske kommer hun senere i dag.',
            contextSentence: 'Hun er forsinket fra tandlægen, men måske når hun at deltage i den sidste del af mødet.',
            ruleHint: 'Det mest almindelige hverdagsord for usikkerhed – midt på vægtskålen (50%).',
            translations: {
                en: { word: 'maybe / perhaps', sentence: 'She is delayed at the dentist, but maybe she will manage the last part of the meeting.' },
                de: { word: 'vielleicht', sentence: 'Sie ist beim Zahnarzt aufgehalten, aber vielleicht schafft sie den letzten Teil.' },
                es: { word: 'quizás / tal vez', sentence: 'Se retrasó en el dentista, pero quizás llegue a la última parte de la reunión.' },
                ar: { word: 'ربما / قد', sentence: 'لقد تأخرت عند طبيب الأسنان، ولكن ربما تلحق بالجزء الأخير من الاجتماع.' },
                tr: { word: 'belki', sentence: 'Dişçide gecikti ama belki toplantının son bölümüne yetişebilir.' },
                uk: { word: 'можливо / мабуть', sentence: 'Вона затрималася у стоматолога, але, можливо, встигне на останню частину зустрічі.' }
            }
        },
        {
            id: 'muligvis',
            word: 'muligvis',
            category: 'tvivl',
            x: 13,
            y: 46,
            meaning: 'En teoretisk mulighed (~30-40%)',
            sceneDesc: 'Kollegerne diskuterer: "Vi kan muligvis flytte deadline til mandag morgen."',
            sentence: 'Vi kan muligvis finde en anden dato.',
            contextSentence: 'Hvis kalenderen er fuld på torsdag, kan vi muligvis mødes fredag formiddag i stedet.',
            ruleHint: 'Lidt mere formelt end "måske"; åbner for en konkret hypotese eller mulighed.',
            translations: {
                en: { word: 'possibly / potentially', sentence: 'If Thursday is full, we could possibly meet on Friday morning instead.' },
                de: { word: 'möglicherweise', sentence: 'Wenn der Donnerstag voll ist, können wir uns möglicherweise Freitag treffen.' },
                es: { word: 'posiblemente', sentence: 'Si el jueves está lleno, posiblemente podamos reunirnos el viernes por la mañana.' },
                ar: { word: 'من الممكن', sentence: 'إذا كان يوم الخميس ممتلئًا، فمن الممكن أن نلتقي صباح الجمعة بدلًا من ذلك.' },
                tr: { word: 'muhtemelen / olası olarak', sentence: 'Perşembe doluysa, olası olarak cuma sabahı buluşabiliriz.' },
                uk: { word: 'можливо / потенційно', sentence: 'Якщо четвер зайнятий, ми, можливо, зможемо зустрітися в п\'ятницю вранці.' }
            }
        },
        {
            id: 'naeppe',
            word: 'næppe',
            category: 'tvivl',
            x: 86,
            y: 74,
            meaning: 'Stærk tvivl / næsten usandsynligt (~10-15%)',
            sceneDesc: 'Kvinden ryster på hovedet: "Vi når næppe bussen, hvis vi ikke skynder os nu!"',
            sentence: 'Det sker næppe før jul.',
            contextSentence: 'Der er kun få arbejdsdage tilbage, så godkendelsen når næppe igennem før jul.',
            ruleHint: 'Betyder "næsten sikkert IKKE" – en høflig og dæmpet måde at afvise eller tvivle på.',
            translations: {
                en: { word: 'hardly / unlikely / scarcely', sentence: 'Very few workdays remain, so the approval will hardly come through before Christmas.' },
                de: { word: 'kaum', sentence: 'Es gibt nur wenige Arbeitstage, die Genehmigung kommt kaum noch vor Weihnachten.' },
                es: { word: 'difícilmente / casi seguro que no', sentence: 'Quedan pocos días hábiles, así que la aprobación difícilmente llegará antes de Navidad.' },
                ar: { word: 'بالكاد / من غير المرجح', sentence: 'لم يتبق سوى أيام عمل قليلة، لذا من غير المرجح أن تتم الموافقة قبل عيد الميلاد.' },
                tr: { word: 'pek ... değil / neredeyse hiç', sentence: 'Çok az iş günü kaldı, bu nedenle onay Noel\'den önce pek çıkmaz.' },
                uk: { word: 'навряд чи', sentence: 'Залишилося мало робочих днів, тож схвалення навряд чи надійде до Різдва.' }
            }
        },
        {
            id: 'usandsynligt',
            word: 'usandsynligt',
            category: 'tvivl',
            x: 83,
            y: 47,
            meaning: 'Meget lav sandsynlighed (~5%)',
            sceneDesc: 'Kollegaen læser rapporten: "Det er usandsynligt, at priserne falder i år."',
            sentence: 'Det er usandsynligt, at han ringer.',
            contextSentence: 'Klokken er over midnat, så det er usandsynligt, at han kontakter os før i morgen tidlig.',
            ruleHint: 'Direkte modsat af "sandsynligt"; chancen er forsvindende lille.',
            translations: {
                en: { word: 'unlikely / improbable', sentence: 'It is past midnight, so it is unlikely he will contact us before tomorrow morning.' },
                de: { word: 'unwahrscheinlich', sentence: 'Es ist nach Mitternacht, es ist unwahrscheinlich, dass er sich vor morgen meldet.' },
                es: { word: 'improbable', sentence: 'Es pasada la medianoche, por lo que es improbable que nos llame antes de mañana.' },
                ar: { word: 'من غير المحتمل / مستبعد', sentence: 'الوقت تجاوز منتصف الليل، لذا فمن المستبعد أن يتصل بنا قبل صباح الغد.' },
                tr: { word: 'olası olmayan / ihtimal dışı', sentence: 'Gece yarısını geçti, bu yüzden yarın sabahtan önce bizi araması ihtimal dışı.' },
                uk: { word: 'малоймовірно', sentence: 'Вже за північ, тому малоймовірно, що він зв\'яжеться з нами раніше завтрашнього ранку.' }
            }
        },
        {
            id: 'umuligt',
            word: 'umuligt',
            category: 'tvivl',
            x: 95,
            y: 57,
            meaning: '0% sandsynlighed / helt udelukket',
            sceneDesc: 'Kvinden ved bordet sukker over tidsplanen: "Det er umuligt at nå på to timer!"',
            sentence: 'Det kan umuligt passe.',
            contextSentence: 'Regningen er på fem tusind kroner for meget – det kan umuligt passe med vores aftale!',
            ruleHint: 'Det absolutte nulpunkt på sandsynlighedsskalaen (0% chance / fysisk udelukket).',
            translations: {
                en: { word: 'impossible', sentence: 'The invoice is thousands too high – that can\'t possibly match our agreement!' },
                de: { word: 'unmöglich', sentence: 'Die Rechnung ist viel zu hoch – das kann unmöglich unserer Vereinbarung entsprechen!' },
                es: { word: 'imposible', sentence: 'La factura es excesiva; ¡es imposible que coincida con nuestro acuerdo!' },
                ar: { word: 'مستحيل', sentence: 'الفاتورة مبالغ فيها جدًا – من المستحيل أن يتطابق ذلك مع اتفاقنا!' },
                tr: { word: 'imkânsız', sentence: 'Fatura binlerce lira fazla – anlaşmamıza uyması kesinlikle imkânsız!' },
                uk: { word: 'неможливо', sentence: 'Рахунок завищений на кілька тисяч – це неможливо узгодити з нашою домовленістю!' }
            }
        },
        {
            id: 'heldigvis',
            word: 'heldigvis',
            category: 'vurdering',
            x: 48,
            y: 46,
            meaning: 'Positiv lettelse / godt sammentræf',
            sceneDesc: 'Kvinden smiler lettet til sin kollega: "Heldigvis fandt jeg mine nøgler i tasken!"',
            sentence: 'Heldigvis nåede vi toget.',
            contextSentence: 'Der var tæt trafik mod stationen, men heldigvis nåede vi lige toget før dørene lukkede.',
            ruleHint: 'Talerens personlige vurdering af, at en hændelse er god og bringer lettelse.',
            translations: {
                en: { word: 'fortunately / luckily', sentence: 'There was heavy traffic, but fortunately we caught the train right before doors closed.' },
                de: { word: 'glücklicherweise / zum Glück', sentence: 'Der Verkehr war dicht, aber zum Glück erreichten wir den Zug gerade noch.' },
                es: { word: 'afortunadamente / por suerte', sentence: 'Había mucho tráfico, pero afortunadamente alcanzamos el tren justo a tiempo.' },
                ar: { word: 'لحسن الحظ', sentence: 'كانت حركة المرور كثيفة، لكن لحسن الحظ لحقنا بالقطار قبل إغلاق الأبواب مباشرة.' },
                tr: { word: 'neyse ki / şans eseri', sentence: 'Trafik yoğundu ama neyse ki kapılar kapanmadan hemen önce trene yetiştik.' },
                uk: { word: 'на щастя', sentence: 'Трафік був щільним, але, на щастя, ми встигли на потяг просто перед зачиненням дверей.' }
            }
        },
        {
            id: 'desvaerre',
            word: 'desværre',
            category: 'vurdering',
            x: 9,
            y: 72,
            meaning: 'Beklagelse / negativt udfald',
            sceneDesc: 'Manden sukker opgivende foran kaffemaskinen: "Desværre er kaffemaskinen i stykker."',
            sentence: 'Jeg kan desværre ikke komme.',
            contextSentence: 'Tusind tak for invitationen til festen, men jeg kan desværre ikke deltage på fredag.',
            ruleHint: 'Høflig og uundværlig måde at melde afbud, beklage eller overbringe dårlige nyheder på.',
            translations: {
                en: { word: 'unfortunately / regrettably', sentence: 'Thanks so much for the invitation, but unfortunately I cannot attend on Friday.' },
                de: { word: 'leider / bedauerlicherweise', sentence: 'Vielen Dank für die Einladung, aber leider kann ich am Freitag nicht kommen.' },
                es: { word: 'desafortunadamente / lamentablemente', sentence: 'Muchas gracias por la invitación, pero lamentablemente no puedo asistir el viernes.' },
                ar: { word: 'للأسف / مع الأسف', sentence: 'شكرًا جزيلاً على الدعوة، ولكن للأسف لا يمكنني الحضور يوم الجمعة.' },
                tr: { word: 'maalesef / ne yazık ki', sentence: 'Davet için çok teşekkürler ama maalesef cuma günü katılamayacağım.' },
                uk: { word: 'на жаль', sentence: 'Щиро дякую за запрошення, але, на жаль, я не зможу прийти в п\'ятницю.' }
            }
        },
        {
            id: 'forhaabentlig',
            word: 'forhåbentlig',
            category: 'vurdering',
            x: 64,
            y: 14,
            meaning: 'Håb og forventning om en god fremtid',
            sceneDesc: 'Teamet kigger ud mod den blå himmel: "Forhåbentlig holder det tørvejr i eftermiddag."',
            sentence: 'Forhåbentlig ses vi snart igen.',
            contextSentence: 'Tak for et rigtig godt samarbejde om projektet – forhåbentlig ses vi snart igen!',
            ruleHint: 'Udtrykker et stærkt personligt ønske om, at noget positivt vil ske i fremtiden.',
            translations: {
                en: { word: 'hopefully', sentence: 'Thank you for great cooperation on the project – hopefully we see each other soon!' },
                de: { word: 'hoffentlich', sentence: 'Danke für die tolle Zusammenarbeit – hoffentlich sehen wir uns bald wieder!' },
                es: { word: 'con suerte / ojalá', sentence: 'Gracias por la excelente colaboración; ¡ojalá nos veamos pronto de nuevo!' },
                ar: { word: 'نأمل أن / إن شاء الله', sentence: 'شكرًا على التعاون الرائع في المشروع – نأمل أن نلتقي قريبًا مرة أخرى!' },
                tr: { word: 'inşallah / umarım', sentence: 'Projedeki harika iş birliği için teşekkürler – umarım yakında tekrar görüşürüz!' },
                uk: { word: 'сподіваюся / з надією', sentence: 'Дякую за чудову співпрацю над проєктом – сподіваюся, скоро знову побачимося!' }
            }
        },
        {
            id: 'aerlig_talt',
            word: 'ærlig talt',
            category: 'vurdering',
            x: 92,
            y: 88,
            meaning: 'Oprigtig mening uden filter',
            sceneDesc: 'Manden rynker panden og siger oprigtigt: "Ærlig talt tror jeg ikke på den tidsplan."',
            sentence: 'Ærlig talt synes jeg det er svært.',
            contextSentence: 'Reglerne er meget indviklede, og ærlig talt forstår jeg ikke det nye regelsæt helt endnu.',
            ruleHint: 'Signalerer at taleren udtrykker sin 100% ufiltrerede, ærlige og personlige holdning.',
            translations: {
                en: { word: 'frankly / honestly speaking', sentence: 'The rules are intricate, and frankly speaking I don\'t fully understand them yet.' },
                de: { word: 'ehrlich gesagt', sentence: 'Die Regeln sind kompliziert, und ehrlich gesagt verstehe ich sie noch nicht ganz.' },
                es: { word: 'francamente / honestamente', sentence: 'Las reglas son complicadas, y honestamente todavía no las entiendo del todo.' },
                ar: { word: 'بصراحة / في الحقيقة', sentence: 'القواعد معقدة للغاية، وبصراحة لم أفهم المجموعة الجديدة من القواعد بعد.' },
                tr: { word: 'dürüst olmak gerekirse / açıkçası', sentence: 'Kurallar çok karmaşık ve açıkçası henüz tam olarak anlayabilmiş değilim.' },
                uk: { word: 'чесно кажучи', sentence: 'Правила дуже складні, і, чесно кажучи, я ще не до кінця їх розумію.' }
            }
        }
    ];

    // Helper for translations
    function getHoldningTranslation(item) {
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
        .adverbier-holdning-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 5rem;
            color: #f8fafc;
        }

        /* Hero Header */
        .holdning-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .holdning-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #4ade80;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
        }
        .holdning-hero h1 {
            font-size: 2.6rem;
            font-weight: 900;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #86efac, #22c55e, #15803d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .holdning-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 800px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        /* Golden Rule Banner */
        .golden-rule-banner-holdning {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9));
            border: 2px solid #22c55e;
            border-radius: 20px;
            padding: 1.4rem 2rem;
            max-width: 950px;
            margin: 0 auto 2.5rem;
            box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .rule-icon-holdning {
            font-size: 2.8rem;
            flex-shrink: 0;
        }
        .rule-content-holdning h4 {
            color: #86efac;
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
        }
        .rule-content-holdning p {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .rule-pills-row-holdning {
            display: flex;
            gap: 0.6rem;
            margin-top: 0.8rem;
            flex-wrap: wrap;
        }
        .rule-pill-holdning {
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 800;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #86efac;
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
            background: #16a34a;
            color: white;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }

        /* Tab 1: Vrimmel Layout */
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
            padding: 1rem 1.5rem;
            background: rgba(15, 23, 42, 0.85);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 1rem;
        }
        .vrimmel-filters {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .filter-btn {
            background: #334155;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.45rem 0.9rem;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .filter-btn:hover {
            background: #475569;
            color: white;
        }
        .filter-btn.active {
            background: #16a34a;
            color: white;
            border-color: #22c55e;
            box-shadow: 0 2px 8px rgba(34, 197, 94, 0.35);
        }
        .pure-toggle-btn {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #86efac;
            padding: 0.45rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .pure-toggle-btn.active {
            background: #15803d;
            color: white;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            line-height: 0;
            user-select: none;
            overflow: hidden;
            background: #0f172a;
        }
        .vrimmel-img {
            width: 100%;
            height: auto;
            display: block;
        }

        .hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #16a34a;
            border: 2.5px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 0.85rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 15px rgba(34, 197, 94, 0.6);
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.3);
            background: #22c55e;
            box-shadow: 0 0 25px #22c55e;
            z-index: 25;
        }
        .hotspot-pin.active {
            transform: translate(-50%, -50%) scale(1.35);
            background: #eab308;
            border-color: #ffffff;
            box-shadow: 0 0 30px #eab308;
            z-index: 30;
        }
        .hotspot-label {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            color: #86efac;
            border: 1px solid #22c55e;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 4px;
            pointer-events: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        /* Målords Præsentationsboks under vrimlebilledet */
        .vrimmel-inspector {
            background: #1e293b;
            border: 2px solid #22c55e;
            border-radius: 20px;
            margin-top: 1.5rem;
            padding: 1.8rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 2rem;
            align-items: start;
            animation: fadeIn 0.3s ease;
        }
        @media (max-width: 850px) {
            .vrimmel-inspector { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        .inspector-left, .inspector-right {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .inspector-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .inspector-badge-row {
            display: flex;
            gap: 0.6rem;
            align-items: center;
            flex-wrap: wrap;
        }
        .inspector-badge {
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid #22c55e;
            color: #86efac;
            padding: 0.25rem 0.75rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
        }
        .inspector-audio-btn {
            background: #16a34a;
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(34, 197, 94, 0.3);
        }
        .inspector-audio-btn:hover {
            background: #22c55e;
            transform: scale(1.1);
        }
        .inspector-word-title {
            font-size: 2.2rem;
            font-weight: 900;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin: 0;
        }
        .inspector-trans-box {
            background: #0f172a;
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border-left: 4px solid #22c55e;
        }
        .trans-badge-label {
            font-size: 0.75rem;
            font-weight: 800;
            color: #86efac;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.25rem;
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
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .scene-heading {
            font-size: 0.85rem;
            font-weight: 800;
            color: #94a3b8;
            margin-bottom: 0.4rem;
            text-transform: uppercase;
        }
        .scene-text {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .inspector-sentence-card {
            background: #0f172a;
            border-radius: 14px;
            padding: 1.2rem;
            border: 1.5px solid rgba(34, 197, 94, 0.3);
        }
        .sentence-quote-text {
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
            line-height: 1.5;
            margin-bottom: 0.5rem;
        }
        .sentence-trans-text {
            font-size: 0.95rem;
            color: #94a3b8;
            font-style: italic;
            margin-bottom: 0.8rem;
        }
        .inspector-speak-btn {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #86efac;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }
        .inspector-speak-btn:hover {
            background: #22c55e;
            color: #0f172a;
        }
        .inspector-actions {
            display: flex;
            gap: 0.8rem;
            margin-top: 0.5rem;
        }
        .inspector-btn-action {
            flex: 1;
            background: #334155;
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .inspector-btn-action:hover {
            background: #475569;
        }

        /* Tab 2: Aha-Værkstedet */
        .vaerksted-container {
            max-width: 950px;
            margin: 0 auto;
        }
        .vaerksted-subtabs {
            display: flex;
            gap: 0.8rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .vaerksted-subtab-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
        }
        .vaerksted-subtab-btn:hover {
            border-color: #22c55e;
            color: white;
        }
        .vaerksted-subtab-btn.active {
            background: #16a34a;
            border-color: #4ade80;
            color: white;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }

        /* Sandsynligheds-Lineal / Barometer */
        .barometer-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            margin-bottom: 2rem;
        }
        .barometer-scale-track {
            height: 14px;
            border-radius: 7px;
            background: linear-gradient(to right, #ef4444 0%, #f97316 20%, #eab308 50%, #22c55e 80%, #10b981 100%);
            margin: 2.5rem 1rem 1.5rem;
            position: relative;
        }
        .barometer-step-pills {
            display: flex;
            justify-content: space-between;
            position: relative;
            margin-top: -24px;
        }
        .barometer-node {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: all 0.25s;
        }
        .barometer-dot {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #0f172a;
            border: 3px solid #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 800;
            color: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            transition: all 0.2s;
        }
        .barometer-node:hover .barometer-dot, .barometer-node.active .barometer-dot {
            transform: scale(1.3);
            border-color: white;
            background: #16a34a;
            box-shadow: 0 0 18px #22c55e;
        }
        .barometer-label {
            margin-top: 0.6rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #94a3b8;
            text-align: center;
        }
        .barometer-node.active .barometer-label {
            color: #86efac;
        }
        .barometer-pct {
            font-size: 0.72rem;
            color: #64748b;
        }

        .barometer-demo-box {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.8rem;
            border: 2px solid #22c55e;
            margin-top: 2rem;
            text-align: center;
        }
        .barometer-demo-sentence {
            font-size: 1.55rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.8rem;
        }
        .barometer-demo-pct-badge {
            display: inline-block;
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
            border: 1px solid #22c55e;
            padding: 0.3rem 0.9rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.85rem;
            margin-bottom: 1rem;
        }
        .barometer-demo-desc {
            font-size: 1.05rem;
            color: #cbd5e1;
            max-width: 650px;
            margin: 0 auto 1.2rem;
            line-height: 1.6;
        }

        /* Holdnings-Transformeren */
        .transformer-holdning-box {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .transformer-pill-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0 2rem;
        }
        .trans-holdning-btn {
            background: #0f172a;
            color: #cbd5e1;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .trans-holdning-btn:hover {
            border-color: #22c55e;
            background: #334155;
            color: white;
        }
        .trans-holdning-btn.active {
            border-color: #4ade80;
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }

        /* Tab 3: Holdnings-Detektiven */
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
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid #22c55e;
            color: #86efac;
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
            border-left: 5px solid #22c55e;
            margin-bottom: 2rem;
            text-align: center;
        }
        .detektiv-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
            border-color: #22c55e;
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

        /* Tab 4: Sætningsbyggeren */
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
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid #22c55e;
            color: #86efac;
            padding: 0.4rem 1rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.85rem;
            text-transform: uppercase;
            margin-bottom: 1.2rem;
        }
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
        .flow-step.flow-adverbium { border-color: #06b6d4; }
        .flow-step.flow-rest { border-color: #0ea5e9; }
        .flow-step-num { font-size: 0.75rem; font-weight: 800; margin-bottom: 0.2rem; }
        .flow-step.flow-subjekt .flow-step-num { color: #86efac; }
        .flow-step.flow-verbum .flow-step-num { color: #fca5a5; }
        .flow-step.flow-adverbium .flow-step-num { color: #22d3ee; }
        .flow-step.flow-rest .flow-step-num { color: #7dd3fc; }
        .flow-step-title { font-size: 0.95rem; font-weight: 800; color: white; }

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
            min-width: 120px;
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

        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.8rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 750px) {
            .sb-puzzle-slots { grid-template-columns: 1fr 1fr; }
        }
        .sb-puzzle-slot {
            background: #0f172a;
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
        }
        .sb-puzzle-slot.slot-subjekt { border-color: #22c55e; }
        .sb-puzzle-slot.slot-verbum { border-color: #ef4444; }
        .sb-puzzle-slot.slot-adverbium { border-color: #06b6d4; }
        .sb-puzzle-slot.slot-rest { border-color: #0ea5e9; }
        .sb-puzzle-slot.filled {
            border-style: solid;
            background: rgba(15, 23, 42, 0.9);
        }
        .slot-badge-callout {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 0.4rem;
        }
        .callout-subjekt { color: #86efac; }
        .callout-verbum { color: #fca5a5; }
        .callout-adverbium { color: #22d3ee; }
        .callout-rest { color: #7dd3fc; }

        .sb-puzzle-chips {
            display: flex;
            gap: 0.8rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }
        .sb-puzzle-chip {
            background: #334155;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.2);
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
        }
        .sb-puzzle-chip:hover {
            border-color: #22c55e;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.used {
            opacity: 0.25;
            pointer-events: none;
        }

        /* Generic Quiz / Special tabs */
        .special-tab-container {
            max-width: 950px;
            margin: 0 auto;
        }
        .special-intro-box {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 2rem;
            text-align: center;
        }
        .special-intro-box h2 {
            font-size: 2.2rem;
            color: #86efac;
            margin-bottom: 0.6rem;
        }
        .special-intro-box p {
            color: #cbd5e1;
            font-size: 1.1rem;
            max-width: 750px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .special-rule-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.2rem;
            margin-bottom: 2.5rem;
        }
        .special-rule-card {
            background: #0f172a;
            border-radius: 16px;
            padding: 1.4rem;
            border: 2px solid;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .special-rule-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .special-rule-word {
            font-size: 1.4rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .special-rule-role {
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.2rem 0.6rem;
            border-radius: 6px;
            text-transform: uppercase;
        }
        .special-rule-desc {
            font-size: 0.92rem;
            color: #cbd5e1;
            line-height: 1.5;
            flex-grow: 1;
        }
        .special-rule-example {
            background: rgba(15, 23, 42, 0.8);
            padding: 0.8rem;
            border-radius: 10px;
            border-left: 3px solid;
            font-size: 0.95rem;
            color: #f8fafc;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .rule-speak-btn {
            background: transparent;
            border: none;
            color: #cbd5e1;
            cursor: pointer;
            font-size: 1.1rem;
            padding: 0 0.3rem;
            transition: transform 0.2s;
        }
        .rule-speak-btn:hover {
            transform: scale(1.2);
            color: white;
        }

        .exercise-action-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .progress-header {
            display: flex;
            justify-content: space-between;
            color: #94a3b8;
            font-weight: 800;
            font-size: 0.95rem;
            margin-bottom: 0.8rem;
        }
        .progress-bar-wrap {
            height: 8px;
            background: #334155;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 2rem;
        }
        .progress-bar-fill {
            height: 100%;
            background: #22c55e;
            transition: width 0.3s ease;
        }
        .exercise-dialog-quote {
            font-size: 1.4rem;
            color: white;
            line-height: 1.8;
            background: #0f172a;
            padding: 1.5rem;
            border-radius: 14px;
            border-left: 5px solid #22c55e;
            margin-bottom: 1.8rem;
        }

        .action-btn-primary {
            background: #16a34a;
            color: white;
            border: none;
            padding: 0.85rem 1.6rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.35);
        }
        .action-btn-primary:hover {
            background: #22c55e;
            transform: translateY(-2px);
        }

        .score-celebration-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
            border: 2px solid #22c55e;
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(34, 197, 94, 0.35);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'holdning-hero';
    hero.innerHTML = `
        <div class="holdning-hero-tag">
            <span>🎲</span> Felt 6 • 20 holdningsadverbier
        </div>
        <h1>Sikkerhed, Tvivl & Holdning</h1>
        <p>Mestre sandsynlighedsskalaen fra 100% vished (<em>helt sikkert</em>) over formodning (<em>sandsynligvis</em>) til tvivl (<em>måske</em>, <em>næppe</em>) og 0% (<em>umuligt</em>), samt dine personlige vurderinger (<em>heldigvis</em>, <em>desværre</em>, <em>ærlig talt</em>).</p>
    `;
    viewContainer.appendChild(hero);

    // Golden Rule Banner
    const goldenBanner = document.createElement('div');
    goldenBanner.className = 'golden-rule-banner-holdning';
    goldenBanner.innerHTML = `
        <div class="rule-icon-holdning">💡</div>
        <div class="rule-content-holdning">
            <h4>Nøglen til holdning: Hvor sikker er du, og hvordan vurderer du det?</h4>
            <p>
                Holdningsadverbier ændrer ikke selve handlingen, men afslører talerens <strong>troværdighed</strong>, <strong>sikkerhed</strong> og <strong>følelsesmæssige reaktion</strong>.
            </p>
            <div class="rule-pills-row-holdning">
                <span class="rule-pill-holdning">100%: sikkert / selvfølgelig</span>
                <span class="rule-pill-holdning">80%: sandsynligvis / formentlig</span>
                <span class="rule-pill-holdning">50%: måske / muligvis</span>
                <span class="rule-pill-holdning">15%: næppe (stærk tvivl)</span>
                <span class="rule-pill-holdning">0%: umuligt</span>
                <span class="rule-pill-holdning">Følelse: heldigvis vs. desværre</span>
            </div>
        </div>
    `;
    viewContainer.appendChild(goldenBanner);

    // Tabs Navigation
    const nav = document.createElement('div');
    nav.className = 'adv-tabs-nav';

    const tabs = [
        { id: 'vrimmel', label: '1. Planlægningsrummet (Vrimlebilledet)', icon: '🖼️' },
        { id: 'vaerksted', label: '2. Sandsynligheds- & Holdningsbarometret', icon: '📊' },
        { id: 'detektiv', label: '3. Holdnings-Detektiven (10 gåder)', icon: '🔍' },
        { id: 'builder', label: '4. Sætningsbyggeren & Puslespillet', icon: '🧩' },
        { id: 'kontekst', label: '5. Kontekst-testen (14 opgaver)', icon: '🎯' },
        { id: 'tvivl', label: '6. Tvivlens Grader: Næppe, umuligt... 📉', icon: '📉' },
        { id: 'tone', label: '7. Heldigvis & desværre (Social tone) 🎭', icon: '🎭' },
        { id: 'beviser', label: '8. Bevis-Detektiven (70-90%) 🔬', icon: '🔬' }
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
        } else if (tabId === 'tvivl') {
            renderTabTvivl(tabContent);
        } else if (tabId === 'tone') {
            renderTabTone(tabContent);
        } else if (tabId === 'beviser') {
            renderTabBeviser(tabContent);
        }
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET (Planlægningsrummet)
    // ==========================================
    let activeFilter = 'alle';
    let isPureMode = false;
    let selectedWord = null;

    function renderTabVrimmel(parent) {
        parent.innerHTML = '';

        if (!selectedWord) {
            selectedWord = ADVERBIER_HOLDNING_DATA[0];
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
            { id: 'alle', label: 'Alle (20)' },
            { id: 'sikkerhed', label: 'Sikkerhed & vished (100%)' },
            { id: 'sandsynlighed', label: 'Sandsynlighed (70-90%)' },
            { id: 'tvivl', label: 'Tvivl & udelukkelse (0-50%)' },
            { id: 'vurdering', label: 'Holdning & følelser' }
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
        img.src = 'assets/adverbier_holdning_vrimmel.jpg';
        img.alt = 'Sikkerhed, tvivl og holdning i planlægningsrummet';
        img.className = 'vrimmel-img';
        stage.appendChild(img);

        // Filter words
        const visibleWords = ADVERBIER_HOLDNING_DATA.filter(item => {
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
        inspector.id = 'holdning-inspector-box';
        layout.appendChild(inspector);
        parent.appendChild(layout);

        function updateInspector(item, shouldScroll = false) {
            selectedWord = item;

            // Opdater aktiv pin markør på vrimlebilledet
            stage.querySelectorAll('.hotspot-pin').forEach(p => {
                p.classList.toggle('active', p.dataset.id === item.id);
            });

            const trans = getHoldningTranslation(item);
            const currentLang = getLang();
            const langLabel = currentLang === 'da' ? 'Engelsk (støtte)' : currentLang.toUpperCase();

            const catNames = {
                'sikkerhed': 'Sikkerhed & Vished (100%)',
                'sandsynlighed': 'Sandsynlighed (~70-90%)',
                'tvivl': 'Tvivl & Udelukkelse (0-50%)',
                'vurdering': 'Holdning & Følelser'
            };

            inspector.innerHTML = `
                <div class="inspector-left">
                    <div class="inspector-header">
                        <div class="inspector-badge-row">
                            <span class="inspector-badge" style="background: rgba(34, 197, 94, 0.25); border: 1.5px solid #22c55e; color: #86efac; font-weight: 800;">📍 Målord: ${item.word}</span>
                            <span class="inspector-badge">${catNames[item.category] || 'Holdning'}</span>
                        </div>
                        <button class="inspector-audio-btn" id="inspector-audio-btn" title="Hør udtale">🔊</button>
                    </div>

                    <h2 class="inspector-word-title">
                        <span>🎲</span> ${item.word}
                    </h2>

                    <div class="inspector-trans-box">
                        <div class="trans-badge-label">
                            <span>🌐</span> OVERSÆTTELSE (${langLabel})
                        </div>
                        <div class="trans-word-val">"${trans.word}"</div>
                    </div>

                    <div class="inspector-scene-box">
                        <div class="scene-heading">📍 I planlægningsrummet</div>
                        <p class="scene-text">${item.sceneDesc}</p>
                    </div>
                </div>

                <div class="inspector-right">
                    <div class="inspector-sentence-card">
                        <div class="scene-heading" style="color: #86efac;">💬 Eksempelsætning</div>
                        <p class="sentence-quote-text">"${item.contextSentence}"</p>
                        ${trans.sentence ? `<p class="sentence-trans-text">"${trans.sentence}"</p>` : ''}
                        <button class="inspector-speak-btn" id="inspector-action-speak">
                            <span>🗣️</span> Hør sætning
                        </button>
                    </div>

                    <div class="inspector-scene-box" style="border-left: 4px solid #22c55e;">
                        <div class="scene-heading" style="color: #86efac;">💡 Didaktisk holdnings-regel</div>
                        <p class="scene-text">${item.ruleHint}</p>
                    </div>

                    <div class="inspector-actions">
                        <button class="inspector-btn-action" id="inspector-action-prev">
                            ← Forrige ord
                        </button>
                        <button class="inspector-btn-action" style="background: #16a34a;" id="inspector-action-next">
                            Næste ord ➔
                        </button>
                    </div>
                </div>
            `;

            // Bind events
            inspector.querySelector('#inspector-audio-btn').onclick = () => speakDanish(item.word);
            inspector.querySelector('#inspector-action-speak').onclick = () => speakDanish(item.contextSentence);

            inspector.querySelector('#inspector-action-prev').onclick = () => {
                const currentIdx = ADVERBIER_HOLDNING_DATA.findIndex(w => w.id === item.id);
                const prevIdx = (currentIdx - 1 + ADVERBIER_HOLDNING_DATA.length) % ADVERBIER_HOLDNING_DATA.length;
                const prevItem = ADVERBIER_HOLDNING_DATA[prevIdx];
                updateInspector(prevItem, true);
                speakDanish(prevItem.sentence);
            };

            inspector.querySelector('#inspector-action-next').onclick = () => {
                const currentIdx = ADVERBIER_HOLDNING_DATA.findIndex(w => w.id === item.id);
                const nextIdx = (currentIdx + 1) % ADVERBIER_HOLDNING_DATA.length;
                const nextItem = ADVERBIER_HOLDNING_DATA[nextIdx];
                updateInspector(nextItem, true);
                speakDanish(nextItem.sentence);
            };

            if (shouldScroll) {
                inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // Initialiser inspektøren
        updateInspector(selectedWord, false);
    }

    // ==========================================
    // TAB 2: AHA-VÆRKSTEDET (Sandsynligheds- & Holdningsbarometret)
    // ==========================================
    let vaerkstedSubTab = 'barometer'; // 'barometer', 'polarity', 'tilsyneladende'
    let selectedScaleWord = 'sandsynligvis';
    let selectedPolarityWord = 'heldigvis';

    const SCALE_DATA = {
        'sikkert': {
            pct: '100%',
            name: 'Helt sikkert',
            color: '#10b981',
            sentence: 'Projektet bliver sikkert færdigt til tiden.',
            desc: 'Fuldstændig overbevisning. Taleren er ikke i tvivl om udfaldet.'
        },
        'sandsynligvis': {
            pct: '85%',
            name: 'Meget sandsynligt',
            color: '#22c55e',
            sentence: 'Projektet bliver sandsynligvis færdigt til tiden.',
            desc: 'Høj sandsynlighed baseret på data, fremdrift og erfaring. Der er dog en lillebitte usikkerhed.'
        },
        'formentlig': {
            pct: '75%',
            name: 'Logisk formodning',
            color: '#84cc16',
            sentence: 'Projektet bliver formentlig færdigt til tiden.',
            desc: 'En kvalificeret antagelse. Det er den mest logiske forventning ud fra situationen.'
        },
        'maaske': {
            pct: '50%',
            name: '50/50 Mulighed',
            color: '#eab308',
            sentence: 'Projektet bliver måske færdigt til tiden.',
            desc: 'Vægtskålen står lige på midten. Chancen for succes og forsinkelse er lige stor.'
        },
        'naeppe': {
            pct: '15%',
            name: 'Stærk tvivl (Næsten ikke)',
            color: '#f97316',
            sentence: 'Projektet bliver næppe færdigt til tiden.',
            desc: 'Betyder "næsten sikkert IKKE". En høflig måde at signalere stærk skepsis på.'
        },
        'usandsynligt': {
            pct: '5%',
            name: 'Meget usandsynligt',
            color: '#f43f5e',
            sentence: 'Det er usandsynligt, at projektet bliver færdigt til tiden.',
            desc: 'Oddsene er ekstremt små. Kun et mirakel kan nå at redde tidsplanen.'
        },
        'umuligt': {
            pct: '0%',
            name: 'Fuldstændig udelukket',
            color: '#ef4444',
            sentence: 'Projektet kan umuligt blive færdigt til tiden.',
            desc: 'Nulpunktet. Tidsplanen kan under ingen omstændigheder overholdes.'
        }
    };

    const POLARITY_DATA = {
        'neutral': {
            label: 'Neutral kendsgerning',
            sentence: 'Det regner i dag.',
            desc: 'Kun tør information uden følelser eller personlig kommentar.'
        },
        'heldigvis': {
            label: 'Lettelse & positivt udfald',
            sentence: 'Heldigvis regner det i dag!',
            desc: 'Taleren er glad for regnen (f.eks. for tørken, haven eller naturen).'
        },
        'desvaerre': {
            label: 'Beklagelse & uheldigt udfald',
            sentence: 'Desværre regner det i dag.',
            desc: 'Taleren ærgrer sig (f.eks. fordi de skulle have holdt havefest eller gået en tur).'
        },
        'forhaabentlig': {
            label: 'Fremtidsønske & håb',
            sentence: 'Forhåbentlig regner det snart.',
            desc: 'Taleren udtrykker et stærkt håb om, at regnen snart kommer og hjælper.'
        },
        'aerlig_talt': {
            label: 'Oprigtig holdning uden filter',
            sentence: 'Ærlig talt er jeg træt af al den regn.',
            desc: 'Taleren siger sin ærlige og ufiltrerede mening direkte til samtalepartneren.'
        }
    };

    function renderTabVaerksted(parent) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'vaerksted-container';

        wrap.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2.2rem; color: #86efac; margin-bottom: 0.5rem;">Aha-værkstedet: Sandsynlighed & Holdning</h2>
                <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 750px; margin: 0 auto;">
                    Udforsk sandsynlighedsskalaen fra 100% til 0%, og se hvordan talerens holdning forvandler en objektiv kendsgerning til lettelse, beklagelse eller håb.
                </p>
            </div>

            <div class="vaerksted-subtabs">
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'barometer' ? 'active' : ''}" id="v-subtab-baro">
                    📊 1. Sandsynligheds-Barometret (0% - 100%)
                </button>
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'polarity' ? 'active' : ''}" id="v-subtab-polar">
                    ⚖️ 2. Holdnings-Polariteten (Heldigvis vs. Desværre)
                </button>
                <button class="vaerksted-subtab-btn ${vaerkstedSubTab === 'tilsyneladende' ? 'active' : ''}" id="v-subtab-til">
                    🔍 3. Tilsyneladende vs. Åbenbart
                </button>
            </div>

            <div id="vaerksted-slot"></div>
        `;

        const slot = wrap.querySelector('#vaerksted-slot');

        wrap.querySelector('#v-subtab-baro').onclick = () => {
            vaerkstedSubTab = 'barometer';
            renderTabVaerksted(parent);
        };
        wrap.querySelector('#v-subtab-polar').onclick = () => {
            vaerkstedSubTab = 'polarity';
            renderTabVaerksted(parent);
        };
        wrap.querySelector('#v-subtab-til').onclick = () => {
            vaerkstedSubTab = 'tilsyneladende';
            renderTabVaerksted(parent);
        };

        if (vaerkstedSubTab === 'barometer') {
            renderBarometerSubtab(slot);
        } else if (vaerkstedSubTab === 'polarity') {
            renderPolaritySubtab(slot);
        } else {
            renderTilsyneladendeSubtab(slot);
        }

        parent.appendChild(wrap);
    }

    function renderBarometerSubtab(slot) {
        const card = document.createElement('div');
        card.className = 'barometer-card';

        const keys = Object.keys(SCALE_DATA);
        const curr = SCALE_DATA[selectedScaleWord];

        card.innerHTML = `
            <h3 style="font-size: 1.5rem; color: #86efac; text-align: center; margin-bottom: 0.5rem;">
                Den Gyldne Sandsynlighedsskala
            </h3>
            <p style="color: #94a3b8; text-align: center; font-size: 0.95rem; margin-bottom: 2rem;">
                Klik på et adverbium langs barometeret for at se, hvordan sandsynligheden ændrer sætningens betydning:
            </p>

            <div class="barometer-scale-track"></div>

            <div class="barometer-step-pills" id="baro-nodes-row"></div>

            <div class="barometer-demo-box">
                <span class="barometer-demo-pct-badge" style="background: ${curr.color}22; border-color: ${curr.color}; color: ${curr.color};">
                    Sandsynlighed: ${curr.pct} (${curr.name})
                </span>
                <div class="barometer-demo-sentence">
                    "${curr.sentence}"
                </div>
                <div class="barometer-demo-desc">
                    ${curr.desc}
                </div>
                <button class="action-btn-primary" id="baro-listen-btn">
                    <span>🔊</span> Hør udtale
                </button>
            </div>
        `;

        const nodesRow = card.querySelector('#baro-nodes-row');
        keys.forEach(k => {
            const item = SCALE_DATA[k];
            const node = document.createElement('div');
            node.className = `barometer-node ${selectedScaleWord === k ? 'active' : ''}`;
            node.innerHTML = `
                <div class="barometer-dot">${item.pct}</div>
                <div class="barometer-label">${k}</div>
            `;
            node.onclick = () => {
                selectedScaleWord = k;
                speakDanish(item.sentence);
                slot.innerHTML = '';
                renderBarometerSubtab(slot);
            };
            nodesRow.appendChild(node);
        });

        card.querySelector('#baro-listen-btn').onclick = () => {
            speakDanish(curr.sentence);
        };

        slot.appendChild(card);
    }

    function renderPolaritySubtab(slot) {
        const card = document.createElement('div');
        card.className = 'transformer-holdning-box';

        const curr = POLARITY_DATA[selectedPolarityWord];

        card.innerHTML = `
            <h3 style="font-size: 1.5rem; color: #86efac; text-align: center; margin-bottom: 0.5rem;">
                Holdnings-Polariteten: Heldigvis vs. Desværre
            </h3>
            <p style="color: #cbd5e1; text-align: center; font-size: 1rem; max-width: 700px; margin: 0 auto;">
                Selve kendsgerningen er uændret (<em>"Det regner"</em>), men dit valg af adverbium afslører, om hændelsen er god, dårlig eller ønskværdig for dig:
            </p>

            <div class="transformer-pill-grid">
                <button class="trans-holdning-btn ${selectedPolarityWord === 'neutral' ? 'active' : ''}" data-word="neutral">
                    ⚪ Neutral (Fakta)
                </button>
                <button class="trans-holdning-btn ${selectedPolarityWord === 'heldigvis' ? 'active' : ''}" data-word="heldigvis">
                    🟢 Heldigvis (Lettelse)
                </button>
                <button class="trans-holdning-btn ${selectedPolarityWord === 'desvaerre' ? 'active' : ''}" data-word="desvaerre">
                    🔴 Desværre (Beklagelse)
                </button>
                <button class="trans-holdning-btn ${selectedPolarityWord === 'forhaabentlig' ? 'active' : ''}" data-word="forhaabentlig">
                    🟡 Forhåbentlig (Ønske)
                </button>
                <button class="trans-holdning-btn ${selectedPolarityWord === 'aerlig_talt' ? 'active' : ''}" data-word="aerlig_talt">
                    💬 Ærlig talt (Oprigtighed)
                </button>
            </div>

            <div class="barometer-demo-box">
                <div style="font-size: 0.9rem; color: #86efac; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">
                    Signalerer: ${curr.label}
                </div>
                <div class="barometer-demo-sentence">
                    "${curr.sentence}"
                </div>
                <div class="barometer-demo-desc">
                    ${curr.desc}
                </div>
                <button class="action-btn-primary" id="polarity-listen-btn">
                    <span>🔊</span> Hør sætning
                </button>
            </div>
        `;

        card.querySelectorAll('.trans-holdning-btn').forEach(btn => {
            btn.onclick = () => {
                selectedPolarityWord = btn.getAttribute('data-word');
                speakDanish(POLARITY_DATA[selectedPolarityWord].sentence);
                slot.innerHTML = '';
                renderPolaritySubtab(slot);
            };
        });

        card.querySelector('#polarity-listen-btn').onclick = () => {
            speakDanish(curr.sentence);
        };

        slot.appendChild(card);
    }

    function renderTilsyneladendeSubtab(slot) {
        const card = document.createElement('div');
        card.className = 'transformer-holdning-box';

        card.innerHTML = `
            <h3 style="font-size: 1.5rem; color: #86efac; text-align: center; margin-bottom: 0.5rem;">
                Tilsyneladende vs. Åbenbart: Hvad er forskellen?
            </h3>
            <p style="color: #cbd5e1; text-align: center; font-size: 1rem; max-width: 750px; margin: 0 auto 2rem;">
                Disse to ord forveksles ofte af udlændinge, men har en afgørende epistemisk forskel:
            </p>

            <div class="special-rule-cards-grid" style="grid-template-columns: 1fr 1fr;">
                <div class="special-rule-card" style="border-color: rgba(34, 197, 94, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #86efac;">
                            <span>👀</span> tilsyneladende
                        </div>
                        <span class="special-rule-role" style="background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid #22c55e;">Overflade / Forbehold</span>
                    </div>
                    <div class="special-rule-desc">
                        Det <strong>ser sådan ud på overfladen</strong> ("apparently / seemingly"), men du er ikke 100% sikker, og virkeligheden kan vise sig at være en anden.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #22c55e;">
                        <span>"Han har <strong>tilsyneladende</strong> glemt mødet."</span>
                        <button class="rule-speak-btn" data-speak="Han har tilsyneladende glemt mødet.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(6, 182, 212, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #22d3ee;">
                            <span>💡</span> åbenbart
                        </div>
                        <span class="special-rule-role" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; border: 1px solid #06b6d4;">Afsløret bevis</span>
                    </div>
                    <div class="special-rule-desc">
                        Noget er <strong>blevet bevist eller tydeligt</strong> ("evidently / clearly"). Kendsgerningen er nu kommet frem i lyset, og sagen er klar.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #06b6d4;">
                        <span>"Toget er <strong>åbenbart</strong> blevet aflyst."</span>
                        <button class="rule-speak-btn" data-speak="Toget er åbenbart blevet aflyst.">🔊</button>
                    </div>
                </div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.8); padding: 1.4rem; border-radius: 14px; border-left: 4px solid #22c55e; line-height: 1.6; color: #cbd5e1;">
                ✔️ <strong>Huskereglen:</strong><br>
                • <strong>Tilsyneladende</strong> = "Sådan ser det ud, men hvem ved?" (Usikker overflade)<br>
                • <strong>Åbenbart</strong> = "Nu ser vi det alle sammen sort på hvidt!" (Klart bevis)
            </div>
        `;

        card.querySelectorAll('.rule-speak-btn').forEach(b => {
            b.onclick = () => speakDanish(b.getAttribute('data-speak'));
        });

        slot.appendChild(card);
    }

    // ==========================================
    // TAB 3: HOLDNINGS-DETEKTIVEN (10 gåder)
    // ==========================================
    const DETEKTIV_QUESTIONS = [
        {
            context: '🌦️ Vejrudsigten på skærmen',
            prompt: 'Meteorologen melder 85% risiko for regn i eftermiddag. Hvilket adverbium passer præcist til denne høje sandsynlighed?',
            quote: 'Det begynder ______ at regne senere på dagen.',
            options: ['sandsynligvis', 'sikkert', 'umuligt'],
            correct: 'sandsynligvis',
            hints: {
                sikkert: 'Nej. 85% er ikke 100% garanti, så "sikkert" er for stærkt.',
                umuligt: 'Nej. 85% er næsten det stik modsatte af 0% (umuligt).',
                sandsynligvis: 'Korrekt! "Sandsynligvis" udtrykker netop høj sandsynlighed (~80-90%) baseret på vejrprognoser.'
            }
        },
        {
            context: '☕ Kaffemaskinen i pauserummet',
            prompt: 'Kaffemaskinen på kontoret er gået i stykker, og du overbringer den ærgerlige nyhed til dine tørstige kolleger:',
            quote: 'Der er ______ ingen frisk kaffe i dag.',
            options: ['desværre', 'heldigvis', 'selvfølgelig'],
            correct: 'desværre',
            hints: {
                heldigvis: 'Nej. Ingen kaffe er en dårlig nyhed for kollegerne, ikke en positiv lettelse!',
                selvfølgelig: 'Nej. En maskine der bryder sammen er ikke en naturlig selvfølge.',
                desværre: 'Korrekt! "Desværre" bruges til at beklage og overbringe dårlige eller ubelejlige nyheder høfligt.'
            }
        },
        {
            context: '🔑 Nøglerne der blev væk',
            prompt: 'Du har ledt overalt efter dine husnøgler i en halv time. Pludselig finder du dem i jakkelommen og ånder lettet op:',
            quote: '______ lå nøglerne nede i min lomme!',
            options: ['Heldigvis', 'Desværre', 'Næppe'],
            correct: 'Heldigvis',
            hints: {
                desværre: 'Nej. At finde nøglerne er en stor lettelse, ikke en beklagelse.',
                næppe: 'Nej. "Næppe" betyder "næsten ikke", men du HAR jo fundet dem.',
                Heldigvis: 'Korrekt! "Heldigvis" udtrykker ægte lettelse og et godt udfald på en uheldig situation.'
            }
        },
        {
            context: '⏰ Den pressede tidsplan',
            prompt: 'Der mangler to dages arbejde, men kontoret lukker om en time. Hvilket ord viser din stærke skepsis over for at nå det?',
            quote: 'Vi når ______ at blive færdige inden fyraften.',
            options: ['næppe', 'sikkert', 'heldigvis'],
            correct: 'næppe',
            hints: {
                sikkert: 'Nej. Det er stik modsat – du mangler masser af tid og tvivler stærkt.',
                heldigvis: 'Nej. Det er ikke en positiv nyhed, at man ikke når det.',
                næppe: 'Korrekt! "Næppe" betyder "næsten sikkert ikke" og viser stærk, realistisk tvivl.'
            }
        },
        {
            context: '☀️ Skyfri himmel over byen',
            prompt: 'Himlen er fuldstændig blå og skyfri. Din kollega spørger, om det regner i dag. Hvad svarer du med 100% vished?',
            quote: 'Nej, solen skinner og det regner ______ ikke i dag!',
            options: ['afgjort', 'måske', 'formentlig'],
            correct: 'afgjort',
            hints: {
                måske: 'Nej. Himlen er fuldstændig skyfri, så der er ingen grund til 50/50 tvivl.',
                formentlig: 'Nej. Du kan se det med dine egne øjne, så det er ikke blot en hypotese.',
                afgjort: 'Korrekt! "Afgjort" fastslår fakta uden tvivl: Solen skinner og regn er helt udelukket.'
            }
        },
        {
            context: '💼 Peters tomme stol',
            prompt: 'Peters computer er tændt og hans jakke hænger på stolen, men han er ikke ved sit bord. Hvad konkluderer du logisk?',
            quote: 'Han er ______ lige gået til frokost.',
            options: ['formentlig', 'umuligt', 'desværre'],
            correct: 'formentlig',
            hints: {
                umuligt: 'Nej. Det er absolut muligt, og alle tegn peger netop på det.',
                desværre: 'Nej. Der er ikke noget at beklage over, at en kollega spiser frokost.',
                formentlig: 'Korrekt! "Formentlig" er en velbegrundet logisk antagelse baseret på de synlige spor.'
            }
        },
        {
            context: '🗓️ Mødekalenderen i næste uge',
            prompt: 'Chefen har en meget tætpakket kalender, men der er et lille hul torsdag eftermiddag. Hvilket ord udtrykker muligheden?',
            quote: 'Vi kan ______ nå et kort møde torsdag kl. 14.',
            options: ['muligvis', 'umuligt', 'afgjort'],
            correct: 'muligvis',
            hints: {
                umuligt: 'Nej. Hullet i kalenderen gør det jo muligt, ikke umuligt.',
                afgjort: 'Nej. Chefen skal først bekræfte det, så det er endnu ikke 100% fastslået.',
                muligvis: 'Korrekt! "Muligvis" åbner for en konkret, teoretisk mulighed uden at love det for fast.'
            }
        },
        {
            context: '💳 Regningen på restauranten',
            prompt: 'Tjeneren kommer med en regning på ti tusind kroner for to kopper te. Hvad siger du om denne absurde fejl?',
            quote: 'Den pris kan ______ være rigtig!',
            options: ['umuligt', 'sandsynligvis', 'forhåbentlig'],
            correct: 'umuligt',
            hints: {
                sandsynligvis: 'Nej. Det ville betyde, at der er 85% chance for, at 10.000 kr er rigtigt!',
                forhåbentlig: 'Nej. Du håber bestemt ikke, at to kopper te koster en formue.',
                umuligt: 'Korrekt! "Umuligt" markerer 0% sandsynlighed – det kan under ingen omstændigheder passe.'
            }
        },
        {
            context: '💍 Havefesten i weekenden',
            prompt: 'I skal holde udendørs bryllup i haven i weekenden. Hvilket adverbium udtrykker jeres inderlige ønske for fremtiden?',
            quote: '______ holder vejret tørt på lørdag!',
            options: ['Forhåbentlig', 'Faktisk', 'Tilsyneladende'],
            correct: 'Forhåbentlig',
            hints: {
                Faktisk: 'Nej. Lørdag er i fremtiden, så du kender ikke de faktiske kendsgerninger endnu.',
                Tilsyneladende: 'Nej. Du udtrykker ikke en overfladisk observation, men et varmt ønske.',
                Forhåbentlig: 'Korrekt! "Forhåbentlig" bruges til at udtrykke håb og ønsker for fremtidige begivenheder.'
            }
        },
        {
            context: '🗣️ Oprigtig feedback blandt venner',
            prompt: 'En kollega beder om din 100% uforbeholdne, ærlige mening om et nyt design. Hvad siger du for at signalere oprigtighed?',
            quote: '______, så synes jeg farverne er for mørke.',
            options: ['Ærlig talt', 'Selvfølgelig', 'Rimeligvis'],
            correct: 'Ærlig talt',
            hints: {
                'Selvfølgelig': 'Nej. Personlig smag om farver er ikke en objektiv selvfølge.',
                'Rimeligvis': 'Nej. "Rimeligvis" handler om teknisk forventning, ikke personlig mening.',
                'Ærlig talt': 'Korrekt! "Ærlig talt" signalerer, at du svarer oprigtigt, direkte og uden omsvøb.'
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
                <h3 style="font-size: 1.5rem; color: #86efac; margin: 0;">Holdnings-Detektiven (10 gåder)</h3>
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
            verbum: 'klarer',
            adverbium: 'sikkert',
            rest: 'opgaven i dag',
            options: ['sikkert', 'umuligt', 'næppe', 'desværre'],
            correctWord: 'sikkert',
            hint: 'Talerens stærke overbevisning om succes.'
        },
        {
            subjekt: 'Han',
            verbum: 'kommer',
            adverbium: 'måske',
            rest: 'til mødet klokken 14',
            options: ['måske', 'afgjort', 'selvfølgelig', 'altid'],
            correctWord: 'måske',
            hint: '50/50 usikkerhed om han når frem.'
        },
        {
            subjekt: 'De',
            verbum: 'nåede',
            adverbium: 'heldigvis',
            rest: 'det sidste tog hjem',
            options: ['heldigvis', 'desværre', 'umuligt', 'næppe'],
            correctWord: 'heldigvis',
            hint: 'Positiv lettelse over at nå toget.'
        },
        {
            subjekt: 'Toget',
            verbum: 'er',
            adverbium: 'desværre',
            rest: 'en time forsinket',
            options: ['desværre', 'heldigvis', 'selvfølgelig', 'forhåbentlig'],
            correctWord: 'desværre',
            hint: 'Beklagelse over en ubehagelig forsinkelse.'
        },
        {
            subjekt: 'Hun',
            verbum: 'har',
            adverbium: 'formentlig',
            rest: 'glemt sin telefon',
            options: ['formentlig', 'umuligt', 'desværre', 'sikkert'],
            correctWord: 'formentlig',
            hint: 'Logisk antagelse baseret på at hun ikke svarer.'
        },
        {
            subjekt: 'Projektet',
            verbum: 'bliver',
            adverbium: 'afgjort',
            rest: 'en stor succes',
            options: ['afgjort', 'næppe', 'måske', 'desværre'],
            correctWord: 'afgjort',
            hint: 'Fastslået vished uden diskussion.'
        },
        {
            subjekt: 'Vejret',
            verbum: 'bliver',
            adverbium: 'forhåbentlig',
            rest: 'bedre i weekenden',
            options: ['forhåbentlig', 'faktisk', 'åbenbart', 'desværre'],
            correctWord: 'forhåbentlig',
            hint: 'Et personligt håb og ønske om solskin.'
        },
        {
            subjekt: 'Jeg',
            verbum: 'tror',
            adverbium: 'ærlig talt',
            rest: 'ikke på planen',
            options: ['ærlig talt', 'selvfølgelig', 'naturligvis', 'heldigvis'],
            correctWord: 'ærlig talt',
            hint: 'Ufiltreret personlig og oprigtig vurdering.'
        }
    ];

    let builderSentenceIdx = 0;
    let builderStep = 1;
    let puzzlePlaced = { subjekt: null, verbum: null, adverbium: null, rest: null };

    function renderTabBuilder(parent) {
        parent.innerHTML = '';

        const current = BUILDER_SENTENCES[builderSentenceIdx];
        const container = document.createElement('div');
        container.className = 'builder-container';

        const card = document.createElement('div');
        card.className = 'builder-card';

        if (builderStep === 1) {
            card.innerHTML = `
                <div class="builder-step-badge">
                    <span>1️⃣</span> Trin 1: Vælg det rette holdningsadverbium
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
                    <div class="flow-step flow-adverbium">
                        <div class="flow-step-num">3. ADVERBIUM 🎲</div>
                        <div class="flow-step-title">Hvor sikker/holdning?</div>
                    </div>
                    <div class="flow-step flow-rest">
                        <div class="flow-step-num">4. RESTLED</div>
                        <div class="flow-step-title">Hvad / hvor / hvornår?</div>
                    </div>
                </div>

                <div class="sb-sentence-display">
                    <span>${current.subjekt}</span>
                    <span>${current.verbum}</span>
                    <span class="sb-blank-slot" id="sb-live-blank">_______</span>
                    <span>${current.rest}</span>
                </div>

                <div style="font-weight: 800; color: #86efac; margin-bottom: 1rem; text-align: center;">
                    Hvilket holdningsadverbium passer bedst her?
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
                            <strong>Perfekt!</strong> "${opt}" rammer præcis talerens holdning.<br>
                            Lad os nu samle sætningen i det grammatiske puslespil!
                        `;
                        speakDanish(`${current.subjekt} ${current.verbum} ${opt} ${current.rest}`);

                        setTimeout(() => {
                            builderStep = 2;
                            puzzlePlaced = { subjekt: null, verbum: null, adverbium: null, rest: null };
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
            // Step 2: Puslespil
            card.innerHTML = `
                <div class="builder-step-badge">
                    <span>2️⃣</span> Trin 2: Puslespil & ordstilling
                </div>

                <h3 style="font-size: 1.4rem; color: white; margin-bottom: 0.5rem;">
                    Placér brikkerne i den rette rækkefølge
                </h3>
                <p style="color: #cbd5e1; font-size: 1rem; margin-bottom: 1.8rem;">
                    Læg mærke til de faste grammatiske farver: <strong>Grøn</strong> (Subjekt), <strong>Rød</strong> (Verbum), <strong>Turkis</strong> (Centraladverbium) og <strong>Blå</strong> (Restled).
                </p>

                <div class="sb-puzzle-slots">
                    <div class="sb-puzzle-slot slot-subjekt ${puzzlePlaced.subjekt ? 'filled' : ''}" id="slot-subjekt">
                        <span class="slot-badge-callout callout-subjekt">1. Subjekt</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.subjekt || 'Tom plads'}</div>
                    </div>
                    <div class="sb-puzzle-slot slot-verbum ${puzzlePlaced.verbum ? 'filled' : ''}" id="slot-verbum">
                        <span class="slot-badge-callout callout-verbum">2. Verbum</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.verbum || 'Tom plads'}</div>
                    </div>
                    <div class="sb-puzzle-slot slot-adverbium ${puzzlePlaced.adverbium ? 'filled' : ''}" id="slot-adverbium">
                        <span class="slot-badge-callout callout-adverbium">3. Adverbium 🎲</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.adverbium || 'Tom plads'}</div>
                    </div>
                    <div class="sb-puzzle-slot slot-rest ${puzzlePlaced.rest ? 'filled' : ''}" id="slot-rest">
                        <span class="slot-badge-callout callout-rest">4. Restled</span>
                        <div style="font-size: 1.15rem; font-weight: 800;">${puzzlePlaced.rest || 'Tom plads'}</div>
                    </div>
                </div>

                <div style="font-weight: 800; color: #94a3b8; margin-bottom: 1rem; text-align: center;">
                    Klik på brikkerne i rigtig rækkefølge:
                </div>

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

            const chips = [
                { role: 'subjekt', text: current.subjekt },
                { role: 'verbum', text: current.verbum },
                { role: 'adverbium', text: current.correctWord },
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
                    if (!puzzlePlaced.subjekt && chip.role === 'subjekt') {
                        puzzlePlaced.subjekt = chip.text;
                        chipBtn.classList.add('used');
                    } else if (puzzlePlaced.subjekt && !puzzlePlaced.verbum && chip.role === 'verbum') {
                        puzzlePlaced.verbum = chip.text;
                        chipBtn.classList.add('used');
                    } else if (puzzlePlaced.subjekt && puzzlePlaced.verbum && !puzzlePlaced.adverbium && chip.role === 'adverbium') {
                        puzzlePlaced.adverbium = chip.text;
                        chipBtn.classList.add('used');
                    } else if (puzzlePlaced.subjekt && puzzlePlaced.verbum && puzzlePlaced.adverbium && !puzzlePlaced.rest && chip.role === 'rest') {
                        puzzlePlaced.rest = chip.text;
                        chipBtn.classList.add('used');
                    } else {
                        feedbackBox.className = 'detektiv-feedback-box show wrong';
                        feedbackBox.innerHTML = `Husk rækkefølgen: 1. Subjekt ➔ 2. Verbum ➔ 3. Centraladverbium ➔ 4. Restled.`;
                        return;
                    }

                    renderTabBuilder(parent);

                    if (puzzlePlaced.subjekt && puzzlePlaced.verbum && puzzlePlaced.adverbium && puzzlePlaced.rest) {
                        const fb = parent.querySelector('#puzzle-feedback');
                        const nBtn = parent.querySelector('#puzzle-next-btn');
                        if (fb) {
                            fb.className = 'detektiv-feedback-box show correct';
                            fb.innerHTML = `<strong>Korrekt samlet!</strong> "${current.subjekt} ${current.verbum} ${current.correctWord} ${current.rest}".`;
                        }
                        if (nBtn) nBtn.style.display = 'inline-flex';
                        speakDanish(`${current.subjekt} ${current.verbum} ${current.correctWord} ${current.rest}`);
                    }
                };

                chipsPool.appendChild(chipBtn);
            });

            card.querySelector('#puzzle-reset-btn').onclick = () => {
                puzzlePlaced = { subjekt: null, verbum: null, adverbium: null, rest: null };
                renderTabBuilder(parent);
            };

            card.querySelector('#puzzle-next-btn').onclick = () => {
                builderStep = 1;
                builderSentenceIdx = (builderSentenceIdx + 1) % BUILDER_SENTENCES.length;
                puzzlePlaced = { subjekt: null, verbum: null, adverbium: null, rest: null };
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
            dialog: 'A: "Tror du projektet når deadline på fredag?"<br>B: "Ja, vi har arbejdet overtid, så vi når det ______!"',
            options: ['sikkert', 'umuligt', 'næppe'],
            correct: 'sikkert',
            feedback: '"Sikkert" udtrykker stor overbevisning og tryghed i svaret.'
        },
        {
            dialog: 'A: "Vil du give mig en hånd med de tunge kasser?"<br>B: "Ja, ______ vil jeg gerne hjælpe dig!"',
            options: ['selvfølgelig', 'næppe', 'umuligt'],
            correct: 'selvfølgelig',
            feedback: '"Selvfølgelig" viser at hjælpsomheden er en naturlig og glad selvfølge.'
        },
        {
            dialog: 'A: "Skal vi følge sikkerhedsproceduren ved laboratoriet?"<br>B: "Ja, vi følger ______ alle retningslinjer til punkt og prikke."',
            options: ['naturligvis', 'måske', 'desværre'],
            correct: 'naturligvis',
            feedback: '"Naturligvis" giver en formel og faglig bekræftelse af selvfølgeligheden.'
        },
        {
            dialog: 'A: "Jeg troede, at museet var lukket om mandagen."<br>B: "Nej, de har ______ åbent i hele sommerferien!"',
            options: ['faktisk', 'umuligt', 'næppe'],
            correct: 'faktisk',
            feedback: '"Faktisk" korrigerer en forkert antagelse med virkelighedens kendsgerning.'
        },
        {
            dialog: 'A: "Himlen er dækket af mørke tordenskyer."<br>B: "Ja, det begynder ______ at regne inden længe."',
            options: ['sandsynligvis', 'umuligt', 'selvfølgelig'],
            correct: 'sandsynligvis',
            feedback: '"Sandsynligvis" passer til de klare meteorologiske tegn (høj sandsynlighed).'
        },
        {
            dialog: 'A: "Hvorfor tager Anna ikke sin telefon?"<br>B: "Hun sidder ______ i et vigtigt møde med chefen."',
            options: ['formentlig', 'umuligt', 'heldigvis'],
            correct: 'formentlig',
            feedback: '"Formentlig" udtrykker den mest logiske antagelse ud fra situationen.'
        },
        {
            dialog: 'A: "Skal du med i biografen i aften?"<br>B: "Jeg har mange lektier for, men ______ kan jeg nå det senere."',
            options: ['måske', 'afgjort', 'umuligt'],
            correct: 'måske',
            feedback: '"Måske" holder muligheden åben (50/50 balance).'
        },
        {
            dialog: 'A: "Er der plads til en ekstra person i bilen?"<br>B: "Hvis vi rykker lidt sammen, kan vi ______ finde plads."',
            options: ['muligvis', 'umuligt', 'desværre'],
            correct: 'muligvis',
            feedback: '"Muligvis" åbner for en teoretisk løsning og mulighed.'
        },
        {
            dialog: 'A: "Tror du bussen kommer til tiden i denne snestorm?"<br>B: "Nej, den når ______ frem i dette vejr."',
            options: ['næppe', 'sikkert', 'heldigvis'],
            correct: 'næppe',
            feedback: '"Næppe" udtrykker stærk skepsis og næsten sikker benægtelse.'
        },
        {
            dialog: 'A: "Tror du renterne falder til nul procent i år?"<br>B: "Nej, ifølge økonomerne er det yderst ______."',
            options: ['usandsynligt', 'sikkert', 'selvfølgelig'],
            correct: 'usandsynligt',
            feedback: '"Usandsynligt" angiver meget ringe sandsynlighed (~5%).'
        },
        {
            dialog: 'A: "Kan vi løbe en maraton uden nogen form for træning?"<br>B: "Nej, det kan ______ lade sig gøre!"',
            options: ['umuligt', 'sandsynligvis', 'heldigvis'],
            correct: 'umuligt',
            feedback: '"Umuligt" slår fast at der er 0% chance for at det kan lade sig gøre.'
        },
        {
            dialog: 'A: "Blev du våd på cykelturen hjem?"<br>B: "Nej, ______ nåede jeg hjem lige inden uvejret brød løs!"',
            options: ['heldigvis', 'desværre', 'næppe'],
            correct: 'heldigvis',
            feedback: '"Heldigvis" udtrykker stor lettelse og et heldigt sammentræf.'
        },
        {
            dialog: 'A: "Kan du deltage i fredagsbaren efter arbejde?"<br>B: "Nej, jeg har ______ en anden aftale med familien."',
            options: ['desværre', 'heldigvis', 'selvfølgelig'],
            correct: 'desværre',
            feedback: '"Desværre" er den høflige måde at melde afbud og beklage på.'
        },
        {
            dialog: 'A: "Hvad håber du for sommerferien i Danmark?"<br>B: "______ får vi masser af solskin og varme dage!"',
            options: ['Forhåbentlig', 'Desværre', 'Umuligt'],
            correct: 'Forhåbentlig',
            feedback: '"Forhåbentlig" udtrykker et inderligt ønske for den kommende tid.'
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
                <div style="font-size: 1.45rem; color: white; line-height: 1.8; margin-bottom: 2rem; background: rgba(15, 23, 42, 0.7); padding: 1.4rem; border-radius: 14px; border-left: 5px solid #22c55e;">
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

    // ==========================================
    // TAB 6: TVIVLENS GRADER (Næppe, usandsynligt, umuligt, måske) (8 øvelser)
    // ==========================================
    const TVIVL_QUESTIONS = [
        {
            dialog: 'A: "Tror du chefen godkender en fordobling af vores budget?"<br>B: "Det er der ______ nogen chance for."',
            options: ['næppe', 'umuligt', 'sikkert'],
            correct: 'næppe',
            feedback: 'Korrekt! "Der er næppe nogen chance" er den klassiske, elegante måde at sige "næsten ingen chance".',
            badge: '📉 Stærk tvivl'
        },
        {
            dialog: 'A: "Kan vi køre 500 kilometer på en tom tank benzin?"<br>B: "Nej, det er fysisk ______!"',
            options: ['umuligt', 'næppe', 'måske'],
            correct: 'umuligt',
            feedback: 'Korrekt! 0% chance – en fysisk umulighed hedder altid "umuligt".',
            badge: '🚫 0% sandsynlighed'
        },
        {
            dialog: 'A: "Vinder vi den store gevinst i lotto i aften?"<br>B: "Chancen er mikroskopisk, så det er stærkt ______."',
            options: ['usandsynligt', 'sikkert', 'formentlig'],
            correct: 'usandsynligt',
            feedback: 'Korrekt! Matematisk mikroskopiske chancer kaldes "usandsynlige".',
            badge: '🎲 Ekstremt lille chance'
        },
        {
            dialog: 'A: "Skal vi tage en paraply med på gåturen?"<br>B: "Himlen er lidt grå, så ______ begynder det at dryppe."',
            options: ['måske', 'umuligt', 'afgjort'],
            correct: 'måske',
            feedback: 'Korrekt! En ægte 50/50 mulighed for regn kaldes "måske".',
            badge: '⚖️ 50/50 Mulighed'
        },
        {
            dialog: 'A: "Når Peter frem til mødet inden det slutter?"<br>B: "Han sidder fast i køen 50 km væk, så han når det ______."',
            options: ['næppe', 'forhåbentlig', 'sikkert'],
            correct: 'næppe',
            feedback: 'Korrekt! "Han når det næppe" signalerer, at chancen er forsvindende lille.',
            badge: '📉 Realistisk skepsis'
        },
        {
            dialog: 'A: "Kan man lære flydende dansk på én uge?"<br>B: "Nej, det er fuldstændig ______!"',
            options: ['umuligt', 'måske', 'næppe'],
            correct: 'umuligt',
            feedback: 'Korrekt! Helt udelukket – kræver måneder og år, så det er "umuligt".',
            badge: '🚫 Fuldstændig udelukket'
        },
        {
            dialog: 'A: "Kommer statsministeren forbi vores lille lokale vejfest?"<br>B: "Det ville være hyggeligt, men det er nok meget ______."',
            options: ['usandsynligt', 'sikkert', 'selvfølgelig'],
            correct: 'usandsynligt',
            feedback: 'Korrekt! En usandsynlig hændelse, selvom det i teorien kunne ske.',
            badge: '🎲 Usandsynlighed'
        },
        {
            dialog: 'A: "Skal vi bestille bord på restauranten nu?"<br>B: "Ja, for der er ______ ledige borde, hvis vi venter til i aften."',
            options: ['næppe', 'umuligt', 'faktisk'],
            correct: 'næppe',
            feedback: 'Korrekt! "Der er næppe ledige borde" udtrykker, at man stærkt forventer fuldt hus.',
            badge: '📉 Forventet mangel'
        }
    ];

    let tvivlIdx = 0;
    let tvivlScore = 0;
    let tvivlAnswers = new Array(TVIVL_QUESTIONS.length).fill(null);

    function renderTabTvivl(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'special-tab-container';

        container.innerHTML = `
            <div class="special-intro-box">
                <h2>Tvivlens Grader: Næppe, usandsynligt & umuligt 📉</h2>
                <p>
                    Lær at graduere din skepsis og udelukkelse på dansk uden at lyde afvisende eller uhøflig.
                </p>
            </div>

            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color: rgba(239, 68, 68, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #f87171;">
                            <span>🚫</span> umuligt
                        </div>
                        <span class="special-rule-role" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid #ef4444;">0% chance</span>
                    </div>
                    <div class="special-rule-desc">
                        Fuldstændig udelukket. Kan under ingen omstændigheder lade sig gøre fysisk eller logisk.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #ef4444;">
                        <span>"Det er <strong>umuligt</strong> at nå."</span>
                        <button class="rule-speak-btn" data-speak="Det er umuligt at nå.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(249, 115, 22, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #fb923c;">
                            <span>📉</span> næppe
                        </div>
                        <span class="special-rule-role" style="background: rgba(249, 115, 22, 0.2); color: #fdba74; border: 1px solid #f97316;">~10-15%</span>
                    </div>
                    <div class="special-rule-desc">
                        Betyder <strong>"næsten sikkert IKKE"</strong>. Den foretrukne danske måde at udtrykke stærk skepsis på.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #f97316;">
                        <span>"Vi når det <strong>næppe</strong> i dag."</span>
                        <button class="rule-speak-btn" data-speak="Vi når det næppe i dag.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(234, 179, 8, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #facc15;">
                            <span>⚖️</span> måske
                        </div>
                        <span class="special-rule-role" style="background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid #eab308;">50% chance</span>
                    </div>
                    <div class="special-rule-desc">
                        Lige midt imellem. Muligheden er fuldt til stede, men udfaldet er helt åbent.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #eab308;">
                        <span>"Det hjælper <strong>måske</strong>."</span>
                        <button class="rule-speak-btn" data-speak="Det hjælper måske.">🔊</button>
                    </div>
                </div>
            </div>

            <div id="tvivl-exercise-area"></div>
        `;

        container.querySelectorAll('.rule-speak-btn').forEach(b => {
            b.onclick = () => speakDanish(b.getAttribute('data-speak'));
        });

        const exArea = container.querySelector('#tvivl-exercise-area');
        renderTvivlQuestion(exArea, parent);

        parent.appendChild(container);
    }

    function renderTvivlQuestion(exArea, parentContainer) {
        exArea.innerHTML = '';

        if (tvivlIdx >= TVIVL_QUESTIONS.length) {
            const resultCard = document.createElement('div');
            resultCard.className = 'score-celebration-card';
            resultCard.innerHTML = `
                <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🎉</div>
                <h3 style="font-size: 2rem; color: #86efac; margin-bottom: 0.6rem;">Flot klaret!</h3>
                <p style="font-size: 1.25rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    Du fik <strong>${tvivlScore}</strong> ud af <strong>${TVIVL_QUESTIONS.length}</strong> rigtige i tvivlens nuancer.
                </p>
                <button class="action-btn-primary" id="tvivl-restart-btn">
                    <span>🔄</span> Start forfra
                </button>
            `;
            resultCard.querySelector('#tvivl-restart-btn').onclick = () => {
                tvivlIdx = 0;
                tvivlScore = 0;
                tvivlAnswers = new Array(TVIVL_QUESTIONS.length).fill(null);
                renderTabTvivl(parentContainer);
            };
            exArea.appendChild(resultCard);
            return;
        }

        const q = TVIVL_QUESTIONS[tvivlIdx];
        const isAnswered = tvivlAnswers[tvivlIdx] !== null;

        const card = document.createElement('div');
        card.className = 'exercise-action-card';

        card.innerHTML = `
            <div class="progress-header">
                <span>Spørgsmål ${tvivlIdx + 1} af ${TVIVL_QUESTIONS.length}</span>
                <span>Score: ${tvivlScore} / ${TVIVL_QUESTIONS.length}</span>
            </div>

            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${((tvivlIdx + 1) / TVIVL_QUESTIONS.length) * 100}%;"></div>
            </div>

            <div class="detektiv-context-tag">${q.badge}</div>

            <div class="exercise-dialog-quote">
                ${q.dialog}
            </div>

            <div class="detektiv-options-grid" id="tvivl-opts-grid"></div>

            <div class="detektiv-feedback-box ${isAnswered ? 'show ' + (tvivlAnswers[tvivlIdx] === q.correct ? 'correct' : 'wrong') : ''}" id="tvivl-fb">
                ${isAnswered ? (tvivlAnswers[tvivlIdx] === q.correct ? `<strong>Rigtigt!</strong> ${q.feedback}` : `<strong>Husk reglen:</strong> ${q.feedback}`) : ''}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                <button class="filter-btn" id="tvivl-prev-btn" ${tvivlIdx === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                    ← Forrige
                </button>
                <button class="action-btn-primary" id="tvivl-next-btn">
                    ${tvivlIdx < TVIVL_QUESTIONS.length - 1 ? 'Næste spørgsmål ➔' : 'Se samlet resultat 🏆'}
                </button>
            </div>
        `;

        const optsGrid = card.querySelector('#tvivl-opts-grid');
        const fb = card.querySelector('#tvivl-fb');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `detektiv-opt-btn ${isAnswered ? (opt === q.correct ? 'correct' : (opt === tvivlAnswers[tvivlIdx] ? 'wrong' : '')) : ''}`;
            btn.textContent = opt;

            btn.onclick = () => {
                if (tvivlAnswers[tvivlIdx] !== null) return;
                tvivlAnswers[tvivlIdx] = opt;

                if (opt === q.correct) {
                    tvivlScore++;
                    btn.classList.add('correct');
                    fb.className = 'detektiv-feedback-box show correct';
                    fb.innerHTML = `<strong>Rigtigt!</strong> ${q.feedback}`;
                    speakDanish(q.dialog.replace(/<[^>]*>?/gm, ' ').replace('______', opt));
                } else {
                    btn.classList.add('wrong');
                    fb.className = 'detektiv-feedback-box show wrong';
                    fb.innerHTML = `<strong>Ikke helt:</strong> ${q.feedback}`;
                    optsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => {
                        if (b.textContent === q.correct) b.classList.add('correct');
                    });
                }
            };

            optsGrid.appendChild(btn);
        });

        card.querySelector('#tvivl-prev-btn').onclick = () => {
            if (tvivlIdx > 0) {
                tvivlIdx--;
                renderTvivlQuestion(exArea, parentContainer);
            }
        };

        card.querySelector('#tvivl-next-btn').onclick = () => {
            tvivlIdx++;
            renderTvivlQuestion(exArea, parentContainer);
        };

        exArea.appendChild(card);
    }

    // ==========================================
    // TAB 7: HELDIGVIS, DESVÆRRE & FORHÅBENTLIG (Social tone) (8 øvelser)
    // ==========================================
    const TONE_QUESTIONS = [
        {
            dialog: 'A: "Gik din eksamen godt i dag?"<br>B: "Ja, ______ fik jeg en rigtig god karakter!"',
            options: ['heldigvis', 'desværre', 'forhåbentlig'],
            correct: 'heldigvis',
            feedback: 'Korrekt! "Heldigvis" udtrykker lettelse over en hændelse, der allerede er gået godt.',
            badge: '🟢 Lettelse (fortid/nutid)'
        },
        {
            dialog: 'A: "Kommer du til min fødselsdag på lørdag?"<br>B: "Jeg er bortrejst i weekenden, så jeg kan ______ ikke være med."',
            options: ['desværre', 'heldigvis', 'faktisk'],
            correct: 'desværre',
            feedback: 'Korrekt! Den høflige måde at melde afbud og beklage på.',
            badge: '🔴 Beklagelse & afbud'
        },
        {
            dialog: 'A: "Skal vi tage regntøj med på lejrskolen i næste uge?"<br>B: "Ja, for en sikkerheds skyld, men ______ holder det tørvejr!"',
            options: ['forhåbentlig', 'heldigvis', 'desværre'],
            correct: 'forhåbentlig',
            feedback: 'Korrekt! "Forhåbentlig" bruges altid om fremtiden, når man håber på noget positivt.',
            badge: '🟡 Fremtidsønske'
        },
        {
            dialog: 'A: "Glemte du din computer i toget?"<br>B: "Ja, men ______ blev den indleveret til hittegodskontoret!"',
            options: ['heldigvis', 'desværre', 'ærlig talt'],
            correct: 'heldigvis',
            feedback: 'Korrekt! Det gode udfald på en farlig situation bringer stor lettelse.',
            badge: '🟢 Godt sammentræf'
        },
        {
            dialog: 'A: "Er lægens venteværelse tomt?"<br>B: "Nej, der sidder ______ fem patienter foran mig."',
            options: ['desværre', 'heldigvis', 'forhåbentlig'],
            correct: 'desværre',
            feedback: 'Korrekt! En ubehagelig ventetid omtales med "desværre".',
            badge: '🔴 Uheldig ventetid'
        },
        {
            dialog: 'A: "Hvad synes du om chefen nye spareplan?"<br>B: "______, så tror jeg det skaber flere problemer end det løser."',
            options: ['Ærlig talt', 'Heldigvis', 'Desværre'],
            correct: 'Ærlig talt',
            feedback: 'Korrekt! "Ærlig talt" signalerer ufiltreret, personlig og oprigtig vurdering.',
            badge: '💬 Oprigtig holdning'
        },
        {
            dialog: 'A: "Tror du bussen når frem inden færgen sejler?"<br>B: "Trafikken flyder pænt nu, så det gør den ______."',
            options: ['forhåbentlig', 'desværre', 'umuligt'],
            correct: 'forhåbentlig',
            feedback: 'Korrekt! Håbefuld forventning for en fremtidig deadline.',
            badge: '🟡 Håbefuld forventning'
        },
        {
            dialog: 'A: "Slog du dig, da du faldt på cyklen?"<br>B: "Nej, ______ havde jeg cykelhjelm på, så der skete ikke noget."',
            options: ['heldigvis', 'desværre', 'forhåbentlig'],
            correct: 'heldigvis',
            feedback: 'Korrekt! "Heldigvis" redder situationen og viser taknemmelighed for hjelmen.',
            badge: '🟢 Beskyttelse & lettelse'
        }
    ];

    let toneIdx = 0;
    let toneScore = 0;
    let toneAnswers = new Array(TONE_QUESTIONS.length).fill(null);

    function renderTabTone(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'special-tab-container';

        container.innerHTML = `
            <div class="special-intro-box">
                <h2>Heldigvis, desværre & forhåbentlig 🎭</h2>
                <p>
                    Lær at mestre den sociale tone på dansk. Hvornår udtrykker du lettelse, høfligt afbud eller et inderligt fremtidsønske?
                </p>
            </div>

            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color: rgba(34, 197, 94, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #86efac;">
                            <span>🟢</span> heldigvis
                        </div>
                        <span class="special-rule-role" style="background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid #22c55e;">Lettelse</span>
                    </div>
                    <div class="special-rule-desc">
                        Bruges om <strong>noget der allerede er sket</strong> (eller sker nu), og som er til stor glæde eller lettelse.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #22c55e;">
                        <span>"<strong>Heldigvis</strong> nåede vi toget."</span>
                        <button class="rule-speak-btn" data-speak="Heldigvis nåede vi toget.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(239, 68, 68, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #f87171;">
                            <span>🔴</span> desværre
                        </div>
                        <span class="special-rule-role" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid #ef4444;">Beklagelse</span>
                    </div>
                    <div class="special-rule-desc">
                        Høflig måde at <strong>melde afbud</strong>, overbringe dårlige nyheder eller udtrykke ærgrelse på.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #ef4444;">
                        <span>"Jeg kan <strong>desværre</strong> ikke komme."</span>
                        <button class="rule-speak-btn" data-speak="Jeg kan desværre ikke komme.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(234, 179, 8, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #facc15;">
                            <span>🟡</span> forhåbentlig
                        </div>
                        <span class="special-rule-role" style="background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid #eab308;">Fremtidsønske</span>
                    </div>
                    <div class="special-rule-desc">
                        Bruges altid om <strong>fremtiden</strong>, når du håber og krydser fingre for, at det går godt.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #eab308;">
                        <span>"<strong>Forhåbentlig</strong> skinner solen."</span>
                        <button class="rule-speak-btn" data-speak="Forhåbentlig skinner solen.">🔊</button>
                    </div>
                </div>
            </div>

            <div id="tone-exercise-area"></div>
        `;

        container.querySelectorAll('.rule-speak-btn').forEach(b => {
            b.onclick = () => speakDanish(b.getAttribute('data-speak'));
        });

        const exArea = container.querySelector('#tone-exercise-area');
        renderToneQuestion(exArea, parent);

        parent.appendChild(container);
    }

    function renderToneQuestion(exArea, parentContainer) {
        exArea.innerHTML = '';

        if (toneIdx >= TONE_QUESTIONS.length) {
            const resultCard = document.createElement('div');
            resultCard.className = 'score-celebration-card';
            resultCard.innerHTML = `
                <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🌟</div>
                <h3 style="font-size: 2rem; color: #86efac; margin-bottom: 0.6rem;">Fremragende mestring!</h3>
                <p style="font-size: 1.25rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    Du fik <strong>${toneScore}</strong> ud af <strong>${TONE_QUESTIONS.length}</strong> rigtige i den sociale holdningstone.
                </p>
                <button class="action-btn-primary" id="tone-restart-btn">
                    <span>🔄</span> Start forfra
                </button>
            `;
            resultCard.querySelector('#tone-restart-btn').onclick = () => {
                toneIdx = 0;
                toneScore = 0;
                toneAnswers = new Array(TONE_QUESTIONS.length).fill(null);
                renderTabTone(parentContainer);
            };
            exArea.appendChild(resultCard);
            return;
        }

        const q = TONE_QUESTIONS[toneIdx];
        const isAnswered = toneAnswers[toneIdx] !== null;

        const card = document.createElement('div');
        card.className = 'exercise-action-card';

        card.innerHTML = `
            <div class="progress-header">
                <span>Spørgsmål ${toneIdx + 1} af ${TONE_QUESTIONS.length}</span>
                <span>Score: ${toneScore} / ${TONE_QUESTIONS.length}</span>
            </div>

            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${((toneIdx + 1) / TONE_QUESTIONS.length) * 100}%;"></div>
            </div>

            <div class="detektiv-context-tag">${q.badge}</div>

            <div class="exercise-dialog-quote">
                ${q.dialog}
            </div>

            <div class="detektiv-options-grid" id="tone-opts-grid"></div>

            <div class="detektiv-feedback-box ${isAnswered ? 'show ' + (toneAnswers[toneIdx] === q.correct ? 'correct' : 'wrong') : ''}" id="tone-fb">
                ${isAnswered ? (toneAnswers[toneIdx] === q.correct ? `<strong>Rigtigt!</strong> ${q.feedback}` : `<strong>Husk reglen:</strong> ${q.feedback}`) : ''}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                <button class="filter-btn" id="tone-prev-btn" ${toneIdx === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                    ← Forrige
                </button>
                <button class="action-btn-primary" id="tone-next-btn">
                    ${toneIdx < TONE_QUESTIONS.length - 1 ? 'Næste spørgsmål ➔' : 'Se samlet resultat 🏆'}
                </button>
            </div>
        `;

        const optsGrid = card.querySelector('#tone-opts-grid');
        const fb = card.querySelector('#tone-fb');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `detektiv-opt-btn ${isAnswered ? (opt === q.correct ? 'correct' : (opt === toneAnswers[toneIdx] ? 'wrong' : '')) : ''}`;
            btn.textContent = opt;

            btn.onclick = () => {
                if (toneAnswers[toneIdx] !== null) return;
                toneAnswers[toneIdx] = opt;

                if (opt === q.correct) {
                    toneScore++;
                    btn.classList.add('correct');
                    fb.className = 'detektiv-feedback-box show correct';
                    fb.innerHTML = `<strong>Rigtigt!</strong> ${q.feedback}`;
                    speakDanish(q.dialog.replace(/<[^>]*>?/gm, ' ').replace('______', opt));
                } else {
                    btn.classList.add('wrong');
                    fb.className = 'detektiv-feedback-box show wrong';
                    fb.innerHTML = `<strong>Ikke helt:</strong> ${q.feedback}`;
                    optsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => {
                        if (b.textContent === q.correct) b.classList.add('correct');
                    });
                }
            };

            optsGrid.appendChild(btn);
        });

        card.querySelector('#tone-prev-btn').onclick = () => {
            if (toneIdx > 0) {
                toneIdx--;
                renderToneQuestion(exArea, parentContainer);
            }
        };

        card.querySelector('#tone-next-btn').onclick = () => {
            toneIdx++;
            renderToneQuestion(exArea, parentContainer);
        };

        exArea.appendChild(card);
    }

    // ==========================================
    // TAB 8: BEVIS-DETEKTIVEN (70-90%) (10 øvelser)
    // ==========================================
    const BEVIS_QUESTIONS = [
        {
            dialog: 'A: "Skal vi pakke regnslag til udendørskoncerten?"<br>B: "Ja, ifølge radarmålingerne begynder det ______ at regne i eftermiddag."',
            options: ['sandsynligvis', 'tilsyneladende', 'åbenbart'],
            correct: 'sandsynligvis',
            feedback: 'Korrekt! Du bygger på målinger, radardata og statistik – den klassiske kilde for "sandsynligvis".',
            badge: '📊 Data & Målinger'
        },
        {
            dialog: 'A: "Hvor blev Peter af? Vi skal holde statusmøde nu."<br>B: "Computeren er tændt og kaffen er stadig varm, så han er ______ lige gået på toilettet."',
            options: ['formentlig', 'tilsyneladende', 'sandsynligvis'],
            correct: 'formentlig',
            feedback: 'Korrekt! Du finder fysiske spor (varm kaffe, tændt skærm) og drager en logisk slutning – kernen i "formentlig".',
            badge: '🧠 Logiske indicier'
        },
        {
            dialog: 'A: "Skal vi hente frisk brød hos bageren?"<br>B: "Nej, døren er låst og lyset er slukket, så butikken har ______ lukket tidligt i dag."',
            options: ['åbenbart', 'tilsyneladende', 'formentlig'],
            correct: 'åbenbart',
            feedback: 'Korrekt! Låsen på døren og det slukkede lys er et uomtvisteligt, synligt bevis foran jer.',
            badge: '💡 Synligt bevis'
        },
        {
            dialog: 'A: "Ved du hvordan det gik Sofie til hendes mundtlige eksamen?"<br>B: "Hun smiler over hele hovedet, så det gik ______ rigtig godt."',
            options: ['tilsyneladende', 'åbenbart', 'sandsynligvis'],
            correct: 'tilsyneladende',
            feedback: 'Korrekt! Det ser sådan ud på overfladen (smilet), men du kender ikke karakteren endnu og tager et lille forbehold.',
            badge: '👀 Ydre overflade'
        },
        {
            dialog: 'A: "Når vi frem til middagen klokken 18?"<br>B: "Trafikradioen melder om 15 km kø på motorvejen, så vi bliver ______ forsinket."',
            options: ['sandsynligvis', 'tilsyneladende', 'åbenbart'],
            correct: 'sandsynligvis',
            feedback: 'Korrekt! Meldingen bygger på konkrete trafiktal og rejsetidsberegninger (høj sandsynlighed).',
            badge: '📊 Trafiktal & data'
        },
        {
            dialog: 'A: "Er Mikkel hjemme på sit værelse?"<br>B: "Nej, hans jakke er væk og cyklen mangler i skuret, så han er ______ cyklet til træning."',
            options: ['formentlig', 'tilsyneladende', 'sandsynligvis'],
            correct: 'formentlig',
            feedback: 'Korrekt! Du observerer de manglende genstande og forbinder de logiske spor.',
            badge: '🧠 Logisk deduktion'
        },
        {
            dialog: 'A: "Hvorfor kommer toget ikke til perron 2?"<br>B: "Se på den røde tekst på skærmen! Toget er ______ blevet aflyst af DSB."',
            options: ['åbenbart', 'tilsyneladende', 'sandsynligvis'],
            correct: 'åbenbart',
            feedback: 'Korrekt! Den røde tekst bekræfter kendsgerningen for alle – et klart afsløret bevis.',
            badge: '💡 Konkret bevis'
        },
        {
            dialog: 'A: "Hvad synes du om den brugte bil hos forhandleren?"<br>B: "Lakken skinner pænt og den ser ______ ud til at være i flot stand."',
            options: ['tilsyneladende', 'åbenbart', 'formentlig'],
            correct: 'tilsyneladende',
            feedback: 'Korrekt! Overfladen er flot, men mekanikken er ikke testet – "tilsyneladende" tager netop dette forbehold.',
            badge: '👀 Overflade (kan bedrage)'
        },
        {
            dialog: 'A: "Tør vi tænde for fabrikkens store maskine igen?"<br>B: "Mekanikeren har udskiftet alle defekte dele, så den bør ______ køre uden problemer nu."',
            options: ['rimeligvis', 'tilsyneladende', 'åbenbart'],
            correct: 'rimeligvis',
            feedback: 'Korrekt! "Rimeligvis" udtrykker en berettiget, fornuftig forventning baseret på grundigt forarbejde.',
            badge: '⚖️ Sund fornuft'
        },
        {
            dialog: 'A: "Fandt du noget ekstra printerpapir ude på lageret?"<br>B: "Kassen står helt tom på hylden, så vi er ______ løbet helt tør."',
            options: ['åbenbart', 'tilsyneladende', 'sandsynligvis'],
            correct: 'åbenbart',
            feedback: 'Korrekt! Den tomme kasse beviser det direkte med dine egne øjne.',
            badge: '💡 Synlig kendsgerning'
        }
    ];

    let bevisIdx = 0;
    let bevisScore = 0;
    let bevisAnswers = new Array(BEVIS_QUESTIONS.length).fill(null);

    function renderTabBeviser(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'special-tab-container';

        container.innerHTML = `
            <div class="special-intro-box">
                <h2>Bevis-Detektiven: Hvor har du det fra? 🔬</h2>
                <p>
                    I 70–90% spændet handler det ikke om 5% fra eller til. Det handler om dit <strong>bevisgrundlag</strong>! Hvilket ord matcher situationens videnskilde?
                </p>
            </div>

            <div class="special-rule-cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));">
                <div class="special-rule-card" style="border-color: rgba(56, 189, 248, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #38bdf8;">
                            <span>📊</span> sandsynligvis
                        </div>
                        <span class="special-rule-role" style="background: rgba(14, 165, 233, 0.2); color: #7dd3fc; border: 1px solid #0284c7;">Data</span>
                    </div>
                    <div class="special-rule-desc">
                        Bygger på <strong>prognoser, målinger, statistik og trafiktal</strong>.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #0284c7;">
                        <span>"Ifølge radaren regner det <strong>sandsynligvis</strong>."</span>
                        <button class="rule-speak-btn" data-speak="Ifølge radaren regner det sandsynligvis.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(168, 85, 247, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #c084fc;">
                            <span>🧠</span> formentlig
                        </div>
                        <span class="special-rule-role" style="background: rgba(168, 85, 247, 0.2); color: #d8b4fe; border: 1px solid #a855f7;">Logik</span>
                    </div>
                    <div class="special-rule-desc">
                        Bygger på <strong>fysiske spor og logisk deduktion</strong> (varm kaffe, jakke på knagen).
                    </div>
                    <div class="special-rule-example" style="border-left-color: #a855f7;">
                        <span>"Kaffen er varm, så han er <strong>formentlig</strong> her."</span>
                        <button class="rule-speak-btn" data-speak="Kaffen er varm, så han er formentlig her.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(34, 197, 94, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #86efac;">
                            <span>💡</span> åbenbart
                        </div>
                        <span class="special-rule-role" style="background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid #22c55e;">Bevis</span>
                    </div>
                    <div class="special-rule-desc">
                        Bygger på <strong>konkrete, synlige beviser og afslørede fakta</strong> (låst dør, rød tekst).
                    </div>
                    <div class="special-rule-example" style="border-left-color: #22c55e;">
                        <span>"Døren er låst, så de har <strong>åbenbart</strong> lukket."</span>
                        <button class="rule-speak-btn" data-speak="Døren er låst, så de har åbenbart lukket.">🔊</button>
                    </div>
                </div>

                <div class="special-rule-card" style="border-color: rgba(234, 179, 8, 0.4);">
                    <div class="special-rule-header">
                        <div class="special-rule-word" style="color: #facc15;">
                            <span>👀</span> tilsyneladende
                        </div>
                        <span class="special-rule-role" style="background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid #eab308;">Overflade</span>
                    </div>
                    <div class="special-rule-desc">
                        Bygger på <strong>det umiddelbare ydre indtryk</strong>, som dog godt kan bedrage.
                    </div>
                    <div class="special-rule-example" style="border-left-color: #eab308;">
                        <span>"Han smiler, så det gik <strong>tilsyneladende</strong> godt."</span>
                        <button class="rule-speak-btn" data-speak="Han smiler, så det gik tilsyneladende godt.">🔊</button>
                    </div>
                </div>
            </div>

            <div id="bevis-exercise-area"></div>
        `;

        container.querySelectorAll('.rule-speak-btn').forEach(b => {
            b.onclick = () => speakDanish(b.getAttribute('data-speak'));
        });

        const exArea = container.querySelector('#bevis-exercise-area');
        renderBevisQuestion(exArea, parent);

        parent.appendChild(container);
    }

    function renderBevisQuestion(exArea, parentContainer) {
        exArea.innerHTML = '';

        if (bevisIdx >= BEVIS_QUESTIONS.length) {
            const resultCard = document.createElement('div');
            resultCard.className = 'score-celebration-card';
            resultCard.innerHTML = `
                <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🔬</div>
                <h3 style="font-size: 2rem; color: #86efac; margin-bottom: 0.6rem;">Formidabelt efterforsket!</h3>
                <p style="font-size: 1.25rem; color: #f8fafc; margin-bottom: 1.5rem;">
                    Du fik <strong>${bevisScore}</strong> ud af <strong>${BEVIS_QUESTIONS.length}</strong> rigtige i bevis-testen.
                </p>
                <div style="background: rgba(15, 23, 42, 0.7); padding: 1.2rem; border-radius: 12px; max-width: 500px; margin: 0 auto 2rem; text-align: left; font-size: 0.95rem; line-height: 1.5; color: #cbd5e1;">
                    ✔️ <strong>De 4 videnskilder:</strong><br>
                    • <strong>sandsynligvis</strong> = Radardata, målinger & prognoser<br>
                    • <strong>formentlig</strong> = Logiske indicier (varm kaffekop)<br>
                    • <strong>åbenbart</strong> = Konkret bevis (låst dør, rød aflysning)<br>
                    • <strong>tilsyneladende</strong> = Ydre overflade (et smil, nypoleret lak)
                </div>
                <button class="action-btn-primary" id="bevis-restart-btn">
                    <span>🔄</span> Start forfra
                </button>
            `;
            resultCard.querySelector('#bevis-restart-btn').onclick = () => {
                bevisIdx = 0;
                bevisScore = 0;
                bevisAnswers = new Array(BEVIS_QUESTIONS.length).fill(null);
                renderTabBeviser(parentContainer);
            };
            exArea.appendChild(resultCard);
            return;
        }

        const q = BEVIS_QUESTIONS[bevisIdx];
        const isAnswered = bevisAnswers[bevisIdx] !== null;

        const card = document.createElement('div');
        card.className = 'exercise-action-card';

        card.innerHTML = `
            <div class="progress-header">
                <span>Spørgsmål ${bevisIdx + 1} af ${BEVIS_QUESTIONS.length}</span>
                <span>Score: ${bevisScore} / ${BEVIS_QUESTIONS.length}</span>
            </div>

            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${((bevisIdx + 1) / BEVIS_QUESTIONS.length) * 100}%;"></div>
            </div>

            <div class="detektiv-context-tag">${q.badge}</div>

            <div class="exercise-dialog-quote">
                ${q.dialog}
            </div>

            <div class="detektiv-options-grid" id="bevis-opts-grid"></div>

            <div class="detektiv-feedback-box ${isAnswered ? 'show ' + (bevisAnswers[bevisIdx] === q.correct ? 'correct' : 'wrong') : ''}" id="bevis-fb">
                ${isAnswered ? (bevisAnswers[bevisIdx] === q.correct ? `<strong>Rigtigt!</strong> ${q.feedback}` : `<strong>Husk reglen:</strong> ${q.feedback}`) : ''}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                <button class="filter-btn" id="bevis-prev-btn" ${bevisIdx === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                    ← Forrige
                </button>
                <button class="action-btn-primary" id="bevis-next-btn">
                    ${bevisIdx < BEVIS_QUESTIONS.length - 1 ? 'Næste spørgsmål ➔' : 'Se samlet resultat 🏆'}
                </button>
            </div>
        `;

        const optsGrid = card.querySelector('#bevis-opts-grid');
        const fb = card.querySelector('#bevis-fb');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `detektiv-opt-btn ${isAnswered ? (opt === q.correct ? 'correct' : (opt === bevisAnswers[bevisIdx] ? 'wrong' : '')) : ''}`;
            btn.textContent = opt;

            btn.onclick = () => {
                if (bevisAnswers[bevisIdx] !== null) return;
                bevisAnswers[bevisIdx] = opt;

                if (opt === q.correct) {
                    bevisScore++;
                    btn.classList.add('correct');
                    fb.className = 'detektiv-feedback-box show correct';
                    fb.innerHTML = `<strong>Rigtigt!</strong> ${q.feedback}`;
                    speakDanish(q.dialog.replace(/<[^>]*>?/gm, ' ').replace('______', opt));
                } else {
                    btn.classList.add('wrong');
                    fb.className = 'detektiv-feedback-box show wrong';
                    fb.innerHTML = `<strong>Ikke helt:</strong> ${q.feedback}`;
                    optsGrid.querySelectorAll('.detektiv-opt-btn').forEach(b => {
                        if (b.textContent === q.correct) b.classList.add('correct');
                    });
                }
            };

            optsGrid.appendChild(btn);
        });

        card.querySelector('#bevis-prev-btn').onclick = () => {
            if (bevisIdx > 0) {
                bevisIdx--;
                renderBevisQuestion(exArea, parentContainer);
            }
        };

        card.querySelector('#bevis-next-btn').onclick = () => {
            bevisIdx++;
            renderBevisQuestion(exArea, parentContainer);
        };

        exArea.appendChild(card);
    }

    // Initial render
    switchTab('vrimmel');
    container.appendChild(viewContainer);
}
