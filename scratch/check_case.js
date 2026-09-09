import fs from 'fs';

const fileContent = fs.readFileSync('src/utils/translations.js', 'utf8');

const lines = fileContent.split('\n');
let inDa = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!inDa && line.match(/^\s*da:\s*\{/)) {
        inDa = true;
    }
    
    if (inDa) {
        if (line.includes('{')) braceCount += (line.match(/\{/g) || []).length;
        if (line.includes('}')) braceCount -= (line.match(/\}/g) || []).length;
        
        const match = line.match(/^\s*(?:"([^"]+)"|([a-zA-Z0-9_]+))\s*:\s*(["'])(.*?)\3,?$/);
        if (match) {
            const key = match[1] || match[2];
            const val = match[4];
            
            const words = val.split(/\s+/);
            let hasBadCaps = false;
            if (words.length > 1) {
                for (let j = 1; j < words.length; j++) {
                    let word = words[j];
                    word = word.replace(/^[^a-zA-ZÆØÅæøå]+/, '');
                    if (!word) continue;
                    
                    if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
                        const prevWord = words[j-1];
                        if (!prevWord.match(/[.?!:]$/) && !prevWord.match(/^[—-]$/)) {
                            if (!word.match(/^(Dansk|LIDL|Jonas|Emma|Peter|Netto|Danmark|Italien|København|Farum|Aarhus|A1|A2|B|C|DU1|DU2|DU3|L|D|R|G|Gør|S|V|F)$/)) {
                                if (key.match(/Title|Desc|Menu|Label/) || key === 'talemaader' || key === 'hanHamHans' || key === 'gårGikGået' || key === 'verberTider') {
                                    console.log(`Line ${i + 1}: ${key}: ${val}`);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        if (braceCount === 0 && inDa) {
            break; // Exited 'da' block
        }
    }
}
