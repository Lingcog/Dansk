import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderAdjectiveComparisonView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adj-comparison-view';

    const isEn = getLang() === 'en';

    // Helper: TTS speech playback
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('pronomen');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = isEn 
        ? '📏 Big / bigger / biggest? (Adjectives & Definite Forms)' 
        : '📏 Stor / større / størst? (Gradbøjning & bestemt form)';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = isEn
        ? 'Degrees of comparison and the definite -e rule: From single descriptions to comparisons, winners, and ownership.'
        : 'Intuitiv gradbøjning og den vigtige e-regel: Fra almindelig beskrivelse til sammenligninger, vinderen og bestemt form (-e).';
    viewContainer.appendChild(subtitle);

    // Grammar Toggle Button Area
    let showGrammarTerms = true;
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'adj-grammar-toggle-bar';

    const grammarToggleBtn = document.createElement('button');
    grammarToggleBtn.className = 'adj-grammar-toggle-btn';
    grammarToggleBtn.id = 'adj-grammar-toggle-btn';
    
    function updateToggleBtnState() {
        if (showGrammarTerms) {
            viewContainer.classList.remove('hide-grammar-terms');
            grammarToggleBtn.innerHTML = isEn
                ? `<span class="toggle-icon">🏷️</span> <span class="toggle-main">Grammar terms: <strong>ACTIVE</strong></span> <span class="toggle-hint">• Click to hide terms (everyday language)</span>`
                : `<span class="toggle-icon">🏷️</span> <span class="toggle-main">Grammatiske betegnelser: <strong>VISES</strong></span> <span class="toggle-hint">• Klik for at skjule fagtermer (hverdagssprog)</span>`;
            grammarToggleBtn.classList.remove('everyday-mode');
        } else {
            viewContainer.classList.add('hide-grammar-terms');
            grammarToggleBtn.innerHTML = isEn
                ? `<span class="toggle-icon">🗣️</span> <span class="toggle-main">Everyday language: <strong>ACTIVE</strong></span> <span class="toggle-hint">• Click to show grammar terms</span>`
                : `<span class="toggle-icon">🗣️</span> <span class="toggle-main">Hverdagssprog: <strong>AKTIVT</strong></span> <span class="toggle-hint">• Klik for at vise grammatiske betegnelser</span>`;
            grammarToggleBtn.classList.add('everyday-mode');
        }
    }
    
    grammarToggleBtn.onclick = () => {
        showGrammarTerms = !showGrammarTerms;
        updateToggleBtnState();
    };
    updateToggleBtnState();
    toggleContainer.appendChild(grammarToggleBtn);
    viewContainer.appendChild(toggleContainer);

    // Grammar Legend Banner (Color-coded legend with bilingual/mode-aware text)
    const grammarBanner = document.createElement('div');
    grammarBanner.className = 'adj-grammar-banner';
    grammarBanner.innerHTML = `
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #f59e0b;"></span>
            <strong style="color: #fbbf24;">
                <span class="term-fagterm">1. Positiv</span>
                <span class="term-everyday">1. Beskrivelse</span>
            </strong>
            <span style="opacity: 0.85; margin-left: 0.3rem;">➔ ${isEn ? 'One object (stor)' : 'Én ting (stor)'}</span>
        </div>
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #3b82f6;"></span>
            <strong style="color: #60a5fa;">
                <span class="term-fagterm">2. Komparativ</span>
                <span class="term-everyday">2. Sammenligning</span>
            </strong>
            <span style="opacity: 0.85; margin-left: 0.3rem;">➔ ${isEn ? '2 objects with "end" (større)' : '2 ting med "end" (større)'}</span>
        </div>
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #10b981;"></span>
            <strong style="color: #34d399;">
                <span class="term-fagterm">3. Superlativ</span>
                <span class="term-everyday">3. Vinderen</span>
            </strong>
            <span style="opacity: 0.85; margin-left: 0.3rem;">➔ ${isEn ? 'Exceeds all / Winner (størst)' : 'Overgår alle / Vinder (størst)'}</span>
        </div>
        <div class="grammar-system-item">
            <span class="grammar-dot" style="background: #ec4899;"></span>
            <strong style="color: #f472b6;">
                <span class="term-fagterm">Bestemt form (-e)</span>
                <span class="term-everyday">Kendt / ejet (-e)</span>
            </strong>
            <span style="opacity: 0.85; margin-left: 0.3rem;">➔ den/min/denne + stor-e</span>
        </div>
    `;
    viewContainer.appendChild(grammarBanner);

    // Navigation Tabs
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'adj-tabs-nav';

    const tab1Btn = document.createElement('button');
    tab1Btn.className = 'adj-tab-btn active';
    tab1Btn.innerHTML = `<strong>${isEn ? 'Part 1: Comparison & Model' : '1. del: Gradbøjning & Modellen'}</strong> <span>${isEn ? 'Stor ➔ større ➔ størst' : 'Stor ➔ større ➔ størst'}</span>`;

    const tab2Btn = document.createElement('button');
    tab2Btn.className = 'adj-tab-btn';
    tab2Btn.innerHTML = `<strong>${isEn ? 'Part 2: Definite Form & -E Rule' : '2. del: Bestemt form & E-reglen'}</strong> <span>${isEn ? '"Den store bil" & "Min store bil"' : '"Den store bil" & "Min store bil"'}</span>`;

    const tab3Btn = document.createElement('button');
    tab3Btn.className = 'adj-tab-btn';
    tab3Btn.innerHTML = `<strong>${isEn ? 'Part 3: Practice Yourself' : '3. del: Træn selv'}</strong> <span>${isEn ? 'Choice & Sentence Builder' : 'Vælg form & Sætningsbygger'}</span>`;

    tabsContainer.appendChild(tab1Btn);
    tabsContainer.appendChild(tab2Btn);
    tabsContainer.appendChild(tab3Btn);
    viewContainer.appendChild(tabsContainer);

    // Main content panels
    const part1Container = document.createElement('div');
    part1Container.className = 'adj-part-container active';

    const part2Container = document.createElement('div');
    part2Container.className = 'adj-part-container';
    part2Container.style.display = 'none';

    const part3Container = document.createElement('div');
    part3Container.className = 'adj-part-container';
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
    // --- 1. DEL: REGLEN & MODELLEN (STOR -> STØRRE -> STØRST) ------
    // ==============================================================
    function setupPart1() {
        const introCard = document.createElement('div');
        introCard.className = 'adj-hero-card';
        introCard.innerHTML = `
            <h2>${isEn ? 'How do we compare things in Danish?' : 'Hvordan sammenligner vi ting på dansk?'}</h2>
            <p class="hero-desc">
                ${isEn 
                    ? 'Adjectives describe how someone or something is. When we want to compare or highlight qualities, we inflect adjectives in <strong>three steps</strong>:<br>' +
                      '<strong>1. Base form (Positive):</strong> Describes just one thing without comparison (e.g. <em>en stor bil</em>).<br>' +
                      '<strong>2. Comparative:</strong> Used when comparing <strong>two things</strong>. We almost always use the word <strong>"end"</strong> (e.g. <em>Bilen er <strong>større end</strong> cyklen</em>).<br>' +
                      '<strong>3. Superlative (The Winner):</strong> Used when one thing <strong>exceeds all others</strong> and reaches the highest degree (e.g. <em>Lastbilen er <strong>størst</strong></em>).'
                    : 'Adjektiver (tillægsord) beskriver hvordan noget er. Når vi vil sammenligne eller fremhæve egenskaber, bøjer vi adjektivet i <strong>tre logiske trin</strong>:<br>' +
                      '<strong>1. Grundform (Positiv):</strong> Beskriver blot én ting for sig selv (fx <em>en stor bil</em>).<br>' +
                      '<strong>2. Sammenligning (Komparativ):</strong> Bruges når vi sammenligner <strong>to ting</strong>. Vi bruger næsten altid ordet <strong>"end"</strong> (fx <em>Bilen er <strong>større end</strong> cyklen</em>).<br>' +
                      '<strong>3. Vinderen (Superlativ):</strong> Bruges når noget <strong>overgår alle andre</strong> og er på det allerhøjeste trin (fx <em>Lastbilen er <strong>størst</strong></em>).'
                }
            </p>
        `;
        part1Container.appendChild(introCard);

        // Hero Image Wrapper
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'adj-image-wrapper';
        imgWrapper.innerHTML = `
            <img src="${baseUrl}adjektiver_comparison_guide.jpg" alt="${isEn ? 'Danish adjective degrees: stor -> større -> størst' : 'Dansk gradbøjning: stor -> større -> størst'}" class="hero-image">
            <div class="image-caption">
                <span>💡 <strong>${isEn ? 'Rule of thumb:' : 'Huskeregel:'}</strong></span> 
                ${isEn 
                    ? 'Comparative compares 2 things with <strong>"end"</strong>. Superlative crowns the winner that exceeds all!' 
                    : 'Komparativ sammenligner 2 ting med <strong>"end"</strong>. Superlativ kårer vinderen der overgår alle andre!'
                }
            </div>
        `;
        part1Container.appendChild(imgWrapper);

        // 3-step Foundation Cards
        const stepGrid = document.createElement('div');
        stepGrid.className = 'step-grid-3col';

        const stepItems = [
            {
                num: '1',
                titleFagterm: 'Positiv (Grundform)',
                titleEveryday: '1. Almindelig beskrivelse',
                q: isEn ? 'Are you describing just one thing?' : 'Beskriver du bare én ting for sig selv?',
                ans: isEn ? 'Yes ➔ Use base form ("stor / hurtig / kold")' : 'Ja ➔ Brug grundformen ("stor / hurtig / kold")',
                example: 'Bilen er <strong style="color: #fbbf24;">stor</strong>.',
                badgeFagterm: 'Positiv (Grundform)',
                badgeEveryday: '1. Beskriver 1 ting',
                colorClass: 'step-orange',
                icon: '🚗'
            },
            {
                num: '2',
                titleFagterm: 'Komparativ (Sammenligning)',
                titleEveryday: '2. Sammenligning af to ting',
                q: isEn ? 'Are you comparing two things with "end"?' : 'Sammenligner du to ting? (Kig efter ordet "end")',
                ans: isEn ? 'Yes ➔ Add -ere or vowel shift ("større / hurtigere")' : 'Ja ➔ Tilføj -ere eller vokalskift ("større / hurtigere")',
                example: 'Bilen er <strong style="color: #60a5fa;">større end</strong> cyklen.',
                badgeFagterm: 'Komparativ (Sammenligningsform)',
                badgeEveryday: '2. Sammenligner 2 ting',
                colorClass: 'step-blue',
                icon: '🚙'
            },
            {
                num: '3',
                titleFagterm: 'Superlativ (Højeste grad)',
                titleEveryday: '3. Vinderen / Overgår alt',
                q: isEn ? 'Does it exceed everything else in the group?' : 'Overgår tingen alle andre i gruppen?',
                ans: isEn ? 'Yes ➔ Add -est or vowel shift ("størst / hurtigst")' : 'Ja ➔ Tilføj -est eller vokalskift ("størst / hurtigst")',
                example: 'Lastbilen er <strong style="color: #34d399;">størst</strong> af alle.',
                badgeFagterm: 'Superlativ (Højeste grad)',
                badgeEveryday: '3. Vinderen overgår alle',
                colorClass: 'step-green',
                icon: '🚛'
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
                        <strong>
                            <span class="term-fagterm">${item.titleFagterm}</span>
                            <span class="term-everyday">${item.titleEveryday}</span>
                        </strong>
                    </div>
                    <div class="step-q">${item.q}</div>
                    <div class="step-ans">${item.ans}</div>
                    <div class="step-example-box">
                        <div class="example-text">${item.example}</div>
                        <button class="listen-btn-mini" title="${isEn ? 'Listen' : 'Hør'}">🔊</button>
                    </div>
                    <div class="grammar-badge">
                        🏷️ 
                        <span class="term-fagterm">${item.badgeFagterm}</span>
                        <span class="term-everyday">${item.badgeEveryday}</span>
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

        // Finished Demo Sentence Flow Banner
        const resultBox = document.createElement('div');
        resultBox.className = 'finished-sentence-banner';
        resultBox.innerHTML = `
            <div class="banner-label">${isEn ? 'Natural comparison flow in a conversation:' : 'Naturligt sammenligningsflow i samtale:'}</div>
            <div class="banner-sentence">
                "Bilen er <span class="word-orange">stor</span>. Men varevognen er <span class="word-blue">større end</span> bilen. Og lastbilen er den <span class="word-green">største</span>!"
            </div>
            <button class="listen-btn" title="${isEn ? 'Listen to flow' : 'Hør hele sammenligningen'}">
                <span>🔊</span> ${isEn ? 'Listen to natural flow' : 'Hør hele sætningsforløbet'}
            </button>
        `;
        const listenBtn = resultBox.querySelector('.listen-btn');
        listenBtn.onclick = () => speakDanish("Bilen er stor. Men varevognen er større end bilen. Og lastbilen er den største!");
        part1Container.appendChild(resultBox);

        // Interactive Adjective Playground (Trinvis interaktiv sammenligning)
        const playgroundCard = document.createElement('div');
        playgroundCard.className = 'adj-playground-card';
        playgroundCard.innerHTML = `
            <h3>${isEn ? '🔍 Interactive Comparison Explorer: Explore different adjectives' : '🔍 Interaktiv gradbøjnings-udforsker: Prøv forskellige adjektiver'}</h3>
            <p style="opacity: 0.85; margin-bottom: 1.2rem;">
                ${isEn 
                    ? 'Click on an adjective below to see how the scale grows from positive to comparative and superlative:' 
                    : 'Klik på et adjektiv nedenfor for at se hvordan skalaen vokser fra grundform til sammenligning og vinderen:'
                }
            </p>
            <div class="adj-pill-selector" id="adj-pills-row"></div>
            <div class="adj-interactive-display" id="adj-interactive-display"></div>
        `;
        part1Container.appendChild(playgroundCard);

        const adjList = [
            { id: 'stor', pos: 'stor', komp: 'større', sup: 'størst', exPos: 'Min bil er stor.', exKomp: 'Min bil er større end cyklen.', exSup: 'Denne lastbil er størst af alle.', icon: '📦' },
            { id: 'hurtig', pos: 'hurtig', komp: 'hurtigere', sup: 'hurtigst', exPos: 'Cyklen er hurtig.', exKomp: 'Bilen er hurtigere end cyklen.', exSup: 'Flyet er hurtigst.', icon: '⚡' },
            { id: 'hoej', pos: 'høj', komp: 'højere', sup: 'højest', exPos: 'Træet er højt.', exKomp: 'Rundetårn er højere end træet.', exSup: 'Mount Everest er højest i verden.', icon: '🏔️' },
            { id: 'kold', pos: 'kold', komp: 'koldere', sup: 'koldest', exPos: 'Vinteren er kold.', exKomp: 'I dag er koldere end i går.', exSup: 'Nordpolen er koldest.', icon: '❄️' },
            { id: 'god', pos: 'god', komp: 'bedre', sup: 'bedst', exPos: 'Kagen er god.', exKomp: 'Kagen her er bedre end den anden.', exSup: 'Mormors kage er absolut bedst!', icon: '⭐' },
            { id: 'lille', pos: 'lille', komp: 'mindre', sup: 'mindst', exPos: 'Musen er lille.', exKomp: 'Musen er mindre end katten.', exSup: 'Myren er mindst.', icon: '🐜' },
            { id: 'gammel', pos: 'gammel', komp: 'ældre', sup: 'ældst', exPos: 'Bogen er gammel.', exKomp: 'Peter er ældre end Mads.', exSup: 'Bedstefar er ældst i familien.', icon: '📜' },
            { id: 'varm', pos: 'varm', komp: 'varmere', sup: 'varmest', exPos: 'Solen er varm.', exKomp: 'Sommeren er varmere end foråret.', exSup: 'Ørkenen er varmest.', icon: '☀️' }
        ];

        let selectedAdjId = 'stor';

        function renderPlaygroundDisplay() {
            const current = adjList.find(a => a.id === selectedAdjId) || adjList[0];
            const pillsRow = playgroundCard.querySelector('#adj-pills-row');
            const display = playgroundCard.querySelector('#adj-interactive-display');

            pillsRow.innerHTML = adjList.map(a => `
                <button class="adj-pill-btn ${a.id === selectedAdjId ? 'active' : ''}" data-id="${a.id}">
                    <span>${a.icon}</span> ${a.pos}
                </button>
            `).join('');

            pillsRow.querySelectorAll('.adj-pill-btn').forEach(btn => {
                btn.onclick = () => {
                    selectedAdjId = btn.dataset.id;
                    renderPlaygroundDisplay();
                };
            });

            display.innerHTML = `
                <div class="display-columns">
                    <!-- Column 1: Positiv -->
                    <div class="display-col col-pos">
                        <div class="col-tier-label">
                            <span class="term-fagterm">1. Positiv</span>
                            <span class="term-everyday">1. Beskrivelse</span>
                        </div>
                        <div class="col-word">${current.pos}</div>
                        <div class="col-meter"><div class="meter-fill" style="width: 35%;"></div></div>
                        <div class="col-example">"${current.exPos}"</div>
                        <button class="listen-btn-mini col-audio-btn" data-text="${current.exPos}">🔊 Hør</button>
                    </div>

                    <!-- Column 2: Komparativ -->
                    <div class="display-col col-komp">
                        <div class="col-tier-label">
                            <span class="term-fagterm">2. Komparativ</span>
                            <span class="term-everyday">2. Sammenligning</span>
                        </div>
                        <div class="col-word">${current.komp}</div>
                        <div class="col-meter"><div class="meter-fill" style="width: 65%;"></div></div>
                        <div class="col-example">"${current.exKomp}"</div>
                        <button class="listen-btn-mini col-audio-btn" data-text="${current.exKomp}">🔊 Hør</button>
                    </div>

                    <!-- Column 3: Superlativ -->
                    <div class="display-col col-sup">
                        <div class="col-tier-label">
                            <span class="term-fagterm">3. Superlativ</span>
                            <span class="term-everyday">3. Vinderen</span>
                        </div>
                        <div class="col-word">${current.sup}</div>
                        <div class="col-meter"><div class="meter-fill" style="width: 100%;"></div></div>
                        <div class="col-example">"${current.exSup}"</div>
                        <button class="listen-btn-mini col-audio-btn" data-text="${current.exSup}">🔊 Hør</button>
                    </div>
                </div>
            `;

            display.querySelectorAll('.col-audio-btn').forEach(btn => {
                btn.onclick = () => speakDanish(btn.dataset.text);
            });
        }

        renderPlaygroundDisplay();
    }

    // ==============================================================
    // --- 2. DEL: BESTEMT FORM & E-REGLEN (DEN / MIN / DENNE) ------
    // ==============================================================
    function setupPart2() {
        const introCard = document.createElement('div');
        introCard.className = 'adj-hero-card';
        introCard.innerHTML = `
            <h2>${isEn ? 'The Definite -E Rule: Why does it say "den store bil" and "min store bil"?' : 'Den gyldne E-regel: Hvorfor hedder det "den store bil" og "min store bil"?'}</h2>
            <p class="hero-desc">
                ${isEn 
                    ? 'In Danish, an adjective must change into its <strong>definite form</strong> by adding <strong>-e</strong> whenever the topic is made specific or owned!<br>' +
                      '• <strong>Indefinite:</strong> <em>en stor bil</em> (fælleskøn) | <em>et stort hus</em> (-t in intetkøn).<br>' +
                      '• <strong>Definite:</strong> As soon as we make it definite with an article (<em>den/det/de</em>), a possessive pronoun (<em>min/din/vores</em>), a demonstrative (<em>denne/dette</em>), or a name in genitive (<em>Peters</em>), <strong>the adjective ALWAYS adds -e</strong> regardless of gender!'
                    : 'Når et substantiv er ubestemt og ukendt, har adjektivet sin grundform (eller -t ved intetkøn):<br>' +
                      '• <strong>Ubestemt:</strong> <em>en stor bil</em> (fælleskøn) | <em>et stort hus</em> (intetkøn får -t).<br>' +
                      '• <strong>Men når emnet er BESTEMT:</strong> Så snart emnet bliver kendt, udpeget eller ejet, SKAL adjektivet altid have <strong>-e</strong> på – uanset om det er fælleskøn eller intetkøn!<br>' +
                      '<em>den stor<strong>e</strong> bil</em> • <em>det stor<strong>e</strong> hus</em> • <em>min stor<strong>e</strong> bil</em> • <em>denne stor<strong>e</strong> bil</em>'
                }
            </p>
        `;
        part2Container.appendChild(introCard);

        // Visual Formula Box
        const formulaBox = document.createElement('div');
        formulaBox.className = 'adj-formula-box';
        formulaBox.innerHTML = `
            <div class="formula-title">
                ${isEn ? '📐 The Definite Adjective Formula:' : '📐 Formlen for adjektivets bestemte form:'}
            </div>
            <div class="formula-components">
                <div class="formula-chip chip-marker">
                    <span class="chip-type">
                        <span class="term-fagterm">Bestemt markør</span>
                        <span class="term-everyday">Kendt eller ejet</span>
                    </span>
                    <span class="chip-val">den / min / denne / Peters</span>
                </div>
                <div class="formula-plus">+</div>
                <div class="formula-chip chip-adj">
                    <span class="chip-type">
                        <span class="term-fagterm">Adjektiv + -E</span>
                        <span class="term-everyday">Beskrivelse + -E</span>
                    </span>
                    <span class="chip-val">stor<strong>e</strong> / ny<strong>e</strong> / flot<strong>te</strong></span>
                </div>
                <div class="formula-plus">+</div>
                <div class="formula-chip chip-noun">
                    <span class="chip-type">
                        <span class="term-fagterm">Substantiv</span>
                        <span class="term-everyday">Navneord</span>
                    </span>
                    <span class="chip-val">bil / hus / cykel</span>
                </div>
            </div>
            <div class="formula-rule-note">
                💡 <strong>Husk:</strong> Ved bestemt form mister intetkøn sit "-t" (<em>et stor<strong>t</strong> hus</em> ➔ <em>det stor<strong>e</strong> hus</em> / <em>mit stor<strong>e</strong> hus</em>)!
            </div>
        `;
        part2Container.appendChild(formulaBox);

        // 4 Scenarios Cards
        const scenariosGrid = document.createElement('div');
        scenariosGrid.className = 'scenarios-grid-4';

        const scenarios = [
            {
                titleFagterm: '1. Bestemt artikel',
                titleEveryday: '1. Kendeord for kendte ting',
                determiners: 'den / det / de',
                examples: [
                    'Hvor er <strong style="color: #f472b6;">den store</strong> bil?',
                    'Vi bor i <strong style="color: #f472b6;">det store</strong> hus.',
                    'Se <strong style="color: #f472b6;">de store</strong> træer.'
                ],
                fullSentence: 'Hvor er den store bil? Vi bor i det store hus. Se de store træer.',
                badgeFagterm: 'Bestemt artikel (den/det/de)',
                badgeEveryday: 'Kendeord for kendte ting',
                icon: '🎯'
            },
            {
                titleFagterm: '2. Possessivt pronomen',
                titleEveryday: '2. Ejestedord (Hvem der ejer)',
                determiners: 'min / din / hans / hendes / vores / deres',
                examples: [
                    'Det er <strong style="color: #f472b6;">min store</strong> bil.',
                    'Har du set <strong style="color: #f472b6;">hendes nye</strong> cykel?',
                    'Vi elsker <strong style="color: #f472b6;">vores gamle</strong> have.'
                ],
                fullSentence: 'Det er min store bil. Har du set hendes nye cykel? Vi elsker vores gamle have.',
                badgeFagterm: 'Possessivt pronomen (ejestedord)',
                badgeEveryday: 'Ejestedord (min, din, vores...)',
                icon: '🔑'
            },
            {
                titleFagterm: '3. Demonstrativt pronomen',
                titleEveryday: '3. Påpegende ord (Peger direkte)',
                determiners: 'denne / dette / disse',
                examples: [
                    'Jeg vil købe <strong style="color: #f472b6;">denne flotte</strong> trøje.',
                    'Kender du <strong style="color: #f472b6;">dette gamle</strong> sagn?',
                    'Hvem ejer <strong style="color: #f472b6;">disse hurtige</strong> biler?'
                ],
                fullSentence: 'Jeg vil købe denne flotte trøje. Kender du dette gamle sagn? Hvem ejer disse hurtige biler?',
                badgeFagterm: 'Demonstrativt pronomen (påpegende)',
                badgeEveryday: 'Påpegende ord (denne, dette, disse)',
                icon: '👉'
            },
            {
                titleFagterm: '4. Genitiv (Ejefald)',
                titleEveryday: '4. Navn med -s (Ejerskab)',
                determiners: "Peters / Marias / Lærerens",
                examples: [
                    'Det er <strong style="color: #f472b6;">Peters store</strong> computer.',
                    'Vi besøger <strong style="color: #f472b6;">Marias hyggelige</strong> lejlighed.',
                    'Hvor er <strong style="color: #f472b6;">lærerens røde</strong> kuglepen?'
                ],
                fullSentence: 'Det er Peters store computer. Vi besøger Marias hyggelige lejlighed.',
                badgeFagterm: 'Genitiv (ejefald med -s)',
                badgeEveryday: 'Navn med -s (Peter, Maria...)',
                icon: '👤'
            }
        ];

        scenarios.forEach(sc => {
            const card = document.createElement('div');
            card.className = 'scenario-card';
            card.innerHTML = `
                <div class="scenario-header">
                    <span class="sc-icon">${sc.icon}</span>
                    <div class="sc-title">
                        <span class="term-fagterm">${sc.titleFagterm}</span>
                        <span class="term-everyday">${sc.titleEveryday}</span>
                    </div>
                </div>
                <div class="sc-determiners">
                    <code>${sc.determiners}</code>
                </div>
                <ul class="sc-examples-list">
                    ${sc.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
                <div class="sc-footer">
                    <button class="listen-btn-mini sc-listen-btn" title="Hør eksempler">🔊 Lyt</button>
                    <div class="grammar-badge">
                        🏷️ 
                        <span class="term-fagterm">${sc.badgeFagterm}</span>
                        <span class="term-everyday">${sc.badgeEveryday}</span>
                    </div>
                </div>
            `;
            const audioBtn = card.querySelector('.sc-listen-btn');
            audioBtn.onclick = () => speakDanish(sc.fullSentence);
            scenariosGrid.appendChild(card);
        });
        part2Container.appendChild(scenariosGrid);

        // Special Section: Bestemt Superlativ ("Den største bil")
        const superDefiniteCard = document.createElement('div');
        superDefiniteCard.className = 'super-definite-card';
        superDefiniteCard.innerHTML = `
            <div class="super-def-content">
                <div class="super-def-badge">🌟 ${isEn ? 'Definite Superlative:' : 'Superlativ i bestemt form:'}</div>
                <h3>${isEn ? 'Also adds -e: "Den største bil" & "Min bedste ven"' : 'Får også altid -e: "Den største bil" & "Min bedste ven"'}</h3>
                <p>
                    ${isEn 
                        ? 'When a superlative is used with a definite article (<em>den/det/de</em>) or possessive pronoun (<em>min/din</em>), it also gets the ending <strong>-e</strong>!<br>' +
                          '• Alone / Predicative: <em>Lastbilen er <strong>størst</strong>.</em><br>' +
                          '• Definite with article: <em>Det er <strong>den største</strong> lastbil på vejen.</em><br>' +
                          '• With possessive pronoun: <em>Peter er <strong>min bedste</strong> ven.</em>'
                        : 'Når et adjektiv i superlativ (højeste grad) står sammen med en bestemt artikel (<em>den/det/de</em>) eller et possessivt pronomen (<em>min/din/vores</em>), får superlativet også endelsen <strong>-e</strong>!<br>' +
                          '• Stående alene: <em>Lastbilen er <strong>størst</strong>.</em><br>' +
                          '• Bestemt med kendeord: <em>Det er <strong>den største</strong> lastbil på vejen.</em><br>' +
                          '• Med ejestedord: <em>Peter er <strong>min bedste</strong> ven.</em>'
                    }
                </p>
                <button class="listen-btn-mini super-def-listen" style="margin-top: 0.5rem;">
                    🔊 ${isEn ? 'Listen to examples' : 'Hør eksempler'}
                </button>
            </div>
        `;
        const superListen = superDefiniteCard.querySelector('.super-def-listen');
        superListen.onclick = () => speakDanish("Lastbilen er størst. Det er den største lastbil på vejen. Peter er min bedste ven.");
        part2Container.appendChild(superDefiniteCard);

        // Interactive Definite-E Simulator ("Prøv E-reglen live")
        const simulatorCard = document.createElement('div');
        simulatorCard.className = 'adj-simulator-card';
        simulatorCard.innerHTML = `
            <h3>${isEn ? '🎛️ Definite -E Simulator: Try it live' : '🎛️ E-regelsimulator: Prøv det i praksis'}</h3>
            <p style="opacity: 0.85; margin-bottom: 1.2rem;">
                ${isEn 
                    ? 'Switch between different determiners and watch how the adjective changes into its definite form with -e:' 
                    : 'Skift mellem forskellige markører og se hvordan adjektivet automatisk tilføjer -e:'
                }
            </p>
            <div class="sim-selector-row" id="sim-noun-row"></div>
            <div class="sim-modes-row" id="sim-modes-row"></div>
            <div class="sim-result-box" id="sim-result-box"></div>
        `;
        part2Container.appendChild(simulatorCard);

        const simNouns = [
            { id: 'bil', base: 'bil', gender: 'en', adj: 'stor', adjDef: 'store', intet: false },
            { id: 'hus', base: 'hus', gender: 'et', adj: 'stort', adjDef: 'store', intet: true },
            { id: 'cykel', base: 'cykel', gender: 'en', adj: 'hurtig', adjDef: 'hurtige', intet: false },
            { id: 'barn', base: 'barn', gender: 'et', adj: 'lille', adjDef: 'lille', intet: true }
        ];

        const simModes = [
            { id: 'ubestemt', labelFagterm: 'Ubestemt form', labelEveryday: 'Ukendt (1. gang)', icon: '❓' },
            { id: 'artikel', labelFagterm: 'Bestemt artikel', labelEveryday: 'Kendeord (den/det)', icon: '🎯' },
            { id: 'possessiv', labelFagterm: 'Possessivt pronomen', labelEveryday: 'Ejestedord (min/mit)', icon: '🔑' },
            { id: 'demonstrativ', labelFagterm: 'Demonstrativt pronomen', labelEveryday: 'Påpegende (denne/dette)', icon: '👉' },
            { id: 'superlativ', labelFagterm: 'Bestemt superlativ', labelEveryday: 'Vinderen i bestemt form', icon: '🌟' }
        ];

        let currentSimNounId = 'bil';
        let currentSimModeId = 'artikel';

        function renderSimulator() {
            const noun = simNouns.find(n => n.id === currentSimNounId) || simNouns[0];
            const nounRow = simulatorCard.querySelector('#sim-noun-row');
            const modesRow = simulatorCard.querySelector('#sim-modes-row');
            const resultBox = simulatorCard.querySelector('#sim-result-box');

            nounRow.innerHTML = simNouns.map(n => `
                <button class="sim-pill-btn ${n.id === currentSimNounId ? 'active' : ''}" data-id="${n.id}">
                    ${n.gender} ${n.base}
                </button>
            `).join('');

            nounRow.querySelectorAll('.sim-pill-btn').forEach(btn => {
                btn.onclick = () => {
                    currentSimNounId = btn.dataset.id;
                    renderSimulator();
                };
            });

            modesRow.innerHTML = simModes.map(m => `
                <button class="sim-mode-btn ${m.id === currentSimModeId ? 'active' : ''}" data-id="${m.id}">
                    <span class="sim-m-icon">${m.icon}</span>
                    <span class="term-fagterm">${m.labelFagterm}</span>
                    <span class="term-everyday">${m.labelEveryday}</span>
                </button>
            `).join('');

            modesRow.querySelectorAll('.sim-mode-btn').forEach(btn => {
                btn.onclick = () => {
                    currentSimModeId = btn.dataset.id;
                    renderSimulator();
                };
            });

            // Calculate phrase
            let marker = '';
            let adjWord = '';
            let explanation = '';

            if (currentSimModeId === 'ubestemt') {
                marker = noun.gender;
                adjWord = noun.adj;
                explanation = noun.intet 
                    ? `Intetkøn ("et") ➔ adjektivet får -t: "et ${adjWord} ${noun.base}".` 
                    : `Fælleskøn ("en") ➔ adjektivet har grundform: "en ${adjWord} ${noun.base}".`;
            } else if (currentSimModeId === 'artikel') {
                marker = noun.intet ? 'det' : 'den';
                adjWord = noun.adjDef;
                explanation = `Bestemt artikel ("${marker}") kræver endelsen <strong>-e</strong> på adjektivet: "${marker} ${adjWord} ${noun.base}".`;
            } else if (currentSimModeId === 'possessiv') {
                marker = noun.intet ? 'mit' : 'min';
                adjWord = noun.adjDef;
                explanation = `Possessivt pronomen ("${marker}") viser ejerskab ➔ adjektivet får altid <strong>-e</strong>: "${marker} ${adjWord} ${noun.base}".`;
            } else if (currentSimModeId === 'demonstrativ') {
                marker = noun.intet ? 'dette' : 'denne';
                adjWord = noun.adjDef;
                explanation = `Demonstrativt pronomen ("${marker}") peger på tingen ➔ adjektivet får altid <strong>-e</strong>: "${marker} ${adjWord} ${noun.base}".`;
            } else if (currentSimModeId === 'superlativ') {
                marker = noun.intet ? 'det' : 'den';
                const supWord = noun.id === 'bil' || noun.id === 'hus' ? 'største' : (noun.id === 'cykel' ? 'hurtigste' : 'mindste');
                adjWord = supWord;
                explanation = `Bestemt superlativ ("${marker} ${adjWord}") tager også <strong>-e</strong> som afslutning!`;
            }

            const fullPhrase = `${marker} ${adjWord} ${noun.base}`;

            resultBox.innerHTML = `
                <div class="sim-phrase-display">
                    <span class="sim-marker">${marker}</span> 
                    <span class="sim-adj">${adjWord}</span> 
                    <span class="sim-noun">${noun.base}</span>
                </div>
                <div class="sim-explanation">${explanation}</div>
                <button class="listen-btn-mini sim-listen-btn">
                    <span>🔊</span> Lyt til udtale
                </button>
            `;

            resultBox.querySelector('.sim-listen-btn').onclick = () => speakDanish(fullPhrase);
        }

        renderSimulator();
    }

    // ==============================================================
    // --- 3. DEL: TRÆN SELV (VALG & SÆTNINGSBYGGER) ----------------
    // ==============================================================
    function setupPart3() {
        // Sub-tabs: 3A (Vælg form) vs. 3B (Sætningsbygger)
        const subTabsRow = document.createElement('div');
        subTabsRow.className = 'adj-subtabs-row';
        subTabsRow.innerHTML = `
            <button class="subtab-btn active" id="subtab-btn-choice">
                📝 ${isEn ? 'Activity 1: Choose the correct form' : 'Aktivitet 1: Vælg den rigtige form'}
            </button>
            <button class="subtab-btn" id="subtab-btn-builder">
                🧩 ${isEn ? 'Activity 2: Sentence Builder Puzzle' : 'Aktivitet 2: Sætningsbygger / Puslespil'}
            </button>
        `;
        part3Container.appendChild(subTabsRow);

        const choiceSection = document.createElement('div');
        choiceSection.className = 'adj-subtab-content active';

        const builderSection = document.createElement('div');
        builderSection.className = 'adj-subtab-content';
        builderSection.style.display = 'none';

        part3Container.appendChild(choiceSection);
        part3Container.appendChild(builderSection);

        const btnChoice = subTabsRow.querySelector('#subtab-btn-choice');
        const btnBuilder = subTabsRow.querySelector('#subtab-btn-builder');

        btnChoice.onclick = () => {
            btnChoice.classList.add('active');
            btnBuilder.classList.remove('active');
            choiceSection.style.display = 'block';
            builderSection.style.display = 'none';
        };

        btnBuilder.onclick = () => {
            btnBuilder.classList.add('active');
            btnChoice.classList.remove('active');
            choiceSection.style.display = 'none';
            builderSection.style.display = 'block';
        };

        // --- SUBTAB 1: VÆLG DEN RIGTIGE FORM ---
        const practiceSets = [
            // Sæt 1
            [
                { 
                    text: "Min bil er [blank_0] end din cykel.", 
                    options: ["hurtig", "hurtigere", "hurtigst"], 
                    answer: "hurtigere", 
                    ruleType: "komparativ",
                    feedback: "Korrekt! Ordet 'end' viser at to ting sammenlignes ➔ brug komparativ (hurtigere).",
                    hints: {
                        "hurtig": "Husk: Ordet 'end' viser at to ting sammenlignes. Så skal vi bruge komparativ form.",
                        "hurtigst": "Vi sammenligner kun to ting her. Superlativ bruges når noget overgår alle andre."
                    }
                },
                { 
                    text: "Peter vasker sin [blank_1] bil hver lørdag.", 
                    options: ["ny", "nyt", "nye"], 
                    answer: "nye", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! Ordet 'sin' er et possessivt pronomen (ejestedord) ➔ adjektivet skal have -e på!",
                    hints: {
                        "ny": "Her står 'sin' (ejestedord). Når tingen er ejet eller bestemt, skal adjektivet altid have -e.",
                        "nyt": "'En bil' er fælleskøn, men vigtigst: Med 'sin' tilføjes altid -e (den nye bil / sin nye bil)."
                    }
                },
                { 
                    text: "Mount Everest er det [blank_2] bjerg i verden.", 
                    options: ["høj", "højere", "højeste"], 
                    answer: "højeste", 
                    ruleType: "superlativ",
                    feedback: "Korrekt! Mount Everest overgår alle andre bjerge ➔ vinderen får superlativ i bestemt form (-este).",
                    hints: {
                        "høj": "Vi taler om hele verdens bjerge, så det er det allerhøjeste bjerg af alle.",
                        "højere": "Vi sammenligner ikke kun to bjerge. Mount Everest er nummer 1 blandt alle."
                    }
                },
                { 
                    text: "Hvor bor den [blank_3] dame henne?", 
                    options: ["gammel", "gammelt", "gamle"], 
                    answer: "gamle", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! 'Den' er en bestemt artikel ➔ adjektivet skal altid ende på -e (gamle).",
                    hints: {
                        "gammel": "Her står kendeordet 'den'. I bestemt form skal adjektivet have -e på.",
                        "gammelt": "-t bruges ved ubestemt intetkøn (et gammelt hus), ikke ved 'den dame'."
                    }
                },
                { 
                    text: "I dag er vejret [blank_4] end i går.", 
                    options: ["kold", "koldere", "koldest"], 
                    answer: "koldere", 
                    ruleType: "komparativ",
                    feedback: "Korrekt! To dage sammenlignes med 'end' ➔ komparativ (koldere).",
                    hints: {
                        "kold": "Der står 'end' i sætningen, så vi sammenligner vejret i dag med i går.",
                        "koldest": "Vi sammenligner to dage. Superlativ bruges hvis det var årets koldeste dag."
                    }
                }
            ],
            // Sæt 2
            [
                { 
                    text: "Hun købte en meget [blank_0] taske i butikken.", 
                    options: ["dyr", "dyrt", "dyre"], 
                    answer: "dyr", 
                    ruleType: "positiv",
                    feedback: "Korrekt! 'En taske' er ubestemt fælleskøn ➔ adjektivet har grundform (dyr).",
                    hints: {
                        "dyrt": "'En taske' er fælleskøn (en), så det tager ikke -t.",
                        "dyre": "Der er kun tale om én ubestemt taske, så der skal ikke -e på."
                    }
                },
                { 
                    text: "Hvem ejer denne [blank_1] cykel?", 
                    options: ["flot", "flottere", "flotte"], 
                    answer: "flotte", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! 'Denne' er et påpegende ord (demonstrativt pronomen) ➔ adjektivet skal have -e (flotte).",
                    hints: {
                        "flot": "Når vi bruger 'denne/dette', er emnet bestemt, og adjektivet skal altid have -e.",
                        "flottere": "Vi sammenligner ikke to cykler her, vi udpeger blot denne flotte cykel."
                    }
                },
                { 
                    text: "Min hund er [blank_2] end din kat.", 
                    options: ["stor", "større", "størst"], 
                    answer: "større", 
                    ruleType: "komparativ",
                    feedback: "Korrekt! Sammenligning af to dyr med 'end' ➔ brug komparativ (større).",
                    hints: {
                        "stor": "Der står 'end', så de to dyr sammenlignes.",
                        "størst": "Vi sammenligner kun to dyr. Størst bruges om vinderen i en hel gruppe."
                    }
                },
                { 
                    text: "Peter er min [blank_3] ven.", 
                    options: ["god", "bedre", "bedste"], 
                    answer: "bedste", 
                    ruleType: "superlativ",
                    feedback: "Korrekt! 'Min bedste ven' er bestemt superlativ (den ven der overgår alle andre).",
                    hints: {
                        "god": "Her kårer vi den ven der er nummer 1 blandt alle.",
                        "bedre": "'Bedre' bruges kun ved direkte sammenligning med 'end'."
                    }
                },
                { 
                    text: "Vi bor i det [blank_4] hus for enden af vejen.", 
                    options: ["hvid", "hvidt", "hvide"], 
                    answer: "hvide", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! 'Det' er en bestemt artikel ➔ adjektivet skal altid have -e på (det hvide hus).",
                    hints: {
                        "hvid": "Kendeordet 'det' gør substantivet bestemt, så adjektivet skal have -e.",
                        "hvidt": "Ubestemt hedder 'et hvidt hus', men i bestemt form med 'det' forsvinder -t og bliver til -e."
                    }
                }
            ],
            // Sæt 3
            [
                { 
                    text: "Geparden er det [blank_0] landdyr på jorden.", 
                    options: ["hurtig", "hurtigere", "hurtigste"], 
                    answer: "hurtigste", 
                    ruleType: "superlativ",
                    feedback: "Korrekt! Geparden overgår alle andre landdyr på jorden ➔ vinderen skal have superlativ i bestemt form (-este).",
                    hints: {
                        "hurtig": "Geparden er den absolut hurtigste af alle landdyr.",
                        "hurtigere": "Vi sammenligner den ikke kun med ét andet dyr, men kårer vinderen på jorden."
                    }
                },
                { 
                    text: "Hvor har du lagt min [blank_1] jakke?", 
                    options: ["varm", "varmt", "varme"], 
                    answer: "varme", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! 'Min' er et possessivt pronomen (ejestedord) ➔ adjektivet skal altid have -e!",
                    hints: {
                        "varm": "Der står 'min' (ejestedord). Når tingen er ejet, skal adjektivet have -e.",
                        "varmt": "'Jakke' er en en-ord, og 'min' kræver -e (min varme jakke)."
                    }
                },
                { 
                    text: "Dette æble er [blank_2] end pæren.", 
                    options: ["sød", "sødere", "sødest"], 
                    answer: "sødere", 
                    ruleType: "komparativ",
                    feedback: "Korrekt! Æblet og pæren sammenlignes med 'end' ➔ komparativ (sødere).",
                    hints: {
                        "sød": "Ordet 'end' signalerer direkte sammenligning af to frugter.",
                        "sødest": "Superlativ bruges når noget er det sødeste af alt."
                    }
                },
                { 
                    text: "Det er et [blank_3] barn.", 
                    options: ["glad", "gladt", "glade"], 
                    answer: "gladt", 
                    ruleType: "positiv",
                    feedback: "Korrekt! 'Et barn' er ubestemt intetkøn ➔ adjektivet får -t (gladt).",
                    hints: {
                        "glad": "'Et barn' er intetkøn, så adjektivet skal have -t i ubestemt form.",
                        "glade": "-e bruges ved bestemt form (det glade barn) eller flertal (glade børn)."
                    }
                },
                { 
                    text: "Det er Peters [blank_4] computer.", 
                    options: ["hurtig", "hurtigt", "hurtige"], 
                    answer: "hurtige", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! 'Peters' er genitiv (ejefald) ➔ adjektivet skal altid have -e på!",
                    hints: {
                        "hurtig": "Ved navne i ejefald (Peters) gælder e-reglen altid.",
                        "hurtigt": "-t bortfalder ved bestemt form og ejerskab ➔ der skal -e på."
                    }
                }
            ],
            // Sæt 4
            [
                { 
                    text: "I dag er den [blank_0] dag på hele året.", 
                    options: ["varm", "varmere", "varmeste"], 
                    answer: "varmeste", 
                    ruleType: "superlativ",
                    feedback: "Korrekt! Dagen overgår alle andre 364 dage ➔ superlativ i bestemt form (-este).",
                    hints: {
                        "varm": "Dagen kåres blandt hele årets dage som den absolut højeste temperatur.",
                        "varmere": "Vi sammenligner ikke to dage her, men kårer årets absolutte vinder."
                    }
                },
                { 
                    text: "Sofie elsker vores [blank_1] havemøbler.", 
                    options: ["gammel", "gammelt", "gamle"], 
                    answer: "gamle", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! 'Vores' er et possessivt pronomen ➔ adjektivet skal have -e på (gamle).",
                    hints: {
                        "gammel": "Her står 'vores' (ejestedord). Der skal altid -e på adjektivet.",
                        "gammelt": "Intetkøns-t bruges kun ubestemt ('et gammelt bord'), ikke med 'vores'."
                    }
                },
                { 
                    text: "Bogen er [blank_2] end hæftet.", 
                    options: ["tung", "tungere", "tungest"], 
                    answer: "tungere", 
                    ruleType: "komparativ",
                    feedback: "Korrekt! To genstande sammenlignes med 'end' ➔ brug komparativ (tungere).",
                    hints: {
                        "tung": "Ordet 'end' viser at bog og hæfte sammenlignes.",
                        "tungest": "Vi sammenligner kun to ting her."
                    }
                },
                { 
                    text: "Må jeg låne den [blank_3] blyant?", 
                    options: ["rød", "rødt", "røde"], 
                    answer: "røde", 
                    ruleType: "e_regel",
                    feedback: "Korrekt! Bestemt artikel 'den' kræver altid -e på adjektivet (den røde blyant).",
                    hints: {
                        "rød": "Der står 'den' (bestemt artikel), så adjektivet skal have -e.",
                        "rødt": "'Blyant' er fælleskøn, og 'den' kræver altid -e."
                    }
                },
                { 
                    text: "Dette er det [blank_4] stykke kage.", 
                    options: ["lille", "mindre", "mindste"], 
                    answer: "mindste", 
                    ruleType: "superlativ",
                    feedback: "Korrekt! Stykket overgår alle andre stykker på fadet ➔ bestemt superlativ (mindste).",
                    hints: {
                        "lille": "Vi taler om kagen i forhold til alle de andre stykker på fadet.",
                        "mindre": "Mindre bruges ved sammenligning af to stykker med 'end'."
                    }
                }
            ]
        ];

        let currentSetIdx = 0;

        function renderChoiceExercise() {
            const currentQuestions = practiceSets[currentSetIdx];
            choiceSection.innerHTML = `
                <div class="exercise-header-card">
                    <div class="set-indicator">
                        ${isEn ? 'Exercise set' : 'Øvelsessæt'} <strong>${currentSetIdx + 1}</strong> ${isEn ? 'of' : 'af'} ${practiceSets.length}
                    </div>
                    <p style="margin: 0.4rem 0 0; opacity: 0.9;">
                        ${isEn 
                            ? 'Select the correct adjective form. Think about: Is it comparing two things with "end"? Does it exceed all others? Or does it take -e due to "den / min / denne"?' 
                            : 'Vælg den rigtige adjektivform. Tænk over: Er der "end" (sammenligning)? Overgår den alle (vinderen)? Eller skal der -e på pga. "den / min / denne"?'
                        }
                    </p>
                </div>
                <div class="questions-list" id="questions-list"></div>
                <div class="exercise-summary-bar" id="exercise-summary-bar"></div>
                <div style="text-align: center; margin-top: 1.5rem;">
                    <button class="next-set-btn" id="next-set-btn" style="display: none;">
                        ${isEn ? 'Try Next Exercise Set ➔' : 'Prøv næste øvelsessæt ➔'}
                    </button>
                </div>
            `;

            const listContainer = choiceSection.querySelector('#questions-list');
            const summaryBar = choiceSection.querySelector('#exercise-summary-bar');
            const nextBtn = choiceSection.querySelector('#next-set-btn');

            currentQuestions.forEach((q, i) => {
                const row = document.createElement('div');
                row.className = 'practice-row';

                const promptHtml = q.text.replace(/\[blank_\d+\]/, `
                    <select class="adj-select" data-qidx="${i}">
                        <option value="">...</option>
                        ${q.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                `);

                row.innerHTML = `
                    <div class="q-num-badge">${i + 1}</div>
                    <div class="q-content">
                        <div class="question-sentence">${promptHtml}</div>
                        <div class="feedback-msg" id="q-feedback-${i}" style="display: none;"></div>
                    </div>
                `;
                listContainer.appendChild(row);
            });

            const selects = listContainer.querySelectorAll('.adj-select');

            function checkSummary() {
                const filled = Array.from(selects).filter(s => s.value !== "").length;
                const correct = Array.from(selects).filter(s => s.classList.contains('correct')).length;
                const total = selects.length;

                if (filled === 0) {
                    summaryBar.innerHTML = '';
                    nextBtn.style.display = 'none';
                } else if (correct === total) {
                    summaryBar.innerHTML = `
                        <div class="summary-success">
                            🎉 <strong>${isEn ? 'Fantastic! All 5 answers are correct!' : 'Fantastisk! Alle 5 svar er helt rigtige!'}</strong>
                        </div>
                    `;
                    nextBtn.style.display = 'inline-block';
                } else {
                    summaryBar.innerHTML = `
                        <div class="summary-progress">
                            ${filled} / ${total} ${isEn ? 'answered' : 'besvaret'} (${correct} ${isEn ? 'correct' : 'rigtige'})
                        </div>
                    `;
                    nextBtn.style.display = 'none';
                }
            }

            selects.forEach(sel => {
                sel.onchange = () => {
                    const idx = parseInt(sel.dataset.qidx);
                    const qData = currentQuestions[idx];
                    const fb = choiceSection.querySelector(`#q-feedback-${idx}`);

                    if (sel.value === qData.answer) {
                        sel.classList.add('correct');
                        sel.classList.remove('wrong');
                        fb.className = 'feedback-msg correct';
                        fb.innerHTML = `✓ ${qData.feedback}`;
                        fb.style.display = 'block';
                    } else if (sel.value === "") {
                        sel.classList.remove('correct', 'wrong');
                        fb.style.display = 'none';
                    } else {
                        sel.classList.add('wrong');
                        sel.classList.remove('correct');
                        fb.className = 'feedback-msg wrong';
                        const hint = qData.hints[sel.value] || "Tænk over om der sammenlignes to ting med 'end', om noget overgår alle, eller om der står 'den/min/denne'.";
                        fb.innerHTML = `⚠ ${hint}`;
                        fb.style.display = 'block';
                    }
                    checkSummary();
                };
            });

            nextBtn.onclick = () => {
                currentSetIdx = (currentSetIdx + 1) % practiceSets.length;
                renderChoiceExercise();
            };
        }

        renderChoiceExercise();

        // --- SUBTAB 2: SÆTNINGSBYGGER / PUSLESPIL ---
        const puzzleTasks = [
            {
                id: 'puz_1',
                title: isEn ? 'Task 1: Comparing two vehicles' : 'Opgave 1: Sammenlign to køretøjer',
                meaning: isEn ? 'My new car is faster than your old bicycle.' : 'Min nye bil er hurtigere end din gamle cykel.',
                words: ['Min', 'nye', 'bil', 'er', 'hurtigere', 'end', 'din', 'gamle', 'cykel.'],
                hint: isEn ? 'Notice both "nye" and "gamle" take -e after "min" and "din"!' : 'Læg mærke til at både "nye" og "gamle" får -e efter "min" og "din"!'
            },
            {
                id: 'puz_2',
                title: isEn ? 'Task 2: The largest vehicle' : 'Opgave 2: Det største køretøj',
                meaning: isEn ? 'The big truck is the heaviest on the road.' : 'Den store lastbil er den tungeste på vejen.',
                words: ['Den', 'store', 'lastbil', 'er', 'den', 'tungeste', 'på', 'vejen.'],
                hint: isEn ? '"Den store" has definite -e, and "den tungeste" has definite superlative -e!' : '"Den store" har bestemt -e, og "den tungeste" har bestemt superlativ -e!'
            },
            {
                id: 'puz_3',
                title: isEn ? 'Task 3: Ownership and comparison' : 'Opgave 3: Ejerskab og sammenligning',
                meaning: isEn ? "Peter's little dog is smaller than the cat." : 'Peters lille hund er mindre end katten.',
                words: ['Peters', 'lille', 'hund', 'er', 'mindre', 'end', 'katten.'],
                hint: isEn ? '"Peters" is genitive, and "mindre end" compares two animals.' : '"Peters" er ejefald (genitiv), og "mindre end" sammenligner de to dyr.'
            },
            {
                id: 'puz_4',
                title: isEn ? 'Task 4: Demonstrative and best fragrance' : 'Opgave 4: Påpegende ord og vinderen',
                meaning: isEn ? 'This beautiful flower smells best in the garden.' : 'Denne smukke blomst dufter bedst i haven.',
                words: ['Denne', 'smukke', 'blomst', 'dufter', 'bedst', 'i', 'haven.'],
                hint: isEn ? '"Denne" requires -e ("smukke"), while "bedst" is superlative.' : '"Denne" udløser -e ("smukke"), mens "bedst" er superlativ.'
            }
        ];

        let currentPuzzleIdx = 0;
        let placedWords = [];

        function renderPuzzle() {
            const task = puzzleTasks[currentPuzzleIdx];
            placedWords = [];

            // Shuffle words bank
            const shuffled = [...task.words].sort(() => Math.random() - 0.5);

            builderSection.innerHTML = `
                <div class="puzzle-header-card">
                    <div class="puzzle-pills-row">
                        ${puzzleTasks.map((t, idx) => `
                            <button class="puzzle-pill ${idx === currentPuzzleIdx ? 'active' : ''}" data-idx="${idx}">
                                ${idx + 1}
                            </button>
                        `).join('')}
                    </div>
                    <div class="puzzle-task-title">${task.title}</div>
                    <div class="puzzle-meaning-hint">💡 <em>"${task.meaning}"</em></div>
                    <div class="puzzle-rule-reminder">📌 ${task.hint}</div>
                </div>

                <div class="puzzle-target-area">
                    <div class="puzzle-slots-container" id="puzzle-slots-container">
                        <span class="puzzle-placeholder-text">${isEn ? 'Click words below to place them here...' : 'Klik på ordene nedenfor for at placere dem her...'}</span>
                    </div>
                </div>

                <div class="puzzle-bank-area">
                    <div class="puzzle-words-bank" id="puzzle-words-bank"></div>
                </div>

                <div class="puzzle-feedback-area" id="puzzle-feedback-area" style="display: none;"></div>
            `;

            const slotsContainer = builderSection.querySelector('#puzzle-slots-container');
            const wordsBank = builderSection.querySelector('#puzzle-words-bank');
            const feedbackArea = builderSection.querySelector('#puzzle-feedback-area');

            builderSection.querySelectorAll('.puzzle-pill').forEach(btn => {
                btn.onclick = () => {
                    currentPuzzleIdx = parseInt(btn.dataset.idx);
                    renderPuzzle();
                };
            });

            function updateSlots() {
                if (placedWords.length === 0) {
                    slotsContainer.innerHTML = `<span class="puzzle-placeholder-text">${isEn ? 'Click words below to place them here...' : 'Klik på ordene nedenfor for at placere dem her...'}</span>`;
                } else {
                    slotsContainer.innerHTML = placedWords.map((w, idx) => `
                        <div class="puzzle-slot filled" data-placed-idx="${idx}">
                            ${w} <span class="slot-remove">✕</span>
                        </div>
                    `).join('');

                    slotsContainer.querySelectorAll('.puzzle-slot.filled').forEach(slot => {
                        slot.onclick = () => {
                            const removeIdx = parseInt(slot.dataset.placedIdx);
                            const removedWord = placedWords.splice(removeIdx, 1)[0];
                            updateSlots();
                            updateBank();
                            checkPuzzleSolution();
                        };
                    });
                }
            }

            function updateBank() {
                wordsBank.innerHTML = '';
                shuffled.forEach((w, origIdx) => {
                    const timesInShuffled = shuffled.filter((item, i) => item === w && i <= origIdx).length;
                    const timesPlaced = placedWords.filter(item => item === w).length;
                    const isPlaced = timesPlaced >= timesInShuffled;

                    const wordBtn = document.createElement('button');
                    wordBtn.className = `puzzle-word-btn ${isPlaced ? 'placed' : ''}`;
                    wordBtn.textContent = w;
                    wordBtn.disabled = isPlaced;
                    wordBtn.onclick = () => {
                        if (!isPlaced) {
                            placedWords.push(w);
                            updateSlots();
                            updateBank();
                            checkPuzzleSolution();
                        }
                    };
                    wordsBank.appendChild(wordBtn);
                });
            }

            function checkPuzzleSolution() {
                if (placedWords.length === task.words.length) {
                    const targetSentence = task.words.join(' ');
                    const userSentence = placedWords.join(' ');

                    if (userSentence === targetSentence) {
                        feedbackArea.className = 'puzzle-feedback-area success';
                        feedbackArea.style.display = 'block';
                        feedbackArea.innerHTML = `
                            <div class="feedback-msg success">
                                🎉 <strong>${isEn ? 'Perfect! The sentence is completely correct!' : 'Perfekt! Sætningen er helt korrekt sammensat!'}</strong>
                            </div>
                            <div class="puzzle-action-row">
                                <button class="listen-btn-small" id="puzzle-listen-btn">
                                    🔊 ${isEn ? 'Listen to sentence' : 'Lyt til sætningen'}
                                </button>
                                ${currentPuzzleIdx < puzzleTasks.length - 1 ? `
                                    <button class="next-task-btn" id="puzzle-next-task-btn">
                                        ${isEn ? 'Next Task ➔' : 'Næste opgave ➔'}
                                    </button>
                                ` : ''}
                            </div>
                        `;

                        const listenBtn = feedbackArea.querySelector('#puzzle-listen-btn');
                        if (listenBtn) listenBtn.onclick = () => speakDanish(targetSentence);

                        const nextTaskBtn = feedbackArea.querySelector('#puzzle-next-task-btn');
                        if (nextTaskBtn) {
                            nextTaskBtn.onclick = () => {
                                currentPuzzleIdx++;
                                renderPuzzle();
                            };
                        }
                    } else {
                        feedbackArea.className = 'puzzle-feedback-area error';
                        feedbackArea.style.display = 'block';
                        feedbackArea.innerHTML = `
                            <div class="feedback-msg error">
                                ⚠ <strong>${isEn ? 'Not quite right yet.' : 'Ikke helt rigtigt endnu.'}</strong> ${isEn ? 'Check the order of adjectives and comparison words.' : 'Tjek rækkefølgen af adjektiver og ordet "end".'}
                            </div>
                            <div class="puzzle-action-row">
                                <button class="retry-task-btn" id="puzzle-retry-btn">
                                    🔄 ${isEn ? 'Clear & Try Again' : 'Ryd og prøv igen'}
                                </button>
                            </div>
                        `;
                        feedbackArea.querySelector('#puzzle-retry-btn').onclick = () => {
                            placedWords = [];
                            updateSlots();
                            updateBank();
                            feedbackArea.style.display = 'none';
                        };
                    }
                } else {
                    feedbackArea.style.display = 'none';
                }
            }

            updateSlots();
            updateBank();
        }

        renderPuzzle();
    }

    // Initialize all 3 parts
    setupPart1();
    setupPart2();
    setupPart3();

    container.appendChild(viewContainer);

    // Dynamic Styles for Adjective Comparison View
    if (!document.getElementById('adj-comp-v2-styles')) {
        const style = document.createElement('style');
        style.id = 'adj-comp-v2-styles';
        style.textContent = `
            .adj-comparison-view {
                max-width: 960px;
                margin: 0 auto;
                padding: 1.5rem 1rem 4rem;
                color: #f8fafc;
            }

            /* Grammar Toggle Bar */
            .adj-grammar-toggle-bar {
                display: flex;
                justify-content: center;
                margin: 1rem 0 1.5rem;
            }

            .adj-grammar-toggle-btn {
                background: rgba(30, 41, 59, 0.85);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #e2e8f0;
                padding: 0.65rem 1.4rem;
                border-radius: 30px;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .adj-grammar-toggle-btn:hover {
                background: rgba(51, 65, 85, 0.95);
                border-color: rgba(255, 255, 255, 0.35);
                transform: translateY(-1px);
            }

            .adj-grammar-toggle-btn.everyday-mode {
                background: rgba(16, 185, 129, 0.2);
                border-color: #10b981;
                color: #6ee7b7;
            }

            .adj-grammar-toggle-btn .toggle-icon {
                font-size: 1.2rem;
            }

            .adj-grammar-toggle-btn .toggle-hint {
                opacity: 0.75;
                font-size: 0.85rem;
            }

            /* CSS Rule for Grammar Terms Switch */
            .hide-grammar-terms .term-fagterm {
                display: none !important;
            }
            .hide-grammar-terms .term-everyday {
                display: inline !important;
            }
            :not(.hide-grammar-terms) .term-fagterm {
                display: inline !important;
            }
            :not(.hide-grammar-terms) .term-everyday {
                display: none !important;
            }

            /* Grammar Banner */
            .adj-grammar-banner {
                display: flex;
                flex-wrap: wrap;
                gap: 1.2rem;
                justify-content: center;
                background: rgba(15, 23, 42, 0.65);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                padding: 0.8rem 1.4rem;
                margin-bottom: 2rem;
                font-size: 0.92rem;
            }

            .grammar-system-item {
                display: flex;
                align-items: center;
            }

            .grammar-dot {
                width: 11px;
                height: 11px;
                border-radius: 50%;
                margin-right: 0.5rem;
                display: inline-block;
            }

            /* Navigation Tabs */
            .adj-tabs-nav {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 0.75rem;
                margin-bottom: 2rem;
            }

            @media (max-width: 768px) {
                .adj-tabs-nav {
                    grid-template-columns: 1fr;
                }
            }

            .adj-tab-btn {
                background: rgba(30, 41, 59, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 12px;
                padding: 1rem;
                color: #94a3b8;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                text-align: left;
                gap: 0.3rem;
            }

            .adj-tab-btn strong {
                color: #f1f5f9;
                font-size: 1.05rem;
            }

            .adj-tab-btn span {
                font-size: 0.82rem;
                opacity: 0.8;
            }

            .adj-tab-btn:hover {
                background: rgba(51, 65, 85, 0.8);
                border-color: rgba(255, 255, 255, 0.25);
            }

            .adj-tab-btn.active {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.35));
                border-color: #10b981;
                box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
            }

            .adj-tab-btn.active strong {
                color: #34d399;
            }

            /* Hero Cards */
            .adj-hero-card {
                background: rgba(15, 23, 42, 0.75);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.8rem;
                margin-bottom: 2rem;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
            }

            .adj-hero-card h2 {
                color: #38bdf8;
                margin-top: 0;
                margin-bottom: 1rem;
                font-size: 1.45rem;
            }

            .hero-desc {
                font-size: 1.08rem;
                line-height: 1.65;
                color: #e2e8f0;
                margin: 0;
            }

            /* Image Wrapper */
            .adj-image-wrapper {
                background: rgba(15, 23, 42, 0.85);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 16px;
                overflow: hidden;
                margin-bottom: 2.2rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            }

            .adj-image-wrapper .hero-image {
                width: 100%;
                height: auto;
                display: block;
            }

            .image-caption {
                padding: 1rem 1.4rem;
                background: rgba(0, 0, 0, 0.3);
                font-size: 1rem;
                color: #cbd5e1;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
            }

            /* Step Grid 3 Columns */
            .step-grid-3col {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.2rem;
                margin-bottom: 2rem;
            }

            @media (max-width: 820px) {
                .step-grid-3col {
                    grid-template-columns: 1fr;
                }
            }

            .simple-step-card {
                background: rgba(30, 41, 59, 0.7);
                border-radius: 16px;
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                position: relative;
                transition: transform 0.2s ease;
            }

            .simple-step-card:hover {
                transform: translateY(-2px);
            }

            .simple-step-card.step-orange {
                border: 1px solid rgba(245, 158, 11, 0.35);
            }
            .simple-step-card.step-blue {
                border: 1px solid rgba(59, 130, 246, 0.35);
            }
            .simple-step-card.step-green {
                border: 1px solid rgba(16, 185, 129, 0.35);
            }

            .step-badge {
                position: absolute;
                top: 1rem;
                right: 1.2rem;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                color: #cbd5e1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 0.9rem;
            }

            .step-title-row {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.15rem;
                margin-bottom: 0.8rem;
                padding-right: 2rem;
            }

            .step-orange .step-title-row strong { color: #fbbf24; }
            .step-blue .step-title-row strong { color: #60a5fa; }
            .step-green .step-title-row strong { color: #34d399; }

            .step-q {
                font-size: 0.95rem;
                color: #cbd5e1;
                margin-bottom: 0.5rem;
                font-style: italic;
            }

            .step-ans {
                font-size: 0.95rem;
                font-weight: 600;
                color: #f1f5f9;
                margin-bottom: 1.2rem;
            }

            .step-example-box {
                background: rgba(0, 0, 0, 0.35);
                border-radius: 10px;
                padding: 0.9rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }

            .step-example-box .example-text {
                font-size: 1.12rem;
                font-weight: 600;
            }

            .listen-btn-mini {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
                border-radius: 8px;
                padding: 0.35rem 0.7rem;
                cursor: pointer;
                font-size: 0.9rem;
                transition: background 0.2s;
            }

            .listen-btn-mini:hover {
                background: rgba(255, 255, 255, 0.25);
            }

            .grammar-badge {
                font-size: 0.82rem;
                opacity: 0.8;
                margin-top: auto;
                padding-top: 0.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
            }

            /* Finished Sentence Banner */
            .finished-sentence-banner {
                background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: 16px;
                padding: 1.6rem;
                text-align: center;
                margin-bottom: 2.5rem;
                box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
            }

            .banner-label {
                font-size: 0.95rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #94a3b8;
                margin-bottom: 0.8rem;
            }

            .banner-sentence {
                font-size: 1.35rem;
                font-weight: 600;
                line-height: 1.5;
                margin-bottom: 1.2rem;
                color: #f8fafc;
            }

            .word-orange { color: #fbbf24; font-weight: 700; text-decoration: underline; }
            .word-blue { color: #60a5fa; font-weight: 700; text-decoration: underline; }
            .word-green { color: #34d399; font-weight: 700; text-decoration: underline; }

            .listen-btn {
                background: #10b981;
                border: none;
                color: #fff;
                padding: 0.75rem 1.6rem;
                border-radius: 10px;
                font-size: 1.05rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.6rem;
                box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
                transition: all 0.2s;
            }

            .listen-btn:hover {
                background: #059669;
                transform: translateY(-1px);
            }

            /* Adjective Playground Card */
            .adj-playground-card {
                background: rgba(15, 23, 42, 0.75);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.8rem;
                margin-bottom: 2rem;
            }

            .adj-playground-card h3 {
                color: #38bdf8;
                margin-top: 0;
                margin-bottom: 0.6rem;
                font-size: 1.3rem;
            }

            .adj-pill-selector {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .adj-pill-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #e2e8f0;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.95rem;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                transition: all 0.2s;
            }

            .adj-pill-btn:hover {
                background: rgba(255, 255, 255, 0.15);
            }

            .adj-pill-btn.active {
                background: #3b82f6;
                color: #fff;
                border-color: #3b82f6;
                box-shadow: 0 2px 10px rgba(59, 130, 246, 0.35);
            }

            .display-columns {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.2rem;
            }

            @media (max-width: 768px) {
                .display-columns {
                    grid-template-columns: 1fr;
                }
            }

            .display-col {
                background: rgba(30, 41, 59, 0.6);
                border-radius: 12px;
                padding: 1.4rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .display-col.col-pos { border-top: 3px solid #f59e0b; }
            .display-col.col-komp { border-top: 3px solid #3b82f6; }
            .display-col.col-sup { border-top: 3px solid #10b981; }

            .col-tier-label {
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 0.4rem;
                opacity: 0.75;
            }

            .col-word {
                font-size: 1.55rem;
                font-weight: 800;
                margin-bottom: 0.8rem;
            }

            .col-pos .col-word { color: #fbbf24; }
            .col-komp .col-word { color: #60a5fa; }
            .col-sup .col-word { color: #34d399; }

            .col-meter {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 1rem;
            }

            .col-pos .meter-fill { height: 100%; background: #f59e0b; }
            .col-komp .meter-fill { height: 100%; background: #3b82f6; }
            .col-sup .meter-fill { height: 100%; background: #10b981; }

            .col-example {
                font-size: 1rem;
                font-style: italic;
                margin-bottom: 1rem;
                color: #e2e8f0;
                min-height: 44px;
            }

            /* Part 2: Formula Box */
            .adj-formula-box {
                background: rgba(15, 23, 42, 0.85);
                border: 1px solid rgba(236, 72, 153, 0.35);
                border-radius: 16px;
                padding: 1.6rem;
                margin-bottom: 2.2rem;
            }

            .formula-title {
                font-size: 1.15rem;
                font-weight: 700;
                color: #f472b6;
                margin-bottom: 1.2rem;
            }

            .formula-components {
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.2rem;
            }

            .formula-chip {
                background: rgba(30, 41, 59, 0.9);
                border-radius: 12px;
                padding: 0.8rem 1.2rem;
                text-align: center;
                min-width: 140px;
            }

            .chip-type {
                display: block;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                opacity: 0.7;
                margin-bottom: 0.3rem;
            }

            .chip-val {
                font-size: 1.15rem;
                font-weight: 700;
            }

            .chip-marker { border: 1px solid #38bdf8; color: #38bdf8; }
            .chip-adj { border: 2px solid #ec4899; color: #f472b6; background: rgba(236, 72, 153, 0.15); }
            .chip-noun { border: 1px solid #10b981; color: #34d399; }

            .formula-plus {
                font-size: 1.5rem;
                font-weight: 800;
                color: #94a3b8;
            }

            .formula-rule-note {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 0.8rem 1rem;
                font-size: 0.95rem;
                color: #f8fafc;
                border-left: 3px solid #ec4899;
            }

            /* Scenarios Grid 4 */
            .scenarios-grid-4 {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.2rem;
                margin-bottom: 2rem;
            }

            @media (max-width: 768px) {
                .scenarios-grid-4 {
                    grid-template-columns: 1fr;
                }
            }

            .scenario-card {
                background: rgba(30, 41, 59, 0.65);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 14px;
                padding: 1.4rem;
                display: flex;
                flex-direction: column;
            }

            .scenario-header {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                font-size: 1.15rem;
                font-weight: 700;
                color: #f1f5f9;
                margin-bottom: 0.6rem;
            }

            .sc-icon { font-size: 1.3rem; }

            .sc-determiners code {
                background: rgba(0, 0, 0, 0.4);
                padding: 0.25rem 0.6rem;
                border-radius: 6px;
                color: #38bdf8;
                font-size: 0.92rem;
                display: inline-block;
                margin-bottom: 0.9rem;
            }

            .sc-examples-list {
                margin: 0 0 1.2rem 1.2rem;
                padding: 0;
                font-size: 1.05rem;
                line-height: 1.6;
                color: #e2e8f0;
            }

            .sc-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: auto;
                padding-top: 0.6rem;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
            }

            /* Super Definite Card */
            .super-definite-card {
                background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(15, 23, 42, 0.9));
                border: 1px solid rgba(236, 72, 153, 0.4);
                border-radius: 16px;
                padding: 1.6rem;
                margin-bottom: 2.2rem;
            }

            .super-def-badge {
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #f472b6;
                font-weight: 700;
                margin-bottom: 0.4rem;
            }

            .super-def-content h3 {
                margin-top: 0;
                margin-bottom: 0.6rem;
                color: #f472b6;
            }

            .super-def-content p {
                line-height: 1.6;
                color: #e2e8f0;
                font-size: 1.02rem;
            }

            /* Simulator Card */
            .adj-simulator-card {
                background: rgba(15, 23, 42, 0.75);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.8rem;
                margin-bottom: 2rem;
            }

            .adj-simulator-card h3 {
                color: #38bdf8;
                margin-top: 0;
                margin-bottom: 0.5rem;
                font-size: 1.3rem;
            }

            .sim-selector-row, .sim-modes-row {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.2rem;
            }

            .sim-pill-btn, .sim-mode-btn {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #cbd5e1;
                padding: 0.5rem 0.9rem;
                border-radius: 10px;
                cursor: pointer;
                font-size: 0.95rem;
                font-weight: 600;
                transition: all 0.2s;
            }

            .sim-pill-btn.active, .sim-mode-btn.active {
                background: #ec4899;
                color: #fff;
                border-color: #ec4899;
                box-shadow: 0 2px 10px rgba(236, 72, 153, 0.35);
            }

            .sim-result-box {
                background: rgba(0, 0, 0, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 14px;
                padding: 1.5rem;
                text-align: center;
            }

            .sim-phrase-display {
                font-size: 1.8rem;
                font-weight: 800;
                margin-bottom: 0.8rem;
                letter-spacing: 0.5px;
            }

            .sim-marker { color: #38bdf8; }
            .sim-adj { color: #f472b6; border-bottom: 3px solid #ec4899; padding-bottom: 2px; }
            .sim-noun { color: #34d399; }

            .sim-explanation {
                font-size: 1.05rem;
                color: #cbd5e1;
                margin-bottom: 1rem;
            }

            /* Part 3: Subtabs */
            .adj-subtabs-row {
                display: flex;
                gap: 0.8rem;
                margin-bottom: 2rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            .subtab-btn {
                background: rgba(30, 41, 59, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #cbd5e1;
                padding: 0.8rem 1.6rem;
                border-radius: 12px;
                font-size: 1.05rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .subtab-btn.active {
                background: #10b981;
                color: #fff;
                border-color: #10b981;
                box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
            }

            .exercise-header-card, .puzzle-header-card {
                background: rgba(15, 23, 42, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 14px;
                padding: 1.4rem;
                margin-bottom: 1.8rem;
            }

            .set-indicator, .puzzle-task-title {
                font-size: 1.2rem;
                font-weight: 700;
                color: #38bdf8;
            }

            /* Practice Row */
            .practice-row {
                background: rgba(30, 41, 59, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                padding: 1.3rem;
                margin-bottom: 1.2rem;
                display: flex;
                gap: 1.2rem;
                align-items: flex-start;
            }

            .q-num-badge {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #94a3b8;
                flex-shrink: 0;
            }

            .q-content {
                flex-grow: 1;
            }

            .question-sentence {
                font-size: 1.25rem;
                font-weight: 600;
                line-height: 1.6;
                margin-bottom: 0.6rem;
            }

            .adj-select {
                background: rgba(15, 23, 42, 0.95);
                border: 2px solid rgba(255, 255, 255, 0.25);
                color: #fff;
                padding: 0.4rem 0.8rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 700;
                cursor: pointer;
                outline: none;
                transition: all 0.2s;
            }

            .adj-select.correct {
                border-color: #10b981;
                background: rgba(16, 185, 129, 0.2);
                color: #34d399;
            }

            .adj-select.wrong {
                border-color: #ef4444;
                background: rgba(239, 68, 68, 0.2);
                color: #fca5a5;
            }

            .feedback-msg {
                padding: 0.75rem 1rem;
                border-radius: 8px;
                font-size: 1.02rem;
                line-height: 1.45;
                margin-top: 0.5rem;
            }

            .feedback-msg.correct {
                background: rgba(16, 185, 129, 0.15);
                border-left: 4px solid #10b981;
                color: #34d399;
            }

            .feedback-msg.wrong {
                background: rgba(239, 68, 68, 0.15);
                border-left: 4px solid #ef4444;
                color: #fca5a5;
            }

            .summary-success {
                background: rgba(16, 185, 129, 0.2);
                border: 1px solid #10b981;
                color: #34d399;
                padding: 1rem;
                border-radius: 12px;
                text-align: center;
                font-size: 1.15rem;
            }

            .summary-progress {
                text-align: center;
                color: #cbd5e1;
                font-size: 1.05rem;
            }

            .next-set-btn, .next-task-btn {
                background: #3b82f6;
                border: none;
                color: #fff;
                padding: 0.85rem 1.8rem;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
                transition: all 0.2s;
            }

            .next-set-btn:hover, .next-task-btn:hover {
                background: #2563eb;
                transform: translateY(-1px);
            }

            /* Puzzle / Sætningsbygger styles */
            .puzzle-pills-row {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 0.9rem;
            }

            .puzzle-pill {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.18);
                color: #cbd5e1;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
            }

            .puzzle-pill.active {
                background: #10b981;
                color: #fff;
                border-color: #10b981;
            }

            .puzzle-meaning-hint {
                font-size: 1.1rem;
                color: #f1f5f9;
                margin: 0.5rem 0;
            }

            .puzzle-rule-reminder {
                font-size: 0.95rem;
                color: #f472b6;
            }

            .puzzle-slots-container {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
                min-height: 64px;
                padding: 1.1rem;
                background: rgba(0, 0, 0, 0.4);
                border: 2px dashed rgba(255, 255, 255, 0.25);
                border-radius: 14px;
                margin-bottom: 1.5rem;
                align-items: center;
            }

            .puzzle-placeholder-text {
                color: #64748b;
                font-style: italic;
                font-size: 1.05rem;
            }

            .puzzle-slot.filled {
                background: #10b981;
                color: #fff;
                padding: 0.55rem 1rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
                transition: all 0.2s;
            }

            .puzzle-slot.filled:hover {
                background: #059669;
            }

            .slot-remove {
                font-size: 0.8rem;
                opacity: 0.7;
            }

            .puzzle-words-bank {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
                margin-bottom: 1.5rem;
            }

            .puzzle-word-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.22);
                color: #fff;
                padding: 0.55rem 1.1rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .puzzle-word-btn:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.22);
                transform: translateY(-1px);
            }

            .puzzle-word-btn.placed {
                opacity: 0.3;
                cursor: not-allowed;
            }

            .puzzle-feedback-area {
                margin-top: 1.2rem;
                text-align: center;
            }

            .puzzle-action-row {
                display: flex;
                gap: 1rem;
                justify-content: center;
                align-items: center;
                margin-top: 1rem;
            }

            .listen-btn-small {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #fff;
                padding: 0.65rem 1.4rem;
                border-radius: 8px;
                font-size: 1.05rem;
                cursor: pointer;
                font-weight: 600;
            }

            .retry-task-btn {
                background: #ef4444;
                border: none;
                color: #fff;
                padding: 0.65rem 1.4rem;
                border-radius: 8px;
                font-size: 1.05rem;
                cursor: pointer;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }
}
