import { getTranslation } from '../utils/i18n.js';
import {
    targetTrainingTracks,
    getTrackMastery,
    markSubtaskMastered,
    isTrackFullyMastered,
    getFirstUnmasteredTab
} from '../utils/target_training_data.js';
import { baseUrl } from '../utils/config.js';

export function renderTraenSporgsmalTrackView(container, navigateFn, extraData = {}) {
    const trackId = extraData.trackId || extraData.track || extraData.subPath || 'anna';
    const initialTab = parseInt(extraData.initialTab || extraData.tab || '1', 10);
    const fromLockedStory = Boolean(extraData.fromLockedStory);

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

    // In-memory completion state for this session (resets on re-entering the task)
    const completedTabs = new Set();

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
        navigateFn(fromLockedStory ? 'lav_sporgsmal' : 'traen_sporgsmal_menu');
    };
    topBar.appendChild(backBtn);

    viewContainer.appendChild(topBar);

    // Header
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '1.5rem';

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

    // Prerequisite Banner if redirected from a locked story on "Lav spørgsmål"
    if (fromLockedStory || !isTrackFullyMastered(track.id)) {
        const lockBanner = document.createElement('div');
        const fullyMastered = isTrackFullyMastered(track.id);
        lockBanner.style.background = fullyMastered ? 'rgba(76, 175, 80, 0.14)' : 'rgba(255, 152, 0, 0.14)';
        lockBanner.style.border = fullyMastered ? '1px solid rgba(76, 175, 80, 0.45)' : '1px solid rgba(255, 152, 0, 0.45)';
        lockBanner.style.color = fullyMastered ? '#81c784' : '#ffb74d';
        lockBanner.style.padding = '0.85rem 1.15rem';
        lockBanner.style.borderRadius = '12px';
        lockBanner.style.marginBottom = '1.5rem';
        lockBanner.style.fontSize = '0.96rem';
        lockBanner.style.lineHeight = '1.45';
        lockBanner.style.textAlign = 'center';
        const trackName = t(track.titleKey, track.defaultTitle);
        lockBanner.innerHTML = t(
            'traen_locked_banner',
            '🔒 Gennemfør alle 3 øvelser her med <strong>100% rigtige svar</strong> for at låse op for <strong>{track}</strong> på siden "Lav spørgsmål".'
        ).replace('{track}', trackName);
        viewContainer.appendChild(lockBanner);
    }

    // Tabs navigation
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'track-tabs-nav';
    tabsContainer.style.display = 'grid';
    tabsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    tabsContainer.style.gap = '0.75rem';
    tabsContainer.style.marginBottom = '2rem';

    const tabs = [
        { id: 1, labelKey: 'traen_tab_semantic', defaultLabel: '1. Hv-ord', icon: '🎯' },
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

        btn.onclick = () => {
            clearActiveTimer();
            currentTab = tabInfo.id;
            updateTabStyles();
            renderActiveTab();
        };

        tabsContainer.appendChild(btn);
        tabButtons.push({ btn, tabInfo });
    });

    viewContainer.appendChild(tabsContainer);
    viewContainer.appendChild(exerciseContainer);

    function updateTabStyles() {
        const masteredSet = getTrackMastery(track.id);
        tabButtons.forEach(({ btn, tabInfo }) => {
            const isCompleted = masteredSet.has(tabInfo.id) || completedTabs.has(tabInfo.id);
            const statusIcon = isCompleted ? '✓ ' : '';

            btn.innerHTML = `${tabInfo.icon} <span class="tab-label-text">${statusIcon}${t(tabInfo.labelKey, tabInfo.defaultLabel)}</span>`;

            if (tabInfo.id === currentTab) {
                btn.style.background = 'var(--accent-color, #4a90e2)';
                btn.style.borderColor = '#ffffff';
                btn.style.color = '#ffffff';
                btn.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.4)';
            } else {
                btn.style.background = isCompleted ? 'rgba(76, 175, 80, 0.14)' : 'var(--card-bg, rgba(255,255,255,0.08))';
                btn.style.borderColor = isCompleted ? 'rgba(76, 175, 80, 0.45)' : 'rgba(255,255,255,0.1)';
                btn.style.color = isCompleted ? '#81c784' : 'var(--text-muted, #ccc)';
                btn.style.boxShadow = 'none';
            }
        });
    }

    // -------------------------------------------------------------
    // RETRY SCREEN: UNDER 100% GENNEMFØRSEL
    // -------------------------------------------------------------
    function renderSubTaskRetryCard({ correctCount, totalCount, nextTab, nextTabLabel, onRestart }) {
        exerciseContainer.innerHTML = '';
        const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

        const card = document.createElement('div');
        card.style.background = 'var(--card-bg, rgba(255,255,255,0.05))';
        card.style.padding = '2.5rem 1.5rem';
        card.style.borderRadius = '16px';
        card.style.textAlign = 'center';
        card.style.border = '1px solid rgba(255, 152, 0, 0.45)';
        card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';

        const iconEl = document.createElement('div');
        iconEl.textContent = '🎯';
        iconEl.style.fontSize = '3.5rem';
        iconEl.style.marginBottom = '0.75rem';

        const msgTitle = document.createElement('h2');
        msgTitle.innerHTML = t('traen_retry_title', 'Du fik {correct} ud af {total} rigtige ({pct}%)')
            .replace('{correct}', correctCount)
            .replace('{total}', totalCount)
            .replace('{pct}', pct);
        msgTitle.style.fontSize = '1.45rem';
        msgTitle.style.marginBottom = '0.85rem';
        msgTitle.style.color = '#ffb74d';

        const msgDesc = document.createElement('p');
        const trackName = t(track.titleKey, track.defaultTitle);
        msgDesc.innerHTML = t(
            'traen_retry_desc',
            'Du skal have <strong>100% rigtige svar</strong> (fejlfrit i ét gennemløb) i denne delopgave for at optjene pokalen 🏆 og låse op for <strong>{track}</strong> på siden "Lav spørgsmål".'
        ).replace('{track}', trackName);
        msgDesc.style.fontSize = '1.05rem';
        msgDesc.style.color = 'rgba(255,255,255,0.9)';
        msgDesc.style.lineHeight = '1.5';
        msgDesc.style.maxWidth = '560px';
        msgDesc.style.margin = '0 auto 1.75rem auto';

        const btnGroup = document.createElement('div');
        btnGroup.style.display = 'flex';
        btnGroup.style.justifyContent = 'center';
        btnGroup.style.gap = '1rem';
        btnGroup.style.flexWrap = 'wrap';

        const restartBtn = document.createElement('button');
        restartBtn.className = 'primary-btn';
        restartBtn.style.background = '#ff9800';
        restartBtn.style.color = '#ffffff';
        restartBtn.style.fontWeight = '700';
        restartBtn.innerHTML = `↻ ${t('traen_btn_retry_100', 'Prøv igen (opnå 100%)')}`;
        restartBtn.onclick = onRestart;

        btnGroup.appendChild(restartBtn);

        if (nextTab) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'primary-btn';
            nextBtn.style.background = 'rgba(255,255,255,0.12)';
            nextBtn.style.border = '1px solid rgba(255,255,255,0.25)';
            nextBtn.innerHTML = `${nextTabLabel}`;
            nextBtn.onclick = () => {
                clearActiveTimer();
                currentTab = nextTab;
                updateTabStyles();
                renderActiveTab();
            };
            btnGroup.appendChild(nextBtn);
        }

        card.appendChild(iconEl);
        card.appendChild(msgTitle);
        card.appendChild(msgDesc);
        card.appendChild(btnGroup);
        exerciseContainer.appendChild(card);
    }

    // -------------------------------------------------------------
    // SUCCESS SCREEN: DELOPGAVE POKAL
    // -------------------------------------------------------------
    function renderSubTaskDoneCard({ message, nextTab, nextTabLabel, onRestart }) {
        exerciseContainer.innerHTML = '';

        const card = document.createElement('div');
        card.style.background = 'var(--card-bg, rgba(255,255,255,0.05))';
        card.style.padding = '2.5rem 1.5rem';
        card.style.borderRadius = '16px';
        card.style.textAlign = 'center';
        card.style.border = '1px solid rgba(76, 175, 80, 0.45)';
        card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';

        const trophy = document.createElement('div');
        trophy.textContent = '🏆';
        trophy.style.fontSize = '3.5rem';
        trophy.style.marginBottom = '0.75rem';

        const msgTitle = document.createElement('h2');
        msgTitle.innerHTML = message;
        msgTitle.style.fontSize = '1.45rem';
        msgTitle.style.marginBottom = '0.6rem';
        msgTitle.style.color = '#ffffff';

        const masteryCount = getTrackMastery(track.id).size;
        const progressNote = document.createElement('p');
        progressNote.style.fontSize = '1rem';
        progressNote.style.color = '#81c784';
        progressNote.style.marginBottom = '1.75rem';
        progressNote.textContent = `${t('traen_subtask_100_badge', '✓ 100% fejlfrit gennemført')} (${masteryCount}/3)`;

        const btnGroup = document.createElement('div');
        btnGroup.style.display = 'flex';
        btnGroup.style.justifyContent = 'center';
        btnGroup.style.gap = '1rem';
        btnGroup.style.flexWrap = 'wrap';

        const restartBtn = document.createElement('button');
        restartBtn.className = 'primary-btn';
        restartBtn.style.background = 'rgba(255,255,255,0.12)';
        restartBtn.style.border = '1px solid rgba(255,255,255,0.25)';
        restartBtn.innerHTML = `↻ ${t('traen_btn_restart', 'Prøv igen')}`;
        restartBtn.onclick = onRestart;

        btnGroup.appendChild(restartBtn);

        if (nextTab) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'primary-btn';
            nextBtn.style.background = '#4caf50';
            nextBtn.innerHTML = `${nextTabLabel}`;
            nextBtn.onclick = () => {
                clearActiveTimer();
                currentTab = nextTab;
                updateTabStyles();
                renderActiveTab();
            };
            btnGroup.appendChild(nextBtn);
        } else {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'primary-btn';
            menuBtn.style.background = 'var(--accent-color, #4a90e2)';
            menuBtn.innerHTML = `← ${t('traen_btn_back_to_menu', 'Tilbage til menuen')}`;
            menuBtn.onclick = () => {
                clearActiveTimer();
                navigateFn('traen_sporgsmal_menu');
            };
            btnGroup.appendChild(menuBtn);
        }

        card.appendChild(trophy);
        card.appendChild(msgTitle);
        card.appendChild(progressNote);
        card.appendChild(btnGroup);
        exerciseContainer.appendChild(card);
    }

    // -------------------------------------------------------------
    // SUCCESS SCREEN: HELE FLADEN GENNEMFØRT POKAL
    // -------------------------------------------------------------
    function renderGrandTrackDoneCard() {
        exerciseContainer.innerHTML = '';

        const card = document.createElement('div');
        card.style.background = 'linear-gradient(145deg, rgba(255, 215, 0, 0.12), rgba(255, 255, 255, 0.05))';
        card.style.padding = '3rem 1.5rem';
        card.style.borderRadius = '18px';
        card.style.textAlign = 'center';
        card.style.border = '2px solid rgba(255, 215, 0, 0.4)';
        card.style.boxShadow = '0 12px 40px rgba(255, 215, 0, 0.2)';

        const trophy = document.createElement('div');
        trophy.textContent = '🏆';
        trophy.style.fontSize = '4.5rem';
        trophy.style.marginBottom = '0.5rem';

        const grandTitle = document.createElement('h2');
        grandTitle.textContent = t('traen_track_done_title', '🏆 Kæmpe tillykke! Banen er gennemført!');
        grandTitle.style.fontSize = '1.8rem';
        grandTitle.style.color = '#ffd700';
        grandTitle.style.marginBottom = '0.75rem';

        const grandDesc = document.createElement('p');
        const trackName = t(track.titleKey, track.defaultTitle);
        grandDesc.textContent = t('traen_track_done_desc', 'Du har gennemført alle 3 opgaver i {track} med 100%: Hv-ord, ja/nej-spørgsmål og ordstilling. "{track}" er nu låst op på siden "Lav spørgsmål"!').replace(/\{track\}/g, trackName);
        grandDesc.style.fontSize = '1.15rem';
        grandDesc.style.color = '#ffffff';
        grandDesc.style.opacity = '0.95';
        grandDesc.style.lineHeight = '1.5';
        grandDesc.style.marginBottom = '2rem';

        const btnGroup = document.createElement('div');
        btnGroup.style.display = 'flex';
        btnGroup.style.justifyContent = 'center';
        btnGroup.style.gap = '1rem';
        btnGroup.style.flexWrap = 'wrap';

        const openStoryBtn = document.createElement('button');
        openStoryBtn.className = 'primary-btn';
        openStoryBtn.style.background = '#4caf50';
        openStoryBtn.style.border = '2px solid #81c784';
        openStoryBtn.style.fontSize = '1.08rem';
        openStoryBtn.style.fontWeight = '700';
        openStoryBtn.style.padding = '0.85rem 1.5rem';
        openStoryBtn.innerHTML = `🔓 ${t('traen_btn_open_story', 'Start "{track}" i Lav spørgsmål →').replace('{track}', trackName)}`;
        openStoryBtn.onclick = () => {
            clearActiveTimer();
            navigateFn('sporgsmal_interactive', { storyId: track.id });
        };

        const restartTrackBtn = document.createElement('button');
        restartTrackBtn.className = 'primary-btn';
        restartTrackBtn.style.background = 'rgba(255,255,255,0.15)';
        restartTrackBtn.style.border = '2px solid rgba(255,255,255,0.3)';
        restartTrackBtn.style.fontSize = '1.05rem';
        restartTrackBtn.style.padding = '0.85rem 1.4rem';
        restartTrackBtn.innerHTML = `↻ ${t('traen_btn_restart_track', 'Prøv banen igen')}`;
        restartTrackBtn.onclick = () => {
            clearActiveTimer();
            completedTabs.clear();
            currentTab = 1;
            updateTabStyles();
            renderActiveTab();
        };

        const menuBtn = document.createElement('button');
        menuBtn.className = 'primary-btn';
        menuBtn.style.background = 'var(--accent-color, #4a90e2)';
        menuBtn.style.fontSize = '1.05rem';
        menuBtn.style.padding = '0.85rem 1.4rem';
        menuBtn.innerHTML = `← ${t('traen_btn_back_to_menu', 'Tilbage til menuen')}`;
        menuBtn.onclick = () => {
            clearActiveTimer();
            navigateFn('traen_sporgsmal_menu');
        };

        btnGroup.appendChild(openStoryBtn);
        btnGroup.appendChild(restartTrackBtn);
        btnGroup.appendChild(menuBtn);

        card.appendChild(trophy);
        card.appendChild(grandTitle);
        card.appendChild(grandDesc);
        card.appendChild(btnGroup);
        exerciseContainer.appendChild(card);
    }

    // -------------------------------------------------------------
    // EXERCISE 1: HV-ORD
    // -------------------------------------------------------------
    function renderHvWordsExercise() {
        clearActiveTimer();
        exerciseContainer.innerHTML = '';
        const questions = track.semantic || [];
        let curIdx = 0;
        let correctCount = 0;

        function showQ() {
            clearActiveTimer();
            if (currentTab !== 1) return;
            exerciseContainer.innerHTML = '';

            if (curIdx >= questions.length) {
                const is100Pct = questions.length > 0 && correctCount === questions.length;
                if (is100Pct) {
                    completedTabs.add(1);
                    markSubtaskMastered(track.id, 1);
                    updateTabStyles();

                    if (isTrackFullyMastered(track.id)) {
                        renderGrandTrackDoneCard();
                    } else {
                        renderSubTaskDoneCard({
                            message: t('traen_done_hv', '🏆 Flot klaret! Du har gennemført Hv-ord.'),
                            nextTab: 2,
                            nextTabLabel: `${t('traen_btn_next_to_yesno', 'Videre til Ja/Nej-spørgsmål →')}`,
                            onRestart: () => { curIdx = 0; correctCount = 0; showQ(); }
                        });
                    }
                } else {
                    renderSubTaskRetryCard({
                        correctCount,
                        totalCount: questions.length,
                        nextTab: 2,
                        nextTabLabel: `${t('traen_btn_next_to_yesno', 'Videre til Ja/Nej-spørgsmål →')}`,
                        onRestart: () => { curIdx = 0; correctCount = 0; showQ(); }
                    });
                }
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
            badge.textContent = t('traen_badge_semantic', 'Hv-ord');

            progress.appendChild(progressText);
            progress.appendChild(badge);
            exerciseContainer.appendChild(progress);

            // Illustration
            if (q.image) {
                const imgBox = document.createElement('div');
                imgBox.className = 'thematic-image-container';
                imgBox.style.textAlign = 'center';
                imgBox.style.marginBottom = '1.25rem';

                const img = document.createElement('img');
                img.src = q.image.startsWith('http') || q.image.startsWith(baseUrl)
                    ? q.image
                    : `${baseUrl}${q.image.replace(/^\//, '')}`;
                img.alt = t(q.situationKey, q.situationFallback);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '230px';
                img.style.borderRadius = '14px';
                img.style.boxShadow = '0 6px 18px rgba(0,0,0,0.35)';
                img.style.objectFit = 'cover';
                imgBox.appendChild(img);
                exerciseContainer.appendChild(imgBox);
            }

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
                        correctCount++;
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
        let correctCount = 0;

        function showQ() {
            clearActiveTimer();
            if (currentTab !== 2) return;
            exerciseContainer.innerHTML = '';

            if (curIdx >= questions.length) {
                const is100Pct = questions.length > 0 && correctCount === questions.length;
                if (is100Pct) {
                    completedTabs.add(2);
                    markSubtaskMastered(track.id, 2);
                    updateTabStyles();

                    if (isTrackFullyMastered(track.id)) {
                        renderGrandTrackDoneCard();
                    } else {
                        renderSubTaskDoneCard({
                            message: t('traen_done_yesno', '🏆 Flot klaret! Du har gennemført Ja/Nej-spørgsmål.'),
                            nextTab: 3,
                            nextTabLabel: `${t('traen_btn_next_to_wordorder', 'Videre til Ordstilling →')}`,
                            onRestart: () => { curIdx = 0; correctCount = 0; showQ(); }
                        });
                    }
                } else {
                    renderSubTaskRetryCard({
                        correctCount,
                        totalCount: questions.length,
                        nextTab: 3,
                        nextTabLabel: `${t('traen_btn_next_to_wordorder', 'Videre til Ordstilling →')}`,
                        onRestart: () => { curIdx = 0; correctCount = 0; showQ(); }
                    });
                }
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

            // Illustration
            if (q.image) {
                const imgBox = document.createElement('div');
                imgBox.className = 'thematic-image-container';
                imgBox.style.textAlign = 'center';
                imgBox.style.marginBottom = '1.25rem';

                const img = document.createElement('img');
                img.src = q.image.startsWith('http') || q.image.startsWith(baseUrl)
                    ? q.image
                    : `${baseUrl}${q.image.replace(/^\//, '')}`;
                img.alt = t(q.situationKey, q.situationFallback);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '230px';
                img.style.borderRadius = '14px';
                img.style.boxShadow = '0 6px 18px rgba(0,0,0,0.35)';
                img.style.objectFit = 'cover';
                imgBox.appendChild(img);
                exerciseContainer.appendChild(imgBox);
            }

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
                        correctCount++;
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
        let correctCount = 0;

        function showPuzzle() {
            clearActiveTimer();
            if (currentTab !== 3) return;
            exerciseContainer.innerHTML = '';

            if (curIdx >= sentences.length) {
                const is100Pct = sentences.length > 0 && correctCount === sentences.length;
                if (is100Pct) {
                    completedTabs.add(3);
                    markSubtaskMastered(track.id, 3);
                    updateTabStyles();

                    if (isTrackFullyMastered(track.id)) {
                        renderGrandTrackDoneCard();
                    } else {
                        renderSubTaskDoneCard({
                            message: t('traen_done_wordorder', '🏆 Flot klaret! Du har bygget alle spørgsmålene i korrekt ordstilling.'),
                            nextTab: getFirstUnmasteredTab(track.id),
                            nextTabLabel: `${t('traen_btn_next_to_hv', 'Videre til Hv-ord →')}`,
                            onRestart: () => { curIdx = 0; correctCount = 0; showPuzzle(); }
                        });
                    }
                } else {
                    renderSubTaskRetryCard({
                        correctCount,
                        totalCount: sentences.length,
                        nextTab: getFirstUnmasteredTab(track.id),
                        nextTabLabel: `${t('traen_btn_next_to_hv', 'Videre til Hv-ord →')}`,
                        onRestart: () => { curIdx = 0; correctCount = 0; showPuzzle(); }
                    });
                }
                return;
            }

            let hadErrorOnPuzzle = false;
            let scoredCurrentPuzzle = false;
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

            // Illustration & situation context
            const sitIdx = Math.floor(curIdx / 2);
            const sit = track.semantic ? track.semantic[sitIdx] : null;
            const imagePath = sit?.image || (track.images ? track.images[sitIdx] : null);

            if (imagePath) {
                const imgBox = document.createElement('div');
                imgBox.className = 'thematic-image-container';
                imgBox.style.textAlign = 'center';
                imgBox.style.marginBottom = '1.25rem';

                const img = document.createElement('img');
                img.src = imagePath.startsWith('http') || imagePath.startsWith(baseUrl)
                    ? imagePath
                    : `${baseUrl}${imagePath.replace(/^\//, '')}`;
                img.alt = sit ? t(sit.situationKey, sit.situationFallback) : '';
                img.style.maxWidth = '100%';
                img.style.maxHeight = '230px';
                img.style.borderRadius = '14px';
                img.style.boxShadow = '0 6px 18px rgba(0,0,0,0.35)';
                img.style.objectFit = 'cover';
                imgBox.appendChild(img);
                exerciseContainer.appendChild(imgBox);
            }

            if (sit) {
                const sitBox = document.createElement('div');
                sitBox.style.background = 'rgba(255,255,255,0.04)';
                sitBox.style.border = '1px solid rgba(255,255,255,0.08)';
                sitBox.style.padding = '0.85rem 1.25rem';
                sitBox.style.borderRadius = '10px';
                sitBox.style.marginBottom = '1.25rem';
                sitBox.style.fontSize = '1.05rem';
                sitBox.style.lineHeight = '1.4';
                sitBox.textContent = t(sit.situationKey, sit.situationFallback);
                exerciseContainer.appendChild(sitBox);
            }

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
                        if (!hadErrorOnPuzzle && !scoredCurrentPuzzle) {
                            correctCount++;
                            scoredCurrentPuzzle = true;
                        }
                        feedback.textContent = `✓ ${t('traen_wordorder_success', 'Korrekt ordstilling! Godt gået.')}`;
                        feedback.style.color = '#4caf50';
                        resultArea.style.borderColor = '#4caf50';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        hadErrorOnPuzzle = true;
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
            renderHvWordsExercise();
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
