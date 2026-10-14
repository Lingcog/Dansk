import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderChefWorkshopStoryView(container, navigateFn) {
    const isEn = getLang() === 'en';
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
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('dialoger_sygdom_job');
    topBar.appendChild(backBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'back-btn';
    resetBtn.style.color = '#ff5e5b';
    resetBtn.innerHTML = isEn ? `↻ Start over` : `↻ Start forfra`;
    resetBtn.onclick = () => {
        if (confirm(isEn ? 'Are you sure you want to start the dialogue over?' : 'Er du sikker på, at du vil starte dialogen forfra?')) {
            localStorage.removeItem('story_chef_workshop_progress');
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
    mainTitle.textContent = isEn ? '💬 Dialogues: The employee calls the boss' : '💬 Dialoger: Den ansatte ringer til chefen';
    mainTitle.style.marginBottom = '0.4rem';
    headerDiv.appendChild(mainTitle);

    const subTitle = document.createElement('p');
    subTitle.className = 'subtitle';
    subTitle.style.margin = '0 auto';
    subTitle.style.maxWidth = '700px';
    subTitle.textContent = isEn
        ? 'Series: Illness & Job (Part 2 of 4) • Pronunciation and lenition training for D, R, and G without puzzles'
        : 'Serie: Sygdom & job (Del 2 af 4) • Træning i udtale og lenisering af D, R og G uden puslespil';
    headerDiv.appendChild(subTitle);

    viewContainer.appendChild(headerDiv);

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
                text: '📍 Scene: Mandag formiddag. Du har talt med lægen og ringer nu til din chef for at melde dig syg i dag.',
                textEn: '📍 Scene: Monday morning. You have spoken with the doctor and are now calling your boss to report in sick today.'
            },

            // --- REPLIKSKIFTE 1 ---
            { 
                type: 'user_action',
                stepNum: 1,
                fonetikTip: 'Vokalisk r i "er"',
                fonetikTipEn: 'Vocalic \'r\' in "er"',
                translationEn: `Hi boss, it's ${u}.`,
                pronunciation: {
                    target: `Hej chef, det er ${u}.`,
                    focus: ['det', 'er']
                }
            },
            { 
                type: 'npc', 
                name: isEn ? 'Boss' : 'Chef', 
                text: `Hej ${u}, hvordan går det?`,
                translationEn: `Hi ${u}, how are you doing?`
            },

            // --- REPLIKSKIFTE 2 ---
            { 
                type: 'user_action',
                stepNum: 2,
                fonetikTip: 'Stumt g i "jeg" [ja] • Hårdt r i "ringer" • Stumt d i "melde"',
                fonetikTipEn: 'Silent \'g\' in "jeg" [ja] • Hard \'r\' in "ringer" • Silent \'d\' in "melde"',
                translationEn: 'I am calling to call in sick today.',
                pronunciation: {
                    target: 'Jeg ringer for at melde mig syg i dag.',
                    focus: ['jeg', 'ringer', 'melde']
                }
            },
            { 
                type: 'npc', 
                name: isEn ? 'Boss' : 'Chef', 
                text: 'Hej, det er jeg ked af at høre. Hvad er der galt?',
                translationEn: 'Hello, I\'m sorry to hear that. What is wrong?'
            },

            // --- REPLIKSKIFTE 3 ---
            { 
                type: 'user_action',
                stepNum: 3,
                fonetikTip: 'Vokalisk r i "har", "feber" og "muskelsmerter" • Blødt d i "hovedpine"',
                fonetikTipEn: 'Vocalic \'r\' in "har", "feber", and "muskelsmerter" • Soft \'d\' in "hovedpine"',
                translationEn: 'I have a high fever, a headache, and muscle aches.',
                pronunciation: {
                    target: 'Jeg har høj feber, hovedpine og muskelsmerter.',
                    focus: ['har', 'feber', 'muskelsmerter', 'hovedpine']
                }
            },
            { 
                type: 'npc', 
                name: isEn ? 'Boss' : 'Chef', 
                text: 'Det lyder alvorligt. Har du været til lægen?',
                translationEn: 'That sounds serious. Have you seen the doctor?'
            },

            // --- REPLIKSKIFTE 4 ---
            { 
                type: 'user_action',
                stepNum: 4,
                fonetikTip: 'Stumt g i "lægen" • Blødt g i "ringede" • Stumt g i "morges"',
                fonetikTipEn: 'Silent \'g\' in "lægen" and "morges" • Soft \'g\' in "ringede"',
                translationEn: 'Yes, I called the doctor this morning.',
                pronunciation: {
                    target: 'Ja, jeg ringede til lægen i morges.',
                    focus: ['lægen', 'ringede', 'morges']
                }
            },
            { 
                type: 'npc', 
                name: isEn ? 'Boss' : 'Chef', 
                text: 'Hvad sagde lægen?',
                translationEn: 'What did the doctor say?'
            },

            // --- REPLIKSKIFTE 5 ---
            { 
                type: 'user_action',
                stepNum: 5,
                fonetikTip: 'Stumt g i "Lægen", "sagde" og stumt d i "sagde"',
                fonetikTipEn: 'Silent \'g\' in "lægen" and "sagde" • Silent \'d\' in "sagde"',
                translationEn: 'The doctor said I probably have the flu.',
                pronunciation: {
                    target: 'Lægen sagde, at jeg nok har influenza.',
                    focus: ['lægen', 'sagde']
                }
            },
            { 
                type: 'npc', 
                name: isEn ? 'Boss' : 'Chef', 
                text: 'Det er godt, at du ved hvad du fejler. Har du fået noget medicin?',
                translationEn: 'It\'s good that you know what\'s wrong. Have you received any medicine?'
            },

            // --- REPLIKSKIFTE 6 ---
            { 
                type: 'user_action',
                stepNum: 6,
                fonetikTip: 'Stumt g i "lægen" • Stumt g i "noget" • Vokalisk r i "feberen" og "smerten"',
                fonetikTipEn: 'Silent \'g\' in "lægen" and "noget" • Vocalic \'r\' in "feberen" and "smerten"',
                translationEn: 'Yes, the doctor gave me something for the fever and pain.',
                pronunciation: {
                    target: 'Ja, lægen gav mig noget mod feberen og smerten.',
                    focus: ['lægen', 'noget', 'feberen', 'smerten']
                }
            },
            { 
                type: 'npc', 
                name: isEn ? 'Boss' : 'Chef', 
                text: 'Det lyder som en hård omgang. Bliv hjemme og pas godt på dig selv.',
                translationEn: 'That sounds like a tough bout. Stay home and take good care of yourself.'
            },

            // --- REPLIKSKIFTE 7 ---
            { 
                type: 'user_action',
                stepNum: 7,
                fonetikTip: 'Ng-lyd i "ringer" • Hårdt g i "igen" • Stumt g i "morgen" • Blødt d i "-et" i "opdateret"',
                fonetikTipEn: 'Ng-sound in "ringer" • Hard \'g\' in "igen" • Silent \'g\' in "morgen" • Soft \'d\' in "-et" in "opdateret"',
                translationEn: 'Thank you, I will call you again tomorrow and keep you updated.',
                pronunciation: {
                    target: 'Tak, jeg ringer til dig igen i morgen og holder dig opdateret.',
                    focus: ['ringer', 'igen', 'morgen', 'opdateret']
                }
            },

            // --- AFSLUTNING ---
            { 
                type: 'npc', 
                name: isEn ? 'Boss' : 'Chef', 
                text: 'Alletiders. God bedring, og lad mig vide, hvis du har brug for noget.',
                translationEn: 'Great. Get well soon, and let me know if you need anything.'
            },
            { 
                type: 'narrative', 
                text: '🏆 Flot klaret! Du har gennemført samtalen med chefen i 7 replikskifter og trænet udtalen af D, R og G!',
                textEn: '🏆 Well done! You have completed the phone call with your boss in 7 exchanges and practiced the pronunciation of D, R, and G!'
            }
        ];
    }

    // --- State Management ---
    let currentStepIndex = parseInt(localStorage.getItem('story_chef_workshop_progress') || '0', 10);
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
        h1.textContent = isEn ? 'The employee calls the boss' : 'Den ansatte ringer til chefen';
        h1.style.marginBottom = '1rem';

        const p = document.createElement('p');
        p.textContent = isEn
            ? 'Series: Illness & Job (Part 2 of 4) • Step-by-step dialogue practice in 7 exchanges: Listen to pronunciation, practice with the microphone, and learn lenition of D, R, and G.'
            : 'Serie: Sygdom & job (Del 2 af 4) • Trinvis samtaletræning i 7 replikskifter: Lyt til udtalen, træn med mikrofonen og lær lenisering af D, R og G uden puslespil.';
        p.style.marginBottom = '1.8rem';
        p.style.color = 'var(--text-muted)';
        p.style.lineHeight = '1.6';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = isEn ? 'Enter your first name...' : 'Indtast dit fornavn...';
        input.className = 'story-input';
        if (userName) input.value = userName;

        const btn = document.createElement('button');
        btn.className = 'gemini-btn';
        btn.textContent = isEn ? 'Start Conversation ➔' : 'Start Samtalen ➔';
        btn.style.marginTop = '1.5rem';
        btn.onclick = () => {
            const val = input.value.trim();
            userName = val.length > 0 ? val : (isEn ? 'Student' : 'Kursist');
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

        while (currentStepIndex < storyData.length && storyData[currentStepIndex].type !== 'user_action') {
            if (currentStepIndex === storyData.length - 1) break;
            currentStepIndex++;
        }

        for (let i = 0; i <= currentStepIndex; i++) {
            if (i >= storyData.length) break;
            const step = storyData[i];
            
            if (step.type === 'narrative') {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble narrative';
                bubble.textContent = (isEn && step.textEn) ? step.textEn : step.text;
                chatContainer.appendChild(bubble);
            } 
            else if (step.type === 'npc') {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble npc';
                bubble.style.cursor = 'pointer';
                bubble.title = isEn ? "Click to hear the boss's line" : 'Tryk for at høre chefens replik';
                bubble.innerHTML = `
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.8rem;">
                        <div>
                            <strong>${step.name}:</strong> ${step.text}
                            ${step.translationEn ? `<div class="sub-translation" style="font-size: 0.95rem; font-style: italic; opacity: 0.85; margin-top: 0.25rem; color: #cbd5e1;">${step.translationEn}</div>` : ''}
                        </div>
                        <button class="sound-icon-btn" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; padding: 0; line-height: 1; flex-shrink: 0;" title="${isEn ? 'Listen' : 'Hør oplæsning'}">🔊</button>
                    </div>
                `;
                bubble.onclick = () => speakDanish(step.text);
                chatContainer.appendChild(bubble);
            }
            else if (step.type === 'user_action') {
                if (i < currentStepIndex) {
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble user past';
                    bubble.style.cursor = 'pointer';
                    bubble.title = isEn ? 'Click to hear your line again' : 'Tryk for at høre din replik igen';
                    bubble.innerHTML = `
                        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.8rem;">
                            <div>
                                <strong>${userName}:</strong> ${step.pronunciation.target}
                                ${step.translationEn ? `<div class="sub-translation" style="font-size: 0.95rem; font-style: italic; opacity: 0.85; margin-top: 0.25rem; color: #e2e8f0;">${step.translationEn}</div>` : ''}
                            </div>
                            <button class="sound-icon-btn" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; padding: 0; line-height: 1; flex-shrink: 0;" title="${isEn ? 'Listen' : 'Hør oplæsning'}">🔊</button>
                        </div>
                    `;
                    bubble.onclick = () => speakDanish(step.pronunciation.target);
                    chatContainer.appendChild(bubble);
                } else {
                    renderCurrentAction(chatContainer, step);
                }
            }
        }

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
            backToDialogerBtn.textContent = isEn ? '← Back to Illness & Job' : '← Tilbage til Sygdom & job';
            backToDialogerBtn.onclick = () => navigateFn('dialoger_sygdom_job');

            const restartBtn = document.createElement('button');
            restartBtn.className = 'back-btn';
            restartBtn.textContent = isEn ? '↻ Try conversation again' : '↻ Prøv samtalen igen';
            restartBtn.onclick = () => {
                localStorage.removeItem('story_chef_workshop_progress');
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
            stepBadge.textContent = isEn ? `Exchange ${step.stepNum} of 7` : `Replikskifte ${step.stepNum} af 7`;
            actionBox.appendChild(stepBadge);
        }

        const pronBox = document.createElement('div');
        pronBox.className = 'pron-box';
        renderPronunciation(pronBox, step);
        actionBox.appendChild(pronBox);

        chatContainer.appendChild(actionBox);
    }

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

        const activeTip = (isEn && step.fonetikTipEn) ? step.fonetikTipEn : step.fonetikTip;
        if (activeTip) {
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
            tipBox.innerHTML = `💡 <strong>${isEn ? 'Focus:' : 'Fokus:'}</strong> ${activeTip}`;
            pronCont.appendChild(tipBox);
        }
        
        const sentenceDisplay = document.createElement('div');
        sentenceDisplay.className = 'udtale-sentence';
        sentenceDisplay.style.fontSize = '1.4rem';
        sentenceDisplay.style.fontWeight = 'bold';
        sentenceDisplay.style.textAlign = 'center';
        sentenceDisplay.style.margin = '0.5rem 0 0.2rem 0';
        sentenceDisplay.style.lineHeight = '1.6';
        
        const targetWords = step.pronunciation.target.split(' ');
        
        sentenceDisplay.innerHTML = targetWords.map(w => {
            const clean = w.toLowerCase().replace(/[.,!?:]/g, '');
            const isFocus = step.pronunciation.focus.some(f => clean.includes(f.toLowerCase()));
            return `<span class="udtale-word ${isFocus ? 'target-focus' : ''}" title="${isFocus ? (isEn ? 'Focus word for pronunciation' : 'Fokusord for udtale') : ''}">${w}</span>`;
        }).join(' ');
        pronCont.appendChild(sentenceDisplay);

        // English translation below target sentence
        if (step.translationEn) {
            const transDisplay = document.createElement('div');
            transDisplay.style.fontSize = '1.05rem';
            transDisplay.style.fontStyle = 'italic';
            transDisplay.style.color = '#94a3b8';
            transDisplay.style.textAlign = 'center';
            transDisplay.style.marginBottom = '0.5rem';
            transDisplay.textContent = `"${step.translationEn}"`;
            pronCont.appendChild(transDisplay);
        }

        const audioRow = document.createElement('div');
        audioRow.style.display = 'flex';
        audioRow.style.gap = '1rem';
        audioRow.style.alignItems = 'center';

        const listenBtn = document.createElement('button');
        listenBtn.className = 'back-btn';
        listenBtn.style.fontSize = '0.95rem';
        listenBtn.style.padding = '0.4rem 1rem';
        listenBtn.innerHTML = `🔊 ${isEn ? 'Listen to pronunciation' : 'Hør udtale'}`;
        listenBtn.onclick = () => speakDanish(step.pronunciation.target);
        audioRow.appendChild(listenBtn);
        pronCont.appendChild(audioRow);

        const progressContainer = document.createElement('div');
        progressContainer.style.width = '100%';
        progressContainer.style.maxWidth = '400px';
        progressContainer.style.display = 'none';
        progressContainer.style.alignItems = 'center';
        progressContainer.style.gap = '1rem';
        progressContainer.style.margin = '0.5rem 0';
        
        const label = document.createElement('span');
        label.textContent = isEn ? 'Mastery:' : 'Mestring:';
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
        statusText.textContent = isEn ? 'Press the microphone and speak...' : 'Tryk på mikrofonen og tal...';
        pronCont.appendChild(statusText);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = isEn ? 'Next exchange ➔' : 'Videre i samtalen ➔';
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            currentStepIndex++;
            localStorage.setItem('story_chef_workshop_progress', currentStepIndex);
            appState.pronunciationFails = 0;
            renderStory();
        };
        pronCont.appendChild(nextBtn);

        const skipBtn = document.createElement('button');
        skipBtn.className = 'back-btn';
        skipBtn.style.fontSize = '0.85rem';
        skipBtn.textContent = isEn ? 'Skip (only in case of microphone issues)' : 'Spring over (kun ved mikrofonfejl)';
        skipBtn.onclick = nextBtn.onclick;
        pronCont.appendChild(skipBtn);

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            statusText.textContent = isEn 
                ? 'Browser does not support microphone. Click "Skip" to proceed.' 
                : 'Browser understøtter ikke mikrofon. Tryk "Spring over" for at fortsætte.';
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
                    statusText.innerHTML = isEn ? 'Listening... Speak now!' : 'Lytter... Tal nu!';
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
                statusText.innerHTML = isEn ? 'Processing pronunciation...' : 'Behandler udtale...';
                evaluatePronunciation(spoken);
            };

            recognition.onerror = () => {
                micBtn.classList.remove('listening');
                isListening = false;
                statusText.innerHTML = isEn ? 'Could not capture speech. Please try again!' : 'Kunne ikke opfatte tale. Prøv igen!';
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
                    const spokenHTML = `<div style="margin-top: 0.8rem; padding: 0.8rem 1.2rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; font-size: 1.05rem; color: #ffffff; text-align: center;">${isEn ? 'You said:' : 'Du sagde:'}<br/><span style="color: #ffcc00; font-size: 1.2rem; font-weight: bold;">"${spoken}"</span></div>`;
                    
                    if (score >= 60) {
                        progressBar.style.background = '#4caf50';
                        statusText.innerHTML = `<span style="color:#4caf50; font-weight: bold;">${isEn ? '✓ Great pronunciation!' : '✓ Flot udtalt!'}</span>${spokenHTML}`;
                        micBtn.style.display = 'none';
                        skipBtn.style.display = 'none';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        progressBar.style.background = '#ff5e5b';
                        appState.pronunciationFails++;
                        statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">${isEn ? 'Almost! Try again and focus on the highlighted words.' : 'Næsten! Prøv igen og fokuser på de markerede ord.'}</span>${spokenHTML}`;
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
