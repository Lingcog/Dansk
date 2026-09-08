import { navigate } from '../main.js';
import { baseUrl } from '../utils/config.js';
import { getLang, getTranslation } from '../utils/i18n.js';
import { ordstillingData } from '../utils/ordstillingData.js';

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
    intro.textContent = "Træn ordstilling: Inversion og centraladverbiernes placering.";
    menuArea.appendChild(intro);

    const levels = [
        { key: 'hovedsaetninger', icon: '🏠' },
        { key: 'ledsaetninger', icon: '🧩' },
        { key: 'inversion', icon: '🔄' },
        { key: 'master', icon: '👑' }
    ];

    const grid = document.createElement('div');
    grid.className = 'grid';
    levels.forEach(l => {
        const categoryData = ordstillingData[l.key];
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => startExercise(l.key);

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.textContent = l.icon;

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = categoryData.title;

        card.appendChild(icon);
        card.appendChild(cardTitle);
        grid.appendChild(card);
    });
    menuArea.appendChild(grid);
    viewContainer.appendChild(menuArea);

    // --- Game Logic ---
    function startExercise(categoryKey) {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        
        const categoryData = ordstillingData[categoryKey];
        title.textContent = categoryData.title;

        const sentences = categoryData.sentences;
        let currentIdx = Math.floor(Math.random() * sentences.length);
        let currentSentence, targetWords, scrambledWords;

        function setupSentence() {
            currentSentence = sentences[currentIdx];
            targetWords = [...currentSentence.draggable];
            scrambledWords = [...targetWords].sort(() => Math.random() - 0.5);
        }

        const pedFrame = document.createElement('div');
        pedFrame.className = 'pedagogical-frame';
        pedFrame.innerHTML = categoryData.explanation;

        const splitArea = document.createElement('div');
        splitArea.className = 'split-sentence-area';
        
        const prefixSpan = document.createElement('span');
        prefixSpan.className = 'locked-text';
        
        const resultArea = document.createElement('div');
        resultArea.className = 'result-sentence-area';
        
        const suffixSpan = document.createElement('span');
        suffixSpan.className = 'locked-text';
        
        splitArea.appendChild(prefixSpan);
        splitArea.appendChild(resultArea);
        splitArea.appendChild(suffixSpan);

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

            gameArea.appendChild(pedFrame);
            
            prefixSpan.textContent = currentSentence.lockedPrefix;
            suffixSpan.textContent = currentSentence.lockedSuffix;
            
            gameArea.appendChild(splitArea);
            gameArea.appendChild(wordPool);
            gameArea.appendChild(feedback);
            controls.innerHTML = '';
            controls.appendChild(nextBtn);
            gameArea.appendChild(controls);
            nextBtn.style.display = 'none';
            feedback.textContent = '';
            
            wordPool.innerHTML = '';
            resultArea.innerHTML = '';
            
            scrambledWords.forEach(word => {
                const chip = document.createElement('div');
                chip.className = 'word-chip pool';
                chip.textContent = word;
                
                chip.onclick = () => {
                    if (chip.parentElement === wordPool) {
                        resultArea.appendChild(chip);
                        chip.classList.replace('pool', 'result-chip');
                    } else {
                        wordPool.appendChild(chip);
                        chip.classList.replace('result-chip', 'pool');
                    }
                    checkCorrect();
                };
                wordPool.appendChild(chip);
            });

            function checkCorrect() {
                const selectedArr = Array.from(resultArea.children).map(c => c.textContent);
                const poolArr = Array.from(wordPool.children);
                
                Array.from(resultArea.children).forEach(c => c.classList.replace('pool', 'result-chip'));
                poolArr.forEach(c => c.classList.replace('result-chip', 'pool'));
                
                if (poolArr.length === 0) {
                    if (selectedArr.join(' ') === currentSentence.correct) {
                        feedback.textContent = getTranslation('correctOrder') || 'Helt rigtigt!';
                        feedback.className = 'game-feedback success';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        feedback.textContent = currentSentence.hint;
                        feedback.className = 'game-feedback error';
                        nextBtn.style.display = 'none';
                    }
                } else {
                    feedback.textContent = '';
                    nextBtn.style.display = 'none';
                }
            }

            if (window.Sortable) {
                new window.Sortable(wordPool, {
                    group: 'main-ordstilling',
                    animation: 150,
                    onEnd: checkCorrect
                });
                new window.Sortable(resultArea, {
                    group: 'main-ordstilling',
                    animation: 150,
                    onEnd: checkCorrect
                });
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
            .pedagogical-frame { background: rgba(var(--primary-rgb), 0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border-left: 4px solid var(--primary-color); font-size: 1.1rem; line-height: 1.6; color: var(--text-main); }
            .split-sentence-area { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem; margin-bottom: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); }
            .locked-text { font-size: 1.3rem; font-weight: 500; color: var(--text-main); }
            .result-sentence-area { min-width: 150px; min-height: 60px; background: rgba(0, 0, 0, 0.2); border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; padding: 0.8rem; flex-grow: 1; }
            @media (max-width: 600px) {
                .result-sentence-area { min-height: 50px; padding: 0.6rem; gap: 0.4rem; border-radius: 12px; min-width: 100px; }
                .locked-text { font-size: 1.1rem; }
                .split-sentence-area { padding: 1rem; gap: 0.5rem; }
                .pedagogical-frame { padding: 1rem; font-size: 1rem; margin-bottom: 1.5rem; }
            }
            .word-pool { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; width: 100%; margin-bottom: 1.5rem; min-height: 60px; padding: 1rem; background: rgba(255, 255, 255, 0.02); border-radius: 12px; }
            @media (max-width: 600px) {
                .word-pool { gap: 0.4rem; padding: 0.8rem; }
            }
            .word-chip { background: var(--card-bg); border: 2px solid rgba(255, 255, 255, 0.1); color: var(--text-main); padding: 0.6rem 1rem; border-radius: 10px; cursor: pointer; font-size: 1.1rem; font-weight: 500; transition: all 0.2s; user-select: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            @media (max-width: 600px) {
                .word-chip { padding: 0.5rem 0.8rem; font-size: 0.95rem; border-radius: 8px; }
            }
            .word-chip:hover { background: var(--card-hover); transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.5); }
            .result-chip { background: rgba(var(--primary-rgb), 0.2); border-color: var(--primary-color); }
            .game-controls { display: flex; gap: 1rem; justify-content: center; }
            .game-feedback { font-size: 1.1rem; font-weight: 600; min-height: 2rem; transition: all 0.3s; text-align: center; margin-bottom: 1rem; padding: 0.5rem; border-radius: 8px; }
            @media (max-width: 600px) {
                .game-feedback { font-size: 1rem; }
            }
            .game-feedback.success { color: #4CAF50; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; }
            .game-feedback.error { color: #FF5252; background: rgba(255, 82, 82, 0.1); border: 1px solid #FF5252; }
        `;
        document.head.appendChild(styles);
    }
}
