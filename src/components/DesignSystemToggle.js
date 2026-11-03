/**
 * DesignSystemToggle.js
 * Multi-nuance farve-toggle til localhost
 * Giver mulighed for realtime-inspektion og sammenligning på localhost af:
 * - Kombination: Vinrød bund (#4A040B) + Meget mørkegrønne kort (erstatter den grå i klassisk)
 * - Varianter af kombinationen (Skovgrøn, Smaragd, Botanisk)
 * - Ren mørkegrøn flade
 * - Ren vinrød (#380207 benchmark)
 * - Klassisk gråflade
 */

const STORAGE_KEY = 'ds_preview_mode';

export const COLOR_PALETTES = {
    'combo-vinroed-skov': {
        id: 'combo-vinroed-skov',
        name: 'Vinrød + Skovgrøn',
        label: '🍇🌲 Vinrød + Skovgrøn',
        icon: '🍇🌲',
        badge: 'Kombination (Anbefalet)',
        desc: 'Vinrød bund (#4A040B) + meget mørkegrønne kort (#073518) der erstatter den grå',
        accentColor: '#22c55e',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#073518',
            '--vp-surface-hover': '#0c4f24',
            '--vp-surface-input': '#02220e',
            '--vp-border': '#136832',
            '--vp-border-focus': '#a7f3d0',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#a7f3d0',
            '--vp-text-subtle': '#6ee7b7',
            '--vp-primary': '#22c55e',
            '--vp-accent': '#22c55e',
        }
    },
    'combo-vinroed-smaragd': {
        id: 'combo-vinroed-smaragd',
        name: 'Vinrød + Smaragd',
        label: '🍇💎 Vinrød + Smaragd',
        icon: '🍇💎',
        badge: 'Kombination Juvel',
        desc: 'Vinrød bund (#4A040B) + dyb smaragdgrønne kort (#043626) der erstatter den grå',
        accentColor: '#14b8a6',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#043626',
            '--vp-surface-hover': '#08523b',
            '--vp-surface-input': '#022318',
            '--vp-border': '#0c6e52',
            '--vp-border-focus': '#99f6e4',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#99f6e4',
            '--vp-text-subtle': '#5eead4',
            '--vp-primary': '#14b8a6',
            '--vp-accent': '#14b8a6',
        }
    },
    'combo-vinroed-botanisk': {
        id: 'combo-vinroed-botanisk',
        name: 'Vinrød + Botanisk',
        label: '🍇🍃 Vinrød + Botanisk',
        icon: '🍇🍃',
        badge: 'Kombination Varm',
        desc: 'Vinrød bund (#4A040B) + ultra-mørk leksikongrøn (#0a2d13) der erstatter den grå',
        accentColor: '#22c55e',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#0a2d13',
            '--vp-surface-hover': '#12451f',
            '--vp-surface-input': '#041d0b',
            '--vp-border': '#1d612b',
            '--vp-border-focus': '#bbf7d0',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#bbf7d0',
            '--vp-text-subtle': '#86efac',
            '--vp-primary': '#22c55e',
            '--vp-accent': '#22c55e',
        }
    },
    'groen-skov': {
        id: 'groen-skov',
        name: 'Hel-grøn',
        label: '🌲 Hel-grøn (Skovgrøn)',
        icon: '🌲',
        badge: 'Nordic Pine',
        desc: 'Helgrøn flade i klassisk skovgrøn (#063618 / #08441f)',
        accentColor: '#22c55e',
        vars: {
            '--vp-bg': '#063618',
            '--vp-bg-glow': '#0a5426',
            '--vp-surface': '#08441f',
            '--vp-surface-hover': '#0c5c2a',
            '--vp-surface-input': '#032511',
            '--vp-border': '#136832',
            '--vp-border-focus': '#a7f3d0',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#a7f3d0',
            '--vp-text-subtle': '#6ee7b7',
            '--vp-primary': '#22c55e',
            '--vp-accent': '#22c55e',
        }
    },
    'vinroed': {
        id: 'vinroed',
        name: 'Hel-vinrød',
        label: '🍷 Hel-vinrød (#380207)',
        icon: '🍷',
        badge: 'Ren Vinrød',
        desc: 'Original bordeaux vinrød præcision (#380207 / #4A040B)',
        accentColor: '#FF4D5E',
        vars: {
            '--vp-bg': '#4A040B',
            '--vp-bg-glow': '#6B0F1A',
            '--vp-surface': '#5C0812',
            '--vp-surface-hover': '#73101C',
            '--vp-surface-input': '#380207',
            '--vp-border': '#851825',
            '--vp-border-focus': '#FFC9CD',
            '--vp-text': '#FFFFFF',
            '--vp-text-muted': '#FFC9CD',
            '--vp-text-subtle': '#D49B9F',
            '--vp-primary': '#FF4D5E',
            '--vp-accent': '#FF4D5E',
        }
    },
    'classic': {
        id: 'classic',
        name: 'Klassisk Grå',
        label: '🔘 Klassisk (Original grå)',
        icon: '🔘',
        badge: 'Original Grå',
        desc: 'Hidtidig skifergrå grundflade uden præcisionstema',
        accentColor: '#38bdf8',
        vars: null
    }
};

export function isLocalhost() {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '' || host.endsWith('.local');
}

export function getActiveDesignTheme() {
    // 1. Tjek URL query param ?design=...
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('design');
    if (param && (COLOR_PALETTES[param] || param === 'alpha' || param === 'classic')) {
        return param === 'alpha' ? 'vinroed' : param;
    }

    // 2. Tjek localStorage (hvis gemt 'combo-vinroed-skov' fra tidligere test, nulstil til vinroed)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== 'combo-vinroed-skov' && (COLOR_PALETTES[stored] || stored === 'classic')) {
        return stored === 'alpha' ? 'vinroed' : stored;
    }

    // Standard app-tema: 'vinroed' (Forsiden i ren vinrød præcision med monokrome ikoner)
    return 'vinroed';
}

export function applyDesignTheme(mode) {
    const activeKey = (mode === 'alpha') ? 'vinroed' : mode;

    if (!activeKey || activeKey === 'classic') {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.removeAttribute('data-color-mode');
        document.body.removeAttribute('data-theme');
        document.body.removeAttribute('data-color-mode');

        const allVars = [
            '--vp-bg', '--vp-bg-glow', '--vp-surface', '--vp-surface-hover',
            '--vp-surface-input', '--vp-border', '--vp-border-focus',
            '--vp-text', '--vp-text-muted', '--vp-text-subtle',
            '--vp-primary', '--vp-accent'
        ];
        allVars.forEach(v => document.documentElement.style.removeProperty(v));
        localStorage.setItem(STORAGE_KEY, 'classic');
    } else {
        const palette = COLOR_PALETTES[activeKey] || COLOR_PALETTES['combo-vinroed-skov'];

        document.documentElement.setAttribute('data-theme', 'vinroed-praecision');
        document.documentElement.setAttribute('data-color-mode', activeKey);
        document.body.setAttribute('data-theme', 'vinroed-praecision');
        document.body.setAttribute('data-color-mode', activeKey);

        if (palette.vars) {
            Object.entries(palette.vars).forEach(([prop, val]) => {
                document.documentElement.style.setProperty(prop, val);
            });
        }
        localStorage.setItem(STORAGE_KEY, activeKey);
    }

    // Opdater aktive knapper i toggle bar
    const container = document.getElementById('ds-toggle-container');
    if (container) {
        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            const btnMode = btn.getAttribute('data-mode');
            const isActive = (btnMode === activeKey);
            if (isActive) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Opdater aktiv farveindikator
        const curPalette = COLOR_PALETTES[activeKey];
        const indicator = container.querySelector('.ds-toggle-current-dot');
        if (indicator && curPalette) {
            indicator.style.backgroundColor = curPalette.accentColor || '#22c55e';
            indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || '#22c55e'}`;
        }
    }
}

export function initDesignSystemToggle() {
    // 1. Aktivér altid aktuelt tema
    const initialMode = getActiveDesignTheme();
    applyDesignTheme(initialMode);

    // Lyt på ruteskift for at sikre temaet forbliver aktivt
    window.addEventListener('hashchange', () => {
        applyDesignTheme(getActiveDesignTheme());
    });

    // 2. Toggle-knappen skal KUN være tilgængelig på localhost
    if (!isLocalhost()) {
        const existingContainer = document.getElementById('ds-toggle-container');
        if (existingContainer) existingContainer.remove();
        return;
    }

    // Sikr at styles kun injiceres én gang
    if (!document.getElementById('ds-toggle-styles')) {
        const style = document.createElement('style');
        style.id = 'ds-toggle-styles';
        style.textContent = `
            .ds-toggle-container {
                position: fixed !important;
                bottom: 18px !important;
                left: 18px !important;
                z-index: 9999999 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                background: rgba(12, 4, 7, 0.94) !important;
                backdrop-filter: blur(18px) !important;
                -webkit-backdrop-filter: blur(18px) !important;
                border: 1.5px solid rgba(255, 255, 255, 0.22) !important;
                border-radius: 9999px !important;
                padding: 6px 8px 6px 14px !important;
                box-shadow: 0 10px 32px rgba(0, 0, 0, 0.75), 0 0 20px rgba(34, 197, 94, 0.35) !important;
                font-family: 'Outfit', -apple-system, sans-serif !important;
                font-size: 0.825rem !important;
                color: #e2e8f0 !important;
                user-select: none !important;
                max-width: calc(100vw - 36px) !important;
                transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease !important;
            }
            .ds-toggle-container:hover {
                box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 26px rgba(34, 197, 94, 0.45) !important;
            }
            .ds-toggle-label {
                font-weight: 700 !important;
                letter-spacing: 0.3px !important;
                color: #FFFFFF !important;
                display: flex !important;
                align-items: center !important;
                gap: 6px !important;
                margin-right: 2px !important;
                white-space: nowrap !important;
                font-size: 0.8rem !important;
            }
            .ds-toggle-current-dot {
                width: 8px !important;
                height: 8px !important;
                border-radius: 50% !important;
                display: inline-block !important;
                transition: background-color 0.25s, box-shadow 0.25s !important;
            }
            .ds-toggle-group {
                display: flex !important;
                align-items: center !important;
                background: rgba(0, 0, 0, 0.6) !important;
                border-radius: 9999px !important;
                padding: 3px !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                gap: 3px !important;
                overflow-x: auto !important;
            }
            .ds-toggle-btn {
                background: transparent !important;
                border: none !important;
                color: #cbd5e1 !important;
                font-family: inherit !important;
                font-size: 0.75rem !important;
                font-weight: 600 !important;
                padding: 5px 10px !important;
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
                background: rgba(255, 255, 255, 0.1) !important;
            }
            .ds-toggle-btn.active {
                color: #ffffff !important;
                font-weight: 700 !important;
            }
            .ds-toggle-btn[data-mode="combo-vinroed-skov"].active {
                background: #073518 !important;
                border: 1px solid #22c55e !important;
                box-shadow: 0 0 14px rgba(34, 197, 94, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="combo-vinroed-smaragd"].active {
                background: #043626 !important;
                border: 1px solid #14b8a6 !important;
                box-shadow: 0 0 14px rgba(20, 184, 166, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="combo-vinroed-botanisk"].active {
                background: #0a2d13 !important;
                border: 1px solid #22c55e !important;
                box-shadow: 0 0 14px rgba(34, 197, 94, 0.6) !important;
            }
            .ds-toggle-btn[data-mode="groen-skov"].active {
                background: #08441f !important;
                border: 1px solid #22c55e !important;
                box-shadow: 0 0 12px rgba(34, 197, 94, 0.5) !important;
            }
            .ds-toggle-btn[data-mode="vinroed"].active {
                background: #5C0812 !important;
                border: 1px solid #FF4D5E !important;
                box-shadow: 0 0 12px rgba(255, 77, 94, 0.5) !important;
            }
            .ds-toggle-btn[data-mode="classic"].active {
                background: rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
            }
            @media (max-width: 768px) {
                .ds-toggle-container {
                    bottom: 12px !important;
                    left: 8px !important;
                    padding: 4px 6px !important;
                    border-radius: 14px !important;
                }
                .ds-toggle-label span {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    let container = document.getElementById('ds-toggle-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ds-toggle-container';
        container.className = 'ds-toggle-container';

        const buttonsHtml = Object.values(COLOR_PALETTES).map(pal => `
            <button class="ds-toggle-btn ${pal.id === initialMode ? 'active' : ''}" 
                    data-mode="${pal.id}" 
                    title="${pal.desc}">
                <span>${pal.icon}</span>
                <span>${pal.name}</span>
            </button>
        `).join('');

        container.innerHTML = `
            <span class="ds-toggle-label">
                <span class="ds-toggle-current-dot"></span>
                <span>Farve:</span>
            </span>
            <div class="ds-toggle-group">
                ${buttonsHtml}
            </div>
        `;

        container.querySelectorAll('.ds-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.getAttribute('data-mode');
                applyDesignTheme(mode);
            });
        });

        document.body.appendChild(container);

        // Opdater dot
        const curPalette = COLOR_PALETTES[initialMode];
        const indicator = container.querySelector('.ds-toggle-current-dot');
        if (indicator && curPalette) {
            indicator.style.backgroundColor = curPalette.accentColor || '#22c55e';
            indicator.style.boxShadow = `0 0 10px ${curPalette.accentColor || '#22c55e'}`;
        }
    }
}
