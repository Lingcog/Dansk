import { getTranslation } from '../utils/i18n.js';
import { targetTrainingTracks } from '../utils/target_training_data.js';

export function renderTraenSporgsmalTrackView(container, navigateFn, extraData = {}) {
    const trackId = extraData.trackId || extraData.track || extraData.subPath || 'anna';
    const initialTab = parseInt(extraData.initialTab || extraData.tab || '1', 10);

    const track = targetTrainingTracks.find(t => t.id === trackId) || targetTrainingTracks[0];

    const t = (key, fallback) => {
        const val = getTranslation(key);
        return (!val || val === key) ? fallback : val;
    };

    let activeTimer = null;
    function clearActiveTimer() {
        if (activeTimer) {
            clearTimeout(activeTimer);
            activeTimer = null;
        }
    }

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';
    viewContainer.style.maxWidth = '800px';
    viewContainer.style.margin = '0 auto';
    viewContainer.style.padding = '1rem';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.marginBottom = '1.5rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${t('back', 'Tilbage')}`;
    backBtn.onclick = () => {
        clearActiveTimer();
        navigateFn('traen_sporgsmal_menu');
    };
    topBar.appendChild(backBtn);

    viewContainer.appendChild(topBar);

    // Header
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '2rem';

    const trackTitle = document.createElement('h1');
    trackTitle.innerHTML = `${track.icon} ${t(track.titleKey, track.defaultTitle)}`;
    trackTitle.style.fontSize = '2rem';
    trackTitle.style.marginBottom = '0.5rem';

    const trackDesc = document.createElement('p');
    trackDesc.className = 'subtitle';
    trackDesc.textContent = t(track.descKey, track.defaultDesc);
    trackDesc.style.color = 'var(--text-muted, #aaa)';
    trackDesc.style.fontSize = '1.1rem';

    header.appendChild(trackTitle);
    header.appendChild(trackDesc);
    viewContainer.appendChild(header);

    // Tabs navigation
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'track-tabs-nav';
    tabsContainer.style.display = 'grid';
    tabsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    tabsContainer.style.gap = '0.75rem';
    tabsContainer.style.marginBottom = '2rem';

    const tabs = [
        { id: 1, labelKey: 'traen_tab_semantic', defaultLabel: '1. Semantisk (Hv-ord)', icon: '🎯' },
        { id: 2, labelKey: 'traen_tab_yesno', defaultLabel: '2. Ja/Nej-spørgsmål', icon: '❓' },
        { id: 3, labelKey: 'traen_tab_wordorder', defaultLabel: '3. Ordstilling', icon: '🧩' }
    ];

    let currentTab = initialTab >= 1 && initialTab <= 3 ? initialTab : 1;

    const tabButtons = [];
    const exerciseContainer = document.createElement('div');
    exerciseContainer.className = 'exercise-main-content';

    tabs.forEach(tabInfo => {
        const btn = document.createElement('button');
        btn.className = 'track-tab-btn';
        btn.style.padding = '0.85rem 0.5rem';
        btn.style.border = '2px solid transparent';
        btn.style.borderRadius = '10px';
        btn.style.fontSize = '1rem';
        btn.style.fontWeight = '600';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all 0.2s ease';
        btn.style.background = 'var(--card-bg, rgba(255,255,255,0.06))';
        btn.style.color = 'var(--text-color, #fff)';
        btn.innerHTML = `${tabInfo.icon} <span class="tab-label-text">${t(tabInfo.labelKey, tabInfo.defaultLabel)}</span>`;

        btn.onclick = () => {
            clearActiveTimer();
            currentTab = tabInfo.id;
            updateTabStyles();
            renderActiveTab();
        };

        tabsContainer.appendChild(btn);
        tabButtons.push({ btn, id: tabInfo.id });
    });

    viewContainer.appendChild(tabsContainer);
    viewContainer.appendChild(exerciseContainer);

    function updateTabStyles() {
        tabButtons.forEach(tb => {
            if (tb.id === currentTab) {
                tb.btn.style.background = 'var(--accent-color, #4a90e2)';
                tb.btn.style.borderColor = '#ffffff';
                tb.btn.style.color = '#ffffff';
                tb.btn.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.4)';
            } else {
                tb.btn.style.background = 'var(--card-bg, rgba(255,255,255,0.08))';
                tb.btn.style.borderColor = 'rgba(255,255,255,0.1)';
                tb.btn.style.color = 'var(--text-muted, #ccc)';
                tb.btn.style.boxShadow = 'none';
            }
        });
    }

    // -------------------------------------------------------------
    // EXERCISE 1: SEMANTISK TRÆNING (HV-ORD)
    // -------------------------------------------------------------
    function renderSemanticExercise() {
        clearActiveTimer();
        exerciseContainer.innerHTML = '';
        const questions = track.semantic || [];
        let curIdx = 0;

        function showQ() {
            clearActiveTimer();
            if (currentTab !== 1) return;
            exerciseContainer.innerHTML = '';

            if (curIdx >= questions.length) {
                // Done screen
                const doneCard = document.createElement('div');
                doneCard.style.background = 'var(--card-bg, rgba(255,255,255,0.05))';
                doneCard.style.padding = '2.5rem 1.5rem';
                doneCard.style.borderRadius = '16px';
                doneCard.style.textAlign = 'center';
                doneCard.style.border = '1px solid rgba(255,255,255,0.1)';

                const doneTitle = document.createElement('h2');
                doneTitle.innerHTML = t('traen_semantic_done_title', '🏆 Fantastisk! Du har gennemført den semantiske træning!');
                doneTitle.style.marginBottom = '1.5rem';
                doneTitle.style.fontSize = '1.5rem';

                const btnGroup = document.createElement('div');
                btnGroup.style.display = 'flex';
                btnGroup.style.justifyContent = 'center';
                btnGroup.style.gap = '1rem';
                btnGroup.style.flexWrap = 'wrap';

                const restartBtn = document.createElement('button');
                restartBtn.className = 'primary-btn';
                restartBtn.innerHTML = `↻ ${t('traen_btn_restart', 'Prøv igen')}`;
                restartBtn.onclick = () => { curIdx = 0; showQ(); };

                const nextTabBtn = document.createElement('button');
                nextTabBtn.className = 'primary-btn';
                nextTabBtn.style.background = '#4caf50';
                nextTabBtn.innerHTML = `${t('traen_btn_next_exercise', 'Videre til Ja/Nej-spørgsmål')} →`;
                nextTabBtn.onclick = () => {
                    clearActiveTimer();
                    currentTab = 2;
                    updateTabStyles();
                    renderActiveTab();
                };

                btnGroup.appendChild(restartBtn);
                btnGroup.appendChild(nextTabBtn);
                doneCard.appendChild(doneTitle);
                doneCard.appendChild(btnGroup);
                exerciseContainer.appendChild(doneCard);
                return;
            }

            const q = questions[curIdx];

            // Progress counter
            const progress = document.createElement('div');
            progress.style.display = 'flex';
            progress.style.justifyContent = 'space-between';
            progress.style.alignItems = 'center';
            progress.style.marginBottom = '1rem';
            progress.style.color = 'var(--text-muted, #aaa)';
            progress.style.fontSize = '0.95rem';

            const progressText = document.createElement('span');
            progressText.textContent = `${t('traen_q_counter', 'Spørgsmål {current} af {total}').replace('{current}', curIdx + 1).replace('{total}', questions.length)}`;

            const badge = document.createElement('span');
            badge.style.background = 'rgba(74, 144, 226, 0.2)';
            badge.style.color = '#64b5f6';
            badge.style.padding = '0.2rem 0.6rem';
            badge.style.borderRadius = '20px';
            badge.style.fontSize = '0.85rem';
            badge.textContent = t('traen_badge_semantic', 'Semantisk (Hv-ord)');

            progress.appendChild(progressText);
            progress.appendChild(badge);
            exerciseContainer.appendChild(progress);

            // Situation
            const sit = document.createElement('div');
            sit.style.background = 'rgba(255,255,255,0.04)';
            sit.style.border = '1px solid rgba(255,255,255,0.08)';
            sit.style.padding = '1rem 1.25rem';
            sit.style.borderRadius = '10px';
            sit.style.marginBottom = '1rem';
            sit.style.fontSize = '1.1rem';
            sit.style.lineHeight = '1.5';
            sit.textContent = t(q.situationKey, q.situationFallback);
            exerciseContainer.appendChild(sit);

            // Goal
            const goal = document.createElement('div');
            goal.style.marginBottom = '1.5rem';
            goal.style.fontSize = '1.15rem';
            goal.style.fontWeight = '500';
            goal.innerHTML = `🎯 ${t(q.goalKey, q.goalFallback)}`;
            exerciseContainer.appendChild(goal);

            // Sentence Box with Cloze
            const sentenceBox = document.createElement('div');
            sentenceBox.style.background = 'rgba(0,0,0,0.35)';
            sentenceBox.style.padding = '1.5rem';
            sentenceBox.style.borderRadius = '12px';
            sentenceBox.style.fontSize = '1.5rem';
            sentenceBox.style.textAlign = 'center';
            sentenceBox.style.marginBottom = '1.5rem';
            sentenceBox.style.border = '1px dashed rgba(255,255,255,0.2)';

            const missingWord = document.createElement('span');
            missingWord.textContent = q.sentenceParts[0];
            missingWord.style.color = '#ff9800';
            missingWord.style.fontWeight = 'bold';
            missingWord.style.marginRight = '0.35rem';

            const restWord = document.createElement('span');
            restWord.textContent = q.sentenceParts[1];

            sentenceBox.appendChild(missingWord);
            sentenceBox.appendChild(restWord);
            exerciseContainer.appendChild(sentenceBox);

            // Options Grid
            const optionsGrid = document.createElement('div');
            optionsGrid.style.display = 'grid';
            optionsGrid.style.gridTemplateColumns = '1fr 1fr';
            optionsGrid.style.gap = '1rem';
            optionsGrid.style.marginBottom = '1.5rem';

            // Feedback area
            const feedbackBox = document.createElement('div');
            feedbackBox.style.minHeight = '90px';

            q.options.forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = 'choice-btn';
                optBtn.style.padding = '1.1rem';
                optBtn.style.fontSize = '1.25rem';
                optBtn.style.fontWeight = '600';
                optBtn.style.background = 'rgba(255,255,255,0.08)';
                optBtn.style.border = '2px solid rgba(255,255,255,0.18)';
                optBtn.style.color = '#ffffff';
                optBtn.style.borderRadius = '10px';
                optBtn.style.cursor = 'pointer';
                optBtn.style.transition = 'all 0.15s ease';
                optBtn.textContent = opt;

                optBtn.onmouseenter = () => {
                    if (optBtn.style.pointerEvents !== 'none') {
                        optBtn.style.borderColor = 'rgba(255,255,255,0.4)';
                        optBtn.style.transform = 'translateY(-2px)';
                    }
                };
                optBtn.onmouseleave = () => {
                    optBtn.style.transform = 'none';
                };

                optBtn.onclick = () => {
                    Array.from(optionsGrid.children).forEach(c => {
                        c.style.pointerEvents = 'none';
                    });

                    const isCorrect = (opt === q.correct);
                    missingWord.textContent = q.correct;

                    if (isCorrect) {
                        optBtn.style.background = '#2e7d32';
                        optBtn.style.borderColor = '#4caf50';
                        missingWord.style.color = '#4caf50';

                        feedbackBox.innerHTML = `
                            <div style="background: rgba(46, 125, 50, 0.2); border: 1px solid #4caf50; padding: 1rem 1.25rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                                <div>
                                    <h4 style="color: #4caf50; margin: 0 0 0.35rem 0; font-size: 1.1rem;">✓ ${t('traen_correct', 'Korrekt!')}</h4>
                                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.4;">${t(q.explanationKey, q.explanationFallback)}</p>
                                </div>
                                <button id="sem-next-btn" class="primary-btn" style="padding: 0.6rem 1rem; font-size: 0.95rem; white-space: nowrap;">${t('traen_btn_next', 'Næste →')}</button>
                            </div>
                        `;

                        document.getElementById('sem-next-btn').onclick = () => {
                            clearActiveTimer();
                            curIdx++;
                            showQ();
                        };

                        activeTimer = setTimeout(() => {
                            if (currentTab === 1) {
                                curIdx++;
                                showQ();
                            }
                        }, 3000);
                    } else {
                        optBtn.style.background = '#c62828';
                        optBtn.style.borderColor = '#ef5350';
                        missingWord.style.color = '#4caf50';

                        Array.from(optionsGrid.children).forEach(c => {
                            if (c.textContent === q.correct) {
                                c.style.background = '#2e7d32';
                                c.style.borderColor = '#4caf50';
                            }
                        });

                        feedbackBox.innerHTML = `
                            <div style="background: rgba(198, 40, 40, 0.2); border: 1px solid #ef5350; padding: 1rem 1.25rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                                <div>
                                    <h4 style="color: #ef5350; margin: 0 0 0.35rem 0; font-size: 1.1rem;">✗ ${t('traen_wrong', 'Desværre forkert')}</h4>
                                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.4;">
                                        ${t('traen_correct_is', 'Det rigtige svar er')} <strong>${q.correct}</strong>. ${t(q.explanationKey, q.explanationFallback)}
                                    </p>
                                </div>
                                <button id="sem-next-btn" class="primary-btn" style="padding: 0.6rem 1rem; font-size: 0.95rem; white-space: nowrap;">${t('traen_btn_next', 'Næste →')}</button>
                            </div>
                        `;

                        document.getElementById('sem-next-btn').onclick = () => {
                            clearActiveTimer();
                            curIdx++;
                            showQ();
                        };

                        activeTimer = setTimeout(() => {
                            if (currentTab === 1) {
                                curIdx++;
                                showQ();
                            }
                        }, 4500);
                    }
                };

                optionsGrid.appendChild(optBtn);
            });

            exerciseContainer.appendChild(optionsGrid);
            exerciseContainer.appendChild(feedbackBox);
        }

        showQ();
    }

    // -------------------------------------------------------------
    // EXERCISE 2: JA/NEJ-SPØRGSMÅL (VERBUM FØRST - V1)
    // -------------------------------------------------------------
    function renderYesNoExercise() {
        clearActiveTimer();
        exerciseContainer.innerHTML = '';
        const questions = track.yesNo || [];
        let curIdx = 0;

        function showQ() {
            clearActiveTimer();
            if (currentTab !== 2) return;
            exerciseContainer.innerHTML = '';

            if (curIdx >= questions.length) {
                // Done screen
                const doneCard = document.createElement('div');
                doneCard.style.background = 'var(--card-bg, rgba(255,255,255,0.05))';
                doneCard.style.padding = '2.5rem 1.5rem';
                doneCard.style.borderRadius = '16px';
                doneCard.style.textAlign = 'center';
                doneCard.style.border = '1px solid rgba(255,255,255,0.1)';

                const doneTitle = document.createElement('h2');
                doneTitle.innerHTML = t('traen_yesno_done_title', '🏆 Godt gået! Du har mestret ja/nej-spørgsmål!');
                doneTitle.style.marginBottom = '1.5rem';
                doneTitle.style.fontSize = '1.5rem';

                const btnGroup = document.createElement('div');
                btnGroup.style.display = 'flex';
                btnGroup.style.justifyContent = 'center';
                btnGroup.style.gap = '1rem';
                btnGroup.style.flexWrap = 'wrap';

                const restartBtn = document.createElement('button');
                restartBtn.className = 'primary-btn';
                restartBtn.innerHTML = `↻ ${t('traen_btn_restart', 'Prøv igen')}`;
                restartBtn.onclick = () => { curIdx = 0; showQ(); };

                const nextTabBtn = document.createElement('button');
                nextTabBtn.className = 'primary-btn';
                nextTabBtn.style.background = '#4caf50';
                nextTabBtn.innerHTML = `${t('traen_btn_next_exercise', 'Videre til Ordstilling')} →`;
                nextTabBtn.onclick = () => {
                    clearActiveTimer();
                    currentTab = 3;
                    updateTabStyles();
                    renderActiveTab();
                };

                btnGroup.appendChild(restartBtn);
                btnGroup.appendChild(nextTabBtn);
                doneCard.appendChild(doneTitle);
                doneCard.appendChild(btnGroup);
                exerciseContainer.appendChild(doneCard);
                return;
            }

            const q = questions[curIdx];

            // Progress counter
            const progress = document.createElement('div');
            progress.style.display = 'flex';
            progress.style.justifyContent = 'space-between';
            progress.style.alignItems = 'center';
            progress.style.marginBottom = '1rem';
            progress.style.color = 'var(--text-muted, #aaa)';
            progress.style.fontSize = '0.95rem';

            const progressText = document.createElement('span');
            progressText.textContent = `${t('traen_q_counter', 'Spørgsmål {current} af {total}').replace('{current}', curIdx + 1).replace('{total}', questions.length)}`;

            const badge = document.createElement('span');
            badge.style.background = 'rgba(76, 175, 80, 0.2)';
            badge.style.color = '#81c784';
            badge.style.padding = '0.2rem 0.6rem';
            badge.style.borderRadius = '20px';
            badge.style.fontSize = '0.85rem';
            badge.textContent = t('traen_badge_yesno', 'Ja/Nej (Verbum først)');

            progress.appendChild(progressText);
            progress.appendChild(badge);
            exerciseContainer.appendChild(progress);

            // Situation
            const sit = document.createElement('div');
            sit.style.background = 'rgba(255,255,255,0.04)';
            sit.style.border = '1px solid rgba(255,255,255,0.08)';
            sit.style.padding = '1rem 1.25rem';
            sit.style.borderRadius = '10px';
            sit.style.marginBottom = '1rem';
            sit.style.fontSize = '1.1rem';
            sit.style.lineHeight = '1.5';
            sit.textContent = t(q.situationKey, q.situationFallback);
            exerciseContainer.appendChild(sit);

            // Goal
            const goal = document.createElement('div');
            goal.style.marginBottom = '1.5rem';
            goal.style.fontSize = '1.15rem';
            goal.style.fontWeight = '500';
            goal.innerHTML = `🎯 ${t(q.goalKey, q.goalFallback)}`;
            exerciseContainer.appendChild(goal);

            // Sentence Box with Cloze
            const sentenceBox = document.createElement('div');
            sentenceBox.style.background = 'rgba(0,0,0,0.35)';
            sentenceBox.style.padding = '1.5rem';
            sentenceBox.style.borderRadius = '12px';
            sentenceBox.style.fontSize = '1.5rem';
            sentenceBox.style.textAlign = 'center';
            sentenceBox.style.marginBottom = '1.5rem';
            sentenceBox.style.border = '1px dashed rgba(255,255,255,0.2)';

            const missingWord = document.createElement('span');
            missingWord.textContent = q.sentenceParts[0];
            missingWord.style.color = '#4caf50';
            missingWord.style.fontWeight = 'bold';
            missingWord.style.marginRight = '0.35rem';

            const restWord = document.createElement('span');
            restWord.textContent = q.sentenceParts[1];

            sentenceBox.appendChild(missingWord);
            sentenceBox.appendChild(restWord);
            exerciseContainer.appendChild(sentenceBox);

            // Options Grid
            const optionsGrid = document.createElement('div');
            optionsGrid.style.display = 'grid';
            optionsGrid.style.gridTemplateColumns = '1fr 1fr';
            optionsGrid.style.gap = '1rem';
            optionsGrid.style.marginBottom = '1.5rem';

            // Feedback area
            const feedbackBox = document.createElement('div');
            feedbackBox.style.minHeight = '90px';

            q.options.forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = 'choice-btn';
                optBtn.style.padding = '1.1rem';
                optBtn.style.fontSize = '1.25rem';
                optBtn.style.fontWeight = '600';
                optBtn.style.background = 'rgba(255,255,255,0.08)';
                optBtn.style.border = '2px solid rgba(255,255,255,0.18)';
                optBtn.style.color = '#ffffff';
                optBtn.style.borderRadius = '10px';
                optBtn.style.cursor = 'pointer';
                optBtn.style.transition = 'all 0.15s ease';
                optBtn.textContent = opt;

                optBtn.onmouseenter = () => {
                    if (optBtn.style.pointerEvents !== 'none') {
                        optBtn.style.borderColor = 'rgba(255,255,255,0.4)';
                        optBtn.style.transform = 'translateY(-2px)';
                    }
                };
                optBtn.onmouseleave = () => {
                    optBtn.style.transform = 'none';
                };

                optBtn.onclick = () => {
                    Array.from(optionsGrid.children).forEach(c => {
                        c.style.pointerEvents = 'none';
                    });

                    const isCorrect = (opt === q.correct);
                    missingWord.textContent = q.correct;

                    if (isCorrect) {
                        optBtn.style.background = '#2e7d32';
                        optBtn.style.borderColor = '#4caf50';
                        missingWord.style.color = '#4caf50';

                        feedbackBox.innerHTML = `
                            <div style="background: rgba(46, 125, 50, 0.2); border: 1px solid #4caf50; padding: 1rem 1.25rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                                <div>
                                    <h4 style="color: #4caf50; margin: 0 0 0.35rem 0; font-size: 1.1rem;">✓ ${t('traen_correct', 'Korrekt!')}</h4>
                                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.4;">${t(q.explanationKey, q.explanationFallback)}</p>
                                </div>
                                <button id="jn-next-btn" class="primary-btn" style="padding: 0.6rem 1rem; font-size: 0.95rem; white-space: nowrap;">${t('traen_btn_next', 'Næste →')}</button>
                            </div>
                        `;

                        document.getElementById('jn-next-btn').onclick = () => {
                            clearActiveTimer();
                            curIdx++;
                            showQ();
                        };

                        activeTimer = setTimeout(() => {
                            if (currentTab === 2) {
                                curIdx++;
                                showQ();
                            }
                        }, 3000);
                    } else {
                        optBtn.style.background = '#c62828';
                        optBtn.style.borderColor = '#ef5350';
                        missingWord.style.color = '#4caf50';

                        Array.from(optionsGrid.children).forEach(c => {
                            if (c.textContent === q.correct) {
                                c.style.background = '#2e7d32';
                                c.style.borderColor = '#4caf50';
                            }
                        });

                        feedbackBox.innerHTML = `
                            <div style="background: rgba(198, 40, 40, 0.2); border: 1px solid #ef5350; padding: 1rem 1.25rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                                <div>
                                    <h4 style="color: #ef5350; margin: 0 0 0.35rem 0; font-size: 1.1rem;">✗ ${t('traen_wrong', 'Desværre forkert')}</h4>
                                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.4;">
                                        ${t('traen_correct_is', 'Det rigtige svar er')} <strong>${q.correct}</strong>. ${t(q.explanationKey, q.explanationFallback)}
                                    </p>
                                </div>
                                <button id="jn-next-btn" class="primary-btn" style="padding: 0.6rem 1rem; font-size: 0.95rem; white-space: nowrap;">${t('traen_btn_next', 'Næste →')}</button>
                            </div>
                        `;

                        document.getElementById('jn-next-btn').onclick = () => {
                            clearActiveTimer();
                            curIdx++;
                            showQ();
                        };

                        activeTimer = setTimeout(() => {
                            if (currentTab === 2) {
                                curIdx++;
                                showQ();
                            }
                        }, 4500);
                    }
                };

                optionsGrid.appendChild(optBtn);
            });

            exerciseContainer.appendChild(optionsGrid);
            exerciseContainer.appendChild(feedbackBox);
        }

        showQ();
    }

    // -------------------------------------------------------------
    // EXERCISE 3: ORDSTILLING (PUSLESPIL)
    // -------------------------------------------------------------
    function renderWordOrderExercise() {
        clearActiveTimer();
        exerciseContainer.innerHTML = '';
        const sentences = track.wordOrder || [];
        let curIdx = 0;

        function showPuzzle() {
            clearActiveTimer();
            if (currentTab !== 3) return;
            exerciseContainer.innerHTML = '';

            if (curIdx >= sentences.length) {
                // Done screen
                const doneCard = document.createElement('div');
                doneCard.style.background = 'var(--card-bg, rgba(255,255,255,0.05))';
                doneCard.style.padding = '2.5rem 1.5rem';
                doneCard.style.borderRadius = '16px';
                doneCard.style.textAlign = 'center';
                doneCard.style.border = '1px solid rgba(255,255,255,0.1)';

                const doneTitle = document.createElement('h2');
                doneTitle.innerHTML = t('traen_wordorder_done_title', '🏆 Superflot! Du har bygget alle spørgsmålene i korrekt ordstilling!');
                doneTitle.style.marginBottom = '1.5rem';
                doneTitle.style.fontSize = '1.5rem';

                const btnGroup = document.createElement('div');
                btnGroup.style.display = 'flex';
                btnGroup.style.justifyContent = 'center';
                btnGroup.style.gap = '1rem';
                btnGroup.style.flexWrap = 'wrap';

                const restartBtn = document.createElement('button');
                restartBtn.className = 'primary-btn';
                restartBtn.innerHTML = `↻ ${t('traen_btn_restart', 'Prøv igen')}`;
                restartBtn.onclick = () => { curIdx = 0; showPuzzle(); };

                const menuBtn = document.createElement('button');
                menuBtn.className = 'primary-btn';
                menuBtn.style.background = 'var(--accent-color, #4a90e2)';
                menuBtn.innerHTML = `${t('traen_btn_back_to_menu', 'Tilbage til menuen')} ←`;
                menuBtn.onclick = () => {
                    clearActiveTimer();
                    navigateFn('traen_sporgsmal_menu');
                };

                btnGroup.appendChild(restartBtn);
                btnGroup.appendChild(menuBtn);
                doneCard.appendChild(doneTitle);
                doneCard.appendChild(btnGroup);
                exerciseContainer.appendChild(doneCard);
                return;
            }

            const originalSentence = sentences[curIdx];
            const targetWords = originalSentence.split(' ');
            
            // Scramble words, ensuring it is not already solved if length > 1
            let scrambledWords = [...targetWords];
            if (scrambledWords.length > 1) {
                let attempts = 0;
                while (scrambledWords.join(' ') === originalSentence && attempts < 10) {
                    scrambledWords.sort(() => Math.random() - 0.5);
                    attempts++;
                }
            }

            // Progress counter
            const progress = document.createElement('div');
            progress.style.display = 'flex';
            progress.style.justifyContent = 'space-between';
            progress.style.alignItems = 'center';
            progress.style.marginBottom = '1rem';
            progress.style.color = 'var(--text-muted, #aaa)';
            progress.style.fontSize = '0.95rem';

            const progressText = document.createElement('span');
            progressText.textContent = `${t('traen_q_counter', 'Spørgsmål {current} af {total}').replace('{current}', curIdx + 1).replace('{total}', sentences.length)}`;

            const badge = document.createElement('span');
            badge.style.background = 'rgba(255, 152, 0, 0.2)';
            badge.style.color = '#ffb74d';
            badge.style.padding = '0.2rem 0.6rem';
            badge.style.borderRadius = '20px';
            badge.style.fontSize = '0.85rem';
            badge.textContent = t('traen_badge_wordorder', 'Ordstilling (Puslespil)');

            progress.appendChild(progressText);
            progress.appendChild(badge);
            exerciseContainer.appendChild(progress);

            // Intro prompt
            const intro = document.createElement('p');
            intro.style.fontSize = '1.1rem';
            intro.style.marginBottom = '1.5rem';
            intro.textContent = t('traen_wordorder_intro', 'Byg spørgsmålet. Tryk på ordene i den rigtige rækkefølge:');
            exerciseContainer.appendChild(intro);

            // Result sentence area (drop area)
            const resultArea = document.createElement('div');
            resultArea.className = 'result-sentence-area';
            resultArea.style.minHeight = '75px';
            resultArea.style.background = 'rgba(0,0,0,0.35)';
            resultArea.style.border = '2px dashed rgba(255,255,255,0.2)';
            resultArea.style.borderRadius = '12px';
            resultArea.style.padding = '1rem';
            resultArea.style.display = 'flex';
            resultArea.style.flexWrap = 'wrap';
            resultArea.style.gap = '0.5rem';
            resultArea.style.alignItems = 'center';
            resultArea.style.marginBottom = '1.5rem';
            exerciseContainer.appendChild(resultArea);

            // Word pool (source area)
            const wordPool = document.createElement('div');
            wordPool.className = 'word-pool';
            wordPool.style.minHeight = '75px';
            wordPool.style.background = 'rgba(255,255,255,0.03)';
            wordPool.style.border = '1px solid rgba(255,255,255,0.08)';
            wordPool.style.borderRadius = '12px';
            wordPool.style.padding = '1rem';
            wordPool.style.display = 'flex';
            wordPool.style.flexWrap = 'wrap';
            wordPool.style.gap = '0.5rem';
            wordPool.style.alignItems = 'center';
            wordPool.style.marginBottom = '1.5rem';
            exerciseContainer.appendChild(wordPool);

            // Feedback & Controls
            const feedback = document.createElement('div');
            feedback.style.minHeight = '48px';
            feedback.style.marginBottom = '1rem';
            feedback.style.fontSize = '1.1rem';
            feedback.style.fontWeight = '600';
            exerciseContainer.appendChild(feedback);

            const controls = document.createElement('div');
            controls.style.display = 'flex';
            controls.style.gap = '1rem';
            controls.style.justifyContent = 'flex-end';

            const nextBtn = document.createElement('button');
            nextBtn.className = 'primary-btn';
            nextBtn.textContent = t('traen_btn_next', 'Næste →');
            nextBtn.style.display = 'none';
            nextBtn.onclick = () => {
                curIdx++;
                showPuzzle();
            };

            controls.appendChild(nextBtn);
            exerciseContainer.appendChild(controls);

            // Populate word chips
            scrambledWords.forEach(word => {
                const chip = document.createElement('div');
                chip.className = 'word-chip pool';
                chip.textContent = word;
                chip.style.padding = '0.6rem 1rem';
                chip.style.background = 'rgba(255,255,255,0.12)';
                chip.style.border = '1px solid rgba(255,255,255,0.25)';
                chip.style.borderRadius = '8px';
                chip.style.cursor = 'pointer';
                chip.style.fontSize = '1.2rem';
                chip.style.fontWeight = '500';
                chip.style.color = '#ffffff';
                chip.style.transition = 'all 0.15s ease';
                chip.style.userSelect = 'none';

                chip.onclick = () => {
                    if (chip.parentElement === wordPool) {
                        resultArea.appendChild(chip);
                        chip.style.background = 'rgba(74, 144, 226, 0.4)';
                        chip.style.borderColor = '#4a90e2';
                    } else {
                        wordPool.appendChild(chip);
                        chip.style.background = 'rgba(255,255,255,0.12)';
                        chip.style.borderColor = 'rgba(255,255,255,0.25)';
                    }
                    checkAnswer();
                };

                wordPool.appendChild(chip);
            });

            function checkAnswer() {
                const selectedWords = Array.from(resultArea.children).map(c => c.textContent);
                const remainingInPool = wordPool.children.length;

                if (remainingInPool === 0) {
                    if (selectedWords.join(' ') === originalSentence) {
                        feedback.textContent = `✓ ${t('traen_wordorder_success', 'Korrekt ordstilling! Godt gået.')}`;
                        feedback.style.color = '#4caf50';
                        resultArea.style.borderColor = '#4caf50';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        feedback.textContent = `✗ ${t('traen_wordorder_error', 'Forkert ordstilling. Prøv igen!')}`;
                        feedback.style.color = '#ef5350';
                        resultArea.style.borderColor = '#ef5350';
                        nextBtn.style.display = 'none';
                    }
                } else {
                    feedback.textContent = '';
                    resultArea.style.borderColor = 'rgba(255,255,255,0.2)';
                    nextBtn.style.display = 'none';
                }
            }
        }

        showPuzzle();
    }

    function renderActiveTab() {
        clearActiveTimer();
        if (currentTab === 1) {
            renderSemanticExercise();
        } else if (currentTab === 2) {
            renderYesNoExercise();
        } else if (currentTab === 3) {
            renderWordOrderExercise();
        }
    }

    updateTabStyles();
    renderActiveTab();
    container.appendChild(viewContainer);
}
