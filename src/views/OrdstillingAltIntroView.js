import { getTranslation, getLang } from '../utils/i18n.js';
import { createGrammarToggle } from '../utils/grammarToggle.js';
import { createCleanIllustrationToggle } from '../utils/cleanIllustrationToggle.js';
import { altIntroBuilderWordTranslations } from '../utils/alt_intro_translations.js';

export function renderOrdstillingAltIntroView(container, navigateFn, type = 'tid') {
    if (type === 'tid') {
        renderFokusPaaTid(container, navigateFn);
        return;
    }
    if (type === 'konjunktion') {
        renderFokusPaaKonjunktion(container, navigateFn);
        return;
    }
    if (type === 'sted') {
        renderFokusPaaSted(container, navigateFn);
        return;
    }
    if (type === 'holdning') {
        renderFokusPaaHoldning(container, navigateFn);
        return;
    }

    // Fallback for other types
    renderClassicAltIntro(container, navigateFn, type);
}

// Helper: TTS speech
function speakDanish(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'da-DK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// ========================================================
// --- FOKUS PÅ STED: 4 ENKLE SPØRGSMÅL (IDENTISK MED 1. DEL)
// ========================================================
function renderFokusPaaSted(container, navigateFn) {
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
    title.textContent = "Fokus på sted";
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

    // Hero Explanation Card
    const introCard = document.createElement('div');
    introCard.className = 'intro-hero-card';
    introCard.innerHTML = `
        <h2>Når stedet kommer først i sætningen</h2>
        <p class="hero-desc">
            Ligesom før beskriver vi fotografiet ved at svare på 4 enkle spørgsmål.
            Når vi vælger at starte med <strong>stedet</strong>, gælder den vigtigste grundregel på dansk:<br>
            <strong>Handlingen (hvad laver personen?) skal ALTID stå på 2. plads!</strong><br>
            Derfor bytter handlingen og personen plads:
        </p>
    `;
    viewContainer.appendChild(introCard);

    // Hero Image with 4 frames & dynamic overlay (Sted first)
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'hero-image-wrapper photo-overlay-container';
    imgWrapper.innerHTML = `
        <div class="photo-overlay-wrap">
            <img src="assets/foto_metafor_clean.jpg" alt="Fokus på sted: På gaden cykler en kvinde om morgenen" class="hero-image">
            <svg class="photo-overlay-svg" viewBox="0 0 1376 768" preserveAspectRatio="none">
                <defs>
                    <marker id="arrowhead-sted-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                    </marker>
                    <marker id="arrowhead-sted-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                    </marker>
                    <marker id="arrowhead-sted-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
                    </marker>
                    <marker id="arrowhead-sted-purple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
                    </marker>
                </defs>
                <!-- Arrow 1: Fra Boks 1 (Sted) til gaden -->
                <line x1="300" y1="600" x2="520" y2="610" stroke="#0284c7" stroke-width="4" marker-end="url(#arrowhead-sted-blue)" />
                <!-- Arrow 2: Fra Boks 2 (Handling) til cykel/pedaler -->
                <line x1="880" y1="450" x2="740" y2="480" stroke="#ef4444" stroke-width="4" marker-end="url(#arrowhead-sted-red)" />
                <!-- Arrow 3: Fra Boks 3 (Hvem/hvad - Subjekt) til kvinde -->
                <line x1="430" y1="130" x2="620" y2="340" stroke="#22c55e" stroke-width="4" marker-end="url(#arrowhead-sted-green)" />
                <!-- Arrow 4: Fra Boks 4 (Hvornår - tid) til himmel/bygning -->
                <line x1="1130" y1="120" x2="1180" y2="150" stroke="#8b5cf6" stroke-width="4" marker-end="url(#arrowhead-sted-purple)" />
            </svg>
            <!-- Box 1: Hvor sker det? (Sted forrest) -->
            <div class="photo-bubble bubble-3">
                <div class="bubble-q">1. Hvor sker det?</div>
                <div class="bubble-ans ans-blue">På gaden</div>
            </div>
            <!-- Box 2: Hvad laver personen eller tingen? (Handlingen nr. 2!) -->
            <div class="photo-bubble bubble-2">
                <div class="bubble-q">2. Hvad laver personen?</div>
                <div class="bubble-ans ans-red">cykler</div>
            </div>
            <!-- Box 3: Hvem eller hvad taler vi om? (Subjekt nr. 3) -->
            <div class="photo-bubble bubble-1">
                <div class="bubble-q">3. Hvem taler vi om?</div>
                <div class="bubble-ans ans-green">en kvinde</div>
            </div>
            <!-- Box 4: Hvornår sker det? -->
            <div class="photo-bubble bubble-4">
                <div class="bubble-q">4. Hvornår sker det?</div>
                <div class="bubble-ans ans-purple">om morgenen</div>
            </div>
        </div>
    `;
    const photoWrap = imgWrapper.querySelector('.photo-overlay-wrap');
    const toggleBar = createCleanIllustrationToggle(photoWrap);
    imgWrapper.insertBefore(toggleBar, photoWrap);

    viewContainer.appendChild(imgWrapper);

    // 4-Step Overview Grid
    const stepGrid = document.createElement('div');
    stepGrid.className = 'simple-steps-grid';

    const stepItems = [
        {
            num: '1',
            q: 'Hvor sker det?',
            ans: 'På gaden',
            colorClass: 'step-blue',
            icon: '📍',
            note: 'Stedet sættes forrest',
            grammar: 'Præposition (sted)'
        },
        {
            num: '2',
            q: 'Hvad laver personen eller tingen?',
            ans: 'cykler',
            colorClass: 'step-red',
            icon: '🚲',
            note: 'Handlingen SKAL være nr. 2!',
            grammar: 'Verbum (inversion: 2. plads!)'
        },
        {
            num: '3',
            q: 'Hvad eller hvem taler vi om?',
            ans: 'en kvinde',
            colorClass: 'step-green',
            icon: '👤',
            note: 'Personen rykker om bagved',
            grammar: 'Substantiv / Pronomen (subjekt)'
        },
        {
            num: '4',
            q: 'Hvornår sker det?',
            ans: 'om morgenen',
            colorClass: 'step-purple',
            icon: '⏰',
            note: 'Tiden kommer til sidst',
            grammar: 'Tidsadverbium'
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
                <small style="color: #94a3b8; font-size: 0.8rem;">${item.note}</small>
                <div class="grammar-badge">🏷️ ${item.grammar}</div>
            </div>
        `;
        stepGrid.appendChild(card);
    });
    viewContainer.appendChild(stepGrid);

    // Result sentence banner
    const resultBox = document.createElement('div');
    resultBox.className = 'finished-sentence-banner';
    resultBox.innerHTML = `
        <div class="banner-label">Den færdige sætning:</div>
        <div class="banner-sentence">
            <span class="word-blue">På gaden</span> 
            <span class="word-red">cykler</span> 
            <span class="word-green">en kvinde</span> 
            <span class="word-purple">om morgenen</span>.
        </div>
        <button class="listen-btn" title="Hør udtale">
            <span>🔊</span> Hør sætningen
        </button>
    `;
    const listenBtn = resultBox.querySelector('.listen-btn');
    listenBtn.onclick = () => speakDanish("På gaden cykler en kvinde om morgenen");
    viewContainer.appendChild(resultBox);

    // --- PRØV SELV AT LAVE EN SÆTNING ---
    const tryHeader = document.createElement('div');
    tryHeader.className = 'section-divider';
    tryHeader.innerHTML = `
        <h2>✍️ Prøv selv at lave en sætning med fokus på sted</h2>
        <p>Husk: Stedet kommer først, og handlingen er ALTID nummer 2!</p>
    `;
    viewContainer.appendChild(tryHeader);

    // Sub-tabs: 1) Trin-for-trin bygger 2) Puslespil
    const exerciseTabs = document.createElement('div');
    exerciseTabs.className = 'exercise-sub-tabs';
    const ex1TabBtn = document.createElement('button');
    ex1TabBtn.className = 'ex-sub-tab active';
    ex1TabBtn.textContent = 'Trin-for-trin bygger';

    const ex2TabBtn = document.createElement('button');
    ex2TabBtn.className = 'ex-sub-tab';
    ex2TabBtn.textContent = 'Puslespil: Rigtig rækkefølge';

    exerciseTabs.appendChild(ex1TabBtn);
    exerciseTabs.appendChild(ex2TabBtn);
    viewContainer.appendChild(exerciseTabs);

    const builderContainer = document.createElement('div');
    builderContainer.className = 'exercise-panel active';

    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'exercise-panel';
    puzzleContainer.style.display = 'none';

    viewContainer.appendChild(builderContainer);
    viewContainer.appendChild(puzzleContainer);

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
    setupStedStepBuilder(builderContainer);

    // --- EXERCISE 2: PUZZLE ORDERING ---
    setupStedPuzzleExercise(puzzleContainer);

    container.appendChild(viewContainer);
    ensureIntroStyles();
}

// Step builder with Place first
function setupStedStepBuilder(container) {
    const categories = [
        {
            q: "1. Hvor sker det? (Stedet forrest)",
            colorClass: "step-blue",
            grammar: "Præposition (sted)",
            options: ["På gaden", "I parken", "På skolen", "Derhjemme", "I haven", "På caféen"]
        },
        {
            q: "2. Hvad laver personen eller tingen? (Handlingen er altid nr. 2!)",
            colorClass: "step-red",
            grammar: "Verbum (inversion)",
            options: ["cykler", "løber", "arbejder", "sover", "kører", "sidder"]
        },
        {
            q: "3. Hvad eller hvem taler vi om? (Personen/tingen)",
            colorClass: "step-green",
            grammar: "Substantiv / Pronomen",
            options: ["en kvinde", "en mand", "læreren", "katten", "bussen", "folk"]
        },
        {
            q: "4. Hvornår sker det? (Tiden til sidst)",
            colorClass: "step-purple",
            grammar: "Tidsadverbium",
            options: ["om morgenen", "om aftenen", "hver dag", "lige nu", "i dag", "om natten"]
        }
    ];

    let selections = ["På gaden", "cykler", "en kvinde", "om morgenen"];

    const card = document.createElement('div');
    card.className = 'step-builder-card';

    const outputBox = document.createElement('div');
    outputBox.className = 'builder-live-sentence';

    function updateLiveSentence() {
        outputBox.innerHTML = `
            <div class="live-label">Din sætning med fokus på sted:</div>
            <div class="live-text">
                <span class="word-blue">${selections[0]}</span> 
                <span class="word-red">${selections[1]}</span> 
                <span class="word-green">${selections[2]}</span> 
                <span class="word-purple">${selections[3]}</span>.
            </div>
            <button class="listen-btn-small" title="Lyt">🔊 Hør udtale</button>
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

// 10 Puzzle tasks with Place first
function setupStedPuzzleExercise(container) {
    const tasks = [
        {
            correct: ["På gaden", "cykler", "en kvinde", "om morgenen"],
            scrambled: ["om morgenen", "På gaden", "en kvinde", "cykler"]
        },
        {
            correct: ["I parken", "løber", "en mand", "hver dag"],
            scrambled: ["løber", "hver dag", "I parken", "en mand"]
        },
        {
            correct: ["På skolen", "arbejder", "læreren", "i dag"],
            scrambled: ["læreren", "På skolen", "i dag", "arbejder"]
        },
        {
            correct: ["I sengen", "sover", "babyen", "lige nu"],
            scrambled: ["lige nu", "sover", "I sengen", "babyen"]
        },
        {
            correct: ["I sofaen", "sover", "katten", "om natten"],
            scrambled: ["katten", "om natten", "sover", "I sofaen"]
        },
        {
            correct: ["På stationen", "ankommer", "toget", "klokken otte"],
            scrambled: ["klokken otte", "På stationen", "ankommer", "toget"]
        },
        {
            correct: ["I haven", "leger", "børnene", "om eftermiddagen"],
            scrambled: ["om eftermiddagen", "børnene", "I haven", "leger"]
        },
        {
            correct: ["På vejen", "kører", "bussen", "lige nu"],
            scrambled: ["bussen", "På vejen", "lige nu", "kører"]
        },
        {
            correct: ["I svømmehallen", "svømmer", "pigen", "i dag"],
            scrambled: ["i dag", "svømmer", "pigen", "I svømmehallen"]
        },
        {
            correct: ["På caféen", "sidder", "folk", "om morgenen"],
            scrambled: ["folk", "sidder", "om morgenen", "På caféen"]
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
            pill.title = `Gå til opgave ${tIdx + 1}`;
            pill.onclick = () => {
                currentTaskIdx = tIdx;
                renderCurrentTask();
            };
            pillsRow.appendChild(pill);
        });
        header.appendChild(pillsRow);

        const counterEl = document.createElement('div');
        counterEl.className = 'puzzle-counter';
        counterEl.textContent = `Opgave ${currentTaskIdx + 1} af ${tasks.length}`;
        header.appendChild(counterEl);

        const guideEl = document.createElement('div');
        guideEl.className = 'puzzle-guide';
        guideEl.innerHTML = `
            Klik på ordene i den rigtige rækkefølge med fokus på sted:
            <br><small>1. Hvor? ➔ 2. Hvad sker der? ➔ 3. Hvem/hvad? ➔ 4. Hvornår?</small>
        `;
        header.appendChild(guideEl);

        puzzleWrapper.appendChild(header);

        // Slots display
        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'puzzle-slots';

        const slotPrompts = [
            { text: "1. Hvor? (Sted)", grammar: "Præposition (sted)" },
            { text: "2. Hvad laver? (Handling)", grammar: "Verbum (2. plads)" },
            { text: "3. Hvem / hvad? (Person)", grammar: "Substantiv" },
            { text: "4. Hvornår? (Tid)", grammar: "Tidsadverbium" }
        ];

        slotPrompts.forEach((promptItem, idx) => {
            const slot = document.createElement('div');
            const colorClass = idx === 0 ? 'sted-slot-blue' : idx === 1 ? 'sted-slot-red' : idx === 2 ? 'sted-slot-green' : 'sted-slot-purple';
            slot.className = `puzzle-slot ${colorClass}`;
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
            const sentence = `${userSlots[0]} ${userSlots[1]} ${userSlots[2]} ${userSlots[3]}.`;

            if (isCorrect) {
                completedTasks.add(currentTaskIdx);
                pillsRow.querySelectorAll('.puzzle-pill').forEach((pill, idx) => {
                    if (completedTasks.has(idx)) pill.classList.add('completed');
                });

                feedbackBox.innerHTML = `
                    <div class="feedback-msg success">
                        🎉 Rigtigt! "<strong>${sentence}</strong>"
                    </div>
                    <div class="puzzle-action-row">
                        <button class="listen-btn-small" id="puzzle-listen-btn">🔊 Hør udtale</button>
                        <button class="next-task-btn" id="puzzle-next-btn">
                            ${currentTaskIdx < tasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra 🔄'}
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
                        Ikke helt rigtigt endnu. Husk rækkefølgen: Stedet først (1) ➔ Handlingen ALTID som nr. 2!
                    </div>
                    <button class="retry-task-btn" id="puzzle-retry-btn">Prøv igen 🔄</button>
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

// ========================================================
// --- FOKUS PÅ TID: 4 ENKLE SPØRGSMÅL (IDENTISK MED 1. DEL)
// ========================================================
function renderFokusPaaTid(container, navigateFn) {
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
    title.textContent = getTranslation('tid_page_title');
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

    // Hero Explanation Card
    const introCard = document.createElement('div');
    introCard.className = 'intro-hero-card';
    introCard.innerHTML = `
        <h2>${getTranslation('tid_hero_title')}</h2>
        <p class="hero-desc">
            ${getTranslation('tid_hero_desc')}
        </p>
    `;
    viewContainer.appendChild(introCard);

    // Hero Image with 4 multilingual frames & dynamic overlay (time first)
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'hero-image-wrapper photo-overlay-container';
    imgWrapper.innerHTML = `
        <div class="photo-overlay-wrap">
            <img src="assets/foto_metafor_clean.jpg" alt="${getTranslation('tid_hero_img_alt')}" class="hero-image">
            <svg class="photo-overlay-svg" viewBox="0 0 1376 768" preserveAspectRatio="none">
                <defs>
                    <marker id="arrowhead-tid-purple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
                    </marker>
                    <marker id="arrowhead-tid-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                    </marker>
                    <marker id="arrowhead-tid-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
                    </marker>
                    <marker id="arrowhead-tid-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                    </marker>
                </defs>
                <!-- Arrow 1: Fra Boks 1 (Hvornår - tid) til himmel/bygning -->
                <line x1="1130" y1="120" x2="1180" y2="150" stroke="#8b5cf6" stroke-width="4" marker-end="url(#arrowhead-tid-purple)" />
                <!-- Arrow 2: Fra Boks 2 (Handling) til cykel/pedaler -->
                <line x1="880" y1="450" x2="740" y2="480" stroke="#ef4444" stroke-width="4" marker-end="url(#arrowhead-tid-red)" />
                <!-- Arrow 3: Fra Boks 3 (Hvem/hvad - Subjekt) til kvinde -->
                <line x1="430" y1="130" x2="620" y2="340" stroke="#22c55e" stroke-width="4" marker-end="url(#arrowhead-tid-green)" />
                <!-- Arrow 4: Fra Boks 4 (Sted) til gaden -->
                <line x1="300" y1="600" x2="520" y2="610" stroke="#0284c7" stroke-width="4" marker-end="url(#arrowhead-tid-blue)" />
            </svg>
            <!-- Box 1: Hvornår sker det? (Tid forrest) -->
            <div class="photo-bubble bubble-4">
                <div class="bubble-q">1. ${getTranslation('tid_q1')}</div>
                <div class="bubble-ans ans-purple">Om morgenen</div>
            </div>
            <!-- Box 2: Hvad laver personen eller tingen? (Handlingen er altid nr. 2!) -->
            <div class="photo-bubble bubble-2">
                <div class="bubble-q">2. ${getTranslation('tid_q2')}</div>
                <div class="bubble-ans ans-red">cykler</div>
            </div>
            <!-- Box 3: Hvad eller hvem taler vi om? (Personen rykker bagved) -->
            <div class="photo-bubble bubble-1">
                <div class="bubble-q">3. ${getTranslation('tid_q3')}</div>
                <div class="bubble-ans ans-green">en kvinde</div>
            </div>
            <!-- Box 4: Hvor sker det? (Stedet til sidst) -->
            <div class="photo-bubble bubble-3">
                <div class="bubble-q">4. ${getTranslation('tid_q4')}</div>
                <div class="bubble-ans ans-blue">på gaden</div>
            </div>
        </div>
    `;
    const photoWrap = imgWrapper.querySelector('.photo-overlay-wrap');
    const toggleBar = createCleanIllustrationToggle(photoWrap);
    imgWrapper.insertBefore(toggleBar, photoWrap);

    viewContainer.appendChild(imgWrapper);

    // 4-Step Overview Grid
    const stepGrid = document.createElement('div');
    stepGrid.className = 'simple-steps-grid';

    const stepItems = [
        {
            num: '1',
            q: getTranslation('tid_q1'),
            ans: 'Om morgenen',
            colorClass: 'step-purple',
            icon: '⏰',
            note: getTranslation('tid_note_1'),
            grammar: getTranslation('tid_g1')
        },
        {
            num: '2',
            q: getTranslation('tid_q2'),
            ans: 'cykler',
            colorClass: 'step-red',
            icon: '🚲',
            note: getTranslation('tid_note_2'),
            grammar: getTranslation('tid_g2')
        },
        {
            num: '3',
            q: getTranslation('tid_q3'),
            ans: 'en kvinde',
            colorClass: 'step-green',
            icon: '👤',
            note: getTranslation('tid_note_3'),
            grammar: getTranslation('tid_g3')
        },
        {
            num: '4',
            q: getTranslation('tid_q4'),
            ans: 'på gaden',
            colorClass: 'step-blue',
            icon: '📍',
            note: getTranslation('tid_note_4'),
            grammar: getTranslation('tid_g4')
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
                <small style="color: #94a3b8; font-size: 0.8rem;">${item.note}</small>
                <div class="grammar-badge">🏷️ ${item.grammar}</div>
            </div>
        `;
        stepGrid.appendChild(card);
    });
    viewContainer.appendChild(stepGrid);

    // Result sentence banner
    const resultBox = document.createElement('div');
    resultBox.className = 'finished-sentence-banner';
    resultBox.innerHTML = `
        <div class="banner-label">${getTranslation('tid_finished_label')}</div>
        <div class="banner-sentence">
            <span class="word-purple">Om morgenen</span> 
            <span class="word-red">cykler</span> 
            <span class="word-green">en kvinde</span> 
            <span class="word-blue">på gaden</span>.
        </div>
        ${getLang() !== 'da' ? `<div class="banner-sentence-trans" style="font-size: 1.05rem; color: #cbd5e1; font-style: italic; margin-top: 0.4rem; margin-bottom: 0.8rem;">"${getTranslation('tid_s0')}"</div>` : ''}
        <button class="listen-btn" title="${getTranslation('tid_listen_btn')}">
            <span>🔊</span> ${getTranslation('tid_listen_btn')}
        </button>
    `;
    const listenBtn = resultBox.querySelector('.listen-btn');
    listenBtn.onclick = () => speakDanish("Om morgenen cykler en kvinde på gaden");
    viewContainer.appendChild(resultBox);

    // --- PRØV SELV AT LAVE EN SÆTNING ---
    const tryHeader = document.createElement('div');
    tryHeader.className = 'section-divider';
    tryHeader.innerHTML = `
        <h2>${getTranslation('tid_try_title')}</h2>
        <p>${getTranslation('tid_try_desc')}</p>
    `;
    viewContainer.appendChild(tryHeader);

    // Sub-tabs: 1) Trin-for-trin bygger 2) Puslespil
    const exerciseTabs = document.createElement('div');
    exerciseTabs.className = 'exercise-sub-tabs';
    const ex1TabBtn = document.createElement('button');
    ex1TabBtn.className = 'ex-sub-tab active';
    ex1TabBtn.textContent = getTranslation('tid_tab_builder');

    const ex2TabBtn = document.createElement('button');
    ex2TabBtn.className = 'ex-sub-tab';
    ex2TabBtn.textContent = getTranslation('tid_tab_puzzle');

    exerciseTabs.appendChild(ex1TabBtn);
    exerciseTabs.appendChild(ex2TabBtn);
    viewContainer.appendChild(exerciseTabs);

    const builderContainer = document.createElement('div');
    builderContainer.className = 'exercise-panel active';

    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'exercise-panel';
    puzzleContainer.style.display = 'none';

    viewContainer.appendChild(builderContainer);
    viewContainer.appendChild(puzzleContainer);

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

    setupTidStepBuilder(builderContainer);
    setupTidPuzzleExercise(puzzleContainer);

    container.appendChild(viewContainer);
    ensureIntroStyles();
}

function setupTidStepBuilder(container) {
    const categories = [
        {
            q: `1. ${getTranslation('tid_q1')} (${getTranslation('tid_builder_hint_1')})`,
            colorClass: "step-purple",
            grammar: getTranslation('tid_g1'),
            options: ["Om morgenen", "Om aftenen", "Hver dag", "Lige nu", "I dag", "Om eftermiddagen"]
        },
        {
            q: `2. ${getTranslation('tid_q2')} (${getTranslation('tid_builder_hint_2')})`,
            colorClass: "step-red",
            grammar: getTranslation('tid_g2'),
            options: ["cykler", "løber", "arbejder", "sover", "kører", "venter"]
        },
        {
            q: `3. ${getTranslation('tid_q3')} (${getTranslation('tid_builder_hint_3')})`,
            colorClass: "step-green",
            grammar: getTranslation('tid_g3'),
            options: ["en kvinde", "en mand", "en hund", "læreren", "bussen", "folk"]
        },
        {
            q: `4. ${getTranslation('tid_q4')} (${getTranslation('tid_builder_hint_4')})`,
            colorClass: "step-blue",
            grammar: getTranslation('tid_g4'),
            options: ["på gaden", "i parken", "på skolen", "derhjemme", "i haven", "på vejen"]
        }
    ];

    let selections = ["Om morgenen", "cykler", "en kvinde", "på gaden"];

    const card = document.createElement('div');
    card.className = 'step-builder-card';

    const outputBox = document.createElement('div');
    outputBox.className = 'builder-live-sentence';

    function updateLiveSentence() {
        outputBox.innerHTML = `
            <div class="live-label">${getTranslation('tid_builder_live_label')}</div>
            <div class="live-text">
                <span class="word-purple">${selections[0]}</span> 
                <span class="word-red">${selections[1]}</span> 
                <span class="word-green">${selections[2]}</span> 
                <span class="word-blue">${selections[3]}</span>.
            </div>
            <button class="listen-btn-small" title="${getTranslation('tid_listen_pronunciation')}">🔊 ${getTranslation('tid_listen_pronunciation')}</button>
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
            const wordTrans = altIntroBuilderWordTranslations[getLang()]?.[opt];
            if (wordTrans && getLang() !== 'da') {
                optBtn.title = wordTrans;
            }

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

function setupTidPuzzleExercise(container) {
    const tasks = [
        {
            correct: ["Om morgenen", "cykler", "en kvinde", "på gaden"],
            scrambled: ["på gaden", "Om morgenen", "en kvinde", "cykler"]
        },
        {
            correct: ["Hver dag", "løber", "en mand", "i parken"],
            scrambled: ["en mand", "Hver dag", "i parken", "løber"]
        },
        {
            correct: ["I dag", "arbejder", "læreren", "på skolen"],
            scrambled: ["læreren", "på skolen", "I dag", "arbejder"]
        },
        {
            correct: ["Lige nu", "sover", "babyen", "i sengen"],
            scrambled: ["i sengen", "Lige nu", "sover", "babyen"]
        },
        {
            correct: ["Om natten", "sover", "katten", "i sofaen"],
            scrambled: ["katten", "Om natten", "sover", "i sofaen"]
        },
        {
            correct: ["Klokken otte", "ankommer", "toget", "på stationen"],
            scrambled: ["ankommer", "på stationen", "Klokken otte", "toget"]
        },
        {
            correct: ["Om eftermiddagen", "leger", "børnene", "i haven"],
            scrambled: ["børnene", "Om eftermiddagen", "i haven", "leger"]
        },
        {
            correct: ["Lige nu", "kører", "bussen", "på vejen"],
            scrambled: ["på vejen", "bussen", "Lige nu", "kører"]
        },
        {
            correct: ["I dag", "svømmer", "pigen", "i svømmehallen"],
            scrambled: ["svømmer", "pigen", "i svømmehallen", "I dag"]
        },
        {
            correct: ["Hver morgen", "venter", "folk", "på gaden"],
            scrambled: ["venter", "folk", "på gaden", "Hver morgen"]
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

        const pillsRow = document.createElement('div');
        pillsRow.className = 'puzzle-pills-row';
        tasks.forEach((_, tIdx) => {
            const pill = document.createElement('button');
            pill.className = `puzzle-pill ${tIdx === currentTaskIdx ? 'active' : ''} ${completedTasks.has(tIdx) ? 'completed' : ''}`;
            pill.textContent = tIdx + 1;
            pill.title = `${getTranslation('tid_puzzle_pill_title')} ${tIdx + 1}`;
            pill.onclick = () => {
                currentTaskIdx = tIdx;
                renderCurrentTask();
            };
            pillsRow.appendChild(pill);
        });
        header.appendChild(pillsRow);

        const counterEl = document.createElement('div');
        counterEl.className = 'puzzle-counter';
        counterEl.textContent = getTranslation('tid_puzzle_counter', { current: currentTaskIdx + 1, total: tasks.length });
        header.appendChild(counterEl);

        const guideEl = document.createElement('div');
        guideEl.className = 'puzzle-guide';
        guideEl.innerHTML = `
            ${getTranslation('tid_puzzle_guide')}
            <br><small>${getTranslation('tid_puzzle_guide_sub')}</small>
        `;
        header.appendChild(guideEl);

        puzzleWrapper.appendChild(header);

        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'puzzle-slots';

        const slotPrompts = [
            { text: getTranslation('tid_slot_hint_1'), grammar: getTranslation('tid_g1') },
            { text: getTranslation('tid_slot_hint_2'), grammar: getTranslation('tid_g2') },
            { text: getTranslation('tid_slot_hint_3'), grammar: getTranslation('tid_g3') },
            { text: getTranslation('tid_slot_hint_4'), grammar: getTranslation('tid_g4') }
        ];

        slotPrompts.forEach((promptItem, idx) => {
            const slot = document.createElement('div');
            const colorClass = idx === 0 ? 'tid-slot-purple' : idx === 1 ? 'tid-slot-red' : idx === 2 ? 'tid-slot-green' : 'tid-slot-blue';
            slot.className = `puzzle-slot ${colorClass}`;
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

        const bankContainer = document.createElement('div');
        bankContainer.className = 'puzzle-bank';
        puzzleWrapper.appendChild(bankContainer);

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
            const sentence = `${userSlots[0]} ${userSlots[1]} ${userSlots[2]} ${userSlots[3]}.`;

            if (isCorrect) {
                completedTasks.add(currentTaskIdx);
                pillsRow.querySelectorAll('.puzzle-pill').forEach((pill, idx) => {
                    if (completedTasks.has(idx)) pill.classList.add('completed');
                });

                const transKey = `tid_s${currentTaskIdx + 1}`;
                const transText = getLang() !== 'da' ? getTranslation(transKey) : '';

                feedbackBox.innerHTML = `
                    <div class="feedback-msg success">
                        ${getTranslation('tid_puzzle_correct')} "<strong>${sentence}</strong>"
                        ${transText ? `<div class="puzzle-trans-text" style="font-size: 1rem; color: #cbd5e1; font-style: italic; margin-top: 0.4rem;">"${transText}"</div>` : ''}
                    </div>
                    <div class="puzzle-action-row">
                        <button class="listen-btn-small" id="puzzle-listen-btn">🔊 ${getTranslation('tid_listen_pronunciation')}</button>
                        <button class="next-task-btn" id="puzzle-next-btn">
                            ${currentTaskIdx < tasks.length - 1 ? getTranslation('tid_next_task') : getTranslation('tid_start_over')}
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
                        ${getTranslation('tid_puzzle_error')}
                    </div>
                    <button class="retry-task-btn" id="puzzle-retry-btn">${getTranslation('tid_retry')}</button>
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

// ========================================================
// --- FOKUS PÅ KONJUNKTIONER: 4 ENKLE LED (INVERSION)
// ========================================================
function renderFokusPaaKonjunktion(container, navigateFn) {
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
    title.textContent = getTranslation('konj_page_title');
    viewContainer.appendChild(title);

    // Grammar Terms Toggle
    const grammarToggle = createGrammarToggle(viewContainer);
    viewContainer.appendChild(grammarToggle);

    // Grammar System Banner
    const grammarBanner = document.createElement('div');
    grammarBanner.className = 'grammar-system-banner';
    grammarBanner.innerHTML = `
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #06b6d4;"></span> <strong style="color: #38bdf8;">Konjunktion + ledsætning</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #ef4444;"></span> <strong style="color: #f87171;">Verbum</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #22c55e;"></span> <strong style="color: #4ade80;">Substantiv / Pronomen</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #0284c7;"></span> <strong style="color: #60a5fa;">Sted (Præposition)</strong></div>
        <div class="grammar-system-item"><span class="grammar-dot" style="background: #8b5cf6;"></span> <strong style="color: #c084fc;">Tid (Tidsadverbium)</strong></div>
    `;
    viewContainer.appendChild(grammarBanner);

    // Hero Explanation Card
    const introCard = document.createElement('div');
    introCard.className = 'intro-hero-card';
    introCard.innerHTML = `
        <h2>${getTranslation('konj_hero_title')}</h2>
        <p class="hero-desc">
            ${getTranslation('konj_hero_desc')}
        </p>
    `;
    viewContainer.appendChild(introCard);

    // Hero Image with 4 multilingual frames & dynamic overlay (conjunction/subclause first)
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'hero-image-wrapper photo-overlay-container';
    imgWrapper.innerHTML = `
        <div class="photo-overlay-wrap">
            <img src="assets/foto_metafor_clean.jpg" alt="${getTranslation('konj_hero_img_alt')}" class="hero-image">
            <svg class="photo-overlay-svg" viewBox="0 0 1376 768" preserveAspectRatio="none">
                <defs>
                    <marker id="arrowhead-konj-cyan" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowhead-konj-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                    </marker>
                    <marker id="arrowhead-konj-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
                    </marker>
                    <marker id="arrowhead-konj-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                    </marker>
                </defs>
                <!-- Arrow 1: Fra Boks 1 (Ledsætning) til himmel/baggrund -->
                <line x1="1130" y1="120" x2="1180" y2="150" stroke="#06b6d4" stroke-width="4" marker-end="url(#arrowhead-konj-cyan)" />
                <!-- Arrow 2: Fra Boks 2 (Handling) til cykel/pedaler -->
                <line x1="880" y1="450" x2="740" y2="480" stroke="#ef4444" stroke-width="4" marker-end="url(#arrowhead-konj-red)" />
                <!-- Arrow 3: Fra Boks 3 (Hvem/hvad - Subjekt) til kvinde -->
                <line x1="430" y1="130" x2="620" y2="340" stroke="#22c55e" stroke-width="4" marker-end="url(#arrowhead-konj-green)" />
                <!-- Arrow 4: Fra Boks 4 (Sted) til gaden -->
                <line x1="300" y1="600" x2="520" y2="610" stroke="#0284c7" stroke-width="4" marker-end="url(#arrowhead-konj-blue)" />
            </svg>
            <!-- Box 1: Hvornår eller hvorfor? (Ledsætning forrest = 1. plads!) -->
            <div class="photo-bubble bubble-4">
                <div class="bubble-q">1. ${getTranslation('konj_q1')}</div>
                <div class="bubble-ans ans-cyan">Da det regnede,</div>
            </div>
            <!-- Box 2: Hvad laver personen eller tingen? (Handlingen er altid nr. 2!) -->
            <div class="photo-bubble bubble-2">
                <div class="bubble-q">2. ${getTranslation('konj_q2')}</div>
                <div class="bubble-ans ans-red">cyklede</div>
            </div>
            <!-- Box 3: Hvad eller hvem taler vi om? (Personen rykker om bagved) -->
            <div class="photo-bubble bubble-1">
                <div class="bubble-q">3. ${getTranslation('konj_q3')}</div>
                <div class="bubble-ans ans-green">en kvinde</div>
            </div>
            <!-- Box 4: Hvor sker det? (Stedet til sidst) -->
            <div class="photo-bubble bubble-3">
                <div class="bubble-q">4. ${getTranslation('konj_q4')}</div>
                <div class="bubble-ans ans-blue">på gaden</div>
            </div>
        </div>
    `;
    const photoWrap = imgWrapper.querySelector('.photo-overlay-wrap');
    const toggleBar = createCleanIllustrationToggle(photoWrap);
    imgWrapper.insertBefore(toggleBar, photoWrap);

    viewContainer.appendChild(imgWrapper);

    // 4-Step Overview Grid
    const stepGrid = document.createElement('div');
    stepGrid.className = 'simple-steps-grid';

    const stepItems = [
        {
            num: '1',
            q: getTranslation('konj_q1'),
            ans: 'Da det regnede,',
            colorClass: 'step-cyan',
            icon: '🔗',
            note: getTranslation('konj_note_1'),
            grammar: getTranslation('konj_g1')
        },
        {
            num: '2',
            q: getTranslation('konj_q2'),
            ans: 'cyklede',
            colorClass: 'step-red',
            icon: '🚲',
            note: getTranslation('konj_note_2'),
            grammar: getTranslation('konj_g2')
        },
        {
            num: '3',
            q: getTranslation('konj_q3'),
            ans: 'en kvinde',
            colorClass: 'step-green',
            icon: '👤',
            note: getTranslation('konj_note_3'),
            grammar: getTranslation('konj_g3')
        },
        {
            num: '4',
            q: getTranslation('konj_q4'),
            ans: 'på gaden',
            colorClass: 'step-blue',
            icon: '📍',
            note: getTranslation('konj_note_4'),
            grammar: getTranslation('konj_g4')
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
                <small style="color: #94a3b8; font-size: 0.8rem;">${item.note}</small>
                <div class="grammar-badge">🏷️ ${item.grammar}</div>
            </div>
        `;
        stepGrid.appendChild(card);
    });
    viewContainer.appendChild(stepGrid);

    // Result sentence banner
    const resultBox = document.createElement('div');
    resultBox.className = 'finished-sentence-banner';
    resultBox.innerHTML = `
        <div class="banner-label">${getTranslation('konj_finished_label')}</div>
        <div class="banner-sentence">
            <span class="word-cyan">Da det regnede,</span> 
            <span class="word-red">cyklede</span> 
            <span class="word-green">en kvinde</span> 
            <span class="word-blue">på gaden</span>.
        </div>
        ${getLang() !== 'da' ? `<div class="banner-sentence-trans" style="font-size: 1.05rem; color: #cbd5e1; font-style: italic; margin-top: 0.4rem; margin-bottom: 0.8rem;">"${getTranslation('konj_s0')}"</div>` : ''}
        <button class="listen-btn" title="${getTranslation('konj_listen_btn')}">
            <span>🔊</span> ${getTranslation('konj_listen_btn')}
        </button>
    `;
    const listenBtn = resultBox.querySelector('.listen-btn');
    listenBtn.onclick = () => speakDanish("Da det regnede, cyklede en kvinde på gaden");
    viewContainer.appendChild(resultBox);

    // --- PRØV SELV AT LAVE EN SÆTNING ---
    const tryHeader = document.createElement('div');
    tryHeader.className = 'section-divider';
    tryHeader.innerHTML = `
        <h2>${getTranslation('konj_try_title')}</h2>
        <p>${getTranslation('konj_try_desc')}</p>
    `;
    viewContainer.appendChild(tryHeader);

    // Sub-tabs: 1) Trin-for-trin bygger 2) Puslespil
    const exerciseTabs = document.createElement('div');
    exerciseTabs.className = 'exercise-sub-tabs';
    const ex1TabBtn = document.createElement('button');
    ex1TabBtn.className = 'ex-sub-tab active';
    ex1TabBtn.textContent = getTranslation('konj_tab_builder');

    const ex2TabBtn = document.createElement('button');
    ex2TabBtn.className = 'ex-sub-tab';
    ex2TabBtn.textContent = getTranslation('konj_tab_puzzle');

    exerciseTabs.appendChild(ex1TabBtn);
    exerciseTabs.appendChild(ex2TabBtn);
    viewContainer.appendChild(exerciseTabs);

    const builderContainer = document.createElement('div');
    builderContainer.className = 'exercise-panel active';

    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'exercise-panel';
    puzzleContainer.style.display = 'none';

    viewContainer.appendChild(builderContainer);
    viewContainer.appendChild(puzzleContainer);

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

    setupKonjunktionStepBuilder(builderContainer);
    setupKonjunktionPuzzleExercise(puzzleContainer);

    container.appendChild(viewContainer);
    ensureIntroStyles();
}

function setupKonjunktionStepBuilder(container) {
    const categories = [
        {
            q: `1. ${getTranslation('konj_q1')} (${getTranslation('konj_builder_hint_1')})`,
            colorClass: "step-cyan",
            grammar: getTranslation('konj_g1'),
            options: ["Da det regnede,", "Når solen skinner,", "Selvom det var koldt,", "Fordi hun havde travlt,", "Hvis vejret er godt,", "Mens det sneede,"]
        },
        {
            q: `2. ${getTranslation('konj_q2')} (${getTranslation('konj_builder_hint_2')})`,
            colorClass: "step-red",
            grammar: getTranslation('konj_g2'),
            options: ["cykler", "løber", "arbejder", "kører", "venter", "drikker kaffe"]
        },
        {
            q: `3. ${getTranslation('konj_q3')} (${getTranslation('konj_builder_hint_3')})`,
            colorClass: "step-green",
            grammar: getTranslation('konj_g3'),
            options: ["en kvinde", "en mand", "en hund", "læreren", "bussen", "folk"]
        },
        {
            q: `4. ${getTranslation('konj_q4')} (${getTranslation('konj_builder_hint_4')})`,
            colorClass: "step-blue",
            grammar: getTranslation('konj_g4'),
            options: ["på gaden", "i parken", "på skolen", "på stationen", "derhjemme", "i haven"]
        }
    ];

    let selections = ["Da det regnede,", "cyklede", "en kvinde", "på gaden"];

    const card = document.createElement('div');
    card.className = 'step-builder-card';

    const outputBox = document.createElement('div');
    outputBox.className = 'builder-live-sentence';

    function updateLiveSentence() {
        outputBox.innerHTML = `
            <div class="live-label">${getTranslation('konj_builder_live_label')}</div>
            <div class="live-text">
                <span class="word-cyan">${selections[0]}</span> 
                <span class="word-red">${selections[1]}</span> 
                <span class="word-green">${selections[2]}</span> 
                <span class="word-blue">${selections[3]}</span>.
            </div>
            <button class="listen-btn-small" title="${getTranslation('konj_listen_pronunciation')}">🔊 ${getTranslation('konj_listen_pronunciation')}</button>
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
            const wordTrans = altIntroBuilderWordTranslations[getLang()]?.[opt];
            if (wordTrans && getLang() !== 'da') {
                optBtn.title = wordTrans;
            }

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

function setupKonjunktionPuzzleExercise(container) {
    const tasks = [
        {
            correct: ["Da det regnede,", "cyklede", "en kvinde", "på gaden"],
            scrambled: ["på gaden", "Da det regnede,", "en kvinde", "cyklede"]
        },
        {
            correct: ["Når solen skinner,", "løber", "en mand", "i parken"],
            scrambled: ["en mand", "Når solen skinner,", "i parken", "løber"]
        },
        {
            correct: ["Selvom det var koldt,", "arbejdede", "læreren", "i haven"],
            scrambled: ["læreren", "i haven", "Selvom det var koldt,", "arbejdede"]
        },
        {
            correct: ["Fordi bussen var forsinket,", "ventede", "folk", "på stationen"],
            scrambled: ["på stationen", "ventede", "Fordi bussen var forsinket,", "folk"]
        },
        {
            correct: ["Hvis det sner,", "kører", "bussen", "forsigtigt på vejen"],
            scrambled: ["forsigtigt på vejen", "bussen", "Hvis det sner,", "kører"]
        },
        {
            correct: ["Da klokken blev otte,", "ankom", "toget", "på perronen"],
            scrambled: ["ankom", "på perronen", "Da klokken blev otte,", "toget"]
        },
        {
            correct: ["Mens forældrene lavede mad,", "legede", "børnene", "i stuen"],
            scrambled: ["børnene", "Mens forældrene lavede mad,", "i stuen", "legede"]
        },
        {
            correct: ["Selvom hun var træt,", "læste", "pigen", "en bog i sengen"],
            scrambled: ["en bog i sengen", "læste", "Selvom hun var træt,", "pigen"]
        },
        {
            correct: ["Fordi det var weekend,", "sov", "familien", "længe derhjemme"],
            scrambled: ["længe derhjemme", "familien", "Fordi det var weekend,", "sov"]
        },
        {
            correct: ["Når timerne er slut,", "cykler", "eleverne", "hjem fra skolen"],
            scrambled: ["eleverne", "hjem fra skolen", "Når timerne er slut,", "cykler"]
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

        const pillsRow = document.createElement('div');
        pillsRow.className = 'puzzle-pills-row';
        tasks.forEach((_, tIdx) => {
            const pill = document.createElement('button');
            pill.className = `puzzle-pill ${tIdx === currentTaskIdx ? 'active' : ''} ${completedTasks.has(tIdx) ? 'completed' : ''}`;
            pill.textContent = tIdx + 1;
            pill.title = `${getTranslation('konj_puzzle_pill_title')} ${tIdx + 1}`;
            pill.onclick = () => {
                currentTaskIdx = tIdx;
                renderCurrentTask();
            };
            pillsRow.appendChild(pill);
        });
        header.appendChild(pillsRow);

        const counterEl = document.createElement('div');
        counterEl.className = 'puzzle-counter';
        counterEl.textContent = getTranslation('konj_puzzle_counter', { current: currentTaskIdx + 1, total: tasks.length });
        header.appendChild(counterEl);

        const guideEl = document.createElement('div');
        guideEl.className = 'puzzle-guide';
        guideEl.innerHTML = `
            ${getTranslation('konj_puzzle_guide')}
            <br><small>${getTranslation('konj_puzzle_guide_sub')}</small>
        `;
        header.appendChild(guideEl);

        puzzleWrapper.appendChild(header);

        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'puzzle-slots';

        const slotPrompts = [
            { text: getTranslation('konj_slot_hint_1'), grammar: getTranslation('konj_g1') },
            { text: getTranslation('konj_slot_hint_2'), grammar: getTranslation('konj_g2') },
            { text: getTranslation('konj_slot_hint_3'), grammar: getTranslation('konj_g3') },
            { text: getTranslation('konj_slot_hint_4'), grammar: getTranslation('konj_g4') }
        ];

        slotPrompts.forEach((promptItem, idx) => {
            const slot = document.createElement('div');
            const colorClass = idx === 0 ? 'konj-slot-cyan' : idx === 1 ? 'konj-slot-red' : idx === 2 ? 'konj-slot-green' : 'konj-slot-blue';
            slot.className = `puzzle-slot ${colorClass}`;
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

        const bankContainer = document.createElement('div');
        bankContainer.className = 'puzzle-bank';
        puzzleWrapper.appendChild(bankContainer);

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
            const usedWords = [...userSlots].filter(Boolean);
            const availableCounts = {};
            task.scrambled.forEach(w => availableCounts[w] = (availableCounts[w] || 0) + 1);
            usedWords.forEach(w => {
                if (availableCounts[w]) availableCounts[w]--;
            });

            task.scrambled.forEach((word) => {
                const btn = document.createElement('button');
                btn.className = 'puzzle-word-btn';
                btn.textContent = word;

                const isAvailable = (availableCounts[word] || 0) > 0;
                if (!isAvailable) {
                    btn.disabled = true;
                    btn.classList.add('placed');
                }

                btn.onclick = () => {
                    const emptyIdx = userSlots.indexOf(null);
                    if (emptyIdx !== -1) {
                        userSlots[emptyIdx] = word;
                        updateSlotsAndBank();
                    }
                };
                bankContainer.appendChild(btn);
            });

            if (!userSlots.includes(null)) {
                checkAnswer();
            } else {
                feedbackBox.innerHTML = '';
            }
        }

        function checkAnswer() {
            const isCorrect = userSlots.every((w, i) => w === task.correct[i]);
            const sentence = `${userSlots[0]} ${userSlots[1]} ${userSlots[2]} ${userSlots[3]}.`;

            if (isCorrect) {
                completedTasks.add(currentTaskIdx);
                pillsRow.querySelectorAll('.puzzle-pill').forEach((pill, idx) => {
                    if (completedTasks.has(idx)) pill.classList.add('completed');
                });

                const transKey = `konj_s${currentTaskIdx + 1}`;
                const transText = getLang() !== 'da' ? getTranslation(transKey) : '';

                feedbackBox.innerHTML = `
                    <div class="feedback-msg success">
                        ${getTranslation('konj_puzzle_correct')} "<strong>${sentence}</strong>"
                        ${transText ? `<div class="puzzle-trans-text" style="font-size: 1rem; color: #cbd5e1; font-style: italic; margin-top: 0.4rem;">"${transText}"</div>` : ''}
                    </div>
                    <div class="puzzle-action-row">
                        <button class="listen-btn-small" id="puzzle-listen-btn">🔊 ${getTranslation('konj_listen_pronunciation')}</button>
                        <button class="next-task-btn" id="puzzle-next-btn">
                            ${currentTaskIdx < tasks.length - 1 ? getTranslation('konj_next_task') : getTranslation('konj_start_over')}
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
                        ${getTranslation('konj_puzzle_error')}
                    </div>
                    <button class="retry-task-btn" id="puzzle-retry-btn">${getTranslation('konj_retry')}</button>
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

// ========================================================
// --- FOKUS PÅ HOLDNING: 4 ENKLE SPØRGSMÅL (IDENTISK MED 1. DEL)
// ========================================================
function renderFokusPaaHoldning(container, navigateFn) {
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
    title.textContent = "Fokus på holdning";
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

    // Hero Explanation Card
    const introCard = document.createElement('div');
    introCard.className = 'intro-hero-card';
    introCard.innerHTML = `
        <h2>Når holdningen (centraladverbiet) kommer først i sætningen</h2>
        <p class="hero-desc">
            Ligesom før beskriver vi fotografiet ved at svare på 4 enkle spørgsmål.<br>
            Når vi vælger at starte med <strong>holdningen</strong> (hvad vi mener eller føler om situationen), gælder den vigtigste grundregel på dansk:<br>
            <strong>Handlingen (hvad laver personen?) skal ALTID stå på 2. plads!</strong><br>
            Derfor bytter handlingen og personen plads (inversion):
        </p>
    `;
    viewContainer.appendChild(introCard);

    // Hero Image with 4 frames & dynamic overlay (Holdning first)
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'hero-image-wrapper photo-overlay-container';
    imgWrapper.innerHTML = `
        <div class="photo-overlay-wrap">
            <img src="assets/foto_metafor_clean.jpg" alt="Fokus på holdning: Heldigvis cykler en kvinde på gaden" class="hero-image">
            <svg class="photo-overlay-svg" viewBox="0 0 1376 768" preserveAspectRatio="none">
                <defs>
                    <marker id="arrowhead-holdning-yellow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#eab308" />
                    </marker>
                    <marker id="arrowhead-holdning-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                    </marker>
                    <marker id="arrowhead-holdning-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
                    </marker>
                    <marker id="arrowhead-holdning-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                    </marker>
                </defs>
                <!-- Arrow 1: Fra Boks 1 (Holdning) til himmel/sol -->
                <line x1="200" y1="110" x2="310" y2="160" stroke="#eab308" stroke-width="4" marker-end="url(#arrowhead-holdning-yellow)" />
                <!-- Arrow 2: Fra Boks 2 (Handling) til cykel/pedaler -->
                <line x1="880" y1="450" x2="740" y2="480" stroke="#ef4444" stroke-width="4" marker-end="url(#arrowhead-holdning-red)" />
                <!-- Arrow 3: Fra Boks 3 (Hvem/hvad - Subjekt) til kvinde -->
                <line x1="430" y1="130" x2="620" y2="340" stroke="#22c55e" stroke-width="4" marker-end="url(#arrowhead-holdning-green)" />
                <!-- Arrow 4: Fra Boks 4 (Sted) til gaden -->
                <line x1="300" y1="600" x2="520" y2="610" stroke="#0284c7" stroke-width="4" marker-end="url(#arrowhead-holdning-blue)" />
            </svg>
            <!-- Box 1: Hvad mener eller føler du om det? (Holdning forrest) -->
            <div class="photo-bubble bubble-7-holdning">
                <div class="bubble-q">1. Hvad mener eller føler du?</div>
                <div class="bubble-ans ans-yellow">Heldigvis</div>
            </div>
            <!-- Box 2: Hvad laver personen eller tingen? (Handlingen er altid nr. 2!) -->
            <div class="photo-bubble bubble-2">
                <div class="bubble-q">2. Hvad laver personen?</div>
                <div class="bubble-ans ans-red">cykler</div>
            </div>
            <!-- Box 3: Hvad eller hvem taler vi om? (Personen rykker bagved) -->
            <div class="photo-bubble bubble-1">
                <div class="bubble-q">3. Hvem taler vi om?</div>
                <div class="bubble-ans ans-green">en kvinde</div>
            </div>
            <!-- Box 4: Hvor sker det? -->
            <div class="photo-bubble bubble-3">
                <div class="bubble-q">4. Hvor sker det?</div>
                <div class="bubble-ans ans-blue">på gaden</div>
            </div>
        </div>
    `;
    const photoWrap = imgWrapper.querySelector('.photo-overlay-wrap');
    const toggleBar = createCleanIllustrationToggle(photoWrap);
    imgWrapper.insertBefore(toggleBar, photoWrap);

    viewContainer.appendChild(imgWrapper);

    // 4-Step Overview Grid
    const stepGrid = document.createElement('div');
    stepGrid.className = 'simple-steps-grid';

    const stepItems = [
        {
            num: '1',
            q: 'Hvad mener eller føler du om det?',
            ans: 'Heldigvis',
            colorClass: 'step-yellow',
            icon: '🌤️',
            note: 'Holdningen sættes forrest',
            grammar: 'Centraladverbium'
        },
        {
            num: '2',
            q: 'Hvad laver personen eller tingen?',
            ans: 'cykler',
            colorClass: 'step-red',
            icon: '🚲',
            note: 'Handlingen SKAL være nr. 2!',
            grammar: 'Verbum (inversion: 2. plads!)'
        },
        {
            num: '3',
            q: 'Hvad eller hvem taler vi om?',
            ans: 'en kvinde',
            colorClass: 'step-green',
            icon: '👤',
            note: 'Personen rykker om bagved',
            grammar: 'Substantiv / Pronomen (subjekt)'
        },
        {
            num: '4',
            q: 'Hvor sker det?',
            ans: 'på gaden',
            colorClass: 'step-blue',
            icon: '📍',
            note: 'Stedet til sidst',
            grammar: 'Præposition (sted)'
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
                <small style="color: #94a3b8; font-size: 0.8rem;">${item.note}</small>
                <div class="grammar-badge">🏷️ ${item.grammar}</div>
            </div>
        `;
        stepGrid.appendChild(card);
    });
    viewContainer.appendChild(stepGrid);

    // Result sentence banner
    const resultBox = document.createElement('div');
    resultBox.className = 'finished-sentence-banner';
    resultBox.innerHTML = `
        <div class="banner-label">Den færdige sætning:</div>
        <div class="banner-sentence">
            <span class="word-yellow">Heldigvis</span> 
            <span class="word-red">cykler</span> 
            <span class="word-green">en kvinde</span> 
            <span class="word-blue">på gaden</span>.
        </div>
        <button class="listen-btn" title="Hør udtale">
            <span>🔊</span> Hør sætningen
        </button>
    `;
    const listenBtn = resultBox.querySelector('.listen-btn');
    listenBtn.onclick = () => speakDanish("Heldigvis cykler en kvinde på gaden");
    viewContainer.appendChild(resultBox);

    // --- PRØV SELV AT LAVE EN SÆTNING ---
    const tryHeader = document.createElement('div');
    tryHeader.className = 'section-divider';
    tryHeader.innerHTML = `
        <h2>✍️ Prøv selv at lave en sætning med fokus på holdning</h2>
        <p>Husk: Holdningen kommer først, og handlingen er ALTID nummer 2!</p>
    `;
    viewContainer.appendChild(tryHeader);

    // Sub-tabs: 1) Trin-for-trin bygger 2) Puslespil
    const exerciseTabs = document.createElement('div');
    exerciseTabs.className = 'exercise-sub-tabs';
    const ex1TabBtn = document.createElement('button');
    ex1TabBtn.className = 'ex-sub-tab active';
    ex1TabBtn.textContent = 'Trin-for-trin bygger';

    const ex2TabBtn = document.createElement('button');
    ex2TabBtn.className = 'ex-sub-tab';
    ex2TabBtn.textContent = 'Puslespil: Rigtig rækkefølge';

    exerciseTabs.appendChild(ex1TabBtn);
    exerciseTabs.appendChild(ex2TabBtn);
    viewContainer.appendChild(exerciseTabs);

    const builderContainer = document.createElement('div');
    builderContainer.className = 'exercise-panel active';

    const puzzleContainer = document.createElement('div');
    puzzleContainer.className = 'exercise-panel';
    puzzleContainer.style.display = 'none';

    viewContainer.appendChild(builderContainer);
    viewContainer.appendChild(puzzleContainer);

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
    setupHoldningStepBuilder(builderContainer);

    // --- EXERCISE 2: PUZZLE ORDERING ---
    setupHoldningPuzzleExercise(puzzleContainer);

    container.appendChild(viewContainer);
    ensureIntroStyles();
}

// Step builder with Attitude first
function setupHoldningStepBuilder(container) {
    const categories = [
        {
            q: "1. Hvad mener eller føler du? (Holdningen forrest)",
            colorClass: "step-yellow",
            grammar: "Centraladverbium",
            options: ["Heldigvis", "Desværre", "Faktisk", "Forhåbentlig", "Sandsynligvis", "Måske"]
        },
        {
            q: "2. Hvad laver personen eller tingen? (Handlingen er altid nr. 2!)",
            colorClass: "step-red",
            grammar: "Verbum (inversion)",
            options: ["cykler", "løber", "arbejder", "sover", "kører", "sidder"]
        },
        {
            q: "3. Hvad eller hvem taler vi om? (Personen/tingen)",
            colorClass: "step-green",
            grammar: "Substantiv / Pronomen",
            options: ["en kvinde", "en mand", "læreren", "katten", "bussen", "folk"]
        },
        {
            q: "4. Hvor sker det? (Stedet til sidst)",
            colorClass: "step-blue",
            grammar: "Præposition (sted)",
            options: ["på gaden", "i parken", "på skolen", "derhjemme", "i haven", "på caféen"]
        }
    ];

    let selections = ["Heldigvis", "cykler", "en kvinde", "på gaden"];

    const card = document.createElement('div');
    card.className = 'step-builder-card';

    const outputBox = document.createElement('div');
    outputBox.className = 'builder-live-sentence';

    function updateLiveSentence() {
        outputBox.innerHTML = `
            <div class="live-label">Din sætning med fokus på holdning:</div>
            <div class="live-text">
                <span class="word-yellow">${selections[0]}</span> 
                <span class="word-red">${selections[1]}</span> 
                <span class="word-green">${selections[2]}</span> 
                <span class="word-blue">${selections[3]}</span>.
            </div>
            <button class="listen-btn-small" title="Lyt">🔊 Hør udtale</button>
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

// 10 Puzzle tasks with Attitude first
function setupHoldningPuzzleExercise(container) {
    const tasks = [
        {
            correct: ["Heldigvis", "cykler", "en kvinde", "på gaden"],
            scrambled: ["på gaden", "Heldigvis", "en kvinde", "cykler"]
        },
        {
            correct: ["Desværre", "venter", "manden", "på bussen"],
            scrambled: ["venter", "på bussen", "Desværre", "manden"]
        },
        {
            correct: ["Faktisk", "arbejder", "læreren", "på skolen"],
            scrambled: ["læreren", "Faktisk", "på skolen", "arbejder"]
        },
        {
            correct: ["Heldigvis", "sover", "babyen", "i sengen"],
            scrambled: ["i sengen", "sover", "Heldigvis", "babyen"]
        },
        {
            correct: ["Desværre", "sidder", "katten", "på taget"],
            scrambled: ["katten", "på taget", "sidder", "Desværre"]
        },
        {
            correct: ["Sandsynligvis", "kører", "bussen", "på motorvejen"],
            scrambled: ["på motorvejen", "Sandsynligvis", "kører", "bussen"]
        },
        {
            correct: ["Forhåbentlig", "venter", "vennerne", "på caféen"],
            scrambled: ["på caféen", "vennerne", "Forhåbentlig", "venter"]
        },
        {
            correct: ["Måske", "løber", "drengen", "i parken"],
            scrambled: ["drengen", "Måske", "i parken", "løber"]
        },
        {
            correct: ["Heldigvis", "svømmer", "pigen", "i svømmehallen"],
            scrambled: ["i svømmehallen", "svømmer", "pigen", "Heldigvis"]
        },
        {
            correct: ["Faktisk", "bor", "familien", "i byen"],
            scrambled: ["familien", "bor", "i byen", "Faktisk"]
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
            pill.title = `Gå til opgave ${tIdx + 1}`;
            pill.onclick = () => {
                currentTaskIdx = tIdx;
                renderCurrentTask();
            };
            pillsRow.appendChild(pill);
        });
        header.appendChild(pillsRow);

        const counterEl = document.createElement('div');
        counterEl.className = 'puzzle-counter';
        counterEl.textContent = `Opgave ${currentTaskIdx + 1} af ${tasks.length}`;
        header.appendChild(counterEl);

        const guideEl = document.createElement('div');
        guideEl.className = 'puzzle-guide';
        guideEl.innerHTML = `
            Klik på ordene i den rigtige rækkefølge med fokus på holdning:
            <br><small>1. Hvad mener du? ➔ 2. Hvad sker der? ➔ 3. Hvem/hvad? ➔ 4. Hvor?</small>
        `;
        header.appendChild(guideEl);

        puzzleWrapper.appendChild(header);

        // Slots display
        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'puzzle-slots';

        const slotPrompts = [
            { text: "1. Hvad mener du? (Holdning)", grammar: "Centraladverbium" },
            { text: "2. Hvad laver? (Handling)", grammar: "Verbum (2. plads)" },
            { text: "3. Hvem / hvad? (Person)", grammar: "Substantiv" },
            { text: "4. Hvor? (Sted)", grammar: "Præposition (sted)" }
        ];

        slotPrompts.forEach((promptItem, idx) => {
            const slot = document.createElement('div');
            const colorClass = idx === 0 ? 'holdning-slot-yellow' : idx === 1 ? 'holdning-slot-red' : idx === 2 ? 'holdning-slot-green' : 'holdning-slot-blue';
            slot.className = `puzzle-slot ${colorClass}`;
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
            const sentence = `${userSlots[0]} ${userSlots[1]} ${userSlots[2]} ${userSlots[3]}.`;

            if (isCorrect) {
                completedTasks.add(currentTaskIdx);
                pillsRow.querySelectorAll('.puzzle-pill').forEach((pill, idx) => {
                    if (completedTasks.has(idx)) pill.classList.add('completed');
                });

                feedbackBox.innerHTML = `
                    <div class="feedback-msg success">
                        🎉 Rigtigt! "<strong>${sentence}</strong>"
                    </div>
                    <div class="puzzle-action-row">
                        <button class="listen-btn-small" id="puzzle-listen-btn">🔊 Hør udtale</button>
                        <button class="next-task-btn" id="puzzle-next-btn">
                            ${currentTaskIdx < tasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra 🔄'}
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
                        Ikke helt rigtigt endnu. Husk rækkefølgen: Holdningen først (1) ➔ Handlingen ALTID som nr. 2!
                    </div>
                    <button class="retry-task-btn" id="puzzle-retry-btn">Prøv igen 🔄</button>
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

// Fallback for classic view (holdning)
function renderClassicAltIntro(container, navigateFn, type) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'ordstilling-intro-view fade-in';
    viewContainer.style.padding = '1rem';
    viewContainer.style.maxWidth = '800px';
    viewContainer.style.margin = '0 auto';

    const topBar = document.createElement('div');
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.marginBottom = '2rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'gemini-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('ordstilling');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = "Fokus på holdning";
    viewContainer.appendChild(title);

    // Grammar Terms Toggle
    const grammarToggle = createGrammarToggle(viewContainer);
    viewContainer.appendChild(grammarToggle);

    const intro = document.createElement('p');
    intro.className = 'subtitle';
    intro.innerHTML = "Verbet står <strong>altid</strong> på 2. plads, når man begynder en sætning med noget andet end subjektet.";
    viewContainer.appendChild(intro);

    container.appendChild(viewContainer);
}

function ensureIntroStyles() {
    if (document.getElementById('ordstilling-intro-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'ordstilling-intro-styles';
    styles.textContent = `
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

        .photo-overlay-container {
            margin: 1.5rem 0;
            display: flex;
            justify-content: center;
        }
        .photo-overlay-wrap {
            position: relative;
            display: inline-block;
            width: 100%;
            max-width: 820px;
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
            display: none;
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
        .grammar-mode-active .grammar-system-banner {
            display: flex;
            animation: fadeInGrammar 0.25s ease;
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
        .ans-pink { background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid #06b6d4; }
        .ans-cyan { background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid #06b6d4; }

        .bubble-1 { top: 9%; left: 16%; }
        .bubble-4 { top: 9%; right: 18%; }
        .bubble-2 { top: 48%; right: 5%; }
        .bubble-3 { bottom: 12%; left: 6%; }
        .bubble-7-holdning { top: 6%; left: 3%; }

        @media (max-width: 600px) {
            .photo-bubble { padding: 3px 6px; border-width: 1.5px; }
            .bubble-1 { top: 6%; left: 6%; }
            .bubble-4 { top: 6%; right: 6%; }
            .bubble-2 { top: 45%; right: 2%; }
            .bubble-3 { bottom: 8%; left: 2%; }
            .bubble-7-holdning { top: 4%; left: 2%; }
        }

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
        .simple-step-card:hover { transform: translateY(-2px); }
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

        .step-card-content { display: flex; flex-direction: column; gap: 0.4rem; }
        .step-q { font-size: 0.95rem; color: #b0c4ba; line-height: 1.3; }
        .step-ans { font-size: 1.25rem; font-weight: bold; color: #fff; }

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
        .listen-btn:hover { background: #43A047; transform: scale(1.03); }
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
        .listen-btn-small:hover { background: rgba(255, 255, 255, 0.25); }

        .section-divider { text-align: center; margin: 3rem 0 1.5rem 0; }
        .section-divider h2 { color: #FFD54F; font-size: 1.6rem; margin-bottom: 0.5rem; }
        .section-divider p { color: #b0c4ba; font-size: 1.05rem; }

        .exercise-sub-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; justify-content: center; }
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
        .ex-sub-tab:hover { color: #fff; background: rgba(255, 255, 255, 0.12); }
        .ex-sub-tab.active { background: #2196F3; border-color: #2196F3; color: #fff; font-weight: bold; }

        .step-builder-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .builder-questions-list { display: flex; flex-direction: column; gap: 1.2rem; }
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

        .builder-q-title { font-size: 1rem; font-weight: 600; color: #e0e0e0; margin-bottom: 0.75rem; }
        .builder-btn-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
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
        .chip-btn:hover { background: rgba(255, 255, 255, 0.18); }
        .chip-btn.selected { background: #4CAF50; border-color: #4CAF50; color: #fff; font-weight: bold; transform: scale(1.04); }

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
        .live-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #81C784; font-weight: bold; }
        .live-text { font-size: 1.5rem; font-weight: bold; color: #fff; }

        .puzzle-wrapper {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 1.5rem;
        }
        .puzzle-header { text-align: center; margin-bottom: 1.5rem; }
        .puzzle-pills-row { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem; }
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
        .puzzle-pill:hover { background: rgba(255, 255, 255, 0.2); transform: scale(1.08); }
        .puzzle-pill.active {
            border-color: #2196F3;
            background: #2196F3;
            color: #fff;
            transform: scale(1.12);
            box-shadow: 0 2px 8px rgba(33, 150, 243, 0.4);
        }
        .puzzle-pill.completed { border-color: #4CAF50; background: #2E7D32; color: #fff; }
        .puzzle-pill.completed.active { border-color: #81C784; background: #4CAF50; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4); }

        .puzzle-counter { font-size: 0.9rem; color: #FFD54F; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.3rem; }
        .puzzle-guide { font-size: 1.15rem; color: #e0e0e0; }
        .puzzle-guide small { color: #b0c4ba; font-size: 0.95rem; }

        .puzzle-slots { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.9rem; margin-bottom: 1.8rem; }
        .puzzle-slot {
            background: rgba(0, 0, 0, 0.3);
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            min-height: 70px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 0.6rem;
            text-align: center;
            transition: all 0.25s;
            position: relative;
        }
        .puzzle-slot.filled { background: rgba(76, 175, 80, 0.15); border-style: solid; border-color: #4CAF50; cursor: pointer; }

        /* Tid slot colors */
        .puzzle-slot.tid-slot-purple.filled { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.15); }
        .puzzle-slot.tid-slot-red.filled { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); }
        .puzzle-slot.tid-slot-green.filled { border-color: #22c55e; background: rgba(34, 197, 94, 0.15); }
        .puzzle-slot.tid-slot-blue.filled { border-color: #0284c7; background: rgba(2, 132, 199, 0.15); }

        /* Konjunktion slot colors */
        .puzzle-slot.konj-slot-cyan.filled { border-color: #06b6d4; background: rgba(6, 182, 212, 0.15); }
        .puzzle-slot.konj-slot-cyan.filled .slot-text { color: #38bdf8; }
        .puzzle-slot.konj-slot-red.filled { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); }
        .puzzle-slot.konj-slot-red.filled .slot-text { color: #f87171; }
        .puzzle-slot.konj-slot-green.filled { border-color: #22c55e; background: rgba(34, 197, 94, 0.15); }
        .puzzle-slot.konj-slot-green.filled .slot-text { color: #4ade80; }
        .puzzle-slot.konj-slot-blue.filled { border-color: #0284c7; background: rgba(2, 132, 199, 0.15); }
        .puzzle-slot.konj-slot-blue.filled .slot-text { color: #60a5fa; }

        /* Sted slot colors */
        .puzzle-slot.sted-slot-blue.filled { border-color: #0284c7; background: rgba(2, 132, 199, 0.15); }
        .puzzle-slot.sted-slot-red.filled { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); }
        .puzzle-slot.sted-slot-green.filled { border-color: #22c55e; background: rgba(34, 197, 94, 0.15); }
        .puzzle-slot.sted-slot-purple.filled { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.15); }

        /* Holdning slot colors */
        .puzzle-slot.holdning-slot-yellow.filled { border-color: #eab308; background: rgba(234, 179, 8, 0.15); }
        .puzzle-slot.holdning-slot-red.filled { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); }
        .puzzle-slot.holdning-slot-green.filled { border-color: #22c55e; background: rgba(34, 197, 94, 0.15); }
        .puzzle-slot.holdning-slot-blue.filled { border-color: #0284c7; background: rgba(2, 132, 199, 0.15); }

        .slot-hint { font-size: 0.85rem; color: #888; font-style: italic; }
        .slot-number { position: absolute; top: 4px; left: 8px; font-size: 0.75rem; font-weight: bold; opacity: 0.7; }
        .slot-text { font-size: 1.15rem; font-weight: bold; color: #fff; }
        .slot-remove { position: absolute; top: 4px; right: 8px; font-size: 0.75rem; color: #ff6b6b; }

        .puzzle-bank { display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; margin-bottom: 1.5rem; }
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
        .puzzle-word-btn:hover:not(:disabled) { background: #455A64; transform: scale(1.05); }
        .puzzle-word-btn:disabled { opacity: 0.3; cursor: not-allowed; border-style: dashed; }

        .puzzle-feedback { text-align: center; min-height: 60px; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
        .feedback-msg { font-size: 1.25rem; padding: 0.8rem 1.5rem; border-radius: 12px; line-height: 1.4; }
        .feedback-msg.success { background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #81C784; }
        .feedback-msg.error { background: rgba(244, 67, 54, 0.2); border: 1px solid #F44336; color: #EF9A9A; }
        .puzzle-action-row { display: flex; gap: 0.8rem; align-items: center; }
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
    `;
    document.head.appendChild(styles);
}