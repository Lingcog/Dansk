import './style.css';
export const baseUrl = import.meta.env.BASE_URL;
import { renderLanguageView } from './views/LanguageView.js';
import { renderMainView } from './views/MainView.js';
import { renderNotesView } from './views/NotesView.js';
import { renderDagensOpgaveView } from './views/DagensOpgaveView.js';
import { renderWordLearningView } from './views/WordLearningView.js';
import { renderSamtaleTraeningView } from './views/SamtaleTraeningView.js';
import { renderHverdagssamtaleView } from './views/HverdagssamtaleView.js';
import { renderSkrivehjaelpView } from './views/SkrivehjaelpView.js';
import { renderDu1Modul3View } from './views/Du1Modul3View.js';
import { renderDu1MinHverdagView } from './views/Du1MinHverdagView.js';
import { renderTransportSprogskoleView } from './views/TransportSprogskoleView.js';
import { renderMadlavningView } from './views/MadlavningView.js';
import { renderRengoeringView } from './views/RengoeringView.js';
import { translations } from './utils/translations.js';

// Application State
const appState = {
  lang: localStorage.getItem('appLang') || null,
  currentView: 'language', // 'language', 'main', 'notes'
};

// Language Getter
export function getLang() {
  return appState.lang || 'da';
}

export function getTranslation(key) {
  const langObj = translations[getLang()];
  if (langObj && langObj[key]) return langObj[key];
  return translations['da'][key] || key;
}

// Router
export function navigate(viewTarget, extraData = {}) {
  const appDiv = document.querySelector('#app');
  appDiv.innerHTML = ''; // Clear current view

  if (viewTarget === 'language') {
    appState.currentView = 'language';
    renderLanguageView(appDiv, navigate);
  } else if (viewTarget === 'main') {
    appState.currentView = 'main';
    renderMainView(appDiv, navigate);
  } else if (viewTarget === 'notes') {
    appState.currentView = 'notes';
    renderNotesView(appDiv, navigate);
  } else if (viewTarget === 'dagens_opgave') {
    appState.currentView = 'dagens_opgave';
    renderDagensOpgaveView(appDiv, navigate);
  } else if (viewTarget === 'word_learning') {
    appState.currentView = 'word_learning';
    renderWordLearningView(appDiv, navigate);
  } else if (viewTarget === 'samtale_traening') {
    appState.currentView = 'samtale_traening';
    renderSamtaleTraeningView(appDiv, navigate);
  } else if (viewTarget === 'samtale_hverdag') {
    appState.currentView = 'samtale_hverdag';
    renderHverdagssamtaleView(appDiv, navigate);
  } else if (viewTarget === 'skrive_hjaelp') {
    appState.currentView = 'skrive_hjaelp';
    renderSkrivehjaelpView(appDiv, navigate);
  } else if (viewTarget === 'du1_modul3') {
    appState.currentView = 'du1_modul3';
    renderDu1Modul3View(appDiv, navigate);
  } else if (viewTarget === 'du1_min_hverdag') {
    appState.currentView = 'du1_min_hverdag';
    renderDu1MinHverdagView(appDiv, navigate);
  } else if (viewTarget === 'transport_sprogskole') {
    appState.currentView = 'transport_sprogskole';
    renderTransportSprogskoleView(appDiv, navigate);
  } else if (viewTarget === 'du1_madlavning') {
    appState.currentView = 'du1_madlavning';
    renderMadlavningView(appDiv, navigate);
  } else if (viewTarget === 'du1_rengoering') {
    appState.currentView = 'du1_rengoering';
    renderRengoeringView(appDiv, navigate);
  }
}

// Initial setup
export function setLanguage(langCode) {
  appState.lang = langCode;
  localStorage.setItem('appLang', langCode);
}

// Boot up
document.addEventListener('DOMContentLoaded', () => {
  if (!appState.lang) {
    navigate('language');
  } else {
    navigate('main');
  }
});
