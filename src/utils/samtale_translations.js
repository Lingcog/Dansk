import { getLang } from './i18n.js';
import { SAMTALE_DA } from './samtale_da.js';

const RTL_LANGS = new Set(['ar', 'fa', 'ur', 'ps']);

function normalizeKey(str) {
    return String(str || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// Byg opslag fra normaliseret dansk tekst -> nøgle (u1.., e1.., x1..)
const DA_TEXT_TO_KEY = new Map();
for (const [k, v] of Object.entries(SAMTALE_DA)) {
    const norm = normalizeKey(v);
    if (norm && !DA_TEXT_TO_KEY.has(norm)) {
        DA_TEXT_TO_KEY.set(norm, k);
    }
}

// Eksplicitte dynamiske imports så Vite 7 code-splitter hvert sprog i sin egen lille chunk
const LOADERS = {
    en: () => import('./samtale_i18n/samtale_en.js'),
    de: () => import('./samtale_i18n/samtale_de.js'),
    es: () => import('./samtale_i18n/samtale_es.js'),
    pt: () => import('./samtale_i18n/samtale_pt.js'),
    tr: () => import('./samtale_i18n/samtale_tr.js'),
    ar: () => import('./samtale_i18n/samtale_ar.js'),
    fa: () => import('./samtale_i18n/samtale_fa.js'),
    ku: () => import('./samtale_i18n/samtale_ku.js'),
    ur: () => import('./samtale_i18n/samtale_ur.js'),
    ps: () => import('./samtale_i18n/samtale_ps.js'),
    ru: () => import('./samtale_i18n/samtale_ru.js'),
    uk: () => import('./samtale_i18n/samtale_uk.js'),
    zh: () => import('./samtale_i18n/samtale_zh.js'),
    vi: () => import('./samtale_i18n/samtale_vi.js'),
    sq: () => import('./samtale_i18n/samtale_sq.js'),
    th: () => import('./samtale_i18n/samtale_th.js'),
    ne: () => import('./samtale_i18n/samtale_ne.js')
};

const loadedDicts = { da: SAMTALE_DA };
const inflight = new Map();

export function isSamtaleRtl(lang = getLang()) {
    return RTL_LANGS.has(lang);
}

export function stRtlAttr(lang = getLang()) {
    return RTL_LANGS.has(lang) ? ' dir="rtl"' : '';
}

export function isSamtaleLangLoaded(lang = getLang()) {
    if (!lang || lang === 'da' || !LOADERS[lang]) return true;
    return Boolean(loadedDicts[lang]);
}

export function ensureSamtaleLang(lang = getLang()) {
    if (!lang || lang === 'da' || !LOADERS[lang] || loadedDicts[lang]) {
        return Promise.resolve(loadedDicts[lang] || SAMTALE_DA);
    }
    if (!inflight.has(lang)) {
        const p = LOADERS[lang]()
            .then(mod => {
                const dict = mod.default || Object.values(mod)[0] || SAMTALE_DA;
                loadedDicts[lang] = dict;
                inflight.delete(lang);
                return dict;
            })
            .catch(err => {
                console.error('Failed to load samtale translations for', lang, err);
                inflight.delete(lang);
                return SAMTALE_DA;
            });
        inflight.set(lang, p);
    }
    return inflight.get(lang);
}

/**
 * Regel B: Erstatter dansk forklaring/UI med brugerens sprog (uden dansk tekst).
 * På dansk ('da') returneres originalteksten uændret.
 */
export function st(daText, lang = getLang()) {
    if (!daText) return '';
    if (!lang || lang === 'da') return daText;
    const dict = loadedDicts[lang];
    if (!dict) return daText;
    const key = DA_TEXT_TO_KEY.get(normalizeKey(daText));
    if (!key) return daText;
    return dict[key] || daText;
}

/**
 * Regel A: Viser oversættelse direkte NEDEN UNDER en dansk eksempelsætning/replik.
 * På dansk ('da') returneres tom streng, så den danske visning forbliver helt ren.
 */
export function stSub(daText, className = 'st-tr', lang = getLang()) {
    if (!daText || !lang || lang === 'da') return '';
    const dict = loadedDicts[lang];
    if (!dict) return '';
    const key = DA_TEXT_TO_KEY.get(normalizeKey(daText));
    if (!key) return '';
    const txt = dict[key];
    if (!txt) return '';
    const dir = RTL_LANGS.has(lang) ? ' dir="rtl"' : '';
    return `<div class="${className}"${dir}>${txt}</div>`;
}

/**
 * Hjælper til pædagogisk CSS (oversættelseslinjer under danske eksempelsætninger).
 */
export const SAMTALE_TR_CSS = `
    .st-tr {
        font-size: 0.83rem;
        color: #94a3b8;
        font-weight: 600;
        margin-top: 0.16rem;
        line-height: 1.4;
        text-align: left;
    }
    .st-tr-sent {
        font-size: 0.85rem;
        color: #7dd3fc;
        font-weight: 600;
        margin-top: 0.2rem;
        line-height: 1.4;
        text-align: left;
    }
    .st-tr-opt {
        font-size: 0.78rem;
        color: #94a3b8;
        font-weight: 600;
        margin-top: 0.14rem;
        line-height: 1.35;
        text-align: left;
    }
`;
