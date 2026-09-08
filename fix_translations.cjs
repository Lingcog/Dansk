const fs = require('fs');
const filePath = 'src/utils/translations.js';
let content = fs.readFileSync(filePath, 'utf-8');

const additions = `    "udtaleLetTitle": "Lette øvelser (D, R, G)",
    "udtaleLetDesc": "Korte og nemme sætninger uden svære konsonanter.",
    "udtaleSvaerTitle": "Svære øvelser (D, R, G)",
    "udtaleSvaerDesc": "Målrettet træning af de svære danske bogstaver med specifikke sætninger.",`;

// Insert after "traenUdtale": "Træn udtale",
content = content.replace(/"traenUdtale": "Træn udtale",/g, `"traenUdtale": "Træn udtale",\n${additions}`);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed translations.js');
