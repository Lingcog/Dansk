import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderJobWorkshopStoryView(container, navigateFn) {
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
            localStorage.removeItem('story_workshop_progress');
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
    mainTitle.textContent = isEn ? '💬 Dialogues: Back to work after illness' : '💬 Dialoger: Tilbage på job efter sygdom';
    mainTitle.style.marginBottom = '0.4rem';
    headerDiv.appendChild(mainTitle);

    const subTitle = document.createElement('p');
    subTitle.className = 'subtitle';
    subTitle.style.margin = '0 auto';
    subTitle.style.maxWidth = '700px';
    subTitle.textContent = isEn
        ? 'Series: Illness & Job (Part 4 of 4) • Pronunciation and lenition training for D, R, and G without puzzles'
        : 'Serie: Sygdom & job (Del 4 af 4) • Træning i udtale og lenisering af D, R og G uden puslespil';
    headerDiv.appendChild(subTitle);

    viewContainer.appendChild(headerDiv);

    let userName = localStorage.getItem('story_username') || '';
    let currentStepIndex = parseInt(localStorage.getItem('story_workshop_progress') || '0', 10);
    
    let storyData = [];

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    function initStoryData() {
        const uName = userName || (isEn ? 'Student' : 'kursist');
        storyData = [
            // --- NARRATIVE INTRO ---
            { 
                type: 'narrative', 
                text: '📍 Scene: Mandag morgen ved kaffemaskinen på kontoret. Du er tilbage på arbejde efter at have været syg i en uge. Din afdelingsleder, Lene, møder dig.',
                textEn: '📍 Scene: Monday morning by the coffee machine at the office. You are back at work after being ill for a week. Your department manager, Lene, greets you.'
            },

            // --- REPLIKSKIFTE 1 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: `Godmorgen ${uName}! Hvor er det dejligt at se dig igen.`,
                translationEn: `Good morning ${uName}! How lovely to see you again.`
            },
            { 
                type: 'user_action',
                stepNum: 1,
                fonetikTip: 'Blødt d i "glad" • Vokalisk r i "være" • stumt g i "tilbage" og hårdt g i "igen"',
                fonetikTipEn: 'Soft \'d\' in "glad" • Vocalic \'r\' in "være" • Silent \'g\' in "tilbage" and hard \'g\' in "igen"',
                translationEn: 'Good morning Lene. I am glad to be back again.',
                pronunciation: {
                    target: 'Godmorgen Lene. Jeg er glad for at være tilbage igen.',
                    focus: ['godmorgen', 'glad', 'være', 'tilbage', 'igen']
                }
            },

            // --- REPLIKSKIFTE 2 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Hvordan har du det? Vil du have en kop varm kaffe?',
                translationEn: 'How are you feeling? Would you like a cup of hot coffee?'
            },
            { 
                type: 'user_action',
                stepNum: 2,
                fonetikTip: 'Stumt G som i "brug" • Stumt d i "koldt" (-ld) og "vand" (-nd)',
                fonetikTipEn: 'Silent \'g\' in "brug" • Silent \'d\' in "koldt" (-ld) and "vand" (-nd)',
                translationEn: 'I\'m doing well, but I need some cold water.',
                pronunciation: {
                    target: 'Det går godt, men jeg har brug for koldt vand.',
                    focus: ['det', 'går', 'godt', 'brug', 'koldt', 'vand']
                }
            },

            // --- REPLIKSKIFTE 3 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Helt i orden. Er du helt frisk og rask nu?',
                translationEn: 'All right. Are you feeling completely fresh and healthy now?'
            },
            { 
                type: 'user_action',
                stepNum: 3,
                fonetikTip: 'Vokalisk r i "er" • Hårdt r i "frisk" og "rask"',
                fonetikTipEn: 'Vocalic \'r\' in "er" • Hard \'r\' in "frisk" and "rask"',
                translationEn: 'Yes, I am completely fresh and well now.',
                pronunciation: {
                    target: 'Ja, jeg er helt frisk og rask nu.',
                    focus: ['frisk', 'rask']
                }
            },

            // --- REPLIKSKIFTE 4 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Hvor godt at høre! Hvad sagde lægen til dig i fredags?',
                translationEn: 'So good to hear! What did the doctor tell you on Friday?'
            },
            { 
                type: 'user_action',
                stepNum: 4,
                fonetikTip: 'Stumt g i "Lægen", "tag" og "dage" • Hårdt r i "fri"',
                fonetikTipEn: 'Silent \'g\' in "lægen", "tag", and "dage" • Hard \'r\' in "fri"',
                translationEn: 'The doctor said: take a few days off.',
                pronunciation: {
                    target: 'Lægen sagde: tag fri et par dage.',
                    focus: ['lægen', 'tag', 'fri', 'par', 'dage']
                }
            },

            // --- REPLIKSKIFTE 5 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Det er fornuftigt. Gik du en tur i weekenden?',
                translationEn: 'That\'s sensible. Did you go for a walk over the weekend?'
            },
            { 
                type: 'user_action',
                stepNum: 5,
                fonetikTip: 'Stumt d i "gjorde" (-rde) • G som j-lyd i "gjorde" og stumt G i "jeg" [ja]',
                fonetikTipEn: 'Silent \'d\' in "gjorde" (-rde) • \'g\' as \'j\' sound in "gjorde" • Silent \'g\' in "jeg" [ja]',
                translationEn: 'Yes, I did.',
                pronunciation: {
                    target: 'Ja, det gjorde jeg.',
                    focus: ['det', 'gjorde', 'jeg']
                }
            },

            // --- REPLIKSKIFTE 6 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Var det koldt udenfor? Regnede det meget i går?',
                translationEn: 'Was it cold outside? Did it rain a lot yesterday?'
            },
            { 
                type: 'user_action',
                stepNum: 6,
                fonetikTip: 'G som j-lyd i "regnede", stumt G i "rigtig" og "meget" • Hårdt r i "rigtig"',
                fonetikTipEn: '\'g\' as \'j\' sound in "regnede" • Silent \'g\' in "rigtig" and "meget" • Hard \'r\' in "rigtig"',
                translationEn: 'Yes, it rained very much here.',
                pronunciation: {
                    target: 'Ja, det regnede rigtig meget her.',
                    focus: ['regnede', 'rigtig', 'meget']
                }
            },

            // --- REPLIKSKIFTE 7 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Nå, vi ses snart til mødet klokken 10.',
                translationEn: 'Well, see you soon at the meeting at 10.'
            },
            { 
                type: 'user_action',
                stepNum: 7,
                fonetikTip: 'Vokalisk r i "snart"',
                fonetikTipEn: 'Vocalic \'r\' in "snart"',
                translationEn: 'Yes, see you soon.',
                pronunciation: {
                    target: 'Ja, vi ses snart.',
                    focus: ['ses', 'snart']
                }
            },

            // --- REPLIKSKIFTE 8 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Fint. Du kan kigge i den nye personalehåndbog her.',
                translationEn: 'Great. You can take a look at the new employee handbook here.'
            },
            { 
                type: 'user_action',
                stepNum: 8,
                fonetikTip: 'Vokalisk r i "har" • G som w-lyd i "bogen" (efter o)',
                fonetikTipEn: 'Vocalic \'r\' in "har" • \'g\' as \'w\' sound in "bogen" (after \'o\')',
                translationEn: 'Thank you, I have looked in the handbook.',
                pronunciation: {
                    target: 'Tak, jeg har kigget i bogen.',
                    focus: ['kigget', 'bogen', 'har']
                }
            },

            // --- REPLIKSKIFTE 9 ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Tag det roligt. Husk at gå tidligt hjem, hvis du bliver træt!',
                translationEn: 'Take it easy. Remember to go home early if you get tired!'
            },
            { 
                type: 'user_action',
                stepNum: 9,
                fonetikTip: 'G som ng-lyd i "Mange" • Vokalisk r i "arbejder" • Hårdt d i "middag"',
                fonetikTipEn: '\'g\' as \'ng\' sound in "Mange" • Vocalic \'r\' in "arbejder" • Hard \'d\' in "middag"',
                translationEn: 'Thank you very much, I am only working until noon today.',
                pronunciation: {
                    target: 'Mange tak, jeg arbejder kun til middag i dag.',
                    focus: ['mange', 'arbejder', 'middag', 'dag']
                }
            },

            // --- FINAL NPC & OUTRO ---
            { 
                type: 'npc', 
                name: isEn ? 'Lene (Manager)' : 'Lene (Leder)', 
                text: 'Det er en perfekt aftale. Rigtig god arbejdslyst, og pas godt på dig selv!',
                translationEn: 'That\'s a perfect arrangement. Have a great working day, and take good care of yourself!'
            },
            { 
                type: 'narrative', 
                text: '🏆 Flot klaret! Du har gennemført den realistiske arbejdssamtale i 9 replikskifter og mestret lenisering og udtale af D, R og G!',
                textEn: '🏆 Well done! You have completed the realistic workplace conversation in 9 exchanges and mastered lenition and pronunciation of D, R, and G!'
            }
        ];
    }

    // --- State Management ---
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
        h1.textContent = isEn ? 'Back to work after illness' : 'Tilbage på job efter sygdom';
        h1.style.marginBottom = '1rem';

        const p = document.createElement('p');
        p.textContent = isEn
            ? 'Series: Illness & Job (Part 4 of 4) • Step-by-step dialogue practice in 9 exchanges: Listen to pronunciation, practice with the microphone, and learn lenition of D, R, and G.'
            : 'Serie: Sygdom & job (Del 4 af 4) • Trinvis samtaletræning i 9 replikskifter: Lyt til udtalen, træn med mikrofonen og lær lenisering af D, R og G uden puslespil.';
        p.style.marginBottom = '1.8rem';
        p.style.color = 'var(--text-muted)';
        p.style.lineHeight = '1.6';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = isEn ? 'Enter your name...' : 'Indtast dit navn...';
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
            initStoryData();
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
                bubble.textContent = (isEn && step.textEn) ? step.textEn : step.text;
                chatContainer.appendChild(bubble);
            } 
            else if (step.type === 'npc') {
                const bubble = document.createElement('div');
                bubble.className = 'chat-bubble npc';
                bubble.style.cursor = 'pointer';
                bubble.title = isEn ? "Click to hear Lene's line" : 'Tryk for at høre Lenes replik';
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
                    // Past completed user action
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
            backToDialogerBtn.textContent = isEn ? '← Back to Illness & Job' : '← Tilbage til Sygdom & job';
            backToDialogerBtn.onclick = () => navigateFn('dialoger_sygdom_job');

            const restartBtn = document.createElement('button');
            restartBtn.className = 'back-btn';
            restartBtn.textContent = isEn ? '↻ Try dialogue again' : '↻ Prøv dialogen igen';
            restartBtn.onclick = () => {
                localStorage.removeItem('story_workshop_progress');
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
        
        // Progress badge (Replikskifte X af 9)
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
            stepBadge.textContent = isEn ? `Exchange ${step.stepNum} of 9` : `Replikskifte ${step.stepNum} af 9`;
            actionBox.appendChild(stepBadge);
        }

        // Pronunciation Phase (Direkte udtaletræning - intet puslespil og ingen opfordringsboble)
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

        // Model audio listen button
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
            localStorage.setItem('story_workshop_progress', currentStepIndex);
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

        // Speech Logic using Web Speech API
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
                    
                    if (score >= 65) {
                        progressBar.style.background = '#4caf50';
                        statusText.innerHTML = `<span style="color:#4caf50; font-weight: bold;">${isEn ? '✓ Great pronunciation!' : '✓ Flot udtalt!'}</span>${spokenHTML}`;
                        micBtn.style.display = 'none';
                        skipBtn.style.display = 'none';
                        nextBtn.style.display = 'inline-block';
                    } else {
                        progressBar.style.background = '#ff5e5b';
                        appState.pronunciationFails++;
                        statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">${isEn ? 'Almost! Try again and focus on the highlighted words.' : 'Næsten! Prøv igen og fokuser på de understregede ord.'}</span>${spokenHTML}`;
                    }
                }, 100);
            }
        }

        container.appendChild(pronCont);
    }

    // Inject styles
    if (!document.getElementById('story-styles')) {
        const style = document.createElement('style');
        style.id = 'story-styles';
        style.textContent = `
            .story-input {
                padding: 0.9rem 1.2rem;
                font-size: 1.15rem;
                border-radius: 12px;
                border: 2px solid rgba(255,255,255,0.2);
                background: rgba(0,0,0,0.25);
                color: white;
                width: 80%;
                max-width: 320px;
                outline: none;
                transition: border-color 0.2s;
            }
            .story-input:focus {
                border-color: #ffcc00;
            }
            .chat-container {
                display: flex;
                flex-direction: column;
                gap: 1.4rem;
                padding-bottom: 5rem;
                max-width: 800px;
                margin: 0 auto;
            }
            .chat-bubble {
                padding: 1.1rem 1.5rem;
                border-radius: 20px;
                max-width: 85%;
                font-size: 1.15rem;
                line-height: 1.55;
                animation: fadeIn 0.35s ease-out forwards;
            }
            .chat-bubble.narrative {
                background: rgba(255,255,255,0.08);
                color: #e0e0e0;
                align-self: center;
                font-style: italic;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.15);
                max-width: 90%;
            }
            .chat-bubble.npc {
                background: rgba(255, 204, 0, 0.15);
                border: 1px solid rgba(255, 204, 0, 0.35);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            .chat-bubble.user.past {
                background: rgba(76, 175, 80, 0.15);
                border: 1px solid rgba(76, 175, 80, 0.35);
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            .action-box {
                align-self: center;
                width: 100%;
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(255,204,0,0.3);
                border-radius: 24px;
                padding: 1.8rem;
                animation: fadeIn 0.4s ease;
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
