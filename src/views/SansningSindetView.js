import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import { renderTrorSynesMenerView } from './TrorSynesMenerView.js';

/**
 * SansningSindetView - Station 6: Sindets Sansning (Synes vs. Tror vs. Mener vs. Ved)
 * Vrimlebillede: DIKTOMISK SPLIT-STAGE
 * 
 * Didaktisk grundlag:
 *  🔵 VENSTRE: KROPPENS SANSER (Yin / Indre Sanse-Sandhed) -> SYNES (Tungen, huden, sanserne her og nu)
 *  🟠 HØJRE: HOVEDETS TANKER (Yang / Ydre Refleksion) -> TROR / MENER / VED (Gæt, debat og fakta)
 * 
 * Integrerer nedenunder:
 *  - Fuld adgang til det eksisterende TrorSynesMenerView (100% bevaret i Fane 3)
 */
export function renderSansningSindetView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    function speakDanish(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'da-DK';
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
    }

    let activePairIndex = 0;
    let activeSide = 'left'; // 'left' = kroppen (synes), 'right' = hovedet (tror/mener/ved)
    let isPureMode = false;

    const contrastPairs = [
        {
            key: 'suppe',
            title: 'Middagsbordet & Suppen',
            icon: '🍲',
            left: {
                x: 35,
                y: 60,
                word: 'synes',
                sent: 'Jeg synes, suppen smager fantastisk af ingefær og chili.',
                exp: 'Kroppen mærker det direkte på tungen og i munden. Det er din helt egen kropslige sanseoplevelse, som ingen kan bestride.'
            },
            right: {
                x: 35,
                y: 60,
                word: 'tror',
                sent: 'Jeg tror, der er chili i suppen (inden jeg smager).',
                exp: 'Et gæt i hovedet før sanserne har mærket det. Hovedet forestiller sig noget om fremtiden eller det ukendte.'
            },
            aha: 'Synes bor på tungen og i sanserne. Tror bor i panden som et gæt.'
        },
        {
            key: 'vejr',
            title: 'Vinduet & Uvejret',
            icon: '🌧️',
            left: {
                x: 75,
                y: 35,
                word: 'synes',
                sent: 'Jeg synes, det trækker koldt her ved vinduet.',
                exp: 'Huden mærker kuldegyset og trækket direkte på kroppen lige her og nu.'
            },
            right: {
                x: 75,
                y: 35,
                word: 'tror',
                sent: 'Jeg tror, det begynder at regne lige om lidt.',
                exp: 'Du kigger på de mørke skyer og spår om fremtiden. Du kan ikke mærke dråberne på huden endnu.'
            },
            aha: 'Synes = mærkes på huden nu. Tror = formodning om fremtiden.'
        },
        {
            key: 'kaffe',
            title: 'Kaffekoppen & Bitterhed',
            icon: '☕',
            left: {
                x: 20,
                y: 45,
                word: 'synes',
                sent: 'Jeg synes, kaffen er alt for stærk uden mælk.',
                exp: 'Personlig smag og kropslig behag/ubehag er altid SYNES på dansk!'
            },
            right: {
                x: 20,
                y: 45,
                word: 'tror',
                sent: 'Jeg tror, kaffen er økologiske bønner fra Colombia.',
                exp: 'En hypotese om oprindelsen, som du ikke kan smage dig til med 100% vished.'
            },
            aha: 'Smag og behag = altid SYNES! Oprindelse/fakta = TROR eller VED.'
        },
        {
            key: 'debat',
            title: 'Avisen & Debatten',
            icon: '📰',
            left: {
                x: 52,
                y: 55,
                word: 'synes',
                sent: 'Jeg synes, det er anstrengende at sidde i den propfyldte bus.',
                exp: 'Den kropslige oplevelse af larm, trængsel og mangel på siddepladser.'
            },
            right: {
                x: 52,
                y: 55,
                word: 'mener',
                sent: 'Jeg mener, vi bør investere mere i offentlig transport.',
                exp: 'En principiel, politisk og intellektuel holdning baseret på argumenter og værdier.'
            },
            aha: 'Synes = kropslig oplevelse. Mener = holdning i en debat (kræver ofte et "fordi...").'
        },
        {
            key: 'fakta',
            title: 'Uret & Køreplanen',
            icon: '⌚',
            left: {
                x: 82,
                y: 65,
                word: 'synes',
                sent: 'Jeg synes, bussen altid kommer for sent.',
                exp: 'En følelsesmæssig og subjektiv frustration over ventetiden.'
            },
            right: {
                x: 82,
                y: 65,
                word: 'ved',
                sent: 'Jeg ved, at bussen kører præcis klokken 20:15 ifølge køreplanen.',
                exp: 'En objektiv kendsgerning, der kan bevises og verificeres sort på hvidt.'
            },
            aha: 'Synes = din subjektive oplevelse. Ved = objektiv, beviselig virkelighed.'
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Mmm, den her kage er fantastisk! Hvad ... du?',
            options: ['synes', 'tror'],
            correct: 'synes',
            expl: 'I spiser begge af kagen og mærker smagen direkte på tungen.'
        },
        {
            prompt: 'Kommer Mads til festen i aften? Jeg ... det, for han sagde han ville prøve.',
            options: ['synes', 'tror'],
            correct: 'tror',
            expl: 'Det handler om fremtiden og en uvis formodning.'
        },
        {
            prompt: 'Jeg har ondt i ryggen. Jeg ... den her stol er for hård.',
            options: ['synes', 'tror'],
            correct: 'synes',
            expl: 'Kroppen mærker hårdheden direkte mod ryggen.'
        },
        {
            prompt: 'Politikeren sagde i tv: "Vi ... at skatten skal sænkes for de unge."',
            options: ['mener', 'synes'],
            correct: 'mener',
            expl: 'Det er en politisk og principiel holdning i samfundsdebatten.'
        },
        {
            prompt: 'Hvad er klokken? Jeg ... den er cirka 14:30.',
            options: ['tror', 'ved'],
            correct: 'tror',
            expl: 'Du har ikke kigget på uret endnu, så det er et skøn/gæt.'
        },
        {
            prompt: 'Hvor mange bor der i Danmark? Jeg ..., der bor omkring 6 millioner.',
            options: ['ved', 'synes'],
            correct: 'ved',
            expl: 'Befolkningstallet er et objektivt faktum.'
        }
    ];

    const style = document.createElement('style');
    style.textContent = `
        .sansning-station-view {
            max-width: 1180px;
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
            border-color: #06b6d4;
            background: rgba(30, 41, 59, 0.9);
            transform: translateX(-2px);
        }

        .ss-station-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(6, 182, 212, 0.15);
            border: 1px solid rgba(6, 182, 212, 0.45);
            border-radius: 999px;
            padding: 0.35rem 0.85rem;
            font-size: 0.8rem;
            font-weight: 800;
            color: #67e8f9;
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
            background: linear-gradient(135deg, #06b6d4 20%, #ffffff 60%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .ss-hero p {
            color: #cbd5e1;
            font-size: 1.02rem;
            max-width: 780px;
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
            background: linear-gradient(135deg, #0891b2, #0e7490);
            color: #ffffff;
            box-shadow: 0 0 16px rgba(6, 182, 212, 0.4);
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
            border: 1.5px solid rgba(6, 182, 212, 0.35);
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
            border-color: #06b6d4;
            color: #ffffff;
        }
        .pure-toggle-btn.active {
            background: rgba(6, 182, 212, 0.3);
            border-color: #06b6d4;
            color: #67e8f9;
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
            color: #67e8f9;
            border: 1.5px solid rgba(6, 182, 212, 0.6);
            background: rgba(8, 145, 178, 0.85);
        }
        .stage-half-header.warm {
            color: #fed7aa;
            border: 1.5px solid rgba(251, 146, 60, 0.6);
            background: rgba(154, 52, 18, 0.85);
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
        .stage-half.left-half .ss-hotspot { background: #0891b2; }
        .stage-half.right-half .ss-hotspot { background: #ea580c; }

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
            background: #67e8f9 !important;
            box-shadow: 0 0 20px rgba(103, 232, 249, 0.9);
        }
        .stage-half.right-half .ss-hotspot.partner-active {
            background: #f97316 !important;
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.9);
        }

        @keyframes pulsePartner {
            0%, 100% { box-shadow: 0 0 10px rgba(253, 230, 138, 0.5); }
            50% { box-shadow: 0 0 24px rgba(253, 230, 138, 0.95); }
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
            border-color: #06b6d4;
            color: #ffffff;
        }
        .ss-strip-btn.active {
            background: rgba(6, 182, 212, 0.35);
            border-color: #06b6d4;
            color: #ffffff;
            box-shadow: 0 0 12px rgba(6, 182, 212, 0.3);
        }

        .adj-detail-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border-radius: 20px;
            border: 1.5px solid rgba(6, 182, 212, 0.4);
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
            border: 1.5px solid rgba(6, 182, 212, 0.5);
            color: #67e8f9;
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
            background: rgba(6, 182, 212, 0.2);
            border-color: #67e8f9;
            color: #ffffff;
            transform: scale(1.04);
        }

        .adj-congruence-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.2rem;
        }
        @media (max-width: 768px) {
            .adj-congruence-grid {
                grid-template-columns: 1fr;
            }
        }
        .adj-box {
            background: rgba(15, 23, 42, 0.7);
            border: 1.5px solid rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            padding: 1.1rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
            transition: all 0.2s ease;
        }
        .adj-box.active-side {
            border-color: #10b981;
            background: rgba(16, 185, 129, 0.08);
            box-shadow: 0 0 16px rgba(16, 185, 129, 0.15);
        }
        .adj-box-badge {
            font-size: 0.76rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.2rem 0.6rem;
            border-radius: 6px;
            width: fit-content;
        }
        .adj-box.left .adj-box-badge {
            background: rgba(6, 182, 212, 0.2);
            color: #67e8f9;
        }
        .adj-box.right .adj-box-badge {
            background: rgba(249, 115, 22, 0.2);
            color: #fdba74;
        }
        .adj-box-sent-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.6rem;
        }
        .adj-box-sent {
            font-size: 1.1rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.4;
        }
        .adj-highlight {
            padding: 0.1rem 0.4rem;
            border-radius: 6px;
        }
        .adj-box.left .adj-highlight {
            background: rgba(6, 182, 212, 0.25);
            color: #22d3ee;
            border-bottom: 2px solid #0891b2;
        }
        .adj-box.right .adj-highlight {
            background: rgba(249, 115, 22, 0.25);
            color: #fb923c;
            border-bottom: 2px solid #ea580c;
        }
        .adj-tts-btn {
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
        .adj-tts-btn:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.08);
        }
        .adj-box-exp {
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.45;
        }

        .adj-aha-bar {
            background: rgba(15, 23, 42, 0.7);
            border: 1px dashed rgba(6, 182, 212, 0.4);
            border-radius: 12px;
            padding: 0.9rem 1.15rem;
            font-size: 0.92rem;
            color: #a5f3fc;
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }

        /* Quiz */
        .ss-quiz-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
            border: 1.5px solid rgba(6, 182, 212, 0.35);
            border-radius: 20px;
            padding: 1.75rem 1.85rem;
            max-width: 780px;
            margin: 0 auto;
            box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
        }
        .ss-quiz-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
            font-size: 0.86rem;
            font-weight: 800;
            color: #94a3b8;
        }
        .ss-quiz-question-box {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            padding: 1.25rem 1.4rem;
            margin-bottom: 1.35rem;
            font-size: 1.15rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.5;
        }
        .ss-quiz-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.25rem;
        }
        @media (max-width: 540px) {
            .ss-quiz-options { grid-template-columns: 1fr; }
        }
        .ss-quiz-opt-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 2px solid rgba(148, 163, 184, 0.25);
            border-radius: 14px;
            padding: 1rem 1.25rem;
            font-size: 1.1rem;
            font-weight: 800;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .ss-quiz-opt-btn:hover {
            border-color: #06b6d4;
            background: rgba(6, 182, 212, 0.15);
            transform: translateY(-2px);
        }
        .ss-quiz-opt-btn.correct {
            background: rgba(16, 185, 129, 0.25);
            border-color: #10b981;
            color: #34d399;
        }
        .ss-quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25);
            border-color: #ef4444;
            color: #fca5a5;
        }
        .ss-quiz-feedback {
            padding: 1rem 1.2rem;
            border-radius: 12px;
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
            display: none;
            line-height: 1.5;
        }
        .ss-quiz-feedback.show { display: block; }
        .ss-quiz-feedback.correct {
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(16, 185, 129, 0.4);
            color: #a7f3d0;
        }
        .ss-quiz-feedback.wrong {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #fecaca;
        }
        .ss-quiz-next-btn {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            border: none;
            color: #ffffff;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            display: none;
            margin-left: auto;
            transition: all 0.2s ease;
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
    badge.innerHTML = `Station 6 • Sindets Sansning`;
    topBar.appendChild(badge);

    viewContainer.appendChild(topBar);

    // 2. Hero
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Sindets Sansning: Synes vs. Tror vs. Mener vs. Ved</h1>
        <p>
            På dansk afslører verbet sindets kilde: <strong>Synes</strong> udspringer direkte af kroppens 
            smagsløg, hud og sanser her og nu. <strong>Tror</strong> er hovedets gæt om en uvis fremtid. 
            <strong>Mener</strong> er en principiel holdning i samtalen. <strong>Ved</strong> er faktuel sandhed.
        </p>
    `;
    viewContainer.appendChild(hero);

    // 3. Tabs
    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="tab_vrimmel">
            🖼️ 1. Diktomisk Vrimlebillede (Split-Scene)
        </button>
        <button class="ss-tab-btn" data-tab="tab_quiz">
            🎯 2. Sanse-Træner: Synes, Tror eller Mener?
        </button>
        <button class="ss-tab-btn" data-tab="tab_original">
            🧠 3. Det Komplette Værksted (Tror/Synes/Mener)
        </button>
    `;
    viewContainer.appendChild(tabsNav);

    const panelsContainer = document.createElement('div');

    // -------------------------------------------------------------
    // TAB 1: DIKTOMISK SPLIT-STAGE VRIMLEBILLEDE
    // -------------------------------------------------------------
    const panelVrimmel = document.createElement('div');
    panelVrimmel.className = 'ss-tab-panel active';
    panelVrimmel.id = 'panel-vrimmel';

    panelVrimmel.innerHTML = `
        <div class="contrast-canvas-card">
            <div class="contrast-control-bar">
                <span class="contrast-instruction">
                    👉 Klik på motiverne i venstre eller højre side for at se modsætningen lyse op!
                </span>
                <button class="pure-toggle-btn" id="pure-toggle-btn">
                    👁️ Vis rent billede
                </button>
            </div>

            <div class="contrast-split-stage" id="split-stage">
                <!-- VENSTRE HALVDEL: KROPPENS SANSE-SANDHED (Yin / Synes) -->
                <div class="stage-half left-half" id="stage-left">
                    <div class="stage-half-header cool">
                        🔵 Yin: Kroppens sanse-sandhed (Synes)
                    </div>
                    <img src="assets/sansning_sindet_venstre.jpg" alt="Kroppens sansning - Synes" class="stage-half-img" />
                    <div id="hotspots-left"></div>
                </div>

                <!-- HØJRE HALVDEL: HOVEDETS TANKER & VURDERING (Yang / Tror & Mener) -->
                <div class="stage-half right-half" id="stage-right">
                    <div class="stage-half-header warm">
                        🟠 Yang: Hovedets tanker & debat (Tror / Mener / Ved)
                    </div>
                    <img src="assets/sansning_sindet_hoejre.jpg" alt="Hovedets tanker - Tror, mener, ved" class="stage-half-img" />
                    <div id="hotspots-right"></div>
                </div>
            </div>

            <!-- Hurtig-knapper til de 5 par -->
            <div class="ss-hotspots-strip" id="hotspots-strip"></div>
        </div>

        <!-- DETALJE-KORT MED MODPOL -->
        <div class="adj-detail-card" id="detail-card"></div>
    `;

    panelsContainer.appendChild(panelVrimmel);

    // -------------------------------------------------------------
    // TAB 2: QUIZ / TRÆNINGSBANE
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
                    <h2 style="font-size: 1.8rem; margin: 0.5rem 0 1rem; color: #67e8f9;">
                        Træningsbane Gennemført!
                    </h2>
                    <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore} af ${quizQuestions.length}</strong> rigtige!
                    </p>
                    <button class="ss-back-btn" id="btn-restart-quiz" style="margin: 0 auto; background: #0891b2;">
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
                    <button class="ss-quiz-opt-btn" data-val="${q.options[0]}">
                        ${q.options[0]}
                    </button>
                    <button class="ss-quiz-opt-btn" data-val="${q.options[1]}">
                        ${q.options[1]}
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
    // TAB 3: DET ORIGINALE SINDETS VÆRKSTED (100% BEVARET)
    // -------------------------------------------------------------
    const panelOriginal = document.createElement('div');
    panelOriginal.className = 'ss-tab-panel';
    panelOriginal.id = 'panel-original';

    panelOriginal.innerHTML = `
        <div class="ss-embedded-wrapper" style="background: rgba(15, 23, 42, 0.9); border: 1.5px solid rgba(6, 182, 212, 0.35); border-radius: 20px; padding: 1.5rem; box-shadow: 0 12px 32px rgba(0,0,0,0.4);">
            <div style="text-align: center; margin-bottom: 1.2rem;">
                <span style="font-size: 0.85rem; font-weight: 800; color: #67e8f9; text-transform: uppercase;">
                    Det Komplette Sindets Værksted (100% Bevaret)
                </span>
                <h2 style="font-size: 1.6rem; margin: 0.3rem 0; color: #ffffff;">
                    Tror, Synes, Mener & Ved
                </h2>
                <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 720px; margin: 0 auto;">
                    Herunder finder du det fulde originale modul med interaktiv quiz og dybdegående teori.
                </p>
            </div>
            <div id="embedded-trorsynes-mount"></div>
        </div>
    `;

    const trorsynesMount = panelOriginal.querySelector('#embedded-trorsynes-mount');
    renderTrorSynesMenerView(trorsynesMount, navigateFn, { isEmbedded: true });

    panelsContainer.appendChild(panelOriginal);

    viewContainer.appendChild(panelsContainer);

    // -------------------------------------------------------------
    // HOTSPOTS OG DETALJEKORT LOGIK
    // -------------------------------------------------------------
    const splitStage = panelVrimmel.querySelector('#split-stage');
    const leftHotspotsBox = panelVrimmel.querySelector('#hotspots-left');
    const rightHotspotsBox = panelVrimmel.querySelector('#hotspots-right');
    const stripContainer = panelVrimmel.querySelector('#hotspots-strip');
    const detailCard = panelVrimmel.querySelector('#detail-card');
    const pureToggleBtn = panelVrimmel.querySelector('#pure-toggle-btn');

    pureToggleBtn.onclick = () => {
        isPureMode = !isPureMode;
        if (isPureMode) {
            splitStage.classList.add('pure-mode');
            pureToggleBtn.classList.add('active');
            pureToggleBtn.innerHTML = `👁️ Vis hotspots`;
        } else {
            splitStage.classList.remove('pure-mode');
            pureToggleBtn.classList.remove('active');
            pureToggleBtn.innerHTML = `👁️ Vis rent billede`;
        }
    };

    function renderHotspotsUI() {
        leftHotspotsBox.innerHTML = '';
        rightHotspotsBox.innerHTML = '';

        contrastPairs.forEach((pair, idx) => {
            const isPairSelected = (idx === activePairIndex);

            // Left Hotspot
            const leftBtn = document.createElement('button');
            leftBtn.className = 'ss-hotspot';
            if (isPairSelected && activeSide === 'left') leftBtn.classList.add('active');
            if (isPairSelected && activeSide === 'right') leftBtn.classList.add('partner-active');
            leftBtn.style.left = `${pair.left.x}%`;
            leftBtn.style.top = `${pair.left.y}%`;
            leftBtn.innerHTML = pair.icon;
            leftBtn.title = `${pair.left.word} (${pair.title})`;
            leftBtn.onclick = (e) => {
                e.stopPropagation();
                activePairIndex = idx;
                activeSide = 'left';
                renderHotspotsUI();
            };
            leftHotspotsBox.appendChild(leftBtn);

            // Right Hotspot
            const rightBtn = document.createElement('button');
            rightBtn.className = 'ss-hotspot';
            if (isPairSelected && activeSide === 'right') rightBtn.classList.add('active');
            if (isPairSelected && activeSide === 'left') rightBtn.classList.add('partner-active');
            rightBtn.style.left = `${pair.right.x}%`;
            rightBtn.style.top = `${pair.right.y}%`;
            rightBtn.innerHTML = pair.icon;
            rightBtn.title = `${pair.right.word} (${pair.title})`;
            rightBtn.onclick = (e) => {
                e.stopPropagation();
                activePairIndex = idx;
                activeSide = 'right';
                renderHotspotsUI();
            };
            rightHotspotsBox.appendChild(rightBtn);
        });

        // Strip
        stripContainer.innerHTML = '';
        contrastPairs.forEach((pair, idx) => {
            const btn = document.createElement('button');
            btn.className = `ss-strip-btn ${idx === activePairIndex ? 'active' : ''}`;
            btn.innerHTML = `${pair.icon} ${pair.left.word} / ${pair.right.word}`;
            btn.onclick = () => {
                activePairIndex = idx;
                renderHotspotsUI();
            };
            stripContainer.appendChild(btn);
        });

        // Detail Card
        const pair = contrastPairs[activePairIndex];
        const currentData = activeSide === 'left' ? pair.left : pair.right;
        const otherSide = activeSide === 'left' ? 'right' : 'left';
        const otherData = activeSide === 'left' ? pair.right : pair.left;
        const otherLabel = activeSide === 'left' ? `Byt til: ${pair.right.word} (Yang / Hovedet)` : `Byt til: ${pair.left.word} (Yin / Kroppen)`;

        detailCard.innerHTML = `
            <div class="adj-detail-header">
                <div class="adj-title-group">
                    <span style="font-size: 1.8rem;">${pair.icon}</span>
                    <span class="adj-main-word">${currentData.word.toUpperCase()}</span>
                    <span style="color: #94a3b8; font-size: 0.9rem;">(${pair.title})</span>
                </div>
                <button class="adj-modpol-pill" id="card-swap-btn">
                    <span>⇄</span>
                    <span>${otherLabel}</span>
                </button>
            </div>

            <div class="adj-congruence-grid">
                <div class="adj-box left ${activeSide === 'left' ? 'active-side' : ''}">
                    <span class="adj-box-badge">🔵 Yin: Kroppens sanse-sandhed (Synes)</span>
                    <div class="adj-box-sent-row">
                        <div class="adj-box-sent">
                            "${pair.left.sent.replace(pair.left.word, `<span class="adj-highlight">${pair.left.word}</span>`)}"
                        </div>
                        <button class="adj-tts-btn" id="tts-left" title="Lyt på dansk">🔊</button>
                    </div>
                    <div class="adj-box-exp">${pair.left.exp}</div>
                </div>

                <div class="adj-box right ${activeSide === 'right' ? 'active-side' : ''}">
                    <span class="adj-box-badge">🟠 Yang: Hovedets tanker (Tror / Mener / Ved)</span>
                    <div class="adj-box-sent-row">
                        <div class="adj-box-sent">
                            "${pair.right.sent.replace(pair.right.word, `<span class="adj-highlight">${pair.right.word}</span>`)}"
                        </div>
                        <button class="adj-tts-btn" id="tts-right" title="Lyt på dansk">🔊</button>
                    </div>
                    <div class="adj-box-exp">${pair.right.exp}</div>
                </div>
            </div>

            <div class="adj-aha-bar">
                <span style="font-size: 1.3rem;">💡</span>
                <span><strong>Aha-oplevelse:</strong> ${pair.aha}</span>
            </div>
        `;

        detailCard.querySelector('#tts-left').onclick = () => speakDanish(pair.left.sent);
        detailCard.querySelector('#tts-right').onclick = () => speakDanish(pair.right.sent);
        detailCard.querySelector('#card-swap-btn').onclick = () => {
            activeSide = otherSide;
            renderHotspotsUI();
        };
    }

    renderHotspotsUI();

    // Tab switching
    tabsNav.querySelectorAll('.ss-tab-btn').forEach(btn => {
        btn.onclick = () => {
            tabsNav.querySelectorAll('.ss-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');

            panelsContainer.querySelectorAll('.ss-tab-panel').forEach(p => p.classList.remove('active'));
            if (target === 'tab_vrimmel') panelVrimmel.classList.add('active');
            if (target === 'tab_quiz') panelQuiz.classList.add('active');
            if (target === 'tab_original') panelOriginal.classList.add('active');
        };
    });

    container.appendChild(viewContainer);
}
