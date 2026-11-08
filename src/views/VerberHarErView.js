import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * VerberHarErView - Flade 2: "Har" (Motoren) vs. "Er" (Døren) -> Adjektiv (Integreret egenskab)
 * Indeholder:
 *  - Statisk 3-trins linjediagram øverst (1. MOTOREN [HAR] -> 2. DØREN [ER] -> 3. ADJEKTIV)
 *  - Fane 1: Aha-værkstedet (Malerne har malet huset -> Huset er malet -> Et malet hus SAMT har kørt/gået vs. er kørt/gået)
 *  - Fane 2: Træningsbane 1 – Motoren (har) eller Døren (er)?
 *  - Fane 3: Træningsbane 2 – De 3 Stadier (Proces <-> Tilstand <-> Adjektiv)
 *  - Fane 4: Træningsbane 3 – Sætningsbyggeren
 */
export function renderVerberHarErView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container verber-harer-view';

    const style = document.createElement('style');
    style.textContent = `
        .verber-harer-view {
            max-width: 1120px;
            margin: 0 auto;
            padding: 1rem 1.15rem 4.5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }
        .vhe-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.1rem;
        }
        .vhe-back-btn {
            background: rgba(21, 6, 8, 0.88);
            border: 1.5px solid #6B1F26;
            color: #ffffff;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .vhe-back-btn:hover {
            border-color: #f87171;
        }
        .vhe-hero {
            text-align: center;
            margin-bottom: 1.4rem;
        }
        .vhe-hero h1 {
            font-size: 2.05rem;
            font-weight: 900;
            color: #ffffff !important;
            margin: 0.3rem 0 0.45rem;
        }
        .vhe-hero p {
            color: #fecaca;
            font-size: 0.98rem;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.5;
        }
        .vhe-tabs-nav {
            display: flex;
            gap: 0.55rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        .vhe-tab-btn {
            background: rgba(24, 10, 13, 0.88);
            border: 1.5px solid #6B1F26;
            color: #fecaca;
            padding: 0.65rem 1.15rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .vhe-tab-btn.active {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border-color: #fde68a;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(239, 68, 68, 0.35);
        }
        .vhe-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(248, 113, 113, 0.3);
            border-radius: 20px;
            padding: 1.35rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }
        .vhe-opt-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.32);
            color: #f8fafc;
            padding: 0.68rem 1rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.18s ease;
            text-align: left;
        }
        .vhe-opt-btn:hover:not(:disabled) {
            border-color: #fde68a;
        }
        .vhe-opt-btn.correct {
            background: rgba(22, 163, 74, 0.28);
            border-color: #4ade80;
            color: #ffffff;
        }
        .vhe-opt-btn.wrong {
            background: rgba(220, 38, 38, 0.28);
            border-color: #f87171;
            color: #fecaca;
        }
    `;
    viewContainer.appendChild(style);

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'vhe-top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'vhe-back-btn';
    backBtn.innerHTML = `← Tilbage til Verber-oversigten`;
    backBtn.onclick = () => navigateFn('verber_grammatik');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'vhe-hero';
    hero.innerHTML = `
        <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.28rem 0.85rem; border-radius:999px; background:rgba(56,189,248,0.16); border:1px solid rgba(56,189,248,0.45); color:#7dd3fc; font-size:0.76rem; font-weight:900; text-transform:uppercase;">
            Del 2 • Har eller Er i førnutid?
        </div>
        <h1>Har malet • Er malet • Et malet hus</h1>
        <p>
            Lær hvornår du bruger <strong>har</strong> (fokus på aktiviteten), <strong>er</strong> (ny tilstand eller nyt sted) og <strong>ordet foran</strong> (et malet hus).
        </p>
    `;
    viewContainer.appendChild(hero);

    function renderStatic3StepsSvg(activeStep) {
        const s0 = activeStep === 0;
        const s1 = activeStep === 1;
        const s2 = activeStep === 2;
        return `
            <svg viewBox="0 0 680 155" style="width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);">
                <defs>
                    <filter id="heGlow" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="4" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                <line x1="35" y1="128" x2="645" y2="128" stroke="#475569" stroke-width="2.5"/>

                <!-- TRIN 1: HAR (AKTIVITET) -->
                <g opacity="${s0 ? '1' : '0.25'}" style="cursor:pointer;" data-step-click="0">
                    <rect x="28" y="20" width="188" height="88" rx="12" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="${s0 ? '3' : '1.5'}" ${s0 ? 'filter="url(#heGlow)"' : ''}/>
                    <text x="122" y="42" fill="#38bdf8" font-size="10.5" font-weight="900" text-anchor="middle">1. HAR = AKTIVITET</text>
                    <line x1="52" y1="64" x2="192" y2="64" stroke="#38bdf8" stroke-width="${s0 ? '6' : '3'}" stroke-dasharray="10 5" stroke-linecap="round"/>
                    <text x="122" y="84" fill="#ffffff" font-size="9.5" font-weight="800" text-anchor="middle">Fokus på det, man gør</text>
                    <text x="122" y="99" fill="#7dd3fc" font-size="8.5" font-weight="700" text-anchor="middle">"har malet" • "har kørt i 2 timer"</text>
                </g>

                <path d="M 222 64 L 242 64" stroke="#64748b" stroke-width="2"/>

                <!-- TRIN 2: ER (NY TILSTAND / NYT STED) -->
                <g opacity="${s1 ? '1' : '0.25'}" style="cursor:pointer;" data-step-click="1">
                    <rect x="246" y="20" width="188" height="88" rx="12" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" stroke-width="${s1 ? '3' : '1.5'}" ${s1 ? 'filter="url(#heGlow)"' : ''}/>
                    <text x="340" y="42" fill="#fbbf24" font-size="10.5" font-weight="900" text-anchor="middle">2. ER = NY TILSTAND / STED</text>
                    <line x1="340" y1="48" x2="340" y2="78" stroke="#fde68a" stroke-width="3"/>
                    <line x1="278" y1="64" x2="402" y2="64" stroke="#fbbf24" stroke-width="${s1 ? '6' : '3'}" stroke-linecap="round"/>
                    <text x="340" y="84" fill="#ffffff" font-size="9.5" font-weight="800" text-anchor="middle">Skift til ny tilstand eller nyt sted</text>
                    <text x="340" y="99" fill="#fde68a" font-size="8.5" font-weight="700" text-anchor="middle">"Huset er malet" • "Bussen er kørt"</text>
                </g>

                <path d="M 440 64 L 460 64" stroke="#64748b" stroke-width="2"/>

                <!-- TRIN 3: BESKRIVENDE ORD -->
                <g opacity="${s2 ? '1' : '0.25'}" style="cursor:pointer;" data-step-click="2">
                    <rect x="464" y="20" width="188" height="88" rx="12" fill="rgba(74,222,128,0.12)" stroke="#4ade80" stroke-width="${s2 ? '3' : '1.5'}" ${s2 ? 'filter="url(#heGlow)"' : ''}/>
                    <text x="558" y="42" fill="#4ade80" font-size="10.5" font-weight="900" text-anchor="middle">3. BESKRIVENDE ORD</text>
                    <circle cx="558" cy="63" r="10" fill="#4ade80"/>
                    <text x="558" y="84" fill="#ffffff" font-size="9.5" font-weight="800" text-anchor="middle">Står foran navneordet</text>
                    <text x="558" y="99" fill="#86efac" font-size="8.5" font-weight="700" text-anchor="middle">"Et malet hus" • "De malede huse"</text>
                </g>
            </svg>
        `;
    }

    let diagramVisualMode = 'lines'; // 'lines' | 'scenes'
    function renderAnimated3StepsSvg(step) {
        const svgStyle = `width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);`;
        if (step === 0) {
            return `
                <svg viewBox="0 0 420 124" style="${svgStyle}">
                    <line x1="20" y1="104" x2="400" y2="104" stroke="#334155" stroke-width="2"/>
                    <g transform="translate(75, 42)">
                        <circle cx="0" cy="12" r="14" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="2">
                            <animate attributeName="r" values="13;17;13" dur="1s" repeatCount="infinite"/>
                        </circle>
                        <circle cx="0" cy="12" r="8" fill="#38bdf8"/>
                        <path d="M -10 34 Q 0 24 10 34 L 10 60 L -10 60 Z" fill="#0284c7"/>
                        <text x="0" y="-8" fill="#38bdf8" font-size="9.5" font-weight="900" text-anchor="middle">PERSONEN GØR DET</text>
                    </g>
                    <path d="M 98 62 Q 185 44 268 62" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="10 5">
                        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.65s" repeatCount="infinite"/>
                    </path>
                    <path d="M 98 74 Q 185 90 268 74" fill="none" stroke="#7dd3fc" stroke-width="3" stroke-dasharray="8 5">
                        <animate attributeName="stroke-dashoffset" from="26" to="0" dur="0.75s" repeatCount="infinite"/>
                    </path>
                    <rect x="135" y="20" width="115" height="20" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="1.2"/>
                    <text x="192" y="33" fill="#38bdf8" font-size="9.5" font-weight="900" text-anchor="middle">HAR + AKTIVITET</text>
                    <g transform="translate(310, 44)">
                        <polygon points="-32,18 0,-6 32,18" fill="#475569" stroke="#94a3b8" stroke-width="1.5"/>
                        <rect x="-26" y="18" width="52" height="42" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                        <text x="0" y="43" fill="#cbd5e1" font-size="9.5" font-weight="800" text-anchor="middle">Arbejdet står på</text>
                    </g>
                </svg>
            `;
        } else if (step === 1) {
            return `
                <svg viewBox="0 0 420 124" style="${svgStyle}">
                    <line x1="20" y1="104" x2="400" y2="104" stroke="#334155" stroke-width="2"/>
                    <g transform="translate(80, 52)" opacity="0.45">
                        <rect x="-28" y="8" width="56" height="42" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3"/>
                        <text x="0" y="33" fill="#94a3b8" font-size="9" font-weight="700" text-anchor="middle">Før</text>
                    </g>
                    <g transform="translate(205, 18)">
                        <rect x="-24" y="0" width="48" height="86" rx="6" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" stroke-width="3">
                            <animate attributeName="stroke-width" values="2.5;4.5;2.5" dur="1.2s" repeatCount="infinite"/>
                        </rect>
                        <text x="0" y="-5" fill="#fbbf24" font-size="9.5" font-weight="900" text-anchor="middle">SKIFT / OVERGANG</text>
                        <text x="0" y="46" fill="#fde68a" font-size="11" font-weight="900" text-anchor="middle">ER</text>
                    </g>
                    <path d="M 118 72 L 282 72" stroke="#fbbf24" stroke-width="4" stroke-dasharray="10 5">
                        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.7s" repeatCount="infinite"/>
                    </path>
                    <polygon points="282,66 294,72 282,78" fill="#fbbf24"/>
                    <g transform="translate(335, 42)">
                        <polygon points="-32,18 0,-6 32,18" fill="#d97706" stroke="#fde68a" stroke-width="1.5"/>
                        <rect x="-26" y="18" width="52" height="44" fill="rgba(245, 158, 11, 0.3)" stroke="#fbbf24" stroke-width="2.5"/>
                        <text x="0" y="42" fill="#ffffff" font-size="9.5" font-weight="900" text-anchor="middle">NY TILSTAND!</text>
                    </g>
                </svg>
            `;
        } else {
            return `
                <svg viewBox="0 0 420 124" style="${svgStyle}">
                    <line x1="20" y1="104" x2="400" y2="104" stroke="#334155" stroke-width="2"/>
                    <g transform="translate(210, 38)">
                        <ellipse cx="0" cy="30" rx="88" ry="42" fill="rgba(74, 222, 128, 0.14)" stroke="#4ade80" stroke-width="2" stroke-dasharray="7 4">
                            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1.4s" repeatCount="infinite"/>
                        </ellipse>
                        <polygon points="-38,16 0,-10 38,16" fill="#16a34a" stroke="#86efac" stroke-width="2"/>
                        <rect x="-32" y="16" width="64" height="48" fill="#15803d" stroke="#4ade80" stroke-width="2.5"/>
                        <text x="0" y="38" fill="#ffffff" font-size="10.5" font-weight="900" text-anchor="middle">ET MALET HUS</text>
                        <text x="0" y="52" fill="#bbf7d0" font-size="8.5" font-weight="800" text-anchor="middle">(Beskrivende ord)</text>
                    </g>
                </svg>
            `;
        }
    }

    const tabs = [
        { id: 'aha', label: '1. Overblik: Har eller Er?' },
        { id: 'traening', label: '2. Øvelse 1: Vælg har eller er' },
        { id: 'stadier', label: '3. Øvelse 2: De 3 trin' },
        { id: 'builder', label: '4. Øvelse 3: Byg sætninger' }
    ];

    let currentTab = (extraData && extraData.subPath && tabs.some(t => t.id === extraData.subPath))
        ? extraData.subPath
        : 'aha';

    const nav = document.createElement('div');
    nav.className = 'vhe-tabs-nav';
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/verber_har_er/${tabId}`);
        nav.innerHTML = '';
        tabs.forEach(t => {
            const b = document.createElement('button');
            b.className = `vhe-tab-btn ${currentTab === t.id ? 'active' : ''}`;
            b.textContent = t.label;
            b.onclick = () => switchTab(t.id);
            nav.appendChild(b);
        });

        tabContent.innerHTML = '';
        if (tabId === 'aha') renderTabAha(tabContent);
        else if (tabId === 'traening') renderTabTraening(tabContent);
        else if (tabId === 'stadier') renderTabStadier(tabContent);
        else if (tabId === 'builder') renderTabBuilder(tabContent);
    }

    // =========================================================================
    // FANE 1: AHA-VÆRKSTEDET
    // =========================================================================
    function renderTabAha(parent) {
        let selStep = 0;

        const STEP_DATA = [
            {
                title: 'Trin 1: HAR (Fokus på det, man laver)',
                color: '#38bdf8',
                ex1: 'Malerne har malet huset.',
                ex2: 'Jeg har kørt / gået i to timer.',
                desc: 'Med HAR kigger vi på selve arbejdet eller aktiviteten. Ved "har gået / har kørt" handler det om, hvor længe eller hvor langt man har gået/kørt.'
            },
            {
                title: 'Trin 2: ER (Ny tilstand eller nyt sted)',
                color: '#fbbf24',
                ex1: 'Huset er malet.',
                ex2: 'Jeg er kørt / gået hjem. (Bussen er kørt)',
                desc: 'Med ER er der sket en forandring: Huset er færdigmalet, eller personen/bussen er flyttet fra ét sted til et andet ("er gået hjem / er rejst").'
            },
            {
                title: 'Trin 3: FORAN ORDET (Beskriver tingen)',
                color: '#4ade80',
                ex1: 'Et malet hus (Det malede hus / De malede huse).',
                ex2: 'En lukket dør.',
                desc: 'Når ordet står foran "hus" eller "dør", beskriver det tingen. Husk -e i bestemt form og flertal ("det malede hus").'
            }
        ];

        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            const cur = STEP_DATA[selStep];
            wrap.innerHTML = `
                <div class="vhe-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                        <span style="font-size:0.76rem; font-weight:900; color:#fde68a; text-transform:uppercase;">Klik på de 3 trin herunder:</span>
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap; align-items:center;">
                            <button class="vhe-back-btn" id="vhe-toggle-vmode" style="border-color:#fde68a; color:#fde68a; background:rgba(30,41,59,0.95);">
                                ${diagramVisualMode === 'scenes' ? '📐 Vis linjer' : '🎬 Vis animation'}
                            </button>
                            <button class="vhe-back-btn" data-step-click="0" style="border-color:${selStep === 0 ? '#38bdf8' : '#475569'};">1. Har (Aktivitet)</button>
                            <button class="vhe-back-btn" data-step-click="1" style="border-color:${selStep === 1 ? '#fbbf24' : '#475569'};">2. Er (Ny tilstand / sted)</button>
                            <button class="vhe-back-btn" data-step-click="2" style="border-color:${selStep === 2 ? '#4ade80' : '#475569'};">3. Foran ordet</button>
                        </div>
                    </div>

                    ${diagramVisualMode === 'scenes' ? renderAnimated3StepsSvg(selStep) : renderStatic3StepsSvg(selStep)}

                    <div style="margin-top:0.95rem; background:rgba(30,41,59,0.88); border-left:4px solid ${cur.color}; border-radius:12px; padding:1rem 1.2rem;">
                        <h3 style="margin:0 0 0.45rem; font-size:1.18rem; color:${cur.color}; font-weight:900;">${cur.title}</h3>
                        <div style="display:flex; gap:0.65rem; flex-wrap:wrap; margin-bottom:0.55rem;">
                            <span style="background:rgba(15,23,42,0.9); border:1px solid ${cur.color}; padding:0.35rem 0.75rem; border-radius:8px; font-weight:800;">"${cur.ex1}"</span>
                            <span style="background:rgba(15,23,42,0.9); border:1px solid ${cur.color}; padding:0.35rem 0.75rem; border-radius:8px; font-weight:800;">"${cur.ex2}"</span>
                        </div>
                        <div style="font-size:0.92rem; color:#e2e8f0; line-height:1.5;">${cur.desc}</div>
                    </div>
                </div>

                <!-- SKEMA: BEVÆGELSESVERBER MED BÅDE HAR OG ER -->
                <div class="vhe-card" style="margin-bottom:0;">
                    <span style="font-size:0.75rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">Overblik • Samme verbum med HAR og ER</span>
                    <h2 style="margin:0.2rem 0 0.9rem; font-size:1.3rem; font-weight:900;">Hvornår siger man "har gået" og "er gået"?</h2>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:0.9rem;">
                        <div style="background:rgba(56,189,248,0.1); border:1.5px solid #38bdf8; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#38bdf8;">HAR = Fokus på selve aktiviteten</div>
                            <ul style="margin:0.5rem 0 0; padding-left:1.15rem; color:#f8fafc; line-height:1.65; font-size:0.92rem;">
                                <li>"Jeg <strong>har gået</strong> 10.000 skridt i dag."</li>
                                <li>"Vi <strong>har kørt</strong> rundt i to timer."</li>
                                <li>"Malerne <strong>har malet</strong> hele dagen."</li>
                                <li>"Bageren <strong>har bagt</strong> boller."</li>
                            </ul>
                        </div>
                        <div style="background:rgba(251,191,36,0.1); border:1.5px solid #fbbf24; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#fbbf24;">ER = Ny tilstand eller nyt sted</div>
                            <ul style="margin:0.5rem 0 0; padding-left:1.15rem; color:#f8fafc; line-height:1.65; font-size:0.92rem;">
                                <li>"Jeg <strong>er gået</strong> hjem fra arbejde."</li>
                                <li>"Bussen <strong>er kørt</strong> (den er væk!)."</li>
                                <li>"Huset <strong>er malet</strong> (nu er det færdigt)."</li>
                                <li>"Bollerne <strong>er bagt</strong> (de er klar nu)."</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;

            const vToggle = wrap.querySelector('#vhe-toggle-vmode');
            if (vToggle) {
                vToggle.onclick = () => {
                    diagramVisualMode = diagramVisualMode === 'lines' ? 'scenes' : 'lines';
                    draw();
                };
            }
            wrap.querySelectorAll('[data-step-click]').forEach(el => {
                el.onclick = () => {
                    selStep = Number(el.dataset.stepClick);
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 2: TRÆNINGSBANE 1 – MOTOREN (HAR) ELLER DØREN (ER)?
    // =========================================================================
    function renderTabTraening(parent) {
        const TASKS = [
            {
                sent: '1. Malerne arbejder stadig: De ___ på huset siden kl. 7 i morges.',
                opts: ['har malet (Fokus på arbejdet)', 'er malet (Ny tilstand)'],
                correct: 0,
                step: 0,
                why: 'Det handler om malernes arbejde = HAR malet.'
            },
            {
                sent: '2. Se hvor flot huset er nu! Hele huset ___ endelig.',
                opts: ['har malet', 'er malet (Færdig / ny tilstand)'],
                correct: 1,
                step: 1,
                why: 'Huset er færdigt nu (ny tilstand) = ER malet.'
            },
            {
                sent: '3. Mine ben er trætte, fordi jeg ___ i skoven i tre timer.',
                opts: ['har gået (Aktivitet / hvor længe)', 'er gået (Nyt sted)'],
                correct: 0,
                step: 0,
                why: '"I tre timer" handler om selve gåturen = HAR gået.'
            },
            {
                sent: '4. Chefen er ikke på sit kontor mere. Han ___ hjem.',
                opts: ['har gået', 'er gået (Flyttet til et nyt sted)'],
                correct: 1,
                step: 1,
                why: 'Han har skiftet sted (fra kontoret og hjem) = ER gået.'
            },
            {
                sent: '5. Vi ___ i bil i mange timer på vores ferie.',
                opts: ['har kørt (Selve kørslen)', 'er kørt'],
                correct: 0,
                step: 0,
                why: 'Det handler om selve kørslen i mange timer = HAR kørt.'
            },
            {
                sent: '6. Øv, vi kom 2 minutter for sent! Bussen ___.',
                opts: ['har kørt', 'er kørt (Bussen er væk nu)'],
                correct: 1,
                step: 1,
                why: 'Bussen er kørt væk fra stoppestedet = ER kørt.'
            }
        ];

        let activeStep = 0;
        const ans = {};
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vhe-card">
                    <div style="font-size:0.75rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-bottom:0.4rem;">
                        Live-Diagram • Se om opgaven aktiverer MOTOREN (har) eller DØREN (er):
                    </div>
                    ${renderStatic3StepsSvg(activeStep)}
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:1rem;">
                    ${TASKS.map((t, i) => {
                        const a = ans[i];
                        return `
                            <div class="vhe-card" style="margin-bottom:0;">
                                <div style="font-size:1.08rem; font-weight:900; color:#ffffff; margin-bottom:0.75rem;">${t.sent}</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.55rem;">
                                    ${t.opts.map((o, oIdx) => {
                                        let cls = 'vhe-opt-btn';
                                        if (a !== undefined) {
                                            if (oIdx === t.correct) cls += ' correct';
                                            else if (a === oIdx) cls += ' wrong';
                                        }
                                        return `<button class="${cls}" data-ti="${i}" data-to="${oIdx}">${o}</button>`;
                                    }).join('')}
                                </div>
                                ${a !== undefined ? `<div style="margin-top:0.65rem; font-size:0.85rem; color:#cbd5e1;">${t.why}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-ti]').forEach(b => {
                b.onclick = () => {
                    const idx = Number(b.dataset.ti);
                    ans[idx] = Number(b.dataset.to);
                    activeStep = TASKS[idx].step;
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 3: DE 3 STADIER (OMFORMEREN)
    // =========================================================================
    function renderTabStadier(parent) {
        const CHAINS = [
            {
                theme: '1. Malerne & Huset',
                s0: 'Malerne har malet huset.',
                s1: 'Huset er malet.',
                s2: 'Et malet hus (Det malede hus).'
            },
            {
                theme: '2. Bageren & Brødet',
                s0: 'Bageren har bagt brødet.',
                s1: 'Brødet er bagt.',
                s2: 'Et nybagt brød (Det nybagte brød).'
            },
            {
                theme: '3. Viceværten & Døren',
                s0: 'Viceværten har låst døren.',
                s1: 'Døren er låst.',
                s2: 'En låst dør (Den låste dør).'
            },
            {
                theme: '4. Mekanikeren & Bilen',
                s0: 'Mekanikeren har repareret bilen.',
                s1: 'Bilen er repareret.',
                s2: 'En repareret bil (Den reparerede bil).'
            }
        ];

        let activeStep = 0;
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vhe-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                        <span style="font-size:0.76rem; font-weight:900; color:#fde68a; text-transform:uppercase;">Klik mellem Trin 1, 2 og 3 for at se forskellen:</span>
                        <div style="display:flex; gap:0.45rem;">
                            <button class="vhe-back-btn" data-st="0" style="border-color:${activeStep === 0 ? '#38bdf8' : '#475569'};">1. Har (Aktivitet)</button>
                            <button class="vhe-back-btn" data-st="1" style="border-color:${activeStep === 1 ? '#fbbf24' : '#475569'};">2. Er (Ny tilstand)</button>
                            <button class="vhe-back-btn" data-st="2" style="border-color:${activeStep === 2 ? '#4ade80' : '#475569'};">3. Beskrivende ord</button>
                        </div>
                    </div>
                    ${renderStatic3StepsSvg(activeStep)}
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:1rem;">
                    ${CHAINS.map(c => `
                        <div class="vhe-card" style="margin-bottom:0;">
                            <div style="font-weight:900; color:#fde68a; margin-bottom:0.65rem;">${c.theme}</div>
                            <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                <div style="padding:0.65rem 0.9rem; border-radius:10px; background:${activeStep === 0 ? 'rgba(56,189,248,0.18)' : 'rgba(15,23,42,0.6)'}; border:1.5px solid ${activeStep === 0 ? '#38bdf8' : 'rgba(148,163,184,0.2)'};">
                                    <span style="font-size:0.7rem; font-weight:900; color:#38bdf8;">1. HAR (AKTIVITET):</span>
                                    <div style="font-size:1rem; font-weight:800; color:#ffffff;">"${c.s0}"</div>
                                </div>
                                <div style="padding:0.65rem 0.9rem; border-radius:10px; background:${activeStep === 1 ? 'rgba(251,191,36,0.18)' : 'rgba(15,23,42,0.6)'}; border:1.5px solid ${activeStep === 1 ? '#fbbf24' : 'rgba(148,163,184,0.2)'};">
                                    <span style="font-size:0.7rem; font-weight:900; color:#fbbf24;">2. ER (NY TILSTAND):</span>
                                    <div style="font-size:1rem; font-weight:800; color:#ffffff;">"${c.s1}"</div>
                                </div>
                                <div style="padding:0.65rem 0.9rem; border-radius:10px; background:${activeStep === 2 ? 'rgba(74,222,128,0.18)' : 'rgba(15,23,42,0.6)'}; border:1.5px solid ${activeStep === 2 ? '#4ade80' : 'rgba(148,163,184,0.2)'};">
                                    <span style="font-size:0.7rem; font-weight:900; color:#4ade80;">3. BESKRIVENDE ORD:</span>
                                    <div style="font-size:1rem; font-weight:800; color:#ffffff;">"${c.s2}"</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-st], [data-step-click]').forEach(el => {
                el.onclick = () => {
                    activeStep = Number(el.dataset.st ?? el.dataset.stepClick);
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 4: SÆTNINGSBYGGEREN
    // =========================================================================
    function renderTabBuilder(parent) {
        const PUZZLES = [
            {
                hint: '1. Byg sætningen med HAR (hvad malerne har lavet):',
                correct: ['Malerne', 'har', 'malet', 'huset']
            },
            {
                hint: '2. Byg sætningen med ER (huset er færdigt nu):',
                correct: ['Huset', 'er', 'malet', 'nu']
            },
            {
                hint: '3. Sæt ordet ind FORAN "hus":',
                correct: ['Et', 'malet', 'hus']
            },
            {
                hint: '4. Byg sætningen om at tage hjem (nyt sted = er):',
                correct: ['Jeg', 'er', 'kørt', 'hjem']
            }
        ];

        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        PUZZLES.forEach(p => {
            const card = document.createElement('div');
            card.className = 'vhe-card';
            const pool = [...p.correct].sort(() => Math.random() - 0.5);
            let placed = [];

            function drawCard() {
                const isDone = placed.length === p.correct.length && placed.every((w, i) => w === p.correct[i]);
                card.innerHTML = `
                    <div style="font-weight:900; color:#fde68a; margin-bottom:0.6rem;">${p.hint}</div>
                    <div style="min-height:48px; background:rgba(15,23,42,0.85); border:1.5px dashed ${isDone ? '#4ade80' : '#64748b'}; border-radius:12px; padding:0.65rem; display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
                        ${placed.map((w, idx) => `<button class="vhe-opt-btn" data-rm="${idx}" style="padding:0.4rem 0.8rem;">${w}</button>`).join('')}
                    </div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        ${pool.map((w, idx) => {
                            const used = placed.includes(w);
                            return `<button class="vhe-opt-btn" data-add="${idx}" ${used ? 'disabled style="opacity:0.3;"' : 'style="padding:0.45rem 0.85rem;"'}>${w}</button>`;
                        }).join('')}
                    </div>
                    ${isDone ? `<div style="margin-top:0.65rem; color:#4ade80; font-weight:900;">✓ Perfekt: "${p.correct.join(' ')}"</div>` : ''}
                `;
                card.querySelectorAll('[data-add]').forEach(b => {
                    b.onclick = () => { placed.push(pool[Number(b.dataset.add)]); drawCard(); };
                });
                card.querySelectorAll('[data-rm]').forEach(b => {
                    b.onclick = () => { placed.splice(Number(b.dataset.rm), 1); drawCard(); };
                });
            }
            drawCard();
            wrap.appendChild(card);
        });
    }

    switchTab(currentTab);
    container.appendChild(viewContainer);
}
