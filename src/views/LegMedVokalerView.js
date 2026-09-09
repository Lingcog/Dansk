import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderLegMedVokalerView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container vokaler-container';

    if (!document.getElementById('vokaler-styles')) {
        const style = document.createElement('style');
        style.id = 'vokaler-styles';
        style.textContent = `
            .vokaler-container {
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
            .vokaler-top-bar {
                padding: 1rem;
                display: flex;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 10;
            }
            .vokaler-back-btn {
                background: none;
                border: none;
                color: #e0e0e0;
                font-size: 1.2rem;
                cursor: pointer;
            }
            .vokaler-progress-text {
                position: absolute;
                top: 1.2rem;
                right: 1rem;
                font-size: 1rem;
                color: #a0b0a8;
                font-weight: bold;
            }

            /* MENU STYLES */
            .vokaler-menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                width: 90%;
                max-width: 400px;
                margin-top: 2rem;
            }
            .vokaler-menu-title {
                font-size: 2rem;
                color: white;
                margin-bottom: 1rem;
            }
            .vokaler-level-btn {
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
            .vokaler-level-btn:hover {
                background-color: #2a473a;
            }
            .vokaler-level-btn:active {
                transform: scale(0.98);
            }
            .vokaler-level-title {
                font-weight: bold;
                font-size: 1.3rem;
                margin-bottom: 0.3rem;
            }
            .vokaler-level-desc {
                font-size: 0.9rem;
                color: #a0b0a8;
            }

            /* EXERCISE STYLES */
            .vokaler-header-text {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 2rem;
                color: #ffffff;
                text-align: center;
                max-width: 90%;
            }
            
            .vokaler-action-area {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
                width: 100%;
            }

            .vokaler-listen-btn {
                background-color: #64b5f6;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 1rem 2.5rem;
                font-size: 1.2rem;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .vokaler-listen-btn:active {
                transform: scale(0.95);
            }

            .vokaler-btn-mic {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                border: none;
                background-color: #4caf50;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                cursor: pointer;
                color: white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: transform 0.2s;
            }
            .vokaler-btn-mic:active {
                transform: scale(0.9);
            }
            .vokaler-btn-mic.listening {
                background-color: #f44336;
                animation: pulse-red 1.5s infinite;
            }

            .vokaler-bottom-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                justify-content: center;
                width: 100%;
            }
            .vokaler-action-btn {
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
            .vokaler-action-btn:hover {
                background-color: #4a6356;
            }
            .vokaler-action-btn:active {
                transform: scale(0.95);
            }
            .vokaler-action-btn.primary {
                background-color: #4caf50;
                color: white;
            }
            .vokaler-action-btn.primary:hover {
                background-color: #45a049;
            }

            .vokaler-feedback {
                margin-top: 1rem;
                font-size: 1.2rem;
                font-weight: bold;
                min-height: 1.5rem;
                text-align: center;
                max-width: 90%;
            }

            /* COMPLETION STYLES */
            .vokaler-completion {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                flex: 1;
                width: 90%;
            }
            .vokaler-star {
                font-size: 5rem;
                margin-bottom: 1rem;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        `;
        document.head.appendChild(style);
    }

    // Data Sets
    const datasets = {
        'r': {
            title: "Træn R-lyden",
            desc: "7 sætninger med R i start og slut",
            sentences: [
                "Rulle en rotte",
                "Røve en ræv",
                "Riste en rose",
                "Rense en reje",
                "Rive min ryg",
                "Ryste din rust",
                "Råbe på Rom"
            ]
        },
        'd': {
            title: "Træn D-lyden",
            desc: "10 sætninger med hårdt D",
            sentences: [
                "Danse med en dåse",
                "Dyppe en due",
                "Dele din dyne",
                "Drille en drage",
                "Dække en dør",
                "Dreje en dal",
                "Dømme en dukke",
                "Drikke en dam",
                "Døbe en dolk",
                "Dampe din dug"
            ]
        },
        'g': {
            title: "Træn G-lyden",
            desc: "10 sætninger med hårdt G",
            sentences: [
                "Gribe en ged",
                "Gemme en gås",
                "Gætte en gris",
                "Gnide en gren",
                "Grave en gaffel",
                "Grille en gryde",
                "Glemme en gade",
                "Guffe en globus",
                "Give en gople",
                "Gø ad en gæst"
            ]
        }
    };

    // State
    let currentSetId = null;
    let currentIndex = 0;
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
        viewContainer.innerHTML = ''; 

        // Top Bar
        const topBar = document.createElement('div');
        topBar.className = 'vokaler-top-bar';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'vokaler-back-btn';
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

        if (currentSetId !== null) {
            const progress = document.createElement('div');
            progress.className = 'vokaler-progress-text';
            progress.textContent = `${currentIndex + 1} / ${datasets[currentSetId].sentences.length}`;
            topBar.appendChild(progress);
        }

        viewContainer.appendChild(topBar);

        if (currentSetId === null) {
            renderMenu();
        } else if (currentIndex < datasets[currentSetId].sentences.length) {
            renderExercise();
        } else {
            renderCompletion();
        }
    }

    function renderMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.className = 'vokaler-menu';

        const title = document.createElement('div');
        title.className = 'vokaler-menu-title';
        title.textContent = 'Leg med vokaler';
        menuContainer.appendChild(title);

        ['r', 'd', 'g'].forEach(id => {
            const btn = document.createElement('button');
            btn.className = 'vokaler-level-btn';
            btn.innerHTML = `
                <div class="vokaler-level-title">${datasets[id].title}</div>
                <div class="vokaler-level-desc">${datasets[id].desc}</div>
            `;
            btn.onclick = () => {
                currentSetId = id;
                currentIndex = 0;
                score = 0;
                renderView();
            };
            menuContainer.appendChild(btn);
        });

        viewContainer.appendChild(menuContainer);
    }

    function renderExercise() {
        const sentence = datasets[currentSetId].sentences[currentIndex];
        
        const headerText = document.createElement('div');
        headerText.className = 'vokaler-header-text';
        headerText.textContent = sentence;
        viewContainer.appendChild(headerText);

        const actionArea = document.createElement('div');
        actionArea.className = 'vokaler-action-area';

        // Lyt
        const listenBtn = document.createElement('button');
        listenBtn.className = 'vokaler-listen-btn';
        listenBtn.innerHTML = '🔊 Lyt til sætning';
        listenBtn.onclick = () => {
            synth.cancel();
            if (!voice) loadVoices();
            const utterance = new SpeechSynthesisUtterance(sentence);
            if (voice) utterance.voice = voice;
            utterance.lang = 'da-DK';
            utterance.rate = 0.85; // Slow down a bit for clarity
            synth.speak(utterance);
        };
        actionArea.appendChild(listenBtn);

        // Mikrofon
        const micBtn = document.createElement('button');
        micBtn.className = 'vokaler-btn-mic';
        micBtn.innerHTML = '🎤';
        actionArea.appendChild(micBtn);

        viewContainer.appendChild(actionArea);

        const feedbackText = document.createElement('div');
        feedbackText.className = 'vokaler-feedback';
        viewContainer.appendChild(feedbackText);

        const bottomButtons = document.createElement('div');
        bottomButtons.className = 'vokaler-bottom-buttons';
        
        const skipBtn = document.createElement('button');
        skipBtn.className = 'vokaler-action-btn';
        skipBtn.textContent = 'Spring over';
        skipBtn.onclick = () => {
            if (isListening && recognition) recognition.stop();
            currentIndex++;
            renderView();
        };
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'vokaler-action-btn primary';
        nextBtn.textContent = 'Næste';
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            currentIndex++;
            renderView();
        };

        bottomButtons.appendChild(skipBtn);
        bottomButtons.appendChild(nextBtn);
        viewContainer.appendChild(bottomButtons);

        // Logic
        let isListening = false;
        let attempts = 0;

        // Clean string for comparison (remove punctuation, lower case)
        const normalize = (str) => str.toLowerCase().replace(/[^a-zæøå0-9]/g, '');
        const targetClean = normalize(sentence);

        if (recognition) {
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const transcriptClean = normalize(transcript);
                
                attempts++;

                if (transcriptClean.includes(targetClean) || targetClean.includes(transcriptClean) && transcriptClean.length > targetClean.length - 3) {
                    // Close enough match
                    if (attempts === 1) score++;
                    feedbackText.style.color = '#4caf50';
                    feedbackText.textContent = 'Flot udtalt!';
                    skipBtn.style.display = 'none';
                    nextBtn.style.display = 'block';
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
        } else {
            micBtn.style.display = 'none';
            feedbackText.textContent = 'Stemmegenkendelse understøttes ikke i din browser.';
        }
    }

    function renderCompletion() {
        const total = datasets[currentSetId].sentences.length;
        
        const compContainer = document.createElement('div');
        compContainer.className = 'vokaler-completion';

        const star = document.createElement('div');
        star.className = 'vokaler-star';
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
        againBtn.className = 'vokaler-action-btn primary';
        againBtn.textContent = 'Vælg et andet niveau';
        againBtn.onclick = () => {
            currentSetId = null;
            renderView();
        };
        compContainer.appendChild(againBtn);

        viewContainer.appendChild(compContainer);
    }

    // Initialize
    container.appendChild(viewContainer);
    renderView();
}
