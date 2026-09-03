import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';
import { udtaleData } from '../data/udtale_data.js';

export function renderUdtaleView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';
    
    function t(key, fallback) {
        const res = getTranslation(key);
        return res === key ? fallback : res;
    }

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
    viewContainer.appendChild(title);

    const intro = document.createElement('p');
    intro.className = 'subtitle';
    viewContainer.appendChild(intro);

    // Main Tabs
    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    tabContainer.style.justifyContent = 'center';
    tabContainer.style.alignItems = 'flex-start';
    tabContainer.style.gap = '2rem';
    tabContainer.style.marginBottom = '2rem';
    
    // Sub Tabs (Vertical list)
    const subTabContainer = document.createElement('div');
    subTabContainer.style.display = 'flex';
    subTabContainer.style.flexDirection = 'column';
    subTabContainer.style.alignItems = 'center';
    subTabContainer.style.gap = '0.6rem';
    subTabContainer.style.marginTop = '1rem';
    subTabContainer.style.width = '100%';
    
    let currentLetter = 'D';
    let currentSubCategory = 0;
    let currentIndex = 0;
    
    const tabWrappers = {};

    ['D', 'R', 'G'].forEach(letter => {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        
        const btn = document.createElement('button');
        btn.textContent = (getTranslation('udtaleLetterPrefix') || 'Bogstavet ') + letter;
        btn.className = 'gemini-btn';
        btn.dataset.letter = letter;
        btn.style.padding = '0.5rem 1rem';
        btn.style.fontSize = '1rem';
        btn.style.minWidth = 'auto';
        
        btn.onclick = () => {
            if (currentLetter !== letter) {
                currentLetter = letter;
                currentSubCategory = 0;
                currentIndex = 0;
                updateViewData();
            }
        };
        wrapper.appendChild(btn);
        tabContainer.appendChild(wrapper);
        tabWrappers[letter] = wrapper;
    });
    viewContainer.appendChild(tabContainer);

    // Explanation Box
    const explanationBox = document.createElement('div');
    explanationBox.className = 'card';
    explanationBox.style.marginBottom = '2rem';
    explanationBox.style.padding = '1.5rem';
    explanationBox.style.background = 'rgba(255,255,255,0.05)';
    explanationBox.style.border = '1px solid rgba(255,255,255,0.1)';
    explanationBox.style.borderRadius = '12px';
    explanationBox.style.lineHeight = '1.6';
    viewContainer.appendChild(explanationBox);

    // Header for Category
    const categoryHeader = document.createElement('div');
    categoryHeader.style.textAlign = 'center';
    categoryHeader.style.marginBottom = '1.5rem';
    
    const catTitle = document.createElement('h2');
    catTitle.style.color = '#ffcc00';
    catTitle.style.marginBottom = '0.5rem';
    
    const catHint = document.createElement('p');
    catHint.style.color = 'var(--text-muted)';
    
    categoryHeader.appendChild(catTitle);
    categoryHeader.appendChild(catHint);
    viewContainer.appendChild(categoryHeader);

    // Main exercise area
    const exerciseArea = document.createElement('div');
    exerciseArea.className = 'card udtale-card';
    exerciseArea.style.display = 'flex';
    exerciseArea.style.flexDirection = 'column';
    exerciseArea.style.alignItems = 'center';
    exerciseArea.style.textAlign = 'center';
    exerciseArea.style.padding = '3rem 1rem';
    exerciseArea.style.gap = '2rem';

    const sentenceDisplay = document.createElement('div');
    sentenceDisplay.className = 'udtale-sentence';
    sentenceDisplay.style.fontSize = '1.8rem';
    sentenceDisplay.style.fontWeight = 'normal';
    sentenceDisplay.style.lineHeight = '1.5';
    sentenceDisplay.style.minHeight = '100px';

    const progressContainer = document.createElement('div');
    progressContainer.style.width = '100%';
    progressContainer.style.maxWidth = '400px';
    progressContainer.style.marginTop = '1rem';
    progressContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: bold;">
            <span id="udtale-mestring-label">Mestring:</span>
            <span id="udtale-score">0%</span>
        </div>
        <div style="width: 100%; height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
            <div id="udtale-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ff5e5b, #4caf50); transition: width 0.5s ease-out;"></div>
        </div>
    `;
    progressContainer.style.display = 'none';

    const micBtn = document.createElement('button');
    micBtn.className = 'mic-btn';
    micBtn.innerHTML = '🎤';
    
    const statusText = document.createElement('div');
    statusText.className = 'mic-status';
    statusText.style.color = 'var(--text-muted)';
    statusText.style.fontSize = '1rem';
    statusText.style.fontWeight = '500';
    statusText.textContent = getTranslation('udtalePressMic') || 'Tryk på mikrofonen for at starte';

    const resultBox = document.createElement('div');
    resultBox.className = 'trps-box';
    resultBox.style.marginTop = '1rem';
    resultBox.style.textAlign = 'center';
    resultBox.style.fontSize = '1.2rem';
    resultBox.style.display = 'none';

    exerciseArea.appendChild(sentenceDisplay);
    exerciseArea.appendChild(progressContainer);
    exerciseArea.appendChild(micBtn);
    exerciseArea.appendChild(statusText);
    exerciseArea.appendChild(resultBox);
    viewContainer.appendChild(exerciseArea);

    // Navigation Controls
    const navContainer = document.createElement('div');
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'space-between';
    navContainer.style.alignItems = 'center';
    navContainer.style.marginTop = '2rem';
    navContainer.style.gap = '1rem';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'gemini-btn';
    prevBtn.style.backgroundColor = 'var(--card-bg)';
    prevBtn.style.color = 'var(--text-main)';
    prevBtn.textContent = getTranslation('udtalePrev') || '← Forrige';
    
    const countDisplay = document.createElement('span');
    countDisplay.style.color = 'var(--text-muted)';
    countDisplay.style.fontWeight = 'bold';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gemini-btn';
    nextBtn.textContent = getTranslation('udtaleNext') || 'Næste →';

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(countDisplay);
    navContainer.appendChild(nextBtn);
    viewContainer.appendChild(navContainer);

    // Logic
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'da-DK';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    }

    let isListening = false;

    function updateViewData() {
        const data = udtaleData[currentLetter];
        
        title.textContent = getTranslation('traenUdtale');
        intro.textContent = '';
        
        // Append sub tab container to the active letter's wrapper
        tabWrappers[currentLetter].appendChild(subTabContainer);
        
        // Render sub-tabs
        subTabContainer.innerHTML = '';
        data.subCategories.forEach((sub, index) => {
            const btn = document.createElement('button');
            btn.textContent = t('udtale_' + sub.id + '_title', sub.title);
            btn.className = 'gemini-btn';
            btn.style.padding = '0.4rem 0.8rem';
            btn.style.fontSize = '0.9rem';
            btn.style.minWidth = 'auto';
            btn.style.borderRadius = '20px';
            
            if (index === currentSubCategory) {
                btn.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
                btn.style.color = '#ffffff';
                btn.style.fontWeight = 'bold';
                btn.style.boxShadow = '0 4px 10px rgba(255, 152, 0, 0.3)';
                btn.style.border = 'none';
            } else {
                btn.style.background = 'rgba(255, 152, 0, 0.05)';
                btn.style.color = 'var(--text-main)';
                btn.style.fontWeight = 'normal';
                btn.style.boxShadow = 'none';
                btn.style.border = '1px solid rgba(255, 152, 0, 0.3)';
            }
            
            btn.onclick = () => {
                if (currentSubCategory !== index) {
                    currentSubCategory = index;
                    currentIndex = 0;
                    updateViewData(); // re-render to update active styling and content
                }
            };
            subTabContainer.appendChild(btn);
        });
        
        const currentSub = data.subCategories[currentSubCategory];
        explanationBox.innerHTML = t('udtale_' + currentSub.id + '_exp', currentSub.explanation);
        
        const mestringLabel = progressContainer.querySelector('#udtale-mestring-label');
        if(mestringLabel) mestringLabel.textContent = (getTranslation('udtaleMasteryLabel') || 'Mestring af ') + currentLetter + ':';

        Object.keys(tabWrappers).forEach(letter => {
            const wrapper = tabWrappers[letter];
            const btn = wrapper.querySelector('button');
            if (letter === currentLetter) {
                btn.style.background = 'var(--primary-color)';
                btn.style.color = '#fff';
            } else {
                btn.style.background = 'rgba(255,255,255,0.1)';
                btn.style.color = 'var(--text-main)';
            }
        });

        renderCurrentExercise();
    }

    function renderCurrentExercise() {
        const data = udtaleData[currentLetter];
        const currentSub = data.subCategories[currentSubCategory];
        const ex = currentSub.exercises[currentIndex];
        
        catTitle.textContent = t('udtale_' + currentSub.id + '_title', currentSub.title);
        
        let hintKey = 'udtale_hint_' + currentSub.id + '_' + currentIndex;
        let hintText = getTranslation(hintKey);
        // Hvis den specifikke oversættelse mangler (fx for de nye sætninger), fald tilbage til index 0, som oftest er den samme generelle regel.
        if (hintText === hintKey) {
            let fallbackKey = 'udtale_hint_' + currentSub.id + '_0';
            let fallbackText = getTranslation(fallbackKey);
            if (fallbackText !== fallbackKey) {
                hintText = fallbackText;
            } else {
                hintText = ex.hint;
            }
        }
        catHint.textContent = hintText;
        
        countDisplay.textContent = `${currentIndex + 1} / ${currentSub.exercises.length}`;

        // Disable buttons at ends
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.disabled = currentIndex === currentSub.exercises.length - 1;
        nextBtn.style.opacity = currentIndex === currentSub.exercises.length - 1 ? '0.5' : '1';

        // Render sentence
        const targetClean = ex.targetWords.map(w => w.toLowerCase().replace(/[.,!?]/g, ''));
        sentenceDisplay.innerHTML = ex.text.split(' ').map(w => {
            const cleanWord = w.toLowerCase().replace(/[.,!?]/g, '');
            const isTarget = targetClean.includes(cleanWord);
            
            let displayWord = w;
            if (isTarget) {
                // Highlight the current letter dynamically (d, r, g)
                const regex = new RegExp(`(${currentLetter.toLowerCase()}|d{2}|t{2})`, 'gi');
                if (currentLetter === 'D') {
                    displayWord = w.replace(/(dd|dt|d)/gi, (match) => `<span class="udtale-segment">${match}</span>`);
                } else if (currentLetter === 'R') {
                    displayWord = w.replace(/(r)/gi, (match) => `<span class="udtale-segment">${match}</span>`);
                } else if (currentLetter === 'G') {
                    displayWord = w.replace(/(g)/gi, (match) => `<span class="udtale-segment">${match}</span>`);
                }
            }
            return `<span class="udtale-word ${isTarget ? 'target-focus' : ''}" data-istarget="${isTarget}">${displayWord}</span>`;
        }).join(' ');

        progressContainer.style.display = 'none';
        resultBox.style.display = 'none';
        statusText.textContent = getTranslation('udtalePressMic') || 'Tryk på mikrofonen for at starte';
        statusText.style.color = 'var(--text-muted)';
    }

    prevBtn.onclick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderCurrentExercise();
        }
    };

    nextBtn.onclick = () => {
        const data = udtaleData[currentLetter];
        const currentSub = data.subCategories[currentSubCategory];
        if (currentIndex < currentSub.exercises.length - 1) {
            currentIndex++;
            renderCurrentExercise();
        } else {
            // Automatically jump to next subcategory if we're at the end
            if (currentSubCategory < data.subCategories.length - 1) {
                currentSubCategory++;
                currentIndex = 0;
                updateViewData();
            }
        }
    };

    if (!recognition) {
        micBtn.style.display = 'none';
        statusText.textContent = getTranslation('udtaleNoBrowserSupport') || 'Din browser understøtter desværre ikke tale-genkendelse. Prøv venligst i Chrome eller Safari.';
        statusText.style.color = '#ff5e5b';
    } else {
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
                resultBox.style.display = 'none';
                
                // Reset colors
                Array.from(sentenceDisplay.querySelectorAll('.udtale-segment')).forEach(span => {
                    span.classList.remove('correct', 'incorrect');
                });
                progressContainer.style.display = 'none';
            } catch (e) {
                statusText.textContent = getTranslation('udtaleMicError') || 'Kunne ikke starte mikrofonen.';
                isListening = false;
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log("Hørt:", transcript);
            const data = udtaleData[currentLetter];
            const currentSub = data.subCategories[currentSubCategory];
            evaluateSpeech(currentSub.exercises[currentIndex], transcript);
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
            if (statusText.textContent.includes(getTranslation('udtaleListening') || 'Lytter')) {
                statusText.textContent = getTranslation('udtaleDoneListening') || 'Færdig med at lytte.';
            }
        };
    }

    function evaluateSpeech(ex, spoken) {
        statusText.textContent = getTranslation('udtaleProcessing') || 'Behandler...';
        
        const targetWords = ex.text.toLowerCase().replace(/[.,!?]/g, '').split(' ');
        const spokenWords = spoken.toLowerCase().replace(/[.,!?]/g, '').split(' ');
        const targetCleanList = ex.targetWords.map(w => w.toLowerCase().replace(/[.,!?]/g, ''));
        
        let correctCount = 0;
        let totalCount = 0;

        const spans = sentenceDisplay.querySelectorAll('.udtale-word');
        let spokenIndex = 0;

        targetWords.forEach((word, index) => {
            const span = spans[index];
            const isTargetWord = span.dataset.istarget === "true";
            
            if (isTargetWord) totalCount++;

            let foundMatch = false;
            for (let i = spokenIndex; i < Math.min(spokenIndex + 3, spokenWords.length); i++) {
                if (spokenWords[i] === word || isSimilar(spokenWords[i], word)) {
                    foundMatch = true;
                    spokenIndex = i + 1;
                    break;
                }
            }

            if (isTargetWord) {
                const segments = span.querySelectorAll('.udtale-segment');
                if (foundMatch) {
                    correctCount++;
                    segments.forEach(seg => {
                        seg.classList.add('correct');
                        seg.classList.remove('incorrect');
                    });
                } else {
                    segments.forEach(seg => {
                        seg.classList.add('incorrect');
                        seg.classList.remove('correct');
                    });
                }
            }
        });

        const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;
        progressContainer.style.display = 'block';
        const bar = progressContainer.querySelector('#udtale-bar');
        const scoreText = progressContainer.querySelector('#udtale-score');
        
        setTimeout(() => {
            bar.style.width = score + '%';
            scoreText.textContent = score + '%';
            statusText.textContent = getTranslation('udtaleReady') || 'Klar.';
            statusText.style.color = 'var(--text-muted)';
            
            resultBox.style.display = 'block';
            resultBox.innerHTML = `<strong>${getTranslation('udtaleYouSaid') || 'Du sagde:'}</strong> <em>"${spoken}"</em>`;
        }, 100);
    }

    function isSimilar(w1, w2) {
        if (w1 === w2) return true;
        if (w1.length > 3 && w2.length > 3 && (w1.includes(w2) || w2.includes(w1))) return true;
        return false;
    }

    // Init
    updateViewData();

    container.appendChild(viewContainer);
}
