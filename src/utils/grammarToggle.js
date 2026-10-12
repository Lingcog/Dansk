import { getTranslation } from './i18n.js';

// Utility for toggling grammatical terminology mode across Ordstilling views
const STORAGE_KEY = 'ordstilling_show_grammar';

export function isGrammarModeActive() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function setGrammarModeActive(active) {
    localStorage.setItem(STORAGE_KEY, active ? 'true' : 'false');
}

/**
 * Creates and returns a reusable grammar toggle button element.
 * Automatically synchronizes with localStorage and toggles the class 'grammar-mode-active' on the target container.
 *
 * @param {HTMLElement} container The view container to apply 'grammar-mode-active' class on
 * @param {Function} [onToggleCallback] Optional callback invoked on toggle change
 * @returns {HTMLElement} The toggle wrapper element
 */
export function createGrammarToggle(container, onToggleCallback = null) {
    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'grammar-toggle-bar';

    let isActive = isGrammarModeActive();

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = `grammar-toggle-pill ${isActive ? 'active' : ''}`;

    function updateBtn() {
        toggleBtn.className = `grammar-toggle-pill ${isActive ? 'active' : ''}`;
        toggleBtn.innerHTML = `
            <span class="toggle-icon">🎓</span>
            <span class="toggle-text">${getTranslation('grammar_terms_toggle') || 'Grammatiske fagudtryk:'}</span>
            <span class="toggle-badge ${isActive ? 'on' : 'off'}">${isActive ? (getTranslation('toggle_on') || 'TIL') : (getTranslation('toggle_off') || 'FRA')}</span>
        `;
        if (container) {
            container.classList.toggle('grammar-mode-active', isActive);
        }
        if (typeof onToggleCallback === 'function') {
            onToggleCallback(isActive);
        }
    }

    toggleBtn.onclick = () => {
        isActive = !isActive;
        setGrammarModeActive(isActive);
        updateBtn();
    };

    updateBtn();
    toggleWrapper.appendChild(toggleBtn);
    return toggleWrapper;
}
