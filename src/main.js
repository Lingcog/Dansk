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
import { renderDu2Mod1View } from './views/Du2Mod1View.js';
import { renderSmaaHistorierView } from './views/SmaaHistorierView.js';
import { renderDu2Mod5View } from './views/Du2Mod5View.js';
import { renderEmailLaanView } from './views/EmailLaanView.js';
import { renderOpdragelseView } from './views/OpdragelseView.js';
import { renderKlageView } from './views/KlageView.js';
import { renderTraenTidsudtrykView } from './views/TraenTidsudtrykView.js';
import { renderLavSporgsmalView } from './views/LavSporgsmalView.js';
import { renderOrdstillingView } from './views/OrdstillingView.js';
import { renderGrammatikView } from './views/GrammatikView.js';
import { renderPronomenView } from './views/PronomenView.js';
import { renderGroundingView } from './views/GroundingView.js';
import { VerbumLearningView } from './views/VerbumLearningView.js';
import { appState, getLang, getTranslation, setLanguage } from './utils/i18n.js';

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
  } else if (viewTarget === 'du2_modul1') {
    appState.currentView = 'du2_modul1';
    renderDu2Mod1View(appDiv, navigate);
  } else if (viewTarget === 'smaa_historier') {
    appState.currentView = 'smaa_historier';
    renderSmaaHistorierView(appDiv, navigate);
  } else if (viewTarget === 'du2_modul5') {
    appState.currentView = 'du2_modul5';
    renderDu2Mod5View(appDiv, navigate);
  } else if (viewTarget === 'email_laan') {
    appState.currentView = 'email_laan';
    renderEmailLaanView(appDiv, navigate);
  } else if (viewTarget === 'opdragelse') {
    appState.currentView = 'opdragelse';
    renderOpdragelseView(appDiv, navigate);
  } else if (viewTarget === 'en_klage') {
    appState.currentView = 'en_klage';
    renderKlageView(appDiv, navigate);
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
  } else if (viewTarget === 'traen_tidsudtryk') {
    appState.currentView = 'traen_tidsudtryk';
    renderTraenTidsudtrykView(appDiv, navigate);
  } else if (viewTarget === 'lav_sporgsmal') {
    appState.currentView = 'lav_sporgsmal';
    renderLavSporgsmalView(appDiv, navigate);
  } else if (viewTarget === 'ordstilling') {
    appState.currentView = 'ordstilling';
    renderOrdstillingView(appDiv, navigate, extraData);
  } else if (viewTarget === 'traen_grammatik') {
    appState.currentView = 'traen_grammatik';
    renderGrammatikView(appDiv, navigate);
  } else if (viewTarget === 'pronomen') {
    appState.currentView = 'pronomen';
    renderPronomenView(appDiv, navigate);
  } else if (viewTarget === 'verbum_learning') {
    appState.currentView = 'verbum_learning';
    const view = new VerbumLearningView(navigate, extraData?.categoryId);
    appDiv.appendChild(view.render());
  } else if (viewTarget === 'grounding') {
    appState.currentView = 'grounding';
    renderGroundingView(appDiv, navigate);
  }
}

// Boot up
document.addEventListener('DOMContentLoaded', () => {
  if (!appState.lang) {
    navigate('language');
  } else {
    navigate('main');
  }
});
