import { renderOrdstillingAltIntroView } from './views/OrdstillingAltIntroView.js';
import { renderIdiomMadErMedicin, renderIdiomHjerterumHusrum, renderIdiomUglerIMosen, renderIdiomArmeneNed } from './views/TestPDFViews.js';
import './style.css';
import { baseUrl } from './utils/config.js';
export { baseUrl };
import { initGlobalLanguageSwitcher } from './components/GlobalLanguageSwitcher.js';
import { initSpotlightSearch } from './components/SpotlightSearch.js';
import { renderLanguageView } from './views/LanguageView.js';
import { renderMainView } from './views/MainView.js';
import { renderNotesView } from './views/NotesView.js';
import { renderDagensOpgaveView } from './views/DagensOpgaveView.js';
import { renderWordLearningView } from './views/WordLearningView.js';
import { renderTop100SubstantiverMenuView } from './views/Top100SubstantiverMenuView.js';
import { renderTop100VerberMenuView } from './views/Top100VerberMenuView.js';
import { renderTop100AdjektiverMenuView } from './views/Top100AdjektiverMenuView.js';
import { renderTop100AdverbierMenuView } from './views/Top100AdverbierMenuView.js';
import { renderAdverbierStedView } from './views/AdverbierStedView.js';
import { renderAdverbierTidView } from './views/AdverbierTidView.js';
import { renderAdverbierMaadeView } from './views/AdverbierMaadeView.js';
import { renderAdverbierGradView } from './views/AdverbierGradView.js';
import { renderAdverbierSmaaordView } from './views/AdverbierSmaaordView.js';
import { renderAdverbierHoldningView } from './views/AdverbierHoldningView.js';
import { renderAdverbierKonnektionView } from './views/AdverbierKonnektionView.js';
import { renderTopKonjunktionerMenuView } from './views/TopKonjunktionerMenuView.js';
import { renderKonjunktionerView } from './views/KonjunktionerView.js';
import { renderKonjunktionerAtView } from './views/KonjunktionerAtView.js';
import { renderKonjunktionerDaNaarView } from './views/KonjunktionerDaNaarView.js';
import { renderKonjunktionerSelvomAlligevelView } from './views/KonjunktionerSelvomAlligevelView.js';
import { renderKonjunktionerFordiDerforView } from './views/KonjunktionerFordiDerforView.js';
import { renderKonjunktionerTekstflowView } from './views/KonjunktionerTekstflowView.js';
import { renderAdjektiverFysikView } from './views/AdjektiverFysikView.js';
import { renderAdjektiverTidView } from './views/AdjektiverTidView.js';
import { renderAdjektiverKvalitetView } from './views/AdjektiverKvalitetView.js';
import { renderAdjektiverFolelserView } from './views/AdjektiverFolelserView.js';
import { renderAdjektiverTilstandeView } from './views/AdjektiverTilstandeView.js';
import { renderVerberByrumView } from './views/VerberByrumView.js';
import { renderVerberHjemView } from './views/VerberHjemView.js';
import { renderVerberStationView } from './views/VerberStationView.js';
import { renderVerberKlasseView } from './views/VerberKlasseView.js';
import { renderVerberParkView } from './views/VerberParkView.js';
import { renderByrummetView } from './views/ByrummetView.js';
import { renderKoekkenHjemmetView } from './views/KoekkenHjemmetView.js';
import { renderKlasseKontorView } from './views/KlasseKontorView.js';
import { renderNaturFritidView } from './views/NaturFritidView.js';
import { renderStationIndkoebView } from './views/StationIndkoebView.js';
import { renderSamtaleTraeningView } from './views/SamtaleTraeningView.js';
import { renderSamtaleBoligMenuView } from './views/SamtaleBoligMenuView.js';
import { renderSamtaleArbejdeMenuView } from './views/SamtaleArbejdeMenuView.js';
import { renderSamtaleSprogskoleMenuView } from './views/SamtaleSprogskoleMenuView.js';
import { renderAiConversationSprogskoleView } from './views/AiConversationSprogskoleView.js';
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
import { renderOrdstillingIntroView } from './views/OrdstillingIntroView.js';

import { renderGrammatikView } from './views/GrammatikView.js';
import { renderUdtaleView } from './views/UdtaleView.js';
import { renderUdtaleMenuView } from './views/UdtaleMenuView.js';
import { renderLegMedUdtaleView } from './views/LegMedUdtaleView.js';
import { renderInteractiveStoryView } from './views/InteractiveStoryView.js';
import { renderJobSamtaleStoryView } from './views/JobSamtaleStoryView.js';
import { renderJobWorkshopStoryView } from './views/JobWorkshopStoryView.js';
import { renderLaegeSamtaleStoryView } from './views/LaegeSamtaleStoryView.js';
import { renderLaegeWorkshopStoryView } from './views/LaegeWorkshopStoryView.js';
import { renderChefSamtaleStoryView } from './views/ChefSamtaleStoryView.js';
import { renderChefWorkshopStoryView } from './views/ChefWorkshopStoryView.js';
import { renderPraesenterWorkshopStoryView } from './views/PraesenterWorkshopStoryView.js';
import { renderDialogerUdtaleMenuView } from './views/DialogerUdtaleMenuView.js';
import { renderDialogerSygdomJobView } from './views/DialogerSygdomJobView.js';
import { renderBranchingStoryView } from './views/BranchingStoryView.js';
import { renderHistorierMenuView } from './views/HistorierMenuView.js';
import { renderHistorierSygdomJobView } from './views/HistorierSygdomJobView.js';
import { renderHCAndersenView } from './views/HCAndersenView.js';
import { renderSporgsmalInteractiveView } from './views/SporgsmalInteractiveView.js';
import { renderPronomenView } from './views/PronomenView.js';
import { renderGroundingView } from './views/GroundingView.js';
import { VerbumLearningView } from './views/VerbumLearningView.js';
import { renderBestemthedView } from './views/BestemthedView.js';
import { renderArtiklerView } from './views/ArtiklerView.js';
import { renderModalForceView } from './views/ModalForceView.js';
import { renderAdjectiveBridgeView } from './views/AdjectiveBridgeView.js';
import { renderAdverbBridgeView } from './views/AdverbBridgeView.js';
import { renderConjunctionBridgeView } from './views/ConjunctionBridgeView.js';
import { renderAdjectiveComparisonView } from './views/AdjectiveComparisonView.js';
import { renderVerbumMenuView } from './views/VerbumMenuView.js';
import { renderTrorSynesMenerView } from './views/TrorSynesMenerView.js';
import { renderPunktetOgBroenView } from './views/PunktetOgBroenView.js';
import { initAdverbChoiceExerciseView } from './views/AdverbChoiceExerciseView.js';
import { initAdverbDialogExerciseView } from './views/AdverbDialogExerciseView.js';
import { initConjunctionChoiceExerciseView } from './views/ConjunctionChoiceExerciseView.js';
import { renderDanskKulturView } from './views/DanskKulturView.js';
import { renderTalemaaderView } from './views/TalemaaderView.js';
import { renderTraenSporgsmalMenuView } from './views/TraenSporgsmalMenuView.js';
import { renderTraenSporgsmalTrackView } from './views/TraenSporgsmalTrackView.js';
import { renderHvBetydningView } from './views/HvBetydningView.js';
import { renderSporgsmalOrdstillingView } from './views/SporgsmalOrdstillingView.js';
import { renderLaesetraeningView } from './views/LaesetraeningView.js';
import { renderLegMedVokalerView } from './views/LegMedVokalerView.js';
import { renderDetDanskeStoedView } from './views/DetDanskeStoedView.js';
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
  } else if (viewTarget === 'top100_substantiver') {
    appState.currentView = 'top100_substantiver';
    renderTop100SubstantiverMenuView(appDiv, navigate);
  } else if (viewTarget === 'top100_verber') {
    appState.currentView = 'top100_verber';
    renderTop100VerberMenuView(appDiv, navigate);
  } else if (viewTarget === 'top100_adjektiver') {
    appState.currentView = 'top100_adjektiver';
    renderTop100AdjektiverMenuView(appDiv, navigate);
  } else if (viewTarget === 'top100_adverbier') {
    appState.currentView = 'top100_adverbier';
    renderTop100AdverbierMenuView(appDiv, navigate);
  } else if (viewTarget === 'adverbier_sted') {
    appState.currentView = 'adverbier_sted';
    renderAdverbierStedView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverbier_tid') {
    appState.currentView = 'adverbier_tid';
    renderAdverbierTidView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverbier_maade') {
    appState.currentView = 'adverbier_maade';
    renderAdverbierMaadeView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverbier_grad') {
    appState.currentView = 'adverbier_grad';
    renderAdverbierGradView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverbier_smaaord') {
    appState.currentView = 'adverbier_smaaord';
    renderAdverbierSmaaordView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverbier_holdning') {
    appState.currentView = 'adverbier_holdning';
    renderAdverbierHoldningView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverbier_konnektion') {
    appState.currentView = 'adverbier_konnektion';
    renderAdverbierKonnektionView(appDiv, navigate, extraData);
  } else if (viewTarget === 'top_konjunktioner') {
    appState.currentView = 'top_konjunktioner';
    renderTopKonjunktionerMenuView(appDiv, navigate, extraData);
  } else if (viewTarget === 'konjunktioner_all') {
    appState.currentView = 'konjunktioner_all';
    renderKonjunktionerView(appDiv, navigate, extraData);
  } else if (viewTarget === 'konjunktioner_at') {
    appState.currentView = 'konjunktioner_at';
    renderKonjunktionerAtView(appDiv, navigate, extraData);
  } else if (viewTarget === 'konjunktioner_da_naar') {
    appState.currentView = 'konjunktioner_da_naar';
    renderKonjunktionerDaNaarView(appDiv, navigate, extraData);
  } else if (viewTarget === 'konjunktioner_selvom_alligevel') {
    appState.currentView = 'konjunktioner_selvom_alligevel';
    renderKonjunktionerSelvomAlligevelView(appDiv, navigate, extraData);
  } else if (viewTarget === 'konjunktioner_fordi_derfor') {
    appState.currentView = 'konjunktioner_fordi_derfor';
    renderKonjunktionerFordiDerforView(appDiv, navigate, extraData);
  } else if (viewTarget === 'konjunktioner_tekstflow') {
    appState.currentView = 'konjunktioner_tekstflow';
    renderKonjunktionerTekstflowView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adjektiver_fysik') {
    appState.currentView = 'adjektiver_fysik';
    renderAdjektiverFysikView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adjektiver_tid') {
    appState.currentView = 'adjektiver_tid';
    renderAdjektiverTidView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adjektiver_kvalitet') {
    appState.currentView = 'adjektiver_kvalitet';
    renderAdjektiverKvalitetView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adjektiver_folelser') {
    appState.currentView = 'adjektiver_folelser';
    renderAdjektiverFolelserView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adjektiver_tilstande') {
    appState.currentView = 'adjektiver_tilstande';
    renderAdjektiverTilstandeView(appDiv, navigate, extraData);
  } else if (viewTarget === 'verber_byrum') {
    appState.currentView = 'verber_byrum';
    renderVerberByrumView(appDiv, navigate, extraData);
  } else if (viewTarget === 'verber_hjem') {
    appState.currentView = 'verber_hjem';
    renderVerberHjemView(appDiv, navigate, extraData);
  } else if (viewTarget === 'verber_klasse') {
    appState.currentView = 'verber_klasse';
    renderVerberKlasseView(appDiv, navigate, extraData);
  } else if (viewTarget === 'verber_park') {
    appState.currentView = 'verber_park';
    renderVerberParkView(appDiv, navigate, extraData);
  } else if (viewTarget === 'verber_station') {
    appState.currentView = 'verber_station';
    renderVerberStationView(appDiv, navigate, extraData);
  } else if (viewTarget === 'byrummet_vrimmel') {
    appState.currentView = 'byrummet_vrimmel';
    renderByrummetView(appDiv, navigate, extraData);
  } else if (viewTarget === 'koekken_hjemmet') {
    appState.currentView = 'koekken_hjemmet';
    renderKoekkenHjemmetView(appDiv, navigate, extraData);
  } else if (viewTarget === 'klasse_kontor') {
    appState.currentView = 'klasse_kontor';
    renderKlasseKontorView(appDiv, navigate, extraData);
  } else if (viewTarget === 'natur_fritid') {
    appState.currentView = 'natur_fritid';
    renderNaturFritidView(appDiv, navigate, extraData);
  } else if (viewTarget === 'station_indkoeb') {
    appState.currentView = 'station_indkoeb';
    renderStationIndkoebView(appDiv, navigate, extraData);
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
  } else if (viewTarget === 'samtale_sprogskole_menu') {
    appState.currentView = 'samtale_sprogskole_menu';
    renderSamtaleSprogskoleMenuView(appDiv, navigate);
  } else if (viewTarget === 'samtale_ai_sprogskole') {
    appState.currentView = 'samtale_ai_sprogskole';
    renderAiConversationSprogskoleView(appDiv, navigate, extraData);
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
    renderTraenTidsudtrykView(appDiv, navigate, extraData);
  } else if (viewTarget === 'lav_sporgsmal') {
    appState.currentView = 'lav_sporgsmal';
    renderLavSporgsmalView(appDiv, navigate);
  } else if (viewTarget === 'sporgsmal_interactive') {
    appState.currentView = 'sporgsmal_interactive';
    renderSporgsmalInteractiveView(appDiv, navigate, extraData);
  } else if (viewTarget === 'ordstilling') {
    appState.currentView = 'ordstilling';
    renderOrdstillingView(appDiv, navigate, extraData);
} else if (viewTarget === 'ordstilling_alt_intro') {
    appState.currentView = 'ordstilling_alt_intro';
    // extraData could hold the type, or we could pass subPath
    const type = extraData.subPath || 'tid';
    renderOrdstillingAltIntroView(appDiv, navigate, type);
  } else if (viewTarget === 'ordstilling_intro') {
    appState.currentView = 'ordstilling_intro';
    renderOrdstillingIntroView(appDiv, navigate, extraData);
  } else if (viewTarget === 'traen_grammatik') {
    appState.currentView = 'traen_grammatik';
    renderGrammatikView(appDiv, navigate, extraData);
  } else if (viewTarget === 'traen_udtale' || viewTarget === 'udtale_menu') {
    appState.currentView = 'traen_udtale';
    renderUdtaleMenuView(appDiv, navigate);
  } else if (viewTarget === 'traen_bogstaver') {
    appState.currentView = 'traen_bogstaver';
    renderUdtaleView(appDiv, navigate, extraData);
  } else if (viewTarget === 'laesetraening') {
    appState.currentView = 'laesetraening';
    renderLaesetraeningView(appDiv, navigate, extraData);
  } else if (viewTarget === 'leg_med_vokaler') {
    appState.currentView = 'leg_med_vokaler';
    renderLegMedVokalerView(appDiv, navigate, extraData);
  } else if (viewTarget === 'leg_med_udtale') {
    appState.currentView = 'leg_med_udtale';
    renderLegMedUdtaleView(appDiv, navigate);
  } else if (viewTarget === 'det_danske_stoed') {
    appState.currentView = 'det_danske_stoed';
    renderDetDanskeStoedView(appDiv, navigate);
  } else if (viewTarget === 'historier_menu') {
    appState.currentView = 'historier_menu';
    renderHistorierMenuView(appDiv, navigate);
  } else if (viewTarget === 'hc_andersen_eventyr' || viewTarget === 'hc_andersen_menu' || viewTarget === 'hc_andersen') {
    appState.currentView = 'hc_andersen_eventyr';
    renderHCAndersenView(appDiv, navigate, extraData);
  } else if (viewTarget === 'historier_sygdom_job') {
    appState.currentView = 'historier_sygdom_job';
    renderHistorierSygdomJobView(appDiv, navigate);
  } else if (viewTarget === 'interactive_story') {
    appState.currentView = 'interactive_story';
    renderInteractiveStoryView(appDiv, navigate);
  } else if (viewTarget === 'job_story') {
    appState.currentView = 'job_story';
    renderJobSamtaleStoryView(appDiv, navigate);
  } else if (viewTarget === 'laege_story') {
    appState.currentView = 'laege_story';
    renderLaegeSamtaleStoryView(appDiv, navigate);
  } else if (viewTarget === 'chef_story') {
    appState.currentView = 'chef_story';
    renderChefSamtaleStoryView(appDiv, navigate);
  } else if (viewTarget === 'dialoger_udtale') {
    appState.currentView = 'dialoger_udtale';
    renderDialogerUdtaleMenuView(appDiv, navigate);
  } else if (viewTarget === 'dialog_praesenter') {
    appState.currentView = 'dialog_praesenter';
    renderPraesenterWorkshopStoryView(appDiv, navigate);
  } else if (viewTarget === 'dialoger_sygdom_job') {
    appState.currentView = 'dialoger_sygdom_job';
    renderDialogerSygdomJobView(appDiv, navigate);
  } else if (viewTarget === 'dialog_laege') {
    appState.currentView = 'dialog_laege';
    renderLaegeWorkshopStoryView(appDiv, navigate);
  } else if (viewTarget === 'dialog_chef') {
    appState.currentView = 'dialog_chef';
    renderChefWorkshopStoryView(appDiv, navigate);
  } else if (viewTarget === 'dialog_job' || viewTarget === 'workshop_story' || viewTarget === 'workshop') {
    appState.currentView = 'dialog_job';
    renderJobWorkshopStoryView(appDiv, navigate);
  } else if (viewTarget === 'branching_story') {
    appState.currentView = 'branching_story';
    renderBranchingStoryView(appDiv, navigate, extraData);
  } else if (viewTarget === 'pronomen') {
    appState.currentView = 'pronomen';
    renderPronomenView(appDiv, navigate, extraData);
  } else if (viewTarget === 'verbum') {
    appState.currentView = 'top100_verber';
    renderTop100VerberMenuView(appDiv, navigate);
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
  } else if (viewTarget === 'adverbier_dialog') {
    appState.currentView = 'adverbier_dialog';
    renderPronomenView(appDiv, navigate, { viewMode: 'adverbier_dialog', ...extraData });
  } else if (viewTarget === 'konjunktioner') {
    appState.currentView = 'konjunktioner';
    renderPronomenView(appDiv, navigate, { viewMode: 'konjunktioner', ...extraData });
  } else if (viewTarget === 'verbum_learning') {
    appState.currentView = 'verbum_learning';
    const categoryId = extraData.subPath || extraData.categoryId;
    if (categoryId === 'datid_regelm' || categoryId === 'datid') {
      navigate('top100_verber', {}, true);
      return;
    }
    if (categoryId === 'tider' || categoryId === 'punktet_og_broen') {
      navigate('punktet_og_broen', {}, true);
      return;
    }
    const view = new VerbumLearningView(navigate, categoryId, extraData?.backView);
    appDiv.appendChild(view.render());
  } else if (viewTarget === 'verbum_menu') {
    appState.currentView = 'top100_verber';
    renderTop100VerberMenuView(appDiv, navigate);
  } else if (viewTarget === 'tror_synes_mener') {
    appState.currentView = 'tror_synes_mener';
    renderTrorSynesMenerView(appDiv, navigate, extraData);
  } else if (viewTarget === 'punktet_og_broen') {
    appState.currentView = 'punktet_og_broen';
    renderPunktetOgBroenView(appDiv, navigate, extraData);
  } else if (viewTarget === 'grounding') {
    appState.currentView = 'grounding';
    renderGroundingView(appDiv, navigate);
  } else if (viewTarget === 'bestemthed') {
    appState.currentView = 'bestemthed';
    renderBestemthedView(appDiv, navigate, extraData);
  } else if (viewTarget === 'artikler') {
    appState.currentView = 'artikler';
    renderArtiklerView(appDiv, navigate);
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
    renderAdjectiveComparisonView(appDiv, navigate, extraData);
  } else if (viewTarget === 'conjunction_choice') {
    appState.currentView = 'conjunction_choice';
    initConjunctionChoiceExerciseView(appDiv, navigate, extraData);
  } else if (viewTarget === 'adverb_choice') {
    appState.currentView = 'adverb_choice';
    initAdverbChoiceExerciseView(appDiv, navigate, extraData);
  } else if (viewTarget === 'traen_sporgsmal_menu') {
    appState.currentView = 'traen_sporgsmal_menu';
    renderTraenSporgsmalMenuView(appDiv, navigate);
  } else if (viewTarget === 'traen_sporgsmal_track') {
    appState.currentView = 'traen_sporgsmal_track';
    renderTraenSporgsmalTrackView(appDiv, navigate, extraData);
  } else if (viewTarget === 'sporgsmal_hv_betydning') {
    appState.currentView = 'traen_sporgsmal_track';
    renderTraenSporgsmalTrackView(appDiv, navigate, { trackId: 'anna', initialTab: 1 });
  } else if (viewTarget === 'sporgsmal_ordstilling') {
    appState.currentView = 'traen_sporgsmal_track';
    renderTraenSporgsmalTrackView(appDiv, navigate, { trackId: 'anna', initialTab: 3 });
  } else if (viewTarget === 'idiom_hjerterum') {
    appState.currentView = 'idiom_hjerterum';
    renderIdiomHjerterumHusrum(appDiv, navigate);
  } else if (viewTarget === 'idiom_ugler_i_mosen') {
    appState.currentView = 'idiom_ugler_i_mosen';
    renderIdiomUglerIMosen(appDiv, navigate);
  } else if (viewTarget === 'idiom_armene_ned') {
    appState.currentView = 'idiom_armene_ned';
    renderIdiomArmeneNed(appDiv, navigate);
  } else if (viewTarget === 'idiom_mader_medicin') {
    appState.currentView = 'idiom_mader_medicin';
    renderIdiomMadErMedicin(appDiv, navigate);
  } else {
    // Fallback: If an unknown target is requested, avoid a blank page and navigate to main
    console.warn(`Ukendt viewTarget: ${viewTarget}, omdirigerer til hovedmenuen ('main')`);
    appState.currentView = 'main';
    renderMainView(appDiv, navigate);
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
function boot() {
  initGlobalLanguageSwitcher();
  initSpotlightSearch(navigate);
  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('popstate', handleRouting);
  handleRouting();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (let name of names)
      caches.delete(name);
  });
}

// Cache buster Fri Oct 16 23:06:00 CEST 2026
console.log('App version: Fri Oct 16 23:06:00 CEST 2026');
