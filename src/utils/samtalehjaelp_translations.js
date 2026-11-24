import { getLang } from './i18n.js';
import { SAMTALEHJAELP_DA } from './samtalehjaelp_da.js';
import { SAMTALEHJAELP_G1 } from './samtalehjaelp_g1.js';
import { SAMTALEHJAELP_G2 } from './samtalehjaelp_g2.js';
import { SAMTALEHJAELP_G3 } from './samtalehjaelp_g3.js';
import { SAMTALEHJAELP_G4 } from './samtalehjaelp_g4.js';

const RTL_LANGS = new Set(['ar', 'fa', 'ur', 'ps']);

export const SAMTALEHJAELP_BY_LANG = {
    da: SAMTALEHJAELP_DA,
    ...SAMTALEHJAELP_G1,
    ...SAMTALEHJAELP_G2,
    ...SAMTALEHJAELP_G3,
    ...SAMTALEHJAELP_G4
};

export function isShRtl(lang = getLang()) {
    return RTL_LANGS.has(lang);
}

export function shT(key, lang = getLang()) {
    const dict = SAMTALEHJAELP_BY_LANG[lang] || SAMTALEHJAELP_DA;
    return dict[key] ?? SAMTALEHJAELP_DA[key] ?? key;
}
