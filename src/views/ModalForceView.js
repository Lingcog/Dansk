import { getTranslation } from '../utils/i18n.js';
import { navigate } from '../main.js';
import { baseUrl } from '../utils/config.js';

export function renderModalForceView(container, navigateFn, inheritedState = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container modal-force-view';

    // Default state if nothing inherited
    const state = {
        nounAnchor: inheritedState.nounAnchor || 'Et',
        verbAnchor: (inheritedState.verbAnchor || 'spiser').replace(' (nu)', '').replace(' (i går)', '').replace(' (senere)', ''),
        selectedModal: inheritedState.selectedModal || '',
    };

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('grounding');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('modalForceTitle');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('modalForceSubtitle');
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);

    const exerciseArea = document.createElement('div');
    exerciseArea.className = 'exercise-container';
    viewContainer.appendChild(exerciseArea);

    function renderExercise() {
        exerciseArea.innerHTML = `
            <div id="force-section" class="step-content animate-in">
                <div class="force-visualization" id="force-viz">
                    <div class="viz-placeholder">${getTranslation('modalForcePlaceholder')}</div>
                </div>

                <div class="modal-interaction">
                    <span class="sentence-part no-wrap">${state.nounAnchor} barn</span>
                    <select class="grammatik-select modal-select" id="modal-select">
                        <option value="">???</option>
                        <option value="skal" ${state.selectedModal === 'skal' ? 'selected' : ''}>skal</option>
                        <option value="må" ${state.selectedModal === 'må' ? 'selected' : ''}>må</option>
                        <option value="vil" ${state.selectedModal === 'vil' ? 'selected' : ''}>vil</option>
                        <option value="kan" ${state.selectedModal === 'kan' ? 'selected' : ''}>kan</option>
                    </select>
                    <span class="sentence-part">spise</span>
                </div>

                <div class="force-explanation" id="force-expl"></div>
                
                <div class="navigation-controls" style="margin-top: 2rem; ${state.selectedModal ? '' : 'display: none;'}" id="nav-controls">
                    <button class="gemini-btn spotlight-btn" id="next-step-btn">${getTranslation('whyConjugateFirst')}</button>
                </div>
            </div>

            <div id="finiteness-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${getTranslation('finitenessTitle')}</h2>
                <p class="subtitle" style="margin-bottom: 2rem;">${getTranslation('finitenessDesc')}</p>

                <div class="finiteness-visual timeline-layout">
                    <div class="finiteness-box timeline-box" id="timeline-box">
                        <div class="label">${getTranslation('timelineLabel')}</div>
                        <div class="svg-container" id="timeline-svg"></div>
                        <div class="word-anchor">
                            <div class="word-display" id="modal-word-marker">${state.selectedModal || 'skal'}</div>
                        </div>
                        <div class="time-toggle">
                            <button class="toggle-btn" data-time="da">${getTranslation('pastLabel')}</button>
                            <button class="toggle-btn active" data-time="nu">${getTranslation('nowLabel')}</button>
                        </div>
                    </div>

                    <div class="finiteness-box action-box" id="action-box">
                        <div class="label">${getTranslation('actionLabel')}</div>
                        <div class="svg-container" id="photo-svg"></div>
                        <div class="word-display static-word" id="action-word-static">spise</div>
                    </div>
                </div>

                <div class="force-explanation visible" id="finiteness-expl">
                    ${getTranslation('finitenessExpl')}
                </div>

                <div id="teaser-section" class="recommendation-box animate-in" style="margin-top: 4rem; display: none; text-align: center;">
                    <h4 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${getTranslation('adjectiveTitle')}</h4>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
                        ${getTranslation('adjectiveTeaser')}
                    </p>
                    <button class="gemini-btn spotlight-btn" id="go-to-adj-btn">
                        ${getTranslation('nextStepAdjective')}
                    </button>
                </div>

                <div class="recommendation-box" style="margin-top: 4rem;">
                    <h4 style="font-size: 1.5rem; margin-bottom: 1.5rem;">${getTranslation('modalTeaserTitle')}</h4>
                    <div class="recommendation-grid">
                        <button class="rec-btn spotlight-btn" id="rec-hjaelpe" style="min-width: 280px;">
                            <span class="rec-icon">⚡</span>
                            <span class="rec-label">${getTranslation('modalPracticeLabel')}</span>
                        </button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 3rem;">
                    <button class="gemini-btn outline-btn" id="finish-btn">${getTranslation('finishBtn')}</button>
                </div>
            </div>
        `;

        const select = exerciseArea.querySelector('#modal-select');
        const viz = exerciseArea.querySelector('#force-viz');
        const expl = exerciseArea.querySelector('#force-expl');
        const nav = exerciseArea.querySelector('#nav-controls');
        const nextBtn = exerciseArea.querySelector('#next-step-btn');
        const teaserSection = exerciseArea.querySelector('#teaser-section');
        const goToAdjBtn = exerciseArea.querySelector('#go-to-adj-btn');
        const finishBtn = exerciseArea.querySelector('#finish-btn');
        const recHjaelpe = exerciseArea.querySelector('#rec-hjaelpe');

        if (state.selectedModal) {
            select.value = state.selectedModal;
            updateVisualization(state.selectedModal, viz, expl);
        }

        select.onchange = () => {
            const val = select.value;
            state.selectedModal = val;
            updateVisualization(val, viz, expl);
            if (val) {
                nav.style.display = 'block';
                const projWord = exerciseArea.querySelector('#modal-word-marker');
                if (projWord) projWord.textContent = val;
            }
        };

        nextBtn.onclick = () => {
            const section = exerciseArea.querySelector('#finiteness-section');
            section.style.display = 'block';
            renderFinitenessLogic();
            nextBtn.style.display = 'none';
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);

            // Show teaser after some interaction or time
            setTimeout(() => {
                teaserSection.style.display = 'block';
            }, 1500);
        };

        goToAdjBtn.onclick = () => navigateFn('adjective_bridge', {
            nounAnchor: state.nounAnchor,
            selectedModal: state.selectedModal
        });

        finishBtn.onclick = () => navigateFn('dagens_opgave');
        recHjaelpe.onclick = () => navigateFn('verbum_learning', { categoryId: 'hjaelpe' });
    }

    function renderFinitenessLogic() {
        const timelineSvg = exerciseArea.querySelector('#timeline-svg');
        const photoSvg = exerciseArea.querySelector('#photo-svg');
        const modalMarker = exerciseArea.querySelector('#modal-word-marker');
        const toggleBtns = exerciseArea.querySelectorAll('.toggle-btn');
        const actionWord = exerciseArea.querySelector('#action-word-static');

        // Timeline SVG
        timelineSvg.innerHTML = `
            <svg viewBox="0 0 400 100" class="timeline-svg-main">
                <line x1="50" y1="50" x2="350" y2="50" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round" />
                <circle cx="100" cy="50" r="6" fill="#666" />
                <circle cx="300" cy="50" r="6" fill="#666" />
                <circle id="moving-dot" cx="300" cy="50" r="10" fill="var(--bg-deep-red)" style="transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);" />
            </svg>
        `;

        // Action/Idea SVG (Thinking bubble)
        photoSvg.innerHTML = `
            <svg viewBox="0 0 160 160" class="activity-svg">
                <path d="M 40 80 Q 20 80 20 60 Q 20 30 50 30 Q 60 10 90 10 Q 130 10 130 40 Q 150 40 150 70 Q 150 100 120 100 L 40 100 Z" 
                      fill="rgba(76, 175, 80, 0.1)" stroke="#4caf50" stroke-width="2" />
            </svg>
        `;

        toggleBtns.forEach(btn => {
            btn.onclick = () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const time = btn.dataset.time;
                const modal = state.selectedModal || 'skal';
                const dot = exerciseArea.querySelector('#moving-dot');

                if (time === 'da') {
                    dot.setAttribute('cx', '100');
                    const deconstruction = {
                        'skal': 'skulle',
                        'må': 'måtte',
                        'vil': 'ville',
                        'kan': 'kunne'
                    };
                    modalMarker.textContent = deconstruction[modal] || modal;
                    modalMarker.style.color = '#ff9800';
                    modalMarker.classList.add('shift-past');
                } else {
                    dot.setAttribute('cx', '300');
                    modalMarker.textContent = modal;
                    modalMarker.style.color = 'white';
                    modalMarker.classList.remove('shift-past');
                }

                actionWord.classList.add('action-pulse');
                setTimeout(() => actionWord.classList.remove('action-pulse'), 800);
            };
        });
    }

    function updateVisualization(modal, container, explContainer) {
        container.innerHTML = '';
        explContainer.innerHTML = '';
        explContainer.className = 'force-explanation visible';

        let svgContent = '';
        let explanation = '';

        const commonStyles = `
            <style>
                .viz-svg { width: 100%; max-width: 500px; height: 300px; }
                .stickman { stroke: white; stroke-width: 3; fill: none; }
                .target { fill: #ffeb3b; filter: drop-shadow(0 0 10px rgba(255, 235, 59, 0.5)); }
                .force-line { stroke-width: 4; stroke-linecap: round; fill: none; }
            </style>
        `;

        if (modal === 'skal') {
            explanation = getTranslation('modalForceSkal');
            svgContent = `
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <path d="M 10 65 L 70 65" class="force-line" stroke="#ff5722" marker-end="url(#arrowhead)"/>
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#ff5722" />
                        </marker>
                    </defs>
                    <path d="M 20 65 Q 45 65 70 65" stroke="#ff5722" stroke-width="8" stroke-opacity="0.3" fill="none">
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="infinite" />
                    </path>
                </svg>
            `;
        } else if (modal === 'må') {
            explanation = getTranslation('modalForceMaa');
            svgContent = `
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <line x1="100" y1="30" x2="100" y2="100" stroke="#4caf50" stroke-width="4" id="barrier">
                        <animate attributeName="y2" from="100" to="30" dur="1.5s" fill="freeze" />
                        <animate attributeName="opacity" from="1" to="0.2" dur="1.5s" fill="freeze" />
                    </line>
                    <path d="M 60 65 L 140 65" stroke="#4caf50" stroke-width="2" stroke-dasharray="5,5" />
                </svg>
            `;
        } else if (modal === 'vil') {
            explanation = getTranslation('modalForceVil');
            svgContent = `
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <path d="M 65 55 Q 110 55 145 65" stroke="#ff4081" stroke-width="3" fill="none" stroke-dasharray="5,5">
                         <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.5s" repeatCount="infinite" />
                    </path>
                    <circle cx="60" cy="55" r="15" fill="#ff4081" opacity="0.1">
                        <animate attributeName="r" from="10" to="25" dur="2s" repeatCount="infinite" />
                    </circle>
                </svg>
            `;
        } else if (modal === 'kan') {
            explanation = getTranslation('modalForceKan');
            svgContent = `
                <svg viewBox="0 0 200 120" class="viz-svg">
                    <g class="stickman" transform="translate(40,40)">
                        <circle cx="0" cy="0" r="10"/> <line x1="0" y1="10" x2="0" y2="40"/>
                        <circle cx="0" cy="20" r="25" stroke="#2196f3" stroke-width="1" opacity="0.3">
                            <animate attributeName="r" from="20" to="35" dur="3s" repeatCount="infinite" />
                        </circle>
                    </g>
                    <circle cx="160" cy="65" r="15" class="target"/>
                    <path d="M 60 65 L 140 65" stroke="#2196f3" stroke-width="2" opacity="0.4" />
                </svg>
            `;
        }

        container.innerHTML = commonStyles + svgContent;
        explContainer.innerHTML = explanation;
    }

    renderExercise();

    if (!document.getElementById('modal-force-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-force-styles';
        styles.textContent = `
            .modal-force-view {
                padding-top: 2rem;
            }
            .modal-force-view .force-visualization {
                background: rgba(0,0,0,0.3);
                border-radius: 24px;
                height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 2rem;
                overflow: hidden;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .modal-force-view .force-visualization { height: 180px; border-radius: 12px; margin-bottom: 1.2rem; }
            }
            .viz-placeholder {
                opacity: 0.4;
                font-style: italic;
                padding: 1rem;
                text-align: center;
            }
            .modal-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                margin: 2rem 0;
                font-size: 1.8rem;
                font-weight: 700;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .modal-interaction { 
                    font-size: 1.1rem; 
                    gap: 0.4rem; 
                    margin: 1rem 0;
                    justify-content: space-evenly;
                }
            }
            .no-wrap {
                white-space: nowrap;
                display: inline-block;
            }
            .modal-select {
                font-size: 1.5rem !important;
                padding: 0.5rem 1rem !important;
                background: var(--bg-deep-red) !important;
                border-radius: 12px !important;
                color: white !important;
                border: none !important;
            }
            @media (max-width: 600px) {
                .modal-select { 
                    font-size: 1rem !important; 
                    padding: 0.3rem 0.6rem !important; 
                    border-radius: 6px !important;
                    min-width: 70px;
                }
            }
            .force-explanation {
                background: rgba(255, 255, 255, 0.05);
                padding: 2rem;
                border-radius: 16px;
                line-height: 1.6;
                text-align: left;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.5s ease;
            }
            @media (max-width: 600px) {
                .force-explanation { padding: 1.2rem; font-size: 0.95rem; }
            }
            .force-explanation.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .sentence-part {
                color: rgba(255,255,255,0.9);
            }
            
            /* Finiteness Exercise Styles */
            .finiteness-visual {
                display: flex;
                justify-content: center;
                gap: 3rem;
                margin: 3rem 0;
            }
            @media (max-width: 600px) {
                .finiteness-visual { gap: 1.5rem; margin: 2rem 0; }
            }
            .finiteness-box {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem;
                border-radius: 20px;
                width: 200px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 2px solid transparent;
                transition: all 0.3s ease;
            }
            @media (max-width: 600px) {
                .finiteness-box { padding: 1rem; border-radius: 16px; }
            }
            .finiteness-box .label {
                font-size: 0.9rem;
                opacity: 0.6;
                margin-bottom: 1rem;
            }
            .finiteness-box .word-display {
                font-size: 2.2rem;
                font-weight: 800;
                margin: 1rem 0;
            }
            @media (max-width: 600px) {
                .finiteness-box .word-display { font-size: 1.6rem; margin: 0.5rem 0; }
            }
            .time-toggle {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
            }
            .toggle-btn {
                background: rgba(255,255,255,0.1);
                border: none;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .toggle-btn.active {
                background: var(--bg-deep-red);
                box-shadow: 0 0 10px rgba(183, 28, 28, 0.4);
            }
            .pulse-anim {
                animation: pulse 0.5s ease;
                border-color: var(--bg-deep-red) !important;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .static-word {
                color: #4caf50;
                transition: transform 0.3s ease;
            }
            .action-pulse {
                animation: actionPulse 0.8s ease;
            }
            @keyframes actionPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); color: #8bc34a; }
                100% { transform: scale(1); }
            }
            .timeline-layout {
                gap: 2rem !important;
                flex-wrap: wrap;
            }
            .timeline-box {
                width: 450px !important;
                max-width: 100%;
            }
            .action-box {
                width: 250px !important;
                max-width: 100%;
            }
            .timeline-svg-main {
                width: 100%;
                height: 100px;
            }
            @media (max-width: 600px) {
                .timeline-svg-main { height: 60px; }
            }
            .word-anchor {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                width: 100%;
            }
            #modal-word-marker {
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                transform: translateX(100px);
            }
            @media (max-width: 600px) {
                #modal-word-marker { transform: translateX(60px); }
            }
            #modal-word-marker.shift-past {
                transform: translateX(-100px);
            }
            @media (max-width: 600px) {
                #modal-word-marker.shift-past { transform: translateX(-60px); }
            }
            .activity-svg {
                width: 120px;
                height: 100px;
            }
            @media (max-width: 600px) {
                .activity-svg { width: 80px; height: 70px; }
            }
            .spotlight-btn {
                background: linear-gradient(135deg, var(--bg-deep-red), #ff5252);
                border: none;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                padding: 1.2rem 2.4rem;
                color: white;
                border-radius: 12px;
                cursor: pointer;
            }
            @media (max-width: 600px) {
                .spotlight-btn { padding: 1rem 1.5rem; font-size: 0.95rem; border-radius: 10px; }
            }
            .outline-btn {
                background: transparent;
                border: 2px solid rgba(255,255,255,0.2);
                color: white;
                padding: 1rem 2rem;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .outline-btn:hover {
                border-color: rgba(255,255,255,0.4);
                background: rgba(255,255,255,0.05);
            }
            .rec-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .rec-icon { font-size: 1.5rem; }
            .rec-label { font-size: 1rem; font-weight: 600; }
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
