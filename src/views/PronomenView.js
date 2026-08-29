import { baseUrl } from '../utils/config.js';
import { getTranslation } from '../utils/i18n.js';
import { pronomenData } from '../utils/pronomenData.js';

import { initAdverbChoiceExerciseView } from './AdverbChoiceExerciseView.js';
import { initConjunctionChoiceExerciseView } from './ConjunctionChoiceExerciseView.js';

export function renderPronomenView(container, navigateFn, extraData) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // handle initial deep linking if coming from grounding or elsewhere
    const initialCategory = extraData?.category || null;

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    function renderStep() {
        currentLevel = 1;
        level1Area.style.display = 'block';
        level2Area.style.display = 'none';
        level3Area.style.display = 'none';
        gameArea.style.display = 'none';
        menuArea.style.display = 'block';
        title.textContent = getTranslation('hvilketOrd');
    }

    const title = document.createElement('h1');
    title.textContent = getTranslation('hvilketOrd');
    viewContainer.appendChild(title);

    const menuArea = document.createElement('div');
    const level1Area = document.createElement('div'); // Pronomen vs Verbum
    const level2Area = document.createElement('div'); // Sub-categories
    const level3Area = document.createElement('div'); // Sets or Verb groups
    const gameArea = document.createElement('div');

    level2Area.style.display = 'none';
    level3Area.style.display = 'none';
    gameArea.style.display = 'none';

    // --- State Management ---
    let currentMainCategory = null; // 'pronomen' or 'verbum'
    let currentSubCategory = null; // 'subjekt', 'objekt', 'possessiv'
    let currentLevel = 1; // 1, 2, or 3
    let currentExercises = [];

    // --- Level 1: Main Categories ---
    const grid1 = document.createElement('div');
    grid1.className = 'grid';
    grid1.style.marginTop = '2rem';

    const pronomenCard = document.createElement('div');
    pronomenCard.className = 'card';
    pronomenCard.innerHTML = `
        <div class="card-icon">👥</div>
        <div class="card-title">${getTranslation('hanHamHans')}</div>
    `;
    pronomenCard.onclick = () => navigateFn('pronomen', { subPath: 'p' });

    const verbumCard = document.createElement('div');
    verbumCard.className = 'card';
    verbumCard.innerHTML = `
        <div class="card-icon">🏃</div>
        <div class="card-title">${getTranslation('gårGikGået')}</div>
    `;
    verbumCard.onclick = () => navigateFn('pronomen', { subPath: 'v' });

    const derErCard = document.createElement('div');
    derErCard.className = 'card';
    derErCard.innerHTML = `
        <div class="card-icon">🚪</div>
        <div class="card-title">${getTranslation('derErDetEr')}</div>
    `;
    derErCard.onclick = () => navigateFn('pronomen', { subPath: 'der_er_det_er' });

    const adjCompCard = document.createElement('div');
    adjCompCard.className = 'card';
    adjCompCard.innerHTML = `
        <div class="card-icon">📈</div>
        <div class="card-title">${getTranslation('soedSoedereSoedest')}</div>
    `;
    adjCompCard.onclick = () => navigateFn('adjective_comparison');

    const adverbChoiceCard = document.createElement('div');
    adverbChoiceCard.className = 'card';
    adverbChoiceCard.innerHTML = `
        <div class="card-icon">💨</div>
        <div class="card-title">${getTranslation('advChoiceTitle')}</div>
    `;
    adverbChoiceCard.onclick = () => navigateFn('adverbier');

    const conjunctionChoiceCard = document.createElement('div');
    conjunctionChoiceCard.className = 'card';
    conjunctionChoiceCard.innerHTML = `
        <div class="card-icon">🔗</div>
        <div class="card-title">${getTranslation('conjunctionChoiceTitle')}</div>
    `;
    conjunctionChoiceCard.onclick = () => navigateFn('konjunktioner');

    const bestemthedCard = document.createElement('div');
    bestemthedCard.className = 'card';
    bestemthedCard.innerHTML = `
        <div class="card-icon">🏷️</div>
        <div class="card-title">${getTranslation('bestemthedLabel')}</div>
    `;
    bestemthedCard.onclick = () => navigateFn('bestemthed');

    grid1.appendChild(pronomenCard);
    grid1.appendChild(verbumCard);
    grid1.appendChild(derErCard);
    grid1.appendChild(adjCompCard);
    grid1.appendChild(adverbChoiceCard);
    grid1.appendChild(conjunctionChoiceCard);
    grid1.appendChild(bestemthedCard);
    level1Area.appendChild(grid1);

    // --- Support Links ---
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
    level1Area.appendChild(supportArea);

    menuArea.appendChild(level1Area);

    // --- Level 2: Sub-categories ---
    const grid2 = document.createElement('div');
    grid2.className = 'grid';
    level2Area.appendChild(grid2);
    menuArea.appendChild(level2Area);

    function showLevel2(category) {
        currentMainCategory = category;
        currentLevel = 2;
        level1Area.style.display = 'none';
        level2Area.style.display = 'block';
        level3Area.style.display = 'none';
        gameArea.style.display = 'none';
        menuArea.style.display = 'block';
        grid2.innerHTML = '';

        const items = category === 'pronomen' ? [
            { key: 'pronominerSubjekt', type: 'subjekt', icon: '🔦', img: 'pronominer_spotlight.png' },
            { key: 'pronominerObjekt', type: 'objekt', icon: '👤', img: 'pronominer_objekt.png' },
            { key: 'pronominerPossessiv', type: 'possessiv', icon: '🏠', img: 'pronominer_possessiv.png' },
            { key: 'pronominerRefleksiv', type: 'refleksiv', icon: '🔄', img: 'pronominer_refleksiv.png' }
        ] : [
            { key: 'verbumLearning', type: 'verber_nutid', icon: '🏃', img: 'verber_kategorier.png' },
            { key: 'verberDatidRegelm', type: 'datid_regelm', icon: '🕰️', img: 'verber_kategorier.png' },
            { key: 'verberDatid', type: 'datid', icon: '🕰️', img: 'verber_kategorier.png' },
            { key: 'verberTider', type: 'tider', icon: '🌉', img: 'verber_kategorier.png' }
        ];

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                if (category === 'pronomen') {
                    const routeMap = {
                        subjekt: 'pronominer_subjekt',
                        objekt: 'pronominer_objekt',
                        possessiv: 'pronominer_possessiv',
                        refleksiv: 'pronominer_refleksiv'
                    };
                    navigateFn(routeMap[item.type] || 'pronomen');
                } else {
                    if (item.type === 'verber_nutid') {
                        navigateFn('verbum_menu');
                    } else {
                        navigateFn('verbum_learning', { subPath: item.type, backView: 'pronomen' });
                    }
                }
            };

            const icon = document.createElement('div');
            icon.className = 'card-icon';
            icon.textContent = item.icon;

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = getTranslation(item.key);

            card.appendChild(icon);
            card.appendChild(cardTitle);
            grid2.appendChild(card);
        });
    }

    function showPronomenSets(categoryType, illustrationImg) {
        currentLevel = 3;
        level1Area.style.display = 'none';
        level2Area.style.display = 'none';
        level3Area.style.display = 'block';
        gameArea.style.display = 'none';
        menuArea.style.display = 'block';
        grid3.innerHTML = '';
        illustrationContainer.innerHTML = '';
        title.textContent = getTranslation('hanHamHans');

        if (illustrationImg) {
            const illustration = document.createElement('img');
            illustration.src = baseUrl + illustrationImg;
            illustration.className = 'pronomen-illustration';
            illustrationContainer.appendChild(illustration);
        }

        const sets = [...pronomenData[categoryType]];
        sets.forEach((set, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                navigateFn('pronomen', { subPath: `p/${categoryType}/${set.id}` });
            };

            const icon = document.createElement('div');
            icon.className = 'card-icon';
            icon.textContent = '📝';

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = `Sæt ${index + 1}`;

            card.appendChild(icon);
            card.appendChild(cardTitle);
            grid3.appendChild(card);
        });
    }

    // --- Level 3: Verb Groups (Nutid) ---
    const illustrationContainer = document.createElement('div');
    illustrationContainer.className = 'pronomen-illustration-container';
    illustrationContainer.style.textAlign = 'center';
    level3Area.appendChild(illustrationContainer);

    const grid3 = document.createElement('div');
    grid3.className = 'grid';
    level3Area.appendChild(grid3);
    menuArea.appendChild(level3Area);

    function showLevel3() {
        currentLevel = 3;
        level1Area.style.display = 'none';
        level2Area.style.display = 'none';
        level3Area.style.display = 'block';
        gameArea.style.display = 'none';
        menuArea.style.display = 'block';
        grid3.innerHTML = '';
        illustrationContainer.innerHTML = '';

        const verbGroups = [
            { key: 'verberHjaelpe', type: 'hjaelpe', icon: '💡' },
            { key: 'verberTilstand', type: 'tilstand', icon: '🏠' },
            { key: 'verberBevaegelse', type: 'bevaegelse', icon: '🚶' },
            { key: 'verberHandling', type: 'handling', icon: '🛠️' },
            { key: 'verberInteraktion', type: 'interaktion', icon: '🗣️' },
            { key: 'verberIndreLiv', type: 'indre_liv', icon: '🧠' }
        ];

        verbGroups.forEach(group => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => navigateFn('verbum_learning', { subPath: group.type, backView: 'pronomen' });

            const icon = document.createElement('div');
            icon.className = 'card-icon';
            icon.textContent = group.icon;

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = getTranslation(group.key);

            card.appendChild(icon);
            card.appendChild(cardTitle);
            grid3.appendChild(card);
        });
    }

    // --- Back Button Logic ---
    backBtn.onclick = () => {
        if (currentLevel === 3) {
            // Check if we have a specific viewMode from props
            if (extraData?.viewMode) {
                navigateFn('pronomen');
            } else {
                navigateFn('pronomen', { subPath: currentMainCategory === 'pronomen' ? 'p' : 'v' });
            }
        } else if (currentLevel === 2) {
            navigateFn('pronomen');
        } else {
            navigateFn('dagens_opgave');
        }
    };

    function startDerErExplanation() {
        currentLevel = 2; // Treat as level 2 so back goes to Level 1 (pronomen menu)
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation('derErDetEr');

        const explContainer = document.createElement('div');
        explContainer.className = 'der-er-explanation';

        // Slide 1: Introduction
        const slide1 = document.createElement('div');
        slide1.className = 'expl-slide';
        slide1.innerHTML = `
            <img src="${baseUrl}der_er_bil_gade.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${getTranslation('derErIntro1')}</div>
            <p class="expl-text">${getTranslation('derErExpl')}</p>
            <button class="gemini-btn next-slide-btn">Næste →</button>
        `;

        // Slide 2: Identification
        const slide2 = document.createElement('div');
        slide2.className = 'expl-slide';
        slide2.style.display = 'none';
        slide2.innerHTML = `
            <img src="${baseUrl}det_er_bil_pegepind.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${getTranslation('derErIntro2')}</div>
            <p class="expl-text">Når vi kender tingen (den er inde i rummet), så bruger vi <b>det</b> til at pege.</p>
            <button class="gemini-btn start-practice-btn">Start øvelse!</button>
        `;

        slide1.querySelector('.next-slide-btn').onclick = () => {
            slide1.style.display = 'none';
            slide2.style.display = 'block';
        };

        slide2.querySelector('.start-practice-btn').onclick = () => {
            startDerErExercise();
        };

        explContainer.appendChild(slide1);
        explContainer.appendChild(slide2);
        gameArea.appendChild(explContainer);
    }

    function startDerErExercise() {
        gameArea.innerHTML = '';
        const exerciseData = [
            {
                text: "Se! [blank_0] en rød hund ude i haven.",
                answer: "Der er",
                options: ["Der er", "Det er"],
                hints: { "Det er": "'Det er' peger på noget bestemt, vi kender. Her introducerer vi en ny hund." },
                feedback: "Korrekt! 'Der er' bruges, når vi præsenterer eksistensen af noget nyt."
            },
            {
                text: "Hvad er det for en lyd? [blank_0] bare naboens kat.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Vi skal identificere lyden (faktum). 'Der er' introducerer oftest nye ting på et sted." },
                feedback: "Korrekt! 'Det er' forklarer og identificerer tingen (katten)."
            },
            {
                text: "Hvem banker på døren? [blank_0] nok min mor.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Når man spørger 'hvem er', svarer man med identiteten ('Det er')." },
                feedback: "Korrekt! Vi identificerer en bestemt person."
            },
            {
                text: "[blank_0] mange spændende mennesker i toget i dag.",
                answer: "Der er",
                options: ["Der er", "Det er"],
                hints: { "Det er": "Ordet mangler flertal, og vi præsenterer blot at noget befinder sig i toget." },
                feedback: "Korrekt! 'Der er' beskriver antallet af noget på et sted."
            },
            {
                text: "[blank_0] en dejlig kop kaffe, du har lavet her.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Vi ved allerede at koppen findes foran dig. Nu vurdere vi den." },
                feedback: "Korrekt! 'Det er' bruges til at bedømme og pege på den specifikke kaffe."
            },
            {
                text: "Hvad ligger der på bordet? [blank_0] min danske bog.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Spørgsmålet lyder 'hvad er det?'. Så svarer man for at pege på identiteten." },
                feedback: "Korrekt! Identifikation af bogen."
            },
            {
                text: "Åh nej, [blank_0] slet ingen mælk i vores køleskab.",
                answer: "Der er",
                options: ["Der er", "Det er"],
                hints: { "Det er": "Vi peger ikke på noget. Vi snakker om, at noget mangler (eksistens)." },
                feedback: "Korrekt! Eksistens (eller manglen på samme) tager altid 'Der er'."
            },
            {
                text: "Hvem var det i telefonen? [blank_0] min gode chef.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Du skal fortælle identiteten på personen. Det gør man ikke med 'Der er'." },
                feedback: "Korrekt! 'Det er' fortæller hvem det var."
            },
            {
                text: "[blank_0] sikkert et spøgelse oppe i det gamle hus.",
                answer: "Der er",
                options: ["Der er", "Det er"],
                hints: { "Det er": "Vi har ikke set et specifikt spøgelse. Vi gætter på, at et findes der." },
                feedback: "Korrekt! 'Der er' markerer at noget befinder sig et bestemt sted."
            },
            {
                text: "Er det din taske? Ja, [blank_0] min taske.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Kan kun være forkert her, for du svarer direkte på 'Er det...'." },
                feedback: "Korrekt! Du bekræfter, hvilken taske vi taler om."
            },
            {
                text: "Se skyerne! [blank_0] snart voldsomt regnvejr.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Når man taler om vejret, bruger vi oftest 'Det er' (det et koldt, det er regnvejr)." },
                feedback: "Korrekt! Vejr og naturfænomener tager næsten altid 'Det er'."
            },
            {
                text: "Pas på, [blank_0] en sur hund under din bil.",
                answer: "Der er",
                options: ["Der er", "Det er"],
                hints: { "Det er": "Hunden introduceres for allerførste gang som en fare under bilen." },
                feedback: "Korrekt! Noget uspecificeret findes på et sted ('Der er')."
            },
            {
                text: "Hvem bankede? [blank_0] bare postbuddet med en pakke.",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Vi skal oplyse postbuddets identitet, så 'Der er' fungerer ikke." },
                feedback: "Korrekt! 'Det er' identificerer."
            },
            {
                text: "[blank_0] meget koldt herinde, kan du lukke vinduet?",
                answer: "Det er",
                options: ["Der er", "Det er"],
                hints: { "Der er": "Vi taler om klima/temperatur. Temperaturen er ikke en fysisk ting." },
                feedback: "Korrekt! 'Det er' bruges fast om vejr, tid og temperatur."
            },
            {
                text: "På lørdag [blank_0] stor fodboldfest nede i byen.",
                answer: "er der",
                options: ["er der", "er det"],
                hints: { "er det": "Festen findes sted/eksisterer lørdag, vi peger ikke på én fast genstand." },
                feedback: "Korrekt! 'Der er' (omvendt til 'er der') markerer begivenhedens eksistens."
            }
        ];

        let currentIdx = 0;

        function renderStep() {
            gameArea.innerHTML = '';
            const ex = exerciseData[currentIdx];

            const content = document.createElement('div');
            content.className = 'pronomen-exercise-content';

            const progress = document.createElement('div');
            progress.className = 'exercise-progress';
            progress.textContent = `Opgave ${currentIdx + 1} af ${exerciseData.length}`;
            content.appendChild(progress);

            const textContainer = document.createElement('div');
            textContainer.className = 'grammatik-text-container';

            const parts = ex.text.split(/(\[blank_0\])/);
            parts.forEach(part => {
                if (part === '[blank_0]') {
                    const select = document.createElement('select');
                    select.className = 'grammatik-select';

                    const defaultOpt = document.createElement('option');
                    defaultOpt.value = "";
                    defaultOpt.textContent = "...";
                    select.appendChild(defaultOpt);

                    ex.options.forEach(opt => {
                        const o = document.createElement('option');
                        o.value = opt;
                        o.textContent = opt;
                        select.appendChild(o);
                    });

                    const feedbackArea = document.createElement('div');
                    feedbackArea.className = 'exercise-feedback';

                    const wrapper = document.createElement('span');
                    wrapper.className = 'select-wrapper';
                    wrapper.appendChild(select);
                    textContainer.appendChild(wrapper);

                    select.onchange = () => {
                        if (select.value === ex.answer) {
                            select.classList.add('correct');
                            select.classList.remove('wrong');

                            const feedbText = getTranslation(`derEr_ex${currentIdx}_feedback`) || ex.feedback;
                            feedbackArea.innerHTML = `<span style="color: #4ade80;">✓</span> ${feedbText}`;

                            feedbackArea.style.display = 'block';
                            checkBtn.disabled = false;
                        } else if (select.value !== "") {
                            select.classList.add('wrong');
                            select.classList.remove('correct');

                            const safeOpt = select.value.replace(/[^a-zA-ZæøåÆØÅ]/g, '');
                            const hintText = getTranslation(`derEr_ex${currentIdx}_hint_${safeOpt}`) || ex.hints[select.value] || "Prøv igen!";
                            feedbackArea.innerHTML = `<span style="color: #e74c3c;">✗</span> ${hintText}`;

                            feedbackArea.style.display = 'block';
                            checkBtn.disabled = true;
                        } else {
                            select.classList.remove('correct', 'wrong');
                            feedbackArea.style.display = 'none';
                            checkBtn.disabled = true;
                        }
                    };
                    content.appendChild(feedbackArea);
                } else {
                    const span = document.createElement('span');
                    span.textContent = part;
                    textContainer.appendChild(span);
                }
            });

            content.appendChild(textContainer);

            const checkBtn = document.createElement('button');
            checkBtn.className = 'gemini-btn';
            checkBtn.textContent = 'Check';
            checkBtn.disabled = true;
            checkBtn.onclick = () => {
                currentIdx++;
                if (currentIdx < exerciseData.length) {
                    renderStep();
                } else {
                    showFinalScore();
                }
            };

            content.appendChild(checkBtn);
            gameArea.appendChild(content);
        }

        function showFinalScore() {
            gameArea.innerHTML = `
                <div class="pronomen-exercise-content">
                    <h2>Flot klaret! 🎉</h2>
                    <p>Du har styr på 'Der er' og 'Det er'.</p>
                    <button class="gemini-btn" onclick="location.reload()">Tilbage til menu</button>
                </div>
            `;
        }

        renderStep();
    }

    function startAdverbChoiceExercise() {
        currentLevel = 2;
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation('advChoiceTitle');
        initAdverbChoiceExerciseView(gameArea, navigateFn);
    }

    function startConjunctionChoiceExercise() {
        currentLevel = 2;
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation('conjunctionChoiceTitle');
        initConjunctionChoiceExerciseView(gameArea, navigateFn);
    }

    // --- Game Area (Pronomen Only) ---
    function startExercise(category) {
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = getTranslation(category.key);

        const illustration = document.createElement('img');
        illustration.src = baseUrl + 'pronominer_guide.png';
        illustration.className = 'pronomen-illustration';
        gameArea.appendChild(illustration);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'pronomen-exercise-content';

        const exerciseList = document.createElement('div');
        exerciseList.className = 'pronomen-list';

        const totalTasks = currentExercises.length;
        let solvedCount = 0;

        currentExercises.forEach((ex, exIdx) => {
            const row = document.createElement('div');
            row.className = 'pronomen-row';

            const personBadge = document.createElement('div');
            personBadge.className = 'person-badge';
            personBadge.textContent = ex.person || "";
            row.appendChild(personBadge);

            const textContainer = document.createElement('div');
            textContainer.className = 'grammatik-text-container';

            const parts = ex.text.split(/(\[blank_\d+\])/);
            parts.forEach(part => {
                const match = part.match(/\[blank_(\d+)\]/);
                if (match) {
                    const idx = match[1];
                    const wrapper = document.createElement('span');
                    wrapper.className = 'select-wrapper';

                    const select = document.createElement('select');
                    select.className = 'grammatik-select';
                    select.dataset.exIdx = exIdx;
                    select.dataset.blankIdx = idx;

                    const defaultOpt = document.createElement('option');
                    defaultOpt.value = "";
                    defaultOpt.textContent = "...";
                    select.appendChild(defaultOpt);

                    const options = [...ex.blanks[idx].options].sort(() => Math.random() - 0.5);
                    options.forEach(opt => {
                        const o = document.createElement('option');
                        o.value = opt;
                        o.textContent = opt;
                        select.appendChild(o);
                    });

                    const feedbackRow = document.createElement('div');
                    feedbackRow.className = 'exercise-feedback-row';
                    feedbackRow.style.display = 'none';

                    select.onchange = () => {
                        const val = select.value;
                        if (val === ex.blanks[idx].answer) {
                            select.classList.add('correct');
                            select.classList.remove('wrong');
                            feedbackRow.style.display = 'none';
                            if (!select.dataset.solved) {
                                select.dataset.solved = "true";
                                solvedCount++;
                                updateSummary();
                            }
                        } else if (val !== "") {
                            select.classList.add('wrong');
                            select.classList.remove('correct');

                            let hintKey = 'hintPronominer';
                            if (category.type === 'subjekt') hintKey = 'hintPronominerSubjekt';
                            else if (category.type === 'objekt') hintKey = 'hintPronominerObjekt';
                            else if (category.type === 'possessiv') hintKey = 'hintPronominerPossessiv';
                            else if (category.type === 'refleksiv') hintKey = 'hintPronominerRefleksiv';

                            const personInfo = ex.person ? ` (${ex.person})` : "";
                            feedbackRow.textContent = getTranslation(hintKey) + personInfo;
                            feedbackRow.style.display = 'block';
                            if (select.dataset.solved) {
                                delete select.dataset.solved;
                                solvedCount--;
                                updateSummary();
                            }
                        } else {
                            select.classList.remove('correct', 'wrong');
                            feedbackRow.style.display = 'none';
                            if (select.dataset.solved) {
                                delete select.dataset.solved;
                                solvedCount--;
                                updateSummary();
                            }
                        }
                    };

                    wrapper.appendChild(select);
                    textContainer.appendChild(wrapper);
                    row.appendChild(textContainer);
                    row.appendChild(feedbackRow);
                } else {
                    const span = document.createElement('span');
                    span.textContent = part;
                    textContainer.appendChild(span);
                }
            });

            exerciseList.appendChild(row);
        });

        contentWrapper.appendChild(exerciseList);

        const resultSummary = document.createElement('div');
        resultSummary.className = 'grammatik-summary';
        resultSummary.style.display = 'block';
        contentWrapper.appendChild(resultSummary);

        const controls = document.createElement('div');
        controls.className = 'game-controls';

        const finishBtn = document.createElement('button');
        finishBtn.className = 'gemini-btn';
        finishBtn.textContent = 'Færdig! 🎉';
        finishBtn.style.display = 'none';
        finishBtn.onclick = () => {
            location.reload();
        };

        function updateSummary() {
            resultSummary.textContent = `${solvedCount} / ${totalTasks} ${getTranslation('correct')}`;
            if (solvedCount === totalTasks) {
                finishBtn.style.display = 'inline-block';
            } else {
                finishBtn.style.display = 'none';
            }
        }

        updateSummary();
        controls.appendChild(finishBtn);
        contentWrapper.appendChild(controls);
        gameArea.appendChild(contentWrapper);
    }

    viewContainer.appendChild(menuArea);
    viewContainer.appendChild(gameArea);
    container.appendChild(viewContainer);

    // CSS
    if (!document.getElementById('pronomen-styles')) {
        const styles = document.createElement('style');
        styles.id = 'pronomen-styles';
        styles.textContent = `
            .pronomen-illustration {
                max-width: 100%;
                width: auto;
                height: auto;
                max-height: 250px;
                object-fit: contain;
                border-radius: 20px;
                margin: 0 auto 2rem;
                display: block;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                border: 2px solid rgba(255, 255, 255, 0.1);
            }
            @media (max-width: 600px) {
                .pronomen-illustration { margin-bottom: 1.5rem; border-radius: 12px; }
            }
            .expl-slide {
                text-align: center;
                animation: fadeIn 0.5s ease-out;
            }
            .expl-bubble {
                background: white;
                color: #2c3e50;
                padding: 0.8rem 1.2rem;
                border-radius: 20px;
                display: inline-block;
                font-weight: bold;
                margin-bottom: 1.2rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border: 2px solid #3498db;
                font-size: 1.1rem;
            }
            @media (max-width: 600px) {
                .expl-bubble { font-size: 1rem; padding: 0.6rem 1rem; }
            }
            .expl-text {
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
                color: #ecf0f1;
            }
            @media (max-width: 600px) {
                .expl-text { font-size: 0.95rem; margin-bottom: 1rem; }
            }
            .exercise-progress {
                margin-bottom: 0.8rem;
                font-size: 0.85rem;
                opacity: 0.8;
                text-align: center;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .person-badge {
                display: inline-block;
                background: rgba(52, 152, 219, 0.2);
                color: #3498db;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .pronomen-list {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .pronomen-row {
                background: rgba(255, 255, 255, 0.05);
                padding: 1rem;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .exercise-feedback-row {
                margin-top: 0.5rem;
                color: #e74c3c;
                font-size: 0.9rem;
                font-style: italic;
            }
            .pronomen-illustration-container {
                display: flex;
                justify-content: center;
                margin-bottom: 2rem;
                width: 100%;
            }
            .pronomen-illustration {
                max-width: 100%;
                max-height: 250px;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
        `;
        document.head.appendChild(styles);
    }

    // --- Initial Routing & Segment Support ---
    // Routing logic based on viewMode or subPath
    const viewMode = extraData?.viewMode;
    const subPath = extraData?.subPath || '';
    const initialCategoryFromExtra = extraData?.category || initialCategory;

    if (viewMode === 'subjekt') {
        showPronomenSets('subjekt', 'pronominer_spotlight.png');
    } else if (viewMode === 'objekt') {
        showPronomenSets('objekt', 'pronominer_objekt.png');
    } else if (viewMode === 'possessiv') {
        showPronomenSets('possessiv', 'pronominer_possessiv.png');
    } else if (viewMode === 'refleksiv') {
        showPronomenSets('refleksiv', 'pronominer_refleksiv.png');
    } else if (viewMode === 'adverbier') {
        startAdverbChoiceExercise();
    } else if (viewMode === 'konjunktioner') {
        startConjunctionChoiceExercise();
    } else if (viewMode === 'der_er_det_er' || subPath === 'der_er_det_er') {
        startDerErExplanation();
    } else if (subPath === 'adjektiv_comparison') {
        navigateFn('adjective_comparison');
    } else if (subPath === 'v' || subPath.startsWith('v/')) {
        const parts = subPath.split('/');
        if (parts.length > 1) {
            const type = parts[1];
            if (type === 'verber_nutid') {
                navigateFn('verbum_menu', {}, true);
            } else {
                navigateFn('verbum_learning', { subPath: type, backView: 'pronomen' }, true);
            }
        } else {
            showLevel2('verbum');
        }
    } else if (subPath === 'p' || subPath.startsWith('p/')) {
        const parts = subPath.split('/');
        if (parts.length > 2) {
            const type = parts[1];
            const setId = parts[2];
            currentMainCategory = 'pronomen';
            const set = pronomenData[type]?.find(s => s.id === setId);
            if (set) {
                currentExercises = set.exercises;
                // e.g. type 'subjekt' -> key 'pronominerSubjekt'
                const catKey = 'pronominer' + type.charAt(0).toUpperCase() + type.slice(1);
                startExercise({ key: catKey, type: type });
            } else {
                showPronomenSets(type);
            }
        } else if (parts.length > 1) {
            showPronomenSets(parts[1]);
        } else {
            showLevel2('pronomen');
        }
    } else {
        renderStep();
    }
}
