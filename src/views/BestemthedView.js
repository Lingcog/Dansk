import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';
import { renderDsIcon, dsSvgIcons } from '../utils/designSystemIcons.js';
import { tBh, bhTransBlock, bhTransSpan } from '../utils/bestemthed_translations.js';

export function renderBestemthedView(container, navigateFn, extraData = {}) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container bestemthed-view';

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
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('pronomen', { subPath: 'artikler_menu' });
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.innerHTML = `En kat eller katten? (bestemt og ubestemt)${bhTransBlock('bh_title')}`;
    viewContainer.appendChild(title);

    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.innerHTML = `Tekstflow og introduktion af nye emner: Fra ukendt (ubestemt) til kendt (bestemt)${bhTransBlock('bh_subtitle')}`;
    viewContainer.appendChild(subtitle);

    // Grammar System Banner (Color-coded legend)
    const grammarBanner = document.createElement('div');
    grammarBanner.className = 'bestemthed-grammar-banner';
    grammarBanner.innerHTML = `
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #f59e0b;"></span>
            <div>
                <strong style="color: #fbbf24;">1. gang: Ukendt emne</strong>
                <span style="opacity: 0.85; margin-left: 0.3rem;">→ Ubestemt form (en/et...)</span>
                ${bhTransBlock('bh_banner_item1_sub')}
            </div>
        </div>
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #10b981;"></span>
            <div>
                <strong style="color: #34d399;">2. gang: Kendt emne</strong>
                <span style="opacity: 0.85; margin-left: 0.3rem;">→ Bestemt form (-en/-et/-ene)</span>
                ${bhTransBlock('bh_banner_item2_sub')}
            </div>
        </div>
    `;
    viewContainer.appendChild(grammarBanner);

    // Navigation Tabs: 1. del (Modellen) vs. 2. del (Historier) vs. 3. del (Prøv selv)
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'bestemthed-tabs-nav';

    const tab1Btn = document.createElement('button');
    tab1Btn.className = 'bestemthed-tab-btn active';
    tab1Btn.innerHTML = `<strong>1. del: Reglen & Modellen</strong> <span>Fra ukendt til kendt</span> ${bhTransBlock('bh_tab1_sub')}`;

    const tab2Btn = document.createElement('button');
    tab2Btn.className = 'bestemthed-tab-btn';
    tab2Btn.innerHTML = `<strong>2. del: Korte historier</strong> <span>Tekstflow i praksis</span> ${bhTransBlock('bh_tab2_sub')}`;

    const tab3Btn = document.createElement('button');
    tab3Btn.className = 'bestemthed-tab-btn';
    tab3Btn.innerHTML = `<strong>3. del: Prøv selv</strong> <span>Bygger & Puslespil</span> ${bhTransBlock('bh_tab3_sub')}`;

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
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/bestemthed/part' + partNum);
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
            <h2>Hvorfor hedder det først "en kat" og bagefter "katten"?</h2>
            <p class="hero-desc">
                På dansk er bestemthed ikke bare grammatik – det er en måde at styre opmærksomheden på i en samtale!<br>
                Når vi nævner en person, et dyr eller en ting for <strong>første gang</strong>, ved lytteren ikke hvem eller hvad det er. Det er <strong>ukendt</strong> – derfor bruger vi <strong>ubestemt form</strong> (<em>en kat / et hus</em>).<br>
                Næste gang vi nævner det samme emne, ved vi begge to hvad vi taler om. Det er nu <strong>kendt</strong> – derfor bruger vi <strong>bestemt form</strong> (<em>katten / huset</em>).
                ${bhTransBlock('bh_hero_desc')}
            </p>
        `;
        part1Container.appendChild(introCard);

        // Hero Image
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'bestemthed-image-wrapper';
        imgWrapper.innerHTML = `
            <img src="${baseUrl}kat_bestemthed_guide.jpg" alt="Dansk bestemthed tekstflow: fra ukendt (en kat) til kendt (katten)" class="hero-image">
            <div class="image-caption">
                <span style="display: inline-flex; align-items: center; gap: 0.35rem; color: #fbbf24; font-weight: 700;">
                    ${renderDsIcon('lightbulb', '', { size: 18 })} Huskeregel:
                </span> 
                1. gang (Ukendt) → <strong>en kat</strong> | 2. gang (Kendt) → <strong>katten</strong>
                ${bhTransBlock('bh_rule_thumb_text')}
            </div>
        `;
        part1Container.appendChild(imgWrapper);

        // 2-step Concept Cards
        const stepGrid = document.createElement('div');
        stepGrid.className = 'step-grid-2col';

        const stepItems = [
            {
                num: '1',
                title: '1. gang: Introduktion (Ukendt)',
                titleKey: 'bh_step1_title',
                q: 'Er emnet nyt for lytteren?',
                qKey: 'bh_step1_q',
                ans: 'Ja → Brug ubestemt form ("en / et")',
                ansKey: 'bh_step1_ans',
                example: 'Der sidder <strong style="color: #fbbf24;">en kat</strong> i haven.',
                grammar: 'Substantiv (ubestemt singularis)',
                grammarKey: 'bh_step1_grammar',
                colorClass: 'step-orange',
                dsIcon: 'search'
            },
            {
                num: '2',
                title: '2. gang: Genoptagelse (Kendt)',
                titleKey: 'bh_step2_title',
                q: 'Er emnet allerede introduceret?',
                qKey: 'bh_step2_q',
                ans: 'Ja → Brug bestemt form ("-en / -et")',
                ansKey: 'bh_step2_ans',
                example: '<strong style="color: #34d399;">Katten</strong> kigger på en fugl.',
                grammar: 'Substantiv (bestemt singularis)',
                grammarKey: 'bh_step2_grammar',
                colorClass: 'step-green',
                dsIcon: 'target'
            }
        ];

        stepItems.forEach(item => {
            const card = document.createElement('div');
            card.className = `simple-step-card ${item.colorClass}`;
            card.innerHTML = `
                <div class="step-badge">${item.num}</div>
                <div class="step-card-content">
                    <div class="step-title-row">
                        <span class="step-icon">${renderDsIcon(item.dsIcon, '', { size: 18 })}</span>
                        <strong>${item.title}</strong>
                    </div>
                    ${bhTransBlock(item.titleKey)}
                    <div class="step-q">
                        ${item.q}
                        ${bhTransBlock(item.qKey)}
                    </div>
                    <div class="step-ans">
                        ${item.ans}
                        ${bhTransBlock(item.ansKey)}
                    </div>
                    <div class="step-example-box">
                        <div class="example-text">${item.example}</div>
                        <button class="listen-btn-mini" title="${tBh('bh_listen_sent') || 'Hør sætning'}">
                            ${renderDsIcon('volume', '', { size: 16 })}
                        </button>
                    </div>
                    <div class="grammar-badge">
                        ${renderDsIcon('tag', '', { size: 14 })} ${item.grammar}
                        ${bhTransSpan(item.grammarKey)}
                    </div>
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
            <div class="banner-label">
                Det samlede tekstflow sammen:${bhTransSpan('bh_flow_banner_label')}
            </div>
            <div class="banner-sentence">
                "Der sidder <span class="word-orange">en kat</span> i haven. <span class="word-green">Katten</span> kigger nysgerrigt på mig."
            </div>
            <button class="listen-btn" title="${tBh('bh_listen_flow') || 'Hør hele sætningsforløbet'}">
                <span>${renderDsIcon('volume', '', { size: 18 })}</span> Hør tekstflowet ${bhTransSpan('bh_listen_flow')}
            </button>
        `;
        const listenBtn = resultBox.querySelector('.listen-btn');
        listenBtn.onclick = () => speakDanish("Der sidder en kat i haven. Katten kigger nysgerrigt på mig.");
        part1Container.appendChild(resultBox);

        // Core Patterns Table
        const tableCard = document.createElement('div');
        tableCard.className = 'bestemthed-table-card';
        tableCard.innerHTML = `
            <h3>
                <span style="display: inline-flex; align-items: center; gap: 0.45rem;">
                    ${renderDsIcon('fileText', '', { size: 20 })} <span>Oversigt over typiske substantivpar</span>
                </span>
            </h3>
            ${bhTransBlock('bh_table_title')}
            <div class="pairs-grid">
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang${bhTransSpan('bh_tag_first')}</span> en kat</div>
                    <div class="pair-arrow">→</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang${bhTransSpan('bh_tag_next')}</span> katten</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang${bhTransSpan('bh_tag_first')}</span> et hus</div>
                    <div class="pair-arrow">→</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang${bhTransSpan('bh_tag_next')}</span> huset</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang${bhTransSpan('bh_tag_first')}</span> en bil</div>
                    <div class="pair-arrow">→</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang${bhTransSpan('bh_tag_next')}</span> bilen</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang${bhTransSpan('bh_tag_first')}</span> et æble</div>
                    <div class="pair-arrow">→</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang${bhTransSpan('bh_tag_next')}</span> æblet</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang${bhTransSpan('bh_tag_first')}</span> en cykel</div>
                    <div class="pair-arrow">→</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang${bhTransSpan('bh_tag_next')}</span> cyklen</div>
                </div>
                <div class="pair-item">
                    <div class="pair-ubestemt"><span class="badge-tag">1. gang${bhTransSpan('bh_tag_first')}</span> nogle børn</div>
                    <div class="pair-arrow">→</div>
                    <div class="pair-bestemt"><span class="badge-tag">2. gang${bhTransSpan('bh_tag_next')}</span> børnene</div>
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
                titleKey: 'bh_s1_title',
                dsIcon: 'cat',
                lines: [
                    {
                        pre: 'I morges kiggede Peter ud af vinduet og så ',
                        options: ['en kat', 'katten'],
                        correct: 'en kat',
                        post: ' i haven.',
                        rule: 'Første gang emnet introduceres → Ukendt for lytteren → Ubestemt form ("en kat")',
                        ruleKey: 'bh_s1_r1'
                    },
                    {
                        pre: '',
                        options: ['En kat', 'Katten'],
                        correct: 'Katten',
                        post: ' listede forsigtigt rundt mellem buskene.',
                        rule: 'Nævnt igen → Nu er den kendt for os begge → Bestemt form ("Katten")',
                        ruleKey: 'bh_s1_r2'
                    },
                    {
                        pre: 'Pludselig stoppede ',
                        options: ['en kat', 'katten'],
                        correct: 'katten',
                        post: ' op og fik øje på en mus.',
                        rule: 'Stadig den samme kendte kat → Bestemt form ("katten")',
                        ruleKey: 'bh_s1_r3'
                    }
                ],
                fullSentence: 'I morges kiggede Peter ud af vinduet og så en kat i haven. Katten listede forsigtigt rundt mellem buskene. Pludselig stoppede katten op og fik øje på en mus.'
            },
            {
                id: 'ny_cykel',
                title: 'Historie 2: Den nye cykel',
                titleKey: 'bh_s2_title',
                dsIcon: 'bicycle',
                lines: [
                    {
                        pre: 'Sofie har lige købt ',
                        options: ['en cykel', 'cyklen'],
                        correct: 'en cykel',
                        post: ' for at cykle i skole.',
                        rule: 'Nyt emne introduceres → Ubestemt form ("en cykel")',
                        ruleKey: 'bh_s2_r1'
                    },
                    {
                        pre: '',
                        options: ['En cykel', 'Cyklen'],
                        correct: 'Cyklen',
                        post: ' er lysegrøn og har syv gear.',
                        rule: 'Genoptaget → Kendt emne → Bestemt form ("Cyklen")',
                        ruleKey: 'bh_s2_r2'
                    },
                    {
                        pre: 'Hver morgen låser hun ',
                        options: ['en cykel', 'cyklen'],
                        correct: 'cyklen',
                        post: ' op med sin nøgle.',
                        rule: 'Kendt cykel → Bestemt form ("cyklen")',
                        ruleKey: 'bh_s2_r3'
                    }
                ],
                fullSentence: 'Sofie har lige købt en cykel for at cykle i skole. Cyklen er lysegrøn og har syv gear. Hver morgen låser hun cyklen op med sin nøgle.'
            },
            {
                id: 'kaffe_cafe',
                title: 'Historie 3: En kop kaffe på caféen',
                titleKey: 'bh_s3_title',
                dsIcon: 'coffee',
                lines: [
                    {
                        pre: 'Morten sætter sig ved bordet og bestiller ',
                        options: ['en kop', 'koppen'],
                        correct: 'en kop',
                        post: ' kaffe.',
                        rule: 'Første bestilling → Ukendt kop → Ubestemt form ("en kop")',
                        ruleKey: 'bh_s3_r1'
                    },
                    {
                        pre: '',
                        options: ['En kop', 'Koppen'],
                        correct: 'Koppen',
                        post: ' er helt varm, og kaffen dufter dejligt.',
                        rule: 'Omtales igen → Kendt kop → Bestemt form ("Koppen")',
                        ruleKey: 'bh_s3_r2'
                    },
                    {
                        pre: 'Han drikker ',
                        options: ['en kaffe', 'kaffen'],
                        correct: 'kaffen',
                        post: ' langsomt, mens han læser avis.',
                        rule: 'Den kendte kaffe → Bestemt form ("kaffen")',
                        ruleKey: 'bh_s3_r3'
                    }
                ],
                fullSentence: 'Morten sætter sig ved bordet og bestiller en kop kaffe. Koppen er helt varm, og kaffen dufter dejligt. Han drikker kaffen langsomt, mens han læser avis.'
            },
            {
                id: 'hus_skov',
                title: 'Historie 4: Huset ved skoven',
                titleKey: 'bh_s4_title',
                dsIcon: 'home',
                lines: [
                    {
                        pre: 'På vores gåtur kom vi forbi ',
                        options: ['et hus', 'huset'],
                        correct: 'et hus',
                        post: ' ude i skoven.',
                        rule: 'Nyt syn for første gang → Ubestemt form ("et hus")',
                        ruleKey: 'bh_s4_r1'
                    },
                    {
                        pre: '',
                        options: ['Et hus', 'Huset'],
                        correct: 'Huset',
                        post: ' havde en rød dør og hvide vinduer.',
                        rule: 'Kendt hus → Bestemt form ("Huset")',
                        ruleKey: 'bh_s4_r2'
                    },
                    {
                        pre: 'Rundt om ',
                        options: ['et hus', 'huset'],
                        correct: 'huset',
                        post: ' voksede der vilde blomster.',
                        rule: 'Stadig det samme kendte hus → Bestemt form ("huset")',
                        ruleKey: 'bh_s4_r3'
                    }
                ],
                fullSentence: 'På vores gåtur kom vi forbi et hus ude i skoven. Huset havde en rød dør og hvide vinduer. Rundt om huset voksede der vilde blomster.'
            },
            {
                id: 'brev_postkasse',
                title: 'Historie 5: Brevet i postkassen',
                titleKey: 'bh_s5_title',
                dsIcon: 'mail',
                lines: [
                    {
                        pre: 'I eftermiddags fandt Lars ',
                        options: ['et brev', 'brevet'],
                        correct: 'et brev',
                        post: ' i postkassen.',
                        rule: 'Nyt brev fundet → Ubestemt form ("et brev")',
                        ruleKey: 'bh_s5_r1'
                    },
                    {
                        pre: 'Han åbnede forsigtigt ',
                        options: ['et brev', 'brevet'],
                        correct: 'brevet',
                        post: ' med en lille kniv.',
                        rule: 'Kendt brev → Bestemt form ("brevet")',
                        ruleKey: 'bh_s5_r2'
                    },
                    {
                        pre: '',
                        options: ['Et brev', 'Brevet'],
                        correct: 'Brevet',
                        post: ' indeholdt en fin hilsen fra hans ven.',
                        rule: 'Kendt brev → Bestemt form ("Brevet")',
                        ruleKey: 'bh_s5_r3'
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
            <h2>Korte historier: Oplev hvordan teksten flyder</h2>
            <p class="hero-desc">
                I rigtige danske tekster og samtaler bygger vi bro mellem sætningerne. Vælg den rigtige form i hver linje alt efter om emnet introduceres (ukendt) eller fortsætter (kendt).
                ${bhTransBlock('bh_p2_hero_desc')}
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
                pill.innerHTML = `<span>${renderDsIcon(st.dsIcon, '', { size: 16 })}</span> <span>${idx + 1}</span>`;
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
                    <div>
                        <h3>${st.title}</h3>
                        ${bhTransBlock(st.titleKey)}
                    </div>
                    <span class="story-counter">
                        Historie ${currentStoryIdx + 1} af ${storiesData.length}
                        ${bhTransSpan('bh_story_counter', { curr: currentStoryIdx + 1, total: storiesData.length })}
                    </span>
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
                        ? `
                            <div style="display: flex; align-items: center; gap: 0.35rem; color: #4ade80; font-weight: 700; margin-bottom: 0.2rem;">
                                ${renderDsIcon('check', '', { size: 16 })} Rigtigt!
                            </div>
                            <div class="rule-da">${line.rule}</div>
                            ${bhTransBlock(line.ruleKey)}
                          `
                        : `
                            <div style="display: flex; align-items: center; gap: 0.35rem; color: #f87171; font-weight: 700; margin-bottom: 0.2rem;">
                                ${renderDsIcon('alertTriangle', '', { size: 16 })} Prøv igen:
                            </div>
                            <div class="rule-da">Tænk over om emnet er nyt (ukendt) eller allerede nævnt (kendt).</div>
                            ${bhTransBlock('bh_feedback_retry')}
                          `;
                    lineDiv.appendChild(ruleBadge);
                }

                linesContainer.appendChild(lineDiv);
            });

            // Check if all lines in this story are correct
            const allCorrect = userSelections[currentStoryIdx].every(item => item.isCorrect);

            if (allCorrect) {
                feedbackArea.innerHTML = `
                    <div class="story-success-banner">
                        <div style="display: flex; align-items: center; gap: 0.45rem; color: #4ade80; font-weight: 700; font-size: 1.05rem;">
                            ${renderDsIcon('check', '', { size: 20 })} Flot klaret!
                        </div>
                        <div style="margin-top: 0.25rem;">Du forstod tekstflowet fra introduktion til genkendelse.</div>
                        ${bhTransBlock('bh_story_success')}
                    </div>
                `;

                actionsRow.innerHTML = `
                    <button class="listen-btn" id="listen-story-btn">
                        <span>${renderDsIcon('volume', '', { size: 18 })}</span> Hør hele historien ${bhTransSpan('bh_listen_story')}
                    </button>
                    ${currentStoryIdx < storiesData.length - 1 ? `
                        <button class="next-task-btn" id="next-story-btn">
                            Næste historie → ${bhTransSpan('bh_next_story')}
                        </button>
                    ` : `
                        <button class="next-task-btn" id="finish-stories-btn">
                            Gå til Prøv selv → ${bhTransSpan('bh_goto_practice')}
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
            <h2>Prøv selv: Sætningsbygger & Puslespil</h2>
            <p class="hero-desc">
                Skab dine egne sætningspar eller saml puslespilsbrikker i den rigtige rækkefølge.
                ${bhTransBlock('bh_p3_hero_desc')}
            </p>
        `;
        part3Container.appendChild(tryHeader);

        // Sub-tabs: 1) Sætningsbygger 2) Puslespil
        const exerciseTabs = document.createElement('div');
        exerciseTabs.className = 'exercise-sub-tabs';

        const ex1TabBtn = document.createElement('button');
        ex1TabBtn.className = 'ex-sub-tab active';
        ex1TabBtn.innerHTML = `Trin-for-trin bygger ${bhTransSpan('bh_tab_builder')}`;

        const ex2TabBtn = document.createElement('button');
        ex2TabBtn.className = 'ex-sub-tab';
        ex2TabBtn.innerHTML = `Puslespil: Rigtig rækkefølge ${bhTransSpan('bh_tab_puzzle')}`;

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
            { ubestemt: 'en kat', bestemt: 'Katten', dsIcon: 'cat', follow: 'er meget legesyg' },
            { ubestemt: 'en hund', bestemt: 'Hunden', dsIcon: 'dog', follow: 'logrer med halen' },
            { ubestemt: 'en bil', bestemt: 'Bilen', dsIcon: 'car', follow: 'kører lynhurtigt' },
            { ubestemt: 'et hus', bestemt: 'Huset', dsIcon: 'home', follow: 'har en kæmpe have' },
            { ubestemt: 'et æble', bestemt: 'Æblet', dsIcon: 'apple', follow: 'smager utrolig sødt' },
            { ubestemt: 'en cykel', bestemt: 'Cyklen', dsIcon: 'bicycle', follow: 'står låst foran døren' }
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
                    <h4>1. Vælg en introduktion (1. gang → Ubestemt form):</h4>
                    ${bhTransBlock('bh_builder_s1')}
                    <div class="builder-chips-row" id="intro-chips"></div>
                </div>

                <div class="builder-section">
                    <h4>2. Vælg et emne der skal introduceres:</h4>
                    ${bhTransBlock('bh_builder_s2')}
                    <div class="builder-chips-row" id="noun-chips"></div>
                </div>

                <div class="builder-live-display">
                    <div class="display-label">
                        Dit samlede tekstflow i praksis:${bhTransSpan('bh_builder_live_label')}
                    </div>
                    <div class="display-sentence">
                        "${selectedIntro} <span class="word-orange">${selectedNoun.ubestemt}</span>. <span class="word-green">${selectedNoun.bestemt}</span> ${selectedNoun.follow}."
                    </div>
                    <div class="display-flow-notes">
                        <span class="note-pill orange">1. gang: <strong>${selectedNoun.ubestemt}</strong> (ukendt)</span>
                        <span class="note-arrow">→</span>
                        <span class="note-pill green">2. gang: <strong>${selectedNoun.bestemt}</strong> (kendt)</span>
                    </div>
                    <button class="listen-btn" id="builder-listen-btn">
                        <span>${renderDsIcon('volume', '', { size: 18 })}</span> Hør sætningsparret ${bhTransSpan('bh_builder_listen')}
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
                btn.innerHTML = `
                    <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
                        ${renderDsIcon(item.dsIcon, '', { size: 18 })} <span>${item.ubestemt}</span>
                    </span>
                `;
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
                prompt: 'Saml tekstflowet: Fra ukendt til kendt',
                promptKey: 'bh_puz1_prompt',
                scrambled: ['i haven.', 'Katten', 'en kat', 'Der sidder', 'er', 'meget sød.'],
                correct: ['Der sidder', 'en kat', 'i haven.', 'Katten', 'er', 'meget sød.']
            },
            {
                prompt: 'Saml tekstflowet: Den røde bil',
                promptKey: 'bh_puz2_prompt',
                scrambled: ['Bilen', 'en bil.', 'Vi så', 'er', 'helt rød.'],
                correct: ['Vi så', 'en bil.', 'Bilen', 'er', 'helt rød.']
            },
            {
                prompt: 'Saml tekstflowet: Det lækre æble',
                promptKey: 'bh_puz3_prompt',
                scrambled: ['Æblet', 'spiser', 'Han', 'et æble.', 'smager godt.'],
                correct: ['Han', 'spiser', 'et æble.', 'Æblet', 'smager godt.']
            },
            {
                prompt: 'Saml tekstflowet: Den hurtige cykel',
                promptKey: 'bh_puz4_prompt',
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
                    <div>
                        <h4>${task.prompt}</h4>
                        ${bhTransBlock(task.promptKey)}
                    </div>
                    <span class="puzzle-counter">
                        Opgave ${currentPuzzleIdx + 1} af ${puzzleTasks.length}
                        ${bhTransSpan('bh_puzzle_counter', { curr: currentPuzzleIdx + 1, total: puzzleTasks.length })}
                    </span>
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
                    slot.title = tBh('bh_slot_remove_tip') || 'Klik for at fjerne';
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
                        <div style="display: flex; align-items: center; gap: 0.35rem; color: #4ade80; font-weight: 700;">
                            ${renderDsIcon('check', '', { size: 18 })} Rigtigt!
                        </div>
                        <div style="font-size: 1.05rem; font-weight: 600; margin-top: 0.25rem;">"${sentence}"</div>
                        ${bhTransBlock('bh_puz_success')}
                    </div>
                    <div class="puzzle-action-row">
                        <button class="listen-btn-small" id="puzzle-listen-btn">
                            ${renderDsIcon('volume', '', { size: 16 })} Hør udtale ${bhTransSpan('bh_listen_pronun')}
                        </button>
                        <button class="next-task-btn" id="puzzle-next-btn">
                            ${currentPuzzleIdx < puzzleTasks.length - 1 ? `Næste opgave → ${bhTransSpan('bh_next_task')}` : `Start forfra ${bhTransSpan('bh_start_over')}`}
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
                        <div style="display: flex; align-items: center; gap: 0.35rem; color: #f87171; font-weight: 700;">
                            ${renderDsIcon('alertTriangle', '', { size: 18 })} Ikke helt rigtigt endnu.
                        </div>
                        <div style="margin-top: 0.25rem;">
                            Husk rækkefølgen: Først introduceres emnet (ubestemt) → derefter omtales det kendte emne (bestemt)!
                        </div>
                        ${bhTransBlock('bh_puz_error')}
                    </div>
                    <button class="retry-task-btn" id="puzzle-retry-btn">
                        ${renderDsIcon('refresh', '', { size: 16 })} Prøv igen ${bhTransSpan('bh_try_again')}
                    </button>
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

    let initPart = 1;
    if (extraData && extraData.subPath) {
        if (extraData.subPath === 'part2' || extraData.subPath === '2') initPart = 2;
        else if (extraData.subPath === 'part3' || extraData.subPath === '3') initPart = 3;
    }
    showPart(initPart);

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

            .bestemthed-view .ds-icon-emoji {
                display: none !important;
            }
            .bestemthed-view .ds-icon-svg {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
            }

            .bh-trans-block {
                font-size: 0.90em;
                color: #94a3b8;
                font-style: italic;
                margin-top: 0.25rem;
                font-weight: 500;
                line-height: 1.45;
            }

            .bh-trans-span {
                font-size: 0.88em;
                color: #94a3b8;
                font-style: italic;
                margin-left: 0.4rem;
                font-weight: 500;
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
                align-items: flex-start;
                font-size: 0.95rem;
                color: #e2e8f0;
            }

            .grammar-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 0.5rem;
                margin-top: 0.35rem;
                flex-shrink: 0;
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
                text-align: center;
            }

            .bestemthed-tab-btn strong {
                font-size: 1.05rem;
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
                font-size: 1.5rem;
                font-weight: 700;
            }

            .bestemthed-hero-card .hero-desc {
                font-size: 1.05rem;
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
                margin-bottom: 0.4rem;
            }

            .step-orange .step-title-row strong {
                color: #fbbf24;
            }

            .step-green .step-title-row strong {
                color: #34d399;
            }

            .step-q {
                color: #cbd5e1;
                font-size: 0.96rem;
                margin-bottom: 0.4rem;
            }

            .step-ans {
                color: #e2e8f0;
                font-weight: 600;
                font-size: 1rem;
                margin-bottom: 0.8rem;
            }

            .step-example-box {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 0.75rem 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.8rem;
            }

            .example-text {
                font-size: 1.05rem;
                color: #f8fafc;
            }

            .listen-btn-mini {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                border-radius: 8px;
                width: 32px;
                height: 32px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .listen-btn-mini:hover {
                background: #10b981;
                border-color: #10b981;
            }

            .grammar-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
                font-size: 0.82rem;
                color: #94a3b8;
                background: rgba(255, 255, 255, 0.05);
                padding: 0.3rem 0.65rem;
                border-radius: 8px;
            }

            /* Finished Sentence Banner */
            .finished-sentence-banner {
                background: rgba(0, 0, 0, 0.45);
                border: 1px solid rgba(16, 185, 129, 0.4);
                border-radius: 16px;
                padding: 1.4rem;
                text-align: center;
                margin-bottom: 2rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            }

            .banner-label {
                font-size: 0.88rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #94a3b8;
                margin-bottom: 0.5rem;
            }

            .banner-sentence {
                font-size: 1.35rem;
                font-weight: 700;
                color: #f8fafc;
                margin-bottom: 1rem;
            }

            .word-orange {
                color: #fbbf24;
                text-decoration: underline;
                text-decoration-color: rgba(245, 158, 11, 0.6);
            }

            .word-green {
                color: #34d399;
                text-decoration: underline;
                text-decoration-color: rgba(16, 185, 129, 0.6);
            }

            .listen-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 0.65rem 1.4rem;
                border-radius: 12px;
                font-size: 0.96rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            }

            .listen-btn:hover {
                background: #10b981;
                border-color: #10b981;
                box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
            }

            /* Table Card */
            .bestemthed-table-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.6rem;
                margin-bottom: 2rem;
            }

            .bestemthed-table-card h3 {
                margin: 0 0 1.2rem 0;
                font-size: 1.3rem;
                color: #e2e8f0;
            }

            .pairs-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 1rem;
            }

            .pair-item {
                background: rgba(0, 0, 0, 0.25);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 0.85rem 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .pair-ubestemt, .pair-bestemt {
                font-size: 1.05rem;
                font-weight: 600;
                color: #f8fafc;
            }

            .pair-arrow {
                color: #64748b;
                font-weight: 700;
            }

            .badge-tag {
                display: block;
                font-size: 0.72rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #94a3b8;
                margin-bottom: 0.2rem;
            }

            /* Story Section */
            .story-pill-nav {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }

            .story-pill-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #94a3b8;
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.95rem;
                transition: all 0.2s;
            }

            .story-pill-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
            }

            .story-pill-btn.active {
                background: #10b981;
                border-color: #10b981;
                color: #fff;
                font-weight: 700;
                box-shadow: 0 2px 10px rgba(16, 185, 129, 0.4);
            }

            .story-pill-btn.completed {
                border-color: #10b981;
            }

            .story-interactive-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.6rem 2rem;
                margin-bottom: 2rem;
            }

            .story-title-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 1rem;
                margin-bottom: 1.5rem;
                gap: 1rem;
            }

            .story-title-row h3 {
                margin: 0;
                color: #38bdf8;
                font-size: 1.35rem;
            }

            .story-counter {
                color: #94a3b8;
                font-size: 0.88rem;
                white-space: nowrap;
            }

            .story-line-row {
                font-size: 1.25rem;
                line-height: 1.8;
                margin-bottom: 1.4rem;
                color: #f8fafc;
            }

            .inline-choice-group {
                display: inline-flex;
                gap: 0.4rem;
                margin: 0 0.4rem;
                vertical-align: middle;
            }

            .choice-chip {
                background: rgba(255, 255, 255, 0.08);
                border: 1.5px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 0.35rem 0.85rem;
                border-radius: 10px;
                font-size: 1.05rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .choice-chip:hover {
                background: rgba(255, 255, 255, 0.18);
            }

            .choice-chip.correct {
                background: #10b981 !important;
                border-color: #10b981 !important;
                color: #fff !important;
            }

            .choice-chip.wrong {
                background: #ef4444 !important;
                border-color: #ef4444 !important;
                color: #fff !important;
            }

            .choice-chip.selected {
                background: #38bdf8 !important;
                border-color: #38bdf8 !important;
                color: #0f172a !important;
                font-weight: 700;
            }

            .rule-explanation {
                margin-top: 0.5rem;
                padding: 0.75rem 1rem;
                border-radius: 10px;
                font-size: 0.95rem;
                line-height: 1.45;
            }

            .rule-explanation.rule-correct {
                background: rgba(16, 185, 129, 0.12);
                border: 1px solid rgba(16, 185, 129, 0.3);
                color: #e2e8f0;
            }

            .rule-explanation.rule-wrong {
                background: rgba(239, 68, 68, 0.12);
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: #fca5a5;
            }

            .rule-da {
                color: #f8fafc;
                font-weight: 600;
            }

            .story-success-banner {
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.4);
                border-radius: 12px;
                padding: 1.2rem;
                color: #f8fafc;
                margin-top: 1.5rem;
            }

            .story-actions-row {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
                flex-wrap: wrap;
            }

            .next-task-btn {
                background: #10b981;
                border: 1px solid #10b981;
                color: #fff;
                padding: 0.65rem 1.4rem;
                border-radius: 12px;
                font-size: 0.96rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
            }

            .next-task-btn:hover {
                background: #059669;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
            }

            /* Part 3: Builder & Puzzle */
            .exercise-sub-tabs {
                display: flex;
                gap: 0.6rem;
                justify-content: center;
                margin-bottom: 1.5rem;
            }

            .ex-sub-tab {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #cbd5e1;
                padding: 0.65rem 1.4rem;
                border-radius: 12px;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .ex-sub-tab.active {
                background: #38bdf8;
                border-color: #38bdf8;
                color: #0f172a;
                font-weight: 700;
            }

            .builder-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.6rem 2rem;
                margin-bottom: 2rem;
            }

            .builder-section {
                margin-bottom: 1.5rem;
            }

            .builder-section h4 {
                color: #cbd5e1;
                margin: 0 0 0.75rem 0;
                font-size: 1.1rem;
            }

            .builder-chips-row {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
            }

            .builder-live-display {
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(56, 189, 248, 0.3);
                border-radius: 14px;
                padding: 1.5rem;
                text-align: center;
                margin-top: 1.5rem;
            }

            .display-label {
                color: #94a3b8;
                font-size: 0.88rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin-bottom: 0.5rem;
            }

            .display-sentence {
                font-size: 1.35rem;
                font-weight: 700;
                color: #fff;
                margin-bottom: 1rem;
            }

            .display-flow-notes {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.6rem;
                margin-bottom: 1.2rem;
                flex-wrap: wrap;
            }

            .note-pill {
                padding: 0.3rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.88rem;
                font-weight: 600;
            }

            .note-pill.orange {
                background: rgba(245, 158, 11, 0.15);
                border: 1px solid rgba(245, 158, 11, 0.4);
                color: #fbbf24;
            }

            .note-pill.green {
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.4);
                color: #34d399;
            }

            .note-arrow {
                color: #64748b;
                font-weight: 700;
            }

            /* Puzzle Wrapper */
            .puzzle-exercise-wrapper {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.6rem 2rem;
                margin-bottom: 2rem;
            }

            .puzzle-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 1rem;
                margin-bottom: 1.2rem;
                gap: 1rem;
            }

            .puzzle-header h4 {
                margin: 0;
                color: #38bdf8;
                font-size: 1.25rem;
            }

            .puzzle-counter {
                color: #94a3b8;
                font-size: 0.88rem;
                white-space: nowrap;
            }

            .puzzle-pills-row {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .puzzle-pill {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #cbd5e1;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .puzzle-pill.active {
                background: #38bdf8;
                border-color: #38bdf8;
                color: #0f172a;
            }

            .puzzle-pill.completed {
                border-color: #10b981;
                color: #10b981;
            }

            .puzzle-slots-container {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
                min-height: 52px;
                background: rgba(0, 0, 0, 0.35);
                border: 2px dashed rgba(255, 255, 255, 0.18);
                border-radius: 14px;
                padding: 0.85rem;
                margin-bottom: 1.5rem;
                align-items: center;
            }

            .puzzle-slot {
                padding: 0.55rem 1rem;
                border-radius: 10px;
                font-size: 1.05rem;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 60px;
                transition: all 0.2s;
            }

            .puzzle-slot.empty {
                background: rgba(255, 255, 255, 0.04);
                border: 1px dashed rgba(255, 255, 255, 0.2);
                color: #64748b;
                font-size: 0.85rem;
            }

            .puzzle-slot.filled {
                background: #1e293b;
                border: 1px solid #38bdf8;
                color: #f8fafc;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }

            .puzzle-slot.filled:hover {
                background: #ef4444;
                border-color: #ef4444;
            }

            .puzzle-words-bank {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
                margin-bottom: 1.5rem;
            }

            .puzzle-word-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.18);
                color: #f8fafc;
                padding: 0.55rem 1rem;
                border-radius: 10px;
                font-size: 1.05rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .puzzle-word-btn:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

            .puzzle-word-btn.placed {
                opacity: 0.35;
                cursor: default;
                transform: none;
            }

            .feedback-msg {
                padding: 1rem 1.4rem;
                border-radius: 12px;
                margin-bottom: 1rem;
                font-size: 1.05rem;
                line-height: 1.45;
            }

            .feedback-msg.success {
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.4);
                color: #f8fafc;
            }

            .feedback-msg.error {
                background: rgba(239, 68, 68, 0.15);
                border: 1px solid rgba(239, 68, 68, 0.4);
                color: #fca5a5;
            }

            .puzzle-action-row {
                display: flex;
                gap: 0.8rem;
                align-items: center;
                flex-wrap: wrap;
            }

            .listen-btn-small {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 0.55rem 1.1rem;
                border-radius: 10px;
                font-size: 0.92rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                transition: all 0.2s;
            }

            .listen-btn-small:hover {
                background: #10b981;
                border-color: #10b981;
            }

            .retry-task-btn {
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid #ef4444;
                color: #fff;
                padding: 0.55rem 1.2rem;
                border-radius: 10px;
                font-size: 0.95rem;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                transition: all 0.2s;
            }

            .retry-task-btn:hover {
                background: #ef4444;
            }

            @media (max-width: 600px) {
                .bestemthed-view {
                    padding: 1rem 0.5rem 3rem 0.5rem;
                }
                .bestemthed-hero-card {
                    padding: 1.2rem 1rem;
                }
                .bestemthed-tabs-nav {
                    flex-direction: column;
                    gap: 0.4rem;
                }
                .bestemthed-tab-btn {
                    padding: 0.6rem 0.8rem;
                }
                .step-grid-2col {
                    grid-template-columns: 1fr;
                }
                .story-interactive-card, .builder-card, .puzzle-exercise-wrapper {
                    padding: 1.2rem 1rem;
                }
                .story-line-row {
                    font-size: 1.1rem;
                }
                .banner-sentence, .display-sentence {
                    font-size: 1.15rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}
