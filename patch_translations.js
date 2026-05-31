import fs from 'fs';
const filePath = '/Users/mikaelfabrin/Documents/App-antigravity/Gratisapp/src/utils/translations.js';

let content = fs.readFileSync(filePath, 'utf8');

const regex = /(laerEtNytOrdDesc:\s*".*?",?)/g;

content = content.replace(regex, `$1\n    laerNyeOrdHistorier: "Lær nye ord gennem historier",\n    laerNyeOrdHistorierDesc: "Læs korte historier, og lær nye ord i afsnittene.",`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched translations.js');
