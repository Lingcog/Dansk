/**
 * top100_adjektiver_translations.js
 * Multilingual translations for:
 * 1. Top 100 Adjektiver Hub (Top100AdjektiverMenuView)
 * 2. Shared adjective tabs, labels and navigation
 * 3. Complete vocabulary dictionary for all 100 adjectives (meaning + sentence) in 17 languages
 *
 * Supported languages:
 * da, en, de, es, pt, tr, ar, fa, ku, ur, ru, uk, zh, vi, th, ne, ps
 */

export const adjektiverTranslations = {
  "da": {
    "adj_baro_counter": "Barometer {current} af {total}",
    "adj_baro_step": "[ Trin {n} ]",
    "adj_baro_remove_tooltip": "Klik for at fjerne dette ord",
    "adj_baro_reset_btn": "Nulstil skala 🔄",
    "adj_baro_check_btn": "Tjek rækkefølge ✔️",
    "adj_baro_next_btn": "Næste skala ➔",
    "adj_baro_master_btn": "Du mestrer barometret! 🏆",
    "adj_baro_success": "🎉 Perfekt sorteret! Du placerede ordene i helt rigtig rækkefølge:",
    "adj_baro_wrong": "Ikke helt i mål endnu. Nogle af ordene står ikke i rigtig rækkefølge.",
    "adj_baro_hint": "Tip: Tænk på den mildeste tilstand først og den mest intense til sidst!",
    "adj_kongruens_subprompt": "Vælg den rigtige form af adjektivet:",
    "adj_grammar_banner_title": "Vil du lære alle bøjningsreglerne for adjektiver grundigt?",
    "adj_grammar_banner_desc": "Lær om grundform, intetkøn (-t), bestemt form og flertal (-e) samt gradbøjning.",
    "adj_grammar_banner_btn": "Gå til bøjningsguiden ➔",
    "adj_story_subprompt": "Hvilket ord passer bedst i situationen?",
    "adj_duel_counter": "⚔️ Duel {current} af {total}",
    "adj_nuance_counter": "🔄 Nuance {current} af {total}",
    "adj_kongruens_counter": "🧩 Kongruens {current} af {total}",
    "adj_situation_counter": "📖 Situation {current} af {total}",
    "adj_score_label": "Point:",
    "adj_next_duel": "Næste duel ➔",
    "adj_next_nuance": "Næste nuance ➔",
    "adj_next_kongruens": "Næste opgave ➔",
    "adj_next_situation": "Næste situation ➔",
    "adj_result_duel_btn": "Se resultat ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Afslut synonymer ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Se bøjningsresultat ({score}/{total}) 🏆",
    "adj_result_story_btn": "Se resultat ({score}/{total}) 🌟",
    "adj_retry_btn": "Prøv igen 🔄",
    "adj_correct_feedback": "🎉 Rigtigt!",
    "adj_wrong_feedback": "Ikke helt:",
    "adj_correct_answer_is": "Det rigtige svar er:",
    "adj_duel_modal_title": "Flot klaret i Antonym-duellen!",
    "adj_duel_modal_score": "Du fik <strong>{score}</strong> ud af <strong>{total}</strong> rigtige modpoler.",
    "adj_syn_modal_title": "Godt ordforråd!",
    "adj_syn_modal_score": "Du fik <strong>{score}</strong> ud af <strong>{total}</strong> rigtige nuancer.",
    "adj_kong_modal_title": "Godt arbejdet med bøjningerne!",
    "adj_kong_modal_score": "Du fik <strong>{score}</strong> ud af <strong>{total}</strong> rigtige endelser.",
    "adj_story_modal_title": "Flot læseforståelse!",
    "adj_story_modal_score": "Du fik <strong>{score}</strong> ud af <strong>{total}</strong> rigtige svar.",
    "adj_f1_stage_warm": "☀️ Det lune hjem (10 egenskaber)",
    "adj_f1_stage_cool": "❄️ Det faste værksted (10 modpoler)",
    "adj_f2_stage_title": "⏱️ Stationen og farten (20 tids-adjektiver)",
    "adj_f3_stage_left": "💎 Værdi og perfektion",
    "adj_f3_stage_right": "⚙️ Sværhedsgrad og kompleksitet",
    "adj_f4_stage_left": "❤️ Det sociale liv og glæde",
    "adj_f4_stage_right": "🌧️ Modgang og ubehag",
    "adj_f5_stage_left": "🌿 Renhed, sundhed og balance",
    "adj_f5_stage_right": "🌑 Rod, sygdom og mørke",
    "adj_baro_f1_s1_title": "🌡️ Skala 1: Temperatur",
    "adj_baro_f1_s1_desc": "Arranger ordene efter temperatur fra koldest til varmest:",
    "adj_baro_f1_s1_low": "🥶 Koldest",
    "adj_baro_f1_s1_high": "🔥 Varmest",
    "adj_baro_f1_s2_title": "📐 Skala 2: Størrelse",
    "adj_baro_f1_s2_desc": "Arranger ordene efter størrelse fra mindst til størst:",
    "adj_baro_f1_s2_low": "🔬 Mindst",
    "adj_baro_f1_s2_high": "🐘 Størst",
    "adj_baro_f1_s3_title": "⚖️ Skala 3: Vægt",
    "adj_baro_f1_s3_desc": "Arranger ordene fra lettest til tungest:",
    "adj_baro_f1_s3_low": "🪶 Lettest",
    "adj_baro_f1_s3_high": "🪨 Tungest",
    "adj_baro_f1_s4_title": "🛋️ Skala 4: Hårdhed og tekstur",
    "adj_baro_f1_s4_desc": "Arranger ordene fra blødest til hårdest:",
    "adj_baro_f1_s4_low": "☁️ Blødest",
    "adj_baro_f1_s4_high": "💎 Hårdest",
    "adj_baro_f1_s5_title": "🫙 Skala 5: Rumindhold",
    "adj_baro_f1_s5_desc": "Arranger ordene fra tomt til fuldt:",
    "adj_baro_f1_s5_low": "🫙 Helt tomt",
    "adj_baro_f1_s5_high": "📦 Helt fyldt",
    "adj_baro_f1_s6_title": "📏 Skala 6: Længde og varighed",
    "adj_baro_f1_s6_desc": "Arranger ordene fra kortest til længst:",
    "adj_baro_f1_s6_low": "⚡ Kortest",
    "adj_baro_f1_s6_high": "♾️ Længst",
    "adj_baro_f2_s1_title": "🏃 Skala 1: Hastighed og tempo",
    "adj_baro_f2_s1_desc": "Arranger ordene efter hastighed fra langsomst til hurtigst:",
    "adj_baro_f2_s1_low": "🐢 Langsomst",
    "adj_baro_f2_s1_high": "⚡ Hurtigst",
    "adj_baro_f2_s2_title": "🎂 Skala 2: Alder",
    "adj_baro_f2_s2_desc": "Arranger ordene fra yngst til ældst:",
    "adj_baro_f2_s2_low": "👶 Yngst",
    "adj_baro_f2_s2_high": "👴 Ældst",
    "adj_baro_f2_s3_title": "⏳ Skala 3: Varighed",
    "adj_baro_f2_s3_desc": "Arranger begivenhederne fra kortest til længst varighed:",
    "adj_baro_f2_s3_low": "⚡ Få sekunder",
    "adj_baro_f2_s3_high": "♾️ Meget lang tid",
    "adj_baro_f2_s4_title": "🔄 Skala 4: Hyppighed",
    "adj_baro_f2_s4_desc": "Arranger ordene efter hvor ofte noget sker:",
    "adj_baro_f2_s4_low": "🚫 Næsten aldrig",
    "adj_baro_f2_s4_high": "🔁 Hele tiden",
    "adj_baro_f2_s5_title": "🎯 Skala 5: Punktlighed og præcision",
    "adj_baro_f2_s5_desc": "Arranger fra mest forsinket til absolut præcis:",
    "adj_baro_f2_s5_low": "⚠️ Meget for sent",
    "adj_baro_f2_s5_high": "🎯 Lige til tiden",
    "adj_baro_f2_s6_title": "📅 Skala 6: Aktualitet",
    "adj_baro_f2_s6_desc": "Arranger stadierne i en proces fra fortid til nutid:",
    "adj_baro_f2_s6_low": "📜 Fortid",
    "adj_baro_f2_s6_high": "📍 Lige nu",
    "adj_baro_f3_s1_title": "⭐ Skala 1: Kvalitet",
    "adj_baro_f3_s1_desc": "Arranger vurderingerne fra dårligst til bedst:",
    "adj_baro_f3_s1_low": "🗑️ Dårligst",
    "adj_baro_f3_s1_high": "🏆 Bedst",
    "adj_baro_f3_s2_title": "🧠 Skala 2: Sværhedsgrad",
    "adj_baro_f3_s2_desc": "Arranger opgaverne fra lettest til sværest:",
    "adj_baro_f3_s2_low": "👶 Lettest",
    "adj_baro_f3_s2_high": "🧩 Sværest",
    "adj_baro_f3_s3_title": "💰 Skala 3: Prisniveau",
    "adj_baro_f3_s3_desc": "Arranger efter pris fra koster intet til ekstremt dyr:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 Formue",
    "adj_baro_f3_s4_title": "📌 Skala 4: Vigtighed og prioritet",
    "adj_baro_f3_s4_desc": "Arranger informationer fra helt ligegyldig til uundværlig:",
    "adj_baro_f3_s4_low": "💤 Ligegyldig",
    "adj_baro_f3_s4_high": "🚨 Uundværlig",
    "adj_baro_f3_s5_title": "🔍 Skala 5: Fuldstændighed",
    "adj_baro_f3_s5_desc": "Arranger rapportens kvalitet fra ubrugelig til perfekt:",
    "adj_baro_f3_s5_low": "❌ Ubrugelig",
    "adj_baro_f3_s5_high": "💯 Perfekt",
    "adj_baro_f3_s6_title": "⚙️ Skala 6: Kompleksitet",
    "adj_baro_f3_s6_desc": "Arranger reglerne fra simpleste til mest komplicerede:",
    "adj_baro_f3_s6_low": "🔹 Simplest",
    "adj_baro_f3_s6_high": "🌀 Mest kompliceret",
    "adj_baro_f4_s1_title": "😊 Skala 1: Glæde og humør",
    "adj_baro_f4_s1_desc": "Arranger følelserne fra mest trist til mest lykkelig:",
    "adj_baro_f4_s1_low": "😢 Sønderknust",
    "adj_baro_f4_s1_high": "🎉 Lykkelig",
    "adj_baro_f4_s2_title": "⚡ Skala 2: Energi og oplagthed",
    "adj_baro_f4_s2_desc": "Arranger energiniveauet fra helt udkørt til sprængfyldt:",
    "adj_baro_f4_s2_low": "🪫 Udmattet",
    "adj_baro_f4_s2_high": "🔋 Sprængfyldt",
    "adj_baro_f4_s3_title": "🧘 Skala 3: Ro vs. nervøsitet",
    "adj_baro_f4_s3_desc": "Arranger fra roligst til mest bange/panisk:",
    "adj_baro_f4_s3_low": "🕊️ Helt rolig",
    "adj_baro_f4_s3_high": "😱 Panisk",
    "adj_baro_f4_s4_title": "🧸 Skala 4: Tryghed og frygt",
    "adj_baro_f4_s4_desc": "Arranger fra fuldstændig tryg til rædselsslagen:",
    "adj_baro_f4_s4_low": "🛡️ Helt tryg",
    "adj_baro_f4_s4_high": "😨 Rædselsslagen",
    "adj_baro_f4_s5_title": "💖 Skala 5: Venlighed",
    "adj_baro_f4_s5_desc": "Arranger adfærden fra mest uvenlig til mest hjertevarm:",
    "adj_baro_f4_s5_low": "🧊 Uvenlig / kold",
    "adj_baro_f4_s5_high": "☀️ Hjertevarm",
    "adj_baro_f4_s6_title": "👍 Skala 6: Tilfredshed",
    "adj_baro_f4_s6_desc": "Arranger kundens reaktion fra rasende til begejstret:",
    "adj_baro_f4_s6_low": "😡 Rasende",
    "adj_baro_f4_s6_high": "🤩 Begejstret",
    "adj_baro_f5_s1_title": "🧽 Skala 1: Renlighed",
    "adj_baro_f5_s1_desc": "Arranger fra mest beskidt til skinnende ren:",
    "adj_baro_f5_s1_low": "👞 Ulækker / snavset",
    "adj_baro_f5_s1_high": "✨ Skinnende ren",
    "adj_baro_f5_s2_title": "🍎 Skala 2: Helbred og form",
    "adj_baro_f5_s2_desc": "Arranger fra alvorligt syg til sprudlende sund:",
    "adj_baro_f5_s2_low": "🤒 Alvorligt syg",
    "adj_baro_f5_s2_high": "💪 Sprudlende sund",
    "adj_baro_f5_s3_title": "💧 Skala 3: Fugtighed",
    "adj_baro_f5_s3_desc": "Arranger fra knastør til gennemblødt:",
    "adj_baro_f5_s3_low": "🏜️ Knastør",
    "adj_baro_f5_s3_high": "🌊 Gennemblødt",
    "adj_baro_f5_s4_title": "💡 Skala 4: Lysniveau",
    "adj_baro_f5_s4_desc": "Arranger fra bælgmørk til blændende lys:",
    "adj_baro_f5_s4_low": "🌑 Bælgmørk",
    "adj_baro_f5_s4_high": "☀️ Blændende lys",
    "adj_baro_f5_s5_title": "📊 Skala 5: Mængde",
    "adj_baro_f5_s5_desc": "Arranger mængderne fra ingen til utallige:",
    "adj_baro_f5_s5_low": "0️⃣ Ingen",
    "adj_baro_f5_s5_high": "♾️ Utallige",
    "adj_baro_f5_s6_title": "🧭 Skala 6: Vished og sikkerhed",
    "adj_baro_f5_s6_desc": "Arranger fra helt usikker til klokkeklar vished:",
    "adj_baro_f5_s6_low": "❓ Tvivlsom",
    "adj_baro_f5_s6_high": "✔️ Klokkeklar",
    "top100_adj_hub_title": "De 100 mest almindelige adjektiver",
    "top100_adj_hub_desc": "Adjektiver beskriver verden, tilfører nuancer og udtrykker kontraster. Udforsk de 100 mest almindelige danske adjektiver inddelt i 5 semantiske felter – og mestr den komplette bøjningslære i Felt 6!",
    "top100_adj_f1_badge": "🔬 Felt 1: 20 målbare modpoler",
    "top100_adj_f1_title": "1. Fysiske egenskaber, form og sanser",
    "top100_adj_f1_desc": "Dækker alt der kan måles, mærkes eller sanses i hverdagen: <em>stor/lille, lang/kort, høj/lav, bred/smal, tung/let, varm/kold, hård/blød, fast/løs, fuld/tom, åben/lukket</em>.",
    "top100_adj_f1_btn": "Gå til felt 1 ➔",
    "top100_adj_f2_badge": "⏱️ Felt 2: 20 tids-adjektiver",
    "top100_adj_f2_title": "2. Tid, alder og tempo",
    "top100_adj_f2_desc": "Kronologi, udvikling og hastighed i hverdagen: <em>ny/gammel, ung/gammel, tidlig/sen, hurtig/langsom, pludselig, forsinket, travl, rolig...</em>",
    "top100_adj_f2_btn": "Gå til felt 2 ➔",
    "top100_adj_f3_badge": "💎 Felt 3: 20 vurderings-adjektiver",
    "top100_adj_f3_title": "3. Kvalitet, sværhedsgrad og økonomi",
    "top100_adj_f3_desc": "Vurdering, priser, indsats og værdi: <em>god/dårlig, svær/let, dyr/billig, vigtig/ligegyldig, nødvendig, gratis, perfekt, forkert...</em>",
    "top100_adj_f3_btn": "Gå til felt 3 ➔",
    "top100_adj_f4_badge": "❤️ Felt 4: 20 sociale adjektiver",
    "top100_adj_f4_title": "4. Følelser, personlighed og relationer",
    "top100_adj_f4_desc": "Menneskers sindstilstande og sociale kontakt: <em>glad/ked af det, venlig/uvenlig, træt/frisk, tryg/bange, sur, sød, stolt, rolig...</em>",
    "top100_adj_f4_btn": "Gå til felt 4 ➔",
    "top100_adj_f5_badge": "🎨 Felt 5: 20 tilstands-adjektiver",
    "top100_adj_f5_title": "5. Farver, mængder og tilstande",
    "top100_adj_f5_desc": "Visuelle og praktiske tilstande i hverdagen: <em>rød, blå, grøn, hel/halv, mange/få, ren/beskidt, sund/syg, klar, sikker, rigtig...</em>",
    "top100_adj_f5_btn": "Gå til felt 5 ➔",
    "top100_adj_f6_badge": "📏 Felt 6 • Bøjnings-masteren (gradbøjning og e-reglen)",
    "top100_adj_f6_title": "6. Den store bøjningsguide: gradbøjning og e-reglen",
    "top100_adj_f6_desc": "Komplet interaktiv bøjningsmotor: <strong>1. Positiv</strong> (<em>stor</em>) ➔ <strong>2. Komparativ</strong> med \"end\" (<em>større end</em>) ➔ <strong>3. Superlativ</strong> (<em>størst / den største</em>), samt formlen for hvorfor <em>den/min/denne/Peters</em> altid tvinger <strong>-e</strong> frem!",
    "top100_adj_f6_btn": "Åbn Bøjningsguiden 📏 ➔",
    "top100_adj_ped_title": "💡 Hvordan lærer du adjektiver bedst?",
    "top100_adj_ped_item1_title": "⚖️ Visuelle Modpoler",
    "top100_adj_ped_item1_desc": "Adjektiver beskriver relationer. Ved at lære <em>varm ↔ kold</em> sammen, forankres begge ord i hjernens semantiske netværk på den halve tid.",
    "top100_adj_ped_item2_title": "🧩 Kongruens & Bøjning",
    "top100_adj_ped_item2_desc": "Et adjektiv står aldrig alene – det bøjes efter køn og tal: <em>en varm te</em> (fælleskøn), <em>et varmt bad</em> (intetkøn: -t), <em>de varme dage</em> (flertal: -e).",
    "top100_adj_ped_item3_title": "🌡️ Skala & Intensitet",
    "top100_adj_ped_item3_desc": "Opdag ordenes styrke på et barometer: fra <em>iskold</em> ➔ <em>kold</em> ➔ <em>lun</em> ➔ <em>varm</em> ➔ <em>kogende</em>.",
    "adj_tab_1": "1. Kontrast-studiet",
    "adj_tab_2": "2. Find modpolen (duel)",
    "adj_tab_3": "3. Synonymer og nuancer",
    "adj_tab_4": "4. Barometret (skala)",
    "adj_tab_5": "5. Kongruens (-t / -e)",
    "adj_tab_6": "6. Kontekst og historie",
    "adj_pure_label": "Se rent billede:",
    "adj_listen_word": "Hør målord",
    "adj_listen_pronunciation": "Hør udtale",
    "adj_modpol_label": "Modpol:",
    "adj_faelles_label": "Fælleskøn (en ...)",
    "adj_intet_label": "Intetkøn (et ... / +t)",
    "adj_flertal_label": "Bestemt / Flertal (+e)",
    "adj_example_sentence": "Enkel sætning:",
    "adj_status_on": "TIL",
    "adj_status_off": "FRA",
    "adj_click_hotspot_hint": "Klik på et punkt for at høre udtale og se dets modpol i det modsatte rum!"
  },
  "en": {
    "adj_baro_counter": "Barometer {current} of {total}",
    "adj_baro_step": "[ Step {n} ]",
    "adj_baro_remove_tooltip": "Click to remove this word",
    "adj_baro_reset_btn": "Reset scale 🔄",
    "adj_baro_check_btn": "Check order ✔️",
    "adj_baro_next_btn": "Next scale ➔",
    "adj_baro_master_btn": "You mastered the barometer! 🏆",
    "adj_baro_success": "🎉 Perfectly sorted! You placed the words in the exact right order:",
    "adj_baro_wrong": "Not quite there yet. Some words are not in the right order.",
    "adj_baro_hint": "Tip: Think of the mildest state first and the most intense last!",
    "adj_kongruens_subprompt": "Choose the correct form of the adjective:",
    "adj_grammar_banner_title": "Want to thoroughly learn all adjective inflection rules?",
    "adj_grammar_banner_desc": "Learn about base form, neuter (-t), definite form & plural (-e), and comparison.",
    "adj_grammar_banner_btn": "Go to Inflection Guide ➔",
    "adj_story_subprompt": "Which word fits best in this situation?",
    "adj_duel_counter": "⚔️ Duel {current} of {total}",
    "adj_nuance_counter": "🔄 Nuance {current} of {total}",
    "adj_kongruens_counter": "🧩 Agreement {current} of {total}",
    "adj_situation_counter": "📖 Situation {current} of {total}",
    "adj_score_label": "Score:",
    "adj_next_duel": "Next duel ➔",
    "adj_next_nuance": "Next nuance ➔",
    "adj_next_kongruens": "Next task ➔",
    "adj_next_situation": "Next situation ➔",
    "adj_result_duel_btn": "See result ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Finish synonyms ({score}/{total}) 🌟",
    "adj_result_kong_btn": "See inflection result ({score}/{total}) 🏆",
    "adj_result_story_btn": "See result ({score}/{total}) 🌟",
    "adj_retry_btn": "Try again 🔄",
    "adj_correct_feedback": "🎉 Correct!",
    "adj_wrong_feedback": "Not quite:",
    "adj_correct_answer_is": "The correct answer is:",
    "adj_duel_modal_title": "Great job in the Antonym Duel!",
    "adj_duel_modal_score": "You got <strong>{score}</strong> out of <strong>{total}</strong> correct opposites.",
    "adj_syn_modal_title": "Great vocabulary!",
    "adj_syn_modal_score": "You got <strong>{score}</strong> out of <strong>{total}</strong> correct nuances.",
    "adj_kong_modal_title": "Well done with the adjective endings!",
    "adj_kong_modal_score": "You got <strong>{score}</strong> out of <strong>{total}</strong> correct endings.",
    "adj_story_modal_title": "Great reading comprehension!",
    "adj_story_modal_score": "You got <strong>{score}</strong> out of <strong>{total}</strong> correct answers.",
    "adj_f1_stage_warm": "☀️ The warm home (10 qualities)",
    "adj_f1_stage_cool": "❄️ The firm workshop (10 opposites)",
    "adj_f2_stage_title": "⏱️ The station and pace (20 time adjectives)",
    "adj_f3_stage_left": "💎 Value and perfection",
    "adj_f3_stage_right": "⚙️ Difficulty and complexity",
    "adj_f4_stage_left": "❤️ Social life and joy",
    "adj_f4_stage_right": "🌧️ Adversity and discomfort",
    "adj_f5_stage_left": "🌿 Cleanliness, health and balance",
    "adj_f5_stage_right": "🌑 Clutter, illness and darkness",
    "adj_baro_f1_s1_title": "🌡️ Scale 1: Temperature",
    "adj_baro_f1_s1_desc": "Arrange the words by temperature from coldest to warmest:",
    "adj_baro_f1_s1_low": "🥶 Coldest",
    "adj_baro_f1_s1_high": "🔥 Warmest",
    "adj_baro_f1_s2_title": "📐 Scale 2: Size",
    "adj_baro_f1_s2_desc": "Arrange the words by size from smallest to largest:",
    "adj_baro_f1_s2_low": "🔬 Smallest",
    "adj_baro_f1_s2_high": "🐘 Largest",
    "adj_baro_f1_s3_title": "⚖️ Scale 3: Weight",
    "adj_baro_f1_s3_desc": "Arrange the words from lightest to heaviest:",
    "adj_baro_f1_s3_low": "🪶 Lightest",
    "adj_baro_f1_s3_high": "🪨 Heaviest",
    "adj_baro_f1_s4_title": "🛋️ Scale 4: Hardness and texture",
    "adj_baro_f1_s4_desc": "Arrange the words from softest to hardest:",
    "adj_baro_f1_s4_low": "☁️ Softest",
    "adj_baro_f1_s4_high": "💎 Hardest",
    "adj_baro_f1_s5_title": "🫙 Scale 5: Capacity / Fullness",
    "adj_baro_f1_s5_desc": "Arrange the words from empty to full:",
    "adj_baro_f1_s5_low": "🫙 Completely empty",
    "adj_baro_f1_s5_high": "📦 Completely full",
    "adj_baro_f1_s6_title": "📏 Scale 6: Length and duration",
    "adj_baro_f1_s6_desc": "Arrange the words from shortest to longest:",
    "adj_baro_f1_s6_low": "⚡ Shortest",
    "adj_baro_f1_s6_high": "♾️ Longest",
    "adj_baro_f2_s1_title": "🏃 Scale 1: Speed and pace",
    "adj_baro_f2_s1_desc": "Arrange the words by speed from slowest to fastest:",
    "adj_baro_f2_s1_low": "🐢 Slowest",
    "adj_baro_f2_s1_high": "⚡ Fastest",
    "adj_baro_f2_s2_title": "🎂 Scale 2: Age",
    "adj_baro_f2_s2_desc": "Arrange the words from youngest to oldest:",
    "adj_baro_f2_s2_low": "👶 Youngest",
    "adj_baro_f2_s2_high": "👴 Oldest",
    "adj_baro_f2_s3_title": "⏳ Scale 3: Duration",
    "adj_baro_f2_s3_desc": "Arrange the events from shortest to longest duration:",
    "adj_baro_f2_s3_low": "⚡ A few seconds",
    "adj_baro_f2_s3_high": "♾️ Very long time",
    "adj_baro_f2_s4_title": "🔄 Scale 4: Frequency",
    "adj_baro_f2_s4_desc": "Arrange the words by how often something happens:",
    "adj_baro_f2_s4_low": "🚫 Almost never",
    "adj_baro_f2_s4_high": "🔁 All the time",
    "adj_baro_f2_s5_title": "🎯 Scale 5: Punctuality and precision",
    "adj_baro_f2_s5_desc": "Arrange from most delayed to absolutely on time:",
    "adj_baro_f2_s5_low": "⚠️ Far too late",
    "adj_baro_f2_s5_high": "🎯 Right on time",
    "adj_baro_f2_s6_title": "📅 Scale 6: Actuality / Timeline",
    "adj_baro_f2_s6_desc": "Arrange the stages of a process from past to present:",
    "adj_baro_f2_s6_low": "📜 Past",
    "adj_baro_f2_s6_high": "📍 Right now",
    "adj_baro_f3_s1_title": "⭐ Scale 1: Quality",
    "adj_baro_f3_s1_desc": "Arrange the assessments from worst to best:",
    "adj_baro_f3_s1_low": "🗑️ Worst",
    "adj_baro_f3_s1_high": "🏆 Best",
    "adj_baro_f3_s2_title": "🧠 Scale 2: Difficulty",
    "adj_baro_f3_s2_desc": "Arrange the tasks from easiest to hardest:",
    "adj_baro_f3_s2_low": "👶 Easiest",
    "adj_baro_f3_s2_high": "🧩 Hardest",
    "adj_baro_f3_s3_title": "💰 Scale 3: Price level",
    "adj_baro_f3_s3_desc": "Arrange by price from costing nothing to extremely expensive:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 A fortune",
    "adj_baro_f3_s4_title": "📌 Scale 4: Importance and priority",
    "adj_baro_f3_s4_desc": "Arrange information from completely irrelevant to indispensable:",
    "adj_baro_f3_s4_low": "💤 Irrelevant",
    "adj_baro_f3_s4_high": "🚨 Indispensable",
    "adj_baro_f3_s5_title": "🔍 Scale 5: Completeness",
    "adj_baro_f3_s5_desc": "Arrange the report quality from useless to perfect:",
    "adj_baro_f3_s5_low": "❌ Useless",
    "adj_baro_f3_s5_high": "💯 Perfect",
    "adj_baro_f3_s6_title": "⚙️ Scale 6: Complexity",
    "adj_baro_f3_s6_desc": "Arrange the rules from simplest to most complicated:",
    "adj_baro_f3_s6_low": "🔹 Simplest",
    "adj_baro_f3_s6_high": "🌀 Most complicated",
    "adj_baro_f4_s1_title": "😊 Scale 1: Joy and mood",
    "adj_baro_f4_s1_desc": "Arrange the emotions from most sad to most happy:",
    "adj_baro_f4_s1_low": "😢 Heartbroken",
    "adj_baro_f4_s1_high": "🎉 Happy",
    "adj_baro_f4_s2_title": "⚡ Scale 2: Energy and alertness",
    "adj_baro_f4_s2_desc": "Arrange the energy level from exhausted to bursting with energy:",
    "adj_baro_f4_s2_low": "🪫 Exhausted",
    "adj_baro_f4_s2_high": "🔋 Bursting with energy",
    "adj_baro_f4_s3_title": "🧘 Scale 3: Calm vs. nervousness",
    "adj_baro_f4_s3_desc": "Arrange from calmest to most scared / panicked:",
    "adj_baro_f4_s3_low": "🕊️ Completely calm",
    "adj_baro_f4_s3_high": "😱 Panicked",
    "adj_baro_f4_s4_title": "🧸 Scale 4: Security and fear",
    "adj_baro_f4_s4_desc": "Arrange from completely safe to terrified:",
    "adj_baro_f4_s4_low": "🛡️ Completely safe",
    "adj_baro_f4_s4_high": "😨 Terrified",
    "adj_baro_f4_s5_title": "💖 Scale 5: Friendliness",
    "adj_baro_f4_s5_desc": "Arrange behavior from most unfriendly to most warm-hearted:",
    "adj_baro_f4_s5_low": "🧊 Unfriendly / cold",
    "adj_baro_f4_s5_high": "☀️ Warm-hearted",
    "adj_baro_f4_s6_title": "👍 Scale 6: Satisfaction",
    "adj_baro_f4_s6_desc": "Arrange the customer reaction from furious to enthusiastic:",
    "adj_baro_f4_s6_low": "😡 Furious",
    "adj_baro_f4_s6_high": "🤩 Enthusiastic",
    "adj_baro_f5_s1_title": "🧽 Scale 1: Cleanliness",
    "adj_baro_f5_s1_desc": "Arrange from dirtiest to squeaky clean:",
    "adj_baro_f5_s1_low": "👞 Filthy / dirty",
    "adj_baro_f5_s1_high": "✨ Squeaky clean",
    "adj_baro_f5_s2_title": "🍎 Scale 2: Health and fitness",
    "adj_baro_f5_s2_desc": "Arrange from seriously ill to vibrant and healthy:",
    "adj_baro_f5_s2_low": "🤒 Seriously ill",
    "adj_baro_f5_s2_high": "💪 Vibrant and healthy",
    "adj_baro_f5_s3_title": "💧 Scale 3: Moisture",
    "adj_baro_f5_s3_desc": "Arrange from bone-dry to soaking wet:",
    "adj_baro_f5_s3_low": "🏜️ Bone-dry",
    "adj_baro_f5_s3_high": "🌊 Soaking wet",
    "adj_baro_f5_s4_title": "💡 Scale 4: Light level",
    "adj_baro_f5_s4_desc": "Arrange from pitch-dark to blindingly bright:",
    "adj_baro_f5_s4_low": "🌑 Pitch-dark",
    "adj_baro_f5_s4_high": "☀️ Blindingly bright",
    "adj_baro_f5_s5_title": "📊 Scale 5: Quantity",
    "adj_baro_f5_s5_desc": "Arrange quantities from none to countless:",
    "adj_baro_f5_s5_low": "0️⃣ None",
    "adj_baro_f5_s5_high": "♾️ Countless",
    "adj_baro_f5_s6_title": "🧭 Scale 6: Certainty and safety",
    "adj_baro_f5_s6_desc": "Arrange from completely uncertain to crystal clear certainty:",
    "adj_baro_f5_s6_low": "❓ Doubtful",
    "adj_baro_f5_s6_high": "✔️ Crystal clear",
    "top100_adj_hub_title": "The 100 Most Common Adjectives",
    "top100_adj_hub_desc": "Adjectives describe the world, add nuance, and express contrasts. Explore the 100 most common Danish adjectives divided into 5 semantic fields – and master the complete inflection guide in Field 6!",
    "top100_adj_f1_badge": "🔬 Field 1: 20 measurable opposites",
    "top100_adj_f1_title": "1. Physical properties, shape and senses",
    "top100_adj_f1_desc": "Covers everything measurable, tangible, or perceptible in daily life: <em>stor (big) / lille (small), lang (long) / kort (short), høj (tall/high) / lav (low/short), bred (wide) / smal (narrow), tung (heavy) / let (light), varm (warm/hot) / kold (cold), hård (hard) / blød (soft), fast (firm) / løs (loose), fuld (full) / tom (empty), åben (open) / lukket (closed)</em>.",
    "top100_adj_f1_btn": "Go to Field 1 ➔",
    "top100_adj_f2_badge": "⏱️ Field 2: 20 time adjectives",
    "top100_adj_f2_title": "2. Time, age and pace",
    "top100_adj_f2_desc": "Chronology, change, and speed in everyday life: <em>ny (new) / gammel (old), ung (young) / gammel (old), tidlig (early) / sen (late), hurtig (fast) / langsom (slow), pludselig (sudden), forsinket (delayed), travl (busy), rolig (calm)...</em>",
    "top100_adj_f2_btn": "Go to Field 2 ➔",
    "top100_adj_f3_badge": "💎 Field 3: 20 evaluation adjectives",
    "top100_adj_f3_title": "3. Quality, difficulty and finances",
    "top100_adj_f3_desc": "Assessment, prices, effort, and value: <em>god (good) / dårlig (bad), svær (difficult) / let (easy), dyr (expensive) / billig (cheap), vigtig (important) / ligegyldig (unimportant), nødvendig (necessary), gratis (free), perfekt (perfect), forkert (wrong)...</em>",
    "top100_adj_f3_btn": "Go to Field 3 ➔",
    "top100_adj_f4_badge": "❤️ Field 4: 20 social adjectives",
    "top100_adj_f4_title": "4. Emotions, personality and relationships",
    "top100_adj_f4_desc": "Human emotions and social interaction: <em>glad (happy) / ked af det (sad), venlig (friendly) / uvenlig (unfriendly), træt (tired) / frisk (fresh), tryg (safe) / bange (scared), sur (grumpy), sød (sweet), stolt (proud), rolig (calm)...</em>",
    "top100_adj_f4_btn": "Go to Field 4 ➔",
    "top100_adj_f5_badge": "🎨 Field 5: 20 state adjectives",
    "top100_adj_f5_title": "5. Colors, quantities and states",
    "top100_adj_f5_desc": "Visual and practical states in everyday life: <em>rød (red), blå (blue), grøn (green), hel (whole) / halv (half), mange (many) / få (few), ren (clean) / beskidt (dirty), sund (healthy) / syg (sick), klar (ready/clear), sikker (safe/sure), rigtig (right)...</em>",
    "top100_adj_f5_btn": "Go to Field 5 ➔",
    "top100_adj_f6_badge": "📏 Field 6 • Inflection Master (comparison & the e-rule)",
    "top100_adj_f6_title": "6. The Big Inflection Guide: comparison and the e-rule",
    "top100_adj_f6_desc": "Complete interactive inflection engine: <strong>1. Positive</strong> (<em>stor</em>) ➔ <strong>2. Comparative</strong> with \"end\" (<em>større end</em>) ➔ <strong>3. Superlative</strong> (<em>størst / den største</em>), plus the formula for why <em>den/min/denne/Peters</em> always forces <strong>-e</strong>!",
    "top100_adj_f6_btn": "Open Inflection Guide 📏 ➔",
    "top100_adj_ped_title": "💡 How do you best learn adjectives?",
    "top100_adj_ped_item1_title": "⚖️ Visual Opposites",
    "top100_adj_ped_item1_desc": "Adjectives describe relationships. By learning <em>varm ↔ kold</em> together, both words are anchored in the brain's semantic network in half the time.",
    "top100_adj_ped_item2_title": "🧩 Agreement & Inflection",
    "top100_adj_ped_item2_desc": "An adjective never stands alone – it agrees in gender and number: <em>en varm te</em> (common gender), <em>et varmt bad</em> (neuter: -t), <em>de varme dage</em> (plural: -e).",
    "top100_adj_ped_item3_title": "🌡️ Scale & Intensity",
    "top100_adj_ped_item3_desc": "Discover the strength of words on a barometer: from <em>iskold</em> (freezing) ➔ <em>kold</em> (cold) ➔ <em>lun</em> (lukewarm) ➔ <em>varm</em> (warm) ➔ <em>kogende</em> (boiling).",
    "adj_tab_1": "1. Contrast Study",
    "adj_tab_2": "2. Find the Opposite (duel)",
    "adj_tab_3": "3. Synonyms & Nuances",
    "adj_tab_4": "4. Barometer (scale)",
    "adj_tab_5": "5. Agreement (-t / -e)",
    "adj_tab_6": "6. Context & Story",
    "adj_pure_label": "View pure image:",
    "adj_listen_word": "Hear target word",
    "adj_listen_pronunciation": "Hear pronunciation",
    "adj_modpol_label": "Opposite:",
    "adj_faelles_label": "Common gender (en ...)",
    "adj_intet_label": "Neuter (et ... / +t)",
    "adj_flertal_label": "Definite / Plural (+e)",
    "adj_example_sentence": "Simple sentence:",
    "adj_status_on": "ON",
    "adj_status_off": "OFF",
    "adj_click_hotspot_hint": "Click on a point to hear pronunciation and see its opposite in the opposite room!"
  },
  "de": {
    "adj_baro_counter": "Barometer {current} von {total}",
    "adj_baro_step": "[ Stufe {n} ]",
    "adj_baro_remove_tooltip": "Klicken, um dieses Wort zu entfernen",
    "adj_baro_reset_btn": "Skala zurücksetzen 🔄",
    "adj_baro_check_btn": "Reihenfolge überprüfen ✔️",
    "adj_baro_next_btn": "Nächste Skala ➔",
    "adj_baro_master_btn": "Du beherrschst das Barometer! 🏆",
    "adj_baro_success": "🎉 Perfekt sortiert! Du hast die Wörter in genau die richtige Reihenfolge gebracht:",
    "adj_baro_wrong": "Noch nicht ganz am Ziel. Einige Wörter sind noch nicht in der richtigen Reihenfolge.",
    "adj_baro_hint": "Tipp: Denke zuerst an den mildesten Zustand und zuletzt an den intensivsten!",
    "adj_kongruens_subprompt": "Wähle die richtige Form des Adjektivs:",
    "adj_grammar_banner_title": "Möchtest du alle Beugungsregeln für Adjektive gründlich lernen?",
    "adj_grammar_banner_desc": "Lerne mehr über Grundform, Neutrum (-t), bestimmte Form und Plural (-e) sowie die Steigerung.",
    "adj_grammar_banner_btn": "Zum Beugungsratgeber ➔",
    "adj_story_subprompt": "Welches Wort passt am besten zur Situation?",
    "adj_duel_counter": "⚔️ Duell {current} von {total}",
    "adj_nuance_counter": "🔄 Nuance {current} von {total}",
    "adj_kongruens_counter": "🧩 Kongruenz {current} von {total}",
    "adj_situation_counter": "📖 Situation {current} von {total}",
    "adj_score_label": "Punkte:",
    "adj_next_duel": "Nächstes Duell ➔",
    "adj_next_nuance": "Nächste Nuance ➔",
    "adj_next_kongruens": "Nächste Aufgabe ➔",
    "adj_next_situation": "Nächste Situation ➔",
    "adj_result_duel_btn": "Ergebnis ansehen ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Synonyme abschließen ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Beugungsergebnis ansehen ({score}/{total}) 🏆",
    "adj_result_story_btn": "Ergebnis ansehen ({score}/{total}) 🌟",
    "adj_retry_btn": "Erneut versuchen 🔄",
    "adj_correct_feedback": "🎉 Richtig!",
    "adj_wrong_feedback": "Nicht ganz:",
    "adj_correct_answer_is": "Die richtige Antwort ist:",
    "adj_duel_modal_title": "Toll gemacht beim Antonym-Duell!",
    "adj_duel_modal_score": "Du hast <strong>{score}</strong> von <strong>{total}</strong> Gegenteilen richtig.",
    "adj_syn_modal_title": "Toller Wortschatz!",
    "adj_syn_modal_score": "Du hast <strong>{score}</strong> von <strong>{total}</strong> Nuancen richtig.",
    "adj_kong_modal_title": "Gute Arbeit bei den Beugungen!",
    "adj_kong_modal_score": "Du hast <strong>{score}</strong> von <strong>{total}</strong> Endungen richtig.",
    "adj_story_modal_title": "Tolles Leseverständnis!",
    "adj_story_modal_score": "Du hast <strong>{score}</strong> von <strong>{total}</strong> Antworten richtig.",
    "adj_f1_stage_warm": "☀️ Das behagliche Zuhause (10 Eigenschaften)",
    "adj_f1_stage_cool": "❄️ Die feste Werkstatt (10 Gegenteile)",
    "adj_f2_stage_title": "⏱️ Der Bahnhof und das Tempo (20 Zeit-Adjektive)",
    "adj_f3_stage_left": "💎 Wert und Perfektion",
    "adj_f3_stage_right": "⚙️ Schwierigkeitsgrad und Komplexität",
    "adj_f4_stage_left": "❤️ Soziales Leben und Freude",
    "adj_f4_stage_right": "🌧️ Widrigkeiten und Unbehagen",
    "adj_f5_stage_left": "🌿 Reinheit, Gesundheit und Balance",
    "adj_f5_stage_right": "🌑 Unordnung, Krankheit und Dunkelheit",
    "adj_baro_f1_s1_title": "🌡️ Skala 1: Temperatur",
    "adj_baro_f1_s1_desc": "Ordne die Wörter nach Temperatur vom kältesten zum wärmsten:",
    "adj_baro_f1_s1_low": "🥶 Am kältesten",
    "adj_baro_f1_s1_high": "🔥 Am wärmsten",
    "adj_baro_f1_s2_title": "📐 Skala 2: Größe",
    "adj_baro_f1_s2_desc": "Ordne die Wörter nach Größe vom kleinsten zum größten:",
    "adj_baro_f1_s2_low": "🔬 Am kleinsten",
    "adj_baro_f1_s2_high": "🐘 Am größten",
    "adj_baro_f1_s3_title": "⚖️ Skala 3: Gewicht",
    "adj_baro_f1_s3_desc": "Ordne die Wörter vom leichtesten zum schwersten:",
    "adj_baro_f1_s3_low": "🪶 Am leichtesten",
    "adj_baro_f1_s3_high": "🪨 Am schwersten",
    "adj_baro_f1_s4_title": "🛋️ Skala 4: Härte und Textur",
    "adj_baro_f1_s4_desc": "Ordne die Wörter vom weichsten zum härtesten:",
    "adj_baro_f1_s4_low": "☁️ Am weichsten",
    "adj_baro_f1_s4_high": "💎 Am härtesten",
    "adj_baro_f1_s5_title": "🫙 Skala 5: Füllstand",
    "adj_baro_f1_s5_desc": "Ordne die Wörter von leer bis voll:",
    "adj_baro_f1_s5_low": "🫙 Völlig leer",
    "adj_baro_f1_s5_high": "📦 Völlig voll",
    "adj_baro_f1_s6_title": "📏 Skala 6: Länge und Dauer",
    "adj_baro_f1_s6_desc": "Ordne die Wörter vom kürzesten zum längsten:",
    "adj_baro_f1_s6_low": "⚡ Am kürzesten",
    "adj_baro_f1_s6_high": "♾️ Am längsten",
    "adj_baro_f2_s1_title": "🏃 Skala 1: Geschwindigkeit und Tempo",
    "adj_baro_f2_s1_desc": "Ordne die Wörter nach Geschwindigkeit vom langsamsten zum schnellsten:",
    "adj_baro_f2_s1_low": "🐢 Am langsamsten",
    "adj_baro_f2_s1_high": "⚡ Am schnellsten",
    "adj_baro_f2_s2_title": "🎂 Skala 2: Alter",
    "adj_baro_f2_s2_desc": "Ordne die Wörter vom jüngsten zum ältesten:",
    "adj_baro_f2_s2_low": "👶 Am jüngsten",
    "adj_baro_f2_s2_high": "👴 Am ältesten",
    "adj_baro_f2_s3_title": "⏳ Skala 3: Dauer",
    "adj_baro_f2_s3_desc": "Ordne die Ereignisse von der kürzesten zur längsten Dauer:",
    "adj_baro_f2_s3_low": "⚡ Wenige Sekunden",
    "adj_baro_f2_s3_high": "♾️ Sehr lange Zeit",
    "adj_baro_f2_s4_title": "🔄 Skala 4: Häufigkeit",
    "adj_baro_f2_s4_desc": "Ordne die Wörter danach, wie oft etwas geschieht:",
    "adj_baro_f2_s4_low": "🚫 Fast nie",
    "adj_baro_f2_s4_high": "🔁 Die ganze Zeit",
    "adj_baro_f2_s5_title": "🎯 Skala 5: Pünktlichkeit und Präzision",
    "adj_baro_f2_s5_desc": "Ordne von am stärksten verspätet bis absolut pünktlich:",
    "adj_baro_f2_s5_low": "⚠️ Viel zu spät",
    "adj_baro_f2_s5_high": "🎯 Genau pünktlich",
    "adj_baro_f2_s6_title": "📅 Skala 6: Aktualität / Zeitlinie",
    "adj_baro_f2_s6_desc": "Ordne die Phasen eines Prozesses von der Vergangenheit bis zur Gegenwart:",
    "adj_baro_f2_s6_low": "📜 Vergangenheit",
    "adj_baro_f2_s6_high": "📍 Genau jetzt",
    "adj_baro_f3_s1_title": "⭐ Skala 1: Qualität",
    "adj_baro_f3_s1_desc": "Ordne die Bewertungen von der schlechtesten zur besten:",
    "adj_baro_f3_s1_low": "🗑️ Am schlechtesten",
    "adj_baro_f3_s1_high": "🏆 Am besten",
    "adj_baro_f3_s2_title": "🧠 Skala 2: Schwierigkeitsgrad",
    "adj_baro_f3_s2_desc": "Ordne die Aufgaben von der leichtesten zur schwersten:",
    "adj_baro_f3_s2_low": "👶 Am leichtesten",
    "adj_baro_f3_s2_high": "🧩 Am schwersten",
    "adj_baro_f3_s3_title": "💰 Skala 3: Preisniveau",
    "adj_baro_f3_s3_desc": "Ordne nach Preis von kostenlos bis extrem teuer:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 Ein Vermögen",
    "adj_baro_f3_s4_title": "📌 Skala 4: Wichtigkeit und Priorität",
    "adj_baro_f3_s4_desc": "Ordne die Informationen von völlig belanglos bis unverzichtbar:",
    "adj_baro_f3_s4_low": "💤 Belanglos",
    "adj_baro_f3_s4_high": "🚨 Unverzichtbar",
    "adj_baro_f3_s5_title": "🔍 Skala 5: Vollständigkeit",
    "adj_baro_f3_s5_desc": "Ordne die Berichtsqualität von unbrauchbar bis perfekt:",
    "adj_baro_f3_s5_low": "❌ Unbrauchbar",
    "adj_baro_f3_s5_high": "💯 Perfekt",
    "adj_baro_f3_s6_title": "⚙️ Skala 6: Komplexität",
    "adj_baro_f3_s6_desc": "Ordne die Regeln von der einfachsten zur kompliziertesten:",
    "adj_baro_f3_s6_low": "🔹 Am einfachsten",
    "adj_baro_f3_s6_high": "🌀 Am kompliziertesten",
    "adj_baro_f4_s1_title": "😊 Skala 1: Freude und Laune",
    "adj_baro_f4_s1_desc": "Ordne die Gefühle von am traurigsten bis am glücklichsten:",
    "adj_baro_f4_s1_low": "😢 Am Boden zerstört",
    "adj_baro_f4_s1_high": "🎉 Überglücklich",
    "adj_baro_f4_s2_title": "⚡ Skala 2: Energie und Wachheit",
    "adj_baro_f4_s2_desc": "Ordne das Energieniveau von völlig erschöpft bis voller Energie:",
    "adj_baro_f4_s2_low": "🪫 Erschöpft",
    "adj_baro_f4_s2_high": "🔋 Voller Energie",
    "adj_baro_f4_s3_title": "🧘 Skala 3: Ruhe vs. Nervosität",
    "adj_baro_f4_s3_desc": "Ordne von am ruhigsten bis am ängstlichsten/panischsten:",
    "adj_baro_f4_s3_low": "🕊️ Völlig ruhig",
    "adj_baro_f4_s3_high": "😱 Panisch",
    "adj_baro_f4_s4_title": "🧸 Skala 4: Geborgenheit und Angst",
    "adj_baro_f4_s4_desc": "Ordne von völlig sicher bis zu Tode verängstigt:",
    "adj_baro_f4_s4_low": "🛡️ Völlig sicher",
    "adj_baro_f4_s4_high": "😨 Zu Tode erschrocken",
    "adj_baro_f4_s5_title": "💖 Skala 5: Freundlichkeit",
    "adj_baro_f4_s5_desc": "Ordne das Verhalten vom unfreundlichsten zum herzlichsten:",
    "adj_baro_f4_s5_low": "🧊 Unfreundlich / kalt",
    "adj_baro_f4_s5_high": "☀️ Herzensgut",
    "adj_baro_f4_s6_title": "👍 Skala 6: Zufriedenheit",
    "adj_baro_f4_s6_desc": "Ordne die Kundenreaktion von wütend bis begeistert:",
    "adj_baro_f4_s6_low": "😡 Wütend",
    "adj_baro_f4_s6_high": "🤩 Begeistert",
    "adj_baro_f5_s1_title": "🧽 Skala 1: Sauberkeit",
    "adj_baro_f5_s1_desc": "Ordne von am schmutzigsten bis blitzblank:",
    "adj_baro_f5_s1_low": "👞 Ekelhaft / dreckig",
    "adj_baro_f5_s1_high": "✨ Blitzblank",
    "adj_baro_f5_s2_title": "🍎 Skala 2: Gesundheit und Fitness",
    "adj_baro_f5_s2_desc": "Ordne von schwer krank bis kerngesund:",
    "adj_baro_f5_s2_low": "🤒 Schwer krank",
    "adj_baro_f5_s2_high": "💪 Kerngesund",
    "adj_baro_f5_s3_title": "💧 Skala 3: Feuchtigkeit",
    "adj_baro_f5_s3_desc": "Ordne von staubtrocken bis klitschnass:",
    "adj_baro_f5_s3_low": "🏜️ Staubtrocken",
    "adj_baro_f5_s3_high": "🌊 Klitschnass",
    "adj_baro_f5_s4_title": "💡 Skala 4: Helligkeit",
    "adj_baro_f5_s4_desc": "Ordne von stockfinster bis blendend hell:",
    "adj_baro_f5_s4_low": "🌑 Stockfinster",
    "adj_baro_f5_s4_high": "☀️ Blendend hell",
    "adj_baro_f5_s5_title": "📊 Skala 5: Menge",
    "adj_baro_f5_s5_desc": "Ordne die Mengen von gar nichts bis unzählig:",
    "adj_baro_f5_s5_low": "0️⃣ Keine",
    "adj_baro_f5_s5_high": "♾️ Unzählige",
    "adj_baro_f5_s6_title": "🧭 Skala 6: Gewissheit und Sicherheit",
    "adj_baro_f5_s6_desc": "Ordne von völlig unsicher bis zu glasklarer Gewissheit:",
    "adj_baro_f5_s6_low": "❓ Zweifelhaft",
    "adj_baro_f5_s6_high": "✔️ Glasklar",
    "top100_adj_hub_title": "Die 100 häufigsten Adjektive",
    "top100_adj_hub_desc": "Adjektive beschreiben die Welt, verleihen ihr Nuancen und drücken Kontraste aus. Entdecke die 100 häufigsten dänischen Adjektive, eingeteilt in 5 semantische Felder – und meistere die komplette Beugungslehre in Feld 6!",
    "top100_adj_f1_badge": "🔬 Feld 1: 20 messbare Gegensätze",
    "top100_adj_f1_title": "1. Physische Eigenschaften, Form und Sinne",
    "top100_adj_f1_desc": "Deckt alles ab, was im Alltag messbar, spürbar oder wahrnehmbar ist: <em>stor (groß) / lille (klein), lang (lang) / kort (kurz), høj (hoch/groß) / lav (niedrig/klein), bred (breit) / smal (schmal), tung (schwer) / let (leicht), varm (warm/heiß) / kold (kalt), hård (hart) / blød (weich), fast (fest) / løs (locker), fuld (voll) / tom (leer), åben (offen) / lukket (geschlossen)</em>.",
    "top100_adj_f1_btn": "Zu Feld 1 ➔",
    "top100_adj_f2_badge": "⏱️ Feld 2: 20 Zeit-Adjektive",
    "top100_adj_f2_title": "2. Zeit, Alter und Tempo",
    "top100_adj_f2_desc": "Chronologie, Entwicklung und Geschwindigkeit im Alltag: <em>ny (neu) / gammel (alt), ung (jung) / gammel (alt), tidlig (früh) / sen (spät), hurtig (schnell) / langsom (langsam), pludselig (plötzlich), forsinket (verspätet), travl (beschäftigt), rolig (ruhig)...</em>",
    "top100_adj_f2_btn": "Zu Feld 2 ➔",
    "top100_adj_f3_badge": "💎 Feld 3: 20 Bewertungs-Adjektive",
    "top100_adj_f3_title": "3. Qualität, Schwierigkeitsgrad und Wirtschaft",
    "top100_adj_f3_desc": "Bewertung, Preise, Einsatz und Wert: <em>god (gut) / dårlig (schlecht), svær (schwer/schwierig) / let (leicht), dyr (teuer) / billig (günstig/billig), vigtig (wichtig) / ligegyldig (unwichtig), nødvendig (notwendig), gratis (kostenlos), perfekt (perfekt), forkert (falsch)...</em>",
    "top100_adj_f3_btn": "Zu Feld 3 ➔",
    "top100_adj_f4_badge": "❤️ Feld 4: 20 soziale Adjektive",
    "top100_adj_f4_title": "4. Gefühle, Persönlichkeit und Beziehungen",
    "top100_adj_f4_desc": "Gemütszustände des Menschen und sozialer Kontakt: <em>glad (glücklich) / ked af det (traurig), venlig (freundlich) / uvenlig (unfreundlich), træt (müde) / frisk (ausgeruht/frisch), tryg (geborgen/sicher) / bange (ängstlich), sur (mürrisch/sauer), sød (lieb/süß), stolt (stolz), rolig (ruhig)...</em>",
    "top100_adj_f4_btn": "Zu Feld 4 ➔",
    "top100_adj_f5_badge": "🎨 Feld 5: 20 Zustands-Adjektive",
    "top100_adj_f5_title": "5. Farben, Mengen und Zustände",
    "top100_adj_f5_desc": "Visuelle und praktische Zustände im Alltag: <em>rød (rot), blå (blau), grøn (grün), hel (ganz) / halv (halb), mange (viele) / få (wenige), ren (sauber) / beskidt (schmutzig), sund (gesund) / syg (krank), klar (bereit/klar), sikker (sicher), rigtig (richtig)...</em>",
    "top100_adj_f5_btn": "Zu Feld 5 ➔",
    "top100_adj_f6_badge": "📏 Feld 6 • Der Beugungs-Meister (Steigerung und die e-Regel)",
    "top100_adj_f6_title": "6. Der große Beugungsleitfaden: Steigerung und die e-Regel",
    "top100_adj_f6_desc": "Komplette interaktive Beugungs-Engine: <strong>1. Positiv</strong> (<em>stor</em>) ➔ <strong>2. Komparativ</strong> mit \"end\" (<em>større end</em>) ➔ <strong>3. Superlativ</strong> (<em>størst / den største</em>), sowie die Formel dafür, warum <em>den/min/denne/Peters</em> immer <strong>-e</strong> erzwingt!",
    "top100_adj_f6_btn": "Beugungsleitfaden öffnen 📏 ➔",
    "top100_adj_ped_title": "💡 Wie lernst du Adjektive am besten?",
    "top100_adj_ped_item1_title": "⚖️ Visuelle Gegensätze",
    "top100_adj_ped_item1_desc": "Adjektive beschreiben Beziehungen. Wenn man <em>varm ↔ kold</em> zusammen lernt, verankern sich beide Wörter in der halben Zeit im semantischen Netzwerk des Gehirns.",
    "top100_adj_ped_item2_title": "🧩 Kongruenz & Beugung",
    "top100_adj_ped_item2_desc": "Ein Adjektiv steht nie allein – es wird nach Geschlecht und Zahl gebeugt: <em>en varm te</em> (Utrum), <em>et varmt bad</em> (Neutrum: -t), <em>de varme dage</em> (Plural: -e).",
    "top100_adj_ped_item3_title": "🌡️ Skala & Intensität",
    "top100_adj_ped_item3_desc": "Entdecke die Stärke der Wörter auf einem Barometer: von <em>iskold</em> (eiskalt) ➔ <em>kold</em> (kalt) ➔ <em>lun</em> (lauwarm) ➔ <em>varm</em> (warm) ➔ <em>kogende</em> (kochend heiß).",
    "adj_tab_1": "1. Kontrast-Studie",
    "adj_tab_2": "2. Finde das Gegenteil (Duell)",
    "adj_tab_3": "3. Synonyme & Nuancen",
    "adj_tab_4": "4. Barometer (Skala)",
    "adj_tab_5": "5. Kongruenz (-t / -e)",
    "adj_tab_6": "6. Kontext und Geschichte",
    "adj_pure_label": "Reines Bild ansehen:",
    "adj_listen_word": "Zielwort anhören",
    "adj_listen_pronunciation": "Aussprache anhören",
    "adj_modpol_label": "Gegenteil:",
    "adj_faelles_label": "Utrum (en ...)",
    "adj_intet_label": "Neutrum (et ... / +t)",
    "adj_flertal_label": "Bestimmt / Plural (+e)",
    "adj_example_sentence": "Einfacher Satz:",
    "adj_status_on": "AN",
    "adj_status_off": "AUS",
    "adj_click_hotspot_hint": "Klicke auf einen Punkt, um die Aussprache zu hören und das Gegenteil im anderen Raum zu sehen!"
  },
  "es": {
    "adj_baro_counter": "Barómetro {current} de {total}",
    "adj_baro_step": "[ Paso {n} ]",
    "adj_baro_remove_tooltip": "Haz clic para eliminar esta palabra",
    "adj_baro_reset_btn": "Restablecer escala 🔄",
    "adj_baro_check_btn": "Comprobar orden ✔️",
    "adj_baro_next_btn": "Siguiente escala ➔",
    "adj_baro_master_btn": "¡Dominas el barómetro! 🏆",
    "adj_baro_success": "🎉 ¡Ordenado a la perfección! Colocaste las palabras en el orden correcto:",
    "adj_baro_wrong": "Todavía no del todo. Algunas palabras no están en el orden correcto.",
    "adj_baro_hint": "Consejo: ¡Piensa primero en el estado más leve y al final en el más intenso!",
    "adj_kongruens_subprompt": "Elige la forma correcta del adjetivo:",
    "adj_grammar_banner_title": "¿Quieres aprender a fondo todas las reglas de flexión de los adjetivos?",
    "adj_grammar_banner_desc": "Aprende sobre la forma básica, neutro (-t), forma definida y plural (-e), así como la comparación.",
    "adj_grammar_banner_btn": "Ir a la guía de flexión ➔",
    "adj_story_subprompt": "¿Qué palabra encaja mejor en esta situación?",
    "adj_duel_counter": "⚔️ Duelo {current} de {total}",
    "adj_nuance_counter": "🔄 Matiz {current} de {total}",
    "adj_kongruens_counter": "🧩 Concordancia {current} de {total}",
    "adj_situation_counter": "📖 Situación {current} de {total}",
    "adj_score_label": "Puntos:",
    "adj_next_duel": "Siguiente duelo ➔",
    "adj_next_nuance": "Siguiente matiz ➔",
    "adj_next_kongruens": "Siguiente tarea ➔",
    "adj_next_situation": "Siguiente situación ➔",
    "adj_result_duel_btn": "Ver resultado ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Finalizar sinónimos ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Ver resultado de flexión ({score}/{total}) 🏆",
    "adj_result_story_btn": "Ver resultado ({score}/{total}) 🌟",
    "adj_retry_btn": "Intentar de nuevo 🔄",
    "adj_correct_feedback": "🎉 ¡Correcto!",
    "adj_wrong_feedback": "No del todo:",
    "adj_correct_answer_is": "La respuesta correcta es:",
    "adj_duel_modal_title": "¡Bien hecho en el duelo de antónimos!",
    "adj_duel_modal_score": "Obtuviste <strong>{score}</strong> de <strong>{total}</strong> opuestos correctos.",
    "adj_syn_modal_title": "¡Gran vocabulario!",
    "adj_syn_modal_score": "Obtuviste <strong>{score}</strong> de <strong>{total}</strong> matices correctos.",
    "adj_kong_modal_title": "¡Buen trabajo con las terminaciones de los adjetivos!",
    "adj_kong_modal_score": "Obtuviste <strong>{score}</strong> de <strong>{total}</strong> terminaciones correctas.",
    "adj_story_modal_title": "¡Excelente comprensión lectora!",
    "adj_story_modal_score": "Obtuviste <strong>{score}</strong> de <strong>{total}</strong> respuestas correctas.",
    "adj_f1_stage_warm": "☀️ El hogar acogedor (10 cualidades)",
    "adj_f1_stage_cool": "❄️ El taller sólido (10 opuestos)",
    "adj_f2_stage_title": "⏱️ La estación y el ritmo (20 adjetivos de tiempo)",
    "adj_f3_stage_left": "💎 Valor y perfección",
    "adj_f3_stage_right": "⚙️ Dificultad y complejidad",
    "adj_f4_stage_left": "❤️ Vida social y alegría",
    "adj_f4_stage_right": "🌧️ Adversidad y malestar",
    "adj_f5_stage_left": "🌿 Limpieza, salud y equilibrio",
    "adj_f5_stage_right": "🌑 Desorden, enfermedad y oscuridad",
    "adj_baro_f1_s1_title": "🌡️ Escala 1: Temperatura",
    "adj_baro_f1_s1_desc": "Ordena las palabras por temperatura de más fría a más cálida:",
    "adj_baro_f1_s1_low": "🥶 Más frío",
    "adj_baro_f1_s1_high": "🔥 Más cálido",
    "adj_baro_f1_s2_title": "📐 Escala 2: Tamaño",
    "adj_baro_f1_s2_desc": "Ordena las palabras por tamaño de menor a mayor:",
    "adj_baro_f1_s2_low": "🔬 Menor",
    "adj_baro_f1_s2_high": "🐘 Mayor",
    "adj_baro_f1_s3_title": "⚖️ Escala 3: Peso",
    "adj_baro_f1_s3_desc": "Ordena las palabras de más ligera a más pesada:",
    "adj_baro_f1_s3_low": "🪶 Más ligero",
    "adj_baro_f1_s3_high": "🪨 Más pesado",
    "adj_baro_f1_s4_title": "🛋️ Escala 4: Dureza y textura",
    "adj_baro_f1_s4_desc": "Ordena las palabras de más suave a más dura:",
    "adj_baro_f1_s4_low": "☁️ Más suave",
    "adj_baro_f1_s4_high": "💎 Más duro",
    "adj_baro_f1_s5_title": "🫙 Escala 5: Capacidad / Plenitud",
    "adj_baro_f1_s5_desc": "Ordena las palabras de vacío a lleno:",
    "adj_baro_f1_s5_low": "🫙 Completamente vacío",
    "adj_baro_f1_s5_high": "📦 Completamente lleno",
    "adj_baro_f1_s6_title": "📏 Escala 6: Longitud y duración",
    "adj_baro_f1_s6_desc": "Ordena las palabras de más corta a más larga:",
    "adj_baro_f1_s6_low": "⚡ Más corto",
    "adj_baro_f1_s6_high": "♾️ Más largo",
    "adj_baro_f2_s1_title": "🏃 Escala 1: Velocidad y ritmo",
    "adj_baro_f2_s1_desc": "Ordena las palabras por velocidad de más lenta a más rápida:",
    "adj_baro_f2_s1_low": "🐢 Más lento",
    "adj_baro_f2_s1_high": "⚡ Más rápido",
    "adj_baro_f2_s2_title": "🎂 Escala 2: Edad",
    "adj_baro_f2_s2_desc": "Ordena las palabras de más joven a más viejo:",
    "adj_baro_f2_s2_low": "👶 Más joven",
    "adj_baro_f2_s2_high": "👴 Más viejo",
    "adj_baro_f2_s3_title": "⏳ Escala 3: Duración",
    "adj_baro_f2_s3_desc": "Ordena los eventos de menor a mayor duración:",
    "adj_baro_f2_s3_low": "⚡ Pocos segundos",
    "adj_baro_f2_s3_high": "♾️ Mucho tiempo",
    "adj_baro_f2_s4_title": "🔄 Escala 4: Frecuencia",
    "adj_baro_f2_s4_desc": "Ordena las palabras según la frecuencia con la que ocurre algo:",
    "adj_baro_f2_s4_low": "🚫 Casi nunca",
    "adj_baro_f2_s4_high": "🔁 Todo el tiempo",
    "adj_baro_f2_s5_title": "🎯 Escala 5: Puntualidad y precisión",
    "adj_baro_f2_s5_desc": "Ordena del más retrasado al absolutamente puntual:",
    "adj_baro_f2_s5_low": "⚠️ Demasiado tarde",
    "adj_baro_f2_s5_high": "🎯 Justo a tiempo",
    "adj_baro_f2_s6_title": "📅 Escala 6: Actualidad / Cronología",
    "adj_baro_f2_s6_desc": "Ordena las etapas de un proceso del pasado al presente:",
    "adj_baro_f2_s6_low": "📜 Pasado",
    "adj_baro_f2_s6_high": "📍 Justo ahora",
    "adj_baro_f3_s1_title": "⭐ Escala 1: Calidad",
    "adj_baro_f3_s1_desc": "Ordena las valoraciones de peor a mejor:",
    "adj_baro_f3_s1_low": "🗑️ Peor",
    "adj_baro_f3_s1_high": "🏆 Mejor",
    "adj_baro_f3_s2_title": "🧠 Escala 2: Dificultad",
    "adj_baro_f3_s2_desc": "Ordena las tareas de más fácil a más difícil:",
    "adj_baro_f3_s2_low": "👶 Más fácil",
    "adj_baro_f3_s2_high": "🧩 Más difícil",
    "adj_baro_f3_s3_title": "💰 Escala 3: Nivel de precio",
    "adj_baro_f3_s3_desc": "Ordena por precio desde gratis hasta extremadamente caro:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 Una fortuna",
    "adj_baro_f3_s4_title": "📌 Escala 4: Importancia y prioridad",
    "adj_baro_f3_s4_desc": "Ordena la información de totalmente irrelevante a indispensable:",
    "adj_baro_f3_s4_low": "💤 Irrelevante",
    "adj_baro_f3_s4_high": "🚨 Indispensable",
    "adj_baro_f3_s5_title": "🔍 Escala 5: Exhaustividad",
    "adj_baro_f3_s5_desc": "Ordena la calidad del informe de inútil a perfecta:",
    "adj_baro_f3_s5_low": "❌ Inútil",
    "adj_baro_f3_s5_high": "💯 Perfecto",
    "adj_baro_f3_s6_title": "⚙️ Escala 6: Complejidad",
    "adj_baro_f3_s6_desc": "Ordena las reglas de la más simple a la más complicada:",
    "adj_baro_f3_s6_low": "🔹 Más simple",
    "adj_baro_f3_s6_high": "🌀 Más complicada",
    "adj_baro_f4_s1_title": "😊 Escala 1: Alegría y estado de ánimo",
    "adj_baro_f4_s1_desc": "Ordena las emociones de la más triste a la más feliz:",
    "adj_baro_f4_s1_low": "😢 Desconsolado",
    "adj_baro_f4_s1_high": "🎉 Muy feliz",
    "adj_baro_f4_s2_title": "⚡ Escala 2: Energía y vitalidad",
    "adj_baro_f4_s2_desc": "Ordena el nivel de energía de totalmente agotado a rebosante de energía:",
    "adj_baro_f4_s2_low": "🪫 Agotado",
    "adj_baro_f4_s2_high": "🔋 Rebosante de energía",
    "adj_baro_f4_s3_title": "🧘 Escala 3: Calma vs. nerviosismo",
    "adj_baro_f4_s3_desc": "Ordena del más tranquilo al más asustado/en pánico:",
    "adj_baro_f4_s3_low": "🕊️ Completamente tranquilo",
    "adj_baro_f4_s3_high": "😱 En pánico",
    "adj_baro_f4_s4_title": "🧸 Escala 4: Seguridad y miedo",
    "adj_baro_f4_s4_desc": "Ordena de completamente seguro a aterrorizado:",
    "adj_baro_f4_s4_low": "🛡️ Totalmente seguro",
    "adj_baro_f4_s4_high": "😨 Aterrorizado",
    "adj_baro_f4_s5_title": "💖 Escala 5: Amabilidad",
    "adj_baro_f4_s5_desc": "Ordena el comportamiento del más antipático al más afectuoso:",
    "adj_baro_f4_s5_low": "🧊 Antipático / frío",
    "adj_baro_f4_s5_high": "☀️ Muy afectuoso",
    "adj_baro_f4_s6_title": "👍 Escala 6: Satisfacción",
    "adj_baro_f4_s6_desc": "Ordena la reacción del cliente de furiosa a entusiasta:",
    "adj_baro_f4_s6_low": "😡 Furioso",
    "adj_baro_f4_s6_high": "🤩 Entusiasta",
    "adj_baro_f5_s1_title": "🧽 Escala 1: Limpieza",
    "adj_baro_f5_s1_desc": "Ordena de lo más sucio a reluciente de limpio:",
    "adj_baro_f5_s1_low": "👞 Asqueroso / sucio",
    "adj_baro_f5_s1_high": "✨ Reluciente de limpio",
    "adj_baro_f5_s2_title": "🍎 Escala 2: Salud y forma física",
    "adj_baro_f5_s2_desc": "Ordena de gravemente enfermo a rebosante de salud:",
    "adj_baro_f5_s2_low": "🤒 Gravemente enfermo",
    "adj_baro_f5_s2_high": "💪 Rebosante de salud",
    "adj_baro_f5_s3_title": "💧 Escala 3: Humedad",
    "adj_baro_f5_s3_desc": "Ordena de completamente seco a empapado:",
    "adj_baro_f5_s3_low": "🏜️ Completamente seco",
    "adj_baro_f5_s3_high": "🌊 Empapado",
    "adj_baro_f5_s4_title": "💡 Escala 4: Nivel de luz",
    "adj_baro_f5_s4_desc": "Ordena de oscuridad absoluta a brillo cegador:",
    "adj_baro_f5_s4_low": "🌑 Oscuridad absoluta",
    "adj_baro_f5_s4_high": "☀️ Brillo cegador",
    "adj_baro_f5_s5_title": "📊 Escala 5: Cantidad",
    "adj_baro_f5_s5_desc": "Ordena las cantidades de ninguna a incontables:",
    "adj_baro_f5_s5_low": "0️⃣ Ninguno",
    "adj_baro_f5_s5_high": "♾️ Incontables",
    "adj_baro_f5_s6_title": "🧭 Escala 6: Certeza y seguridad",
    "adj_baro_f5_s6_desc": "Ordena de completamente incierto a certeza absoluta:",
    "adj_baro_f5_s6_low": "❓ Dudoso",
    "adj_baro_f5_s6_high": "✔️ Cristalino",
    "top100_adj_hub_title": "Los 100 adjetivos más comunes",
    "top100_adj_hub_desc": "Los adjetivos describen el mundo, aportan matices y expresan contrastes. ¡Explora los 100 adjetivos daneses más comunes divididos en 5 campos semánticos y domina la guía completa de flexión en el Campo 6!",
    "top100_adj_f1_badge": "🔬 Campo 1: 20 opuestos medibles",
    "top100_adj_f1_title": "1. Propiedades físicas, forma y sentidos",
    "top100_adj_f1_desc": "Cubre todo lo que se puede medir, sentir o percibir en la vida diaria: <em>stor (grande) / lille (pequeño), lang (largo) / kort (corto), høj (alto) / lav (bajo), bred (ancho) / smal (estrecho), tung (pesado) / let (ligero), varm (caliente/cálido) / kold (frío), hård (duro) / blød (blando), fast (firme) / løs (suelto), fuld (lleno) / tom (vacío), åben (abierto) / lukket (cerrado)</em>.",
    "top100_adj_f1_btn": "Ir al campo 1 ➔",
    "top100_adj_f2_badge": "⏱️ Campo 2: 20 adjetivos de tiempo",
    "top100_adj_f2_title": "2. Tiempo, edad y ritmo",
    "top100_adj_f2_desc": "Cronología, desarrollo y velocidad en la vida diaria: <em>ny (nuevo) / gammel (viejo), ung (joven) / gammel (viejo), tidlig (temprano) / sen (tarde), hurtig (rápido) / langsom (lento), pludselig (repentino), forsinket (retrasado), travl (ocupado), rolig (tranquilo)...</em>",
    "top100_adj_f2_btn": "Ir al campo 2 ➔",
    "top100_adj_f3_badge": "💎 Campo 3: 20 adjetivos de valoración",
    "top100_adj_f3_title": "3. Calidad, dificultad y finanzas",
    "top100_adj_f3_desc": "Valoración, precios, esfuerzo y valor: <em>god (bueno) / dårlig (malo), svær (difícil) / let (fácil), dyr (caro) / billig (barato), vigtig (importante) / ligegyldig (sin importancia), nødvendig (necesario), gratis (gratis), perfekt (perfecto), forkert (incorrecto)...</em>",
    "top100_adj_f3_btn": "Ir al campo 3 ➔",
    "top100_adj_f4_badge": "❤️ Campo 4: 20 adjetivos sociales",
    "top100_adj_f4_title": "4. Emociones, personalidad y relaciones",
    "top100_adj_f4_desc": "Estados de ánimo e interacción social: <em>glad (feliz) / ked af det (triste), venlig (amable) / uvenlig (antipático), træt (cansado) / frisk (fresco/descansado), tryg (seguro) / bange (asustado), sur (enfadado/de mal humor), sød (dulce/cariñoso), stolt (orgulloso), rolig (tranquilo)...</em>",
    "top100_adj_f4_btn": "Ir al campo 4 ➔",
    "top100_adj_f5_badge": "🎨 Campo 5: 20 adjetivos de estado",
    "top100_adj_f5_title": "5. Colores, cantidades y estados",
    "top100_adj_f5_desc": "Estados visuales y prácticos en la vida diaria: <em>rød (rojo), blå (azul), grøn (verde), hel (entero) / halv (medio), mange (muchos) / få (pocos), ren (limpio) / beskidt (sucio), sund (sano) / syg (enfermo), klar (listo/claro), sikker (seguro), rigtig (correcto)...</em>",
    "top100_adj_f5_btn": "Ir al campo 5 ➔",
    "top100_adj_f6_badge": "📏 Campo 6 • Maestro de la flexión (comparación y la regla de la e)",
    "top100_adj_f6_title": "6. La gran guía de flexión: comparación y la regla de la e",
    "top100_adj_f6_desc": "Motor interactivo completo de flexión: <strong>1. Positivo</strong> (<em>stor</em>) ➔ <strong>2. Comparativo</strong> con \"end\" (<em>større end</em>) ➔ <strong>3. Superlativo</strong> (<em>størst / den største</em>), ¡además de la fórmula de por qué <em>den/min/denne/Peters</em> siempre obliga a añadir <strong>-e</strong>!",
    "top100_adj_f6_btn": "Abrir guía de flexión 📏 ➔",
    "top100_adj_ped_title": "💡 ¿Cómo se aprenden mejor los adjetivos?",
    "top100_adj_ped_item1_title": "⚖️ Opuestos visuales",
    "top100_adj_ped_item1_desc": "Los adjetivos describen relaciones. Al aprender <em>varm ↔ kold</em> juntos, ambas palabras se fijan en la red semántica del cerebro en la mitad de tiempo.",
    "top100_adj_ped_item2_title": "🧩 Concordancia y flexión",
    "top100_adj_ped_item2_desc": "Un adjetivo nunca va solo: concuerda en género y número: <em>en varm te</em> (género común), <em>et varmt bad</em> (neutro: -t), <em>de varme dage</em> (plural: -e).",
    "top100_adj_ped_item3_title": "🌡️ Escala e intensidad",
    "top100_adj_ped_item3_desc": "Descubre la fuerza de las palabras en un barómetro: de <em>iskold</em> (helado) ➔ <em>kold</em> (frío) ➔ <em>lun</em> (tibio) ➔ <em>varm</em> (caliente) ➔ <em>kogende</em> (hirviendo).",
    "adj_tab_1": "1. Estudio de contrastes",
    "adj_tab_2": "2. Encuentra el opuesto (duelo)",
    "adj_tab_3": "3. Sinónimos y matices",
    "adj_tab_4": "4. Barómetro (escala)",
    "adj_tab_5": "5. Concordancia (-t / -e)",
    "adj_tab_6": "6. Contexto e historia",
    "adj_pure_label": "Ver imagen limpia:",
    "adj_listen_word": "Escuchar palabra objetivo",
    "adj_listen_pronunciation": "Escuchar pronunciación",
    "adj_modpol_label": "Opuesto:",
    "adj_faelles_label": "Género común (en ...)",
    "adj_intet_label": "Neutro (et ... / +t)",
    "adj_flertal_label": "Definido / Plural (+e)",
    "adj_example_sentence": "Frase sencilla:",
    "adj_status_on": "ACTIVADO",
    "adj_status_off": "DESACTIVADO",
    "adj_click_hotspot_hint": "¡Haz clic en un punto para escuchar la pronunciación y ver su opuesto en la otra habitación!"
  },
  "pt": {
    "adj_baro_counter": "Barômetro {current} de {total}",
    "adj_baro_step": "[ Passo {n} ]",
    "adj_baro_remove_tooltip": "Clique para remover esta palavra",
    "adj_baro_reset_btn": "Redefinir escala 🔄",
    "adj_baro_check_btn": "Verificar ordem ✔️",
    "adj_baro_next_btn": "Próxima escala ➔",
    "adj_baro_master_btn": "Você domina o barômetro! 🏆",
    "adj_baro_success": "🎉 Perfeitamente ordenado! Você colocou as palavras na ordem exata:",
    "adj_baro_wrong": "Ainda não está certo. Algumas palavras não estão na ordem correta.",
    "adj_baro_hint": "Dica: Pense primeiro no estado mais suave e no mais intenso por último!",
    "adj_kongruens_subprompt": "Escolha a forma correta do adjetivo:",
    "adj_grammar_banner_title": "Quer aprender a fundo todas as regras de flexão dos adjetivos?",
    "adj_grammar_banner_desc": "Aprenda sobre a forma básica, neutro (-t), forma definida e plural (-e), além da comparação.",
    "adj_grammar_banner_btn": "Ir para o guia de flexão ➔",
    "adj_story_subprompt": "Qual palavra se encaixa melhor na situação?",
    "adj_duel_counter": "⚔️ Duelo {current} de {total}",
    "adj_nuance_counter": "🔄 Nuance {current} de {total}",
    "adj_kongruens_counter": "🧩 Concordância {current} de {total}",
    "adj_situation_counter": "📖 Situação {current} de {total}",
    "adj_score_label": "Pontos:",
    "adj_next_duel": "Próximo duelo ➔",
    "adj_next_nuance": "Próxima nuance ➔",
    "adj_next_kongruens": "Próxima tarefa ➔",
    "adj_next_situation": "Próxima situação ➔",
    "adj_result_duel_btn": "Ver resultado ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Concluir sinônimos ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Ver resultado de flexão ({score}/{total}) 🏆",
    "adj_result_story_btn": "Ver resultado ({score}/{total}) 🌟",
    "adj_retry_btn": "Tentar novamente 🔄",
    "adj_correct_feedback": "🎉 Correto!",
    "adj_wrong_feedback": "Não exatamente:",
    "adj_correct_answer_is": "A resposta correta é:",
    "adj_duel_modal_title": "Muito bem no Duelo de Antônimos!",
    "adj_duel_modal_score": "Você acertou <strong>{score}</strong> de <strong>{total}</strong> opostos corretos.",
    "adj_syn_modal_title": "Ótimo vocabulário!",
    "adj_syn_modal_score": "Você acertou <strong>{score}</strong> de <strong>{total}</strong> nuances corretas.",
    "adj_kong_modal_title": "Bom trabalho com as terminações dos adjetivos!",
    "adj_kong_modal_score": "Você acertou <strong>{score}</strong> de <strong>{total}</strong> terminações corretas.",
    "adj_story_modal_title": "Ótima compreensão de leitura!",
    "adj_story_modal_score": "Você acertou <strong>{score}</strong> de <strong>{total}</strong> respostas corretas.",
    "adj_f1_stage_warm": "☀️ O lar acolhedor (10 qualidades)",
    "adj_f1_stage_cool": "❄️ A oficina firme (10 opostos)",
    "adj_f2_stage_title": "⏱️ A estação e o ritmo (20 adjetivos de tempo)",
    "adj_f3_stage_left": "💎 Valor e perfeição",
    "adj_f3_stage_right": "⚙️ Dificuldade e complexidade",
    "adj_f4_stage_left": "❤️ Vida social e alegria",
    "adj_f4_stage_right": "🌧️ Adversidade e desconforto",
    "adj_f5_stage_left": "🌿 Limpeza, saúde e equilíbrio",
    "adj_f5_stage_right": "🌑 Desordem, doença e escuridão",
    "adj_baro_f1_s1_title": "🌡️ Escala 1: Temperatura",
    "adj_baro_f1_s1_desc": "Ordene as palavras por temperatura da mais fria para a mais quente:",
    "adj_baro_f1_s1_low": "🥶 Mais frio",
    "adj_baro_f1_s1_high": "🔥 Mais quente",
    "adj_baro_f1_s2_title": "📐 Escala 2: Tamanho",
    "adj_baro_f1_s2_desc": "Ordene as palavras por tamanho da menor para a maior:",
    "adj_baro_f1_s2_low": "🔬 Menor",
    "adj_baro_f1_s2_high": "🐘 Maior",
    "adj_baro_f1_s3_title": "⚖️ Escala 3: Peso",
    "adj_baro_f1_s3_desc": "Ordene as palavras da mais leve para a mais pesada:",
    "adj_baro_f1_s3_low": "🪶 Mais leve",
    "adj_baro_f1_s3_high": "🪨 Mais pesado",
    "adj_baro_f1_s4_title": "🛋️ Escala 4: Dureza e textura",
    "adj_baro_f1_s4_desc": "Ordene as palavras da mais macia para a mais dura:",
    "adj_baro_f1_s4_low": "☁️ Mais macio",
    "adj_baro_f1_s4_high": "💎 Mais duro",
    "adj_baro_f1_s5_title": "🫙 Escala 5: Nível de preenchimento",
    "adj_baro_f1_s5_desc": "Ordene as palavras de vazio a cheio:",
    "adj_baro_f1_s5_low": "🫙 Completamente vazio",
    "adj_baro_f1_s5_high": "📦 Completamente cheio",
    "adj_baro_f1_s6_title": "📏 Escala 6: Comprimento e duração",
    "adj_baro_f1_s6_desc": "Ordene as palavras da mais curta para a mais longa:",
    "adj_baro_f1_s6_low": "⚡ Mais curto",
    "adj_baro_f1_s6_high": "♾️ Mais longo",
    "adj_baro_f2_s1_title": "🏃 Escala 1: Velocidade e ritmo",
    "adj_baro_f2_s1_desc": "Ordene as palavras por velocidade da mais lenta para a mais rápida:",
    "adj_baro_f2_s1_low": "🐢 Mais lento",
    "adj_baro_f2_s1_high": "⚡ Mais rápido",
    "adj_baro_f2_s2_title": "🎂 Escala 2: Idade",
    "adj_baro_f2_s2_desc": "Ordene as palavras da mais jovem para a mais velha:",
    "adj_baro_f2_s2_low": "👶 Mais jovem",
    "adj_baro_f2_s2_high": "👴 Mais velho",
    "adj_baro_f2_s3_title": "⏳ Escala 3: Duração",
    "adj_baro_f2_s3_desc": "Ordene os eventos da menor para a maior duração:",
    "adj_baro_f2_s3_low": "⚡ Poucos segundos",
    "adj_baro_f2_s3_high": "♾️ Muito tempo",
    "adj_baro_f2_s4_title": "🔄 Escala 4: Frequência",
    "adj_baro_f2_s4_desc": "Ordene as palavras de acordo com a frequência com que algo acontece:",
    "adj_baro_f2_s4_low": "🚫 Quase nunca",
    "adj_baro_f2_s4_high": "🔁 O tempo todo",
    "adj_baro_f2_s5_title": "🎯 Escala 5: Pontualidade e precisão",
    "adj_baro_f2_s5_desc": "Ordene do mais atrasado ao absolutamente pontual:",
    "adj_baro_f2_s5_low": "⚠️ Muito tarde",
    "adj_baro_f2_s5_high": "🎯 Bem na hora",
    "adj_baro_f2_s6_title": "📅 Escala 6: Linha do tempo",
    "adj_baro_f2_s6_desc": "Ordene as etapas de um processo do passado ao presente:",
    "adj_baro_f2_s6_low": "📜 Passado",
    "adj_baro_f2_s6_high": "📍 Agora mesmo",
    "adj_baro_f3_s1_title": "⭐ Escala 1: Qualidade",
    "adj_baro_f3_s1_desc": "Ordene as avaliações da pior para a melhor:",
    "adj_baro_f3_s1_low": "🗑️ Pior",
    "adj_baro_f3_s1_high": "🏆 Melhor",
    "adj_baro_f3_s2_title": "🧠 Escala 2: Grau de dificuldade",
    "adj_baro_f3_s2_desc": "Ordene as tarefas da mais fácil para a mais difícil:",
    "adj_baro_f3_s2_low": "👶 Mais fácil",
    "adj_baro_f3_s2_high": "🧩 Mais difícil",
    "adj_baro_f3_s3_title": "💰 Escala 3: Nível de preço",
    "adj_baro_f3_s3_desc": "Ordene por preço de gratuito a extremamente caro:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 Uma fortuna",
    "adj_baro_f3_s4_title": "📌 Escala 4: Importância e prioridade",
    "adj_baro_f3_s4_desc": "Ordene as informações de totalmente irrelevante a indispensável:",
    "adj_baro_f3_s4_low": "💤 Irrelevante",
    "adj_baro_f3_s4_high": "🚨 Indispensável",
    "adj_baro_f3_s5_title": "🔍 Escala 5: Integridade",
    "adj_baro_f3_s5_desc": "Ordene a qualidade do relatório de inútil a perfeita:",
    "adj_baro_f3_s5_low": "❌ Inútil",
    "adj_baro_f3_s5_high": "💯 Perfeito",
    "adj_baro_f3_s6_title": "⚙️ Escala 6: Complexidade",
    "adj_baro_f3_s6_desc": "Ordene as regras da mais simples para a mais complicada:",
    "adj_baro_f3_s6_low": "🔹 Mais simples",
    "adj_baro_f3_s6_high": "🌀 Mais complicada",
    "adj_baro_f4_s1_title": "😊 Escala 1: Alegria e humor",
    "adj_baro_f4_s1_desc": "Ordene as emoções da mais triste para a mais feliz:",
    "adj_baro_f4_s1_low": "😢 Desolado",
    "adj_baro_f4_s1_high": "🎉 Muito feliz",
    "adj_baro_f4_s2_title": "⚡ Escala 2: Energia e disposição",
    "adj_baro_f4_s2_desc": "Ordene o nível de energia de totalmente esgotado a cheio de energia:",
    "adj_baro_f4_s2_low": "🪫 Exausto",
    "adj_baro_f4_s2_high": "🔋 Cheio de energia",
    "adj_baro_f4_s3_title": "🧘 Escala 3: Calma vs. nervosismo",
    "adj_baro_f4_s3_desc": "Ordene do mais calmo ao mais assustado/em pânico:",
    "adj_baro_f4_s3_low": "🕊️ Completamente calmo",
    "adj_baro_f4_s3_high": "😱 Em pânico",
    "adj_baro_f4_s4_title": "🧸 Escala 4: Segurança e medo",
    "adj_baro_f4_s4_desc": "Ordene de completamente seguro a apavorado:",
    "adj_baro_f4_s4_low": "🛡️ Totalmente seguro",
    "adj_baro_f4_s4_high": "😨 Apavorado",
    "adj_baro_f4_s5_title": "💖 Escala 5: Gentileza",
    "adj_baro_f4_s5_desc": "Ordene o comportamento do mais hostil ao mais caloroso:",
    "adj_baro_f4_s5_low": "🧊 Hostil / frio",
    "adj_baro_f4_s5_high": "☀️ Caloroso",
    "adj_baro_f4_s6_title": "👍 Escala 6: Satisfação",
    "adj_baro_f4_s6_desc": "Ordene a reação do cliente de furiosa a entusiasmada:",
    "adj_baro_f4_s6_low": "😡 Furioso",
    "adj_baro_f4_s6_high": "🤩 Entusiasmado",
    "adj_baro_f5_s1_title": "🧽 Escala 1: Limpeza",
    "adj_baro_f5_s1_desc": "Ordene do mais sujo ao brilhando de limpo:",
    "adj_baro_f5_s1_low": "👞 Nojento / sujo",
    "adj_baro_f5_s1_high": "✨ Brilhando de limpo",
    "adj_baro_f5_s2_title": "🍎 Escala 2: Saúde e boa forma",
    "adj_baro_f5_s2_desc": "Ordene de gravemente doente a esbanjando saúde:",
    "adj_baro_f5_s2_low": "🤒 Gravemente doente",
    "adj_baro_f5_s2_high": "💪 Esbanjando saúde",
    "adj_baro_f5_s3_title": "💧 Escala 3: Umidade",
    "adj_baro_f5_s3_desc": "Ordene de completamente seco a encharcado:",
    "adj_baro_f5_s3_low": "🏜️ Completamente seco",
    "adj_baro_f5_s3_high": "🌊 Encharcado",
    "adj_baro_f5_s4_title": "💡 Escala 4: Nível de luz",
    "adj_baro_f5_s4_desc": "Ordene de escuridão total a claridade ofuscante:",
    "adj_baro_f5_s4_low": "🌑 Escuridão total",
    "adj_baro_f5_s4_high": "☀️ Claridade ofuscante",
    "adj_baro_f5_s5_title": "📊 Escala 5: Quantidade",
    "adj_baro_f5_s5_desc": "Ordene as quantidades de nenhuma a incontáveis:",
    "adj_baro_f5_s5_low": "0️⃣ Nenhuma",
    "adj_baro_f5_s5_high": "♾️ Incontáveis",
    "adj_baro_f5_s6_title": "🧭 Escala 6: Certeza e segurança",
    "adj_baro_f5_s6_desc": "Ordene de completamente incerto a certeza absoluta:",
    "adj_baro_f5_s6_low": "❓ Duvidoso",
    "adj_baro_f5_s6_high": "✔️ Cristalino",
    "top100_adj_hub_title": "Os 100 adjetivos mais comuns",
    "top100_adj_hub_desc": "Os adjetivos descrevem o mundo, adicionam nuances e expressam contrastes. Explore os 100 adjetivos dinamarqueses mais comuns divididos em 5 campos semânticos – e domine o guia completo de flexão no Campo 6!",
    "top100_adj_f1_badge": "🔬 Campo 1: 20 opostos mensuráveis",
    "top100_adj_f1_title": "1. Propriedades físicas, forma e sentidos",
    "top100_adj_f1_desc": "Abrange tudo o que pode ser medido, sentido ou percebido no dia a dia: <em>stor (grande) / lille (pequeno), lang (longo) / kort (curto), høj (alto) / lav (baixo), bred (largo) / smal (estreito), tung (pesado) / let (leve), varm (quente) / kold (frio), hård (duro) / blød (macio), fast (firme) / løs (solto), fuld (cheio) / tom (vazio), åben (aberto) / lukket (fechado)</em>.",
    "top100_adj_f1_btn": "Ir para o campo 1 ➔",
    "top100_adj_f2_badge": "⏱️ Campo 2: 20 adjetivos de tempo",
    "top100_adj_f2_title": "2. Tempo, idade e ritmo",
    "top100_adj_f2_desc": "Cronologia, desenvolvimento e velocidade no dia a dia: <em>ny (novo) / gammel (velho), ung (jovem) / gammel (velho), tidlig (cedo) / sen (tarde), hurtig (rápido) / langsom (lento), pludselig (repentino), forsinket (atrasado), travl (ocupado), rolig (calmo)...</em>",
    "top100_adj_f2_btn": "Ir para o campo 2 ➔",
    "top100_adj_f3_badge": "💎 Campo 3: 20 adjetivos de avaliação",
    "top100_adj_f3_title": "3. Qualidade, dificuldade e finanças",
    "top100_adj_f3_desc": "Avaliação, preços, esforço e valor: <em>god (bom) / dårlig (ruim), svær (difícil) / let (fácil), dyr (caro) / billig (barato), vigtig (importante) / ligegyldig (sem importância), nødvendig (necessário), gratis (grátis), perfekt (perfeito), forkert (errado)...</em>",
    "top100_adj_f3_btn": "Ir para o campo 3 ➔",
    "top100_adj_f4_badge": "❤️ Campo 4: 20 adjetivos sociais",
    "top100_adj_f4_title": "4. Emoções, personalidade e relacionamentos",
    "top100_adj_f4_desc": "Estados de espírito e interação social: <em>glad (feliz) / ked af det (triste), venlig (gentil) / uvenlig (hostil/antipático), træt (cansado) / frisk (disposto/fresco), tryg (seguro) / bange (assustado), sur (mal-humorado), sød (doce/meigo), stolt (orgulhoso), rolig (calmo)...</em>",
    "top100_adj_f4_btn": "Ir para o campo 4 ➔",
    "top100_adj_f5_badge": "🎨 Campo 5: 20 adjetivos de estado",
    "top100_adj_f5_title": "5. Cores, quantidades e estados",
    "top100_adj_f5_desc": "Estados visuais e práticos no dia a dia: <em>rød (vermelho), blå (azul), grøn (verde), hel (inteiro) / halv (metade/meio), mange (muitos) / få (poucos), ren (limpo) / beskidt (sujo), sund (saudável) / syg (doente), klar (pronto/claro), sikker (seguro), rigtig (certo/correto)...</em>",
    "top100_adj_f5_btn": "Ir para o campo 5 ➔",
    "top100_adj_f6_badge": "📏 Campo 6 • Mestre da flexão (graus de comparação e a regra do e)",
    "top100_adj_f6_title": "6. O grande guia de flexão: graus de comparação e a regra do e",
    "top100_adj_f6_desc": "Motor de flexão interativo completo: <strong>1. Positivo</strong> (<em>stor</em>) ➔ <strong>2. Comparativo</strong> com \"end\" (<em>større end</em>) ➔ <strong>3. Superlativo</strong> (<em>størst / den største</em>), além da fórmula de por que <em>den/min/denne/Peters</em> sempre exige <strong>-e</strong>!",
    "top100_adj_f6_btn": "Abrir o Guia de Flexão 📏 ➔",
    "top100_adj_ped_title": "💡 Como você aprende melhor os adjetivos?",
    "top100_adj_ped_item1_title": "⚖️ Opostos visuais",
    "top100_adj_ped_item1_desc": "Os adjetivos descrevem relações. Ao aprender <em>varm ↔ kold</em> juntos, ambas as palavras se fixam na rede semântica do cérebro na metade do tempo.",
    "top100_adj_ped_item2_title": "🧩 Concordância e flexão",
    "top100_adj_ped_item2_desc": "Um adjetivo nunca está sozinho – ele se flexiona em gênero e número: <em>en varm te</em> (gênero comum), <em>et varmt bad</em> (neutro: -t), <em>de varme dage</em> (plural: -e).",
    "top100_adj_ped_item3_title": "🌡️ Escala e intensidade",
    "top100_adj_ped_item3_desc": "Descubra a intensidade das palavras em um barômetro: de <em>iskold</em> (gelado) ➔ <em>kold</em> (frio) ➔ <em>lun</em> (morno) ➔ <em>varm</em> (quente) ➔ <em>kogende</em> (fervendo).",
    "adj_tab_1": "1. Estudo de contrastes",
    "adj_tab_2": "2. Encontre o oposto (duelo)",
    "adj_tab_3": "3. Sinônimos e nuances",
    "adj_tab_4": "4. Barômetro (escala)",
    "adj_tab_5": "5. Concordância (-t / -e)",
    "adj_tab_6": "6. Contexto e história",
    "adj_pure_label": "Ver imagem limpa:",
    "adj_listen_word": "Ouvir a palavra-alvo",
    "adj_listen_pronunciation": "Ouvir a pronúncia",
    "adj_modpol_label": "Oposto:",
    "adj_faelles_label": "Gênero comum (en ...)",
    "adj_intet_label": "Neutro (et ... / +t)",
    "adj_flertal_label": "Definido / Plural (+e)",
    "adj_example_sentence": "Frase simples:",
    "adj_status_on": "LIGADO",
    "adj_status_off": "DESLIGADO",
    "adj_click_hotspot_hint": "Clique em um ponto para ouvir a pronúncia e ver o oposto no outro cômodo!"
  },
  "tr": {
    "adj_baro_counter": "Barometre {current} / {total}",
    "adj_baro_step": "[ Adım {n} ]",
    "adj_baro_remove_tooltip": "Bu kelimeyi kaldırmak için tıklayın",
    "adj_baro_reset_btn": "Ölçeği sıfırla 🔄",
    "adj_baro_check_btn": "Sıralamayı kontrol et ✔️",
    "adj_baro_next_btn": "Sonraki ölçek ➔",
    "adj_baro_master_btn": "Barometrede ustalaştınız! 🏆",
    "adj_baro_success": "🎉 Kusursuz sıralama! Kelimeleri tam doğru sıraya yerleştirdiniz:",
    "adj_baro_wrong": "Henüz tam olmadı. Bazı kelimeler doğru sırada değil.",
    "adj_baro_hint": "İpucu: Önce en hafif durumu, en sona ise en yoğun durumu düşünün!",
    "adj_kongruens_subprompt": "Sıfatın doğru biçimini seçin:",
    "adj_grammar_banner_title": "Sıfatların tüm çekim kurallarını derinlemesine öğrenmek ister misiniz?",
    "adj_grammar_banner_desc": "Temel form, nötr (-t), belirli form ve çoğul (-e) ile dereceleme hakkında bilgi edinin.",
    "adj_grammar_banner_btn": "Çekim kılavuzuna git ➔",
    "adj_story_subprompt": "Duruma en uygun kelime hangisidir?",
    "adj_duel_counter": "⚔️ Düello {current} / {total}",
    "adj_nuance_counter": "🔄 Nüans {current} / {total}",
    "adj_kongruens_counter": "🧩 Uyum {current} / {total}",
    "adj_situation_counter": "📖 Durum {current} / {total}",
    "adj_score_label": "Puan:",
    "adj_next_duel": "Sonraki düello ➔",
    "adj_next_nuance": "Sonraki nüans ➔",
    "adj_next_kongruens": "Sonraki görev ➔",
    "adj_next_situation": "Sonraki durum ➔",
    "adj_result_duel_btn": "Sonucu gör ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Eş anlamlıları tamamla ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Çekim sonucunu gör ({score}/{total}) 🏆",
    "adj_result_story_btn": "Sonucu gör ({score}/{total}) 🌟",
    "adj_retry_btn": "Tekrar dene 🔄",
    "adj_correct_feedback": "🎉 Doğru!",
    "adj_wrong_feedback": "Tam olarak değil:",
    "adj_correct_answer_is": "Doğru cevap:",
    "adj_duel_modal_title": "Zıt Anlam Düellosunda harika iş çıkardınız!",
    "adj_duel_modal_score": "<strong>{total}</strong> zıt anlamlıdan <strong>{score}</strong> tanesini doğru bildiniz.",
    "adj_syn_modal_title": "Harika kelime dağarcığı!",
    "adj_syn_modal_score": "<strong>{total}</strong> nüanstan <strong>{score}</strong> tanesini doğru bildiniz.",
    "adj_kong_modal_title": "Sıfat ekleriyle harika bir çalışma!",
    "adj_kong_modal_score": "<strong>{total}</strong> ekten <strong>{score}</strong> tanesini doğru bildiniz.",
    "adj_story_modal_title": "Harika okuduğunu anlama!",
    "adj_story_modal_score": "<strong>{total}</strong> sorudan <strong>{score}</strong> tanesini doğru bildiniz.",
    "adj_f1_stage_warm": "☀️ Sıcak yuva (10 özellik)",
    "adj_f1_stage_cool": "❄️ Sağlam atölye (10 karşıtlık)",
    "adj_f2_stage_title": "⏱️ İstasyon ve hız (20 zaman sıfatı)",
    "adj_f3_stage_left": "💎 Değer ve mükemmellik",
    "adj_f3_stage_right": "⚙️ Zorluk derecesi ve karmaşıklık",
    "adj_f4_stage_left": "❤️ Sosyal yaşam ve neşe",
    "adj_f4_stage_right": "🌧️ Zorluklar ve rahatsızlık",
    "adj_f5_stage_left": "🌿 Temizlik, sağlık ve denge",
    "adj_f5_stage_right": "🌑 Dağınıklık, hastalık ve karanlık",
    "adj_baro_f1_s1_title": "🌡️ Ölçek 1: Sıcaklık",
    "adj_baro_f1_s1_desc": "Kelimeleri sıcaklığa göre en soğuktan en sıcağa doğru sıralayın:",
    "adj_baro_f1_s1_low": "🥶 En soğuk",
    "adj_baro_f1_s1_high": "🔥 En sıcak",
    "adj_baro_f1_s2_title": "📐 Ölçek 2: Boyut",
    "adj_baro_f1_s2_desc": "Kelimeleri boyuta göre en küçükten en büyüğe doğru sıralayın:",
    "adj_baro_f1_s2_low": "🔬 En küçük",
    "adj_baro_f1_s2_high": "🐘 En büyük",
    "adj_baro_f1_s3_title": "⚖️ Ölçek 3: Ağırlık",
    "adj_baro_f1_s3_desc": "Kelimeleri en hafiften en ağıra doğru sıralayın:",
    "adj_baro_f1_s3_low": "🪶 En hafif",
    "adj_baro_f1_s3_high": "🪨 En ağır",
    "adj_baro_f1_s4_title": "🛋️ Ölçek 4: Sertlik ve doku",
    "adj_baro_f1_s4_desc": "Kelimeleri en yumuşaktan en serte doğru sıralayın:",
    "adj_baro_f1_s4_low": "☁️ En yumuşak",
    "adj_baro_f1_s4_high": "💎 En sert",
    "adj_baro_f1_s5_title": "🫙 Ölçek 5: Hacim ve Doluluk",
    "adj_baro_f1_s5_desc": "Kelimeleri boştan doluya doğru sıralayın:",
    "adj_baro_f1_s5_low": "🫙 Tamamen boş",
    "adj_baro_f1_s5_high": "📦 Tamamen dolu",
    "adj_baro_f1_s6_title": "📏 Ölçek 6: Uzunluk ve süre",
    "adj_baro_f1_s6_desc": "Kelimeleri en kısadan en uzuna doğru sıralayın:",
    "adj_baro_f1_s6_low": "⚡ En kısa",
    "adj_baro_f1_s6_high": "♾️ En uzun",
    "adj_baro_f2_s1_title": "🏃 Ölçek 1: Hız ve tempo",
    "adj_baro_f2_s1_desc": "Kelimeleri hıza göre en yavaştan en hızlıya doğru sıralayın:",
    "adj_baro_f2_s1_low": "🐢 En yavaş",
    "adj_baro_f2_s1_high": "⚡ En hızlı",
    "adj_baro_f2_s2_title": "🎂 Ölçek 2: Yaş",
    "adj_baro_f2_s2_desc": "Kelimeleri en gençten en yaşlıya doğru sıralayın:",
    "adj_baro_f2_s2_low": "👶 En genç",
    "adj_baro_f2_s2_high": "👴 En yaşlı",
    "adj_baro_f2_s3_title": "⏳ Ölçek 3: Süre",
    "adj_baro_f2_s3_desc": "Etkinlikleri en kısa süreliden en uzun süreliye doğru sıralayın:",
    "adj_baro_f2_s3_low": "⚡ Birkaç saniye",
    "adj_baro_f2_s3_high": "♾️ Çok uzun zaman",
    "adj_baro_f2_s4_title": "🔄 Ölçek 4: Sıklık",
    "adj_baro_f2_s4_desc": "Kelimeleri bir şeyin ne sıklıkla gerçekleştiğine göre sıralayın:",
    "adj_baro_f2_s4_low": "🚫 Neredeyse hiçbir zaman",
    "adj_baro_f2_s4_high": "🔁 Sürekli",
    "adj_baro_f2_s5_title": "🎯 Ölçek 5: Dakiklik ve hassasiyet",
    "adj_baro_f2_s5_desc": "En çok gecikmiş olandan tam vaktinde olana doğru sıralayın:",
    "adj_baro_f2_s5_low": "⚠️ Çok geç",
    "adj_baro_f2_s5_high": "🎯 Tam vaktinde",
    "adj_baro_f2_s6_title": "📅 Ölçek 6: Güncellik / Zaman Çizelgesi",
    "adj_baro_f2_s6_desc": "Bir sürecin aşamalarını geçmişten günümüze doğru sıralayın:",
    "adj_baro_f2_s6_low": "📜 Geçmiş",
    "adj_baro_f2_s6_high": "📍 Tam şu an",
    "adj_baro_f3_s1_title": "⭐ Ölçek 1: Kalite",
    "adj_baro_f3_s1_desc": "Değerlendirmeleri en kötüden en iyiye doğru sıralayın:",
    "adj_baro_f3_s1_low": "🗑️ En kötü",
    "adj_baro_f3_s1_high": "🏆 En iyi",
    "adj_baro_f3_s2_title": "🧠 Ölçek 2: Zorluk derecesi",
    "adj_baro_f3_s2_desc": "Görevleri en kolaydan en zora doğru sıralayın:",
    "adj_baro_f3_s2_low": "👶 En kolay",
    "adj_baro_f3_s2_high": "🧩 En zor",
    "adj_baro_f3_s3_title": "💰 Ölçek 3: Fiyat düzeyi",
    "adj_baro_f3_s3_desc": "Fiyata göre ücretsizden aşırı pahalıya doğru sıralayın:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 Bir servet",
    "adj_baro_f3_s4_title": "📌 Ölçek 4: Önem ve öncelik",
    "adj_baro_f3_s4_desc": "Bilgileri tamamen önemsizden vazgeçilmeze doğru sıralayın:",
    "adj_baro_f3_s4_low": "💤 Önemsiz",
    "adj_baro_f3_s4_high": "🚨 Vazgeçilmez",
    "adj_baro_f3_s5_title": "🔍 Ölçek 5: Eksiksizlik",
    "adj_baro_f3_s5_desc": "Raporun kalitesini kullanışsızdan kusursuza doğru sıralayın:",
    "adj_baro_f3_s5_low": "❌ Kullanışsız",
    "adj_baro_f3_s5_high": "💯 Kusursuz",
    "adj_baro_f3_s6_title": "⚙️ Ölçek 6: Karmaşıklık",
    "adj_baro_f3_s6_desc": "Kuralları en basitten en karmaşığa doğru sıralayın:",
    "adj_baro_f3_s6_low": "🔹 En basit",
    "adj_baro_f3_s6_high": "🌀 En karmaşık",
    "adj_baro_f4_s1_title": "😊 Ölçek 1: Neşe ve ruh hali",
    "adj_baro_f4_s1_desc": "Duyguları en hüzünlüden en mutluya doğru sıralayın:",
    "adj_baro_f4_s1_low": "😢 Kalbi kırık",
    "adj_baro_f4_s1_high": "🎉 Çok mutlu",
    "adj_baro_f4_s2_title": "⚡ Ölçek 2: Enerji ve zindelik",
    "adj_baro_f4_s2_desc": "Enerji seviyesini tamamen tükenmişten enerji dolu olana doğru sıralayın:",
    "adj_baro_f4_s2_low": "🪫 Bitkin",
    "adj_baro_f4_s2_high": "🔋 Enerji dolu",
    "adj_baro_f4_s3_title": "🧘 Ölçek 3: Sakinlik ve gerginlik",
    "adj_baro_f4_s3_desc": "En sakinden en çok paniklemiş olana doğru sıralayın:",
    "adj_baro_f4_s3_low": "🕊️ Tamamen sakin",
    "adj_baro_f4_s3_high": "😱 Panik içinde",
    "adj_baro_f4_s4_title": "🧸 Ölçek 4: Güven ve korku",
    "adj_baro_f4_s4_desc": "Tamamen güvende olandan dehşete düşmüşe doğru sıralayın:",
    "adj_baro_f4_s4_low": "🛡️ Tamamen güvende",
    "adj_baro_f4_s4_high": "😨 Dehşete düşmüş",
    "adj_baro_f4_s5_title": "💖 Ölçek 5: Samimiyet",
    "adj_baro_f4_s5_desc": "Davranışları en soğuktan en içtene doğru sıralayın:",
    "adj_baro_f4_s5_low": "🧊 Soğuk / kaba",
    "adj_baro_f4_s5_high": "☀️ Sıcakkanlı",
    "adj_baro_f4_s6_title": "👍 Ölçek 6: Memnuniyet",
    "adj_baro_f4_s6_desc": "Müşteri tepkisini öfkeliden coşku doluya doğru sıralayın:",
    "adj_baro_f4_s6_low": "😡 Öfkeli",
    "adj_baro_f4_s6_high": "🤩 Coşkulu",
    "adj_baro_f5_s1_title": "🧽 Ölçek 1: Temizlik",
    "adj_baro_f5_s1_desc": "En kirliden pırıl pırıl temize doğru sıralayın:",
    "adj_baro_f5_s1_low": "👞 İğrenç / kirli",
    "adj_baro_f5_s1_high": "✨ Pırıl pırıl temiz",
    "adj_baro_f5_s2_title": "🍎 Ölçek 2: Sağlık ve form",
    "adj_baro_f5_s2_desc": "Ağır hastadan sapasağlam olana doğru sıralayın:",
    "adj_baro_f5_s2_low": "🤒 Ağır hasta",
    "adj_baro_f5_s2_high": "💪 Sapasağlam",
    "adj_baro_f5_s3_title": "💧 Ölçek 3: Nemlilik",
    "adj_baro_f5_s3_desc": "Kupkurudan sırılsıklama doğru sıralayın:",
    "adj_baro_f5_s3_low": "🏜️ Kupkuru",
    "adj_baro_f5_s3_high": "🌊 Sırılsıklam",
    "adj_baro_f5_s4_title": "💡 Ölçek 4: Işık seviyesi",
    "adj_baro_f5_s4_desc": "Zifiri karanlıktan göz alıcı aydınlığa doğru sıralayın:",
    "adj_baro_f5_s4_low": "🌑 Zifiri karanlık",
    "adj_baro_f5_s4_high": "☀️ Göz alıcı aydınlık",
    "adj_baro_f5_s5_title": "📊 Ölçek 5: Miktar",
    "adj_baro_f5_s5_desc": "Miktarları hiç yoktan sayısız olana doğru sıralayın:",
    "adj_baro_f5_s5_low": "0️⃣ Hiç",
    "adj_baro_f5_s5_high": "♾️ Sayısız",
    "adj_baro_f5_s6_title": "🧭 Ölçek 6: Kesinlik ve güvenilirlik",
    "adj_baro_f5_s6_desc": "Tamamen belirsizden apaçık kesinliğe doğru sıralayın:",
    "adj_baro_f5_s6_low": "❓ Şüpheli",
    "adj_baro_f5_s6_high": "✔️ Apaçık",
    "top100_adj_hub_title": "En Çok Kullanılan 100 Sıfat",
    "top100_adj_hub_desc": "Sıfatlar dünyayı tanımlar, nüanslar katar ve zıtlıkları ifade eder. 5 anlamsal alana ayrılmış en yaygın 100 Danca sıfatı keşfedin – ve Alan 6'daki eksiksiz çekim kılavuzunda ustalaşın!",
    "top100_adj_f1_badge": "🔬 Alan 1: 20 ölçülebilir zıtlık",
    "top100_adj_f1_title": "1. Fiziksel özellikler, biçim ve duyular",
    "top100_adj_f1_desc": "Günlük hayatta ölçülebilen, hissedilebilen veya algılanabilen her şeyi kapsar: <em>stor (büyük) / lille (küçük), lang (uzun) / kort (kısa), høj (yüksek/uzun) / lav (alçak/kısa), bred (geniş) / smal (dar), tung (ağır) / let (hafif), varm (sıcak) / kold (soğuk), hård (sert) / blød (yumuşak), fast (sıkı/sabit) / løs (gevşek), fuld (dolu) / tom (boş), åben (açık) / lukket (kapalı)</em>.",
    "top100_adj_f1_btn": "Alan 1'e git ➔",
    "top100_adj_f2_badge": "⏱️ Alan 2: 20 zaman sıfatı",
    "top100_adj_f2_title": "2. Zaman, yaş ve tempo",
    "top100_adj_f2_desc": "Günlük hayatta kronoloji, gelişim ve hız: <em>ny (yeni) / gammel (eski), ung (genç) / gammel (yaşlı), tidlig (erken) / sen (geç), hurtig (hızlı) / langsom (yavaş), pludselig (ani), forsinket (gecikmiş), travl (meşgul), rolig (sakin)...</em>",
    "top100_adj_f2_btn": "Alan 2'ye git ➔",
    "top100_adj_f3_badge": "💎 Alan 3: 20 değerlendirme sıfatı",
    "top100_adj_f3_title": "3. Kalite, zorluk derecesi ve ekonomi",
    "top100_adj_f3_desc": "Değerlendirme, fiyatlar, emek ve değer: <em>god (iyi) / dårlig (kötü), svær (zor) / let (kolay), dyr (pahalı) / billig (ucuz), vigtig (önemli) / ligegyldig (önemsiz), nødvendig (gerekli), gratis (ücretsiz), perfekt (mükemmel), forkert (yanlış)...</em>",
    "top100_adj_f3_btn": "Alan 3'e git ➔",
    "top100_adj_f4_badge": "❤️ Alan 4: 20 sosyal sıfat",
    "top100_adj_f4_title": "4. Duygular, kişilik ve ilişkiler",
    "top100_adj_f4_desc": "İnsanların ruh halleri ve sosyal iletişim: <em>glad (mutlu) / ked af det (üzgün), venlig (dost canlısı/kibar) / uvenlig (kaba/soğuk), træt (yorgun) / frisk (dinç/zinde), tryg (güvende) / bange (korkmuş), sur (huysuz/kızgın), sød (tatlı/şirin), stolt (gururlu), rolig (sakin)...</em>",
    "top100_adj_f4_btn": "Alan 4'e git ➔",
    "top100_adj_f5_badge": "🎨 Alan 5: 20 durum sıfatı",
    "top100_adj_f5_title": "5. Renkler, miktarlar ve durumlar",
    "top100_adj_f5_desc": "Günlük hayatta görsel ve pratik durumlar: <em>rød (kırmızı), blå (mavi), grøn (yeşil), hel (bütün/tam) / halv (yarım), mange (çok) / få (az), ren (temiz) / beskidt (kirli), sund (sağlıklı) / syg (hasta), klar (hazır/net), sikker (güvenli/emin), rigtig (doğru)...</em>",
    "top100_adj_f5_btn": "Alan 5'e git ➔",
    "top100_adj_f6_badge": "📏 Alan 6 • Çekim Ustası (derecelendirme ve e-kuralı)",
    "top100_adj_f6_title": "6. Büyük çekim kılavuzu: derecelendirme ve e-kuralı",
    "top100_adj_f6_desc": "Eksiksiz etkileşimli çekim motoru: <strong>1. Pozitif</strong> (<em>stor</em>) ➔ <strong>2. \"end\" ile Komparatif</strong> (<em>større end</em>) ➔ <strong>3. Süperlatif</strong> (<em>størst / den største</em>), ayrıca <em>den/min/denne/Peters</em> kelimelerinin neden her zaman <strong>-e</strong> ekini zorunlu kıldığının formülü!",
    "top100_adj_f6_btn": "Çekim Kılavuzunu Aç 📏 ➔",
    "top100_adj_ped_title": "💡 Sıfatları en iyi nasıl öğrenirsiniz?",
    "top100_adj_ped_item1_title": "⚖️ Görsel Zıtlıklar",
    "top100_adj_ped_item1_desc": "Sıfatlar ilişkileri tanımlar. <em>varm ↔ kold</em> kelimelerini birlikte öğrenerek, her iki sözcük de beynin anlamsal ağına yarı zamanda yerleşir.",
    "top100_adj_ped_item2_title": "🧩 Uyum ve Çekim",
    "top100_adj_ped_item2_desc": "Bir sıfat asla yalnız durmaz – cinsiyete ve sayıya göre çekimlenir: <em>en varm te</em> (ortak cins), <em>et varmt bad</em> (nötr: -t), <em>de varme dage</em> (çoğul: -e).",
    "top100_adj_ped_item3_title": "🌡️ Ölçek ve Yoğunluk",
    "top100_adj_ped_item3_desc": "Kelimelerin gücünü bir barometre üzerinde keşfedin: <em>iskold</em> (buz gibi) ➔ <em>kold</em> (soğuk) ➔ <em>lun</em> (ılık) ➔ <em>varm</em> (sıcak) ➔ <em>kogende</em> (kaynar).",
    "adj_tab_1": "1. Zıtlık Çalışması",
    "adj_tab_2": "2. Zıttını Bul (düello)",
    "adj_tab_3": "3. Eş Anlamlılar ve Nüanslar",
    "adj_tab_4": "4. Barometre (ölçek)",
    "adj_tab_5": "5. Uyum (-t / -e)",
    "adj_tab_6": "6. Bağlam ve Hikaye",
    "adj_pure_label": "Sade resmi gör:",
    "adj_listen_word": "Hedef sözcüğü dinle",
    "adj_listen_pronunciation": "Telaffuzu dinle",
    "adj_modpol_label": "Zıt anlam:",
    "adj_faelles_label": "Ortak cins (en ...)",
    "adj_intet_label": "Nötr (et ... / +t)",
    "adj_flertal_label": "Belirli / Çoğul (+e)",
    "adj_example_sentence": "Basit cümle:",
    "adj_status_on": "AÇIK",
    "adj_status_off": "KAPALI",
    "adj_click_hotspot_hint": "Telaffuzu dinlemek ve karşı odadaki zıttını görmek için bir noktaya tıklayın!"
  },
  "ar": {
    "adj_baro_counter": "البارومتر {current} من {total}",
    "adj_baro_step": "[ الخطوة {n} ]",
    "adj_baro_remove_tooltip": "انقر لإزالة هذه الكلمة",
    "adj_baro_reset_btn": "إعادة ضبط المقياس 🔄",
    "adj_baro_check_btn": "تحقق من الترتيب ✔️",
    "adj_baro_next_btn": "المقياس التالي ➔",
    "adj_baro_master_btn": "لقد أتقنت مقياس البارومتر! 🏆",
    "adj_baro_success": "🎉 ترتيب مثالي! لقد وضعت الكلمات بالترتيب الصحيح تمامًا:",
    "adj_baro_wrong": "لم تصل إلى الهدف تمامًا بعد. بعض الكلمات ليست في الترتيب الصحيح.",
    "adj_baro_hint": "نصيحة: فكّر في الحالة الأخف أولاً والأكثر شدة في النهاية!",
    "adj_kongruens_subprompt": "اختر الصيغة الصحيحة للصفة:",
    "adj_grammar_banner_title": "هل تريد تعلم جميع قواعد تصريف الصفات بشكل شامل؟",
    "adj_grammar_banner_desc": "تعلم عن الصيغة الأساسية، والمحايد (-t)، وصيغة المعرفة والجمع (-e)، بالإضافة إلى صيغ التفضيل.",
    "adj_grammar_banner_btn": "انتقل إلى دليل التصريف ➔",
    "adj_story_subprompt": "أي كلمة تناسب هذا الموقف بشكل أفضل؟",
    "adj_duel_counter": "⚔️ المواجهة {current} من {total}",
    "adj_nuance_counter": "🔄 الفارق الدلالي {current} من {total}",
    "adj_kongruens_counter": "🧩 التطابق {current} من {total}",
    "adj_situation_counter": "📖 الموقف {current} من {total}",
    "adj_score_label": "النقاط:",
    "adj_next_duel": "المواجهة التالية ➔",
    "adj_next_nuance": "الفارق التالي ➔",
    "adj_next_kongruens": "المهمة التالية ➔",
    "adj_next_situation": "الموقف التالي ➔",
    "adj_result_duel_btn": "عرض النتيجة ({score}/{total}) 🏆",
    "adj_result_syn_btn": "إنهاء المترادفات ({score}/{total}) 🌟",
    "adj_result_kong_btn": "عرض نتيجة التصريف ({score}/{total}) 🏆",
    "adj_result_story_btn": "عرض النتيجة ({score}/{total}) 🌟",
    "adj_retry_btn": "حاول مرة أخرى 🔄",
    "adj_correct_feedback": "🎉 صحيح!",
    "adj_wrong_feedback": "ليس تمامًا:",
    "adj_correct_answer_is": "الإجابة الصحيحة هي:",
    "adj_duel_modal_title": "أحسنت في مواجهة الأضداد!",
    "adj_duel_modal_score": "حصلت على <strong>{score}</strong> من أصل <strong>{total}</strong> من الأضداد الصحيحة.",
    "adj_syn_modal_title": "حصيلة لغوية رائعة!",
    "adj_syn_modal_score": "حصلت على <strong>{score}</strong> من أصل <strong>{total}</strong> من الفروق الدلالية الصحيحة.",
    "adj_kong_modal_title": "عمل رائع في تصريف الصفات!",
    "adj_kong_modal_score": "حصلت على <strong>{score}</strong> من أصل <strong>{total}</strong> من النهايات الصحيحة.",
    "adj_story_modal_title": "استيعاب قرائي رائع!",
    "adj_story_modal_score": "حصلت على <strong>{score}</strong> من أصل <strong>{total}</strong> من الإجابات الصحيحة.",
    "adj_f1_stage_warm": "☀️ المنزل الدافئ (10 خصائص)",
    "adj_f1_stage_cool": "❄️ الورشة المتينة (10 أضداد)",
    "adj_f2_stage_title": "⏱️ المحطة والسرعة (20 صفة زمنية)",
    "adj_f3_stage_left": "💎 القيمة والكمال",
    "adj_f3_stage_right": "⚙️ درجة الصعوبة والتعقيد",
    "adj_f4_stage_left": "❤️ الحياة الاجتماعية والبهجة",
    "adj_f4_stage_right": "🌧️ الشدائد والانزعاج",
    "adj_f5_stage_left": "🌿 النظافة والصحة والتوازن",
    "adj_f5_stage_right": "🌑 الفوضى والمرض والظلام",
    "adj_baro_f1_s1_title": "🌡️ المقياس 1: درجة الحرارة",
    "adj_baro_f1_s1_desc": "رتّب الكلمات حسب درجة الحرارة من الأبرد إلى الأكثر دفئًا:",
    "adj_baro_f1_s1_low": "🥶 الأبرد",
    "adj_baro_f1_s1_high": "🔥 الأكثر دفئًا",
    "adj_baro_f1_s2_title": "📐 المقياس 2: الحجم",
    "adj_baro_f1_s2_desc": "رتّب الكلمات حسب الحجم من الأصغر إلى الأكبر:",
    "adj_baro_f1_s2_low": "🔬 الأصغر",
    "adj_baro_f1_s2_high": "🐘 الأكبر",
    "adj_baro_f1_s3_title": "⚖️ المقياس 3: الوزن",
    "adj_baro_f1_s3_desc": "رتّب الكلمات من الأخف إلى الأثقل:",
    "adj_baro_f1_s3_low": "🪶 الأخف",
    "adj_baro_f1_s3_high": "🪨 الأثقل",
    "adj_baro_f1_s4_title": "🛋️ المقياس 4: الصلابة والملمس",
    "adj_baro_f1_s4_desc": "رتّب الكلمات من الأكثر ليونة إلى الأكثر صلابة:",
    "adj_baro_f1_s4_low": "☁️ الأكثر ليونة",
    "adj_baro_f1_s4_high": "💎 الأكثر صلابة",
    "adj_baro_f1_s5_title": "🫙 المقياس 5: السعة والامتلاء",
    "adj_baro_f1_s5_desc": "رتّب الكلمات من الفارغ إلى الممتلئ:",
    "adj_baro_f1_s5_low": "🫙 فارغ تمامًا",
    "adj_baro_f1_s5_high": "📦 ممتلئ تمامًا",
    "adj_baro_f1_s6_title": "📏 المقياس 6: الطول والمدة",
    "adj_baro_f1_s6_desc": "رتّب الكلمات من الأقصر إلى الأطول:",
    "adj_baro_f1_s6_low": "⚡ الأقصر",
    "adj_baro_f1_s6_high": "♾️ الأطول",
    "adj_baro_f2_s1_title": "🏃 المقياس 1: السرعة والوتيرة",
    "adj_baro_f2_s1_desc": "رتّب الكلمات حسب السرعة من الأبطأ إلى الأسرع:",
    "adj_baro_f2_s1_low": "🐢 الأبطأ",
    "adj_baro_f2_s1_high": "⚡ الأسرع",
    "adj_baro_f2_s2_title": "🎂 المقياس 2: العمر",
    "adj_baro_f2_s2_desc": "رتّب الكلمات من الأصغر سنًا إلى الأكبر سنًا:",
    "adj_baro_f2_s2_low": "👶 الأصغر سنًا",
    "adj_baro_f2_s2_high": "👴 الأكبر سنًا",
    "adj_baro_f2_s3_title": "⏳ المقياس 3: المدة",
    "adj_baro_f2_s3_desc": "رتّب الأحداث من الأقصر مدة إلى الأطول مدة:",
    "adj_baro_f2_s3_low": "⚡ بضع ثوانٍ",
    "adj_baro_f2_s3_high": "♾️ وقت طويل جدًا",
    "adj_baro_f2_s4_title": "🔄 المقياس 4: التكرار",
    "adj_baro_f2_s4_desc": "رتّب الكلمات حسب وتيرة حدوث الشيء:",
    "adj_baro_f2_s4_low": "🚫 نادرًا جدًا",
    "adj_baro_f2_s4_high": "🔁 طوال الوقت",
    "adj_baro_f2_s5_title": "🎯 المقياس 5: الالتزام بالمواعيد والدقة",
    "adj_baro_f2_s5_desc": "رتّب من الأكثر تأخيرًا إلى الدقيق تمامًا في الموعد:",
    "adj_baro_f2_s5_low": "⚠️ متأخر جدًا",
    "adj_baro_f2_s5_high": "🎯 في الوقت المحدد تمامًا",
    "adj_baro_f2_s6_title": "📅 المقياس 6: الخط الزمني والحداثة",
    "adj_baro_f2_s6_desc": "رتّب مراحل العملية من الماضي إلى الحاضر:",
    "adj_baro_f2_s6_low": "📜 الماضي",
    "adj_baro_f2_s6_high": "📍 الآن تحديدًا",
    "adj_baro_f3_s1_title": "⭐ المقياس 1: الجودة",
    "adj_baro_f3_s1_desc": "رتّب التقييمات من الأسوأ إلى الأفضل:",
    "adj_baro_f3_s1_low": "🗑️ الأسوأ",
    "adj_baro_f3_s1_high": "🏆 الأفضل",
    "adj_baro_f3_s2_title": "🧠 المقياس 2: درجة الصعوبة",
    "adj_baro_f3_s2_desc": "رتّب المهام من الأسهل إلى الأصعب:",
    "adj_baro_f3_s2_low": "👶 الأسهل",
    "adj_baro_f3_s2_high": "🧩 الأصعب",
    "adj_baro_f3_s3_title": "💰 المقياس 3: مستوى الأسعار",
    "adj_baro_f3_s3_desc": "رتّب حسب السعر من المجاني تمامًا إلى الباهظ للغاية:",
    "adj_baro_f3_s3_low": "🪙 0 كرونة",
    "adj_baro_f3_s3_high": "💎 ثروة طائلة",
    "adj_baro_f3_s4_title": "📌 المقياس 4: الأهمية والأولوية",
    "adj_baro_f3_s4_desc": "رتّب المعلومات من غير المهمة تمامًا إلى التي لا غنى عنها:",
    "adj_baro_f3_s4_low": "💤 غير مهم",
    "adj_baro_f3_s4_high": "🚨 لا غنى عنه",
    "adj_baro_f3_s5_title": "🔍 المقياس 5: الاكتمال",
    "adj_baro_f3_s5_desc": "رتّب جودة التقرير من عديم الفائدة إلى المثالي:",
    "adj_baro_f3_s5_low": "❌ عديم الفائدة",
    "adj_baro_f3_s5_high": "💯 مثالي",
    "adj_baro_f3_s6_title": "⚙️ المقياس 6: التعقيد",
    "adj_baro_f3_s6_desc": "رتّب القواعد من الأبسط إلى الأكثر تعقيدًا:",
    "adj_baro_f3_s6_low": "🔹 الأبسط",
    "adj_baro_f3_s6_high": "🌀 الأكثر تعقيدًا",
    "adj_baro_f4_s1_title": "😊 المقياس 1: الفرح والمزاج",
    "adj_baro_f4_s1_desc": "رتّب المشاعر من الأكثر حزنًا إلى الأكثر سعادة:",
    "adj_baro_f4_s1_low": "😢 محطم الفؤاد",
    "adj_baro_f4_s1_high": "🎉 في غاية السعادة",
    "adj_baro_f4_s2_title": "⚡ المقياس 2: الطاقة والنشاط",
    "adj_baro_f4_s2_desc": "رتّب مستوى الطاقة من المرهق تمامًا إلى المفعم بالحيوية والنشاط:",
    "adj_baro_f4_s2_low": "🪫 منهك",
    "adj_baro_f4_s2_high": "🔋 مفعم بالحيوية",
    "adj_baro_f4_s3_title": "🧘 المقياس 3: الهدوء مقابل القلق",
    "adj_baro_f4_s3_desc": "رتّب من الأكثر هدوءًا إلى الأكثر خوفًا وذعرًا:",
    "adj_baro_f4_s3_low": "🕊️ هادئ تمامًا",
    "adj_baro_f4_s3_high": "😱 مذعور",
    "adj_baro_f4_s4_title": "🧸 المقياس 4: الأمان والخوف",
    "adj_baro_f4_s4_desc": "رتّب من الآمن تمامًا إلى المرتعب:",
    "adj_baro_f4_s4_low": "🛡️ آمن تمامًا",
    "adj_baro_f4_s4_high": "😨 مرعوب",
    "adj_baro_f4_s5_title": "💖 المقياس 5: اللطف والود",
    "adj_baro_f4_s5_desc": "رتّب السلوك من الأكثر جفاءً إلى الأكثر دفئًا ولطفًا:",
    "adj_baro_f4_s5_low": "🧊 فظ / بارد",
    "adj_baro_f4_s5_high": "☀️ دافئ القلب / ودود",
    "adj_baro_f4_s6_title": "👍 المقياس 6: الرضا",
    "adj_baro_f4_s6_desc": "رتّب رد فعل العميل من الغاضب إلى المتحمس للغاية:",
    "adj_baro_f4_s6_low": "😡 غاضب بشدة",
    "adj_baro_f4_s6_high": "🤩 متحمس للغاية",
    "adj_baro_f5_s1_title": "🧽 المقياس 1: النظافة",
    "adj_baro_f5_s1_desc": "رتّب من الأكثر اتساخًا إلى ناصع النظافة:",
    "adj_baro_f5_s1_low": "👞 مقزز / متسخ",
    "adj_baro_f5_s1_high": "✨ ناصع النظافة",
    "adj_baro_f5_s2_title": "🍎 المقياس 2: الصحة واللياقة",
    "adj_baro_f5_s2_desc": "رتّب من شديد المرض إلى مفعم بالصحة والعافية:",
    "adj_baro_f5_s2_low": "🤒 مريض بشدة",
    "adj_baro_f5_s2_high": "💪 مفعم بالصحة والعافية",
    "adj_baro_f5_s3_title": "💧 المقياس 3: الرطوبة",
    "adj_baro_f5_s3_desc": "رتّب من الجاف تمامًا إلى المبتل كليًا:",
    "adj_baro_f5_s3_low": "🏜️ جاف تمامًا",
    "adj_baro_f5_s3_high": "🌊 مبتل كليًا",
    "adj_baro_f5_s4_title": "💡 المقياس 4: مستوى الإضاءة",
    "adj_baro_f5_s4_desc": "رتّب من شديد الظلام إلى الساطع المبهر:",
    "adj_baro_f5_s4_low": "🌑 شديد الظلام",
    "adj_baro_f5_s4_high": "☀️ ساطع ومبهر",
    "adj_baro_f5_s5_title": "📊 المقياس 5: الكمية",
    "adj_baro_f5_s5_desc": "رتّب الكميات من لا شيء إلى ما لا يُحصى:",
    "adj_baro_f5_s5_low": "0️⃣ لا شيء",
    "adj_baro_f5_s5_high": "♾️ لا يُحصى",
    "adj_baro_f5_s6_title": "🧭 المقياس 6: اليقين والتأكيد",
    "adj_baro_f5_s6_desc": "رتّب من غير المؤكد تمامًا إلى اليقين القاطع:",
    "adj_baro_f5_s6_low": "❓ مشكوك فيه",
    "adj_baro_f5_s6_high": "✔️ واضح وضوح الشمس",
    "top100_adj_hub_title": "أكثر 100 صفة شائعة",
    "top100_adj_hub_desc": "تصف الصفات العالم، وتضفي الفروق الدقيقة، وتعبّر عن التناقضات. استكشف أكثر 100 صفة دنماركية شيوعاً مقسمة إلى 5 مجالات دلالية – وأتقن دليل التصريف الشامل في الحقل 6!",
    "top100_adj_f1_badge": "🔬 الحقل 1: 20 زوجاً من الأضداد القابلة للقياس",
    "top100_adj_f1_title": "1. الخصائص المادية والشكل والحواس",
    "top100_adj_f1_desc": "يغطي كل ما يمكن قياسه أو لمسه أو الإحساس به في الحياة اليومية: <em>stor (كبير) / lille (صغير)، lang (طويل) / kort (قصير)، høj (طويل/مرتفع) / lav (قصير/منخفض)، bred (عريض/واسع) / smal (ضيق)، tung (ثقيل) / let (خفيف)، varm (دافئ/ساخن) / kold (بارد)، hård (صلب/قاسٍ) / blød (ناعم/طري)، fast (ثابت/متماسك) / løs (مرتخٍ/سائب)، fuld (ممتلئ) / tom (فارغ)، åben (مفتوح) / lukket (مغلق)</em>.",
    "top100_adj_f1_btn": "الانتقال إلى الحقل 1 ➔",
    "top100_adj_f2_badge": "⏱️ الحقل 2: 20 صفة للوقت والزمن",
    "top100_adj_f2_title": "2. الوقت والعمر والوتيرة",
    "top100_adj_f2_desc": "التسلسل الزمني والتطور والسرعة في الحياة اليومية: <em>ny (جديد) / gammel (قديم)، ung (شاب) / gammel (مسن)، tidlig (مبكر) / sen (متأخر)، hurtig (سريع) / langsom (بطيء)، pludselig (مفاجئ)، forsinket (متأخر)، travl (مشغول)، rolig (هادئ)...</em>",
    "top100_adj_f2_btn": "الانتقال إلى الحقل 2 ➔",
    "top100_adj_f3_badge": "💎 الحقل 3: 20 صفة للتقييم",
    "top100_adj_f3_title": "3. الجودة ودرجة الصعوبة والاقتصاد",
    "top100_adj_f3_desc": "التقييم والأسعار والجهد والقيمة: <em>god (جيد) / dårlig (سيئ)، svær (صعب) / let (سهل)، dyr (غالٍ) / billig (رخيص)، vigtig (مهم) / ligegyldig (غير مهم)، nødvendig (ضروري)، gratis (مجاني)، perfekt (مثالي)، forkert (خاطئ)...</em>",
    "top100_adj_f3_btn": "الانتقال إلى الحقل 3 ➔",
    "top100_adj_f4_badge": "❤️ الحقل 4: 20 صفة اجتماعية",
    "top100_adj_f4_title": "4. المشاعر والشخصية والعلاقات",
    "top100_adj_f4_desc": "الحالات النفسية والتواصل الاجتماعي بين الناس: <em>glad (سعيد) / ked af det (حزين)، venlig (ودود) / uvenlig (غير ودود)، træt (متعب) / frisk (نشيط)، tryg (آمن/مطمئن) / bange (خائف)، sur (منزعج/غاضب)، sød (لطيف/حلو)، stolt (فخور)، rolig (هادئ)...</em>",
    "top100_adj_f4_btn": "الانتقال إلى الحقل 4 ➔",
    "top100_adj_f5_badge": "🎨 الحقل 5: 20 صفة للحالات والظروف",
    "top100_adj_f5_title": "5. الألوان والكميات والحالات",
    "top100_adj_f5_desc": "الحالات البصرية والعملية في الحياة اليومية: <em>rød (أحمر)، blå (أزرق)، grøn (أخضر)، hel (كامل) / halv (نصف)، mange (كثير) / få (قليل)، ren (نظيف) / beskidt (متسخ)، sund (صحي) / syg (مريض)، klar (جاهز/واضح)، sikker (آمن/متأكد)، rigtig (صحيح)...</em>",
    "top100_adj_f5_btn": "الانتقال إلى الحقل 5 ➔",
    "top100_adj_f6_badge": "📏 الحقل 6 • خبير التصريف (درجات المقارنة وقاعدة e)",
    "top100_adj_f6_title": "6. دليل التصريف الكبير: درجات المقارنة وقاعدة e",
    "top100_adj_f6_desc": "محرك تصريف تفاعلي شامل: <strong>1. Positiv (الصفة الأصلية)</strong> (<em>stor</em>) ➔ <strong>2. Komparativ (المقارنة)</strong> مع \"end\" (<em>større end</em>) ➔ <strong>3. Superlativ (التفضيل)</strong> (<em>størst / den største</em>)، بالإضافة إلى القاعدة التي تفسر لماذا تفرض <em>den/min/denne/Peters</em> دائماً إضافة <strong>-e</strong>!",
    "top100_adj_f6_btn": "افتح دليل التصريف 📏 ➔",
    "top100_adj_ped_title": "💡 كيف تتعلم الصفات بأفضل طريقة؟",
    "top100_adj_ped_item1_title": "⚖️ الأضداد البصرية",
    "top100_adj_ped_item1_desc": "تصف الصفات العلاقات. من خلال تعلم <em>varm ↔ kold</em> معاً، ترسخ كلتا الكلمتين في الشبكة الدلالية للدماغ في نصف الوقت.",
    "top100_adj_ped_item2_title": "🧩 المطابقة والتصريف",
    "top100_adj_ped_item2_desc": "لا تأتي الصفة بمفردها أبداً – بل تُصرّف حسب الجنس والعدد: <em>en varm te</em> (الجنس المشترك)، <em>et varmt bad</em> (الجنس المحايد: -t)، <em>de varme dage</em> (الجمع: -e).",
    "top100_adj_ped_item3_title": "🌡️ المقياس والشدة",
    "top100_adj_ped_item3_desc": "اكتشف قوة الكلمات على مقياس التدرج: من <em>iskold</em> (شديد البرودة) ➔ <em>kold</em> (بارد) ➔ <em>lun</em> (فاتر) ➔ <em>varm</em> (دافئ) ➔ <em>kogende</em> (يغلي).",
    "adj_tab_1": "1. دراسة الأضداد",
    "adj_tab_2": "2. اعثر على الضد (مبارزة)",
    "adj_tab_3": "3. المترادفات والفروق الدقيقة",
    "adj_tab_4": "4. مقياس التدرج (البارومتر)",
    "adj_tab_5": "5. المطابقة والتوافق (-t / -e)",
    "adj_tab_6": "6. السياق والقصة",
    "adj_pure_label": "عرض الصورة فقط:",
    "adj_listen_word": "استمع إلى الكلمة المستهدفة",
    "adj_listen_pronunciation": "استمع إلى النطق",
    "adj_modpol_label": "الضد:",
    "adj_faelles_label": "الجنس المشترك (en ...)",
    "adj_intet_label": "الجنس المحايد (et ... / +t)",
    "adj_flertal_label": "المعرّف / الجمع (+e)",
    "adj_example_sentence": "جملة بسيطة:",
    "adj_status_on": "تشغيل",
    "adj_status_off": "إيقاف",
    "adj_click_hotspot_hint": "انقر فوق نقطة لسماع النطق ورؤية ضدها في الغرفة المقابلة!"
  },
  "fa": {
    "adj_baro_counter": "بارومتر {current} از {total}",
    "adj_baro_step": "[ مرحله {n} ]",
    "adj_baro_remove_tooltip": "برای حذف این کلمه کلیک کنید",
    "adj_baro_reset_btn": "بازنشانی مقیاس 🔄",
    "adj_baro_check_btn": "بررسی ترتیب ✔️",
    "adj_baro_next_btn": "مقیاس بعدی ➔",
    "adj_baro_master_btn": "شما بر بارومتر مسلط شدید! 🏆",
    "adj_baro_success": "🎉 مرتب‌سازی بی‌نقص! کلمات را دقیقاً با ترتیب درست قرار دادید:",
    "adj_baro_wrong": "هنوز کاملاً درست نیست. برخی از کلمات در ترتیب درست قرار ندارند.",
    "adj_baro_hint": "نکته: ابتدا به ملایم‌ترین حالت و در پایان به شدیدترین حالت فکر کنید!",
    "adj_kongruens_subprompt": "شکل صحیح صفت را انتخاب کنید:",
    "adj_grammar_banner_title": "آیا می‌خواهید تمام قواعد صرف صفت‌ها را به طور کامل یاد بگیرید؟",
    "adj_grammar_banner_desc": "درباره شکل پایه، حالت خنثی (-t)، شکل معرفه و جمع (-e) و همچنین درجه‌بندی صفت‌ها یاد بگیرید.",
    "adj_grammar_banner_btn": "رفتن به راهنمای صرف ➔",
    "adj_story_subprompt": "کدام کلمه برای این موقعیت مناسب‌تر است؟",
    "adj_duel_counter": "⚔️ دوئل {current} از {total}",
    "adj_nuance_counter": "🔄 تفاوت ظریف {current} از {total}",
    "adj_kongruens_counter": "🧩 مطابقت {current} از {total}",
    "adj_situation_counter": "📖 موقعیت {current} از {total}",
    "adj_score_label": "امتیاز:",
    "adj_next_duel": "دوئل بعدی ➔",
    "adj_next_nuance": "تفاوت بعدی ➔",
    "adj_next_kongruens": "تمرین بعدی ➔",
    "adj_next_situation": "موقعیت بعدی ➔",
    "adj_result_duel_btn": "مشاهده نتیجه ({score}/{total}) 🏆",
    "adj_result_syn_btn": "پایان مترادف‌ها ({score}/{total}) 🌟",
    "adj_result_kong_btn": "مشاهده نتیجه صرف ({score}/{total}) 🏆",
    "adj_result_story_btn": "مشاهده نتیجه ({score}/{total}) 🌟",
    "adj_retry_btn": "تلاش مجدد 🔄",
    "adj_correct_feedback": "🎉 درست است!",
    "adj_wrong_feedback": "نه کاملاً:",
    "adj_correct_answer_is": "پاسخ صحیح این است:",
    "adj_duel_modal_title": "آفرین در دوئل متضادها!",
    "adj_duel_modal_score": "شما <strong>{score}</strong> از <strong>{total}</strong> متضاد را درست پاسخ دادید.",
    "adj_syn_modal_title": "دایره واژگان عالی!",
    "adj_syn_modal_score": "شما <strong>{score}</strong> از <strong>{total}</strong> تفاوت ظریف را درست پاسخ دادید.",
    "adj_kong_modal_title": "آفرین بر تمرین صرف صفت‌ها!",
    "adj_kong_modal_score": "شما <strong>{score}</strong> از <strong>{total}</strong> پسوند را درست پاسخ دادید.",
    "adj_story_modal_title": "درک مطلب خواندن عالی!",
    "adj_story_modal_score": "شما <strong>{score}</strong> از <strong>{total}</strong> پاسخ را درست دادید.",
    "adj_f1_stage_warm": "☀️ خانه گرم و صمیمی (۱۰ ویژگی)",
    "adj_f1_stage_cool": "❄️ کارگاه محکم (۱۰ متضاد)",
    "adj_f2_stage_title": "⏱️ ایستگاه و سرعت (۲۰ صفت زمان)",
    "adj_f3_stage_left": "💎 ارزش و کمال",
    "adj_f3_stage_right": "⚙️ درجه دشواری و پیچیدگی",
    "adj_f4_stage_left": "❤️ زندگی اجتماعی و شادی",
    "adj_f4_stage_right": "🌧️ سختی و ناراحتی",
    "adj_f5_stage_left": "🌿 پاکیزگی، سلامتی و تعادل",
    "adj_f5_stage_right": "🌑 بی‌نظمی، بیماری و تاریکی",
    "adj_baro_f1_s1_title": "🌡️ مقیاس ۱: دما",
    "adj_baro_f1_s1_desc": "کلمات را بر اساس دما از سردترین به گرم‌ترین مرتب کنید:",
    "adj_baro_f1_s1_low": "🥶 سردترین",
    "adj_baro_f1_s1_high": "🔥 گرم‌ترین",
    "adj_baro_f1_s2_title": "📐 مقیاس ۲: اندازه",
    "adj_baro_f1_s2_desc": "کلمات را بر اساس اندازه از کوچک‌ترین به بزرگ‌ترین مرتب کنید:",
    "adj_baro_f1_s2_low": "🔬 کوچک‌ترین",
    "adj_baro_f1_s2_high": "🐘 بزرگ‌ترین",
    "adj_baro_f1_s3_title": "⚖️ مقیاس ۳: وزن",
    "adj_baro_f1_s3_desc": "کلمات را از سبک‌ترین به سنگین‌ترین مرتب کنید:",
    "adj_baro_f1_s3_low": "🪶 سبک‌ترین",
    "adj_baro_f1_s3_high": "🪨 سنگین‌ترین",
    "adj_baro_f1_s4_title": "🛋️ مقیاس ۴: سختی و بافت",
    "adj_baro_f1_s4_desc": "کلمات را از نرم‌ترین به سخت‌ترین مرتب کنید:",
    "adj_baro_f1_s4_low": "☁️ نرم‌ترین",
    "adj_baro_f1_s4_high": "💎 سخت‌ترین",
    "adj_baro_f1_s5_title": "🫙 مقیاس ۵: گنجایش و پر بودن",
    "adj_baro_f1_s5_desc": "کلمات را از خالی به پر مرتب کنید:",
    "adj_baro_f1_s5_low": "🫙 کاملاً خالی",
    "adj_baro_f1_s5_high": "📦 کاملاً پر",
    "adj_baro_f1_s6_title": "📏 مقیاس ۶: طول و مدت",
    "adj_baro_f1_s6_desc": "کلمات را از کوتاه‌ترین به بلندترین مرتب کنید:",
    "adj_baro_f1_s6_low": "⚡ کوتاه‌ترین",
    "adj_baro_f1_s6_high": "♾️ بلندترین",
    "adj_baro_f2_s1_title": "🏃 مقیاس ۱: سرعت و گام",
    "adj_baro_f2_s1_desc": "کلمات را بر اساس سرعت از کندترین به سریع‌ترین مرتب کنید:",
    "adj_baro_f2_s1_low": "🐢 کندترین",
    "adj_baro_f2_s1_high": "⚡ سریع‌ترین",
    "adj_baro_f2_s2_title": "🎂 مقیاس ۲: سن",
    "adj_baro_f2_s2_desc": "کلمات را از جوان‌ترین به مسن‌ترین مرتب کنید:",
    "adj_baro_f2_s2_low": "👶 جوان‌ترین",
    "adj_baro_f2_s2_high": "👴 مسن‌ترین",
    "adj_baro_f2_s3_title": "⏳ مقیاس ۳: مدت زمان",
    "adj_baro_f2_s3_desc": "رویدادها را از کوتاه‌ترین به طولانی‌ترین مدت مرتب کنید:",
    "adj_baro_f2_s3_low": "⚡ چند ثانیه",
    "adj_baro_f2_s3_high": "♾️ مدت بسیار طولانی",
    "adj_baro_f2_s4_title": "🔄 مقیاس ۴: تکرار و بسامد",
    "adj_baro_f2_s4_desc": "کلمات را بر اساس میزان تکرار یک رویداد مرتب کنید:",
    "adj_baro_f2_s4_low": "🚫 تقریباً هیچ‌وقت",
    "adj_baro_f2_s4_high": "🔁 تمام وقت",
    "adj_baro_f2_s5_title": "🎯 مقیاس ۵: وقت‌شناسی و دقت",
    "adj_baro_f2_s5_desc": "از بیشترین تأخیر تا کاملاً سر وقت مرتب کنید:",
    "adj_baro_f2_s5_low": "⚠️ خیلی دیر",
    "adj_baro_f2_s5_high": "🎯 دقیقاً سر وقت",
    "adj_baro_f2_s6_title": "📅 مقیاس ۶: خط زمانی و گذر زمان",
    "adj_baro_f2_s6_desc": "مراحل یک فرآیند را از گذشته به حال مرتب کنید:",
    "adj_baro_f2_s6_low": "📜 گذشته",
    "adj_baro_f2_s6_high": "📍 همین الان",
    "adj_baro_f3_s1_title": "⭐ مقیاس ۱: کیفیت",
    "adj_baro_f3_s1_desc": "ارزیابی‌ها را از بدترین به بهترین مرتب کنید:",
    "adj_baro_f3_s1_low": "🗑️ بدترین",
    "adj_baro_f3_s1_high": "🏆 بهترین",
    "adj_baro_f3_s2_title": "🧠 مقیاس ۲: میزان دشواری",
    "adj_baro_f3_s2_desc": "وظایف را از آسان‌ترین به سخت‌ترین مرتب کنید:",
    "adj_baro_f3_s2_low": "👶 آسان‌ترین",
    "adj_baro_f3_s2_high": "🧩 سخت‌ترین",
    "adj_baro_f3_s3_title": "💰 مقیاس ۳: سطح قیمت",
    "adj_baro_f3_s3_desc": "بر اساس قیمت از بدون هزینه تا بسیار گران مرتب کنید:",
    "adj_baro_f3_s3_low": "🪙 ۰ کرون",
    "adj_baro_f3_s3_high": "💎 یک ثروت",
    "adj_baro_f3_s4_title": "📌 مقیاس ۴: اهمیت و اولویت",
    "adj_baro_f3_s4_desc": "اطلاعات را از کاملاً بی‌اهمیت تا ضروری و حیاتی مرتب کنید:",
    "adj_baro_f3_s4_low": "💤 بی‌اهمیت",
    "adj_baro_f3_s4_high": "🚨 ضروری و حیاتی",
    "adj_baro_f3_s5_title": "🔍 مقیاس ۵: کامل بودن",
    "adj_baro_f3_s5_desc": "کیفیت گزارش را از غیرقابل استفاده تا بی‌نقص مرتب کنید:",
    "adj_baro_f3_s5_low": "❌ غیرقابل استفاده",
    "adj_baro_f3_s5_high": "💯 عالی و بی‌نقص",
    "adj_baro_f3_s6_title": "⚙️ مقیاس ۶: پیچیدگی",
    "adj_baro_f3_s6_desc": "قوانین را از ساده‌ترین به پیچیده‌ترین مرتب کنید:",
    "adj_baro_f3_s6_low": "🔹 ساده‌ترین",
    "adj_baro_f3_s6_high": "🌀 پیچیده‌ترین",
    "adj_baro_f4_s1_title": "😊 مقیاس ۱: شادی و خلق‌وخو",
    "adj_baro_f4_s1_desc": "احساسات را از غمگین‌ترین به شادترین مرتب کنید:",
    "adj_baro_f4_s1_low": "😢 دل‌شکسته",
    "adj_baro_f4_s1_high": "🎉 بسیار خوشحال",
    "adj_baro_f4_s2_title": "⚡ مقیاس ۲: انرژی و سرزندگی",
    "adj_baro_f4_s2_desc": "سطح انرژی را از کاملاً خسته تا سرشار از انرژی مرتب کنید:",
    "adj_baro_f4_s2_low": "🪫 خسته و از نفس افتاده",
    "adj_baro_f4_s2_high": "🔋 سرشار از انرژی",
    "adj_baro_f4_s3_title": "🧘 مقیاس ۳: آرامش در برابر اضطراب",
    "adj_baro_f4_s3_desc": "از آرام‌ترین تا ترسیده‌ترین و سراسیمه‌ترین مرتب کنید:",
    "adj_baro_f4_s3_low": "🕊️ کاملاً آرام",
    "adj_baro_f4_s3_high": "😱 هراسان و وحشت‌زده",
    "adj_baro_f4_s4_title": "🧸 مقیاس ۴: احساس امنیت و ترس",
    "adj_baro_f4_s4_desc": "از کاملاً در امان تا وحشت‌زده مرتب کنید:",
    "adj_baro_f4_s4_low": "🛡️ کاملاً در امان",
    "adj_baro_f4_s4_high": "😨 وحشت‌زده",
    "adj_baro_f4_s5_title": "💖 مقیاس ۵: مهربانی",
    "adj_baro_f4_s5_desc": "رفتار را از نامهربان‌ترین تا خونگرم‌ترین مرتب کنید:",
    "adj_baro_f4_s5_low": "🧊 نامهربان / سرد",
    "adj_baro_f4_s5_high": "☀️ مهربان و خونگرم",
    "adj_baro_f4_s6_title": "👍 مقیاس ۶: رضایت",
    "adj_baro_f4_s6_desc": "واکنش مشتری را از خشمگین تا بسیار مشتاق مرتب کنید:",
    "adj_baro_f4_s6_low": "😡 خشمگین",
    "adj_baro_f4_s6_high": "🤩 بسیار مشتاق و ذوق‌زده",
    "adj_baro_f5_s1_title": "🧽 مقیاس ۱: تمیزی و نظافت",
    "adj_baro_f5_s1_desc": "از کثیف‌ترین تا تمیز و درخشان مرتب کنید:",
    "adj_baro_f5_s1_low": "👞 زننده / کثیف",
    "adj_baro_f5_s1_high": "✨ تمیز و براق",
    "adj_baro_f5_s2_title": "🍎 مقیاس ۲: سلامت و تندرستی",
    "adj_baro_f5_s2_desc": "از بیماری وخیم تا سلامتی کامل و پرانرژی مرتب کنید:",
    "adj_baro_f5_s2_low": "🤒 به شدت بیمار",
    "adj_baro_f5_s2_high": "💪 کاملاً سالم و تندرست",
    "adj_baro_f5_s3_title": "💧 مقیاس ۳: رطوبت",
    "adj_baro_f5_s3_desc": "از کاملاً خشک تا کاملاً خیس مرتب کنید:",
    "adj_baro_f5_s3_low": "🏜️ کاملاً خشک",
    "adj_baro_f5_s3_high": "🌊 کاملاً خیس و آب‌کشیده",
    "adj_baro_f5_s4_title": "💡 مقیاس ۴: میزان روشنایی",
    "adj_baro_f5_s4_desc": "از تاریکی مطلق تا روشنایی خیره‌کننده مرتب کنید:",
    "adj_baro_f5_s4_low": "🌑 تاریکی مطلق",
    "adj_baro_f5_s4_high": "☀️ روشنایی خیره‌کننده",
    "adj_baro_f5_s5_title": "📊 مقیاس ۵: مقدار و کمیت",
    "adj_baro_f5_s5_desc": "مقادیر را از هیچ تا بی‌شمار مرتب کنید:",
    "adj_baro_f5_s5_low": "0️⃣ هیچ",
    "adj_baro_f5_s5_high": "♾️ بی‌شمار",
    "adj_baro_f5_s6_title": "🧭 مقیاس ۶: قطعیت و اطمینان",
    "adj_baro_f5_s6_desc": "از کاملاً نامطمئن تا قطعیت کامل و شفاف مرتب کنید:",
    "adj_baro_f5_s6_low": "❓ تردیدآمیز",
    "adj_baro_f5_s6_high": "✔️ کاملاً واضح و روشن",
    "top100_adj_hub_title": "۱۰۰ صفت بسیار رایج",
    "top100_adj_hub_desc": "صفت‌ها جهان را توصیف می‌کنند، به آن ظرافت و معنا می‌بخشند و تضادها را بیان می‌کنند. ۱۰۰ صفت بسیار رایج دانمارکی را که در ۵ حوزه معنایی دسته‌بندی شده‌اند کشف کنید – و راهنمای کامل صرف را در بخش ۶ مسلط شوید!",
    "top100_adj_f1_badge": "🔬 بخش ۱: ۲۰ جفت متضاد قابل اندازه‌گیری",
    "top100_adj_f1_title": "۱. ویژگی‌های فیزیکی، شکل و حواس",
    "top100_adj_f1_desc": "شامل همه چیزهایی که در زندگی روزمره قابل اندازه‌گیری، لمس یا احساس هستند: <em>stor (بزرگ) / lille (کوچک)، lang (بلند/طولانی) / kort (کوتاه)، høj (بلند/مرتفع) / lav (کوتاه/پایین)، bred (پهن/عریض) / smal (باریک)، tung (سنگین) / let (سبک)، varm (گرم) / kold (سرد)، hård (سخت/محکم) / blød (نرم)، fast (محکم/ثابت) / løs (شل/آزاد)، fuld (پر) / tom (خالی)، åben (باز) / lukket (بسته)</em>.",
    "top100_adj_f1_btn": "رفتن به بخش ۱ ➔",
    "top100_adj_f2_badge": "⏱️ بخش ۲: ۲۰ صفت زمان",
    "top100_adj_f2_title": "۲. زمان، سن و سرعت",
    "top100_adj_f2_desc": "ترتیب زمانی، تغییر و سرعت در زندگی روزمره: <em>ny (جدید) / gammel (قدیمی)، ung (جوان) / gammel (پیر/مسن)، tidlig (زود) / sen (دیر)، hurtig (سریع) / langsom (آهسته)، pludselig (ناگهانی)، forsinket (با تأخیر)، travl (مشغول)، rolig (آرام)...</em>",
    "top100_adj_f2_btn": "رفتن به بخش ۲ ➔",
    "top100_adj_f3_badge": "💎 بخش ۳: ۲۰ صفت ارزیابی",
    "top100_adj_f3_title": "۳. کیفیت، درجه دشواری و اقتصاد",
    "top100_adj_f3_desc": "ارزیابی، قیمت‌ها، تلاش و ارزش: <em>god (خوب) / dårlig (بد)، svær (سخت) / let (آسان)، dyr (گران) / billig (ارزان)، vigtig (مهم) / ligegyldig (بی‌اهمیت)، nødvendig (ضروری)، gratis (رایگان)، perfekt (عالی/بی‌نقص)، forkert (نادرست/اشتباه)...</em>",
    "top100_adj_f3_btn": "رفتن به بخش ۳ ➔",
    "top100_adj_f4_badge": "❤️ بخش ۴: ۲۰ صفت اجتماعی",
    "top100_adj_f4_title": "۴. احساسات، شخصیت و روابط",
    "top100_adj_f4_desc": "حالات روحی و تعاملات اجتماعی افراد: <em>glad (خوشحال) / ked af det (غمگین)، venlig (مهربان) / uvenlig (نامهربان)، træt (خسته) / frisk (سرحال)، tryg (مطمئن/امن) / bange (ترسیده)، sur (اخمو/عصبانی)، sød (شیرین/مهربان)، stolt (مغرور/سربلند)، rolig (آرام)...</em>",
    "top100_adj_f4_btn": "رفتن به بخش ۴ ➔",
    "top100_adj_f5_badge": "🎨 بخش ۵: ۲۰ صفت حالت و وضعیت",
    "top100_adj_f5_title": "۵. رنگ‌ها، مقدارها و وضعیت‌ها",
    "top100_adj_f5_desc": "وضعیت‌های بصری و کاربردی در زندگی روزمره: <em>rød (قرمز)، blå (آبی)، grøn (سبز)، hel (کامل/درسته) / halv (نصف)، mange (بسیار/زیاد) / få (کم)، ren (تمیز) / beskidt (کثیف)، sund (سالم) / syg (بیمار)، klar (آماده/واضح)، sikker (مطمئن/امن)، rigtig (درست)...</em>",
    "top100_adj_f5_btn": "رفتن به بخش ۵ ➔",
    "top100_adj_f6_badge": "📏 بخش ۶ • استاد صرف (درجات صفت و قانون e)",
    "top100_adj_f6_title": "۶. راهنمای بزرگ صرف: درجات صفت و قانون e",
    "top100_adj_f6_desc": "موتور تعاملی و کامل صرف: <strong>۱. صفت ساده (Positiv)</strong> (<em>stor</em>) ➔ <strong>۲. صفت تفضیلی (Komparativ)</strong> همراه با \"end\" (<em>større end</em>) ➔ <strong>۳. صفت عالی (Superlativ)</strong> (<em>størst / den største</em>)، به همراه فرمول این‌که چرا <em>den/min/denne/Peters</em> همیشه پسوند <strong>-e</strong> را الزامی می‌کنند!",
    "top100_adj_f6_btn": "باز کردن راهنمای صرف 📏 ➔",
    "top100_adj_ped_title": "💡 چگونه صفت‌ها را به بهترین شکل یاد بگیریم؟",
    "top100_adj_ped_item1_title": "⚖️ متضادهای تصویری",
    "top100_adj_ped_item1_desc": "صفت‌ها روابط را توصیف می‌کنند. با یادگیری <em>varm ↔ kold</em> در کنار هم، هر دو کلمه در نیمی از زمان در شبکه معنایی مغز تثبیت می‌شوند.",
    "top100_adj_ped_item2_title": "🧩 مطابقت و صرف",
    "top100_adj_ped_item2_desc": "یک صفت هرگز به تنهایی نمی‌آید – بلکه بر اساس جنس و شمار صرف می‌شود: <em>en varm te</em> (جنس مشترک)، <em>et varmt bad</em> (جنس خنثی: -t)، <em>de varme dage</em> (جمع: -e).",
    "top100_adj_ped_item3_title": "🌡️ مقیاس و شدت",
    "top100_adj_ped_item3_desc": "قدرت کلمات را روی یک دماسنج کشف کنید: از <em>iskold</em> (بسیار سرد/یخ‌زده) ➔ <em>kold</em> (سرد) ➔ <em>lun</em> (ولرم) ➔ <em>varm</em> (گرم) ➔ <em>kogende</em> (جوشان/داغ).",
    "adj_tab_1": "۱. بررسی تضادها",
    "adj_tab_2": "۲. یافتن متضاد (دوئل)",
    "adj_tab_3": "۳. مترادف‌ها و تفاوت‌های معنایی",
    "adj_tab_4": "۴. دماسنج کلمات (مقیاس)",
    "adj_tab_5": "۵. مطابقت (-t / -e)",
    "adj_tab_6": "۶. بافت و داستان",
    "adj_pure_label": "مشاهده تصویر خالص:",
    "adj_listen_word": "شنیدن کلمه هدف",
    "adj_listen_pronunciation": "شنیدن تلفظ",
    "adj_modpol_label": "متضاد:",
    "adj_faelles_label": "جنس مشترک (en ...)",
    "adj_intet_label": "جنس خنثی (et ... / +t)",
    "adj_flertal_label": "معرفه / جمع (+e)",
    "adj_example_sentence": "جمله ساده:",
    "adj_status_on": "روشن",
    "adj_status_off": "خاموش",
    "adj_click_hotspot_hint": "روی یک نقطه کلیک کنید تا تلفظ را بشنوید و متضاد آن را در اتاق روبرو ببینید!"
  },
  "ku": {
    "adj_baro_counter": "Barometre {current} ji {total}",
    "adj_baro_step": "[ Gava {n} ]",
    "adj_baro_remove_tooltip": "Ji bo rakirina vê peyvê bikirtînin",
    "adj_baro_reset_btn": "Pîvanê sifir bike 🔄",
    "adj_baro_check_btn": "Rêzê kontrol bike ✔️",
    "adj_baro_next_btn": "Pîvana din ➔",
    "adj_baro_master_btn": "Te barometre serwer kir! 🏆",
    "adj_baro_success": "🎉 Rêzkirineke bêkêmasî! Te peyv bi rêza tam rast bi cih kirin:",
    "adj_baro_wrong": "Hêj tam neqediyaye. Hinek peyv ne di rêza rast de ne.",
    "adj_baro_hint": "Nîşe: Pêşî rewşa herî nerm û dawiyê rewşa herî xurt bifikire!",
    "adj_kongruens_subprompt": "Forma rast a rengdêrê hilbijêre:",
    "adj_grammar_banner_title": "Dixwazî hemû rêzikên kişandina rengdêran bi hûrbilî fêr bibî?",
    "adj_grammar_banner_desc": "Li ser forma bingehîn, zayenda nêtar (-t), forma diyar û pirjimar (-e) û her wiha berhevdana rengdêran fêr bibe.",
    "adj_grammar_banner_btn": "Biçe rêberê kişandinê ➔",
    "adj_story_subprompt": "Kîjan peyv herî zêde li vê rewşê tê?",
    "adj_duel_counter": "⚔️ Dûelo {current} ji {total}",
    "adj_nuance_counter": "🔄 Nuans {current} ji {total}",
    "adj_kongruens_counter": "🧩 Lihevkirin {current} ji {total}",
    "adj_situation_counter": "📖 Rewş {current} ji {total}",
    "adj_score_label": "Puan:",
    "adj_next_duel": "Dûeloya din ➔",
    "adj_next_nuance": "Nuansa din ➔",
    "adj_next_kongruens": "Peywira din ➔",
    "adj_next_situation": "Rewşa din ➔",
    "adj_result_duel_btn": "Encamê bibîne ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Hevwatayan biqedîne ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Encama kişandinê bibîne ({score}/{total}) 🏆",
    "adj_result_story_btn": "Encamê bibîne ({score}/{total}) 🌟",
    "adj_retry_btn": "Dîsa biceribîne 🔄",
    "adj_correct_feedback": "🎉 Rast e!",
    "adj_wrong_feedback": "Tam ne wisa ye:",
    "adj_correct_answer_is": "Bersiva rast ev e:",
    "adj_duel_modal_title": "Di Dûeloya Dijwateyan de xebateke pir baş!",
    "adj_duel_modal_score": "Te ji <strong>{total}</strong> dijwateyên rast <strong>{score}</strong> bi dest xistin.",
    "adj_syn_modal_title": "Peyvzanîneke pir baş!",
    "adj_syn_modal_score": "Te ji <strong>{total}</strong> nuansên rast <strong>{score}</strong> bi dest xistin.",
    "adj_kong_modal_title": "Xebateke pir baş bi paşgirên kişandinê re!",
    "adj_kong_modal_score": "Te ji <strong>{total}</strong> paşgirên rast <strong>{score}</strong> bi dest xistin.",
    "adj_story_modal_title": "Têgihiştina xwendinê ya pir baş!",
    "adj_story_modal_score": "Te ji <strong>{total}</strong> bersivên rast <strong>{score}</strong> bi dest xistin.",
    "adj_f1_stage_warm": "☀️ Mala germ (10 taybetmendî)",
    "adj_f1_stage_cool": "❄️ Kargeha saxlem (10 dijwate)",
    "adj_f2_stage_title": "⏱️ Îstasyon û lez (20 rengdêrên demê)",
    "adj_f3_stage_left": "💎 Nirx û bêkêmasî",
    "adj_f3_stage_right": "⚙️ Asta dijwarî û tevliheviyê",
    "adj_f4_stage_left": "❤️ Jiyana civakî û şahî",
    "adj_f4_stage_right": "🌧️ Zehmetî û nerehetî",
    "adj_f5_stage_left": "🌿 Paqijî, tenduristî û hevsengî",
    "adj_f5_stage_right": "🌑 Tevlihevî, nexweşî û tariyî",
    "adj_baro_f1_s1_title": "🌡️ Pîvan 1: Germahî",
    "adj_baro_f1_s1_desc": "Peyvan li gorî germahiyê ji ya herî sar ber bi ya herî germ ve rêz bike:",
    "adj_baro_f1_s1_low": "🥶 Herî sar",
    "adj_baro_f1_s1_high": "🔥 Herî germ",
    "adj_baro_f1_s2_title": "📐 Pîvan 2: Mezinahî",
    "adj_baro_f1_s2_desc": "Peyvan li gorî mezinahiyê ji ya herî biçûk ber bi ya herî mezin ve rêz bike:",
    "adj_baro_f1_s2_low": "🔬 Herî biçûk",
    "adj_baro_f1_s2_high": "🐘 Herî mezin",
    "adj_baro_f1_s3_title": "⚖️ Pîvan 3: Giranî",
    "adj_baro_f1_s3_desc": "Peyvan ji ya herî sivik ber bi ya herî giran ve rêz bike:",
    "adj_baro_f1_s3_low": "🪶 Herî sivik",
    "adj_baro_f1_s3_high": "🪨 Herî giran",
    "adj_baro_f1_s4_title": "🛋️ Pîvan 4: Hişkî û pêkhatî",
    "adj_baro_f1_s4_desc": "Peyvan ji ya herî nerm ber bi ya herî hişk ve rêz bike:",
    "adj_baro_f1_s4_low": "☁️ Herî nerm",
    "adj_baro_f1_s4_high": "💎 Herî hişk",
    "adj_baro_f1_s5_title": "🫙 Pîvan 5: Qebare û tijebûn",
    "adj_baro_f1_s5_desc": "Peyvan ji ya vala ber bi ya tije ve rêz bike:",
    "adj_baro_f1_s5_low": "🫙 Bi temamî vala",
    "adj_baro_f1_s5_high": "📦 Bi temamî tije",
    "adj_baro_f1_s6_title": "📏 Pîvan 6: Dirêjahî û demdirêjî",
    "adj_baro_f1_s6_desc": "Peyvan ji ya herî kin ber bi ya herî dirêj ve rêz bike:",
    "adj_baro_f1_s6_low": "⚡ Herî kin",
    "adj_baro_f1_s6_high": "♾️ Herî dirêj",
    "adj_baro_f2_s1_title": "🏃 Pîvan 1: Lez û tempo",
    "adj_baro_f2_s1_desc": "Peyvan li gorî lezê ji ya herî hêdî ber bi ya herî lezgîn ve rêz bike:",
    "adj_baro_f2_s1_low": "🐢 Herî hêdî",
    "adj_baro_f2_s1_high": "⚡ Herî lezgîn",
    "adj_baro_f2_s2_title": "🎂 Pîvan 2: Temen",
    "adj_baro_f2_s2_desc": "Peyvan ji ya herî ciwan ber bi ya herî temenmezin ve rêz bike:",
    "adj_baro_f2_s2_low": "👶 Herî ciwan",
    "adj_baro_f2_s2_high": "👴 Herî temenmezin",
    "adj_baro_f2_s3_title": "⏳ Pîvan 3: Demdirêjî",
    "adj_baro_f2_s3_desc": "Bûyeran ji dema herî kin ber bi ya herî dirêj ve rêz bike:",
    "adj_baro_f2_s3_low": "⚡ Çend çirk",
    "adj_baro_f2_s3_high": "♾️ Demeke pir dirêj",
    "adj_baro_f2_s4_title": "🔄 Pîvan 4: Pirbûn û dubarebûn",
    "adj_baro_f2_s4_desc": "Peyvan li gorî çend caran qewimîna tiştekî rêz bike:",
    "adj_baro_f2_s4_low": "🚫 Hema hema qet",
    "adj_baro_f2_s4_high": "🔁 Her dem",
    "adj_baro_f2_s5_title": "🎯 Pîvan 5: Wextnasî û dirustî",
    "adj_baro_f2_s5_desc": "Ji ya herî derengmayî ber bi ya tam di wextê xwe de rêz bike:",
    "adj_baro_f2_s5_low": "⚠️ Gelek dereng",
    "adj_baro_f2_s5_high": "🎯 Tam di wextê xwe de",
    "adj_baro_f2_s6_title": "📅 Pîvan 6: Demname û rojanebûn",
    "adj_baro_f2_s6_desc": "Qonaxên pêvajoyekê ji paşerojê ber bi dema niha ve rêz bike:",
    "adj_baro_f2_s6_low": "📜 Rabirdû",
    "adj_baro_f2_s6_high": "📍 Vê gavê",
    "adj_baro_f3_s1_title": "⭐ Pîvan 1: Kalîte",
    "adj_baro_f3_s1_desc": "Nirxandinan ji ya herî xirab ber bi ya herî baş ve rêz bike:",
    "adj_baro_f3_s1_low": "🗑️ Herî xirab",
    "adj_baro_f3_s1_high": "🏆 Herî baş",
    "adj_baro_f3_s2_title": "🧠 Pîvan 2: Asta dijwariyê",
    "adj_baro_f3_s2_desc": "Peywiran ji ya herî hêsan ber bi ya herî dijwar ve rêz bike:",
    "adj_baro_f3_s2_low": "👶 Herî hêsan",
    "adj_baro_f3_s2_high": "🧩 Herî dijwar",
    "adj_baro_f3_s3_title": "💰 Pîvan 3: Asta bihayê",
    "adj_baro_f3_s3_desc": "Li gorî bihayê ji bêpere ber bi pir biha ve rêz bike:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 Serwetek",
    "adj_baro_f3_s4_title": "📌 Pîvan 4: Girîngî û pêşengî",
    "adj_baro_f3_s4_desc": "Agahiyan ji ya qet ne girîng ber bi ya jêneveger ve rêz bike:",
    "adj_baro_f3_s4_low": "💤 Ne girîng",
    "adj_baro_f3_s4_high": "🚨 Jêneveger",
    "adj_baro_f3_s5_title": "🔍 Pîvan 5: Bêkêmasî û temamî",
    "adj_baro_f3_s5_desc": "Kalîteya raporê ji ya bêkêr ber bi ya bêkêmasî ve rêz bike:",
    "adj_baro_f3_s5_low": "❌ Bêkêr",
    "adj_baro_f3_s5_high": "💯 Bêkêmasî",
    "adj_baro_f3_s6_title": "⚙️ Pîvan 6: Tevlihevî",
    "adj_baro_f3_s6_desc": "Rêzikan ji ya herî hêsan ber bi ya herî tevlihev ve rêz bike:",
    "adj_baro_f3_s6_low": "🔹 Herî hêsan",
    "adj_baro_f3_s6_high": "🌀 Herî tevlihev",
    "adj_baro_f4_s1_title": "😊 Pîvan 1: Şahî û moral",
    "adj_baro_f4_s1_desc": "Hestan ji ya herî xemgîn ber bi ya herî dilxweş ve rêz bike:",
    "adj_baro_f4_s1_low": "😢 Dilşikestî",
    "adj_baro_f4_s1_high": "🎉 Bextewar",
    "adj_baro_f4_s2_title": "⚡ Pîvan 2: Enerjî û çalakî",
    "adj_baro_f4_s2_desc": "Asta enerjiyê ji ya herî betilî ber bi ya tije enerjî ve rêz bike:",
    "adj_baro_f4_s2_low": "🪫 Qels û betilî",
    "adj_baro_f4_s2_high": "🔋 Tije enerjî",
    "adj_baro_f4_s3_title": "🧘 Pîvan 3: Aramî li hember fikariyê",
    "adj_baro_f4_s3_desc": "Ji ya herî aram ber bi ya herî bi saw û panîk ve rêz bike:",
    "adj_baro_f4_s3_low": "🕊️ Pir aram",
    "adj_baro_f4_s3_high": "😱 Ketî tirs û panîkê",
    "adj_baro_f4_s4_title": "🧸 Pîvan 4: Ewlehî û tirs",
    "adj_baro_f4_s4_desc": "Ji ewlehiya tam ber bi tirsa mezin ve rêz bike:",
    "adj_baro_f4_s4_low": "🛡️ Bi temamî ewle",
    "adj_baro_f4_s4_high": "😨 Pir tirsiyayî",
    "adj_baro_f4_s5_title": "💖 Pîvan 5: Dilovanî",
    "adj_baro_f4_s5_desc": "Tevgerê ji ya herî nedilovan ber bi ya herî dilgerm ve rêz bike:",
    "adj_baro_f4_s5_low": "🧊 Nedilovan / sar",
    "adj_baro_f4_s5_high": "☀️ Dilgerm",
    "adj_baro_f4_s6_title": "👍 Pîvan 6: Razîbûn",
    "adj_baro_f4_s6_desc": "Berteka mişterî ji ya gelek hêrsbûyî ber bi ya pir bi kelecan ve rêz bike:",
    "adj_baro_f4_s6_low": "😡 Hêrsbûyî",
    "adj_baro_f4_s6_high": "🤩 Pir bi kelecan",
    "adj_baro_f5_s1_title": "🧽 Pîvan 1: Paqijî",
    "adj_baro_f5_s1_desc": "Ji ya herî qirêj ber bi ya şirîqî paqij ve rêz bike:",
    "adj_baro_f5_s1_low": "👞 Kirêt / qirêj",
    "adj_baro_f5_s1_high": "✨ Şirîqî paqij",
    "adj_baro_f5_s2_title": "🍎 Pîvan 2: Tenduristî û xurtbûn",
    "adj_baro_f5_s2_desc": "Ji nexweşiya giran ber bi tenduristiya xurt ve rêz bike:",
    "adj_baro_f5_s2_low": "🤒 Nexweşê giran",
    "adj_baro_f5_s2_high": "💪 Gelek saxlem û xurt",
    "adj_baro_f5_s3_title": "💧 Pîvan 3: Şilbûn",
    "adj_baro_f5_s3_desc": "Ji pir hişk ber bi şilpaşîl ve rêz bike:",
    "adj_baro_f5_s3_low": "🏜️ Pir hişk",
    "adj_baro_f5_s3_high": "🌊 Şilpaşîl",
    "adj_baro_f5_s4_title": "💡 Pîvan 4: Asta ronahiyê",
    "adj_baro_f5_s4_desc": "Ji şevtarî ber bi ronahiya zêde ve rêz bike:",
    "adj_baro_f5_s4_low": "🌑 Şevtarî",
    "adj_baro_f5_s4_high": "☀️ Ronahiya zêde",
    "adj_baro_f5_s5_title": "📊 Pîvan 5: Mîqdar",
    "adj_baro_f5_s5_desc": "Mîqdaran ji tune ber bi bêhejmar ve rêz bike:",
    "adj_baro_f5_s5_low": "0️⃣ Tune",
    "adj_baro_f5_s5_high": "♾️ Bêhejmar",
    "adj_baro_f5_s6_title": "🧭 Pîvan 6: Bawerî û piştrastî",
    "adj_baro_f5_s6_desc": "Ji nediyariya tam ber bi piştrastiya zelal ve rêz bike:",
    "adj_baro_f5_s6_low": "❓ Bi guman",
    "adj_baro_f5_s6_high": "✔️ Pir zelal",
    "top100_adj_hub_title": "100 Rengdêrên Herî Gelemperî",
    "top100_adj_hub_desc": "Rengdêr cîhanê rave dikin, hûrgiliyan lê zêde dikin û dijberiyan diyar dikin. Li 100 rengdêrên herî gelemperî yên danîmarkî ku li 5 qadên wateyî hatine dabeşkirin bigerin – û di Qada 6an de rêbernameya tevahî ya tewandinê serwer bibin!",
    "top100_adj_f1_badge": "🔬 Qada 1: 20 dijberên pîvandî",
    "top100_adj_f1_title": "1. Taybetmendiyên fîzîkî, teşe û hestiyarî",
    "top100_adj_f1_desc": "Hemû tiştên ku di jiyana rojane de têne pîvan, hestkirin an têgihîştin digire nav xwe: <em>stor (mezin) / lille (piçûk), lang (dirêj) / kort (kurt), høj (bilind) / lav (nizm), bred (fireh) / smal (teng), tung (giran) / let (sivik), varm (germ) / kold (sar), hård (hişk) / blød (nerm), fast (saxlem/req) / løs (sist), fuld (tije) / tom (vala), åben (vekirî) / lukket (girtî)</em>.",
    "top100_adj_f1_btn": "Here Qada 1 ➔",
    "top100_adj_f2_badge": "⏱️ Qada 2: 20 rengdêrên demê",
    "top100_adj_f2_title": "2. Dem, temen û lez",
    "top100_adj_f2_desc": "Kronolojî, guherîn û lez di jiyana rojane de: <em>ny (nû) / gammel (kevin), ung (ciwan) / gammel (pîr), tidlig (zû) / sen (dereng), hurtig (bilez) / langsom (hêdî), pludselig (nişkêve), forsinket (derengmayî), travl (mijûl), rolig (aram)...</em>",
    "top100_adj_f2_btn": "Here Qada 2 ➔",
    "top100_adj_f3_badge": "💎 Qada 3: 20 rengdêrên nirxandinê",
    "top100_adj_f3_title": "3. Qalîte, asta dijwariyê û aborî",
    "top100_adj_f3_desc": "Nirxandin, biha, ked û nirx: <em>god (baş) / dårlig (xirab), svær (dijwar) / let (hêsan), dyr (biha) / billig (erzan), vigtig (girîng) / ligegyldig (ne girîng), nødvendig (pêwîst), gratis (belaş), perfekt (bêkêmasî), forkert (şaş)...</em>",
    "top100_adj_f3_btn": "Here Qada 3 ➔",
    "top100_adj_f4_badge": "❤️ Qada 4: 20 rengdêrên civakî",
    "top100_adj_f4_title": "4. Hest, kesayetî û têkilî",
    "top100_adj_f4_desc": "Rewşa derûnî ya mirovan û têkiliya civakî: <em>glad (dilxweş) / ked af det (xemgîn), venlig (dilovan) / uvenlig (nedilovan), træt (westiyayî) / frisk (zindî), tryg (ewle) / bange (tirsiyayî), sur (hêrsbûyî), sød (şêrîn), stolt (serbilind), rolig (aram)...</em>",
    "top100_adj_f4_btn": "Here Qada 4 ➔",
    "top100_adj_f5_badge": "🎨 Qada 5: 20 rengdêrên rewşê",
    "top100_adj_f5_title": "5. Reng, hejmar û rewş",
    "top100_adj_f5_desc": "Rewşên dîtbarî û pratîkî di jiyana rojane de: <em>rød (sor), blå (şîn), grøn (kesk), hel (tevahî) / halv (nîv), mange (gelek) / få (hindik), ren (paqij) / beskidt (qirêj), sund (saxlem) / syg (nexweş), klar (amade/zelal), sikker (ewle/piştrast), rigtig (rast)...</em>",
    "top100_adj_f5_btn": "Here Qada 5 ➔",
    "top100_adj_f6_badge": "📏 Qada 6 • Hostayê Tewandinê (pileyên berawirdkirinê û rêzika e-yê)",
    "top100_adj_f6_title": "6. Rêbernameya mezin a tewandinê: pileyên berawirdkirinê û rêzika e-yê",
    "top100_adj_f6_desc": "Motora tewandinê ya înteraktîf û temam: <strong>1. Positiv</strong> (<em>stor</em>) ➔ <strong>2. Komparativ</strong> bi \"end\" (<em>større end</em>) ➔ <strong>3. Superlativ</strong> (<em>størst / den største</em>), ligel formûla çima <em>den/min/denne/Peters</em> her gav paşgira <strong>-e</strong> ferz dike!",
    "top100_adj_f6_btn": "Rêbernameya Tewandinê veke 📏 ➔",
    "top100_adj_ped_title": "💡 Hûn çawa dikarin rengdêran herî baş fêr bibin?",
    "top100_adj_ped_item1_title": "⚖️ Dijberên Dîtbarî",
    "top100_adj_ped_item1_desc": "Rengdêr têkiliyan rave dikin. Bi fêrbûna <em>varm ↔ kold</em> bi hev re, her du peyv di nîvê demê de di tora wateyî ya mejî de bi cih dibin.",
    "top100_adj_ped_item2_title": "🧩 Lihevkirin & Tewandin",
    "top100_adj_ped_item2_desc": "Rengdêr tu carî bi tenê namîne – ew li gorî zayend û hejmarê tê tewandin: <em>en varm te</em> (zayenda gelemperî), <em>et varmt bad</em> (zayenda newalî: -t), <em>de varme dage</em> (pirjimar: -e).",
    "top100_adj_ped_item3_title": "🌡️ Pîvan & Zêdebûn",
    "top100_adj_ped_item3_desc": "Hêza peyvan li ser pîvanekê keşf bikin: ji <em>iskold</em> (qerimî) ➔ <em>kold</em> (sar) ➔ <em>lun</em> (şîlgerm) ➔ <em>varm</em> (germ) ➔ <em>kogende</em> (kelandî).",
    "adj_tab_1": "1. Lêkolîna dijberiyan",
    "adj_tab_2": "2. Dijberê bibîne (duel)",
    "adj_tab_3": "3. Hevwate û hûrgilî",
    "adj_tab_4": "4. Barometer (pîvan)",
    "adj_tab_5": "5. Lihevkirin (-t / -e)",
    "adj_tab_6": "6. Çarçove û çîrok",
    "adj_pure_label": "Wêneyê xwerû bibîne:",
    "adj_listen_word": "Guh bide peyva armanc",
    "adj_listen_pronunciation": "Guh bide bilêvkirinê",
    "adj_modpol_label": "Dijber:",
    "adj_faelles_label": "Zayenda gelemperî (en ...)",
    "adj_intet_label": "Zayenda newalî (et ... / +t)",
    "adj_flertal_label": "Diyarkirî / Pirjimar (+e)",
    "adj_example_sentence": "Hevoka hêsan:",
    "adj_status_on": "VEKIRÎ",
    "adj_status_off": "GIRTÎ",
    "adj_click_hotspot_hint": "Li ser xalekê bikirtînin da ku bilêvkirinê bibihîzin û dijberê wê li odeya hember bibînin!"
  },
  "ur": {
    "adj_baro_counter": "بارومیٹر {current} از {total}",
    "adj_baro_step": "[ مرحلہ {n} ]",
    "adj_baro_remove_tooltip": "اس لفظ کو ہٹانے کے لیے کلک کریں",
    "adj_baro_reset_btn": "پیمانہ دوبارہ ترتیب دیں 🔄",
    "adj_baro_check_btn": "ترتیب چیک کریں ✔️",
    "adj_baro_next_btn": "اگلا پیمانہ ➔",
    "adj_baro_master_btn": "آپ نے بارومیٹر پر مہارت حاصل کر لی! 🏆",
    "adj_baro_success": "🎉 بہترین ترتیب! آپ نے الفاظ بالکل درست ترتیب میں رکھے:",
    "adj_baro_wrong": "ابھی پوری طرح درست نہیں۔ کچھ الفاظ صحیح ترتیب میں نہیں ہیں۔",
    "adj_baro_hint": "ٹپ: پہلے ہلکی ترین حالت اور آخر میں شدید ترین حالت کے بارے میں سوچیں!",
    "adj_kongruens_subprompt": "صفت کی درست شکل منتخب کریں:",
    "adj_grammar_banner_title": "کیا آپ صفات کی گردان کے تمام اصول اچھی طرح سیکھنا چاہتے ہیں؟",
    "adj_grammar_banner_desc": "بنیادی شکل، غیر جانبدار جنس (-t)، معرفہ اور جمع (-e) اور تقابل صفت کے بارے میں سیکھیں۔",
    "adj_grammar_banner_btn": "گردان کی گائیڈ پر جائیں ➔",
    "adj_story_subprompt": "اس صورتحال میں کون سا لفظ سب سے زیادہ مناسب ہے؟",
    "adj_duel_counter": "⚔️ مقابلہ {current} از {total}",
    "adj_nuance_counter": "🔄 باریکی {current} از {total}",
    "adj_kongruens_counter": "🧩 مطابقت {current} از {total}",
    "adj_situation_counter": "📖 صورتحال {current} از {total}",
    "adj_score_label": "اسکور:",
    "adj_next_duel": "اگلا مقابلہ ➔",
    "adj_next_nuance": "اگلی باریکی ➔",
    "adj_next_kongruens": "اگلی مشق ➔",
    "adj_next_situation": "اگلی صورتحال ➔",
    "adj_result_duel_btn": "نتیجہ دیکھیں ({score}/{total}) 🏆",
    "adj_result_syn_btn": "مترادفات مکمل کریں ({score}/{total}) 🌟",
    "adj_result_kong_btn": "گردان کا نتیجہ دیکھیں ({score}/{total}) 🏆",
    "adj_result_story_btn": "نتیجہ دیکھیں ({score}/{total}) 🌟",
    "adj_retry_btn": "دوبارہ کوشش کریں 🔄",
    "adj_correct_feedback": "🎉 درست!",
    "adj_wrong_feedback": "پوری طرح نہیں:",
    "adj_correct_answer_is": "درست جواب یہ ہے:",
    "adj_duel_modal_title": "متضاد الفاظ کے مقابلے میں شاندار کارکردگی!",
    "adj_duel_modal_score": "آپ نے <strong>{total}</strong> میں سے <strong>{score}</strong> درست متضاد الفاظ حاصل کیے۔",
    "adj_syn_modal_title": "شاندار ذخیرہ الفاظ!",
    "adj_syn_modal_score": "آپ نے <strong>{total}</strong> میں سے <strong>{score}</strong> درست باریکیاں حاصل کیں۔",
    "adj_kong_modal_title": "صفات کی گردان اور لاحقوں پر عمدہ کام!",
    "adj_kong_modal_score": "آپ نے <strong>{total}</strong> میں سے <strong>{score}</strong> درست لاحقے حاصل کیے۔",
    "adj_story_modal_title": "مطالعے کی شاندار فہم!",
    "adj_story_modal_score": "آپ نے <strong>{total}</strong> میں سے <strong>{score}</strong> درست جوابات حاصل کیے۔",
    "adj_f1_stage_warm": "☀️ پُرسکون اور گرم گھر (10 خصوصیات)",
    "adj_f1_stage_cool": "❄️ مضبوط ورکشاپ (10 متضاد)",
    "adj_f2_stage_title": "⏱️ اسٹیشن اور رفتار (20 وقتی صفات)",
    "adj_f3_stage_left": "💎 قدر اور کمال",
    "adj_f3_stage_right": "⚙️ مشکل کی سطح اور پیچیدگی",
    "adj_f4_stage_left": "❤️ سماجی زندگی اور خوشی",
    "adj_f4_stage_right": "🌧️ مشکلات اور بے آرامی",
    "adj_f5_stage_left": "🌿 صفائی، صحت اور توازن",
    "adj_f5_stage_right": "🌑 بد نظمی، بیماری اور اندھیرا",
    "adj_baro_f1_s1_title": "🌡️ پیمانہ 1: درجہ حرارت",
    "adj_baro_f1_s1_desc": "الفاظ کو درجہ حرارت کے لحاظ سے سرد ترین سے گرم ترین میں ترتیب دیں:",
    "adj_baro_f1_s1_low": "🥶 سرد ترین",
    "adj_baro_f1_s1_high": "🔥 گرم ترین",
    "adj_baro_f1_s2_title": "📐 پیمانہ 2: سائز",
    "adj_baro_f1_s2_desc": "الفاظ کو سائز کے لحاظ سے چھوٹے ترین سے بڑے ترین میں ترتیب دیں:",
    "adj_baro_f1_s2_low": "🔬 چھوٹا ترین",
    "adj_baro_f1_s2_high": "🐘 بڑا ترین",
    "adj_baro_f1_s3_title": "⚖️ پیمانہ 3: وزن",
    "adj_baro_f1_s3_desc": "الفاظ کو ہلکے ترین سے بھاری ترین میں ترتیب دیں:",
    "adj_baro_f1_s3_low": "🪶 ہلکا ترین",
    "adj_baro_f1_s3_high": "🪨 بھاری ترین",
    "adj_baro_f1_s4_title": "🛋️ پیمانہ 4: سختی اور بناوٹ",
    "adj_baro_f1_s4_desc": "الفاظ کو نرم ترین سے سخت ترین میں ترتیب دیں:",
    "adj_baro_f1_s4_low": "☁️ نرم ترین",
    "adj_baro_f1_s4_high": "💎 سخت ترین",
    "adj_baro_f1_s5_title": "🫙 پیمانہ 5: گنجائش اور بھرپور پن",
    "adj_baro_f1_s5_desc": "الفاظ کو خالی سے بھرے ہوئے میں ترتیب دیں:",
    "adj_baro_f1_s5_low": "🫙 بالکل خالی",
    "adj_baro_f1_s5_high": "📦 بالکل بھرا ہوا",
    "adj_baro_f1_s6_title": "📏 پیمانہ 6: لمبائی اور مدت",
    "adj_baro_f1_s6_desc": "الفاظ کو مختصر ترین سے طویل ترین میں ترتیب دیں:",
    "adj_baro_f1_s6_low": "⚡ مختصر ترین",
    "adj_baro_f1_s6_high": "♾️ طویل ترین",
    "adj_baro_f2_s1_title": "🏃 پیمانہ 1: رفتار اور لے",
    "adj_baro_f2_s1_desc": "الفاظ کو رفتار کے لحاظ سے سست ترین سے تیز ترین میں ترتیب دیں:",
    "adj_baro_f2_s1_low": "🐢 سست ترین",
    "adj_baro_f2_s1_high": "⚡ تیز ترین",
    "adj_baro_f2_s2_title": "🎂 پیمانہ 2: عمر",
    "adj_baro_f2_s2_desc": "الفاظ کو کم عمر ترین سے معمر ترین میں ترتیب دیں:",
    "adj_baro_f2_s2_low": "👶 کم عمر ترین",
    "adj_baro_f2_s2_high": "👴 معمر ترین",
    "adj_baro_f2_s3_title": "⏳ پیمانہ 3: مدت",
    "adj_baro_f2_s3_desc": "واقعات کو کم ترین سے طویل ترین مدت میں ترتیب دیں:",
    "adj_baro_f2_s3_low": "⚡ چند سیکنڈ",
    "adj_baro_f2_s3_high": "♾️ بہت طویل وقت",
    "adj_baro_f2_s4_title": "🔄 پیمانہ 4: تکرار",
    "adj_baro_f2_s4_desc": "الفاظ کو اس بنیاد پر ترتیب دیں کہ کوئی کام کتنی بار ہوتا ہے:",
    "adj_baro_f2_s4_low": "🚫 تقریباً کبھی نہیں",
    "adj_baro_f2_s4_high": "🔁 ہر وقت",
    "adj_baro_f2_s5_title": "🎯 پیمانہ 5: پابندی وقت اور درستگی",
    "adj_baro_f2_s5_desc": "سب سے زیادہ تاخیر سے بالکل وقت پر ترتیب دیں:",
    "adj_baro_f2_s5_low": "⚠️ بہت زیادہ دیر",
    "adj_baro_f2_s5_high": "🎯 عین وقت پر",
    "adj_baro_f2_s6_title": "📅 پیمانہ 6: وقتی تسلسل اور دور حاضر",
    "adj_baro_f2_s6_desc": "ایک عمل کے مراحل کو ماضی سے حال میں ترتیب دیں:",
    "adj_baro_f2_s6_low": "📜 ماضی",
    "adj_baro_f2_s6_high": "📍 ابھی، اس وقت",
    "adj_baro_f3_s1_title": "⭐ پیمانہ 1: معیار",
    "adj_baro_f3_s1_desc": "جائزوں کو بدترین سے بہترین میں ترتیب دیں:",
    "adj_baro_f3_s1_low": "🗑️ بدترین",
    "adj_baro_f3_s1_high": "🏆 بہترین",
    "adj_baro_f3_s2_title": "🧠 پیمانہ 2: مشکل کی سطح",
    "adj_baro_f3_s2_desc": "کاموں کو آسان ترین سے مشکل ترین میں ترتیب دیں:",
    "adj_baro_f3_s2_low": "👶 آسان ترین",
    "adj_baro_f3_s2_high": "🧩 مشکل ترین",
    "adj_baro_f3_s3_title": "💰 پیمانہ 3: قیمت کی سطح",
    "adj_baro_f3_s3_desc": "قیمت کے لحاظ سے مفت سے لے کر انتہائی مہنگے تک ترتیب دیں:",
    "adj_baro_f3_s3_low": "🪙 0 کرون",
    "adj_baro_f3_s3_high": "💎 بھاری دولت",
    "adj_baro_f3_s4_title": "📌 پیمانہ 4: اہمیت اور ترجیح",
    "adj_baro_f3_s4_desc": "معلومات کو بالکل غیر اہم سے لے کر ناگزیر تک ترتیب دیں:",
    "adj_baro_f3_s4_low": "💤 غیر اہم",
    "adj_baro_f3_s4_high": "🚨 ناگزیر",
    "adj_baro_f3_s5_title": "🔍 پیمانہ 5: مکملیت",
    "adj_baro_f3_s5_desc": "رپورٹ کے معیار کو بیکار سے بہترین میں ترتیب دیں:",
    "adj_baro_f3_s5_low": "❌ بیکار",
    "adj_baro_f3_s5_high": "💯 بالکل پرفیکٹ",
    "adj_baro_f3_s6_title": "⚙️ پیمانہ 6: پیچیدگی",
    "adj_baro_f3_s6_desc": "اصول کو آسان ترین سے پیچیدہ ترین میں ترتیب دیں:",
    "adj_baro_f3_s6_low": "🔹 سادہ ترین",
    "adj_baro_f3_s6_high": "🌀 پیچیدہ ترین",
    "adj_baro_f4_s1_title": "😊 پیمانہ 1: خوشی اور موڈ",
    "adj_baro_f4_s1_desc": "جذبات کو اداس ترین سے خوش ترین میں ترتیب دیں:",
    "adj_baro_f4_s1_low": "😢 دل شکستہ",
    "adj_baro_f4_s1_high": "🎉 انتہائی خوش",
    "adj_baro_f4_s2_title": "⚡ پیمانہ 2: توانائی اور چستی",
    "adj_baro_f4_s2_desc": "توانائی کی سطح کو مکمل تھکن سے لے کر بھرپور توانائی تک ترتیب دیں:",
    "adj_baro_f4_s2_low": "🪫 نڈھال",
    "adj_baro_f4_s2_high": "🔋 توانائی سے بھرپور",
    "adj_baro_f4_s3_title": "🧘 پیمانہ 3: سکون بمقابلہ گھبراہٹ",
    "adj_baro_f4_s3_desc": "سب سے زیادہ پرسکون سے خوفزدہ ترین / بدحواس تک ترتیب دیں:",
    "adj_baro_f4_s3_low": "🕊️ بالکل پرسکون",
    "adj_baro_f4_s3_high": "😱 سخت بدحواس",
    "adj_baro_f4_s4_title": "🧸 پیمانہ 4: تحفظ اور خوف",
    "adj_baro_f4_s4_desc": "مکمل محفوظ سے لے کر شدید خوفزدہ تک ترتیب دیں:",
    "adj_baro_f4_s4_low": "🛡️ بالکل محفوظ",
    "adj_baro_f4_s4_high": "😨 خوف سے کانپتا ہوا",
    "adj_baro_f4_s5_title": "💖 پیمانہ 5: خوش اخلاقی اور شفقت",
    "adj_baro_f4_s5_desc": "رویوں کو بد اخلاق ترین سے مشفق ترین میں ترتیب دیں:",
    "adj_baro_f4_s5_low": "🧊 غیر دوستانہ / سرد مہر",
    "adj_baro_f4_s5_high": "☀️ درد مند / مشفق",
    "adj_baro_f4_s6_title": "👍 پیمانہ 6: اطمینان اور رضامندی",
    "adj_baro_f4_s6_desc": "گاہک کے ردعمل کو غصے سے بھرپور سے لے کر پرجوش تک ترتیب دیں:",
    "adj_baro_f4_s6_low": "😡 آگ بگولا",
    "adj_baro_f4_s6_high": "🤩 انتہائی پرجوش",
    "adj_baro_f5_s1_title": "🧽 پیمانہ 1: صفائی",
    "adj_baro_f5_s1_desc": "گندے ترین سے چمکدار صاف تک ترتیب دیں:",
    "adj_baro_f5_s1_low": "👞 گھناؤنا / گندا",
    "adj_baro_f5_s1_high": "✨ چمکدار صاف",
    "adj_baro_f5_s2_title": "🍎 پیمانہ 2: صحت اور تندرستی",
    "adj_baro_f5_s2_desc": "شدید بیمار سے لے کر ہشاش بشاش اور صحت مند تک ترتیب دیں:",
    "adj_baro_f5_s2_low": "🤒 شدید بیمار",
    "adj_baro_f5_s2_high": "💪 ہشاش بشاش اور صحت مند",
    "adj_baro_f5_s3_title": "💧 پیمانہ 3: نمی",
    "adj_baro_f5_s3_desc": "بالکل خشک سے لے کر شرابور تک ترتیب دیں:",
    "adj_baro_f5_s3_low": "🏜️ بالکل خشک",
    "adj_baro_f5_s3_high": "🌊 پانی میں شرابور",
    "adj_baro_f5_s4_title": "💡 پیمانہ 4: روشنی کی سطح",
    "adj_baro_f5_s4_desc": "گھپ اندھیرے سے چندھیا دینے والی روشنی تک ترتیب دیں:",
    "adj_baro_f5_s4_low": "🌑 گھپ اندھیرا",
    "adj_baro_f5_s4_high": "☀️ چندھیا دینے والی روشنی",
    "adj_baro_f5_s5_title": "📊 پیمانہ 5: مقدار",
    "adj_baro_f5_s5_desc": "مقداروں کو کچھ نہیں سے لے کر بے شمار تک ترتیب دیں:",
    "adj_baro_f5_s5_low": "0️⃣ کوئی نہیں",
    "adj_baro_f5_s5_high": "♾️ بے شمار",
    "adj_baro_f5_s6_title": "🧭 پیمانہ 6: یقین اور پختگی",
    "adj_baro_f5_s6_desc": "بالکل غیر یقینی سے لے کر روزِ روشن کی طرح واضح یقین تک ترتیب دیں:",
    "adj_baro_f5_s6_low": "❓ مشکوک",
    "adj_baro_f5_s6_high": "✔️ بالکل واضح",
    "top100_adj_hub_title": "100 سب سے زیادہ عام صفات",
    "top100_adj_hub_desc": "صفات دنیا کو بیان کرتی ہیں، باریکیاں پیدا کرتی ہیں اور تضادات کو ظاہر کرتی ہیں۔ 5 معنوی میدانوں میں تقسیم شدہ 100 سب سے عام ڈینش صفات دریافت کریں – اور فیلڈ 6 میں گردان کی مکمل گائیڈ پر عبور حاصل کریں!",
    "top100_adj_f1_badge": "🔬 فیلڈ 1: 20 قابل پیمائش متضادات",
    "top100_adj_f1_title": "1. مادی خصوصیات، شکل اور حواس",
    "top100_adj_f1_desc": "روزمرہ کی زندگی میں ہر اس چیز کا احاطہ کرتا ہے جسے ناپا، چھوا یا محسوس کیا جا سکتا ہے: <em>stor (بڑا) / lille (چھوٹا)، lang (لمبا) / kort (مختصر)، høj (اونچا) / lav (نیچا)، bred (چوڑا) / smal (تنگ)، tung (بھاری) / let (ہلکا)، varm (گرم) / kold (سرد/ٹھنڈا)، hård (سخت) / blød (نرم)، fast (مستحکم/مضبوط) / løs (ڈھیلا)، fuld (بھرا ہوا) / tom (خالی)، åben (کھلا) / lukket (بند)</em>۔",
    "top100_adj_f1_btn": "فیلڈ 1 پر جائیں ➔",
    "top100_adj_f2_badge": "⏱️ فیلڈ 2: وقت سے متعلق 20 صفات",
    "top100_adj_f2_title": "2. وقت، عمر اور رفتار",
    "top100_adj_f2_desc": "روزمرہ کی زندگی میں زمانی ترتیب، تبدیلی اور رفتار: <em>ny (نیا) / gammel (پرانا)، ung (جوان) / gammel (بوڑھا)، tidlig (جلدی) / sen (دیر سے)، hurtig (تیز) / langsom (سست)، pludselig (اچانک)، forsinket (تاخیر کا شکار)، travl (مصروف)، rolig (پرسکون)...</em>",
    "top100_adj_f2_btn": "فیلڈ 2 پر جائیں ➔",
    "top100_adj_f3_badge": "💎 فیلڈ 3: تخمینے اور جائزے کی 20 صفات",
    "top100_adj_f3_title": "3. معیار، مشکل کی سطح اور مالیات",
    "top100_adj_f3_desc": "تخمینہ، قیمتیں، کوشش اور قدر: <em>god (اچھا) / dårlig (برا)، svær (مشکل) / let (آسان)، dyr (مہنگا) / billig (سستا)، vigtig (اہم) / ligegyldig (غیر اہم)، nødvendig (ضروری)، gratis (مفت)، perfekt (بہترین/کامل)، forkert (غلط)...</em>",
    "top100_adj_f3_btn": "فیلڈ 3 پر جائیں ➔",
    "top100_adj_f4_badge": "❤️ فیلڈ 4: 20 سماجی صفات",
    "top100_adj_f4_title": "4. جذبات، شخصیت اور تعلقات",
    "top100_adj_f4_desc": "انسانی کیفیات اور سماجی رابطہ: <em>glad (خوش) / ked af det (اداس)، venlig (مہربان) / uvenlig (نامهربان)، træt (تھکا ہوا) / frisk (تازہ دم)، tryg (محفوظ) / bange (خوفزدہ)، sur (بد مزاج/ناراض)، sød (پیارا/شیریں)، stolt (فخر محسوس کرنے والا)، rolig (پرسکون)...</em>",
    "top100_adj_f4_btn": "فیلڈ 4 پر جائیں ➔",
    "top100_adj_f5_badge": "🎨 فیلڈ 5: حالت و کیفیت کی 20 صفات",
    "top100_adj_f5_title": "5. رنگ، مقدار اور حالات",
    "top100_adj_f5_desc": "روزمرہ کی زندگی میں بصری اور عملی حالات: <em>rød (سرخ)، blå (نیلا)، grøn (سبز)، hel (مکمل) / halv (آدھا)، mange (بہت سے) / få (چند)، ren (صاف) / beskidt (گندا)، sund (صحت مند) / syg (بیمار)، klar (تیار/واضح)، sikker (محفوظ/یقینی)، rigtig (درست/صحیح)...</em>",
    "top100_adj_f5_btn": "فیلڈ 5 پر جائیں ➔",
    "top100_adj_f6_badge": "📏 فیلڈ 6 • گردان کے ماہر (صفت کے درجات اور e کا قاعدہ)",
    "top100_adj_f6_title": "6. گردان کی جامع گائیڈ: صفت کے درجات اور e کا قاعدہ",
    "top100_adj_f6_desc": "مکمل انٹرایکٹو گردان انجن: <strong>1. صفت نفسی (Positiv)</strong> (<em>stor</em>) ➔ <strong>2. صفت بعض (Komparativ)</strong> مع \"end\" (<em>større end</em>) ➔ <strong>3. صفت کل (Superlativ)</strong> (<em>størst / den største</em>)، نیز اس اصول کے ساتھ کہ <em>den/min/denne/Peters</em> ہمیشہ <strong>-e</strong> کے اضافے پر کیوں مجبور کرتے ہیں!",
    "top100_adj_f6_btn": "گردان گائیڈ کھولیں 📏 ➔",
    "top100_adj_ped_title": "💡 آپ صفات کو کس طرح بہترین طریقے سے سیکھ سکتے ہیں؟",
    "top100_adj_ped_item1_title": "⚖️ بصری متضادات",
    "top100_adj_ped_item1_desc": "صفات باہمی تعلقات کی وضاحت کرتی ہیں۔ <em>varm ↔ kold</em> کو ایک ساتھ سیکھنے سے، دونوں الفاظ آدھے وقت میں دماغ کے معنوی نیٹ ورک میں محفوظ ہو جاتے ہیں۔",
    "top100_adj_ped_item2_title": "🧩 مطابقت اور گردان",
    "top100_adj_ped_item2_desc": "ایک صفت کبھی تنہا نہیں آتی – یہ جنس اور تعداد کے مطابق بدلتی ہے: <em>en varm te</em> (مشترک جنس)، <em>et varmt bad</em> (غیر جانبدار جنس: -t)، <em>de varme dage</em> (جمع: -e)۔",
    "top100_adj_ped_item3_title": "🌡️ پیمانہ اور شدت",
    "top100_adj_ped_item3_desc": "ایک بیرومیٹر پر الفاظ کی شدت دریافت کریں: <em>iskold</em> (برف جیسا ٹھنڈا) ➔ <em>kold</em> (ٹھنڈا) ➔ <em>lun</em> (نیم گرم) ➔ <em>varm</em> (گرم) ➔ <em>kogende</em> (کھولتا ہوا)۔",
    "adj_tab_1": "1. متضادات کا مطالعہ",
    "adj_tab_2": "2. متضاد تلاش کریں (مقابلہ)",
    "adj_tab_3": "3. مترادفات اور باریکیاں",
    "adj_tab_4": "4. بیرومیٹر (پیمانہ)",
    "adj_tab_5": "5. مطابقت (-t / -e)",
    "adj_tab_6": "6. سیاق و سباق اور کہانی",
    "adj_pure_label": "خالص تصویر دیکھیں:",
    "adj_listen_word": "ہدف لفظ سنیں",
    "adj_listen_pronunciation": "تلفظ سنیں",
    "adj_modpol_label": "متضاد:",
    "adj_faelles_label": "مشترک جنس (en ...)",
    "adj_intet_label": "غیر جانبدار جنس (et ... / +t)",
    "adj_flertal_label": "معرفہ / جمع (+e)",
    "adj_example_sentence": "سادہ جملہ:",
    "adj_status_on": "چالو",
    "adj_status_off": "بند",
    "adj_click_hotspot_hint": "تلفظ سننے اور سامنے والے کمرے میں اس کا متضاد دیکھنے کے لیے ایک نقطے پر کلک کریں!"
  },
  "ru": {
    "adj_baro_counter": "Барометр {current} из {total}",
    "adj_baro_step": "[ Шаг {n} ]",
    "adj_baro_remove_tooltip": "Нажмите, чтобы удалить это слово",
    "adj_baro_reset_btn": "Сбросить шкалу 🔄",
    "adj_baro_check_btn": "Проверить порядок ✔️",
    "adj_baro_next_btn": "Следующая шкала ➔",
    "adj_baro_master_btn": "Вы освоили барометр! 🏆",
    "adj_baro_success": "🎉 Отлично отсортировано! Вы расположили слова в абсолютно правильном порядке:",
    "adj_baro_wrong": "Ещё не совсем верно. Некоторые слова стоят не в том порядке.",
    "adj_baro_hint": "Подсказка: подумайте сначала о самом слабом проявлении, а в конце — о самом сильном!",
    "adj_kongruens_subprompt": "Выберите правильную форму прилагательного:",
    "adj_grammar_banner_title": "Хотите основательно изучить все правила склонения прилагательных?",
    "adj_grammar_banner_desc": "Узнайте об основной форме, среднем роде (-t), определённой форме и множественном числе (-e), а также о степенях сравнения.",
    "adj_grammar_banner_btn": "Перейти к руководству по склонению ➔",
    "adj_story_subprompt": "Какое слово лучше всего подходит к этой ситуации?",
    "adj_duel_counter": "⚔️ Дуэль {current} из {total}",
    "adj_nuance_counter": "🔄 Нюанс {current} из {total}",
    "adj_kongruens_counter": "🧩 Согласование {current} из {total}",
    "adj_situation_counter": "📖 Ситуация {current} из {total}",
    "adj_score_label": "Баллы:",
    "adj_next_duel": "Следующая дуэль ➔",
    "adj_next_nuance": "Следующий нюанс ➔",
    "adj_next_kongruens": "Следующее задание ➔",
    "adj_next_situation": "Следующая ситуация ➔",
    "adj_result_duel_btn": "Посмотреть результат ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Завершить синонимы ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Посмотреть результат склонения ({score}/{total}) 🏆",
    "adj_result_story_btn": "Посмотреть результат ({score}/{total}) 🌟",
    "adj_retry_btn": "Попробовать снова 🔄",
    "adj_correct_feedback": "🎉 Правильно!",
    "adj_wrong_feedback": "Не совсем так:",
    "adj_correct_answer_is": "Правильный ответ:",
    "adj_duel_modal_title": "Отличная работа в дуэли антонимов!",
    "adj_duel_modal_score": "Вы правильно определили <strong>{score}</strong> из <strong>{total}</strong> противоположностей.",
    "adj_syn_modal_title": "Отличный словарный запас!",
    "adj_syn_modal_score": "Вы правильно выбрали <strong>{score}</strong> из <strong>{total}</strong> смысловых оттенков.",
    "adj_kong_modal_title": "Отличная работа с окончаниями прилагательных!",
    "adj_kong_modal_score": "Вы правильно выбрали <strong>{score}</strong> из <strong>{total}</strong> окончаний.",
    "adj_story_modal_title": "Отличное понимание текста!",
    "adj_story_modal_score": "У вас <strong>{score}</strong> правильных ответов из <strong>{total}</strong>.",
    "adj_f1_stage_warm": "☀️ Уютный дом (10 свойств)",
    "adj_f1_stage_cool": "❄️ Прочная мастерская (10 противоположностей)",
    "adj_f2_stage_title": "⏱️ Вокзал и скорость (20 временных прилагательных)",
    "adj_f3_stage_left": "💎 Ценность и совершенство",
    "adj_f3_stage_right": "⚙️ Степень сложности и комплексность",
    "adj_f4_stage_left": "❤️ Общественная жизнь и радость",
    "adj_f4_stage_right": "🌧️ Трудности и дискомфорт",
    "adj_f5_stage_left": "🌿 Чистота, здоровье и равновесие",
    "adj_f5_stage_right": "🌑 Беспорядок, болезнь и тьма",
    "adj_baro_f1_s1_title": "🌡️ Шкала 1: Температура",
    "adj_baro_f1_s1_desc": "Расположите слова по температуре от самого холодного к самому тёплому:",
    "adj_baro_f1_s1_low": "🥶 Самый холодный",
    "adj_baro_f1_s1_high": "🔥 Самый тёплый",
    "adj_baro_f1_s2_title": "📐 Шкала 2: Размер",
    "adj_baro_f1_s2_desc": "Расположите слова по размеру от самого маленького к самому большому:",
    "adj_baro_f1_s2_low": "🔬 Самый маленький",
    "adj_baro_f1_s2_high": "🐘 Самый большой",
    "adj_baro_f1_s3_title": "⚖️ Шкала 3: Вес",
    "adj_baro_f1_s3_desc": "Расположите слова от самого лёгкого к самому тяжёлому:",
    "adj_baro_f1_s3_low": "🪶 Самый лёгкий",
    "adj_baro_f1_s3_high": "🪨 Самый тяжёлый",
    "adj_baro_f1_s4_title": "🛋️ Шкала 4: Твёрдость и текстура",
    "adj_baro_f1_s4_desc": "Расположите слова от самого мягкого к самому твёрдому:",
    "adj_baro_f1_s4_low": "☁️ Самый мягкий",
    "adj_baro_f1_s4_high": "💎 Самый твёрдый",
    "adj_baro_f1_s5_title": "🫙 Шкала 5: Вместимость и наполненность",
    "adj_baro_f1_s5_desc": "Расположите слова от пустого к полному:",
    "adj_baro_f1_s5_low": "🫙 Совершенно пусто",
    "adj_baro_f1_s5_high": "📦 Полностью заполнено",
    "adj_baro_f1_s6_title": "📏 Шкала 6: Длина и продолжительность",
    "adj_baro_f1_s6_desc": "Расположите слова от самого короткого к самому длинному:",
    "adj_baro_f1_s6_low": "⚡ Самый короткий",
    "adj_baro_f1_s6_high": "♾️ Самый длинный",
    "adj_baro_f2_s1_title": "🏃 Шкала 1: Скорость и темп",
    "adj_baro_f2_s1_desc": "Расположите слова по скорости от самого медленного к самому быстрому:",
    "adj_baro_f2_s1_low": "🐢 Самый медленный",
    "adj_baro_f2_s1_high": "⚡ Самый быстрый",
    "adj_baro_f2_s2_title": "🎂 Шкала 2: Возраст",
    "adj_baro_f2_s2_desc": "Расположите слова от самого молодого к самому старому:",
    "adj_baro_f2_s2_low": "👶 Самый молодой",
    "adj_baro_f2_s2_high": "👴 Самый старый",
    "adj_baro_f2_s3_title": "⏳ Шкала 3: Длительность",
    "adj_baro_f2_s3_desc": "Расположите события от самых коротких по длительности к самым долгим:",
    "adj_baro_f2_s3_low": "⚡ Несколько секунд",
    "adj_baro_f2_s3_high": "♾️ Очень долгое время",
    "adj_baro_f2_s4_title": "🔄 Шкала 4: Частота",
    "adj_baro_f2_s4_desc": "Расположите слова по тому, как часто что-то происходит:",
    "adj_baro_f2_s4_low": "🚫 Почти никогда",
    "adj_baro_f2_s4_high": "🔁 Всё время",
    "adj_baro_f2_s5_title": "🎯 Шкала 5: Пунктуальность и точность",
    "adj_baro_f2_s5_desc": "Расположите от самого опоздавшего до абсолютно точного по времени:",
    "adj_baro_f2_s5_low": "⚠️ Слишком поздно",
    "adj_baro_f2_s5_high": "🎯 Точно вовремя",
    "adj_baro_f2_s6_title": "📅 Шкала 6: Актуальность / Временная шкала",
    "adj_baro_f2_s6_desc": "Расположите этапы процесса от прошлого к настоящему:",
    "adj_baro_f2_s6_low": "📜 Прошлое",
    "adj_baro_f2_s6_high": "📍 Прямо сейчас",
    "adj_baro_f3_s1_title": "⭐ Шкала 1: Качество",
    "adj_baro_f3_s1_desc": "Расположите оценки от худшей к лучшей:",
    "adj_baro_f3_s1_low": "🗑️ Худший",
    "adj_baro_f3_s1_high": "🏆 Лучший",
    "adj_baro_f3_s2_title": "🧠 Шкала 2: Уровень сложности",
    "adj_baro_f3_s2_desc": "Расположите задания от самого лёгкого к самому сложному:",
    "adj_baro_f3_s2_low": "👶 Самый лёгкий",
    "adj_baro_f3_s2_high": "🧩 Самый сложный",
    "adj_baro_f3_s3_title": "💰 Шкала 3: Уровень цен",
    "adj_baro_f3_s3_desc": "Расположите по цене от бесплатного к чрезвычайно дорогому:",
    "adj_baro_f3_s3_low": "🪙 0 крон",
    "adj_baro_f3_s3_high": "💎 Целое состояние",
    "adj_baro_f3_s4_title": "📌 Шкала 4: Важность и приоритет",
    "adj_baro_f3_s4_desc": "Расположите информацию от совершенно незначительной до незаменимой:",
    "adj_baro_f3_s4_low": "💤 Незначительный",
    "adj_baro_f3_s4_high": "🚨 Незаменимый",
    "adj_baro_f3_s5_title": "🔍 Шкала 5: Полнота",
    "adj_baro_f3_s5_desc": "Расположите качество отчёта от непригодного до идеального:",
    "adj_baro_f3_s5_low": "❌ Непригодный",
    "adj_baro_f3_s5_high": "💯 Идеальный",
    "adj_baro_f3_s6_title": "⚙️ Шкала 6: Сложность и комплексность",
    "adj_baro_f3_s6_desc": "Расположите правила от самых простых к самым сложным:",
    "adj_baro_f3_s6_low": "🔹 Самый простой",
    "adj_baro_f3_s6_high": "🌀 Самый сложный",
    "adj_baro_f4_s1_title": "😊 Шкала 1: Радость и настроение",
    "adj_baro_f4_s1_desc": "Расположите эмоции от самой грустной к самой счастливой:",
    "adj_baro_f4_s1_low": "😢 С разбитым сердцем",
    "adj_baro_f4_s1_high": "🎉 Счастливый",
    "adj_baro_f4_s2_title": "⚡ Шкала 2: Энергия и бодрость",
    "adj_baro_f4_s2_desc": "Расположите уровень энергии от полного истощения до переполняющей энергии:",
    "adj_baro_f4_s2_low": "🪫 Истощённый",
    "adj_baro_f4_s2_high": "🔋 Полон энергии",
    "adj_baro_f4_s3_title": "🧘 Шкала 3: Спокойствие против нервозности",
    "adj_baro_f4_s3_desc": "Расположите от самого спокойного к самому испуганному / паникующему:",
    "adj_baro_f4_s3_low": "🕊️ Совершенно спокоен",
    "adj_baro_f4_s3_high": "😱 В панике",
    "adj_baro_f4_s4_title": "🧸 Шкала 4: Безопасность и страх",
    "adj_baro_f4_s4_desc": "Расположите от полной безопасности к смертельному ужасу:",
    "adj_baro_f4_s4_low": "🛡️ В полной безопасности",
    "adj_baro_f4_s4_high": "😨 В ужасе",
    "adj_baro_f4_s5_title": "💖 Шкала 5: Доброжелательность",
    "adj_baro_f4_s5_desc": "Расположите поведение от самого неприветливого к самому душевному:",
    "adj_baro_f4_s5_low": "🧊 Неприветливый / холодный",
    "adj_baro_f4_s5_high": "☀️ Сердечный",
    "adj_baro_f4_s6_title": "👍 Шкала 6: Удовлетворённость",
    "adj_baro_f4_s6_desc": "Расположите реакцию клиента от ярости к восторгу:",
    "adj_baro_f4_s6_low": "😡 В ярости",
    "adj_baro_f4_s6_high": "🤩 В восторге",
    "adj_baro_f5_s1_title": "🧽 Шкала 1: Чистота",
    "adj_baro_f5_s1_desc": "Расположите от самого грязного к сияющему чистотой:",
    "adj_baro_f5_s1_low": "👞 Отвратительный / грязный",
    "adj_baro_f5_s1_high": "✨ Сияющий чистотой",
    "adj_baro_f5_s2_title": "🍎 Шкала 2: Здоровье и форма",
    "adj_baro_f5_s2_desc": "Расположите от тяжелобольного к пышущему здоровьем:",
    "adj_baro_f5_s2_low": "🤒 Тяжело болен",
    "adj_baro_f5_s2_high": "💪 Пышет здоровьем",
    "adj_baro_f5_s3_title": "💧 Шкала 3: Влажность",
    "adj_baro_f5_s3_desc": "Расположите от совершенно сухого к насквозь промокшему:",
    "adj_baro_f5_s3_low": "🏜️ Совершенно сухой",
    "adj_baro_f5_s3_high": "🌊 Насквозь промокший",
    "adj_baro_f5_s4_title": "💡 Шкала 4: Уровень освещённости",
    "adj_baro_f5_s4_desc": "Расположите от кромешной тьмы к ослепительному свету:",
    "adj_baro_f5_s4_low": "🌑 Кромешная тьма",
    "adj_baro_f5_s4_high": "☀️ Ослепительно яркий",
    "adj_baro_f5_s5_title": "📊 Шкала 5: Количество",
    "adj_baro_f5_s5_desc": "Расположите количества от нуля до бесчисленного множества:",
    "adj_baro_f5_s5_low": "0️⃣ Ни одного",
    "adj_baro_f5_s5_high": "♾️ Бесчисленное множество",
    "adj_baro_f5_s6_title": "🧭 Шкала 6: Уверенность и надёжность",
    "adj_baro_f5_s6_desc": "Расположите от полной неуверенности к кристально ясной определённости:",
    "adj_baro_f5_s6_low": "❓ Сомнительно",
    "adj_baro_f5_s6_high": "✔️ Предельно ясно",
    "top100_adj_hub_title": "100 самых распространенных прилагательных",
    "top100_adj_hub_desc": "Прилагательные описывают мир, добавляют оттенки смысла и выражают контрасты. Исследуйте 100 самых распространенных датских прилагательных, разделенных на 5 семантических групп, и освойте полные правила склонения в Разделе 6!",
    "top100_adj_f1_badge": "🔬 Раздел 1: 20 измеримых противоположностей",
    "top100_adj_f1_title": "1. Физические свойства, форма и чувства",
    "top100_adj_f1_desc": "Охватывает всё, что можно измерить, осязать или почувствовать в повседневной жизни: <em>stor (большой) / lille (маленький), lang (длинный) / kort (короткий), høj (высокий) / lav (низкий), bred (широкий) / smal (узкий), tung (тяжелый) / let (легкий), varm (теплый/горячий) / kold (холодный), hård (твердый) / blød (мягкий), fast (плотный/упругий) / løs (свободный/рыхлый), fuld (полный) / tom (пустой), åben (открытый) / lukket (закрытый)</em>.",
    "top100_adj_f1_btn": "Перейти к разделу 1 ➔",
    "top100_adj_f2_badge": "⏱️ Раздел 2: 20 прилагательных времени",
    "top100_adj_f2_title": "2. Время, возраст и темп",
    "top100_adj_f2_desc": "Хронология, развитие и скорость в повседневной жизни: <em>ny (новый) / gammel (старый), ung (молодой) / gammel (старый), tidlig (ранний) / sen (поздний), hurtig (быстрый) / langsom (медленный), pludselig (внезапный), forsinket (опоздавший), travl (занятой), rolig (спокойный)...</em>",
    "top100_adj_f2_btn": "Перейти к разделу 2 ➔",
    "top100_adj_f3_badge": "💎 Раздел 3: 20 оценочных прилагательных",
    "top100_adj_f3_title": "3. Качество, сложность и стоимость",
    "top100_adj_f3_desc": "Оценка, цены, усилия и ценность: <em>god (хороший) / dårlig (плохой), svær (трудный) / let (легкий), dyr (дорогой) / billig (дешевый), vigtig (важный) / ligegyldig (неважный), nødvendig (необходимый), gratis (бесплатный), perfekt (идеальный), forkert (неправильный)...</em>",
    "top100_adj_f3_btn": "Перейти к разделу 3 ➔",
    "top100_adj_f4_badge": "❤️ Раздел 4: 20 социальных прилагательных",
    "top100_adj_f4_title": "4. Эмоции, характер и отношения",
    "top100_adj_f4_desc": "Душевные состояния человека и социальное общение: <em>glad (радостный) / ked af det (грустный), venlig (дружелюбный) / uvenlig (недружелюбный), træt (уставший) / frisk (бодрый), tryg (в безопасности) / bange (испуганный), sur (сердитый), sød (милый), stolt (гордый), rolig (спокойный)...</em>",
    "top100_adj_f4_btn": "Перейти к разделу 4 ➔",
    "top100_adj_f5_badge": "🎨 Раздел 5: 20 прилагательных состояния",
    "top100_adj_f5_title": "5. Цвета, количество и состояния",
    "top100_adj_f5_desc": "Визуальные и практические состояния в повседневной жизни: <em>rød (красный), blå (синий), grøn (зеленый), hel (целый) / halv (половинный), mange (многие/много) / få (немногие/мало), ren (чистый) / beskidt (грязный), sund (здоровый) / syg (больной), klar (готовый/ясный), sikker (уверенный/безопасный), rigtig (правильный)...</em>",
    "top100_adj_f5_btn": "Перейти к разделу 5 ➔",
    "top100_adj_f6_badge": "📏 Раздел 6 • Мастер словоизменения (степени сравнения и e-правило)",
    "top100_adj_f6_title": "6. Большой справочник по словоизменению: степени сравнения и e-правило",
    "top100_adj_f6_desc": "Полный интерактивный тренажер словоизменения: <strong>1. Положительная степень</strong> (<em>stor</em>) ➔ <strong>2. Сравнительная степень</strong> с \"end\" (<em>større end</em>) ➔ <strong>3. Превосходная степень</strong> (<em>størst / den største</em>), а также формула того, почему слова <em>den/min/denne/Peters</em> всегда требуют окончания <strong>-e</strong>!",
    "top100_adj_f6_btn": "Открыть справочник по словоизменению 📏 ➔",
    "top100_adj_ped_title": "💡 Как лучше всего учить прилагательные?",
    "top100_adj_ped_item1_title": "⚖️ Визуальные противоположности",
    "top100_adj_ped_item1_desc": "Прилагательные описывают отношения. Изучая пары вроде <em>varm ↔ kold</em> вместе, вы закрепляете оба слова в семантической памяти мозга вдвое быстрее.",
    "top100_adj_ped_item2_title": "🧩 Согласование и словоизменение",
    "top100_adj_ped_item2_desc": "Прилагательное никогда не употребляется само по себе — оно согласуется по роду и числу: <em>en varm te</em> (общий род), <em>et varmt bad</em> (средний род: -t), <em>de varme dage</em> (множественное число: -e).",
    "top100_adj_ped_item3_title": "🌡️ Шкала и интенсивность",
    "top100_adj_ped_item3_desc": "Определяйте силу слов по барометру: от <em>iskold</em> (ледяной) ➔ <em>kold</em> (холодный) ➔ <em>lun</em> (тепловатый) ➔ <em>varm</em> (теплый/горячий) ➔ <em>kogende</em> (кипящий).",
    "adj_tab_1": "1. Изучение контрастов",
    "adj_tab_2": "2. Найди противоположность (дуэль)",
    "adj_tab_3": "3. Синонимы и нюансы",
    "adj_tab_4": "4. Барометр (шкала)",
    "adj_tab_5": "5. Согласование (-t / -e)",
    "adj_tab_6": "6. Контекст и история",
    "adj_pure_label": "Посмотреть чистое изображение:",
    "adj_listen_word": "Прослушать целевое слово",
    "adj_listen_pronunciation": "Прослушать произношение",
    "adj_modpol_label": "Противоположность:",
    "adj_faelles_label": "Общий род (en ...)",
    "adj_intet_label": "Средний род (et ... / +t)",
    "adj_flertal_label": "Определенная форма / Множественное число (+e)",
    "adj_example_sentence": "Простое предложение:",
    "adj_status_on": "ВКЛ",
    "adj_status_off": "ВЫКЛ",
    "adj_click_hotspot_hint": "Нажмите на точку, чтобы услышать произношение и увидеть противоположность в другой комнате!"
  },
  "uk": {
    "adj_baro_counter": "Барометр {current} із {total}",
    "adj_baro_step": "[ Крок {n} ]",
    "adj_baro_remove_tooltip": "Натисніть, щоб вилучити це слово",
    "adj_baro_reset_btn": "Скинути шкалу 🔄",
    "adj_baro_check_btn": "Перевірити порядок ✔️",
    "adj_baro_next_btn": "Наступна шкала ➔",
    "adj_baro_master_btn": "Ви опанували барометр! 🏆",
    "adj_baro_success": "🎉 Чудово відсортовано! Ви розмістили слова в абсолютно правильному порядку:",
    "adj_baro_wrong": "Ще не зовсім правильно. Деякі слова стоять не в тому порядку.",
    "adj_baro_hint": "Підказка: подумайте спочатку про найслабший стан, а наприкінці — про найінтенсивніший!",
    "adj_kongruens_subprompt": "Оберіть правильну форму прикметника:",
    "adj_grammar_banner_title": "Хочете ґрунтовно вивчити всі правила відмінювання прикметників?",
    "adj_grammar_banner_desc": "Дізнайтеся про базову форму, середній рід (-t), означену форму та множину (-e), а також про ступені порівняння.",
    "adj_grammar_banner_btn": "Перейти до довідника з відмінювання ➔",
    "adj_story_subprompt": "Яке слово найкраще підходить до цієї ситуації?",
    "adj_duel_counter": "⚔️ Дуель {current} із {total}",
    "adj_nuance_counter": "🔄 Нюанс {current} із {total}",
    "adj_kongruens_counter": "🧩 Узгодження {current} із {total}",
    "adj_situation_counter": "📖 Ситуація {current} із {total}",
    "adj_score_label": "Бали:",
    "adj_next_duel": "Наступна дуель ➔",
    "adj_next_nuance": "Наступний нюанс ➔",
    "adj_next_kongruens": "Наступне завдання ➔",
    "adj_next_situation": "Наступна ситуація ➔",
    "adj_result_duel_btn": "Переглянути результат ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Завершити синоніми ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Переглянути результат відмінювання ({score}/{total}) 🏆",
    "adj_result_story_btn": "Переглянути результат ({score}/{total}) 🌟",
    "adj_retry_btn": "Спробувати знову 🔄",
    "adj_correct_feedback": "🎉 Правильно!",
    "adj_wrong_feedback": "Не зовсім так:",
    "adj_correct_answer_is": "Правильна відповідь:",
    "adj_duel_modal_title": "Чудова робота в дуелі антонімів!",
    "adj_duel_modal_score": "Ви правильно визначили <strong>{score}</strong> із <strong>{total}</strong> протилежностей.",
    "adj_syn_modal_title": "Чудовий словниковий запас!",
    "adj_syn_modal_score": "Ви правильно обрали <strong>{score}</strong> із <strong>{total}</strong> смислових відтінків.",
    "adj_kong_modal_title": "Чудова робота із закінченнями прикметників!",
    "adj_kong_modal_score": "Ви правильно обрали <strong>{score}</strong> із <strong>{total}</strong> закінчень.",
    "adj_story_modal_title": "Чудове розуміння прочитаного!",
    "adj_story_modal_score": "У вас <strong>{score}</strong> правильних відповідей із <strong>{total}</strong>.",
    "adj_f1_stage_warm": "☀️ Затишний дім (10 якостей)",
    "adj_f1_stage_cool": "❄️ Міцна майстерня (10 протилежностей)",
    "adj_f2_stage_title": "⏱️ Вокзал і швидкість (20 часових прикметників)",
    "adj_f3_stage_left": "💎 Цінність і досконалість",
    "adj_f3_stage_right": "⚙️ Рівень складності та комплексність",
    "adj_f4_stage_left": "❤️ Суспільне життя та радість",
    "adj_f4_stage_right": "🌧️ Труднощі та дискомфорт",
    "adj_f5_stage_left": "🌿 Чистота, здоров'я та рівновага",
    "adj_f5_stage_right": "🌑 Безлад, хвороба і темрява",
    "adj_baro_f1_s1_title": "🌡️ Шкала 1: Температура",
    "adj_baro_f1_s1_desc": "Розташуйте слова за температурою від найхолоднішого до найтеплішого:",
    "adj_baro_f1_s1_low": "🥶 Найхолодніший",
    "adj_baro_f1_s1_high": "🔥 Найтепліший",
    "adj_baro_f1_s2_title": "📐 Шкала 2: Розмір",
    "adj_baro_f1_s2_desc": "Розташуйте слова за розміром від найменшого до найбільшого:",
    "adj_baro_f1_s2_low": "🔬 Найменший",
    "adj_baro_f1_s2_high": "🐘 Найбільший",
    "adj_baro_f1_s3_title": "⚖️ Шкала 3: Вага",
    "adj_baro_f1_s3_desc": "Розташуйте слова від найлегшого до найважчого:",
    "adj_baro_f1_s3_low": "🪶 Найлегший",
    "adj_baro_f1_s3_high": "🪨 Найважчий",
    "adj_baro_f1_s4_title": "🛋️ Шкала 4: Твердість і текстура",
    "adj_baro_f1_s4_desc": "Розташуйте слова від найм'якшого до найтвердішого:",
    "adj_baro_f1_s4_low": "☁️ Найм'якший",
    "adj_baro_f1_s4_high": "💎 Найтвердіший",
    "adj_baro_f1_s5_title": "🫙 Шкала 5: Місткість і наповненість",
    "adj_baro_f1_s5_desc": "Розташуйте слова від порожнього до повного:",
    "adj_baro_f1_s5_low": "🫙 Зовсім порожньо",
    "adj_baro_f1_s5_high": "📦 Повністю заповнено",
    "adj_baro_f1_s6_title": "📏 Шкала 6: Довжина і тривалість",
    "adj_baro_f1_s6_desc": "Розташуйте слова від найкоротшого до найдовшого:",
    "adj_baro_f1_s6_low": "⚡ Найкоротший",
    "adj_baro_f1_s6_high": "♾️ Найдовший",
    "adj_baro_f2_s1_title": "🏃 Шкала 1: Швидкість і темп",
    "adj_baro_f2_s1_desc": "Розташуйте слова за швидкістю від найповільнішого до найшвидшого:",
    "adj_baro_f2_s1_low": "🐢 Найповільніший",
    "adj_baro_f2_s1_high": "⚡ Найшвидший",
    "adj_baro_f2_s2_title": "🎂 Шкала 2: Вік",
    "adj_baro_f2_s2_desc": "Розташуйте слова від наймолодшого до найстаршого:",
    "adj_baro_f2_s2_low": "👶 Наймолодший",
    "adj_baro_f2_s2_high": "👴 Найстарший",
    "adj_baro_f2_s3_title": "⏳ Шкала 3: Тривалість",
    "adj_baro_f2_s3_desc": "Розташуйте події від найкоротших за тривалістю до найдовших:",
    "adj_baro_f2_s3_low": "⚡ Кілька секунд",
    "adj_baro_f2_s3_high": "♾️ Дуже довгий час",
    "adj_baro_f2_s4_title": "🔄 Шкала 4: Частота",
    "adj_baro_f2_s4_desc": "Розташуйте слова за тим, як часто щось відбувається:",
    "adj_baro_f2_s4_low": "🚫 Майже ніколи",
    "adj_baro_f2_s4_high": "🔁 Весь час",
    "adj_baro_f2_s5_title": "🎯 Шкала 5: Пунктуальність і точність",
    "adj_baro_f2_s5_desc": "Розташуйте від найбільшого запізнення до абсолютно точного часу:",
    "adj_baro_f2_s5_low": "⚠️ Занадто пізно",
    "adj_baro_f2_s5_high": "🎯 Точно вчасно",
    "adj_baro_f2_s6_title": "📅 Шкала 6: Актуальність / Часова шкала",
    "adj_baro_f2_s6_desc": "Розташуйте етапи процесу від минулого до сьогодення:",
    "adj_baro_f2_s6_low": "📜 Минуле",
    "adj_baro_f2_s6_high": "📍 Прямо зараз",
    "adj_baro_f3_s1_title": "⭐ Шкала 1: Якість",
    "adj_baro_f3_s1_desc": "Розташуйте оцінки від найгіршої до найкращої:",
    "adj_baro_f3_s1_low": "🗑️ Найгірший",
    "adj_baro_f3_s1_high": "🏆 Найкращий",
    "adj_baro_f3_s2_title": "🧠 Шкала 2: Рівень складності",
    "adj_baro_f3_s2_desc": "Розташуйте завдання від найлегшого до найскладнішого:",
    "adj_baro_f3_s2_low": "👶 Найлегший",
    "adj_baro_f3_s2_high": "🧩 Найскладніший",
    "adj_baro_f3_s3_title": "💰 Шкала 3: Рівень цін",
    "adj_baro_f3_s3_desc": "Розташуйте за ціною від безкоштовного до надзвичайно дорогого:",
    "adj_baro_f3_s3_low": "🪙 0 крон",
    "adj_baro_f3_s3_high": "💎 Цілий статок",
    "adj_baro_f3_s4_title": "📌 Шкала 4: Важливість і пріоритет",
    "adj_baro_f3_s4_desc": "Розташуйте інформацію від абсолютно незначної до незамінної:",
    "adj_baro_f3_s4_low": "💤 Незначний",
    "adj_baro_f3_s4_high": "🚨 Незамінний",
    "adj_baro_f3_s5_title": "🔍 Шкала 5: Повнота",
    "adj_baro_f3_s5_desc": "Розташуйте якість звіту від непридатного до ідеального:",
    "adj_baro_f3_s5_low": "❌ Непридатний",
    "adj_baro_f3_s5_high": "💯 Ідеальний",
    "adj_baro_f3_s6_title": "⚙️ Шкала 6: Складність і комплексність",
    "adj_baro_f3_s6_desc": "Розташуйте правила від найпростіших до найскладніших:",
    "adj_baro_f3_s6_low": "🔹 Найпростіший",
    "adj_baro_f3_s6_high": "🌀 Найскладніший",
    "adj_baro_f4_s1_title": "😊 Шкала 1: Радість і настрій",
    "adj_baro_f4_s1_desc": "Розташуйте емоції від найсумнішої до найщасливішої:",
    "adj_baro_f4_s1_low": "😢 З розбитим серцем",
    "adj_baro_f4_s1_high": "🎉 Щасливий",
    "adj_baro_f4_s2_title": "⚡ Шкала 2: Енергія та бадьорість",
    "adj_baro_f4_s2_desc": "Розташуйте рівень енергії від повного виснаження до переповненої енергії:",
    "adj_baro_f4_s2_low": "🪫 Виснажений",
    "adj_baro_f4_s2_high": "🔋 Сповнений енергії",
    "adj_baro_f4_s3_title": "🧘 Шкала 3: Спокій проти нервозності",
    "adj_baro_f4_s3_desc": "Розташуйте від найспокійнішого до найбільш наляканого / панічного:",
    "adj_baro_f4_s3_low": "🕊️ Абсолютно спокійний",
    "adj_baro_f4_s3_high": "😱 У паніці",
    "adj_baro_f4_s4_title": "🧸 Шкала 4: Безпека та страх",
    "adj_baro_f4_s4_desc": "Розташуйте від повної безпеки до смертельного жаху:",
    "adj_baro_f4_s4_low": "🛡️ У повній безпеці",
    "adj_baro_f4_s4_high": "😨 Нажаханий",
    "adj_baro_f4_s5_title": "💖 Шкала 5: Доброзичливість",
    "adj_baro_f4_s5_desc": "Розташуйте поведінку від найнепривітнішої до найдушевнішої:",
    "adj_baro_f4_s5_low": "🧊 Непривітний / холодний",
    "adj_baro_f4_s5_high": "☀️ Сердечний",
    "adj_baro_f4_s6_title": "👍 Шкала 6: Задоволеність",
    "adj_baro_f4_s6_desc": "Розташуйте реакцію клієнта від люті до захвату:",
    "adj_baro_f4_s6_low": "😡 У люті",
    "adj_baro_f4_s6_high": "🤩 У захваті",
    "adj_baro_f5_s1_title": "🧽 Шкала 1: Чистота",
    "adj_baro_f5_s1_desc": "Розташуйте від найбруднішого до сяючого чистотою:",
    "adj_baro_f5_s1_low": "👞 Огидний / брудний",
    "adj_baro_f5_s1_high": "✨ Сяючий чистотою",
    "adj_baro_f5_s2_title": "🍎 Шкала 2: Здоров'я та форма",
    "adj_baro_f5_s2_desc": "Розташуйте від важкохворого до сповненого здоров'я:",
    "adj_baro_f5_s2_low": "🤒 Важко хворий",
    "adj_baro_f5_s2_high": "💪 Сповнений здоров'я",
    "adj_baro_f5_s3_title": "💧 Шкала 3: Вологість",
    "adj_baro_f5_s3_desc": "Розташуйте від абсолютно сухого до наскрізь промоклого:",
    "adj_baro_f5_s3_low": "🏜️ Абсолютно сухий",
    "adj_baro_f5_s3_high": "🌊 Наскрізь промоклий",
    "adj_baro_f5_s4_title": "💡 Шкала 4: Рівень освітленості",
    "adj_baro_f5_s4_desc": "Розташуйте від непроглядної темряви до сліпучого світла:",
    "adj_baro_f5_s4_low": "🌑 Непроглядна темрява",
    "adj_baro_f5_s4_high": "☀️ Сліпучо яскравий",
    "adj_baro_f5_s5_title": "📊 Шкала 5: Кількість",
    "adj_baro_f5_s5_desc": "Розташуйте кількості від нуля до незліченної кількості:",
    "adj_baro_f5_s5_low": "0️⃣ Жодного",
    "adj_baro_f5_s5_high": "♾️ Незліченна кількість",
    "adj_baro_f5_s6_title": "🧭 Шкала 6: Впевненість і надійність",
    "adj_baro_f5_s6_desc": "Розташуйте від повної невпевненості до кришталево ясної визначеності:",
    "adj_baro_f5_s6_low": "❓ Сумнівно",
    "adj_baro_f5_s6_high": "✔️ Кришталево зрозуміло",
    "top100_adj_hub_title": "100 найуживаніших прикметників",
    "top100_adj_hub_desc": "Прикметники описують світ, додають відтінків значення та виражають контрасти. Дослідіть 100 найуживаніших данських прикметників, поділених на 5 семантичних груп, і опануйте повні правила відмінювання в Розділі 6!",
    "top100_adj_f1_badge": "🔬 Розділ 1: 20 вимірюваних протилежностей",
    "top100_adj_f1_title": "1. Фізичні властивості, форма та відчуття",
    "top100_adj_f1_desc": "Охоплює все, що можна виміряти, відчути на дотик або сприйняти в повсякденному житті: <em>stor (великий) / lille (маленький), lang (довгий) / kort (короткий), høj (високий) / lav (низький), bred (широкий) / smal (вузький), tung (важкий) / let (легкий), varm (теплий/гарячий) / kold (холодний), hård (твердий) / blød (м'який), fast (пружний/твердий) / løs (вільний/пухкий), fuld (повний) / tom (порожній), åben (відкритий) / lukket (закритий)</em>.",
    "top100_adj_f1_btn": "Перейти до розділу 1 ➔",
    "top100_adj_f2_badge": "⏱️ Розділ 2: 20 прикметників часу",
    "top100_adj_f2_title": "2. Час, вік і темп",
    "top100_adj_f2_desc": "Хронологія, розвиток і швидкість у повсякденному житті: <em>ny (новий) / gammel (старий), ung (молодий) / gammel (старий), tidlig (ранній) / sen (пізній), hurtig (швидкий) / langsom (повільний), pludselig (раптовий), forsinket (запізнілий), travl (зайнятий), rolig (спокійний)...</em>",
    "top100_adj_f2_btn": "Перейти до розділу 2 ➔",
    "top100_adj_f3_badge": "💎 Розділ 3: 20 оцінних прикметників",
    "top100_adj_f3_title": "3. Якість, складність і фінанси",
    "top100_adj_f3_desc": "Оцінка, ціни, зусилля та цінність: <em>god (хороший) / dårlig (поганий), svær (складний) / let (простий), dyr (дорогий) / billig (дешевий), vigtig (важливий) / ligegyldig (неважливий), nødvendig (необхідний), gratis (безкоштовний), perfekt (ідеальний), forkert (неправильний)...</em>",
    "top100_adj_f3_btn": "Перейти до розділу 3 ➔",
    "top100_adj_f4_badge": "❤️ Розділ 4: 20 соціальних прикметників",
    "top100_adj_f4_title": "4. Емоції, особистість і стосунки",
    "top100_adj_f4_desc": "Душевні стани людей і соціальне спілкування: <em>glad (радісний) / ked af det (засмучений), venlig (привітний) / uvenlig (непривітний), træt (втомлений) / frisk (бадьорий), tryg (у безпеці) / bange (наляканий), sur (сердитий), sød (милий), stolt (гордий), rolig (спокійний)...</em>",
    "top100_adj_f4_btn": "Перейти до розділу 4 ➔",
    "top100_adj_f5_badge": "🎨 Розділ 5: 20 прикметників стану",
    "top100_adj_f5_title": "5. Кольори, кількість і стани",
    "top100_adj_f5_desc": "Візуальні та практичні стани в повсякденному житті: <em>rød (червоний), blå (синій), grøn (зелений), hel (цілий) / halv (половинний), mange (багато/чимало) / få (мало/небагато), ren (чистий) / beskidt (брудний), sund (здоровий) / syg (хворий), klar (готовий/ясний), sikker (упевнений/безпечний), rigtig (правильний)...</em>",
    "top100_adj_f5_btn": "Перейти до розділу 5 ➔",
    "top100_adj_f6_badge": "📏 Розділ 6 • Майстер відмінювання (ступені порівняння та e-правило)",
    "top100_adj_f6_title": "6. Великий довідник із відмінювання: ступені порівняння та e-правило",
    "top100_adj_f6_desc": "Повний інтерактивний тренажер відмінювання: <strong>1. Звичайний ступінь</strong> (<em>stor</em>) ➔ <strong>2. Вищий ступінь</strong> з \"end\" (<em>større end</em>) ➔ <strong>3. Найвищий ступінь</strong> (<em>størst / den største</em>), а також формула того, чому <em>den/min/denne/Peters</em> завжди вимагає закінчення <strong>-e</strong>!",
    "top100_adj_f6_btn": "Відкрити довідник із відмінювання 📏 ➔",
    "top100_adj_ped_title": "💡 Як найкраще вчити прикметники?",
    "top100_adj_ped_item1_title": "⚖️ Візуальні протилежності",
    "top100_adj_ped_item1_desc": "Прикметники описують зв'язки та відношення. Вивчаючи такі пари, як <em>varm ↔ kold</em> разом, ви закріплюєте обидва слова в семантичній пам'яті мозку вдвічі швидше.",
    "top100_adj_ped_item2_title": "🧩 Узгодження та відмінювання",
    "top100_adj_ped_item2_desc": "Прикметник ніколи не вживається сам по собі — він узгоджується за родом і числом: <em>en varm te</em> (спільний рід), <em>et varmt bad</em> (середній рід: -t), <em>de varme dage</em> (множина: -e).",
    "top100_adj_ped_item3_title": "🌡️ Шкала та інтенсивність",
    "top100_adj_ped_item3_desc": "Відкривайте силу слів за барометром: від <em>iskold</em> (крижаний) ➔ <em>kold</em> (холодний) ➔ <em>lun</em> (теплуватий) ➔ <em>varm</em> (теплий/гарячий) ➔ <em>kogende</em> (киплячий).",
    "adj_tab_1": "1. Вивчення контрастів",
    "adj_tab_2": "2. Знайди протилежність (дуель)",
    "adj_tab_3": "3. Синоніми та нюанси",
    "adj_tab_4": "4. Барометр (шкала)",
    "adj_tab_5": "5. Узгодження (-t / -e)",
    "adj_tab_6": "6. Контекст та історія",
    "adj_pure_label": "Переглянути чисте зображення:",
    "adj_listen_word": "Прослухати цільове слово",
    "adj_listen_pronunciation": "Прослухати вимову",
    "adj_modpol_label": "Протилежність:",
    "adj_faelles_label": "Спільний рід (en ...)",
    "adj_intet_label": "Середній рід (et ... / +t)",
    "adj_flertal_label": "Означена форма / Множина (+e)",
    "adj_example_sentence": "Просте речення:",
    "adj_status_on": "УВІМК",
    "adj_status_off": "ВИМК",
    "adj_click_hotspot_hint": "Натисніть на точку, щоб почути вимову та побачити протилежність у сусідній кімнаті!"
  },
  "zh": {
    "adj_baro_counter": "晴雨表 {current} / {total}",
    "adj_baro_step": "[ 第 {n} 步 ]",
    "adj_baro_remove_tooltip": "点击以移除此词",
    "adj_baro_reset_btn": "重置刻度 🔄",
    "adj_baro_check_btn": "检查顺序 ✔️",
    "adj_baro_next_btn": "下一个刻度 ➔",
    "adj_baro_master_btn": "你掌握了晴雨表！🏆",
    "adj_baro_success": "🎉 完美排序！你按完全正确的顺序排列了单词：",
    "adj_baro_wrong": "还未完全答对。部分单词的顺序不正确。",
    "adj_baro_hint": "提示：先考虑程度最温和的状态，最后考虑程度最强烈的状态！",
    "adj_kongruens_subprompt": "选择形容词的正确形式：",
    "adj_grammar_banner_title": "想深入学习形容词的所有变位规则吗？",
    "adj_grammar_banner_desc": "了解基本形式、中性 (-t)、定指形式与复数 (-e) 以及比较等级变化。",
    "adj_grammar_banner_btn": "前往变位指南 ➔",
    "adj_story_subprompt": "哪个词最适合这种情况？",
    "adj_duel_counter": "⚔️ 对决 {current} / {total}",
    "adj_nuance_counter": "🔄 语意层次 {current} / {total}",
    "adj_kongruens_counter": "🧩 一致性 {current} / {total}",
    "adj_situation_counter": "📖 情境 {current} / {total}",
    "adj_score_label": "得分：",
    "adj_next_duel": "下一场对决 ➔",
    "adj_next_nuance": "下一个语意层次 ➔",
    "adj_next_kongruens": "下一道题目 ➔",
    "adj_next_situation": "下一个情境 ➔",
    "adj_result_duel_btn": "查看结果 ({score}/{total}) 🏆",
    "adj_result_syn_btn": "完成同义词练习 ({score}/{total}) 🌟",
    "adj_result_kong_btn": "查看变位结果 ({score}/{total}) 🏆",
    "adj_result_story_btn": "查看结果 ({score}/{total}) 🌟",
    "adj_retry_btn": "再试一次 🔄",
    "adj_correct_feedback": "🎉 正确！",
    "adj_wrong_feedback": "不完全正确：",
    "adj_correct_answer_is": "正确答案是：",
    "adj_duel_modal_title": "在反义词对决中表现出色！",
    "adj_duel_modal_score": "你正确找出了 <strong>{total}</strong> 个对立词中的 <strong>{score}</strong> 个。",
    "adj_syn_modal_title": "词汇量很棒！",
    "adj_syn_modal_score": "你正确辨析了 <strong>{total}</strong> 个细微差别中的 <strong>{score}</strong> 个。",
    "adj_kong_modal_title": "形容词变位练习得很好！",
    "adj_kong_modal_score": "你正确填对了 <strong>{total}</strong> 个词尾中的 <strong>{score}</strong> 个。",
    "adj_story_modal_title": "阅读理解能力很棒！",
    "adj_story_modal_score": "你在 <strong>{total}</strong> 个问题中答对了 <strong>{score}</strong> 个。",
    "adj_f1_stage_warm": "☀️ 温馨的家（10个特征）",
    "adj_f1_stage_cool": "❄️ 稳固的工坊（10个对立词）",
    "adj_f2_stage_title": "⏱️ 车站与节奏（20个时间形容词）",
    "adj_f3_stage_left": "💎 价值与完美",
    "adj_f3_stage_right": "⚙️ 难度与复杂性",
    "adj_f4_stage_left": "❤️ 社交生活与快乐",
    "adj_f4_stage_right": "🌧️ 逆境与不适",
    "adj_f5_stage_left": "🌿 纯净、健康与平衡",
    "adj_f5_stage_right": "🌑 混乱、疾病与黑暗",
    "adj_baro_f1_s1_title": "🌡️ 刻度 1：温度",
    "adj_baro_f1_s1_desc": "按温度从最冷到最热排列单词：",
    "adj_baro_f1_s1_low": "🥶 最冷",
    "adj_baro_f1_s1_high": "🔥 最热",
    "adj_baro_f1_s2_title": "📐 刻度 2：尺寸",
    "adj_baro_f1_s2_desc": "按尺寸从最小到最大排列单词：",
    "adj_baro_f1_s2_low": "🔬 最小",
    "adj_baro_f1_s2_high": "🐘 最大",
    "adj_baro_f1_s3_title": "⚖️ 刻度 3：重量",
    "adj_baro_f1_s3_desc": "按重量从最轻到最重排列单词：",
    "adj_baro_f1_s3_low": "🪶 最轻",
    "adj_baro_f1_s3_high": "🪨 最重",
    "adj_baro_f1_s4_title": "🛋️ 刻度 4：硬度与质感",
    "adj_baro_f1_s4_desc": "按硬度从最软到最硬排列单词：",
    "adj_baro_f1_s4_low": "☁️ 最软",
    "adj_baro_f1_s4_high": "💎 最硬",
    "adj_baro_f1_s5_title": "🫙 刻度 5：容量与充盈度",
    "adj_baro_f1_s5_desc": "按容量从空到满排列单词：",
    "adj_baro_f1_s5_low": "🫙 完全是空的",
    "adj_baro_f1_s5_high": "📦 完全装满",
    "adj_baro_f1_s6_title": "📏 刻度 6：长度与时长",
    "adj_baro_f1_s6_desc": "按长度/时长从最短到最长排列单词：",
    "adj_baro_f1_s6_low": "⚡ 最短",
    "adj_baro_f1_s6_high": "♾️ 最长",
    "adj_baro_f2_s1_title": "🏃 刻度 1：速度与节奏",
    "adj_baro_f2_s1_desc": "按速度从最慢到最快排列单词：",
    "adj_baro_f2_s1_low": "🐢 最慢",
    "adj_baro_f2_s1_high": "⚡ 最快",
    "adj_baro_f2_s2_title": "🎂 刻度 2：年龄",
    "adj_baro_f2_s2_desc": "按年龄从最年轻到最年长排列单词：",
    "adj_baro_f2_s2_low": "👶 最年轻",
    "adj_baro_f2_s2_high": "👴 最年长",
    "adj_baro_f2_s3_title": "⏳ 刻度 3：持续时间",
    "adj_baro_f2_s3_desc": "按持续时间从最短到最长排列事件：",
    "adj_baro_f2_s3_low": "⚡ 几秒钟",
    "adj_baro_f2_s3_high": "♾️ 很长时间",
    "adj_baro_f2_s4_title": "🔄 刻度 4：频率",
    "adj_baro_f2_s4_desc": "按事情发生的频繁程度排列单词：",
    "adj_baro_f2_s4_low": "🚫 几乎从不",
    "adj_baro_f2_s4_high": "🔁 一直 / 总是",
    "adj_baro_f2_s5_title": "🎯 刻度 5：守时与精准",
    "adj_baro_f2_s5_desc": "按从延误最多到绝对准时排列：",
    "adj_baro_f2_s5_low": "⚠️ 太晚了",
    "adj_baro_f2_s5_high": "🎯 正好准时",
    "adj_baro_f2_s6_title": "📅 刻度 6：时效性 / 时间线",
    "adj_baro_f2_s6_desc": "按从过去到现在排列过程中的各个阶段：",
    "adj_baro_f2_s6_low": "📜 过去",
    "adj_baro_f2_s6_high": "📍 此时此刻",
    "adj_baro_f3_s1_title": "⭐ 刻度 1：质量",
    "adj_baro_f3_s1_desc": "按评价从最差到最好排列：",
    "adj_baro_f3_s1_low": "🗑️ 最差",
    "adj_baro_f3_s1_high": "🏆 最好",
    "adj_baro_f3_s2_title": "🧠 刻度 2：难度",
    "adj_baro_f3_s2_desc": "按任务从最容易到最困难排列：",
    "adj_baro_f3_s2_low": "👶 最容易",
    "adj_baro_f3_s2_high": "🧩 最困难",
    "adj_baro_f3_s3_title": "💰 刻度 3：价格水平",
    "adj_baro_f3_s3_desc": "按价格从免费到极度昂贵排列：",
    "adj_baro_f3_s3_low": "🪙 0 克朗",
    "adj_baro_f3_s3_high": "💎 一笔巨款",
    "adj_baro_f3_s4_title": "📌 刻度 4：重要性与优先级",
    "adj_baro_f3_s4_desc": "按信息从完全无关紧要到不可或缺排列：",
    "adj_baro_f3_s4_low": "💤 无关紧要",
    "adj_baro_f3_s4_high": "🚨 不可或缺",
    "adj_baro_f3_s5_title": "🔍 刻度 5：完整性",
    "adj_baro_f3_s5_desc": "按报告质量从毫无用处到完美无缺排列：",
    "adj_baro_f3_s5_low": "❌ 毫无用处",
    "adj_baro_f3_s5_high": "💯 完美",
    "adj_baro_f3_s6_title": "⚙️ 刻度 6：复杂度",
    "adj_baro_f3_s6_desc": "按规则从最简单到最复杂排列：",
    "adj_baro_f3_s6_low": "🔹 最简单",
    "adj_baro_f3_s6_high": "🌀 最复杂",
    "adj_baro_f4_s1_title": "😊 刻度 1：喜悦与情绪",
    "adj_baro_f4_s1_desc": "按情绪从最悲伤到最快乐排列：",
    "adj_baro_f4_s1_low": "😢 心碎",
    "adj_baro_f4_s1_high": "🎉 快乐无比",
    "adj_baro_f4_s2_title": "⚡ 刻度 2：精力与活力",
    "adj_baro_f4_s2_desc": "按精力水平从筋疲力尽到充满活力排列：",
    "adj_baro_f4_s2_low": "🪫 筋疲力尽",
    "adj_baro_f4_s2_high": "🔋 充满活力",
    "adj_baro_f4_s3_title": "🧘 刻度 3：从容与紧张",
    "adj_baro_f4_s3_desc": "按从最从容到最恐惧/恐慌排列：",
    "adj_baro_f4_s3_low": "🕊️ 完全从容",
    "adj_baro_f4_s3_high": "😱 恐慌万分",
    "adj_baro_f4_s4_title": "🧸 刻度 4：安全感与恐惧",
    "adj_baro_f4_s4_desc": "按从充满安全感到惊恐万状排列：",
    "adj_baro_f4_s4_low": "🛡️ 很有安全感",
    "adj_baro_f4_s4_high": "😨 惊恐万状",
    "adj_baro_f4_s5_title": "💖 刻度 5：友善",
    "adj_baro_f4_s5_desc": "按行为表现从最冷淡无礼到最热心诚挚排列：",
    "adj_baro_f4_s5_low": "🧊 不友善 / 冷淡",
    "adj_baro_f4_s5_high": "☀️ 热心温暖",
    "adj_baro_f4_s6_title": "👍 刻度 6：满意度",
    "adj_baro_f4_s6_desc": "按顾客反应从愤怒到热情赞叹排列：",
    "adj_baro_f4_s6_low": "😡 怒火中烧",
    "adj_baro_f4_s6_high": "🤩 赞不绝口",
    "adj_baro_f5_s1_title": "🧽 刻度 1：洁净度",
    "adj_baro_f5_s1_desc": "按从最脏到一尘不染排列：",
    "adj_baro_f5_s1_low": "👞 邋遢 / 肮脏",
    "adj_baro_f5_s1_high": "✨ 一尘不染",
    "adj_baro_f5_s2_title": "🍎 刻度 2：健康与体魄",
    "adj_baro_f5_s2_desc": "按从重病到精力充沛且健康排列：",
    "adj_baro_f5_s2_low": "🤒 病情严重",
    "adj_baro_f5_s2_high": "💪 活力充沛健康",
    "adj_baro_f5_s3_title": "💧 刻度 3：湿度",
    "adj_baro_f5_s3_desc": "按从干燥如柴到湿透排列：",
    "adj_baro_f5_s3_low": "🏜️ 干燥如柴",
    "adj_baro_f5_s3_high": "🌊 湿透了",
    "adj_baro_f5_s4_title": "💡 刻度 4：光线亮度",
    "adj_baro_f5_s4_desc": "按从漆黑一片到耀眼夺目排列：",
    "adj_baro_f5_s4_low": "🌑 漆黑一片",
    "adj_baro_f5_s4_high": "☀️ 耀眼夺目",
    "adj_baro_f5_s5_title": "📊 刻度 5：数量",
    "adj_baro_f5_s5_desc": "按数量从毫无所有到数不胜数排列：",
    "adj_baro_f5_s5_low": "0️⃣ 毫无所有",
    "adj_baro_f5_s5_high": "♾️ 数不胜数",
    "adj_baro_f5_s6_title": "🧭 刻度 6：确定性与安全性",
    "adj_baro_f5_s6_desc": "按从完全不确定到毋庸置疑的确定性排列：",
    "adj_baro_f5_s6_low": "❓ 存疑",
    "adj_baro_f5_s6_high": "✔️ 毋庸置疑",
    "top100_adj_hub_title": "最常用的 100 个形容词",
    "top100_adj_hub_desc": "形容词描绘世界，赋予语言微妙色彩并表达鲜明对比。探索分为 5 个语义领域的 100 个最常用丹麦语形容词——并在领域 6 中掌握完整的词形变化规则！",
    "top100_adj_f1_badge": "🔬 领域 1：20 组可度量的反义词",
    "top100_adj_f1_title": "1. 物理特性、形状与感官",
    "top100_adj_f1_desc": "涵盖日常生活中所有可测量、触摸或感知的事物：<em>stor (大) / lille (小), lang (长) / kort (短), høj (高) / lav (矮/低), bred (宽) / smal (窄), tung (重) / let (轻), varm (温暖/热) / kold (冷), hård (硬) / blød (软), fast (坚实/紧固) / løs (松散/宽松), fuld (满) / tom (空), åben (开) / lukket (关)</em>。",
    "top100_adj_f1_btn": "前往领域 1 ➔",
    "top100_adj_f2_badge": "⏱️ 领域 2：20 个时间形容词",
    "top100_adj_f2_title": "2. 时间、年龄与节奏",
    "top100_adj_f2_desc": "日常生活中的时间顺序、发展与速度：<em>ny (新) / gammel (旧), ung (年轻) / gammel (年老), tidlig (早) / sen (晚), hurtig (快) / langsom (慢), pludselig (突然), forsinket (延误), travl (繁忙), rolig (平静)...</em>",
    "top100_adj_f2_btn": "前往领域 2 ➔",
    "top100_adj_f3_badge": "💎 领域 3：20 个评价形容词",
    "top100_adj_f3_title": "3. 质量、难度与经济价值",
    "top100_adj_f3_desc": "评价、价格、付出与价值：<em>god (好) / dårlig (坏), svær (难) / let (容易), dyr (贵) / billig (便宜), vigtig (重要) / ligegyldig (无关紧要), nødvendig (必要), gratis (免费), perfekt (完美), forkert (错误)...</em>",
    "top100_adj_f3_btn": "前往领域 3 ➔",
    "top100_adj_f4_badge": "❤️ 领域 4：20 个社交与情感形容词",
    "top100_adj_f4_title": "4. 情绪、性格与人际关系",
    "top100_adj_f4_desc": "人的心境与人际交往：<em>glad (高兴) / ked af det (难过), venlig (友好) / uvenlig (不友好), træt (疲倦) / frisk (精力充沛), tryg (安心/有安全感) / bange (害怕), sur (生气), sød (可爱/亲切), stolt (自豪), rolig (从容/冷静)...</em>",
    "top100_adj_f4_btn": "前往领域 4 ➔",
    "top100_adj_f5_badge": "🎨 领域 5：20 个状态形容词",
    "top100_adj_f5_title": "5. 颜色、数量与状态",
    "top100_adj_f5_desc": "日常生活中的视觉与实际状态：<em>rød (红), blå (蓝), grøn (绿), hel (整/全部) / halv (半), mange (多) / få (少), ren (干净) / beskidt (脏), sund (健康) / syg (生病), klar (准备好/清晰), sikker (安全/确定), rigtig (正确)...</em>",
    "top100_adj_f5_btn": "前往领域 5 ➔",
    "top100_adj_f6_badge": "📏 领域 6 • 词形变化大师（比较级与 -e 规则）",
    "top100_adj_f6_title": "6. 词形变化完整指南：比较级与 -e 规则",
    "top100_adj_f6_desc": "完整的互动式词形变化引擎：<strong>1. 原级</strong> (<em>stor</em>) ➔ <strong>2. 比较级</strong> 配合 \"end\" (<em>større end</em>) ➔ <strong>3. 最高级</strong> (<em>størst / den største</em>)，以及揭秘为什么 <em>den/min/denne/Peters</em> 后面总是必须加上 <strong>-e</strong>！",
    "top100_adj_f6_btn": "打开词形变化指南 📏 ➔",
    "top100_adj_ped_title": "💡 如何最高效地学习形容词？",
    "top100_adj_ped_item1_title": "⚖️ 直观视觉反义词",
    "top100_adj_ped_item1_desc": "形容词用于描述事物之间的关系。通过将 <em>varm ↔ kold</em> 成对学习，两个词在大脑语义网络中的记忆速度可提升一倍。",
    "top100_adj_ped_item2_title": "🧩 词形一致与变格",
    "top100_adj_ped_item2_desc": "形容词从不单独存在——它根据名词的性与数进行词尾变化：<em>en varm te</em>（通性），<em>et varmt bad</em>（中性：-t），<em>de varme dage</em>（复数：-e）。",
    "top100_adj_ped_item3_title": "🌡️ 梯度与强度",
    "top100_adj_ped_item3_desc": "在词义晴雨表上探索词义强弱递进：从 <em>iskold</em> (冰冷) ➔ <em>kold</em> (冷) ➔ <em>lun</em> (微温) ➔ <em>varm</em> (热/暖) ➔ <em>kogende</em> (沸腾)。",
    "adj_tab_1": "1. 对比学习",
    "adj_tab_2": "2. 寻找反义词（对决）",
    "adj_tab_3": "3. 同义词与细微差别",
    "adj_tab_4": "4. 晴雨表（程度阶梯）",
    "adj_tab_5": "5. 词尾一致 (-t / -e)",
    "adj_tab_6": "6. 语境与故事",
    "adj_pure_label": "查看无遮挡原图：",
    "adj_listen_word": "听目标词",
    "adj_listen_pronunciation": "听发音",
    "adj_modpol_label": "反义词：",
    "adj_faelles_label": "通性 (en ...)",
    "adj_intet_label": "中性 (et ... / +t)",
    "adj_flertal_label": "定指 / 复数 (+e)",
    "adj_example_sentence": "简单例句：",
    "adj_status_on": "开启",
    "adj_status_off": "关闭",
    "adj_click_hotspot_hint": "点击一个点即可收听发音并在对面的房间查看其反义词！"
  },
  "vi": {
    "adj_baro_counter": "Thước đo {current} / {total}",
    "adj_baro_step": "[ Bước {n} ]",
    "adj_baro_remove_tooltip": "Nhấp để xóa từ này",
    "adj_baro_reset_btn": "Đặt lại thang đo 🔄",
    "adj_baro_check_btn": "Kiểm tra thứ tự ✔️",
    "adj_baro_next_btn": "Thang đo tiếp theo ➔",
    "adj_baro_master_btn": "Bạn đã làm chủ thước đo! 🏆",
    "adj_baro_success": "🎉 Sắp xếp hoàn hảo! Bạn đã đặt các từ theo đúng thứ tự chính xác:",
    "adj_baro_wrong": "Chưa hoàn toàn chính xác. Một số từ chưa đúng thứ tự.",
    "adj_baro_hint": "Mẹo: Hãy nghĩ đến mức độ nhẹ nhất trước và mức độ mãnh liệt nhất sau cùng!",
    "adj_kongruens_subprompt": "Chọn dạng đúng của tính từ:",
    "adj_grammar_banner_title": "Bạn muốn tìm hiểu kỹ tất cả các quy tắc biến đổi tính từ?",
    "adj_grammar_banner_desc": "Tìm hiểu về dạng cơ bản, giống trung (-t), dạng xác định & số nhiều (-e) và cấp so sánh.",
    "adj_grammar_banner_btn": "Đến hướng dẫn biến đổi từ ➔",
    "adj_story_subprompt": "Từ nào phù hợp nhất trong ngữ cảnh này?",
    "adj_duel_counter": "⚔️ Đối đầu {current} / {total}",
    "adj_nuance_counter": "🔄 Sắc thái {current} / {total}",
    "adj_kongruens_counter": "🧩 Sự hòa hợp {current} / {total}",
    "adj_situation_counter": "📖 Tình huống {current} / {total}",
    "adj_score_label": "Điểm:",
    "adj_next_duel": "Trận đối đầu tiếp theo ➔",
    "adj_next_nuance": "Sắc thái tiếp theo ➔",
    "adj_next_kongruens": "Bài tập tiếp theo ➔",
    "adj_next_situation": "Tình huống tiếp theo ➔",
    "adj_result_duel_btn": "Xem kết quả ({score}/{total}) 🏆",
    "adj_result_syn_btn": "Hoàn thành từ đồng nghĩa ({score}/{total}) 🌟",
    "adj_result_kong_btn": "Xem kết quả biến đổi ({score}/{total}) 🏆",
    "adj_result_story_btn": "Xem kết quả ({score}/{total}) 🌟",
    "adj_retry_btn": "Thử lại 🔄",
    "adj_correct_feedback": "🎉 Chính xác!",
    "adj_wrong_feedback": "Chưa hoàn toàn đúng:",
    "adj_correct_answer_is": "Câu trả lời đúng là:",
    "adj_duel_modal_title": "Làm rất tốt trong trận đối đầu Từ trái nghĩa!",
    "adj_duel_modal_score": "Bạn đã chọn đúng <strong>{score}</strong> trên <strong>{total}</strong> cặp từ trái nghĩa.",
    "adj_syn_modal_title": "Vốn từ vựng tuyệt vời!",
    "adj_syn_modal_score": "Bạn đã nhận biết đúng <strong>{score}</strong> trên <strong>{total}</strong> sắc thái từ.",
    "adj_kong_modal_title": "Làm rất tốt với các đuôi biến đổi tính từ!",
    "adj_kong_modal_score": "Bạn đã hoàn thành đúng <strong>{score}</strong> trên <strong>{total}</strong> phần đuôi từ.",
    "adj_story_modal_title": "Kỹ năng đọc hiểu tuyệt vời!",
    "adj_story_modal_score": "Bạn đã trả lời đúng <strong>{score}</strong> trên <strong>{total}</strong> câu hỏi.",
    "adj_f1_stage_warm": "☀️ Ngôi nhà ấm cúng (10 đặc tính)",
    "adj_f1_stage_cool": "❄️ Xưởng kiên cố (10 từ đối lập)",
    "adj_f2_stage_title": "⏱️ Nhà ga và nhịp độ (20 tính từ chỉ thời gian)",
    "adj_f3_stage_left": "💎 Giá trị và sự hoàn hảo",
    "adj_f3_stage_right": "⚙️ Độ khó và mức độ phức tạp",
    "adj_f4_stage_left": "❤️ Đời sống xã hội và niềm vui",
    "adj_f4_stage_right": "🌧️ Nghịch cảnh và sự khó chịu",
    "adj_f5_stage_left": "🌿 Sự thanh khiết, sức khỏe và cân bằng",
    "adj_f5_stage_right": "🌑 Sự bừa bộn, bệnh tật và bóng tối",
    "adj_baro_f1_s1_title": "🌡️ Thang đo 1: Nhiệt độ",
    "adj_baro_f1_s1_desc": "Sắp xếp các từ theo nhiệt độ từ lạnh nhất đến nóng nhất:",
    "adj_baro_f1_s1_low": "🥶 Lạnh nhất",
    "adj_baro_f1_s1_high": "🔥 Nóng nhất",
    "adj_baro_f1_s2_title": "📐 Thang đo 2: Kích thước",
    "adj_baro_f1_s2_desc": "Sắp xếp các từ theo kích thước từ nhỏ nhất đến lớn nhất:",
    "adj_baro_f1_s2_low": "🔬 Nhỏ nhất",
    "adj_baro_f1_s2_high": "🐘 Lớn nhất",
    "adj_baro_f1_s3_title": "⚖️ Thang đo 3: Trọng lượng",
    "adj_baro_f1_s3_desc": "Sắp xếp các từ từ nhẹ nhất đến nặng nhất:",
    "adj_baro_f1_s3_low": "🪶 Nhẹ nhất",
    "adj_baro_f1_s3_high": "🪨 Nặng nhất",
    "adj_baro_f1_s4_title": "🛋️ Thang đo 4: Độ cứng và bề mặt",
    "adj_baro_f1_s4_desc": "Sắp xếp các từ từ mềm nhất đến cứng nhất:",
    "adj_baro_f1_s4_low": "☁️ Mềm nhất",
    "adj_baro_f1_s4_high": "💎 Cứng nhất",
    "adj_baro_f1_s5_title": "🫙 Thang đo 5: Dung tích và độ đầy",
    "adj_baro_f1_s5_desc": "Sắp xếp các từ từ rỗng đến đầy:",
    "adj_baro_f1_s5_low": "🫙 Hoàn toàn trống rỗng",
    "adj_baro_f1_s5_high": "📦 Hoàn toàn đầy ắp",
    "adj_baro_f1_s6_title": "📏 Thang đo 6: Chiều dài và thời lượng",
    "adj_baro_f1_s6_desc": "Sắp xếp các từ từ ngắn nhất đến dài nhất:",
    "adj_baro_f1_s6_low": "⚡ Ngắn nhất",
    "adj_baro_f1_s6_high": "♾️ Dài nhất",
    "adj_baro_f2_s1_title": "🏃 Thang đo 1: Tốc độ và nhịp độ",
    "adj_baro_f2_s1_desc": "Sắp xếp các từ theo tốc độ từ chậm nhất đến nhanh nhất:",
    "adj_baro_f2_s1_low": "🐢 Chậm nhất",
    "adj_baro_f2_s1_high": "⚡ Nhanh nhất",
    "adj_baro_f2_s2_title": "🎂 Thang đo 2: Tuổi tác",
    "adj_baro_f2_s2_desc": "Sắp xếp các từ từ trẻ nhất đến già nhất:",
    "adj_baro_f2_s2_low": "👶 Trẻ nhất",
    "adj_baro_f2_s2_high": "👴 Già nhất",
    "adj_baro_f2_s3_title": "⏳ Thang đo 3: Thời lượng",
    "adj_baro_f2_s3_desc": "Sắp xếp các sự kiện từ thời lượng ngắn nhất đến dài nhất:",
    "adj_baro_f2_s3_low": "⚡ Vài giây",
    "adj_baro_f2_s3_high": "♾️ Thời gian rất dài",
    "adj_baro_f2_s4_title": "🔄 Thang đo 4: Tần suất",
    "adj_baro_f2_s4_desc": "Sắp xếp các từ theo mức độ thường xuyên của hành động:",
    "adj_baro_f2_s4_low": "🚫 Hầu như không bao giờ",
    "adj_baro_f2_s4_high": "🔁 Luôn luôn",
    "adj_baro_f2_s5_title": "🎯 Thang đo 5: Đúng giờ và chính xác",
    "adj_baro_f2_s5_desc": "Sắp xếp từ trễ nhất đến hoàn toàn đúng giờ:",
    "adj_baro_f2_s5_low": "⚠️ Quá trễ",
    "adj_baro_f2_s5_high": "🎯 Đúng giờ tuyệt đối",
    "adj_baro_f2_s6_title": "📅 Thang đo 6: Tính thời sự / Mốc thời gian",
    "adj_baro_f2_s6_desc": "Sắp xếp các giai đoạn trong một quy trình từ quá khứ đến hiện tại:",
    "adj_baro_f2_s6_low": "📜 Quá khứ",
    "adj_baro_f2_s6_high": "📍 Ngay bây giờ",
    "adj_baro_f3_s1_title": "⭐ Thang đo 1: Chất lượng",
    "adj_baro_f3_s1_desc": "Sắp xếp các đánh giá từ tệ nhất đến tốt nhất:",
    "adj_baro_f3_s1_low": "🗑️ Tệ nhất",
    "adj_baro_f3_s1_high": "🏆 Tốt nhất",
    "adj_baro_f3_s2_title": "🧠 Thang đo 2: Mức độ khó",
    "adj_baro_f3_s2_desc": "Sắp xếp các nhiệm vụ từ dễ nhất đến khó nhất:",
    "adj_baro_f3_s2_low": "👶 Dễ nhất",
    "adj_baro_f3_s2_high": "🧩 Khó nhất",
    "adj_baro_f3_s3_title": "💰 Thang đo 3: Mức giá",
    "adj_baro_f3_s3_desc": "Sắp xếp theo giá từ miễn phí đến cực kỳ đắt đỏ:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 Cả một gia tài",
    "adj_baro_f3_s4_title": "📌 Thang đo 4: Tầm quan trọng và mức ưu tiên",
    "adj_baro_f3_s4_desc": "Sắp xếp thông tin từ hoàn toàn không quan trọng đến không thể thiếu:",
    "adj_baro_f3_s4_low": "💤 Không quan trọng",
    "adj_baro_f3_s4_high": "🚨 Không thể thiếu",
    "adj_baro_f3_s5_title": "🔍 Thang đo 5: Tính đầy đủ",
    "adj_baro_f3_s5_desc": "Sắp xếp chất lượng báo cáo từ vô dụng đến hoàn hảo:",
    "adj_baro_f3_s5_low": "❌ Vô dụng",
    "adj_baro_f3_s5_high": "💯 Hoàn hảo",
    "adj_baro_f3_s6_title": "⚙️ Thang đo 6: Độ phức tạp",
    "adj_baro_f3_s6_desc": "Sắp xếp các quy tắc từ đơn giản nhất đến phức tạp nhất:",
    "adj_baro_f3_s6_low": "🔹 Đơn giản nhất",
    "adj_baro_f3_s6_high": "🌀 Phức tạp nhất",
    "adj_baro_f4_s1_title": "😊 Thang đo 1: Niềm vui và tâm trạng",
    "adj_baro_f4_s1_desc": "Sắp xếp cảm xúc từ buồn nhất đến hạnh phúc nhất:",
    "adj_baro_f4_s1_low": "😢 Tan nát cõi lòng",
    "adj_baro_f4_s1_high": "🎉 Hạnh phúc",
    "adj_baro_f4_s2_title": "⚡ Thang đo 2: Năng lượng và sự tỉnh táo",
    "adj_baro_f4_s2_desc": "Sắp xếp mức năng lượng từ kiệt sức đến tràn đầy sinh lực:",
    "adj_baro_f4_s2_low": "🪫 Kiệt sức",
    "adj_baro_f4_s2_high": "🔋 Tràn đầy năng lượng",
    "adj_baro_f4_s3_title": "🧘 Thang đo 3: Bình tĩnh và căng thẳng",
    "adj_baro_f4_s3_desc": "Sắp xếp từ bình tĩnh nhất đến sợ hãi/hoảng loạn nhất:",
    "adj_baro_f4_s3_low": "🕊️ Hoàn toàn bình tĩnh",
    "adj_baro_f4_s3_high": "😱 Hoảng loạn tột độ",
    "adj_baro_f4_s4_title": "🧸 Thang đo 4: An toàn và sợ hãi",
    "adj_baro_f4_s4_desc": "Sắp xếp từ hoàn toàn an tâm đến kinh hãi tột cùng:",
    "adj_baro_f4_s4_low": "🛡️ Hoàn toàn an toàn",
    "adj_baro_f4_s4_high": "😨 Kinh hãi tột cùng",
    "adj_baro_f4_s5_title": "💖 Thang đo 5: Sự thân thiện",
    "adj_baro_f4_s5_desc": "Sắp xếp hành vi từ thiếu thân thiện nhất đến ấm áp nhất:",
    "adj_baro_f4_s5_low": "🧊 Lạnh lùng / không thân thiện",
    "adj_baro_f4_s5_high": "☀️ Ấm áp, nhân hậu",
    "adj_baro_f4_s6_title": "👍 Thang đo 6: Mức độ hài lòng",
    "adj_baro_f4_s6_desc": "Sắp xếp phản ứng của khách hàng từ giận dữ đến hào hứng:",
    "adj_baro_f4_s6_low": "😡 Thịnh nộ",
    "adj_baro_f4_s6_high": "🤩 Tràn đầy hào hứng",
    "adj_baro_f5_s1_title": "🧽 Thang đo 1: Độ sạch sẽ",
    "adj_baro_f5_s1_desc": "Sắp xếp từ bẩn nhất đến sạch bóng:",
    "adj_baro_f5_s1_low": "👞 Bẩn thỉu / dơ dáy",
    "adj_baro_f5_s1_high": "✨ Sạch bóng",
    "adj_baro_f5_s2_title": "🍎 Thang đo 2: Sức khỏe và thể lực",
    "adj_baro_f5_s2_desc": "Sắp xếp từ ốm nặng đến tràn đầy sức sống khỏe mạnh:",
    "adj_baro_f5_s2_low": "🤒 Ốm nặng",
    "adj_baro_f5_s2_high": "💪 Khỏe khoắn rạng ngời",
    "adj_baro_f5_s3_title": "💧 Thang đo 3: Độ ẩm",
    "adj_baro_f5_s3_desc": "Sắp xếp từ khô khốc đến ướt sũng:",
    "adj_baro_f5_s3_low": "🏜️ Khô khốc",
    "adj_baro_f5_s3_high": "🌊 Ướt sũng",
    "adj_baro_f5_s4_title": "💡 Thang đo 4: Độ sáng",
    "adj_baro_f5_s4_desc": "Sắp xếp từ tối om đến sáng chói:",
    "adj_baro_f5_s4_low": "🌑 Tối om",
    "adj_baro_f5_s4_high": "☀️ Sáng chói",
    "adj_baro_f5_s5_title": "📊 Thang đo 5: Số lượng",
    "adj_baro_f5_s5_desc": "Sắp xếp số lượng từ không có gì đến vô số:",
    "adj_baro_f5_s5_low": "0️⃣ Không có gì",
    "adj_baro_f5_s5_high": "♾️ Vô số",
    "adj_baro_f5_s6_title": "🧭 Thang đo 6: Độ chắc chắn và an toàn",
    "adj_baro_f5_s6_desc": "Sắp xếp từ hoàn toàn không chắc chắn đến rõ ràng như ban ngày:",
    "adj_baro_f5_s6_low": "❓ Đáng ngờ / không chắc",
    "adj_baro_f5_s6_high": "✔️ Rõ ràng như ban ngày",
    "top100_adj_hub_title": "100 tính từ phổ biến nhất",
    "top100_adj_hub_desc": "Tính từ miêu tả thế giới xung quanh, bổ sung sắc thái ý nghĩa và thể hiện sự tương phản. Hãy khám phá 100 tính từ tiếng Đan Mạch phổ biến nhất được chia thành 5 nhóm ngữ nghĩa – và làm chủ toàn bộ quy tắc biến đổi từ trong Nhóm 6!",
    "top100_adj_f1_badge": "🔬 Nhóm 1: 20 cặp từ trái nghĩa có thể đo lường",
    "top100_adj_f1_title": "1. Đặc tính vật lý, hình dạng và giác quan",
    "top100_adj_f1_desc": "Bao gồm mọi thứ có thể đo lường, chạm thấy hoặc cảm nhận trong đời sống hàng ngày: <em>stor (lớn) / lille (nhỏ), lang (dài) / kort (ngắn), høj (cao) / lav (thấp), bred (rộng) / smal (hẹp), tung (nặng) / let (nhẹ), varm (ấm/nóng) / kold (lạnh), hård (cứng) / blød (mềm), fast (chắc/cố định) / løs (lỏng/rời), fuld (đầy) / tom (trống rỗng), åben (mở) / lukket (đóng)</em>.",
    "top100_adj_f1_btn": "Đi đến nhóm 1 ➔",
    "top100_adj_f2_badge": "⏱️ Nhóm 2: 20 tính từ chỉ thời gian",
    "top100_adj_f2_title": "2. Thời gian, tuổi tác và tốc độ",
    "top100_adj_f2_desc": "Trình tự thời gian, sự phát triển và tốc độ trong đời sống thường nhật: <em>ny (mới) / gammel (cũ), ung (trẻ) / gammel (già), tidlig (sớm) / sen (muộn), hurtig (nhanh) / langsom (chậm), pludselig (đột ngột), forsinket (chậm trễ), travl (bận rộn), rolig (bình tĩnh)...</em>",
    "top100_adj_f2_btn": "Đi đến nhóm 2 ➔",
    "top100_adj_f3_badge": "💎 Nhóm 3: 20 tính từ đánh giá",
    "top100_adj_f3_title": "3. Chất lượng, độ khó và tài chính",
    "top100_adj_f3_desc": "Đánh giá, giá cả, nỗ lực và giá trị: <em>god (tốt) / dårlig (tồi/kém), svær (khó) / let (dễ), dyr (đắt) / billig (rẻ), vigtig (quan trọng) / ligegyldig (không quan trọng), nødvendig (cần thiết), gratis (miễn phí), perfekt (hoàn hảo), forkert (sai)...</em>",
    "top100_adj_f3_btn": "Đi đến nhóm 3 ➔",
    "top100_adj_f4_badge": "❤️ Nhóm 4: 20 tính từ xã hội & cảm xúc",
    "top100_adj_f4_title": "4. Cảm xúc, tính cách và mối quan hệ",
    "top100_adj_f4_desc": "Tâm trạng con người và giao tiếp xã hội: <em>glad (vui vẻ) / ked af det (buồn bã), venlig (thân thiện) / uvenlig (không thân thiện), træt (mệt mỏi) / frisk (tươi tỉnh/khỏe khoắn), tryg (an tâm/an toàn) / bange (sợ hãi), sur (cau có), sød (ngọt ngào/dễ thương), stolt (tự hào), rolig (bình tĩnh)...</em>",
    "top100_adj_f4_btn": "Đi đến nhóm 4 ➔",
    "top100_adj_f5_badge": "🎨 Nhóm 5: 20 tính từ chỉ trạng thái",
    "top100_adj_f5_title": "5. Màu sắc, số lượng và trạng thái",
    "top100_adj_f5_desc": "Các trạng thái thị giác và thực tế trong đời sống hàng ngày: <em>rød (đỏ), blå (xanh dương), grøn (xanh lá), hel (nguyên vẹn/toàn bộ) / halv (nửa), mange (nhiều) / få (ít), ren (sạch) / beskidt (bẩn), sund (khỏe mạnh) / syg (ốm/bệnh), klar (sẵn sàng/rõ ràng), sikker (an toàn/chắc chắn), rigtig (đúng)...</em>",
    "top100_adj_f5_btn": "Đi đến nhóm 5 ➔",
    "top100_adj_f6_badge": "📏 Nhóm 6 • Bậc thầy biến đổi tính từ (so sánh & quy tắc -e)",
    "top100_adj_f6_title": "6. Hướng dẫn toàn diện về biến đổi tính từ: cấp so sánh và quy tắc -e",
    "top100_adj_f6_desc": "Công cụ biến đổi từ tương tác hoàn chỉnh: <strong>1. Cấp nguyên</strong> (<em>stor</em>) ➔ <strong>2. So sánh hơn</strong> với \"end\" (<em>større end</em>) ➔ <strong>3. So sánh nhất</strong> (<em>størst / den største</em>), cùng công thức giải thích vì sao <em>den/min/denne/Peters</em> luôn bắt buộc thêm đuôi <strong>-e</strong>!",
    "top100_adj_f6_btn": "Mở hướng dẫn biến đổi tính từ 📏 ➔",
    "top100_adj_ped_title": "💡 Cách học tính từ hiệu quả nhất là gì?",
    "top100_adj_ped_item1_title": "⚖️ Các cặp từ trái nghĩa trực quan",
    "top100_adj_ped_item1_desc": "Tính từ diễn tả các mối quan hệ. Bằng cách học cặp từ <em>varm ↔ kold</em> cùng nhau, cả hai từ sẽ được ghi nhớ vào mạng lưới ngữ nghĩa của não bộ nhanh gấp đôi.",
    "top100_adj_ped_item2_title": "🧩 Sự hòa hợp & Biến đổi từ",
    "top100_adj_ped_item2_desc": "Tính từ không bao giờ đứng độc lập – nó biến đổi theo giống và số: <em>en varm te</em> (giống chung), <em>et varmt bad</em> (giống trung: -t), <em>de varme dage</em> (số nhiều: -e).",
    "top100_adj_ped_item3_title": "🌡️ Thang đo & Cường độ",
    "top100_adj_ped_item3_desc": "Khám phá mức độ của từ ngữ trên một phong vũ biểu: từ <em>iskold</em> (băng giá) ➔ <em>kold</em> (lạnh) ➔ <em>lun</em> (ấm áp nhẹ) ➔ <em>varm</em> (ấm/nóng) ➔ <em>kogende</em> (sôi sục).",
    "adj_tab_1": "1. Nghiên cứu tương phản",
    "adj_tab_2": "2. Tìm từ trái nghĩa (đối kháng)",
    "adj_tab_3": "3. Từ đồng nghĩa & Sắc thái",
    "adj_tab_4": "4. Phong vũ biểu (thang đo)",
    "adj_tab_5": "5. Sự hòa hợp đuôi từ (-t / -e)",
    "adj_tab_6": "6. Ngữ cảnh & Câu chuyện",
    "adj_pure_label": "Xem ảnh gốc:",
    "adj_listen_word": "Nghe từ mục tiêu",
    "adj_listen_pronunciation": "Nghe phát âm",
    "adj_modpol_label": "Từ trái nghĩa:",
    "adj_faelles_label": "Giống chung (en ...)",
    "adj_intet_label": "Giống trung (et ... / +t)",
    "adj_flertal_label": "Xác định / Số nhiều (+e)",
    "adj_example_sentence": "Câu đơn giản:",
    "adj_status_on": "BẬT",
    "adj_status_off": "TẮT",
    "adj_click_hotspot_hint": "Nhấp vào một điểm để nghe phát âm và xem từ trái nghĩa ở phòng đối diện!"
  },
  "th": {
    "adj_baro_counter": "บารอมิเตอร์ {current} จาก {total}",
    "adj_baro_step": "[ ขั้นที่ {n} ]",
    "adj_baro_remove_tooltip": "คลิกเพื่อลบคำนี้",
    "adj_baro_reset_btn": "รีเซ็ตสเกล 🔄",
    "adj_baro_check_btn": "ตรวจสอบลำดับ ✔️",
    "adj_baro_next_btn": "สเกลถัดไป ➔",
    "adj_baro_master_btn": "คุณเชี่ยวชาญบารอมิเตอร์แล้ว! 🏆",
    "adj_baro_success": "🎉 เรียงลำดับได้อย่างสมบูรณ์แบบ! คุณวางคำต่างๆ ในลำดับที่ถูกต้องทั้งหมด:",
    "adj_baro_wrong": "ยังไม่ถูกต้องทั้งหมด มีบางคำที่ไม่ได้อยู่ในลำดับที่ถูกต้อง",
    "adj_baro_hint": "เคล็ดลับ: ให้นึกถึงระดับที่เบาที่สุดก่อน แล้วตามด้วยระดับที่รุนแรงที่สุดท้าย!",
    "adj_kongruens_subprompt": "เลือกรูปของคำคุณศัพท์ที่ถูกต้อง:",
    "adj_grammar_banner_title": "ต้องการเรียนรู้กฎการผันคำคุณศัพท์ทั้งหมดอย่างละเอียดหรือไม่?",
    "adj_grammar_banner_desc": "เรียนรู้เกี่ยวกับรูปพื้นฐาน, รูปเพศกลาง (-t), รูปชี้เฉพาะและพหูพจน์ (-e) รวมถึงการเปรียบเทียบขั้นกว่าและขั้นสุด",
    "adj_grammar_banner_btn": "ไปยังคู่มือการผันคำ ➔",
    "adj_story_subprompt": "คำใดเหมาะสมที่สุดในสถานการณ์นี้?",
    "adj_duel_counter": "⚔️ ดวล {current} จาก {total}",
    "adj_nuance_counter": "🔄 เฉดความหมาย {current} จาก {total}",
    "adj_kongruens_counter": "🧩 ความสอดคล้อง {current} จาก {total}",
    "adj_situation_counter": "📖 สถานการณ์ {current} จาก {total}",
    "adj_score_label": "คะแนน:",
    "adj_next_duel": "การดวลถัดไป ➔",
    "adj_next_nuance": "เฉดความหมายถัดไป ➔",
    "adj_next_kongruens": "แบบฝึกหัดถัดไป ➔",
    "adj_next_situation": "สถานการณ์ถัดไป ➔",
    "adj_result_duel_btn": "ดูผลลัพธ์ ({score}/{total}) 🏆",
    "adj_result_syn_btn": "เสร็จสิ้นคำพ้องความหมาย ({score}/{total}) 🌟",
    "adj_result_kong_btn": "ดูผลลัพธ์การผันคำ ({score}/{total}) 🏆",
    "adj_result_story_btn": "ดูผลลัพธ์ ({score}/{total}) 🌟",
    "adj_retry_btn": "ลองอีกครั้ง 🔄",
    "adj_correct_feedback": "🎉 ถูกต้อง!",
    "adj_wrong_feedback": "ยังไม่ถูกต้อง:",
    "adj_correct_answer_is": "คำตอบที่ถูกต้องคือ:",
    "adj_duel_modal_title": "ทำได้ดีมากในการดวลคำตรงข้าม!",
    "adj_duel_modal_score": "คุณตอบคำตรงข้ามถูกต้อง <strong>{score}</strong> จาก <strong>{total}</strong> ข้อ",
    "adj_syn_modal_title": "คลังคำศัพท์ยอดเยี่ยม!",
    "adj_syn_modal_score": "คุณตอบเฉดความหมายถูกต้อง <strong>{score}</strong> จาก <strong>{total}</strong> ข้อ",
    "adj_kong_modal_title": "ทำได้ดีมากกับการผันคำคุณศัพท์!",
    "adj_kong_modal_score": "คุณตอบคำลงท้ายถูกต้อง <strong>{score}</strong> จาก <strong>{total}</strong> ข้อ",
    "adj_story_modal_title": "การอ่านจับใจความยอดเยี่ยม!",
    "adj_story_modal_score": "คุณตอบถูกต้อง <strong>{score}</strong> จาก <strong>{total}</strong> ข้อ",
    "adj_f1_stage_warm": "☀️ บ้านอันอบอุ่น (10 คุณลักษณะ)",
    "adj_f1_stage_cool": "❄️ เวิร์กช็อปที่มั่นคง (10 สิ่งตรงข้าม)",
    "adj_f2_stage_title": "⏱️ สถานีและความเร็ว (20 คำคุณศัพท์บอกเวลา)",
    "adj_f3_stage_left": "💎 คุณค่าและความสมบูรณ์แบบ",
    "adj_f3_stage_right": "⚙️ ระดับความยากและความซับซ้อน",
    "adj_f4_stage_left": "❤️ ชีวิตทางสังคมและความสุข",
    "adj_f4_stage_right": "🌧️ อุปสรรคและความไม่สบายใจ",
    "adj_f5_stage_left": "🌿 ความสะอาด สุขภาพ และความสมดุล",
    "adj_f5_stage_right": "🌑 ความรก โรคภัย และความมืด",
    "adj_baro_f1_s1_title": "🌡️ สเกลที่ 1: อุณหภูมิ",
    "adj_baro_f1_s1_desc": "เรียงคำตามอุณหภูมิจากหนาวที่สุดไปร้อนที่สุด:",
    "adj_baro_f1_s1_low": "🥶 หนาวที่สุด",
    "adj_baro_f1_s1_high": "🔥 ร้อนที่สุด",
    "adj_baro_f1_s2_title": "📐 สเกลที่ 2: ขนาด",
    "adj_baro_f1_s2_desc": "เรียงคำตามขนาดจากเล็กที่สุดไปใหญ่ที่สุด:",
    "adj_baro_f1_s2_low": "🔬 เล็กที่สุด",
    "adj_baro_f1_s2_high": "🐘 ใหญ่ที่สุด",
    "adj_baro_f1_s3_title": "⚖️ สเกลที่ 3: น้ำหนัก",
    "adj_baro_f1_s3_desc": "เรียงคำจากเบาที่สุดไปหนักที่สุด:",
    "adj_baro_f1_s3_low": "🪶 เบาที่สุด",
    "adj_baro_f1_s3_high": "🪨 หนักที่สุด",
    "adj_baro_f1_s4_title": "🛋️ สเกลที่ 4: ความแข็งและพื้นผิว",
    "adj_baro_f1_s4_desc": "เรียงคำจากนุ่มที่สุดไปแข็งที่สุด:",
    "adj_baro_f1_s4_low": "☁️ นุ่มที่สุด",
    "adj_baro_f1_s4_high": "💎 แข็งที่สุด",
    "adj_baro_f1_s5_title": "🫙 สเกลที่ 5: ปริมาตรความจุ",
    "adj_baro_f1_s5_desc": "เรียงคำจากว่างเปล่าไปเต็ม:",
    "adj_baro_f1_s5_low": "🫙 ว่างเปล่าสนิท",
    "adj_baro_f1_s5_high": "📦 เต็มแน่น",
    "adj_baro_f1_s6_title": "📏 สเกลที่ 6: ความยาวและระยะเวลา",
    "adj_baro_f1_s6_desc": "เรียงคำจากสั้นที่สุดไปยาวที่สุด:",
    "adj_baro_f1_s6_low": "⚡ สั้นที่สุด",
    "adj_baro_f1_s6_high": "♾️ ยาวที่สุด",
    "adj_baro_f2_s1_title": "🏃 สเกลที่ 1: ความเร็วและจังหวะก้าว",
    "adj_baro_f2_s1_desc": "เรียงคำตามความเร็วจากช้าที่สุดไปเร็วที่สุด:",
    "adj_baro_f2_s1_low": "🐢 ช้าที่สุด",
    "adj_baro_f2_s1_high": "⚡ เร็วที่สุด",
    "adj_baro_f2_s2_title": "🎂 สเกลที่ 2: อายุ",
    "adj_baro_f2_s2_desc": "เรียงคำจากอายุน้อยที่สุดไปอายุมากที่สุด:",
    "adj_baro_f2_s2_low": "👶 อายุน้อยที่สุด",
    "adj_baro_f2_s2_high": "👴 อายุมากที่สุด",
    "adj_baro_f2_s3_title": "⏳ สเกลที่ 3: ระยะเวลา",
    "adj_baro_f2_s3_desc": "เรียงเหตุการณ์จากระยะเวลาสั้นที่สุดไประยะเวลายาวนานที่สุด:",
    "adj_baro_f2_s3_low": "⚡ ไม่กี่วินาที",
    "adj_baro_f2_s3_high": "♾️ เวลานานมาก",
    "adj_baro_f2_s4_title": "🔄 สเกลที่ 4: ความถี่",
    "adj_baro_f2_s4_desc": "เรียงคำตามความบ่อยที่บางสิ่งเกิดขึ้น:",
    "adj_baro_f2_s4_low": "🚫 แทบจะไม่เคย",
    "adj_baro_f2_s4_high": "🔁 ตลอดเวลา",
    "adj_baro_f2_s5_title": "🎯 สเกลที่ 5: ความตรงต่อเวลาและความแม่นยำ",
    "adj_baro_f2_s5_desc": "เรียงจากล่าช้าที่สุดไปตรงเวลาอย่างยิ่ง:",
    "adj_baro_f2_s5_low": "⚠️ สายมากเกินไป",
    "adj_baro_f2_s5_high": "🎯 ตรงเวลาพอดี",
    "adj_baro_f2_s6_title": "📅 สเกลที่ 6: ปัจจุบันกาลและเส้นเวลา",
    "adj_baro_f2_s6_desc": "เรียงขั้นตอนในกระบวนการจากอดีตไปปัจจุบัน:",
    "adj_baro_f2_s6_low": "📜 อดีต",
    "adj_baro_f2_s6_high": "📍 ตอนนี้เดี๋ยวนี้",
    "adj_baro_f3_s1_title": "⭐ สเกลที่ 1: คุณภาพ",
    "adj_baro_f3_s1_desc": "เรียงการประเมินจากแย่ที่สุดไปดีที่สุด:",
    "adj_baro_f3_s1_low": "🗑️ แย่ที่สุด",
    "adj_baro_f3_s1_high": "🏆 ดีที่สุด",
    "adj_baro_f3_s2_title": "🧠 สเกลที่ 2: ระดับความยาก",
    "adj_baro_f3_s2_desc": "เรียงงานจากง่ายที่สุดไปยากที่สุด:",
    "adj_baro_f3_s2_low": "👶 ง่ายที่สุด",
    "adj_baro_f3_s2_high": "🧩 ยากที่สุด",
    "adj_baro_f3_s3_title": "💰 สเกลที่ 3: ระดับราคา",
    "adj_baro_f3_s3_desc": "เรียงตามราคาจากไม่มีค่าใช้จ่ายไปแพงอย่างยิ่ง:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 ราคามหาศาล",
    "adj_baro_f3_s4_title": "📌 สเกลที่ 4: ความสำคัญและลำดับความสำคัญ",
    "adj_baro_f3_s4_desc": "เรียงข้อมูลจากไม่สำคัญเลยไปขาดไม่ได้อย่างยิ่ง:",
    "adj_baro_f3_s4_low": "💤 ไม่สำคัญ",
    "adj_baro_f3_s4_high": "🚨 ขาดไม่ได้",
    "adj_baro_f3_s5_title": "🔍 สเกลที่ 5: ความสมบูรณ์ครบถ้วน",
    "adj_baro_f3_s5_desc": "เรียงคุณภาพของรายงานจากไร้ประโยชน์ไปสมบูรณ์แบบ:",
    "adj_baro_f3_s5_low": "❌ ไร้ประโยชน์",
    "adj_baro_f3_s5_high": "💯 สมบูรณ์แบบ",
    "adj_baro_f3_s6_title": "⚙️ สเกลที่ 6: ความซับซ้อน",
    "adj_baro_f3_s6_desc": "เรียงกฎเกณฑ์จากง่ายที่สุดไปซับซ้อนที่สุด:",
    "adj_baro_f3_s6_low": "🔹 เรียบง่ายที่สุด",
    "adj_baro_f3_s6_high": "🌀 ซับซ้อนที่สุด",
    "adj_baro_f4_s1_title": "😊 สเกลที่ 1: ความสุขและอารมณ์",
    "adj_baro_f4_s1_desc": "เรียงอารมณ์ความรู้สึกจากเศร้าที่สุดไปมีความสุขที่สุด:",
    "adj_baro_f4_s1_low": "😢 ใจสลาย",
    "adj_baro_f4_s1_high": "🎉 มีความสุขเปี่ยมล้น",
    "adj_baro_f4_s2_title": "⚡ สเกลที่ 2: พลังงานและความกระปรี้กระเปร่า",
    "adj_baro_f4_s2_desc": "เรียงระดับพลังงานจากหมดแรงสิ้นเชิงไปเปี่ยมล้นไปด้วยพลัง:",
    "adj_baro_f4_s2_low": "🪫 เหนื่อยล้าหมดแรง",
    "adj_baro_f4_s2_high": "🔋 เปี่ยมล้นด้วยพลัง",
    "adj_baro_f4_s3_title": "🧘 สเกลที่ 3: ความสงบ เทียบกับ ความประหม่า",
    "adj_baro_f4_s3_desc": "เรียงจากสงบที่สุดไปกลัวหรือตื่นตระหนกที่สุด:",
    "adj_baro_f4_s3_low": "🕊️ สงบนิ่งสนิท",
    "adj_baro_f4_s3_high": "😱 ตื่นตระหนกสุดขีด",
    "adj_baro_f4_s4_title": "🧸 สเกลที่ 4: ความรู้สึกปลอดภัยและความกลัว",
    "adj_baro_f4_s4_desc": "เรียงจากรู้สึกปลอดภัยอย่างสมบูรณ์ไปหวาดกลัวสุดขีด:",
    "adj_baro_f4_s4_low": "🛡️ ปลอดภัยมั่นใจเต็มที่",
    "adj_baro_f4_s4_high": "😨 หวาดกลัวสุดขีด",
    "adj_baro_f4_s5_title": "💖 สเกลที่ 5: ความเป็นมิตร",
    "adj_baro_f4_s5_desc": "เรียงพฤติกรรมจากไม่เป็นมิตรที่สุดไปอบอุ่นใจที่สุด:",
    "adj_baro_f4_s5_low": "🧊 ไม่เป็นมิตร / เย็นชา",
    "adj_baro_f4_s5_high": "☀️ อบอุ่นใจอย่างยิ่ง",
    "adj_baro_f4_s6_title": "👍 สเกลที่ 6: ความพึงพอใจ",
    "adj_baro_f4_s6_desc": "เรียงปฏิกิริยาของลูกค้าจากโกรธจัดไปกระตือรือร้นประทับใจสุดขีด:",
    "adj_baro_f4_s6_low": "😡 โกรธเกรี้ยว",
    "adj_baro_f4_s6_high": "🤩 ตื่นเต้นประทับใจ",
    "adj_baro_f5_s1_title": "🧽 สเกลที่ 1: ความสะอาด",
    "adj_baro_f5_s1_desc": "เรียงจากสกปรกที่สุดไปสะอาดหมดจดแวววาว:",
    "adj_baro_f5_s1_low": "👞 น่ารังเกียจ / สกปรก",
    "adj_baro_f5_s1_high": "✨ สะอาดแวววาว",
    "adj_baro_f5_s2_title": "🍎 สเกลที่ 2: สุขภาพและความฟิต",
    "adj_baro_f5_s2_desc": "เรียงจากป่วยหนักไปสุขภาพดีเยี่ยมเปี่ยมพลัง:",
    "adj_baro_f5_s2_low": "🤒 ป่วยหนัก",
    "adj_baro_f5_s2_high": "💪 สุขภาพดีเยี่ยมเปี่ยมพลัง",
    "adj_baro_f5_s3_title": "💧 สเกลที่ 3: ความชื้น",
    "adj_baro_f5_s3_desc": "เรียงจากแห้งสนิทไปเปียกโชก:",
    "adj_baro_f5_s3_low": "🏜️ แห้งแล้งสนิท",
    "adj_baro_f5_s3_high": "🌊 เปียกโชก",
    "adj_baro_f5_s4_title": "💡 สเกลที่ 4: ระดับแสงสว่าง",
    "adj_baro_f5_s4_desc": "เรียงจากมืดมิดสนิทไปสว่างจ้าแสบตา:",
    "adj_baro_f5_s4_low": "🌑 มืดมิดสนิท",
    "adj_baro_f5_s4_high": "☀️ สว่างจ้าแสบตา",
    "adj_baro_f5_s5_title": "📊 สเกลที่ 5: ปริมาณ",
    "adj_baro_f5_s5_desc": "เรียงปริมาณจากไม่มีเลยไปนับไม่ถ้วน:",
    "adj_baro_f5_s5_low": "0️⃣ ไม่มีเลย",
    "adj_baro_f5_s5_high": "♾️ นับไม่ถ้วน",
    "adj_baro_f5_s6_title": "🧭 สเกลที่ 6: ความแน่นอนและความมั่นใจ",
    "adj_baro_f5_s6_desc": "เรียงจากไม่แน่นอนอย่างสิ้นเชิงไปชัดเจนแจ่มแจ้งอย่างยิ่ง:",
    "adj_baro_f5_s6_low": "❓ น่าสงสัย / ไม่แน่นอน",
    "adj_baro_f5_s6_high": "✔️ ชัดเจนแจ่มแจ้ง",
    "top100_adj_hub_title": "100 คำคุณศัพท์ที่พบบ่อยที่สุด",
    "top100_adj_hub_desc": "คำคุณศัพท์ใช้อธิบายโลกรอบตัว เพิ่มความละเอียดลึกซึ้ง และแสดงความตรงกันข้าม สำรวจคำคุณศัพท์ภาษาเดนมาร์กที่พบบ่อยที่สุด 100 คำ ซึ่งแบ่งออกเป็น 5 หมวดความหมาย – และฝึกฝนคู่มือการผันรูปฉบับสมบูรณ์ในหมวดที่ 6 ให้เชี่ยวชาญ!",
    "top100_adj_f1_badge": "🔬 หมวดที่ 1: 20 คำตรงข้ามที่วัดได้",
    "top100_adj_f1_title": "1. คุณสมบัติทางกายภาพ รูปร่าง และประสาทสัมผัส",
    "top100_adj_f1_desc": "ครอบคลุมทุกสิ่งที่สามารถวัด สัมผัส หรือรับรู้ได้ในชีวิตประจำวัน: <em>stor (ใหญ่) / lille (เล็ก), lang (ยาว) / kort (สั้น), høj (สูง) / lav (เตี้ย/ต่ำ), bred (กว้าง) / smal (แคบ), tung (หนัก) / let (เบา), varm (ร้อน/อุ่น) / kold (เย็น), hård (แข็ง) / blød (นุ่ม), fast (แน่น) / løs (หลวม), fuld (เต็ม) / tom (ว่างเปล่า), åben (เปิด) / lukket (ปิด)</em>.",
    "top100_adj_f1_btn": "ไปที่หมวดที่ 1 ➔",
    "top100_adj_f2_badge": "⏱️ หมวดที่ 2: 20 คำคุณศัพท์เกี่ยวกับเวลา",
    "top100_adj_f2_title": "2. เวลา อายุ และความเร็ว",
    "top100_adj_f2_desc": "ลำดับเวลา การเปลี่ยนแปลง และความเร็วในชีวิตประจำวัน: <em>ny (ใหม่) / gammel (เก่า), ung (หนุ่มสาว) / gammel (แก่), tidlig (เช้า/ก่อนเวลา) / sen (สาย/ดึก), hurtig (เร็ว) / langsom (ช้า), pludselig (กะทันหัน), forsinket (ล่าช้า), travl (ยุ่ง), rolig (สงบ)...</em>",
    "top100_adj_f2_btn": "ไปที่หมวดที่ 2 ➔",
    "top100_adj_f3_badge": "💎 หมวดที่ 3: 20 คำคุณศัพท์เกี่ยวกับการประเมิน",
    "top100_adj_f3_title": "3. คุณภาพ ระดับความยาก และการเงิน",
    "top100_adj_f3_desc": "การประเมิน ราคา ความพยายาม และคุณค่า: <em>god (ดี) / dårlig (แย่), svær (ยาก) / let (ง่าย), dyr (แพง) / billig (ถูก), vigtig (สำคัญ) / ligegyldig (ไม่สำคัญ), nødvendig (จำเป็น), gratis (ฟรี), perfekt (สมบูรณ์แบบ), forkert (ผิด)...</em>",
    "top100_adj_f3_btn": "ไปที่หมวดที่ 3 ➔",
    "top100_adj_f4_badge": "❤️ หมวดที่ 4: 20 คำคุณศัพท์ทางสังคม",
    "top100_adj_f4_title": "4. อารมณ์ บุคลิกภาพ และความสัมพันธ์",
    "top100_adj_f4_desc": "อารมณ์ความรู้สึกของผู้คนและการมีปฏิสัมพันธ์ทางสังคม: <em>glad (มีความสุข) / ked af det (เสียใจ), venlig (เป็นมิตร) / uvenlig (ไม่เป็นมิตร), træt (เหนื่อย) / frisk (สดชื่น), tryg (อุ่นใจ/ปลอดภัย) / bange (กลัว), sur (หงุดหงิด), sød (น่ารัก), stolt (ภูมิใจ), rolig (สงบ)...</em>",
    "top100_adj_f4_btn": "ไปที่หมวดที่ 4 ➔",
    "top100_adj_f5_badge": "🎨 หมวดที่ 5: 20 คำคุณศัพท์บอกสถานะ",
    "top100_adj_f5_title": "5. สี ปริมาณ และสถานะ",
    "top100_adj_f5_desc": "สภาพทางสายตาและการใช้งานจริงในชีวิตประจำวัน: <em>rød (แดง), blå (น้ำเงิน), grøn (เขียว), hel (ทั้งหมด) / halv (ครึ่งหนึ่ง), mange (หลาย) / få (น้อย), ren (สะอาด) / beskidt (สกปรก), sund (สุขภาพดี) / syg (ป่วย), klar (พร้อม/ชัดเจน), sikker (ปลอดภัย/มั่นใจ), rigtig (ถูกต้อง)...</em>",
    "top100_adj_f5_btn": "ไปที่หมวดที่ 5 ➔",
    "top100_adj_f6_badge": "📏 หมวดที่ 6 • ปรมาจารย์การผันรูป (การเปรียบเทียบขั้นและกฎตัว e)",
    "top100_adj_f6_title": "6. คู่มือการผันรูปฉบับสมบูรณ์: การเปรียบเทียบขั้นและกฎตัว e",
    "top100_adj_f6_desc": "ระบบฝึกผันรูปเชิงโต้ตอบที่สมบูรณ์แบบ: <strong>1. ขั้นปกติ</strong> (<em>stor</em>) ➔ <strong>2. ขั้นกว่า</strong> พร้อม \"end\" (<em>større end</em>) ➔ <strong>3. ขั้นสุด</strong> (<em>størst / den største</em>), พร้อมสูตรที่อธิบายว่าเหตุใด <em>den/min/denne/Peters</em> จึงต้องบังคับเติม <strong>-e</strong> เสมอ!",
    "top100_adj_f6_btn": "เปิดคู่มือการผันรูป 📏 ➔",
    "top100_adj_ped_title": "💡 คุณจะเรียนรู้คำคุณศัพท์ได้ดีที่สุดอย่างไร?",
    "top100_adj_ped_item1_title": "⚖️ ภาพคำตรงข้าม",
    "top100_adj_ped_item1_desc": "คำคุณศัพท์ใช้อธิบายความสัมพันธ์ การเรียนรู้ <em>varm ↔ kold</em> ไปพร้อมกัน จะช่วยให้สมองจดจำคำทั้งสองลงในเครือข่ายความหมายได้เร็วขึ้นเป็นเท่าตัว",
    "top100_adj_ped_item2_title": "🧩 ความสอดคล้องและการผันรูป",
    "top100_adj_ped_item2_desc": "คำคุณศัพท์ไม่เคยอยู่ตามลำพัง – แต่จะผันตามเพศและพจน์: <em>en varm te</em> (เพศรวม), <em>et varmt bad</em> (เพศกลาง: -t), <em>de varme dage</em> (พหูพจน์: -e)",
    "top100_adj_ped_item3_title": "🌡️ ระดับและความเข้มข้น",
    "top100_adj_ped_item3_desc": "ค้นพบระดับความเข้มข้นของคำศัพท์บนบารอมิเตอร์: จาก <em>iskold</em> (เย็นยะเยือก) ➔ <em>kold</em> (เย็น) ➔ <em>lun</em> (อุ่นๆ) ➔ <em>varm</em> (ร้อน) ➔ <em>kogende</em> (ร้อนเดือด)",
    "adj_tab_1": "1. การศึกษาความแตกต่าง",
    "adj_tab_2": "2. ค้นหาคำตรงข้าม (ประลอง)",
    "adj_tab_3": "3. คำพ้องความหมายและเฉดความหมาย",
    "adj_tab_4": "4. บารอมิเตอร์ (ระดับสเกล)",
    "adj_tab_5": "5. ความสอดคล้อง (-t / -e)",
    "adj_tab_6": "6. บริบทและเรื่องราว",
    "adj_pure_label": "ดูภาพแบบไม่มีคำบรรยาย:",
    "adj_listen_word": "ฟังคำเป้าหมาย",
    "adj_listen_pronunciation": "ฟังการออกเสียง",
    "adj_modpol_label": "คำตรงข้าม:",
    "adj_faelles_label": "เพศรวม (en ...)",
    "adj_intet_label": "เพศกลาง (et ... / +t)",
    "adj_flertal_label": "ชี้เฉพาะ / พหูพจน์ (+e)",
    "adj_example_sentence": "ประโยคง่ายๆ:",
    "adj_status_on": "เปิด",
    "adj_status_off": "ปิด",
    "adj_click_hotspot_hint": "คลิกที่จุดเพื่อฟังการออกเสียงและดูคำตรงข้ามในห้องตรงข้าม!"
  },
  "ne": {
    "adj_baro_counter": "ब्यारोमिटर {current} / {total}",
    "adj_baro_step": "[ चरण {n} ]",
    "adj_baro_remove_tooltip": "यो शब्द हटाउन क्लिक गर्नुहोस्",
    "adj_baro_reset_btn": "स्केल रिसेट गर्नुहोस् 🔄",
    "adj_baro_check_btn": "क्रम जाँच गर्नुहोस् ✔️",
    "adj_baro_next_btn": "अर्को स्केल ➔",
    "adj_baro_master_btn": "तपाईंले ब्यारोमिटरमा दक्षता हासिल गर्नुभयो! 🏆",
    "adj_baro_success": "🎉 पूर्ण रूपमा मिलाइयो! तपाईंले शब्दहरूलाई एकदम सही क्रममा राख्नुभयो:",
    "adj_baro_wrong": "अझै पूरै मिलेको छैन। केही शब्दहरू सही क्रममा छैनन्।",
    "adj_baro_hint": "सुझाव: सुरुमा सबैभन्दा सामान्य अवस्था र अन्त्यमा सबैभन्दा तीव्र अवस्थाको बारेमा सोच्नुहोस्!",
    "adj_kongruens_subprompt": "विशेषणको सही रूप छान्नुहोस्:",
    "adj_grammar_banner_title": "के तपाईं विशेषणका सबै रूप परिवर्तनका नियमहरू राम्ररी सिक्न चाहनुहुन्छ?",
    "adj_grammar_banner_desc": "आधारभूत रूप, नपुंसक लिङ्ग (-t), निश्चित रूप र बहुवचन (-e), साथै तुलनात्मक रूपहरू बारे सिक्नुहोस्।",
    "adj_grammar_banner_btn": "रूप परिवर्तन गाइडमा जानुहोस् ➔",
    "adj_story_subprompt": "यस परिस्थितिमा कुन शब्द सबैभन्दा उपयुक्त हुन्छ?",
    "adj_duel_counter": "⚔️ मुकाबला {current} / {total}",
    "adj_nuance_counter": "🔄 सूक्ष्म अर्थ {current} / {total}",
    "adj_kongruens_counter": "🧩 सङ्गति {current} / {total}",
    "adj_situation_counter": "📖 परिस्थिति {current} / {total}",
    "adj_score_label": "अङ्क:",
    "adj_next_duel": "अर्को मुकाबला ➔",
    "adj_next_nuance": "अर्को सूक्ष्म अर्थ ➔",
    "adj_next_kongruens": "अर्को अभ्यास ➔",
    "adj_next_situation": "अर्को परिस्थिति ➔",
    "adj_result_duel_btn": "नतिजा हेर्नुहोस् ({score}/{total}) 🏆",
    "adj_result_syn_btn": "पर्यायवाची समाप्त गर्नुहोस् ({score}/{total}) 🌟",
    "adj_result_kong_btn": "रूप परिवर्तनको नतिजा हेर्नुहोस् ({score}/{total}) 🏆",
    "adj_result_story_btn": "नतिजा हेर्नुहोस् ({score}/{total}) 🌟",
    "adj_retry_btn": "फेरि प्रयास गर्नुहोस् 🔄",
    "adj_correct_feedback": "🎉 सही!",
    "adj_wrong_feedback": "पूरै मिलेन:",
    "adj_correct_answer_is": "सही उत्तर यो हो:",
    "adj_duel_modal_title": "विपरितार्थी मुकाबलामा उत्कृष्ट प्रदर्शन!",
    "adj_duel_modal_score": "तपाईंले <strong>{total}</strong> मध्ये <strong>{score}</strong> सही विपरितार्थी मिलाउनुभयो।",
    "adj_syn_modal_title": "उत्कृष्ट शब्दावली!",
    "adj_syn_modal_score": "तपाईंले <strong>{total}</strong> मध्ये <strong>{score}</strong> सही सूक्ष्म अर्थ मिलाउनुभयो।",
    "adj_kong_modal_title": "विशेषणको रूप परिवर्तनमा राम्रो काम गर्नुभयो!",
    "adj_kong_modal_score": "तपाईंले <strong>{total}</strong> मध्ये <strong>{score}</strong> सही प्रत्ययहरू मिलाउनुभयो।",
    "adj_story_modal_title": "उत्कृष्ट पढाइ बोध!",
    "adj_story_modal_score": "तपाईंले <strong>{total}</strong> मध्ये <strong>{score}</strong> सही उत्तर दिनुभयो।",
    "adj_f1_stage_warm": "☀️ न्यानो घर (१० विशेषताहरू)",
    "adj_f1_stage_cool": "❄️ बलियो कार्यशाला (१० विपरितार्थीहरू)",
    "adj_f2_stage_title": "⏱️ स्टेसन र गति (२० समयसम्बन्धी विशेषणहरू)",
    "adj_f3_stage_left": "💎 मूल्य र पूर्णता",
    "adj_f3_stage_right": "⚙️ कठिनाइ स्तर र जटिलता",
    "adj_f4_stage_left": "❤️ सामाजिक जीवन र आनन्द",
    "adj_f4_stage_right": "🌧️ कठिनाइ र असहजता",
    "adj_f5_stage_left": "🌿 सरसफाइ, स्वास्थ्य र सन्तुलन",
    "adj_f5_stage_right": "🌑 अस्तव्यस्तता, रोग र अन्धकार",
    "adj_baro_f1_s1_title": "🌡️ स्केल १: तापक्रम",
    "adj_baro_f1_s1_desc": "शब्दहरूलाई तापक्रम अनुसार सबैभन्दा चिसोबाट सबैभन्दा तातोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f1_s1_low": "🥶 सबैभन्दा चिसो",
    "adj_baro_f1_s1_high": "🔥 सबैभन्दा तातो",
    "adj_baro_f1_s2_title": "📐 स्केल २: आकार",
    "adj_baro_f1_s2_desc": "शब्दहरूलाई आकार अनुसार सबैभन्दा सानोबाट सबैभन्दा ठूलोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f1_s2_low": "🔬 सबैभन्दा सानो",
    "adj_baro_f1_s2_high": "🐘 सबैभन्दा ठूलो",
    "adj_baro_f1_s3_title": "⚖️ स्केल ३: तौल",
    "adj_baro_f1_s3_desc": "शब्दहरूलाई सबैभन्दा हलुकाबाट सबैभन्दा गह्रौँको क्रममा मिलाउनुहोस्:",
    "adj_baro_f1_s3_low": "🪶 सबैभन्दा हलुका",
    "adj_baro_f1_s3_high": "🪨 सबैभन्दा गह्रौँ",
    "adj_baro_f1_s4_title": "🛋️ स्केल ४: कडापन र बनावट",
    "adj_baro_f1_s4_desc": "शब्दहरूलाई सबैभन्दा नरमबाट सबैभन्दा कडाको क्रममा मिलाउनुहोस्:",
    "adj_baro_f1_s4_low": "☁️ सबैभन्दा नरम",
    "adj_baro_f1_s4_high": "💎 सबैभन्दा कडा",
    "adj_baro_f1_s5_title": "🫙 स्केल ५: मात्रा / पूर्णता",
    "adj_baro_f1_s5_desc": "शब्दहरूलाई खालीबाट भरिएको क्रममा मिलाउनुहोस्:",
    "adj_baro_f1_s5_low": "🫙 पूरै खाली",
    "adj_baro_f1_s5_high": "📦 पूरै भरिएको",
    "adj_baro_f1_s6_title": "📏 स्केल ६: लम्बाइ र अवधि",
    "adj_baro_f1_s6_desc": "शब्दहरूलाई सबैभन्दा छोटोबाट सबैभन्दा लामोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f1_s6_low": "⚡ सबैभन्दा छोटो",
    "adj_baro_f1_s6_high": "♾️ सबैभन्दा लामो",
    "adj_baro_f2_s1_title": "🏃 स्केल १: गति र चाल",
    "adj_baro_f2_s1_desc": "शब्दहरूलाई गति अनुसार सबैभन्दा ढिलोबाट सबैभन्दा छिटोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f2_s1_low": "🐢 सबैभन्दा ढिलो",
    "adj_baro_f2_s1_high": "⚡ सबैभन्दा छिटो",
    "adj_baro_f2_s2_title": "🎂 स्केल २: उमेर",
    "adj_baro_f2_s2_desc": "शब्दहरूलाई सबैभन्दा कान्छोबाट सबैभन्दा जेठोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f2_s2_low": "👶 सबैभन्दा कान्छो",
    "adj_baro_f2_s2_high": "👴 सबैभन्दा जेठो",
    "adj_baro_f2_s3_title": "⏳ स्केल ३: अवधि",
    "adj_baro_f2_s3_desc": "घटनाहरूलाई सबैभन्दा छोटो अवधिबाट सबैभन्दा लामो अवधिको क्रममा मिलाउनुहोस्:",
    "adj_baro_f2_s3_low": "⚡ केही सेकेन्ड",
    "adj_baro_f2_s3_high": "♾️ धेरै लामो समय",
    "adj_baro_f2_s4_title": "🔄 स्केल ४: आवृत्ति (कति पटक)",
    "adj_baro_f2_s4_desc": "कुनै कुरा कति पटक हुन्छ भन्ने आधारमा शब्दहरूलाई मिलाउनुहोस्:",
    "adj_baro_f2_s4_low": "🚫 लगभग कहिल्यै होइन",
    "adj_baro_f2_s4_high": "🔁 सधैँभरि",
    "adj_baro_f2_s5_title": "🎯 स्केल ५: समयनिष्ठता र शुद्धता",
    "adj_baro_f2_s5_desc": "सबैभन्दा धेरै ढिलोबाट पूर्ण समयनिष्ठसम्म मिलाउनुहोस्:",
    "adj_baro_f2_s5_low": "⚠️ धेरै ढिलो",
    "adj_baro_f2_s5_high": "🎯 ठ्याक्कै समयमा",
    "adj_baro_f2_s6_title": "📅 स्केल ६: समसामयिकता / समयरेखा",
    "adj_baro_f2_s6_desc": "प्रक्रियाका चरणहरूलाई भूतकालबाट वर्तमानकालको क्रममा मिलाउनुहोस्:",
    "adj_baro_f2_s6_low": "📜 भूतकाल",
    "adj_baro_f2_s6_high": "📍 अहिल्यै",
    "adj_baro_f3_s1_title": "⭐ स्केल १: गुणस्तर",
    "adj_baro_f3_s1_desc": "मूल्याङ्कनहरूलाई सबैभन्दा खराबबाट सबैभन्दा राम्रोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f3_s1_low": "🗑️ सबैभन्दा खराब",
    "adj_baro_f3_s1_high": "🏆 सबैभन्दा राम्रो",
    "adj_baro_f3_s2_title": "🧠 स्केल २: कठिनाइ स्तर",
    "adj_baro_f3_s2_desc": "कार्यहरूलाई सबैभन्दा सजिलोबाट सबैभन्दा गाह्रोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f3_s2_low": "👶 सबैभन्दा सजिलो",
    "adj_baro_f3_s2_high": "🧩 सबैभन्दा गाह्रो",
    "adj_baro_f3_s3_title": "💰 स्केल ३: मूल्य स्तर",
    "adj_baro_f3_s3_desc": "मूल्य अनुसार केही नलाग्नेबाट अत्यन्तै महँगोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 अथाह सम्पत्ति",
    "adj_baro_f3_s4_title": "📌 स्केल ४: महत्त्व र प्राथमिकता",
    "adj_baro_f3_s4_desc": "जानकारीलाई पूरै महत्त्वहीनबाट अपरिहार्यको क्रममा मिलाउनुहोस्:",
    "adj_baro_f3_s4_low": "💤 महत्त्वहीन",
    "adj_baro_f3_s4_high": "🚨 अपरिहार्य",
    "adj_baro_f3_s5_title": "🔍 स्केल ५: पूर्णता",
    "adj_baro_f3_s5_desc": "प्रतिवेदनको गुणस्तरलाई अनुपयोगीबाट उत्कृष्टको क्रममा मिलाउनुहोस्:",
    "adj_baro_f3_s5_low": "❌ काम नलाग्ने",
    "adj_baro_f3_s5_high": "💯 उत्कृष्ट",
    "adj_baro_f3_s6_title": "⚙️ स्केल ६: जटिलता",
    "adj_baro_f3_s6_desc": "नियमहरूलाई सबैभन्दा सरलबाट सबैभन्दा जटिलको क्रममा मिलाउनुहोस्:",
    "adj_baro_f3_s6_low": "🔹 सबैभन्दा सरल",
    "adj_baro_f3_s6_high": "🌀 सबैभन्दा जटिल",
    "adj_baro_f4_s1_title": "😊 स्केल १: आनन्द र मुड",
    "adj_baro_f4_s1_desc": "भावनाहरूलाई सबैभन्दा उदासबाट सबैभन्दा खुसीको क्रममा मिलाउनुहोस्:",
    "adj_baro_f4_s1_low": "😢 मर्माहत / अत्यन्तै दुःखी",
    "adj_baro_f4_s1_high": "🎉 अत्यन्तै खुसी",
    "adj_baro_f4_s2_title": "⚡ स्केल २: ऊर्जा र स्फूर्ति",
    "adj_baro_f4_s2_desc": "ऊर्जा स्तरलाई पूरै थकितबाट ऊर्जाले भरिएको क्रममा मिलाउनुहोस्:",
    "adj_baro_f4_s2_low": "🪫 थकित / गलित",
    "adj_baro_f4_s2_high": "🔋 ऊर्जाले भरिपूर्ण",
    "adj_baro_f4_s3_title": "🧘 स्केल ३: शान्ति बनाम बेचैनी",
    "adj_baro_f4_s3_desc": "सबैभन्दा शान्तबाट सबैभन्दा डराएको/आत्तिएको क्रममा मिलाउनुहोस्:",
    "adj_baro_f4_s3_low": "🕊️ पूरै शान्त",
    "adj_baro_f4_s3_high": "😱 अत्यन्तै आत्तिएको",
    "adj_baro_f4_s4_title": "🧸 स्केल ४: सुरक्षा र डर",
    "adj_baro_f4_s4_desc": "पूर्ण रूपमा सुरक्षितबाट भयभीतको क्रममा मिलाउनुहोस्:",
    "adj_baro_f4_s4_low": "🛡️ पूरै सुरक्षित",
    "adj_baro_f4_s4_high": "😨 भयभीत / त्रसित",
    "adj_baro_f4_s5_title": "💖 स्केल ५: मित्रता / दयालुपन",
    "adj_baro_f4_s5_desc": "व्यवहारलाई सबैभन्दा अमैत्रीपूर्णबाट सबैभन्दा दयालु/न्यानोको क्रममा मिलाउनुहोस्:",
    "adj_baro_f4_s5_low": "🧊 अमैत्रीपूर्ण / चिसो",
    "adj_baro_f4_s5_high": "☀️ दयालु / न्यानो मनको",
    "adj_baro_f4_s6_title": "👍 स्केल ६: सन्तुष्टि",
    "adj_baro_f4_s6_desc": "ग्राहकको प्रतिक्रियालाई अत्यन्तै क्रुद्धबाट उत्साहीको क्रममा मिलाउनुहोस्:",
    "adj_baro_f4_s6_low": "😡 क्रुद्ध / आगबबूला",
    "adj_baro_f4_s6_high": "🤩 उत्साही",
    "adj_baro_f5_s1_title": "🧽 स्केल १: सरसफाइ",
    "adj_baro_f5_s1_desc": "सबैभन्दा फोहोरबाट चम्किलो सफाको क्रममा मिलाउनुहोस्:",
    "adj_baro_f5_s1_low": "👞 घृणित / फोहोर",
    "adj_baro_f5_s1_high": "✨ चम्किलो सफा",
    "adj_baro_f5_s2_title": "🍎 स्केल २: स्वास्थ्य र तन्दुरुस्ती",
    "adj_baro_f5_s2_desc": "गम्भीर बिरामीबाट पूर्ण तन्दुरुस्तको क्रममा मिलाउनुहोस्:",
    "adj_baro_f5_s2_low": "🤒 गम्भीर बिरामी",
    "adj_baro_f5_s2_high": "💪 पूर्ण स्वस्थ र तन्दुरुस्त",
    "adj_baro_f5_s3_title": "💧 स्केल ३: ओस / आर्द्रता",
    "adj_baro_f5_s3_desc": "सुख्खाबाट पूरै भिजेको क्रममा मिलाउनुहोस्:",
    "adj_baro_f5_s3_low": "🏜️ बिल्कुलै सुख्खा",
    "adj_baro_f5_s3_high": "🌊 पूरै भिजेको",
    "adj_baro_f5_s4_title": "💡 स्केल ४: प्रकाश स्तर",
    "adj_baro_f5_s4_desc": "घोर अन्धकारबाट आँखा तिरमिराउने उज्यालोसम्म मिलाउनुहोस्:",
    "adj_baro_f5_s4_low": "🌑 घोर अन्धकार",
    "adj_baro_f5_s4_high": "☀️ आँखा तिरमिराउने उज्यालो",
    "adj_baro_f5_s5_title": "📊 स्केल ५: मात्रा",
    "adj_baro_f5_s5_desc": "मात्रालाई केही नभएकोबाट अनगिन्तीसम्म मिलाउनुहोस्:",
    "adj_baro_f5_s5_low": "0️⃣ केही छैन",
    "adj_baro_f5_s5_high": "♾️ अनगिन्ती",
    "adj_baro_f5_s6_title": "🧭 स्केल ६: निश्चितता र सुरक्षा",
    "adj_baro_f5_s6_desc": "पूरै अनिश्चितबाट छर्लङ्ग निश्चिततासम्म मिलाउनुहोस्:",
    "adj_baro_f5_s6_low": "❓ शंकास्पद",
    "adj_baro_f5_s6_high": "✔️ एकदम छर्लङ्ग",
    "top100_adj_hub_title": "१०० सबैभन्दा सामान्य विशेषणहरू",
    "top100_adj_hub_desc": "विशेषणहरूले संसारको वर्णन गर्छन्, सूक्ष्म अर्थ थप्छन् र भिन्नताहरू व्यक्त गर्छन्। ५ वटा अर्थपूर्ण क्षेत्रहरूमा विभाजित १०० सबैभन्दा सामान्य डेनिस विशेषणहरू अन्वेषण गर्नुहोस् – र क्षेत्र ६ मा पूर्ण रूप परिवर्तन गाइडमा निपुणता हासिल गर्नुहोस्!",
    "top100_adj_f1_badge": "🔬 क्षेत्र १: २० मापनयोग्य विपरितार्थीहरू",
    "top100_adj_f1_title": "१. भौतिक गुणहरू, आकार र इन्द्रियहरू",
    "top100_adj_f1_desc": "दैनिक जीवनमा मापन गर्न सकिने, छुन सकिने वा महसुस गर्न सकिने सबै कुराहरू समेट्छ: <em>stor (ठूलो) / lille (सानो), lang (लामो) / kort (छोटो), høj (अग्लो/उच्च) / lav (होचो), bred (फराकिलो) / smal (साँघुरो), tung (गहुँगो) / let (हलुका), varm (तातो) / kold (चिसो), hård (कडा) / blød (नरम), fast (कसिलो) / løs (खुकुलो), fuld (भरिएको) / tom (खाली), åben (खुला) / lukket (बन्द)</em>.",
    "top100_adj_f1_btn": "क्षेत्र १ मा जानुहोस् ➔",
    "top100_adj_f2_badge": "⏱️ क्षेत्र २: २० समय सम्बन्धी विशेषणहरू",
    "top100_adj_f2_title": "२. समय, उमेर र गति",
    "top100_adj_f2_desc": "दैनिक जीवनमा कालक्रम, परिवर्तन र गति: <em>ny (नयाँ) / gammel (पुरानो), ung (जवान) / gammel (बुढो), tidlig (चाँडो/सबेरै) / sen (ढिलो), hurtig (छिटो) / langsom (सुस्त), pludselig (अचानक), forsinket (ढिलाइ भएको), travl (व्यस्त), rolig (शान्त)...</em>",
    "top100_adj_f2_btn": "क्षेत्र २ मा जानुहोस् ➔",
    "top100_adj_f3_badge": "💎 क्षेत्र ३: २० मूल्याङ्कन सम्बन्धी विशेषणहरू",
    "top100_adj_f3_title": "३. गुणस्तर, कठिनाइको स्तर र अर्थतन्त्र",
    "top100_adj_f3_desc": "मूल्याङ्कन, मूल्य, प्रयास र महत्त्व: <em>god (राम्रो) / dårlig (नराम्रो), svær (गाह्रो) / let (सजिलो), dyr (महँगो) / billig (सस्तो), vigtig (महत्त्वपूर्ण) / ligegyldig (महत्त्वहीन), nødvendig (आवश्यक), gratis (निःशुल्क), perfekt (उत्तम), forkert (गलत)...</em>",
    "top100_adj_f3_btn": "क्षेत्र ३ मा जानुहोस् ➔",
    "top100_adj_f4_badge": "❤️ क्षेत्र ४: २० सामाजिक विशेषणहरू",
    "top100_adj_f4_title": "४. भावनाहरू, व्यक्तित्व र सम्बन्धहरू",
    "top100_adj_f4_desc": "मानिसहरूको मानसिक अवस्था र सामाजिक अन्तरक्रिया: <em>glad (खुसी) / ked af det (दुःखी), venlig (मिलनसार) / uvenlig (अमिलनसार), træt (थकित) / frisk (ताजा), tryg (सुरक्षित) / bange (डराएको), sur (रिसाएको), sød (प्यारो), stolt (गर्वित), rolig (शान्त)...</em>",
    "top100_adj_f4_btn": "क्षेत्र ४ मा जानुहोस् ➔",
    "top100_adj_f5_badge": "🎨 क्षेत्र ५: २० अवस्था सम्बन्धी विशेषणहरू",
    "top100_adj_f5_title": "५. रङहरू, परिमाणहरू र अवस्थाहरू",
    "top100_adj_f5_desc": "दैनिक जीवनमा देखिने र व्यावहारिक अवस्थाहरू: <em>rød (रातो), blå (नीलो), grøn (हरियो), hel (पूरै) / halv (आधा), mange (धेरै) / få (थोरै), ren (सफा) / beskidt (फोहोर), sund (स्वस्थ) / syg (बिरामी), klar (तयार/स्पष्ट), sikker (सुरक्षित/निश्चित), rigtig (सही)...</em>",
    "top100_adj_f5_btn": "क्षेत्र ५ मा जानुहोस् ➔",
    "top100_adj_f6_badge": "📏 क्षेत्र ६ • रूप परिवर्तन मास्टर (तुलना र e-नियम)",
    "top100_adj_f6_title": "६. ठूलो रूप परिवर्तन गाइड: तुलना र e-नियम",
    "top100_adj_f6_desc": "पूर्ण अन्तरक्रियात्मक रूप परिवर्तन इन्जिन: <strong>१. मूल रूप (Positive)</strong> (<em>stor</em>) ➔ <strong>२. तुलनात्मक (Comparative)</strong> \"end\" सँग (<em>større end</em>) ➔ <strong>३. उत्तम (Superlative)</strong> (<em>størst / den største</em>), साथै <em>den/min/denne/Peters</em> ले किन सधैं <strong>-e</strong> थप्न बाध्य बनाउँछ भन्ने सूत्र!",
    "top100_adj_f6_btn": "रूप परिवर्तन गाइड खोल्नुहोस् 📏 ➔",
    "top100_adj_ped_title": "💡 तपाईं विशेषणहरू कसरी सबैभन्दा राम्रोसँग सिक्न सक्नुहुन्छ?",
    "top100_adj_ped_item1_title": "⚖️ दृश्य विपरितार्थीहरू",
    "top100_adj_ped_item1_desc": "विशेषणहरूले सम्बन्धहरूको वर्णन गर्छन्। <em>varm ↔ kold</em> लाई सँगै सिकेर, दुवै शब्दहरू मस्तिष्कको अर्थपूर्ण सञ्जालमा आधा समयमै स्थापित हुन्छन्।",
    "top100_adj_ped_item2_title": "🧩 संगति र रूप परिवर्तन",
    "top100_adj_ped_item2_desc": "विशेषण कहिल्यै एक्लै हुँदैन – यो लिङ्ग र वचन अनुसार परिवर्तन हुन्छ: <em>en varm te</em> (साझा लिङ्ग), <em>et varmt bad</em> (नपुंसक लिङ्ग: -t), <em>de varme dage</em> (बहुवचन: -e)।",
    "top100_adj_ped_item3_title": "🌡️ मापन र तीव्रता",
    "top100_adj_ped_item3_desc": "ब्यारोमिटरमा शब्दहरूको तीव्रता पत्ता लगाउनुहोस्: <em>iskold</em> (बर्फिलो चिसो) ➔ <em>kold</em> (चिसो) ➔ <em>lun</em> (मनतातो) ➔ <em>varm</em> (तातो) ➔ <em>kogende</em> (उम्लिरहेको) सम्म।",
    "adj_tab_1": "१. विषमता अध्ययन",
    "adj_tab_2": "२. विपरितार्थी खोज्नुहोस् (प्रतिस्पर्धा)",
    "adj_tab_3": "३. पर्यायवाची र सूक्ष्म अर्थहरू",
    "adj_tab_4": "४. ब्यारोमिटर (मापन)",
    "adj_tab_5": "५. संगति (-t / -e)",
    "adj_tab_6": "६. सन्दर्भ र कथा",
    "adj_pure_label": "शुद्ध छवि हेर्नुहोस्:",
    "adj_listen_word": "लक्षित शब्द सुन्नुहोस्",
    "adj_listen_pronunciation": "उच्चारण सुन्नुहोस्",
    "adj_modpol_label": "विपरितार्थी:",
    "adj_faelles_label": "साझा लिङ्ग (en ...)",
    "adj_intet_label": "नपुंसक लिङ्ग (et ... / +t)",
    "adj_flertal_label": "निश्चित / बहुवचन (+e)",
    "adj_example_sentence": "सरल वाक्य:",
    "adj_status_on": "चालू",
    "adj_status_off": "बन्द",
    "adj_click_hotspot_hint": "उच्चारण सुन्न र विपरित कोठामा यसको विपरितार्थी हेर्न एक बिन्दुमा क्लिक गर्नुहोस्!"
  },
  "ps": {
    "adj_baro_counter": "بارومیټر {current} له {total} څخه",
    "adj_baro_step": "[ ګام {n} ]",
    "adj_baro_remove_tooltip": "د دې کلمې د لرې کولو لپاره کلیک وکړئ",
    "adj_baro_reset_btn": "کچه له سره تنظیم کړئ 🔄",
    "adj_baro_check_btn": "ترتیب وګورئ ✔️",
    "adj_baro_next_btn": "بله کچه ➔",
    "adj_baro_master_btn": "تاسو په بارومیټر کې بشپړ مهارت ترلاسه کړ! 🏆",
    "adj_baro_success": "🎉 په پوره ډول ترتیب شو! تاسو کلمې په سمه توګه ځای پر ځای کړې:",
    "adj_baro_wrong": "لا پوره سم نه دی. ځینې کلمې په سم ترتیب کې نه دي.",
    "adj_baro_hint": "لارښوونه: لومړی د تر ټولو نرم حالت او په پای کې د تر ټولو سخت حالت په اړه فکر وکړئ!",
    "adj_kongruens_subprompt": "د صفت سم شکل وټاکئ:",
    "adj_grammar_banner_title": "ایا غواړئ د صفتونو د گردان ټول قواعد په بشپړه توګه زده کړئ؟",
    "adj_grammar_banner_desc": "د اصلي بڼې، بې طرفه (-t)، مشخص شکل او جمع (-e)، او د درجو مقایسې په اړه زده کړه وکړئ.",
    "adj_grammar_banner_btn": "د گردان لارښود ته لاړ شئ ➔",
    "adj_story_subprompt": "په دې حالت کې کومه کلمه تر ټولو غوره برابره ده؟",
    "adj_duel_counter": "⚔️ مقابله {current} له {total} څخه",
    "adj_nuance_counter": "🔄 باریکي {current} له {total} څخه",
    "adj_kongruens_counter": "🧩 مطابقت {current} له {total} څخه",
    "adj_situation_counter": "📖 حالت {current} له {total} څخه",
    "adj_score_label": "نمرې:",
    "adj_next_duel": "بله مقابله ➔",
    "adj_next_nuance": "بله باریکي ➔",
    "adj_next_kongruens": "بل تمرین ➔",
    "adj_next_situation": "بل حالت ➔",
    "adj_result_duel_btn": "پایله وګورئ ({score}/{total}) 🏆",
    "adj_result_syn_btn": "مترادفات پای ته ورسوئ ({score}/{total}) 🌟",
    "adj_result_kong_btn": "د گردان پایله وګورئ ({score}/{total}) 🏆",
    "adj_result_story_btn": "پایله وګورئ ({score}/{total}) 🌟",
    "adj_retry_btn": "بیا هڅه وکړئ 🔄",
    "adj_correct_feedback": "🎉 سم دی!",
    "adj_wrong_feedback": "پوره سم نه دی:",
    "adj_correct_answer_is": "سم ځواب دا دی:",
    "adj_duel_modal_title": "د متضادو کلمو په مقابله کې ډېر ښه وځلېدئ!",
    "adj_duel_modal_score": "تاسو له <strong>{total}</strong> متضادو څخه <strong>{score}</strong> سم ترلاسه کړل.",
    "adj_syn_modal_title": "عالي لغت پوهه!",
    "adj_syn_modal_score": "تاسو له <strong>{total}</strong> باریکیو څخه <strong>{score}</strong> سمې ترلاسه کړې.",
    "adj_kong_modal_title": "د صفتونو په بڼو کې مو ښه کار وکړ!",
    "adj_kong_modal_score": "تاسو له <strong>{total}</strong> پایلو څخه <strong>{score}</strong> سمې پایلې ترلاسه کړې.",
    "adj_story_modal_title": "د لوستلو عالي درک!",
    "adj_story_modal_score": "تاسو له <strong>{total}</strong> ځوابونو څخه <strong>{score}</strong> سم ځوابونه ترلاسه کړل.",
    "adj_f1_stage_warm": "☀️ تود کور (۱۰ ځانګړنې)",
    "adj_f1_stage_cool": "❄️ کلک ورکشاپ (۱۰ متضادونه)",
    "adj_f2_stage_title": "⏱️ سټېشن او سرعت (۲۰ د وخت صفتونه)",
    "adj_f3_stage_left": "💎 ارزښت او کمال",
    "adj_f3_stage_right": "⚙️ ستونزه او پېچلتیا",
    "adj_f4_stage_left": "❤️ ټولنیز ژوند او خوښي",
    "adj_f4_stage_right": "🌧️ ستونزې او ناراحتي",
    "adj_f5_stage_left": "🌿 پاکي، روغتیا او توازن",
    "adj_f5_stage_right": "🌑 بې نظمي، ناروغي او تیاره",
    "adj_baro_f1_s1_title": "🌡️ ۱ کچه: د تودوخې درجه",
    "adj_baro_f1_s1_desc": "کلمې د تودوخې له مخې له تر ټولو یخې څخه تر تر ټولو تودې پورې ترتیب کړئ:",
    "adj_baro_f1_s1_low": "🥶 تر ټولو یخ",
    "adj_baro_f1_s1_high": "🔥 تر ټولو تود",
    "adj_baro_f1_s2_title": "📐 ۲ کچه: اندازه",
    "adj_baro_f1_s2_desc": "کلمې د اندازې له مخې له تر ټولو وړې څخه تر تر ټولو لویې پورې ترتیب کړئ:",
    "adj_baro_f1_s2_low": "🔬 تر ټولو کوچنی",
    "adj_baro_f1_s2_high": "🐘 تر ټولو لوی",
    "adj_baro_f1_s3_title": "⚖️ ۳ کچه: وزن",
    "adj_baro_f1_s3_desc": "کلمې له تر ټولو سپکې څخه تر تر ټولو درنې پورې ترتیب کړئ:",
    "adj_baro_f1_s3_low": "🪶 تر ټولو سپک",
    "adj_baro_f1_s3_high": "🪨 تر ټولو دروند",
    "adj_baro_f1_s4_title": "🛋️ ۴ کچه: کلکوالی او جوړښت",
    "adj_baro_f1_s4_desc": "کلمې له تر ټولو نرمې څخه تر تر ټولو کلکې پورې ترتیب کړئ:",
    "adj_baro_f1_s4_low": "☁️ تر ټولو نرم",
    "adj_baro_f1_s4_high": "💎 تر ټولو کلک",
    "adj_baro_f1_s5_title": "🫙 ۵ کچه: ظرفیت / ډکوالی",
    "adj_baro_f1_s5_desc": "کلمې له خالي څخه تر ډک پورې ترتیب کړئ:",
    "adj_baro_f1_s5_low": "🫙 پوره خالي",
    "adj_baro_f1_s5_high": "📦 پوره ډک",
    "adj_baro_f1_s6_title": "📏 ۶ کچه: اوږدوالی او موده",
    "adj_baro_f1_s6_desc": "کلمې له تر ټولو لنډې څخه تر تر ټولو اوږدې پورې ترتیب کړئ:",
    "adj_baro_f1_s6_low": "⚡ تر ټولو لنډ",
    "adj_baro_f1_s6_high": "♾️ تر ټولو اوږد",
    "adj_baro_f2_s1_title": "🏃 ۱ کچه: سرعت او تګلاره",
    "adj_baro_f2_s1_desc": "کلمې د سرعت له مخې له تر ټولو ورو څخه تر تر ټولو چټک پورې ترتیب کړئ:",
    "adj_baro_f2_s1_low": "🐢 تر ټولو ورو",
    "adj_baro_f2_s1_high": "⚡ تر ټولو چټک",
    "adj_baro_f2_s2_title": "🎂 ۲ کچه: عمر",
    "adj_baro_f2_s2_desc": "کلمې له تر ټولو کشر څخه تر تر ټولو مشر پورې ترتیب کړئ:",
    "adj_baro_f2_s2_low": "👶 تر ټولو کشر",
    "adj_baro_f2_s2_high": "👴 تر ټولو مشر",
    "adj_baro_f2_s3_title": "⏳ ۳ کچه: موده",
    "adj_baro_f2_s3_desc": "پېښې د مودې له مخې له تر ټولو لنډې څخه تر تر ټولو اوږدې پورې ترتیب کړئ:",
    "adj_baro_f2_s3_low": "⚡ څو ثانیې",
    "adj_baro_f2_s3_high": "♾️ ډېر اوږد وخت",
    "adj_baro_f2_s4_title": "🔄 ۴ کچه: تکرار",
    "adj_baro_f2_s4_desc": "کلمې د دې له مخې ترتیب کړئ چې یو کار څو ځله پېښیږي:",
    "adj_baro_f2_s4_low": "🚫 نږدې هېڅکله نه",
    "adj_baro_f2_s4_high": "🔁 تل",
    "adj_baro_f2_s5_title": "🎯 ۵ کچه: وخت پېژندنه او دقت",
    "adj_baro_f2_s5_desc": "له تر ټولو زیات ځنډېدلي څخه تر بشپړ پر وخت پورې ترتیب کړئ:",
    "adj_baro_f2_s5_low": "⚠️ ډېر زیات ناوخته",
    "adj_baro_f2_s5_high": "🎯 پوره پر وخت",
    "adj_baro_f2_s6_title": "📅 ۶ کچه: مهالنی بهیر / اوسمهال والی",
    "adj_baro_f2_s6_desc": "د یوې پروسې پړاوونه له تېر څخه تر اوسني پورې ترتیب کړئ:",
    "adj_baro_f2_s6_low": "📜 تېر مهال",
    "adj_baro_f2_s6_high": "📍 همدا اوس",
    "adj_baro_f3_s1_title": "⭐ ۱ کچه: کیفیت",
    "adj_baro_f3_s1_desc": "ارزونې له تر ټولو بدې څخه تر تر ټولو ښې پورې ترتیب کړئ:",
    "adj_baro_f3_s1_low": "🗑️ تر ټولو بد",
    "adj_baro_f3_s1_high": "🏆 تر ټولو غوره",
    "adj_baro_f3_s2_title": "🧠 ۲ کچه: د سختۍ کچه",
    "adj_baro_f3_s2_desc": "دندې له تر ټولو اسانې څخه تر تر ټولو سختې پورې ترتیب کړئ:",
    "adj_baro_f3_s2_low": "👶 تر ټولو اسانه",
    "adj_baro_f3_s2_high": "🧩 تر ټولو سخت",
    "adj_baro_f3_s3_title": "💰 ۳ کچه: د بیې کچه",
    "adj_baro_f3_s3_desc": "د بیې له مخې له وړیا څخه تر خورا ګران پورې ترتیب کړئ:",
    "adj_baro_f3_s3_low": "🪙 0 kr.",
    "adj_baro_f3_s3_high": "💎 ډېره زیاته شتمني",
    "adj_baro_f3_s4_title": "📌 ۴ کچه: اهمیت او لومړیتوب",
    "adj_baro_f3_s4_desc": "معلومات له بشپړ بې ارزښته څخه تر خورا اړین پورې ترتیب کړئ:",
    "adj_baro_f3_s4_low": "💤 بې اهمیته",
    "adj_baro_f3_s4_high": "🚨 خورا اړین / لازمي",
    "adj_baro_f3_s5_title": "🔍 ۵ کچه: بشپړتیا",
    "adj_baro_f3_s5_desc": "د راپور کیفیت له بې ګټې څخه تر بشپړ پورې ترتیب کړئ:",
    "adj_baro_f3_s5_low": "❌ بې ګټې",
    "adj_baro_f3_s5_high": "💯 بشپړ",
    "adj_baro_f3_s6_title": "⚙️ ۶ کچه: پېچلتیا",
    "adj_baro_f3_s6_desc": "قواعد له تر ټولو ساده څخه تر تر ټولو پېچلي پورې ترتیب کړئ:",
    "adj_baro_f3_s6_low": "🔹 تر ټولو ساده",
    "adj_baro_f3_s6_high": "🌀 تر ټولو پېچلی",
    "adj_baro_f4_s1_title": "😊 ۱ کچه: خوښي او مزاج",
    "adj_baro_f4_s1_desc": "احساسات له تر ټولو خفه څخه تر تر ټولو خوشحاله پورې ترتیب کړئ:",
    "adj_baro_f4_s1_low": "😢 زړه ماتی",
    "adj_baro_f4_s1_high": "🎉 خورا خوشحاله",
    "adj_baro_f4_s2_title": "⚡ ۲ کچه: انرژي او ځواک",
    "adj_baro_f4_s2_desc": "د انرژۍ کچه له پوره ستړي څخه تر له انرژۍ ډک پورې ترتیب کړئ:",
    "adj_baro_f4_s2_low": "🪫 ډېر ستړی",
    "adj_baro_f4_s2_high": "🔋 له انرژۍ ډک",
    "adj_baro_f4_s3_title": "🧘 ۳ کچه: ارامتیا د اضطراب په وړاندې",
    "adj_baro_f4_s3_desc": "له تر ټولو ارام څخه تر تر ټولو زیات وېرېدلي/وارخطا پورې ترتیب کړئ:",
    "adj_baro_f4_s3_low": "🕊️ پوره ارام",
    "adj_baro_f4_s3_high": "😱 سخت وارخطا",
    "adj_baro_f4_s4_title": "🧸 ۴ کچه: خوندیتوب او وېره",
    "adj_baro_f4_s4_desc": "له بشپړ خوندي څخه تر سخت وېرېدلي پورې ترتیب کړئ:",
    "adj_baro_f4_s4_low": "🛡️ پوره خوندي",
    "adj_baro_f4_s4_high": "😨 سخت ډارېدلی",
    "adj_baro_f4_s5_title": "💖 ۵ کچه: مهرباني او ښه چلند",
    "adj_baro_f4_s5_desc": "چلند له تر ټولو ناخوښ څخه تر تر ټولو زړه سواندي پورې ترتیب کړئ:",
    "adj_baro_f4_s5_low": "🧊 ناخوښ / سوړ",
    "adj_baro_f4_s5_high": "☀️ زړه سواندی / مهربان",
    "adj_baro_f4_s6_title": "👍 ۶ کچه: رضایت",
    "adj_baro_f4_s6_desc": "د پیرودونکي غبرګون له خورا قهرجن څخه تر ډېر هڅاند پورې ترتیب کړئ:",
    "adj_baro_f4_s6_low": "😡 غوسه ناک",
    "adj_baro_f4_s6_high": "🤩 ډېر خوښ او هڅاند",
    "adj_baro_f5_s1_title": "🧽 ۱ کچه: پاکوالی",
    "adj_baro_f5_s1_desc": "له تر ټولو خاورین/ناپاک څخه تر پوره پاک او ځلېدونکي پورې ترتیب کړئ:",
    "adj_baro_f5_s1_low": "👞 ناپاک / ناولي",
    "adj_baro_f5_s1_high": "✨ ځلېدونکی پاک",
    "adj_baro_f5_s2_title": "🍎 ۲ کچه: روغتیا او فټنس",
    "adj_baro_f5_s2_desc": "له سخت ناروغ څخه تر بشپړ روغ رمټ پورې ترتیب کړئ:",
    "adj_baro_f5_s2_low": "🤒 سخت ناروغ",
    "adj_baro_f5_s2_high": "💪 پوره روغ او ځواکمن",
    "adj_baro_f5_s3_title": "💧 ۳ کچه: لندبل",
    "adj_baro_f5_s3_desc": "له پوره وچ څخه تر پوره لوند پورې ترتیب کړئ:",
    "adj_baro_f5_s3_low": "🏜️ پوره وچ",
    "adj_baro_f5_s3_high": "🌊 پوره لوند",
    "adj_baro_f5_s4_title": "💡 ۴ کچه: د رڼا کچه",
    "adj_baro_f5_s4_desc": "له تپې تیارې څخه تر ړندونکې رڼا پورې ترتیب کړئ:",
    "adj_baro_f5_s4_low": "🌑 تپه تیاره",
    "adj_baro_f5_s4_high": "☀️ ړندونکې رڼا",
    "adj_baro_f5_s5_title": "📊 ۵ کچه: مقدار",
    "adj_baro_f5_s5_desc": "مقدارونه له هېڅ څخه تر بې شمېره پورې ترتیب کړئ:",
    "adj_baro_f5_s5_low": "0️⃣ هېڅ نشته",
    "adj_baro_f5_s5_high": "♾️ بې شمېره",
    "adj_baro_f5_s6_title": "🧭 ۶ کچه: ډاډ او باور",
    "adj_baro_f5_s6_desc": "له بشپړ ناڅرګند څخه تر پوره ښکاره او باوري پورې ترتیب کړئ:",
    "adj_baro_f5_s6_low": "❓ شکمن",
    "adj_baro_f5_s6_high": "✔️ پوره روښانه",
    "top100_adj_hub_title": "۱۰۰ تر ټولو عام صفتونه",
    "top100_adj_hub_desc": "صفتونه نړۍ بیانوي، باریکۍ ورزیاتوي او توپیرونه څرګندوي. په ۵ معنوي برخو ویشل شوي ۱۰۰ تر ټولو عام ډنمارکي صفتونه وپلټئ – او په ۶مه برخه کې د گردان بشپړ لارښود زده کړئ!",
    "top100_adj_f1_badge": "🔬 ۱ برخه: ۲۰ د اندازه کولو وړ متضادونه",
    "top100_adj_f1_title": "۱. فزیکي ځانګړنې، بڼه او حواس",
    "top100_adj_f1_desc": "په ورځني ژوند کې د اندازه کولو، لمس کولو یا احساس کولو وړ ټول شیان رانغاړي: <em>stor (لوی) / lille (کوچنی), lang (اوږد) / kort (لنډ), høj (لوړ) / lav (ټیټ), bred (پلن) / smal (تنګ), tung (دروند) / let (سپک), varm (تود) / kold (سوړ), hård (سخت) / blød (نرم), fast (کلک) / løs (سست), fuld (ډک) / tom (تش), åben (خلاص) / lukket (بند)</em>.",
    "top100_adj_f1_btn": "۱ برخې ته لاړ شئ ➔",
    "top100_adj_f2_badge": "⏱️ ۲ برخه: ۲۰ د وخت صفتونه",
    "top100_adj_f2_title": "۲. وخت، عمر او سرعت",
    "top100_adj_f2_desc": "په ورځني ژوند کې مهال ویش، بدلون او سرعت: <em>ny (نوی) / gammel (زوړ), ung (ځوان) / gammel (بوډا), tidlig (وختي) / sen (ناوخته), hurtig (چټک) / langsom (ورو), pludselig (ناڅاپي), forsinket (ځنډېدلی), travl (بوخت), rolig (ارام)...</em>",
    "top100_adj_f2_btn": "۲ برخې ته لاړ شئ ➔",
    "top100_adj_f3_badge": "💎 ۳ برخه: ۲۰ د ارزونې صفتونه",
    "top100_adj_f3_title": "۳. کیفیت، د سختۍ کچه او اقتصاد",
    "top100_adj_f3_desc": "ارزونه، نرخونه، هڅه او ارزښت: <em>god (ښه) / dårlig (بد), svær (سخت) / let (اسانه), dyr (ګران) / billig (ارزانه), vigtig (مهم) / ligegyldig (بې اهمیته), nødvendig (اړین), gratis (وړیا), perfekt (کامل), forkert (غلط)...</em>",
    "top100_adj_f3_btn": "۳ برخې ته لاړ شئ ➔",
    "top100_adj_f4_badge": "❤️ ۴ برخه: ۲۰ ټولنیز صفتونه",
    "top100_adj_f4_title": "۴. احساسات، شخصیت او اړیکې",
    "top100_adj_f4_desc": "د انسانانو ذهني حالت او ټولنیزې اړیکې: <em>glad (خوشحاله) / ked af det (خفه), venlig (مهربان) / uvenlig (نامهربان), træt (ستړی) / frisk (تازه), tryg (ډاډمن) / bange (وېرېدلی), sur (ترش مخی), sød (ښایسته), stolt (ویاړلی), rolig (ارام)...</em>",
    "top100_adj_f4_btn": "۴ برخې ته لاړ شئ ➔",
    "top100_adj_f5_badge": "🎨 ۵ برخه: ۲۰ د حالت صفتونه",
    "top100_adj_f5_title": "۵. رنګونه، اندازې او حالتونه",
    "top100_adj_f5_desc": "په ورځني ژوند کې بصري او عملي حالتونه: <em>rød (سور), blå (آبي), grøn (شین), hel (ټول) / halv (نیم), mange (ډېر) / få (لږ), ren (پاک) / beskidt (خیرن), sund (روغ) / syg (ناروغ), klar (تیار/روښانه), sikker (خوندي/باوري), rigtig (سم)...</em>",
    "top100_adj_f5_btn": "۵ برخې ته لاړ شئ ➔",
    "top100_adj_f6_badge": "📏 ۶ برخه • د گردان ماسټر (پرتله کول او د e قاعده)",
    "top100_adj_f6_title": "۶. د گردان لوی لارښود: پرتله کول او د e قاعده",
    "top100_adj_f6_desc": "د گردان بشپړ متقابل سیسټم: <strong>۱. مثبت (Positive)</strong> (<em>stor</em>) ➔ <strong>۲. مقایسوي (Comparative)</strong> له \"end\" سره (<em>større end</em>) ➔ <strong>۳. عالي (Superlative)</strong> (<em>størst / den største</em>), او دا فورمول چې ولې <em>den/min/denne/Peters</em> تل <strong>-e</strong> اخلي!",
    "top100_adj_f6_btn": "د گردان لارښود خلاص کړئ 📏 ➔",
    "top100_adj_ped_title": "💡 تاسو څنګه صفتونه په غوره توګه زده کولی شئ؟",
    "top100_adj_ped_item1_title": "⚖️ لیدونکي متضادونه",
    "top100_adj_ped_item1_desc": "صفتونه اړیکې بیانوي. د <em>varm ↔ kold</em> په یوځای زده کولو سره، دواړه کلمې په نیم وخت کې د مغز په معنوي شبکه کې ځای پر ځای کیږي.",
    "top100_adj_ped_item2_title": "🧩 مطابقت او گردان",
    "top100_adj_ped_item2_desc": "یو صفت هیڅکله یوازې نه راځي – دا د جنس او عدد له مخې بڼه بدلوي: <em>en varm te</em> (عام جنس), <em>et varmt bad</em> (بې طرفه جنس: -t), <em>de varme dage</em> (جمع: -e).",
    "top100_adj_ped_item3_title": "🌡️ کچه او شدت",
    "top100_adj_ped_item3_desc": "په یو بیرومیټر کې د کلمو شدت ومومئ: له <em>iskold</em> (کنګل) ➔ <em>kold</em> (سوړ) ➔ <em>lun</em> (نیم تود) ➔ <em>varm</em> (تود) ➔ <em>kogende</em> (خوټېدونکی) پورې.",
    "adj_tab_1": "۱. د توپیر مطالعه",
    "adj_tab_2": "۲. متضاد ومومئ (مقابله)",
    "adj_tab_3": "۳. مترادفات او باریکۍ",
    "adj_tab_4": "۴. بیرومیټر (کچه)",
    "adj_tab_5": "۵. مطابقت (-t / -e)",
    "adj_tab_6": "۶. سیاق او کیسه",
    "adj_pure_label": "خالص انځور وګورئ:",
    "adj_listen_word": "هدف کلمه واورئ",
    "adj_listen_pronunciation": "تلفظ واورئ",
    "adj_modpol_label": "متضاد:",
    "adj_faelles_label": "عام جنس (en ...)",
    "adj_intet_label": "بې طرفه جنس (et ... / +t)",
    "adj_flertal_label": "معرفه / جمع (+e)",
    "adj_example_sentence": "ساده جمله:",
    "adj_status_on": "روښانه",
    "adj_status_off": "بند",
    "adj_click_hotspot_hint": "په یوه نقطه کلیک وکړئ ترڅو تلفظ واورئ او په مقابل خونه کې د هغې متضاد وګورئ!"
  }
};

export const adjektiverWordTranslations = {
  "stor": {
    "baseWord": "stor",
    "field": 1,
    "da": {
      "meaning": "stor",
      "sentence": "Manden bærer en stor taske."
    },
    "en": {
      "meaning": "big / large",
      "sentence": "The man is carrying a big bag."
    },
    "de": {
      "meaning": "groß",
      "sentence": "Der Mann trägt eine große Tasche."
    },
    "es": {
      "meaning": "grande",
      "sentence": "El hombre lleva una bolsa grande."
    },
    "pt": {
      "meaning": "grande",
      "sentence": "O homem carrega uma bolsa grande."
    },
    "tr": {
      "meaning": "büyük",
      "sentence": "Adam büyük bir çanta taşıyor."
    },
    "ar": {
      "meaning": "كبير",
      "sentence": "يحمل الرجل حقيبة كبيرة."
    },
    "fa": {
      "meaning": "بزرگ",
      "sentence": "مرد یک کیف بزرگ را حمل می‌کند."
    },
    "ku": {
      "meaning": "mezin",
      "sentence": "Zilam çenteyekî mezin hildigire."
    },
    "ur": {
      "meaning": "بڑا",
      "sentence": "آدمی ایک بڑا بیگ اٹھا رہا ہے۔"
    },
    "ru": {
      "meaning": "большой",
      "sentence": "Мужчина несёт большую сумку."
    },
    "uk": {
      "meaning": "великий",
      "sentence": "Чоловік несе велику сумку."
    },
    "zh": {
      "meaning": "大的",
      "sentence": "那个男人提着一个大包。"
    },
    "vi": {
      "meaning": "to, lớn",
      "sentence": "Người đàn ông xách một chiếc túi to."
    },
    "th": {
      "meaning": "ใหญ่",
      "sentence": "ผู้ชายกำลังถือกระเป๋าใบใหญ่"
    },
    "ne": {
      "meaning": "ठूलो",
      "sentence": "मानिसले ठूलो झोला बोकिरहेको छ।"
    },
    "ps": {
      "meaning": "لوی",
      "sentence": "سړی یو لوی بکس وړي."
    }
  },
  "lille": {
    "baseWord": "lille",
    "field": 1,
    "da": {
      "meaning": "lille",
      "sentence": "Pigen har en lille taske."
    },
    "en": {
      "meaning": "small / little",
      "sentence": "The girl has a small bag."
    },
    "de": {
      "meaning": "klein",
      "sentence": "Das Mädchen hat eine kleine Tasche."
    },
    "es": {
      "meaning": "pequeño",
      "sentence": "La niña tiene una bolsa pequeña."
    },
    "pt": {
      "meaning": "pequeno",
      "sentence": "A menina tem uma bolsa pequena."
    },
    "tr": {
      "meaning": "küçük",
      "sentence": "Kızın küçük bir çantası var."
    },
    "ar": {
      "meaning": "صغير",
      "sentence": "الفتاة لديها حقيبة صغيرة."
    },
    "fa": {
      "meaning": "کوچک",
      "sentence": "دختر یک کیف کوچک دارد."
    },
    "ku": {
      "meaning": "piçûk",
      "sentence": "Keçikê çenteyekî piçûk heye."
    },
    "ur": {
      "meaning": "چھوٹا",
      "sentence": "لڑکی کے پاس ایک چھوٹا بیگ ہے۔"
    },
    "ru": {
      "meaning": "маленький",
      "sentence": "У девочки маленькая сумка."
    },
    "uk": {
      "meaning": "маленький",
      "sentence": "У дівчинки маленька сумка."
    },
    "zh": {
      "meaning": "小的",
      "sentence": "小女孩有一个小包。"
    },
    "vi": {
      "meaning": "nhỏ, bé",
      "sentence": "Cô bé có một chiếc túi nhỏ."
    },
    "th": {
      "meaning": "เล็ก",
      "sentence": "เด็กผู้หญิงมีกระเป๋าใบเล็ก"
    },
    "ne": {
      "meaning": "सानो",
      "sentence": "केटीसँग सानो झोला छ।"
    },
    "ps": {
      "meaning": "کوچنی",
      "sentence": "نجلۍ یوه کوچنۍ کڅوړه لري."
    }
  },
  "lang": {
    "baseWord": "lang",
    "field": 1,
    "da": {
      "meaning": "lang",
      "sentence": "Det er en lang vej til skolen."
    },
    "en": {
      "meaning": "long",
      "sentence": "It is a long way to school."
    },
    "de": {
      "meaning": "lang",
      "sentence": "Es ist ein weiter Weg zur Schule."
    },
    "es": {
      "meaning": "largo",
      "sentence": "Es un camino largo hasta la escuela."
    },
    "pt": {
      "meaning": "longo",
      "sentence": "É um longo caminho até a escola."
    },
    "tr": {
      "meaning": "uzun",
      "sentence": "Okula giden yol çok uzun."
    },
    "ar": {
      "meaning": "طويل",
      "sentence": "إنها طريق طويلة إلى المدرسة."
    },
    "fa": {
      "meaning": "طولانی",
      "sentence": "مسیر تا مدرسه طولانی است."
    },
    "ku": {
      "meaning": "dirêj",
      "sentence": "Rêya heta dibistanê dirêj e."
    },
    "ur": {
      "meaning": "لمبا",
      "sentence": "سکول کا راستہ کافی لمبا ہے۔"
    },
    "ru": {
      "meaning": "длинный / долгий",
      "sentence": "Это длинная дорога до школы."
    },
    "uk": {
      "meaning": "довгий",
      "sentence": "Це довга дорога до школи."
    },
    "zh": {
      "meaning": "长的 / 遥远的",
      "sentence": "去学校是一段很长的路。"
    },
    "vi": {
      "meaning": "dài",
      "sentence": "Đường đến trường là một quãng đường dài."
    },
    "th": {
      "meaning": "ยาว / ไกล",
      "sentence": "มันเป็นระยะทางที่ยาวไกลไปโรงเรียน"
    },
    "ne": {
      "meaning": "लामो",
      "sentence": "विद्यालय जाने बाटो लामो छ।"
    },
    "ps": {
      "meaning": "اوږد",
      "sentence": "ښوونځي ته یوه اوږده لاره ده."
    }
  },
  "kort": {
    "baseWord": "kort",
    "field": 1,
    "da": {
      "meaning": "kort",
      "sentence": "De holder en kort pause på arbejdet."
    },
    "en": {
      "meaning": "short",
      "sentence": "They take a short break at work."
    },
    "de": {
      "meaning": "kurz",
      "sentence": "Sie machen eine kurze Pause bei der Arbeit."
    },
    "es": {
      "meaning": "corto / breve",
      "sentence": "Ellos hacen una pausa corta en el trabajo."
    },
    "pt": {
      "meaning": "curto / breve",
      "sentence": "Eles fazem uma pausa curta no trabalho."
    },
    "tr": {
      "meaning": "kısa",
      "sentence": "İşte kısa bir mola veriyorlar."
    },
    "ar": {
      "meaning": "قصير",
      "sentence": "يأخذون استراحة قصيرة في العمل."
    },
    "fa": {
      "meaning": "کوتاه",
      "sentence": "آن‌ها در محل کار یک استراحت کوتاه می‌کنند."
    },
    "ku": {
      "meaning": "kurt",
      "sentence": "Ew li ser kar bêhnvedaneke kurt didin."
    },
    "ur": {
      "meaning": "مختصر",
      "sentence": "وہ کام کے دوران ایک مختصر وقفہ لیتے ہیں۔"
    },
    "ru": {
      "meaning": "короткий",
      "sentence": "Они делают короткий перерыв на работе."
    },
    "uk": {
      "meaning": "короткий",
      "sentence": "Вони роблять коротку перерву на роботі."
    },
    "zh": {
      "meaning": "短的",
      "sentence": "他们在工作中短暂休息了一下。"
    },
    "vi": {
      "meaning": "ngắn",
      "sentence": "Họ nghỉ giải lao một lát tại nơi làm việc."
    },
    "th": {
      "meaning": "สั้น",
      "sentence": "พวกเขาพักช่วงสั้นๆ ในที่ทำงาน"
    },
    "ne": {
      "meaning": "छोटो",
      "sentence": "उनीहरू काममा छोटो विश्राम लिन्छन्।"
    },
    "ps": {
      "meaning": "لنډ",
      "sentence": "دوی په کار کې یوه لنډه وقفه کوي."
    }
  },
  "høj": {
    "baseWord": "høj",
    "field": 1,
    "da": {
      "meaning": "høj",
      "sentence": "Læreren i klassen er en høj mand."
    },
    "en": {
      "meaning": "tall / high",
      "sentence": "The teacher in the class is a tall man."
    },
    "de": {
      "meaning": "groß (Körpergröße) / hoch",
      "sentence": "Der Lehrer in der Klasse ist ein großer Mann."
    },
    "es": {
      "meaning": "alto",
      "sentence": "El profesor de la clase es un hombre alto."
    },
    "pt": {
      "meaning": "alto",
      "sentence": "O professor da turma é um homem alto."
    },
    "tr": {
      "meaning": "uzun / yüksek",
      "sentence": "Sınıftaki öğretmen uzun boylu bir adam."
    },
    "ar": {
      "meaning": "طويل القامة",
      "sentence": "المعلم في الفصل رجل طويل القامة."
    },
    "fa": {
      "meaning": "قدبلند",
      "sentence": "معلم کلاس مردی قدبلند است."
    },
    "ku": {
      "meaning": "bilind / bejndirêj",
      "sentence": "Mamosteyê di polê de zilamekî bejndirêj e."
    },
    "ur": {
      "meaning": "لمبا / دراز قد",
      "sentence": "کلاس میں استاد ایک لمبے قد کے آدمی ہیں۔"
    },
    "ru": {
      "meaning": "высокий",
      "sentence": "Учитель в классе — высокий мужчина."
    },
    "uk": {
      "meaning": "високий",
      "sentence": "Учитель у класі — високий чоловік."
    },
    "zh": {
      "meaning": "高的",
      "sentence": "班上的老师是一位高个子男士。"
    },
    "vi": {
      "meaning": "cao",
      "sentence": "Thầy giáo trong lớp là một người đàn ông cao lớn."
    },
    "th": {
      "meaning": "สูง",
      "sentence": "ครูในห้องเรียนเป็นผู้ชายตัวสูง"
    },
    "ne": {
      "meaning": "अग्लो",
      "sentence": "कक्षाका शिक्षक एक अग्लो मानिस हुन्।"
    },
    "ps": {
      "meaning": "لوړ / دنګ",
      "sentence": "په ټولګي کې ښوونکی یو دنګ سړی دی."
    }
  },
  "lav": {
    "baseWord": "lav",
    "field": 1,
    "da": {
      "meaning": "lav",
      "sentence": "Barnet sidder på en lav stol."
    },
    "en": {
      "meaning": "low / short",
      "sentence": "The child is sitting on a low chair."
    },
    "de": {
      "meaning": "niedrig / klein",
      "sentence": "Das Kind sitzt auf einem niedrigen Stuhl."
    },
    "es": {
      "meaning": "bajo",
      "sentence": "El niño está sentado en una silla baja."
    },
    "pt": {
      "meaning": "baixo",
      "sentence": "A criança está sentada em uma cadeira baixa."
    },
    "tr": {
      "meaning": "alçak / kısa",
      "sentence": "Çocuk alçak bir sandalyede oturuyor."
    },
    "ar": {
      "meaning": "منخفض",
      "sentence": "يجلس الطفل على كرسي منخفض."
    },
    "fa": {
      "meaning": "کوتاه / کم‌ارتفاع",
      "sentence": "کودک روی یک صندلی کوتاه نشسته است."
    },
    "ku": {
      "meaning": "nizm",
      "sentence": "Zarok li ser kursiyekî nizm rûniştiye."
    },
    "ur": {
      "meaning": "نیچا",
      "sentence": "بچہ ایک نیچی کرسی پر بیٹھا ہے۔"
    },
    "ru": {
      "meaning": "низкий",
      "sentence": "Ребёнок сидит на низком стуле."
    },
    "uk": {
      "meaning": "низький",
      "sentence": "Дитина сидить на низькому стільці."
    },
    "zh": {
      "meaning": "矮的 / 低的",
      "sentence": "孩子坐在一个矮椅子上。"
    },
    "vi": {
      "meaning": "thấp",
      "sentence": "Đứa trẻ ngồi trên một chiếc ghế thấp."
    },
    "th": {
      "meaning": "เตี้ย / ต่ำ",
      "sentence": "เด็กนั่งอยู่บนเก้าอี้เตี้ย"
    },
    "ne": {
      "meaning": "होचो",
      "sentence": "बच्चा होचो कुर्सीमा बसिरहेको छ।"
    },
    "ps": {
      "meaning": "ټيټ",
      "sentence": "ماشوم په یوه ټيټه څوکۍ ناست دی."
    }
  },
  "bred": {
    "baseWord": "bred",
    "field": 1,
    "da": {
      "meaning": "bred",
      "sentence": "Bilen kører på en bred vej."
    },
    "en": {
      "meaning": "wide / broad",
      "sentence": "The car drives on a wide street."
    },
    "de": {
      "meaning": "breit",
      "sentence": "Das Auto fährt auf einer breiten Straße."
    },
    "es": {
      "meaning": "ancho",
      "sentence": "El coche circula por una calle ancha."
    },
    "pt": {
      "meaning": "largo",
      "sentence": "O carro anda por uma rua larga."
    },
    "tr": {
      "meaning": "geniş",
      "sentence": "Araba geniş bir yolda gidiyor."
    },
    "ar": {
      "meaning": "عريض / واسع",
      "sentence": "تسير السيارة في شارع عريض."
    },
    "fa": {
      "meaning": "پهن / عریض",
      "sentence": "ماشین در یک خیابان پهن حرکت می‌کند."
    },
    "ku": {
      "meaning": "fireh",
      "sentence": "Erebe li ser rêyeke fireh dimeşe."
    },
    "ur": {
      "meaning": "چوڑا",
      "sentence": "گاڑی ایک چوڑی سڑک پر چل رہی ہے۔"
    },
    "ru": {
      "meaning": "широкий",
      "sentence": "Машина едет по широкой дороге."
    },
    "uk": {
      "meaning": "широкий",
      "sentence": "Автомобіль їде широкою дорогою."
    },
    "zh": {
      "meaning": "宽的",
      "sentence": "汽车行驶在宽阔的道路上。"
    },
    "vi": {
      "meaning": "rộng",
      "sentence": "Chiếc xe ô tô chạy trên một con đường rộng."
    },
    "th": {
      "meaning": "กว้าง",
      "sentence": "รถยนต์วิ่งอยู่บนถนนที่กว้างขวาง"
    },
    "ne": {
      "meaning": "फराकिलो",
      "sentence": "गाडी फराकिलो सडकमा गुडिरहेको छ।"
    },
    "ps": {
      "meaning": "پراخه / پلن",
      "sentence": "موټر په یوه پراخه سړک روان دی."
    }
  },
  "smal": {
    "baseWord": "smal",
    "field": 1,
    "da": {
      "meaning": "smal",
      "sentence": "Det er en meget smal dør."
    },
    "en": {
      "meaning": "narrow",
      "sentence": "It is a very narrow door."
    },
    "de": {
      "meaning": "schmal / eng",
      "sentence": "Das ist eine sehr schmale Tür."
    },
    "es": {
      "meaning": "estrecho",
      "sentence": "Es una puerta muy estrecha."
    },
    "pt": {
      "meaning": "estreito",
      "sentence": "É uma porta muito estreita."
    },
    "tr": {
      "meaning": "dar",
      "sentence": "Bu çok dar bir kapı."
    },
    "ar": {
      "meaning": "ضيق",
      "sentence": "إنه باب ضيق جداً."
    },
    "fa": {
      "meaning": "باریک",
      "sentence": "این یک در بسیار باریک است."
    },
    "ku": {
      "meaning": "teng",
      "sentence": "Ew deriyekî pir teng e."
    },
    "ur": {
      "meaning": "تنگ",
      "sentence": "یہ بہت تنگ دروازہ ہے۔"
    },
    "ru": {
      "meaning": "узкий",
      "sentence": "Это очень узкая дверь."
    },
    "uk": {
      "meaning": "вузький",
      "sentence": "Це дуже вузькі двері."
    },
    "zh": {
      "meaning": "窄的",
      "sentence": "这是一扇非常窄的门。"
    },
    "vi": {
      "meaning": "hẹp",
      "sentence": "Đó là một cánh cửa rất hẹp."
    },
    "th": {
      "meaning": "แคบ",
      "sentence": "มันเป็นประตูที่แคบมาก"
    },
    "ne": {
      "meaning": "साँघुरो",
      "sentence": "यो धेरै साँघुरो ढोका हो।"
    },
    "ps": {
      "meaning": "تنګ",
      "sentence": "دا یوه ډېره تنګه دروازه ده."
    }
  },
  "tung": {
    "baseWord": "tung",
    "field": 1,
    "da": {
      "meaning": "tung",
      "sentence": "Tasken med bøger er meget tung."
    },
    "en": {
      "meaning": "heavy",
      "sentence": "The bag with books is very heavy."
    },
    "de": {
      "meaning": "schwer",
      "sentence": "Die Tasche mit Büchern ist sehr schwer."
    },
    "es": {
      "meaning": "pesado",
      "sentence": "La bolsa con libros es muy pesada."
    },
    "pt": {
      "meaning": "pesado",
      "sentence": "A bolsa com livros é muito pesada."
    },
    "tr": {
      "meaning": "ağır",
      "sentence": "Kitap dolu çanta çok ağır."
    },
    "ar": {
      "meaning": "ثقيل",
      "sentence": "حقيبة الكتب ثقيلة جداً."
    },
    "fa": {
      "meaning": "سنگین",
      "sentence": "کیف پر از کتاب بسیار سنگین است."
    },
    "ku": {
      "meaning": "giran",
      "sentence": "Çenteyê bi pirtûkan pir giran e."
    },
    "ur": {
      "meaning": "بھاری",
      "sentence": "کتابوں والا بیگ بہت بھاری ہے۔"
    },
    "ru": {
      "meaning": "тяжёлый",
      "sentence": "Сумка с книгами очень тяжёлая."
    },
    "uk": {
      "meaning": "важкий",
      "sentence": "Сумка з книгами дуже важка."
    },
    "zh": {
      "meaning": "重的",
      "sentence": "装满书的包非常重。"
    },
    "vi": {
      "meaning": "nặng",
      "sentence": "Chiếc túi đựng đầy sách rất nặng."
    },
    "th": {
      "meaning": "หนัก",
      "sentence": "กระเป๋าที่ใส่หนังสือหนักมาก"
    },
    "ne": {
      "meaning": "गह्रौँ",
      "sentence": "किताबहरू भएको झोला धेरै गह्रौँ छ।"
    },
    "ps": {
      "meaning": "دروند",
      "sentence": "د کتابونو کڅوړه ډېره درنه ده."
    }
  },
  "let": {
    "baseWord": "let",
    "field": 1,
    "da": {
      "meaning": "let",
      "sentence": "Posen med brød er let at bære."
    },
    "en": {
      "meaning": "light (weight)",
      "sentence": "The bag with bread is light to carry."
    },
    "de": {
      "meaning": "leicht (Gewicht)",
      "sentence": "Die Tüte mit Brot ist leicht zu tragen."
    },
    "es": {
      "meaning": "ligero / liviano",
      "sentence": "La bolsa con pan es ligera de llevar."
    },
    "pt": {
      "meaning": "leve",
      "sentence": "A sacola com pão é leve de carregar."
    },
    "tr": {
      "meaning": "hafif",
      "sentence": "Ekmek poşetini taşımak hafif."
    },
    "ar": {
      "meaning": "خفيف",
      "sentence": "كيس الخبز خفيف ويسهل حمله."
    },
    "fa": {
      "meaning": "سبک",
      "sentence": "کیسه نان برای حمل کردن سبک است."
    },
    "ku": {
      "meaning": "sivik",
      "sentence": "Kîsê nan ji bo hilgirtinê sivik e."
    },
    "ur": {
      "meaning": "ہلکا",
      "sentence": "روٹیوں کا تھیلا اٹھانے میں ہلکا ہے۔"
    },
    "ru": {
      "meaning": "лёгкий (по весу)",
      "sentence": "Пакет с хлебом легко нести."
    },
    "uk": {
      "meaning": "легкий (за вагою)",
      "sentence": "Пакет із хлібом легко нести."
    },
    "zh": {
      "meaning": "轻的 (重量)",
      "sentence": "装面包的袋子很轻，容易提。"
    },
    "vi": {
      "meaning": "nhẹ (khối lượng)",
      "sentence": "Túi đựng bánh mì rất nhẹ, dễ xách."
    },
    "th": {
      "meaning": "เบา",
      "sentence": "ถุงใส่ขนมปังเบาและถือได้ง่าย"
    },
    "ne": {
      "meaning": "हलुका",
      "sentence": "पाउरोटीको झोला बोक्न हलुका छ।"
    },
    "ps": {
      "meaning": "سپک",
      "sentence": "د ډوډۍ کڅوړه د وړلو لپاره سپکه ده."
    }
  },
  "varm": {
    "baseWord": "varm",
    "field": 1,
    "da": {
      "meaning": "varm",
      "sentence": "Kaffen i koppen er dejlig varm."
    },
    "en": {
      "meaning": "warm / hot",
      "sentence": "The tea in the cup is completely warm."
    },
    "de": {
      "meaning": "warm / heiß",
      "sentence": "Der Kaffee in der Tasse ist herrlich warm."
    },
    "es": {
      "meaning": "caliente / cálido",
      "sentence": "El café de la taza está deliciosamente caliente."
    },
    "pt": {
      "meaning": "quente",
      "sentence": "O café na xícara está agradavelmente quente."
    },
    "tr": {
      "meaning": "sıcak",
      "sentence": "Fincandaki kahve sıcacık ve çok güzel."
    },
    "ar": {
      "meaning": "ساخن / دافئ",
      "sentence": "القهوة في الفنجان ساخنة ولذيذة."
    },
    "fa": {
      "meaning": "گرم / داغ",
      "sentence": "قهوه در فنجان دلپذیر و گرم است."
    },
    "ku": {
      "meaning": "germ",
      "sentence": "Qehweya di fîncanê de xweş û germ e."
    },
    "ur": {
      "meaning": "گرم",
      "sentence": "کپ میں موجود کافی خوشگوار حد تک گرم ہے۔"
    },
    "ru": {
      "meaning": "горячий / тёплый",
      "sentence": "Кофе в чашке приятно горячий."
    },
    "uk": {
      "meaning": "гарячий / теплий",
      "sentence": "Кава в чашці приємно гаряча."
    },
    "zh": {
      "meaning": "热的 / 暖和的",
      "sentence": "杯子里的咖啡热乎乎的，非常舒服。"
    },
    "vi": {
      "meaning": "ấm, nóng",
      "sentence": "Cà phê trong tách còn nóng hổi thơm ngon."
    },
    "th": {
      "meaning": "อุ่น / ร้อน",
      "sentence": "กาแฟในแก้วอุ่นกำลังดี"
    },
    "ne": {
      "meaning": "तातो",
      "sentence": "कपको कफी मीठो तातो छ।"
    },
    "ps": {
      "meaning": "ګرم / تود",
      "sentence": "په پیاله کې قهوه ښه ګرمه ده."
    }
  },
  "kold": {
    "baseWord": "kold",
    "field": 1,
    "da": {
      "meaning": "kold",
      "sentence": "Vandet i glasset er koldt."
    },
    "en": {
      "meaning": "cold",
      "sentence": "The water in the bottle is cold."
    },
    "de": {
      "meaning": "kalt",
      "sentence": "Das Wasser im Glas ist kalt."
    },
    "es": {
      "meaning": "frío",
      "sentence": "El agua del vaso está fría."
    },
    "pt": {
      "meaning": "frio / gelado",
      "sentence": "A água no copo está fria."
    },
    "tr": {
      "meaning": "soğuk",
      "sentence": "Bardaktaki su soğuk."
    },
    "ar": {
      "meaning": "بارد",
      "sentence": "الماء في الكوب بارد."
    },
    "fa": {
      "meaning": "سرد",
      "sentence": "آب داخل لیوان سرد است."
    },
    "ku": {
      "meaning": "sar",
      "sentence": "Ava di qedehê de sar e."
    },
    "ur": {
      "meaning": "ٹھنڈا",
      "sentence": "گلاس میں پانی ٹھنڈا ہے۔"
    },
    "ru": {
      "meaning": "холодный",
      "sentence": "Вода в стакане холодная."
    },
    "uk": {
      "meaning": "холодний",
      "sentence": "Вода в склянці холодна."
    },
    "zh": {
      "meaning": "冷的 / 凉的",
      "sentence": "玻璃杯里的水是凉的。"
    },
    "vi": {
      "meaning": "lạnh",
      "sentence": "Nước trong cốc rất lạnh."
    },
    "th": {
      "meaning": "เย็น",
      "sentence": "น้ำในแก้วเย็น"
    },
    "ne": {
      "meaning": "चिसो",
      "sentence": "गिलासको पानी चिसो छ।"
    },
    "ps": {
      "meaning": "یخ / سړو",
      "sentence": "په ګیلاس کې اوبه یخې دي."
    }
  },
  "hård": {
    "baseWord": "hård",
    "field": 1,
    "da": {
      "meaning": "hård",
      "sentence": "Stolen af træ er hård at sidde på."
    },
    "en": {
      "meaning": "hard",
      "sentence": "The wooden chair is hard to sit on."
    },
    "de": {
      "meaning": "hart",
      "sentence": "Der Holzstuhl ist hart zum Sitzen."
    },
    "es": {
      "meaning": "duro",
      "sentence": "La silla de madera es dura para sentarse."
    },
    "pt": {
      "meaning": "duro",
      "sentence": "A cadeira de madeira é dura para sentar."
    },
    "tr": {
      "meaning": "sert",
      "sentence": "Ahşap sandalye oturmak için sert."
    },
    "ar": {
      "meaning": "صلب / قاسٍ",
      "sentence": "الكرسي الخشبي صلب في الجلوس عليه."
    },
    "fa": {
      "meaning": "سفت / سخت",
      "sentence": "نشستن روی صندلی چوبی سفت و سخت است."
    },
    "ku": {
      "meaning": "hişk",
      "sentence": "Kursiyê textîn ji bo rûniştinê hişk e."
    },
    "ur": {
      "meaning": "سخت",
      "sentence": "لکڑی کی کرسی پر بیٹھنا سخت ہے۔"
    },
    "ru": {
      "meaning": "жёсткий / твёрдый",
      "sentence": "Деревянный стул жёсткий, сидеть на нём неудобно."
    },
    "uk": {
      "meaning": "твердий",
      "sentence": "Дерев'яний стілець твердий, на ньому незручно сидіти."
    },
    "zh": {
      "meaning": "硬的",
      "sentence": "这把木头椅子坐起来很硬。"
    },
    "vi": {
      "meaning": "cứng",
      "sentence": "Chiếc ghế gỗ này ngồi rất cứng."
    },
    "th": {
      "meaning": "แข็ง",
      "sentence": "เก้าอี้ไม้นั่งแล้วแข็ง"
    },
    "ne": {
      "meaning": "कडा",
      "sentence": "काठको कुर्सीमा बस्न कडा छ।"
    },
    "ps": {
      "meaning": "کلک / سخت",
      "sentence": "د لرګي څوکۍ د کښېناستلو لپاره سخته ده."
    }
  },
  "blød": {
    "baseWord": "blød",
    "field": 1,
    "da": {
      "meaning": "blød",
      "sentence": "Sengen i soveværelset er dejlig blød."
    },
    "en": {
      "meaning": "soft",
      "sentence": "The pillow on the sofa is soft."
    },
    "de": {
      "meaning": "weich",
      "sentence": "Das Bett im Schlafzimmer ist herrlich weich."
    },
    "es": {
      "meaning": "blando / suave",
      "sentence": "La cama del dormitorio es agradablemente suave."
    },
    "pt": {
      "meaning": "macio",
      "sentence": "A cama no quarto é bem macia."
    },
    "tr": {
      "meaning": "yumuşak",
      "sentence": "Yatak odasındaki yatak yumuşacık."
    },
    "ar": {
      "meaning": "ناعم / وثير",
      "sentence": "السرير في غرفة النوم وثير وناعم جداً."
    },
    "fa": {
      "meaning": "نرم",
      "sentence": "تختخواب اتاق‌خواب بسیار نرم و راحت است."
    },
    "ku": {
      "meaning": "nerm",
      "sentence": "Nivîna di odeya razanê de xweş û nerm e."
    },
    "ur": {
      "meaning": "نرم",
      "sentence": "سونے کے کمرے کا بستر بہت نرم اور آرام دہ ہے۔"
    },
    "ru": {
      "meaning": "мягкий",
      "sentence": "Кровать в спальне приятно мягкая."
    },
    "uk": {
      "meaning": "м'який",
      "sentence": "Ліжко в спальні приємно м'яке."
    },
    "zh": {
      "meaning": "软的 / 柔软的",
      "sentence": "卧室里的床非常柔软舒适。"
    },
    "vi": {
      "meaning": "mềm, êm ái",
      "sentence": "Chiếc giường trong phòng ngủ êm ái tuyệt vời."
    },
    "th": {
      "meaning": "นุ่ม",
      "sentence": "เตียงในห้องนอนนุ่มสบายมาก"
    },
    "ne": {
      "meaning": "नरम",
      "sentence": "सुत्ने कोठाको ओछ्यान निकै नरम छ।"
    },
    "ps": {
      "meaning": "نرم / ملایم",
      "sentence": "د خوب د خونې کټ ډېر نرم دی."
    }
  },
  "fast": {
    "baseWord": "fast",
    "field": 1,
    "da": {
      "meaning": "fast",
      "sentence": "Manden har et fast arbejde."
    },
    "en": {
      "meaning": "firm / permanent",
      "sentence": "The man has a permanent job."
    },
    "de": {
      "meaning": "fest / dauerhaft",
      "sentence": "Der Mann hat eine feste Arbeit."
    },
    "es": {
      "meaning": "fijo / permanente",
      "sentence": "El hombre tiene un trabajo fijo."
    },
    "pt": {
      "meaning": "fixo / permanente",
      "sentence": "O homem tem um emprego fixo."
    },
    "tr": {
      "meaning": "sabit / kalıcı",
      "sentence": "Adamın sabit bir işi var."
    },
    "ar": {
      "meaning": "ثابت / دائم",
      "sentence": "الرجل لديه وظيفة ثابتة."
    },
    "fa": {
      "meaning": "ثابت / دائمی",
      "sentence": "آن مرد شغلی ثابت و دائمی دارد."
    },
    "ku": {
      "meaning": "sabît / mayînde",
      "sentence": "Karekî mayînde yê vî zilamî heye."
    },
    "ur": {
      "meaning": "مستقل / پکا",
      "sentence": "اس آدمی کی ایک مستقل ملازمت ہے۔"
    },
    "ru": {
      "meaning": "постоянный",
      "sentence": "У мужчины постоянная работа."
    },
    "uk": {
      "meaning": "постійний",
      "sentence": "Чоловік має постійну роботу."
    },
    "zh": {
      "meaning": "固定的 / 稳定的",
      "sentence": "这个男人有一份稳定的工作。"
    },
    "vi": {
      "meaning": "cố định, ổn định",
      "sentence": "Người đàn ông có một công việc ổn định."
    },
    "th": {
      "meaning": "มั่นคง / ประจำ",
      "sentence": "ชายคนนี้มีงานที่มั่นคง"
    },
    "ne": {
      "meaning": "स्थायी",
      "sentence": "मानिससँग स्थायी काम छ।"
    },
    "ps": {
      "meaning": "دايمي / ثابت",
      "sentence": "سړی یوه دايمي دنده لري."
    }
  },
  "løs": {
    "baseWord": "løs",
    "field": 1,
    "da": {
      "meaning": "løs",
      "sentence": "Skoen er for stor, så den er løs."
    },
    "en": {
      "meaning": "loose",
      "sentence": "The shoe is too big, so it is loose."
    },
    "de": {
      "meaning": "locker / lose",
      "sentence": "Der Schuh ist zu groß, deshalb sitzt er locker."
    },
    "es": {
      "meaning": "suelto / flojo",
      "sentence": "El zapato es demasiado grande, así que queda suelto."
    },
    "pt": {
      "meaning": "folgado / solto",
      "sentence": "O sapato é grande demais, por isso fica folgado."
    },
    "tr": {
      "meaning": "gevşek / bol",
      "sentence": "Ayakkabı çok büyük olduğu için ayağına bol geliyor."
    },
    "ar": {
      "meaning": "فضفاض / واسع",
      "sentence": "الحذاء كبير جداً، ولذلك فهو فضفاض."
    },
    "fa": {
      "meaning": "گشاد / لق",
      "sentence": "کفش بیش از حد بزرگ است، بنابراین گشاد است."
    },
    "ku": {
      "meaning": "sist / fireh",
      "sentence": "Pêlav zêde mezin e, lewma sist e."
    },
    "ur": {
      "meaning": "ڈھیلا",
      "sentence": "جوتا بہت بڑا ہے، اس لیے ڈھیلا ہے۔"
    },
    "ru": {
      "meaning": "болтающийся / свободный",
      "sentence": "Обувь слишком велика, поэтому она болтается."
    },
    "uk": {
      "meaning": "вільний / завеликий",
      "sentence": "Взуття завелике, тому воно спадає з ноги."
    },
    "zh": {
      "meaning": "松的 / 宽松的",
      "sentence": "鞋子太大了，所以很松。"
    },
    "vi": {
      "meaning": "rộng, lỏng",
      "sentence": "Đôi giày quá rộng nên bị lỏng."
    },
    "th": {
      "meaning": "หลวม",
      "sentence": "รองเท้าใหญ่เกินไป มันเลยหลวม"
    },
    "ne": {
      "meaning": "खुकुलो",
      "sentence": "जुत्ता धेरै ठूलो छ, त्यसैले यो खुकुलो छ।"
    },
    "ps": {
      "meaning": "سست / فراخ",
      "sentence": "بوټ ډېر لوی دی، نو ځکه سست (فراخ) دی."
    }
  },
  "fuld": {
    "baseWord": "fuld",
    "field": 1,
    "da": {
      "meaning": "fuld",
      "sentence": "Bussen til byen er helt fuld."
    },
    "en": {
      "meaning": "full",
      "sentence": "The bus to the city is completely full."
    },
    "de": {
      "meaning": "voll",
      "sentence": "Der Bus in die Stadt ist völlig voll."
    },
    "es": {
      "meaning": "lleno",
      "sentence": "El autobús a la ciudad está completamente lleno."
    },
    "pt": {
      "meaning": "cheio",
      "sentence": "O ônibus para a cidade está completamente cheio."
    },
    "tr": {
      "meaning": "dolu",
      "sentence": "Şehre giden otobüs tamamen dolu."
    },
    "ar": {
      "meaning": "ممتلئ",
      "sentence": "الحافلة المتجهة إلى المدينة ممتلئة تماماً."
    },
    "fa": {
      "meaning": "پر",
      "sentence": "اتوبوسِ به سمت شهر کاملاً پر است."
    },
    "ku": {
      "meaning": "tije / tijî",
      "sentence": "Otobusa ber bi bajêr ve bi temamî tijî ye."
    },
    "ur": {
      "meaning": "بھرا ہوا",
      "sentence": "شہر جانے والی بس پوری طرح بھری ہوئی ہے۔"
    },
    "ru": {
      "meaning": "полный / переполненный",
      "sentence": "Автобус в город совершенно переполнен."
    },
    "uk": {
      "meaning": "повний / переповнений",
      "sentence": "Автобус до міста повністю заповнений."
    },
    "zh": {
      "meaning": "满的",
      "sentence": "去城里的公交车完全坐满了。"
    },
    "vi": {
      "meaning": "đầy, chật kín",
      "sentence": "Chuyến xe buýt vào thành phố đã chật kín người."
    },
    "th": {
      "meaning": "เต็ม",
      "sentence": "รถบัสไปในเมืองคนเต็มแน่น"
    },
    "ne": {
      "meaning": "भरिएको",
      "sentence": "सहर जाने बस पूरै भरिएको छ।"
    },
    "ps": {
      "meaning": "ډک",
      "sentence": "ښار ته تلونکی بس په بشپړه توګه ډک دی."
    }
  },
  "tom": {
    "baseWord": "tom",
    "field": 1,
    "da": {
      "meaning": "tom",
      "sentence": "Koppen er tom, fordi hun har drukket kaffen."
    },
    "en": {
      "meaning": "empty",
      "sentence": "The cup is empty because she has drunk the coffee."
    },
    "de": {
      "meaning": "leer",
      "sentence": "Die Tasse ist leer, weil sie den Kaffee ausgetrunken hat."
    },
    "es": {
      "meaning": "vacío",
      "sentence": "La taza está vacía porque ella se bebió el café."
    },
    "pt": {
      "meaning": "vazio",
      "sentence": "A xícara está vazia porque ela tomou o café."
    },
    "tr": {
      "meaning": "boş",
      "sentence": "Kahveyi içtiği için fincan boş."
    },
    "ar": {
      "meaning": "فارغ",
      "sentence": "الفنجان فارغ لأنها شربت القهوة."
    },
    "fa": {
      "meaning": "خالی",
      "sentence": "فنجان خالی است چون او قهوه را نوشیده است."
    },
    "ku": {
      "meaning": "vala",
      "sentence": "Fîncan vala ye, ji ber ku wê qehweya xwe vexwariye."
    },
    "ur": {
      "meaning": "خالی",
      "sentence": "کپ خالی ہے کیونکہ اس نے کافی پی لی ہے۔"
    },
    "ru": {
      "meaning": "пустой",
      "sentence": "Чашка пуста, потому что она выпила весь кофе."
    },
    "uk": {
      "meaning": "порожній",
      "sentence": "Чашка порожня, бо вона випила всю каву."
    },
    "zh": {
      "meaning": "空的",
      "sentence": "杯子空了，因为她把咖啡喝完了。"
    },
    "vi": {
      "meaning": "trống, rỗng",
      "sentence": "Cốc đã cạn vì cô ấy đã uống hết cà phê."
    },
    "th": {
      "meaning": "ว่างเปล่า",
      "sentence": "แก้วว่างเปล่าเพราะเธอดื่มกาแฟหมดแล้ว"
    },
    "ne": {
      "meaning": "खाली",
      "sentence": "कप खाली छ किनभने उसले कफी पिइसकेकी छ।"
    },
    "ps": {
      "meaning": "خالي",
      "sentence": "پیاله خالي ده ځکه هغې قهوه څښلې ده."
    }
  },
  "åben": {
    "baseWord": "åben",
    "field": 1,
    "da": {
      "meaning": "åben",
      "sentence": "Døren til huset er åben."
    },
    "en": {
      "meaning": "open",
      "sentence": "The door to the house is open."
    },
    "de": {
      "meaning": "offen",
      "sentence": "Die Haustür ist offen."
    },
    "es": {
      "meaning": "abierto",
      "sentence": "La puerta de la casa está abierta."
    },
    "pt": {
      "meaning": "aberto",
      "sentence": "A porta da casa está aberta."
    },
    "tr": {
      "meaning": "açık",
      "sentence": "Evin kapısı açık."
    },
    "ar": {
      "meaning": "مفتوح",
      "sentence": "باب المنزل مفتوح."
    },
    "fa": {
      "meaning": "باز",
      "sentence": "در خانه باز است."
    },
    "ku": {
      "meaning": "vekirî",
      "sentence": "Deriyê malê vekirî ye."
    },
    "ur": {
      "meaning": "کھلا",
      "sentence": "گھر کا دروازہ کھلا ہے۔"
    },
    "ru": {
      "meaning": "открытый",
      "sentence": "Дверь в дом открыта."
    },
    "uk": {
      "meaning": "відчинений / відкритий",
      "sentence": "Двері до будинку відчинені."
    },
    "zh": {
      "meaning": "开着的 / 开放的",
      "sentence": "房子的门是开着的。"
    },
    "vi": {
      "meaning": "mở",
      "sentence": "Cửa vào nhà đang mở."
    },
    "th": {
      "meaning": "เปิด",
      "sentence": "ประตูบ้านเปิดอยู่"
    },
    "ne": {
      "meaning": "खुला",
      "sentence": "घरको ढोका खुला छ।"
    },
    "ps": {
      "meaning": "خلاص",
      "sentence": "د کور دروازه خلاصه ده."
    }
  },
  "lukket": {
    "baseWord": "lukket",
    "field": 1,
    "da": {
      "meaning": "lukket",
      "sentence": "Butikken er lukket om aftenen."
    },
    "en": {
      "meaning": "closed",
      "sentence": "The shop is closed in the evening."
    },
    "de": {
      "meaning": "geschlossen",
      "sentence": "Das Geschäft ist abends geschlossen."
    },
    "es": {
      "meaning": "cerrado",
      "sentence": "La tienda está cerrada por la noche."
    },
    "pt": {
      "meaning": "fechado",
      "sentence": "A loja está fechada à noite."
    },
    "tr": {
      "meaning": "kapalı",
      "sentence": "Dükkân akşamları kapalıdır."
    },
    "ar": {
      "meaning": "مغلق",
      "sentence": "المتجر مغلق في المساء."
    },
    "fa": {
      "meaning": "بسته",
      "sentence": "مغازه در شب بسته است."
    },
    "ku": {
      "meaning": "girtî",
      "sentence": "Dikan êvaran girtî ye."
    },
    "ur": {
      "meaning": "بند",
      "sentence": "شام کے وقت دکان بند ہوتی ہے۔"
    },
    "ru": {
      "meaning": "закрытый",
      "sentence": "Магазин закрыт по вечерам."
    },
    "uk": {
      "meaning": "зачинений / закритий",
      "sentence": "Магазин увечері зачинений."
    },
    "zh": {
      "meaning": "关闭的 / 关门的",
      "sentence": "商店晚上关门了。"
    },
    "vi": {
      "meaning": "đóng",
      "sentence": "Cửa hàng đóng cửa vào buổi tối."
    },
    "th": {
      "meaning": "ปิด",
      "sentence": "ร้านค้าปิดในตอนเย็น"
    },
    "ne": {
      "meaning": "बन्द",
      "sentence": "पसल साँझमा बन्द हुन्छ।"
    },
    "ps": {
      "meaning": "بند",
      "sentence": "پلورنځی په ماښام کې بند وي."
    }
  },
  "ny": {
    "baseWord": "ny",
    "field": 2,
    "da": {
      "meaning": "ny",
      "sentence": "Hun cykler på arbejde på en ny cykel."
    },
    "en": {
      "meaning": "new",
      "sentence": "She rides to work on a new bicycle."
    },
    "de": {
      "meaning": "neu",
      "sentence": "Sie fährt mit einem neuen Fahrrad zur Arbeit."
    },
    "es": {
      "meaning": "nuevo",
      "sentence": "Ella va al trabajo en una bicicleta nueva."
    },
    "pt": {
      "meaning": "novo",
      "sentence": "Ela vai trabalhar em uma bicicleta nova."
    },
    "tr": {
      "meaning": "yeni",
      "sentence": "İşe yeni bir bisikletle gidiyor."
    },
    "ar": {
      "meaning": "جديد",
      "sentence": "تركب دراجة جديدة إلى العمل."
    },
    "fa": {
      "meaning": "جدید / نو",
      "sentence": "او با یک دوچرخه جدید به سر کار می‌رود."
    },
    "ku": {
      "meaning": "nû",
      "sentence": "Ew bi bîsîkletek nû diçe ser kar."
    },
    "ur": {
      "meaning": "نیا",
      "sentence": "وہ ایک نئی سائیکل پر کام پر جاتی ہے۔"
    },
    "ru": {
      "meaning": "новый",
      "sentence": "Она едет на работу на новом велосипеде."
    },
    "uk": {
      "meaning": "новий",
      "sentence": "Вона їде на роботу на новому велосипеді."
    },
    "zh": {
      "meaning": "新的",
      "sentence": "她骑着一辆新自行车去上班。"
    },
    "vi": {
      "meaning": "mới",
      "sentence": "Cô ấy đạp xe đi làm bằng một chiếc xe đạp mới."
    },
    "th": {
      "meaning": "ใหม่",
      "sentence": "เธอปั่นจักรยานคันใหม่ไปทำงาน"
    },
    "ne": {
      "meaning": "नयाँ",
      "sentence": "उनी नयाँ साइकलमा काममा जान्छिन्।"
    },
    "ps": {
      "meaning": "نوی",
      "sentence": "هغه په یوه نوي بایسکل کار ته ځي."
    }
  },
  "gammel": {
    "baseWord": "gammel",
    "field": 2,
    "da": {
      "meaning": "gammel",
      "sentence": "Den gamle cykel står ved stationen."
    },
    "en": {
      "meaning": "old (object)",
      "sentence": "The old bicycle stands by the station."
    },
    "de": {
      "meaning": "alt (Gegenstand)",
      "sentence": "Das alte Fahrrad steht am Bahnhof."
    },
    "es": {
      "meaning": "viejo / antiguo",
      "sentence": "La bicicleta vieja está junto a la estación."
    },
    "pt": {
      "meaning": "velho / antigo",
      "sentence": "A bicicleta velha está na estação."
    },
    "tr": {
      "meaning": "eski",
      "sentence": "Eski bisiklet istasyonun yanında duruyor."
    },
    "ar": {
      "meaning": "قديم",
      "sentence": "الدراجة القديمة تقف عند المحطة."
    },
    "fa": {
      "meaning": "قدیمی",
      "sentence": "دوچرخه قدیمی کنار ایستگاه قرار دارد."
    },
    "ku": {
      "meaning": "kevn",
      "sentence": "Bîsîkleta kevn li ber stasyonê radiweste."
    },
    "ur": {
      "meaning": "پرانا",
      "sentence": "پرانی سائیکل سٹیشن کے پاس کھڑی ہے۔"
    },
    "ru": {
      "meaning": "старый (о предмете)",
      "sentence": "Старый велосипед стоит возле вокзала."
    },
    "uk": {
      "meaning": "старий (про річ)",
      "sentence": "Старий велосипед стоїть біля вокзалу."
    },
    "zh": {
      "meaning": "旧的 (物品)",
      "sentence": "那辆旧自行车停在车站旁。"
    },
    "vi": {
      "meaning": "cũ (đồ vật)",
      "sentence": "Chiếc xe đạp cũ dựng ở nhà ga."
    },
    "th": {
      "meaning": "เก่า",
      "sentence": "จักรยานคันเก่าจอดอยู่ที่สถานี"
    },
    "ne": {
      "meaning": "पुरानो",
      "sentence": "पुरानो साइकल स्टेसन नजिक छ।"
    },
    "ps": {
      "meaning": "زوړ",
      "sentence": "زوړ بایسکل د سټېشن تر څنګ ولاړ دی."
    }
  },
  "ung": {
    "baseWord": "ung",
    "field": 2,
    "da": {
      "meaning": "ung",
      "sentence": "En ung kvinde venter på bussen."
    },
    "en": {
      "meaning": "young",
      "sentence": "A young woman is waiting for the bus."
    },
    "de": {
      "meaning": "jung",
      "sentence": "Eine junge Frau wartet auf den Bus."
    },
    "es": {
      "meaning": "joven",
      "sentence": "Una mujer joven espera el autobús."
    },
    "pt": {
      "meaning": "jovem",
      "sentence": "Uma jovem espera o ônibus."
    },
    "tr": {
      "meaning": "genç",
      "sentence": "Genç bir kadın otobüs bekliyor."
    },
    "ar": {
      "meaning": "شاب / شابة",
      "sentence": "تنتظر امرأة شابة الحافلة."
    },
    "fa": {
      "meaning": "جوان",
      "sentence": "زن جوانی منتظر اتوبوس است."
    },
    "ku": {
      "meaning": "ciwan",
      "sentence": "Jineke ciwan li benda otobusê ye."
    },
    "ur": {
      "meaning": "جوان",
      "sentence": "ایک نوجوان خاتون بس کا انتظار کر رہی ہے۔"
    },
    "ru": {
      "meaning": "молодой",
      "sentence": "Молодая женщина ждёт автобус."
    },
    "uk": {
      "meaning": "молодий",
      "sentence": "Молода жінка чекає на автобус."
    },
    "zh": {
      "meaning": "年轻的",
      "sentence": "一位年轻女士正在等公交车。"
    },
    "vi": {
      "meaning": "trẻ",
      "sentence": "Một phụ nữ trẻ đang đợi xe buýt."
    },
    "th": {
      "meaning": "สาว / หนุ่ม (วัยรุ่น)",
      "sentence": "หญิงสาวคนหนึ่งกำลังรอรถบัส"
    },
    "ne": {
      "meaning": "युवा",
      "sentence": "एउटी युवती बस पर्खिरहेकी छिन्।"
    },
    "ps": {
      "meaning": "ځوان",
      "sentence": "یوه ځوانه ښځه بس ته انتظار باسي."
    }
  },
  "gammel_2": {
    "baseWord": "gammel",
    "field": 2,
    "da": {
      "meaning": "gammel",
      "sentence": "En gammel mand sidder på bænken."
    },
    "en": {
      "meaning": "old (person)",
      "sentence": "An old man is sitting on the bench."
    },
    "de": {
      "meaning": "alt (betagt)",
      "sentence": "Ein alter Mann sitzt auf der Bank."
    },
    "es": {
      "meaning": "anciano / viejo",
      "sentence": "Un anciano está sentado en el banco."
    },
    "pt": {
      "meaning": "idoso / velho",
      "sentence": "Um senhor idoso está sentado no banco."
    },
    "tr": {
      "meaning": "yaşlı",
      "sentence": "Yaşlı bir adam bankta oturuyor."
    },
    "ar": {
      "meaning": "عجوز / مسن",
      "sentence": "يجلس رجل مسن على المقعد."
    },
    "fa": {
      "meaning": "پیر / مسن",
      "sentence": "مردی مسن روی نیمکت نشسته است."
    },
    "ku": {
      "meaning": "kal / pîr",
      "sentence": "Zilamekî kal li ser textikê rûniştiye."
    },
    "ur": {
      "meaning": "بوڑھا / معمر",
      "sentence": "ایک بوڑھا آدمی بینچ پر بیٹھا ہے۔"
    },
    "ru": {
      "meaning": "пожилой / старый (о человеке)",
      "sentence": "Пожилой мужчина сидит на скамейке."
    },
    "uk": {
      "meaning": "літній / старий (про людину)",
      "sentence": "Літній чоловік сидить на лавці."
    },
    "zh": {
      "meaning": "年老的 (人)",
      "sentence": "一位老人坐在长椅上。"
    },
    "vi": {
      "meaning": "già, cao tuổi (người)",
      "sentence": "Một cụ ông đang ngồi trên ghế băng."
    },
    "th": {
      "meaning": "แก่ / ชรา",
      "sentence": "ชายชราคนหนึ่งนั่งอยู่บนม้านั่ง"
    },
    "ne": {
      "meaning": "वृद्ध / बुढो",
      "sentence": "एक वृद्ध मानिस बेन्चमा बसिरहेका छन्।"
    },
    "ps": {
      "meaning": "زوړ / بوډا",
      "sentence": "یو بوډا سړی په بنچ ناست دی."
    }
  },
  "tidlig": {
    "baseWord": "tidlig",
    "field": 2,
    "da": {
      "meaning": "tidlig",
      "sentence": "Hun tager et tidligt tog på arbejde."
    },
    "en": {
      "meaning": "early",
      "sentence": "She takes an early train to work."
    },
    "de": {
      "meaning": "früh",
      "sentence": "Sie nimmt einen frühen Zug zur Arbeit."
    },
    "es": {
      "meaning": "temprano",
      "sentence": "Ella coge un tren temprano para ir al trabajo."
    },
    "pt": {
      "meaning": "cedo / matutino",
      "sentence": "Ela pega um trem cedo para ir trabalhar."
    },
    "tr": {
      "meaning": "erken",
      "sentence": "İşe gitmek için erken bir trene biniyor."
    },
    "ar": {
      "meaning": "مبكر",
      "sentence": "تستقل قطاراً مبكراً إلى العمل."
    },
    "fa": {
      "meaning": "اول وقت / زود",
      "sentence": "او با یک قطار اول صبح به سر کار می‌رود."
    },
    "ku": {
      "meaning": "zû",
      "sentence": "Ew trênek zû ya ber bi karê xwe ve digire."
    },
    "ur": {
      "meaning": "صبح سویرے کا / جلدی کا",
      "sentence": "وہ کام پر جانے کے لیے صبح سویرے کی ٹرین لیتی ہے۔"
    },
    "ru": {
      "meaning": "ранний",
      "sentence": "Она садится на ранний поезд на работу."
    },
    "uk": {
      "meaning": "ранній",
      "sentence": "Вона сідає на ранній поїзд на роботу."
    },
    "zh": {
      "meaning": "早的",
      "sentence": "她坐早班火车去上班。"
    },
    "vi": {
      "meaning": "sớm",
      "sentence": "Cô ấy đi một chuyến tàu sớm để đi làm."
    },
    "th": {
      "meaning": "เช้าตรู่ / แต่เนิ่นๆ",
      "sentence": "เธอขึ้นรถไฟเที่ยวเช้าไปทำงาน"
    },
    "ne": {
      "meaning": "चाँडो",
      "sentence": "उनी काममा जान बिहानको चाँडो रेल चढ्छिन्।"
    },
    "ps": {
      "meaning": "وختي",
      "sentence": "هغه کار ته د تلو لپاره د سهار وختي ریل ګاډی نیسي."
    }
  },
  "sen": {
    "baseWord": "sen",
    "field": 2,
    "da": {
      "meaning": "sen",
      "sentence": "Han tager en sen bus hjem om aftenen."
    },
    "en": {
      "meaning": "late",
      "sentence": "He takes a late bus home in the evening."
    },
    "de": {
      "meaning": "spät",
      "sentence": "Er nimmt abends einen späten Bus nach Hause."
    },
    "es": {
      "meaning": "tarde / tardío",
      "sentence": "Él toma un autobús tardío a casa por la noche."
    },
    "pt": {
      "meaning": "tarde / noturno",
      "sentence": "Ele pega um ônibus tarde da noite para casa."
    },
    "tr": {
      "meaning": "geç",
      "sentence": "Akşamları eve geç bir otobüsle gidiyor."
    },
    "ar": {
      "meaning": "متأخر",
      "sentence": "يستقل حافلة متأخرة إلى البيت في المساء."
    },
    "fa": {
      "meaning": "دیرهنگام / دیر",
      "sentence": "او شب‌ها با اتوبوسی دیرهنگام به خانه برمی‌گردد."
    },
    "ku": {
      "meaning": "dereng",
      "sentence": "Ew êvarê bi otobuseke dereng vedigere malê."
    },
    "ur": {
      "meaning": "دیر سے / دیر کا",
      "sentence": "وہ شام کو دیر سے آنے والی بس سے گھر جاتا ہے۔"
    },
    "ru": {
      "meaning": "поздний",
      "sentence": "Вечером он возвращается домой на позднем автобусе."
    },
    "uk": {
      "meaning": "пізній",
      "sentence": "Увечері він їде додому пізнім автобусом."
    },
    "zh": {
      "meaning": "晚的",
      "sentence": "他晚上坐晚班车回家。"
    },
    "vi": {
      "meaning": "muộn, trễ",
      "sentence": "Anh ấy bắt chuyến xe buýt muộn về nhà vào buổi tối."
    },
    "th": {
      "meaning": "ดึก / สาย",
      "sentence": "เขาขึ้นรถบัสเที่ยวรอบดึกกลับบ้านในตอนเย็น"
    },
    "ne": {
      "meaning": "ढिलो",
      "sentence": "ऊ साँझ ढिलो बस चढेर घर जान्छ।"
    },
    "ps": {
      "meaning": "ناوخته",
      "sentence": "هغه په ماښام کې د کور لپاره د ناوخته وخت بس نیسي."
    }
  },
  "hurtig": {
    "baseWord": "hurtig",
    "field": 2,
    "da": {
      "meaning": "hurtig",
      "sentence": "Toget til København er meget hurtigt."
    },
    "en": {
      "meaning": "fast / quick",
      "sentence": "The train to Copenhagen is very fast."
    },
    "de": {
      "meaning": "schnell",
      "sentence": "Der Zug nach Kopenhagen ist sehr schnell."
    },
    "es": {
      "meaning": "rápido",
      "sentence": "El tren a Copenhague es muy rápido."
    },
    "pt": {
      "meaning": "rápido",
      "sentence": "O trem para Copenhague é muito rápido."
    },
    "tr": {
      "meaning": "hızlı",
      "sentence": "Kopenhag treni çok hızlı."
    },
    "ar": {
      "meaning": "سريع",
      "sentence": "القطار إلى كوبنهاغن سريع جداً."
    },
    "fa": {
      "meaning": "سریع / تند",
      "sentence": "قطار به مقصد کپنهاگ بسیار سریع است."
    },
    "ku": {
      "meaning": "bilez",
      "sentence": "Trêna ber bi Kopenhagenê ve pir bilez e."
    },
    "ur": {
      "meaning": "تیز",
      "sentence": "کوپن ہیگن جانے والی ٹرین بہت تیز ہے۔"
    },
    "ru": {
      "meaning": "быстрый",
      "sentence": "Поезд в Копенгаген очень быстрый."
    },
    "uk": {
      "meaning": "швидкий",
      "sentence": "Поїзд до Копенгагена дуже швидкий."
    },
    "zh": {
      "meaning": "快的",
      "sentence": "去哥本哈根的火车非常快。"
    },
    "vi": {
      "meaning": "nhanh",
      "sentence": "Chuyến tàu đi Copenhagen chạy rất nhanh."
    },
    "th": {
      "meaning": "เร็ว",
      "sentence": "รถไฟไปโคเปนเฮเกนเร็วมาก"
    },
    "ne": {
      "meaning": "छिटो",
      "sentence": "कोपेनहेगन जाने रेल धेरै छिटो छ।"
    },
    "ps": {
      "meaning": "ګړندی / تېز",
      "sentence": "کوپنهاګن ته ریل ګاډی ډېر تېز دی."
    }
  },
  "langsom": {
    "baseWord": "langsom",
    "field": 2,
    "da": {
      "meaning": "langsom",
      "sentence": "Bussen i myldretiden er meget langsom."
    },
    "en": {
      "meaning": "slow",
      "sentence": "The bus during rush hour is very slow."
    },
    "de": {
      "meaning": "langsam",
      "sentence": "Der Bus im Berufsverkehr ist sehr langsam."
    },
    "es": {
      "meaning": "lento",
      "sentence": "El autobús en hora punta es muy lento."
    },
    "pt": {
      "meaning": "lento",
      "sentence": "O ônibus no horário de pico é muito lento."
    },
    "tr": {
      "meaning": "yavaş",
      "sentence": "Yoğun saatteki otobüs çok yavaş."
    },
    "ar": {
      "meaning": "بطيء",
      "sentence": "الحافلة في ساعة الذروة بطيئة جداً."
    },
    "fa": {
      "meaning": "کند / آهسته",
      "sentence": "اتوبوس در ساعت شلوغی بسیار کند است."
    },
    "ku": {
      "meaning": "hêdî",
      "sentence": "Otobus di dema qerebalixiyê de pir hêdî ye."
    },
    "ur": {
      "meaning": "سست / آہستہ",
      "sentence": "رش کے اوقات میں بس بہت سست چلتی ہے۔"
    },
    "ru": {
      "meaning": "медленный",
      "sentence": "В час пик автобус едет очень медленно."
    },
    "uk": {
      "meaning": "повільний",
      "sentence": "У годину пік автобус їде дуже повільно."
    },
    "zh": {
      "meaning": "慢的",
      "sentence": "早晚高峰时的公交车非常慢。"
    },
    "vi": {
      "meaning": "chậm",
      "sentence": "Xe buýt vào giờ cao điểm đi rất chậm."
    },
    "th": {
      "meaning": "ช้า",
      "sentence": "รถบัสในช่วงเวลาเร่งด่วนแล่นช้ามาก"
    },
    "ne": {
      "meaning": "सुस्त / ढिलो",
      "sentence": "भीडभाडको समयमा बस धेरै सुस्त हुन्छ।"
    },
    "ps": {
      "meaning": "ورو",
      "sentence": "د ګڼې ګوڼې په وخت کې بس ډېر ورو وي."
    }
  },
  "kortvarig": {
    "baseWord": "kortvarig",
    "field": 2,
    "da": {
      "meaning": "kortvarig",
      "sentence": "De holder en kortvarig pause i arbejdet."
    },
    "en": {
      "meaning": "brief / short-term",
      "sentence": "They take a brief break from work."
    },
    "de": {
      "meaning": "kurz / kurzzeitig",
      "sentence": "Sie machen eine kurze Pause bei der Arbeit."
    },
    "es": {
      "meaning": "breve / de corta duración",
      "sentence": "Hacen una breve pausa en el trabajo."
    },
    "pt": {
      "meaning": "breve / rápida",
      "sentence": "Eles fazem uma pausa rápida no trabalho."
    },
    "tr": {
      "meaning": "kısa süreli",
      "sentence": "İşte kısa süreli bir ara veriyorlar."
    },
    "ar": {
      "meaning": "قصير الأمد / وجيز",
      "sentence": "يأخذون استراحة وجيزة من العمل."
    },
    "fa": {
      "meaning": "کوتاه‌مدت / مختصر",
      "sentence": "آن‌ها وقفه‌ای کوتاه‌مدت در کار ایجاد می‌کنند."
    },
    "ku": {
      "meaning": "kurtedemî",
      "sentence": "Ew di kar de bêhnvedaneke kurtedemî didin."
    },
    "ur": {
      "meaning": "مختصر مدتی / عارضی",
      "sentence": "وہ کام کے دوران ایک مختصر وقفہ لیتے ہیں۔"
    },
    "ru": {
      "meaning": "кратковременный",
      "sentence": "Они делают короткий перерыв в работе."
    },
    "uk": {
      "meaning": "короткочасний",
      "sentence": "Вони роблять короткочасну перерву в роботі."
    },
    "zh": {
      "meaning": "短暂的",
      "sentence": "他们在工作中做了短暂的休息。"
    },
    "vi": {
      "meaning": "ngắn, ngắn ngủi",
      "sentence": "Họ nghỉ giải lao một lúc ngắn trong giờ làm việc."
    },
    "th": {
      "meaning": "ชั่วครู่ / สั้นๆ",
      "sentence": "พวกเขาหยุดพักการทำงานเป็นเวลาสั้นๆ"
    },
    "ne": {
      "meaning": "अल्पकालीन / छोटो समयको",
      "sentence": "उनीहरू कामबाट छोटो समयको विश्राम लिन्छन्।"
    },
    "ps": {
      "meaning": "لنډمهاله",
      "sentence": "دوی په کار کې لنډمهاله وقفه کوي."
    }
  },
  "langvarig": {
    "baseWord": "langvarig",
    "field": 2,
    "da": {
      "meaning": "langvarig",
      "sentence": "Ventetiden på bussen var meget langvarig."
    },
    "en": {
      "meaning": "prolonged / long-term",
      "sentence": "The waiting time for the bus was very prolonged."
    },
    "de": {
      "meaning": "langwierig / lang anhaltend",
      "sentence": "Die Wartezeit auf den Bus war sehr langwierig."
    },
    "es": {
      "meaning": "prolongado / de larga duración",
      "sentence": "El tiempo de espera del autobús fue muy prolongado."
    },
    "pt": {
      "meaning": "prolongado / demorado",
      "sentence": "A espera pelo ônibus foi muito demorada."
    },
    "tr": {
      "meaning": "uzun süreli / uzun süren",
      "sentence": "Otobüs bekleme süresi çok uzundu."
    },
    "ar": {
      "meaning": "طويل الأمد / ممتد",
      "sentence": "كان وقت انتظار الحافلة طويلاً جداً."
    },
    "fa": {
      "meaning": "طولانی‌مدت / پر طول و تفصیل",
      "sentence": "مدت انتظار برای اتوبوس بسیار طولانی بود."
    },
    "ku": {
      "meaning": "dirêjdemî",
      "sentence": "Wextê rawestandina li benda otobusê pir dirêjdemî bû."
    },
    "ur": {
      "meaning": "طویل مدتی / لمبا",
      "sentence": "بس کا انتظار بہت طویل تھا۔"
    },
    "ru": {
      "meaning": "длительный / долгий",
      "sentence": "Ожидание автобуса было очень долгим."
    },
    "uk": {
      "meaning": "тривалий",
      "sentence": "Очікування автобуса було дуже тривалим."
    },
    "zh": {
      "meaning": "长期的 / 漫长的",
      "sentence": "等公交车的时间非常漫长。"
    },
    "vi": {
      "meaning": "kéo dài, lâu dài",
      "sentence": "Thời gian chờ xe buýt kéo dài rất lâu."
    },
    "th": {
      "meaning": "ยาวนาน",
      "sentence": "เวลาที่ต้องรอรถบัสนั้นยาวนานมาก"
    },
    "ne": {
      "meaning": "लामो समयको / लामो",
      "sentence": "बसको लागि पर्खने समय धेरै लामो थियो।"
    },
    "ps": {
      "meaning": "اوږدمهاله / ډېر اوږد",
      "sentence": "بس ته د انتظار وخت ډېر اوږد و."
    }
  },
  "hyppig": {
    "baseWord": "hyppig",
    "field": 2,
    "da": {
      "meaning": "hyppig",
      "sentence": "Afgangen med metroen er meget hyppig."
    },
    "en": {
      "meaning": "frequent",
      "sentence": "Departures on the metro are very frequent."
    },
    "de": {
      "meaning": "häufig",
      "sentence": "Die Metro fährt sehr häufig ab."
    },
    "es": {
      "meaning": "frecuente",
      "sentence": "La salida del metro es muy frecuente."
    },
    "pt": {
      "meaning": "frequente",
      "sentence": "As partidas do metrô são muito frequentes."
    },
    "tr": {
      "meaning": "sık",
      "sentence": "Metro seferleri çok sıktır."
    },
    "ar": {
      "meaning": "متكرر / متواتر",
      "sentence": "رحلات المترو متكررة جداً."
    },
    "fa": {
      "meaning": "مکرر / پیاپی",
      "sentence": "حرکت قطارهای مترو بسیار متوالی و مکرر است."
    },
    "ku": {
      "meaning": "pir caran / zû bi zû",
      "sentence": "Çûna metroyê gelek caran û zû bi zû ye."
    },
    "ur": {
      "meaning": "متواتر / بار بار ہونے والا",
      "sentence": "میٹرو کی روانگی کا سلسلہ بہت متواتر ہے۔"
    },
    "ru": {
      "meaning": "частый",
      "sentence": "Поезда метро отправляются очень часто."
    },
    "uk": {
      "meaning": "частий",
      "sentence": "Поїзди метро ходять дуже часто."
    },
    "zh": {
      "meaning": "频繁的",
      "sentence": "地铁发车非常频繁。"
    },
    "vi": {
      "meaning": "thường xuyên, liên tục",
      "sentence": "Tàu điện ngầm khởi hành rất thường xuyên."
    },
    "th": {
      "meaning": "บ่อยครั้ง / ถี่",
      "sentence": "รถไฟใต้ดินออกวิ่งบ่อยมาก"
    },
    "ne": {
      "meaning": "बारम्बार",
      "sentence": "मेट्रो रेलको प्रस्थान धेरै पटक (बारम्बार) हुन्छ।"
    },
    "ps": {
      "meaning": "پرله پسې / زيات تکرارېدونکی",
      "sentence": "د میټرو حرکت ډېر پرله پسې وي."
    }
  },
  "sjælden": {
    "baseWord": "sjælden",
    "field": 2,
    "da": {
      "meaning": "sjælden",
      "sentence": "Bussen til landsbyen er et sjældent syn."
    },
    "en": {
      "meaning": "rare / infrequent",
      "sentence": "The bus to the village is a rare sight."
    },
    "de": {
      "meaning": "selten",
      "sentence": "Der Bus ins Dorf ist ein seltener Anblick."
    },
    "es": {
      "meaning": "raro / poco frecuente",
      "sentence": "El autobús hacia el pueblo es algo muy poco común de ver."
    },
    "pt": {
      "meaning": "raro / infrequente",
      "sentence": "O ônibus para o vilarejo é uma visão rara."
    },
    "tr": {
      "meaning": "nadir / seyrek",
      "sentence": "Köye giden otobüs nadir görülen bir manzaradır."
    },
    "ar": {
      "meaning": "نادر",
      "sentence": "الحافلة المتجهة إلى القرية مشهد نادر."
    },
    "fa": {
      "meaning": "کمیاب / نادر",
      "sentence": "دیدن اتوبوس به مقصد روستا یک منظره نادر است."
    },
    "ku": {
      "meaning": "kêmpeyda",
      "sentence": "Dîtina otobusa gund dîmenekî kêmpeyda ye."
    },
    "ur": {
      "meaning": "نایاب / کم نظر آنے والا",
      "sentence": "گاؤں جانے والی بس بہت کم نظر آتی ہے۔"
    },
    "ru": {
      "meaning": "редкий",
      "sentence": "Автобус в деревню — редкое явление."
    },
    "uk": {
      "meaning": "рідкісний",
      "sentence": "Автобус до села — рідкісне явище."
    },
    "zh": {
      "meaning": "少见的 / 罕见的",
      "sentence": "开往那个村庄的公交车很难得见到一次。"
    },
    "vi": {
      "meaning": "hiếm",
      "sentence": "Xe buýt về làng là một cảnh tượng hiếm thấy."
    },
    "th": {
      "meaning": "หายาก / นานๆ ครั้ง",
      "sentence": "รถบัสไปหมู่บ้านนั้นแทบจะไม่ค่อยได้เห็นเลย"
    },
    "ne": {
      "meaning": "दुर्लभ",
      "sentence": "गाउँ जाने बस विरलै देख्न पाइन्छ।"
    },
    "ps": {
      "meaning": "نادر / کم موندل کېدونکی",
      "sentence": "کلي ته تلونکی بس یو نادر لید دی."
    }
  },
  "nuværende": {
    "baseWord": "nuværende",
    "field": 2,
    "da": {
      "meaning": "nuværende",
      "sentence": "Kunderne kigger på den nuværende køreplan."
    },
    "en": {
      "meaning": "current / present",
      "sentence": "Customers are looking at the current timetable."
    },
    "de": {
      "meaning": "aktuell / gegenwärtig",
      "sentence": "Die Fahrgäste schauen auf den aktuellen Fahrplan."
    },
    "es": {
      "meaning": "actual / presente",
      "sentence": "Los clientes consultan el horario actual."
    },
    "pt": {
      "meaning": "atual / presente",
      "sentence": "Os passageiros olham o horário atual."
    },
    "tr": {
      "meaning": "güncel / şimdiki",
      "sentence": "Yolcular güncel sefer tarifesine bakıyor."
    },
    "ar": {
      "meaning": "حالي",
      "sentence": "ينظر الزبائن إلى جدول المواعيد الحالي."
    },
    "fa": {
      "meaning": "کنونی / فعلی",
      "sentence": "مشتریان به جدول زمانی فعلی نگاه می‌کنند."
    },
    "ku": {
      "meaning": "ya niha",
      "sentence": "Mişterî li xaneya wextê ya niha dinêrin."
    },
    "ur": {
      "meaning": "موجودہ",
      "sentence": "مسافر موجودہ ٹائم ٹیبل دیکھ رہے ہیں۔"
    },
    "ru": {
      "meaning": "текущий / действующий",
      "sentence": "Пассажиры смотрят на действующее расписание."
    },
    "uk": {
      "meaning": "поточний / теперішній",
      "sentence": "Пасажири дивляться на дійсний розклад руху."
    },
    "zh": {
      "meaning": "目前的 / 现行的",
      "sentence": "乘客们正在查看当前的时刻表。"
    },
    "vi": {
      "meaning": "hiện tại, hiện hành",
      "sentence": "Khách hàng đang xem lịch trình hiện tại."
    },
    "th": {
      "meaning": "ปัจจุบัน",
      "sentence": "ลูกค้ากำลังดูตารางเวลาเดินรถในปัจจุบัน"
    },
    "ne": {
      "meaning": "हालको / वर्तमान",
      "sentence": "ग्राहकहरू हालको समयतालिका हेरिरहेका छन्।"
    },
    "ps": {
      "meaning": "اوسنی",
      "sentence": "پیرودونکي د اوسني مهالوېش څارنه کوي."
    }
  },
  "tidligere": {
    "baseWord": "tidligere",
    "field": 2,
    "da": {
      "meaning": "tidligere",
      "sentence": "De tidligere billetter gælder ikke mere."
    },
    "en": {
      "meaning": "previous / former",
      "sentence": "The previous tickets are no longer valid."
    },
    "de": {
      "meaning": "früher / bisherig",
      "sentence": "Die früheren Fahrkarten sind nicht mehr gültig."
    },
    "es": {
      "meaning": "anterior / previo",
      "sentence": "Los billetes anteriores ya no son válidos."
    },
    "pt": {
      "meaning": "anterior / antigo",
      "sentence": "As passagens anteriores já não valem mais."
    },
    "tr": {
      "meaning": "önceki / eski",
      "sentence": "Önceki biletler artık geçerli değil."
    },
    "ar": {
      "meaning": "سابق",
      "sentence": "التذاكر السابقة لم تعد صالحة."
    },
    "fa": {
      "meaning": "قبلی / سابق",
      "sentence": "بلیط‌های قبلی دیگر معتبر نیستند."
    },
    "ku": {
      "meaning": "yên berê",
      "sentence": "Bîlêtên berê êdî ne derbasdar in."
    },
    "ur": {
      "meaning": "پچھلا / سابقہ",
      "sentence": "پرانے ٹکٹ اب کارآمد نہیں ہیں۔"
    },
    "ru": {
      "meaning": "прежний / предыдущий",
      "sentence": "Прежние билеты больше не действительны."
    },
    "uk": {
      "meaning": "попередній",
      "sentence": "Попередні квитки більше не дійсні."
    },
    "zh": {
      "meaning": "以前的 / 先前的",
      "sentence": "以前的车票不再有效。"
    },
    "vi": {
      "meaning": "trước đây, cũ",
      "sentence": "Những chiếc vé trước đây không còn giá trị nữa."
    },
    "th": {
      "meaning": "ก่อนหน้านี้ / เก่า",
      "sentence": "ตั๋วรอบก่อนหน้าใช้ไม่ได้อีกต่อไปแล้ว"
    },
    "ne": {
      "meaning": "अघिल्लो / पहिलेको",
      "sentence": "पहिलेका टिकटहरू अब मान्य छैनन्।"
    },
    "ps": {
      "meaning": "پخوانی",
      "sentence": "پخواني ټکټونه نور اعتبار نه لري."
    }
  },
  "pludselig": {
    "baseWord": "pludselig",
    "field": 2,
    "da": {
      "meaning": "pludselig",
      "sentence": "Det var et pludseligt stop ved krydset."
    },
    "en": {
      "meaning": "sudden",
      "sentence": "It was a sudden stop at the intersection."
    },
    "de": {
      "meaning": "plötzlich",
      "sentence": "Es war ein plötzlicher Halt an der Kreuzung."
    },
    "es": {
      "meaning": "repentino / súbito",
      "sentence": "Fue una parada repentina en el cruce."
    },
    "pt": {
      "meaning": "repentino / súbito",
      "sentence": "Foi uma parada repentina no cruzamento."
    },
    "tr": {
      "meaning": "ani / birdenbire",
      "sentence": "Kavşakta ani bir duruş oldu."
    },
    "ar": {
      "meaning": "مفاجئ",
      "sentence": "كان توقفاً مفاجئاً عند التقاطع."
    },
    "fa": {
      "meaning": "ناگهانی",
      "sentence": "این یک توقف ناگهانی در تقاطع بود."
    },
    "ku": {
      "meaning": "ji nişka ve",
      "sentence": "Ew li çarxerê rawestîneke ji nişka ve bû."
    },
    "ur": {
      "meaning": "اچانک",
      "sentence": "چوراہے پر وہ ایک اچانک سٹاپ تھا۔"
    },
    "ru": {
      "meaning": "внезапный",
      "sentence": "Это была внезапная остановка на перекрёстке."
    },
    "uk": {
      "meaning": "раптовий",
      "sentence": "Це була раптова зупинка на перехресті."
    },
    "zh": {
      "meaning": "突然的",
      "sentence": "在十字路口突然停了下来。"
    },
    "vi": {
      "meaning": "đột ngột, bất ngờ",
      "sentence": "Đó là một cú dừng xe đột ngột ở ngã tư."
    },
    "th": {
      "meaning": "กะทันหัน",
      "sentence": "นั่นเป็นการหยุดรถอย่างกะทันหันตรงสี่แยก"
    },
    "ne": {
      "meaning": "अचानक",
      "sentence": "चौबाटोमा गाडी अचानक रोकियो।"
    },
    "ps": {
      "meaning": "ناڅاپي",
      "sentence": "دا په څلورلارې کې یو ناڅاپي درېدل و."
    }
  },
  "gradvis": {
    "baseWord": "gradvis",
    "field": 2,
    "da": {
      "meaning": "gradvis",
      "sentence": "Der er en gradvis stigning i billetprisen."
    },
    "en": {
      "meaning": "gradual",
      "sentence": "There is a gradual increase in the ticket price."
    },
    "de": {
      "meaning": "schrittweise / allmählich",
      "sentence": "Es gibt einen allmählichen Anstieg des Fahrpreises."
    },
    "es": {
      "meaning": "gradual",
      "sentence": "Hay un aumento gradual en el precio del billete."
    },
    "pt": {
      "meaning": "gradual",
      "sentence": "Há um aumento gradual no preço da passagem."
    },
    "tr": {
      "meaning": "kademeli / aşamalı",
      "sentence": "Bilet fiyatlarında kademeli bir artış var."
    },
    "ar": {
      "meaning": "تدريجي",
      "sentence": "هناك زيادة تدريجية في سعر التذكرة."
    },
    "fa": {
      "meaning": "تدریجی",
      "sentence": "یک افزایش تدریجی در قیمت بلیط وجود دارد."
    },
    "ku": {
      "meaning": "gav bi gav",
      "sentence": "Di bihayê bîlêtê de zêdebûneke gav bi gav heye."
    },
    "ur": {
      "meaning": "تدریجی / آہستہ آہستہ",
      "sentence": "ٹکٹ کی قیمت میں بتدریج اضافہ ہو رہا ہے۔"
    },
    "ru": {
      "meaning": "постепенный",
      "sentence": "Происходит постепенное повышение цен на билеты."
    },
    "uk": {
      "meaning": "поступовий",
      "sentence": "Відбувається поступове зростання цін на квитки."
    },
    "zh": {
      "meaning": "逐渐的 / 逐步的",
      "sentence": "票价在逐步上涨。"
    },
    "vi": {
      "meaning": "dần dần, từng bước",
      "sentence": "Giá vé đang tăng dần theo thời gian."
    },
    "th": {
      "meaning": "ค่อยเป็นค่อยไป",
      "sentence": "ราคาตั๋วมีการปรับขึ้นอย่างค่อยเป็นค่อยไป"
    },
    "ne": {
      "meaning": "क्रमशः / बिस्तारै हुने",
      "sentence": "टिकटको मूल्यमा क्रमशः वृद्धि भएको छ।"
    },
    "ps": {
      "meaning": "تدریجي / ګام پر ګام",
      "sentence": "د ټکټ په نرخ کې تدریجي زیاتوالی راغلی دی."
    }
  },
  "travl": {
    "baseWord": "travl",
    "field": 2,
    "da": {
      "meaning": "travl",
      "sentence": "Perronen er meget travl om morgenen."
    },
    "en": {
      "meaning": "busy",
      "sentence": "The platform is very busy in the morning."
    },
    "de": {
      "meaning": "belebt / geschäftig",
      "sentence": "Am Bahnsteig herrscht morgens viel Betrieb."
    },
    "es": {
      "meaning": "concurrido / ajetreado",
      "sentence": "El andén está muy concurrido por la mañana."
    },
    "pt": {
      "meaning": "movimentado / agitado",
      "sentence": "A plataforma fica muito movimentada pela manhã."
    },
    "tr": {
      "meaning": "yoğun / hareketli",
      "sentence": "Peron sabahları çok kalabalık ve hareketlidir."
    },
    "ar": {
      "meaning": "مزدحم / حافل بالنشاط",
      "sentence": "رصيف المحطة مزدحم جداً في الصباح."
    },
    "fa": {
      "meaning": "شلوغ / پررفت‌وآمد",
      "sentence": "سکوی ایستگاه در صبح بسیار پر رفت‌وآمد است."
    },
    "ku": {
      "meaning": "qerebalix",
      "sentence": "Perona stasyonê serê sibê pir qerebalix e."
    },
    "ur": {
      "meaning": "مصروف / گہما گہم",
      "sentence": "صبح کے وقت پلیٹ فارم پر بہت گہما گہمی ہوتی ہے۔"
    },
    "ru": {
      "meaning": "оживлённый / многолюдный",
      "sentence": "Утром на платформе очень многолюдно."
    },
    "uk": {
      "meaning": "жвавий / багатолюдний",
      "sentence": "Уранці на платформі дуже людно."
    },
    "zh": {
      "meaning": "繁忙的",
      "sentence": "早晨站台上非常繁忙。"
    },
    "vi": {
      "meaning": "bận rộn, nhộn nhịp",
      "sentence": "Sân ga rất đông đúc nhộn nhịp vào buổi sáng."
    },
    "th": {
      "meaning": "พลุกพล่าน / ยุ่ง",
      "sentence": "ชานชาลารถไฟพลุกพล่านมากในตอนเช้า"
    },
    "ne": {
      "meaning": "व्यस्त",
      "sentence": "बिहानको समयमा प्लेटफर्म धेरै व्यस्त हुन्छ।"
    },
    "ps": {
      "meaning": "بوخت / بیروبار لرونکی",
      "sentence": "د سهار په وخت کې پلیټ فارم ډېر بوخت (بیروبار) وي."
    }
  },
  "rolig": {
    "baseWord": "rolig",
    "field": 2,
    "da": {
      "meaning": "rolig",
      "sentence": "Manden sidder i et roligt hjørne og drikker kaffe."
    },
    "en": {
      "meaning": "quiet / calm",
      "sentence": "The man is sitting in a quiet corner drinking coffee."
    },
    "de": {
      "meaning": "ruhig / friedlich",
      "sentence": "Der Mann sitzt in einer ruhigen Ecke und trinkt Kaffee."
    },
    "es": {
      "meaning": "tranquilo / apacible",
      "sentence": "El hombre está sentado en un rincón tranquilo tomando café."
    },
    "pt": {
      "meaning": "tranquilo / calmo",
      "sentence": "O homem está sentado em um canto tranquilo tomando café."
    },
    "tr": {
      "meaning": "sakin / huzurlu",
      "sentence": "Adam sakin bir köşede oturup kahve içiyor."
    },
    "ar": {
      "meaning": "هادئ",
      "sentence": "يجلس الرجل في زاوية هادئة ويشرب القهوة."
    },
    "fa": {
      "meaning": "آرام / دنج",
      "sentence": "مرد در گوشه‌ای آرام و دنج نشسته و قهوه می‌نوشد."
    },
    "ku": {
      "meaning": "aram / bêdeng",
      "sentence": "Zilam di goşeyekî aram de rûniştiye û qehweyê vedixwe."
    },
    "ur": {
      "meaning": "پُرسکون",
      "sentence": "آدمی ایک پُرسکون کونے میں بیٹھ کر کافی پی رہا ہے۔"
    },
    "ru": {
      "meaning": "спокойный / тихий",
      "sentence": "Мужчина сидит в тихом уголке и пьёт кофе."
    },
    "uk": {
      "meaning": "спокійний / тихий",
      "sentence": "Чоловік сидить у тихому куточку і п'є каву."
    },
    "zh": {
      "meaning": "安静的 / 宁静的",
      "sentence": "那个男人坐在安静的角落里喝咖啡。"
    },
    "vi": {
      "meaning": "yên tĩnh, thanh bình",
      "sentence": "Người đàn ông ngồi trong một góc yên tĩnh uống cà phê."
    },
    "th": {
      "meaning": "เงียบสงบ",
      "sentence": "ชายคนนี้นั่งดื่มกาแฟอยู่ในมุมที่เงียบสงบ"
    },
    "ne": {
      "meaning": "शान्त",
      "sentence": "मानिस शान्त कुनामा बसेर कफी पिइरहेको छ।"
    },
    "ps": {
      "meaning": "ارام / ارامښته",
      "sentence": "سړی په یو ارام کونج کې ناست دی او قهوه څښي."
    }
  },
  "forsinket": {
    "baseWord": "forsinket",
    "field": 2,
    "da": {
      "meaning": "forsinket",
      "sentence": "Toget til Odense er 10 minutter forsinket."
    },
    "en": {
      "meaning": "delayed / late",
      "sentence": "The train to Odense is 10 minutes delayed."
    },
    "de": {
      "meaning": "verspätet",
      "sentence": "Der Zug nach Odense hat 10 Minuten Verspätung."
    },
    "es": {
      "meaning": "retrasado / con retraso",
      "sentence": "El tren a Odense lleva 10 minutos de retraso."
    },
    "pt": {
      "meaning": "atrasado",
      "sentence": "O trem para Odense está 10 minutos atrasado."
    },
    "tr": {
      "meaning": "gecikmeli / rötarlı",
      "sentence": "Odense treni 10 dakika gecikmeli."
    },
    "ar": {
      "meaning": "متأخر",
      "sentence": "القطار إلى أودنسه متأخر 10 دقائق."
    },
    "fa": {
      "meaning": "دارای تأخیر / دیرکرده",
      "sentence": "قطار به مقصد اودنسه ۱۰ دقیقه تأخیر دارد."
    },
    "ku": {
      "meaning": "derengmayî",
      "sentence": "Trêna ber bi Odenseyê ve 10 deqîqe dereng maye."
    },
    "ur": {
      "meaning": "تاخیر کا شکار / لیٹ",
      "sentence": "اوڈنسے جانے والی ٹرین 10 منٹ لیٹ ہے۔"
    },
    "ru": {
      "meaning": "опоздавший / задержанный",
      "sentence": "Поезд в Оденсе опаздывает на 10 минут."
    },
    "uk": {
      "meaning": "затриманий / спізнілий",
      "sentence": "Поїзд до Оденсе затримується на 10 хвилин."
    },
    "zh": {
      "meaning": "晚点的 / 延误的",
      "sentence": "开往欧登塞的火车晚点了10分钟。"
    },
    "vi": {
      "meaning": "bị trễ, bị muộn",
      "sentence": "Tàu đi Odense bị trễ 10 phút."
    },
    "th": {
      "meaning": "ล่าช้า",
      "sentence": "รถไฟไปโอเดนเซล่าช้าไป 10 นาที"
    },
    "ne": {
      "meaning": "ढिलो भएको / ढिलाइ",
      "sentence": "ओडेन्से जाने रेल १० मिनेट ढिलो छ।"
    },
    "ps": {
      "meaning": "ځنډېدلی",
      "sentence": "اوډینس ته ریل ګاډی ۱۰ دقیقې ځنډېدلی دی."
    }
  },
  "punktlig": {
    "baseWord": "punktlig",
    "field": 2,
    "da": {
      "meaning": "punktlig",
      "sentence": "Toget til Odense er altid punktligt."
    },
    "en": {
      "meaning": "punctual / on time",
      "sentence": "The train to Odense is always punctual."
    },
    "de": {
      "meaning": "pünktlich",
      "sentence": "Der Zug nach Odense ist immer pünktlich."
    },
    "es": {
      "meaning": "puntual",
      "sentence": "El tren a Odense siempre es puntual."
    },
    "pt": {
      "meaning": "pontual",
      "sentence": "O trem para Odense é sempre pontual."
    },
    "tr": {
      "meaning": "dakik",
      "sentence": "Odense treni her zaman dakiktir."
    },
    "ar": {
      "meaning": "دقيق في المواعيد",
      "sentence": "القطار إلى أودنسه دقيق في مواعيده دائماً."
    },
    "fa": {
      "meaning": "دقیق / سر وقت",
      "sentence": "قطار اودنسه همیشه سر وقت و دقیق است."
    },
    "ku": {
      "meaning": "serwext / di wextê xwe de",
      "sentence": "Trêna ber bi Odenseyê ve her tim serwext e."
    },
    "ur": {
      "meaning": "وقت کا پابند",
      "sentence": "اوڈنسے جانے والی ٹرین ہمیشہ وقت کی پابند ہوتی ہے۔"
    },
    "ru": {
      "meaning": "пунктуальный / точный",
      "sentence": "Поезд в Оденсе всегда приходит вовремя."
    },
    "uk": {
      "meaning": "пунктуальний",
      "sentence": "Поїзд до Оденсе завжди ходить вчасно."
    },
    "zh": {
      "meaning": "准时的",
      "sentence": "开往欧登塞的火车总是很准时。"
    },
    "vi": {
      "meaning": "đúng giờ",
      "sentence": "Tàu đi Odense luôn luôn đúng giờ."
    },
    "th": {
      "meaning": "ตรงเวลา",
      "sentence": "รถไฟไปโอเดนเซตรงเวลาเสมอ"
    },
    "ne": {
      "meaning": "समयनिष्ठ / समयमा आउने",
      "sentence": "ओडेन्से जाने रेल सधैं समयनिष्ठ हुन्छ।"
    },
    "ps": {
      "meaning": "پر وخت / دقیق",
      "sentence": "اوډینس ته ریل ګاډی تل پر وخت وي."
    }
  },
  "god": {
    "baseWord": "god",
    "field": 3,
    "da": {
      "meaning": "god",
      "sentence": "Kaffen på caféen er rigtig god."
    },
    "en": {
      "meaning": "good",
      "sentence": "The coffee at the café is really good."
    },
    "de": {
      "meaning": "gut",
      "sentence": "Der Kaffee im Café ist wirklich gut."
    },
    "es": {
      "meaning": "bueno",
      "sentence": "El café de la cafetería está muy bueno."
    },
    "pt": {
      "meaning": "bom",
      "sentence": "O café da cafeteria é muito bom."
    },
    "tr": {
      "meaning": "iyi / güzel",
      "sentence": "Kafedeki kahve gerçekten çok güzel."
    },
    "ar": {
      "meaning": "جيد / طيب",
      "sentence": "القهوة في المقهى جيدة ولذيذة حقاً."
    },
    "fa": {
      "meaning": "خوب / باکیفیت",
      "sentence": "قهوه در کافه واقعاً خوب و عالی است."
    },
    "ku": {
      "meaning": "baş / xweş",
      "sentence": "Qehweya li kafeyê bi rastî baş e."
    },
    "ur": {
      "meaning": "اچھا / عمدہ",
      "sentence": "کیفے کی کافی واقعی بہت اچھی ہے۔"
    },
    "ru": {
      "meaning": "хороший / вкусный",
      "sentence": "Кофе в этом кафе действительно очень хороший."
    },
    "uk": {
      "meaning": "хороший / смачний",
      "sentence": "Кава в кав'ярні дійсно дуже хороша."
    },
    "zh": {
      "meaning": "好的 / 美味的",
      "sentence": "这家咖啡馆的咖啡非常好喝。"
    },
    "vi": {
      "meaning": "tốt, ngon",
      "sentence": "Cà phê ở quán cà phê thực sự rất ngon."
    },
    "th": {
      "meaning": "ดี / อร่อย",
      "sentence": "กาแฟที่ร้านกาแฟอร่อยดีจริงๆ"
    },
    "ne": {
      "meaning": "राम्रो / मीठो",
      "sentence": "क्याफेको कफी साँच्चै राम्रो (मीठो) छ।"
    },
    "ps": {
      "meaning": "ښه",
      "sentence": "په کافي کې قهوه واقعیا ښه ده."
    }
  },
  "dårlig": {
    "baseWord": "dårlig",
    "field": 3,
    "da": {
      "meaning": "dårlig",
      "sentence": "Maden på restauranten var meget dårlig."
    },
    "en": {
      "meaning": "bad",
      "sentence": "The food at the restaurant was very bad."
    },
    "de": {
      "meaning": "schlecht",
      "sentence": "Das Essen im Restaurant war sehr schlecht."
    },
    "es": {
      "meaning": "malo",
      "sentence": "La comida del restaurante era muy mala."
    },
    "pt": {
      "meaning": "ruim",
      "sentence": "A comida do restaurante estava muito ruim."
    },
    "tr": {
      "meaning": "kötü",
      "sentence": "Restorandaki yemek çok kötüydü."
    },
    "ar": {
      "meaning": "سيء / رديء",
      "sentence": "كان الطعام في المطعم سيئاً جداً."
    },
    "fa": {
      "meaning": "بد / نامرغوب",
      "sentence": "غذای رستوران بسیار بد بود."
    },
    "ku": {
      "meaning": "xirab",
      "sentence": "Xwarina li restorantê pir xirab bû."
    },
    "ur": {
      "meaning": "برا / خراب",
      "sentence": "ریستوران کا کھانا بہت خراب تھا۔"
    },
    "ru": {
      "meaning": "плохой",
      "sentence": "Еда в ресторане была очень плохой."
    },
    "uk": {
      "meaning": "поганий",
      "sentence": "Їжа в ресторані була дуже поганою."
    },
    "zh": {
      "meaning": "差的 / 糟糕的",
      "sentence": "这家餐馆的饭菜非常糟糕。"
    },
    "vi": {
      "meaning": "tệ, dở",
      "sentence": "Đồ ăn ở nhà hàng rất tệ."
    },
    "th": {
      "meaning": "แย่ / ไม่ดี",
      "sentence": "อาหารที่ร้านอาหารแย่มาก"
    },
    "ne": {
      "meaning": "नराम्रो",
      "sentence": "रेस्टुरेन्टको खाना धेरै नराम्रो थियो।"
    },
    "ps": {
      "meaning": "خراب",
      "sentence": "په رستورانت کې خواړه ډېر خراب وو."
    }
  },
  "let_3": {
    "baseWord": "let",
    "field": 3,
    "da": {
      "meaning": "let",
      "sentence": "Lektien til i dag er meget let."
    },
    "en": {
      "meaning": "easy (not hard)",
      "sentence": "The homework for today is very easy."
    },
    "de": {
      "meaning": "einfach / leicht",
      "sentence": "Die Hausaufgabe für heute ist sehr leicht."
    },
    "es": {
      "meaning": "fácil / sencillo",
      "sentence": "Los deberes para hoy son muy fáciles."
    },
    "pt": {
      "meaning": "fácil / simples",
      "sentence": "A lição de casa de hoje é muito fácil."
    },
    "tr": {
      "meaning": "kolay / basit",
      "sentence": "Bugünkü ödev çok kolay."
    },
    "ar": {
      "meaning": "سهل",
      "sentence": "واجب اليوم سهل جداً."
    },
    "fa": {
      "meaning": "آسان / راحت",
      "sentence": "تکلیف امروز بسیار آسان است."
    },
    "ku": {
      "meaning": "hêsan",
      "sentence": "Dersa îro pir hêsan e."
    },
    "ur": {
      "meaning": "آسان",
      "sentence": "آج کا ہوم ورک بہت آسان ہے۔"
    },
    "ru": {
      "meaning": "лёгкий (простой)",
      "sentence": "Домашнее задание на сегодня очень лёгкое."
    },
    "uk": {
      "meaning": "легкий (простий)",
      "sentence": "Домашнє завдання на сьогодні дуже легке."
    },
    "zh": {
      "meaning": "容易的 / 简单的 (非困难)",
      "sentence": "今天的家庭作业非常容易。"
    },
    "vi": {
      "meaning": "dễ (không khó)",
      "sentence": "Bài tập hôm nay rất dễ."
    },
    "th": {
      "meaning": "ง่าย",
      "sentence": "การบ้านสำหรับวันนี้ง่ายมาก"
    },
    "ne": {
      "meaning": "सजिलो",
      "sentence": "आजको गृहकार्य धेरै सजिलो छ।"
    },
    "ps": {
      "meaning": "اسانه",
      "sentence": "د نن ورځې کورنی کار ډېر اسانه دی."
    }
  },
  "svær": {
    "baseWord": "svær",
    "field": 3,
    "da": {
      "meaning": "svær",
      "sentence": "Opgaven i skolen er meget svær."
    },
    "en": {
      "meaning": "difficult / hard",
      "sentence": "The task at school is very difficult."
    },
    "de": {
      "meaning": "schwer / schwierig",
      "sentence": "Die Aufgabe in der Schule ist sehr schwer."
    },
    "es": {
      "meaning": "difícil",
      "sentence": "La tarea de la escuela es muy difícil."
    },
    "pt": {
      "meaning": "difícil",
      "sentence": "A tarefa da escola é muito difícil."
    },
    "tr": {
      "meaning": "zor",
      "sentence": "Okuldaki ödev çok zor."
    },
    "ar": {
      "meaning": "صعب",
      "sentence": "المهمة في المدرسة صعبة جداً."
    },
    "fa": {
      "meaning": "سخت / دشوار",
      "sentence": "تکلیف مدرسه بسیار سخت و دشوار است."
    },
    "ku": {
      "meaning": "dijwar / zehmet",
      "sentence": "Erkê li dibistanê pir dijwar e."
    },
    "ur": {
      "meaning": "مشکل / کٹھن",
      "sentence": "سکول کا کام بہت مشکل ہے۔"
    },
    "ru": {
      "meaning": "трудный / сложный",
      "sentence": "Задание в школе очень трудное."
    },
    "uk": {
      "meaning": "складний / важкий",
      "sentence": "Завдання в школі дуже складне."
    },
    "zh": {
      "meaning": "难的 / 复杂的",
      "sentence": "学校里的任务非常难。"
    },
    "vi": {
      "meaning": "khó, phức tạp",
      "sentence": "Bài tập ở trường rất khó."
    },
    "th": {
      "meaning": "ยาก",
      "sentence": "โจทย์ที่โรงเรียนยากมาก"
    },
    "ne": {
      "meaning": "गाह्रो / कठिन",
      "sentence": "विद्यालयको काम धेरै गाह्रो छ।"
    },
    "ps": {
      "meaning": "سخت / ستونزمن",
      "sentence": "په ښوونځي کې دنده ډېره ستونزمنه ده."
    }
  },
  "dyr": {
    "baseWord": "dyr",
    "field": 3,
    "da": {
      "meaning": "dyr",
      "sentence": "Gulduret i butiksvinduet er meget dyrt."
    },
    "en": {
      "meaning": "expensive",
      "sentence": "The gold watch in the shop window is very expensive."
    },
    "de": {
      "meaning": "teuer",
      "sentence": "Die Golduhr im Schaufenster ist sehr teuer."
    },
    "es": {
      "meaning": "caro",
      "sentence": "El reloj de oro del escaparate es muy caro."
    },
    "pt": {
      "meaning": "caro",
      "sentence": "O relógio de ouro na vitrine é muito caro."
    },
    "tr": {
      "meaning": "pahalı",
      "sentence": "Vitrindeki altın saat çok pahalı."
    },
    "ar": {
      "meaning": "غالٍ / باهظ الثمن",
      "sentence": "الساعة الذهبية في واجهة المحل باهظة الثمن جداً."
    },
    "fa": {
      "meaning": "گران / گران‌قیمت",
      "sentence": "ساعت طلا در ویترین مغازه بسیار گران است."
    },
    "ku": {
      "meaning": "biha / buha",
      "sentence": "Saeta zêrîn a di wîtrîna dikanê de pir biha ye."
    },
    "ur": {
      "meaning": "مہنگا",
      "sentence": "دکان کی کھڑکی میں سونے کی گھڑی بہت مہنگی ہے۔"
    },
    "ru": {
      "meaning": "дорогой (по цене)",
      "sentence": "Золотые часы в витрине магазина очень дорогие."
    },
    "uk": {
      "meaning": "дорогий",
      "sentence": "Золотий годинник у вітрині магазину дуже дорогий."
    },
    "zh": {
      "meaning": "贵的 / 昂贵的",
      "sentence": "商店橱窗里的金表非常昂贵。"
    },
    "vi": {
      "meaning": "đắt",
      "sentence": "Chiếc đồng hồ vàng trong tủ kính cửa hàng rất đắt tiền."
    },
    "th": {
      "meaning": "แพง",
      "sentence": "นาฬิกาทองในตู้กระจกหน้าร้านแพงมาก"
    },
    "ne": {
      "meaning": "महङ्गो",
      "sentence": "पसलको झ्यालमा भएको सुनको घडी धेरै महङ्गो छ।"
    },
    "ps": {
      "meaning": "ګران / قيمتي",
      "sentence": "د پلورنځي په کړکۍ کې د سرو زرو ساعت ډېر ګران دی."
    }
  },
  "billig": {
    "baseWord": "billig",
    "field": 3,
    "da": {
      "meaning": "billig",
      "sentence": "Cyklen i genbrugsbutikken var meget billig."
    },
    "en": {
      "meaning": "cheap / inexpensive",
      "sentence": "The bicycle in the thrift shop was very cheap."
    },
    "de": {
      "meaning": "günstig / billig",
      "sentence": "Das Fahrrad im Gebrauchtwarenladen war sehr günstig."
    },
    "es": {
      "meaning": "barato / económico",
      "sentence": "La bicicleta en la tienda de segunda mano era muy barata."
    },
    "pt": {
      "meaning": "barato",
      "sentence": "A bicicleta na loja de segunda mão foi muito barata."
    },
    "tr": {
      "meaning": "ucuz",
      "sentence": "İkinci el dükkanındaki bisiklet çok ucuzdu."
    },
    "ar": {
      "meaning": "رخيص",
      "sentence": "كانت الدراجة في متجر المستعمل رخيصة جداً."
    },
    "fa": {
      "meaning": "ارزان",
      "sentence": "دوچرخه در فروشگاه دست‌دوم بسیار ارزان بود."
    },
    "ku": {
      "meaning": "erzan",
      "sentence": "Bîsîkleta li dikana destê duyem pir erzan bû."
    },
    "ur": {
      "meaning": "سستا",
      "sentence": "پرانے سامان کی دکان میں سائیکل بہت سستی تھی۔"
    },
    "ru": {
      "meaning": "дешёвый",
      "sentence": "Велосипед в секонд-хенде был очень дешёвым."
    },
    "uk": {
      "meaning": "дешевий",
      "sentence": "Велосипед у комісійному магазині був дуже дешевим."
    },
    "zh": {
      "meaning": "便宜的",
      "sentence": "二手店里的那辆自行车非常便宜。"
    },
    "vi": {
      "meaning": "rẻ",
      "sentence": "Chiếc xe đạp ở tiệm đồ cũ rất rẻ."
    },
    "th": {
      "meaning": "ถูก / ราคาถูก",
      "sentence": "จักรยานที่ร้านขายของมือสองราคาถูกมาก"
    },
    "ne": {
      "meaning": "सस्तो",
      "sentence": "पुनः प्रयोग पसलको साइकल धेरै सस्तो थियो।"
    },
    "ps": {
      "meaning": "ارزان",
      "sentence": "د زړو توکو په پلورنځي کې بایسکل ډېر ارزان و."
    }
  },
  "vigtig": {
    "baseWord": "vigtig",
    "field": 3,
    "da": {
      "meaning": "vigtig",
      "sentence": "Brevet fra lægen er meget vigtigt."
    },
    "en": {
      "meaning": "important",
      "sentence": "The letter from the doctor is very important."
    },
    "de": {
      "meaning": "wichtig",
      "sentence": "Der Brief vom Arzt ist sehr wichtig."
    },
    "es": {
      "meaning": "importante",
      "sentence": "La carta del médico es muy importante."
    },
    "pt": {
      "meaning": "importante",
      "sentence": "A carta do médico é muito importante."
    },
    "tr": {
      "meaning": "önemli",
      "sentence": "Doktordan gelen mektup çok önemli."
    },
    "ar": {
      "meaning": "مهم",
      "sentence": "رسالة الطبيب مهمة جداً."
    },
    "fa": {
      "meaning": "مهم",
      "sentence": "نامه پزشک بسیار مهم است."
    },
    "ku": {
      "meaning": "girîng",
      "sentence": "Nameya ji aliyê doktor ve pir girîng e."
    },
    "ur": {
      "meaning": "اہم",
      "sentence": "ڈاکٹر کا خط بہت اہم ہے۔"
    },
    "ru": {
      "meaning": "важный",
      "sentence": "Письмо от врача очень важное."
    },
    "uk": {
      "meaning": "важливий",
      "sentence": "Лист від лікаря дуже важливий."
    },
    "zh": {
      "meaning": "重要的",
      "sentence": "医生的来信非常重要。"
    },
    "vi": {
      "meaning": "quan trọng",
      "sentence": "Bức thư của bác sĩ rất quan trọng."
    },
    "th": {
      "meaning": "สำคัญ",
      "sentence": "จดหมายจากคุณหมอมีความสำคัญมาก"
    },
    "ne": {
      "meaning": "महत्त्वपूर्ण",
      "sentence": "डाक्टरको पत्र धेरै महत्त्वपूर्ण छ।"
    },
    "ps": {
      "meaning": "مهم",
      "sentence": "د ډاکټر لخوا لیک ډېر مهم دی."
    }
  },
  "ligegyldig": {
    "baseWord": "ligegyldig",
    "field": 3,
    "da": {
      "meaning": "ligegyldig",
      "sentence": "Beskeden i telefonen var helt ligegyldig."
    },
    "en": {
      "meaning": "unimportant / trivial",
      "sentence": "The message on the phone was completely unimportant."
    },
    "de": {
      "meaning": "unwichtig / belanglos",
      "sentence": "Die Nachricht auf dem Telefon war völlig belanglos."
    },
    "es": {
      "meaning": "sin importancia / trivial",
      "sentence": "El mensaje del teléfono no tenía ninguna importancia."
    },
    "pt": {
      "meaning": "irrelevante / sem importância",
      "sentence": "A mensagem no celular era completamente irrelevante."
    },
    "tr": {
      "meaning": "önemsiz",
      "sentence": "Telefondaki mesaj tamamen önemsizdi."
    },
    "ar": {
      "meaning": "غير مهم / تافه",
      "sentence": "كانت الرسالة على الهاتف غير مهمة تماماً."
    },
    "fa": {
      "meaning": "بی‌اهمیت / ناچیز",
      "sentence": "پیام روی تلفن کاملاً بی‌اهمیت بود."
    },
    "ku": {
      "meaning": "negirîng",
      "sentence": "Peyama li ser telefonê bi temamî negirîng bû."
    },
    "ur": {
      "meaning": "غیر اہم / معمولی",
      "sentence": "فون پر آنے والا پیغام بالکل غیر اہم تھا۔"
    },
    "ru": {
      "meaning": "неважный / незначительный",
      "sentence": "Сообщение в телефоне было совершенно неважным."
    },
    "uk": {
      "meaning": "неважливий / незначний",
      "sentence": "Повідомлення в телефоні було абсолютно неважливим."
    },
    "zh": {
      "meaning": "无关紧要的",
      "sentence": "手机里的那条留言完全无关紧要。"
    },
    "vi": {
      "meaning": "không quan trọng, vô nghĩa",
      "sentence": "Tin nhắn trên điện thoại hoàn toàn không quan trọng."
    },
    "th": {
      "meaning": "ไม่สำคัญ / ไร้สาระ",
      "sentence": "ข้อความในโทรศัพท์ไม่ได้มีความสำคัญอะไรเลย"
    },
    "ne": {
      "meaning": "महत्त्वहीन / अर्थहीन",
      "sentence": "फोनको सन्देश पूरै महत्त्वहीन थियो।"
    },
    "ps": {
      "meaning": "بې اهمیته",
      "sentence": "په تلیفون کې پیغام په بشپړه توګه بې اهمیته و."
    }
  },
  "nødvendig": {
    "baseWord": "nødvendig",
    "field": 3,
    "da": {
      "meaning": "nødvendig",
      "sentence": "En varm jakke er nødvendig om vinteren."
    },
    "en": {
      "meaning": "necessary",
      "sentence": "A warm jacket is necessary in winter."
    },
    "de": {
      "meaning": "notwendig / nötig",
      "sentence": "Eine warme Jacke ist im Winter notwendig."
    },
    "es": {
      "meaning": "necesario",
      "sentence": "Una chaqueta abrigada es necesaria en invierno."
    },
    "pt": {
      "meaning": "necessário",
      "sentence": "Um casaco quente é necessário no inverno."
    },
    "tr": {
      "meaning": "gerekli / zorunlu",
      "sentence": "Kışın sıcak tutan bir mont gereklidir."
    },
    "ar": {
      "meaning": "ضروري",
      "sentence": "السترة الدافئة ضرورية في الشتاء."
    },
    "fa": {
      "meaning": "ضروری / لازم",
      "sentence": "یک کاپشن گرم در زمستان ضروری است."
    },
    "ku": {
      "meaning": "pêwîst",
      "sentence": "Çakêtekî germ di zivistanê de pêwîst e."
    },
    "ur": {
      "meaning": "ضروری",
      "sentence": "سردیوں میں گرم جیکٹ ضروری ہوتی ہے۔"
    },
    "ru": {
      "meaning": "необходимый",
      "sentence": "Тёплая куртка зимой просто необходима."
    },
    "uk": {
      "meaning": "необхідний",
      "sentence": "Тепла куртка взимку просто необхідна."
    },
    "zh": {
      "meaning": "必要的",
      "sentence": "冬天保暖外套是必不可少的。"
    },
    "vi": {
      "meaning": "cần thiết",
      "sentence": "Một chiếc áo khoác ấm là cần thiết vào mùa đông."
    },
    "th": {
      "meaning": "จำเป็น",
      "sentence": "เสื้อแจ็กเก็ตอุ่นๆ เป็นสิ่งจำเป็นในฤดูหนาว"
    },
    "ne": {
      "meaning": "आवश्यक",
      "sentence": "जाडोमा न्यानो ज्याकेट आवश्यक हुन्छ।"
    },
    "ps": {
      "meaning": "اړین / ضروري",
      "sentence": "په ژمي کې یو تود جاکټ اړین دی."
    }
  },
  "unødvendig": {
    "baseWord": "unødvendig",
    "field": 3,
    "da": {
      "meaning": "unødvendig",
      "sentence": "En ekstra taske er helt unødvendig."
    },
    "en": {
      "meaning": "unnecessary",
      "sentence": "An extra bag is completely unnecessary."
    },
    "de": {
      "meaning": "unnötig",
      "sentence": "Eine zusätzliche Tasche ist völlig unnötig."
    },
    "es": {
      "meaning": "innecesario",
      "sentence": "Una bolsa extra es completamente innecesaria."
    },
    "pt": {
      "meaning": "desnecessário",
      "sentence": "Uma bolsa extra é totalmente desnecessária."
    },
    "tr": {
      "meaning": "gereksiz",
      "sentence": "Ekstra bir çanta tamamen gereksiz."
    },
    "ar": {
      "meaning": "غير ضروري",
      "sentence": "حقيبة إضافية غير ضرورية على الإطلاق."
    },
    "fa": {
      "meaning": "غیرضروری / بی‌مورد",
      "sentence": "یک کیف اضافی کاملاً غیرضروری است."
    },
    "ku": {
      "meaning": "nepêwîst",
      "sentence": "Çenteyekî zêde bi temamî nepêwîst e."
    },
    "ur": {
      "meaning": "غیر ضروری",
      "sentence": "ایک اضافی بیگ بالکل غیر ضروری ہے۔"
    },
    "ru": {
      "meaning": "ненужный / лишний",
      "sentence": "Лишняя сумка совершенно не нужна."
    },
    "uk": {
      "meaning": "непотрібний / зайвий",
      "sentence": "Зайва сумка абсолютно непотрібна."
    },
    "zh": {
      "meaning": "不必要的 / 多余的",
      "sentence": "多带一个包完全是多余的。"
    },
    "vi": {
      "meaning": "không cần thiết, thừa thãi",
      "sentence": "Mang thêm một chiếc túi là hoàn toàn thừa thãi."
    },
    "th": {
      "meaning": "ไม่จำเป็น",
      "sentence": "กระเป๋าเสริมอีกใบไม่จำเป็นเลยสักนิด"
    },
    "ne": {
      "meaning": "अनावश्यक",
      "sentence": "थप झोला पूरै अनावश्यक छ।"
    },
    "ps": {
      "meaning": "غیر ضروري / نااړین",
      "sentence": "یو اضافي بکس په بشپړه توګه غیر ضروري دی."
    }
  },
  "rigtig": {
    "baseWord": "rigtig",
    "field": 3,
    "da": {
      "meaning": "rigtig",
      "sentence": "Svaret på opgaven er helt rigtigt."
    },
    "en": {
      "meaning": "correct / right",
      "sentence": "The answer to the question is completely correct."
    },
    "de": {
      "meaning": "richtig / korrekt",
      "sentence": "Die Antwort auf die Aufgabe ist völlig richtig."
    },
    "es": {
      "meaning": "correcto / acertado",
      "sentence": "La respuesta al ejercicio es totalmente correcta."
    },
    "pt": {
      "meaning": "correto / certo",
      "sentence": "A resposta do exercício está totalmente correta."
    },
    "tr": {
      "meaning": "doğru",
      "sentence": "Ödevdeki yanıt tamamen doğru."
    },
    "ar": {
      "meaning": "صحيح / صائب",
      "sentence": "الإجابة على المسألة صحيحة تماماً."
    },
    "fa": {
      "meaning": "درست / صحیح",
      "sentence": "پاسخ تمرین کاملاً درست است."
    },
    "ku": {
      "meaning": "rast",
      "sentence": "Bersiva pirsê bi temamî rast e."
    },
    "ur": {
      "meaning": "صحیح / درست",
      "sentence": "سوال کا جواب بالکل درست ہے۔"
    },
    "ru": {
      "meaning": "правильный / верный",
      "sentence": "Ответ на задание совершенно верный."
    },
    "uk": {
      "meaning": "правильний / вірний",
      "sentence": "Відповідь на завдання абсолютно правильна."
    },
    "zh": {
      "meaning": "正确的",
      "sentence": "题目的答案完全正确。"
    },
    "vi": {
      "meaning": "đúng, chính xác",
      "sentence": "Câu trả lời cho bài tập hoàn toàn chính xác."
    },
    "th": {
      "meaning": "ถูกต้อง",
      "sentence": "คำตอบของโจทย์ข้อนี้ถูกต้องอย่างสมบูรณ์"
    },
    "ne": {
      "meaning": "सही",
      "sentence": "प्रश्नको उत्तर पूर्ण रूपमा सही छ।"
    },
    "ps": {
      "meaning": "سم / صحیح",
      "sentence": "د پوښتنې ځواب په بشپړه توګه سم دی."
    }
  },
  "forkert": {
    "baseWord": "forkert",
    "field": 3,
    "da": {
      "meaning": "forkert",
      "sentence": "Bussen kørte desværre den forkerte vej."
    },
    "en": {
      "meaning": "wrong / incorrect",
      "sentence": "Unfortunately, the bus went the wrong way."
    },
    "de": {
      "meaning": "falsch",
      "sentence": "Der Bus fuhr leider in die falsche Richtung."
    },
    "es": {
      "meaning": "equivocado / incorrecto",
      "sentence": "Desafortunadamente, el autobús fue por el camino equivocado."
    },
    "pt": {
      "meaning": "errado / incorreto",
      "sentence": "Infelizmente, o ônibus foi para o lado errado."
    },
    "tr": {
      "meaning": "yanlış",
      "sentence": "Otobüs maalesef yanlış yola gitti."
    },
    "ar": {
      "meaning": "خاطئ",
      "sentence": "لسوء الحظ، سارت الحافلة في الاتجاه الخاطئ."
    },
    "fa": {
      "meaning": "غلط / اشتباه",
      "sentence": "متأسفانه اتوبوس در مسیر اشتباه حرکت کرد."
    },
    "ku": {
      "meaning": "şaş",
      "sentence": "Mixabin otobus bi rêyeke şaş de çû."
    },
    "ur": {
      "meaning": "غلط",
      "sentence": "بدقسمتی سے بس غلط راستے پر چلی گئی۔"
    },
    "ru": {
      "meaning": "неправильный / неверный",
      "sentence": "К сожалению, автобус поехал не в ту сторону."
    },
    "uk": {
      "meaning": "неправильний",
      "sentence": "На жаль, автобус поїхав неправильним шляхом."
    },
    "zh": {
      "meaning": "错误的",
      "sentence": "很遗憾，公交车开错了路。"
    },
    "vi": {
      "meaning": "sai, nhầm",
      "sentence": "Thật không may, xe buýt đã chạy nhầm đường."
    },
    "th": {
      "meaning": "ผิด",
      "sentence": "น่าเสียดายที่รถบัสวิ่งไปผิดทาง"
    },
    "ne": {
      "meaning": "गलत",
      "sentence": "दुर्भाग्यवश बस गलत बाटोमा गयो।"
    },
    "ps": {
      "meaning": "غلط",
      "sentence": "له بده مرغه بس په غلطه لاره لاړ."
    }
  },
  "perfekt": {
    "baseWord": "perfekt",
    "field": 3,
    "da": {
      "meaning": "perfekt",
      "sentence": "Vejret på vores ferie var helt perfekt."
    },
    "en": {
      "meaning": "perfect",
      "sentence": "The weather on our holiday was completely perfect."
    },
    "de": {
      "meaning": "perfekt",
      "sentence": "Das Wetter in unserem Urlaub war absolut perfekt."
    },
    "es": {
      "meaning": "perfecto",
      "sentence": "El tiempo durante nuestras vacaciones fue totalmente perfecto."
    },
    "pt": {
      "meaning": "perfeito",
      "sentence": "O tempo nas nossas férias foi perfeito."
    },
    "tr": {
      "meaning": "mükemmel / kusursuz",
      "sentence": "Tatilimizdeki hava mükemmeldi."
    },
    "ar": {
      "meaning": "مثالي / ممتاز",
      "sentence": "كان الطقس في عطلتنا مثالياً تماماً."
    },
    "fa": {
      "meaning": "عالی / بی‌نقص",
      "sentence": "آب‌وهوا در طول تعطیلات ما کاملاً عالی بود."
    },
    "ku": {
      "meaning": "bêkêmasî / kamil",
      "sentence": "Hewaya di bêhnvedana me de bi temamî bêkêmasî bû."
    },
    "ur": {
      "meaning": "بہترین / بے عیب",
      "sentence": "ہماری چھٹیوں میں موسم بالکل بہترین تھا۔"
    },
    "ru": {
      "meaning": "идеальный / совершенный",
      "sentence": "Погода во время нашего отпуска была просто идеальной."
    },
    "uk": {
      "meaning": "ідеальний",
      "sentence": "Погода під час нашої відпустки була просто ідеальною."
    },
    "zh": {
      "meaning": "完美的",
      "sentence": "我们度假时的天气完美极了。"
    },
    "vi": {
      "meaning": "hoàn hảo",
      "sentence": "Thời tiết trong kỳ nghỉ của chúng tôi hoàn toàn hoàn hảo."
    },
    "th": {
      "meaning": "สมบูรณ์แบบ",
      "sentence": "สภาพอากาศในวันหยุดของเราสมบูรณ์แบบมาก"
    },
    "ne": {
      "meaning": "उत्कृष्ट / उत्तम",
      "sentence": "हाम्रो बिदाको मौसम पूर्ण रूपमा उत्तम थियो।"
    },
    "ps": {
      "meaning": "بشپړ / بې عيبه / غوره",
      "sentence": "زموږ په رخصتۍ کې هوا په بشپړه توګه غوره وه."
    }
  },
  "mangelfuld": {
    "baseWord": "mangelfuld",
    "field": 3,
    "da": {
      "meaning": "mangelfuld",
      "sentence": "Informationen på opslaget var meget mangelfuld."
    },
    "en": {
      "meaning": "deficient / incomplete",
      "sentence": "The information on the notice was very incomplete."
    },
    "de": {
      "meaning": "unvollständig / lückenhaft",
      "sentence": "Die Information auf dem Aushang war sehr lückenhaft."
    },
    "es": {
      "meaning": "incompleto / deficiente",
      "sentence": "La información del aviso era muy incompleta."
    },
    "pt": {
      "meaning": "incompleto / insuficiente",
      "sentence": "A informação no aviso era muito insuficiente."
    },
    "tr": {
      "meaning": "yetersiz / eksik",
      "sentence": "Duyurudaki bilgi çok yetersizdi."
    },
    "ar": {
      "meaning": "ناقص / غير مكتمل",
      "sentence": "كانت المعلومات الموجودة في الإشعار ناقصة جداً."
    },
    "fa": {
      "meaning": "ناقص / ناکافی",
      "sentence": "اطلاعات روی تابلو اعلانات بسیار ناقص بود."
    },
    "ku": {
      "meaning": "kêm / kêmkêş",
      "sentence": "Agahiya li ser agahdariyê pir kêm bû."
    },
    "ur": {
      "meaning": "ناقص / ادھورا",
      "sentence": "نوٹس بورڈ پر دی گئی معلومات بہت ادھوری تھیں۔"
    },
    "ru": {
      "meaning": "неполный / недостаточный",
      "sentence": "Информация в объявлении была очень неполной."
    },
    "uk": {
      "meaning": "неповний / недостатній",
      "sentence": "Інформація в оголошенні була дуже неповною."
    },
    "zh": {
      "meaning": "有欠缺的 / 不完整的",
      "sentence": "告示上的信息非常不完整。"
    },
    "vi": {
      "meaning": "thiếu sót, chưa hoàn chỉnh",
      "sentence": "Thông tin trên bảng thông báo rất thiếu sót."
    },
    "th": {
      "meaning": "บกพร่อง / ไม่ครบถ้วน",
      "sentence": "ข้อมูลบนประกาศนั้นขาดความสมบูรณ์อย่างมาก"
    },
    "ne": {
      "meaning": "अधुरो / अपूर्ण",
      "sentence": "सूचनापाटीको जानकारी धेरै अपूर्ण थियो।"
    },
    "ps": {
      "meaning": "نیمګړی",
      "sentence": "په خبرتیا کې معلومات ډېر نیمګړي وو."
    }
  },
  "nyttig": {
    "baseWord": "nyttig",
    "field": 3,
    "da": {
      "meaning": "nyttig",
      "sentence": "En ordbog på telefonen er meget nyttig."
    },
    "en": {
      "meaning": "useful",
      "sentence": "A dictionary on the phone is very useful."
    },
    "de": {
      "meaning": "nützlich",
      "sentence": "Ein Wörterbuch auf dem Telefon ist sehr nützlich."
    },
    "es": {
      "meaning": "útil",
      "sentence": "Un diccionario en el teléfono es muy útil."
    },
    "pt": {
      "meaning": "útil",
      "sentence": "Um dicionário no celular é muito útil."
    },
    "tr": {
      "meaning": "yararlı / faydalı",
      "sentence": "Telefonda bir sözlük bulunması çok faydalıdır."
    },
    "ar": {
      "meaning": "مفيد / نافع",
      "sentence": "القاموس على الهاتف مفيد جداً."
    },
    "fa": {
      "meaning": "مفید / کاربردی",
      "sentence": "یک فرهنگ لغت در گوشی بسیار مفید و کاربردی است."
    },
    "ku": {
      "meaning": "bikêrhatî / feydedar",
      "sentence": "Ferhengek li ser telefonê pir bikêrhatî ye."
    },
    "ur": {
      "meaning": "مفید / کارآمد",
      "sentence": "فون پر لغت بہت مفید ہوتی ہے۔"
    },
    "ru": {
      "meaning": "полезный",
      "sentence": "Словарь в телефоне очень полезен."
    },
    "uk": {
      "meaning": "корисний",
      "sentence": "Словник у телефоні дуже корисний."
    },
    "zh": {
      "meaning": "有用的",
      "sentence": "手机里的词典非常有用。"
    },
    "vi": {
      "meaning": "hữu ích",
      "sentence": "Từ điển trên điện thoại rất hữu ích."
    },
    "th": {
      "meaning": "มีประโยชน์",
      "sentence": "พจนานุกรมในโทรศัพท์มีประโยชน์มาก"
    },
    "ne": {
      "meaning": "उपयोगी",
      "sentence": "फोनमा भएको शब्दकोश धेरै उपयोगी हुन्छ।"
    },
    "ps": {
      "meaning": "ګټور / په کار راتلونکی",
      "sentence": "په تلیفون کې قاموس ډېر ګټور دی."
    }
  },
  "ubrugelig": {
    "baseWord": "ubrugelig",
    "field": 3,
    "da": {
      "meaning": "ubrugelig",
      "sentence": "Den bøjede nøgle passer ikke til låsen og er ubrugelig."
    },
    "en": {
      "meaning": "useless",
      "sentence": "The bent key does not fit the lock and is useless."
    },
    "de": {
      "meaning": "unbrauchbar / nutzlos",
      "sentence": "Der verbogene Schlüssel passt nicht ins Schloss und ist unbrauchbar."
    },
    "es": {
      "meaning": "inútil / inservible",
      "sentence": "La llave doblada no cabe en la cerradura y es inservible."
    },
    "pt": {
      "meaning": "inútil / imprestável",
      "sentence": "A chave torta não entra na fechadura e é inútil."
    },
    "tr": {
      "meaning": "kullanışsız / işe yaramaz",
      "sentence": "Eğrilmiş anahtar kilide uymuyor ve hiçbir işe yaramaz."
    },
    "ar": {
      "meaning": "عديم الفائدة / غير صالح للاستخدام",
      "sentence": "المفتاح المعوج لا يناسب القفل وهو عديم الفائدة."
    },
    "fa": {
      "meaning": "غیرقابل‌استفاده / بی‌مصرف",
      "sentence": "کلید کج‌شده به قفل نمی‌خورد و غیرقابل‌استفاده است."
    },
    "ku": {
      "meaning": "bêkêr",
      "sentence": "Mifteya xwar li kilîtê nayê û bêkêr e."
    },
    "ur": {
      "meaning": "بیکار / ناکارہ",
      "sentence": "مڑی ہوئی چابی تالے میں نہیں لگتی اور بیکار ہے۔"
    },
    "ru": {
      "meaning": "бесполезный / непригодный",
      "sentence": "Погнутый ключ не подходит к замку и совершенно бесполезен."
    },
    "uk": {
      "meaning": "непридатний / непотрібний",
      "sentence": "Зігнутий ключ не підходить до замка і є абсолютно непридатним."
    },
    "zh": {
      "meaning": "没用的 / 无法使用的",
      "sentence": "弯曲的钥匙插不进锁孔，根本没法用。"
    },
    "vi": {
      "meaning": "vô dụng, không dùng được",
      "sentence": "Chiếc chìa khóa bị cong không vừa ổ khóa và trở nên vô dụng."
    },
    "th": {
      "meaning": "ไร้ประโยชน์ / ใช้การไม่ได้",
      "sentence": "กุญแจที่งอไขแม่กุญแจไม่ได้และใช้การไม่ได้เลย"
    },
    "ne": {
      "meaning": "बेकार / काम नलाग्ने",
      "sentence": "बाङ्गो भएको चाबी तालामा मिल्दैन र काम नलाग्ने छ।"
    },
    "ps": {
      "meaning": "بې ګټې / بې کاره",
      "sentence": "کږه شوې کيلۍ قلف ته نه برابرېږي او بې کاره ده."
    }
  },
  "gratis": {
    "baseWord": "gratis",
    "field": 3,
    "da": {
      "meaning": "gratis",
      "sentence": "Kaffen på sprogskolen er helt gratis."
    },
    "en": {
      "meaning": "free (of charge)",
      "sentence": "The coffee at the language school is completely free."
    },
    "de": {
      "meaning": "kostenlos / gratis",
      "sentence": "Der Kaffee an der Sprachschule ist vollkommen kostenlos."
    },
    "es": {
      "meaning": "gratis / gratuito",
      "sentence": "El café en la escuela de idiomas es totalmente gratis."
    },
    "pt": {
      "meaning": "grátis / gratuito",
      "sentence": "O café na escola de idiomas é inteiramente gratuito."
    },
    "tr": {
      "meaning": "ücretsiz / bedava",
      "sentence": "Dil okulundaki kahve tamamen ücretsiz."
    },
    "ar": {
      "meaning": "مجاني",
      "sentence": "القهوة في مدرسة اللغات مجانية تماماً."
    },
    "fa": {
      "meaning": "رایگان / مجانی",
      "sentence": "قهوه در مدرسه زبان کاملاً رایگان است."
    },
    "ku": {
      "meaning": "bêpere / belaş",
      "sentence": "Qehweya li dibistana ziman bi temamî bêpere ye."
    },
    "ur": {
      "meaning": "مفت",
      "sentence": "لینگویج سکول میں کافی بالکل مفت ہے۔"
    },
    "ru": {
      "meaning": "бесплатный",
      "sentence": "Кофе в языковой школе совершенно бесплатный."
    },
    "uk": {
      "meaning": "безкоштовний",
      "sentence": "Кава в мовній школі абсолютно безкоштовна."
    },
    "zh": {
      "meaning": "免费的",
      "sentence": "语言学校里的咖啡是完全免费的。"
    },
    "vi": {
      "meaning": "miễn phí",
      "sentence": "Cà phê ở trường ngôn ngữ hoàn toàn miễn phí."
    },
    "th": {
      "meaning": "ฟรี",
      "sentence": "กาแฟที่โรงเรียนสอนภาษาฟรีทั้งหมด"
    },
    "ne": {
      "meaning": "निःशुल्क / सित्तैंमा",
      "sentence": "भाषा विद्यालयमा कफी पूरै निःशुल्क छ।"
    },
    "ps": {
      "meaning": "وړیا / وړیا",
      "sentence": "د ژبې په ښوونځي کې قهوه په بشپړه توګه وړیا ده."
    }
  },
  "betalt": {
    "baseWord": "betalt",
    "field": 3,
    "da": {
      "meaning": "betalt",
      "sentence": "Regningen for huslejen er allerede betalt."
    },
    "en": {
      "meaning": "paid",
      "sentence": "The bill for the rent has already been paid."
    },
    "de": {
      "meaning": "bezahlt",
      "sentence": "Die Mietrechnung ist bereits bezahlt."
    },
    "es": {
      "meaning": "pagado",
      "sentence": "El recibo del alquiler ya está pagado."
    },
    "pt": {
      "meaning": "pago",
      "sentence": "A conta do aluguel já está paga."
    },
    "tr": {
      "meaning": "ödenmiş",
      "sentence": "Kira faturası şimdiden ödendi."
    },
    "ar": {
      "meaning": "مدفوع",
      "sentence": "فاتورة الإيجار مدفوعة بالفعل."
    },
    "fa": {
      "meaning": "پرداخت‌شده",
      "sentence": "قبض اجاره‌خانه قبلاً پرداخت شده است."
    },
    "ku": {
      "meaning": "hatiye dayîn",
      "sentence": "Fatureya heqê xênî berê hatiye dayîn."
    },
    "ur": {
      "meaning": "ادا شدہ / ادا کیا گیا",
      "sentence": "کرائے کا بل پہلے ہی ادا کر دیا گیا ہے۔"
    },
    "ru": {
      "meaning": "оплаченный",
      "sentence": "Счёт за аренду жилья уже оплачен."
    },
    "uk": {
      "meaning": "оплачений",
      "sentence": "Рахунок за оренду житла вже оплачено."
    },
    "zh": {
      "meaning": "已付款的",
      "sentence": "房租账单已经付清了。"
    },
    "vi": {
      "meaning": "đã thanh toán",
      "sentence": "Hóa đơn tiền thuê nhà đã được thanh toán rồi."
    },
    "th": {
      "meaning": "จ่ายแล้ว",
      "sentence": "บิลค่าเช่าบ้านจ่ายเรียบร้อยแล้ว"
    },
    "ne": {
      "meaning": "तिरेको / भुक्तान गरिएको",
      "sentence": "घरभाडाको बिल पहिले नै तिरिसकिएको छ।"
    },
    "ps": {
      "meaning": "ورکړل شوی / ادا شوی",
      "sentence": "د کرایې بل لا دمخه ادا شوی دی."
    }
  },
  "simpel": {
    "baseWord": "simpel",
    "field": 3,
    "da": {
      "meaning": "simpel",
      "sentence": "Opskriften på maden er helt simpel."
    },
    "en": {
      "meaning": "simple",
      "sentence": "The recipe for the food is very simple."
    },
    "de": {
      "meaning": "einfach / simpel",
      "sentence": "Das Kochrezept ist ganz einfach."
    },
    "es": {
      "meaning": "simple / sencillo",
      "sentence": "La receta de la comida es muy sencilla."
    },
    "pt": {
      "meaning": "simples",
      "sentence": "A receita da comida é bem simples."
    },
    "tr": {
      "meaning": "basit / yalın",
      "sentence": "Yemeğin tarifi son derece basit."
    },
    "ar": {
      "meaning": "بسيط",
      "sentence": "وصفة الطعام بسيطة جداً."
    },
    "fa": {
      "meaning": "ساده",
      "sentence": "دستور پخت این غذا کاملاً ساده است."
    },
    "ku": {
      "meaning": "sade / hêsan",
      "sentence": "Terîfa xwarinê bi temamî sade ye."
    },
    "ur": {
      "meaning": "سادہ",
      "sentence": "کھانے کی ترکیب بہت سادہ ہے۔"
    },
    "ru": {
      "meaning": "простой",
      "sentence": "Рецепт этого блюда очень простой."
    },
    "uk": {
      "meaning": "простий",
      "sentence": "Рецепт цієї страви дуже простий."
    },
    "zh": {
      "meaning": "简单的",
      "sentence": "这个菜谱非常简单。"
    },
    "vi": {
      "meaning": "đơn giản",
      "sentence": "Công thức nấu món ăn rất đơn giản."
    },
    "th": {
      "meaning": "เรียบง่าย",
      "sentence": "สูตรอาหารนี้เรียบง่ายมาก"
    },
    "ne": {
      "meaning": "सरल",
      "sentence": "खानाको विधि धेरै सरल छ।"
    },
    "ps": {
      "meaning": "ساده",
      "sentence": "د خوړو ترکیب ډېر ساده دی."
    }
  },
  "kompliceret": {
    "baseWord": "kompliceret",
    "field": 3,
    "da": {
      "meaning": "kompliceret",
      "sentence": "Opgaven i bogen er meget kompliceret."
    },
    "en": {
      "meaning": "complicated",
      "sentence": "The task in the book is very complicated."
    },
    "de": {
      "meaning": "kompliziert",
      "sentence": "Die Aufgabe im Buch ist sehr kompliziert."
    },
    "es": {
      "meaning": "complicado",
      "sentence": "El ejercicio del libro es muy complicado."
    },
    "pt": {
      "meaning": "complicado",
      "sentence": "A tarefa no livro é muito complicada."
    },
    "tr": {
      "meaning": "karmaşık",
      "sentence": "Kitaptaki alıştırma çok karmaşık."
    },
    "ar": {
      "meaning": "معقد",
      "sentence": "المسألة في الكتاب معقدة جداً."
    },
    "fa": {
      "meaning": "پیچیده",
      "sentence": "تمرین داخل کتاب بسیار پیچیده است."
    },
    "ku": {
      "meaning": "aloz / tevlihev",
      "sentence": "Erkê di pirtûkê de pir aloz e."
    },
    "ur": {
      "meaning": "پیچیدہ",
      "sentence": "کتاب میں دیا گیا کام بہت پیچیدہ ہے۔"
    },
    "ru": {
      "meaning": "сложный / запутанный",
      "sentence": "Задание в книге очень сложное."
    },
    "uk": {
      "meaning": "складний / заплутаний",
      "sentence": "Завдання в книзі дуже складне."
    },
    "zh": {
      "meaning": "复杂的",
      "sentence": "书里的任务非常复杂。"
    },
    "vi": {
      "meaning": "phức tạp",
      "sentence": "Bài tập trong sách rất phức tạp."
    },
    "th": {
      "meaning": "ซับซ้อน",
      "sentence": "โจทย์ในหนังสือเล่มนี้ซับซ้อนมาก"
    },
    "ne": {
      "meaning": "जटिल",
      "sentence": "किताबको अभ्यास धेरै जटिल छ।"
    },
    "ps": {
      "meaning": "پېچلی",
      "sentence": "په کتاب کې دنده ډېره پېچلې ده."
    }
  },
  "glad": {
    "baseWord": "glad",
    "field": 4,
    "da": {
      "meaning": "glad",
      "sentence": "Barnet smiler og er meget glad."
    },
    "en": {
      "meaning": "happy / glad",
      "sentence": "The child smiles and is very happy."
    },
    "de": {
      "meaning": "fröhlich / glücklich",
      "sentence": "Das Kind lächelt und ist sehr glücklich."
    },
    "es": {
      "meaning": "feliz / alegre",
      "sentence": "El niño sonríe y está muy alegre."
    },
    "pt": {
      "meaning": "feliz / contente",
      "sentence": "A criança sorri e está muito feliz."
    },
    "tr": {
      "meaning": "mutlu / neşeli",
      "sentence": "Çocuk gülümsüyor ve çok mutlu."
    },
    "ar": {
      "meaning": "سعيد / فرح",
      "sentence": "يبتسم الطفل وهو سعيد جداً."
    },
    "fa": {
      "meaning": "خوشحال / شاد",
      "sentence": "کودک لبخند می‌زند و بسیار خوشحال است."
    },
    "ku": {
      "meaning": "dilxweş / şad",
      "sentence": "Zarok dikene û pir dilxweş e."
    },
    "ur": {
      "meaning": "خوش",
      "sentence": "بچہ مسکرا رہا ہے اور بہت خوش ہے۔"
    },
    "ru": {
      "meaning": "радостный / счастливый",
      "sentence": "Ребёнок улыбается и очень счастлив."
    },
    "uk": {
      "meaning": "радісний / щасливий",
      "sentence": "Дитина посміхається і дуже радіє."
    },
    "zh": {
      "meaning": "高兴的 / 开心的",
      "sentence": "孩子微笑着，感到非常开心。"
    },
    "vi": {
      "meaning": "vui vẻ, hạnh phúc",
      "sentence": "Đứa trẻ mỉm cười và rất vui vẻ."
    },
    "th": {
      "meaning": "มีความสุข / ดีใจ",
      "sentence": "เด็กยิ้มและมีความสุขมาก"
    },
    "ne": {
      "meaning": "खुसी",
      "sentence": "बच्चा मुस्कुराउँछ र धेरै खुसी छ।"
    },
    "ps": {
      "meaning": "خوشحاله",
      "sentence": "ماشوم موسکی کېږي او ډېر خوشحاله دی."
    }
  },
  "trist": {
    "baseWord": "trist",
    "field": 4,
    "da": {
      "meaning": "trist",
      "sentence": "Manden ser trist ud i dag."
    },
    "en": {
      "meaning": "sad",
      "sentence": "The man looks sad today."
    },
    "de": {
      "meaning": "traurig",
      "sentence": "Der Mann sieht heute traurig aus."
    },
    "es": {
      "meaning": "triste",
      "sentence": "El hombre se ve triste hoy."
    },
    "pt": {
      "meaning": "triste",
      "sentence": "O homem parece triste hoje."
    },
    "tr": {
      "meaning": "üzgün",
      "sentence": "Adam bugün üzgün görünüyor."
    },
    "ar": {
      "meaning": "حزين",
      "sentence": "يبدو الرجل حزيناً اليوم."
    },
    "fa": {
      "meaning": "غمگین / ناراحت",
      "sentence": "مرد امروز غمگین به نظر می‌رسد."
    },
    "ku": {
      "meaning": "xemgîn",
      "sentence": "Zilam îro xemgîn xuya dike."
    },
    "ur": {
      "meaning": "اداس",
      "sentence": "آدمی آج اداس نظر آ رہا ہے۔"
    },
    "ru": {
      "meaning": "грустный / печальный",
      "sentence": "Мужчина сегодня выглядит грустным."
    },
    "uk": {
      "meaning": "сумний",
      "sentence": "Чоловік сьогодні виглядає сумним."
    },
    "zh": {
      "meaning": "难过的 / 忧伤的",
      "sentence": "那个男人今天看起来很伤心。"
    },
    "vi": {
      "meaning": "buồn bã, ủ rũ",
      "sentence": "Hôm nay trông người đàn ông có vẻ buồn."
    },
    "th": {
      "meaning": "เศร้า",
      "sentence": "วันนี้ผู้ชายดูเศร้าหมอง"
    },
    "ne": {
      "meaning": "दुःखी / उदास",
      "sentence": "आज मानिस उदास देखिन्छ।"
    },
    "ps": {
      "meaning": "خفه / غمجن",
      "sentence": "سړی نن خفه ښکاري."
    }
  },
  "venlig": {
    "baseWord": "venlig",
    "field": 4,
    "da": {
      "meaning": "venlig",
      "sentence": "Læreren er altid meget venlig over for eleverne."
    },
    "en": {
      "meaning": "friendly / kind",
      "sentence": "The teacher is always very friendly to the students."
    },
    "de": {
      "meaning": "freundlich",
      "sentence": "Die Lehrkraft ist immer sehr freundlich zu den Schülern."
    },
    "es": {
      "meaning": "amable",
      "sentence": "El profesor siempre es muy amable con los estudiantes."
    },
    "pt": {
      "meaning": "gentil / simpático",
      "sentence": "O professor é sempre muito gentil com os alunos."
    },
    "tr": {
      "meaning": "nazik / cana yakın",
      "sentence": "Öğretmen öğrencilerine karşı her zaman çok naziktir."
    },
    "ar": {
      "meaning": "ودود / لطيف",
      "sentence": "المعلم لطيف وودود دائماً مع الطلاب."
    },
    "fa": {
      "meaning": "مهربان / خوش‌برخورد",
      "sentence": "معلم همیشه با دانش‌آموزان بسیار مهربان و خوش‌برخورد است."
    },
    "ku": {
      "meaning": "dilovan / hevalane",
      "sentence": "Mamoste her tim li hember xwendekaran pir dilovan e."
    },
    "ur": {
      "meaning": "مہربان / خوش اخلاق",
      "sentence": "استاد ہمیشہ طلباء کے ساتھ بہت مہربان رہتے ہیں۔"
    },
    "ru": {
      "meaning": "дружелюбный / приветливый",
      "sentence": "Учитель всегда очень дружелюбен к ученикам."
    },
    "uk": {
      "meaning": "привітний / доброзичливий",
      "sentence": "Учитель завжди дуже привітний з учнями."
    },
    "zh": {
      "meaning": "友好的 / 和蔼的",
      "sentence": "老师对学生们总是非常友好。"
    },
    "vi": {
      "meaning": "thân thiện, tốt bụng",
      "sentence": "Thầy giáo luôn luôn rất thân thiện với học sinh."
    },
    "th": {
      "meaning": "เป็นมิตร / ใจดี",
      "sentence": "คุณครูเป็นมิตรกับนักเรียนเสมอ"
    },
    "ne": {
      "meaning": "मिलनसार / दयालु",
      "sentence": "शिक्षक विद्यार्थीहरूसँग सधैं धेरै मिलनसार हुनुहुन्छ।"
    },
    "ps": {
      "meaning": "مهربان / ملګری",
      "sentence": "ښوونکی تل له زده کوونکو سره ډېر مهربان وي."
    }
  },
  "uvenlig": {
    "baseWord": "uvenlig",
    "field": 4,
    "da": {
      "meaning": "uvenlig",
      "sentence": "Manden i butikken var meget uvenlig."
    },
    "en": {
      "meaning": "unfriendly",
      "sentence": "The man in the shop was very unfriendly."
    },
    "de": {
      "meaning": "unfreundlich",
      "sentence": "Der Mann im Laden war sehr unfreundlich."
    },
    "es": {
      "meaning": "antipático / desagradable",
      "sentence": "El hombre de la tienda fue muy poco amable."
    },
    "pt": {
      "meaning": "antipático / indelicado",
      "sentence": "O homem da loja foi muito indelicado."
    },
    "tr": {
      "meaning": "kaba / sevimsiz",
      "sentence": "Dükkândaki adam çok kaba davrandı."
    },
    "ar": {
      "meaning": "غير ودود / فظ",
      "sentence": "كان الرجل في المتجر فظاً وغير ودود للغاية."
    },
    "fa": {
      "meaning": "نامهربان / بدبرخورد",
      "sentence": "مرد داخل مغازه بسیار نامهربان و بدبرخورد بود."
    },
    "ku": {
      "meaning": "nedilovan / nerûken",
      "sentence": "Zilamê li dikanê pir nedilovan bû."
    },
    "ur": {
      "meaning": "بد اخلاق / غیر دوستانہ",
      "sentence": "دکان میں موجود آدمی بہت روکھا اور بد اخلاق تھا۔"
    },
    "ru": {
      "meaning": "неприветливый / недружелюбный",
      "sentence": "Мужчина в магазине был очень неприветлив."
    },
    "uk": {
      "meaning": "непривітний / недоброзичливий",
      "sentence": "Чоловік у магазині був дуже непривітним."
    },
    "zh": {
      "meaning": "不友好的",
      "sentence": "店里的那个男人非常不友好。"
    },
    "vi": {
      "meaning": "không thân thiện",
      "sentence": "Người đàn ông trong cửa hàng rất không thân thiện."
    },
    "th": {
      "meaning": "ไม่เป็นมิตร",
      "sentence": "ผู้ชายในร้านนั้นไม่เป็นมิตรเอาเสียเลย"
    },
    "ne": {
      "meaning": "अमिलनसार / कठोर",
      "sentence": "पसलको मानिस धेरै अमिलनसार थियो।"
    },
    "ps": {
      "meaning": "نامهربانه / تریخ",
      "sentence": "په دوکان کې سړی ډېر نامهربانه و."
    }
  },
  "frisk": {
    "baseWord": "frisk",
    "field": 4,
    "da": {
      "meaning": "frisk",
      "sentence": "Hun drikker et glas koldt og friskt vand."
    },
    "en": {
      "meaning": "fresh / energized",
      "sentence": "She drinks a glass of cold and fresh water."
    },
    "de": {
      "meaning": "frisch / erfrischt",
      "sentence": "Sie trinkt ein Glas kaltes und frisches Wasser."
    },
    "es": {
      "meaning": "fresco",
      "sentence": "Ella bebe un vaso de agua fría y fresca."
    },
    "pt": {
      "meaning": "fresco",
      "sentence": "Ela toma um copo de água fria e fresca."
    },
    "tr": {
      "meaning": "taze / ferah",
      "sentence": "Bir bardak soğuk ve taze su içiyor."
    },
    "ar": {
      "meaning": "منعش / طازج",
      "sentence": "تشرب كوباً من الماء البارد والمنعش."
    },
    "fa": {
      "meaning": "تازه / خنک و گوارا",
      "sentence": "او یک لیوان آب سرد و تازه می‌نوشد."
    },
    "ku": {
      "meaning": "teze / hênik",
      "sentence": "Ew qedehek ava sar û teze vedixwe."
    },
    "ur": {
      "meaning": "تازہ / تروتازہ",
      "sentence": "وہ ٹھنڈے اور تازہ پانی کا ایک گلاس پیتی ہے۔"
    },
    "ru": {
      "meaning": "свежий / бодрый",
      "sentence": "Она пьёт стакан холодной и свежей воды."
    },
    "uk": {
      "meaning": "свіжий / бадьорий",
      "sentence": "Вона п'є склянку холодної та свіжої води."
    },
    "zh": {
      "meaning": "新鲜的 / 清新的",
      "sentence": "她喝了一杯冰凉清爽的水。"
    },
    "vi": {
      "meaning": "tươi mới, mát lành",
      "sentence": "Cô ấy uống một ly nước lạnh và mát lành."
    },
    "th": {
      "meaning": "สดชื่น / สด",
      "sentence": "เธอดื่มน้ำเย็นสดชื่นหนึ่งแก้ว"
    },
    "ne": {
      "meaning": "ताजा / स्फूर्त",
      "sentence": "उनी एक गिलास चिसो र ताजा पानी पिउँछिन्।"
    },
    "ps": {
      "meaning": "تازه",
      "sentence": "هغه یو ګیلاس یخې او تازه اوبه څښي."
    }
  },
  "træt": {
    "baseWord": "træt",
    "field": 4,
    "da": {
      "meaning": "træt",
      "sentence": "Kursisten er meget træt efter en lang dag."
    },
    "en": {
      "meaning": "tired",
      "sentence": "The student is very tired after a long day."
    },
    "de": {
      "meaning": "müde",
      "sentence": "Der Kursteilnehmer ist nach einem langen Tag sehr müde."
    },
    "es": {
      "meaning": "cansado",
      "sentence": "El estudiante está muy cansado tras un largo día."
    },
    "pt": {
      "meaning": "cansado",
      "sentence": "O aluno está muito cansado depois de um longo dia."
    },
    "tr": {
      "meaning": "yorgun",
      "sentence": "Öğrenci uzun bir günün ardından çok yorgun."
    },
    "ar": {
      "meaning": "متعب / مرهق",
      "sentence": "الطالب مرهق جداً بعد يوم طويل."
    },
    "fa": {
      "meaning": "خسته",
      "sentence": "زبان‌آموز پس از یک روز طولانی بسیار خسته است."
    },
    "ku": {
      "meaning": "westiyayî",
      "sentence": "Xwendekar piştî rojeke dirêj pir westiyayî ye."
    },
    "ur": {
      "meaning": "تھکا ہوا",
      "sentence": "طالب علم ایک طویل دن کے بعد بہت تھکا ہوا ہے۔"
    },
    "ru": {
      "meaning": "уставший",
      "sentence": "Ученик очень устал после долгого дня."
    },
    "uk": {
      "meaning": "втомлений",
      "sentence": "Студент дуже втомився після довгого дня."
    },
    "zh": {
      "meaning": "疲倦的 / 累的",
      "sentence": "经历漫长的一天后，学员感到非常疲倦。"
    },
    "vi": {
      "meaning": "mệt mỏi",
      "sentence": "Học viên rất mệt sau một ngày dài."
    },
    "th": {
      "meaning": "เหนื่อย",
      "sentence": "ผู้เรียนเหนื่อยมากหลังจากวันที่ยาวนาน"
    },
    "ne": {
      "meaning": "थकित / थाकेको",
      "sentence": "लामो दिनपछि विद्यार्थी धेरै थाकेको छ।"
    },
    "ps": {
      "meaning": "ستړی",
      "sentence": "زده کوونکی د یوې اوږدې ورځې وروسته ډېر ستړی دی."
    }
  },
  "tryg": {
    "baseWord": "tryg",
    "field": 4,
    "da": {
      "meaning": "tryg",
      "sentence": "Lejligheden er et rart og trygt hjem."
    },
    "en": {
      "meaning": "safe / secure",
      "sentence": "The apartment is a nice and safe home."
    },
    "de": {
      "meaning": "sicher / geborgen",
      "sentence": "Die Wohnung ist ein schönes und geborgenes Zuhause."
    },
    "es": {
      "meaning": "seguro / acogedor",
      "sentence": "El apartamento es un hogar agradable y seguro."
    },
    "pt": {
      "meaning": "seguro / acolhedor",
      "sentence": "O apartamento é um lar agradável e seguro."
    },
    "tr": {
      "meaning": "güvenli / huzurlu",
      "sentence": "Daire güzel ve huzurlu bir yuvadır."
    },
    "ar": {
      "meaning": "آمن / مطمئن",
      "sentence": "الشقة بيت لطيف وآمن."
    },
    "fa": {
      "meaning": "امن / با آرامش",
      "sentence": "این آپارتمان خانه‌ای دلنشین و امن است."
    },
    "ku": {
      "meaning": "ewle / bi ewle",
      "sentence": "Apartman maleke xweş û ewle ye."
    },
    "ur": {
      "meaning": "محفوظ / پرامن",
      "sentence": "یہ اپارٹمنٹ ایک اچھا اور محفوظ گھر ہے۔"
    },
    "ru": {
      "meaning": "безопасный / надёжный",
      "sentence": "Эта квартира — приятный и безопасный дом."
    },
    "uk": {
      "meaning": "безпечний / затишний",
      "sentence": "Квартира — це приємний і безпечний дім."
    },
    "zh": {
      "meaning": "令人安心的 / 安全的",
      "sentence": "这套公寓是一个温馨且让人安心的家。"
    },
    "vi": {
      "meaning": "an toàn, yên bình",
      "sentence": "Căn hộ là một mái ấm dễ chịu và an toàn."
    },
    "th": {
      "meaning": "ปลอดภัย / อบอุ่นใจ",
      "sentence": "อพาร์ตเมนต์เป็นบ้านที่ดีและปลอดภัยอบอุ่นใจ"
    },
    "ne": {
      "meaning": "सुरक्षित",
      "sentence": "अपार्टमेन्ट एक राम्रो र सुरक्षित घर हो।"
    },
    "ps": {
      "meaning": "خوندي / ارام",
      "sentence": "اپارتمان یو ښه او خوندي کور دی."
    }
  },
  "bange": {
    "baseWord": "bange",
    "field": 4,
    "da": {
      "meaning": "bange",
      "sentence": "Den lille hund er bange for tordenvejr."
    },
    "en": {
      "meaning": "scared / afraid",
      "sentence": "The little dog is afraid of thunderstorms."
    },
    "de": {
      "meaning": "ängstlich / bange",
      "sentence": "Der kleine Hund hat Angst vor Gewitter."
    },
    "es": {
      "meaning": "asustado / temeroso",
      "sentence": "El perrito tiene miedo a las tormentas."
    },
    "pt": {
      "meaning": "assustado / com medo",
      "sentence": "O cachorrinho tem medo de tempestades."
    },
    "tr": {
      "meaning": "korkmuş / korkan",
      "sentence": "Küçük köpek gök gürültüsünden korkuyor."
    },
    "ar": {
      "meaning": "خائف",
      "sentence": "الكلب الصغير خائف من العواصف الرعدية."
    },
    "fa": {
      "meaning": "ترسیده / نگران",
      "sentence": "سگ کوچک از رعد و برق می‌ترسد."
    },
    "ku": {
      "meaning": "ditirse / tirsiyayî",
      "sentence": "Kûçikê piçûk ji birûsk û birqê ditirse."
    },
    "ur": {
      "meaning": "خوفزدہ / ڈرا ہوا",
      "sentence": "چھوٹا کتا گرج چمک سے ڈرتا ہے۔"
    },
    "ru": {
      "meaning": "испуганный / боящийся",
      "sentence": "Маленькая собака боится грозы."
    },
    "uk": {
      "meaning": "наляканий / боязкий",
      "sentence": "Маленький собака боїться грози."
    },
    "zh": {
      "meaning": "害怕的",
      "sentence": "小狗害怕打雷。"
    },
    "vi": {
      "meaning": "sợ hãi",
      "sentence": "Chú chó nhỏ sợ tiếng sấm sét."
    },
    "th": {
      "meaning": "กลัว",
      "sentence": "สุนัขตัวเล็กกลัวพายุฟ้าร้อง"
    },
    "ne": {
      "meaning": "डराएको / भयभीत",
      "sentence": "सानो कुकुर चट्याङसँग डराउँछ।"
    },
    "ps": {
      "meaning": "ویرېدلی / وېرېدونکی",
      "sentence": "کوچنی سپی له تندر او باران څخه وېرېږي."
    }
  },
  "sød": {
    "baseWord": "sød",
    "field": 4,
    "da": {
      "meaning": "sød",
      "sentence": "Pigen deler kage og er meget sød."
    },
    "en": {
      "meaning": "sweet / nice",
      "sentence": "The girl shares cake and is very sweet."
    },
    "de": {
      "meaning": "lieb / süß",
      "sentence": "Das Mädchen teilt Kuchen und ist sehr lieb."
    },
    "es": {
      "meaning": "dulce / cariñosa",
      "sentence": "La niña comparte pastel y es muy cariñosa."
    },
    "pt": {
      "meaning": "doce / meiga",
      "sentence": "A menina divide o bolo e é muito meiga."
    },
    "tr": {
      "meaning": "tatlı / sevimli",
      "sentence": "Kız kekini paylaşıyor ve çok sevimli."
    },
    "ar": {
      "meaning": "لطيفة / طيبة",
      "sentence": "الفتاة تشارك الكعك وهي لطيفة جداً."
    },
    "fa": {
      "meaning": "مهربان و دوست‌داشتنی",
      "sentence": "دختر کیک را تقسیم می‌کند و بسیار مهربان و دوست‌داشتنی است."
    },
    "ku": {
      "meaning": "şêrîn / dilşewat",
      "sentence": "Keçik kekê parve dike û pir şêrîn e."
    },
    "ur": {
      "meaning": "پیاری / نیک دل",
      "sentence": "لڑکی کیک بانٹتی ہے اور بہت پیاری ہے۔"
    },
    "ru": {
      "meaning": "милый / добрый",
      "sentence": "Девочка делится пирогом, она очень милая."
    },
    "uk": {
      "meaning": "милий / добрий",
      "sentence": "Дівчинка ділиться пирогом, вона дуже мила."
    },
    "zh": {
      "meaning": "贴心的 / 可爱的",
      "sentence": "小女孩分蛋糕给大家，非常贴心可爱。"
    },
    "vi": {
      "meaning": "dễ thương, ngọt ngào",
      "sentence": "Cô bé chia sẻ bánh ngọt và rất đáng yêu."
    },
    "th": {
      "meaning": "น่ารัก / มีน้ำใจ",
      "sentence": "เด็กหญิงแบ่งขนมเค้กและน่ารักมีน้ำใจมาก"
    },
    "ne": {
      "meaning": "दयालु / मीठो स्वभावको",
      "sentence": "केटी केक बाँड्छिन् र धेरै दयालु छिन्।"
    },
    "ps": {
      "meaning": "مهربان / خوږ",
      "sentence": "نجلۍ کیک شریکوي او ډېره مهربانه (خوږه) ده."
    }
  },
  "sur": {
    "baseWord": "sur",
    "field": 4,
    "da": {
      "meaning": "sur",
      "sentence": "Manden står i regnen og ser sur ud."
    },
    "en": {
      "meaning": "grumpy / sour",
      "sentence": "The man stands in the rain and looks grumpy."
    },
    "de": {
      "meaning": "mürrisch / sauer",
      "sentence": "Der Mann steht im Regen und schaut mürrisch drein."
    },
    "es": {
      "meaning": "enfadado / de mal humor",
      "sentence": "El hombre está bajo la lluvia y tiene cara de mal humor."
    },
    "pt": {
      "meaning": "emburrado / mal-humorado",
      "sentence": "O homem está na chuva e parece mal-humorado."
    },
    "tr": {
      "meaning": "asık suratlı / sinirli",
      "sentence": "Adam yağmurda duruyor ve asık suratlı görünüyor."
    },
    "ar": {
      "meaning": "غاضب / عابس",
      "sentence": "يقف الرجل تحت المطر ويبدو عابساً."
    },
    "fa": {
      "meaning": "عبوس و ترشرو",
      "sentence": "مرد زیر باران ایستاده و عبوس و ترشرو به نظر می‌رسد."
    },
    "ku": {
      "meaning": "tirşrû / aciz",
      "sentence": "Zilam di bin baranê de radiweste û tirşrû xuya dike."
    },
    "ur": {
      "meaning": "خفا / غصیلا",
      "sentence": "آدمی بارش میں کھڑا ہے اور خفا دکھائی دے رہا ہے۔"
    },
    "ru": {
      "meaning": "хмурый / недовольный",
      "sentence": "Мужчина стоит под дождём и выглядит недовольным."
    },
    "uk": {
      "meaning": "похмурий / невдоволений",
      "sentence": "Чоловік стоїть під дощем і виглядає похмурим."
    },
    "zh": {
      "meaning": "绷着脸的 / 生气的",
      "sentence": "那个男人站在雨中，一脸不开心的样子。"
    },
    "vi": {
      "meaning": "cau có, khó chịu",
      "sentence": "Người đàn ông đứng dưới mưa và trông rất cau có."
    },
    "th": {
      "meaning": "บูดบึ้ง / อารมณ์เสีย",
      "sentence": "ผู้ชายยืนตากฝนและดูหน้าตาบูดบึ้ง"
    },
    "ne": {
      "meaning": "रिसाएको / असन्तुष्ट",
      "sentence": "मानिस पानीमा उभिएर रिसाएको जस्तो देखिन्छ।"
    },
    "ps": {
      "meaning": "خفه / بدخلقه / تریو تندی",
      "sentence": "سړی په باران کې ولاړ دی او تریو تندی (بدخلقه) ښکاري."
    }
  },
  "rolig_4": {
    "baseWord": "rolig",
    "field": 4,
    "da": {
      "meaning": "rolig",
      "sentence": "Læreren i klassen er altid rolig."
    },
    "en": {
      "meaning": "calm / composed",
      "sentence": "The teacher in the classroom is always calm."
    },
    "de": {
      "meaning": "ruhig / gelassen",
      "sentence": "Der Lehrer im Klassenzimmer bleibt immer ruhig."
    },
    "es": {
      "meaning": "tranquilo / sosegado",
      "sentence": "El profesor de la clase siempre mantiene la calma."
    },
    "pt": {
      "meaning": "calmo / sereno",
      "sentence": "O professor na sala está sempre calmo."
    },
    "tr": {
      "meaning": "sakin / soğukkanlı",
      "sentence": "Sınıftaki öğretmen her zaman sakindir."
    },
    "ar": {
      "meaning": "هادئ / رزين",
      "sentence": "المعلم في الفصل هادئ ورزين دائماً."
    },
    "fa": {
      "meaning": "آرام / خونسرد",
      "sentence": "معلم در کلاس درس همیشه آرام و خونسرد است."
    },
    "ku": {
      "meaning": "aram / hêmin",
      "sentence": "Mamosteyê di polê de her tim aram û hêmin e."
    },
    "ur": {
      "meaning": "پُرسکون / سنجیدہ",
      "sentence": "کلاس میں استاد ہمیشہ پُرسکون رہتے ہیں۔"
    },
    "ru": {
      "meaning": "спокойный (о человеке)",
      "sentence": "Учитель в классе всегда спокоен."
    },
    "uk": {
      "meaning": "спокійний (про людину)",
      "sentence": "Учитель у класі завжди спокійний."
    },
    "zh": {
      "meaning": "沉着冷静的 (人)",
      "sentence": "教室里的老师总是很沉着冷静。"
    },
    "vi": {
      "meaning": "điềm tĩnh, bình thản",
      "sentence": "Thầy giáo trong lớp luôn luôn điềm tĩnh."
    },
    "th": {
      "meaning": "ใจเย็น / สงบนิ่ง",
      "sentence": "คุณครูในห้องเรียนใจเย็นเสมอ"
    },
    "ne": {
      "meaning": "शान्त / धैर्यवान",
      "sentence": "कक्षाका शिक्षक सधैं शान्त हुनुहुन्छ।"
    },
    "ps": {
      "meaning": "ارام / باحوصله",
      "sentence": "په ټولګي کې ښوونکی تل ارام او باحوصله وي."
    }
  },
  "nervøs": {
    "baseWord": "nervøs",
    "field": 4,
    "da": {
      "meaning": "nervøs",
      "sentence": "Eleven er nervøs før den mundtlige prøve."
    },
    "en": {
      "meaning": "nervous",
      "sentence": "The student is nervous before the oral exam."
    },
    "de": {
      "meaning": "nervös",
      "sentence": "Der Schüler ist vor der mündlichen Prüfung nervös."
    },
    "es": {
      "meaning": "nervioso",
      "sentence": "El estudiante está nervioso antes del examen oral."
    },
    "pt": {
      "meaning": "nervoso",
      "sentence": "O aluno fica nervoso antes do exame oral."
    },
    "tr": {
      "meaning": "gergin / endişeli",
      "sentence": "Öğrenci sözlü sınav öncesinde gergin."
    },
    "ar": {
      "meaning": "متوتر / قلق",
      "sentence": "الطالب متوتر قبل الامتحان الشفوي."
    },
    "fa": {
      "meaning": "مضطرب / نگران",
      "sentence": "دانش‌آموز قبل از امتحان شفاهی مضطرب و نگران است."
    },
    "ku": {
      "meaning": "fikarbar",
      "sentence": "Xwendekar beriya ezmûna devkî pir fikarbar e."
    },
    "ur": {
      "meaning": "گھبرایا ہوا / بے چین",
      "sentence": "طالب علم زبانی امتحان سے پہلے گھبرایا ہوا ہے۔"
    },
    "ru": {
      "meaning": "нервный / волнующийся",
      "sentence": "Ученик нервничает перед устным экзаменом."
    },
    "uk": {
      "meaning": "знервований / схвильований",
      "sentence": "Учень хвилюється перед усним іспитом."
    },
    "zh": {
      "meaning": "紧张的",
      "sentence": "学生在口试前感到很紧张。"
    },
    "vi": {
      "meaning": "lo lắng, bồn chồn",
      "sentence": "Học sinh cảm thấy lo lắng trước bài kiểm tra vấn đáp."
    },
    "th": {
      "meaning": "ประหม่า / ตื่นเต้น",
      "sentence": "นักเรียนรู้สึกประหม่าก่อนการสอบปากเปล่า"
    },
    "ne": {
      "meaning": "चिन्तित / आत्तिएको",
      "sentence": "विद्यार्थी मौखिक परीक्षा अघि आत्तिएको छ।"
    },
    "ps": {
      "meaning": "اضطرابي / وارخطا",
      "sentence": "زده کوونکی د شفاهي ازموینې دمخه وارخطا (اضطرابي) دی."
    }
  },
  "stolt": {
    "baseWord": "stolt",
    "field": 4,
    "da": {
      "meaning": "stolt",
      "sentence": "Faren er meget stolt af sin datter."
    },
    "en": {
      "meaning": "proud",
      "sentence": "The father is very proud of his daughter."
    },
    "de": {
      "meaning": "stolz",
      "sentence": "Der Vater ist sehr stolz auf seine Tochter."
    },
    "es": {
      "meaning": "orgulloso",
      "sentence": "El padre está muy orgulloso de su hija."
    },
    "pt": {
      "meaning": "orgulhoso",
      "sentence": "O pai está muito orgulhoso de sua filha."
    },
    "tr": {
      "meaning": "gururlu",
      "sentence": "Baba kızıyla çok gurur duyuyor."
    },
    "ar": {
      "meaning": "فخور",
      "sentence": "الأب فخور جداً بابنته."
    },
    "fa": {
      "meaning": "سربلند / مفتخر",
      "sentence": "پدر به دخترش بسیار افتخار می‌کند."
    },
    "ku": {
      "meaning": "serbilind",
      "sentence": "Bav bi keça xwe pir serbilind e."
    },
    "ur": {
      "meaning": "فخرمند",
      "sentence": "باپ کو اپنی بیٹی پر بہت فخر ہے۔"
    },
    "ru": {
      "meaning": "гордый",
      "sentence": "Отец очень гордится своей дочерью."
    },
    "uk": {
      "meaning": "гордий",
      "sentence": "Батько дуже пишається своєю донькою."
    },
    "zh": {
      "meaning": "自豪的 / 骄傲的",
      "sentence": "父亲为自己的女儿感到非常自豪。"
    },
    "vi": {
      "meaning": "tự hào",
      "sentence": "Người cha rất tự hào về con gái của mình."
    },
    "th": {
      "meaning": "ภูมิใจ",
      "sentence": "พ่อภูมิใจในตัวลูกสาวมาก"
    },
    "ne": {
      "meaning": "गर्वित",
      "sentence": "बुबा आफ्नी छोरीप्रति धेरै गर्व गर्नुहुन्छ।"
    },
    "ps": {
      "meaning": "ویاړلی / فخور",
      "sentence": "پلار په خپله لور ډېر ویاړي."
    }
  },
  "flov": {
    "baseWord": "flov",
    "field": 4,
    "da": {
      "meaning": "flov",
      "sentence": "Pigen spildte kaffe på jakken og ser meget flov ud."
    },
    "en": {
      "meaning": "embarrassed",
      "sentence": "The girl spilled coffee on her jacket and looks very embarrassed."
    },
    "de": {
      "meaning": "verlegen / peinlich berührt",
      "sentence": "Das Mädchen hat Kaffee auf ihre Jacke gekleckert und sieht sehr verlegen aus."
    },
    "es": {
      "meaning": "avergonzado / apenado",
      "sentence": "La niña derramó café en su chaqueta y se ve muy avergonzada."
    },
    "pt": {
      "meaning": "envergonhado / sem jeito",
      "sentence": "A menina derramou café na jaqueta e parece muito envergonhada."
    },
    "tr": {
      "meaning": "mahcup / utanmış",
      "sentence": "Kız ceketine kahve döktü ve çok mahcup görünüyor."
    },
    "ar": {
      "meaning": "محرج / خجل",
      "sentence": "سكبت الفتاة القهوة على سترتها وتبدو محرجة جداً."
    },
    "fa": {
      "meaning": "خجالت‌زده / شرمسار",
      "sentence": "دختر قهوه را روی کاپشنش ریخت و بسیار خجالت‌زده به نظر می‌رسد."
    },
    "ku": {
      "meaning": "fedîkar / şermezar",
      "sentence": "Keçikê qehwe li ser çakêtê xwe rijand û pir fedîkar xuya dike."
    },
    "ur": {
      "meaning": "شرمندہ / جھینپا ہوا",
      "sentence": "لڑکی کی جیکٹ پر کافی گر گئی اور وہ بہت شرمندہ نظر آ رہی ہے۔"
    },
    "ru": {
      "meaning": "смущённый",
      "sentence": "Девочка пролила кофе на куртку и выглядит очень смущённой."
    },
    "uk": {
      "meaning": "збентежений / зніяковілий",
      "sentence": "Дівчинка розлила каву на куртку і виглядає дуже збентеженою."
    },
    "zh": {
      "meaning": "尴尬的 / 不好意思的",
      "sentence": "女孩把咖啡洒在外套上，显得非常尴尬。"
    },
    "vi": {
      "meaning": "ngượng ngùng, xấu hổ",
      "sentence": "Cô gái làm đổ cà phê lên áo khoác và trông rất ngượng ngùng."
    },
    "th": {
      "meaning": "อับอาย / ขวยเขิน",
      "sentence": "เด็กหญิงทำกาแฟหกใส่เสื้อแจ็กเก็ตและดูเขินอายมาก"
    },
    "ne": {
      "meaning": "लज्जित",
      "sentence": "केटीले ज्याकेटमा कफी पोखिन् र धेरै लज्जित देखिन्छिन्।"
    },
    "ps": {
      "meaning": "شرمنده",
      "sentence": "نجلۍ په جاکټ قهوه تویه کړه او ډېره شرمنده ښکاري."
    }
  },
  "hjælpsom": {
    "baseWord": "hjælpsom",
    "field": 4,
    "da": {
      "meaning": "hjælpsom",
      "sentence": "Drengen er hjælpsom og bærer den tunge frugtkurv."
    },
    "en": {
      "meaning": "helpful",
      "sentence": "The boy is helpful and carries the heavy fruit basket."
    },
    "de": {
      "meaning": "hilfsbereit",
      "sentence": "Der Junge ist hilfsbereit und trägt den schweren Obstkorb."
    },
    "es": {
      "meaning": "servicial / atento",
      "sentence": "El niño es servicial y lleva la pesada cesta de frutas."
    },
    "pt": {
      "meaning": "prestativo / solícito",
      "sentence": "O menino é prestativo e carrega a cesta pesada de frutas."
    },
    "tr": {
      "meaning": "yardımsever",
      "sentence": "Çocuk yardımsever ve ağır meyve sepetini taşıyor."
    },
    "ar": {
      "meaning": "خدوم / متعاون",
      "sentence": "الولد متعاون ويحمل سلة الفواكه الثقيلة."
    },
    "fa": {
      "meaning": "یاری‌رسان / کمک‌کننده",
      "sentence": "پسر یاری‌رسان است و سبد میوه سنگین را حمل می‌کند."
    },
    "ku": {
      "meaning": "alîkar",
      "sentence": "Kurik alîkar e û selika fêkiyan a giran hildigire."
    },
    "ur": {
      "meaning": "مددگار",
      "sentence": "لڑکا مددگار ہے اور پھلوں کی بھاری ٹوکری اٹھاتا ہے۔"
    },
    "ru": {
      "meaning": "отзывчивый / готовый помочь",
      "sentence": "Мальчик очень отзывчив и несёт тяжёлую корзину с фруктами."
    },
    "uk": {
      "meaning": "чуйний / готовий допомогти",
      "sentence": "Хлопчик чуйний і несе важкий кошик із фруктами."
    },
    "zh": {
      "meaning": "乐于助人的",
      "sentence": "小男孩乐于助人，帮着提沉重的水果篮。"
    },
    "vi": {
      "meaning": "hay giúp đỡ, nhiệt tình",
      "sentence": "Cậu bé rất hay giúp đỡ người khác và đang xách giỏ hoa quả nặng."
    },
    "th": {
      "meaning": "ชอบช่วยเหลือ",
      "sentence": "เด็กชายมีน้ำใจช่วยเหลือและถือตะกร้าผลไม้ที่หนัก"
    },
    "ne": {
      "meaning": "सहयोगी",
      "sentence": "केटा सहयोगी छ र भारी फलफूलको टोकरी बोक्छ।"
    },
    "ps": {
      "meaning": "مرستندوی / کومک کوونکی",
      "sentence": "هلک مرستندوی دی او د مېوو درنه ټوکرۍ وړي."
    }
  },
  "egoistisk": {
    "baseWord": "egoistisk",
    "field": 4,
    "da": {
      "meaning": "egoistisk",
      "sentence": "Manden er egoistisk og vil ikke dele."
    },
    "en": {
      "meaning": "selfish",
      "sentence": "The man is selfish and does not want to share."
    },
    "de": {
      "meaning": "egoistisch",
      "sentence": "Der Mann ist egoistisch und möchte nicht teilen."
    },
    "es": {
      "meaning": "egoísta",
      "sentence": "El hombre es egoísta y no quiere compartir."
    },
    "pt": {
      "meaning": "egoísta",
      "sentence": "O homem é egoísta e não quer compartilhar."
    },
    "tr": {
      "meaning": "bencil",
      "sentence": "Adam bencil ve paylaşmak istemiyor."
    },
    "ar": {
      "meaning": "أناني",
      "sentence": "الرجل أناني ولا يريد أن يشارك."
    },
    "fa": {
      "meaning": "خودخواه",
      "sentence": "مرد خودخواه است و نمی‌خواهد چیزی را تقسیم کند."
    },
    "ku": {
      "meaning": "xweperest / xwehez",
      "sentence": "Zilam xwehez e û naxwaze parve bike."
    },
    "ur": {
      "meaning": "خود غرض",
      "sentence": "آدمی خود غرض ہے اور بانٹنا نہیں چاہتا۔"
    },
    "ru": {
      "meaning": "эгоистичный",
      "sentence": "Мужчина эгоистичен и не хочет делиться."
    },
    "uk": {
      "meaning": "егоїстичний",
      "sentence": "Чоловік егоїстичний і не хоче ділитися."
    },
    "zh": {
      "meaning": "自私的",
      "sentence": "那个男人很自私，不愿意分享。"
    },
    "vi": {
      "meaning": "ích kỷ",
      "sentence": "Người đàn ông rất ích kỷ và không muốn chia sẻ."
    },
    "th": {
      "meaning": "เห็นแก่ตัว",
      "sentence": "ผู้ชายคนนี้เห็นแก่ตัวและไม่อยากแบ่งปัน"
    },
    "ne": {
      "meaning": "स्वार्थी",
      "sentence": "मानिस स्वार्थी छ र बाँड्न चाहँदैन।"
    },
    "ps": {
      "meaning": "خود غرضه / ځان غوښتونکی",
      "sentence": "سړی خود غرضه دی او نه غواړي شریک کړي."
    }
  },
  "social": {
    "baseWord": "social",
    "field": 4,
    "da": {
      "meaning": "social",
      "sentence": "Pigen har mange venner og er meget social."
    },
    "en": {
      "meaning": "sociable / outgoing",
      "sentence": "The girl has many friends and is very sociable."
    },
    "de": {
      "meaning": "kontaktfreudig / gesellig",
      "sentence": "Das Mädchen hat viele Freunde und ist sehr gesellig."
    },
    "es": {
      "meaning": "sociable",
      "sentence": "La niña tiene muchos amigos y es muy sociable."
    },
    "pt": {
      "meaning": "sociável",
      "sentence": "A menina tem muitos amigos e é muito sociável."
    },
    "tr": {
      "meaning": "sosyal / cana yakın",
      "sentence": "Kızın pek çok arkadaşı var ve çok sosyal."
    },
    "ar": {
      "meaning": "اجتماعي",
      "sentence": "الفتاة لديها أصدقاء كثيرون وهي اجتماعية جداً."
    },
    "fa": {
      "meaning": "اجتماعی / خونگرم",
      "sentence": "دختر دوستان زیادی دارد و بسیار اجتماعی و خونگرم است."
    },
    "ku": {
      "meaning": "civakî / hevalhez",
      "sentence": "Pir hevalên keçikê hene û ew pir hevalhez e."
    },
    "ur": {
      "meaning": "ملنسار / سماجی",
      "sentence": "لڑکی کے بہت سے دوست ہیں اور وہ بہت ملنسار ہے۔"
    },
    "ru": {
      "meaning": "общительный",
      "sentence": "У девочки много друзей, она очень общительная."
    },
    "uk": {
      "meaning": "товариський / відкритий",
      "sentence": "У дівчинки багато друзів, і вона дуже товариська."
    },
    "zh": {
      "meaning": "善于社交的",
      "sentence": "这个女孩有很多朋友，非常善于社交。"
    },
    "vi": {
      "meaning": "hòa đồng, cởi mở",
      "sentence": "Cô gái có nhiều bạn bè và rất hòa đồng."
    },
    "th": {
      "meaning": "เข้าสังคมเก่ง",
      "sentence": "เด็กหญิงมีเพื่อนมากมายและเข้าสังคมเก่งมาก"
    },
    "ne": {
      "meaning": "सामाजिक / घुलमिल हुने",
      "sentence": "केटीका धेरै साथीहरू छन् र उनी धेरै सामाजिक छिन्।"
    },
    "ps": {
      "meaning": "ټولنیز",
      "sentence": "نجلۍ ډېر ملګري لري او ډېره ټولنیزه ده."
    }
  },
  "ensom": {
    "baseWord": "ensom",
    "field": 4,
    "da": {
      "meaning": "ensom",
      "sentence": "Den gamle mand føler sig ofte ensom."
    },
    "en": {
      "meaning": "lonely",
      "sentence": "The old man often feels lonely."
    },
    "de": {
      "meaning": "einsam",
      "sentence": "Der alte Mann fühlt sich oft einsam."
    },
    "es": {
      "meaning": "solitario / solo",
      "sentence": "El anciano se siente solo a menudo."
    },
    "pt": {
      "meaning": "solitário",
      "sentence": "O senhor de idade frequentemente se sente solitário."
    },
    "tr": {
      "meaning": "yalnız",
      "sentence": "Yaşlı adam kendini sıklıkla yalnız hissediyor."
    },
    "ar": {
      "meaning": "وحيد",
      "sentence": "يشعر الرجل العجوز بالوحدة في كثير من الأحيان."
    },
    "fa": {
      "meaning": "تنها",
      "sentence": "پیرمرد اغلب احساس تنهایی می‌کند."
    },
    "ku": {
      "meaning": "tenê / bi tenê",
      "sentence": "Zilamê kal gelek caran hîsa tenêtiyê dike."
    },
    "ur": {
      "meaning": "تنہا / اکیلا",
      "sentence": "بوڑھا آدمی اکثر تنہائی محسوس کرتا ہے۔"
    },
    "ru": {
      "meaning": "одинокий",
      "sentence": "Пожилой мужчина часто чувствует себя одиноким."
    },
    "uk": {
      "meaning": "самотній",
      "sentence": "Літній чоловік часто почувається самотнім."
    },
    "zh": {
      "meaning": "孤独的",
      "sentence": "那位老人经常感到孤独。"
    },
    "vi": {
      "meaning": "cô đơn",
      "sentence": "Cụ già thường cảm thấy cô đơn."
    },
    "th": {
      "meaning": "โดดเดี่ยว / เหงา",
      "sentence": "ชายชรามักจะรู้สึกโดดเดี่ยวบ่อยครั้ง"
    },
    "ne": {
      "meaning": "एक्लो",
      "sentence": "वृद्ध मानिस प्रायः एक्लो महसुस गर्छन्।"
    },
    "ps": {
      "meaning": "یوازې",
      "sentence": "بوډا سړی اکثرا د یوازیتوب احساس کوي."
    }
  },
  "tilfreds": {
    "baseWord": "tilfreds",
    "field": 4,
    "da": {
      "meaning": "tilfreds",
      "sentence": "Kunden er meget tilfreds med maden."
    },
    "en": {
      "meaning": "satisfied / pleased",
      "sentence": "The customer is very satisfied with the food."
    },
    "de": {
      "meaning": "zufrieden",
      "sentence": "Der Kunde ist mit dem Essen sehr zufrieden."
    },
    "es": {
      "meaning": "satisfecho / contento",
      "sentence": "El cliente está muy satisfecho con la comida."
    },
    "pt": {
      "meaning": "satisfeito",
      "sentence": "O cliente está muito satisfeito com a refeição."
    },
    "tr": {
      "meaning": "memnun",
      "sentence": "Müşteri yemekten çok memnun."
    },
    "ar": {
      "meaning": "راضٍ / ممتن",
      "sentence": "الزبون راضٍ جداً عن الطعام."
    },
    "fa": {
      "meaning": "راضی / خشنود",
      "sentence": "مشتری از غذا بسیار راضی است."
    },
    "ku": {
      "meaning": "razî",
      "sentence": "Mişterî ji xwarinê pir razî ye."
    },
    "ur": {
      "meaning": "مطمئن / خوش",
      "sentence": "گاہک کھانے سے بہت مطمئن ہے۔"
    },
    "ru": {
      "meaning": "довольный / удовлетворённый",
      "sentence": "Клиент очень доволен едой."
    },
    "uk": {
      "meaning": "задоволений",
      "sentence": "Клієнт дуже задоволений їжею."
    },
    "zh": {
      "meaning": "满意的",
      "sentence": "顾客对食物非常满意。"
    },
    "vi": {
      "meaning": "hài lòng, vừa ý",
      "sentence": "Khách hàng rất hài lòng với đồ ăn."
    },
    "th": {
      "meaning": "พอใจ",
      "sentence": "ลูกค้าพอใจกับอาหารมาก"
    },
    "ne": {
      "meaning": "सन्तुष्ट",
      "sentence": "ग्राहक खानासँग धेरै सन्तुष्ट छन्।"
    },
    "ps": {
      "meaning": "مطمئن / راضي",
      "sentence": "پیرودونکی له خوړو څخه ډېر راضي (مطمئن) دی."
    }
  },
  "utilfreds": {
    "baseWord": "utilfreds",
    "field": 4,
    "da": {
      "meaning": "utilfreds",
      "sentence": "Passageren er utilfreds med den forsinkede bus."
    },
    "en": {
      "meaning": "dissatisfied / displeased",
      "sentence": "The passenger is dissatisfied with the delayed bus."
    },
    "de": {
      "meaning": "unzufrieden",
      "sentence": "Der Fahrgast ist mit dem verspäteten Bus unzufrieden."
    },
    "es": {
      "meaning": "insatisfecho / descontento",
      "sentence": "El pasajero está disgustado con el autobús retrasado."
    },
    "pt": {
      "meaning": "insatisfeito / descontente",
      "sentence": "O passageiro está insatisfeito com o atraso do ônibus."
    },
    "tr": {
      "meaning": "memnuniyetsiz / hoşnutsuz",
      "sentence": "Yolcu geciken otobüsten hiç memnun değil."
    },
    "ar": {
      "meaning": "غير راضٍ / مستاء",
      "sentence": "الراكب مستاء وغير راضٍ عن تأخر الحافلة."
    },
    "fa": {
      "meaning": "ناراضی / ناخشنود",
      "sentence": "مسافر از اتوبوس با تأخیر ناراضی است."
    },
    "ku": {
      "meaning": "nerazî",
      "sentence": "Rêwî ji otobusa derengmayî nerazî ye."
    },
    "ur": {
      "meaning": "غیر مطمئن / ناخوش",
      "sentence": "مسافر بس کی تاخیر سے ناخوش ہے۔"
    },
    "ru": {
      "meaning": "недовольный",
      "sentence": "Пассажир недоволен опозданием автобуса."
    },
    "uk": {
      "meaning": "невдоволений",
      "sentence": "Пасажир невдоволений затримкою автобуса."
    },
    "zh": {
      "meaning": "不满意的",
      "sentence": "乘客对晚点的公交车感到不满。"
    },
    "vi": {
      "meaning": "không hài lòng, bất mãn",
      "sentence": "Hành khách không hài lòng vì xe buýt bị trễ."
    },
    "th": {
      "meaning": "ไม่พอใจ",
      "sentence": "ผู้โดยสารไม่พอใจที่รถบัสมาล่าช้า"
    },
    "ne": {
      "meaning": "असन्तुष्ट",
      "sentence": "यात्रु ढिलो भएको बसप्रति असन्तुष्ट छन्।"
    },
    "ps": {
      "meaning": "ناراضه / نامطمئن",
      "sentence": "مسافر د بس له ځنډېدو څخه ناخوښه (ناراضه) دی."
    }
  },
  "ren": {
    "baseWord": "ren",
    "field": 5,
    "da": {
      "meaning": "ren",
      "sentence": "Spisebordet i det lyse køkken er helt rent og pænt."
    },
    "en": {
      "meaning": "clean",
      "sentence": "The dining table in the bright kitchen is completely clean and neat."
    },
    "de": {
      "meaning": "sauber",
      "sentence": "Der Esstisch in der hellen Küche ist völlig sauber und ordentlich."
    },
    "es": {
      "meaning": "limpio",
      "sentence": "La mesa del comedor en la cocina iluminada está totalmente limpia y ordenada."
    },
    "pt": {
      "meaning": "limpo",
      "sentence": "A mesa de jantar na cozinha clara está totalmente limpa e bonita."
    },
    "tr": {
      "meaning": "temiz",
      "sentence": "Aydınlık mutfaktaki yemek masası tertemiz ve düzenli."
    },
    "ar": {
      "meaning": "نظيف",
      "sentence": "طاولة الطعام في المطبخ المضيء نظيفة ومرتبة تماماً."
    },
    "fa": {
      "meaning": "تمیز / پاکیزه",
      "sentence": "میز ناهارخوری در آشپزخانه روشن، کاملاً تمیز و مرتب است."
    },
    "ku": {
      "meaning": "paqij",
      "sentence": "Mêza xwarinê ya li metbexa ronî bi temamî paqij û xweşik e."
    },
    "ur": {
      "meaning": "صاف",
      "sentence": "روشن باورچی خانے میں کھانے کی میز بالکل صاف اور سلیقے سے ہے۔"
    },
    "ru": {
      "meaning": "чистый",
      "sentence": "Обеденный стол на светлой кухне совершенно чистый и аккуратный."
    },
    "uk": {
      "meaning": "чистий",
      "sentence": "Обідній стіл на світлій кухні абсолютно чистий і охайний."
    },
    "zh": {
      "meaning": "干净的 / 清洁的",
      "sentence": "明亮厨房里的餐桌非常干净整洁。"
    },
    "vi": {
      "meaning": "sạch sẽ",
      "sentence": "Bàn ăn trong gian bếp sáng sủa hoàn toàn sạch sẽ và gọn gàng."
    },
    "th": {
      "meaning": "สะอาด",
      "sentence": "โต๊ะอาหารในห้องครัวที่สว่างนั้นสะอาดสะอ้านและเรียบร้อยดีมาก"
    },
    "ne": {
      "meaning": "सफा",
      "sentence": "उज्यालो भान्साको भोजन तालिका पूर्ण रूपमा सफा र राम्रो छ।"
    },
    "ps": {
      "meaning": "پاک",
      "sentence": "په روښانه پخلنځي کې د خوړو مېز په بشپړه توګه پاک او ښکلی دی."
    }
  },
  "beskidt": {
    "baseWord": "beskidt",
    "field": 5,
    "da": {
      "meaning": "beskidt",
      "sentence": "Tallerkenen på bordet er meget beskidt."
    },
    "en": {
      "meaning": "dirty",
      "sentence": "The plate on the table is very dirty."
    },
    "de": {
      "meaning": "schmutzig / dreckig",
      "sentence": "Der Teller auf dem Tisch ist sehr schmutzig."
    },
    "es": {
      "meaning": "sucio",
      "sentence": "El plato sobre la mesa está muy sucio."
    },
    "pt": {
      "meaning": "sujo",
      "sentence": "O prato em cima da mesa está muito sujo."
    },
    "tr": {
      "meaning": "kirli",
      "sentence": "Masadaki tabak çok kirli."
    },
    "ar": {
      "meaning": "متسخ",
      "sentence": "الصحن على الطاولة متسخ جداً."
    },
    "fa": {
      "meaning": "کثیف",
      "sentence": "بشقاب روی میز بسیار کثیف است."
    },
    "ku": {
      "meaning": "pîs",
      "sentence": "Firaqa li ser mêzê pir pîs e."
    },
    "ur": {
      "meaning": "گندا",
      "sentence": "میز پر رکھی پلیٹ بہت گندی ہے۔"
    },
    "ru": {
      "meaning": "грязный",
      "sentence": "Тарелка на столе очень грязная."
    },
    "uk": {
      "meaning": "брудний",
      "sentence": "Тарілка на столі дуже брудна."
    },
    "zh": {
      "meaning": "脏的",
      "sentence": "桌子上的盘子很脏。"
    },
    "vi": {
      "meaning": "bẩn, dơ",
      "sentence": "Chiếc đĩa trên bàn rất bẩn."
    },
    "th": {
      "meaning": "สกปรก",
      "sentence": "จานบนโต๊ะสกปรกมาก"
    },
    "ne": {
      "meaning": "फोहोर",
      "sentence": "टेबुलको थाल धेरै फोहोर छ।"
    },
    "ps": {
      "meaning": "چټل / ناپاکه",
      "sentence": "په مېز باندې تالۍ ډېره چټله ده."
    }
  },
  "sund": {
    "baseWord": "sund",
    "field": 5,
    "da": {
      "meaning": "sund",
      "sentence": "Grøntsager og frugt er meget sund mad."
    },
    "en": {
      "meaning": "healthy",
      "sentence": "Vegetables and fruit are very healthy food."
    },
    "de": {
      "meaning": "gesund",
      "sentence": "Gemüse und Obst sind sehr gesunde Lebensmittel."
    },
    "es": {
      "meaning": "saludable / sano",
      "sentence": "Las verduras y las frutas son alimentos muy saludables."
    },
    "pt": {
      "meaning": "saudável",
      "sentence": "Legumes e frutas são comidas muito saudáveis."
    },
    "tr": {
      "meaning": "sağlıklı",
      "sentence": "Sebze ve meyveler çok sağlıklı yiyeceklerdir."
    },
    "ar": {
      "meaning": "صحي",
      "sentence": "الخضار والفواكه أطعمة صحية جداً."
    },
    "fa": {
      "meaning": "سالم / مقوی",
      "sentence": "سبزیجات و میوه‌ها غذاهای بسیار سالمی هستند."
    },
    "ku": {
      "meaning": "saxlem",
      "sentence": "Sebze û fêkî xwarinên pir saxlem in."
    },
    "ur": {
      "meaning": "صحت بخش / تندرست",
      "sentence": "سبزیاں اور پھل بہت صحت بخش خوراک ہیں۔"
    },
    "ru": {
      "meaning": "здоровый / полезный для здоровья",
      "sentence": "Овощи и фрукты — очень здоровая еда."
    },
    "uk": {
      "meaning": "здоровий / корисний",
      "sentence": "Овочі та фрукти — дуже корисна їжа."
    },
    "zh": {
      "meaning": "健康的",
      "sentence": "蔬菜和水果是非常健康的食物。"
    },
    "vi": {
      "meaning": "lành mạnh, tốt cho sức khỏe",
      "sentence": "Rau và hoa quả là thức ăn rất tốt cho sức khỏe."
    },
    "th": {
      "meaning": "ดีต่อสุขภาพ",
      "sentence": "ผักและผลไม้เป็นอาหารที่ดีต่อสุขภาพมาก"
    },
    "ne": {
      "meaning": "स्वस्थ / पौष्टिक",
      "sentence": "तरकारी र फलफूल धेरै स्वस्थकर खाना हुन्।"
    },
    "ps": {
      "meaning": "روغ / روغتیا بخښونکی",
      "sentence": "سبزيجات او میوې ډېر روغتیایي خواړه دي."
    }
  },
  "syg": {
    "baseWord": "syg",
    "field": 5,
    "da": {
      "meaning": "syg",
      "sentence": "Barnet har feber og er sygt i dag."
    },
    "en": {
      "meaning": "sick / ill",
      "sentence": "The child has a fever and is sick today."
    },
    "de": {
      "meaning": "krank",
      "sentence": "Das Kind hat Fieber und ist heute krank."
    },
    "es": {
      "meaning": "enfermo",
      "sentence": "El niño tiene fiebre y hoy está enfermo."
    },
    "pt": {
      "meaning": "doente",
      "sentence": "A criança está com febre e doente hoje."
    },
    "tr": {
      "meaning": "hasta",
      "sentence": "Çocuğun ateşi var ve bugün hasta."
    },
    "ar": {
      "meaning": "مريض",
      "sentence": "الطفل يعاني من الحمى وهو مريض اليوم."
    },
    "fa": {
      "meaning": "بیمار / مریض",
      "sentence": "کودک تب دارد و امروز بیمار است."
    },
    "ku": {
      "meaning": "nexweş",
      "sentence": "Zarok agirî ye û îro nexweş e."
    },
    "ur": {
      "meaning": "بیمار",
      "sentence": "بچے کو بخار ہے اور وہ آج بیمار ہے۔"
    },
    "ru": {
      "meaning": "больной",
      "sentence": "У ребёнка жар, и сегодня он болен."
    },
    "uk": {
      "meaning": "хворий",
      "sentence": "У дитини температура, і сьогодні вона хвора."
    },
    "zh": {
      "meaning": "生病的",
      "sentence": "孩子发烧了，今天生病了。"
    },
    "vi": {
      "meaning": "ốm, bệnh",
      "sentence": "Đứa bé bị sốt và hôm nay bị ốm."
    },
    "th": {
      "meaning": "ป่วย",
      "sentence": "วันนี้เด็กมีไข้และป่วย"
    },
    "ne": {
      "meaning": "बिरामी",
      "sentence": "बच्चालाई ज्वरो आएको छ र ऊ आज बिरामी छ।"
    },
    "ps": {
      "meaning": "ناروغه",
      "sentence": "ماشوم تبه لري او نن ناروغه دی."
    }
  },
  "hel": {
    "baseWord": "hel",
    "field": 5,
    "da": {
      "meaning": "hel",
      "sentence": "Familien spiste en hel pizza til aften."
    },
    "en": {
      "meaning": "whole / entire",
      "sentence": "The family ate a whole pizza for dinner."
    },
    "de": {
      "meaning": "ganz",
      "sentence": "Die Familie hat zum Abendessen eine ganze Pizza gegessen."
    },
    "es": {
      "meaning": "entero",
      "sentence": "La familia cenó una pizza entera."
    },
    "pt": {
      "meaning": "inteiro",
      "sentence": "A família comeu uma pizza inteira no jantar."
    },
    "tr": {
      "meaning": "bütün / tam",
      "sentence": "Aile akşam yemeğinde tam bir pizzayı bitirdi."
    },
    "ar": {
      "meaning": "كامل",
      "sentence": "تناولت العائلة بيتزا كاملة في وجبة العشاء."
    },
    "fa": {
      "meaning": "کامل / تمام",
      "sentence": "خانواده برای شام یک پیتزای کامل خوردند."
    },
    "ku": {
      "meaning": "tevahî / tam",
      "sentence": "Malbatê ji bo şîvê pîzzayeke tam xwar."
    },
    "ur": {
      "meaning": "پورا / تمام",
      "sentence": "خاندان نے رات کے کھانے میں ایک پوری پیزا کھائی۔"
    },
    "ru": {
      "meaning": "целый",
      "sentence": "Семья съела на ужин целую пиццу."
    },
    "uk": {
      "meaning": "цілий",
      "sentence": "Сім'я з'їла на вечерю цілу піцу."
    },
    "zh": {
      "meaning": "整个的 / 完整的",
      "sentence": "一家人晚餐吃掉了一整块披萨。"
    },
    "vi": {
      "meaning": "toàn bộ, nguyên vẹn",
      "sentence": "Cả gia đình đã ăn hết cả một chiếc bánh pizza vào bữa tối."
    },
    "th": {
      "meaning": "ทั้งอัน / เต็มๆ",
      "sentence": "ครอบครัวกินพิซซ่าทั้งถาดเป็นอาหารเย็น"
    },
    "ne": {
      "meaning": "पूरै / सिङ्गो",
      "sentence": "परिवारले बेलुकाको खानामा पूरै पिज्जा खाए।"
    },
    "ps": {
      "meaning": "بشپړ / ټول",
      "sentence": "کورنۍ د شپې په ډوډۍ کې یو بشپړ پیزا وخوړ."
    }
  },
  "halv": {
    "baseWord": "halv",
    "field": 5,
    "da": {
      "meaning": "halv",
      "sentence": "Han spiser et halvt æble i pausen."
    },
    "en": {
      "meaning": "half",
      "sentence": "He eats half an apple during the break."
    },
    "de": {
      "meaning": "halb",
      "sentence": "Er isst in der Pause einen halben Apfel."
    },
    "es": {
      "meaning": "medio",
      "sentence": "Él come media manzana en el descanso."
    },
    "pt": {
      "meaning": "meio / metade",
      "sentence": "Ele come meia maçã no intervalo."
    },
    "tr": {
      "meaning": "yarım",
      "sentence": "Molada yarım elma yiyor."
    },
    "ar": {
      "meaning": "نصف",
      "sentence": "يأكل نصف تفاحة خلال الاستراحة."
    },
    "fa": {
      "meaning": "نصف / نیم",
      "sentence": "او در زمان استراحت نصف یک سیب را می‌خورد."
    },
    "ku": {
      "meaning": "nîv",
      "sentence": "Ew di bêhnvedanê de nîv sêvekê dixwe."
    },
    "ur": {
      "meaning": "آدھا",
      "sentence": "وہ وقفے کے دوران آدھا سیب کھاتا ہے۔"
    },
    "ru": {
      "meaning": "половина / половинный",
      "sentence": "Во время перерыва он съедает половинку яблока."
    },
    "uk": {
      "meaning": "половинний / пів-",
      "sentence": "Під час перерви він з'їдає половинку яблука."
    },
    "zh": {
      "meaning": "一半的",
      "sentence": "他在休息时间吃了半个苹果。"
    },
    "vi": {
      "meaning": "một nửa",
      "sentence": "Cậu ấy ăn nửa quả táo trong giờ giải lao."
    },
    "th": {
      "meaning": "ครึ่ง",
      "sentence": "เขากินแอปเปิลครึ่งลูกในช่วงเวลาพัก"
    },
    "ne": {
      "meaning": "आधा",
      "sentence": "ऊ विश्रामको समयमा आधा स्याउ खान्छ।"
    },
    "ps": {
      "meaning": "نیم / نیمه",
      "sentence": "هغه په وقفه کې یوه نیمه مڼه خوري."
    }
  },
  "mange": {
    "baseWord": "mange",
    "field": 5,
    "da": {
      "meaning": "mange",
      "sentence": "Der er mange elever i klassen i dag."
    },
    "en": {
      "meaning": "many",
      "sentence": "There are many students in class today."
    },
    "de": {
      "meaning": "viele",
      "sentence": "Heute sind viele Schüler in der Klasse."
    },
    "es": {
      "meaning": "muchos",
      "sentence": "Hay muchos alumnos en la clase hoy."
    },
    "pt": {
      "meaning": "muitos",
      "sentence": "Há muitos alunos na sala hoje."
    },
    "tr": {
      "meaning": "çok / birçok",
      "sentence": "Bugün sınıfta birçok öğrenci var."
    },
    "ar": {
      "meaning": "كثير",
      "sentence": "يوجد الكثير من الطلاب في الفصل اليوم."
    },
    "fa": {
      "meaning": "بسیار / زیاد",
      "sentence": "امروز دانش‌آموزان زیادی در کلاس هستند."
    },
    "ku": {
      "meaning": "gelek / pir",
      "sentence": "Îro di polê de gelek xwendekar hene."
    },
    "ur": {
      "meaning": "بہت سے / زیادہ",
      "sentence": "آج کلاس میں بہت سے طلباء موجود ہیں۔"
    },
    "ru": {
      "meaning": "многие / много",
      "sentence": "Сегодня в классе много учеников."
    },
    "uk": {
      "meaning": "багато / численні",
      "sentence": "Сьогодні в класі багато учнів."
    },
    "zh": {
      "meaning": "许多的 / 多的",
      "sentence": "今天班上有很多学生。"
    },
    "vi": {
      "meaning": "nhiều",
      "sentence": "Hôm nay có rất nhiều học sinh trong lớp."
    },
    "th": {
      "meaning": "หลาย / มากมาย",
      "sentence": "วันนี้มีนักเรียนอยู่ในห้องเรียนหลายคน"
    },
    "ne": {
      "meaning": "धेरै",
      "sentence": "आज कक्षामा धेरै विद्यार्थीहरू छन्।"
    },
    "ps": {
      "meaning": "ډېر",
      "sentence": "نن په ټولګي کې ډېر زده کوونکي شته."
    }
  },
  "få": {
    "baseWord": "få",
    "field": 5,
    "da": {
      "meaning": "få",
      "sentence": "Der er kun få ledige pladser i bussen."
    },
    "en": {
      "meaning": "few",
      "sentence": "There are only a few available seats on the bus."
    },
    "de": {
      "meaning": "wenige",
      "sentence": "Im Bus gibt es nur wenige freie Plätze."
    },
    "es": {
      "meaning": "pocos",
      "sentence": "Solo quedan pocos asientos libres en el autobús."
    },
    "pt": {
      "meaning": "poucos",
      "sentence": "Há apenas poucos assentos livres no ônibus."
    },
    "tr": {
      "meaning": "az",
      "sentence": "Otobüste sadece birkaç boş koltuk var."
    },
    "ar": {
      "meaning": "قليل",
      "sentence": "لا يوجد سوى مقاعد شاغرة قليلة في الحافلة."
    },
    "fa": {
      "meaning": "اندک / کم",
      "sentence": "تنها چند صندلی خالی در اتوبوس وجود دارد."
    },
    "ku": {
      "meaning": "hindik / kêm",
      "sentence": "Di otobusê de tenê çend cihên vala hene."
    },
    "ur": {
      "meaning": "چند / تھوڑے",
      "sentence": "بس میں صرف چند خالی نشستیں ہیں۔"
    },
    "ru": {
      "meaning": "немногие / мало",
      "sentence": "В автобусе осталось всего несколько свободных мест."
    },
    "uk": {
      "meaning": "нечисленні / небагато",
      "sentence": "В автобусі є лише кілька вільних місць."
    },
    "zh": {
      "meaning": "少数的 / 很少的",
      "sentence": "公交车上只有很少的空座位。"
    },
    "vi": {
      "meaning": "ít, vài",
      "sentence": "Chỉ còn rất ít chỗ ngồi trống trên xe buýt."
    },
    "th": {
      "meaning": "น้อย / ไม่กี่",
      "sentence": "บนรถบัสมีที่นั่งว่างเหลือเพียงไม่กี่ที่นั่ง"
    },
    "ne": {
      "meaning": "थोरै",
      "sentence": "बसमा केही थोरै खाली सिटहरू मात्र छन्।"
    },
    "ps": {
      "meaning": "لږ / کم",
      "sentence": "په بس کې یوازې لږ خالي ځایونه پاتې دي."
    }
  },
  "sikker": {
    "baseWord": "sikker",
    "field": 5,
    "da": {
      "meaning": "sikker",
      "sentence": "Den nye cykelhjelm er helt sikker."
    },
    "en": {
      "meaning": "safe / secure",
      "sentence": "The new bicycle helmet is completely safe."
    },
    "de": {
      "meaning": "sicher",
      "sentence": "Der neue Fahrradhelm ist absolut sicher."
    },
    "es": {
      "meaning": "seguro",
      "sentence": "El nuevo casco de bicicleta es totalmente seguro."
    },
    "pt": {
      "meaning": "seguro",
      "sentence": "O novo capacete de bicicleta é totalmente seguro."
    },
    "tr": {
      "meaning": "güvenli",
      "sentence": "Yeni bisiklet kaskı tamamen güvenli."
    },
    "ar": {
      "meaning": "آمن",
      "sentence": "خوذة الدراجة الجديدة آمنة تماماً."
    },
    "fa": {
      "meaning": "امن / مطمئن",
      "sentence": "کلاه ایمنی جدید دوچرخه کاملاً مطمئن و امن است."
    },
    "ku": {
      "meaning": "ewle",
      "sentence": "Kulikê bîsîkletê yê nû bi temamî ewle ye."
    },
    "ur": {
      "meaning": "محفوظ",
      "sentence": "سائیکل کا نیا ہیلمٹ بالکل محفوظ ہے۔"
    },
    "ru": {
      "meaning": "безопасный / надёжный",
      "sentence": "Новый велосипедный шлем абсолютно надёжен."
    },
    "uk": {
      "meaning": "безпечний / надійний",
      "sentence": "Новий велосипедний шолом абсолютно надійний."
    },
    "zh": {
      "meaning": "安全的",
      "sentence": "这个新的骑行头盔绝对安全。"
    },
    "vi": {
      "meaning": "an toàn",
      "sentence": "Mũ bảo hiểm xe đạp mới hoàn toàn an toàn."
    },
    "th": {
      "meaning": "ปลอดภัย",
      "sentence": "หมวกกันน็อกจักรยานใบใหม่ปลอดภัยอย่างสมบูรณ์"
    },
    "ne": {
      "meaning": "सुरक्षित",
      "sentence": "नयाँ साइकल हेल्मेट पूर्ण रूपमा सुरक्षित छ।"
    },
    "ps": {
      "meaning": "خوندي / باوري",
      "sentence": "د بایسکل نوی خولۍ په بشپړه توګه خوندي دی."
    }
  },
  "usikker": {
    "baseWord": "usikker",
    "field": 5,
    "da": {
      "meaning": "usikker",
      "sentence": "Den gamle stige er meget usikker at stå på."
    },
    "en": {
      "meaning": "unsafe / unsteady",
      "sentence": "The old ladder is very unsteady to stand on."
    },
    "de": {
      "meaning": "unsicher / wackelig",
      "sentence": "Es ist sehr unsicher, auf der alten Leiter zu stehen."
    },
    "es": {
      "meaning": "inseguro / inestable",
      "sentence": "Es muy inseguro subirse a la vieja escalera."
    },
    "pt": {
      "meaning": "inseguro / instável",
      "sentence": "Ficar em pé na escada velha é muito perigoso e instável."
    },
    "tr": {
      "meaning": "güvensiz / dengesiz",
      "sentence": "Eski merdivenin üstünde durmak çok güvensiz."
    },
    "ar": {
      "meaning": "غير آمن / غير مستقر",
      "sentence": "السلم القديم غير آمن إطلاقاً للوقوف عليه."
    },
    "fa": {
      "meaning": "ناامن / متزلزل",
      "sentence": "ایستادن روی نردبان قدیمی بسیار ناامن و لرزان است."
    },
    "ku": {
      "meaning": "ne ewle / bêewle",
      "sentence": "Rawestîna li ser pêleka kevn pir ne ewle ye."
    },
    "ur": {
      "meaning": "غیر محفوظ / ڈانواڈول",
      "sentence": "پرانی سیڑھی پر کھڑا ہونا بہت غیر محفوظ ہے۔"
    },
    "ru": {
      "meaning": "ненадёжный / опасный",
      "sentence": "Стоять на старой лестнице очень небезопасно."
    },
    "uk": {
      "meaning": "ненадійний / небезпечний",
      "sentence": "Стояти на старих сходах дуже небезпечно."
    },
    "zh": {
      "meaning": "不稳定的 / 危险的",
      "sentence": "站在那把旧梯子上非常不稳固。"
    },
    "vi": {
      "meaning": "không an toàn, chông chênh",
      "sentence": "Chiếc thang cũ đứng lên rất chông chênh."
    },
    "th": {
      "meaning": "ไม่มั่นคง / ไม่ปลอดภัย",
      "sentence": "บันไดเก่านั้นไม่มั่นคงและอันตรายที่จะปีนยืน"
    },
    "ne": {
      "meaning": "असुरक्षित / धरममर",
      "sentence": "पुरानो भर्‍याङमा उभिन धेरै असुरक्षित छ।"
    },
    "ps": {
      "meaning": "ناخوندي / بې ثباته",
      "sentence": "په زړې زینه باندې ودرېدل ډېر ناخوندي دي."
    }
  },
  "klar": {
    "baseWord": "klar",
    "field": 5,
    "da": {
      "meaning": "klar",
      "sentence": "Vandet i glasset er helt klart og rent."
    },
    "en": {
      "meaning": "clear (liquid/message)",
      "sentence": "The water in the glass is completely clear and clean."
    },
    "de": {
      "meaning": "klar (durchsichtig)",
      "sentence": "Das Wasser im Glas ist vollkommen klar und sauber."
    },
    "es": {
      "meaning": "claro / transparente",
      "sentence": "El agua del vaso está completamente clara y limpia."
    },
    "pt": {
      "meaning": "límpido / transparente",
      "sentence": "A água no copo está totalmente límpida e limpa."
    },
    "tr": {
      "meaning": "berrak / duru",
      "sentence": "Bardaktaki su son derece berrak ve temiz."
    },
    "ar": {
      "meaning": "صافٍ / نقي",
      "sentence": "الماء في الكوب صافٍ ونقي تماماً."
    },
    "fa": {
      "meaning": "شفاف / زلال",
      "sentence": "آب داخل لیوان کاملاً زلال و تمیز است."
    },
    "ku": {
      "meaning": "zelal",
      "sentence": "Ava di qedehê de bi temamî zelal û paqij e."
    },
    "ur": {
      "meaning": "شفاف / صاف",
      "sentence": "گلاس میں پانی بالکل شفاف اور صاف ہے۔"
    },
    "ru": {
      "meaning": "прозрачный / чистый",
      "sentence": "Вода в стакане совершенно прозрачная и чистая."
    },
    "uk": {
      "meaning": "прозорий / ясний",
      "sentence": "Вода в склянці абсолютно прозора і чиста."
    },
    "zh": {
      "meaning": "清澈的 / 清楚的",
      "sentence": "玻璃杯里的水非常清澈干净。"
    },
    "vi": {
      "meaning": "trong vắt, rõ ràng",
      "sentence": "Nước trong cốc hoàn toàn trong vắt và sạch sẽ."
    },
    "th": {
      "meaning": "ใส / ชัดเจน",
      "sentence": "น้ำในแก้วใสแจ๋วและสะอาดหมดจด"
    },
    "ne": {
      "meaning": "सफा / स्पष्ट",
      "sentence": "गिलासको पानी पूर्ण रूपमा सफा र स्वच्छ छ।"
    },
    "ps": {
      "meaning": "شفاف / روښانه",
      "sentence": "په ګیلاس کې اوبه په بشپړه توګه شفافې او پاکې دي."
    }
  },
  "uklar": {
    "baseWord": "uklar",
    "field": 5,
    "da": {
      "meaning": "uklar",
      "sentence": "Teksten på tavlen er meget uklar."
    },
    "en": {
      "meaning": "unclear / blurry",
      "sentence": "The text on the blackboard is very unclear."
    },
    "de": {
      "meaning": "unklar / undeutlich",
      "sentence": "Die Schrift an der Tafel ist sehr undeutlich."
    },
    "es": {
      "meaning": "confuso / borroso",
      "sentence": "El texto de la pizarra se ve muy borroso."
    },
    "pt": {
      "meaning": "ilegível / confuso",
      "sentence": "O texto no quadro-negro está muito confuso."
    },
    "tr": {
      "meaning": "belirsiz / net olmayan",
      "sentence": "Tahtadaki yazı çok belirsiz."
    },
    "ar": {
      "meaning": "غير واضح / غامض",
      "sentence": "النص المكتوب على السبورة غير واضح جداً."
    },
    "fa": {
      "meaning": "نامشخص / ناواضح",
      "sentence": "متن روی تخته بسیار نامشخص و ناواضح است."
    },
    "ku": {
      "meaning": "nezelal / tarî",
      "sentence": "Nivîsa li ser lewhayê pir nezelal e."
    },
    "ur": {
      "meaning": "غیر واضح / دھندلا",
      "sentence": "تختہ سیاہ پر لکھا متن بہت غیر واضح ہے۔"
    },
    "ru": {
      "meaning": "неясный / нечёткий",
      "sentence": "Текст на доске очень неразборчивый."
    },
    "uk": {
      "meaning": "нечіткий / неясний",
      "sentence": "Текст на дошці дуже нечіткий."
    },
    "zh": {
      "meaning": "模糊的 / 不清晰的",
      "sentence": "黑板上的字迹非常模糊。"
    },
    "vi": {
      "meaning": "mờ nhạt, không rõ ràng",
      "sentence": "Chữ viết trên bảng rất mờ và không rõ ràng."
    },
    "th": {
      "meaning": "ไม่ชัดเจน / มัว",
      "sentence": "ข้อความบนกระดานดำไม่ชัดเจนเลย"
    },
    "ne": {
      "meaning": "अस्पष्ट",
      "sentence": "कालोपाटीको पाठ धेरै अस्पष्ट छ।"
    },
    "ps": {
      "meaning": "ناڅرګند / نامعلوم",
      "sentence": "په تختې باندې لیکل شوی متن ډېر ناڅرګند دی."
    }
  },
  "tør": {
    "baseWord": "tør",
    "field": 5,
    "da": {
      "meaning": "tør",
      "sentence": "Det hvide viskestykke er helt tørt og rent."
    },
    "en": {
      "meaning": "dry",
      "sentence": "The white dish towel is completely dry and clean."
    },
    "de": {
      "meaning": "trocken",
      "sentence": "Das weiße Geschirrtuch ist völlig trocken und sauber."
    },
    "es": {
      "meaning": "seco",
      "sentence": "El paño de cocina blanco está totalmente seco y limpio."
    },
    "pt": {
      "meaning": "seco",
      "sentence": "O pano de prato branco está completamente seco e limpo."
    },
    "tr": {
      "meaning": "kuru",
      "sentence": "Beyaz mutfak bezi tamamen kuru ve temiz."
    },
    "ar": {
      "meaning": "جاف / ناشف",
      "sentence": "منشفة الأطباق البيضاء جافة ونظيفة تماماً."
    },
    "fa": {
      "meaning": "خشک",
      "sentence": "دستمال ظروف سفید کاملاً خشک و تمیز است."
    },
    "ku": {
      "meaning": "ziwa",
      "sentence": "Destmala sêniyan a spî bi temamî ziwa û paqij e."
    },
    "ur": {
      "meaning": "خشک",
      "sentence": "برتن صاف کرنے والا سفید کپڑا بالکل خشک اور صاف ہے۔"
    },
    "ru": {
      "meaning": "сухой",
      "sentence": "Белое кухонное полотенце совершенно сухое и чистое."
    },
    "uk": {
      "meaning": "сухий",
      "sentence": "Білий кухонний рушник абсолютно сухий і чистий."
    },
    "zh": {
      "meaning": "干的 / 干燥的",
      "sentence": "白色的抹布完全干了，很干净。"
    },
    "vi": {
      "meaning": "khô ráo",
      "sentence": "Khăn lau bát màu trắng hoàn toàn khô ráo và sạch sẽ."
    },
    "th": {
      "meaning": "แห้ง",
      "sentence": "ผ้าเช็ดจานสีขาวแห้งสนิทและสะอาด"
    },
    "ne": {
      "meaning": "सुक्खा",
      "sentence": "सेतो भाँडा पुछ्ने कपडा पूरै सुक्खा र सफा छ।"
    },
    "ps": {
      "meaning": "وچ",
      "sentence": "د لوښو پاکولو سپینه ټوټه په بشپړه توګه وچه او پاکه ده."
    }
  },
  "våd": {
    "baseWord": "våd",
    "field": 5,
    "da": {
      "meaning": "våd",
      "sentence": "Gulvet på badeværelset er meget vådt."
    },
    "en": {
      "meaning": "wet",
      "sentence": "The floor in the bathroom is very wet."
    },
    "de": {
      "meaning": "nass",
      "sentence": "Der Badezimmerboden ist sehr nass."
    },
    "es": {
      "meaning": "mojado",
      "sentence": "El suelo del baño está muy mojado."
    },
    "pt": {
      "meaning": "molhado",
      "sentence": "O chão do banheiro está muito molhado."
    },
    "tr": {
      "meaning": "ıslak",
      "sentence": "Banyonun zemini çok ıslak."
    },
    "ar": {
      "meaning": "مبلل / رطب",
      "sentence": "أرضية الحمام مبللة جداً."
    },
    "fa": {
      "meaning": "خیس",
      "sentence": "کف حمام بسیار خیس است."
    },
    "ku": {
      "meaning": "şil",
      "sentence": "Erdê hemamê pir şil e."
    },
    "ur": {
      "meaning": "گیلا",
      "sentence": "غسل خانے کا فرش بہت گیلا ہے۔"
    },
    "ru": {
      "meaning": "мокрый",
      "sentence": "Пол в ванной комнате очень мокрый."
    },
    "uk": {
      "meaning": "мокрий",
      "sentence": "Підлога у ванній кімнаті дуже мокра."
    },
    "zh": {
      "meaning": "湿的",
      "sentence": "浴室的地板非常潮湿。"
    },
    "vi": {
      "meaning": "ướt",
      "sentence": "Sàn phòng tắm rất ướt."
    },
    "th": {
      "meaning": "เปียก",
      "sentence": "พื้นห้องน้ำเปียกมาก"
    },
    "ne": {
      "meaning": "भिजेको",
      "sentence": "शौचालयको भुइँ धेरै भिजेको छ।"
    },
    "ps": {
      "meaning": "لوند",
      "sentence": "د حمام فرش ډېر لوند دی."
    }
  },
  "lys": {
    "baseWord": "lys",
    "field": 5,
    "da": {
      "meaning": "lys",
      "sentence": "Dagslyset strømmer ind gennem det store, lyse vindue."
    },
    "en": {
      "meaning": "bright / light",
      "sentence": "Daylight streams in through the large, bright window."
    },
    "de": {
      "meaning": "hell / lichtreich",
      "sentence": "Das Tageslicht strömt durch das große, helle Fenster."
    },
    "es": {
      "meaning": "luminoso / claro",
      "sentence": "La luz del día entra por la ventana grande y luminosa."
    },
    "pt": {
      "meaning": "iluminado / claro",
      "sentence": "A luz do dia entra pela janela grande e ensolarada."
    },
    "tr": {
      "meaning": "aydınlık",
      "sentence": "Gün ışığı büyük ve aydınlık pencereden içeri süzülüyor."
    },
    "ar": {
      "meaning": "مضيء / مشرق",
      "sentence": "يتدفق ضوء النهار عبر النافذة الكبيرة المضيئة."
    },
    "fa": {
      "meaning": "روشن",
      "sentence": "نور روز از پنجره بزرگ و روشن به داخل می‌تابد."
    },
    "ku": {
      "meaning": "ronî",
      "sentence": "Ronahiya rojê di pencereya mezin û ronî de dikeve hundur."
    },
    "ur": {
      "meaning": "روشن",
      "sentence": "بڑی، روشن کھڑکی سے دن کی روشنی اندر آ رہی ہے۔"
    },
    "ru": {
      "meaning": "светлый",
      "sentence": "Дневной свет льётся через большое светлое окно."
    },
    "uk": {
      "meaning": "світлий",
      "sentence": "Денне світло ллється крізь велике світле вікно."
    },
    "zh": {
      "meaning": "明亮的",
      "sentence": "阳光从明亮的大窗户照了进来。"
    },
    "vi": {
      "meaning": "sáng sủa",
      "sentence": "Ánh sáng ban ngày tràn vào qua ô cửa sổ lớn và sáng sủa."
    },
    "th": {
      "meaning": "สว่าง",
      "sentence": "แสงแดดส่องผ่านหน้าต่างบานใหญ่ที่สว่างเข้ามา"
    },
    "ne": {
      "meaning": "उज्यालो",
      "sentence": "दिनको उज्यालो ठूलो र उज्यालो झ्यालबाट भित्र पस्छ।"
    },
    "ps": {
      "meaning": "روښانه",
      "sentence": "د ورځې رڼا د لویې، روښانه کړکۍ له لارې دننه راځي."
    }
  },
  "mørk": {
    "baseWord": "mørk",
    "field": 5,
    "da": {
      "meaning": "mørk",
      "sentence": "Gaden uden lamper er meget mørk om natten."
    },
    "en": {
      "meaning": "dark",
      "sentence": "The street without lamps is very dark at night."
    },
    "de": {
      "meaning": "dunkel",
      "sentence": "Die Straße ohne Laternen ist nachts sehr dunkel."
    },
    "es": {
      "meaning": "oscuro",
      "sentence": "La calle sin farolas es muy oscura de noche."
    },
    "pt": {
      "meaning": "escuro",
      "sentence": "A rua sem postes de luz é muito escura à noite."
    },
    "tr": {
      "meaning": "karanlık",
      "sentence": "Sokak lambaları olmayan cadde gece çok karanlık."
    },
    "ar": {
      "meaning": "مظلم",
      "sentence": "الشارع الخالي من المصابيح مظلم جداً في الليل."
    },
    "fa": {
      "meaning": "تاریک",
      "sentence": "خیابان بدون چراغ در شب بسیار تاریک است."
    },
    "ku": {
      "meaning": "tarî",
      "sentence": "Kolana bê çira bi şev pir tarî ye."
    },
    "ur": {
      "meaning": "تاریک / اندھیرا",
      "sentence": "بغیر لیمپ والی سڑک رات کو بہت تاریک ہوتی ہے۔"
    },
    "ru": {
      "meaning": "тёмный",
      "sentence": "Улица без фонарей ночью очень тёмная."
    },
    "uk": {
      "meaning": "темний",
      "sentence": "Вулиця без ліхтарів уночі дуже темна."
    },
    "zh": {
      "meaning": "黑暗的 / 昏暗的",
      "sentence": "这条没有路灯的街道在夜晚十分黑暗。"
    },
    "vi": {
      "meaning": "tối tăm",
      "sentence": "Con phố không có đèn đường rất tối vào ban đêm."
    },
    "th": {
      "meaning": "มืด",
      "sentence": "ถนนที่ไม่มีไฟส่องสว่างมืดมากในตอนกลางคืน"
    },
    "ne": {
      "meaning": "अध्याँरो",
      "sentence": "बत्ती नभएको सडक राति धेरै अध्याँरो हुन्छ।"
    },
    "ps": {
      "meaning": "تیاره",
      "sentence": "د څراغونو پرته سړک د شپې ډېر تیاره وي."
    }
  },
  "grøn": {
    "baseWord": "grøn",
    "field": 5,
    "da": {
      "meaning": "grøn",
      "sentence": "I urtepotterne gror friske grønne urter."
    },
    "en": {
      "meaning": "green",
      "sentence": "Fresh green herbs grow in the herb pots."
    },
    "de": {
      "meaning": "grün",
      "sentence": "In den Töpfen wachsen frische grüne Kräuter."
    },
    "es": {
      "meaning": "verde",
      "sentence": "En las macetas crecen hierbas verdes y frescas."
    },
    "pt": {
      "meaning": "verde",
      "sentence": "Ervas verdes e frescas crescem nos vasinhos."
    },
    "tr": {
      "meaning": "yeşil",
      "sentence": "Saksılarda taze yeşil otlar yetişiyor."
    },
    "ar": {
      "meaning": "أخضر",
      "sentence": "تنمو الأعشاب الخضراء الطازجة في أواني النباتات."
    },
    "fa": {
      "meaning": "سبز",
      "sentence": "سبزی‌های تازه و سبز در گلدان‌ها رشد می‌کنند."
    },
    "ku": {
      "meaning": "kesk",
      "sentence": "Di potên giyayan de giyayên teze yên kesk şîn dibin."
    },
    "ur": {
      "meaning": "سبز",
      "sentence": "گملوں میں تازہ سبز جڑی بوٹیاں اگ رہی ہیں۔"
    },
    "ru": {
      "meaning": "зелёный",
      "sentence": "В горшочках растут свежие зелёные травы."
    },
    "uk": {
      "meaning": "зелений",
      "sentence": "У горщиках ростуть свіжі зелені трави."
    },
    "zh": {
      "meaning": "绿色的",
      "sentence": "花盆里生长着新鲜的绿色香草。"
    },
    "vi": {
      "meaning": "xanh lá cây",
      "sentence": "Rau thơm xanh tươi đang mọc trong các chậu cây."
    },
    "th": {
      "meaning": "สีเขียว",
      "sentence": "สมุนไพรสดสีเขียวกำลังเติบโตในกระถาง"
    },
    "ne": {
      "meaning": "हरियो",
      "sentence": "गमलामा ताजा हरिया जडीबुटीहरू उम्रिरहेका छन्।"
    },
    "ps": {
      "meaning": "شین / شنه",
      "sentence": "په لوښو کې تازه شنه بوټي راشنه کېږي."
    }
  },
  "rød": {
    "baseWord": "rød",
    "field": 5,
    "da": {
      "meaning": "rød",
      "sentence": "Bilen foran huset er flot og rød."
    },
    "en": {
      "meaning": "red",
      "sentence": "The car in front of the house is nice and red."
    },
    "de": {
      "meaning": "rot",
      "sentence": "Das Auto vor dem Haus ist rot und hübsch."
    },
    "es": {
      "meaning": "rojo",
      "sentence": "El coche que está delante de la casa es bonito y rojo."
    },
    "pt": {
      "meaning": "vermelho",
      "sentence": "O carro em frente à casa é bonito e vermelho."
    },
    "tr": {
      "meaning": "kırmızı",
      "sentence": "Evin önündeki araba güzel ve kırmızı."
    },
    "ar": {
      "meaning": "أحمر",
      "sentence": "السيارة أمام المنزل جميلة ولونها أحمر."
    },
    "fa": {
      "meaning": "قرمز / سرخ",
      "sentence": "ماشین جلوی خانه زیبا و قرمز است."
    },
    "ku": {
      "meaning": "sor",
      "sentence": "Erebeya li ber xênî xweşik û sor e."
    },
    "ur": {
      "meaning": "سرخ / لال",
      "sentence": "گھر کے سامنے والی گاڑی خوبصورت اور سرخ ہے۔"
    },
    "ru": {
      "meaning": "красный",
      "sentence": "Машина перед домом красивая и красная."
    },
    "uk": {
      "meaning": "червоний",
      "sentence": "Машина перед будинком красива та червона."
    },
    "zh": {
      "meaning": "红色的",
      "sentence": "房子前面的那辆汽车又漂亮又鲜红。"
    },
    "vi": {
      "meaning": "đỏ",
      "sentence": "Chiếc ô tô trước nhà màu đỏ và rất đẹp."
    },
    "th": {
      "meaning": "สีแดง",
      "sentence": "รถยนต์หน้าบ้านมีสีแดงและสวยงาม"
    },
    "ne": {
      "meaning": "रातो",
      "sentence": "घर अगाडिको गाडी राम्रो र रातो छ।"
    },
    "ps": {
      "meaning": "سور / سره",
      "sentence": "د کور مخې ته موټر ښکلی او سور دی."
    }
  },
  "levende": {
    "baseWord": "levende",
    "field": 5,
    "da": {
      "meaning": "levende",
      "sentence": "I en zoologisk have kan man se mange levende dyr."
    },
    "en": {
      "meaning": "alive / living",
      "sentence": "In a zoo you can see many living animals."
    },
    "de": {
      "meaning": "lebendig / lebend",
      "sentence": "Im Zoo kann man viele lebende Tiere sehen."
    },
    "es": {
      "meaning": "vivo",
      "sentence": "En el zoológico se pueden ver muchos animales vivos."
    },
    "pt": {
      "meaning": "vivo",
      "sentence": "No zoológico é possível ver muitos animais vivos."
    },
    "tr": {
      "meaning": "canlı",
      "sentence": "Hayvanat bahçesinde birçok canlı hayvan görebilirsiniz."
    },
    "ar": {
      "meaning": "حي / على قيد الحياة",
      "sentence": "في حديقة الحيوان يمكن للمرء أن يرى الكثير من الحيوانات الحية."
    },
    "fa": {
      "meaning": "زنده",
      "sentence": "در یک باغ‌وحش می‌توان حیوانات زنده زیادی را دید."
    },
    "ku": {
      "meaning": "zindî",
      "sentence": "Li baxçeyê ajalan mirov dikare gelek ajalên zindî bibîne."
    },
    "ur": {
      "meaning": "زندہ",
      "sentence": "چڑیا گھر میں بہت سے زندہ جانور دیکھے جا سکتے ہیں۔"
    },
    "ru": {
      "meaning": "живой",
      "sentence": "В зоопарке можно увидеть много живых животных."
    },
    "uk": {
      "meaning": "живий",
      "sentence": "У зоопарку можна побачити багато живих тварин."
    },
    "zh": {
      "meaning": "活的 / 有生命的",
      "sentence": "在动物园里你可以看到许多活生生的动物。"
    },
    "vi": {
      "meaning": "sống, còn sống",
      "sentence": "Trong vườn thú người ta có thể nhìn thấy nhiều động vật sống."
    },
    "th": {
      "meaning": "มีชีวิต",
      "sentence": "ในสวนสัตว์คุณสามารถเห็นสัตว์มีชีวิตมากมาย"
    },
    "ne": {
      "meaning": "जीवित",
      "sentence": "चिडियाखानामा धेरै जीवित जनावरहरू देख्न सकिन्छ।"
    },
    "ps": {
      "meaning": "ژوندی",
      "sentence": "په ژوبڼ کې تاسو ډېر ژوندي څاروي لیدلی شئ."
    }
  },
  "død": {
    "baseWord": "død",
    "field": 5,
    "da": {
      "meaning": "død",
      "sentence": "Blomsten i vinduet fik ikke vand og er helt død."
    },
    "en": {
      "meaning": "dead",
      "sentence": "The flower in the window got no water and is completely dead."
    },
    "de": {
      "meaning": "tot / verwelkt",
      "sentence": "Die Blume im Fenster bekam kein Wasser und ist ganz eingegangen."
    },
    "es": {
      "meaning": "muerto / marchito",
      "sentence": "La flor de la ventana no recibió agua y está completamente muerta."
    },
    "pt": {
      "meaning": "morto / murcho",
      "sentence": "A flor na janela não recebeu água e está totalmente morta."
    },
    "tr": {
      "meaning": "ölü / kurumuş",
      "sentence": "Penceredeki çiçek su almadı ve tamamen kurudu."
    },
    "ar": {
      "meaning": "ميت / ذابل",
      "sentence": "لم تحصل الزهرة في النافذة على الماء وماتت تماماً."
    },
    "fa": {
      "meaning": "مرده / پژمرده",
      "sentence": "گل کنار پنجره آب دریافت نکرد و کاملاً خشکید و مرد."
    },
    "ku": {
      "meaning": "mirî / hişkbûyî",
      "sentence": "Kulîlka li ber pencereyê av nestend û bi temamî mirî ye."
    },
    "ur": {
      "meaning": "مردہ / سوکھا ہوا",
      "sentence": "کھڑکی کے پاس والے پھول کو پانی نہیں ملا اور وہ بالکل سوکھ گیا ہے۔"
    },
    "ru": {
      "meaning": "мёртвый / засохший",
      "sentence": "Цветок на окне не поливали, и он совсем засох."
    },
    "uk": {
      "meaning": "мертвий / засохлий",
      "sentence": "Квітку на вікні не поливали, і вона зовсім засохла."
    },
    "zh": {
      "meaning": "枯死的 / 死亡的",
      "sentence": "窗台上的花没有浇水，已经彻底枯死了。"
    },
    "vi": {
      "meaning": "chết, héo tàn",
      "sentence": "Cây hoa ở cửa sổ không được tưới nước và đã chết khô hoàn toàn."
    },
    "th": {
      "meaning": "ตาย / เหี่ยวแห้งตาย",
      "sentence": "ดอกไม้ตรงหน้าต่างไม่ได้รดน้ำและเหี่ยวเฉาตายไปแล้ว"
    },
    "ne": {
      "meaning": "मरेको",
      "sentence": "झ्यालको फूलले पानी पाएन र पूरै मर्यो।"
    },
    "ps": {
      "meaning": "مړ / مړه",
      "sentence": "په کړکۍ کې ګل اوبه ونه موندلې او په بشپړه توګه وچ (مړ) شو."
    }
  },
  "meget": {
    "baseWord": "meget",
    "field": 5,
    "da": {
      "meaning": "meget (utællelig)",
      "sentence": "Der er meget kaffe tilbage i kanden."
    },
    "en": {
      "meaning": "much / a lot of (uncountable)",
      "sentence": "There is a lot of coffee left in the pot."
    },
    "de": {
      "meaning": "viel (unzählbar)",
      "sentence": "Es ist noch viel Kaffee in der Kanne."
    },
    "es": {
      "meaning": "mucho (incontable)",
      "sentence": "Queda mucho café en la cafetera."
    },
    "pt": {
      "meaning": "muito (incontável)",
      "sentence": "Resta muito café na garrafa."
    },
    "tr": {
      "meaning": "çok (sayılamayan)",
      "sentence": "Demlikte hâlâ çok kahve var."
    },
    "ar": {
      "meaning": "كثير (غير معدود)",
      "sentence": "يوجد الكثير من القهوة المتبقية في الإبريق."
    },
    "fa": {
      "meaning": "بسیار / زیاد (غیرقابل شمارش)",
      "sentence": "هنوز قهوه زیادی در قوری باقی مانده است."
    },
    "ku": {
      "meaning": "gelek / pir (nayê jimartin)",
      "sentence": "Di qehwedankê de hê gelek qehwe maye."
    },
    "ur": {
      "meaning": "بہت / زیادہ (ناقابلِ شمار)",
      "sentence": "تھرمس میں ابھی کافی ساری کافی باقی ہے۔"
    },
    "ru": {
      "meaning": "много (неисчисляемое)",
      "sentence": "В кофейнике осталось ещё много кофе."
    },
    "uk": {
      "meaning": "багато (незлічуване)",
      "sentence": "У кавнику залишилося ще багато кави."
    },
    "zh": {
      "meaning": "许多 / 大量（不可数）",
      "sentence": "壶里还剩下很多咖啡。"
    },
    "vi": {
      "meaning": "nhiều (không đếm được)",
      "sentence": "Còn rất nhiều cà phê trong bình."
    },
    "th": {
      "meaning": "มาก / เยอะ (นับไม่ได้)",
      "sentence": "ยังมีกาแฟเหลืออยู่ในกาอีกมาก"
    },
    "ne": {
      "meaning": "धेरै (गन्न नसकिने)",
      "sentence": "भाँडोमा अझै धेरै कफी बाँकी छ।"
    },
    "ps": {
      "meaning": "ډېر (نه شمېرل کېدونکی)",
      "sentence": "په ګرموس کې لاهم ډېره قهوه پاتې ده."
    }
  },
  "lidt": {
    "baseWord": "lidt",
    "field": 5,
    "da": {
      "meaning": "lidt (utællelig)",
      "sentence": "Der er kun lidt mælk tilbage i kartonen."
    },
    "en": {
      "meaning": "little / a little bit (uncountable)",
      "sentence": "There is only a little milk left in the carton."
    },
    "de": {
      "meaning": "wenig / ein bisschen (unzählbar)",
      "sentence": "In der Packung ist nur noch wenig Milch."
    },
    "es": {
      "meaning": "poco / un poco (incontable)",
      "sentence": "Solo queda un poco de leche en el cartón."
    },
    "pt": {
      "meaning": "pouco / um pouco (incontável)",
      "sentence": "Resta apenas um pouco de leite na caixa."
    },
    "tr": {
      "meaning": "az / biraz (sayılamayan)",
      "sentence": "Kutuda sadece biraz süt kalmış."
    },
    "ar": {
      "meaning": "قليل (غير معدود)",
      "sentence": "لم يتبق سوى القليل من الحليب في العلبة."
    },
    "fa": {
      "meaning": "کمی / اندک (غیرقابل شمارش)",
      "sentence": "فقط مقدار کمی شیر در کارتن باقی مانده است."
    },
    "ku": {
      "meaning": "hindik / piçek (nayê jimartin)",
      "sentence": "Di qutiyê de tenê piçek şîr maye."
    },
    "ur": {
      "meaning": "تھوڑا / کم (ناقابلِ شمار)",
      "sentence": "ڈبے میں صرف تھوڑا سا دودھ باقی ہے۔"
    },
    "ru": {
      "meaning": "мало / немного (неисчисляемое)",
      "sentence": "В пакете осталось лишь немного молока."
    },
    "uk": {
      "meaning": "мало / небагато (незлічуване)",
      "sentence": "У пакеті залишилося лише трохи молока."
    },
    "zh": {
      "meaning": "少许 / 一点点（不可数）",
      "sentence": "盒子里只剩下一丁点牛奶了。"
    },
    "vi": {
      "meaning": "ít / một ít (không đếm được)",
      "sentence": "Chỉ còn một ít sữa trong hộp."
    },
    "th": {
      "meaning": "น้อย / นิดหน่อย (นับไม่ได้)",
      "sentence": "เหลือนมอยู่ในกล่องเพียงเล็กน้อยเท่านั้น"
    },
    "ne": {
      "meaning": "थोरै (गन्न नसकिने)",
      "sentence": "कार्टुनमा थोरै मात्र दूध बाँकी छ।"
    },
    "ps": {
      "meaning": "لږ (نه شمېرل کېدونکی)",
      "sentence": "په ډبي کې یوازې لږې شیدې پاتې دي."
    }
  }
};
