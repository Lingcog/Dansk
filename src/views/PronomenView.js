import { baseUrl } from '../utils/config.js';
import { getTranslation } from '../utils/i18n.js';
import { pronomenData } from '../utils/pronomenData.js';

import { initAdverbChoiceExerciseView } from './AdverbChoiceExerciseView.js';

export function renderPronomenView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('hvilketOrd');
    viewContainer.appendChild(title);

    const menuArea = document.createElement('div');
    const level1Area = document.createElement('div'); // Pronomen vs Verbum
    const level2Area = document.createElement('div'); // Sub-categories
    const level3Area = document.createElement('div'); // Sets or Verb groups
    const gameArea = document.createElement('div');

    level2Area.style.display = 'none';
    level3Area.style.display = 'none';
    gameArea.style.display = 'none';

    // --- State Management ---
    let currentMainCategory = null; // 'pronomen' or 'verbum'
    let currentSubCategory = null; // 'subjekt', 'objekt', 'possessiv'
    let currentLevel = 1; // 1, 2, or 3
    let currentExercises = [];

    // --- Level 1: Main Categories ---
    const grid1 = document.createElement('div');
    grid1.className = 'grid';
    grid1.style.marginTop = '2rem';

    const pronomenCard = document.createElement('div');
    pronomenCard.className = 'card';
    pronomenCard.innerHTML = `
        <div class="card-icon">👥</div>
        <div class="card-title">${getTranslation('hanHamHans')}</div>
    `;
    pronomenCard.onclick = () => showLevel2('pronomen');

    const verbumCard = document.createElement('div');
    verbumCard.className = 'card';
    verbumCard.innerHTML = `
        <div class="card-icon">🏃</div>
        <div class="card-title">${getTranslation('gårGikGået')}</div>
    `;
    verbumCard.onclick = () => showLevel2('verbum');

    const derErCard = document.createElement('div');
    derErCard.className = 'card';
    derErCard.innerHTML = `
        <div class="card-icon">🚪</div>
        <div class="card-title">${getTranslation('derErDetEr')}</div>
    `;
    derErCard.onclick = () => startDerErExplanation();

    const adjCompCard = document.createElement('div');
    adjCompCard.className = 'card';
    adjCompCard.innerHTML = `
        <div class="card-icon">📈</div>
        <div class="card-title">${getTranslation('soedSoedereSoedest')}</div>
    `;
    adjCompCard.onclick = () => navigateFn('adjective_comparison');

    const adverbChoiceCard = document.createElement('div');
    adverbChoiceCard.className = 'card';
    adverbChoiceCard.innerHTML = `
        <div class="card-icon">💨</div>
        <div class="card-title">${getTranslation('advChoiceTitle')}</div>
    `;
    adverbChoiceCard.onclick = () => startAdverbChoiceExercise();

    grid1.appendChild(pronomenCard);
    grid1.appendChild(verbumCard);
    grid1.appendChild(derErCard);
    grid1.appendChild(adjCompCard);
    grid1.appendChild(adverbChoiceCard); // Add the new card
    level1Area.appendChild(grid1);
    menuArea.appendChild(level1Area);

    // --- Level 2: Sub-categories ---
    const grid2 = document.createElement('div');
    grid2.className = 'grid';
    level2Area.appendChild(grid2);
    menuArea.appendChild(level2Area);

    function showLevel2(category) {
        currentMainCategory = category;
        currentLevel = 2;
        level1Area.style.display = 'none';
        level2Area.style.display = 'block';
        level3Area.style.display = 'none';
        grid2.innerHTML = '';

        const items = category === 'pronomen' ? [
            { key: 'pronominerSubjekt', type: 'subjekt', icon: '🔦', img: 'pronominer_spotlight.png' },
            { key: 'pronominerObjekt', type: 'objekt', icon: '👤', img: 'pronominer_objekt.png' },
            { key: 'pronominerPossessiv', type: 'possessiv', icon: '🏠', img: 'pronominer_possessiv.png' }
        ] : [
            { key: 'verberM3', type: 'verber_nutid', icon: '🏃', img: 'verber_kategorier.png' }
        ];

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                if (item.type === 'verber_nutid') {
                    navigateFn('verbum_menu');
                } else if (item.key.startsWith('verber')) {
                    navigateFn('verbum_learning', { categoryId: item.type, backView: 'pronomen' });
                } else {
                    currentSubCategory = item.type;
                    showPronomenSets(item.type, item.img);
                }
            };

            const icon = document.createElement('div');
            icon.className = 'card-icon';
            icon.textContent = item.icon;

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = getTranslation(item.key);

            card.appendChild(icon);
            card.appendChild(cardTitle);
            grid2.appendChild(card);
        });
    }

    function showPronomenSets(categoryType, illustrationImg) {
        currentLevel = 3;
        level2Area.style.display = 'none';
        level3Area.style.display = 'block';
        grid3.innerHTML = '';
        title.textContent = getTranslation('hanHamHans');

        const sets = [...pronomenData[categoryType]];
        sets.forEach((set, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                // Randomize exercises within the set
                currentExercises = [...set.exercises].sort(() => Math.random() - 0.5);
                startExercise({ key: 'pronominer' + categoryType.charAt(0).toUpperCase() + categoryType.slice(1), type: categoryType, img: illustrationImg });
            };

            const icon = document.createElement('div');
            icon.className = 'card-icon';
            icon.textContent = '📝';

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = `Sæt ${index + 1}`;

            card.appendChild(icon);
            card.appendChild(cardTitle);
            grid3.appendChild(card);
        });
    }

    // --- Level 3: Verb Groups (Nutid) ---
    const grid3 = document.createElement('div');
    grid3.className = 'grid';
    level3Area.appendChild(grid3);
    menuArea.appendChild(level3Area);

    function showLevel3() {
        currentLevel = 3;
        level2Area.style.display = 'none';
        level3Area.style.display = 'block';
        grid3.innerHTML = '';

        const verbGroups = [
            { key: 'verberHjaelpe', type: 'hjaelpe', icon: '💡' },
            { key: 'verberTilstand', type: 'tilstand', icon: '🏠' },
            { key: 'verberBevaegelse', type: 'bevaegelse', icon: '🚶' },
            { key: 'verberHandling', type: 'handling', icon: '🛠️' },
            { key: 'verberInteraktion', type: 'interaktion', icon: '🗣️' },
            { key: 'verberIndreLiv', type: 'indre_liv', icon: '🧠' }
        ];

        verbGroups.forEach(group => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => navigateFn('verbum_learning', { categoryId: group.type });

            const icon = document.createElement('div');
            icon.className = 'card-icon';
            icon.textContent = group.icon;

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = getTranslation(group.key);

            card.appendChild(icon);
            card.appendChild(cardTitle);
            grid3.appendChild(card);
        });
    }

    // --- Back Button Logic ---
    backBtn.onclick = () => {
        if (gameArea.style.display === 'block') {
            gameArea.style.display = 'none';
            menuArea.style.display = 'block';
            if (currentLevel === 3) {
                level3Area.style.display = 'block';
                level2Area.style.display = 'none';
            } else {
                level2Area.style.display = 'block';
                level3Area.style.display = 'none';
            }
            title.textContent = getTranslation('hvilketOrd');
        } else if (level3Area.style.display === 'block') {
            level3Area.style.display = 'none';
            level2Area.style.display = 'block';
            currentLevel = 2;
            title.textContent = getTranslation('hvilketOrd');
        } else if (level2Area.style.display === 'block') {
            level2Area.style.display = 'none';
            level1Area.style.display = 'block';
            currentLevel = 1;
            currentMainCategory = null;
            title.textContent = getTranslation('hvilketOrd');
        } else {
            navigateFn('dagens_opgave');
        }
    };

    function startDerErExplanation() {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation('derErDetEr');

        const explContainer = document.createElement('div');
        explContainer.className = 'der-er-explanation';

        // Slide 1: Introduction
        const slide1 = document.createElement('div');
        slide1.className = 'expl-slide';
        slide1.innerHTML = `
            <img src="${baseUrl}der_er_bil_gade.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${getTranslation('derErIntro1')}</div>
            <p class="expl-text">${getTranslation('derErExpl')}</p>
            <button class="gemini-btn next-slide-btn">Næste →</button>
        `;

        // Slide 2: Identification
        const slide2 = document.createElement('div');
        slide2.className = 'expl-slide';
        slide2.style.display = 'none';
        slide2.innerHTML = `
            <img src="${baseUrl}det_er_bil_pegepind.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${getTranslation('derErIntro2')}</div>
            <p class="expl-text">Når vi kender tingen (den er inde i rummet), så bruger vi <b>det</b> til at pege.</p>
            <button class="gemini-btn start-practice-btn">Start øvelse!</button>
        `;

        slide1.querySelector('.next-slide-btn').onclick = () => {
            slide1.style.display = 'none';
            slide2.style.display = 'block';
        };

        slide2.querySelector('.start-practice-btn').onclick = () => {
            startDerErExercise();
        };

        explContainer.appendChild(slide1);
        explContainer.appendChild(slide2);
        gameArea.appendChild(explContainer);
    }

    function startDerErExercise() {
        gameArea.innerHTML = '';
        const exerciseData = [
            { text: "Se! [blank_0] en hund i haven.", answer: "Der er", options: ["Der er", "Det er"] },
            { text: "[blank_0] en stor hund. Se den!", answer: "Det er", options: ["Der er", "Det er"] },
            { text: "Hvem banker på døren? [blank_0] nok min mor.", answer: "Det er", options: ["Der er", "Det er"] },
            { text: "[blank_0] mange mennesker i toget i dag.", answer: "Der er", options: ["Der er", "Det er"] },
            { text: "[blank_0] en dejlig kop kaffe, du har her.", answer: "Det er", options: ["Der er", "Det er"] }
        ];

        let currentIdx = 0;

        function renderStep() {
            gameArea.innerHTML = '';
            const ex = exerciseData[currentIdx];

            const content = document.createElement('div');
            content.className = 'pronomen-exercise-content';

            const progress = document.createElement('div');
            progress.className = 'exercise-progress';
            progress.textContent = `Opgave ${currentIdx + 1} af ${exerciseData.length}`;
            content.appendChild(progress);

            const textContainer = document.createElement('div');
            textContainer.className = 'grammatik-text-container';

            const parts = ex.text.split(/(\[blank_0\])/);
            parts.forEach(part => {
                if (part === '[blank_0]') {
                    const select = document.createElement('select');
                    select.className = 'grammatik-select';

                    const defaultOpt = document.createElement('option');
                    defaultOpt.value = "";
                    defaultOpt.textContent = "...";
                    select.appendChild(defaultOpt);

                    ex.options.forEach(opt => {
                        const o = document.createElement('option');
                        o.value = opt;
                        o.textContent = opt;
                        select.appendChild(o);
                    });

                    const feedbackArea = document.createElement('div');
                    feedbackArea.className = 'exercise-feedback';

                    const wrapper = document.createElement('span');
                    wrapper.className = 'select-wrapper';
                    wrapper.appendChild(select);
                    textContainer.appendChild(wrapper);

                    select.onchange = () => {
                        if (select.value === ex.answer) {
                            select.classList.add('correct');
                            select.classList.remove('wrong');
                            feedbackArea.style.display = 'none';
                            checkBtn.disabled = false;
                        } else if (select.value !== "") {
                            select.classList.add('wrong');
                            select.classList.remove('correct');
                            feedbackArea.textContent = getTranslation('hintDerDet');
                            feedbackArea.style.display = 'block';
                            checkBtn.disabled = true;
                        } else {
                            select.classList.remove('correct', 'wrong');
                            feedbackArea.style.display = 'none';
                            checkBtn.disabled = true;
                        }
                    };
                    content.appendChild(feedbackArea);
                } else {
                    const span = document.createElement('span');
                    span.textContent = part;
                    textContainer.appendChild(span);
                }
            });

            content.appendChild(textContainer);

            const checkBtn = document.createElement('button');
            checkBtn.className = 'gemini-btn';
            checkBtn.textContent = 'Check';
            checkBtn.disabled = true;
            checkBtn.onclick = () => {
                currentIdx++;
                if (currentIdx < exerciseData.length) {
                    renderStep();
                } else {
                    showFinalScore();
                }
            };

            content.appendChild(checkBtn);
            gameArea.appendChild(content);
        }

        function showFinalScore() {
            gameArea.innerHTML = `
                <div class="pronomen-exercise-content">
                    <h2>Flot klaret! 🎉</h2>
                    <p>Du har styr på 'Der er' og 'Det er'.</p>
                    <button class="gemini-btn" onclick="location.reload()">Tilbage til menu</button>
                </div>
            `;
        }

        renderStep();
    }

    function startAdverbChoiceExercise() {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation('adverbChoice');
        initAdverbChoiceExerciseView(gameArea);
    }

    // --- Game Area (Pronomen Only) ---
    function startExercise(category) {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation(category.key);

        const illustration = document.createElement('img');
        illustration.src = baseUrl + category.img;
        illustration.className = 'pronomen-illustration';
        gameArea.appendChild(illustration);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'pronomen-exercise-content';

        const exerciseList = document.createElement('div');
        exerciseList.className = 'pronomen-list';

        const totalTasks = currentExercises.length;
        let solvedCount = 0;

        currentExercises.forEach((ex, exIdx) => {
            const row = document.createElement('div');
            row.className = 'pronomen-row';

            const personBadge = document.createElement('div');
            personBadge.className = 'person-badge';
            personBadge.textContent = ex.person || "";
            row.appendChild(personBadge);

            const textContainer = document.createElement('div');
            textContainer.className = 'grammatik-text-container';

            const parts = ex.text.split(/(\[blank_\d+\])/);
            parts.forEach(part => {
                const match = part.match(/\[blank_(\d+)\]/);
                if (match) {
                    const idx = match[1];
                    const wrapper = document.createElement('span');
                    wrapper.className = 'select-wrapper';

                    const select = document.createElement('select');
                    select.className = 'grammatik-select';
                    select.dataset.exIdx = exIdx;
                    select.dataset.blankIdx = idx;

                    const defaultOpt = document.createElement('option');
                    defaultOpt.value = "";
                    defaultOpt.textContent = "...";
                    select.appendChild(defaultOpt);

                    const options = [...ex.blanks[idx].options].sort(() => Math.random() - 0.5);
                    options.forEach(opt => {
                        const o = document.createElement('option');
                        o.value = opt;
                        o.textContent = opt;
                        select.appendChild(o);
                    });

                    const feedbackRow = document.createElement('div');
                    feedbackRow.className = 'exercise-feedback-row';
                    feedbackRow.style.display = 'none';

                    select.onchange = () => {
                        const val = select.value;
                        if (val === ex.blanks[idx].answer) {
                            select.classList.add('correct');
                            select.classList.remove('wrong');
                            feedbackRow.style.display = 'none';
                            if (!select.dataset.solved) {
                                select.dataset.solved = "true";
                                solvedCount++;
                                updateSummary();
                            }
                        } else if (val !== "") {
                            select.classList.add('wrong');
                            select.classList.remove('correct');

                            let hintKey = 'hintPronominer';
                            if (category.type === 'subjekt') hintKey = 'hintPronominerSubjekt';
                            else if (category.type === 'objekt') hintKey = 'hintPronominerObjekt';
                            else if (category.type === 'possessiv') hintKey = 'hintPronominerPossessiv';

                            feedbackRow.textContent = getTranslation(hintKey);
                            feedbackRow.style.display = 'block';
                            if (select.dataset.solved) {
                                delete select.dataset.solved;
                                solvedCount--;
                                updateSummary();
                            }
                        } else {
                            select.classList.remove('correct', 'wrong');
                            feedbackRow.style.display = 'none';
                            if (select.dataset.solved) {
                                delete select.dataset.solved;
                                solvedCount--;
                                updateSummary();
                            }
                        }
                    };

                    wrapper.appendChild(select);
                    textContainer.appendChild(wrapper);
                    row.appendChild(textContainer);
                    row.appendChild(feedbackRow);
                } else {
                    const span = document.createElement('span');
                    span.textContent = part;
                    textContainer.appendChild(span);
                }
            });

            exerciseList.appendChild(row);
        });

        contentWrapper.appendChild(exerciseList);

        const resultSummary = document.createElement('div');
        resultSummary.className = 'grammatik-summary';
        resultSummary.style.display = 'block';
        contentWrapper.appendChild(resultSummary);

        const controls = document.createElement('div');
        controls.className = 'game-controls';

        const finishBtn = document.createElement('button');
        finishBtn.className = 'gemini-btn';
        finishBtn.textContent = 'Færdig! 🎉';
        finishBtn.style.display = 'none';
        finishBtn.onclick = () => {
            location.reload();
        };

        function updateSummary() {
            resultSummary.textContent = `${solvedCount} / ${totalTasks} ${getTranslation('correct')}`;
            if (solvedCount === totalTasks) {
                finishBtn.style.display = 'inline-block';
            } else {
                finishBtn.style.display = 'none';
            }
        }

        updateSummary();
        controls.appendChild(finishBtn);
        contentWrapper.appendChild(controls);
        gameArea.appendChild(contentWrapper);
    }

    viewContainer.appendChild(menuArea);
    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
    if (!document.getElementById('pronomen-styles')) {
        const styles = document.createElement('style');
        styles.id = 'pronomen-styles';
        styles.textContent = `
            .pronomen-illustration {
                width: 100%;
                max-width: 500px;
                height: auto;
                border-radius: 20px;
                margin: 0 auto 2rem;
                display: block;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                border: 2px solid rgba(255, 255, 255, 0.1);
            }
            @media (max-width: 600px) {
                .pronomen-illustration { margin-bottom: 1.5rem; border-radius: 12px; }
            }
            .expl-slide {
                text-align: center;
                animation: fadeIn 0.5s ease-out;
            }
            .expl-bubble {
                background: white;
                color: #2c3e50;
                padding: 0.8rem 1.2rem;
                border-radius: 20px;
                display: inline-block;
                font-weight: bold;
                margin-bottom: 1.2rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border: 2px solid #3498db;
                font-size: 1.1rem;
            }
            @media (max-width: 600px) {
                .expl-bubble { font-size: 1rem; padding: 0.6rem 1rem; }
            }
            .expl-text {
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
                color: #ecf0f1;
            }
            @media (max-width: 600px) {
                .expl-text { font-size: 0.95rem; margin-bottom: 1rem; }
            }
            .exercise-progress {
                margin-bottom: 0.8rem;
                font-size: 0.85rem;
                opacity: 0.8;
                text-align: center;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .person-badge {
                display: inline-block;
                background: rgba(52, 152, 219, 0.2);
                color: #3498db;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .pronomen-list {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .pronomen-row {
                background: rgba(255, 255, 255, 0.05);
                padding: 1rem;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .exercise-feedback-row {
                margin-top: 0.5rem;
                color: #e74c3c;
                font-size: 0.9rem;
                font-style: italic;
            }
        `;
        document.head.appendChild(styles);
    }
}
