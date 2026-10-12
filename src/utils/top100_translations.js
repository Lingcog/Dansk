/**
 * top100_translations.js
 * Multilingual translations for:
 * 1. Top 100 Substantiver Hub (Top100SubstantiverMenuView)
 * 2. Køkkenet & Hjemmet (KoekkenHjemmetView)
 * 3. Byrummet (ByrummetView)
 *
 * Supported languages:
 * 'da' (Dansk)
 * 'en' (English)
 * 'es' (Español)
 * 'zh' (中文)
 */

export const top100Translations = {
  da: {
    // Hub
    top100_hub_title: "De 100 mest almindelige hverdagsord",
    top100_hub_desc: "Disse 100 substantiver møder du i din hverdag. I stedet for at lære dem fra en kedelig liste, kan du lære dem i sjove øvelser.",
    top100_hub_class_badge: "🟢 Ordklasse: Substantiver (Navneord i grøn farve)",
    top100_legend_substantiv: "Substantiv",
    top100_legend_verbum: "Verbum",
    top100_legend_adjektiv: "Adjektiv",
    top100_legend_sted: "Sted",
    top100_legend_tid: "Tid",
    top100_legend_green: "grøn",
    top100_legend_red: "rød",
    top100_legend_orange: "orange",
    top100_legend_blue: "blå",
    top100_legend_purple: "lilla",
    top100_scene1_badge: "🏙️ Scene 1: Ca. 60–70 % af ordene",
    top100_scene1_title: "🏙️ Byen",
    top100_scene1_desc: "Udforsk gaden, torvet, skolen, butikken og menneskene i byen. Lær centrale højfrekvente ord som <em>mand, kvinde, bil, vej, skole, tid, penge, læge</em> og <em>tur</em>.",
    top100_scene1_btn: "Gå til byen ➔",
    top100_scene2_badge: "🍳 Scene 2: Hjemmet & Familien",
    top100_scene2_title: "🍳 Hjemmet og køkkenet",
    top100_scene2_desc: "Udforsk familiens måltid, maden, møblerne og tøjet i det nære miljø. Lær ord som <em>mor, far, barn, bord, stol, kop, kaffe, mad, seng, hund</em> og <em>problem</em>.",
    top100_scene2_btn: "Gå til køkkenet ➔",
    top100_scene3_badge: "📚 Scene 3: Viden & Sprog",
    top100_scene3_title: "🏫 Undervisningslokalet & Kontoret",
    top100_scene3_desc: "Læring, sprog, teknologi og tid. Dækker ord som <em>lærer, elev, bog, computer, papir, opgave, spørgsmål, svar</em> og <em>arbejde</em>.",
    top100_scene3_btn: "Kommer snart 🔒",
    top100_tag_farve_radar: "📡 Farve-radar EN/ET",
    top100_tag_detektiv: "🕵️ Detektiv-mission",
    top100_tag_historie: "💭 En lille historie",
    top100_tag_bygger: "✍️ Sætningsbygger",
    top100_tag_sorting: "📦 20-ords kassesortering",
    top100_tag_24_substantiver: "🟢 24 substantiver",
    top100_tag_20_substantiver: "🟢 20 substantiver",
    top100_tag_kaffe: "💭 Kaffen vælter!",
    top100_tag_learning: "📖 Læring",
    top100_tag_tech: "💻 Teknologi",
    top100_tag_time: "⏰ Tidsudtryk",
    top100SubstantiverTitle: "De 100 mest almindelige hverdagsord",
    top100SubstantiverDesc: "Lær ordene ved at lave sjove øvelser.",

    // Common Controls & Badges
    vrimmel_pure_btn: "Se rent billede:",
    vrimmel_radar_btn: "Farve-radar (EN / ET):",
    vrimmel_status_on: "TIL",
    vrimmel_status_off: "FRA",
    vrimmel_legend_en: "EN (blå)",
    vrimmel_legend_et: "ET (orange)",
    vrimmel_badge_substantiv: "Substantiv",
    vrimmel_badge_en: "🏷️ EN-ord (Fælleskøn)",
    vrimmel_badge_et: "🏷️ ET-ord (Intetkøn)",
    vrimmel_listen_btn: "Hør udtale",
    vrimmel_mic_btn: "Prøv at udtale",
    vrimmel_mic_listening: "Lytter...",
    vrimmel_mic_prompt: "Sig ordet:",
    vrimmel_mic_correct: "🎉 Flot! Du sagde:",
    vrimmel_mic_incorrect: "🤔 Du sagde: \"{spoken}\". Prøv igen!",
    vrimmel_mic_unsupported: "Tale-genkendelse understøttes i Chrome, Safari og Edge.",
    vrimmel_form_bestemt: "Bestemt:",
    vrimmel_form_flertal: "Flertal:",
    vrimmel_meaning_label: "Betydning:",

    // Tabs
    tab_label_vrimmel: "1. Udforsk billedet",
    tab_label_detektiv: "2. Find ord der hænger sammen",
    tab_label_historie: "3. En lille historie",
    tab_label_kontekst: "4. Sammenhæng",
    tab_label_saetning: "5. Find verbet",

    // Sorting
    sort_kitchen_title: "Sorter alle 20 ord i EN- og ET-kassen",
    sort_byrum_title: "Sorter alle 24 ord i EN- og ET-kassen",
    sort_progress_text: "{n} / {total} sorteret",
    sort_bin_en_title: "📦 Kasse til EN-ord",
    sort_bin_et_title: "📦 Kasse til ET-ord",
    sort_instruction: "Klik på et ord herunder, og klik derefter på den rigtige kasse ovenfor:",
    sort_all_complete: "🎉 Alle ord sorteret korrekt!",
    sort_reset_btn: "🔄 Nulstil sortering",

    // Sentence builder
    builder_badge: "✍️ Sætningsbygger {current} af {total}",
    builder_kitchen_title: "Vælg det rigtige verbum og byg sætningen:",
    builder_byrum_title: "Vælg det rigtige verbum og dan en byrums-sætning:",
    builder_choose_verb_slot: "❓ Vælg verbum",
    builder_tray_title: "Hvilket verbum passer til handlingen? (🔴 Verbum)",
    builder_preview_default: "Vælg et verbum for at høre sætningen...",
    builder_next_btn: "Næste sætning ➔",
    builder_restart_btn: "Start forfra 🔄",
    builder_slot_substantiv: "Substantiv",
    builder_slot_verbum: "Verbum",
    builder_slot_sted: "Sted",
    builder_wrong_feedback: "Nej, det giver ikke mening her. Prøv et andet verbum!",

    // Kitchen specific
    koekken_hero_title: "🍳 Hjemmet og køkkenet",
    koekken_hero_desc: "Mød familiens måltid, maden, møblerne og tøjet på billedet.",
    koekken_default_badge: "Klik på en cirkel i billedet",
    koekken_default_title: "Gå på opdagelse i køkkenet!",
    koekken_default_desc: "Hør udtalen, træn med mikrofonen og lær om ordet hedder <strong>en</strong> eller <strong>et</strong>.",
    koekken_detektiv_count_prompt: "Klik på de 3 rigtige ord herunder:",
    koekken_detektiv_complete: "Rigtigt! ✓",
    koekken_detektiv_next: "Næste mission ➔",
    koekken_detektiv_restart: "Start forfra 🔄",
    koekken_m1_title: "Find 3 ting, man kan drikke ☕",
    koekken_m2_title: "Find 3 ting, man kan spise 🍽️",
    koekken_m3_title: "Find 3 personer eller familiemedlemmer 👨‍👩‍👧",
    koekken_m4_title: "Find 3 møbler i hjemmet 🪑",
    koekken_story_title: "Kaffen vælter! ☕",
    koekken_story_desc: "Se på kvinden til højre i billedet. Sådan forvandler en konkret hændelse sig til abstrakte ord:",
    koekken_story_s1_q: "Trin 1: Hvilken konkret genstand holdt kvinden i hånden?",
    koekken_story_s2_q: "Trin 2: Hvad skete der lige pludselig med kaffen?",
    koekken_story_s3_q: "Trin 3: Hvad har kvinden nu, da bordet er vådt?",
    koekken_story_s4_q: "Trin 4: Hvad gør hun for at løse problemet?",
    koekken_story_pedagogy: "💡 <strong>Pædagogisk pointe:</strong> Abstrakte ord som <em>et problem</em>, <em>en fejl</em> og <em>et uheld</em> er ikke tomme ord på en liste. De opstår altid ud fra en konkret handling i virkeligheden!",
    koekken_context_title: "Målord: \"et bord\"",
    koekken_context_desc: "Ordet <strong>et bord</strong> optræder i mange forskellige miljøer. Hvad gør man ved bordet?",
    koekken_context_s1_title: "🍳 1. I køkkenet & hjemmet",
    koekken_context_s1_q: "Hvad laver familien ved bordet her?",
    koekken_context_s1_a: "A) Familien spiser mad og taler sammen",
    koekken_context_s1_b: "B) Man kører i bil på bordet",
    koekken_context_s2_title: "🏫 2. I klasselokalet / på kontoret",
    koekken_context_s2_q: "Hvad laver eleven eller medarbejderen ved bordet?",
    koekken_context_s2_a: "A) Eleven arbejder på sin computer og læser i bogen",
    koekken_context_s2_b: "B) Eleven sover under sengen",
    koekken_context_s3_title: "🏙️ 3. I byrummet på caféen",
    koekken_context_s3_q: "Hvad sker der ved cafébordet på gaden?",
    koekken_context_s3_a: "A) Gæsten betaler med mønter (penge) og drikker kaffe",
    koekken_context_s3_b: "B) Lægen opererer en patient",

    // Byrum specific
    byrum_hero_title: "🏙️ Byen",
    byrum_hero_desc: "Mød menneskene på gaden, transportmidler, skolen, butikken, tid og penge på billedet.",
    byrum_default_badge: "Klik på en cirkel i byrummet",
    byrum_default_title: "Gå på opdagelse i byen!",
    byrum_default_desc: "Lær om ordet hedder <strong>en</strong> eller <strong>et</strong>, lyt til udtalen og træn med mikrofonen.",
    byrum_detektiv_count_prompt: "Klik på de 3 rigtige ord herunder:",
    byrum_detektiv_complete: "Rigtigt! ✓",
    byrum_detektiv_next: "Næste mission ➔",
    byrum_detektiv_restart: "Start forfra 🔄",
    byrum_m1_title: "Find 3 transportmidler på vejen 🚗",
    byrum_m2_title: "Find 3 personer eller roller i byrummet 🧑‍🤝‍🧑",
    byrum_m3_title: "Find 3 steder eller bygninger 🏢",
    byrum_m4_title: "Find 3 ting med tid eller økonomi ⏰💰",
    byrum_story_title: "Bilen der er gået i stå 🚗💥",
    byrum_story_desc: "Se på manden ved bilen til højre. Sådan bevæger sproget sig fra konkret til abstrakt:",
    byrum_story_s1_q: "Trin 1: Hvilken konkret genstand kørte manden i?",
    byrum_story_s2_q: "Trin 2: Hvad skete der pludselig med motoren?",
    byrum_story_s3_q: "Trin 3: Hvad har manden nu, da bilen ikke kan køre?",
    byrum_story_s4_q: "Trin 4: Hvad gør manden for at løse problemet?",
    byrum_story_pedagogy: "💡 <strong>Pædagogisk pointe:</strong> Fra den konkrete bil ➔ til den mekaniske fejl ➔ til det abstrakte problem! Sådan hænger sproget sammen.",
    byrum_context_title: "Målord: \"en bil\"",
    byrum_context_desc: "Ordet <strong>en bil</strong> optræder i mange sammenhænge i hverdagen:",
    byrum_context_s1_title: "🚗 1. I bytrafikken",
    byrum_context_s1_q: "Hvad gør bilen på gaden?",
    byrum_context_s1_a: "A) Bilen holder ved lyskrydset og kører på vejen",
    byrum_context_s1_b: "B) Bilen flyver i luften",
    byrum_context_s2_title: "⚠️ 2. Ved uheldet",
    byrum_context_s2_q: "Hvad sker der, når bilen går i stykker?",
    byrum_context_s2_a: "A) Der er opstået en fejl eller et problem med bilen",
    byrum_context_s2_b: "B) Bilen laver kaffe til familien",
    byrum_context_s3_title: "🪙 3. Økonomi & køb",
    byrum_context_s3_q: "Hvad koster det at have en bil?",
    byrum_context_s3_a: "A) Man betaler penge (kroner) for benzin og reparation",
    byrum_context_s3_b: "B) Man får gratis mad i skolen"
  },

  en: {
    // Hub
    top100_hub_title: "The 100 Most Common Everyday Words",
    top100_hub_desc: "You encounter these 100 nouns in your daily life. Instead of learning them from a boring list, you can learn them through fun exercises.",
    top100_hub_class_badge: "🟢 Part of Speech: Nouns (Substantiver in green)",
    top100_legend_substantiv: "Noun",
    top100_legend_verbum: "Verb",
    top100_legend_adjektiv: "Adjective",
    top100_legend_sted: "Place",
    top100_legend_tid: "Time",
    top100_legend_green: "green",
    top100_legend_red: "red",
    top100_legend_orange: "orange",
    top100_legend_blue: "blue",
    top100_legend_purple: "purple",
    top100_scene1_badge: "🏙️ Scene 1: Approx. 60–70% of words",
    top100_scene1_title: "🏙️ The City",
    top100_scene1_desc: "Explore the street, town square, school, shops, and city residents. Learn high-frequency words such as <em>mand (man), kvinde (woman), bil (car), vej (street), skole (school), tid (time), penge (money), læge (doctor)</em>, and <em>tur (trip)</em>.",
    top100_scene1_btn: "Go to the city ➔",
    top100_scene2_badge: "🍳 Scene 2: Home & Family",
    top100_scene2_title: "🍳 Home & Kitchen",
    top100_scene2_desc: "Explore family meals, food, furniture, and clothing at home. Learn words like <em>mor (mother), far (father), barn (child), bord (table), stol (chair), kop (cup), kaffe (coffee), mad (food), seng (bed), hund (dog)</em>, and <em>problem</em>.",
    top100_scene2_btn: "Go to the kitchen ➔",
    top100_scene3_badge: "📚 Scene 3: Knowledge & Language",
    top100_scene3_title: "🏫 Classroom & Office",
    top100_scene3_desc: "Learning, language, technology, and time. Covers words like <em>lærer (teacher), elev (student), bog (book), computer, papir (paper), opgave (task), spørgsmål (question), svar (answer)</em>, and <em>arbejde (work)</em>.",
    top100_scene3_btn: "Coming soon 🔒",
    top100_tag_farve_radar: "📡 Color Radar EN/ET",
    top100_tag_detektiv: "🕵️ Detective Mission",
    top100_tag_historie: "💭 A little story",
    top100_tag_bygger: "✍️ Sentence Builder",
    top100_tag_sorting: "📦 20-Word Box Sorting",
    top100_tag_24_substantiver: "🟢 24 nouns",
    top100_tag_20_substantiver: "🟢 20 nouns",
    top100_tag_kaffe: "💭 Coffee spills!",
    top100_tag_learning: "📖 Learning",
    top100_tag_tech: "💻 Technology",
    top100_tag_time: "⏰ Time expressions",
    top100SubstantiverTitle: "The 100 Most Common Everyday Words",
    top100SubstantiverDesc: "Learn the words by doing fun exercises.",

    // Common Controls & Badges
    vrimmel_pure_btn: "View pure image:",
    vrimmel_radar_btn: "Color Radar (EN / ET):",
    vrimmel_status_on: "ON",
    vrimmel_status_off: "OFF",
    vrimmel_legend_en: "EN (blue)",
    vrimmel_legend_et: "ET (orange)",
    vrimmel_badge_substantiv: "Noun",
    vrimmel_badge_en: "🏷️ EN-word (Common gender)",
    vrimmel_badge_et: "🏷️ ET-word (Neuter gender)",
    vrimmel_listen_btn: "Listen to pronunciation",
    vrimmel_mic_btn: "Try pronouncing",
    vrimmel_mic_listening: "Listening...",
    vrimmel_mic_prompt: "Say the word:",
    vrimmel_mic_correct: "🎉 Great! You said:",
    vrimmel_mic_incorrect: "🤔 You said: \"{spoken}\". Try again!",
    vrimmel_mic_unsupported: "Speech recognition is supported in Chrome, Safari, and Edge.",
    vrimmel_form_bestemt: "Definite:",
    vrimmel_form_flertal: "Plural:",
    vrimmel_meaning_label: "Meaning:",

    // Tabs
    tab_label_vrimmel: "1. Explore picture",
    tab_label_detektiv: "2. Words that connect",
    tab_label_historie: "3. A little story",
    tab_label_kontekst: "4. Context",
    tab_label_saetning: "5. Find the verb",

    // Sorting
    sort_kitchen_title: "Sort all 20 words into the EN and ET boxes",
    sort_byrum_title: "Sort all 24 words into the EN and ET boxes",
    sort_progress_text: "{n} / {total} sorted",
    sort_bin_en_title: "📦 Box for EN words",
    sort_bin_et_title: "📦 Box for ET words",
    sort_instruction: "Click a word below, then click the correct box above:",
    sort_all_complete: "🎉 All words sorted correctly!",
    sort_reset_btn: "🔄 Reset sorting",

    // Sentence builder
    builder_badge: "✍️ Sentence builder {current} of {total}",
    builder_kitchen_title: "Choose the correct verb and build the sentence:",
    builder_byrum_title: "Choose the correct verb and build the city sentence:",
    builder_choose_verb_slot: "❓ Choose verb",
    builder_tray_title: "Which verb matches the action? (🔴 Verb)",
    builder_preview_default: "Choose a verb to hear the sentence...",
    builder_next_btn: "Next sentence ➔",
    builder_restart_btn: "Start over 🔄",
    builder_slot_substantiv: "Noun",
    builder_slot_verbum: "Verb",
    builder_slot_sted: "Place",
    builder_wrong_feedback: "No, that does not make sense here. Try another verb!",

    // Kitchen specific
    koekken_hero_title: "🍳 Home & Kitchen",
    koekken_hero_desc: "Meet the family meal, food, furniture, and clothes in the picture.",
    koekken_default_badge: "Click a circle in the picture",
    koekken_default_title: "Explore the kitchen!",
    koekken_default_desc: "Hear pronunciation, practice with the microphone, and learn whether the word takes <strong>en</strong> or <strong>et</strong>.",
    koekken_detektiv_count_prompt: "Click the 3 correct words below:",
    koekken_detektiv_complete: "Correct! ✓",
    koekken_detektiv_next: "Next mission ➔",
    koekken_detektiv_restart: "Start over 🔄",
    koekken_m1_title: "Find 3 things you can drink ☕",
    koekken_m2_title: "Find 3 things you can eat 🍽️",
    koekken_m3_title: "Find 3 people or family members 👨‍👩‍👧",
    koekken_m4_title: "Find 3 pieces of furniture at home 🪑",
    koekken_story_title: "The coffee spills! ☕",
    koekken_story_desc: "Look at the woman on the right. Here is how a concrete event transforms into abstract words:",
    koekken_story_s1_q: "Step 1: Which concrete object was the woman holding in her hand?",
    koekken_story_s2_q: "Step 2: What suddenly happened to the coffee?",
    koekken_story_s3_q: "Step 3: What does the woman have now that the table is wet?",
    koekken_story_s4_q: "Step 4: What does she do to solve the problem?",
    koekken_story_pedagogy: "💡 <strong>Pedagogical point:</strong> Abstract words like <em>et problem (a problem)</em>, <em>en fejl (a mistake)</em>, and <em>et uheld (an accident)</em> are not empty words on a list. They always arise from concrete events in reality!",
    koekken_context_title: "Target word: \"et bord\" (a table)",
    koekken_context_desc: "The word <strong>et bord</strong> appears in many different settings. What do people do at the table?",
    koekken_context_s1_title: "🍳 1. In the kitchen & home",
    koekken_context_s1_q: "What is the family doing at the table here?",
    koekken_context_s1_a: "A) The family eats food and talks together",
    koekken_context_s1_b: "B) People drive a car on the table",
    koekken_context_s2_title: "🏫 2. In the classroom / office",
    koekken_context_s2_q: "What does the student or employee do at the table?",
    koekken_context_s2_a: "A) The student works on their computer and reads the book",
    koekken_context_s2_b: "B) The student sleeps under the bed",
    koekken_context_s3_title: "🏙️ 3. In the city at the café",
    koekken_context_s3_q: "What happens at the café table on the street?",
    koekken_context_s3_a: "A) The guest pays with coins (money) and drinks coffee",
    koekken_context_s3_b: "B) The doctor operates on a patient",

    // Byrum specific
    byrum_hero_title: "🏙️ The City",
    byrum_hero_desc: "Meet the people on the street, transport vehicles, school, shops, time, and money in the picture.",
    byrum_default_badge: "Click a circle in the city",
    byrum_default_title: "Explore the city!",
    byrum_default_desc: "Learn whether the word takes <strong>en</strong> or <strong>et</strong>, listen to pronunciation, and practice with your microphone.",
    byrum_detektiv_count_prompt: "Click the 3 correct words below:",
    byrum_detektiv_complete: "Correct! ✓",
    byrum_detektiv_next: "Next mission ➔",
    byrum_detektiv_restart: "Start over 🔄",
    byrum_m1_title: "Find 3 means of transportation on the road 🚗",
    byrum_m2_title: "Find 3 people or roles in the city 🧑‍🤝‍🧑",
    byrum_m3_title: "Find 3 places or buildings 🏢",
    byrum_m4_title: "Find 3 items related to time or economy ⏰💰",
    byrum_story_title: "The broken-down car 🚗💥",
    byrum_story_desc: "Look at the man by the car on the right. Here is how language moves from concrete to abstract:",
    byrum_story_s1_q: "Step 1: Which concrete object was the man driving in?",
    byrum_story_s2_q: "Step 2: What suddenly happened to the engine?",
    byrum_story_s3_q: "Step 3: What does the man have now that the car won't drive?",
    byrum_story_s4_q: "Step 4: What does the man do to solve the problem?",
    byrum_story_pedagogy: "💡 <strong>Pedagogical point:</strong> From the concrete car ➔ to the mechanical error ➔ to the abstract problem! This is how language connects.",
    byrum_context_title: "Target word: \"en bil\" (a car)",
    byrum_context_desc: "The word <strong>en bil</strong> appears in many everyday contexts:",
    byrum_context_s1_title: "🚗 1. In city traffic",
    byrum_context_s1_q: "What does the car do on the street?",
    byrum_context_s1_a: "A) The car stops at the traffic light and drives on the road",
    byrum_context_s1_b: "B) The car flies in the air",
    byrum_context_s2_title: "⚠️ 2. In the accident",
    byrum_context_s2_q: "What happens when the car breaks down?",
    byrum_context_s2_a: "A) A fault or problem has occurred with the car",
    byrum_context_s2_b: "B) The car brews coffee for the family",
    byrum_context_s3_title: "🪙 3. Economy & expenses",
    byrum_context_s3_q: "What does it cost to have a car?",
    byrum_context_s3_a: "A) You pay money (kroner) for gas and repairs",
    byrum_context_s3_b: "B) You receive free food at school"
  },

  es: {
    // Hub
    top100_hub_title: "Las 100 palabras cotidianas más comunes",
    top100_hub_desc: "Estos 100 sustantivos los encuentras en tu día a día. En lugar de aprenderlos de una lista aburrida, puedes aprenderlos con ejercicios divertidos.",
    top100_hub_class_badge: "🟢 Categoría gramatical: Sustantivos (Substantiver en verde)",
    top100_legend_substantiv: "Sustantivo",
    top100_legend_verbum: "Verbo",
    top100_legend_adjektiv: "Adjetivo",
    top100_legend_sted: "Lugar",
    top100_legend_tid: "Tiempo",
    top100_legend_green: "verde",
    top100_legend_red: "rojo",
    top100_legend_orange: "naranja",
    top100_legend_blue: "azul",
    top100_legend_purple: "morado",
    top100_scene1_badge: "🏙️ Escena 1: Aprox. 60–70% de las palabras",
    top100_scene1_title: "🏙️ La ciudad",
    top100_scene1_desc: "Explora la calle, la plaza, la escuela, la tienda y los habitantes de la ciudad. Aprende palabras clave como <em>mand (hombre), kvinde (mujer), bil (coche), vej (calle), skole (escuela), tid (tiempo), penge (dinero), læge (médico)</em> y <em>tur (paseo)</em>.",
    top100_scene1_btn: "Ir a la ciudad ➔",
    top100_scene2_badge: "🍳 Escena 2: Hogar y familia",
    top100_scene2_title: "🍳 El hogar y la cocina",
    top100_scene2_desc: "Explora la comida familiar, los muebles y la ropa en casa. Aprende palabras como <em>mor (madre), far (padre), barn (niño), bord (mesa), stol (silla), kop (taza), kaffe (café), mad (comida), seng (cama), hund (perro)</em> y <em>problem</em>.",
    top100_scene2_btn: "Ir a la cocina ➔",
    top100_scene3_badge: "📚 Escena 3: Conocimiento e idioma",
    top100_scene3_title: "🏫 Aula y oficina",
    top100_scene3_desc: "Aprendizaje, idioma, tecnología y tiempo. Cubre palabras como <em>lærer (profesor), elev (alumno), bog (libro), computer, papir (papel), opgave (tarea), spørgsmål (pregunta), svar (respuesta)</em> y <em>arbejde (trabajo)</em>.",
    top100_scene3_btn: "Próximamente 🔒",
    top100_tag_farve_radar: "📡 Radar de color EN/ET",
    top100_tag_detektiv: "🕵️ Misión de detective",
    top100_tag_historie: "💭 Una pequeña historia",
    top100_tag_bygger: "✍️ Constructor de oraciones",
    top100_tag_sorting: "📦 Clasificación de 20 palabras",
    top100_tag_24_substantiver: "🟢 24 sustantivos",
    top100_tag_20_substantiver: "🟢 20 sustantivos",
    top100_tag_kaffe: "💭 ¡El café se derrama!",
    top100_tag_learning: "📖 Aprendizaje",
    top100_tag_tech: "💻 Tecnología",
    top100_tag_time: "⏰ Expresiones de tiempo",
    top100SubstantiverTitle: "Las 100 palabras cotidianas más comunes",
    top100SubstantiverDesc: "Aprende las palabras haciendo ejercicios divertidos.",

    // Common Controls & Badges
    vrimmel_pure_btn: "Ver imagen limpia:",
    vrimmel_radar_btn: "Radar de color (EN / ET):",
    vrimmel_status_on: "ACTIVADO",
    vrimmel_status_off: "DESACTIVADO",
    vrimmel_legend_en: "EN (azul)",
    vrimmel_legend_et: "ET (naranja)",
    vrimmel_badge_substantiv: "Sustantivo",
    vrimmel_badge_en: "🏷️ Palabra EN (Género común)",
    vrimmel_badge_et: "🏷️ Palabra ET (Género neutro)",
    vrimmel_listen_btn: "Escuchar pronunciación",
    vrimmel_mic_btn: "Intentar pronunciar",
    vrimmel_mic_listening: "Escuchando...",
    vrimmel_mic_prompt: "Di la palabra:",
    vrimmel_mic_correct: "🎉 ¡Genial! Dijiste:",
    vrimmel_mic_incorrect: "🤔 Dijiste: \"{spoken}\". ¡Inténtalo de nuevo!",
    vrimmel_mic_unsupported: "El reconocimiento de voz es compatible con Chrome, Safari y Edge.",
    vrimmel_form_bestemt: "Determinado:",
    vrimmel_form_flertal: "Plural:",
    vrimmel_meaning_label: "Significado:",

    // Tabs
    tab_label_vrimmel: "1. Explorar imagen",
    tab_label_detektiv: "2. Palabras relacionadas",
    tab_label_historie: "3. Una pequeña historia",
    tab_label_kontekst: "4. Contexto",
    tab_label_saetning: "5. Encuentra el verbo",

    // Sorting
    sort_kitchen_title: "Clasifica las 20 palabras en las cajas EN y ET",
    sort_byrum_title: "Clasifica las 24 palabras en las cajas EN y ET",
    sort_progress_text: "{n} / {total} clasificadas",
    sort_bin_en_title: "📦 Caja para palabras EN",
    sort_bin_et_title: "📦 Caja para palabras ET",
    sort_instruction: "Haz clic en una palabra abajo y luego en la caja correcta arriba:",
    sort_all_complete: "🎉 ¡Todas las palabras clasificadas correctamente!",
    sort_reset_btn: "🔄 Reiniciar clasificación",

    // Sentence builder
    builder_badge: "✍️ Constructor de oraciones {current} de {total}",
    builder_kitchen_title: "Elige el verbo correcto y construye la oración:",
    builder_byrum_title: "Elige el verbo correcto y forma una oración urbana:",
    builder_choose_verb_slot: "❓ Elegir verbo",
    builder_tray_title: "¿Qué verbo se ajusta a la acción? (🔴 Verbo)",
    builder_preview_default: "Elige un verbo para escuchar la oración...",
    builder_next_btn: "Siguiente oración ➔",
    builder_restart_btn: "Empezar de nuevo 🔄",
    builder_slot_substantiv: "Sustantivo",
    builder_slot_verbum: "Verbo",
    builder_slot_sted: "Lugar",
    builder_wrong_feedback: "No, no tiene sentido aquí. ¡Prueba con otro verbo!",

    // Kitchen specific
    koekken_hero_title: "🍳 El hogar y la cocina",
    koekken_hero_desc: "Conoce la comida familiar, los alimentos, los muebles y la ropa en la imagen.",
    koekken_default_badge: "Haz clic en un círculo en la imagen",
    koekken_default_title: "¡Explora la cocina!",
    koekken_default_desc: "Escucha la pronunciación, practica con el micrófono y aprende si la palabra lleva <strong>en</strong> o <strong>et</strong>.",
    koekken_detektiv_count_prompt: "Haz clic en las 3 palabras correctas abajo:",
    koekken_detektiv_complete: "¡Correcto! ✓",
    koekken_detektiv_next: "Siguiente misión ➔",
    koekken_detektiv_restart: "Empezar de nuevo 🔄",
    koekken_m1_title: "Encuentra 3 cosas que se pueden beber ☕",
    koekken_m2_title: "Encuentra 3 cosas que se pueden comer 🍽️",
    koekken_m3_title: "Encuentra 3 personas o miembros de la familia 👨‍👩‍👧",
    koekken_m4_title: "Encuentra 3 muebles del hogar 🪑",
    koekken_story_title: "¡El café se derrama! ☕",
    koekken_story_desc: "Mira a la mujer a la derecha. Así es como un suceso concreto se transforma en palabras abstractas:",
    koekken_story_s1_q: "Paso 1: ¿Qué objeto concreto sostenía la mujer en su mano?",
    koekken_story_s2_q: "Paso 2: ¿Qué pasó de repente con el café?",
    koekken_story_s3_q: "Paso 3: ¿Qué tiene la mujer ahora que la mesa está mojada?",
    koekken_story_s4_q: "Paso 4: ¿Qué hace ella para resolver el problema?",
    koekken_story_pedagogy: "💡 <strong>Punto pedagógico:</strong> Palabras abstractas como <em>et problem (un problema)</em>, <em>en fejl (un error)</em> y <em>et uheld (un accidente)</em> no son palabras vacías en una lista. ¡Siempre surgen de acontecimientos concretos en la realidad!",
    koekken_context_title: "Palabra clave: \"et bord\" (una mesa)",
    koekken_context_desc: "La palabra <strong>et bord</strong> aparece en muchos entornos diferentes. ¿Qué hace la gente en la mesa?",
    koekken_context_s1_title: "🍳 1. En la cocina y el hogar",
    koekken_context_s1_q: "¿Qué hace la familia en la mesa aquí?",
    koekken_context_s1_a: "A) La familia come y conversa junta",
    koekken_context_s1_b: "B) La gente conduce un coche sobre la mesa",
    koekken_context_s2_title: "🏫 2. En el aula / oficina",
    koekken_context_s2_q: "¿Qué hace el estudiante o empleado en la mesa?",
    koekken_context_s2_a: "A) El estudiante trabaja en su ordenador y lee el libro",
    koekken_context_s2_b: "B) El estudiante duerme debajo de la cama",
    koekken_context_s3_title: "🏙️ 3. En la ciudad en la cafetería",
    koekken_context_s3_q: "¿Qué ocurre en la mesa de la cafetería en la calle?",
    koekken_context_s3_a: "A) El cliente paga con monedas (dinero) y bebe café",
    koekken_context_s3_b: "B) El médico opera a un paciente",

    // Byrum specific
    byrum_hero_title: "🏙️ La ciudad",
    byrum_hero_desc: "Conoce a las personas en la calle, los medios de transporte, la escuela, la tienda, el tiempo y el dinero en la imagen.",
    byrum_default_badge: "Haz clic en un círculo en la ciudad",
    byrum_default_title: "¡Explora la ciudad!",
    byrum_default_desc: "Aprende si la palabra lleva <strong>en</strong> o <strong>et</strong>, escucha la pronunciación y practica con tu micrófono.",
    byrum_detektiv_count_prompt: "Haz clic en las 3 palabras correctas abajo:",
    byrum_detektiv_complete: "¡Correcto! ✓",
    byrum_detektiv_next: "Siguiente misión ➔",
    byrum_detektiv_restart: "Empezar de nuevo 🔄",
    byrum_m1_title: "Encuentra 3 medios de transporte en la carretera 🚗",
    byrum_m2_title: "Encuentra 3 personas o roles en la ciudad 🧑‍🤝‍🧑",
    byrum_m3_title: "Encuentra 3 lugares o edificios 🏢",
    byrum_m4_title: "Encuentra 3 elementos relacionados con tiempo o economía ⏰💰",
    byrum_story_title: "El coche averiado 🚗💥",
    byrum_story_desc: "Mira al hombre junto al coche a la derecha. Así pasa el idioma de lo concreto a lo abstracto:",
    byrum_story_s1_q: "Paso 1: ¿En qué objeto concreto iba conduciendo el hombre?",
    byrum_story_s2_q: "Paso 2: ¿Qué le ocurrió de repente al motor?",
    byrum_story_s3_q: "Paso 3: ¿Qué tiene el hombre ahora que el coche no puede circular?",
    byrum_story_s4_q: "Paso 4: ¿Qué hace el hombre para resolver el problema?",
    byrum_story_pedagogy: "💡 <strong>Punto pedagógico:</strong> ¡Del coche concreto ➔ al fallo mecánico ➔ al problema abstracto! Así es como se conecta el lenguaje.",
    byrum_context_title: "Palabra clave: \"en bil\" (un coche)",
    byrum_context_desc: "La palabra <strong>en bil</strong> aparece en muchos contextos cotidianos:",
    byrum_context_s1_title: "🚗 1. En el tráfico urbano",
    byrum_context_s1_q: "¿Qué hace el coche en la calle?",
    byrum_context_s1_a: "A) El coche se detiene en el semáforo y circula por la carretera",
    byrum_context_s1_b: "B) El coche vuela en el aire",
    byrum_context_s2_title: "⚠️ 2. En la avería / accidente",
    byrum_context_s2_q: "¿Qué sucede cuando el coche se estropea?",
    byrum_context_s2_a: "A) Ha ocurrido un fallo o un problema con el coche",
    byrum_context_s2_b: "B) El coche prepara café para la familia",
    byrum_context_s3_title: "🪙 3. Economía y gastos",
    byrum_context_s3_q: "¿Cuánto cuesta tener un coche?",
    byrum_context_s3_a: "A) Pagas dinero (coronas) por gasolina y reparaciones",
    byrum_context_s3_b: "B) Recibes comida gratis en la escuela"
  },

  zh: {
    // Hub
    top100_hub_title: "最常用的100个日常词汇",
    top100_hub_desc: "这100个名词常出现在日常生活中。不要死记硬背枯燥的词汇表，你可以通过有趣的练习轻松掌握它们。",
    top100_hub_class_badge: "🟢 语法词类：名词 (Substantiver 以绿色标注)",
    top100_legend_substantiv: "名词",
    top100_legend_verbum: "动词",
    top100_legend_adjektiv: "形容词",
    top100_legend_sted: "地点",
    top100_legend_tid: "时间",
    top100_legend_green: "绿色",
    top100_legend_red: "红色",
    top100_legend_orange: "橙色",
    top100_legend_blue: "蓝色",
    top100_legend_purple: "紫色",
    top100_scene1_badge: "🏙️ 场景一：覆盖约60–70%的高频词",
    top100_scene1_title: "🏙️ 城市",
    top100_scene1_desc: "探索街道、广场、学校、商店与城市居民。学习极高频词汇如：<em>mand (男人), kvinde (女人), bil (汽车), vej (道路), skole (学校), tid (时间), penge (钱), læge (医生)</em> 与 <em>tur (出行)</em>。",
    top100_scene1_btn: "进入城市 ➔",
    top100_scene2_badge: "🍳 场景二：家庭与生活",
    top100_scene2_title: "🍳 居家与厨房",
    top100_scene2_desc: "探索家庭用餐、食物、家具与衣物。掌握如：<em>mor (母亲), far (父亲), barn (孩子), bord (桌子), stol (椅子), kop (杯子), kaffe (咖啡), mad (食物), seng (床), hund (狗)</em> 与 <em>problem (问题)</em>。",
    top100_scene2_btn: "进入厨房 ➔",
    top100_scene3_badge: "📚 场景三：知识与语言",
    top100_scene3_title: "🏫 教室与办公室",
    top100_scene3_desc: "学习、语言、科技与时间表达。包含：<em>lærer (老师), elev (学生), bog (书), computer (电脑), papir (纸), opgave (作业), spørgsmål (问题), svar (回答)</em> 与 <em>arbejde (工作)</em>。",
    top100_scene3_btn: "即将推出 🔒",
    top100_tag_farve_radar: "📡 颜色雷达 EN/ET",
    top100_tag_detektiv: "🕵️ 侦探分类任务",
    top100_tag_historie: "💭 小故事",
    top100_tag_bygger: "✍️ 结构造句器",
    top100_tag_sorting: "📦 20词归类箱",
    top100_tag_24_substantiver: "🟢 24个名词",
    top100_tag_20_substantiver: "🟢 20个名词",
    top100_tag_kaffe: "💭 咖啡打翻了！",
    top100_tag_learning: "📖 学习",
    top100_tag_tech: "💻 科技",
    top100_tag_time: "⏰ 时间表达",
    top100SubstantiverTitle: "最常用的100个日常词汇",
    top100SubstantiverDesc: "通过有趣的练习轻松掌握词汇。",

    // Common Controls & Badges
    vrimmel_pure_btn: "纯净原图模式：",
    vrimmel_radar_btn: "颜色雷达 (EN / ET)：",
    vrimmel_status_on: "开启",
    vrimmel_status_off: "关闭",
    vrimmel_legend_en: "EN (蓝色/通性)",
    vrimmel_legend_et: "ET (橙色/中性)",
    vrimmel_badge_substantiv: "名词",
    vrimmel_badge_en: "🏷️ EN性词 (通性名词)",
    vrimmel_badge_et: "🏷️ ET性词 (中性名词)",
    vrimmel_listen_btn: "播放发音",
    vrimmel_mic_btn: "练习发音",
    vrimmel_mic_listening: "正在聆听...",
    vrimmel_mic_prompt: "请读出单词：",
    vrimmel_mic_correct: "🎉 太棒了！您读的是：",
    vrimmel_mic_incorrect: "🤔 识别为：\"{spoken}\"。请再试一次！",
    vrimmel_mic_unsupported: "语音识别功能支持 Chrome、Safari 和 Edge 浏览器。",
    vrimmel_form_bestemt: "定指单数：",
    vrimmel_form_flertal: "复数形式：",
    vrimmel_meaning_label: "中文释义：",

    // Tabs
    tab_label_vrimmel: "1. 探索画卷",
    tab_label_detektiv: "2. 寻找关联词",
    tab_label_historie: "3. 小故事",
    tab_label_kontekst: "4. 语境关联",
    tab_label_saetning: "5. 找出动词",

    // Sorting
    sort_kitchen_title: "将所有20个单词分别归类到 EN 与 ET 箱子中",
    sort_byrum_title: "将所有24个单词分别归类到 EN 与 ET 箱子中",
    sort_progress_text: "已完成 {n} / {total}",
    sort_bin_en_title: "📦 EN性词箱 (通性)",
    sort_bin_et_title: "📦 ET性词箱 (中性)",
    sort_instruction: "点击下方单词，然后点击上方正确的词性箱子：",
    sort_all_complete: "🎉 恭喜！全部单词已正确归类！",
    sort_reset_btn: "🔄 重置归类",

    // Sentence builder
    builder_badge: "✍️ 造句练习 {current} / {total}",
    builder_kitchen_title: "选择正确的动词并完成句子：",
    builder_byrum_title: "选择正确的动词并构建城市街景句子：",
    builder_choose_verb_slot: "❓ 选择动词",
    builder_tray_title: "哪个动词符合动作？ (🔴 动词)",
    builder_preview_default: "选择动词后即可听整句朗读...",
    builder_next_btn: "下一句 ➔",
    builder_restart_btn: "重新开始 🔄",
    builder_slot_substantiv: "名词",
    builder_slot_verbum: "动词",
    builder_slot_sted: "地点",
    builder_wrong_feedback: "不对哦，在这个语境中意思不通顺。试一试另一个动词吧！",

    // Kitchen specific
    koekken_hero_title: "🍳 居家与厨房",
    koekken_hero_desc: "在画面中认识家庭聚餐、食物、家具和衣物。",
    koekken_default_badge: "点击画面上的圆圈",
    koekken_default_title: "探索厨房与家居！",
    koekken_default_desc: "听标准丹麦语发音，使用麦克风开口跟读，掌握单词词性（<strong>en</strong> 还是 <strong>et</strong>）。",
    koekken_detektiv_count_prompt: "在下方点击3个符合条件的正确单词：",
    koekken_detektiv_complete: "回答正确！✓",
    koekken_detektiv_next: "下一个任务 ➔",
    koekken_detektiv_restart: "重新开始 🔄",
    koekken_m1_title: "找出3种可以喝的东西 ☕",
    koekken_m2_title: "找出3种可以吃的东西 🍽️",
    koekken_m3_title: "找出3个人物或家庭成员 👨‍👩‍👧",
    koekken_m4_title: "找出家里的3件家具 🪑",
    koekken_story_title: "咖啡打翻了！ ☕",
    koekken_story_desc: "观察画面右侧的女士。看看具体的意外事件是如何演变为抽象概念词汇的：",
    koekken_story_s1_q: "第1步：女士手里拿着什么具体物品？",
    koekken_story_s2_q: "第2步：咖啡突然发生了什么情况？",
    koekken_story_s3_q: "第3步：桌子湿透了，现在女士面临什么？",
    koekken_story_s4_q: "第4步：她如何解决这个问题？",
    koekken_story_pedagogy: "💡 <strong>教学要点：</strong> 像 <em>et problem (问题)</em>、<em>en fejl (错误)</em> 与 <em>et uheld (意外)</em> 这样的抽象名词不是死板孤立的词汇。它们总是从现实生活中的具体事件中衍生出来的！",
    koekken_context_title: "核心目标词：\"et bord\" (桌子)",
    koekken_context_desc: "单词 <strong>et bord</strong> 在多种不同场景中出现。人们在桌旁做什么？",
    koekken_context_s1_title: "🍳 1. 在厨房与家中",
    koekken_context_s1_q: "一家人在餐桌旁做什么？",
    koekken_context_s1_a: "A) 一家人在一起吃饭和交谈",
    koekken_context_s1_b: "B) 人们在餐桌上开汽车",
    koekken_context_s2_title: "🏫 2. 在教室 / 办公室",
    koekken_context_s2_q: "学生或员工在桌旁做什么？",
    koekken_context_s2_a: "A) 学生用电脑工作并阅读书籍",
    koekken_context_s2_b: "B) 学生睡在床底",
    koekken_context_s3_title: "🏙️ 3. 在城市街边的咖啡馆",
    koekken_context_s3_q: "街边露天咖啡馆桌旁在发生什么？",
    koekken_context_s3_a: "A) 顾客用硬币（钱）付款并喝咖啡",
    koekken_context_s3_b: "B) 医生正在为病人做手术",

    // Byrum specific
    byrum_hero_title: "🏙️ 城市",
    byrum_hero_desc: "在画面中认识街头行人、交通工具、学校、商铺、时间与金钱表达。",
    byrum_default_badge: "点击画面上的圆圈",
    byrum_default_title: "探索城市街景！",
    byrum_default_desc: "辨析名词词性（<strong>en</strong> 还是 <strong>et</strong>），听标准发音并用麦克风跟读练习。",
    byrum_detektiv_count_prompt: "在下方点击3个符合条件的正确单词：",
    byrum_detektiv_complete: "回答正确！✓",
    byrum_detektiv_next: "下一个任务 ➔",
    byrum_detektiv_restart: "重新开始 🔄",
    byrum_m1_title: "找出道路上的3种交通工具 🚗",
    byrum_m2_title: "找出城市中的3个人物或角色 🧑‍🤝‍🧑",
    byrum_m3_title: "找出3个地点或建筑物 🏢",
    byrum_m4_title: "找出3个与时间或经济相关的事物 ⏰💰",
    byrum_story_title: "抛锚的小汽车 🚗💥",
    byrum_story_desc: "观察右侧汽车旁的男士。看看语言概念是如何从具体演化到抽象的：",
    byrum_story_s1_q: "第1步：男士开着什么具体的交通工具？",
    byrum_story_s2_q: "第2步：发动机突然发生了什么？",
    byrum_story_s3_q: "第3步：汽车走不了了，男士现在面临什么？",
    byrum_story_s4_q: "第4步：男士采取什么措施解决问题？",
    byrum_story_pedagogy: "💡 <strong>教学要点：</strong> 从具体的汽车 ➔ 到机械故障 ➔ 再到抽象的问题！这就是语言概念层层递进的逻辑关联。",
    byrum_context_title: "核心目标词：\"en bil\" (汽车)",
    byrum_context_desc: "单词 <strong>en bil</strong> 在日常生活中有多种语境：",
    byrum_context_s1_title: "🚗 1. 在城市交通中",
    byrum_context_s1_q: "汽车在街上做什么？",
    byrum_context_s1_a: "A) 汽车在红绿灯处停下，在道路上行驶",
    byrum_context_s1_b: "B) 汽车在空中飞翔",
    byrum_context_s2_title: "⚠️ 2. 在抛锚/事故中",
    byrum_context_s2_q: "汽车坏掉时会发生什么？",
    byrum_context_s2_a: "A) 汽车出现了故障或问题",
    byrum_context_s2_b: "B) 汽车为全家煮咖啡",
    byrum_context_s3_title: "🪙 3. 经济与支出",
    byrum_context_s3_q: "拥有一辆汽车需要花费什么？",
    byrum_context_s3_a: "A) 需要支付汽油和维修费用（克朗/钱）",
    byrum_context_s3_b: "B) 在学校获得免费餐食"
  }
};

/**
 * Translations for individual vocabulary words in Kitchen (20 words)
 */
export const kitchenWordTranslations = {
  "en sol": {
    en: { meaning: "a sun", sentence: "The sun is shining warmly through the window." },
    es: { meaning: "un sol", sentence: "El sol brilla cálidamente por la ventana." },
    zh: { meaning: "太阳", sentence: "阳光穿过窗户温暖地照进来。" }
  },
  "et vindue": {
    en: { meaning: "a window", sentence: "The sun is shining in through the large window." },
    es: { meaning: "una ventana", sentence: "El sol brilla a través de la gran ventana." },
    zh: { meaning: "一扇窗户", sentence: "阳光穿过大窗户照进来。" }
  },
  "et træ": {
    en: { meaning: "a tree", sentence: "There is a beautiful green tree in the garden." },
    es: { meaning: "un árbol", sentence: "Hay un hermoso árbol verde en el jardín." },
    zh: { meaning: "一棵树", sentence: "花园里有一棵美丽挺拔的绿树。" }
  },
  "en hund": {
    en: { meaning: "a dog", sentence: "The dog is sitting nicely next to the food bowl." },
    es: { meaning: "un perro", sentence: "El perro está sentado obedientemente junto a su cuenco de comida." },
    zh: { meaning: "一只狗", sentence: "狗乖乖地坐在食盆旁边。" }
  },
  "en kat": {
    en: { meaning: "a cat", sentence: "The cat looks curiously at the dog." },
    es: { meaning: "un gato", sentence: "El gato mira con curiosidad al perro." },
    zh: { meaning: "一只猫", sentence: "猫好奇地看着那只狗。" }
  },
  "et barn": {
    en: { meaning: "a child", sentence: "The child sits happily in the high chair." },
    es: { meaning: "un niño/bebé", sentence: "El niño está sentado feliz en la trona." },
    zh: { meaning: "一个孩子", sentence: "孩子高兴地坐在高脚餐椅上。" }
  },
  "en mor": {
    en: { meaning: "a mother", sentence: "The mother pours water into a glass." },
    es: { meaning: "una madre", sentence: "La madre sirve agua en un vaso." },
    zh: { meaning: "母亲/妈妈", sentence: "妈妈往玻璃杯里倒水。" }
  },
  "en far": {
    en: { meaning: "a father", sentence: "The father is talking at the dining table." },
    es: { meaning: "un padre", sentence: "El padre habla en la mesa del comedor." },
    zh: { meaning: "父亲/爸爸", sentence: "爸爸在餐桌旁说话。" }
  },
  "en seng": {
    en: { meaning: "a bed", sentence: "The bed is in the bedroom." },
    es: { meaning: "una cama", sentence: "La cama está en el dormitorio." },
    zh: { meaning: "一张床", sentence: "床摆在卧室里。" }
  },
  "et tøj": {
    en: { meaning: "clothes", sentence: "The clothes and jacket hang on the hook." },
    es: { meaning: "ropa", sentence: "La ropa y la chaqueta cuelgan del perchero." },
    zh: { meaning: "衣服", sentence: "衣服和外套挂在衣钩上。" }
  },
  "en sko": {
    en: { meaning: "a shoe", sentence: "The shoes stand neatly on the shoe rack." },
    es: { meaning: "un zapato", sentence: "Los zapatos están ordenados en el zapatero." },
    zh: { meaning: "一只鞋", sentence: "鞋子整齐地摆在鞋架上。" }
  },
  "en stol": {
    en: { meaning: "a chair", sentence: "The boy sits on a chair." },
    es: { meaning: "una silla", sentence: "El niño está sentado en una silla." },
    zh: { meaning: "一把椅子", sentence: "男孩坐在一把椅子上。" }
  },
  "en mad": {
    en: { meaning: "food / open sandwich", sentence: "They eat food and rye bread together." },
    es: { meaning: "comida / emparedado", sentence: "Comen comida y pan de centeno juntos." },
    zh: { meaning: "食物/开放三明治", sentence: "他们一起吃黑麦面包三明治。" }
  },
  "en kop": {
    en: { meaning: "a cup", sentence: "There is a cup of coffee on the table." },
    es: { meaning: "una taza", sentence: "Hay una taza de café en la mesa." },
    zh: { meaning: "一个杯子", sentence: "桌上有一杯咖啡。" }
  },
  "et kød": {
    en: { meaning: "meat", sentence: "There is meat and cold cuts on the table." },
    es: { meaning: "carne", sentence: "Hay carne y embutidos en la mesa." },
    zh: { meaning: "肉类", sentence: "桌上有肉类和冷盘。" }
  },
  "en fisk": {
    en: { meaning: "a fish", sentence: "They eat fresh fish for lunch." },
    es: { meaning: "un pescado", sentence: "Comen pescado fresco para el almuerzo." },
    zh: { meaning: "一条鱼", sentence: "他们午餐吃新鲜的鱼。" }
  },
  "et glas": {
    en: { meaning: "a glass", sentence: "The mother pours a glass of cold water." },
    es: { meaning: "un vaso", sentence: "La madre sirve un vaso de agua fría." },
    zh: { meaning: "一个玻璃杯", sentence: "妈妈倒了一杯凉开水。" }
  },
  "et bord": {
    en: { meaning: "a table", sentence: "The family sits together around the table." },
    es: { meaning: "una mesa", sentence: "La familia está reunida alrededor de la mesa." },
    zh: { meaning: "一张桌子", sentence: "一家人围坐在餐桌旁。" }
  },
  "en kaffe": {
    en: { meaning: "a coffee", sentence: "The coffee machine is brewing hot coffee." },
    es: { meaning: "un café", sentence: "La cafetera prepara café caliente." },
    zh: { meaning: "咖啡", sentence: "咖啡机正在煮热咖啡。" }
  },
  "et problem": {
    en: { meaning: "a problem", sentence: "The coffee spilled – it's a problem and an accident!" },
    es: { meaning: "un problema", sentence: "El café se derramó: ¡es un problema y un accidente!" },
    zh: { meaning: "一个问题/麻烦", sentence: "咖啡洒了——这是个麻烦，也是个意外！" }
  }
};

/**
 * Translations for individual vocabulary words in Byrummet (24 words)
 */
export const byrumWordTranslations = {
  "en sol": {
    en: { meaning: "a sun", sentence: "The sun is shining warmly over the city roofs." },
    es: { meaning: "un sol", sentence: "El sol brilla cálidamente sobre los tejados de la ciudad." },
    zh: { meaning: "太阳", sentence: "阳光温暖地照耀着城市的屋顶。" }
  },
  "en tid": {
    en: { meaning: "a time", sentence: "The clock on the tower shows the precise time and hour." },
    es: { meaning: "el tiempo / la hora", sentence: "El reloj de la torre muestra la hora y el tiempo precisos." },
    zh: { meaning: "时间/时刻", sentence: "塔楼上的时钟显示出精确的时间。" }
  },
  "en by": {
    en: { meaning: "a city / town", sentence: "There are many people in the city today." },
    es: { meaning: "una ciudad", sentence: "Hay mucha gente en la ciudad hoy." },
    zh: { meaning: "一座城市", sentence: "今天城里有很多人。" }
  },
  "et hus": {
    en: { meaning: "a house", sentence: "A yellow house with handsome windows." },
    es: { meaning: "una casa", sentence: "Una casa amarilla con hermosas ventanas." },
    zh: { meaning: "一栋房子", sentence: "一栋带有漂亮窗户的黄色房子。" }
  },
  "et vindue": {
    en: { meaning: "a window", sentence: "The window is open toward the street." },
    es: { meaning: "una ventana", sentence: "La ventana está abierta hacia la calle." },
    zh: { meaning: "一扇窗户", sentence: "临街的窗户敞开着。" }
  },
  "en café": {
    en: { meaning: "a café / business", sentence: "People sit at the café and relax." },
    es: { meaning: "una cafetería / negocio", sentence: "La gente se sienta en la cafetería y se relaja." },
    zh: { meaning: "咖啡馆 / 营业场所", sentence: "人们坐在咖啡馆里放松休息。" }
  },
  "penge": {
    en: { meaning: "money", sentence: "The customer pays with coins and money." },
    es: { meaning: "dinero", sentence: "El cliente paga con monedas y dinero." },
    zh: { meaning: "钱/货币", sentence: "顾客用硬币和纸币付款。" }
  },
  "en krone": {
    en: { meaning: "a krone (currency)", sentence: "The price of the bread is twenty kroner." },
    es: { meaning: "una corona (moneda)", sentence: "El precio del pan es de veinte coronas." },
    zh: { meaning: "克朗（丹麦货币）", sentence: "面包的价格是二十克朗。" }
  },
  "et arbejde": {
    en: { meaning: "a job / work", sentence: "She has a good job at the bakery." },
    es: { meaning: "un trabajo / empleo", sentence: "Ella tiene un buen trabajo en la panadería." },
    zh: { meaning: "一份工作", sentence: "她在面包店有一份很好的工作。" }
  },
  "en læge": {
    en: { meaning: "a doctor", sentence: "The doctor in a white coat takes a walk on the street." },
    es: { meaning: "un médico", sentence: "El médico con bata blanca da un paseo por la calle." },
    zh: { meaning: "一位医生", sentence: "身穿白大褂的医生在街上散步。" }
  },
  "en hund": {
    en: { meaning: "a dog", sentence: "The dog walks nicely on a leash beside the doctor." },
    es: { meaning: "un perro", sentence: "El perro camina bien con la correa al lado del médico." },
    zh: { meaning: "一只狗", sentence: "狗拴着绳子乖巧地走在医生身边。" }
  },
  "et træ": {
    en: { meaning: "a tree", sentence: "Tall green trees provide shade on the street." },
    es: { meaning: "un árbol", sentence: "Los altos árboles verdes dan sombra en la calle." },
    zh: { meaning: "一棵树", sentence: "高大茂密的绿树在街头投下阴凉。" }
  },
  "en kvinde": {
    en: { meaning: "a woman", sentence: "A woman rides happily on the bike path." },
    es: { meaning: "una mujer", sentence: "Una mujer pedalea alegremente en el carril bici." },
    zh: { meaning: "一位女士/妇女", sentence: "一位女士在自行车道上欢快地骑行。" }
  },
  "en tur": {
    en: { meaning: "a trip / ride", sentence: "She takes a brisk bike ride through the city." },
    es: { meaning: "un paseo / viaje", sentence: "Ella da un paseo en bicicleta por la ciudad." },
    zh: { meaning: "一次出行/兜风", sentence: "她骑车穿过城市进行一次清爽的兜风。" }
  },
  "en vej": {
    en: { meaning: "a street / road", sentence: "There are cars and bicycles on the road." },
    es: { meaning: "una calle / carretera", sentence: "Hay coches y bicicletas en la carretera." },
    zh: { meaning: "一条道路/马路", sentence: "马路行驶着汽车与自行车。" }
  },
  "en familie": {
    en: { meaning: "a family", sentence: "A happy family walks together on the town square." },
    es: { meaning: "una familia", sentence: "Una familia feliz camina junta por la plaza." },
    zh: { meaning: "一个家庭/一家人", sentence: "幸福的一家人在广场上漫步。" }
  },
  "et barn": {
    en: { meaning: "a child", sentence: "A little child holds their mother's hand." },
    es: { meaning: "un niño", sentence: "Un niño pequeño sostiene la mano de su madre." },
    zh: { meaning: "一个小孩", sentence: "小孩子牵着妈妈的手。" }
  },
  "en plads": {
    en: { meaning: "a town square / plaza", sentence: "There is lots of life on the large town square." },
    es: { meaning: "una plaza / espacio", sentence: "Hay mucha vida en la gran plaza." },
    zh: { meaning: "一个广场", sentence: "宽阔的广场上生机盎然。" }
  },
  "en dreng": {
    en: { meaning: "a boy", sentence: "Two boys are playing and running in the sun." },
    es: { meaning: "un niño / chico", sentence: "Dos niños juegan y corren bajo el sol." },
    zh: { meaning: "一个男孩", sentence: "两个男孩在阳光下奔跑玩耍。" }
  },
  "en pige": {
    en: { meaning: "a girl", sentence: "A girl is walking with her schoolbag." },
    es: { meaning: "una niña / chica", sentence: "Una niña camina con su mochila escolar." },
    zh: { meaning: "一个女孩", sentence: "一个背着书包的女孩在走路。" }
  },
  "en skole": {
    en: { meaning: "a school", sentence: "The children go to school to learn." },
    es: { meaning: "una escuela", sentence: "Los niños van a la escuela a aprender." },
    zh: { meaning: "一所学校", sentence: "孩子们去学校学习知识。" }
  },
  "en dør": {
    en: { meaning: "a door", sentence: "The school door is open for the students." },
    es: { meaning: "una puerta", sentence: "La puerta de la escuela está abierta para los alumnos." },
    zh: { meaning: "一扇门", sentence: "学校的大门向学生们敞开。" }
  },
  "en ven": {
    en: { meaning: "a friend", sentence: "Two good friends hug in front of the school." },
    es: { meaning: "un amigo", sentence: "Dos buenos amigos se abrazan frente a la escuela." },
    zh: { meaning: "一位朋友", sentence: "两个好朋友在学校门前拥抱。" }
  },
  "en bil": {
    en: { meaning: "a car", sentence: "A blue car is parked by the roadside." },
    es: { meaning: "un coche", sentence: "Un coche azul está aparcado junto a la carretera." },
    zh: { meaning: "一辆汽车", sentence: "一辆蓝色小汽车停在路边。" }
  },
  "en mand": {
    en: { meaning: "a man", sentence: "A man is standing next to his car." },
    es: { meaning: "un hombre", sentence: "Un hombre está de pie junto a su coche." },
    zh: { meaning: "一个男人", sentence: "一个男人站在他的车旁。" }
  },
  "et problem": {
    en: { meaning: "a problem", sentence: "The car has stopped – the man has a problem and a breakdown." },
    es: { meaning: "un problema", sentence: "El coche se ha detenido: el hombre tiene un problema y una avería." },
    zh: { meaning: "一个问题/故障", sentence: "汽车抛锚了——这位男士遇到了故障和问题。" }
  }
};
