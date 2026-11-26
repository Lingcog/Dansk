// ============================================================================
// DELT FARVESYSTEM FRA "ORDSTILLING" (#/da/ordstilling)
// Bruges i både SkrivehjaelpView og MinBoligSkrivevaerksted
// ============================================================================

export const ORDSTILLING_COLORS = {
    noun: {
        key: 'noun',
        dot: '#22c55e',
        text: '#4ade80',
        bg: 'rgba(34, 197, 94, 0.13)',
        border: 'rgba(34, 197, 94, 0.48)',
        label: 'Substantiv / Pronomen'
    },
    verb: {
        key: 'verb',
        dot: '#ef4444',
        text: '#f87171',
        bg: 'rgba(239, 68, 68, 0.13)',
        border: 'rgba(239, 68, 68, 0.5)',
        label: 'Verbum (Plads 2)'
    },
    adj: {
        key: 'adj',
        dot: '#f97316',
        text: '#fb923c',
        bg: 'rgba(249, 115, 22, 0.13)',
        border: 'rgba(249, 115, 22, 0.48)',
        label: 'Adjektiv'
    },
    sted: {
        key: 'sted',
        dot: '#0284c7',
        text: '#60a5fa',
        bg: 'rgba(2, 132, 199, 0.15)',
        border: 'rgba(56, 189, 248, 0.48)',
        label: 'Sted'
    },
    tid: {
        key: 'tid',
        dot: '#8b5cf6',
        text: '#c084fc',
        bg: 'rgba(139, 92, 246, 0.15)',
        border: 'rgba(167, 139, 250, 0.48)',
        label: 'Tid'
    }
};

const COLOR_PREF_KEY = 'lingcog_skrive_farvekoder_v1';

export function getColorCodesEnabled() {
    try {
        const val = localStorage.getItem(COLOR_PREF_KEY);
        return val === null ? true : val === '1';
    } catch {
        return true;
    }
}

export function setColorCodesEnabled(enabled) {
    try {
        localStorage.setItem(COLOR_PREF_KEY, enabled ? '1' : '0');
    } catch {}
}

export function getStartCategoryColor(catKey) {
    if (catKey === 'person' || catKey === 'kan_lide' || catKey === 'to_verber') return ORDSTILLING_COLORS.noun;
    if (catKey === 'tid' || catKey === 'baggrund' || catKey === 'droem_ramme') return ORDSTILLING_COLORS.tid;
    if (catKey === 'sted') return ORDSTILLING_COLORS.sted;
    return null;
}

export function chipColorStyle(colorObj, isActive, enabled) {
    if (!enabled || !colorObj) return '';
    if (isActive) {
        return `border-color:${colorObj.dot}; background:${colorObj.bg}; color:#ffffff; box-shadow:0 0 0 1px ${colorObj.dot};`;
    }
    return `border-color:${colorObj.border};`;
}

export function classifyObjectColor(text) {
    const t = (text || '').trim().toLowerCase();
    if (!t) return ORDSTILLING_COLORS.noun;
    if (/^(for\s+\w+\s+år\s+siden|her\s+i\s+\w+\s+år|mandag|fredag|næste\s+uge|hver\s+uge|om\s+)/i.test(t)) {
        return ORDSTILLING_COLORS.tid;
    }
    if (/^(i\s|på\s|ved\s|tæt\s+på\s|til\s+leje|sammen\s+med\s|alene\s+i\s)/i.test(t)) {
        return ORDSTILLING_COLORS.sted;
    }
    if (/^(stor\s|grønt\s|søde|rigtig\s|meget\s|lys\s|rolig|stille|75\s+kvadratmeter)/i.test(t)) {
        return ORDSTILLING_COLORS.adj;
    }
    return ORDSTILLING_COLORS.noun;
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderToken(text, colorObj, enabled) {
    const safe = escapeHtml(text);
    if (!enabled || !colorObj) return safe;
    return `<span class="ord-col-tok" style="background:${colorObj.bg}; border-bottom:2px solid ${colorObj.dot}; color:#f8fafc;">${safe}</span>`;
}

export function buildColoredPreviewHtml({ mode, startCategory, draft, enabled }) {
    const segments = [];

    const pushSeg = (raw, colorObj) => {
        const clean = (raw || '').trim();
        if (!clean) return;
        segments.push({ text: clean, color: colorObj });
    };

    const MID_ADV_COLOR = { dot: '#38bdf8', bg: 'rgba(56, 189, 248, 0.14)' };

    if (mode === 'greeting') {
        pushSeg(draft.start, ORDSTILLING_COLORS.noun);
    } else if (mode === 'at_clause') {
        pushSeg(draft.start, null);
        pushSeg(draft.atSubj, ORDSTILLING_COLORS.noun);
        if (draft.midAdv) pushSeg(draft.midAdv, MID_ADV_COLOR);
        pushSeg(draft.atVerb, ORDSTILLING_COLORS.verb);
        pushSeg(draft.object, classifyObjectColor(draft.object));
    } else if (mode === 'kan_lide') {
        pushSeg(draft.start, ORDSTILLING_COLORS.noun);
        pushSeg(draft.kanModal || 'kan', ORDSTILLING_COLORS.verb);
        pushSeg(draft.kanAdv, MID_ADV_COLOR);
        pushSeg(draft.kanInf, ORDSTILLING_COLORS.verb);
        pushSeg(draft.object, classifyObjectColor(draft.object));
    } else if (mode === 'two_verbs') {
        const isInv2 = !!draft.twoVerbInv;
        pushSeg(draft.start, isInv2 ? ORDSTILLING_COLORS.tid : ORDSTILLING_COLORS.noun);
        pushSeg(draft.twoVerb1 || 'vil', ORDSTILLING_COLORS.verb);
        if (isInv2) pushSeg(draft.invSubj, ORDSTILLING_COLORS.noun);
        if (draft.midAdv) pushSeg(draft.midAdv, MID_ADV_COLOR);
        pushSeg(draft.twoVerb2, ORDSTILLING_COLORS.verb);
        pushSeg(draft.object, classifyObjectColor(draft.object));
    } else {
        pushSeg(draft.start, getStartCategoryColor(startCategory));
        pushSeg(draft.verb, ORDSTILLING_COLORS.verb);
        if (mode === 'inversion') {
            pushSeg(draft.invSubj, ORDSTILLING_COLORS.noun);
        }
        if (draft.midAdv) pushSeg(draft.midAdv, MID_ADV_COLOR);
        if (!(mode === 'normal' && draft.skipStep3)) {
            pushSeg(draft.object, classifyObjectColor(draft.object));
        }
    }

    if (segments.length === 0) return '';

    // Stort begyndelsesbogstav på første led
    segments[0].text = segments[0].text.charAt(0).toUpperCase() + segments[0].text.slice(1);

    let html = segments.map(seg => renderToken(seg.text, seg.color, enabled)).join(' ');

    if (mode === 'greeting') {
        if (!/[,!.?]$/.test(segments[0].text)) html += ',';
        return html;
    }

    const ext = (draft.ext || '').trim();
    if (ext) {
        const sep = (ext.startsWith(',') || ext.startsWith('.')) ? '' : ' ';
        html += `${sep}<span style="color:#cbd5e1;">${escapeHtml(ext)}</span>`;
    }

    const plainEnd = ext || segments[segments.length - 1].text;
    if (!/[.!?]$/.test(plainEnd)) {
        html += '.';
    }
    return html;
}

export function renderColorLegendHtml(enabled, labels = null) {
    const labelMap = labels || {};
    const toggleTxt = enabled
        ? (labelMap.toggleOn || 'Farvekoder: Til')
        : (labelMap.toggleOff || 'Farvekoder: Fra');
    return `
        <div class="ord-col-bar">
            <div class="ord-col-legend ${enabled ? '' : 'muted'}">
                ${Object.values(ORDSTILLING_COLORS).map(c => `
                    <span class="ord-col-item">
                        <span class="ord-col-dot" style="background:${c.dot};"></span>
                        <span style="color:${enabled ? c.text : '#64748b'};">${labelMap[c.key] || c.label}</span>
                    </span>
                `).join('')}
            </div>
            <button type="button" class="ord-col-toggle ${enabled ? 'on' : ''}" data-toggle-color-codes="1">
                <span>${toggleTxt}</span>
            </button>
        </div>
    `;
}

export function ensureOrdstillingColorStyles() {
    if (document.getElementById('ordstilling-color-codes-styles')) return;
    const style = document.createElement('style');
    style.id = 'ordstilling-color-codes-styles';
    style.textContent = `
        .ord-col-bar {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 0.55rem;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.12);
            border-radius: 11px;
            padding: 0.5rem 0.8rem;
            margin-bottom: 0.85rem;
        }
        .ord-col-legend {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.45rem 0.9rem;
            font-size: 0.75rem;
            font-weight: 700;
            transition: opacity 0.16s ease;
        }
        .ord-col-legend.muted { opacity: 0.45; }
        .ord-col-item {
            display: inline-flex;
            align-items: center;
            gap: 0.32rem;
        }
        .ord-col-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            flex-shrink: 0;
        }
        .ord-col-toggle {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.22);
            color: #94a3b8;
            padding: 0.26rem 0.65rem;
            border-radius: 999px;
            font-size: 0.74rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
            flex-shrink: 0;
        }
        .ord-col-toggle:hover { border-color: #4c9ba6; color: #f1f5f9; }
        .ord-col-toggle.on {
            background: rgba(43, 110, 120, 0.28);
            border-color: #4c9ba6;
            color: #e2f5f7;
        }
        .ord-col-tok {
            display: inline-block;
            padding: 0.04rem 0.34rem;
            border-radius: 5px;
            margin: 0.08rem 0.04rem;
            line-height: 1.45;
        }
    `;
    document.head.appendChild(style);
}
