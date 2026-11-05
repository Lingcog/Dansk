/**
 * Oversættelser til pronomenfladen (PronomenFladeView.js).
 *
 * Nøglerne er de flade nøgler fra buildFlat() i pronomen_flade_data.js
 * (fx "txt.lys_rule_1", "hs.h1.explain", "det.d3.situation").
 * Sprogkoder: en, de, es, pt, tr, ar, fa, ku, ur, ps, ru, uk, zh, vi, sq, th, ne.
 */
import { PRON_G1 } from './pron_flade_g1.js';
import { PRON_G2 } from './pron_flade_g2.js';
import { PRON_G3 } from './pron_flade_g3.js';
import { PRON_G4 } from './pron_flade_g4.js';

export const PRON_TRANS = {};

export function mergePronTrans(group) {
    if (!group) return;
    for (const [lang, dict] of Object.entries(group)) {
        PRON_TRANS[lang] = Object.assign(PRON_TRANS[lang] || {}, dict);
    }
}

mergePronTrans(PRON_G1);
mergePronTrans(PRON_G2);
mergePronTrans(PRON_G3);
mergePronTrans(PRON_G4);
