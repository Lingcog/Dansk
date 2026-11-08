import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveKonjNuance, applyKonjNuance } from '../components/DesignSystemToggle.js';

/**
 * KonjunktionerSaaDuelView - Ordstillings-Duel 4:
 * "SÅ" i betydning KONSEKVENS (Konjunktion -> Lige ordstilling: så + Subjekt + Verbum)
 * vs.
 * "SÅ" i betydning SENERE I EN RÆKKEFØLGE (Tidsadverbium -> Inversion: (og) så + Verbum + Subjekt)
 */
export function renderKonjunktionerSaaDuelView(container, navigateFn, extraData = {}) {
    applyKonjNuance(getActiveKonjNuance());
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container saa-duel-view';

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← Tilbage til Konjunktioner-fladen`;
    backBtn.onclick = () => navigateFn(extraData.from || 'top_konjunktioner');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const style = document.createElement('style');
    style.textContent = `
        :root {
            --konj-bg: #4A040B;
            --konj-bg-glow: #6B0F1A;
            --konj-surface: #160C28;
            --konj-surface-hover: #22123D;
            --konj-surface-input: #0D061A;
            --konj-border: #3B1E6D;
            --konj-border-focus: #A78BFA;
            --konj-primary: #8B5CF6;
            --konj-primary-hover: #7C3AED;
            --konj-glow: rgba(139, 92, 246, 0.55);
            --konj-text: #FFFFFF;
            --konj-text-muted: #DDD6FE;
            --konj-text-subtle: #A78BFA;
        }

        body[data-konj-nuance] {
            background-color: var(--konj-bg, #4A040B) !important;
            background-image: radial-gradient(circle at top right, var(--konj-bg-glow, #6B0F1A), var(--konj-bg, #4A040B)) !important;
        }

        .saa-duel-view {
            max-width: 1180px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: var(--konj-text);
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .saa-duel-view .ds-icon-emoji { display: none !important; }
        .saa-duel-view .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }

        .saa-duel-view .back-btn {
            background: var(--konj-surface-input);
            border: 1.5px solid var(--konj-border);
            color: #FFFFFF;
            padding: 0.55rem 1.1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .saa-duel-view .back-btn:hover {
            background: var(--konj-surface-hover);
            border-color: var(--konj-primary);
            box-shadow: 0 0 12px var(--konj-glow);
        }

        .saa-hero {
            text-align: center;
            margin: 1rem 0 1.6rem;
        }
        .saa-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: var(--konj-surface-input);
            border: 1px solid var(--konj-border);
            color: var(--konj-border-focus);
            padding: 0.35rem 0.9rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.7rem;
        }
        .saa-hero h1 {
            font-size: 2.3rem;
            font-weight: 900;
            color: #FFFFFF !important;
            margin: 0 0 0.6rem;
            letter-spacing: -0.02em;
        }
        .saa-hero p {
            color: var(--konj-text-muted);
            font-size: 1.08rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .saa-tabs-nav {
            display: flex;
            gap: 0.65rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .saa-tab-btn {
            background: var(--konj-surface);
            color: var(--konj-text-muted);
            border: 1.5px solid var(--konj-border);
            padding: 0.75rem 1.25rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.93rem;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
        }
        .saa-tab-btn:hover {
            background: var(--konj-surface-hover);
            color: #FFFFFF;
            border-color: var(--konj-border-focus);
        }
        .saa-tab-btn.active {
            background: var(--konj-primary);
            color: #FFFFFF;
            border-color: var(--konj-border-focus);
            box-shadow: 0 4px 16px var(--konj-glow);
        }

        /* Dual Cognitive Cards */
        .saa-dual-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 1.6rem;
            margin-bottom: 2rem;
        }
        .saa-role-card {
            background: var(--konj-surface);
            border: 2px solid var(--konj-border);
            border-radius: 20px;
            padding: 1.75rem;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .saa-role-card.konsekvens {
            border-top: 5px solid #F59E0B;
        }
        .saa-role-card.raekkefoelge {
            border-top: 5px solid #38BDF8;
        }
        .saa-role-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .saa-role-tag {
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.3rem 0.75rem;
            border-radius: 999px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .saa-role-tag.konsekvens {
            background: rgba(245, 158, 11, 0.16);
            border: 1px solid rgba(245, 158, 11, 0.5);
            color: #FDE68A;
        }
        .saa-role-tag.raekkefoelge {
            background: rgba(56, 189, 248, 0.16);
            border: 1px solid rgba(56, 189, 248, 0.5);
            color: #BAE6FD;
        }
        .saa-role-title {
            font-size: 1.45rem;
            font-weight: 900;
            color: #FFFFFF;
            margin: 0;
        }
        .saa-formula-box {
            background: var(--konj-surface-input);
            border: 1.5px solid var(--konj-border);
            border-radius: 12px;
            padding: 0.95rem 1.1rem;
            font-weight: 800;
            font-size: 1rem;
            color: #FFFFFF;
            text-align: center;
        }
        .saa-example-box {
            background: rgba(13, 6, 26, 0.75);
            border-left: 4px solid var(--konj-primary);
            padding: 1rem 1.15rem;
            border-radius: 0 12px 12px 0;
            font-size: 1.1rem;
            line-height: 1.5;
            color: #FFFFFF;
        }
        .saa-test-pill {
            background: rgba(139, 92, 246, 0.12);
            border: 1px dashed var(--konj-border-focus);
            border-radius: 10px;
            padding: 0.75rem 1rem;
            font-size: 0.92rem;
            color: var(--konj-text-muted);
        }

        /* Minimal Pair X-Ray Switcher */
        .saa-xray-card {
            background: var(--konj-surface);
            border: 2px solid var(--konj-border);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
        }
        .saa-pair-tabs {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
            justify-content: center;
            margin: 1.2rem 0 1.6rem;
        }
        .saa-pair-btn {
            background: var(--konj-surface-input);
            border: 1.5px solid var(--konj-border);
            color: var(--konj-text-muted);
            padding: 0.55rem 1.1rem;
            border-radius: 999px;
            font-weight: 800;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .saa-pair-btn.active {
            background: var(--konj-primary);
            color: #FFFFFF;
            border-color: var(--konj-border-focus);
        }
        .saa-slots-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.8rem;
            margin-top: 1rem;
        }
        .saa-slot {
            background: var(--konj-surface-input);
            border: 1.5px solid var(--konj-border);
            border-radius: 12px;
            padding: 0.85rem;
            text-align: center;
        }
        .saa-slot-label {
            font-size: 0.73rem;
            font-weight: 800;
            text-transform: uppercase;
            color: var(--konj-border-focus);
            margin-bottom: 0.35rem;
        }
        .saa-slot-val {
            font-size: 1.15rem;
            font-weight: 900;
            color: #FFFFFF;
        }

        /* Interactive Exercise Cards */
        .saa-exercise-card {
            background: var(--konj-surface);
            border: 2px solid var(--konj-border);
            border-radius: 20px;
            padding: 2rem;
            max-width: 880px;
            margin: 0 auto;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
        }
        .saa-option-btn {
            background: var(--konj-surface-input);
            border: 2px solid var(--konj-border);
            color: #FFFFFF;
            padding: 1rem 1.3rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            width: 100%;
        }
        .saa-option-btn:hover:not(:disabled) {
            background: var(--konj-surface-hover);
            border-color: var(--konj-border-focus);
            transform: translateY(-2px);
        }
        .saa-option-btn.correct {
            background: rgba(16, 185, 129, 0.2);
            border-color: #10B981;
            color: #A7F3D0;
        }
        .saa-option-btn.wrong {
            background: rgba(239, 68, 68, 0.2);
            border-color: #EF4444;
            color: #FECACA;
        }
        .saa-feedback-box {
            margin-top: 1.4rem;
            padding: 1.2rem 1.4rem;
            border-radius: 14px;
            border: 1.5px solid var(--konj-border-focus);
            background: var(--konj-surface-input);
            line-height: 1.55;
        }
        .saa-next-btn {
            margin-top: 1.2rem;
            background: var(--konj-primary);
            color: #FFFFFF;
            border: 1.5px solid var(--konj-border-focus);
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
        }
        .saa-chip {
            background: var(--konj-surface-input);
            border: 2px solid var(--konj-border);
            color: #FFFFFF;
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1.08rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .saa-chip:hover {
            border-color: var(--konj-border-focus);
            background: var(--konj-surface-hover);
        }
        .saa-chip.used {
            opacity: 0.25;
            pointer-events: none;
        }
    `;
    viewContainer.appendChild(style);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'saa-hero';
    hero.innerHTML = `
        <div class="saa-hero-badge">
            ${renderDsIcon('compare', '', { size: 15 })}
            <span>Ordstillings-Duel 4 • Konsekvens vs. Rækkefølge</span>
        </div>
        <h1>"Så" (Konsekvens) vs. "Så" (Senere i rækkefølge)</h1>
        <p>Det lille ord <strong>"så"</strong> har to vidt forskellige betydninger på dansk – og betydningen afgør, om ordstillingen efter "så" er <strong>lige (Subjekt + Verbum)</strong> eller <strong>omvendt med inversion (Verbum + Subjekt)</strong>!</p>
    `;
    viewContainer.appendChild(hero);

    // Tabs
    const tabs = [
        { id: 'kognitiv', label: '1. Kognitiv Model & Røntgen', icon: 'compass' },
        { id: 'tester', label: '2. Erstatnings-Testen (Derfor vs. Derefter)', icon: 'compare' },
        { id: 'detektiv', label: '3. "Så"-Detektiven (8 gåder)', icon: 'search' },
        { id: 'builder', label: '4. Sætningsbyggeren', icon: 'bricks' }
    ];

    let currentTab = extraData.tab || 'kognitiv';
    const nav = document.createElement('div');
    nav.className = 'saa-tabs-nav';
    viewContainer.appendChild(nav);

    const contentArea = document.createElement('div');
    viewContainer.appendChild(contentArea);

    function switchTab(tabId) {
        currentTab = tabId;
        nav.innerHTML = '';
        tabs.forEach(t => {
            const btn = document.createElement('button');
            btn.className = `saa-tab-btn ${currentTab === t.id ? 'active' : ''}`;
            btn.innerHTML = `${renderDsIcon(t.icon, '', { size: 16 })} <span>${t.label}</span>`;
            btn.onclick = () => switchTab(t.id);
            nav.appendChild(btn);
        });

        contentArea.innerHTML = '';
        if (tabId === 'kognitiv') renderTabKognitiv(contentArea);
        else if (tabId === 'tester') renderTabTester(contentArea);
        else if (tabId === 'detektiv') renderTabDetektiv(contentArea);
        else if (tabId === 'builder') renderTabBuilder(contentArea);
    }

    // =====================================================
    // TAB 1: KOGNITIV MODEL & RØNTGEN
    // =====================================================
    const MINIMAL_PAIRS = [
        {
            title: '1. Morgenmad & sult',
            konsekvens: {
                sentence: 'Han var meget sulten, <mark style="background:rgba(245,158,11,0.25);color:#fde68a;padding:0.1rem 0.4rem;border-radius:6px;">så han lavede</mark> mad med det samme.',
                meaning: 'Konsekvens (= "derfor"): Fordi han var sulten, blev resultatet, at han lavede mad.',
                slots: [
                    { label: '1. Helsætning (Årsag)', val: 'Han var meget sulten,' },
                    { label: 'Forbinderfelt (F0)', val: 'så' },
                    { label: 'Subjekt (F1)', val: 'han' },
                    { label: 'Verbum (V2)', val: 'lavede' },
                    { label: 'Restled', val: 'mad med det samme.' }
                ]
            },
            raekkefoelge: {
                sentence: 'Først vaskede han hænder, og <mark style="background:rgba(56,189,248,0.25);color:#bae6fd;padding:0.1rem 0.4rem;border-radius:6px;">så lavede han</mark> mad.',
                meaning: 'Rækkefølge (= "derefter"): Trin 1 var at vaske hænder ➔ Trin 2 var derefter at lave mad.',
                slots: [
                    { label: '1. Begivenhed (Trin 1)', val: 'Først vaskede han hænder, og' },
                    { label: 'Forfelt (F1: Tidsadverbium)', val: 'så (= derefter)' },
                    { label: 'Verbum (V2 - INVERSION!)', val: 'lavede' },
                    { label: 'Subjekt (S)', val: 'han' },
                    { label: 'Restled', val: 'mad.' }
                ]
            }
        },
        {
            title: '2. Biograftur & hjemtur',
            konsekvens: {
                sentence: 'Filmen var kedelig, <mark style="background:rgba(245,158,11,0.25);color:#fde68a;padding:0.1rem 0.4rem;border-radius:6px;">så vi gik</mark> hjem.',
                meaning: 'Konsekvens (= "derfor"): Den kedelige film var årsagen til, at vi gik hjem.',
                slots: [
                    { label: '1. Helsætning (Årsag)', val: 'Filmen var kedelig,' },
                    { label: 'Forbinderfelt (F0)', val: 'så' },
                    { label: 'Subjekt (F1)', val: 'vi' },
                    { label: 'Verbum (V2)', val: 'gik' },
                    { label: 'Restled', val: 'hjem.' }
                ]
            },
            raekkefoelge: {
                sentence: 'Vi så filmen i biografen, og <mark style="background:rgba(56,189,248,0.25);color:#bae6fd;padding:0.1rem 0.4rem;border-radius:6px;">så gik vi</mark> hjem.',
                meaning: 'Rækkefølge (= "bagefter"): Først så vi filmen til ende, og bagefter gik vi hjem.',
                slots: [
                    { label: '1. Begivenhed (Trin 1)', val: 'Vi så filmen i biografen, og' },
                    { label: 'Forfelt (F1: Tidsadverbium)', val: 'så (= bagefter)' },
                    { label: 'Verbum (V2 - INVERSION!)', val: 'gik' },
                    { label: 'Subjekt (S)', val: 'vi' },
                    { label: 'Restled', val: 'hjem.' }
                ]
            }
        },
        {
            title: '3. Regnvejr & kaffe',
            konsekvens: {
                sentence: 'Det begyndte at øsregne, <mark style="background:rgba(245,158,11,0.25);color:#fde68a;padding:0.1rem 0.4rem;border-radius:6px;">så hun løb</mark> ind på en café.',
                meaning: 'Konsekvens (= "derfor"): Regnen tvang hende til at søge læ på caféen.',
                slots: [
                    { label: '1. Helsætning (Årsag)', val: 'Det begyndte at øsregne,' },
                    { label: 'Forbinderfelt (F0)', val: 'så' },
                    { label: 'Subjekt (F1)', val: 'hun' },
                    { label: 'Verbum (V2)', val: 'løb' },
                    { label: 'Restled', val: 'ind på en café.' }
                ]
            },
            raekkefoelge: {
                sentence: 'Først låste hun cyklen, og <mark style="background:rgba(56,189,248,0.25);color:#bae6fd;padding:0.1rem 0.4rem;border-radius:6px;">så gik hun</mark> ind på caféen.',
                meaning: 'Rækkefølge (= "derefter"): To handlinger i kronologisk rækkefølge.',
                slots: [
                    { label: '1. Begivenhed (Trin 1)', val: 'Først låste hun cyklen, og' },
                    { label: 'Forfelt (F1: Tidsadverbium)', val: 'så (= derefter)' },
                    { label: 'Verbum (V2 - INVERSION!)', val: 'gik' },
                    { label: 'Subjekt (S)', val: 'hun' },
                    { label: 'Restled', val: 'ind på caféen.' }
                ]
            }
        }
    ];

    let activePairIdx = 0;

    function renderTabKognitiv(parent) {
        const pair = MINIMAL_PAIRS[activePairIdx];
        parent.innerHTML = `
            <div class="saa-dual-grid">
                <div class="saa-role-card konsekvens">
                    <div class="saa-role-header">
                        <span class="saa-role-tag konsekvens">1. Konjunktion • Konsekvens & Resultat</span>
                        ${renderDsIcon('zap', '', { size: 20 })}
                    </div>
                    <h2 class="saa-role-title">", så" = Konsekvens (Ingen inversion)</h2>
                    <p style="color:var(--konj-text-muted); margin:0; line-height:1.55;">
                        Når <strong>"så"</strong> viser den logiske konsekvens eller følgen af det foregående (engelsk: <em>"so"</em>), er det en <strong>sideordnende helsætningskonjunktion</strong> i Forbinderfeltet (F0).
                    </p>
                    <div class="saa-formula-box">
                        [Årsag], <span style="color:#FDE68A;">så</span> + <span style="color:#86EFAC;">[SUBJEKT]</span> + <span style="color:#FCA5A5;">[VERBUM]</span>
                    </div>
                    <div class="saa-example-box">
                        "Det regnede kraftigt, <strong style="color:#FDE68A;">så jeg tog</strong> bussen."
                    </div>
                    <div class="saa-test-pill">
                        <strong>Erstatnings-trick:</strong> Kan du sætte <em>"og derfor..."</em> ind i tankerne? Så betyder "så" konsekvens, og ordstillingen er <strong>Subjekt før Verbum</strong>!
                    </div>
                </div>

                <div class="saa-role-card raekkefoelge">
                    <div class="saa-role-header">
                        <span class="saa-role-tag raekkefoelge">2. Tidsadverbium • Senere i rækkefølge</span>
                        ${renderDsIcon('clock', '', { size: 20 })}
                    </div>
                    <h2 class="saa-role-title">"(og) så" = Derefter i rækkefølge (Inversion!)</h2>
                    <p style="color:var(--konj-text-muted); margin:0; line-height:1.55;">
                        Når <strong>"så"</strong> betyder <em>"derefter / bagefter / som næste skridt i en rækkefølge"</em> (engelsk: <em>"then / afterwards"</em>), er det et <strong>tidsadverbium</strong> i Forfeltet (F1) – og det udløser <strong>INVERSION</strong>!
                    </p>
                    <div class="saa-formula-box">
                        [Trin 1], (og) <span style="color:#BAE6FD;">så</span> + <span style="color:#FCA5A5;">[VERBUM]</span> + <span style="color:#86EFAC;">[SUBJEKT]</span>
                    </div>
                    <div class="saa-example-box">
                        "Først spiste jeg morgenmad, og <strong style="color:#BAE6FD;">så børstede jeg</strong> tænder."
                    </div>
                    <div class="saa-test-pill">
                        <strong>Erstatnings-trick:</strong> Kan du erstatte "så" med <em>"derefter"</em> eller <em>"bagefter"</em>? Så er det tidsrækkefølge, og <strong>Verbet SKAL stå før Subjektet</strong>!
                    </div>
                </div>
            </div>

            <div class="saa-xray-card">
                <div style="text-align:center;">
                    <h3 style="font-size:1.45rem; font-weight:900; margin:0 0 0.4rem;">Ordstillings-Røntgen: Sammenlign minimale par</h3>
                    <p style="color:var(--konj-text-muted); margin:0;">Se hvordan præcis de samme ord skifter plads, afhængigt af om <strong>"så"</strong> udtrykker konsekvens eller tidsrækkefølge:</p>
                </div>

                <div class="saa-pair-tabs" id="saa-pair-selector"></div>

                <div class="saa-dual-grid" style="margin-bottom:0;">
                    <div style="background:rgba(13,6,26,0.6); border:1.5px solid rgba(245,158,11,0.45); border-radius:16px; padding:1.3rem;">
                        <div style="font-size:0.8rem; font-weight:800; color:#FDE68A; text-transform:uppercase; margin-bottom:0.4rem;">A. Konsekvens (Lige ordstilling: Subjekt + Verbum)</div>
                        <div style="font-size:1.18rem; font-weight:800; margin-bottom:0.5rem;">"${pair.konsekvens.sentence}"</div>
                        <div style="font-size:0.9rem; color:var(--konj-text-muted); margin-bottom:0.8rem;">${pair.konsekvens.meaning}</div>
                        <div class="saa-slots-row">
                            ${pair.konsekvens.slots.map(s => `
                                <div class="saa-slot">
                                    <div class="saa-slot-label">${s.label}</div>
                                    <div class="saa-slot-val">${s.val}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div style="background:rgba(13,6,26,0.6); border:1.5px solid rgba(56,189,248,0.45); border-radius:16px; padding:1.3rem;">
                        <div style="font-size:0.8rem; font-weight:800; color:#BAE6FD; text-transform:uppercase; margin-bottom:0.4rem;">B. Rækkefølge / Senere (Inversion: Verbum + Subjekt)</div>
                        <div style="font-size:1.18rem; font-weight:800; margin-bottom:0.5rem;">"${pair.raekkefoelge.sentence}"</div>
                        <div style="font-size:0.9rem; color:var(--konj-text-muted); margin-bottom:0.8rem;">${pair.raekkefoelge.meaning}</div>
                        <div class="saa-slots-row">
                            ${pair.raekkefoelge.slots.map(s => `
                                <div class="saa-slot">
                                    <div class="saa-slot-label">${s.label}</div>
                                    <div class="saa-slot-val">${s.val}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const selector = parent.querySelector('#saa-pair-selector');
        MINIMAL_PAIRS.forEach((p, idx) => {
            const b = document.createElement('button');
            b.className = `saa-pair-btn ${idx === activePairIdx ? 'active' : ''}`;
            b.textContent = p.title;
            b.onclick = () => {
                activePairIdx = idx;
                renderTabKognitiv(parent);
            };
            selector.appendChild(b);
        });
    }

    // =====================================================
    // TAB 2: ERSTATNINGS-TESTEN (DERFOR vs. DEREFTER)
    // =====================================================
    const TESTER_QUESTIONS = [
        {
            context: 'Situation: Dit tog er blevet aflyst på stationen.',
            prompt: 'Toget var aflyst, ___ på arbejde.',
            meaningQuestion: 'Hvad udtrykker "så" her?',
            correctType: 'Konsekvens (= derfor)',
            correctChoice: 'så jeg tog bussen',
            options: [
                { text: 'så jeg tog bussen (Konsekvens ➔ Subjekt + Verbum)', isCorrect: true },
                { text: 'så tog jeg bussen (Rækkefølge ➔ Verbum + Subjekt)', isCorrect: false }
            ],
            explanation: 'Aflysningen er årsagen, og busturen er KONSEKVENSEN. Her er "så" en konjunktion i forbinderfeltet (F0), og der er INGEN inversion: "så jeg tog bussen".'
        },
        {
            context: 'Situation: Du fortæller om din morgenrutine skridt for skridt.',
            prompt: 'Først tog jeg et varmt bad, og ___ en kop kaffe.',
            meaningQuestion: 'Hvad udtrykker "så" her?',
            correctType: 'Senere i en rækkefølge (= derefter)',
            correctChoice: 'så lavede jeg',
            options: [
                { text: 'så lavede jeg (Rækkefølge / "derefter" ➔ Verbum + Subjekt)', isCorrect: true },
                { text: 'så jeg lavede (Konsekvens ➔ Subjekt + Verbum)', isCorrect: false }
            ],
            explanation: 'Her betyder "og så" = "og derefter / bagefter" (næste begivenhed i rækkefølgen). Derfor er "så" et tidsadverbium i forfeltet, som udløser INVERSION: "og så lavede jeg".'
        },
        {
            context: 'Situation: Køleskabet derhjemme er fuldstændig tomt.',
            prompt: 'Der var ingen mælk i køleskabet, ___ i supermarkedet.',
            correctChoice: 'så han gik',
            options: [
                { text: 'så han gik (Konsekvens ➔ Subjekt + Verbum)', isCorrect: true },
                { text: 'så gik han (Rækkefølge ➔ Verbum + Subjekt)', isCorrect: false }
            ],
            explanation: 'Det tomme køleskab er årsagen til, at han går i supermarkedet. Når "så" betyder resultat/konsekvens, står subjektet FØR verbet: "så han gik".'
        },
        {
            context: 'Situation: En opskrift eller handlingsrække i køkkenet.',
            prompt: 'Først skrællede hun kartoflerne. ___ dem i gryden.',
            correctChoice: 'Så lagde hun',
            options: [
                { text: 'Så lagde hun (Rækkefølge / "derefter" ➔ Verbum + Subjekt)', isCorrect: true },
                { text: 'Så hun lagde (Konsekvens ➔ Subjekt + Verbum)', isCorrect: false }
            ],
            explanation: 'Efter punktum starter "Så" en ny helsætning i betydningen "Derefter" (næste trin i rækkefølgen). Det fylder Forfeltet (plads 1) og kræver INVERSION: "Så lagde hun...".'
        },
        {
            context: 'Situation: Efter en lang arbejdsdag.',
            prompt: 'Jeg havde hovedpine hele eftermiddagen, ___ tidligt hjem.',
            correctChoice: 'så jeg tog',
            options: [
                { text: 'så jeg tog (Konsekvens ➔ Subjekt + Verbum)', isCorrect: true },
                { text: 'så tog jeg (Rækkefølge ➔ Verbum + Subjekt)', isCorrect: false }
            ],
            explanation: 'Hovedpinen er grunden til, at jeg tog tidligt hjem (konsekvens). Derfor bruges lige ordstilling efter komma: ", så jeg tog tidligt hjem".'
        },
        {
            context: 'Situation: En hyggelig aften i byen med vennerne.',
            prompt: 'Først spiste vi middag på en italiensk restaurant, og ___ i biografen.',
            correctChoice: 'så gik vi',
            options: [
                { text: 'så gik vi (Rækkefølge / "bagefter" ➔ Verbum + Subjekt)', isCorrect: true },
                { text: 'så vi gik (Konsekvens ➔ Subjekt + Verbum)', isCorrect: false }
            ],
            explanation: 'At gå i biografen er ikke en logisk konsekvens af at spise italiensk mad – det er næste begivenhed i aftenens rækkefølge ("og bagefter gik vi"). Derfor inversion: "og så gik vi"!'
        }
    ];

    let testerIdx = 0;

    function renderTabTester(parent) {
        const q = TESTER_QUESTIONS[testerIdx];
        parent.innerHTML = `
            <div class="saa-exercise-card">
                <div style="display:flex; justify-content:space-between; color:var(--konj-text-muted); font-weight:800; margin-bottom:0.8rem;">
                    <span>Erstatnings-Testen: Konsekvens eller Rækkefølge?</span>
                    <span>Opgave ${testerIdx + 1} af ${TESTER_QUESTIONS.length}</span>
                </div>
                <div style="font-size:0.95rem; color:var(--konj-border-focus); font-weight:700; margin-bottom:0.6rem;">${q.context}</div>
                <div style="font-size:1.45rem; font-weight:900; background:var(--konj-surface-input); padding:1.3rem; border-radius:14px; border-left:4px solid var(--konj-primary); margin-bottom:1.4rem;">
                    "${q.prompt}"
                </div>
                <div style="display:grid; gap:0.85rem;" id="tester-options"></div>
                <div id="tester-feedback" style="display:none;"></div>
            </div>
        `;

        const optsDiv = parent.querySelector('#tester-options');
        const fbDiv = parent.querySelector('#tester-feedback');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'saa-option-btn';
            btn.textContent = opt.text;
            btn.onclick = () => {
                optsDiv.querySelectorAll('button').forEach(b => b.disabled = true);
                btn.classList.add(opt.isCorrect ? 'correct' : 'wrong');
                fbDiv.style.display = 'block';
                fbDiv.className = 'saa-feedback-box';
                fbDiv.innerHTML = `
                    <div style="font-weight:800; color:${opt.isCorrect ? '#6EE7B7' : '#FCA5A5'}; margin-bottom:0.4rem;">
                        ${opt.isCorrect ? 'Helt rigtigt!' : 'Pas på ordstillingen!'}
                    </div>
                    <div>${q.explanation}</div>
                    <button class="saa-next-btn" id="tester-next">Næste sætning →</button>
                `;
                fbDiv.querySelector('#tester-next').onclick = () => {
                    testerIdx = (testerIdx + 1) % TESTER_QUESTIONS.length;
                    renderTabTester(parent);
                };
            };
            optsDiv.appendChild(btn);
        });
    }

    // =====================================================
    // TAB 3: "SÅ"-DETEKTIVEN (8 GÅDER)
    // =====================================================
    const DETEKTIV_QUESTIONS = [
        {
            quote: 'Batteriet på min telefon var fladt, ___ ikke ringe til dig.',
            options: ['så jeg kunne', 'så kunne jeg', 'og så jeg kunne'],
            correct: 'så jeg kunne',
            explanation: 'Fladt batteri = årsag ➔ kunne ikke ringe = konsekvens. Konjunktionen "så" giver lige ordstilling: "så jeg kunne".'
        },
        {
            quote: 'Først læste vi lektier i to timer, og ___ en lang gåtur i skoven.',
            options: ['så gik vi', 'så vi gik', 'så gået vi'],
            correct: 'så gik vi',
            explanation: 'Her betyder "og så" = "og bagefter" (senere i en rækkefølge af begivenheder). Tidsadverbiet udløser inversion: "så gik vi".'
        },
        {
            quote: 'Når du er færdig med rapporten, ___ holde frokostpause.',
            options: ['så kan vi', 'så vi kan', 'så vi skal'],
            correct: 'så kan vi',
            explanation: 'Efter en "Når"-ledsætning i forfeltet fungerer "så" som genoptagende tidsadverbium ("derefter") og følges straks af verbet (inversion): "så kan vi".'
        },
        {
            quote: 'Butikken havde udsolgt af jordbær, ___ blåbær i stedet for.',
            options: ['så vi købte', 'så købte vi', 'og så vi købte'],
            correct: 'så vi købte',
            explanation: 'Udsolgt af jordbær ➔ konsekvensen blev, at vi købte blåbær: ", så vi købte".'
        },
        {
            quote: 'Mekanikeren skiftede først dækkene, og ___ bremserne på bilen.',
            options: ['så tjekkede han', 'så han tjekkede', 'så tjekker ikke han'],
            correct: 'så tjekkede han',
            explanation: '"Først ... og så ..." beskriver en rækkefølge af handlinger. Efter "og så" kommer verbet før subjektet: "så tjekkede han".'
        },
        {
            quote: 'Det blæste og var iskoldt, ___ indendørs hele dagen.',
            options: ['så børnene blev', 'så blev børnene', 'så børnene blive'],
            correct: 'så børnene blev',
            explanation: 'Det kolde vejr er årsagen, og konsekvensen er, at børnene blev indendørs: ", så børnene blev".'
        },
        {
            quote: 'Hun pakkede sin kuffert, bestilte en taxa, og ___ mod lufthavnen.',
            options: ['så kørte hun', 'så hun kørte', 'så kørt hun'],
            correct: 'så kørte hun',
            explanation: 'Tre begivenheder i en tidsmæssig rækkefølge (1. pakkede, 2. bestilte, 3. og så kørte hun). Derfor inversion!'
        },
        {
            quote: 'Han havde glemt sine briller derhjemme, ___ ikke læse menukortet.',
            options: ['så han kunne', 'så kunne han', 'og så han kunne'],
            correct: 'så han kunne',
            explanation: 'Glemte briller ➔ direkte konsekvens: ", så han kunne ikke læse menukortet".'
        }
    ];

    let detektivIdx = 0;

    function renderTabDetektiv(parent) {
        const q = DETEKTIV_QUESTIONS[detektivIdx];
        parent.innerHTML = `
            <div class="saa-exercise-card">
                <div style="display:flex; justify-content:space-between; color:var(--konj-text-muted); font-weight:800; margin-bottom:0.8rem;">
                    <span>"Så"-Detektiven</span>
                    <span>Gåde ${detektivIdx + 1} af ${DETEKTIV_QUESTIONS.length}</span>
                </div>
                <div style="font-size:1.4rem; font-weight:900; background:var(--konj-surface-input); padding:1.4rem; border-radius:14px; border-left:4px solid var(--konj-primary); margin-bottom:1.5rem;">
                    "${q.quote}"
                </div>
                <div style="display:grid; gap:0.8rem;" id="det-options"></div>
                <div id="det-feedback" style="display:none;"></div>
            </div>
        `;

        const optsDiv = parent.querySelector('#det-options');
        const fbDiv = parent.querySelector('#det-feedback');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'saa-option-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                const isOk = opt === q.correct;
                optsDiv.querySelectorAll('button').forEach(b => b.disabled = true);
                btn.classList.add(isOk ? 'correct' : 'wrong');
                fbDiv.style.display = 'block';
                fbDiv.className = 'saa-feedback-box';
                fbDiv.innerHTML = `
                    <div style="font-weight:800; color:${isOk ? '#6EE7B7' : '#FCA5A5'}; margin-bottom:0.4rem;">
                        ${isOk ? 'Korrekt!' : `Det rigtige svar er: "${q.correct}"`}
                    </div>
                    <div>${q.explanation}</div>
                    <button class="saa-next-btn" id="det-next">Næste gåde →</button>
                `;
                fbDiv.querySelector('#det-next').onclick = () => {
                    detektivIdx = (detektivIdx + 1) % DETEKTIV_QUESTIONS.length;
                    renderTabDetektiv(parent);
                };
            };
            optsDiv.appendChild(btn);
        });
    }

    // =====================================================
    // TAB 4: SÆTNINGSBYGGEREN
    // =====================================================
    const BUILDER_TASKS = [
        {
            type: 'Konsekvens (Lige ordstilling)',
            lead: 'Det regnede kraftigt,',
            target: ['så', 'jeg', 'tog', 'bussen'],
            chips: ['tog', 'så', 'bussen', 'jeg'],
            rule: 'Konsekvens ("så" = resultat): Forbinderfelt (så) + Subjekt (jeg) + Verbum (tog).'
        },
        {
            type: 'Rækkefølge (Inversion!)',
            lead: 'Først spiste jeg morgenmad, og',
            target: ['så', 'børstede', 'jeg', 'tænder'],
            chips: ['jeg', 'børstede', 'tænder', 'så'],
            rule: 'Rækkefølge ("og så" = derefter): Forfelt (så) + Verbum (børstede) + Subjekt (jeg).'
        },
        {
            type: 'Konsekvens (Lige ordstilling)',
            lead: 'Køleskabet var helt tomt,',
            target: ['så', 'vi', 'bestilte', 'pizza'],
            chips: ['bestilte', 'vi', 'så', 'pizza'],
            rule: 'Konsekvens: Det tomme køleskab førte til resultatet ➔ så + vi (Subjekt) + bestilte (Verbum).'
        },
        {
            type: 'Rækkefølge (Inversion!)',
            lead: 'Først handlede vi ind, og',
            target: ['så', 'lavede', 'vi', 'aftensmad'],
            chips: ['vi', 'så', 'aftensmad', 'lavede'],
            rule: 'Rækkefølge (Trin 1 ➔ Trin 2): Tidsadverbiet "så" (= bagefter) kræver Verbum (lavede) før Subjekt (vi).'
        }
    ];

    let builderIdx = 0;
    let builtWords = [];

    function renderTabBuilder(parent) {
        const task = BUILDER_TASKS[builderIdx];
        parent.innerHTML = `
            <div class="saa-exercise-card">
                <div style="display:flex; justify-content:space-between; color:var(--konj-text-muted); font-weight:800; margin-bottom:0.6rem;">
                    <span>Sætningsbyggeren • ${task.type}</span>
                    <span>Opgave ${builderIdx + 1} af ${BUILDER_TASKS.length}</span>
                </div>
                <p style="color:var(--konj-text-muted); margin-top:0;">Klik på ord-brikkerne i den rigtige rækkefølge for at færdiggøre sætningen:</p>

                <div style="background:var(--konj-surface-input); border:2px dashed var(--konj-border-focus); border-radius:14px; padding:1.3rem; min-height:70px; font-size:1.35rem; font-weight:900; margin-bottom:1.3rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                    <span>${task.lead}</span>
                    <span id="built-zone" style="color:#FDE68A;">${builtWords.join(' ') || '...'}</span>
                </div>

                <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1.2rem;" id="builder-chips"></div>
                <button class="saa-tab-btn" id="builder-reset">Nulstil brikker</button>
                <div id="builder-feedback" style="display:none;"></div>
            </div>
        `;

        const chipsDiv = parent.querySelector('#builder-chips');
        const fbDiv = parent.querySelector('#builder-feedback');

        task.chips.forEach((word, idx) => {
            const c = document.createElement('button');
            c.className = 'saa-chip';
            c.textContent = word;
            c.onclick = () => {
                c.classList.add('used');
                builtWords.push(word);
                parent.querySelector('#built-zone').textContent = builtWords.join(' ') + '.';

                if (builtWords.length === task.target.length) {
                    const isOk = builtWords.join(' ') === task.target.join(' ');
                    fbDiv.style.display = 'block';
                    fbDiv.className = 'saa-feedback-box';
                    fbDiv.innerHTML = `
                        <div style="font-weight:800; color:${isOk ? '#6EE7B7' : '#FCA5A5'}; margin-bottom:0.4rem;">
                            ${isOk ? 'Perfekt ordstilling!' : `Ikke helt! Den rigtige rækkefølge er: "${task.lead} ${task.target.join(' ')}."`}
                        </div>
                        <div>${task.rule}</div>
                        <button class="saa-next-btn" id="builder-next">Næste sætning →</button>
                    `;
                    fbDiv.querySelector('#builder-next').onclick = () => {
                        builtWords = [];
                        builderIdx = (builderIdx + 1) % BUILDER_TASKS.length;
                        renderTabBuilder(parent);
                    };
                }
            };
            chipsDiv.appendChild(c);
        });

        parent.querySelector('#builder-reset').onclick = () => {
            builtWords = [];
            renderTabBuilder(parent);
        };
    }

    switchTab(currentTab);
    container.appendChild(viewContainer);
}
