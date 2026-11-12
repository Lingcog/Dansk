import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { renderVerberTider4View } from './VerberTider4View.js';
import { renderVerberGrammatikHubView } from './VerberGrammatikHubView.js';

/**
 * SansningVerberTiderView - Station 2.3: Tempus og tidens rum (tids-deiksis)
 * Diktomisk Split-Stage Vrimlebillede:
 *
 *  🔵 VENSTRE SIDE: NÆRHED – NUTID & FØRNUTID (Tæt på nutiden / resultatet lever nu)
 *  🟠 HØJRE SIDE: AFSTAND – DATID & FØRDATID (Lukket fortid i kikkerten på afstand)
 *
 * Bevarer 100% af de oprindelige moduler (VerberTider4 & VerberGrammatikHub) i Fane 3.
 */
export function renderSansningVerberTiderView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    let activeItemKey = 'indkoersel_sne';
    let isPureMode = false;

    const contrastPairs = [
        {
            key: 'indkoersel_sne',
            title: 'Indkørslen og bilen',
            icon: '🚗',
            left: {
                x: 42,
                y: 84,
                word: 'har ryddet',
                sent: 'Vi har ryddet indkørslen for sne.',
                exp: 'Førnutid peger tæt ind mod nutiden: se de rene mursten lige foran kameraet her og nu.'
            },
            right: {
                x: 37,
                y: 74,
                word: 'kørte',
                sent: 'Bilen kørte ind i indkørslen i går aftes.',
                exp: 'Datid sætter kikkerten på et afsluttet tidspunkt ("i går aftes"), som er adskilt fra vores nu.'
            },
            aha: '<strong>Har ryddet</strong> (førnutid) zoomer ind på resultatet, der gælder lige nu. <strong>Kørte</strong> (datid) flytter blikket ud til et fjernt, afsluttet tidspunkt.'
        },
        {
            key: 'varme_te',
            title: 'Ilden i pejsen og aftenens te',
            icon: '🫖',
            left: {
                x: 52,
                y: 12,
                word: 'har tændt',
                sent: 'Vi har tændt op, så her er varmt nu.',
                exp: 'Røgen stiger stadig op af skorstenen lige nu. Handlingen rækker direkte ind i vores nutid.'
            },
            right: {
                x: 59,
                y: 47,
                word: 'lavede',
                sent: 'De lavede varm te, da han kom hjem i går.',
                exp: 'Scenen hører hjemme i den lukkede kikkert fra i går aftes – uden tråd til nuet.'
            },
            aha: 'Når virkningen stadig kan ses eller mærkes i rummet nu, bruger dansk førnutid (<strong>har tændt</strong>). Når et tidsrum er lukket, bruger vi datid (<strong>lavede</strong>).'
        },
        {
            key: 'sne_vejr',
            title: 'Sneen og vejret',
            icon: '❄️',
            left: {
                x: 24,
                y: 60,
                word: 'har sneet',
                sent: 'Det har sneet i nat – se istapperne nu!',
                exp: 'Førnutid forbinder nattens snefald med den hvide have, der ligger foran os lige nu.'
            },
            right: {
                x: 36,
                y: 24,
                word: 'sneede',
                sent: 'Det sneede voldsomt i stormen i går aftes.',
                exp: 'Tidsudtryk som "i går aftes" eller "sidste vinter" lukker scenen bagud i datid.'
            },
            aha: 'Tidsord med afstand (<em>i går, sidste år, dengang</em>) kræver datid. Når fokus er på sporet lige her og nu, bruges førnutid.'
        },
        {
            key: 'kat_ankomst',
            title: 'Katten i karmen og gæsten ved døren',
            icon: '🐱',
            left: {
                x: 41,
                y: 51,
                word: 'har lagt sig',
                sent: 'Katten har lagt sig til at sove i vinduet.',
                exp: 'Den ligger der stadig foran os nu: førnutid holder kameraet tæt på nutiden.'
            },
            right: {
                x: 76,
                y: 50,
                word: 'ankom',
                sent: 'Han ankom sent til huset den aften.',
                exp: '"Den aften" er en tydelig afstandsmarkør. Kikkerten er rettet mod en afsluttet aften.'
            },
            aha: 'Førnutid svarer til kameraet i din egen stue lige nu; datid svarer til at bladre i et fotoalbum fra en bestemt aften.'
        },
        {
            key: 'post_lygter',
            title: 'Posten i dag vs. lygterne i mørket',
            icon: '📮',
            left: {
                x: 91,
                y: 69,
                word: 'har været',
                sent: 'Postbuddet har allerede været her i dag.',
                exp: 'I dag er et tidsrum, som vi stadig befinder os inde i: derfor bruger dansk nærhedsformen førnutid.'
            },
            right: {
                x: 49,
                y: 74,
                word: 'lyste',
                sent: 'Bilens lygter lyste gennem mørket dengang.',
                exp: '"Dengang" peger langt tilbage fra nuet ind i et helt afsluttet tidsrum i datid.'
            },
            aha: 'En god tommelfingerregel for tids-deiksis: Er du stadig inde i tidsrummet (<em>i dag, i år</em>) = <strong>har været</strong>. Er tidsrummet lukket ude på afstand (<em>i går, sidste år, dengang</em>) = <strong>var / lyste</strong>.'
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Du kigger på din rene cykel i indkørslen lige nu og siger: "Jeg ... lige min cykel!"',
            options: ['har vasket', 'vaskede'],
            correct: 'har vasket',
            expl: 'Ordet "lige" og resultatet lige foran dig viser nærhed til nutiden: førnutid ("har vasket").'
        },
        {
            prompt: 'Du fortæller om sidste sommerferie på Bornholm: "Vi ... hver dag på stranden sidste år."',
            options: ['har badet', 'badede'],
            correct: 'badede',
            expl: '"Sidste år" er et helt afsluttet tidsrum langt fra nutiden, så kameraet kigger i datid ("badede").'
        },
        {
            prompt: 'Din ven træder ind ad døren i stuen nu: "Er du sulten?" – "Nej tak, jeg ... allerede!"',
            options: ['har spist', 'spiste'],
            correct: 'har spist',
            expl: 'Førnutid ("har spist") har direkte relevans for situationen lige nu: du er mæt i dette øjeblik.'
        },
        {
            prompt: 'Klokken er 15 nu. Du møder en ven, I aftaler biograf i aften: "Jeg ... filmen klokken 19 i går."',
            options: ['har set', 'så'],
            correct: 'så',
            expl: 'Et præcist lukket tidspunkt i fortiden ("klokken 19 i går") kræver datid ("så") på dansk.'
        },
        {
            prompt: 'Dagen i dag er stadig i gang, og du tjekker indbakken: "Hun ... mig tre beskeder i dag."',
            options: ['har sendt', 'sendte'],
            correct: 'har sendt',
            expl: 'Da "i dag" stadig er vores åbne nutidsrum, bruges førnutid ("har sendt") til at holde oplevelsen tæt på nuet.'
        },
        {
            prompt: 'Når du læser et eventyr op, starter tiden i en lukket kikkert langt væk: "Der ... engang en konge."',
            options: ['har boet', 'boede'],
            correct: 'boede',
            expl: '"Engang" placerer hele scenen fjernt fra nutiden i fortidens lukkede kikkert (datid: "boede").'
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
    backBtn.innerHTML = (extraData && extraData.from === 'overview')
        ? '← Tilbage til sansningsoversigten'
        : (extraData && extraData.from === 'flade1')
            ? '← Tilbage til hovedflade 1'
            : '← Tilbage til hovedflade 2';
    backBtn.onclick = () => {
        if (extraData && extraData.from === 'overview') {
            navigateFn('grammatik_sansning');
        } else if (extraData && extraData.from === 'flade1') {
            navigateFn('sansning_flade1');
        } else {
            navigateFn('sansning_flade2');
        }
    };
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.innerHTML = `Station 2.3 • Tempus og tidens rum`;
    topBar.appendChild(badge);

    viewContainer.appendChild(topBar);

    // 2. Hero
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Tempus og tidens rum: nærhed (førnutid) vs. afstand (datid)</h1>
        <p>
            Her sammenligner du ikke ro mod bevægelse, men <strong>kameraets tidsafstand</strong>:
            <strong>Nutid og førnutid</strong> holder blikket tæt på nuet (resultatet står lige foran dig), mens
            <strong>datid og førdatid</strong> placerer scenen fjernt i fortidens lukkede kikkert (<em>i går, dengang, sidste år</em>).
        </p>
        <div style="max-width: 860px; margin: 1rem auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.85rem; text-align: left;">
            <div style="background: #5C0812; border: 1.5px solid #38bdf8; border-radius: 14px; padding: 0.9rem 1.1rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; margin-bottom: 0.25rem;">Nærhed: Tæt på nutiden</div>
                <div style="color: #ffffff; font-weight: 700; font-size: 0.96rem;">Nutid og førnutid ("Jeg spiser" / "Jeg har ryddet")</div>
                <div style="color: #FFC9CD; font-size: 0.84rem; margin-top: 0.25rem;">Tidsrummet er stadig åbent, eller resultatet rækker direkte ind i vores nu lige nu.</div>
            </div>
            <div style="background: #5C0812; border: 1.5px solid #fb923c; border-radius: 14px; padding: 0.9rem 1.1rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #fb923c; text-transform: uppercase; margin-bottom: 0.25rem;">Afstand: Fjernt fra nutiden</div>
                <div style="color: #ffffff; font-weight: 700; font-size: 0.96rem;">Datid og førdatid ("Jeg spiste" / "Bilen kørte i går")</div>
                <div style="color: #FFC9CD; font-size: 0.84rem; margin-top: 0.25rem;">Tidsklokken er lukket. Du kigger gennem kikkerten ind i en afsluttet fortid på afstand.</div>
            </div>
        </div>
    `;
    viewContainer.appendChild(hero);

    // 3. Tabs
    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="tab_kontrast">
            1. Førnutid (nærhed) vs. datid (afstand)
        </button>
        <button class="ss-tab-btn" data-tab="tab_quiz">
            2. Træningsbane: førnutid vs. datid
        </button>
        <button class="ss-tab-btn" data-tab="tab_engine">
            3. Det store tidslinje-værksted
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
                    Klik på et motiv på venstre side (tæt på nuet i førnutid) for at sammenligne med højre side (fjernt i datid).
                </div>
                <button class="pure-toggle-btn" id="pure-toggle-btn">
                    Ren visning: <strong id="pure-status-label">Fra</strong>
                </button>
            </div>

            <div class="contrast-split-stage" id="split-stage">
                <!-- VENSTRE HALVDEL: FØRNUTID (TÆT PÅ NUTIDEN) -->
                <div class="stage-half left-half">
                    <div class="stage-half-header cool">Venstre: Førnutid (tæt på nuet)</div>
                    <img src="assets/sansning_verber_tider_venstre.jpg" alt="Dagslysscenen nu: indkørslen er ryddet og resultatet ses her og nu (førnutid)" class="stage-half-img" />
                    <div id="left-hotspots-container"></div>
                </div>

                <!-- HØJRE HALVDEL: DATID (FJERNT I KIKKERTEN) -->
                <div class="stage-half right-half">
                    <div class="stage-half-header warm">Højre: Datid (fjernt i kikkerten)</div>
                    <img src="assets/sansning_verber_tider_hoejre.jpg" alt="Bilen kørte ind i stormen i går aftes som lukket fortid på afstand (datid)" class="stage-half-img" />
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
                    <h2 style="font-size: 1.8rem; margin: 0.5rem 0 1rem; color: #fde68a;">
                        Træningsbane gennemført!
                    </h2>
                    <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore} af ${quizQuestions.length}</strong> rigtige!
                    </p>
                    <button class="ss-back-btn" id="btn-restart-quiz" style="margin: 0 auto; background: #d97706;">
                        Tag træningsbanen igen
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
                    ${q.options.map(opt => {
                        let label = opt;
                        if (opt === 'havde været') label = 'havde været (stabil tilstand i fortid)';
                        if (opt === 'var blevet') label = 'var blevet (selve forvandlingen/omslaget)';
                        return `<button class="ss-quiz-opt-btn" data-val="${opt}">${label}</button>`;
                    }).join('')}
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
                    Det komplette grammatik-værksted (100% bevaret)
                </span>
                <h2 style="font-size: 1.6rem; margin: 0.3rem 0; color: #ffffff;">
                    De 4 tider og interaktive tidslinjer
                </h2>
                <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 720px; margin: 0 auto;">
                    Herunder finder du alle vores detaljerede diagrammer, sporhunde-øvelser og kameravinkler.
                </p>
            </div>
            
            <div class="ss-embedded-subnav">
                <button class="ss-strip-btn active" id="btn-sub-tider4">
                    De 4 tider (nutid, datid, førnutid, førdatid)
                </button>
                <button class="ss-strip-btn" id="btn-sub-hub">
                    Verber grammatik-hub (statisk linje vs. animerede scener)
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
                    <span class="adj-main-word">${pair.title}</span>
                </div>
                <div class="adj-modpol-pill" id="card-swap-btn" title="Klik for at skifte tidsperspektiv">
                    <span>${triggerSide === 'left' ? 'Skift til afstand (datid)' : 'Skift til nærhed (førnutid)'}</span>
                    <strong>${triggerSide === 'left' ? pair.right.word + ' ➔' : pair.left.word + ' ➔'}</strong>
                </div>
            </div>

            <div class="adj-congruence-grid">
                <!-- Venstre halvdel: førnutid (nærhed / tæt på nutiden) -->
                <div class="ss-contrast-box tilstand">
                    <span class="ss-box-badge">Venstre: Førnutid (nærhed til nutiden)</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.left.sent.replace(pair.left.word, `<span class="ss-box-verb-highlight">${pair.left.word}</span>`)}
                        </span>
                    </div>
                    <div class="ss-box-exp">${pair.left.exp}</div>
                </div>

                <!-- Højre halvdel: datid (afstand / lukket kikkert) -->
                <div class="ss-contrast-box forvandling">
                    <span class="ss-box-badge">Højre: Datid (fjernt i kikkerten)</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.right.sent.replace(pair.right.word, `<span class="ss-box-verb-highlight">${pair.right.word}</span>`)}
                        </span>
                    </div>
                    <div class="ss-box-exp">${pair.right.exp}</div>
                </div>
            </div>

            <div class="ss-insp-aha">
                <span><strong>Tids-nøglen:</strong> ${pair.aha}</span>
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
            leftDot.title = `${pair.title} (Førnutid / nærhed: ${pair.left.word})`;
            leftDot.onclick = () => selectPair(pair.key, 'left');
            leftContainer.appendChild(leftDot);

            const rightDot = document.createElement('button');
            rightDot.className = 'ss-hotspot';
            rightDot.style.left = `${pair.right.x}%`;
            rightDot.style.top = `${pair.right.y}%`;
            rightDot.dataset.key = pair.key;
            rightDot.innerHTML = pair.icon;
            rightDot.title = `${pair.title} (Datid / afstand: ${pair.right.word})`;
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
