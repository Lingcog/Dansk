import { getTranslation, getLang } from '../utils/i18n.js';
import { hcAndersenStories } from '../data/hc_andersen_stories.js';

/**
 * HCAndersenView - H.C. Andersens Eventyr
 * Læs og lær dansk med forkortede, forsimplede udgaver af klassiske eventyr.
 * Funktioner: Oplæsning (TTS), interaktive gloser, sprog-spots og forståelsesquiz.
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
        if (!('speechSynthesis' in window)) return;
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
            if (!story) {
                activeStoryId = null;
                renderCatalog();
                return;
            }
            renderReader(story);
        }
    }

    // --- 1. CATALOG / OVERBLIK ---
    function renderCatalog() {
        const hero = document.createElement('div');
        hero.className = 'hc-hero-card';
        hero.innerHTML = `
            <div class="hc-hero-badge">🏰 ${isEn ? 'Classic Literature & Graded Reading' : 'Dansk kulturarv & Letlæst'}</div>
            <h1 class="hc-hero-title">H.C. Andersens eventyr</h1>
            <p class="hc-hero-desc">
                ${isEn 
                    ? "Read and learn Danish with simplified, shortened editions of Hans Christian Andersen's most famous fairy tales. Expand your vocabulary, listen to authentic spoken Danish, and test your understanding with engaging quizzes." 
                    : "Læs og lær dansk med forkortede og forsimplede udgaver af H.C. Andersens verdenskendte eventyr. Udvid dit ordforråd med ordforklaringer, lyt til den naturlige udtale og test din forståelse med små quizzer."}
            </p>
            <div class="hc-features-pills">
                <span class="hc-pill">🦢 4 klassiske eventyr</span>
                <span class="hc-pill">🎯 Niveau: Let (A2 - B1)</span>
                <span class="hc-pill">🔊 Indbygget oplæsning</span>
                <span class="hc-pill">📚 Gloser & ordforklaringer</span>
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
                stopSpeech();
                readingMode = btn.dataset.mode;
                renderView();
            };
        });

        // Font size control
        const fontControl = document.createElement('div');
        fontControl.className = 'hc-font-control';
        fontControl.innerHTML = `
            <span class="font-label">Skrift:</span>
            <button class="font-btn ${fontSizeLevel === 0 ? 'active' : ''}" data-size="0" title="Standard">A</button>
            <button class="font-btn ${fontSizeLevel === 1 ? 'active' : ''}" data-size="1" title="Mellem">A+</button>
            <button class="font-btn ${fontSizeLevel === 2 ? 'active' : ''}" data-size="2" title="Stor">A++</button>
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

        // Story Body Area
        const storyBody = document.createElement('div');
        storyBody.className = 'hc-story-body';

        if (readingMode === 'steps') {
            // STEP BY STEP MODE
            const stepNav = document.createElement('div');
            stepNav.className = 'hc-step-nav';

            story.sections.forEach((sec, idx) => {
                const stepPill = document.createElement('button');
                stepPill.className = `hc-step-pill ${idx === currentStepIdx ? 'active' : ''}`;
                stepPill.innerHTML = `<span>Del ${idx + 1}</span>`;
                stepPill.onclick = () => {
                    stopSpeech();
                    currentStepIdx = idx;
                    renderView();
                };
                stepNav.appendChild(stepPill);
            });
            storyBody.appendChild(stepNav);

            const activeSection = story.sections[currentStepIdx];
            const sectionCard = createSectionCard(activeSection, currentStepIdx, story);
            storyBody.appendChild(sectionCard);

            // Step controls (Prev / Next)
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

            storyBody.appendChild(stepActions);

        } else {
            // FULL TEXT MODE
            story.sections.forEach((sec, idx) => {
                const sectionCard = createSectionCard(sec, idx, story);
                storyBody.appendChild(sectionCard);
            });
        }

        readerWrapper.appendChild(storyBody);

        // Grammar Spot Card
        if (story.grammarFocus) {
            const grammarCard = document.createElement('div');
            grammarCard.className = 'hc-grammar-spot';
            grammarCard.innerHTML = `
                <div class="grammar-spot-header">
                    <span class="grammar-icon">💡</span>
                    <h4>${story.grammarFocus.title}</h4>
                </div>
                <p class="grammar-spot-text">${story.grammarFocus.desc}</p>
            `;
            readerWrapper.appendChild(grammarCard);
        }

        // Vocabulary Reference Box
        if (story.vocabulary && story.vocabulary.length > 0) {
            const vocabCard = document.createElement('div');
            vocabCard.className = 'hc-vocab-card';
            vocabCard.innerHTML = `
                <div class="vocab-header">
                    <span class="vocab-icon">📚</span>
                    <h3>${isEn ? 'Vocabulary & Explanations' : 'Gloser & ordforklaringer i dette eventyr'}</h3>
                </div>
                <p class="vocab-hint">
                    ${isEn 
                        ? 'Click the speaker button to hear the pronunciation of each word:' 
                        : 'Lær ordene at kende – klik på højttaleren for at høre udtalen:'}
                </p>
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

        const textBody = document.createElement('div');
        textBody.className = 'section-text-body';

        // Format paragraphs and highlight vocabulary words
        const paragraphs = section.text.split('\n\n');
        paragraphs.forEach(pText => {
            const p = document.createElement('p');
            p.className = 'story-paragraph';

            // Mark vocabulary words with interactive span
            let highlighted = pText;
            if (story.vocabulary) {
                story.vocabulary.forEach(vocab => {
                    // Extract stem or bare word for highlighting
                    const bareWord = vocab.word.replace(/^(en|et|at)\s+/, '');
                    const regex = new RegExp(`\\b(${bareWord}[a-zæøå]*)\\b`, 'gi');
                    highlighted = highlighted.replace(regex, (match) => {
                        return `<span class="vocab-highlight" title="${vocab.meaningDa} (${vocab.meaningEn})" data-word="${match}">${match}</span>`;
                    });
                });
            }

            p.innerHTML = highlighted;

            // Add click listeners to vocabulary highlights
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

        card.appendChild(textBody);
        return card;
    }

    function showQuickWordTip(anchorEl, word, vocabularyList) {
        // Remove existing tip
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

                    // Check if all answered
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
            gap: 0.5rem;
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
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.8rem;
            margin-bottom: 1.4rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.8rem;
            margin-bottom: 1.2rem;
        }
        .section-header h3 {
            font-size: 1.25rem;
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
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #e2e8f0;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            font-size: 1rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s;
        }
        .quiz-opt-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.12);
            border-color: #38bdf8;
            color: #fff;
        }
        .quiz-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            font-weight: 700;
        }
        .quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .quiz-feedback-row {
            margin-top: 0.8rem;
            padding: 0.7rem 0.9rem;
            border-radius: 8px;
            font-size: 0.95rem;
            line-height: 1.4;
        }
        .quiz-feedback-row.success {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #86efac;
        }
        .quiz-feedback-row.error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #fca5a5;
        }
        .quiz-score-banner {
            margin-top: 1.5rem;
            padding: 1.4rem;
            border-radius: 14px;
            text-align: center;
        }
        .quiz-score-banner.perfect {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.25) 100%);
            border: 2px solid #22c55e;
            color: #86efac;
        }
        .quiz-score-banner.good {
            background: rgba(2, 132, 199, 0.2);
            border: 2px solid #0284c7;
            color: #7dd3fc;
        }
        .score-icon { font-size: 2.2rem; margin-bottom: 0.3rem; }
        .score-title { font-size: 1.35rem; font-weight: 800; margin-bottom: 0.3rem; }
        .score-desc { font-size: 1.05rem; }

        /* Bottom Nav */
        .hc-bottom-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .back-to-list-btn, .next-story-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #f8fafc;
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .back-to-list-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            color: #fff;
        }
        .next-story-btn {
            background: #eab308;
            border-color: #eab308;
            color: #0f172a;
            margin-left: auto;
        }
        .next-story-btn:hover {
            background: #fde047;
            transform: translateY(-2px);
        }

        @media (max-width: 650px) {
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
            .hc-bottom-nav {
                flex-direction: column;
                align-items: stretch;
            }
            .next-story-btn {
                margin-left: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
