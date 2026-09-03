import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderInteractiveStoryView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container story-view-container';

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
        if(confirm('Er du sikker på, at du vil starte historien forfra?')) {
            localStorage.removeItem('story_progress');
            currentStepIndex = 0;
            appState.currentPhase = 'trps';
            renderStory();
        }
    };
    resetBtn.style.display = 'none'; // Hidden on start screen
    topBar.appendChild(resetBtn);

    viewContainer.appendChild(topBar);

    let userName = localStorage.getItem('story_username') || '';
    let currentStepIndex = parseInt(localStorage.getItem('story_progress') || '0', 10);
    
    // Will be populated after name is known
    let storyData = [];

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    function initStoryData() {
        storyData = [
            // --- SCENE 1 ---
            { type: 'narrative', text: '📍 Scene 1: Sprogskolen. Et lyst klasselokale. Du sidder ved et bord. Mateo, en ny kursist, sætter sig ved siden af dig.' },
            { type: 'user_action', 
              trps: 'Præsenter dig selv og spørg, hvad han hedder.', 
              construction: {
                type: 'OP', 
                words: ['Hej,', 'jeg', 'hedder', `${userName}.`, 'Hvad', 'hedder', 'du?']
              },
              pronunciation: {
                target: `Hej, jeg hedder ${userName}. Hvad hedder du?`,
                focus: ['hedder']
              }
            },
            { type: 'npc', name: 'Mateo', text: `Hej ${userName}. Jeg hedder Mateo. Jeg er ny her på holdet.` },
            { type: 'user_action',
              trps: 'Byd ham velkommen og spørg, hvor han kommer fra.',
              construction: {
                type: 'OP',
                words: ['Velkommen', 'til!', 'Hvor', 'kommer', 'du', 'fra?']
              },
              pronunciation: {
                target: 'Velkommen til! Hvor kommer du fra?',
                focus: [] // full sentence
              }
            },
            { type: 'npc', name: 'Mateo', text: 'Jeg kommer fra Spanien. Og hvad med dig? Hvor kommer du fra?' },
            { type: 'user_action',
              trps: 'Fortæl, at du bor i Danmark nu, og spørg hvor længe han har boet her.',
              construction: {
                type: 'OP',
                words: ['Jeg', 'bor', 'i', 'Danmark', 'nu.', 'Hvor', 'længe', 'har', 'du', 'boet', 'her?']
              },
              pronunciation: {
                target: 'Jeg bor i Danmark nu. Hvor længe har du boet her?',
                focus: []
              }
            },
            { type: 'npc', name: 'Mateo', text: 'Jeg har boet her i syv måneder.' },

            // --- SCENE 2 ---
            { type: 'narrative', text: '📍 Scene 2: Grønthandleren. Du er hos den lokale grønthandler for at købe ind.' },
            { type: 'user_action',
              trps: 'Du vil gerne vide, hvor tomaterne er. Hvordan spørger du?',
              construction: {
                type: 'OP',
                words: ['Hej.', 'Undskyld,', 'hvor', 'er', 'tomaterne?']
              },
              pronunciation: {
                target: 'Hej. Undskyld, hvor er tomaterne?',
                focus: ['tomaterne']
              }
            },
            { type: 'npc', name: 'Grønthandler', text: 'De står lige derovre i den røde kasse.' },
            { type: 'user_action',
              trps: 'Spørg om prisen på et kilo tomater.',
              construction: {
                type: 'MO',
                text: 'Hvad koster [blank_0] kilo tomater?',
                blanks: [
                    { answer: 'et', options: ['et', 'en', 'to'] }
                ]
              },
              pronunciation: {
                target: 'Hvad koster et kilo tomater?',
                focus: ['kilo', 'tomater']
              }
            },
            { type: 'npc', name: 'Grønthandler', text: 'De koster 25 kroner for et kilo. De er meget friske i dag.' },
            { type: 'user_action',
              trps: 'Bestil et kilo røde tomater og en stor agurk.',
              construction: {
                type: 'MO',
                text: 'Jeg vil gerne bede om et kilo af de [blank_0] tomater og [blank_1] stor agurk.',
                blanks: [
                    { answer: 'røde', options: ['røde', 'rød', 'rødt'] },
                    { answer: 'en', options: ['en', 'et', 'to'] }
                ]
              },
              pronunciation: {
                target: 'Jeg vil gerne bede om et kilo af de røde tomater og en stor agurk.',
                focus: ['røde', 'agurk']
              }
            },
            { type: 'npc', name: 'Grønthandler', text: 'Værsgo. Det bliver 30 kroner i alt. Hav en god dag!' },

            // --- SCENE 3 ---
            { type: 'narrative', text: '📍 Scene 3: Hjemme i køkkenet. Du står og laver aftensmad. Din veninde Sofie ringer.' },
            { type: 'npc', name: 'Sofie', text: `Hej ${userName}, det er Sofie! Hvad laver du?` },
            { type: 'user_action',
              trps: 'Fortæl, at du står i køkkenet og laver aftensmad.',
              construction: {
                type: 'OP',
                words: ['Jeg', 'står', 'i', 'køkkenet', 'og', 'laver', 'aftensmad.']
              },
              pronunciation: {
                target: 'Jeg står i køkkenet og laver aftensmad.',
                focus: ['aftensmad']
              }
            },
            { type: 'npc', name: 'Sofie', text: 'Uh, det lyder lækkert. Hvad laver du for noget mad?' },
            { type: 'user_action',
              trps: 'Fortæl, at du laver pasta med hjemmelavet tomatsovs og hvidløg.',
              construction: {
                type: 'MO',
                text: 'Jeg laver pasta med hjemmelavet tomatsovs og [blank_0].',
                blanks: [
                    { answer: 'hvidløg', options: ['hvidløg', 'sortløg', 'rødløg'] }
                ]
              },
              pronunciation: {
                target: 'Jeg laver pasta med hjemmelavet tomatsovs og hvidløg.',
                focus: ['hvidløg'] // stumt d/g
              }
            },
            { type: 'npc', name: 'Sofie', text: 'Mums! Jeg elsker pasta. Spiser du ofte pasta?' },
            { type: 'user_action',
              trps: 'Svar at du tit spiser det, og spørg hende.',
              construction: {
                type: 'OP',
                words: ['Ja,', 'jeg', 'spiser', 'det', 'ret', 'tit,', 'og', 'hvad', 'med', 'dig?']
              },
              pronunciation: {
                target: 'Ja, jeg spiser det ret tit, og hvad med dig?',
                focus: []
              }
            },
            { type: 'npc', name: 'Sofie', text: 'Jeg spiser nogle gange pasta. ' },
            { type: 'user_action',
              trps: 'Inviter hende over til mad (ren mundtlig øvelse).',
              construction: {
                type: 'HIDDEN_OP',
                words: ['Vil', 'du', 'komme', 'over', 'og', 'spise', 'med?', 'Der', 'er', 'rigeligt', 'mad!'],
                fallbackLink: 'lav_sporgsmal'
              },
              pronunciation: {
                target: 'Vil du komme over og spise med? Der er rigeligt mad!',
                focus: ['mad']
              }
            },
            { type: 'npc', name: 'Sofie', text: 'Ja tak! Jeg er der om ti minutter!' },
            { type: 'narrative', text: '🏆 Historien er slut! Du klarede alle opgaver.' }
        ];
    }

    // --- State Management ---
    const appState = {
        currentPhase: 'trps', // 'trps' -> 'construction' -> 'pronunciation' -> 'done'
        constructionPassed: false,
        selectedWords: [], // for OP
        pronunciationFails: 0, // Track fails for fallback
        opFails: 0 // Track fails for OP link
    };

    function renderStartScreen() {
        contentArea.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.style.textAlign = 'center';

        const h1 = document.createElement('h2');
        h1.textContent = 'Velkommen til Historien';
        h1.style.marginBottom = '1rem';

        const p = document.createElement('p');
        p.textContent = 'Indtast dit navn for at starte. Du vil spille hovedrollen i historien.';
        p.style.marginBottom = '2rem';
        p.style.color = 'var(--text-muted)';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Dit navn...';
        input.className = 'story-input';

        const btn = document.createElement('button');
        btn.className = 'gemini-btn';
        btn.textContent = 'Start Historien';
        btn.style.marginTop = '1.5rem';
        btn.onclick = () => {
            if (input.value.trim().length > 0) {
                userName = input.value.trim();
                localStorage.setItem('story_username', userName);
                initStoryData();
                renderStory();
            }
        };

        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(input);
        card.appendChild(document.createElement('br'));
        card.appendChild(btn);
        contentArea.appendChild(card);
    }

    function renderStory() {
        resetBtn.style.display = 'block'; // Show reset button when story is active
        contentArea.innerHTML = '';
        
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        contentArea.appendChild(chatContainer);

        // Auto-advance past narrative and npc steps until we hit a user_action
        while (currentStepIndex < storyData.length && storyData[currentStepIndex].type !== 'user_action') {
            if (currentStepIndex === storyData.length - 1) break; // End of story
            currentStepIndex++;
        }

        // Render past steps
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
                    // Past user action - just show the completed text
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble user past';
                    bubble.innerHTML = `<strong>${userName}:</strong> ${step.pronunciation.target}`;
                    chatContainer.appendChild(bubble);
                } else {
                    // CURRENT STEP
                    renderCurrentAction(chatContainer, step);
                }
            }
        }
        
        // Auto scroll to bottom
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    }

    function renderCurrentAction(chatContainer, step) {
        const actionBox = document.createElement('div');
        actionBox.className = 'action-box';
        
        // 1. TRPS (Thought Bubble)
        const trpsBox = document.createElement('div');
        trpsBox.className = 'trps-box';
        trpsBox.innerHTML = `💭 <em>${step.trps}</em>`;
        actionBox.appendChild(trpsBox);

        // 2. Construction Phase
        const constructBox = document.createElement('div');
        constructBox.className = 'construct-box';
        if (appState.currentPhase === 'trps' || appState.currentPhase === 'construction') {
            if (step.construction.type === 'HIDDEN_OP') {
                appState.currentPhase = 'pronunciation';
                constructBox.style.display = 'none';
            } else {
                appState.currentPhase = 'construction';
                if (step.construction.type === 'OP') {
                    renderOrdstilling(constructBox, step);
                } else if (step.construction.type === 'MO') {
                    renderManglerOrd(constructBox, step);
                }
            }
        } else if (step.construction.type !== 'HIDDEN_OP') {
            // Already constructed, show the correct sentence
            constructBox.innerHTML = `<div style="color: #4caf50; font-weight: bold; margin: 1rem 0;">✓ Sætning bygget!</div>`;
        }
        actionBox.appendChild(constructBox);

        // 3. Pronunciation Phase
        if (appState.currentPhase === 'pronunciation') {
            const pronBox = document.createElement('div');
            pronBox.className = 'pron-box';
            renderPronunciation(pronBox, step);
            actionBox.appendChild(pronBox);
        }

        chatContainer.appendChild(actionBox);
    }

    // --- CONSTRUCT OP ---
    function renderOrdstilling(container, step) {
        const targetWords = step.construction.words;
        
        // Only shuffle on first render
        if (!appState.shuffledWords) {
            appState.shuffledWords = [...targetWords].sort(() => Math.random() - 0.5);
            appState.selectedWords = [];
        }

        const dropZone = document.createElement('div');
        dropZone.className = 'op-dropzone';
        
        const poolZone = document.createElement('div');
        poolZone.className = 'op-poolzone';
        
        const feedbackArea = document.createElement('div');
        feedbackArea.style.textAlign = 'center';
        feedbackArea.style.marginTop = '1rem';
        feedbackArea.style.fontSize = '1.1rem';

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

            // Check if correct
            if (appState.shuffledWords.length === 0) {
                if (appState.selectedWords.join(' ') === targetWords.join(' ')) {
                    dropZone.style.border = '2px solid #4caf50';
                    feedbackArea.innerHTML = '';
                    setTimeout(() => {
                        appState.currentPhase = 'pronunciation';
                        appState.shuffledWords = null; // reset
                        renderStory();
                    }, 500);
                } else {
                    dropZone.style.border = '2px solid #ff5e5b';
                    appState.opFails++;
                    if (appState.opFails >= 2 && step.construction.fallbackLink) {
                        feedbackArea.innerHTML = `<span style="color:#ffcc00">Driller det? <a href="#" id="fb-link" style="color:white; text-decoration:underline;">Klik her for at træne ordstilling i spørgsmål</a>.</span>`;
                        setTimeout(() => {
                            document.getElementById('fb-link').onclick = (e) => {
                                e.preventDefault();
                                navigateFn(step.construction.fallbackLink);
                            };
                        }, 0);
                    }
                }
            } else {
                dropZone.style.border = '2px dashed rgba(255,255,255,0.2)';
            }
        }
        updateOPUI();
        
        container.appendChild(document.createElement('br'));
        container.appendChild(dropZone);
        container.appendChild(poolZone);
        container.appendChild(feedbackArea);
    }

    // --- CONSTRUCT MO ---
    function renderManglerOrd(container, step) {
        const textContainer = document.createElement('div');
        textContainer.className = 'grammatik-text-container';
        textContainer.style.margin = '1rem 0';
        textContainer.style.fontSize = '1.2rem';

        const parts = step.construction.text.split(/(\[blank_\d+\])/);
        parts.forEach(part => {
            const match = part.match(/\[blank_(\d+)\]/);
            if (match) {
                const idx = parseInt(match[1]);
                const blankData = step.construction.blanks[idx];
                
                const select = document.createElement('select');
                select.className = 'grammatik-select';
                select.dataset.idx = idx;
                
                const defOpt = document.createElement('option');
                defOpt.value = ''; defOpt.textContent = '...';
                select.appendChild(defOpt);

                const opts = [...blankData.options].sort(() => Math.random() - 0.5);
                opts.forEach(o => {
                    const opt = document.createElement('option');
                    opt.value = o; opt.textContent = o;
                    select.appendChild(opt);
                });

                select.onchange = () => {
                    if (select.value === blankData.answer) {
                        select.classList.add('correct');
                        select.classList.remove('wrong');
                        select.disabled = true; // Lock it in
                        checkMOCorrectness();
                    } else if (select.value !== '') {
                        select.classList.add('wrong');
                    } else {
                        select.classList.remove('wrong', 'correct');
                    }
                };
                textContainer.appendChild(select);
            } else {
                const span = document.createElement('span');
                span.textContent = part;
                textContainer.appendChild(span);
            }
        });

        function checkMOCorrectness() {
            const selects = textContainer.querySelectorAll('select');
            const allCorrect = Array.from(selects).every(s => s.classList.contains('correct'));
            if (allCorrect) {
                setTimeout(() => {
                    appState.currentPhase = 'pronunciation';
                    renderStory();
                }, 500);
            }
        }

        container.appendChild(textContainer);
    }

    // --- PRONUNCIATION ---
    function renderPronunciation(container, step) {
        const pronCont = document.createElement('div');
        pronCont.style.display = 'flex';
        pronCont.style.flexDirection = 'column';
        pronCont.style.alignItems = 'center';
        pronCont.style.gap = '1rem';
        pronCont.style.padding = '1.5rem';
        pronCont.style.background = 'rgba(0,0,0,0.1)';
        pronCont.style.borderRadius = '16px';
        pronCont.style.marginTop = '1rem';

        const instruction = document.createElement('div');
        instruction.innerHTML = `<strong>Udtale-test:</strong> Tryk på mikrofonen og læs din sætning højt.`;
        
        const sentenceDisplay = document.createElement('div');
        sentenceDisplay.className = 'udtale-sentence';
        sentenceDisplay.style.fontSize = '1.5rem';
        sentenceDisplay.style.fontWeight = 'bold';
        sentenceDisplay.style.textAlign = 'center';
        
        const progressContainer = document.createElement('div');
        progressContainer.style.width = '100%';
        progressContainer.style.maxWidth = '400px';
        progressContainer.style.display = 'none';
        progressContainer.style.alignItems = 'center';
        progressContainer.style.gap = '1rem';
        progressContainer.style.margin = '1rem 0';
        
        const label = document.createElement('span');
        label.textContent = 'Mestring:';
        label.style.fontWeight = 'bold';
        
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
        progressBar.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const scoreText = document.createElement('span');
        scoreText.textContent = '0%';
        scoreText.style.fontWeight = 'bold';
        scoreText.style.minWidth = '45px';

        barWrapper.appendChild(progressBar);
        progressContainer.appendChild(label);
        progressContainer.appendChild(barWrapper);
        progressContainer.appendChild(scoreText);

        // Format sentence with target focus
        const targetWords = step.pronunciation.target.split(' ');
        const isHiddenOP = step.construction.type === 'HIDDEN_OP';
        
        sentenceDisplay.innerHTML = targetWords.map(w => {
            const clean = w.toLowerCase().replace(/[.,!?]/g, '');
            const isFocus = step.pronunciation.focus.some(f => clean.includes(f.toLowerCase()));
            const displayText = isHiddenOP ? w.replace(/[a-zA-ZæøåÆØÅ0-9]/g, '_') : w;
            return `<span class="udtale-word ${isFocus ? 'target-focus' : ''}">${displayText}</span>`;
        }).join(' ');

        const micBtn = document.createElement('button');
        micBtn.className = 'mic-btn';
        micBtn.innerHTML = '🎤';
        
        const statusText = document.createElement('div');
        statusText.style.color = 'var(--text-muted)';
        statusText.textContent = 'Klar...';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = 'Videre i historien ➔';
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            currentStepIndex++;
            localStorage.setItem('story_progress', currentStepIndex);
            appState.currentPhase = 'trps';
            appState.pronunciationFails = 0; // Reset for next step
            appState.opFails = 0; // Reset
            renderStory();
        };

        const skipBtn = document.createElement('button');
        skipBtn.className = 'back-btn';
        skipBtn.textContent = 'Spring over (kun for test)';
        skipBtn.onclick = nextBtn.onclick;

        // Speech Logic
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            statusText.textContent = 'Browser understøtter ikke mikrofon. Tryk Spring over.';
            skipBtn.style.display = 'block';
        } else {
            const recognition = new SpeechRecognition();
            recognition.lang = 'da-DK';
            let isListening = false;

            micBtn.onclick = () => {
                if (isListening) { recognition.stop(); return; }
                try {
                    recognition.start();
                    isListening = true;
                    micBtn.classList.add('listening');
                    statusText.innerHTML = 'Lytter... Tal nu (stopper af sig selv)';
                    progressContainer.style.display = 'none';
                    progressBar.style.width = '0%';
                    scoreText.textContent = '0%';
                    Array.from(sentenceDisplay.querySelectorAll('.udtale-word')).forEach(s => s.classList.remove('correct', 'incorrect'));
                } catch(e) {}
            };

            recognition.onresult = (e) => {
                const spoken = e.results[0][0].transcript;
                statusText.innerHTML = `Behandler...`;
                evaluatePronunciation(spoken);
            };

            recognition.onend = () => {
                micBtn.classList.remove('listening');
                isListening = false;
            };

            function evaluatePronunciation(spoken) {
                const spokenArr = spoken.toLowerCase().replace(/[.,!?]/g, '').split(' ').filter(w => w).map(w => w === 'kr' ? 'kroner' : w);
                let correctCnt = 0;
                
                // Calculate total target words that require focus
                let totalReq = 0;
                targetWords.forEach(w => {
                    const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                    if (step.pronunciation.focus.length > 0) {
                        if (step.pronunciation.focus.some(f => clean.includes(f.toLowerCase()))) {
                            totalReq++;
                        }
                    } else {
                        totalReq++;
                    }
                });
                
                if (totalReq === 0) totalReq = 1; // Fallback
                
                let sIdx = 0;
                const spans = sentenceDisplay.querySelectorAll('.udtale-word');

                targetWords.forEach((word, idx) => {
                    const clean = word.toLowerCase().replace(/[.,!?]/g, '');
                    const isFocus = step.pronunciation.focus.length > 0 ? step.pronunciation.focus.some(f => clean.includes(f.toLowerCase())) : true;
                    
                    let found = false;
                    for (let i = sIdx; i < Math.min(sIdx + 3, spokenArr.length); i++) {
                        if (spokenArr[i] === clean || (clean.length>3 && spokenArr[i].length>3 && (spokenArr[i].includes(clean) || clean.includes(spokenArr[i])))) {
                            found = true;
                            sIdx = i + 1;
                            break;
                        }
                    }

                    if (found) {
                        if (isFocus) correctCnt++;
                        spans[idx].classList.add('correct');
                        if (isHiddenOP) spans[idx].textContent = word; // Reveal correct words
                    } else if (isFocus) {
                        spans[idx].classList.add('incorrect');
                    }
                });

                const score = totalReq === 0 ? 100 : Math.round((correctCnt / totalReq) * 100);
                
                progressContainer.style.display = 'flex';
                
                setTimeout(() => {
                    progressBar.style.width = score + '%';
                    scoreText.textContent = score + '%';
                    const spokenHTML = `<div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; font-size: 1.1rem; color: #ffffff; text-align: center;">Du sagde:<br/><span style="color: #ffcc00; font-size: 1.3rem; font-weight: bold; line-height: 1.8;">"${spoken}"</span></div>`;
                    
                    if (score >= 80) {
                        progressBar.style.background = '#4caf50';
                        statusText.innerHTML = `<span style="color:#4caf50; font-weight: bold;">Flot udtalt!</span>${spokenHTML}`;
                        
                        if (isHiddenOP) {
                            const spans = sentenceDisplay.querySelectorAll('.udtale-word');
                            targetWords.forEach((w, i) => spans[i].textContent = w);
                        }
                        
                        micBtn.style.display = 'none';
                        skipBtn.style.display = 'none';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        progressBar.style.background = '#ff5e5b';
                        appState.pronunciationFails++;
                        if (appState.pronunciationFails >= 2 && step.construction.type === 'HIDDEN_OP') {
                            // Fallback triggered!
                            progressBar.style.background = '#ffcc00';
                            statusText.innerHTML = `<span style="color:#ffcc00; font-weight: bold;">Det var tæt på! Lad os prøve at bygge sætningen først som hjælp.</span>${spokenHTML}`;
                            
                            setTimeout(() => {
                                step.construction.type = 'OP'; // Downgrade to standard OP
                                appState.currentPhase = 'construction';
                                appState.pronunciationFails = 0; // reset
                                renderStory(); // Rerender to show OP
                            }, 3000);
                        } else {
                            statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">Næsten! Prøv igen.</span>${spokenHTML}`;
                        }
                    }
                }, 100);
            }
        }

        pronCont.appendChild(instruction);
        pronCont.appendChild(sentenceDisplay);
        pronCont.appendChild(progressContainer);
        pronCont.appendChild(micBtn);
        pronCont.appendChild(statusText);
        pronCont.appendChild(nextBtn);
        pronCont.appendChild(skipBtn);
        container.appendChild(pronCont);
    }

    // Only inject CSS once
    if (!document.getElementById('story-styles')) {
        const style = document.createElement('style');
        style.id = 'story-styles';
        style.textContent = `
            .story-input {
                padding: 1rem;
                font-size: 1.2rem;
                border-radius: 12px;
                border: 2px solid rgba(255,255,255,0.2);
                background: rgba(0,0,0,0.2);
                color: white;
                width: 80%;
                max-width: 300px;
                outline: none;
            }
            .story-input:focus {
                border-color: #ffcc00;
            }
            .chat-container {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                padding-bottom: 5rem;
            }
            .chat-bubble {
                padding: 1rem 1.5rem;
                border-radius: 20px;
                max-width: 80%;
                font-size: 1.15rem;
                line-height: 1.5;
                animation: fadeIn 0.4s ease-out forwards;
            }
            .chat-bubble.narrative {
                background: rgba(255,255,255,0.1);
                color: #e0e0e0;
                align-self: center;
                font-style: italic;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.15);
            }
            .chat-bubble.npc {
                background: rgba(255, 204, 0, 0.15);
                border: 1px solid rgba(255, 204, 0, 0.3);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            .chat-bubble.user.past {
                background: rgba(76, 175, 80, 0.15);
                border: 1px solid rgba(76, 175, 80, 0.3);
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            .action-box {
                align-self: center;
                width: 100%;
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(255,255,255,0.1);
                border-radius: 24px;
                padding: 1.5rem;
                animation: fadeIn 0.5s ease;
            }
            .trps-box {
                font-size: 1.2rem;
                color: #ffcc00;
                margin-bottom: 1.5rem;
                text-align: center;
            }
            .op-dropzone {
                min-height: 60px;
                border: 2px dashed rgba(255,255,255,0.3);
                border-radius: 12px;
                padding: 1rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
                transition: border-color 0.3s;
            }
            .op-poolzone {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                justify-content: center;
            }
            .op-word {
                padding: 0.6rem 1rem;
                font-size: 1.1rem;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-family: inherit;
                transition: transform 0.1s;
            }
            .op-word:active { transform: scale(0.9); }
            .op-word.pool {
                background: var(--card-bg);
                color: white;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .op-word.selected {
                background: #4caf50;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    if (!userName) {
        renderStartScreen();
    } else {
        initStoryData();
        renderStory();
    }

    container.appendChild(viewContainer);
}
