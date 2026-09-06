import { getTranslation, appState } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function initAdverbDialogExerciseView(container, navigateFn) {
    // 2 sets of 5 questions
    const questionSets = [
        [
            {
                sentence: ["Jeg hørte i radioen i morges, at det", "bliver regnvejr i eftermiddag."],
                options: ["nok", "vel", "vist"],
                correct: ["vist"],
                hints: {
                    "nok": "Du har hørt det udefra (fra radioen), så det er ikke din egen uafhængige vurdering.",
                    "vel": "Du spørger ikke om bekræftelse her, du fremsætter en påstand du har hørt."
                },
                feedback: {
                    "vist": "Korrekt! Du bruger 'vist', fordi du har din viden fra en ekstern kilde (radioen)."
                }
            },
            {
                sentence: ["Av, du skar dig! Det gør", "ondt?"],
                options: ["nok", "vel", "vist"],
                correct: ["vel"],
                hints: {
                    "nok": "Du ved ikke selv, hvor ondt det gør på den anden person. Du søger bekræftelse.",
                    "vist": "Du har ikke hørt det som et rygte udefra, du taler direkte til personen."
                },
                feedback: {
                    "vel": "Korrekt! Du appellerer direkte til modtagerens egen oplevelse."
                }
            },
            {
                sentence: ["Mørke skyer trækker op. Det bliver", "regnvejr."],
                options: ["nok", "vel", "vist"],
                correct: ["nok"],
                hints: {
                    "vel": "Du søger ikke nødvendigvis enighed, du drager bare en logisk konklusion ud fra skyerne.",
                    "vist": "Du har ikke hørt det udefra; du ser selv på skyerne og vurderer situationen."
                },
                feedback: {
                    "nok": "Korrekt! Det er din egen logiske vurdering ud fra det, du ser."
                }
            },
            {
                sentence: ["Han har", "ikke tid på torsdag."],
                options: ["nok", "vel", "vist"],
                correct: ["nok", "vel", "vist"],
                hints: {},
                feedback: {
                    "nok": "Korrekt! Med 'nok' udtrykker du din egen personlige vurdering (jeg tror ikke, han har tid).",
                    "vel": "Korrekt! Med 'vel' appellerer du til samtalepartneren (vi er enige om, at han ikke har tid, ikke sandt?).",
                    "vist": "Korrekt! Med 'vist' fortæller du, at du har hørt udefra / et rygte om, at han ikke har tid."
                }
            },
            {
                sentence: ["De har", "allerede spist aftensmad."],
                options: ["nok", "vel", "vist"],
                correct: ["nok", "vel", "vist"],
                hints: {},
                feedback: {
                    "nok": "Korrekt! Det er dit eget gæt baseret på klokken (jeg formoder, de har spist).",
                    "vel": "Korrekt! Du forventer, at modtageren er enig i, at det nok er tilfældet.",
                    "vist": "Korrekt! Du husker svagt, at nogen nævnte det for dig."
                }
            }
        ],
        [
            {
                sentence: ["Peter sagde til mig, at mødet", "gik meget dårligt."],
                options: ["nok", "vel", "vist"],
                correct: ["vist"],
                hints: {
                    "nok": "Du udtaler dig om noget, Peter har sagt. Det er ikke din egen vurdering.",
                    "vel": "Du spørger ikke om bekræftelse på et rygte."
                },
                feedback: {
                    "vist": "Korrekt! Du refererer til andres ord (Peters), som din kilde."
                }
            },
            {
                sentence: ["Jeg har kigget på tallene, og vi klarer den", "inden deadline."],
                options: ["nok", "vel", "vist"],
                correct: ["nok"],
                hints: {
                    "vel": "Du har lige regnet på det selv, så det er din egen stærke vurdering.",
                    "vist": "Du bygger ikke på andres udsagn, men på dine egne beregninger."
                },
                feedback: {
                    "nok": "Korrekt! Du har regnet på det og foretager din egen vurdering af situationen."
                }
            },
            {
                sentence: ["Bilen kan", "køre et par hundrede kilometer endnu."],
                options: ["nok", "vel", "vist"],
                correct: ["nok", "vel", "vist"],
                hints: {},
                feedback: {
                    "nok": "Korrekt! Det er dit eget gæt som bilist (jeg tror, den kan klare det).",
                    "vel": "Korrekt! Du forventer, at den du taler med, er enig i, at det går fint.",
                    "vist": "Korrekt! Du har fx læst eller hørt fra andre, at modellen har god rækkevidde."
                }
            },
            {
                sentence: ["Du har boet i Danmark i fem år, så du forstår", "dansk nu?"],
                options: ["nok", "vel", "vist"],
                correct: ["vel"],
                hints: {
                    "nok": "Du henvender dig direkte til personen og forventer et bekræftende svar.",
                    "vist": "Du ved godt, personen har boet her, så det er et direkte spørgsmål formuleret som forventning."
                },
                feedback: {
                    "vel": "Korrekt! Det er et direkte spørgsmål formuleret som en stærk forventning til modtageren."
                }
            },
            {
                sentence: ["Det er", "det bedste, der kunne ske i denne situation."],
                options: ["nok", "vel", "vist"],
                correct: ["nok", "vel", "vist"],
                hints: {},
                feedback: {
                    "nok": "Korrekt! Det er din egen personlige konklusion på situationen.",
                    "vel": "Korrekt! Du søger bekræftelse fra den person, du taler med.",
                    "vist": "Korrekt! Du har hørt andre sige, at det objektivt set var den bedste løsning."
                }
            }
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
                        Dialog - adverbier
                    </h2>
                    <span class="adv-choice-set-counter">
                        ${getTranslation('exerciseSetCounter', { n: currentSetIndex + 1, total: 2 })}
                    </span>
                </div>
                
                <div style="background: rgba(var(--primary-rgb, 90, 120, 255), 0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 2.5rem; border-left: 4px solid var(--primary-color, #5a78ff);">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <img src="${baseUrl}dialogadverbier.png" alt="Dialogadverbier" style="max-width: 100%; border-radius: 12px;">
                    </div>
                    <p style="margin-top: 0; margin-bottom: 1rem; font-size: 1.1rem; line-height: 1.5;">
                        <strong>Dialogadverbier – Hvor sikker er du, og hvor kommer din viden fra?</strong><br>
                        Disse adverbier udtrykker usikkerhed og peger på, <em>hvor</em> din viden kommer fra:
                    </p>
                    <ul style="margin-bottom: 1rem; font-size: 1.05rem; line-height: 1.6; padding-left: 1.5rem;">
                        <li><strong>nok</strong>: Din egen vurdering ("Jeg tror, det er sådan").</li>
                        <li><strong>vel</strong>: Samtalepartnerens viden / Forventning om enighed ("Du er enig, ikke?").</li>
                        <li><strong>vist</strong>: Hørt fra andre / Ekstern viden ("Jeg har hørt, at det er sådan").</li>
                    </ul>
                    <p style="margin-bottom: 0;">
                        Nogle gange kan <strong>alle tre</strong> være rigtige, og valget ændrer blot meningen med sætningen!
                    </p>
                </div>
 
                <div class="questions-list">
                    ${questions.map((q, i) => {
                        const absoluteIdx = (currentSetIndex * 5) + i;
                        const parts = Array.isArray(q.sentence) ? q.sentence : q.sentence.split('____');
                        const borderColor = scores[i] === null ? 'rgba(255,255,255,0.1)' : (scores[i] ? '#4CAF50' : '#F44336');
            
                        let feedbackText = '';
                        if (scores[i] !== null) {
                            if (scores[i]) {
                                // Find translation key if exists, else fallback to JS object
                                const transKey = `dialogadv_${absoluteIdx}_feedback_${questions[i].selectedValue}`;
                                feedbackText = '✓ ' + (getTranslation(transKey) === transKey ? q.feedback[questions[i].selectedValue] : getTranslation(transKey));
                            } else {
                                const safeOpt = questions[i].selectedValue ? questions[i].selectedValue.replace(/[^a-zA-ZæøåÆØÅ]/g, '') : '';
                                const transKey = `dialogadv_${absoluteIdx}_hint_${safeOpt}`;
                                feedbackText = '⚠ ' + (getTranslation(transKey) === transKey ? (q.hints[questions[i].selectedValue] || "Prøv igen.") : getTranslation(transKey));
                            }
                        }

                        return `
                            <div class="question-wrapper" style="margin-bottom: 2rem;">
                                <div class="question-row">
                                    <span>${parts[0]}</span>
                                    <select class="adverb-select-input" data-index="${i}" style="border: 2px solid ${borderColor};">
                                        <option value="">...</option>
                                        ${q.options.map(opt => `<option value="${opt}" ${questions[i].selectedValue === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                                    </select>
                                    <span>${parts[1] || ''}</span>
                                    ${scores[i] !== null ? (scores[i] ? '<i class="fas fa-check" style="color: #4CAF50; margin-left: 0.5rem;"></i>' : '<i class="fas fa-times" style="color: #F44336; margin-left: 0.5rem;"></i>') : ''}
                                </div>
                                <div id="feedback-${i}" class="row-feedback" style="display: ${scores[i] !== null ? 'block' : 'none'}; font-style: italic; font-size: 0.95rem; margin-top: 0.5rem; padding: 0.5rem 1rem; border-left: 3px solid ${borderColor}; background: ${scores[i] ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; border-radius: 4px; color: ${borderColor};">
                                    ${feedbackText}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
 
                <div class="adv-choice-controls">
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
            if (navigateFn) {
                navigateFn('pronomen', { subPath: 'adverbier_menu' });
            } else {
                window.location.hash = `/${appState.lang}/pronomen`;
            }
        });

        const selects = container.querySelectorAll('.adverb-select-input');

        selects.forEach((select, i) => {
            select.addEventListener('change', () => {
                const val = select.value;
                if (val === "") {
                    scores[i] = null;
                    questions[i].selectedValue = undefined;
                } else {
                    const isCorrect = questions[i].correct.includes(val);
                    scores[i] = isCorrect;
                    questions[i].selectedValue = val;
                }

                render();

                // Check if all correct to show next button
                const allDone = scores.every(s => s === true);
                if (allDone) {
                    if (currentSetIndex < 1) {
                        const btn = document.getElementById('next-set-btn');
                        if (btn) btn.style.display = 'block';
                    } else {
                        const s = document.getElementById('final-success');
                        if (s) s.style.display = 'block';
                    }
                }
            });
        });

        const nextSetBtn = document.getElementById('next-set-btn');
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
