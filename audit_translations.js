import fs from 'fs';
import { translations } from './src/utils/translations.js';

const sourceLang = 'da';
const targetLangs = ['ar', 'ur', 'ru', 'ne', 'pt', 'fa'];

const sourceKeys = Object.keys(translations[sourceLang]);

targetLangs.forEach(lang => {
    if (!translations[lang]) {
        console.log(`Language: ${lang} - NOT FOUND`);
        return;
    }
    const targetKeys = new Set(Object.keys(translations[lang]));
    const missing = sourceKeys.filter(key => !targetKeys.has(key));

    // Filter for the critical groups mentioned by the user
    const criticalGroups = [
        'adj_', 'adv_', 'conj_', 'derEr_',
        'adjHint_', 'adjFeedback', 'advHint_', 'advFeedback',
        'conjHint_', 'conjFeedback', 'derEr_ex'
    ];

    const criticalMissing = missing.filter(key =>
        criticalGroups.some(group => key.startsWith(group))
    );

    console.log(`Language: ${lang}`);
    console.log(`Total missing keys: ${missing.length}`);
    console.log(`Critical missing keys: ${criticalMissing.length}`);
    if (criticalMissing.length > 0) {
        console.log(`Sample missing keys: ${criticalMissing.slice(0, 5).join(', ')}`);
    }
    console.log('---');
});
