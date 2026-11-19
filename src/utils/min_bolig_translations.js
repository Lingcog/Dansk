import { getLang } from './i18n.js';
import { MIN_BOLIG_DA } from './min_bolig_da.js';
import { MIN_BOLIG_G1 } from './min_bolig_g1.js';
import { MIN_BOLIG_G2 } from './min_bolig_g2.js';
import { MIN_BOLIG_G3 } from './min_bolig_g3.js';
import { MIN_BOLIG_G4 } from './min_bolig_g4.js';

const RTL_LANGS = new Set(['ar', 'fa', 'ur', 'ps']);

export const MIN_BOLIG_BY_LANG = {
    da: MIN_BOLIG_DA,
    ...MIN_BOLIG_G1,
    ...MIN_BOLIG_G2,
    ...MIN_BOLIG_G3,
    ...MIN_BOLIG_G4
};

export function isMbRtl(lang = getLang()) {
    return RTL_LANGS.has(lang);
}

/**
 * Returnerer oversættelsen for det aktive sprog (med dansk fallback).
 */
export function mbT(key, lang = getLang()) {
    const dict = MIN_BOLIG_BY_LANG[lang] || MIN_BOLIG_DA;
    return dict[key] ?? MIN_BOLIG_DA[key] ?? key;
}

/**
 * Returnerer et rent HTML-element med oversættelse lige under en dansk tekst.
 * På dansk ('da') returneres tom streng, så den danske visning forbliver helt ren.
 */
export function mbSub(key, className = 'mb-tr', lang = getLang()) {
    if (!lang || lang === 'da') return '';
    const txt = MIN_BOLIG_BY_LANG[lang]?.[key];
    if (!txt) return '';
    const dir = RTL_LANGS.has(lang) ? ' dir="rtl"' : '';
    return `<div class="${className}"${dir}>${txt}</div>`;
}
