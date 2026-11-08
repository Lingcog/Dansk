import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * VerberGrammatikHubView - Tilpasset DU1 modul 4 og DU2 modul 3-4:
 * Korte, mundrette knaptitler og letforståelige forklaringer uden tunge grammatiske fagord.
 * Indeholder 1-kliks skift mellem Statisk Linje-Diagram og Animerede SVG-Scener.
 */
export function renderVerberGrammatikHubView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container verber-gram-hub';

    function speakDanish(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'da-DK';
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
    }

    const style = document.createElement('style');
    style.textContent = `
        :root {
            --verb-bg: #45050C;
            --verb-bg-glow: #660914;
            --verb-surface: #280D10;
            --verb-surface-hover: #381419;
            --verb-surface-input: #150608;
            --verb-border: #6B1F26;
            --verb-border-focus: #F87171;
            --verb-primary: #EF4444;
            --verb-primary-hover: #DC2626;
            --verb-glow: rgba(239, 68, 68, 0.45);
        }

        body[data-verb-nuance] {
            background-color: var(--verb-bg, #45050C) !important;
            background-image: radial-gradient(circle at top right, var(--verb-bg-glow, #660914), var(--verb-bg, #45050C)) !important;
        }

        .verber-gram-hub {
            max-width: 1140px;
            margin: 0 auto;
            padding: 1rem 1.15rem 4.5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .vg-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 1.1rem;
        }

        .vg-back-btn {
            background: rgba(21, 6, 8, 0.85);
            border: 1.5px solid var(--verb-border, #6B1F26);
            color: #ffffff;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .vg-back-btn:hover {
            border-color: #f87171;
            background: rgba(56, 20, 25, 0.9);
        }

        .vg-hero {
            text-align: center;
            margin-bottom: 1.15rem;
        }
        .vg-hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.3rem 0.85rem;
            border-radius: 999px;
            background: rgba(239, 68, 68, 0.18);
            border: 1px solid rgba(248, 113, 113, 0.45);
            color: #fecaca;
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 0.5rem;
        }
        .vg-hero h1 {
            font-size: 2.05rem;
            font-weight: 900;
            color: #ffffff !important;
            background: none !important;
            -webkit-text-fill-color: #ffffff !important;
            margin: 0 0 0.35rem;
            letter-spacing: -0.02em;
        }
        .vg-hero p {
            color: #fecaca;
            font-size: 0.96rem;
            max-width: 720px;
            margin: 0 auto;
            line-height: 1.45;
        }

        /* Undervisnings-omskifter */
        .vg-mode-switcher-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.65rem;
            flex-wrap: wrap;
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(251, 191, 36, 0.45);
            border-radius: 16px;
            padding: 0.6rem 0.9rem;
            margin: 0 auto 1.3rem;
            max-width: 720px;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);
        }
        .vg-mode-pill {
            flex: 1;
            min-width: 220px;
            background: rgba(30, 41, 59, 0.75);
            border: 1.5px solid rgba(148, 163, 184, 0.28);
            border-radius: 12px;
            padding: 0.55rem 0.9rem;
            color: #cbd5e1;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.18s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.45rem;
        }
        .vg-mode-pill:hover {
            border-color: #fde68a;
            color: #ffffff;
        }
        .vg-mode-pill.active {
            background: linear-gradient(135deg, rgba(220, 38, 38, 0.42), rgba(153, 27, 27, 0.6));
            border-color: #fde68a;
            color: #ffffff;
            box-shadow: 0 0 18px rgba(251, 191, 36, 0.3);
        }

        .vg-quick-toggle-btn {
            background: rgba(30, 41, 59, 0.9);
            border: 1.5px solid rgba(251, 191, 36, 0.55);
            color: #fde68a;
            padding: 0.4rem 0.75rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.76rem;
            cursor: pointer;
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
        }
        .vg-quick-toggle-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: #ffffff;
            color: #ffffff;
        }

        .vg-stage-card {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(9, 14, 28, 0.98));
            border: 2px solid var(--stage-accent, #38bdf8);
            border-radius: 20px;
            padding: 1.1rem 1.2rem;
            box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(56, 189, 248, 0.15);
            margin-bottom: 1.3rem;
            transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .vg-svg-viewport {
            width: 100%;
            background: radial-gradient(circle at 50% 20%, rgba(30, 41, 59, 0.92), rgba(9, 13, 26, 0.99));
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 14px;
            overflow: hidden;
            margin-bottom: 0.8rem;
        }
        .vg-svg-viewport svg {
            width: 100%;
            height: auto;
            display: block;
        }

        .vg-sent-btn {
            background: rgba(30, 41, 59, 0.8);
            border: 1.5px solid rgba(148, 163, 184, 0.28);
            border-radius: 12px;
            padding: 0.6rem 0.85rem;
            color: #e2e8f0;
            text-align: left;
            cursor: pointer;
            transition: all 0.18s ease;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
        }
        .vg-sent-btn:hover {
            border-color: #f87171;
            background: rgba(51, 65, 85, 0.85);
            transform: translateY(-1px);
        }
        .vg-sent-btn.active {
            background: rgba(15, 23, 42, 0.96);
            border-color: var(--btn-color, #fde68a);
            box-shadow: 0 0 16px var(--btn-glow, rgba(251, 191, 36, 0.3));
        }

        .vg-matrix-compact {
            display: grid;
            grid-template-columns: 145px 1fr 1fr;
            gap: 0.65rem;
            align-items: stretch;
        }
        @media (max-width: 760px) {
            .vg-matrix-compact {
                grid-template-columns: 1fr;
            }
            .vg-matrix-corner {
                display: none;
            }
        }
        .vg-m-head {
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 10px;
            padding: 0.5rem 0.7rem;
            text-align: center;
            font-size: 0.76rem;
            font-weight: 900;
            letter-spacing: 0.04em;
        }
        .vg-m-cell {
            background: rgba(30, 41, 59, 0.72);
            border: 2px solid rgba(148, 163, 184, 0.25);
            border-radius: 13px;
            padding: 0.75rem 0.95rem;
            cursor: pointer;
            transition: all 0.18s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .vg-m-cell:hover {
            border-color: rgba(248, 113, 113, 0.65);
        }
        .vg-m-cell.active {
            background: rgba(15, 23, 42, 0.96);
            border-color: var(--cell-color, #fde68a);
            box-shadow: 0 0 18px rgba(251, 191, 36, 0.28);
        }

        .vg-track-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            padding: 0.5rem 0.9rem;
            border-radius: 10px;
            border: 1px solid rgba(248, 113, 113, 0.55);
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            color: #ffffff;
            font-weight: 800;
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .vg-track-btn:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
        }
    `;
    viewContainer.appendChild(style);

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'vg-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'vg-back-btn';
    backBtn.innerHTML = `← Lær grammatik`;
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);

    const rightLinks = document.createElement('div');
    rightLinks.style.cssText = 'display:flex; gap:0.5rem; flex-wrap:wrap;';

    const pobBtn = document.createElement('button');
    pobBtn.className = 'vg-back-btn';
    pobBtn.style.borderColor = 'rgba(251, 191, 36, 0.45)';
    pobBtn.style.color = '#fde68a';
    pobBtn.innerHTML = `Punktet & Broen ➔`;
    pobBtn.onclick = () => navigateFn('punktet_og_broen', { from: 'verber_grammatik' });
    rightLinks.appendChild(pobBtn);

    const top100Btn = document.createElement('button');
    top100Btn.className = 'vg-back-btn';
    top100Btn.style.borderColor = 'rgba(248, 113, 113, 0.45)';
    top100Btn.style.color = '#fca5a5';
    top100Btn.innerHTML = `Top 100 Verber ➔`;
    top100Btn.onclick = () => navigateFn('top100_verber');
    rightLinks.appendChild(top100Btn);

    topBar.appendChild(rightLinks);
    viewContainer.appendChild(topBar);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'vg-hero';
    hero.innerHTML = `
        <div class="vg-hero-kicker">${renderDsIcon('activity', '', { size: 15 })} Verber i hverdagen</div>
        <h1>Verbernes tider</h1>
        <p>
            Lær på en interaktiv måde forskellen på for eksempel datid og nutid.
        </p>
    `;
    viewContainer.appendChild(hero);

    const stage = document.createElement('div');
    viewContainer.appendChild(stage);

    // =========================================================================
    // A. STATISKE LINJE-DIAGRAMMER (OPLYSER I DELE)
    // =========================================================================

    function buildStaticFourLinesDiagram(activeTense) {
        const isNu = activeTense === 'nutid';
        const isDa = activeTense === 'datid' || activeTense === 'datid_hoeflig';
        const isFN = activeTense === 'foernutid';
        const isFD = activeTense === 'foerdatid';

        return `
            <svg viewBox="0 0 680 215">
                <defs>
                    <filter id="lineGlow" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="4" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                <!-- Baggrunds-zoner: PÅ AFSTAND (Venstre) vs. TÆT PÅ (Højre) -->
                <rect x="16" y="12" width="370" height="190" rx="12" fill="rgba(248, 113, 113, 0.05)" stroke="rgba(248, 113, 113, 0.22)" stroke-dasharray="5 5"/>
                <text x="201" y="29" fill="#fca5a5" font-size="10" font-weight="900" text-anchor="middle" letter-spacing="0.6">PÅ AFSTAND (Fortid eller høflig afstand)</text>

                <rect x="398" y="12" width="266" height="190" rx="12" fill="rgba(56, 189, 248, 0.06)" stroke="rgba(56, 189, 248, 0.25)" stroke-dasharray="5 5"/>
                <text x="531" y="29" fill="#7dd3fc" font-size="10" font-weight="900" text-anchor="middle" letter-spacing="0.6">TÆT PÅ (Her og nu)</text>

                <!-- Hoved-tidsakse i bunden -->
                <line x1="36" y1="172" x2="644" y2="172" stroke="#475569" stroke-width="2.5"/>
                <polygon points="644,167 654,172 644,177" fill="#475569"/>

                <!-- Lodret Anker 1: FØR DET (x=85) -->
                <line x1="85" y1="52" x2="85" y2="178" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4"/>
                <text x="85" y="192" fill="#94a3b8" font-size="9.5" font-weight="800" text-anchor="middle">FØR DET</text>

                <!-- Lodret Anker 2: DENGANG (x=255) -->
                <line x1="255" y1="42" x2="255" y2="178" stroke="${isDa || isFD ? '#f87171' : '#64748b'}" stroke-width="${isDa || isFD ? '2.5' : '1.5'}" stroke-dasharray="4 4"/>
                <text x="255" y="192" fill="${isDa || isFD ? '#fca5a5' : '#cbd5e1'}" font-size="10" font-weight="900" text-anchor="middle">DENGANG (Fortid)</text>

                <!-- Lodret Anker 3: LIGE NU (x=545) -->
                <line x1="545" y1="42" x2="545" y2="178" stroke="${isNu || isFN ? '#38bdf8' : '#64748b'}" stroke-width="${isNu || isFN ? '2.5' : '1.5'}"/>
                <text x="545" y="192" fill="${isNu || isFN ? '#38bdf8' : '#cbd5e1'}" font-size="10.5" font-weight="900" text-anchor="middle">NU (Her står vi)</text>

                <!-- LINJE 1: NUTID -->
                <g opacity="${isNu ? '1' : '0.25'}" style="cursor:pointer;" data-svg-tense="nutid">
                    <line x1="505" y1="74" x2="585" y2="74" stroke="#38bdf8" stroke-width="${isNu ? '6' : '3'}" stroke-linecap="round" ${isNu ? 'filter="url(#lineGlow)"' : ''}/>
                    <circle cx="545" cy="74" r="${isNu ? '10' : '6'}" fill="#38bdf8" ${isNu ? 'filter="url(#lineGlow)"' : ''}/>
                    <rect x="478" y="42" width="134" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="${isNu ? '2' : '1'}"/>
                    <text x="545" y="57" fill="#38bdf8" font-size="10" font-weight="900" text-anchor="middle">1. NUTID (maler / vil)</text>
                </g>

                <!-- LINJE 2: DATID -->
                <g opacity="${isDa ? '1' : '0.25'}" style="cursor:pointer;" data-svg-tense="datid">
                    <path d="M 540 86 Q 400 62 265 86" fill="none" stroke="#f87171" stroke-width="${isDa ? '2.5' : '1.5'}" stroke-dasharray="6 5"/>
                    <line x1="210" y1="88" x2="300" y2="88" stroke="#f87171" stroke-width="${isDa ? '6' : '3'}" stroke-linecap="round" ${isDa ? 'filter="url(#lineGlow)"' : ''}/>
                    <circle cx="255" cy="88" r="${isDa ? '10' : '6'}" fill="#f87171" ${isDa ? 'filter="url(#lineGlow)"' : ''}/>
                    <rect x="175" y="54" width="160" height="22" rx="6" fill="#0f172a" stroke="#f87171" stroke-width="${isDa ? '2' : '1'}"/>
                    <text x="255" y="69" fill="#f87171" font-size="10" font-weight="900" text-anchor="middle">2. DATID (tabte / ville)</text>
                </g>

                <!-- LINJE 3: FØRNUTID -->
                <g opacity="${isFN ? '1' : '0.25'}" style="cursor:pointer;" data-svg-tense="foernutid">
                    <circle cx="340" cy="128" r="5" fill="#fbbf24"/>
                    <line x1="340" y1="128" x2="533" y2="128" stroke="#fbbf24" stroke-width="${isFN ? '6' : '3'}" stroke-linecap="round" ${isFN ? 'filter="url(#lineGlow)"' : ''}/>
                    <polygon points="533,120 547,128 533,136" fill="#fbbf24" ${isFN ? 'filter="url(#lineGlow)"' : ''}/>
                    <circle cx="545" cy="128" r="${isFN ? '9' : '5'}" fill="#fde68a"/>
                    <rect x="362" y="98" width="166" height="22" rx="6" fill="#0f172a" stroke="#fbbf24" stroke-width="${isFN ? '2' : '1'}"/>
                    <text x="445" y="113" fill="#fbbf24" font-size="10" font-weight="900" text-anchor="middle">3. FØRNUTID (har/er malet)</text>
                </g>

                <!-- LINJE 4: FØRDATID -->
                <g opacity="${isFD ? '1' : '0.25'}" style="cursor:pointer;" data-svg-tense="foerdatid">
                    <circle cx="85" cy="144" r="5" fill="#c084fc"/>
                    <line x1="85" y1="144" x2="243" y2="144" stroke="#c084fc" stroke-width="${isFD ? '6' : '3'}" stroke-linecap="round" ${isFD ? 'filter="url(#lineGlow)"' : ''}/>
                    <polygon points="243,136 257,144 243,152" fill="#c084fc" ${isFD ? 'filter="url(#lineGlow)"' : ''}/>
                    <circle cx="255" cy="144" r="${isFD ? '9' : '5'}" fill="#e9d5ff"/>
                    <rect x="82" y="114" width="164" height="22" rx="6" fill="#0f172a" stroke="#c084fc" stroke-width="${isFD ? '2' : '1'}"/>
                    <text x="164" y="129" fill="#c084fc" font-size="10" font-weight="900" text-anchor="middle">4. FØRDATID (havde/var kørt)</text>
                </g>
            </svg>
        `;
    }

    function buildStaticHarErSvg(step) {
        const s0 = step === 0;
        const s1 = step === 1;
        const s2 = step === 2;
        return `
            <svg viewBox="0 0 440 120">
                <defs>
                    <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                <line x1="20" y1="102" x2="420" y2="102" stroke="#334155" stroke-width="2"/>

                <g opacity="${s0 ? '1' : '0.28'}" style="cursor:pointer;" data-svg-harer="0">
                    <rect x="22" y="24" width="110" height="64" rx="10" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="${s0 ? '3' : '1.5'}" ${s0 ? 'filter="url(#glow2)"' : ''}/>
                    <text x="77" y="46" fill="#38bdf8" font-size="10" font-weight="900" text-anchor="middle">1. HAR (Aktivitet)</text>
                    <line x1="40" y1="62" x2="114" y2="62" stroke="#38bdf8" stroke-width="${s0 ? '5' : '2.5'}" stroke-dasharray="8 4"/>
                    <text x="77" y="79" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">Det man laver</text>
                </g>

                <g opacity="${s1 ? '1' : '0.28'}" style="cursor:pointer;" data-svg-harer="1">
                    <rect x="165" y="24" width="110" height="64" rx="10" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" stroke-width="${s1 ? '3' : '1.5'}" ${s1 ? 'filter="url(#glow2)"' : ''}/>
                    <text x="220" y="46" fill="#fbbf24" font-size="10" font-weight="900" text-anchor="middle">2. ER (Skift)</text>
                    <line x1="220" y1="52" x2="220" y2="82" stroke="#fde68a" stroke-width="3"/>
                    <line x1="188" y1="66" x2="252" y2="66" stroke="#fbbf24" stroke-width="${s1 ? '5' : '2.5'}"/>
                    <text x="220" y="79" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">Ny tilstand / sted</text>
                </g>

                <g opacity="${s2 ? '1' : '0.28'}" style="cursor:pointer;" data-svg-harer="2">
                    <rect x="308" y="24" width="110" height="64" rx="10" fill="rgba(74,222,128,0.15)" stroke="#4ade80" stroke-width="${s2 ? '3' : '1.5'}" ${s2 ? 'filter="url(#glow2)"' : ''}/>
                    <text x="363" y="46" fill="#4ade80" font-size="10" font-weight="900" text-anchor="middle">3. FORAN ORDET</text>
                    <circle cx="363" cy="63" r="8" fill="#4ade80"/>
                    <text x="363" y="81" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">"et malet hus"</text>
                </g>
            </svg>
        `;
    }

    function buildStaticForceSvg(isCausative) {
        return `
            <svg viewBox="0 0 440 120">
                <defs>
                    <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                <line x1="20" y1="98" x2="420" y2="98" stroke="#475569" stroke-width="2.5"/>

                <g opacity="${isCausative ? '1' : '0.25'}" style="cursor:pointer;" data-svg-force="1">
                    <circle cx="55" cy="56" r="12" fill="#f87171"/>
                    <text x="55" y="34" fill="#fca5a5" font-size="9.5" font-weight="900" text-anchor="middle">HÅND</text>
                    <line x1="72" y1="56" x2="185" y2="56" stroke="#f87171" stroke-width="${isCausative ? '6' : '3'}" stroke-linecap="round" ${isCausative ? 'filter="url(#glow3)"' : ''}/>
                    <polygon points="185,48 200,56 185,64" fill="#f87171"/>
                    <text x="132" y="45" fill="#fde68a" font-size="9.5" font-weight="900" text-anchor="middle">lægger / sætter / stiller</text>
                    <text x="132" y="75" fill="#fca5a5" font-size="8.5" font-weight="800" text-anchor="middle">(Man flytter en ting)</text>
                </g>

                <g opacity="${!isCausative ? '1' : '0.25'}" style="cursor:pointer;" data-svg-force="0">
                    <line x1="255" y1="74" x2="395" y2="74" stroke="#38bdf8" stroke-width="${!isCausative ? '6' : '3'}" stroke-linecap="round" ${!isCausative ? 'filter="url(#glow3)"' : ''}/>
                    <rect x="290" y="44" width="70" height="24" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
                    <text x="325" y="60" fill="#ffffff" font-size="9.5" font-weight="900" text-anchor="middle">ligger / står</text>
                    <text x="325" y="34" fill="#38bdf8" font-size="9.5" font-weight="900" text-anchor="middle">I RO</text>
                    <text x="325" y="91" fill="#7dd3fc" font-size="8.5" font-weight="800" text-anchor="middle">(Tingen er på plads)</text>
                </g>
            </svg>
        `;
    }

    function buildStaticAspectSvg(isLive) {
        return `
            <svg viewBox="0 0 440 120">
                <defs>
                    <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>

                <g opacity="${isLive ? '1' : '0.25'}" style="cursor:pointer;" data-svg-aspect="1">
                    <rect x="28" y="16" width="384" height="40" rx="20" fill="rgba(74,222,128,0.12)" stroke="#4ade80" stroke-width="${isLive ? '3' : '1.5'}" stroke-dasharray="8 4" ${isLive ? 'filter="url(#glow4)"' : ''}/>
                    <line x1="60" y1="36" x2="380" y2="36" stroke="#4ade80" stroke-width="${isLive ? '5' : '2.5'}" stroke-linecap="round"/>
                    <text x="220" y="31" fill="#ffffff" font-size="10" font-weight="900" text-anchor="middle">I GANG LIGE NU: "Jeg ligger og læser"</text>
                </g>

                <g opacity="${!isLive ? '1' : '0.25'}" style="cursor:pointer;" data-svg-aspect="0">
                    <line x1="80" y1="88" x2="360" y2="88" stroke="#38bdf8" stroke-width="${!isLive ? '5' : '2.5'}" stroke-linecap="round" ${!isLive ? 'filter="url(#glow4)"' : ''}/>
                    <circle cx="80" cy="88" r="6" fill="#38bdf8"/>
                    <circle cx="360" cy="88" r="6" fill="#38bdf8"/>
                    <rect x="125" y="68" width="190" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
                    <text x="220" y="83" fill="#38bdf8" font-size="9.5" font-weight="900" text-anchor="middle">KORT INFO: "Jeg læser en bog"</text>
                </g>
            </svg>
        `;
    }

    // =========================================================================
    // B. DE ANIMEREDE SVG-SCENER (MED FORSTÅELIGE ORD)
    // =========================================================================

    function buildAnimatedCameraSvg(mode) {
        if (mode === 'nutid') {
            return `
                <svg viewBox="0 0 600 175">
                    <defs>
                        <radialGradient id="liveGlowAnim" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
                            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>
                    <ellipse cx="300" cy="92" rx="215" ry="62" fill="url(#liveGlowAnim)" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="10 6">
                        <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1.2s" repeatCount="infinite"/>
                    </ellipse>
                    <rect x="200" y="10" width="200" height="22" rx="11" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                    <text x="300" y="25" fill="#38bdf8" font-size="11" font-weight="900" text-anchor="middle">TÆT PÅ • SKER LIGE NU</text>

                    <g transform="translate(150, 78)">
                        <circle cx="0" cy="10" r="12" fill="#38bdf8"/>
                        <path d="M -12 36 Q 0 22 12 36 L 12 65 L -12 65 Z" fill="#0284c7"/>
                        <text x="0" y="82" fill="#cbd5e1" font-size="11" font-weight="800" text-anchor="middle">Taleren (NU)</text>
                    </g>

                    <polygon points="170,92 375,58 375,126" fill="rgba(56, 189, 248, 0.24)">
                        <animate attributeName="opacity" values="0.45;0.95;0.45" dur="1.6s" repeatCount="infinite"/>
                    </polygon>
                    <line x1="172" y1="92" x2="368" y2="92" stroke="#38bdf8" stroke-width="3.5" stroke-dasharray="8 5">
                        <animate attributeName="stroke-dashoffset" from="26" to="0" dur="0.7s" repeatCount="infinite"/>
                    </line>

                    <g transform="translate(425, 62)">
                        <rect x="-46" y="4" width="92" height="62" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
                        <text x="0" y="32" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">NUTID</text>
                        <text x="0" y="50" fill="#4ade80" font-size="10.5" font-weight="800" text-anchor="middle">Lige nu / vane</text>
                    </g>
                </svg>
            `;
        } else if (mode === 'datid' || mode === 'datid_hoeflig') {
            const isPolite = mode === 'datid_hoeflig';
            return `
                <svg viewBox="0 0 600 175">
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>

                    <g transform="translate(95, 78)">
                        <circle cx="0" cy="10" r="11" fill="#94a3b8"/>
                        <path d="M -11 36 Q 0 22 11 36 L 11 65 L -11 65 Z" fill="#64748b"/>
                        <text x="0" y="82" fill="#94a3b8" font-size="11" font-weight="800" text-anchor="middle">Taleren (NU)</text>
                    </g>

                    <line x1="125" y1="94" x2="315" y2="94" stroke="#f87171" stroke-width="3" stroke-dasharray="8 6">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.1s" repeatCount="infinite"/>
                    </line>
                    <rect x="142" y="62" width="156" height="22" rx="11" fill="#0f172a" stroke="#f87171" stroke-width="1.5"/>
                    <text x="220" y="77" fill="#fca5a5" font-size="10" font-weight="900" text-anchor="middle">
                        ${isPolite ? 'HØFLIG AFSTAND ➔' : 'AFSTAND I TID ➔'}
                    </text>

                    <g transform="translate(330, 26)">
                        <rect x="0" y="0" width="225" height="110" rx="12" fill="rgba(239, 68, 68, 0.14)" stroke="#f87171" stroke-width="2.5"/>
                        <line x1="12" y1="12" x2="213" y2="12" stroke="#f87171" stroke-width="3.5" stroke-dasharray="8 7" opacity="0.65"/>
                        <line x1="12" y1="98" x2="213" y2="98" stroke="#f87171" stroke-width="3.5" stroke-dasharray="8 7" opacity="0.65"/>
                        <text x="112" y="45" fill="#fca5a5" font-size="11" font-weight="900" text-anchor="middle">
                            ${isPolite ? 'HØFLIG SPØRGEFORM' : 'DATID (FORTIDS-FILM)'}
                        </text>
                        <text x="112" y="68" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">
                            ${isPolite ? '"Var der andet?" / "Ville du..."' : 'Afsluttet i fortiden'}
                        </text>
                    </g>
                </svg>
            `;
        } else if (mode === 'foernutid') {
            return `
                <svg viewBox="0 0 600 175">
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>

                    <g transform="translate(465, 62)" opacity="0.5">
                        <circle cx="0" cy="30" r="32" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 5"/>
                        <text x="0" y="27" fill="#cbd5e1" font-size="10" font-weight="800" text-anchor="middle">Skete før</text>
                        <text x="0" y="41" fill="#94a3b8" font-size="9.5" text-anchor="middle">(Fortid)</text>
                    </g>

                    <path d="M 428 92 Q 335 58 252 88" fill="none" stroke="#fbbf24" stroke-width="4" stroke-dasharray="10 6">
                        <animate attributeName="stroke-dashoffset" from="0" to="32" dur="0.8s" repeatCount="infinite"/>
                    </path>
                    <polygon points="252,82 238,90 254,95" fill="#fbbf24"/>

                    <g transform="translate(95, 74)">
                        <circle cx="0" cy="12" r="12" fill="#fbbf24"/>
                        <path d="M -12 38 Q 0 24 12 38 L 12 68 L -12 68 Z" fill="#d97706"/>
                        <text x="0" y="86" fill="#fde68a" font-size="11" font-weight="900" text-anchor="middle">Taleren i NU</text>
                    </g>

                    <g transform="translate(142, 28)">
                        <rect x="0" y="0" width="96" height="102" rx="8" fill="#f8fafc" stroke="#fbbf24" stroke-width="3">
                            <animate attributeName="stroke-width" values="2.5;4.5;2.5" dur="1.5s" repeatCount="infinite"/>
                        </rect>
                        <rect x="8" y="9" width="80" height="62" rx="4" fill="#0f172a"/>
                        <text x="48" y="36" fill="#fbbf24" font-size="10" font-weight="900" text-anchor="middle">RESULTAT</text>
                        <text x="48" y="54" fill="#4ade80" font-size="10" font-weight="900" text-anchor="middle">LIGE NU!</text>
                        <text x="48" y="88" fill="#0f172a" font-size="10.5" font-weight="900" text-anchor="middle">HAR / ER</text>
                    </g>
                </svg>
            `;
        } else {
            return `
                <svg viewBox="0 0 600 175">
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>

                    <g transform="translate(75, 80)" opacity="0.55">
                        <circle cx="0" cy="10" r="10" fill="#94a3b8"/>
                        <path d="M -10 34 Q 0 22 10 34 L 10 62 L -10 62 Z" fill="#64748b"/>
                        <text x="0" y="78" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="middle">NU</text>
                    </g>

                    <g transform="translate(300, 48)">
                        <rect x="-68" y="0" width="136" height="84" rx="12" fill="rgba(192, 132, 252, 0.16)" stroke="#c084fc" stroke-width="2.5"/>
                        <text x="0" y="28" fill="#e9d5ff" font-size="10" font-weight="900" text-anchor="middle">FORTID (DATID)</text>
                        <text x="0" y="50" fill="#ffffff" font-size="11.5" font-weight="900" text-anchor="middle">"Da jeg kom..."</text>
                        <text x="0" y="70" fill="#c084fc" font-size="9.5" font-weight="800" text-anchor="middle">(Allerede sket)</text>
                    </g>

                    <path d="M 495 92 Q 430 55 372 86" fill="none" stroke="#c084fc" stroke-width="3.5" stroke-dasharray="9 5">
                        <animate attributeName="stroke-dashoffset" from="0" to="28" dur="0.85s" repeatCount="infinite"/>
                    </path>
                    <g transform="translate(510, 62)">
                        <circle cx="0" cy="30" r="34" fill="rgba(192,132,252,0.12)" stroke="#c084fc" stroke-width="2" stroke-dasharray="5 4"/>
                        <text x="0" y="26" fill="#e9d5ff" font-size="10" font-weight="900" text-anchor="middle">FØR DET:</text>
                        <text x="0" y="42" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">havde / var</text>
                    </g>
                </svg>
            `;
        }
    }

    function buildAnimatedHarErSvg(step) {
        if (step === 0) {
            return `
                <svg viewBox="0 0 420 124">
                    <line x1="20" y1="104" x2="400" y2="104" stroke="#334155" stroke-width="2"/>
                    <g transform="translate(75, 42)">
                        <circle cx="0" cy="12" r="14" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="2">
                            <animate attributeName="r" values="13;17;13" dur="1s" repeatCount="infinite"/>
                        </circle>
                        <circle cx="0" cy="12" r="8" fill="#38bdf8"/>
                        <path d="M -10 34 Q 0 24 10 34 L 10 60 L -10 60 Z" fill="#0284c7"/>
                        <text x="0" y="-8" fill="#38bdf8" font-size="9.5" font-weight="900" text-anchor="middle">PERSONEN</text>
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
                        <text x="0" y="43" fill="#cbd5e1" font-size="9" font-weight="800" text-anchor="middle">Fokus på arbejdet</text>
                    </g>
                </svg>
            `;
        } else if (step === 1) {
            return `
                <svg viewBox="0 0 420 124">
                    <line x1="20" y1="104" x2="400" y2="104" stroke="#334155" stroke-width="2"/>
                    <g transform="translate(80, 52)" opacity="0.45">
                        <rect x="-28" y="8" width="56" height="42" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3"/>
                        <text x="0" y="33" fill="#94a3b8" font-size="9" font-weight="700" text-anchor="middle">Før</text>
                    </g>

                    <g transform="translate(205, 18)">
                        <rect x="-24" y="0" width="48" height="86" rx="6" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" stroke-width="3">
                            <animate attributeName="stroke-width" values="2.5;4.5;2.5" dur="1.2s" repeatCount="infinite"/>
                        </rect>
                        <text x="0" y="-5" fill="#fbbf24" font-size="9.5" font-weight="900" text-anchor="middle">SKIFT / DØR</text>
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
                <svg viewBox="0 0 420 124">
                    <line x1="20" y1="104" x2="400" y2="104" stroke="#334155" stroke-width="2"/>
                    <g transform="translate(210, 38)">
                        <ellipse cx="0" cy="30" rx="88" ry="42" fill="rgba(74, 222, 128, 0.14)" stroke="#4ade80" stroke-width="2" stroke-dasharray="7 4">
                            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1.4s" repeatCount="infinite"/>
                        </ellipse>
                        <polygon points="-38,16 0,-10 38,16" fill="#16a34a" stroke="#86efac" stroke-width="2"/>
                        <rect x="-32" y="16" width="64" height="48" fill="#15803d" stroke="#4ade80" stroke-width="2.5"/>
                        <text x="0" y="38" fill="#ffffff" font-size="10.5" font-weight="900" text-anchor="middle">ET MALET HUS</text>
                        <text x="0" y="52" fill="#bbf7d0" font-size="8.5" font-weight="800" text-anchor="middle">(Beskriver huset)</text>
                    </g>
                </svg>
            `;
        }
    }

    function buildAnimatedForceSvg(isCausative) {
        if (isCausative) {
            return `
                <svg viewBox="0 0 420 120">
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
                <svg viewBox="0 0 420 120">
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

    function buildAnimatedAspectSvg(isLive) {
        if (isLive) {
            return `
                <svg viewBox="0 0 420 120">
                    <ellipse cx="210" cy="64" rx="135" ry="42" fill="rgba(74, 222, 128, 0.14)" stroke="#4ade80" stroke-width="2.5" stroke-dasharray="9 5">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.1s" repeatCount="infinite"/>
                    </ellipse>
                    <rect x="135" y="76" width="150" height="12" rx="5" fill="#334155"/>
                    <circle cx="162" cy="64" r="8" fill="#4ade80"/>
                    <line x1="172" y1="68" x2="235" y2="68" stroke="#4ade80" stroke-width="6" stroke-linecap="round"/>
                    <rect x="208" y="48" width="22" height="16" rx="3" fill="#fde68a"/>
                    <text x="210" y="28" fill="#4ade80" font-size="10" font-weight="900" text-anchor="middle">I GANG LIGE NU: "Jeg ligger og læser"</text>
                </svg>
            `;
        } else {
            return `
                <svg viewBox="0 0 420 120">
                    <g transform="translate(105, 42)">
                        <rect x="-45" y="0" width="90" height="44" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                        <text x="0" y="26" fill="#ffffff" font-size="10.5" font-weight="900" text-anchor="middle">Jeg læser</text>
                    </g>
                    <line x1="155" y1="64" x2="245" y2="64" stroke="#38bdf8" stroke-width="3"/>
                    <polygon points="245,59 255,64 245,69" fill="#38bdf8"/>
                    <g transform="translate(305, 42)">
                        <rect x="-48" y="0" width="96" height="44" rx="8" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="2"/>
                        <text x="0" y="26" fill="#fde68a" font-size="10.5" font-weight="900" text-anchor="middle">en bog</text>
                    </g>
                    <text x="210" y="22" fill="#7dd3fc" font-size="9.5" font-weight="900" text-anchor="middle">KORT INFO / VANE</text>
                </svg>
            `;
        }
    }

    // State
    let visualMode = 'lines'; // 'lines' | 'scenes'
    let activeTense = 'foernutid';
    let c2 = 0;
    let c3 = true;
    let c4 = true;

    const TENSE_DETAILS = {
        nutid: {
            title: '1. NUTID • Sker lige nu (eller som vane)',
            color: '#38bdf8',
            ex: '"Malerne maler huset nu." / "Hvad vil du have?"',
            desc: 'Vi er midt i situationen lige nu.'
        },
        datid: {
            title: '2. DATID • Historie i fortiden (afsluttet)',
            color: '#f87171',
            ex: '"Han tabte sine briller i går." / "Helle boede i Kbh i 10 år."',
            desc: 'Tiden er forbi (f.eks. i går eller for 10 år siden).'
        },
        datid_hoeflig: {
            title: '2. DATID • Høflig afstand lige nu',
            color: '#f87171',
            ex: '"Var der andet?" / "Hvad ville du have?"',
            desc: 'På dansk bruger man ofte datid for at lyde mere høflig og venlig.'
        },
        foernutid: {
            title: '3. FØRNUTID (har / er) • Resultat lige nu',
            color: '#fbbf24',
            ex: '"Han har tabt sine briller!" / "Bussen er kørt!"',
            desc: 'Det skete før, men det er vigtigt for situationen LIGE NU.'
        },
        foerdatid: {
            title: '4. FØRDATID (havde / var) • Sket før noget andet i fortiden',
            color: '#c084fc',
            ex: '"Da jeg kom til stoppestedet, var bussen kørt."',
            desc: 'Bussen kørte, FØR jeg kom derhen i går.'
        }
    };

    function renderHub() {
        const curT = TENSE_DETAILS[activeTense] || TENSE_DETAILS.foernutid;
        const isScenes = visualMode === 'scenes';

        stage.innerHTML = `
            <!-- TOP-OMSKIFTER UNDER UNDERVISNINGEN -->
            <div class="vg-mode-switcher-bar">
                <button class="vg-mode-pill ${!isScenes ? 'active' : ''}" data-set-vmode="lines">
                    <span>📐</span>
                    <span>Vis som Linje-Diagram</span>
                </button>
                <button class="vg-mode-pill ${isScenes ? 'active' : ''}" data-set-vmode="scenes">
                    <span>🎬</span>
                    <span>Vis som Animerede Billeder</span>
                </button>
            </div>

            <!-- DEL 1 (FULD BREDDE): DE 4 TIDER -->
            <div class="vg-stage-card" style="--stage-accent:${curT.color};">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.75rem;">
                    <div>
                        <span style="font-size:0.74rem; font-weight:900; color:${curT.color}; text-transform:uppercase; letter-spacing:0.06em;">
                            Del 1 • De 4 tider (Klik på en tid herunder)
                        </span>
                        <h2 style="margin:0.15rem 0 0; font-size:1.3rem; font-weight:900; color:#ffffff;">${curT.title}</h2>
                    </div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
                        <button class="vg-quick-toggle-btn" data-toggle-vmode="1">
                            ${isScenes ? '📐 Vis linjer' : '🎬 Vis animation'}
                        </button>
                        <button class="vg-track-btn" data-route="verber_tider_4">
                            Åbn De 4 tider & Øvelser ➔
                        </button>
                    </div>
                </div>

                <div class="vg-svg-viewport">
                    ${isScenes ? buildAnimatedCameraSvg(activeTense) : buildStaticFourLinesDiagram(activeTense)}
                </div>

                <div style="background:rgba(15,23,42,0.9); border-left:4px solid ${curT.color}; padding:0.6rem 0.95rem; border-radius:10px; margin-bottom:0.85rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                    <div>
                        <div style="font-size:1.02rem; font-weight:900; color:#ffffff;">${curT.ex}</div>
                        <div style="font-size:0.86rem; color:#cbd5e1; margin-top:0.12rem;">${curT.desc}</div>
                    </div>
                    <button class="vg-back-btn" id="vg-speak-tense" style="padding:0.35rem 0.75rem; font-size:0.78rem;">🔊 Lyt</button>
                </div>

                <!-- 2x2 OVERSIGT MED LETFORSTÅELIGE ORD -->
                <div class="vg-matrix-compact">
                    <div class="vg-matrix-corner" style="font-size:0.74rem; color:#94a3b8; font-weight:800; display:flex; align-items:center; justify-content:center; text-align:center;">
                        Vælg tid →
                    </div>
                    <div class="vg-m-head" style="color:#38bdf8;">TÆT PÅ (Her og nu)</div>
                    <div class="vg-m-head" style="color:#f87171;">PÅ AFSTAND (Fortid eller høflighed)</div>

                    <div class="vg-m-head" style="color:#4ade80; display:flex; align-items:center; justify-content:center;">
                        LIGE I SITUATIONEN
                    </div>
                    <div class="vg-m-cell ${activeTense === 'nutid' ? 'active' : ''}" style="--cell-color:#38bdf8;" data-tense="nutid">
                        <div style="font-weight:900; color:#38bdf8; font-size:0.95rem;">1. NUTID</div>
                        <div style="font-size:0.83rem; color:#e2e8f0; margin-top:0.2rem;">Sker lige nu: <em>"Malerne maler huset"</em></div>
                    </div>
                    <div class="vg-m-cell ${activeTense === 'datid' || activeTense === 'datid_hoeflig' ? 'active' : ''}" style="--cell-color:#f87171;" data-tense="datid">
                        <div style="font-weight:900; color:#f87171; font-size:0.95rem;">2. DATID</div>
                        <div style="font-size:0.83rem; color:#e2e8f0; margin-top:0.2rem;">Fortid ELLER høflig form:</div>
                        <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-top:0.38rem;">
                            <button class="vg-back-btn" data-tense="datid" style="padding:0.25rem 0.55rem; font-size:0.74rem; border-color:${activeTense === 'datid' ? '#fde68a' : '#6B1F26'};">🎬 "Han tabte brillerne"</button>
                            <button class="vg-back-btn" data-tense="datid_hoeflig" style="padding:0.25rem 0.55rem; font-size:0.74rem; border-color:${activeTense === 'datid_hoeflig' ? '#fde68a' : '#6B1F26'};">🎩 "Var der andet?"</button>
                        </div>
                    </div>

                    <div class="vg-m-head" style="color:#fbbf24; display:flex; align-items:center; justify-content:center;">
                        RESULTAT & STATUS
                    </div>
                    <div class="vg-m-cell ${activeTense === 'foernutid' ? 'active' : ''}" style="--cell-color:#fbbf24;" data-tense="foernutid">
                        <div style="font-weight:900; color:#fbbf24; font-size:0.95rem;">3. FØRNUTID (har / er)</div>
                        <div style="font-size:0.83rem; color:#e2e8f0; margin-top:0.2rem;">Vigtigt lige nu: <em>"Han har tabt brillerne!" / "Bussen er kørt"</em></div>
                    </div>
                    <div class="vg-m-cell ${activeTense === 'foerdatid' ? 'active' : ''}" style="--cell-color:#c084fc;" data-tense="foerdatid">
                        <div style="font-weight:900; color:#c084fc; font-size:0.95rem;">4. FØRDATID (havde / var)</div>
                        <div style="font-size:0.83rem; color:#e2e8f0; margin-top:0.2rem;">Sket før datid: <em>"Da jeg kom, var bussen kørt"</em></div>
                    </div>
                </div>
            </div>

            <!-- DE 3 ØVRIGE EMNER -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:1.15rem;">
                <!-- DEL 2: HAR ELLER ER? -->
                <div class="vg-stage-card" style="--stage-accent:#fbbf24; margin-bottom:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.55rem;">
                        <strong style="color:#fde68a; font-size:0.95rem;">2. Har eller Er? (har malet / er malet)</strong>
                        <div style="display:flex; gap:0.35rem;">
                            <button class="vg-quick-toggle-btn" data-toggle-vmode="1" style="padding:0.32rem 0.55rem; font-size:0.72rem;">
                                ${isScenes ? '📐 Linjer' : '🎬 Billede'}
                            </button>
                            <button class="vg-track-btn" data-route="verber_har_er" style="padding:0.36rem 0.7rem; font-size:0.76rem;">Åbn øvelser ➔</button>
                        </div>
                    </div>
                    <div class="vg-svg-viewport">${isScenes ? buildAnimatedHarErSvg(c2) : buildStaticHarErSvg(c2)}</div>
                    <div style="display:flex; flex-direction:column; gap:0.45rem;">
                        <button class="vg-sent-btn ${c2 === 0 ? 'active' : ''}" style="--btn-color:#38bdf8;" data-c2="0">
                            <span style="font-size:0.68rem; color:#38bdf8; font-weight:900;">1. HAR = FOKUS PÅ AKTIVITETEN</span>
                            <span style="font-size:0.85rem; font-weight:800;">"Malerne har malet huset" / "Jeg har kørt i 2 timer"</span>
                        </button>
                        <button class="vg-sent-btn ${c2 === 1 ? 'active' : ''}" style="--btn-color:#fbbf24;" data-c2="1">
                            <span style="font-size:0.68rem; color:#fbbf24; font-weight:900;">2. ER = NY TILSTAND ELLER NYT STED</span>
                            <span style="font-size:0.85rem; font-weight:800;">"Huset er malet" / "Jeg er kørt hjem"</span>
                        </button>
                        <button class="vg-sent-btn ${c2 === 2 ? 'active' : ''}" style="--btn-color:#4ade80;" data-c2="2">
                            <span style="font-size:0.68rem; color:#4ade80; font-weight:900;">3. BESKRIVENDE ORD FORAN TINGEN</span>
                            <span style="font-size:0.85rem; font-weight:800;">"Et malet hus"</span>
                        </button>
                    </div>
                </div>

                <!-- DEL 3: LÆGGER/LIGGER, SÆTTER/SIDDER, STILLER/STÅR -->
                <div class="vg-stage-card" style="--stage-accent:#f87171; margin-bottom:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.55rem;">
                        <strong style="color:#fca5a5; font-size:0.95rem;">3. Lægger / ligger • Sætter / sidder • Stiller / står</strong>
                        <div style="display:flex; gap:0.35rem;">
                            <button class="vg-quick-toggle-btn" data-toggle-vmode="1" style="padding:0.32rem 0.55rem; font-size:0.72rem;">
                                ${isScenes ? '📐 Linjer' : '🎬 Billede'}
                            </button>
                            <button class="vg-track-btn" data-route="verber_kraft_hvile" style="padding:0.36rem 0.7rem; font-size:0.76rem;">Åbn øvelser ➔</button>
                        </div>
                    </div>
                    <div class="vg-svg-viewport">${isScenes ? buildAnimatedForceSvg(c3) : buildStaticForceSvg(c3)}</div>
                    <div style="display:flex; flex-direction:column; gap:0.45rem;">
                        <button class="vg-sent-btn ${c3 ? 'active' : ''}" style="--btn-color:#f87171;" data-c3="1">
                            <span style="font-size:0.68rem; color:#f87171; font-weight:900;">BEVÆGELSE (Man flytter en ting)</span>
                            <span style="font-size:0.85rem; font-weight:800;">"Jeg lægger bogen / sætter koppen / væltede vasen"</span>
                        </button>
                        <button class="vg-sent-btn ${!c3 ? 'active' : ''}" style="--btn-color:#38bdf8;" data-c3="0">
                            <span style="font-size:0.68rem; color:#38bdf8; font-weight:900;">I RO (Tingen er på plads)</span>
                            <span style="font-size:0.85rem; font-weight:800;">"Bogen ligger / koppen står / vasen væltede"</span>
                        </button>
                    </div>
                </div>

                <!-- DEL 4: JEG LIGGER OG LÆSER vs. JEG LÆSER EN BOG -->
                <div class="vg-stage-card" style="--stage-accent:#4ade80; margin-bottom:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.55rem;">
                        <strong style="color:#4ade80; font-size:0.95rem;">4. "Ligger og læser" vs. "Læser en bog"</strong>
                        <div style="display:flex; gap:0.35rem;">
                            <button class="vg-quick-toggle-btn" data-toggle-vmode="1" style="padding:0.32rem 0.55rem; font-size:0.72rem;">
                                ${isScenes ? '📐 Linjer' : '🎬 Billede'}
                            </button>
                            <button class="vg-track-btn" data-route="verber_ligger_og_laeser" style="padding:0.36rem 0.7rem; font-size:0.76rem;">Åbn øvelser ➔</button>
                        </div>
                    </div>
                    <div class="vg-svg-viewport">${isScenes ? buildAnimatedAspectSvg(c4) : buildStaticAspectSvg(c4)}</div>
                    <div style="display:flex; flex-direction:column; gap:0.45rem;">
                        <button class="vg-sent-btn ${c4 ? 'active' : ''}" style="--btn-color:#4ade80;" data-c4="1">
                            <span style="font-size:0.68rem; color:#4ade80; font-weight:900;">I GANG LIGE NU (Krop + handling)</span>
                            <span style="font-size:0.85rem; font-weight:800;">"Jeg ligger og læser" (sidder og spiser / står og venter)</span>
                        </button>
                        <button class="vg-sent-btn ${!c4 ? 'active' : ''}" style="--btn-color:#38bdf8;" data-c4="0">
                            <span style="font-size:0.68rem; color:#38bdf8; font-weight:900;">KORT INFO / VANE</span>
                            <span style="font-size:0.85rem; font-weight:800;">"Jeg læser en bog"</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        stage.querySelectorAll('[data-set-vmode]').forEach(btn => {
            btn.onclick = () => {
                visualMode = btn.dataset.setVmode;
                renderHub();
            };
        });
        stage.querySelectorAll('[data-toggle-vmode]').forEach(btn => {
            btn.onclick = () => {
                visualMode = visualMode === 'lines' ? 'scenes' : 'lines';
                renderHub();
            };
        });

        stage.querySelectorAll('[data-tense], [data-svg-tense]').forEach(el => {
            el.onclick = (e) => {
                e.stopPropagation();
                activeTense = el.dataset.tense || el.dataset.svgTense;
                renderHub();
            };
        });
        const spk = stage.querySelector('#vg-speak-tense');
        if (spk) spk.onclick = () => speakDanish(curT.ex);

        stage.querySelectorAll('[data-c2], [data-svg-harer]').forEach(el => {
            el.onclick = () => {
                c2 = Number(el.dataset.c2 ?? el.dataset.svgHarer);
                renderHub();
            };
        });
        stage.querySelectorAll('[data-c3], [data-svg-force]').forEach(el => {
            el.onclick = () => {
                c3 = (el.dataset.c3 ?? el.dataset.svgForce) === '1';
                renderHub();
            };
        });
        stage.querySelectorAll('[data-c4], [data-svg-aspect]').forEach(el => {
            el.onclick = () => {
                c4 = (el.dataset.c4 ?? el.dataset.svgAspect) === '1';
                renderHub();
            };
        });
        stage.querySelectorAll('[data-route]').forEach(b => {
            b.onclick = () => navigateFn(b.dataset.route);
        });
    }

    renderHub();
    container.appendChild(viewContainer);
}
