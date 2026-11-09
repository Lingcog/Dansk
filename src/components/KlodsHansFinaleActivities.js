import { klodsHansIndreLivData, klodsHansSpeeddatingData } from '../data/klods_hans_finale.js';

/**
 * KlodsHansFinaleActivities.js
 * Afslutningsaktiviteter efter vrimlebillederne i Klods-Hans:
 * 1. Karakterernes indre liv (Kortlægning med adjektiver, adverbier og idiomer)
 * 2. Speeddating-detektiven (Gæt den hemmelige karakter ud fra 10 faste spørgsmål - færrest mulige svar)
 */

export function renderKlodsHansFinaleActivities(container, options = {}) {
    const {
        isEn = false,
        speakDanish = (text) => {},
        initialTab = 'indre_liv',
        onJumpToQuiz = null
    } = options;

    container.innerHTML = '';

    let currentActivity = initialTab; // 'indre_liv' | 'speeddating'

    const rootWrapper = document.createElement('div');
    rootWrapper.className = 'kh-finale-root';

    // Top Navigation Tabs for the 2 activities
    const topNav = document.createElement('div');
    topNav.className = 'kh-finale-nav';
    topNav.innerHTML = `
        <button type="button" class="kh-finale-nav-btn ${currentActivity === 'indre_liv' ? 'active' : ''}" data-act="indre_liv">
            <span class="kh-act-icon">🎭</span>
            <span class="kh-act-title">${isEn ? '1. Inner Life of Characters' : '1. Karakterernes indre liv'}</span>
            <span class="kh-act-tag">${isEn ? 'Adjectives & Traits' : 'Adjektiver & Udtryk'}</span>
        </button>
        <button type="button" class="kh-finale-nav-btn ${currentActivity === 'speeddating' ? 'active' : ''}" data-act="speeddating">
            <span class="kh-act-icon">💬</span>
            <span class="kh-act-title">${isEn ? '2. Speed Dating Detective' : '2. Speeddating-detektiven'}</span>
            <span class="kh-act-tag">${isEn ? 'Mystery Suitor' : '20 spørgsmål'}</span>
        </button>
    `;
    rootWrapper.appendChild(topNav);

    const activityStage = document.createElement('div');
    activityStage.className = 'kh-activity-stage';
    rootWrapper.appendChild(activityStage);

    topNav.querySelectorAll('.kh-finale-nav-btn').forEach(btn => {
        btn.onclick = () => {
            currentActivity = btn.dataset.act;
            topNav.querySelectorAll('.kh-finale-nav-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.act === currentActivity);
            });
            renderActiveActivity();
        };
    });

    function renderActiveActivity() {
        activityStage.innerHTML = '';
        if (currentActivity === 'indre_liv') {
            renderIndreLivActivity(activityStage);
        } else {
            renderSpeeddatingActivity(activityStage);
        }
    }

    // =========================================================================
    // AKTIVITET 1: KARAKTERERNES INDRE LIV
    // =========================================================================
    function renderIndreLivActivity(targetEl) {
        const indreContainer = document.createElement('div');
        indreContainer.className = 'kh-indre-container';

        // State for placements
        // Map trait.id -> character.id
        const userPlacements = {};
        let selectedTrait = null;
        let lastFeedbackMessage = '';
        let feedbackIsError = false;

        // Collect all traits from all 4 characters
        const allTraits = [];
        klodsHansIndreLivData.characters.forEach(char => {
            char.traits.forEach(trait => {
                allTraits.push({
                    ...trait,
                    charId: char.id,
                    charName: char.name
                });
            });
        });

        // Shuffle traits for the unassigned pool
        const shuffledTraits = [...allTraits].sort(() => Math.random() - 0.5);

        // Header
        const header = document.createElement('div');
        header.className = 'kh-sec-header';
        header.innerHTML = `
            <div class="kh-badge-gold">${isEn ? 'Character Mapping · Adjectives & Traits' : 'Karakterkortlægning · Adjektiver & Personlighed'}</div>
            <h2>${isEn ? 'Map the Inner Life of the Characters' : 'Kortlæg karakterernes indre liv'}</h2>
            <p>${isEn 
                ? 'Who are the characters on the inside? Select an adjective or phrase from the pool below and assign it to the right person. Click the speaker to hear the word!'
                : 'Hvem er personerne inderst inde? Vælg et adjektiv, adverbium eller udtryk fra puljen forneden og placer det hos den rigtige person. Klik på højttaleren for at høre udtalen!'}</p>
        `;
        indreContainer.appendChild(header);

        // Progress bar & Score tracker
        const progressCard = document.createElement('div');
        progressCard.className = 'kh-progress-card';
        indreContainer.appendChild(progressCard);

        function updateProgress() {
            const placedCount = Object.keys(userPlacements).length;
            const totalCount = allTraits.length;
            const pct = Math.round((placedCount / totalCount) * 100);

            progressCard.innerHTML = `
                <div class="kh-prog-info">
                    <span>${isEn ? 'Traits placed:' : 'Egenskaber placeret:'} <strong>${placedCount} / ${totalCount}</strong> (${pct}%)</span>
                    <span class="kh-feedback-pill ${feedbackIsError ? 'error' : (placedCount === totalCount ? 'success' : '')}">${lastFeedbackMessage || (isEn ? 'Select a trait below, then click a person!' : 'Klik på en egenskab forneden, og klik derefter på en person!')}</span>
                </div>
                <div class="kh-prog-bar-bg">
                    <div class="kh-prog-bar-fill" style="width: ${pct}%"></div>
                </div>
            `;
        }

        // 4 Characters Grid
        const charsGrid = document.createElement('div');
        charsGrid.className = 'kh-chars-grid';

        const charCards = {};

        klodsHansIndreLivData.characters.forEach(char => {
            const card = document.createElement('div');
            card.className = 'kh-char-card';
            card.dataset.charId = char.id;
            card.style.setProperty('--char-color', char.themeColor);

            card.innerHTML = `
                <div class="kh-char-header">
                    <div class="kh-char-avatar">${char.avatarIcon}</div>
                    <div class="kh-char-titles">
                        <h3>${char.name}</h3>
                        <span class="kh-char-role">${char.role}</span>
                    </div>
                </div>
                <div class="kh-char-quote">${char.quote}</div>
                <div class="kh-char-slots-title">${isEn ? 'Inner traits & characteristics:' : 'Indre egenskaber & personlighedstræk:'}</div>
                <div class="kh-char-slots" id="slots-${char.id}"></div>
            `;

            // Click handler to assign currently selected trait
            card.onclick = () => {
                if (!selectedTrait) {
                    lastFeedbackMessage = isEn 
                        ? 'Select a word from the pool below first!' 
                        : 'Vælg et ord i puljen nedenunder først!';
                    feedbackIsError = false;
                    updateProgress();
                    return;
                }

                if (selectedTrait.charId === char.id) {
                    // Correct!
                    userPlacements[selectedTrait.id] = char.id;
                    lastFeedbackMessage = isEn 
                        ? `✓ Yes! ${selectedTrait.word} fits ${char.name} perfectly!` 
                        : `✓ Rigtigt! »${selectedTrait.word}« passer perfekt til ${char.name}!`;
                    feedbackIsError = false;
                    speakDanish(`${selectedTrait.word}. ${selectedTrait.adv}.`);
                    selectedTrait = null;
                    renderSlots();
                    renderPool();
                    updateProgress();
                    checkCompletion();
                } else {
                    // Incorrect - gentle feedback
                    feedbackIsError = true;
                    lastFeedbackMessage = isEn 
                        ? `Not quite. "${selectedTrait.word}" belongs to someone else in the fairy tale!` 
                        : `Ikke helt. »${selectedTrait.word}« passer bedre til en anden person i eventyret!`;
                    card.classList.add('shake-card');
                    setTimeout(() => card.classList.remove('shake-card'), 600);
                    updateProgress();
                }
            };

            charCards[char.id] = card;
            charsGrid.appendChild(card);
        });
        indreContainer.appendChild(charsGrid);

        // Render slots inside each char card
        function renderSlots() {
            klodsHansIndreLivData.characters.forEach(char => {
                const slotsEl = indreContainer.querySelector(`#slots-${char.id}`);
                if (!slotsEl) return;
                slotsEl.innerHTML = '';

                char.traits.forEach(trait => {
                    const isPlaced = userPlacements[trait.id] === char.id;
                    const slot = document.createElement('div');
                    slot.className = `kh-char-slot ${isPlaced ? 'filled' : 'empty'}`;

                    if (isPlaced) {
                        slot.innerHTML = `
                            <div class="kh-slot-content">
                                <span class="kh-slot-badge tag-${trait.type}">${trait.type.toUpperCase()}</span>
                                <strong class="kh-slot-word">${trait.word}</strong>
                                <span class="kh-slot-adv">(${trait.adv})</span>
                                <button type="button" class="kh-mini-speak-btn" title="Lyt">${renderSpeakerSvg()}</button>
                            </div>
                            <div class="kh-slot-hint">${isEn ? trait.hintEn : trait.hintDa}</div>
                        `;
                        slot.querySelector('.kh-mini-speak-btn').onclick = (e) => {
                            e.stopPropagation();
                            speakDanish(`${trait.word}. ${trait.adv}.`);
                        };
                    } else {
                        slot.innerHTML = `
                            <span class="kh-slot-placeholder">
                                <span>+</span> <span>${isEn ? 'Awaiting trait...' : 'Venter på egenskab...'}</span>
                            </span>
                        `;
                    }
                    slotsEl.appendChild(slot);
                });
            });
        }

        // Word Pool Card (Unassigned traits)
        const poolCard = document.createElement('div');
        poolCard.className = 'kh-pool-card';
        poolCard.innerHTML = `
            <div class="kh-pool-header">
                <h3>${isEn ? 'Word Pool: Select a trait to place' : 'Ordpulje: Vælg en egenskab til en af personerne'}</h3>
                <div class="kh-type-legend">
                    <span class="legend-pill tag-adj">Adjektiv (orange)</span>
                    <span class="legend-pill tag-idiom">Fast udtryk / Idiom (lilla)</span>
                    <span class="legend-pill tag-phrase">Frase (cyan)</span>
                </div>
            </div>
            <div class="kh-pool-chips" id="kh-pool-chips"></div>
        `;
        indreContainer.appendChild(poolCard);

        function renderPool() {
            const chipsHolder = indreContainer.querySelector('#kh-pool-chips');
            if (!chipsHolder) return;
            chipsHolder.innerHTML = '';

            const available = shuffledTraits.filter(t => !userPlacements[t.id]);

            if (available.length === 0) {
                chipsHolder.innerHTML = `
                    <div class="kh-pool-empty-banner">
                        <span>🎉</span>
                        <strong>${isEn ? 'All traits have been mapped to the characters!' : 'Alle egenskaber er placeret hos personerne!'}</strong>
                    </div>
                `;
                return;
            }

            available.forEach(t => {
                const chip = document.createElement('div');
                chip.className = `kh-trait-chip tag-${t.type} ${selectedTrait && selectedTrait.id === t.id ? 'selected' : ''}`;
                chip.innerHTML = `
                    <span class="kh-chip-type">${t.type}</span>
                    <strong class="kh-chip-word">${t.word}</strong>
                    <button type="button" class="kh-mini-speak-btn" title="Hør udtale">${renderSpeakerSvg()}</button>
                    <span class="kh-chip-info-btn" title="Hvad betyder det?">ℹ️</span>
                `;

                // Speak button
                chip.querySelector('.kh-mini-speak-btn').onclick = (e) => {
                    e.stopPropagation();
                    speakDanish(t.word);
                };

                // Info / tooltip
                chip.querySelector('.kh-chip-info-btn').onclick = (e) => {
                    e.stopPropagation();
                    showInfoModal(t);
                };

                // Select trait
                chip.onclick = () => {
                    if (selectedTrait && selectedTrait.id === t.id) {
                        selectedTrait = null;
                        lastFeedbackMessage = '';
                    } else {
                        selectedTrait = t;
                        lastFeedbackMessage = isEn 
                            ? `Selected: "${t.word}". Now click on the person it belongs to!` 
                            : `Valgt: »${t.word}«. Klik nu på den person, som ordet passer til!`;
                        speakDanish(t.word);
                    }
                    feedbackIsError = false;
                    renderPool();
                    updateProgress();
                };

                chipsHolder.appendChild(chip);
            });
        }

        // Info explanation modal
        function showInfoModal(trait) {
            const existing = document.getElementById('kh-trait-info-modal');
            if (existing) existing.remove();

            const modal = document.createElement('div');
            modal.id = 'kh-trait-info-modal';
            modal.className = 'kh-modal-backdrop';
            modal.innerHTML = `
                <div class="kh-modal-box">
                    <div class="kh-modal-badge tag-${trait.type}">${trait.type.toUpperCase()}</div>
                    <h3>${trait.word}</h3>
                    <div class="kh-modal-adv">Forstærkes ofte med adverbiet: <strong>»${trait.adv}«</strong></div>
                    <div class="kh-modal-body">
                        <p><strong>Betydning på dansk:</strong><br>${trait.hintDa}</p>
                        <p style="color:#94a3b8;"><strong>English explanation:</strong><br>${trait.hintEn}</p>
                    </div>
                    <div class="kh-modal-actions">
                        <button type="button" class="kh-btn-speak">${renderSpeakerSvg()} Lyt til udtale</button>
                        <button type="button" class="kh-btn-close">Luk</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('.kh-btn-speak').onclick = () => speakDanish(trait.word);
            modal.querySelector('.kh-btn-close').onclick = () => modal.remove();
            modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
        }

        // Completion banner
        function checkCompletion() {
            if (Object.keys(userPlacements).length === allTraits.length) {
                const completeCard = document.createElement('div');
                completeCard.className = 'kh-completion-celebration';
                completeCard.innerHTML = `
                    <div class="kh-celeb-badge">🏆 Opgave 1 Gennemført!</div>
                    <h3>Fantastisk! Karakterernes indre liv er fuldt kortlagt!</h3>
                    <p>Du har nu styr på alle de vigtige adjektiver, adverbier og udtryk om Klods-Hans, brødrene, prinsessen og faren.<br>Er du klar til at bruge din viden i <strong>Speeddating-detektiven</strong>?</p>
                    <button type="button" class="kh-next-activity-btn">
                        <span>Gå videre til Aktivitet 2: Speeddating-detektiven</span>
                        <span>➔</span>
                    </button>
                `;
                completeCard.querySelector('.kh-next-activity-btn').onclick = () => {
                    currentActivity = 'speeddating';
                    topNav.querySelectorAll('.kh-finale-nav-btn').forEach(b => {
                        b.classList.toggle('active', b.dataset.act === currentActivity);
                    });
                    renderActiveActivity();
                    window.scrollTo({ top: 220, behavior: 'smooth' });
                };
                indreContainer.appendChild(completeCard);
                completeCard.scrollIntoView({ behavior: 'smooth' });
            }
        }

        renderSlots();
        renderPool();
        updateProgress();

        targetEl.appendChild(indreContainer);
    }

    // =========================================================================
    // AKTIVITET 2: SPEEDDATING-DETEKTIVEN (20 SPØRGSMÅL)
    // =========================================================================
    function renderSpeeddatingActivity(targetEl) {
        const speedContainer = document.createElement('div');
        speedContainer.className = 'kh-speed-container';

        // State for speeddating game
        let currentRound = 0; // 0..3 (4 characters)
        const charQueue = [...klodsHansSpeeddatingData.characters].sort(() => Math.random() - 0.5);
        let activeMysteryChar = charQueue[currentRound];
        let score = 100;
        let askedQuestionIds = new Set();
        let dialogHistory = [];
        let isResolved = false;
        let penaltyCount = 0;

        // Header
        const header = document.createElement('div');
        header.className = 'kh-sec-header';
        header.innerHTML = `
            <div class="kh-badge-purple">${isEn ? 'Mystery Suitor · 20 Questions Game' : '20 spørgsmål til bejleren · Speeddating'}</div>
            <h2>${isEn ? 'The Speed Dating Detective' : 'Speeddating-detektiven: Hvem gemmer sig bag gardinet?'}</h2>
            <p>${isEn 
                ? 'A mystery character from the fairy tale has entered the great hall for speed dating! Ask sharp questions to reveal their identity. You score maximum points by guessing with the fewest questions possible!'
                : 'En hemmelig person fra eventyret er trådt ind i riddersalen til speeddating! Stil skarpe spørgsmål for at gennemskue personens identitet. Du får flest point ved at gætte rigtigt med færrest mulige spørgsmål!'}</p>
        `;
        speedContainer.appendChild(header);

        // Status Banner (Score, round, questions count)
        const statusBanner = document.createElement('div');
        statusBanner.className = 'kh-speed-status-banner';
        speedContainer.appendChild(statusBanner);

        function updateStatusBanner() {
            const medal = score >= 80 ? '🥇 Guld-kurs' : (score >= 60 ? '🥈 Sølv-kurs' : '🥉 Bronze-kurs');
            statusBanner.innerHTML = `
                <div class="kh-sb-item">
                    <span class="kh-sb-label">${isEn ? 'Round' : 'Runde'}:</span>
                    <strong class="kh-sb-val">${currentRound + 1} af ${charQueue.length}</strong>
                </div>
                <div class="kh-sb-item">
                    <span class="kh-sb-label">${isEn ? 'Points left:' : 'Point tilbage:'}</span>
                    <strong class="kh-sb-val score-val">${score}</strong>
                    <span class="kh-sb-pill">${medal}</span>
                </div>
                <div class="kh-sb-item">
                    <span class="kh-sb-label">${isEn ? 'Questions asked:' : 'Spørgsmål stillet:'}</span>
                    <strong class="kh-sb-val">${askedQuestionIds.size} / 10</strong>
                </div>
            `;
        }

        // Mystery Stage (Curtain / Silhouette + Chat history)
        const stageArea = document.createElement('div');
        stageArea.className = 'kh-speed-stage';

        // Left side: Silhouette Card
        const mysteryCard = document.createElement('div');
        mysteryCard.className = 'kh-mystery-card';
        stageArea.appendChild(mysteryCard);

        function updateMysteryCard() {
            if (isResolved) {
                mysteryCard.classList.add('revealed');
                mysteryCard.style.setProperty('--reveal-color', activeMysteryChar.themeColor);
                mysteryCard.innerHTML = `
                    <div class="kh-revealed-badge">✓ AFSLØRET!</div>
                    <div class="kh-revealed-avatar">${activeMysteryChar.avatarIcon}</div>
                    <h3 class="kh-revealed-name">${activeMysteryChar.name}</h3>
                    <div class="kh-revealed-title">${activeMysteryChar.title}</div>
                    <div class="kh-revealed-quote">${activeMysteryChar.revealQuote}</div>
                    <button type="button" class="kh-speak-reveal-btn">${renderSpeakerSvg()} Hør citat</button>
                `;
                mysteryCard.querySelector('.kh-speak-reveal-btn').onclick = () => {
                    speakDanish(activeMysteryChar.revealQuote);
                };
            } else {
                mysteryCard.classList.remove('revealed');
                mysteryCard.innerHTML = `
                    <div class="kh-curtain-top">🎭 Riddersalens Gardin</div>
                    <div class="kh-silhouette-box">
                        <div class="kh-silhouette-pulse">❓</div>
                    </div>
                    <div class="kh-silhouette-label">${isEn ? 'Mystery Character # ' : 'Hemmelig person #'}${currentRound + 1}</div>
                    <div class="kh-silhouette-hint">${isEn ? 'Ask questions below or guess identity now!' : 'Stil spørgsmål forneden eller gæt identiteten!'}</div>
                `;
            }
        }

        // Right side: Chat log
        const chatBox = document.createElement('div');
        chatBox.className = 'kh-chat-box';
        chatBox.innerHTML = `
            <div class="kh-chat-header">
                <span>💬 Samtalebog (Speeddating)</span>
                <span class="kh-chat-sub">Klik på et spørgsmål forneden for at høre svaret</span>
            </div>
            <div class="kh-chat-messages" id="kh-chat-messages">
                <div class="kh-chat-empty">${isEn ? 'No questions asked yet. Choose a question from the menu below!' : 'Ingen spørgsmål stillet endnu. Vælg et spørgsmål fra menuen nedenfor! (-10 point)'}</div>
            </div>
        `;
        stageArea.appendChild(chatBox);
        speedContainer.appendChild(stageArea);

        function addChatMessage(qText, aText) {
            const msgsEl = chatBox.querySelector('#kh-chat-messages');
            if (!msgsEl) return;

            const emptyEl = msgsEl.querySelector('.kh-chat-empty');
            if (emptyEl) emptyEl.remove();

            const msgGroup = document.createElement('div');
            msgGroup.className = 'kh-msg-group';
            msgGroup.innerHTML = `
                <div class="kh-msg-user">
                    <span class="msg-sender">👤 Dig:</span>
                    <span class="msg-text">»${qText}«</span>
                </div>
                <div class="kh-msg-suitor">
                    <span class="msg-sender">🎭 Hemmelig person:</span>
                    <span class="msg-text">»${aText}«</span>
                    <button type="button" class="kh-msg-speak" title="Lyt">${renderSpeakerSvg()}</button>
                </div>
            `;

            msgGroup.querySelector('.kh-msg-speak').onclick = () => {
                speakDanish(aText);
            };

            msgsEl.appendChild(msgGroup);
            msgsEl.scrollTop = msgsEl.scrollHeight;

            // Auto-speak the suitor's answer
            speakDanish(aText);
        }

        // Guess Modal / Selector Area
        const actionArea = document.createElement('div');
        actionArea.className = 'kh-speed-action-area';
        speedContainer.appendChild(actionArea);

        function renderActionArea() {
            actionArea.innerHTML = '';

            if (isResolved) {
                const nextRoundCard = document.createElement('div');
                nextRoundCard.className = 'kh-round-success-card';
                nextRoundCard.innerHTML = `
                    <div class="kh-success-header">
                        <span class="kh-big-star">⭐</span>
                        <div>
                            <h3>${isEn ? 'Well Done, Detective!' : 'Flot gættet, detektiv!'}</h3>
                            <p>${isEn 
                                ? `You solved the identity with ${score} points left after asking ${askedQuestionIds.size} questions!` 
                                : `Du fandt den hemmelige identitet og scorede <strong>${score} point</strong> med ${askedQuestionIds.size} spørgsmål stillet!`}</p>
                        </div>
                    </div>
                    <div class="kh-success-btns">
                        ${currentRound < charQueue.length - 1 ? `
                            <button type="button" class="kh-btn-next-round">
                                <span>${isEn ? 'Next Mystery Character (Round ' + (currentRound + 2) + ')' : 'Næste hemmelige karakter (Runde ' + (currentRound + 2) + ' af ' + charQueue.length + ')'}</span>
                                <span>➔</span>
                            </button>
                        ` : `
                            <button type="button" class="kh-btn-finish-all">
                                <span>🎉 ${isEn ? 'All Characters Solved! Go to Quiz' : 'Alle runder løst! Gå til forståelsesquizzen'}</span>
                                <span>➔</span>
                            </button>
                        `}
                    </div>
                `;

                const nextBtn = nextRoundCard.querySelector('.kh-btn-next-round');
                if (nextBtn) {
                    nextBtn.onclick = () => {
                        currentRound++;
                        activeMysteryChar = charQueue[currentRound];
                        score = 100;
                        askedQuestionIds = new Set();
                        dialogHistory = [];
                        isResolved = false;
                        penaltyCount = 0;
                        renderSpeeddatingActivity(targetEl);
                        window.scrollTo({ top: 220, behavior: 'smooth' });
                    };
                }

                const finishBtn = nextRoundCard.querySelector('.kh-btn-finish-all');
                if (finishBtn) {
                    finishBtn.onclick = () => {
                        if (onJumpToQuiz) {
                            onJumpToQuiz();
                        } else {
                            const quizEl = document.querySelector('.hc-quiz-card');
                            if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    };
                }

                actionArea.appendChild(nextRoundCard);
                return;
            }

            // Big Guess Button
            const guessPrompt = document.createElement('div');
            guessPrompt.className = 'kh-guess-prompt-box';
            guessPrompt.innerHTML = `
                <div class="kh-guess-prompt-text">
                    <strong>${isEn ? 'Think you know who is behind the curtain?' : 'Tror du, at du ved, hvem der gemmer sig bag gardinet?'}</strong>
                    <span>${isEn ? 'Guess right now and save your points!' : 'Gæt med det samme og få de maksimale point!'}</span>
                </div>
                <button type="button" class="kh-btn-trigger-guess">
                    <span>💡 ${isEn ? 'I want to guess the identity now!' : 'Jeg vil gætte identiteten nu!'} (${score} point)</span>
                </button>
            `;

            guessPrompt.querySelector('.kh-btn-trigger-guess').onclick = () => {
                showGuessModal();
            };
            actionArea.appendChild(guessPrompt);
        }

        // Guess Modal
        function showGuessModal() {
            const existing = document.getElementById('kh-guess-modal');
            if (existing) existing.remove();

            const modal = document.createElement('div');
            modal.id = 'kh-guess-modal';
            modal.className = 'kh-modal-backdrop';

            const modalBox = document.createElement('div');
            modalBox.className = 'kh-modal-box kh-guess-modal-box';
            modalBox.innerHTML = `
                <div class="kh-modal-badge">${isEn ? 'Final Guess' : 'Afgørende gæt'}</div>
                <h3>${isEn ? 'Who is hiding behind the curtain?' : 'Hvem gemmer sig bag gardinet?'}</h3>
                <p>${isEn 
                    ? 'Pick carefully! A wrong guess costs 20 penalty points.' 
                    : 'Vælg med omhu! Et forkert gæt koster 20 strafpoint, og du må stille flere spørgsmål.'}</p>
                
                <div class="kh-guess-cards-grid">
                    ${klodsHansSpeeddatingData.characters.map(c => `
                        <button type="button" class="kh-guess-card-btn" data-char-id="${c.id}" style="--btn-color: ${c.themeColor}">
                            <div class="guess-icon">${c.avatarIcon}</div>
                            <div class="guess-name">${c.name}</div>
                            <div class="guess-role">${c.title}</div>
                        </button>
                    `).join('')}
                </div>

                <div class="kh-modal-actions" style="margin-top: 1.5rem; justify-content: center;">
                    <button type="button" class="kh-btn-close">${isEn ? 'Cancel – I want to ask more questions' : 'Annuller – jeg vil stille flere spørgsmål'}</button>
                </div>
            `;

            modal.appendChild(modalBox);
            document.body.appendChild(modal);

            modal.querySelector('.kh-btn-close').onclick = () => modal.remove();

            modalBox.querySelectorAll('.kh-guess-card-btn').forEach(btn => {
                btn.onclick = () => {
                    const pickedId = btn.dataset.charId;
                    modal.remove();
                    evaluateGuess(pickedId);
                };
            });
        }

        function evaluateGuess(pickedId) {
            if (pickedId === activeMysteryChar.id) {
                // Correct!
                isResolved = true;
                updateStatusBanner();
                updateMysteryCard();
                renderActionArea();
                renderQuestionsGrid();
                speakDanish(`Korrekt! Det er ${activeMysteryChar.name}! ${activeMysteryChar.revealQuote}`);
            } else {
                // Incorrect penalty
                score = Math.max(10, score - 20);
                penaltyCount++;
                updateStatusBanner();

                const wrongBanner = document.createElement('div');
                wrongBanner.className = 'kh-wrong-guess-toast';
                wrongBanner.innerHTML = `
                    <span>❌</span>
                    <div>
                        <strong>${isEn ? 'Not quite right!' : 'Ikke helt rigtigt!'} (-20 point)</strong>
                        <div>${isEn ? 'This person would never answer like that. Ask another question and try again!' : 'Denne karakter ville aldrig give sådanne svar. Stil et nyt spørgsmål og prøv igen!'}</div>
                    </div>
                `;
                speedContainer.insertBefore(wrongBanner, actionArea);
                setTimeout(() => wrongBanner.remove(), 4000);
            }
        }

        // 10 Questions Menu Grid
        const qGridWrap = document.createElement('div');
        qGridWrap.className = 'kh-questions-wrap';
        speedContainer.appendChild(qGridWrap);

        function renderQuestionsGrid() {
            qGridWrap.innerHTML = `
                <div class="kh-q-header">
                    <h3>${isEn ? 'Question Menu (10 fixed questions)' : 'Spørgsmålsmenu (10 faste speeddating-spørgsmål)'}</h3>
                    <span class="kh-q-cost-note">${isEn ? 'Each question costs 10 points' : 'Hvert spørgsmål koster 10 point'}</span>
                </div>
                <div class="kh-q-grid" id="kh-q-grid"></div>
            `;

            const gridEl = qGridWrap.querySelector('#kh-q-grid');

            klodsHansSpeeddatingData.questions.forEach((q, idx) => {
                const isAsked = askedQuestionIds.has(q.id);
                const qBtn = document.createElement('button');
                qBtn.type = 'button';
                qBtn.className = `kh-question-btn ${isAsked ? 'asked' : ''} ${isResolved ? 'disabled' : ''}`;
                qBtn.disabled = isResolved || isAsked;

                qBtn.innerHTML = `
                    <div class="kh-qb-top">
                        <span class="kh-qb-num">#${idx + 1}</span>
                        <span class="kh-qb-cat">${q.icon} ${q.category}</span>
                        ${isAsked ? '<span class="kh-qb-asked-tag">✓ Stillet</span>' : '<span class="kh-qb-cost">-10 point</span>'}
                    </div>
                    <div class="kh-qb-text">»${q.text}«</div>
                `;

                qBtn.onclick = () => {
                    if (isAsked || isResolved) return;
                    askedQuestionIds.add(q.id);
                    score = Math.max(10, score - 10);
                    const answerText = activeMysteryChar.answers[q.id] || 'Det vil jeg ikke svare på!';
                    addChatMessage(q.text, answerText);
                    updateStatusBanner();
                    renderQuestionsGrid();
                };

                gridEl.appendChild(qBtn);
            });
        }

        updateStatusBanner();
        updateMysteryCard();
        renderActionArea();
        renderQuestionsGrid();

        targetEl.appendChild(speedContainer);
    }

    renderActiveActivity();
    container.appendChild(rootWrapper);

    injectFinaleStyles();
}

function renderSpeakerSvg() {
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
}

function injectFinaleStyles() {
    if (document.getElementById('kh-finale-styles')) return;

    const style = document.createElement('style');
    style.id = 'kh-finale-styles';
    style.textContent = `
        .kh-finale-root {
            margin: 2rem 0 3rem;
            color: #f8fafc;
        }

        /* Top Activity Nav */
        .kh-finale-nav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .kh-finale-nav-btn {
            background: rgba(15, 23, 42, 0.8);
            border: 2px solid rgba(148, 163, 184, 0.25);
            border-radius: 18px;
            padding: 1.1rem 1.4rem;
            color: #cbd5e1;
            cursor: pointer;
            text-align: left;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }
        .kh-finale-nav-btn:hover {
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .kh-finale-nav-btn.active {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border-color: #38bdf8;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.25), 0 6px 18px rgba(0, 0, 0, 0.4);
            color: #ffffff;
        }
        .kh-act-icon {
            font-size: 1.6rem;
            margin-bottom: 0.2rem;
        }
        .kh-act-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
        }
        .kh-act-tag {
            font-size: 0.82rem;
            font-weight: 700;
            color: #38bdf8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Section Header */
        .kh-sec-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .kh-badge-gold, .kh-badge-purple {
            display: inline-block;
            padding: 0.35rem 1rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            margin-bottom: 0.75rem;
        }
        .kh-badge-gold {
            background: rgba(234, 179, 8, 0.15);
            border: 1px solid rgba(234, 179, 8, 0.45);
            color: #fde047;
        }
        .kh-badge-purple {
            background: rgba(168, 85, 247, 0.15);
            border: 1px solid rgba(168, 85, 247, 0.45);
            color: #d8b4fe;
        }
        .kh-sec-header h2 {
            font-size: 1.85rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.6rem;
        }
        .kh-sec-header p {
            font-size: 1rem;
            color: #cbd5e1;
            max-width: 720px;
            margin: 0 auto;
            line-height: 1.55;
        }

        /* Progress Card */
        .kh-progress-card {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1rem 1.4rem;
            margin-bottom: 1.8rem;
        }
        .kh-prog-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.6rem;
            font-size: 0.92rem;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .kh-feedback-pill {
            font-size: 0.85rem;
            font-weight: 700;
            color: #94a3b8;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
        }
        .kh-feedback-pill.error {
            color: #f87171;
            background: rgba(239, 68, 68, 0.15);
        }
        .kh-feedback-pill.success {
            color: #4ade80;
            background: rgba(34, 197, 94, 0.15);
        }
        .kh-prog-bar-bg {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            height: 10px;
            overflow: hidden;
        }
        .kh-prog-bar-fill {
            background: linear-gradient(90deg, #38bdf8, #22c55e);
            height: 10px;
            transition: width 0.3s ease;
        }

        /* 4 Characters Grid */
        .kh-chars-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 1.4rem;
            margin-bottom: 2.2rem;
        }
        .kh-char-card {
            background: #1e293b;
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-top: 4px solid var(--char-color, #38bdf8);
            border-radius: 18px;
            padding: 1.4rem;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .kh-char-card:hover {
            border-color: var(--char-color, #38bdf8);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.08);
            transform: translateY(-3px);
        }
        .kh-char-card.shake-card {
            animation: khShake 0.5s ease;
            border-color: #ef4444 !important;
        }
        @keyframes khShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
        }
        .kh-char-header {
            display: flex;
            align-items: center;
            gap: 0.9rem;
            margin-bottom: 0.6rem;
        }
        .kh-char-avatar {
            font-size: 2.2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 1.5px solid var(--char-color, #38bdf8);
        }
        .kh-char-titles h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 800;
            color: #ffffff;
        }
        .kh-char-role {
            font-size: 0.85rem;
            color: var(--char-color, #38bdf8);
            font-weight: 700;
        }
        .kh-char-quote {
            font-style: italic;
            font-size: 0.88rem;
            color: #94a3b8;
            margin-bottom: 1rem;
            padding-left: 0.75rem;
            border-left: 2px solid var(--char-color, #38bdf8);
        }
        .kh-char-slots-title {
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #cbd5e1;
            margin-bottom: 0.6rem;
        }
        .kh-char-slots {
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
        }
        .kh-char-slot {
            border-radius: 12px;
            padding: 0.65rem 0.9rem;
            transition: all 0.2s ease;
        }
        .kh-char-slot.empty {
            background: rgba(15, 23, 42, 0.6);
            border: 1.5px dashed rgba(255, 255, 255, 0.16);
            color: #64748b;
            font-size: 0.85rem;
        }
        .kh-char-slot.filled {
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid var(--char-color, #38bdf8);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
        }
        .kh-slot-placeholder {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .kh-slot-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 0.25rem;
        }
        .kh-slot-word {
            color: #ffffff;
            font-size: 0.96rem;
            font-weight: 800;
        }
        .kh-slot-adv {
            color: var(--char-color, #38bdf8);
            font-size: 0.85rem;
            font-style: italic;
        }
        .kh-slot-hint {
            font-size: 0.8rem;
            color: #94a3b8;
            line-height: 1.35;
        }
        .kh-mini-speak-btn {
            background: none;
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 6px;
            color: #cbd5e1;
            padding: 0.2rem 0.4rem;
            cursor: pointer;
            margin-left: auto;
            transition: all 0.15s ease;
        }
        .kh-mini-speak-btn:hover {
            border-color: #38bdf8;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.1);
        }

        /* Tag colors */
        .tag-adj {
            background: rgba(249, 115, 22, 0.18);
            border: 1px solid rgba(249, 115, 22, 0.45);
            color: #fb923c;
        }
        .tag-idiom {
            background: rgba(168, 85, 247, 0.18);
            border: 1px solid rgba(168, 85, 247, 0.45);
            color: #c084fc;
        }
        .tag-phrase {
            background: rgba(56, 189, 248, 0.18);
            border: 1px solid rgba(56, 189, 248, 0.45);
            color: #38bdf8;
        }
        .kh-slot-badge {
            font-size: 0.68rem;
            font-weight: 800;
            padding: 0.12rem 0.4rem;
            border-radius: 6px;
        }

        /* Word Pool Card */
        .kh-pool-card {
            background: #0f172a;
            border: 2px solid rgba(255, 255, 255, 0.14);
            border-radius: 20px;
            padding: 1.6rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .kh-pool-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .kh-pool-header h3 {
            margin: 0;
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
        }
        .kh-type-legend {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .legend-pill {
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.2rem 0.55rem;
            border-radius: 12px;
        }
        .kh-pool-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            min-height: 80px;
        }
        .kh-trait-chip {
            padding: 0.6rem 0.95rem;
            border-radius: 14px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            user-select: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .kh-trait-chip:hover {
            transform: translateY(-2px);
            filter: brightness(1.15);
        }
        .kh-trait-chip.selected {
            outline: 2.5px solid #ffffff;
            box-shadow: 0 0 16px rgba(255, 255, 255, 0.4), 0 6px 14px rgba(0, 0, 0, 0.5);
            transform: scale(1.05);
        }
        .kh-chip-type {
            font-size: 0.68rem;
            font-weight: 800;
            text-transform: uppercase;
            opacity: 0.85;
        }
        .kh-chip-word {
            font-size: 0.95rem;
            font-weight: 800;
            color: #ffffff;
        }
        .kh-chip-info-btn {
            font-size: 0.82rem;
            opacity: 0.75;
            cursor: pointer;
        }
        .kh-chip-info-btn:hover {
            opacity: 1;
            transform: scale(1.2);
        }
        .kh-pool-empty-banner {
            width: 100%;
            text-align: center;
            padding: 1.5rem;
            color: #4ade80;
            font-size: 1.1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
        }

        /* Modal Dialog */
        .kh-modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.78);
            backdrop-filter: blur(6px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 1rem;
        }
        .kh-modal-box {
            background: #0f172a;
            border: 2px solid #38bdf8;
            border-radius: 20px;
            padding: 1.8rem;
            max-width: 460px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            color: #f8fafc;
        }
        .kh-modal-badge {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.2rem 0.6rem;
            border-radius: 10px;
            margin-bottom: 0.6rem;
        }
        .kh-modal-box h3 {
            margin: 0 0 0.4rem;
            font-size: 1.5rem;
            font-weight: 900;
            color: #ffffff;
        }
        .kh-modal-adv {
            font-size: 0.9rem;
            color: #38bdf8;
            margin-bottom: 1rem;
        }
        .kh-modal-body p {
            margin: 0 0 0.8rem;
            font-size: 0.92rem;
            line-height: 1.5;
        }
        .kh-modal-actions {
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            margin-top: 1.2rem;
        }
        .kh-btn-speak {
            background: rgba(56, 189, 248, 0.2);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
        }
        .kh-btn-close {
            background: #334155;
            border: none;
            color: #ffffff;
            padding: 0.55rem 1.1rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
        }

        /* Completion Celebration Card */
        .kh-completion-celebration {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 2px solid #22c55e;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            margin-top: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.2);
            animation: khFadeIn 0.4s ease;
        }
        @keyframes khFadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .kh-celeb-badge {
            display: inline-block;
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid #22c55e;
            color: #4ade80;
            font-weight: 800;
            padding: 0.35rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            margin-bottom: 0.8rem;
        }
        .kh-completion-celebration h3 {
            margin: 0 0 0.6rem;
            font-size: 1.6rem;
            font-weight: 900;
            color: #ffffff;
        }
        .kh-completion-celebration p {
            color: #cbd5e1;
            font-size: 1rem;
            max-width: 600px;
            margin: 0 auto 1.5rem;
            line-height: 1.55;
        }
        .kh-next-activity-btn {
            background: linear-gradient(135deg, #16a34a, #15803d);
            border: 1.5px solid #22c55e;
            color: #ffffff;
            padding: 0.9rem 1.8rem;
            border-radius: 14px;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            transition: all 0.2s ease;
        }
        .kh-next-activity-btn:hover {
            transform: scale(1.03);
            background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        /* ----------------------------------------------------
           SPEEDDATING AKTIVITET
           ---------------------------------------------------- */
        .kh-speed-container {
            animation: khFadeIn 0.3s ease;
        }
        .kh-speed-status-banner {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 0.9rem 1.4rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 1.8rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .kh-sb-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .kh-sb-label {
            font-size: 0.88rem;
            color: #94a3b8;
        }
        .kh-sb-val {
            font-size: 1.25rem;
            font-weight: 900;
            color: #ffffff;
        }
        .kh-sb-val.score-val {
            color: #fbbf24;
        }
        .kh-sb-pill {
            background: rgba(245, 158, 11, 0.18);
            border: 1px solid rgba(245, 158, 11, 0.45);
            color: #fbbf24;
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.15rem 0.55rem;
            border-radius: 12px;
        }

        /* Speed Stage (Mystery card left, chat right) */
        .kh-speed-stage {
            display: grid;
            grid-template-columns: 310px 1fr;
            gap: 1.4rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
            .kh-speed-stage {
                grid-template-columns: 1fr;
            }
        }

        /* Mystery Card */
        .kh-mystery-card {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 2px solid rgba(168, 85, 247, 0.5);
            border-radius: 20px;
            padding: 1.6rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            min-height: 290px;
        }
        .kh-curtain-top {
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #d8b4fe;
            margin-bottom: 0.8rem;
        }
        .kh-silhouette-box {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(168, 85, 247, 0.15);
            border: 2px dashed #a855f7;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.9rem;
        }
        .kh-silhouette-pulse {
            font-size: 2.8rem;
            animation: khPulse 2s infinite ease-in-out;
        }
        @keyframes khPulse {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.15); opacity: 1; }
        }
        .kh-silhouette-label {
            font-size: 1.1rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 0.35rem;
        }
        .kh-silhouette-hint {
            font-size: 0.82rem;
            color: #94a3b8;
        }

        /* Revealed card state */
        .kh-mystery-card.revealed {
            border-color: var(--reveal-color, #22c55e);
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.3);
        }
        .kh-revealed-badge {
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid #22c55e;
            color: #4ade80;
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.2rem 0.7rem;
            border-radius: 12px;
            margin-bottom: 0.6rem;
        }
        .kh-revealed-avatar {
            font-size: 3.2rem;
            margin-bottom: 0.4rem;
        }
        .kh-revealed-name {
            margin: 0;
            font-size: 1.45rem;
            font-weight: 900;
            color: #ffffff;
        }
        .kh-revealed-title {
            font-size: 0.88rem;
            color: var(--reveal-color, #22c55e);
            font-weight: 700;
            margin-bottom: 0.8rem;
        }
        .kh-revealed-quote {
            font-style: italic;
            font-size: 0.86rem;
            color: #cbd5e1;
            line-height: 1.45;
            background: rgba(0, 0, 0, 0.3);
            padding: 0.75rem;
            border-radius: 10px;
            margin-bottom: 0.8rem;
        }
        .kh-speak-reveal-btn {
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
        }

        /* Chat Box */
        .kh-chat-box {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            height: 330px;
        }
        .kh-chat-header {
            background: #1e293b;
            padding: 0.75rem 1.1rem;
            font-size: 0.88rem;
            font-weight: 800;
            color: #ffffff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .kh-chat-sub {
            font-size: 0.76rem;
            color: #94a3b8;
            font-weight: 500;
        }
        .kh-chat-messages {
            padding: 1rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex-grow: 1;
        }
        .kh-chat-empty {
            color: #64748b;
            font-size: 0.9rem;
            font-style: italic;
            margin: auto;
            text-align: center;
            max-width: 320px;
        }
        .kh-msg-group {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            animation: khFadeIn 0.25s ease;
        }
        .kh-msg-user {
            align-self: flex-end;
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: #ffffff;
            padding: 0.65rem 0.95rem;
            border-radius: 14px 14px 2px 14px;
            max-width: 85%;
            font-size: 0.92rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .kh-msg-suitor {
            align-self: flex-start;
            background: #1e293b;
            border: 1px solid rgba(168, 85, 247, 0.35);
            color: #f1f5f9;
            padding: 0.65rem 0.95rem;
            border-radius: 14px 14px 14px 2px;
            max-width: 90%;
            font-size: 0.92rem;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .msg-sender {
            font-size: 0.74rem;
            font-weight: 800;
            opacity: 0.75;
            text-transform: uppercase;
        }
        .kh-msg-speak {
            background: none;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            color: #cbd5e1;
            padding: 0.15rem 0.4rem;
            cursor: pointer;
            align-self: flex-end;
            font-size: 0.78rem;
        }
        .kh-msg-speak:hover {
            border-color: #38bdf8;
            color: #38bdf8;
        }

        /* Guess Prompt Box */
        .kh-guess-prompt-box {
            background: linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(15, 23, 42, 0.95));
            border: 2px solid #eab308;
            border-radius: 18px;
            padding: 1.2rem 1.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 2rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .kh-guess-prompt-text {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }
        .kh-guess-prompt-text strong {
            font-size: 1.05rem;
            color: #fef08a;
        }
        .kh-guess-prompt-text span {
            font-size: 0.88rem;
            color: #cbd5e1;
        }
        .kh-btn-trigger-guess {
            background: linear-gradient(135deg, #eab308, #ca8a04);
            border: none;
            color: #0f172a;
            padding: 0.85rem 1.4rem;
            border-radius: 12px;
            font-size: 0.98rem;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(234, 179, 8, 0.4);
            transition: all 0.2s ease;
        }
        .kh-btn-trigger-guess:hover {
            transform: scale(1.03);
            background: linear-gradient(135deg, #facc15, #eab308);
        }

        /* Guess Modal Cards Grid */
        .kh-guess-modal-box {
            max-width: 620px;
        }
        .kh-guess-cards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 1rem;
        }
        @media (max-width: 520px) {
            .kh-guess-cards-grid {
                grid-template-columns: 1fr;
            }
        }
        .kh-guess-card-btn {
            background: #1e293b;
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-top: 3px solid var(--btn-color, #38bdf8);
            border-radius: 16px;
            padding: 1.2rem;
            cursor: pointer;
            text-align: center;
            color: #ffffff;
            transition: all 0.2s ease;
        }
        .kh-guess-card-btn:hover {
            border-color: var(--btn-color, #38bdf8);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
            background: #27354a;
        }
        .guess-icon {
            font-size: 2.2rem;
            margin-bottom: 0.4rem;
        }
        .guess-name {
            font-size: 1.15rem;
            font-weight: 800;
            margin-bottom: 0.2rem;
        }
        .guess-role {
            font-size: 0.8rem;
            color: #94a3b8;
        }

        /* Wrong Guess Toast */
        .kh-wrong-guess-toast {
            background: rgba(239, 68, 68, 0.2);
            border: 1.5px solid #ef4444;
            border-radius: 12px;
            padding: 0.9rem 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: #fca5a5;
            margin-bottom: 1.5rem;
            animation: khFadeIn 0.3s ease;
        }

        /* Round Success Card */
        .kh-round-success-card {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 2px solid #22c55e;
            border-radius: 18px;
            padding: 1.4rem 1.8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            margin-bottom: 2rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }
        .kh-success-header {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .kh-big-star {
            font-size: 2.5rem;
        }
        .kh-success-header h3 {
            margin: 0 0 0.3rem;
            font-size: 1.35rem;
            color: #ffffff;
            font-weight: 900;
        }
        .kh-success-header p {
            margin: 0;
            font-size: 0.92rem;
            color: #cbd5e1;
        }
        .kh-btn-next-round, .kh-btn-finish-all {
            background: linear-gradient(135deg, #16a34a, #15803d);
            border: 1.5px solid #22c55e;
            color: #ffffff;
            padding: 0.85rem 1.5rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
            transition: all 0.2s ease;
        }
        .kh-btn-next-round:hover, .kh-btn-finish-all:hover {
            transform: scale(1.03);
            background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        /* 10 Questions Grid */
        .kh-questions-wrap {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 1.5rem;
        }
        .kh-q-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .kh-q-header h3 {
            margin: 0;
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
        }
        .kh-q-cost-note {
            font-size: 0.8rem;
            font-weight: 700;
            color: #f59e0b;
        }
        .kh-q-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 0.9rem;
        }
        .kh-question-btn {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 0.85rem 1rem;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }
        .kh-question-btn:hover:not(:disabled) {
            border-color: #38bdf8;
            transform: translateY(-2px);
            background: #27354a;
        }
        .kh-question-btn.asked {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: rgba(255, 255, 255, 0.05);
            background: rgba(15, 23, 42, 0.7);
        }
        .kh-qb-top {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.78rem;
        }
        .kh-qb-num {
            font-weight: 800;
            color: #38bdf8;
        }
        .kh-qb-cat {
            color: #94a3b8;
            font-weight: 600;
        }
        .kh-qb-cost {
            margin-left: auto;
            color: #fbbf24;
            font-weight: 800;
            font-size: 0.75rem;
        }
        .kh-qb-asked-tag {
            margin-left: auto;
            color: #4ade80;
            font-weight: 800;
            font-size: 0.75rem;
        }
        .kh-qb-text {
            color: #ffffff;
            font-size: 0.92rem;
            font-weight: 700;
            line-height: 1.4;
        }

        @media (max-width: 640px) {
            .kh-finale-nav {
                grid-template-columns: 1fr;
            }
            .kh-chars-grid {
                grid-template-columns: 1fr;
            }
            .kh-sec-header h2 {
                font-size: 1.5rem;
            }
            .kh-q-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}
