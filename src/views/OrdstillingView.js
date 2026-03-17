import { navigate } from '../main.js';
import { baseUrl } from '../utils/config.js';
import { getLang, getTranslation } from '../utils/i18n.js';

export function renderOrdstillingView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => {
        if (gameArea.style.display === 'block') {
            gameArea.style.display = 'none';
            menuArea.style.display = 'block';
            title.textContent = getTranslation('ordstilling');
        } else {
            navigateFn('dagens_opgave');
        }
    };
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('ordstilling');
    viewContainer.appendChild(title);

    const menuArea = document.createElement('div');
    const gameArea = document.createElement('div');
    gameArea.style.display = 'none';

    // --- Menu Area ---
    const intro = document.createElement('p');
    intro.className = 'subtitle';
    intro.textContent = getTranslation('ordstillingDesc');
    menuArea.appendChild(intro);

    const levels = [
        { key: 'let', level: 'A1', icon: '🌱' },
        { key: 'mellemsvaer', level: 'A2', icon: '🌿' }
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

    // --- Game Logic ---
    function startExercise(level) {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation(level === 'A1' ? 'ordstillingLet' : 'ordstillingSvaer');

        const sentencesA1 = [
            "Jeg hedder Mikael.", "Jeg kommer fra Danmark.", "Hvor gammel er du?",
            "Jeg bor i København.", "Hvad laver du?", "Jeg har en hund.",
            "Min bil er rød.", "Kaffen er varm."
        ];
        const sentencesA2 = [
            "Solen skinner altid i min have.", "Jeg kan godt lide at lære dansk.",
            "Vi ses i morgen på sprogskolen.", "Kan du tale dansk og engelsk?",
            "I går var jeg i biografen med min ven.", "Jeg skal købe ind i supermarkedet nu.",
            "Hvorfor kom du ikke til festen?", "Det er vigtigt at øve sig hver dag."
        ];

        const sentences = level === 'A1' ? sentencesA1 : sentencesA2;
        let currentIdx = Math.floor(Math.random() * sentences.length);
        let originalSentence, targetWords, scrambledWords, userWords;

        function setupSentence() {
            originalSentence = sentences[currentIdx];
            targetWords = originalSentence.split(' ');
            scrambledWords = [...targetWords].sort(() => Math.random() - 0.5);
            userWords = [];
        }

        const resultArea = document.createElement('div');
        resultArea.className = 'result-sentence-area';
        const wordPool = document.createElement('div');
        wordPool.className = 'word-pool';
        const feedback = document.createElement('div');
        feedback.className = 'game-feedback';
        const controls = document.createElement('div');
        controls.className = 'game-controls';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = getTranslation('next');
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            currentIdx = (currentIdx + 1) % sentences.length;
            renderWords();
        };

        function renderWords() {
            setupSentence();
            gameArea.innerHTML = '';

            const illustration = document.createElement('img');
            illustration.src = baseUrl + 'v2_master_diagram.png';
            illustration.className = 'v2-illustration';
            gameArea.appendChild(illustration);

            gameArea.appendChild(resultArea);
            gameArea.appendChild(wordPool);
            gameArea.appendChild(feedback);
            controls.innerHTML = '';
            controls.appendChild(nextBtn);
            gameArea.appendChild(controls);
            nextBtn.style.display = 'none';
            feedback.textContent = '';
            updateUI();
        }

        function updateUI() {
            wordPool.innerHTML = '';
            scrambledWords.forEach((word, idx) => {
                const chip = document.createElement('div');
                chip.className = 'word-chip';
                chip.textContent = word;
                chip.onclick = () => {
                    scrambledWords.splice(idx, 1);
                    userWords.push(word);
                    updateUI();
                };
                wordPool.appendChild(chip);
            });

            resultArea.innerHTML = '';
            if (userWords.length === 0) {
                resultArea.innerHTML = '<div class="result-placeholder">...</div>';
            } else {
                userWords.forEach((word, idx) => {
                    const chip = document.createElement('div');
                    chip.className = 'word-chip result-chip';
                    chip.textContent = word;
                    chip.onclick = () => {
                        userWords.splice(idx, 1);
                        scrambledWords.push(word);
                        updateUI();
                    };
                    resultArea.appendChild(chip);
                });
            }

            // Automatic check
            if (userWords.length > 0 && scrambledWords.length === 0) {
                const userSentence = userWords.join(' ');
                if (userSentence === originalSentence) {
                    feedback.textContent = getTranslation('correctOrder');
                    feedback.className = 'game-feedback success';
                    nextBtn.style.display = 'inline-block';
                } else {
                    feedback.textContent = getTranslation('wrongOrder');
                    feedback.className = 'game-feedback error';
                }
            } else {
                feedback.textContent = '';
            }
        }

        renderWords();
    }

    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
    if (!document.getElementById('ordstilling-styles')) {
        const styles = document.createElement('style');
        styles.id = 'ordstilling-styles';
        styles.textContent = `
            .ordstilling-game-area { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-top: 0.5rem; }
            .result-sentence-area { width: 100%; min-height: 60px; background: rgba(255, 255, 255, 0.05); border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; padding: 0.8rem; margin-bottom: 1.5rem; }
            @media (max-width: 600px) {
                .result-sentence-area { min-height: 50px; padding: 0.6rem; gap: 0.4rem; border-radius: 12px; }
            }
            .result-placeholder { color: rgba(255, 255, 255, 0.3); font-size: 1.2rem; }
            .word-pool { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; width: 100%; margin-bottom: 1.5rem; }
            @media (max-width: 600px) {
                .word-pool { gap: 0.4rem; }
            }
            .word-chip { background: var(--card-bg); border: 2px solid rgba(255, 255, 255, 0.1); color: var(--text-main); padding: 0.6rem 1rem; border-radius: 10px; cursor: pointer; font-size: 1rem; font-weight: 500; transition: all 0.2s; user-select: none; }
            @media (max-width: 600px) {
                .word-chip { padding: 0.5rem 0.8rem; font-size: 0.95rem; border-radius: 8px; }
            }
            .word-chip:hover { background: var(--card-hover); transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.5); }
            .result-chip { background: rgba(255, 255, 255, 0.15); border-color: var(--ring-color); }
            .game-controls { display: flex; gap: 1rem; justify-content: center; }
            .game-feedback { font-size: 1.1rem; font-weight: 600; min-height: 1.5rem; transition: all 0.3s; text-align: center; margin-bottom: 1rem; }
            @media (max-width: 600px) {
                .game-feedback { font-size: 1rem; }
            }
            .game-feedback.success { color: #4CAF50; }
            .game-feedback.error { color: #FF5252; }
            .v2-illustration {
                width: 100%;
                max-width: 500px;
                height: auto;
                border-radius: 16px;
                margin-bottom: 1.5rem;
                display: block;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }
            @media (max-width: 600px) {
                .v2-illustration { border-radius: 10px; margin-bottom: 1rem; }
            }
        `;
        document.head.appendChild(styles);
    }
}
