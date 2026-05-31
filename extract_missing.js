import fs from 'fs';
import { translations } from './src/utils/translations.js';

const sourceLang = 'da';
const targetLangs = ['en', 'de', 'ar', 'es', 'fa', 'ku', 'ne', 'ps', 'pt', 'ru', 'th', 'tr', 'uk', 'ur', 'vi', 'zh'];

const sourceData = translations[sourceLang];
const sourceKeys = Object.keys(sourceData);

const criticalGroups = [
    'adj_', 'adv_', 'conj_', 'derEr_',
    'adjHint_', 'adjFeedback', 'advHint_', 'advFeedback',
    'conjHint_', 'conjFeedback', 'derEr_ex', 'tidsudtryk_'
];

let extraction = {};

targetLangs.forEach(lang => {
    const targetData = translations[lang] || {};
    const targetKeys = new Set(Object.keys(targetData));

    extraction[lang] = {};

    sourceKeys.forEach(key => {
        if (!targetKeys.has(key)) {
            if (criticalGroups.some(group => key.startsWith(group))) {
                extraction[lang][key] = sourceData[key];
            }
        }
    });

    console.log(`Extracted ${Object.keys(extraction[lang]).length} keys for ${lang}`);
});

fs.writeFileSync('/tmp/missing_strings.json', JSON.stringify(extraction, null, 2));
console.log('Done! Wrote to /tmp/missing_strings.json');
