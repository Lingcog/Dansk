import { translations } from './translations.js';
export { translations };

export const appState = {
    lang: null,
    currentView: 'language'
};

export function getLang() {
    // Priority: 1. URL hash (#/en/...) 2. localStorage 3. Default (da)
    const hashSegments = window.location.hash.split('/');
    if (hashSegments.length > 1 && translations[hashSegments[1]]) {
        return hashSegments[1];
    }
    return appState.lang || localStorage.getItem('appLang') || 'da';
}

export function getTranslation(key, params = {}) {
    const langObj = translations[getLang()];
    let text = (langObj && langObj[key]) ? langObj[key] : (translations['da'][key] || key);

    Object.keys(params).forEach(p => {
        text = text.replace(`{${p}}`, params[p]);
    });

    return text;
}

export function setLanguage(langCode) {
    appState.lang = langCode;
    localStorage.setItem('appLang', langCode);
}
