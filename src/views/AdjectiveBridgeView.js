import { getTranslation, appState } from '../utils/i18n.js';

export function renderAdjectiveBridgeView(container, navigateFn, inheritedState = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjective-bridge-view';

    const state = {
        nounAnchor: inheritedState.nounAnchor || 'Et',
        selectedModal: inheritedState.selectedModal || 'skal',
        selectedAdjective: ''
    };

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('modal_force', {
        nounAnchor: state.nounAnchor,
        selectedModal: state.selectedModal
    });
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('adjectiveTitle');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('adjectiveDesc');
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);

    const exerciseArea = document.createElement('div');
    exerciseArea.className = 'exercise-container';
    viewContainer.appendChild(exerciseArea);

    function renderExercise() {
        exerciseArea.innerHTML = `
            <div class="step-content animate-in">
                <div class="adjective-visual">
                    <div class="projector-container">
                        <div class="label">${getTranslation('adjectiveLabel')}</div>
                        <div class="svg-container" id="adj-projector-svg"></div>
                    </div>
                    
                    <div class="adjective-interaction">
                        <div class="sentence-preview" id="adj-sentence-preview">
                            <span class="sentence-part">${state.nounAnchor}</span>
                            <select class="grammatik-select adj-select" id="adj-select">
                                <option value="">???</option>
                                <!-- Dynamic options inserted here -->
                            </select>
                            <span class="sentence-part">barn <span id="adj-modal-inherited">${state.selectedModal}</span> spise</span>
                        </div>
                    </div>
                </div>

                <div class="force-explanation" id="adj-expl"></div>

                <div class="navigation-controls" style="margin-top: 3rem;" id="agreement-nav">
                    <button class="gemini-btn spotlight-btn" id="next-agreement-btn">${getTranslation('whyConjugateAdjectives')}</button>
                </div>
            </div>

            <div id="agreement-section" class="step-content animate-in" style="display: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4rem; margin-top: 3rem;">
                <h2 style="margin-top: 0;">${getTranslation('agreementTitle')}</h2>
                <p class="subtitle" style="margin-bottom: 3rem;">${getTranslation('agreementDesc')}</p>

                <div class="agreement-visual">
                    <div class="magnet-container">
                        <div class="adjective-shape-box" id="adj-shaped">
                        <div class="shape-label">${getTranslation('adjective')}</div>
                            <div class="word-container">
                                <span class="stem">stor</span><span class="suffix" id="adj-suffix">x</span>
                            </div>
                        </div>

                        <!-- Magnetic Waves SVG -->
                        <div class="magnet-waves" id="magnet-waves-svg"></div>

                        <div class="noun-influence-box" id="noun-magnet">
                            <div class="magnet-label">${getTranslation('noun')}</div>
                            <div class="magnet-word" id="magnet-noun-display">Barn</div>
                        </div>
                    </div>

                    <div class="agreement-controls">
                        <div class="control-group">
                            <button class="toggle-btn active" data-type="ubestemt">${getTranslation('ubestemtLabel')}</button>
                            <button class="toggle-btn" data-type="bestemt">${getTranslation('bestemtLabel')}</button>
                        </div>
                        <div class="control-group" style="margin-top: 1rem;">
                            <button class="toggle-btn active" data-word="barn">${getTranslation('exampleBarn')}</button>
                            <button class="toggle-btn" data-word="bil">${getTranslation('exampleBil')}</button>
                        </div>
                    </div>
                </div>

                <div class="force-explanation visible" id="agreement-expl-box">
                    ${getTranslation('agreementExpl')}
                </div>

                <div class="recommendation-box animate-in" style="margin-top: 4rem;">
                    <div class="rec-title">${getTranslation('practiceMoreTitle')}</div>
                    <div class="rec-links">
                        <a href="#" class="rec-link" id="adj-comp-link">
                            <span class="icon">📈</span>
                            ${getTranslation('adjectiveComparisonLink')}
                        </a>
                    </div>
                </div>

                <div class="adverb-teaser animate-in" style="margin-top: 5rem; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: #ffffff;">${getTranslation('adverbTeaser')}</h3>
                    <div class="navigation-controls">
                        <button class="gemini-btn spotlight-btn" id="next-adverb-btn">${getTranslation('nextStepAdverb')}</button>
                    </div>
                </div>

                <div class="navigation-controls" style="margin-top: 4rem; opacity: 0.5;">
                    <button class="back-btn" id="finish-btn" style="margin: 0 auto;">${getTranslation('back')}</button>
                </div>
            </div>
        `;

        const projectorSvg = exerciseArea.querySelector('#adj-projector-svg');
        const adjSelect = exerciseArea.querySelector('#adj-select');
        const adjExpl = exerciseArea.querySelector('#adj-expl');
        const finishBtn = exerciseArea.querySelector('#finish-btn');
        const nextAgreementBtn = exerciseArea.querySelector('#next-agreement-btn');

        projectorSvg.innerHTML = `
            <svg viewBox="0 0 200 120" class="projector-svg-main">
                <rect x="20" y="40" width="60" height="40" rx="4" fill="#444" stroke="white" stroke-width="2" />
                <circle cx="40" cy="60" r="12" fill="#333" stroke="white" />
                <!-- Beam -->
                <path id="adj-beam" d="M 80 60 L 180 20 L 180 100 Z" fill="rgba(255, 235, 59, 0.4)" style="transition: all 0.5s ease;" />
                <!-- Highlighted area (Kugle) -->
                <circle id="adj-target-circle" cx="180" cy="60" r="35" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1" style="transition: all 0.8s ease;" />
            </svg>
        `;

        const adjectives = [
            { id: 'stor', forms: { en: 'stor', et: 'stort', def: 'store' } },
            { id: 'træt', forms: { en: 'træt', et: 'træt', def: 'trætte' } },
            { id: 'smuk', forms: { en: 'smuk', et: 'smukt', def: 'smukke' } }
        ];

        const isDefinite = state.nounAnchor !== 'Et' && state.nounAnchor !== 'En';
        const type = isDefinite ? 'def' : (state.nounAnchor === 'Et' ? 'et' : 'en');

        adjSelect.innerHTML += adjectives.map(adj =>
            `<option value="${adj.forms[type]}" data-base="${adj.id}">${adj.forms[type]}</option>`
        ).join('');

        adjSelect.onchange = () => {
            const selectedOpt = adjSelect.options[adjSelect.selectedIndex];
            const adj = selectedOpt.dataset.base;
            const result = adjSelect.value;

            if (!adj) return;

            state.selectedAdjective = result;
            adjExpl.innerHTML = `
                <div class="agreement-notice">
                    <strong>${state.nounAnchor} ${result} barn...</strong><br>
                    ${getTranslation('adjectiveExpl')}
                </div>
            `;
            adjExpl.className = 'force-explanation visible';

            const beam = exerciseArea.querySelector('#adj-beam');
            const targetCircle = exerciseArea.querySelector('#adj-target-circle');

            // Map adjectives to colors
            const colorMap = {
                'stor': { beam: 'rgba(76, 175, 80, 0.5)', circle: 'rgba(76, 175, 80, 0.4)' },
                'træt': { beam: 'rgba(100, 149, 237, 0.5)', circle: 'rgba(100, 149, 237, 0.4)' },
                'smuk': { beam: 'rgba(255, 105, 180, 0.6)', circle: 'rgba(255, 105, 180, 0.5)' }
            };

            const colors = colorMap[adj] || { beam: 'rgba(255, 255, 255, 0.4)', circle: 'rgba(255, 255, 255, 0.2)' };

            beam.style.fill = colors.beam;
            targetCircle.style.fill = colors.circle;
            targetCircle.setAttribute('r', '40');
            setTimeout(() => targetCircle.setAttribute('r', '35'), 500);
        };

        finishBtn.onclick = () => navigateFn('dagens_opgave');

        const adjCompLink = exerciseArea.querySelector('#adj-comp-link');
        adjCompLink.onclick = (e) => {
            e.preventDefault();
            navigateFn('adjective_comparison');
        };

        const nextAdverbBtn = exerciseArea.querySelector('#next-adverb-btn');
        nextAdverbBtn.onclick = () => {
            navigateFn('adverb_bridge', {
                nounAnchor: state.nounAnchor,
                selectedNoun: state.selectedNoun || 'barn',
                selectedVerb: state.selectedVerb || 'spiser',
                isPlural: state.isPlural || false
            });
        };

        nextAgreementBtn.onclick = () => {
            const section = exerciseArea.querySelector('#agreement-section');
            section.style.display = 'block';
            renderAgreementLogic();
            nextAgreementBtn.style.display = 'none';
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        };
    }

    function renderAgreementLogic() {
        const wavesSvg = exerciseArea.querySelector('#magnet-waves-svg');
        const nounDisplay = exerciseArea.querySelector('#magnet-noun-display');
        const suffixDisplay = exerciseArea.querySelector('#adj-suffix');
        const stemDisplay = exerciseArea.querySelector('.stem');
        const toggles = exerciseArea.querySelectorAll('.toggle-btn');

        let currentWord = 'barn';
        let currentType = 'ubestemt';

        function updateWaves() {
            const color = currentType === 'bestemt' ? '#4caf50' : 'rgba(255,255,255,0.5)';
            const opacity = currentType === 'bestemt' ? '1.0' : '0.4';
            const strokeWidth = currentType === 'bestemt' ? '4' : '2';

            // Flow from Right (Noun) to Left (Adjective)
            wavesSvg.innerHTML = `
                <svg viewBox="0 0 200 60" style="width: 100%; height: 60px;">
                    <path d="M 180 10 Q 100 10 20 10" fill="none" stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}" stroke-dasharray="10,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="15" dur="1s" repeatCount="infinite" />
                    </path>
                    <path d="M 180 30 Q 100 30 20 30" fill="none" stroke="${color}" stroke-width="${parseInt(strokeWidth) + 1}" opacity="${opacity}">
                        <animate attributeName="d" values="M 180 30 Q 100 30 20 30; M 180 30 Q 100 40 20 30; M 180 30 Q 100 30 20 30" dur="1.5s" repeatCount="infinite" />
                    </path>
                    <path d="M 180 50 Q 100 50 20 50" fill="none" stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}" stroke-dasharray="10,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="-15" dur="1.2s" repeatCount="infinite" />
                    </path>
                </svg>
            `;
        }

        function updateState() {
            // Noun word handling - keep roots only as requested
            if (currentWord === 'barn') {
                nounDisplay.textContent = getTranslation('exampleBarn').split(' ')[0];
                stemDisplay.textContent = 'stor';
                if (currentType === 'bestemt') {
                    suffixDisplay.textContent = 'e';
                    suffixDisplay.classList.add('active');
                } else {
                    suffixDisplay.textContent = 't';
                    suffixDisplay.classList.add('active');
                }
            } else {
                nounDisplay.textContent = getTranslation('exampleBil').split(' ')[0];
                stemDisplay.textContent = 'hurtig';
                if (currentType === 'bestemt') {
                    suffixDisplay.textContent = 'e';
                    suffixDisplay.classList.add('active');
                } else {
                    suffixDisplay.textContent = '';
                    suffixDisplay.classList.remove('active');
                }
            }
            updateWaves();
        }

        toggles.forEach(btn => {
            btn.onclick = () => {
                const parent = btn.parentElement;
                parent.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (btn.dataset.type) currentType = btn.dataset.type;
                if (btn.dataset.word) currentWord = btn.dataset.word;

                updateState();
            };
        });

        updateState();
    }

    renderExercise();

    if (!document.getElementById('adj-bridge-styles')) {
        const styles = document.createElement('style');
        styles.id = 'adj-bridge-styles';
        styles.textContent = `
            .adjective-bridge-view .adjective-visual {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                margin: 2rem 0;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .adjective-bridge-view .adjective-visual { gap: 1rem; margin: 1.5rem 0; }
            }
            .projector-svg-main {
                width: 180px;
                height: 100px;
            }
            @media (max-width: 600px) {
                .projector-svg-main { width: 140px; height: 80px; }
            }
            .adj-interaction {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                max-width: 450px;
            }
            @media (max-width: 600px) {
                .adj-interaction { padding: 1rem; border-radius: 16px; }
            }
            .sentence-preview {
                font-size: 1.5rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.8rem;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .sentence-preview { font-size: 1.1rem; gap: 0.5rem; }
            }
            .adj-select {
                font-size: 1.3rem !important;
                padding: 0.3rem 0.6rem !important;
                background: #4caf50 !important;
                border-radius: 10px !important;
            }
            @media (max-width: 600px) {
                .adj-select { font-size: 1rem !important; padding: 0.2rem 0.4rem !important; border-radius: 6px !important; }
            }
            .force-explanation {
                background: rgba(255, 255, 255, 0.08);
                padding: 2rem;
                border-radius: 20px;
                line-height: 1.6;
                font-size: 1.1rem;
                text-align: left;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.5s ease;
                margin: 1.5rem auto;
                max-width: 600px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .force-explanation { padding: 1.2rem; font-size: 0.95rem; margin: 1rem auto; }
            }
            .force-explanation.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .agreement-notice {
                font-size: 1.15rem;
            }
            @media (max-width: 600px) {
                .agreement-notice { font-size: 1rem; }
                .agreement-notice strong { font-size: 1.2rem; }
            }
            .agreement-notice strong {
                color: #4caf50;
                font-size: 1.3rem;
            }

            /* Agreement Interaction Styles */
            .agreement-visual {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2.5rem;
                margin: 3rem 0;
            }
            @media (max-width: 600px) {
                .agreement-visual { gap: 1.5rem; margin: 2rem 0; }
            }
            .magnet-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                width: 100%;
                max-width: 600px;
                background: rgba(0,0,0,0.2);
                padding: 2.5rem 1.5rem;
                border-radius: 30px;
                position: relative;
                border: 1px solid rgba(255,255,255,0.05);
            }
            @media (max-width: 600px) {
                .magnet-container { padding: 1.5rem 1rem; border-radius: 20px; }
            }
            .noun-influence-box {
                background: #6b0f1a;
                padding: 1.2rem 1.5rem;
                border-radius: 16px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 2;
                min-width: 120px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            @media (max-width: 600px) {
                .noun-influence-box { padding: 0.8rem 1rem; min-width: 90px; }
            }
            .magnet-label, .shape-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-bottom: 0.4rem;
            }
            .magnet-word {
                font-size: 1.5rem;
                font-weight: 800;
            }
            @media (max-width: 600px) {
                .magnet-word { font-size: 1.2rem; }
            }
            .magnet-waves {
                flex: 1;
                height: 60px;
                pointer-events: none;
                z-index: 1;
            }
            .adjective-shape-box {
                background: rgba(255,255,255,0.05);
                padding: 1.2rem 1.5rem;
                border-radius: 16px;
                border: 2px dashed rgba(255,255,255,0.2);
                min-width: 150px;
                text-align: center;
                transition: all 0.5s ease;
                z-index: 2;
            }
            @media (max-width: 600px) {
                .adjective-shape-box { padding: 0.8rem 1rem; min-width: 110px; }
            }
            .word-container {
                font-size: 1.8rem;
                font-weight: 800;
            }
            @media (max-width: 600px) {
                .word-container { font-size: 1.4rem; }
            }
            .suffix {
                color: #ffeb3b; /* Bright yellow for suffix */
                display: inline-block;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform: scale(0.5);
                opacity: 0;
                font-weight: 800;
                text-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
            }
            .suffix.active {
                transform: scale(1.1);
                opacity: 1;
                color: #4caf50; /* Green highlight when active */
                animation: pulse-suffix 1.5s infinite alternate;
            }
            @keyframes pulse-suffix {
                from { transform: scale(1); text-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
                to { transform: scale(1.2); text-shadow: 0 0 20px rgba(76, 175, 80, 0.8); }
            }
            .agreement-controls {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
            .control-group {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            .toggle-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(255, 255, 255, 0.1);
                color: var(--text-muted);
                padding: 0.70rem 1.2rem;
                border-radius: 12px;
                font-family: var(--font-family);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 0.95rem;
            }
            @media (max-width: 600px) {
                .toggle-btn { padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 10px; }
            }
            .toggle-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.3);
            }
            .toggle-btn.active {
                background: #4caf50;
                color: white;
                border-color: #4caf50;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
                transform: translateY(-2px);
            }
            .spotlight-btn {
                background: #ffcc00 !important;
                color: #000 !important;
                box-shadow: 0 0 25px rgba(255, 204, 0, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.5) !important;
                font-size: 1.3rem !important;
                font-weight: 800 !important;
                letter-spacing: 0.5px;
            }
            @media (max-width: 600px) {
                .spotlight-btn { font-size: 1.1rem !important; padding: 0.8rem 1.2rem !important; }
            }
            .spotlight-btn:hover {
                background: #fff !important;
                color: #000 !important;
                box-shadow: 0 0 35px rgba(255, 255, 255, 0.6);
                transform: translateY(-3px) scale(1.02);
            }

            /* Recommendation Box Styles */
            .recommendation-box {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 24px;
                padding: 2rem;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
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
                justify-content: center;
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
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
