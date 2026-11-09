/**
 * andet_husarbejde_translations.js
 * Komplette oversættelser for fane 6: "Andet husarbejde"
 * i sang-fladen "Så går vi rundt om en enebærbusk".
 * Dækker alle 18 sprog i appen:
 * da, en, de, es, pt, tr, ar, fa, ku, ur, ru, uk, zh, vi, th, ne, ps, sq.
 */

import { g1Translations } from './andet_husarbejde/g1.js';
import { g2Translations } from './andet_husarbejde/g2.js';
import { g3Translations } from './andet_husarbejde/g3.js';
import { g4Translations } from './andet_husarbejde/g4.js';

export const andetHusarbejdeTranslations = {
  da: {
    sange_tab_andet_husarbejde: "6. Andet husarbejde (20 aktiviteter)",
    ah_sub_vrimmel: "1. Vrimlebillede (20 aktiviteter)",
    ah_sub_forstaaelse: "2. Forståelsesopgaver (10 spørgsmål)",
    ah_sub_saetning: "3. Sætningsbygning (Nye termer)",
    ah_room_all: "Alle (20)",
    ah_room_sovevaerelse: "Soveværelse (4)",
    ah_room_badevaerelse: "Badeværelse (2)",
    ah_room_stue: "Stue (4)",
    ah_room_koekken: "Køkken (5)",
    ah_room_spisestue_entre: "Spisestue & Entré (5)",
    ah_room_sovevaerelse_name: "Soveværelse",
    ah_room_badevaerelse_name: "Badeværelse",
    ah_room_stue_name: "Stue",
    ah_room_koekken_name: "Køkken",
    ah_room_spisestue_entre_name: "Spisestue & Entré",
    ah_btn_prev: "Forrige",
    ah_btn_next: "Næste",
    ah_activity_badge: "Aktivitet {num} af {total}",
    ah_quiz_clue_title: "Hvad gør man i hjemmet? (DU1, modul 4)",
    ah_quiz_listen_btn: "Lyt til spørgsmål",
    ah_quiz_correct: "Helt rigtigt!",
    ah_quiz_wrong: "Det rigtige svar er:",
    ah_quiz_task_counter: "Forståelsesopgave {current} / {total}",
    ah_quiz_score: "Point: {score}",
    ah_quiz_next: "Næste spørgsmål",
    ah_quiz_see_result: "Se dit resultat",
    ah_quiz_done_title: "Flot klaret!",
    ah_quiz_done_score: "Du fik {score} ud af {total} rigtige!",
    ah_quiz_retry: "Prøv igen",
    ah_builder_intro_badge: "Sætningsbygning (Andet husarbejde)",
    ah_builder_intro_title: "Byg sætninger med de 20 nye aktiviteter",
    ah_builder_intro_desc: "Træn korte hverdagssætninger med verbet på 2. plads (DU1, modul 4).",
    ah_builder_subtab_puzzle: "1. Pusleopgaver (8 sætninger)",
    ah_builder_subtab_step: "2. Trin-for-trin sætningsbygger",
    ah_slot1_text: "Hvornår / Hvor?",
    ah_slot1_grammar: "Tid / Sted (1)",
    ah_slot2_text: "Hvad gør man?",
    ah_slot2_grammar: "Verbum (2)",
    ah_slot3_text: "Hvem?",
    ah_slot3_grammar: "Subjekt (3)",
    ah_slot4_text: "Hvad?",
    ah_slot4_grammar: "Objekt (4)",
    ah_puzzle_success: "Helt rigtigt!",
    ah_puzzle_error: "Prøv igen! Husk at verbet skal stå på 2. plads.",
    ah_puzzle_listen: "Lyt",
    ah_puzzle_next: "Næste →",
    ah_puzzle_retry: "Prøv igen",
    ah_step_cat1_q: "1. Hvornår eller hvor? (1. plads)",
    ah_step_cat2_q: "2. Hvad gør man? (Verbum på 2. plads)",
    ah_step_cat3_q: "3. Hvem? (Subjekt på 3. plads)",
    ah_step_cat4_q: "4. Hvad? (Objekt på 4. plads)",
    ah_step_live_label: "Din sætning med nye husarbejde-ord",
    ah_step_live_listen: "Lyt til sætningen",

    // 20 Aktiviteter
    ah_act_lufte_ud_handling: "at lufte ud",
    ah_act_lufte_ud_redskaber: "et åbent vindue, frisk luft",
    ah_act_lufte_ud_saetning: "Vi lufter ud i værelset.",

    ah_act_rede_seng_handling: "at rede sengen",
    ah_act_rede_seng_redskaber: "en dyne, en pude, en seng",
    ah_act_rede_seng_saetning: "Hun reder sengen hver morgen.",

    ah_act_skifte_sengetoej_handling: "at skifte sengetøj",
    ah_act_skifte_sengetoej_redskaber: "rent sengetøj, lagen, betræk",
    ah_act_skifte_sengetoej_saetning: "Vi skifter sengetøj om fredagen.",

    ah_act_rydde_op_handling: "at rydde op",
    ah_act_rydde_op_redskaber: "en kurv, legetøj, hylder",
    ah_act_rydde_op_saetning: "Drengen rydder sit legetøj op.",

    ah_act_goere_bad_rent_handling: "at gøre badeværelset rent",
    ah_act_goere_bad_rent_redskaber: "en svamp, sæbe, et spejl",
    ah_act_goere_bad_rent_saetning: "Hun gør badeværelset rent.",

    ah_act_rense_toilet_handling: "at rense toilettet",
    ah_act_rense_toilet_redskaber: "en toiletbørste, rengøringsmiddel",
    ah_act_rense_toilet_saetning: "Vi renser toilettet med en børste.",

    ah_act_stoevsuge_handling: "at støvsuge gulvet",
    ah_act_stoevsuge_redskaber: "en støvsuger, et gulvtæppe",
    ah_act_stoevsuge_saetning: "Manden støvsuger tæppet i stuen.",

    ah_act_stoeve_af_handling: "at støve af",
    ah_act_stoeve_af_redskaber: "en støvekost, en klud, en reol",
    ah_act_stoeve_af_saetning: "Vi støver hylderne af.",

    ah_act_pudse_vinduer_handling: "at pudse vinduer",
    ah_act_pudse_vinduer_redskaber: "en vinduesskraber, vand og sæbe",
    ah_act_pudse_vinduer_saetning: "Kvinden pudser vinduet i stuen.",

    ah_act_vande_blomster_handling: "at vande blomster",
    ah_act_vande_blomster_redskaber: "en vandkande, potteplanter",
    ah_act_vande_blomster_saetning: "Vi vander blomsterne i vinduet.",

    ah_act_lave_mad_handling: "at lave mad",
    ah_act_lave_mad_redskaber: "en gryde, et komfur, en ske",
    ah_act_lave_mad_saetning: "Han laver varm mad i gryden.",

    ah_act_bage_i_ovn_handling: "at bage i ovnen",
    ah_act_bage_i_ovn_redskaber: "en ovn, en bageplade",
    ah_act_bage_i_ovn_saetning: "Vi bager brød i ovnen.",

    ah_act_vaske_op_handling: "at vaske op",
    ah_act_vaske_op_redskaber: "en opvaskebørste, varmt vand, opvaskemiddel",
    ah_act_vaske_op_saetning: "Hun vasker op i køkkenet.",

    ah_act_fylde_opvaskemaskine_handling: "at fylde opvaskemaskinen",
    ah_act_fylde_opvaskemaskine_redskaber: "en opvaskemaskine, tallerkener, glas",
    ah_act_fylde_opvaskemaskine_saetning: "Vi sætter glas i opvaskemaskinen.",

    ah_act_saette_i_koeleskab_handling: "at sætte varer i køleskabet",
    ah_act_saette_i_koeleskab_redskaber: "et køleskab, madvarer, mælk",
    ah_act_saette_i_koeleskab_saetning: "Vi sætter mælk i køleskabet.",

    ah_act_toerre_bord_af_handling: "at tørre bordet af",
    ah_act_toerre_bord_af_redskaber: "en klud, et spisebord",
    ah_act_toerre_bord_af_saetning: "Hun tørrer bordet af med en klud.",

    ah_act_daekke_bord_handling: "at dække bord",
    ah_act_daekke_bord_redskaber: "tallerkener, glas, bestik",
    ah_act_daekke_bord_saetning: "Vi dækker bord til aftensmad.",

    ah_act_fodre_dyr_handling: "at fodre hunden og katten",
    ah_act_fodre_dyr_redskaber: "en madskål, dyremad",
    ah_act_fodre_dyr_saetning: "Vi giver hunden og katten mad.",

    ah_act_feje_gulv_handling: "at feje gulvet",
    ah_act_feje_gulv_redskaber: "en kost, en fejebakke",
    ah_act_feje_gulv_saetning: "Han fejer gulvet med en kost.",

    ah_act_baere_skrald_ud_handling: "at sortere affald og bære skrald ud",
    ah_act_baere_skrald_ud_redskaber: "en skraldepose, affaldsspande",
    ah_act_baere_skrald_ud_saetning: "Drengen bærer skraldeposen ud.",

    // 10 Forståelsesopgaver
    ah_q_1_text: "Gulvtæppet i stuen er snavset. Hvad gør manden?",
    ah_q_1_tip: "Vi bruger en støvsuger til at støvsuge gulvtæppet (#7).",
    ah_q_2_text: "Der er pletter på vinduet i stuen. Hvad gør kvinden?",
    ah_q_2_tip: "Vi pudser vinduer med vand og en vinduesskraber (#9).",
    ah_q_3_text: "Planterne i vinduet er tørre og mangler vand. Hvad gør vi?",
    ah_q_3_tip: "Vi vander blomsterne med en vandkande (#10).",
    ah_q_4_text: "Det er morgen, og vi vil have frisk luft ind i soveværelset. Hvad gør vi?",
    ah_q_4_tip: "Når vi åbner vinduet for at få frisk luft, lufter vi ud (#1).",
    ah_q_5_text: "Der ligger legetøj overalt på gulvet i værelset. Hvad gør drengen?",
    ah_q_5_tip: "Drengen samler legetøjet i kurven og rydder op (#4).",
    ah_q_6_text: "Vi skal snart spise aftensmad. Hvad gør vi ved spisebordet?",
    ah_q_6_tip: "Før maden dækker vi bord med tallerkener, glas og bestik (#17).",
    ah_q_7_text: "Vi er færdige med at spise, og bordet er vådt. Hvad gør hun?",
    ah_q_7_tip: "Efter maden tørrer vi bordet af med en klud (#16).",
    ah_q_8_text: "Skraldespanden i køkkenet er helt fuld. Hvad gør drengen?",
    ah_q_8_tip: "Drengen bærer skraldeposen ud til affaldsspandene (#20).",
    ah_q_9_text: "Hunden og katten står ved deres skål og er sultne. Hvad gør vi?",
    ah_q_9_tip: "Vi fodrer hunden og katten (giver dem mad i skålen, #18).",
    ah_q_10_text: "Vi har købt mælk og ost i supermarkedet. Hvor sætter vi varerne ind?",
    ah_q_10_tip: "Mælk og kolde madvarer sættes ind i køleskabet (#15).",

    // 8 Sætningspuslespil
    ah_pz_1_q: "Hvad laver manden i stuen?",
    ah_pz_1_tip: "Stedet 'I stuen' står på 1. plads, og verbet 'støvsuger' står på 2. plads.",
    ah_pz_2_q: "Hvad gør hun i soveværelset hver morgen?",
    ah_pz_2_tip: "Tidsudtrykket 'Hver morgen' står først, og verbet 'reder' står på 2. plads.",
    ah_pz_3_q: "Hvad laver kvinden ved vinduet?",
    ah_pz_3_tip: "Verbet 'pudser' står på 2. plads lige efter 'Om lørdagen'.",
    ah_pz_4_q: "Hvad gør drengen på værelset?",
    ah_pz_4_tip: "Verbet 'rydder' står på 2. plads.",
    ah_pz_5_q: "Hvad laver manden i køkkenet?",
    ah_pz_5_tip: "I køkkenet (1) + laver (2) + han (3) + mad (4).",
    ah_pz_6_q: "Hvad gør kvinden efter maden?",
    ah_pz_6_tip: "Efter maden (1) + tørrer (2) + hun (3) + bordet af (4).",
    ah_pz_7_q: "Hvad gør drengen med skraldeposen?",
    ah_pz_7_tip: "Om aftenen (1) + bærer (2) + drengen (3) + skrald ud (4).",
    ah_pz_8_q: "Hvad gør vi med blomsterne i vinduet?",
    ah_pz_8_tip: "I dag (1) + vander (2) + vi (3) + blomsterne (4)."
  },
  ...g1Translations,
  ...g2Translations,
  ...g3Translations,
  ...g4Translations
};
