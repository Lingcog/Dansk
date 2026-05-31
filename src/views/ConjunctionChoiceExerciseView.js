import { getTranslation, appState } from '../utils/i18n.js';

export function initConjunctionChoiceExerciseView(container, navigateFn) {
    // 2 sets of 5 questions
    const questionSets = [
        [
            {
                sentence: ["Jeg fryser,", "det er koldt udenfor."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "fordi",
                hints: {
                    "og": "'Og' lægger bare ting sammen. Her har vi en klar årsag til, at du fryser.",
                    "men": "Der er ikke en modsætning. Kulde gør jo, at man fryser.",
                    "når": "'Når' er ikke så stærk en årsag som 'fordi' i denne sammenhæng.",
                    "da": "'Da' bruges i datid (fortid), men her står der 'fryser' og 'er'."
                },
                feedback: "Korrekt! 'Fordi' viser os grunden til, at du fryser."
            },
            {
                sentence: ["Jeg vil gerne sove,", "jeg skal på arbejde."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "men",
                hints: {
                    "og": "Her er et lille problem: lysten til at sove går imod pligten til at arbejde.",
                    "fordi": "Du vil ikke sove PÅ GRUND AF arbejdet.",
                    "når": "Tid passer ikke ind her.",
                    "da": "Det er nutid."
                },
                feedback: "Korrekt! 'Men' viser meget fint en modsætning mellem ønske og pligt."
            },
            {
                sentence: ["Solen skinner,", "fuglene synger."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "og",
                hints: {
                    "men": "Der er to positive ting uden modsætning.",
                    "fordi": "Solen skinner jo ikke, FORDI fuglene synger (det er ikke fuglenes skyld).",
                    "når": "Man kunne måske, men 'og' binder de to sidestillede udsagn bedst sammen.",
                    "da": "Det er nutid."
                },
                feedback: "Korrekt! 'Og' kobler nemt to ligeværdige fakta sammen."
            },
            {
                sentence: ["Jeg bliver meget glad,", "jeg ser min hund."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "når",
                hints: {
                    "og": "Sætningen viser, at den ene ting udeløser den anden hver gang.",
                    "men": "Hunde plejer ikke at være en dårlig ting (ingen modsætning).",
                    "fordi": "Ordet kan også bruges, men vi vil gerne vise vanen i tiden.",
                    "da": "Vi bruger kun 'da' om én bestemt gang i fortiden."
                },
                feedback: "Korrekt! 'Når' bruges, fordi dette sker mere end én gang (en vane)."
            },
            {
                sentence: ["Jeg boede i København,", "jeg var lille."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "da",
                hints: {
                    "og": "Passer ikke tidsmæssigt sammen.",
                    "men": "Det er bare fakta fra fortiden.",
                    "fordi": "At være lille er ikke nødvendigvis årsagen til, at man bor i København.",
                    "når": "Husk reglen: 'Først da, så når'. Én gang i fortiden = da."
                },
                feedback: "Korrekt! 'Da' peger på en bestemt, enkeltstående periode i fortiden."
            }
        ],
        [
            {
                sentence: ["Bilen er lille,", "den er meget hurtig."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "men",
                hints: {
                    "og": "'Lille' og 'meget hurtig' skaber ofte en uventet kontrast i biler.",
                    "fordi": "En bil er ikke typisk meget hurtig GRUNDET dens lidenhed.",
                    "når": "Det har ikke noget med tid at gøre.",
                    "da": "Nutid."
                },
                feedback: "Korrekt! Hurtighed fra en meget lille bil er oftest en overraskelse (men)."
            },
            {
                sentence: ["Han spiser et æble,", "han er sulten."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "fordi",
                hints: {
                    "og": "Der er en direkte grund her.",
                    "men": "Han er sulten, så det er logisk, at han spiser! Ingen modsætning.",
                    "når": "Tid virker dårligere end at fortælle årsagen klart.",
                    "da": "Nutid."
                },
                feedback: "Korrekt! 'Fordi' er bindeordet for grund og årsag."
            },
            {
                sentence: ["Jeg ringer til dig,", "jeg kommer hjem fra skole."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "når",
                hints: {
                    "og": "Den sidste sætning er en tidsbetingelse for den første.",
                    "men": "Intet forhindrer opkaldet.",
                    "fordi": "Din hjemkomst er betingelsen for opkaldet, ikke begrundelsen for overhovedet at kende dig.",
                    "da": "Dette sker i fremtiden! 'Da' hører hjemme i fortiden."
                },
                feedback: "Korrekt! Ved punktnedslag i fremtiden benytter vi 'når'."
            },
            {
                sentence: ["Jeg var 10 år gammel,", "vi flyttede til Aarhus."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "da",
                hints: {
                    "og": "Vi skal bruge et tidsord for at forbinde alderen med flytningen.",
                    "men": "Alderen forhindrede jer jo ikke.",
                    "fordi": "Din alder var ikke årsagen til familiens flytning.",
                    "når": "Dette skete kun én gang for længe siden. Husk: 'Da'."
                },
                feedback: "Korrekt! En utvetydig handling foretaget i fortiden tager 'da'."
            },
            {
                sentence: ["Vi køber mælk", "brød i supermarkedet."],
                options: ["og", "men", "fordi", "når", "da"],
                correct: "og",
                hints: {
                    "men": "I kan sagtens købe begge dele uden modsætning.",
                    "fordi": "Mælk købes ikke fordi 'brød i supermarkedet'.",
                    "når": "Giver ingen grammatisk mening her.",
                    "da": "Giver ingen grammatisk mening her."
                },
                feedback: "Korrekt! 'Og' binder navneordene klassisk og fint sammen."
            }
        ]
    ];

    let currentSetIndex = 0;
    let scores = [null, null, null, null, null];

    function render() {
        const questions = questionSets[currentSetIndex];

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
                .conj-select-input {
                    padding: 0.4rem 0.6rem;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    background: var(--bg-card);
                    color: var(--text-primary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 2px solid rgba(255,255,255,0.1);
                    min-width: 100px;
                }
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
                
                @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                @media (max-width: 600px) {
                    .conj-choice-container { margin: 1rem; padding: 1.5rem; }
                    .question-row { font-size: 1.05rem; gap: 0.4rem; }
                    .conj-select-input { font-size: 0.95rem; padding: 0.3rem 0.5rem; min-width: 80px; }
                    .conj-choice-controls { flex-direction: column; align-items: stretch; }
                    .conj-choice-controls button { width: 100%; }
                }
            `;
            document.head.appendChild(styles);
        }

        container.innerHTML = `
            <div class="exercise-container premium-card animate-fade-in conj-choice-container">
                <button id="conj-back-btn" class="back-btn" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-arrow-left"></i> ${getTranslation('back')}
                </button>
                
                <div class="conj-choice-header">
                    <h2 style="color: var(--primary-color); margin: 0;">
                        ${getTranslation('conjunctionChoiceTitle')}
                    </h2>
                    <span class="conj-choice-set-counter">
                        ${getTranslation('exerciseSetCounter', { n: currentSetIndex + 1, total: 2 })}
                    </span>
                </div>
                
                <p style="color: var(--text-secondary); margin-bottom: 2.5rem; font-size: 1.1rem;">
                    ${getTranslation('conjunctionChoiceDesc')}
                </p>
  
                <div class="questions-list">
                    ${questions.map((q, i) => {
            const absoluteIdx = (currentSetIndex * 5) + i;
            const parts = Array.isArray(q.sentence) ? q.sentence : q.sentence.split('____');
            const borderColor = scores[i] === null ? 'rgba(255,255,255,0.1)' : (scores[i] ? '#4CAF50' : '#F44336');
            const isCorrect = scores[i] === true;
            const isWrong = scores[i] === false;

            let feedbackText = '';
            if (scores[i] !== null) {
                if (isCorrect) {
                    feedbackText = '✓ ' + (getTranslation(`conj_${absoluteIdx}_feedback`) || q.feedback);
                } else {
                    const safeOpt = q.selectedValue ? q.selectedValue.replace(/[^a-zA-ZæøåÆØÅ]/g, '') : '';
                    feedbackText = '⚠ ' + (getTranslation(`conj_${absoluteIdx}_hint_${safeOpt}`) || q.hints[q.selectedValue] || "Prøv igen. Tænk på forbindelsen mellem sætningerne.");
                }
            }

            return `
                            <div class="question-wrapper">
                                <div class="question-row">
                                    <span>${parts[0]}</span>
                                    <select class="conj-select-input" data-index="${i}" style="border-color: ${borderColor};">
                                        <option value="">...</option>
                                        ${q.options.map(opt => `<option value="${opt}" ${q.selectedValue === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                                    </select>
                                    <span>${parts[1] || ''}</span>
                                    ${isCorrect ? '<i class="fas fa-check-circle" style="color: #4CAF50;"></i>' : ''}
                                    ${isWrong ? '<i class="fas fa-exclamation-circle" style="color: #F44336;"></i>' : ''}
                                </div>
                                ${scores[i] !== null ? `
                                    <div class="row-feedback" style="background: ${isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; border: 1px solid ${borderColor}; color: ${isCorrect ? '#81C784' : '#E57373'};">
                                        <span>${feedbackText}</span>
                                    </div>
                                ` : ''}
                            </div>
                        `;
        }).join('')}
                </div>
  
                <div class="conj-choice-controls">
                    ${currentSetIndex < 1 ? `
                        <button id="next-set-btn" class="secondary-button" style="display: ${scores.every(s => s === true) ? 'block' : 'none'}; padding: 0.8rem 2rem; border-radius: 50px;">
                            ${getTranslation('newExercise')} <i class="fas fa-arrow-right"></i>
                        </button>
                    ` : `
                        <div id="final-success" style="display: ${scores.every(s => s === true) ? 'block' : 'none'}; color: #4CAF50; font-weight: bold; text-align: center; font-size: 1.2rem; background: rgba(76, 175, 80, 0.1); padding: 1rem; border-radius: 12px; width: 100%;">
                            <i class="fas fa-star"></i> ${getTranslation('allCorrect')}
                        </div>
                    `}
                </div>
            </div>
        `;

        document.getElementById('conj-back-btn').addEventListener('click', () => {
            if (navigateFn) {
                navigateFn('pronomen');
            } else {
                window.location.hash = `/${appState.lang}/pronomen`;
            }
        });

        const selects = container.querySelectorAll('.conj-select-input');

        selects.forEach((select, i) => {
            select.addEventListener('change', () => {
                const val = select.value;
                if (val === "") {
                    scores[i] = null;
                    questions[i].selectedValue = undefined;
                } else {
                    const correct = questions[i].correct;
                    scores[i] = (val === correct);
                    questions[i].selectedValue = val;
                }

                render();
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
