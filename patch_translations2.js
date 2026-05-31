import fs from 'fs';
const filePath = '/Users/mikaelfabrin/Documents/App-antigravity/Gratisapp/src/utils/translations.js';

let content = fs.readFileSync(filePath, 'utf8');

const HTML_GUIDE = `<p style="margin-bottom: 1rem;">Når du åbner linket, skal du skrive <strong>"Klar"</strong>. Så skal du kopiere oversigten:</p><div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; font-family: monospace; border: 1px solid rgba(255,255,255,0.1);">Målord:<br>Situation:<br>Sværhedsgrad:<br>Feedbacksprog:</div><p style="margin-bottom: 1rem;">... ned i dialogvinduet.</p><ul style="margin-left: 1.5rem; margin-bottom: 1rem;"><li style="margin-bottom: 0.5rem;">Hvis du vil træne nogle bestemte ord, skriv dem her under <strong>Målord:</strong> ...</li><li style="margin-bottom: 0.5rem;">Skriv en bestemt situation som historien skal handle om under <strong>Situation:</strong> ...</li><li style="margin-bottom: 0.5rem;">Angiv hvilken sværhedsgrad historien skal have (f.eks. A1, A2, B, C) under <strong>Sværhedsgrad:</strong> ...</li><li>Angiv på hvilket sprog du gerne vil have feedback under <strong>Feedbacksprog:</strong> ...</li></ul>`;

const regex = /(laerNyeOrdHistorierDesc:\s*".*?",?)/g;

content = content.replace(regex, `$1\n    historierPromptGuide: '${HTML_GUIDE}',`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched translations.js with historierPromptGuide');
