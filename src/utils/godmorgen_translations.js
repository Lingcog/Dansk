/**
 * godmorgen_translations.js
 * Komplette oversættelser for fladen "Godmorgen, lille land"
 * på alle 18 sprog i appen:
 * da, en, de, es, pt, tr, ar, fa, ku, ur, ps, ru, uk, zh, vi, sq, th, ne.
 */

import { g1Translations } from './godmorgen/g1.js';
import { g2Translations } from './godmorgen/g2.js';
import { g3Translations } from './godmorgen/g3.js';
import { g4Translations } from './godmorgen/g4.js';

export const godmorgenTranslations = {
  da: {
    gm_back_btn: "← Tilbage til Danske sange",
    gm_hero_badge: "Danske sange & Danmarks geografi",
    gm_hero_title: "Godmorgen, lille land",
    gm_hero_desc: "Lær nøgleudtrykkene fra sangen og gå på opdagelse i Danmarks geografi, kyster, øer og broer.",
    gm_hsb_title: "Tekst: Niels Brunse (1998) · Melodi: Carsten Johs. Mørch (1998)",
    gm_hsb_sub: "Skrevet til indvielsen af Storebæltsbroen den 14. juni 1998 (Højskolesangbogen nr. 24). Her på siden arbejder vi pædagogisk med sangens nøgleudtryk og Danmarks geografi (jf. citatretten).",
    gm_hsb_link: "Læs hele sangteksten på Højskolesangbogen.dk ↗",

    // Faner
    gm_tab_vrimmel: "1. Vrimlebillede & Geografi (17 pegefelter)",
    gm_tab_sang: "2. Nøgleudtryk & Udtalerytme (Geografi i sangen)",
    gm_tab_detektiv: "3. Ord-detektiv (Geografi-jagt på kortet)",
    gm_tab_saetning: "4. Sætningsbygger & Puslespil (Geografi)",
    gm_tab_udvikling: "5. Danmarks landsdele & Parring",
    gm_tab_samtale: "6. Samtale & Puslesætninger: Dit Danmark (Byg svar)",

    // Fane 1: Vrimlebillede
    gm_filter_all: "Alle (17)",
    gm_filter_natur_vejr: "Natur & Kyst (1. vers) (8)",
    gm_filter_oeer_broer: "Øer & Broer (2. vers) (4)",
    gm_filter_nord_syd: "Nord til Syd & Mennesker (5)",
    gm_pure_show: "Vis kun billedet:",
    gm_pure_fra: "FRA",
    gm_pure_til: "TIL",
    gm_btn_prev: "Forrige",
    gm_btn_next: "Næste",
    gm_btn_listen_sentence: "Lyt til sætning",
    gm_hotspot_badge: "Punkt {num} af {total}",
    gm_vocab_label: "Nøgleord:",

    // 17 Hotspots
    gm_item_dis_title: "Dis (Morgendis over landet)",
    gm_item_dis_vocab: "dis (en dis / disen) · let tåge · morgendis · sløret luft",
    gm_item_dis_forklaring: "Dis er en let, lys tåge, som ofte svæver over havet, fjorden og markerne tidligt om morgenen.",
    gm_item_dis_saetning: "Morgendisen ligger let over det grønne landskab.",

    gm_item_kyst_title: "Kyst i forstørrelsesglasset (Jyllands vestkyst)",
    gm_item_kyst_vocab: "en kyst / kysten / kyster · kystlinje · forstørrelsesglas · Vesterhavet",
    gm_item_kyst_forklaring: "I forstørrelsesglasset ved Jyllands vestkyst ser vi den åbne kyststrækning med havets bølger, der ruller ind fra venstre mod sand og klitter.",
    gm_item_kyst_saetning: "Forstørrelsesglasset viser den åbne kyst med havet fra venstre.",

    gm_item_sten_og_sand_title: "Sten og sand (Strandens underlag i forstørrelsesglasset)",
    gm_item_sten_og_sand_vocab: "en sten / stenene · sand · sandstrand · rullesten i forstørrelsesglasset",
    gm_item_sten_og_sand_forklaring: "Inde i forstørrelsesglasset mod højre ses strandens fine sand og de runde rullesten, som er slebet helt glatte af havets bølger.",
    gm_item_sten_og_sand_saetning: "Stranden i forstørrelsesglasset er dækket af hvidt sand og runde sten.",

    gm_item_havets_boelger_title: "Havets bølger (Vesterhavet ruller ind fra venstre)",
    gm_item_havets_boelger_vocab: "en bølge / bølgerne · havets skvulpen · hvidt skum · brænding",
    gm_item_havets_boelger_forklaring: "Vesterhavets kraftige bølger ruller ind fra venstre (fra vest) og brydes i hvidt skum mod sandstranden i forstørrelsesglasset.",
    gm_item_havets_boelger_saetning: "Havets bølger skyller ind fra venstre op over stranden.",

    gm_item_bakker_title: "Bakker (De bløde, grønne bakker i Midtjylland)",
    gm_item_bakker_vocab: "en bakke / bakkerne · bakket terræn · Himmelbjerget · morænebakker",
    gm_item_bakker_forklaring: "Danmark har ingen bjerge, men landet har mange smukke, bløde grønne bakker skabt af istidens gletsjere.",
    gm_item_bakker_saetning: "Danmark har mange bløde, grønne bakker.",

    gm_item_is_title: "Is (Gletsjervæggen fra istiden)",
    gm_item_is_vocab: "is (istiden) · en gletsjer · smeltevand · istidslandskab",
    gm_item_is_forklaring: "Under istiden dækkede en kæmpe mur af gletsjeris Danmark og Norden. Isens enorme kræfter formede de bakker og dale, vi har i dag.",
    gm_item_is_saetning: "Den tunge is under istiden skabte de danske bakker.",

    gm_item_sol_title: "Sol (Morgensolen står op)",
    gm_item_sol_vocab: "sol (solen) · solskin · en solopgang · morgenlys",
    gm_item_sol_forklaring: "Sangen byder godmorgen til det lille land, når den gyldne morgensol bryder frem over vandet.",
    gm_item_sol_saetning: "Morgensolen skinner varmt over vand og land.",

    gm_item_blaest_og_regn_title: "Blæst og regn (Det omskiftelige vejr)",
    gm_item_blaest_og_regn_vocab: "blæst (vinden) · regn (regndråber) · omskifteligt · koldt og venligt",
    gm_item_blaest_og_regn_forklaring: "Vejret i Danmark kan skifte på få minutter fra solskin til frisk blæst og regnbyger fra vest.",
    gm_item_blaest_og_regn_saetning: "Vinden blæser, og regnen falder over markerne.",

    gm_item_skagens_gren_title: "Skagens Gren (Danmarks nordligste punkt)",
    gm_item_skagens_gren_vocab: "en gren (sandodde) · Skagens Fyr · Skagerrak & Kattegat",
    gm_item_skagens_gren_forklaring: "Grenen ved Skagen er Danmarks nordligste spids. Her mødes de to have, og bølgerne slår sammen ved det hvide fyrtårn.",
    gm_item_skagens_gren_saetning: "Skagens hvide gren ligger helt mod nord i Jylland.",

    gm_item_blink_hav_og_soe_title: "Blink af hav og sø (Klitsø og hav i forstørrelsesglasset)",
    gm_item_blink_hav_og_soe_vocab: "et hav · en sø · et blink (solens genskin) · klitsø ved kysten",
    gm_item_blink_hav_og_soe_forklaring: "I forstørrelsesglasset ser vi både havet og en fersk klitsø, hvor sollyset blinker smukt i vandoverfladen.",
    gm_item_blink_hav_og_soe_saetning: "Lyset blinker smukt i vandet på havet og søen.",

    gm_item_lillebaelt_title: "Lillebæltsbroen (Jylland – Fyn)",
    gm_item_lillebaelt_vocab: "en bro · et bælt (Lillebælt) · en halvø (Jylland) · en egn (landsdel)",
    gm_item_lillebaelt_forklaring: "Broerne over Lillebælt forbinder halvøen Jylland med Fyn for både biler og tog.",
    gm_item_lillebaelt_saetning: "Lillebæltsbroen forbinder Jylland og Fyn.",

    gm_item_oe_ved_oe_title: "Ø ved ø (Fyn og det danske ø-rige)",
    gm_item_oe_ved_oe_vocab: "en ø / øer · et ø-rige · Fyn · over 400 øer",
    gm_item_oe_ved_oe_forklaring: "Danmark består af halvøen Jylland og over 400 navngivne øer. Fyn ligger som en have midt i landet omgivet af blåt vand.",
    gm_item_oe_ved_oe_saetning: "Danmark er et ø-rige med ø ved ø.",

    gm_item_slanke_lyse_broer_title: "Storebæltsbroen i forstørrelsesglasset (Fyn – Sjælland)",
    gm_item_slanke_lyse_broer_vocab: "Storebæltsbroen · forstørrelsesglas · hængebro · pyloner · tog og biler",
    gm_item_slanke_lyse_broer_forklaring: "I forstørrelsesglasset direkte mellem Fyn og Sjælland ses Storebæltsbroen med dens to høje pyloner, biler og tog over det blå vand.",
    gm_item_slanke_lyse_broer_saetning: "Storebæltsbroen ses i forstørrelsesglasset mellem Fyn og Sjælland.",

    gm_item_prik_mod_nord_title: "Sjælland & Hovedstaden København",
    gm_item_prik_mod_nord_vocab: "Sjælland · hovedstaden København · en prik mod nord · tårne og byliv",
    gm_item_prik_mod_nord_forklaring: "Sjælland er Danmarks største ø. På verdenskortet ligner det lille Danmark blot en lille prik mod nord på den runde jord.",
    gm_item_prik_mod_nord_saetning: "København ligger på Sjælland ved Øresund.",

    gm_item_gletsjer_og_bison_title: "Gletsjervæg & bisonjagt (Istiden der skabte Danmark)",
    gm_item_gletsjer_og_bison_vocab: "en gletsjervæg · istid · gletsjeris · vilde bisoner · jægere med spyd",
    gm_item_gletsjer_og_bison_forklaring: "En enorm gletsjervæg af is dækkede landet i istiden, mens jægere jagede vilde bisoner foran isen. Da isen smeltede, dannede den Danmarks bløde bakker.",
    gm_item_gletsjer_og_bison_saetning: "Foran den mægtige gletsjervæg af is jager menneskene vilde bisoner på tundraen.",

    gm_item_gedsers_odde_title: "Gedser Odde (Danmarks sydligste punkt)",
    gm_item_gedsers_odde_vocab: "en odde (smal landtange) · Falster · Danmarks sydspids · Østersøen",
    gm_item_gedsers_odde_forklaring: "Gedser Odde på Falster er Danmarks sydligste punkt ud mod Østersøen – modstykket til Skagen mod nord.",
    gm_item_gedsers_odde_saetning: "Gedser Odde på Falster er Danmarks sydligste spids.",

    gm_item_bro_fra_sind_til_sind_title: "Bornholm & Bro fra sind til sind",
    gm_item_bro_fra_sind_til_sind_vocab: "at bygge bro · fra sind til sind · forståelse · fællesskab · Bornholm",
    gm_item_bro_fra_sind_til_sind_forklaring: "Sangen minder os om, at de vigtigste broer er dem, vi bygger mellem hinanden gennem samtale og forståelse.",
    gm_item_bro_fra_sind_til_sind_saetning: "Når vi taler sammen, bygger vi bro fra menneske til menneske.",

    // Fane 2: Nøgleudtryk & Temaer
    gm_sang_intro_title: "Nøgleudtryk, udtalerytme & geografi i sangen",
    gm_sang_intro_sub: "Lær de vigtige geografiord med udtale og tryk. Klik på et nøgleudtryk for at høre udtalen og se udsnittet på Danmarkskortet. Læs hele den samlede originaltekst og lyt til melodien på Højskolesangbogens officielle hjemmeside.",
    gm_sang_intro_link: "Åbn sangteksten på Højskolesangbogen.dk ↗",

    gm_theme_1_title: "Landskab, kyst og spor fra istiden",
    gm_theme_1_tag: "Natur & Landskab",
    gm_theme_1_expl: "Sangen indledes med en hyldest til det danske naturlandskab og vejr: morgendis (den lette tåge over markerne), de tusindvis af kilometer kyst med sand og sten, bølgernes skvulpen og de bløde bakker, som isen formede under den seneste istid.",

    gm_theme_2_title: "Ø-riget og de slanke broer",
    gm_theme_2_tag: "Øer & Broer",
    gm_theme_2_expl: "Danmark består af over 400 øer (heraf ca. 70 beboede). Sangen hylder de slanke, lyse broer – som Storebæltsbroen og Lillebæltsbroen – der i sol, blæst og regn bærer folk fra egn til egn over hav og sø.",

    gm_theme_3_title: "Danmarks akse: Fra Skagen til Gedser Odde",
    gm_theme_3_tag: "Nord & Syd",
    gm_theme_3_expl: "Sangen tegner en geografilinje tværs over kongeriget: Fra Skagens hvide gren i nord til Gedser Odde på Falster i syd. En strækning på ca. 360 km i fugleflugtslinje på vores lille prik mod nord på den runde jord.",

    gm_theme_4_title: "Mennesker, sprog og fællesskab",
    gm_theme_4_tag: "Fællesskab",
    gm_theme_4_expl: "Sangen slutter med et budskab om menneskelig kontakt og åbenhed: Ingen i landet er alene, når vi byder dagen og verden velkommen og taler sammen – \"bygger vi bro fra sind til sind\".",

    // Fane 3: Detektiv (8 opgaver)
    gm_det_task_counter: "Geografi-opgave {current} / {total}",
    gm_det_score: "Point: {score}",
    gm_det_clue_title: "Godmorgen, lille land · Danmarks geografi",
    gm_det_listen_btn: "Lyt til spørgsmål",
    gm_det_correct: "Helt rigtigt!",
    gm_det_wrong: "Det rigtige svar er:",
    gm_det_next: "Næste spørgsmål",
    gm_det_see_result: "Se dit resultat",
    gm_det_done_title: "Flot klaret!",
    gm_det_done_score: "Du fik {score} ud af {total} rigtige!",
    gm_det_retry: "Prøv igen",

    gm_q_1_text: "Hvad hedder Danmarks nordligste punkt, som nævnes i 3. vers (\"fra Skagens hvide ...\")?",
    gm_q_1_tip: "Skagens Gren ligger helt mod nord i Jylland, hvor Skagerrak og Kattegat mødes.",
    gm_q_2_text: "Hvad hedder Danmarks sydligste punkt, som nævnes i 3. vers (\"til Gedsers lange ...\")?",
    gm_q_2_tip: "Gedser Odde på øen Falster er Danmarks sydligste spids ud mod Østersøen.",
    gm_q_3_text: "Hvilken begivenhed blev sangen \"Godmorgen, lille land\" skrevet til i 1998?",
    gm_q_3_tip: "Sangen vandt sangkonkurrencen ved indvielsen af Storebæltsbroen den 14. juni 1998.",
    gm_q_4_text: "Hvad har ifølge 1. vers skabt de runde danske bakker (\"med bakker skabt af ...\")?",
    gm_q_4_tip: "Det danske morænelandskab med bløde bakker er formet af isen under istiden.",
    gm_q_5_text: "Hvad består den danske kyst af i 1. vers (\"med kyst af ...\")?",
    gm_q_5_tip: "I 1. vers hedder det: \"med kyst af sten og sand, som havets bølger slikker\".",
    gm_q_6_text: "Hvad betyder ordet \"dis\" i linjen \"Et land med sol, et land med dis\"?",
    gm_q_6_tip: "Dis er en let, lys tåge, som man ofte ser over havet og markerne om morgenen.",
    gm_q_7_text: "Hvilken ø ligger i midten mellem Jylland og Sjælland?",
    gm_q_7_tip: "Når man rejser fra Jylland til Sjælland, kører man over Lillebælt til Fyn og derfra over Storebælt til Sjælland.",
    gm_q_8_text: "Hvad betyder udtrykket \"bygger vi bro fra sind til sind\" i 4. vers?",
    gm_q_8_tip: "\"Fra sind til sind\" er et billede på menneskelig forståelse og sammenhold.",

    // Fane 4: Sætningsbygning & Puslespil
    gm_builder_intro_badge: "Sætningsbygning & Danmarks geografi",
    gm_builder_intro_title: "Byg sætninger om Danmark med verbet på 2. plads",
    gm_builder_intro_desc: "Når sætningen begynder med et sted eller en tid (f.eks. \"I Danmark\" eller \"Mod nord\"), står verbet altid på 2. plads.",
    gm_builder_subtab_puzzle: "1. Pusleopgaver (8 sætninger)",
    gm_builder_subtab_step: "2. Trin-for-trin sætningsbygger",

    gm_slot1_text: "Hvor i Danmark?",
    gm_slot1_grammar: "Sted (1)",
    gm_slot2_text: "Hvad gør man?",
    gm_slot2_grammar: "Verbum (2)",
    gm_slot3_text: "Hvem?",
    gm_slot3_grammar: "Subjekt (3)",
    gm_slot4_text: "Hvad eller hvor?",
    gm_slot4_grammar: "Objekt / Sted (4)",

    gm_puzzle_success: "Helt rigtigt!",
    gm_puzzle_error: "Prøv igen! Husk at verbet skal stå på 2. plads.",
    gm_puzzle_listen: "Lyt",
    gm_puzzle_next: "Næste →",
    gm_puzzle_retry: "Prøv igen",

    gm_pz_1_q: "Hvad forbinder Storebæltsbroen?",
    gm_pz_1_tip: "Stedet 'Over Storebælt' står på 1. plads, og verbet 'forbinder' står på 2. plads.",
    gm_pz_2_q: "Hvor ligger Skagen?",
    gm_pz_2_tip: "Mod nord (1) + ligger (2) + Skagen (3) + i Jylland (4).",
    gm_pz_3_q: "Hvad gør bølgerne ved kysten?",
    gm_pz_3_tip: "Ved kysten (1) + rammer (2) + bølgerne (3) + sten og sand (4).",
    gm_pz_4_q: "Hvordan er vejret i Danmark?",
    gm_pz_4_tip: "I Danmark (1) + skifter (2) + vejret (3) + meget hurtigt (4).",
    gm_pz_5_q: "Hvad gør familien om morgenen?",
    gm_pz_5_tip: "Om morgenen (1) + sidder (2) + vi (3) + ved morgenbordet (4).",
    gm_pz_6_q: "Hvor ligger København?",
    gm_pz_6_tip: "På Sjælland (1) + ligger (2) + hovedstaden (3) + København (4).",
    gm_pz_7_q: "Hvad har skabt de danske bakker?",
    gm_pz_7_tip: "Under istiden (1) + skabte (2) + isen (3) + de grønne bakker (4).",
    gm_pz_8_q: "Hvad gør vi, når vi taler sammen?",
    gm_pz_8_tip: "I hverdagen (1) + bygger (2) + vi (3) + bro mellem mennesker (4).",

    gm_step_cat1_q: "1. Hvor i Danmark? (1. plads)",
    gm_step_cat2_q: "2. Hvad gør man? (Verbum på 2. plads)",
    gm_step_cat3_q: "3. Hvem? (Subjekt på 3. plads)",
    gm_step_cat4_q: "4. Hvad eller hvor? (4. plads)",
    gm_step_live_label: "Din sætning om Danmarks geografi",
    gm_step_live_listen: "Lyt til sætningen",

    // Fane 5: Landsdele & Parring
    gm_match_header: "Parring: Forbind sangens udtryk med Danmarks geografi",
    gm_match_desc: "Klik først på et udtryk fra sangen til venstre og derefter på den geografiske forklaring til højre.",
    gm_match_p1_right: "Danmarks nordligste spids i Nordjylland",
    gm_match_p2_right: "Danmarks sydligste punkt på Falster",
    gm_match_p3_right: "Storebæltsbroen og broerne mellem landsdelene",
    gm_match_p4_right: "Det runde morænelandskab fra istiden",
    gm_match_p5_right: "Det danske ø-rige med Fyn, Sjælland og over 400 øer",
    gm_match_p6_right: "De mere end 7.000 km danske strande og kyster",

    gm_landsdele_header: "Danmarks landsdele: Husk \"i\" eller \"på\"",
    gm_landsdele_desc: "På dansk siger vi \"i Jylland\" (halvø), men \"på Fyn\", \"på Sjælland\", \"på Lolland-Falster\" og \"på Bornholm\" (øer).",
    gm_ld_jylland_title: "Jylland (Halvøen)",
    gm_ld_jylland_prep: "Man bor I Jylland",
    gm_ld_jylland_cities: "Største byer: Aarhus, Aalborg, Esbjerg, Kolding, Vejle, Randers.",
    gm_ld_jylland_sent: "Jeg har været i Skagen og i Aarhus i Jylland.",

    gm_ld_fyn_title: "Fyn (Øen i midten)",
    gm_ld_fyn_prep: "Man bor PÅ Fyn",
    gm_ld_fyn_cities: "Største byer: Odense (H.C. Andersens fødeby), Svendborg, Nyborg, Middelfart.",
    gm_ld_fyn_sent: "Jeg har besøgt Odense på Fyn.",

    gm_ld_sjaelland_title: "Sjælland (Den største ø)",
    gm_ld_sjaelland_prep: "Man bor PÅ Sjælland",
    gm_ld_sjaelland_cities: "Største byer: København (hovedstaden), Roskilde, Helsingør, Næstved, Køge.",
    gm_ld_sjaelland_sent: "Jeg bor på Sjælland tæt på København.",

    gm_ld_oer_title: "Lolland, Falster & Bornholm",
    gm_ld_oer_prep: "Man bor PÅ Lolland, PÅ Falster og PÅ Bornholm",
    gm_ld_oer_cities: "Byer og steder: Nykøbing Falster, Gedser Odde, Maribo, Rønne og Hammershus.",
    gm_ld_oer_sent: "Gedser Odde ligger på Falster, og Bornholm ligger i Østersøen.",

    // Fane 6: Samtale & Puslesætninger
    gm_samtale_intro_badge: "Mundtlig samtale & Puslesætninger",
    gm_samtale_intro_title: "Byg dine egne svar: Fortæl om dit Danmark",
    gm_samtale_intro_desc: "Hvert spørgsmål er en puslesætning i stedet for en færdig skabelon. Vælg de brikker og ord i boksene, som passer bedst til dit liv og dine egne oplevelser i Danmark. Klik på brikkerne for at sammensætte dit svar, og lyt til sætningen for at øve udtalen!",
    gm_samtale_q_badge: "Puslesætning · Spørgsmål {num}",
    gm_samtale_listen_q: "Lyt til spørgsmål",
    gm_samtale_assembled_label: "Dit sammensatte svar (opdateres når du klikker på brikkerne):",
    gm_samtale_listen_ans: "Lyt til dit svar",
    gm_samtale_reset_ans: "Nulstil valg",

    gm_sq_1: "Hvor har du været i Danmark?",
    gm_sq_2: "Hvad er dit yndlingssted i Danmark – og hvorfor?",
    gm_sq_3: "Hvilken by og landsdel bor du i nu?",
    gm_sq_4: "Har du kørt over Storebæltsbroen eller sejlet med en færge?",
    gm_sq_5: "Kan du bedst lide byen, skoven eller kysten med sten og sand?",
    gm_sq_6: "Hvordan synes du, det danske vejr er?",
    gm_sq_7: "Hvilket sted i Danmark vil du gerne besøge i fremtiden?",
    gm_sq_8: "Hvordan er naturen i Danmark sammenlignet med dit hjemland?",

    // Audio Footer
    gm_saf_title: "Lyt til melodien: \"Godmorgen, lille land\"",
    gm_saf_sub: "Melodi af Carsten Johs. Mørch (1998) fra Højskolesangbogen",
    gm_saf_open_yt: "Hør melodi på YouTube",
    gm_saf_show_player: "Vis afspiller",
    gm_saf_hide_player: "Skjul afspiller"
  },
  ...g1Translations,
  ...g2Translations,
  ...g3Translations,
  ...g4Translations
};
