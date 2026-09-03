import { getTranslation, appState } from '../utils/i18n.js';
import { conjunctionData } from '../utils/conjunctionData.js';
import { baseUrl } from '../utils/config.js';

export function initConjunctionChoiceExerciseView(container, navigateFn) {
    let viewState = 'menu'; // 'menu', 'traening2_menu', 'exercise'
    let currentExerciseType = null;
    let currentSetIndex = 0;
    let scores = [null, null, null, null, null];
    let currentQuestions = [];
    let exerciseMetadata = null; // for title, illustration, explanation

    function render() {
        if (!document.getElementById('conj-choice-styles')) {
            const styles = document.createElement('style');
            styles.id = 'conj-choice-styles';
            styles.textContent = `
                .conj-choice-container { max-width: 800px; margin: 2rem auto; padding: 2.5rem; }
                .conj-choice-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 0.5rem; }
                .conj-choice-set-counter { font-weight: bold; color: var(--primary-color); }
                .questions-list { display: flex; flex-direction: column; gap: 0.5rem; }
                .question-wrapper { margin-bottom: 2rem; animation: slideIn 0.3s ease-out; }
                .question-row { display: flex; align-items: center; gap: 0.6rem; font-size: 1.2rem; line-height: 1.4; flex-wrap: wrap; }
                .row-feedback {
                    margin-top: 0.8rem;
                    padding: 0.8rem 1.2rem;
                    border-radius: 12px;
                    font-size: 1rem;
                    animation: fadeIn 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }
                .conj-choice-controls { margin-top: 3rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
                
                .conj-illustration { max-width: 100%; border-radius: 12px; margin-bottom: 1rem; }
                .conj-expl-bubble { background: rgba(var(--primary-rgb), 0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border-left: 4px solid var(--primary-color); }
                
                @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                @media (max-width: 600px) {
                    .conj-choice-container { margin: 1rem; padding: 1.5rem; }
                    .question-row { font-size: 1.05rem; gap: 0.4rem; }
                    .conj-choice-controls { flex-direction: column; align-items: stretch; }
                    .conj-choice-controls button { width: 100%; }
                }
            `;
            document.head.appendChild(styles);
        }

        if (viewState === 'menu') {
            renderMenu();
        } else if (viewState === 'traening2_menu') {
            renderTraening2Menu();
        } else if (viewState === 'exercise') {
            renderExercise();
        }
    }

    function renderMenu() {
        container.innerHTML = `
            <div class="exercise-container premium-card animate-fade-in conj-choice-container">
                <button id="conj-back-btn" class="back-btn" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> ${getTranslation('back')}
                </button>
                <div class="conj-choice-header">
                    <h2 style="color: var(--primary-color); margin: 0;">${getTranslation('conjunctionChoiceTitle') || 'Vælg det rigtige ord'}</h2>
                </div>
                <div class="menu-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                    <div class="card" id="btn-t1">
                        <div class="card-icon">🧠</div>
                        <h3 class="card-title">Træning 1</h3>
                        <p class="card-desc">Klassisk træning med og, men, fordi, når, da</p>
                    </div>
                    <div class="card" id="btn-t2">
                        <div class="card-icon">🧩</div>
                        <h3 class="card-title">Træning 2</h3>
                        <p class="card-desc">Parrede bindeord & kognitiv forståelse</p>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('conj-back-btn').addEventListener('click', () => {
            if (navigateFn) navigateFn('pronomen');
            else window.location.hash = `/${appState.lang}/pronomen`;
        });
        document.getElementById('btn-t1').addEventListener('click', () => {
            currentExerciseType = 'traening1';
            currentSetIndex = 0;
            scores = [null, null, null, null, null];
            currentQuestions = conjunctionData.traening1[currentSetIndex];
            exerciseMetadata = null;
            viewState = 'exercise';
            render();
        });
        document.getElementById('btn-t2').addEventListener('click', () => {
            viewState = 'traening2_menu';
            render();
        });
    }

    function renderTraening2Menu() {
        container.innerHTML = `
            <div class="exercise-container premium-card animate-fade-in conj-choice-container">
                <button id="conj-back-btn" class="back-btn" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> Tilbage
                </button>
                <div class="conj-choice-header">
                    <h2 style="color: var(--primary-color); margin: 0;">Træning 2: Parrede bindeord</h2>
                </div>
                <div class="menu-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                    <div class="card" id="btn-da-naar">
                        <div class="card-icon">📅</div>
                        <h3 class="card-title">Da / Når</h3>
                    </div>
                    <div class="card" id="btn-fordi-derfor">
                        <div class="card-icon">➡️</div>
                        <h3 class="card-title">Fordi / Derfor</h3>
                    </div>
                    <div class="card" id="btn-selvom-alligevel">
                        <div class="card-icon">🧱</div>
                        <h3 class="card-title">Selvom / Alligevel</h3>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('conj-back-btn').addEventListener('click', () => {
            viewState = 'menu';
            render();
        });
        const setupExercise = (key) => {
            currentExerciseType = 'traening2';
            exerciseMetadata = conjunctionData.traening2[key];
            currentSetIndex = 0;
            scores = [null, null, null, null, null];
            currentQuestions = JSON.parse(JSON.stringify(exerciseMetadata.questions));
            viewState = 'exercise';
            render();
        };
        document.getElementById('btn-da-naar').addEventListener('click', () => setupExercise('da_naar'));
        document.getElementById('btn-fordi-derfor').addEventListener('click', () => setupExercise('fordi_derfor'));
        document.getElementById('btn-selvom-alligevel').addEventListener('click', () => setupExercise('selvom_alligevel'));
    }

    function renderExercise() {
        const isTraening1 = currentExerciseType === 'traening1';
        const title = isTraening1 ? 'Træning 1: Bindeord' : exerciseMetadata.title;
        const maxSets = isTraening1 ? conjunctionData.traening1.length : 1;

        let illustrationHTML = '';
        if (exerciseMetadata && exerciseMetadata.illustration) {
            illustrationHTML = `
                <div style="text-align: center;">
                    <img src="${baseUrl}${exerciseMetadata.illustration}" class="conj-illustration" alt="${title}" />
                    <div class="conj-expl-bubble">${exerciseMetadata.explanation}</div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="exercise-container premium-card animate-fade-in conj-choice-container">
                <button id="conj-back-btn" class="back-btn" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> Tilbage
                </button>
                
                <div class="conj-choice-header">
                    <h2 style="color: var(--primary-color); margin: 0;">${title}</h2>
                    ${maxSets > 1 ? `<span class="conj-choice-set-counter">Sæt ${currentSetIndex + 1} af ${maxSets}</span>` : ''}
                </div>
                
                ${illustrationHTML}
  
                <div class="questions-list grammatik-text-container" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    ${currentQuestions.map((q, i) => {
            const absoluteIdx = (currentSetIndex * 5) + i;
            const parts = Array.isArray(q.sentence) ? q.sentence : q.sentence.split('____');
            const isCorrect = scores[i] === true;
            const isWrong = scores[i] === false;
            const validationClass = isCorrect ? 'correct' : (isWrong ? 'wrong' : '');

            let feedbackText = '';
            if (scores[i] !== null) {
                if (isCorrect) {
                    feedbackText = '✓ ' + (isTraening1 ? (getTranslation(`conj_${absoluteIdx}_feedback`) || q.feedback) : q.feedback);
                } else {
                    const safeOpt = q.selectedValue ? q.selectedValue.replace(/[^a-zA-ZæøåÆØÅ]/g, '') : '';
                    const translatedHint = isTraening1 ? getTranslation(`conj_${absoluteIdx}_hint_${safeOpt}`) : null;
                    // getTranslation might return the key itself if not found. If it returns the key, we should fallback.
                    const finalHint = (translatedHint && !translatedHint.startsWith('conj_')) ? translatedHint : q.hints[q.selectedValue];
                    feedbackText = '⚠ ' + (finalHint || "Prøv igen. Tænk på forbindelsen mellem sætningerne.");
                }
            }

            return `
                            <div class="question-wrapper">
                                <div class="question-row" style="font-size: 1.3rem; line-height: 1.8;">
                                    <span>${parts[0]}</span>
                                    <span class="select-wrapper">
                                        <select class="grammatik-select ${validationClass}" data-index="${i}" ${isCorrect ? 'disabled' : ''}>
                                            <option value="">...</option>
                                            ${q.options.map(opt => `<option value="${opt}" ${q.selectedValue === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                                        </select>
                                    </span>
                                    <span>${parts[1] || ''}</span>
                                </div>
                                ${scores[i] !== null ? `
                                    <div class="row-feedback" style="background: ${isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; border: 1px solid ${isCorrect ? '#4CAF50' : '#F44336'}; color: ${isCorrect ? '#81C784' : '#E57373'};">
                                        <span>${feedbackText}</span>
                                    </div>
                                ` : ''}
                            </div>
                        `;
        }).join('')}
                </div>
  
                <div class="conj-choice-controls">
                    ${(isTraening1 && currentSetIndex < maxSets - 1) ? `
                        <button id="next-set-btn" class="secondary-button" style="display: ${scores.every(s => s === true) ? 'block' : 'none'}; padding: 0.8rem 2rem; border-radius: 50px;">
                            Næste sæt <i class="fas fa-arrow-right"></i>
                        </button>
                    ` : `
                        <div id="final-success" style="display: ${scores.every(s => s === true) ? 'block' : 'none'}; color: #4CAF50; font-weight: bold; text-align: center; font-size: 1.2rem; background: rgba(76, 175, 80, 0.1); padding: 1rem; border-radius: 12px; width: 100%;">
                            <i class="fas fa-star"></i> Alle rigtige!
                        </div>
                    `}
                </div>
            </div>
        `;

        document.getElementById('conj-back-btn').addEventListener('click', () => {
            if (isTraening1) {
                viewState = 'menu';
            } else {
                viewState = 'traening2_menu';
            }
            render();
        });

        const selects = container.querySelectorAll('.grammatik-select');
        selects.forEach((select, i) => {
            select.addEventListener('change', () => {
                const val = select.value;
                if (val === "") {
                    scores[i] = null;
                    currentQuestions[i].selectedValue = undefined;
                } else {
                    const correct = currentQuestions[i].correct;
                    scores[i] = (val.toLowerCase() === correct.toLowerCase());
                    currentQuestions[i].selectedValue = val;
                }
                render();
            });
        });

        const nextSetBtn = document.getElementById('next-set-btn');
        if (nextSetBtn) {
            nextSetBtn.addEventListener('click', () => {
                currentSetIndex++;
                scores = [null, null, null, null, null];
                currentQuestions = conjunctionData.traening1[currentSetIndex];
                render();
            });
        }
    }

    render();
}
