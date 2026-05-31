import fs from 'fs';
import path from 'path';

const translatedFile = '/tmp/translated_missing.json';
const targetFile = '/Users/mikaelfabrin/Documents/App-antigravity/Gratisapp/src/utils/translations.js';

const translatedData = JSON.parse(fs.readFileSync(translatedFile, 'utf8'));
let translationsContent = fs.readFileSync(targetFile, 'utf8');

const targetLangs = Object.keys(translatedData);

targetLangs.forEach(lang => {
    const newData = translatedData[lang];
    const newKeysJson = JSON.stringify(newData, null, 2);
    // Remove the outer braces and the "da" key wrapper if it exists (it shouldn't here)
    // We want a list of "key": "value", entries.
    let entries = newKeysJson.slice(1, -1).trim();
    if (entries) {
        entries = ',\n    ' + entries + '\n';

        // Find the language block and its closing brace
        // This regex looks for "  lang: {" and then finds the next "  },"
        const langRegex = new RegExp(`  ${lang}: \\{[^]*?  \\},`, 'g');
        const match = translationsContent.match(langRegex);

        if (match) {
            const oldBlock = match[0];
            const insertionPoint = oldBlock.lastIndexOf('  },');
            const newBlock = oldBlock.slice(0, insertionPoint).trimEnd() + entries + '  },';
            translationsContent = translationsContent.replace(oldBlock, newBlock);
            console.log(`Merged ${Object.keys(newData).length} keys for ${lang}`);
        } else {
            console.warn(`Could not find block for ${lang}`);
        }
    }
});

fs.writeFileSync(targetFile, translationsContent);
console.log('Successfully merged all translations into translations.js');
