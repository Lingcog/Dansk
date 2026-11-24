import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { speakSansningDanish } from '../components/SansningIntegration.js';

/**
 * SansningBestemthedView - Hovedflade 1 • Station 1.3:
 * Ubestemt vs. Bestemt Form (Mentalt spotlight: en kop / kopper vs. koppen / kopperne)
 */
export function renderSansningBestemthedView(container, navigateFn, extraData = {}) {
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

    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.innerHTML = `← Tilbage til Hovedflade 1 (Substans & Bestemthed)`;
    backBtn.onclick = () => navigateFn('sansning_flade1');
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.textContent = 'Hovedflade 1 • Station 1.3: Ubestemt vs. bestemt';
    topBar.appendChild(badge);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Mentalt spotlight – (en kop vs. koppen • stole vs. stolene)</h1>
        <p>
            Bestemthed handler om <strong>mentalt fokus mellem taler og lytter</strong>:
            Når vi introducerer en ny, ukendt enhed på scenen, står artiklen <strong>foran</strong> som en åben søgekegle (<em>en kop, et bord, kopper</em>).
            Så snart både taler og lytter har låst blikket på den samme genstand, glider artiklen på dansk om <strong>bag på ordet</strong> som et fast anker (<em>kop-pen, bord-et, kop-perne</em>)!
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    viewContainer.appendChild(tabsNav);

    const panelHost = document.createElement('div');
    viewContainer.appendChild(panelHost);

    const spotlightScenes = [
        {
            title: '1. Ny på scenen ➔ Låst på scenen (Tekst-broen)',
            indef: 'Mads har købt en bil og et hus.',
            def: 'Bilen holder i indkørslen, og huset ligger ved skoven.',
            why: 'Første gang vi nævner bilen og huset, kender lytteren dem ikke endnu (en bil, et hus). I næste sætning står de allerede på vores fælles mentale scene (bil-en, hus-et)!'
        },
        {
            title: '2. Hvilken som helst ➔ Den konkrete i rummet (Rumsansning)',
            indef: 'Har du en kuglepen, jeg må låne?',
            def: 'Kan du række mig kuglepennen der på bordet?',
            why: 'I første sætning beder du om en hvilken som helst kuglepen. I anden sætning peger du på den bestemte kuglepen, som I begge kan se!'
        },
        {
            title: '3. Del af en kendt ramme (Associativ bestemthed)',
            indef: 'Vi gik ind i en lejlighed.',
            def: 'Køkkenet var lyst, og vinduerne var nymalede.',
            why: 'Selvom køkkenet og vinduerne ikke er nævnt før, ved vi begge, at en lejlighed har et køkken og vinduer — derfor er de straks bestemte (køkken-et, vinduer-ne)!'
        },
        {
            title: '4. Unik i vores fælles verden',
            indef: 'Jeg tegnede en sol og en måne på papiret.',
            def: 'Solen skinner højt på himlen, og statsministeren holder tale.',
            why: 'Når der kun findes én i vores fælles fysiske eller sociale ramme (solen, himlen, jorden, kongen, læreren i klassen), står den automatisk i bestemt form.'
        }
    ];

    const quizItems = [
        { q: '1. Mads har fået ___ i Odense. (Første gang vi hører om jobbet)', opts: ['et nyt job', 'jobbet', 'nye job'], ans: 'et nyt job', exp: 'Første gang noget introduceres for lytteren, bruges ubestemt form: "et nyt job".' },
        { q: '2. Han er super glad, for ___ ligger tæt på stationen. (Nu kender vi det)', opts: ['jobbet', 'et job', 'jobs'], ans: 'jobbet', exp: 'Nu er jobbet allerede på vores fælles mentale scene -> bestemt form: "jobbet".' },
        { q: '3. Undskyld, ligger der ___ her i nærheden? (Et hvilket som helst apotek)', opts: ['et apotek', 'apoteket', 'apotekerne'], ans: 'et apotek', exp: 'Du søger et hvilket som helst apotek -> ubestemt søgekegle: "et apotek".' },
        { q: '4. Kan du lukke ___? Det trækker! (Vinduet i stuen hvor vi sidder)', opts: ['vinduet', 'et vindue', 'vinduer'], ans: 'vinduet', exp: 'Begge personer er i rummet og ved præcis hvilket vindue det er -> "vinduet".' },
        { q: '5. Vi lejede et sommerhus. ___ var desværre utæt.', opts: ['Taget', 'Et tag', 'Tage'], ans: 'Taget', exp: 'Ethvert hus har et tag (associativ bestemthed) -> "Taget".' },
        { q: '6. Kig op! ___ skinner fra en skyfri himmel i dag.', opts: ['Solen', 'En sol', 'Sole'], ans: 'Solen', exp: 'Solen er unik i vores fælles verden -> "Solen".' },
        { q: '7. Der står mange ___ rundt om mødebordet.', opts: ['stole', 'stolene', 'en stol'], ans: 'stole', exp: 'Efter "mange / nogle / to" introduceres et ubestemt antal -> ubestemt flertal: "stole".' },
        { q: '8. Alle ___ i lokalet er optaget nu.', opts: ['stolene', 'stole', 'stolen'], ans: 'stolene', exp: 'Det gælder de specifikke, kendte stole i lokalet ("alle stolene").' },
        { q: '9. Jeg mangler ___ til at skrive under med — har du en?', opts: ['en blyant', 'blyanten', 'blyanterne'], ans: 'en blyant', exp: 'En hvilken som helst blyant -> ubestemt form: "en blyant".' },
        { q: '10. Tak! Jeg lægger ___ tilbage på dit skrivebord bagefter.', opts: ['blyanten', 'en blyant', 'blyanter'], ans: 'blyanten', exp: 'Nu taler vi om præcis den blyant, du lige har lånt -> bestemt form: "blyanten".' }
    ];

    let activeTab = 'spotlight';
    let quizAnswers = {};

    function renderTabs() {
        const tabs = [
            { id: 'spotlight', label: '1. De 4 Spotlight-Situationer' },
            { id: 'matrix', label: '2. Anker-Matrixen (Foran vs. Bagpå)' },
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
        if (activeTab === 'spotlight') {
            panelHost.innerHTML = `
                <div class="ss-card">
                    <h2 style="margin:0 0 0.4rem; font-size:1.35rem; color:#ffffff;">Hvornår skifter vi fra Ubestemt Søgekegle (en/et) til Bestemt Spotlight (-en/-et/-ne)?</h2>
                    <p style="margin:0 0 1.1rem; color:#FFC9CD; font-size:0.92rem;">Klik på en af de 4 kognitive situationer for at høre overgangen 🔊:</p>
                    <div class="ss-grid-2">
                        ${spotlightScenes.map(s => `
                            <div class="ss-pair-card" data-speak="${s.indef} ${s.def}">
                                <div style="font-size:0.84rem; font-weight:900; color:#fde047; margin-bottom:0.5rem;">${s.title} 🔊</div>
                                <div style="background:rgba(2,132,199,0.2); border-left:3px solid #38bdf8; padding:0.6rem 0.8rem; border-radius:8px; margin-bottom:0.55rem;">
                                    <div style="font-size:0.75rem; font-weight:800; color:#7dd3fc;">🔵 UBESTEMT (Søgekegle):</div>
                                    <div style="font-size:0.95rem; font-weight:800; color:#ffffff;">»${s.indef}«</div>
                                </div>
                                <div style="background:rgba(234,88,12,0.2); border-left:3px solid #fb923c; padding:0.6rem 0.8rem; border-radius:8px; margin-bottom:0.55rem;">
                                    <div style="font-size:0.75rem; font-weight:800; color:#fdba74;">🟠 BESTEMT (Låst projektør):</div>
                                    <div style="font-size:0.95rem; font-weight:800; color:#ffffff;">»${s.def}«</div>
                                </div>
                                <div style="font-size:0.82rem; color:#FFC9CD; line-height:1.45;">${s.why}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            panelHost.querySelectorAll('[data-speak]').forEach(el => {
                el.onclick = () => speakSansningDanish(el.getAttribute('data-speak'));
            });
        } else if (activeTab === 'matrix') {
            panelHost.innerHTML = `
                <div class="ss-card">
                    <h2 style="margin:0 0 0.5rem; font-size:1.35rem; color:#ffffff;">Anker-Matrixen: Hvordan artiklen vandrer fra FORAN til BAGPÅ</h2>
                    <p style="margin:0 0 1.1rem; color:#FFC9CD; font-size:0.92rem;">
                        Læg mærke til den fysiske bevægelse: I ubestemt ental står artiklen <strong>løst foran</strong> ordet (<em>en kop, et hus</em>). I bestemt form klikker den sig fast <strong>bag på</strong> ordet (<em>kop-pen, hus-et</em>):
                    </p>
                    <div class="ss-grid-2">
                        <div class="ss-pair-card" style="border-color:#38bdf8;">
                            <div style="font-size:0.8rem; font-weight:900; color:#7dd3fc;">N-ORD (Fælleskøn — ca. 75% af danske substantiver)</div>
                            <h3 style="margin:0.4rem 0; color:#ffffff;">en kop ➔ kop-pen • kopper ➔ kopper-ne</h3>
                            <p style="color:#FFC9CD; font-size:0.88rem; line-height:1.55;">
                                • Ubestemt ental: <strong>en</strong> kop, <strong>en</strong> stol, <strong>en</strong> bil<br/>
                                • Bestemt ental: kop<strong>pen</strong>, stol<strong>en</strong>, bil<strong>en</strong><br/>
                                • Ubestemt flertal: kop<strong>per</strong>, stol<strong>e</strong>, bil<strong>er</strong><br/>
                                • Bestemt flertal: kopper<strong>ne</strong>, stole<strong>ne</strong>, biler<strong>ne</strong>
                            </p>
                        </div>
                        <div class="ss-pair-card" style="border-color:#fb923c;">
                            <div style="font-size:0.8rem; font-weight:900; color:#fdba74;">T-ORD (Intetkøn — ca. 25% af danske substantiver)</div>
                            <h3 style="margin:0.4rem 0; color:#ffffff;">et hus ➔ hus-et • huse ➔ huse-ne</h3>
                            <p style="color:#FFC9CD; font-size:0.88rem; line-height:1.55;">
                                • Ubestemt ental: <strong>et</strong> hus, <strong>et</strong> bord, <strong>et</strong> træ<br/>
                                • Bestemt ental: hus<strong>et</strong>, bord<strong>et</strong>, træ<strong>et</strong><br/>
                                • Ubestemt flertal: hus<strong>e</strong>, bord<strong>e</strong>, træ<strong>er</strong><br/>
                                • Bestemt flertal: huse<strong>ne</strong>, borde<strong>ne</strong>, træer<strong>ne</strong>
                            </p>
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
                            <h2 style="margin:0; font-size:1.3rem; color:#ffffff;">Træningsværksted: Ubestemt Søgekegle eller Bestemt Spotlight?</h2>
                            <p style="margin:0.2rem 0 0; color:#FFC9CD; font-size:0.88rem;">Mærk om tingen introduceres som ny/ukendt, eller om den allerede står i vores fælles synsfelt.</p>
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
