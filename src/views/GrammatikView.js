import { navigate } from '../main.js';
import { getTranslation } from '../utils/i18n.js';

export function renderGrammatikView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('traenGrammatik');
    viewContainer.appendChild(title);

    const menuArea = document.createElement('div');
    const gameArea = document.createElement('div');
    gameArea.style.display = 'none';

    // --- Menu Area ---
    const intro = document.createElement('p');
    intro.className = 'subtitle';
    intro.textContent = getTranslation('grammatikIntro');
    menuArea.appendChild(intro);

    const levels = [
        { key: 'let', level: 'A1', icon: '🌱' },
        { key: 'mellemsvaer', level: 'A2', icon: '🌿' },
        { key: 'svaer', level: 'B1', icon: '🌳' },
        { key: 'modultest', level: 'modultest', icon: '🎓' }
    ];

    const grid = document.createElement('div');
    grid.className = 'grid';
    levels.forEach(l => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => startExercise(l.level);

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.textContent = l.icon;

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = getTranslation(l.key);

        card.appendChild(icon);
        card.appendChild(cardTitle);
        grid.appendChild(card);
    });
    menuArea.appendChild(grid);
    viewContainer.appendChild(menuArea);

    // --- Game Area ---
    function startExercise(level) {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';

        const levelTitle = document.createElement('h2');
        levelTitle.textContent = getTranslation(level === 'A1' ? 'let' : level === 'A2' ? 'mellemsvaer' : level === 'B1' ? 'svaer' : 'modultest');
        levelTitle.style.textAlign = 'center';
        gameArea.appendChild(levelTitle);

        const exerciseData = getExercises(level);
        let currentIdx = 0;

        function renderCurrentExercise() {
            gameArea.innerHTML = '';
            gameArea.appendChild(levelTitle);

            const ex = exerciseData[currentIdx];

            // If Modultest, show word list above for reference
            if (level === 'modultest') {
                const wordList = document.createElement('div');
                wordList.className = 'word-list-hint';
                const allWords = ex.blanks.map(b => b.answer);
                // Shuffle for the list too
                const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);
                wordList.textContent = shuffledWords.join(', ');
                gameArea.appendChild(wordList);
            }

            const textContainer = document.createElement('div');
            textContainer.className = 'grammatik-text-container';

            // Split text by [blank_X]
            const parts = ex.text.split(/(\[blank_\d+\])/);
            parts.forEach(part => {
                const match = part.match(/\[blank_(\d+)\]/);
                if (match) {
                    const idx = match[1];
                    const wrapper = document.createElement('span');
                    wrapper.className = 'select-wrapper';

                    const select = document.createElement('select');
                    select.className = 'grammatik-select';
                    select.dataset.idx = idx;

                    const defaultOpt = document.createElement('option');
                    defaultOpt.value = "";
                    defaultOpt.textContent = "...";
                    select.appendChild(defaultOpt);

                    // Always shuffle options for Modultest explicitly, 
                    // and also for others (as they were already shuffled in previous implementation)
                    let opts = [...ex.blanks[idx].options];
                    opts.sort(() => Math.random() - 0.5);

                    opts.forEach(opt => {
                        const o = document.createElement('option');
                        o.value = opt;
                        o.textContent = opt;
                        select.appendChild(o);
                    });

                    wrapper.appendChild(select);
                    textContainer.appendChild(wrapper);
                } else {
                    const span = document.createElement('span');
                    span.textContent = part;
                    textContainer.appendChild(span);
                }
            });

            gameArea.appendChild(textContainer);

            // Global feedback area
            const feedbackArea = document.createElement('div');
            feedbackArea.className = 'exercise-feedback';
            gameArea.appendChild(feedbackArea);

            // Summary area for progress
            const summaryArea = document.createElement('div');
            summaryArea.className = 'grammatik-summary';
            gameArea.appendChild(summaryArea);

            function updateSummary() {
                const selects = textContainer.querySelectorAll('select');
                const filled = Array.from(selects).filter(s => s.value !== "").length;
                const correct = Array.from(selects).filter(s => s.classList.contains('correct')).length;
                const total = selects.length;

                if (filled === 0) {
                    summaryArea.textContent = "";
                } else if (correct === total) {
                    summaryArea.innerHTML = `<span class="success">${getTranslation('allCorrect')}</span>`;
                    checkBtn.style.display = 'none';
                    nextBtn.style.display = 'block';
                    feedbackArea.style.display = 'none';
                } else {
                    summaryArea.textContent = `${filled} / ${total} ${getTranslation('filled') || 'udfyldt'}`;
                }
            }

            // --- Immediate Feedback Logic ---
            textContainer.querySelectorAll('select').forEach(select => {
                select.onchange = () => {
                    const idx = select.dataset.idx;

                    if (select.value === "") {
                        select.classList.remove('correct', 'wrong');
                        feedbackArea.style.display = 'none';
                    } else if (select.value === ex.blanks[idx].answer) {
                        select.classList.add('correct');
                        select.classList.remove('wrong');
                        feedbackArea.style.display = 'none';
                    } else {
                        select.classList.add('wrong');
                        select.classList.remove('correct');

                        const selectedVal = select.value;
                        const hintKey = (ex.blanks[idx].hints && ex.blanks[idx].hints[selectedVal]) || 'hintContext';
                        feedbackArea.textContent = getTranslation(hintKey);
                        feedbackArea.style.display = 'block';
                    }
                    updateSummary();
                };
            });

            const controls = document.createElement('div');
            controls.className = 'game-controls';

            const checkBtn = document.createElement('button');
            checkBtn.className = 'gemini-btn';
            checkBtn.textContent = getTranslation('checkAnswers');
            checkBtn.onclick = () => {
                const selects = textContainer.querySelectorAll('select');
                let allCorrect = true;
                let firstErrorHint = '';

                selects.forEach(s => {
                    const idx = s.dataset.idx;
                    if (s.value === ex.blanks[idx].answer) {
                        s.classList.add('correct');
                        s.classList.remove('wrong');
                    } else {
                        s.classList.add('wrong');
                        s.classList.remove('correct');
                        allCorrect = false;
                        if (!firstErrorHint) {
                            const hintKey = (ex.blanks[idx].hints && ex.blanks[idx].hints[s.value]) || 'hintContext';
                            firstErrorHint = getTranslation(hintKey);
                        }
                    }
                });

                if (!allCorrect && firstErrorHint) {
                    feedbackArea.textContent = firstErrorHint;
                    feedbackArea.style.display = 'block';
                } else if (allCorrect) {
                    feedbackArea.style.display = 'none';
                }
                updateSummary();
            };

            const nextBtn = document.createElement('button');
            nextBtn.className = 'gemini-btn';
            nextBtn.textContent = getTranslation('newExercise');
            nextBtn.style.display = 'none';
            nextBtn.onclick = () => {
                currentIdx = (currentIdx + 1) % exerciseData.length;
                renderCurrentExercise();
            };

            controls.appendChild(checkBtn);
            controls.appendChild(nextBtn);
            gameArea.appendChild(controls);
            updateSummary();
        }

        renderCurrentExercise();
    }

    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
}

function getExercises(level) {
    if (level === 'A1') {
        return [
            {
                text: "Jeg [blank_0] i København. Jeg har en lille [blank_1]. Her bor jeg sammen med min [blank_2]. Vi [blank_3] ofte mad sammen i køkkenet. Min kone er en rigtig god [blank_4]. Om morgenen [blank_5] vi kaffe. Vi [blank_6] også en avis sammen. Det er en [blank_7] dag i dag. Vi er meget [blank_8] for vores liv.",
                blanks: [
                    { answer: "bor", options: ["bor", "spiser", "læser"], hints: { "spiser": "hintAction", "læser": "hintAction" } },
                    { answer: "lejlighed", options: ["lejlighed", "bil", "bord"], hints: { "bil": "hintContext", "bord": "hintPlace" } },
                    { answer: "kone", options: ["kone", "ven", "hund"], hints: { "ven": "hintContext", "hund": "hintContext" } },
                    { answer: "laver", options: ["laver", "drikker", "køber"], hints: { "drikker": "hintAction", "køber": "hintMean" } },
                    { answer: "kok", options: ["kok", "bog", "skole"], hints: { "bog": "hintContext", "skole": "hintPlace" } },
                    { answer: "drikker", options: ["drikker", "spiser", "ser"], hints: { "spiser": "hintMean", "ser": "hintAction" } },
                    { answer: "læser", options: ["læser", "hører", "går"], hints: { "hører": "hintContext", "går": "hintAction" } },
                    { answer: "dejlig", options: ["dejlig", "sur", "kold"], hints: { "sur": "hintMean", "kold": "hintContext" } },
                    { answer: "glade", options: ["glade", "trætte", "sure"], hints: { "trætte": "hintContext", "sure": "hintMean" } }
                ]
            }
        ];
    } else if (level === 'A2') {
        return [
            {
                text: "Det er [blank_0] vejr i dag. Solen skinner [blank_1], og vi [blank_2] en tur i den grønne skov. Vi ser mange [blank_3] træer med friske blade. Vi går [blank_4] for at nyde den smukke natur. Fuglene [blank_5] lystigt i trætoppene. Det [blank_6] som om, at sommeren endelig er på vej. Vi [blank_7] os til at spise frokost i det fri bagefter. Det bliver en [blank_8] oplevelse for os alle.",
                blanks: [
                    { answer: "dejligt", options: ["dejligt", "langsomt", "aldrig"], hints: { "langsomt": "hintAdj", "aldrig": "hintAdverb" } },
                    { answer: "kraftigt", options: ["kraftigt", "smukt", "ofte"], hints: { "smukt": "hintAdj", "ofte": "hintAdverb" } },
                    { answer: "går", options: ["går", "gik", "gået"], hints: { "gik": "hintTense", "gået": "hintTense" } },
                    { answer: "høje", options: ["høje", "høj", "højt"], hints: { "høj": "hintForm", "højt": "hintForm" } },
                    { answer: "langsomt", options: ["langsomt", "langsom", "hurtig"], hints: { "langsom": "hintForm", "hurtig": "hintAdj" } },
                    { answer: "synger", options: ["synger", "sang", "sunget"], hints: { "sang": "hintTense", "sunget": "hintTense" } },
                    { answer: "føles", options: ["føles", "føler", "føltes"], hints: { "føler": "hintForm", "føltes": "hintTense" } },
                    { answer: "glæder", options: ["glæder", "glædede", "glade"], hints: { "glædede": "hintTense", "glade": "hintForm" } },
                    { answer: "fantastisk", options: ["fantastisk", "fantastiske", "fantastisket"], hints: { "fantastiske": "hintForm", "fantastisket": "hintMean" } }
                ]
            }
        ];
    } else if (level === 'B1') {
        return [
            {
                text: "Jeg tager ofte bussen på arbejde, [blank_0] min bil desværre er gået i stykker igen. Selvom det regner [blank_1], foretrækker jeg dog normalt at køre selv. Det er [blank_2] irriterende, da jeg har mange [blank_3] aftaler i løbet af i dag. Jeg [blank_4] dog planlægge min rute [blank_5], så jeg ikke kommer for sent. Heldigvis [blank_6] bussen lige uden for min dør. Hvis jeg [blank_7] mig lidt, kan jeg lige præcis nå den. Det [blank_8] meget tålmodighed at bruge offentlig transport hver eneste dag.",
                blanks: [
                    { answer: "fordi", options: ["fordi", "selvom", "men"], hints: { "selvom": "hintConj", "men": "hintConj" } },
                    { answer: "kraftigt", options: ["kraftigt", "kraftig", "kraftige"], hints: { "kraftig": "hintForm", "kraftige": "hintForm" } },
                    { answer: "temmelig", options: ["temmelig", "temmelige", "temmeligt"], hints: { "temmelige": "hintForm", "temmeligt": "hintForm" } },
                    { answer: "vigtige", options: ["vigtige", "vigtig", "vigtigt"], hints: { "vigtig": "hintForm", "vigtigt": "hintForm" } },
                    { answer: "må", options: ["må", "skal", "kan"], hints: { "skal": "hintContext", "kan": "hintContext" } },
                    { answer: "omhyggeligt", options: ["omhyggeligt", "omhyggelig", "omhyggelige"], hints: { "omhyggelig": "hintForm", "omhyggelige": "hintForm" } },
                    { answer: "holder", options: ["holder", "holdt", "holdt"], hints: { "holdt": "hintTense" } },
                    { answer: "skynder", options: ["skynder", "skyndte", "skyndet"], hints: { "skyndte": "hintTense", "skyndet": "hintTense" } },
                    { answer: "kræver", options: ["kræver", "krævede", "krævet"], hints: { "krævede": "hintTense", "krævet": "hintTense" } }
                ]
            }
        ];
    } else if (level === 'modultest') {
        return [
            {
                text: "Velkommen til den store [blank_0], hvor vi skal teste dit danske sprog. Denne tekst er [blank_1] end de andre, da den fylder ti linjer. Du skal læse hele teksten [blank_2] for at forstå sammenhængen rigtigt. Det er vigtigt at du [blank_3] dig om, før du vælger et ord. Der er mange [blank_4] i listen ovenover, som du kan bruge. Hvis du laver en [blank_5], kan du altid prøve igen her. Vi håber at du får alle svar [blank_6] i første forsøg. Det kræver meget [blank_7] at lære et nyt sprog helt perfekt. Men vi ved at du [blank_8] gøre det, hvis du øver dig meget. Rigtig god [blank_9] med denne svære modultest opgave!",
                blanks: [
                    { answer: "modultest", options: ["modultest", "eksamen", "prøve"] },
                    { answer: "længere", options: ["længere", "kort", "sværere"] },
                    { answer: "grundigt", options: ["grundigt", "hurtigt", "nemt"] },
                    { answer: "umager", options: ["umager", "gør", "passer"] },
                    { answer: "ord", options: ["ord", "tekster", "sætninger"] },
                    { answer: "fejl", options: ["fejl", "kage", "pause"] },
                    { answer: "rigtige", options: ["rigtige", "forkerte", "sjove"] },
                    { answer: "arbejde", options: ["arbejde", "hygge", "mad"] },
                    { answer: "kan", options: ["kan", "skal", "får"] },
                    { answer: "fornøjelse", options: ["fornøjelse", "lykke", "held"] }
                ]
            }
        ];
    }
    return [];
}
