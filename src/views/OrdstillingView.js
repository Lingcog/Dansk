import { getLang, getTranslation, navigate, baseUrl } from '../main.js';

export function renderOrdstillingView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('ordstilling');
    viewContainer.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'subtitle';
    desc.textContent = getTranslation('ordstillingDesc');
    viewContainer.appendChild(desc);

    // Game State
    const sentences = [
        "Jeg hedder Mikael.",
        "Hvad skal vi lave i dag?",
        "Jeg kommer fra Danmark.",
        "Solen skinner altid i min have.",
        "Hvor gammel er du?",
        "Jeg kan godt lide at lære dansk.",
        "Vi ses i morgen på sprogskolen.",
        "Kan du tale dansk?"
    ];

    let currentIdx = Math.floor(Math.random() * sentences.length);
    let originalSentence = sentences[currentIdx];
    let targetWords = originalSentence.split(' ');
    let scrambledWords = [...targetWords].sort(() => Math.random() - 0.5);
    let userWords = [];

    // UI Elements
    const gameArea = document.createElement('div');
    gameArea.className = 'ordstilling-game-area';

    const resultArea = document.createElement('div');
    resultArea.className = 'result-sentence-area';
    const resultPlaceholder = document.createElement('div');
    resultPlaceholder.className = 'result-placeholder';
    resultPlaceholder.textContent = "...";
    resultArea.appendChild(resultPlaceholder);

    const wordPool = document.createElement('div');
    wordPool.className = 'word-pool';

    const feedback = document.createElement('div');
    feedback.className = 'game-feedback';

    const controls = document.createElement('div');
    controls.className = 'game-controls';

    const checkBtn = document.createElement('button');
    checkBtn.className = 'gemini-btn';
    checkBtn.textContent = getTranslation('checkResult');
    checkBtn.onclick = checkAnswer;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gemini-btn';
    nextBtn.textContent = "Næste →";
    nextBtn.style.display = 'none';
    nextBtn.onclick = nextSentence;

    function renderWords() {
        wordPool.innerHTML = '';
        scrambledWords.forEach((word, idx) => {
            const chip = document.createElement('div');
            chip.className = 'word-chip';
            chip.textContent = word;
            chip.onclick = () => moveWordToResult(idx);
            wordPool.appendChild(chip);
        });

        resultArea.innerHTML = '';
        if (userWords.length === 0) {
            resultArea.appendChild(resultPlaceholder);
        } else {
            userWords.forEach((word, idx) => {
                const chip = document.createElement('div');
                chip.className = 'word-chip result-chip';
                chip.textContent = word;
                chip.onclick = () => moveWordToPool(idx);
                resultArea.appendChild(chip);
            });
        }
    }

    function moveWordToResult(idx) {
        const word = scrambledWords.splice(idx, 1)[0];
        userWords.push(word);
        renderWords();
        feedback.textContent = '';
        feedback.className = 'game-feedback';
    }

    function moveWordToPool(idx) {
        const word = userWords.splice(idx, 1)[0];
        scrambledWords.push(word);
        renderWords();
        feedback.textContent = '';
        feedback.className = 'game-feedback';
    }

    function checkAnswer() {
        const userSentence = userWords.join(' ');
        if (userSentence === originalSentence) {
            feedback.textContent = getTranslation('correctOrder');
            feedback.className = 'game-feedback success';
            checkBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
        } else {
            feedback.textContent = getTranslation('wrongOrder');
            feedback.className = 'game-feedback error';
        }
    }

    function nextSentence() {
        currentIdx = (currentIdx + 1) % sentences.length;
        originalSentence = sentences[currentIdx];
        targetWords = originalSentence.split(' ');
        scrambledWords = [...targetWords].sort(() => Math.random() - 0.5);
        userWords = [];
        feedback.textContent = '';
        feedback.className = 'game-feedback';
        checkBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
        renderWords();
    }

    gameArea.appendChild(resultArea);
    gameArea.appendChild(wordPool);
    gameArea.appendChild(feedback);

    controls.appendChild(checkBtn);
    controls.appendChild(nextBtn);
    gameArea.appendChild(controls);

    viewContainer.appendChild(gameArea);

    // Add specific styles for this view
    const styles = document.createElement('style');
    styles.textContent = `
        .ordstilling-game-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            margin-top: 1rem;
        }
        .result-sentence-area {
            width: 100%;
            min-height: 80px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;
            padding: 1rem;
        }
        .result-placeholder {
            color: rgba(255, 255, 255, 0.3);
            font-size: 1.5rem;
        }
        .word-pool {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;
            width: 100%;
        }
        .word-chip {
            background: var(--card-bg);
            border: 2px solid rgba(255, 255, 255, 0.1);
            color: var(--text-main);
            padding: 0.8rem 1.2rem;
            border-radius: 12px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 500;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
            user-select: none;
        }
        .word-chip:hover {
            background: var(--card-hover);
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 0.5);
        }
        .word-chip:active {
            transform: scale(0.95);
        }
        .result-chip {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--ring-color);
        }
        .game-controls {
            display: flex;
            gap: 1rem;
        }
        .game-feedback {
            font-size: 1.2rem;
            font-weight: 600;
            height: 1.5rem;
            transition: all 0.3s;
        }
        .game-feedback.success {
            color: #4CAF50;
        }
        .game-feedback.error {
            color: #FF5252;
            animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(styles);

    renderWords();
    container.appendChild(viewContainer);
}
