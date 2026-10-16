import { getTranslation, getLang } from '../utils/i18n.js';

/**
 * TrorSynesMenerView - Målrettet grammatikflade til de fire menings- og holdningsverber:
 * "Tror, synes, mener eller ved?"
 * 
 * 4 zoner:
 *  1. 🧭 Det Store Regel-Kompas (Regler, spørgsmål & kursist-fælder)
 *  2. 🔍 Situation-Spotlight (Sammenlign i samme kontekst)
 *  3. 🎯 Interaktiv Quiz (10 hverdagsdilemmaer med forklaringer og TTS)
 *  4. 🚨 Spot Fejlen! (Er sætningen rigtig eller forkert på dansk?)
 */
export function renderTrorSynesMenerView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container tror-synes-mener-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    const returnTarget = extraData.from || 'dagens_opgave';
    backBtn.onclick = () => navigateFn(returnTarget);
    topBar.appendChild(backBtn);

    const verbHubBtn = document.createElement('button');
    verbHubBtn.className = 'back-btn';
    verbHubBtn.style.background = 'rgba(239, 68, 68, 0.15)';
    verbHubBtn.style.borderColor = '#ef4444';
    verbHubBtn.style.color = '#f87171';
    verbHubBtn.innerHTML = `🏃 Se Top 100 Verber ➔`;
    verbHubBtn.onclick = () => navigateFn('top100_verber');
    topBar.appendChild(verbHubBtn);

    viewContainer.appendChild(topBar);

    // TTS Audio Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .tror-synes-mener-view {
            max-width: 1150px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .tsm-hero {
            text-align: center;
            margin-bottom: 2.2rem;
        }
        .tsm-hero h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b, #ef4444, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .tsm-hero p {
            color: #cbd5e1;
            font-size: 1.15rem;
            max-width: 800px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }
        .tsm-core-badges {
            display: flex;
            justify-content: center;
            gap: 0.8rem;
            flex-wrap: wrap;
        }
        .tsm-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 1rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.9rem;
            border-width: 1.5px;
            border-style: solid;
        }
        .pill-synes { background: rgba(234, 179, 8, 0.15); border-color: #eab308; color: #fde047; }
        .pill-tror { background: rgba(168, 85, 247, 0.15); border-color: #a855f7; color: #d8b4fe; }
        .pill-mener { background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #7dd3fc; }
        .pill-ved { background: rgba(34, 197, 94, 0.15); border-color: #22c55e; color: #86efac; }

        /* Tabs Navigation */
        .tsm-tabs-menu {
            display: flex;
            gap: 0.6rem;
            margin: 2rem 0;
            flex-wrap: wrap;
            background: rgba(30, 41, 59, 0.7);
            padding: 0.5rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .tsm-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 0.75rem 1.3rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .tsm-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.06);
        }
        .tsm-tab-btn.active {
            background: #ef4444;
            color: white;
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
        }

        /* Compass Cards Grid */
        .tsm-compass-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }
        .compass-card {
            background: var(--card-bg, #1e293b);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }
        .compass-card:hover {
            transform: translateY(-4px);
        }
        .card-synes { border-color: rgba(234, 179, 8, 0.5); }
        .card-synes:hover { border-color: #eab308; box-shadow: 0 10px 30px rgba(234, 179, 8, 0.25); }
        .card-tror { border-color: rgba(168, 85, 247, 0.5); }
        .card-tror:hover { border-color: #a855f7; box-shadow: 0 10px 30px rgba(168, 85, 247, 0.25); }
        .card-mener { border-color: rgba(56, 189, 248, 0.5); }
        .card-mener:hover { border-color: #38bdf8; box-shadow: 0 10px 30px rgba(56, 189, 248, 0.25); }
        .card-ved { border-color: rgba(34, 197, 94, 0.5); }
        .card-ved:hover { border-color: #22c55e; box-shadow: 0 10px 30px rgba(34, 197, 94, 0.25); }

        .compass-header {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .compass-icon {
            font-size: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.06);
        }
        .compass-title-box h3 {
            font-size: 1.4rem;
            font-weight: 800;
            margin: 0;
        }
        .compass-title-box span {
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .compass-rule {
            font-size: 0.95rem;
            line-height: 1.5;
            color: #f1f5f9;
            margin-bottom: 1rem;
            background: rgba(15, 23, 42, 0.6);
            padding: 0.8rem;
            border-radius: 12px;
        }
        .compass-examples {
            list-style: none;
            padding: 0;
            margin: 0 0 1.2rem 0;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            flex-grow: 1;
        }
        .compass-examples li {
            font-size: 0.9rem;
            color: #cbd5e1;
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            line-height: 1.4;
        }
        .compass-trap {
            background: rgba(239, 68, 68, 0.12);
            border-left: 3px solid #ef4444;
            padding: 0.65rem 0.8rem;
            border-radius: 0 8px 8px 0;
            font-size: 0.82rem;
            color: #fca5a5;
            line-height: 1.4;
        }
        .compass-trap strong {
            color: #f87171;
            display: block;
            margin-bottom: 0.2rem;
        }

        /* Case Spotlight Section */
        .spotlight-box {
            background: var(--card-bg, #1e293b);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            margin-bottom: 2.5rem;
        }
        .spotlight-selector {
            display: flex;
            gap: 0.8rem;
            margin-bottom: 1.8rem;
            flex-wrap: wrap;
        }
        .spotlight-btn {
            background: rgba(15, 23, 42, 0.8);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
            padding: 0.6rem 1.2rem;
            border-radius: 14px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .spotlight-btn:hover {
            border-color: #38bdf8;
            color: white;
        }
        .spotlight-btn.active {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            color: #38bdf8;
            box-shadow: 0 0 14px rgba(56, 189, 248, 0.3);
        }
        .spotlight-rows {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .spotlight-row {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.1rem 1.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.2rem;
            flex-wrap: wrap;
            transition: all 0.2s ease;
        }
        .spotlight-row:hover {
            border-color: rgba(255, 255, 255, 0.25);
            background: rgba(15, 23, 42, 0.9);
        }
        .spotlight-left {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .spotlight-tag {
            font-weight: 800;
            padding: 0.35rem 0.8rem;
            border-radius: 12px;
            font-size: 0.85rem;
            min-width: 90px;
            text-align: center;
        }
        .spotlight-sentence {
            font-size: 1.15rem;
            color: #f8fafc;
            font-weight: 600;
        }
        .spotlight-explanation {
            font-size: 0.9rem;
            color: #94a3b8;
            max-width: 400px;
            text-align: right;
            line-height: 1.4;
        }

        /* Quiz Section */
        .tsm-quiz-card {
            background: var(--card-bg, #1e293b);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 2.2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
        }
        .quiz-counter-badge {
            display: inline-block;
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid #ef4444;
            color: #f87171;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-bottom: 1.2rem;
        }
        .quiz-sentence-box {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 18px;
            padding: 1.6rem 1.8rem;
            font-size: 1.35rem;
            font-weight: 600;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .quiz-audio-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #38bdf8;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.2s ease;
        }
        .quiz-audio-btn:hover {
            background: rgba(56, 189, 248, 0.25);
            transform: scale(1.1);
        }
        .quiz-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .quiz-opt-btn {
            background: rgba(15, 23, 42, 0.85);
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 1.1rem;
            color: white;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;
        }
        .quiz-opt-btn:hover {
            border-color: #38bdf8;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(56, 189, 248, 0.2);
        }
        .quiz-opt-btn .opt-sub {
            font-size: 0.78rem;
            font-weight: 600;
            color: #94a3b8;
            text-transform: uppercase;
        }
        .quiz-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.5) !important;
        }
        .quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.2) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
            opacity: 0.6;
        }
        .quiz-feedback-box {
            margin-top: 1.2rem;
            padding: 1.2rem 1.5rem;
            border-radius: 16px;
            animation: fadeIn 0.3s ease;
        }
        .quiz-next-btn {
            background: linear-gradient(135deg, #ef4444, #f97316);
            color: white;
            border: none;
            padding: 0.9rem 2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 800;
            cursor: pointer;
            margin-top: 1.2rem;
            transition: all 0.25s ease;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }
        .quiz-next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
        }

        /* Spot Fejlen Section */
        .trap-item {
            background: var(--card-bg, #1e293b);
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.4rem;
            margin-bottom: 1.2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .trap-sentence {
            font-size: 1.2rem;
            font-weight: 700;
            color: #f8fafc;
        }
        .trap-buttons {
            display: flex;
            gap: 0.8rem;
        }
        .trap-vote-btn {
            padding: 0.6rem 1.4rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.2s ease;
        }
        .trap-btn-right {
            background: rgba(34, 197, 94, 0.15);
            border-color: #22c55e;
            color: #4ade80;
        }
        .trap-btn-wrong {
            background: rgba(239, 68, 68, 0.15);
            border-color: #ef4444;
            color: #f87171;
        }
        .trap-result {
            padding: 1rem;
            border-radius: 12px;
            font-size: 0.95rem;
            line-height: 1.5;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const hero = document.createElement('div');
    hero.className = 'tsm-hero';
    hero.innerHTML = `
        <h1>🤔 Tror, synes, mener eller ved?</h1>
        <p>De 4 verber, der viser om du udtrykker personlig smag, et gæt, en holdning eller et faktum. Lær de gyldne regler og undgå de klassiske kursist-fælder.</p>
        <div class="tsm-core-badges">
            <span class="tsm-pill pill-synes">👅 SYNES = Egen smag & sansning</span>
            <span class="tsm-pill pill-tror">🔮 TROR = Gæt, vejr & fremtid</span>
            <span class="tsm-pill pill-mener">⚖️ MENER = Holdning & princip</span>
            <span class="tsm-pill pill-ved">🔒 VED = 100% fakta & data</span>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'tsm-tabs-menu';
    const tabs = [
        { id: 'tab_compass', label: '🧭 Det Store Regel-Kompas', icon: '' },
        { id: 'tab_spotlight', label: '🔍 Situation-Spotlight', icon: '' },
        { id: 'tab_quiz', label: '🎯 Interaktiv Quiz (10 opgaver)', icon: '' },
        { id: 'tab_fejlen', label: '🚨 Spot Fejlen! (Rigtig eller forkert?)', icon: '' }
    ];

    let activeTab = 'tab_compass';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `tsm-tab-btn ${t.id === activeTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.textContent = t.label;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    // ==========================================================
    // --- FANE 1: 🧭 DET STORE REGEL-KOMPAS ---
    // ==========================================================
    const compassPanel = document.createElement('div');
    compassPanel.id = 'panel_compass';
    compassPanel.innerHTML = `
        <div class="tsm-compass-grid">
            <!-- 1. SYNES -->
            <div class="compass-card card-synes">
                <div class="compass-header">
                    <div class="compass-icon">👅</div>
                    <div class="compass-title-box">
                        <h3 style="color: #fde047;">SYNES</h3>
                        <span style="color: #eab308;">Egen smag & sansning</span>
                    </div>
                </div>
                <div class="compass-rule">
                    Du har <strong>selv prøvet, smagt, set eller følt det</strong>. Det handler om dine egne sanser og din personlige smag.
                </div>
                <ul class="compass-examples">
                    <li>☕ "Jeg <strong>synes</strong>, kaffen smager godt."</li>
                    <li>🎬 "Hvad <strong>synes</strong> du om filmen?" (efter du har set den)</li>
                    <li>🥶 "Jeg <strong>synes</strong>, her er koldt i dag."</li>
                </ul>
                <div class="compass-trap">
                    <strong>⚠️ Kursist-fælde:</strong>
                    Du må ALDRIG bruge <em>synes</em> om noget, du ikke har oplevet endnu!<br>
                    ❌ "Jeg synes, han kommer i morgen." (Brug <em>tror</em>!)
                </div>
            </div>

            <!-- 2. TROR -->
            <div class="compass-card card-tror">
                <div class="compass-header">
                    <div class="compass-icon">🔮</div>
                    <div class="compass-title-box">
                        <h3 style="color: #d8b4fe;">TROR</h3>
                        <span style="color: #a855f7;">Gæt, vejr & fremtid</span>
                    </div>
                </div>
                <div class="compass-rule">
                    Du <strong>ved det ikke med sikkerhed</strong>. Det er et gæt, en formodning eller noget, der sker i fremtiden.
                </div>
                <ul class="compass-examples">
                    <li>🌧️ "Jeg <strong>tror</strong>, det regner i morgen."</li>
                    <li>🚌 "Jeg <strong>tror</strong>, bussen kommer lige om lidt."</li>
                    <li>🎂 "Hvor gammel er han? – Jeg <strong>tror</strong>, han er 30."</li>
                </ul>
                <div class="compass-trap">
                    <strong>⚠️ Kursist-fælde:</strong>
                    Mange siger fejlagtigt ❌ "Jeg synes, det regner i morgen". Men vejret er ikke din personlige smag – det er et meteorologisk gæt!
                </div>
            </div>

            <!-- 3. MENER -->
            <div class="compass-card card-mener">
                <div class="compass-header">
                    <div class="compass-icon">⚖️</div>
                    <div class="compass-title-box">
                        <h3 style="color: #7dd3fc;">MENER</h3>
                        <span style="color: #38bdf8;">Holdning, etik & princip</span>
                    </div>
                </div>
                <div class="compass-rule">
                    En <strong>holdning eller overbevisning</strong> baseret på tanker, etik, politik eller logiske argumenter.
                </div>
                <ul class="compass-examples">
                    <li>🌱 "Jeg <strong>mener</strong>, vi bør passe bedre på klimaet."</li>
                    <li>💼 "Hvad <strong>mener</strong> du om den nye regel på arbejdet?"</li>
                    <li>🩺 "Lægen <strong>mener</strong>, at patienten skal hvile sig."</li>
                </ul>
                <div class="compass-trap">
                    <strong>💡 Husk:</strong>
                    <em>Mener</em> er mere formelt og sagligt end <em>synes</em>. Man har argumenter og principper bag sin holdning.
                </div>
            </div>

            <!-- 4. VED -->
            <div class="compass-card card-ved">
                <div class="compass-header">
                    <div class="compass-icon">🔒</div>
                    <div class="compass-title-box">
                        <h3 style="color: #86efac;">VED</h3>
                        <span style="color: #22c55e;">100 % fakta & data</span>
                    </div>
                </div>
                <div class="compass-rule">
                    Hverken et gæt eller en holdning. Det er <strong>objektiv sandhed, verificeret fakta eller data</strong>.
                </div>
                <ul class="compass-examples">
                    <li>⏰ "Jeg <strong>ved</strong>, at butikken lukker kl. 18."</li>
                    <li>👑 "Jeg <strong>ved</strong>, at Danmarks hovedstad er København."</li>
                    <li>❓ "<strong>Ved</strong> du, hvor stationen ligger?"</li>
                </ul>
                <div class="compass-trap">
                    <strong>💡 Benægtelse:</strong>
                    Når du mangler oplysninger, hedder det: <em>"Jeg ved det ikke"</em>.
                </div>
            </div>
        </div>
    `;

    // ==========================================================
    // --- FANE 2: 🔍 SITUATION-SPOTLIGHT ---
    // ==========================================================
    const spotlightPanel = document.createElement('div');
    spotlightPanel.id = 'panel_spotlight';

    const situations = [
        {
            id: 'kaffe',
            title: '☕ Kaffen på caféen',
            desc: 'Se hvordan det samme emne ændrer betydning efter verbet:',
            items: [
                { verb: 'synes', tagClass: 'pill-synes', text: 'Jeg synes, kaffen smager dejligt!', expl: 'Min personlige smagsoplevelse, mens jeg drikker den.' },
                { verb: 'tror', tagClass: 'pill-tror', text: 'Jeg tror, kaffen er meget varm – pas på.', expl: 'Mit gæt/forventning, inden jeg har smagt.' },
                { verb: 'mener', tagClass: 'pill-mener', text: 'Jeg mener, alle caféer bør servere økologisk kaffe.', expl: 'Mit etiske og principielle standpunkt.' },
                { verb: 'ved', tagClass: 'pill-ved', text: 'Jeg ved, at en kop kaffe her koster 35 kr.', expl: 'Faktisk oplysning på menukortet.' }
            ]
        },
        {
            id: 'kollega',
            title: '👤 Den nye kollega (Peter)',
            desc: 'Hvordan omtaler du Peter ud fra viden vs. indtryk?',
            items: [
                { verb: 'synes', tagClass: 'pill-synes', text: 'Jeg synes, Peter virker rigtig flink og hjælpsom.', expl: 'Mit personlige indtryk efter at have hilst på ham.' },
                { verb: 'tror', tagClass: 'pill-tror', text: 'Jeg tror, Peter bor i Odense.', expl: 'Et gæt på en personlig oplysning, jeg ikke kender sikkert.' },
                { verb: 'mener', tagClass: 'pill-mener', text: 'Jeg mener, vi bør give Peter en grundigere oplæring.', expl: 'Min faglige holdning og forslag til ledelsen.' },
                { verb: 'ved', tagClass: 'pill-ved', text: 'Jeg ved, at Peter starter officielt den 1. november.', expl: 'En bekræftet dato i kontrakten.' }
            ]
        },
        {
            id: 'vinter',
            title: '🌦️ Den danske vinter',
            desc: 'Sanser, vejrgæt, videnskabelig holdning og data:',
            items: [
                { verb: 'synes', tagClass: 'pill-synes', text: 'Jeg synes, den danske vinter er alt for lang og mørk.', expl: 'Min personlige følelse og kropslige oplevelse.' },
                { verb: 'tror', tagClass: 'pill-tror', text: 'Jeg tror, det begynder at sne i eftermiddag.', expl: 'Mit gæt på vejret senere i dag.' },
                { verb: 'mener', tagClass: 'pill-mener', text: 'Klimaforskere mener, at vintrene bliver vådere.', expl: 'Fagligt begrundet holdning / vurdering.' },
                { verb: 'ved', tagClass: 'pill-ved', text: 'Meteorologerne ved, at gennemsnittet var 2 grader.', expl: 'Målte og dokumenterede vejrdata.' }
            ]
        }
    ];

    let activeSituationIdx = 0;

    function renderSpotlightContent() {
        const sit = situations[activeSituationIdx];
        spotlightPanel.innerHTML = `
            <div class="spotlight-box">
                <div class="spotlight-selector" id="spotlight-selectors"></div>
                <p style="color: #94a3b8; font-size: 1.05rem; margin-bottom: 1.5rem;">${sit.desc}</p>
                <div class="spotlight-rows">
                    ${sit.items.map(item => `
                        <div class="spotlight-row">
                            <div class="spotlight-left">
                                <span class="spotlight-tag ${item.tagClass}">${item.verb.toUpperCase()}</span>
                                <span class="spotlight-sentence">"${item.text}"</span>
                            </div>
                            <div class="spotlight-explanation">💡 ${item.expl}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const selectorsHolder = spotlightPanel.querySelector('#spotlight-selectors');
        situations.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `spotlight-btn ${idx === activeSituationIdx ? 'active' : ''}`;
            btn.textContent = s.title;
            btn.onclick = () => {
                activeSituationIdx = idx;
                renderSpotlightContent();
            };
            selectorsHolder.appendChild(btn);
        });
    }

    renderSpotlightContent();

    // ==========================================================
    // --- FANE 3: 🎯 INTERAKTIV QUIZ ---
    // ==========================================================
    const quizPanel = document.createElement('div');
    quizPanel.id = 'panel_quiz';

    const quizQuestions = [
        {
            sentenceBefore: "Hvad",
            sentenceAfter: "du om denne kage? Den smager lidt stærkt af kanel.",
            correct: "synes",
            explanation: '"Synes" er det eneste rigtige ord her, fordi du spørger til personens egen smagsoplevelse (mad/smag).'
        },
        {
            sentenceBefore: "Jeg",
            sentenceAfter: "at bussen kører kl. 14:15, men lad os lige tjekke Rejseplanen for en sikkerheds skyld.",
            correct: "tror",
            explanation: 'Du er ikke 100% sikker og skal tjekke køreplanen = et gæt/formodning om fakta. Derfor bruges "tror".'
        },
        {
            sentenceBefore: "Regeringen",
            sentenceAfter: "at vi bør investere flere penge i den grønne omstilling.",
            correct: "mener",
            explanation: 'Dette er et politisk og samfundsmæssigt standpunkt med argumenter bag = "mener".'
        },
        {
            sentenceBefore: "Jeg",
            sentenceAfter: "at Danmarks hovedstad hedder København.",
            correct: "ved",
            explanation: 'Dette er en objektiv, ubestridelig sandhed/faktum. Derfor bruges "ved".'
        },
        {
            sentenceBefore: "Jeg har aldrig set den nye James Bond film, men jeg",
            sentenceAfter: "den er rigtig spændende.",
            correct: "tror",
            explanation: 'VIGTIG REGEL: Du har ALDRIG set filmen selv! Derfor må du IKKE bruge "synes". Du kan kun gætte = "tror".'
        },
        {
            sentenceBefore: "Nu har jeg prøvet jakken på, og jeg",
            sentenceAfter: "ærmerne er en smule for korte.",
            correct: "synes",
            explanation: 'Du har jakken på din krop og mærker det selv = personlig oplevelse = "synes".'
        },
        {
            sentenceBefore: "Lægen",
            sentenceAfter: "at patienten har brug for to ugers sygemelding.",
            correct: "mener",
            explanation: 'Lægens faglige vurdering og anbefaling = "mener".'
        },
        {
            sentenceBefore: "Undskyld, er der nogen her, der",
            sentenceAfter: "hvor det nærmeste apotek ligger?",
            correct: "ved",
            explanation: 'Du spørger efter en konkret adresse/faktum = "ved".'
        },
        {
            sentenceBefore: "Hvor gammel er Mette? – Jeg",
            sentenceAfter: "hun fylder 35 i næste måned.",
            correct: "tror",
            explanation: 'Du gætter på en alder/faktum, du ikke er helt sikker på = "tror".'
        },
        {
            sentenceBefore: "Hvad",
            sentenceAfter: "I, at vi som familie skal prioritere på vores budget?",
            correct: "mener",
            explanation: 'Her efterspørges en holdning og argumentation for familiens fælles prioritering = "mener".'
        }
    ];

    let currQuizIdx = 0;
    const quizCard = document.createElement('div');
    quizCard.className = 'tsm-quiz-card';

    function renderQuizTask() {
        quizCard.innerHTML = '';
        const q = quizQuestions[currQuizIdx];

        const counterBadge = document.createElement('div');
        counterBadge.className = 'quiz-counter-badge';
        counterBadge.textContent = `Opgave ${currQuizIdx + 1} af ${quizQuestions.length}`;
        quizCard.appendChild(counterBadge);

        const fullSentence = `${q.sentenceBefore} ________ ${q.sentenceAfter}`;
        const sentenceBox = document.createElement('div');
        sentenceBox.className = 'quiz-sentence-box';
        sentenceBox.innerHTML = `
            <span>${fullSentence}</span>
            <button class="quiz-audio-btn" title="Lyt til sætningen" id="btn-audio-quiz">🔊</button>
        `;
        quizCard.appendChild(sentenceBox);

        sentenceBox.querySelector('#btn-audio-quiz').onclick = () => {
            speakDanish(`${q.sentenceBefore} ${q.correct} ${q.sentenceAfter}`);
        };

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'quiz-options-grid';

        const verbOptions = [
            { text: 'synes', sub: 'Egen smag & sans' },
            { text: 'tror', sub: 'Gæt & formodning' },
            { text: 'mener', sub: 'Holdning & princip' },
            { text: 'ved', sub: '100% fakta' }
        ];

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'quiz-feedback-box';
        feedbackBox.style.display = 'none';

        verbOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.innerHTML = `
                <span>${opt.text}</span>
                <span class="opt-sub">${opt.sub}</span>
            `;

            btn.onclick = () => {
                const isCorrect = (opt.text.toLowerCase() === q.correct.toLowerCase());
                optionsGrid.querySelectorAll('.quiz-opt-btn').forEach(b => b.style.pointerEvents = 'none');

                if (isCorrect) {
                    btn.classList.add('correct');
                    sentenceBox.querySelector('span').innerHTML = `${q.sentenceBefore} <strong style="color: #4ade80; text-decoration: underline;">${opt.text}</strong> ${q.sentenceAfter}`;
                    feedbackBox.style.display = 'block';
                    feedbackBox.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedbackBox.style.border = '1px solid #22c55e';
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.4rem;">
                            🎉 Rigtigt!
                        </div>
                        <div style="color: #cbd5e1; font-size: 1rem; line-height: 1.5;">
                            ${q.explanation}
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    // Find and highlight correct
                    optionsGrid.querySelectorAll('.quiz-opt-btn').forEach(b => {
                        if (b.querySelector('span').textContent.toLowerCase() === q.correct.toLowerCase()) {
                            b.classList.add('correct');
                        }
                    });
                    sentenceBox.querySelector('span').innerHTML = `${q.sentenceBefore} <strong style="color: #4ade80; text-decoration: underline;">${q.correct}</strong> ${q.sentenceAfter}`;
                    feedbackBox.style.display = 'block';
                    feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedbackBox.style.border = '1px solid #ef4444';
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.4rem;">
                            Ikke helt rigtigt – det rigtige verbum er "${q.correct}"
                        </div>
                        <div style="color: #cbd5e1; font-size: 1rem; line-height: 1.5;">
                            ${q.explanation}
                        </div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'quiz-next-btn';
                nextBtn.textContent = currQuizIdx < quizQuestions.length - 1 ? 'Næste opgave ➔' : 'Prøv forfra 🔄';
                nextBtn.onclick = () => {
                    currQuizIdx = (currQuizIdx + 1) % quizQuestions.length;
                    renderQuizTask();
                };
                feedbackBox.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });

        quizCard.appendChild(optionsGrid);
        quizCard.appendChild(feedbackBox);
    }

    renderQuizTask();
    quizPanel.appendChild(quizCard);

    // ==========================================================
    // --- FANE 4: 🚨 SPOT FEJLEN! ---
    // ==========================================================
    const fejlenPanel = document.createElement('div');
    fejlenPanel.id = 'panel_fejlen';

    const trapSentences = [
        {
            sentence: '❌ "Jeg synes, det bliver solskin på lørdag."',
            isRight: false,
            correction: 'Rettelse: "Jeg tror, det bliver solskin på lørdag."',
            expl: 'Vejret er et gæt om fremtiden, ikke din personlige smag. Derfor skal du bruge "tror".'
        },
        {
            sentence: '✅ "Jeg synes, filmen var fantastisk, da jeg så den i biografen."',
            isRight: true,
            correction: 'Helt korrekt!',
            expl: 'Du har selv set filmen, og det er din egen personlige smag og oplevelse. Derfor er "synes" det helt rigtige ord.'
        },
        {
            sentence: '❌ "Jeg tror, kagen smager for sødt (sagt mens du spiser den)."',
            isRight: false,
            correction: 'Rettelse: "Jeg synes, kagen smager for sødt."',
            expl: 'Når du spiser kagen lige nu, er det dine egne smagsløg og sanser. Så hedder det "synes", ikke "tror".'
        },
        {
            sentence: '✅ "Lægen mener, at daglig motion nedsætter risikoen for sygdom."',
            isRight: true,
            correction: 'Helt korrekt!',
            expl: '"Mener" bruges her om lægens faglige standpunkt og argument.'
        },
        {
            sentence: '❌ "Jeg synes ikke, hvor rådhuset ligger."',
            isRight: false,
            correction: 'Rettelse: "Jeg ved ikke, hvor rådhuset ligger."',
            expl: 'En bygnings placering er en objektiv faktaoplysning. Derfor hedder det altid "ved ikke".'
        },
        {
            sentence: '✅ "Hvad mener du om Danmarks nye klimaaftale?"',
            isRight: true,
            correction: 'Helt korrekt!',
            expl: 'Du spørger til en holdning, et princip og et argument.'
        }
    ];

    fejlenPanel.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚨 Test dit sprog-radar: Er sætningen rigtig eller forkert?</h2>
            <p style="color: #94a3b8;">Tryk på ✅ eller ❌ for hver sætning og se, om du kan gennemskue kursist-fælderne.</p>
        </div>
        <div id="traps-list"></div>
    `;

    const trapsHolder = fejlenPanel.querySelector('#traps-list');
    trapSentences.forEach((t, i) => {
        const item = document.createElement('div');
        item.className = 'trap-item';
        item.innerHTML = `
            <div class="trap-sentence">${t.sentence.replace(/^[❌✅]\s*/, '')}</div>
            <div class="trap-buttons" id="trap-btns-${i}">
                <button class="trap-vote-btn trap-btn-right" id="vote-right-${i}">✅ Rigtigt dansk</button>
                <button class="trap-vote-btn trap-btn-wrong" id="vote-wrong-${i}">❌ Forkert dansk</button>
            </div>
            <div class="trap-result" id="trap-res-${i}" style="display: none;"></div>
        `;

        const resBox = item.querySelector(`#trap-res-${i}`);
        const btnsBox = item.querySelector(`#trap-btns-${i}`);

        item.querySelector(`#vote-right-${i}`).onclick = () => checkVote(true);
        item.querySelector(`#vote-wrong-${i}`).onclick = () => checkVote(false);

        function checkVote(userVotedRight) {
            btnsBox.querySelectorAll('button').forEach(b => b.style.pointerEvents = 'none');
            const wasCorrect = (userVotedRight === t.isRight);
            resBox.style.display = 'block';

            if (wasCorrect) {
                resBox.style.background = 'rgba(34, 197, 94, 0.15)';
                resBox.style.border = '1px solid #22c55e';
                resBox.innerHTML = `
                    <div style="color: #4ade80; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.3rem;">
                        🎉 Godt spottet!
                    </div>
                    <div style="color: #f1f5f9; font-weight: 700; margin-bottom: 0.3rem;">${t.correction}</div>
                    <div style="color: #cbd5e1;">${t.expl}</div>
                `;
            } else {
                resBox.style.background = 'rgba(239, 68, 68, 0.15)';
                resBox.style.border = '1px solid #ef4444';
                resBox.innerHTML = `
                    <div style="color: #f87171; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.3rem;">
                        Øv, ikke helt!
                    </div>
                    <div style="color: #f1f5f9; font-weight: 700; margin-bottom: 0.3rem;">${t.correction}</div>
                    <div style="color: #cbd5e1;">${t.expl}</div>
                `;
            }
        }

        trapsHolder.appendChild(item);
    });

    // Tab Switcher
    function switchTab(tabId) {
        activeTab = tabId;
        tabsMenu.querySelectorAll('.tsm-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        panelsHolder.innerHTML = '';
        if (tabId === 'tab_compass') {
            panelsHolder.appendChild(compassPanel);
        } else if (tabId === 'tab_spotlight') {
            panelsHolder.appendChild(spotlightPanel);
        } else if (tabId === 'tab_quiz') {
            panelsHolder.appendChild(quizPanel);
        } else if (tabId === 'tab_fejlen') {
            panelsHolder.appendChild(fejlenPanel);
        }
    }

    // Initial render
    switchTab('tab_compass');

    container.appendChild(viewContainer);
}
