import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderBestemthedView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container bestemthed-view';

    const isEn = getLang() === 'en';

    // Helper: TTS speech
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('pronomen', { subPath: 'artikler_menu' });
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = isEn 
        ? '🏷️ A cat or the cat? (Indefinite vs. Definite)' 
        : '🏷️ En kat eller katten? (bestemt og ubestemt)';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = isEn
        ? 'Text flow and introducing new topics: From unknown (indefinite) to known (definite)'
        : 'Tekstflow og introduktion af nye emner: Fra ukendt (ubestemt) til kendt (bestemt)';
    viewContainer.appendChild(subtitle);

    // Grammar System Banner (Color-coded legend)
    const grammarBanner = document.createElement('div');
    grammarBanner.className = 'bestemthed-grammar-banner';
    grammarBanner.innerHTML = `
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #f59e0b;"></span>
            <strong style="color: #fbbf24;">${isEn ? '1. time: Unknown topic' : '1. gang: Ukendt emne'}</strong>
            <span style="opacity: 0.85; margin-left: 0.3rem;">➔ ${isEn ? 'Indefinite form (en/et...)' : 'Ubestemt form (en/et...)'}</span>
        </div>
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #10b981;"></span>
            <strong style="color: #34d399;">${isEn ? '2. time: Known topic' : '2. gang: Kendt emne'}</strong>
            <span style="opacity: 0.85; margin-left: 0.3rem;">➔ ${isEn ? 'Definite form (-en/-et/-ene)' : 'Bestemt form (-en/-et/-ene)'}</span>
        </div>
    `;
    viewContainer.appendChild(grammarBanner);

    // Navigation Tabs: 1. del (Modellen) vs. 2. del (Historier) vs. 3. del (Prøv selv)
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'bestemthed-tabs-nav';

    const tab1Btn = document.createElement('button');
    tab1Btn.className = 'bestemthed-tab-btn active';
    tab1Btn.innerHTML = `<strong>${isEn ? 'Part 1: The Model & Rule' : '1. del: Reglen & Modellen'}</strong> <span>${isEn ? 'From unknown to known' : 'Fra ukendt til kendt'}</span>`;

    const tab2Btn = document.createElement('button');
    tab2Btn.className = 'bestemthed-tab-btn';
    tab2Btn.innerHTML = `<strong>${isEn ? 'Part 2: Short Stories' : '2. del: Korte historier'}</strong> <span>${isEn ? 'Text flow in practice' : 'Tekstflow i praksis'}</span>`;

    const tab3Btn = document.createElement('button');
    tab3Btn.className = 'bestemthed-tab-btn';
    tab3Btn.innerHTML = `<strong>${isEn ? 'Part 3: Practice Yourself' : '3. del: Prøv selv'}</strong> <span>${isEn ? 'Builder & Puzzle' : 'Bygger & Puslespil'}</span>`;

    tabsContainer.appendChild(tab1Btn);
    tabsContainer.appendChild(tab2Btn);
    tabsContainer.appendChild(tab3Btn);
    viewContainer.appendChild(tabsContainer);

    // Main content panels
    const part1Container = document.createElement('div');
    part1Container.className = 'bestemthed-part-container active';

    const part2Container = document.createElement('div');
    part2Container.className = 'bestemthed-part-container';
    part2Container.style.display = 'none';

    const part3Container = document.createElement('div');
    part3Container.className = 'bestemthed-part-container';
    part3Container.style.display = 'none';

    viewContainer.appendChild(part1Container);
    viewContainer.appendChild(part2Container);
    viewContainer.appendChild(part3Container);

    function showPart(partNum) {
        tab1Btn.classList.toggle('active', partNum === 1);
        tab2Btn.classList.toggle('active', partNum === 2);
        tab3Btn.classList.toggle('active', partNum === 3);

        part1Container.style.display = partNum === 1 ? 'block' : 'none';
        part2Container.style.display = partNum === 2 ? 'block' : 'none';
        part3Container.style.display = partNum === 3 ? 'block' : 'none';
    }

    tab1Btn.onclick = () => showPart(1);
    tab2Btn.onclick = () => showPart(2);
    tab3Btn.onclick = () => showPart(3);

    // ==============================================================
    // --- 1. DEL: REGLEN & MODELLEN (FRA UKENDT TIL KENDT) ---------
    // ==============================================================
    function setupPart1() {
        const introCard = document.createElement('div');
        introCard.className = 'bestemthed-hero-card';
        introCard.innerHTML = `
            <h2>${isEn ? 'Why do we say "en kat" first and then "katten"?' : 'Hvorfor hedder det først "en kat" og bagefter "katten"?'}</h2>
            <p class="hero-desc">
                ${isEn 
                    ? 'In Danish, definiteness is not just grammar – it is how we guide attention in a conversation!<br>When we mention a person, animal, or object for the <strong>first time</strong>, the listener does not know it yet. It is <strong>unknown</strong> – therefore we use <strong>indefinite form</strong> (<em>en kat / et hus</em>).<br>Next time we mention the same entity, we both know what we are talking about. It is now <strong>known</strong> – therefore we use <strong>definite form</strong> (<em>katten / huset</em>).'
                    : 'På dansk er bestemthed ikke bare grammatik – det er en måde at styre opmærksomheden på i en samtale!<br>Når vi nævner en person, et dyr eller en ting for <strong>første gang</strong>, ved lytteren ikke hvem eller hvad det er. Det er <strong>ukendt</strong> – derfor bruger vi <strong>ubestemt form</strong> (<em>en kat / et hus</em>).<br>Næste gang vi nævner det samme emne, ved vi begge to hvad vi taler om. Det er nu <strong>kendt</strong> – derfor bruger vi <strong>bestemt form</strong> (<em>katten / huset</em>).'
                }
            </p>
        `;
        part1Container.appendChild(introCard);

        // Hero Image
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'bestemthed-image-wrapper';
        imgWrapper.innerHTML = `
            <img src="${baseUrl}kat_bestemthed_guide.jpg" alt="${isEn ? 'Danish definiteness text flow: from unknown (en kat) to known (katten)' : 'Dansk bestemthed tekstflow: fra ukendt (en kat) til kendt (katten)'}" class="hero-image">
            <div class="image-caption">
                <span>💡 <strong>${isEn ? 'Rule of thumb:' : 'Huskeregel:'}</strong></span> 
                ${isEn 
                    ? '1st time (Unknown) ➔ <strong>en kat</strong> | 2nd time (Known) ➔ <strong>katten</strong>' 
                    : '1. gang (Ukendt) ➔ <strong>en kat</strong> | 2. gang (Kendt) ➔ <strong>katten</strong>'
                }
            </div>
        `;
        part1Container.appendChild(imgWrapper);

        // 2-step Concept Cards
        const stepGrid = document.createElement('div');
        stepGrid.className = 'step-grid-2col';

        const stepItems = [
            {
                num: '1',
                title: isEn ? '1. time: Introduction (Unknown)' : '1. gang: Introduktion (Ukendt)',
                q: isEn ? 'Is the topic new to the listener?' : 'Er emnet nyt for lytteren?',
                ans: isEn ? 'Yes ➔ Use indefinite form ("en / et")' : 'Ja ➔ Brug ubestemt form ("en / et")',
                example: isEn ? 'Der sidder <strong style="color: #fbbf24;">en kat</strong> i haven.' : 'Der sidder <strong style="color: #fbbf24;">en kat</strong> i haven.',
                exampleEn: isEn ? 'There is a cat sitting in the garden.' : 'Der sidder en kat i haven.',
                grammar: isEn ? 'Substantiv (ubestemt singularis)' : 'Substantiv (ubestemt singularis)',
                colorClass: 'step-orange',
                icon: '❓'
            },
            {
                num: '2',
                title: isEn ? '2. time: Referring back (Known)' : '2. gang: Genoptagelse (Kendt)',
                q: isEn ? 'Has the topic already been introduced?' : 'Er emnet allerede introduceret?',
                ans: isEn ? 'Yes ➔ Use definite form ("-en / -et")' : 'Ja ➔ Brug bestemt form ("-en / -et")',
                example: isEn ? '<strong style="color: #34d399;">Katten</strong> kigger på en fugl.' : '<strong style="color: #34d399;">Katten</strong> kigger på en fugl.',
                exampleEn: isEn ? 'The cat looks at a bird.' : 'Katten kigger på en fugl.',
                grammar: isEn ? 'Substantiv (bestemt singularis)' : 'Substantiv (bestemt singularis)',
                colorClass: 'step-green',
                icon: '🎯'
            }
        ];

        stepItems.forEach(item => {
            const card = document.createElement('div');
            card.className = `simple-step-card ${item.colorClass}`;
            card.innerHTML = `
                <div class="step-badge">${item.num}</div>
                <div class="step-card-content">
                    <div class="step-title-row">
                        <span class="step-icon">${item.icon}</span>
                        <strong>${item.title}</strong>
                    </div>
                    <div class="step-q">${item.q}</div>
                    <div class="step-ans">${item.ans}</div>
                    <div class="step-example-box">
                        <div class="example-text">${item.example}</div>
                        <button class="listen-btn-mini" title="${isEn ? 'Listen to sentence' : 'Hør sætning'}">🔊</button>
                    </div>
                    <div class="grammar-badge">🏷️ ${item.grammar}</div>
                </div>
            `;
            const miniBtn = card.querySelector('.listen-btn-mini');
            miniBtn.onclick = () => {
                const clean = item.example.replace(/<[^>]+>/g, '');
                speakDanish(clean);
            };
            stepGrid.appendChild(card);
        });
        part1Container.appendChild(stepGrid);

        // Finished Sentence Demo Banner
        const resultBox = document.createElement('div');
        resultBox.className = 'finished-sentence-banner';
        resultBox.innerHTML = `
            <div class="banner-label">${isEn ? 'The complete text flow together:' : 'Det samlede tekstflow sammen:'}</div>
            <div class="banner-sentence">
                "Der sidder <span class="word-orange">en kat</span> i haven. <span class="word-green">Katten</span> kigger nysgerrigt på mig."
            </div>
            <button class="listen-btn" title="${isEn ? 'Listen to complete flow' : 'Hør hele sætningsforløbet'}">
                <span>🔊</span> ${isEn ? 'Listen to pronunciation' : 'Hør tekstflowet'}
            </button>
        `;
        const listenBtn = resultBox.querySelector('.listen-btn');
        listenBtn.onclick = () => speakDanish("Der sidder en kat i haven. Katten kigger nysgerrigt på mig.");
        part1Container.appendChild(resultBox);

        // Core Patterns Table
        const tableCard = document.createElement('div');
        tableCard.className = 'bestemthed-table-card';
        tableCard.innerHTML = `
            <h3>${isEn ? '📋 Overview of typical noun pairs' : '📋 Oversigt over typiske substantivpar'}</h3>
            <div class="pairs-grid">
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang</span> en kat</div>
                    <div class="pair-arrow">➔</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang</span> katten</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang</span> et hus</div>
                    <div class="pair-arrow">➔</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang</span> huset</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang</span> en bil</div>
                    <div class="pair-arrow">➔</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang</span> bilen</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang</span> et æble</div>
                    <div class="pair-arrow">➔</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang</span> æblet</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang</span> en cykel</div>
                    <div class="pair-arrow">➔</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang</span> cyklen</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang</span> nogle børn</div>
                    <div class="pair-arrow">➔</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang</span> børnene</div>
                </div>
            </div>
        `;
        part1Container.appendChild(tableCard);
    }

    // ==============================================================
    // --- 2. DEL: KORTE HISTORIER (TEKSTFLOW I PRAKSIS) ------------
    // ==============================================================
    function setupPart2() {
        const storiesData = [
            {
                id: 'kat_have',
                title: 'Historie 1: Katten i haven',
                titleEn: 'Story 1: The Cat in the Garden',
                icon: '🐱',
                lines: [
                    {
                        pre: 'I morges kiggede Peter ud af vinduet og så ',
                        options: ['en kat', 'katten'],
                        correct: 'en kat',
                        post: ' i haven.',
                        rule: isEn ? 'First time introduced ➔ Unknown to listener ➔ Indefinite ("en kat")' : 'Første gang emnet introduceres ➔ Ukendt for lytteren ➔ Ubestemt form ("en kat")'
                    },
                    {
                        pre: '',
                        options: ['En kat', 'Katten'],
                        correct: 'Katten',
                        post: ' listede forsigtigt rundt mellem buskene.',
                        rule: isEn ? 'Mentioned again ➔ Now known to both ➔ Definite ("Katten")' : 'Nævnt igen ➔ Nu er den kendt for os begge ➔ Bestemt form ("Katten")'
                    },
                    {
                        pre: 'Pludselig stoppede ',
                        options: ['en kat', 'katten'],
                        correct: 'katten',
                        post: ' op og fik øje på en mus.',
                        rule: isEn ? 'Still the same known cat ➔ Definite form ("katten")' : 'Stadig den samme kendte kat ➔ Bestemt form ("katten")'
                    }
                ],
                fullSentence: 'I morges kiggede Peter ud af vinduet og så en kat i haven. Katten listede forsigtigt rundt mellem buskene. Pludselig stoppede katten op og fik øje på en mus.'
            },
            {
                id: 'ny_cykel',
                title: 'Historie 2: Den nye cykel',
                titleEn: 'Story 2: The New Bicycle',
                icon: '🚲',
                lines: [
                    {
                        pre: 'Sofie har lige købt ',
                        options: ['en cykel', 'cyklen'],
                        correct: 'en cykel',
                        post: ' for at cykle i skole.',
                        rule: isEn ? 'New item introduced ➔ Indefinite ("en cykel")' : 'Nyt emne introduceres ➔ Ubestemt form ("en cykel")'
                    },
                    {
                        pre: '',
                        options: ['En cykel', 'Cyklen'],
                        correct: 'Cyklen',
                        post: ' er lysegrøn og har syv gear.',
                        rule: isEn ? 'Referred back to ➔ Known item ➔ Definite ("Cyklen")' : 'Genoptaget ➔ Kendt emne ➔ Bestemt form ("Cyklen")'
                    },
                    {
                        pre: 'Hver morgen låser hun ',
                        options: ['en cykel', 'cyklen'],
                        correct: 'cyklen',
                        post: ' op med sin nøgle.',
                        rule: isEn ? 'Known bike ➔ Definite form ("cyklen")' : 'Kendt cykel ➔ Bestemt form ("cyklen")'
                    }
                ],
                fullSentence: 'Sofie har lige købt en cykel for at cykle i skole. Cyklen er lysegrøn og har syv gear. Hver morgen låser hun cyklen op med sin nøgle.'
            },
            {
                id: 'kaffe_cafe',
                title: 'Historie 3: En kop kaffe på caféen',
                titleEn: 'Story 3: A Cup of Coffee at the Café',
                icon: '☕',
                lines: [
                    {
                        pre: 'Morten sætter sig ved bordet og bestiller ',
                        options: ['en kop', 'koppen'],
                        correct: 'en kop',
                        post: ' kaffe.',
                        rule: isEn ? 'First order ➔ Unknown cup ➔ Indefinite ("en kop")' : 'Første bestilling ➔ Ukendt kop ➔ Ubestemt form ("en kop")'
                    },
                    {
                        pre: '',
                        options: ['En kop', 'Koppen'],
                        correct: 'Koppen',
                        post: ' er helt varm, og kaffen dufter dejligt.',
                        rule: isEn ? 'Referred to again ➔ Known cup ➔ Definite ("Koppen")' : 'Omtales igen ➔ Kendt kop ➔ Bestemt form ("Koppen")'
                    },
                    {
                        pre: 'Han drikker ',
                        options: ['en kaffe', 'kaffen'],
                        correct: 'kaffen',
                        post: ' langsomt, mens han læser avis.',
                        rule: isEn ? 'Known coffee ➔ Definite form ("kaffen")' : 'Den kendte kaffe ➔ Bestemt form ("kaffen")'
                    }
                ],
                fullSentence: 'Morten sætter sig ved bordet og bestiller en kop kaffe. Koppen er helt varm, og kaffen dufter dejligt. Han drikker kaffen langsomt, mens han læser avis.'
            },
            {
                id: 'hus_skov',
                title: 'Historie 4: Huset ved skoven',
                titleEn: 'Story 4: The House by the Forest',
                icon: '🏡',
                lines: [
                    {
                        pre: 'På vores gåtur kom vi forbi ',
                        options: ['et hus', 'huset'],
                        correct: 'et hus',
                        post: ' ude i skoven.',
                        rule: isEn ? 'New object spotted ➔ Indefinite ("et hus")' : 'Nyt syn for første gang ➔ Ubestemt form ("et hus")'
                    },
                    {
                        pre: '',
                        options: ['Et hus', 'Huset'],
                        correct: 'Huset',
                        post: ' havde en rød dør og hvide vinduer.',
                        rule: isEn ? 'Known house ➔ Definite ("Huset")' : 'Kendt hus ➔ Bestemt form ("Huset")'
                    },
                    {
                        pre: 'Rundt om ',
                        options: ['et hus', 'huset'],
                        correct: 'huset',
                        post: ' voksede der vilde blomster.',
                        rule: isEn ? 'Known house ➔ Definite ("huset")' : 'Stadig det samme kendte hus ➔ Bestemt form ("huset")'
                    }
                ],
                fullSentence: 'På vores gåtur kom vi forbi et hus ude i skoven. Huset havde en rød dør og hvide vinduer. Rundt om huset voksede der vilde blomster.'
            },
            {
                id: 'brev_postkasse',
                title: 'Historie 5: Brevet i postkassen',
                titleEn: 'Story 5: The Letter in the Mailbox',
                icon: '✉️',
                lines: [
                    {
                        pre: 'I eftermiddags fandt Lars ',
                        options: ['et brev', 'brevet'],
                        correct: 'et brev',
                        post: ' i postkassen.',
                        rule: isEn ? 'New item found ➔ Indefinite ("et brev")' : 'Nyt brev fundet ➔ Ubestemt form ("et brev")'
                    },
                    {
                        pre: 'Han åbnede forsigtigt ',
                        options: ['et brev', 'brevet'],
                        correct: 'brevet',
                        post: ' med en lille kniv.',
                        rule: isEn ? 'Now known item ➔ Definite ("brevet")' : 'Kendt brev ➔ Bestemt form ("brevet")'
                    },
                    {
                        pre: '',
                        options: ['Et brev', 'Brevet'],
                        correct: 'Brevet',
                        post: ' indeholdt en fin hilsen fra hans ven.',
                        rule: isEn ? 'Known letter ➔ Definite ("Brevet")' : 'Kendt brev ➔ Bestemt form ("Brevet")'
                    }
                ],
                fullSentence: 'I eftermiddags fandt Lars et brev i postkassen. Han åbnede forsigtigt brevet med en lille kniv. Brevet indeholdt en fin hilsen fra hans ven.'
            }
        ];

        let currentStoryIdx = 0;
        const userSelections = {};

        const storyHeader = document.createElement('div');
        storyHeader.className = 'bestemthed-hero-card';
        storyHeader.innerHTML = `
            <h2>${isEn ? 'Short stories: Experience how the text flows' : 'Korte historier: Oplev hvordan teksten flyder'}</h2>
            <p class="hero-desc">
                ${isEn
                    ? 'In real Danish speech and writing, we constantly connect sentences. Choose the right form for each sentence depending on whether the entity is introduced (unknown) or continued (known).'
                    : 'I rigtige danske tekster og samtaler bygger vi bro mellem sætningerne. Vælg den rigtige form i hver linje alt efter om emnet introduceres (ukendt) eller fortsætter (kendt).'
                }
            </p>
        `;
        part2Container.appendChild(storyHeader);

        // Story Pill Navigator
        const pillNav = document.createElement('div');
        pillNav.className = 'story-pill-nav';
        part2Container.appendChild(pillNav);

        const storyCard = document.createElement('div');
        storyCard.className = 'story-interactive-card';
        part2Container.appendChild(storyCard);

        function renderStoryNavigator() {
            pillNav.innerHTML = '';
            storiesData.forEach((st, idx) => {
                const pill = document.createElement('button');
                pill.className = `story-pill-btn ${idx === currentStoryIdx ? 'active' : ''}`;
                const isFinished = userSelections[idx] && userSelections[idx].every(val => val.isCorrect);
                if (isFinished) pill.classList.add('completed');
                pill.innerHTML = `<span>${st.icon}</span> <span>${idx + 1}</span>`;
                pill.onclick = () => {
                    currentStoryIdx = idx;
                    renderStoryNavigator();
                    renderCurrentStory();
                };
                pillNav.appendChild(pill);
            });
        }

        function renderCurrentStory() {
            const st = storiesData[currentStoryIdx];
            if (!userSelections[currentStoryIdx]) {
                userSelections[currentStoryIdx] = st.lines.map(() => ({ val: '', isCorrect: false }));
            }

            storyCard.innerHTML = `
                <div class="story-title-row">
                    <h3>${isEn ? st.titleEn : st.title}</h3>
                    <span class="story-counter">${isEn ? `Story ${currentStoryIdx + 1} of ${storiesData.length}` : `Historie ${currentStoryIdx + 1} af ${storiesData.length}`}</span>
                </div>
                <div class="story-lines-container"></div>
                <div class="story-feedback-area"></div>
                <div class="story-actions-row"></div>
            `;

            const linesContainer = storyCard.querySelector('.story-lines-container');
            const feedbackArea = storyCard.querySelector('.story-feedback-area');
            const actionsRow = storyCard.querySelector('.story-actions-row');

            st.lines.forEach((line, lineIdx) => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'story-line-row';

                const state = userSelections[currentStoryIdx][lineIdx];

                const preSpan = document.createElement('span');
                preSpan.textContent = line.pre;
                lineDiv.appendChild(preSpan);

                const selectWrap = document.createElement('span');
                selectWrap.className = 'inline-choice-group';

                line.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'choice-chip';
                    btn.textContent = opt;
                    if (state.val === opt) {
                        btn.classList.add(state.isCorrect ? 'correct' : 'wrong');
                    }

                    btn.onclick = () => {
                        const isCorrect = opt === line.correct;
                        userSelections[currentStoryIdx][lineIdx] = { val: opt, isCorrect };
                        renderCurrentStory();
                        renderStoryNavigator();
                    };
                    selectWrap.appendChild(btn);
                });
                lineDiv.appendChild(selectWrap);

                const postSpan = document.createElement('span');
                postSpan.textContent = line.post;
                lineDiv.appendChild(postSpan);

                // Inline rule hint if answered
                if (state.val) {
                    const ruleBadge = document.createElement('div');
                    ruleBadge.className = `rule-explanation ${state.isCorrect ? 'rule-correct' : 'rule-wrong'}`;
                    ruleBadge.innerHTML = state.isCorrect 
                        ? `✅ <strong>${isEn ? 'Correct!' : 'Rigtigt!'}</strong> ${line.rule}`
                        : `❌ <strong>${isEn ? 'Try again:' : 'Prøv igen:'}</strong> ${isEn ? 'Think about whether the item is new (unknown) or already mentioned (known).' : 'Tænk over om emnet er nyt (ukendt) eller allerede nævnt (kendt).'}`;
                    lineDiv.appendChild(ruleBadge);
                }

                linesContainer.appendChild(lineDiv);
            });

            // Check if all lines in this story are correct
            const allCorrect = userSelections[currentStoryIdx].every(item => item.isCorrect);

            if (allCorrect) {
                feedbackArea.innerHTML = `
                    <div class="story-success-banner">
                        🎉 <strong>${isEn ? 'Well done!' : 'Flot klaret!'}</strong> ${isEn ? 'You correctly built the text flow from introduction to recognition.' : 'Du forstod tekstflowet fra introduktion til genkendelse.'}
                    </div>
                `;

                actionsRow.innerHTML = `
                    <button class="listen-btn" id="listen-story-btn">
                        <span>🔊</span> ${isEn ? 'Listen to full story' : 'Hør hele historien'}
                    </button>
                    ${currentStoryIdx < storiesData.length - 1 ? `
                        <button class="next-task-btn" id="next-story-btn">
                            ${isEn ? 'Next story ➔' : 'Næste historie ➔'}
                        </button>
                    ` : `
                        <button class="next-task-btn" id="finish-stories-btn">
                            ${isEn ? 'Try Practice Exercises ➔' : 'Gå til Prøv selv ➔'}
                        </button>
                    `}
                `;

                actionsRow.querySelector('#listen-story-btn').onclick = () => speakDanish(st.fullSentence);

                const nextBtn = actionsRow.querySelector('#next-story-btn');
                if (nextBtn) {
                    nextBtn.onclick = () => {
                        currentStoryIdx++;
                        renderStoryNavigator();
                        renderCurrentStory();
                    };
                }

                const finishBtn = actionsRow.querySelector('#finish-stories-btn');
                if (finishBtn) {
                    finishBtn.onclick = () => showPart(3);
                }
            }
        }

        renderStoryNavigator();
        renderCurrentStory();
    }

    // ==============================================================
    // --- 3. DEL: PRØV SELV (BYGGER & PUSLESPIL) --------------------
    // ==============================================================
    function setupPart3() {
        const tryHeader = document.createElement('div');
        tryHeader.className = 'bestemthed-hero-card';
        tryHeader.innerHTML = `
            <h2>${isEn ? 'Practice yourself: Sentence Builder & Word Puzzle' : 'Prøv selv: Sætningsbygger & Puslespil'}</h2>
            <p class="hero-desc">
                ${isEn
                    ? 'Create your own sentence pairs or assemble puzzle tiles in the correct discourse order.'
                    : 'Skab dine egne sætningspar eller saml puslespilsbrikker i den rigtige rækkefølge.'
                }
            </p>
        `;
        part3Container.appendChild(tryHeader);

        // Sub-tabs: 1) Sætningsbygger 2) Puslespil
        const exerciseTabs = document.createElement('div');
        exerciseTabs.className = 'exercise-sub-tabs';

        const ex1TabBtn = document.createElement('button');
        ex1TabBtn.className = 'ex-sub-tab active';
        ex1TabBtn.textContent = isEn ? 'Step-by-step Builder' : 'Trin-for-trin bygger';

        const ex2TabBtn = document.createElement('button');
        ex2TabBtn.className = 'ex-sub-tab';
        ex2TabBtn.textContent = isEn ? 'Puzzle: Correct Order' : 'Puslespil: Rigtig rækkefølge';

        exerciseTabs.appendChild(ex1TabBtn);
        exerciseTabs.appendChild(ex2TabBtn);
        part3Container.appendChild(exerciseTabs);

        const builderContainer = document.createElement('div');
        builderContainer.className = 'exercise-panel active';

        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'exercise-panel';
        puzzleContainer.style.display = 'none';

        part3Container.appendChild(builderContainer);
        part3Container.appendChild(puzzleContainer);

        ex1TabBtn.onclick = () => {
            ex1TabBtn.classList.add('active');
            ex2TabBtn.classList.remove('active');
            builderContainer.style.display = 'block';
            puzzleContainer.style.display = 'none';
        };

        ex2TabBtn.onclick = () => {
            ex2TabBtn.classList.add('active');
            ex1TabBtn.classList.remove('active');
            puzzleContainer.style.display = 'block';
            builderContainer.style.display = 'none';
        };

        // --- SUB-EXERCISE 1: STEP-BY-STEP BUILDER ---
        setupStepBuilder(builderContainer);

        // --- SUB-EXERCISE 2: PUZZLE ---
        setupPuzzleExercise(puzzleContainer);
    }

    // Step-by-Step Discourse Builder
    function setupStepBuilder(container) {
        const nounPresets = [
            { ubestemt: 'en kat', bestemt: 'Katten', icon: '🐱', follow: 'er meget legesyg' },
            { ubestemt: 'en hund', bestemt: 'Hunden', icon: '🐶', follow: 'logrer med halen' },
            { ubestemt: 'en bil', bestemt: 'Bilen', icon: '🚗', follow: 'kører lynhurtigt' },
            { ubestemt: 'et hus', bestemt: 'Huset', icon: '🏡', follow: 'har en kæmpe have' },
            { ubestemt: 'et æble', bestemt: 'Æblet', icon: '🍎', follow: 'smager utrolig sødt' },
            { ubestemt: 'en cykel', bestemt: 'Cyklen', icon: '🚲', follow: 'står låst foran døren' }
        ];

        const intros = [
            { text: 'Jeg har set', pre: 'Jeg har set' },
            { text: 'Der holder', pre: 'Der holder' },
            { text: 'Vi købte', pre: 'Vi købte' },
            { text: 'Han fandt', pre: 'Han fandt' }
        ];

        let selectedIntro = intros[0].pre;
        let selectedNoun = nounPresets[0];

        const builderWrapper = document.createElement('div');
        builderWrapper.className = 'builder-card';

        function updateBuilderUI() {
            builderWrapper.innerHTML = `
                <div class="builder-section">
                    <h4>1. ${isEn ? 'Choose an introduction sentence (1st time ➔ Indefinite):' : 'Vælg en introduktion (1. gang ➔ Ubestemt form):'}</h4>
                    <div class="builder-chips-row" id="intro-chips"></div>
                </div>

                <div class="builder-section">
                    <h4>2. ${isEn ? 'Choose a noun to introduce:' : 'Vælg et emne der skal introduceres:'}</h4>
                    <div class="builder-chips-row" id="noun-chips"></div>
                </div>

                <div class="builder-live-display">
                    <div class="display-label">${isEn ? 'Your constructed text flow:' : 'Dit samlede tekstflow i praksis:'}</div>
                    <div class="display-sentence">
                        "${selectedIntro} <span class="word-orange">${selectedNoun.ubestemt}</span>. <span class="word-green">${selectedNoun.bestemt}</span> ${selectedNoun.follow}."
                    </div>
                    <div class="display-flow-notes">
                        <span class="note-pill orange">1. gang: <strong>${selectedNoun.ubestemt}</strong> (ukendt)</span>
                        <span class="note-arrow">➔</span>
                        <span class="note-pill green">2. gang: <strong>${selectedNoun.bestemt}</strong> (kendt)</span>
                    </div>
                    <button class="listen-btn" id="builder-listen-btn">
                        <span>🔊</span> ${isEn ? 'Listen to sentence pair' : 'Hør sætningsparret'}
                    </button>
                </div>
            `;

            const introRow = builderWrapper.querySelector('#intro-chips');
            intros.forEach(item => {
                const btn = document.createElement('button');
                btn.className = `choice-chip ${item.pre === selectedIntro ? 'selected' : ''}`;
                btn.textContent = item.text;
                btn.onclick = () => {
                    selectedIntro = item.pre;
                    updateBuilderUI();
                };
                introRow.appendChild(btn);
            });

            const nounRow = builderWrapper.querySelector('#noun-chips');
            nounPresets.forEach(item => {
                const btn = document.createElement('button');
                btn.className = `choice-chip ${item.ubestemt === selectedNoun.ubestemt ? 'selected' : ''}`;
                btn.innerHTML = `${item.icon} ${item.ubestemt}`;
                btn.onclick = () => {
                    selectedNoun = item;
                    updateBuilderUI();
                };
                nounRow.appendChild(btn);
            });

            builderWrapper.querySelector('#builder-listen-btn').onclick = () => {
                const text = `${selectedIntro} ${selectedNoun.ubestemt}. ${selectedNoun.bestemt} ${selectedNoun.follow}.`;
                speakDanish(text);
            };
        }

        updateBuilderUI();
        container.appendChild(builderWrapper);
    }

    // Puzzle Exercise (Ordering)
    function setupPuzzleExercise(container) {
        const puzzleTasks = [
            {
                prompt: isEn ? 'Assemble the text flow: From unknown to known' : 'Saml tekstflowet: Fra ukendt til kendt',
                scrambled: ['i haven.', 'Katten', 'en kat', 'Der sidder', 'er', 'meget sød.'],
                correct: ['Der sidder', 'en kat', 'i haven.', 'Katten', 'er', 'meget sød.']
            },
            {
                prompt: isEn ? 'Assemble the text flow: The red car' : 'Saml tekstflowet: Den røde bil',
                scrambled: ['Bilen', 'en bil.', 'Vi så', 'er', 'helt rød.'],
                correct: ['Vi så', 'en bil.', 'Bilen', 'er', 'helt rød.']
            },
            {
                prompt: isEn ? 'Assemble the text flow: The delicious apple' : 'Saml tekstflowet: Det lækre æble',
                scrambled: ['Æblet', 'spiser', 'Han', 'et æble.', 'smager godt.'],
                correct: ['Han', 'spiser', 'et æble.', 'Æblet', 'smager godt.']
            },
            {
                prompt: isEn ? 'Assemble the text flow: The fast bicycle' : 'Saml tekstflowet: Den hurtige cykel',
                scrambled: ['Cyklen', 'har lånt', 'Mette', 'kører hurtigt.', 'en cykel.'],
                correct: ['Mette', 'har lånt', 'en cykel.', 'Cyklen', 'kører hurtigt.']
            }
        ];

        let currentPuzzleIdx = 0;
        let userSlots = [];
        const completedPuzzles = new Set();

        const puzzleWrapper = document.createElement('div');
        puzzleWrapper.className = 'puzzle-exercise-wrapper';

        function renderPuzzle() {
            const task = puzzleTasks[currentPuzzleIdx];
            userSlots = new Array(task.correct.length).fill(null);

            puzzleWrapper.innerHTML = `
                <div class="puzzle-header">
                    <h4>${task.prompt}</h4>
                    <span class="puzzle-counter">${isEn ? `Task ${currentPuzzleIdx + 1} of ${puzzleTasks.length}` : `Opgave ${currentPuzzleIdx + 1} af ${puzzleTasks.length}`}</span>
                </div>
                <div class="puzzle-pills-row" id="puzzle-pills"></div>
                <div class="puzzle-slots-container" id="puzzle-slots"></div>
                <div class="puzzle-words-bank" id="puzzle-bank"></div>
                <div class="puzzle-feedback-area" id="puzzle-feedback"></div>
            `;

            const pillsRow = puzzleWrapper.querySelector('#puzzle-pills');
            puzzleTasks.forEach((_, idx) => {
                const pill = document.createElement('button');
                pill.className = `puzzle-pill ${idx === currentPuzzleIdx ? 'active' : ''} ${completedPuzzles.has(idx) ? 'completed' : ''}`;
                pill.textContent = `${idx + 1}`;
                pill.onclick = () => {
                    currentPuzzleIdx = idx;
                    renderPuzzle();
                };
                pillsRow.appendChild(pill);
            });

            updateSlotsAndBank();
        }

        function updateSlotsAndBank() {
            const task = puzzleTasks[currentPuzzleIdx];
            const slotsContainer = puzzleWrapper.querySelector('#puzzle-slots');
            const bankContainer = puzzleWrapper.querySelector('#puzzle-bank');
            const feedbackBox = puzzleWrapper.querySelector('#puzzle-feedback');

            slotsContainer.innerHTML = '';
            userSlots.forEach((word, slotIdx) => {
                const slot = document.createElement('div');
                slot.className = `puzzle-slot ${word ? 'filled' : 'empty'}`;
                slot.textContent = word || `${slotIdx + 1}`;

                if (word) {
                    slot.title = isEn ? 'Click to remove' : 'Klik for at fjerne';
                    slot.onclick = () => {
                        userSlots[slotIdx] = null;
                        feedbackBox.innerHTML = '';
                        updateSlotsAndBank();
                    };
                }
                slotsContainer.appendChild(slot);
            });

            bankContainer.innerHTML = '';
            task.scrambled.forEach(word => {
                const isPlaced = userSlots.includes(word);
                const btn = document.createElement('button');
                btn.className = `puzzle-word-btn ${isPlaced ? 'placed' : ''}`;
                btn.textContent = word;
                btn.disabled = isPlaced;

                btn.onclick = () => {
                    const emptyIdx = userSlots.indexOf(null);
                    if (emptyIdx !== -1) {
                        userSlots[emptyIdx] = word;
                        updateSlotsAndBank();
                        checkPuzzleAnswer();
                    }
                };
                bankContainer.appendChild(btn);
            });
        }

        function checkPuzzleAnswer() {
            const task = puzzleTasks[currentPuzzleIdx];
            const feedbackBox = puzzleWrapper.querySelector('#puzzle-feedback');

            if (userSlots.includes(null)) {
                feedbackBox.innerHTML = '';
                return;
            }

            const isCorrect = userSlots.every((w, i) => w === task.correct[i]);
            const sentence = userSlots.join(' ');

            if (isCorrect) {
                completedPuzzles.add(currentPuzzleIdx);
                const pills = puzzleWrapper.querySelectorAll('.puzzle-pill');
                if (pills[currentPuzzleIdx]) pills[currentPuzzleIdx].classList.add('completed');

                feedbackBox.innerHTML = `
                    <div class="feedback-msg success">
                        🎉 <strong>${isEn ? 'Correct!' : 'Rigtigt!'}</strong> "${sentence}"
                    </div>
                    <div class="puzzle-action-row">
                        <button class="listen-btn-small" id="puzzle-listen-btn">🔊 ${isEn ? 'Listen' : 'Hør udtale'}</button>
                        <button class="next-task-btn" id="puzzle-next-btn">
                            ${currentPuzzleIdx < puzzleTasks.length - 1 ? (isEn ? 'Next task ➔' : 'Næste opgave ➔') : (isEn ? 'Start over 🔄' : 'Start forfra 🔄')}
                        </button>
                    </div>
                `;

                feedbackBox.querySelector('#puzzle-listen-btn').onclick = () => speakDanish(sentence);
                feedbackBox.querySelector('#puzzle-next-btn').onclick = () => {
                    currentPuzzleIdx = (currentPuzzleIdx + 1) % puzzleTasks.length;
                    renderPuzzle();
                };
            } else {
                feedbackBox.innerHTML = `
                    <div class="feedback-msg error">
                        Ikke helt rigtigt endnu. Husk rækkefølgen: Først introduceres emnet (ubestemt) ➔ derefter omtales det kendte emne (bestemt)!
                    </div>
                    <button class="retry-task-btn" id="puzzle-retry-btn">${isEn ? 'Try again 🔄' : 'Prøv igen 🔄'}</button>
                `;
                feedbackBox.querySelector('#puzzle-retry-btn').onclick = () => {
                    userSlots = new Array(task.correct.length).fill(null);
                    feedbackBox.innerHTML = '';
                    updateSlotsAndBank();
                };
            }
        }

        renderPuzzle();
        container.appendChild(puzzleWrapper);
    }

    // Setup all 3 parts
    setupPart1();
    setupPart2();
    setupPart3();

    container.appendChild(viewContainer);

    // Inject dedicated styles
    if (!document.getElementById('bestemthed-intro-styles')) {
        const styles = document.createElement('style');
        styles.id = 'bestemthed-intro-styles';
        styles.textContent = `
            /* Bestemthed View Styling */
            .bestemthed-view {
                max-width: 950px;
                margin: 0 auto;
                padding: 1.5rem 1rem 3rem 1rem;
            }

            .bestemthed-grammar-banner {
                display: flex;
                flex-wrap: wrap;
                gap: 1.2rem;
                justify-content: center;
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(255, 255, 255, 0.12);
                padding: 0.8rem 1.4rem;
                border-radius: 14px;
                margin-bottom: 1.5rem;
            }

            .grammar-system-item {
                display: inline-flex;
                align-items: center;
                font-size: 0.95rem;
                color: #e2e8f0;
            }

            .grammar-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 0.5rem;
            }

            /* Tabs Nav */
            .bestemthed-tabs-nav {
                display: flex;
                gap: 0.75rem;
                margin: 1rem 0 2rem 0;
                background: rgba(0, 0, 0, 0.25);
                padding: 0.4rem;
                border-radius: 14px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .bestemthed-tab-btn {
                flex: 1;
                background: transparent;
                border: none;
                color: #94a3b8;
                padding: 0.85rem 1rem;
                border-radius: 10px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                transition: all 0.25s ease;
            }

            .bestemthed-tab-btn strong {
                font-size: 1.1rem;
                color: #e2e8f0;
            }

            .bestemthed-tab-btn span {
                font-size: 0.82rem;
                opacity: 0.8;
            }

            .bestemthed-tab-btn:hover {
                background: rgba(255, 255, 255, 0.06);
                color: #fff;
            }

            .bestemthed-tab-btn.active {
                background: #10b981;
                color: #fff;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);
            }

            .bestemthed-tab-btn.active strong {
                color: #fff;
            }

            /* Hero Card */
            .bestemthed-hero-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.6rem 2rem;
                margin-bottom: 1.5rem;
                text-align: center;
            }

            .bestemthed-hero-card h2 {
                margin: 0 0 0.8rem 0;
                color: #fbbf24;
                font-size: 1.6rem;
                font-weight: 700;
            }

            .bestemthed-hero-card .hero-desc {
                font-size: 1.1rem;
                line-height: 1.65;
                color: #cbd5e1;
                margin: 0;
            }

            /* Image Wrapper */
            .bestemthed-image-wrapper {
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 0.8rem;
                margin-bottom: 2rem;
                text-align: center;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            }

            .bestemthed-image-wrapper .hero-image {
                width: 100%;
                height: auto;
                border-radius: 12px;
                display: block;
            }

            .bestemthed-image-wrapper .image-caption {
                margin-top: 0.8rem;
                font-size: 1.05rem;
                color: #cbd5e1;
            }

            /* Step Cards Grid */
            .step-grid-2col {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 1.2rem;
                margin-bottom: 2rem;
            }

            .simple-step-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.5rem;
                position: relative;
                transition: transform 0.2s, box-shadow 0.2s;
            }

            .simple-step-card:hover {
                transform: translateY(-2px);
            }

            .simple-step-card.step-orange {
                border-top: 4px solid #f59e0b;
                background: linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
            }

            .simple-step-card.step-green {
                border-top: 4px solid #10b981;
                background: linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
            }

            .step-badge {
                position: absolute;
                top: -12px;
                right: 20px;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: 1rem;
                color: #fff;
            }

            .step-orange .step-badge {
                background: #f59e0b;
                box-shadow: 0 2px 8px rgba(245, 158, 11, 0.5);
            }

            .step-green .step-badge {
                background: #10b981;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
            }

            .step-title-row {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.15rem;
                margin-bottom: 0.6rem;
            }

            .step-orange .step-title-row strong {
                color: #fbbf24;
            }

            .step-green .step-title-row strong {
                color: #34d399;
            }

            .step-q {
                font-size: 1rem;
                color: #94a3b8;
                margin-bottom: 0.4rem;
            }

            .step-ans {
                font-size: 1.1rem;
                font-weight: 600;
                color: #e2e8f0;
                margin-bottom: 1rem;
            }

            .step-example-box {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 0.8rem 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.8rem;
            }

            .step-example-box .example-text {
                font-size: 1.15rem;
                color: #fff;
            }

            .listen-btn-mini {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 8px;
                color: #fff;
                padding: 0.4rem 0.6rem;
                cursor: pointer;
                font-size: 1rem;
                transition: background 0.2s;
            }

            .listen-btn-mini:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .grammar-badge {
                font-size: 0.85rem;
                color: #94a3b8;
            }

            /* Finished Sentence Banner */
            .finished-sentence-banner {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 16px;
                padding: 1.6rem 2rem;
                text-align: center;
                margin-bottom: 2rem;
            }

            .banner-label {
                font-size: 1rem;
                color: #cbd5e1;
                margin-bottom: 0.6rem;
            }

            .banner-sentence {
                font-size: 1.4rem;
                font-weight: 700;
                color: #fff;
                margin-bottom: 1.2rem;
                line-height: 1.5;
            }

            .word-orange {
                color: #fbbf24;
                text-decoration: underline;
                text-underline-offset: 4px;
            }

            .word-green {
                color: #34d399;
                text-decoration: underline;
                text-underline-offset: 4px;
            }

            .listen-btn {
                background: #10b981;
                color: #fff;
                border: none;
                padding: 0.75rem 1.6rem;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
                transition: all 0.2s;
            }

            .listen-btn:hover {
                background: #059669;
                transform: translateY(-1px);
            }

            /* Table Card */
            .bestemthed-table-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.5rem;
                margin-bottom: 2rem;
            }

            .bestemthed-table-card h3 {
                margin: 0 0 1rem 0;
                color: #e2e8f0;
                font-size: 1.25rem;
            }

            .pairs-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 0.8rem;
            }

            .pair-item {
                background: rgba(0, 0, 0, 0.25);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 0.8rem 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .pair-ubestemt {
                color: #fbbf24;
                font-weight: 600;
            }

            .pair-bestemt {
                color: #34d399;
                font-weight: 600;
            }

            .pair-arrow {
                color: #94a3b8;
                font-size: 1rem;
            }

            .badge-tag {
                font-size: 0.7rem;
                padding: 2px 6px;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                margin-right: 0.3rem;
            }

            /* Stories (Part 2) */
            .story-pill-nav {
                display: flex;
                gap: 0.6rem;
                justify-content: center;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }

            .story-pill-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 20px;
                padding: 0.5rem 1rem;
                color: #cbd5e1;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.95rem;
                font-weight: 600;
                transition: all 0.2s;
            }

            .story-pill-btn:hover {
                background: rgba(255, 255, 255, 0.12);
                color: #fff;
            }

            .story-pill-btn.active {
                background: #10b981;
                color: #fff;
                border-color: #10b981;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
            }

            .story-pill-btn.completed:not(.active) {
                background: rgba(16, 185, 129, 0.2);
                border-color: #10b981;
                color: #34d399;
            }

            .story-interactive-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 2rem;
                margin-bottom: 2rem;
            }

            .story-title-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 0.8rem;
            }

            .story-title-row h3 {
                margin: 0;
                color: #fbbf24;
                font-size: 1.3rem;
            }

            .story-counter {
                font-size: 0.9rem;
                color: #94a3b8;
            }

            .story-line-row {
                font-size: 1.25rem;
                line-height: 2.1;
                color: #e2e8f0;
                margin-bottom: 1.4rem;
            }

            .inline-choice-group {
                display: inline-flex;
                gap: 0.4rem;
                vertical-align: middle;
                margin: 0 0.3rem;
            }

            .choice-chip {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 0.3rem 0.8rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .choice-chip:hover {
                background: rgba(255, 255, 255, 0.18);
            }

            .choice-chip.correct {
                background: #10b981;
                border-color: #34d399;
                color: #fff;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
            }

            .choice-chip.wrong {
                background: #ef4444;
                border-color: #f87171;
                color: #fff;
            }

            .choice-chip.selected {
                background: #10b981;
                border-color: #34d399;
                color: #fff;
            }

            .rule-explanation {
                font-size: 0.95rem;
                line-height: 1.4;
                padding: 0.5rem 0.9rem;
                border-radius: 8px;
                margin-top: 0.4rem;
                display: block;
            }

            .rule-correct {
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.3);
                color: #34d399;
            }

            .rule-wrong {
                background: rgba(239, 68, 68, 0.15);
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: #fca5a5;
            }

            .story-success-banner {
                background: rgba(16, 185, 129, 0.2);
                border: 1px solid #10b981;
                color: #34d399;
                padding: 1rem 1.4rem;
                border-radius: 12px;
                font-size: 1.15rem;
                text-align: center;
                margin-top: 1.5rem;
            }

            .story-actions-row {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 1.5rem;
                flex-wrap: wrap;
            }

            .next-task-btn {
                background: #f59e0b;
                color: #fff;
                border: none;
                padding: 0.75rem 1.6rem;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
                transition: all 0.2s;
            }

            .next-task-btn:hover {
                background: #d97706;
                transform: translateY(-1px);
            }

            /* Exercise Sub-Tabs (Part 3) */
            .exercise-sub-tabs {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                margin-bottom: 1.5rem;
            }

            .ex-sub-tab {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 10px;
                padding: 0.6rem 1.2rem;
                color: #cbd5e1;
                cursor: pointer;
                font-size: 1.05rem;
                font-weight: 600;
                transition: all 0.2s;
            }

            .ex-sub-tab.active {
                background: #10b981;
                color: #fff;
                border-color: #10b981;
            }

            /* Builder (Part 3 Sub-tab 1) */
            .builder-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.8rem;
                margin-bottom: 2rem;
            }

            .builder-section {
                margin-bottom: 1.4rem;
            }

            .builder-section h4 {
                margin: 0 0 0.6rem 0;
                color: #fbbf24;
                font-size: 1.15rem;
            }

            .builder-chips-row {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
            }

            .builder-live-display {
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 14px;
                padding: 1.6rem;
                text-align: center;
                margin-top: 1.8rem;
            }

            .display-label {
                font-size: 0.95rem;
                color: #94a3b8;
                margin-bottom: 0.6rem;
            }

            .display-sentence {
                font-size: 1.4rem;
                font-weight: 700;
                color: #fff;
                margin-bottom: 1rem;
                line-height: 1.6;
            }

            .display-flow-notes {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.8rem;
                margin-bottom: 1.2rem;
                flex-wrap: wrap;
            }

            .note-pill {
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.9rem;
            }

            .note-pill.orange {
                background: rgba(245, 158, 11, 0.2);
                color: #fbbf24;
                border: 1px solid rgba(245, 158, 11, 0.4);
            }

            .note-pill.green {
                background: rgba(16, 185, 129, 0.2);
                color: #34d399;
                border: 1px solid rgba(16, 185, 129, 0.4);
            }

            .note-arrow {
                color: #94a3b8;
                font-size: 1.2rem;
            }

            /* Puzzle (Part 3 Sub-tab 2) */
            .puzzle-exercise-wrapper {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.8rem;
                margin-bottom: 2rem;
            }

            .puzzle-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.2rem;
            }

            .puzzle-header h4 {
                margin: 0;
                color: #fbbf24;
                font-size: 1.2rem;
            }

            .puzzle-pills-row {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .puzzle-pill {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #cbd5e1;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s;
            }

            .puzzle-pill.active {
                background: #10b981;
                color: #fff;
                border-color: #10b981;
            }

            .puzzle-pill.completed:not(.active) {
                background: rgba(16, 185, 129, 0.25);
                color: #34d399;
                border-color: #10b981;
            }

            .puzzle-slots-container {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
                min-height: 60px;
                padding: 1rem;
                background: rgba(0, 0, 0, 0.35);
                border: 2px dashed rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                margin-bottom: 1.5rem;
                align-items: center;
            }

            .puzzle-slot {
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 600;
                transition: all 0.2s;
            }

            .puzzle-slot.empty {
                border: 1px dashed rgba(255, 255, 255, 0.25);
                color: #64748b;
                min-width: 40px;
                text-align: center;
            }

            .puzzle-slot.filled {
                background: #10b981;
                color: #fff;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
                cursor: pointer;
            }

            .puzzle-words-bank {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
                margin-bottom: 1.5rem;
            }

            .puzzle-word-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 0.55rem 1.1rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .puzzle-word-btn:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-1px);
            }

            .puzzle-word-btn.placed {
                opacity: 0.3;
                cursor: not-allowed;
            }

            .puzzle-feedback-area {
                margin-top: 1rem;
                text-align: center;
            }

            .feedback-msg {
                padding: 1rem 1.5rem;
                border-radius: 10px;
                font-size: 1.2rem;
                margin-bottom: 1rem;
            }

            .feedback-msg.success {
                background: rgba(16, 185, 129, 0.2);
                border: 1px solid #10b981;
                color: #34d399;
            }

            .feedback-msg.error {
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid #ef4444;
                color: #fca5a5;
            }

            .puzzle-action-row {
                display: flex;
                gap: 1rem;
                justify-content: center;
                align-items: center;
            }

            .listen-btn-small {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #fff;
                padding: 0.6rem 1.2rem;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                font-weight: 600;
            }

            .listen-btn-small:hover {
                background: rgba(255, 255, 255, 0.25);
            }

            .retry-task-btn {
                background: #ef4444;
                color: #fff;
                border: none;
                padding: 0.6rem 1.4rem;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                font-weight: 600;
            }
        `;
        document.head.appendChild(styles);
    }
}
