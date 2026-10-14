import { translations as baseTranslations } from './translations.js';
import { talemaaderTranslations } from './talemaader_translations.js';
import { top100Translations } from './top100_translations.js';
import { sporgsmalTranslations } from './sporgsmal_translations.js';

// Model A: De autoritative danske sprogskole-fagtermer.
// Gælder på tværs af alle 17 sprog, så kursisten opbygger det nødvendige fagsprog til DU-prøver og tavleundervisning.
export const MODEL_A_GRAMMAR_TERMS = {
    // 1. del (Enkel model)
    part1_g1: "Substantiv / Pronomen",
    part1_g2: "Verbum",
    part1_g3: "Præposition (sted)",
    part1_g4: "Tidsadverbium",
    part1_builder_g1: "Substantiv / Pronomen",
    part1_builder_g2: "Verbum",
    part1_builder_g3: "Præposition (sted)",
    part1_builder_g4: "Tidsadverbium",

    // 2. del (Centralt adverbium - 5 led)
    part2_adv_g1: "Substantiv / Pronomen",
    part2_adv_g2: "Verbum",
    part2_adv_g3: "Centraladverbium",
    part2_adv_g4: "Præposition (sted)",
    part2_adv_g5: "Tidsadverbium",

    // 3. del (Hjælpeverber - 6 led)
    part3_modal_g1: "Substantiv / Pronomen",
    part3_modal_g2: "Hjælpeverbum (modal)",
    part3_modal_g3: "Centraladverbium",
    part3_modal_g4: "Hovedverbum (infinitiv)",
    part3_modal_g5: "Præposition (sted)",
    part3_modal_g6: "Tidsadverbium",

    // 4. del (Udvidet model - 7 trin)
    part2_g1: "Adjektiv",
    part2_g2: "Substantiv / Pronomen",
    part2_g3: "Verbum",
    part2_g4: "Centraladverbium",
    part2_g5: "Mådesadverbium",
    part2_g6: "Præposition (sted)",
    part2_g7: "Konjunktion + ledsætning",

    // Fokus på tid (Inversion)
    tid_g1: "Tidsadverbium",
    tid_g2: "Verbum (inversion: 2. plads!)",
    tid_g3: "Substantiv / Pronomen (subjekt)",
    tid_g4: "Præposition (sted)",

    // Fokus på konjunktioner (Inversion)
    konj_g1: "Konjunktion + ledsætning (1. plads)",
    konj_g2: "Verbum (inversion: 2. plads!)",
    konj_g3: "Substantiv / Pronomen (subjekt)",
    konj_g4: "Præposition (sted)"
};

export const translations = {};
const allLangs = new Set([
    ...Object.keys(baseTranslations),
    ...Object.keys(top100Translations || {}),
    ...Object.keys(talemaaderTranslations || {}),
    ...Object.keys(sporgsmalTranslations || {})
]);
allLangs.forEach(lang => {
    translations[lang] = {
        ...(baseTranslations[lang] || {}),
        ...(talemaaderTranslations[lang] || {}),
        ...(top100Translations[lang] || {}),
        ...(sporgsmalTranslations[lang] || {}),
        ...MODEL_A_GRAMMAR_TERMS
    };
});

export const appState = {
    lang: null,
    currentView: 'language'
};

export function getLang() {
    // Priority: 1. URL hash (#/en/...) 2. localStorage 3. Default (da)
    const hashSegments = window.location.hash.split('/');
    if (hashSegments.length > 1 && translations[hashSegments[1]]) {
        return hashSegments[1];
    }
    return appState.lang || localStorage.getItem('appLang') || 'da';
}

export function getTranslation(key, params = {}) {
    const currentLang = getLang();
    const langObj = translations[currentLang];
    let text = (langObj && langObj[key])
        ? langObj[key]
        : (currentLang !== 'da' && translations['en']?.[key]
            ? translations['en'][key]
            : (translations['da']?.[key] || key));

    Object.keys(params).forEach(p => {
        text = text.replace(`{${p}}`, params[p]);
    });

    return text;
}

export function setLanguage(langCode) {
    appState.lang = langCode;
    localStorage.setItem('appLang', langCode);
}
