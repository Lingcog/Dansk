import { navigate } from '../main.js';
import { getTranslation } from '../utils/i18n.js';

export function renderSporgsmalOrdstillingView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← Tilbage';
    backBtn.onclick = () => navigateFn('traen_sporgsmal_menu');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = 'Ordstilling i Spørgsmål';
    viewContainer.appendChild(title);
    
    const intro = document.createElement('p');
    intro.className = 'subtitle';
    intro.textContent = 'Byg spørgsmålene om Anna. Tryk på ordene i den rigtige rækkefølge.';
    viewContainer.appendChild(intro);

    const gameArea = document.createElement('div');
    gameArea.className = 'ordstilling-game-area';

    const sentences = [
        "Hvad køber Anna?",
        "Køber Anna frugt?",
        "Hvor meget betaler Anna?",
        "Betaler Anna 100 kroner?",
        "Hvor køber Anna ind?",
        "Køber Anna ind i Netto?",
        "Hvornår køber Anna ind?",
        "Køber Anna ind klokken 14?",
        "Hvordan betaler Anna?",
        "Betaler Anna med kort?",
        "Hvordan kommer Anna til Netto?",
        "Kører Anna i bil?",
        "Hvem køber Anna ind sammen med?",
        "Køber Anna ind alene?"
    ];

    let currentIdx = 0;
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
    nextBtn.textContent = 'Næste →';
    nextBtn.style.display = 'none';
    nextBtn.onclick = () => {
        currentIdx = (currentIdx + 1) % sentences.length;
        renderWords();
    };

    function renderWords() {
        setupSentence();
        gameArea.innerHTML = '';

        gameArea.appendChild(resultArea);
        gameArea.appendChild(wordPool);
        gameArea.appendChild(feedback);
        controls.innerHTML = '';
        controls.appendChild(nextBtn);
        gameArea.appendChild(controls);
        nextBtn.style.display = 'none';
        feedback.textContent = '';
        
        // Initial setup
        wordPool.innerHTML = '';
        resultArea.innerHTML = '';
        
        scrambledWords.forEach(word => {
            const chip = document.createElement('div');
            chip.className = 'word-chip pool';
            chip.textContent = word;
            
            // Allow click to move as a fallback
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
            
            // Update classes
            Array.from(resultArea.children).forEach(c => c.classList.replace('pool', 'result-chip'));
            poolArr.forEach(c => c.classList.replace('result-chip', 'pool'));
            
            // Remove placeholder behavior (now it's just min-height via CSS)
            if (poolArr.length === 0) {
                if (selectedArr.join(' ') === originalSentence) {
                    feedback.textContent = 'Korrekt ordstilling! Godt gået.';
                    feedback.className = 'game-feedback success';
                    nextBtn.style.display = 'inline-block';
                } else {
                    feedback.textContent = 'Forkert ordstilling. Prøv igen!';
                    feedback.className = 'game-feedback error';
                    nextBtn.style.display = 'none';
                }
            } else {
                feedback.textContent = '';
                nextBtn.style.display = 'none';
            }
        }

        // Initialize SortableJS if available
        if (window.Sortable) {
            new window.Sortable(wordPool, {
                group: 'sporgsmal-ordstilling',
                animation: 150,
                onEnd: checkCorrect
            });
            new window.Sortable(resultArea, {
                group: 'sporgsmal-ordstilling',
                animation: 150,
                onEnd: checkCorrect
            });
        }
    }

    renderWords();

    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
    if (!document.getElementById('ordstilling-styles')) {
        const styles = document.createElement('style');
        styles.id = 'ordstilling-styles';
        styles.textContent = `
            .ordstilling-game-area { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-top: 0.5rem; }
            .result-sentence-area { width: 100%; min-height: 80px; background: rgba(255, 255, 255, 0.05); border: 2px dashed rgba(255, 255, 255, 0.2); border-radius: 16px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.5rem; padding: 1rem; margin-bottom: 1.5rem; }
            @media (max-width: 600px) {
                .result-sentence-area { min-height: 60px; padding: 0.8rem; gap: 0.4rem; border-radius: 12px; }
            }
            .result-placeholder { color: rgba(255, 255, 255, 0.4); font-size: 1.2rem; }
            .word-pool { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8rem; width: 100%; margin-bottom: 1.5rem; }
            @media (max-width: 600px) {
                .word-pool { gap: 0.5rem; }
            }
            .word-chip { background: var(--card-bg); border: 2px solid rgba(255, 255, 255, 0.15); color: var(--text-main); padding: 0.8rem 1.2rem; border-radius: 10px; cursor: pointer; font-size: 1.2rem; font-weight: 500; transition: all 0.2s; user-select: none; }
            @media (max-width: 600px) {
                .word-chip { padding: 0.6rem 0.9rem; font-size: 1rem; border-radius: 8px; }
            }
            .word-chip:hover { background: var(--card-hover); transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.6); }
            .result-chip { background: rgba(255, 255, 255, 0.15); border-color: var(--ring-color); }
            .game-controls { display: flex; gap: 1rem; justify-content: center; }
            .game-feedback { font-size: 1.2rem; font-weight: 600; min-height: 1.5rem; transition: all 0.3s; text-align: center; margin-bottom: 1rem; }
            @media (max-width: 600px) {
                .game-feedback { font-size: 1.1rem; }
            }
            .game-feedback.success { color: #4CAF50; }
            .game-feedback.error { color: #FF5252; }
        `;
        document.head.appendChild(styles);
    }
}
