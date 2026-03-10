import { getTranslation, navigate } from '../main.js';

export function renderGrammatikView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('traenGrammatik');
    viewContainer.appendChild(title);

    const menuArea = document.createElement('div');
    const gameArea = document.createElement('div');
    gameArea.style.display = 'none';

    // --- Menu Area ---
    const intro = document.createElement('p');
    intro.className = 'subtitle';
    intro.textContent = getTranslation('grammatikIntro');
    menuArea.appendChild(intro);

    const levels = [
        { key: 'let', level: 'A1', icon: '🌱' },
        { key: 'mellemsvaer', level: 'A2', icon: '🌿' },
        { key: 'svaer', level: 'B1', icon: '🌳' }
    ];

    const grid = document.createElement('div');
    grid.className = 'grid';
    levels.forEach(l => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => startExercise(l.level);

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.textContent = l.icon;

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = getTranslation(l.key);

        card.appendChild(icon);
        card.appendChild(cardTitle);
        grid.appendChild(card);
    });
    menuArea.appendChild(grid);
    viewContainer.appendChild(menuArea);

    // --- Game Area ---
    function startExercise(level) {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';

        const levelTitle = document.createElement('h2');
        levelTitle.textContent = getTranslation(level === 'A1' ? 'let' : level === 'A2' ? 'mellemsvaer' : 'svaer');
        levelTitle.style.textAlign = 'center';
        gameArea.appendChild(levelTitle);

        const exerciseData = getExercises(level);
        let currentIdx = 0;

        function renderCurrentExercise() {
            gameArea.innerHTML = '';
            gameArea.appendChild(levelTitle);

            const ex = exerciseData[currentIdx];
            const textContainer = document.createElement('div');
            textContainer.className = 'grammatik-text-container';

            // Split text by [blank_X]
            const parts = ex.text.split(/(\[blank_\d+\])/);
            parts.forEach(part => {
                const match = part.match(/\[blank_(\d+)\]/);
                if (match) {
                    const idx = match[1];
                    const wrapper = document.createElement('span');
                    wrapper.className = 'select-wrapper';

                    const select = document.createElement('select');
                    select.className = 'grammatik-select';
                    select.dataset.idx = idx;

                    const defaultOpt = document.createElement('option');
                    defaultOpt.value = "";
                    defaultOpt.textContent = "...";
                    select.appendChild(defaultOpt);

                    ex.blanks[idx].options.sort(() => Math.random() - 0.5).forEach(opt => {
                        const o = document.createElement('option');
                        o.value = opt;
                        o.textContent = opt;
                        select.appendChild(o);
                    });

                    const hintDiv = document.createElement('div');
                    hintDiv.className = 'select-hint';
                    hintDiv.id = `hint-${idx}`;

                    wrapper.appendChild(select);
                    wrapper.appendChild(hintDiv);
                    textContainer.appendChild(wrapper);
                } else {
                    const span = document.createElement('span');
                    span.textContent = part;
                    textContainer.appendChild(span);
                }
            });

            gameArea.appendChild(textContainer);

            gameArea.appendChild(textContainer);

            // Summary area for progress
            const summaryArea = document.createElement('div');
            summaryArea.className = 'grammatik-summary';
            gameArea.appendChild(summaryArea);

            const feedback = document.createElement('div');
            feedback.className = 'game-feedback';
            gameArea.appendChild(feedback);

            const controls = document.createElement('div');
            controls.className = 'game-controls';

            function updateSummary() {
                const selects = textContainer.querySelectorAll('select');
                const filled = Array.from(selects).filter(s => s.value !== "").length;
                const correct = Array.from(selects).filter(s => s.classList.contains('correct')).length;
                const total = selects.length;

                if (filled === 0) {
                    summaryArea.textContent = "";
                } else if (correct === total) {
                    summaryArea.textContent = getTranslation('allCorrect');
                    summaryArea.classList.add('success');
                    checkBtn.style.display = 'none';
                    nextBtn.style.display = 'block';
                } else {
                    summaryArea.textContent = `${filled} / ${total} ${getTranslation('filled') || 'udfyldt'}`;
                    summaryArea.classList.remove('success');
                }
            }

            // --- Immediate Feedback Logic ---
            textContainer.querySelectorAll('select').forEach(select => {
                select.onchange = () => {
                    const idx = select.dataset.idx;
                    const hintDiv = textContainer.querySelector(`#hint-${idx}`);

                    if (select.value === "") {
                        select.classList.remove('correct', 'wrong');
                        hintDiv.style.display = 'none';
                    } else if (select.value === ex.blanks[idx].answer) {
                        select.classList.add('correct');
                        select.classList.remove('wrong');
                        hintDiv.textContent = '';
                        hintDiv.style.display = 'none';
                    } else {
                        select.classList.add('wrong');
                        select.classList.remove('correct');
                        // Show hint
                        const selectedVal = select.value;
                        const hintKey = (ex.blanks[idx].hints && ex.blanks[idx].hints[selectedVal]) || 'hintContext';
                        hintDiv.textContent = getTranslation(hintKey);
                        hintDiv.style.display = 'block';
                    }
                    updateSummary();
                };
            });

            const checkBtn = document.createElement('button');
            checkBtn.className = 'gemini-btn';
            checkBtn.textContent = getTranslation('checkAnswers');
            checkBtn.onclick = () => {
                const selects = textContainer.querySelectorAll('select');
                let allCorrect = true;
                selects.forEach(s => {
                    const idx = s.dataset.idx;
                    const hintDiv = textContainer.querySelector(`#hint-${idx}`);

                    if (s.value === ex.blanks[idx].answer) {
                        s.classList.add('correct');
                        s.classList.remove('wrong');
                        hintDiv.style.display = 'none';
                    } else {
                        s.classList.add('wrong');
                        s.classList.remove('correct');
                        allCorrect = false;
                        const hintKey = (ex.blanks[idx].hints && ex.blanks[idx].hints[s.value]) || 'hintContext';
                        hintDiv.textContent = getTranslation(hintKey);
                        hintDiv.style.display = 'block';
                    }
                });
                updateSummary();
            };

            const nextBtn = document.createElement('button');
            nextBtn.className = 'gemini-btn';
            nextBtn.textContent = getTranslation('newExercise');
            nextBtn.style.display = 'none';
            nextBtn.onclick = () => {
                currentIdx = (currentIdx + 1) % exerciseData.length;
                renderCurrentExercise();
            };

            controls.appendChild(checkBtn);
            controls.appendChild(nextBtn);
            gameArea.appendChild(controls);
            updateSummary();
        }

        renderCurrentExercise();
    }

    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
    if (!document.getElementById('grammatik-styles')) {
        const styles = document.createElement('style');
        styles.id = 'grammatik-styles';
        styles.textContent = `
            .grammatik-text-container {
                background: rgba(255, 255, 255, 0.05);
                padding: 2.5rem;
                border-radius: 24px;
                line-height: 2.8;
                font-size: 1.35rem;
                margin: 1.5rem 0;
                color: var(--text-main);
                box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
            }
            .select-wrapper {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                vertical-align: middle;
                position: relative;
                margin: 0 0.3rem;
            }
            .grammatik-select {
                background: rgba(255, 255, 255, 0.08);
                color: var(--text-main);
                border: 2px solid rgba(255, 255, 255, 0.15);
                border-radius: 12px;
                padding: 0.1rem 0.6rem;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                outline: none;
                appearance: none;
                -webkit-appearance: none;
                min-width: 100px;
                text-align-last: center;
            }
            .grammatik-select:hover {
                background: rgba(255, 255, 255, 0.12);
                border-color: rgba(255, 255, 255, 0.3);
            }
            .grammatik-select.correct {
                border-color: #4CAF50;
                background: rgba(76, 175, 80, 0.15);
                color: #81C784;
            }
            .grammatik-select.wrong {
                border-color: #FF5252;
                background: rgba(255, 82, 82, 0.15);
                color: #FF8A80;
            }
            .select-hint {
                display: none;
                position: absolute;
                bottom: 110%;
                left: 50%;
                transform: translateX(-50%);
                background: #FF5252;
                color: white;
                padding: 0.5rem 0.9rem;
                border-radius: 12px;
                font-size: 0.9rem;
                line-height: 1.3;
                width: 200px;
                text-align: center;
                z-index: 20;
                box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                pointer-events: none;
                animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            @keyframes popIn {
                from { transform: translateX(-50%) scale(0.8); opacity: 0; }
                to { transform: translateX(-50%) scale(1); opacity: 1; }
            }
            .select-hint::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -8px;
                border-width: 8px;
                border-style: solid;
                border-color: #FF5252 transparent transparent transparent;
            }
            .grammatik-summary {
                text-align: center;
                font-size: 1.2rem;
                font-weight: 600;
                margin: 1rem 0;
                min-height: 1.5rem;
                color: rgba(255, 255, 255, 0.6);
                transition: all 0.3s;
            }
            .grammatik-summary.success {
                color: #4CAF50;
                font-size: 1.4rem;
                transform: scale(1.1);
            }
            .game-controls {
                display: flex;
                justify-content: center;
                margin-top: 1rem;
                gap: 1.5rem;
            }
        `;
        document.head.appendChild(styles);
    }
}

function getExercises(level) {
    if (level === 'A1') {
        return [
            {
                text: "Jeg [blank_0] i København. Jeg har et [blank_1]. Her bor jeg sammen med min [blank_2]. Vi [blank_3] ofte mad sammen. Min kone er en god [blank_4].",
                blanks: [
                    {
                        answer: "bor",
                        options: ["bor", "spiser", "læser"],
                        hints: { "spiser": "hintAction", "læser": "hintAction" }
                    },
                    {
                        answer: "hus",
                        options: ["hus", "bil", "bord"],
                        hints: { "bil": "hintContext", "bord": "hintPlace" }
                    },
                    {
                        answer: "kone",
                        options: ["kone", "ven", "hund"],
                        hints: { "ven": "hintContext", "hund": "hintContext" }
                    },
                    {
                        answer: "laver",
                        options: ["laver", "drikker", "køber"],
                        hints: { "drikker": "hintAction", "køber": "hintMean" }
                    },
                    {
                        answer: "kok",
                        options: ["kok", "bog", "skole"],
                        hints: { "bog": "hintContext", "skole": "hintPlace" }
                    }
                ]
            },
            {
                text: "I skolen [blank_0] jeg dansk. Min [blank_1] er meget sød. Jeg har en [blank_2] i min taske. Vi [blank_3] tekster hver dag. Bagefter går jeg [blank_4].",
                blanks: [
                    {
                        answer: "lærer",
                        options: ["lærer", "sover", "danser"],
                        hints: { "sover": "hintAction", "danser": "hintAction" }
                    },
                    {
                        answer: "lærer",
                        options: ["lærer", "elev", "skole"],
                        hints: { "elev": "hintContext", "skole": "hintPlace" }
                    },
                    {
                        answer: "bog",
                        options: ["bog", "cykel", "hus"],
                        hints: { "cykel": "hintContext", "hus": "hintPlace" }
                    },
                    {
                        answer: "læser",
                        options: ["læser", "spiser", "kører"],
                        hints: { "spiser": "hintAction", "kører": "hintAction" }
                    },
                    {
                        answer: "hjem",
                        options: ["hjem", "bil", "kaffe"],
                        hints: { "bil": "hintMean", "kaffe": "hintMean" }
                    }
                ]
            },
            {
                text: "Min [blank_0] er blå. Jeg [blank_1] til arbejde hver morgen. Vejen er [blank_2]. Jeg [blank_3] på et kontor. Jeg kan godt lide mit [blank_4].",
                blanks: [
                    {
                        answer: "bil",
                        options: ["bil", "hat", "kop"],
                        hints: { "hat": "hintContext", "kop": "hintContext" }
                    },
                    {
                        answer: "kører",
                        options: ["kører", "går", "flyver"],
                        hints: { "går": "hintContext", "flyver": "hintMean" }
                    },
                    {
                        answer: "lang",
                        options: ["lang", "varm", "sød"],
                        hints: { "varm": "hintContext", "sød": "hintMean" }
                    },
                    {
                        answer: "arbejder",
                        options: ["arbejder", "sover", "spiser"],
                        hints: { "sover": "hintAction", "spiser": "hintAction" }
                    },
                    {
                        answer: "job",
                        options: ["job", "mad", "bord"],
                        hints: { "mad": "hintMean", "bord": "hintPlace" }
                    }
                ]
            }
        ];
    } else if (level === 'A2') {
        return [
            {
                text: "Det er [blank_0] vejr i dag. Solen skinner [blank_1], og vi [blank_2] en tur i skoven. Vi ser mange [blank_3] træer. Vi går [blank_4] for at nyde naturen.",
                blanks: [
                    {
                        answer: "dejligt",
                        options: ["dejligt", "langsomt", "aldrig"],
                        hints: { "langsomt": "hintAdj", "aldrig": "hintAdverb" }
                    },
                    {
                        answer: "kraftigt",
                        options: ["kraftigt", "smukt", "ofte"],
                        hints: { "smukt": "hintAdj", "ofte": "hintAdverb" }
                    },
                    {
                        answer: "går",
                        options: ["går", "gik", "gået"],
                        hints: { "gik": "hintTense", "gået": "hintTense" }
                    },
                    {
                        answer: "høje",
                        options: ["høje", "høj", "højt"],
                        hints: { "høj": "hintForm", "højt": "hintForm" }
                    },
                    {
                        answer: "langsomt",
                        options: ["langsomt", "langsom", "hurtig"],
                        hints: { "langsom": "hintForm", "hurtig": "hintAdj" }
                    }
                ]
            },
            {
                text: "Min bror [blank_0] altid i fitnesscentret. Han er meget [blank_1]. Han spiser [blank_2] sund mad, fordi han vil være [blank_3]. Hans [blank_4] er meget stærke.",
                blanks: [
                    {
                        answer: "træner",
                        options: ["træner", "trænede", "træne"],
                        hints: { "trænede": "hintTense", "træne": "hintTense" }
                    },
                    {
                        answer: "aktiv",
                        options: ["aktiv", "aktivt", "aktive"],
                        hints: { "aktivt": "hintForm", "aktive": "hintForm" }
                    },
                    {
                        answer: "meget",
                        options: ["meget", "mange", "lidt"],
                        hints: { "mange": "hintForm", "lidt": "hintContext" }
                    },
                    {
                        answer: "stærk",
                        options: ["stærk", "stærkt", "stærke"],
                        hints: { "stærkt": "hintForm", "stærke": "hintForm" }
                    },
                    {
                        answer: "muskler",
                        options: ["muskler", "muskel", "musklen"],
                        hints: { "muskel": "hintForm", "musklen": "hintForm" }
                    }
                ]
            },
            {
                text: "I går [blank_0] jeg en [blank_1] film. Den var [blank_2] spændende. Jeg [blank_3] desværre for [blank_4], så jeg så ikke starten.",
                blanks: [
                    {
                        answer: "så",
                        options: ["så", "ser", "set"],
                        hints: { "ser": "hintTense", "set": "hintTense" }
                    },
                    {
                        answer: "god",
                        options: ["god", "godt", "gode"],
                        hints: { "godt": "hintForm", "gode": "hintForm" }
                    },
                    {
                        answer: "virkelig",
                        options: ["virkelig", "virkelige", "virkeligt"],
                        hints: { "virkelige": "hintForm", "virkeligt": "hintForm" }
                    },
                    {
                        answer: "kom",
                        options: ["kom", "kommer", "kommet"],
                        hints: { "kommer": "hintTense", "kommet": "hintTense" }
                    },
                    {
                        answer: "sent",
                        options: ["sent", "sen", "sene"],
                        hints: { "sen": "hintForm", "sene": "hintForm" }
                    }
                ]
            }
        ];
    } else { // B1
        return [
            {
                text: "Jeg tager bussen, [blank_0] min bil er gået i stykker. [blank_1] det regner, foretrækker jeg at køre. Det er [blank_2] irriterende, [blank_3] jeg har mange [blank_4] aftaler i dag.",
                blanks: [
                    {
                        answer: "fordi",
                        options: ["fordi", "selvom", "men"],
                        hints: { "selvom": "hintConj", "men": "hintConj" }
                    },
                    {
                        answer: "Hvis",
                        options: ["Hvis", "Da", "Fordi"],
                        hints: { "Da": "hintConj", "Fordi": "hintConj" }
                    },
                    {
                        answer: "temmelig",
                        options: ["temmelig", "temmelige", "temmeligt"],
                        hints: { "temmelige": "hintForm", "temmeligt": "hintForm" }
                    },
                    {
                        answer: "da",
                        options: ["da", "så", "efter"],
                        hints: { "så": "hintConj", "efter": "hintMean" }
                    },
                    {
                        answer: "vigtige",
                        options: ["vigtige", "vigtig", "vigtigt"],
                        hints: { "vigtig": "hintForm", "vigtigt": "hintForm" }
                    }
                ]
            },
            {
                text: "[blank_0] jeg var barn, boede jeg i udlandet. Det har [blank_1] mig meget, [blank_2] det har givet mig en [blank_3] forståelse for [blank_4] kulturer.",
                blanks: [
                    {
                        answer: "Da",
                        options: ["Da", "Når", "Hvis"],
                        hints: { "Når": "hintConj", "Hvis": "hintConj" }
                    },
                    {
                        answer: "præget",
                        options: ["præget", "præger", "præge"],
                        hints: { "præger": "hintTense", "præge": "hintTense" }
                    },
                    {
                        answer: "fordi",
                        options: ["fordi", "men", "skønt"],
                        hints: { "men": "hintConj", "skønt": "hintConj" }
                    },
                    {
                        answer: "større",
                        options: ["større", "stor", "størst"],
                        hints: { "stor": "hintForm", "størst": "hintForm" }
                    },
                    {
                        answer: "fremmede",
                        options: ["fremmede", "fremmed", "fremmedt"],
                        hints: { "fremmed": "hintForm", "fremmedt": "hintForm" }
                    }
                ]
            },
            {
                text: "Vi skal nå projektet til tiden, [blank_0] vi bliver nødt til at arbejde [blank_1]. [blank_2] vi samarbejder [blank_3], kan vi løse de [blank_4] problemer.",
                blanks: [
                    {
                        answer: "så",
                        options: ["så", "fordi", "hvis"],
                        hints: { "fordi": "hintConj", "hvis": "hintConj" }
                    },
                    {
                        answer: "hurtigt",
                        options: ["hurtigt", "hurtig", "hurtige"],
                        hints: { "hurtig": "hintForm", "hurtige": "hintForm" }
                    },
                    {
                        answer: "Hvis",
                        options: ["Hvis", "Selvom", "Da"],
                        hints: { "Selvom": "hintConj", "Da": "hintConj" }
                    },
                    {
                        answer: "effektivt",
                        options: ["effektivt", "effektiv", "effektive"],
                        hints: { "effektiv": "hintForm", "effektive": "hintForm" }
                    },
                    {
                        answer: "største",
                        options: ["største", "stor", "større"],
                        hints: { "stor": "hintForm", "større": "hintForm" }
                    }
                ]
            }
        ];
    }
}
