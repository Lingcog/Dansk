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
            <img src="${baseUrl}brain/a97bed4e-74ef-4e23-a7fc-7e243d6211a5/grounding_balloon_anchor_1773441786611.png" alt="Balloon and Anchor" class="grounding-img">
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
        } else {
            renderFinalStep();
        }
    }

    function renderNounStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-content';
        stepDiv.innerHTML = `
            <h3>${getTranslation('groundingStep1')}</h3>
            <div class="grounding-interaction">
                <span class="word-bubble">Hund</span>
                <span class="arrow">←</span>
                <select class="grammatik-select" id="noun-select">
                    <option value="">Vælg anker...</option>
                    <option value="Min">Min</option>
                    <option value="En">En</option>
                    <option value="Den">Den</option>
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
                <div class="drag-item" draggable="true" data-word="hund">hund</div>
                <div class="drag-item" draggable="true" data-word="${state.verbAnchor}">${state.verbAnchor}</div>
                <div class="drag-item" draggable="true" data-word="nu">nu</div>
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
            const draggedElement = document.querySelector(`.drag-item.dragging`);
            if (draggedElement) {
                ground.appendChild(draggedElement);
            }
        };

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
            const expected = `${state.nounAnchor} hund ${state.verbAnchor} nu`.toLowerCase();

            if (result.toLowerCase() === expected) {
                state.step = 4;
                renderStep();
            } else {
                feedback.textContent = getTranslation('wrongOrder');
                feedback.style.display = 'block';
            }
        };
    }

    function renderFinalStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-content final-step';
        stepDiv.innerHTML = `
            <div class="success-animation">🎉</div>
            <h2>${getTranslation('wellDone')}</h2>
            <p class="final-sentence">${state.nounAnchor} hund ${state.verbAnchor} nu.</p>
            <button class="gemini-btn" id="finish-btn">Afslut</button>
        `;
        exerciseContainer.appendChild(stepDiv);

        stepDiv.querySelector('#finish-btn').onclick = () => navigateFn('dagens_opgave');
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
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
