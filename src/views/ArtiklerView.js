import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';
import { renderDsIcon, dsSvgIcons } from '../utils/designSystemIcons.js';
import { tBh, bhTransBlock, bhTransSpan } from '../utils/bestemthed_translations.js';

export function renderArtiklerView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container artikler-view';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('pronomen', { subPath: 'artikler_menu' });
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    viewContainer.appendChild(renderGrammarMenu('kendeord', navigateFn));

    // Header
    const title = document.createElement('h1');
    title.innerHTML = `En/et? (Artikler)${bhTransBlock('artikler_title')}`;
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.innerHTML = `Lær at vælge det rigtige kendeord (artikel) til navneord.${bhTransBlock('artikler_subtitle')}`;
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);

    const exerciseArea = document.createElement('div');
    exerciseArea.className = 'exercise-container';
    viewContainer.appendChild(exerciseArea);

    const data = [
        { word: 'bil', correct: 'en', dsIcon: 'car' },
        { word: 'hus', correct: 'et', dsIcon: 'home' },
        { word: 'barn', correct: 'et', dsIcon: 'baby' },
        { word: 'kop', correct: 'en', dsIcon: 'coffee' },
        { word: 'æble', correct: 'et', dsIcon: 'apple' },
        { word: 'stol', correct: 'en', dsIcon: 'chair' }
    ];

    let currentIdx = 0;
    let score = 0;

    function renderExercise() {
        exerciseArea.innerHTML = '';
        if (currentIdx >= data.length) {
            renderResult();
            return;
        }

        const item = data[currentIdx];
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-content animate-in';
        stepDiv.innerHTML = `
            <div class="visual-cue">
                <div class="stickman-container">
                    <svg viewBox="0 0 100 100" class="mini-stickman">
                        <circle cx="50" cy="30" r="8" stroke="white" stroke-width="2" fill="none"/>
                        <line x1="50" y1="38" x2="50" y2="70" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="45" x2="70" y2="35" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="45" x2="30" y2="55" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="70" x2="40" y2="90" stroke="white" stroke-width="2"/>
                        <line x1="50" y1="70" x2="60" y2="90" stroke="white" stroke-width="2"/>
                    </svg>
                    <div class="object-bubble">
                        <span style="color: #0f172a; display: flex; align-items: center; justify-content: center;">
                            ${renderDsIcon(item.dsIcon, '', { size: 30 })}
                        </span>
                    </div>
                </div>
            </div>
            <h3>Hvad hedder det?${bhTransBlock('artikler_question')}</h3>
            <div class="word-display">____ ${item.word}</div>
            <div class="options-grid">
                <button class="option-btn" data-val="en">En</button>
                <button class="option-btn" data-val="et">Et</button>
            </div>
            <div class="feedback-area" id="feedback"></div>
        `;
        exerciseArea.appendChild(stepDiv);

        stepDiv.querySelectorAll('.option-btn').forEach(btn => {
            btn.onclick = () => {
                const val = btn.dataset.val;
                const feedback = stepDiv.querySelector('#feedback');
                if (val === item.correct) {
                    feedback.innerHTML = `
                        <div class="feedback-correct-row" style="display: flex; flex-direction: column; align-items: center;">
                            <span style="display: inline-flex; align-items: center; gap: 0.35rem; color: #4ade80; font-weight: 700;">
                                ${renderDsIcon('check', '', { size: 18 })} Korrekt!
                            </span>
                            ${bhTransBlock('artikler_correct')}
                        </div>
                    `;
                    feedback.className = 'feedback-area success';
                    score++;
                    btn.classList.add('correct');
                    setTimeout(() => {
                        currentIdx++;
                        renderExercise();
                    }, 1100);
                } else {
                    feedback.innerHTML = `
                        <div class="feedback-wrong-row" style="display: flex; flex-direction: column; align-items: center;">
                            <span style="display: inline-flex; align-items: center; gap: 0.35rem; color: #f87171; font-weight: 700;">
                                ${renderDsIcon('alertTriangle', '', { size: 18 })} Prøv igen!
                            </span>
                            ${bhTransBlock('artikler_wrong')}
                        </div>
                    `;
                    feedback.className = 'feedback-area error';
                    btn.classList.add('wrong');
                }
            };
        });
    }

    function renderResult() {
        exerciseArea.innerHTML = `
            <div class="step-content final-step animate-in">
                <div class="success-icon" style="color: #4ade80; display: flex; justify-content: center; margin-bottom: 0.75rem;">
                    ${renderDsIcon('check', '', { size: 48 })}
                </div>
                <h2>Flot gået!${bhTransBlock('artikler_done_title')}</h2>
                <p>Du fik ${score} ud af ${data.length} rigtige.${bhTransBlock('artikler_done_desc', { score, total: data.length })}</p>
                <button class="gemini-btn" id="finish-btn">Afslut ${bhTransSpan('artikler_finish_btn')}</button>
            </div>
        `;
        exerciseArea.querySelector('#finish-btn').onclick = () => navigateFn('pronomen', { subPath: 'artikler_menu' });
    }

    renderExercise();

    if (!document.getElementById('artikler-styles')) {
        const styles = document.createElement('style');
        styles.id = 'artikler-styles';
        styles.textContent = `
            .artikler-view .visual-cue {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 2rem;
            }
            .artikler-view .ds-icon-emoji {
                display: none !important;
            }
            .artikler-view .ds-icon-svg {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
            }
            .stickman-container {
                position: relative;
                width: 150px;
                height: 150px;
            }
            @media (max-width: 600px) {
                .stickman-container { width: 120px; height: 120px; }
            }
            .mini-stickman {
                width: 100%;
                height: 100%;
            }
            .object-bubble {
                position: absolute;
                top: 5px;
                right: -10px;
                background: white;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                animation: float 3s ease-in-out infinite;
            }
            @media (max-width: 600px) {
                .object-bubble { width: 50px; height: 50px; right: -5px; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .word-display {
                font-size: 2.5rem;
                font-weight: 700;
                margin: 2rem 0;
                color: #fff;
            }
            @media (max-width: 600px) {
                .word-display { font-size: 1.8rem; margin: 1.5rem 0; }
            }
            .options-grid {
                display: flex;
                gap: 1.5rem;
                justify-content: center;
                margin-bottom: 2rem;
            }
            @media (max-width: 600px) {
                .options-grid { gap: 1rem; margin-bottom: 1.5rem; }
            }
            .option-btn {
                background: rgba(255,255,255,0.1);
                border: 2px solid rgba(255,255,255,0.2);
                color: white;
                padding: 1.5rem 3rem;
                font-size: 1.5rem;
                font-weight: 700;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s;
                min-width: 120px;
            }
            @media (max-width: 600px) {
                .option-btn { padding: 1rem 2rem; font-size: 1.2rem; border-radius: 16px; min-width: 100px; }
            }
            .option-btn:hover { background: rgba(255,255,255,0.2); }
            .option-btn.correct { background: #4CAF50; border-color: #4CAF50; }
            .option-btn.wrong { background: #F44336; border-color: #F44336; }
            
            .feedback-area {
                min-height: 48px;
                font-size: 1.15rem;
                font-weight: 600;
                margin-top: 1rem;
            }
            @media (max-width: 600px) {
                .feedback-area { font-size: 1rem; min-height: 40px; }
            }
            .feedback-area.success { color: #4CAF50; }
            .feedback-area.error { color: #F44336; }
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
