import { getTranslation, getLang } from '../utils/i18n.js';
import { hcAndersenStories } from '../data/hc_andersen_stories.js';
import { renderKlodsHansFinaleActivities } from '../components/KlodsHansFinaleActivities.js';
import { createSentence1VisualLab, findVisualNodeForBrotherToken, findSentence2NodeByToken, findDel1VisualNodeByToken } from '../components/KlodsHansVisualSentence1Lab.js';
import { createSentencePartsLab } from '../components/KlodsHansSentencePartsLab.js';
import { allNounsRegistry, wordToNounKey, openNounQuickPeekModal } from '../utils/nounQuickPeekModal.js';
import { byrumVerbsRegistry, openVerbQuickPeekModal } from '../utils/verbQuickPeekModal.js';
import { openPronounQuickPeekModal } from '../utils/pronounQuickPeekModal.js';
import { openWordPresentation } from '../components/SpotlightSearch.js';
import { verberWordTranslations } from '../utils/top100_verber_translations.js';
import { adjektiverWordTranslations } from '../utils/top100_adjektiver_translations.js';
import { adverbierWordTranslations } from '../utils/top100_adverbier_translations.js';
import { konjunktionerWordTranslations } from '../utils/top100_konjunktioner_translations.js';
import { isHCDevMode, setHCDevMode } from '../utils/devMode.js';

const IRREGULAR_DATID_DA = new Set([
    'var', 'havde', 'sagde', 'fortalte', 'kom', 'lo', 'red', 'sprang', 'gik', 'fandt',
    'tog', 'blev', 'så', 'fik', 'gav', 'stod', 'sad', 'lå', 'skrev', 'drog', 'hang',
    'trådte', 'grinede', 'svarede', 'råbte', 'smilede', 'rystede', 'regnede', 'kaldte',
    'tænkte', 'ville', 'skulle', 'kunne', 'måtte', 'sang', 'løb', 'holdt', 'lagde'
]);

function classifyVerbTense(rawText) {
    const t = (rawText || '').toLowerCase().trim();
    if (!t) return 'nutid';
    if (/ende$/.test(t)) return '';
    if (/^(har|er)\s+\S+/.test(t)) return 'foernutid';
    if (/^(skal|vil)\b/.test(t)) return 'fremtid';
    if (IRREGULAR_DATID_DA.has(t) || /(ede|te)$/.test(t)) return 'datid';
    return 'nutid';
}

function classifyNounForm(rawText) {
    const t = (rawText || '').toLowerCase().trim();
    if (!t || t === 'klods-hans') return '';
    if (/(ene|erne|ne|en|et)$/.test(t)) return 'bestemt';
    return 'ubestemt';
}

const SUBJEKT_PRO_DA = new Set(['jeg', 'du', 'han', 'hun', 'vi', 'i', 'de']);
const OBJEKT_PRO_DA = new Set(['mig', 'dig', 'ham', 'hende', 'os', 'jer', 'dem']);

function classifyPronounCase(rawText) {
    const t = (rawText || '').toLowerCase().trim();
    if (!t) return '';
    if (SUBJEKT_PRO_DA.has(t)) return 'subjekt';
    if (OBJEKT_PRO_DA.has(t)) return 'objekt';
    return '';
}

const ADJ_SKIP_DA = new Set(['en', 'et', 'to', 'tre', 'fire', 'fem', 'første', 'anden', 'tredje', 'mange', 'flere', 'alle', 'ingen']);
const ADJ_GRAD_DA = new Set(['bedre', 'bedst', 'bedste', 'større', 'størst', 'største', 'mindre', 'mindst', 'ældre', 'ældst', 'ældste', 'yngre', 'yngst', 'yngste', 'klogere', 'klogest', 'klogeste', 'finere', 'finest', 'fineste', 'flotteste']);

function classifyAdjForm(rawText) {
    const t = (rawText || '').toLowerCase().trim();
    if (!t || ADJ_SKIP_DA.has(t)) return '';
    if (ADJ_GRAD_DA.has(t) || /(ere|est|este)$/.test(t)) return 'grad';
    if (/e$/.test(t)) return 'e_form';
    return 'grundform';
}

const ADV_STED_DA = new Set(['ude', 'inde', 'oppe', 'nede', 'der', 'her', 'frem', 'tilbage', 'af sted', 'væk', 'hjem', 'hjemme', 'ud', 'ind', 'op', 'ned', 'hen', 'foran', 'bagved', 'bort', 'forbi']);
const ADV_TID_DA = new Set(['da', 'nu', 'altid', 'aldrig', 'ofte', 'straks', 'snart', 'først', 'bagefter', 'igen', 'stadig', 'endelig', 'pludselig', 'senere', 'tidligere', 'længe']);
const ADV_SMAAORD_DA = new Set(['ikke', 'også', 'alligevel', 'bare', 'jo', 'vel', 'dog', 'gerne', 'kun', 'måske', 'endnu', 'altså', 'slet']);

function classifyAdvType(rawText) {
    const t = (rawText || '').toLowerCase().trim();
    if (!t) return '';
    if (ADV_STED_DA.has(t)) return 'sted';
    if (ADV_TID_DA.has(t)) return 'tid';
    if (ADV_SMAAORD_DA.has(t)) return 'smaaord';
    return 'grad_maade';
}

/**
 * HCAndersenView - H.C. Andersens Eventyr
 * Læs og lær dansk med forkortede, forsimplede udgaver af klassiske eventyr.
 * Funktioner: Vrimlebilleder, grammatiske farvekoder på ordniveau, interaktive
 * målordspræsentationer for alle ordklasser (inkl. pink pronominer), oplæsning (TTS) og quiz.
 */
// Clean monochrome SVG icons
const SVG_AUDIO = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
const SVG_STOP = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: -2px; display: inline-block;"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>`;
const SVG_CHECK = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const SVG_CROSS = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
const SVG_RESET = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>`;
const SVG_SEARCH = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
const SVG_MIC = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
const SVG_INFO = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
const SVG_BOOK = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;

function stripEmojis(str) {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{FE0F}]/gu, '').trim();
}

export function renderHCAndersenView(container, navigateFn, extraData = {}) {
    injectStyles();

    // Dev Gate: Check if dev mode is enabled (always true on localhost / 127.0.0.1)
    if (!isHCDevMode(extraData)) {
        renderComingSoonView(container, navigateFn, extraData);
        return;
    }

    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container hc-andersen-container';

    // State
    let activeStoryId = extraData?.storyId || extraData?.story || extraData?.subPath || null;
    let activeStorySubView = extraData?.subView === 'talemaader' ? 'talemaader' : 'story'; // 'story' | 'talemaader'
    let isPlaying = false;
    let activeUtterance = null;
    let fontSizeLevel = 1; // 0 = standard, 1 = medium (default), 2 = stor
    let readingMode = 'steps'; // 'steps' | 'full'
    let currentStepIdx = 0;
    let completedScenes = {};

    // TTS Helper
    function stopSpeech() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        isPlaying = false;
        updateAudioButtons(false);
    }

    function speakDanish(text, onEndCallback = null) {
        if (!('speechSynthesis' in window) || !text) return;
        stopSpeech();

        const cleanText = text.replace(/»|«|“|”/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'da-DK';
        utterance.rate = 0.88; // lidt roligere læsetempo, optimalt til sproglæring

        utterance.onend = () => {
            isPlaying = false;
            updateAudioButtons(false);
            if (onEndCallback) onEndCallback();
        };

        utterance.onerror = () => {
            isPlaying = false;
            updateAudioButtons(false);
        };

        isPlaying = true;
        activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        updateAudioButtons(true);
    }

    function updateAudioButtons(playing) {
        const globalBtn = viewContainer.querySelector('.main-listen-btn');
        if (globalBtn) {
            if (playing) {
                globalBtn.classList.add('playing');
                globalBtn.innerHTML = `<span>${SVG_STOP}</span> <span>${isEn ? 'Stop listening' : 'Stop oplæsning'}</span>`;
            } else {
                globalBtn.classList.remove('playing');
                globalBtn.innerHTML = `<span>${SVG_AUDIO}</span> <span>${isEn ? 'Listen to story' : 'Lyt til historien'}</span>`;
            }
        }
    }

    // Styles
    injectStyles();

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const mainContent = document.createElement('div');
    mainContent.className = 'hc-main-content';
    viewContainer.appendChild(mainContent);

    function updateTopBar() {
        if (activeStoryId) {
            if (activeStorySubView === 'talemaader') {
                backBtn.innerHTML = `← ${isEn ? 'Back to Story' : 'Tilbage til eventyret'}`;
                backBtn.onclick = () => {
                    stopSpeech();
                    activeStorySubView = 'story';
                    renderView();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
            } else {
                backBtn.innerHTML = `← ${isEn ? 'All Fairy Tales' : 'Alle eventyr'}`;
                backBtn.onclick = () => {
                    stopSpeech();
                    activeStoryId = null;
                    currentStepIdx = 0;
                    activeStorySubView = 'story';
                    renderView();
                };
            }
        } else {
            backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
            backBtn.onclick = () => {
                stopSpeech();
                navigateFn('historier_menu');
            };
        }
    }

    const availableStories = hcAndersenStories;

    function renderView() {
        updateTopBar();
        mainContent.innerHTML = '';

        if (!activeStoryId) {
            renderCatalog();
        } else {
            const story = availableStories.find(s => s.id === activeStoryId);
            if (story) {
                if (activeStorySubView === 'talemaader' && story.talemaaderChallenge) {
                    renderStoryTalemaader(story);
                } else {
                    renderReader(story);
                }
            } else {
                renderCatalog();
            }
        }
    }

    // --- 1. EVENTYROVERSIGT (CATALOG) ---
    function renderCatalog() {
        const hero = document.createElement('div');
        hero.className = 'hc-hero-card';
        hero.innerHTML = `
            <div class="hc-hero-badge">${isEn ? 'Danish Cultural Heritage & Graded Reading' : 'Dansk kulturarv & Letlæst'}</div>
            <h1 class="hc-hero-title">${isEn ? "H.C. Andersen's Fairy Tales" : 'H.C. Andersens eventyr'}</h1>
            <p class="hc-hero-desc">
                ${isEn 
                    ? 'Read and learn Danish with shortened and simplified editions of classic fairy tales. Featuring interactive wimmelbuch scenes, grammatical color codes, audio read-aloud, and comprehension quizzes.'
                    : 'Læs og lær dansk med forkortede og forsimplede udgaver af H.C. Andersens verdenskendte eventyr. Med interaktive vrimlebilleder, officielle grammatiske farvekoder, indbygget oplæsning og ordforklaringer.'
                }
            </p>
            <div class="hc-features-pills">
                <span class="hc-pill">${isEn ? 'Wimmelbuch scenes' : 'Interaktive vrimlebilleder'}</span>
                <span class="hc-pill">${isEn ? 'Grammar color codes' : 'Grammatiske farvekoder'}</span>
                <span class="hc-pill">${isEn ? 'Pronoun quick peeks' : 'Pink pronominer & opslag'}</span>
                <span class="hc-pill">${isEn ? 'Level: Easy (A2 - B1)' : 'Niveau: Let (A2 - B1)'}</span>
                <span class="hc-pill"><span>${SVG_AUDIO}</span> <span>${isEn ? 'Built-in audio' : 'Indbygget oplæsning'}</span></span>
            </div>
        `;
        mainContent.appendChild(hero);

        const listTitle = document.createElement('h2');
        listTitle.className = 'hc-section-title';
        listTitle.textContent = isEn ? 'Choose a Fairy Tale to Read' : 'Vælg et eventyr at læse';
        mainContent.appendChild(listTitle);

        const grid = document.createElement('div');
        grid.className = 'hc-stories-grid';

        availableStories.forEach(story => {
            const card = document.createElement('div');
            card.className = 'hc-story-card';
            card.dataset.storyId = story.id;
            card.onclick = () => {
                activeStoryId = story.id;
                currentStepIdx = 0;
                renderView();
            };

            const previewImage = (story.id === 'klods_hans' && story.sections?.[0]?.vrimmelImage)
                ? story.sections[0].vrimmelImage
                : null;

            card.innerHTML = `
                <div class="hc-card-header">
                    <span class="hc-card-icon">${SVG_BOOK}</span>
                    <div class="hc-card-badges">
                        ${story.hasWimmelbilder ? `<span class="hc-wimmel-tag">${isEn ? '3 Wimmelbuch scenes' : '3 Vrimlebilleder'}</span>` : ''}
                        <span class="hc-level-tag">${story.level}</span>
                        <span class="hc-time-tag">${story.readingTime}</span>
                    </div>
                </div>
                <h3 class="hc-card-title">${story.title}</h3>
                <div class="hc-card-subtitle">${story.titleEn}</div>
                ${previewImage
                    ? `<div class="hc-card-vrimmel-preview">
                           <img src="${previewImage}" alt="${story.title}" class="hc-card-vrimmel-img" />
                       </div>`
                    : `<blockquote class="hc-card-quote">»${story.quote}«</blockquote>
                       <p class="hc-card-teaser">${isEn ? story.teaserEn : story.teaser}</p>`
                }
                <div class="hc-card-footer">
                    <button class="hc-read-btn">
                        <span>${isEn ? 'Read Tale' : 'Læs eventyr'}</span>
                        <span>→</span>
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        mainContent.appendChild(grid);
    }

    // --- 2. READER / LÆSEFLADE ---
    function renderReader(story) {
        const readerWrapper = document.createElement('div');
        readerWrapper.className = `hc-reader-wrapper font-size-${fontSizeLevel}${story.id === 'klods_hans' ? ' hc-theme-nordic' : ''}`;

        // Story Header
        const headerCard = document.createElement('div');
        headerCard.className = 'hc-reader-header';
        headerCard.innerHTML = `
            <div class="hc-reader-meta">
                <span class="hc-reader-icon">${SVG_BOOK}</span>
                <div>
                    <h1 class="hc-reader-title">${story.title}</h1>
                    <div class="hc-reader-sub">${story.titleEn} &bull; <span class="hc-level-tag-inline">${story.level}</span> &bull; ${story.readingTime}</div>
                </div>
            </div>
        `;
        readerWrapper.appendChild(headerCard);

        // Sections content
        const sectionsContainer = document.createElement('div');
        sectionsContainer.className = 'hc-sections-container';
        let activeQuizCard = null;
        let isActiveSectionUnlocked = true;

        if (readingMode === 'steps') {
            const hasFinale = false;
            const finaleStepIdx = story.sections.length;

            // Navigation pills for steps
            const stepNav = document.createElement('div');
            stepNav.className = 'hc-step-nav';
            story.sections.forEach((sec, idx) => {
                const stepBtn = document.createElement('button');
                stepBtn.className = `hc-step-pill ${idx === currentStepIdx ? 'active' : ''}`;
                stepBtn.innerHTML = `Del ${idx + 1}`;
                stepBtn.onclick = () => {
                    stopSpeech();
                    currentStepIdx = idx;
                    renderView();
                };
                stepNav.appendChild(stepBtn);
            });

            if (hasFinale) {
                const finalePill = document.createElement('button');
                finalePill.className = `hc-step-pill finale-step ${currentStepIdx === finaleStepIdx ? 'active' : ''}`;
                finalePill.innerHTML = `🎭 ${isEn ? 'Finale Activities' : 'Afslutning: 2 opgaver'}`;
                finalePill.onclick = () => {
                    stopSpeech();
                    currentStepIdx = finaleStepIdx;
                    renderView();
                };
                stepNav.appendChild(finalePill);
            }
            sectionsContainer.appendChild(stepNav);

            if (hasFinale && currentStepIdx === finaleStepIdx) {
                // Render Finale Activities
                const finaleCard = document.createElement('div');
                finaleCard.className = 'hc-finale-wrapper-card';
                renderKlodsHansFinaleActivities(finaleCard, {
                    isEn,
                    speakDanish,
                    onJumpToQuiz: () => {
                        const quizEl = readerWrapper.querySelector('.hc-quiz-card');
                        if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                    }
                });
                sectionsContainer.appendChild(finaleCard);

                // Step Action Buttons
                const stepActions = document.createElement('div');
                stepActions.className = 'hc-step-actions';

                const prevBtn = document.createElement('button');
                prevBtn.className = 'step-action-btn prev';
                prevBtn.innerHTML = `← ${isEn ? 'Back to Scene 3' : 'Forrige: Scene 3 (Riddersalen)'}`;
                prevBtn.onclick = () => {
                    stopSpeech();
                    currentStepIdx = finaleStepIdx - 1;
                    renderView();
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                };
                stepActions.appendChild(prevBtn);

                const quizJumpBtn = document.createElement('button');
                quizJumpBtn.className = 'step-action-btn quiz-jump';
                quizJumpBtn.innerHTML = `${isEn ? 'Take Comprehension Quiz' : 'Tag forståelsesquizzen'} ↓`;
                quizJumpBtn.onclick = () => {
                    const quizEl = readerWrapper.querySelector('.hc-quiz-card');
                    if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                };
                stepActions.appendChild(quizJumpBtn);

                sectionsContainer.appendChild(stepActions);
            } else {
                // Active section card
                const activeSec = story.sections[currentStepIdx];
                const hasStepFlow = activeSec && activeSec.dialogue && activeSec.dialogue.length > 0;
                const activeSceneKey = `hc_scene_${story?.id || 'story'}_${currentStepIdx}`;
                isActiveSectionUnlocked = !hasStepFlow || !!completedScenes[activeSceneKey];

                const secCard = createSectionCard(activeSec, currentStepIdx, story, (unlocked) => {
                    isActiveSectionUnlocked = unlocked;
                    if (activeQuizCard) {
                        activeQuizCard.hidden = !unlocked;
                    }
                });
                sectionsContainer.appendChild(secCard);

                // Step Action Buttons (uden "Næste afsnit →")
                const stepActions = document.createElement('div');
                stepActions.className = 'hc-step-actions';
                let hasAnyStepAction = false;

                if (currentStepIdx > 0) {
                    const prevBtn = document.createElement('button');
                    prevBtn.className = 'step-action-btn prev';
                    prevBtn.innerHTML = `← ${isEn ? 'Previous section' : 'Forrige afsnit'}`;
                    prevBtn.onclick = () => {
                        stopSpeech();
                        currentStepIdx--;
                        renderView();
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                    };
                    stepActions.appendChild(prevBtn);
                    hasAnyStepAction = true;
                } else {
                    stepActions.appendChild(document.createElement('div'));
                }

                if (currentStepIdx >= story.sections.length - 1) {
                    const quizJumpBtn = document.createElement('button');
                    quizJumpBtn.className = 'step-action-btn quiz-jump';
                    quizJumpBtn.innerHTML = `${isEn ? 'Take Comprehension Quiz' : 'Tag forståelsesquizzen'} ↓`;
                    quizJumpBtn.onclick = () => {
                        const quizEl = readerWrapper.querySelector('.hc-quiz-card');
                        if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                    };
                    stepActions.appendChild(quizJumpBtn);
                    hasAnyStepAction = true;
                }

                if (hasAnyStepAction) {
                    sectionsContainer.appendChild(stepActions);
                }
            }
        } else {
            // Full text mode: display all sections sequentially
            story.sections.forEach((sec, idx) => {
                const secCard = createSectionCard(sec, idx, story);
                sectionsContainer.appendChild(secCard);
            });
        }

        readerWrapper.appendChild(sectionsContainer);

        // Grammar Spot Card
        // Grammar Spot (skjules på Klods-Hans, som bruger den visuelle forklaringsboks)
        if (story.id !== 'klods_hans' && story.grammarFocus) {
            const grammarSpot = document.createElement('div');
            grammarSpot.className = 'hc-grammar-spot';
            grammarSpot.innerHTML = `
                <div class="grammar-spot-header">
                    <span style="font-size: 1.1rem; display: inline-flex; align-items: center;">${SVG_INFO}</span>
                    <h4>${story.grammarFocus.title}</h4>
                </div>
                <p class="grammar-spot-text">${story.grammarFocus.desc}</p>
            `;
            readerWrapper.appendChild(grammarSpot);
        }

        // Vocabulary List (skjules på Klods-Hans, som bruger den visuelle forklaringsboks)
        if (story.id !== 'klods_hans' && story.vocabulary && story.vocabulary.length > 0) {
            const vocabCard = document.createElement('div');
            vocabCard.className = 'hc-vocab-card';
            vocabCard.innerHTML = `
                <div class="vocab-header">
                    
                    <h3>${isEn ? 'Vocabulary & Explanations' : 'Gloser & ordforklaringer i dette eventyr'}</h3>
                </div>
                <p class="vocab-hint">${isEn ? 'Get to know the words – click the speaker to listen to pronunciation:' : 'Lær ordene at kende – klik på højttaleren for at høre udtalen:'}</p>
                <div class="vocab-grid">
                    ${story.vocabulary.map(v => `
                        <div class="vocab-item">
                            <div class="vocab-item-top">
                                <strong class="vocab-word">${v.word}</strong>
                                <span class="vocab-type">${v.type}</span>
                                <button class="vocab-speak-btn" data-word="${v.word}" title="Lyt">${SVG_AUDIO}</button>
                            </div>
                            <div class="vocab-meaning-da">${v.meaningDa}</div>
                            <div class="vocab-meaning-en">EN: ${v.meaningEn}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            vocabCard.querySelectorAll('.vocab-speak-btn').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    speakDanish(btn.dataset.word);
                };
            });

            readerWrapper.appendChild(vocabCard);
        }

        // Interactive Comprehension Quiz
        // I trinvis visning vises kun forståelsesspørgsmålet for den pågældende del,
        // og først når alle sætninger i delen er læst eller "Vis samlet tekst" er trykket.
        if (story.quiz && story.quiz.length > 0) {
            const quizItemsToRender = (readingMode === 'steps' && story.quiz[currentStepIdx])
                ? [story.quiz[currentStepIdx]]
                : story.quiz;
            const quizCard = createQuizSection(quizItemsToRender);
            if (readingMode === 'steps') {
                quizCard.hidden = !isActiveSectionUnlocked;
                activeQuizCard = quizCard;
            }
            readerWrapper.appendChild(quizCard);
        }

        // Optional Advanced Feature: Fairy Tale Idioms Challenge Banner (kun i sidste / 3. del)
        const isLastStepOrAll = (readingMode !== 'steps') || (currentStepIdx === story.sections.length - 1);
        if (story.talemaaderChallenge && isLastStepOrAll) {
            const talemaaderBanner = document.createElement('div');
            talemaaderBanner.className = 'hc-talemaader-invitation-card';
            talemaaderBanner.innerHTML = `
                
                <div class="invitation-body">
                    <div class="invitation-badge">${isEn ? 'Optional Challenge • Advanced (B1/B2)' : 'Valgfri udfordring • For avancerede kursister (B1/B2)'}</div>
                    <h3 class="invitation-title">${isEn ? story.talemaaderChallenge.titleEn || story.talemaaderChallenge.title : story.talemaaderChallenge.title}</h3>
                    <p class="invitation-desc">${isEn ? story.talemaaderChallenge.descEn || story.talemaaderChallenge.desc : story.talemaaderChallenge.desc}</p>
                </div>
                <button type="button" class="invitation-start-btn">
                    <span>${isEn ? 'Explore Idioms' : 'Start talemåderne'}</span>
                    <span>→</span>
                </button>
            `;
            talemaaderBanner.querySelector('.invitation-start-btn').onclick = () => {
                stopSpeech();
                activeStorySubView = 'talemaader';
                renderView();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            readerWrapper.appendChild(talemaaderBanner);
        }

        // Bottom Actions (Back to list + diskret Hovedsiden-knap)
        const bottomNav = document.createElement('div');
        bottomNav.className = 'hc-bottom-nav';

        const backToListBtn = document.createElement('button');
        backToListBtn.className = 'back-to-list-btn';
        backToListBtn.innerHTML = `← ${isEn ? 'Back to All Fairy Tales' : 'Tilbage til alle eventyr'}`;
        backToListBtn.onclick = () => {
            stopSpeech();
            activeStoryId = null;
            currentStepIdx = 0;
            renderView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        bottomNav.appendChild(backToListBtn);

        const homeBtn = document.createElement('button');
        homeBtn.type = 'button';
        homeBtn.className = 'back-to-list-btn hc-home-nav-btn';
        homeBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/>
            </svg>
            <span>${isEn ? 'Home' : 'Hovedsiden'}</span>
        `;
        homeBtn.onclick = () => {
            stopSpeech();
            navigateFn('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        bottomNav.appendChild(homeBtn);

        readerWrapper.appendChild(bottomNav);

        mainContent.appendChild(readerWrapper);
    }

    function createSectionTasks(section, index, onCategoryChange, onGuideToNextSentence) {
        if (!section.tasks) return null;

        const categories = [
            { key: 'detektiv', label: isEn ? 'Visual Detective' : 'Visuel detektiv', iconSvg: SVG_SEARCH, color: '#38bdf8' },
            {
                key: 'substantiver',
                label: isEn ? 'Nouns' : 'Substantiver',
                subLabel: section.tasks.substantiver?.badge || 'Ubestemt & bestemt',
                dotColor: '#22c55e'
            },
            { key: 'verber', label: isEn ? 'Verbs' : 'Verber', subLabel: 'Tider & modsætninger', dotColor: '#ef4444' },
            { key: 'adjektiver', label: isEn ? 'Adjectives' : 'Adjektiver', subLabel: 'Modsætninger & grader', dotColor: '#f97316' },
            { key: 'adverbier', label: isEn ? 'Adverbs' : 'Adverbier', subLabel: 'Grader & synonymer', dotColor: '#38bdf8' },
            { key: 'pronominer', label: isEn ? 'Pronouns' : 'Pronominer', subLabel: 'Subjekt & objekt', dotColor: '#ec4899' }
        ].filter(cat => section.tasks[cat.key] && section.tasks[cat.key].questions && section.tasks[cat.key].questions.length > 0);

        if (categories.length === 0) return null;

        const tasksWrap = document.createElement('div');
        tasksWrap.className = 'hc-section-tasks';

        let activeCatKey = categories[0].key;
        let activeVerbTense = null; // null | 'datid' | 'foernutid' | 'nutid' | 'fremtid'
        let activeNounForm = null; // null | 'ubestemt' | 'bestemt'
        let activePronounCase = null; // null | 'subjekt' | 'objekt'
        let activeAdjForm = null; // null | 'grundform' | 'e_form' | 'grad'
        let activeAdvType = null; // null | 'sted' | 'tid' | 'grad_maade' | 'smaaord'
        const currentQuestionIdx = {};
        const catScores = {};
        const userAnswers = {};
        const shuffledOptionsMap = {};

        function getShuffledQuestion(catKey, idx, q) {
            const cacheKey = `${catKey}_${idx}`;
            if (!shuffledOptionsMap[cacheKey] && Array.isArray(q.options)) {
                const indices = q.options.map((_, i) => i);
                for (let i = indices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [indices[i], indices[j]] = [indices[j], indices[i]];
                }
                shuffledOptionsMap[cacheKey] = {
                    options: indices.map(origIdx => q.options[origIdx]),
                    correct: indices.indexOf(q.correct)
                };
            }
            return shuffledOptionsMap[cacheKey] || { options: q.options || [], correct: q.correct };
        }

        categories.forEach(c => {
            currentQuestionIdx[c.key] = 0;
            catScores[c.key] = 0;
            userAnswers[c.key] = {};
        });

        let currentRevealedCount = 1;
        let isAllLinesMode = false;
        const totalLines = (section.dialogue && section.dialogue.length > 0) ? section.dialogue.length : 1;

        function getUnlockedQuestions(catKey) {
            const cat = section.tasks[catKey];
            if (!cat || !cat.questions) return [];
            if (isAllLinesMode || currentRevealedCount >= totalLines) {
                return cat.questions;
            }
            return cat.questions.filter(q => !q.line || q.line <= currentRevealedCount);
        }

        // Top Header
        const tasksHeader = document.createElement('div');
        tasksHeader.className = 'hc-tasks-header';

        function renderHeader() {
            tasksHeader.innerHTML = `
                <div>
                    <div class="hc-tasks-title">
                        <span>${isEn ? 'Scene Exercises & Detective' : 'Opgaver til scenen'}</span>
                    </div>
                    <div class="hc-tasks-subtitle">${isEn ? 'Practice words and sentence parts from this scene:' : 'Træn ord, ordklasser og sætningsdele fra denne scene:'}</div>
                </div>
            `;
        }
        renderHeader();
        tasksWrap.appendChild(tasksHeader);

        // 2-lags omskifter i Scene 1: 1. Ord (ordklasser) vs. 2. Sætningsdele (byggeklodser)
        const layer1Wrap = document.createElement('div');
        layer1Wrap.className = 'hc-tasks-layer-1';
        let layer2Wrap = null;

        if (index === 0) {
            const layerSwitch = document.createElement('div');
            layerSwitch.className = 'hc-task-layer-switch';
            layerSwitch.innerHTML = `
                <button type="button" class="hc-task-layer-btn active" data-layer="1">${isEn ? '1. Words' : '1. Ord'}</button>
                <button type="button" class="hc-task-layer-btn" data-layer="2">${isEn ? '2. Sentence Parts' : '2. Sætningsdele'}</button>
            `;

            layer2Wrap = document.createElement('div');
            layer2Wrap.className = 'hc-tasks-layer-2';
            layer2Wrap.hidden = true;
            layer2Wrap.appendChild(createSentencePartsLab());

            layerSwitch.querySelectorAll('.hc-task-layer-btn').forEach(btn => {
                btn.onclick = () => {
                    const chosen = btn.dataset.layer;
                    layerSwitch.querySelectorAll('.hc-task-layer-btn').forEach(b => b.classList.toggle('active', b === btn));
                    layer1Wrap.hidden = (chosen !== '1');
                    layer2Wrap.hidden = (chosen !== '2');
                };
            });

            tasksWrap.appendChild(layerSwitch);
        }

        // Tab buttons container
        const tabsRow = document.createElement('div');
        tabsRow.className = 'hc-task-tabs';

        const tabButtons = {};
        function updateTabButtons() {
            categories.forEach(cat => {
                const btn = tabButtons[cat.key];
                if (!btn) return;
                const unlocked = getUnlockedQuestions(cat.key);
                const total = section.tasks[cat.key].questions.length;
                const iconHtml = cat.iconSvg || `<span class="hc-tab-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${cat.dotColor};"></span>`;
                btn.innerHTML = `
                    <span>${iconHtml}</span>
                    <span>${cat.label}</span>
                    <span class="hc-task-tab-count">(${unlocked.length}/${total})</span>
                `;
            });
        }

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `hc-task-tab-btn tab-${cat.key} ${cat.key === activeCatKey ? 'active' : ''}`;
            const unlocked = getUnlockedQuestions(cat.key);
            const total = section.tasks[cat.key].questions.length;
            const iconHtml = cat.iconSvg || `<span class="hc-tab-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${cat.dotColor};"></span>`;
            btn.innerHTML = `
                <span>${iconHtml}</span>
                <span>${cat.label}</span>
                <span class="hc-task-tab-count">(${unlocked.length}/${total})</span>
            `;
            btn.onclick = () => {
                activeCatKey = cat.key;
                const parentCard = tasksWrap.closest('.hc-section-card');
                if (activeCatKey !== 'verber') {
                    activeVerbTense = null;
                    if (parentCard) delete parentCard.dataset.verbTenseFilter;
                }
                if (activeCatKey !== 'substantiver') {
                    activeNounForm = null;
                    if (parentCard) delete parentCard.dataset.nounFormFilter;
                }
                if (activeCatKey !== 'pronominer') {
                    activePronounCase = null;
                    if (parentCard) delete parentCard.dataset.pronounCaseFilter;
                }
                if (activeCatKey !== 'adjektiver') {
                    activeAdjForm = null;
                    if (parentCard) delete parentCard.dataset.adjFormFilter;
                }
                if (activeCatKey !== 'adverbier') {
                    activeAdvType = null;
                    if (parentCard) delete parentCard.dataset.advTypeFilter;
                }
                Object.keys(tabButtons).forEach(k => {
                    tabButtons[k].classList.toggle('active', k === activeCatKey);
                });
                if (onCategoryChange) {
                    onCategoryChange(activeCatKey);
                }
                renderActivePanel();
            };
            tabButtons[cat.key] = btn;
            tabsRow.appendChild(btn);
        });
        layer1Wrap.appendChild(tabsRow);

        tasksWrap.switchCategory = (key) => {
            if (tabButtons[key]) {
                tabButtons[key].click();
            }
        };

        // Panel holder
        const panelHolder = document.createElement('div');
        panelHolder.className = 'hc-task-panel-holder';
        layer1Wrap.appendChild(panelHolder);
        tasksWrap.appendChild(layer1Wrap);
        if (layer2Wrap) {
            tasksWrap.appendChild(layer2Wrap);
        }

        function renderVerbTenseDiagram() {
            const parentCard = tasksWrap.closest('.hc-section-card');
            const tenses = [
                {
                    id: 'datid',
                    label: isEn ? 'Past (Datid)' : 'Datid',
                    desc: isEn ? 'Finished in the past — the main storytelling tense.' : 'Afsluttet i fortiden — eventyrets fortælletid (var, havde, fortalte, sagde, red).'
                },
                {
                    id: 'foernutid',
                    label: isEn ? 'Present perfect (Førnutid)' : 'Førnutid',
                    desc: isEn ? 'Happened before, still relevant NOW (har sagt).' : 'Sket før, men gælder stadig NU (har sagt).'
                },
                {
                    id: 'nutid',
                    label: isEn ? 'Present (Nutid)' : 'Nutid',
                    desc: isEn ? 'Happening right now or inside direct speech (tager, taler, vinder, er).' : 'Sker lige nu — bruges i replikkerne (tager, taler, vinder, er, får).'
                },
                {
                    id: 'fremtid',
                    label: isEn ? '(Future)' : '(Fremtid)',
                    desc: isEn ? 'Plan or intention ahead — Danish uses "skal" / "vil" (skal finde, vil gå).' : 'Plan eller vilje fremad — dansk bruger "skal" eller "vil" (skal finde, vil).'
                }
            ];

            const activeInfo = tenses.find(t => t.id === activeVerbTense);
            const matchedInText = [];
            if (parentCard && activeVerbTense) {
                parentCard.querySelectorAll(`.hc-word-token[data-verb-tense="${activeVerbTense}"]`).forEach(el => {
                    const txt = el.textContent.trim();
                    if (txt && !matchedInText.includes(txt)) matchedInText.push(txt);
                });
            }

            const box = document.createElement('div');
            box.className = 'hc-tense-diagram';
            box.innerHTML = `
                <div class="hc-tense-diagram-head">
                    <div class="hc-tense-diagram-title">${isEn ? 'Verb Tenses in This Scene' : 'Verbernes tider i scenen'}</div>
                    <span class="hc-tense-diagram-hint">${isEn ? 'Click a tense to highlight it in the text above' : 'Klik på en tid for at se den i teksten ovenfor'}</span>
                </div>
                <svg class="hc-tense-svg" viewBox="0 0 560 96" role="img" aria-label="Tidslinje for datid, førnutid, nutid og fremtid">
                    <!-- Grund-tidslinje -->
                    <line x1="28" y1="54" x2="522" y2="54" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
                    <polygon points="520,48 534,54 520,60" fill="#475569"/>
                    <!-- NU-linje -->
                    <line x1="360" y1="22" x2="360" y2="76" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3"/>
                    <text x="360" y="15" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="700">NU</text>

                    <!-- 1. Datid -->
                    <circle cx="96" cy="54" r="${activeVerbTense === 'datid' ? 11 : 8}" fill="${activeVerbTense === 'datid' ? '#ef4444' : '#334155'}" stroke="${activeVerbTense === 'datid' ? '#fca5a5' : '#64748b'}" stroke-width="2.5"/>
                    <text x="96" y="84" text-anchor="middle" fill="${activeVerbTense === 'datid' ? '#fca5a5' : '#94a3b8'}" font-size="11" font-weight="700">Datid</text>

                    <!-- 2. Førnutid (bro fra før til NU) -->
                    <path d="M 192 54 Q 274 20 352 48" fill="none" stroke="${activeVerbTense === 'foernutid' ? '#ef4444' : '#475569'}" stroke-width="${activeVerbTense === 'foernutid' ? 3.5 : 2.5}" stroke-linecap="round"/>
                    <polygon points="347,42 358,50 345,52" fill="${activeVerbTense === 'foernutid' ? '#ef4444' : '#475569'}"/>
                    <circle cx="192" cy="54" r="${activeVerbTense === 'foernutid' ? 9 : 6.5}" fill="${activeVerbTense === 'foernutid' ? '#ef4444' : '#334155'}" stroke="${activeVerbTense === 'foernutid' ? '#fca5a5' : '#64748b'}" stroke-width="2"/>
                    <text x="242" y="84" text-anchor="middle" fill="${activeVerbTense === 'foernutid' ? '#fca5a5' : '#94a3b8'}" font-size="11" font-weight="700">Førnutid</text>

                    <!-- 3. Nutid (NU) -->
                    <circle cx="360" cy="54" r="${activeVerbTense === 'nutid' ? 11 : 8}" fill="${activeVerbTense === 'nutid' ? '#ef4444' : '#2b6e78'}" stroke="${activeVerbTense === 'nutid' ? '#fca5a5' : '#7ec4ce'}" stroke-width="2.5"/>
                    <text x="360" y="84" text-anchor="middle" fill="${activeVerbTense === 'nutid' ? '#fca5a5' : '#cbd5e1'}" font-size="11" font-weight="700">Nutid</text>

                    <!-- 4. (Fremtid) -->
                    <line x1="374" y1="54" x2="478" y2="54" stroke="${activeVerbTense === 'fremtid' ? '#ef4444' : '#475569'}" stroke-width="${activeVerbTense === 'fremtid' ? 3.5 : 2.5}" stroke-dasharray="6,4"/>
                    <circle cx="486" cy="54" r="${activeVerbTense === 'fremtid' ? 10 : 7.5}" fill="${activeVerbTense === 'fremtid' ? '#ef4444' : 'none'}" stroke="${activeVerbTense === 'fremtid' ? '#fca5a5' : '#64748b'}" stroke-width="2.5"/>
                    <text x="480" y="84" text-anchor="middle" fill="${activeVerbTense === 'fremtid' ? '#fca5a5' : '#94a3b8'}" font-size="11" font-weight="700">(Fremtid)</text>
                </svg>
                <div class="hc-tense-btns">
                    ${tenses.map(t => `
                        <button type="button" class="hc-tense-btn ${activeVerbTense === t.id ? 'active' : ''}" data-tense-pick="${t.id}">${t.label}</button>
                    `).join('')}
                    ${activeVerbTense ? `<button type="button" class="hc-tense-btn hc-tense-clear" data-tense-pick="">${isEn ? 'Show all' : 'Vis alle'}</button>` : ''}
                </div>
                ${activeInfo ? `
                    <div class="hc-tense-explain">
                        <span>${activeInfo.desc}</span>
                        ${matchedInText.length > 0 ? `<div class="hc-tense-found"><strong>${isEn ? 'In text above:' : 'I teksten ovenfor:'}</strong> ${matchedInText.join(', ')}</div>` : ''}
                    </div>
                ` : ''}
            `;

            box.querySelectorAll('[data-tense-pick]').forEach(btn => {
                btn.onclick = () => {
                    const picked = btn.dataset.tensePick || null;
                    activeVerbTense = (activeVerbTense === picked) ? null : picked;
                    const cardEl = tasksWrap.closest('.hc-section-card');
                    if (cardEl) {
                        if (activeVerbTense) {
                            cardEl.dataset.activeHighlight = 'verber';
                            cardEl.dataset.verbTenseFilter = activeVerbTense;
                        } else {
                            delete cardEl.dataset.verbTenseFilter;
                        }
                    }
                    renderActivePanel();
                };
            });

            return box;
        }

        function renderNounDefinitenessDiagram() {
            const parentCard = tasksWrap.closest('.hc-section-card');
            const forms = [
                {
                    id: 'ubestemt',
                    label: isEn ? 'Indefinite (en / et)' : 'Ubestemt (en / et)',
                    desc: isEn
                        ? 'Used when something is NEW in the story or one of many (en gård, en hest, en ged, et slot).'
                        : 'Bruges når noget er NYT i historien eller én blandt flere — kendeordet står FORAN (en gård, en hest, en ged, et slot).'
                },
                {
                    id: 'bestemt',
                    label: isEn ? 'Definite (-en / -et / -ne)' : 'Bestemt (-en / -et / -ne)',
                    desc: isEn
                        ? 'Used when we KNOW exactly which one — the article moves to the END (gården, geden, slottet, Kongen, Faren).'
                        : 'Bruges når vi KENDER tingen/personen — kendeordet flytter OM BAG ordet (gården, geden, slottet, Kongen, Faren, vejen).'
                }
            ];

            const activeInfo = forms.find(f => f.id === activeNounForm);
            const matchedInText = [];
            if (parentCard && activeNounForm) {
                parentCard.querySelectorAll(`.hc-word-token[data-noun-form="${activeNounForm}"]`).forEach(el => {
                    const txt = el.textContent.trim();
                    if (txt && !matchedInText.includes(txt)) matchedInText.push(txt);
                });
            }

            const isUbestemt = activeNounForm === 'ubestemt';
            const isBestemt = activeNounForm === 'bestemt';

            const box = document.createElement('div');
            box.className = 'hc-tense-diagram hc-noun-diagram';
            box.innerHTML = `
                <div class="hc-tense-diagram-head">
                    <div class="hc-tense-diagram-title">${isEn ? 'Nouns: Indefinite vs. Definite' : 'Substantiver: Ubestemt vs. bestemt'}</div>
                    <span class="hc-tense-diagram-hint">${isEn ? 'Click a form to highlight it in the text above' : 'Klik på en form for at se den i teksten ovenfor'}</span>
                </div>
                <svg class="hc-tense-svg" viewBox="0 0 560 128" role="img" aria-label="Visuel forskel på ubestemt (en gård) og bestemt (gården)">
                    <!-- VENSTRE: UBESTEMT (én blandt flere) -->
                    <rect x="10" y="8" width="234" height="112" rx="10"
                        fill="${isUbestemt ? 'rgba(34, 197, 94, 0.14)' : '#151a21'}"
                        stroke="${isUbestemt ? '#22c55e' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isUbestemt ? '2' : '1.2'}"/>
                    <text x="127" y="26" text-anchor="middle" fill="${isUbestemt ? '#86efac' : '#cbd5e1'}" font-size="11.5" font-weight="800">UBESTEMT</text>
                    <text x="127" y="40" text-anchor="middle" fill="#94a3b8" font-size="9.5">${isEn ? 'One of several / new' : 'Én blandt flere / ny'}</text>

                    <!-- 3 små huse (én løst markeret med stiplet cirkel) -->
                    <g transform="translate(46, 52)">
                        <path d="M 12 4 L 24 14 L 24 26 L 0 26 L 0 14 Z" fill="none" stroke="#475569" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M 52 4 L 64 14 L 64 26 L 40 26 L 40 14 Z" fill="${isUbestemt ? 'rgba(34,197,94,0.22)' : 'rgba(148,163,184,0.14)'}" stroke="${isUbestemt ? '#4ade80' : '#94a3b8'}" stroke-width="1.8" stroke-linejoin="round"/>
                        <circle cx="52" cy="16" r="17" fill="none" stroke="${isUbestemt ? '#4ade80' : '#64748b'}" stroke-width="1.5" stroke-dasharray="3,3"/>
                        <path d="M 92 4 L 104 14 L 104 26 L 80 26 L 80 14 Z" fill="none" stroke="#475569" stroke-width="1.6" stroke-linejoin="round"/>
                    </g>

                    <!-- Struktur-pille venstre: [en] + gård -->
                    <rect x="34" y="92" width="32" height="20" rx="5" fill="${isUbestemt ? '#22c55e' : '#1e293b'}" stroke="${isUbestemt ? '#86efac' : '#475569'}" stroke-width="1.2"/>
                    <text x="50" y="106" text-anchor="middle" fill="${isUbestemt ? '#052e16' : '#86efac'}" font-size="11" font-weight="800">en</text>
                    <text x="74" y="106" text-anchor="middle" fill="#64748b" font-size="11" font-weight="700">+</text>
                    <text x="100" y="106" text-anchor="middle" fill="#f1f5f9" font-size="11.5" font-weight="700">gård</text>
                    <text x="131" y="106" text-anchor="middle" fill="#475569" font-size="11">|</text>
                    <rect x="142" y="92" width="28" height="20" rx="5" fill="${isUbestemt ? '#22c55e' : '#1e293b'}" stroke="${isUbestemt ? '#86efac' : '#475569'}" stroke-width="1.2"/>
                    <text x="156" y="106" text-anchor="middle" fill="${isUbestemt ? '#052e16' : '#86efac'}" font-size="11" font-weight="800">et</text>
                    <text x="178" y="106" text-anchor="middle" fill="#64748b" font-size="11" font-weight="700">+</text>
                    <text x="202" y="106" text-anchor="middle" fill="#f1f5f9" font-size="11.5" font-weight="700">slot</text>

                    <!-- MIDTE: Pil der viser at en/et flytter om bagved -->
                    <line x1="252" y1="64" x2="296" y2="64" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
                    <polygon points="294,58 308,64 294,70" fill="#22c55e"/>
                    <text x="280" y="52" text-anchor="middle" fill="#86efac" font-size="9.5" font-weight="700">-en / -et</text>
                    <text x="280" y="82" text-anchor="middle" fill="#64748b" font-size="9">${isEn ? 'moves back' : 'bag på'}</text>

                    <!-- HØJRE: BESTEMT (præcis den vi kender) -->
                    <rect x="316" y="8" width="234" height="112" rx="10"
                        fill="${isBestemt ? 'rgba(34, 197, 94, 0.14)' : '#151a21'}"
                        stroke="${isBestemt ? '#22c55e' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isBestemt ? '2' : '1.2'}"/>
                    <text x="433" y="26" text-anchor="middle" fill="${isBestemt ? '#86efac' : '#cbd5e1'}" font-size="11.5" font-weight="800">BESTEMT</text>
                    <text x="433" y="40" text-anchor="middle" fill="#94a3b8" font-size="9.5">${isEn ? 'The specific one we know' : 'Den bestemte, vi kender'}</text>

                    <!-- 1 tydeligt fokuseret hus med pil ned på det -->
                    <g transform="translate(415, 48)">
                        <polygon points="18,0 13,6 23,6" fill="#22c55e"/>
                        <rect x="-4" y="8" width="44" height="28" rx="6" fill="rgba(34,197,94,0.16)" stroke="#22c55e" stroke-width="1.6"/>
                        <path d="M 18 11 L 31 21 L 31 33 L 5 33 L 5 21 Z" fill="rgba(34,197,94,0.35)" stroke="#86efac" stroke-width="1.8" stroke-linejoin="round"/>
                    </g>

                    <!-- Struktur-pille højre: gård + [en] -->
                    <text x="358" y="106" text-anchor="middle" fill="#f1f5f9" font-size="11.5" font-weight="700">gård</text>
                    <rect x="378" y="92" width="32" height="20" rx="5" fill="${isBestemt ? '#22c55e' : '#1e293b'}" stroke="${isBestemt ? '#86efac' : '#22c55e'}" stroke-width="1.2"/>
                    <text x="394" y="106" text-anchor="middle" fill="${isBestemt ? '#052e16' : '#86efac'}" font-size="11" font-weight="800">-en</text>
                    <text x="424" y="106" text-anchor="middle" fill="#475569" font-size="11">|</text>
                    <text x="454" y="106" text-anchor="middle" fill="#f1f5f9" font-size="11.5" font-weight="700">slott</text>
                    <rect x="476" y="92" width="32" height="20" rx="5" fill="${isBestemt ? '#22c55e' : '#1e293b'}" stroke="${isBestemt ? '#86efac' : '#22c55e'}" stroke-width="1.2"/>
                    <text x="492" y="106" text-anchor="middle" fill="${isBestemt ? '#052e16' : '#86efac'}" font-size="11" font-weight="800">-et</text>
                </svg>
                <div class="hc-tense-btns">
                    ${forms.map(f => `
                        <button type="button" class="hc-tense-btn hc-noun-btn ${activeNounForm === f.id ? 'active' : ''}" data-noun-pick="${f.id}">${f.label}</button>
                    `).join('')}
                    ${activeNounForm ? `<button type="button" class="hc-tense-btn hc-tense-clear" data-noun-pick="">${isEn ? 'Show all' : 'Vis alle'}</button>` : ''}
                </div>
                ${activeInfo ? `
                    <div class="hc-tense-explain hc-noun-explain">
                        <span>${activeInfo.desc}</span>
                        ${matchedInText.length > 0 ? `<div class="hc-tense-found hc-noun-found"><strong>${isEn ? 'In text above:' : 'I teksten ovenfor:'}</strong> ${matchedInText.join(', ')}</div>` : ''}
                    </div>
                ` : ''}
            `;

            box.querySelectorAll('[data-noun-pick]').forEach(btn => {
                btn.onclick = () => {
                    const picked = btn.dataset.nounPick || null;
                    activeNounForm = (activeNounForm === picked) ? null : picked;
                    const cardEl = tasksWrap.closest('.hc-section-card');
                    if (cardEl) {
                        if (activeNounForm) {
                            cardEl.dataset.activeHighlight = 'substantiver';
                            cardEl.dataset.nounFormFilter = activeNounForm;
                        } else {
                            delete cardEl.dataset.nounFormFilter;
                        }
                    }
                    renderActivePanel();
                };
            });

            return box;
        }

        function renderPronounCaseDiagram() {
            const parentCard = tasksWrap.closest('.hc-section-card');
            const cases = [
                {
                    id: 'subjekt',
                    label: isEn ? 'Subject (jeg, du, han, hun, vi, I, de)' : 'Subjekt (jeg, du, han, hun, vi, I, de)',
                    desc: isEn
                        ? 'The DOER of the action — usually stands before or right next to the verb (Jeg taler, Han red, Hun ser).'
                        : 'Den, der GØR handlingen i sætningen — f.eks. Jeg taler, Han red, Hun vil, Du får, De lo.'
                },
                {
                    id: 'objekt',
                    label: isEn ? 'Object (mig, dig, ham, hende, os, jer, dem)' : 'Objekt (mig, dig, ham, hende, os, jer, dem)',
                    desc: isEn
                        ? 'The RECEIVER of the action — stands after the verb or a preposition (giv mig, lo af ham, vinder hende, fortalte dem).'
                        : 'Den, handlingen RAMMER (eller efter et forholdsord) — f.eks. giv mig, lo af ham, vinder hende, fortalte dem.'
                }
            ];

            const activeInfo = cases.find(c => c.id === activePronounCase);
            const matchedInText = [];
            if (parentCard && activePronounCase) {
                parentCard.querySelectorAll(`.hc-word-token[data-pronoun-case="${activePronounCase}"]`).forEach(el => {
                    const txt = el.textContent.trim();
                    if (txt && !matchedInText.includes(txt)) matchedInText.push(txt);
                });
            }

            const isSubj = activePronounCase === 'subjekt';
            const isObj = activePronounCase === 'objekt';

            const box = document.createElement('div');
            box.className = 'hc-tense-diagram hc-pro-diagram';
            box.innerHTML = `
                <div class="hc-tense-diagram-head">
                    <div class="hc-tense-diagram-title">${isEn ? 'Pronouns: Subject vs. Object' : 'Pronominer: Subjekt vs. objekt'}</div>
                    <span class="hc-tense-diagram-hint">${isEn ? 'Click a form to highlight it in the text above' : 'Klik på en form for at se den i teksten ovenfor'}</span>
                </div>
                <svg class="hc-tense-svg" viewBox="0 0 560 132" role="img" aria-label="Visuel forskel på subjektform og objektform af pronominer">
                    <!-- VENSTRE: SUBJEKT (Den der gør noget) -->
                    <rect x="8" y="8" width="218" height="116" rx="10"
                        fill="${isSubj ? 'rgba(236, 72, 153, 0.16)' : '#151a21'}"
                        stroke="${isSubj ? '#ec4899' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isSubj ? '2' : '1.2'}"/>
                    <text x="117" y="26" text-anchor="middle" fill="${isSubj ? '#f9a8d4' : '#cbd5e1'}" font-size="11.5" font-weight="800">SUBJEKT</text>
                    <text x="117" y="40" text-anchor="middle" fill="#94a3b8" font-size="9.5">${isEn ? 'The doer (WHO acts)' : 'Den, der GØR noget'}</text>

                    <!-- Person-ikon (udfører handling) -->
                    <g transform="translate(99, 46)">
                        <circle cx="18" cy="9" r="6" fill="${isSubj ? '#ec4899' : '#334155'}" stroke="${isSubj ? '#f9a8d4' : '#94a3b8'}" stroke-width="1.6"/>
                        <path d="M 7 26 C 7 18, 29 18, 29 26" fill="none" stroke="${isSubj ? '#f9a8d4' : '#94a3b8'}" stroke-width="2" stroke-linecap="round"/>
                        <path d="M 30 14 L 38 14" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/>
                        <polygon points="36,11 42,14 36,17" fill="#ec4899"/>
                    </g>

                    <!-- Former + eksempel -->
                    <text x="117" y="90" text-anchor="middle" fill="${isSubj ? '#fbcfe8' : '#e2e8f0'}" font-size="10.5" font-weight="700">jeg · du · han · hun · vi · I · de</text>
                    <rect x="38" y="98" width="44" height="19" rx="5" fill="${isSubj ? '#ec4899' : '#1e293b'}" stroke="${isSubj ? '#fbcfe8' : '#ec4899'}" stroke-width="1.2"/>
                    <text x="60" y="111" text-anchor="middle" fill="${isSubj ? '#ffffff' : '#f9a8d4'}" font-size="10.5" font-weight="800">Han</text>
                    <text x="134" y="111" text-anchor="middle" fill="#94a3b8" font-size="10.5">ser / hjælper ...</text>

                    <!-- MIDTE: HANDLING (VERBUM-PIL) -->
                    <line x1="232" y1="64" x2="316" y2="64" stroke="#ec4899" stroke-width="2.5" stroke-linecap="round"/>
                    <polygon points="314,58 328,64 314,70" fill="#ec4899"/>
                    <rect x="242" y="42" width="76" height="18" rx="9" fill="#1e293b" stroke="rgba(236, 72, 153, 0.45)" stroke-width="1"/>
                    <text x="280" y="54" text-anchor="middle" fill="#f9a8d4" font-size="9.5" font-weight="700">VERBUM</text>
                    <text x="280" y="81" text-anchor="middle" fill="#64748b" font-size="9">${isEn ? 'action →' : 'handling →'}</text>

                    <!-- HØJRE: OBJEKT (Den handlingen rammer) -->
                    <rect x="334" y="8" width="218" height="116" rx="10"
                        fill="${isObj ? 'rgba(236, 72, 153, 0.16)' : '#151a21'}"
                        stroke="${isObj ? '#ec4899' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isObj ? '2' : '1.2'}"/>
                    <text x="443" y="26" text-anchor="middle" fill="${isObj ? '#f9a8d4' : '#cbd5e1'}" font-size="11.5" font-weight="800">OBJEKT</text>
                    <text x="443" y="40" text-anchor="middle" fill="#94a3b8" font-size="9.5">${isEn ? 'The receiver (WHOM it hits)' : 'Den, handlingen RAMMER'}</text>

                    <!-- Person-ikon (modtager handling med mål-ring) -->
                    <g transform="translate(425, 46)">
                        <circle cx="18" cy="15" r="15" fill="none" stroke="${isObj ? '#f472b6' : '#475569'}" stroke-width="1.4" stroke-dasharray="3,2"/>
                        <circle cx="18" cy="9" r="6" fill="${isObj ? '#ec4899' : '#334155'}" stroke="${isObj ? '#f9a8d4' : '#94a3b8'}" stroke-width="1.6"/>
                        <path d="M 7 26 C 7 18, 29 18, 29 26" fill="none" stroke="${isObj ? '#f9a8d4' : '#94a3b8'}" stroke-width="2" stroke-linecap="round"/>
                    </g>

                    <!-- Former + eksempel -->
                    <text x="443" y="90" text-anchor="middle" fill="${isObj ? '#fbcfe8' : '#e2e8f0'}" font-size="10" font-weight="700">mig · dig · ham · hende · os · jer · dem</text>
                    <text x="394" y="111" text-anchor="middle" fill="#94a3b8" font-size="10.5">... ser / lo af</text>
                    <rect x="446" y="98" width="52" height="19" rx="5" fill="${isObj ? '#ec4899' : '#1e293b'}" stroke="${isObj ? '#fbcfe8' : '#ec4899'}" stroke-width="1.2"/>
                    <text x="472" y="111" text-anchor="middle" fill="${isObj ? '#ffffff' : '#f9a8d4'}" font-size="10.5" font-weight="800">ham</text>
                </svg>
                <div class="hc-tense-btns">
                    ${cases.map(c => `
                        <button type="button" class="hc-tense-btn hc-pro-btn ${activePronounCase === c.id ? 'active' : ''}" data-pro-pick="${c.id}">${c.label}</button>
                    `).join('')}
                    ${activePronounCase ? `<button type="button" class="hc-tense-btn hc-tense-clear" data-pro-pick="">${isEn ? 'Show all' : 'Vis alle'}</button>` : ''}
                </div>
                ${activeInfo ? `
                    <div class="hc-tense-explain hc-pro-explain">
                        <span>${activeInfo.desc}</span>
                        ${matchedInText.length > 0 ? `<div class="hc-tense-found hc-pro-found"><strong>${isEn ? 'In text above:' : 'I teksten ovenfor:'}</strong> ${matchedInText.join(', ')}</div>` : ''}
                    </div>
                ` : ''}
            `;

            box.querySelectorAll('[data-pro-pick]').forEach(btn => {
                btn.onclick = () => {
                    const picked = btn.dataset.proPick || null;
                    activePronounCase = (activePronounCase === picked) ? null : picked;
                    const cardEl = tasksWrap.closest('.hc-section-card');
                    if (cardEl) {
                        if (activePronounCase) {
                            cardEl.dataset.activeHighlight = 'pronominer';
                            cardEl.dataset.pronounCaseFilter = activePronounCase;
                        } else {
                            delete cardEl.dataset.pronounCaseFilter;
                        }
                    }
                    renderActivePanel();
                };
            });

            return box;
        }

        function renderAdjectiveDiagram() {
            const parentCard = tasksWrap.closest('.hc-section-card');
            const forms = [
                {
                    id: 'grundform',
                    label: isEn ? 'Base form (gammel, klog, glad)' : 'Grundform (gammel, klog, glad)',
                    desc: isEn
                        ? 'Describes 1 person or thing in indefinite singular (en gammel gård, jeg er klog, altid glad).'
                        : 'Beskriver 1 ting eller person i ubestemt ental (en gammel gård, jeg er klog, altid glad, god).'
                },
                {
                    id: 'e_form',
                    label: isEn ? 'Plural / Definite (-e)' : 'Flertal / bestemt (-e)',
                    desc: isEn
                        ? 'Adjectives add -e in plural (tre kloge sønner, fine heste) or definite form (den gamle far).'
                        : 'Adjektiver får -e i flertal (tre kloge sønner, store ting, fine heste) eller bestemt form (den gamle far).'
                },
                {
                    id: 'grad',
                    label: isEn ? 'Comparison (god → bedre → bedst)' : 'Gradbøjning (bedst)',
                    desc: isEn
                        ? 'Compares degree: 1st step (god), 2nd step (bedre), highest step (bedst — "Den, som taler bedst").'
                        : 'Sammenligner grader: 1. trin (god), 2. trin (bedre), højeste trin (bedst — "Den, som taler bedst").'
                }
            ];

            const activeInfo = forms.find(f => f.id === activeAdjForm);
            const matchedInText = [];
            if (parentCard && activeAdjForm) {
                parentCard.querySelectorAll(`.hc-word-token[data-adj-form="${activeAdjForm}"]`).forEach(el => {
                    const txt = el.textContent.trim();
                    if (txt && !matchedInText.includes(txt)) matchedInText.push(txt);
                });
            }

            const isGrund = activeAdjForm === 'grundform';
            const isE = activeAdjForm === 'e_form';
            const isGrad = activeAdjForm === 'grad';

            const box = document.createElement('div');
            box.className = 'hc-tense-diagram hc-adj-diagram';
            box.innerHTML = `
                <div class="hc-tense-diagram-head">
                    <div class="hc-tense-diagram-title">${isEn ? 'Adjectives: Forms & Comparison' : 'Adjektiver: Bøjning & gradbøjning'}</div>
                    <span class="hc-tense-diagram-hint">${isEn ? 'Click a form to highlight it in the text above' : 'Klik på en form for at se den i teksten ovenfor'}</span>
                </div>
                <svg class="hc-tense-svg" viewBox="0 0 560 124" role="img" aria-label="Visuel oversigt over adjektivers grundform, flertal/bestemt med -e og gradbøjning">
                    <!-- 1. GRUNDFORM (1 ting/person) -->
                    <rect x="8" y="8" width="170" height="108" rx="10"
                        fill="${isGrund ? 'rgba(249, 115, 22, 0.16)' : '#151a21'}"
                        stroke="${isGrund ? '#f97316' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isGrund ? '2' : '1.2'}"/>
                    <text x="93" y="25" text-anchor="middle" fill="${isGrund ? '#fdba74' : '#cbd5e1'}" font-size="11" font-weight="800">GRUNDFORM</text>
                    <text x="93" y="38" text-anchor="middle" fill="#94a3b8" font-size="9">${isEn ? '1 person / thing' : '1 person / ting'}</text>
                    <circle cx="93" cy="60" r="11" fill="${isGrund ? 'rgba(249,115,22,0.3)' : '#1e293b'}" stroke="${isGrund ? '#fb923c' : '#64748b'}" stroke-width="1.8"/>
                    <text x="93" y="64" text-anchor="middle" fill="${isGrund ? '#ffedd5' : '#cbd5e1'}" font-size="11" font-weight="800">1</text>
                    <text x="93" y="92" text-anchor="middle" fill="#f1f5f9" font-size="10.5" font-weight="700">en gammel far</text>
                    <text x="93" y="106" text-anchor="middle" fill="#94a3b8" font-size="9.5">klog · glad · god</text>

                    <!-- 2. FLERTAL / BESTEMT (+e) -->
                    <rect x="195" y="8" width="170" height="108" rx="10"
                        fill="${isE ? 'rgba(249, 115, 22, 0.16)' : '#151a21'}"
                        stroke="${isE ? '#f97316' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isE ? '2' : '1.2'}"/>
                    <text x="280" y="25" text-anchor="middle" fill="${isE ? '#fdba74' : '#cbd5e1'}" font-size="11" font-weight="800">FLERTAL / BESTEMT</text>
                    <text x="280" y="38" text-anchor="middle" fill="#94a3b8" font-size="9">${isEn ? 'Adds -e' : 'Får endelsen -e'}</text>
                    <g transform="translate(242, 49)">
                        <circle cx="14" cy="11" r="8" fill="${isE ? 'rgba(249,115,22,0.28)' : '#1e293b'}" stroke="${isE ? '#fb923c' : '#64748b'}" stroke-width="1.5"/>
                        <circle cx="38" cy="11" r="8" fill="${isE ? 'rgba(249,115,22,0.28)' : '#1e293b'}" stroke="${isE ? '#fb923c' : '#64748b'}" stroke-width="1.5"/>
                        <circle cx="62" cy="11" r="8" fill="${isE ? 'rgba(249,115,22,0.28)' : '#1e293b'}" stroke="${isE ? '#fb923c' : '#64748b'}" stroke-width="1.5"/>
                    </g>
                    <text x="266" y="92" text-anchor="middle" fill="#f1f5f9" font-size="10.5" font-weight="700">tre klog</text>
                    <rect x="291" y="80" width="22" height="16" rx="4" fill="${isE ? '#f97316' : '#1e293b'}" stroke="${isE ? '#fed7aa' : '#f97316'}" stroke-width="1.2"/>
                    <text x="302" y="92" text-anchor="middle" fill="${isE ? '#ffffff' : '#fdba74'}" font-size="10.5" font-weight="800">-e</text>
                    <text x="280" y="106" text-anchor="middle" fill="#94a3b8" font-size="9.5">den gamle · fine</text>

                    <!-- 3. GRADBØJNING (3 trappetrin) -->
                    <rect x="382" y="8" width="170" height="108" rx="10"
                        fill="${isGrad ? 'rgba(249, 115, 22, 0.16)' : '#151a21'}"
                        stroke="${isGrad ? '#f97316' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isGrad ? '2' : '1.2'}"/>
                    <text x="467" y="25" text-anchor="middle" fill="${isGrad ? '#fdba74' : '#cbd5e1'}" font-size="11" font-weight="800">GRADBØJNING</text>
                    <text x="467" y="38" text-anchor="middle" fill="#94a3b8" font-size="9">${isEn ? '3 steps up' : '3 trin op'}</text>
                    <rect x="404" y="70" width="34" height="16" rx="3" fill="#1e293b" stroke="#64748b" stroke-width="1.2"/>
                    <rect x="448" y="58" width="38" height="28" rx="3" fill="#273244" stroke="#94a3b8" stroke-width="1.2"/>
                    <rect x="496" y="45" width="38" height="41" rx="3" fill="${isGrad ? '#f97316' : 'rgba(249,115,22,0.28)'}" stroke="${isGrad ? '#fed7aa' : '#fb923c'}" stroke-width="1.6"/>
                    <text x="421" y="101" text-anchor="middle" fill="#94a3b8" font-size="9.5" font-weight="700">god</text>
                    <text x="467" y="101" text-anchor="middle" fill="#cbd5e1" font-size="9.5" font-weight="700">bedre</text>
                    <text x="515" y="101" text-anchor="middle" fill="${isGrad ? '#fed7aa' : '#fb923c'}" font-size="10" font-weight="800">bedst</text>
                </svg>
                <div class="hc-tense-btns">
                    ${forms.map(f => `
                        <button type="button" class="hc-tense-btn hc-adj-btn ${activeAdjForm === f.id ? 'active' : ''}" data-adj-pick="${f.id}">${f.label}</button>
                    `).join('')}
                    ${activeAdjForm ? `<button type="button" class="hc-tense-btn hc-tense-clear" data-adj-pick="">${isEn ? 'Show all' : 'Vis alle'}</button>` : ''}
                </div>
                ${activeInfo ? `
                    <div class="hc-tense-explain hc-adj-explain">
                        <span>${activeInfo.desc}</span>
                        ${matchedInText.length > 0 ? `<div class="hc-tense-found hc-adj-found"><strong>${isEn ? 'In text above:' : 'I teksten ovenfor:'}</strong> ${matchedInText.join(', ')}</div>` : ''}
                    </div>
                ` : ''}
            `;

            box.querySelectorAll('[data-adj-pick]').forEach(btn => {
                btn.onclick = () => {
                    const picked = btn.dataset.adjPick || null;
                    activeAdjForm = (activeAdjForm === picked) ? null : picked;
                    const cardEl = tasksWrap.closest('.hc-section-card');
                    if (cardEl) {
                        if (activeAdjForm) {
                            cardEl.dataset.activeHighlight = 'adjektiver';
                            cardEl.dataset.adjFormFilter = activeAdjForm;
                        } else {
                            delete cardEl.dataset.adjFormFilter;
                        }
                    }
                    renderActivePanel();
                };
            });

            return box;
        }

        function renderAdverbDiagram() {
            const parentCard = tasksWrap.closest('.hc-section-card');
            const types = [
                {
                    id: 'sted',
                    label: isEn ? 'Place (ude, frem, af sted)' : 'Sted (ude, frem, af sted)',
                    desc: isEn
                        ? 'Answers WHERE or WHERE TO (Ude på landet, trådte frem, red af sted).'
                        : 'Svarer på HVOR eller HVORHEN (Ude på landet, der, trådte frem, red af sted).'
                },
                {
                    id: 'tid',
                    label: isEn ? 'Time (da, altid)' : 'Tid (da, altid)',
                    desc: isEn
                        ? 'Answers WHEN or HOW OFTEN (Da trådte mellembror frem, altid glad).'
                        : 'Svarer på HVORNÅR eller HVOR OFTE (Da trådte mellembror frem, altid glad).'
                },
                {
                    id: 'grad_maade',
                    label: isEn ? 'Degree & Manner (meget, stolt, højt)' : 'Grad & måde (meget, stolt, højt)',
                    desc: isEn
                        ? 'Answers HOW MUCH or HOW (så kloge, meget klog, sagde stolt, lo højt).'
                        : 'Svarer på HVOR MEGET eller HVORDAN — f.eks. "meget klog" (grad foran adjektiv), "sagde stolt", "lo højt".'
                },
                {
                    id: 'smaaord',
                    label: isEn ? 'Small words (ikke, også, alligevel)' : 'Småord (ikke, også, alligevel)',
                    desc: isEn
                        ? 'Small adverbs that negate or add nuance/attitude (ikke, også, alligevel).'
                        : 'Små biord der nægter eller giver nuancer til sætningen (ikke, også, alligevel).'
                }
            ];

            const activeInfo = types.find(t => t.id === activeAdvType);
            const matchedInText = [];
            if (parentCard && activeAdvType) {
                parentCard.querySelectorAll(`.hc-word-token[data-adv-type="${activeAdvType}"]`).forEach(el => {
                    const txt = el.textContent.trim();
                    if (txt && !matchedInText.includes(txt)) matchedInText.push(txt);
                });
            }

            const isSted = activeAdvType === 'sted';
            const isTid = activeAdvType === 'tid';
            const isGrad = activeAdvType === 'grad_maade';
            const isSmaa = activeAdvType === 'smaaord';

            const box = document.createElement('div');
            box.className = 'hc-tense-diagram hc-adv-diagram';
            box.innerHTML = `
                <div class="hc-tense-diagram-head">
                    <div class="hc-tense-diagram-title">${isEn ? 'Adverbs: 4 Jobs in the Sentence' : 'Adverbier: 4 roller i sætningen'}</div>
                    <span class="hc-tense-diagram-hint">${isEn ? 'Click a type to highlight it in the text above' : 'Klik på en type for at se den i teksten ovenfor'}</span>
                </div>
                <svg class="hc-tense-svg" viewBox="0 0 560 112" role="img" aria-label="Visuel oversigt over adverbier: sted, tid, grad og måde, og småord">
                    <!-- 1. STED -->
                    <rect x="6" y="8" width="128" height="96" rx="10"
                        fill="${isSted ? 'rgba(56, 189, 248, 0.16)' : '#151a21'}"
                        stroke="${isSted ? '#38bdf8' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isSted ? '2' : '1.2'}"/>
                    <path d="M 70 22 C 64 22, 60 26, 60 32 C 60 40, 70 48, 70 48 C 70 48, 80 40, 80 32 C 80 26, 76 22, 70 22 Z" fill="none" stroke="${isSted ? '#7dd3fc' : '#64748b'}" stroke-width="1.8"/>
                    <circle cx="70" cy="32" r="3" fill="${isSted ? '#38bdf8' : '#64748b'}"/>
                    <text x="70" y="66" text-anchor="middle" fill="${isSted ? '#bae6fd' : '#cbd5e1'}" font-size="11" font-weight="800">STED</text>
                    <text x="70" y="80" text-anchor="middle" fill="#94a3b8" font-size="9">Hvor / hvorhen?</text>
                    <text x="70" y="95" text-anchor="middle" fill="#7dd3fc" font-size="9.5" font-weight="700">ude · frem · af sted</text>

                    <!-- 2. TID -->
                    <rect x="146" y="8" width="128" height="96" rx="10"
                        fill="${isTid ? 'rgba(56, 189, 248, 0.16)' : '#151a21'}"
                        stroke="${isTid ? '#38bdf8' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isTid ? '2' : '1.2'}"/>
                    <circle cx="210" cy="34" r="12" fill="none" stroke="${isTid ? '#7dd3fc' : '#64748b'}" stroke-width="1.8"/>
                    <path d="M 210 27 L 210 34 L 216 37" fill="none" stroke="${isTid ? '#38bdf8' : '#94a3b8'}" stroke-width="1.8" stroke-linecap="round"/>
                    <text x="210" y="66" text-anchor="middle" fill="${isTid ? '#bae6fd' : '#cbd5e1'}" font-size="11" font-weight="800">TID</text>
                    <text x="210" y="80" text-anchor="middle" fill="#94a3b8" font-size="9">Hvornår / hvor ofte?</text>
                    <text x="210" y="95" text-anchor="middle" fill="#7dd3fc" font-size="9.5" font-weight="700">da · altid</text>

                    <!-- 3. GRAD & MÅDE -->
                    <rect x="286" y="8" width="128" height="96" rx="10"
                        fill="${isGrad ? 'rgba(56, 189, 248, 0.16)' : '#151a21'}"
                        stroke="${isGrad ? '#38bdf8' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isGrad ? '2' : '1.2'}"/>
                    <line x1="330" y1="27" x2="370" y2="27" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="362" cy="27" r="4" fill="${isGrad ? '#38bdf8' : '#7dd3fc'}"/>
                    <line x1="330" y1="40" x2="370" y2="40" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="344" cy="40" r="4" fill="${isGrad ? '#7dd3fc' : '#64748b'}"/>
                    <text x="350" y="66" text-anchor="middle" fill="${isGrad ? '#bae6fd' : '#cbd5e1'}" font-size="11" font-weight="800">GRAD &amp; MÅDE</text>
                    <text x="350" y="80" text-anchor="middle" fill="#94a3b8" font-size="9">Hvor meget / hvordan?</text>
                    <text x="350" y="95" text-anchor="middle" fill="#7dd3fc" font-size="9.5" font-weight="700">meget · stolt · højt</text>

                    <!-- 4. SMÅORD -->
                    <rect x="426" y="8" width="128" height="96" rx="10"
                        fill="${isSmaa ? 'rgba(56, 189, 248, 0.16)' : '#151a21'}"
                        stroke="${isSmaa ? '#38bdf8' : 'rgba(203, 213, 225, 0.16)'}"
                        stroke-width="${isSmaa ? '2' : '1.2'}"/>
                    <rect x="472" y="23" width="36" height="20" rx="10" fill="none" stroke="${isSmaa ? '#7dd3fc' : '#64748b'}" stroke-width="1.8"/>
                    <circle cx="497" cy="33" r="6" fill="${isSmaa ? '#38bdf8' : '#64748b'}"/>
                    <text x="490" y="66" text-anchor="middle" fill="${isSmaa ? '#bae6fd' : '#cbd5e1'}" font-size="11" font-weight="800">SMÅORD</text>
                    <text x="490" y="80" text-anchor="middle" fill="#94a3b8" font-size="9">Nægtelse / nuance</text>
                    <text x="490" y="95" text-anchor="middle" fill="#7dd3fc" font-size="9.5" font-weight="700">ikke · også · alligevel</text>
                </svg>
                <div class="hc-tense-btns">
                    ${types.map(t => `
                        <button type="button" class="hc-tense-btn hc-adv-btn ${activeAdvType === t.id ? 'active' : ''}" data-adv-pick="${t.id}">${t.label}</button>
                    `).join('')}
                    ${activeAdvType ? `<button type="button" class="hc-tense-btn hc-tense-clear" data-adv-pick="">${isEn ? 'Show all' : 'Vis alle'}</button>` : ''}
                </div>
                ${activeInfo ? `
                    <div class="hc-tense-explain hc-adv-explain">
                        <span>${activeInfo.desc}</span>
                        ${matchedInText.length > 0 ? `<div class="hc-tense-found hc-adv-found"><strong>${isEn ? 'In text above:' : 'I teksten ovenfor:'}</strong> ${matchedInText.join(', ')}</div>` : ''}
                    </div>
                ` : ''}
            `;

            box.querySelectorAll('[data-adv-pick]').forEach(btn => {
                btn.onclick = () => {
                    const picked = btn.dataset.advPick || null;
                    activeAdvType = (activeAdvType === picked) ? null : picked;
                    const cardEl = tasksWrap.closest('.hc-section-card');
                    if (cardEl) {
                        if (activeAdvType) {
                            cardEl.dataset.activeHighlight = 'adverbier';
                            cardEl.dataset.advTypeFilter = activeAdvType;
                        } else {
                            delete cardEl.dataset.advTypeFilter;
                        }
                    }
                    renderActivePanel();
                };
            });

            return box;
        }

        function renderActivePanel() {
            panelHolder.innerHTML = '';
            const catData = section.tasks[activeCatKey];
            if (!catData || !catData.questions || catData.questions.length === 0) return;

            if (activeCatKey === 'substantiver') {
                panelHolder.appendChild(renderNounDefinitenessDiagram());
            } else if (activeCatKey === 'verber') {
                panelHolder.appendChild(renderVerbTenseDiagram());
            } else if (activeCatKey === 'adjektiver') {
                panelHolder.appendChild(renderAdjectiveDiagram());
            } else if (activeCatKey === 'adverbier') {
                panelHolder.appendChild(renderAdverbDiagram());
            } else if (activeCatKey === 'pronominer') {
                panelHolder.appendChild(renderPronounCaseDiagram());
            }

            const unlocked = getUnlockedQuestions(activeCatKey);
            const totalQ = catData.questions.length;
            const qIdx = currentQuestionIdx[activeCatKey];

            const panel = document.createElement('div');
            panel.className = 'hc-task-panel';

            // Case A: All questions in this category completed
            if (qIdx >= totalQ) {
                const score = catScores[activeCatKey];
                const pct = Math.round((score / totalQ) * 100);
                panel.innerHTML = `
                    <div class="hc-task-summary">
                        <div class="summary-icon">${pct >= 75 ? SVG_CHECK : SVG_INFO}</div>
                        <h4>${catData.title} – ${isEn ? 'Completed!' : 'Gennemført!'}</h4>
                        <p class="summary-score-text">${isEn ? `You got <strong>${score}</strong> out of <strong>${totalQ}</strong> correct (${pct}%).` : `Du fik <strong>${score}</strong> ud af <strong>${totalQ}</strong> rigtige (${pct}%).`}</p>
                        <button type="button" class="hc-task-restart-btn">
                            <span>${SVG_RESET}</span> <span>${isEn ? 'Try this category again' : 'Prøv denne kategori igen'}</span>
                        </button>
                    </div>
                `;
                panel.querySelector('.hc-task-restart-btn').onclick = () => {
                    currentQuestionIdx[activeCatKey] = 0;
                    catScores[activeCatKey] = 0;
                    userAnswers[activeCatKey] = {};
                    Object.keys(shuffledOptionsMap)
                        .filter(k => k.startsWith(`${activeCatKey}_`))
                        .forEach(k => delete shuffledOptionsMap[k]);
                    renderActivePanel();
                };
                panelHolder.appendChild(panel);
                return;
            }

            // Case B: Answered all currently unlocked questions, more await next sentence
            if (qIdx >= unlocked.length && unlocked.length < totalQ) {
                panel.innerHTML = `
                    <div class="hc-task-sentence-milestone">
                        
                        <h4>${isEn ? `Tasks up to sentence ${currentRevealedCount} completed!` : `Opgaver til sætning ${currentRevealedCount} er løst!`}</h4>
                        <p>${isEn ? `Confirm that you understand the sentence above to unlock the next task (${unlocked.length + 1} of ${totalQ}) in this category.` : `Gå op til teksten og bekræft, at du forstår sætningen, for at låse op for de næste opgaver i rækken.`}</p>
                        <button type="button" class="hc-task-read-next-btn">
                            <span>${isEn ? `Go to sentence above (confirm)` : `Gå op og bekræft sætningen`}</span>
                            <span>→</span>
                        </button>
                    </div>
                `;
                panel.querySelector('.hc-task-read-next-btn').onclick = () => {
                    if (onGuideToNextSentence) {
                        onGuideToNextSentence();
                    }
                };
                panelHolder.appendChild(panel);
                return;
            }

            const currentQ = unlocked[qIdx];
            if (!currentQ) return;

            // Render current question
            const headerRow = document.createElement('div');
            headerRow.className = 'hc-task-panel-header';
            headerRow.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                    <span class="hc-task-badge ${activeCatKey}">
                        ${currentQ.badge || catData.badge || 'Opgave'}
                    </span>
                    <span class="hc-task-line-badge">
                        ${isEn ? `Sentence ${currentQ.line || 1} of ${totalLines}` : `Sætning ${currentQ.line || 1} af ${totalLines}`}
                    </span>
                    <span class="hc-task-progress-text">${isEn ? `Question ${qIdx + 1} of ${unlocked.length}` : `Opgave ${qIdx + 1} af ${unlocked.length}`} <span style="opacity:0.65;">(${unlocked.length}/${totalQ})</span></span>
                </div>
                <div class="hc-task-score-pill">
                    ${catScores[activeCatKey]} / ${unlocked.length}
                </div>
            `;
            panel.appendChild(headerRow);

            if (['substantiver', 'verber', 'adjektiver', 'adverbier'].includes(activeCatKey)) {
                const hintPill = document.createElement('div');
                hintPill.className = 'hc-task-highlight-hint';
                const catInfo = categories.find(c => c.key === activeCatKey);
                const catLabel = catInfo ? catInfo.label : activeCatKey;
                const catColor = catInfo ? catInfo.color : '#4ade80';
                hintPill.innerHTML = `
                    <span class="hint-bullet" style="background:${catColor};"></span>
                    <span>${isEn ? `All <strong>${catLabel.toLowerCase()}</strong> are highlighted in the text above` : `Alle <strong>${catLabel.toLowerCase()}</strong> toner nu frem i teksten ovenfor`}</span>
                `;
                panel.appendChild(hintPill);
            }

            if (catData.desc && qIdx === 0) {
                const descP = document.createElement('div');
                descP.className = 'hc-task-cat-desc';
                descP.textContent = catData.desc;
                panel.appendChild(descP);
            }

            // Question prompt with audio button
            const promptBox = document.createElement('div');
            promptBox.className = 'hc-task-prompt-box';
            promptBox.innerHTML = `
                <div class="hc-task-prompt">${currentQ.prompt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
                <button type="button" class="hc-task-speak-btn" title="${isEn ? 'Listen to question' : 'Lyt til spørgsmålet'}">${SVG_AUDIO}</button>
            `;
            promptBox.querySelector('.hc-task-speak-btn').onclick = () => {
                const plainText = currentQ.prompt.replace(/\*\*/g, '');
                speakDanish(plainText);
            };
            panel.appendChild(promptBox);

            // Options grid
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'hc-task-options';

            const feedbackWrap = document.createElement('div');
            feedbackWrap.className = 'hc-task-feedback-container';

            const savedAnswer = userAnswers[activeCatKey][qIdx];
            let isAnswered = savedAnswer !== undefined;
            const shuffledQ = getShuffledQuestion(activeCatKey, qIdx, currentQ);

            shuffledQ.options.forEach((optText, optIdx) => {
                const optBtn = document.createElement('button');
                optBtn.type = 'button';
                optBtn.className = 'hc-task-opt-btn';
                optBtn.innerHTML = `
                    <span class="opt-bullet">${String.fromCharCode(65 + optIdx)}</span>
                    <span class="opt-text">${optText}</span>
                `;

                if (isAnswered) {
                    optBtn.disabled = true;
                    if (optIdx === shuffledQ.correct) {
                        optBtn.classList.add('correct');
                    } else if (optIdx === savedAnswer.selectedIdx) {
                        optBtn.classList.add('incorrect');
                    }
                }

                optBtn.onclick = () => {
                    if (isAnswered) return;
                    isAnswered = true;
                    const isCorrect = optIdx === shuffledQ.correct;
                    if (isCorrect) {
                        catScores[activeCatKey]++;
                    }
                    userAnswers[activeCatKey][qIdx] = { selectedIdx: optIdx, isCorrect };

                    optionsGrid.querySelectorAll('.hc-task-opt-btn').forEach((b, idx) => {
                        b.disabled = true;
                        if (idx === shuffledQ.correct) {
                            b.classList.add('correct');
                        } else if (idx === optIdx && !isCorrect) {
                            b.classList.add('incorrect');
                        }
                    });

                    showFeedback(isCorrect);
                };

                optionsGrid.appendChild(optBtn);
            });
            panel.appendChild(optionsGrid);

            function showFeedback(isCorrect) {
                const isLastUnlocked = qIdx === unlocked.length - 1;
                const hasMoreInCat = unlocked.length < totalQ;

                let nextBtnLabel = isEn ? 'Next question →' : 'Næste opgave →';
                let nextPromptNoteHtml = '';

                if (isLastUnlocked) {
                    if (hasMoreInCat) {
                        nextBtnLabel = isEn ? 'Next (confirm sentence above) →' : 'Næste opgave (bekræft sætning ovenfor) →';
                        nextPromptNoteHtml = `
                            <div class="hc-next-sentence-prompt-note">
                                <span>↑</span>
                                <span>${isEn ? 'The next task belongs to the next sentence. Confirm the sentence above to continue.' : 'Næste opgave hører til næste sætning. Bekræft sætningen ovenfor for at få adgang.'}</span>
                            </div>
                        `;
                    } else {
                        nextBtnLabel = isEn ? 'See result →' : 'Se resultat →';
                    }
                }

                feedbackWrap.innerHTML = `
                    <div class="hc-task-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                        <div style="display: flex; align-items: flex-start; gap: 0.6rem;">
                            <span style="font-size: 1.2rem; display: inline-flex; align-items: center;">${isCorrect ? SVG_CHECK : SVG_INFO}</span>
                            <div class="hc-task-feedback-text">
                                <strong>${isCorrect ? (isEn ? 'Correct!' : 'Rigtigt!') : (isEn ? 'Note:' : 'Bemærk:')}</strong>
                                <span>${currentQ.explanation}</span>
                            </div>
                        </div>
                        ${nextPromptNoteHtml}
                        <button type="button" class="hc-task-next-btn">
                            ${nextBtnLabel}
                        </button>
                    </div>
                `;
                feedbackWrap.querySelector('.hc-task-next-btn').onclick = () => {
                    currentQuestionIdx[activeCatKey]++;
                    renderActivePanel();
                    if (isLastUnlocked && hasMoreInCat) {
                        if (onGuideToNextSentence) {
                            onGuideToNextSentence();
                        }
                    }
                };
            }

            if (isAnswered) {
                showFeedback(savedAnswer.isCorrect);
            }

            panel.appendChild(feedbackWrap);
            panelHolder.appendChild(panel);
        }

        tasksWrap.updateFlowProgress = (progress) => {
            currentRevealedCount = progress.revealedCount;
            isAllLinesMode = progress.isAllViewMode;
            renderHeader();
            updateTabButtons();
            renderActivePanel();
        };

        renderActivePanel();
        return tasksWrap;
    }

    function renderChallengeCard(challenge, lineIdx, onComplete) {
        const card = document.createElement('div');
        card.className = 'hc-challenge-card';

        const header = document.createElement('div');
        header.className = 'hc-challenge-header';
        header.innerHTML = `
            <span class="hc-challenge-badge">${stripEmojis(challenge.badge || 'Mesterens replik')}</span>
            <h4 class="hc-challenge-title">${challenge.title}</h4>
        `;
        card.appendChild(header);

        const promptEl = document.createElement('div');
        promptEl.className = 'hc-challenge-prompt';
        promptEl.innerHTML = challenge.prompt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        card.appendChild(promptEl);

        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'hc-challenge-feedback';
        feedbackEl.style.display = 'none';

        if (challenge.type === 'ordstilling') {
            const tilesPool = [...challenge.tiles].sort(() => Math.random() - 0.5);
            const assembled = [];

            const slotWrap = document.createElement('div');
            slotWrap.className = 'hc-challenge-slot-wrap';
            slotWrap.innerHTML = `
                <div class="slot-label">${isEn ? 'Your sentence:' : 'Din sætning:'}</div>
                <div class="hc-challenge-slot empty"><span class="slot-placeholder">${isEn ? 'Tap the word tiles below to build the sentence...' : 'Tryk på ordene nedenfor for at bygge sætningen...'}</span></div>
            `;
            const slotEl = slotWrap.querySelector('.hc-challenge-slot');
            card.appendChild(slotWrap);

            const poolWrap = document.createElement('div');
            poolWrap.className = 'hc-challenge-pool';
            card.appendChild(poolWrap);

            function updateSlotAndPool() {
                slotEl.innerHTML = '';
                if (assembled.length === 0) {
                    slotEl.classList.add('empty');
                    slotEl.innerHTML = `<span class="slot-placeholder">${isEn ? 'Tap the word tiles below to build the sentence...' : 'Tryk på ordene nedenfor for at bygge sætningen...'}</span>`;
                } else {
                    slotEl.classList.remove('empty');
                    assembled.forEach((word, idx) => {
                        const tile = document.createElement('button');
                        tile.type = 'button';
                        tile.className = 'hc-tile in-slot';
                        tile.textContent = word;
                        tile.onclick = () => {
                            assembled.splice(idx, 1);
                            tilesPool.push(word);
                            updateSlotAndPool();
                        };
                        slotEl.appendChild(tile);
                    });
                }

                poolWrap.innerHTML = '';
                tilesPool.forEach((word, idx) => {
                    const tile = document.createElement('button');
                    tile.type = 'button';
                    tile.className = 'hc-tile in-pool';
                    tile.textContent = word;
                    tile.onclick = () => {
                        tilesPool.splice(idx, 1);
                        assembled.push(word);
                        updateSlotAndPool();
                    };
                    poolWrap.appendChild(tile);
                });
            }

            updateSlotAndPool();

            const actionsRow = document.createElement('div');
            actionsRow.className = 'hc-challenge-actions';
            actionsRow.innerHTML = `
                <button type="button" class="hc-check-sentence-btn">
                    <span>${isEn ? 'Check word order' : 'Tjek ordstilling'}</span>
                </button>
                <button type="button" class="hc-reset-tiles-btn" title="Nulstil brikker">
                    <span>${SVG_RESET}</span> <span>${isEn ? 'Reset' : 'Nulstil'}</span>
                </button>
            `;

            actionsRow.querySelector('.hc-reset-tiles-btn').onclick = () => {
                tilesPool.length = 0;
                challenge.tiles.forEach(t => tilesPool.push(t));
                tilesPool.sort(() => Math.random() - 0.5);
                assembled.length = 0;
                updateSlotAndPool();
                feedbackEl.style.display = 'none';
            };

            actionsRow.querySelector('.hc-check-sentence-btn').onclick = () => {
                const assembledStr = assembled.join(' ').replace(/\s+([,\.!\?])/g, '$1').trim();
                const targetStr = challenge.targetSentence.replace(/\s+([,\.!\?])/g, '$1').trim();

                const isMatch = assembledStr.toLowerCase().replace(/[,\.!\?]/g, '').trim() === targetStr.toLowerCase().replace(/[,\.!\?]/g, '').trim();

                if (isMatch) {
                    slotEl.classList.add('correct');
                    feedbackEl.className = 'hc-challenge-feedback correct';
                    feedbackEl.style.display = 'flex';
                    feedbackEl.innerHTML = `
                        <div class="feedback-msg">
                            <span style="display:inline-flex; align-items:center;">${SVG_CHECK}</span>
                            <div>
                                <strong>${isEn ? 'Perfect word order!' : 'Helt rigtigt!'}</strong>
                                <p>${challenge.explanation}</p>
                            </div>
                        </div>
                        <button type="button" class="hc-challenge-continue-btn">
                            <span>${isEn ? 'Continue reading →' : 'Fortsæt læsningen →'}</span>
                        </button>
                    `;
                    speakDanish(targetStr);
                    feedbackEl.querySelector('.hc-challenge-continue-btn').onclick = () => {
                        onComplete();
                    };
                    actionsRow.style.display = 'none';
                    poolWrap.style.display = 'none';
                } else {
                    feedbackEl.className = 'hc-challenge-feedback incorrect';
                    feedbackEl.style.display = 'flex';
                    feedbackEl.innerHTML = `
                        <div class="feedback-msg">
                            <span style="display:inline-flex; align-items:center;">${SVG_INFO}</span>
                            <div>
                                <strong>${isEn ? 'Not quite right yet:' : 'Ikke helt den rigtige rækkefølge endnu:'}</strong>
                                <p>${isEn ? 'Try changing the order of the words. Pay attention to verb and subject order!' : 'Prøv at bytte om på brikkerne. Husk V2-reglen for udsagnsord og grundled!'}</p>
                            </div>
                        </div>
                    `;
                }
            };

            card.appendChild(actionsRow);
            card.appendChild(feedbackEl);
        } else if (challenge.type === 'cloze_speech') {
            const templateBox = document.createElement('div');
            templateBox.className = 'hc-cloze-template-box';
            templateBox.innerHTML = `
                <div class="hc-cloze-template" id="cloze-template-text">
                    ${challenge.sentenceTemplate.replace(/\[\s*___\s*\]/, '<span class="cloze-gap-pill">?</span>')}
                </div>
            `;
            card.appendChild(templateBox);

            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'hc-cloze-options';

            let isClozeCorrect = false;

            challenge.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'hc-cloze-opt-btn';
                btn.textContent = opt;

                btn.onclick = () => {
                    if (isClozeCorrect) return;

                    if (opt === challenge.correct) {
                        isClozeCorrect = true;
                        btn.classList.add('correct');
                        optionsGrid.querySelectorAll('.hc-cloze-opt-btn').forEach(b => {
                            b.disabled = true;
                            if (b !== btn) b.style.opacity = '0.4';
                        });

                        const gapPill = templateBox.querySelector('.cloze-gap-pill');
                        if (gapPill) {
                            gapPill.textContent = opt;
                            gapPill.classList.add('filled');
                        }

                        feedbackEl.className = 'hc-challenge-feedback correct';
                        feedbackEl.style.display = 'flex';
                        feedbackEl.innerHTML = `
                            <div class="feedback-msg">
                                <span style="display:inline-flex; align-items:center;">${SVG_CHECK}</span>
                                <div>
                                    <strong>${isEn ? 'Correct word!' : 'Rigtigt ord!'}</strong>
                                    <p>${challenge.explanation}</p>
                                </div>
                            </div>
                            <div class="hc-speech-practice-box">
                                <div class="speech-prompt-title"><span>${SVG_MIC}</span> <span>${stripEmojis(challenge.speechPrompt) || (isEn ? 'Practice pronouncing the line aloud:' : 'Udtaletræning: Sig replikken højt:')}</span></div>
                                <div class="speech-audio-btns">
                                    <button type="button" class="speech-btn normal" id="speech-play-normal">
                                        <span>${SVG_AUDIO}</span> <span>${isEn ? 'Normal speed' : 'Normal udtale'}</span>
                                    </button>
                                    <button type="button" class="speech-btn slow" id="speech-play-slow">
                                        <span>${isEn ? 'Slowly (0.75x)' : 'Langsomt (0.75x)'}</span>
                                    </button>
                                </div>
                            </div>
                            <button type="button" class="hc-challenge-continue-btn" id="cloze-continue-btn">
                                <span>${isEn ? 'I said it aloud – Continue →' : 'Jeg har udtalt replikken – Fortsæt →'}</span>
                            </button>
                        `;

                        feedbackEl.querySelector('#speech-play-normal').onclick = () => {
                            speakDanish(challenge.audioText);
                        };
                        feedbackEl.querySelector('#speech-play-slow').onclick = () => {
                            if (!('speechSynthesis' in window)) return;
                            window.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance(challenge.audioText);
                            utterance.lang = 'da-DK';
                            utterance.rate = 0.75;
                            window.speechSynthesis.speak(utterance);
                        };
                        feedbackEl.querySelector('#cloze-continue-btn').onclick = () => {
                            onComplete();
                        };
                    } else {
                        btn.classList.add('incorrect');
                        btn.disabled = true;
                    }
                };

                optionsGrid.appendChild(btn);
            });

            card.appendChild(optionsGrid);
            card.appendChild(feedbackEl);
        }

        return card;
    }

    function createSentenceFlow(section, sectionIndex, onProgressChange, vrimmelStageEl = null, isProseFlow = false) {
        const flowContainer = document.createElement('div');
        flowContainer.className = 'hc-sentence-flow-wrapper';

        let revealedCount = 1;
        const totalLines = section.dialogue.length;
        const solvedChallenges = {};
        let isAllViewMode = false;
        const sentence1VisualLab = createSentence1VisualLab(vrimmelStageEl);
        let activeLabLineIndex = (sectionIndex === 0) ? 0 : -1;
        if (sectionIndex !== 0 && sentence1VisualLab.close) {
            sentence1VisualLab.close(true);
        }

        function renderFlow() {
            flowContainer.innerHTML = '';

            const currentProgress = isAllViewMode ? totalLines : revealedCount;
            const pct = Math.round((currentProgress / totalLines) * 100);

            const isCompleted = isAllViewMode || (revealedCount >= totalLines);
            if (onProgressChange) {
                onProgressChange({
                    isCompleted,
                    revealedCount,
                    totalLines,
                    isAllViewMode
                });
            }

            // Progress header bar
            const headerEl = document.createElement('div');
            headerEl.className = 'hc-flow-header-row';
            headerEl.innerHTML = `
                <div class="hc-flow-progress-info">
                    <span class="hc-flow-step-badge">${isEn ? `Sentence ${currentProgress} of ${totalLines}` : `Sætning ${currentProgress} af ${totalLines}`}</span>
                    <div class="hc-flow-bar-track">
                        <div class="hc-flow-bar-fill" style="width: ${pct}%;"></div>
                    </div>
                </div>
                <button type="button" class="hc-flow-toggle-btn" title="${isAllViewMode ? (isEn ? 'Switch to step-by-step reading' : 'Skift til sætningsvis visning') : (isEn ? 'Show all sentences at once' : 'Vis hele scenens tekst samlet')}">
                    <span>${isAllViewMode ? 'Sætningsvis' : 'Vis samlet tekst'}</span>
                </button>
            `;
            headerEl.querySelector('.hc-flow-toggle-btn').onclick = () => {
                isAllViewMode = !isAllViewMode;
                renderFlow();
            };
            flowContainer.appendChild(headerEl);

            const dialogueList = document.createElement('div');
            dialogueList.className = isProseFlow ? 'hc-dialogue-list hc-prose-book' : 'hc-dialogue-list';

            const linesToShow = isAllViewMode ? totalLines : revealedCount;

            for (let i = 0; i < linesToShow; i++) {
                const line = section.dialogue[i];
                const isLatestLine = (i === revealedCount - 1) && !isAllViewMode;
                const lineEl = document.createElement('div');
                lineEl.className = `hc-dialogue-line ${isProseFlow ? 'prose-line' : ''} ${isLatestLine ? 'latest-revealed' : ''}`;

                const isChallengeSolved = solvedChallenges[i] === true;
                const showCompletedChallenge = isChallengeSolved || isAllViewMode;

                if (!isProseFlow) {
                    const speakerHeader = document.createElement('div');
                    speakerHeader.className = 'hc-speaker-header';
                    speakerHeader.innerHTML = `
                        <span class="hc-speaker-badge">
                            <span>${line.speaker}:</span>
                        </span>
                        <button type="button" class="hc-speaker-audio-btn" title="${isEn ? 'Listen to line' : 'Lyt til replik'}">
                            <span>${SVG_AUDIO}</span> <span>${isEn ? 'Listen' : 'Lyt'}</span>
                        </button>
                    `;

                    let fullLineAudio = line.audioText;
                    if (showCompletedChallenge && line.challenge && line.challenge.targetSentence) {
                        fullLineAudio = `${line.audioText} ${line.challenge.targetSentence}`;
                    }

                    speakerHeader.querySelector('.hc-speaker-audio-btn').onclick = () => {
                        speakDanish(fullLineAudio);
                    };
                    lineEl.appendChild(speakerHeader);
                }

                const speechEl = document.createElement('div');
                speechEl.className = 'hc-line-speech';

                if (line.tokens && line.tokens.length > 0) {
                    line.tokens.forEach((token, tokenIdx) => {
                        if (token.type === 'plain') {
                            const span = document.createElement('span');
                            span.textContent = token.text;
                            speechEl.appendChild(span);
                        } else {
                            let normalizedType = token.type;
                            if (['sub', 'substantiv', 'egenavn'].includes(token.type)) normalizedType = 'sub';
                            else if (['vrb', 'verbum'].includes(token.type)) normalizedType = 'vrb';
                            else if (['adj', 'adjektiv'].includes(token.type)) normalizedType = 'adj';
                            else if (['adv', 'adverbium'].includes(token.type)) normalizedType = 'adv';
                            else if (['konj'].includes(token.type)) normalizedType = 'konj';
                            else if (['prep'].includes(token.type)) normalizedType = 'prep';
                            else if (['pro'].includes(token.type)) normalizedType = 'pro';

                            const tokenBtn = document.createElement('span');
                            tokenBtn.className = `hc-word-token token-${token.type} token-class-${normalizedType}`;
                            tokenBtn.dataset.wordType = normalizedType;
                            if (normalizedType === 'vrb') {
                                tokenBtn.dataset.verbTense = classifyVerbTense(token.text);
                            } else if (normalizedType === 'sub') {
                                const nf = classifyNounForm(token.text);
                                if (nf) tokenBtn.dataset.nounForm = nf;
                            } else if (normalizedType === 'pro') {
                                const pc = classifyPronounCase(token.text);
                                if (pc) tokenBtn.dataset.pronounCase = pc;
                            } else if (normalizedType === 'adj') {
                                const af = classifyAdjForm(token.text);
                                if (af) tokenBtn.dataset.adjForm = af;
                            } else if (normalizedType === 'adv') {
                                const at = classifyAdvType(token.text);
                                if (at) tokenBtn.dataset.advType = at;
                            }
                            tokenBtn.textContent = token.text;
                            const brotherNode = findVisualNodeForBrotherToken(token);
                            const del1Node = (sectionIndex === 0 && i >= 1 && i <= 8) ? findDel1VisualNodeByToken(i, token) : null;
                            tokenBtn.title = (sectionIndex === 0 && (i === 0 || del1Node)) || brotherNode
                                ? 'Klik for visuel forklaring'
                                : `${token.type.toUpperCase()}: Klik for detaljer`;
                            tokenBtn.onclick = (e) => {
                                e.stopPropagation();
                                if (brotherNode && sentence1VisualLab) {
                                    activeLabLineIndex = i;
                                    lineEl.appendChild(sentence1VisualLab);
                                    sentence1VisualLab.selectNodeById(brotherNode.id);
                                    return;
                                }
                                if (del1Node && sentence1VisualLab) {
                                    activeLabLineIndex = i;
                                    lineEl.appendChild(sentence1VisualLab);
                                    sentence1VisualLab.selectNodeById(del1Node.id);
                                    return;
                                }
                                if (sectionIndex === 0 && i === 0 && sentence1VisualLab) {
                                    activeLabLineIndex = 0;
                                    lineEl.appendChild(sentence1VisualLab);
                                    sentence1VisualLab.selectToken(token, tokenIdx);
                                    return;
                                }
                                if (!isProseFlow) {
                                    speakDanish(token.text);
                                }
                                handleWordClick(token, line.audioText);
                            };
                            speechEl.appendChild(tokenBtn);
                        }
                    });
                } else {
                    speechEl.textContent = line.audioText;
                }

                // If line has completedTokens from challenge
                if (line.challenge && line.challenge.completedTokens) {
                    if (showCompletedChallenge) {
                        const spacer = document.createElement('span');
                        spacer.textContent = ' ';
                        speechEl.appendChild(spacer);

                        line.challenge.completedTokens.forEach(token => {
                            if (token.type === 'plain') {
                                const span = document.createElement('span');
                                span.textContent = token.text;
                                speechEl.appendChild(span);
                            } else {
                                let normalizedType = token.type;
                                if (['sub', 'substantiv', 'egenavn'].includes(token.type)) normalizedType = 'sub';
                                else if (['vrb', 'verbum'].includes(token.type)) normalizedType = 'vrb';
                                else if (['adj', 'adjektiv'].includes(token.type)) normalizedType = 'adj';
                                else if (['adv', 'adverbium'].includes(token.type)) normalizedType = 'adv';
                                else if (['konj'].includes(token.type)) normalizedType = 'konj';
                                else if (['prep'].includes(token.type)) normalizedType = 'prep';
                                else if (['pro'].includes(token.type)) normalizedType = 'pro';

                                const tokenBtn = document.createElement('span');
                                tokenBtn.className = `hc-word-token token-${token.type} token-class-${normalizedType}`;
                                tokenBtn.dataset.wordType = normalizedType;
                                tokenBtn.textContent = token.text;
                                tokenBtn.title = `${token.type.toUpperCase()}: Klik for detaljer og udtale`;
                                tokenBtn.onclick = (e) => {
                                    e.stopPropagation();
                                    speakDanish(token.text);
                                    handleWordClick(token, line.challenge.targetSentence);
                                };
                                speechEl.appendChild(tokenBtn);
                            }
                        });
                    } else if (isLatestLine) {
                        const dotsSpan = document.createElement('span');
                        dotsSpan.className = 'hc-challenge-dots-placeholder';
                        dotsSpan.title = isEn ? 'Solve the challenge below to complete the sentence' : 'Løs Mesterens replik nedenfor for at fuldføre sætningen';
                        dotsSpan.innerHTML = ` <span class="dots-anim">........</span> <span class="dots-hint">[${isEn ? 'Built in challenge below' : 'Vises i ordstillingsopgaven'}]</span>`;
                        speechEl.appendChild(dotsSpan);
                    }
                }

                lineEl.appendChild(speechEl);

                // Indsæt den visuelle forklaringsboks under den aktive sætning
                if (sentence1VisualLab && i === activeLabLineIndex) {
                    lineEl.appendChild(sentence1VisualLab);
                }

                // Challenge check
                if (line.challenge) {
                    if (!isChallengeSolved && isLatestLine) {
                        const challengeCard = renderChallengeCard(line.challenge, i, () => {
                            solvedChallenges[i] = true;
                            renderFlow();
                        });
                        lineEl.appendChild(challengeCard);
                    } else if (isChallengeSolved) {
                        const solvedPill = document.createElement('div');
                        solvedPill.className = 'hc-challenge-solved-badge';
                        solvedPill.innerHTML = `
                            <span>${SVG_CHECK}</span>
                            <span>${stripEmojis(line.challenge.title)} – Gennemført!</span>
                        `;
                        lineEl.appendChild(solvedPill);
                    }
                }

                dialogueList.appendChild(lineEl);
            }

            flowContainer.appendChild(dialogueList);

            // Flow navigation bar (Next sentence or completion)
            if (!isAllViewMode) {
                const currentLine = section.dialogue[revealedCount - 1];
                const hasUnsolvedChallenge = currentLine && currentLine.challenge && !solvedChallenges[revealedCount - 1];

                const navBar = document.createElement('div');
                navBar.className = 'hc-flow-nav-bar';

                if (revealedCount < totalLines) {
                    const nextBtn = document.createElement('button');
                    nextBtn.type = 'button';
                    nextBtn.className = 'hc-next-sentence-btn';
                    nextBtn.disabled = hasUnsolvedChallenge;
                    nextBtn.innerHTML = `
                        <span>${isEn ? 'I understand this sentence – Next' : 'Jeg forstår sætningen – Næste sætning'}</span>
                        <span>→</span>
                    `;
                    nextBtn.onclick = () => {
                        nextBtn.classList.remove('glow-yellow');
                        const latest = flowContainer.querySelector('.latest-revealed');
                        if (latest) latest.classList.remove('awaiting-confirm');
                        flowContainer.advanceSentence();
                    };

                    const hintText = document.createElement('div');
                    hintText.className = 'hc-next-sentence-hint';
                    hintText.textContent = hasUnsolvedChallenge 
                        ? (isEn ? 'Solve the challenge above to unlock the next sentence!' : 'Løs udfordringen ovenfor for at låse op for næste sætning!')
                        : (isEn ? 'Press when you have understood the sentence and want to continue' : 'Tryk når du har forstået sætningen og er klar til at gå videre i handlingen.');

                    navBar.appendChild(nextBtn);
                    navBar.appendChild(hintText);
                } else {
                    const compCard = document.createElement('div');
                    compCard.className = 'hc-flow-completion-card';
                    compCard.innerHTML = `
                        <div class="completion-icon">${SVG_CHECK}</div>
                        <h4>${isEn ? 'Scene completed!' : 'Hele scenen er læst og forstået!'}</h4>
                        <p>${isEn ? 'Great job! You have read all sentences in this scene. All exercises are now 100% unlocked below ↓' : 'Flot klaret! Du har læst alle sætninger i denne scene. Alle opgaver er nu 100% åbne nedenfor ↓'}</p>
                        <div class="completion-actions">
                            <button type="button" class="hc-restart-flow-btn">
                                <span>${SVG_RESET}</span> <span>${isEn ? 'Read scene again' : 'Læs scenen forfra'}</span>
                            </button>
                        </div>
                    `;
                    compCard.querySelector('.hc-restart-flow-btn').onclick = () => {
                        revealedCount = 1;
                        if (sentence1VisualLab && sentence1VisualLab.close) {
                            sentence1VisualLab.close(false);
                        }
                        renderFlow();
                    };
                    navBar.appendChild(compCard);
                }

                flowContainer.appendChild(navBar);
            }
        }

        flowContainer.advanceSentence = () => {
            if (revealedCount < totalLines) {
                if (sentence1VisualLab && sentence1VisualLab.close) {
                    sentence1VisualLab.close(true);
                }
                revealedCount++;
                renderFlow();
                setTimeout(() => {
                    const latest = flowContainer.querySelector('.latest-revealed');
                    if (latest) latest.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 60);
            }
        };

        flowContainer.guideToSentenceConfirm = () => {
            const nextBtn = flowContainer.querySelector('.hc-next-sentence-btn');
            const latest = flowContainer.querySelector('.latest-revealed');
            const challengeCard = flowContainer.querySelector('.latest-revealed .hc-challenge-card');

            if (nextBtn && !nextBtn.disabled) {
                nextBtn.classList.remove('glow-yellow');
                void nextBtn.offsetWidth; // force CSS reflow
                nextBtn.classList.add('glow-yellow');
                if (latest) latest.classList.add('awaiting-confirm');
                nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (challengeCard) {
                challengeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                challengeCard.classList.add('highlight-challenge');
                setTimeout(() => challengeCard.classList.remove('highlight-challenge'), 2000);
            } else if (latest) {
                latest.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        renderFlow();
        return flowContainer;
    }

    function createSectionCard(section, index, story, onUnlockChange = null) {
        const card = document.createElement('div');
        card.className = 'hc-section-card';

        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <h3>${section.chapter}</h3>
            <button class="section-audio-btn" title="${isEn ? 'Listen to this section' : 'Lyt til dette afsnit'}">
                <span>${SVG_AUDIO}</span> <span>${isEn ? 'Listen' : 'Lyt'}</span>
            </button>
        `;
        header.querySelector('.section-audio-btn').onclick = () => {
            speakDanish(section.audioText);
        };
        card.appendChild(header);

        function setHighlight(catKey) {
            let mapped = catKey;
            if (catKey === 'sub' || catKey === 'substantiv') mapped = 'substantiver';
            else if (catKey === 'vrb' || catKey === 'verbum') mapped = 'verber';
            else if (catKey === 'adj' || catKey === 'adjektiv') mapped = 'adjektiver';
            else if (catKey === 'adv' || catKey === 'adverbium') mapped = 'adverbier';
            else if (catKey === 'pro' || catKey === 'pronomen') mapped = 'pronominer';

            card.dataset.activeHighlight = mapped;
            if (mapped !== 'verber') {
                delete card.dataset.verbTenseFilter;
            }
            if (mapped !== 'substantiver') {
                delete card.dataset.nounFormFilter;
            }
            if (mapped !== 'pronominer') {
                delete card.dataset.pronounCaseFilter;
            }
            if (mapped !== 'adjektiver') {
                delete card.dataset.adjFormFilter;
            }
            if (mapped !== 'adverbier') {
                delete card.dataset.advTypeFilter;
            }
            if (legendBar) {
                legendBar.querySelectorAll('.hc-legend-item').forEach(it => {
                    it.classList.toggle('active-legend', it.dataset.cat === mapped);
                });
            }
        }

        // 1. Render Vrimlebillede Stage if present
        let legendBar = null;
        let vrimmelStage = null;
        if (section.vrimmelImage) {
            vrimmelStage = document.createElement('div');
            vrimmelStage.className = 'hc-vrimmel-stage';
            vrimmelStage.innerHTML = `
                <img src="${section.vrimmelImage}" alt="${section.chapter}" class="hc-vrimmel-img" />
            `;

            if (section.hotspots && section.hotspots.length > 0) {
                let hotspotsHidden = false;
                try { hotspotsHidden = localStorage.getItem('hc_hotspots_hidden_v1') === '1'; } catch {}
                if (hotspotsHidden) vrimmelStage.classList.add('hotspots-hidden');

                section.hotspots.forEach(spot => {
                    const pin = document.createElement('button');
                    pin.type = 'button';
                    pin.className = `hc-hotspot-pin pin-${spot.type}`;
                    pin.style.left = `${spot.x}%`;
                    pin.style.top = `${spot.y}%`;
                    pin.title = spot.label || spot.word;
                    pin.innerHTML = `
                        <span class="pin-dot"></span>
                        <div class="hc-hotspot-pill">${spot.label || spot.word}</div>
                    `;
                    pin.onclick = (e) => {
                        e.stopPropagation();
                        speakDanish(spot.word);
                        handleWordClick({ text: spot.word, type: spot.type, key: spot.word }, spot.info || section.chapter);
                    };
                    vrimmelStage.appendChild(pin);
                });

                card.appendChild(vrimmelStage);

                const eyeOpenSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
                const eyeOffSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;

                const stageControlRow = document.createElement('div');
                stageControlRow.className = 'hc-vrimmel-controls';
                const togglePinsBtn = document.createElement('button');
                togglePinsBtn.type = 'button';
                togglePinsBtn.className = 'hc-pins-toggle-btn';
                const syncPinsBtn = () => {
                    const hidden = vrimmelStage.classList.contains('hotspots-hidden');
                    togglePinsBtn.innerHTML = hidden
                        ? `${eyeOpenSvg}<span>${isEn ? 'Show markers' : 'Vis pegefelter'}</span>`
                        : `${eyeOffSvg}<span>${isEn ? 'Hide markers' : 'Skjul pegefelter'}</span>`;
                };
                syncPinsBtn();
                togglePinsBtn.onclick = () => {
                    const nowHidden = vrimmelStage.classList.toggle('hotspots-hidden');
                    try { localStorage.setItem('hc_hotspots_hidden_v1', nowHidden ? '1' : '0'); } catch {}
                    syncPinsBtn();
                };
                stageControlRow.appendChild(togglePinsBtn);
                card.appendChild(stageControlRow);
            } else {
                card.appendChild(vrimmelStage);
            }

            }

        // 2. Render text heading & text body (lige under vrimlebilledet)
        const textHeading = document.createElement('div');
        textHeading.className = 'hc-text-heading';
        textHeading.innerHTML = `
            <div class="hc-text-badge-row">
                <h4 class="hc-text-title">${section.chapter}</h4>
            </div>
            <p class="hc-text-hint">${isEn ? 'Read the dialogue sentence by sentence and tap the words you do not understand.' : 'Læs replikkerne sætning for sætning og tryk på de ord du ikke forstår.'}</p>
        `;
        card.appendChild(textHeading);

        const textBody = document.createElement('div');
        textBody.className = 'section-text-body';

        // 3. Render Interactive Tasks for Scene (Løsning B: minimalistisk fold-ud i bunden)
        let flowEl = null;
        let tasksEl = null;
        let drawerToggleBtn = null;
        let tasksDrawerEl = null;
        let finaleDrawerEl = null;
        let lastUnlockedState = false;

        if (section.tasks) {
            tasksEl = createSectionTasks(section, index, (newCatKey) => {
                setHighlight(newCatKey);
            }, () => {
                if (flowEl && flowEl.guideToSentenceConfirm) {
                    flowEl.guideToSentenceConfirm();
                }
            });
        }

        const hasDialogue = section.dialogue && section.dialogue.length > 0;
        const sceneKey = `hc_scene_${story?.id || 'story'}_${index}`;

        if (hasDialogue) {
            flowEl = createSentenceFlow(section, index, (progress) => {
                if (tasksEl && tasksEl.updateFlowProgress) {
                    tasksEl.updateFlowProgress(progress);
                }
                const isUnlocked = !!(progress.isCompleted || progress.isAllViewMode);
                lastUnlockedState = isUnlocked;
                if (isUnlocked) {
                    completedScenes[sceneKey] = true;
                }
                if (tasksDrawerEl) {
                    tasksDrawerEl.hidden = !isUnlocked;
                }
                if (finaleDrawerEl) {
                    finaleDrawerEl.hidden = !isUnlocked;
                }
                if (drawerToggleBtn) {
                    drawerToggleBtn.classList.toggle('is-ready', isUnlocked);
                    const statusEl = drawerToggleBtn.querySelector('.hc-drawer-status');
                    if (statusEl) {
                        statusEl.textContent = isUnlocked ? (isEn ? 'Ready' : 'Klar') : '';
                    }
                }
                if (onUnlockChange) {
                    onUnlockChange(isUnlocked);
                }
            }, vrimmelStage, !!story?.proseFlow);
            textBody.appendChild(flowEl);
        } else {
            // Standard fairy tale prose paragraphs
            const paragraphs = section.text.split('\n\n');
            paragraphs.forEach(pText => {
                const p = document.createElement('p');
                p.className = 'story-paragraph';

                let highlighted = pText;
                if (story.vocabulary) {
                    story.vocabulary.forEach(vocab => {
                        const bareWord = vocab.word.replace(/^(en|et|at)\s+/, '');
                        const regex = new RegExp(`\\b(${bareWord}[a-zæøå]*)\\b`, 'gi');
                        highlighted = highlighted.replace(regex, (match) => {
                            return `<span class="vocab-highlight" title="${vocab.meaningDa} (${vocab.meaningEn})" data-word="${match}">${match}</span>`;
                        });
                    });
                }

                p.innerHTML = highlighted;

                p.querySelectorAll('.vocab-highlight').forEach(el => {
                    el.onclick = (e) => {
                        e.stopPropagation();
                        const word = el.dataset.word;
                        speakDanish(word);
                        showQuickWordTip(el, word, story.vocabulary);
                    };
                });

                textBody.appendChild(p);
            });
        }

        card.appendChild(textBody);

        if (tasksEl) {
            const totalTaskCount = Object.values(section.tasks || {}).reduce(
                (sum, cat) => sum + (cat?.questions?.length || 0),
                0
            );

            const drawer = document.createElement('div');
            drawer.className = 'hc-tasks-drawer';
            const initiallyUnlocked = !hasDialogue || lastUnlockedState || !!completedScenes[sceneKey];
            drawer.hidden = !initiallyUnlocked;
            tasksDrawerEl = drawer;

            drawerToggleBtn = document.createElement('button');
            drawerToggleBtn.type = 'button';
            drawerToggleBtn.className = 'hc-tasks-drawer-toggle';
            drawerToggleBtn.setAttribute('aria-expanded', 'false');
            drawerToggleBtn.innerHTML = `
                <span class="hc-drawer-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                    <span>${isEn ? `Optional practice · ${totalTaskCount} exercises` : `Valgfri træning · ${totalTaskCount} opgaver`}</span>
                </span>
                <span class="hc-drawer-right">
                    <span class="hc-drawer-status"></span>
                    <svg class="hc-drawer-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </span>
            `;

            const drawerBody = document.createElement('div');
            drawerBody.className = 'hc-tasks-drawer-body';
            drawerBody.hidden = true;
            drawerBody.appendChild(tasksEl);

            drawerToggleBtn.onclick = () => {
                const willOpen = drawerBody.hidden;
                drawerBody.hidden = !willOpen;
                drawerToggleBtn.classList.toggle('is-open', willOpen);
                drawerToggleBtn.setAttribute('aria-expanded', String(willOpen));
            };

            // Hvis scenen allerede er fuldført ved render, marker knappen klar
            if (completedScenes[sceneKey]) {
                drawerToggleBtn.classList.add('is-ready');
                const statusEl = drawerToggleBtn.querySelector('.hc-drawer-status');
                if (statusEl) statusEl.textContent = isEn ? 'Ready' : 'Klar';
            }

            drawer.appendChild(drawerToggleBtn);
            drawer.appendChild(drawerBody);
            card.appendChild(drawer);
        }

        // Sammenfoldet nordisk boks til afslutningsaktiviteterne (Det indre liv & Speeddating) i 3. del af Klods-Hans
        if (story?.id === 'klods_hans' && index === 2) {
            const finaleDrawer = document.createElement('div');
            finaleDrawer.className = 'hc-tasks-drawer hc-finale-drawer';
            const initiallyUnlockedFinale = !hasDialogue || lastUnlockedState || !!completedScenes[sceneKey];
            finaleDrawer.hidden = !initiallyUnlockedFinale;
            finaleDrawerEl = finaleDrawer;

            const finaleToggleBtn = document.createElement('button');
            finaleToggleBtn.type = 'button';
            finaleToggleBtn.className = 'hc-tasks-drawer-toggle';
            finaleToggleBtn.setAttribute('aria-expanded', 'false');
            if (completedScenes[sceneKey]) finaleToggleBtn.classList.add('is-ready');
            finaleToggleBtn.innerHTML = `
                <span class="hc-drawer-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>${isEn ? 'Finale · Character Traits & Speed Dating (2 activities)' : 'Afslutning · Det indre liv & Speeddating (2 aktiviteter)'}</span>
                </span>
                <span class="hc-drawer-right">
                    <span class="hc-drawer-status">${completedScenes[sceneKey] ? (isEn ? 'Ready' : 'Klar') : ''}</span>
                    <svg class="hc-drawer-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </span>
            `;

            const finaleBody = document.createElement('div');
            finaleBody.className = 'hc-tasks-drawer-body';
            finaleBody.hidden = true;
            let finaleMounted = false;

            finaleToggleBtn.onclick = () => {
                const willOpen = finaleBody.hidden;
                finaleBody.hidden = !willOpen;
                finaleToggleBtn.classList.toggle('is-open', willOpen);
                finaleToggleBtn.setAttribute('aria-expanded', String(willOpen));
                if (willOpen && !finaleMounted) {
                    finaleMounted = true;
                    renderKlodsHansFinaleActivities(finaleBody, {
                        isEn,
                        speakDanish,
                        onJumpToQuiz: () => {
                            const quizEl = card.parentElement?.parentElement?.querySelector('.hc-quiz-card');
                            if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    });
                }
            };

            finaleDrawer.appendChild(finaleToggleBtn);
            finaleDrawer.appendChild(finaleBody);
            card.appendChild(finaleDrawer);
        }

        // Diskret download-knap til den oprindelige skuespiltekst med replikker i 3. del af Klods-Hans
        if (story?.id === 'klods_hans' && index === 2) {
            const downloadRow = document.createElement('div');
            downloadRow.className = 'hc-script-download-row';
            const downloadSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
            downloadRow.innerHTML = `
                <a class="hc-script-download-btn" href="downloads/Klods_Hans_Skuespil.docx" download="Klods_Hans_Skuespil.docx">
                    ${downloadSvg}
                    <span>${isEn ? 'Download original play script (.docx)' : 'Hent skuespil med replikker (.docx)'}</span>
                </a>
            `;
            card.appendChild(downloadRow);
        }

        return card;
    }

    // --- 3. WORD CLICK HANDLER (Links til målsprogspræsentationer) ---
    function handleWordClick(token, sentenceContext) {
        if (!token) return;

        // 1. Pronominer (Pink) -> Open Pronoun Quick Peek Modal
        if (token.type === 'pro') {
            openPronounQuickPeekModal(token.text, sentenceContext, navigateFn);
            return;
        }

        // 2. Substantiver (Grøn) -> Open Noun Modal or Word Presentation
        if (token.type === 'sub') {
            const nounKey = (token.key || token.text).toLowerCase().replace(/^(en|et)\s+/, '').trim();
            if (allNounsRegistry && allNounsRegistry[nounKey]) {
                openNounQuickPeekModal(nounKey);
                return;
            }
            if (wordToNounKey && wordToNounKey[nounKey]) {
                openNounQuickPeekModal(wordToNounKey[nounKey]);
                return;
            }
            openWordPresentation({
                id: `noun_${nounKey}`,
                key: nounKey,
                title: token.text,
                baseWord: nounKey,
                category: 'nouns',
                type: 'noun',
                badge: 'Navneord',
                badgeColor: '#22c55e',
                icon: '🟢',
                meaning: `Substantiv: Betegner en person, et dyr, en genstand eller et begreb i eventyret.`,
                sentence: sentenceContext,
                forms: `Form i teksten: "${token.text}"`,
                translations: { en: nounKey }
            });
            return;
        }

        // 3. Verber (Rød) -> Open Verb Quick Peek Modal or Word Presentation
        if (token.type === 'vrb') {
            const verbKey = (token.key || token.text).replace(/^at\s+/, '').toLowerCase().trim();
            if (byrumVerbsRegistry && byrumVerbsRegistry[verbKey]) {
                openVerbQuickPeekModal(verbKey, navigateFn);
                return;
            }
            const vEntry = verberWordTranslations[verbKey] || verberWordTranslations['at ' + verbKey];
            if (vEntry) {
                const transMap = {};
                Object.keys(vEntry).forEach(k => {
                    if (vEntry[k] && typeof vEntry[k] === 'object' && vEntry[k].meaning) {
                        transMap[k] = vEntry[k].meaning;
                    }
                });
                openWordPresentation({
                    id: `verb_${verbKey}`,
                    key: verbKey,
                    title: `at ${verbKey}`,
                    baseWord: verbKey,
                    category: 'verbs',
                    type: 'verb',
                    badge: 'Udsagnsord',
                    badgeColor: '#ef4444',
                    icon: '',
                    forms: `Nutid: ${vEntry.nutid || ''} | Datid: ${vEntry.datid || ''}`,
                    meaning: vEntry.da?.meaning || `Udsagnsord: Angiver en handling eller tilstand.`,
                    sentence: sentenceContext || vEntry.da?.sentence || '',
                    translations: transMap
                });
                return;
            }
            openWordPresentation({
                id: `verb_${verbKey}`,
                key: verbKey,
                title: `at ${verbKey}`,
                baseWord: verbKey,
                category: 'verbs',
                type: 'verb',
                badge: 'Udsagnsord',
                badgeColor: '#ef4444',
                icon: '',
                meaning: `Udsagnsord: Sætningens handling eller drivkraft.`,
                sentence: sentenceContext,
                translations: { en: verbKey }
            });
            return;
        }

        // 4. Adjektiver (Orange) -> Open Word Presentation
        if (token.type === 'adj') {
            const adjKey = (token.key || token.text).toLowerCase().trim();
            const aEntry = adjektiverWordTranslations[adjKey];
            if (aEntry) {
                const transMap = {};
                Object.keys(aEntry).forEach(k => {
                    if (aEntry[k] && typeof aEntry[k] === 'object' && aEntry[k].meaning) {
                        transMap[k] = aEntry[k].meaning;
                    }
                });
                openWordPresentation({
                    id: `adj_${adjKey}`,
                    key: adjKey,
                    title: aEntry.baseWord || adjKey,
                    baseWord: aEntry.baseWord || adjKey,
                    category: 'adjectives',
                    type: 'adjective',
                    badge: 'Tillægsord',
                    badgeColor: '#f97316',
                    icon: '',
                    forms: `Fælleskøn: en ${adjKey} | Intetkøn: et ${adjKey}t | Flertal: ${adjKey}e`,
                    meaning: aEntry.da?.meaning || `Adjektiv: Beskriver en egenskab eller tilstand.`,
                    sentence: sentenceContext || aEntry.da?.sentence || '',
                    translations: transMap
                });
                return;
            }
            openWordPresentation({
                id: `adj_${adjKey}`,
                key: adjKey,
                title: token.text,
                baseWord: adjKey,
                category: 'adjectives',
                type: 'adjective',
                badge: 'Tillægsord',
                badgeColor: '#f97316',
                icon: '',
                meaning: `Tillægsord: Beskriver substantivet i sætningen.`,
                sentence: sentenceContext,
                translations: { en: adjKey }
            });
            return;
        }

        // 5. Adverbier (Blå) -> Open Word Presentation
        if (token.type === 'adv') {
            const advKey = (token.key || token.text).toLowerCase().trim();
            let matchedEntry = null;
            Object.entries(adverbierWordTranslations).forEach(([k, val]) => {
                if (val.baseWord === advKey || val.id === advKey || k.replace(/^f\d+_/, '') === advKey) {
                    matchedEntry = val;
                }
            });
            if (matchedEntry) {
                const transMap = {};
                Object.keys(matchedEntry).forEach(k => {
                    if (matchedEntry[k] && typeof matchedEntry[k] === 'object' && matchedEntry[k].meaning) {
                        transMap[k] = matchedEntry[k].meaning;
                    }
                });
                openWordPresentation({
                    id: `adv_${advKey}`,
                    key: advKey,
                    title: matchedEntry.baseWord || advKey,
                    baseWord: matchedEntry.baseWord || advKey,
                    category: 'adverbs',
                    type: 'adverb',
                    badge: 'Biord',
                    badgeColor: '#38bdf8',
                    icon: '',
                    meaning: matchedEntry.da?.meaning || `Adverbium: Angiver tid, sted, måde, grad eller holdning.`,
                    sentence: sentenceContext || matchedEntry.da?.sentence || '',
                    translations: transMap
                });
                return;
            }
            openWordPresentation({
                id: `adv_${advKey}`,
                key: advKey,
                title: token.text,
                baseWord: advKey,
                category: 'adverbs',
                type: 'adverb',
                badge: 'Biord',
                badgeColor: '#38bdf8',
                icon: '',
                meaning: `Adverbium (biord): Justerer verbet, adjektivet eller hele sætningen.`,
                sentence: sentenceContext,
                translations: { en: advKey }
            });
            return;
        }

        // 6. Konjunktioner (Lilla) -> Open Word Presentation
        if (token.type === 'konj') {
            const konjKey = (token.key || token.text).toLowerCase().trim();
            let matchedEntry = null;
            Object.entries(konjunktionerWordTranslations).forEach(([k, val]) => {
                if (val.baseWord === konjKey || val.id === konjKey || k.replace(/^flow_/, '') === konjKey) {
                    matchedEntry = val;
                }
            });
            if (matchedEntry) {
                const transMap = {};
                Object.keys(matchedEntry).forEach(k => {
                    if (matchedEntry[k] && typeof matchedEntry[k] === 'object' && matchedEntry[k].meaning) {
                        transMap[k] = matchedEntry[k].meaning;
                    }
                });
                openWordPresentation({
                    id: `konj_${konjKey}`,
                    key: konjKey,
                    title: matchedEntry.baseWord || konjKey,
                    baseWord: matchedEntry.baseWord || konjKey,
                    category: 'conjunctions',
                    type: 'conjunction',
                    badge: 'Bindeord',
                    badgeColor: '#a855f7',
                    icon: '',
                    meaning: matchedEntry.da?.meaning || `Konjunktion: Binder ord eller sætninger sammen.`,
                    sentence: sentenceContext || matchedEntry.da?.sentence || '',
                    translations: transMap
                });
                return;
            }
            openWordPresentation({
                id: `konj_${konjKey}`,
                key: konjKey,
                title: token.text,
                baseWord: konjKey,
                category: 'conjunctions',
                type: 'conjunction',
                badge: 'Bindeord',
                badgeColor: '#a855f7',
                icon: '',
                meaning: `Konjunktion: Forbinder sætningsled eller sætninger.`,
                sentence: sentenceContext,
                translations: { en: konjKey }
            });
            return;
        }

        // 7. Præpositioner (Gul) -> Open Preposition Modal
        if (token.type === 'prep') {
            openPrepositionModal(token.text, sentenceContext);
            return;
        }
    }

    // --- 4. PREPOSITION QUICK MODAL ---
    function openPrepositionModal(rawWord, sentenceContext) {
        const cleanWord = rawWord.toLowerCase().replace(/[.,!?:;»«"']/g, '').trim();
        const prepDict = {
            "til": {
                desc: "Angiver retning mod et mål eller en modtager.",
                descEn: "Indicates direction towards a destination or recipient.",
                example: "Jeg tager til slottet. Har du en gave med til hende?"
            },
            "på": {
                desc: "Angiver placering på en flade eller en tilstand/situation.",
                descEn: "Indicates location upon a surface or an ongoing state.",
                example: "På bondegården. Han rider på sin ged. Han er på vej."
            },
            "i": {
                desc: "Angiver placering inde i et rum eller en beholder/genstand.",
                descEn: "Indicates location inside a space or object.",
                example: "I træskoen, selvfølgelig! Hvad vil du stege den i?"
            },
            "med": {
                desc: "Angiver ledsagelse, redskab eller indhold.",
                descEn: "Indicates accompaniment, tool or content.",
                example: "En træsko med mudder. Tag du geden med."
            },
            "om": {
                desc: "Angiver emne eller hvad noget handler om.",
                descEn: "Indicates subject matter or what something concerns.",
                example: "Jeg kan tale om store og komplicerede ting."
            },
            "for": {
                desc: "Angiver hensigt, årsag eller til ære for.",
                descEn: "Indicates purpose, reason or honor.",
                example: "Hurra for Klods-Hans og prinsessen!"
            }
        };

        const info = prepDict[cleanWord] || {
            desc: "Forholdsord (præposition): Forbinder et navneord eller pronomen med resten af sætningen.",
            descEn: "Preposition: Connects a noun or pronoun to the rest of the sentence.",
            example: sentenceContext || "Forholdsord i sætningen."
        };

        const existing = document.querySelector('.hc-prep-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'hc-prep-modal-overlay';
        overlay.innerHTML = `
            <div class="hc-prep-modal">
                <div class="hc-prep-header">
                    <span class="hc-prep-badge">Præposition (Forholdsord)</span>
                    <button class="hc-prep-close" id="hc-prep-close-btn">✕</button>
                </div>
                <div class="hc-prep-body">
                    <div class="hc-prep-title-row">
                        <h2 class="hc-prep-word">${cleanWord}</h2>
                        <button class="hc-prep-tts-btn" id="hc-prep-tts">
                            <span>${SVG_AUDIO}</span> Lyt
                        </button>
                    </div>
                    <p class="hc-prep-desc">${isEn ? info.descEn : info.desc}</p>
                    <div class="hc-prep-sentence">
                        "${sentenceContext || info.example}"
                    </div>
                    <button class="hc-prep-ok-btn" id="hc-prep-ok">Forstået →</button>
                </div>
            </div>
        `;

        function closePrep() {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 160);
        }

        overlay.querySelector('#hc-prep-close-btn').onclick = closePrep;
        overlay.querySelector('#hc-prep-ok').onclick = closePrep;
        overlay.onclick = (e) => {
            if (e.target === overlay) closePrep();
        };
        overlay.querySelector('#hc-prep-tts').onclick = () => speakDanish(cleanWord);

        document.body.appendChild(overlay);
        speakDanish(cleanWord);
    }

    function showQuickWordTip(anchorEl, word, vocabularyList) {
        const oldTip = document.querySelector('.hc-word-tooltip');
        if (oldTip) oldTip.remove();

        const match = vocabularyList?.find(v => {
            const bare = v.word.replace(/^(en|et|at)\s+/, '').toLowerCase();
            return word.toLowerCase().startsWith(bare);
        });

        if (!match) return;

        const tip = document.createElement('div');
        tip.className = 'hc-word-tooltip';
        tip.innerHTML = `
            <div class="tooltip-top">
                <strong>${match.word}</strong>
                <span class="tooltip-type">${match.type}</span>
                <button class="tooltip-close">✕</button>
            </div>
            <div class="tooltip-da">${match.meaningDa}</div>
            <div class="tooltip-en">EN: ${match.meaningEn}</div>
        `;

        tip.querySelector('.tooltip-close').onclick = (e) => {
            e.stopPropagation();
            tip.remove();
        };

        anchorEl.style.position = 'relative';
        anchorEl.appendChild(tip);

        setTimeout(() => {
            document.addEventListener('click', function closeTip() {
                tip.remove();
                document.removeEventListener('click', closeTip);
            }, { once: true });
        }, 100);
    }

    function createQuizSection(quizItems) {
        const quizCard = document.createElement('div');
        quizCard.className = 'hc-quiz-card';
        quizCard.innerHTML = `
            <div class="quiz-header">
                
                <div>
                    <h3>${isEn ? 'Comprehension Quiz' : 'Forståelsestjek: Forstod du eventyret?'}</h3>
                    <p class="quiz-sub">${isEn ? 'Answer the questions to test your reading comprehension:' : 'Svar på de 3 spørgsmål og se, hvor meget du forstod:'}</p>
                </div>
            </div>
        `;

        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-questions-list';

        let score = 0;
        const answeredQuestions = new Set();

        quizItems.forEach((qItem, qIdx) => {
            const qBox = document.createElement('div');
            qBox.className = 'quiz-question-box';
            qBox.innerHTML = `
                <div class="quiz-q-title">
                    <span class="q-num">${qIdx + 1}</span>
                    <span>${qItem.question}</span>
                </div>
                <div class="quiz-options-list">
                    ${qItem.options.map((opt, optIdx) => `
                        <button class="quiz-opt-btn" data-qidx="${qIdx}" data-optidx="${optIdx}">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-feedback-row" style="display: none;"></div>
            `;

            const optButtons = qBox.querySelectorAll('.quiz-opt-btn');
            const feedbackRow = qBox.querySelector('.quiz-feedback-row');

            optButtons.forEach(btn => {
                btn.onclick = () => {
                    if (answeredQuestions.has(qIdx)) return;
                    answeredQuestions.add(qIdx);

                    const chosenIdx = parseInt(btn.dataset.optidx, 10);
                    const isCorrect = chosenIdx === qItem.correctIndex;

                    optButtons.forEach((b, bIdx) => {
                        b.disabled = true;
                        if (bIdx === qItem.correctIndex) {
                            b.classList.add('correct');
                        } else if (bIdx === chosenIdx) {
                            b.classList.add('wrong');
                        }
                    });

                    feedbackRow.style.display = 'block';
                    if (isCorrect) {
                        score++;
                        feedbackRow.className = 'quiz-feedback-row success';
                        feedbackRow.innerHTML = `<span style="margin-right:0.35rem;">${SVG_CHECK}</span> <strong>${isEn ? 'Correct!' : 'Rigtigt!'}</strong> ${qItem.explanation}`;
                    } else {
                        feedbackRow.className = 'quiz-feedback-row error';
                        feedbackRow.innerHTML = `<span style="margin-right:0.35rem;">${SVG_CROSS}</span> <strong>${isEn ? 'Not quite right.' : 'Ikke helt.'}</strong> ${qItem.explanation}`;
                    }

                    if (answeredQuestions.size === quizItems.length) {
                        showFinalScore();
                    }
                };
            });

            quizContainer.appendChild(qBox);
        });

        quizCard.appendChild(quizContainer);

        const scoreBanner = document.createElement('div');
        scoreBanner.className = 'quiz-score-banner';
        scoreBanner.style.display = 'none';
        quizCard.appendChild(scoreBanner);

        function showFinalScore() {
            scoreBanner.style.display = 'block';
            if (score === quizItems.length) {
                scoreBanner.className = 'quiz-score-banner perfect';
                scoreBanner.innerHTML = `
                    <div class="score-icon">${SVG_CHECK}</div>
                    <div class="score-title">${isEn ? 'Outstanding!' : 'Perfekt klaret!'}</div>
                    <div class="score-desc">${isEn ? `You got all ${quizItems.length} questions right!` : `Du svarede rigtigt på alle ${quizItems.length} spørgsmål!`}</div>
                `;
            } else {
                scoreBanner.className = 'quiz-score-banner good';
                scoreBanner.innerHTML = `
                    <div class="score-icon">${SVG_CHECK}</div>
                    <div class="score-title">${isEn ? 'Good job!' : 'Godt læst!'}</div>
                    <div class="score-desc">${isEn ? `You scored ${score} out of ${quizItems.length}.` : `Du fik ${score} ud af ${quizItems.length} rigtige.`}</div>
                `;
            }
        }

        return quizCard;
    }

    // --- 4. DEDIKERET TALEMÅDE-FLADE FOR AVANCEREDE KURSISTER (B1/B2) ---
    function renderStoryTalemaader(story) {
        const challenge = story.talemaaderChallenge;
        if (!challenge) {
            renderReader(story);
            return;
        }

        const pageWrapper = document.createElement('div');
        pageWrapper.className = 'hc-talemaader-page-wrapper';

        // 1. Hero Card
        const heroCard = document.createElement('div');
        heroCard.className = 'hc-talemaader-hero-card';
        heroCard.innerHTML = `
            <div class="hero-top-row">
                <span class="hero-badge">${isEn ? 'Optional Challenge • Advanced (B1/B2)' : 'Valgfri udfordring • For avancerede kursister (B1/B2)'}</span>
                <button type="button" class="hero-back-story-btn">
                    ← ${isEn ? 'Back to Story' : 'Tilbage til eventyret'}
                </button>
            </div>
            <h1 class="hero-title">${story.title}: ${isEn ? challenge.titleEn || challenge.title : challenge.title}</h1>
            <p class="hero-desc">${isEn ? challenge.descEn || challenge.desc : challenge.desc}</p>
            <div class="hero-stats-row">
                <div class="hero-stat-pill">
                    <span>${SVG_INFO}</span> <span>${isEn ? `${challenge.items.length} Idioms from the scenes` : `${challenge.items.length} talemåder fra scenerne`}</span>
                </div>
                <div class="hero-stat-pill">
                    <span>${isEn ? 'Linked to »Everyday Life Idioms«' : 'Koblet til »Livets omveje«'}</span>
                </div>
            </div>
        `;
        heroCard.querySelector('.hero-back-story-btn').onclick = () => {
            stopSpeech();
            activeStorySubView = 'story';
            renderView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pageWrapper.appendChild(heroCard);

        // 2. Progress Indicator
        const progressCard = document.createElement('div');
        progressCard.className = 'hc-talemaader-progress-card';
        progressCard.innerHTML = `
            <div class="progress-info">
                <span class="progress-label">${isEn ? 'Progress:' : 'Status:'}</span>
                <span class="progress-count" id="talemaader-progress-count">0 / ${challenge.items.length} ${isEn ? 'completed' : 'fuldført'}</span>
            </div>
            <div class="progress-bar-track">
                <div class="progress-bar-fill" id="talemaader-progress-fill" style="width: 0%;"></div>
            </div>
        `;
        pageWrapper.appendChild(progressCard);

        // 3. Questions Container
        const questionsList = document.createElement('div');
        questionsList.className = 'hc-talemaader-list';

        let correctCount = 0;
        const totalItems = challenge.items.length;
        const answeredItems = new Set();

        function updateProgress() {
            const countEl = pageWrapper.querySelector('#talemaader-progress-count');
            const fillEl = pageWrapper.querySelector('#talemaader-progress-fill');
            const pct = Math.round((correctCount / totalItems) * 100);
            if (countEl) {
                countEl.textContent = `${correctCount} / ${totalItems} ${isEn ? 'completed' : 'fuldført'}`;
            }
            if (fillEl) {
                fillEl.style.width = `${pct}%`;
            }

            if (correctCount === totalItems) {
                const celebrationEl = pageWrapper.querySelector('.hc-talemaader-celebration-banner');
                if (celebrationEl) {
                    celebrationEl.style.display = 'block';
                    celebrationEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }

        challenge.items.forEach((item, itemIdx) => {
            const card = document.createElement('div');
            card.className = 'hc-talemaade-item-card';
            card.id = `talemaade-item-${item.id}`;

            card.innerHTML = `
                <div class="item-header">
                    <div class="item-scene-pill">
                        <span>${isEn ? item.sceneTitleEn || item.sceneTitle : item.sceneTitle}</span>
                    </div>
                    <div class="item-idiom-badge">
                        <strong>»${item.idiom}«</strong>
                    </div>
                </div>

                <div class="item-context-box">
                    <div class="context-label">
                        <span>${isEn ? 'Situation in the fairy tale:' : 'Situationen i eventyret:'}</span>
                    </div>
                    <p class="context-quote">»${isEn ? item.sceneContextEn || item.sceneContext : item.sceneContext}«</p>
                </div>

                <div class="item-prompt-row">
                    <div class="item-prompt-question">
                        <strong>${isEn ? item.questionEn || item.question : item.question}</strong>
                    </div>
                    <button type="button" class="item-listen-btn" title="Hør talemåden">
                        <span>${SVG_AUDIO}</span> <span>${isEn ? 'Listen' : 'Lyt'}</span>
                    </button>
                </div>

                <div class="item-options-list">
                    ${item.options.map((opt, optIdx) => `
                        <button type="button" class="hc-idiom-opt-btn" data-itemidx="${itemIdx}" data-optidx="${optIdx}">
                            <span class="opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                            <span class="opt-text">${opt}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="item-feedback-box" style="display: none;"></div>
            `;

            // Listen button
            card.querySelector('.item-listen-btn').onclick = (e) => {
                e.stopPropagation();
                speakDanish(item.idiom);
            };

            const optButtons = card.querySelectorAll('.hc-idiom-opt-btn');
            const feedbackBox = card.querySelector('.item-feedback-box');

            optButtons.forEach(btn => {
                btn.onclick = () => {
                    const chosenIdx = parseInt(btn.dataset.optidx, 10);
                    const chosenText = item.options[chosenIdx];
                    const isCorrect = chosenText === item.correct;

                    if (isCorrect) {
                        if (!answeredItems.has(item.id)) {
                            answeredItems.add(item.id);
                            correctCount++;
                            updateProgress();
                        }

                        // Disable all buttons in this card and highlight correct
                        optButtons.forEach(b => {
                            b.disabled = true;
                            if (b.dataset.optidx === String(chosenIdx)) {
                                b.classList.add('correct');
                            } else {
                                b.classList.remove('wrong');
                            }
                        });

                        feedbackBox.style.display = 'block';
                        feedbackBox.className = 'item-feedback-box correct';
                        feedbackBox.innerHTML = `
                            <div class="feedback-badge"><span style="margin-right:0.35rem;">${SVG_CHECK}</span> ${isEn ? 'Correct!' : 'Helt rigtigt!'}</div>
                            <p class="feedback-explanation">${item.explanation}</p>
                            <div class="feedback-package-card">
                                <div class="pkg-card-left">
                                    <div class="pkg-card-icon">${SVG_INFO}</div>
                                    <div>
                                        <div class="pkg-card-title">${isEn ? 'Want to practice this idiom and see the illustration?' : 'Vil du træne denne talemåde og se illustrationen?'}</div>
                                        <div class="pkg-card-sub">${isEn ? `Module: »${item.moduleName}« in ${item.packageName}` : `Modul: »${item.moduleName}« i ${item.packageName}`}</div>
                                    </div>
                                </div>
                                <button type="button" class="pkg-card-action-btn">
                                    <span>${isEn ? `Open »${item.packageName}«` : `Gå til »${item.packageName}«`}</span>
                                    <span>→</span>
                                </button>
                            </div>
                        `;

                        // Wire up the link directly to the package!
                        const pkgBtn = feedbackBox.querySelector('.pkg-card-action-btn');
                        if (pkgBtn) {
                            pkgBtn.onclick = () => {
                                stopSpeech();
                                navigateFn('talemaader', { package: item.packageId || 'pkg1' });
                            };
                        }
                    } else {
                        btn.classList.add('wrong');
                        feedbackBox.style.display = 'block';
                        feedbackBox.className = 'item-feedback-box wrong';
                        feedbackBox.innerHTML = `
                            <div class="feedback-badge"><span style="margin-right:0.35rem;">${SVG_CROSS}</span> ${isEn ? 'Not quite right.' : 'Ikke helt rigtigt.'}</div>
                            <p class="feedback-explanation">${isEn ? 'That is a literal misunderstanding or another meaning. Try again!' : 'Det er den bogstavelige forståelse eller en anden betydning. Prøv en af de andre muligheder!'}</p>
                        `;
                    }
                };
            });

            questionsList.appendChild(card);
        });

        pageWrapper.appendChild(questionsList);

        // 4. Celebration Banner
        const celebrationBanner = document.createElement('div');
        celebrationBanner.className = 'hc-talemaader-celebration-banner';
        celebrationBanner.style.display = 'none';
        celebrationBanner.innerHTML = `
            <div class="celebration-icon">${SVG_CHECK}</div>
            <h2 class="celebration-title">${isEn ? 'Outstanding! You mastered the fairy tale idioms!' : 'Fantastisk! Du har mestret eventyrets talemåder!'}</h2>
            <p class="celebration-desc">
                ${isEn 
                    ? 'You have connected Clumsy Hans with the figurative Danish idioms. Now you know what it means to freeze up, nail it, and hit the jackpot!' 
                    : 'Du har nu forbundet Klods-Hans med de klassiske danske talemåder. Nu ved du præcis, hvad det betyder at gå i baglås, ramme plet og skyde papegøjen!'
                }
            </p>
            <div class="celebration-actions">
                <button type="button" class="celebration-btn secondary" id="celebration-back-btn">
                    ← ${isEn ? 'Back to Story' : 'Tilbage til eventyret'}
                </button>
                <button type="button" class="celebration-btn primary" id="celebration-talemaader-btn">
                    <span>${isEn ? 'Explore all idioms in »Livets omveje«' : 'Udforsk alle talemåder i »Livets omveje«'}</span>
                    <span>→</span>
                </button>
            </div>
        `;
        celebrationBanner.querySelector('#celebration-back-btn').onclick = () => {
            stopSpeech();
            activeStorySubView = 'story';
            renderView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        celebrationBanner.querySelector('#celebration-talemaader-btn').onclick = () => {
            stopSpeech();
            navigateFn('talemaader', { package: 'pkg1' });
        };
        pageWrapper.appendChild(celebrationBanner);

        mainContent.appendChild(pageWrapper);
    }

    // Initialize View
    renderView();
    container.appendChild(viewContainer);
}

function renderComingSoonView(container, navigateFn, extraData = {}) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container hc-andersen-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back to stories' : 'Tilbage til historier')}`;
    backBtn.onclick = () => navigateFn('historier_menu');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Hero Teaser
    let tapCount = 0;
    let tapTimer = null;

    const hero = document.createElement('div');
    hero.className = 'hc-hero-card';
    hero.innerHTML = `
        <div id="hc-coming-soon-castle" style="display:flex; justify-content:center; margin-bottom: 0.8rem; cursor: pointer; user-select: none;">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        </div>
        <div class="hc-hero-badge" style="margin-bottom: 1.2rem;">
            ${isEn ? 'Locked · Coming Soon' : 'Låst · Kommer snart'}
        </div>
        <h1 style="font-size: 2.3rem; font-weight: 800; margin: 0 0 1rem; color: #f8fafc;">
            H.C. Andersens Eventyr
        </h1>
        <p style="font-size: 1.08rem; color: #cbd5e1; max-width: 650px; margin: 0 auto 1.8rem; line-height: 1.65;">
            ${isEn
                ? 'We are building an interactive Danish fairy tale universe with simplified classics, search-and-find scenes, line-by-line grammar coaching, and native audio. This section is currently locked and will open soon!'
                : 'Vi er i fuld gang med at skabe en eventyrlig læringsflade med H.C. Andersens udødelige eventyr tilpasset danskkursister med interaktive vrimlebilleder, sætningstræning, gloser og professionel oplæsning. Siden er under udvikling og åbner snart!'}
        </p>
        <button id="hc-teaser-back-btn" style="
            background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
            color: #0f172a;
            border: none;
            font-size: 1rem;
            font-weight: 700;
            padding: 0.85rem 2.2rem;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(234, 179, 8, 0.4);
            transition: transform 0.15s ease;
        ">
            ← ${isEn ? 'Explore Other Stories' : 'Udforsk andre historier'}
        </button>
    `;

    hero.querySelector('#hc-teaser-back-btn').onclick = () => navigateFn('historier_menu');

    // Secret 5-tap developer unlock on the castle icon
    hero.querySelector('#hc-coming-soon-castle').onclick = () => {
        tapCount++;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
        if (tapCount >= 5) {
            setHCDevMode(true);
            alert(isEn ? 'Developer mode activated!' : 'Udviklertilstand aktiveret!');
            renderHCAndersenView(container, navigateFn, { ...extraData, dev: 'true' });
        }
    };

    viewContainer.appendChild(hero);
    container.innerHTML = '';
    container.appendChild(viewContainer);
}

function injectStyles() {
    if (document.getElementById('hc-andersen-styles')) return;

    const style = document.createElement('style');
    style.id = 'hc-andersen-styles';
    style.textContent = `
        .hc-andersen-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 1rem 1.2rem 4rem;
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* Hero — Kølig Skandinavisk Minimalisme (Forslag 3) */
        .hc-hero-card {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 18px;
            padding: 2.2rem 2rem;
            text-align: center;
            margin-bottom: 2.4rem;
            box-shadow: none;
            position: relative;
            overflow: hidden;
        }
        .hc-hero-badge {
            display: inline-block;
            background: rgba(43, 110, 120, 0.2);
            border: 1px solid rgba(76, 155, 166, 0.45);
            color: #7ec4ce;
            padding: 0.35rem 1rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .hc-hero-title {
            color: #f1f5f9;
            font-size: clamp(2rem, 4vw, 2.7rem);
            margin: 0 0 0.9rem 0;
            font-weight: 800;
            letter-spacing: -0.02em;
            text-shadow: none;
        }
        .hc-hero-desc {
            color: #94a3b8;
            font-size: 1.08rem;
            line-height: 1.65;
            max-width: 720px;
            margin: 0 auto 1.6rem auto;
        }
        .hc-features-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem 0.7rem;
            justify-content: center;
        }
        .hc-pill {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.13);
            color: #cbd5e1;
            padding: 0.38rem 0.85rem;
            border-radius: 10px;
            font-size: 0.86rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }

        .hc-section-title {
            font-size: 1.35rem;
            color: #f1f5f9;
            margin: 0 0 1.2rem 0;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        /* Stories Grid */
        .hc-stories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 1.4rem;
            margin-bottom: 3rem;
        }
        .hc-story-card {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            border-radius: 16px;
            padding: 1.5rem;
            cursor: pointer;
            transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            position: relative;
        }
        .hc-story-card:hover {
            transform: translateY(-3px);
            border-color: rgba(76, 155, 166, 0.55);
            background: #1a212b;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.32);
        }
        .hc-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .hc-card-icon {
            font-size: 2.2rem;
            color: #94a3b8;
        }
        .hc-card-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            align-items: center;
        }
        .hc-wimmel-tag {
            background: rgba(43, 110, 120, 0.22);
            border: 1px solid rgba(76, 155, 166, 0.48);
            color: #7ec4ce;
            padding: 0.24rem 0.62rem;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 700;
        }
        .hc-level-tag,
        .hc-time-tag {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.15);
            color: #94a3b8;
            padding: 0.24rem 0.6rem;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 600;
        }
        .hc-card-title {
            font-size: 1.45rem;
            color: #f1f5f9;
            margin: 0;
            font-weight: 700;
        }
        .hc-card-subtitle {
            color: #94a3b8;
            font-size: 0.9rem;
            font-style: italic;
            margin-top: -0.35rem;
        }
        .hc-card-quote {
            margin: 0.35rem 0;
            padding: 0.58rem 0.85rem;
            background: rgba(203, 213, 225, 0.04);
            border-left: 3px solid #64748b;
            color: #cbd5e1;
            font-size: 0.92rem;
            font-style: italic;
            border-radius: 0 8px 8px 0;
            line-height: 1.45;
        }
        .hc-card-teaser {
            color: #94a3b8;
            font-size: 0.95rem;
            line-height: 1.55;
            margin: 0;
            flex-grow: 1;
        }
        .hc-card-footer {
            margin-top: 0.55rem;
            display: flex;
            justify-content: flex-end;
        }
        .hc-read-btn {
            background: #2b6e78;
            border: 1px solid #3d8b96;
            color: #ffffff;
            padding: 0.56rem 1.15rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            transition: background 0.2s ease, border-color 0.2s ease;
        }
        .hc-story-card:hover .hc-read-btn {
            background: #35838f;
            border-color: #4c9ba6;
        }

        /* Reader Area */
        .hc-reader-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1.8rem;
        }
        .hc-reader-header {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 18px;
            padding: 1.8rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .hc-reader-meta {
            display: flex;
            align-items: center;
            gap: 1.2rem;
        }
        .hc-reader-icon {
            font-size: 3rem;
            flex-shrink: 0;
        }
        .hc-reader-title {
            font-size: clamp(1.8rem, 3.5vw, 2.4rem);
            color: #fef08a;
            margin: 0 0 0.4rem 0;
            font-weight: 800;
        }
        .hc-reader-sub {
            color: #cbd5e1;
            font-size: 1rem;
        }
        .hc-level-tag-inline {
            color: #4ade80;
            font-weight: 700;
        }
        .hc-reader-quote-banner {
            background: rgba(234, 179, 8, 0.1);
            border-left: 4px solid #eab308;
            padding: 0.8rem 1.2rem;
            border-radius: 0 10px 10px 0;
            color: #fde047;
            font-size: 1.05rem;
            font-style: italic;
        }

        /* Toolbar */
        .hc-toolbar {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 0.8rem 1.2rem;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
        }
        .main-listen-btn {
            background: #22c55e;
            border: none;
            color: #052e16;
            padding: 0.65rem 1.3rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
            transition: all 0.2s;
        }
        .main-listen-btn:hover {
            background: #4ade80;
            transform: scale(1.02);
        }
        .main-listen-btn.playing {
            background: #ef4444;
            color: #fff;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        .hc-mode-toggle {
            display: flex;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 3px;
        }
        .mode-tab-btn {
            background: none;
            border: none;
            color: #94a3b8;
            padding: 0.45rem 0.9rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .mode-tab-btn.active {
            background: #0284c7;
            color: #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }
        .hc-font-control {
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .font-label {
            font-size: 0.85rem;
            color: #94a3b8;
            margin-right: 0.2rem;
        }
        .font-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #cbd5e1;
            padding: 0.35rem 0.65rem;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .font-btn.active {
            background: #eab308;
            color: #0f172a;
            border-color: #eab308;
        }

        /* Step navigation pills */
        .hc-step-nav {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
        }
        .hc-step-pill {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #94a3b8;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.92rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .hc-step-pill:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.12);
        }
        .hc-step-pill.active {
            background: #0284c7;
            color: #fff;
            border-color: #0284c7;
            font-weight: 700;
        }

        /* Section card */
        .hc-section-card {
            background: rgba(30, 41, 59, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 1.8rem;
            margin-bottom: 1.4rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.8rem;
            margin-bottom: 1.4rem;
        }
        .section-header h3 {
            font-size: 1.3rem;
            color: #fde047;
            margin: 0;
            font-weight: 700;
        }
        .section-audio-btn {
            background: rgba(2, 132, 199, 0.15);
            border: 1px solid rgba(2, 132, 199, 0.4);
            color: #60a5fa;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.88rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s;
        }
        .section-audio-btn:hover {
            background: rgba(2, 132, 199, 0.3);
            color: #fff;
        }

        /* --- VRIMLEBILLEDE STAGE & HOTSPOTS --- */
        .hc-vrimmel-stage {
            position: relative;
            width: 100%;
            line-height: 0;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 1.4rem;
            border: 2px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.55);
        }
        .hc-vrimmel-img {
            width: 100%;
            height: auto;
            display: block;
            filter: brightness(0.98);
            transition: filter 0.3s ease;
        }
        .hc-hotspot-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10;
            animation: pulsePin 2.5s infinite;
        }
        @keyframes pulsePin {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        .hc-hotspot-pin.pin-sub { background: #22c55e; }
        .hc-hotspot-pin.pin-vrb { background: #ef4444; }
        .hc-hotspot-pin.pin-adj { background: #f97316; }
        .hc-hotspot-pin.pin-adv { background: #38bdf8; }
        .hc-hotspot-pin.pin-konj { background: #a855f7; }
        .hc-hotspot-pin.pin-prep { background: #eab308; }
        .hc-hotspot-pin.pin-pro { background: #ec4899; }
        .hc-hotspot-pin:hover {
            transform: translate(-50%, -50%) scale(1.25) !important;
            z-index: 30;
            box-shadow: 0 0 16px #ffffff, 0 0 10px currentColor;
        }
        .hc-hotspot-pin .pin-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ffffff;
            display: block;
            pointer-events: none;
        }
        .hc-hotspot-pill {
            position: absolute;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.94);
            backdrop-filter: blur(8px);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 0.15rem 0.5rem;
            border-radius: 8px;
            font-size: 0.72rem;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            pointer-events: none;
            display: flex;
            align-items: center;
            gap: 0.2rem;
            opacity: 0.95;
            transition: all 0.2s ease;
        }
        .hc-hotspot-pin:hover .hc-hotspot-pill {
            opacity: 1;
            border-color: #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.7);
        }
        .hc-vrimmel-stage.hotspots-hidden .hc-hotspot-pin {
            display: none !important;
        }
        .hc-vrimmel-controls {
            display: flex;
            justify-content: flex-end;
            margin: 0.45rem 0 0.2rem;
        }
        .hc-pins-toggle-btn {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.16);
            color: #94a3b8;
            padding: 0.3rem 0.7rem;
            border-radius: 999px;
            font-size: 0.74rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            transition: all 0.16s ease;
        }
        .hc-pins-toggle-btn:hover {
            border-color: #4c9ba6;
            color: #f1f5f9;
        }
        .hc-script-download-row {
            display: flex;
            justify-content: flex-end;
            margin-top: 1.15rem;
            padding-top: 0.85rem;
            border-top: 1px solid rgba(203, 213, 225, 0.08);
        }
        .hc-script-download-btn {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.16);
            color: #94a3b8;
            padding: 0.36rem 0.8rem;
            border-radius: 999px;
            font-size: 0.76rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.16s ease;
        }
        .hc-script-download-btn:hover {
            border-color: #4c9ba6;
            color: #f1f5f9;
            background: rgba(76, 155, 166, 0.1);
        }
        @media (max-width: 640px) {
            .hc-hotspot-pin {
                width: 14px;
                height: 14px;
                border-width: 1.5px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
                animation: none;
                opacity: 0.88;
            }
            .hc-hotspot-pin::before {
                content: '';
                position: absolute;
                inset: -9px;
            }
            .hc-hotspot-pin .pin-dot {
                width: 3px;
                height: 3px;
            }
            .hc-hotspot-pill {
                display: none;
            }
        }

        /* Grammar Color Legend */
        .hc-grammar-legend {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 0.5rem 0.8rem;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            padding: 0.7rem 1rem;
            margin-bottom: 1.4rem;
        }
        .hc-legend-item {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.82rem;
            font-weight: 700;
            padding: 0.25rem 0.55rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
            border: 1px solid transparent;
        }
        .hc-legend-item:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-1px);
        }
        .hc-legend-item.active-legend {
            background: rgba(255, 255, 255, 0.15);
            border-color: currentColor;
            box-shadow: 0 0 10px currentColor;
        }
        .hc-legend-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        .hc-legend-hint {
            width: 100%;
            text-align: center;
            font-size: 0.8rem;
            color: #94a3b8;
            margin-top: 0.2rem;
        }

        /* --- DIALOGUE & INTERACTIVE WORDS --- */
        .hc-dialogue-list {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        .hc-dialogue-line {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.1rem 1.3rem;
            transition: border-color 0.2s;
        }
        .hc-dialogue-line:hover {
            border-color: rgba(255, 255, 255, 0.2);
        }
        .hc-speaker-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.6rem;
        }
        .hc-speaker-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            font-weight: 800;
            font-size: 1.05rem;
            color: #fef08a;
        }
        .hc-speaker-audio-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #60a5fa;
            border-radius: 8px;
            padding: 0.25rem 0.65rem;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            transition: all 0.2s;
        }
        .hc-speaker-audio-btn:hover {
            background: rgba(2, 132, 199, 0.3);
            color: #fff;
        }
        .hc-line-speech {
            font-size: 1.18rem;
            line-height: 1.8;
            color: #f1f5f9;
        }
        .font-size-0 .hc-line-speech { font-size: 1.05rem; }
        .font-size-1 .hc-line-speech { font-size: 1.2rem; }
        .font-size-2 .hc-line-speech { font-size: 1.38rem; }

        /* Word Tokens: Neutral by default, highlighting only when activated in tasks or legend */
        .hc-word-token {
            cursor: pointer;
            padding: 0.12rem 0.35rem;
            border-radius: 6px;
            font-weight: 600;
            color: #f1f5f9;
            background: transparent;
            border-bottom: 2px solid transparent;
            transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                        background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                        border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                        box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                        transform 0.2s ease;
            display: inline-block;
            position: relative;
        }
        .hc-word-token:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.12);
            border-bottom: 2px solid rgba(255, 255, 255, 0.4);
            transform: translateY(-1.5px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        }

        /* Grammar Highlights: Fader frem når den pågældende kategori aktiveres */
        .hc-section-card[data-active-highlight="substantiver"] .hc-word-token.token-class-sub,
        .hc-section-card[data-active-highlight="substantiver"] .hc-word-token.token-sub,
        .hc-section-card[data-active-highlight="substantiver"] .hc-word-token.token-substantiv,
        .hc-section-card[data-active-highlight="substantiver"] .hc-word-token.token-egenavn {
            color: #4ade80 !important;
            background: rgba(34, 197, 94, 0.22) !important;
            border-bottom: 2px solid #22c55e !important;
            border-radius: 6px;
            box-shadow: 0 0 14px rgba(34, 197, 94, 0.45);
            animation: grammarToneFrem 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-section-card[data-active-highlight="verber"] .hc-word-token.token-class-vrb,
        .hc-section-card[data-active-highlight="verber"] .hc-word-token.token-vrb,
        .hc-section-card[data-active-highlight="verber"] .hc-word-token.token-verbum {
            color: #f87171 !important;
            background: rgba(239, 68, 68, 0.22) !important;
            border-bottom: 2px solid #ef4444 !important;
            border-radius: 6px;
            box-shadow: 0 0 14px rgba(239, 68, 68, 0.45);
            animation: grammarToneFrem 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-section-card[data-active-highlight="adjektiver"] .hc-word-token.token-class-adj,
        .hc-section-card[data-active-highlight="adjektiver"] .hc-word-token.token-adj,
        .hc-section-card[data-active-highlight="adjektiver"] .hc-word-token.token-adjektiv {
            color: #fb923c !important;
            background: rgba(249, 115, 22, 0.22) !important;
            border-bottom: 2px solid #f97316 !important;
            border-radius: 6px;
            box-shadow: 0 0 14px rgba(249, 115, 22, 0.45);
            animation: grammarToneFrem 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-section-card[data-active-highlight="adverbier"] .hc-word-token.token-class-adv,
        .hc-section-card[data-active-highlight="adverbier"] .hc-word-token.token-adv,
        .hc-section-card[data-active-highlight="adverbier"] .hc-word-token.token-adverbium {
            color: #38bdf8 !important;
            background: rgba(56, 189, 248, 0.22) !important;
            border-bottom: 2px solid #38bdf8 !important;
            border-radius: 6px;
            box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
            animation: grammarToneFrem 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-section-card[data-active-highlight="konjunktioner"] .hc-word-token.token-class-konj,
        .hc-section-card[data-active-highlight="konjunktioner"] .hc-word-token.token-konj {
            color: #c084fc !important;
            background: rgba(168, 85, 247, 0.22) !important;
            border-bottom: 2px solid #a855f7 !important;
            border-radius: 6px;
            box-shadow: 0 0 14px rgba(168, 85, 247, 0.45);
            animation: grammarToneFrem 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-section-card[data-active-highlight="praepositioner"] .hc-word-token.token-class-prep,
        .hc-section-card[data-active-highlight="praepositioner"] .hc-word-token.token-prep {
            color: #fde047 !important;
            background: rgba(234, 179, 8, 0.22) !important;
            border-bottom: 2px solid #eab308 !important;
            border-radius: 6px;
            box-shadow: 0 0 14px rgba(234, 179, 8, 0.45);
            animation: grammarToneFrem 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-section-card[data-active-highlight="pronominer"] .hc-word-token.token-class-pro,
        .hc-section-card[data-active-highlight="pronominer"] .hc-word-token.token-pro {
            color: #f472b6 !important;
            background: rgba(236, 72, 153, 0.22) !important;
            border-bottom: 2px solid #ec4899 !important;
            border-radius: 6px;
            box-shadow: 0 0 14px rgba(236, 72, 153, 0.45);
        }
        /* Verbe-tidsfilter oppe i eventyrteksten når man klikker Datid / Førnutid / Nutid / Fremtid */
        .hc-section-card[data-verb-tense-filter="datid"] .hc-word-token.token-class-vrb:not([data-verb-tense="datid"]),
        .hc-section-card[data-verb-tense-filter="foernutid"] .hc-word-token.token-class-vrb:not([data-verb-tense="foernutid"]),
        .hc-section-card[data-verb-tense-filter="nutid"] .hc-word-token.token-class-vrb:not([data-verb-tense="nutid"]),
        .hc-section-card[data-verb-tense-filter="fremtid"] .hc-word-token.token-class-vrb:not([data-verb-tense="fremtid"]) {
            opacity: 0.32 !important;
            background: transparent !important;
            border-bottom-color: transparent !important;
            box-shadow: none !important;
        }
        .hc-section-card[data-verb-tense-filter="datid"] .hc-word-token[data-verb-tense="datid"],
        .hc-section-card[data-verb-tense-filter="foernutid"] .hc-word-token[data-verb-tense="foernutid"],
        .hc-section-card[data-verb-tense-filter="nutid"] .hc-word-token[data-verb-tense="nutid"],
        .hc-section-card[data-verb-tense-filter="fremtid"] .hc-word-token[data-verb-tense="fremtid"] {
            color: #ffffff !important;
            background: rgba(239, 68, 68, 0.34) !important;
            border-bottom: 2.5px solid #fca5a5 !important;
            box-shadow: 0 0 16px rgba(239, 68, 68, 0.55) !important;
        }
        /* Substantiv-formfilter oppe i eventyrteksten når man klikker Ubestemt / Bestemt */
        .hc-section-card[data-noun-form-filter="ubestemt"] .hc-word-token.token-class-sub:not([data-noun-form="ubestemt"]),
        .hc-section-card[data-noun-form-filter="bestemt"] .hc-word-token.token-class-sub:not([data-noun-form="bestemt"]) {
            opacity: 0.30 !important;
            background: transparent !important;
            border-bottom-color: transparent !important;
            box-shadow: none !important;
        }
        .hc-section-card[data-noun-form-filter="ubestemt"] .hc-word-token[data-noun-form="ubestemt"],
        .hc-section-card[data-noun-form-filter="bestemt"] .hc-word-token[data-noun-form="bestemt"] {
            color: #ffffff !important;
            background: rgba(34, 197, 94, 0.32) !important;
            border-bottom: 2.5px solid #86efac !important;
            box-shadow: 0 0 16px rgba(34, 197, 94, 0.52) !important;
        }
        .hc-tense-btn.hc-noun-btn:hover {
            border-color: rgba(74, 222, 128, 0.55);
            color: #ffffff;
        }
        .hc-tense-btn.hc-noun-btn.active {
            background: rgba(34, 197, 94, 0.22);
            border-color: #4ade80;
            color: #bbf7d0;
        }
        .hc-tense-explain.hc-noun-explain {
            border-left-color: #22c55e;
        }
        .hc-tense-found.hc-noun-found {
            color: #86efac;
        }
        /* Pronomen-filter oppe i eventyrteksten når man klikker Subjekt / Objekt */
        .hc-section-card[data-pronoun-case-filter="subjekt"] .hc-word-token.token-class-pro:not([data-pronoun-case="subjekt"]),
        .hc-section-card[data-pronoun-case-filter="objekt"] .hc-word-token.token-class-pro:not([data-pronoun-case="objekt"]) {
            opacity: 0.28 !important;
            background: transparent !important;
            border-bottom-color: transparent !important;
            box-shadow: none !important;
        }
        .hc-section-card[data-pronoun-case-filter="subjekt"] .hc-word-token[data-pronoun-case="subjekt"],
        .hc-section-card[data-pronoun-case-filter="objekt"] .hc-word-token[data-pronoun-case="objekt"] {
            color: #ffffff !important;
            background: rgba(236, 72, 153, 0.34) !important;
            border-bottom: 2.5px solid #f9a8d4 !important;
            box-shadow: 0 0 16px rgba(236, 72, 153, 0.55) !important;
        }
        .hc-tense-btn.hc-pro-btn:hover {
            border-color: rgba(244, 114, 182, 0.55);
            color: #ffffff;
        }
        .hc-tense-btn.hc-pro-btn.active {
            background: rgba(236, 72, 153, 0.22);
            border-color: #f472b6;
            color: #fbcfe8;
        }
        .hc-tense-explain.hc-pro-explain {
            border-left-color: #ec4899;
        }
        .hc-tense-found.hc-pro-found {
            color: #f9a8d4;
        }
        /* Adjektiv-formfilter oppe i eventyrteksten når man klikker Grundform / -e / Gradbøjning */
        .hc-section-card[data-adj-form-filter="grundform"] .hc-word-token.token-class-adj:not([data-adj-form="grundform"]),
        .hc-section-card[data-adj-form-filter="e_form"] .hc-word-token.token-class-adj:not([data-adj-form="e_form"]),
        .hc-section-card[data-adj-form-filter="grad"] .hc-word-token.token-class-adj:not([data-adj-form="grad"]) {
            opacity: 0.28 !important;
            background: transparent !important;
            border-bottom-color: transparent !important;
            box-shadow: none !important;
        }
        .hc-section-card[data-adj-form-filter="grundform"] .hc-word-token[data-adj-form="grundform"],
        .hc-section-card[data-adj-form-filter="e_form"] .hc-word-token[data-adj-form="e_form"],
        .hc-section-card[data-adj-form-filter="grad"] .hc-word-token[data-adj-form="grad"] {
            color: #ffffff !important;
            background: rgba(249, 115, 22, 0.34) !important;
            border-bottom: 2.5px solid #fdba74 !important;
            box-shadow: 0 0 16px rgba(249, 115, 22, 0.55) !important;
        }
        .hc-tense-btn.hc-adj-btn:hover {
            border-color: rgba(251, 146, 60, 0.55);
            color: #ffffff;
        }
        .hc-tense-btn.hc-adj-btn.active {
            background: rgba(249, 115, 22, 0.22);
            border-color: #fb923c;
            color: #fed7aa;
        }
        .hc-tense-explain.hc-adj-explain {
            border-left-color: #f97316;
        }
        .hc-tense-found.hc-adj-found {
            color: #fdba74;
        }
        /* Adverbie-typefilter oppe i eventyrteksten når man klikker Sted / Tid / Grad & måde / Småord */
        .hc-section-card[data-adv-type-filter="sted"] .hc-word-token.token-class-adv:not([data-adv-type="sted"]),
        .hc-section-card[data-adv-type-filter="tid"] .hc-word-token.token-class-adv:not([data-adv-type="tid"]),
        .hc-section-card[data-adv-type-filter="grad_maade"] .hc-word-token.token-class-adv:not([data-adv-type="grad_maade"]),
        .hc-section-card[data-adv-type-filter="smaaord"] .hc-word-token.token-class-adv:not([data-adv-type="smaaord"]) {
            opacity: 0.28 !important;
            background: transparent !important;
            border-bottom-color: transparent !important;
            box-shadow: none !important;
        }
        .hc-section-card[data-adv-type-filter="sted"] .hc-word-token[data-adv-type="sted"],
        .hc-section-card[data-adv-type-filter="tid"] .hc-word-token[data-adv-type="tid"],
        .hc-section-card[data-adv-type-filter="grad_maade"] .hc-word-token[data-adv-type="grad_maade"],
        .hc-section-card[data-adv-type-filter="smaaord"] .hc-word-token[data-adv-type="smaaord"] {
            color: #ffffff !important;
            background: rgba(56, 189, 248, 0.32) !important;
            border-bottom: 2.5px solid #7dd3fc !important;
            box-shadow: 0 0 16px rgba(56, 189, 248, 0.52) !important;
        }
        .hc-tense-btn.hc-adv-btn:hover {
            border-color: rgba(125, 211, 252, 0.55);
            color: #ffffff;
        }
        .hc-tense-btn.hc-adv-btn.active {
            background: rgba(56, 189, 248, 0.22);
            border-color: #38bdf8;
            color: #bae6fd;
        }
        .hc-tense-explain.hc-adv-explain {
            border-left-color: #38bdf8;
        }
        .hc-tense-found.hc-adv-found {
            color: #7dd3fc;
        }
        .hc-tense-diagram {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.14);
            border-radius: 12px;
            padding: 0.9rem 1rem;
            margin-bottom: 0.95rem;
        }
        .hc-tense-diagram-head {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            justify-content: space-between;
            gap: 0.4rem;
            margin-bottom: 0.5rem;
        }
        .hc-tense-diagram-title {
            font-size: 0.86rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .hc-tense-diagram-hint {
            font-size: 0.76rem;
            color: #94a3b8;
        }
        .hc-tense-svg {
            width: 100%;
            max-width: 560px;
            height: auto;
            display: block;
            margin: 0.25rem auto 0.65rem;
        }
        .hc-tense-btns {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            justify-content: center;
        }
        .hc-tense-btn {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.18);
            color: #cbd5e1;
            padding: 0.38rem 0.78rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .hc-tense-btn:hover {
            border-color: rgba(248, 113, 113, 0.55);
            color: #ffffff;
        }
        .hc-tense-btn.active {
            background: rgba(239, 68, 68, 0.22);
            border-color: #f87171;
            color: #fecaca;
        }
        .hc-tense-btn.hc-tense-clear {
            background: transparent;
            color: #94a3b8;
        }
        .hc-tense-explain {
            margin-top: 0.65rem;
            padding: 0.6rem 0.8rem;
            background: #151a21;
            border-left: 3px solid #ef4444;
            border-radius: 6px;
            font-size: 0.82rem;
            color: #cbd5e1;
            line-height: 1.45;
        }
        .hc-tense-found {
            margin-top: 0.35rem;
            color: #fca5a5;
            font-size: 0.8rem;
        }
            animation: grammarToneFrem 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes grammarToneFrem {
            0% { transform: scale(1); filter: brightness(1); }
            45% { transform: scale(1.08); filter: brightness(1.4); }
            100% { transform: scale(1); filter: brightness(1); }
        }

        /* Locked Teaser for Scene Tasks */
        .hc-tasks-locked-teaser {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.2rem;
            margin: 2rem 0 1.5rem;
            padding: 1.1rem 1.4rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1.5px dashed rgba(255, 255, 255, 0.18);
            border-radius: 16px;
            color: #94a3b8;
            backdrop-filter: blur(8px);
            transition: all 0.3s ease;
        }
        .hc-locked-badge {
            font-size: 1.4rem;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .hc-locked-info {
            flex: 1;
        }
        .hc-locked-title {
            font-size: 1.05rem;
            font-weight: 800;
            color: #e2e8f0;
            margin-bottom: 0.2rem;
        }
        .hc-locked-hint {
            font-size: 0.88rem;
            color: #94a3b8;
            line-height: 1.4;
        }
        .hc-locked-status-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.45rem 0.85rem;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.16);
            color: #f1f5f9;
            font-size: 0.84rem;
            font-weight: 700;
            white-space: nowrap;
        }

        .hc-task-highlight-hint {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.45rem 0.9rem;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            font-size: 0.84rem;
            color: #e2e8f0;
            margin-bottom: 1rem;
        }
        .hc-task-highlight-hint .hint-bullet {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
        }

        .tasks-slide-in {
            animation: tasksSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes tasksSlideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Typography sizing */
        .font-size-0 .story-paragraph { font-size: 1.05rem; line-height: 1.7; }
        .font-size-1 .story-paragraph { font-size: 1.22rem; line-height: 1.8; }
        .font-size-2 .story-paragraph { font-size: 1.42rem; line-height: 1.9; }

        .story-paragraph {
            color: #f1f5f9;
            margin: 0 0 1.2rem 0;
            letter-spacing: 0.1px;
        }
        .story-paragraph:last-child {
            margin-bottom: 0;
        }

        /* Vocabulary highlighting */
        .vocab-highlight {
            border-bottom: 2px dashed #eab308;
            color: #fde047;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s;
            padding: 0 2px;
            border-radius: 3px;
        }
        .vocab-highlight:hover {
            background: rgba(234, 179, 8, 0.25);
            border-bottom-style: solid;
        }

        /* Tooltip popup */
        .hc-word-tooltip {
            position: absolute;
            bottom: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%);
            background: #0f172a;
            border: 1.5px solid #eab308;
            border-radius: 10px;
            padding: 0.75rem 1rem;
            min-width: 200px;
            max-width: 280px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            z-index: 100;
            text-align: left;
            animation: fadeInTip 0.18s ease;
        }
        @keyframes fadeInTip {
            from { opacity: 0; transform: translate(-50%, 4px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
        .tooltip-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-bottom: 0.3rem;
        }
        .tooltip-top strong {
            color: #fde047;
            font-size: 1rem;
        }
        .tooltip-type {
            font-size: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            color: #94a3b8;
            padding: 1px 6px;
            border-radius: 4px;
        }
        .tooltip-close {
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 0.85rem;
            padding: 0;
        }
        .tooltip-da {
            font-size: 0.88rem;
            color: #e2e8f0;
            line-height: 1.35;
            margin-bottom: 0.25rem;
        }
        .tooltip-en {
            font-size: 0.82rem;
            color: #94a3b8;
            font-style: italic;
        }

        /* Preposition modal */
        .hc-prep-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: fadeInTip 0.2s ease;
        }
        .hc-prep-modal-overlay.fade-out {
            opacity: 0;
            transition: opacity 0.16s ease;
        }
        .hc-prep-modal {
            background: rgba(15, 23, 42, 0.96);
            border: 2px solid #eab308;
            border-radius: 20px;
            width: 100%;
            max-width: 480px;
            color: #f8fafc;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(234, 179, 8, 0.3);
            overflow: hidden;
        }
        .hc-prep-header {
            background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(15, 23, 42, 0.9));
            padding: 1rem 1.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(234, 179, 8, 0.3);
        }
        .hc-prep-badge {
            background: rgba(234, 179, 8, 0.2);
            border: 1px solid #eab308;
            color: #fde047;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
        }
        .hc-prep-close {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #94a3b8;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .hc-prep-body {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .hc-prep-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hc-prep-word {
            font-size: 1.8rem;
            color: #fde047;
            font-weight: 800;
            margin: 0;
        }
        .hc-prep-tts-btn {
            background: rgba(234, 179, 8, 0.2);
            border: 1px solid #eab308;
            color: #fde047;
            padding: 0.4rem 0.85rem;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
        }
        .hc-prep-desc {
            font-size: 0.96rem;
            color: #e2e8f0;
            line-height: 1.45;
            margin: 0;
        }
        .hc-prep-sentence {
            background: rgba(234, 179, 8, 0.08);
            border-left: 3px solid #eab308;
            padding: 0.7rem 1rem;
            border-radius: 0 10px 10px 0;
            color: #fef08a;
            font-style: italic;
            font-size: 0.92rem;
        }
        .hc-prep-ok-btn {
            background: #eab308;
            color: #0f172a;
            border: none;
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            margin-top: 0.3rem;
            transition: all 0.2s;
        }
        .hc-prep-ok-btn:hover {
            background: #fde047;
            transform: translateY(-2px);
        }

        /* Step actions */
        .hc-step-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1.5rem;
        }
        .step-action-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.98rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .step-action-btn:hover {
            background: rgba(255, 255, 255, 0.18);
            transform: translateY(-2px);
        }
        .step-action-btn.next {
            background: #0284c7;
            border-color: #0284c7;
        }
        .step-action-btn.next:hover {
            background: #0369a1;
        }
        .step-action-btn.quiz-jump {
            background: #eab308;
            border-color: #eab308;
            color: #0f172a;
        }
        .step-action-btn.quiz-jump:hover {
            background: #fde047;
        }
        .step-action-btn.finale-next {
            background: linear-gradient(135deg, #9333ea, #7e22ce);
            border: 1.5px solid #c084fc;
            box-shadow: 0 4px 14px rgba(147, 51, 234, 0.4);
            color: #ffffff;
        }
        .step-action-btn.finale-next:hover {
            background: linear-gradient(135deg, #a855f7, #9333ea);
            box-shadow: 0 6px 18px rgba(168, 85, 247, 0.5);
            transform: translateY(-2px);
        }
        .hc-step-pill.finale-step {
            border-color: rgba(168, 85, 247, 0.5);
            color: #d8b4fe;
            background: rgba(168, 85, 247, 0.15);
        }
        .hc-step-pill.finale-step:hover {
            border-color: #c084fc;
            color: #ffffff;
            background: rgba(168, 85, 247, 0.25);
        }
        .hc-step-pill.finale-step.active {
            background: linear-gradient(135deg, #a855f7, #7e22ce);
            color: #ffffff;
            border-color: #c084fc;
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
        }

        /* Grammar spot */
        .hc-grammar-spot {
            background: rgba(139, 92, 246, 0.1);
            border: 1.5px solid #8b5cf6;
            border-radius: 16px;
            padding: 1.4rem 1.6rem;
        }
        .grammar-spot-header {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-bottom: 0.5rem;
        }
        .grammar-spot-header h4 {
            font-size: 1.15rem;
            color: #c084fc;
            margin: 0;
            font-weight: 700;
        }
        .grammar-spot-text {
            color: #e2e8f0;
            font-size: 1rem;
            line-height: 1.55;
            margin: 0;
        }
        .grammar-spot-text em {
            color: #fde047;
            font-style: normal;
            font-weight: 600;
        }

        /* Vocab Card */
        .hc-vocab-card {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 18px;
            padding: 1.6rem;
        }
        .vocab-header {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-bottom: 0.3rem;
        }
        .vocab-header h3 {
            font-size: 1.3rem;
            color: #fde047;
            margin: 0;
            font-weight: 700;
        }
        .vocab-hint {
            color: #94a3b8;
            font-size: 0.9rem;
            margin: 0 0 1.2rem 0;
        }
        .vocab-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1rem;
        }
        .vocab-item {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.85rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }
        .vocab-item-top {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .vocab-word {
            font-size: 1.05rem;
            color: #4ade80;
        }
        .vocab-type {
            font-size: 0.75rem;
            background: rgba(255, 255, 255, 0.08);
            color: #94a3b8;
            padding: 1px 6px;
            border-radius: 4px;
        }
        .vocab-speak-btn {
            background: none;
            border: none;
            color: #60a5fa;
            cursor: pointer;
            font-size: 0.95rem;
            margin-left: auto;
            padding: 2px 4px;
            transition: transform 0.15s;
        }
        .vocab-speak-btn:hover {
            transform: scale(1.2);
        }
        .vocab-meaning-da {
            font-size: 0.92rem;
            color: #e2e8f0;
            line-height: 1.3;
        }
        .vocab-meaning-en {
            font-size: 0.82rem;
            color: #94a3b8;
            font-style: italic;
        }

        /* Quiz Card */
        .hc-quiz-card {
            background: rgba(30, 41, 59, 0.85);
            border: 2px solid #0284c7;
            border-radius: 18px;
            padding: 1.8rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .quiz-header {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            margin-bottom: 1.4rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.8rem;
        }
        .quiz-icon {
            font-size: 2rem;
        }
        .quiz-header h3 {
            font-size: 1.35rem;
            color: #38bdf8;
            margin: 0 0 0.3rem 0;
            font-weight: 700;
        }
        .quiz-sub {
            color: #94a3b8;
            font-size: 0.95rem;
            margin: 0;
        }
        .quiz-questions-list {
            display: flex;
            flex-direction: column;
            gap: 1.6rem;
        }
        .quiz-question-box {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.2rem;
        }
        .quiz-q-title {
            display: flex;
            align-items: flex-start;
            gap: 0.6rem;
            font-size: 1.1rem;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 1rem;
        }
        .q-num {
            background: #0284c7;
            color: #fff;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.82rem;
            flex-shrink: 0;
            margin-top: 2px;
        }
        .quiz-options-list {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }
        .quiz-opt-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            color: #f1f5f9;
            padding: 0.85rem 1.1rem;
            border-radius: 12px;
            text-align: left;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .quiz-opt-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.15);
            border-color: #38bdf8;
            transform: translateX(4px);
        }
        .quiz-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #86efac !important;
            font-weight: 700;
        }
        .quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }
        .quiz-feedback-row {
            margin-top: 0.9rem;
            padding: 0.8rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            line-height: 1.4;
        }
        .quiz-feedback-row.success {
            background: rgba(34, 197, 94, 0.15);
            border-left: 3px solid #22c55e;
            color: #86efac;
        }
        .quiz-feedback-row.error {
            background: rgba(239, 68, 68, 0.15);
            border-left: 3px solid #ef4444;
            color: #fca5a5;
        }

        .quiz-score-banner {
            margin-top: 1.8rem;
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
        }
        .quiz-score-banner.perfect {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(2, 132, 199, 0.25));
            border: 2px solid #22c55e;
        }
        .quiz-score-banner.good {
            background: rgba(2, 132, 199, 0.2);
            border: 2px solid #0284c7;
        }
        .score-icon {
            font-size: 2.2rem;
            margin-bottom: 0.4rem;
        }
        .score-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: #fef08a;
            margin-bottom: 0.2rem;
        }
        .score-desc {
            color: #e2e8f0;
            font-size: 1.05rem;
        }

        /* Bottom Nav */
        .hc-bottom-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 1rem;
        }
        .back-to-list-btn, .next-story-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #cbd5e1;
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .back-to-list-btn:hover {
            background: rgba(255, 255, 255, 0.16);
            color: #fff;
        }
        .next-story-btn {
            background: #eab308;
            color: #0f172a;
            border-color: #eab308;
            margin-left: auto;
        }
        .next-story-btn:hover {
            background: #fde047;
            transform: translateX(3px);
        }

        .hc-card-vrimmel-preview {
            margin: 0.6rem 0 0.85rem;
            border-radius: 11px;
            overflow: hidden;
            border: 1px solid rgba(203, 213, 225, 0.16);
            box-shadow: none;
            flex: 1;
            display: flex;
        }
        .hc-card-vrimmel-img {
            width: 100%;
            aspect-ratio: 16 / 10;
            object-fit: cover;
            display: block;
            transition: transform 0.35s ease;
        }
        .hc-story-card:hover .hc-card-vrimmel-img {
            transform: scale(1.03);
        }

        /* ========================================= */
        /* PROSA-BOG LAYOUT (Klods-Hans uden separate replikbokse) */
        /* ========================================= */
        .hc-dialogue-list.hc-prose-book {
            gap: 0.45rem;
            background: rgba(15, 23, 42, 0.55);
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 16px;
            padding: 1.25rem 1.45rem;
        }
        .hc-dialogue-line.prose-line {
            background: transparent;
            border: none;
            border-radius: 8px;
            padding: 0.32rem 0.55rem;
            box-shadow: none;
            margin: 0;
        }
        .hc-dialogue-line.prose-line.latest-revealed {
            background: rgba(56, 189, 248, 0.08);
            border-left: 3px solid #fde047;
            padding-left: 0.75rem;
            box-shadow: none;
        }
        .hc-dialogue-line.prose-line .hc-line-speech {
            font-size: 1.08rem;
            line-height: 1.78;
        }

        /* ========================================= */
        /* FORSLAG 3: KØLIG SKANDINAVISK MINIMALISME (Klods-Hans) */
        /* Skifer + monokrome værktøjer + én rolig petrol-accent  */
        /* ========================================= */
        .hc-theme-nordic .hc-reader-header,
        .hc-theme-nordic .hc-section-card,
        .hc-theme-nordic .hc-quiz-card,
        .hc-theme-nordic .hc-talemaader-invitation-card {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            box-shadow: none;
        }
        .hc-theme-nordic .hc-reader-title,
        .hc-theme-nordic .section-header h3 {
            color: #f1f5f9;
        }
        .hc-theme-nordic .hc-reader-sub,
        .hc-theme-nordic .hc-text-hint,
        .hc-theme-nordic .hc-next-sentence-hint {
            color: #94a3b8;
        }
        .hc-theme-nordic .hc-level-tag-inline {
            color: #cbd5e1;
        }
        .hc-theme-nordic .hc-reader-quote-banner {
            background: rgba(203, 213, 225, 0.04);
            border-left: 3px solid #64748b;
            color: #cbd5e1;
        }
        .hc-theme-nordic .hc-toolbar {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.13);
        }
        .hc-theme-nordic .main-listen-btn,
        .hc-theme-nordic .section-audio-btn {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.26);
            color: #e2e8f0;
            box-shadow: none;
        }
        .hc-theme-nordic .main-listen-btn:hover,
        .hc-theme-nordic .section-audio-btn:hover {
            background: rgba(255, 255, 255, 0.07);
            border-color: rgba(203, 213, 225, 0.45);
            color: #ffffff;
            transform: none;
        }
        .hc-theme-nordic .main-listen-btn.playing {
            background: #2b6e78;
            border-color: #3d8b96;
            color: #ffffff;
        }
        .hc-theme-nordic .hc-mode-toggle {
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.13);
        }
        .hc-theme-nordic .mode-tab-btn,
        .hc-theme-nordic .font-btn,
        .hc-theme-nordic .hc-step-pill,
        .hc-theme-nordic .hc-flow-toggle-btn,
        .hc-theme-nordic .hc-talemaader-tab-btn,
        .hc-theme-nordic .step-action-btn,
        .hc-theme-nordic .back-to-list-btn {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.15);
            color: #94a3b8;
            box-shadow: none;
        }
        .hc-theme-nordic .mode-tab-btn:hover,
        .hc-theme-nordic .font-btn:hover,
        .hc-theme-nordic .hc-step-pill:hover,
        .hc-theme-nordic .hc-flow-toggle-btn:hover,
        .hc-theme-nordic .hc-talemaader-tab-btn:hover,
        .hc-theme-nordic .step-action-btn:hover,
        .hc-theme-nordic .back-to-list-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(203, 213, 225, 0.35);
            color: #f1f5f9;
            transform: none;
        }
        .hc-theme-nordic .mode-tab-btn.active,
        .hc-theme-nordic .font-btn.active,
        .hc-theme-nordic .hc-step-pill.active {
            background: #e2e8f0;
            border-color: #e2e8f0;
            color: #0f172a;
            box-shadow: none;
        }
        .hc-theme-nordic .hc-dialogue-list.hc-prose-book {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.13);
        }
        .hc-theme-nordic .hc-dialogue-line.prose-line.latest-revealed {
            background: rgba(76, 155, 166, 0.09);
            border-left: 3px solid #4c9ba6;
        }
        .hc-theme-nordic .hc-flow-step-badge {
            background: #1a212b;
            border: 1px solid rgba(203, 213, 225, 0.15);
            color: #cbd5e1;
        }
        .hc-theme-nordic .hc-flow-bar-track {
            background: rgba(203, 213, 225, 0.12);
        }
        .hc-theme-nordic .hc-flow-bar-fill {
            background: #2b6e78;
        }
        /* Primær handling: én rolig petrol-accent */
        .hc-theme-nordic .hc-next-sentence-btn,
        .hc-theme-nordic .step-action-btn.next,
        .hc-theme-nordic .step-action-btn.quiz-jump,
        .hc-theme-nordic .next-story-btn,
        .hc-theme-nordic .invitation-start-btn {
            background: #2b6e78;
            border: 1px solid #3d8b96;
            color: #ffffff;
            box-shadow: none;
        }
        .hc-theme-nordic .hc-next-sentence-btn:hover,
        .hc-theme-nordic .step-action-btn.next:hover,
        .hc-theme-nordic .step-action-btn.quiz-jump:hover,
        .hc-theme-nordic .next-story-btn:hover,
        .hc-theme-nordic .invitation-start-btn:hover {
            background: #35838f;
            border-color: #4c9ba6;
            color: #ffffff;
            transform: none;
        }
        .hc-theme-nordic .hc-flow-completion-card {
            background: #1a212b;
            border: 1px solid rgba(76, 155, 166, 0.45);
        }
        .hc-theme-nordic .hc-flow-completion-card h4 {
            color: #f1f5f9;
        }
        .hc-theme-nordic .hc-restart-flow-btn {
            background: transparent;
            border: 1px solid rgba(203, 213, 225, 0.25);
            color: #cbd5e1;
        }
        .hc-theme-nordic .hc-restart-flow-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
        }
        .hc-theme-nordic .hc-tasks-drawer-toggle.is-ready {
            border-color: rgba(76, 155, 166, 0.55);
            color: #7ec4ce;
            background: rgba(43, 110, 120, 0.14);
        }
        .hc-theme-nordic .hc-section-tasks {
            background: #151a21;
            border: 1px solid rgba(203, 213, 225, 0.13);
            box-shadow: none;
        }
        .hc-task-layer-switch {
            display: inline-flex;
            background: #101419;
            border: 1px solid rgba(203, 213, 225, 0.15);
            border-radius: 10px;
            padding: 3px;
            margin-bottom: 1rem;
            gap: 3px;
        }
        .hc-task-layer-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.45rem 1rem;
            border-radius: 8px;
            font-size: 0.86rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.16s ease;
        }
        .hc-task-layer-btn:hover {
            color: #f1f5f9;
        }
        .hc-task-layer-btn.active {
            background: #2b6e78;
            color: #ffffff;
        }
        .hc-theme-nordic .hc-drawer-status {
            color: #7ec4ce;
        }
        .hc-theme-nordic .invitation-badge {
            background: rgba(43, 110, 120, 0.22);
            border: 1px solid rgba(76, 155, 166, 0.45);
            color: #7ec4ce;
        }
        .hc-theme-nordic .invitation-title {
            color: #f1f5f9;
        }

        /* ========================================= */
        /* SCENE TASKS (DETEKTIV & GRAMMATIK OPGAVER) */
        /* ========================================= */
        .hc-tasks-drawer {
            margin-top: 1.25rem;
        }
        .hc-tasks-drawer-toggle {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            padding: 0.68rem 1rem;
            background: transparent;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 12px;
            color: #94a3b8;
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
            transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .hc-tasks-drawer-toggle:hover {
            border-color: rgba(148, 163, 184, 0.55);
            color: #e2e8f0;
            background: rgba(15, 23, 42, 0.45);
        }
        .hc-tasks-drawer-toggle.is-ready {
            border-color: rgba(253, 224, 71, 0.55);
            color: #fde047;
            background: rgba(253, 224, 71, 0.06);
        }
        .hc-tasks-drawer-toggle.is-ready:hover {
            border-color: rgba(253, 224, 71, 0.85);
            background: rgba(253, 224, 71, 0.12);
        }
        .hc-drawer-left,
        .hc-drawer-right {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .hc-drawer-status {
            font-size: 0.74rem;
            font-weight: 800;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            color: #fde047;
        }
        .hc-drawer-chevron {
            transition: transform 0.2s ease;
        }
        .hc-tasks-drawer-toggle.is-open .hc-drawer-chevron {
            transform: rotate(180deg);
        }
        .hc-tasks-drawer-body {
            margin-top: 0.75rem;
        }
        .hc-tasks-drawer-body .hc-section-tasks {
            margin: 0.4rem 0 0.8rem;
        }
        .hc-section-tasks {
            margin: 1.8rem 0 2.2rem;
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 1.4rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
            backdrop-filter: blur(12px);
        }
        .hc-tasks-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .hc-tasks-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #f8fafc;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .hc-tasks-subtitle {
            font-size: 0.88rem;
            color: #94a3b8;
            margin-top: 0.2rem;
        }
        .hc-tasks-flow-badge {
            font-size: 0.8rem;
            font-weight: 700;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.12);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 20px;
            padding: 0.3rem 0.8rem;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .hc-task-line-badge {
            font-size: 0.74rem;
            font-weight: 800;
            color: #fde047;
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid rgba(234, 179, 8, 0.35);
            border-radius: 8px;
            padding: 0.2rem 0.55rem;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
        }
        .hc-task-sentence-milestone {
            text-align: center;
            padding: 1.8rem 1.2rem;
            background: rgba(15, 23, 42, 0.65);
            border: 1.5px dashed rgba(56, 189, 248, 0.35);
            border-radius: 14px;
            animation: fadeIn 0.3s ease;
        }
        .hc-task-sentence-milestone .milestone-icon {
            font-size: 2.2rem;
            margin-bottom: 0.5rem;
        }
        .hc-task-sentence-milestone h4 {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.4rem;
        }
        .hc-task-sentence-milestone p {
            font-size: 0.92rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.45;
        }
        .hc-task-read-next-btn {
            background: linear-gradient(135deg, #0284c7, #2563eb);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0.65rem 1.4rem;
            font-size: 0.92rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .hc-task-read-next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(37, 99, 235, 0.5);
            background: linear-gradient(135deg, #0369a1, #1d4ed8);
        }
        .hc-task-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            margin-bottom: 1.3rem;
        }
        .hc-task-tab-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.55rem 0.95rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
            font-size: 0.86rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
        }
        .hc-task-tab-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            transform: translateY(-1px);
        }
        .hc-task-tab-btn.active {
            background: rgba(255, 255, 255, 0.15);
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .hc-task-tab-btn.tab-detektiv.active { border-color: #38bdf8; color: #38bdf8; background: rgba(56, 189, 248, 0.15); }
        .hc-task-tab-btn.tab-substantiver.active { border-color: #22c55e; color: #4ade80; background: rgba(34, 197, 94, 0.15); }
        .hc-task-tab-btn.tab-verber.active { border-color: #ef4444; color: #f87171; background: rgba(239, 68, 68, 0.15); }
        .hc-task-tab-btn.tab-adjektiver.active { border-color: #f97316; color: #fb923c; background: rgba(249, 115, 22, 0.15); }
        .hc-task-tab-btn.tab-adverbier.active { border-color: #38bdf8; color: #38bdf8; background: rgba(56, 189, 248, 0.15); }
        .hc-task-tab-count {
            opacity: 0.65;
            font-size: 0.76rem;
        }

        /* Task Panel */
        .hc-task-panel {
            background: rgba(30, 41, 59, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.3rem;
            animation: fadeIn 0.25s ease;
        }
        .hc-task-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.9rem;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .hc-task-badge {
            font-size: 0.74rem;
            font-weight: 800;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.08);
            color: #f1f5f9;
        }
        .hc-task-badge.detektiv { background: rgba(56, 189, 248, 0.18); border-color: #38bdf8; color: #38bdf8; }
        .hc-task-badge.substantiver { background: rgba(34, 197, 94, 0.18); border-color: #22c55e; color: #4ade80; }
        .hc-task-badge.verber { background: rgba(239, 68, 68, 0.18); border-color: #ef4444; color: #f87171; }
        .hc-task-badge.adjektiver { background: rgba(249, 115, 22, 0.18); border-color: #f97316; color: #fb923c; }
        .hc-task-badge.adverbier { background: rgba(56, 189, 248, 0.18); border-color: #38bdf8; color: #38bdf8; }
        .hc-task-progress-text {
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 700;
        }
        .hc-task-score-pill {
            font-size: 0.82rem;
            font-weight: 800;
            color: #fde047;
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid rgba(234, 179, 8, 0.35);
            padding: 0.2rem 0.65rem;
            border-radius: 12px;
        }
        .hc-task-cat-desc {
            font-size: 0.88rem;
            color: #94a3b8;
            margin-bottom: 1rem;
            line-height: 1.45;
        }
        .hc-task-prompt-box {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.8rem;
            margin-bottom: 1.2rem;
        }
        .hc-task-prompt {
            font-size: 1.08rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.5;
        }
        .hc-task-prompt strong {
            color: #fde047;
            text-decoration: underline;
            text-underline-offset: 3px;
        }
        .hc-task-speak-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 8px;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.95rem;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.2s ease;
        }
        .hc-task-speak-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }
        .hc-task-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 0.75rem;
            margin-bottom: 0.5rem;
        }
        .hc-task-opt-btn {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 0.8rem 1rem;
            color: #f1f5f9;
            font-size: 0.95rem;
            font-weight: 600;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 0.65rem;
            line-height: 1.35;
        }
        .hc-task-opt-btn .opt-bullet {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            font-size: 0.8rem;
            font-weight: 800;
            flex-shrink: 0;
        }
        .hc-task-opt-btn .opt-text {
            flex: 1;
        }
        .hc-task-opt-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.35);
            transform: translateY(-2px);
        }
        .hc-task-opt-btn.correct {
            background: rgba(34, 197, 94, 0.22) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            box-shadow: 0 0 14px rgba(34, 197, 94, 0.35);
        }
        .hc-task-opt-btn.correct .opt-bullet {
            background: #22c55e;
            color: #0f172a;
        }
        .hc-task-opt-btn.incorrect {
            background: rgba(239, 68, 68, 0.2) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .hc-task-opt-btn.incorrect .opt-bullet {
            background: #ef4444;
            color: #ffffff;
        }
        .hc-task-opt-btn:disabled {
            cursor: default;
        }
        .hc-task-feedback {
            background: rgba(15, 23, 42, 0.95);
            border-radius: 12px;
            padding: 0.95rem 1.15rem;
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            margin-top: 1rem;
            animation: fadeIn 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .hc-task-feedback.correct {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.12);
        }
        .hc-task-feedback.incorrect {
            border-color: #f97316;
            background: rgba(249, 115, 22, 0.12);
        }
        .hc-task-feedback-text {
            font-size: 0.92rem;
            line-height: 1.45;
            color: #f8fafc;
        }
        .hc-task-next-btn {
            align-self: flex-end;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.55rem 1.15rem;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .hc-task-next-btn:hover {
            background: #2563eb;
            transform: translateY(-1px);
        }
        .hc-task-summary {
            text-align: center;
            padding: 1.5rem 1rem;
        }
        .hc-task-summary .summary-icon {
            font-size: 2.8rem;
            margin-bottom: 0.6rem;
        }
        .hc-task-summary h4 {
            font-size: 1.3rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.4rem;
        }
        .hc-task-summary .summary-score-text {
            font-size: 1.05rem;
            color: #cbd5e1;
            margin-bottom: 1.3rem;
        }
        .hc-task-restart-btn {
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.25);
            color: white;
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .hc-task-restart-btn:hover {
            background: white;
            color: #0f172a;
        }

        /* Teksten Divider Heading */
        .hc-text-heading {
            margin: 2.5rem 0 1.2rem;
            padding-top: 1.6rem;
            border-top: 2px dashed rgba(255, 255, 255, 0.18);
        }
        .hc-text-badge-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.4rem;
            flex-wrap: wrap;
        }
        .hc-text-badge {
            background: linear-gradient(135deg, #ec4899, #8b5cf6);
            color: white;
            font-size: 0.8rem;
            font-weight: 800;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(236, 72, 153, 0.35);
        }
        .hc-text-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: #f8fafc;
            margin: 0;
        }
        .hc-text-hint {
            font-size: 0.9rem;
            color: #94a3b8;
            margin: 0.3rem 0 0;
            line-height: 1.4;
        }
        /* Sentence Flow & Challenge Cards */
        .hc-sentence-flow-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1.4rem;
        }
        .hc-flow-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.7rem 1rem;
        }
        .hc-flow-progress-info {
            display: flex;
            align-items: center;
            gap: 0.9rem;
            flex: 1;
            min-width: 200px;
        }
        .hc-flow-step-badge {
            font-size: 0.86rem;
            font-weight: 700;
            color: #fde047;
            white-space: nowrap;
        }
        .hc-flow-bar-track {
            flex: 1;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 999px;
            overflow: hidden;
        }
        .hc-flow-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #38bdf8, #22c55e);
            transition: width 0.3s ease;
            border-radius: 999px;
        }
        .hc-flow-toggle-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #cbd5e1;
            padding: 0.45rem 0.85rem;
            border-radius: 8px;
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .hc-flow-toggle-btn:hover {
            background: rgba(255, 255, 255, 0.16);
            color: #fff;
        }
        .hc-dialogue-line.latest-revealed {
            border: 1.5px solid rgba(56, 189, 248, 0.5) !important;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
        }
        .hc-challenge-card {
            margin-top: 1.2rem;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border: 2px solid #eab308;
            border-radius: 16px;
            padding: 1.3rem;
            box-shadow: 0 8px 24px rgba(234, 179, 8, 0.25);
            animation: fadeIn 0.35s ease;
        }
        .hc-challenge-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
            margin-bottom: 0.6rem;
            flex-wrap: wrap;
        }
        .hc-challenge-badge {
            background: #eab308;
            color: #0f172a;
            font-size: 0.78rem;
            font-weight: 900;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .hc-challenge-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #fef08a;
            margin: 0;
        }
        .hc-challenge-prompt {
            font-size: 0.95rem;
            color: #cbd5e1;
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        .hc-challenge-slot-wrap {
            margin-bottom: 0.85rem;
        }
        .slot-label {
            font-size: 0.82rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.35rem;
        }
        .hc-challenge-slot {
            min-height: 52px;
            background: rgba(15, 23, 42, 0.85);
            border: 2px dashed rgba(234, 179, 8, 0.45);
            border-radius: 12px;
            padding: 0.55rem 0.85rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
            transition: all 0.2s;
        }
        .hc-challenge-slot.correct {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.1);
        }
        .slot-placeholder {
            color: #64748b;
            font-size: 0.88rem;
            font-style: italic;
            user-select: none;
        }
        .hc-challenge-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            padding: 0.75rem 0.9rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            min-height: 52px;
            align-items: center;
        }
        .hc-tile {
            background: rgba(30, 41, 59, 0.9);
            border: 1.5px solid rgba(255, 255, 255, 0.25);
            color: #f8fafc;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
        }
        .hc-tile:hover {
            background: rgba(56, 189, 248, 0.25);
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .hc-tile.in-slot {
            background: rgba(234, 179, 8, 0.2);
            border-color: #eab308;
            color: #fef08a;
        }
        .hc-challenge-actions {
            display: flex;
            gap: 0.65rem;
            margin-top: 0.9rem;
        }
        .hc-check-puzzle-btn, .hc-check-sentence-btn {
            background: #22c55e;
            border: none;
            color: #052e16;
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .hc-check-puzzle-btn:hover, .hc-check-sentence-btn:hover {
            background: #4ade80;
            transform: translateY(-1px);
        }
        .hc-reset-puzzle-btn, .hc-reset-tiles-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #cbd5e1;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .hc-challenge-feedback {
            margin-top: 1rem;
            padding: 0.9rem 1.1rem;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            animation: fadeIn 0.25s ease;
        }
        .hc-challenge-feedback.correct {
            background: rgba(34, 197, 94, 0.15);
            border: 1.5px solid #22c55e;
            color: #f1f5f9;
        }
        .hc-challenge-feedback.incorrect {
            background: rgba(239, 68, 68, 0.15);
            border: 1.5px solid #ef4444;
            color: #fca5a5;
        }
        .hc-challenge-continue-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.65rem 1.25rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            align-self: flex-start;
            transition: all 0.2s;
        }
        .hc-challenge-continue-btn:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }
        .hc-cloze-template-box {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 1rem 1.2rem;
            margin-bottom: 1rem;
        }
        .hc-cloze-template {
            font-size: 1.2rem;
            line-height: 1.7;
            color: #f8fafc;
            font-weight: 600;
        }
        .cloze-gap-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 60px;
            height: 32px;
            padding: 0 0.6rem;
            border-radius: 8px;
            border: 2px dashed #eab308;
            background: rgba(234, 179, 8, 0.15);
            color: #fde047;
            font-weight: 800;
            margin: 0 0.3rem;
            vertical-align: middle;
        }
        .cloze-gap-pill.filled {
            border: 2px solid #22c55e;
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
        }
        .hc-cloze-options {
            display: flex;
            flex-wrap: wrap;
            gap: 0.7rem;
            margin-bottom: 0.8rem;
        }
        .hc-cloze-opt-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1.5px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            padding: 0.6rem 1.1rem;
            border-radius: 10px;
            font-size: 0.98rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .hc-cloze-opt-btn:hover {
            background: rgba(255, 255, 255, 0.16);
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .hc-cloze-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .hc-cloze-opt-btn.incorrect {
            background: rgba(239, 68, 68, 0.2) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .hc-speech-practice-box {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 0.85rem 1rem;
            margin: 0.5rem 0;
        }
        .speech-prompt-title {
            font-size: 0.92rem;
            font-weight: 700;
            color: #fde047;
            margin-bottom: 0.6rem;
        }
        .speech-audio-btns {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .speech-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            padding: 0.45rem 0.85rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s;
        }
        .speech-btn:hover {
            background: rgba(255, 255, 255, 0.18);
        }
        .hc-challenge-solved-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #4ade80;
            padding: 0.35rem 0.85rem;
            border-radius: 10px;
            font-size: 0.84rem;
            font-weight: 800;
            margin-top: 0.8rem;
        }
        .hc-challenge-dots-placeholder {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            margin-left: 0.35rem;
            font-size: 0.95rem;
            vertical-align: middle;
        }
        .hc-challenge-dots-placeholder .dots-anim {
            letter-spacing: 2px;
            font-weight: 800;
            color: #fde047;
            animation: pulseDots 2s infinite ease-in-out;
        }
        @keyframes pulseDots {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; color: #38bdf8; }
        }
        .hc-challenge-dots-placeholder .dots-hint {
            font-size: 0.78rem;
            font-weight: 700;
            background: rgba(234, 179, 8, 0.15);
            border: 1px dashed rgba(234, 179, 8, 0.45);
            color: #fde047;
            padding: 0.15rem 0.55rem;
            border-radius: 8px;
        }
        .hc-flow-nav-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.6rem;
            margin-top: 1.2rem;
            padding: 1.2rem 1rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            text-align: center;
        }
        .hc-next-sentence-btn {
            background: linear-gradient(135deg, #0284c7, #2563eb);
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 14px;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.65rem;
            box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hc-next-sentence-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.5);
        }
        .hc-next-sentence-btn:disabled {
            background: rgba(255, 255, 255, 0.1);
            color: #64748b;
            box-shadow: none;
            cursor: not-allowed;
            transform: none;
        }
        .hc-next-sentence-btn.glow-yellow {
            background: linear-gradient(135deg, #facc15, #eab308) !important;
            color: #0f172a !important;
            border: 2px solid #fef08a !important;
            box-shadow: 0 0 25px rgba(250, 204, 21, 0.9), 0 0 50px rgba(234, 179, 8, 0.5) !important;
            animation: pulseYellowGlow 1.2s infinite alternate ease-in-out !important;
            transform: scale(1.04);
        }
        .hc-next-sentence-btn.glow-yellow:hover:not(:disabled) {
            background: linear-gradient(135deg, #fde047, #f59e0b) !important;
            color: #000000 !important;
            transform: scale(1.06) translateY(-2px);
        }
        @keyframes pulseYellowGlow {
            0% {
                box-shadow: 0 0 15px rgba(250, 204, 21, 0.65), 0 0 30px rgba(234, 179, 8, 0.35);
                transform: scale(1.02);
            }
            100% {
                box-shadow: 0 0 35px rgba(250, 204, 21, 1), 0 0 70px rgba(234, 179, 8, 0.7);
                transform: scale(1.07);
            }
        }
        .hc-dialogue-line.latest-revealed.awaiting-confirm {
            border: 2px solid #facc15 !important;
            box-shadow: 0 0 28px rgba(250, 204, 21, 0.35) !important;
            background: rgba(234, 179, 8, 0.08) !important;
        }
        .hc-next-sentence-prompt-note {
            font-size: 0.85rem;
            color: #fde047;
            background: rgba(234, 179, 8, 0.12);
            border: 1px solid rgba(234, 179, 8, 0.3);
            border-radius: 8px;
            padding: 0.45rem 0.8rem;
            margin-top: 0.5rem;
            margin-bottom: 0.2rem;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            line-height: 1.4;
        }
        .hc-next-sentence-hint {
            font-size: 0.86rem;
            color: #94a3b8;
            max-width: 460px;
            line-height: 1.4;
        }
        .hc-flow-completion-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1rem;
        }
        .completion-icon {
            font-size: 2.5rem;
        }
        .hc-flow-completion-card h4 {
            font-size: 1.3rem;
            font-weight: 800;
            color: #fef08a;
            margin: 0;
        }
        .hc-flow-completion-card p {
            color: #cbd5e1;
            font-size: 0.95rem;
            margin: 0 0 0.8rem 0;
        }
        .hc-restart-flow-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.25);
            color: white;
            padding: 0.55rem 1.15rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s;
        }
        .hc-restart-flow-btn:hover {
            background: white;
            color: #0f172a;
        }

        /* --- TALEMÅDER I EVENTYRET (FOR AVANCEREDE KURSISTER) --- */
        .hc-talemaader-nav-btn {
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            color: #ffffff;
            border: 1px solid rgba(216, 180, 254, 0.4);
            border-radius: 9999px;
            padding: 0.5rem 1.1rem;
            font-size: 0.92rem;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
            transition: all 0.2s ease;
        }
        .hc-talemaader-nav-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(124, 58, 237, 0.5);
            background: linear-gradient(135deg, #6d28d9 0%, #9333ea 100%);
        }

        .hc-talemaader-invitation-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(88, 28, 135, 0.4) 100%);
            border: 1.5px solid rgba(168, 85, 247, 0.5);
            border-radius: 20px;
            padding: 1.6rem 2rem;
            margin: 2.5rem 0 1.5rem 0;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .hc-talemaader-invitation-card .invitation-icon {
            font-size: 3rem;
            flex-shrink: 0;
            filter: drop-shadow(0 4px 10px rgba(168, 85, 247, 0.5));
        }
        .hc-talemaader-invitation-card .invitation-body {
            flex: 1;
        }
        .invitation-badge {
            display: inline-block;
            background: rgba(168, 85, 247, 0.25);
            color: #d8b4fe;
            border: 1px solid rgba(168, 85, 247, 0.4);
            border-radius: 9999px;
            padding: 0.2rem 0.75rem;
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 0.4rem;
        }
        .invitation-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #f8fafc;
            margin: 0 0 0.4rem 0;
        }
        .invitation-desc {
            font-size: 0.95rem;
            color: #cbd5e1;
            margin: 0;
            line-height: 1.5;
        }
        .invitation-start-btn {
            background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
            color: white;
            border: none;
            border-radius: 14px;
            padding: 0.9rem 1.4rem;
            font-size: 1rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .invitation-start-btn:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 24px rgba(124, 58, 237, 0.6);
        }

        .hc-talemaader-page-wrapper {
            max-width: 900px;
            margin: 0 auto;
            padding: 1rem 0.5rem 3rem 0.5rem;
        }
        .hc-talemaader-hero-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(67, 56, 202, 0.35) 100%);
            border: 1.5px solid rgba(129, 140, 248, 0.4);
            border-radius: 20px;
            padding: 1.8rem 2rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .hero-top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.8rem;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .hero-badge {
            background: rgba(168, 85, 247, 0.25);
            color: #d8b4fe;
            border: 1px solid rgba(168, 85, 247, 0.4);
            border-radius: 9999px;
            padding: 0.25rem 0.85rem;
            font-size: 0.82rem;
            font-weight: 700;
        }
        .hero-back-story-btn {
            background: rgba(255, 255, 255, 0.08);
            color: #e2e8f0;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 0.4rem 0.9rem;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .hero-back-story-btn:hover {
            background: rgba(255, 255, 255, 0.18);
            color: white;
        }
        .hc-talemaader-hero-card .hero-title {
            font-size: 1.65rem;
            font-weight: 800;
            color: #f8fafc;
            margin: 0 0 0.5rem 0;
            line-height: 1.3;
        }
        .hc-talemaader-hero-card .hero-desc {
            font-size: 1rem;
            color: #cbd5e1;
            margin: 0 0 1.2rem 0;
            line-height: 1.6;
        }
        .hero-stats-row {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .hero-stat-pill {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.45rem 0.9rem;
            font-size: 0.86rem;
            color: #94a3b8;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }

        .hc-talemaader-progress-card {
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 0.9rem 1.4rem;
            margin-bottom: 2rem;
        }
        .progress-info {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            font-weight: 700;
            color: #e2e8f0;
            margin-bottom: 0.5rem;
        }
        .progress-bar-track {
            height: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 9999px;
            overflow: hidden;
        }
        .progress-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #a855f7, #38bdf8);
            border-radius: 9999px;
            transition: width 0.4s ease;
        }

        .hc-talemaader-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .hc-talemaade-item-card {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 1.6rem 1.8rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
            transition: border-color 0.2s;
        }
        .hc-talemaade-item-card:hover {
            border-color: rgba(168, 85, 247, 0.35);
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.1rem;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .item-scene-pill {
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 9999px;
            padding: 0.25rem 0.8rem;
            font-size: 0.82rem;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .item-idiom-badge {
            background: rgba(234, 179, 8, 0.15);
            color: #fde047;
            border: 1px solid rgba(234, 179, 8, 0.3);
            border-radius: 9999px;
            padding: 0.25rem 0.85rem;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
        }
        .item-context-box {
            background: rgba(15, 23, 42, 0.55);
            border-left: 3.5px solid #a855f7;
            border-radius: 0 12px 12px 0;
            padding: 0.9rem 1.2rem;
            margin-bottom: 1.3rem;
        }
        .context-label {
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #a855f7;
            margin-bottom: 0.35rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .context-quote {
            font-size: 0.98rem;
            color: #f1f5f9;
            font-style: italic;
            margin: 0;
            line-height: 1.5;
        }
        .item-prompt-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            gap: 0.8rem;
        }
        .item-prompt-question {
            font-size: 1.05rem;
            font-weight: 700;
            color: #f8fafc;
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            line-height: 1.4;
        }
        .item-listen-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #cbd5e1;
            border-radius: 10px;
            padding: 0.4rem 0.75rem;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            flex-shrink: 0;
            transition: all 0.2s;
        }
        .item-listen-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            transform: scale(1.04);
        }

        .item-options-list {
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            margin-bottom: 1rem;
        }
        .hc-idiom-opt-btn {
            background: rgba(15, 23, 42, 0.7);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            padding: 0.85rem 1.1rem;
            text-align: left;
            font-size: 0.95rem;
            color: #e2e8f0;
            cursor: pointer;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            line-height: 1.45;
            transition: all 0.2s ease;
        }
        .hc-idiom-opt-btn:hover:not(:disabled) {
            background: rgba(30, 41, 59, 0.9);
            border-color: #38bdf8;
            transform: translateX(3px);
            color: white;
        }
        .opt-letter {
            background: rgba(255, 255, 255, 0.1);
            color: #94a3b8;
            border-radius: 6px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 800;
            flex-shrink: 0;
            margin-top: 1px;
        }
        .hc-idiom-opt-btn:hover:not(:disabled) .opt-letter {
            background: #38bdf8;
            color: #0f172a;
        }
        .hc-idiom-opt-btn.correct {
            background: linear-gradient(135deg, rgba(20, 83, 45, 0.8) 0%, rgba(22, 101, 52, 0.7) 100%) !important;
            border-color: #22c55e !important;
            color: #ecfdf5 !important;
            box-shadow: 0 4px 14px rgba(34, 197, 94, 0.25);
        }
        .hc-idiom-opt-btn.correct .opt-letter {
            background: #22c55e !important;
            color: #052e16 !important;
        }
        .hc-idiom-opt-btn.wrong {
            background: linear-gradient(135deg, rgba(69, 10, 10, 0.8) 0%, rgba(127, 29, 29, 0.7) 100%) !important;
            border-color: #ef4444 !important;
            color: #fef2f2 !important;
            animation: hcShake 0.4s ease;
        }
        .hc-idiom-opt-btn.wrong .opt-letter {
            background: #ef4444 !important;
            color: white !important;
        }
        @keyframes hcShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }

        .item-feedback-box {
            border-radius: 14px;
            padding: 1.1rem 1.3rem;
            margin-top: 0.75rem;
            animation: fadeIn 0.3s ease;
        }
        .item-feedback-box.correct {
            background: rgba(22, 101, 52, 0.25);
            border: 1.5px solid rgba(34, 197, 94, 0.5);
        }
        .item-feedback-box.wrong {
            background: rgba(127, 29, 29, 0.25);
            border: 1.5px solid rgba(239, 68, 68, 0.5);
        }
        .feedback-badge {
            font-size: 1rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
        }
        .item-feedback-box.correct .feedback-badge {
            color: #4ade80;
        }
        .item-feedback-box.wrong .feedback-badge {
            color: #f87171;
        }
        .feedback-explanation {
            font-size: 0.95rem;
            color: #e2e8f0;
            margin: 0 0 0.8rem 0;
            line-height: 1.5;
        }

        /* Full package link card upon correct answer */
        .feedback-package-card {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%);
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 12px;
            padding: 0.9rem 1.1rem;
            margin-top: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .pkg-card-left {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .pkg-card-icon {
            font-size: 1.6rem;
            flex-shrink: 0;
        }
        .pkg-card-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: #f8fafc;
            line-height: 1.3;
        }
        .pkg-card-sub {
            font-size: 0.8rem;
            color: #38bdf8;
            font-weight: 600;
            margin-top: 0.15rem;
        }
        .pkg-card-action-btn {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0.6rem 1rem;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 3px 10px rgba(2, 132, 199, 0.35);
        }
        .pkg-card-action-btn:hover {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(2, 132, 199, 0.5);
        }

        .hc-talemaader-celebration-banner {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(20, 83, 45, 0.4) 100%);
            border: 2px solid #22c55e;
            border-radius: 20px;
            padding: 2.2rem 2rem;
            text-align: center;
            margin-top: 3rem;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
            animation: fadeIn 0.4s ease;
        }
        .celebration-icon {
            font-size: 3.2rem;
            margin-bottom: 0.5rem;
        }
        .celebration-title {
            font-size: 1.55rem;
            font-weight: 800;
            color: #86efac;
            margin: 0 0 0.6rem 0;
        }
        .celebration-desc {
            font-size: 1rem;
            color: #cbd5e1;
            max-width: 600px;
            margin: 0 auto 1.5rem auto;
            line-height: 1.6;
        }
        .celebration-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .celebration-btn {
            border-radius: 12px;
            padding: 0.8rem 1.4rem;
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .celebration-btn.secondary {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #e2e8f0;
        }
        .celebration-btn.secondary:hover {
            background: rgba(255, 255, 255, 0.18);
            color: white;
            transform: translateY(-2px);
        }
        .celebration-btn.primary {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border: none;
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }
        .celebration-btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
        }

        @media (max-width: 600px) {
            .hc-stories-grid {
                grid-template-columns: 1fr;
            }
            .hc-toolbar {
                flex-direction: column;
                align-items: stretch;
            }
            .main-listen-btn {
                justify-content: center;
            }
            .hc-mode-toggle {
                justify-content: center;
            }
            .hc-font-control {
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);
}
