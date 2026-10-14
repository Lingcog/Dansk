import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderLaegeWorkshopStoryView(container, navigateFn) {
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
    backBtn.onclick = () => navigateFn('dialoger_udtale');
    topBar.appendChild(backBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'back-btn';
    resetBtn.style.color = '#ff5e5b';
    resetBtn.innerHTML = `↻ Start forfra`;
    resetBtn.onclick = () => {
        if (confirm('Er du sikker på, at du vil starte dialogen forfra?')) {
            localStorage.removeItem('story_laege_workshop_progress');
            currentStepIndex = 0;
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
    mainTitle.textContent = '💬 Dialoger: En ansat ringer til lægen';
    mainTitle.style.marginBottom = '0.4rem';
    headerDiv.appendChild(mainTitle);

    const subTitle = document.createElement('p');
    subTitle.className = 'subtitle';
    subTitle.style.margin = '0 auto';
    subTitle.style.maxWidth = '700px';
    subTitle.textContent = 'Serie: Sygdom & job (Del 1 af 4) • Træning i udtale og lenisering af D, R og G uden puslespil';
    headerDiv.appendChild(subTitle);

    viewContainer.appendChild(headerDiv);

    // Teacher Material Download Box
    const downloadBox = document.createElement('div');
    downloadBox.className = 'teacher-download-box';
    downloadBox.style.maxWidth = '750px';
    downloadBox.style.margin = '0 auto 1.5rem auto';
    downloadBox.style.background = 'rgba(255, 255, 255, 0.05)';
    downloadBox.style.border = '1px solid rgba(255, 204, 0, 0.3)';
    downloadBox.style.borderRadius = '14px';
    downloadBox.style.padding = '0.9rem 1.4rem';
    downloadBox.style.display = 'flex';
    downloadBox.style.alignItems = 'center';
    downloadBox.style.justifyContent = 'space-between';
    downloadBox.style.flexWrap = 'wrap';
    downloadBox.style.gap = '0.8rem';

    const downloadInfo = document.createElement('div');
    downloadInfo.style.display = 'flex';
    downloadInfo.style.alignItems = 'center';
    downloadInfo.style.gap = '0.5rem';
    downloadInfo.style.color = '#ffcc00';
    downloadInfo.style.fontWeight = 'bold';
    downloadInfo.style.fontSize = '0.95rem';
    downloadInfo.innerHTML = '<span>📥</span> <span>Print-ark til undervisere (Peer Listening):</span>';

    const downloadLinks = document.createElement('div');
    downloadLinks.style.display = 'flex';
    downloadLinks.style.gap = '0.6rem';
    downloadLinks.style.flexWrap = 'wrap';

    downloadLinks.innerHTML = `
        <a href="${baseUrl}docs/Makker_Lytteark_Samtale1_Dansk.docx" download class="back-btn" style="text-decoration: none; font-size: 0.85rem; padding: 0.35rem 0.8rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <span>📄</span> Hent Word (Dansk)
        </a>
        <a href="${baseUrl}docs/Makker_Lytteark_Samtale1_English.docx" download class="back-btn" style="text-decoration: none; font-size: 0.85rem; padding: 0.35rem 0.8rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <span>📄</span> Hent Word (Engelsk)
        </a>
    `;

    downloadBox.appendChild(downloadInfo);
    downloadBox.appendChild(downloadLinks);
    viewContainer.appendChild(downloadBox);

    let userName = localStorage.getItem('story_username') || '';

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    // --- DIALOGUE DATA (7 Replikskifter - MED fonetiktips, UDEN puslespil) ---
    let storyData = [];

    function initStoryData(uName) {
        const u = uName || 'Peter';
        storyData = [
            // --- NARRATIVE INTRO ---
            { 
                type: 'narrative', 
                text: '📍 Scene: Mandag morgen. Du er vågnet med høj feber og ringer til din læge for at få en vurdering og rådgivning.' 
            },

            // --- REPLIKSKIFTE 1 ---
            { 
                type: 'user_action',
                stepNum: 1,
                fonetikTip: 'Stumt g i "jeg" [ja] • Blødt d i "hedder" • Vokalisk r i "hedder"',
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
                fonetikTip: 'Stumt g i "jeg" [ja] og "virkelig" • Hårdt r i "ringer" • Vokalisk r i "har"',
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
                fonetikTip: 'Vokalisk r i "feber", "har" og "muskelsmerter" • Blødt d i "hovedpine"',
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
                fonetikTip: 'Vokalisk r i "gør" • Stumt g i "jeg" [ja]',
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
                fonetikTip: 'Hårdt g og hårdt r i "grønt" • Vokalisk r i "der" og "er"',
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
                fonetikTip: 'Hårdt r i "træthed" • Blødt d i "træthed" • Stumt d i "ondt" (-nd)',
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
                fonetikTip: 'Stumt g i "jeg" [ja] • Vokalisk r i "gøre"',
                pronunciation: {
                    target: 'Tak, det vil jeg gøre.',
                    focus: ['det', 'jeg', 'gøre']
                }
            },

            // --- AFSLUTNING ---
            { 
                type: 'npc', 
                name: 'Læge', 
                text: 'Rigtig god bedring. Ring endelig igen, hvis det bliver værre!' 
            },
            { 
                type: 'narrative', 
                text: '🏆 Flot klaret! Du har gennemført samtalen med lægen i 7 replikskifter og trænet udtale af D, R og G!' 
            }
        ];
    }

    // --- State Management ---
    let currentStepIndex = parseInt(localStorage.getItem('story_laege_workshop_progress') || '0', 10);
    const appState = {
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
        p.textContent = 'Serie: Sygdom & job (Del 1 af 4) • Trinvis samtaletræning i 7 replikskifter: Lyt til udtalen, træn med mikrofonen og lær lenisering af D, R og G.';
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
                bubble.style.cursor = 'pointer';
                bubble.title = 'Tryk for at høre lægens replik';
                bubble.innerHTML = `
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.8rem;">
                        <div><strong>${step.name}:</strong> ${step.text}</div>
                        <button class="sound-icon-btn" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; padding: 0; line-height: 1; flex-shrink: 0;" title="Hør oplæsning">🔊</button>
                    </div>
                `;
                bubble.onclick = () => speakDanish(step.text);
                chatContainer.appendChild(bubble);
            }
            else if (step.type === 'user_action') {
                if (i < currentStepIndex) {
                    // Past completed user action
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble user past';
                    bubble.style.cursor = 'pointer';
                    bubble.title = 'Tryk for at høre din replik igen';
                    bubble.innerHTML = `
                        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.8rem;">
                            <div><strong>${userName}:</strong> ${step.pronunciation.target}</div>
                            <button class="sound-icon-btn" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; padding: 0; line-height: 1; flex-shrink: 0;" title="Hør oplæsning">🔊</button>
                        </div>
                    `;
                    bubble.onclick = () => speakDanish(step.pronunciation.target);
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

            const backToDialogerBtn = document.createElement('button');
            backToDialogerBtn.className = 'gemini-btn';
            backToDialogerBtn.textContent = '← Tilbage til Dialoger';
            backToDialogerBtn.onclick = () => navigateFn('dialoger_udtale');

            const restartBtn = document.createElement('button');
            restartBtn.className = 'back-btn';
            restartBtn.textContent = '↻ Prøv samtalen igen';
            restartBtn.onclick = () => {
                localStorage.removeItem('story_laege_workshop_progress');
                currentStepIndex = 0;
                renderStory();
            };

            finishCard.appendChild(backToDialogerBtn);
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

        // Pronunciation Phase (Direkte udtaletræning - intet puslespil)
        const pronBox = document.createElement('div');
        pronBox.className = 'pron-box';
        renderPronunciation(pronBox, step);
        actionBox.appendChild(pronBox);

        chatContainer.appendChild(actionBox);
    }

    // --- PRONUNCIATION PHASE (Med fonetiktips) ---
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
        pronCont.style.marginTop = '0.4rem';

        // Phonetic tip banner
        if (step.fonetikTip) {
            const tipBox = document.createElement('div');
            tipBox.style.background = 'rgba(255, 204, 0, 0.12)';
            tipBox.style.border = '1px solid rgba(255, 204, 0, 0.3)';
            tipBox.style.borderRadius = '10px';
            tipBox.style.padding = '0.6rem 1rem';
            tipBox.style.color = '#ffcc00';
            tipBox.style.fontSize = '0.95rem';
            tipBox.style.textAlign = 'center';
            tipBox.style.width = '100%';
            tipBox.style.maxWidth = '600px';
            tipBox.innerHTML = `💡 <strong>Fokus:</strong> ${step.fonetikTip}`;
            pronCont.appendChild(tipBox);
        }
        
        // Target sentence display
        const sentenceDisplay = document.createElement('div');
        sentenceDisplay.className = 'udtale-sentence';
        sentenceDisplay.style.fontSize = '1.4rem';
        sentenceDisplay.style.fontWeight = 'bold';
        sentenceDisplay.style.textAlign = 'center';
        sentenceDisplay.style.margin = '0.5rem 0';
        sentenceDisplay.style.lineHeight = '1.6';
        
        const targetWords = step.pronunciation.target.split(' ');
        
        sentenceDisplay.innerHTML = targetWords.map(w => {
            const clean = w.toLowerCase().replace(/[.,!?:]/g, '');
            const isFocus = step.pronunciation.focus.some(f => clean.includes(f.toLowerCase()));
            return `<span class="udtale-word ${isFocus ? 'target-focus' : ''}" title="${isFocus ? 'Fokusord for udtale' : ''}">${w}</span>`;
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
            localStorage.setItem('story_laege_workshop_progress', currentStepIndex);
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
                        statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">Næsten! Prøv igen og fokuser på de markerede ord.</span>${spokenHTML}`;
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
