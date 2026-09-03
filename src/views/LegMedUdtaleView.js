import { getTranslation } from '../utils/i18n.js';

export function renderLegMedUdtaleView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('traen_udtale');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('udtaleDictaphoneTitle') || 'Diktafon - leg med udtale';
    viewContainer.appendChild(title);

    const intro = document.createElement('p');
    intro.className = 'subtitle';
    intro.innerHTML = getTranslation('dictaphoneSubtitle') || `Skriv en sætning, du vil øve dig på, og se hvordan du klarer den. <br/>Eller lad feltet stå tomt for at bruge diktafonen frit!`;
    viewContainer.appendChild(intro);

    const mainCard = document.createElement('div');
    mainCard.className = 'card udtale-card';
    mainCard.style.display = 'flex';
    mainCard.style.flexDirection = 'column';
    mainCard.style.alignItems = 'center';
    mainCard.style.padding = '2rem 1rem';
    mainCard.style.gap = '2rem';

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.width = '100%';
    inputArea.style.maxWidth = '600px';

    const textInput = document.createElement('textarea');
    textInput.placeholder = getTranslation('dictaphonePlaceholder') || '(Valgfrit) Skriv en sætning du vil øve dig på...';
    textInput.style.width = '100%';
    textInput.style.minHeight = '100px';
    textInput.style.padding = '1rem';
    textInput.style.borderRadius = '12px';
    textInput.style.border = '2px solid rgba(255,255,255,0.2)';
    textInput.style.background = 'rgba(0,0,0,0.2)';
    textInput.style.color = '#fff';
    textInput.style.fontSize = '1.2rem';
    textInput.style.fontFamily = 'inherit';
    textInput.style.resize = 'vertical';
    
    // Auto-expand textarea
    textInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    inputArea.appendChild(textInput);
    mainCard.appendChild(inputArea);

    const micBtn = document.createElement('button');
    micBtn.className = 'mic-btn';
    micBtn.innerHTML = '🎤';
    
    const statusText = document.createElement('div');
    statusText.className = 'mic-status';
    statusText.style.color = 'var(--text-muted)';
    statusText.style.fontSize = '1rem';
    statusText.style.fontWeight = '500';
    statusText.textContent = getTranslation('udtalePressMic') || 'Tryk på mikrofonen for at starte';

    // Output area
    const outputArea = document.createElement('div');
    outputArea.style.width = '100%';
    outputArea.style.maxWidth = '600px';
    outputArea.style.marginTop = '1rem';
    outputArea.style.textAlign = 'center';
    outputArea.style.minHeight = '80px';
    
    const resultSentence = document.createElement('div');
    resultSentence.style.fontSize = '1.8rem';
    resultSentence.style.lineHeight = '1.5';
    resultSentence.style.marginBottom = '1rem';
    
    const debugBox = document.createElement('div');
    debugBox.className = 'trps-box';
    debugBox.style.fontSize = '1.1rem';
    debugBox.style.color = 'var(--text-muted)';
    debugBox.style.display = 'none';

    outputArea.appendChild(resultSentence);
    outputArea.appendChild(debugBox);

    mainCard.appendChild(micBtn);
    mainCard.appendChild(statusText);
    mainCard.appendChild(outputArea);
    viewContainer.appendChild(mainCard);
    container.appendChild(viewContainer);

    // Speech Logic
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'da-DK';
        recognition.interimResults = true; // Show text as they speak
        recognition.maxAlternatives = 1;
    }

    let isListening = false;
    let finalTranscript = '';

    if (!recognition) {
        micBtn.style.display = 'none';
        statusText.textContent = getTranslation('udtaleNoBrowserSupport') || 'Din browser understøtter desværre ikke tale-genkendelse.';
        statusText.style.color = '#ff5e5b';
        return;
    }

    micBtn.onclick = () => {
        if (isListening) {
            recognition.stop();
            return;
        }
        
        try {
            recognition.start();
            isListening = true;
            micBtn.classList.add('listening');
            statusText.textContent = getTranslation('udtaleListening') || 'Lytter... Tal nu';
            statusText.style.color = '#ffeb3b';
            
            resultSentence.innerHTML = '';
            debugBox.style.display = 'none';
            finalTranscript = '';
            
            const mode = textInput.value.trim() !== '' ? 'TARGET' : 'DICTATION';
            if (mode === 'TARGET') {
                // Pre-render the target words in white
                const targetText = textInput.value.trim();
                resultSentence.innerHTML = targetText.split(' ').map(w => `<span class="udtale-word">${w}</span>`).join(' ');
            }

        } catch (e) {
            statusText.textContent = getTranslation('udtaleMicError') || 'Kunne ikke starte mikrofonen.';
            isListening = false;
        }
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        const mode = textInput.value.trim() !== '' ? 'TARGET' : 'DICTATION';
        
        if (mode === 'DICTATION') {
            resultSentence.style.color = '#fff';
            resultSentence.textContent = finalTranscript + interimTranscript;
        }
    };

    recognition.onerror = (event) => {
        micBtn.classList.remove('listening');
        isListening = false;
        statusText.textContent = (getTranslation('udtaleError') || 'Fejl: ') + event.error;
        statusText.style.color = '#ff5e5b';
    };

    recognition.onend = () => {
        micBtn.classList.remove('listening');
        isListening = false;
        statusText.textContent = getTranslation('udtaleReady') || 'Klar.';
        statusText.style.color = 'var(--text-muted)';
        
        const mode = textInput.value.trim() !== '' ? 'TARGET' : 'DICTATION';
        if (mode === 'TARGET' && finalTranscript) {
            evaluateSpeech(textInput.value.trim(), finalTranscript);
        } else if (mode === 'DICTATION' && finalTranscript) {
            // Just finalize text
            resultSentence.textContent = finalTranscript;
        }
    };

    function evaluateSpeech(target, spoken) {
        statusText.textContent = getTranslation('dictaphoneProcessing') || 'Behandler udtale...';
        
        const targetWords = target.split(' ');
        const targetCleanList = targetWords.map(w => w.toLowerCase().replace(/[.,!?]/g, ''));
        const spokenWords = spoken.toLowerCase().replace(/[.,!?]/g, '').split(' ');
        
        let correctCount = 0;
        let spokenIndex = 0;
        
        // Render again just to be safe
        resultSentence.innerHTML = targetWords.map(w => `<span class="udtale-word">${w}</span>`).join(' ');
        const spans = resultSentence.querySelectorAll('.udtale-word');

        targetCleanList.forEach((word, index) => {
            const span = spans[index];
            
            let foundMatch = false;
            for (let i = spokenIndex; i < Math.min(spokenIndex + 3, spokenWords.length); i++) {
                if (spokenWords[i] === word || isSimilar(spokenWords[i], word)) {
                    foundMatch = true;
                    spokenIndex = i + 1; // advance pointer
                    break;
                }
            }

            if (foundMatch) {
                span.classList.add('correct');
                correctCount++;
            } else {
                span.classList.add('incorrect');
            }
        });
        
        setTimeout(() => {
            if (correctCount === targetCleanList.length && targetCleanList.length > 0) {
                statusText.textContent = getTranslation('dictaphonePerfect') || 'Flot - skriv en ny sætning!';
                statusText.style.color = '#4caf50';
                textInput.value = '';
                textInput.style.height = '100px';
                debugBox.style.display = 'none';
            } else {
                statusText.textContent = getTranslation('udtaleReady') || 'Klar.';
                statusText.style.color = 'var(--text-muted)';
                
                debugBox.style.display = 'block';
                debugBox.innerHTML = `<strong>${getTranslation('dictaphoneMachineHeard') || 'Maskinen hørte dig sige:'}</strong><br/><em>"${spoken}"</em>`;
            }
        }, 100);
    }

    function isSimilar(w1, w2) {
        if (w1 === w2) return true;
        if (w1.length > 3 && w2.length > 3 && (w1.includes(w2) || w2.includes(w1))) return true;
        return false;
    }
}
