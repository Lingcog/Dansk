import { getTranslation } from '../utils/i18n.js';
import { navigate } from '../main.js';
import { baseUrl } from '../utils/config.js';

export function renderGroundingView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container grounding-view';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('howToBuildSentence');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('howToBuildSentenceDesc');
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);

    // Intro Area
    const introArea = document.createElement('div');
    introArea.className = 'intro-area';
    introArea.innerHTML = `
        <div class="illustration-container">
            <img src="${baseUrl}images/grounding_balloon_child.png" alt="Balloon and Anchor" class="grounding-img">
        </div>
        <p class="grounding-text">${getTranslation('groundingIntro')}</p>
    `;
    viewContainer.appendChild(introArea);

    // Exercise Container
    const exerciseContainer = document.createElement('div');
    exerciseContainer.className = 'exercise-container';
    viewContainer.appendChild(exerciseContainer);

    let state = {
        step: 1,
        nounAnchor: '',
        verbAnchor: '',
        sentenceParts: []
    };

    function renderStep() {
        exerciseContainer.innerHTML = '';

        if (state.step === 1) {
            renderNounStep();
        } else if (state.step === 2) {
            renderVerbStep();
        } else if (state.step === 3) {
            renderSentenceStep();
        }
    }

    function renderNounStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-content';
        stepDiv.innerHTML = `
            <h3>${getTranslation('groundingStep1')}</h3>
            <div class="grounding-interaction">
                <span class="word-bubble">Barn</span>
                <span class="arrow">←</span>
                <select class="grammatik-select" id="noun-select">
                    <option value="">${getTranslation('selectAnchor')}</option>
                    <option value="Mit">Mit</option>
                    <option value="Et">Et</option>
                    <option value="Det">Det</option>
                    <option value="Dette">Dette</option>
                </select>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `;
        exerciseContainer.appendChild(stepDiv);

        const select = stepDiv.querySelector('#noun-select');
        select.onchange = () => {
            if (select.value) {
                state.nounAnchor = select.value;
                state.step = 2;
                setTimeout(renderStep, 1000);
            }
        };
    }

    function renderVerbStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-content';
        stepDiv.innerHTML = `
            <h3>${getTranslation('groundingStep2')}</h3>
            <div class="grounding-interaction">
                <span class="word-bubble">At spise</span>
                <span class="arrow">←</span>
                <select class="grammatik-select" id="verb-select">
                    <option value="">${getTranslation('selectTense')}</option>
                    <option value="spiser">spiser ${getTranslation('tenseNow')}</option>
                    <option value="spiste">spiste ${getTranslation('tensePast')}</option>
                    <option value="skal spise">skal spise ${getTranslation('tenseFuture')}</option>
                </select>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `;
        exerciseContainer.appendChild(stepDiv);

        const select = stepDiv.querySelector('#verb-select');
        select.onchange = () => {
            if (select.value) {
                state.verbAnchor = select.value;
                state.step = 3;
                setTimeout(renderStep, 1000);
            }
        };
    }

    function renderSentenceStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-content';
        stepDiv.innerHTML = `
            <h3>${getTranslation('groundingStep3')}</h3>
            <p>${getTranslation('dragInstruction')}</p>
            
            <div class="drag-source" id="source">
                <div class="drag-item" draggable="true" data-word="${state.nounAnchor}">${state.nounAnchor}</div>
                <div class="drag-item" draggable="true" data-word="barn">barn</div>
                <div class="drag-item" draggable="true" data-word="${state.verbAnchor}">${state.verbAnchor}</div>
            </div>

            <div class="drop-zone-container">
                <p class="ground-label">${getTranslation('sentenceGround')}</p>
                <div class="drop-zone" id="ground"></div>
            </div>

            <div class="controls">
                <button class="gemini-btn" id="check-btn">${getTranslation('checkResult')}</button>
            </div>
            <div class="exercise-feedback" id="step-feedback"></div>
        `;
        exerciseContainer.appendChild(stepDiv);

        const items = stepDiv.querySelectorAll('.drag-item');
        const ground = stepDiv.querySelector('#ground');
        const source = stepDiv.querySelector('#source');

        items.forEach(item => {
            item.ondragstart = (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.word);
                item.classList.add('dragging');
            };
            item.ondragend = () => item.classList.remove('dragging');
        });

        // Touch Support
        let touchDraggedItem = null;
        let touchOffsetX = 0;
        let touchOffsetY = 0;
        let initialSource = null;

        items.forEach(item => {
            item.ontouchstart = (e) => {
                touchDraggedItem = item;
                initialSource = item.parentElement;
                const touch = e.touches[0];
                const rect = item.getBoundingClientRect();
                const containerRect = stepDiv.getBoundingClientRect();

                // Calculate offset within the item
                touchOffsetX = touch.clientX - rect.left;
                touchOffsetY = touch.clientY - rect.top;

                item.classList.add('dragging');
                item.style.position = 'absolute';
                item.style.zIndex = '2000';
                item.style.width = rect.width + 'px';
                item.style.pointerEvents = 'none';
                item.style.transition = 'none'; // Disable transition during drag

                // Ensure the item is relative to the step container for absolute positioning
                stepDiv.style.position = 'relative';
                stepDiv.appendChild(item); // Move to top-level container to avoid clips

                updateTouchPosition(touch.clientX, touch.clientY);
                e.preventDefault();
            };

            item.ontouchmove = (e) => {
                if (!touchDraggedItem) return;
                const touch = e.touches[0];
                updateTouchPosition(touch.clientX, touch.clientY);
                e.preventDefault();
            };

            item.ontouchend = (e) => {
                if (!touchDraggedItem) return;
                const touch = e.changedTouches[0];

                // Reset styles
                item.classList.remove('dragging');
                item.style.position = '';
                item.style.zIndex = '';
                item.style.width = '';
                item.style.top = '';
                item.style.left = '';
                item.style.pointerEvents = '';
                item.style.transition = '';

                // Determine drop target
                const target = document.elementFromPoint(touch.clientX, touch.clientY);
                const dropZone = target?.closest('.drop-zone') || target?.closest('.drag-source');

                if (dropZone) {
                    if (dropZone.id === 'ground') {
                        const afterElement = getDragAfterElement(ground, touch.clientX);
                        if (afterElement == null) {
                            ground.appendChild(item);
                        } else {
                            ground.insertBefore(item, afterElement);
                        }
                    } else {
                        source.appendChild(item);
                    }
                } else {
                    initialSource.appendChild(item);
                }

                touchDraggedItem = null;
                e.preventDefault();
            };
        });

        function updateTouchPosition(x, y) {
            if (touchDraggedItem) {
                const containerRect = stepDiv.getBoundingClientRect();
                // Position relative to stepDiv
                touchDraggedItem.style.left = (x - containerRect.left - touchOffsetX) + 'px';
                touchDraggedItem.style.top = (y - containerRect.top - touchOffsetY) + 'px';
            }
        }

        ground.ondragover = (e) => e.preventDefault();
        ground.ondrop = (e) => {
            e.preventDefault();
            const word = e.dataTransfer.getData('text/plain');
            const draggedElement = source.querySelector(`.drag-item[data-word="${word}"]`) || ground.querySelector(`.drag-item[data-word="${word}"]`);

            if (draggedElement) {
                // For proper sorting/reordering in the drop zone
                const afterElement = getDragAfterElement(ground, e.clientX);
                if (afterElement == null) {
                    ground.appendChild(draggedElement);
                } else {
                    ground.insertBefore(draggedElement, afterElement);
                }
            }
        };

        function getDragAfterElement(container, x) {
            const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')];
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = x - box.left - box.width / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

        source.ondragover = (e) => e.preventDefault();
        source.ondrop = (e) => {
            e.preventDefault();
            const draggedElement = document.querySelector(`.drag-item.dragging`);
            if (draggedElement) {
                source.appendChild(draggedElement);
            }
        };

        const checkBtn = stepDiv.querySelector('#check-btn');
        const feedback = stepDiv.querySelector('#step-feedback');

        checkBtn.onclick = () => {
            const result = Array.from(ground.children).map(c => c.dataset.word).join(' ');
            const expected = `${state.nounAnchor} barn ${state.verbAnchor}`.toLowerCase();

            if (result.toLowerCase() === expected) {
                // Correct answer! Trigger celebration and timeline
                // Correct answer! Trigger chain of animations
                feedback.textContent = getTranslation('groundingSuccess');
                feedback.className = 'exercise-feedback success-text';
                feedback.style.display = 'block';
                checkBtn.disabled = true;

                // Step 1: Focus Animation (5s)
                showFocusAnimation(stepDiv, () => {
                    // Step 2: Timeline Animation (5s)
                    showTimelineView(stepDiv);

                    setTimeout(() => {
                        showFinalCompletion(stepDiv);
                    }, 5500);
                });
            } else {
                feedback.textContent = getTranslation('wrongOrder');
                feedback.className = 'exercise-feedback';
                feedback.style.display = 'block';
            }
        };
    }

    function showFocusAnimation(parentDiv, callback) {
        let focusContainer = parentDiv.querySelector('.focus-container');
        if (!focusContainer) {
            focusContainer = document.createElement('div');
            focusContainer.className = 'focus-container animate-in';
            parentDiv.appendChild(focusContainer);
        }

        const anchor = state.nounAnchor.toLowerCase();
        let sceneHtml = '';
        let sceneTitle = '';

        if (anchor === 'mit') {
            sceneTitle = getTranslation('groundingRelation');
            sceneHtml = `
                <div class="focus-scene relation-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <circle cx="60" cy="40" r="10" class="stickman-head"/>
                        <line x1="60" y1="50" x2="60" y2="80" class="stickman-body"/>
                        <line x1="60" y1="60" x2="80" y2="70" class="stickman-arm speaker-arm"/>
                        <circle cx="100" cy="55" r="7" class="stickman-head child-head"/>
                        <line x1="100" y1="62" x2="100" y2="85" class="stickman-body"/>
                        <line x1="100" y1="70" x2="80" y2="70" class="stickman-arm child-arm"/>
                        <path d="M 80 65 Q 85 55 90 65" class="relation-heart" />
                    </svg>
                </div>
            `;
        } else if (anchor === 'et') {
            sceneTitle = getTranslation('groundingIndefinite');
            sceneHtml = `
                <div class="focus-scene indefinite-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <g class="faint-child" transform="translate(40,10)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                        </g>
                        <g class="faint-child" transform="translate(160,10)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                        </g>
                        <g class="highlight-child" transform="translate(100,0)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                            <circle cx="0" cy="55" r="30" class="spotlight-circle" />
                        </g>
                    </svg>
                </div>
            `;
        } else if (anchor === 'det') {
            sceneTitle = getTranslation('groundingDistal');
            sceneHtml = `
                <div class="focus-scene distal-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <g class="speaker" transform="translate(40,0)">
                            <circle cx="0" cy="40" r="10" /> <line x1="0" y1="50" x2="0" y2="80" />
                            <line x1="0" y1="60" x2="40" y2="55" class="pointing-arm" />
                        </g>
                        <g class="child" transform="translate(150,15)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                            <path d="M -80 40 L -10 25" class="pointing-beam" />
                        </g>
                    </svg>
                </div>
            `;
        } else if (anchor === 'dette') {
            sceneTitle = getTranslation('groundingProximal');
            sceneHtml = `
                <div class="focus-scene proximal-scene">
                    <svg viewBox="0 0 200 100" class="focus-svg">
                        <circle cx="100" cy="60" r="45" class="here-now-circle" />
                        <g class="speaker" transform="translate(85,5)">
                            <circle cx="0" cy="40" r="10" /> <line x1="0" y1="50" x2="0" y2="80" />
                        </g>
                        <g class="child" transform="translate(115,15)">
                            <circle cx="0" cy="40" r="7" /> <line x1="0" y1="47" x2="0" y2="70" />
                        </g>
                    </svg>
                </div>
            `;
        }

        focusContainer.innerHTML = `
            <div class="focus-wrapper">
                <h3>${sceneTitle}</h3>
                ${sceneHtml}
            </div>
        `;

        // Smooth scroll to focus animation
        setTimeout(() => {
            focusContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

        // Wait 5 seconds then call callback
        setTimeout(callback, 5000);
    }

    function showTimelineView(parentDiv) {
        // Clear focus container or hide it
        const focusContainer = parentDiv.querySelector('.focus-container');
        if (focusContainer) {
            focusContainer.style.opacity = '0.3';
            focusContainer.style.transition = 'opacity 0.5s';
        }
        let timelineContainer = parentDiv.querySelector('.timeline-container');
        if (!timelineContainer) {
            timelineContainer = document.createElement('div');
            timelineContainer.className = 'timeline-container animate-in';
            parentDiv.appendChild(timelineContainer);
        }

        timelineContainer.innerHTML = `
            <div class="timeline-wrapper">
                <div class="timeline-line"></div>
                <div class="timeline-points">
                    <div class="time-point" data-tense="past">${getTranslation('pastTense')}</div>
                    <div class="time-point" data-tense="present">${getTranslation('presentTense')}</div>
                    <div class="time-point" data-tense="future">${getTranslation('futureTense')}</div>
                </div>
                <div class="timeline-pointer" id="timeline-pointer">📍</div>
            </div>
        `;

        // Smooth scroll to timeline
        setTimeout(() => {
            timelineContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

        const pointer = timelineContainer.querySelector('#timeline-pointer');

        // Position based on state.verbAnchor
        // spiser (nu) -> present
        // spiste (i går) -> past
        // skal spise (senere) -> future

        let targetPos = '50%'; // default present
        if (state.verbAnchor === 'spiste') targetPos = '15%';
        if (state.verbAnchor === 'skal spise') targetPos = '85%';

        // Trigger animation
        setTimeout(() => {
            pointer.style.left = targetPos;
            pointer.classList.add('bouncing');
        }, 100);
    }

    function showFinalCompletion(parentDiv) {
        let finalContainer = parentDiv.querySelector('.final-completion-container');
        if (!finalContainer) {
            finalContainer = document.createElement('div');
            finalContainer.className = 'final-completion-container animate-in';
            parentDiv.appendChild(finalContainer);
        }

        finalContainer.innerHTML = `
            <div class="completion-box">
                <div class="success-icon">✨</div>
                <p class="success-msg">${getTranslation('groundingFinalMsg')}</p>
                <div class="example-box">
                    <span class="example-label">${getTranslation('sentenceLabel')}</span>
                    <span class="example-text">${state.nounAnchor} barn ${state.verbAnchor}.</span>
                </div>

                <div class="recommendation-box">
                    <h4>${getTranslation('modalTeaserTitle')}</h4>
                    <p class="teaser-text">${getTranslation('modalTeaserText')}</p>
                    <div class="recommendation-grid">
                        <button class="rec-btn spotlight-btn" id="start-modal">
                            <span class="rec-icon">✨</span>
                            <span class="rec-label">${getTranslation('modalVerbLabel')}</span>
                        </button>
                        <button class="rec-btn" id="rec-bestemthed">
                            <span class="rec-icon">🏷️</span>
                            <span class="rec-label">${getTranslation('bestemthedLabel')}</span>
                        </button>
                        <button class="rec-btn" id="rec-pronomen">
                            <span class="rec-icon">👤</span>
                            <span class="rec-label">${getTranslation('pronomenLabel')}</span>
                        </button>
                        <button class="rec-btn" id="rec-verber">
                            <span class="rec-icon">⚡</span>
                            <span class="rec-label">${getTranslation('verberLabel')}</span>
                        </button>
                    </div>
                </div>

                <button class="gemini-btn outline-btn" id="finish-btn">${getTranslation('finishBtn')}</button>
            </div>
        `;

        finalContainer.querySelector('#finish-btn').onclick = () => navigateFn('dagens_opgave');
        finalContainer.querySelector('#start-modal').onclick = () => navigateFn('modal_force', state);
        finalContainer.querySelector('#rec-bestemthed').onclick = () => navigateFn('bestemthed');
        finalContainer.querySelector('#rec-pronomen').onclick = () => navigateFn('pronomen');
        finalContainer.querySelector('#rec-verber').onclick = () => navigateFn('verbum_learning', { categoryId: 'datid' });

        // Scroll to the final message
        setTimeout(() => {
            finalContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    renderStep();

    // Add local styles if not present
    if (!document.getElementById('grounding-styles')) {
        const styles = document.createElement('style');
        styles.id = 'grounding-styles';
        styles.textContent = `
            .grounding-view .illustration-container {
                text-align: center;
                margin: 2rem 0;
            }
            .grounding-img {
                max-width: 300px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .grounding-text {
                font-size: 1.1rem;
                text-align: center;
                max-width: 600px;
                margin: 0 auto 1.5rem;
                line-height: 1.5;
                opacity: 0.9;
            }
            @media (max-width: 600px) {
                .grounding-text { font-size: 1rem; margin-bottom: 1rem; }
            }
            .step-content {
                background: rgba(255, 255, 255, 0.05);
                padding: 2rem;
                border-radius: 24px;
                text-align: center;
                animation: fadeIn 0.5s ease;
            }
            @media (max-width: 600px) {
                .step-content { padding: 1.2rem; border-radius: 16px; }
            }
            .grounding-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.2rem;
                margin: 1.5rem 0;
            }
            @media (max-width: 600px) {
                .grounding-interaction { gap: 0.8rem; flex-wrap: wrap; }
            }
            .word-bubble {
                background: var(--bg-deep-red);
                padding: 0.8rem 1.5rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.35rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .word-bubble { font-size: 1.15rem; padding: 0.6rem 1.2rem; }
            }
            .arrow {
                font-size: 1.8rem;
                opacity: 0.5;
            }
            .drag-source {
                display: flex;
                justify-content: center;
                gap: 0.8rem;
                margin: 1.5rem 0;
                min-height: 50px;
                padding: 0.8rem;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                flex-wrap: wrap;
            }
            .drag-item {
                background: rgba(255, 255, 255, 0.1);
                padding: 0.6rem 1.2rem;
                border-radius: 12px;
                cursor: grab;
                font-size: 1.1rem;
                border: 1px solid rgba(255,255,255,0.1);
                transition: transform 0.2s, background 0.2s;
                touch-action: none;
                user-select: none;
            }
            @media (max-width: 600px) {
                .drag-item { font-size: 1rem; padding: 0.5rem 1rem; }
            }
            .drag-item:active { cursor: grabbing; }
            .drag-item.dragging { 
                opacity: 0.8; 
                box-shadow: 0 10px 20px rgba(0,0,0,0.4);
            }
            
            .drop-zone-container {
                margin: 2.5rem 0;
                position: relative;
            }
            .drop-zone {
                min-height: 70px;
                background: rgba(0, 0, 0, 0.2);
                border: 2px dashed rgba(255, 255, 255, 0.2);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 0.8rem;
                flex-wrap: wrap;
            }
            .ground-label {
                position: absolute;
                bottom: -22px;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.5;
            }
            .final-sentence {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--text-light);
                margin: 1.5rem 0;
                line-height: 1.3;
            }
            @media (max-width: 600px) {
                .final-sentence { font-size: 1.4rem; }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .success-text {
                color: #4CAF50 !important;
                font-weight: 700;
                font-size: 1.35rem;
            }
            @media (max-width: 600px) {
                .success-text { font-size: 1.2rem; }
            }
            
            /* Timeline Styles */
            .timeline-container {
                margin-top: 2rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            @media (max-width: 600px) {
                .timeline-container { padding: 1rem; }
            }
            .timeline-wrapper {
                position: relative;
                padding: 30px 0;
                width: 90%;
                margin: 0 auto;
            }
            @media (max-width: 600px) {
                .timeline-wrapper { width: 100%; padding: 25px 5px; }
            }
            .timeline-line {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                transform: translateY(-50%);
            }
            .timeline-points {
                display: flex;
                justify-content: space-between;
                position: relative;
                z-index: 2;
            }
            .time-point {
                font-size: 0.9rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                transition: opacity 0.3s;
                position: relative;
            }
            @media (max-width: 600px) {
                .time-point { font-size: 0.75rem; letter-spacing: 0.5px; }
            }
            .time-point::after {
                content: '';
                position: absolute;
                bottom: -20px;
                left: 50%;
                width: 12px;
                height: 12px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translateX(-50%);
            }
            .timeline-pointer {
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 2rem;
                transform: translate(-50%, -50px);
                transition: left 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: 3;
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
            }
            .animate-in {
                animation: slideUpFade 0.8s ease forwards;
            }
            @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .bouncing {
                animation: pointerBounce 2s infinite;
            }
            @keyframes pointerBounce {
                0%, 100% { transform: translate(-50%, -50px); }
                50% { transform: translate(-50%, -60px); }
            }

            /* Focus Scene Styles */
            .focus-container {
                margin-top: 2rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.03);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .focus-wrapper h3 {
                font-size: 1.1rem;
                margin-bottom: 1rem;
                opacity: 0.8;
                color: var(--accent-light, #ffeb3b);
            }
            .focus-svg {
                width: 100%;
                max-width: 400px;
                height: auto;
                stroke: white;
                stroke-width: 3;
                fill: none;
                stroke-linecap: round;
            }
            .stickman-head { stroke-width: 3; }
            .here-now-circle {
                stroke: rgba(255, 235, 59, 0.3);
                fill: rgba(255, 235, 59, 0.05);
                stroke-dasharray: 4 4;
                animation: rotateCircle 20s linear infinite;
            }
            .spotlight-circle {
                stroke: rgba(255, 255, 255, 0.2);
                fill: rgba(255, 255, 255, 0.05);
                stroke-width: 1;
            }
            .faint-child { opacity: 0.2; }
            .highlight-child { animation: pulseHighlight 2s infinite; }
            .relation-heart {
                stroke: #ff4081;
                stroke-width: 2;
                fill: rgba(255, 64, 129, 0.2);
            }
            .pointing-beam {
                stroke: rgba(255, 255, 255, 0.3);
                stroke-width: 15;
                stroke-linecap: butt;
                filter: blur(5px);
            }
            
            @keyframes rotateCircle {
                from { transform: rotate(0deg); transform-origin: center; }
                to { transform: rotate(360deg); transform-origin: center; }
            }
            @keyframes pulseHighlight {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }

            /* Final Completion Styles */
            .final-completion-container {
                margin-top: 3rem;
                padding: 2.5rem;
                background: rgba(76, 175, 80, 0.1);
                border-radius: 24px;
                border: 2px solid rgba(76, 175, 80, 0.3);
            }
            .success-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .success-msg {
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                line-height: 1.5;
            }
            .example-box {
                background: rgba(0,0,0,0.2);
                padding: 1.5rem;
                border-radius: 16px;
                margin-bottom: 2rem;
            }
            .example-label {
                display: block;
                font-size: 0.9rem;
                text-transform: uppercase;
                opacity: 0.6;
                margin-bottom: 0.5rem;
            }
            .example-text {
                font-size: 1.8rem;
                font-weight: 700;
                color: #fff;
            }

            /* Recommendation Box Styles */
            .recommendation-box {
                margin: 2.5rem 0;
                padding-top: 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                text-align: left;
            }
            .recommendation-box h4 {
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
                opacity: 0.7;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .recommendation-grid {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .rec-btn {
                display: flex;
                align-items: center;
                gap: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 1.2rem;
                border-radius: 16px;
                color: white;
                cursor: pointer;
                transition: all 0.2s;
                width: 100%;
                text-align: left;
                font-size: 1.1rem;
            }
            .rec-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateX(5px);
                border-color: rgba(255, 255, 255, 0.3);
            }
            .rec-icon {
                font-size: 1.5rem;
            }
            .rec-label {
                font-weight: 600;
            }
            .teaser-text {
                font-size: 0.95rem;
                opacity: 0.8;
                font-style: italic;
                margin-bottom: 1.5rem;
                color: var(--accent-light, #ffeb3b);
                border-left: 3px solid var(--accent-light, #ffeb3b);
                padding-left: 1rem;
            }
            .spotlight-btn {
                background: linear-gradient(135deg, rgba(255, 235, 59, 0.1), rgba(255, 235, 59, 0.2)) !important;
                border: 1px solid rgba(255, 235, 255, 0.3) !important;
                animation: subtleGlow 3s infinite alternate;
            }
            @keyframes subtleGlow {
                from { box-shadow: 0 0 5px rgba(255, 235, 59, 0.1); }
                to { box-shadow: 0 0 15px rgba(255, 235, 59, 0.2); }
            }
            .outline-btn {
                background: transparent !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                opacity: 0.6;
            }
            .outline-btn:hover { opacity: 1; border-color: white !important; }
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
