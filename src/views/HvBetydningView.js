import { getTranslation } from '../utils/i18n.js';

export function renderHvBetydningView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + (getTranslation('back') || 'Tilbage');
    backBtn.onclick = () => navigateFn('traen_sporgsmal_menu');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('hv_view_title') || 'Træn betydning af Hv-ord';
    title.style.textAlign = 'center';

    const exerciseContainer = document.createElement('div');
    exerciseContainer.className = 'exercise-container';
    exerciseContainer.style.marginTop = '2rem';
    
    // Quiz data based on Anna situations
    const questions = [
        {
            situationKey: 'hv_sit_1',
            goalKey: 'hv_goal_1',
            sentenceParts: ['[ ? ]', ' køber Anna?'],
            options: ['Hvem', 'Hvad', 'Hvornår', 'Hvor'],
            correct: 'Hvad',
            explanationKey: 'hv_exp_1'
        },
        {
            situationKey: 'hv_sit_2',
            goalKey: 'hv_goal_2',
            sentenceParts: ['[ ? ]', ' betaler Anna?'],
            options: ['Hvor', 'Hvordan', 'Hvor meget', 'Hvad'],
            correct: 'Hvor meget',
            explanationKey: 'hv_exp_2'
        },
        {
            situationKey: 'hv_sit_3',
            goalKey: 'hv_goal_3',
            sentenceParts: ['[ ? ]', ' køber Anna ind?'],
            options: ['Hvornår', 'Hvor', 'Hvem', 'Hvorhen'],
            correct: 'Hvor',
            explanationKey: 'hv_exp_3'
        },
        {
            situationKey: 'hv_sit_4',
            goalKey: 'hv_goal_4',
            sentenceParts: ['[ ? ]', ' køber Anna ind?'],
            options: ['Hvordan', 'Hvad tid', 'Hvornår', 'Hvilken'],
            correct: 'Hvornår',
            explanationKey: 'hv_exp_4'
        },
        {
            situationKey: 'hv_sit_5',
            goalKey: 'hv_goal_5',
            sentenceParts: ['[ ? ]', ' betaler Anna?'],
            options: ['Hvad', 'Hvorfor', 'Hvem', 'Hvordan'],
            correct: 'Hvordan',
            explanationKey: 'hv_exp_5'
        },
        {
            situationKey: 'hv_sit_6',
            goalKey: 'hv_goal_6',
            sentenceParts: ['[ ? ]', ' kommer Anna til Netto?'],
            options: ['Hvor', 'Hvordan', 'Hvornår', 'Hvad'],
            correct: 'Hvordan',
            explanationKey: 'hv_exp_6'
        },
        {
            situationKey: 'hv_sit_7',
            goalKey: 'hv_goal_7',
            sentenceParts: ['[ ? ]', ' køber Anna ind sammen med?'],
            options: ['Hvem', 'Hvilken', 'Hvad', 'Hvordan'],
            correct: 'Hvem',
            explanationKey: 'hv_exp_7'
        }
    ];

    let currentIndex = 0;
    
    function renderQuestion() {
        exerciseContainer.innerHTML = '';
        
        if (currentIndex >= questions.length) {
            // Done
            const doneMsg = document.createElement('h2');
            doneMsg.textContent = getTranslation('hv_done_title') || '🏆 Fantastisk! Du har nu trænet betydningen af Hv-ord!';
            doneMsg.style.textAlign = 'center';
            doneMsg.style.marginTop = '2rem';
            
            const againBtn = document.createElement('button');
            againBtn.className = 'primary-btn';
            againBtn.textContent = getTranslation('hv_try_again') || 'Prøv igen';
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
        sit.innerHTML = `📍 <em>${getTranslation(q.situationKey)}</em>`;
        sit.style.fontSize = '1.1rem';
        sit.style.color = '#fff';
        sit.style.opacity = '0.9';
        
        const goal = document.createElement('p');
        goal.innerHTML = `🎯 ${getTranslation(q.goalKey)}`;
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
                Array.from(optionsGrid.children).forEach(c => c.style.pointerEvents = 'none');
                
                if (opt === q.correct) {
                    btn.style.background = '#4caf50';
                    btn.style.borderColor = '#4caf50';
                    missingWord.textContent = opt;
                    missingWord.style.color = '#4caf50';
                    
                    feedbackBox.innerHTML = `
                        <div style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4caf50; padding: 1rem; border-radius: 8px;">
                            <h3 style="color: #4caf50; margin: 0 0 0.5rem 0;">${getTranslation('hv_correct') || 'Korrekt!'}</h3>
                            <p style="margin: 0;">${getTranslation(q.explanationKey)}</p>
                        </div>
                    `;
                    
                    setTimeout(() => {
                        currentIndex++;
                        renderQuestion();
                    }, 3000);
                } else {
                    btn.style.background = '#f44336';
                    btn.style.borderColor = '#f44336';
                    
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
                            <h3 style="color: #ffcdd2; margin: 0 0 0.5rem 0;">${getTranslation('hv_wrong') || 'Desværre forkert'}</h3>
                            <p style="margin: 0;">${getTranslation('hv_correct_answer_is') || 'Det rigtige svar er'} <strong>${q.correct}</strong>. ${getTranslation(q.explanationKey)}</p>
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
