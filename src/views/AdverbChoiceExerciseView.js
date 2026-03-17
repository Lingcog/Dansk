import { getTranslation, appState } from '../utils/i18n.js';

export function initAdverbChoiceExerciseView(container) {
    // 2 sets of 5 questions
    const questionSets = [
        [
            { sentence: "Jeg kan ____ lide at læse.", options: ["måske", "godt", "ikke"], correct: "godt" },
            { sentence: "Han kommer ____ i morgen.", options: ["måske", "godt", "ikke"], correct: "måske" },
            { sentence: "Jeg har ____ tid i dag.", options: ["måske", "godt", "ikke"], correct: "ikke" },
            { sentence: "Vi skal ____ ud at spise.", options: ["måske", "godt", "ikke"], correct: "måske" },
            { sentence: "De kan ____ svømme.", options: ["måske", "godt", "ikke"], correct: "godt" }
        ],
        [
            { sentence: "Du må ____ glemme din taske.", options: ["måske", "godt", "ikke"], correct: "ikke" },
            { sentence: "Det bliver ____ regnvejr.", options: ["måske", "godt", "ikke"], correct: "måske" },
            { sentence: "Hun synger meget ____.", options: ["måske", "godt", "ikke"], correct: "godt" },
            { sentence: "Jeg forstår ____ spørgsmålet.", options: ["måske", "godt", "ikke"], correct: "ikke" },
            { sentence: "Vi ses ____ på mandag.", options: ["måske", "godt", "ikke"], correct: "måske" }
        ]
    ];

    let currentSetIndex = 0;
    let scores = [null, null, null, null, null];

    function render() {
        const questions = questionSets[currentSetIndex];

        if (!document.getElementById('adv-choice-styles')) {
            const styles = document.createElement('style');
            styles.id = 'adv-choice-styles';
            styles.textContent = `
                .adv-choice-container { max-width: 800px; margin: 2rem auto; padding: 2.5rem; }
                .adv-choice-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
                .adv-choice-set-counter { font-weight: bold; color: var(--primary-color); }
                .questions-list { display: flex; flex-direction: column; gap: 1.5rem; }
                .question-row { display: flex; align-items: center; gap: 0.6rem; font-size: 1.2rem; line-height: 1.4; flex-wrap: wrap; }
                .adverb-select-input {
                    padding: 0.4rem 0.6rem;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    background: var(--bg-card);
                    color: var(--text-primary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .adv-choice-controls { margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
                
                @media (max-width: 600px) {
                    .adv-choice-container { margin: 1rem; padding: 1.5rem; }
                    .question-row { font-size: 1.05rem; gap: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.8rem; }
                    .adverb-select-input { font-size: 0.95rem; padding: 0.3rem 0.5rem; }
                    .adv-choice-controls { flex-direction: column; align-items: stretch; }
                    .adv-choice-controls button { width: 100%; }
                }
            `;
            document.head.appendChild(styles);
        }

        container.innerHTML = `
            <div class="exercise-container premium-card animate-fade-in adv-choice-container">
                <button id="adv-back-btn" class="back-btn" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> ${getTranslation('back')}
                </button>
                
                <div class="adv-choice-header">
                    <h2 style="color: var(--primary-color); margin: 0;">
                        ${getTranslation('advChoiceTitle')}
                    </h2>
                    <span class="adv-choice-set-counter">
                        ${getTranslation('exerciseSetCounter', { n: currentSetIndex + 1, total: 2 })}
                    </span>
                </div>
                
                <p style="color: var(--text-secondary); margin-bottom: 2.5rem;">
                    ${getTranslation('advChoiceDesc')}
                </p>
 
                <div class="questions-list">
                    ${questions.map((q, i) => {
            const parts = q.sentence.split('____');
            const borderColor = scores[i] === null ? 'rgba(255,255,255,0.1)' : (scores[i] ? '#4CAF50' : '#F44336');
            return `
                            <div class="question-row">
                                <span>${parts[0]}</span>
                                <select class="adverb-select-input" data-index="${i}" style="border: 2px solid ${borderColor};">
                                    <option value="">...</option>
                                    ${q.options.map(opt => `<option value="${opt}" ${scores[i] !== null && q.correct === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                                </select>
                                <span>${parts[1] || ''}</span>
                                ${scores[i] !== null ? (scores[i] ? '<i class="fas fa-check" style="color: #4CAF50; margin-left: 0.5rem;"></i>' : '<i class="fas fa-times" style="color: #F44336; margin-left: 0.5rem;"></i>') : ''}
                            </div>
                        `;
        }).join('')}
                </div>
 
                <div class="adv-choice-controls">
                    <button id="check-btn" class="cta-button" style="padding: 0.8rem 1.5rem;">
                        ${getTranslation('checkAnswers')}
                    </button>
                    ${currentSetIndex < 1 ? `
                        <button id="next-set-btn" class="secondary-button" style="display: none; padding: 0.8rem 1.5rem;">
                            ${getTranslation('newExercise')} <i class="fas fa-arrow-right"></i>
                        </button>
                    ` : `
                        <div id="final-success" style="display: none; color: #4CAF50; font-weight: bold; text-align: center;">
                            <i class="fas fa-star"></i> ${getTranslation('allCorrect')}
                        </div>
                    `}
                </div>
            </div>
        `;

        document.getElementById('adv-back-btn').addEventListener('click', () => {
            // Dispatch a custom event or use navigate if possible
            window.location.hash = '#/pronomen';
        });

        const checkBtn = document.getElementById('check-btn');
        const nextSetBtn = document.getElementById('next-set-btn');
        const finalSuccess = document.getElementById('final-success');

        checkBtn.addEventListener('click', () => {
            const selects = container.querySelectorAll('.adverb-select-input');
            let allCorrect = true;

            selects.forEach((select, i) => {
                const val = select.value;
                const correct = questions[i].correct;
                scores[i] = val === correct;
                if (!scores[i]) allCorrect = false;
            });

            render(); // Refresh to show feedback

            if (allCorrect) {
                if (currentSetIndex < 1) {
                    const btn = document.getElementById('next-set-btn');
                    if (btn) btn.style.display = 'block';
                    const cBtn = document.getElementById('check-btn');
                    if (cBtn) cBtn.style.display = 'none';
                } else {
                    const s = document.getElementById('final-success');
                    if (s) s.style.display = 'block';
                    const cBtn = document.getElementById('check-btn');
                    if (cBtn) cBtn.style.display = 'none';
                }
            }
        });

        if (nextSetBtn) {
            nextSetBtn.addEventListener('click', () => {
                currentSetIndex++;
                scores = [null, null, null, null, null];
                render();
            });
        }
    }

    render();
}
