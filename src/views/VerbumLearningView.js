import { verbsData } from '../utils/verbsData.js';
import { translations } from '../utils/translations.js';
import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../main.js';

export class VerbumLearningView {
    constructor(navigateFn, categoryId = null) {
        this.navigateFn = navigateFn;
        this.currentCategoryIndex = categoryId ? verbsData.findIndex(c => c.id === categoryId) : 0;
        if (this.currentCategoryIndex === -1) this.currentCategoryIndex = 0;

        this.currentExerciseIndex = 0;
        this.currentPhase = 1; // 1: Gaps, 2: Definitions
        this.answers = {};
        this.feedback = {}; // { 'id': 'correct' | 'wrong' }
        this.showHints = {}; // { 'id': true | false }
    }

    render() {
        const container = document.createElement('div');
        container.className = 'verbum-learning-view view-container';

        const category = verbsData[this.currentCategoryIndex];
        if (!category) return container;

        const exercise = category.exercises[this.currentExerciseIndex];
        if (!exercise) return container;

        const lang = localStorage.getItem('appLang') || 'da';
        const t = (key) => translations[lang]?.[key] || translations['da']?.[key] || key;

        container.innerHTML = `
      <div class="top-bar">
        <button class="back-btn" id="back-to-main">← ${getTranslation('back')}</button>
      </div>
      <h1>${category.title}</h1>
      
      <div class="exercise-card">
        <img src="${baseUrl}verber_kategorier.png" class="category-illustration" alt="Category Illustration">
        
        <div class="exercise-header">
          <h2 style="text-align: center;">${exercise.title}</h2>
          <p class="subtitle" style="text-align: center;">${this.currentPhase === 1 ? exercise.instruction : t('phase2_instruction') || 'Gæt verbet ud fra definitionen.'}</p>
        </div>

        <div class="grammatik-text-container" id="exercise-content">
          ${this.currentPhase === 1 ? this.renderPhase1(exercise) : this.renderPhase2(exercise)}
        </div>

        <div class="grammatik-summary" id="grammatik-summary">
          ${this.getSummaryText(exercise)}
        </div>

        <div class="game-controls">
          <button class="gemini-btn" id="check-answers">${getTranslation('checkAnswers')}</button>
          ${this.renderFooterButtons(category)}
        </div>
      </div>
`;

        this.attachEventListeners(container);
        this.ensureStyles();
        return container;
    }

    getSummaryText(exercise) {
        const selects = this.currentPhase === 1
            ? exercise.segments.filter(s => s.type === 'gap')
            : exercise.phase2_tasks;

        const total = selects.length;
        const correctCount = Object.values(this.feedback).filter(f => f === 'correct').length;

        if (correctCount === 0) return "";
        if (correctCount === total) {
            return `<span class="success">${getTranslation('allCorrect')}</span>`;
        }
        return `${correctCount} / ${total} ${getTranslation('filled') || 'korrekte'}`;
    }

    renderPhase1(exercise) {
        return exercise.segments.map(segment => {
            if (segment.type === 'text') {
                return `<span class="text-part">${segment.content.replace(/\\n/g, '<br>')}</span>`;
            } else if (segment.type === 'gap') {
                const isCorrect = this.feedback[segment.id] === 'correct';
                const isWrong = this.feedback[segment.id] === 'wrong';
                const showHint = this.showHints[segment.id];

                return `
          <span class="select-wrapper">
            <div class="select-hint ${showHint ? 'visible' : ''}">
                ${getTranslation(segment.explanation || 'hintContext')}
            </div>
            <select class="grammatik-select ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" data-id="${segment.id}" ${isCorrect ? 'disabled' : ''}>
              <option value="">...</option>
              ${segment.options.map(opt => `<option value="${opt}" ${this.answers[segment.id] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
          </span>
        `;
            }
        }).join('');
    }

    renderPhase2(exercise) {
        return exercise.phase2_tasks.map((task, index) => {
            const taskId = `phase2-${index}`;
            const isCorrect = this.feedback[taskId] === 'correct';
            const isWrong = this.feedback[taskId] === 'wrong';
            const showHint = this.showHints[taskId];

            return `
        <div class="phase2-item" style="margin-bottom: 2rem; text-align: left;">
          <p class="definition"><strong>${index + 1}.</strong> ${task.definition}</p>
          <span class="select-wrapper">
            <div class="select-hint ${showHint ? 'visible' : ''}">
                ${task.explanation || 'Prøv igen!'}
            </div>
            <select class="grammatik-select ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" data-task-id="${taskId}" ${isCorrect ? 'disabled' : ''}>
              <option value="">...</option>
              ${task.options.map(opt => `<option value="${opt}" ${this.answers[taskId] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
          </span>
        </div>
      `;
        }).join('');
    }

    renderFooterButtons(category) {
        const exercise = category.exercises[this.currentExerciseIndex];
        const totalGaps = this.currentPhase === 1
            ? exercise.segments.filter(s => s.type === 'gap').length
            : exercise.phase2_tasks.length;

        const correctCount = Object.values(this.feedback).filter(f => f === 'correct').length;
        const allDone = correctCount === totalGaps;

        if (!allDone) return '';

        const isLastExercise = this.currentExerciseIndex === category.exercises.length - 1;

        if (this.currentPhase === 1) {
            return `<button class="gemini-btn" id="next-phase">Næste fase →</button>`;
        } else if (isLastExercise) {
            return `<button class="gemini-btn" id="next-category">Næste kategori →</button>`;
        } else {
            return `<button class="gemini-btn" id="next-exercise">Næste opgave →</button>`;
        }
    }

    attachEventListeners(container) {
        container.querySelector('#back-to-main').onclick = () => {
            this.navigateFn('main');
        };

        container.querySelectorAll('.grammatik-select').forEach(select => {
            select.onchange = (e) => {
                const id = e.target.dataset.id || e.target.dataset.taskId;
                this.answers[id] = e.target.value;
                // Reset feedback and hint on change
                delete this.feedback[id];
                this.showHints[id] = false;
                this.updateView();
            };
        });

        const checkBtn = container.querySelector('#check-answers');
        if (checkBtn) {
            checkBtn.onclick = () => {
                const exercise = verbsData[this.currentCategoryIndex].exercises[this.currentExerciseIndex];
                let allCorrect = true;

                if (this.currentPhase === 1) {
                    exercise.segments.forEach(s => {
                        if (s.type === 'gap') {
                            if (this.answers[s.id] === s.correct) {
                                this.feedback[s.id] = 'correct';
                                this.showHints[s.id] = false;
                            } else {
                                this.feedback[s.id] = 'wrong';
                                this.showHints[s.id] = !!this.answers[s.id]; // Only show if an answer was selected
                                allCorrect = false;
                            }
                        }
                    });
                } else {
                    exercise.phase2_tasks.forEach((task, i) => {
                        const taskId = `phase2-${i}`;
                        if (this.answers[taskId] === task.correct) {
                            this.feedback[taskId] = 'correct';
                            this.showHints[taskId] = false;
                        } else {
                            this.feedback[taskId] = 'wrong';
                            this.showHints[taskId] = !!this.answers[taskId];
                            allCorrect = false;
                        }
                    });
                }
                this.updateView();
            };

            // Hide check button if all done
            const exercise = verbsData[this.currentCategoryIndex].exercises[this.currentExerciseIndex];
            const totalGaps = this.currentPhase === 1
                ? exercise.segments.filter(s => s.type === 'gap').length
                : exercise.phase2_tasks.length;
            const correctCount = Object.values(this.feedback).filter(f => f === 'correct').length;
            if (correctCount === totalGaps) checkBtn.style.display = 'none';
        }

        const nextPhaseBtn = container.querySelector('#next-phase');
        if (nextPhaseBtn) {
            nextPhaseBtn.onclick = () => {
                this.currentPhase = 2;
                this.answers = {};
                this.feedback = {};
                this.showHints = {};
                this.updateView();
            };
        }

        const nextExerciseBtn = container.querySelector('#next-exercise');
        if (nextExerciseBtn) {
            nextExerciseBtn.onclick = () => {
                this.currentExerciseIndex++;
                this.currentPhase = 1;
                this.answers = {};
                this.feedback = {};
                this.showHints = {};
                this.updateView();
            };
        }

        const nextCategoryBtn = container.querySelector('#next-category');
        if (nextCategoryBtn) {
            nextCategoryBtn.onclick = () => {
                this.currentCategoryIndex++;
                this.currentExerciseIndex = 0;
                this.currentPhase = 1;
                this.answers = {};
                this.feedback = {};
                this.showHints = {};
                this.updateView();
            };
        }
    }

    updateView() {
        const oldView = document.querySelector('.verbum-learning-view');
        if (oldView) {
            const newView = this.render();
            oldView.replaceWith(newView);
        }
    }

    ensureStyles() {
        if (!document.getElementById('verbum-learning-styles')) {
            const styles = document.createElement('style');
            styles.id = 'verbum-learning-styles';
            styles.textContent = `
                .verbum-learning-view .category-illustration {
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    border-radius: 20px;
                    margin: 0 auto 2rem;
                    display: block;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                }
                .verbum-learning-view .grammatik-text-container {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    border-radius: 24px;
                    line-height: 2.8;
                    font-size: 1.2rem;
                    margin: 1.5rem 0;
                    color: var(--text-main);
                    box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
                    text-align: center;
                }
                .verbum-learning-view .select-wrapper {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    vertical-align: middle;
                    position: relative;
                    margin: 0 0.4rem;
                }
                .verbum-learning-view .grammatik-select {
                    background: rgba(255, 255, 255, 0.08);
                    color: var(--text-main);
                    border: 2px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    padding: 0.1rem 0.6rem;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    outline: none;
                    appearance: none;
                    -webkit-appearance: none;
                    min-width: 100px;
                    text-align-last: center;
                }
                .verbum-learning-view .grammatik-select.correct {
                    border-color: #4CAF50;
                    background: rgba(76, 175, 80, 0.15);
                    color: #81C784;
                }
                .verbum-learning-view .grammatik-select.wrong {
                    border-color: #FF5252;
                    background: rgba(255, 82, 82, 0.15);
                    color: #FF8A80;
                }
                .verbum-learning-view .select-hint {
                    display: none;
                    position: absolute;
                    bottom: 120%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #FF5252;
                    color: white;
                    padding: 0.5rem 0.9rem;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    line-height: 1.3;
                    width: 200px;
                    text-align: center;
                    z-index: 20;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                    pointer-events: none;
                }
                .verbum-learning-view .select-hint.visible {
                    display: block;
                    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes popIn {
                    from { transform: translateX(-50%) scale(0.5); opacity: 0; }
                    to { transform: translateX(-50%) scale(1); opacity: 1; }
                }
                .verbum-learning-view .select-hint::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -8px;
                    border-width: 8px;
                    border-style: solid;
                    border-color: #FF5252 transparent transparent transparent;
                }
                .verbum-learning-view .grammatik-summary {
                    text-align: center;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 1.5rem 0;
                    min-height: 1.5rem;
                }
                .verbum-learning-view .grammatik-summary .success {
                    color: #4CAF50;
                    font-size: 1.3rem;
                }
                .verbum-learning-view .game-controls {
                    display: flex;
                    justify-content: center;
                    margin-top: 1rem;
                    gap: 1.5rem;
                }
            `;
            document.head.appendChild(styles);
        }
    }
}
