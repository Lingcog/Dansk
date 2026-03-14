import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../main.js';

export function renderModalForceView(container, navigateFn, inheritedState = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container modal-force-view';

    // Default state if nothing inherited
    const state = {
        nounAnchor: inheritedState.nounAnchor || 'Et',
        verbAnchor: (inheritedState.verbAnchor || 'spiser').replace(' (nu)', '').replace(' (i går)', '').replace(' (senere)', ''),
        selectedModal: ''
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
    title.textContent = 'Modalverber: Den Usynlige Kraft';
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Modalverber ændrer ikke handlingen, men de ændrer "kraften" bag den.';
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);

    const exerciseArea = document.createElement('div');
    exerciseArea.className = 'exercise-container';
    viewContainer.appendChild(exerciseArea);

    function renderExercise() {
        exerciseArea.innerHTML = `
            <div class="step-content animate-in">
                <div class="force-visualization" id="force-viz">
                    <!-- SVG will be injected here -->
                    <div class="viz-placeholder">Vælg et modalverbum for at se kraften</div>
                </div>

                <div class="modal-interaction">
                    <span class="sentence-part">${state.nounAnchor} barn</span>
                    <select class="grammatik-select modal-select" id="modal-select">
                        <option value="">???</option>
                        <option value="skal">skal (Tvang/Plan)</option>
                        <option value="må">må (Tilladelse)</option>
                        <option value="vil">vil (Ønske)</option>
                        <option value="kan">kan (Evne/Sandsynlighed)</option>
                    </select>
                    <span class="sentence-part">spise</span>
                </div>

                <div class="force-explanation" id="force-expl"></div>
            </div>
            
            <div class="navigation-controls" style="margin-top: 2rem; display: none;" id="nav-controls">
                <button class="gemini-btn" id="finish-btn">Afslut</button>
            </div>
        `;

        const select = exerciseArea.querySelector('#modal-select');
        const viz = exerciseArea.querySelector('#force-viz');
        const expl = exerciseArea.querySelector('#force-expl');
        const nav = exerciseArea.querySelector('#nav-controls');

        select.onchange = () => {
            const val = select.value;
            state.selectedModal = val;
            updateVisualization(val, viz, expl);
            if (val) nav.style.display = 'block';
        };

        exerciseArea.querySelector('#finish-btn').onclick = () => navigateFn('dagens_opgave');
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
            explanation = '<strong>SKAL (Social kraft):</strong> En ydre kraft eller en uundgåelig plan skubber barnet mod handlingen. Der er ingen vej udenom.';
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
            explanation = '<strong>MÅ (Fjernelse af barriere):</strong> Vejen er spærret, men modalverbet "må" fjerner barrieren og giver tilladelse.';
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
            explanation = '<strong>VIL (Indre lyst):</strong> Kraften kommer indefra barnet selv. Det er et ønske eller en vilje, der trækker i retning af maden.';
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
            explanation = '<strong>KAN (Evne/Potentiale):</strong> Barnet har energien og evnen til at udføre handlingen. Det er en indre ressource.';
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
            .viz-placeholder {
                opacity: 0.4;
                font-style: italic;
            }
            .modal-interaction {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                margin: 2rem 0;
                font-size: 1.8rem;
                font-weight: 700;
            }
            .modal-select {
                font-size: 1.5rem !important;
                padding: 0.5rem 1rem !important;
                background: var(--bg-deep-red) !important;
                border-radius: 12px !important;
                color: white !important;
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
            .force-explanation.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .sentence-part {
                color: rgba(255,255,255,0.9);
            }
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
