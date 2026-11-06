import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * TrorSynesMenerView - Målrettet grammatikflade til de fire menings- og holdningsverber:
 * "Tror, synes, mener eller ved?"
 * 
 * 4 zoner:
 *  1. Det Store Regel-Kompas (Regler, spørgsmål & sprogregler)
 *  2. Situation-Spotlight (Sammenlign i samme kontekst)
 *  3. Interaktiv Quiz (10 hverdagsdilemmaer med forklaringer og TTS)
 *  4. Spot Fejlen! (Er sætningen rigtig eller forkert på dansk?)
 */
export function renderTrorSynesMenerView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    // Sikr ren verbum-nuance
    applyVerbNuance(getActiveVerbNuance());

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
    verbHubBtn.style.background = 'rgba(56, 189, 248, 0.1)';
    verbHubBtn.style.borderColor = 'rgba(56, 189, 248, 0.35)';
    verbHubBtn.style.color = '#38bdf8';
    verbHubBtn.innerHTML = getTranslation('tsm_top_verb_hub', 'Se Top 100 Verber →');
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

    // Styles: Kølig skandinavisk æstetik
    const style = document.createElement('style');
    style.textContent = `
        .tror-synes-mener-view {
            max-width: 1150px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .tror-synes-mener-view .ds-icon-emoji {
            display: none !important;
        }
        .tror-synes-mener-view .ds-icon-svg {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            vertical-align: middle !important;
            color: currentColor !important;
        }
        .tror-synes-mener-view .ds-icon-svg svg {
            display: inline-block !important;
            vertical-align: middle !important;
        }
        .tsm-hero {
            text-align: center;
            margin-bottom: 2.2rem;
        }
        .tsm-hero h1 {
            font-size: 2.4rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 0.75rem;
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .tsm-hero p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 760px;
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
            gap: 0.45rem;
            padding: 0.45rem 1.1rem;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 0.88rem;
            border-width: 1px;
            border-style: solid;
            backdrop-filter: blur(8px);
            transition: all 0.2s ease;
        }
        .pill-synes { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.35); color: #fbbf24; }
        .pill-tror { background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.35); color: #7dd3fc; }
        .pill-mener { background: rgba(129, 140, 248, 0.1); border-color: rgba(129, 140, 248, 0.35); color: #a5b4fc; }
        .pill-ved { background: rgba(52, 211, 153, 0.1); border-color: rgba(52, 211, 153, 0.35); color: #6ee7b7; }

        /* Tabs Navigation - Kølig skandinavisk */
        .tsm-tabs-menu {
            display: flex;
            gap: 0.5rem;
            margin: 2rem 0;
            flex-wrap: wrap;
            background: #0f172a;
            padding: 0.45rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .tsm-tab-btn {
            background: transparent;
            color: #94a3b8;
            border: 1px solid transparent;
            padding: 0.65rem 1.2rem;
            border-radius: 10px;
            font-weight: 600;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.55rem;
        }
        .tsm-tab-btn svg {
            color: #64748b;
            transition: color 0.2s ease;
        }
        .tsm-tab-btn:hover {
            color: #f1f5f9;
            background: rgba(255, 255, 255, 0.05);
        }
        .tsm-tab-btn:hover svg {
            color: #94a3b8;
        }
        .tsm-tab-btn.active {
            background: #0284c7;
            color: #ffffff;
            border-color: #38bdf8;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }
        .tsm-tab-btn.active svg {
            color: #ffffff;
        }

        /* Compass Cards Grid */
        .tsm-compass-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.4rem;
            margin-bottom: 2.5rem;
            align-items: stretch;
        }
        .compass-card {
            background: linear-gradient(180deg, #1e293b 0%, #131d2e 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }
        .compass-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .card-synes { border-top: 3.5px solid #f59e0b; }
        .card-tror { border-top: 3.5px solid #38bdf8; }
        .card-mener { border-top: 3.5px solid #818cf8; }
        .card-ved { border-top: 3.5px solid #34d399; }

        .compass-header {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            margin-bottom: 1.1rem;
            padding-bottom: 0.85rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .compass-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            flex-shrink: 0;
        }
        .card-synes .compass-icon { color: #fbbf24; }
        .card-tror .compass-icon { color: #38bdf8; }
        .card-mener .compass-icon { color: #a5b4fc; }
        .card-ved .compass-icon { color: #34d399; }

        .compass-title-box h3 {
            font-size: 1.35rem;
            font-weight: 800;
            letter-spacing: 0.02em;
            margin: 0;
        }
        .compass-title-box span {
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .compass-rule {
            font-size: 0.92rem;
            line-height: 1.5;
            color: #cbd5e1;
            margin-bottom: 1rem;
            background: rgba(15, 23, 42, 0.6);
            padding: 0.85rem 1rem;
            border-radius: 12px;
            border-left: 3px solid rgba(255, 255, 255, 0.15);
        }
        .card-synes .compass-rule { border-left-color: #f59e0b; }
        .card-tror .compass-rule { border-left-color: #38bdf8; }
        .card-mener .compass-rule { border-left-color: #818cf8; }
        .card-ved .compass-rule { border-left-color: #34d399; }

        .compass-examples {
            list-style: none;
            padding: 0;
            margin: 0 0 1.2rem 0;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            flex-grow: 1;
        }
        .compass-examples li {
            font-size: 0.92rem;
            color: #cbd5e1;
            display: flex;
            align-items: baseline;
            gap: 0.65rem;
            line-height: 1.45;
        }
        .ex-bullet {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-top: 7px;
            flex-shrink: 0;
            background: #64748b;
        }
        .card-synes .ex-bullet { background: #f59e0b; }
        .card-tror .ex-bullet { background: #38bdf8; }
        .card-mener .ex-bullet { background: #818cf8; }
        .card-ved .ex-bullet { background: #34d399; }

        .compass-examples .ex-text {
            flex: 1;
            min-width: 0;
        }
        .card-synes .compass-examples strong { color: #fbbf24; font-weight: 700; }
        .card-tror .compass-examples strong { color: #7dd3fc; font-weight: 700; }
        .card-mener .compass-examples strong { color: #a5b4fc; font-weight: 700; }
        .card-ved .compass-examples strong { color: #6ee7b7; font-weight: 700; }

        .compass-trap {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-left: 3px solid #ef4444;
            padding: 0.75rem 0.9rem;
            border-radius: 8px;
            font-size: 0.82rem;
            color: #fca5a5;
            line-height: 1.4;
        }
        .compass-trap strong {
            color: #f87171;
            display: block;
            margin-bottom: 0.2rem;
            font-weight: 700;
        }

        /* Case Spotlight Section */
        .spotlight-box {
            background: linear-gradient(180deg, #1e293b 0%, #131d2e 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            margin-bottom: 2.5rem;
        }
        .spotlight-selector {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1.6rem;
            flex-wrap: wrap;
        }
        .spotlight-btn {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .spotlight-btn:hover {
            border-color: #38bdf8;
            color: white;
        }
        .spotlight-btn.active {
            background: rgba(2, 132, 199, 0.15);
            border-color: #38bdf8;
            color: #38bdf8;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.25);
        }
        .spotlight-rows {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }
        .spotlight-row {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 14px;
            padding: 1.1rem 1.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.2rem;
            flex-wrap: wrap;
            transition: all 0.2s ease;
        }
        .spotlight-row:hover {
            border-color: rgba(255, 255, 255, 0.18);
            background: rgba(15, 23, 42, 0.9);
        }
        .spotlight-left {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .spotlight-tag {
            font-weight: 700;
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            font-size: 0.82rem;
            min-width: 85px;
            text-align: center;
            letter-spacing: 0.03em;
        }
        .spotlight-sentence {
            font-size: 1.1rem;
            color: #f8fafc;
            font-weight: 600;
        }
        .spotlight-explanation {
            font-size: 0.88rem;
            color: #94a3b8;
            max-width: 440px;
            display: inline-flex;
            align-items: flex-start;
            gap: 0.55rem;
            line-height: 1.45;
            text-align: left;
        }
        .spotlight-expl-icon {
            color: #38bdf8;
            flex-shrink: 0;
            margin-top: 2px;
            display: inline-flex;
        }

        /* Quiz Section */
        .tsm-quiz-card {
            background: linear-gradient(180deg, #1e293b 0%, #131d2e 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
        }
        .quiz-counter-badge {
            display: inline-block;
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.35);
            color: #38bdf8;
            padding: 0.3rem 0.85rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 700;
            margin-bottom: 1.2rem;
        }
        .quiz-sentence-box {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem 1.8rem;
            font-size: 1.28rem;
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
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #38bdf8;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        .quiz-audio-btn:hover {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            transform: scale(1.08);
        }
        .quiz-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .quiz-opt-btn {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 1rem;
            color: white;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
        }
        .quiz-opt-btn:hover {
            border-color: #38bdf8;
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(56, 189, 248, 0.2);
        }
        .quiz-opt-btn .opt-sub {
            font-size: 0.78rem;
            font-weight: 600;
            color: #94a3b8;
            text-transform: uppercase;
        }
        .quiz-opt-btn.correct {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            box-shadow: 0 0 18px rgba(34, 197, 94, 0.4) !important;
        }
        .quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.15) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
            opacity: 0.65;
        }
        .quiz-feedback-box {
            margin-top: 1.2rem;
            padding: 1.2rem 1.5rem;
            border-radius: 14px;
            animation: fadeIn 0.3s ease;
        }
        .quiz-next-btn {
            background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 1.2rem;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }
        .quiz-next-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
        }

        /* Spot Fejlen Section */
        .trap-item {
            background: linear-gradient(180deg, #1e293b 0%, #131d2e 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.3rem 1.5rem;
            margin-bottom: 1.1rem;
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }
        .trap-sentence {
            font-size: 1.15rem;
            font-weight: 600;
            color: #f8fafc;
        }
        .trap-buttons {
            display: flex;
            gap: 0.8rem;
        }
        .trap-vote-btn {
            padding: 0.55rem 1.3rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            border: 1px solid transparent;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
        }
        .trap-btn-right {
            background: rgba(34, 197, 94, 0.12);
            border-color: rgba(34, 197, 94, 0.35);
            color: #4ade80;
        }
        .trap-btn-right:hover {
            background: rgba(34, 197, 94, 0.2);
            border-color: #22c55e;
        }
        .trap-btn-wrong {
            background: rgba(239, 68, 68, 0.12);
            border-color: rgba(239, 68, 68, 0.35);
            color: #f87171;
        }
        .trap-btn-wrong:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: #ef4444;
        }
        .trap-result {
            padding: 1rem 1.2rem;
            border-radius: 12px;
            font-size: 0.92rem;
            line-height: 1.5;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
            .tror-synes-mener-view {
                padding: 0.75rem 0.75rem 3rem;
            }
            .tsm-hero h1 {
                font-size: 1.8rem;
            }
            .tsm-compass-grid {
                grid-template-columns: 1fr;
            }
            .spotlight-box, .tsm-quiz-card {
                padding: 1.2rem 1rem;
            }
            .spotlight-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.75rem;
            }
            .spotlight-explanation {
                text-align: left;
                max-width: 100%;
            }
            .quiz-sentence-box {
                padding: 1.1rem 1.2rem;
                font-size: 1.1rem;
            }
            .quiz-options-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const hero = document.createElement('div');
    hero.className = 'tsm-hero';
    hero.innerHTML = `
        <h1>${getTranslation('tsm_hero_title')}</h1>
        <p>${getTranslation('tsm_hero_desc')}</p>
        <div class="tsm-core-badges">
            <span class="tsm-pill pill-synes">${getTranslation('tsm_badge_synes')}</span>
            <span class="tsm-pill pill-tror">${getTranslation('tsm_badge_tror')}</span>
            <span class="tsm-pill pill-mener">${getTranslation('tsm_badge_mener')}</span>
            <span class="tsm-pill pill-ved">${getTranslation('tsm_badge_ved')}</span>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'tsm-tabs-menu';
    const tabs = [
        { id: 'tab_compass', label: getTranslation('tsm_tab_compass', 'Regel-kompasset'), iconName: 'compass' },
        { id: 'tab_spotlight', label: getTranslation('tsm_tab_spotlight', 'Situation-spotlight'), iconName: 'search' },
        { id: 'tab_quiz', label: getTranslation('tsm_tab_quiz', 'Interaktiv quiz (10 opgaver)'), iconName: 'target' },
        { id: 'tab_fejlen', label: getTranslation('tsm_tab_fejlen', 'Spot fejlen! (Rigtig eller forkert?)'), iconName: 'alertTriangle' }
    ];

    let activeTab = 'tab_compass';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `tsm-tab-btn ${t.id === activeTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `${renderDsIcon(t.iconName, '', { size: 17 })} <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    // ==========================================================
    // --- FANE 1: DET STORE REGEL-KOMPAS ---
    // ==========================================================
    const compassPanel = document.createElement('div');
    compassPanel.id = 'panel_compass';
    compassPanel.innerHTML = `
        <div class="tsm-compass-grid">
            <!-- 1. SYNES -->
            <div class="compass-card card-synes">
                <div class="compass-header">
                    <div class="compass-icon">${renderDsIcon('eye', '', { size: 24 })}</div>
                    <div class="compass-title-box">
                        <h3 style="color: #fbbf24;">SYNES</h3>
                        <span style="color: #f59e0b;">${getTranslation('tsm_synes_tag', 'Egen smag & sansning')}</span>
                    </div>
                </div>
                <div class="compass-rule">
                    ${getTranslation('tsm_synes_rule')}
                </div>
                <ul class="compass-examples">
                    <li><span class="ex-bullet"></span><span class="ex-text">"Jeg <strong>synes</strong>, kaffen smager godt."</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"Hvad <strong>synes</strong> du om filmen?" (efter du har set den)</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"Jeg <strong>synes</strong>, her er koldt i dag."</span></li>
                </ul>
                <div class="compass-trap">
                    <strong>${getTranslation('tsm_synes_trap_title', 'Vigtig sprogregel:')}</strong>
                    ${getTranslation('tsm_synes_trap_desc')}
                </div>
            </div>

            <!-- 2. TROR -->
            <div class="compass-card card-tror">
                <div class="compass-header">
                    <div class="compass-icon">${renderDsIcon('thought', '', { size: 24 })}</div>
                    <div class="compass-title-box">
                        <h3 style="color: #7dd3fc;">TROR</h3>
                        <span style="color: #38bdf8;">${getTranslation('tsm_tror_tag', 'Gæt, vejr & fremtid')}</span>
                    </div>
                </div>
                <div class="compass-rule">
                    ${getTranslation('tsm_tror_rule')}
                </div>
                <ul class="compass-examples">
                    <li><span class="ex-bullet"></span><span class="ex-text">"Jeg <strong>tror</strong>, det regner i morgen."</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"Jeg <strong>tror</strong>, bussen kommer lige om lidt."</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"Hvor gammel er han? – Jeg <strong>tror</strong>, han er 30."</span></li>
                </ul>
                <div class="compass-trap">
                    <strong>${getTranslation('tsm_tror_trap_title', 'Vigtig sprogregel:')}</strong>
                    ${getTranslation('tsm_tror_trap_desc')}
                </div>
            </div>

            <!-- 3. MENER -->
            <div class="compass-card card-mener">
                <div class="compass-header">
                    <div class="compass-icon">${renderDsIcon('scale', '', { size: 24 })}</div>
                    <div class="compass-title-box">
                        <h3 style="color: #a5b4fc;">MENER</h3>
                        <span style="color: #818cf8;">${getTranslation('tsm_mener_tag', 'Holdning, etik & princip')}</span>
                    </div>
                </div>
                <div class="compass-rule">
                    ${getTranslation('tsm_mener_rule')}
                </div>
                <ul class="compass-examples">
                    <li><span class="ex-bullet"></span><span class="ex-text">"Jeg <strong>mener</strong>, vi bør passe bedre på klimaet."</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"Hvad <strong>mener</strong> du om den nye regel på arbejdet?"</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"Lægen <strong>mener</strong>, at patienten skal hvile sig."</span></li>
                </ul>
                <div class="compass-trap">
                    <strong>${getTranslation('tsm_mener_trap_title', 'Husk:')}</strong>
                    ${getTranslation('tsm_mener_trap_desc')}
                </div>
            </div>

            <!-- 4. VED -->
            <div class="compass-card card-ved">
                <div class="compass-header">
                    <div class="compass-icon">${renderDsIcon('keyRule', '', { size: 24 })}</div>
                    <div class="compass-title-box">
                        <h3 style="color: #6ee7b7;">VED</h3>
                        <span style="color: #34d399;">${getTranslation('tsm_ved_tag', '100 % fakta & data')}</span>
                    </div>
                </div>
                <div class="compass-rule">
                    ${getTranslation('tsm_ved_rule')}
                </div>
                <ul class="compass-examples">
                    <li><span class="ex-bullet"></span><span class="ex-text">"Jeg <strong>ved</strong>, at butikken lukker kl. 18."</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"Jeg <strong>ved</strong>, at Danmarks hovedstad er København."</span></li>
                    <li><span class="ex-bullet"></span><span class="ex-text">"<strong>Ved</strong> du, hvor stationen ligger?"</span></li>
                </ul>
                <div class="compass-trap">
                    <strong>${getTranslation('tsm_ved_trap_title', 'Benægtelse:')}</strong>
                    ${getTranslation('tsm_ved_trap_desc')}
                </div>
            </div>
        </div>
    `;

    // ==========================================================
    // --- FANE 2: SITUATION-SPOTLIGHT ---
    // ==========================================================
    const spotlightPanel = document.createElement('div');
    spotlightPanel.id = 'panel_spotlight';

    function getSituations() {
        return [
            {
                id: 'kaffe',
                title: getTranslation('tsm_sit_1_title'),
                desc: getTranslation('tsm_sit_1_desc'),
                items: [
                    { verb: 'synes', tagClass: 'pill-synes', text: 'Jeg synes, kaffen smager dejligt!', expl: getTranslation('tsm_sit_1_synes_expl') },
                    { verb: 'tror', tagClass: 'pill-tror', text: 'Jeg tror, kaffen er meget varm – pas på.', expl: getTranslation('tsm_sit_1_tror_expl') },
                    { verb: 'mener', tagClass: 'pill-mener', text: 'Jeg mener, alle caféer bør servere økologisk kaffe.', expl: getTranslation('tsm_sit_1_mener_expl') },
                    { verb: 'ved', tagClass: 'pill-ved', text: 'Jeg ved, at en kop kaffe her koster 35 kr.', expl: getTranslation('tsm_sit_1_ved_expl') }
                ]
            },
            {
                id: 'kollega',
                title: getTranslation('tsm_sit_2_title'),
                desc: getTranslation('tsm_sit_2_desc'),
                items: [
                    { verb: 'synes', tagClass: 'pill-synes', text: 'Jeg synes, Peter virker rigtig flink og hjælpsom.', expl: getTranslation('tsm_sit_2_synes_expl') },
                    { verb: 'tror', tagClass: 'pill-tror', text: 'Jeg tror, Peter bor i Odense.', expl: getTranslation('tsm_sit_2_tror_expl') },
                    { verb: 'mener', tagClass: 'pill-mener', text: 'Jeg mener, vi bør give Peter en grundigere oplæring.', expl: getTranslation('tsm_sit_2_mener_expl') },
                    { verb: 'ved', tagClass: 'pill-ved', text: 'Jeg ved, at Peter starter officielt den 1. november.', expl: getTranslation('tsm_sit_2_ved_expl') }
                ]
            },
            {
                id: 'vinter',
                title: getTranslation('tsm_sit_3_title'),
                desc: getTranslation('tsm_sit_3_desc'),
                items: [
                    { verb: 'synes', tagClass: 'pill-synes', text: 'Jeg synes, den danske vinter er alt for lang og mørk.', expl: getTranslation('tsm_sit_3_synes_expl') },
                    { verb: 'tror', tagClass: 'pill-tror', text: 'Jeg tror, det begynder at sne i eftermiddag.', expl: getTranslation('tsm_sit_3_tror_expl') },
                    { verb: 'mener', tagClass: 'pill-mener', text: 'Klimaforskere mener, at vintrene bliver vådere.', expl: getTranslation('tsm_sit_3_mener_expl') },
                    { verb: 'ved', tagClass: 'pill-ved', text: 'Meteorologerne ved, at gennemsnittet var 2 grader.', expl: getTranslation('tsm_sit_3_ved_expl') }
                ]
            }
        ];
    }

    let activeSituationIdx = 0;

    function renderSpotlightContent() {
        const situations = getSituations();
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
                            <div class="spotlight-explanation"><span class="spotlight-expl-icon">${renderDsIcon('lightbulb', '', { size: 15 })}</span><span>${item.expl}</span></div>
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
    // --- FANE 3: INTERAKTIV QUIZ ---
    // ==========================================================
    const quizPanel = document.createElement('div');
    quizPanel.id = 'panel_quiz';

    function getQuizQuestions() {
        return [
            {
                sentenceBefore: "Hvad",
                sentenceAfter: "du om denne kage? Den smager lidt stærkt af kanel.",
                correct: "synes",
                explanation: getTranslation('tsm_q1_exp')
            },
            {
                sentenceBefore: "Jeg",
                sentenceAfter: "at bussen kører kl. 14:15, men lad os lige tjekke Rejseplanen for en sikkerheds skyld.",
                correct: "tror",
                explanation: getTranslation('tsm_q2_exp')
            },
            {
                sentenceBefore: "Regeringen",
                sentenceAfter: "at vi bør investere flere penge i den grønne omstilling.",
                correct: "mener",
                explanation: getTranslation('tsm_q3_exp')
            },
            {
                sentenceBefore: "Jeg",
                sentenceAfter: "at Danmarks hovedstad hedder København.",
                correct: "ved",
                explanation: getTranslation('tsm_q4_exp')
            },
            {
                sentenceBefore: "Jeg har aldrig set den nye James Bond film, men jeg",
                sentenceAfter: "den er rigtig spændende.",
                correct: "tror",
                explanation: getTranslation('tsm_q5_exp')
            },
            {
                sentenceBefore: "Nu har jeg prøvet jakken på, og jeg",
                sentenceAfter: "ærmerne er en smule for korte.",
                correct: "synes",
                explanation: getTranslation('tsm_q6_exp')
            },
            {
                sentenceBefore: "Lægen",
                sentenceAfter: "at patienten har brug for to ugers sygemelding.",
                correct: "mener",
                explanation: getTranslation('tsm_q7_exp')
            },
            {
                sentenceBefore: "Undskyld, er der nogen her, der",
                sentenceAfter: "hvor det nærmeste apotek ligger?",
                correct: "ved",
                explanation: getTranslation('tsm_q8_exp')
            },
            {
                sentenceBefore: "Hvor gammel er Mette? – Jeg",
                sentenceAfter: "hun fylder 35 i næste måned.",
                correct: "tror",
                explanation: getTranslation('tsm_q9_exp')
            },
            {
                sentenceBefore: "Hvad",
                sentenceAfter: "I, at vi som familie skal prioritere på vores budget?",
                correct: "mener",
                explanation: getTranslation('tsm_q10_exp')
            }
        ];
    }

    let currQuizIdx = 0;
    const quizCard = document.createElement('div');
    quizCard.className = 'tsm-quiz-card';

    function renderQuizTask() {
        const quizQuestions = getQuizQuestions();
        quizCard.innerHTML = '';
        const q = quizQuestions[currQuizIdx];

        const counterBadge = document.createElement('div');
        counterBadge.className = 'quiz-counter-badge';
        counterBadge.textContent = getTranslation('tsm_q_counter', { current: currQuizIdx + 1, total: quizQuestions.length });
        quizCard.appendChild(counterBadge);

        const fullSentence = `${q.sentenceBefore} ________ ${q.sentenceAfter}`;
        const sentenceBox = document.createElement('div');
        sentenceBox.className = 'quiz-sentence-box';
        sentenceBox.innerHTML = `
            <span>${fullSentence}</span>
            <button class="quiz-audio-btn" title="${getTranslation('tsm_q_listen_title')}" id="btn-audio-quiz">${renderDsIcon('volume', '', { size: 18 })}</button>
        `;
        quizCard.appendChild(sentenceBox);

        sentenceBox.querySelector('#btn-audio-quiz').onclick = () => {
            speakDanish(`${q.sentenceBefore} ${q.correct} ${q.sentenceAfter}`);
        };

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'quiz-options-grid';

        const verbOptions = [
            { text: 'synes', sub: getTranslation('tsm_q_opt_synes_sub') },
            { text: 'tror', sub: getTranslation('tsm_q_opt_tror_sub') },
            { text: 'mener', sub: getTranslation('tsm_q_opt_mener_sub') },
            { text: 'ved', sub: getTranslation('tsm_q_opt_ved_sub') }
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
                        <div style="color: #4ade80; font-size: 1.15rem; font-weight: 800; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.45rem;">
                            ${renderDsIcon('check', '', { size: 18 })}
                            <span>${getTranslation('tsm_q_correct_title')}</span>
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
                        <div style="color: #f87171; font-size: 1.15rem; font-weight: 800; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.45rem;">
                            ${renderDsIcon('prohibited', '', { size: 18 })}
                            <span>${getTranslation('tsm_q_wrong_title', { correct: q.correct })}</span>
                        </div>
                        <div style="color: #cbd5e1; font-size: 1rem; line-height: 1.5;">
                            ${q.explanation}
                        </div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'quiz-next-btn';
                nextBtn.textContent = currQuizIdx < quizQuestions.length - 1 ? getTranslation('tsm_q_next_btn') : getTranslation('tsm_q_restart_btn');
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
    // --- FANE 4: SPOT FEJLEN! ---
    // ==========================================================
    const fejlenPanel = document.createElement('div');
    fejlenPanel.id = 'panel_fejlen';

    function getTrapSentences() {
        return [
            {
                sentence: '"Jeg synes, det bliver solskin på lørdag."',
                isRight: false,
                correction: getTranslation('tsm_corr_label', { sentence: 'Jeg tror, det bliver solskin på lørdag.' }),
                expl: getTranslation('tsm_trap_1_expl')
            },
            {
                sentence: '"Jeg synes, filmen var fantastisk, da jeg så den i biografen."',
                isRight: true,
                correction: getTranslation('tsm_corr_perfect'),
                expl: getTranslation('tsm_trap_2_expl')
            },
            {
                sentence: '"Jeg tror, kagen smager for sødt (sagt mens du spiser den)."',
                isRight: false,
                correction: getTranslation('tsm_corr_label', { sentence: 'Jeg synes, kagen smager for sødt.' }),
                expl: getTranslation('tsm_trap_3_expl')
            },
            {
                sentence: '"Lægen mener, at daglig motion nedsætter risikoen for sygdom."',
                isRight: true,
                correction: getTranslation('tsm_corr_perfect'),
                expl: getTranslation('tsm_trap_4_expl')
            },
            {
                sentence: '"Jeg synes ikke, hvor rådhuset ligger."',
                isRight: false,
                correction: getTranslation('tsm_corr_label', { sentence: 'Jeg ved ikke, hvor rådhuset ligger.' }),
                expl: getTranslation('tsm_trap_5_expl')
            },
            {
                sentence: '"Hvad mener du om Danmarks nye klimaaftale?"',
                isRight: true,
                correction: getTranslation('tsm_corr_perfect'),
                expl: getTranslation('tsm_trap_6_expl')
            }
        ];
    }

    fejlenPanel.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${getTranslation('tsm_trap_header_title')}</h2>
            <p style="color: #94a3b8;">${getTranslation('tsm_trap_header_desc')}</p>
        </div>
        <div id="traps-list"></div>
    `;

    const trapsHolder = fejlenPanel.querySelector('#traps-list');
    const trapSentences = getTrapSentences();
    trapSentences.forEach((t, i) => {
        const item = document.createElement('div');
        item.className = 'trap-item';
        item.innerHTML = `
            <div class="trap-sentence">${t.sentence}</div>
            <div class="trap-buttons" id="trap-btns-${i}">
                <button class="trap-vote-btn trap-btn-right" id="vote-right-${i}">${renderDsIcon('check', '', { size: 16 })} <span>${getTranslation('tsm_btn_vote_right')}</span></button>
                <button class="trap-vote-btn trap-btn-wrong" id="vote-wrong-${i}">${renderDsIcon('prohibited', '', { size: 16 })} <span>${getTranslation('tsm_btn_vote_wrong')}</span></button>
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
                    <div style="color: #4ade80; font-weight: 800; font-size: 1.05rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.45rem;">
                        ${renderDsIcon('check', '', { size: 18 })}
                        <span>${getTranslation('tsm_trap_res_correct')}</span>
                    </div>
                    <div style="color: #f1f5f9; font-weight: 700; margin-bottom: 0.3rem;">${t.correction}</div>
                    <div style="color: #cbd5e1;">${t.expl}</div>
                `;
            } else {
                resBox.style.background = 'rgba(239, 68, 68, 0.15)';
                resBox.style.border = '1px solid #ef4444';
                resBox.innerHTML = `
                    <div style="color: #f87171; font-weight: 800; font-size: 1.05rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.45rem;">
                        ${renderDsIcon('prohibited', '', { size: 18 })}
                        <span>${getTranslation('tsm_trap_res_wrong')}</span>
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
