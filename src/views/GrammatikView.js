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
                    textContainer.appendChild(select);
                } else {
                    const span = document.createElement('span');
                    span.textContent = part;
                    textContainer.appendChild(span);
                }
            });

            gameArea.appendChild(textContainer);

            const feedback = document.createElement('div');
            feedback.className = 'game-feedback';
            gameArea.appendChild(feedback);

            const controls = document.createElement('div');
            controls.className = 'game-controls';

            const checkBtn = document.createElement('button');
            checkBtn.className = 'gemini-btn';
            checkBtn.textContent = getTranslation('checkAnswers');
            checkBtn.onclick = () => {
                const selects = textContainer.querySelectorAll('select');
                let allCorrect = true;
                selects.forEach(s => {
                    const idx = s.dataset.idx;
                    if (s.value === ex.blanks[idx].answer) {
                        s.classList.add('correct');
                        s.classList.remove('wrong');
                    } else {
                        s.classList.add('wrong');
                        s.classList.remove('correct');
                        allCorrect = false;
                    }
                });

                if (allCorrect) {
                    feedback.textContent = getTranslation('allCorrect');
                    feedback.className = 'game-feedback success';
                    checkBtn.style.display = 'none';
                    nextBtn.style.display = 'block';
                } else {
                    feedback.textContent = getTranslation('someWrong');
                    feedback.className = 'game-feedback error';
                }
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
        }

        renderCurrentExercise();
    }

    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
    const styles = document.createElement('style');
    styles.textContent = `
        .grammatik-text-container {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 16px;
            line-height: 2;
            font-size: 1.2rem;
            margin: 1.5rem 0;
            color: var(--text-main);
        }
        .grammatik-select {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-main);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 0.2rem 0.5rem;
            margin: 0 0.4rem;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        .grammatik-select.correct {
            border-color: #4CAF50;
            background: rgba(76, 175, 80, 0.1);
        }
        .grammatik-select.wrong {
            border-color: #FF5252;
            background: rgba(255, 82, 82, 0.1);
        }
        .game-controls {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(styles);
}

function getExercises(level) {
    if (level === 'A1') {
        return [
            {
                text: "Hej, jeg [blank_0] Elena. Jeg [blank_1] fra Italien. Nu [blank_2] jeg i Danmark. Jeg [blank_3] dansk på en sprogskole. Min lærer [blank_4] sød.",
                blanks: [
                    { answer: "hedder", options: ["hedder", "spiser", "lytter"] },
                    { answer: "kommer", options: ["kommer", "går", "sover"] },
                    { answer: "bor", options: ["bor", "køber", "vasker"] },
                    { answer: "lærer", options: ["lærer", "danser", "tegner"] },
                    { answer: "er", options: ["er", "har", "kan"] }
                ]
            },
            {
                text: "Her er [blank_0] bil. Den er [blank_1]. Jeg har også en [blank_2] hund. Hunden er [blank_3]. Vi bor i et lille [blank_4].",
                blanks: [
                    { answer: "min", options: ["min", "din", "sin"] },
                    { answer: "blå", options: ["blå", "glad", "træt"] },
                    { answer: "stor", options: ["stor", "hurtig", "varm"] },
                    { answer: "sød", options: ["sød", "sur", "kold"] },
                    { answer: "hus", options: ["hus", "bord", "stol"] }
                ]
            },
            {
                text: "I dag [blank_0] det mandag. Jeg skal [blank_1] på arbejde klokken otte. Jeg [blank_2] en kop kaffe først. Bagefter [blank_3] jeg bussen. Det er [blank_4] vejr.",
                blanks: [
                    { answer: "er", options: ["er", "har", "bliver"] },
                    { answer: "være", options: ["være", "have", "tage"] },
                    { answer: "drikker", options: ["drikker", "læser", "kører"] },
                    { answer: "tager", options: ["tager", "giver", "ser"] },
                    { answer: "godt", options: ["godt", "mange", "lidt"] }
                ]
            }
        ];
    } else if (level === 'A2') {
        return [
            {
                text: "I går [blank_0] jeg en tur i parken. Solen [blank_1], og der var mange mennesker. Jeg [blank_2] en gammel ven, som jeg ikke har set længe. Vi [blank_3] en is og [blank_4] om gamle dage.",
                blanks: [
                    { answer: "gik", options: ["gik", "går", "gået"] },
                    { answer: "skinnede", options: ["skinnede", "skinner", "skinnet"] },
                    { answer: "mødte", options: ["mødte", "møder", "mødt"] },
                    { answer: "købte", options: ["købte", "køber", "købt"] },
                    { answer: "talte", options: ["talte", "taler", "talt"] }
                ]
            },
            {
                text: "Når jeg [blank_0] fri, plejer jeg at [blank_1] sport. Jeg synes, det er [blank_2] at bevæge sig. Min bror [blank_3] dog hellere se fjernsyn. Han er lidt [blank_4].",
                blanks: [
                    { answer: "har", options: ["har", "er", "får"] },
                    { answer: "dyrke", options: ["dyrke", "lave", "spille"] },
                    { answer: "vigtigt", options: ["vigtigt", "vigtig", "vigtige"] },
                    { answer: "vil", options: ["vil", "skal", "kan"] },
                    { answer: "doven", options: ["doven", "træt", "syg"] }
                ]
            },
            {
                text: "Hvis det [blank_0] i morgen, bliver vi [blank_1]. Vi har [blank_2] at invitere nogle venner over. Vi skal [blank_3] en god middag sammen. Det [blank_4] hyggeligt.",
                blanks: [
                    { answer: "regner", options: ["regner", "sneer", "blæser"] },
                    { answer: "hjemme", options: ["hjemme", "ude", "væk"] },
                    { answer: "aftalt", options: ["aftalt", "lovet", "husket"] },
                    { answer: "lave", options: ["lave", "spise", "drikke"] },
                    { answer: "bliver", options: ["bliver", "er", "var"] }
                ]
            }
        ];
    } else { // B1
        return [
            {
                text: "Mange udlændinge vælger at [blank_0] sig i Danmark på grund af det gode arbejdsmarked. Selvom sproget kan være [blank_1] at lære, er det nødvendigt for at [blank_2] sig socialt. De fleste [blank_3] hurtigt, at danskerne er meget [blank_4] på deres fritid.",
                blanks: [
                    { answer: "bosætte", options: ["bosætte", "flytte", "rejse"] },
                    { answer: "udfordrende", options: ["udfordrende", "nemt", "hurtigt"] },
                    { answer: "integrere", options: ["integrere", "klare", "forstå"] },
                    { answer: "opdager", options: ["opdager", "ser", "mærker"] },
                    { answer: "fokuserede", options: ["fokuserede", "glade", "venlige"] }
                ]
            },
            {
                text: "Digitaliseringen har [blank_0] det danske samfund markant de seneste år. Nu om dage kan man [blank_1] næsten alt via sin telefon. Det har [blank_2] hverdagen for mange, men det har også [blank_3] nogle udfordringer for de [blank_4] generationer.",
                blanks: [
                    { answer: "ændret", options: ["ændret", "skabt", "gjort"] },
                    { answer: "klare", options: ["klare", "købe", "bestille"] },
                    { answer: "lettet", options: ["lettet", "svækket", "øget"] },
                    { answer: "medført", options: ["medført", "givet", "vist"] },
                    { answer: "ældre", options: ["ældre", "unge", "nyere"] }
                ]
            },
            {
                text: "For at få succes i sin karriere skal man ikke kun have de rette [blank_0], men også gode samarbejdsevner. Det er [blank_1] at kunne kommunikere klart med sine kolleger. Hvis man [blank_2] et problem, bør man [blank_3] det med det samme i stedet for at [blank_4] det.",
                blanks: [
                    { answer: "kvalifikationer", options: ["kvalifikationer", "muligheder", "erfaringer"] },
                    { answer: "afgørende", options: ["afgørende", "dejligt", "muligt"] },
                    { answer: "oplever", options: ["oplever", "finder", "ser"] },
                    { answer: "håndtere", options: ["håndtere", "løse", "snakke"] },
                    { answer: "ignorere", options: ["ignorere", "glemme", "skjule"] }
                ]
            }
        ];
    }
}
