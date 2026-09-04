import './style.css';
import { baseUrl } from './utils/config.js';
export { baseUrl };
import { renderLanguageView } from './views/LanguageView.js';
import { renderMainView } from './views/MainView.js';
import { renderNotesView } from './views/NotesView.js';
import { renderDagensOpgaveView } from './views/DagensOpgaveView.js';
import { renderWordLearningView } from './views/WordLearningView.js';
import { renderSamtaleTraeningView } from './views/SamtaleTraeningView.js';
import { renderSamtaleBoligMenuView } from './views/SamtaleBoligMenuView.js';
import { renderSamtaleArbejdeMenuView } from './views/SamtaleArbejdeMenuView.js';
import { renderHverdagssamtaleView } from './views/HverdagssamtaleView.js';
import { renderAiConversationView } from './views/AiConversationView.js';
import { renderAiConversationArbejdeView } from './views/AiConversationArbejdeView.js';
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
import { renderUdtaleView } from './views/UdtaleView.js';
import { renderUdtaleMenuView } from './views/UdtaleMenuView.js';
import { renderLegMedUdtaleView } from './views/LegMedUdtaleView.js';
import { renderInteractiveStoryView } from './views/InteractiveStoryView.js';
import { renderBranchingStoryView } from './views/BranchingStoryView.js';
import { renderHistorierMenuView } from './views/HistorierMenuView.js';
import { renderSporgsmalInteractiveView } from './views/SporgsmalInteractiveView.js';
import { renderPronomenView } from './views/PronomenView.js';
import { renderGroundingView } from './views/GroundingView.js';
import { VerbumLearningView } from './views/VerbumLearningView.js';
import { renderBestemthedView } from './views/BestemthedView.js';
import { renderModalForceView } from './views/ModalForceView.js';
import { renderAdjectiveBridgeView } from './views/AdjectiveBridgeView.js';
import { renderAdverbBridgeView } from './views/AdverbBridgeView.js';
import { renderConjunctionBridgeView } from './views/ConjunctionBridgeView.js';
import { renderAdjectiveComparisonView } from './views/AdjectiveComparisonView.js';
import { renderVerbumMenuView } from './views/VerbumMenuView.js';
import { initAdverbChoiceExerciseView } from './views/AdverbChoiceExerciseView.js';
import { initConjunctionChoiceExerciseView } from './views/ConjunctionChoiceExerciseView.js';
import { renderDanskKulturView } from './views/DanskKulturView.js';
import { renderTalemaaderView } from './views/TalemaaderView.js';
import { renderTraenSporgsmalMenuView } from './views/TraenSporgsmalMenuView.js';
import { renderHvBetydningView } from './views/HvBetydningView.js';
import { renderSporgsmalOrdstillingView } from './views/SporgsmalOrdstillingView.js';
import { appState, getLang, getTranslation, setLanguage, translations } from './utils/i18n.js';

// Router
export function navigate(viewTarget, extraData = {}, skipHashUpdate = false) {
  const appDiv = document.querySelector('#app');
  appDiv.innerHTML = ''; // Clear current view

  const lang = appState.lang || getLang();

  if (!skipHashUpdate) {
    let hash = `#/${lang}/${viewTarget}`;
    // handle nested paths from extraData.subPath if present
    if (extraData.subPath) {
      hash += `/${extraData.subPath}`;
    }
    // handle other params
    const otherParams = { ...extraData };
    delete otherParams.subPath;
    if (Object.keys(otherParams).length > 0) {
      const params = new URLSearchParams(otherParams);
      hash += '?' + params.toString();
    }
    window.location.hash = hash;
  }

  // Define components that need extraData or segments
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
  } else if (viewTarget === 'dansk_kultur') {
    appState.currentView = 'dansk_kultur';
    renderDanskKulturView(appDiv, navigate);
  } else if (viewTarget === 'talemaader') {
    appState.currentView = 'talemaader';
    renderTalemaaderView(appDiv, navigate, extraData);
  } else if (viewTarget === 'samtale_traening') {
    appState.currentView = 'samtale_traening';
    renderSamtaleTraeningView(appDiv, navigate);
  } else if (viewTarget === 'samtale_hverdag') {
    appState.currentView = 'samtale_hverdag';
    renderHverdagssamtaleView(appDiv, navigate, extraData);
  } else if (viewTarget === 'samtale_bolig_menu') {
    appState.currentView = 'samtale_bolig_menu';
    renderSamtaleBoligMenuView(appDiv, navigate);
  } else if (viewTarget === 'samtale_ai') {
    appState.currentView = 'samtale_ai';
    renderAiConversationView(appDiv, navigate, extraData);
  } else if (viewTarget === 'samtale_arbejde_menu') {
    appState.currentView = 'samtale_arbejde_menu';
    renderSamtaleArbejdeMenuView(appDiv, navigate);
  } else if (viewTarget === 'samtale_ai_arbejde') {
    appState.currentView = 'samtale_ai_arbejde';
    renderAiConversationArbejdeView(appDiv, navigate, extraData);
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
  } else if (viewTarget === 'sporgsmal_interactive') {
    appState.currentView = 'sporgsmal_interactive';
    renderSporgsmalInteractiveView(appDiv, navigate, extraData);
  } else if (viewTarget === 'ordstilling') {
    appState.currentView = 'ordstilling';
    renderOrdstillingView(appDiv, navigate, extraData);
  } else if (viewTarget === 'traen_grammatik') {
    appState.currentView = 'traen_grammatik';
    renderGrammatikView(appDiv, navigate, extraData);
  } else if (viewTarget === 'traen_udtale') {
    appState.currentView = 'traen_udtale';
    renderUdtaleMenuView(appDiv, navigate);
  } else if (viewTarget === 'traen_bogstaver') {
    appState.currentView = 'traen_bogstaver';
    renderUdtaleView(appDiv, navigate, extraData);
  } else if (viewTarget === 'leg_med_udtale') {
    appState.currentView = 'leg_med_udtale';
    renderLegMedUdtaleView(appDiv, navigate);
  } else if (viewTarget === 'historier_menu') {
    appState.currentView = 'historier_menu';
    renderHistorierMenuView(appDiv, navigate);
  } else if (viewTarget === 'interactive_story') {
    appState.currentView = 'interactive_story';
    renderInteractiveStoryView(appDiv, navigate);
  } else if (viewTarget === 'branching_story') {
    appState.currentView = 'branching_story';
    renderBranchingStoryView(appDiv, navigate, extraData);
  } else if (viewTarget === 'pronomen') {
    appState.currentView = 'pronomen';
    renderPronomenView(appDiv, navigate, extraData);
  } else if (viewTarget === 'verbum') {
    appState.currentView = 'verbum';
    renderPronomenView(appDiv, navigate, { category: 'verbum', ...extraData });
  } else if (viewTarget === 'pronominer_subjekt') {
    appState.currentView = 'pronominer_subjekt';
    renderPronomenView(appDiv, navigate, { viewMode: 'subjekt', ...extraData });
  } else if (viewTarget === 'pronominer_objekt') {
    appState.currentView = 'pronominer_objekt';
    renderPronomenView(appDiv, navigate, { viewMode: 'objekt', ...extraData });
  } else if (viewTarget === 'pronominer_possessiv') {
    appState.currentView = 'pronominer_possessiv';
    renderPronomenView(appDiv, navigate, { viewMode: 'possessiv', ...extraData });
  } else if (viewTarget === 'pronominer_refleksiv') {
    appState.currentView = 'pronominer_refleksiv';
    renderPronomenView(appDiv, navigate, { viewMode: 'refleksiv', ...extraData });
  } else if (viewTarget === 'der_er_det_er') {
    appState.currentView = 'der_er_det_er';
    renderPronomenView(appDiv, navigate, { viewMode: 'der_er_det_er', ...extraData });
  } else if (viewTarget === 'adverbier') {
    appState.currentView = 'adverbier';
    renderPronomenView(appDiv, navigate, { viewMode: 'adverbier', ...extraData });
  } else if (viewTarget === 'konjunktioner') {
    appState.currentView = 'konjunktioner';
    renderPronomenView(appDiv, navigate, { viewMode: 'konjunktioner', ...extraData });
  } else if (viewTarget === 'verbum_learning') {
    appState.currentView = 'verbum_learning';
    const categoryId = extraData.subPath || extraData.categoryId;
    const view = new VerbumLearningView(navigate, categoryId, extraData?.backView);
    appDiv.appendChild(view.render());
  } else if (viewTarget === 'verbum_menu') {
    appState.currentView = 'verbum_menu';
    renderVerbumMenuView(appDiv, navigate);
  } else if (viewTarget === 'grounding') {
    appState.currentView = 'grounding';
    renderGroundingView(appDiv, navigate);
  } else if (viewTarget === 'bestemthed') {
    appState.currentView = 'bestemthed';
    renderBestemthedView(appDiv, navigate);
  } else if (viewTarget === 'modal_force') {
    appState.currentView = 'modal_force';
    renderModalForceView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adjective_bridge') {
    appState.currentView = 'adjective_bridge';
    renderAdjectiveBridgeView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverb_bridge') {
    appState.currentView = 'adverb_bridge';
    renderAdverbBridgeView(appDiv, navigate, extraData);
  } else if (viewTarget === 'conjunction_bridge') {
    appState.currentView = 'conjunction_bridge';
    renderConjunctionBridgeView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adjective_comparison') {
    appState.currentView = 'adjective_comparison';
    renderAdjectiveComparisonView(appDiv, navigate);
  } else if (viewTarget === 'conjunction_choice') {
    appState.currentView = 'conjunction_choice';
    initConjunctionChoiceExerciseView(appDiv);
  } else if (viewTarget === 'adverb_choice') {
    appState.currentView = 'adverb_choice';
    initAdverbChoiceExerciseView(appDiv);
  } else if (viewTarget === 'traen_sporgsmal_menu') {
    appState.currentView = 'traen_sporgsmal_menu';
    renderTraenSporgsmalMenuView(appDiv, navigate);
  } else if (viewTarget === 'sporgsmal_hv_betydning') {
    appState.currentView = 'sporgsmal_hv_betydning';
    renderHvBetydningView(appDiv, navigate);
  } else if (viewTarget === 'sporgsmal_ordstilling') {
    appState.currentView = 'sporgsmal_ordstilling';
    renderSporgsmalOrdstillingView(appDiv, navigate);
  }
}

// Handle routing from hash
function handleRouting() {
  const hash = window.location.hash.replace(/^#\//, '');
  const [pathPart, queryString] = hash.split('?');
  const segments = pathPart.split('/').filter(s => s !== '');

  const extraData = {};
  if (queryString) {
    const params = new URLSearchParams(queryString);
    for (const [key, value] of params.entries()) {
      extraData[key] = value;
    }
  }

  // Segment 0: Language
  // Segment 1: View Target
  // Segment 2+: Sub-paths
  const lang = segments[0];
  const viewTarget = segments[1];
  const subPath = segments.slice(2).join('/');

  if (lang && translations[lang]) {
    setLanguage(lang);
    if (viewTarget) {
      if (subPath) extraData.subPath = subPath;
      navigate(viewTarget, extraData, true);
    } else {
      navigate('main', {}, false); // Redirect to #/da/main
    }
  } else {
    // Initial load: redirect to current lang or default
    const currentLang = localStorage.getItem('appLang') || 'da';
    window.location.hash = `#/${currentLang}/main`;
  }
}

// Boot up
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('hashchange', handleRouting);
  handleRouting();
});
