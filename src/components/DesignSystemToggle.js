/**
 * DesignSystemToggle.js
 * A/B Toggle mellem Klassisk (A) og 'Vinrød Præcision' (B - Alpha)
 * Giver mulighed for realtime-inspektion og sammenligning på localhost på tværs af alle flader.
 */

const STORAGE_KEY = 'ds_preview_mode';

export function getActiveDesignTheme() {
    // 1. Tjek URL query param ?design=alpha eller ?design=classic
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('design');
    if (param === 'alpha' || param === 'classic') {
        return param;
    }

    // 2. Tjek localStorage (default til 'alpha' under testperioden)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'classic' || stored === 'alpha') {
        return stored;
    }

    return 'alpha'; // Standard: vis Vinrød Præcision
}

export function applyDesignTheme(mode) {
    const isAlpha = mode === 'alpha';
    if (isAlpha) {
        document.documentElement.setAttribute('data-theme', 'vinroed-praecision');
        document.body.setAttribute('data-theme', 'vinroed-praecision');
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.body.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, mode);

    // Opdater aktive knapper i pill
    const container = document.getElementById('ds-toggle-container');
    if (container) {
        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            const btnMode = btn.getAttribute('data-mode');
            if (btnMode === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

export function initDesignSystemToggle() {
    // Sikr at styles kun injiceres én gang
    if (!document.getElementById('ds-toggle-styles')) {
        const style = document.createElement('style');
        style.id = 'ds-toggle-styles';
        style.textContent = `
            .ds-toggle-container {
                position: fixed !important;
                bottom: 20px !important;
                left: 20px !important;
                z-index: 9999999 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                background: rgba(28, 4, 7, 0.94) !important;
                backdrop-filter: blur(16px) !important;
                -webkit-backdrop-filter: blur(16px) !important;
                border: 1.5px solid rgba(255, 77, 94, 0.5) !important;
                border-radius: 9999px !important;
                padding: 6px 8px 6px 12px !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 16px rgba(255, 77, 94, 0.3) !important;
                font-family: 'Outfit', -apple-system, sans-serif !important;
                font-size: 0.825rem !important;
                color: #FFC9CD !important;
                user-select: none !important;
                transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease !important;
            }
            .ds-toggle-container:hover {
                transform: scale(1.03) !important;
                box-shadow: 0 14px 36px rgba(0, 0, 0, 0.7), 0 0 22px rgba(255, 77, 94, 0.45) !important;
            }
            .ds-toggle-label {
                font-weight: 700 !important;
                letter-spacing: 0.3px !important;
                color: #FFFFFF !important;
                display: flex !important;
                align-items: center !important;
                gap: 5px !important;
                margin-right: 4px !important;
            }
            .ds-toggle-group {
                display: flex !important;
                align-items: center !important;
                background: rgba(15, 2, 4, 0.75) !important;
                border-radius: 9999px !important;
                padding: 3px !important;
                border: 1px solid rgba(133, 24, 37, 0.7) !important;
                gap: 3px !important;
            }
            .ds-toggle-btn {
                background: transparent !important;
                border: none !important;
                color: #D49B9F !important;
                font-family: inherit !important;
                font-size: 0.78rem !important;
                font-weight: 600 !important;
                padding: 5px 12px !important;
                border-radius: 9999px !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                outline: none !important;
                display: flex !important;
                align-items: center !important;
                gap: 5px !important;
                white-space: nowrap !important;
            }
            .ds-toggle-btn:hover {
                color: #ffffff !important;
            }
            .ds-toggle-btn.active {
                color: #ffffff !important;
                font-weight: 700 !important;
            }
            .ds-toggle-btn[data-mode="classic"].active {
                background: rgba(255, 255, 255, 0.22) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
            }
            .ds-toggle-btn[data-mode="alpha"].active {
                background: #FF4D5E !important;
                color: #ffffff !important;
                box-shadow: 0 2px 10px rgba(255, 77, 94, 0.55) !important;
            }
            .ds-toggle-sparkle {
                font-size: 0.85rem !important;
            }
            @media (max-width: 600px) {
                .ds-toggle-container {
                    bottom: 12px !important;
                    left: 10px !important;
                    padding: 4px 6px !important;
                    font-size: 0.75rem !important;
                }
                .ds-toggle-label {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Hvis containeren allerede er i DOM'en, opdater blot klasserne
    let container = document.getElementById('ds-toggle-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ds-toggle-container';
        container.className = 'ds-toggle-container';
        container.innerHTML = `
            <span class="ds-toggle-label">Design:</span>
            <div class="ds-toggle-group">
                <button class="ds-toggle-btn" data-mode="classic" title="Vis A: Klassisk (hidtidig kode)">
                    A: Klassisk
                </button>
                <button class="ds-toggle-btn" data-mode="alpha" title="Vis B: Vinrød Præcision (design.md)">
                    B: Vinrød Præcision
                </button>
            </div>
        `;

        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.getAttribute('data-mode');
                applyDesignTheme(mode);
            });
        });

        document.body.appendChild(container);
    }

    // Lyt også på ruteskift for at sikre temaet og knappen forbliver aktive
    window.addEventListener('hashchange', () => {
        applyDesignTheme(getActiveDesignTheme());
    });

    // Aktivér aktuelt tema
    const initialMode = getActiveDesignTheme();
    applyDesignTheme(initialMode);
}
