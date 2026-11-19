import { getLang, translations } from './i18n.js';
import { adjektiverWordTranslations } from './top100_adjektiver_translations.js';
import { ADJ_TILSTANDE_G1 } from './adj_tilstande_g1.js';
import { ADJ_TILSTANDE_G2 } from './adj_tilstande_g2.js';
import { ADJ_TILSTANDE_G3 } from './adj_tilstande_g3.js';
import { ADJ_TILSTANDE_G4 } from './adj_tilstande_g4.js';

const ALL_GROUPS = [
    ADJ_TILSTANDE_G1,
    ADJ_TILSTANDE_G2,
    ADJ_TILSTANDE_G3,
    ADJ_TILSTANDE_G4
];

export const MERGED_ADJ5_BY_LANG = {};
for (const group of ALL_GROUPS) {
    if (!group) continue;
    for (const [lang, dict] of Object.entries(group)) {
        if (!MERGED_ADJ5_BY_LANG[lang]) MERGED_ADJ5_BY_LANG[lang] = {};
        Object.assign(MERGED_ADJ5_BY_LANG[lang], dict);
    }
}

// Tilføj albansk (sq) støtte til UI-nøgler og de 22 målord i Felt 5, så alle 18 sprog i appen er 100% dækket
const SQ_UI_PATCH = {
    adj_back: "Kthehu te 100 Mbiemrat",
    top100_adj_f5_title: "Fusha 5: Ngjyrat, sasitë dhe gjendjet",
    top100_adj_f5_desc: "Mësoni 22 mbiemra thelbësorë për pastërtinë, shëndetin, lagështinë, dritën, ngjyrat dhe sasitë e numërueshme/të panumërueshme.",
    adj_tab_1: "1. Studioja e kontrastit (22)",
    adj_tab_2: "2. Gjej antonimin",
    adj_tab_3: "3. Sinonimet & nuancat",
    adj_tab_4: "4. Barometri",
    adj_tab_5: "5. Ndërtuesi i lakimit",
    adj_tab_6: "6. Konteksti & historia",
    adj_click_hotspot_hint: "Klikoni mbi pikat në figurë për të parë mbiemrin, lakimin dhe antonimin e tij!",
    adj_pure_label: "Figurë e pastër:",
    adj_status_off: "JOAKTIVE",
    adj_status_on: "AKTIVE",
    adj_f5_stage_left: "Pastërtia, shëndeti dhe ekuilibri",
    adj_f5_stage_right: "Rrëmuja, sëmundja dhe errësira",
    adj_listen_pronunciation: "Dëgjo",
    adj_modpol_label: "Antonimi:",
    adj_faelles_label: "Gjinia e përbashkët (en)",
    adj_intet_label: "Gjinia asnjanëse (et)",
    adj_flertal_label: "Shumës / E shquar (de/den/det)",
    adj_example_sentence: "Fjali shembull:",
    adj_duel_counter: "Dueli {current} nga {total}",
    adj_nuance_counter: "Nuanca {current} nga {total}",
    adj_kongruens_counter: "Përshtatja {current} nga {total}",
    adj_situation_counter: "Situata {current} nga {total}",
    adj_baro_counter: "Barometri {current} nga {total}",
    adj_score_label: "Pikët:",
    adj_next_duel: "Dueli tjetër ➔",
    adj_next_nuance: "Nuanca tjetër ➔",
    adj_next_kongruens: "Detyra tjetër ➔",
    adj_next_situation: "Situata tjetër ➔",
    adj_result_duel_btn: "Shiko rezultatin ({score}/{total})",
    adj_result_syn_btn: "Përfundo sinonimet ({score}/{total})",
    adj_result_kong_btn: "Shiko rezultatin e lakimit ({score}/{total})",
    adj_result_story_btn: "Shiko rezultatin ({score}/{total})",
    adj_retry_btn: "Provo përsëri",
    adj_correct_feedback: "Saktë!",
    adj_wrong_feedback: "Jo krejt:",
    adj_correct_answer_is: "Përgjigjja e saktë është:",
    adj_duel_modal_title: "Punë e shkëlqyer në duelin e antonimeve!",
    adj_duel_modal_score: "Keni gjetur <strong>{score}</strong> nga <strong>{total}</strong> antonime të sakta.",
    adj_syn_modal_title: "Fjalor i shkëlqyer!",
    adj_syn_modal_score: "Keni gjetur <strong>{score}</strong> nga <strong>{total}</strong> nuanca të sakta.",
    adj_kong_modal_title: "Punë e mirë me mbaresat e mbiemrave!",
    adj_kong_modal_score: "Keni gjetur <strong>{score}</strong> nga <strong>{total}</strong> mbaresa të sakta.",
    adj_story_modal_title: "Kuptim i shkëlqyer i leximit!",
    adj_story_modal_score: "Keni gjetur <strong>{score}</strong> nga <strong>{total}</strong> përgjigje të sakta.",
    adj_baro_step: "[ Hapi {n} ]",
    adj_baro_remove_tooltip: "Klikoni për të hequr këtë fjalë",
    adj_baro_reset_btn: "Rivendos shkallën",
    adj_baro_check_btn: "Kontrollo renditjen",
    adj_baro_next_btn: "Shkalla tjetër ➔",
    adj_baro_master_btn: "E zotëruat barometrin!",
    adj_baro_success: "Renditje perfekte! I vendosët fjalët në rendin e duhur:",
    adj_baro_wrong: "Jo krejt në rregull. Disa fjalë nuk janë në rendin e duhur.",
    adj_baro_hint: "Këshillë: Mendoni për gjendjen më të lehtë në fillim dhe më të fortën në fund!",
    adj_baro_f5_s1_title: "🧽 Shkalla 1: Pastërtia",
    adj_baro_f5_s1_desc: "Renditni nga më e pista deri te shkëlqyeshëm e pastër:",
    adj_baro_f5_s1_low: "👞 E neveritshme / shumë e pistë",
    adj_baro_f5_s1_high: "✨ Shkëlqyeshëm e pastër",
    adj_baro_f5_s2_title: "🍎 Shkalla 2: Shëndeti dhe forma",
    adj_baro_f5_s2_desc: "Renditni nga rëndë i sëmurë deri te plot shëndet:",
    adj_baro_f5_s2_low: "🤒 Rëndë i sëmurë",
    adj_baro_f5_s2_high: "💪 Plot shëndet",
    adj_baro_f5_s3_title: "💧 Shkalla 3: Lagështia",
    adj_baro_f5_s3_desc: "Renditni nga kupë e thatë deri te qull fare:",
    adj_baro_f5_s3_low: "🏜️ Kupë e thatë",
    adj_baro_f5_s3_high: "🌊 Qull fare",
    adj_baro_f5_s4_title: "💡 Shkalla 4: Niveli i dritës",
    adj_baro_f5_s4_desc: "Renditni nga errësirë pus deri te dritë verbuese:",
    adj_baro_f5_s4_low: "🌑 Errësirë pus",
    adj_baro_f5_s4_high: "☀️ Dritë verbuese",
    adj_baro_f5_s5_title: "📊 Shkalla 5: Sasia e numërueshme (numri)",
    adj_baro_f5_s5_desc: "Renditni sasitë nga asnjë deri te të panumërta (sende të numërueshme):",
    adj_baro_f5_s5_low: "0️⃣ Asnjë",
    adj_baro_f5_s5_high: "♾️ Të panumërta",
    adj_baro_f5_s6_title: "🧭 Shkalla 7: Siguria dhe qartësia",
    adj_baro_f5_s6_desc: "Renditni nga krejt e pasigurt deri te siguri kristalore:",
    adj_baro_f5_s6_low: "❓ E dyshimtë",
    adj_baro_f5_s6_high: "✔️ Kristal e qartë",
    adj_kongruens_subprompt: "Zgjidhni formën e saktë të mbiemrit:",
    adj_story_subprompt: "Cila fjalë përshtatet më mirë në këtë situatë?",
    adj_grammar_banner_title: "Dëshironi të mësoni të gjitha rregullat e lakimit të mbiemrave?",
    adj_grammar_banner_desc: "Mësoni për formën bazë, gjininë asnjanëse (-t), formën e shquar dhe shumësin (-e) si dhe shkallët e krahasimit.",
    adj_grammar_banner_btn: "Shko te udhëzuesi i lakimit ➔",
    adj_quantity_box_title: "Sasi e numërueshme vs. e panumërueshme (Mange/Få ↔ Meget/Lidt)",
    adj_quantity_countable_title: "Emra të numërueshëm (shumës: 1, 2, 3...):",
    adj_quantity_countable_large: "• Sasi e madhe: <strong>mange</strong> (mange stole, mange bøger, mange gæster)",
    adj_quantity_countable_small: "• Sasi e vogël: <strong>få</strong> (få stole, få bøger, få fejl)",
    adj_quantity_uncountable_title: "Emra të panumërueshëm (masë, lëng, kohë):",
    adj_quantity_uncountable_large: "• Sasi e madhe: <strong>meget</strong> (meget kaffe, meget tid, meget vand)",
    adj_quantity_uncountable_small: "• Sasi e vogël: <strong>lidt</strong> (lidt kaffe, lidt tid, lidt mælk)"
};

const SQ_WORDS_PATCH = {
    ren: { meaning: "i/e pastër", sentence: "Tryeza e ngrënies në kuzhinën e ndritshme është krejtësisht e pastër dhe e rregullt." },
    beskidt: { meaning: "i/e pistë / i/e ndotur", sentence: "Pjata mbi tryezë është shumë e pistë." },
    sund: { meaning: "i/e shëndetshëm", sentence: "Perimet dhe frutat janë ushqim shumë i shëndetshëm." },
    syg: { meaning: "i/e sëmurë", sentence: "Fëmija ka temperaturë dhe është i sëmurë sot." },
    hel: { meaning: "i/e tërë / i/e plotë", sentence: "Familja hëngri një picë të tërë për darkë." },
    halv: { meaning: "gjysmë", sentence: "Ai ha një gjysmë molle gjatë pushimit." },
    mange: { meaning: "shumë (të numërueshme)", sentence: "Sot ka shumë nxënës në klasë." },
    få: { meaning: "pak (të numërueshme)", sentence: "Ka vetëm pak vende të lira në autobus." },
    sikker: { meaning: "i/e sigurt", sentence: "Kasketa e re e biçikletës është plotësisht e sigurt." },
    usikker: { meaning: "i/e pasigurt / i/e paqëndrueshëm", sentence: "Shkalla e vjetër është shumë e pasigurt për të qëndruar mbi të." },
    klar: { meaning: "i/e kthjellët / i/e qartë", sentence: "Uji në gotë është krejtësisht i kthjellët dhe i pastër." },
    uklar: { meaning: "i/e paqartë / i/e turbullt", sentence: "Teksti në tabelë është shumë i paqartë." },
    tør: { meaning: "i/e thatë", sentence: "Peceta e bardhë e kuzhinës është plotësisht e thatë dhe e pastër." },
    våd: { meaning: "i/e lagur", sentence: "Dyshemeja në banjë është shumë e lagur." },
    lys: { meaning: "i/e ndritshëm / me dritë", sentence: "Drita e ditës hyn përmes dritares së madhe dhe të ndritshme." },
    mørk: { meaning: "i/e errët", sentence: "Rruga pa llamba është shumë e errët natën." },
    grøn: { meaning: "i/e gjelbër", sentence: "Në vazot e luleve rriten erëza të freskëta të gjelbra." },
    rød: { meaning: "i/e kuq", sentence: "Makina para shtëpisë është e bukur dhe e kuqe." },
    levende: { meaning: "i/e gjallë", sentence: "Në kopshtin zoologjik mund të shihni shumë kafshë të gjalla." },
    død: { meaning: "i/e ngordhur / i/e tharë (i vdekur)", sentence: "Lulja në dritare nuk mori ujë dhe është tharë krejtësisht." },
    meget: { meaning: "shumë (e panumërueshme)", sentence: "Ka mbetur shumë kafe në ibrik." },
    lidt: { meaning: "pak (e panumërueshme)", sentence: "Ka mbetur vetëm pak qumësht në kuti." }
};

if (translations) {
    if (!translations.sq) translations.sq = {};
    Object.assign(translations.sq, SQ_UI_PATCH);
}
if (adjektiverWordTranslations) {
    for (const [w, sqObj] of Object.entries(SQ_WORDS_PATCH)) {
        if (adjektiverWordTranslations[w] && !adjektiverWordTranslations[w].sq) {
            adjektiverWordTranslations[w].sq = sqObj;
        }
    }
}

export function tAdj5(key, lang = getLang()) {
    if (!lang || lang === 'da' || !key) return '';
    const dict = MERGED_ADJ5_BY_LANG[lang] || MERGED_ADJ5_BY_LANG['en'];
    if (!dict) return '';
    return dict[key] || MERGED_ADJ5_BY_LANG['en']?.[key] || '';
}

export function adj5TransBlock(key, extraStyle = '') {
    const tr = tAdj5(key);
    if (!tr) return '';
    return `<div class="adj5-inline-trans" style="font-size: 0.96rem; color: #fed7aa; font-style: italic; margin-top: 0.35rem; font-weight: 500; line-height: 1.45; opacity: 0.94; ${extraStyle}">(${tr})</div>`;
}

export function adj5TransSpan(key, extraStyle = '') {
    const tr = tAdj5(key);
    if (!tr) return '';
    return `<span class="adj5-inline-trans-span" style="font-size: 0.9em; color: #fdba74; font-style: italic; margin-left: 0.4rem; font-weight: 500; ${extraStyle}">(${tr})</span>`;
}
