import { getTranslation, appState } from '../utils/i18n.js';

export function renderConjunctionBridgeView(container, navigateFn, extraData = {}) {
    const nounAnchor = extraData.nounAnchor || appState.nounAnchor || 'Et';
    const selectedNoun = extraData.selectedNoun || appState.selectedNoun || 'barn';
    const selectedVerb = extraData.selectedVerb || appState.selectedVerb || 'spiser';
    const selectedAdverb = extraData.selectedAdverb || appState.selectedAdverb || 'langsomt';
    const adjectivePart = extraData.adjectivePart || 'stort';

    let selectedConj = 'fordi';

    container.innerHTML = `
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adv">←</button>
                <h1>${getTranslation('conjunctionTitle')}</h1>
                <p class="subtitle">${getTranslation('conjunctionDesc')}</p>
            </div>

            <div class="bridge-exercise-area">
                <div class="conjunction-visual-section">
                    <div class="flow-container" id="flow-visual-area">
                        <div class="sentence-node" id="node-1">${getTranslation('sentenceNode1')}</div>
                        <div class="flow-path-wrapper">
                            <div class="conj-label" id="conj-indicator">${getTranslation('conjFordi')}</div>
                            
                            <!-- Main SVG Container -->
                            <svg class="flow-svg" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orientation="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                                    </marker>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                        <feMerge>
                                            <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>

                                <!-- Timeline (for Da/Når) -->
                                <line id="timeline-base" x1="50" y1="60" x2="350" y2="60" stroke="white" stroke-width="1" stroke-dasharray="4" opacity="0" />
                                
                                <!-- Obstacle (for Alligevel/Selvom) -->
                                <g id="obstacle-group" opacity="0">
                                    <rect id="obs-part-1" x="195" y="30" width="10" height="30" fill="rgba(255,255,255,0.3)" />
                                    <rect id="obs-part-2" x="195" y="60" width="10" height="30" fill="rgba(255,255,255,0.3)" />
                                </g>

                                <!-- Main Activity Path -->
                                <path id="flow-path" d="M 0 60 L 400 60" fill="none" stroke="#4caf50" stroke-width="4" filter="url(#glow)" />
                                
                                <!-- Clock Icon (for Da/Når) -->
                                <g id="clock-group" opacity="0">
                                    <circle cx="0" cy="0" r="15" fill="none" stroke="white" stroke-width="2" />
                                    <line x1="0" y1="0" x2="0" y2="-10" stroke="white" stroke-width="2" id="clock-hand-1" />
                                    <line x1="0" y1="0" x2="7" y2="0" stroke="white" stroke-width="1" id="clock-hand-2" />
                                </g>

                                <!-- moving arrow head -->
                                <g id="moving-arrow" opacity="0">
                                    <polygon points="-10,-5 2,0 -10,5" fill="currentColor" />
                                </g>
                            </svg>
                        </div>
                        <div class="sentence-node" id="node-2">${getTranslation('sentenceNode2')}</div>
                    </div>
                </div>

                <div class="full-sentence-display">
                    <div class="sentence-part-1">
                        <span class="noun-anchor">${nounAnchor}</span>
                        <span class="adjective-part">${adjectivePart}</span>
                        <span class="noun-part">${selectedNoun}</span>
                        <span class="verb-part">${selectedVerb}</span>
                        <span class="adverb-part">${selectedAdverb}</span>
                    </div>
                    
                    <div class="conjunction-part">
                        <span id="punctuation-before">,</span>
                        <select id="conjunction-select" class="grammatik-select premium-select conj-select">
                            <option value="fordi">${getTranslation('conjFordi')}</option>
                            <option value="når">${getTranslation('conjNaar')}</option>
                            <option value="da">${getTranslation('conjDa')}</option>
                            <option value="selvom">${getTranslation('conjSelvom')}</option>
                            <option value="alligevel">${getTranslation('conjAlligevel')}</option>
                            <option value="men">${getTranslation('conjMen')}</option>
                            <option value="Derfor">${getTranslation('conjDerfor')}</option>
                        </select>
                    </div>
                </div>

                <div class="force-explanation visible" id="conj-expl-box">
                    ${getTranslation('conjunctionExpl')}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${getTranslation('practiceMoreTitle')}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="conj-practice-link">
                            <span class="icon">🔗</span>
                            ${getTranslation('conjunctionPracticeLink')}
                        </a>
                    </div>
                </div>

                <p class="reflection-text animate-in" style="margin-top: 2rem; color: var(--text-muted); font-style: italic; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                    ${getTranslation('conjunctionClosingReflection')}
                </p>

                <div class="navigation-controls" style="margin-top: 4rem;">
                    <button class="gemini-btn spotlight-btn" id="finish-btn">${getTranslation('nextStepAfterConjunction')}</button>
                </div>
            </div>
        </div>
    `;

    const backBtn = container.querySelector('#back-to-adv');
    const finishBtn = container.querySelector('#finish-btn');
    const conjSelect = container.querySelector('#conjunction-select');
    const punctuation = container.querySelector('#punctuation-before');
    const practiceLink = container.querySelector('#conj-practice-link');

    // SVG Elements
    const flowPath = container.querySelector('#flow-path');
    const conjIndicator = container.querySelector('#conj-indicator');
    const clockGroup = container.querySelector('#clock-group');
    const timelineBase = container.querySelector('#timeline-base');
    const obstacleGroup = container.querySelector('#obstacle-group');
    const obsPart1 = container.querySelector('#obs-part-1');
    const obsPart2 = container.querySelector('#obs-part-2');
    const movingArrow = container.querySelector('#moving-arrow');

    function updateConjUI(conj) {
        selectedConj = conj;
        conjIndicator.textContent = getTranslation('conj' + conj.charAt(0).toUpperCase() + conj.slice(1));

        const explBox = container.querySelector('#conj-expl-box');
        if (explBox) {
            explBox.innerHTML = getTranslation(`conjExpl_${conj.toLowerCase()}`);
        }

        // Reset visibility
        clockGroup.style.opacity = "0";
        timelineBase.style.opacity = "0";
        obstacleGroup.style.opacity = "0";
        movingArrow.style.opacity = "0";
        obsPart1.setAttribute('y', '30');
        obsPart2.setAttribute('y', '60');
        flowPath.style.opacity = "1";
        flowPath.style.strokeDasharray = "none";
        flowPath.classList.remove('animate-flow-lr', 'animate-flow-rl', 'animate-flow-break');

        // Punctuation logic
        if (conj === 'Derfor') {
            punctuation.textContent = '.';
            punctuation.style.marginRight = '1rem';
        } else {
            punctuation.textContent = ',';
            punctuation.style.marginRight = '0.5rem';
        }

        let color = "#4caf50";
        let pathD = "M 50 60 L 350 60";
        let hasArrow = true;

        if (conj === 'fordi') {
            color = "#4caf50";
            pathD = "M 50 60 L 350 60";
            flowPath.classList.add('animate-flow-lr');
        } else if (conj === 'Derfor') {
            color = "#4caf50";
            pathD = "M 350 60 L 50 60";
            flowPath.classList.add('animate-flow-rl');
        } else if (conj === 'da') {
            color = "#2196f3";
            timelineBase.style.opacity = "0.5";
            clockGroup.style.opacity = "1";
            clockGroup.classList.add('animate-clock-past');
            flowPath.style.opacity = "0";
            hasArrow = false;
        } else if (conj === 'når') {
            color = "#2196f3";
            timelineBase.style.opacity = "0.5";
            clockGroup.style.opacity = "1";
            clockGroup.classList.add('animate-clock-future');
            flowPath.style.opacity = "0";
            hasArrow = false;
        } else if (conj === 'alligevel') {
            color = "#ff9800";
            obstacleGroup.style.opacity = "1";
            flowPath.classList.add('animate-flow-lr');
        } else if (conj === 'selvom') {
            color = "#f44336";
            obstacleGroup.style.opacity = "1";
            flowPath.classList.add('animate-flow-break');
            obsPart1.classList.add('animate-split-up');
            obsPart2.classList.add('animate-split-down');
        } else if (conj === 'men') {
            color = "#f44336";
            pathD = "M 50 60 Q 200 10 350 60";
            flowPath.classList.add('animate-flow-lr');
        }

        if (flowPath) {
            flowPath.setAttribute('d', pathD);
            flowPath.setAttribute('stroke', color);

            // Reset and trigger animation
            flowPath.style.animation = 'none';
            flowPath.offsetHeight; // trigger reflow
            flowPath.style.animation = null;
        }

        if (hasArrow && movingArrow) {
            movingArrow.style.opacity = "1";
            movingArrow.style.color = color;
            // Complete clear and replace to force animation restart
            movingArrow.innerHTML = `
                <polygon points="-12,-6 2,0 -12,6" fill="currentColor" />
                <animateMotion dur="1.5s" repeatCount="infinite" path="${pathD}" rotate="auto" />
            `;
        }

        // Feedback pulse
        conjIndicator.style.background = color;
        conjIndicator.classList.add('pulse');
        setTimeout(() => conjIndicator.classList.remove('pulse'), 500);
    }

    conjSelect.onchange = (e) => {
        // Remove old animation classes from groups
        clockGroup.classList.remove('animate-clock-past', 'animate-clock-future');
        obsPart1.classList.remove('animate-split-up');
        obsPart2.classList.remove('animate-split-down');
        updateConjUI(e.target.value);
    };

    backBtn.onclick = () => navigateFn('adverb_bridge', {
        nounAnchor, selectedNoun, selectedVerb, selectedAdverb, adjectivePart
    });
    finishBtn.onclick = () => navigateFn('dagens_opgave');

    practiceLink.onclick = (e) => {
        e.preventDefault();
        navigateFn('traen_grammatik');
    };

    // Initial state
    updateConjUI(selectedConj);

    // Styles
    if (!document.getElementById('conj-bridge-styles')) {
        const styles = document.createElement('style');
        styles.id = 'conj-bridge-styles';
        styles.textContent = `
            .recommendation-box {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 24px;
                padding: 2rem;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
                margin: 0 auto;
                max-width: 600px;
            }
            @media (max-width: 600px) {
                .recommendation-box { padding: 1.5rem; border-radius: 16px; }
            }
            .rec-title {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-muted);
                margin-bottom: 1.2rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .rec-links {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }
            .rec-link {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                background: rgba(255, 255, 255, 0.08);
                padding: 1rem 1.5rem;
                border-radius: 16px;
                text-decoration: none;
                color: white;
                font-size: 1.15rem;
                font-weight: 600;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                max-width: 400px;
            }
            @media (max-width: 600px) {
                .rec-link { font-size: 1rem; padding: 0.8rem 1.2rem; }
            }
            .rec-link:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-3px);
                border-color: #4caf50;
            }
            .rec-link .icon {
                font-size: 1.4rem;
            }

            .conjunction-visual-section {
                margin: 1.5rem 0;
                background: rgba(0,0,0,0.2);
                padding: 1.5rem;
                border-radius: 30px;
                border: 1px solid rgba(255,255,255,0.05);
                height: 160px;
                display: flex;
                align-items: center;
            }
            @media (max-width: 600px) {
                .conjunction-visual-section { padding: 1rem; border-radius: 20px; height: 120px; margin: 1rem 0; }
            }
            .flow-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 0.5rem;
                width: 100%;
            }
            .sentence-node {
                background: rgba(255,255,255,0.05);
                padding: 0.8rem;
                border-radius: 10px;
                border: 1px solid rgba(255,255,255,0.1);
                font-weight: 600;
                min-width: 80px;
                text-align: center;
                color: rgba(255,255,255,0.7);
                font-size: 0.8rem;
            }
            @media (max-width: 600px) {
                .sentence-node { padding: 0.5rem; min-width: 60px; font-size: 0.7rem; }
            }
            .flow-path-wrapper {
                flex-grow: 1;
                position: relative;
                height: 100px;
            }
            @media (max-width: 600px) {
                .flow-path-wrapper { height: 60px; }
            }
            .flow-svg {
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .conj-label {
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: #4caf50;
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 1rem;
                font-weight: 700;
                box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 10;
            }
            @media (max-width: 600px) {
                .conj-label { font-size: 0.85rem; padding: 0.2rem 0.6rem; top: -10px; }
            }
            
            /* Animations */
            .animate-flow-lr {
                stroke-dasharray: 400;
                stroke-dashoffset: 400;
                animation: draw 1.5s ease-out forwards infinite;
            }
            .animate-flow-rl {
                stroke-dasharray: 400;
                stroke-dashoffset: -400;
                animation: draw-back 1.5s ease-out forwards infinite;
            }
            @keyframes draw { to { stroke-dashoffset: 0; } }
            @keyframes draw-back { to { stroke-dashoffset: 0; } }

            .animate-clock-past {
                animation: move-left 3s ease-in-out infinite;
            }
            .animate-clock-future {
                animation: move-right 3s ease-in-out infinite;
            }
            @keyframes move-left {
                0% { transform: translate(200px, 60px) rotate(0deg); }
                100% { transform: translate(50px, 60px) rotate(-360deg); }
            }
            @keyframes move-right {
                0% { transform: translate(200px, 60px) rotate(0deg); }
                100% { transform: translate(350px, 60px) rotate(360deg); }
            }

            .animate-split-up {
                animation: split-up 1s ease forwards;
            }
            .animate-split-down {
                animation: split-down 1s ease forwards;
            }
            @keyframes split-up { to { transform: translateY(-25px); opacity: 0.5; } }
            @keyframes split-down { to { transform: translateY(25px); opacity: 0.5; } }

            .animate-flow-break {
                stroke-dasharray: 400;
                stroke-dashoffset: 400;
                animation: draw 2s linear forwards infinite;
            }

            .full-sentence-display {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 0.4rem;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 2rem 0;
                padding: 2rem;
                background: rgba(255,255,255,0.03);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.05);
                line-height: 1.4;
            }
            @media (max-width: 600px) {
                .full-sentence-display { font-size: 1.1rem; padding: 1.2rem; margin: 1.5rem 0; }
            }
            .conj-select {
                margin: 0 0.5rem;
            }
            .sentence-part-2 {
                color: #ffeb3b;
            }
            .pulse {
                animation: conj-pulse 0.5s ease;
            }
            @keyframes conj-pulse {
                0% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.1); }
                100% { transform: translateX(-50%) scale(1); }
            }
        `;
        document.head.appendChild(styles);
    }
}
