import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderLaegeSamtaleStoryView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container story-view-container';

    function speakDanish(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'da-DK';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('historier_menu');
    topBar.appendChild(backBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'back-btn';
    resetBtn.style.color = '#ff5e5b';
    resetBtn.innerHTML = `↻ Start forfra`;
    resetBtn.onclick = () => {
        if (confirm('Er du sikker på, at du vil starte samtalen med lægen forfra?')) {
            localStorage.removeItem('story_laege_progress');
            currentStepIndex = 0;
            appState.currentPhase = 'construction';
            appState.shuffledWords = null;
            appState.selectedWords = [];
            renderStory();
        }
    };
    resetBtn.style.display = 'none';
    topBar.appendChild(resetBtn);

    viewContainer.appendChild(topBar);

    // Title & subtitle header
    const headerDiv = document.createElement('div');
    headerDiv.style.textAlign = 'center';
    headerDiv.style.marginBottom = '1.5rem';

    const mainTitle = document.createElement('h1');
    mainTitle.textContent = '🩺 En ansat ringer til lægen';
    mainTitle.style.marginBottom = '0.4rem';
    headerDiv.appendChild(mainTitle);

    const subTitle = document.createElement('p');
    subTitle.className = 'subtitle';
    subTitle.style.margin = '0 auto';
    subTitle.style.maxWidth = '700px';
    subTitle.textContent = 'Serie: Sygdom & job (Del 1 af 4) • Byg sætningerne i ordpuslespillet og tal med lægen om symptomer';
    headerDiv.appendChild(subTitle);

    viewContainer.appendChild(headerDiv);

    let userName = localStorage.getItem('story_username') || '';

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    // --- DIALOGUE DATA (7 Replikskifter - Uden fonetiktips) ---
    let storyData = [];

    function initStoryData(uName) {
        const u = uName || 'Peter';
        storyData = [
            // --- REPLIKSKIFTE 1 ---
            { 
                type: 'user_action',
                stepNum: 1,
                construction: {
                    type: 'OP',
                    words: ['Hej,', 'jeg', 'hedder', `${u}.`]
                },
                pronunciation: {
                    target: `Hej, jeg hedder ${u}.`,
                    focus: ['jeg', 'hedder']
                }
            },
            { 
                type: 'npc', 
                name: 'Læge', 
                text: `Hej ${u}. Hvad kan jeg gøre for dig?` 
            },

            // --- REPLIKSKIFTE 2 ---
            { 
                type: 'user_action',
                stepNum: 2,
                construction: {
                    type: 'OP',
                    words: ['Jeg', 'ringer', 'fordi', 'jeg', 'har', 'det', 'virkelig', 'dårligt.']
                },
                pronunciation: {
                    target: 'Jeg ringer fordi jeg har det virkelig dårligt.',
                    focus: ['ringer', 'fordi', 'har', 'virkelig', 'dårligt']
                }
            },
            { 
                type: 'npc', 
                name: 'Læge', 
                text: 'Hvad er dine symptomer?' 
            },

            // --- REPLIKSKIFTE 3 ---
            { 
                type: 'user_action',
                stepNum: 3,
                construction: {
                    type: 'OP',
                    words: ['Jeg', 'har', 'høj', 'feber,', 'hovedpine', 'og', 'muskelsmerter.']
                },
                pronunciation: {
                    target: 'Jeg har høj feber, hovedpine og muskelsmerter.',
                    focus: ['feber', 'hovedpine', 'muskelsmerter']
                }
            },
            { 
                type: 'npc', 
                name: 'Læge', 
                text: 'Hoster du også?' 
            },

            // --- REPLIKSKIFTE 4 ---
            { 
                type: 'user_action',
                stepNum: 4,
                construction: {
                    type: 'OP',
                    words: ['Ja,', 'det', 'gør', 'jeg.']
                },
                pronunciation: {
                    target: 'Ja, det gør jeg.',
                    focus: ['det', 'gør', 'jeg']
                }
            },
            { 
                type: 'npc', 
                name: 'Læge', 
                text: 'Hoster du slim op?' 
            },

            // --- REPLIKSKIFTE 5 ---
            { 
                type: 'user_action',
                stepNum: 5,
                construction: {
                    type: 'OP',
                    words: ['Ja,', 'der', 'er', 'lidt', 'grønt', 'slim.']
                },
                pronunciation: {
                    target: 'Ja, der er lidt grønt slim.',
                    focus: ['der', 'er', 'lidt', 'grønt']
                }
            },
            { 
                type: 'npc', 
                name: 'Læge', 
                text: 'Har du andre symptomer som kvalme eller diarré?' 
            },

            // --- REPLIKSKIFTE 6 ---
            { 
                type: 'user_action',
                stepNum: 6,
                construction: {
                    type: 'OP',
                    words: ['Nej,', 'kun', 'træthed', 'og', 'ondt', 'i', 'halsen.']
                },
                pronunciation: {
                    target: 'Nej, kun træthed og ondt i halsen.',
                    focus: ['træthed', 'ondt']
                }
            },
            { 
                type: 'npc', 
                name: 'Læge', 
                text: 'Jeg vil udskrive nogle medikamenter til dig mod feberen og hosten. Sørg for at drikke masser af væske og få hvile.' 
            },

            // --- REPLIKSKIFTE 7 ---
            { 
                type: 'user_action',
                stepNum: 7,
                construction: {
                    type: 'OP',
                    words: ['Tak,', 'det', 'vil', 'jeg', 'gøre.']
                },
                pronunciation: {
                    target: 'Tak, det vil jeg gøre.',
                    focus: ['det', 'jeg', 'gøre']
                }
            },

            // --- AFSPLUTNING ---
            { 
                type: 'npc', 
                name: 'Læge', 
                text: 'Rigtig god bedring. Ring endelig igen, hvis det bliver værre!' 
            },
            { 
                type: 'narrative', 
                text: '🏆 Flot klaret! Du har gennemført samtalen med lægen i 7 replikskifter og bygget alle sætninger korrekt.' 
            }
        ];
    }

    // --- State Management ---
    let currentStepIndex = parseInt(localStorage.getItem('story_laege_progress') || '0', 10);
    const appState = {
        currentPhase: 'construction', // 'construction' -> 'pronunciation'
        shuffledWords: null,
        selectedWords: [],
        pronunciationFails: 0
    };

    function renderStartScreen() {
        contentArea.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.style.textAlign = 'center';
        card.style.maxWidth = '550px';
        card.style.margin = '2rem auto';
        card.style.padding = '2.5rem 2rem';

        const h1 = document.createElement('h2');
        h1.textContent = 'En ansat ringer til lægen';
        h1.style.marginBottom = '1rem';

        const p = document.createElement('p');
        p.textContent = 'Serie: Sygdom & job (Del 1 af 4) • Byg dine replikker i ordpuslespillet og gennemfør en realistisk telefonsamtale med lægen.';
        p.style.marginBottom = '1.8rem';
        p.style.color = 'var(--text-muted)';
        p.style.lineHeight = '1.6';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Indtast dit fornavn...';
        input.className = 'story-input';
        if (userName) input.value = userName;

        const btn = document.createElement('button');
        btn.className = 'gemini-btn';
        btn.textContent = 'Start Samtalen ➔';
        btn.style.marginTop = '1.5rem';
        btn.onclick = () => {
            const val = input.value.trim();
            userName = val.length > 0 ? val : 'Kursist';
            localStorage.setItem('story_username', userName);
            initStoryData(userName);
            renderStory();
        };

        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(input);
        card.appendChild(document.createElement('br'));
        card.appendChild(btn);
        contentArea.appendChild(card);
    }

    function renderStory() {
        resetBtn.style.display = 'block';
        contentArea.innerHTML = '';
        
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        contentArea.appendChild(chatContainer);

        // Advance currentStepIndex past npc/narrative until we hit user_action or reach the end
        while (currentStepIndex < storyData.length && storyData[currentStepIndex].type !== 'user_action') {
            if (currentStepIndex === storyData.length - 1) break;
            currentStepIndex++;
        }

        // Render history up to currentStepIndex
        for (let i = 0; i <= currentStepIndex; i++) {
            if (i >= storyData.length) break;
            const step = storyData[i];
            
            if (step.type === 'narrative') {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble narrative';
                bubble.textContent = step.text;
                chatContainer.appendChild(bubble);
            } 
            else if (step.type === 'npc') {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble npc';
                bubble.innerHTML = `<strong>${step.name}:</strong> ${step.text}`;
                chatContainer.appendChild(bubble);
            }
            else if (step.type === 'user_action') {
                if (i < currentStepIndex) {
                    // Past completed user action
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble user past';
                    bubble.innerHTML = `<strong>${userName}:</strong> ${step.pronunciation.target}`;
                    chatContainer.appendChild(bubble);
                } else {
                    // Current active turn
                    renderCurrentAction(chatContainer, step);
                }
            }
        }

        // When finished all steps, show completion buttons
        if (currentStepIndex >= storyData.length - 1) {
            const finishCard = document.createElement('div');
            finishCard.style.textAlign = 'center';
            finishCard.style.marginTop = '2rem';
            finishCard.style.display = 'flex';
            finishCard.style.justifyContent = 'center';
            finishCard.style.gap = '1rem';
            finishCard.style.flexWrap = 'wrap';

            const backToMenuBtn = document.createElement('button');
            backToMenuBtn.className = 'gemini-btn';
            backToMenuBtn.textContent = '← Tilbage til Historier';
            backToMenuBtn.onclick = () => navigateFn('historier_menu');

            const restartBtn = document.createElement('button');
            restartBtn.className = 'back-btn';
            restartBtn.textContent = '↻ Prøv samtalen igen';
            restartBtn.onclick = () => {
                localStorage.removeItem('story_laege_progress');
                currentStepIndex = 0;
                appState.currentPhase = 'construction';
                appState.shuffledWords = null;
                appState.selectedWords = [];
                renderStory();
            };

            finishCard.appendChild(backToMenuBtn);
            finishCard.appendChild(restartBtn);
            chatContainer.appendChild(finishCard);
        }
        
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 120);
    }

    function renderCurrentAction(chatContainer, step) {
        const actionBox = document.createElement('div');
        actionBox.className = 'action-box';
        
        // Progress badge (Replikskifte X af 7)
        if (step.stepNum) {
            const stepBadge = document.createElement('div');
            stepBadge.style.display = 'inline-block';
            stepBadge.style.background = 'rgba(255, 204, 0, 0.2)';
            stepBadge.style.color = '#ffcc00';
            stepBadge.style.padding = '0.3rem 0.8rem';
            stepBadge.style.borderRadius = '12px';
            stepBadge.style.fontSize = '0.9rem';
            stepBadge.style.fontWeight = 'bold';
            stepBadge.style.marginBottom = '0.8rem';
            stepBadge.textContent = `Replikskifte ${step.stepNum} af 7`;
            actionBox.appendChild(stepBadge);
        }

        // 1. Construction Phase (Ordpuslespil OP)
        const constructBox = document.createElement('div');
        constructBox.className = 'construct-box';
        if (appState.currentPhase === 'construction') {
            renderOrdstilling(constructBox, step);
        } else {
            constructBox.innerHTML = `<div style="color: #4caf50; font-weight: bold; margin: 0.5rem 0; font-size: 1.1rem;">✓ Sætning bygget korrekt!</div>`;
        }
        actionBox.appendChild(constructBox);

        // 2. Pronunciation Phase (Udtaletræning - UDEN fonetiktips)
        if (appState.currentPhase === 'pronunciation') {
            const pronBox = document.createElement('div');
            pronBox.className = 'pron-box';
            renderPronunciation(pronBox, step);
            actionBox.appendChild(pronBox);
        }

        chatContainer.appendChild(actionBox);
    }

    // --- CONSTRUCT OP (Ordpuslespil) ---
    function renderOrdstilling(container, step) {
        const targetWords = step.construction.words;
        
        if (!appState.shuffledWords) {
            let shuffled = [...targetWords].sort(() => Math.random() - 0.5);
            if (shuffled.join(' ') === targetWords.join(' ') && targetWords.length > 1) {
                shuffled.reverse();
            }
            appState.shuffledWords = shuffled;
            appState.selectedWords = [];
        }

        const instructionP = document.createElement('p');
        instructionP.style.color = 'var(--text-muted)';
        instructionP.style.fontSize = '1rem';
        instructionP.style.marginBottom = '0.5rem';
        instructionP.textContent = 'Klik på ordene nedenfor i den rigtige rækkefølge for at bygge replikken:';
        container.appendChild(instructionP);

        const dropZone = document.createElement('div');
        dropZone.className = 'op-dropzone';
        
        const poolZone = document.createElement('div');
        poolZone.className = 'op-poolzone';
        
        const controlArea = document.createElement('div');
        controlArea.style.display = 'flex';
        controlArea.style.justifyContent = 'center';
        controlArea.style.alignItems = 'center';
        controlArea.style.gap = '1rem';
        controlArea.style.marginTop = '0.8rem';

        const resetWordsBtn = document.createElement('button');
        resetWordsBtn.className = 'back-btn';
        resetWordsBtn.style.fontSize = '0.85rem';
        resetWordsBtn.style.padding = '0.3rem 0.8rem';
        resetWordsBtn.textContent = 'Nulstil ord ↺';
        resetWordsBtn.onclick = () => {
            appState.shuffledWords = [...targetWords].sort(() => Math.random() - 0.5);
            appState.selectedWords = [];
            updateOPUI();
        };
        controlArea.appendChild(resetWordsBtn);

        const feedbackArea = document.createElement('div');
        feedbackArea.style.textAlign = 'center';
        feedbackArea.style.marginTop = '0.5rem';
        feedbackArea.style.fontSize = '1.05rem';
        feedbackArea.style.fontWeight = 'bold';

        function updateOPUI() {
            dropZone.innerHTML = '';
            poolZone.innerHTML = '';

            appState.selectedWords.forEach((word, idx) => {
                const wBtn = document.createElement('button');
                wBtn.className = 'op-word selected';
                wBtn.textContent = word;
                wBtn.onclick = () => {
                    appState.selectedWords.splice(idx, 1);
                    appState.shuffledWords.push(word);
                    updateOPUI();
                };
                dropZone.appendChild(wBtn);
            });

            appState.shuffledWords.forEach((word, idx) => {
                const wBtn = document.createElement('button');
                wBtn.className = 'op-word pool';
                wBtn.textContent = word;
                wBtn.onclick = () => {
                    appState.shuffledWords.splice(idx, 1);
                    appState.selectedWords.push(word);
                    updateOPUI();
                };
                poolZone.appendChild(wBtn);
            });

            // Check correctness when all words are placed
            if (appState.shuffledWords.length === 0) {
                const selectedStr = appState.selectedWords.join(' ');
                const isCorrect = selectedStr === targetWords.join(' ') || (step.construction.altWords && selectedStr === step.construction.altWords.join(' '));
                if (isCorrect) {
                    dropZone.style.border = '2px solid #4caf50';
                    feedbackArea.innerHTML = '<span style="color: #4caf50;">✓ Rigtig ordstilling! Gør dig klar til at sige replikken.</span>';
                    setTimeout(() => {
                        appState.currentPhase = 'pronunciation';
                        appState.shuffledWords = null;
                        renderStory();
                    }, 500);
                } else {
                    dropZone.style.border = '2px solid #ff5e5b';
                    feedbackArea.innerHTML = '<span style="color: #ff5e5b;">✗ Ikke helt den rigtige rækkefølge. Klik på ordene eller nulstil for at rette.</span>';
                }
            } else {
                dropZone.style.border = '2px dashed rgba(255,255,255,0.25)';
                feedbackArea.innerHTML = '';
            }
        }

        updateOPUI();
        
        container.appendChild(dropZone);
        container.appendChild(poolZone);
        container.appendChild(controlArea);
        container.appendChild(feedbackArea);
    }

    // --- PRONUNCIATION PHASE (Uden fonetiktips) ---
    function renderPronunciation(container, step) {
        const pronCont = document.createElement('div');
        pronCont.style.display = 'flex';
        pronCont.style.flexDirection = 'column';
        pronCont.style.alignItems = 'center';
        pronCont.style.gap = '1rem';
        pronCont.style.padding = '1.5rem';
        pronCont.style.background = 'rgba(0,0,0,0.2)';
        pronCont.style.border = '1px solid rgba(255, 204, 0, 0.3)';
        pronCont.style.borderRadius = '16px';
        pronCont.style.marginTop = '0.5rem';

        // Target sentence display
        const sentenceDisplay = document.createElement('div');
        sentenceDisplay.className = 'udtale-sentence';
        sentenceDisplay.style.fontSize = '1.35rem';
        sentenceDisplay.style.fontWeight = 'bold';
        sentenceDisplay.style.textAlign = 'center';
        sentenceDisplay.style.margin = '0.5rem 0';
        sentenceDisplay.style.lineHeight = '1.6';
        
        const targetWords = step.pronunciation.target.split(' ');
        sentenceDisplay.innerHTML = targetWords.map(w => {
            return `<span class="udtale-word">${w}</span>`;
        }).join(' ');
        pronCont.appendChild(sentenceDisplay);

        // Model audio listen button
        const audioRow = document.createElement('div');
        audioRow.style.display = 'flex';
        audioRow.style.gap = '1rem';
        audioRow.style.alignItems = 'center';

        const listenBtn = document.createElement('button');
        listenBtn.className = 'back-btn';
        listenBtn.style.fontSize = '0.95rem';
        listenBtn.style.padding = '0.4rem 1rem';
        listenBtn.innerHTML = '🔊 Hør udtale';
        listenBtn.onclick = () => speakDanish(step.pronunciation.target);
        audioRow.appendChild(listenBtn);
        pronCont.appendChild(audioRow);

        // Progress bar container
        const progressContainer = document.createElement('div');
        progressContainer.style.width = '100%';
        progressContainer.style.maxWidth = '400px';
        progressContainer.style.display = 'none';
        progressContainer.style.alignItems = 'center';
        progressContainer.style.gap = '1rem';
        progressContainer.style.margin = '0.5rem 0';
        
        const label = document.createElement('span');
        label.textContent = 'Mestring:';
        label.style.fontWeight = 'bold';
        label.style.fontSize = '0.95rem';
        
        const barWrapper = document.createElement('div');
        barWrapper.style.flex = '1';
        barWrapper.style.height = '12px';
        barWrapper.style.background = 'rgba(255,255,255,0.1)';
        barWrapper.style.borderRadius = '6px';
        barWrapper.style.overflow = 'hidden';
        
        const progressBar = document.createElement('div');
        progressBar.style.height = '100%';
        progressBar.style.width = '0%';
        progressBar.style.background = 'linear-gradient(90deg, #ff5e5b, #4caf50)';
        progressBar.style.transition = 'width 0.4s ease';
        
        const scoreText = document.createElement('span');
        scoreText.textContent = '0%';
        scoreText.style.fontWeight = 'bold';
        scoreText.style.minWidth = '45px';
        scoreText.style.fontSize = '0.95rem';

        barWrapper.appendChild(progressBar);
        progressContainer.appendChild(label);
        progressContainer.appendChild(barWrapper);
        progressContainer.appendChild(scoreText);
        pronCont.appendChild(progressContainer);

        const micBtn = document.createElement('button');
        micBtn.className = 'mic-btn';
        micBtn.innerHTML = '🎤';
        pronCont.appendChild(micBtn);
        
        const statusText = document.createElement('div');
        statusText.style.color = 'var(--text-muted)';
        statusText.style.fontSize = '1rem';
        statusText.textContent = 'Tryk på mikrofonen og tal...';
        pronCont.appendChild(statusText);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = 'Videre i samtalen ➔';
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            currentStepIndex++;
            localStorage.setItem('story_laege_progress', currentStepIndex);
            appState.currentPhase = 'construction';
            appState.shuffledWords = null;
            appState.selectedWords = [];
            appState.pronunciationFails = 0;
            renderStory();
        };
        pronCont.appendChild(nextBtn);

        const skipBtn = document.createElement('button');
        skipBtn.className = 'back-btn';
        skipBtn.style.fontSize = '0.85rem';
        skipBtn.textContent = 'Spring over (kun ved mikrofonfejl)';
        skipBtn.onclick = nextBtn.onclick;
        pronCont.appendChild(skipBtn);

        // Speech Logic using Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            statusText.textContent = 'Browser understøtter ikke mikrofon. Tryk "Spring over" for at fortsætte.';
            skipBtn.style.display = 'inline-block';
        } else {
            const recognition = new SpeechRecognition();
            recognition.lang = 'da-DK';
            recognition.interimResults = false;
            let isListening = false;

            micBtn.onclick = () => {
                if (isListening) {
                    recognition.stop();
                    return;
                }
                try {
                    recognition.start();
                    isListening = true;
                    micBtn.classList.add('listening');
                    statusText.innerHTML = 'Lytter... Tal nu!';
                    progressContainer.style.display = 'none';
                    progressBar.style.width = '0%';
                    scoreText.textContent = '0%';
                    Array.from(sentenceDisplay.querySelectorAll('.udtale-word')).forEach(s => s.classList.remove('correct', 'incorrect'));
                } catch(e) {
                    isListening = false;
                    micBtn.classList.remove('listening');
                }
            };

            recognition.onresult = (e) => {
                const spoken = e.results[0][0].transcript;
                statusText.innerHTML = `Behandler udtale...`;
                evaluatePronunciation(spoken);
            };

            recognition.onerror = () => {
                micBtn.classList.remove('listening');
                isListening = false;
                statusText.innerHTML = 'Kunne ikke opfatte tale. Prøv igen!';
            };

            recognition.onend = () => {
                micBtn.classList.remove('listening');
                isListening = false;
            };

            function evaluatePronunciation(spoken) {
                const spokenArr = spoken.toLowerCase().replace(/[.,!?:;]/g, '').split(/\s+/).filter(w => w);
                let correctCount = 0;
                
                const focusWords = step.pronunciation.focus.map(f => f.toLowerCase());
                const totalReq = focusWords.length > 0 ? focusWords.length : targetWords.length;
                
                const spans = sentenceDisplay.querySelectorAll('.udtale-word');

                targetWords.forEach((word, idx) => {
                    const clean = word.toLowerCase().replace(/[.,!?:;]/g, '');
                    const isFocus = focusWords.some(f => clean.includes(f));
                    
                    let found = spokenArr.some(sw => sw === clean || (clean.length > 3 && sw.length > 3 && (sw.includes(clean) || clean.includes(sw))));

                    if (found) {
                        if (isFocus) correctCount++;
                        spans[idx].classList.add('correct');
                        spans[idx].classList.remove('incorrect');
                    } else if (isFocus) {
                        spans[idx].classList.add('incorrect');
                        spans[idx].classList.remove('correct');
                    }
                });

                const score = Math.min(100, Math.round((correctCount / totalReq) * 100));
                progressContainer.style.display = 'flex';
                
                setTimeout(() => {
                    progressBar.style.width = score + '%';
                    scoreText.textContent = score + '%';
                    const spokenHTML = `<div style="margin-top: 0.8rem; padding: 0.8rem 1.2rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; font-size: 1.05rem; color: #ffffff; text-align: center;">Du sagde:<br/><span style="color: #ffcc00; font-size: 1.2rem; font-weight: bold;">"${spoken}"</span></div>`;
                    
                    if (score >= 60) {
                        progressBar.style.background = '#4caf50';
                        statusText.innerHTML = `<span style="color:#4caf50; font-weight: bold;">✓ Flot udtalt!</span>${spokenHTML}`;
                        micBtn.style.display = 'none';
                        skipBtn.style.display = 'none';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        progressBar.style.background = '#ff5e5b';
                        appState.pronunciationFails++;
                        statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">Prøv igen! Lyt gerne til udtalen først.</span>${spokenHTML}`;
                    }
                }, 100);
            }
        }

        container.appendChild(pronCont);
    }

    // Initialize View
    initStoryData(userName);
    if (userName) {
        renderStory();
    } else {
        renderStartScreen();
    }

    container.appendChild(viewContainer);
}
