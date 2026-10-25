import { getTranslation, getLang } from '../utils/i18n.js';
import { hcAndersenStories } from '../data/hc_andersen_stories.js';
import { allNounsRegistry, wordToNounKey, openNounQuickPeekModal } from '../utils/nounQuickPeekModal.js';
import { byrumVerbsRegistry, openVerbQuickPeekModal } from '../utils/verbQuickPeekModal.js';
import { openPronounQuickPeekModal } from '../utils/pronounQuickPeekModal.js';
import { openWordPresentation } from '../components/SpotlightSearch.js';
import { verberWordTranslations } from '../utils/top100_verber_translations.js';
import { adjektiverWordTranslations } from '../utils/top100_adjektiver_translations.js';
import { adverbierWordTranslations } from '../utils/top100_adverbier_translations.js';
import { konjunktionerWordTranslations } from '../utils/top100_konjunktioner_translations.js';

/**
 * HCAndersenView - H.C. Andersens Eventyr
 * Læs og lær dansk med forkortede, forsimplede udgaver af klassiske eventyr.
 * Funktioner: Vrimlebilleder, grammatiske farvekoder på ordniveau, interaktive
 * målordspræsentationer for alle ordklasser (inkl. pink pronominer), oplæsning (TTS) og quiz.
 */
export function renderHCAndersenView(container, navigateFn, extraData = {}) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container hc-andersen-container';

    // State
    let activeStoryId = extraData?.storyId || extraData?.subPath || null;
    let isPlaying = false;
    let activeUtterance = null;
    let fontSizeLevel = 1; // 0 = standard, 1 = medium (default), 2 = stor
    let readingMode = 'steps'; // 'steps' | 'full'
    let currentStepIdx = 0;

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
                globalBtn.innerHTML = `<span>⏹️</span> <span>${isEn ? 'Stop listening' : 'Stop oplæsning'}</span>`;
            } else {
                globalBtn.classList.remove('playing');
                globalBtn.innerHTML = `<span>🔊</span> <span>${isEn ? 'Listen to story' : 'Lyt til historien'}</span>`;
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
            backBtn.innerHTML = `← ${isEn ? 'All Fairy Tales' : 'Alle eventyr'}`;
            backBtn.onclick = () => {
                stopSpeech();
                activeStoryId = null;
                currentStepIdx = 0;
                renderView();
            };
        } else {
            backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
            backBtn.onclick = () => {
                stopSpeech();
                navigateFn('historier_menu');
            };
        }
    }

    function renderView() {
        updateTopBar();
        mainContent.innerHTML = '';

        if (!activeStoryId) {
            renderCatalog();
        } else {
            const story = hcAndersenStories.find(s => s.id === activeStoryId);
            if (story) {
                renderReader(story);
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
            <div class="hc-hero-badge">🏰 ${isEn ? 'Danish Cultural Heritage & Graded Reading' : 'Dansk kulturarv & Letlæst'}</div>
            <h1 class="hc-hero-title">${isEn ? "H.C. Andersen's Fairy Tales" : 'H.C. Andersens eventyr'}</h1>
            <p class="hc-hero-desc">
                ${isEn 
                    ? 'Read and learn Danish with shortened and simplified editions of classic fairy tales. Featuring interactive wimmelbuch scenes, grammatical color codes, audio read-aloud, and comprehension quizzes.'
                    : 'Læs og lær dansk med forkortede og forsimplede udgaver af H.C. Andersens verdenskendte eventyr. Med interaktive vrimlebilleder, officielle grammatiske farvekoder, indbygget oplæsning og ordforklaringer.'
                }
            </p>
            <div class="hc-features-pills">
                <span class="hc-pill">✨ ${isEn ? 'Wimmelbuch scenes' : 'Interaktive vrimlebilleder'}</span>
                <span class="hc-pill">🎨 ${isEn ? 'Grammar color codes' : 'Grammatiske farvekoder'}</span>
                <span class="hc-pill">💗 ${isEn ? 'Pronoun quick peeks' : 'Pink pronominer & opslag'}</span>
                <span class="hc-pill">🎯 ${isEn ? 'Level: Easy (A2 - B1)' : 'Niveau: Let (A2 - B1)'}</span>
                <span class="hc-pill">🔊 ${isEn ? 'Built-in audio' : 'Indbygget oplæsning'}</span>
            </div>
        `;
        mainContent.appendChild(hero);

        const listTitle = document.createElement('h2');
        listTitle.className = 'hc-section-title';
        listTitle.textContent = isEn ? 'Choose a Fairy Tale to Read' : 'Vælg et eventyr at læse';
        mainContent.appendChild(listTitle);

        const grid = document.createElement('div');
        grid.className = 'hc-stories-grid';

        hcAndersenStories.forEach(story => {
            const card = document.createElement('div');
            card.className = 'hc-story-card';
            card.onclick = () => {
                activeStoryId = story.id;
                currentStepIdx = 0;
                renderView();
            };

            card.innerHTML = `
                <div class="hc-card-header">
                    <span class="hc-card-icon">${story.icon}</span>
                    <div class="hc-card-badges">
                        ${story.hasWimmelbilder ? `<span class="hc-wimmel-tag">✨ 3 Vrimlebilleder</span>` : ''}
                        <span class="hc-level-tag">${story.level}</span>
                        <span class="hc-time-tag">⏱️ ${story.readingTime}</span>
                    </div>
                </div>
                <h3 class="hc-card-title">${story.title}</h3>
                <div class="hc-card-subtitle">${story.titleEn}</div>
                <blockquote class="hc-card-quote">»${story.quote}«</blockquote>
                <p class="hc-card-teaser">${isEn ? story.teaserEn : story.teaser}</p>
                <div class="hc-card-footer">
                    <button class="hc-read-btn">
                        <span>${isEn ? 'Read Tale' : 'Læs eventyr'}</span>
                        <span>➔</span>
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
        readerWrapper.className = `hc-reader-wrapper font-size-${fontSizeLevel}`;

        // Story Header
        const headerCard = document.createElement('div');
        headerCard.className = 'hc-reader-header';
        headerCard.innerHTML = `
            <div class="hc-reader-meta">
                <span class="hc-reader-icon">${story.icon}</span>
                <div>
                    <h1 class="hc-reader-title">${story.title}</h1>
                    <div class="hc-reader-sub">${story.titleEn} &bull; <span class="hc-level-tag-inline">${story.level}</span> &bull; ⏱️ ${story.readingTime}</div>
                </div>
            </div>
            <div class="hc-reader-quote-banner">
                <div class="quote-text">»${story.quote}«</div>
            </div>
        `;
        readerWrapper.appendChild(headerCard);

        // Control Toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'hc-toolbar';

        // Listen main button
        const fullAudioBtn = document.createElement('button');
        fullAudioBtn.className = 'main-listen-btn';
        fullAudioBtn.innerHTML = `<span>🔊</span> <span>${isEn ? 'Listen to story' : 'Lyt til historien'}</span>`;
        fullAudioBtn.onclick = () => {
            if (isPlaying) {
                stopSpeech();
            } else {
                if (readingMode === 'steps') {
                    // Play current step
                    speakDanish(story.sections[currentStepIdx].audioText);
                } else {
                    // Play all chapters
                    const fullText = story.sections.map(s => `${s.chapter}. ${s.audioText}`).join('. ');
                    speakDanish(fullText);
                }
            }
        };

        // Reading mode toggle
        const modeToggle = document.createElement('div');
        modeToggle.className = 'hc-mode-toggle';
        modeToggle.innerHTML = `
            <button class="mode-tab-btn ${readingMode === 'steps' ? 'active' : ''}" data-mode="steps">
                📖 ${isEn ? 'Step-by-step' : 'Afsnit for afsnit'}
            </button>
            <button class="mode-tab-btn ${readingMode === 'full' ? 'active' : ''}" data-mode="full">
                📜 ${isEn ? 'Full text' : 'Hele teksten'}
            </button>
        `;
        modeToggle.querySelectorAll('.mode-tab-btn').forEach(btn => {
            btn.onclick = () => {
                readingMode = btn.dataset.mode;
                renderView();
            };
        });

        // Font size control
        const fontControl = document.createElement('div');
        fontControl.className = 'hc-font-control';
        fontControl.innerHTML = `
            <span class="font-label">Tekst:</span>
            <button class="font-btn ${fontSizeLevel === 0 ? 'active' : ''}" data-size="0">A</button>
            <button class="font-btn ${fontSizeLevel === 1 ? 'active' : ''}" data-size="1">A+</button>
            <button class="font-btn ${fontSizeLevel === 2 ? 'active' : ''}" data-size="2">A++</button>
        `;
        fontControl.querySelectorAll('.font-btn').forEach(btn => {
            btn.onclick = () => {
                fontSizeLevel = parseInt(btn.dataset.size, 10);
                readerWrapper.className = `hc-reader-wrapper font-size-${fontSizeLevel}`;
                fontControl.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });

        toolbar.appendChild(fullAudioBtn);
        toolbar.appendChild(modeToggle);
        toolbar.appendChild(fontControl);
        readerWrapper.appendChild(toolbar);

        // Sections content
        const sectionsContainer = document.createElement('div');
        sectionsContainer.className = 'hc-sections-container';

        if (readingMode === 'steps') {
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
            sectionsContainer.appendChild(stepNav);

            // Active section card
            const activeSec = story.sections[currentStepIdx];
            const secCard = createSectionCard(activeSec, currentStepIdx, story);
            sectionsContainer.appendChild(secCard);

            // Step Action Buttons
            const stepActions = document.createElement('div');
            stepActions.className = 'hc-step-actions';

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
            } else {
                stepActions.appendChild(document.createElement('div'));
            }

            if (currentStepIdx < story.sections.length - 1) {
                const nextBtn = document.createElement('button');
                nextBtn.className = 'step-action-btn next';
                nextBtn.innerHTML = `${isEn ? 'Next section' : 'Næste afsnit'} →`;
                nextBtn.onclick = () => {
                    stopSpeech();
                    currentStepIdx++;
                    renderView();
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                };
                stepActions.appendChild(nextBtn);
            } else {
                const quizJumpBtn = document.createElement('button');
                quizJumpBtn.className = 'step-action-btn quiz-jump';
                quizJumpBtn.innerHTML = `🎯 ${isEn ? 'Take Comprehension Quiz' : 'Tag forståelsesquizzen'} ↓`;
                quizJumpBtn.onclick = () => {
                    const quizEl = readerWrapper.querySelector('.hc-quiz-card');
                    if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                };
                stepActions.appendChild(quizJumpBtn);
            }

            sectionsContainer.appendChild(stepActions);
        } else {
            // Full text mode: display all sections sequentially
            story.sections.forEach((sec, idx) => {
                const secCard = createSectionCard(sec, idx, story);
                sectionsContainer.appendChild(secCard);
            });
        }

        readerWrapper.appendChild(sectionsContainer);

        // Grammar Spot Card
        if (story.grammarFocus) {
            const grammarSpot = document.createElement('div');
            grammarSpot.className = 'hc-grammar-spot';
            grammarSpot.innerHTML = `
                <div class="grammar-spot-header">
                    <span style="font-size: 1.3rem;">💡</span>
                    <h4>${story.grammarFocus.title}</h4>
                </div>
                <p class="grammar-spot-text">${story.grammarFocus.desc}</p>
            `;
            readerWrapper.appendChild(grammarSpot);
        }

        // Vocabulary List
        if (story.vocabulary && story.vocabulary.length > 0) {
            const vocabCard = document.createElement('div');
            vocabCard.className = 'hc-vocab-card';
            vocabCard.innerHTML = `
                <div class="vocab-header">
                    <span style="font-size: 1.4rem;">📚</span>
                    <h3>${isEn ? 'Vocabulary & Explanations' : 'Gloser & ordforklaringer i dette eventyr'}</h3>
                </div>
                <p class="vocab-hint">${isEn ? 'Get to know the words – click the speaker to listen to pronunciation:' : 'Lær ordene at kende – klik på højttaleren for at høre udtalen:'}</p>
                <div class="vocab-grid">
                    ${story.vocabulary.map(v => `
                        <div class="vocab-item">
                            <div class="vocab-item-top">
                                <strong class="vocab-word">${v.word}</strong>
                                <span class="vocab-type">${v.type}</span>
                                <button class="vocab-speak-btn" data-word="${v.word}" title="Lyt">🔊</button>
                            </div>
                            <div class="vocab-meaning-da">${v.meaningDa}</div>
                            <div class="vocab-meaning-en">🇬🇧 ${v.meaningEn}</div>
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
        if (story.quiz && story.quiz.length > 0) {
            const quizCard = createQuizSection(story.quiz);
            readerWrapper.appendChild(quizCard);
        }

        // Bottom Actions (Back to list, Next story)
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

        // Next story button if available
        const currentIdx = hcAndersenStories.findIndex(s => s.id === story.id);
        if (currentIdx < hcAndersenStories.length - 1) {
            const nextStory = hcAndersenStories[currentIdx + 1];
            const nextStoryBtn = document.createElement('button');
            nextStoryBtn.className = 'next-story-btn';
            nextStoryBtn.innerHTML = `${isEn ? 'Next Fairy Tale' : 'Næste eventyr'}: ${nextStory.title} ➔`;
            nextStoryBtn.onclick = () => {
                stopSpeech();
                activeStoryId = nextStory.id;
                currentStepIdx = 0;
                renderView();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            bottomNav.appendChild(nextStoryBtn);
        }

        readerWrapper.appendChild(bottomNav);

        mainContent.appendChild(readerWrapper);
    }

    function createSectionTasks(section, index) {
        if (!section.tasks) return null;

        const categories = [
            { key: 'detektiv', label: isEn ? 'Visual Detective' : 'Visuel detektiv', icon: '🔍', color: '#38bdf8' },
            { key: 'substantiver', label: isEn ? 'Nouns' : 'Substantiver', subLabel: 'Over- & underbegreber', icon: '🟢', color: '#22c55e' },
            { key: 'verber', label: isEn ? 'Verbs' : 'Verber', subLabel: 'Modsætninger & synonymer', icon: '🔴', color: '#ef4444' },
            { key: 'adjektiver', label: isEn ? 'Adjectives' : 'Adjektiver', subLabel: 'Modsætninger & grader', icon: '🟠', color: '#f97316' },
            { key: 'adverbier', label: isEn ? 'Adverbs' : 'Adverbier', subLabel: 'Grader & synonymer', icon: '🔵', color: '#38bdf8' }
        ].filter(cat => section.tasks[cat.key] && section.tasks[cat.key].questions && section.tasks[cat.key].questions.length > 0);

        if (categories.length === 0) return null;

        const tasksWrap = document.createElement('div');
        tasksWrap.className = 'hc-section-tasks';

        let activeCatKey = categories[0].key;
        const currentQuestionIdx = {};
        const catScores = {};
        const userAnswers = {};

        categories.forEach(c => {
            currentQuestionIdx[c.key] = 0;
            catScores[c.key] = 0;
            userAnswers[c.key] = {};
        });

        // Top Header
        const tasksHeader = document.createElement('div');
        tasksHeader.className = 'hc-tasks-header';
        tasksHeader.innerHTML = `
            <div>
                <div class="hc-tasks-title">
                    <span>🎯</span>
                    <span>${isEn ? 'Scene Exercises & Detective' : 'Opgaver til scenen'}</span>
                </div>
                <div class="hc-tasks-subtitle">${isEn ? 'Practice visual observation and central word classes from the wimmelbild:' : 'Træn visuel opmærksomhed og centrale ordklasser fra vrimlebilledet:'}</div>
            </div>
        `;
        tasksWrap.appendChild(tasksHeader);

        // Tab buttons container
        const tabsRow = document.createElement('div');
        tabsRow.className = 'hc-task-tabs';

        const tabButtons = {};
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `hc-task-tab-btn tab-${cat.key} ${cat.key === activeCatKey ? 'active' : ''}`;
            const count = section.tasks[cat.key].questions.length;
            btn.innerHTML = `
                <span>${cat.icon}</span>
                <span>${cat.label}</span>
                <span class="hc-task-tab-count">(${count})</span>
            `;
            btn.onclick = () => {
                activeCatKey = cat.key;
                Object.keys(tabButtons).forEach(k => {
                    tabButtons[k].classList.toggle('active', k === activeCatKey);
                });
                renderActivePanel();
            };
            tabButtons[cat.key] = btn;
            tabsRow.appendChild(btn);
        });
        tasksWrap.appendChild(tabsRow);

        // Panel holder
        const panelHolder = document.createElement('div');
        panelHolder.className = 'hc-task-panel-holder';
        tasksWrap.appendChild(panelHolder);

        function renderActivePanel() {
            panelHolder.innerHTML = '';
            const catData = section.tasks[activeCatKey];
            if (!catData || !catData.questions || catData.questions.length === 0) return;

            const qIdx = currentQuestionIdx[activeCatKey];
            const totalQ = catData.questions.length;
            const currentQ = catData.questions[qIdx];
            const isCompleted = qIdx >= totalQ;

            const panel = document.createElement('div');
            panel.className = 'hc-task-panel';

            if (isCompleted) {
                // Show celebration summary for this category
                const score = catScores[activeCatKey];
                const pct = Math.round((score / totalQ) * 100);
                panel.innerHTML = `
                    <div class="hc-task-summary">
                        <div class="summary-icon">${pct >= 75 ? '🏆' : '👏'}</div>
                        <h4>${catData.title} – ${isEn ? 'Completed!' : 'Gennemført!'}</h4>
                        <p class="summary-score-text">${isEn ? `You got <strong>${score}</strong> out of <strong>${totalQ}</strong> correct (${pct}%).` : `Du fik <strong>${score}</strong> ud af <strong>${totalQ}</strong> rigtige (${pct}%).`}</p>
                        <button type="button" class="hc-task-restart-btn">
                            <span>🔄</span> <span>${isEn ? 'Try this category again' : 'Prøv denne kategori igen'}</span>
                        </button>
                    </div>
                `;
                panel.querySelector('.hc-task-restart-btn').onclick = () => {
                    currentQuestionIdx[activeCatKey] = 0;
                    catScores[activeCatKey] = 0;
                    userAnswers[activeCatKey] = {};
                    renderActivePanel();
                };
                panelHolder.appendChild(panel);
                return;
            }

            // Render current question
            const headerRow = document.createElement('div');
            headerRow.className = 'hc-task-panel-header';
            headerRow.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                    <span class="hc-task-badge ${activeCatKey}">
                        ${currentQ.badge || catData.badge || 'Opgave'}
                    </span>
                    <span class="hc-task-progress-text">${isEn ? `Question ${qIdx + 1} of ${totalQ}` : `Spørgsmål ${qIdx + 1} af ${totalQ}`}</span>
                </div>
                <div class="hc-task-score-pill">
                    ⭐ ${catScores[activeCatKey]} / ${totalQ}
                </div>
            `;
            panel.appendChild(headerRow);

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
                <button type="button" class="hc-task-speak-btn" title="${isEn ? 'Listen to question' : 'Lyt til spørgsmålet'}">🔊</button>
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

            currentQ.options.forEach((optText, optIdx) => {
                const optBtn = document.createElement('button');
                optBtn.type = 'button';
                optBtn.className = 'hc-task-opt-btn';
                optBtn.innerHTML = `
                    <span class="opt-bullet">${String.fromCharCode(65 + optIdx)}</span>
                    <span class="opt-text">${optText}</span>
                `;

                if (isAnswered) {
                    optBtn.disabled = true;
                    if (optIdx === currentQ.correct) {
                        optBtn.classList.add('correct');
                    } else if (optIdx === savedAnswer.selectedIdx) {
                        optBtn.classList.add('incorrect');
                    }
                }

                optBtn.onclick = () => {
                    if (isAnswered) return;
                    isAnswered = true;
                    const isCorrect = optIdx === currentQ.correct;
                    if (isCorrect) {
                        catScores[activeCatKey]++;
                    }
                    userAnswers[activeCatKey][qIdx] = { selectedIdx: optIdx, isCorrect };

                    optionsGrid.querySelectorAll('.hc-task-opt-btn').forEach((b, idx) => {
                        b.disabled = true;
                        if (idx === currentQ.correct) {
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
                feedbackWrap.innerHTML = `
                    <div class="hc-task-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                        <div style="display: flex; align-items: flex-start; gap: 0.6rem;">
                            <span style="font-size: 1.3rem;">${isCorrect ? '✅' : '💡'}</span>
                            <div class="hc-task-feedback-text">
                                <strong>${isCorrect ? (isEn ? 'Correct!' : 'Rigtigt!') : (isEn ? 'Note:' : 'Bemærk:')}</strong>
                                <span>${currentQ.explanation}</span>
                            </div>
                        </div>
                        <button type="button" class="hc-task-next-btn">
                            ${qIdx < totalQ - 1 ? (isEn ? 'Next question ➔' : 'Næste spørgsmål ➔') : (isEn ? 'See result 🏆' : 'Se resultat 🏆')}
                        </button>
                    </div>
                `;
                feedbackWrap.querySelector('.hc-task-next-btn').onclick = () => {
                    currentQuestionIdx[activeCatKey]++;
                    renderActivePanel();
                };
            }

            if (isAnswered) {
                showFeedback(savedAnswer.isCorrect);
            }

            panel.appendChild(feedbackWrap);
            panelHolder.appendChild(panel);
        }

        renderActivePanel();
        return tasksWrap;
    }

    function createSectionCard(section, index, story) {
        const card = document.createElement('div');
        card.className = 'hc-section-card';

        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <h3>${section.chapter}</h3>
            <button class="section-audio-btn" title="${isEn ? 'Listen to this section' : 'Lyt til dette afsnit'}">
                <span>🔊</span> <span>${isEn ? 'Listen' : 'Lyt'}</span>
            </button>
        `;
        header.querySelector('.section-audio-btn').onclick = () => {
            speakDanish(section.audioText);
        };
        card.appendChild(header);

        // 1. Render Vrimlebillede Stage if present
        if (section.vrimmelImage) {
            const vrimmelStage = document.createElement('div');
            vrimmelStage.className = 'hc-vrimmel-stage';
            vrimmelStage.innerHTML = `
                <img src="${section.vrimmelImage}" alt="${section.chapter}" class="hc-vrimmel-img" />
            `;

            if (section.hotspots && section.hotspots.length > 0) {
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
            }
            card.appendChild(vrimmelStage);

            // Grammar Legend
            const legendBar = document.createElement('div');
            legendBar.className = 'hc-grammar-legend';
            legendBar.innerHTML = `
                <span class="hc-legend-item" style="color: #4ade80;"><span class="hc-legend-dot" style="background:#22c55e;"></span> 🟢 Substantiv</span>
                <span class="hc-legend-item" style="color: #f87171;"><span class="hc-legend-dot" style="background:#ef4444;"></span> 🔴 Verbum</span>
                <span class="hc-legend-item" style="color: #fb923c;"><span class="hc-legend-dot" style="background:#f97316;"></span> 🟠 Adjektiv</span>
                <span class="hc-legend-item" style="color: #38bdf8;"><span class="hc-legend-dot" style="background:#38bdf8;"></span> 🔵 Adverbium</span>
                <span class="hc-legend-item" style="color: #c084fc;"><span class="hc-legend-dot" style="background:#a855f7;"></span> 🟣 Konjunktion</span>
                <span class="hc-legend-item" style="color: #fde047;"><span class="hc-legend-dot" style="background:#eab308;"></span> 🟡 Præposition</span>
                <span class="hc-legend-item" style="color: #f472b6;"><span class="hc-legend-dot" style="background:#ec4899;"></span> 💗 Pronomen</span>
                <div class="hc-legend-hint">👆 ${isEn ? 'Click on any colored word to see inflections, explanation, and pronunciation.' : 'Tryk på et hvilket som helst farvet ord for at se bøjning, forklaring og udtale.'}</div>
            `;
            card.appendChild(legendBar);
        }

        // 2. Render Interactive Tasks for Scene (Visuel detektiv + Grammatiske opgaver)
        if (section.tasks) {
            const tasksEl = createSectionTasks(section, index);
            if (tasksEl) {
                card.appendChild(tasksEl);
            }
        }

        // 3. Render "Teksten" heading (Teksten flyttet til sidst)
        const textHeading = document.createElement('div');
        textHeading.className = 'hc-text-heading';
        textHeading.innerHTML = `
            <div class="hc-text-badge-row">
                <span class="hc-text-badge">📖 Teksten</span>
                <h4 class="hc-text-title">${section.chapter}</h4>
            </div>
            <p class="hc-text-hint">${isEn ? 'Read the dialogue, listen to the pronunciation, and tap any colored word to inspect its grammar and inflections:' : 'Læs replikkerne, lyt til personernes udtale og tryk på de farvede ord for at se bøjning og ordbogsopslag:'}</p>
        `;
        card.appendChild(textHeading);

        // 4. Render Text Body or Dialogue Lines
        const textBody = document.createElement('div');
        textBody.className = 'section-text-body';

        if (section.dialogue && section.dialogue.length > 0) {
            // Dialogue Playback Mode
            const dialogueList = document.createElement('div');
            dialogueList.className = 'hc-dialogue-list';

            section.dialogue.forEach(line => {
                const lineEl = document.createElement('div');
                lineEl.className = 'hc-dialogue-line';

                const speakerHeader = document.createElement('div');
                speakerHeader.className = 'hc-speaker-header';
                speakerHeader.innerHTML = `
                    <span class="hc-speaker-badge">
                        <span>${line.speakerIcon || '💬'}</span>
                        <span>${line.speaker}:</span>
                    </span>
                    <button class="hc-speaker-audio-btn" title="${isEn ? 'Listen to line' : 'Lyt til replik'}">
                        <span>🔊</span> <span>${isEn ? 'Listen' : 'Lyt'}</span>
                    </button>
                `;
                speakerHeader.querySelector('.hc-speaker-audio-btn').onclick = () => {
                    speakDanish(line.audioText);
                };
                lineEl.appendChild(speakerHeader);

                const speechEl = document.createElement('div');
                speechEl.className = 'hc-line-speech';

                if (line.tokens && line.tokens.length > 0) {
                    line.tokens.forEach(token => {
                        if (token.type === 'plain') {
                            const span = document.createElement('span');
                            span.textContent = token.text;
                            speechEl.appendChild(span);
                        } else {
                            const tokenBtn = document.createElement('span');
                            tokenBtn.className = `hc-word-token token-${token.type}`;
                            tokenBtn.textContent = token.text;
                            tokenBtn.title = `${token.type.toUpperCase()}: Klik for detaljer og udtale`;
                            tokenBtn.onclick = (e) => {
                                e.stopPropagation();
                                speakDanish(token.text);
                                handleWordClick(token, line.audioText);
                            };
                            speechEl.appendChild(tokenBtn);
                        }
                    });
                } else {
                    speechEl.textContent = line.audioText;
                }

                lineEl.appendChild(speechEl);
                dialogueList.appendChild(lineEl);
            });

            textBody.appendChild(dialogueList);
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
                    icon: '🔴',
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
                icon: '🔴',
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
                    icon: '🟠',
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
                icon: '🟠',
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
                    icon: '🔵',
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
                icon: '🔵',
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
                    icon: '🟣',
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
                icon: '🟣',
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
                    <span class="hc-prep-badge">🟡 Præposition (Forholdsord)</span>
                    <button class="hc-prep-close" id="hc-prep-close-btn">✕</button>
                </div>
                <div class="hc-prep-body">
                    <div class="hc-prep-title-row">
                        <h2 class="hc-prep-word">${cleanWord}</h2>
                        <button class="hc-prep-tts-btn" id="hc-prep-tts">
                            <span>🔊</span> Lyt
                        </button>
                    </div>
                    <p class="hc-prep-desc">${isEn ? info.descEn : info.desc}</p>
                    <div class="hc-prep-sentence">
                        💬 "${sentenceContext || info.example}"
                    </div>
                    <button class="hc-prep-ok-btn" id="hc-prep-ok">Forstået ➔</button>
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
            <div class="tooltip-en">🇬🇧 ${match.meaningEn}</div>
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
                <span class="quiz-icon">🎯</span>
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
                        feedbackRow.innerHTML = `✅ <strong>${isEn ? 'Correct!' : 'Rigtigt!'}</strong> ${qItem.explanation}`;
                    } else {
                        feedbackRow.className = 'quiz-feedback-row error';
                        feedbackRow.innerHTML = `❌ <strong>${isEn ? 'Not quite right.' : 'Ikke helt.'}</strong> ${qItem.explanation}`;
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
                    <div class="score-icon">🌟🎉</div>
                    <div class="score-title">${isEn ? 'Outstanding!' : 'Perfekt klaret!'}</div>
                    <div class="score-desc">${isEn ? `You got all ${quizItems.length} questions right!` : `Du svarede rigtigt på alle ${quizItems.length} spørgsmål!`}</div>
                `;
            } else {
                scoreBanner.className = 'quiz-score-banner good';
                scoreBanner.innerHTML = `
                    <div class="score-icon">👏</div>
                    <div class="score-title">${isEn ? 'Good job!' : 'Godt læst!'}</div>
                    <div class="score-desc">${isEn ? `You scored ${score} out of ${quizItems.length}.` : `Du fik ${score} ud af ${quizItems.length} rigtige.`}</div>
                `;
            }
        }

        return quizCard;
    }

    // Initialize View
    renderView();
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

        /* Hero */
        .hc-hero-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 2px solid #eab308;
            border-radius: 20px;
            padding: 2.2rem 2rem;
            text-align: center;
            margin-bottom: 2.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(234, 179, 8, 0.3);
            position: relative;
            overflow: hidden;
        }
        .hc-hero-badge {
            display: inline-block;
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid rgba(234, 179, 8, 0.4);
            color: #fde047;
            padding: 0.35rem 1rem;
            border-radius: 20px;
            font-size: 0.88rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .hc-hero-title {
            color: #fef08a;
            font-size: clamp(2rem, 4vw, 2.8rem);
            margin: 0 0 1rem 0;
            font-weight: 800;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .hc-hero-desc {
            color: #e2e8f0;
            font-size: 1.15rem;
            line-height: 1.65;
            max-width: 720px;
            margin: 0 auto 1.6rem auto;
        }
        .hc-features-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem 0.8rem;
            justify-content: center;
        }
        .hc-pill {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #cbd5e1;
            padding: 0.4rem 0.9rem;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        .hc-section-title {
            font-size: 1.45rem;
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
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        .hc-story-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 18px;
            padding: 1.6rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            position: relative;
        }
        .hc-story-card:hover {
            transform: translateY(-4px);
            border-color: #eab308;
            background: rgba(30, 41, 59, 0.95);
            box-shadow: 0 8px 24px rgba(234, 179, 8, 0.2);
        }
        .hc-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .hc-card-icon {
            font-size: 2.4rem;
        }
        .hc-card-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
        }
        .hc-wimmel-tag {
            background: rgba(234, 179, 8, 0.2);
            border: 1px solid #eab308;
            color: #fde047;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
        }
        .hc-level-tag {
            background: rgba(34, 197, 94, 0.18);
            border: 1px solid rgba(34, 197, 94, 0.4);
            color: #4ade80;
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
        }
        .hc-time-tag {
            background: rgba(2, 132, 199, 0.18);
            border: 1px solid rgba(2, 132, 199, 0.4);
            color: #60a5fa;
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
        }
        .hc-card-title {
            font-size: 1.5rem;
            color: #f8fafc;
            margin: 0;
            font-weight: 700;
        }
        .hc-card-subtitle {
            color: #94a3b8;
            font-size: 0.92rem;
            font-style: italic;
            margin-top: -0.4rem;
        }
        .hc-card-quote {
            margin: 0.4rem 0;
            padding: 0.6rem 0.9rem;
            background: rgba(234, 179, 8, 0.08);
            border-left: 3px solid #eab308;
            color: #fde047;
            font-size: 0.95rem;
            font-style: italic;
            border-radius: 0 8px 8px 0;
            line-height: 1.4;
        }
        .hc-card-teaser {
            color: #cbd5e1;
            font-size: 0.98rem;
            line-height: 1.5;
            margin: 0;
            flex-grow: 1;
        }
        .hc-card-footer {
            margin-top: 0.6rem;
            display: flex;
            justify-content: flex-end;
        }
        .hc-read-btn {
            background: #eab308;
            border: none;
            color: #0f172a;
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }
        .hc-story-card:hover .hc-read-btn {
            background: #fde047;
            transform: translateX(3px);
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

        /* Word Tokens with Grammar Color Coding */
        .hc-word-token {
            cursor: pointer;
            padding: 0.12rem 0.3rem;
            border-radius: 6px;
            font-weight: 700;
            transition: all 0.18s ease;
            display: inline-block;
            position: relative;
        }
        .hc-word-token:hover {
            transform: translateY(-2px);
            filter: brightness(1.25);
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .hc-word-token.token-sub {
            color: #4ade80;
            background: rgba(34, 197, 94, 0.15);
            border-bottom: 2px solid #22c55e;
        }
        .hc-word-token.token-vrb {
            color: #f87171;
            background: rgba(239, 68, 68, 0.15);
            border-bottom: 2px solid #ef4444;
        }
        .hc-word-token.token-adj {
            color: #fb923c;
            background: rgba(249, 115, 22, 0.15);
            border-bottom: 2px solid #f97316;
        }
        .hc-word-token.token-adv {
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
            border-bottom: 2px solid #38bdf8;
        }
        .hc-word-token.token-konj {
            color: #c084fc;
            background: rgba(168, 85, 247, 0.15);
            border-bottom: 2px solid #a855f7;
        }
        .hc-word-token.token-prep {
            color: #fde047;
            background: rgba(234, 179, 8, 0.15);
            border-bottom: 2px solid #eab308;
        }
        .hc-word-token.token-pro {
            color: #f472b6;
            background: rgba(236, 72, 153, 0.18);
            border-bottom: 2px solid #ec4899;
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

        /* ========================================= */
        /* SCENE TASKS (DETEKTIV & GRAMMATIK OPGAVER) */
        /* ========================================= */
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
