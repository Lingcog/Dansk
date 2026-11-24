import { getLang } from './i18n.js';
import { MB_SKRIVE_DA } from './mb_skrive_da.js';
import { MB_SKRIVE_G1 } from './mb_skrive_g1.js';
import { MB_SKRIVE_G2 } from './mb_skrive_g2.js';
import { MB_SKRIVE_G3 } from './mb_skrive_g3.js';
import { MB_SKRIVE_G4 } from './mb_skrive_g4.js';

const RTL_LANGS = new Set(['ar', 'fa', 'ur', 'ps']);

export const MB_SKRIVE_BY_LANG = {
    da: MB_SKRIVE_DA,
    ...MB_SKRIVE_G1,
    ...MB_SKRIVE_G2,
    ...MB_SKRIVE_G3,
    ...MB_SKRIVE_G4
};

export function isSwRtl(lang = getLang()) {
    return RTL_LANGS.has(lang);
}

export function swT(key, lang = getLang(), vars = null) {
    const dict = MB_SKRIVE_BY_LANG[lang] || MB_SKRIVE_DA;
    let str = dict[key] ?? MB_SKRIVE_DA[key] ?? key;
    if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
            str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
    }
    return str;
}
