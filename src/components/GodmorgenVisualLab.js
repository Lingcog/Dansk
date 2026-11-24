// ============================================================================
// GodmorgenVisualLab.js
// Nordisk hybrid-forklaringsboks til "Godmorgen lille land":
//   1. Konkrete geografiske ord & naturfænomener -> 2 billeder (● match + ● match,
//      INGEN kontrast) med udsnit fra sang_godmorgen_lille_land_vrimmel.jpg.
//   2. Rumlige, relationelle & abstrakte udtryk -> 100 % ordløse SVG-diagrammer
//      med ● match ≠ ○ kontrast.
// ============================================================================

import { ensureEnebaerVisualLabStyles } from './EnebaerbuskVisualLab.js';

const GM_VRIMMEL_URL = 'assets/sang_godmorgen_lille_land_vrimmel.jpg';

const SVG_CLOSE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const DOT_MATCH = `<svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="#4c9ba6"/></svg>`;
const DOT_CONTRAST = `<svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.2" fill="none" stroke="#64748b" stroke-width="1.6"/></svg>`;
const SVG_NEQ = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/><line x1="16" y1="4" x2="8" y2="20"/></svg>`;

function svgFraEgnTilEgn(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <ellipse cx="48" cy="74" rx="28" ry="14" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <ellipse cx="172" cy="74" rx="28" ry="14" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <path d="M72 68 Q110 26 148 68" fill="none" stroke="#7ec4ce" stroke-width="2.5" stroke-linecap="round"/>
                <polyline points="140,60 150,68 138,71" fill="none" stroke="#7ec4ce" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="110" cy="47" r="4" fill="#e2e8f0"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <ellipse cx="48" cy="74" rx="28" ry="14" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <ellipse cx="172" cy="74" rx="28" ry="14" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <line x1="110" y1="36" x2="110" y2="92" stroke="#475569" stroke-width="2" stroke-dasharray="4 4"/>
        </svg>
    `;
}

function svgPrikModNord(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <circle cx="110" cy="58" r="40" fill="#151a21" stroke="#475569" stroke-width="2"/>
                <ellipse cx="110" cy="58" rx="40" ry="14" fill="none" stroke="#334155" stroke-width="1.4" stroke-dasharray="3 3"/>
                <line x1="110" y1="18" x2="110" y2="98" stroke="#334155" stroke-width="1.2"/>
                <circle cx="114" cy="30" r="6" fill="#4c9ba6" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="114" cy="30" r="11" fill="none" stroke="#7ec4ce" stroke-width="1.4" opacity="0.6"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <circle cx="110" cy="58" r="40" fill="#151a21" stroke="#475569" stroke-width="2"/>
            <ellipse cx="110" cy="58" rx="40" ry="14" fill="none" stroke="#334155" stroke-width="1.4"/>
            <ellipse cx="110" cy="64" rx="26" ry="16" fill="#475569" stroke="#94a3b8" stroke-width="1.6"/>
        </svg>
    `;
}

function svgFraNordTilSyd(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <circle cx="110" cy="24" r="6" fill="#7ec4ce"/>
                <line x1="110" y1="32" x2="110" y2="86" stroke="#4c9ba6" stroke-width="2.6" stroke-linecap="round"/>
                <polyline points="101,78 110,89 119,78" fill="none" stroke="#7ec4ce" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="110" cy="94" r="6" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <line x1="94" y1="24" x2="126" y2="24" stroke="#334155" stroke-width="1.4"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <circle cx="110" cy="58" r="8" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
            <circle cx="110" cy="58" r="18" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/>
        </svg>
    `;
}

function svgBroSindTilSind(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <circle cx="54" cy="46" r="11" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <path d="M38 82 Q54 62 70 82" fill="none" stroke="#7ec4ce" stroke-width="2.2" stroke-linecap="round"/>
                <circle cx="166" cy="46" r="11" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <path d="M150 82 Q166 62 182 82" fill="none" stroke="#7ec4ce" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M70 46 Q110 22 150 46" fill="none" stroke="#7ec4ce" stroke-width="2.4" stroke-linecap="round"/>
                <path d="M70 52 Q110 74 150 52" fill="none" stroke="#4c9ba6" stroke-width="2" stroke-dasharray="4 3"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <circle cx="54" cy="46" r="11" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <path d="M38 82 Q54 62 70 82" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round"/>
            <circle cx="166" cy="46" r="11" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <path d="M150 82 Q166 62 182 82" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="110" y1="24" x2="110" y2="92" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
        </svg>
    `;
}

function svgIngenAlene(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <line x1="80" y1="48" x2="110" y2="36" stroke="#4c9ba6" stroke-width="2"/>
                <line x1="110" y1="36" x2="140" y2="48" stroke="#4c9ba6" stroke-width="2"/>
                <line x1="80" y1="48" x2="96" y2="78" stroke="#4c9ba6" stroke-width="2"/>
                <line x1="140" y1="48" x2="124" y2="78" stroke="#4c9ba6" stroke-width="2"/>
                <line x1="96" y1="78" x2="124" y2="78" stroke="#4c9ba6" stroke-width="2"/>
                <circle cx="110" cy="36" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="80" cy="48" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="140" cy="48" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="96" cy="78" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="124" cy="78" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <circle cx="110" cy="58" r="10" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <circle cx="110" cy="58" r="28" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4"/>
        </svg>
    `;
}

export const GODMORGEN_VISUAL_NODES = {
    // -------------------------------------------------------------------------
    // KONKRETE GEOGRAFISKE ORD & NATUR: 2 billeder (● match + ● match, INGEN kontrast)
    // -------------------------------------------------------------------------
    kyst_sten_sand: {
        word: 'kyst af sten og sand',
        subtitle: 'strand med sand, rullesten og hav',
        mode: 'dual_match',
        left: { bgPos: '13% 73%', bgSize: '420%', caption: 'Kystlinjen mod vest' },
        right: { bgPos: '17% 73%', bgSize: '460%', caption: 'Sand og runde sten' }
    },
    havets_boelger: {
        word: 'havets bølger',
        subtitle: 'bølger der ruller ind mod kysten',
        mode: 'dual_match',
        left: { bgPos: '8% 73%', bgSize: '430%', caption: 'Vesterhavets bølger' },
        right: { bgPos: '12% 74%', bgSize: '460%', caption: 'Hvidt skum ved stranden' }
    },
    bakker_is: {
        word: 'bakker skabt af is',
        subtitle: 'bløde grønne bakker formet i istiden',
        mode: 'dual_match',
        left: { bgPos: '27% 48%', bgSize: '400%', caption: 'Grønne bakker i Jylland' },
        right: { bgPos: '79% 22%', bgSize: '400%', caption: 'Istidens gletsjeris' }
    },
    dis: {
        word: 'land med dis',
        subtitle: 'let, lys morgentåge over land og fjord',
        mode: 'dual_match',
        left: { bgPos: '26% 32%', bgSize: '420%', caption: 'Morgendis over fjorden' },
        right: { bgPos: '22% 28%', bgSize: '360%', caption: 'Let tåge over markerne' }
    },
    sol: {
        word: 'land med sol',
        subtitle: 'morgensolen der står op over vandet',
        mode: 'dual_match',
        left: { bgPos: '63% 18%', bgSize: '400%', caption: 'Gylden morgensol' },
        right: { bgPos: '14% 79%', bgSize: '420%', caption: 'Sollys der blinker i vandet' }
    },
    blaest_regn: {
        word: 'blæst og regn',
        subtitle: 'frisk vind og regnbyger i dansk vejr',
        mode: 'dual_match',
        left: { bgPos: '11% 16%', bgSize: '420%', caption: 'Regnbyger og vind' },
        right: { bgPos: '8% 73%', bgSize: '400%', caption: 'Bølger i blæsevejr' }
    },
    oe_ved_oe: {
        word: 'ø ved ø',
        subtitle: 'Danmark som ø-rige med over 400 øer',
        mode: 'dual_match',
        left: { bgPos: '42% 68%', bgSize: '380%', caption: 'Fyn og små øer' },
        right: { bgPos: '72% 63%', bgSize: '380%', caption: 'Sjælland omgivet af vand' }
    },
    broer: {
        word: 'de slanke, lyse broer',
        subtitle: 'broer der forbinder landsdelene over havet',
        mode: 'dual_match',
        left: { bgPos: '53% 68%', bgSize: '430%', caption: 'Storebæltsbroen' },
        right: { bgPos: '37% 59%', bgSize: '430%', caption: 'Lillebæltsbroen' }
    },
    blink_hav_soe: {
        word: 'blink af hav og sø',
        subtitle: 'solens genskin på både hav og fersk sø',
        mode: 'dual_match',
        left: { bgPos: '14% 79%', bgSize: '440%', caption: 'Klitsø ved kysten' },
        right: { bgPos: '8% 73%', bgSize: '420%', caption: 'Det åbne hav' }
    },
    skagens_gren: {
        word: 'Skagens hvide gren',
        subtitle: 'Danmarks nordligste sandspids',
        mode: 'dual_match',
        left: { bgPos: '34% 14%', bgSize: '440%', caption: 'Grenen ved Skagen' },
        right: { bgPos: '34% 10%', bgSize: '360%', caption: 'Helt mod nord' }
    },
    gedsers_odde: {
        word: 'Gedsers lange odde',
        subtitle: 'Danmarks sydligste spids på Falster',
        mode: 'dual_match',
        left: { bgPos: '70% 91%', bgSize: '440%', caption: 'Gedser Odde mod syd' },
        right: { bgPos: '68% 88%', bgSize: '360%', caption: 'Landtangen ved Østersøen' }
    },
    gletsjer_bison: {
        word: 'gletsjervæg og bison',
        subtitle: 'istidens ismur og de tidligste mennesker',
        mode: 'dual_match',
        left: { bgPos: '86% 27%', bgSize: '420%', caption: 'Bisonjagt ved isen' },
        right: { bgPos: '79% 22%', bgSize: '420%', caption: 'Den høje gletsjervæg' }
    },

    // -------------------------------------------------------------------------
    // RUMLIGE, RELATIONELLE & ABSTRAKTE UDTRYK: Ordløse SVG-diagrammer (● ≠ ○)
    // -------------------------------------------------------------------------
    fra_egn_til_egn: {
        word: 'fra egn til egn',
        subtitle: 'forbindelse mellem forskellige landsdele',
        mode: 'diagram_contrast',
        leftSvg: () => svgFraEgnTilEgn(false),
        rightSvg: () => svgFraEgnTilEgn(true)
    },
    prik_mod_nord: {
        word: 'vores prik mod nord',
        subtitle: 'et lille land højt oppe på den runde jord',
        mode: 'diagram_contrast',
        leftSvg: () => svgPrikModNord(false),
        rightSvg: () => svgPrikModNord(true)
    },
    fra_nord_til_syd: {
        word: 'fra nord til syd',
        subtitle: 'linjen hele vejen gennem landet',
        mode: 'diagram_contrast',
        leftSvg: () => svgFraNordTilSyd(false),
        rightSvg: () => svgFraNordTilSyd(true)
    },
    bro_sind_til_sind: {
        word: 'bygger vi bro fra sind til sind',
        subtitle: 'forståelse og samtale mellem mennesker',
        mode: 'diagram_contrast',
        leftSvg: () => svgBroSindTilSind(false),
        rightSvg: () => svgBroSindTilSind(true)
    },
    ingen_alene: {
        word: 'ingen er alene',
        subtitle: 'fællesskab hvor mennesker hører sammen',
        mode: 'diagram_contrast',
        leftSvg: () => svgIngenAlene(false),
        rightSvg: () => svgIngenAlene(true)
    }
};

export function renderGodmorgenVisualBox(wordKey, onClose) {
    ensureEnebaerVisualLabStyles();
    const node = GODMORGEN_VISUAL_NODES[wordKey];
    if (!node) return null;

    const box = document.createElement('div');
    box.className = 'eb-lab-box';

    if (node.mode === 'dual_match') {
        box.innerHTML = `
            <div class="eb-lab-head">
                <div>
                    <div class="eb-lab-title">${node.word}</div>
                    <div class="eb-lab-sub">${node.subtitle}</div>
                </div>
                <button type="button" class="eb-lab-close" aria-label="Luk forklaring">${SVG_CLOSE}</button>
            </div>
            <div style="max-width:360px;">
                <div class="eb-lab-panel match">
                    <div class="eb-lab-panel-bar">${DOT_MATCH}<span>${node.left.caption}</span></div>
                    <div class="eb-lab-crop" style="background-image:url('${GM_VRIMMEL_URL}'); background-position:${node.left.bgPos}; background-size:${node.left.bgSize};"></div>
                </div>
            </div>
        `;
    } else {
        box.innerHTML = `
            <div class="eb-lab-head">
                <div>
                    <div class="eb-lab-title">${node.word}</div>
                    <div class="eb-lab-sub">${node.subtitle}</div>
                </div>
                <button type="button" class="eb-lab-close" aria-label="Luk forklaring">${SVG_CLOSE}</button>
            </div>
            <div class="eb-lab-grid">
                <div class="eb-lab-panel match">
                    <div class="eb-lab-panel-bar">${DOT_MATCH}</div>
                    ${node.leftSvg()}
                </div>
                <div class="eb-lab-neq" aria-hidden="true">${SVG_NEQ}</div>
                <div class="eb-lab-panel">
                    <div class="eb-lab-panel-bar">${DOT_CONTRAST}</div>
                    ${node.rightSvg()}
                </div>
            </div>
        `;
    }

    box.querySelector('.eb-lab-close').onclick = () => {
        if (onClose) onClose();
    };
    return box;
}
