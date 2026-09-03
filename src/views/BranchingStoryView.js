import { getTranslation } from '../utils/i18n.js';
import { annaRatStory } from '../data/anna_rat_story.js';

export function renderBranchingStoryView(container, navigateFn, extraData) {
    // Determine which story to load
    const storyId = extraData?.storyId || 'anna_rat';
    let story;
    if (storyId === 'anna_rat') {
        story = annaRatStory;
    } else {
        story = annaRatStory; // fallback
    }

    const lsKey = `branching_story_progress_${storyId}`;
    const lsKeyTask = `${lsKey}_task`;
    const lsKeyNarrative = `${lsKey}_narrative`;
    let currentNodeId = localStorage.getItem(lsKey) || story.startNode;
    
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container branching-story-container';

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
            localStorage.removeItem(lsKey);
            localStorage.removeItem(lsKeyTask);
            localStorage.removeItem(lsKeyNarrative);
            currentNodeId = story.startNode;
            renderNode(true);
        }
    };
    topBar.appendChild(resetBtn);
    viewContainer.appendChild(topBar);

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    function renderNode(isNewNode = false) {
        if (isNewNode) {
            localStorage.removeItem(lsKeyTask);
            localStorage.removeItem(lsKeyNarrative);
        }

        contentArea.innerHTML = '';
        localStorage.setItem(lsKey, currentNodeId);
        const node = story.nodes[currentNodeId];

        if (!node) {
            contentArea.innerHTML = '<h2>Fejl: Node ikke fundet.</h2>';
            return;
        }

        // 1. Render Narrative
        const narrativeBox = document.createElement('div');
        narrativeBox.className = 'narrative-bubble bounce-in';
        narrativeBox.textContent = localStorage.getItem(lsKeyNarrative) || node.narrative;
        contentArea.appendChild(narrativeBox);

        // 2. Render Tasks (if any)
        let tasks = [];
        if (node.tasks) tasks = node.tasks;
        else if (node.task) tasks = [node.task];

        if (tasks.length > 0) {
            let currentTaskIndex = parseInt(localStorage.getItem(lsKeyTask) || "0", 10);

            function renderNextTask() {
                localStorage.setItem(lsKeyTask, currentTaskIndex.toString());
                localStorage.setItem(lsKeyNarrative, narrativeBox.textContent);

                if (currentTaskIndex >= tasks.length) {
                    if (node.choices && node.choices.length > 0) {
                        renderChoices(node.choices);
                    }
                    return;
                }

                const currentTask = tasks[currentTaskIndex];
                const taskContainer = document.createElement('div');
                taskContainer.className = 'task-container fade-in';
                taskContainer.style.marginTop = '2rem';
                taskContainer.style.transition = 'opacity 0.3s ease-out';
                
                const instruction = document.createElement('div');
                instruction.className = 'trps-box';
                instruction.innerHTML = `💭 <em>${currentTask.instruction}</em>`;
                taskContainer.appendChild(instruction);

                const onTaskSuccess = (producedText) => {
                    taskContainer.style.opacity = '0';
                    setTimeout(() => {
                        taskContainer.style.display = 'none';
                        if (producedText) {
                            const space = narrativeBox.textContent.endsWith(' ') ? '' : ' ';
                            narrativeBox.textContent += space + producedText;
                            narrativeBox.classList.add('bounce-in');
                            setTimeout(() => narrativeBox.classList.remove('bounce-in'), 500);
                        }
                        currentTaskIndex++;
                        renderNextTask();
                    }, 300); // Wait for fade out
                };

                if (currentTask.type === 'phonetics') {
                    renderPhoneticsTask(currentTask, taskContainer, onTaskSuccess);
                } else if (currentTask.type === 'syntax') {
                    renderSyntaxTask(currentTask, taskContainer, onTaskSuccess);
                } else if (currentTask.type === 'semantics') {
                    renderSemanticsTask(currentTask, taskContainer, onTaskSuccess);
                }
                
                contentArea.appendChild(taskContainer);
                
                // Scroll to the new task
                setTimeout(() => {
                    taskContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }

            renderNextTask();
        } else {
            // No task (e.g. an ending), just render choices or restart button
            if (node.choices && node.choices.length > 0) {
                renderChoices(node.choices);
            } else {
                const finishMsg = document.createElement('h3');
                finishMsg.textContent = 'Slut!';
                finishMsg.style.textAlign = 'center';
                finishMsg.style.marginTop = '2rem';
                finishMsg.style.color = 'var(--success-color)';
                contentArea.appendChild(finishMsg);
            }
        }
    }

    function renderChoices(choices) {
        if (!choices || choices.length === 0) return;
        
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'choices-container fade-in';
        choicesContainer.style.marginTop = '2.5rem';
        choicesContainer.style.display = 'flex';
        choicesContainer.style.flexDirection = 'column';
        choicesContainer.style.gap = '1.2rem';
        choicesContainer.style.maxWidth = '600px';
        choicesContainer.style.margin = '2.5rem auto 0 auto';

        const choiceTitle = document.createElement('h3');
        choiceTitle.textContent = 'Hvad gør Anna nu?';
        choiceTitle.style.textAlign = 'center';
        choiceTitle.style.marginBottom = '1rem';
        choiceTitle.style.fontSize = '1.6rem';
        choiceTitle.style.fontWeight = '700';
        choicesContainer.appendChild(choiceTitle);

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = `${index === 0 ? 'A' : 'B'}: ${choice.text}`;
            btn.onclick = () => {
                currentNodeId = choice.nextNode;
                renderNode(true);
            };
            choicesContainer.appendChild(btn);
        });

        contentArea.appendChild(choicesContainer);
        // Scroll to choices
        setTimeout(() => {
            choicesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    // --- TASK RENDERERS ---

    function renderPhoneticsTask(task, container, onSuccess) {
        let failCount = 0;

        const pronCont = document.createElement('div');
        pronCont.style.display = 'flex';
        pronCont.style.flexDirection = 'column';
        pronCont.style.alignItems = 'center';
        pronCont.style.gap = '1rem';
        pronCont.style.padding = '1.5rem';
        pronCont.style.background = 'rgba(0,0,0,0.1)';
        pronCont.style.borderRadius = '16px';
        pronCont.style.marginTop = '1rem';
        pronCont.style.width = '100%';

        const instruction = document.createElement('div');
        instruction.innerHTML = `<strong>Udtale-test:</strong> Tryk på mikrofonen og læs din sætning højt.`;
        instruction.style.marginBottom = '1rem';
        instruction.style.color = 'var(--text-muted)';
        pronCont.appendChild(instruction);
        
        const sentenceDisplay = document.createElement('div');
        sentenceDisplay.className = 'udtale-sentence';
        sentenceDisplay.style.fontSize = '1.5rem';
        sentenceDisplay.style.fontWeight = 'bold';
        sentenceDisplay.style.textAlign = 'center';
        sentenceDisplay.style.marginBottom = '1rem';
        
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

        const targetWords = task.target.split(' ');
        const focusWords = task.focus || [];
        
        sentenceDisplay.innerHTML = targetWords.map(w => {
            const clean = w.toLowerCase().replace(/[.,!?]/g, '');
            const isFocus = focusWords.length > 0 ? focusWords.some(f => clean.includes(f.toLowerCase())) : true;
            return `<span class="udtale-word ${isFocus ? 'target-focus' : ''}">${w}</span>`;
        }).join(' ');

        pronCont.appendChild(sentenceDisplay);
        pronCont.appendChild(progressContainer);

        const micBtn = document.createElement('button');
        micBtn.className = 'mic-btn';
        micBtn.innerHTML = '🎤';
        pronCont.appendChild(micBtn);

        let fallbackLabel = getTranslation('speakBtn');
        if (!fallbackLabel || fallbackLabel === 'speakBtn') fallbackLabel = 'Tryk og tal';
        
        const statusText = document.createElement('div');
        statusText.style.color = 'var(--text-muted)';
        statusText.style.textAlign = 'center';
        statusText.style.marginTop = '1rem';
        statusText.style.fontSize = '1.1rem';
        statusText.textContent = fallbackLabel;
        pronCont.appendChild(statusText);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = 'Videre i historien ➔';
        nextBtn.style.display = 'none';
        nextBtn.style.padding = '0.6rem 1.2rem';
        nextBtn.style.fontSize = '1rem';
        nextBtn.style.marginTop = '1rem';
        
        nextBtn.onclick = () => onSuccess();
        
        pronCont.appendChild(nextBtn);
        container.appendChild(pronCont);

        // Speech Logic
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            statusText.textContent = 'Browser understøtter ikke mikrofon. Tryk videre.';
            micBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
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
                    statusText.innerHTML = '🔴 Lytter... Tal nu (stopper af sig selv)';
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
                if (statusText.innerHTML === '🔴 Lytter... Tal nu (stopper af sig selv)') {
                    statusText.textContent = fallbackLabel;
                }
            };

            function evaluatePronunciation(spoken) {
                const spokenArr = spoken.toLowerCase().replace(/[.,!?]/g, '').split(' ').filter(w => w).map(w => w === 'kr' ? 'kroner' : w);
                
                function getMatchScore(targetArr) {
                    let correctCnt = 0;
                    let sIdx = 0;
                    targetArr.forEach((word) => {
                        const clean = word.toLowerCase().replace(/[.,!?]/g, '');
                        let found = false;
                        for (let i = sIdx; i < Math.min(sIdx + 3, spokenArr.length); i++) {
                            const strictWords = ['hvad', 'hvor', 'hvordan', 'hvornår', 'hvem', 'hvilken'];
                            let isMatch = false;
                            
                            if (strictWords.includes(clean)) {
                                isMatch = (spokenArr[i] === clean);
                            } else if (clean === 'anna') {
                                isMatch = (spokenArr[i] === 'anna' || spokenArr[i] === 'hun');
                            } else {
                                isMatch = (spokenArr[i] === clean || (clean.length>3 && spokenArr[i].length>3 && (spokenArr[i].includes(clean) || clean.includes(spokenArr[i]))));
                            }
                            
                            if (isMatch) {
                                found = true;
                                sIdx = i + 1;
                                break;
                            }
                        }
                        if (found) correctCnt++;
                    });
                    return Math.round((correctCnt / targetArr.length) * 100);
                }

                let sIdx = 0;
                let mainCorrectCnt = 0;
                const spans = sentenceDisplay.querySelectorAll('.udtale-word');

                targetWords.forEach((word, idx) => {
                    const clean = word.toLowerCase().replace(/[.,!?]/g, '');
                    const isFocus = focusWords.length > 0 ? focusWords.some(f => clean.includes(f.toLowerCase())) : true;
                    
                    let found = false;
                    for (let i = sIdx; i < Math.min(sIdx + 3, spokenArr.length); i++) {
                        const strictWords = ['hvad', 'hvor', 'hvordan', 'hvornår', 'hvem', 'hvilken'];
                        let isMatch = false;
                        
                        if (strictWords.includes(clean)) {
                            isMatch = (spokenArr[i] === clean);
                        } else if (clean === 'anna') {
                            isMatch = (spokenArr[i] === 'anna' || spokenArr[i] === 'hun');
                        } else {
                            isMatch = (spokenArr[i] === clean || (clean.length>3 && spokenArr[i].length>3 && (spokenArr[i].includes(clean) || clean.includes(spokenArr[i]))));
                        }
                        
                        if (isMatch) {
                            found = true;
                            sIdx = i + 1;
                            break;
                        }
                    }

                    if (found) {
                        if (isFocus) mainCorrectCnt++;
                        spans[idx].classList.add('correct');
                    } else if (isFocus) {
                        spans[idx].classList.add('incorrect');
                    }
                });

                let totalReq = 0;
                targetWords.forEach(w => {
                    const clean = w.toLowerCase().replace(/[.,!?]/g, '');
                    if (focusWords.length > 0) {
                        if (focusWords.some(f => clean.includes(f.toLowerCase()))) totalReq++;
                    } else {
                        totalReq++;
                    }
                });
                if (totalReq === 0) totalReq = 1;

                let bestScore = Math.round((mainCorrectCnt / totalReq) * 100);

                if (task.alternatives) {
                    task.alternatives.forEach(alt => {
                        const altArr = alt.split(' ');
                        const altScore = getMatchScore(altArr);
                        if (altScore > bestScore) bestScore = altScore;
                    });
                }
                
                const score = bestScore;
                progressContainer.style.display = 'flex';
                
                setTimeout(() => {
                    progressBar.style.width = score + '%';
                    scoreText.textContent = score + '%';
                    
                    const spokenHTML = `<div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; font-size: 1.1rem; color: #ffffff; text-align: center;">Du sagde:<br/><span style="color: #ffcc00; font-size: 1.3rem; font-weight: bold; line-height: 1.8;">"${spoken}"</span></div>`;
                    
                    if (score >= 80) {
                        progressBar.style.background = '#4caf50';
                        statusText.innerHTML = `<span style="color:#4caf50; font-weight: bold;">Flot udtalt!</span>${spokenHTML}`;
                        
                        targetWords.forEach((w, i) => {
                            spans[i].classList.add('correct');
                            spans[i].classList.remove('incorrect');
                        });
                        
                        micBtn.style.display = 'none';
                        setTimeout(() => {
                            onSuccess();
                        }, 2500); 
                    } else {
                        progressBar.style.background = '#ff5e5b';
                        failCount++;
                        if (failCount >= 3) {
                            progressBar.style.background = '#ffcc00';
                            statusText.innerHTML = `<span style="color:#ffcc00; font-weight: bold;">Lad os bare gå videre!</span>${spokenHTML}`;
                            micBtn.style.display = 'none';
                            nextBtn.style.display = 'inline-block';
                        } else {
                            statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">Næsten! Prøv igen (${failCount}/3)</span>${spokenHTML}`;
                        }
                    }
                }, 100);
            }
        }
    }

    function renderSyntaxTask(task, container, onSuccess) {
        const dropzone = document.createElement('div');
        dropzone.className = 'op-dropzone';
        dropzone.id = 'branching-result-zone';
        dropzone.style.minHeight = '60px';
        dropzone.style.border = '2px dashed rgba(255,255,255,0.2)';
        container.appendChild(dropzone);

        const pool = document.createElement('div');
        pool.className = 'op-poolzone';
        pool.id = 'branching-pool-zone';
        
        const checkCorrect = () => {
            const currentOrder = Array.from(dropzone.children).map(c => c.textContent).join(' ');
            const expectedOrder = task.words.join(' ');
            const normalize = s => s.replace(/[.,!?]/g, '').toLowerCase().trim();
            
            Array.from(dropzone.children).forEach(c => c.classList.replace('pool', 'selected'));
            Array.from(pool.children).forEach(c => c.classList.replace('selected', 'pool'));
            
            if (pool.children.length === 0) {
                if (normalize(currentOrder) === normalize(expectedOrder)) {
                    dropzone.style.border = '2px solid #4caf50';
                    setTimeout(() => {
                        onSuccess(expectedOrder);
                    }, 500);
                } else {
                    dropzone.style.border = '2px solid #ff5e5b';
                }
            } else {
                dropzone.style.border = '2px dashed rgba(255,255,255,0.2)';
            }
        };

        let shuffled = [...task.words];
        // Ensure it doesn't accidentally shuffle into the correct order
        if (shuffled.length > 1) {
            let isSame = true;
            let attempts = 0;
            while (isSame && attempts < 10) {
                // Fisher-Yates shuffle
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                isSame = shuffled.join(' ') === task.words.join(' ');
                attempts++;
            }
        }
        
        shuffled.forEach(word => {
            const span = document.createElement('div');
            span.className = 'op-word pool';
            span.textContent = word;
            span.onclick = () => {
                if (span.parentElement === pool) {
                    dropzone.appendChild(span);
                    span.classList.replace('pool', 'selected');
                } else {
                    pool.appendChild(span);
                    span.classList.replace('selected', 'pool');
                }
                checkCorrect();
            };
            pool.appendChild(span);
        });
        container.appendChild(pool);

        if (window.Sortable) {
            new Sortable(pool, { group: 'branching', animation: 150, onEnd: checkCorrect });
            new Sortable(dropzone, { group: 'branching', animation: 150, onEnd: checkCorrect });
        }
    }

    function renderSemanticsTask(task, container, onSuccess) {
        const textContainer = document.createElement('div');
        textContainer.className = 'grammatik-text-container';
        textContainer.style.margin = '1rem 0';
        textContainer.style.fontSize = '1.2rem';

        const selects = [];

        task.textSegments.forEach((segment, index) => {
            const span = document.createElement('span');
            span.textContent = segment;
            textContainer.appendChild(span);

            if (index < task.blanks.length) {
                const select = document.createElement('select');
                select.className = 'grammatik-select';
                
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = '...';
                select.appendChild(defaultOption);

                const blankData = task.blanks[index];
                const opts = [...blankData.options].sort(() => Math.random() - 0.5);
                opts.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt;
                    select.appendChild(option);
                });

                select.dataset.correct = blankData.correct;
                selects.push(select);
                
                select.onchange = () => {
                    if (select.value === blankData.correct) {
                        select.classList.add('correct');
                        select.classList.remove('wrong');
                        select.disabled = true;
                        checkAll();
                    } else if (select.value !== '') {
                        select.classList.add('wrong');
                    } else {
                        select.classList.remove('wrong', 'correct');
                    }
                };
                textContainer.appendChild(select);
            }
        });

        container.appendChild(textContainer);

        function checkAll() {
            const allCorrect = selects.every(s => s.classList.contains('correct'));
            if (allCorrect) {
                // Reconstruct full sentence
                let fullSentence = '';
                task.textSegments.forEach((seg, i) => {
                    fullSentence += seg;
                    if (i < task.blanks.length) {
                        fullSentence += task.blanks[i].correct;
                    }
                });
                setTimeout(() => {
                    onSuccess(fullSentence);
                }, 500);
            }
        }
    }

    // Initial render
    container.appendChild(viewContainer);
    renderNode();
}
