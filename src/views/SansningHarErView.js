import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { renderVerberHarErView } from './VerberHarErView.js';

/**
 * SansningHarErView - Station 3: Aktivitet vs. Tilstandsskift (Har vs. Er i førnutid)
 * Diktomisk Split-Stage Vrimlebillede (som i adjektiver_kvalitet/tab_kontrast):
 * 
 *  🟠 VENSTRE SIDE: MOTOREN (Har) — Aktiviteten i gang (Forvandling / Arbejde)
 *  🔵 HØJRE SIDE: DØREN / SKIFTET (Er) — Ny tilstand og flyttet grænse (Stilstand / Resultat)
 * 
 * Bevarer 100% af det oprindelige VerberHarErView i Fane 3.
 */
export function renderSansningHarErView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    let activeItemKey = 'cykel';
    let isPureMode = false;

    const contrastPairs = [
        {
            key: 'cykel',
            title: 'Cyklisten (I skoven vs. På arbejde)',
            icon: '🚴',
            left: {
                x: 35,
                y: 65,
                word: 'har cyklet',
                sent: 'Hun har cyklet i skoven i 2 timer.',
                exp: 'Motoren i benene kørte rundt i cirkler. Ren fysisk aktivitet uden skift fra A til B.'
            },
            right: {
                x: 35,
                y: 65,
                word: 'er cyklet',
                sent: 'Hun er cyklet på arbejde.',
                exp: 'Hun krydsede bygrænsen og flyttede sin fysiske position fra hjemmet til kontoret.'
            },
            aha: 'Cyklet rundt på stien = HAR (motoren kører). Cyklet hen til et nyt sted = ER (skift af sted).'
        },
        {
            key: 'maler',
            title: 'Malerne & Huset',
            icon: '🎨',
            left: {
                x: 75,
                y: 35,
                word: 'har malet',
                sent: 'Malerne har malet facaden i dag.',
                exp: 'Fokus på håndværkerne og deres arbejde med pensler og malerspande.'
            },
            right: {
                x: 75,
                y: 35,
                word: 'er malet',
                sent: 'Huset er malet nu.',
                exp: 'Arbejdet er fuldført, og huset står i en ny, flot tilstand.'
            },
            aha: 'Handlingen der udføres = HAR malet. Den nye egenskab ved tingen = ER malet.'
        },
        {
            key: 'tog',
            title: 'Toget ved stationen',
            icon: '🚆',
            left: {
                x: 52,
                y: 50,
                word: 'har kørt',
                sent: 'Toget har kørt 120 km/t.',
                exp: 'Fokus på togets motorkraft og fart igennem landskabet.'
            },
            right: {
                x: 52,
                y: 50,
                word: 'er kørt',
                sent: 'Toget er kørt fra perronen.',
                exp: 'Perronen er nu tom! Toget har forladt stedet og er ikke længere til stede.'
            },
            aha: 'Har kørt stærkt = motoren. Er kørt = toget er væk fra perronen.'
        },
        {
            key: 'kage',
            title: 'Bageriet & Kagen',
            icon: '🥐',
            left: {
                x: 20,
                y: 40,
                word: 'har bagt',
                sent: 'Bageren har bagt kanelsnegle i morges.',
                exp: 'Mennesket der æltede dejen og arbejdede ved den varme ovn.'
            },
            right: {
                x: 20,
                y: 40,
                word: 'er bagt',
                sent: 'Kagen er bagt og klar til kaffen.',
                exp: 'Kagen er færdig forvandlet og står som et sprødt resultat.'
            },
            aha: 'Bageren HAR bagt (aktivitet) -> Kagen ER bagt (tilstand/resultat).'
        },
        {
            key: 'blomst',
            title: 'Blomsterne i krukken',
            icon: '🌸',
            left: {
                x: 82,
                y: 65,
                word: 'har vandet',
                sent: 'Gartneren har vandet blomsterne.',
                exp: 'Den aktive pleje og handling udført af gartneren.'
            },
            right: {
                x: 82,
                y: 65,
                word: 'er sprunget ud',
                sent: 'Blomsterne er sprunget ud i fuldt flor.',
                exp: 'Blomsterne gennemgik den biologiske forvandling til en ny tilstand.'
            },
            aha: 'Aktiv handling (har vandet) vs. biologisk tilstandsændring (er sprunget ud).'
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Mads er ikke på kontoret længere. Han ... gået hjem.',
            options: ['har', 'er'],
            correct: 'er',
            expl: 'Han har flyttet sig fra kontoret til hjemmet — et stedskift.'
        },
        {
            prompt: 'Vi trænede i fitness i dag. Vi ... svømmet 1000 meter.',
            options: ['har', 'er'],
            correct: 'har',
            expl: 'Svømning frem og tilbage i bassinet er en ren fysisk aktivitet.'
        },
        {
            prompt: 'Maden dufter fantastisk! Mor ... lavet lasagne.',
            options: ['har', 'er'],
            correct: 'har',
            expl: 'Mor er motoren, der udførte madlavningen.'
        },
        {
            prompt: 'Vinteren er slut, og sneen på plænen ... smeltet.',
            options: ['har', 'er'],
            correct: 'er',
            expl: 'Sneen gennemgik en forvandling fra fast form til vand — tilstandsændring!'
        }
    ];

    const style = document.createElement('style');
    style.textContent = `
        .sansning-station-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.25rem 5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .ss-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        .ss-back-btn {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            color: #f8fafc;
            padding: 0.55rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .ss-back-btn:hover {
            border-color: #10b981;
            background: rgba(30, 41, 59, 0.9);
            transform: translateX(-2px);
        }

        .ss-station-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(16, 185, 129, 0.45);
            border-radius: 999px;
            padding: 0.35rem 0.85rem;
            font-size: 0.8rem;
            font-weight: 800;
            color: #6ee7b7;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .ss-hero {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .ss-hero h1 {
            font-size: 2.2rem;
            font-weight: 900;
            margin: 0 0 0.4rem;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #10b981 20%, #ffffff 60%, #38bdf8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .ss-hero p {
            color: #cbd5e1;
            font-size: 1.02rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.5;
        }

        .ss-tabs-nav {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1.8rem;
            background: rgba(15, 23, 42, 0.8);
            border: 1.5px solid rgba(148, 163, 184, 0.22);
            padding: 0.45rem;
            border-radius: 16px;
        }
        .ss-tab-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.6rem 1.15rem;
            border-radius: 12px;
            font-size: 0.88rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
        }
        .ss-tab-btn:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.06);
        }
        .ss-tab-btn.active {
            background: linear-gradient(135deg, #059669, #047857);
            color: #ffffff;
            box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
        }

        .ss-tab-panel {
            display: none;
            animation: fadeIn 0.25s ease;
        }
        .ss-tab-panel.active {
            display: block;
        }

        /* Diktomisk Split-Stage */
        .contrast-canvas-card {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(9, 14, 28, 0.98));
            border: 1.5px solid rgba(16, 185, 129, 0.35);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
            margin-bottom: 1.5rem;
        }
        .contrast-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1.25rem;
            background: rgba(15, 23, 42, 0.9);
            border-bottom: 1px solid rgba(148, 163, 184, 0.18);
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        .contrast-instruction {
            color: #cbd5e1;
            font-size: 0.88rem;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .pure-toggle-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.25);
            color: #cbd5e1;
            padding: 0.4rem 0.85rem;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-toggle-btn:hover {
            border-color: #10b981;
            color: #ffffff;
        }
        .pure-toggle-btn.active {
            background: rgba(16, 185, 129, 0.3);
            border-color: #10b981;
            color: #6ee7b7;
        }

        .contrast-split-stage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
            background: #090d16;
            position: relative;
        }
        @media (max-width: 820px) {
            .contrast-split-stage {
                grid-template-columns: 1fr;
            }
        }

        .stage-half {
            position: relative;
            overflow: hidden;
            background: #090d16;
            line-height: 0;
        }
        .stage-half-header {
            position: absolute;
            top: 12px;
            left: 12px;
            z-index: 10;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(8px);
            padding: 0.4rem 0.9rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            line-height: 1.4;
        }
        .stage-half-header.warm {
            color: #fed7aa;
            border: 1.5px solid rgba(251, 146, 60, 0.6);
            background: rgba(154, 52, 18, 0.85);
        }
        .stage-half-header.cool {
            color: #7dd3fc;
            border: 1.5px solid rgba(56, 189, 248, 0.6);
            background: rgba(12, 74, 110, 0.85);
        }

        .stage-half img,
        .stage-half-img,
        .stage-half svg {
            width: 100%;
            height: auto;
            display: block;
            filter: brightness(0.98);
        }

        .ss-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
            transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 5;
        }
        .stage-half.left-half .ss-hotspot { background: #ea580c; }
        .stage-half.right-half .ss-hotspot { background: #0284c7; }

        .ss-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.22);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            z-index: 8;
        }
        .ss-hotspot.active {
            background: #10b981 !important;
            border-color: #ffffff !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.95);
            z-index: 10;
        }
        .ss-hotspot.partner-active {
            border-color: #fde68a !important;
            transform: translate(-50%, -50%) scale(1.22);
            animation: pulsePartner 1.5s infinite ease-in-out;
            z-index: 9;
        }
        .stage-half.left-half .ss-hotspot.partner-active {
            background: #fb923c !important;
            box-shadow: 0 0 20px rgba(251, 146, 60, 0.9);
        }
        .stage-half.right-half .ss-hotspot.partner-active {
            background: #38bdf8 !important;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.9);
        }

        .pure-mode .ss-hotspot {
            display: none !important;
        }

        .ss-hotspots-strip {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.75rem 1.25rem;
            background: rgba(15, 23, 42, 0.8);
            border-top: 1px solid rgba(148, 163, 184, 0.15);
        }
        .ss-strip-btn {
            flex-shrink: 0;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 10px;
            padding: 0.45rem 0.85rem;
            color: #cbd5e1;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .ss-strip-btn:hover {
            border-color: #10b981;
            color: #ffffff;
        }
        .ss-strip-btn.active {
            background: rgba(16, 185, 129, 0.35);
            border-color: #10b981;
            color: #ffffff;
            box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
        }

        .adj-detail-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border-radius: 20px;
            border: 1.5px solid rgba(16, 185, 129, 0.4);
            padding: 1.5rem 1.6rem;
            margin-top: 1.5rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }
        .adj-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.18);
            padding-bottom: 0.8rem;
        }
        .adj-title-group {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .adj-main-word {
            font-size: 1.5rem;
            font-weight: 900;
            color: #ffffff;
        }
        .adj-modpol-pill {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(16, 185, 129, 0.5);
            color: #6ee7b7;
            padding: 0.4rem 0.9rem;
            border-radius: 999px;
            font-size: 0.84rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .adj-modpol-pill:hover {
            background: rgba(16, 185, 129, 0.2);
            border-color: #34d399;
            color: #ffffff;
            transform: scale(1.04);
        }

        .adj-congruence-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.15rem;
        }
        @media (max-width: 768px) {
            .adj-congruence-grid { grid-template-columns: 1fr; }
        }

        .ss-contrast-box {
            border-radius: 14px;
            padding: 1.15rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
        }
        .ss-contrast-box.motoren {
            background: linear-gradient(145deg, rgba(154, 52, 18, 0.25), rgba(15, 23, 42, 0.85));
            border: 1.5px solid rgba(251, 146, 60, 0.45);
        }
        .ss-contrast-box.doeren {
            background: linear-gradient(145deg, rgba(12, 74, 110, 0.25), rgba(15, 23, 42, 0.85));
            border: 1.5px solid rgba(56, 189, 248, 0.45);
        }
        .ss-box-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.76rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.25rem 0.65rem;
            border-radius: 6px;
            width: fit-content;
        }
        .ss-contrast-box.motoren .ss-box-badge {
            background: rgba(251, 146, 60, 0.2);
            color: #fdba74;
        }
        .ss-contrast-box.doeren .ss-box-badge {
            background: rgba(56, 189, 248, 0.2);
            color: #7dd3fc;
        }
        .ss-box-sent-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.6rem;
        }
        .ss-box-sent {
            font-size: 1.1rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.4;
        }
        .ss-box-verb-highlight {
            padding: 0.1rem 0.45rem;
            border-radius: 6px;
        }
        .ss-contrast-box.motoren .ss-box-verb-highlight {
            background: rgba(251, 146, 60, 0.25);
            color: #fb923c;
            border-bottom: 2px solid #fb923c;
        }
        .ss-contrast-box.doeren .ss-box-verb-highlight {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
            border-bottom: 2px solid #38bdf8;
        }
        .ss-tts-audio-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            border-radius: 8px;
            width: 34px;
            height: 34px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.18s ease;
        }
        .ss-tts-audio-btn:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.08);
        }
        .ss-box-exp {
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.5;
        }

        .ss-insp-aha {
            background: rgba(15, 23, 42, 0.7);
            border: 1px dashed rgba(16, 185, 129, 0.45);
            border-radius: 12px;
            padding: 0.85rem 1.15rem;
            font-size: 0.92rem;
            color: #a7f3d0;
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }

        .ss-embedded-wrapper {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.22);
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
    `;
    viewContainer.appendChild(style);

    // 1. Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.innerHTML = (extraData && extraData.from === 'overview') ? `← Tilbage til Sansningsoversigten` : `← Tilbage til Hovedflade 1`;
    backBtn.onclick = () => {
        if (extraData && extraData.from === 'overview') {
            navigateFn('grammatik_sansning');
        } else {
            navigateFn('sansning_flade1');
        }
    };
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.innerHTML = `Station 1.4 • Aktivitet vs. Resultat (Har vs. Er)`;
    topBar.appendChild(badge);

    viewContainer.appendChild(topBar);

    // 2. Hero
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Aktivitet (Har) vs. Tilstandsskift (Er)</h1>
        <p>
            Se modpolerne side om side: 
            <strong>Venstre side</strong> viser motoren der arbejder (<em>"Hun har cyklet i skoven"</em>), 
            mens <strong>højre side</strong> viser det fuldførte skift til et nyt sted eller resultat (<em>"Hun er cyklet på arbejde"</em>).
        </p>
    `;
    viewContainer.appendChild(hero);

    // 3. Tabs
    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="tab_kontrast">
            ⚖️ 1. Diktomisk Vrimlebillede
        </button>
        <button class="ss-tab-btn" data-tab="tab_quiz">
            🎯 2. Træningsbane: Har eller Er?
        </button>
        <button class="ss-tab-btn" data-tab="tab_engine">
            🔬 3. Det Originale Har/Er Værksted
        </button>
    `;
    viewContainer.appendChild(tabsNav);

    const panelsContainer = document.createElement('div');

    // -------------------------------------------------------------
    // TAB 1: DIKTOMISK SPLIT-STAGE
    // -------------------------------------------------------------
    const panelKontrast = document.createElement('div');
    panelKontrast.className = 'ss-tab-panel active';
    panelKontrast.id = 'panel-kontrast';

    panelKontrast.innerHTML = `
        <div class="contrast-canvas-card">
            <div class="contrast-control-bar">
                <div class="contrast-instruction">
                    💡 <em>Klik på et motiv på venstre side (Har) for at se dets modpol på højre side (Er).</em>
                </div>
                <button class="pure-toggle-btn" id="pure-toggle-btn">
                    🖼️ Ren visning: <strong id="pure-status-label">FRA</strong>
                </button>
            </div>

            <div class="contrast-split-stage" id="split-stage">
                <!-- VENSTRE HALVDEL: HAR (MOTOREN / AKTIVITET) -->
                <div class="stage-half left-half">
                    <div class="stage-half-header warm">🟠 MOTOREN (Har) — Aktiviteten i Arbejde</div>
                    <img src="assets/sansning_har_er_venstre.jpg" alt="Har - Motoren og aktiviteten i gang" class="stage-half-img" />
                    <div id="left-hotspots-container"></div>
                </div>

                <!-- HØJRE HALVDEL: ER (DØREN / RESULTATET) -->
                <div class="stage-half right-half">
                    <div class="stage-half-header cool">🔵 DØREN / SKIFTET (Er) — Ny Tilstand / Sted</div>
                    <img src="assets/sansning_har_er_hoejre.jpg" alt="Er - Resultatet og det nye sted" class="stage-half-img" />
                    <div id="right-hotspots-container"></div>
                </div>
            </div>

            <div class="ss-hotspots-strip" id="hotspots-strip"></div>
        </div>

        <div class="adj-detail-card" id="detail-card"></div>
    `;
    panelsContainer.appendChild(panelKontrast);

    // -------------------------------------------------------------
    // TAB 2: QUIZ
    // -------------------------------------------------------------
    const panelQuiz = document.createElement('div');
    panelQuiz.className = 'ss-tab-panel';
    panelQuiz.id = 'panel-quiz';

    let currentQuestionIdx = 0;
    let quizScore = 0;

    function renderQuizTrack() {
        const q = quizQuestions[currentQuestionIdx];
        if (currentQuestionIdx >= quizQuestions.length) {
            panelQuiz.innerHTML = `
                <div class="ss-quiz-card" style="text-align: center;">
                    <span style="font-size: 3rem;">🎉</span>
                    <h2 style="font-size: 1.8rem; margin: 0.5rem 0 1rem; color: #a7f3d0;">
                        Træningsbane Gennemført!
                    </h2>
                    <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore} af ${quizQuestions.length}</strong> rigtige!
                    </p>
                    <button class="ss-back-btn" id="btn-restart-quiz" style="margin: 0 auto; background: #059669;">
                        🔄 Tag træningsbanen igen
                    </button>
                </div>
            `;
            panelQuiz.querySelector('#btn-restart-quiz').onclick = () => {
                currentQuestionIdx = 0;
                quizScore = 0;
                renderQuizTrack();
            };
            return;
        }

        panelQuiz.innerHTML = `
            <div class="ss-quiz-card">
                <div class="ss-quiz-progress">
                    <span>Opgave ${currentQuestionIdx + 1} af ${quizQuestions.length}</span>
                    <span>Score: ${quizScore} rigtige</span>
                </div>
                
                <div class="ss-quiz-question-box">
                    "${q.prompt}"
                </div>

                <div class="ss-quiz-options">
                    <button class="ss-quiz-opt-btn" data-val="har">
                        🟠 har (Motoren i arbejde)
                    </button>
                    <button class="ss-quiz-opt-btn" data-val="er">
                        🔵 er (Tilstandsskift / ny placering)
                    </button>
                </div>

                <div class="ss-quiz-feedback" id="quiz-feedback"></div>

                <button class="ss-quiz-next-btn" id="quiz-next-btn">
                    Næste opgave →
                </button>
            </div>
        `;

        const feedbackBox = panelQuiz.querySelector('#quiz-feedback');
        const nextBtn = panelQuiz.querySelector('#quiz-next-btn');

        panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(btn => {
            btn.onclick = () => {
                panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = btn.getAttribute('data-val') === q.correct;
                if (isCorrect) {
                    quizScore++;
                    btn.classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show correct';
                    feedbackBox.innerHTML = `<strong>Rigtigt!</strong> ${q.expl}`;
                } else {
                    btn.classList.add('wrong');
                    panelQuiz.querySelector(`[data-val="${q.correct}"]`).classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show wrong';
                    feedbackBox.innerHTML = `<strong>Prøv igen:</strong> Det rigtige er <em>"${q.correct}"</em>. ${q.expl}`;
                }
                nextBtn.style.display = 'inline-flex';
            };
        });

        nextBtn.onclick = () => {
            currentQuestionIdx++;
            renderQuizTrack();
        };
    }

    renderQuizTrack();
    panelsContainer.appendChild(panelQuiz);

    // -------------------------------------------------------------
    // TAB 3: DET ORIGINALE HAR/ER VÆRKSTED
    // -------------------------------------------------------------
    const panelEngine = document.createElement('div');
    panelEngine.className = 'ss-tab-panel';
    panelEngine.id = 'panel-engine';

    panelEngine.innerHTML = `
        <div class="ss-embedded-wrapper">
            <div style="text-align: center; margin-bottom: 1.2rem;">
                <span style="font-size: 0.85rem; font-weight: 800; color: #a7f3d0; text-transform: uppercase;">
                    Det Komplette Har/Er Værksted (100% Bevaret)
                </span>
                <h2 style="font-size: 1.6rem; margin: 0.3rem 0; color: #ffffff;">
                    De 3 Stadier: Proces <-> Tilstand <-> Adjektiv
                </h2>
                <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 720px; margin: 0 auto;">
                    Herunder finder du det fulde originale Har/Er modul med Aha-værksted og de 3 træningsbaner.
                </p>
            </div>
            <div id="embedded-harer-mount"></div>
        </div>
    `;

    const harerMount = panelEngine.querySelector('#embedded-harer-mount');
    renderVerberHarErView(harerMount, navigateFn, { isEmbedded: true });

    panelsContainer.appendChild(panelEngine);

    viewContainer.appendChild(panelsContainer);

    // Diktomisk Hotspot Logik
    const leftContainer = panelKontrast.querySelector('#left-hotspots-container');
    const rightContainer = panelKontrast.querySelector('#right-hotspots-container');
    const stripContainer = panelKontrast.querySelector('#hotspots-strip');
    const detailCard = panelKontrast.querySelector('#detail-card');
    const pureBtn = panelKontrast.querySelector('#pure-toggle-btn');
    const splitStage = panelKontrast.querySelector('#split-stage');

    pureBtn.onclick = () => {
        isPureMode = !isPureMode;
        splitStage.classList.toggle('pure-mode', isPureMode);
        pureBtn.classList.toggle('active', isPureMode);
        pureBtn.querySelector('#pure-status-label').textContent = isPureMode ? 'TIL' : 'FRA';
    };

    function selectPair(key, triggerSide = 'left') {
        activeItemKey = key;
        const pair = contrastPairs.find(p => p.key === key);
        if (!pair) return;

        leftContainer.querySelectorAll('.ss-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.key === key) {
                if (triggerSide === 'left') dot.classList.add('active');
                else dot.classList.add('partner-active');
            }
        });

        rightContainer.querySelectorAll('.ss-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.key === key) {
                if (triggerSide === 'right') dot.classList.add('active');
                else dot.classList.add('partner-active');
            }
        });

        stripContainer.querySelectorAll('.ss-strip-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.key === key);
        });

        detailCard.innerHTML = `
            <div class="adj-detail-header">
                <div class="adj-title-group">
                    <span style="font-size: 1.6rem;">${pair.icon}</span>
                    <span class="adj-main-word">${pair.title}</span>
                </div>
                <div class="adj-modpol-pill" id="card-swap-btn" title="Klik for at skifte fokus">
                    <span>${triggerSide === 'left' ? 'Skift til Skiftet' : 'Skift til Motoren'}</span>
                    <strong>${triggerSide === 'left' ? 'er ➔' : 'har ➔'}</strong>
                </div>
            </div>

            <div class="adj-congruence-grid">
                <!-- 🟠 Venstre: Motoren (har) -->
                <div class="ss-contrast-box motoren">
                    <span class="ss-box-badge">🟠 Venstre: Motoren i Arbejde (Har)</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.left.sent.replace(pair.left.word, `<span class="ss-box-verb-highlight">${pair.left.word}</span>`)}
                        </span>
                    </div>
                    <div class="ss-box-exp">${pair.left.exp}</div>
                </div>

                <!-- 🔵 Højre: Døren (er) -->
                <div class="ss-contrast-box doeren">
                    <span class="ss-box-badge">🔵 Højre: Skiftet til Ny Tilstand (Er)</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.right.sent.replace(pair.right.word, `<span class="ss-box-verb-highlight">${pair.right.word}</span>`)}
                        </span>
                    </div>
                    <div class="ss-box-exp">${pair.right.exp}</div>
                </div>
            </div>

            <div class="ss-insp-aha">
                <span style="font-size: 1.3rem;">💡</span>
                <span><strong>Sanse-nøglen:</strong> ${pair.aha}</span>
            </div>
        `;

        detailCard.querySelector('#card-swap-btn').onclick = () => {
            selectPair(key, triggerSide === 'left' ? 'right' : 'left');
        };
    }

    function renderHotspotsUI() {
        leftContainer.innerHTML = '';
        rightContainer.innerHTML = '';
        stripContainer.innerHTML = '';

        contrastPairs.forEach((pair) => {
            const leftDot = document.createElement('button');
            leftDot.className = 'ss-hotspot';
            leftDot.style.left = `${pair.left.x}%`;
            leftDot.style.top = `${pair.left.y}%`;
            leftDot.dataset.key = pair.key;
            leftDot.innerHTML = pair.icon;
            leftDot.title = `${pair.title} (Motoren: ${pair.left.word})`;
            leftDot.onclick = () => selectPair(pair.key, 'left');
            leftContainer.appendChild(leftDot);

            const rightDot = document.createElement('button');
            rightDot.className = 'ss-hotspot';
            rightDot.style.left = `${pair.right.x}%`;
            rightDot.style.top = `${pair.right.y}%`;
            rightDot.dataset.key = pair.key;
            rightDot.innerHTML = pair.icon;
            rightDot.title = `${pair.title} (Skiftet: ${pair.right.word})`;
            rightDot.onclick = () => selectPair(pair.key, 'right');
            rightContainer.appendChild(rightDot);

            const sBtn = document.createElement('button');
            sBtn.className = 'ss-strip-btn';
            sBtn.dataset.key = pair.key;
            sBtn.innerHTML = `${pair.icon} ${pair.title.split(' ')[0]}`;
            sBtn.onclick = () => selectPair(pair.key, 'left');
            stripContainer.appendChild(sBtn);
        });

        selectPair(activeItemKey, 'left');
    }

    renderHotspotsUI();

    // Tabs switching
    tabsNav.querySelectorAll('.ss-tab-btn').forEach(btn => {
        btn.onclick = () => {
            tabsNav.querySelectorAll('.ss-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            panelsContainer.querySelectorAll('.ss-tab-panel').forEach(p => p.classList.remove('active'));

            if (targetId === 'tab_kontrast') panelKontrast.classList.add('active');
            else if (targetId === 'tab_quiz') panelQuiz.classList.add('active');
            else if (targetId === 'tab_engine') panelEngine.classList.add('active');
        };
    });

    container.appendChild(viewContainer);
}
