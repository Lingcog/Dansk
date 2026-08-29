import { getTranslation } from '../utils/i18n.js';

export function renderAdjectiveComparisonView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjective-comparison';

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('pronomen');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Title & Intro
    const title = document.createElement('h1');
    title.textContent = "Stor / større / størst? (Adjektiver)";
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('adjComparisonDesc');
    viewContainer.appendChild(subtitle);

    const exerciseArea = document.createElement('div');
    exerciseArea.className = 'exercise-area';
    viewContainer.appendChild(exerciseArea);

    const adjData = [
        { positive: 'højt', comparative: 'højere', superlative: 'højest', example: 'Bjerget er [word].' },
        { positive: 'stort', comparative: 'større', superlative: 'størst', example: 'Huset er [word].' },
        { positive: 'grønt', comparative: 'grønnere', superlative: 'grønnest', example: 'Græsset er [word].' }
    ];

    let currentAdjIndex = 0;
    let selectedGrade = 'positive'; // 'positive', 'comparative', 'superlative'

    function renderTrees() {
        const data = adjData[currentAdjIndex];

        exerciseArea.innerHTML = `
            <div class="adj-tabs">
                ${adjData.map((item, idx) => `
                    <button class="tab-btn ${idx === currentAdjIndex ? 'active' : ''}" data-idx="${idx}">
                        ${item.positive}
                    </button>
                `).join('')}
            </div>

            <div class="tree-comparison-container">
                <div class="tree-stage">
                    <!-- Tree 1: Positive -->
                    <div class="tree-box ${selectedGrade === 'positive' ? 'selected' : ''}" data-grade="positive">
                        <div class="tree-visual" id="tree-1">
                            <svg viewBox="0 0 100 120">
                                <rect x="45" y="80" width="10" height="30" fill="#5D4037" />
                                <circle cx="50" cy="60" r="30" fill="#4CAF50" />
                            </svg>
                        </div>
                        <div class="grade-label">${getTranslation('positiveLabel')}</div>
                        <div class="grade-word">${data.positive}</div>
                    </div>

                    <!-- Tree 2: Comparative -->
                    <div class="tree-box ${selectedGrade === 'comparative' ? 'selected' : ''}" data-grade="comparative">
                        <div class="tree-visual" id="tree-2">
                            <svg viewBox="0 0 100 150">
                                <rect x="42" y="100" width="16" height="40" fill="#5D4037" />
                                <circle cx="50" cy="70" r="45" fill="#388E3C" />
                                <!-- Comparison Line -->
                                ${selectedGrade === 'comparative' || selectedGrade === 'superlative' ?
                '<line x1="100" y1="100" x2="-20" y2="100" stroke="rgba(255,255,255,0.3)" stroke-dasharray="4" />' : ''}
                            </svg>
                        </div>
                        <div class="grade-label">${getTranslation('comparativeLabel')}</div>
                        <div class="grade-word">${data.comparative}</div>
                    </div>

                    <!-- Tree 3: Superlative -->
                    <div class="tree-box ${selectedGrade === 'superlative' ? 'selected' : ''}" data-grade="superlative">
                        <div class="tree-visual" id="tree-3">
                            <svg viewBox="0 0 100 180">
                                <rect x="40" y="120" width="20" height="50" fill="#5D4037" />
                                <circle cx="50" cy="80" r="60" fill="#2E7D32" />
                            </svg>
                        </div>
                        <div class="grade-label">${getTranslation('superlativeLabel')}</div>
                        <div class="grade-word">${data.superlative}</div>
                    </div>
                </div>

                <div class="example-box animate-in">
                    <div class="example-label">${getTranslation('example')}</div>
                    <div class="example-text">
                        ${data.example.replace('[word]', `<span class="highlight highlight-grad">${data[selectedGrade]}</span>`)}
                    </div>
                </div>

                <div class="interactive-comparison" id="comparison-highlight">
                    <!-- Dynamic comparison indicator -->
                </div>
            </div>

            <div class="adj-practice-section" style="margin-top: 4rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem;">
                <h2 style="text-align: center; margin-bottom: 2rem;">${getTranslation('practiceMoreInflections')}</h2>
                
                <div id="adj-exercises-container">
                    <!-- Exercises rendered here -->
                </div>

                <div id="exercise-summary" class="grammatik-summary" style="margin-top: 2rem; text-align: center;"></div>

                <div style="text-align: center; margin-top: 2rem;">
                    <button id="next-set-btn" class="gemini-btn" style="display: none;">${getTranslation('newExercise')}</button>
                </div>
            </div>
        `;

        // Event Listeners for Trees
        exerciseArea.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = () => {
                currentAdjIndex = parseInt(btn.dataset.idx);
                renderTrees();
            };
        });

        exerciseArea.querySelectorAll('.tree-box').forEach(box => {
            box.onclick = () => {
                selectedGrade = box.dataset.grade;
                renderTrees();
            };
        });

        updateComparisonVisuals();
        renderPracticeExercises();
    }

    const practiceSets = [
        [
            { text: "Min hund er [blank_0] end din.", options: ["stor", "større", "størst"], answer: "større", hints: { "stor": "Husk at bruge komparativ (sammenligningsform) når der står 'end'.", "størst": "Vi sammenligner kun to hunde her." }, feedback: "Korrekt! Vi sammenligner to ting her." },
            { text: "Det er et [blank_1] hus.", options: ["stor", "stort", "store"], answer: "stort", hints: { "stor": "Husk at 'et hus' er intetkøn (-t).", "store": "Huset er i ental her." }, feedback: "Korrekt! Intetkøn (et) får ofte -t på adjektivet." },
            { text: "De [blank_2] børn leger i haven.", options: ["lille", "små", "mindre"], answer: "små", hints: { "lille": "Husk at 'børn' er flertal.", "mindre": "Her beskriver vi bare børnene, vi sammenligner ikke." }, feedback: "Korrekt! 'Små' er flertal af 'lille'." },
            { text: "Kaffen er [blank_3] nu end før.", options: ["varm", "varmere", "varmest"], answer: "varmere", hints: { "varm": "Vi sammenligner temperaturen nu med før.", "varmest": "Der er kun tale om to tidspunkter." }, feedback: "Korrekt! Komparativ bruges ved sammenligning." },
            { text: "Det er den [blank_4] blomst i haven.", options: ["smuk", "smukkere", "smukkeste"], answer: "smukkeste", hints: { "smuk": "Vi kigger på alle blomsterne i haven.", "smukkere": "Her er tale om den absolutte vinder (superlativ)." }, feedback: "Korrekt! Superlativ bruges om den højeste grad." }
        ],
        [
            { text: "Bilen er [blank_0] end traktoren.", options: ["hurtig", "hurtigere", "hurtigst"], answer: "hurtigere", hints: { "hurtig": "To ting sammenlignes her.", "hurtigst": "Vi sammenligner kun to køretøjer." }, feedback: "Korrekt! Hurtigere er komparativ." },
            { text: "Jeg har to [blank_1] æbler.", options: ["grøn", "grønt", "grønne"], answer: "grønne", hints: { "grøn": "Der er to æbler (flertal).", "grønt": "Æbler er i flertal her." }, feedback: "Korrekt! Flertal af adjektiver ender på -e." },
            { text: "Det er en [blank_2] cykel.", options: ["dyr", "dyrt", "dyre"], answer: "dyr", hints: { "dyrt": "En cykel er fælleskøn (ingen -t).", "dyre": "Cyklen er i ental." }, feedback: "Korrekt! Fælleskøn (en) har ingen endelse her." },
            { text: "Dette er det [blank_3] jeg ved.", options: ["god", "bedre", "bedste"], answer: "bedste", hints: { "god": "Vi taler om den højeste grad af kvalitet.", "bedre": "Vi sammenligner ikke med noget specifikt andet." }, feedback: "Korrekt! 'Bedste' er den højeste grad af 'god'." },
            { text: "Hendes hår er [blank_4] end mit.", options: ["lang", "længere", "længst"], answer: "længere", hints: { "lang": "To personers hår sammenlignes.", "længst": "Vi sammenligner to ting." }, feedback: "Korrekt! 'Længere' er komparativ af 'lang'." }
        ],
        [
            { text: "Rundetårn er [blank_0] end mit hus.", options: ["høj", "højere", "højest"], answer: "højere", hints: { "høj": "Husk komparativ når der sammenlignes med 'end'.", "højest": "Vi sammenligner to bygninger." }, feedback: "Korrekt! 'Højere' bruges ved sammenligning." },
            { text: "Jeg har købt et [blank_1] fjernsyn.", options: ["ny", "nyt", "nye"], answer: "nyt", hints: { "ny": "'Et fjernsyn' er intetkøn (-t).", "nye": "Der er kun tale om ét fjernsyn." }, feedback: "Korrekt! Intetkøn (et) tager oftest -t." },
            { text: "I dag er den [blank_2] dag på året.", options: ["kold", "koldere", "koldeste"], answer: "koldeste", hints: { "kold": "Vi taler om hele året, så det er den højeste grad.", "koldere": "Vi sammenligner ikke to dage, men udråber en vinder blandt alle." }, feedback: "Korrekt! Superlativ bruges om højeste grad." },
            { text: "De [blank_3] mænd sidder på bænken.", options: ["gammel", "gammelt", "gamle"], answer: "gamle", hints: { "gammel": "Der er tale om flere mænd.", "gammelt": "Intetkøn bruges ikke ved personer i flertal." }, feedback: "Korrekt! Flertal ender oftest på -e." },
            { text: "Min bror er [blank_4] end min søster.", options: ["sjov", "sjovere", "sjovest"], answer: "sjovere", hints: { "sjov": "To personer sammenlignes.", "sjovest": "Vi sammenligner kun to personer." }, feedback: "Korrekt! 'End' udløser komparativ." }
        ],
        [
            { text: "Dette er det [blank_0] stykke kage.", options: ["lille", "mindre", "mindste"], answer: "mindste", hints: { "lille": "Vi snakker om kagen i forhold til alle andre stykker.", "mindre": "Vi sammenligner den med mere end én anden ting." }, feedback: "Korrekt! 'Mindste' er superlativ." },
            { text: "Vandet i søen er meget [blank_1] i dag.", options: ["varm", "varmt", "varme"], answer: "varmt", hints: { "varm": "Vand er intetkøn (et vand/vandet).", "varme": "Det er ental (vandet)." }, feedback: "Korrekt! Intetkøn får -t." },
            { text: "Dage er [blank_2] om sommeren end om vinteren.", options: ["lys", "lysere", "lysest"], answer: "lysere", hints: { "lys": "Vi sammenligner sommer og vinter.", "lysest": "Vi sammenligner to perioder." }, feedback: "Korrekt! Komparativ bruges ved sammenligning med 'end'." },
            { text: "Hun har den [blank_3] kjole på til festen.", options: ["flot", "flottere", "flotteste"], answer: "flotteste", hints: { "flot": "Hun overgår alle de andre kjoler.", "flottere": "Der er mere end to kjoler at sammenligne med." }, feedback: "Korrekt! Bestemt form af superlativ ender på -e." },
            { text: "Bogen er [blank_4] end hæftet.", options: ["tung", "tungere", "tungest"], answer: "tungere", hints: { "tung": "Vi sammenligner to ting.", "tungest": "Vi sammenligner kun bog og hæfte." }, feedback: "Korrekt! 'Tungere' er komparativ." }
        ]
    ];

    let currentSetIndex = 0;

    function renderPracticeExercises() {
        const container = viewContainer.querySelector('#adj-exercises-container');
        const set = practiceSets[currentSetIndex];

        container.innerHTML = set.map((ex, i) => `
            <div class="practice-row" style="margin-bottom: 2rem; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 15px;">
                <div class="question-text" style="font-size: 1.3rem; margin-bottom: 1rem;">
                    ${ex.text.replace(/\[blank_\d+\]/, `
                        <select class="grammatik-select adj-practice-select" data-idx="${i}">
                            <option value="">...</option>
                            ${ex.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>
                    `)}
                </div>
                <div class="row-feedback" id="feedback-${i}" style="display: none; font-style: italic; color: #4CAF50; padding: 0.5rem; border-left: 3px solid #4CAF50; background: rgba(76, 175, 80, 0.1); border-radius: 4px;"></div>
            </div>
        `).join('');

        const selects = container.querySelectorAll('.adj-practice-select');
        const nextSetBtn = viewContainer.querySelector('#next-set-btn');

        selects.forEach(select => {
            select.onchange = () => {
                const idx = select.dataset.idx;
                const ex = set[idx];
                const feedbackEl = viewContainer.querySelector(`#feedback-${idx}`);

                const absoluteIdx = (currentSetIndex * 5) + parseInt(idx);

                if (select.value === ex.answer) {
                    select.classList.add('correct');
                    select.classList.remove('wrong');

                    const feedbackText = getTranslation(`adj_${absoluteIdx}_feedback`) || ex.feedback;
                    feedbackEl.textContent = "✓ " + feedbackText;

                    feedbackEl.style.color = '#4CAF50';
                    feedbackEl.style.borderLeftColor = '#4CAF50';
                    feedbackEl.style.background = 'rgba(76, 175, 80, 0.1)';
                    feedbackEl.style.display = 'block';
                } else if (select.value === "") {
                    select.classList.remove('correct', 'wrong');
                    feedbackEl.style.display = 'none';
                } else {
                    select.classList.add('wrong');
                    select.classList.remove('correct');

                    const safeOpt = select.value.replace(/[^a-zA-ZæøåÆØÅ]/g, '');
                    const hintText = getTranslation(`adj_${absoluteIdx}_hint_${safeOpt}`) || ex.hints[select.value] || "Prøv igen. Tænk på om det er ental/flertal eller sammenligning.";
                    feedbackEl.textContent = "⚠ " + hintText;

                    feedbackEl.style.color = '#e74c3c';
                    feedbackEl.style.borderLeftColor = '#e74c3c';
                    feedbackEl.style.background = 'rgba(231, 76, 60, 0.1)';
                    feedbackEl.style.display = 'block';
                }

                updateSummary(selects);
            };
        });

        if (nextSetBtn) {
            nextSetBtn.onclick = () => {
                currentSetIndex = (currentSetIndex + 1) % practiceSets.length;
                renderTrees(); // Re-render everything to reset
            };
        }
    }

    function updateSummary(selects) {
        const summaryArea = viewContainer.querySelector('#exercise-summary');
        const nextSetBtn = viewContainer.querySelector('#next-set-btn');

        const filled = Array.from(selects).filter(s => s.value !== "").length;
        const correct = Array.from(selects).filter(s => s.classList.contains('correct')).length;
        const total = selects.length;

        if (filled === 0) {
            summaryArea.textContent = "";
        } else if (correct === total) {
            summaryArea.innerHTML = `<span class="success">${getTranslation('allCorrect')}</span>`;
            if (nextSetBtn) nextSetBtn.style.display = 'inline-block';
        } else {
            summaryArea.textContent = `${filled} / ${total} ${getTranslation('filled') || 'udfyldt'}`;
        }
    }

    function updateComparisonVisuals() {
        const highlight = exerciseArea.querySelector('#comparison-highlight');
        if (selectedGrade === 'comparative') {
            highlight.innerHTML = `
                <div class="comparison-bubble">
                    ${getTranslation('comparisonBubbleComp')}
                </div>
            `;
        } else if (selectedGrade === 'superlative') {
            highlight.innerHTML = `
                <div class="comparison-bubble">
                    ${getTranslation('comparisonBubbleSuper')}
                </div>
            `;
        } else {
            highlight.innerHTML = '';
        }
    }

    renderTrees();
    container.appendChild(viewContainer);

    // Styles
    if (!document.getElementById('adj-comp-styles')) {
        const style = document.createElement('style');
        style.id = 'adj-comp-styles';
        style.textContent = `
            .adjective-comparison .adj-tabs {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            @media (max-width: 600px) {
                .adjective-comparison .adj-tabs { gap: 0.3rem; margin-bottom: 1.5rem; }
            }
            .tree-stage {
                display: flex;
                align-items: flex-end;
                justify-content: center;
                gap: 1.5rem;
                margin-bottom: 2.5rem;
                min-height: 220px;
            }
            @media (max-width: 600px) {
                .tree-stage { gap: 0.8rem; min-height: 180px; margin-bottom: 1.5rem; }
            }
            .tree-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                opacity: 0.7;
                flex: 1;
                max-width: 120px;
            }
            .tree-box:hover {
                transform: translateY(-10px);
                opacity: 1;
            }
            .tree-box.selected {
                opacity: 1;
                transform: scale(1.05);
            }
            .tree-visual {
                width: 100%;
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }
            #tree-1 svg { height: 100px; }
            #tree-2 svg { height: 130px; }
            #tree-3 svg { height: 160px; }

            @media (max-width: 600px) {
                #tree-1 svg { height: 70px; }
                #tree-2 svg { height: 95px; }
                #tree-3 svg { height: 120px; }
            }
            
            .grade-label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.6;
                margin-top: 0.8rem;
                text-align: center;
            }
            .grade-word {
                font-size: 1.2rem;
                font-weight: 800;
                color: #4CAF50;
                text-align: center;
                word-break: break-all;
            }
            @media (max-width: 600px) {
                .grade-label { font-size: 0.65rem; margin-top: 0.5rem; }
                .grade-word { font-size: 1rem; }
            }
            .tree-box.selected .grade-word {
                color: #ffeb3b;
                text-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
            }
            
            .example-box {
                background: rgba(255, 255, 255, 0.05);
                padding: 1.5rem;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.1);
                max-width: 500px;
                margin: 0 auto;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            @media (max-width: 600px) {
                .example-box { padding: 1rem; border-radius: 16px; }
            }
            .example-label {
                font-size: 0.85rem;
                opacity: 0.5;
                margin-bottom: 0.4rem;
            }
            .example-text {
                font-size: 1.6rem;
                font-weight: 600;
                line-height: 1.3;
            }
            @media (max-width: 600px) {
                .example-text { font-size: 1.2rem; }
            }
            .highlight-grad {
                color: #ffeb3b;
                border-bottom: 2px dashed #ffeb3b;
            }
            
            .comparison-bubble {
                background: #4CAF50;
                color: white;
                padding: 0.8rem 1.5rem;
                border-radius: 20px;
                margin-top: 1.5rem;
                text-align: center;
                max-width: 280px;
                margin-left: auto;
                margin-right: auto;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                font-size: 1rem;
            }
            @media (max-width: 600px) {
                .comparison-bubble { font-size: 0.9rem; padding: 0.6rem 1.2rem; margin-top: 1rem; }
            }
            
            .adj-practice-section {
                margin-top: 3rem !important;
                padding-top: 2rem !important;
            }
            .practice-row {
                margin-bottom: 1.5rem !important;
                padding: 1.2rem !important;
            }
            @media (max-width: 600px) {
                .practice-row { padding: 1rem !important; margin-bottom: 1rem !important; }
                .question-text { font-size: 1.1rem !important; line-height: 1.6 !important; }
                .row-feedback { font-size: 0.9rem !important; }
            }
            
            @keyframes popIn {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}
