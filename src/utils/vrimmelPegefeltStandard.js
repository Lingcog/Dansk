import { getLang } from './i18n.js';

const EYE_OPEN_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_OFF_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;

export function ensureVrimmelStandardStyles() {
    if (document.getElementById('vrimmel-pegefelt-standard-styles')) return;
    const style = document.createElement('style');
    style.id = 'vrimmel-pegefelt-standard-styles';
    style.textContent = `
        .vrimmel-controls-row {
            display: flex;
            justify-content: flex-end;
            margin-top: 0.45rem;
            margin-bottom: 0.25rem;
        }
        .vrimmel-pins-toggle-btn {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.16);
            color: #94a3b8;
            padding: 0.3rem 0.72rem;
            border-radius: 999px;
            font-size: 0.74rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            transition: all 0.16s ease;
        }
        .vrimmel-pins-toggle-btn:hover {
            border-color: #4c9ba6;
            color: #f1f5f9;
        }
        .vrimmel-pins-hidden,
        .vrimmel-stage-pins-hidden .vrimmel-std-pin {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Harmonisk standard for pegefelter (model: AarstiderVinterView .vinter-pin)
           Ingen ikoner og ingen taleboble-trekant — kun ren rund cirkel + tal */
        .vrimmel-std-pins > button,
        .vrimmel-std-pin {
            transform: translate(-50%, -50%) !important;
            width: 26px !important;
            height: 26px !important;
            min-width: 26px !important;
            min-height: 26px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            border-width: 2px !important;
            font-size: 0.72rem !important;
            font-weight: 900 !important;
            line-height: 1 !important;
            display: inline-flex;
            align-items: center !important;
            justify-content: center !important;
            gap: 0 !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6) !important;
            transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease !important;
        }
        /* Bevar ordklasse-/kategori-filtrering (display:none og .filtered-out skal altid skjule pegefeltet) */
        .vrimmel-std-pin[style*="display: none"],
        .vrimmel-std-pin[style*="display:none"],
        .vrimmel-std-pin.filtered-out,
        .vrimmel-std-pins > button[style*="display: none"],
        .vrimmel-std-pins > button[style*="display:none"],
        .vrimmel-std-pins > button.filtered-out {
            display: none !important;
        }
        /* Fjern taleboble-trekant og ikoner inde i pegefelter */
        .vrimmel-std-pins > button::after,
        .vrimmel-std-pin::after {
            display: none !important;
            content: none !important;
        }
        .vrimmel-std-pins > button svg,
        .vrimmel-std-pin svg,
        .vrimmel-std-pins > button [class*="-icon"],
        .vrimmel-std-pin [class*="-icon"],
        .vrimmel-std-pins > button [class*="-label"],
        .vrimmel-std-pin [class*="-label"],
        .vrimmel-std-pins > button .pin-tooltip,
        .vrimmel-std-pin .pin-tooltip {
            display: none !important;
        }
        /* Indre num-cirkler gøres transparente så selve cirklen er pegefeltet */
        .vrimmel-std-pins > button [class*="-num"],
        .vrimmel-std-pin [class*="-num"] {
            background: transparent !important;
            color: inherit !important;
            width: auto !important;
            height: auto !important;
            padding: 0 !important;
            font-size: inherit !important;
            font-weight: 900 !important;
        }
        /* Hvis et ældre pegefelt kun har ord-tekst (ingen tal), hold en kompakt pille */
        .vrimmel-std-pin.vrimmel-std-word-pin {
            width: auto !important;
            height: 24px !important;
            min-height: 24px !important;
            padding: 0 0.45rem !important;
            border-radius: 999px !important;
            font-size: 0.68rem !important;
            white-space: nowrap !important;
        }
        .vrimmel-std-pins > button:hover,
        .vrimmel-std-pins > button.active,
        .vrimmel-std-pins > button.selected,
        .vrimmel-std-pin:hover,
        .vrimmel-std-pin.active,
        .vrimmel-std-pin.selected {
            transform: translate(-50%, -50%) scale(1.18) !important;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.7) !important;
            z-index: 25 !important;
        }

        /* Mobil (<= 640px): endnu mere kompakte tal-cirkler (20px) + udvidet usynligt tryk-område */
        @media (max-width: 640px) {
            .vrimmel-std-pins > button,
            .vrimmel-std-pin {
                width: 20px !important;
                height: 20px !important;
                min-width: 20px !important;
                min-height: 20px !important;
                padding: 0 !important;
                border-radius: 50% !important;
                border-width: 1.5px !important;
                font-size: 0.62rem !important;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.55) !important;
            }
            .vrimmel-std-pin.vrimmel-std-word-pin {
                width: auto !important;
                height: 20px !important;
                min-height: 20px !important;
                padding: 0 0.36rem !important;
                border-radius: 999px !important;
                font-size: 0.6rem !important;
            }
            .vrimmel-std-pins > button::before,
            .vrimmel-std-pin::before {
                content: '';
                position: absolute;
                inset: -7px;
            }
        }
    `;
    document.head.appendChild(style);
}

function buildToggleRow(toggleFn, isHiddenFn, lang) {
    const isEn = (lang || getLang() || 'da') === 'en';
    const hideLabel = isEn ? 'Hide markers' : 'Skjul pegefelter';
    const showLabel = isEn ? 'Show markers' : 'Vis pegefelter';

    const row = document.createElement('div');
    row.className = 'vrimmel-controls-row';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vrimmel-pins-toggle-btn';

    const sync = () => {
        const hidden = isHiddenFn();
        btn.innerHTML = hidden
            ? `${EYE_OPEN_SVG}<span>${showLabel}</span>`
            : `${EYE_OFF_SVG}<span>${hideLabel}</span>`;
        btn.setAttribute('aria-pressed', String(hidden));
    };

    sync();
    btn.onclick = () => {
        toggleFn();
        sync();
    };

    row.appendChild(btn);
    return { row, btn };
}

/**
 * Kobler harmonisk pegefelt-standard + diskret nordisk "Skjul/Vis pegefelter"-knap
 * lige under et vrimlebillede.
 */
export function attachVrimmelControls(stageWrapEl, pinsLayerEl, opts = {}) {
    ensureVrimmelStandardStyles();
    if (!stageWrapEl || !pinsLayerEl) return null;

    stageWrapEl.dataset.vrimmelStdAttached = '1';
    pinsLayerEl.classList.add('vrimmel-std-pins');

    const { row, btn } = buildToggleRow(
        () => pinsLayerEl.classList.toggle('vrimmel-pins-hidden'),
        () => pinsLayerEl.classList.contains('vrimmel-pins-hidden'),
        opts.lang
    );

    if (stageWrapEl.parentNode) {
        stageWrapEl.insertAdjacentElement('afterend', row);
    }
    return btn;
}

/**
 * Global, letvægts opgradering til ALLE vrimlebilleder i hele appen (Gruppe 2–6 m.fl.):
 * Finder automatisk ethvert vrimlebillede med klikbare pegefelter, ensretter størrelsen
 * (26px desktop / 20px mobil uden ikoner) og tilføjer den diskrete "Skjul pegefelter"-knap.
 */
function upgradeVrimmelStagesIn(rootEl) {
    if (!rootEl) return;
    ensureVrimmelStandardStyles();

    const imgs = rootEl.querySelectorAll('img[src*="vrimmel"], img[alt*="vrimmel" i]');
    imgs.forEach(img => {
        // Spring H.C. Andersen over (har egen skræddersyet .hc-pins-toggle-btn)
        if (img.closest('.hc-vrimmel-stage, .hc-andersen-container')) return;

        // Find den nærmeste container omkring billedet, som også indeholder pegefelt-elementerne (button eller div)
        let stage = img.parentElement;
        if (!stage) return;
        const pinSelector = 'button, [class*="hotspot"], [class*="pegefelt"], [class*="-pin"]';
        let pinNodes = [...stage.querySelectorAll(pinSelector)];
        if (pinNodes.length < 3 && stage.parentElement) {
            const parentNodes = [...stage.parentElement.querySelectorAll(pinSelector)].filter(
                b => !b.classList.contains('vrimmel-pins-toggle-btn')
            );
            if (parentNodes.length >= 3) {
                stage = stage.parentElement;
                pinNodes = parentNodes;
            }
        }

        // Kun rigtige interaktive vrimlebilleder med pegefelter (mindst 3)
        const absPins = pinNodes.filter(b => {
            if (b.classList.contains('vrimmel-pins-toggle-btn')) return false;
            if (b.classList.contains('hotspot-detail-card')) return false;
            const hasPos = b.style.left || b.style.top || /(?:^|[-_\s])(pin|hotspot|pegefelt|marker)(?:$|[-_\s])/i.test(b.className);
            return hasPos;
        });
        if (absPins.length < 3) return;

        // Marker hvert pegefelt med harmonisk standard
        absPins.forEach(pin => {
            if (pin.closest('.vrimmel-std-pins')) return;
            pin.classList.add('vrimmel-std-pin');
            // Tjek om pegefeltet udelukkende viser et ord (> 3 tegn og intet rent tal)
            const rawText = (pin.textContent || '').replace(/\s+/g, ' ').trim();
            const hasNumChild = !!pin.querySelector('[class*="-num"]');
            if (!hasNumChild && rawText.length > 3 && !/^\d+[.)]?$/.test(rawText)) {
                pin.classList.add('vrimmel-std-word-pin');
            }
        });

        // Undgå dobbelt knap hvis allerede koblet
        const outerWrap = stage.closest('[class*="stage-wrap"], [class*="stage-viewport"], [class*="vrimmel-wrap"], [class*="vrimmel-container"]') || stage;
        if (
            outerWrap.dataset.vrimmelStdAttached === '1' ||
            stage.dataset.vrimmelStdAttached === '1' ||
            outerWrap.nextElementSibling?.classList.contains('vrimmel-controls-row')
        ) {
            return;
        }

        outerWrap.dataset.vrimmelStdAttached = '1';
        const { row } = buildToggleRow(
            () => stage.classList.toggle('vrimmel-stage-pins-hidden'),
            () => stage.classList.contains('vrimmel-stage-pins-hidden'),
            getLang()
        );
        if (outerWrap.parentNode) {
            outerWrap.insertAdjacentElement('afterend', row);
        }
    });
}

let observerInstalled = false;
export function installGlobalVrimmelStandard() {
    ensureVrimmelStandardStyles();
    if (observerInstalled || typeof MutationObserver === 'undefined') return;
    observerInstalled = true;

    let rafId = 0;
    const schedule = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            const appEl = document.getElementById('app') || document.body;
            upgradeVrimmelStagesIn(appEl);
        });
    };

    const obs = new MutationObserver(schedule);
    const target = document.getElementById('app') || document.body;
    obs.observe(target, { childList: true, subtree: true });
    schedule();
}
