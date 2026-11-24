import { getLang } from './i18n.js';
import { VINTER_DA } from './vinter_da.js';
import { VINTER_G1 } from './vinter_g1.js';
import { VINTER_G2 } from './vinter_g2.js';
import { VINTER_G3 } from './vinter_g3.js';
import { VINTER_G4 } from './vinter_g4.js';

const RTL_LANGS = new Set(['ar', 'fa', 'ur', 'ps']);

export const VINTER_BY_LANG = {
    da: VINTER_DA,
    ...VINTER_G1,
    ...VINTER_G2,
    ...VINTER_G3,
    ...VINTER_G4
};

export function isAvRtl(lang = getLang()) {
    return RTL_LANGS.has(lang);
}

export function avT(key, lang = getLang()) {
    const dict = VINTER_BY_LANG[lang] || VINTER_DA;
    return dict[key] ?? VINTER_DA[key] ?? key;
}

export function avSub(key, className = 'vinter-tr', lang = getLang()) {
    if (!lang || lang === 'da') return '';
    const txt = VINTER_BY_LANG[lang]?.[key];
    if (!txt) return '';
    const dir = RTL_LANGS.has(lang) ? ' dir="rtl"' : '';
    return `<div class="${className}"${dir}>${txt}</div>`;
}
