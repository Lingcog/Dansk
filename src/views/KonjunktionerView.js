import { getTranslation, getLang } from '../utils/i18n.js';
import { conjunctionData } from '../utils/conjunctionData.js';

/**
 * KonjunktionerView - Selvstændig flade om Helsætnings- og Ledsætningskonjunktioner
 *
 * 18 centrale danske konjunktioner opdelt i 3 familier:
 * Gruppe 1: Helsætningskonjunktioner (Sideordnende - Forbinderfelt F0, INGEN inversion, "ikke" EFTER verbet):
 *  1. og (tilføjelse / sideordning)
 *  2. men (modsætning / kontrast)
 *  3. eller (valg / alternativ)
 *  4. for (forklaring / årsag i helsætning)
 *  5. så (følge / resultat i helsætning)
 *
 * Gruppe 2: Ledsætningskonjunktioner: Årsag, Betingelse, Indrømmelse & At/Om ("ikke" FØR verbet!):
 *  6. fordi (årsag i ledsætning)
 *  7. selvom (indrømmelse / på trods af)
 *  8. hvis (betingelse)
 *  9. at (udsagns-ledsætning / fakta)
 * 10. om (spørgende ledsætning / tvivl)
 *
 * Gruppe 3: Ledsætningskonjunktioner: Tid & Samtidighed ("ikke" FØR verbet!):
 * 11. når (nutid, fremtid & gentagen vane: "hver gang")
 * 12. da (én bestemt gang i fortiden)
 * 13. mens (samtidighed: to handlinger sker samtidig)
 * 14. inden (før noget sker)
 * 15. efter at (efter noget er sket)
 * 16. siden (fra et tidspunkt i fortiden og frem til nu)
 * 17. indtil (slutpunkt i tid)
 * 18. så snart (straks i det øjeblik noget sker)
 *
 * 8 didaktiske tabs:
 * 1. Broernes Verden (Vrimlebilledet - 18 hotspots, filtre & målordspræsentation)
 * 2. Ordstillings-Laboratoriet ("IKKE"-Magneten, Ledsætning i Front = Inversion & Broen til Felt 7)
 * 3. Konjunktions-Detektiven (10 gåder om betydning og ordstilling)
 * 4. Sætningsbyggeren & Puslespillet (Helsætning vs. Ledsætning & Ledsætning i Forfelt)
 * 5. Kontekst-testen (14 autentiske hverdagsdialoger)
 * 6. Da eller Når? & Tidskonjunktioner ⏳ (8 øvelser)
 * 7. Fordi, For, Så eller Derfor? (Årsag & Ordstilling) ⚡ (8 øvelser)
 * 8. At eller Om? & Hvis eller Selvom? 🎯 (10 øvelser)
 */
export function renderKonjunktionerView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container konjunktioner-view';

    // Top Bar with back button & link to Felt 7
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => {
        if (extraData && extraData.from) {
            navigateFn(extraData.from);
        } else {
            navigateFn('top_konjunktioner');
        }
    };
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

    // 18 Conjunctions Data
    const KONJUNKTIONER_DATA = [
        // GRUPPE 1: Helsætningskonjunktioner (Sideordnende - F0)
        {
            id: 'og',
            word: 'og',
            category: 'helsaetning',
            clauseType: 'Helsætningskonjunktion (Sideordnende)',
            x: 11,
            y: 12,
            meaning: 'Sideordning / tilføjelse (+)',
            sceneDesc: 'Solen skinner over parken, og fuglene synger i træerne.',
            sentence: 'Solen skinner, og fuglene synger.',
            contextSentence: 'Solen skinner fra en skyfri himmel, og fuglene synger lystigt i de grønne træer.',
            ruleHint: 'Binder to ligeværdige helsætninger sammen. Står i forbinderfeltet (F0) og ændrer IKKE ordstillingen ("ikke" står efter verbet).',
            translations: {
                en: { word: "and", sentence: "The sun is shining, and the birds are singing." },
                de: { word: "und", sentence: "Die Sonne scheint, und die Vögel singen." },
                es: { word: "y / e", sentence: "El sol brilla y los pájaros cantan." },
                ar: { word: "وَ (حرف عطف)", sentence: "الشمس تشرق والطيور تغرد." },
                tr: { word: "ve", sentence: "Güneş parlıyor ve kuşlar ötüyor." },
                uk: { word: "і / та / й", sentence: "Сонце світить, і пташки співають." }
            }
        },
        {
            id: 'men',
            word: 'men',
            category: 'helsaetning',
            clauseType: 'Helsætningskonjunktion (Sideordnende)',
            x: 15,
            y: 27,
            meaning: 'Modsætning / kontrast i helsætning',
            sceneDesc: 'Det regner på den ene side af parken, men parret går glad tur med hundene.',
            sentence: 'Det regner lidt, men vi går ikke hjem.',
            contextSentence: 'Der falder lidt regn i parken, men parret går ikke hjem endnu.',
            ruleHint: 'Skaber kontrast mellem to helsætninger. Da det er en helsætningskonjunktion, står "ikke" EFTER verbet ("..., men vi går ikke hjem").',
            translations: {
                en: { word: "but", sentence: "It is raining a little, but we are not going home." },
                de: { word: "aber / sondern", sentence: "Es regnet ein wenig, aber wir gehen nicht nach Hause." },
                es: { word: "pero / sino", sentence: "Llueve un poco, pero no nos vamos a casa." },
                ar: { word: "لٰكِنْ / بَلْ", sentence: "إنها تمطر قليلًا، لكننا لا نذهب إلى المنزل." },
                tr: { word: "ama / fakat / ancak", sentence: "Biraz yağmur yağıyor ama eve gitmiyoruz." },
                uk: { word: "але / проте", sentence: "Трохи дощить, але ми не йдемо додому." }
            }
        },
        {
            id: 'eller',
            word: 'eller',
            category: 'helsaetning',
            clauseType: 'Helsætningskonjunktion (Sideordnende)',
            x: 84,
            y: 20,
            meaning: 'Valg / alternativ (A eller B)',
            sceneDesc: 'Baristaen i "Kaffe & Hygge" holder en kaffekop i den ene hånd og en tekande i den anden.',
            sentence: 'Vil du have kaffe, eller foretrækker du te?',
            contextSentence: 'Vil du gerne have en friskbrygget kop kaffe, eller vil du hellere drikke grøn te?',
            ruleHint: 'Giver et valg mellem to muligheder. Binder ord eller helsætninger sammen uden at ændre ordstillingen.',
            translations: {
                en: { word: "or", sentence: "Do you want coffee, or do you prefer tea?" },
                de: { word: "oder", sentence: "Möchtest du Kaffee, oder bevorzugst du Tee?" },
                es: { word: "o / u", sentence: "¿Quieres café o prefieres té?" },
                ar: { word: "أَوْ / أَمْ", sentence: "هل تريد قهوة، أم تفضل الشاي؟" },
                tr: { word: "veya / ya da / yoksa", sentence: "Kahve mi istersin, yoksa çayı mı tercih edersin?" },
                uk: { word: "або / чи", sentence: "Ти хочеш кави чи віддаєш перевагу чаю?" }
            }
        },
        {
            id: 'for',
            word: 'for',
            category: 'helsaetning',
            clauseType: 'Helsætningskonjunktion (Sideordnende)',
            x: 7,
            y: 77,
            meaning: 'Årsag / forklaring i HELSÆTNING ("ikke" EFTER verbet!)',
            sceneDesc: 'Manden ligger under dynen med termometer i munden, for han er ikke rask i dag.',
            sentence: 'Han bliver i sengen, for han er ikke rask.',
            contextSentence: 'Han kan ikke tage på arbejde i dag, for han er ikke rask og har høj feber.',
            ruleHint: 'PAS PÅ! "For" betyder næsten det samme som "fordi", MEN "for" indleder en HELSÆTNING! Derfor står "ikke" EFTER verbet: "..., for han ER IKKE rask."',
            translations: {
                en: { word: "for / because (coordinating)", sentence: "He stays in bed, for he is not well." },
                de: { word: "denn (Hauptsatz!)", sentence: "Er bleibt im Bett, denn er ist nicht gesund." },
                es: { word: "pues / puesto que", sentence: "Se queda en la cama, pues no está bien." },
                ar: { word: "لِأَنَّ / فَـ (في جملة رئيسية)", sentence: "يبقى في السرير، فهو ليس بخير." },
                tr: { word: "çünkü (ana cümle bağlacı)", sentence: "Yatakta kalıyor, çünkü iyi değil." },
                uk: { word: "бо / адже (сурядний сполучник)", sentence: "Він залишається в ліжку, бо він не здоровий." }
            }
        },
        {
            id: 'saa',
            word: 'så',
            category: 'helsaetning',
            clauseType: 'Helsætningskonjunktion (Sideordnende)',
            x: 31,
            y: 83,
            meaning: 'Følge / resultat i HELSÆTNING (INGEN inversion!)',
            sceneDesc: 'Det øsregner på gaden, så passagererne stiger ind i den gule bybus.',
            sentence: 'Det regner kraftigt, så jeg tager bussen.',
            contextSentence: 'Det øsregner udenfor hele morgenen, så pendlerne tager den gule bus på arbejde.',
            ruleHint: 'PAS PÅ TVILLINGEN "derfor"! Efter konjunktionen "så" er der INGEN inversion (Subjekt før Verbum: "..., så jeg tager bussen"). Efter adverbiet "derfor" er der inversion ("Derfor tager jeg bussen").',
            translations: {
                en: { word: "so (result, no inversion)", sentence: "It is raining heavily, so I take the bus." },
                de: { word: "also / sodass (ohne Inversion)", sentence: "Es regnet stark, also nehme ich den Bus." },
                es: { word: "así que / de modo que", sentence: "Llueve mucho, así que tomo el autobús." },
                ar: { word: "لِذَا / فـَ (نتيجة بدون قلب الفعل)", sentence: "تمطر بغزارة، لذا سأستقل الحافلة." },
                tr: { word: "bu yüzden / öyle ki (devriksiz)", sentence: "Şiddetli yağmur yağıyor, bu yüzden otobüse biniyorum." },
                uk: { word: "тож / тому (без інверсії)", sentence: "Йде сильний дощ, тож я сідаю на автобус." }
            }
        },

        // GRUPPE 2: Ledsætningskonjunktioner: Årsag, Betingelse, Indrømmelse & At/Om
        {
            id: 'fordi',
            word: 'fordi',
            category: 'ledsaetning_logik',
            clauseType: 'Ledsætningskonjunktion (Underordnende)',
            x: 12,
            y: 88,
            meaning: 'Årsag i LEDSÆTNING ("ikke" FØR verbet!)',
            sceneDesc: 'Manden drikker varm te med honning, fordi han ikke vil have ondt i halsen.',
            sentence: 'Han bliver hjemme, fordi han ikke er rask.',
            contextSentence: 'Han ligger under den varme dyne hele dagen, fordi han ikke føler sig rask nok til at arbejde.',
            ruleHint: 'GYLDEN REGEL: "Fordi" indleder en LEDSÆTNING! I en ledsætning står "ikke" (og altid/aldrig/ofte) altid FØR verbet: "... fordi han IKKE ER rask."',
            translations: {
                en: { word: "because (subordinating)", sentence: "He stays home because he is not well." },
                de: { word: "weil / da (Nebensatz!)", sentence: "Er bleibt zu Hause, weil er nicht gesund ist." },
                es: { word: "porque (oración subordinada)", sentence: "Se queda en casa porque no está bien." },
                ar: { word: "لِأَنَّ (في جملة فرعية)", sentence: "يبقى في المنزل لأنه ليس بخير." },
                tr: { word: "-diği için / çünkü (yan cümle)", sentence: "İyi olmadığı için evde kalıyor." },
                uk: { word: "тому що / оскільки (підрядний)", sentence: "Він залишається вдома, тому що він не здоровий." }
            }
        },
        {
            id: 'selvom',
            word: 'selvom',
            category: 'ledsaetning_logik',
            clauseType: 'Ledsætningskonjunktion (Underordnende)',
            x: 24,
            y: 26,
            meaning: 'Indrømmelse / på trods af i LEDSÆTNING ("ikke" FØR verbet!)',
            sceneDesc: 'Parret går tur i parken med paraply, selvom vejret ikke er godt.',
            sentence: 'De går en tur, selvom det ikke er tørvejr.',
            contextSentence: 'De lufter glad deres to hunde i parken, selvom solen ikke skinner på denne side.',
            ruleHint: 'Ledsætnings-tvillingen til adverbiet "alligevel". Efter "selvom" står "ikke" FØR verbet: "... selvom det IKKE ER tørvejr."',
            translations: {
                en: { word: "even though / although", sentence: "They go for a walk, even though it is not dry weather." },
                de: { word: "obwohl / wenngleich", sentence: "Sie machen einen Spaziergang, obwohl es nicht trocken ist." },
                es: { word: "aunque / a pesar de que", sentence: "Dan un paseo, aunque no hace tiempo seco." },
                ar: { word: "عَلَى الرَّغْمِ مِنْ أَنَّ / رَغْمَ أَنَّ", sentence: "يذهبون في نزهة، على الرغم من أن الجو ليس جافًا." },
                tr: { word: "-e rağmen / her ne kadar ... olsa da", sentence: "Hava kuru olmasa da yürüyüşe çıkıyorlar." },
                uk: { word: "хоча / незважаючи на те що", sentence: "Вони йдуть на прогулянку, хоча погода не суха." }
            }
        },
        {
            id: 'hvis',
            word: 'hvis',
            category: 'ledsaetning_logik',
            clauseType: 'Ledsætningskonjunktion (Underordnende)',
            x: 62,
            y: 54,
            meaning: 'Betingelse ("if") i LEDSÆTNING ("ikke" FØR verbet!)',
            sceneDesc: 'Drengen ved bordet drømmer om stranden: "Vi tager på stranden, hvis det ikke regner!"',
            sentence: 'Vi tager på stranden, hvis det ikke regner.',
            contextSentence: 'Familien planlægger en udflugt til stranden på søndag, hvis vejret ikke bliver dårligt.',
            ruleHint: 'Udtrykker en betingelse. I ledsætningen står "ikke" før verbet. Hvis ledsætningen står forrest ("Hvis det ikke regner, ..."), kommer der INVERSION i hovedsætningen ("... tager vi på stranden")!',
            translations: {
                en: { word: "if (condition)", sentence: "We will go to the beach if it does not rain." },
                de: { word: "wenn / falls", sentence: "Wir fahren an den Strand, wenn es nicht regnet." },
                es: { word: "si (condición)", sentence: "Iremos a la playa si no llueve." },
                ar: { word: "إِذَا / إِنْ (شرطية)", sentence: "سنذهب إلى الشاطئ إذا لم تمطر." },
                tr: { word: "eğer / şayet (-se/-sa)", sentence: "Yağmur yağmazsa plaja gideriz." },
                uk: { word: "якщо (умова)", sentence: "Ми підемо на пляж, якщо не буде дощу." }
            }
        },
        {
            id: 'at',
            word: 'at',
            category: 'ledsaetning_logik',
            clauseType: 'Ledsætningskonjunktion (Underordnende)',
            x: 41,
            y: 21,
            meaning: 'Fakta / udsagn i LEDSÆTNING ("that")',
            sceneDesc: 'Cyklisten ved kanalen vinker og fortæller, at han ikke kommer for sent.',
            sentence: 'Han siger, at han ikke kommer for sent.',
            contextSentence: 'Cyklisten ved kanalen har lige skrevet en besked om, at han ikke bliver forsinket.',
            ruleHint: 'Bruges efter verber som "sige, tro, vide, mene, høre, se" når man gengiver et udsagn. Husk ledsætningsordstilling: "... at han IKKE KOMMER for sent."',
            translations: {
                en: { word: "that (complementizer)", sentence: "He says that he will not be late." },
                de: { word: "dass", sentence: "Er sagt, dass er nicht zu spät kommt." },
                es: { word: "que (declarativo)", sentence: "Dice que no llegará tarde." },
                ar: { word: "أَنَّ", sentence: "يقول إنه لن يتأخر." },
                tr: { word: "-diğini / ki (bildirme bağlacı)", sentence: "Geç kalmayacağını söylüyor." },
                uk: { word: "що (з'ясувальний сполучник)", sentence: "Він каже, що не запізниться." }
            }
        },
        {
            id: 'om',
            word: 'om',
            category: 'ledsaetning_logik',
            clauseType: 'Ledsætningskonjunktion (Underordnende)',
            x: 95,
            y: 31,
            meaning: 'Spørgsmål / tvivl i LEDSÆTNING ("whether / if")',
            sceneDesc: 'Kvinden i caféen kigger spørgende på sin telefon for at se, om hendes veninde snart kommer.',
            sentence: 'Hun ved ikke, om veninden kommer i dag.',
            contextSentence: 'Kvinden i caféen tjekker sin telefon, fordi hun er i tvivl om, om veninden ikke har fundet vej.',
            ruleHint: 'Bruges ved JA/NEJ-spørgsmål og tvivl (efter "spørge, ikke vide, være i tvivl"). Sammenlign: "Jeg ved, AT han kommer" (fakta) vs. "Jeg ved ikke, OM han kommer" (tvivl).',
            translations: {
                en: { word: "whether / if (indirect question)", sentence: "She does not know whether her friend is coming today." },
                de: { word: "ob (indirekte Frage)", sentence: "Sie weiß nicht, ob die Freundin heute kommt." },
                es: { word: "si (pregunta indirecta / duda)", sentence: "Ella no sabe si su amiga vendrá hoy." },
                ar: { word: "مَا إِذَا / هَلْ (للتساؤل والشك)", sentence: "هي لا تعرف ما إذا كانت صديقتها ستأتي اليوم." },
                tr: { word: "-ip -mediğini (dolaylı soru / şüphe)", sentence: "Arkadaşının bugün gelip gelmeyeceğini bilmiyor." },
                uk: { word: "чи (непряме питання / сумнів)", sentence: "Вона не знає, чи прийде подруга сьогодні." }
            }
        },

        // GRUPPE 3: Ledsætningskonjunktioner: Tid & Samtidighed
        {
            id: 'naar',
            word: 'når',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Tid: Nutid, Fremtid & Vane)',
            x: 63,
            y: 38,
            meaning: 'Hver gang (vane) ELLER i fremtiden ("when")',
            sceneDesc: 'Sol-kalenderen på væggen viser sommer: "Når det bliver sommer, tager vi altid på stranden!"',
            sentence: 'Når solen skinner, spiser vi på altanen.',
            contextSentence: 'Når sommerferien starter i juli, tager hele familien altid i sommerhus ved vandet.',
            ruleHint: 'KEND FORSKELLEN PÅ "NÅR" OG "DA": Brug "når" om 1) FREMTID ("Når jeg bliver gammel...") og 2) GENTAGELSE/VANE ("Altid når det regner...").',
            translations: {
                en: { word: "when / whenever (present, future, habit)", sentence: "When the sun shines, we eat on the balcony." },
                de: { word: "wenn / immer wenn (Gegenwart, Zukunft, Gewohnheit)", sentence: "Wenn die Sonne scheint, essen wir auf dem Balkon." },
                es: { word: "cuando / siempre que (presente, futuro, hábito)", sentence: "Cuando brilla el sol, comemos en el balcón." },
                ar: { word: "عِنْدَمَا / كُلَّمَا (للمضارع والمستقبل والعادة)", sentence: "عندما تشرق الشمس، نأكل على الشرفة." },
                tr: { word: "-diği zaman / her ...-diğinde (geniş ve gelecek zaman)", sentence: "Güneş parladığında balkonda yemek yeriz." },
                uk: { word: "коли / щоразу коли (теперішнє, майбутнє, звичка)", sentence: "Коли світить сонце, ми їмо на балконі." }
            }
        },
        {
            id: 'da',
            word: 'da',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Tid: Én gang i fortiden)',
            x: 57,
            y: 43,
            meaning: 'Én bestemt gang / periode i FORTIDEN ("when")',
            sceneDesc: 'Moren peger på barndomsbilledet på væggen: "Da jeg var barn, boede jeg i det gule hus."',
            sentence: 'Da jeg var barn, boede vi i Odense.',
            contextSentence: 'Moren peger på fotografiet og fortæller, hvad hun lavede, da hun var en lille pige.',
            ruleHint: 'Brug KUN tids-konjunktionen "da" om noget, der skete én bestemt gang eller i én afsluttet periode i FORTIDEN ("Da jeg kom hjem i går...", "Da jeg var barn...").',
            translations: {
                en: { word: "when (single past event/period)", sentence: "When I was a child, we lived in Odense." },
                de: { word: "als (einmalig in der Vergangenheit)", sentence: "Als ich ein Kind war, wohnten wir in Odense." },
                es: { word: "cuando (evento único en el pasado)", sentence: "Cuando yo era niño, vivíamos en Odense." },
                ar: { word: "لَمَّا / عِنْدَمَا (لحدث محدد في الماضي)", sentence: "عندما كنت طفلاً، كنا نعيش في أودنسي." },
                tr: { word: "-diğinde / -diği zaman (geçmişte tek bir olay/dönem)", sentence: "Ben çocukken Odense'de yaşıyorduk." },
                uk: { word: "коли (одноразова подія або період у минулому)", sentence: "Коли я був дитиною, ми жили в Оденсе." }
            }
        },
        {
            id: 'mens',
            word: 'mens',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Samtidighed)',
            x: 42,
            y: 46,
            meaning: 'Samtidig med at ("while")',
            sceneDesc: 'Manden i køkkenet hører musik i sine høretelefoner, mens han rører i gryden på komfuret.',
            sentence: 'Han hører musik, mens han laver mad.',
            contextSentence: 'Faren synger glad med på sin yndlingssang i høretelefonerne, mens han koger pasta til familien.',
            ruleHint: 'Viser at to handlinger foregår på nøjagtig samme tid. Indleder en ledsætning ("... mens han ikke kigger på uret").',
            translations: {
                en: { word: "while", sentence: "He listens to music while he is cooking." },
                de: { word: "während", sentence: "Er hört Musik, während er kocht." },
                es: { word: "mientras", sentence: "Escucha música mientras cocina." },
                ar: { word: "بَيْنَمَا / أَثْنَاءَ مَا", sentence: "يستمع إلى الموسيقى بينما يطبخ." },
                tr: { word: "-iken / sırasında", sentence: "Yemek yaparken müzik dinliyor." },
                uk: { word: "поки / під час того як", sentence: "Він слухає музику, поки готує їжу." }
            }
        },
        {
            id: 'inden',
            word: 'inden',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Tid: Før)',
            x: 70,
            y: 81,
            meaning: 'Før ("before")',
            sceneDesc: 'Manden med rygsækken låser hoveddøren med nøglen, inden han går hjemmefra.',
            sentence: 'Husk at låse døren, inden du går.',
            contextSentence: 'Han tjekker altid sine lommer og låser den blå hoveddør grundigt, inden han tager på arbejde.',
            ruleHint: 'Synonym med konjunktionen "før". Viser at handling A sker forud for handling B.',
            translations: {
                en: { word: "before", sentence: "Remember to lock the door before you leave." },
                de: { word: "bevor / ehe", sentence: "Denk daran, die Tür abzuschließen, bevor du gehst." },
                es: { word: "antes de que", sentence: "Recuerda cerrar la puerta con llave antes de irte." },
                ar: { word: "قَبْلَ أَنْ", sentence: "تذكر أن تقفل الباب قبل أن تغادر." },
                tr: { word: "-meden önce", sentence: "Çıkmadan önce kapıyı kilitlemeyi unutma." },
                uk: { word: "перш ніж / до того як", sentence: "Не забудь замкнути двері, перш ніж підеш." }
            }
        },
        {
            id: 'efter_at',
            word: 'efter at',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Tid: Efter)',
            x: 54,
            y: 56,
            meaning: 'Når noget er afsluttet ("after")',
            sceneDesc: 'Familien sidder og snakker ved spisebordet, efter at de har spist sammen.',
            sentence: 'Vi drak kaffe, efter at vi havde spist.',
            contextSentence: 'Børnene tegner og hygger ved spisebordet, efter at familien er blevet færdig med maden.',
            ruleHint: 'PAS PÅ: "Efter" alene er en præposition ("efter middagen"). Når der følger en hel ledsætning med subjekt og verbum, hedder konjunktionen "efter at"!',
            translations: {
                en: { word: "after (conjunction)", sentence: "We drank coffee after we had eaten." },
                de: { word: "nachdem", sentence: "Wir tranken Kaffee, nachdem wir gegessen hatten." },
                es: { word: "después de que", sentence: "Tomamos café después de haber comido." },
                ar: { word: "بَعْدَ أَنْ", sentence: "شربنا القهوة بعد أن تناولنا الطعام." },
                tr: { word: "-dikten sonra", sentence: "Yemek yedikten sonra kahve içtik." },
                uk: { word: "після того як", sentence: "Ми пили каву після того, як поїли." }
            }
        },
        {
            id: 'siden',
            word: 'siden',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Tid: Fra fortid til nu)',
            x: 52,
            y: 18,
            meaning: 'Lige fra det tidspunkt hvor ("since")',
            sceneDesc: 'Hun har cyklet over kanalbroen hver dag, siden hun flyttede ind i kvarteret.',
            sentence: 'Jeg har boet her, siden jeg flyttede til byen.',
            contextSentence: 'Vi har kendt hinanden og boet i den samme gade ved kanalen, siden vi startede på studiet.',
            ruleHint: 'Forbinder et startpunkt i fortiden ("flyttede") med en tilstand i nutiden ("har boet").',
            translations: {
                en: { word: "since (time)", sentence: "I have lived here since I moved to the city." },
                de: { word: "seit / seitdem", sentence: "Ich wohne hier, seitdem ich in die Stadt gezogen bin." },
                es: { word: "desde que", sentence: "Vivo aquí desde que me mudé a la ciudad." },
                ar: { word: "مُنْذُ أَنْ", sentence: "أعيش هنا منذ أن انتقلت إلى المدينة." },
                tr: { word: "-diğinden beri", sentence: "Şehre taşındığımdan beri burada yaşıyorum." },
                uk: { word: "відтоді як / з того часу як", sentence: "Я живу тут відтоді, як переїхав до міста." }
            }
        },
        {
            id: 'indtil',
            word: 'indtil',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Tid: Slutpunkt)',
            x: 81,
            y: 69,
            meaning: 'Frem til det tidspunkt hvor ("until")',
            sceneDesc: 'Pendlerne venter tørt under stationens glastag, indtil regnvejret stopper.',
            sentence: 'Vi venter her, indtil regnen stopper.',
            contextSentence: 'Passagererne bliver stående under perronens glastag, indtil toget ruller ind på stationen.',
            ruleHint: 'Markerer slutpunktet for en handling: Handlingen fortsætter, lige indtil noget nyt sker.',
            translations: {
                en: { word: "until", sentence: "We wait here until the rain stops." },
                de: { word: "bis", sentence: "Wir warten hier, bis der Regen aufhört." },
                es: { word: "hasta que", sentence: "Esperamos aquí hasta que pare la lluvia." },
                ar: { word: "حَتَّى / إِلَى أَنْ", sentence: "ننتظر هنا حتى يتوقف المطر." },
                tr: { word: "-e kadar / -inceye dek", sentence: "Yağmur durana kadar burada bekliyoruz." },
                uk: { word: "поки не / доки не", sentence: "Ми чекаємо тут, поки дощ не припиниться." }
            }
        },
        {
            id: 'saa_snart',
            word: 'så snart',
            category: 'ledsaetning_tid',
            clauseType: 'Ledsætningskonjunktion (Tid: Straks)',
            x: 93,
            y: 81,
            meaning: 'I samme øjeblik som ("as soon as")',
            sceneDesc: 'Den rejsende ved Gate B14 ringer hjem i samme sekund, så snart flyet er landet.',
            sentence: 'Ring til mig, så snart du lander!',
            contextSentence: 'Han tager telefonen frem ved gaten og ringer til familien, så snart han er kommet ud af flyet.',
            ruleHint: 'Viser at handling 2 sker øjeblikkeligt efter handling 1 uden ventetid.',
            translations: {
                en: { word: "as soon as", sentence: "Call me as soon as you land!" },
                de: { word: "sobald", sentence: "Ruf mich an, sobald du landest!" },
                es: { word: "tan pronto como / en cuanto", sentence: "¡Llámame tan pronto como aterrices!" },
                ar: { word: "بِمُجَرَّدِ أَنْ / فَوْرَ أَنْ", sentence: "اتصل بي بمجرد أن تهبط!" },
                tr: { word: "-ir -mez / hemen ...-diğinde", sentence: "İner inmez beni ara!" },
                uk: { word: "щойно / як тільки", sentence: "Зателефонуй мені, щойно приземлишся!" }
            }
        }
    ];

    function getKonjTranslation(item) {
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
        .konjunktioner-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 5rem;
            color: #f8fafc;
        }

        .konj-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .konj-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #6ee7b7;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.8rem;
        }
        .konj-hero h1 {
            font-size: 2.6rem;
            font-weight: 900;
            margin-bottom: 0.6rem;
            background: linear-gradient(135deg, #6ee7b7, #10b981, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .konj-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 850px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        .golden-rule-banner-konj {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9));
            border: 2px solid #10b981;
            border-radius: 20px;
            padding: 1.4rem 2rem;
            max-width: 980px;
            margin: 0 auto 2.5rem;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .rule-icon-konj {
            font-size: 2.8rem;
            flex-shrink: 0;
        }
        .rule-content-konj h4 {
            color: #6ee7b7;
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
        }
        .rule-content-konj p {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
        }
        .rule-pills-row-konj {
            display: flex;
            gap: 0.6rem;
            margin-top: 0.8rem;
            flex-wrap: wrap;
        }
        .rule-pill-konj {
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 800;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #a7f3d0;
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
            padding: 0.8rem 1.3rem;
            border-radius: 12px;
            font-size: 0.96rem;
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
            background: #059669;
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        /* Vrimmel Layout */
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
            background: #059669;
            color: white;
            border-color: #10b981;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
        }
        .pure-toggle-btn {
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #a7f3d0;
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
            background: #047857;
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
            background: #059669;
            border: 2.5px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 0.85rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.6);
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }
        .hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.3);
            background: #10b981;
            box-shadow: 0 0 25px #10b981;
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
            color: #a7f3d0;
            border: 1px solid #10b981;
            padding: 0.2rem 0.55rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 4px;
            pointer-events: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        /* Målords Præsentationsboks */
        .vrimmel-inspector {
            background: #1e293b;
            border: 2px solid #10b981;
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
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid #10b981;
            color: #a7f3d0;
            padding: 0.25rem 0.75rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
        }
        .inspector-audio-btn {
            background: #059669;
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
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
        }
        .inspector-audio-btn:hover {
            background: #10b981;
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
            border-left: 4px solid #10b981;
        }
        .trans-badge-label {
            font-size: 0.75rem;
            font-weight: 800;
            color: #6ee7b7;
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
            border: 1.5px solid rgba(16, 185, 129, 0.35);
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
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #a7f3d0;
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
            background: #10b981;
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

        /* Tab 2: Laboratoriet */
        .vaerksted-container {
            max-width: 980px;
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
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
        }
        .vaerksted-subtab-btn:hover {
            border-color: #10b981;
            color: white;
        }
        .vaerksted-subtab-btn.active {
            background: #059669;
            border-color: #6ee7b7;
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .vaerksted-card {
            background: #1e293b;
            border-radius: 20px;
            padding: 2.2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            margin-bottom: 2rem;
        }

        .word-selector-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.8rem;
            margin: 1.5rem 0;
        }
        .word-sel-btn {
            background: #0f172a;
            color: #cbd5e1;
            border: 2px solid rgba(255, 255, 255, 0.1);
            padding: 0.85rem 1rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .word-sel-btn:hover {
            border-color: #10b981;
            color: white;
        }
        .word-sel-btn.active {
            border-color: #6ee7b7;
            background: rgba(16, 185, 129, 0.2);
            color: #a7f3d0;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .syntax-boxes-row {
            display: flex;
            gap: 0.7rem;
            justify-content: center;
            align-items: stretch;
            flex-wrap: wrap;
            margin: 1.5rem 0;
        }
        .syntax-token-box {
            background: #0f172a;
            border: 2.5px solid;
            border-radius: 14px;
            padding: 0.9rem 1.2rem;
            min-width: 110px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.3rem;
        }
        .syntax-token-role {
            font-size: 0.72rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .syntax-token-word {
            font-size: 1.3rem;
            font-weight: 900;
            color: white;
        }

        /* Detektiven & Quizzer */
        .detektiv-container {
            background: #1e293b;
            border-radius: 20px;
            padding: 2rem;
            border: 2px solid rgba(255, 255, 255, 0.1);
            max-width: 880px;
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
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid #10b981;
            color: #a7f3d0;
            padding: 0.35rem 0.9rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
        }
        .detektiv-prompt-text {
            font-size: 1.2rem;
            color: #f8fafc;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }
        .detektiv-sentence-quote {
            font-size: 1.4rem;
            font-weight: 800;
            color: white;
            background: rgba(15, 23, 42, 0.7);
            padding: 1.3rem;
            border-radius: 14px;
            border-left: 5px solid #10b981;
            margin-bottom: 2rem;
            text-align: center;
            line-height: 1.6;
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
            border-color: #10b981;
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

        /* Sætningsbyggeren */
        .builder-container {
            max-width: 980px;
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
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid #10b981;
            color: #a7f3d0;
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
        .flow-step.flow-konj { border-color: #eab308; }
        .flow-step-num { font-size: 0.75rem; font-weight: 800; margin-bottom: 0.2rem; color: #cbd5e1; }
        .flow-step-title { font-size: 0.95rem; font-weight: 800; color: white; }

        .sb-sentence-display {
            font-size: 1.4rem;
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
            border: 2.5px dashed #10b981;
            background: rgba(16, 185, 129, 0.15);
            border-radius: 10px;
            color: #6ee7b7;
            font-weight: 900;
            letter-spacing: 2px;
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
        .sb-puzzle-slot.slot-konj { border-color: #eab308; }
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
        .callout-konj { color: #fde047; }

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
            border-color: #10b981;
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.used {
            opacity: 0.25;
            pointer-events: none;
        }

        /* Special Tabs */
        .special-tab-container {
            max-width: 960px;
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
            font-size: 2.1rem;
            color: #6ee7b7;
            margin-bottom: 0.6rem;
        }
        .special-intro-box p {
            color: #cbd5e1;
            font-size: 1.08rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .special-rule-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
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
            gap: 0.4rem;
            flex-wrap: wrap;
        }
        .special-rule-word {
            font-size: 1.35rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .special-rule-role {
            font-size: 0.72rem;
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
            background: #10b981;
            transition: width 0.3s ease;
        }
        .exercise-dialog-quote {
            font-size: 1.35rem;
            color: white;
            line-height: 1.75;
            background: #0f172a;
            padding: 1.5rem;
            border-radius: 14px;
            border-left: 5px solid #10b981;
            margin-bottom: 1.8rem;
        }

        .action-btn-primary {
            background: #059669;
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
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);
        }
        .action-btn-primary:hover {
            background: #10b981;
            transform: translateY(-2px);
        }

        .score-celebration-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
            border: 2px solid #10b981;
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.35);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'konj-hero';
    hero.innerHTML = `
        <h1>Helsætnings- og ledsætningskonjunktioner</h1>
        <p>Mestre de ægte bindeord i dansk: De 5 sideordnende <strong>helsætningskonjunktioner</strong> (<em>og, men, eller, for, så</em>) og de 13 underordnende <strong>ledsætningskonjunktioner</strong> (<em>fordi, selvom, hvis, at, om, når, da, mens, inden...</em>).</p>
    `;
    viewContainer.appendChild(hero);

    // Tabs Navigation
    const nav = document.createElement('div');
    nav.className = 'adv-tabs-nav';

    const tabs = [
        { id: 'vrimmel', label: '1. Broernes verden (vrimlebilledet)', icon: '🖼️' },
        { id: 'laboratorium', label: '2. Ordstillings-laboratoriet ("ikke"-magneten)', icon: '🔬' },
        { id: 'detektiv', label: '3. Konjunktions-detektiven (10 gåder)', icon: '🔍' },
        { id: 'builder', label: '4. Sætningsbyggeren og puslespillet', icon: '🧩' },
        { id: 'kontekst', label: '5. Kontekst-testen (14 opgaver)', icon: '🎯' },
        { id: 'tid', label: '6. "Da" eller "når"? og tidskonjunktioner', icon: '⏳' },
        { id: 'aarsag', label: '7. "Fordi", "for", "så" eller "derfor"?', icon: '⚡' },
        { id: 'atom', label: '8. "At" eller "om"? og "hvis" eller "selvom"?', icon: '🧭' },
        { id: 'tekstflow', label: '9. Tekstflow og historier', icon: '📖' }
    ];

    let currentTab = (extraData && (extraData.subPath || extraData.tab)) || 'vrimmel';
    if (!tabs.some(t => t.id === currentTab)) currentTab = 'vrimmel';

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `adv-tab-btn ${currentTab === tab.id ? 'active' : ''}`;
        btn.id = `tab-btn-${tab.id}`;
        btn.innerHTML = `<span>${tab.icon}</span> ${tab.label}`;
        btn.onclick = () => switchTab(tab.id);
        nav.appendChild(btn);
    });
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content-area';
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/konjunktioner_all/' + tabId);
        nav.querySelectorAll('.adv-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#tab-btn-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'vrimmel') {
            renderTabVrimmel(tabContent);
        } else if (tabId === 'laboratorium') {
            renderTabLaboratorium(tabContent);
        } else if (tabId === 'detektiv') {
            renderTabDetektiv(tabContent);
        } else if (tabId === 'builder') {
            renderTabBuilder(tabContent);
        } else if (tabId === 'kontekst') {
            renderTabKontekst(tabContent);
        } else if (tabId === 'tid') {
            renderTabTid(tabContent);
        } else if (tabId === 'aarsag') {
            renderTabAarsag(tabContent);
        } else if (tabId === 'atom') {
            renderTabAtOm(tabContent);
        } else if (tabId === 'tekstflow') {
            renderTabTekstflow(tabContent);
        }
    }

    // ==========================================
    // TAB 1: VRIMLEBILLEDET
    // ==========================================
    let activeFilter = (extraData && extraData.filter) ? extraData.filter : 'alle';
    let isPureMode = false;
    let selectedWord = null;

    function renderTabVrimmel(parent) {
        parent.innerHTML = '';

        const matchingWords = KONJUNKTIONER_DATA.filter(item => activeFilter === 'alle' || item.category === activeFilter);
        if (!selectedWord || !matchingWords.some(w => w.id === selectedWord.id)) {
            selectedWord = matchingWords[0] || KONJUNKTIONER_DATA[0];
        }

        const layout = document.createElement('div');
        layout.className = 'vrimmel-layout';

        const stageCard = document.createElement('div');
        stageCard.className = 'vrimmel-stage-card';

        const controls = document.createElement('div');
        controls.className = 'vrimmel-controls-bar';

        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'vrimmel-filters';

        const filters = [
            { id: 'alle', label: 'Alle (18)' },
            { id: 'helsaetning', label: '🟢 Helsætning: og, men, eller, for, så (5)' },
            { id: 'ledsaetning_logik', label: '🔵 Ledsætning: fordi, selvom, hvis, at, om (5)' },
            { id: 'ledsaetning_tid', label: '🟣 Ledsætning Tid: når, da, mens, inden... (8)' }
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

        const stage = document.createElement('div');
        stage.className = 'vrimmel-stage';

        const img = document.createElement('img');
        img.src = 'assets/konjunktioner_vrimmel.jpg';
        img.alt = 'Helsætnings- og ledsætningskonjunktioner i hverdagen';
        img.className = 'vrimmel-img';
        stage.appendChild(img);

        const visibleWords = KONJUNKTIONER_DATA.filter(item => {
            if (activeFilter === 'alle') return true;
            return item.category === activeFilter;
        });

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

        const inspector = document.createElement('div');
        inspector.className = 'vrimmel-inspector';
        layout.appendChild(inspector);
        parent.appendChild(layout);

        function updateInspector(item, shouldScroll = false) {
            selectedWord = item;

            stage.querySelectorAll('.hotspot-pin').forEach(p => {
                p.classList.toggle('active', p.dataset.id === item.id);
            });

            const trans = getKonjTranslation(item);
            const currentLang = getLang().toUpperCase();

            const highlightedSentence = item.sentence.replace(
                new RegExp(`\\b(${item.word})\\b`, 'i'),
                `<span style="color: #6ee7b7; text-decoration: underline;">$1</span>`
            );

            inspector.innerHTML = `
                <div class="inspector-left">
                    <div class="inspector-header">
                        <div class="inspector-badge-row">
                            <span class="inspector-badge">${item.clauseType}</span>
                            <span class="inspector-badge" style="background: rgba(234, 179, 8, 0.2); border-color: #eab308; color: #fde047;">${item.meaning}</span>
                        </div>
                        <button class="inspector-audio-btn" id="insp-speak-word" title="Lyt til udtale">🔊</button>
                    </div>

                    <h2 class="inspector-word-title">
                        <span>🌉</span> ${item.word}
                    </h2>

                    <div class="inspector-trans-box">
                        <div class="trans-badge-label">
                            <span>🌍</span> MÅLORDSPRÆSENTATION & OVERSÆTTELSE (${currentLang})
                        </div>
                        <div class="trans-word-val">${trans.word}</div>
                    </div>

                    <div class="inspector-scene-box">
                        <div class="scene-heading">📍 I Vrimlebilledet</div>
                        <p class="scene-text">${item.sceneDesc}</p>
                    </div>
                </div>

                <div class="inspector-right">
                    <div class="inspector-sentence-card">
                        <div class="trans-badge-label" style="margin-bottom:0.4rem;">💬 EKSEMPEL PÅ SÆTNINGSBRO</div>
                        <div class="sentence-quote-text">"${highlightedSentence}"</div>
                        ${trans.sentence ? `<div class="sentence-trans-text" style="color:#a7f3d0; margin-top:0.4rem;">🌍 "${trans.sentence}"</div>` : ''}
                        <button class="inspector-speak-btn" id="insp-speak-sent" style="margin-top:0.8rem;">
                            <span>🔊</span> Lyt til eksemplet
                        </button>
                    </div>

                    <div class="inspector-actions" style="margin-top: 1rem;">
                        <button class="inspector-btn-action" id="insp-prev-btn">⬅ Forrige ord</button>
                        <button class="inspector-btn-action" id="insp-next-btn" style="background:#059669;">Næste ord ➔</button>
                    </div>
                </div>
            `;

            inspector.querySelector('#insp-speak-word').onclick = () => speakDanish(item.word);
            inspector.querySelector('#insp-speak-sent').onclick = () => speakDanish(item.sentence);

            inspector.querySelector('#insp-prev-btn').onclick = () => {
                const idx = visibleWords.findIndex(w => w.id === item.id);
                const prevItem = visibleWords[(idx - 1 + visibleWords.length) % visibleWords.length];
                updateInspector(prevItem, false);
                speakDanish(prevItem.word);
            };
            inspector.querySelector('#insp-next-btn').onclick = () => {
                const idx = visibleWords.findIndex(w => w.id === item.id);
                const nextItem = visibleWords[(idx + 1) % visibleWords.length];
                updateInspector(nextItem, false);
                speakDanish(nextItem.word);
            };

            if (shouldScroll) {
                inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        updateInspector(selectedWord, false);
    }

    // ==========================================
    // TAB 2: ORDSTILLINGS-LABORATORIET
    // ==========================================
    let activeLabSub = 'magnet';
    let selectedMagnetPair = 'for_fordi';
    let selectedMagnetSide = 'helsaetning'; // 'helsaetning' | 'ledsaetning'
    let selectedFrontEx = 'naar';
    let frontOrderMode = 'bagest'; // 'bagest' | 'forrest'

    function renderTabLaboratorium(parent) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'vaerksted-container';

        const subtabs = document.createElement('div');
        subtabs.className = 'vaerksted-subtabs';

        const subList = [
            { id: 'magnet', label: '🧲 1. "IKKE"-Magneten (Helsætning vs. Ledsætning)' },
            { id: 'forfelt', label: '🔄 2. Ledsætning i Front = INVERSION i Hovedsætningen!' },
            { id: 'oversigt', label: '🌉 3. Den store tabel: helsætning vs. ledsætning vs. felt 7' }
        ];

        subList.forEach(st => {
            const btn = document.createElement('button');
            btn.className = `vaerksted-subtab-btn ${activeLabSub === st.id ? 'active' : ''}`;
            btn.textContent = st.label;
            btn.onclick = () => {
                activeLabSub = st.id;
                renderTabLaboratorium(parent);
            };
            subtabs.appendChild(btn);
        });
        wrap.appendChild(subtabs);

        const body = document.createElement('div');
        wrap.appendChild(body);
        parent.appendChild(wrap);

        if (activeLabSub === 'magnet') {
            renderLabMagnet(body);
        } else if (activeLabSub === 'forfelt') {
            renderLabForfelt(body);
        } else {
            renderLabOversigt(body);
        }
    }

    function renderLabMagnet(container) {
        const pairs = {
            for_fordi: {
                label: 'Årsag: for (Helsætning) ↔ fordi (Ledsætning)',
                mainClause: 'Han bliver hjemme i sengen,',
                helsaetning: {
                    conj: 'for',
                    title: '🟢 HELSÆTNING med "for" (ikke står EFTER verbet!)',
                    tokens: [
                        { role: 'F0 Konjunktion', word: 'for', color: '#eab308' },
                        { role: '1. Subjekt', word: 'han', color: '#22c55e' },
                        { role: '2. Verbum', word: 'er', color: '#ef4444' },
                        { role: '3. Adverbium (EFTER!)', word: 'ikke', color: '#06b6d4' },
                        { role: '4. Restled', word: 'rask i dag.', color: '#0ea5e9' }
                    ],
                    explain: '"For" er en sideordnende helsætningskonjunktion. Derfor følger helt normal helsætningsordstilling: Subjekt (han) + Verbum (er) + IKKE.'
                },
                ledsaetning: {
                    conj: 'fordi',
                    title: '🔵 LEDSÆTNING med "fordi" (ikke rykker FØR verbet!)',
                    tokens: [
                        { role: 'Konjunktion', word: 'fordi', color: '#eab308' },
                        { role: '1. Subjekt', word: 'han', color: '#22c55e' },
                        { role: '2. Adverbium (FØR!)', word: 'ikke', color: '#06b6d4' },
                        { role: '3. Verbum', word: 'er', color: '#ef4444' },
                        { role: '4. Restled', word: 'rask i dag.', color: '#0ea5e9' }
                    ],
                    explain: '"Fordi" er en underordnende ledsætningskonjunktion! Den trækker som en magnet "ikke" (samt aldrig/altid/ofte) ind FØR verbet: han + IKKE + er!'
                }
            },
            men_selvom: {
                label: 'Kontrast: men (Helsætning) ↔ selvom (Ledsætning)',
                mainClause: 'De går en lang tur med hundene,',
                helsaetning: {
                    conj: 'men',
                    title: '🟢 HELSÆTNING med "men" (ikke står EFTER verbet!)',
                    tokens: [
                        { role: 'F0 Konjunktion', word: 'men', color: '#eab308' },
                        { role: '1. Subjekt', word: 'solen', color: '#22c55e' },
                        { role: '2. Verbum', word: 'skinner', color: '#ef4444' },
                        { role: '3. Adverbium (EFTER!)', word: 'ikke', color: '#06b6d4' },
                        { role: '4. Restled', word: 'i parken.', color: '#0ea5e9' }
                    ],
                    explain: 'Efter "men" kommer en almindelig helsætning, hvor verbet ("skinner") kommer før "ikke".'
                },
                ledsaetning: {
                    conj: 'selvom',
                    title: '🔵 LEDSÆTNING med "selvom" (ikke rykker FØR verbet!)',
                    tokens: [
                        { role: 'Konjunktion', word: 'selvom', color: '#eab308' },
                        { role: '1. Subjekt', word: 'solen', color: '#22c55e' },
                        { role: '2. Adverbium (FØR!)', word: 'ikke', color: '#06b6d4' },
                        { role: '3. Verbum', word: 'skinner', color: '#ef4444' },
                        { role: '4. Restled', word: 'i parken.', color: '#0ea5e9' }
                    ],
                    explain: 'Efter "selvom" er vi i en ledsætning – så "ikke" hopper ind foran verbet ("ikke skinner")!'
                }
            },
            og_at: {
                label: 'Udsagn: og (Helsætning) ↔ at / hvis / når (Ledsætning)',
                mainClause: 'Cyklisten skriver en sms,',
                helsaetning: {
                    conj: 'og',
                    title: '🟢 HELSÆTNING med "og" (kommer ikke)',
                    tokens: [
                        { role: 'F0 Konjunktion', word: 'og', color: '#eab308' },
                        { role: '1. Subjekt', word: 'han', color: '#22c55e' },
                        { role: '2. Verbum', word: 'kommer', color: '#ef4444' },
                        { role: '3. Adverbium (EFTER!)', word: 'ikke', color: '#06b6d4' },
                        { role: '4. Restled', word: 'for sent.', color: '#0ea5e9' }
                    ],
                    explain: 'Efter "og" er ordstillingen: han (Subjekt) + kommer (Verbum) + ikke (Adverbium).'
                },
                ledsaetning: {
                    conj: 'at',
                    title: '🔵 LEDSÆTNING med "at" (ikke kommer)',
                    tokens: [
                        { role: 'Konjunktion', word: 'at', color: '#eab308' },
                        { role: '1. Subjekt', word: 'han', color: '#22c55e' },
                        { role: '2. Adverbium (FØR!)', word: 'ikke', color: '#06b6d4' },
                        { role: '3. Verbum', word: 'kommer', color: '#ef4444' },
                        { role: '4. Restled', word: 'for sent.', color: '#0ea5e9' }
                    ],
                    explain: 'Efter "at" (samt "om", "hvis", "når", "da", "mens") står "ikke" ALTID før verbet: han + IKKE + kommer!'
                }
            }
        };

        const curPair = pairs[selectedMagnetPair];
        const curSide = curPair[selectedMagnetSide];

        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#6ee7b7; margin-bottom:0.5rem;">🧲 "IKKE"-Magneten: Helsætning vs. Ledsætning</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:780px; margin:0 auto 1.2rem;">
                Prøv at skifte mellem <strong>Helsætningskonjunktion</strong> og <strong>Ledsætningskonjunktion</strong> herunder. Se hvordan <span style="color:#22d3ee; font-weight:800;">ikke</span> og <span style="color:#fca5a5; font-weight:800;">verbet</span> bytter plads!
            </p>
            <div class="word-selector-grid">
                ${Object.keys(pairs).map(k => `
                    <button class="word-sel-btn ${selectedMagnetPair === k ? 'active' : ''}" data-pair="${k}">
                        ${pairs[k].label}
                    </button>
                `).join('')}
            </div>

            <div style="display:flex; gap:1rem; justify-content:center; margin:1.5rem 0; flex-wrap:wrap;">
                <button class="word-sel-btn ${selectedMagnetSide === 'helsaetning' ? 'active' : ''}" id="btn-side-hel" style="min-width:260px;">
                    🟢 Vis HELSÆTNING ("${curPair.helsaetning.conj}")
                </button>
                <button class="word-sel-btn ${selectedMagnetSide === 'ledsaetning' ? 'active' : ''}" id="btn-side-led" style="min-width:260px;">
                    🔵 Vis LEDSÆTNING ("${curPair.ledsaetning.conj}")
                </button>
            </div>

            <div style="background:#0f172a; border-radius:16px; padding:1.8rem; border:2px solid #10b981; text-align:center;">
                <div style="font-size:1.1rem; color:#94a3b8; margin-bottom:0.4rem;">Første sætning: <strong style="color:white;">"${curPair.mainClause}"</strong></div>
                <h4 style="color:#6ee7b7; margin:0.6rem 0 1rem;">${curSide.title}</h4>
                <div class="syntax-boxes-row">
                    ${curSide.tokens.map(t => `
                        <div class="syntax-token-box" style="border-color:${t.color};">
                            <span class="syntax-token-role" style="color:${t.color};">${t.role}</span>
                            <span class="syntax-token-word">${t.word}</span>
                        </div>
                    `).join('')}
                </div>
                <p style="color:#fef08a; font-weight:700; margin:1rem auto; max-width:700px;">💡 ${curSide.explain}</p>
                <button class="inspector-speak-btn" id="speak-magnet-btn">
                    <span>🔊</span> Lyt til hele sætningen
                </button>
            </div>
        `;

        container.innerHTML = '';
        container.appendChild(card);

        card.querySelectorAll('[data-pair]').forEach(b => {
            b.onclick = () => {
                selectedMagnetPair = b.dataset.pair;
                renderLabMagnet(container);
            };
        });
        card.querySelector('#btn-side-hel').onclick = () => {
            selectedMagnetSide = 'helsaetning';
            renderLabMagnet(container);
        };
        card.querySelector('#btn-side-led').onclick = () => {
            selectedMagnetSide = 'ledsaetning';
            renderLabMagnet(container);
        };
        card.querySelector('#speak-magnet-btn').onclick = () => {
            speakDanish(`${curPair.mainClause} ${curSide.tokens.map(t => t.word).join(' ')}`);
        };
    }

    function renderLabForfelt(container) {
        const examples = {
            naar: {
                label: 'Når det regner...',
                bagest: [
                    { role: '1. Subjekt', word: 'Jeg', color: '#22c55e' },
                    { role: '2. Verbum', word: 'tager', color: '#ef4444' },
                    { role: '3. Objekt', word: 'bussen,', color: '#0ea5e9' },
                    { role: '4. Ledsætning til sidst', word: 'når det regner.', color: '#eab308' }
                ],
                forrest: [
                    { role: '1. Forfelt (Hele ledsætningen!)', word: 'Når det regner,', color: '#eab308' },
                    { role: '2. Verbum (INVERSION!)', word: 'tager', color: '#ef4444' },
                    { role: '3. Subjekt', word: 'jeg', color: '#22c55e' },
                    { role: '4. Objekt', word: 'bussen.', color: '#0ea5e9' }
                ]
            },
            hvis: {
                label: 'Hvis solen skinner...',
                bagest: [
                    { role: '1. Subjekt', word: 'Vi', color: '#22c55e' },
                    { role: '2. Verbum', word: 'spiser', color: '#ef4444' },
                    { role: '3. Sted', word: 'på stranden,', color: '#0ea5e9' },
                    { role: '4. Ledsætning til sidst', word: 'hvis solen skinner.', color: '#eab308' }
                ],
                forrest: [
                    { role: '1. Forfelt (Hele ledsætningen!)', word: 'Hvis solen skinner,', color: '#eab308' },
                    { role: '2. Verbum (INVERSION!)', word: 'spiser', color: '#ef4444' },
                    { role: '3. Subjekt', word: 'vi', color: '#22c55e' },
                    { role: '4. Sted', word: 'på stranden.', color: '#0ea5e9' }
                ]
            },
            selvom: {
                label: 'Selvom det ikke er varmt...',
                bagest: [
                    { role: '1. Subjekt', word: 'Hun', color: '#22c55e' },
                    { role: '2. Verbum', word: 'bader', color: '#ef4444' },
                    { role: '3. Sted', word: 'i havet,', color: '#0ea5e9' },
                    { role: '4. Ledsætning til sidst', word: 'selvom det ikke er varmt.', color: '#eab308' }
                ],
                forrest: [
                    { role: '1. Forfelt (Hele ledsætningen!)', word: 'Selvom det ikke er varmt,', color: '#eab308' },
                    { role: '2. Verbum (INVERSION!)', word: 'bader', color: '#ef4444' },
                    { role: '3. Subjekt', word: 'hun', color: '#22c55e' },
                    { role: '4. Sted', word: 'i havet.', color: '#0ea5e9' }
                ]
            }
        };

        const cur = examples[selectedFrontEx];
        const tokens = frontOrderMode === 'bagest' ? cur.bagest : cur.forrest;

        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#6ee7b7; margin-bottom:0.5rem;">🔄 Ledsætning i Front = INVERSION i Hovedsætningen!</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:780px; margin:0 auto 1.2rem;">
                Når du starter en sætning med en ledsætning (f.eks. <em>"Når det regner, ..."</em>), fylder hele ledsætningen <strong>Plads 1 (Forfeltet)</strong>. Derfor SKAL hovedsætningens <span style="color:#fca5a5; font-weight:800;">Verbum</span> stå på Plads 2 lige efter kommaet!
            </p>
            <div class="word-selector-grid">
                ${Object.keys(examples).map(k => `
                    <button class="word-sel-btn ${selectedFrontEx === k ? 'active' : ''}" data-fex="${k}">
                        ${examples[k].label}
                    </button>
                `).join('')}
            </div>

            <div style="display:flex; gap:1rem; justify-content:center; margin:1.5rem 0; flex-wrap:wrap;">
                <button class="word-sel-btn ${frontOrderMode === 'bagest' ? 'active' : ''}" id="btn-order-bag">
                    1️⃣ Hovedsætning først + Ledsætning til sidst (Ingen inversion)
                </button>
                <button class="word-sel-btn ${frontOrderMode === 'forrest' ? 'active' : ''}" id="btn-order-for">
                    2️⃣ Ledsætning forrest i Forfeltet ➔ INVERSION efter kommaet!
                </button>
            </div>

            <div style="background:#0f172a; border-radius:16px; padding:1.8rem; border:2px solid #10b981; text-align:center;">
                <div class="syntax-boxes-row">
                    ${tokens.map(t => `
                        <div class="syntax-token-box" style="border-color:${t.color};">
                            <span class="syntax-token-role" style="color:${t.color};">${t.role}</span>
                            <span class="syntax-token-word">${t.word}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="inspector-speak-btn" id="speak-front-btn" style="margin-top:1rem;">
                    <span>🔊</span> Lyt: "${tokens.map(t => t.word).join(' ')}"
                </button>
            </div>
        `;

        container.innerHTML = '';
        container.appendChild(card);

        card.querySelectorAll('[data-fex]').forEach(b => {
            b.onclick = () => {
                selectedFrontEx = b.dataset.fex;
                renderLabForfelt(container);
            };
        });
        card.querySelector('#btn-order-bag').onclick = () => {
            frontOrderMode = 'bagest';
            renderLabForfelt(container);
        };
        card.querySelector('#btn-order-for').onclick = () => {
            frontOrderMode = 'forrest';
            renderLabForfelt(container);
        };
        card.querySelector('#speak-front-btn').onclick = () => {
            speakDanish(tokens.map(t => t.word).join(' '));
        };
    }

    function renderLabOversigt(container) {
        const card = document.createElement('div');
        card.className = 'vaerksted-card';
        card.innerHTML = `
            <h2 style="text-align:center; color:#6ee7b7; margin-bottom:0.5rem;">🌉 Den Store Sammenligning: 3 måder at binde sætninger på</h2>
            <p style="text-align:center; color:#cbd5e1; max-width:820px; margin:0 auto 1.6rem;">
                Se hvordan den samme tanke kan udtrykkes med 1) <strong>Helsætningskonjunktion</strong>, 2) <strong>Ledsætningskonjunktion</strong> og 3) <strong>Konnektivt Adverbium (Felt 7)</strong>:
            </p>
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; background:#0f172a; border-radius:14px; overflow:hidden; font-size:0.95rem;">
                    <thead>
                        <tr style="background:#334155; color:white; text-align:left;">
                            <th style="padding:1rem;">Logisk relation</th>
                            <th style="padding:1rem; color:#86efac;">1. Helsætningskonjunktion<br><small>(Subjekt + Verbum + ikke)</small></th>
                            <th style="padding:1rem; color:#67e8f9;">2. Ledsætningskonjunktion<br><small>(Subjekt + IKKE + Verbum)</small></th>
                            <th style="padding:1rem; color:#fde047;">3. Konnektivt Adverbium (Felt 7)<br><small>(Inversion i front / efter verbum)</small></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                            <td style="padding:1rem; font-weight:800; color:#fde047;">Årsag<br>(Hvorfor?)</td>
                            <td style="padding:1rem;">"Han bliver hjemme, <strong>for</strong> han <span style="color:#fca5a5;">er</span> <span style="color:#22d3ee;">ikke</span> rask."</td>
                            <td style="padding:1rem;">"Han bliver hjemme, <strong>fordi</strong> han <span style="color:#22d3ee;">ikke</span> <span style="color:#fca5a5;">er</span> rask."</td>
                            <td style="padding:1rem;">"Han bliver hjemme. Han <span style="color:#fca5a5;">er</span> <strong>nemlig</strong> <span style="color:#22d3ee;">ikke</span> rask."</td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                            <td style="padding:1rem; font-weight:800; color:#fde047;">Følge<br>(Resultat)</td>
                            <td style="padding:1rem;">"Det regner, <strong>så</strong> <span style="color:#86efac;">jeg</span> <span style="color:#fca5a5;">tager</span> bussen." <em>(Ingen inversion!)</em></td>
                            <td style="padding:1rem;">"<strong>Da</strong> det regnede, <span style="color:#fca5a5;">tog</span> <span style="color:#86efac;">jeg</span> bussen."</td>
                            <td style="padding:1rem;">"Det regner. <strong>Derfor</strong> <span style="color:#fca5a5;">tager</span> <span style="color:#86efac;">jeg</span> bussen." <em>(Inversion!)</em></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                            <td style="padding:1rem; font-weight:800; color:#fde047;">Kontrast<br>(Trods)</td>
                            <td style="padding:1rem;">"Det regner, <strong>men</strong> <span style="color:#86efac;">hun</span> <span style="color:#fca5a5;">bliver</span> <span style="color:#22d3ee;">ikke</span> inde."</td>
                            <td style="padding:1rem;">"Hun cykler, <strong>selvom</strong> det <span style="color:#22d3ee;">ikke</span> <span style="color:#fca5a5;">er</span> tørvejr."</td>
                            <td style="padding:1rem;">"Det regner. <strong>Alligevel</strong> <span style="color:#fca5a5;">cykler</span> <span style="color:#86efac;">hun</span>." <em>(Inversion!)</em></td>
                        </tr>
                        <tr>
                            <td style="padding:1rem; font-weight:800; color:#fde047;">Betingelse<br>(Hvad hvis?)</td>
                            <td style="padding:1rem;">"Skynd dig, <strong>eller</strong> du kommer for sent!"</td>
                            <td style="padding:1rem;">"Du kommer for sent, <strong>hvis</strong> du <span style="color:#22d3ee;">ikke</span> <span style="color:#fca5a5;">skynder</span> dig."</td>
                            <td style="padding:1rem;">"Skynd dig! <strong>Ellers</strong> <span style="color:#fca5a5;">kommer</span> <span style="color:#86efac;">du</span> for sent." <em>(Inversion!)</em></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = '';
        container.appendChild(card);
    }

    // ==========================================
    // TAB 3: KONJUNKTIONS-DETEKTIVEN (10 GÅDER)
    // ==========================================
    const DETEKTIV_RIDDLES = [
        {
            tag: 'Gåde 1 • Kig på placeringen af "ikke"!',
            prompt: 'Se nøje på ordstillingen i sætning 2: Ordet "ikke" står FØR verbet ("ikke kan"). Hvilken årsags-konjunktion SKAL vi så vælge?',
            quote: '"Jeg må desværre melde afbud til festen, ______ jeg ikke kan finde en barnepige."',
            options: ['fordi', 'for', 'så'],
            correct: 'fordi',
            explanations: {
                'fordi': '🌟 Skarpt set! Da "ikke" står FØR verbet ("jeg ikke kan"), er det en ledsætning – og derfor skal vi bruge "fordi"!',
                'for': '"For" indleder en helsætning, så det ville kræve "..., for jeg kan ikke finde...".',
                'så': '"Så" udtrykker resultat, ikke årsag.'
            }
        },
        {
            tag: 'Gåde 2 • Kig på placeringen af "ikke"!',
            prompt: 'Nu står "ikke" EFTER verbet ("kan ikke")! Hvilken årsags-konjunktion passer til en helsætning?',
            quote: '"Jeg må desværre melde afbud til festen, ______ jeg kan ikke finde en barnepige."',
            options: ['for', 'fordi', 'selvom'],
            correct: 'for',
            explanations: {
                'for': '🌟 Fuldstændig rigtigt! Når "ikke" står EFTER verbet ("jeg kan ikke"), er det en helsætning – og så bruger vi "for"!',
                'fordi': '"Fordi" kræver ledsætningsordstilling ("... fordi jeg ikke kan").',
                'selvom': '"Selvom" kræver også ledsætningsordstilling og udtrykker kontrast.'
            }
        },
        {
            tag: 'Gåde 3 • Én gang i fortiden',
            prompt: 'Vi taler om en bestemt begivenhed i fortiden (sidste år, da jeg fyldte 30 år):',
            quote: '"______ jeg fyldte 30 år sidste sommer, holdt vi en stor fest i haven."',
            options: ['Da', 'Når', 'Mens'],
            correct: 'Da',
            explanations: {
                'Da': '🌟 Præcis! Man fylder kun 30 år én gang i fortiden – derfor bruger vi "Da"!',
                'Når': '"Når" bruges kun om nutid, fremtid eller gentagne vaner ("hver gang").',
                'Mens': '"Mens" bruges om to handlinger, der varer ved samtidig.'
            }
        },
        {
            tag: 'Gåde 4 • Vane / Hver gang',
            prompt: 'Her beskriver vi en fast vane, der gentager sig hver eneste morgen:',
            quote: '"______ jeg vågner om morgenen, starter jeg altid med en kop varm kaffe."',
            options: ['Når', 'Da', 'Indtil'],
            correct: 'Når',
            explanations: {
                'Når': '🌟 Lige i øjet! Når noget sker "hver gang" (en vane), bruger vi altid "Når"!',
                'Da': '"Da" bruges kun om én enkeltstående gang i fortiden.',
                'Indtil': '"Indtil" betyder "frem til det tidspunkt hvor".'
            }
        },
        {
            tag: 'Gåde 5 • Fakta vs. Spørgsmål/Tvivl',
            prompt: 'Mette er i tvivl og stiller et indirekte ja/nej-spørgsmål:',
            quote: '"Jeg har glemt mit ur. Ved du, ______ bussen allerede er kørt?"',
            options: ['om', 'at', 'hvis'],
            correct: 'om',
            explanations: {
                'om': '🌟 Korrekt! Efter "Ved du..." eller "Jeg ved ikke..." bruger man altid "om" ("whether/if") ved spørgsmål og usikkerhed.',
                'at': '"At" bruges kun, når man konstaterer et sikkert faktum ("Jeg ved, at bussen er kørt").',
                'hvis': 'På dansk kan man IKKE bruge "hvis" efter "ved ikke" (modsat engelsk "if"). Her skal man bruge "om"!'
            }
        },
        {
            tag: 'Gåde 6 • Ingen inversion ved resultat!',
            prompt: 'Se på ordstillingen efter kommaet: Subjektet ("vi") står FØR verbet ("bestilte"). Hvilket ord for resultat passer?',
            quote: '"Køleskabet var helt tomt i aftes, ______ vi bestilte pizza."',
            options: ['så', 'fordi', 'selvom'],
            correct: 'så',
            explanations: {
                'så': '🌟 Rigtigt! Konjunktionen "så" giver resultatet i en helsætning uden inversion ("..., så vi bestilte pizza").',
                'fordi': 'Pizzaen var resultatet, ikke årsagen til at køleskabet var tomt.',
                'selvom': 'Der er ingen modsætning mellem tomt køleskab og at bestille mad.'
            }
        },
        {
            tag: 'Gåde 7 • Kontrast i ledsætning ("ikke" før verbet)',
            prompt: 'Se på ordstillingen: "ikke" står FØR verbet ("ikke havde"). Hvilket kontrast-ord skal vi vælge?',
            quote: '"Han bestod køreprøven i første forsøg, ______ han ikke havde øvet sig særlig meget."',
            options: ['selvom', 'men', 'hvis'],
            correct: 'selvom',
            explanations: {
                'selvom': '🌟 Perfekt! Både betydningen (på trods af) og ledsætningsordstillingen ("ikke havde") peger direkte på "selvom"!',
                'men': '"Men" er en helsætningskonjunktion og ville kræve "..., men han havde ikke øvet sig".',
                'hvis': '"Hvis" udtrykker en betingelse, ikke "på trods af".'
            }
        },
        {
            tag: 'Gåde 8 • Samtidighed i køkkenet',
            prompt: 'To handlinger foregår på nøjagtig samme tidspunkt:',
            quote: '"Kan du dække bordet i stuen, ______ jeg steger frikadellerne færdige?"',
            options: ['mens', 'inden', 'siden'],
            correct: 'mens',
            explanations: {
                'mens': '🌟 Korrekt! "Mens" ("while") binder to samtidige handlinger sammen.',
                'inden': '"Inden" betyder "før".',
                'siden': '"Siden" peger tilbage til et startpunkt i fortiden.'
            }
        },
        {
            tag: 'Gåde 9 • Slutpunkt i tid',
            prompt: 'Vi bliver indenfor, lige frem til det tidspunkt hvor stormen lægger sig:',
            quote: '"Vi bliver herinde i sommerhuset, ______ stormen er drevet over."',
            options: ['indtil', 'så snart', 'mens'],
            correct: 'indtil',
            explanations: {
                'indtil': '🌟 Rigtigt! "Indtil" ("until") markerer slutpunktet for, hvor længe vi venter.',
                'så snart': '"Så snart" betyder "i samme sekund som".',
                'mens': '"Mens" fokuserer på sideløbende varighed uden slutgrænse.'
            }
        },
        {
            tag: 'Gåde 10 • Betingelse i forfeltet',
            prompt: 'Sætningen opstiller en betingelse for at få rabat:',
            quote: '"______ du bestiller billetterne på nettet, sparer du 20 procent."',
            options: ['Hvis', 'Om', 'Selvom'],
            correct: 'Hvis',
            explanations: {
                'Hvis': '🌟 Lige i skabet! "Hvis" udtrykker en betingelse ("på den betingelse at...").',
                'Om': '"Om" bruges kun til spørgende ledsætninger ("Jeg spurgte, om...").',
                'Selvom': '"Selvom" betyder "på trods af".'
            }
        }
    ];

    let detektivIdx = 0;
    let detektivScore = 0;

    function renderTabDetektiv(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'detektiv-container';

        if (detektivIdx >= DETEKTIV_RIDDLES.length) {
            container.innerHTML = `
                <div class="score-celebration-card">
                    <div style="font-size:3.5rem; margin-bottom:1rem;">🕵️‍♀️🏆</div>
                    <h2 style="color:#6ee7b7; font-size:2rem; margin-bottom:0.5rem;">Konjunktions-Detektiven Gennemført!</h2>
                    <p style="font-size:1.2rem; color:#cbd5e1; margin-bottom:1.5rem;">
                        Du løste <strong>${detektivScore} ud af ${DETEKTIV_RIDDLES.length}</strong> gåder om konjunktioner og ordstilling!
                    </p>
                    <button class="action-btn-primary" id="restart-detektiv">🔄 Prøv gåderne igen</button>
                </div>
            `;
            parent.appendChild(container);
            container.querySelector('#restart-detektiv').onclick = () => {
                detektivIdx = 0;
                detektivScore = 0;
                renderTabDetektiv(parent);
            };
            return;
        }

        const r = DETEKTIV_RIDDLES[detektivIdx];
        const pct = Math.round((detektivIdx / DETEKTIV_RIDDLES.length) * 100);

        container.innerHTML = `
            <div class="progress-header">
                <span>🔍 KONJUNKTIONS-DETEKTIVEN: GÅDE ${detektivIdx + 1} AF ${DETEKTIV_RIDDLES.length}</span>
                <span>Score: ${detektivScore} / ${detektivIdx}</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>

            <div class="detektiv-card">
                <div class="detektiv-context-tag">${r.tag}</div>
                <div class="detektiv-prompt-text">${r.prompt}</div>
                <div class="detektiv-sentence-quote" id="det-quote">${r.quote}</div>

                <div class="detektiv-options-grid" id="det-opts"></div>
                <div class="detektiv-feedback-box" id="det-feedback"></div>

                <div style="text-align:right; margin-top:1.5rem; display:none;" id="det-next-wrap">
                    <button class="action-btn-primary" id="det-next-btn">Næste gåde ➔</button>
                </div>
            </div>
        `;

        const optsGrid = container.querySelector('#det-opts');
        const fbBox = container.querySelector('#det-feedback');
        const nextWrap = container.querySelector('#det-next-wrap');
        let answered = false;

        r.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-opt-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                if (answered) return;
                const isCorrect = opt === r.correct;
                if (isCorrect) {
                    answered = true;
                    detektivScore++;
                    btn.classList.add('correct');
                    const filledQuote = r.quote.replace('______', `<span style="color:#4ade80; text-decoration:underline;">${opt}</span>`);
                    container.querySelector('#det-quote').innerHTML = filledQuote;
                    fbBox.className = 'detektiv-feedback-box show correct';
                    fbBox.innerHTML = `<strong>${r.explanations[opt]}</strong>`;
                    nextWrap.style.display = 'block';
                    speakDanish(r.quote.replace('______', opt).replace(/"/g, ''));
                } else {
                    btn.classList.add('wrong');
                    fbBox.className = 'detektiv-feedback-box show wrong';
                    fbBox.innerHTML = `<strong>Prøv igen:</strong> ${r.explanations[opt]}`;
                }
            };
            optsGrid.appendChild(btn);
        });

        container.querySelector('#det-next-btn').onclick = () => {
            detektivIdx++;
            renderTabDetektiv(parent);
        };

        parent.appendChild(container);
    }

    // ==========================================
    // TAB 4: SÆTNINGSBYGGEREN & PUSLESPILLET
    // ==========================================
    const BUILDER_EXERCISES = [
        {
            modeLabel: '🔵 Model A: Ledsætning med "fordi" (IKKE før Verbet!)',
            context: 'Byg ledsætningen efter "Han bliver hjemme," (Husk: i en ledsætning står "ikke" FØR verbet!)',
            displayTemplate: 'Han bliver hjemme, [BLANK] han ikke er rask.',
            options: ['fordi', 'for', 'men'],
            correctWord: 'fordi',
            step1Explain: 'Rigtigt! "Fordi" indleder en ledsætning, så i Trin 2 skal "ikke" stå FØR verbet ("er")!',
            slots: [
                { role: 'konj', label: '1. Ledsætningskonj.', expected: 'fordi' },
                { role: 'subjekt', label: '2. Subjekt', expected: 'han' },
                { role: 'adverbium', label: '3. Adverbium (FØR!)', expected: 'ikke' },
                { role: 'verbum', label: '4. Verbum + Rest', expected: 'er rask.' }
            ]
        },
        {
            modeLabel: '🟢 Model B: Helsætning med "for" (IKKE efter Verbet!)',
            context: 'Byg helsætningen efter "Han bliver hjemme," med "for" (Husk: i en helsætning står verbet FØR "ikke"!)',
            displayTemplate: 'Han bliver hjemme, [BLANK] han er ikke rask.',
            options: ['for', 'fordi', 'selvom'],
            correctWord: 'for',
            step1Explain: 'Flot! "For" er en helsætningskonjunktion, så verbet ("er") kommer FØR "ikke"!',
            slots: [
                { role: 'konj', label: '1. Helsætningskonj.', expected: 'for' },
                { role: 'subjekt', label: '2. Subjekt', expected: 'han' },
                { role: 'verbum', label: '3. Verbum (FØR ikke!)', expected: 'er' },
                { role: 'adverbium', label: '4. Ikke + Rest', expected: 'ikke rask.' }
            ]
        },
        {
            modeLabel: '🔵 Model A: Ledsætning med "selvom" (IKKE før Verbet!)',
            context: 'Byg ledsætningen efter "De går en tur," (På trods af at solen ikke skinner)',
            displayTemplate: 'De går en tur, [BLANK] solen ikke skinner.',
            options: ['selvom', 'men', 'så'],
            correctWord: 'selvom',
            step1Explain: 'Præcis! Efter "selvom" kommer en ledsætning, hvor "ikke" står før verbet ("skinner").',
            slots: [
                { role: 'konj', label: '1. Ledsætningskonj.', expected: 'selvom' },
                { role: 'subjekt', label: '2. Subjekt', expected: 'solen' },
                { role: 'adverbium', label: '3. Adverbium (FØR!)', expected: 'ikke' },
                { role: 'verbum', label: '4. Verbum', expected: 'skinner.' }
            ]
        },
        {
            modeLabel: '🟢 Model B: Helsætning med "så" (INGEN inversion!)',
            context: 'Byg resultat-helsætningen efter "Det regner kraftigt," (Efter "så" står subjektet før verbet!)',
            displayTemplate: 'Det regner kraftigt, [BLANK] jeg tager bussen.',
            options: ['så', 'fordi', 'om'],
            correctWord: 'så',
            step1Explain: 'Korrekt! Efter helsætningskonjunktionen "så" er der INGEN inversion: Subjekt ("jeg") før Verbum ("tager")!',
            slots: [
                { role: 'konj', label: '1. Helsætningskonj.', expected: 'så' },
                { role: 'subjekt', label: '2. Subjekt (Ingen inv.!)', expected: 'jeg' },
                { role: 'verbum', label: '3. Verbum', expected: 'tager' },
                { role: 'rest', label: '4. Objekt', expected: 'bussen.' }
            ]
        },
        {
            modeLabel: '🔄 Model C: Ledsætning i Forfeltet ➔ INVERSION i hovedsætningen!',
            context: 'Når ledsætningen står forrest ("Når det regner,"), skal hovedsætningens VERBUM komme før SUBJEKTET!',
            displayTemplate: '[BLANK] det regner, tager jeg bussen.',
            options: ['Når', 'For', 'Men'],
            correctWord: 'Når',
            step1Explain: 'Super! Hele ledsætningen ("Når det regner,") fylder Plads 1 (Forfeltet) – så på Plads 2 kommer verbet ("tager") før subjektet ("jeg")!',
            slots: [
                { role: 'konj', label: '1. Forfelt (Ledsætning)', expected: 'Når det regner,' },
                { role: 'verbum', label: '2. Verbum (INVERSION!)', expected: 'tager' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'jeg' },
                { role: 'rest', label: '4. Objekt', expected: 'bussen.' }
            ]
        },
        {
            modeLabel: '🔵 Model A: Ledsætning med "hvis" (IKKE før Verbet!)',
            context: 'Byg betingelsen efter "Vi tager på stranden,"',
            displayTemplate: 'Vi tager på stranden, [BLANK] det ikke regner.',
            options: ['hvis', 'eller', 'for'],
            correctWord: 'hvis',
            step1Explain: 'Rigtigt! Efter "hvis" er vi i en ledsætning, så "ikke" står før verbet ("regner").',
            slots: [
                { role: 'konj', label: '1. Ledsætningskonj.', expected: 'hvis' },
                { role: 'subjekt', label: '2. Subjekt', expected: 'det' },
                { role: 'adverbium', label: '3. Adverbium (FØR!)', expected: 'ikke' },
                { role: 'verbum', label: '4. Verbum', expected: 'regner.' }
            ]
        },
        {
            modeLabel: '🔵 Model A: Spørgende ledsætning med "om" (IKKE før Verbet!)',
            context: 'Byg ledsætningen efter "Hun ved ikke," (Tvivl/spørgsmål)',
            displayTemplate: 'Hun ved ikke, [BLANK] bussen allerede er kørt.',
            options: ['om', 'at', 'så'],
            correctWord: 'om',
            step1Explain: 'Lige i øjet! Ved tvivl bruger vi "om", og tidsadverbiet ("allerede") står FØR hjælpeverbet ("er") i ledsætningen!',
            slots: [
                { role: 'konj', label: '1. Ledsætningskonj.', expected: 'om' },
                { role: 'subjekt', label: '2. Subjekt', expected: 'bussen' },
                { role: 'adverbium', label: '3. Adverbium (FØR!)', expected: 'allerede' },
                { role: 'verbum', label: '4. Verbum', expected: 'er kørt.' }
            ]
        },
        {
            modeLabel: '🔄 Model C: Fortids-ledsætning med "Da" i Forfeltet ➔ INVERSION!',
            context: 'Én periode i fortiden ("Da jeg var barn,") står forrest i Forfeltet:',
            displayTemplate: '[BLANK] jeg var barn, boede vi i Odense.',
            options: ['Da', 'Når', 'Så'],
            correctWord: 'Da',
            step1Explain: 'Korrekt! Barndommen er én afsluttet periode i fortiden ("Da"), og efter kommaet kommer verbet ("boede") før subjektet ("vi")!',
            slots: [
                { role: 'konj', label: '1. Forfelt (Ledsætning)', expected: 'Da jeg var barn,' },
                { role: 'verbum', label: '2. Verbum (INVERSION!)', expected: 'boede' },
                { role: 'subjekt', label: '3. Subjekt', expected: 'vi' },
                { role: 'rest', label: '4. Sted', expected: 'i Odense.' }
            ]
        }
    ];

    let builderIdx = 0;
    let builderPhase = 1;
    let placedSlots = [];

    function renderTabBuilder(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'builder-container';

        if (builderIdx >= BUILDER_EXERCISES.length) {
            container.innerHTML = `
                <div class="score-celebration-card">
                    <div style="font-size:3.5rem; margin-bottom:1rem;">🧩🏆</div>
                    <h2 style="color:#6ee7b7; font-size:2rem; margin-bottom:0.5rem;">Sætningsbyggeren Gennemført!</h2>
                    <p style="font-size:1.15rem; color:#cbd5e1; margin-bottom:1.5rem;">
                        Du har styr på ordstillingen i både <strong>helsætninger</strong>, <strong>ledsætninger</strong> og når <strong>ledsætningen står forrest i Forfeltet</strong>!
                    </p>
                    <button class="action-btn-primary" id="restart-builder">🔄 Byg sætningerne igen</button>
                </div>
            `;
            parent.appendChild(container);
            container.querySelector('#restart-builder').onclick = () => {
                builderIdx = 0;
                builderPhase = 1;
                placedSlots = [];
                renderTabBuilder(parent);
            };
            return;
        }

        const ex = BUILDER_EXERCISES[builderIdx];
        const pct = Math.round((builderIdx / BUILDER_EXERCISES.length) * 100);

        const card = document.createElement('div');
        card.className = 'builder-card';

        const flowHtml = ex.slots.map((s, i) => `
            <div class="flow-step flow-${s.role}">
                <div class="flow-step-num">LED ${i + 1}</div>
                <div class="flow-step-title">${s.label.replace(/^\d+\.\s*/, '')}</div>
            </div>
        `).join('');

        const displaySentenceHtml = ex.displayTemplate.replace(
            '[BLANK]',
            builderPhase === 1
                ? `<span class="sb-blank-slot">?</span>`
                : `<span class="sb-blank-slot filled">${ex.correctWord}</span>`
        );

        card.innerHTML = `
            <div class="progress-header">
                <span>🧩 SÆTNINGSBYGGEREN: OPGAVE ${builderIdx + 1} AF ${BUILDER_EXERCISES.length}</span>
                <span>${ex.modeLabel}</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>

            <div class="flow-container">${flowHtml}</div>

            <div style="color:#a7f3d0; font-weight:700; margin-bottom:0.8rem; text-align:center;">
                ${ex.context}
            </div>

            <div class="sb-sentence-display">${displaySentenceHtml}</div>

            <div id="builder-interactive-stage"></div>
        `;

        const stage = card.querySelector('#builder-interactive-stage');

        if (builderPhase === 1) {
            stage.innerHTML = `
                <div style="text-align:center; margin-bottom:1rem;">
                    <span class="builder-step-badge">TRIN 1: VÆLG DEN RIGTIGE KONJUNKTION</span>
                </div>
                <div class="detektiv-options-grid" id="sb-step1-opts"></div>
                <div class="detektiv-feedback-box" id="sb-step1-fb"></div>
            `;

            const optsDiv = stage.querySelector('#sb-step1-opts');
            const fbDiv = stage.querySelector('#sb-step1-fb');

            ex.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'detektiv-opt-btn';
                btn.textContent = opt;
                btn.onclick = () => {
                    if (opt === ex.correctWord) {
                        btn.classList.add('correct');
                        fbDiv.className = 'detektiv-feedback-box show correct';
                        fbDiv.innerHTML = `
                            <strong>🌟 ${ex.step1Explain}</strong>
                            <div style="margin-top:1rem;">
                                <button class="action-btn-primary" id="go-step-2">Gå til Trin 2: Saml sætningsleddene 🧩 ➔</button>
                            </div>
                        `;
                        fbDiv.querySelector('#go-step-2').onclick = () => {
                            builderPhase = 2;
                            placedSlots = [];
                            renderTabBuilder(parent);
                        };
                    } else {
                        btn.classList.add('wrong');
                        fbDiv.className = 'detektiv-feedback-box show wrong';
                        fbDiv.innerHTML = `<strong>Se på ordstillingen:</strong> Er det en helsætning eller en ledsætning?`;
                    }
                };
                optsDiv.appendChild(btn);
            });
        } else {
            const currentSlotIdx = placedSlots.length;
            const isComplete = currentSlotIdx >= ex.slots.length;

            stage.innerHTML = `
                <div style="text-align:center; margin-bottom:1rem;">
                    <span class="builder-step-badge">TRIN 2: BYG SÆTNINGEN LED FOR LED</span>
                </div>
                <div class="sb-puzzle-slots" id="sb-slots-row"></div>
                <div class="sb-puzzle-chips" id="sb-chips-row"></div>
                <div class="detektiv-feedback-box" id="sb-step2-fb"></div>
            `;

            const slotsRow = stage.querySelector('#sb-slots-row');
            ex.slots.forEach((slotDef, idx) => {
                const filledVal = placedSlots[idx];
                const slotEl = document.createElement('div');
                slotEl.className = `sb-puzzle-slot slot-${slotDef.role} ${filledVal ? 'filled' : ''}`;
                slotEl.innerHTML = `
                    <div class="slot-badge-callout callout-${slotDef.role}">${slotDef.label}</div>
                    <div style="font-size:1.2rem; font-weight:900; color:${filledVal ? 'white' : '#64748b'};">
                        ${filledVal || (idx === currentSlotIdx ? 'Klik på brik 👇' : '...')}
                    </div>
                `;
                slotsRow.appendChild(slotEl);
            });

            const chipsRow = stage.querySelector('#sb-chips-row');
            const fbDiv = stage.querySelector('#sb-step2-fb');

            if (!isComplete) {
                const indices = [2, 0, 3, 1];
                indices.forEach(i => {
                    const chipWord = ex.slots[i].expected;
                    const alreadyUsed = placedSlots.includes(chipWord);
                    const chip = document.createElement('button');
                    chip.className = `sb-puzzle-chip ${alreadyUsed ? 'used' : ''}`;
                    chip.textContent = chipWord;
                    chip.onclick = () => {
                        const targetSlot = ex.slots[currentSlotIdx];
                        if (chipWord === targetSlot.expected) {
                            placedSlots.push(chipWord);
                            renderTabBuilder(parent);
                        } else {
                            fbDiv.className = 'detektiv-feedback-box show wrong';
                            fbDiv.innerHTML = `<strong>Pas på ordstillingen!</strong> På plads ${currentSlotIdx + 1} skal vi bruge <strong>${targetSlot.label}</strong>.`;
                        }
                    };
                    chipsRow.appendChild(chip);
                });
            } else {
                const fullBuilt = ex.slots.map(s => s.expected).join(' ');
                speakDanish(fullBuilt);
                fbDiv.className = 'detektiv-feedback-box show correct';
                fbDiv.innerHTML = `
                    <div style="font-size:1.2rem; font-weight:900; margin-bottom:0.4rem;">🎉 Perfekt: "${fullBuilt}"</div>
                    <p style="margin:0 0 1rem;">Du mestrede ordstillingen!</p>
                    <button class="action-btn-primary" id="next-builder-btn">Næste opgave ➔</button>
                `;
                fbDiv.querySelector('#next-builder-btn').onclick = () => {
                    builderIdx++;
                    builderPhase = 1;
                    placedSlots = [];
                    renderTabBuilder(parent);
                };
            }
        }

        container.appendChild(card);
        parent.appendChild(container);
    }

    // ==========================================
    // HELPER FOR QUIZ TABS (5, 6, 7, 8)
    // ==========================================
    function renderQuizEngine(parent, config) {
        parent.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.className = 'special-tab-container';

        if (config.introHtml) {
            const intro = document.createElement('div');
            intro.innerHTML = config.introHtml;
            wrap.appendChild(intro);
        }

        const state = config.state;
        const questions = config.questions;

        if (state.idx >= questions.length) {
            const doneCard = document.createElement('div');
            doneCard.className = 'score-celebration-card';
            doneCard.innerHTML = `
                <div style="font-size:3.5rem; margin-bottom:1rem;">🏆✨</div>
                <h2 style="color:#6ee7b7; font-size:2rem; margin-bottom:0.5rem;">${config.doneTitle}</h2>
                <p style="font-size:1.2rem; color:#cbd5e1; margin-bottom:1.5rem;">
                    Du fik <strong>${state.score} ud af ${questions.length}</strong> rigtige i første forsøg!
                </p>
                <button class="action-btn-primary" id="quiz-restart-btn">🔄 Tag opgaven igen</button>
            `;
            wrap.appendChild(doneCard);
            parent.appendChild(wrap);
            doneCard.querySelector('#quiz-restart-btn').onclick = () => {
                state.idx = 0;
                state.score = 0;
                renderQuizEngine(parent, config);
            };
            return;
        }

        const q = questions[state.idx];
        const pct = Math.round((state.idx / questions.length) * 100);

        const card = document.createElement('div');
        card.className = 'exercise-action-card';
        card.innerHTML = `
            <div class="progress-header">
                <span>${config.progressLabel}: ${state.idx + 1} AF ${questions.length}</span>
                <span>Score: ${state.score} / ${state.idx}</span>
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>

            ${q.context ? `<div class="detektiv-context-tag">${q.context}</div>` : ''}
            <div class="exercise-dialog-quote" id="quiz-quote-box">${q.quote}</div>

            <div class="detektiv-options-grid" id="quiz-opts-grid"></div>
            <div class="detektiv-feedback-box" id="quiz-fb-box"></div>

            <div style="text-align:right; margin-top:1.5rem; display:none;" id="quiz-next-wrap">
                <button class="action-btn-primary" id="quiz-next-btn">Næste opgave ➔</button>
            </div>
        `;

        const optsGrid = card.querySelector('#quiz-opts-grid');
        const fbBox = card.querySelector('#quiz-fb-box');
        const nextWrap = card.querySelector('#quiz-next-wrap');
        let firstAttempt = true;
        let solved = false;

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detektiv-opt-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                if (solved) return;
                if (opt === q.correct) {
                    solved = true;
                    if (firstAttempt) state.score++;
                    btn.classList.add('correct');
                    card.querySelector('#quiz-quote-box').innerHTML = q.quote.replace(
                        '______',
                        `<span style="color:#4ade80; text-decoration:underline; font-weight:900;">${opt}</span>`
                    );
                    fbBox.className = 'detektiv-feedback-box show correct';
                    fbBox.innerHTML = `<strong>🌟 Korrekt!</strong> ${q.explanation}`;
                    nextWrap.style.display = 'block';
                    const spoken = q.quote.replace('______', opt).replace(/<[^>]+>/g, '');
                    speakDanish(spoken);
                } else {
                    firstAttempt = false;
                    btn.classList.add('wrong');
                    fbBox.className = 'detektiv-feedback-box show wrong';
                    fbBox.innerHTML = `<strong>Prøv igen:</strong> ${q.wrongHint || q.explanation}`;
                }
            };
            optsGrid.appendChild(btn);
        });

        card.querySelector('#quiz-next-btn').onclick = () => {
            state.idx++;
            renderQuizEngine(parent, config);
        };

        wrap.appendChild(card);
        parent.appendChild(wrap);
    }

    // ==========================================
    // TAB 5: KONTEKST-TESTEN (14 DIALOGER)
    // ==========================================
    const kontekstState = { idx: 0, score: 0 };
    const KONTEKST_QUESTIONS = [
        {
            context: '1/14 • Café-valg',
            quote: '<strong>Barista:</strong> "Hvad kan jeg byde på? Vil du have en kop sort kaffe, ______ foretrækker du en caffe latte?"',
            options: ['eller', 'men', 'for'],
            correct: 'eller',
            explanation: '"Eller" giver et valg mellem to alternativer.'
        },
        {
            context: '2/14 • Årsag i helsætning ("har ikke")',
            quote: '<strong>A:</strong> "Går du med i kantinen?"<br><strong>B:</strong> "Nej tak, ______ jeg har ikke spist min madpakke endnu."',
            options: ['for', 'fordi', 'selvom'],
            correct: 'for',
            explanation: 'Ordstillingen er "jeg har ikke" (ikke står EFTER verbet) ➔ derfor er det helsætningskonjunktionen "for"!'
        },
        {
            context: '3/14 • Årsag i ledsætning ("ikke har")',
            quote: '<strong>A:</strong> "Hvorfor tager du en jakke på?"<br><strong>B:</strong> "Jeg tager jakke på, ______ radiatoren ikke virker på kontoret."',
            options: ['fordi', 'for', 'så'],
            correct: 'fordi',
            explanation: 'Ordstillingen er "radiatoren ikke virker" (ikke står FØR verbet) ➔ derfor er det ledsætningskonjunktionen "fordi"!'
        },
        {
            context: '4/14 • Resultat uden inversion',
            quote: '<strong>A:</strong> "Nåede du morgentoget?"<br><strong>B:</strong> "Nej, mit vækkeur ringede ikke, ______ jeg kom tyve minutter for sent."',
            options: ['så', 'fordi', 'selvom'],
            correct: 'så',
            explanation: '"Så" viser resultatet i en helsætning uden inversion ("..., så jeg kom...").'
        },
        {
            context: '5/14 • På trods af regnvejr',
            quote: '<strong>A:</strong> "Spillede I fodbold i går?"<br><strong>B:</strong> "Ja, vi spillede hele kampen færdig, ______ det øsregnede!"',
            options: ['selvom', 'hvis', 'fordi'],
            correct: 'selvom',
            explanation: '"Selvom" udtrykker, at kampen blev spillet på trods af regnvejret.'
        },
        {
            context: '6/14 • Betingelse for picnic',
            quote: '<strong>A:</strong> "Skal vi spise frokost i parken i morgen?"<br><strong>B:</strong> "Ja, vi tager tæppe med, ______ det ikke blæser for meget."',
            options: ['hvis', 'om', 'da'],
            correct: 'hvis',
            explanation: '"Hvis" opstiller betingelsen for udflugten (og har "ikke" før verbet: "hvis det ikke blæser").'
        },
        {
            context: '7/14 • Indirekte spørgsmål / tvivl',
            quote: '<strong>A:</strong> "Er pakken kommet?"<br><strong>B:</strong> "Jeg ved endnu ikke, ______ postbuddet har været her i dag."',
            options: ['om', 'at', 'hvis'],
            correct: 'om',
            explanation: 'Efter "Jeg ved ikke..." bruger man altid "om" for at udtrykke tvivl/spørgsmål.'
        },
        {
            context: '8/14 • Sikker viden / fakta',
            quote: '<strong>A:</strong> "Kommer chefen til mødet?"<br><strong>B:</strong> "Ja, hun skrev lige i morges, ______ hun kommer klokken 10."',
            options: ['at', 'om', 'hvis'],
            correct: 'at',
            explanation: 'Her gengiver vi en sikker besked ("skrev, at...").'
        },
        {
            context: '9/14 • Én gang i fortiden',
            quote: '<strong>A:</strong> "Hvor lærte du at tale så godt spansk?"<br><strong>B:</strong> "Det lærte jeg, ______ jeg boede i Madrid i 2019."',
            options: ['da', 'når', 'så snart'],
            correct: 'da',
            explanation: 'Opholdet i Madrid i 2019 er en afsluttet periode i fortiden ➔ "da".'
        },
        {
            context: '10/14 • Fremtid eller fast vane',
            quote: '<strong>A:</strong> "Hvornår holder du ferie?"<br><strong>B:</strong> "Jeg tager på ferie, ______ vi har afsluttet det store projekt i næste måned."',
            options: ['når', 'da', 'siden'],
            correct: 'når',
            explanation: 'Om fremtiden ("i næste måned") bruger man altid "når" – aldrig "da"!'
        },
        {
            context: '11/14 • To ting samtidig',
            quote: '<strong>A:</strong> "Hvornår hører du lydbøger?"<br><strong>B:</strong> "Jeg plejer at høre lydbog, ______ jeg cykler til og fra arbejde."',
            options: ['mens', 'inden', 'indtil'],
            correct: 'mens',
            explanation: '"Mens" viser, at lydbogen og cykelturen foregår samtidig.'
        },
        {
            context: '12/14 • Husk før afgang',
            quote: '<strong>A:</strong> "Er vi klar til at køre i sommerhus?"<br><strong>B:</strong> "Ja, men vi skal lige lukke alle vinduer, ______ vi låser døren."',
            options: ['inden', 'mens', 'siden'],
            correct: 'inden',
            explanation: 'Vinduerne skal lukkes FØR vi låser døren ➔ "inden".'
        },
        {
            context: '13/14 • Fra fortid til nu',
            quote: '<strong>A:</strong> "Taler I ofte sammen?"<br><strong>B:</strong> "Ja, vi har været bedste venner, ______ vi gik i folkeskole sammen."',
            options: ['siden', 'indtil', 'når'],
            correct: 'siden',
            explanation: '"Siden" forbinder startpunktet i fortiden ("gik i folkeskole") med nutiden ("har været venner").'
        },
        {
            context: '14/14 • Straks ved ankomst',
            quote: '<strong>A:</strong> "Hvornår giver du besked?"<br><strong>B:</strong> "Jeg sender dig en sms, ______ jeg har fået svar fra lægen!"',
            options: ['så snart', 'indtil', 'mens'],
            correct: 'så snart',
            explanation: '"Så snart" ("as soon as") betyder i samme øjeblik, som svaret kommer.'
        }
    ];

    function renderTabKontekst(parent) {
        renderQuizEngine(parent, {
            state: kontekstState,
            questions: KONTEKST_QUESTIONS,
            progressLabel: '🎯 KONTEKST-TESTEN',
            doneTitle: 'Kontekst-testen gennemført!'
        });
    }

    // ==========================================
    // TAB 6: DA ELLER NÅR? & TIDSKONJUNKTIONER (8 ØVELSER)
    // ==========================================
    const tidState = { idx: 0, score: 0 };
    const TID_QUESTIONS = [
        {
            context: '1/8 • Fortid (Én gang) vs. Nutid/Fremtid/Vane',
            quote: '"______ jeg kom hjem fra arbejde i går aftes, stod der en pakke foran døren."',
            options: ['Da', 'Når', 'Mens'],
            correct: 'Da',
            explanation: '"I går aftes" er én bestemt gang i fortiden ➔ "Da"!'
        },
        {
            context: '2/8 • Fortid (Én gang) vs. Fremtid',
            quote: '"______ jeg kommer hjem fra arbejde i aften, vil jeg lave en stor gryde suppe."',
            options: ['Når', 'Da', 'Siden'],
            correct: 'Når',
            explanation: '"I aften" ligger i fremtiden ➔ om fremtid bruger man ALTID "Når"!'
        },
        {
            context: '3/8 • Gentagen vane i fortiden ("Altid når...")',
            quote: '"Altid ______ vi besøgte mine bedsteforældre om sommeren, fik vi hjemmelavet jordbæris."',
            options: ['når', 'da', 'indtil'],
            correct: 'når',
            explanation: 'PAS PÅ! Selvom det er i fortiden ("besøgte"), skete det HVER GANG ("Altid når..."). Ved gentagne vaner bruger man "når"!'
        },
        {
            context: '4/8 • Én historisk periode i fortiden',
            quote: '"______ mine bedsteforældre var unge, fandtes der hverken internet eller mobiltelefoner."',
            options: ['Da', 'Når', 'Så snart'],
            correct: 'Da',
            explanation: 'Bedsteforældrene var kun unge i én sammenhængende periode i fortiden ➔ "Da".'
        },
        {
            context: '5/8 • Samtidighed vs. Før',
            quote: '"Husk at vaske hænder grundigt, ______ du begynder at skære grøntsagerne."',
            options: ['inden', 'mens', 'indtil'],
            correct: 'inden',
            explanation: 'Man skal vaske hænder FØR man rører ved maden ➔ "inden".'
        },
        {
            context: '6/8 • Samtidighed',
            quote: '"Børnene legede stille på gulvet, ______ forældrene drak formiddagskaffe."',
            options: ['mens', 'inden', 'efter at'],
            correct: 'mens',
            explanation: 'Legen og kaffen foregik sideløbende på samme tid ➔ "mens".'
        },
        {
            context: '7/8 • Slutpunkt (Ventetid)',
            quote: '"Du må blive siddende i venteværelset, ______ lægen kalder dit navn."',
            options: ['indtil', 'siden', 'mens'],
            correct: 'indtil',
            explanation: 'Ventetiden slutter i det øjeblik lægen kalder ➔ "indtil".'
        },
        {
            context: '8/8 • Efter en afsluttet handling',
            quote: '"Han følte sig meget mere frisk, ______ han havde sovet i otte timer."',
            options: ['efter at', 'inden', 'indtil'],
            correct: 'efter at',
            explanation: 'Først sov han i otte timer, og bagefter følte han sig frisk ➔ "efter at".'
        }
    ];

    function renderTabTid(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>⏳ Da eller når? og tidskonjunktioner</h2>
                <p>Lær den berømte danske forskel på <strong>da</strong> (én gang i fortiden) og <strong>når</strong> (nutid, fremtid og "hver gang"-vaner) samt tidsrækkefølge med <em>mens, inden, efter at, siden, indtil</em>.</p>
            </div>
            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color:#f59e0b;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#fbbf24;">📸 da</span>
                        <span class="special-rule-role" style="background:rgba(245,158,11,0.2); color:#fde68a;">Én gang i fortiden</span>
                    </div>
                    <div class="special-rule-desc">Bruges KUN om en enkeltstående begivenhed eller én afsluttet periode i fortiden.</div>
                    <div class="special-rule-example" style="border-color:#f59e0b;">
                        "<strong>Da</strong> jeg var barn..." / "<strong>Da</strong> jeg kom hjem i går..."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#10b981;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#34d399;">🔄 når</span>
                        <span class="special-rule-role" style="background:rgba(16,185,129,0.2); color:#a7f3d0;">Fremtid & Hver gang</span>
                    </div>
                    <div class="special-rule-desc">Bruges om 1) <strong>Fremtid</strong> og 2) <strong>Gentagelse/vane</strong> ("hver gang" – både i nutid og fortid!).</div>
                    <div class="special-rule-example" style="border-color:#10b981;">
                        "<strong>Når</strong> det bliver sommer..." / "Altid <strong>når</strong> det regner..."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#06b6d4;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#22d3ee;">🎧 mens</span>
                        <span class="special-rule-role" style="background:rgba(6,182,212,0.2); color:#67e8f9;">Samtidighed</span>
                    </div>
                    <div class="special-rule-desc">To handlinger foregår sideløbende på samme tid.</div>
                    <div class="special-rule-example" style="border-color:#06b6d4;">
                        "Han hører musik, <strong>mens</strong> han laver mad."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#a855f7;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#c084fc;">🔑 inden / efter at / indtil</span>
                        <span class="special-rule-role" style="background:rgba(168,85,247,0.2); color:#d8b4fe;">Rækkefølge</span>
                    </div>
                    <div class="special-rule-desc"><strong>Inden</strong> = før. <strong>Efter at</strong> = bagefter. <strong>Indtil</strong> = frem til slutpunktet.</div>
                    <div class="special-rule-example" style="border-color:#a855f7;">
                        "Lås døren, <strong>inden</strong> du går."
                    </div>
                </div>
            </div>
        `;

        renderQuizEngine(parent, {
            introHtml,
            state: tidState,
            questions: TID_QUESTIONS,
            progressLabel: '⏳ DA ELLER NÅR & TID',
            doneTitle: 'Tidskonjunktionerne mestret!'
        });
    }

    // ==========================================
    // TAB 7: FORDI, FOR, SÅ ELLER DERFOR? (8 ØVELSER)
    // ==========================================
    const aarsagState = { idx: 0, score: 0 };
    const AARSAG_QUESTIONS = [
        {
            context: '1/8 • Kig på "ikke" + Årsag',
            quote: '"Vi spiser indendørs i aften, ______ det ikke er varmt nok på terrassen."',
            options: ['fordi', 'for', 'så', 'derfor'],
            correct: 'fordi',
            explanation: 'Sætning 2 er ÅRSAGEN, og "ikke" står FØR verbet ("det ikke er") ➔ Ledsætning med "fordi"!'
        },
        {
            context: '2/8 • Kig på "ikke" + Årsag',
            quote: '"Vi spiser indendørs i aften, ______ det er ikke varmt nok på terrassen."',
            options: ['for', 'fordi', 'så', 'derfor'],
            correct: 'for',
            explanation: 'Sætning 2 er ÅRSAGEN, men nu står "ikke" EFTER verbet ("det er ikke") ➔ Helsætning med "for"!'
        },
        {
            context: '3/8 • Resultat UDEN inversion (Subjekt før Verbum)',
            quote: '"Det er ikke varmt nok på terrassen, ______ vi spiser indendørs i aften."',
            options: ['så', 'derfor', 'fordi', 'for'],
            correct: 'så',
            explanation: 'Sætning 2 er RESULTATET, og subjektet ("vi") står FØR verbet ("spiser") ➔ Helsætningskonjunktionen "så"!'
        },
        {
            context: '4/8 • Resultat MED inversion (Verbum før Subjekt)',
            quote: '"Det er ikke varmt nok på terrassen. ______ spiser vi indendørs i aften."',
            options: ['Derfor', 'Så', 'Fordi', 'For'],
            correct: 'Derfor',
            explanation: 'Sætning 2 er RESULTATET, og verbet ("spiser") står FØR subjektet ("vi") ➔ Konnektivt adverbium "Derfor"!'
        },
        {
            context: '5/8 • Adverbium ("aldrig") FØR verbet',
            quote: '"Han kender ikke vejen til museet, ______ han aldrig har besøgt byen før."',
            options: ['fordi', 'for', 'så', 'derfor'],
            correct: 'fordi',
            explanation: 'Tidsadverbiet "aldrig" står FØR hjælpeverbet ("aldrig har") ➔ Ledsætning med "fordi"!'
        },
        {
            context: '6/8 • Adverbium ("aldrig") EFTER verbet',
            quote: '"Han kender ikke vejen til museet, ______ han har aldrig besøgt byen før."',
            options: ['for', 'fordi', 'så', 'derfor'],
            correct: 'for',
            explanation: 'Hjælpeverbet står FØR "aldrig" ("har aldrig") ➔ Helsætning med "for"!'
        },
        {
            context: '7/8 • Resultat uden inversion',
            quote: '"Batteriet på min telefon var fladt, ______ jeg kunne ikke ringe til dig."',
            options: ['så', 'derfor', 'fordi', 'for'],
            correct: 'så',
            explanation: 'Efter kommaet står "jeg kunne" (Subjekt før Verbum = ingen inversion) ➔ "så"!'
        },
        {
            context: '8/8 • Resultat med inversion',
            quote: '"Batteriet på min telefon var fladt, og ______ kunne jeg ikke ringe til dig."',
            options: ['derfor', 'så', 'fordi', 'for'],
            correct: 'derfor',
            explanation: 'Her står verbet før subjektet ("kunne jeg" = inversion) ➔ "derfor"!'
        }
    ];

    function renderTabAarsag(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>⚡ Fordi, for, så eller derfor?</h2>
                <p>Løs den klassiske udfordring ved at tjekke to ting: 1) Er sætning 2 en <strong>årsag</strong> eller et <strong>resultat</strong>? 2) Hvordan er <strong>ordstillingen</strong>?</p>
            </div>
            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color:#06b6d4;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#22d3ee;">🔵 fordi</span>
                        <span class="special-rule-role" style="background:rgba(6,182,212,0.2); color:#67e8f9;">Årsag + IKKE før V</span>
                    </div>
                    <div class="special-rule-desc">Ledsætning: Subjekt + <strong>ikke/aldrig</strong> + Verbum.</div>
                    <div class="special-rule-example" style="border-color:#06b6d4;">
                        "... <strong>fordi</strong> jeg <span style="color:#22d3ee;">ikke</span> <span style="color:#fca5a5;">har</span> tid."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#22c55e;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#4ade80;">🟢 for</span>
                        <span class="special-rule-role" style="background:rgba(34,197,94,0.2); color:#86efac;">Årsag + V før IKKE</span>
                    </div>
                    <div class="special-rule-desc">Helsætning: Subjekt + Verbum + <strong>ikke/aldrig</strong>.</div>
                    <div class="special-rule-example" style="border-color:#22c55e;">
                        "... <strong>for</strong> jeg <span style="color:#fca5a5;">har</span> <span style="color:#22d3ee;">ikke</span> tid."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#a855f7;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#c084fc;">🟣 så</span>
                        <span class="special-rule-role" style="background:rgba(168,85,247,0.2); color:#d8b4fe;">Resultat UDEN inv.</span>
                    </div>
                    <div class="special-rule-desc">Helsætningskonjunktion: <strong>Subjekt + Verbum</strong>.</div>
                    <div class="special-rule-example" style="border-color:#a855f7;">
                        "... <strong>så</strong> <span style="color:#86efac;">jeg</span> <span style="color:#fca5a5;">tager</span> bussen."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#eab308;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#fde047;">🟡 derfor</span>
                        <span class="special-rule-role" style="background:rgba(234,179,8,0.2); color:#fef08a;">Resultat MED inv.</span>
                    </div>
                    <div class="special-rule-desc">Konnektivt adverbium (Felt 7): <strong>Verbum + Subjekt</strong>!</div>
                    <div class="special-rule-example" style="border-color:#eab308;">
                        "<strong>Derfor</strong> <span style="color:#fca5a5;">tager</span> <span style="color:#86efac;">jeg</span> bussen."
                    </div>
                </div>
            </div>
        `;

        renderQuizEngine(parent, {
            introHtml,
            state: aarsagState,
            questions: AARSAG_QUESTIONS,
            progressLabel: '⚡ FORDI, FOR, SÅ ELLER DERFOR',
            doneTitle: 'Årsag og ordstilling mestret!'
        });
    }

    // ==========================================
    // TAB 8: AT ELLER OM? & HVIS ELLER SELVOM? (10 ØVELSER)
    // ==========================================
    const atomState = { idx: 0, score: 0 };
    const ATOM_QUESTIONS = [
        {
            context: '1/10 • Fakta (at) vs. Tvivl/Spørgsmål (om)',
            quote: '"Jeg er helt sikker på, ______ mødet starter klokken 9:00."',
            options: ['at', 'om', 'hvis'],
            correct: 'at',
            explanation: 'Når man er sikker og konstaterer et faktum, bruger man altid "at"!'
        },
        {
            context: '2/10 • Fakta (at) vs. Tvivl/Spørgsmål (om)',
            quote: '"Jeg kan desværre ikke huske, ______ mødet starter klokken 9:00 eller 9:30."',
            options: ['om', 'at', 'hvis'],
            correct: 'om',
            explanation: 'Når man ikke kan huske det og er i tvivl mellem muligheder, bruger man "om"!'
        },
        {
            context: '3/10 • Engelsk "if"-fælde: Spørgsmål vs. Betingelse',
            quote: '"Turisten spurgte mig på gaden, ______ jeg talte engelsk."',
            options: ['om', 'hvis', 'at'],
            correct: 'om',
            explanation: 'PAS PÅ ENGELSK "IF"! Efter "spurgte" er det et indirekte ja/nej-spørgsmål ("whether"), og på dansk hedder det ALTID "om" – aldrig "hvis"!'
        },
        {
            context: '4/10 • Ægte betingelse',
            quote: '"Du må meget gerne låne min cykel i morgen, ______ du passer godt på den."',
            options: ['hvis', 'om', 'selvom'],
            correct: 'hvis',
            explanation: 'Her er det en ægte betingelse ("på den betingelse at du passer på den") ➔ "hvis"!'
        },
        {
            context: '5/10 • Betingelse (hvis) vs. Trods (selvom)',
            quote: '"Vi gennemfører udendørskoncerten i aften, ______ det begynder at regne!"',
            options: ['selvom', 'hvis', 'om'],
            correct: 'selvom',
            explanation: 'Koncerten gennemføres PÅ TRODS AF regn ➔ "selvom"!'
        },
        {
            context: '6/10 • Betingelse (hvis) vs. Trods (selvom)',
            quote: '"Vi aflyser udendørskoncerten i aften, ______ det begynder at tordne og lyne."',
            options: ['hvis', 'selvom', 'at'],
            correct: 'hvis',
            explanation: 'Tordenvejr er betingelsen, der udløser en aflysning ➔ "hvis"!'
        },
        {
            context: '7/10 • Kontrast i helsætning (men) vs. ledsætning (selvom)',
            quote: '"Kagen så lidt mærkelig ud, ______ den smagte faktisk helt vidunderligt!"',
            options: ['men', 'selvom', 'hvis'],
            correct: 'men',
            explanation: 'Se på ordstillingen: "den smagte faktisk" ("faktisk" står EFTER verbet = helsætning) ➔ "men"!'
        },
        {
            context: '8/10 • Kontrast i ledsætning ("faktisk" FØR verbet)',
            quote: '"Han klagede over maden, ______ den faktisk smagte helt vidunderligt!"',
            options: ['selvom', 'men', 'for'],
            correct: 'selvom',
            explanation: 'Se på ordstillingen: "den faktisk smagte" ("faktisk" står FØR verbet = ledsætning) ➔ "selvom"!'
        },
        {
            context: '9/10 • Undersøge et åbent spørgsmål',
            quote: '"Lad os kigge i kalenderen og tjekke, ______ vi har fri i den weekend."',
            options: ['om', 'at', 'hvis'],
            correct: 'om',
            explanation: 'Efter "tjekke / undersøge / se" (når svaret er ja eller nej) bruger man "om"!'
        },
        {
            context: '10/10 • Sansning og konstatering',
            quote: '"Jeg kan tydeligt se på dit store smil, ______ du har fået det nye job!"',
            options: ['at', 'om', 'hvis'],
            correct: 'at',
            explanation: 'Når man tydeligt kan se et faktum, bruger man "at"!'
        }
    ];

    function renderTabAtOm(parent) {
        const introHtml = `
            <div class="special-intro-box">
                <h2>🧭 At eller om? og hvis eller selvom?</h2>
                <p>Undgå de klassiske fælder mellem fakta (<em>at</em>), spørgende tvivl (<em>om</em>), betingelse (<em>hvis</em>) og modstand (<em>selvom</em>).</p>
            </div>
            <div class="special-rule-cards-grid">
                <div class="special-rule-card" style="border-color:#22c55e;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#4ade80;">✅ at</span>
                        <span class="special-rule-role" style="background:rgba(34,197,94,0.2); color:#86efac;">Fakta & Udsagn</span>
                    </div>
                    <div class="special-rule-desc">Bruges når noget præsenteres som viden, udsagn eller mening (<em>sige, vide, tro, se at...</em>).</div>
                    <div class="special-rule-example" style="border-color:#22c55e;">
                        "Jeg ved, <strong>at</strong> han kommer."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#06b6d4;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#22d3ee;">❓ om</span>
                        <span class="special-rule-role" style="background:rgba(6,182,212,0.2); color:#67e8f9;">Tvivl & Ja/Nej-spørgsmål</span>
                    </div>
                    <div class="special-rule-desc">Bruges ved usikkerhed og indirekte spørgsmål (<em>spørge, ikke vide, tjekke om...</em>).</div>
                    <div class="special-rule-example" style="border-color:#06b6d4;">
                        "Jeg ved ikke, <strong>om</strong> han kommer."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#eab308;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#fde047;">🔑 hvis</span>
                        <span class="special-rule-role" style="background:rgba(234,179,8,0.2); color:#fef08a;">Betingelse</span>
                    </div>
                    <div class="special-rule-desc">Opstiller et krav eller en betingelse for, at noget andet sker.</div>
                    <div class="special-rule-example" style="border-color:#eab308;">
                        "Vi bader, <strong>hvis</strong> solen skinner."
                    </div>
                </div>
                <div class="special-rule-card" style="border-color:#f97316;">
                    <div class="special-rule-header">
                        <span class="special-rule-word" style="color:#fb923c;">🌧️ selvom</span>
                        <span class="special-rule-role" style="background:rgba(249,115,22,0.2); color:#fdba74;">Trods modstand</span>
                    </div>
                    <div class="special-rule-desc">Handlingen gennemføres <strong>på trods af</strong> en forhindring.</div>
                    <div class="special-rule-example" style="border-color:#f97316;">
                        "Vi bader, <strong>selvom</strong> det regner."
                    </div>
                </div>
            </div>
        `;

        renderQuizEngine(parent, {
            introHtml,
            state: atomState,
            questions: ATOM_QUESTIONS,
            progressLabel: '🧭 AT/OM & HVIS/SELVOM',
            doneTitle: 'At, om, hvis og selvom mestret!'
        });
    }

    // ==========================================
    // TAB 9: TEKSTFLOW & HISTORIER (KULMINATIONEN)
    // ==========================================
    let currentStoryIdx = 0;
    const storyUserChoices = [{}, {}, {}];

    function renderTabTekstflow(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'special-tab-container tekstflow-tab-container';

        const introCard = document.createElement('div');
        introCard.className = 'special-intro-card';
        introCard.innerHTML = `
            <div class="special-intro-badge" style="background: rgba(16, 185, 129, 0.2); border-color: #10b981; color: #6ee7b7;">
                🚦 KULMINATIONEN: FRA ISOLEREDE REGLER TIL TEKSTENS TRAFIK & FLYDENDE TEKSTFLOW
            </div>
            <h2 class="special-intro-title">Konjunktioner i Sammenhængende Tekst & Tekstens Trafik 🚦</h2>
            <p class="special-intro-desc">
                Konjunktioner er sprogets færdselsregler! I virkelighedens hverdagsdansk bruger vi bindeord til at skabe årsagskæder, kontraster og tidsforløb i hele historier.
            </p>
            <div style="margin-top: 1.2rem; text-align: center;">
                <button type="button" id="btn-open-traffic-flade" class="action-btn-primary" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 0.85rem 1.8rem; font-size: 1rem; border-radius: 12px; cursor: pointer;">
                    🚦 Åbn den fulde særskilte flade: Tekstens Trafik (6 Øvelsesbaner & Vrimlebillede) ➔
                </button>
            </div>
        `;
        const openTrafficBtn = introCard.querySelector('#btn-open-traffic-flade');
        if (openTrafficBtn) {
            openTrafficBtn.onclick = () => navigateFn('konjunktioner_tekstflow', { from: 'konjunktioner_all' });
        }
        container.appendChild(introCard);

        // Story Switcher Buttons
        const storyTabsBar = document.createElement('div');
        storyTabsBar.style.display = 'flex';
        storyTabsBar.style.gap = '0.8rem';
        storyTabsBar.style.flexWrap = 'wrap';
        storyTabsBar.style.justifyContent = 'center';
        storyTabsBar.style.marginBottom = '2rem';

        const storyMeta = [
            { icon: '🚲', title: 'Historie 1: Peter cykelbud i sneen' },
            { icon: '🌿', title: 'Historie 2: Anna gartneren i parken' },
            { icon: '☕', title: 'Historie 3: Lars tjeneren på caféen' }
        ];

        storyMeta.forEach((sm, sIdx) => {
            const btn = document.createElement('button');
            btn.className = `adv-tab-btn ${currentStoryIdx === sIdx ? 'active' : ''}`;
            btn.style.padding = '0.7rem 1.3rem';
            btn.style.borderRadius = '14px';
            btn.innerHTML = `<span>${sm.icon}</span> ${sm.title}`;
            btn.onclick = () => {
                currentStoryIdx = sIdx;
                renderTabTekstflow(parent);
            };
            storyTabsBar.appendChild(btn);
        });
        container.appendChild(storyTabsBar);

        const currentStory = conjunctionData.traening3[currentStoryIdx];
        const userChoices = storyUserChoices[currentStoryIdx];

        const storyCard = document.createElement('div');
        storyCard.className = 'exercise-action-card';
        storyCard.style.padding = '2rem';

        // Header for Story Card
        const storyHeader = document.createElement('div');
        storyHeader.style.display = 'flex';
        storyHeader.style.justifyContent = 'space-between';
        storyHeader.style.alignItems = 'center';
        storyHeader.style.marginBottom = '1.5rem';
        storyHeader.style.flexWrap = 'wrap';
        storyHeader.style.gap = '0.8rem';
        storyHeader.innerHTML = `
            <div style="font-weight: 800; font-size: 1.25rem; color: #f8fafc; display: flex; align-items: center; gap: 0.5rem;">
                <span>${storyMeta[currentStoryIdx].icon}</span>
                <span>${storyMeta[currentStoryIdx].title}</span>
            </div>
            <button type="button" class="btn-action-listen" id="btn-listen-story" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-weight: 700;">
                <span>🔊</span>
                <span>Lyt til teksten</span>
            </button>
        `;
        storyCard.appendChild(storyHeader);

        // Story Text Area with Selects
        const storyTextBox = document.createElement('div');
        storyTextBox.style.fontSize = '1.25rem';
        storyTextBox.style.lineHeight = '2';
        storyTextBox.style.color = '#f1f5f9';
        storyTextBox.style.background = 'rgba(15, 23, 42, 0.6)';
        storyTextBox.style.padding = '2rem';
        storyTextBox.style.borderRadius = '16px';
        storyTextBox.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        storyTextBox.style.marginBottom = '1.5rem';

        const parts = currentStory.text.split(/(\[blank_\d+\])/);
        let storyHtml = '';

        parts.forEach(part => {
            const match = part.match(/\[blank_(\d+)\]/);
            if (match) {
                const bIdx = match[1];
                const blankData = currentStory.blanks[bIdx];
                const chosen = userChoices[bIdx] || '';
                const isCorrect = chosen === blankData.answer;

                let selectStyle = 'display: inline-block; padding: 0.35rem 0.8rem; border-radius: 10px; font-weight: 800; font-size: 1.15rem; cursor: pointer; transition: all 0.2s ease; margin: 0 0.3rem;';
                if (!chosen) {
                    selectStyle += ' background: rgba(30, 41, 59, 0.9); border: 2px dashed #38bdf8; color: #38bdf8;';
                } else if (isCorrect) {
                    selectStyle += ' background: rgba(34, 197, 94, 0.2); border: 2px solid #22c55e; color: #4ade80;';
                } else {
                    selectStyle += ' background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; color: #f87171;';
                }

                storyHtml += `
                    <select class="t3-flow-select" data-blank="${bIdx}" style="${selectStyle}">
                        <option value="">${chosen || '...'}</option>
                        ${blankData.options.map(opt => `<option value="${opt}" ${chosen === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                `;
            } else {
                storyHtml += `<span>${part}</span>`;
            }
        });

        storyTextBox.innerHTML = storyHtml;
        storyCard.appendChild(storyTextBox);

        // Feedback Banner
        const feedbackArea = document.createElement('div');
        feedbackArea.id = 't3-flow-feedback';
        feedbackArea.style.display = 'none';
        feedbackArea.style.padding = '1.2rem';
        feedbackArea.style.borderRadius = '12px';
        feedbackArea.style.fontSize = '1.05rem';
        feedbackArea.style.lineHeight = '1.5';
        feedbackArea.style.marginBottom = '1.5rem';
        storyCard.appendChild(feedbackArea);

        // Story analysis box (Didaktisk forklaring på flowet)
        const analysisBox = document.createElement('div');
        analysisBox.style.background = 'rgba(255, 255, 255, 0.04)';
        analysisBox.style.border = '1px solid rgba(255, 255, 255, 0.08)';
        analysisBox.style.borderRadius = '14px';
        analysisBox.style.padding = '1.2rem 1.5rem';
        analysisBox.style.marginBottom = '1.5rem';
        analysisBox.innerHTML = `
            <div style="font-weight: 800; font-size: 0.95rem; color: #fde047; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
                <span>💡</span>
                <span>Hvorfor fungerer dette tekstflow?</span>
            </div>
            <div style="font-size: 0.92rem; color: #cbd5e1; line-height: 1.5;">
                Her ser du vekselvirkningen: <strong>Når</strong> sætter vanen, <strong>Derfor</strong> skyder konsekvensen afsted som en pil, <strong>Fordi</strong> peger bagud mod årsagen, <strong>Selvom</strong> bygger muren op, og <strong>Alligevel</strong> bryder igennem muren. Til sidst sætter <strong>Da</strong> tegnestiften ved det præcise tidspunkt i fortiden!
            </div>
        `;
        storyCard.appendChild(analysisBox);

        // Bottom Controls
        const bottomControls = document.createElement('div');
        bottomControls.style.display = 'flex';
        bottomControls.style.justifyContent = 'space-between';
        bottomControls.style.alignItems = 'center';
        bottomControls.style.flexWrap = 'wrap';
        bottomControls.style.gap = '1rem';

        const statusInfo = document.createElement('div');
        statusInfo.id = 't3-flow-status';
        statusInfo.style.color = '#94a3b8';
        statusInfo.style.fontWeight = '700';

        const nextStoryBtn = document.createElement('button');
        nextStoryBtn.className = 'action-btn-primary';
        nextStoryBtn.style.padding = '0.8rem 1.5rem';
        nextStoryBtn.style.borderRadius = '12px';
        nextStoryBtn.style.fontWeight = '800';
        nextStoryBtn.style.cursor = 'pointer';
        nextStoryBtn.innerHTML = currentStoryIdx < 2 ? `Gå til næste historie (${currentStoryIdx + 2}/3) ➔` : `Start forfra 🔄`;
        nextStoryBtn.onclick = () => {
            if (currentStoryIdx < 2) {
                currentStoryIdx++;
            } else {
                currentStoryIdx = 0;
            }
            renderTabTekstflow(parent);
        };

        bottomControls.appendChild(statusInfo);
        bottomControls.appendChild(nextStoryBtn);
        storyCard.appendChild(bottomControls);

        // Select Change Event Listeners
        const selects = storyCard.querySelectorAll('.t3-flow-select');
        function updateStoryProgress() {
            const totalBlanks = Object.keys(currentStory.blanks).length;
            let correctCount = 0;
            for (let i = 0; i < totalBlanks; i++) {
                if (userChoices[i] === currentStory.blanks[i].answer) correctCount++;
            }
            statusInfo.innerHTML = `Fremgang: <span style="color:#6ee7b7; font-weight:900;">${correctCount}</span> af ${totalBlanks} bindeord korrekt`;
        }

        selects.forEach(sel => {
            sel.onchange = () => {
                const bIdx = sel.getAttribute('data-blank');
                const val = sel.value;
                const blankData = currentStory.blanks[bIdx];

                userChoices[bIdx] = val;

                if (!val) {
                    sel.style.background = 'rgba(30, 41, 59, 0.9)';
                    sel.style.border = '2px dashed #38bdf8';
                    sel.style.color = '#38bdf8';
                    feedbackArea.style.display = 'none';
                } else if (val === blankData.answer) {
                    sel.style.background = 'rgba(34, 197, 94, 0.2)';
                    sel.style.border = '2px solid #22c55e';
                    sel.style.color = '#4ade80';
                    feedbackArea.style.display = 'block';
                    feedbackArea.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedbackArea.style.border = '1.5px solid #22c55e';
                    feedbackArea.style.color = '#4ade80';
                    feedbackArea.innerHTML = `🎉 <strong>Rigtigt!</strong> "${val}" passer perfekt ind i tekstens flow.`;
                } else {
                    sel.style.background = 'rgba(239, 68, 68, 0.2)';
                    sel.style.border = '2px solid #ef4444';
                    sel.style.color = '#f87171';
                    feedbackArea.style.display = 'block';
                    feedbackArea.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedbackArea.style.border = '1.5px solid #ef4444';
                    feedbackArea.style.color = '#f87171';
                    const hint = (blankData.feedback && blankData.feedback[val]) || `Prøv igen. Det rigtige ord her er "${blankData.answer}".`;
                    feedbackArea.innerHTML = `⚠️ <strong>Overvej logikken:</strong> ${hint}`;
                }

                updateStoryProgress();
            };
        });

        // Speech synthesis for story
        storyHeader.querySelector('#btn-listen-story').onclick = () => {
            let spokenText = currentStory.text;
            Object.keys(currentStory.blanks).forEach(i => {
                const repl = userChoices[i] || currentStory.blanks[i].answer;
                spokenText = spokenText.replace(`[blank_${i}]`, repl);
            });
            speakDanish(spokenText);
        };

        updateStoryProgress();
        container.appendChild(storyCard);
        parent.appendChild(container);
    }

    // Initial render
    switchTab((extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'vrimmel');
    container.appendChild(viewContainer);
}
