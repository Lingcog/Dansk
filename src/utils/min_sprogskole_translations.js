import { getLang } from './i18n.js';
import { MIN_SPROGSKOLE_DA } from './min_sprogskole_da.js';
import { MIN_SPROGSKOLE_G1 } from './min_sprogskole_g1.js';
import { MIN_SPROGSKOLE_G2 } from './min_sprogskole_g2.js';
import { MIN_SPROGSKOLE_G3 } from './min_sprogskole_g3.js';
import { MIN_SPROGSKOLE_G4 } from './min_sprogskole_g4.js';

const RTL_LANGS = new Set(['ar', 'fa', 'ur', 'ps']);

export const MIN_SPROGSKOLE_BY_LANG = {
    da: MIN_SPROGSKOLE_DA,
    ...MIN_SPROGSKOLE_G1,
    ...MIN_SPROGSKOLE_G2,
    ...MIN_SPROGSKOLE_G3,
    ...MIN_SPROGSKOLE_G4
};

export function isMsRtl(lang = getLang()) {
    return RTL_LANGS.has(lang);
}

export function msT(key, lang = getLang()) {
    const dict = MIN_SPROGSKOLE_BY_LANG[lang] || MIN_SPROGSKOLE_DA;
    return dict[key] ?? MIN_SPROGSKOLE_DA[key] ?? key;
}

export function msSub(key, cls = 'ms-sub-tr', lang = getLang()) {
    if (!lang || lang === 'da') return '';
    const dict = MIN_SPROGSKOLE_BY_LANG[lang];
    const tr = dict?.[key];
    if (!tr || tr === MIN_SPROGSKOLE_DA[key]) return '';
    const dir = RTL_LANGS.has(lang) ? ' dir="rtl"' : '';
    const safe = String(tr).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<span class="${cls}"${dir}>${safe}</span>`;
}
