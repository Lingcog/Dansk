import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderSporgsmalInteractiveView(container, navigateFn, extraData) {
    const storyId = extraData && extraData.storyId ? extraData.storyId : 'anna';
    const lsKey = `sporgsmal_progress_${storyId}`;
    const t = (key, fallback) => getTranslation(key) || fallback;

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sporgsmal-interactive-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('lav_sporgsmal');
    topBar.appendChild(backBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'back-btn';
    resetBtn.style.color = '#ff5e5b';
    resetBtn.innerHTML = t('sporgsmal_start_forfra', '↻ Start forfra');
    resetBtn.onclick = () => {
        if(confirm(t('sporgsmal_start_forfra_confirm', 'Er du sikker på, at du vil starte historien forfra?'))) {
            localStorage.removeItem(lsKey);
            currentStepIndex = 0;
            appState.currentPhase = 'trps';
            renderStory();
        }
    };
    resetBtn.style.display = 'block'; // Always visible here
    topBar.appendChild(resetBtn);

    viewContainer.appendChild(topBar);

    // Progress Tracker Container
    const progressTracker = document.createElement('div');
    progressTracker.className = 'progress-tracker';
    viewContainer.appendChild(progressTracker);

    let currentStepIndex = parseInt(localStorage.getItem(lsKey) || '0', 10);
    
    // Will be populated after name is known
    let storyData = [];

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    function initStoryData() {
        if (storyId === 'sara') {
            storyData = [
                { type: 'narrative', text: t('sara_sit_1', '📍 Situation 1: Saras fødselsdag begynder kl. 18 på lørdag.'), image: 'assets/sara_time_18.png' },
                { type: 'user_action', 
                  trps: t('sara_trps_1_hv', 'Spørg om tidspunktet.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvornår', 'begynder', 'fødselsdagen?'] },
                  pronunciation: { target: 'Hvornår begynder fødselsdagen?', alternatives: ['Hvornår starter fødselsdagen', 'Hvornår begynder Saras fødselsdag', 'Hvornår starter Saras fødselsdag', 'Hvornår starter fødselsdagen på lørdag', 'Hvornår begynder Saras fødselsdag på lørdag', 'Hvornår starter Saras fødselsdag på lørdag'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('sara_trps_1_jn', 'Nu et ja/nej-spørgsmål: Spørg om den begynder kl. 18.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Begynder', 'fødselsdagen', 'klokken', '18?'] },
                  pronunciation: { target: 'Begynder fødselsdagen klokken 18?', alternatives: ['Starter fødselsdagen klokken 18', 'Begynder den klokken 18', 'Starter den klokken 18', 'Starter fødselsdagen klokken 18 på lørdag', 'Begynder den klokken 18 på lørdag', 'Starter den klokken 18 på lørdag'], focus: [] }
                },
                
                { type: 'narrative', text: t('sara_sit_2', '📍 Situation 2: Sara inviterer familie og venner.'), image: 'assets/sara_friends.png' },
                { type: 'user_action', 
                  trps: t('sara_trps_2_hv', 'Spørg om gæsterne.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvem', 'inviterer', 'Sara?'] },
                  pronunciation: { target: 'Hvem inviterer Sara?', alternatives: ['Hvem inviterer hun'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('sara_trps_2_jn', 'Spørg om hun inviterer familie og venner.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Inviterer', 'Sara', 'familie', 'og', 'venner?'] },
                  pronunciation: { target: 'Inviterer Sara familie og venner?', alternatives: ['Inviterer hun familie og venner'], focus: [] }
                },
                
                { type: 'narrative', text: t('sara_sit_3', '📍 Situation 3: Sara vil have en ny telefon.'), image: 'assets/sara_phone.png' },
                { type: 'user_action', 
                  trps: t('sara_trps_3_hv', 'Spørg om gaven.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'vil', 'Sara', 'have?'] },
                  pronunciation: { target: 'Hvad vil Sara have?', alternatives: ['Hvad vil hun have', 'Hvad ønsker Sara sig', 'Hvad ønsker hun sig'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('sara_trps_3_jn', 'Spørg om hun vil have en ny telefon.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Vil', 'Sara', 'have', 'en', 'ny', 'telefon?'] },
                  pronunciation: { target: 'Vil Sara have en ny telefon?', alternatives: ['Vil hun have en ny telefon', 'Ønsker Sara sig en ny telefon', 'Ønsker hun sig en ny telefon'], focus: [] }
                },
                
                { type: 'narrative', text: t('sara_sit_4', '📍 Situation 4: Sara serverer kage.'), image: 'assets/sara_cake.png' },
                { type: 'user_action', 
                  trps: t('sara_trps_4_hv', 'Spørg om maden.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'serverer', 'Sara?'] },
                  pronunciation: { target: 'Hvad serverer Sara?', alternatives: ['Hvad serverer hun', 'Hvad laver Sara', 'Hvad bager Sara'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('sara_trps_4_jn', 'Spørg om hun serverer kage.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Serverer', 'Sara', 'kage?'] },
                  pronunciation: { target: 'Serverer Sara kage?', alternatives: ['Serverer hun kage', 'Bager Sara kage'], focus: [] }
                },
                
                { type: 'narrative', text: t('sara_sit_5', '📍 Situation 5: Sara holder fødselsdag i lejligheden.'), image: 'assets/sara_apartment.png' },
                { type: 'user_action', 
                  trps: t('sara_trps_5_hv', 'Spørg om lokationen.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'holder', 'Sara', 'fødselsdag?'] },
                  pronunciation: { target: 'Hvor holder Sara fødselsdag?', alternatives: ['Hvor holder hun fødselsdag', 'Hvor er fødselsdagen'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('sara_trps_5_jn', 'Spørg om hun holder fødselsdag i lejligheden.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Holder', 'Sara', 'fødselsdag', 'i', 'lejligheden?'] },
                  pronunciation: { target: 'Holder Sara fødselsdag i lejligheden?', alternatives: ['Holder hun fødselsdag i lejligheden'], focus: [] }
                },

                { type: 'narrative', text: t('sara_sit_6', '📍 Situation 6: Sara elsker musik.'), image: 'assets/sara_music.png' },
                { type: 'user_action', 
                  trps: t('sara_trps_6_hv', 'Spørg om musikken.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'elsker', 'Sara?'] },
                  pronunciation: { target: 'Hvad elsker Sara?', alternatives: ['Hvad elsker hun'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('sara_trps_6_jn', 'Spørg om hun elsker musik.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Elsker', 'Sara', 'musik?'] },
                  pronunciation: { target: 'Elsker Sara musik?', alternatives: ['Elsker hun musik'], focus: [] }
                },

                { type: 'narrative', text: t('sara_sit_7', '📍 Situation 7: Fødselsdagen slutter kl. 23.'), image: 'assets/sara_time_23.png' },
                { type: 'user_action', 
                  trps: t('sara_trps_7_hv', 'Spørg om afslutningen.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvornår', 'slutter', 'fødselsdagen?'] },
                  pronunciation: { target: 'Hvornår slutter fødselsdagen?', alternatives: ['Hvornår slutter den'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('sara_trps_7_jn', 'Spørg om den slutter kl. 23.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Slutter', 'fødselsdagen', 'klokken', '23?'] },
                  pronunciation: { target: 'Slutter fødselsdagen klokken 23?', alternatives: ['Slutter den klokken 23'], focus: [] }
                },
                
                { type: 'narrative', text: t('sara_success', '🏆 Godt gået! Du har nu trænet både Hv-spørgsmål og Ja/Nej-spørgsmål om Saras fødselsdag!') }
            ];
            return;
        }

        if (storyId === 'lars') {
            storyData = [
                { type: 'narrative', text: t('lars_sit_1', '📍 Situation 1: Lars er kok.'), image: 'assets/lars_kok.png' },
                { type: 'user_action', 
                  trps: t('lars_trps_1_hv', 'Spørg om hans job.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'arbejder', 'Lars', 'som?'] },
                  pronunciation: { target: 'Hvad arbejder Lars som?', alternatives: ['Hvad laver Lars', 'Hvad er Lars', 'Hvad er hans job', 'Hvad arbejder han som', 'Hvad laver han'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('lars_trps_1_jn', 'Nu et ja/nej-spørgsmål: Spørg om han er kok.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Er', 'Lars', 'kok?'] },
                  pronunciation: { target: 'Er Lars kok?', alternatives: ['Er han kok', 'Arbejder Lars som kok', 'Arbejder han som kok', 'Er hans job kok'], focus: [] }
                },
                
                { type: 'narrative', text: t('lars_sit_2', '📍 Situation 2: Lars har 2 børn.'), image: 'assets/lars_born.png' },
                { type: 'user_action', 
                  trps: t('lars_trps_2_hv', 'Spørg om hans børn.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'mange', 'børn', 'har', 'Lars?'] },
                  pronunciation: { target: 'Hvor mange børn har Lars?', alternatives: ['Hvor mange børn har han', 'Hvor mange børn har familien'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('lars_trps_2_jn', 'Spørg om han har to børn.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Har', 'Lars', 'to', 'børn?'] },
                  pronunciation: { target: 'Har Lars to børn?', alternatives: ['Har han to børn', 'Har Lars 2 børn', 'Har han 2 børn'], focus: [] }
                },
                
                { type: 'narrative', text: t('lars_sit_3', '📍 Situation 3: Lars\' søn er 12 år og datter er 10 år.'), image: 'assets/lars_born_alder.png' },
                { type: 'user_action', 
                  trps: t('lars_trps_3_hv', 'Spørg om alderen.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'gamle', 'er', 'Lars\'', 'børn?'] },
                  pronunciation: { target: 'Hvor gamle er Lars børn?', alternatives: ['Hvor gamle er hans børn', 'Hvor gammel er Lars søn', 'Hvor gammel er hans søn', 'Hvor gammel er hans datter', 'Hvor gammel er Lars datter'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('lars_trps_3_jn', 'Spørg om hans søn er 12 år.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Er', 'hans', 'søn', '12', 'år?'] },
                  pronunciation: { target: 'Er hans søn 12 år?', alternatives: ['Er Lars søn 12 år', 'Er hans søn tolv år', 'Er Lars søn tolv år', 'Er hans datter 10 år', 'Er Lars datter 10 år', 'Er hans datter ti år'], focus: [] }
                },
                
                { type: 'narrative', text: t('lars_sit_4', '📍 Situation 4: Lars bor i Farum med sin familie.'), image: 'assets/lars_hus.png' },
                { type: 'user_action', 
                  trps: t('lars_trps_4_hv', 'Spørg om lokationen.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'bor', 'Lars?'] },
                  pronunciation: { target: 'Hvor bor Lars?', alternatives: ['Hvor bor han', 'Hvor bor Lars henne', 'Hvor bor han henne', 'I hvilken by bor Lars'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('lars_trps_4_jn', 'Spørg om han bor i Farum.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Bor', 'Lars', 'i', 'Farum?'] },
                  pronunciation: { target: 'Bor Lars i Farum?', alternatives: ['Bor han i Farum', 'Bor Lars og hans familie i Farum', 'Bor familien i Farum'], focus: [] }
                },
                
                { type: 'narrative', text: t('lars_sit_5', '📍 Situation 5: Lars besøger sine forældre 1 gang om ugen.'), image: 'assets/lars_foraeldre.png' },
                { type: 'user_action', 
                  trps: t('lars_trps_5_hv', 'Spørg om frekvensen for besøg.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'ofte', 'besøger', 'Lars', 'sine', 'forældre?'] },
                  pronunciation: { target: 'Hvor ofte besøger Lars sine forældre?', alternatives: ['Hvor ofte besøger han sine forældre', 'Hvor tit besøger Lars sine forældre', 'Hvor tit besøger han sine forældre'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('lars_trps_5_jn', 'Spørg om han besøger sine forældre en gang om ugen.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Besøger', 'Lars', 'sine', 'forældre', 'en', 'gang', 'om', 'ugen?'] },
                  pronunciation: { target: 'Besøger Lars sine forældre en gang om ugen?', alternatives: ['Besøger han sine forældre en gang om ugen', 'Besøger Lars sine forældre 1 gang om ugen', 'Besøger han sine forældre 1 gang om ugen', 'Besøger han dem en gang om ugen', 'Besøger han dem 1 gang om ugen'], focus: [] }
                },
                
                { type: 'narrative', text: t('lars_sit_6', '📍 Situation 6: Lars ringer til sine forældre hver dag.'), image: 'assets/lars_telefon.png' },
                { type: 'user_action', 
                  trps: t('lars_trps_6_hv', 'Spørg om opkald.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvem', 'ringer', 'Lars', 'til', 'hver', 'dag?'] },
                  pronunciation: { target: 'Hvem ringer Lars til hver dag?', alternatives: ['Hvor ofte ringer Lars til sine forældre', 'Hvem ringer han til hver dag', 'Hvem ringer han til', 'Hvor tit ringer Lars til sine forældre', 'Hvor ofte ringer han til sine forældre'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('lars_trps_6_jn', 'Spørg om han ringer hver dag.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Ringer', 'Lars', 'til', 'sine', 'forældre', 'hver', 'dag?'] },
                  pronunciation: { target: 'Ringer Lars til sine forældre hver dag?', alternatives: ['Ringer han til sine forældre hver dag', 'Ringer Lars til dem hver dag', 'Ringer han til dem hver dag', 'Ringer han hver dag'], focus: [] }
                },
                
                { type: 'narrative', text: t('lars_sit_7', '📍 Situation 7: Lars\' familie spiser aftensmad sammen hver dag.'), image: 'assets/lars_aftensmad.png' },
                { type: 'user_action', 
                  trps: t('lars_trps_7_hv', 'Spørg om middagen.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvornår', 'spiser', 'Lars\'', 'familie', 'aftensmad', 'sammen?'] },
                  pronunciation: { target: 'Hvornår spiser Lars familie aftensmad sammen?', alternatives: ['Hvor ofte spiser Lars familie aftensmad sammen', 'Hvornår spiser de aftensmad sammen', 'Hvor tit spiser Lars familie aftensmad sammen', 'Hvor ofte spiser de aftensmad sammen', 'Hvor tit spiser de aftensmad sammen'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('lars_trps_7_jn', 'Spørg om de spiser aftensmad sammen hver dag.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Spiser', 'de', 'aftensmad', 'sammen', 'hver', 'dag?'] },
                  pronunciation: { target: 'Spiser de aftensmad sammen hver dag?', alternatives: ['Spiser Lars familie aftensmad sammen hver dag', 'Spiser familien aftensmad sammen hver dag', 'Spiser de sammen hver dag'], focus: [] }
                },
                
                { type: 'narrative', text: t('lars_success', '🏆 Godt gået! Du har nu trænet spørgsmål om familie, arbejde og dagligdag!') }
            ];
            return;
        }

        if (storyId === 'jonas') {
            storyData = [
                { type: 'narrative', text: t('jonas_sit_1', '📍 Situation 1: Jonas spiser brød og drikker kaffe til morgenmad.'), image: 'assets/jonas_portrait.png' },
                { type: 'user_action', 
                  trps: t('jonas_trps_1_hv', 'Spørg om hans morgenmad.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'spiser', 'Jonas', 'til', 'morgenmad?'] },
                  pronunciation: { target: 'Hvad spiser Jonas til morgenmad?', alternatives: ['Hvad får Jonas til morgenmad', 'Hvad drikker Jonas til morgenmad', 'Hvad får han til morgenmad', 'Hvad spiser han til morgenmad'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('jonas_trps_1_jn', 'Nu et ja/nej-spørgsmål: Spørg om han spiser brød og kaffe.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Spiser', 'Jonas', 'brød', 'og', 'kaffe?'] },
                  pronunciation: { target: 'Spiser Jonas brød og kaffe?', alternatives: ['Får Jonas brød og kaffe', 'Får han brød og kaffe til morgenmad', 'Spiser han brød og kaffe'], focus: [] }
                },
                
                { type: 'narrative', text: t('jonas_sit_2', '📍 Situation 2: Jonas spiser en sandwich til frokost.'), image: 'assets/jonas_portrait.png' },
                { type: 'user_action', 
                  trps: t('jonas_trps_2_hv', 'Spørg om hans frokost.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'spiser', 'Jonas', 'til', 'frokost?'] },
                  pronunciation: { target: 'Hvad spiser Jonas til frokost?', alternatives: ['Hvad får Jonas til frokost', 'Hvad spiser han til frokost', 'Hvad får han til frokost'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('jonas_trps_2_jn', 'Spørg om han spiser en sandwich.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Spiser', 'Jonas', 'en', 'sandwich?'] },
                  pronunciation: { target: 'Spiser Jonas en sandwich?', alternatives: ['Får Jonas en sandwich', 'Spiser han en sandwich til frokost', 'Spiser han en sandwich', 'Får han en sandwich'], focus: [] }
                },
                
                { type: 'narrative', text: t('jonas_sit_3', '📍 Situation 3: Jonas kan godt lide suppe.'), image: 'assets/jonas_portrait.png' },
                { type: 'user_action', 
                  trps: t('jonas_trps_3_hv', 'Spørg ind til hvad han kan lide.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'kan', 'Jonas', 'godt', 'lide?'] },
                  pronunciation: { target: 'Hvad kan Jonas godt lide?', alternatives: ['Hvad kan han godt lide', 'Hvad lide Jonas', 'Hvad kan Jonas lide', 'Hvad kan han lide'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('jonas_trps_3_jn', 'Spørg om han kan lide suppe.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Kan', 'Jonas', 'godt', 'lide', 'suppe?'] },
                  pronunciation: { target: 'Kan Jonas godt lide suppe?', alternatives: ['Kan han godt lide suppe', 'Kan Jonas lide suppe', 'Kan han lide suppe'], focus: [] }
                },
                
                { type: 'narrative', text: t('jonas_sit_4', '📍 Situation 4: Jonas drikker mælk.'), image: 'assets/jonas_portrait.png' },
                { type: 'user_action', 
                  trps: t('jonas_trps_4_hv', 'Spørg om hvad han drikker.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'drikker', 'Jonas?'] },
                  pronunciation: { target: 'Hvad drikker Jonas?', alternatives: ['Hvad drikker han'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('jonas_trps_4_jn', 'Spørg om han drikker mælk.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Drikker', 'Jonas', 'mælk?'] },
                  pronunciation: { target: 'Drikker Jonas mælk?', alternatives: ['Drikker han mælk'], focus: [] }
                },
                
                { type: 'narrative', text: t('jonas_sit_5', '📍 Situation 5: Jonas spiser frugt hver dag.'), image: 'assets/jonas_portrait.png' },
                { type: 'user_action', 
                  trps: t('jonas_trps_5_hv', 'Spørg om frekvensen (hvor ofte).'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'ofte', 'spiser', 'Jonas', 'frugt?'] },
                  pronunciation: { target: 'Hvor ofte spiser Jonas frugt?', alternatives: ['Hvor tit spiser Jonas frugt', 'Hvor tit spiser han frugt', 'Hvor ofte spiser han frugt'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('jonas_trps_5_jn', 'Spørg om han spiser frugt hver dag.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Spiser', 'Jonas', 'frugt', 'hver', 'dag?'] },
                  pronunciation: { target: 'Spiser Jonas frugt hver dag?', alternatives: ['Spiser han frugt hver dag'], focus: [] }
                },
                
                { type: 'narrative', text: t('jonas_sit_6', '📍 Situation 6: Jonas spiser en burger i weekenden.'), image: 'assets/jonas_portrait.png' },
                { type: 'user_action', 
                  trps: t('jonas_trps_6_hv', 'Spørg om tidspunktet.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvornår', 'spiser', 'Jonas', 'en', 'burger?'] },
                  pronunciation: { target: 'Hvornår spiser Jonas en burger?', alternatives: ['Hvornår spiser han en burger', 'Hvornår får Jonas en burger', 'Hvornår får han en burger'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('jonas_trps_6_jn', 'Spørg om han spiser en burger i weekenden.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Spiser', 'Jonas', 'en', 'burger', 'i', 'weekenden?'] },
                  pronunciation: { target: 'Spiser Jonas en burger i weekenden?', alternatives: ['Spiser han en burger i weekenden', 'Får Jonas en burger i weekenden', 'Får han en burger i weekenden'], focus: [] }
                },
                
                { type: 'narrative', text: t('jonas_sit_7', '📍 Situation 7: Jonas køber ind i LIDL.'), image: 'assets/jonas_portrait.png' },
                { type: 'user_action', 
                  trps: t('jonas_trps_7_hv', 'Spørg om stedet.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'køber', 'Jonas', 'ind?'] },
                  pronunciation: { target: 'Hvor køber Jonas ind?', alternatives: ['Hvor køber han ind', 'Hvor handler Jonas', 'Hvor handler han'], focus: [] }
                },
                { type: 'user_action', 
                  trps: t('jonas_trps_7_jn', 'Spørg om han køber ind i LIDL.'), 
                  construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Køber', 'Jonas', 'ind', 'i', 'Lidl?'] },
                  pronunciation: { target: 'Køber Jonas ind i Lidl?', alternatives: ['Køber han ind i Lidl', 'Handler Jonas i Lidl', 'Handler han i Lidl'], focus: [] }
                },
                
                { type: 'narrative', text: t('jonas_success', '🏆 Godt gået! Du har nu trænet spørgsmål om mad og vaner!') }
            ];
            return;
        }

        storyData = [
            { type: 'narrative', text: t('anna_sit_1', '📍 Situation 1: Anna køber frugt, grøntsager og kød.'), image: 'assets/anna_shopping_vector.png' },
            { type: 'user_action', 
              trps: t('anna_trps_1_hv', 'Spørg ind til de ting, hun køber.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvad', 'køber', 'Anna?'] },
              pronunciation: { target: 'Hvad køber Anna?', focus: [] }
            },
            { type: 'user_action', 
              trps: t('anna_trps_1_jn', 'Nu et ja/nej-spørgsmål: Spørg om hun køber frugt.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Køber', 'Anna', 'frugt?'] },
              pronunciation: { target: 'Køber Anna frugt?', focus: [] }
            },
            
            { type: 'narrative', text: t('anna_sit_2', '📍 Situation 2: Anna betaler 100 kr.'), image: 'assets/anna_paying_cash.png' },
            { type: 'user_action', 
              trps: t('anna_trps_2_hv', 'Spørg om prisen.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'meget', 'betaler', 'Anna?'] },
              pronunciation: { target: 'Hvor meget betaler Anna?', focus: [] }
            },
            { type: 'user_action', 
              trps: t('anna_trps_2_jn', 'Spørg om hun betaler 100 kroner.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Betaler', 'Anna', '100', 'kroner?'] },
              pronunciation: { target: 'Betaler Anna 100 kroner?', focus: [] }
            },
            
            { type: 'narrative', text: t('anna_sit_3', '📍 Situation 3: Anna køber ind i Netto.'), image: 'assets/anna_supermarket.png' },
            { type: 'user_action', 
              trps: t('anna_trps_3_hv', 'Spørg om stedet.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvor', 'køber', 'Anna', 'ind?'] },
              pronunciation: { target: 'Hvor køber Anna ind?', focus: [] }
            },
            { type: 'user_action', 
              trps: t('anna_trps_3_jn', 'Spørg om hun køber ind i Netto.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Køber', 'Anna', 'ind', 'i', 'Netto?'] },
              pronunciation: { target: 'Køber Anna ind i Netto?', focus: [] }
            },
            
            { type: 'narrative', text: t('anna_sit_4', '📍 Situation 4: Anna køber ind kl. 14 om eftermiddagen.'), image: 'assets/anna_time_14.png' },
            { type: 'user_action', 
              trps: t('anna_trps_4_hv', 'Spørg om tidspunktet.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvornår', 'køber', 'Anna', 'ind?'] },
              pronunciation: { target: 'Hvornår køber Anna ind?', focus: [] }
            },
            { type: 'user_action', 
              trps: t('anna_trps_4_jn', 'Spørg om hun køber ind klokken 14.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Køber', 'Anna', 'ind', 'klokken', '14?'] },
              pronunciation: { target: 'Køber Anna ind klokken 14?', focus: [] }
            },
            
            { type: 'narrative', text: t('anna_sit_5', '📍 Situation 5: Anna betaler med kort.'), image: 'assets/anna_paying_card.png' },
            { type: 'user_action', 
              trps: t('anna_trps_5_hv', 'Spørg om betalingsmetoden.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvordan', 'betaler', 'Anna?'] },
              pronunciation: { target: 'Hvordan betaler Anna?', focus: [] }
            },
            { type: 'user_action', 
              trps: t('anna_trps_5_jn', 'Spørg om hun betaler med kort.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Betaler', 'Anna', 'med', 'kort?'] },
              pronunciation: { target: 'Betaler Anna med kort?', focus: [] }
            },
            
            { type: 'narrative', text: t('anna_sit_6', '📍 Situation 6: Anna kører i bil til Netto.'), image: 'assets/anna_driving.png' },
            { type: 'user_action', 
              trps: t('anna_trps_6_hv', 'Spørg om transporten.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvordan', 'kommer', 'Anna', 'til', 'Netto?'] },
              pronunciation: { target: 'Hvordan kommer Anna til Netto?', alternatives: ['Hvordan tager Anna til Netto', 'Hvordan kører Anna til Netto'], focus: [] }
            },
            { type: 'user_action', 
              trps: t('anna_trps_6_jn', 'Spørg om hun kører i bil.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Kører', 'Anna', 'i', 'bil?'] },
              pronunciation: { target: 'Kører Anna i bil?', alternatives: ['Tager Anna bilen', 'Tager Anna i bil', 'Tager Anna i Netto i bil', 'Tager hun i Netto i bil'], focus: [] }
            },
            
            { type: 'narrative', text: t('anna_sit_7', '📍 Situation 7: Anna køber ind i Netto sammen med en veninde.'), image: 'assets/anna_with_friend.png' },
            { type: 'user_action', 
              trps: t('anna_trps_7_hv', 'Spørg om hendes selskab.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Hvem', 'køber', 'Anna', 'ind', 'sammen', 'med?'] },
              pronunciation: { target: 'Hvem køber Anna ind sammen med?', focus: [] }
            },
            { type: 'user_action', 
              trps: t('anna_trps_7_jn', 'Spørg om hun køber ind alene.'), 
              construction: { type: 'HIDDEN_OP', fallbackLink: 'sporgsmal_ordstilling', words: ['Køber', 'Anna', 'ind', 'alene?'] },
              pronunciation: { target: 'Køber Anna ind alene?', focus: [] }
            },
            
            { type: 'narrative', text: t('anna_success', '🏆 Godt gået! Du har nu trænet både Hv-spørgsmål og Ja/Nej-spørgsmål!') }
        ];
    }

    // --- State Management ---
    const appState = {
        currentPhase: 'trps', // 'trps' -> 'construction' -> 'pronunciation' -> 'done'
        constructionPassed: false,
        selectedWords: [], // for OP
        pronunciationFails: 0, // Track fails for fallback
        opFails: 0 // Track fails for OP link
    };

    function renderStartScreen() {
        // Not used in this view
    }

    const situationsNames = ['1. Ting', '2. Pris', '3. Sted', '4. Tidspunkt', '5. Betaling', '6. Transport', '7. Selskab'];

    function updateProgressTracker() {
        progressTracker.innerHTML = '';
        
        situationsNames.forEach((name, i) => {
            // Each situation has a narrative at i*3, Hv-task at i*3+1, Ja/Nej-task at i*3+2
            const hvPassed = currentStepIndex > (i * 3 + 1);
            const jaNejPassed = currentStepIndex > (i * 3 + 2);
            const isActive = currentStepIndex >= (i * 3) && currentStepIndex <= (i * 3 + 2);
            
            const item = document.createElement('div');
            item.className = 'prog-item';
            if (jaNejPassed) item.classList.add('passed');
            else if (isActive) item.classList.add('active');
            
            const title = document.createElement('div');
            title.className = 'prog-title';
            title.textContent = name;
            
            const dots = document.createElement('div');
            dots.className = 'prog-dots';
            
            const dot1 = document.createElement('div');
            dot1.className = 'prog-dot' + (hvPassed ? ' passed' : '');
            
            const dot2 = document.createElement('div');
            dot2.className = 'prog-dot' + (jaNejPassed ? ' passed' : '');
            
            dots.appendChild(dot1);
            dots.appendChild(dot2);
            
            item.appendChild(title);
            item.appendChild(dots);
            progressTracker.appendChild(item);
            
            // Auto-scroll the active item into view
            if (isActive) {
                setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 100);
            }
        });
    }

    function renderStory() {
        updateProgressTracker();
        resetBtn.style.display = 'block'; // Show reset button when story is active
        contentArea.innerHTML = '';
        
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        contentArea.appendChild(chatContainer);

        // Auto-advance past narrative and npc steps until we hit a user_action
        while (currentStepIndex < storyData.length && storyData[currentStepIndex].type !== 'user_action') {
            if (currentStepIndex === storyData.length - 1) break; // End of story
            currentStepIndex++;
        }

        // Render past steps
        for (let i = 0; i <= currentStepIndex; i++) {
            if (i >= storyData.length) break;
            const step = storyData[i];
            
            if (step.type === 'narrative') {
                const bubbleWrapper = document.createElement('div');
                bubbleWrapper.style.display = 'flex';
                bubbleWrapper.style.flexDirection = 'column';
                bubbleWrapper.style.alignItems = 'center';
                bubbleWrapper.style.margin = '2rem 0 1rem 0';
                bubbleWrapper.style.animation = 'fadeIn 0.5s ease';
                
                if (step.image) {
                    const img = document.createElement('img');
                    img.src = step.image;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '220px'; // good height for mobile readability
                    img.style.borderRadius = '16px';
                    img.style.marginBottom = '1rem';
                    img.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
                    bubbleWrapper.appendChild(img);
                }
                
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble narrative';
                bubble.style.margin = '0'; // override default margin since wrapper has it
                bubble.textContent = step.text;
                bubbleWrapper.appendChild(bubble);
                
                chatContainer.appendChild(bubbleWrapper);
            } 
            else if (step.type === 'npc') {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble npc';
                bubble.innerHTML = `<strong>${step.name}:</strong> ${step.text}`;
                chatContainer.appendChild(bubble);
            }
            else if (step.type === 'user_action') {
                if (i < currentStepIndex) {
                    // Past user action - just show the completed text
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble user past';
                    bubble.innerHTML = `<strong>Dig:</strong> ${step.pronunciation.target}`;
                    chatContainer.appendChild(bubble);
                } else {
                    // CURRENT STEP
                    renderCurrentAction(chatContainer, step);
                }
            }
        }
        
        // Auto scroll to bottom
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    }

    function renderCurrentAction(chatContainer, step) {
        const actionBox = document.createElement('div');
        actionBox.className = 'action-box';
        
        const isHv = step.pronunciation.target.toLowerCase().startsWith('hv');
        
        const headerBox = document.createElement('div');
        headerBox.style.display = 'flex';
        headerBox.style.flexDirection = 'column';
        headerBox.style.alignItems = 'center';
        headerBox.style.gap = '0.8rem';
        headerBox.style.marginBottom = '1.5rem';

        const typeIndicator = document.createElement('div');
        typeIndicator.style.background = isHv ? 'rgba(255, 152, 0, 0.2)' : 'rgba(33, 150, 243, 0.2)';
        typeIndicator.style.border = isHv ? '1px solid #ff9800' : '1px solid #2196f3';
        typeIndicator.style.color = isHv ? '#ffb74d' : '#64b5f6';
        typeIndicator.style.padding = '0.4rem 1rem';
        typeIndicator.style.borderRadius = '20px';
        typeIndicator.style.fontWeight = 'bold';
        typeIndicator.style.fontSize = '1.1rem';
        typeIndicator.style.letterSpacing = '1px';
        typeIndicator.style.textTransform = 'uppercase';
        typeIndicator.textContent = isHv ? t('sporgsmal_hv_type', '🔍 Hv-spørgsmål') : t('sporgsmal_jn_type', '⚖️ Ja/nej-spørgsmål');
        
        // 1. TRPS (Thought Bubble)
        const trpsBox = document.createElement('div');
        trpsBox.className = 'trps-box';
        trpsBox.style.marginBottom = '0'; // override
        trpsBox.innerHTML = `💭 <em>${step.trps}</em>`;
        
        headerBox.appendChild(typeIndicator);
        headerBox.appendChild(trpsBox);
        actionBox.appendChild(headerBox);

        // 2. Construction Phase
        const constructBox = document.createElement('div');
        constructBox.className = 'construct-box';
        if (appState.currentPhase === 'trps' || appState.currentPhase === 'construction') {
            if (step.construction.type === 'HIDDEN_OP') {
                appState.currentPhase = 'pronunciation';
                constructBox.style.display = 'none';
            } else {
                appState.currentPhase = 'construction';
                if (step.construction.type === 'OP') {
                    renderOrdstilling(constructBox, step);
                } else if (step.construction.type === 'MO') {
                    renderManglerOrd(constructBox, step);
                }
            }
        } else if (step.construction.type !== 'HIDDEN_OP') {
            // Already constructed, show the correct sentence
            constructBox.innerHTML = `<div style="color: #4caf50; font-weight: bold; margin: 1rem 0;">${t('sporgsmal_saetning_bygget', '✓ Sætning bygget!')}</div>`;
        }
        actionBox.appendChild(constructBox);

        // 3. Pronunciation Phase
        if (appState.currentPhase === 'pronunciation') {
            const pronBox = document.createElement('div');
            pronBox.className = 'pron-box';
            renderPronunciation(pronBox, step);
            actionBox.appendChild(pronBox);
        }

        chatContainer.appendChild(actionBox);
    }

    // --- CONSTRUCT OP ---
    function renderOrdstilling(container, step) {
        const targetWords = step.construction.words;
        
        // Only shuffle on first render
        if (!appState.shuffledWords) {
            appState.shuffledWords = [...targetWords].sort(() => Math.random() - 0.5);
        }

        const dropZone = document.createElement('div');
        dropZone.className = 'op-dropzone';
        
        const poolZone = document.createElement('div');
        poolZone.className = 'op-poolzone';
        
        const feedbackArea = document.createElement('div');
        feedbackArea.style.textAlign = 'center';
        feedbackArea.style.marginTop = '1rem';
        feedbackArea.style.fontSize = '1.1rem';

        // Render initial chips in pool
        appState.shuffledWords.forEach(word => {
            const chip = document.createElement('div');
            chip.className = 'op-word pool';
            chip.textContent = word;
            
            // Allow click to move as a fallback
            chip.onclick = () => {
                if (chip.parentElement === poolZone) {
                    dropZone.appendChild(chip);
                    chip.classList.replace('pool', 'selected');
                } else {
                    poolZone.appendChild(chip);
                    chip.classList.replace('selected', 'pool');
                }
                checkCorrect();
            };
            poolZone.appendChild(chip);
        });

        function checkCorrect() {
            const selectedArr = Array.from(dropZone.children).map(c => c.textContent);
            const poolArr = Array.from(poolZone.children);
            
            // Update classes based on container
            Array.from(dropZone.children).forEach(c => c.classList.replace('pool', 'selected'));
            poolArr.forEach(c => c.classList.replace('selected', 'pool'));

            if (poolArr.length === 0) {
                if (selectedArr.join(' ') === targetWords.join(' ')) {
                    dropZone.style.border = '2px solid #4caf50';
                    feedbackArea.innerHTML = '';
                    setTimeout(() => {
                        appState.currentPhase = 'pronunciation';
                        appState.shuffledWords = null; // reset
                        renderStory();
                    }, 500);
                } else {
                    dropZone.style.border = '2px solid #ff5e5b';
                    appState.opFails++;
                    if (appState.opFails >= 2 && step.construction.fallbackLink) {
                        const drillerMsg = t('sporgsmal_ordstilling_driller', 'Driller det? <a href="#" id="fb-link" style="color:white; text-decoration:underline;">Klik her for at træne ordstilling i spørgsmål</a>.');
                        feedbackArea.innerHTML = `<span style="color:#ffcc00">${drillerMsg}</span>`;
                        setTimeout(() => {
                            const fbLink = document.getElementById('fb-link');
                            if (fbLink) {
                                fbLink.onclick = (e) => {
                                    e.preventDefault();
                                    navigateFn(step.construction.fallbackLink);
                                };
                            }
                        }, 0);
                    }
                }
            } else {
                dropZone.style.border = '2px dashed rgba(255,255,255,0.2)';
                feedbackArea.innerHTML = '';
            }
        }

        container.appendChild(document.createElement('br'));
        container.appendChild(dropZone);
        container.appendChild(poolZone);
        container.appendChild(feedbackArea);

        // Initialize SortableJS if available
        if (window.Sortable) {
            new window.Sortable(poolZone, {
                group: 'ordstilling',
                animation: 150,
                onEnd: checkCorrect
            });
            new window.Sortable(dropZone, {
                group: 'ordstilling',
                animation: 150,
                onEnd: checkCorrect
            });
        }
    }

    // --- CONSTRUCT MO ---
    function renderManglerOrd(container, step) {
        const textContainer = document.createElement('div');
        textContainer.className = 'grammatik-text-container';
        textContainer.style.margin = '1rem 0';
        textContainer.style.fontSize = '1.2rem';

        const parts = step.construction.text.split(/(\[blank_\d+\])/);
        parts.forEach(part => {
            const match = part.match(/\[blank_(\d+)\]/);
            if (match) {
                const idx = parseInt(match[1]);
                const blankData = step.construction.blanks[idx];
                
                const select = document.createElement('select');
                select.className = 'grammatik-select';
                select.dataset.idx = idx;
                
                const defOpt = document.createElement('option');
                defOpt.value = ''; defOpt.textContent = '...';
                select.appendChild(defOpt);

                const opts = [...blankData.options].sort(() => Math.random() - 0.5);
                opts.forEach(o => {
                    const opt = document.createElement('option');
                    opt.value = o; opt.textContent = o;
                    select.appendChild(opt);
                });

                select.onchange = () => {
                    if (select.value === blankData.answer) {
                        select.classList.add('correct');
                        select.classList.remove('wrong');
                        select.disabled = true; // Lock it in
                        checkMOCorrectness();
                    } else if (select.value !== '') {
                        select.classList.add('wrong');
                    } else {
                        select.classList.remove('wrong', 'correct');
                    }
                };
                textContainer.appendChild(select);
            } else {
                const span = document.createElement('span');
                span.textContent = part;
                textContainer.appendChild(span);
            }
        });

        function checkMOCorrectness() {
            const selects = textContainer.querySelectorAll('select');
            const allCorrect = Array.from(selects).every(s => s.classList.contains('correct'));
            if (allCorrect) {
                setTimeout(() => {
                    appState.currentPhase = 'pronunciation';
                    renderStory();
                }, 500);
            }
        }

        container.appendChild(textContainer);
    }

    // --- PRONUNCIATION ---
    function renderPronunciation(container, step) {
        const pronCont = document.createElement('div');
        pronCont.style.display = 'flex';
        pronCont.style.flexDirection = 'column';
        pronCont.style.alignItems = 'center';
        pronCont.style.gap = '1rem';
        pronCont.style.padding = '1.5rem';
        pronCont.style.background = 'rgba(0,0,0,0.1)';
        pronCont.style.borderRadius = '16px';
        pronCont.style.marginTop = '1rem';

        const instruction = document.createElement('div');
        const udtaleTestLabel = t('sporgsmal_udtale_test', 'Udtale-test:');
        const udtaleTestInst = t('sporgsmal_laes_hoejt', 'Tryk på mikrofonen og læs din sætning højt.');
        instruction.innerHTML = `<strong>${udtaleTestLabel}</strong> ${udtaleTestInst}`;
        
        const sentenceDisplay = document.createElement('div');
        sentenceDisplay.className = 'udtale-sentence';
        sentenceDisplay.style.fontSize = '1.5rem';
        sentenceDisplay.style.fontWeight = 'bold';
        sentenceDisplay.style.textAlign = 'center';
        
        const progressContainer = document.createElement('div');
        progressContainer.style.width = '100%';
        progressContainer.style.maxWidth = '400px';
        progressContainer.style.display = 'none';
        progressContainer.style.alignItems = 'center';
        progressContainer.style.gap = '1rem';
        progressContainer.style.margin = '1rem 0';
        
        const label = document.createElement('span');
        label.textContent = 'Mestring:';
        label.style.fontWeight = 'bold';
        
        const barWrapper = document.createElement('div');
        barWrapper.style.flex = '1';
        barWrapper.style.height = '12px';
        barWrapper.style.background = 'rgba(255,255,255,0.1)';
        barWrapper.style.borderRadius = '6px';
        barWrapper.style.overflow = 'hidden';
        
        const progressBar = document.createElement('div');
        progressBar.style.height = '100%';
        progressBar.style.width = '0%';
        progressBar.style.background = 'linear-gradient(90deg, #ff5e5b, #4caf50)';
        progressBar.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const scoreText = document.createElement('span');
        scoreText.textContent = '0%';
        scoreText.style.fontWeight = 'bold';
        scoreText.style.minWidth = '45px';

        barWrapper.appendChild(progressBar);
        progressContainer.appendChild(label);
        progressContainer.appendChild(barWrapper);
        progressContainer.appendChild(scoreText);

        // Format sentence with target focus
        const targetWords = step.pronunciation.target.split(' ');
        
        sentenceDisplay.innerHTML = targetWords.map(w => {
            const clean = w.toLowerCase().replace(/[.,!?]/g, '');
            const isFocus = step.pronunciation.focus.some(f => clean.includes(f.toLowerCase()));
            const displayText = w.replace(/[a-zA-ZæøåÆØÅ0-9]/g, '_');
            return `<span class="udtale-word ${isFocus ? 'target-focus' : ''}">${displayText}</span>`;
        }).join(' ');

        const micBtn = document.createElement('button');
        micBtn.className = 'mic-btn';
        micBtn.innerHTML = '🎤';
        
        const statusText = document.createElement('div');
        statusText.style.color = 'var(--text-muted)';
        statusText.textContent = 'Klar...';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = 'Videre i historien ➔';
        nextBtn.style.display = 'none';
        nextBtn.style.padding = '0.6rem 1.2rem';
        nextBtn.style.fontSize = '1rem';
        nextBtn.style.minWidth = 'auto';
        nextBtn.onclick = () => {
            currentStepIndex++;
            localStorage.setItem(lsKey, currentStepIndex);
            appState.currentPhase = 'trps';
            appState.pronunciationFails = 0; // Reset for next step
            appState.opFails = 0; // Reset
            renderStory();
        };

        const skipBtn = document.createElement('button');
        skipBtn.className = 'back-btn';
        skipBtn.textContent = 'Spring over (kun for test)';
        skipBtn.onclick = nextBtn.onclick;

        // Speech Logic
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            statusText.textContent = 'Browser understøtter ikke mikrofon. Tryk Spring over.';
            skipBtn.style.display = 'block';
        } else {
            const recognition = new SpeechRecognition();
            recognition.lang = 'da-DK';
            let isListening = false;

            micBtn.onclick = () => {
                if (isListening) { recognition.stop(); return; }
                try {
                    recognition.start();
                    isListening = true;
                    micBtn.classList.add('listening');
                    statusText.innerHTML = 'Lytter... Tal nu (stopper af sig selv)';
                    progressContainer.style.display = 'none';
                    progressBar.style.width = '0%';
                    scoreText.textContent = '0%';
                    Array.from(sentenceDisplay.querySelectorAll('.udtale-word')).forEach(s => s.classList.remove('correct', 'incorrect'));
                } catch(e) {}
            };

            recognition.onresult = (e) => {
                const spoken = e.results[0][0].transcript;
                statusText.innerHTML = `Behandler...`;
                evaluatePronunciation(spoken);
            };

            recognition.onend = () => {
                micBtn.classList.remove('listening');
                isListening = false;
            };

            function evaluatePronunciation(spoken) {
                const spokenArr = spoken.toLowerCase().replace(/[.,!?]/g, '').split(' ').filter(w => w).map(w => w === 'kr' ? 'kroner' : w);
                
                function getMatchScore(targetArr) {
                    let correctCnt = 0;
                    let sIdx = 0;
                    targetArr.forEach((word) => {
                        const clean = word.toLowerCase().replace(/[.,!?]/g, '');
                        let found = false;
                        for (let i = sIdx; i < Math.min(sIdx + 3, spokenArr.length); i++) {
                            const strictWords = ['hvad', 'hvor', 'hvordan', 'hvornår', 'hvem', 'hvilken'];
                            let isMatch = false;
                            
                            if (strictWords.includes(clean)) {
                                isMatch = (spokenArr[i] === clean);
                            } else if (clean === 'anna') {
                                isMatch = (spokenArr[i] === 'anna' || spokenArr[i] === 'hun');
                            } else if (clean === 'kommer') {
                                isMatch = (spokenArr[i] === 'kommer' || spokenArr[i] === 'tager' || spokenArr[i] === 'kører');
                            } else if (clean === 'kok') {
                                isMatch = (spokenArr[i] === 'kok' || spokenArr[i] === 'kock');
                            } else {
                                isMatch = (spokenArr[i] === clean || (clean.length>3 && spokenArr[i].length>3 && (spokenArr[i].includes(clean) || clean.includes(spokenArr[i]))));
                            }
                            
                            if (isMatch) {
                                found = true;
                                sIdx = i + 1;
                                break;
                            }
                        }
                        if (found) correctCnt++;
                    });
                    return Math.round((correctCnt / targetArr.length) * 100);
                }

                // Calculate main score and UI highlighting
                let sIdx = 0;
                let mainCorrectCnt = 0;
                const spans = sentenceDisplay.querySelectorAll('.udtale-word');

                targetWords.forEach((word, idx) => {
                    const clean = word.toLowerCase().replace(/[.,!?]/g, '');
                    const isFocus = step.pronunciation.focus.length > 0 ? step.pronunciation.focus.some(f => clean.includes(f.toLowerCase())) : true;
                    
                    let found = false;
                    for (let i = sIdx; i < Math.min(sIdx + 3, spokenArr.length); i++) {
                        const strictWords = ['hvad', 'hvor', 'hvordan', 'hvornår', 'hvem', 'hvilken'];
                        let isMatch = false;
                        
                        if (strictWords.includes(clean)) {
                            isMatch = (spokenArr[i] === clean);
                        } else if (clean === 'anna') {
                            isMatch = (spokenArr[i] === 'anna' || spokenArr[i] === 'hun');
                        } else if (clean === 'kommer') {
                            isMatch = (spokenArr[i] === 'kommer' || spokenArr[i] === 'tager' || spokenArr[i] === 'kører');
                        } else if (clean === 'kok') {
                            isMatch = (spokenArr[i] === 'kok' || spokenArr[i] === 'kock');
                        } else {
                            isMatch = (spokenArr[i] === clean || (clean.length>3 && spokenArr[i].length>3 && (spokenArr[i].includes(clean) || clean.includes(spokenArr[i]))));
                        }
                        
                        if (isMatch) {
                            found = true;
                            sIdx = i + 1;
                            break;
                        }
                    }

                    if (found) {
                        if (isFocus) mainCorrectCnt++;
                        spans[idx].classList.add('correct');
                        spans[idx].textContent = word; // Reveal correct words
                    } else if (isFocus) {
                        spans[idx].classList.add('incorrect');
                    }
                });

                // Calculate total target words that require focus for main score
                let totalReq = 0;
                targetWords.forEach(w => {
                    const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                    if (step.pronunciation.focus.length > 0) {
                        if (step.pronunciation.focus.some(f => clean.includes(f.toLowerCase()))) {
                            totalReq++;
                        }
                    } else {
                        totalReq++;
                    }
                });
                if (totalReq === 0) totalReq = 1;

                let bestScore = Math.round((mainCorrectCnt / totalReq) * 100);
                let usedAlternative = false;

                // Check alternatives
                if (step.pronunciation.alternatives) {
                    step.pronunciation.alternatives.forEach(alt => {
                        const altArr = alt.split(' ');
                        const altScore = getMatchScore(altArr);
                        if (altScore > bestScore) {
                            bestScore = altScore;
                            usedAlternative = true;
                        }
                    });
                }
                
                const score = bestScore;
                
                progressContainer.style.display = 'flex';
                
                setTimeout(() => {
                    progressBar.style.width = score + '%';
                    scoreText.textContent = score + '%';
                    
                    const spokenHTML = `<div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; font-size: 1.1rem; color: #ffffff; text-align: center;">Du sagde:<br/><span style="color: #ffcc00; font-size: 1.3rem; font-weight: bold; line-height: 1.8;">"${spoken}"</span></div>`;
                    
                    if (score >= 80) {
                        progressBar.style.background = '#4caf50';
                        statusText.innerHTML = `<span style="color:#4caf50; font-weight: bold;">Flot udtalt!</span>${spokenHTML}`;
                        
                        const spans = sentenceDisplay.querySelectorAll('.udtale-word');
                        targetWords.forEach((w, i) => {
                            spans[i].textContent = w;
                            spans[i].classList.add('correct');
                            spans[i].classList.remove('incorrect');
                        });
                        
                        micBtn.style.display = 'none';
                        skipBtn.style.display = 'none';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        progressBar.style.background = '#ff5e5b';
                        appState.pronunciationFails++;
                        if (appState.pronunciationFails >= 2 && step.construction.type === 'HIDDEN_OP') {
                            // Fallback triggered!
                            progressBar.style.background = '#ffcc00';
                            statusText.innerHTML = `<span style="color:#ffcc00; font-weight: bold;">Det var tæt på! Lad os prøve at bygge sætningen først som hjælp.</span>${spokenHTML}`;
                            
                            setTimeout(() => {
                                step.construction.type = 'OP'; // Downgrade to standard OP
                                appState.currentPhase = 'construction';
                                appState.pronunciationFails = 0; // reset
                                renderStory(); // Rerender to show OP
                            }, 3000);
                        } else {
                            statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">Næsten! Prøv igen.</span>${spokenHTML}`;
                        }
                    }
                }, 100);
            }
        }

        pronCont.appendChild(instruction);
        pronCont.appendChild(sentenceDisplay);
        pronCont.appendChild(progressContainer);
        pronCont.appendChild(micBtn);
        pronCont.appendChild(statusText);
        pronCont.appendChild(nextBtn);
        pronCont.appendChild(skipBtn);
        container.appendChild(pronCont);
    }

    // Only inject CSS once
    if (!document.getElementById('story-styles')) {
        const style = document.createElement('style');
        style.id = 'story-styles';
        style.textContent = `
            .story-input {
                padding: 1rem;
                font-size: 1.2rem;
                border-radius: 12px;
                border: 2px solid rgba(255,255,255,0.2);
                background: rgba(0,0,0,0.2);
                color: white;
                width: 80%;
                max-width: 300px;
                outline: none;
            }
            .story-input:focus {
                border-color: #ffcc00;
            }
            .chat-container {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                padding-bottom: 5rem;
            }
            .chat-bubble {
                padding: 1rem 1.5rem;
                border-radius: 20px;
                max-width: 80%;
                font-size: 1.15rem;
                line-height: 1.5;
                animation: fadeIn 0.4s ease-out forwards;
            }
            .chat-bubble.narrative {
                background: rgba(255,255,255,0.1);
                color: #e0e0e0;
                align-self: center;
                font-style: italic;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.15);
            }
            .chat-bubble.npc {
                background: rgba(255, 204, 0, 0.15);
                border: 1px solid rgba(255, 204, 0, 0.3);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            .chat-bubble.user.past {
                background: rgba(76, 175, 80, 0.15);
                border: 1px solid rgba(76, 175, 80, 0.3);
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            .action-box {
                align-self: center;
                width: 100%;
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 24px;
                padding: 1.5rem;
                animation: fadeIn 0.5s ease;
            }
            .trps-box {
                font-size: 1.2rem;
                color: #ffcc00;
                margin-bottom: 1.5rem;
                text-align: center;
            }
            .op-dropzone {
                min-height: 60px;
                border: 2px dashed rgba(255,255,255,0.3);
                border-radius: 12px;
                padding: 1rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
                transition: border-color 0.3s;
            }
            .op-poolzone {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                justify-content: center;
            }
            .op-word {
                padding: 0.6rem 1rem;
                font-size: 1.1rem;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-family: inherit;
                transition: transform 0.1s;
            }
            .op-word:active { transform: scale(0.9); }
            .op-word.pool {
                background: var(--card-bg);
                color: white;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .op-word.selected {
                background: #4caf50;
                color: white;
            }
            .progress-tracker {
                position: sticky;
                top: 0;
                z-index: 100;
                background: rgba(40, 10, 20, 0.95);
                backdrop-filter: blur(10px);
                display: flex;
                overflow-x: auto;
                padding: 1rem;
                gap: 1.5rem;
                border-bottom: 2px solid rgba(255,255,255,0.1);
                margin: 0 -1rem 1rem -1rem;
                white-space: nowrap;
                scrollbar-width: none;
            }
            .progress-tracker::-webkit-scrollbar {
                display: none;
            }
            .prog-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                opacity: 0.4;
                transition: all 0.3s;
                font-size: 0.95rem;
            }
            .prog-item.active {
                opacity: 1;
            }
            .prog-item.passed {
                opacity: 1;
                color: #4caf50;
            }
            .prog-title {
                font-weight: bold;
                margin-bottom: 0.4rem;
            }
            .prog-dots {
                display: flex;
                gap: 0.4rem;
            }
            .prog-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
            }
            .prog-dot.passed {
                background: #4caf50;
                box-shadow: 0 0 5px #4caf50;
            }
        `;
        document.head.appendChild(style);
    }

    initStoryData();
    renderStory();

    container.appendChild(viewContainer);
}
