import { getTranslation, getLang } from '../utils/i18n.js';
import { annaRatStory } from '../data/anna_rat_story.js';
import { baseUrl } from '../utils/config.js';

export function renderBranchingStoryView(container, navigateFn, extraData) {
    const isEn = getLang() === 'en';
    const storyId = extraData?.storyId || 'anna_rat';
    const story = annaRatStory;

    const lsKey = `branching_story_progress_${storyId}`;
    const lsKeyTask = `${lsKey}_task`;
    const lsKeyNarrative = `${lsKey}_narrative`;
    const lsKeyGrammar = `anna_grammar_toggle`;
    const lsKeyEndings = `anna_unlocked_endings`;

    let currentNodeId = localStorage.getItem(lsKey) || story.startNode;
    let showGrammar = localStorage.getItem(lsKeyGrammar) === 'true';

    // Get unlocked endings array
    function getUnlockedEndings() {
        try {
            return JSON.parse(localStorage.getItem(lsKeyEndings) || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveUnlockedEnding(endingId) {
        const list = getUnlockedEndings();
        if (!list.includes(endingId)) {
            list.push(endingId);
            localStorage.setItem(lsKeyEndings, JSON.stringify(list));
        }
    }

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container branching-story-container';

    // TTS audio helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Dynamic Styles
    if (!document.getElementById('anna-comic-styles')) {
        const style = document.createElement('style');
        style.id = 'anna-comic-styles';
        style.textContent = `
            .branching-story-container {
                max-width: 820px;
                margin: 0 auto;
                padding: 1rem 1.2rem 4rem;
                color: #f8fafc;
            }
            .anna-header {
                text-align: center;
                margin-bottom: 1.5rem;
            }
            .anna-header h1 {
                font-size: 2.2rem;
                font-weight: 800;
                margin-bottom: 0.4rem;
                background: linear-gradient(135deg, #facc15, #fb923c, #f43f5e);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .anna-header .subtitle {
                color: #94a3b8;
                font-size: 1.05rem;
                max-width: 650px;
                margin: 0 auto;
            }

            /* TROPHY / BADGES BAR */
            .trophy-section {
                background: rgba(15, 23, 42, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 18px;
                padding: 1rem 1.2rem;
                margin-bottom: 2rem;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
            .trophy-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.8rem;
                font-size: 0.95rem;
                font-weight: 700;
            }
            .trophy-title-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                color: #facc15;
            }
            .trophy-counter {
                color: #38bdf8;
                background: rgba(56, 189, 248, 0.15);
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.85rem;
            }
            .trophy-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 0.6rem;
            }
            @media (max-width: 600px) {
                .trophy-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            .trophy-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 14px;
                padding: 0.6rem 0.5rem;
                text-align: center;
                transition: all 0.25s ease;
                cursor: default;
            }
            .trophy-card.unlocked {
                background: linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(249, 115, 22, 0.15));
                border-color: rgba(234, 179, 8, 0.4);
                box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
                cursor: pointer;
            }
            .trophy-card.unlocked:hover {
                transform: translateY(-2px);
                border-color: #facc15;
            }
            .trophy-card.locked {
                opacity: 0.45;
                filter: grayscale(1);
            }
            .trophy-card .t-icon {
                font-size: 1.5rem;
                display: block;
                margin-bottom: 0.2rem;
            }
            .trophy-card .t-name {
                font-size: 0.8rem;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* TOOLBAR: TOGGLE & ACTIONS */
            .controls-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 0.8rem;
                margin-bottom: 1.5rem;
            }
            .grammar-btn-toggle {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #e2e8f0;
                padding: 0.45rem 0.9rem;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                transition: all 0.2s;
            }
            .grammar-btn-toggle:hover {
                background: rgba(255, 255, 255, 0.15);
            }
            .grammar-btn-toggle.active {
                background: rgba(34, 197, 94, 0.2);
                border-color: #22c55e;
                color: #4ade80;
            }

            /* HERO SCENE CARD */
            .scene-card {
                background: rgba(30, 41, 59, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 24px;
                overflow: hidden;
                margin-bottom: 2rem;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
                transition: all 0.3s ease;
            }
            .scene-image-wrap {
                position: relative;
                width: 100%;
                overflow: hidden;
                background: #0f172a;
            }
            .scene-image {
                width: 100%;
                height: auto;
                display: block;
                object-fit: cover;
                transition: transform 0.4s ease;
            }
            .scene-image:hover {
                transform: scale(1.015);
            }
            .scene-audio-btn {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.25);
                color: #f8fafc;
                padding: 0.5rem 1rem;
                border-radius: 30px;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                transition: transform 0.2s, background 0.2s;
            }
            .scene-audio-btn:hover {
                background: #3b82f6;
                color: white;
                transform: scale(1.05);
            }
            .scene-text-content {
                padding: 1.5rem 1.8rem;
            }
            .scene-narrative {
                font-size: 1.35rem;
                font-weight: 600;
                line-height: 1.55;
                color: #ffffff;
                margin-bottom: 0.4rem;
            }
            .scene-sub-en {
                color: #94a3b8;
                font-size: 1.05rem;
                font-style: italic;
                margin-top: 0.3rem;
            }

            /* CHOICE BUTTONS */
            .comic-choice-btn {
                width: 100%;
                background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
                border: 2px solid rgba(255, 255, 255, 0.12);
                border-radius: 18px;
                padding: 1.2rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 1.2rem;
                color: white;
                font-size: 1.2rem;
                font-weight: 700;
                text-align: left;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            .comic-choice-btn:hover {
                transform: translateY(-3px) scale(1.01);
                border-color: #facc15;
                background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(30, 41, 59, 0.95));
                box-shadow: 0 8px 25px rgba(234, 179, 8, 0.25);
            }
            .comic-choice-btn .choice-icon {
                font-size: 2.2rem;
                min-width: 48px;
                text-align: center;
            }
            .comic-choice-btn .choice-text-wrap {
                display: flex;
                flex-direction: column;
            }
            .comic-choice-btn .choice-text-en {
                font-size: 0.95rem;
                color: #94a3b8;
                font-weight: 500;
                font-style: italic;
                margin-top: 0.2rem;
            }

            /* GRAMMAR WORD HIGHLIGHTING */
            .op-word.gram-subst {
                border-color: #22c55e !important;
                color: #4ade80 !important;
                background: rgba(34, 197, 94, 0.2) !important;
            }
            .op-word.gram-verb {
                border-color: #ef4444 !important;
                color: #f87171 !important;
                background: rgba(239, 68, 68, 0.2) !important;
            }
            .op-word.gram-adv {
                border-color: #a855f7 !important;
                color: #c084fc !important;
                background: rgba(168, 85, 247, 0.2) !important;
            }
            .op-word.gram-prep {
                border-color: #0284c7 !important;
                color: #60a5fa !important;
                background: rgba(2, 132, 199, 0.2) !important;
            }

            /* ENDING CARD */
            .ending-banner {
                background: linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(244, 63, 94, 0.25));
                border: 2px solid #facc15;
                border-radius: 20px;
                padding: 1.2rem;
                text-align: center;
                margin-bottom: 1.5rem;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .ending-banner h2 {
                font-size: 1.8rem;
                color: #facc15;
                margin-bottom: 0.3rem;
            }
            .ending-banner p {
                font-size: 1.05rem;
                color: #e2e8f0;
            }

            /* MODAL PREVIEW */
            .anna-modal-backdrop {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(6px);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1.5rem;
            }
            .anna-modal-card {
                background: #1e293b;
                border: 2px solid #facc15;
                border-radius: 24px;
                max-width: 650px;
                width: 100%;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                animation: popIn 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('historier_menu');
    topBar.appendChild(backBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'back-btn';
    resetBtn.style.color = '#ff5e5b';
    resetBtn.innerHTML = isEn ? `↻ Restart story` : `↻ Start forfra`;
    resetBtn.onclick = () => {
        if (confirm(isEn ? 'Are you sure you want to restart the story?' : 'Er du sikker på, at du vil starte historien forfra?')) {
            localStorage.removeItem(lsKey);
            localStorage.removeItem(lsKeyTask);
            localStorage.removeItem(lsKeyNarrative);
            currentNodeId = story.startNode;
            renderNode(true);
        }
    };
    topBar.appendChild(resetBtn);
    viewContainer.appendChild(topBar);

    // Header
    const header = document.createElement('div');
    header.className = 'anna-header';
    header.innerHTML = `
        <h1>${isEn ? "Anna's Fun Day at Netto" : "Annas sjove dag i Netto"}</h1>
        <p class="subtitle">${isEn ? "An interactive branching comic • Practice pronunciation, word order, and find all 4 endings!" : "En interaktiv forgreningstegneserie • Træn udtale, ordstilling og find alle 4 slutninger!"}</p>
    `;
    viewContainer.appendChild(header);

    // Trophy Section Container
    const trophySection = document.createElement('div');
    trophySection.className = 'trophy-section';
    viewContainer.appendChild(trophySection);

    function renderTrophyBar() {
        trophySection.innerHTML = '';
        const unlocked = getUnlockedEndings();

        const trophyHeader = document.createElement('div');
        trophyHeader.className = 'trophy-header';
        trophyHeader.innerHTML = `
            <div class="trophy-title-badge">
                <span>🏆</span> <span>${isEn ? 'Trophy Gallery (4 Endings):' : 'Trofæ-galleri (4 slutninger):'}</span>
            </div>
            <div class="trophy-counter">${isEn ? 'Found' : 'Fundet'}: ${unlocked.length} / 4</div>
        `;
        trophySection.appendChild(trophyHeader);

        const grid = document.createElement('div');
        grid.className = 'trophy-grid';

        story.endings.forEach(end => {
            const isUnlocked = unlocked.includes(end.id);
            const card = document.createElement('div');
            card.className = `trophy-card ${isUnlocked ? 'unlocked' : 'locked'}`;

            const icon = document.createElement('span');
            icon.className = 't-icon';
            icon.textContent = isUnlocked ? end.icon : '🔒';

            const name = document.createElement('div');
            name.className = 't-name';
            name.textContent = isUnlocked ? (isEn ? end.titleEn : end.title) : (isEn ? 'Locked' : 'Låst');

            card.appendChild(icon);
            card.appendChild(name);

            if (isUnlocked) {
                card.title = isEn ? 'Click to view trophy' : 'Klik for at se trofæ';
                card.onclick = () => showTrophyModal(end);
            }

            grid.appendChild(card);
        });

        trophySection.appendChild(grid);
    }

    // Modal to view unlocked trophy
    function showTrophyModal(endingData) {
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'anna-modal-backdrop';

        const modalCard = document.createElement('div');
        modalCard.className = 'anna-modal-card';

        const img = document.createElement('img');
        img.src = `${baseUrl}${endingData.image}`;
        img.style.width = '100%';
        img.style.display = 'block';

        const info = document.createElement('div');
        info.style.padding = '1.5rem';
        info.innerHTML = `
            <h2 style="color: #facc15; font-size: 1.6rem; margin-bottom: 0.5rem;">${endingData.icon} ${isEn ? endingData.titleEn : endingData.title}</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; color: #f8fafc; margin-bottom: 1.2rem;">${isEn ? story.nodes[endingData.id].narrativeEn : story.nodes[endingData.id].narrative}</p>
            <div style="text-align: right;">
                <button class="gemini-btn" style="padding: 0.6rem 1.4rem;">${isEn ? 'Close' : 'Luk'}</button>
            </div>
        `;

        info.querySelector('button').onclick = () => modalBackdrop.remove();
        modalBackdrop.onclick = (e) => {
            if (e.target === modalBackdrop) modalBackdrop.remove();
        };

        modalCard.appendChild(img);
        modalCard.appendChild(info);
        modalBackdrop.appendChild(modalCard);
        document.body.appendChild(modalBackdrop);
    }

    renderTrophyBar();

    // Controls bar (Grammar toggle)
    const controlsBar = document.createElement('div');
    controlsBar.className = 'controls-bar';

    const grammarBtn = document.createElement('button');
    grammarBtn.className = `grammar-btn-toggle ${showGrammar ? 'active' : ''}`;
    grammarBtn.innerHTML = `<span>🎨</span> <span>${showGrammar ? (isEn ? 'Hide Word Classes' : 'Skjul ordklasser') : (isEn ? 'Show Word Classes' : 'Vis ordklasser')}</span>`;
    grammarBtn.onclick = () => {
        showGrammar = !showGrammar;
        localStorage.setItem(lsKeyGrammar, showGrammar ? 'true' : 'false');
        grammarBtn.className = `grammar-btn-toggle ${showGrammar ? 'active' : ''}`;
        grammarBtn.innerHTML = `<span>🎨</span> <span>${showGrammar ? (isEn ? 'Hide Word Classes' : 'Skjul ordklasser') : (isEn ? 'Show Word Classes' : 'Vis ordklasser')}</span>`;
        applyGrammarHighlighting();
    };
    controlsBar.appendChild(grammarBtn);

    viewContainer.appendChild(controlsBar);

    const contentArea = document.createElement('div');
    contentArea.className = 'story-content-area';
    viewContainer.appendChild(contentArea);

    // Grammar Tagging Helper
    function getGrammarClass(word) {
        if (!showGrammar) return '';
        const clean = word.toLowerCase().replace(/[.,!?]/g, '').trim();
        const verbs = ['er', 'løb', 'så', 'laver', 'ødelægger', 'kaster', 'ser', 'beder', 'falder', 'lukker', 'griner', 'klapper', 'bukker', 'smiler', 'vil', 'købe', 'tænker', 'råber', 'rammer', 'vælter', 'peger', 'støder', 'taber', 'fanger'];
        const subst = ['anna', 'jeg', 'du', 'hun', 'han', 'det', 'hvad', 'en', 'rotte', 'æble', 'chefen', 'kaffe', 'kunden', 'kunder', 'hjælp', 'dåserne', 'butikken', 'frugtafdelingen', 'hovedet', 'tomater', 'pyramide', 'kassen', 'brag', 'kurv'];
        const prep = ['i', 'på', 'efter', 'til', 'ud', 'ind', 'væk'];
        const adv = ['fordi', 'ikke', 'hurtigt', 'nu', 'pludselig', 'hele', 'meget', 'sjovt'];

        if (verbs.includes(clean)) return 'gram-verb';
        if (subst.includes(clean)) return 'gram-subst';
        if (prep.includes(clean)) return 'gram-prep';
        if (adv.includes(clean)) return 'gram-adv';
        return '';
    }

    function applyGrammarHighlighting() {
        document.querySelectorAll('.op-word').forEach(wordEl => {
            wordEl.classList.remove('gram-verb', 'gram-subst', 'gram-prep', 'gram-adv');
            const cls = getGrammarClass(wordEl.textContent);
            if (cls) wordEl.classList.add(cls);
        });
    }

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

        // If this node is an ending, unlock it in the trophy bar!
        if (node.isEnding) {
            saveUnlockedEnding(node.id);
            renderTrophyBar();
        }

        // 1. Scene Hero Card (Illustration + Narrative + Audio)
        const sceneCard = document.createElement('div');
        sceneCard.className = 'scene-card fade-in';

        // Image wrap
        if (node.image) {
            const imgWrap = document.createElement('div');
            imgWrap.className = 'scene-image-wrap';

            const img = document.createElement('img');
            img.className = 'scene-image';
            img.src = `${baseUrl}${node.image}`;
            img.alt = node.title || 'Scene';

            // Audio button overlay
            const audioBtn = document.createElement('button');
            audioBtn.className = 'scene-audio-btn';
            audioBtn.innerHTML = `<span>🔊</span> <span>${isEn ? 'Listen' : 'Lyt til scenen'}</span>`;
            audioBtn.onclick = () => {
                const currentText = localStorage.getItem(lsKeyNarrative) || node.narrative;
                speakDanish(currentText);
            };

            imgWrap.appendChild(img);
            imgWrap.appendChild(audioBtn);
            sceneCard.appendChild(imgWrap);
        }

        // Text wrap
        const textWrap = document.createElement('div');
        textWrap.className = 'scene-text-content';

        const narrativeText = document.createElement('div');
        narrativeText.className = 'scene-narrative';
        narrativeText.textContent = localStorage.getItem(lsKeyNarrative) || node.narrative;
        textWrap.appendChild(narrativeText);

        if (node.narrativeEn) {
            const subEn = document.createElement('div');
            subEn.className = 'scene-sub-en';
            subEn.textContent = node.narrativeEn;
            textWrap.appendChild(subEn);
        }

        sceneCard.appendChild(textWrap);
        contentArea.appendChild(sceneCard);

        // 2. Render Tasks (if any)
        let tasks = [];
        if (node.tasks) tasks = node.tasks;
        else if (node.task) tasks = [node.task];

        if (tasks.length > 0) {
            let currentTaskIndex = parseInt(localStorage.getItem(lsKeyTask) || "0", 10);

            function renderNextTask() {
                localStorage.setItem(lsKeyTask, currentTaskIndex.toString());
                localStorage.setItem(lsKeyNarrative, narrativeText.textContent);

                if (currentTaskIndex >= tasks.length) {
                    if (node.choices && node.choices.length > 0) {
                        renderChoices(node.choices);
                    }
                    return;
                }

                const currentTask = tasks[currentTaskIndex];
                const taskContainer = document.createElement('div');
                taskContainer.className = 'task-container fade-in';
                taskContainer.style.marginTop = '1.5rem';
                taskContainer.style.background = 'rgba(15, 23, 42, 0.7)';
                taskContainer.style.border = '1px solid rgba(255, 255, 255, 0.12)';
                taskContainer.style.borderRadius = '20px';
                taskContainer.style.padding = '1.5rem';
                taskContainer.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
                taskContainer.style.transition = 'opacity 0.3s ease-out';
                
                const instruction = document.createElement('div');
                instruction.className = 'trps-box';
                instruction.innerHTML = `💭 <strong>${isEn ? (currentTask.instructionEn || currentTask.instruction) : currentTask.instruction}</strong>`;
                taskContainer.appendChild(instruction);

                const onTaskSuccess = (producedText) => {
                    taskContainer.style.opacity = '0';
                    setTimeout(() => {
                        taskContainer.style.display = 'none';
                        if (producedText) {
                            const space = narrativeText.textContent.endsWith(' ') ? '' : ' ';
                            narrativeText.textContent += space + producedText;
                            narrativeText.classList.add('bounce-in');
                            setTimeout(() => narrativeText.classList.remove('bounce-in'), 500);
                        }
                        currentTaskIndex++;
                        renderNextTask();
                    }, 300);
                };

                if (currentTask.type === 'phonetics') {
                    renderPhoneticsTask(currentTask, taskContainer, onTaskSuccess);
                } else if (currentTask.type === 'syntax') {
                    renderSyntaxTask(currentTask, taskContainer, onTaskSuccess);
                } else if (currentTask.type === 'semantics') {
                    renderSemanticsTask(currentTask, taskContainer, onTaskSuccess);
                }
                
                contentArea.appendChild(taskContainer);
                
                setTimeout(() => {
                    taskContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }

            renderNextTask();
        } else {
            // No task -> Either Ending or direct choices
            if (node.choices && node.choices.length > 0) {
                renderChoices(node.choices);
            } else if (node.isEnding) {
                renderEndingScreen(node);
            }
        }
    }

    function renderChoices(choices) {
        if (!choices || choices.length === 0) return;
        
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'choices-container fade-in';
        choicesContainer.style.marginTop = '2rem';
        choicesContainer.style.display = 'flex';
        choicesContainer.style.flexDirection = 'column';
        choicesContainer.style.gap = '1.2rem';

        const choiceTitle = document.createElement('h3');
        choiceTitle.textContent = isEn ? 'What does Anna do next?' : 'Hvad gør Anna nu?';
        choiceTitle.style.textAlign = 'center';
        choiceTitle.style.fontSize = '1.6rem';
        choiceTitle.style.fontWeight = '800';
        choiceTitle.style.color = '#facc15';
        choicesContainer.appendChild(choiceTitle);

        choices.forEach((choice) => {
            const btn = document.createElement('button');
            btn.className = 'comic-choice-btn';

            const iconSpan = document.createElement('span');
            iconSpan.className = 'choice-icon';
            iconSpan.textContent = choice.icon || '👉';

            const textWrap = document.createElement('div');
            textWrap.className = 'choice-text-wrap';

            const titleSpan = document.createElement('span');
            titleSpan.textContent = choice.text;
            textWrap.appendChild(titleSpan);

            if (choice.textEn) {
                const subSpan = document.createElement('span');
                subSpan.className = 'choice-text-en';
                subSpan.textContent = choice.textEn;
                textWrap.appendChild(subSpan);
            }

            btn.appendChild(iconSpan);
            btn.appendChild(textWrap);

            btn.onclick = () => {
                currentNodeId = choice.nextNode;
                renderNode(true);
            };
            choicesContainer.appendChild(btn);
        });

        contentArea.appendChild(choicesContainer);
        setTimeout(() => {
            choicesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function renderEndingScreen(endingNode) {
        const endingBanner = document.createElement('div');
        endingBanner.className = 'ending-banner';
        endingBanner.innerHTML = `
            <h2>${endingNode.badgeIcon || '🎉'} ${isEn ? endingNode.badgeTitleEn : endingNode.badgeTitle}</h2>
            <p>${isEn ? 'Congratulations! You unlocked this ending in your trophy gallery.' : 'Tillykke! Du har låst denne slutning op i dit trofæ-galleri.'}</p>
        `;
        contentArea.insertBefore(endingBanner, contentArea.firstChild);

        // Action Buttons for Ending
        const btnRow = document.createElement('div');
        btnRow.style.display = 'flex';
        btnRow.style.justifyContent = 'center';
        btnRow.style.gap = '1.2rem';
        btnRow.style.flexWrap = 'wrap';
        btnRow.style.marginTop = '2rem';

        const restartBtn = document.createElement('button');
        restartBtn.className = 'gemini-btn';
        restartBtn.style.padding = '0.9rem 1.8rem';
        restartBtn.style.fontSize = '1.1rem';
        restartBtn.style.display = 'inline-flex';
        restartBtn.style.alignItems = 'center';
        restartBtn.style.gap = '0.5rem';
        restartBtn.innerHTML = `<span>🔄</span> <span>${isEn ? 'Try other paths to find all 4 endings!' : 'Prøv andre valg for at finde alle 4 slutninger!'}</span>`;
        restartBtn.onclick = () => {
            localStorage.removeItem(lsKey);
            localStorage.removeItem(lsKeyTask);
            localStorage.removeItem(lsKeyNarrative);
            currentNodeId = story.startNode;
            renderNode(true);
        };

        const backMenuBtn = document.createElement('button');
        backMenuBtn.className = 'back-btn';
        backMenuBtn.style.padding = '0.9rem 1.5rem';
        backMenuBtn.style.fontSize = '1.1rem';
        backMenuBtn.innerHTML = `← ${isEn ? 'Back to Stories' : 'Tilbage til Historier'}`;
        backMenuBtn.onclick = () => navigateFn('historier_menu');

        btnRow.appendChild(restartBtn);
        btnRow.appendChild(backMenuBtn);
        contentArea.appendChild(btnRow);
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
        pronCont.style.background = 'rgba(0,0,0,0.2)';
        pronCont.style.borderRadius = '16px';
        pronCont.style.marginTop = '1rem';
        pronCont.style.width = '100%';

        const instruction = document.createElement('div');
        instruction.innerHTML = `<strong>${isEn ? 'Pronunciation task:' : 'Udtale-test:'}</strong> ${isEn ? 'Press the microphone and say the sentence aloud.' : 'Tryk på mikrofonen og læs din sætning højt.'}`;
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
        label.textContent = isEn ? 'Accuracy:' : 'Mestring:';
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

        let fallbackLabel = isEn ? 'Tap and speak' : 'Tryk og tal';
        
        const statusText = document.createElement('div');
        statusText.style.color = 'var(--text-muted)';
        statusText.style.textAlign = 'center';
        statusText.style.marginTop = '1rem';
        statusText.style.fontSize = '1.1rem';
        statusText.textContent = fallbackLabel;
        pronCont.appendChild(statusText);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gemini-btn';
        nextBtn.textContent = isEn ? 'Continue story ➔' : 'Videre i historien ➔';
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
            statusText.textContent = isEn ? 'Browser does not support speech recognition. Tap to proceed.' : 'Browser understøtter ikke mikrofon. Tryk videre.';
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
                    statusText.innerHTML = isEn ? '🔴 Listening... Speak now' : '🔴 Lytter... Tal nu (stopper af sig selv)';
                    progressContainer.style.display = 'none';
                    progressBar.style.width = '0%';
                    scoreText.textContent = '0%';
                    Array.from(sentenceDisplay.querySelectorAll('.udtale-word')).forEach(s => s.classList.remove('correct', 'incorrect'));
                } catch(e) {}
            };

            recognition.onresult = (e) => {
                const spoken = e.results[0][0].transcript;
                statusText.innerHTML = isEn ? 'Evaluating...' : 'Behandler...';
                evaluatePronunciation(spoken);
            };

            recognition.onend = () => {
                micBtn.classList.remove('listening');
                isListening = false;
                if (statusText.innerHTML.includes('Lytter') || statusText.innerHTML.includes('Listening')) {
                    statusText.textContent = fallbackLabel;
                }
            };

            function evaluatePronunciation(spoken) {
                const spokenArr = spoken.toLowerCase().replace(/[.,!?]/g, '').split(' ').filter(w => w);
                
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

                let totalReq = targetWords.length;
                if (totalReq === 0) totalReq = 1;

                let score = Math.round((mainCorrectCnt / totalReq) * 100);
                
                progressContainer.style.display = 'flex';
                
                setTimeout(() => {
                    progressBar.style.width = score + '%';
                    scoreText.textContent = score + '%';
                    
                    const spokenHTML = `<div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; font-size: 1.1rem; color: #ffffff; text-align: center;">${isEn ? 'You said:' : 'Du sagde:'}<br/><span style="color: #ffcc00; font-size: 1.3rem; font-weight: bold; line-height: 1.8;">"${spoken}"</span></div>`;
                    
                    if (score >= 70) {
                        progressBar.style.background = '#4caf50';
                        statusText.innerHTML = `<span style="color:#4caf50; font-weight: bold;">${isEn ? 'Well spoken!' : 'Flot udtalt!'}</span>${spokenHTML}`;
                        
                        targetWords.forEach((w, i) => {
                            spans[i].classList.add('correct');
                            spans[i].classList.remove('incorrect');
                        });
                        
                        micBtn.style.display = 'none';
                        setTimeout(() => {
                            onSuccess();
                        }, 2200); 
                    } else {
                        progressBar.style.background = '#ff5e5b';
                        failCount++;
                        if (failCount >= 3) {
                            progressBar.style.background = '#ffcc00';
                            statusText.innerHTML = `<span style="color:#ffcc00; font-weight: bold;">${isEn ? 'Let\'s continue anyway!' : 'Lad os bare gå videre!'}</span>${spokenHTML}`;
                            micBtn.style.display = 'none';
                            nextBtn.style.display = 'inline-block';
                        } else {
                            statusText.innerHTML = `<span style="color:#ff5e5b; font-weight: bold;">${isEn ? `Almost! Try again (${failCount}/3)` : `Næsten! Prøv igen (${failCount}/3)`}</span>${spokenHTML}`;
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
        if (shuffled.length > 1) {
            let isSame = true;
            let attempts = 0;
            while (isSame && attempts < 10) {
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
            const gramCls = getGrammarClass(word);
            if (gramCls) span.classList.add(gramCls);
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
        textContainer.style.fontSize = '1.25rem';
        textContainer.style.lineHeight = '2';

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
