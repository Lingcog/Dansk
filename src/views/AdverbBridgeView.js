import { getTranslation, appState } from '../utils/i18n.js';

export function renderAdverbBridgeView(container, navigateFn, extraData = {}) {
    const nounAnchor = extraData.nounAnchor || appState.nounAnchor || 'Et';
    const selectedNoun = extraData.selectedNoun || appState.selectedNoun || 'barn';
    const selectedVerb = extraData.selectedVerb || appState.selectedVerb || 'spiser';

    // Default adverb choice
    let selectedAdverb = 'langsomt';

    container.innerHTML = `
        <div class="grounding-container animate-in">
            <div class="header-section">
                <button class="back-btn" id="back-to-adj">←</button>
                <h1>${getTranslation('adverbTitle')}</h1>
                <p class="subtitle">${getTranslation('adverbDesc')}</p>
            </div>

            <div class="bridge-exercise-area">
                <div class="adverb-visual-section">
                    <div class="projector-container">
                        <div class="label">${getTranslation('projektørLabel')}</div>
                        <div class="svg-container" id="adv-projector-svg"></div>
                    </div>

                    <div class="handling-container">
                        <div class="handling-box" id="verb-box">
                            <div class="box-label">${getTranslation('handlingLabel')}</div>
                            <div class="box-word">${selectedVerb}</div>
                        </div>
                        
                        <!-- Dynamic Waves Container -->
                        <div class="waves-interaction-area" id="waves-container"></div>

                        <div class="adverb-box" id="active-adv-box">
                            <div class="box-label">${getTranslation('adverb')}</div>
                            <div class="box-word" id="active-adverb">${getTranslation('advLangsomt')}</div>
                        </div>
                    </div>
                </div>

                <div class="sentence-display">
                    <span class="noun-anchor">${nounAnchor}</span>
                    <span class="adjective-part" id="sentence-adj">stort</span>
                    <span class="noun-part">${selectedNoun}</span>
                    <span class="verb-part" id="verb-display">${selectedVerb}</span>
                    <div class="adverb-drop-zone">
                        <select id="adverb-select" class="grammatik-select premium-select">
                            <option value="langsomt">${getTranslation('advLangsomt')}</option>
                            <option value="hurtigt">${getTranslation('advHurtigt')}</option>
                            <option value="meget">${getTranslation('advMeget')}</option>
                            <option value="lidt">${getTranslation('advLidt')}</option>
                        </select>
                    </div>
                </div>

                <div class="force-explanation visible" id="adverb-expl-box">
                    ${getTranslation('adverbExpl')}
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${getTranslation('adverbTeaserNext')}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-conjunction-btn">${getTranslation('nextStepAfterAdverb')}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${getTranslation('back')}</button>
                </div>
            </div>
        </div>
    `;

    const backBtn = container.querySelector('#back-to-adj');
    const finishBtn = container.querySelector('#finish-btn');
    const advSelect = container.querySelector('#adverb-select');
    const activeAdvDisplay = container.querySelector('#active-adverb');
    const wavesContainer = container.querySelector('#waves-container');
    const projectorSvg = container.querySelector('#adv-projector-svg');
    const sentenceAdj = container.querySelector('#sentence-adj');

    // Initial Projector Render
    projectorSvg.innerHTML = `
        <svg viewBox="0 0 200 120" class="projector-svg-main">
            <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
            <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
            <path id="adv-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
        </svg>
    `;

    // Inflect adjective for the display based on nounAnchor
    const inflectAdj = (anchor) => {
        if (anchor === 'Et') return 'stort';
        if (anchor === 'Det' || anchor === 'Mit') return 'store';
        return 'stort';
    };
    sentenceAdj.textContent = inflectAdj(nounAnchor);

    function updateWaves(adverb) {
        let speed = "1.5s";
        let waveCount = 3;
        let color = "#ffeb3b";
        let strokeWidth = 2;

        if (adverb === 'hurtigt') {
            speed = "0.4s";
            color = "#4caf50";
            waveCount = 5;
        } else if (adverb === 'langsomt') {
            speed = "3.5s";
            color = "#2196f3";
            waveCount = 2;
        } else if (adverb === 'meget') {
            speed = "1s";
            color = "#f44336";
            waveCount = 8;
            strokeWidth = 4;
        } else if (adverb === 'lidt') {
            speed = "2s";
            color = "#9e9e9e";
            waveCount = 1;
            strokeWidth = 1;
        }

        let paths = "";
        for (let i = 0; i < waveCount; i++) {
            const offset = (i - (waveCount - 1) / 2) * 10;
            const y = 30 + offset;
            paths += `
                <path d="M 10 ${y} Q 50 ${y - 10} 90 ${y} T 170 ${y}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" opacity="0.7">
                    <animate attributeName="d" values="M 10 ${y} Q 50 ${y - 10} 90 ${y} T 170 ${y}; M 10 ${y} Q 50 ${y + 10} 90 ${y} T 170 ${y}; M 10 ${y} Q 50 ${y - 10} 90 ${y} T 170 ${y}" dur="${speed}" repeatCount="infinite" />
                </path>
            `;
        }

        wavesContainer.innerHTML = `
            <svg viewBox="0 0 180 60" style="width: 100%; height: 60px;">
                ${paths}
            </svg>
        `;

        // Update beam color to match
        const beam = projectorSvg.querySelector('#adv-beam');
        if (beam) {
            beam.style.fill = color.replace(')', ', 0.4)').replace('#', 'rgba('); // Simple color mapping helper would be better but this works for basic shades
            // Actually just set it directly for reliability
            const beamColors = {
                'hurtigt': 'rgba(76, 175, 80, 0.4)',
                'langsomt': 'rgba(33, 150, 243, 0.4)',
                'meget': 'rgba(244, 67, 54, 0.4)',
                'lidt': 'rgba(158, 158, 158, 0.4)'
            };
            beam.style.fill = beamColors[adverb] || 'rgba(255, 235, 59, 0.4)';
        }
    }

    advSelect.onchange = (e) => {
        selectedAdverb = e.target.value;
        activeAdvDisplay.textContent = getTranslation('adv' + selectedAdverb.charAt(0).toUpperCase() + selectedAdverb.slice(1));
        updateWaves(selectedAdverb);

        // Pulse effect
        activeAdvDisplay.parentElement.classList.add('pulse');
        setTimeout(() => activeAdvDisplay.parentElement.classList.remove('pulse'), 500);
    };

    backBtn.onclick = () => navigateFn('adjective_bridge');
    finishBtn.onclick = () => navigateFn('dagens_opgave');

    const nextConjBtn = container.querySelector('#next-conjunction-btn');
    nextConjBtn.onclick = () => navigateFn('conjunction_bridge', {
        nounAnchor,
        selectedNoun,
        selectedVerb,
        selectedAdverb,
        adjectivePart: sentenceAdj.textContent
    });

    // Initial wave state
    updateWaves(selectedAdverb);

    // Styles
    if (!document.getElementById('adverb-bridge-styles')) {
        const styles = document.createElement('style');
        styles.id = 'adverb-bridge-styles';
        styles.textContent = `
            .sentence-display {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 0.8rem;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 2.5rem 0;
                padding: 1.5rem;
                background: rgba(255,255,255,0.03);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .sentence-display { font-size: 1.1rem; padding: 1rem; gap: 0.5rem; margin: 1.5rem 0; }
            }
            .adverb-drop-zone {
                min-width: 120px;
            }
            @media (max-width: 600px) {
                .adverb-drop-zone { min-width: 90px; }
            }
            .premium-select {
                background: #4caf50 !important;
                color: white;
                padding: 0.3rem 0.6rem !important;
                border-radius: 10px !important;
                font-size: 1.3rem !important;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
                transition: all 0.3s ease;
            }
            @media (max-width: 600px) {
                .premium-select { font-size: 1rem !important; padding: 0.2rem 0.4rem !important; border-radius: 6px !important; }
            }
            .premium-select:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
            }

            .adverb-visual-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                margin: 2.5rem 0;
            }
            @media (max-width: 600px) {
                .adverb-visual-section { gap: 1rem; margin: 1.5rem 0; }
            }
            .projector-svg-main {
                width: 180px;
                height: 100px;
            }
            @media (max-width: 600px) {
                .projector-svg-main { width: 140px; height: 80px; }
            }
            .handling-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                width: 100%;
                max-width: 800px;
                background: rgba(0,0,0,0.2);
                padding: 2.5rem 1.5rem;
                border-radius: 30px;
                position: relative;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .handling-container { padding: 1.5rem 1rem; border-radius: 20px; gap: 0.5rem; }
            }
            .handling-box, .adverb-box {
                background: rgba(255,255,255,0.05);
                padding: 1.2rem 1.5rem;
                border-radius: 16px;
                min-width: 120px;
                text-align: center;
                z-index: 2;
                border: 1px solid rgba(255,255,255,0.1);
                flex: 1;
                max-width: 160px;
            }
            @media (max-width: 600px) {
                .handling-box, .adverb-box { padding: 0.8rem 1rem; min-width: 90px; }
            }
            .handling-box {
                background: #6b0f1a;
            }
            .adverb-box {
                background: linear-gradient(135deg, rgba(255, 235, 59, 0.1), rgba(255, 235, 59, 0.2));
                border-color: rgba(255, 235, 59, 0.3);
            }
            .box-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-bottom: 0.4rem;
            }
            .box-word {
                font-size: 1.5rem;
                font-weight: 800;
            }
            @media (max-width: 600px) {
                .box-word { font-size: 1.1rem; }
            }
            .waves-interaction-area {
                flex: 1;
                height: 60px;
                z-index: 1;
            }
            .pulse {
                animation: box-pulse 0.5s ease;
            }
            @keyframes box-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .force-explanation {
                background: rgba(255, 255, 255, 0.08);
                padding: 2rem;
                border-radius: 20px;
                line-height: 1.6;
                font-size: 1.1rem;
                text-align: left;
                margin: 1.5rem auto;
                max-width: 600px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .force-explanation { padding: 1.2rem; font-size: 0.95rem; margin: 1rem auto; }
            }
        `;
        document.head.appendChild(styles);
    }
}
