import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * VerberTider4View - Flade 1: De 4 Bøjningsformer (Nutid, Datid, Førnutid, Førdatid)
 * Bygget op som Adverbier-fladerne med:
 *  - Statisk 4-linjers master-diagram, hvor den valgte tids linje lyser op
 *  - Fane 1: Aha-værkstedet (Kameravinklen [Film vs. Polaroid & Høflighed], Sporhundene, De 4 Minimale Par)
 *  - Fane 2: Træningsbane 1 – Kameravinklen Først (Uden tidsord!)
 *  - Fane 3: Træningsbane 2 – Sporhunds-Detektiven (Tidsord som sporhunde)
 *  - Fane 4: Træningsbane 3 – Den Afslørende Kontrast (Minimale Par & Sætningsbygger)
 */
export function renderVerberTider4View(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container verber-tider4-view';

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
        .verber-tider4-view {
            max-width: 1120px;
            margin: 0 auto;
            padding: 1rem 1.15rem 4.5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }
        .vt4-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 1.1rem;
        }
        .vt4-back-btn {
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
        .vt4-back-btn:hover {
            border-color: #f87171;
            background: rgba(56, 20, 25, 0.92);
        }
        .vt4-hero {
            text-align: center;
            margin-bottom: 1.4rem;
        }
        .vt4-hero h1 {
            font-size: 2.05rem;
            font-weight: 900;
            color: #ffffff !important;
            margin: 0.3rem 0 0.45rem;
        }
        .vt4-hero p {
            color: #fecaca;
            font-size: 0.98rem;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.5;
        }
        .vt4-tabs-nav {
            display: flex;
            gap: 0.55rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        .vt4-tab-btn {
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
        .vt4-tab-btn:hover {
            border-color: #f87171;
            color: #ffffff;
        }
        .vt4-tab-btn.active {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border-color: #fde68a;
            color: #ffffff;
            box-shadow: 0 6px 18px rgba(239, 68, 68, 0.35);
        }
        .vt4-card {
            background: rgba(15, 23, 42, 0.92);
            border: 1.5px solid rgba(248, 113, 113, 0.3);
            border-radius: 20px;
            padding: 1.35rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }
        .vt4-opt-btn {
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
        .vt4-opt-btn:hover:not(:disabled) {
            border-color: #fde68a;
            transform: translateY(-1px);
        }
        .vt4-opt-btn.correct {
            background: rgba(22, 163, 74, 0.28);
            border-color: #4ade80;
            color: #ffffff;
        }
        .vt4-opt-btn.wrong {
            background: rgba(220, 38, 38, 0.28);
            border-color: #f87171;
            color: #fecaca;
        }
    `;
    viewContainer.appendChild(style);

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'vt4-top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'vt4-back-btn';
    backBtn.innerHTML = `← Tilbage til Verber-oversigten`;
    backBtn.onclick = () => navigateFn('verber_grammatik');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Hero
    const hero = document.createElement('div');
    hero.className = 'vt4-hero';
    hero.innerHTML = `
        <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.28rem 0.85rem; border-radius:999px; background:rgba(251,191,36,0.16); border:1px solid rgba(251,191,36,0.45); color:#fde68a; font-size:0.76rem; font-weight:900; text-transform:uppercase;">
            Del 1 • De 4 tider på dansk
        </div>
        <h1>Nutid • Datid • Førnutid • Førdatid</h1>
        <p>
            Lær hvornår du bruger de 4 tider, hvilke tidsord der hjælper dig, og hvad forskellen betyder.
        </p>
    `;
    viewContainer.appendChild(hero);

    // Statisk 4-linjers diagram generator
    function renderStatic4LinesSvg(activeTense) {
        const isNu = activeTense === 'nutid';
        const isDa = activeTense === 'datid';
        const isFN = activeTense === 'foernutid';
        const isFD = activeTense === 'foerdatid';

        return `
            <svg viewBox="0 0 680 198" style="width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);">
                <defs>
                    <filter id="t4Glow" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="4" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                <rect x="16" y="10" width="370" height="178" rx="12" fill="rgba(248, 113, 113, 0.05)" stroke="rgba(248, 113, 113, 0.22)" stroke-dasharray="5 5"/>
                <text x="201" y="27" fill="#fca5a5" font-size="9.5" font-weight="900" text-anchor="middle">AFSTANDS-RAMME (Datidsramme: Fortid / Fiktion / Høflighed)</text>

                <rect x="398" y="10" width="266" height="178" rx="12" fill="rgba(56, 189, 248, 0.06)" stroke="rgba(56, 189, 248, 0.25)" stroke-dasharray="5 5"/>
                <text x="531" y="27" fill="#7dd3fc" font-size="9.5" font-weight="900" text-anchor="middle">NÆRHEDS-RAMME (Nutidsramme: HER & NU)</text>

                <line x1="36" y1="162" x2="644" y2="162" stroke="#475569" stroke-width="2.5"/>
                <polygon points="644,157 654,162 644,167" fill="#475569"/>

                <line x1="85" y1="45" x2="85" y2="168" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4"/>
                <text x="85" y="181" fill="#94a3b8" font-size="9" font-weight="800" text-anchor="middle">FØR-DA</text>

                <line x1="255" y1="38" x2="255" y2="168" stroke="${isDa || isFD ? '#f87171' : '#64748b'}" stroke-width="${isDa || isFD ? '2.5' : '1.5'}" stroke-dasharray="4 4"/>
                <text x="255" y="181" fill="${isDa || isFD ? '#fca5a5' : '#cbd5e1'}" font-size="9.5" font-weight="900" text-anchor="middle">DA (Biograffilm / Afstand)</text>

                <line x1="545" y1="38" x2="545" y2="168" stroke="${isNu || isFN ? '#38bdf8' : '#64748b'}" stroke-width="${isNu || isFN ? '2.5' : '1.5'}"/>
                <text x="545" y="181" fill="${isNu || isFN ? '#38bdf8' : '#cbd5e1'}" font-size="10" font-weight="900" text-anchor="middle">NU (Taleren står her)</text>

                <!-- 1. NUTID -->
                <g opacity="${isNu ? '1' : '0.25'}" style="cursor:pointer;" data-tense-click="nutid">
                    <line x1="505" y1="68" x2="585" y2="68" stroke="#38bdf8" stroke-width="${isNu ? '6' : '3'}" stroke-linecap="round" ${isNu ? 'filter="url(#t4Glow)"' : ''}/>
                    <circle cx="545" cy="68" r="${isNu ? '9' : '5.5'}" fill="#38bdf8" ${isNu ? 'filter="url(#t4Glow)"' : ''}/>
                    <rect x="478" y="38" width="134" height="20" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="${isNu ? '2' : '1'}"/>
                    <text x="545" y="52" fill="#38bdf8" font-size="9.5" font-weight="900" text-anchor="middle">1. NUTID (maler / vil)</text>
                </g>

                <!-- 2. DATID -->
                <g opacity="${isDa ? '1' : '0.25'}" style="cursor:pointer;" data-tense-click="datid">
                    <path d="M 540 80 Q 400 58 265 80" fill="none" stroke="#f87171" stroke-width="${isDa ? '2.5' : '1.5'}" stroke-dasharray="6 5"/>
                    <line x1="210" y1="82" x2="300" y2="82" stroke="#f87171" stroke-width="${isDa ? '6' : '3'}" stroke-linecap="round" ${isDa ? 'filter="url(#t4Glow)"' : ''}/>
                    <circle cx="255" cy="82" r="${isDa ? '9' : '5.5'}" fill="#f87171" ${isDa ? 'filter="url(#t4Glow)"' : ''}/>
                    <rect x="175" y="50" width="160" height="20" rx="6" fill="#0f172a" stroke="#f87171" stroke-width="${isDa ? '2' : '1'}"/>
                    <text x="255" y="64" fill="#f87171" font-size="9.5" font-weight="900" text-anchor="middle">2. DATID (tabte / boede / ville)</text>
                </g>

                <!-- 3. FØRNUTID -->
                <g opacity="${isFN ? '1' : '0.25'}" style="cursor:pointer;" data-tense-click="foernutid">
                    <circle cx="340" cy="120" r="5" fill="#fbbf24"/>
                    <line x1="340" y1="120" x2="533" y2="120" stroke="#fbbf24" stroke-width="${isFN ? '6' : '3'}" stroke-linecap="round" ${isFN ? 'filter="url(#t4Glow)"' : ''}/>
                    <polygon points="533,112 547,120 533,128" fill="#fbbf24" ${isFN ? 'filter="url(#t4Glow)"' : ''}/>
                    <rect x="358" y="92" width="170" height="20" rx="6" fill="#0f172a" stroke="#fbbf24" stroke-width="${isFN ? '2' : '1'}"/>
                    <text x="443" y="106" fill="#fbbf24" font-size="9.5" font-weight="900" text-anchor="middle">3. FØRNUTID (har tabt / er kørt)</text>
                </g>

                <!-- 4. FØRDATID -->
                <g opacity="${isFD ? '1' : '0.25'}" style="cursor:pointer;" data-tense-click="foerdatid">
                    <circle cx="85" cy="136" r="5" fill="#c084fc"/>
                    <line x1="85" y1="136" x2="243" y2="136" stroke="#c084fc" stroke-width="${isFD ? '6' : '3'}" stroke-linecap="round" ${isFD ? 'filter="url(#t4Glow)"' : ''}/>
                    <polygon points="243,128 257,136 243,144" fill="#c084fc" ${isFD ? 'filter="url(#t4Glow)"' : ''}/>
                    <rect x="82" y="108" width="164" height="20" rx="6" fill="#0f172a" stroke="#c084fc" stroke-width="${isFD ? '2' : '1'}"/>
                    <text x="164" y="122" fill="#c084fc" font-size="9.5" font-weight="900" text-anchor="middle">4. FØRDATID (havde/var kørt)</text>
                </g>
            </svg>
        `;
    }

    function renderAnimatedCameraSvg(mode) {
        const svgStyle = `width:100%; height:auto; display:block; background:radial-gradient(circle at 50% 20%, rgba(30,41,59,0.92), rgba(9,13,26,0.98)); border-radius:14px; border:1px solid rgba(148,163,184,0.2);`;
        if (mode === 'nutid') {
            return `
                <svg viewBox="0 0 600 175" style="${svgStyle}">
                    <defs>
                        <radialGradient id="t4LiveGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
                            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>
                    <ellipse cx="300" cy="92" rx="215" ry="62" fill="url(#t4LiveGlow)" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="10 6">
                        <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1.2s" repeatCount="infinite"/>
                    </ellipse>
                    <rect x="200" y="10" width="200" height="22" rx="11" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                    <text x="300" y="25" fill="#38bdf8" font-size="11" font-weight="900" text-anchor="middle">NÆRHED • LIVE-SCENE HER OG NU</text>
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
                        <text x="0" y="32" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">HANDLING</text>
                        <text x="0" y="50" fill="#4ade80" font-size="10.5" font-weight="800" text-anchor="middle">I GANG NU</text>
                    </g>
                </svg>
            `;
        } else if (mode === 'datid') {
            return `
                <svg viewBox="0 0 600 175" style="${svgStyle}">
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>
                    <g transform="translate(95, 78)">
                        <circle cx="0" cy="10" r="11" fill="#94a3b8"/>
                        <path d="M -11 36 Q 0 22 11 36 L 11 65 L -11 65 Z" fill="#64748b"/>
                        <text x="0" y="82" fill="#94a3b8" font-size="11" font-weight="800" text-anchor="middle">Taleren (NU)</text>
                    </g>
                    <line x1="125" y1="94" x2="315" y2="94" stroke="#f87171" stroke-width="3" stroke-dasharray="8 6">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.1s" repeatCount="infinite"/>
                    </line>
                    <rect x="135" y="62" width="170" height="22" rx="11" fill="#0f172a" stroke="#f87171" stroke-width="1.5"/>
                    <text x="220" y="77" fill="#fca5a5" font-size="10" font-weight="900" text-anchor="middle">MENTAL / HØFLIG AFSTAND ➔</text>
                    <g transform="translate(330, 26)">
                        <rect x="0" y="0" width="225" height="110" rx="12" fill="rgba(239, 68, 68, 0.14)" stroke="#f87171" stroke-width="2.5"/>
                        <line x1="12" y1="12" x2="213" y2="12" stroke="#f87171" stroke-width="3.5" stroke-dasharray="8 7" opacity="0.65"/>
                        <line x1="12" y1="98" x2="213" y2="98" stroke="#f87171" stroke-width="3.5" stroke-dasharray="8 7" opacity="0.65"/>
                        <text x="112" y="45" fill="#fca5a5" font-size="11" font-weight="900" text-anchor="middle">BIOGRAFFILM & HØFLIGHED</text>
                        <text x="112" y="68" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">"tabte brillerne" / "Var der andet?"</text>
                    </g>
                </svg>
            `;
        } else if (mode === 'foernutid') {
            return `
                <svg viewBox="0 0 600 175" style="${svgStyle}">
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>
                    <g transform="translate(465, 62)" opacity="0.5">
                        <circle cx="0" cy="30" r="32" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 5"/>
                        <text x="0" y="27" fill="#cbd5e1" font-size="10" font-weight="800" text-anchor="middle">Førhen</text>
                        <text x="0" y="41" fill="#94a3b8" font-size="9.5" text-anchor="middle">(Handling)</text>
                    </g>
                    <path d="M 428 92 Q 335 58 252 88" fill="none" stroke="#fbbf24" stroke-width="4" stroke-dasharray="10 6">
                        <animate attributeName="stroke-dashoffset" from="0" to="32" dur="0.8s" repeatCount="infinite"/>
                    </path>
                    <polygon points="252,82 238,90 254,95" fill="#fbbf24"/>
                    <g transform="translate(95, 74)">
                        <circle cx="0" cy="12" r="12" fill="#fbbf24"/>
                        <path d="M -12 38 Q 0 24 12 38 L 12 68 L -12 68 Z" fill="#d97706"/>
                        <text x="0" y="86" fill="#fde68a" font-size="11" font-weight="900" text-anchor="middle">Taleren står i NU</text>
                    </g>
                    <g transform="translate(142, 28)">
                        <rect x="0" y="0" width="92" height="102" rx="8" fill="#f8fafc" stroke="#fbbf24" stroke-width="3">
                            <animate attributeName="stroke-width" values="2.5;4.5;2.5" dur="1.5s" repeatCount="infinite"/>
                        </rect>
                        <rect x="8" y="9" width="76" height="62" rx="4" fill="#0f172a"/>
                        <text x="46" y="36" fill="#fbbf24" font-size="10.5" font-weight="900" text-anchor="middle">POLAROID</text>
                        <text x="46" y="54" fill="#4ade80" font-size="10.5" font-weight="900" text-anchor="middle">STATUS NU!</text>
                        <text x="46" y="88" fill="#0f172a" font-size="10.5" font-weight="900" text-anchor="middle">HAR / ER</text>
                    </g>
                </svg>
            `;
        } else {
            return `
                <svg viewBox="0 0 600 175" style="${svgStyle}">
                    <line x1="30" y1="145" x2="570" y2="145" stroke="#334155" stroke-width="2.5"/>
                    <g transform="translate(75, 80)" opacity="0.55">
                        <circle cx="0" cy="10" r="10" fill="#94a3b8"/>
                        <path d="M -10 34 Q 0 22 10 34 L 10 62 L -10 62 Z" fill="#64748b"/>
                        <text x="0" y="78" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="middle">NU</text>
                    </g>
                    <g transform="translate(300, 48)">
                        <rect x="-68" y="0" width="136" height="84" rx="12" fill="rgba(192, 132, 252, 0.16)" stroke="#c084fc" stroke-width="2.5"/>
                        <text x="0" y="28" fill="#e9d5ff" font-size="10.5" font-weight="900" text-anchor="middle">DATIDS-ANKER</text>
                        <text x="0" y="50" fill="#ffffff" font-size="11.5" font-weight="900" text-anchor="middle">"Da jeg kom..."</text>
                        <text x="0" y="70" fill="#c084fc" font-size="10" font-weight="800" text-anchor="middle">(Polaroid dengang)</text>
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

    let diagramVisualMode = 'lines'; // 'lines' | 'scenes'
    function renderCurrent4LinesOrScene(activeTense) {
        return diagramVisualMode === 'scenes'
            ? renderAnimatedCameraSvg(activeTense)
            : renderStatic4LinesSvg(activeTense);
    }

    // Tabs
    const tabs = [
        { id: 'aha', label: '1. Overblik & Eksempler' },
        { id: 'kamera', label: '2. Øvelse 1: Vælg den rigtige tid' },
        { id: 'sporhunde', label: '3. Øvelse 2: Find tidsordet' },
        { id: 'duel', label: '4. Øvelse 3: Se forskellen' }
    ];

    let currentTab = (extraData && extraData.subPath && tabs.some(t => t.id === extraData.subPath))
        ? extraData.subPath
        : 'aha';

    const nav = document.createElement('div');
    nav.className = 'vt4-tabs-nav';
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/verber_tider_4/${tabId}`);
        nav.innerHTML = '';
        tabs.forEach(t => {
            const b = document.createElement('button');
            b.className = `vt4-tab-btn ${currentTab === t.id ? 'active' : ''}`;
            b.textContent = t.label;
            b.onclick = () => switchTab(t.id);
            nav.appendChild(b);
        });

        tabContent.innerHTML = '';
        if (tabId === 'aha') renderTabAha(tabContent);
        else if (tabId === 'kamera') renderTabKamera(tabContent);
        else if (tabId === 'sporhunde') renderTabSporhunde(tabContent);
        else if (tabId === 'duel') renderTabDuel(tabContent);
    }

    // =========================================================================
    // FANE 1: AHA-VÆRKSTEDET
    // =========================================================================
    function renderTabAha(parent) {
        let selTense = 'foernutid';
        let selPairIdx = 0;

        const TENSE_INFO = {
            nutid: {
                badge: '1. NUTID • Sker lige nu (eller som vane)',
                color: '#38bdf8',
                metaphor: 'Tæt på her og nu',
                rule: 'Brug nutid om det, der sker lige nu, eller noget du plejer at gøre. I en butik kan nutid ("Hvad vil du have?") dog lyde lidt hårdt.',
                examples: ['Malerne maler huset lige nu.', 'Jeg bor i Danmark.', 'Hvad vil du have? (Meget direkte)']
            },
            datid: {
                badge: '2. DATID • Fortid eller høflig afstand',
                color: '#f87171',
                metaphor: 'Fortids-film eller høflig form',
                rule: 'Brug datid: 1) Når du fortæller om noget i fortiden ("i går"), 2) Når noget er slut ("boede i 10 år"), eller 3) Når du vil spørge høfligt ("Var der andet?").',
                examples: ['Først gik han ind, og så så han et brev.', 'Helle boede i København i 10 år. (Nu bor hun et andet sted)', 'Var der andet? / Hvad ville du have? (Høfligt!)']
            },
            foernutid: {
                badge: '3. FØRNUTID (har / er) • Resultat lige nu',
                color: '#fbbf24',
                metaphor: 'Vigtigt for situationen lige nu',
                rule: 'Brug førnutid, når noget skete før, men resultatet gælder LIGE NU — eller når noget startede før og stadig fortsætter i dag.',
                examples: ['Jeg har tabt mine nøgler! (= Jeg kan ikke låse op NU)', 'Bussen er kørt! / Nej tak, jeg har lige drukket kaffe.', 'Helle har boet i København i 10 år. (= Hun bor der stadig!)']
            },
            foerdatid: {
                badge: '4. FØRDATID (havde / var) • Sket før noget andet i fortiden',
                color: '#c084fc',
                metaphor: 'Før fortiden',
                rule: 'Brug førdatid, når noget allerede var sket FØR et tidspunkt i fortiden ("Da jeg kom, var bussen kørt").',
                examples: ['Da jeg nåede stoppestedet, var bussen kørt.', 'Han kunne ikke komme ind, for han havde tabt sine nøgler.']
            }
        };

        const PAIRS = [
            {
                title: '1. Brillerne (Resultat nu vs. Fortid)',
                a: 'Han har tabt sine briller.',
                aTag: 'Førnutid (Resultat nu)',
                aDesc: 'Han kan ikke se noget LIGE NU!',
                b: 'Han tabte sine briller.',
                bTag: 'Datid (Fortids-historie)',
                bDesc: 'Det skete dengang — måske fandt han dem igen.'
            },
            {
                title: '2. Bopæl i 10 år (Bor der stadig vs. Flyttet)',
                a: 'Helle har boet i København i 10 år.',
                aTag: 'Førnutid (Stadig i dag)',
                aDesc: 'Hun bor stadig i København i dag!',
                b: 'Helle boede i København i 10 år.',
                bTag: 'Datid (Slut)',
                bDesc: 'Det er slut — nu bor hun i en anden by.'
            },
            {
                title: '3. I butikken (Direkte vs. Høflig)',
                a: 'Hvad vil du have? / Har du to minutter?',
                aTag: 'Nutid (Meget direkte)',
                aDesc: 'Meget direkte — kan lyde lidt hårdt.',
                b: 'Hvad ville du have? / Var der andet?',
                bTag: 'Datid (Høflig form)',
                bDesc: 'Venligt og høfligt over for kunden.'
            }
        ];

        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            const info = TENSE_INFO[selTense];
            const pair = PAIRS[selPairIdx];

            wrap.innerHTML = `
                <!-- TRIN 1: DIAGRAM -->
                <div class="vt4-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                        <div>
                            <span style="font-size:0.75rem; font-weight:900; color:#fde68a; text-transform:uppercase;">Trin 1 • Klik på de 4 tider herunder</span>
                            <h2 style="margin:0.15rem 0 0; font-size:1.3rem; font-weight:900;">${info.badge}</h2>
                        </div>
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap; align-items:center;">
                            <button class="vt4-back-btn" id="vt4-toggle-vmode" style="border-color:#fde68a; color:#fde68a; background:rgba(30,41,59,0.95);">
                                ${diagramVisualMode === 'scenes' ? '📐 Vis linjer' : '🎬 Vis animation'}
                            </button>
                            ${[
                                { k: 'nutid', l: '1. Nutid', c: '#38bdf8' },
                                { k: 'datid', l: '2. Datid', c: '#f87171' },
                                { k: 'foernutid', l: '3. Førnutid (har/er)', c: '#fbbf24' },
                                { k: 'foerdatid', l: '4. Førdatid (havde/var)', c: '#c084fc' }
                            ].map(b => `
                                <button class="vt4-back-btn" data-tense-click="${b.k}" style="border-color:${selTense === b.k ? b.c : '#475569'}; background:${selTense === b.k ? 'rgba(30,41,59,0.95)' : 'rgba(15,23,42,0.7)'}; color:${selTense === b.k ? b.c : '#cbd5e1'};">
                                    ${b.l}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    ${renderCurrent4LinesOrScene(selTense)}

                    <div style="margin-top:0.9rem; background:rgba(30,41,59,0.85); border-left:4px solid ${info.color}; border-radius:12px; padding:0.9rem 1.1rem;">
                        <div style="font-size:0.78rem; font-weight:900; color:${info.color}; text-transform:uppercase;">Kort huskeregel: ${info.metaphor}</div>
                        <div style="font-size:0.95rem; color:#f8fafc; margin:0.25rem 0 0.6rem; line-height:1.45;">${info.rule}</div>
                        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                            ${info.examples.map(ex => `
                                <span style="background:rgba(15,23,42,0.9); border:1px solid ${info.color}; color:#ffffff; padding:0.35rem 0.7rem; border-radius:8px; font-size:0.85rem; font-weight:700;">"${ex}"</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- TRIN 2: TIDSORD SOM HJÆLPER -->
                <div class="vt4-card">
                    <span style="font-size:0.75rem; font-weight:900; color:#38bdf8; text-transform:uppercase;">Trin 2 • Kig efter tidsordene i sætningen</span>
                    <h2 style="margin:0.2rem 0 0.85rem; font-size:1.3rem; font-weight:900;">Hvilke tidsord passer til Datid og Førnutid?</h2>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem;">
                        <div style="background:rgba(248,113,113,0.1); border:1.5px solid #f87171; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#f87171; text-transform:uppercase;">Fast tid i fortiden → Brug DATID</div>
                            <p style="font-size:0.85rem; color:#cbd5e1; margin:0.3rem 0 0.65rem;">Tiden er helt forbi:</p>
                            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                                ${['i går', 'i morges', 'da jeg var barn', 'for tre dage siden', 'i 1998', 'kl. 14.00'].map(w => `
                                    <span style="background:rgba(239,68,68,0.2); border:1px solid #f87171; color:#fecaca; padding:0.3rem 0.65rem; border-radius:7px; font-size:0.82rem; font-weight:800;">${w}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div style="background:rgba(251,191,36,0.1); border:1.5px solid #fbbf24; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.78rem; font-weight:900; color:#fbbf24; text-transform:uppercase;">Tiden rækker op til nu → Brug FØRNUTID (har / er)</div>
                            <p style="font-size:0.85rem; color:#cbd5e1; margin:0.3rem 0 0.65rem;">Det handler om i dag eller indtil nu:</p>
                            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                                ${['i dag', 'i år', 'allerede', 'lige', 'i mange år (og stadig)', 'aldrig / nogensinde'].map(w => `
                                    <span style="background:rgba(245,158,11,0.2); border:1px solid #fbbf24; color:#fde68a; padding:0.3rem 0.65rem; border-radius:7px; font-size:0.82rem; font-weight:800;">${w}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TRIN 3: SAMMENLIGN TO SÆTNINGER -->
                <div class="vt4-card" style="margin-bottom:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.85rem;">
                        <div>
                            <span style="font-size:0.75rem; font-weight:900; color:#4ade80; text-transform:uppercase;">Trin 3 • Se forskellen på betydningen</span>
                            <h2 style="margin:0.15rem 0 0; font-size:1.3rem; font-weight:900;">To næsten ens sætninger — men forskellig betydning</h2>
                        </div>
                        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
                            ${PAIRS.map((p, idx) => `
                                <button class="vt4-back-btn" data-pair-idx="${idx}" style="border-color:${selPairIdx === idx ? '#fde68a' : '#475569'}; color:${selPairIdx === idx ? '#fde68a' : '#cbd5e1'};">
                                    ${p.title.split('(')[0]}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:1rem;">
                        <div style="background:rgba(251,191,36,0.1); border:1.5px solid #fbbf24; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.74rem; font-weight:900; color:#fbbf24; text-transform:uppercase;">${pair.aTag}</div>
                            <div style="font-size:1.18rem; font-weight:900; color:#ffffff; margin:0.3rem 0;">"${pair.a}"</div>
                            <div style="font-size:0.88rem; color:#fde68a;">➔ ${pair.aDesc}</div>
                        </div>
                        <div style="background:rgba(248,113,113,0.1); border:1.5px solid #f87171; border-radius:14px; padding:1rem;">
                            <div style="font-size:0.74rem; font-weight:900; color:#f87171; text-transform:uppercase;">${pair.bTag}</div>
                            <div style="font-size:1.18rem; font-weight:900; color:#ffffff; margin:0.3rem 0;">"${pair.b}"</div>
                            <div style="font-size:0.88rem; color:#fecaca;">➔ ${pair.bDesc}</div>
                        </div>
                    </div>
                </div>
            `;

            const vToggle = wrap.querySelector('#vt4-toggle-vmode');
            if (vToggle) {
                vToggle.onclick = () => {
                    diagramVisualMode = diagramVisualMode === 'lines' ? 'scenes' : 'lines';
                    draw();
                };
            }
            wrap.querySelectorAll('[data-tense-click]').forEach(el => {
                el.onclick = () => {
                    selTense = el.dataset.tenseClick;
                    draw();
                };
            });
            wrap.querySelectorAll('[data-pair-idx]').forEach(el => {
                el.onclick = () => {
                    selPairIdx = Number(el.dataset.pairIdx);
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 2: TRÆNINGSBANE 1 – KAMERAVINKLEN FØRST (UDEN TIDSORD!)
    // =========================================================================
    function renderTabKamera(parent) {
        const QUESTIONS = [
            {
                situation: '1. Du står foran din låste dør og kan ikke finde dine nøgler. Hvad siger du?',
                sentence: '"Jeg kan ikke komme ind, for jeg ___ mine nøgler!"',
                options: [
                    { text: 'har tabt (Førnutid – resultat nu)', tense: 'foernutid', correct: true },
                    { text: 'tabte (Datid – fortid)', tense: 'datid', correct: false }
                ],
                explain: 'Du står ved døren LIGE NU uden nøgler → Førnutid (har tabt).'
            },
            {
                situation: '2. Du arbejder i et bageri og vil spørge kunden høfligt:',
                sentence: '"Værsgo, her er rugbrødet. ___ der andet?"',
                options: [
                    { text: 'Er (Nutid – meget direkte)', tense: 'nutid', correct: false },
                    { text: 'Var (Datid – høflig form)', tense: 'datid', correct: true }
                ],
                explain: 'På dansk bruger vi datid ("Var der andet? / Hvad ville du have?") for at være høflige.'
            },
            {
                situation: '3. Du fortæller om noget, der skete i går på gaden:',
                sentence: '"Først åbnede han døren, så kiggede han ud, og pludselig ___ han en mand."',
                options: [
                    { text: 'har set (Førnutid)', tense: 'foernutid', correct: false },
                    { text: 'så (Datid – historie i fortiden)', tense: 'datid', correct: true }
                ],
                explain: 'Når du fortæller en historie i fortiden ("Først..., så..."), bruger du Datid (så).'
            },
            {
                situation: '4. En kollega spørger, om du vil have kaffe. Du er ikke tørstig og siger nej tak:',
                sentence: '"Nej tak, jeg ___ kaffe!"',
                options: [
                    { text: 'har drukket (Førnutid – resultat nu)', tense: 'foernutid', correct: true },
                    { text: 'drak (Datid)', tense: 'datid', correct: false }
                ],
                explain: 'Det betyder: "Jeg behøver ikke kaffe lige nu" → Førnutid (har drukket).'
            },
            {
                situation: '5. Du kom for sent til toget i morges:',
                sentence: '"Da jeg kom ned på perronen, ___ toget."',
                options: [
                    { text: 'er kørt (Førnutid)', tense: 'foernutid', correct: false },
                    { text: 'var kørt (Førdatid – sket før jeg kom)', tense: 'foerdatid', correct: true }
                ],
                explain: 'Toget kørte FØR du kom derhen i morges → Førdatid (var kørt).'
            },
            {
                situation: '6. Du kigger ud ad vinduet lige nu:',
                sentence: '"Se! Naboen ___ sin nye bil ude på vejen."',
                options: [
                    { text: 'vasker (Nutid – sker lige nu)', tense: 'nutid', correct: true },
                    { text: 'har vasket (Førnutid – færdig)', tense: 'foernutid', correct: false }
                ],
                explain: '"Se!" viser, at han er i gang lige nu → Nutid (vasker).'
            }
        ];

        let activeDiagramTense = 'foernutid';
        const answers = {};

        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vt4-card">
                    <div style="font-size:0.76rem; font-weight:900; color:#fde68a; text-transform:uppercase; margin-bottom:0.4rem;">
                        Live-Diagram • Når du svarer på en situation herunder, lyser den valgte tids linje op:
                    </div>
                    ${renderStatic4LinesSvg(activeDiagramTense)}
                </div>

                <div style="display:flex; flex-direction:column; gap:1rem;">
                    ${QUESTIONS.map((q, idx) => {
                        const ans = answers[idx];
                        return `
                            <div class="vt4-card" style="margin-bottom:0;">
                                <div style="font-size:0.82rem; font-weight:800; color:#fde68a; margin-bottom:0.25rem;">${q.situation}</div>
                                <div style="font-size:1.18rem; font-weight:900; color:#ffffff; margin-bottom:0.85rem;">${q.sentence}</div>
                                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.65rem;">
                                    ${q.options.map((opt, oIdx) => {
                                        let cls = 'vt4-opt-btn';
                                        if (ans !== undefined) {
                                            if (opt.correct) cls += ' correct';
                                            else if (ans === oIdx) cls += ' wrong';
                                        }
                                        return `<button class="${cls}" data-q="${idx}" data-o="${oIdx}" data-t="${opt.tense}">${opt.text}</button>`;
                                    }).join('')}
                                </div>
                                ${ans !== undefined ? `
                                    <div style="margin-top:0.8rem; padding:0.75rem 1rem; border-radius:10px; background:rgba(15,23,42,0.85); border-left:4px solid ${q.options[ans].correct ? '#4ade80' : '#f87171'}; font-size:0.88rem; color:#e2e8f0;">
                                        ${q.explain}
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-q]').forEach(btn => {
                btn.onclick = () => {
                    const qIdx = Number(btn.dataset.q);
                    const oIdx = Number(btn.dataset.o);
                    answers[qIdx] = oIdx;
                    activeDiagramTense = btn.dataset.t;
                    draw();
                };
            });
            const vToggle = wrap.querySelector('#vt4-toggle-vmode');
            if (vToggle) {
                vToggle.onclick = () => {
                    diagramVisualMode = diagramVisualMode === 'lines' ? 'scenes' : 'lines';
                    draw();
                };
            }
            wrap.querySelectorAll('[data-tense-click]').forEach(el => {
                el.onclick = () => {
                    activeDiagramTense = el.dataset.tenseClick;
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 3: TRÆNINGSBANE 2 – SPORHUNDS-DETEKTIVEN
    // =========================================================================
    function renderTabSporhunde(parent) {
        const ITEMS = [
            {
                sent: 'Jeg ___ en ny cykel i går.',
                clue: 'i går',
                clueType: 'Fortid (afsluttet)',
                opts: ['købte (Datid)', 'har købt (Førnutid)'],
                correct: 0,
                tense: 'datid',
                note: '"I går" er helt forbi → Brug Datid (købte).'
            },
            {
                sent: 'Jeg ___ allerede tre kopper kaffe i dag.',
                clue: 'allerede ... i dag',
                clueType: 'Op til nu (i dag er ikke slut)',
                opts: ['drak (Datid)', 'har drukket (Førnutid)'],
                correct: 1,
                tense: 'foernutid',
                note: '"Allerede" og "i dag" tæller op til lige nu → Brug Førnutid (har drukket).'
            },
            {
                sent: 'Familien ___ til Odense i 1998.',
                clue: 'i 1998',
                clueType: 'Fast årstal i fortiden',
                opts: ['flyttede (Datid)', 'er flyttet (Førnutid)'],
                correct: 0,
                tense: 'datid',
                note: '"I 1998" er fortid → Brug Datid (flyttede).'
            },
            {
                sent: 'Bussen ___ lige for et øjeblik siden.',
                clue: 'lige',
                clueType: 'Sket lige nu',
                opts: ['kørte (Datid)', 'er lige kørt (Førnutid)'],
                correct: 1,
                tense: 'foernutid',
                note: '"Er lige kørt" viser resultatet her og nu (bussen er væk).'
            },
            {
                sent: 'Da jeg var barn, ___ vi altid ved stranden.',
                clue: 'Da jeg var barn',
                clueType: 'Afsluttet tid i fortiden',
                opts: ['badede (Datid)', 'har badet (Førnutid)'],
                correct: 0,
                tense: 'datid',
                note: '"Da jeg var barn" er slut (du er voksen nu) → Brug Datid (badede).'
            },
            {
                sent: 'Jeg ___ aldrig i Japan, men jeg vil gerne derhen.',
                clue: 'aldrig (indtil nu)',
                clueType: 'Hele livet indtil i dag',
                opts: ['var (Datid)', 'har aldrig været (Førnutid)'],
                correct: 1,
                tense: 'foernutid',
                note: '"Aldrig" handler om dit liv indtil i dag → Brug Førnutid (har været).'
            }
        ];

        let activeTense = 'datid';
        const picked = {};

        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vt4-card">
                    <div style="font-size:0.76rem; font-weight:900; color:#38bdf8; text-transform:uppercase; margin-bottom:0.4rem;">
                        Sporhunds-Radar • Kig på sporhunden (det fremhævede tidsord) og vælg den rigtige tid:
                    </div>
                    ${renderStatic4LinesSvg(activeTense)}
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:1rem;">
                    ${ITEMS.map((it, idx) => {
                        const p = picked[idx];
                        return `
                            <div class="vt4-card" style="margin-bottom:0;">
                                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.45rem;">
                                    <span style="background:rgba(251,191,36,0.18); border:1px solid #fbbf24; color:#fde68a; padding:0.2rem 0.6rem; border-radius:7px; font-size:0.76rem; font-weight:900;">
                                        🔍 Tidsord: "${it.clue}"
                                    </span>
                                    <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">${it.clueType}</span>
                                </div>
                                <div style="font-size:1.12rem; font-weight:900; color:#ffffff; margin-bottom:0.75rem;">"${it.sent}"</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.55rem;">
                                    ${it.opts.map((o, oIdx) => {
                                        let cls = 'vt4-opt-btn';
                                        if (p !== undefined) {
                                            if (oIdx === it.correct) cls += ' correct';
                                            else if (p === oIdx) cls += ' wrong';
                                        }
                                        return `<button class="${cls}" data-sp="${idx}" data-so="${oIdx}">${o}</button>`;
                                    }).join('')}
                                </div>
                                ${p !== undefined ? `<div style="margin-top:0.65rem; font-size:0.84rem; color:#cbd5e1;">${it.note}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            wrap.querySelectorAll('[data-sp]').forEach(b => {
                b.onclick = () => {
                    const idx = Number(b.dataset.sp);
                    picked[idx] = Number(b.dataset.so);
                    activeTense = ITEMS[idx].tense;
                    draw();
                };
            });
        }

        draw();
    }

    // =========================================================================
    // FANE 4: DEN AFSLØRENDE KONTRAST & SÆTNINGSBYGGER
    // =========================================================================
    function renderTabDuel(parent) {
        const DUELS = [
            {
                prompt: '1. Hvilken sætning betyder, at Helle STADIG bor i København i dag?',
                opts: [
                    { text: '"Helle boede i København i 10 år."', ok: false, why: 'Datid = Det er slut (hun bor der ikke mere).' },
                    { text: '"Helle har boet i København i 10 år."', ok: true, why: 'Rigtigt! Førnutid ("har boet") betyder, at hun stadig bor der i dag.' }
                ]
            },
            {
                prompt: '2. Hvilken sætning betyder, at manden mangler sine briller LIGE NU?',
                opts: [
                    { text: '"Han har tabt sine briller."', ok: true, why: 'Rigtigt! Førnutid viser problemet lige nu.' },
                    { text: '"Han tabte sine briller."', ok: false, why: 'Datid fortæller kun om dengang (måske fandt han dem igen).' }
                ]
            },
            {
                prompt: '3. Hvilken sætning lyder mest HØFLIG i en butik?',
                opts: [
                    { text: '"Hvad vil du have?"', ok: false, why: 'Nutid lyder her meget direkte og lidt hårdt.' },
                    { text: '"Hvad ville du have? / Var der andet?"', ok: true, why: 'Rigtigt! Datid bruges ofte til at spørge høfligt.' }
                ]
            },
            {
                prompt: '4. Hvilken sætning betyder, at han allerede var VÆK, da jeg kom?',
                opts: [
                    { text: '"Da jeg kom, gik han."', ok: false, why: 'Her gik han i samme øjeblik, som jeg kom.' },
                    { text: '"Da jeg kom, var han gået."', ok: true, why: 'Rigtigt! Førdatid ("var gået") betyder, at han gik FØR jeg kom.' }
                ]
            }
        ];

        const chosen = {};
        const wrap = document.createElement('div');
        parent.appendChild(wrap);

        function draw() {
            wrap.innerHTML = `
                <div class="vt4-card">
                    <span style="font-size:0.76rem; font-weight:900; color:#4ade80; text-transform:uppercase;">Den Afslørende Kontrast • 4 Minimale Par-Dueller</span>
                    <h2 style="margin:0.2rem 0 1rem; font-size:1.35rem; font-weight:900;">Vælg den sætning, der passer til virkeligheden</h2>
                    <div style="display:flex; flex-direction:column; gap:0.9rem;">
                        ${DUELS.map((d, i) => {
                            const c = chosen[i];
                            return `
                                <div style="background:rgba(30,41,59,0.7); border:1px solid rgba(148,163,184,0.25); border-radius:14px; padding:1rem;">
                                    <div style="font-weight:900; color:#fde68a; margin-bottom:0.65rem;">${d.prompt}</div>
                                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem;">
                                        ${d.opts.map((o, oIdx) => {
                                            let cls = 'vt4-opt-btn';
                                            if (c !== undefined) {
                                                if (o.ok) cls += ' correct';
                                                else if (c === oIdx) cls += ' wrong';
                                            }
                                            return `<button class="${cls}" data-di="${i}" data-do="${oIdx}">${o.text}</button>`;
                                        }).join('')}
                                    </div>
                                    ${c !== undefined ? `<div style="margin-top:0.6rem; font-size:0.86rem; color:#e2e8f0;">${d.opts[c].why}</div>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;

            wrap.querySelectorAll('[data-di]').forEach(b => {
                b.onclick = () => {
                    chosen[Number(b.dataset.di)] = Number(b.dataset.do);
                    draw();
                };
            });
        }

        draw();
    }

    switchTab(currentTab);
    container.appendChild(viewContainer);
}
