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
                text: "Det er [blank_0] i København. Solen [blank_1] stadig over byen. Jeg [blank_2] en tur rundt om [blank_3]. Træerne har grønne [blank_4]. Men snart [blank_5] det koldere. Jeg [blank_6] på svanerne. Det er en [blank_7] by. Vi [blank_8] den sidste varme.",
                blanks: [
                    { answer: "sommer", options: ["sommer", "vinter", "nat"], category: "catSubstantiv", hints: { "vinter": "hintMean", "nat": "hintMean" } },
                    { answer: "skinner", options: ["skinner", "regner", "blæser"], category: "catVerbum", hints: { "regner": "hintMean", "blæser": "hintMean" } },
                    { answer: "cykler", options: ["cykler", "spiser", "læser"], category: "catVerbum", hints: { "spiser": "hintAction", "læser": "hintAction" } },
                    { answer: "Søerne", options: ["Søerne", "bilerne", "husene"], category: "catSubstantiv", hints: { "bilerne": "hintContext", "husene": "hintPlace" } },
                    { answer: "blade", options: ["blade", "sten", "døre"], category: "catSubstantiv", hints: { "sten": "hintContext", "døre": "hintContext" } },
                    { answer: "bliver", options: ["bliver", "ser", "hører"], category: "catVerbum", hints: { "ser": "hintAction", "hører": "hintAction" } },
                    { answer: "kigger", options: ["kigger", "smager", "synger"], category: "catVerbum", hints: { "smager": "hintAction", "synger": "hintAction" } },
                    { answer: "smuk", options: ["smuk", "sur", "kold"], category: "catAdjektiv", hints: { "sur": "hintMean", "kold": "hintContext" } },
                    { answer: "nyder", options: ["nyder", "køber", "græder"], category: "catVerbum", hints: { "køber": "hintAction", "græder": "hintMean" } }
                ]
            }
        ];
    } else if (level === 'A2') {
        return [
            {
                text: "Det er [blank_0] august, og aftenerne over Nørrebro er begyndt at blive [blank_1]. Vi [blank_2] ofte en tur i Kongens Have. Man kan mærke, at efteråret langsomt [blank_3] nærmere. Cyklisterne [blank_4] ikke lige så hurtigt mere. Det [blank_5] rart med lidt frisk luft ved vandet. Vi [blank_6] os til at drikke kaffe på en café. Det bliver en [blank_7] overgang fra sommer til efterår i byen.",
                blanks: [
                    { answer: "allerede", options: ["allerede", "næsten", "aldrig"], category: "catAdverbium", hints: { "næsten": "hintMean", "aldrig": "hintMean" } },
                    { answer: "mørkere", options: ["mørkere", "lysere", "varmere"], category: "catAdjektiv", hints: { "lysere": "hintMean", "varmere": "hintMean" } },
                    { answer: "går", options: ["går", "gik", "gået"], category: "catVerbum", hints: { "gik": "hintTense", "gået": "hintTense" } },
                    { answer: "kommer", options: ["kommer", "kom", "kommet"], category: "catVerbum", hints: { "kom": "hintTense", "kommet": "hintTense" } },
                    { answer: "kører", options: ["kører", "kørte", "kørt"], category: "catVerbum", hints: { "kørte": "hintTense", "kørt": "hintTense" } },
                    { answer: "føles", options: ["føles", "føler", "føltes"], category: "catVerbum", hints: { "føler": "hintForm", "føltes": "hintTense" } },
                    { answer: "glæder", options: ["glæder", "glædede", "glade"], category: "catVerbum", hints: { "glædede": "hintTense", "glade": "hintForm" } },
                    { answer: "hyggelig", options: ["hyggelig", "hyggelige", "hyggeligt"], category: "catAdjektiv", hints: { "hyggelige": "hintForm", "hyggeligt": "hintForm" } }
                ]
            }
        ];
    } else if (level === 'B1') {
        return [
            {
                text: "Jeg nyder sensommeren utrolig meget, [blank_0] vejret ofte er mildt nede ved kanalerne. Selvom det blæser [blank_1] på cykelstien, er luften [blank_2] frisk. Bådene har [blank_3] sejlet deres sidste tur i havnen. Man [blank_4] dog huske at tage en trøje med, [blank_5] det bliver koldt om aftenen på Dronning Louises Bro. Byens farver [blank_6] langsomt til gyldne nuancer. Hvis man [blank_7] sig godt for, kan man finde kastanjer i Frederiksberg Have. Det [blank_8] tålmodighed at cykle i modvind, men det er det hele værd.",
                blanks: [
                    { answer: "fordi", options: ["fordi", "selvom", "men"], category: "catKonjunktion", hints: { "selvom": "hintConj", "men": "hintConj" } },
                    { answer: "kraftigt", options: ["kraftigt", "kraftig", "kraftige"], category: "catAdverbium", hints: { "kraftig": "hintForm", "kraftige": "hintForm" } },
                    { answer: "stadig", options: ["stadig", "desværre", "næppe"], category: "catAdverbium", hints: { "desværre": "hintMean", "næppe": "hintMean" } },
                    { answer: "næsten", options: ["næsten", "aldeles", "fuldstændig"], category: "catAdverbium", hints: { "aldeles": "hintMean", "fuldstændig": "hintMean" } },
                    { answer: "skal", options: ["skal", "vil", "kan"], category: "catModalverbum", hints: { "vil": "hintContext", "kan": "hintContext" } },
                    { answer: "når", options: ["når", "da", "som"], category: "catKonjunktion", hints: { "da": "hintConj", "som": "hintConj" } },
                    { answer: "skifter", options: ["skifter", "skiftede", "skiftet"], category: "catVerbum", hints: { "skiftede": "hintTense", "skiftet": "hintTense" } },
                    { answer: "kigger", options: ["kigger", "kiggede", "kigget"], category: "catVerbum", hints: { "kiggede": "hintTense", "kigget": "hintTense" } },
                    { answer: "kræver", options: ["kræver", "krævede", "krævet"], category: "catVerbum", hints: { "krævede": "hintTense", "krævet": "hintTense" } }
                ]
            }
        ];
    } else if (level === 'modultest') {
        return [
            {
                text: "Overgangen fra sommer til begyndende efterår er en af årets smukkeste perioder i København, [blank_0] byen skifter karakter. De lyse nætter bliver [blank_1] kortere, og luften over havnen føles lidt [blank_2] om morgenen. Bladene i Fælledparken falder ned, [blank_3] vinden blæser køligt gennem gaderne. Man kan [blank_4] dufte asfalten, [blank_5] der har været en regnbyge. Mange cyklister [blank_6] travlt med at finde varme handsker frem, [blank_7] de ikke fryser. Man kan være [blank_8] at få bord på en lun café, [blank_9] der ofte er mange mennesker. Nogle bliver lidt [blank_10], når sommeren slutter. Men efteråret [blank_11] heldigvis også på masser af hygge. Det gælder bare om at nyde hver eneste [blank_12] i hovedstaden.",
                blanks: [
                    { answer: "fordi", options: ["fordi", "selvom", "men"], category: "catKonjunktion", hints: { "selvom": "hintConj", "men": "hintConj" } },
                    { answer: "langsomt", options: ["langsomt", "hurtigt", "aldrig"], category: "catAdverbium", hints: { "hurtigt": "hintMean", "aldrig": "hintMean" } },
                    { answer: "koldere", options: ["koldere", "varmere", "lysere"], category: "catAdjektiv", hints: { "varmere": "hintMean", "lysere": "hintMean" } },
                    { answer: "mens", options: ["mens", "fordi", "at"], category: "catKonjunktion", hints: { "fordi": "hintConj", "at": "hintConj" } },
                    { answer: "tydeligt", options: ["tydeligt", "tydelig", "tydelige"], category: "catAdverbium", hints: { "tydelig": "hintForm", "tydelige": "hintForm" } },
                    { answer: "når", options: ["når", "da", "som"], category: "catKonjunktion", hints: { "da": "hintConj", "som": "hintConj" } },
                    { answer: "har", options: ["har", "får", "er"], category: "catVerbum", hints: { "får": "hintContext", "er": "hintContext" } },
                    { answer: "så", options: ["så", "hvis", "da"], category: "catKonjunktion", hints: { "hvis": "hintConj", "da": "hintConj" } },
                    { answer: "heldig", options: ["heldig", "heldige", "heldigt"], category: "catAdjektiv", hints: { "heldige": "hintForm", "heldigt": "hintForm" } },
                    { answer: "selvom", options: ["selvom", "fordi", "at"], category: "catKonjunktion", hints: { "fordi": "hintConj", "at": "hintConj" } },
                    { answer: "triste", options: ["triste", "trist", "glade"], category: "catAdjektiv", hints: { "trist": "hintForm", "glade": "hintMean" } },
                    { answer: "byder", options: ["byder", "bød", "budt"], category: "catVerbum", hints: { "bød": "hintTense", "budt": "hintTense" } },
                    { answer: "dag", options: ["dag", "årstid", "minut"], category: "catSubstantiv", hints: { "årstid": "hintMean", "minut": "hintMean" } }
                ]
            }
        ];
    }
    return [];
}

