import { baseUrl } from '../utils/config.js';
import { getTranslation } from '../utils/i18n.js';
import { pronomenData } from '../utils/pronomenData.js';

import { initAdverbChoiceExerciseView } from './AdverbChoiceExerciseView.js';
import { initAdverbDialogExerciseView } from './AdverbDialogExerciseView.js';
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
    adverbChoiceCard.onclick = () => navigateFn('pronomen', { subPath: 'adverbier_menu' });

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
        <div class="card-title">En kat / katten? (Artikler & Bestemthed)</div>
    `;
    bestemthedCard.onclick = () => navigateFn('pronomen', { subPath: 'artikler_menu' });

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

        let items = [];
        if (category === 'pronomen') {
            items = [
                { key: 'pronominerSubjekt', type: 'subjekt', icon: '🔦', img: 'pronominer_spotlight.png' },
                { key: 'pronominerObjekt', type: 'objekt', icon: '👤', img: 'objekt_vand.jpg' },
                { key: 'pronominerPossessiv', type: 'possessiv', icon: '🏠', img: 'ejefald_guide_voksne.jpg' },
                { key: 'pronominerRefleksiv', type: 'refleksiv', icon: '🔄', img: 'refleksiv_guide.jpg' }
            ];
        } else if (category === 'artikler_menu') {
            items = [
                { title: 'En/et? (Artikler)', type: 'artikler', icon: '🏷️' },
                { title: 'En kat / katten? (bestemt og ubestemt)', type: 'bestemthed', icon: '🏷️' }
            ];
        } else if (category === 'adverbier_menu') {
            items = [
                { title: 'Holdninger - adverbier', type: 'adverbier_holdninger', icon: '💨' },
                { title: 'Dialog - adverbier', type: 'adverbier_dialog', icon: '💬' },
                { title: 'Tid - adverbier', type: 'adverbier_tid', icon: '⏱️' }
            ];
        } else {
            items = [
                { key: 'verbumLearning', type: 'verber_nutid', icon: '🏃', img: 'verber_kategorier.png' },
                { key: 'verberDatidRegelm', type: 'datid_regelm', icon: '🕰️', img: 'verber_kategorier.png' },
                { key: 'verberDatid', type: 'datid', icon: '🕰️', img: 'verber_kategorier.png' },
                { key: 'verberTider', type: 'tider', icon: '🌉', img: 'verber_kategorier.png' }
            ];
        }

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
                } else if (category === 'artikler_menu') {
                    navigateFn(item.type);
                } else if (category === 'adverbier_menu') {
                    if (item.type === 'adverbier_holdninger') {
                        navigateFn('adverbier');
                    } else if (item.type === 'adverbier_dialog') {
                        navigateFn('adverbier_dialog');
                    } else {
                        // TODO: Implement views for tid
                        alert('Denne opgave er under udvikling. Kommer snart!');
                    }
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
            cardTitle.textContent = item.title ? item.title : getTranslation(item.key);

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
        const slide1 = document.createElement('div');
        slide1.className = 'expl-slide';
        slide1.innerHTML = `
            <img src="${baseUrl}der_det_guide.png" class="pronomen-illustration">
            <div class="expl-bubble pulse">${getTranslation('Brug Paraplyen (Det) om den generelle tilstand eller vejret.<br>Brug Pilen (Der) om et specifikt punkt eller en placering.')}</div>
            <p class="expl-text">${getTranslation('Både "det" og "der" kan ofte bruges, afhængigt af hvad du vil fokusere på!')}</p>
            <button class="gemini-btn start-practice-btn">${getTranslation('Start øvelse!')}</button>
        `;

        slide1.querySelector('.start-practice-btn').onclick = () => {
            startDerErExercise();
        };

        explContainer.appendChild(slide1);
        gameArea.appendChild(explContainer);
    }

    function startDerErExercise() {
        gameArea.innerHTML = '';
        const exerciseData = [
            {
                text: "Husk din varme jakke, for [blank_0] er koldt udenfor i dag.",
                answers: ["det", "der"],
                options: ["der", "det"],
                hints: {},
                feedback: {
                    "det": "Rigtigt! ☂️ Paraply: Du fokuserer på den generelle tilstand og vejret.<br><i>(Tip: 'Der' er også korrekt, hvis du fokuserer på placeringen 'udenfor').</i>",
                    "der": "Rigtigt! 🎯 Pil: Du fokuserer på placeringen udenfor.<br><i>(Tip: 'Det' er også meget almindeligt, da det handler om vejret generelt).</i>"
                }
            },
            {
                text: "Pas på dine tæer! [blank_0] ligger en tung kuffert på gulvet.",
                answers: ["der"],
                options: ["der", "det"],
                hints: { "det": "Tænk på Pilen. Vi peger på en helt bestemt fysisk ting (kufferten) på en specifik placering (gulvet)." },
                feedback: { "der": "Rigtigt! 🎯 Pil: Vi peger på en specifik ting på en specifik placering. Her kan man KUN sige 'der'." }
            },
            {
                text: "Tænd venligst lyset. [blank_0] er meget mørkt herinde i stuen.",
                answers: ["det", "der"],
                options: ["der", "det"],
                hints: {},
                feedback: {
                    "det": "Rigtigt! ☂️ Paraply: Du fokuserer på stuens generelle tilstand.<br><i>(Tip: 'Der' er også korrekt, hvis du fokuserer på placeringen 'herinde').</i>",
                    "der": "Rigtigt! 🎯 Pil: Du fokuserer på den specifikke placering 'herinde i stuen'.<br><i>(Tip: 'Det' er også korrekt, hvis du fokuserer på den generelle tilstand).</i>"
                }
            },
            {
                text: "Pas på, når du går ned i kælderen. [blank_0] er mørkt under trappen, så tag din telefon med.",
                answers: ["der", "det"],
                options: ["der", "det"],
                hints: {},
                feedback: {
                    "der": "Rigtigt! 🎯 Pil: Du peger på et helt specifikt, afgrænset punkt (under trappen).",
                    "det": "Rigtigt! ☂️ Paraply: Du fokuserer på den generelle tilstand (at der er mørkt).<br><i>('Der' er ofte mere naturligt her, da vi fokuserer stærkt på det specifikke sted).</i>"
                }
            },
            {
                text: "I juli måned er [blank_0] som regel rigtig dejligt og varmt i Danmark.",
                answers: ["det", "der"],
                options: ["der", "det"],
                hints: {},
                feedback: {
                    "det": "Rigtigt! ☂️ Paraply: Varmen beskriver vejret generelt.<br><i>(Tip: 'Der' er også korrekt, da vi taler om placeringen 'i Danmark').</i>",
                    "der": "Rigtigt! 🎯 Pil: Du fokuserer på placeringen (Danmark).<br><i>(Tip: 'Det' er også meget almindeligt for at beskrive det generelle vejr).</i>"
                }
            },
            {
                text: "Pas på din mund! [blank_0] er meget varm kaffe i koppen.",
                answers: ["der"],
                options: ["der", "det"],
                hints: { "det": "Tænk på Pilen. Vi zoomer ind på en bestemt placering (i koppen) og den fysiske kaffe." },
                feedback: { "der": "Rigtigt! 🎯 Pil: Vi zoomer ind på en bestemt placering (i koppen) og peger på kaffen dér. Her kan man KUN bruge 'der'." }
            },
            {
                text: "Vi må ikke larme nu, for [blank_0] sover et lille barn inde i soveværelset.",
                answers: ["der"],
                options: ["der", "det"],
                hints: { "det": "Tænk på Pilen. Vi henleder opmærksomheden på et barn på en specifik placering (inde i soveværelset)." },
                feedback: { "der": "Rigtigt! 🎯 Pil: Vi peger på en specifik placering, hvor et barn befinder sig. Her kan man KUN sige 'der'." }
            },
            {
                text: "Hvordan er vejret på din ferie? - [blank_0] er meget solrigt og varmt hernede.",
                answers: ["det"],
                options: ["der", "det"],
                hints: { "der": "Tænk på Paraplyen. Vi taler om vejret og den generelle tilstand." },
                feedback: { "det": "Rigtigt! ☂️ Paraply: Varmen og solen beskriver vejret og den generelle tilstand. Her bruger vi 'det'." }
            },
            {
                text: "Skynd dig lidt! [blank_0] holder en taxa og venter på os ude foran.",
                answers: ["der"],
                options: ["der", "det"],
                hints: { "det": "Tænk på Pilen. Vi peger på en bestemt fysisk ting (taxaen) på en specifik placering (ude foran)." },
                feedback: { "der": "Rigtigt! 🎯 Pil: Vi peger på en specifik taxa, som befinder sig på en specifik placering ude foran. Man kan KUN bruge 'der'." }
            },
            {
                text: "Hvorfor fryser du? - Fordi [blank_0] trækker fra det åbne vindue.",
                answers: ["det"],
                options: ["der", "det"],
                hints: { "der": "Tænk på Paraplyen. At 'det trækker' beskriver en usynlig tilstand i rummet, lidt ligesom vejret." },
                feedback: { "det": "Rigtigt! ☂️ Paraply: Vi taler om en generel, usynlig tilstand (at vinden trækker ind). Det fungerer præcis som når vi beskriver vejret." }
            },
            {
                text: "Skal vi tage på caféen nede på hjørnet? Ja, [blank_0] er altid så hyggeligt.",
                answers: ["der", "det"],
                options: ["der", "det"],
                hints: {},
                feedback: {
                    "der": "Rigtigt! 🎯 Pil: Du fokuserer på den specifikke café og stemningen præcis dér.<br><i>(Tip: 'Det' er også korrekt, hvis du fokuserer på den generelle situation).</i>",
                    "det": "Rigtigt! ☂️ Paraply: Du fokuserer på den generelle atmosfære og situation på caféen.<br><i>(Tip: 'Der' er også meget almindeligt, da caféen er et specifikt sted).</i>"
                }
            },
            {
                text: "Kig i køleskabet. [blank_0] står lidt kage tilbage fra i går.",
                answers: ["der"],
                options: ["der", "det"],
                hints: { "det": "Tænk på Pilen. Vi zoomer ind på en bestemt placering (køleskabet) og kigger på en fysisk ting (kagen)." },
                feedback: { "der": "Rigtigt! 🎯 Pil: Vi peger på en fysisk ting (kagen) på en helt specifik placering (i køleskabet)." }
            }
        ];

        let currentIdx = 0;

        function renderStep() {
            gameArea.innerHTML = '';
            const ex = exerciseData[currentIdx];

            const content = document.createElement('div');
            content.className = 'pronomen-exercise-content';

            const illustration = document.createElement('img');
            illustration.src = `${baseUrl}der_det_guide.png`;
            illustration.className = 'pronomen-illustration';
            illustration.style.maxHeight = '250px';
            illustration.style.objectFit = 'contain';
            illustration.style.marginBottom = '1.5rem';
            content.appendChild(illustration);

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
                        const isCorrect = ex.answers.includes(select.value);
                        
                        if (isCorrect) {
                            select.classList.add('correct');
                            select.classList.remove('wrong');

                            // Da opgaverne er ændret markant (både det og der er ofte rigtigt),
                            // bruger vi bare den danske tekst direkte, da de gamle oversættelser i databasen er uddaterede.
                            const feedbText = getTranslation(ex.feedback[select.value]);
                            feedbackArea.innerHTML = `<span style="color: #4ade80;">✓</span> ${feedbText}`;

                            feedbackArea.style.display = 'block';
                            checkBtn.disabled = false;
                        } else if (select.value !== "") {
                            select.classList.add('wrong');
                            select.classList.remove('correct');

                            const hintText = ex.hints[select.value] ? getTranslation(ex.hints[select.value]) : getTranslation("Prøv igen!");
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

    function startAdverbDialogExercise() {
        currentLevel = 2;
        menuArea.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.innerHTML = '';
        title.textContent = 'Dialog - adverbier';
        initAdverbDialogExerciseView(gameArea, navigateFn);
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

        const illustrationContainer = document.createElement('div');
        illustrationContainer.style.textAlign = 'center';
        illustrationContainer.style.marginBottom = '2rem';
        
        const illustration = document.createElement('img');
        illustration.className = 'pronomen-illustration';
        illustration.style.marginBottom = '1rem';
        
        if (category.type === 'objekt') {
            illustration.src = baseUrl + 'objekt_vand.jpg';
            const caption = document.createElement('div');
            caption.innerHTML = '<strong>Subjekt → Verbum → Objekt</strong><br><em>"Jeg giver dig et glas vand"</em>';
            caption.className = 'expl-bubble';
            caption.style.display = 'inline-block';
            
            illustrationContainer.appendChild(illustration);
            illustrationContainer.appendChild(caption);
        } else if (category.type === 'possessiv') {
            illustration.src = baseUrl + 'ejefald_guide_voksne.jpg';
            const caption = document.createElement('div');
            caption.innerHTML = '<strong>Ejefald (Possessiv)</strong><br><em>"Hans bil, hendes cykel, vores hus"</em>';
            caption.className = 'expl-bubble';
            caption.style.display = 'inline-block';
            
            illustrationContainer.appendChild(illustration);
            illustrationContainer.appendChild(caption);
        } else if (category.type === 'refleksiv') {
            illustration.src = baseUrl + 'refleksiv_guide.jpg';
            const caption = document.createElement('div');
            caption.innerHTML = '<strong>Refleksivt (Tilbagevisende)</strong><br><em>Subjekt + Verbum + Objekt (Refleksivt)<br>"Jeg skynder mig til toget"</em>';
            caption.className = 'expl-bubble';
            caption.style.display = 'inline-block';
            
            illustrationContainer.appendChild(illustration);
            illustrationContainer.appendChild(caption);
        } else {
            illustration.src = baseUrl + 'pronominer_guide.png';
            illustrationContainer.appendChild(illustration);
        }
        
        gameArea.appendChild(illustrationContainer);

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
        showPronomenSets('objekt', 'objekt_vand.jpg');
    } else if (viewMode === 'possessiv') {
        showPronomenSets('possessiv', 'ejefald_guide_voksne.jpg');
    } else if (viewMode === 'refleksiv') {
        showPronomenSets('refleksiv', 'refleksiv_guide.jpg');
    } else if (viewMode === 'adverbier') {
        startAdverbChoiceExercise();
    } else if (viewMode === 'adverbier_dialog') {
        startAdverbDialogExercise();
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
    } else if (subPath === 'artikler_menu') {
        showLevel2('artikler_menu');
    } else {
        renderStep();
    }
}
