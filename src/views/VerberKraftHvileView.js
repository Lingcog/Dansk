import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * VerberKraftHvileView - Flade 3: Kausativ vs. Inkausativ
 * (lægge/ligge, sætte/sidde, stille/stå, væltede vasen vs. vasen væltede)
 */
export function renderVerberKraftHvileView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container verber-krafthvile-view';

    const style = document.createElement('style');
    style.textContent = `
        .verber-krafthvile-view {
            max-width: 1120px;
            margin: 0 auto;
            padding: 1rem 1.15rem 4.5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }
        .vkh-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.1rem;
        }
        .vkh-back-btn {
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
        .vkh-back-btn:hover {
            border-color: #f87171;
        }
        .vkh-hero {
            text-align: center;
            margin-bottom: 1.4rem;
        }
        .vkh-hero h1 {
            font-size: 2.05rem;
            font-weight: 900;
            color: #ffffff !important;
            margin: 0.3rem 0 0.45rem;
        }
        .vkh-hero p {
            color: #fecaca;
            font-size: 0.98rem;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.5;
        }
        .vkh-tabs-nav {
            display: flex;
            gap: 0.55rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        .vkh-tab-btn {
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
        .vkh-tab-btn.active {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border-color: #fde68a;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(239, 68, 68, 0.35);
        }
        .vkh-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(248, 113, 113, 0.3);
            border-radius: 20px;
            padding: 1.35rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }
        .vkh-opt-btn {
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
        .vkh-opt-btn:hover:not(:disabled) {
            border-color: #fde68a;
        }
        .vkh-opt-btn.correct {
            background: rgba(22, 163, 74, 0.28);
            border-color: #4ade80;
            color: #ffffff;
        }
        .vkh-opt-btn.wrong {
            background: rgba(220, 38, 38, 0.28);
            border-color: #f87171;
            color: #fecaca;
        }
    `;
    viewContainer.appendChild(style);

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'vkh-top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'vkh-back-btn';
    backBtn.innerHTML = `← Tilbage til Verber-oversigten`;
    backBtn.onclick = () => navigateFn('verber_grammatik');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'vkh-hero';
    hero.innerHTML = `
        <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.28rem 0.85rem; border-radius:999px; background:rgba(248,113,113,0.16); border:1px solid rgba(248,113,113,0.45); color:#fca5a5; font-size:0.76rem; font-weight:900; text-transform:uppercase;">
            Del 3 • Bevægelse eller i ro?
        </div>
        <h1>Lægger / ligger • Sætter / sidder • Stiller / står</h1>
        <p>
            Lær forskellen på når <strong>man flytter noget</strong> (lægger, sætter, stiller), og når <strong>tingen er i ro</strong> (ligger, sidder, står).
        </p>
    `;
    viewContainer.appendChild(hero);

    function renderForceStaticSvg(isCausative) {
        return `
            <svg viewBox="0 0 680 148" style="width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);">
                <defs>
                    <filter id="khGlow" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                <line x1="35" y1="120" x2="645" y2="120" stroke="#475569" stroke-width="2.5"/>

                <!-- VENSTRE SIDE: BEVÆGELSE (MAN FLYTTER NOGET) -->
                <g opacity="${isCausative ? '1' : '0.25'}" style="cursor:pointer;" data-force-click="1">
                    <rect x="30" y="18" width="285" height="86" rx="12" fill="rgba(248,113,113,0.12)" stroke="#f87171" stroke-width="${isCausative ? '3' : '1.5'}" ${isCausative ? 'filter="url(#khGlow)"' : ''}/>
                    <text x="172" y="38" fill="#fca5a5" font-size="10.5" font-weight="900" text-anchor="middle">1. BEVÆGELSE (Man flytter en ting)</text>
                    <circle cx="68" cy="68" r="10" fill="#f87171"/>
                    <line x1="84" y1="68" x2="255" y2="68" stroke="#f87171" stroke-width="${isCausative ? '6' : '3'}" stroke-linecap="round"/>
                    <polygon points="255,60 272,68 255,76" fill="#f87171"/>
                    <text x="172" y="92" fill="#ffffff" font-size="9.5" font-weight="800" text-anchor="middle">lægger • sætter • stiller • væltede vasen</text>
                </g>

                <!-- HØJRE SIDE: I RO (TINGEN ER PÅ PLADS) -->
                <g opacity="${!isCausative ? '1' : '0.25'}" style="cursor:pointer;" data-force-click="0">
                    <rect x="365" y="18" width="285" height="86" rx="12" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="${!isCausative ? '3' : '1.5'}" ${!isCausative ? 'filter="url(#khGlow)"' : ''}/>
                    <text x="507" y="38" fill="#7dd3fc" font-size="10.5" font-weight="900" text-anchor="middle">2. I RO (Tingen er på plads)</text>
                    <line x1="415" y1="72" x2="600" y2="72" stroke="#38bdf8" stroke-width="${!isCausative ? '6' : '3'}" stroke-linecap="round"/>
                    <circle cx="507" cy="72" r="9" fill="#38bdf8"/>
                    <text x="507" y="92" fill="#ffffff" font-size="9.5" font-weight="800" text-anchor="middle">ligger • sidder • står • vasen væltede</text>
                </g>
            </svg>
        `;
    }

    let diagramVisualMode = 'lines';
    function renderAnimatedForceSvg(isCausative) {
        const svgStyle = `width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);`;
        if (isCausative) {
            return `
                <svg viewBox="0 0 420 120" style="${svgStyle}">
                    <rect x="190" y="88" width="180" height="8" rx="4" fill="#64748b"/>
                    <g transform="translate(75, 46)">
                        <circle cx="0" cy="8" r="10" fill="#f87171"/>
                        <path d="M -10 28 Q 0 18 10 28 L 10 52 L -10 52 Z" fill="#dc2626"/>
                        <text x="0" y="-6" fill="#fca5a5" font-size="9.5" font-weight="900" text-anchor="middle">PERSON / HÅND</text>
                    </g>
                    <path d="M 95 62 Q 175 42 248 66" fill="none" stroke="#f87171" stroke-width="4" stroke-dasharray="9 5">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.55s" repeatCount="infinite"/>
                    </path>
                    <polygon points="248,61 258,68 246,71" fill="#f87171"/>
                    <text x="175" y="42" fill="#fde68a" font-size="9.5" font-weight="900" text-anchor="middle">FLYTTER EN TING</text>
                    <g transform="translate(285, 58)">
                        <rect x="-34" y="0" width="68" height="28" rx="6" fill="#ef4444" stroke="#fde68a" stroke-width="2">
                            <animate attributeName="y" values="-6;2;-6" dur="1.1s" repeatCount="infinite"/>
                        </rect>
                        <text x="0" y="18" fill="#ffffff" font-size="9" font-weight="900" text-anchor="middle">lægger / sætter</text>
                    </g>
                </svg>
            `;
        } else {
            return `
                <svg viewBox="0 0 420 120" style="${svgStyle}">
                    <rect x="120" y="88" width="220" height="8" rx="4" fill="#64748b"/>
                    <g transform="translate(75, 56)" opacity="0.35">
                        <circle cx="0" cy="12" r="18" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>
                        <text x="0" y="15" fill="#94a3b8" font-size="8" font-weight="800" text-anchor="middle">Ingen hånd</text>
                    </g>
                    <g transform="translate(230, 60)">
                        <ellipse cx="0" cy="28" rx="46" ry="8" fill="none" stroke="#38bdf8" stroke-width="2">
                            <animate attributeName="rx" values="36;58;36" dur="2.2s" repeatCount="infinite"/>
                            <animate attributeName="opacity" values="0.85;0.15;0.85" dur="2.2s" repeatCount="infinite"/>
                        </ellipse>
                        <rect x="-34" y="0" width="68" height="28" rx="6" fill="#0284c7" stroke="#7dd3fc" stroke-width="2"/>
                        <text x="0" y="18" fill="#ffffff" font-size="9.5" font-weight="900" text-anchor="middle">ligger / står</text>
                        <text x="0" y="-10" fill="#38bdf8" font-size="9.5" font-weight="900" text-anchor="middle">TINGEN ER I RO</text>
                    </g>
                </svg>
            `;
        }
    }

    const tabs = [
        { id: 'aha', label: '1. Overblik: Flytter noget vs. I ro' },
        { id: 'nutid', label: '2. Øvelse 1: Nutid (lægger/ligger m.fl.)' },
        { id: 'datid', label: '3. Øvelse 2: Datid & Førnutid (lagde/lå m.fl.)' },
        { id: 'builder', label: '4. Øvelse 3: Byg sætninger' }
    ];

    let currentTab = (extraData && extraData.subPath && tabs.some(t => t.id === extraData.subPath))
        ? extraData.subPath
        : 'aha';

    const nav = document.createElement('div');
    nav.className = 'vkh-tabs-nav';
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/verber_kraft_hvile/${tabId}`);
        nav.innerHTML = '';
        tabs.forEach(t => {
            const b = document.createElement('button');
            b.className = `vkh-tab-btn ${currentTab === t.id ? 'active' : ''}`;
            b.textContent = t.label;
            b.onclick = () => switchTab(t.id);
            nav.appendChild(b);
        });

        tabContent.innerHTML = '';
        if (tabId === 'aha') renderTabAha(tabContent);
        else if (tabId === 'nutid') renderTabNutid(tabContent);
        else if (tabId === 'datid') renderTabDatid(tabContent);
        else if (tabId === 'builder') renderTabBuilder(tabContent);
    }

    // =========================================================================
    // FANE 1: AHA-VÆRKSTEDET
    // =========================================================================
    function renderTabAha(parent) {
        let isCaus = true;
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vkh-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                        <span style="font-size:0.76rem; font-weight:900; color:#fde68a; text-transform:uppercase;">Klik på Bevægelse eller I ro i diagrammet:</span>
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap; align-items:center;">
                            <button class="vkh-back-btn" id="vkh-toggle-vmode" style="border-color:#fde68a; color:#fde68a; background:rgba(30,41,59,0.95);">
                                ${diagramVisualMode === 'scenes' ? '📐 Vis linjer' : '🎬 Vis animation'}
                            </button>
                            <button class="vkh-back-btn" data-force-click="1" style="border-color:${isCaus ? '#f87171' : '#475569'};">1. Bevægelse (Man flytter en ting)</button>
                            <button class="vkh-back-btn" data-force-click="0" style="border-color:${!isCaus ? '#38bdf8' : '#475569'};">2. I ro (Tingen er på plads)</button>
                        </div>
                    </div>
                    ${diagramVisualMode === 'scenes' ? renderAnimatedForceSvg(isCaus) : renderForceStaticSvg(isCaus)}
                </div>

                <!-- DET STORE PAR-SKEMA -->
                <div class="vkh-card">
                    <span style="font-size:0.75rem; font-weight:900; color:#f87171; text-transform:uppercase;">De 3 vigtige par</span>
                    <h2 style="margin:0.2rem 0 0.85rem; font-size:1.3rem; font-weight:900;">Man flytter noget (lægger/sætter/stiller) vs. Tingen er i ro (ligger/sidder/står)</h2>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:0.9rem;">
                        <div style="background:rgba(248,113,113,0.1); border:1.5px solid #f87171; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#fca5a5;">BEVÆGELSE (Man flytter NOGET)</div>
                            <div style="margin-top:0.55rem; display:flex; flex-direction:column; gap:0.55rem; font-size:0.9rem;">
                                <div><strong style="color:#ffffff;">1. Vandret: at lægge</strong> (lægger – <u>lagde</u> – <u>har lagt</u>)<br><em>"Jeg lægger bogen på bordet."</em></div>
                                <div><strong style="color:#ffffff;">2. På plads: at sætte</strong> (sætter – <u>satte</u> – <u>har sat</u>)<br><em>"Han sætter koppen på bakken."</em></div>
                                <div><strong style="color:#ffffff;">3. Oprejst: at stille</strong> (stiller – <u>stillede</u> – <u>har stillet</u>)<br><em>"Hun stiller cyklen op ad muren."</em></div>
                            </div>
                        </div>
                        <div style="background:rgba(56,189,248,0.1); border:1.5px solid #38bdf8; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#7dd3fc;">I RO (Tingen er allerede på plads)</div>
                            <div style="margin-top:0.55rem; display:flex; flex-direction:column; gap:0.55rem; font-size:0.9rem;">
                                <div><strong style="color:#ffffff;">1. Vandret: at ligge</strong> (ligger – <u>lå</u> – <u>har ligget</u>)<br><em>"Bogen ligger på bordet."</em></div>
                                <div><strong style="color:#ffffff;">2. På plads: at sidde</strong> (sidder – <u>sad</u> – <u>har siddet</u>)<br><em>"Han sidder i sofaen / Nøglen sidder i døren."</em></div>
                                <div><strong style="color:#ffffff;">3. Oprejst: at stå</strong> (står – <u>stod</u> – <u>har stået</u>)<br><em>"Cyklen står op ad muren."</em></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- VÆLTEDE VASEN VS. VASEN VÆLTEDE -->
                <div class="vkh-card" style="margin-bottom:0;">
                    <span style="font-size:0.75rem; font-weight:900; color:#fbbf24; text-transform:uppercase;">Samme ord — to betydninger (Vælte og Knække)</span>
                    <h2 style="margin:0.2rem 0 0.85rem; font-size:1.3rem; font-weight:900;">"Katten væltede vasen (har væltet)" vs. "Vasen væltede (er væltet)"</h2>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:0.9rem;">
                        <div style="background:rgba(30,41,59,0.85); border-left:4px solid #f87171; border-radius:12px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#f87171;">NÅR NOGEN VÆLTER EN TING (Brug HAR)</div>
                            <div style="font-size:1.05rem; font-weight:800; color:#ffffff; margin:0.35rem 0;">"Katten væltede vasen." → "Katten <u>har</u> væltet vasen."</div>
                            <div style="font-size:0.86rem; color:#cbd5e1;">"Drengen knækkede grenen." → "Drengen <u>har</u> knækket grenen."</div>
                        </div>
                        <div style="background:rgba(30,41,59,0.85); border-left:4px solid #fbbf24; border-radius:12px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#fbbf24;">NÅR TINGEN SELV VÆLTER (Brug ER)</div>
                            <div style="font-size:1.05rem; font-weight:800; color:#ffffff; margin:0.35rem 0;">"Vasen væltede." → "Vasen <u>er</u> væltet."</div>
                            <div style="font-size:0.86rem; color:#cbd5e1;">"Grenen knækkede." → "Grenen <u>er</u> knækket."</div>
                        </div>
                    </div>
                </div>
            `;

            const vToggle = wrap.querySelector('#vkh-toggle-vmode');
            if (vToggle) {
                vToggle.onclick = () => {
                    diagramVisualMode = diagramVisualMode === 'lines' ? 'scenes' : 'lines';
                    draw();
                };
            }
            wrap.querySelectorAll('[data-force-click]').forEach(el => {
                el.onclick = () => {
                    isCaus = el.dataset.forceClick === '1';
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 2: TRÆNINGSBANE 1 – OBJEKT-TESTEN (NUTID)
    // =========================================================================
    function renderTabNutid(parent) {
        const ITEMS = [
            { sent: '1. Jeg ___ altid mine nøgler på bordet.', opts: ['lægger (Man flytter noget)', 'ligger (I ro)'], correct: 0, caus: true, why: 'Du flytter nøglerne → lægger.' },
            { sent: '2. Mine nøgler ___ på bordet.', opts: ['lægger', 'ligger (I ro på plads)'], correct: 1, caus: false, why: 'Nøglerne er i ro på bordet → ligger.' },
            { sent: '3. Tjeneren ___ to glas vand på bordet.', opts: ['sætter / stiller (Flytter noget)', 'sidder / står'], correct: 0, caus: true, why: 'Tjeneren flytter de to glas vand → sætter/stiller.' },
            { sent: '4. Der ___ to glas vand på bordet.', opts: ['stiller', 'står (I ro)'], correct: 1, caus: false, why: 'Glassene er i ro på bordet → står.' },
            { sent: '5. Hvor ___ du din cykel, når du er i skole?', opts: ['stiller / sætter (Flytter noget)', 'står / sidder'], correct: 0, caus: true, why: 'Du sætter/stiller din cykel et sted.' },
            { sent: '6. Børnene ___ stille på stolene og lytter.', opts: ['sætter', 'sidder (I ro)'], correct: 1, caus: false, why: 'Børnene er i ro på stolene → sidder.' }
        ];

        let activeCaus = true;
        const ans = {};
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vkh-card">
                    ${renderForceStaticSvg(activeCaus)}
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:1rem;">
                    ${ITEMS.map((it, i) => {
                        const a = ans[i];
                        return `
                            <div class="vkh-card" style="margin-bottom:0;">
                                <div style="font-size:1.08rem; font-weight:900; color:#ffffff; margin-bottom:0.75rem;">${it.sent}</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.55rem;">
                                    ${it.opts.map((o, oIdx) => {
                                        let cls = 'vkh-opt-btn';
                                        if (a !== undefined) {
                                            if (oIdx === it.correct) cls += ' correct';
                                            else if (a === oIdx) cls += ' wrong';
                                        }
                                        return `<button class="${cls}" data-ni="${i}" data-no="${oIdx}">${o}</button>`;
                                    }).join('')}
                                </div>
                                ${a !== undefined ? `<div style="margin-top:0.65rem; font-size:0.85rem; color:#cbd5e1;">${it.why}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-ni]').forEach(b => {
                b.onclick = () => {
                    const idx = Number(b.dataset.ni);
                    ans[idx] = Number(b.dataset.no);
                    activeCaus = ITEMS[idx].caus;
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 3: DATIDS- & FØRNUTIDS-DUELLEN (LAGDE/LÅ, SATTE/SAD, STILLEDE/STOD, VÆLTET)
    // =========================================================================
    function renderTabDatid(parent) {
        const ITEMS = [
            { sent: '1. I går ___ jeg mig tidligt i seng.', opts: ['lagde (af at lægge + "mig")', 'lå (af at ligge)'], correct: 0, why: 'Når der står "mig" efter verbet, bruges lægge → lagde mig.' },
            { sent: '2. Jeg ___ i sengen og læste indtil kl. 23.', opts: ['lagde', 'lå (af at ligge – i ro)'], correct: 1, why: 'Du er i ro i sengen → lå.' },
            { sent: '3. Hvor har du ___ bilnøglerne?', opts: ['lagt (af at lægge)', 'ligget (af at ligge)'], correct: 0, why: 'Du har flyttet bilnøglerne → har lagt.' },
            { sent: '4. Hundens legetøj har ___ ude i haven hele natten.', opts: ['lagt', 'ligget (af at ligge – i ro)'], correct: 1, why: 'Legetøjet har været i ro i haven → har ligget.' },
            { sent: '5. Pas på gulvet! Vasen ___ på bordet, og vandet løb ud.', opts: ['har væltet', 'er væltet (Vasen væltede selv)'], correct: 1, why: 'Når vasen selv vælter (ny tilstand) → Vasen ER væltet.' },
            { sent: '6. Hunden løb ind i stuen og ___ blomstervasen!', opts: ['har væltet (Hunden væltede vasen)', 'er væltet'], correct: 0, why: 'Når hunden vælter en ting → Hunden HAR væltet vasen.' }
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
                            <div class="vkh-card" style="margin-bottom:0;">
                                <div style="font-size:1.08rem; font-weight:900; color:#ffffff; margin-bottom:0.75rem;">${it.sent}</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.55rem;">
                                    ${it.opts.map((o, oIdx) => {
                                        let cls = 'vkh-opt-btn';
                                        if (a !== undefined) {
                                            if (oIdx === it.correct) cls += ' correct';
                                            else if (a === oIdx) cls += ' wrong';
                                        }
                                        return `<button class="${cls}" data-di="${i}" data-do="${oIdx}">${o}</button>`;
                                    }).join('')}
                                </div>
                                ${a !== undefined ? `<div style="margin-top:0.65rem; font-size:0.85rem; color:#cbd5e1;">${it.why}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-di]').forEach(b => {
                b.onclick = () => {
                    ans[Number(b.dataset.di)] = Number(b.dataset.do);
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
            { hint: '1. Man lægger en ting på bordet:', correct: ['Jeg', 'lægger', 'bogen', 'på', 'bordet'] },
            { hint: '2. Bogen er i ro på bordet:', correct: ['Bogen', 'ligger', 'på', 'bordet'] },
            { hint: '3. Katten vælter vasen (brug har):', correct: ['Katten', 'har', 'væltet', 'vasen'] },
            { hint: '4. Vasen er væltet (brug er):', correct: ['Vasen', 'er', 'væltet', 'på', 'gulvet'] }
        ];

        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        PUZZLES.forEach(p => {
            const card = document.createElement('div');
            card.className = 'vkh-card';
            const pool = [...p.correct].sort(() => Math.random() - 0.5);
            let placed = [];

            function drawCard() {
                const isDone = placed.length === p.correct.length && placed.every((w, i) => w === p.correct[i]);
                card.innerHTML = `
                    <div style="font-weight:900; color:#fde68a; margin-bottom:0.6rem;">${p.hint}</div>
                    <div style="min-height:48px; background:rgba(15,23,42,0.85); border:1.5px dashed ${isDone ? '#4ade80' : '#64748b'}; border-radius:12px; padding:0.65rem; display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
                        ${placed.map((w, idx) => `<button class="vkh-opt-btn" data-rm="${idx}" style="padding:0.4rem 0.8rem;">${w}</button>`).join('')}
                    </div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        ${pool.map((w, idx) => {
                            const used = placed.includes(w);
                            return `<button class="vkh-opt-btn" data-add="${idx}" ${used ? 'disabled style="opacity:0.3;"' : 'style="padding:0.45rem 0.85rem;"'}>${w}</button>`;
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
