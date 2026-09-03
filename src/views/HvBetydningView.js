import { getTranslation } from '../utils/i18n.js';

export function renderHvBetydningView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← Tilbage';
    backBtn.onclick = () => navigateFn('traen_sporgsmal_menu');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = 'Træn betydning af Hv-ord';
    title.style.textAlign = 'center';

    const exerciseContainer = document.createElement('div');
    exerciseContainer.className = 'exercise-container';
    exerciseContainer.style.marginTop = '2rem';
    
    // Quiz data based on Anna situations
    const questions = [
        {
            situation: 'Anna køber frugt og kød.',
            goal: 'Du vil spørge ind til <strong>tingene</strong> hun køber.',
            sentenceParts: ['[ ? ]', ' køber Anna?'],
            options: ['Hvem', 'Hvad', 'Hvornår', 'Hvor'],
            correct: 'Hvad',
            explanation: 'Man bruger "Hvad" til at spørge om ting.'
        },
        {
            situation: 'Anna betaler 100 kroner.',
            goal: 'Du vil spørge ind til <strong>prisen</strong>.',
            sentenceParts: ['[ ? ]', ' betaler Anna?'],
            options: ['Hvor', 'Hvordan', 'Hvor meget', 'Hvad'],
            correct: 'Hvor meget',
            explanation: 'Man bruger "Hvor meget" til at spørge om pris eller mængde.'
        },
        {
            situation: 'Anna køber ind i Netto.',
            goal: 'Du vil spørge ind til <strong>stedet</strong>.',
            sentenceParts: ['[ ? ]', ' køber Anna ind?'],
            options: ['Hvornår', 'Hvor', 'Hvem', 'Hvorhen'],
            correct: 'Hvor',
            explanation: 'Man bruger "Hvor" til at spørge om et sted (placering).'
        },
        {
            situation: 'Anna køber ind kl. 14.',
            goal: 'Du vil spørge ind til <strong>tidspunktet</strong>.',
            sentenceParts: ['[ ? ]', ' køber Anna ind?'],
            options: ['Hvordan', 'Hvad tid', 'Hvornår', 'Hvilken'],
            correct: 'Hvornår',
            explanation: 'Man bruger "Hvornår" til at spørge om tid/tidspunkt.'
        },
        {
            situation: 'Anna betaler med kort.',
            goal: 'Du vil spørge ind til <strong>betalingsmetoden</strong>.',
            sentenceParts: ['[ ? ]', ' betaler Anna?'],
            options: ['Hvad', 'Hvorfor', 'Hvem', 'Hvordan'],
            correct: 'Hvordan',
            explanation: 'Man bruger "Hvordan" til at spørge om måden man gør noget på.'
        },
        {
            situation: 'Anna kører i bil til Netto.',
            goal: 'Du vil spørge ind til <strong>transportmidlet</strong>.',
            sentenceParts: ['[ ? ]', ' kommer Anna til Netto?'],
            options: ['Hvor', 'Hvordan', 'Hvornår', 'Hvad'],
            correct: 'Hvordan',
            explanation: 'Man bruger også "Hvordan" til at spørge om transport.'
        },
        {
            situation: 'Anna køber ind sammen med en veninde.',
            goal: 'Du vil spørge ind til <strong>personen</strong> hun er med.',
            sentenceParts: ['[ ? ]', ' køber Anna ind sammen med?'],
            options: ['Hvem', 'Hvilken', 'Hvad', 'Hvordan'],
            correct: 'Hvem',
            explanation: 'Man bruger "Hvem" til at spørge om personer.'
        }
    ];

    let currentIndex = 0;
    
    function renderQuestion() {
        exerciseContainer.innerHTML = '';
        
        if (currentIndex >= questions.length) {
            // Done
            const doneMsg = document.createElement('h2');
            doneMsg.textContent = '🏆 Fantastisk! Du har nu trænet betydningen af Hv-ord!';
            doneMsg.style.textAlign = 'center';
            doneMsg.style.marginTop = '2rem';
            
            const againBtn = document.createElement('button');
            againBtn.className = 'primary-btn';
            againBtn.textContent = 'Prøv igen';
            againBtn.style.marginTop = '2rem';
            againBtn.onclick = () => {
                currentIndex = 0;
                renderQuestion();
            };
            
            exerciseContainer.appendChild(doneMsg);
            exerciseContainer.appendChild(againBtn);
            return;
        }

        const q = questions[currentIndex];
        
        const sit = document.createElement('p');
        sit.innerHTML = `📍 <em>${q.situation}</em>`;
        sit.style.fontSize = '1.1rem';
        sit.style.color = '#fff';
        sit.style.opacity = '0.9';
        
        const goal = document.createElement('p');
        goal.innerHTML = `🎯 ${q.goal}`;
        goal.style.fontSize = '1.2rem';
        goal.style.margin = '1rem 0 2rem 0';
        
        const sentenceBox = document.createElement('div');
        sentenceBox.style.background = 'rgba(0,0,0,0.3)';
        sentenceBox.style.padding = '1.5rem';
        sentenceBox.style.borderRadius = '12px';
        sentenceBox.style.fontSize = '1.5rem';
        sentenceBox.style.textAlign = 'center';
        sentenceBox.style.marginBottom = '2rem';
        
        const missingWord = document.createElement('span');
        missingWord.textContent = q.sentenceParts[0];
        missingWord.style.color = '#ff9800';
        missingWord.style.fontWeight = 'bold';
        
        const restWord = document.createElement('span');
        restWord.textContent = q.sentenceParts[1];
        
        sentenceBox.appendChild(missingWord);
        sentenceBox.appendChild(restWord);
        
        const optionsGrid = document.createElement('div');
        optionsGrid.style.display = 'grid';
        optionsGrid.style.gridTemplateColumns = '1fr 1fr';
        optionsGrid.style.gap = '1rem';
        
        const feedbackBox = document.createElement('div');
        feedbackBox.style.marginTop = '2rem';
        feedbackBox.style.minHeight = '100px';
        
        // Shuffle options just to be nice, or keep them as is
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.style.padding = '1rem';
            btn.style.fontSize = '1.2rem';
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.border = '2px solid rgba(255,255,255,0.2)';
            btn.style.color = 'white';
            btn.style.borderRadius = '8px';
            btn.style.cursor = 'pointer';
            btn.textContent = opt;
            
            btn.onclick = () => {
                // disable all
                Array.from(optionsGrid.children).forEach(c => c.style.pointerEvents = 'none');
                
                if (opt === q.correct) {
                    btn.style.background = '#4caf50';
                    btn.style.borderColor = '#4caf50';
                    missingWord.textContent = opt;
                    missingWord.style.color = '#4caf50';
                    
                    feedbackBox.innerHTML = `
                        <div style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4caf50; padding: 1rem; border-radius: 8px;">
                            <h3 style="color: #4caf50; margin: 0 0 0.5rem 0;">Korrekt!</h3>
                            <p style="margin: 0;">${q.explanation}</p>
                        </div>
                    `;
                    
                    setTimeout(() => {
                        currentIndex++;
                        renderQuestion();
                    }, 3000);
                } else {
                    btn.style.background = '#f44336';
                    btn.style.borderColor = '#f44336';
                    
                    // highlight correct one
                    Array.from(optionsGrid.children).forEach(c => {
                        if (c.textContent === q.correct) {
                            c.style.background = '#4caf50';
                            c.style.borderColor = '#4caf50';
                        }
                    });
                    
                    missingWord.textContent = q.correct;
                    missingWord.style.color = '#4caf50';
                    
                    feedbackBox.innerHTML = `
                        <div style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; padding: 1rem; border-radius: 8px;">
                            <h3 style="color: #ffcdd2; margin: 0 0 0.5rem 0;">Desværre forkert</h3>
                            <p style="margin: 0;">Det rigtige svar er <strong>${q.correct}</strong>. ${q.explanation}</p>
                        </div>
                    `;
                    
                    setTimeout(() => {
                        currentIndex++;
                        renderQuestion();
                    }, 4000);
                }
            };
            optionsGrid.appendChild(btn);
        });
        
        exerciseContainer.appendChild(sit);
        exerciseContainer.appendChild(goal);
        exerciseContainer.appendChild(sentenceBox);
        exerciseContainer.appendChild(optionsGrid);
        exerciseContainer.appendChild(feedbackBox);
    }
    
    renderQuestion();

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(exerciseContainer);

    container.appendChild(viewContainer);
}
