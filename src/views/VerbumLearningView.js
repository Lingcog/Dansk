import { verbsData } from '../utils/verbsData.js';
import { translations } from '../utils/translations.js';
import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export class VerbumLearningView {
    constructor(navigateFn, categoryId = null, backView = 'main') {
        this.navigateFn = navigateFn;
        this.backView = backView;
        this.currentCategoryIndex = categoryId ? verbsData.findIndex(c => c.id === categoryId) : 0;
        if (this.currentCategoryIndex === -1) this.currentCategoryIndex = 0;

        this.currentExerciseIndex = 0;
        this.currentPhase = 1; // 1: Gaps, 2: Definitions
        this.answers = {};
        this.feedback = {}; // { 'id': 'correct' | 'wrong' }
        this.showHints = {}; // { 'id': true | false }
    }

    normalize(text) {
        if (!text) return '';
        return text.toLowerCase()
            .replace(/æ/g, 'ae')
            .replace(/ø/g, 'oe')
            .replace(/å/g, 'aa')
            .replace(/[^\w\s]/g, '')
            .trim()
            .replace(/\s+/g, '_');
    }

    getCategoryTitle(category) {
        const key = 'verber' + category.id.charAt(0).toUpperCase() + category.id.slice(1).replace(/_([a-z])/g, (m, c) => c.toUpperCase());
        const translated = getTranslation(key);
        return translated === key ? category.title : translated;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'verbum-learning-view view-container';

        const category = verbsData[this.currentCategoryIndex];
        if (!category) return container;

        const exercise = category.exercises[this.currentExerciseIndex];
        if (!exercise) return container;

        const instrKey = 'verbInstruction_' + this.normalize(exercise.instruction);
        const translatedInstruction = getTranslation(instrKey);
        const finalInstruction = (translatedInstruction === instrKey) ? exercise.instruction : translatedInstruction;

        const titleKey = 'verbTitle_' + this.normalize(exercise.title);
        const translatedTitle = getTranslation(titleKey);
        const finalTitle = (translatedTitle === titleKey) ? exercise.title : translatedTitle;

        container.innerHTML = `
      <div class="top-bar">
        <button class="back-btn" id="back-to-main">← ${getTranslation('back')}</button>
      </div>
      <h1>${this.getCategoryTitle(category)}</h1>
      
      <div class="exercise-card">
        <img src="${baseUrl}verber_kategorier.png" class="category-illustration" alt="Category Illustration">
        
        <div class="exercise-header">
          <h2 style="text-align: center;">${finalTitle}</h2>
          <p class="subtitle" style="text-align: center;">${this.currentPhase === 1 ? finalInstruction : getTranslation('verbExerciseSubtitle')}</p>
        </div>

        <div class="grammatik-text-container" id="exercise-content">
          ${this.currentPhase === 1 ? this.renderPhase1(exercise) : this.renderPhase2(exercise)}
        </div>

        <div class="exercise-feedback" id="exercise-feedback"></div>

        <div class="grammatik-summary" id="grammatik-summary">
          ${this.getSummaryText(exercise)}
        </div>

          ${this.renderFooterButtons(category)}
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
        return getTranslation('filledProgress', { n: correctCount, total: total });
    }

    renderPhase1(exercise) {
        // Group segments into logical items (sentences)
        const items = [];
        let currentItem = null;

        exercise.segments.forEach(segment => {
            if (segment.type === 'text') {
                // Split by numbering to identify start of new items
                const parts = segment.content.split(/(\d+\.\s+)/);

                parts.forEach(part => {
                    const isNum = part.match(/^\d+\.\s+$/);
                    if (isNum) {
                        if (currentItem) items.push(currentItem);
                        currentItem = { segments: [] };
                    }
                    if (currentItem) {
                        currentItem.segments.push({ type: 'text', content: part });
                    }
                });
            } else if (currentItem) {
                currentItem.segments.push(segment);
            }
        });
        if (currentItem) items.push(currentItem);

        return items.map((item, idx) => {
            let clue = null;
            let clueKey = null;
            const segmentsHtml = item.segments.map(seg => {
                if (seg.type === 'text') {
                    // Extract English clue [clue]
                    const clueMatch = seg.content.match(/\*\*\[(.*?)\]\*\*/);
                    if (clueMatch) {
                        clue = clueMatch[1];
                        // Normalize clue to a translation key: verbClue_normalizedText
                        clueKey = 'verbClue_' + this.normalize(clue);
                    }

                    let clean = seg.content.replace(clueMatch ? clueMatch[0] : '', '')
                        .replace(/\\n/g, ' ')
                        .replace(/\d+\.\s+/g, '') // Remove numbers like "1. "
                        .replace(/Dansk:\s*/gi, '') // Remove "Dansk: "
                        .replace(/\s+/g, ' ')
                        .trim();

                    const labelHtml = seg.content.match(/Dansk:/i) ? `<span class="sentence-label">${getTranslation('danishLabel')}:</span> ` : '';
                    return clean ? `${labelHtml}<span class="text-part">${clean}</span>` : '';
                } else {
                    const isCorrect = this.feedback[seg.id] === 'correct';
                    const isWrong = this.feedback[seg.id] === 'wrong';
                    return `
                        <span class="select-wrapper">
                            <select class="grammatik-select ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" data-id="${seg.id}" ${isCorrect ? 'disabled' : ''}>
                                <option value="">...</option>
                                ${seg.options.map(opt => `<option value="${opt}" ${this.answers[seg.id] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                            </select>
                        </span>
                    `;
                }
            }).join(' ');

            // Try to get translation, fallback to English clue if not found
            const translatedClue = clueKey ? getTranslation(clueKey) : clue;
            const clueHtml = translatedClue ? `<div class="sent-clue">${translatedClue}</div>` : '';

            return `
                <div class="sentence-row">
                    ${clueHtml}
                    <div class="sentence-content">
                        <span class="sentence-number">${idx + 1}.</span>
                        ${segmentsHtml}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderPhase2(exercise) {
        return exercise.phase2_tasks.map((task, index) => {
            const taskId = `phase2-${index}`;
            const isCorrect = this.feedback[taskId] === 'correct';
            const isWrong = this.feedback[taskId] === 'wrong';

            const defKey = 'verbDef_' + this.normalize(task.definition);
            const translatedDef = getTranslation(defKey);
            const finalDef = (translatedDef === defKey) ? task.definition : translatedDef;

            return `
                <div class="phase2-item">
                    <p class="definition"><strong>${index + 1}.</strong> ${finalDef}</p>
                    <span class="select-wrapper">
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
            return `<button class="gemini-btn" id="next-phase">${getTranslation('nextPhase')}</button>`;
        } else if (isLastExercise) {
            return `<button class="gemini-btn" id="next-category">${getTranslation('nextCategory')}</button>`;
        } else {
            return `<button class="gemini-btn" id="next-exercise">${getTranslation('nextExercise')}</button>`;
        }
    }

    attachEventListeners(container) {
        container.querySelector('#back-to-main').onclick = () => {
            this.navigateFn(this.backView);
        };

        container.querySelectorAll('.grammatik-select').forEach(select => {
            select.onchange = (e) => {
                const id = e.target.dataset.id || e.target.dataset.taskId;
                const val = e.target.value;
                this.answers[id] = val;

                const exercise = verbsData[this.currentCategoryIndex].exercises[this.currentExerciseIndex];
                let correctVal = '';
                let explanation = '';

                if (this.currentPhase === 1) {
                    const seg = exercise.segments.find(s => s.id === id);
                    if (seg) {
                        correctVal = seg.correct;
                        explanation = getTranslation(seg.explanation || 'hintAction');
                    }
                } else {
                    const taskIndex = parseInt(id.replace('phase2-', ''));
                    const task = exercise.phase2_tasks[taskIndex];
                    if (task) {
                        correctVal = task.correct;
                        let explKey = task.explanation ? 'verbExpl_' + this.normalize(task.explanation) : 'hintAction';
                        const translatedExpl = getTranslation(explKey);
                        explanation = (translatedExpl === explKey) ? (task.explanation || getTranslation('hintAction')) : translatedExpl;
                    }
                }

                if (val === "") {
                    delete this.feedback[id];
                } else if (val === correctVal) {
                    this.feedback[id] = 'correct';
                } else {
                    this.feedback[id] = 'wrong';
                    const fb = container.querySelector('#exercise-feedback');
                    fb.textContent = explanation;
                    fb.style.display = 'block';
                }

                this.updateView();
            };
        });

        // Next buttons are handled in renderFooterButtons via checkBtn-less logic

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
        if (document.getElementById('verbum-learning-styles')) {
            document.getElementById('verbum-learning-styles').remove();
        }
        const styles = document.createElement('style');
        styles.id = 'verbum-learning-styles';
        styles.textContent = `
            .verbum-learning-view .category-illustration {
                width: 100%;
                max-width: 400px;
                height: auto;
                border-radius: 20px;
                margin: 0 auto 1.5rem;
                display: block;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            @media (max-width: 600px) {
                .verbum-learning-view .category-illustration { max-width: 280px; margin-bottom: 1rem; }
            }
            .exercise-card {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 24px;
                padding: 2.5rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 1rem;
            }
            .sentence-row {
                display: block;
                padding: 2.2rem 0;
                border-bottom: 2px solid rgba(255, 255, 255, 0.1);
                text-align: center;
                width: 100%;
            }
            .sentence-row:last-child {
                border-bottom: none;
            }
            .sent-clue {
                display: block !important;
                font-size: 1.25rem !important;
                color: rgba(255, 255, 255, 0.7) !important;
                font-style: italic !important;
                margin-bottom: 1.2rem !important;
                font-weight: 300 !important;
                text-align: center !important;
                letter-spacing: 0.02rem;
            }
            .sentence-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                font-size: 1.7rem;
                line-height: 1.6;
                color: #fff;
                gap: 0.4rem 0.8rem;
            }
            .sentence-number {
                font-weight: 900;
                color: #ffcc00;
                font-size: 1.4rem;
                margin-right: 0.5rem;
            }
            .text-part {
                display: inline-block;
            }
            .select-wrapper {
                display: inline-block;
                margin: 0.2rem 0.3rem;
            }
            .grammatik-select {
                min-width: 140px !important;
                height: 3.2rem;
                font-size: 1.6rem !important;
                background: rgba(255,255,255,0.08) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                color: #fff !important;
                border-radius: 12px !important;
                padding: 0 1rem !important;
            }
            @media (max-width: 600px) {
                .sentence-content { font-size: 1.4rem; gap: 0.3rem 0.5rem; }
                .grammatik-select { min-width: 100px !important; height: 2.6rem; font-size: 1.25rem !important; }
                .sentence-row { padding: 1.8rem 0; }
                .sent-clue { font-size: 1.1rem !important; margin-bottom: 0.8rem !important; }
                .sentence-number { font-size: 1.2rem; }
            }
            .phase2-item {
                background: rgba(255, 255, 255, 0.04);
                padding: 1.5rem;
                border-radius: 18px;
                margin-bottom: 2rem !important;
                text-align: left;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .sentence-label {
                color: #ffcc00;
                font-weight: 600;
                margin-right: 0.5rem;
                font-size: 0.9em;
                text-transform: uppercase;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(styles);
    }
}
