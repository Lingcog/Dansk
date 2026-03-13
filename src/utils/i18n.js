import { translations } from './translations.js';

export const appState = {
    lang: localStorage.getItem('appLang') || null,
    currentView: 'language',
};

export function getLang() {
    return appState.lang || 'da';
}

export function getTranslation(key) {
    const langObj = translations[getLang()];
    if (langObj && langObj[key]) return langObj[key];
    return translations['da'][key] || key;
}

export function setLanguage(langCode) {
    appState.lang = langCode;
    localStorage.setItem('appLang', langCode);
}
