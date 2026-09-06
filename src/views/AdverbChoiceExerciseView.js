import { getTranslation, appState } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function initAdverbChoiceExerciseView(container, navigateFn) {
    // 2 sets of 5 questions
    const questionSets = [
        [
            {
                sentence: ["Maden smager rigtig", "."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "godt",
                hints: {
                    "måske": "Ordet 'rigtig' er meget stærkt, så usikkerhed (måske) passer ikke.",
                    "ikke": "Man siger normalt ikke 'rigtig ikke' på dansk her.",
                    "også": "'Rigtig også' findes ikke som bindeled her.",
                    "altid": "'Rigtig altid' er ikke korrekt dansk."
                },
                feedback: "Korrekt! 'Rigtig godt' betyder, at du meget gerne vil spise det."
            },
            {
                sentence: ["Jeg har en hund. Min ven har", "en hund."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "også",
                hints: {
                    "måske": "Første sætning er et faktum, så vennen har sikkert en hund ligesom dig.",
                    "godt": "Dette udtrykker ikke, at I begge har det samme.",
                    "ikke": "Sætningen lyder som om, den vil vise en lighed (I er ens).",
                    "altid": "'Har altid en hund' er for voldsomt et ord bare for at vise en lighed."
                },
                feedback: "Korrekt! 'Også' samler de to sætninger, fordi I har den samme ting."
            },
            {
                sentence: ["Hver morgen drikker jeg kaffe. Jeg drikker", "kaffe om morgenen."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "altid",
                hints: {
                    "måske": "Der står 'Hver morgen', så du gør det 100 procent med sikkerhed.",
                    "godt": "'Drikker godt' lyder ikke naturligt her sammenlignet med et tidsord.",
                    "ikke": "Der står 'Hver morgen', så 'ikke' er helt forkert.",
                    "også": "Mangler noget at sammenligne med (hvem drikker ellers kaffe?)."
                },
                feedback: "Korrekt! 'Altid' passer perfekt til 'Hver morgen' (gentagelse)."
            },
            {
                sentence: ["Jeg forstår det", ". Jeg må læse teksten én gang til."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "ikke",
                hints: {
                    "måske": "Sætningen 'Jeg må læse teksten igen' viser stærk sikkerhed om at du fejlede.",
                    "godt": "Hvis du forstår den 'godt', behøver du ikke læse igen.",
                    "også": "Giver ingen mening her.",
                    "altid": "Forstår du altid teksten, hvis du skal læse den igen? Nej."
                },
                feedback: "Korrekt! 'Ikke' benægter (viser et nej) til den første sætning."
            },
            {
                sentence: ["Himlen er meget mørk. Det regner", "i aften."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "måske",
                hints: {
                    "godt": "Man bruger ikke 'godt' om regn på denne måde før vejret er startet.",
                    "ikke": "Mørke skyer betyder oftest regn. Så 'ikke' er usandsynligt.",
                    "også": "Hvad mangler at regne også? Ingen kontekst.",
                    "altid": "Det regner (forhåbentlig) ikke altid, selv hvis det er mørkt."
                },
                feedback: "Korrekt! 'Måske' betyder, at der er en god chance for at det sker."
            }
        ],
        [
            {
                sentence: ["Min nye lærer siger, at jeg taler meget", "dansk."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "godt",
                hints: {
                    "måske": "'Meget måske' findes slet ikke på dansk.",
                    "ikke": "'Meget ikke' giver ingen mening bagefter at tale.",
                    "også": "Læreren roser dig (siger noget pænt).",
                    "altid": "'Meget altid' er helt forkert."
                },
                feedback: "Korrekt! 'Meget godt' er en høj, rosende karakter."
            },
            {
                sentence: ["Det er vinter, og vandet er is-koldt. Jeg kan", "lide at bade i dag."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "ikke",
                hints: {
                    "måske": "Kolde temperaturer kræver som regel et hårdt 'nej' for de fleste.",
                    "godt": "De færreste kan lide iskoldt vand frivilligt uden grund.",
                    "også": "Der mangler noget (hvem bader ellers ikke?).",
                    "altid": "'Altid lide at bade' bryder meningen, når det er iskoldt i dag."
                },
                feedback: "Korrekt! Ordet 'ikke' fortæller, at du afviser turen i vandet."
            },
            {
                sentence: ["Emma læser en bog. Jonas læser", "en bog."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "også",
                hints: {
                    "måske": "Læser Jonas gættende en bog? Nej, faktummet er slået fast.",
                    "godt": "'Læser godt en bog' passer skidt som en sammenhæng mellem de to.",
                    "ikke": "Normalt vil man bruge strukturen til at binde ligheden sammen.",
                    "altid": "Der refereres bare til situationen lige nu."
                },
                feedback: "Korrekt! Du forbinder ligheden ('også') mellem Emma og Jonas."
            },
            {
                sentence: ["Jeg ved ikke, hvad klokken er. Den er", "tolv."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "måske",
                hints: {
                    "godt": "'Klokken er godt tolv' bruger man nogle gange om 'lidt over tolv', men 'ved ikke' inviterer til et gæt.",
                    "ikke": "Hvis du ikke ved, hvad den er, hvordan ved du så, den ikke er tolv?",
                    "også": "Ingen sammenhæng i sætningerne.",
                    "altid": "Klokken ændrer sig hele tiden, så den er ikke altid tolv."
                },
                feedback: "Korrekt! Da du ikke ved det, er det et gæt (måske)."
            },
            {
                sentence: ["En uge har", "syv dage. Sådan er det hvert år."],
                options: ["måske", "godt", "ikke", "også", "altid"],
                correct: "altid",
                hints: {
                    "måske": "Det er et hundrede procent faktum bestemt af kalenderen.",
                    "godt": "'Har godt syv dage' er dårligt dansk.",
                    "ikke": "En uge har aldrig otte dage.",
                    "også": "Tæt på meningsløst uden yderligere referencer."
                },
                feedback: "Korrekt! Et fast faktum uden stop ('altid')."
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
    .adv - choice - container { max - width: 800px; margin: 2rem auto; padding: 2.5rem; }
                .adv - choice - header { display: flex; justify - content: space - between; align - items: baseline; margin - bottom: 1.5rem; flex - wrap: wrap; gap: 0.5rem; }
                .adv - choice - set - counter { font - weight: bold; color: var(--primary - color); }
                .questions - list { display: flex; flex - direction: column; gap: 1.5rem; }
                .question - row { display: flex; align - items: center; gap: 0.6rem; font - size: 1.2rem; line - height: 1.4; flex - wrap: wrap; }
                .adverb - select - input {
    padding: 0.4rem 0.6rem;
    border - radius: 8px;
    font - size: 1.1rem;
    background: var(--bg - card);
    color: var(--text - primary);
    cursor: pointer;
    transition: all 0.2s ease;
}
                .adv - choice - controls { margin - top: 2rem; display: flex; justify - content: space - between; align - items: center; gap: 1rem; }

@media(max - width: 600px) {
                    .adv - choice - container { margin: 1rem; padding: 1.5rem; }
                    .question - row { font - size: 1.05rem; gap: 0.4rem; border - bottom: 1px solid rgba(255, 255, 255, 0.05); padding - bottom: 0.8rem; }
                    .adverb - select - input { font - size: 0.95rem; padding: 0.3rem 0.5rem; }
                    .adv - choice - controls { flex - direction: column; align - items: stretch; }
                    .adv - choice - controls button { width: 100 %; }
}
`;
            document.head.appendChild(styles);
        }

        container.innerHTML = `
    < div class="exercise-container premium-card animate-fade-in adv-choice-container" >
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
                
                <div style="background: rgba(var(--primary-rgb, 90, 120, 255), 0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 2.5rem; border-left: 4px solid var(--primary-color, #5a78ff);">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <img src="${baseUrl}holdningsadverbier.png" alt="Holdningsadverbier" style="max-width: 100%; border-radius: 12px;">
                    </div>
                    <p style="margin-top: 0; margin-bottom: 1rem; font-size: 1.1rem; line-height: 1.5;">
                        Holdningsadverbier modificerer verbet og udtrykker talerens holdning til handlingen.
                    </p>
                    <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <span style="color: #4CAF50; font-weight: bold;">Eksempel:</span> "Maden smager <strong>rigtig</strong> godt."
                    </div>
                    <p style="margin-bottom: 0;">
                        Om ordstilling <a href="#/${appState.lang}/ordstilling" style="color: var(--primary-color, #5a78ff); text-decoration: underline; font-weight: bold;">tryk på dette link</a>.
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
                    feedbackText = '✓ ' + (getTranslation(`adv_${absoluteIdx}_feedback`) || q.feedback);
                } else {
                    const safeOpt = questions[i].selectedValue ? questions[i].selectedValue.replace(/[^a-zA-ZæøåÆØÅ]/g, '') : '';
                    feedbackText = '⚠ ' + (getTranslation(`adv_${absoluteIdx}_hint_${safeOpt}`) || q.hints[questions[i].selectedValue] || "Prøv igen.");
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
            </div >
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
                    const correct = questions[i].correct;
                    scores[i] = (val === correct);
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
