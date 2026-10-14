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
    backBtn.textContent = '← ' + (getTranslation('back') || 'Tilbage');
    backBtn.onclick = () => navigateFn('traen_sporgsmal_menu');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('sporgsmal_ord_title') || 'Ordstilling i Spørgsmål';
    viewContainer.appendChild(title);
    
    const intro = document.createElement('p');
    intro.className = 'subtitle';
    intro.textContent = getTranslation('sporgsmal_ord_intro') || 'Byg spørgsmålene om Anna. Tryk på ordene i den rigtige rækkefølge.';
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
    let originalSentence, targetWords, scrambledWords;

    function setupSentence() {
        originalSentence = sentences[currentIdx];
        targetWords = originalSentence.split(' ');
        scrambledWords = [...targetWords].sort(() => Math.random() - 0.5);
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
    nextBtn.textContent = getTranslation('sporgsmal_ord_next') || 'Næste →';
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
                if (selectedArr.join(' ') === originalSentence) {
                    feedback.textContent = getTranslation('sporgsmal_ord_success') || 'Korrekt ordstilling! Godt gået.';
                    feedback.className = 'game-feedback success';
                    nextBtn.style.display = 'inline-block';
                } else {
                    feedback.textContent = getTranslation('sporgsmal_ord_error') || 'Forkert ordstilling. Prøv igen!';
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

    gameArea.appendChild(resultArea);
    gameArea.appendChild(wordPool);
    gameArea.appendChild(feedback);
    controls.appendChild(nextBtn);
    gameArea.appendChild(controls);

    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);
}
