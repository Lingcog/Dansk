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

        <div class="exercise-feedback" id="exercise-feedback"></div>

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
                let firstErrorHint = '';

                if (this.currentPhase === 1) {
                    exercise.segments.forEach(s => {
                        if (s.type === 'gap') {
                            if (this.answers[s.id] === s.correct) {
                                this.feedback[s.id] = 'correct';
                            } else {
                                this.feedback[s.id] = 'wrong';
                                if (!firstErrorHint) {
                                    firstErrorHint = getTranslation(s.explanation || 'hintAction');
                                }
                                allCorrect = false;
                            }
                        }
                    });
                } else {
                    exercise.phase2_tasks.forEach((task, i) => {
                        const taskId = `phase2-${i}`;
                        if (this.answers[taskId] === task.correct) {
                            this.feedback[taskId] = 'correct';
                        } else {
                            this.feedback[taskId] = 'wrong';
                            if (!firstErrorHint) {
                                firstErrorHint = task.explanation || getTranslation('hintAction');
                            }
                            allCorrect = false;
                        }
                    });
                }

                const fb = container.querySelector('#exercise-feedback');
                if (allCorrect) {
                    fb.style.display = 'none';
                } else {
                    fb.textContent = firstErrorHint;
                    fb.style.display = 'block';
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
}
