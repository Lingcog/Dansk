import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { speakSansningDanish } from '../components/SansningIntegration.js';

/**
 * SansningAktivitetTilTingView - Hovedflade 1 • Station 1.5:
 * Fra aktivitet til ting (at træne ➔ træning • at læse ➔ læsning • at bevæge sig ➔ bevægelse)
 * Uden vrimlebillede — med interaktivt taktilt SVG-støbelaboratorium og omformning af at-sætninger til substantiver.
 */
export function renderSansningAktivitetTilTingView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    const style = document.createElement('style');
    style.textContent = `
        .sansning-station-view {
            max-width: 1120px;
            margin: 0 auto;
            padding: 1rem 1.25rem 5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }
        .ss-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        .ss-back-btn {
            background: #5C0812;
            border: 1.5px solid #851825;
            color: #ffffff;
            padding: 0.55rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
        }
        .ss-back-btn:hover {
            border-color: #FFC9CD;
            background: #73101C;
        }
        .ss-station-badge {
            background: rgba(92, 8, 18, 0.85);
            border: 1px solid #851825;
            border-radius: 999px;
            padding: 0.35rem 1rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #FFC9CD;
        }
        .ss-hero {
            text-align: center;
            margin-bottom: 1.6rem;
        }
        .ss-hero h1 {
            font-size: 2.1rem;
            font-weight: 900;
            margin: 0 0 0.45rem;
            color: #ffffff;
        }
        .ss-hero p {
            color: #FFC9CD;
            font-size: 1rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.55;
        }
        .ss-tabs-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1.4rem;
            justify-content: center;
        }
        .ss-tab-btn {
            background: #4A040B;
            border: 1.5px solid #851825;
            color: #FFC9CD;
            padding: 0.65rem 1.15rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-tab-btn.active {
            background: #FF4D5E;
            border-color: #FFC9CD;
            color: #ffffff;
            box-shadow: 0 6px 20px rgba(255, 77, 94, 0.35);
        }
        .ss-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.4rem 1.5rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.42);
        }
        .ss-grid-2 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.1rem;
        }
        .ss-pair-card {
            background: #4A040B;
            border: 1.5px solid #851825;
            border-radius: 16px;
            padding: 1.05rem 1.15rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-pair-card:hover {
            border-color: #38bdf8;
            transform: translateY(-2px);
        }
        .ss-lab-pill-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 1.1rem;
        }
        .ss-lab-pill {
            background: #4A040B;
            border: 1.5px solid #851825;
            color: #FFC9CD;
            padding: 0.48rem 0.95rem;
            border-radius: 999px;
            font-size: 0.86rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .ss-lab-pill.active {
            background: #0f172a;
            border-color: #38bdf8;
            color: #ffffff;
        }
        .ss-slider-box {
            background: #4A040B;
            border: 1.5px solid #851825;
            border-radius: 16px;
            padding: 1.1rem 1.25rem;
            margin-top: 1rem;
        }
        .ss-stage-btns {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.6rem;
            margin-bottom: 0.9rem;
        }
        @media (max-width: 640px) {
            .ss-stage-btns { grid-template-columns: 1fr; }
        }
        .ss-stage-btn {
            background: #0f172a;
            border: 1.5px solid rgba(148, 163, 184, 0.35);
            color: #cbd5e1;
            padding: 0.6rem 0.8rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .ss-stage-btn.active-flow {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.18);
            color: #ffffff;
        }
        .ss-stage-btn.active-mold {
            border-color: #fde047;
            background: rgba(253, 224, 71, 0.16);
            color: #fde047;
        }
        .ss-stage-btn.active-thing {
            border-color: #fb923c;
            background: rgba(251, 146, 60, 0.2);
            color: #ffffff;
        }
        .ss-range {
            width: 100%;
            accent-color: #fb923c;
            cursor: pointer;
            margin: 0.35rem 0 0.85rem;
        }
        .ss-quiz-opt {
            background: #4A040B;
            border: 1.5px solid #851825;
            color: #ffffff;
            padding: 0.65rem 1rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .ss-quiz-opt:hover { border-color: #38bdf8; }
        .ss-quiz-opt.correct { background: rgba(22, 163, 74, 0.35); border-color: #4ade80; color: #bbf7d0; }
        .ss-quiz-opt.wrong { background: rgba(220, 38, 38, 0.35); border-color: #f87171; color: #fecaca; }
        .ss-input-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            align-items: center;
            margin-top: 0.65rem;
        }
        .ss-text-input {
            background: #0f172a;
            border: 1.5px solid #851825;
            color: #ffffff;
            padding: 0.55rem 0.9rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 700;
            min-width: 180px;
        }
        .ss-text-input:focus {
            outline: none;
            border-color: #38bdf8;
        }
    `;
    viewContainer.appendChild(style);

    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.innerHTML = `← Tilbage til Hovedflade 1 (Substans & Bestemthed)`;
    backBtn.onclick = () => navigateFn('sansning_flade1');
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.textContent = 'Hovedflade 1 • Station 1.5: Fra aktivitet til ting';
    topBar.appendChild(badge);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Fra aktivitet til ting – (at træne ➔ træning • at læse ➔ læsning)</h1>
        <p>
            Når vi ser en handling i bevægelse (<em>at træne, at svømme, at læse, at bevæge sig</em>), bruger vi et <strong>verbum</strong>.
            Men når vi pakker hele aktiviteten ind i en fast form — typisk med endelsen <strong>-ing / -ning / -else</strong> — bliver den til en <strong>ting (et substantiv)</strong>,
            som vi kan pege på, tælle og sætte forrest i sætningen: <em>Træningen starter kl. 17</em>.
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    const contentArea = document.createElement('div');
    viewContainer.appendChild(tabsNav);
    viewContainer.appendChild(contentArea);

    // ========================================================================
    // DATA TIL TAKTILT STØBE-LAB (5 hverdags-aktiviteter)
    // ========================================================================
    const LAB_ITEMS = [
        {
            id: 'traene',
            verb: 'at træne',
            stem: 'træn',
            suffix: '-ing',
            noun: 'træning',
            definite: 'træningen',
            verbSentence: 'Jeg elsker at træne hver tirsdag.',
            thingSentence: 'Træningen starter kl. 17 hver tirsdag.',
            explain: 'Handlingen »at træne« (noget kroppen gør i tiden) bliver støbt fast med -ing til tingen »træning« — nu kan den have et starttidspunkt og stå som emne.'
        },
        {
            id: 'laese',
            verb: 'at læse',
            stem: 'læs',
            suffix: '-ning',
            noun: 'læsning',
            definite: 'læsningen',
            verbSentence: 'Det er afslappende at læse om aftenen.',
            thingSentence: 'Læsning giver ro om aftenen.',
            explain: '»at læse« er en levende aktivitet. Med -ning samles hele aktiviteten i én håndgribelig pakke: »læsning«.'
        },
        {
            id: 'svoemme',
            verb: 'at svømme',
            stem: 'svøm',
            suffix: '-ning',
            noun: 'svømning',
            definite: 'svømningen',
            verbSentence: 'Hun kan godt lide at svømme i havet.',
            thingSentence: 'Svømning er hendes yndlingssport.',
            explain: 'Når »at svømme« pakkes med -ning, kan vi tale om »svømning« som en fast ting eller sportsgren.'
        },
        {
            id: 'undervise',
            verb: 'at undervise',
            stem: 'undervis',
            suffix: '-ning',
            noun: 'undervisning',
            definite: 'undervisningen',
            verbSentence: 'Læreren er god til at undervise i dansk.',
            thingSentence: 'Undervisningen i dansk er rigtig god.',
            explain: 'I stedet for at beskrive hvad læreren gør (»at undervise«), peger vi på selve begivenheden som en ting: »undervisningen«.'
        },
        {
            id: 'bevaege',
            verb: 'at bevæge sig',
            stem: 'bevæg',
            suffix: '-else',
            noun: 'bevægelse',
            definite: 'bevægelsen',
            verbSentence: 'Det er vigtigt at bevæge sig hver dag.',
            thingSentence: 'Daglig bevægelse giver energi.',
            explain: 'Nogle verber bruger endelsen -else til at støbe en aktivitet om til en ting: »at bevæge sig« ➔ »bevægelse«.'
        }
    ];

    let activeTab = 'lab';
    let selectedLabIdx = 0;
    let morphStage = 0; // 0 = aktivitet (at træne), 1 = støbeformen lukker (-ing), 2 = fast ting (træning)

    function renderMorphSvg(item, stage) {
        if (stage === 0) {
            // 0: Aktivitet i bevægelse (kølig blå bølge-energi)
            return `
                <svg viewBox="0 0 640 210" width="100%" style="max-height:220px; display:block; border-radius:14px; background:#0b1326; border:1.5px solid rgba(56,189,248,0.5);">
                    <!-- Flydende bevægelsesbølger -->
                    <path d="M 30 120 Q 110 55 190 120 T 350 120 T 510 120 T 610 105" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
                    <path d="M 30 146 Q 110 86 190 146 T 350 146 T 510 146 T 610 132" fill="none" stroke="rgba(56,189,248,0.38)" stroke-width="3" stroke-dasharray="7,6"/>
                    <!-- Bevægelsespil -->
                    <polygon points="596,95 616,105 598,116" fill="#38bdf8"/>
                    <!-- Åben tidslinje -->
                    <line x1="40" y1="180" x2="600" y2="180" stroke="#475569" stroke-width="2" stroke-dasharray="4,4"/>
                    <!-- Tekst i bevægelse (ingen lukket boks) -->
                    <text x="320" y="68" text-anchor="middle" fill="#7dd3fc" font-size="13" font-weight="800" letter-spacing="1.5">AKTIVITET I BEVÆGELSE (VERBUM)</text>
                    <text x="320" y="106" text-anchor="middle" fill="#ffffff" font-size="30" font-weight="900">${item.verb}</text>
                </svg>
            `;
        }
        if (stage === 1) {
            // 1: Overgang — støbeformen lukker sig om stammen med endelsen (-ing / -else)
            return `
                <svg viewBox="0 0 640 210" width="100%" style="max-height:220px; display:block; border-radius:14px; background:#141320; border:1.5px solid rgba(253,224,71,0.55);">
                    <text x="320" y="38" text-anchor="middle" fill="#fde047" font-size="13" font-weight="800" letter-spacing="1.5">STØBEFORMEN LUKKER SIG OM AKTIVITETEN</text>
                    <!-- Venstre stamme-klods -->
                    <rect x="95" y="66" width="215" height="74" rx="14" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="2.5"/>
                    <text x="202" y="112" text-anchor="middle" fill="#ffffff" font-size="26" font-weight="900">${item.stem}-</text>
                    <!-- Pil ind i midten -->
                    <line x1="322" y1="103" x2="366" y2="103" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="362,94 378,103 362,112" fill="#fde047"/>
                    <!-- Højre støbe-endelse -->
                    <rect x="386" y="66" width="160" height="74" rx="14" fill="rgba(251,146,60,0.24)" stroke="#fb923c" stroke-width="3"/>
                    <text x="466" y="112" text-anchor="middle" fill="#fde047" font-size="28" font-weight="900">${item.suffix}</text>
                    <!-- Samlende klamme under -->
                    <path d="M 110 154 Q 320 184 530 154" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5,4"/>
                    <text x="320" y="188" text-anchor="middle" fill="#cbd5e1" font-size="13" font-weight="700">»at« forsvinder — endelsen pakker handlingen ind som én fast enhed</text>
                </svg>
            `;
        }
        // 2: Fast ting / substantiv (varm orange, fast kontur-pakke man kan pege på)
        return `
            <svg viewBox="0 0 640 210" width="100%" style="max-height:220px; display:block; border-radius:14px; background:#1c110d; border:1.5px solid rgba(251,146,60,0.65);">
                <text x="320" y="38" text-anchor="middle" fill="#fdba74" font-size="13" font-weight="800" letter-spacing="1.5">FAST TING / FÆNOMEN (SUBSTANTIV)</text>
                <!-- Fast støbt boks/enhed -->
                <rect x="145" y="56" width="350" height="92" rx="18" fill="rgba(251,146,60,0.2)" stroke="#fb923c" stroke-width="3.5"/>
                <text x="320" y="104" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="900">${item.noun}</text>
                <text x="320" y="132" text-anchor="middle" fill="#fde047" font-size="14" font-weight="800">bestemt form: ${item.definite}</text>
                <!-- Håndtag / anker-markør -->
                <circle cx="145" cy="102" r="8" fill="#fb923c"/>
                <circle cx="495" cy="102" r="8" fill="#fb923c"/>
                <text x="320" y="182" text-anchor="middle" fill="#fed7aa" font-size="13" font-weight="700">Nu kan du pege på den, sætte -en bagpå og bruge den som subjekt</text>
            </svg>
        `;
    }

    // ========================================================================
    // DATA TIL OPGAVE: OMFORM AT-SÆTNINGER TIL SUBSTANTIVER
    // ========================================================================
    const TRANSFORM_QUIZ = [
        {
            atSentence: 'Det er sundt <strong>at træne</strong> hver dag.',
            targetBefore: '',
            targetAfter: ' er sundt hver dag.',
            options: ['Træning', 'Træner', 'At trænet'],
            correct: 0,
            explain: '»at træne« pakkes med -ing til substantivet »Træning«, som kan stå forrest som emne.'
        },
        {
            atSentence: 'Jeg elsker <strong>at læse</strong> om aftenen.',
            targetBefore: 'Jeg elsker ',
            targetAfter: ' om aftenen.',
            options: ['læser', 'læsning', 'læste'],
            correct: 1,
            explain: '»at læse« ➔ »læsning« (aktiviteten samles som én ting).'
        },
        {
            atSentence: 'Det tager lang tid <strong>at flytte</strong> til en ny by.',
            targetBefore: '',
            targetAfter: ' til en ny by tager lang tid.',
            options: ['Flytning', 'Flytter', 'Flyttet'],
            correct: 0,
            explain: '»at flytte« ➔ »Flytning« (hele processen bliver til én samlet begivenhed).'
        },
        {
            atSentence: 'Hun er rigtig glad for <strong>at svømme</strong>.',
            targetBefore: 'Hun er rigtig glad for ',
            targetAfter: '.',
            options: ['svømmer', 'svømte', 'svømning'],
            correct: 2,
            explain: 'Efter præpositionen »for« kan aktiviteten stå direkte som tingen »svømning«.'
        },
        {
            atSentence: 'Det er vigtigt <strong>at forberede</strong> sig godt.',
            targetBefore: 'God ',
            targetAfter: ' er vigtig.',
            options: ['forberedning', 'forberedelse', 'forbereder'],
            correct: 1,
            explain: '»at forberede« bruger endelsen -else: »forberedelse«.'
        },
        {
            atSentence: 'Vi lærte meget af <strong>at opleve</strong> naturen.',
            targetBefore: 'Naturen gav os en stor ',
            targetAfter: '.',
            options: ['oplevelse', 'oplevning', 'oplever'],
            correct: 0,
            explain: '»at opleve« bliver med -else til en tællelig ting: »en stor oplevelse«.'
        },
        {
            atSentence: 'Det var dejligt <strong>at besøge</strong> familien.',
            targetBefore: 'Det var et dejligt ',
            targetAfter: ' hos familien.',
            options: ['besøgning', 'besøg', 'besøger'],
            correct: 1,
            explain: 'Nogle korte verber smider bare endelsen og bliver direkte til en ting: »at besøge« ➔ »et besøg«.'
        },
        {
            atSentence: 'Hun nyder <strong>at undervise</strong> nye kursister.',
            targetBefore: 'Hun nyder ',
            targetAfter: ' med nye kursister.',
            options: ['underviselse', 'underviser', 'undervisningen'],
            correct: 2,
            explain: '»at undervise« ➔ »undervisning« / i bestemt form »undervisningen«.'
        }
    ];

    const quizAnswers = {};
    const buildAnswers = {};

    const BUILD_YOURSELF = [
        { prompt: 'Det er sjovt <strong>at cykle</strong> i skoven. ➔ ___ i skoven er sjovt.', accept: ['cykling', 'cyklingen'], hint: 'stamme + -ing' },
        { prompt: 'Det hjælper <strong>at planlægge</strong> ugen. ➔ God ___ hjælper.', accept: ['planlægning', 'planlægningen'], hint: 'stamme + -ning' },
        { prompt: 'Det er godt <strong>at forstå</strong> hinanden. ➔ Gensidig ___ er vigtig.', accept: ['forståelse', 'forståelsen'], hint: 'stamme + -else' }
    ];

    function renderTabs() {
        const tabs = [
            { id: 'lab', label: '1. Taktilt Støbe-Lab (At handle ➔ En ting)' },
            { id: 'patterns', label: '2. De 3 støbeforme (-ing • -else • kort form)' },
            { id: 'quiz', label: '3. Omform at-sætninger til ting (Øvelse)' }
        ];
        tabsNav.innerHTML = '';
        tabs.forEach(t => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = `ss-tab-btn ${activeTab === t.id ? 'active' : ''}`;
            b.dataset.tabId = t.id;
            b.textContent = t.label;
            b.onclick = () => {
                activeTab = t.id;
                renderTabs();
                renderContent();
            };
            tabsNav.appendChild(b);
        });
    }

    function renderContent() {
        contentArea.innerHTML = '';

        if (activeTab === 'lab') {
            const item = LAB_ITEMS[selectedLabIdx];
            const card = document.createElement('div');
            card.className = 'ss-card';

            const activeSentence = morphStage < 2 ? item.verbSentence : item.thingSentence;

            card.innerHTML = `
                <h2 style="margin:0 0 0.35rem; font-size:1.3rem; color:#ffffff;">Støbe-laboratoriet: Se en aktivitet blive til en ting</h2>
                <p style="margin:0 0 1rem; color:#FFC9CD; font-size:0.94rem;">
                    Vælg et eksempel og skub forvandlingen fra levende <strong>aktivitet</strong> til fast <strong>ting</strong>:
                </p>
                <div class="ss-lab-pill-row" id="att-word-pills">
                    ${LAB_ITEMS.map((it, idx) => `
                        <button type="button" class="ss-lab-pill ${idx === selectedLabIdx ? 'active' : ''}" data-lab-idx="${idx}">
                            ${it.verb} ➔ ${it.noun}
                        </button>
                    `).join('')}
                </div>

                <div id="att-svg-stage">${renderMorphSvg(item, morphStage)}</div>

                <div class="ss-slider-box">
                    <div class="ss-stage-btns">
                        <button type="button" class="ss-stage-btn ${morphStage === 0 ? 'active-flow' : ''}" data-stage="0">
                            1. Aktivitet: ${item.verb}
                        </button>
                        <button type="button" class="ss-stage-btn ${morphStage === 1 ? 'active-mold' : ''}" data-stage="1">
                            2. Sæt støbeform på (${item.suffix})
                        </button>
                        <button type="button" class="ss-stage-btn ${morphStage === 2 ? 'active-thing' : ''}" data-stage="2">
                            3. Fast ting: ${item.noun}
                        </button>
                    </div>

                    <input type="range" min="0" max="2" step="1" value="${morphStage}" class="ss-range" id="att-morph-slider" aria-label="Forvandling fra aktivitet til ting" />

                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; background:#0f172a; border:1px solid rgba(148,163,184,0.25); border-radius:12px; padding:0.85rem 1rem;">
                        <div>
                            <div style="font-size:0.75rem; font-weight:800; color:${morphStage < 2 ? '#7dd3fc' : '#fdba74'}; text-transform:uppercase; letter-spacing:0.05em;">
                                ${morphStage < 2 ? 'I bevægelse (verbum)' : 'Pakket som ting (substantiv)'}
                            </div>
                            <div style="font-size:1.1rem; font-weight:800; color:#ffffff; margin-top:0.2rem;">${activeSentence}</div>
                        </div>
                        <button type="button" class="ss-back-btn" id="att-speak-btn" style="padding:0.45rem 0.9rem; font-size:0.84rem;">Lyt</button>
                    </div>

                    <p style="margin:0.85rem 0 0; color:#FFC9CD; font-size:0.92rem; line-height:1.5;">${item.explain}</p>
                </div>
            `;

            card.querySelectorAll('[data-lab-idx]').forEach(btn => {
                btn.onclick = () => {
                    selectedLabIdx = parseInt(btn.dataset.labIdx, 10);
                    renderContent();
                };
            });
            card.querySelectorAll('[data-stage]').forEach(btn => {
                btn.onclick = () => {
                    morphStage = parseInt(btn.dataset.stage, 10);
                    renderContent();
                };
            });
            const slider = card.querySelector('#att-morph-slider');
            if (slider) {
                slider.oninput = () => {
                    morphStage = parseInt(slider.value, 10);
                    renderContent();
                };
            }
            const speakBtn = card.querySelector('#att-speak-btn');
            if (speakBtn) {
                speakBtn.onclick = () => speakSansningDanish(activeSentence);
            }

            contentArea.appendChild(card);
        } else if (activeTab === 'patterns') {
            const groups = [
                {
                    title: 'Støbeform 1: -ing / -ning (den mest almindelige)',
                    desc: 'Bruges til de fleste dagligdags aktiviteter, sport og arbejde. Giver altid en-ord (en træning ➔ træningen).',
                    pairs: [
                        ['at træne', 'træning / træningen'],
                        ['at læse', 'læsning / læsningen'],
                        ['at svømme', 'svømning / svømningen'],
                        ['at cykle', 'cykling / cyklingen'],
                        ['at flytte', 'flytning / flytningen'],
                        ['at undervise', 'undervisning / undervisningen']
                    ]
                },
                {
                    title: 'Støbeform 2: -else (oplevede eller indre processer)',
                    desc: 'Ofte om oplevelser, forandringer og følelser. Giver næsten altid en-ord (en oplevelse ➔ oplevelsen).',
                    pairs: [
                        ['at bevæge sig', 'bevægelse / bevægelsen'],
                        ['at opleve', 'oplevelse / oplevelsen'],
                        ['at forstå', 'forståelse / forståelsen'],
                        ['at forberede', 'forberedelse / forberedelsen']
                    ]
                },
                {
                    title: 'Støbeform 3: Kort form / uden endelse',
                    desc: 'Nogle korte, velkendte handlinger smider bare -e og står direkte som et-ord eller en-ord.',
                    pairs: [
                        ['at løbe', 'et løb / løbet'],
                        ['at besøge', 'et besøg / besøget'],
                        ['at sove', 'søvn / søvnen'],
                        ['at vente', 'venten / ventetid']
                    ]
                }
            ];

            groups.forEach(g => {
                const card = document.createElement('div');
                card.className = 'ss-card';
                card.innerHTML = `
                    <h2 style="margin:0 0 0.35rem; font-size:1.22rem; color:#ffffff;">${g.title}</h2>
                    <p style="margin:0 0 1rem; color:#FFC9CD; font-size:0.92rem;">${g.desc}</p>
                    <div class="ss-grid-2">
                        ${g.pairs.map(([v, n]) => `
                            <div class="ss-pair-card" data-speak="${v}. ${n.split('/')[0].trim()}.">
                                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                                    <span style="color:#7dd3fc; font-weight:800; font-size:1rem;">${v}</span>
                                    <span style="color:#fde047; font-weight:900;">➔</span>
                                    <span style="color:#fdba74; font-weight:900; font-size:1rem;">${n}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                card.querySelectorAll('.ss-pair-card').forEach(el => {
                    el.onclick = () => speakSansningDanish(el.dataset.speak);
                });
                contentArea.appendChild(card);
            });
        } else if (activeTab === 'quiz') {
            const card = document.createElement('div');
            card.className = 'ss-card';
            card.innerHTML = `
                <h2 style="margin:0 0 0.35rem; font-size:1.3rem; color:#ffffff;">Omform at-sætninger til ting</h2>
                <p style="margin:0 0 1.2rem; color:#FFC9CD; font-size:0.94rem;">
                    Læs sætningen med <strong>at + verbum</strong>, og vælg den rigtige ting-form (substantiv) i den nye sætning:
                </p>
            `;

            TRANSFORM_QUIZ.forEach((q, idx) => {
                const picked = quizAnswers[idx];
                const block = document.createElement('div');
                block.style.cssText = 'background:#4A040B; border:1.5px solid #851825; border-radius:14px; padding:1rem 1.15rem; margin-bottom:0.9rem;';
                block.dataset.qIdx = String(idx);

                const filledWord = picked !== undefined
                    ? `<span style="color:${picked === q.correct ? '#4ade80' : '#f87171'}; text-decoration:underline;">${q.options[picked]}</span>`
                    : `<span style="color:#fde047;">_____</span>`;

                block.innerHTML = `
                    <div style="font-size:0.92rem; color:#7dd3fc; margin-bottom:0.35rem;">${idx + 1}. ${q.atSentence}</div>
                    <div style="font-size:1.05rem; font-weight:800; color:#ffffff; margin-bottom:0.75rem;">➔ ${q.targetBefore}${filledWord}${q.targetAfter}</div>
                    <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                        ${q.options.map((opt, oi) => {
                            let cls = 'ss-quiz-opt';
                            if (picked === oi) cls += (oi === q.correct ? ' correct' : ' wrong');
                            return `<button type="button" class="${cls}" data-opt="${oi}">${opt}</button>`;
                        }).join('')}
                    </div>
                    ${picked !== undefined ? `
                        <div style="margin-top:0.65rem; font-size:0.86rem; color:${picked === q.correct ? '#bbf7d0' : '#fecaca'};">
                            ${picked === q.correct ? 'Rigtigt: ' : 'Prøv igen: '}${q.explain}
                        </div>
                    ` : ''}
                `;

                block.querySelectorAll('[data-opt]').forEach(btn => {
                    btn.onclick = () => {
                        quizAnswers[idx] = parseInt(btn.dataset.opt, 10);
                        renderContent();
                    };
                });
                card.appendChild(block);
            });
            contentArea.appendChild(card);

            // Skriv-selv udfordring
            const writeCard = document.createElement('div');
            writeCard.className = 'ss-card';
            writeCard.innerHTML = `
                <h3 style="margin:0 0 0.35rem; font-size:1.15rem; color:#ffffff;">Prøv selv: Skriv tingen fra at-sætningen</h3>
                <p style="margin:0 0 1rem; color:#FFC9CD; font-size:0.9rem;">Omform selv verbet til et substantiv og tryk Tjek:</p>
            `;

            BUILD_YOURSELF.forEach((b, bi) => {
                const st = buildAnswers[bi] || { val: '', ok: null };
                const row = document.createElement('div');
                row.style.cssText = 'background:#4A040B; border:1px solid #851825; border-radius:12px; padding:0.85rem 1rem; margin-bottom:0.75rem;';
                row.innerHTML = `
                    <div style="font-size:0.95rem; color:#f8fafc;">${b.prompt} <span style="color:#94a3b8; font-size:0.82rem;">(${b.hint})</span></div>
                    <div class="ss-input-row">
                        <input type="text" class="ss-text-input" value="${st.val}" placeholder="Skriv ordet..." data-bi="${bi}" />
                        <button type="button" class="ss-quiz-opt" data-check="${bi}" style="padding:0.5rem 0.9rem;">Tjek</button>
                        ${st.ok !== null ? `<span style="font-weight:800; font-size:0.88rem; color:${st.ok ? '#4ade80' : '#f87171'};">${st.ok ? 'Rigtigt!' : `Prøv: ${b.accept[0]}`}</span>` : ''}
                    </div>
                `;
                const inp = row.querySelector('input');
                const chk = row.querySelector('[data-check]');
                const checkNow = () => {
                    const clean = (inp.value || '').trim().toLowerCase();
                    buildAnswers[bi] = { val: inp.value, ok: b.accept.includes(clean) };
                    renderContent();
                };
                chk.onclick = checkNow;
                inp.onkeydown = (e) => { if (e.key === 'Enter') checkNow(); };
                writeCard.appendChild(row);
            });
            contentArea.appendChild(writeCard);
        }
    }

    renderTabs();
    renderContent();
    container.appendChild(viewContainer);
}
