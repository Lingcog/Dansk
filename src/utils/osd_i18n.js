import { OSD_DA } from './osd_da.js';
import { OSD_G1 } from './osd_g1.js';
import { OSD_G2 } from './osd_g2.js';
import { OSD_G3 } from './osd_g3.js';
import { OSD_G4 } from './osd_g4.js';

const OSD_RTL_LANGS = new Set(['ar', 'fa', 'ku', 'ur', 'ps']);

const OSD_ALL = {
    da: OSD_DA,
    ...OSD_G1,
    ...OSD_G2,
    ...OSD_G3,
    ...OSD_G4
};

export function isOsdRtl(lang) {
    return OSD_RTL_LANGS.has(lang);
}

export function osdT(key, lang = 'da', vars = null) {
    const dict = OSD_ALL[lang] || OSD_ALL.en || OSD_DA;
    let str = dict[key] ?? OSD_ALL.en?.[key] ?? OSD_DA[key] ?? key;
    if (vars && typeof str === 'string') {
        for (const [k, v] of Object.entries(vars)) {
            str = str.replaceAll(`{${k}}`, String(v));
        }
    }
    return str;
}
