import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { speakSansningDanish } from '../components/SansningIntegration.js';

/**
 * SansningAdjektivBestemthedView - Hovedflade 1 • Station 1.4:
 * Baghængt vs. Foranstillet Bestemthed (Adjektiv-kilen: huset / koppen vs. det røde hus / den varme kop)
 */
export function renderSansningAdjektivBestemthedView(container, navigateFn, extraData = {}) {
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
    badge.textContent = 'Hovedflade 1 • Station 1.4: Huset vs. det røde hus';
    topBar.appendChild(badge);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Adjektiv-kilen – (huset vs. det røde hus • bilen vs. den nye bil)</h1>
        <p>
            På dansk sidder bestemtheds-ankeret normalt <strong>bag på substantivet</strong> (<em>bil-en, hus-et, huse-ne</em>).
            Men i det øjeblik du kiler et <strong>adjektiv</strong> (en sanset egenskab som <em>ny, rød, varm, gammel</em>) ind foran tingen,
            skubbes bestemtheds-ankeret fysisk <strong>frem foran hele gruppen</strong> som <strong>den / det / de</strong>, adjektivet låses med <strong>-e</strong>, og substantivet mister sin endelse!
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    viewContainer.appendChild(tabsNav);

    const panelHost = document.createElement('div');
    viewContainer.appendChild(panelHost);

    const wedgeExamples = [
        {
            type: 'N-ORD I ENTAL (-en ➔ DEN + adjektiv-e + 0)',
            naked: 'Koppen står på bordet.',
            wedges: [
                { adj: 'varm', phrase: 'Den varme kop står på bordet.' },
                { adj: 'blå', phrase: 'Den blå kop står på bordet.' }
            ],
            rule: 'Endelsen -en bag på "kop-pen" springer frem som "DEN", adjektivet får "-e" (varme), og "kop" står nøgent!'
        },
        {
            type: 'T-ORD I ENTAL (-et ➔ DET + adjektiv-e + 0)',
            naked: 'Huset ligger ved skoven.',
            wedges: [
                { adj: 'rødt', phrase: 'Det røde hus ligger ved skoven.' },
                { adj: 'gammelt', phrase: 'Det gamle hus ligger ved skoven.' }
            ],
            rule: 'Endelsen -et bag på "hus-et" springer frem som "DET", adjektivet får "-e" (røde/gamle), og "hus" mister "-et"!'
        },
        {
            type: 'FLERTAL (-ne/-ene ➔ DE + adjektiv-e + flertal uden -ne)',
            naked: 'Husene (og bilerne) er dyre.',
            wedges: [
                { adj: 'røde / nye', phrase: 'De røde huse (og de nye biler) er dyre.' }
            ],
            rule: 'Endelsen -ne bag på "huse-ne / biler-ne" springer frem som "DE", adjektivet har "-e", og substantivet beholder kun sit flertals -e/-er (huse, biler)!'
        },
        {
            type: 'SAMMENLIGN MED UBESTEMT FORM (en/et bliver foran!)',
            naked: 'En bil • Et hus • Biler',
            wedges: [
                { adj: 'ny / nyt / nye', phrase: 'En ny bil • Et nyt hus • Nye biler' }
            ],
            rule: 'I ubestemt form står "en / et" allerede foran — her kiler adjektivet sig bare ind imellem og retter sig efter kønnet (ny / nyt / nye).'
        }
    ];

    const quizItems = [
        { q: '1. Uden adjektiv: "___ ligger lige ved stranden." (bestemt form af "et hus")', opts: ['Huset', 'Det hus', 'Et hus'], ans: 'Huset', exp: 'Uden adjektiv sidder bestemtheds-ankeret bag på substantivet: "Huset".' },
        { q: '2. Med adjektiv-kile: "___ ligger lige ved stranden." (bestemt form med "gul")', opts: ['Det gule hus', 'Det gule huset', 'Gule huset'], ans: 'Det gule hus', exp: 'Adjektivet skubber "-et" frem som "Det", får "-e" (gule), og "hus" mister "-et"!' },
        { q: '3. Uden adjektiv: "Mads drikker af ___." (bestemt form af "en kop")', opts: ['koppen', 'den kop', 'en kop'], ans: 'koppen', exp: 'Uden adjektiv hænger "-en" bag på substantivet: "koppen".' },
        { q: '4. Med adjektiv-kile: "Mads drikker af ___." (bestemt form med "varm")', opts: ['den varme kop', 'den varme koppen', 'den varm kop'], ans: 'den varme kop', exp: 'Adjektiv-kilen skubber "-en" frem som "den", adjektivet får "-e" (varme), og "kop" står nøgent.' },
        { q: '5. Flertal med adjektiv-kile: "Vi kigger på ___ i havnen." (bestemt flertal med "stor")', opts: ['de store skibe', 'de store skibene', 'det store skibe'], ans: 'de store skibe', exp: 'I bestemt flertal med adjektiv rykker "-ne" frem som "de", og "skibe" mister "-ne": "de store skibe".' },
        { q: '6. Hvilken sætning er 100% korrekt dansk?', opts: ['Den nye bil kører hurtigt.', 'Den nye bilen kører hurtigt.', 'Nye bilen kører hurtigt.'], ans: 'Den nye bil kører hurtigt.', exp: 'Dansk har ikke dobbelt bestemthed (*den nye bilen) — når "Den" står foran, står "bil" uden "-en".' },
        { q: '7. Ubestemt t-ord med adjektiv: "De har købt ___ på Fyn."', opts: ['et gammelt hus', 'det gamle huset', 'et gamle hus'], ans: 'et gammelt hus', exp: 'Efter ubestemt "et" får adjektivet "-t" (men gammel -> gammelt): "et gammelt hus".' },
        { q: '8. Bestemt t-ord med adjektiv: "Nu bor de i ___ på Fyn."', opts: ['det gamle hus', 'det gammelt hus', 'det gamle huset'], ans: 'det gamle hus', exp: 'Efter bestemt "det" får adjektivet altid "-e" (gamle), og substantivet står uden "-et": "det gamle hus".' },
        { q: '9. Bestemt n-ord med adjektiv: "Har du talt med ___?"', opts: ['den venlige lærer', 'den venlig lærer', 'den venlige læreren'], ans: 'den venlige lærer', exp: 'Efter "den" får adjektivet "-e" (venlige), og "lærer" står uden "-en".' },
        { q: '10. Bestemt med "lille": "Katten sover i ___." (et værelse)', opts: ['det lille værelse', 'det små værelse', 'det lille værelset'], ans: 'det lille værelse', exp: '"Lille" hedder "lille" i bestemt ental ("det lille værelse") og "små" i flertal ("de små værelser").' }
    ];

    let activeTab = 'kile';
    let quizAnswers = {};

    function renderTabs() {
        const tabs = [
            { id: 'kile', label: '1. Adjektiv-kilen i Aktion (4 modeller)' },
            { id: 'regel', label: '2. Hvorfor aldrig dobbelt bestemthed på dansk?' },
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
        if (activeTab === 'kile') {
            panelHost.innerHTML = `
                <div class="ss-card">
                    <h2 style="margin:0 0 0.4rem; font-size:1.35rem; color:#ffffff;">Se hvordan Adjektiv-kilen skubber bestemtheds-ankeret frem foran 🔊</h2>
                    <p style="margin:0 0 1.1rem; color:#FFC9CD; font-size:0.92rem;">Klik på et kort for at høre sætningen uden adjektiv og med adjektiv-kile:</p>
                    <div class="ss-grid-2">
                        ${wedgeExamples.map(ex => `
                            <div class="ss-pair-card" data-speak="${ex.naked} ${ex.wedges.map(w => w.phrase).join(' ')}">
                                <div style="font-size:0.8rem; font-weight:900; color:#fde047; margin-bottom:0.5rem;">${ex.type} 🔊</div>
                                <div style="background:rgba(2,132,199,0.2); border-left:3px solid #38bdf8; padding:0.6rem 0.8rem; border-radius:8px; margin-bottom:0.55rem;">
                                    <div style="font-size:0.75rem; font-weight:800; color:#7dd3fc;">🔵 UDEN ADJEKTIV (Baghængt anker):</div>
                                    <div style="font-size:0.95rem; font-weight:800; color:#ffffff;">»${ex.naked}«</div>
                                </div>
                                <div style="background:rgba(234,88,12,0.2); border-left:3px solid #fb923c; padding:0.6rem 0.8rem; border-radius:8px; margin-bottom:0.55rem;">
                                    <div style="font-size:0.75rem; font-weight:800; color:#fdba74;">🟠 MED ADJEKTIV-KILE (Foranstillet anker):</div>
                                    ${ex.wedges.map(w => `<div style="font-size:0.95rem; font-weight:800; color:#ffffff; margin-top:0.2rem;">»${w.phrase}«</div>`).join('')}
                                </div>
                                <div style="font-size:0.82rem; color:#FFC9CD; line-height:1.45;">${ex.rule}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            panelHost.querySelectorAll('[data-speak]').forEach(el => {
                el.onclick = () => speakSansningDanish(el.getAttribute('data-speak'));
            });
        } else if (activeTab === 'regel') {
            panelHost.innerHTML = `
                <div class="ss-card">
                    <h2 style="margin:0 0 0.5rem; font-size:1.35rem; color:#ffffff;">Den Gyldne Lov: Én sætning har kun ÉT bestemtheds-anker!</h2>
                    <p style="margin:0 0 1.1rem; color:#FFC9CD; font-size:0.92rem;">
                        I modsætning til svensk og norsk (hvor man siger <em>"det röda huset"</em>) har dansk <strong>kun ét bestemtheds-anker</strong>. Ankeret sidder enten <strong>bagpå</strong> eller <strong>foran</strong> — aldrig begge steder samtidig:
                    </p>
                    <div class="ss-grid-2">
                        <div class="ss-pair-card" style="border-color:#38bdf8;">
                            <div style="font-size:0.8rem; font-weight:900; color:#7dd3fc;">1. NÅR SUBSTANTIVET STÅR ALENE</div>
                            <h3 style="margin:0.4rem 0; color:#ffffff;">Ankeret sidder BAGPÅ:</h3>
                            <p style="color:#FFC9CD; font-size:0.9rem; line-height:1.6;">
                                • <strong>bil-en</strong><br/>
                                • <strong>hus-et</strong><br/>
                                • <strong>biler-ne / huse-ne</strong>
                            </p>
                        </div>
                        <div class="ss-pair-card" style="border-color:#fb923c;">
                            <div style="font-size:0.8rem; font-weight:900; color:#fdba74;">2. NÅR ET ADJEKTIV KILER SIG IND</div>
                            <h3 style="margin:0.4rem 0; color:#ffffff;">Ankeret hopper FREM + Adjektiv får -E:</h3>
                            <p style="color:#FFC9CD; font-size:0.9rem; line-height:1.6;">
                                • <strong>den</strong> rød<strong>e</strong> bil <em>(IKKE *bilen)</em><br/>
                                • <strong>det</strong> rød<strong>e</strong> hus <em>(IKKE *huset)</em><br/>
                                • <strong>de</strong> rød<strong>e</strong> biler / huse <em>(IKKE *bilerne/*husene)</em>
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
                            <h2 style="margin:0; font-size:1.3rem; color:#ffffff;">Træningsværksted: Baghængt anker eller Adjektiv-kile?</h2>
                            <p style="margin:0.2rem 0 0; color:#FFC9CD; font-size:0.88rem;">Husk: Kun ét bestemtheds-anker — enten bagpå (huset) eller foran (det røde hus)!</p>
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
