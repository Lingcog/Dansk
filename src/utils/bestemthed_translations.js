import { getLang } from './i18n.js';
import { BESTEMTHED_DA } from './bestemthed_data.js';
import { BESTEMTHED_G1 } from './bestemthed_trans_g1.js';
import { BESTEMTHED_G2 } from './bestemthed_trans_g2.js';
import { BESTEMTHED_G3 } from './bestemthed_trans_g3.js';
import { BESTEMTHED_G4 } from './bestemthed_trans_g4.js';

export const BESTEMTHED_TRANS = {
    da: BESTEMTHED_DA,
    ...(BESTEMTHED_G1 || {}),
    ...(BESTEMTHED_G2 || {}),
    ...(BESTEMTHED_G3 || {}),
    ...(BESTEMTHED_G4 || {})
};

export function registerBestemthedGroup(group) {
    if (!group) return;
    for (const [lang, dict] of Object.entries(group)) {
        BESTEMTHED_TRANS[lang] = Object.assign(BESTEMTHED_TRANS[lang] || {}, dict);
    }
}

function getCurrentLangSafe() {
    try {
        if (typeof window !== 'undefined') return getLang();
    } catch (e) {}
    return 'da';
}

/**
 * Returns translated string for a key, optionally replacing {param} placeholders.
 */
export function tBh(key, params = {}, lang = getCurrentLangSafe()) {
    if (!key) return '';
    const dict = BESTEMTHED_TRANS[lang] || BESTEMTHED_TRANS['en'] || BESTEMTHED_DA;
    let text = dict[key] || BESTEMTHED_DA[key] || '';
    if (!text) return '';
    for (const [p, val] of Object.entries(params)) {
        text = text.replaceAll(`{${p}}`, val);
    }
    return text;
}

/**
 * Renders an italic bilingual translation block placed directly below the Danish text.
 * When Danish is selected, nothing is rendered.
 */
export function bhTransBlock(key, params = {}, extraStyle = '') {
    const lang = getCurrentLangSafe();
    if (!lang || lang === 'da') return '';
    const text = tBh(key, params, lang);
    if (!text) return '';
    return `<div class="bh-trans-block" style="font-size: 0.90em; color: #94a3b8; font-style: italic; margin-top: 0.25rem; font-weight: 500; line-height: 1.45; ${extraStyle}">${text}</div>`;
}

/**
 * Renders an inline bilingual translation span placed directly after the Danish text.
 * When Danish is selected, nothing is rendered.
 */
export function bhTransSpan(key, params = {}, extraStyle = '') {
    const lang = getCurrentLangSafe();
    if (!lang || lang === 'da') return '';
    const text = tBh(key, params, lang);
    if (!text) return '';
    return `<span class="bh-trans-span" style="font-size: 0.88em; color: #94a3b8; font-style: italic; margin-left: 0.4rem; font-weight: 500; ${extraStyle}">(${text})</span>`;
}
