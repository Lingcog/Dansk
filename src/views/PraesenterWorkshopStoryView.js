import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderPraesenterWorkshopStoryView(container, navigateFn) {
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

    const isEn = getLang() === 'en';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('dialoger_udtale');
    topBar.appendChild(backBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'back-btn';
    resetBtn.style.color = '#ff5e5b';
    resetBtn.innerHTML = isEn ? `↻ Start over` : `↻ Start forfra`;
    resetBtn.onclick = () => {
        if (confirm(isEn ? 'Are you sure you want to start the dialogue over?' : 'Er du sikker på, at du vil starte dialogen forfra?')) {
            localStorage.removeItem('story_praesenter_workshop_progress');
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
    mainTitle.textContent = isEn ? '💬 Dialogues: Introduce yourself to someone' : '💬 Dialoger: Præsenter dig for en anden';
    mainTitle.style.marginBottom = '0.4rem';
    headerDiv.appendChild(mainTitle);

    const subTitle = document.createElement('p');
    subTitle.className = 'subtitle';
    subTitle.style.margin = '0 auto';
    subTitle.style.maxWidth = '700px';
    subTitle.textContent = isEn
        ? 'Everyday conversation at language school • Pronunciation and lenition training for D, R, and G without puzzles'
        : 'Hverdagssamtale på sprogskolen • Træning i udtale og lenisering af D, R og G uden puslespil';
    headerDiv.appendChild(subTitle);

    viewContainer.appendChild(headerDiv);

    let userName = localStorage.getItem('story_username') || '';
    let userCountry = localStorage.getItem('story_user_country') || 'Spanien';

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    // --- DIALOGUE DATA (5 Replikskifter - MED fonetiktips, UDEN puslespil) ---
    let storyData = [];

    function initStoryData(uName, uCountry) {
        const u = uName || 'Peter';
        const c = uCountry || 'Spanien';

        storyData = [
            // --- NARRATIVE INTRO ---
            { 
                type: 'narrative', 
                text: '📍 Scene: Sprogskolen. Et lyst klasselokale. Du sidder ved et bord. Mateo, en ny kursist, sætter sig ved siden af dig.',
                textEn: '📍 Scene: The language school. A bright classroom. You are sitting at a table. Mateo, a new student, sits down next to you.'
            },

            // --- REPLIKSKIFTE 1 ---
            { 
                type: 'user_action',
                stepNum: 1,
                fonetikTip: 'Stumt g i "jeg" [ja] • Blødt d i "hedder" • Stumt d i "hvad"',
                fonetikTipEn: 'Silent \'g\' in "jeg" [ja] • Soft \'d\' in "hedder" • Silent \'d\' in "hvad"',
                translationEn: `Hi, my name is ${u}. What is your name?`,
                pronunciation: {
                    target: `Hej, jeg hedder ${u}. Hvad hedder du?`,
                    focus: ['jeg', 'hedder', 'hvad']
                }
            },
            { 
                type: 'npc', 
                name: 'Mateo', 
                text: `Hej ${u}. Jeg hedder Mateo. Jeg er ny her på holdet.`,
                translationEn: `Hi ${u}. My name is Mateo. I'm new here in the class.`
            },

            // --- REPLIKSKIFTE 2 ---
            { 
                type: 'user_action',
                stepNum: 2,
                fonetikTip: 'Vokalisk r i "hvor" og "kommer" • Hårdt r i "fra"',
                fonetikTipEn: 'Vocalic \'r\' in "hvor" and "kommer" • Hard \'r\' in "fra"',
                translationEn: 'Welcome! Where do you come from?',
                pronunciation: {
                    target: 'Velkommen til! Hvor kommer du fra?',
                    focus: ['velkommen', 'hvor', 'kommer', 'fra']
                }
            },
            { 
                type: 'npc', 
                name: 'Mateo', 
                text: 'Jeg kommer fra Spanien. Og hvad med dig? Hvor kommer du fra?',
                translationEn: 'I come from Spain. And what about you? Where are you from?'
            },

            // --- REPLIKSKIFTE 3 ---
            { 
                type: 'user_action',
                stepNum: 3,
                fonetikTip: 'Stumt g i "jeg" [ja] • Vokalisk r i "kommer" • Hårdt r i "fra"',
                fonetikTipEn: 'Silent \'g\' in "jeg" [ja] • Vocalic \'r\' in "kommer" • Hard \'r\' in "fra"',
                translationEn: `I come from ${c}.`,
                pronunciation: {
                    target: `Jeg kommer fra ${c}.`,
                    focus: ['jeg', 'kommer', 'fra']
                }
            },
            { 
                type: 'npc', 
                name: 'Mateo', 
                text: 'Spændende! Hvor længe har du boet her i Danmark?',
                translationEn: 'Exciting! How long have you lived here in Denmark?'
            },

            // --- REPLIKSKIFTE 4 ---
            { 
                type: 'user_action',
                stepNum: 4,
                fonetikTip: 'Vokalisk r i "har", "her" og "år" • Blødt d i "boet"',
                fonetikTipEn: 'Vocalic \'r\' in "har", "her", and "år" • Soft \'d\' in "boet"',
                translationEn: 'I have lived here for a year.',
                pronunciation: {
                    target: 'Jeg har boet her i et år.',
                    focus: ['har', 'boet', 'her', 'år']
                }
            },
            { 
                type: 'npc', 
                name: 'Mateo', 
                text: 'Jeg har kun boet her i syv måneder. Det er hyggeligt at hilse på dig!',
                translationEn: 'I have only lived here for seven months. It\'s nice to meet you!'
            },

            // --- REPLIKSKIFTE 5 ---
            { 
                type: 'user_action',
                stepNum: 5,
                fonetikTip: 'Stumt g i "lige" • Blødt d i "måde" • Hårdt r i "ses"',
                fonetikTipEn: 'Silent \'g\' in "lige" • Soft \'d\' in "måde" • Hard \'r\' in "ses"',
                translationEn: 'Likewise! See you during the break.',
                pronunciation: {
                    target: 'I lige måde! Vi ses i pausen.',
                    focus: ['lige', 'måde', 'ses']
                }
            },

            // --- AFSLUTNING ---
            { 
                type: 'npc', 
                name: 'Mateo', 
                text: 'Ja, det gør vi. Hav en rigtig god time!',
                translationEn: 'Yes, see you then. Have a really good class!'
            },
            { 
                type: 'narrative', 
                text: '🏆 Flot klaret! Du har præsenteret dig for en anden kursist og trænet udtale af D, R og G!',
                textEn: '🏆 Well done! You have introduced yourself to another student and practiced the pronunciation of D, R, and G!'
            }
        ];
    }

    // --- State Management ---
    let currentStepIndex = parseInt(localStorage.getItem('story_praesenter_workshop_progress') || '0', 10);
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
        h1.textContent = isEn ? 'Introduce yourself to someone' : 'Præsenter dig for en anden';
        h1.style.marginBottom = '1rem';

        const p = document.createElement('p');
        p.textContent = isEn
            ? 'Step-by-step conversation practice at language school (5 exchanges): Meet your new classmate Mateo. Listen to the pronunciation, practice with the microphone, and learn lenition of D, R, and G without puzzles.'
            : 'Trinvis samtaletræning på sprogskolen (5 replikskifter): Mød din nye holdkammerat Mateo. Lyt til udtalen, træn med mikrofonen og lær lenisering af D, R og G uden puslespil.';
        p.style.marginBottom = '1.8rem';
        p.style.color = 'var(--text-muted)';
        p.style.lineHeight = '1.6';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = isEn ? 'Enter your first name...' : 'Indtast dit fornavn...';
        input.className = 'story-input';
        if (userName) input.value = userName;

        const countryInput = document.createElement('input');
        countryInput.type = 'text';
        countryInput.placeholder = isEn ? 'Which country are you from? (e.g. Spain, Poland, Ukraine)' : 'Hvilket land kommer du fra? (f.eks. Spanien, Polen, Ukraine)';
        countryInput.className = 'story-input';
        countryInput.style.marginTop = '0.8rem';
        if (userCountry) countryInput.value = userCountry;

        const btn = document.createElement('button');
        btn.className = 'gemini-btn';
        btn.textContent = isEn ? 'Start Conversation ➔' : 'Start Samtalen ➔';
        btn.style.marginTop = '1.5rem';
        btn.onclick = () => {
            const val = input.value.trim();
            userName = val.length > 0 ? val : (isEn ? 'Student' : 'Kursist');
            localStorage.setItem('story_username', userName);

            const cVal = countryInput.value.trim();
            userCountry = cVal.length > 0 ? cVal : (isEn ? 'Spain' : 'Spanien');
            localStorage.setItem('story_user_country', userCountry);

            initStoryData(userName, userCountry);
            renderStory();
        };

        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(input);
        card.appendChild(document.createElement('br'));
        card.appendChild(countryInput);
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
                bubble.textContent = isEn && step.textEn ? step.textEn : step.text;
                chatContainer.appendChild(bubble);
            } 
            else if (step.type === 'npc') {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble npc';
                bubble.style.cursor = 'pointer';
                bubble.title = isEn ? "Click to hear Mateo's line" : 'Tryk for at høre Mateos replik';
                const translationHtml = step.translationEn ? `<div style="font-size: 0.92rem; color: #a0aec0; margin-top: 0.35rem; font-style: italic;">"${step.translationEn}"</div>` : '';
                bubble.innerHTML = `
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.8rem;">
                        <div>
                            <div><strong>${step.name}:</strong> ${step.text}</div>
                            ${translationHtml}
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
                    const translationHtml = step.translationEn ? `<div style="font-size: 0.92rem; color: rgba(255,255,255,0.7); margin-top: 0.35rem; font-style: italic;">"${step.translationEn}"</div>` : '';
                    bubble.innerHTML = `
                        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.8rem;">
                            <div>
                                <div><strong>${userName}:</strong> ${step.pronunciation.target}</div>
                                ${translationHtml}
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
            backToDialogerBtn.textContent = isEn ? '← Back to Dialogues' : '← Tilbage til Dialoger';
            backToDialogerBtn.onclick = () => navigateFn('dialoger_udtale');

            const restartBtn = document.createElement('button');
            restartBtn.className = 'back-btn';
            restartBtn.textContent = isEn ? '↻ Try the conversation again' : '↻ Prøv samtalen igen';
            restartBtn.onclick = () => {
                localStorage.removeItem('story_praesenter_workshop_progress');
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
        
        // Progress badge (Replikskifte X af 5)
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
            stepBadge.textContent = isEn ? `Exchange ${step.stepNum} of 5` : `Replikskifte ${step.stepNum} af 5`;
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
            const tipText = isEn && step.fonetikTipEn ? step.fonetikTipEn : step.fonetikTip;
            const focusLabel = isEn ? 'Focus:' : 'Fokus:';
            tipBox.innerHTML = `💡 <strong>${focusLabel}</strong> ${tipText}`;
            pronCont.appendChild(tipBox);
        }
        
        // Target sentence display
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
            const focusTitle = isEn ? 'Focus word for pronunciation' : 'Fokusord for udtale';
            return `<span class="udtale-word ${isFocus ? 'target-focus' : ''}" title="${isFocus ? focusTitle : ''}">${w}</span>`;
        }).join(' ');
        pronCont.appendChild(sentenceDisplay);

        // English translation subtitle
        if (step.translationEn) {
            const transSubtitle = document.createElement('div');
            transSubtitle.style.fontSize = '1.05rem';
            transSubtitle.style.color = '#cbd5e1';
            transSubtitle.style.marginTop = '-0.2rem';
            transSubtitle.style.marginBottom = '0.6rem';
            transSubtitle.style.fontStyle = 'italic';
            transSubtitle.style.textAlign = 'center';
            transSubtitle.textContent = `"${step.translationEn}"`;
            pronCont.appendChild(transSubtitle);
        }

        // Audio listen button
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

        // Recording controls
        const micBtn = document.createElement('button');
        micBtn.className = 'mic-btn';
        micBtn.style.width = '70px';
        micBtn.style.height = '70px';
        micBtn.style.borderRadius = '50%';
        micBtn.style.fontSize = '1.8rem';
        micBtn.style.display = 'flex';
        micBtn.style.alignItems = 'center';
        micBtn.style.justifyContent = 'center';
        micBtn.style.cursor = 'pointer';
        micBtn.style.background = 'var(--primary-color, #ffcc00)';
        micBtn.style.border = 'none';
        micBtn.style.boxShadow = '0 4px 15px rgba(255, 204, 0, 0.4)';
        micBtn.innerHTML = '🎤';
        pronCont.appendChild(micBtn);
        
        const statusText = document.createElement('div');
        statusText.style.color = 'var(--text-muted)';
        statusText.style.fontSize = '1rem';
        statusText.textContent = isEn ? 'Press the microphone and speak...' : 'Tryk på mikrofonen og tal...';
        pronCont.appendChild(statusText);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = isEn ? 'Continue conversation ➔' : 'Videre i samtalen ➔';
        nextBtn.style.display = 'none';
        nextBtn.onclick = () => {
            currentStepIndex++;
            localStorage.setItem('story_praesenter_workshop_progress', currentStepIndex);
            appState.pronunciationFails = 0;
            renderStory();
        };
        pronCont.appendChild(nextBtn);

        const skipBtn = document.createElement('button');
        skipBtn.className = 'back-btn';
        skipBtn.style.fontSize = '0.85rem';
        skipBtn.textContent = isEn ? 'Skip (microphone issue only)' : 'Spring over (kun ved mikrofonfejl)';
        skipBtn.onclick = nextBtn.onclick;
        pronCont.appendChild(skipBtn);

        // Speech Logic using Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            statusText.textContent = isEn
                ? 'Browser does not support microphone. Press "Skip" to continue.'
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
                statusText.innerHTML = isEn ? `Evaluating pronunciation...` : `Behandler udtale...`;
                evaluatePronunciation(spoken);
            };

            recognition.onerror = () => {
                micBtn.classList.remove('listening');
                isListening = false;
                statusText.innerHTML = isEn ? 'Could not understand speech. Please try again!' : 'Kunne ikke opfatte tale. Prøv igen!';
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
                    const youSaid = isEn ? 'You said:' : 'Du sagde:';
                    const spokenHTML = `<div style="margin-top: 0.8rem; padding: 0.8rem 1.2rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; font-size: 1.05rem; color: #ffffff; text-align: center;">${youSaid}<br/><span style="color: #ffcc00; font-size: 1.2rem; font-weight: bold;">"${spoken}"</span></div>`;
                    
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
    initStoryData(userName, userCountry);
    if (userName) {
        renderStory();
    } else {
        renderStartScreen();
    }

    container.appendChild(viewContainer);
}
