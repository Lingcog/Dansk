import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { speakSansningDanish } from '../components/SansningIntegration.js';

/**
 * SansningStofEnhedView - Hovedflade 1 • Station 1.2:
 * Stof vs. Individ (Køn, Materiale & Kvantificering: træ / et træ, fisk / en fisk, meget / mange, alt / alle)
 */
export function renderSansningStofEnhedView(container, navigateFn, extraData = {}) {
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
            padding: 1.1rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-pair-card:hover {
            border-color: #38bdf8;
            transform: translateY(-2px);
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
    `;
    viewContainer.appendChild(style);

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.innerHTML = `← Tilbage til Hovedflade 1 (Substans & Bestemthed)`;
    backBtn.onclick = () => navigateFn('sansning_flade1');
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.textContent = 'Hovedflade 1 • Station 1.2: Stof vs. individ';
    topBar.appendChild(badge);
    viewContainer.appendChild(topBar);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Stof vs. individ – (træ vs. et træ • fisk vs. en fisk)</h1>
        <p>
            Mange danske substantiver kan skifte kognitiv linse: Zoomer vi helt tæt på <strong>materialet eller maden på tallerkenen</strong>
            (<em>træ, glas, fisk, kylling, øl, chokolade</em> — uden artikel og med <strong>meget / alt</strong>), eller træder vi et skridt tilbage og ser
            <strong>det hele, afgrænsede individ eller beholderen</strong> (<em>et træ, et glas, en fisk, en kylling, en øl</em> — med <strong>en/et, mange / alle</strong>)?
        </p>
    `;
    viewContainer.appendChild(hero);

    // Tabs
    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    viewContainer.appendChild(tabsNav);

    const panelHost = document.createElement('div');
    viewContainer.appendChild(panelHost);

    const pairsData = [
        {
            word: 'TRÆ',
            stofTitle: '🔵 Stof-linsen: træ (materiale)',
            stofSent: 'Spisebordet er lavet af massivt træ.',
            stofNote: 'Her ser vi kun fibrene og materialet — ingen stamme eller krone.',
            individTitle: '🟠 Individ-linsen: et træ / træer',
            individSent: 'Ude i haven står der et gammelt træ.',
            individNote: 'Her træder vi tilbage og ser hele det levende træ med rod og krone.'
        },
        {
            word: 'FISK / KYLLING',
            stofTitle: '🔵 Stof-linsen: fisk / kylling (mad på tallerkenen)',
            stofSent: 'Vi spiser meget fisk og kylling til aftensmad.',
            stofNote: 'På tallerkenen er det udskåret mad-substans (utælleligt).',
            individTitle: '🟠 Individ-linsen: en fisk / en kylling (levende dyr)',
            individSent: 'Mads fangede en stor fisk i søen.',
            individNote: 'I vandet (eller som hel organisme) er det et tælleligt individ med klar kontur.'
        },
        {
            word: 'ØL / KAFFE',
            stofTitle: '🔵 Stof-linsen: øl / kaffe (væsken)',
            stofSent: 'Han drikker ikke ret meget øl eller kaffe.',
            stofNote: 'Her tænker vi på selve drikke-substansen.',
            individTitle: '🟠 Individ-linsen: en øl / to kaffer (flasken eller koppen)',
            individSent: 'Kan jeg bestille en kold øl og to kaffer?',
            individNote: 'I baren/caféen skifter ordet linse til den afgrænsede flaske, dåse eller kop!'
        },
        {
            word: 'GLAS / PAPIR',
            stofTitle: '🔵 Stof-linsen: glas / papir (råmateriale)',
            stofSent: 'Vinduet er lavet af tykt glas, og vi genbruger papir.',
            stofNote: 'Råt, uafgrænset materiale.',
            individTitle: '🟠 Individ-linsen: et glas / et papir (genstand)',
            individSent: 'Hun satte et rent glas og et vigtigt papir på bordet.',
            individNote: 'Et konkret drikkeglas eller et dokument med fire kanter.'
        }
    ];

    const quizItems = [
        { q: '1. Spisebordet i stuen er lavet af ___ (materialet).', opts: ['træ', 'et træ', 'træer'], ans: 'træ', exp: 'Materialet uden ydre omrids står uden artikel: "lavet af træ".' },
        { q: '2. Ude foran vinduet står der ___ med grønne blade.', opts: ['et højt træ', 'højt træ', 'meget træ'], ans: 'et højt træ', exp: 'Hele træet med stamme og krone i haven er et tælleligt individ: "et højt træ".' },
        { q: '3. Mads stod ved søen i to timer og fangede ___.', opts: ['en stor fisk', 'meget stor fisk', 'stor fisk'], ans: 'en stor fisk', exp: 'Det levende dyr med hoved og hale er et tælleligt individ: "en stor fisk".' },
        { q: '4. Lægen siger, at det er sundt at spise ___ om ugen.', opts: ['meget fisk', 'mange fisk', 'en fisk'], ans: 'meget fisk', exp: 'Fisk som fødevare/kost på tallerkenen opfattes som substans: "meget fisk".' },
        { q: '5. Pas på! Der ligger knust ___ på gulvet.', opts: ['glas', 'et glas', 'glasset'], ans: 'glas', exp: 'Knuste skår er råt materiale uden form: "knust glas".' },
        { q: '6. Vil du hente ___ med koldt vand til mig?', opts: ['et glas', 'glas', 'meget glas'], ans: 'et glas', exp: 'Beholderen man drikker af er en tællelig genstand: "et glas".' },
        { q: '7. Der er ___ trafik og støj på vejen i morges.', opts: ['meget', 'mange', 'flere'], ans: 'meget', exp: 'Trafik og støj er utællelige masser -> "meget trafik".' },
        { q: '8. Der holder ___ biler og cykler foran stationen.', opts: ['mange', 'meget', 'alt'], ans: 'mange', exp: 'Biler og cykler har faste konturer i flertal -> "mange biler".' },
        { q: '9. Har du drukket ___ kaffen i kanden?', opts: ['al', 'alle', 'mange'], ans: 'al', exp: 'Kaffe er en utællelig n-ords-masse -> "al kaffen" (og ved t-ord: "alt vandet").' },
        { q: '10. Har du vasket ___ kopperne i køkkenet?', opts: ['alle', 'al', 'alt'], ans: 'alle', exp: 'Kopperne er tællelige enheder i flertal -> "alle kopperne".' }
    ];

    let activeTab = 'par';
    let quizAnswers = {};

    function renderTabs() {
        const tabs = [
            { id: 'par', label: '1. De 4 Dobbelt-linser (Stof ⟷ Individ)' },
            { id: 'kvant', label: '2. Kvantificerings-kompas (Meget/Mange & Al/Alt/Alle)' },
            { id: 'quiz', label: '3. Træningsværksted (10 opgaver)' }
        ];
        tabsNav.innerHTML = tabs.map(t => `
            <button type="button" class="ss-tab-btn ${activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">
                ${t.label}
            </button>
        `).join('');
        tabsNav.querySelectorAll('[data-tab]').forEach(btn => {
            btn.onclick = () => {
                activeTab = btn.getAttribute('data-tab');
                renderTabs();
                renderPanel();
            };
        });
    }

    function renderPanel() {
        if (activeTab === 'par') {
            panelHost.innerHTML = `
                <div class="ss-card">
                    <h2 style="margin:0 0 0.4rem; font-size:1.35rem; color:#ffffff;">Klik på et kort for at høre forskellen på Stof-linsen og Individ-linsen 🔊</h2>
                    <p style="margin:0 0 1.1rem; color:#FFC9CD; font-size:0.92rem;">
                        Samme ord skifter grammatik, alt efter om dit indre kamera zoomer tæt ind på <strong>stoffet</strong> eller træder tilbage og ser <strong>enheden</strong>:
                    </p>
                    <div class="ss-grid-2">
                        ${pairsData.map(p => `
                            <div class="ss-pair-card" data-speak="${p.stofSent} ${p.individSent}">
                                <div style="font-size:0.78rem; font-weight:900; color:#fde047; letter-spacing:0.05em; margin-bottom:0.45rem;">ORD: ${p.word} 🔊</div>
                                <div style="background:rgba(2,132,199,0.2); border-left:3px solid #38bdf8; padding:0.65rem 0.8rem; border-radius:8px; margin-bottom:0.65rem;">
                                    <div style="font-size:0.8rem; font-weight:800; color:#7dd3fc;">${p.stofTitle}</div>
                                    <div style="font-size:0.95rem; font-weight:800; color:#ffffff; margin:0.2rem 0;">»${p.stofSent}«</div>
                                    <div style="font-size:0.78rem; color:#cbd5e1;">${p.stofNote}</div>
                                </div>
                                <div style="background:rgba(234,88,12,0.2); border-left:3px solid #fb923c; padding:0.65rem 0.8rem; border-radius:8px;">
                                    <div style="font-size:0.8rem; font-weight:800; color:#fdba74;">${p.individTitle}</div>
                                    <div style="font-size:0.95rem; font-weight:800; color:#ffffff; margin:0.2rem 0;">»${p.individSent}«</div>
                                    <div style="font-size:0.78rem; color:#cbd5e1;">${p.individNote}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            panelHost.querySelectorAll('[data-speak]').forEach(el => {
                el.onclick = () => speakSansningDanish(el.getAttribute('data-speak'));
            });
        } else if (activeTab === 'kvant') {
            panelHost.innerHTML = `
                <div class="ss-card">
                    <h2 style="margin:0 0 0.5rem; font-size:1.35rem; color:#ffffff;">Kvantificerings-kompasset: Hvordan måler vi masse vs. enheder?</h2>
                    <p style="margin:0 0 1.1rem; color:#FFC9CD; font-size:0.92rem;">
                        Når vi måler en sammenhængende <strong>masse</strong>, vejer vi den i én klump (<em>meget, lidt, al/alt</em>). Når vi måler <strong>afgrænsede individer</strong>, tæller vi dem styk for styk (<em>mange, få, alle</em>):
                    </p>
                    <div class="ss-grid-2">
                        <div class="ss-pair-card" style="border-color:#38bdf8;">
                            <div style="font-size:0.82rem; font-weight:900; color:#7dd3fc; text-transform:uppercase;">🔵 Utællelig Substans (Vægt & Volumen)</div>
                            <h3 style="margin:0.35rem 0; color:#ffffff;">MEGET • LIDT • AL (n-ord) / ALT (t-ord)</h3>
                            <ul style="color:#FFC9CD; font-size:0.9rem; line-height:1.65; padding-left:1.1rem;">
                                <li><strong>Meget</strong> kaffe, <strong>meget</strong> vand, <strong>meget</strong> tid, <strong>meget</strong> trafik</li>
                                <li><strong>Lidt</strong> mælk, <strong>lidt</strong> hjælp, <strong>lidt</strong> sne</li>
                                <li><strong>Al</strong> kaffen, <strong>al</strong> maden, <strong>al</strong> trafikken (n-ord i én samlet masse)</li>
                                <li><strong>Alt</strong> vandet, <strong>alt</strong> brødet, <strong>alt</strong> arbejdet (t-ord i én samlet masse)</li>
                            </ul>
                        </div>
                        <div class="ss-pair-card" style="border-color:#fb923c;">
                            <div style="font-size:0.82rem; font-weight:900; color:#fdba74; text-transform:uppercase;">🟠 Tællelige Enheder (Antal stykker)</div>
                            <h3 style="margin:0.35rem 0; color:#ffffff;">MANGE • FÅ • ALLE (flertal)</h3>
                            <ul style="color:#FFC9CD; font-size:0.9rem; line-height:1.65; padding-left:1.1rem;">
                                <li><strong>Mange</strong> kopper, <strong>mange</strong> biler, <strong>mange</strong> timer, <strong>mange</strong> træer</li>
                                <li><strong>Få</strong> boller, <strong>få</strong> minutter, <strong>få</strong> venner</li>
                                <li><strong>Alle</strong> kopperne, <strong>alle</strong> træerne, <strong>alle</strong> husene (uanset n-ord/t-ord!)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const solvedCount = Object.keys(quizAnswers).filter(k => quizAnswers[k] === quizItems[k].ans).length;
            panelHost.innerHTML = `
                <div class="ss-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem;">
                        <div>
                            <h2 style="margin:0; font-size:1.3rem; color:#ffffff;">Træningsværksted: Stof-linse eller Individ-linse?</h2>
                            <p style="margin:0.2rem 0 0; color:#FFC9CD; font-size:0.88rem;">Vælg den form der passer til, om vi ser uafgrænset stof eller et tælleligt individ.</p>
                        </div>
                        <div style="background:#4A040B; border:1.5px solid #38bdf8; padding:0.45rem 0.9rem; border-radius:999px; font-weight:900; color:#7dd3fc;">
                            Score: ${solvedCount} / ${quizItems.length}
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:0.9rem;">
                        ${quizItems.map((item, idx) => {
                            const picked = quizAnswers[idx];
                            const isCorrect = picked === item.ans;
                            return `
                                <div style="background:#4A040B; border:1px solid #851825; border-radius:14px; padding:1rem;">
                                    <div style="font-weight:800; font-size:0.98rem; color:#ffffff; margin-bottom:0.65rem;">${item.q}</div>
                                    <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                                        ${item.opts.map(opt => {
                                            let cls = 'ss-quiz-opt';
                                            if (picked === opt) cls += isCorrect ? ' correct' : ' wrong';
                                            return `<button type="button" class="${cls}" data-q="${idx}" data-opt="${opt}">${opt}</button>`;
                                        }).join('')}
                                    </div>
                                    ${picked ? `
                                        <div style="margin-top:0.6rem; font-size:0.85rem; color:${isCorrect ? '#86efac' : '#fca5a5'}; font-weight:700;">
                                            ${isCorrect ? '✓ Rigtigt! ' : '✗ Prøv igen: '}${item.exp}
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            panelHost.querySelectorAll('[data-q]').forEach(btn => {
                btn.onclick = () => {
                    const qIdx = parseInt(btn.getAttribute('data-q'), 10);
                    const opt = btn.getAttribute('data-opt');
                    quizAnswers[qIdx] = opt;
                    if (opt === quizItems[qIdx].ans) {
                        speakSansningDanish(quizItems[qIdx].q.replace('___', opt).replace(/^\d+\.\s*/, ''));
                    }
                    renderPanel();
                };
            });
        }
    }

    renderTabs();
    renderPanel();
    container.appendChild(viewContainer);
}
