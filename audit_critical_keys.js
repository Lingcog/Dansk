
import { translations } from './src/utils/translations.js';

const languages = Object.keys(translations);
const daKeys = Object.keys(translations.da);
const criticalKeys = ['finitenessTitle', 'finitenessDesc', 'timelineLabel', 'actionLabel', 'nowLabel', 'pastLabel', 'finitenessExpl', 'adjectiveTitle', 'adjectiveTeaser', 'adjectiveDesc', 'agreementTitle', 'agreementDesc', 'agreementExpl'];

languages.forEach(lang => {
    if (lang === 'da') return;
    const langKeys = Object.keys(translations[lang]);

    console.log(`\n--- LANGUAGE: ${lang} ---`);
    criticalKeys.forEach(k => {
        const val = translations[lang][k];
        const isMissing = !langKeys.includes(k);
        const isDanish = val === translations.da[k] && val !== "";

        if (isMissing) {
            console.log(`[MISSING] ${k}`);
        } else if (isDanish) {
            console.log(`[DANISH] ${k}: "${val}"`);
        } else {
            // console.log(`[OK] ${k}`);
        }
    });
});
