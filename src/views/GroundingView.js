import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../main.js';

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
                    <option value="">Vælg anker...</option>
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
                    <option value="">Vælg tid...</option>
                    <option value="spiser">spiser (nu)</option>
                    <option value="spiste">spiste (i går)</option>
                    <option value="skal spise">skal spise (senere)</option>
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
            <p>Træk ordene ned på jorden for at bygge din sætning.</p>
            
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
                feedback.textContent = 'Flot! Se animationen nedenfor.';
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
            sceneTitle = 'Mit barn (Relation)';
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
            sceneTitle = 'Et barn (Ubestemt)';
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
            sceneTitle = 'Det barn (Udpegning)';
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
            sceneTitle = 'Dette barn (Nærhed)';
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
                    <div class="time-point" data-tense="past">Datid</div>
                    <div class="time-point" data-tense="present">Nutid</div>
                    <div class="time-point" data-tense="future">Fremtid</div>
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
                <p class="success-msg">Flot! Du har nu bygget en sætning, der er forankret i virkeligheden.</p>
                <div class="example-box">
                    <span class="example-label">Eksempel:</span>
                    <span class="example-text">${state.nounAnchor} barn ${state.verbAnchor}.</span>
                </div>
                <button class="gemini-btn" id="finish-btn">Afslut</button>
            </div>
        `;

        finalContainer.querySelector('#finish-btn').onclick = () => navigateFn('dagens_opgave');

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
                font-size: 1.2rem;
                text-align: center;
                max-width: 600px;
                margin: 0 auto 2rem;
                line-height: 1.6;
                opacity: 0.9;
            }
            .step-content {
                background: rgba(255, 255, 255, 0.05);
                padding: 2.5rem;
                border-radius: 24px;
                text-align: center;
                animation: fadeIn 0.5s ease;
            }
            .grounding-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                margin: 2rem 0;
            }
            .word-bubble {
                background: var(--bg-deep-red);
                padding: 1rem 2rem;
                border-radius: 50px;
                font-weight: 700;
                font-size: 1.5rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .arrow {
                font-size: 2rem;
                opacity: 0.5;
            }
            .drag-source {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin: 2rem 0;
                min-height: 60px;
                padding: 1rem;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
            }
            .drag-item {
                background: rgba(255, 255, 255, 0.1);
                padding: 0.8rem 1.5rem;
                border-radius: 12px;
                cursor: grab;
                font-size: 1.2rem;
                border: 1px solid rgba(255,255,255,0.1);
                transition: transform 0.2s;
            }
            .drag-item:active { cursor: grabbing; }
            .drag-item.dragging { opacity: 0.5; }
            
            .drop-zone-container {
                margin: 3rem 0;
                position: relative;
            }
            .drop-zone {
                min-height: 80px;
                background: rgba(0, 0, 0, 0.2);
                border: 2px dashed rgba(255, 255, 255, 0.2);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem;
            }
            .ground-label {
                position: absolute;
                bottom: -25px;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.5;
            }
            .final-sentence {
                font-size: 2rem;
                font-weight: 700;
                color: var(--text-light);
                margin: 2rem 0;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .success-text {
                color: #4CAF50 !important;
                font-weight: 700;
                font-size: 1.5rem;
            }
            
            /* Timeline Styles */
            .timeline-container {
                margin-top: 3rem;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .timeline-wrapper {
                position: relative;
                padding: 40px 0;
                width: 80%;
                margin: 0 auto;
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
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
