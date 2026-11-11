import { getLang } from '../utils/i18n.js';

/**
 * VanskeligeLydeKinesiskView
 * Komplet specialiseret fonetisk træningsflade til kinesiske danskkursister.
 * 
 * Indeholder 4 fuldt implementerede fonetiske specialistmoduler:
 * 1. L vs. N (边音 /l/ 与鼻音 /n/)
 * 2. Blødt d [ð] (丹麦语软 d 专项)
 * 3. Dansk r [ʁ] (小舌擦音 r 专项)
 * 4. Udlyd & konsonantklynger (-st, -lt, -kt, -ld) (词尾辅音群专项)
 *
 * For hvert modul:
 * - Dobbelt interaktivt vektor-SVG munddiagram (Profil + Mundstilling/Top-down)
 * - Praktisk selvtjek-trick (Næseklemme, Undertandstest, Gurgletest, Hånd-for-mund test)
 * - Tosproget fonetisk vejledning (Dansk + Kinesisk)
 * - 8 minimale par med audio (Web Speech API)
 * - 8 mikrofontrænings-sætninger med realtidsgenkendelse og specifikke fejldiagnoser (WebKit SpeechRecognition)
 */

export function renderVanskeligeLydeKinesiskView(container, navigateFn, extraData = {}) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container vanskelige-lyde-kinesisk-view';

    // State
    let activeModuleId = extraData.module || 'l_vs_n'; // 'l_vs_n' | 'bloedt_d' | 'dansk_r' | 'udlyd'
    let activeTab = 'diagram'; // 'diagram' | 'listening' | 'speech'
    let activeSoundTarget = 'l'; // depends on activeModuleId
    let currentPairIdx = 0;
    let quizScore = 0;
    let quizAnswered = 0;
    let currentTargetWord = null;
    let speechExerciseIdx = 0;
    let consecutiveSpeechStreak = 0;
    let isSpeechRecording = false;

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            box-sizing: border-box;
        }

        .vanskelige-lyde-kinesisk-view {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0.75rem 0.65rem 3.5rem;
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            width: 100%;
            overflow-x: hidden;
        }

        @media (min-width: 640px) {
            .vanskelige-lyde-kinesisk-view {
                padding: 1rem 1.25rem 4rem;
            }
        }

        /* Top Bar */
        .vlk-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.85rem;
            gap: 0.5rem;
        }

        .vlk-back-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.45rem 0.75rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            flex-shrink: 0;
        }

        .vlk-back-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: #fde68a;
            transform: translateX(-2px);
        }

        .vlk-top-badge {
            font-size: 0.76rem;
            color: #94a3b8;
            font-weight: 700;
            text-align: right;
            line-height: 1.2;
        }

        .vlk-back-short, .vlk-badge-short {
            display: inline;
        }
        .vlk-back-full, .vlk-badge-full {
            display: none;
        }

        @media (min-width: 640px) {
            .vlk-top-bar {
                margin-bottom: 1.2rem;
                gap: 1rem;
            }
            .vlk-back-btn {
                padding: 0.55rem 1rem;
                border-radius: 12px;
                font-size: 0.88rem;
                gap: 0.45rem;
            }
            .vlk-top-badge {
                font-size: 0.86rem;
            }
            .vlk-back-short, .vlk-badge-short {
                display: none;
            }
            .vlk-back-full, .vlk-badge-full {
                display: inline;
            }
        }

        /* Hero */
        .vlk-hero {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            border-radius: 16px;
            padding: 1.15rem 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
        }

        .vlk-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.72rem;
            font-weight: 800;
            color: #38bdf8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: rgba(56, 189, 248, 0.15);
            padding: 0.25rem 0.55rem;
            border-radius: 8px;
            margin-bottom: 0.45rem;
        }

        .vlk-hero-title {
            font-size: 1.25rem;
            font-weight: 900;
            color: #ffffff;
            margin: 0 0 0.35rem;
            line-height: 1.3;
        }

        .vlk-hero-subtitle {
            font-size: 0.86rem;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 0.65rem;
            line-height: 1.4;
        }

        .vlk-hero-desc {
            font-size: 0.84rem;
            color: #cbd5e1;
            line-height: 1.55;
            margin: 0;
        }

        @media (min-width: 640px) {
            .vlk-hero {
                padding: 1.5rem 1.6rem;
                border-radius: 20px;
                margin-bottom: 1.3rem;
            }
            .vlk-hero-badge {
                font-size: 0.76rem;
                padding: 0.3rem 0.7rem;
                margin-bottom: 0.6rem;
            }
            .vlk-hero-title {
                font-size: 1.65rem;
            }
            .vlk-hero-subtitle {
                font-size: 0.98rem;
                margin-bottom: 0.8rem;
            }
            .vlk-hero-desc {
                font-size: 0.92rem;
                line-height: 1.6;
            }
        }

        /* Module Selector */
        .vlk-module-selector {
            display: flex;
            gap: 0.45rem;
            overflow-x: auto;
            padding-bottom: 0.35rem;
            margin-bottom: 1rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
        }

        .vlk-mod-btn {
            background: rgba(15, 23, 42, 0.75);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            color: #94a3b8;
            padding: 0.5rem 0.85rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.35rem;
            flex-shrink: 0;
        }

        .vlk-mod-btn:hover {
            border-color: #38bdf8;
            color: #f8fafc;
        }

        .vlk-mod-btn.active {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(30, 58, 138, 0.35) 100%);
            border-color: #38bdf8;
            color: #38bdf8;
            box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
        }

        @media (min-width: 640px) {
            .vlk-module-selector {
                gap: 0.6rem;
                margin-bottom: 1.3rem;
                padding-bottom: 0.4rem;
            }
            .vlk-mod-btn {
                padding: 0.6rem 1.15rem;
                border-radius: 14px;
                font-size: 0.88rem;
                gap: 0.45rem;
            }
        }

        /* Main Tabs: Diagram, Listening, Speech */
        .vlk-main-tabs {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.35rem;
            background: rgba(15, 23, 42, 0.9);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 14px;
            padding: 0.3rem;
            margin-bottom: 1.1rem;
        }

        .vlk-tab-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.55rem 0.25rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.78rem;
            cursor: pointer;
            transition: all 0.18s ease;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.15rem;
            line-height: 1.2;
            width: 100%;
        }

        .vlk-tab-icon {
            font-size: 1.05rem;
        }

        .vlk-tab-short {
            display: block;
        }
        .vlk-tab-full {
            display: none;
        }

        .vlk-tab-btn:hover:not(.active) {
            color: #f8fafc;
            background: rgba(255, 255, 255, 0.04);
        }

        .vlk-tab-btn.active {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }

        @media (min-width: 640px) {
            .vlk-main-tabs {
                display: flex;
                gap: 0.6rem;
                border-radius: 16px;
                padding: 0.4rem;
                margin-bottom: 1.5rem;
            }
            .vlk-tab-btn {
                flex: 1;
                flex-direction: row;
                padding: 0.75rem 1rem;
                border-radius: 12px;
                font-size: 0.92rem;
                gap: 0.45rem;
            }
            .vlk-tab-icon {
                font-size: 1.15rem;
            }
            .vlk-tab-short {
                display: none;
            }
            .vlk-tab-full {
                display: inline;
            }
        }

        /* Sub-controls within diagram tab */
        .vlk-diag-controls {
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
            margin-bottom: 1rem;
            padding: 0.75rem 0.85rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 14px;
        }

        .vlk-diag-controls-label {
            font-weight: 800;
            font-size: 0.84rem;
            color: #f8fafc;
        }

        .vlk-sound-toggle-group {
            display: flex;
            gap: 0.45rem;
            width: 100%;
        }

        .vlk-toggle-btn {
            flex: 1;
            background: rgba(30, 41, 59, 0.8);
            border: 1.5px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
            padding: 0.55rem 0.4rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.16s ease;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.15rem;
            line-height: 1.25;
        }

        .vlk-toggle-btn.active-primary {
            background: rgba(56, 189, 248, 0.25);
            border-color: #38bdf8;
            color: #38bdf8;
        }

        .vlk-toggle-btn.active-secondary {
            background: rgba(244, 114, 182, 0.25);
            border-color: #f472b6;
            color: #f472b6;
        }

        .vlk-toggle-btn.active-accent {
            background: rgba(250, 204, 21, 0.25);
            border-color: #facc15;
            color: #facc15;
        }

        @media (min-width: 640px) {
            .vlk-diag-controls {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.2rem;
                padding: 0.8rem 1rem;
            }
            .vlk-diag-controls-label {
                font-size: 0.9rem;
            }
            .vlk-sound-toggle-group {
                width: auto;
                gap: 0.5rem;
            }
            .vlk-toggle-btn {
                flex: initial;
                flex-direction: row;
                padding: 0.45rem 1rem;
                font-size: 0.86rem;
                gap: 0.35rem;
            }
        }

        /* Diagram Grid (Sagittal + Second View) */
        .vlk-diagrams-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 1.2rem;
            width: 100%;
        }

        @media (min-width: 768px) {
            .vlk-diagrams-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.2rem;
                margin-bottom: 1.4rem;
            }
        }

        .vlk-diagram-card {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 0.9rem 0.85rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow: hidden;
        }

        .vlk-diag-header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 0.65rem;
            padding-bottom: 0.45rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.15);
            gap: 0.35rem;
        }

        .vlk-diag-title {
            font-weight: 800;
            font-size: 0.95rem;
            color: #f8fafc;
        }

        .vlk-diag-tag {
            font-size: 0.74rem;
            font-weight: 700;
            padding: 0.15rem 0.45rem;
            border-radius: 6px;
        }

        .vlk-diag-svg-wrap {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.35rem 0 0.75rem;
        }

        .vlk-diag-svg {
            width: 100%;
            max-width: 380px;
            height: auto;
            display: block;
        }

        .vlk-diag-notes {
            font-size: 0.84rem;
            color: #cbd5e1;
            line-height: 1.5;
            background: rgba(30, 41, 59, 0.6);
            padding: 0.65rem 0.75rem;
            border-radius: 10px;
            margin-top: auto;
        }

        /* Trick Card */
        .vlk-pinch-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 1.5px solid rgba(251, 191, 36, 0.4);
            border-radius: 16px;
            padding: 1rem 0.9rem;
            margin-bottom: 1.2rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }

        .vlk-pinch-title {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            font-weight: 900;
            font-size: 1.02rem;
            color: #fbbf24;
            margin-bottom: 0.5rem;
        }

        .vlk-pinch-body {
            font-size: 0.86rem;
            color: #cbd5e1;
            line-height: 1.5;
            margin-bottom: 0.75rem;
        }

        .vlk-pinch-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.65rem;
        }

        @media (min-width: 640px) {
            .vlk-pinch-card {
                padding: 1.2rem 1.4rem;
            }
            .vlk-pinch-title {
                font-size: 1.15rem;
            }
            .vlk-pinch-body {
                font-size: 0.92rem;
            }
            .vlk-pinch-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.9rem;
            }
        }

        .vlk-pinch-item {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            padding: 0.75rem 0.85rem;
        }

        .vlk-bilingual-box {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            padding: 0.85rem 1rem;
            font-size: 0.85rem;
            color: #cbd5e1;
            line-height: 1.5;
            margin-top: 0.5rem;
        }

        .vlk-bilingual-title {
            font-weight: 800;
            color: #38bdf8;
            margin-bottom: 0.35rem;
            font-size: 0.92rem;
        }

        .vlk-zh-block {
            margin-bottom: 0.45rem;
            color: #f8fafc;
        }

        .vlk-da-block {
            color: #94a3b8;
            font-size: 0.82rem;
            border-top: 1px solid rgba(148, 163, 184, 0.15);
            padding-top: 0.45rem;
        }

        /* Listening Quiz */
        .vlk-quiz-card {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 1.25rem 1rem;
            text-align: center;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            max-width: 680px;
            margin: 0 auto;
        }

        .vlk-quiz-status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.6rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.15);
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 700;
        }

        .vlk-play-sound-btn {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            border: none;
            color: #ffffff;
            padding: 0.85rem 1.6rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 0.98rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
            margin: 0.5rem 0 1.3rem;
        }

        .vlk-play-sound-btn:hover {
            transform: scale(1.03);
            box-shadow: 0 6px 20px rgba(2, 132, 199, 0.45);
        }

        .vlk-quiz-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
            margin-bottom: 1.2rem;
        }

        .vlk-quiz-opt {
            background: rgba(30, 41, 59, 0.8);
            border: 2px solid rgba(148, 163, 184, 0.3);
            border-radius: 14px;
            padding: 0.9rem 0.65rem;
            color: #f8fafc;
            font-size: 1.15rem;
            font-weight: 900;
            cursor: pointer;
            transition: all 0.18s ease;
            text-align: center;
        }

        .vlk-quiz-opt:hover:not(:disabled) {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
            transform: translateY(-2px);
        }

        .vlk-quiz-opt.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #86efac !important;
        }

        .vlk-quiz-opt.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }

        .vlk-quiz-feedback {
            min-height: 52px;
            padding: 0.65rem 0.85rem;
            border-radius: 12px;
            margin-bottom: 1.1rem;
            font-size: 0.88rem;
            line-height: 1.45;
            display: none;
        }

        .vlk-quiz-feedback.show {
            display: block;
        }

        .vlk-quiz-feedback.success {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #86efac;
        }

        .vlk-quiz-feedback.error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid #ef4444;
            color: #fca5a5;
        }

        /* Speech Card */
        .vlk-speech-card {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 1.25rem 1rem;
            text-align: center;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            max-width: 680px;
            margin: 0 auto;
        }

        .vlk-speech-meta-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.85rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.15);
            font-size: 0.82rem;
            color: #94a3b8;
            font-weight: 700;
        }

        .vlk-speech-prompt {
            font-size: 1.35rem;
            font-weight: 900;
            color: #ffffff;
            margin: 0.6rem 0 0.35rem;
            line-height: 1.35;
        }

        .vlk-speech-sub {
            font-size: 0.88rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
        }

        .vlk-target-word {
            display: inline-block;
            padding: 0.15rem 0.45rem;
            border-radius: 8px;
            margin: 0 0.15rem;
        }

        .vlk-target-word.word-primary {
            background: rgba(56, 189, 248, 0.2);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.4);
        }

        .vlk-target-word.word-secondary {
            background: rgba(244, 114, 182, 0.2);
            color: #f472b6;
            border: 1px solid rgba(244, 114, 182, 0.4);
        }

        .vlk-mic-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.1rem;
        }

        .vlk-listen-model-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.35);
            color: #f8fafc;
            padding: 0.65rem 1.15rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
        }

        .vlk-listen-model-btn:hover {
            background: rgba(51, 65, 85, 0.95);
            border-color: #38bdf8;
        }

        .vlk-mic-btn {
            width: 66px;
            height: 66px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            border: 3px solid rgba(255, 255, 255, 0.25);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.22s ease;
            box-shadow: 0 4px 18px rgba(239, 68, 68, 0.4);
            position: relative;
        }

        .vlk-mic-btn:hover {
            transform: scale(1.06);
            box-shadow: 0 6px 24px rgba(239, 68, 68, 0.55);
        }

        .vlk-mic-btn.listening {
            animation: pulseRecord 1.4s infinite;
            background: #b91c1c;
            border-color: #fca5a5;
        }

        @keyframes pulseRecord {
            0% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            }
            70% {
                box-shadow: 0 0 0 16px rgba(239, 68, 68, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            }
        }

        .vlk-speech-status {
            font-size: 0.86rem;
            color: #94a3b8;
            margin-bottom: 0.9rem;
            min-height: 20px;
        }

        .vlk-speech-feedback-box {
            background: rgba(15, 23, 42, 0.75);
            border: 1.5px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            padding: 0.85rem 1rem;
            font-size: 0.88rem;
            line-height: 1.5;
            text-align: left;
            margin-bottom: 1.1rem;
            display: none;
        }

        .vlk-speech-feedback-box.show {
            display: block;
        }

        .vlk-streak-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: rgba(250, 204, 21, 0.18);
            border: 1px solid #facc15;
            color: #fde68a;
            padding: 0.25rem 0.65rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.78rem;
            margin-bottom: 0.85rem;
        }

        .vlk-nav-row {
            display: flex;
            justify-content: space-between;
            gap: 0.65rem;
            margin-top: 1.2rem;
            padding-top: 0.85rem;
            border-top: 1px solid rgba(148, 163, 184, 0.15);
        }

        .vlk-nav-btn {
            flex: 1;
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.3);
            color: #f8fafc;
            padding: 0.55rem 0.85rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.84rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }

        .vlk-nav-btn:hover:not(:disabled) {
            background: rgba(51, 65, 85, 0.95);
            border-color: #38bdf8;
        }

        .vlk-nav-btn:disabled {
            opacity: 0.45;
            cursor: not-allowed;
        }
    `;
    viewContainer.appendChild(style);

    // SVG Helper Icons
    const SVG_SPEAKER = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    const SVG_MIC = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;

    // TTS Helper
    function speakWord(text, rate = 0.85) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'da-DK';
        utter.rate = rate;
        window.speechSynthesis.speak(utter);
    }

    // --- SOUND MODULES CONFIGURATION ---
    const SOUND_MODULES = [
        {
            id: 'l_vs_n',
            titleDa: 'L vs. N',
            titleZh: '边音 /l/ 与鼻音 /n/',
            badge: '核心对比',
            status: 'active',
            descDa: 'I mange sydkinesiske dialekter forveksles eller sammenfalder /l/ og /n/. På dansk er forskellen afgørende: "læse" vs. "næse", "lys" vs. "nys".',
            descZh: '在许多南方汉语方言（粤语、西南官话、闽南语、吴语等）中，/l/ 与 /n/ 常常混淆甚至合并（蓝/男不分）。丹麦语中两者是绝对区别意义的音位。',
            heroTitleZh: '中国学习者难点发音：边音 /l/ vs. 鼻音 /n/',
            heroSubZh: '侧音 /l/ 与鼻音 /n/ 发音对比、辨音与跟读口语训练 (Lateral vs. Nasal)'
        },
        {
            id: 'bloedt_d',
            titleDa: 'Blødt d [ð]',
            titleZh: '软 d [ð] 发音',
            badge: '核心难点',
            status: 'active',
            descDa: 'Det bløde danske d som i "mad", "brød" og "hvid" findes ikke i kinesisk og forveksles ofte med [l], [j] eller et hårdt d.',
            descZh: '丹麦语软 d [ð]（如 brød, mad, hvid）在汉语中完全缺失，极易被误读为 l（如 brøl）、y 或硬 d。舌尖必须贴放下齿背，切勿向上接触齿龈！',
            heroTitleZh: '中国学习者核心难点：丹麦语软 d [ð] 专项突破',
            heroSubZh: '下齿背固舌发音法、与 [l]/[d] 辨音对比及跟读实战 (Danish Soft D)'
        },
        {
            id: 'dansk_r',
            titleDa: 'Dansk r [ʁ]',
            titleZh: '小舌擦音 r [ʁ]',
            badge: '小舌发音',
            status: 'active',
            descDa: 'Det danske r udtales dybt nede i svælget ved drøblen, modsat det kinesiske r (rén) som er en retrofleks lyd forrest i munden.',
            descZh: '汉语拼音 r（人 rén、日 rì）是舌尖向上卷起的前部卷舌音；而丹麦语 r [ʁ] 则是咽腔深处小舌附近的喉音擦音！舌尖必须完全平放放松。',
            heroTitleZh: '中国学习者喉音难点：丹麦语小舌音 r [ʁ] 专项突破',
            heroSubZh: '深喉小舌气流振动、告别卷舌音干扰与跟读训练 (Danish Uvular R)'
        },
        {
            id: 'udlyd',
            titleDa: 'Udlyd (-st, -lt, -kt)',
            titleZh: '词尾辅音群',
            badge: '辅音闭锁',
            status: 'active',
            descDa: 'Kinesiske stavelser slutter kun på vokaler eller -n/-ng. Danske konsonantsammenstød i slutningen af ord (kold, koldt, fast) kræver særskilt træning mod "slugte" lyde eller ekstra vokaler.',
            descZh: '汉语普通话音节仅能以元音或 -n / -ng 结尾。初学者读丹麦语词尾的辅音群（-lt, -st, -kt, -sk 如 koldt, fast, tekst）时极易漏读或多加元音“-e”。',
            heroTitleZh: '中国学习者结构难点：词尾辅音群与闭锁音突破',
            heroSubZh: '告别吞音与额外尾元音、干净利落双辅音收尾训练 (Consonant Clusters)'
        }
    ];

    // --- MODULE DATA DICTIONARIES ---
    const MODULE_DATA = {
        l_vs_n: {
            defaultTarget: 'l',
            subControls: {
                labelZh: '选择要探索的发音：',
                options: [
                    { id: 'l', label: '🌊 边音 L /l/', sub: '(侧音 Lateral)', activeClass: 'active-primary' },
                    { id: 'n', label: '🌸 鼻音 N /n/', sub: '(鼻音 Nasal)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isL = target === 'l';
                return {
                    title: '视角 1: 侧面剖面图 (矢状面)',
                    tag: isL ? '软腭升起 • 封闭鼻腔' : '软腭下垂 • 开放鼻腔',
                    tagStyle: isL ? 'background:rgba(56,189,248,0.2); color:#38bdf8;' : 'background:rgba(244,114,182,0.2); color:#f472b6;',
                    svg: generateSagittalLVsnSvg(target),
                    notes: isL 
                        ? '<strong>发音原理 (Why):</strong><br>舌尖轻触上齿龈中央，但<strong>软腭升起</strong>并紧贴咽后壁，彻底阻断鼻腔通路。所有声波与气流必须100%从口腔两侧流出。'
                        : '<strong>发音原理 (Why):</strong><br>舌尖与上齿龈前部紧贴形成闭锁屏障。<strong>软腭下垂</strong>，口腔完全受阻，所有声波与气流全部冲向鼻腔引起共鸣。'
                };
            },
            diagCard2: (target) => {
                const isL = target === 'l';
                return {
                    title: '视角 2: 上齿弓与舌面 (俯视气流通道)',
                    tag: isL ? '舌侧双通道敞开' : '马蹄形严密闭锁',
                    tagStyle: isL ? 'background:rgba(56,189,248,0.2); color:#38bdf8;' : 'background:rgba(244,114,182,0.2); color:#f472b6;',
                    svg: generateTopDownLVsnSvg(target),
                    notes: isL
                        ? '<strong>侧音的核心奥秘 (Lateral):</strong><br>舌身两侧自然下垂，<strong>远离上磨牙</strong>。蓝色虚线箭头展示气流如同两条小溪般从舌身两侧与两腮之间顺畅流出！'
                        : '<strong>鼻音的完全封闭 (Nasal):</strong><br>舌面紧贴整个上齿弓前沿，严禁气流从嘴角侧面漏出，强行迫使气流全部通过鼻腔振动流出。'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>👃</span>
                    <span>实用自检绝招：捏鼻快速测试法 (一秒自检发音部位)</span>
                </div>
                <div class="vlk-pinch-body">
                    用食指和拇指捏紧鼻孔，同时发出持续的长音：
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #38bdf8; margin-bottom: 0.25rem;">当你发 "Lllll..." 时：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            声音<strong>完全不受任何影响，顺畅持续发出</strong>！因为气流完全从舌头两侧的口腔溜走，鼻孔闭塞对它毫无影响。
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #f472b6; margin-bottom: 0.25rem;">当你发 "Nnnnn..." 时：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            声音<strong>会瞬间憋闷甚至被迫中断</strong>！因为口腔本来就被舌头封死了，此时再堵住鼻子，空气无路可走，发音立刻停止。
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Fonetisk vejledning)</div>
                <div class="vlk-zh-block">
                    <strong>边音 /l/ (丹麦语 L):</strong> 舌尖轻触上齿龈中央，<strong>舌身两侧必须自然下垂，离开上磨牙</strong>。气流由舌头两侧顺畅流出（侧向气流）。软腭升起切断鼻腔通路，发音清脆、无鼻音。<br>
                    <strong>鼻音 /n/ (丹麦语 N):</strong> 舌尖及舌边与整个上齿龈形成<strong>完整闭锁</strong>，口腔通路被完全阻断。软腭下垂，气流必须完全经由鼻腔震动流出，具有明显鼻音。
                </div>
                <div class="vlk-da-block">
                    💡 <em>中国学生自检要点：</em> 说“lys（光）”或“læse（读）”时，如果你的舌侧碰到了大牙（磨牙），就会不由自主发成鼻音 /n/！请务必放松两腮，让风从嘴角两侧吹出来。
                </div>
            `,
            minimalPairs: [
                { l: 'læse', n: 'næse', contextL: 'Hun vil læse en bog', contextN: 'Puds din næse', meanL_zh: '阅读 (læse)', meanN_zh: '鼻子 (næse)' },
                { l: 'lys', n: 'nys', contextL: 'Tænd et lys', contextN: 'Han slog et nys', meanL_zh: '光 / 蜡烛 (lys)', meanN_zh: '喷嚏 (nys)' },
                { l: 'lave', n: 'nave', contextL: 'Vi vil lave mad', contextN: 'Hjulets nave', meanL_zh: '做 / 制作 (lave)', meanN_zh: '轮毂 (nave)' },
                { l: 'lille', n: 'Nille', contextL: 'En lille kat', contextN: 'Pigen hedder Nille', meanL_zh: '小的 (lille)', meanN_zh: '人名 (Nille)' },
                { l: 'lås', n: 'nås', contextL: 'En stærk lås', contextN: 'Bussen kan nås', meanL_zh: '锁 (lås)', meanN_zh: '能赶上 (nås)' },
                { l: 'male', n: 'mane', contextL: 'Male et hus', contextN: 'Mane til ro', meanL_zh: '画画/刷漆 (male)', meanN_zh: '告诫/唤醒 (mane)' },
                { l: 'lam', n: 'nam', contextL: 'Et lille lam', contextN: 'Mums nam nam', meanL_zh: '羊羔 (lam)', meanN_zh: '拟声词 (nam)' },
                { l: 'kold', n: 'kone', contextL: 'Vinteren er kold', contextN: 'Hans søde kone', meanL_zh: '冷的 (kold [l])', meanN_zh: '妻子 (kone [n])' }
            ],
            speechExercises: [
                { text: 'Lise laver linsesuppe', targetSound: 'l', type: 'alliteration', targetWords: ['lise', 'laver', 'linsesuppe'], hintDa: '3 × L! Hold tungens sider åbne hele vejen: Lise - laver - linsesuppe.', hintZh: '连续3个 /l/ 边音（Lise - laver - linsesuppe）：舌侧保持完全通气，切勿漏气到鼻腔。' },
                { text: 'Nissens næse nyser', targetSound: 'n', type: 'alliteration', targetWords: ['nissens', 'næse', 'nyser'], hintDa: '3 × N! Forsegl munden helt foran ved hvert ord, så al luft passerer næsen.', hintZh: '连续3个 /n/ 鼻音（Nissens - næse - nyser）：舌尖紧贴上齿龈，全部气流通过鼻腔振动发出。' },
                { text: 'Lasse læser lektier', targetSound: 'l', type: 'alliteration', targetWords: ['lasse', 'læser', 'lektier'], hintDa: '3 × L: Åbne mundvige og lateralt luftslip i kinderne.', hintZh: '连续3个 /l/ 边音（Lasse - læser - lektier）：气流从两腮冲出。' },
                { text: 'Nanna napper nødder', targetSound: 'n', type: 'alliteration', targetWords: ['nanna', 'napper', 'nødder'], hintDa: '3 × N: Mærk den kraftige nasale vibration i næseryggen ved hvert ord.', hintZh: '连续3个 /n/ 鼻音（Nanna - napper - nødder）：按住鼻翼感受每次发音的鼻腔震颤。' },
                { text: 'Lene låner lygten', targetSound: 'l', type: 'alliteration', targetWords: ['lene', 'låner', 'lygten'], hintDa: '3 × L: Hæv ganesejlet og luk helt af for næsehulen.', hintZh: '连续3个 /l/ 边音（Lene - låner - lygten）：软腭完全闭锁鼻咽通路。' },
                { text: 'Ni nisser nynner', targetSound: 'n', type: 'alliteration', targetWords: ['ni', 'nisser', 'nynner'], hintDa: '3 × N: Rolig, klangfuld næselyd hele vejen igennem.', hintZh: '连续3个 /n/ 鼻音（Ni - nisser - nynner）：发出饱满集中的鼻音共鸣。' },
                { text: 'Niels tænder lyset', targetSound: 'contrast', type: 'contrast', targetWords: ['niels', 'lyset'], hintDa: 'Kontrast (N ➔ L): Start med nasal N i "Niels", og skift til rent lateralt luftslip i "lyset"!', hintZh: '边音/鼻音钟摆挑战（N ➔ L）：从 Niels 的紧贴鼻音，瞬间切换为 lyset 的侧边流气！' },
                { text: 'Lise pudser næsen', targetSound: 'contrast', type: 'contrast', targetWords: ['lise', 'næsen'], hintDa: 'Kontrast (L ➔ N): Start med lateral L i "Lise", og luk tæt for munden i "næsen"!', hintZh: '边音/鼻音钟摆挑战（L ➔ N）：从 Lise 的侧流气，转换为 næsen 的封闭鼻音！' }
            ]
        },

        bloedt_d: {
            defaultTarget: 'soft_d',
            subControls: {
                labelZh: '选择要探索的发音角度：',
                options: [
                    { id: 'soft_d', label: '🍃 软 d [ð] 正确发音', sub: '(舌尖贴放下齿背)', activeClass: 'active-primary' },
                    { id: 'hard_d_vs_l', label: '⚡ 与硬 D / L 错误对比', sub: '(切勿接触上齿龈)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isSoftD = target === 'soft_d';
                return {
                    title: '视角 1: 侧面剖面图 (矢状面)',
                    tag: isSoftD ? '舌尖平贴下齿背 • 无爆破' : '错误警示：接触上齿龈',
                    tagStyle: isSoftD ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateSagittalSoftDSvg(target),
                    notes: isSoftD
                        ? '<strong>发音核心原理 (Blødt d):</strong><br>舌尖<strong>牢牢贴在下排门牙背面</strong>，舌面微微隆起但<strong>绝对不碰上牙龈</strong>！气流如微风般平滑从舌面与上齿之间滑出（通音/极弱擦音）。软腭升起切断鼻腔。'
                        : '<strong>错误接触与混淆警示：</strong><br>若舌尖向上碰到上牙龈，就会错发成硬 D [d]（产生爆破停顿）或边音 L [l]（把 <em>brød</em> 念成 <em>brøl</em>，把 <em>mad</em> 念成 <em>mal</em>）。牢记：舌尖决不上翘！'
                };
            },
            diagCard2: (target) => {
                const isSoftD = target === 'soft_d';
                return {
                    title: '视角 2: 正面口腔与齿隙气流',
                    tag: isSoftD ? '上下齿隙平稳送风' : '舌头顶起阻碍通道',
                    tagStyle: isSoftD ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateFrontalSoftDSvg(target),
                    notes: isSoftD
                        ? '<strong>正面气流形态：</strong><br>上下门牙微张约2毫米，舌面如平缓斜坡，气流在舌面与门牙刃口之间均匀扩散流出，没有任何塞音爆破阻断。'
                        : '<strong>错误姿态剖析：</strong><br>当舌尖上翘接触上门牙背面时，口腔中间被完全堵住，不是发出硬磕牙的 [d]，就是被迫向两侧漏气变成 [l]。'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>🪞</span>
                    <span>实用自检绝招：下齿背固舌法 (一秒纠正舌位)</span>
                </div>
                <div class="vlk-pinch-body">
                    面对镜子，或者把食指轻贴在下巴正前方：
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #4ade80; margin-bottom: 0.25rem;">正确发音体验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            先发 "ma..."，然后有意识地<strong>把舌尖紧紧贴住下排门牙背面</strong>，不要动！继续呼气滑出："mad..."。舌头完全不向上弹跳，声音自然圆润。
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #f87171; margin-bottom: 0.25rem;">错误警示体验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            如果你感觉舌头向上跳了一下、碰到了上门牙，你读出来的肯定是 "mal"（涂漆）或者硬 "mat"！请立刻重置舌位向下。
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Fonetisk vejledning)</div>
                <div class="vlk-zh-block">
                    <strong>丹麦语软 d [ð]：</strong>它既不是英语中需要把舌头伸出门牙外的咬舌音 "th"，更不是汉语拼音的 d 或 l！其唯一奥秘就是<strong>舌尖向下平放贴紧下齿背</strong>。气流轻柔通畅，没有爆破。<br>
                    <strong>与 L 和硬 D 的区别：</strong>L 和硬 D 舌尖必须向上顶住上牙龈；而软 d 绝对禁止向上碰触！
                </div>
                <div class="vlk-da-block">
                    💡 <em>Dansk pædagogisk råd:</em> Hold tungespidsen nede mod undertænderne. Sig "ma..." og lad luften glide ud som et blødt "d" uden at løfte tungen mod overmunden!
                </div>
            `,
            minimalPairs: [
                { l: 'mad', n: 'mal', contextL: 'Vi spiser god mad', contextN: 'Han vil male huset', meanL_zh: '食物 (mad [ð])', meanN_zh: '刷漆/画 (mal [l])' },
                { l: 'brød', n: 'brøl', contextL: 'Friskbagt rugbrød', contextN: 'Løvens høje brøl', meanL_zh: '面包 (brød [ð])', meanN_zh: '吼叫 (brøl [l])' },
                { l: 'hvid', n: 'hvil', contextL: 'En hvid skjorte', contextN: 'Tag et lille hvil', meanL_zh: '白色 (hvid [ð])', meanN_zh: '休息 (hvil [l])' },
                { l: 'gade', n: 'gale', contextL: 'Bo på samme gade', contextN: 'De gale hunde', meanL_zh: '街道 (gade [ð])', meanN_zh: '疯狂的 (gale [l])' },
                { l: 'rød', n: 'rør', contextL: 'En rød cykel', contextN: 'Rør ved mig', meanL_zh: '红色 (rød [ð])', meanN_zh: '管子/触摸 (rør [ɐ̯])' },
                { l: 'bade', n: 'bale', contextL: 'Bade i havet', contextN: 'Bale med tunge kasser', meanL_zh: '洗澡/游泳 (bade [ð])', meanN_zh: '搬动挣扎 (bale [l])' },
                { l: 'sidde', n: 'silde', contextL: 'Sidde på stolen', contextN: 'Komme silde (for sent)', meanL_zh: '坐下 (sidde [ð])', meanN_zh: '迟晚 (silde [l])' },
                { l: 'lød', n: 'løn', contextL: 'Det lød smukt', contextN: 'Få en god løn', meanL_zh: '听起来 (lød [ð])', meanN_zh: '工资 (løn [n])' }
            ],
            speechExercises: [
                { text: 'Mads spiser varm mad', targetSound: 'ð', type: 'alliteration', targetWords: ['mads', 'spiser', 'mad'], hintDa: 'Hold tungespidsen nede bag undertænderne i "Mads" og "mad"!', hintZh: '“Mads” 和 “mad”：舌尖牢牢压在下齿背，不可上翘碰上牙！' },
                { text: 'Gitte går på gaden', targetSound: 'ð', type: 'alliteration', targetWords: ['gitte', 'går', 'gaden'], hintDa: 'Gaden [gæːðə] — blødt d midt i ordet uden lukke.', hintZh: '“gaden” 词中的软 d：平滑过渡，切勿发出硬磕牙的爆破音。' },
                { text: 'Vi bager hvidt brød', targetSound: 'ð', type: 'alliteration', targetWords: ['bager', 'hvidt', 'brød'], hintDa: 'Hvidt og brød — to bløde d-ord. Mærk at tungen ikke rører overmunden.', hintZh: '“hvidt” 和 “brød”：两处软 d，绝不能读成 “brøl” 边音！' },
                { text: 'En rød båd sejler', targetSound: 'ð', type: 'alliteration', targetWords: ['rød', 'båd', 'sejler'], hintDa: 'Rød [ʁœð] og båd [bɔːð] — to vigtige bløde d-ord.', hintZh: '“rød” 和 “båd”：轻柔送气，下齿背固舌。' },
                { text: 'Mads vil gerne bade', targetSound: 'ð', type: 'alliteration', targetWords: ['mads', 'gerne', 'bade'], hintDa: 'Mads og bade — blødt og afslappet.', hintZh: '“bade” [bæːðə]：双唇张开，舌头贴于下齿。' },
                { text: 'Sid ned og hvil dig', targetSound: 'contrast', type: 'contrast', targetWords: ['sid', 'hvil'], hintDa: 'Kontrast: "Sid" [ð] (tunge nede) vs. "hvil" [l] (tunge oppe)!', hintZh: '钟摆对比：“sid” 软 d（舌头向下）切换到 “hvil” 边音 L（舌尖向上）！' },
                { text: 'Hunden bider i maden', targetSound: 'ð', type: 'alliteration', targetWords: ['hunden', 'bider', 'maden'], hintDa: 'Bider og maden — to bløde d-lyde i træk.', hintZh: '“bider” 与 “maden”：连贯的两个软 d 发音。' },
                { text: 'Maler maden rød og hvid', targetSound: 'contrast', type: 'contrast', targetWords: ['maler', 'maden', 'rød', 'hvid'], hintDa: 'Kontrast: "Maler" [l] efterfølges af 3 bløde d-ord ("maden rød og hvid")!', hintZh: '终极挑战：Maler（舌尖向上 L）紧接3个软 d 单词（maden rød hvid，舌尖贴下齿背）！' }
            ]
        },

        dansk_r: {
            defaultTarget: 'danish_r',
            subControls: {
                labelZh: '选择要探索的发音角度：',
                options: [
                    { id: 'danish_r', label: '🦅 丹麦语 r [ʁ] 正确发音', sub: '(小舌喉音擦音)', activeClass: 'active-primary' },
                    { id: 'chinese_r', label: '⚡ 与汉语卷舌 r 对比', sub: '(切勿向上卷舌)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isDanishR = target === 'danish_r';
                return {
                    title: '视角 1: 侧面剖面图 (矢状面)',
                    tag: isDanishR ? '咽腔小舌处收缩摩擦' : '错误警示：舌尖向前卷起',
                    tagStyle: isDanishR ? 'background:rgba(250,204,21,0.2); color:#facc15;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateSagittalDanskRSvg(target),
                    notes: isDanishR
                        ? '<strong>小舌擦音核心原理 (Uvulær [ʁ]):</strong><br>舌根后缩向小舌（悬雍垂）靠拢形成窄缝，气流在咽腔深处摩擦流出。<strong>舌尖完全平放放松在口腔底部</strong>，绝不参与发音！'
                        : '<strong>汉语卷舌音干扰警示：</strong><br>汉语拼音 r（人 rén）是舌尖翘起碰硬腭的前部卷舌音；如果把这个习惯带入丹麦语，发音会显得极其生硬怪异。丹麦语 r 根本不卷舌！'
                };
            },
            diagCard2: (target) => {
                const isDanishR = target === 'danish_r';
                return {
                    title: '视角 2: 咽腔与小舌振动透视图',
                    tag: isDanishR ? '深喉小舌气流通道' : '前部口腔空洞阻塞',
                    tagStyle: isDanishR ? 'background:rgba(250,204,21,0.2); color:#facc15;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateThroatRSvg(target),
                    notes: isDanishR
                        ? '<strong>喉腔深处气流动力学：</strong><br>声带振动伴随小舌悬垂附近的柔和摩擦波，气流直接顺着咽管升入口腔并毫无阻碍地排出。'
                        : '<strong>部位完全错位：</strong><br>卷舌会导致喉部完全没有小舌摩擦，声音能量集中在门牙后面，完全失去了丹麦语小舌音的深沉质感。'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>🚰</span>
                    <span>实用自检绝招：无水小舌漱口法 (激活深喉肌肉)</span>
                </div>
                <div class="vlk-pinch-body">
                    身体稍微后仰，将两根手指轻贴在喉结上方：
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #facc15; margin-bottom: 0.25rem;">深喉小舌激活步骤：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            想象你在用漱口水仰头漱口（但不用水），或者轻轻发出喝水咕噜咕噜时的喉咙共鸣声。感受<strong>小舌在喉咙深处的微微振颤</strong>。这就是丹麦语 r 的发音点！
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #38bdf8; margin-bottom: 0.25rem;">舌尖防卷自检：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            发音时，用手指触摸嘴唇前方：如果嘴唇向前撅起或舌尖翘在门牙后，立刻打住！把舌尖完全平铺在口腔底部，只让喉咙深处振动。
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Fonetisk vejledning)</div>
                <div class="vlk-zh-block">
                    <strong>丹麦语 r [ʁ]：</strong>它是一个小舌音（uvulær lyd），与法语的 r 类似。它的发音器官在最深处的小舌，而舌尖完全处于被动休眠状态。<br>
                    <strong>切勿与汉语拼音 r 混淆：</strong>汉语拼音 r 是前口腔卷舌音，丹麦语是深喉小舌音。发丹麦语 r 时，舌尖决不上卷。
                </div>
                <div class="vlk-da-block">
                    💡 <em>Dansk pædagogisk råd:</em> Lad tungespidsen hvile helt fladt i bunden af munden. Træk tungeroden tilbage mod drøblen og mærk en blød, dyb friktion i svælget!
                </div>
            `,
            minimalPairs: [
                { l: 'rive', n: 'live', contextL: 'Rive i haven med riven', contextN: 'Se fodboldkampen live', meanL_zh: '耙地/撕裂 (rive [ʁ])', meanN_zh: '现场直播 (live [l])' },
                { l: 'ret', n: 'let', contextL: 'En lækker ret mad', contextN: 'En let og nem opgave', meanL_zh: '菜肴/正确 (ret [ʁ])', meanN_zh: '容易/轻的 (let [l])' },
                { l: 'rød', n: 'død', contextL: 'En rød cykel', contextN: 'Blomsten er død', meanL_zh: '红色的 (rød [ʁ])', meanN_zh: '死亡的 (død [d])' },
                { l: 'rose', n: 'lose', contextL: 'En smuk rød rose', contextN: 'Lose et vigtigt spil', meanL_zh: '玫瑰花 (rose [ʁ])', meanN_zh: '输掉比赛 (lose [l])' },
                { l: 'rende', n: 'lande', contextL: 'Rende stærkt', contextN: 'Flyet vil lande', meanL_zh: '奔跑飞奔 (rende [ʁ])', meanN_zh: '着陆降落 (lande [l])' },
                { l: 'rakke', n: 'lakke', contextL: 'Rakke ned på andre', contextN: 'Lakke mod enden', meanL_zh: '贬低贬损 (rakke [ʁ])', meanN_zh: '接近尾声 (lakke [l])' },
                { l: 'ringe', n: 'linge', contextL: 'Ringe med telefonen', contextN: 'Linge med snor', meanL_zh: '打电话/戒指 (ringe [ʁ])', meanN_zh: '绳结束缚 (linge [l])' },
                { l: 'rask', n: 'vask', contextL: 'Sund og rask person', contextN: 'Vask dine hænder', meanL_zh: '健康的 (rask [ʁ])', meanN_zh: '洗手/水池 (vask [v])' }
            ],
            speechExercises: [
                { text: 'Rikke rider på hesten', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rikke', 'rider', 'hesten'], hintDa: 'To r-ord i træk: Rikke rider — dyb klang ved drøblen!', hintZh: '连续两个首字母小舌 r（Rikke - rider）：在小舌处平滑震颤。' },
                { text: 'Rene roser i regnen', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rene', 'roser', 'regnen'], hintDa: 'Tre r-ord: Rene, roser, regnen — ingen tungespidsløft!', hintZh: '连续三个小舌 r 音（Rene - roser - regnen）：舌尖平放放松，深喉送气。' },
                { text: 'Rune ringer til Rita', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rune', 'ringer', 'rita'], hintDa: 'Tre r-lyde i træk: Rune ringer til Rita.', hintZh: '姓名与动词三个 r 音（Rune - ringer - Rita）。' },
                { text: 'Lasse og Rikke løber', targetSound: 'contrast', type: 'contrast', targetWords: ['lasse', 'rikke', 'løber'], hintDa: 'Kontrast: Lasse [l] (foran) vs. Rikke [ʁ] (bagtil) vs. løber [l]!', hintZh: '钟摆对比：Lasse（前部 L）➔ Rikke（深喉 r）➔ løber（前部 L）！' },
                { text: 'Røde ræve i skoven', targetSound: 'ʁ', type: 'alliteration', targetWords: ['røde', 'ræve', 'skoven'], hintDa: 'Røde ræve — mærk vibrationen dybt i halsen.', hintZh: '“Røde ræve”：感受喉咙深处的小舌震颤。' },
                { text: 'Rasmus river haven', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rasmus', 'river', 'haven'], hintDa: 'Rasmus river — fast greb om drøbel-lyden.', hintZh: '“Rasmus river”：小舌擦音平稳发出。' },
                { text: 'Rejsen til Rønne', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rejsen', 'rønne'], hintDa: 'Rejsen til Rønne — Bornholms hovedby begynder med R!', hintZh: '“Rejsen til Rønne”：旅行到博恩霍姆岛首府 Rønne。' },
                { text: 'Rask i regn og rusk', targetSound: 'ʁ', type: 'alliteration', targetWords: ['rask', 'regn', 'rusk'], hintDa: 'Fire gange r i samme sætning!', hintZh: '连珠炮挑战（rask - regn - rusk）：4个 r 音一气呵成！' }
            ]
        },

        udlyd: {
            defaultTarget: 'clean_cluster',
            subControls: {
                labelZh: '选择要探索的发音角度：',
                options: [
                    { id: 'clean_cluster', label: '🧱 干净利落收尾 (-lt, -st, -kt)', sub: '(闭锁音及时切断)', activeClass: 'active-primary' },
                    { id: 'vowel_error', label: '⚡ 与多加尾音错误对比', sub: '(切勿多加元音“-e”)', activeClass: 'active-secondary' }
                ]
            },
            diagCard1: (target) => {
                const isClean = target === 'clean_cluster';
                return {
                    title: '视角 1: 辅音簇连缀与闭锁时序图',
                    tag: isClean ? '瞬时闭锁 • 立即断音' : '错误警示：拖沓释放尾音',
                    tagStyle: isClean ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateClusterTimingSvg(target),
                    notes: isClean
                        ? '<strong>精准闭锁时序：</strong><br>从元音无缝滑入第一个辅音（如 [l] 或 [s]），紧接着迅速过渡到第二个辅音（如 [d] 或 [t]）完成齿龈闭锁。在闭锁瞬间<strong>立即切断声带振动与气流</strong>！'
                        : '<strong>典型错误剖析 (Epentese):</strong><br>汉语母语者读完 -ldt 或 -st 后，习惯性地将嘴巴微张，多带出一小口气，变成错误的 <em>koldt-e</em> 或 <em>fast-e</em>。这会直接改变词性和语法！'
                };
            },
            diagCard2: (target) => {
                const isClean = target === 'clean_cluster';
                return {
                    title: '视角 2: 声学波形收尾切断对比',
                    tag: isClean ? '方波式利落停顿' : '拖尾杂音共鸣',
                    tagStyle: isClean ? 'background:rgba(34,197,94,0.2); color:#4ade80;' : 'background:rgba(239,68,68,0.2); color:#f87171;',
                    svg: generateWaveformStopSvg(target),
                    notes: isClean
                        ? '<strong>声学特征：</strong><br>正确的丹麦语尾音在闭锁时刻波形能量骤降至零，没有余音缭绕，如同干净的刹车。'
                        : '<strong>错误波形：</strong><br>若多加了元音，在辅音后面会出现额外的低能量元音共振峰，听起来拖泥带水。'
                };
            },
            pinchCardHtml: `
                <div class="vlk-pinch-title">
                    <span>✋</span>
                    <span>实用自检绝招：手掌阻风闭气法 (一秒测出是否漏气)</span>
                </div>
                <div class="vlk-pinch-body">
                    将手掌垂直竖起，放置在嘴唇正前方约 2–3 厘米处：
                </div>
                <div class="vlk-pinch-grid">
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #4ade80; margin-bottom: 0.25rem;">正确停顿检验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            大声读出 "koldt" 或 "fast"。在词尾辅音到位的瞬间<strong>气流立即截断</strong>。手掌在发音结束后感受不到任何随后的温热微风。
                        </div>
                    </div>
                    <div class="vlk-pinch-item">
                        <div style="font-weight: 800; color: #f87171; margin-bottom: 0.25rem;">多加元音检验：</div>
                        <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.45;">
                            如果手掌在词尾感受到了噗的一声多余气流吹出，说明你多读了一个 "-e"（变成了 fast-e）！请练习让舌头停在齿龈上不松开。
                        </div>
                    </div>
                </div>
            `,
            bilingualGuideHtml: `
                <div class="vlk-bilingual-title">中文发音核心要诀 (Fonetisk vejledning)</div>
                <div class="vlk-zh-block">
                    <strong>词尾辅音群（Udlyd）：</strong>汉语普通话仅允许 -n, -ng 结尾，因此中国人学丹麦语最大的两大陷阱：一是吞掉尾辅音（把 kold 念成 kå），二是多加弱读元音（把 fast 念成 fast-e）。<br>
                    <strong>语法重要性：</strong>丹麦语中 -t 往往代表中性形容词（kold 阳性 vs. koldt 中性）或完成分词，漏读或多读会直接导致语法混乱！
                </div>
                <div class="vlk-da-block">
                    💡 <em>Dansk pædagogisk råd:</em> Luk munden præcist på den sidste konsonant. Stop luften øjeblikkeligt uden at tilføje et ekstra pust eller en "e"-lyd til sidst!
                </div>
            `,
            minimalPairs: [
                { l: 'kold', n: 'koldt', contextL: 'En kold dag', contextN: 'Et koldt glas mælk', meanL_zh: '单辅音 -ld (kold [l])', meanN_zh: '辅音簇 -ldt (koldt [lˀd])' },
                { l: 'lys', n: 'lyst', contextL: 'Tænd et lys', contextN: 'Et lyst værelse', meanL_zh: '单辅音 -s (lys [s])', meanN_zh: '辅音簇 -st (lyst [sd])' },
                { l: 'ven', n: 'vent', contextL: 'Min gode ven', contextN: 'Vent et øjeblik', meanL_zh: '鼻音 -n (ven [n])', meanN_zh: '辅音簇 -nt (vent [nˀd])' },
                { l: 'hus', n: 'husk', contextL: 'Et stort hus', contextN: 'Husk dine nøgler', meanL_zh: '单辅音 -s (hus [s])', meanN_zh: '辅音簇 -sk (husk [sg])' },
                { l: 'fest', n: 'fed', contextL: 'En sjov fest', contextN: 'Fed mad', meanL_zh: '辅音簇 -st (fest [sd])', meanN_zh: '软 d [ð] (fed [ð])' },
                { l: 'salt', n: 'sal', contextL: 'Drys lidt salt', contextN: 'Bo på 2. sal', meanL_zh: '辅音簇 -lt (salt [lˀd])', meanN_zh: '单辅音 -l (sal [l])' },
                { l: 'fast', n: 'fad', contextL: 'Et fast job', contextN: 'Et stort fad', meanL_zh: '辅音簇 -st (fast [sd])', meanN_zh: '软 d [ð] (fad [ð])' },
                { l: 'saft', n: 'sag', contextL: 'Drik kold saft', contextN: 'En god sag', meanL_zh: '辅音簇 -ft (saft [fd])', meanN_zh: '元音收尾 (sag [w/j])' }
            ],
            speechExercises: [
                { text: 'Et koldt glas mælk', targetSound: 'cluster', type: 'cluster', targetWords: ['koldt', 'glas', 'mælk'], hintDa: 'Koldt (-ldt) og mælk (-lk) — to præcise konsonantklynger uden ekstra "e"!', hintZh: 'koldt (-ldt) 与 mælk (-lk)：两次干净闭锁，严禁读成 “kold-te”！' },
                { text: 'Husk en fast aftale', targetSound: 'cluster', type: 'cluster', targetWords: ['husk', 'fast', 'aftale'], hintDa: 'Husk (-sk) og fast (-st) — skarpt stop for luften.', hintZh: 'husk (-sk) 与 fast (-st)：手掌阻风，瞬间断音。' },
                { text: 'Frisk frugt til frokost', targetSound: 'cluster', type: 'cluster', targetWords: ['frisk', 'frugt', 'frokost'], hintDa: 'Frisk (-sk), frugt (-gt) og frokost (-st) — tre udlydsklynger i træk!', hintZh: '三词连环辅音簇挑战（frisk - frugt - frokost）！' },
                { text: 'Kold vind og lyst vejr', targetSound: 'contrast', type: 'contrast', targetWords: ['kold', 'lyst'], hintDa: 'Kontrast: "Kold" (enkelt -ld) vs. "lyst" (klynge -st)!', hintZh: '单辅音 kold 与复合辅音 lyst 切换对比。' },
                { text: 'Katten sidder helt fast', targetSound: 'cluster', type: 'cluster', targetWords: ['helt', 'fast'], hintDa: 'Helt (-lt) og fast (-st) — kontant afslutning.', hintZh: '“helt” (-lt) 与 “fast” (-st)：干脆利落收声。' },
                { text: 'Kom lidt salt på ægget', targetSound: 'cluster', type: 'cluster', targetWords: ['salt', 'ægget'], hintDa: 'Salt [salˀd] — udtales med stød og t-lukke.', hintZh: '“salt” [salˀd]：有 stød（喉塞音），并在齿龈形成短暂停顿。' },
                { text: 'En rigtig god fest i aften', targetSound: 'cluster', type: 'cluster', targetWords: ['rigtig', 'fest', 'aften'], hintDa: 'Fest (-st) — luk munden kontant.', hintZh: '“fest” [fɛsd]：齿龈紧闭，气流骤停。' },
                { text: 'Læs en kort tekst højt', targetSound: 'cluster', type: 'cluster', targetWords: ['kort', 'tekst', 'højt'], hintDa: 'Kort (-rt) og tekst (-kst) — 3 konsonanter i udlyd!', hintZh: '高难度复合词尾：“kort” (-rt) 与 “tekst” (-kst 三辅音连缀)！' }
            ]
        }
    };

    // --- VECTOR SVG GENERATORS ---

    // Module 1: L vs N Sagittal
    function generateSagittalLVsnSvg(sound) {
        const isL = sound === 'l';
        const primaryColor = isL ? '#38bdf8' : '#f472b6';
        const tonguePath = isL 
            ? 'M 140 240 C 150 185, 175 160, 215 135 C 225 125, 230 110, 235 102 C 220 115, 195 130, 165 170 C 145 195, 135 220, 130 250 Z'
            : 'M 140 240 C 155 180, 185 145, 222 108 C 235 96, 248 94, 255 96 C 240 118, 205 138, 170 178 C 145 205, 135 225, 130 250 Z';

        const velumPath = isL
            ? 'M 175 110 C 190 125, 198 138, 208 145 C 205 148, 195 135, 170 118 Z'
            : 'M 175 110 C 182 135, 186 160, 188 175 C 182 173, 178 150, 170 118 Z';

        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lAirflowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.95"/>
                    </linearGradient>
                    <linearGradient id="nAirflowGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                        <stop offset="0%" stop-color="#f472b6" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#f472b6" stop-opacity="0.95"/>
                    </linearGradient>
                    <filter id="glowAir1" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrowL1" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#38bdf8"/>
                    </marker>
                    <marker id="arrowN1" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#f472b6"/>
                    </marker>
                </defs>
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <path d="M 330 30 C 310 30, 295 50, 290 85 C 285 105, 305 115, 295 130 C 288 138, 275 142, 270 148 C 265 154, 270 162, 268 170" fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M 264 165 C 255 125, 235 98, 175 110" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                <circle cx="236" cy="100" r="6" fill="#facc15" stroke="#fef08a" stroke-width="1.5"/>
                <text x="236" y="85" fill="#facc15" font-size="11" font-weight="bold" text-anchor="middle">上齿龈 (Tandkødsrand)</text>
                <rect x="250" y="112" width="6" height="15" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
                <path d="M 260 215 C 275 225, 270 245, 255 260 C 240 275, 220 280, 200 280" fill="none" stroke="#475569" stroke-width="2.5"/>
                <rect x="245" y="195" width="6" height="14" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
                <path d="M 205 110 L 205 270" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                <path d="M 205 70 C 240 60, 260 70, 285 115" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="3,3"/>
                <text x="235" y="55" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">鼻腔通路 (Næsehule)</text>
                <path d="${velumPath}" fill="${isL ? '#38bdf8' : '#f472b6'}" stroke="#f8fafc" stroke-width="1.5"/>
                <path d="${tonguePath}" fill="url(#${isL ? 'lAirflowGrad' : 'nAirflowGrad'})" stroke="${primaryColor}" stroke-width="2.5"/>
                ${isL ? `
                    <circle cx="206" cy="143" r="5" fill="#ef4444"/>
                    <line x1="202" y1="139" x2="210" y2="147" stroke="#ffffff" stroke-width="1.8"/>
                    <line x1="210" y1="139" x2="202" y2="147" stroke="#ffffff" stroke-width="1.8"/>
                    <text x="170" y="148" fill="#f87171" font-size="10" font-weight="bold" text-anchor="end">软腭封闭鼻腔通道!</text>
                    <path d="M 175 250 C 180 200, 195 180, 220 165 C 240 155, 275 165, 305 168" fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" filter="url(#glowAir1)" marker-end="url(#arrowL1)"/>
                    <text x="280" y="195" fill="#38bdf8" font-size="12" font-weight="bold">口腔侧向气流 ➔</text>
                    <text x="280" y="210" fill="#cbd5e1" font-size="10">100% 经口腔两侧流出</text>
                ` : `
                    <path d="M 226 102 C 235 98, 250 98, 256 108" fill="none" stroke="#ef4444" stroke-width="4"/>
                    <text x="285" y="145" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">口腔前方封闭 ⛔</text>
                    <path d="M 175 250 C 180 190, 185 140, 195 110 C 205 75, 245 70, 290 120" fill="none" stroke="#f472b6" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" filter="url(#glowAir1)" marker-end="url(#arrowN1)"/>
                    <text x="270" y="45" fill="#f472b6" font-size="12" font-weight="bold">鼻腔共鸣气流 ➔</text>
                    <text x="270" y="60" fill="#cbd5e1" font-size="10">全部气流进入鼻腔共鸣</text>
                `}
                <rect x="15" y="15" width="105" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="67" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isL ? '🌊 边音 [l]' : '🌸 鼻音 [n]'}</text>
            </svg>
        `;
    }

    // Module 1: L vs N Top Down
    function generateTopDownLVsnSvg(sound) {
        const isL = sound === 'l';
        const primaryColor = isL ? '#38bdf8' : '#f472b6';
        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glowAir2" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrowL2" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#38bdf8"/>
                    </marker>
                </defs>
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <path d="M 80 230 C 80 100, 280 100, 280 230" fill="none" stroke="#475569" stroke-width="26" stroke-linecap="round"/>
                <path d="M 80 230 C 80 100, 280 100, 280 230" fill="none" stroke="#0f172a" stroke-width="18" stroke-linecap="round"/>
                <path d="M 100 230 C 100 135, 260 135, 260 230" fill="none" stroke="#e2e8f0" stroke-width="6" stroke-dasharray="14,4"/>
                <text x="180" y="70" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">上齿弓与前齿 (Overmundens tandbue)</text>
                ${isL ? `
                    <path d="M 125 240 C 130 180, 150 140, 180 116 C 210 140, 230 180, 235 240 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
                    <circle cx="180" cy="116" r="8" fill="#facc15" stroke="#fef08a" stroke-width="2"/>
                    <text x="180" y="100" fill="#facc15" font-size="11" font-weight="bold" text-anchor="middle">舌尖仅居中轻触 (Punktberøring)</text>
                    <path d="M 100 210 C 95 160, 115 130, 135 110" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,3" filter="url(#glowAir2)" marker-end="url(#arrowL2)"/>
                    <path d="M 260 210 C 265 160, 245 130, 225 110" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,3" filter="url(#glowAir2)" marker-end="url(#arrowL2)"/>
                    <text x="75" y="150" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="end">左侧自由流出 ➔</text>
                    <text x="285" y="150" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="start">➔ 右侧自由流出</text>
                ` : `
                    <path d="M 88 230 C 88 120, 272 120, 272 230 Z" fill="#334155" stroke="#f472b6" stroke-width="3"/>
                    <path d="M 98 190 C 105 130, 255 130, 262 190" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
                    <text x="180" y="155" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">⛔ 马蹄形全闭锁屏障</text>
                    <text x="180" y="175" fill="#cbd5e1" font-size="10" text-anchor="middle">舌头与上齿弓完全封死，侧面绝无空隙</text>
                `}
                <rect x="15" y="15" width="135" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isL ? '🌊 舌侧双气流通道' : '🌸 全封闭鼻音屏障'}</text>
            </svg>
        `;
    }

    // Module 2: Blødt d Sagittal
    function generateSagittalSoftDSvg(target) {
        const isSoftD = target === 'soft_d';
        const primaryColor = isSoftD ? '#4ade80' : '#ef4444';
        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glowAirD" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrowD" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#4ade80"/>
                    </marker>
                </defs>
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <path d="M 330 30 C 310 30, 295 50, 290 85 C 285 105, 305 115, 295 130 C 288 138, 275 142, 270 148 C 265 154, 270 162, 268 170" fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M 264 165 C 255 125, 235 98, 175 110" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                <rect x="250" y="112" width="6" height="15" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
                <path d="M 260 215 C 275 225, 270 245, 255 260 C 240 275, 220 280, 200 280" fill="none" stroke="#475569" stroke-width="2.5"/>
                <rect x="245" y="195" width="6" height="14" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
                <path d="M 205 110 L 205 270" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                <path d="M 175 110 C 190 125, 198 138, 208 145 C 205 148, 195 135, 170 118 Z" fill="#4ade80" stroke="#f8fafc" stroke-width="1.5"/>
                ${isSoftD ? `
                    <!-- Tongue resting low, tip at lower teeth -->
                    <path d="M 140 240 C 150 200, 175 180, 210 165 C 230 155, 240 185, 244 198 C 230 202, 195 210, 160 230 Z" fill="rgba(74, 222, 128, 0.25)" stroke="#4ade80" stroke-width="2.5"/>
                    <circle cx="244" cy="198" r="6" fill="#facc15" stroke="#fef08a" stroke-width="2"/>
                    <text x="235" y="228" fill="#facc15" font-size="11" font-weight="bold" text-anchor="middle">舌尖贴放下齿背 (Tunge nede!)</text>
                    <!-- Airflow gliding softly forward -->
                    <path d="M 175 240 C 185 200, 200 170, 225 150 C 245 138, 275 145, 305 148" fill="none" stroke="#4ade80" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" filter="url(#glowAirD)" marker-end="url(#arrowD)"/>
                    <text x="270" y="180" fill="#4ade80" font-size="12" font-weight="bold">平稳气流滑出 ➔</text>
                    <text x="270" y="195" fill="#cbd5e1" font-size="10">无爆破，通音发音</text>
                ` : `
                    <!-- Erroneous tongue touching upper alveolar ridge -->
                    <path d="M 140 240 C 155 180, 185 145, 225 105 C 238 96, 248 94, 252 98 C 240 120, 205 140, 160 230 Z" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="2.5"/>
                    <circle cx="236" cy="100" r="8" fill="#ef4444"/>
                    <line x1="231" y1="95" x2="241" y2="105" stroke="#ffffff" stroke-width="2"/>
                    <line x1="241" y1="95" x2="231" y2="105" stroke="#ffffff" stroke-width="2"/>
                    <text x="236" y="80" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">切勿顶上齿龈 ⛔</text>
                    <text x="270" y="180" fill="#f87171" font-size="11" font-weight="bold">错误：会发成硬 D 或 L！</text>
                `}
                <rect x="15" y="15" width="130" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="80" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isSoftD ? '🍃 软 d [ð] (平滑通音)' : '⛔ 错误顶触上齿龈'}</text>
            </svg>
        `;
    }

    // Module 2: Blødt d Frontal
    function generateFrontalSoftDSvg(target) {
        const isSoftD = target === 'soft_d';
        const primaryColor = isSoftD ? '#4ade80' : '#ef4444';
        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <!-- Upper Lip & Teeth -->
                <path d="M 100 80 C 140 70, 220 70, 260 80" fill="none" stroke="#475569" stroke-width="4"/>
                <rect x="145" y="85" width="32" height="40" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="183" y="85" width="32" height="40" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="110" y="85" width="30" height="35" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="220" y="85" width="30" height="35" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                <!-- Lower Lip & Teeth -->
                <path d="M 100 240 C 140 250, 220 250, 260 240" fill="none" stroke="#475569" stroke-width="4"/>
                <rect x="150" y="195" width="28" height="35" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="182" y="195" width="28" height="35" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
                ${isSoftD ? `
                    <!-- Tongue resting behind lower teeth with wide gap above -->
                    <path d="M 120 220 C 140 185, 220 185, 240 220 Z" fill="rgba(74, 222, 128, 0.35)" stroke="#4ade80" stroke-width="2.5"/>
                    <circle cx="180" cy="195" r="6" fill="#facc15"/>
                    <text x="180" y="175" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">开敞缝隙：微风平滑吹出 ➔</text>
                    <line x1="160" y1="145" x2="160" y2="165" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
                    <line x1="180" y1="140" x2="180" y2="165" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
                    <line x1="200" y1="145" x2="200" y2="165" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
                    <text x="180" y="270" fill="#cbd5e1" font-size="11" text-anchor="middle">舌尖沉在下齿后，上下牙微开无碰撞</text>
                ` : `
                    <!-- Tongue raised up blocking teeth -->
                    <path d="M 120 145 C 140 110, 220 110, 240 145 Z" fill="rgba(239, 68, 68, 0.35)" stroke="#ef4444" stroke-width="2.5"/>
                    <text x="180" y="165" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">⛔ 错误堵死门牙通路</text>
                    <text x="180" y="270" fill="#fca5a5" font-size="11" text-anchor="middle">舌头向上封闭门牙，就会发成 L 或硬 D</text>
                `}
                <rect x="15" y="15" width="130" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="80" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isSoftD ? '🍃 正面齿隙气流通畅' : '⛔ 错误封闭牙关'}</text>
            </svg>
        `;
    }

    // Module 3: Dansk r Sagittal
    function generateSagittalDanskRSvg(target) {
        const isDanishR = target === 'danish_r';
        const primaryColor = isDanishR ? '#facc15' : '#ef4444';
        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glowAirR" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrowR" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#facc15"/>
                    </marker>
                </defs>
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <path d="M 330 30 C 310 30, 295 50, 290 85 C 285 105, 305 115, 295 130 C 288 138, 275 142, 270 148 C 265 154, 270 162, 268 170" fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M 264 165 C 255 125, 235 98, 175 110" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
                <rect x="250" y="112" width="6" height="15" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
                <path d="M 260 215 C 275 225, 270 245, 255 260 C 240 275, 220 280, 200 280" fill="none" stroke="#475569" stroke-width="2.5"/>
                <rect x="245" y="195" width="6" height="14" rx="2" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>
                <path d="M 205 110 L 205 270" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
                <!-- Velum with hanging Uvula -->
                <path d="M 175 110 C 185 125, 192 145, 195 160 C 192 165, 188 160, 182 140 Z" fill="#facc15" stroke="#f8fafc" stroke-width="1.5"/>
                <circle cx="195" cy="160" r="5" fill="#facc15"/>
                <text x="165" y="165" fill="#facc15" font-size="11" font-weight="bold" text-anchor="end">小舌 (Uvula)</text>
                ${isDanishR ? `
                    <!-- Tongue root retracted, tip lying flat in bottom -->
                    <path d="M 140 240 C 150 220, 165 200, 180 178 C 188 170, 205 190, 240 230 C 210 240, 170 245, 140 240 Z" fill="rgba(250, 204, 21, 0.25)" stroke="#facc15" stroke-width="2.5"/>
                    <circle cx="235" cy="225" r="5" fill="#38bdf8"/>
                    <text x="240" y="250" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">舌尖完全平放 (Tunge flad)</text>
                    <!-- Uvular friction wave -->
                    <circle cx="188" cy="170" r="10" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="3,3"/>
                    <path d="M 175 250 C 185 200, 190 175, 210 160 C 235 150, 275 155, 305 158" fill="none" stroke="#facc15" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8,4" filter="url(#glowAirR)" marker-end="url(#arrowR)"/>
                    <text x="270" y="190" fill="#facc15" font-size="12" font-weight="bold">小舌处擦音 ➔</text>
                    <text x="270" y="205" fill="#cbd5e1" font-size="10">深喉小舌气流振动</text>
                ` : `
                    <!-- Chinese retroflex curl upwards -->
                    <path d="M 140 240 C 160 210, 185 180, 205 130 C 210 115, 220 115, 215 135 C 195 180, 170 220, 140 240 Z" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="2.5"/>
                    <circle cx="208" cy="120" r="8" fill="#ef4444"/>
                    <line x1="203" y1="115" x2="213" y2="125" stroke="#ffffff" stroke-width="2"/>
                    <line x1="213" y1="115" x2="203" y2="125" stroke="#ffffff" stroke-width="2"/>
                    <text x="210" y="95" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">切勿卷舌 ⛔</text>
                    <text x="270" y="190" fill="#f87171" font-size="11" font-weight="bold">错误：汉语拼音 r 卷舌</text>
                `}
                <rect x="15" y="15" width="135" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isDanishR ? '🦅 丹麦语小舌音 [ʁ]' : '⛔ 切勿卷舌 (汉语 r)'}</text>
            </svg>
        `;
    }

    // Module 3: Dansk r Throat View
    function generateThroatRSvg(target) {
        const isDanishR = target === 'danish_r';
        const primaryColor = isDanishR ? '#facc15' : '#ef4444';
        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <!-- Mouth interior opening -->
                <ellipse cx="180" cy="150" rx="110" ry="85" fill="#1e293b" stroke="#475569" stroke-width="4"/>
                <path d="M 100 120 C 140 100, 220 100, 260 120" fill="none" stroke="#94a3b8" stroke-width="8"/>
                <path d="M 110 200 C 140 215, 220 215, 250 200" fill="none" stroke="#94a3b8" stroke-width="8"/>
                <!-- Uvula hanging down -->
                <path d="M 172 100 C 172 135, 175 150, 180 155 C 185 150, 188 135, 188 100 Z" fill="#facc15" stroke="#fef08a" stroke-width="1.5"/>
                <circle cx="180" cy="155" r="7" fill="#facc15"/>
                <text x="180" y="80" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">小舌 (Uvula) 悬雍垂</text>
                ${isDanishR ? `
                    <circle cx="180" cy="155" r="16" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="4,4"/>
                    <circle cx="180" cy="155" r="26" fill="none" stroke="#facc15" stroke-width="1.5" stroke-dasharray="3,3"/>
                    <text x="180" y="245" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">深喉发力：气流直冲小舌震颤 ➔</text>
                ` : `
                    <!-- Retroflex blocking front view -->
                    <ellipse cx="180" cy="180" rx="60" ry="30" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" stroke-width="2.5"/>
                    <text x="180" y="185" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">舌头翘起挡在前面 ⛔</text>
                    <text x="180" y="245" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">喉部没有共鸣，完全丢失丹麦语特色</text>
                `}
                <rect x="15" y="15" width="135" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isDanishR ? '🦅 深喉透视图' : '⛔ 舌前部遮挡'}</text>
            </svg>
        `;
    }

    // Module 4: Udlyd Cluster Timing
    function generateClusterTimingSvg(target) {
        const isClean = target === 'clean_cluster';
        const primaryColor = isClean ? '#4ade80' : '#ef4444';
        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <text x="180" y="50" fill="#f8fafc" font-size="14" font-weight="900" text-anchor="middle">单词: "koldt" (k + o + l + dt)</text>
                <!-- Phase Blocks -->
                <rect x="40" y="80" width="80" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                <text x="80" y="105" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">元音 /ɔ/</text>
                <text x="80" y="120" fill="#94a3b8" font-size="10" text-anchor="middle">声带振动</text>
                <text x="130" y="110" fill="#64748b" font-size="16">➔</text>
                <rect x="145" y="80" width="75" height="50" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
                <text x="182" y="105" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">辅音 1: /l/</text>
                <text x="182" y="120" fill="#94a3b8" font-size="10" text-anchor="middle">舌侧贴上</text>
                <text x="230" y="110" fill="#64748b" font-size="16">➔</text>
                <rect x="245" y="80" width="75" height="50" rx="8" fill="#1e293b" stroke="${primaryColor}" stroke-width="2"/>
                <text x="282" y="105" fill="${primaryColor}" font-size="12" font-weight="bold" text-anchor="middle">辅音 2: /t/</text>
                <text x="282" y="120" fill="#94a3b8" font-size="10" text-anchor="middle">齿龈闭锁</text>
                ${isClean ? `
                    <!-- Clean Cutoff -->
                    <line x1="325" y1="65" x2="325" y2="150" stroke="#4ade80" stroke-width="4" stroke-linecap="round"/>
                    <rect x="235" y="165" width="95" height="30" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
                    <text x="282" y="185" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">⏹️ 瞬间切断</text>
                    <text x="180" y="240" fill="#4ade80" font-size="13" font-weight="bold" text-anchor="middle">✅ 干净利落收尾，气流骤停！</text>
                    <text x="180" y="260" fill="#cbd5e1" font-size="11" text-anchor="middle">像用剪刀剪断声音一样，绝不拖泥带水</text>
                ` : `
                    <!-- Trailing Vowel Error -->
                    <path d="M 325 105 C 335 105, 345 125, 345 140 C 345 155, 330 160, 310 160" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="4,4"/>
                    <rect x="235" y="165" width="95" height="30" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5"/>
                    <text x="282" y="185" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">+ [ə] 尾音 ⛔</text>
                    <text x="180" y="240" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">⚠️ 错误：多念了一口气变成 "koldt-e"！</text>
                    <text x="180" y="260" fill="#fca5a5" font-size="11" text-anchor="middle">松开舌头太慢，漏出了额外元音，改变了词性</text>
                `}
                <rect x="15" y="15" width="135" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isClean ? '🧱 双辅音精准断音' : '⛔ 拖沓漏出尾元音'}</text>
            </svg>
        `;
    }

    // Module 4: Udlyd Waveform
    function generateWaveformStopSvg(target) {
        const isClean = target === 'clean_cluster';
        const primaryColor = isClean ? '#4ade80' : '#ef4444';
        return `
            <svg class="vlk-diag-svg" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="360" height="300" rx="14" fill="#0b1329" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5"/>
                <text x="180" y="45" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">声音振幅波形 (Acoustic Waveform)</text>
                <line x1="40" y1="130" x2="320" y2="130" stroke="#334155" stroke-width="1"/>
                <!-- Vowel part -->
                <path d="M 40 130 Q 55 70, 70 130 T 100 130 T 130 130 T 160 130" fill="none" stroke="#38bdf8" stroke-width="3"/>
                <text x="100" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">元音 /ɔ/</text>
                <!-- Consonant /l/ -->
                <path d="M 160 130 Q 175 100, 190 130 T 220 130" fill="none" stroke="#facc15" stroke-width="2.5"/>
                <text x="190" y="160" fill="#facc15" font-size="11" font-weight="bold" text-anchor="middle">/l/ 边音</text>
                <!-- Consonant /t/ closure -->
                ${isClean ? `
                    <line x1="220" y1="130" x2="260" y2="130" stroke="#4ade80" stroke-width="4"/>
                    <line x1="260" y1="90" x2="260" y2="170" stroke="#4ade80" stroke-width="3"/>
                    <line x1="260" y1="130" x2="320" y2="130" stroke="#334155" stroke-width="2" stroke-dasharray="2,2"/>
                    <text x="290" y="115" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">零能量静音 ⏹️</text>
                    <text x="180" y="240" fill="#4ade80" font-size="13" font-weight="bold" text-anchor="middle">到达闭锁点后能量瞬间归零</text>
                ` : `
                    <line x1="220" y1="130" x2="260" y2="130" stroke="#ef4444" stroke-width="3"/>
                    <!-- trailing extra wave -->
                    <path d="M 260 130 Q 275 105, 290 130 T 320 130" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="3,3"/>
                    <text x="290" y="100" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">+ 多余尾音波形 ⚠️</text>
                    <text x="180" y="240" fill="#f87171" font-size="13" font-weight="bold" text-anchor="middle">尾部出现多余能量包，形成冗余音节</text>
                `}
                <rect x="15" y="15" width="135" height="24" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="${primaryColor}" stroke-width="1.2"/>
                <text x="82" y="31" fill="${primaryColor}" font-size="12" font-weight="900" text-anchor="middle">${isClean ? '🧱 能量利落归零' : '⛔ 拖泥带水杂波'}</text>
            </svg>
        `;
    }

    // --- MAIN RENDER FUNCTION ---
    function renderView() {
        viewContainer.innerHTML = '';
        const activeMod = SOUND_MODULES.find(m => m.id === activeModuleId) || SOUND_MODULES[0];
        const modData = MODULE_DATA[activeModuleId] || MODULE_DATA.l_vs_n;

        // Ensure activeSoundTarget is valid for active module
        const validOptions = modData.subControls.options.map(o => o.id);
        if (!validOptions.includes(activeSoundTarget)) {
            activeSoundTarget = modData.defaultTarget;
        }

        // 1. Top Bar
        const topBar = document.createElement('div');
        topBar.className = 'vlk-top-bar';
        topBar.innerHTML = `
            <button class="vlk-back-btn" id="vlk-back" type="button">
                <span>←</span>
                <span class="vlk-back-short">返回</span>
                <span class="vlk-back-full">返回 我的母语与丹麦语对比</span>
            </button>
            <div class="vlk-top-badge">
                <span class="vlk-badge-short">🇨🇳 专项训练</span>
                <span class="vlk-badge-full">🇨🇳 华人难点发音专项攻关</span>
            </div>
        `;
        topBar.querySelector('#vlk-back').onclick = () => {
            navigateFn('mit_sprog_sammenlignet');
        };
        viewContainer.appendChild(topBar);

        // 2. Dynamic Hero Card
        const hero = document.createElement('div');
        hero.className = 'vlk-hero';
        hero.innerHTML = `
            <div class="vlk-hero-badge">语音专项模块 • 第2级：音素 (Fon)</div>
            <h1 class="vlk-hero-title">${activeMod.heroTitleZh}</h1>
            <div class="vlk-hero-subtitle">${activeMod.heroSubZh}</div>
            <p class="vlk-hero-desc">
                ${activeMod.descZh} ${activeMod.descDa}
            </p>
        `;
        viewContainer.appendChild(hero);

        // 3. Extensible Module Selector (All 4 modules fully active)
        const modSelector = document.createElement('div');
        modSelector.className = 'vlk-module-selector';
        SOUND_MODULES.forEach(mod => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `vlk-mod-btn ${mod.id === activeModuleId ? 'active' : ''}`;
            btn.innerHTML = `
                <span>${mod.titleDa}</span>
                <span style="font-size:0.75rem; opacity:0.8;">(${mod.titleZh})</span>
                <span style="font-size:0.7rem; background:rgba(255,255,255,0.1); padding:0.15rem 0.4rem; border-radius:6px;">${mod.badge}</span>
            `;
            btn.onclick = () => {
                if (activeModuleId !== mod.id) {
                    activeModuleId = mod.id;
                    currentPairIdx = 0;
                    quizScore = 0;
                    quizAnswered = 0;
                    currentTargetWord = null;
                    speechExerciseIdx = 0;
                    consecutiveSpeechStreak = 0;
                    isSpeechRecording = false;
                    activeSoundTarget = MODULE_DATA[mod.id].defaultTarget;
                    renderView();
                }
            };
            modSelector.appendChild(btn);
        });
        viewContainer.appendChild(modSelector);

        // 4. Main Activity Tabs
        const mainTabs = document.createElement('div');
        mainTabs.className = 'vlk-main-tabs';
        mainTabs.innerHTML = `
            <button type="button" class="vlk-tab-btn ${activeTab === 'diagram' ? 'active' : ''}" data-tab="diagram">
                <span class="vlk-tab-icon">🔬</span>
                <span class="vlk-tab-short">1. 器官图解</span>
                <span class="vlk-tab-full">1. 发音器官与气流图解</span>
            </button>
            <button type="button" class="vlk-tab-btn ${activeTab === 'listening' ? 'active' : ''}" data-tab="listening">
                <span class="vlk-tab-icon">🎧</span>
                <span class="vlk-tab-short">2. 听音辨析</span>
                <span class="vlk-tab-full">2. 听音辨析测试 (8对)</span>
            </button>
            <button type="button" class="vlk-tab-btn ${activeTab === 'speech' ? 'active' : ''}" data-tab="speech">
                <span class="vlk-tab-icon">🎙️</span>
                <span class="vlk-tab-short">3. 口语跟读</span>
                <span class="vlk-tab-full">3. 麦克风口语练习 (8句)</span>
            </button>
        `;
        mainTabs.querySelectorAll('.vlk-tab-btn').forEach(btn => {
            btn.onclick = () => {
                activeTab = btn.dataset.tab;
                renderView();
            };
        });
        viewContainer.appendChild(mainTabs);

        // 5. Content Container
        const contentWrap = document.createElement('div');

        if (activeTab === 'diagram') {
            renderDiagramSection(contentWrap, modData);
        } else if (activeTab === 'listening') {
            renderListeningSection(contentWrap, modData);
        } else if (activeTab === 'speech') {
            renderSpeechSection(contentWrap, modData);
        }

        viewContainer.appendChild(contentWrap);
    }

    // --- TAB 1: DIAGRAM SECTION ---
    function renderDiagramSection(wrap, modData) {
        // Sub-controls
        const controls = document.createElement('div');
        controls.className = 'vlk-diag-controls';
        
        let buttonsHtml = '';
        modData.subControls.options.forEach(opt => {
            const isActive = activeSoundTarget === opt.id;
            buttonsHtml += `
                <button type="button" class="vlk-toggle-btn ${isActive ? opt.activeClass : ''}" data-target="${opt.id}">
                    ${opt.label}
                    <span style="font-size:0.72rem; opacity:0.85;">${opt.sub}</span>
                </button>
            `;
        });

        controls.innerHTML = `
            <div class="vlk-diag-controls-label">${modData.subControls.labelZh}</div>
            <div class="vlk-sound-toggle-group">
                ${buttonsHtml}
            </div>
        `;

        controls.querySelectorAll('.vlk-toggle-btn').forEach(btn => {
            btn.onclick = () => {
                activeSoundTarget = btn.dataset.target;
                renderView();
            };
        });
        wrap.appendChild(controls);

        // Dual Diagrams Grid
        const grid = document.createElement('div');
        grid.className = 'vlk-diagrams-grid';

        // Card 1
        const c1 = modData.diagCard1(activeSoundTarget);
        const card1 = document.createElement('div');
        card1.className = 'vlk-diagram-card';
        card1.innerHTML = `
            <div class="vlk-diag-header">
                <div class="vlk-diag-title">${c1.title}</div>
                <div class="vlk-diag-tag" style="${c1.tagStyle}">
                    ${c1.tag}
                </div>
            </div>
            <div class="vlk-diag-svg-wrap">
                ${c1.svg}
            </div>
            <div class="vlk-diag-notes">
                ${c1.notes}
            </div>
        `;
        grid.appendChild(card1);

        // Card 2
        const c2 = modData.diagCard2(activeSoundTarget);
        const card2 = document.createElement('div');
        card2.className = 'vlk-diagram-card';
        card2.innerHTML = `
            <div class="vlk-diag-header">
                <div class="vlk-diag-title">${c2.title}</div>
                <div class="vlk-diag-tag" style="${c2.tagStyle}">
                    ${c2.tag}
                </div>
            </div>
            <div class="vlk-diag-svg-wrap">
                ${c2.svg}
            </div>
            <div class="vlk-diag-notes">
                ${c2.notes}
            </div>
        `;
        grid.appendChild(card2);
        wrap.appendChild(grid);

        // Trick Card
        const pinchCard = document.createElement('div');
        pinchCard.className = 'vlk-pinch-card';
        pinchCard.innerHTML = modData.pinchCardHtml;
        wrap.appendChild(pinchCard);

        // Bilingual Guide
        const biBox = document.createElement('div');
        biBox.className = 'vlk-bilingual-box';
        biBox.innerHTML = modData.bilingualGuideHtml;
        wrap.appendChild(biBox);
    }

    // --- TAB 2: LISTENING SECTION ---
    function renderListeningSection(wrap, modData) {
        const pairs = modData.minimalPairs;
        if (currentPairIdx >= pairs.length) currentPairIdx = 0;
        const pair = pairs[currentPairIdx];

        if (!currentTargetWord) {
            currentTargetWord = Math.random() < 0.5 ? pair.l : pair.n;
        }

        const quizCard = document.createElement('div');
        quizCard.className = 'vlk-quiz-card';

        quizCard.innerHTML = `
            <div class="vlk-quiz-status-bar">
                <span>第 ${currentPairIdx + 1} 组，共 ${pairs.length} 组</span>
                <span>得分：<strong style="color:#fde68a;">${quizScore}</strong> / ${quizAnswered} 题正确</span>
            </div>

            <div style="font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-bottom: 0.4rem;">
                Hvilket ord hører du? (你听到的是哪个词？)
            </div>
            <div style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 1.4rem;">
                仔细倾听发音细节，点击播放按钮，分辨对应的目标词。
            </div>

            <button type="button" class="vlk-play-sound-btn" id="vlk-play-quiz">
                ${SVG_SPEAKER}
                <span>🎧 播放目标单词发音</span>
            </button>

            <div class="vlk-quiz-options">
                <button type="button" class="vlk-quiz-opt" data-word="${pair.l}">
                    <div>${pair.l}</div>
                    <div style="font-size:0.75rem; font-weight:normal; opacity:0.8; margin-top:0.25rem;">${pair.meanL_zh}</div>
                </button>
                <button type="button" class="vlk-quiz-opt" data-word="${pair.n}">
                    <div>${pair.n}</div>
                    <div style="font-size:0.75rem; font-weight:normal; opacity:0.8; margin-top:0.25rem;">${pair.meanN_zh}</div>
                </button>
            </div>

            <div class="vlk-quiz-feedback" id="quiz-feedback"></div>

            <div class="vlk-nav-row">
                <button type="button" class="vlk-nav-btn" id="prev-quiz" ${currentPairIdx === 0 ? 'disabled' : ''}>
                    ← 上一组单词
                </button>
                <button type="button" class="vlk-nav-btn" id="next-quiz" style="background:#0284c7; border-color:#38bdf8;">
                    ${currentPairIdx === pairs.length - 1 ? '重新开始循环 ➔' : '下一组单词 →'}
                </button>
            </div>
        `;

        quizCard.querySelector('#vlk-play-quiz').onclick = () => {
            speakWord(currentTargetWord);
        };

        const fbEl = quizCard.querySelector('#quiz-feedback');
        const optButtons = quizCard.querySelectorAll('.vlk-quiz-opt');

        optButtons.forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.dataset.word;
                const isCorrect = chosen === currentTargetWord;

                optButtons.forEach(b => b.disabled = true);

                quizAnswered++;
                if (isCorrect) {
                    quizScore++;
                    btn.classList.add('correct');
                    fbEl.className = 'vlk-quiz-feedback show success';
                    fbEl.innerHTML = `
                        <strong>听力极佳！✅</strong> 你正确识别了单词 <strong>"${currentTargetWord}"</strong>。<br>
                        <span style="font-size:0.85rem; color:#cbd5e1;">例句情境：${currentTargetWord === pair.l ? pair.contextL : pair.contextN}</span>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optButtons.forEach(b => {
                        if (b.dataset.word === currentTargetWord) b.classList.add('correct');
                    });
                    fbEl.className = 'vlk-quiz-feedback show error';
                    fbEl.innerHTML = `
                        <strong>再仔细听听！⚠️</strong> 正确的词其实是 <strong>"${currentTargetWord}"</strong>。<br>
                        <span style="font-size:0.85rem; color:#cbd5e1;">再次点击播放，注意对比两种不同发音的细微差别。</span>
                    `;
                }
            };
        });

        quizCard.querySelector('#prev-quiz').onclick = () => {
            if (currentPairIdx > 0) {
                currentPairIdx--;
                currentTargetWord = null;
                renderView();
            }
        };

        quizCard.querySelector('#next-quiz').onclick = () => {
            if (currentPairIdx < pairs.length - 1) {
                currentPairIdx++;
            } else {
                currentPairIdx = 0;
            }
            currentTargetWord = null;
            renderView();
        };

        wrap.appendChild(quizCard);
    }

    // --- TAB 3: SPEECH SECTION ---
    function renderSpeechSection(wrap, modData) {
        const exercises = modData.speechExercises;
        if (speechExerciseIdx >= exercises.length) speechExerciseIdx = 0;
        const ex = exercises[speechExerciseIdx];

        const speechCard = document.createElement('div');
        speechCard.className = 'vlk-speech-card';

        // Words markup
        const promptHtml = ex.text.split(' ').map(w => {
            const clean = w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '');
            const isTarget = ex.targetWords.some(tw => tw.toLowerCase() === clean);
            if (isTarget) {
                return `<span class="vlk-target-word word-primary">${w}</span>`;
            }
            return `<span>${w}</span>`;
        }).join(' ');

        speechCard.innerHTML = `
            <div class="vlk-speech-meta-bar">
                <span>第 ${speechExerciseIdx + 1} 题，共 ${exercises.length} 题</span>
                <span class="vlk-target-word word-primary" style="font-weight:bold; font-size:0.78rem;">
                    重点攻关训练
                </span>
            </div>

            <div class="vlk-speech-prompt">${promptHtml}</div>
            <div class="vlk-speech-sub">大声朗读上方完整句子，注意高亮标出的目标发音词！</div>

            ${consecutiveSpeechStreak > 0 ? `
                <div class="vlk-streak-pill">
                    <span>🔥</span>
                    <span>连续 ${consecutiveSpeechStreak} 题发音纯正！</span>
                </div>
            ` : ''}

            <div class="vlk-mic-row">
                <button type="button" class="vlk-listen-model-btn" id="vlk-speech-listen">
                    ${SVG_SPEAKER}
                    <span>🔊 听示范发音</span>
                </button>
                <button type="button" class="vlk-mic-btn" id="vlk-speech-mic" title="点击开始麦克风录音">
                    ${SVG_MIC}
                </button>
            </div>

            <div class="vlk-speech-status" id="vlk-mic-status">
                点击红色麦克风，大声清晰朗读整句
            </div>

            <div class="vlk-speech-feedback-box" id="vlk-speech-fb"></div>

            <div style="background:rgba(30,41,59,0.7); border-radius:12px; padding:0.85rem 1rem; margin-top:1.2rem; font-size:0.86rem; color:#cbd5e1; text-align:left;">
                <strong style="color:#fde68a;">发音要领指导：</strong> ${ex.hintDa}<br>
                <span style="color:#94a3b8; font-size:0.82rem;">${ex.hintZh}</span>
            </div>

            <div class="vlk-nav-row">
                <button type="button" class="vlk-nav-btn" id="prev-speech" ${speechExerciseIdx === 0 ? 'disabled' : ''}>
                    ← 上一个练习
                </button>
                <button type="button" class="vlk-nav-btn" id="next-speech" style="background:#0284c7; border-color:#38bdf8;">
                    ${speechExerciseIdx === exercises.length - 1 ? '重新开始循环 ➔' : '下一个练习 →'}
                </button>
            </div>
        `;

        speechCard.querySelector('#vlk-speech-listen').onclick = () => {
            speakWord(ex.text, 0.82);
        };

        const micBtn = speechCard.querySelector('#vlk-speech-mic');
        const statusEl = speechCard.querySelector('#vlk-mic-status');
        const fbBox = speechCard.querySelector('#vlk-speech-fb');

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            statusEl.textContent = '当前浏览器未开启麦克风语音识别，建议使用 Chrome 浏览器。';
            micBtn.style.opacity = '0.5';
            micBtn.style.cursor = 'not-allowed';
        } else {
            const recognition = new SpeechRecognition();
            recognition.lang = 'da-DK';
            recognition.continuous = false;
            recognition.interimResults = false;

            micBtn.onclick = () => {
                if (isSpeechRecording) {
                    try { recognition.stop(); } catch (e) {}
                    return;
                }
                try {
                    recognition.start();
                    isSpeechRecording = true;
                    micBtn.classList.add('listening');
                    statusEl.textContent = '正在聆听中... 请大声清晰朗读！';
                    statusEl.style.color = '#38bdf8';
                } catch (err) {
                    console.error('Speech recognition error:', err);
                }
            };

            recognition.onresult = (event) => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
                statusEl.textContent = '正在分析发音匹配度...';

                const transcriptRaw = event.results[0][0].transcript || '';
                const transcript = transcriptRaw.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
                const targetClean = ex.text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
                const targetWordList = ex.targetWords || targetClean.split(' ');

                const matchedWords = targetWordList.filter(w => transcript.includes(w.toLowerCase()));
                const matchRatio = matchedWords.length / targetWordList.length;
                const isMatch = transcript === targetClean || matchRatio >= 0.65;

                fbBox.className = 'vlk-speech-feedback-box show';

                if (isMatch) {
                    consecutiveSpeechStreak++;
                    statusEl.textContent = '发音完全正确！';
                    statusEl.style.color = '#86efac';
                    fbBox.style.borderColor = '#22c55e';
                    fbBox.innerHTML = `
                        <div class="vlk-feedback-heard" style="color:#86efac; font-weight:800;">
                            ✅ 发音完全正确！我们听到了："${transcriptRaw}"
                        </div>
                        <div class="vlk-feedback-tip" style="margin-top:0.35rem; color:#cbd5e1;">
                            非常棒！精准掌握了丹麦语 <strong>${SOUND_MODULES.find(m => m.id === activeModuleId).titleDa}</strong> 的发音特征。
                        </div>
                    `;
                } else {
                    consecutiveSpeechStreak = 0;
                    statusEl.textContent = '再试一次。';
                    statusEl.style.color = '#e2e8f0';
                    fbBox.style.borderColor = '#eab308';
                    fbBox.innerHTML = `
                        <div class="vlk-feedback-heard" style="color:#fde68a; font-weight:800;">
                            我们听到了："${transcriptRaw}"（目标示范："${ex.text}"）
                        </div>
                        <div class="vlk-feedback-tip" style="margin-top:0.35rem; color:#cbd5e1;">
                            点击上方“听示范发音”，体会原汁原味的丹麦语发音要诀后再试一次！
                        </div>
                    `;
                }
            };

            recognition.onerror = () => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
                statusEl.textContent = '未检测到有效声音，请允许麦克风权限后重试。';
                statusEl.style.color = '#94a3b8';
            };

            recognition.onend = () => {
                isSpeechRecording = false;
                micBtn.classList.remove('listening');
            };
        }

        // Navigation
        speechCard.querySelector('#prev-speech').onclick = () => {
            if (speechExerciseIdx > 0) {
                speechExerciseIdx--;
                renderView();
            }
        };

        speechCard.querySelector('#next-speech').onclick = () => {
            if (speechExerciseIdx < exercises.length - 1) {
                speechExerciseIdx++;
            } else {
                speechExerciseIdx = 0;
            }
            renderView();
        };

        wrap.appendChild(speechCard);
    }

    // Initial render
    renderView();
    container.appendChild(viewContainer);
}
