import { getTranslation } from './i18n.js';

const STORAGE_KEY = 'ordstilling_pure_illustration';

export function isCleanIllustrationActive() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function setCleanIllustrationActive(active) {
    localStorage.setItem(STORAGE_KEY, active ? 'true' : 'false');
}

/**
 * Creates and returns a control bar with a toggle button that toggles questions on/off on a photo-overlay-wrap.
 * Synchronizes with localStorage and other clean illustration toggles across Ordstilling views.
 *
 * @param {HTMLElement} photoWrap The .photo-overlay-wrap element to toggle .pure-mode on
 * @param {Function} [onToggleCallback] Optional callback invoked on toggle
 * @returns {HTMLElement} The control bar element
 */
export function createCleanIllustrationToggle(photoWrap, onToggleCallback = null) {
    const bar = document.createElement('div');
    bar.className = 'photo-control-bar';

    let isActive = isCleanIllustrationActive();

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pure-photo-toggle-btn ${isActive ? 'active' : ''}`;

    function updateState() {
        btn.className = `pure-photo-toggle-btn ${isActive ? 'active' : ''}`;
        const label = getTranslation('clean_illustration_btn') || 'Se ren illustration:';
        const status = isActive ? (getTranslation('toggle_on') || 'TIL') : (getTranslation('toggle_off') || 'FRA');
        btn.innerHTML = `
            <span class="pure-btn-icon">🖼️</span>
            <span class="pure-btn-text">${label}</span>
            <strong class="pure-status-tag">${status}</strong>
        `;
        if (photoWrap) {
            photoWrap.classList.toggle('pure-mode', isActive);
        }
        if (typeof onToggleCallback === 'function') {
            onToggleCallback(isActive);
        }
    }

    btn.onclick = () => {
        isActive = !isActive;
        setCleanIllustrationActive(isActive);

        // Update all toggle buttons in DOM
        document.querySelectorAll('.pure-photo-toggle-btn').forEach(otherBtn => {
            otherBtn.classList.toggle('active', isActive);
            const otherStatus = otherBtn.querySelector('.pure-status-tag');
            if (otherStatus) {
                otherStatus.textContent = isActive ? (getTranslation('toggle_on') || 'TIL') : (getTranslation('toggle_off') || 'FRA');
            }
        });

        // Update all photo overlays in DOM
        document.querySelectorAll('.photo-overlay-wrap').forEach(wrap => {
            wrap.classList.toggle('pure-mode', isActive);
        });

        updateState();
    };

    updateState();
    bar.appendChild(btn);
    return bar;
}
