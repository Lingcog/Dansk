import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderBestemthedView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container bestemthed-view';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('pronomen', { subPath: 'artikler_menu' });
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header
    const title = document.createElement('h1');
    title.textContent = 'En kat / katten? (bestemt og ubestemt)';
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Lær at sætte navneord i bestemt form.';
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);

    const exerciseArea = document.createElement('div');
    exerciseArea.className = 'exercise-container';
    viewContainer.appendChild(exerciseArea);

    const data = [
        {
            s1_pre: 'Hvad er det? - Det er ', s1_post: '.', s1_options: ['en kat', 'katten'], s1_correct: 'en kat',
            s2_pre: 'Hvor er ', s2_post: '? - Her er den!', s2_options: ['en kat', 'katten'], s2_correct: 'katten'
        },
        {
            s1_pre: 'Hvad er det? - Det er ', s1_post: '.', s1_options: ['et bord', 'bordet'], s1_correct: 'et bord',
            s2_pre: 'Hvor er ', s2_post: '? - Her er det!', s2_options: ['et bord', 'bordet'], s2_correct: 'bordet'
        },
        {
            s1_pre: 'Der holder ', s1_post: ' på gaden.', s1_options: ['en bil', 'bilen'], s1_correct: 'en bil',
            s2_pre: '', s2_post: ' er rød.', s2_options: ['En bil', 'Bilen'], s2_correct: 'Bilen'
        },
        {
            s1_pre: 'Han spiser ', s1_post: '.', s1_options: ['et æble', 'æblet'], s1_correct: 'et æble',
            s2_pre: '', s2_post: ' smager godt.', s2_options: ['Et æble', 'Æblet'], s2_correct: 'Æblet'
        },
        {
            s1_pre: 'Hun læser i ', s1_post: '.', s1_options: ['en bog', 'bogen'], s1_correct: 'en bog',
            s2_pre: '', s2_post: ' er spændende.', s2_options: ['En bog', 'Bogen'], s2_correct: 'Bogen'
        },
        {
            s1_pre: 'Vi vil gerne købe ', s1_post: '.', s1_options: ['et hus', 'huset'], s1_correct: 'et hus',
            s2_pre: '', s2_post: ' skal være stort.', s2_options: ['Et hus', 'Huset'], s2_correct: 'Huset'
        },
        {
            s1_pre: 'Der løber ', s1_post: ' i parken.', s1_options: ['en hund', 'hunden'], s1_correct: 'en hund',
            s2_pre: '', s2_post: ' gør meget højt.', s2_options: ['En hund', 'Hunden'], s2_correct: 'Hunden'
        },
        {
            s1_pre: 'Hører du ', s1_post: ' græde?', s1_options: ['et barn', 'barnet'], s1_correct: 'et barn', // maybe "hører du et barn"
            s2_pre: 'Ja, ', s2_post: ' er vist sultent.', s2_options: ['et barn', 'barnet'], s2_correct: 'barnet'
        },
        {
            s1_pre: 'Jeg har fået ', s1_post: ' i fødselsdagsgave.', s1_options: ['en cykel', 'cyklen'], s1_correct: 'en cykel',
            s2_pre: '', s2_post: ' kører lynhurtigt.', s2_options: ['En cykel', 'Cyklen'], s2_correct: 'Cyklen'
        },
        {
            s1_pre: 'Der står ', s1_post: ' på bordet.', s1_options: ['en kop', 'koppen'], s1_correct: 'en kop',
            s2_pre: '', s2_post: ' er fyldt med kaffe.', s2_options: ['En kop', 'Koppen'], s2_correct: 'Koppen'
        }
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
                <img src="${baseUrl}kat_bord_guide.png" alt="Bestemthed guide" style="max-width: 100%; border-radius: 12px; margin-bottom: 2rem;">
            </div>
            
            <div class="question-wrapper" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <div class="question-row" style="font-size: 1.4rem; line-height: 2; display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                    <span>${item.s1_pre}</span>
                    <span class="select-wrapper">
                        <select id="sel1" class="grammatik-select" style="font-size: 1.3rem; padding: 0.3rem 0.6rem; border-radius: 8px;">
                            <option value="">...</option>
                            ${item.s1_options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>
                    </span>
                    <span>${item.s1_post}</span>
                    <span id="res1" style="margin-left: 2px; margin-right: 15px;"></span>
                    
                    <span>${item.s2_pre}</span>
                    <span class="select-wrapper">
                        <select id="sel2" class="grammatik-select" style="font-size: 1.3rem; padding: 0.3rem 0.6rem; border-radius: 8px;">
                            <option value="">...</option>
                            ${item.s2_options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>
                    </span>
                    <span>${item.s2_post}</span>
                    <span id="res2" style="margin-left: 2px;"></span>
                </div>
                
                <div class="row-feedback" id="feedback" style="display: none; margin-top: 2rem; padding: 1rem; border-radius: 8px; text-align: center; font-size: 1.2rem;"></div>
            </div>
        `;
        exerciseArea.appendChild(stepDiv);

        const sel1 = stepDiv.querySelector('#sel1');
        const sel2 = stepDiv.querySelector('#sel2');
        const feedback = stepDiv.querySelector('#feedback');
        const res1 = stepDiv.querySelector('#res1');
        const res2 = stepDiv.querySelector('#res2');

        const evaluate = () => {
            const val1 = sel1.value;
            const val2 = sel2.value;

            if (val1) {
                const isCorrect1 = val1 === item.s1_correct;
                res1.innerHTML = isCorrect1 ? '✅' : '❌';
                sel1.className = 'grammatik-select ' + (isCorrect1 ? 'correct' : 'wrong');
            } else {
                res1.innerHTML = '';
                sel1.className = 'grammatik-select';
            }

            if (val2) {
                const isCorrect2 = val2 === item.s2_correct;
                res2.innerHTML = isCorrect2 ? '✅' : '❌';
                sel2.className = 'grammatik-select ' + (isCorrect2 ? 'correct' : 'wrong');
            } else {
                res2.innerHTML = '';
                sel2.className = 'grammatik-select';
            }

            if (val1 && val2) {
                const isCorrect1 = val1 === item.s1_correct;
                const isCorrect2 = val2 === item.s2_correct;

                feedback.style.display = 'block';

                if (isCorrect1 && isCorrect2) {
                    feedback.textContent = 'Helt rigtigt! 🎉';
                    feedback.style.background = 'rgba(76, 175, 80, 0.1)';
                    feedback.style.border = '1px solid #4CAF50';
                    feedback.style.color = '#81C784';
                    
                    sel1.disabled = true;
                    sel2.disabled = true;
                    
                    score++;
                    setTimeout(() => {
                        currentIdx++;
                        renderExercise();
                    }, 1500);
                } else {
                    feedback.textContent = 'Prøv igen! Husk at bruge "en/et" første gang, og "-en/-et" næste gang.';
                    feedback.style.background = 'rgba(244, 67, 54, 0.1)';
                    feedback.style.border = '1px solid #F44336';
                    feedback.style.color = '#E57373';
                }
            } else {
                feedback.style.display = 'none';
            }
        };

        sel1.addEventListener('change', evaluate);
        sel2.addEventListener('change', evaluate);
    }

    function renderResult() {
        exerciseArea.innerHTML = `
            <div class="step-content final-step animate-in">
                <div class="success-icon">🎉</div>
                <h2>Flot gået!</h2>
                <p>Du forstår nu, hvornår man bruger bestemt og ubestemt form.</p>
                <button class="gemini-btn" id="finish-btn">Afslut</button>
            </div>
        `;
        exerciseArea.querySelector('#finish-btn').onclick = () => navigateFn('pronomen', { subPath: 'artikler_menu' });
    }

    renderExercise();

    if (!document.getElementById('bestemthed-styles')) {
        const styles = document.createElement('style');
        styles.id = 'bestemthed-styles';
        styles.textContent = `
            .bestemthed-view .grammatik-select {
                background: rgba(255,255,255,0.1);
                color: white;
                border: 2px solid rgba(255,255,255,0.2);
                outline: none;
                cursor: pointer;
                transition: all 0.2s;
            }
            .bestemthed-view .grammatik-select:focus {
                border-color: #5a78ff;
            }
            .bestemthed-view .grammatik-select option {
                background: #1a1a2e;
                color: white;
            }
            .bestemthed-view .grammatik-select.correct {
                border-color: #4CAF50;
                background: rgba(76, 175, 80, 0.2);
            }
            .bestemthed-view .grammatik-select.wrong {
                border-color: #F44336;
                background: rgba(244, 67, 54, 0.2);
            }
        `;
        document.head.appendChild(styles);
    }

    container.appendChild(viewContainer);
}
