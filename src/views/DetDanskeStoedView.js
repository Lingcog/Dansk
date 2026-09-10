import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderDetDanskeStoedView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container stoed-container';

    if (!document.getElementById('stoed-styles')) {
        const style = document.createElement('style');
        style.id = 'stoed-styles';
        style.textContent = `
            .stoed-container {
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
            .stoed-top-bar {
                padding: 1rem;
                display: flex;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 10;
            }
            .stoed-back-btn {
                background: none;
                border: none;
                color: #e0e0e0;
                font-size: 1.2rem;
                cursor: pointer;
            }
            .stoed-progress-text {
                position: absolute;
                top: 1.2rem;
                right: 1rem;
                font-size: 1rem;
                color: #a0b0a8;
                font-weight: bold;
            }

            .stoed-header {
                text-align: center;
                margin-bottom: 2rem;
                width: 90%;
                max-width: 600px;
            }
            .stoed-title {
                font-size: 2rem;
                color: white;
                margin-bottom: 0.5rem;
            }
            .stoed-desc {
                font-size: 1rem;
                color: #a0b0a8;
            }

            .stoed-card {
                background-color: #233b31;
                border: 2px solid #3a5c4d;
                border-radius: 12px;
                padding: 2rem;
                width: 90%;
                max-width: 500px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .stoed-sentence {
                font-size: 2rem;
                font-weight: bold;
                color: #ffffff;
                text-align: center;
            }
            .stoed-target-word {
                color: #4caf50;
            }
            .stoed-hint {
                font-size: 1rem;
                color: #8fa89b;
                font-style: italic;
                text-align: center;
            }

            /* MIC BUTTON */
            .stoed-btn-mic {
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
            .stoed-btn-mic:active {
                transform: scale(0.9);
            }
            .stoed-btn-mic.listening {
                background-color: #f44336;
                animation: pulse-red-stoed 1.5s infinite;
            }
            @keyframes pulse-red-stoed {
                0% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(244, 67, 54, 0); }
                100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0); }
            }

            .stoed-feedback {
                margin-top: 1rem;
                font-size: 1.2rem;
                font-weight: bold;
                min-height: 3rem;
                text-align: center;
                width: 100%;
            }

            .stoed-action-btn {
                background-color: #4caf50;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 0.8rem 1.5rem;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.2s;
                margin-top: 1rem;
            }
            .stoed-action-btn:hover {
                background-color: #45a049;
            }
            .stoed-action-btn:active {
                transform: scale(0.95);
            }

            /* COMPLETION STYLES */
            .stoed-completion {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                flex: 1;
                width: 90%;
            }
            .stoed-star {
                font-size: 5rem;
                margin-bottom: 1rem;
                animation: popInStoed 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popInStoed {
                0% { transform: scale(0); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // De 6 stød-sætninger
    const exercises = [
        { text: "En flok køer.", target: "køer", errorTarget: "kører" },
        { text: "Tre små øer.", target: "øer", errorTarget: "ører" },
        { text: "Ringen er gul.", target: "gul", errorTarget: "guld" },
        { text: "Jeg ser to stier.", target: "stier", errorTarget: "stiger" },
        { text: "Det er et mord.", target: "mord", errorTarget: "mor" },
        { text: "Det skur.", target: "skur", errorTarget: "skurer" },
        { text: "Bønder bor på landet.", target: "Bønder", errorTarget: "Bønner" },
        { text: "Send et bur.", target: "bur", errorTarget: "bua" },
        { text: "Vi har et bær.", target: "bær", errorTarget: "bager" }
    ];

    let currentIndex = 0;
    let consecutiveCorrect = 0;
    
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
        topBar.className = 'stoed-top-bar';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'stoed-back-btn';
        backBtn.innerHTML = '← Tilbage';
        backBtn.onclick = () => {
            if (recognition) recognition.abort();
            consecutiveCorrect = 0;
            navigateFn('traen_udtale');
        };
        topBar.appendChild(backBtn);

        if (currentIndex < exercises.length) {
            const progress = document.createElement('div');
            progress.className = 'stoed-progress-text';
            progress.textContent = `${currentIndex + 1} / ${exercises.length}`;
            topBar.appendChild(progress);
        }

        viewContainer.appendChild(topBar);

        if (currentIndex < exercises.length) {
            renderExercise();
        } else {
            renderCompletion();
        }
    }

    function renderExercise() {
        const data = exercises[currentIndex];

        const header = document.createElement('div');
        header.className = 'stoed-header';
        
        const title = document.createElement('h1');
        title.className = 'stoed-title';
        title.textContent = 'Det danske stød ⚡';
        
        const desc = document.createElement('div');
        desc.className = 'stoed-desc';
        desc.textContent = 'Læs sætningen højt. Husk stødet, ellers fanger maskinen et helt andet ord!';
        
        header.appendChild(title);
        header.appendChild(desc);
        viewContainer.appendChild(header);

        const card = document.createElement('div');
        card.className = 'stoed-card';

        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'stoed-sentence';
        
        // Highlight target word
        const words = data.text.split(' ');
        sentenceDiv.innerHTML = words.map(w => {
            const cleanWord = w.replace(/[.,!?]/g, '').toLowerCase();
            if (cleanWord === data.target.toLowerCase()) {
                return `<span class="stoed-target-word">${w}</span>`;
            }
            return w;
        }).join(' ');
        card.appendChild(sentenceDiv);

        const hintDiv = document.createElement('div');
        hintDiv.className = 'stoed-hint';
        hintDiv.textContent = `(Tip: Uden stød bliver det til "${data.errorTarget}")`;
        card.appendChild(hintDiv);

        const micBtn = document.createElement('button');
        micBtn.className = 'stoed-btn-mic';
        micBtn.innerHTML = '🎤';
        card.appendChild(micBtn);

        const feedbackText = document.createElement('div');
        feedbackText.className = 'stoed-feedback';
        card.appendChild(feedbackText);

        const streakContainer = document.createElement('div');
        streakContainer.style.marginTop = '0.5rem';
        streakContainer.style.fontSize = '1.2rem';
        streakContainer.style.fontWeight = 'bold';
        streakContainer.style.textAlign = 'center';
        streakContainer.innerHTML = `Krav: 2 i træk <br/><span style="color:#ff9800">${consecutiveCorrect}/2</span>`;
        card.appendChild(streakContainer);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'stoed-action-btn';
        nextBtn.textContent = 'Næste';
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            consecutiveCorrect = 0;
            currentIndex++;
            renderView();
        };

        let isListening = false;

        if (recognition) {
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                if (transcript.includes(data.target.toLowerCase())) {
                    consecutiveCorrect++;
                    if (consecutiveCorrect === 1) {
                        feedbackText.style.color = '#4caf50';
                        feedbackText.textContent = `Flot! Du ramte stødet i "${data.target}". En gang til!`;
                        streakContainer.innerHTML = `Krav: 2 i træk <br/><span style="color:#4caf50">1/2</span>`;
                    } else if (consecutiveCorrect >= 2) {
                        feedbackText.style.color = '#4caf50';
                        feedbackText.textContent = `Perfekt!`;
                        streakContainer.innerHTML = `Krav: 2 i træk <br/><span style="font-size: 2rem">🏆</span> <span style="color:#4caf50">2/2</span>`;
                        micBtn.style.display = 'none';
                        setTimeout(() => {
                            consecutiveCorrect = 0;
                            currentIndex++;
                            renderView();
                        }, 2000);
                    }
                } else if (transcript.includes(data.errorTarget.toLowerCase())) {
                    consecutiveCorrect = 0;
                    streakContainer.innerHTML = `Krav: 2 i træk <br/><span style="color:#ff9800">0/2</span>`;
                    feedbackText.style.color = '#ff9800';
                    feedbackText.textContent = `Hov! Jeg hørte "${data.errorTarget}". Husk at lave stød.`;
                } else {
                    consecutiveCorrect = 0;
                    streakContainer.innerHTML = `Krav: 2 i træk <br/><span style="color:#ff9800">0/2</span>`;
                    feedbackText.style.color = '#ff9800';
                    feedbackText.textContent = `Jeg hørte: "${transcript}". Prøv igen!`;
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
            feedbackText.style.color = '#f44336';
            feedbackText.textContent = 'Din browser understøtter desværre ikke mikrofon.';
            nextBtn.style.display = 'block';
            micBtn.style.display = 'none';
        }

        // Add a skip button for manual navigation just in case
        const skipBtn = document.createElement('button');
        skipBtn.className = 'stoed-back-btn';
        skipBtn.style.marginTop = '1rem';
        skipBtn.style.fontSize = '0.9rem';
        skipBtn.style.textDecoration = 'underline';
        skipBtn.textContent = 'Spring over';
        skipBtn.onclick = () => {
            if (isListening && recognition) recognition.stop();
            consecutiveCorrect = 0;
            currentIndex++;
            renderView();
        };

        card.appendChild(nextBtn);
        card.appendChild(skipBtn);
        viewContainer.appendChild(card);
    }

    function renderCompletion() {
        const compContainer = document.createElement('div');
        compContainer.className = 'stoed-completion';

        const star = document.createElement('div');
        star.className = 'stoed-star';
        star.textContent = '🏆';
        compContainer.appendChild(star);

        const title = document.createElement('h2');
        title.style.color = 'white';
        title.textContent = 'Fantastisk!';
        compContainer.appendChild(title);

        const text = document.createElement('p');
        text.style.color = '#b0c4ba';
        text.style.fontSize = '1.2rem';
        text.style.marginBottom = '2rem';
        text.textContent = 'Du har nu trænet det danske stød!';
        compContainer.appendChild(text);

        const backMenuBtn = document.createElement('button');
        backMenuBtn.className = 'stoed-action-btn';
        backMenuBtn.textContent = 'Tilbage til menuen';
        backMenuBtn.onclick = () => {
            navigateFn('traen_udtale');
        };
        compContainer.appendChild(backMenuBtn);

        viewContainer.appendChild(compContainer);
    }

    container.appendChild(viewContainer);
    renderView();
}
