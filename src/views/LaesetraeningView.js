import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderLaesetraeningView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container laesetraening-container';

    if (!document.getElementById('laesetraening-styles')) {
        const style = document.createElement('style');
        style.id = 'laesetraening-styles';
        style.textContent = `
            .laesetraening-container {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background-color: #1a2f27;
                color: #e0e0e0;
                font-family: sans-serif;
                position: relative;
                align-items: center;
                padding-top: 4rem;
                padding-bottom: 2rem;
            }
            .laese-top-bar {
                padding: 1rem;
                display: flex;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 10;
            }
            .laese-back-btn {
                background: none;
                border: none;
                color: #e0e0e0;
                font-size: 1.2rem;
                cursor: pointer;
            }
            .laese-progress-text {
                position: absolute;
                top: 1.2rem;
                right: 1rem;
                font-size: 1rem;
                color: #a0b0a8;
                font-weight: bold;
            }

            /* MENU STYLES */
            .laese-menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                width: 90%;
                max-width: 400px;
                margin-top: 2rem;
            }
            .laese-menu-title {
                font-size: 2rem;
                color: white;
                margin-bottom: 1rem;
            }
            .laese-level-btn {
                width: 100%;
                background-color: #233b31;
                border: 2px solid #3a5c4d;
                border-radius: 12px;
                padding: 1.5rem;
                font-size: 1.2rem;
                color: white;
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s;
                text-align: left;
                display: flex;
                flex-direction: column;
            }
            .laese-level-btn:hover {
                background-color: #2a473a;
            }
            .laese-level-btn:active {
                transform: scale(0.98);
            }
            .laese-level-title {
                font-weight: bold;
                font-size: 1.3rem;
                margin-bottom: 0.3rem;
            }
            .laese-level-desc {
                font-size: 0.9rem;
                color: #a0b0a8;
            }

            /* EXERCISE STYLES */
            .laese-header-text {
                font-size: 3rem;
                font-weight: bold;
                margin-bottom: 1rem;
                color: #ffffff;
                transition: color 0.3s;
                min-height: 4rem;
                text-align: center;
            }
            .laese-listen-btn {
                background-color: #64b5f6;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 0.8rem 2rem;
                font-size: 1.2rem;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 2rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .laese-listen-btn:active {
                transform: scale(0.95);
            }
            .laese-instruction {
                font-size: 1.1rem;
                color: #b0c4ba;
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .laese-count-phase {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }

            .laese-speak-phase {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                gap: 2rem;
            }

            .laese-draggables-area {
                display: flex;
                justify-content: center;
                margin-bottom: 3rem;
                min-height: 60px;
            }
            .laese-token {
                background-color: #4caf50;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1.1rem;
                cursor: grab;
                user-select: none;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .laese-token:active {
                cursor: grabbing;
            }
            .laese-dropzone {
                width: 90%;
                max-width: 500px;
                min-height: 120px;
                border: 2px solid #3a5c4d;
                border-radius: 12px;
                background-color: #233b31;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                margin-bottom: 2rem;
                position: relative;
                flex-wrap: wrap;
                padding: 10px;
            }
            .laese-dropzone.drag-over {
                background-color: #2a473a;
                border-color: #4caf50;
            }
            .laese-dropzone-placeholder {
                color: #6a8c7d;
                position: absolute;
                pointer-events: none;
                font-size: 1rem;
            }
            .laese-bottom-buttons {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                justify-content: center;
                width: 100%;
            }
            .laese-action-btn {
                background-color: #3e5248;
                color: #b0c4ba;
                border: none;
                border-radius: 20px;
                padding: 0.8rem 1.5rem;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .laese-action-btn:hover {
                background-color: #4a6356;
            }
            .laese-action-btn:active {
                transform: scale(0.95);
            }
            .laese-action-btn.primary {
                background-color: #4caf50;
                color: white;
            }
            .laese-action-btn.primary:hover {
                background-color: #45a049;
            }

            /* MIC BUTTON */
            .laese-btn-mic {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: none;
                background-color: #4caf50;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                cursor: pointer;
                color: white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: transform 0.2s;
            }
            .laese-btn-mic:active {
                transform: scale(0.9);
            }
            .laese-btn-mic.listening {
                background-color: #f44336;
                animation: pulse-red 1.5s infinite;
            }
            @keyframes pulse-red {
                0% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(244, 67, 54, 0); }
                100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0); }
            }

            .laese-feedback {
                margin-top: 0.5rem;
                font-size: 1.2rem;
                font-weight: bold;
                min-height: 1.5rem;
                text-align: center;
                max-width: 90%;
            }

            /* COMPLETION STYLES */
            .laese-completion {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                flex: 1;
                width: 90%;
            }
            .laese-star {
                font-size: 5rem;
                margin-bottom: 1rem;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popIn {
                0% { transform: scale(0); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Data
    const wordSets = {
        1: {
            title: "Sæt 1: Fundamentet",
            desc: "Korte, simple ord",
            words: [
                { word: 'sol', count: 3 }, { word: 'bus', count: 3 }, { word: 'mad', count: 3 }, { word: 'hus', count: 3 }, { word: 'banan', count: 5 },
                { word: 'pen', count: 3 }, { word: 'vin', count: 3 }, { word: 'ben', count: 3 }, { word: 'kat', count: 3 }, { word: 'lys', count: 3 }
            ]
        },
        2: {
            title: "Sæt 2: Konsonantklynger",
            desc: "Ord med flere konsonanter i træk",
            words: [
                { word: 'sko', count: 3 }, { word: 'stol', count: 4 }, { word: 'mælk', count: 4 }, { word: 'plakat', count: 6 }, { word: 'slik', count: 4 },
                { word: 'prins', count: 5 }, { word: 'glas', count: 4 }, { word: 'strøm', count: 5 }, { word: 'frisk', count: 5 }, { word: 'blomst', count: 6 }
            ]
        },
        3: {
            title: "Sæt 3: Vokalkombinationer",
            desc: "Flere vokaler ved siden af hinanden",
            words: [
                { word: 'kaos', count: 4 }, { word: 'kiosk', count: 5 }, { word: 'ruin', count: 4 }, { word: 'viol', count: 4 }, { word: 'oase', count: 4 },
                { word: 'poet', count: 4 }, { word: 'radio', count: 5 }, { word: 'piano', count: 5 }, { word: 'koala', count: 5 }, { word: 'fias', count: 4 }
            ]
        },
        4: {
            title: "Sæt 4: Modultest",
            desc: "Fonetisk træning med vrøvleord",
            words: [
                { word: 'mys', count: 3 }, { word: 'bøt', count: 3 }, { word: 'dul', count: 3 }, { word: 'sæn', count: 3 }, { word: 'epi', count: 3 },
                { word: 'flæ', count: 3 }, { word: 'smø', count: 3 }, { word: 'prå', count: 3 }, { word: 'klu', count: 3 }, { word: 'vri', count: 3 },
                { word: 'peni', count: 4 }, { word: 'lona', count: 4 }, { word: 'salu', count: 4 }, { word: 'mibo', count: 4 }, { word: 'tuvu', count: 4 },
                { word: 'bomi', count: 4 }, { word: 'nave', count: 4 }, { word: 'almo', count: 4 }, { word: 'eksi', count: 4 }, { word: 'vamo', count: 4 }
            ]
        }
    };

    // State
    let currentSetId = null;
    let currentWordIndex = 0;
    let score = 0;

    // TTS Setup
    const synth = window.speechSynthesis;
    let voice = null;
    function loadVoices() {
        const voices = synth.getVoices();
        const daVoices = voices.filter(v => v.lang === 'da-DK' || v.lang === 'da_DK');
        voice = daVoices[0] || voices[0];
    }
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }

    // STT Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'da-DK';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    }

    function renderView() {
        viewContainer.innerHTML = ''; // Clear container

        // Top Bar
        const topBar = document.createElement('div');
        topBar.className = 'laese-top-bar';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'laese-back-btn';
        backBtn.innerHTML = `← Tilbage`;
        backBtn.onclick = () => {
            synth.cancel();
            if (recognition) recognition.abort();
            if (currentSetId !== null) {
                currentSetId = null;
                renderView();
            } else {
                navigateFn('traen_udtale_menu');
            }
        };
        topBar.appendChild(backBtn);

        // Progress text
        if (currentSetId !== null) {
            const progress = document.createElement('div');
            progress.className = 'laese-progress-text';
            progress.textContent = `${currentWordIndex + 1} / ${wordSets[currentSetId].words.length}`;
            topBar.appendChild(progress);
        }

        viewContainer.appendChild(topBar);

        if (currentSetId === null) {
            renderMenu();
        } else if (currentWordIndex < wordSets[currentSetId].words.length) {
            renderExercise();
        } else {
            renderCompletion();
        }
    }

    function renderMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.className = 'laese-menu';

        const title = document.createElement('div');
        title.className = 'laese-menu-title';
        title.textContent = 'Vælg Niveau';
        menuContainer.appendChild(title);

        [1, 2, 3, 4].forEach(id => {
            const btn = document.createElement('button');
            btn.className = 'laese-level-btn';
            btn.innerHTML = `
                <div class="laese-level-title">${wordSets[id].title}</div>
                <div class="laese-level-desc">${wordSets[id].desc}</div>
            `;
            btn.onclick = () => {
                currentSetId = id;
                currentWordIndex = 0;
                score = 0;
                renderView();
            };
            menuContainer.appendChild(btn);
        });

        viewContainer.appendChild(menuContainer);
    }

    function renderExercise() {
        const wordData = wordSets[currentSetId].words[currentWordIndex];
        let exercisePhase = 'COUNT'; // 'COUNT', 'SPEAK', 'DONE'

        const headerText = document.createElement('div');
        headerText.className = 'laese-header-text';
        headerText.textContent = '?';
        viewContainer.appendChild(headerText);

        const listenBtn = document.createElement('button');
        listenBtn.className = 'laese-listen-btn';
        listenBtn.innerHTML = '🔊 Lyt til ordet';
        
        listenBtn.onclick = () => {
            synth.cancel();
            if (!voice) loadVoices();
            const utterance = new SpeechSynthesisUtterance(wordData.word);
            if (voice) utterance.voice = voice;
            utterance.lang = 'da-DK';
            utterance.rate = 0.85;
            synth.speak(utterance);
        };
        viewContainer.appendChild(listenBtn);

        const instruction = document.createElement('div');
        instruction.className = 'laese-instruction';
        instruction.textContent = 'Hvor mange lyde hører du?';
        viewContainer.appendChild(instruction);

        // -----------------------------------------
        // COUNT PHASE UI
        // -----------------------------------------
        const countPhaseContainer = document.createElement('div');
        countPhaseContainer.className = 'laese-count-phase';

        const draggablesArea = document.createElement('div');
        draggablesArea.className = 'laese-draggables-area';

        const token = document.createElement('div');
        token.className = 'laese-token';
        token.textContent = 'Lyd';
        token.draggable = true;

        token.onclick = () => addTokenToDropzone();
        token.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', 'lyd-token');
            e.dataTransfer.effectAllowed = 'copy';
        };

        draggablesArea.appendChild(token);
        countPhaseContainer.appendChild(draggablesArea);

        const dropzone = document.createElement('div');
        dropzone.className = 'laese-dropzone';
        
        const placeholder = document.createElement('div');
        placeholder.className = 'laese-dropzone-placeholder';
        placeholder.textContent = 'Træk brikker herned';
        dropzone.appendChild(placeholder);

        dropzone.ondragover = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            dropzone.classList.add('drag-over');
        };

        dropzone.ondragleave = (e) => {
            dropzone.classList.remove('drag-over');
        };

        dropzone.ondrop = (e) => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            const data = e.dataTransfer.getData('text/plain');
            if (data === 'lyd-token') {
                addTokenToDropzone();
            }
        };

        function addTokenToDropzone() {
            placeholder.style.display = 'none';
            const clonedToken = document.createElement('div');
            clonedToken.className = 'laese-token';
            clonedToken.textContent = 'Lyd';
            
            clonedToken.onclick = () => {
                clonedToken.remove();
                if (dropzone.querySelectorAll('.laese-token').length === 0) {
                    placeholder.style.display = 'block';
                }
            };
            dropzone.appendChild(clonedToken);
        }

        countPhaseContainer.appendChild(dropzone);
        
        const countButtons = document.createElement('div');
        countButtons.className = 'laese-bottom-buttons';
        
        const rydBtn = document.createElement('button');
        rydBtn.className = 'laese-action-btn';
        rydBtn.textContent = 'Ryd';
        rydBtn.onclick = () => {
            const tokens = dropzone.querySelectorAll('.laese-token');
            tokens.forEach(t => t.remove());
            placeholder.style.display = 'block';
            feedbackText.textContent = '';
        };

        const tjekBtn = document.createElement('button');
        tjekBtn.className = 'laese-action-btn primary';
        tjekBtn.textContent = 'Tjek svar';
        
        countButtons.appendChild(rydBtn);
        countButtons.appendChild(tjekBtn);
        countPhaseContainer.appendChild(countButtons);

        viewContainer.appendChild(countPhaseContainer);

        // -----------------------------------------
        // SPEAK PHASE UI (Hidden initially)
        // -----------------------------------------
        const speakPhaseContainer = document.createElement('div');
        speakPhaseContainer.className = 'laese-speak-phase';
        speakPhaseContainer.style.display = 'none';

        const micBtn = document.createElement('button');
        micBtn.className = 'laese-btn-mic';
        micBtn.innerHTML = '🎤';

        const speakButtons = document.createElement('div');
        speakButtons.className = 'laese-bottom-buttons';
        
        const skipBtn = document.createElement('button');
        skipBtn.className = 'laese-action-btn';
        skipBtn.textContent = 'Spring over / Næste';

        speakButtons.appendChild(skipBtn);
        speakPhaseContainer.appendChild(micBtn);
        speakPhaseContainer.appendChild(speakButtons);
        viewContainer.appendChild(speakPhaseContainer);

        // -----------------------------------------
        // DONE PHASE UI (Hidden initially)
        // -----------------------------------------
        const donePhaseContainer = document.createElement('div');
        donePhaseContainer.className = 'laese-bottom-buttons';
        donePhaseContainer.style.display = 'none';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'laese-action-btn primary';
        nextBtn.textContent = 'Næste Ord';
        nextBtn.onclick = () => {
            currentWordIndex++;
            renderView();
        };
        donePhaseContainer.appendChild(nextBtn);
        viewContainer.appendChild(donePhaseContainer);

        // -----------------------------------------
        // FEEDBACK
        // -----------------------------------------
        const feedbackText = document.createElement('div');
        feedbackText.className = 'laese-feedback';
        viewContainer.appendChild(feedbackText);

        // -----------------------------------------
        // LOGIC
        // -----------------------------------------
        let attempts = 0;
        let isListening = false;

        tjekBtn.onclick = () => {
            const count = dropzone.querySelectorAll('.laese-token').length;
            attempts++;

            if (count === wordData.count) {
                if (attempts === 1) score++; // First try point

                headerText.textContent = wordData.word.toUpperCase();
                headerText.style.color = '#4caf50';
                
                countPhaseContainer.style.display = 'none';

                // If set 4 (vrøvleord) or no microphone supported, skip mic phase
                if (currentSetId === 4 || !recognition) {
                    instruction.textContent = 'Rigtigt! Du hørte alle lydene.';
                    feedbackText.style.color = '#4caf50';
                    feedbackText.textContent = 'Perfekt!';
                    donePhaseContainer.style.display = 'flex';
                } else {
                    // Enter SPEAK phase for sets 1, 2, 3
                    instruction.textContent = 'Rigtigt! Nu skal du prøve at udtale ordet selv:';
                    feedbackText.textContent = '';
                    speakPhaseContainer.style.display = 'flex';
                }
            } else {
                feedbackText.style.color = '#ff9800';
                feedbackText.textContent = 'Ikke helt. Prøv at lytte igen!';
            }
        };

        // Microphone Logic
        if (recognition) {
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                if (transcript.includes(wordData.word.toLowerCase())) {
                    feedbackText.style.color = '#4caf50';
                    feedbackText.textContent = 'Flot udtalt!';
                    speakPhaseContainer.style.display = 'none';
                    instruction.style.display = 'none';
                    donePhaseContainer.style.display = 'flex';
                } else {
                    feedbackText.style.color = '#ff9800';
                    feedbackText.textContent = `Jeg hørte "${transcript}". Prøv igen!`;
                }
            };
            recognition.onerror = (event) => {
                feedbackText.style.color = '#f44336';
                if (event.error === 'no-speech') {
                    feedbackText.textContent = 'Jeg hørte ikke noget. Prøv at tale tættere på mikrofonen.';
                } else {
                    feedbackText.textContent = `Mikrofon fejl: ${event.error}`;
                }
                micBtn.classList.remove('listening');
                isListening = false;
            };
            recognition.onend = () => {
                micBtn.classList.remove('listening');
                isListening = false;
            };

            micBtn.onclick = () => {
                if (isListening) {
                    recognition.stop();
                    return;
                }
                try {
                    recognition.start();
                    isListening = true;
                    micBtn.classList.add('listening');
                    feedbackText.style.color = '#ffffff';
                    feedbackText.textContent = 'Lytter...';
                } catch (e) {
                    console.error(e);
                    isListening = false;
                    micBtn.classList.remove('listening');
                }
            };
        }

        skipBtn.onclick = () => {
            if (isListening && recognition) recognition.stop();
            speakPhaseContainer.style.display = 'none';
            donePhaseContainer.style.display = 'flex';
            feedbackText.textContent = '';
        };
    }

    function renderCompletion() {
        const total = wordSets[currentSetId].words.length;
        
        const compContainer = document.createElement('div');
        compContainer.className = 'laese-completion';

        const star = document.createElement('div');
        star.className = 'laese-star';
        star.textContent = '⭐';
        compContainer.appendChild(star);

        const title = document.createElement('h2');
        title.textContent = 'Niveau Gennemført!';
        compContainer.appendChild(title);

        const scoreText = document.createElement('p');
        scoreText.style.fontSize = '1.2rem';
        scoreText.style.color = '#b0c4ba';
        scoreText.style.marginBottom = '2rem';
        scoreText.textContent = `Du fik ${score} ud af ${total} rigtige i første forsøg.`;
        compContainer.appendChild(scoreText);

        const againBtn = document.createElement('button');
        againBtn.className = 'laese-action-btn primary';
        againBtn.textContent = 'Vælg et andet niveau';
        againBtn.onclick = () => {
            currentSetId = null;
            renderView();
        };
        compContainer.appendChild(againBtn);

        viewContainer.appendChild(compContainer);
    }

    // Initial render
    container.appendChild(viewContainer);
    renderView();
}
