import { navigate } from '../main.js';
import { getTranslation } from '../utils/i18n.js';
import { createGrammarToggle } from '../utils/grammarToggle.js';

export function renderOrdstillingIntroView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('ordstilling');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Title
    const title = document.createElement('h1');
    title.textContent = getTranslation("ordstilling_intro_title") || "Introduktion - start her";
    viewContainer.appendChild(title);

    // Grammar Terms Toggle
    const grammarToggle = createGrammarToggle(viewContainer);
    viewContainer.appendChild(grammarToggle);

    // Grammar System Banner
    const grammarBanner = document.createElement('div');
    grammarBanner.className = 'grammar-system-banner';
    grammarBanner.innerHTML = `
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #22c55e;"></span> <strong style="color: #4ade80;">Substantiv / Pronomen</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #ef4444;"></span> <strong style="color: #f87171;">Verbum</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #f97316;"></span> <strong style="color: #fb923c;">Adjektiv</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #0284c7;"></span> <strong style="color: #60a5fa;">Sted (Præposition)</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #8b5cf6;"></span> <strong style="color: #c084fc;">Tid (Tidsadverbium)</strong></div>
    `;
    viewContainer.appendChild(grammarBanner);

    // Navigation Tabs: 1. del vs. 2. del
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'intro-tabs-nav';

    const tab1Btn = document.createElement('button');
    tab1Btn.className = 'intro-tab-btn active';
    tab1Btn.innerHTML = `<strong>${getTranslation('intro_tab_part1')}</strong> <span>${getTranslation('intro_tab_part1_sub')}</span>`;

    const tab2Btn = document.createElement('button');
    tab2Btn.className = 'intro-tab-btn';
    tab2Btn.innerHTML = `<strong>${getTranslation('intro_tab_part2')}</strong> <span>${getTranslation('intro_tab_part2_sub')}</span>`;

    tabsContainer.appendChild(tab1Btn);
    tabsContainer.appendChild(tab2Btn);
    viewContainer.appendChild(tabsContainer);

    // Main content areas
    const part1Container = document.createElement('div');
    part1Container.className = 'intro-part-container active';

    const part2Container = document.createElement('div');
    part2Container.className = 'intro-part-container';
    part2Container.style.display = 'none';

    viewContainer.appendChild(part1Container);
    viewContainer.appendChild(part2Container);

    tab1Btn.onclick = () => {
        tab1Btn.classList.add('active');
        tab2Btn.classList.remove('active');
        part1Container.style.display = 'block';
        part2Container.style.display = 'none';
    };

    tab2Btn.onclick = () => {
        tab2Btn.classList.add('active');
        tab1Btn.classList.remove('active');
        part2Container.style.display = 'block';
        part1Container.style.display = 'none';
    };

    // Helper: TTS speech
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // ==========================================
    // --- 1. DEL: ENKEL MODEL (4 SPØRGSMÅL) ----
    // ==========================================
    function setupPart1() {
        const introCard = document.createElement('div');
        introCard.className = 'intro-hero-card';
        introCard.innerHTML = `
            <h2>${getTranslation('part1_hero_title')}</h2>
            <p class="hero-desc">
                ${getTranslation('part1_hero_desc')}
            </p>
        `;
        part1Container.appendChild(introCard);

        // Hero Image with 4 multilingual frames & overlay
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'hero-image-wrapper photo-overlay-container';
        imgWrapper.innerHTML = `
            <div class="photo-overlay-wrap">
                <img src="assets/foto_metafor_clean.jpg" alt="${getTranslation('part1_hero_img_alt')}" class="hero-image">
                <svg class="photo-overlay-svg" viewBox="0 0 1376 768" preserveAspectRatio="none">
                    <defs>
                        <marker id="arrowhead-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
                        </marker>
                        <marker id="arrowhead-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                        </marker>
                        <marker id="arrowhead-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                        </marker>
                        <marker id="arrowhead-purple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
                        </marker>
                    </defs>
                    <!-- Arrow 1: Fra Boks 1 (Hvem/hvad - Substantiv) til kvinde -->
                    <line x1="430" y1="130" x2="620" y2="340" stroke="#22c55e" stroke-width="4" marker-end="url(#arrowhead-green)" />
                    <!-- Arrow 4: Fra Boks 4 (Hvornår - Tid) til himmel/bygning -->
                    <line x1="1130" y1="120" x2="1180" y2="150" stroke="#8b5cf6" stroke-width="4" marker-end="url(#arrowhead-purple)" />
                    <!-- Arrow 2: Fra Boks 2 (Handling - Verbum) til cykel/pedaler -->
                    <line x1="880" y1="450" x2="740" y2="480" stroke="#ef4444" stroke-width="4" marker-end="url(#arrowhead-red)" />
                    <!-- Arrow 3: Fra Boks 3 (Sted) til gaden -->
                    <line x1="300" y1="600" x2="520" y2="610" stroke="#0284c7" stroke-width="4" marker-end="url(#arrowhead-blue)" />
                </svg>
                <!-- Box 1: Hvem eller hvad taler vi om? -->
                <div class="photo-bubble bubble-1">
                    <div class="bubble-q">1. ${getTranslation('part1_q1')}</div>
                    <div class="bubble-ans ans-green">En kvinde</div>
                </div>
                <!-- Box 4: Hvornår sker det? -->
                <div class="photo-bubble bubble-4">
                    <div class="bubble-q">4. ${getTranslation('part1_q4')}</div>
                    <div class="bubble-ans ans-purple">om morgenen</div>
                </div>
                <!-- Box 2: Hvad laver personen eller tingen? -->
                <div class="photo-bubble bubble-2">
                    <div class="bubble-q">2. ${getTranslation('part1_q2')}</div>
                    <div class="bubble-ans ans-red">cykler</div>
                </div>
                <!-- Box 3: Hvor sker det? -->
                <div class="photo-bubble bubble-3">
                    <div class="bubble-q">3. ${getTranslation('part1_q3')}</div>
                    <div class="bubble-ans ans-blue">på gaden</div>
                </div>
            </div>
        `;
        part1Container.appendChild(imgWrapper);

        // 4 Step Overview Grid
        const stepGrid = document.createElement('div');
        stepGrid.className = 'simple-steps-grid';

        const stepItems = [
            {
                num: '1',
                q: getTranslation('part1_q1'),
                ans: 'En kvinde',
                colorClass: 'step-green',
                icon: '👤',
                grammar: getTranslation('part1_g1')
            },
            {
                num: '2',
                q: getTranslation('part1_q2'),
                ans: 'cykler',
                colorClass: 'step-red',
                icon: '🚲',
                grammar: getTranslation('part1_g2')
            },
            {
                num: '3',
                q: getTranslation('part1_q3'),
                ans: 'på gaden',
                colorClass: 'step-blue',
                icon: '📍',
                grammar: getTranslation('part1_g3')
            },
            {
                num: '4',
                q: getTranslation('part1_q4'),
                ans: 'om morgenen',
                colorClass: 'step-purple',
                icon: '⏰',
                grammar: getTranslation('part1_g4')
            }
        ];

        stepItems.forEach(item => {
            const card = document.createElement('div');
            card.className = `simple-step-card ${item.colorClass}`;
            card.innerHTML = `
                <div class="step-badge">${item.num}</div>
                <div class="step-card-content">
                    <div class="step-q">${item.icon} ${item.q}</div>
                    <div class="step-ans">${item.ans}</div>
                    <div class="grammar-badge">🏷️ ${item.grammar}</div>
                </div>
            `;
            stepGrid.appendChild(card);
        });
        part1Container.appendChild(stepGrid);

        // Extra Grammar Info Box (visible when grammar mode is active)
        const grammarInfo = document.createElement('div');
        grammarInfo.className = 'grammar-extra-info';
        grammarInfo.innerHTML = `
            <h4>${getTranslation('part1_grammar_box_title')}</h4>
            <p>${getTranslation('part1_grammar_box_substantiv')}</p>
            <p>${getTranslation('part1_grammar_box_verbum')}</p>
            <p>${getTranslation('part1_grammar_box_praeposition')}</p>
            <p>${getTranslation('part1_grammar_box_tidsadverbium')}</p>
            <p>${getTranslation('part1_grammar_box_adjektiv')}</p>
            <p>${getTranslation('part1_grammar_box_konjunktion')}</p>
            <small>${getTranslation('part1_grammar_box_note')}</small>
        `;
        part1Container.appendChild(grammarInfo);

        // Result sentence box
        const resultBox = document.createElement('div');
        resultBox.className = 'finished-sentence-banner';
        resultBox.innerHTML = `
            <div class="banner-label">${getTranslation('part1_finished_sentence_label')}</div>
            <div class="banner-sentence">
                <span class="word-green">En kvinde</span> 
                <span class="word-red">cykler</span> 
                <span class="word-blue">på gaden</span> 
                <span class="word-purple">om morgenen</span>.
            </div>
            <button class="listen-btn" title="Hør udtale">
                <span>🔊</span> ${getTranslation('part1_listen_btn')}
            </button>
        `;
        const listenBtn = resultBox.querySelector('.listen-btn');
        listenBtn.onclick = () => speakDanish("En kvinde cykler på gaden om morgenen");
        part1Container.appendChild(resultBox);

        // --- PRØV SELV AT LAVE EN SÆTNING ---
        const tryHeader = document.createElement('div');
        tryHeader.className = 'section-divider';
        tryHeader.innerHTML = `
            <h2>${getTranslation('part1_try_title')}</h2>
            <p>${getTranslation('part1_try_desc')}</p>
        `;
        part1Container.appendChild(tryHeader);

        // Sub-tabs: 1) Sætningsbygger 2) Puslespil
        const exerciseTabs = document.createElement('div');
        exerciseTabs.className = 'exercise-sub-tabs';
        const ex1TabBtn = document.createElement('button');
        ex1TabBtn.className = 'ex-sub-tab active';
        ex1TabBtn.textContent = getTranslation('part1_tab_builder');

        const ex2TabBtn = document.createElement('button');
        ex2TabBtn.className = 'ex-sub-tab';
        ex2TabBtn.textContent = getTranslation('part1_tab_puzzle');

        exerciseTabs.appendChild(ex1TabBtn);
        exerciseTabs.appendChild(ex2TabBtn);
        part1Container.appendChild(exerciseTabs);

        const builderContainer = document.createElement('div');
        builderContainer.className = 'exercise-panel active';

        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'exercise-panel';
        puzzleContainer.style.display = 'none';

        part1Container.appendChild(builderContainer);
        part1Container.appendChild(puzzleContainer);

        ex1TabBtn.onclick = () => {
            ex1TabBtn.classList.add('active');
            ex2TabBtn.classList.remove('active');
            builderContainer.style.display = 'block';
            puzzleContainer.style.display = 'none';
        };

        ex2TabBtn.onclick = () => {
            ex2TabBtn.classList.add('active');
            ex1TabBtn.classList.remove('active');
            puzzleContainer.style.display = 'block';
            builderContainer.style.display = 'none';
        };

        // --- EXERCISE 1: STEP-BY-STEP BUILDER ---
        setupStepBuilder(builderContainer);

        // --- EXERCISE 2: PUZZLE ORDERING ---
        setupPuzzleExercise(puzzleContainer);
    }

    // Step-by-step 4-question builder
    function setupStepBuilder(container) {
        const categories = [
            {
                q: getTranslation('part1_builder_q1'),
                colorClass: "step-green",
                grammar: getTranslation('part1_builder_g1'),
                options: ["En kvinde", "En mand", "En hund", "En dreng", "En pige", "Bussen"]
            },
            {
                q: getTranslation('part1_builder_q2'),
                colorClass: "step-red",
                grammar: getTranslation('part1_builder_g2'),
                options: ["cykler", "løber", "drikker kaffe", "spiser mad", "læser en bog", "kører"]
            },
            {
                q: getTranslation('part1_builder_q3'),
                colorClass: "step-blue",
                grammar: getTranslation('part1_builder_g3'),
                options: ["på gaden", "i parken", "på caféen", "i skolen", "i køkkenet"]
            },
            {
                q: getTranslation('part1_builder_q4'),
                colorClass: "step-purple",
                grammar: getTranslation('part1_builder_g4'),
                options: ["om morgenen", "om aftenen", "hver dag", "lige nu", "i dag"]
            }
        ];

        let selections = ["En kvinde", "cykler", "på gaden", "om morgenen"];

        const card = document.createElement('div');
        card.className = 'step-builder-card';

        const outputBox = document.createElement('div');
        outputBox.className = 'builder-live-sentence';

        function updateLiveSentence() {
            outputBox.innerHTML = `
                <div class="live-label">${getTranslation('part1_live_label')}</div>
                <div class="live-text">
                    <span class="word-green">${selections[0]}</span> 
                    <span class="word-red">${selections[1]}</span> 
                    <span class="word-blue">${selections[2]}</span> 
                    <span class="word-purple">${selections[3]}</span>.
                </div>
                <button class="listen-btn-small" title="Lyt">🔊 ${getTranslation('part1_listen_pronunciation')}</button>
            `;
            const listenBtn = outputBox.querySelector('.listen-btn-small');
            listenBtn.onclick = () => speakDanish(`${selections[0]} ${selections[1]} ${selections[2]} ${selections[3]}`);
        }

        const questionsList = document.createElement('div');
        questionsList.className = 'builder-questions-list';

        categories.forEach((cat, catIdx) => {
            const qRow = document.createElement('div');
            qRow.className = `builder-q-row ${cat.colorClass}`;

            const qTitle = document.createElement('div');
            qTitle.className = 'builder-q-title';
            qTitle.innerHTML = `${cat.q} <span class="grammar-badge-inline">${cat.grammar}</span>`;
            qRow.appendChild(qTitle);

            const optionsWrapper = document.createElement('div');
            optionsWrapper.className = 'builder-btn-grid';

            cat.options.forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = `chip-btn ${selections[catIdx] === opt ? 'selected' : ''}`;
                optBtn.textContent = opt;

                optBtn.onclick = () => {
                    selections[catIdx] = opt;
                    qRow.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('selected'));
                    optBtn.classList.add('selected');
                    updateLiveSentence();
                };
                optionsWrapper.appendChild(optBtn);
            });

            qRow.appendChild(optionsWrapper);
            questionsList.appendChild(qRow);
        });

        card.appendChild(questionsList);
        card.appendChild(outputBox);
        container.appendChild(card);

        updateLiveSentence();
    }

    // Puzzle Exercise: arrange in correct order (1 -> 2 -> 3 -> 4)
    function setupPuzzleExercise(container) {
        const tasks = [
            {
                correct: ["En kvinde", "cykler", "på gaden", "om morgenen"],
                scrambled: ["på gaden", "om morgenen", "En kvinde", "cykler"]
            },
            {
                correct: ["En mand", "drikker kaffe", "på caféen", "om morgenen"],
                scrambled: ["drikker kaffe", "på caféen", "om morgenen", "En mand"]
            },
            {
                correct: ["En hund", "løber", "i parken", "hver dag"],
                scrambled: ["i parken", "En hund", "hver dag", "løber"]
            },
            {
                correct: ["En pige", "læser en bog", "i skolen", "i dag"],
                scrambled: ["i dag", "læser en bog", "i skolen", "En pige"]
            },
            {
                correct: ["Bussen", "kører", "på gaden", "lige nu"],
                scrambled: ["lige nu", "på gaden", "Bussen", "kører"]
            },
            {
                correct: ["En familie", "spiser aftensmad", "i køkkenet", "om aftenen"],
                scrambled: ["om aftenen", "En familie", "i køkkenet", "spiser aftensmad"]
            },
            {
                correct: ["En dreng", "spiller fodbold", "i haven", "om eftermiddagen"],
                scrambled: ["i haven", "spiller fodbold", "om eftermiddagen", "En dreng"]
            },
            {
                correct: ["Lægen", "taler i telefon", "på hospitalet", "hele tiden"],
                scrambled: ["på hospitalet", "hele tiden", "Lægen", "taler i telefon"]
            },
            {
                correct: ["En kat", "sover", "i sengen", "om natten"],
                scrambled: ["sover", "om natten", "i sengen", "En kat"]
            },
            {
                correct: ["Toget", "ankommer", "på stationen", "klokken otte"],
                scrambled: ["klokken otte", "ankommer", "på stationen", "Toget"]
            }
        ];

        let currentTaskIdx = 0;
        let userSlots = [null, null, null, null];
        const completedTasks = new Set();

        const puzzleWrapper = document.createElement('div');
        puzzleWrapper.className = 'puzzle-wrapper';

        function renderCurrentTask() {
            puzzleWrapper.innerHTML = '';
            userSlots = [null, null, null, null];

            const task = tasks[currentTaskIdx];

            const header = document.createElement('div');
            header.className = 'puzzle-header';

            // Navigation pills (1 to 10)
            const pillsRow = document.createElement('div');
            pillsRow.className = 'puzzle-pills-row';
            tasks.forEach((_, tIdx) => {
                const pill = document.createElement('button');
                pill.className = `puzzle-pill ${tIdx === currentTaskIdx ? 'active' : ''} ${completedTasks.has(tIdx) ? 'completed' : ''}`;
                pill.textContent = tIdx + 1;
                pill.title = `${getTranslation('part1_puzzle_pill_title')} ${tIdx + 1}`;
                pill.onclick = () => {
                    currentTaskIdx = tIdx;
                    renderCurrentTask();
                };
                pillsRow.appendChild(pill);
            });
            header.appendChild(pillsRow);

            const counterEl = document.createElement('div');
            counterEl.className = 'puzzle-counter';
            counterEl.textContent = getTranslation('part1_puzzle_counter', { current: currentTaskIdx + 1, total: tasks.length });
            header.appendChild(counterEl);

            const guideEl = document.createElement('div');
            guideEl.className = 'puzzle-guide';
            guideEl.innerHTML = `
                ${getTranslation('part1_puzzle_guide')}
                <br><small>${getTranslation('part1_puzzle_guide_sub')}</small>
            `;
            header.appendChild(guideEl);

            puzzleWrapper.appendChild(header);

            // Slots display (where placed words go)
            const slotsContainer = document.createElement('div');
            slotsContainer.className = 'puzzle-slots';

            const slotPrompts = [
                { text: getTranslation('part1_slot_hint_1'), grammar: getTranslation('part1_builder_g1') },
                { text: getTranslation('part1_slot_hint_2'), grammar: getTranslation('part1_builder_g2') },
                { text: getTranslation('part1_slot_hint_3'), grammar: getTranslation('part1_builder_g3') },
                { text: getTranslation('part1_slot_hint_4'), grammar: getTranslation('part1_builder_g4') }
            ];

            slotPrompts.forEach((promptItem, idx) => {
                const slot = document.createElement('div');
                slot.className = `puzzle-slot slot-${idx}`;
                slot.innerHTML = `<span class="slot-hint">${promptItem.text}</span><span class="grammar-hint-slot">[${promptItem.grammar}]</span>`;
                slot.dataset.idx = idx;

                slot.onclick = () => {
                    if (userSlots[idx]) {
                        userSlots[idx] = null;
                        updateSlotsAndBank();
                    }
                };

                slotsContainer.appendChild(slot);
            });
            puzzleWrapper.appendChild(slotsContainer);

            // Word bank (the available scrambled words)
            const bankContainer = document.createElement('div');
            bankContainer.className = 'puzzle-bank';
            puzzleWrapper.appendChild(bankContainer);

            // Feedback and controls
            const feedbackBox = document.createElement('div');
            feedbackBox.className = 'puzzle-feedback';
            puzzleWrapper.appendChild(feedbackBox);

            function updateSlotsAndBank() {
                // Update slots
                slotsContainer.querySelectorAll('.puzzle-slot').forEach((slotEl, idx) => {
                    const word = userSlots[idx];
                    if (word) {
                        slotEl.classList.add('filled');
                        slotEl.innerHTML = `
                            <span class="slot-number">${idx + 1}</span>
                            <span class="slot-text">${word}</span>
                            <span class="slot-remove">✕</span>
                        `;
                    } else {
                        slotEl.classList.remove('filled');
                        slotEl.innerHTML = `<span class="slot-hint">${slotPrompts[idx].text}</span><span class="grammar-hint-slot">[${slotPrompts[idx].grammar}]</span>`;
                    }
                });

                // Update bank
                bankContainer.innerHTML = '';
                task.scrambled.forEach((word) => {
                    const isPlaced = userSlots.includes(word);
                    const btn = document.createElement('button');
                    btn.className = `puzzle-word-btn ${isPlaced ? 'placed' : ''}`;
                    btn.textContent = word;
                    btn.disabled = isPlaced;

                    btn.onclick = () => {
                        const emptyIdx = userSlots.indexOf(null);
                        if (emptyIdx !== -1) {
                            userSlots[emptyIdx] = word;
                            updateSlotsAndBank();
                            checkAnswer();
                        }
                    };
                    bankContainer.appendChild(btn);
                });
            }

            function checkAnswer() {
                if (userSlots.includes(null)) {
                    feedbackBox.innerHTML = '';
                    return;
                }

                // All filled: check correctness
                const isCorrect = userSlots.every((w, i) => w === task.correct[i]);
                const sentence = `${userSlots[0]} ${userSlots[1]} ${userSlots[2]} ${userSlots[3]}.`;

                if (isCorrect) {
                    completedTasks.add(currentTaskIdx);
                    // Update pill styling
                    pillsRow.querySelectorAll('.puzzle-pill').forEach((pill, idx) => {
                        if (completedTasks.has(idx)) pill.classList.add('completed');
                    });

                    feedbackBox.innerHTML = `
                        <div class="feedback-msg success">
                            ${getTranslation('part1_feedback_correct')} "<strong>${sentence}</strong>"
                        </div>
                        <div class="puzzle-action-row">
                            <button class="listen-btn-small" id="puzzle-listen-btn">🔊 ${getTranslation('part1_listen_pronunciation')}</button>
                            <button class="next-task-btn" id="puzzle-next-btn">
                                ${currentTaskIdx < tasks.length - 1 ? getTranslation('part1_next_task') : getTranslation('part1_start_over')}
                            </button>
                        </div>
                    `;
                    feedbackBox.querySelector('#puzzle-listen-btn').onclick = () => speakDanish(sentence);
                    feedbackBox.querySelector('#puzzle-next-btn').onclick = () => {
                        currentTaskIdx = (currentTaskIdx + 1) % tasks.length;
                        renderCurrentTask();
                    };
                } else {
                    feedbackBox.innerHTML = `
                        <div class="feedback-msg error">
                            ${getTranslation('part1_feedback_error')}
                        </div>
                        <button class="retry-task-btn" id="puzzle-retry-btn">${getTranslation('part1_retry')}</button>
                    `;
                    feedbackBox.querySelector('#puzzle-retry-btn').onclick = () => {
                        userSlots = [null, null, null, null];
                        feedbackBox.innerHTML = '';
                        updateSlotsAndBank();
                    };
                }
            }

            updateSlotsAndBank();
        }

        renderCurrentTask();
        container.appendChild(puzzleWrapper);
    }

    // ==========================================
    // --- 2. DEL: UDVIDET MODEL (7 TRIN) -------
    // ==========================================
    // ==========================================
    // --- 2. DEL: UDVIDET MODEL (7 TRIN) -------
    // ==========================================
    function setupPart2() {
        const introCard = document.createElement('div');
        introCard.className = 'intro-hero-card';
        introCard.innerHTML = `
            <h2>${getTranslation('part2_hero_title')}</h2>
            <p class="hero-desc">
                ${getTranslation('part2_hero_desc')}
            </p>
        `;
        part2Container.appendChild(introCard);

        // Hero Image with 7 frames & dynamic overlay
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'hero-image-wrapper photo-overlay-container';
        imgWrapper.innerHTML = `
            <div class="photo-overlay-wrap">
                <img src="assets/foto_metafor_clean.jpg" alt="${getTranslation('part2_hero_img_alt')}" class="hero-image">
                <svg class="photo-overlay-svg" viewBox="0 0 1376 768" preserveAspectRatio="none">
                    <defs>
                        <marker id="arrowhead-7-orange" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
                        </marker>
                        <marker id="arrowhead-7-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
                        </marker>
                        <marker id="arrowhead-7-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                        </marker>
                        <marker id="arrowhead-7-yellow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#eab308" />
                        </marker>
                        <marker id="arrowhead-7-cyan" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#06b6d4" />
                        </marker>
                        <marker id="arrowhead-7-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                        </marker>
                        <marker id="arrowhead-7-purple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
                        </marker>
                    </defs>
                    <!-- Arrow 4: Heldigvis (Holdning) -> Sol/himmel -->
                    <line x1="200" y1="110" x2="310" y2="160" stroke="#eab308" stroke-width="4" marker-end="url(#arrowhead-7-yellow)" />
                    <!-- Arrow 1: Den travle (Adjektiv) -> Kvinde -->
                    <line x1="200" y1="260" x2="570" y2="280" stroke="#f97316" stroke-width="4" marker-end="url(#arrowhead-7-orange)" />
                    <!-- Arrow 2: kvinde (Substantiv) -> Hoved/ansigt -->
                    <line x1="580" y1="120" x2="650" y2="230" stroke="#22c55e" stroke-width="4" marker-end="url(#arrowhead-7-green)" />
                    <!-- Arrow 7: mens det sner (Tid/biled) -> Snevejr/himmel -->
                    <line x1="1080" y1="120" x2="1140" y2="170" stroke="#8b5cf6" stroke-width="4" marker-end="url(#arrowhead-7-purple)" />
                    <!-- Arrow 3: cykler (Verbum) -> Pedaler/hjul -->
                    <line x1="910" y1="440" x2="740" y2="480" stroke="#ef4444" stroke-width="4" marker-end="url(#arrowhead-7-red)" />
                    <!-- Arrow 5: forsigtigt (Måde) -> Cykelsti/fart -->
                    <line x1="910" y1="590" x2="840" y2="590" stroke="#06b6d4" stroke-width="4" marker-end="url(#arrowhead-7-cyan)" />
                    <!-- Arrow 6: på gaden (Sted) -> Vejbanen -->
                    <line x1="250" y1="670" x2="520" y2="670" stroke="#0284c7" stroke-width="4" marker-end="url(#arrowhead-7-blue)" />
                </svg>
                <!-- Box 4: Holdning -->
                <div class="photo-bubble bubble-7-holdning">
                    <div class="bubble-q">4. ${getTranslation('part2_q4')}</div>
                    <div class="bubble-ans ans-yellow">heldigvis</div>
                </div>
                <!-- Box 1: Adjektiv -->
                <div class="photo-bubble bubble-7-adjektiv">
                    <div class="bubble-q">1. ${getTranslation('part2_q1')}</div>
                    <div class="bubble-ans ans-orange">Den travle</div>
                </div>
                <!-- Box 2: Substantiv -->
                <div class="photo-bubble bubble-7-substantiv">
                    <div class="bubble-q">2. ${getTranslation('part2_q2')}</div>
                    <div class="bubble-ans ans-green">kvinde</div>
                </div>
                <!-- Box 7: Ledsætning / Tid -->
                <div class="photo-bubble bubble-7-ledsaetning">
                    <div class="bubble-q">7. ${getTranslation('part2_q7')}</div>
                    <div class="bubble-ans ans-purple">mens det sner</div>
                </div>
                <!-- Box 3: Verbum -->
                <div class="photo-bubble bubble-7-verbum">
                    <div class="bubble-q">3. ${getTranslation('part2_q3')}</div>
                    <div class="bubble-ans ans-red">cykler</div>
                </div>
                <!-- Box 5: Måde -->
                <div class="photo-bubble bubble-7-maade">
                    <div class="bubble-q">5. ${getTranslation('part2_q5')}</div>
                    <div class="bubble-ans ans-cyan">forsigtigt</div>
                </div>
                <!-- Box 6: Sted -->
                <div class="photo-bubble bubble-7-sted">
                    <div class="bubble-q">6. ${getTranslation('part2_q6')}</div>
                    <div class="bubble-ans ans-blue">på gaden</div>
                </div>
            </div>
        `;
        part2Container.appendChild(imgWrapper);

        // 7-Step Overview Grid
        const stepGrid = document.createElement('div');
        stepGrid.className = 'simple-steps-grid';

        const stepItems = [
            { num: '1', q: getTranslation('part2_q1'), ans: 'Den travle', colorClass: 'step-orange', icon: '🎨', note: getTranslation('part2_note_1'), grammar: getTranslation('part2_g1') },
            { num: '2', q: getTranslation('part2_q2'), ans: 'kvinde', colorClass: 'step-green', icon: '👤', note: getTranslation('part2_note_2'), grammar: getTranslation('part2_g2') },
            { num: '3', q: getTranslation('part2_q3'), ans: 'cykler', colorClass: 'step-red', icon: '🚲', note: getTranslation('part2_note_3'), grammar: getTranslation('part2_g3') },
            { num: '4', q: getTranslation('part2_q4'), ans: 'heldigvis', colorClass: 'step-yellow', icon: '🌤️', note: getTranslation('part2_note_4'), grammar: getTranslation('part2_g4') },
            { num: '5', q: getTranslation('part2_q5'), ans: 'forsigtigt', colorClass: 'step-cyan', icon: '⚡', note: getTranslation('part2_note_5'), grammar: getTranslation('part2_g5') },
            { num: '6', q: getTranslation('part2_q6'), ans: 'på gaden', colorClass: 'step-blue', icon: '📍', note: getTranslation('part2_note_6'), grammar: getTranslation('part2_g6') },
            { num: '7', q: getTranslation('part2_q7'), ans: 'mens det sner', colorClass: 'step-purple', icon: '❄️', note: getTranslation('part2_note_7'), grammar: getTranslation('part2_g7') }
        ];

        stepItems.forEach(item => {
            const card = document.createElement('div');
            card.className = `simple-step-card ${item.colorClass}`;
            card.innerHTML = `
                <div class="step-badge">${item.num}</div>
                <div class="step-card-content">
                    <div class="step-q">${item.icon} ${item.q}</div>
                    <div class="step-ans">${item.ans}</div>
                    <small style="color: #94a3b8; font-size: 0.8rem;">${item.note}</small>
                    <div class="grammar-badge">🏷️ ${item.grammar}</div>
                </div>
            `;
            stepGrid.appendChild(card);
        });
        part2Container.appendChild(stepGrid);

        // Result sentence banner
        const resultBox = document.createElement('div');
        resultBox.className = 'finished-sentence-banner';
        resultBox.innerHTML = `
            <div class="banner-label">${getTranslation('part2_finished_label')}</div>
            <div class="banner-sentence">
                <span class="word-orange">Den travle</span> 
                <span class="word-green">kvinde</span> 
                <span class="word-red">cykler</span> 
                <span class="word-yellow">heldigvis</span> 
                <span class="word-cyan">forsigtigt</span> 
                <span class="word-blue">på gaden</span>, 
                <span class="word-purple">mens det sner</span>.
            </div>
            <button class="listen-btn" title="${getTranslation('part2_listen_btn')}">
                <span>🔊</span> ${getTranslation('part2_listen_btn')}
            </button>
        `;
        const listenBtn = resultBox.querySelector('.listen-btn');
        listenBtn.onclick = () => speakDanish("Den travle kvinde cykler heldigvis forsigtigt på gaden, mens det sner");
        part2Container.appendChild(resultBox);

        // Section Divider
        const tryHeader = document.createElement('div');
        tryHeader.className = 'section-divider';
        tryHeader.innerHTML = `
            <h2>${getTranslation('part2_try_title')}</h2>
            <p>${getTranslation('part2_try_desc')}</p>
        `;
        part2Container.appendChild(tryHeader);

        // Sub-tabs: 1) Trin-for-trin bygger 2) Puslespil
        const exerciseTabs = document.createElement('div');
        exerciseTabs.className = 'exercise-sub-tabs';
        const ex1TabBtn = document.createElement('button');
        ex1TabBtn.className = 'ex-sub-tab active';
        ex1TabBtn.textContent = getTranslation('part2_tab_builder');

        const ex2TabBtn = document.createElement('button');
        ex2TabBtn.className = 'ex-sub-tab';
        ex2TabBtn.textContent = getTranslation('part2_tab_puzzle');

        exerciseTabs.appendChild(ex1TabBtn);
        exerciseTabs.appendChild(ex2TabBtn);
        part2Container.appendChild(exerciseTabs);

        const builderContainer = document.createElement('div');
        builderContainer.className = 'exercise-panel active';

        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'exercise-panel';
        puzzleContainer.style.display = 'none';

        part2Container.appendChild(builderContainer);
        part2Container.appendChild(puzzleContainer);

        ex1TabBtn.onclick = () => {
            ex1TabBtn.classList.add('active');
            ex2TabBtn.classList.remove('active');
            builderContainer.style.display = 'block';
            puzzleContainer.style.display = 'none';
        };

        ex2TabBtn.onclick = () => {
            ex2TabBtn.classList.add('active');
            ex1TabBtn.classList.remove('active');
            puzzleContainer.style.display = 'block';
            builderContainer.style.display = 'none';
        };

        // --- EXERCISE 1: 7-STEP BUILDER ---
        setup7StepBuilder(builderContainer);

        // --- EXERCISE 2: 7-STEP PUZZLE ---
        setup7StepPuzzleExercise(puzzleContainer);
    }

    // Step-by-step 7-question builder
    function setup7StepBuilder(container) {
        const categories = [
            {
                q: `1. ${getTranslation('part2_q1')} (${getTranslation('part2_note_1')})`,
                colorClass: "step-orange",
                grammar: getTranslation('part2_g1'),
                options: ["Den travle", "En glad", "Det lille", "Den dygtige", "En stor", "Den unge"]
            },
            {
                q: `2. ${getTranslation('part2_q2')} (${getTranslation('part2_note_2')})`,
                colorClass: "step-green",
                grammar: getTranslation('part2_g2'),
                options: ["kvinde", "mand", "barn", "lærer", "hund", "pige"]
            },
            {
                q: `3. ${getTranslation('part2_q3')} (${getTranslation('part2_note_3')})`,
                colorClass: "step-red",
                grammar: getTranslation('part2_g3'),
                options: ["cykler", "løber", "arbejder", "sover", "leger", "læser"]
            },
            {
                q: `4. ${getTranslation('part2_q4')} (${getTranslation('part2_note_4')})`,
                colorClass: "step-yellow",
                grammar: getTranslation('part2_g4'),
                options: ["heldigvis", "desværre", "faktisk", "altid", "ofte"]
            },
            {
                q: `5. ${getTranslation('part2_q5')} (${getTranslation('part2_note_5')})`,
                colorClass: "step-pink",
                grammar: getTranslation('part2_g5'),
                options: ["forsigtigt", "hurtigt", "roligt", "flittigt", "vildt", "stille"]
            },
            {
                q: `6. ${getTranslation('part2_q6')} (${getTranslation('part2_note_6')})`,
                colorClass: "step-blue",
                grammar: getTranslation('part2_g6'),
                options: ["på gaden", "i parken", "i skolen", "derhjemme", "i haven", "på biblioteket"]
            },
            {
                q: `7. ${getTranslation('part2_q7')} (${getTranslation('part2_note_7')})`,
                colorClass: "step-purple",
                grammar: getTranslation('part2_g7'),
                options: ["mens det sner", "fordi solen skinner", "selvom det regner", "når eleverne har fri", "mens gæsterne spiser", "før timen starter"]
            }
        ];

        let selections = [
            "Den travle",
            "kvinde",
            "cykler",
            "heldigvis",
            "forsigtigt",
            "på gaden",
            "mens det sner"
        ];

        const card = document.createElement('div');
        card.className = 'step-builder-card';

        const outputBox = document.createElement('div');
        outputBox.className = 'builder-live-sentence';

        function updateLiveSentence() {
            outputBox.innerHTML = `
                <div class="live-label">${getTranslation('part2_builder_live_label')}</div>
                <div class="live-text">
                    <span class="word-orange">${selections[0]}</span> 
                    <span class="word-green">${selections[1]}</span> 
                    <span class="word-red">${selections[2]}</span> 
                    <span class="word-yellow">${selections[3]}</span> 
                    <span class="word-pink">${selections[4]}</span> 
                    <span class="word-blue">${selections[5]}</span>, 
                    <span class="word-purple">${selections[6]}</span>.
                </div>
                <button class="listen-btn-small" title="${getTranslation('part2_listen_pronunciation')}">🔊 ${getTranslation('part2_listen_pronunciation')}</button>
            `;
            const listenBtn = outputBox.querySelector('.listen-btn-small');
            listenBtn.onclick = () => speakDanish(`${selections[0]} ${selections[1]} ${selections[2]} ${selections[3]} ${selections[4]} ${selections[5]}, ${selections[6]}`);
        }

        const questionsList = document.createElement('div');
        questionsList.className = 'builder-questions-list';

        categories.forEach((cat, catIdx) => {
            const qRow = document.createElement('div');
            qRow.className = `builder-q-row ${cat.colorClass}`;

            const qTitle = document.createElement('div');
            qTitle.className = 'builder-q-title';
            qTitle.innerHTML = `${cat.q} <span class="grammar-badge-inline">${cat.grammar}</span>`;
            qRow.appendChild(qTitle);

            const optionsWrapper = document.createElement('div');
            optionsWrapper.className = 'builder-btn-grid';

            cat.options.forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = `chip-btn ${selections[catIdx] === opt ? 'selected' : ''}`;
                optBtn.textContent = opt;

                optBtn.onclick = () => {
                    selections[catIdx] = opt;
                    qRow.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('selected'));
                    optBtn.classList.add('selected');
                    updateLiveSentence();
                };
                optionsWrapper.appendChild(optBtn);
            });

            qRow.appendChild(optionsWrapper);
            questionsList.appendChild(qRow);
        });

        card.appendChild(questionsList);
        card.appendChild(outputBox);
        container.appendChild(card);

        updateLiveSentence();
    }

    // Puzzle Exercise for 7 steps (10 tasks)
    function setup7StepPuzzleExercise(container) {
        const tasks = [
            {
                correct: ["Den travle", "kvinde", "cykler", "heldigvis", "forsigtigt", "på gaden", "mens det sner"],
                scrambled: ["på gaden", "heldigvis", "kvinde", "mens det sner", "cykler", "Den travle", "forsigtigt"]
            },
            {
                correct: ["En glad", "mand", "løber", "altid", "hurtigt", "i parken", "fordi solen skinner"],
                scrambled: ["hurtigt", "i parken", "mand", "altid", "fordi solen skinner", "En glad", "løber"]
            },
            {
                correct: ["Det lille", "barn", "sover", "ofte", "roligt", "derhjemme", "selvom det regner"],
                scrambled: ["ofte", "barn", "selvom det regner", "sover", "Det lille", "derhjemme", "roligt"]
            },
            {
                correct: ["Den dygtige", "lærer", "arbejder", "faktisk", "flittigt", "på skolen", "når eleverne har fri"],
                scrambled: ["arbejder", "faktisk", "på skolen", "Den dygtige", "flittigt", "lærer", "når eleverne har fri"]
            },
            {
                correct: ["En stor", "hund", "leger", "desværre", "vildt", "i haven", "mens gæsterne spiser"],
                scrambled: ["i haven", "leger", "hund", "mens gæsterne spiser", "En stor", "vildt", "desværre"]
            },
            {
                correct: ["Den unge", "pige", "læser", "altid", "stille", "på biblioteket", "før timen starter"],
                scrambled: ["læser", "før timen starter", "stille", "Den unge", "på biblioteket", "pige", "altid"]
            },
            {
                correct: ["Den grønne", "bus", "kører", "heldigvis", "langsomt", "i byen", "fordi vejen er glat"],
                scrambled: ["kører", "fordi vejen er glat", "Den grønne", "langsomt", "i byen", "bus", "heldigvis"]
            },
            {
                correct: ["En træt", "chauffør", "drikker", "ofte", "kaffe", "på rastepladsen", "når natten falder på"],
                scrambled: ["drikker", "på rastepladsen", "chauffør", "når natten falder på", "ofte", "En træt", "kaffe"]
            },
            {
                correct: ["Den gamle", "kat", "ligger", "faktisk", "helt stille", "i sofaen", "mens radioen spiller"],
                scrambled: ["kat", "ligger", "mens radioen spiller", "Den gamle", "i sofaen", "helt stille", "faktisk"]
            },
            {
                correct: ["En flink", "nabo", "hjælper", "altid", "gerne", "i opgangen", "hvis der er problemer"],
                scrambled: ["altid", "i opgangen", "hjælper", "nabo", "En flink", "hvis der er problemer", "gerne"]
            }
        ];

        let currentTaskIdx = 0;
        let userSlots = [null, null, null, null, null, null, null];
        const completedTasks = new Set();

        const puzzleWrapper = document.createElement('div');
        puzzleWrapper.className = 'puzzle-wrapper';

        function renderCurrentTask() {
            puzzleWrapper.innerHTML = '';
            userSlots = [null, null, null, null, null, null, null];

            const task = tasks[currentTaskIdx];

            const header = document.createElement('div');
            header.className = 'puzzle-header';

            // Navigation pills (1 to 10)
            const pillsRow = document.createElement('div');
            pillsRow.className = 'puzzle-pills-row';
            tasks.forEach((_, tIdx) => {
                const pill = document.createElement('button');
                pill.className = `puzzle-pill ${tIdx === currentTaskIdx ? 'active' : ''} ${completedTasks.has(tIdx) ? 'completed' : ''}`;
                pill.textContent = tIdx + 1;
                pill.title = `${getTranslation('part2_puzzle_pill_title')} ${tIdx + 1}`;
                pill.onclick = () => {
                    currentTaskIdx = tIdx;
                    renderCurrentTask();
                };
                pillsRow.appendChild(pill);
            });
            header.appendChild(pillsRow);

            const counterEl = document.createElement('div');
            counterEl.className = 'puzzle-counter';
            counterEl.textContent = getTranslation('part2_puzzle_counter', { current: currentTaskIdx + 1, total: tasks.length });
            header.appendChild(counterEl);

            const guideEl = document.createElement('div');
            guideEl.className = 'puzzle-guide';
            guideEl.innerHTML = `
                ${getTranslation('part2_puzzle_guide')}
                <br><small>${getTranslation('part2_puzzle_guide_sub')}</small>
            `;
            header.appendChild(guideEl);

            puzzleWrapper.appendChild(header);

            // Slots display
            const slotsContainer = document.createElement('div');
            slotsContainer.className = 'puzzle-slots puzzle-slots-7';

            const slotPrompts = [
                { text: `1. ${getTranslation('part2_note_1')}`, grammar: getTranslation('part2_g1') },
                { text: `2. ${getTranslation('part2_note_2')}`, grammar: getTranslation('part2_g2') },
                { text: `3. ${getTranslation('part2_note_3')}`, grammar: getTranslation('part2_g3') },
                { text: `4. ${getTranslation('part2_note_4')}`, grammar: getTranslation('part2_g4') },
                { text: `5. ${getTranslation('part2_note_5')}`, grammar: getTranslation('part2_g5') },
                { text: `6. ${getTranslation('part2_note_6')}`, grammar: getTranslation('part2_g6') },
                { text: `7. ${getTranslation('part2_note_7')}`, grammar: getTranslation('part2_g7') }
            ];
            const slotColorClasses = [
                "slot7-orange",
                "slot7-green",
                "slot7-red",
                "slot7-yellow",
                "slot7-pink",
                "slot7-blue",
                "slot7-purple"
            ];

            slotPrompts.forEach((promptItem, idx) => {
                const slot = document.createElement('div');
                slot.className = `puzzle-slot ${slotColorClasses[idx]}`;
                slot.innerHTML = `<span class="slot-hint">${promptItem.text}</span><span class="grammar-hint-slot">[${promptItem.grammar}]</span>`;
                slot.dataset.idx = idx;

                slot.onclick = () => {
                    if (userSlots[idx]) {
                        userSlots[idx] = null;
                        updateSlotsAndBank();
                    }
                };

                slotsContainer.appendChild(slot);
            });
            puzzleWrapper.appendChild(slotsContainer);

            // Word bank
            const bankContainer = document.createElement('div');
            bankContainer.className = 'puzzle-bank';
            puzzleWrapper.appendChild(bankContainer);

            // Feedback and controls
            const feedbackBox = document.createElement('div');
            feedbackBox.className = 'puzzle-feedback';
            puzzleWrapper.appendChild(feedbackBox);

            function updateSlotsAndBank() {
                slotsContainer.querySelectorAll('.puzzle-slot').forEach((slotEl, idx) => {
                    const word = userSlots[idx];
                    if (word) {
                        slotEl.classList.add('filled');
                        slotEl.innerHTML = `
                            <span class="slot-number">${idx + 1}</span>
                            <span class="slot-text">${word}</span>
                            <span class="slot-remove">✕</span>
                        `;
                    } else {
                        slotEl.classList.remove('filled');
                        slotEl.innerHTML = `<span class="slot-hint">${slotPrompts[idx].text}</span><span class="grammar-hint-slot">[${slotPrompts[idx].grammar}]</span>`;
                    }
                });

                bankContainer.innerHTML = '';
                task.scrambled.forEach((word) => {
                    const isPlaced = userSlots.includes(word);
                    const btn = document.createElement('button');
                    btn.className = `puzzle-word-btn ${isPlaced ? 'placed' : ''}`;
                    btn.textContent = word;
                    btn.disabled = isPlaced;

                    btn.onclick = () => {
                        const emptyIdx = userSlots.indexOf(null);
                        if (emptyIdx !== -1) {
                            userSlots[emptyIdx] = word;
                            updateSlotsAndBank();
                            checkAnswer();
                        }
                    };
                    bankContainer.appendChild(btn);
                });
            }

            function checkAnswer() {
                if (userSlots.includes(null)) {
                    feedbackBox.innerHTML = '';
                    return;
                }

                const isCorrect = userSlots.every((w, i) => w === task.correct[i]);
                const sentence = `${userSlots[0]} ${userSlots[1]} ${userSlots[2]} ${userSlots[3]} ${userSlots[4]} ${userSlots[5]}, ${userSlots[6]}.`;

                if (isCorrect) {
                    completedTasks.add(currentTaskIdx);
                    pillsRow.querySelectorAll('.puzzle-pill').forEach((pill, idx) => {
                        if (completedTasks.has(idx)) pill.classList.add('completed');
                    });

                    feedbackBox.innerHTML = `
                        <div class="feedback-msg success">
                            ${getTranslation('part2_puzzle_correct')} "<strong>${sentence}</strong>"
                        </div>
                        <div class="puzzle-action-row">
                            <button class="listen-btn-small" id="puzzle-7-listen-btn">🔊 ${getTranslation('part2_listen_pronunciation')}</button>
                            <button class="next-task-btn" id="puzzle-7-next-btn">
                                ${currentTaskIdx < tasks.length - 1 ? getTranslation('part2_next_task') : getTranslation('part2_start_over')}
                            </button>
                        </div>
                    `;
                    feedbackBox.querySelector('#puzzle-7-listen-btn').onclick = () => speakDanish(sentence);
                    feedbackBox.querySelector('#puzzle-7-next-btn').onclick = () => {
                        currentTaskIdx = (currentTaskIdx + 1) % tasks.length;
                        renderCurrentTask();
                    };
                } else {
                    feedbackBox.innerHTML = `
                        <div class="feedback-msg error">
                            ${getTranslation('part2_puzzle_error')}
                        </div>
                        <button class="retry-task-btn" id="puzzle-7-retry-btn">${getTranslation('part2_retry')}</button>
                    `;
                    feedbackBox.querySelector('#puzzle-7-retry-btn').onclick = () => {
                        userSlots = [null, null, null, null, null, null, null];
                        feedbackBox.innerHTML = '';
                        updateSlotsAndBank();
                    };
                }
            }

            updateSlotsAndBank();
        }

        renderCurrentTask();
        container.appendChild(puzzleWrapper);
    }

    // Initialize both parts
    setupPart1();
    setupPart2();

    container.appendChild(viewContainer);

    // Inject styles
    if (!document.getElementById('ordstilling-intro-styles')) {
        const styles = document.createElement('style');
        styles.id = 'ordstilling-intro-styles';
        styles.textContent = `
            /* Tab Navigation */
            .intro-tabs-nav {
                display: flex;
                gap: 0.75rem;
                margin: 1.5rem 0 2rem 0;
                background: rgba(0, 0, 0, 0.25);
                padding: 0.4rem;
                border-radius: 14px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .intro-tab-btn {
                flex: 1;
                background: transparent;
                border: none;
                color: #b0c4ba;
                padding: 0.85rem 1rem;
                border-radius: 10px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                transition: all 0.25s ease;
            }
            .intro-tab-btn strong {
                font-size: 1.15rem;
                color: #e0e0e0;
            }
            .intro-tab-btn span {
                font-size: 0.85rem;
                opacity: 0.8;
            }
            .intro-tab-btn:hover {
                background: rgba(255, 255, 255, 0.06);
                color: #fff;
            }
            .intro-tab-btn.active {
                background: #4CAF50;
                color: #fff;
                box-shadow: 0 4px 12px rgba(76, 175, 80, 0.35);
            }
            .intro-tab-btn.active strong {
                color: #fff;
            }

            /* Hero Card & Images */
            .intro-hero-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                text-align: center;
            }
            .intro-hero-card h2 {
                margin: 0 0 0.8rem 0;
                color: #FFD54F;
                font-size: 1.5rem;
            }
            .intro-hero-card .hero-desc {
                font-size: 1.1rem;
                line-height: 1.6;
                color: #e0e0e0;
                max-width: 720px;
                margin: 0 auto;
            }
            .hero-image-wrapper {
                text-align: center;
                margin: 1.5rem 0;
            }
            .hero-image {
                width: 100%;
                max-width: 820px;
                border-radius: 16px;
                box-shadow: 0 6px 20px rgba(0,0,0,0.35);
                border: 2px solid rgba(255, 255, 255, 0.15);
                display: block;
                margin: 0 auto;
            }

            /* Dynamic Multilingual Photo Overlay */
            .photo-overlay-wrap {
                position: relative;
                max-width: 820px;
                margin: 0 auto;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 6px 20px rgba(0,0,0,0.35);
                border: 2px solid rgba(255, 255, 255, 0.15);
            }
            .photo-overlay-wrap .hero-image {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 0;
                border: none;
                box-shadow: none;
                margin: 0;
            }
            .photo-overlay-svg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 2;
            }
            .photo-bubble {
                position: absolute;
                background: rgba(255, 255, 255, 0.96);
                border: 2px solid #222;
                border-radius: 8px;
                padding: 5px 10px;
                box-shadow: 0 4px 14px rgba(0,0,0,0.35);
                display: flex;
                flex-direction: column;
                gap: 4px;
                max-width: 44%;
                z-index: 3;
                pointer-events: auto;
                text-align: left;
            }
            .bubble-q {
                font-size: clamp(0.68rem, 1.3vw, 0.92rem);
                color: #111;
                font-weight: 600;
                line-height: 1.25;
            }
            .bubble-ans {
                display: inline-block;
                align-self: flex-start;
                padding: 2px 8px;
                border-radius: 5px;
                font-size: clamp(0.72rem, 1.35vw, 0.98rem);
                font-weight: 700;
            }
            .grammar-system-banner {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem 1.5rem;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 12px;
                padding: 0.8rem 1.2rem;
                margin: 1rem auto 1.5rem auto;
                max-width: 820px;
            }
            .grammar-system-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.95rem;
            }
            .grammar-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                display: inline-block;
                flex-shrink: 0;
            }

            .ans-green { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid #22c55e; }
            .ans-red { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid #ef4444; }
            .ans-orange { background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid #f97316; }
            .ans-blue { background: rgba(2, 132, 199, 0.15); color: #60a5fa; border: 1px solid #0284c7; }
            .ans-purple { background: rgba(139, 92, 246, 0.15); color: #c084fc; border: 1px solid #8b5cf6; }
            .ans-yellow { background: rgba(234, 179, 8, 0.15); color: #fde047; border: 1px solid #eab308; }
            .ans-cyan { background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid #06b6d4; }
            .ans-pink { background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid #06b6d4; }

            .bubble-1 { top: 9%; left: 16%; }
            .bubble-4 { top: 9%; right: 18%; }
            .bubble-2 { top: 48%; right: 5%; }
            .bubble-3 { bottom: 12%; left: 6%; }

            .bubble-7-holdning { top: 6%; left: 3%; }
            .bubble-7-adjektiv { top: 25%; left: 2%; }
            .bubble-7-substantiv { top: 6%; left: 36%; }
            .bubble-7-ledsaetning { top: 6%; right: 10%; }
            .bubble-7-verbum { top: 48%; right: 4%; }
            .bubble-7-maade { bottom: 18%; right: 8%; }
            .bubble-7-sted { bottom: 8%; left: 3%; }

            @media (max-width: 600px) {
                .photo-bubble { padding: 3px 6px; border-width: 1.5px; }
                .bubble-1 { top: 6%; left: 6%; }
                .bubble-4 { top: 6%; right: 6%; }
                .bubble-2 { top: 45%; right: 2%; }
                .bubble-3 { bottom: 8%; left: 2%; }
                .bubble-7-holdning { top: 4%; left: 2%; }
                .bubble-7-adjektiv { top: 22%; left: 2%; }
                .bubble-7-substantiv { top: 4%; left: 32%; }
                .bubble-7-ledsaetning { top: 4%; right: 2%; }
                .bubble-7-verbum { top: 44%; right: 2%; }
                .bubble-7-maade { bottom: 18%; right: 2%; }
                .bubble-7-sted { bottom: 4%; left: 2%; }
            }

            /* Simple Steps 4-Card Grid */
            .simple-steps-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 1rem;
                margin: 1.5rem 0;
            }
            .simple-step-card {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 14px;
                padding: 1.2rem;
                border: 2px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: flex-start;
                gap: 0.9rem;
                transition: transform 0.2s ease;
            }
            .simple-step-card:hover {
                transform: translateY(-2px);
            }
            .simple-step-card.step-green { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
            .simple-step-card.step-red { border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
            .simple-step-card.step-orange { border-color: #f97316; background: rgba(249, 115, 22, 0.1); }
            .simple-step-card.step-blue { border-color: #0284c7; background: rgba(2, 132, 199, 0.1); }
            .simple-step-card.step-purple { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.1); }
            .simple-step-card.step-yellow { border-color: #eab308; background: rgba(234, 179, 8, 0.1); }
            .simple-step-card.step-pink { border-color: #06b6d4; background: rgba(6, 182, 212, 0.1); }
            .simple-step-card.step-cyan { border-color: #06b6d4; background: rgba(6, 182, 212, 0.1); }

            .step-green .step-badge { background: #22c55e; }
            .step-red .step-badge { background: #ef4444; }
            .step-orange .step-badge { background: #f97316; }
            .step-blue .step-badge { background: #0284c7; }
            .step-purple .step-badge { background: #8b5cf6; }
            .step-yellow .step-badge { background: #eab308; }
            .step-pink .step-badge { background: #06b6d4; }
            .step-cyan .step-badge { background: #06b6d4; }

            .step-card-content {
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
            }
            .step-q {
                font-size: 0.95rem;
                color: #b0c4ba;
                line-height: 1.3;
            }
            .step-ans {
                font-size: 1.25rem;
                font-weight: bold;
                color: #fff;
            }

            /* Finished Sentence Banner */
            .finished-sentence-banner {
                background: linear-gradient(135deg, rgba(30, 59, 37, 0.9) 0%, rgba(20, 40, 25, 0.9) 100%);
                border: 2px solid #22c55e;
                border-radius: 16px;
                padding: 1.5rem;
                text-align: center;
                margin: 2rem 0;
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
            .banner-label {
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #4ade80;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            .banner-sentence {
                font-size: 1.65rem;
                font-weight: bold;
                color: #fff;
                margin-bottom: 1.2rem;
                line-height: 1.4;
            }
            .word-green { color: #4ade80; }
            .word-red { color: #f87171; }
            .word-orange { color: #fb923c; }
            .word-blue { color: #60a5fa; }
            .word-purple { color: #c084fc; }
            .word-yellow { color: #fde047; }
            .word-pink { color: #38bdf8; }
            .word-cyan { color: #38bdf8; }

            .listen-btn {
                background: #4CAF50;
                border: none;
                color: #fff;
                padding: 0.7rem 1.4rem;
                border-radius: 25px;
                font-size: 1.05rem;
                font-weight: bold;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                transition: all 0.2s ease;
            }
            .listen-btn:hover {
                background: #43A047;
                transform: scale(1.03);
            }
            .listen-btn-small {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #fff;
                padding: 0.45rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                transition: all 0.2s;
            }
            .listen-btn-small:hover {
                background: rgba(255, 255, 255, 0.25);
            }

            /* Section Divider */
            .section-divider {
                text-align: center;
                margin: 3rem 0 1.5rem 0;
            }
            .section-divider h2 {
                color: #FFD54F;
                font-size: 1.6rem;
                margin-bottom: 0.5rem;
            }
            .section-divider p {
                color: #b0c4ba;
                font-size: 1.05rem;
            }

            /* Exercise Sub-Tabs */
            .exercise-sub-tabs {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                justify-content: center;
            }
            .ex-sub-tab {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #b0c4ba;
                padding: 0.6rem 1.2rem;
                border-radius: 20px;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .ex-sub-tab:hover {
                color: #fff;
                background: rgba(255, 255, 255, 0.12);
            }
            .ex-sub-tab.active {
                background: #2196F3;
                border-color: #2196F3;
                color: #fff;
                font-weight: bold;
            }

            /* Step Builder */
            .step-builder-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            .builder-questions-list {
                display: flex;
                flex-direction: column;
                gap: 1.2rem;
            }
            .builder-q-row {
                background: rgba(0, 0, 0, 0.2);
                padding: 1rem;
                border-radius: 12px;
                border-left: 4px solid #fff;
            }
            .builder-q-row.step-green { border-left-color: #22c55e; }
            .builder-q-row.step-red { border-left-color: #ef4444; }
            .builder-q-row.step-orange { border-left-color: #f97316; }
            .builder-q-row.step-blue { border-left-color: #0284c7; }
            .builder-q-row.step-purple { border-left-color: #8b5cf6; }
            .builder-q-row.step-yellow { border-left-color: #eab308; }
            .builder-q-row.step-pink { border-left-color: #06b6d4; }
            .builder-q-row.step-cyan { border-left-color: #06b6d4; }

            .builder-q-title {
                font-size: 1rem;
                font-weight: 600;
                color: #e0e0e0;
                margin-bottom: 0.75rem;
            }
            .builder-btn-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
            }
            .chip-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #e0e0e0;
                padding: 0.5rem 1rem;
                border-radius: 18px;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .chip-btn:hover {
                background: rgba(255, 255, 255, 0.18);
            }
            .chip-btn.selected {
                background: #4CAF50;
                border-color: #4CAF50;
                color: #fff;
                font-weight: bold;
                transform: scale(1.04);
            }

            .builder-live-sentence {
                background: #1e3b25;
                border: 2px solid #4CAF50;
                border-radius: 14px;
                padding: 1.4rem;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.6rem;
            }
            .live-label {
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #81C784;
                font-weight: bold;
            }
            .live-text {
                font-size: 1.5rem;
                font-weight: bold;
                color: #fff;
            }

            /* Puzzle Exercise */
            .puzzle-wrapper {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.5rem;
            }
            .puzzle-header {
                text-align: center;
                margin-bottom: 1.5rem;
            }
            .puzzle-pills-row {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 1rem;
            }
            .puzzle-pill {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.08);
                color: #e0e0e0;
                font-size: 0.95rem;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            .puzzle-pill:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.08);
            }
            .puzzle-pill.active {
                border-color: #2196F3;
                background: #2196F3;
                color: #fff;
                transform: scale(1.12);
                box-shadow: 0 2px 8px rgba(33, 150, 243, 0.4);
            }
            .puzzle-pill.completed {
                border-color: #4CAF50;
                background: #2E7D32;
                color: #fff;
            }
            .puzzle-pill.completed.active {
                border-color: #81C784;
                background: #4CAF50;
                box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);
            }
            .puzzle-counter {
                font-size: 0.9rem;
                color: #FFD54F;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 0.3rem;
            }
            .puzzle-guide {
                font-size: 1.15rem;
                color: #e0e0e0;
            }
            .puzzle-guide small {
                color: #b0c4ba;
                font-size: 0.95rem;
            }

            .puzzle-slots {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 0.9rem;
                margin-bottom: 1.8rem;
            }
            .puzzle-slot {
                background: rgba(0, 0, 0, 0.3);
                border: 2px dashed rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                min-height: 70px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.6rem;
                text-align: center;
                transition: all 0.25s;
                position: relative;
            }
            .puzzle-slot.filled {
                background: rgba(76, 175, 80, 0.15);
                border-style: solid;
                border-color: #4CAF50;
                cursor: pointer;
            }
            .puzzle-slot.slot-0.filled { border-color: #22c55e; background: rgba(34, 197, 94, 0.15); }
            .puzzle-slot.slot-1.filled { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); }
            .puzzle-slot.slot-2.filled { border-color: #0284c7; background: rgba(2, 132, 199, 0.15); }
            .puzzle-slot.slot-3.filled { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.15); }

            .puzzle-slots-7 {
                grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            }
            .puzzle-slot.slot7-orange.filled { border-color: #f97316; background: rgba(249, 115, 22, 0.15); }
            .puzzle-slot.slot7-green.filled { border-color: #22c55e; background: rgba(34, 197, 94, 0.15); }
            .puzzle-slot.slot7-red.filled { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); }
            .puzzle-slot.slot7-yellow.filled { border-color: #eab308; background: rgba(234, 179, 8, 0.15); }
            .puzzle-slot.slot7-pink.filled { border-color: #06b6d4; background: rgba(6, 182, 212, 0.15); }
            .puzzle-slot.slot7-blue.filled { border-color: #0284c7; background: rgba(2, 132, 199, 0.15); }
            .puzzle-slot.slot7-purple.filled { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.15); }

            .slot-hint {
                font-size: 0.85rem;
                color: #888;
                font-style: italic;
            }
            .slot-number {
                position: absolute;
                top: 4px;
                left: 8px;
                font-size: 0.75rem;
                font-weight: bold;
                opacity: 0.7;
            }
            .slot-text {
                font-size: 1.15rem;
                font-weight: bold;
                color: #fff;
            }
            .slot-remove {
                position: absolute;
                top: 4px;
                right: 8px;
                font-size: 0.75rem;
                color: #ff6b6b;
            }

            .puzzle-bank {
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;
                justify-content: center;
                margin-bottom: 1.5rem;
            }
            .puzzle-word-btn {
                background: #37474F;
                border: 2px solid #546E7A;
                color: #fff;
                padding: 0.7rem 1.4rem;
                border-radius: 25px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            .puzzle-word-btn:hover:not(:disabled) {
                background: #455A64;
                transform: scale(1.05);
            }
            .puzzle-word-btn:disabled {
                opacity: 0.3;
                cursor: not-allowed;
                border-style: dashed;
            }

            .puzzle-feedback {
                text-align: center;
                min-height: 60px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.8rem;
            }
            .feedback-msg {
                font-size: 1.25rem;
                padding: 0.8rem 1.5rem;
                border-radius: 12px;
                line-height: 1.4;
            }
            .feedback-msg.success {
                background: rgba(76, 175, 80, 0.2);
                border: 1px solid #4CAF50;
                color: #81C784;
            }
            .feedback-msg.error {
                background: rgba(244, 67, 54, 0.2);
                border: 1px solid #F44336;
                color: #EF9A9A;
            }
            .puzzle-action-row {
                display: flex;
                gap: 0.8rem;
                align-items: center;
            }
            .next-task-btn, .retry-task-btn {
                background: #2196F3;
                border: none;
                color: #fff;
                padding: 0.6rem 1.3rem;
                border-radius: 20px;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s;
            }
            .next-task-btn:hover { background: #1976D2; }
            .retry-task-btn { background: #FF9800; }
            .retry-task-btn:hover { background: #F57C00; }

            /* 7-step Styles from Part 2 */
            .foto-timeline { display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem 0 3rem 0; }
            .foto-card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; animation: slideUp 0.4s ease forwards; opacity: 0; transform: translateY(20px); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
            
            .foto-card:nth-child(1) { animation-delay: 0.1s; border-left: 4px solid #f97316; }
            .foto-card:nth-child(2) { animation-delay: 0.2s; border-left: 4px solid #22c55e; }
            .foto-card:nth-child(3) { animation-delay: 0.3s; border-left: 4px solid #ef4444; }
            .foto-card:nth-child(4) { animation-delay: 0.4s; border-left: 4px solid #eab308; }
            .foto-card:nth-child(5) { animation-delay: 0.5s; border-left: 4px solid #06b6d4; }
            .foto-card:nth-child(6) { animation-delay: 0.6s; border-left: 4px solid #0284c7; }
            .foto-card:nth-child(7) { animation-delay: 0.7s; border-left: 4px solid #8b5cf6; }

            .foto-card-header { display: flex; gap: 1.5rem; align-items: center; }
            .foto-icon { font-size: 3.5rem; min-width: 70px; text-align: center; background: rgba(255,255,255,0.1); border-radius: 50%; height: 70px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            @media (max-width: 600px) {
                .foto-icon { font-size: 2.5rem; min-width: 50px; height: 50px; }
                .foto-card-header { gap: 1rem; }
            }
            
            .foto-titles h2 { margin: 0 0 0.4rem 0; font-size: 1.3rem; color: #fff; }
            .foto-question { font-style: italic; color: #b0c4ba; font-size: 1.1rem; }
            
            .foto-body { background: rgba(0,0,0,0.2); padding: 1.2rem; border-radius: 12px; font-size: 1.05rem; line-height: 1.5; color: #e0e0e0; display: flex; flex-direction: column; gap: 0.8rem; }
            .foto-role strong, .foto-examples strong { color: #fff; font-weight: 600; }
            
            .foto-highlight { background: rgba(76, 175, 80, 0.1); border: 2px dashed rgba(76, 175, 80, 0.4); padding: 1rem; border-radius: 12px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.5rem; }
            .foto-highlight-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #4CAF50; font-weight: bold; }
            .foto-highlight-text { font-size: 1.5rem; font-weight: bold; color: #fff; }

            @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }

            .interactive-foto-box { background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 1.5rem; margin-top: 1rem; margin-bottom: 3rem; }
            .interactive-sentence { position: sticky; bottom: 1rem; z-index: 100; background: #1e3b25; border: 2px solid #4CAF50; border-radius: 12px; padding: 1.5rem; font-size: 1.6rem; font-weight: bold; color: #fff; text-align: center; margin-top: 1.5rem; margin-bottom: 0; min-height: 80px; display: flex; align-items: center; justify-content: center; box-shadow: 0 -4px 20px rgba(0,0,0,0.4); transition: all 0.3s; }
            .interactive-sentence.pop { animation: sentencePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .interactive-steps { display: flex; flex-direction: column; gap: 1rem; max-height: 500px; overflow-y: auto; padding-right: 0.5rem; }
            .builder-step { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1rem; opacity: 0.6; transition: all 0.3s; }
            .builder-step.active { opacity: 1; border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); transform: scale(1.02); margin: 0.5rem 0; }
            .builder-step-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.5rem; }
            .builder-icon { font-size: 1.5rem; }
            .builder-title { font-weight: bold; color: #fff; font-size: 1.1rem; }
            .builder-question { font-style: italic; color: #b0c4ba; margin-bottom: 1rem; font-size: 0.95rem; }
            .builder-options { display: flex; flex-wrap: wrap; gap: 0.8rem; }
            .builder-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #e0e0e0; padding: 0.6rem 1.2rem; border-radius: 20px; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
            .builder-btn:hover { background: rgba(255,255,255,0.2); }
            .builder-btn.selected { background: #4CAF50; border-color: #4CAF50; color: #fff; font-weight: bold; transform: scale(1.05); }
            @keyframes sentencePop { 0% { transform: scale(0.95); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
        `;
        document.head.appendChild(styles);
    }
}
