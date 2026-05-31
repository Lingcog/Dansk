import { navigate } from '../main.js';
import { baseUrl } from '../utils/config.js';
import { getTranslation } from '../utils/i18n.js';

export function renderGrammatikView(container, navigateFn, extraData = {}) {
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
    levels.forEach(l => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => navigateFn('traen_grammatik', { subPath: l.key });

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

    function createSupportLinks() {
        const supportArea = document.createElement('div');
        supportArea.className = 'support-links';
        supportArea.style.display = 'flex';
        supportArea.style.justifyContent = 'center';
        supportArea.style.flexWrap = 'wrap';
        supportArea.style.gap = '1rem';
        supportArea.style.marginTop = '3rem';
        supportArea.style.paddingBottom = '2rem';

        const kofiLink = document.createElement('a');
        kofiLink.href = 'https://ko-fi.com/dansktraening';
        kofiLink.target = '_blank';
        kofiLink.className = 'gemini-btn';
        kofiLink.style.textDecoration = 'none';
        kofiLink.style.backgroundColor = '#ff5e5b';
        kofiLink.textContent = '☕ Buy me a coffee';

        const mpLink = document.createElement('a');
        mpLink.href = 'https://qr.mobilepay.dk/box/0cfe35a7-fccc-4cb9-85e7-b246d3bfa48a/pay-in';
        mpLink.target = '_blank';
        mpLink.className = 'gemini-btn';
        mpLink.style.textDecoration = 'none';
        mpLink.style.backgroundColor = '#5a78ff';
        mpLink.textContent = '📱 Støt med MobilePay';

        supportArea.appendChild(kofiLink);
        supportArea.appendChild(mpLink);
        return supportArea;
    }

    menuArea.appendChild(createSupportLinks());
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

            // --- Word Table (Skema) ---
            const wordTable = renderWordTable(ex.blanks);
            gameArea.appendChild(wordTable);

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
                    nextBtn.style.display = 'block';
                    feedbackArea.style.display = 'none';
                } else {
                    summaryArea.textContent = getTranslation('filledProgress', { n: filled, total: total });
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

            const nextBtn = document.createElement('button');
            nextBtn.className = 'gemini-btn';
            nextBtn.textContent = getTranslation('newExercise');
            nextBtn.style.display = 'none';
            nextBtn.onclick = () => {
                currentIdx = (currentIdx + 1) % exerciseData.length;
                renderCurrentExercise();
            };

            const controls = document.createElement('div');
            controls.className = 'game-controls';
            controls.style.marginTop = '2rem';
            controls.style.display = 'flex';
            controls.style.justifyContent = 'center';

            controls.appendChild(nextBtn);
            gameArea.appendChild(controls);

            // Append support links inside the game area so they're visible when playing
            gameArea.appendChild(createSupportLinks());

            updateSummary();
        }

        renderCurrentExercise();
    }

    function renderWordTable(blanks) {
        const tableContainer = document.createElement('div');
        tableContainer.className = 'grammar-table-container';

        const categories = {};
        blanks.forEach(b => {
            const cat = b.category || 'catSubstantiv';
            if (!categories[cat]) categories[cat] = [];
            if (!categories[cat].includes(b.answer)) {
                categories[cat].push(b.answer);
            }
        });

        // Filter and sort categories to show common ones first
        const catOrder = ['catSubstantiv', 'catVerbum', 'catModalverbum', 'catAdjektiv', 'catAdverbium', 'catKonjunktion'];
        const activeCats = catOrder.filter(c => categories[c]);

        const table = document.createElement('div');
        table.className = 'grammar-skema';

        activeCats.forEach(cat => {
            const column = document.createElement('div');
            column.className = 'skema-column';
            const header = document.createElement('div');
            header.className = 'skema-header';
            header.textContent = getTranslation(cat);
            column.appendChild(header);

            const list = document.createElement('div');
            list.className = 'skema-list';
            categories[cat].sort().forEach(word => {
                const item = document.createElement('div');
                item.className = 'skema-item';
                item.textContent = word;
                list.appendChild(item);
            });
            column.appendChild(list);
            table.appendChild(column);
        });

        tableContainer.appendChild(table);
        return tableContainer;
    }

    // --- Initial Routing ---
    const subPath = extraData.subPath;
    if (subPath) {
        const levelMap = {
            'let': 'A1',
            'mellemsvaer': 'A2',
            'svaer': 'B1',
            'modultest': 'modultest'
        };
        if (levelMap[subPath]) {
            startExercise(levelMap[subPath]);
        }
    }

    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
    if (!document.getElementById('grammatik-skema-styles')) {
        const style = document.createElement('style');
        style.id = 'grammatik-skema-styles';
        style.textContent = `
            .grammar-table-container {
                margin: 1.5rem 0;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .grammar-skema {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                justify-content: center;
            }
            .skema-column {
                flex: 1;
                min-width: 120px;
                max-width: 200px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .skema-header {
                background: rgba(255, 255, 255, 0.1);
                padding: 0.6rem;
                font-weight: 700;
                font-size: 0.85rem;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--accent-light, #ffeb3b);
            }
            .skema-list {
                padding: 0.8rem;
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
            }
            .skema-item {
                font-size: 1rem;
                opacity: 0.9;
                text-align: center;
            }
            @media (max-width: 600px) {
                .skema-column { min-width: 45%; }
            }
        `;
        document.head.appendChild(style);
    }
}

function getExercises(level) {
    if (level === 'A1') {
        return [
            {
                text: "Jeg [blank_0] foråret i København. Jeg har en lille [blank_1]. Her er jeg ofte sammen med min [blank_2]. Vi [blank_3] blomster ude i jorden. Min familie er en rigtig stor [blank_4]. Om morgenen [blank_5] vi på naturen. Vi [blank_6] også til fuglene sammen. Det er en [blank_7] dag i dag. Vi er meget [blank_8] på sommeren.",
                blanks: [
                    { answer: "nyder", options: ["nyder", "spiser", "læser"], category: "catVerbum", hints: { "spiser": "hintAction", "læser": "hintAction" } },
                    { answer: "have", options: ["have", "bil", "bord"], category: "catSubstantiv", hints: { "bil": "hintContext", "bord": "hintPlace" } },
                    { answer: "familie", options: ["familie", "ven", "hund"], category: "catSubstantiv", hints: { "ven": "hintContext", "hund": "hintContext" } },
                    { answer: "planter", options: ["planter", "drikker", "køber"], category: "catVerbum", hints: { "drikker": "hintAction", "køber": "hintMean" } },
                    { answer: "hjælp", options: ["hjælp", "bog", "skole"], category: "catSubstantiv", hints: { "bog": "hintContext", "skole": "hintMean" } },
                    { answer: "kigger", options: ["kigger", "spiser", "ser"], category: "catVerbum", hints: { "spiser": "hintMean", "ser": "hintAction" } },
                    { answer: "lytter", options: ["lytter", "hører", "går"], category: "catVerbum", hints: { "hører": "hintContext", "går": "hintAction" } },
                    { answer: "varm", options: ["varm", "sur", "kold"], category: "catAdjektiv", hints: { "sur": "hintMean", "kold": "hintContext" } },
                    { answer: "spændte", options: ["spændte", "trætte", "sure"], category: "catAdjektiv", hints: { "trætte": "hintContext", "sure": "hintMean" } }
                ]
            }
        ];
    } else if (level === 'A2') {
        return [
            {
                text: "Det er [blank_0] vejr udenfor i dag. Solen skinner [blank_1], og vi [blank_2] en tur i den lyse skov. Vi ser mange [blank_3] træer med friske grønne blade. Vi trækker vejret [blank_4] for at nyde luften. Fuglene [blank_5] smukt oppe i trætoppene. Det [blank_6] som om, at foråret endelig er her. Vi [blank_7] os til at drikke kaffe på terrassen. Det bliver en [blank_8] sæson for os alle.",
                blanks: [
                    { answer: "lyst", options: ["lyst", "langsomt", "aldrig"], category: "catAdjektiv", hints: { "langsomt": "hintAdj", "aldrig": "hintAdverb" } },
                    { answer: "varmt", options: ["varmt", "smukt", "ofte"], category: "catAdjektiv", hints: { "smukt": "hintAdj", "ofte": "hintAdverb" } },
                    { answer: "går", options: ["går", "gik", "gået"], category: "catVerbum", hints: { "gik": "hintTense", "gået": "hintTense" } },
                    { answer: "høje", options: ["høje", "høj", "højt"], category: "catAdjektiv", hints: { "høj": "hintForm", "højt": "hintForm" } },
                    { answer: "langsomt", options: ["langsomt", "langsom", "hurtig"], category: "catAdverbium", hints: { "langsom": "hintForm", "hurtig": "hintAdj" } },
                    { answer: "synger", options: ["synger", "sang", "sunget"], category: "catVerbum", hints: { "sang": "hintTense", "sunget": "hintTense" } },
                    { answer: "føles", options: ["føles", "føler", "føltes"], category: "catVerbum", hints: { "føler": "hintForm", "føltes": "hintTense" } },
                    { answer: "glæder", options: ["glæder", "glædede", "glade"], category: "catVerbum", hints: { "glædede": "hintTense", "glade": "hintForm" } },
                    { answer: "fantastisk", options: ["fantastisk", "fantastiske", "fantastisket"], category: "catAdjektiv", hints: { "fantastiske": "hintForm", "fantastisket": "hintMean" } }
                ]
            }
        ];
    } else if (level === 'B1') {
        return [
            {
                text: "Jeg tager ofte cyklen på arbejde nu, [blank_0] vejret endelig er blevet bedre. Selvom det blæser [blank_1], foretrækker jeg dog at cykle om foråret. Det er [blank_2] forfriskende, især når jeg har mange [blank_3] opgaver at løse i dag. Jeg [blank_4] dog planlægge min rute [blank_5], så jeg ikke møder for mange bakker. Heldigvis [blank_6] regnen som regel en pause. Hvis jeg [blank_7] mig lidt, kan jeg nyde morgensolen. Det [blank_8] lidt ekstra energi at cykle, men det er det hele værd.",
                blanks: [
                    { answer: "fordi", options: ["fordi", "selvom", "men"], category: "catKonjunktion", hints: { "selvom": "hintConj", "men": "hintConj" } },
                    { answer: "kraftigt", options: ["kraftigt", "kraftig", "kraftige"], category: "catAdverbium", hints: { "kraftig": "hintForm", "kraftige": "hintForm" } },
                    { answer: "temmelig", options: ["temmelig", "temmelige", "temmeligt"], category: "catAdverbium", hints: { "temmelige": "hintForm", "temmeligt": "hintForm" } },
                    { answer: "vigtige", options: ["vigtige", "vigtig", "vigtigt"], category: "catAdjektiv", hints: { "vigtig": "hintForm", "vigtigt": "hintForm" } },
                    { answer: "må", options: ["må", "skal", "kan"], category: "catModalverbum", hints: { "skal": "hintContext", "kan": "hintContext" } },
                    { answer: "omhyggeligt", options: ["omhyggeligt", "omhyggelig", "omhyggelige"], category: "catAdverbium", hints: { "omhyggelig": "hintForm", "omhyggelige": "hintForm" } },
                    { answer: "holder", options: ["holder", "holdt", "holdt"], category: "catVerbum", hints: { "holdt": "hintTense" } },
                    { answer: "skynder", options: ["skynder", "skyndte", "skyndet"], category: "catVerbum", hints: { "skyndte": "hintTense", "skyndet": "hintTense" } },
                    { answer: "kræver", options: ["kræver", "krævede", "krævet"], category: "catVerbum", hints: { "krævede": "hintTense", "krævet": "hintTense" } }
                ]
            }
        ];
    } else if (level === 'modultest') {
        return [
            {
                text: "Velkommen til den store [blank_0] om foråret, hvor vi skal øve dit danske sprog. Denne tekst er [blank_1] end de andre, da den fylder flere linjer. Du skal læse hele teksten [blank_2] for at mærke forårsstemningen. Det er vigtigt at du [blank_3] dig om fuglene, før du vælger et ord. Der er mange [blank_4] i listen ovenover om lyse nætter, som du kan bruge. Hvis du laver en [blank_5], kan du prøve igen og nyde haven lidt mere. Vi håber at du får alle svar [blank_6] i første forsøg, mens blomsterne springer ud. Det kræver meget [blank_7] at lære alting perfekt. Men vi ved at du [blank_8] gøre det. Rigtig god [blank_9] med foråret!",
                blanks: [
                    { answer: "modultest", options: ["modultest", "eksamen", "prøve"], category: "catSubstantiv" },
                    { answer: "længere", options: ["længere", "kort", "sværere"], category: "catAdjektiv" },
                    { answer: "grundigt", options: ["grundigt", "hurtigt", "nemt"], category: "catAdverbium" },
                    { answer: "umager", options: ["umager", "gør", "passer"], category: "catVerbum" },
                    { answer: "ord", options: ["ord", "tekster", "sætninger"], category: "catSubstantiv" },
                    { answer: "fejl", options: ["fejl", "kage", "pause"], category: "catSubstantiv" },
                    { answer: "rigtige", options: ["rigtige", "forkerte", "sjove"], category: "catAdjektiv" },
                    { answer: "arbejde", options: ["arbejde", "hygge", "mad"], category: "catSubstantiv" },
                    { answer: "kan", options: ["kan", "skal", "får"], category: "catModalverbum" },
                    { answer: "fornøjelse", options: ["fornøjelse", "lykke", "held"], category: "catSubstantiv" }
                ]
            }
        ];
    }
    return [];
}
