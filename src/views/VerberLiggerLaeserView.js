import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * VerberLiggerLaeserView - Flade 4: Krops-Rammen ("Jeg ligger og læser" vs. "Jeg læser en bog")
 * Indeholder:
 *  - Statisk 2-linjers diagram øverst (Live Krops-Ramme vs. Faktuel Helhed)
 *  - Fane 1: Aha-værkstedet (De 4 positionsverber: ligger, sidder, står, går + og + verbum)
 *  - Fane 2: Træningsbane 1 – Live-Zoom i nuet vs. Faktuel Helhed
 *  - Fane 3: Træningsbane 2 – Vælg den rigtige kropsposition (ligger / sidder / står / går)
 *  - Fane 4: Træningsbane 3 – Sætningsbyggeren
 */
export function renderVerberLiggerLaeserView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container verber-liggerlaeser-view';

    const style = document.createElement('style');
    style.textContent = `
        .verber-liggerlaeser-view {
            max-width: 1120px;
            margin: 0 auto;
            padding: 1rem 1.15rem 4.5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }
        .vll-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.1rem;
        }
        .vll-back-btn {
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
        .vll-back-btn:hover {
            border-color: #f87171;
        }
        .vll-hero {
            text-align: center;
            margin-bottom: 1.4rem;
        }
        .vll-hero h1 {
            font-size: 2.05rem;
            font-weight: 900;
            color: #ffffff !important;
            margin: 0.3rem 0 0.45rem;
        }
        .vll-hero p {
            color: #fecaca;
            font-size: 0.98rem;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.5;
        }
        .vll-tabs-nav {
            display: flex;
            gap: 0.55rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        .vll-tab-btn {
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
        .vll-tab-btn.active {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border-color: #fde68a;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(239, 68, 68, 0.35);
        }
        .vll-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(248, 113, 113, 0.3);
            border-radius: 20px;
            padding: 1.35rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }
        .vll-opt-btn {
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
        .vll-opt-btn:hover:not(:disabled) {
            border-color: #fde68a;
        }
        .vll-opt-btn.correct {
            background: rgba(22, 163, 74, 0.28);
            border-color: #4ade80;
            color: #ffffff;
        }
        .vll-opt-btn.wrong {
            background: rgba(220, 38, 38, 0.28);
            border-color: #f87171;
            color: #fecaca;
        }
    `;
    viewContainer.appendChild(style);

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'vll-top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'vll-back-btn';
    backBtn.innerHTML = `← Tilbage til Verber-oversigten`;
    backBtn.onclick = () => navigateFn('verber_grammatik');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'vll-hero';
    hero.innerHTML = `
        <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.28rem 0.85rem; border-radius:999px; background:rgba(74,222,128,0.16); border:1px solid rgba(74,222,128,0.45); color:#86efac; font-size:0.76rem; font-weight:900; text-transform:uppercase;">
            Trin 4 • I gang lige nu vs. Kort info
        </div>
        <h1>"Jeg ligger og læser" vs. "Jeg læser en bog"</h1>
        <p>
            På dansk bruger vi <strong>ligger / sidder / står / går + og + verbum</strong>, når vi vil vise, hvad vi er i gang med lige nu.
        </p>
    `;
    viewContainer.appendChild(hero);

    function renderAspectStaticSvg(isLive) {
        return `
            <svg viewBox="0 0 680 142" style="width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);">
                <defs>
                    <filter id="llGlow" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>

                <!-- ØVERSTE LINJE: I GANG LIGE NU -->
                <g opacity="${isLive ? '1' : '0.25'}" style="cursor:pointer;" data-asp-click="1">
                    <rect x="35" y="16" width="610" height="48" rx="24" fill="rgba(74,222,128,0.12)" stroke="#4ade80" stroke-width="${isLive ? '3' : '1.5'}" stroke-dasharray="9 5" ${isLive ? 'filter="url(#llGlow)"' : ''}/>
                    <line x1="75" y1="40" x2="605" y2="40" stroke="#4ade80" stroke-width="${isLive ? '6' : '3'}" stroke-linecap="round"/>
                    <rect x="155" y="26" width="370" height="26" rx="8" fill="#0f172a" stroke="#4ade80" stroke-width="1.5"/>
                    <text x="340" y="43" fill="#4ade80" font-size="10.5" font-weight="900" text-anchor="middle">1. I GANG LIGE NU: "Jeg ligger og læser" (Krop + handling)</text>
                </g>

                <!-- NEDERSTE LINJE: KORT INFO / VANE -->
                <g opacity="${!isLive ? '1' : '0.25'}" style="cursor:pointer;" data-asp-click="0">
                    <line x1="120" y1="102" x2="560" y2="102" stroke="#38bdf8" stroke-width="${!isLive ? '6' : '3'}" stroke-linecap="round" ${!isLive ? 'filter="url(#llGlow)"' : ''}/>
                    <circle cx="120" cy="102" r="8" fill="#38bdf8"/>
                    <circle cx="560" cy="102" r="8" fill="#38bdf8"/>
                    <rect x="180" y="88" width="320" height="26" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                    <text x="340" y="105" fill="#38bdf8" font-size="10.5" font-weight="900" text-anchor="middle">2. KORT INFO / VANE: "Jeg læser en bog" (Generel info)</text>
                </g>
            </svg>
        `;
    }

    let diagramVisualMode = 'lines';
    function renderAnimatedAspectSvg(isLive) {
        const svgStyle = `width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);`;
        if (isLive) {
            return `
                <svg viewBox="0 0 420 120" style="${svgStyle}">
                    <ellipse cx="210" cy="64" rx="135" ry="42" fill="rgba(74, 222, 128, 0.14)" stroke="#4ade80" stroke-width="2.5" stroke-dasharray="9 5">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.1s" repeatCount="infinite"/>
                    </ellipse>
                    <rect x="135" y="76" width="150" height="12" rx="5" fill="#334155"/>
                    <circle cx="162" cy="64" r="8" fill="#4ade80"/>
                    <line x1="172" y1="68" x2="235" y2="68" stroke="#4ade80" stroke-width="6" stroke-linecap="round"/>
                    <rect x="208" y="48" width="22" height="16" rx="3" fill="#fde68a"/>
                    <text x="210" y="28" fill="#4ade80" font-size="10" font-weight="900" text-anchor="middle">I GANG LIGE NU: LIGGER + OG + LÆSER</text>
                </svg>
            `;
        } else {
            return `
                <svg viewBox="0 0 420 120" style="${svgStyle}">
                    <g transform="translate(105, 42)">
                        <rect x="-45" y="0" width="90" height="44" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                        <text x="0" y="26" fill="#ffffff" font-size="10.5" font-weight="900" text-anchor="middle">Jeg læser</text>
                    </g>
                    <line x1="155" y1="64" x2="245" y2="64" stroke="#38bdf8" stroke-width="3"/>
                    <polygon points="245,59 255,64 245,69" fill="#38bdf8"/>
                    <g transform="translate(305, 42)">
                        <rect x="-48" y="0" width="96" height="44" rx="8" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="2"/>
                        <text x="0" y="26" fill="#fde68a" font-size="10.5" font-weight="900" text-anchor="middle">en bog (Info)</text>
                    </g>
                    <text x="210" y="22" fill="#7dd3fc" font-size="9.5" font-weight="900" text-anchor="middle">KORT INFO / VANE</text>
                </svg>
            `;
        }
    }

    const tabs = [
        { id: 'aha', label: '1. Overblik: Ligger og læser' },
        { id: 'zoom', label: '2. Øvelse 1: Lige nu eller generelt?' },
        { id: 'position', label: '3. Øvelse 2: Ligger, sidder, står eller går?' },
        { id: 'builder', label: '4. Øvelse 3: Byg sætninger' }
    ];

    let currentTab = (extraData && extraData.subPath && tabs.some(t => t.id === extraData.subPath))
        ? extraData.subPath
        : 'aha';

    const nav = document.createElement('div');
    nav.className = 'vll-tabs-nav';
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/verber_ligger_og_laeser/${tabId}`);
        nav.innerHTML = '';
        tabs.forEach(t => {
            const b = document.createElement('button');
            b.className = `vll-tab-btn ${currentTab === t.id ? 'active' : ''}`;
            b.textContent = t.label;
            b.onclick = () => switchTab(t.id);
            nav.appendChild(b);
        });

        tabContent.innerHTML = '';
        if (tabId === 'aha') renderTabAha(tabContent);
        else if (tabId === 'zoom') renderTabZoom(tabContent);
        else if (tabId === 'position') renderTabPosition(tabContent);
        else if (tabId === 'builder') renderTabBuilder(tabContent);
    }

    // =========================================================================
    // FANE 1: OVERBLIK
    // =========================================================================
    function renderTabAha(parent) {
        let isLive = true;
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vll-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                        <span style="font-size:0.76rem; font-weight:900; color:#fde68a; text-transform:uppercase;">Klik på linjerne i diagrammet for at skifte mellem "i gang lige nu" og "kort info":</span>
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap; align-items:center;">
                            <button class="vll-back-btn" id="vll-toggle-vmode" style="border-color:#fde68a; color:#fde68a; background:rgba(30,41,59,0.95);">
                                ${diagramVisualMode === 'scenes' ? '📐 Vis linjer' : '🎬 Vis animation'}
                            </button>
                            <button class="vll-back-btn" data-asp-click="1" style="border-color:${isLive ? '#4ade80' : '#475569'};">1. I gang lige nu (ligger og læser)</button>
                            <button class="vll-back-btn" data-asp-click="0" style="border-color:${!isLive ? '#38bdf8' : '#475569'};">2. Kort info / vane (læser en bog)</button>
                        </div>
                    </div>
                    ${diagramVisualMode === 'scenes' ? renderAnimatedAspectSvg(isLive) : renderAspectStaticSvg(isLive)}
                </div>

                <div class="vll-card" style="margin-bottom:0;">
                    <span style="font-size:0.75rem; font-weight:900; color:#4ade80; text-transform:uppercase;">De 4 ord for kroppen + "og"</span>
                    <h2 style="margin:0.2rem 0 0.85rem; font-size:1.35rem; font-weight:900;">Sådan viser du, at noget er i gang lige nu</h2>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.85rem; margin-bottom:1rem;">
                        <div style="background:rgba(30,41,59,0.85); border:1px solid #4ade80; border-radius:12px; padding:0.9rem;">
                            <strong style="color:#4ade80;">1. LIGGER og ... (I sengen / på sofaen)</strong>
                            <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.3rem;">"Jeg <u>ligger og læser</u> på sofaen."<br>"Han <u>lå og sov</u>, da jeg ringede."</div>
                        </div>
                        <div style="background:rgba(30,41,59,0.85); border:1px solid #38bdf8; border-radius:12px; padding:0.9rem;">
                            <strong style="color:#38bdf8;">2. SIDDER og ... (På en stol / ved bordet)</strong>
                            <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.3rem;">"Vi <u>sidder og spiser</u> aftensmad."<br>"Hun <u>sad og arbejdede</u> ved bordet."</div>
                        </div>
                        <div style="background:rgba(30,41,59,0.85); border:1px solid #fbbf24; border-radius:12px; padding:0.9rem;">
                            <strong style="color:#fbbf24;">3. STÅR og ... (Oprejst på benene)</strong>
                            <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.3rem;">"De <u>står og venter</u> på bussen."<br>"Jeg <u>stod og lavede</u> mad i køkkenet."</div>
                        </div>
                        <div style="background:rgba(30,41,59,0.85); border:1px solid #c084fc; border-radius:12px; padding:0.9rem;">
                            <strong style="color:#c084fc;">4. GÅR og ... (I bevægelse / gennem længere tid)</strong>
                            <div style="font-size:0.88rem; color:#e2e8f0; margin-top:0.3rem;">"Jeg <u>går og tænker</u> på at skifte job."<br>"Han <u>gik og drømte</u> om ferien."</div>
                        </div>
                    </div>
                    <div style="background:rgba(251,191,36,0.12); border-left:4px solid #fbbf24; padding:0.85rem 1.1rem; border-radius:10px; font-size:0.9rem; color:#fde68a;">
                        <strong>Vigtig regel:</strong> Begge verber på hver side af <strong>"og"</strong> skal have <strong>samme tid</strong>! (Nutid: <em>ligger og læser</em> • Datid: <em>lå og læste</em> • Førnutid: <em>har ligget og læst</em>).
                    </div>
                </div>
            `;

            const vToggle = wrap.querySelector('#vll-toggle-vmode');
            if (vToggle) {
                vToggle.onclick = () => {
                    diagramVisualMode = diagramVisualMode === 'lines' ? 'scenes' : 'lines';
                    draw();
                };
            }
            wrap.querySelectorAll('[data-asp-click]').forEach(el => {
                el.onclick = () => {
                    isLive = el.dataset.aspClick === '1';
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 2: LIGE NU ELLER GENERELT?
    // =========================================================================
    function renderTabZoom(parent) {
        const ITEMS = [
            { sent: '1. Schh! Vær stille — babyen ___ inde i soveværelset lige nu.', opts: ['ligger og sover (I gang lige nu)', 'sover 10 timer (Generel info)'], correct: 0, live: true, why: '"Schh ... lige nu" handler om det, babyen er i gang med i sengen lige nu → ligger og sover.' },
            { sent: '2. Hvor meget sover en voksen normalt? En voksen ___ omkring 7–8 timer om natten.', opts: ['ligger og sover', 'sover (Generel info / vane)'], correct: 1, live: false, why: 'Her taler vi om en generel vane, ikke en situation lige nu → sover.' },
            { sent: '3. Kan jeg ringe tilbage om 10 minutter? Vi ___ aftensmad ved bordet lige nu.', opts: ['sidder og spiser (I gang lige nu)', 'spiser aftensmad kl. 18 (Vane)'], correct: 0, live: true, why: 'Vi er midt i maden ved bordet lige nu → sidder og spiser.' },
            { sent: '4. Hvilken bog læser du i denne måned? Jeg ___ en spændende krimi.', opts: ['ligger og læser', 'læser (Kort info)'], correct: 1, live: false, why: 'Når du bare giver kort info om, hvilken bog du læser i denne måned → Jeg læser en krimi.' }
        ];

        let activeLive = true;
        const ans = {};
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vll-card">${renderAspectStaticSvg(activeLive)}</div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:1rem;">
                    ${ITEMS.map((it, i) => {
                        const a = ans[i];
                        return `
                            <div class="vll-card" style="margin-bottom:0;">
                                <div style="font-size:1.08rem; font-weight:900; color:#ffffff; margin-bottom:0.75rem;">${it.sent}</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.55rem;">
                                    ${it.opts.map((o, oIdx) => {
                                        let cls = 'vll-opt-btn';
                                        if (a !== undefined) {
                                            if (oIdx === it.correct) cls += ' correct';
                                            else if (a === oIdx) cls += ' wrong';
                                        }
                                        return `<button class="${cls}" data-zi="${i}" data-zo="${oIdx}">${o}</button>`;
                                    }).join('')}
                                </div>
                                ${a !== undefined ? `<div style="margin-top:0.65rem; font-size:0.85rem; color:#cbd5e1;">${it.why}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-zi]').forEach(b => {
                b.onclick = () => {
                    const idx = Number(b.dataset.zi);
                    ans[idx] = Number(b.dataset.zo);
                    activeLive = ITEMS[idx].live;
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 3: LIGGER, SIDDER, STÅR ELLER GÅR?
    // =========================================================================
    function renderTabPosition(parent) {
        const ITEMS = [
            { sent: '1. Han ___ på sofaen med et tæppe over sig og ser fjernsyn.', opts: ['ligger og ser', 'står og ser'], correct: 0, why: 'På sofaen under et tæppe = ligger og ser.' },
            { sent: '2. Passagererne ___ ude i regnen ved stoppestedet og venter på bussen.', opts: ['står og venter', 'ligger og venter'], correct: 0, why: 'Ved et stoppested på benene = står og venter.' },
            { sent: '3. Kursisterne ___ ved deres borde og skriver en opgave.', opts: ['sidder og skriver', 'går og skriver'], correct: 0, why: 'På stole ved bordet = sidder og skriver.' },
            { sent: '4. I går ___ jeg i sengen og læste, da lyset pludselig gik ud.', opts: ['lå ... og læste (Begge verber i datid!)', 'lå ... og læse'], correct: 0, why: 'Begge verber skal være i datid: lå og læste!' }
        ];

        const ans = {};
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:1rem;">
                    ${ITEMS.map((it, i) => {
                        const a = ans[i];
                        return `
                            <div class="vll-card" style="margin-bottom:0;">
                                <div style="font-size:1.08rem; font-weight:900; color:#ffffff; margin-bottom:0.75rem;">${it.sent}</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.55rem;">
                                    ${it.opts.map((o, oIdx) => {
                                        let cls = 'vll-opt-btn';
                                        if (a !== undefined) {
                                            if (oIdx === it.correct) cls += ' correct';
                                            else if (a === oIdx) cls += ' wrong';
                                        }
                                        return `<button class="${cls}" data-pi="${i}" data-po="${oIdx}">${o}</button>`;
                                    }).join('')}
                                </div>
                                ${a !== undefined ? `<div style="margin-top:0.65rem; font-size:0.85rem; color:#cbd5e1;">${it.why}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-pi]').forEach(b => {
                b.onclick = () => {
                    ans[Number(b.dataset.pi)] = Number(b.dataset.po);
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 4: BYG SÆTNINGER
    // =========================================================================
    function renderTabBuilder(parent) {
        const PUZZLES = [
            { hint: '1. Byg en sætning om noget, der er i gang lige nu på sofaen:', correct: ['Jeg', 'ligger', 'og', 'læser'] },
            { hint: '2. Byg en sætning med kort info:', correct: ['Jeg', 'læser', 'en', 'bog'] },
            { hint: '3. Byg sætningen i datid (husk samme tid på begge verber!):', correct: ['Han', 'sad', 'og', 'arbejdede'] }
        ];

        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        PUZZLES.forEach(p => {
            const card = document.createElement('div');
            card.className = 'vll-card';
            const pool = [...p.correct].sort(() => Math.random() - 0.5);
            let placed = [];

            function drawCard() {
                const isDone = placed.length === p.correct.length && placed.every((w, i) => w === p.correct[i]);
                card.innerHTML = `
                    <div style="font-weight:900; color:#fde68a; margin-bottom:0.6rem;">${p.hint}</div>
                    <div style="min-height:48px; background:rgba(15,23,42,0.85); border:1.5px dashed ${isDone ? '#4ade80' : '#64748b'}; border-radius:12px; padding:0.65rem; display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
                        ${placed.map((w, idx) => `<button class="vll-opt-btn" data-rm="${idx}" style="padding:0.4rem 0.8rem;">${w}</button>`).join('')}
                    </div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        ${pool.map((w, idx) => {
                            const used = placed.includes(w);
                            return `<button class="vll-opt-btn" data-add="${idx}" ${used ? 'disabled style="opacity:0.3;"' : 'style="padding:0.45rem 0.85rem;"'}>${w}</button>`;
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
