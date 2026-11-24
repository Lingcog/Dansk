// ============================================================================
// EnebaerbuskVisualLab.js
// Nordisk hybrid-forklaringsboks til "Så går vi rundt om en enebærbusk"
// (inspireret af KlodsHansVisualSentence1Lab.js):
//   1. Konkrete handlinger & ting -> 2 billeder (● match + ● match, INGEN kontrast)
//      med udsnit fra sang_enebaerbusk_vrimmel.jpg (før i tiden + i dag).
//   2. Grammatiske, tidslige & abstrakte ord -> 100 % ordløse SVG-diagrammer
//      med ● match ≠ ○ kontrast.
// ============================================================================

const VRIMMEL_URL = 'assets/sang_enebaerbusk_vrimmel.jpg';

const SVG_CLOSE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const DOT_MATCH = `<svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="#4c9ba6"/></svg>`;
const DOT_CONTRAST = `<svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.2" fill="none" stroke="#64748b" stroke-width="1.6"/></svg>`;
const SVG_NEQ = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/><line x1="16" y1="4" x2="8" y2="20"/></svg>`;

function svgWeekday(activeIdx, isContrast = false) {
    // 7 dots representing Monday (0) .. Sunday (6), zero words
    const targetIdx = isContrast ? (activeIdx + 3) % 7 : activeIdx;
    const dots = Array.from({ length: 7 }, (_, i) => {
        const cx = 24 + i * 28.5;
        const isHit = i === targetIdx;
        const fill = isHit ? (isContrast ? '#475569' : '#4c9ba6') : '#1e293b';
        const stroke = isHit ? (isContrast ? '#94a3b8' : '#7ec4ce') : '#334155';
        const r = isHit ? 8.5 : 5.5;
        return `<circle cx="${cx}" cy="58" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
    }).join('');
    // Small weekend divider between day 5 and 6
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <line x1="24" y1="58" x2="195" y2="58" stroke="#334155" stroke-width="2"/>
            <line x1="152" y1="36" x2="152" y2="80" stroke="#334155" stroke-width="1.2" stroke-dasharray="3 3"/>
            ${dots}
            <circle cx="${24 + targetIdx * 28.5}" cy="34" r="2.5" fill="${isContrast ? '#64748b' : '#7ec4ce'}"/>
        </svg>
    `;
}

function svgRundtOm(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <circle cx="110" cy="58" r="14" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="110" cy="58" r="34" fill="none" stroke="#4c9ba6" stroke-width="2.5" stroke-dasharray="165 35"/>
                <polyline points="138,34 146,42 135,45" fill="none" stroke="#7ec4ce" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="76" cy="58" r="4.5" fill="#e2e8f0"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <circle cx="110" cy="36" r="13" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            <line x1="36" y1="82" x2="180" y2="82" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
            <polyline points="170,74 182,82 170,90" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="42" cy="82" r="4.5" fill="#94a3b8"/>
        </svg>
    `;
}

function svgTidligMorgen(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <line x1="22" y1="84" x2="198" y2="84" stroke="#475569" stroke-width="2"/>
                <path d="M74 84 A36 36 0 0 1 146 84" fill="rgba(76,155,166,0.28)" stroke="#7ec4ce" stroke-width="2.4"/>
                <line x1="110" y1="26" x2="110" y2="38" stroke="#7ec4ce" stroke-width="2" stroke-linecap="round"/>
                <line x1="72" y1="42" x2="80" y2="50" stroke="#7ec4ce" stroke-width="2" stroke-linecap="round"/>
                <line x1="148" y1="42" x2="140" y2="50" stroke="#7ec4ce" stroke-width="2" stroke-linecap="round"/>
                <circle cx="176" cy="34" r="14" fill="#151a21" stroke="#4c9ba6" stroke-width="2"/>
                <line x1="176" y1="34" x2="176" y2="25" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round"/>
                <line x1="176" y1="34" x2="176" y2="42" stroke="#7ec4ce" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <line x1="22" y1="84" x2="198" y2="84" stroke="#334155" stroke-width="2"/>
            <path d="M118 30 A24 24 0 1 0 118 74 A18 18 0 1 1 118 30 Z" fill="#475569" stroke="#94a3b8" stroke-width="1.8"/>
            <circle cx="64" cy="38" r="2" fill="#64748b"/>
            <circle cx="80" cy="26" r="1.6" fill="#64748b"/>
            <circle cx="152" cy="44" r="2" fill="#64748b"/>
            <circle cx="176" cy="34" r="14" fill="#151a21" stroke="#475569" stroke-width="2"/>
            <line x1="176" y1="34" x2="176" y2="24" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
            <line x1="176" y1="34" x2="168" y2="30" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
}

function svgNaar(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <line x1="20" y1="66" x2="200" y2="66" stroke="#334155" stroke-width="2"/>
                <path d="M36 66 Q58 30 80 66 Q102 30 124 66 Q146 30 168 66" fill="none" stroke="#4c9ba6" stroke-width="2.4"/>
                <circle cx="36" cy="66" r="5" fill="#7ec4ce"/>
                <circle cx="80" cy="66" r="5" fill="#7ec4ce"/>
                <circle cx="124" cy="66" r="5" fill="#7ec4ce"/>
                <circle cx="168" cy="66" r="5" fill="#7ec4ce"/>
                <polyline points="190,60 200,66 190,72" fill="none" stroke="#4c9ba6" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <line x1="20" y1="66" x2="200" y2="66" stroke="#334155" stroke-width="2"/>
            <circle cx="76" cy="66" r="7" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
            <line x1="168" y1="44" x2="168" y2="88" stroke="#475569" stroke-width="2" stroke-dasharray="3 3"/>
        </svg>
    `;
}

function svgSaadan(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <circle cx="66" cy="40" r="10" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <path d="M52 78 Q66 56 80 78" fill="none" stroke="#7ec4ce" stroke-width="2.4" stroke-linecap="round"/>
                <line x1="94" y1="58" x2="126" y2="58" stroke="#4c9ba6" stroke-width="2.2" stroke-dasharray="4 3"/>
                <polyline points="118,52 127,58 118,64" fill="none" stroke="#4c9ba6" stroke-width="2.2" stroke-linecap="round"/>
                <circle cx="154" cy="40" r="10" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <path d="M140 78 Q154 56 168 78" fill="none" stroke="#7ec4ce" stroke-width="2.4" stroke-linecap="round"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <circle cx="66" cy="40" r="10" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <path d="M52 78 Q66 56 80 78" fill="none" stroke="#64748b" stroke-width="2.4" stroke-linecap="round"/>
            <rect x="142" y="34" width="24" height="24" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <line x1="142" y1="78" x2="168" y2="64" stroke="#64748b" stroke-width="2.4" stroke-linecap="round"/>
        </svg>
    `;
}

function svgVort(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <circle cx="48" cy="46" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="72" cy="46" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <circle cx="60" cy="68" r="9" fill="#2b6e78" stroke="#7ec4ce" stroke-width="2"/>
                <line x1="92" y1="58" x2="136" y2="58" stroke="#4c9ba6" stroke-width="2.4"/>
                <polyline points="128,51 138,58 128,65" fill="none" stroke="#7ec4ce" stroke-width="2.4" stroke-linecap="round"/>
                <rect x="148" y="42" width="32" height="32" rx="7" fill="rgba(76,155,166,0.22)" stroke="#7ec4ce" stroke-width="2.2"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <circle cx="60" cy="58" r="10" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <line x1="84" y1="58" x2="136" y2="58" stroke="#64748b" stroke-width="2.2"/>
            <polyline points="128,51 138,58 128,65" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round"/>
            <rect x="148" y="42" width="32" height="32" rx="7" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
        </svg>
    `;
}

function svgHyggerBravt(isContrast = false) {
    if (!isContrast) {
        return `
            <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
                <rect x="44" y="66" width="28" height="24" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.6"/>
                <rect x="96" y="46" width="28" height="44" rx="4" fill="#2b6e78" stroke="#4c9ba6" stroke-width="1.8"/>
                <rect x="148" y="22" width="28" height="68" rx="4" fill="#4c9ba6" stroke="#7ec4ce" stroke-width="2.2"/>
            </svg>
        `;
    }
    return `
        <svg viewBox="0 0 220 116" class="eb-svg-diag" aria-hidden="true">
            <rect x="44" y="72" width="28" height="18" rx="4" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
            <rect x="96" y="72" width="28" height="18" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
            <rect x="148" y="72" width="28" height="18" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
        </svg>
    `;
}

export const ENEBAER_VISUAL_NODES = {
    // -------------------------------------------------------------------------
    // KONKRETE HANDLINGER & TING: 2 billeder (● match + ● match, INGEN kontrast)
    // -------------------------------------------------------------------------
    vasker: {
        word: 'vasker',
        subtitle: 'at vaske tøj',
        mode: 'dual_match',
        left: { bgPos: '64% 14%', bgSize: '460%', caption: 'Før i tiden · vaskebræt' },
        right: { bgPos: '14% 55%', bgSize: '430%', caption: 'I dag · vaskemaskine' }
    },
    skyller: {
        word: 'skyller',
        subtitle: 'at skylle og koge tøj',
        mode: 'dual_match',
        left: { bgPos: '76% 15%', bgSize: '460%', caption: 'Før i tiden · gryde og vand' },
        right: { bgPos: '24% 75%', bgSize: '430%', caption: 'I dag · tømmer maskinen' }
    },
    toerrer: {
        word: 'tørrer',
        subtitle: 'at tørre tøj',
        mode: 'dual_match',
        left: { bgPos: '92% 7%', bgSize: '450%', caption: 'Før i tiden · tørresnor ude' },
        right: { bgPos: '32% 45%', bgSize: '430%', caption: 'I dag · tørrestativ' }
    },
    ruller: {
        word: 'ruller',
        subtitle: 'at rulle / gøre tøjet glat',
        mode: 'dual_match',
        left: { bgPos: '93% 21%', bgSize: '450%', caption: 'Før i tiden · mangelbræt' },
        right: { bgPos: '42% 42%', bgSize: '430%', caption: 'I dag · lægger tøj sammen' }
    },
    stryger: {
        word: 'stryger',
        subtitle: 'at stryge tøj',
        mode: 'dual_match',
        left: { bgPos: '84% 33%', bgSize: '480%', caption: 'Før i tiden · kulstrygejern' },
        right: { bgPos: '55% 56%', bgSize: '430%', caption: 'I dag · strygejern og bræt' }
    },
    skurer: {
        word: 'skurer',
        subtitle: 'at skure / vaske gulv',
        mode: 'dual_match',
        left: { bgPos: '92% 48%', bgSize: '450%', caption: 'Før i tiden · børste på knæ' },
        right: { bgPos: '74% 62%', bgSize: '430%', caption: 'I dag · moppe og spand' }
    },
    holder_fri: {
        word: 'holder fri',
        subtitle: 'at holde fri om søndagen',
        mode: 'dual_match',
        left: { bgPos: '65% 43%', bgSize: '420%', caption: 'I sofaen · kaffe og ro' },
        right: { bgPos: '24% 35%', bgSize: '390%', caption: 'Ude i haven · ingen pligter' }
    },
    enebaerbusk: {
        word: 'en enebærbusk',
        subtitle: 'en grøn busk i haven',
        mode: 'dual_match',
        left: { bgPos: '24% 35%', bgSize: '360%', caption: 'Busken i haven' },
        right: { bgPos: '24% 32%', bgSize: '560%', caption: 'Tæt på de grønne grene' }
    },
    toej: {
        word: 'tøj',
        subtitle: 'rent og nyvasket tøj',
        mode: 'dual_match',
        left: { bgPos: '32% 45%', bgSize: '440%', caption: 'Tøj på tørrestativ' },
        right: { bgPos: '42% 42%', bgSize: '440%', caption: 'Sammenlagt tøj' }
    },
    gulv: {
        word: 'gulv',
        subtitle: 'gulvet i hjemmet',
        mode: 'dual_match',
        left: { bgPos: '74% 62%', bgSize: '450%', caption: 'Gulv vaskes med moppe' },
        right: { bgPos: '92% 48%', bgSize: '450%', caption: 'Gulv skures med børste' }
    },

    // -------------------------------------------------------------------------
    // GRAMMATISKE, TIDSLIGE & ABSTRAKTE ORD: Ordløse SVG-diagrammer (● ≠ ○)
    // -------------------------------------------------------------------------
    rundt_om: {
        word: 'går rundt om',
        subtitle: 'bevægelse i cirkel omkring noget',
        mode: 'diagram_contrast',
        leftSvg: () => svgRundtOm(false),
        rightSvg: () => svgRundtOm(true)
    },
    tidlig_morgen: {
        word: 'tidlig morgen',
        subtitle: 'starten af dagen (ca. kl. 6–7)',
        mode: 'diagram_contrast',
        leftSvg: () => svgTidligMorgen(false),
        rightSvg: () => svgTidligMorgen(true)
    },
    naar: {
        word: 'når',
        subtitle: 'hver gang noget sker (gentagelse)',
        mode: 'diagram_contrast',
        leftSvg: () => svgNaar(false),
        rightSvg: () => svgNaar(true)
    },
    goer_saadan: {
        word: 'gør sådan',
        subtitle: 'viser og gentager den samme bevægelse',
        mode: 'diagram_contrast',
        leftSvg: () => svgSaadan(false),
        rightSvg: () => svgSaadan(true)
    },
    vort: {
        word: 'vort / vor',
        subtitle: 'gammeldags form for «vores» (tilhører os alle)',
        mode: 'diagram_contrast',
        leftSvg: () => svgVort(false),
        rightSvg: () => svgVort(true)
    },
    hygger_bravt: {
        word: 'hygger os bravt',
        subtitle: 'hygger os rigtig meget',
        mode: 'diagram_contrast',
        leftSvg: () => svgHyggerBravt(false),
        rightSvg: () => svgHyggerBravt(true)
    },
    mandag: { word: 'mandag', subtitle: 'ugens 1. dag', mode: 'diagram_contrast', leftSvg: () => svgWeekday(0, false), rightSvg: () => svgWeekday(0, true) },
    tirsdag: { word: 'tirsdag', subtitle: 'ugens 2. dag', mode: 'diagram_contrast', leftSvg: () => svgWeekday(1, false), rightSvg: () => svgWeekday(1, true) },
    onsdag: { word: 'onsdag', subtitle: 'ugens 3. dag', mode: 'diagram_contrast', leftSvg: () => svgWeekday(2, false), rightSvg: () => svgWeekday(2, true) },
    torsdag: { word: 'torsdag', subtitle: 'ugens 4. dag', mode: 'diagram_contrast', leftSvg: () => svgWeekday(3, false), rightSvg: () => svgWeekday(3, true) },
    fredag: { word: 'fredag', subtitle: 'ugens 5. dag', mode: 'diagram_contrast', leftSvg: () => svgWeekday(4, false), rightSvg: () => svgWeekday(4, true) },
    loerdag: { word: 'lørdag', subtitle: 'ugens 6. dag', mode: 'diagram_contrast', leftSvg: () => svgWeekday(5, false), rightSvg: () => svgWeekday(5, true) },
    soendag: { word: 'søndag', subtitle: 'ugens 7. dag', mode: 'diagram_contrast', leftSvg: () => svgWeekday(6, false), rightSvg: () => svgWeekday(6, true) }
};

export function ensureEnebaerVisualLabStyles() {
    if (document.getElementById('eb-visual-lab-styles')) return;
    const style = document.createElement('style');
    style.id = 'eb-visual-lab-styles';
    style.textContent = `
        .eb-word-btn {
            background: transparent;
            border: none;
            border-bottom: 1.5px dotted rgba(126, 196, 206, 0.65);
            color: inherit;
            font: inherit;
            padding: 0 1px 1px;
            margin: 0;
            cursor: pointer;
            border-radius: 3px;
            transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .eb-word-btn:hover,
        .eb-word-btn.active {
            background: rgba(43, 110, 120, 0.28);
            border-bottom-color: #7ec4ce;
            color: #ffffff;
        }
        .eb-lab-slot {
            margin-top: 0.9rem;
        }
        .eb-lab-box {
            background: #151a21;
            border: 1px solid rgba(76, 155, 166, 0.45);
            border-radius: 14px;
            padding: 0.95rem 1.05rem;
            text-align: left;
            animation: ebFadeIn 0.18s ease;
        }
        @keyframes ebFadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .eb-lab-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
            margin-bottom: 0.75rem;
        }
        .eb-lab-title {
            font-size: 0.96rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .eb-lab-sub {
            font-size: 0.8rem;
            color: #94a3b8;
            margin-top: 0.12rem;
        }
        .eb-lab-close {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.16);
            color: #94a3b8;
            width: 28px;
            height: 28px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.15s ease;
        }
        .eb-lab-close:hover {
            border-color: #4c9ba6;
            color: #f1f5f9;
        }
        .eb-lab-grid {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 0.65rem;
            align-items: center;
        }
        .eb-lab-grid.dual-match {
            grid-template-columns: 1fr 1fr;
        }
        .eb-lab-panel {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 11px;
            overflow: hidden;
        }
        .eb-lab-panel.match {
            border-color: rgba(76, 155, 166, 0.45);
        }
        .eb-lab-panel-bar {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.35rem 0.6rem;
            font-size: 0.73rem;
            font-weight: 700;
            color: #94a3b8;
            border-bottom: 1px solid rgba(203, 213, 225, 0.08);
        }
        .eb-lab-crop {
            width: 100%;
            aspect-ratio: 16 / 10;
            background-image: url('${VRIMMEL_URL}');
            background-repeat: no-repeat;
        }
        .eb-svg-diag {
            display: block;
            width: 100%;
            aspect-ratio: 16 / 10;
            background: #0d1218;
        }
        .eb-lab-neq {
            color: #64748b;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        @media (max-width: 560px) {
            .eb-lab-grid {
                grid-template-columns: 1fr;
                gap: 0.5rem;
            }
            .eb-lab-grid.dual-match {
                grid-template-columns: 1fr 1fr;
            }
            .eb-lab-neq {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Opretter den visuelle forklaringsboks til et klikket ord i sangteksten.
 */
export function renderEnebaerVisualBox(wordKey, onClose) {
    ensureEnebaerVisualLabStyles();
    const node = ENEBAER_VISUAL_NODES[wordKey];
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
            <div class="eb-lab-grid dual-match">
                <div class="eb-lab-panel match">
                    <div class="eb-lab-panel-bar">${DOT_MATCH}<span>${node.left.caption}</span></div>
                    <div class="eb-lab-crop" style="background-position:${node.left.bgPos}; background-size:${node.left.bgSize};"></div>
                </div>
                <div class="eb-lab-panel match">
                    <div class="eb-lab-panel-bar">${DOT_MATCH}<span>${node.right.caption}</span></div>
                    <div class="eb-lab-crop" style="background-position:${node.right.bgPos}; background-size:${node.right.bgSize};"></div>
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
