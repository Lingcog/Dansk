const fs = require('fs');
const path = require('path');

const srcDir = '/Users/mikaelfabrin/Documents/App-antigravity/Gratisapp';
const utilsDir = path.join(srcDir, 'src', 'utils');
const outputFile = path.join(utilsDir, 'talemaader_translations.js');

const langs = ['en', 'de', 'ar', 'es', 'fa', 'ku', 'ne', 'ps', 'pt', 'ru', 'th', 'tr', 'uk', 'ur', 'vi', 'zh'];

let merged = {
  da: {}
};

// First, get the Danish keys from strings_to_translate.json if it exists
try {
  const daStrings = JSON.parse(fs.readFileSync(path.join(srcDir, 'strings_to_translate.json'), 'utf8'));
  daStrings.forEach(str => {
    merged.da[str] = str;
  });
} catch (e) {
  console.log("Could not load Danish base strings.");
}

langs.forEach(lang => {
  const filePath = path.join(srcDir, `translations_${lang}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      merged[lang] = data;
      console.log(`Loaded ${lang}`);
    } catch (e) {
      console.error(`Error reading ${lang}:`, e);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});

const outputContent = `export const talemaaderTranslations = ${JSON.stringify(merged, null, 2)};\n`;

fs.writeFileSync(outputFile, outputContent, 'utf8');
console.log('Successfully written to', outputFile);
