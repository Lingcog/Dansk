import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { renderVerberTider4View } from './VerberTider4View.js';
import { renderVerberGrammatikHubView } from './VerberGrammatikHubView.js';

/**
 * SansningVerberTiderView - Station 2: Tidens Sansning & Verbernes Tider
 * Diktomisk Split-Stage Vrimlebillede (som i adjektiver_kvalitet/tab_kontrast):
 * 
 *  🔵 VENSTRE SIDE: HAVDE VÆRET (Stabil tilstand i fortid / Stilstand)
 *  🟠 HØJRE SIDE: VAR BLEVET (Selve omslaget og forvandlingen / Tilblivelse)
 * 
 * Bevarer 100% af de oprindelige moduler (VerberTider4 & VerberGrammatikHub) i Fane 3.
 */
export function renderSansningVerberTiderView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    let activeItemKey = 'vejr_bil';
    let isPureMode = false;

    const contrastPairs = [
        {
            key: 'vejr_bil',
            title: 'Vejret & Bilen i Indkørslen',
            icon: '🚗',
            left: {
                x: 35,
                y: 65,
                word: 'havde været koldt',
                sent: 'Vejret havde været koldt i et stykke tid, da bilen pludselig kørte ind i indkørslen.',
                exp: 'Frostluften lå uforandret og fastfrosset som en stabil baggrundskulisse, før bilen ankom.'
            },
            right: {
                x: 35,
                y: 65,
                word: 'var blevet koldt',
                sent: 'Vejret var blevet koldt, da bilen pludselig kørte ind i indkørslen.',
                exp: 'Selve kuldeomslaget indtraf i det præcise øjeblik og ramte dem som et chok.'
            },
            aha: 'Havde været koldt = stabil baggrund i ro. Var blevet koldt = selve temperaturskiftet der skete.'
        },
        {
            key: 'billygter',
            title: 'Bilens Lygter',
            icon: '💡',
            left: {
                x: 22,
                y: 54,
                word: 'havde lyst',
                sent: 'Lygterne havde lyst i flere timer på motorvejen.',
                exp: 'En ubrudt, vedvarende tilstand på hele turen frem til huset.'
            },
            right: {
                x: 22,
                y: 54,
                word: 'var blevet tændt',
                sent: 'Lygterne var blevet tændt, netop da mørket faldt på.',
                exp: 'Kontakten blev drejet, og pærerne skiftede fra slukket til tændt (forvandlingen).'
            },
            aha: 'Havde lyst = stabil tilstand. Var blevet tændt = selve tændingen/skiftet.'
        },
        {
            key: 'teen',
            title: 'Teen på spisebordet',
            icon: '🫖',
            left: {
                x: 75,
                y: 60,
                word: 'havde været kold',
                sent: 'Teen havde været kold længe, da de satte sig ved bordet.',
                exp: 'Den stod ubevægelig og kold i koppen længe før aftensmaden.'
            },
            right: {
                x: 75,
                y: 60,
                word: 'var blevet kold',
                sent: 'Teen var blevet kold, fordi havedøren pludselig blæste op.',
                exp: 'Vintervinden strømmede ind og forårsagede afkølingen.'
            },
            aha: 'Havde været kold = tingen var kold. Var blevet kold = processen der kølede den ned.'
        },
        {
            key: 'sneen',
            title: 'Sneen på taget og stien',
            icon: '❄️',
            left: {
                x: 65,
                y: 28,
                word: 'havde ligget',
                sent: 'Sneen havde ligget urørt på taget i en hel uge.',
                exp: 'Det frosne vinterlandskab lå i total hvile.'
            },
            right: {
                x: 65,
                y: 28,
                word: 'var blevet ryddet',
                sent: 'Sneen var blevet ryddet af vejen, inden gæsterne kom.',
                exp: 'Skovlens arbejde forvandlede indkørslen fra lukket til fri.'
            },
            aha: 'Havde ligget = tingens hvile. Var blevet ryddet = den aktive forvandling.'
        },
        {
            key: 'chauffoer',
            title: 'Mads bag bilens rat',
            icon: '🧑‍✈️',
            left: {
                x: 45,
                y: 48,
                word: 'havde ventet',
                sent: 'Mads havde ventet tålmodigt på, at porten åbnede.',
                exp: 'Han sad stille i sædet i en stabil venteposition.'
            },
            right: {
                x: 45,
                y: 48,
                word: 'var blevet træt',
                sent: 'Mads var blevet træt af at køre gennem snestormen.',
                exp: 'Trætheden havde overmandet hans krop undervejs (tilstandsskift).'
            },
            aha: 'Havde ventet = vedvarende handling. Var blevet træt = et indre skift i kroppen.'
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Gæsterne ankom kl. 18. Middagen ... færdig i over 20 minutter forinden.',
            options: ['havde været', 'var blevet'],
            correct: 'havde været',
            expl: 'Maden stod allerede klar og ventede i ro — en stabil tilstand i fortiden.'
        },
        {
            prompt: 'Vinduet stod åbent hele natten, og vandrørene ... frosne til is.',
            options: ['havde været', 'var blevet'],
            correct: 'var blevet',
            expl: 'Kulden gennemførte en forvandling af vandet til is (en tilstandsændring).'
        },
        {
            prompt: 'Da han endelig ringede, ... vi bekymrede i flere timer.',
            options: ['havde været', 'var blevet'],
            correct: 'havde været',
            expl: 'Bekymringen lå som en vedvarende tilstand i sindet over tid.'
        },
        {
            prompt: 'Da nyheden kom i radioen, ... stemningen i rummet pludselig trykket.',
            options: ['havde været', 'var blevet'],
            correct: 'var blevet',
            expl: 'Nyheden udløste et øjeblikkeligt omslag i stemningen.'
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
            border-color: #f59e0b;
            background: rgba(30, 41, 59, 0.9);
            transform: translateX(-2px);
        }

        .ss-station-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid rgba(245, 158, 11, 0.45);
            border-radius: 999px;
            padding: 0.35rem 0.85rem;
            font-size: 0.8rem;
            font-weight: 800;
            color: #fde68a;
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
            background: linear-gradient(135deg, #f59e0b 20%, #ffffff 60%, #38bdf8 100%);
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
            background: linear-gradient(135deg, #d97706, #b45309);
            color: #ffffff;
            box-shadow: 0 0 16px rgba(217, 119, 6, 0.4);
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
            border: 1.5px solid rgba(245, 158, 11, 0.35);
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
            border-color: #f59e0b;
            color: #ffffff;
        }
        .pure-toggle-btn.active {
            background: rgba(217, 119, 6, 0.3);
            border-color: #f59e0b;
            color: #fde68a;
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
        .stage-half-header.cool {
            color: #7dd3fc;
            border: 1.5px solid rgba(56, 189, 248, 0.6);
            background: rgba(12, 74, 110, 0.85);
        }
        .stage-half-header.warm {
            color: #fed7aa;
            border: 1.5px solid rgba(245, 158, 11, 0.6);
            background: rgba(180, 83, 9, 0.85);
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
        .stage-half.left-half .ss-hotspot {
            background: #0284c7;
        }
        .stage-half.right-half .ss-hotspot {
            background: #d97706;
        }

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
            background: #38bdf8 !important;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.9);
        }
        .stage-half.right-half .ss-hotspot.partner-active {
            background: #fbbf24 !important;
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.9);
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
            border-color: #f59e0b;
            color: #ffffff;
        }
        .ss-strip-btn.active {
            background: rgba(217, 119, 6, 0.35);
            border-color: #f59e0b;
            color: #ffffff;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
        }

        /* Detail Inspector Card */
        .adj-detail-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border-radius: 20px;
            border: 1.5px solid rgba(245, 158, 11, 0.4);
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
            border: 1.5px solid rgba(245, 158, 11, 0.5);
            color: #fde68a;
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
            background: rgba(245, 158, 11, 0.2);
            border-color: #fbbf24;
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
        .ss-contrast-box.tilstand {
            background: linear-gradient(145deg, rgba(12, 74, 110, 0.25), rgba(15, 23, 42, 0.85));
            border: 1.5px solid rgba(56, 189, 248, 0.45);
        }
        .ss-contrast-box.forvandling {
            background: linear-gradient(145deg, rgba(180, 83, 9, 0.25), rgba(15, 23, 42, 0.85));
            border: 1.5px solid rgba(245, 158, 11, 0.45);
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
        .ss-contrast-box.tilstand .ss-box-badge {
            background: rgba(56, 189, 248, 0.2);
            color: #7dd3fc;
        }
        .ss-contrast-box.forvandling .ss-box-badge {
            background: rgba(245, 158, 11, 0.2);
            color: #fde68a;
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
        .ss-contrast-box.tilstand .ss-box-verb-highlight {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
            border-bottom: 2px solid #38bdf8;
        }
        .ss-contrast-box.forvandling .ss-box-verb-highlight {
            background: rgba(245, 158, 11, 0.25);
            color: #fbbf24;
            border-bottom: 2px solid #fbbf24;
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
            border: 1px dashed rgba(245, 158, 11, 0.45);
            border-radius: 12px;
            padding: 0.85rem 1.15rem;
            font-size: 0.92rem;
            color: #fde68a;
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
        .ss-embedded-subnav {
            display: flex;
            gap: 0.6rem;
            margin-bottom: 1.2rem;
            justify-content: center;
            flex-wrap: wrap;
        }
    `;
    viewContainer.appendChild(style);

    // 1. Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.innerHTML = `← Tilbage til Sansningsoversigten`;
    backBtn.onclick = () => navigateFn('grammatik_sansning');
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.innerHTML = `Station 2 • Tidens Sansning`;
    topBar.appendChild(badge);

    viewContainer.appendChild(topBar);

    // 2. Hero
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Tidens Sansning: "Havde været" vs. "Var blevet"</h1>
        <p>
            Oplev tidernes kontrast side om side: 
            <strong>Venstre side</strong> viser tilstanden der herskede i ro (<em>"Vejret havde været koldt i et stykke tid"</em>), 
            mens <strong>højre side</strong> viser selve forvandlingen da bilen kørte ind (<em>"Vejret var blevet koldt"</em>).
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
            🎯 2. Træningsbane: Havde været vs. Var blevet
        </button>
        <button class="ss-tab-btn" data-tab="tab_engine">
            🔬 3. Det Store Tidslinje-Værksted (Originale Flader)
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
                    💡 <em>Klik på et motiv på venstre side (Havde været) for at se dets spejlbillede på højre side (Var blevet).</em>
                </div>
                <button class="pure-toggle-btn" id="pure-toggle-btn">
                    🖼️ Ren visning: <strong id="pure-status-label">FRA</strong>
                </button>
            </div>

            <div class="contrast-split-stage" id="split-stage">
                <!-- VENSTRE HALVDEL: HAVDE VÆRET (STILSTAND I FORTID) -->
                <div class="stage-half left-half">
                    <div class="stage-half-header cool">🔵 HAVDE VÆRET (Uforandret Fortid i Ro)</div>
                    <img src="assets/sansning_verber_tider_venstre.jpg" alt="Vinterhuset og bilen i stabil kulde (havde været)" class="stage-half-img" />
                    <div id="left-hotspots-container"></div>
                </div>

                <!-- HØJRE HALVDEL: VAR BLEVET (FORVANDLINGEN DER INDTRÆFFER) -->
                <div class="stage-half right-half">
                    <div class="stage-half-header warm">🟠 VAR BLEVET (Selve Forvandlingen/Omslaget)</div>
                    <img src="assets/sansning_verber_tider_hoejre.jpg" alt="Vejret skifter og kulden sætter ind da bilen ankommer (var blevet)" class="stage-half-img" />
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
                    <h2 style="font-size: 1.8rem; margin: 0.5rem 0 1rem; color: #fde68a;">
                        Træningsbane Gennemført!
                    </h2>
                    <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore} af ${quizQuestions.length}</strong> rigtige!
                    </p>
                    <button class="ss-back-btn" id="btn-restart-quiz" style="margin: 0 auto; background: #d97706;">
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
                    <button class="ss-quiz-opt-btn" data-val="havde været">
                        🔵 havde været (Stabil tilstand i fortid)
                    </button>
                    <button class="ss-quiz-opt-btn" data-val="var blevet">
                        🟠 var blevet (Selve forvandlingen/omslaget)
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
                    feedbackBox.innerHTML = `<strong>Fremragende!</strong> ${q.expl}`;
                } else {
                    btn.classList.add('wrong');
                    panelQuiz.querySelector(`[data-val="${q.correct}"]`).classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show wrong';
                    feedbackBox.innerHTML = `<strong>Prøv at mærke forskellen:</strong> Det rigtige er <em>"${q.correct}"</em>. ${q.expl}`;
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
    // TAB 3: DET STORE TIDSLINJE-VÆRKSTED (EKSISTERENDE MODULER)
    // -------------------------------------------------------------
    const panelEngine = document.createElement('div');
    panelEngine.className = 'ss-tab-panel';
    panelEngine.id = 'panel-engine';

    panelEngine.innerHTML = `
        <div class="ss-embedded-wrapper">
            <div style="text-align: center; margin-bottom: 1.2rem;">
                <span style="font-size: 0.85rem; font-weight: 800; color: #fde68a; text-transform: uppercase;">
                    Det Komplette Grammatik-Værksted (100% Bevaret)
                </span>
                <h2 style="font-size: 1.6rem; margin: 0.3rem 0; color: #ffffff;">
                    De 4 Tider & Interaktive Tidslinjer
                </h2>
                <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 720px; margin: 0 auto;">
                    Herunder finder du alle vores detaljerede diagrammer, sporhunde-øvelser og kameravinkler.
                </p>
            </div>
            
            <div class="ss-embedded-subnav">
                <button class="ss-strip-btn active" id="btn-sub-tider4">
                    ⏱️ De 4 Tider (Nutid, Datid, Førnutid, Førdatid)
                </button>
                <button class="ss-strip-btn" id="btn-sub-hub">
                    🎛️ Verber Grammatik-Hub (Statisk linje vs. Animerede scener)
                </button>
            </div>

            <div id="embedded-module-mount"></div>
        </div>
    `;

    const moduleMount = panelEngine.querySelector('#embedded-module-mount');

    function mountSubModule(mode) {
        moduleMount.innerHTML = '';
        if (mode === 'tider4') {
            renderVerberTider4View(moduleMount, navigateFn, { isEmbedded: true });
        } else {
            renderVerberGrammatikHubView(moduleMount, navigateFn, { isEmbedded: true });
        }
    }

    panelEngine.querySelector('#btn-sub-tider4').onclick = (e) => {
        panelEngine.querySelectorAll('.ss-embedded-subnav .ss-strip-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        mountSubModule('tider4');
    };
    panelEngine.querySelector('#btn-sub-hub').onclick = (e) => {
        panelEngine.querySelectorAll('.ss-embedded-subnav .ss-strip-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        mountSubModule('hub');
    };

    mountSubModule('tider4');
    panelsContainer.appendChild(panelEngine);

    viewContainer.appendChild(panelsContainer);

    // -------------------------------------------------------------
    // Diktomisk Hotspot & Modpol-logik
    // -------------------------------------------------------------
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
                    <span>${triggerSide === 'left' ? 'Skift til Forvandling' : 'Skift til Tilstand'}</span>
                    <strong>${triggerSide === 'left' ? 'var blevet ➔' : 'havde været ➔'}</strong>
                </div>
            </div>

            <div class="adj-congruence-grid">
                <!-- 🔵 Venstre Halvdel: Hadde været (Stabil fortid) -->
                <div class="ss-contrast-box tilstand">
                    <span class="ss-box-badge">🔵 Venstre: Uforandret Tilstand i Ro</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.left.sent.replace('havde været', '<span class="ss-box-verb-highlight">havde været</span>')}
                        </span>
                    </div>
                    <div class="ss-box-exp">${pair.left.exp}</div>
                </div>

                <!-- 🟠 Højre Halvdel: Var blevet (Omslaget) -->
                <div class="ss-contrast-box forvandling">
                    <span class="ss-box-badge">🟠 Højre: Forvandlingen / Omslaget</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.right.sent.replace('var blevet', '<span class="ss-box-verb-highlight">var blevet</span>')}
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
            leftDot.title = `${pair.title} (Tilstand: ${pair.left.word})`;
            leftDot.onclick = () => selectPair(pair.key, 'left');
            leftContainer.appendChild(leftDot);

            const rightDot = document.createElement('button');
            rightDot.className = 'ss-hotspot';
            rightDot.style.left = `${pair.right.x}%`;
            rightDot.style.top = `${pair.right.y}%`;
            rightDot.dataset.key = pair.key;
            rightDot.innerHTML = pair.icon;
            rightDot.title = `${pair.title} (Forvandling: ${pair.right.word})`;
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
