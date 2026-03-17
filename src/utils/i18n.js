import { translations } from './translations.js';

export const appState = {
    lang: localStorage.getItem('appLang') || null,
    currentView: 'language',
};

export function getLang() {
    return appState.lang || 'da';
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
