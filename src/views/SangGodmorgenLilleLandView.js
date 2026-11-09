import { getLang, getTranslation as t } from '../utils/i18n.js';

/**
 * SangGodmorgenLilleLandView.js
 * Pædagogisk og interaktiv sang- og geografi-flade for:
 * "Godmorgen, lille land" (Tekst: Niels Brunse, 1998 · Melodi: Carsten Johs. Mørch, 1998)
 *
 * Opbygget efter Løsning A (Ophavsretslovens § 22):
 * - Arbejder pædagogisk med nøgleudtrykkene fra sangens 4 vers og emnet "Danmarks geografi"
 * - Nøgleordene: dis, kyst, sten og sand, havets bølger, bakker, is er alle selvstændige pegefelter på vrimlebilledet
 * - Indeholder direkte link til Højskolesangbogens officielle side med hele teksten og baggrunden
 * - Samme grafiske udtryk og pædagogiske opbygning som SangEnebaerbuskView.js (monokrome SVG-faner under hinanden, ingen farvede emojis)
 * - Fane 6: Samtalespørgsmål ("Hvor har du været i Danmark?", "Hvad er dit yndlingssted?" m.fl.) med klikbare hjælpesætninger og svarbygger.
 */
export function renderSangGodmorgenLilleLandView(container, navigateFn, extraData = {}) {
    const lang = getLang();
    const isDa = lang === 'da';
    const isEn = lang === 'en';
    container.innerHTML = '';

    let activeSpeechBtn = null;

    function speakDanish(text, btnElement = null, rate = 0.88) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        if (activeSpeechBtn) {
            activeSpeechBtn.classList.remove('speaking-active');
            activeSpeechBtn = null;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = rate;

        if (btnElement) {
            activeSpeechBtn = btnElement;
            btnElement.classList.add('speaking-active');
        }
        utterance.onend = () => {
            if (activeSpeechBtn) {
                activeSpeechBtn.classList.remove('speaking-active');
                activeSpeechBtn = null;
            }
        };
        utterance.onerror = () => {
            if (activeSpeechBtn) {
                activeSpeechBtn.classList.remove('speaking-active');
                activeSpeechBtn = null;
            }
        };
        window.speechSynthesis.speak(utterance);
    }

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sang-godmorgen-view';

    const style = document.createElement('style');
    style.textContent = `
        .sang-godmorgen-view {
            max-width: 1180px;
            margin: 0 auto;
            padding: 1rem 1rem 4rem;
            color: #f8fafc;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            box-sizing: border-box;
            width: 100%;
            overflow-x: hidden;
        }
        .sang-godmorgen-view *,
        .sang-godmorgen-view *::before,
        .sang-godmorgen-view *::after {
            box-sizing: border-box;
        }

        /* Song Switcher Bar */
        .song-switcher-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0.75rem 0 1.25rem;
            padding: 0.65rem;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            align-items: center;
        }
        .song-switcher-label {
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            padding: 0 0.5rem;
        }
        .song-switch-pill {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .song-switch-pill:hover {
            background: #334155;
            color: #ffffff;
        }
        .song-switch-pill.active {
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            color: #ffffff;
            border-color: #38bdf8;
            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        /* Hero Header */
        .hero-song-header {
            text-align: center;
            margin-bottom: 1.5rem;
            padding: 1rem 0.5rem;
        }
        .hero-song-badge {
            display: inline-block;
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(245, 158, 11, 0.2));
            border: 1px solid rgba(56, 189, 248, 0.4);
            color: #38bdf8;
            padding: 0.35rem 1rem;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin-bottom: 0.6rem;
        }
        .hero-song-header h1 {
            font-size: clamp(1.8rem, 3.8vw, 2.7rem);
            font-weight: 800;
            margin-bottom: 0.4rem;
            background: linear-gradient(135deg, #38bdf8, #fbbf24, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero-song-header p {
            color: #cbd5e1;
            font-size: 1.05rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Højskolesangbogen Link Banner */
        .hsb-reference-banner {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.92));
            border: 1px solid rgba(56, 189, 248, 0.35);
            border-radius: 16px;
            padding: 1rem 1.25rem;
            margin-bottom: 1.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .hsb-ref-text {
            flex: 1;
            min-width: 240px;
        }
        .hsb-ref-title {
            font-size: 0.96rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.2rem;
        }
        .hsb-ref-sub {
            font-size: 0.86rem;
            color: #94a3b8;
            line-height: 1.45;
        }
        .hsb-ref-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: #ffffff;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.9rem;
            padding: 0.65rem 1.15rem;
            border-radius: 11px;
            border: 1px solid rgba(125, 211, 252, 0.4);
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        .hsb-ref-link:hover {
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            transform: translateY(-1px);
        }

        /* Vertical Overview Table (Tabs Navigation) */
        .song-tabs-nav {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            margin-bottom: 1.8rem;
            background: rgba(15, 23, 42, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 0.75rem;
        }
        .song-tab-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.75rem 1.15rem;
            border-radius: 11px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }
        .song-tab-btn .mono-svg-icon,
        .ah-sub-nav .mono-svg-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            color: currentColor;
            opacity: 0.9;
        }
        .song-tab-btn:hover {
            color: white;
            background: #334155;
            border-color: rgba(255, 255, 255, 0.2);
        }
        .song-tab-btn.active {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border-color: #fbbf24;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .song-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .song-panel.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Vrimlebillede Card */
        .vrimmel-card, .detective-card, .builder-card, .history-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.25rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }
        .vrimmel-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 1rem;
            padding: 0.5rem 0.75rem;
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
        }
        .vrimmel-filter-group {
            display: flex;
            gap: 0.4rem;
            flex-wrap: wrap;
        }
        .vrimmel-filter-btn {
            background: #0f172a;
            color: #cbd5e1;
            border: 1px solid #334155;
            padding: 0.4rem 0.9rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .vrimmel-filter-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #60a5fa;
        }
        .pure-toggle-btn {
            background: #0f172a;
            color: #e2e8f0;
            border: 1px solid #475569;
            padding: 0.45rem 1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }
        .pure-toggle-btn.active {
            background: #10b981;
            color: #052e16;
            border-color: #34d399;
        }

        .vrimmel-stage {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            background: #0f172a;
            aspect-ratio: 16 / 9;
            border: 2px solid rgba(255, 255, 255, 0.12);
        }
        .vrimmel-stage img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .vrimmel-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.82rem;
            font-weight: 900;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 10;
            user-select: none;
            color: #0f172a;
            background: #fbbf24;
            border: 2px solid #ffffff;
            box-shadow: 0 0 14px rgba(245, 158, 11, 0.8);
        }
        .vrimmel-hotspot:hover,
        .vrimmel-hotspot.active {
            transform: translate(-50%, -50%) scale(1.28);
            z-index: 30;
            background: #22c55e;
            color: #ffffff;
            box-shadow: 0 0 22px rgba(34, 197, 94, 0.95);
        }
        .vrimmel-stage.pure-mode .vrimmel-hotspot {
            opacity: 0;
            pointer-events: none;
        }

        .hotspot-detail-card {
            margin-top: 1.2rem;
            background: linear-gradient(145deg, #0f172a, #1e293b);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        .detail-info-left {
            flex: 1;
            min-width: 260px;
        }
        .detail-badges {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            flex-wrap: wrap;
        }
        .badge-pill {
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.22rem 0.65rem;
            border-radius: 999px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .badge-dag {
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            border: 1px solid rgba(245, 158, 11, 0.4);
        }
        .badge-quote {
            background: rgba(56, 189, 248, 0.18);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.4);
        }
        .detail-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.3rem;
        }
        .detail-forms {
            font-size: 0.95rem;
            color: #38bdf8;
            font-weight: 600;
            margin-bottom: 0.4rem;
        }
        .detail-redskaber {
            font-size: 0.92rem;
            color: #cbd5e1;
            margin-bottom: 0.55rem;
            line-height: 1.45;
        }
        .detail-saetning-box {
            background: rgba(255, 255, 255, 0.05);
            border-left: 4px solid #f59e0b;
            padding: 0.65rem 1rem;
            border-radius: 0 8px 8px 0;
            font-size: 1.05rem;
            color: #fef08a;
            font-weight: 600;
        }
        .ah-step-nav-btns {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .ah-step-btn {
            background: #334155;
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.65rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ah-step-btn:hover {
            background: #475569;
            border-color: #fbbf24;
        }
        .listen-btn {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #0f172a;
            border: none;
            padding: 0.7rem 1.2rem;
            border-radius: 11px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .listen-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
        }

        /* TAB 2: Sangens Nøgleudtryk, Udtalerytme & Udsnitskuffe */
        .song-sequence-flow {
            display: flex;
            flex-direction: column;
            gap: 1.3rem;
            max-width: 920px;
            margin: 0 auto 2.5rem;
        }
        .verse-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem 1.6rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            transition: all 0.25s ease;
        }
        .verse-card:hover {
            border-color: rgba(245, 158, 11, 0.45);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .verse-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.75rem;
        }
        .verse-day-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f8fafc;
        }
        .verse-theme-tag {
            font-size: 0.78rem;
            font-weight: 800;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            border: 1px solid rgba(56, 189, 248, 0.35);
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .key-expr-box {
            background: rgba(15, 23, 42, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1rem 1.2rem;
        }
        .key-expr-label {
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 0.65rem;
        }
        .key-expr-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            align-items: center;
        }
        .clickable-song-verb {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(217, 119, 6, 0.18));
            border: 2px solid #fbbf24;
            color: #fef08a;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 700;
            font-family: inherit;
            font-size: 0.96rem;
            transition: all 0.2s ease;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
        }
        .clickable-song-verb:hover {
            background: rgba(245, 158, 11, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 6px 14px rgba(245, 158, 11, 0.35);
        }
        .clickable-song-verb.active {
            border-color: #38bdf8;
            color: #ffffff;
            background: rgba(14, 165, 233, 0.35);
        }
        .stress-syllable {
            color: #fbbf24;
            font-weight: 900;
            background: rgba(245, 158, 11, 0.25);
            padding: 0.05rem 0.3rem;
            border-radius: 4px;
            border-bottom: 2px solid #f59e0b;
            letter-spacing: 0.3px;
        }
        .clickable-song-verb.active .stress-syllable {
            color: #ffffff;
            border-bottom-color: #38bdf8;
            background: rgba(56, 189, 248, 0.35);
        }
        .verse-crop-drawer {
            display: none;
            background: rgba(15, 23, 42, 0.95);
            border: 2px solid rgba(251, 191, 36, 0.55);
            border-radius: 14px;
            padding: 1.1rem;
            animation: fadeIn 0.25s ease;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
        }
        .verse-crop-drawer.open {
            display: flex;
            gap: 1.2rem;
            align-items: center;
            flex-wrap: wrap;
        }
        .verse-crop-thumb {
            width: 210px;
            height: 145px;
            border-radius: 10px;
            border: 2px solid #fbbf24;
            background-image: url('assets/sang_godmorgen_lille_land_vrimmel.jpg');
            background-repeat: no-repeat;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        .verse-crop-info {
            flex: 1;
            min-width: 220px;
        }
        .verse-crop-badge {
            display: inline-block;
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            margin-bottom: 0.35rem;
            text-transform: uppercase;
        }
        .verse-crop-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.25rem;
        }
        .verse-crop-desc {
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.45;
            margin-bottom: 0.65rem;
        }
        .verse-crop-close {
            background: #334155;
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.4rem 0.85rem;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .verse-crop-close:hover {
            background: #475569;
            color: #fbbf24;
        }

        /* Detective & Comprehension */
        .detective-score-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding: 0.75rem 1.2rem;
            background: #0f172a;
            border-radius: 12px;
        }
        .detective-clue-box {
            text-align: center;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(14, 165, 233, 0.15));
            border: 2px solid rgba(96, 165, 250, 0.4);
            border-radius: 16px;
            padding: 1.25rem;
            margin-bottom: 1.25rem;
        }
        .detective-clue-title {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #93c5fd;
            font-weight: 700;
            margin-bottom: 0.35rem;
        }
        .detective-clue-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.65rem;
        }
        .detective-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.75rem;
            margin-top: 1rem;
        }
        .detective-opt-btn {
            background: #0f172a;
            color: #f8fafc;
            border: 2px solid #334155;
            padding: 0.9rem 1rem;
            border-radius: 12px;
            font-size: 0.98rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
        }
        .detective-opt-btn:hover {
            border-color: #60a5fa;
            background: #1e293b;
        }
        .detective-opt-btn.correct {
            background: rgba(34, 197, 94, 0.2);
            border-color: #22c55e;
            color: #4ade80;
        }
        .detective-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.2);
            border-color: #ef4444;
            color: #f87171;
        }
        .detective-feedback-box {
            margin-top: 1rem;
            padding: 1rem 1.25rem;
            border-radius: 12px;
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            display: none;
        }
        .detective-next-btn {
            margin-top: 0.75rem;
            background: #22c55e;
            color: #052e16;
            border: none;
            padding: 0.65rem 1.4rem;
            border-radius: 10px;
            font-weight: 800;
            cursor: pointer;
        }

        /* Tab 4: Sentence Builder & Puzzle */
        .saetning-intro-banner {
            text-align: center;
            margin-bottom: 1.4rem;
        }
        .saetning-intro-badge {
            display: inline-block;
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid rgba(245, 158, 11, 0.35);
            color: #fbbf24;
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.28rem 0.85rem;
            border-radius: 999px;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }
        .saetning-intro-title {
            font-size: 1.55rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.35rem;
        }
        .saetning-intro-desc {
            color: #cbd5e1;
            font-size: 0.96rem;
            max-width: 680px;
            margin: 0 auto;
        }
        .saetning-sub-tabs {
            display: flex;
            justify-content: center;
            gap: 0.6rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }
        .saetning-sub-tab-btn {
            background: #0f172a;
            color: #94a3b8;
            border: 2px solid #334155;
            padding: 0.65rem 1.25rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
        }
        .saetning-sub-tab-btn.active {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: #ffffff;
            border-color: #60a5fa;
        }
        .saetning-sub-panel {
            display: none;
        }
        .saetning-sub-panel.active {
            display: block;
        }
        .puzzle-wrapper {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.4rem;
        }
        .puzzle-pills-row {
            display: flex;
            justify-content: center;
            gap: 0.45rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }
        .puzzle-pill {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 2px solid #334155;
            background: #1e293b;
            color: #94a3b8;
            font-weight: 800;
            cursor: pointer;
        }
        .puzzle-pill.active {
            border-color: #fbbf24;
            background: #f59e0b;
            color: #0f172a;
        }
        .puzzle-pill.completed {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
        }
        .puzzle-question-card {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 0.9rem 1.3rem;
            text-align: center;
            margin-bottom: 1rem;
        }
        .puzzle-question-title {
            font-size: 1.2rem;
            font-weight: 800;
            color: #f8fafc;
            margin: 0;
        }
        .puzzle-slots {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.75rem;
            margin: 1.2rem 0;
        }
        .puzzle-slot {
            min-height: 92px;
            border-radius: 14px;
            border: 2px dashed #475569;
            background: rgba(30, 41, 59, 0.5);
            padding: 0.75rem 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            cursor: pointer;
            position: relative;
        }
        .puzzle-slot.slot-tid { border-color: rgba(245, 158, 11, 0.5); }
        .puzzle-slot.slot-verbum { border-color: rgba(239, 68, 68, 0.5); }
        .puzzle-slot.slot-subjekt { border-color: rgba(59, 130, 246, 0.5); }
        .puzzle-slot.slot-objekt { border-color: rgba(16, 185, 129, 0.5); }
        .puzzle-slot.filled {
            border-style: solid;
            background: #1e293b;
        }
        .slot-badge-num {
            position: absolute;
            top: -10px;
            left: 12px;
            background: #0f172a;
            border: 1px solid #475569;
            color: #cbd5e1;
            font-size: 0.7rem;
            font-weight: 800;
            padding: 0.1rem 0.45rem;
            border-radius: 999px;
        }
        .slot-hint-text {
            font-size: 0.85rem;
            font-weight: 700;
            color: #cbd5e1;
            margin-bottom: 0.25rem;
        }
        .slot-grammar-tag {
            font-size: 0.7rem;
            font-weight: 700;
            padding: 0.12rem 0.45rem;
            border-radius: 6px;
        }
        .tag-tid { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .tag-verbum { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        .tag-subjekt { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
        .tag-objekt { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .slot-word-content {
            font-size: 1.08rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 0.2rem;
        }
        .puzzle-word-bank {
            display: flex;
            flex-wrap: wrap;
            gap: 0.65rem;
            justify-content: center;
            margin-bottom: 1.2rem;
        }
        .puzzle-chip-btn {
            background: linear-gradient(145deg, #1e293b, #334155);
            color: #f8fafc;
            border: 2px solid #64748b;
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 800;
            cursor: pointer;
        }
        .puzzle-chip-btn:disabled {
            opacity: 0.25;
            cursor: default;
        }
        .puzzle-feedback-area {
            text-align: center;
        }
        .puzzle-msg {
            padding: 0.85rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            margin-bottom: 0.8rem;
        }
        .puzzle-msg.success {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #4ade80;
        }
        .puzzle-msg.error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid #ef4444;
            color: #f87171;
        }
        .puzzle-action-row {
            display: flex;
            justify-content: center;
            gap: 0.65rem;
        }
        .next-task-btn, .retry-task-btn {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #052e16;
            border: none;
            padding: 0.65rem 1.3rem;
            border-radius: 10px;
            font-weight: 800;
            cursor: pointer;
        }
        .retry-task-btn {
            background: #334155;
            color: #f8fafc;
        }

        /* Step Builder */
        .step-builder-wrapper {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.4rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .builder-guided-row {
            background: rgba(30, 41, 59, 0.6);
            border-radius: 14px;
            padding: 0.9rem 1.1rem;
            border-left: 5px solid #475569;
        }
        .builder-guided-row.row-tid { border-left-color: #f59e0b; }
        .builder-guided-row.row-verbum { border-left-color: #ef4444; }
        .builder-guided-row.row-subjekt { border-left-color: #3b82f6; }
        .builder-guided-row.row-objekt { border-left-color: #10b981; }
        .builder-guided-title {
            font-size: 0.96rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.55rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .builder-options-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .builder-choice-chip {
            background: #0f172a;
            color: #cbd5e1;
            border: 1.5px solid #334155;
            padding: 0.5rem 0.95rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
        }
        .builder-choice-chip.selected.sel-tid { background: #f59e0b; color: #0f172a; border-color: #fbbf24; }
        .builder-choice-chip.selected.sel-verbum { background: #ef4444; color: #ffffff; border-color: #f87171; }
        .builder-choice-chip.selected.sel-subjekt { background: #3b82f6; color: #ffffff; border-color: #60a5fa; }
        .builder-choice-chip.selected.sel-objekt { background: #10b981; color: #052e16; border-color: #34d399; }
        .live-sentence-display {
            background: linear-gradient(145deg, #1e293b, #0f172a);
            border: 2px solid rgba(251, 191, 36, 0.45);
            border-radius: 16px;
            padding: 1.25rem;
            text-align: center;
        }
        .live-badge-label {
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #94a3b8;
            font-weight: 800;
            margin-bottom: 0.4rem;
        }
        .live-sentence-text {
            font-size: 1.45rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.65rem;
        }
        .word-color-tid { color: #fbbf24; }
        .word-color-verbum { color: #f87171; text-decoration: underline; }
        .word-color-subjekt { color: #60a5fa; }
        .word-color-objekt { color: #34d399; }

        /* Tab 5: Geography Matching & Landsdele */
        .matching-game-section {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 16px;
            padding: 1.35rem;
            margin-bottom: 1.8rem;
        }
        .matching-columns-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            margin-top: 1rem;
        }
        .matching-col {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
        }
        .match-card-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 2px solid #334155;
            border-radius: 12px;
            padding: 0.8rem 1rem;
            text-align: left;
            font-size: 0.92rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .match-card-btn.selected {
            border-color: #fbbf24;
            background: rgba(245, 158, 11, 0.15);
        }
        .match-card-btn.matched {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            cursor: default;
        }
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .comparison-item {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.15rem;
        }

        /* Tab 6: Samtale & Puslesætninger (Byg dit eget svar) */
        .samtale-puzzle-list {
            display: flex;
            flex-direction: column;
            gap: 1.75rem;
            margin-bottom: 2.5rem;
        }
        .samtale-puzzle-card {
            background: #0f172a;
            border: 1px solid rgba(56, 189, 248, 0.35);
            border-radius: 18px;
            padding: 1.5rem 1.6rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
            transition: all 0.25s ease;
        }
        .samtale-puzzle-card:hover {
            border-color: rgba(96, 165, 250, 0.65);
            box-shadow: 0 8px 26px rgba(0, 0, 0, 0.45);
        }
        .samtale-q-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            flex-wrap: wrap;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.85rem;
        }
        .samtale-q-badge {
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
            padding: 0.22rem 0.7rem;
            border-radius: 999px;
            letter-spacing: 0.04em;
            display: inline-block;
            margin-bottom: 0.35rem;
        }
        .samtale-q-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #fbbf24;
            line-height: 1.35;
            margin: 0;
        }
        .samtale-assembled-box {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
            border: 2px solid rgba(56, 189, 248, 0.45);
            border-radius: 14px;
            padding: 1.2rem 1.35rem;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }
        .samtale-assembled-label {
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
        }
        .samtale-assembled-text {
            font-size: 1.22rem;
            font-weight: 700;
            line-height: 1.6;
            color: #ffffff;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.4rem;
        }
        .assembled-piece {
            padding: 0.18rem 0.55rem;
            border-radius: 6px;
            font-weight: 800;
            display: inline-block;
            transition: all 0.2s ease;
        }
        .assembled-piece-1 {
            color: #fef08a;
            background: rgba(245, 158, 11, 0.22);
            border-bottom: 2px solid #f59e0b;
        }
        .assembled-piece-2 {
            color: #7dd3fc;
            background: rgba(56, 189, 248, 0.22);
            border-bottom: 2px solid #38bdf8;
        }
        .assembled-piece-3 {
            color: #86efac;
            background: rgba(34, 197, 94, 0.22);
            border-bottom: 2px solid #22c55e;
        }
        .assembled-piece-4 {
            color: #d8b4fe;
            background: rgba(168, 85, 247, 0.22);
            border-bottom: 2px solid #a855f7;
        }
        .samtale-assembled-actions {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            flex-wrap: wrap;
            margin-top: 0.25rem;
        }
        .samtale-slots-builder {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background: rgba(15, 23, 42, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 1.1rem 1.25rem;
        }
        .samtale-slot-row {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
        }
        .samtale-slot-header {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .slot-num-badge {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.72rem;
            font-weight: 900;
            color: #0f172a;
        }
        .slot-num-1 { background: #f59e0b; }
        .slot-num-2 { background: #38bdf8; }
        .slot-num-3 { background: #22c55e; }
        .slot-num-4 { background: #a855f7; }
        .slot-label-1 { color: #fef08a; }
        .slot-label-2 { color: #7dd3fc; }
        .slot-label-3 { color: #86efac; }
        .slot-label-4 { color: #d8b4fe; }

        .samtale-chip-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .samtale-chip-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 0.42rem 0.8rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
            font-family: inherit;
        }
        .samtale-chip-btn:hover {
            background: #334155;
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-1px);
        }
        .samtale-chip-btn.active.slot-active-1 {
            background: rgba(245, 158, 11, 0.25);
            border-color: #f59e0b;
            color: #fef08a;
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.35);
        }
        .samtale-chip-btn.active.slot-active-2 {
            background: rgba(56, 189, 248, 0.25);
            border-color: #38bdf8;
            color: #7dd3fc;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
        }
        .samtale-chip-btn.active.slot-active-3 {
            background: rgba(34, 197, 94, 0.25);
            border-color: #22c55e;
            color: #86efac;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.35);
        }
        .samtale-chip-btn.active.slot-active-4 {
            background: rgba(168, 85, 247, 0.25);
            border-color: #a855f7;
            color: #d8b4fe;
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.35);
        }

        /* Footer Audio Player */
        .song-audio-footer-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.5rem;
            margin-top: 2.5rem;
        }
        .saf-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        .saf-left {
            display: flex;
            align-items: center;
            gap: 1.2rem;
        }
        .saf-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.2rem;
        }
        .saf-sub {
            font-size: 0.92rem;
            color: #94a3b8;
        }
        .saf-actions {
            display: flex;
            gap: 0.8rem;
            align-items: center;
            flex-wrap: wrap;
        }
        .saf-youtube-btn {
            background: #ef4444;
            color: white;
            text-decoration: none;
            padding: 0.65rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.92rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }
        .saf-youtube-btn:hover {
            background: #dc2626;
            transform: translateY(-2px);
        }
        .saf-embed-toggle-btn {
            background: #334155;
            color: #e2e8f0;
            border: 1px solid #475569;
            padding: 0.65rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .saf-embed-toggle-btn:hover {
            background: #475569;
            color: white;
        }
        .saf-embed-container {
            margin-top: 1.2rem;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
            .puzzle-slots,
            .matching-columns-container,
            .samtale-grid {
                grid-template-columns: 1fr;
            }
            .hsb-reference-banner {
                flex-direction: column;
                align-items: stretch;
            }
            .hsb-ref-link {
                justify-content: center;
            }
            .saf-header {
                flex-direction: column;
                align-items: stretch;
            }
            .saf-actions {
                flex-direction: column;
                width: 100%;
            }
            .saf-youtube-btn,
            .saf-embed-toggle-btn {
                width: 100%;
                justify-content: center;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Top Navigation Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = t('gm_back_btn', '← Tilbage til Danske sange');
    backBtn.onclick = () => navigateFn('sange');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Hero Header
    const hero = document.createElement('div');
    hero.className = 'hero-song-header';
    hero.innerHTML = `
        <div class="hero-song-badge">${t('gm_hero_badge', 'Danske sange & Danmarks geografi')}</div>
        <h1>${t('gm_hero_title', 'Godmorgen, lille land')}</h1>
        <p>${t('gm_hero_desc', 'Lær nøgleudtrykkene fra sangen og gå på opdagelse i Danmarks geografi, kyster, øer og broer.')}</p>
    `;
    viewContainer.appendChild(hero);

    // Højskolesangbogen Official Link & Copyright Credit Banner (Løsning A)
    const hsbBanner = document.createElement('div');
    hsbBanner.className = 'hsb-reference-banner';
    hsbBanner.innerHTML = `
        <div class="hsb-ref-text">
            <div class="hsb-ref-title">${t('gm_hsb_title', 'Tekst: Niels Brunse (1998) · Melodi: Carsten Johs. Mørch (1998)')}</div>
            <div class="hsb-ref-sub">
                ${t('gm_hsb_sub', 'Skrevet til indvielsen af Storebæltsbroen den 14. juni 1998 (Højskolesangbogen nr. 24). Her på siden arbejder vi pædagogisk med sangens nøgleudtryk og Danmarks geografi (jf. citatretten).')}
            </div>
        </div>
        <a href="https://hojskolesangbogen.dk/sange/g/godmorgen-lille-land" target="_blank" rel="noopener noreferrer" class="hsb-ref-link">
            ${t('gm_hsb_link', 'Læs hele sangteksten på Højskolesangbogen.dk ↗')}
        </a>
    `;
    viewContainer.appendChild(hsbBanner);

    // Monochrome SVG icons for the vertical overview menu
    const monoSvgs = {
        map: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
        music: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
        search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        puzzle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
        compass: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
        chat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    };

    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'song-tabs-nav';

    const tabsData = [
        { id: 'tab_vrimmel', icon: monoSvgs.map, label: t('gm_tab_vrimmel', '1. Vrimlebillede & Geografi (17 pegefelter)') },
        { id: 'tab_sang', icon: monoSvgs.music, label: t('gm_tab_sang', '2. Nøgleudtryk & Udtalerytme (Geografi i sangen)') },
        { id: 'tab_detektiv', icon: monoSvgs.search, label: t('gm_tab_detektiv', '3. Ord-detektiv (Geografi-jagt på kortet)') },
        { id: 'tab_saetning', icon: monoSvgs.puzzle, label: t('gm_tab_saetning', '4. Sætningsbygger & Puslespil (Geografi)') },
        { id: 'tab_udvikling', icon: monoSvgs.compass, label: t('gm_tab_udvikling', '5. Danmarks landsdele & Parring') },
        { id: 'tab_samtale', icon: monoSvgs.chat, label: t('gm_tab_samtale', '6. Samtale & Puslesætninger: Dit Danmark (Byg svar)') }
    ];

    let currentTab = extraData.activeTab || 'tab_vrimmel';
    if (!tabsData.some(t => t.id === currentTab)) {
        currentTab = 'tab_vrimmel';
    }

    tabsData.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `song-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span class="mono-svg-icon">${t.icon}</span> <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    panelsHolder.className = 'panels-holder';
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', `#/${lang}/sang_godmorgen_lille_land/${currentTab}`);
        tabsMenu.querySelectorAll('.song-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === currentTab);
        });
        panelsHolder.querySelectorAll('.song-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === currentTab);
        });
    }

    // =========================================================================
    // DATA: 17 NØGLEUDTRYK FRA SANGEN & DANMARKS GEOGRAFI
    // Inkluderer de 6 specifikke pegefelter: dis, kyst, sten og sand, havets bølger, bakker, is
    // =========================================================================
    const geografiItems = [
        // 1. DIS
        {
            num: 1,
            id: 'dis',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '1. vers',
            quote: '"et land med dis"',
            title: 'Dis (Morgendis over landet)',
            vocab: 'dis (en dis / disen) · let tåge · morgendis · sløret luft',
            forklaring: 'Dis er en let, lys tåge, som ofte svæver over havet, fjorden og markerne tidligt om morgenen.',
            saetning: 'Morgendisen ligger let over det grønne landskab.',
            x: 26,
            y: 32
        },
        // 2. KYST
        {
            num: 2,
            id: 'kyst',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '1. vers',
            quote: '"med kyst"',
            title: 'Kyst i forstørrelsesglasset (Jyllands vestkyst)',
            vocab: 'en kyst / kysten / kyster · kystlinje · forstørrelsesglas · Vesterhavet',
            forklaring: 'I forstørrelsesglasset ved Jyllands vestkyst ser vi den åbne kyststrækning med havets bølger, der ruller ind fra venstre mod sand og klitter.',
            saetning: 'Forstørrelsesglasset viser den åbne kyst med havet fra venstre.',
            x: 13,
            y: 73
        },
        // 3. STEN OG SAND
        {
            num: 3,
            id: 'sten_og_sand',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '1. vers',
            quote: '"af sten og sand"',
            title: 'Sten og sand (Strandens underlag i forstørrelsesglasset)',
            vocab: 'en sten / stenene · sand · sandstrand · rullesten i forstørrelsesglasset',
            forklaring: 'Inde i forstørrelsesglasset mod højre ses strandens fine sand og de runde rullesten, som er slebet helt glatte af havets bølger.',
            saetning: 'Stranden i forstørrelsesglasset er dækket af hvidt sand og runde sten.',
            x: 17,
            y: 73
        },
        // 4. HAVETS BØLGER
        {
            num: 4,
            id: 'havets_boelger',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '1. vers',
            quote: '"som havets bølger slikker"',
            title: 'Havets bølger (Vesterhavet ruller ind fra venstre)',
            vocab: 'en bølge / bølgerne · havets skvulpen · hvidt skum · brænding',
            forklaring: 'Vesterhavets kraftige bølger ruller ind fra venstre (fra vest) og brydes i hvidt skum mod sandstranden i forstørrelsesglasset.',
            saetning: 'Havets bølger skyller ind fra venstre op over stranden.',
            x: 8,
            y: 73
        },
        // 5. BAKKER
        {
            num: 5,
            id: 'bakker',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '1. vers',
            quote: '"med bakker"',
            title: 'Bakker (De bløde, grønne bakker i Midtjylland)',
            vocab: 'en bakke / bakkerne · bakket terræn · Himmelbjerget · morænebakker',
            forklaring: 'Danmark har ingen bjerge, men landet har mange smukke, bløde grønne bakker skabt af istidens gletsjere.',
            saetning: 'Danmark har mange bløde, grønne bakker.',
            x: 27,
            y: 48
        },
        // 6. IS
        {
            num: 6,
            id: 'is',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '1. vers',
            quote: '"skabt af is"',
            title: 'Is (Gletsjervæggen fra istiden)',
            vocab: 'is (istiden) · en gletsjer · smeltevand · istidslandskab',
            forklaring: 'Under istiden dækkede en kæmpe mur af gletsjeris Danmark og Norden. Isens enorme kræfter formede de bakker og dale, vi har i dag.',
            saetning: 'Den tunge is under istiden skabte de danske bakker.',
            x: 79,
            y: 22
        },
        // 7. SOL
        {
            num: 7,
            id: 'sol',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '1. vers',
            quote: '"et land med sol"',
            title: 'Sol (Morgensolen står op)',
            vocab: 'sol (solen) · solskin · en solopgang · morgenlys',
            forklaring: 'Sangen byder godmorgen til det lille land, når den gyldne morgensol bryder frem over vandet.',
            saetning: 'Morgensolen skinner varmt over vand og land.',
            x: 63,
            y: 18
        },
        // 8. BLÆST OG REGN
        {
            num: 8,
            id: 'blaest_og_regn',
            cat: 'natur_vejr',
            catLabel: 'Natur & Kyst (1. vers)',
            vers: '2. vers',
            quote: '"I sol, i blæst, i regn"',
            title: 'Blæst og regn (Det omskiftelige vejr)',
            vocab: 'blæst (vinden) · regn (regndråber) · omskifteligt · koldt og venligt',
            forklaring: 'Vejret i Danmark kan skifte på få minutter fra solskin til frisk blæst og regnbyger fra vest.',
            saetning: 'Vinden blæser, og regnen falder over markerne.',
            x: 11,
            y: 16
        },
        // 9. SKAGENS GREN
        {
            num: 9,
            id: 'skagens_gren',
            cat: 'nord_syd',
            catLabel: 'Nord til Syd & Mennesker',
            vers: '3. vers',
            quote: '"fra Skagens hvide gren"',
            title: 'Skagens Gren (Danmarks nordligste punkt)',
            vocab: 'en gren (sandodde) · Skagens Fyr · Skagerrak & Kattegat',
            forklaring: 'Grenen ved Skagen er Danmarks nordligste spids. Her mødes de to have, og bølgerne slår sammen ved det hvide fyrtårn.',
            saetning: 'Skagens hvide gren ligger helt mod nord i Jylland.',
            x: 34,
            y: 14
        },
        // 10. BLINK AF HAV OG SØ
        {
            num: 10,
            id: 'blink_hav_og_soe',
            cat: 'oeer_broer',
            catLabel: 'Øer & Broer (2. vers)',
            vers: '2. vers',
            quote: '"med blink af hav og sø"',
            title: 'Blink af hav og sø (Klitsø og hav i forstørrelsesglasset)',
            vocab: 'et hav · en sø · et blink (solens genskin) · klitsø ved kysten',
            forklaring: 'I forstørrelsesglasset ser vi både havet og en fersk klitsø, hvor sollyset blinker smukt i vandoverfladen.',
            saetning: 'Lyset blinker smukt i vandet på havet og søen.',
            x: 14,
            y: 79
        },
        // 11. LILLEBÆLTSBROEN
        {
            num: 11,
            id: 'lillebaelt',
            cat: 'oeer_broer',
            catLabel: 'Øer & Broer (2. vers)',
            vers: '2. vers',
            quote: '"bærer de os fra egn til egn"',
            title: 'Lillebæltsbroen (Jylland – Fyn)',
            vocab: 'en bro · et bælt (Lillebælt) · en halvø (Jylland) · en egn (landsdel)',
            forklaring: 'Broerne over Lillebælt forbinder halvøen Jylland med Fyn for både biler og tog.',
            saetning: 'Lillebæltsbroen forbinder Jylland og Fyn.',
            x: 37,
            y: 59
        },
        // 12. Ø VED Ø
        {
            num: 12,
            id: 'oe_ved_oe',
            cat: 'oeer_broer',
            catLabel: 'Øer & Broer (2. vers)',
            vers: '2. vers',
            quote: '"Godmorgen, ø ved ø!"',
            title: 'Ø ved ø (Fyn og det danske ø-rige)',
            vocab: 'en ø / øer · et ø-rige · Fyn · over 400 øer',
            forklaring: 'Danmark består af halvøen Jylland og over 400 navngivne øer. Fyn ligger som en have midt i landet omgivet af blåt vand.',
            saetning: 'Danmark er et ø-rige med ø ved ø.',
            x: 42,
            y: 68
        },
        // 13. DE SLANKE, LYSE BROER (STOREBÆLTSBROEN I FORSTØRRELSESGLAS)
        {
            num: 13,
            id: 'slanke_lyse_broer',
            cat: 'oeer_broer',
            catLabel: 'Øer & Broer (2. vers)',
            vers: '2. vers',
            quote: '"de slanke, lyse broer"',
            title: 'Storebæltsbroen i forstørrelsesglasset (Fyn – Sjælland)',
            vocab: 'Storebæltsbroen · forstørrelsesglas · hængebro · pyloner · tog og biler',
            forklaring: 'I forstørrelsesglasset direkte mellem Fyn og Sjælland i samme højde ses Storebæltsbroen med dens to høje pyloner, kabler, biler og tog over det blå vand.',
            saetning: 'Storebæltsbroen ses i forstørrelsesglasset mellem Fyn og Sjælland.',
            x: 53,
            y: 68
        },
        // 14. VORES PRIK MOD NORD (SJÆLLAND & KØBENHAVN)
        {
            num: 14,
            id: 'prik_mod_nord',
            cat: 'oeer_broer',
            catLabel: 'Øer & Broer (2. vers)',
            vers: '3. vers',
            quote: '"på vores prik mod nord her på den kuglerunde jord"',
            title: 'Sjælland & Hovedstaden København',
            vocab: 'Sjælland · hovedstaden København · en prik mod nord · tårne og byliv',
            forklaring: 'Sjælland er Danmarks største ø. På verdenskortet ligner det lille Danmark blot en lille prik mod nord på den runde jord.',
            saetning: 'København ligger på Sjælland ved Øresund.',
            x: 72,
            y: 63
        },
        // 15. GLETSJERVÆG & BISONJAGT (ISTIDEN HVOR SVERIGE LIGGER)
        {
            num: 15,
            id: 'gletsjer_og_bison',
            cat: 'natur_vejr',
            catLabel: 'Istiden & Geografi (Historiske rødder)',
            vers: '1. vers',
            quote: '"med bakker skabt af is"',
            title: 'Gletsjervæg & bisonjagt (Istiden der skabte Danmark)',
            vocab: 'en gletsjervæg · istid · gletsjeris · vilde bisoner · jægere med spyd · istidslandskab',
            forklaring: 'Hvor Sverige ligger mod nordøst, ser vi tilbage til istiden for over 10.000 år siden. En enorm gletsjervæg af is dækkede landet, mens tidlige mennesker i skindtøj jagede vilde bisoner foran isen. Da isen smeltede, dannede den Danmarks bløde bakker.',
            saetning: 'Foran den mægtige gletsjervæg af is jager menneskene vilde bisoner på tundraen.',
            x: 86,
            y: 27
        },
        // 16. GEDSERS LANGE ODDE
        {
            num: 16,
            id: 'gedsers_odde',
            cat: 'nord_syd',
            catLabel: 'Nord til Syd & Mennesker',
            vers: '3. vers',
            quote: '"til Gedsers lange odde"',
            title: 'Gedser Odde (Danmarks sydligste punkt)',
            vocab: 'en odde (smal landtange) · Falster · Danmarks sydspids · Østersøen',
            forklaring: 'Gedser Odde på Falster er Danmarks sydligste punkt ud mod Østersøen – modstykket til Skagen mod nord.',
            saetning: 'Gedser Odde på Falster er Danmarks sydligste spids.',
            x: 70,
            y: 91
        },
        // 17. BRO FRA SIND TIL SIND (BORNHOLM & RUNDKIRKE)
        {
            num: 17,
            id: 'bro_fra_sind_til_sind',
            cat: 'nord_syd',
            catLabel: 'Nord til Syd & Mennesker',
            vers: '4. vers',
            quote: '"bygger vi bro fra sind til sind"',
            title: 'Bornholm & Bro fra sind til sind',
            vocab: 'at bygge bro · fra sind til sind · forståelse · fællesskab · Bornholm',
            forklaring: 'Sangen minder os om, at de vigtigste broer er dem, vi bygger mellem hinanden gennem samtale og forståelse.',
            saetning: 'Når vi taler sammen, bygger vi bro fra menneske til menneske.',
            x: 91,
            y: 80
        }
    ];

    // =========================================================================
    // TAB 1: VRIMLEBILLEDE & GEOGRAFI
    // =========================================================================
    const panelVrimmel = document.createElement('div');
    panelVrimmel.className = `song-panel ${currentTab === 'tab_vrimmel' ? 'active' : ''}`;
    panelVrimmel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    const controlBar = document.createElement('div');
    controlBar.className = 'vrimmel-control-bar';

    const filterGroup = document.createElement('div');
    filterGroup.className = 'vrimmel-filter-group';
    filterGroup.innerHTML = `
        <button class="vrimmel-filter-btn active" data-cat="all">${t('gm_filter_all', 'Alle (17)')}</button>
        <button class="vrimmel-filter-btn" data-cat="natur_vejr">${t('gm_filter_natur_vejr', 'Natur & Kyst (1. vers) (8)')}</button>
        <button class="vrimmel-filter-btn" data-cat="oeer_broer">${t('gm_filter_oeer_broer', 'Øer & Broer (2. vers) (4)')}</button>
        <button class="vrimmel-filter-btn" data-cat="nord_syd">${t('gm_filter_nord_syd', 'Nord til Syd & Mennesker (5)')}</button>
    `;
    controlBar.appendChild(filterGroup);

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-toggle-btn';
    let pureActive = false;
    pureBtn.innerHTML = `${t('gm_pure_show', 'Vis kun billedet:')} <strong id="gm-pure-status">${t('gm_pure_fra', 'FRA')}</strong>`;
    pureBtn.onclick = () => {
        pureActive = !pureActive;
        stage.classList.toggle('pure-mode', pureActive);
        pureBtn.classList.toggle('active', pureActive);
        pureBtn.querySelector('#gm-pure-status').textContent = pureActive ? t('gm_pure_til', 'TIL') : t('gm_pure_fra', 'FRA');
    };
    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/sang_godmorgen_lille_land_vrimmel.jpg';
    img.alt = 'Godmorgen, lille land – Vrimlebillede over Danmarks geografi';
    stage.appendChild(img);

    const detailCard = document.createElement('div');
    detailCard.className = 'hotspot-detail-card';

    const dots = [];
    let currentGeoIdx = 0;

    function selectGeoItem(item) {
        currentGeoIdx = geografiItems.findIndex(g => g.num === item.num);
        dots.forEach(d => d.classList.toggle('active', Number(d.dataset.num) === item.num));

        const titleTrans = t(`gm_item_${item.id}_title`, item.title);
        const vocabTrans = t(`gm_item_${item.id}_vocab`, item.vocab);
        const forklaringTrans = t(`gm_item_${item.id}_forklaring`, item.forklaring);
        const saetningTrans = t(`gm_item_${item.id}_saetning`, item.saetning);
        const badgeText = t('gm_hotspot_badge', { num: item.num, total: geografiItems.length }, `Punkt ${item.num} af ${geografiItems.length}`);

        detailCard.innerHTML = `
            <div class="detail-info-left">
                <div class="detail-badges">
                    <span class="badge-pill badge-dag">${badgeText} · ${item.catLabel}</span>
                    <span class="badge-pill badge-quote">${item.vers}: ${item.quote}</span>
                </div>
                <div class="detail-title">
                    ${item.title}
                    ${!isDa && titleTrans !== item.title ? `<div style="font-size: 0.95rem; font-weight: 500; color: #94a3b8; margin-top: 0.15rem;">${titleTrans}</div>` : ''}
                </div>
                <div class="detail-forms">
                    <strong>${t('gm_vocab_label', 'Nøgleord:')}</strong> ${item.vocab}
                    ${!isDa && vocabTrans !== item.vocab ? `<div style="color: #94a3b8; font-size: 0.88rem; margin-top: 0.1rem;">${vocabTrans}</div>` : ''}
                </div>
                <div class="detail-redskaber">
                    ${item.forklaring}
                    ${!isDa && forklaringTrans !== item.forklaring ? `<div style="color: #94a3b8; font-size: 0.88rem; margin-top: 0.15rem;">${forklaringTrans}</div>` : ''}
                </div>
                <div class="detail-saetning-box">
                    "${item.saetning}"
                    ${!isDa && saetningTrans !== item.saetning ? `<div style="font-size: 0.92rem; color: #cbd5e1; margin-top: 0.25rem; font-style: italic;">"${saetningTrans}"</div>` : ''}
                </div>
            </div>
            <div class="detail-actions-right ah-step-nav-btns">
                <button class="ah-step-btn" id="btn-gm-prev" type="button">← ${t('gm_btn_prev', 'Forrige')}</button>
                <button class="listen-btn" id="btn-listen-gm-hotspot" type="button">
                    ${t('gm_btn_listen_sentence', 'Lyt til sætning')}
                </button>
                <button class="ah-step-btn" id="btn-gm-next" type="button">${t('gm_btn_next', 'Næste')} →</button>
            </div>
        `;
        detailCard.querySelector('#btn-listen-gm-hotspot').onclick = () => {
            speakDanish(item.saetning);
        };
        detailCard.querySelector('#btn-gm-prev').onclick = () => {
            const prevIdx = (currentGeoIdx - 1 + geografiItems.length) % geografiItems.length;
            selectGeoItem(geografiItems[prevIdx]);
        };
        detailCard.querySelector('#btn-gm-next').onclick = () => {
            const nextIdx = (currentGeoIdx + 1) % geografiItems.length;
            selectGeoItem(geografiItems[nextIdx]);
        };
    }

    geografiItems.forEach((item, idx) => {
        const dot = document.createElement('div');
        dot.className = `vrimmel-hotspot ${idx === 0 ? 'active' : ''}`;
        dot.style.left = `${item.x}%`;
        dot.style.top = `${item.y}%`;
        dot.textContent = item.num;
        dot.title = `${item.num}. ${item.title}`;
        dot.dataset.cat = item.cat;
        dot.dataset.num = item.num;
        dot.onclick = () => {
            selectGeoItem(item);
            speakDanish(item.title);
        };
        stage.appendChild(dot);
        dots.push(dot);
    });

    selectGeoItem(geografiItems[0]);

    filterGroup.querySelectorAll('.vrimmel-filter-btn').forEach(btn => {
        btn.onclick = () => {
            filterGroup.querySelectorAll('.vrimmel-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            dots.forEach(d => {
                d.style.display = (cat === 'all' || d.dataset.cat === cat) ? 'flex' : 'none';
            });
            const firstMatch = geografiItems.find(g => cat === 'all' || g.cat === cat);
            if (firstMatch) selectGeoItem(firstMatch);
        };
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailCard);
    panelVrimmel.appendChild(vrimmelCard);
    panelsHolder.appendChild(panelVrimmel);

    // =========================================================================
    // TAB 2: NØGLEUDTRYK, UDTALERYTME & GEOGRAFI
    // Af hensyn til sangens ophavsret (tekst: Niels Brunse 1998) vises ikke den
    // samlede sangtekst, men udelukkende de udvalgte nøgleudtryk, stavelser og
    // udtalerytme med link til originalteksten på Højskolesangbogen.dk.
    // =========================================================================
    const panelSang = document.createElement('div');
    panelSang.className = `song-panel ${currentTab === 'tab_sang' ? 'active' : ''}`;
    panelSang.dataset.panel = 'tab_sang';

    const sangIntroBanner = document.createElement('div');
    sangIntroBanner.className = 'hsb-reference-banner';
    sangIntroBanner.innerHTML = `
        <div class="hsb-ref-text">
            <div class="hsb-ref-title">${t('gm_t2_banner_title', 'Nøgleudtryk, udtalerytme & geografi i sangen')}</div>
            <div class="hsb-ref-sub">
                ${t('gm_t2_banner_desc', 'Lær de vigtige geografiord med udtale og tryk. Klik på et nøgleudtryk for at høre udtalen og se udsnittet på Danmarkskortet. Læs hele den samlede originaltekst og lyt til melodien på Højskolesangbogens officielle hjemmeside.')}
            </div>
        </div>
        <a href="https://hojskolesangbogen.dk/sange/g/godmorgen-lille-land" target="_blank" rel="noopener noreferrer" class="hsb-ref-link">
            ${t('gm_hsb_link', 'Åbn sangteksten på Højskolesangbogen.dk ↗')}
        </a>
    `;
    panelSang.appendChild(sangIntroBanner);

    const themesData = [
        {
            themeNum: '1. del af sangen',
            title: 'Landskab, kyst og spor fra istiden',
            themeTag: 'Natur & Landskab',
            explanation: 'Sangen indledes med en hyldest til det danske naturlandskab og vejr: morgendis (den lette tåge over markerne), de tusindvis af kilometer kyst med sand og sten, bølgernes skvulpen og de bløde bakker, som isen formede under den seneste istid.',
            spokenKeywords: 'Kyst af sten og sand. Havets bølger. Bakker skabt af is. Land med dis. Land med sol.',
            terms: [
                {
                    html: `kyst af <span class="stress-syllable">STÉN</span> og <span class="stress-syllable">SÁND</span>`,
                    speakText: 'kyst af sten og sand',
                    cropTitle: 'Kyst, sten og sand i forstørrelsesglasset',
                    cropDesc: 'Udsnit af Danmarkskortet: Forstørrelsesglasset ved Jyllands vestkyst med sandstrand, rullesten og havet ind fra venstre.',
                    cropX: 13,
                    cropY: 73
                },
                {
                    html: `<span class="stress-syllable">HÁ</span>-vets <span class="stress-syllable">BǾL</span>-ger`,
                    speakText: 'havets bølger',
                    cropTitle: 'Havets bølger i forstørrelsesglasset',
                    cropDesc: 'Udsnit af Danmarkskortet: Vesterhavets hvide brænding og bølgeskvulp mod kysten ruller ind fra venstre.',
                    cropX: 8,
                    cropY: 73
                },
                {
                    html: `<span class="stress-syllable">BÁK</span>-ker skabt af <span class="stress-syllable">ÍS</span>`,
                    speakText: 'bakker skabt af is',
                    cropTitle: 'Bakker skabt af is (Midtjylland)',
                    cropDesc: 'Udsnit af Danmarkskortet: De bakkede morænelandskaber i det centrale Jylland formet af istidens gletsjere.',
                    cropX: 27,
                    cropY: 48
                },
                {
                    html: `land med <span class="stress-syllable">DÍS</span>`,
                    speakText: 'land med dis',
                    cropTitle: 'Dis over fjorden og landet',
                    cropDesc: 'Udsnit af Danmarkskortet: Den lette, hvide morgendis over Limfjorden og det nordjyske landskab.',
                    cropX: 26,
                    cropY: 32
                },
                {
                    html: `land med <span class="stress-syllable">SÓL</span>`,
                    speakText: 'land med sol',
                    cropTitle: 'Morgensolen over Danmark',
                    cropDesc: 'Udsnit af Danmarkskortet: Den gyldne morgensol, som står op over det danske ø-rige.',
                    cropX: 63,
                    cropY: 18
                }
            ]
        },
        {
            themeNum: '2. del af sangen',
            title: 'Ø-riget og de slanke broer',
            themeTag: 'Øer & Broer',
            explanation: 'Danmark består af over 400 øer (heraf ca. 70 beboede). Sangen hylder de slanke, lyse broer – som Storebæltsbroen og Lillebæltsbroen – der i sol, blæst og regn bærer folk fra egn til egn over hav og sø.',
            spokenKeywords: 'Ø ved ø. De slanke lyse broer. Blink af hav og sø. Bærer os fra egn til egn.',
            terms: [
                {
                    html: `<span class="stress-syllable">Ǿ</span> ved <span class="stress-syllable">Ǿ</span>`,
                    speakText: 'ø ved ø',
                    cropTitle: 'Det danske ø-rige',
                    cropDesc: 'Udsnit af Danmarkskortet: Fyn og de mange små øer i det Sydfynske Øhav omgivet af blåt vand.',
                    cropX: 42,
                    cropY: 68
                },
                {
                    html: `de <span class="stress-syllable">SLÁN</span>-ke, <span class="stress-syllable">LÝ</span>-se <span class="stress-syllable">BRÓ</span>-er`,
                    speakText: 'de slanke, lyse broer',
                    cropTitle: 'Storebæltsbroen i forstørrelsesglasset',
                    cropDesc: 'Udsnit af Danmarkskortet: Storebæltsbroen vist i detaljer i det cirkulære forstørrelsesglas med pyloner, biler og tog over Storebælt mellem Fyn og Sjælland i samme højde.',
                    cropX: 53,
                    cropY: 68
                },
                {
                    html: `blink af <span class="stress-syllable">HÁV</span> og <span class="stress-syllable">SǾ</span>`,
                    speakText: 'blink af hav og sø',
                    cropTitle: 'Blink af hav og sø i forstørrelsesglasset',
                    cropDesc: 'Udsnit af Danmarkskortet: Klitsøen og Vesterhavets blinkende vandoverflade i forstørrelsesglasset mod vest.',
                    cropX: 13,
                    cropY: 73
                },
                {
                    html: `fra <span class="stress-syllable">ÉGN</span> til <span class="stress-syllable">ÉGN</span>`,
                    speakText: 'fra egn til egn',
                    cropTitle: 'Fra egn til egn over broen',
                    cropDesc: 'Udsnit af Danmarkskortet: Biler og tog, der forbinder landsdelene over Storebælt mellem Fyn og Sjælland.',
                    cropX: 53,
                    cropY: 68
                }
            ]
        },
        {
            themeNum: '3. del af sangen',
            title: 'Danmarks akse: Fra Skagen til Gedser Odde',
            themeTag: 'Nord & Syd',
            explanation: 'Sangen tegner en geografilinje tværs over kongeriget: Fra Skagens hvide gren i nord til Gedser Odde på Falster i syd. En strækning på ca. 360 km i fugleflugtslinje på vores lille prik mod nord på den runde jord.',
            spokenKeywords: 'Skagens hvide gren. Gedsers lange odde. Vores prik mod nord. Fra nord til syd.',
            terms: [
                {
                    html: `<span class="stress-syllable">SKÁ</span>-gens <span class="stress-syllable">HVÍ</span>-de <span class="stress-syllable">GRÉN</span>`,
                    speakText: 'Skagens hvide gren',
                    cropTitle: 'Skagens hvide gren (Danmarks nordspids)',
                    cropDesc: 'Udsnit af Danmarkskortet: Grenen ved Skagen, hvor Skagerrak og Kattegat mødes i hvidt skum.',
                    cropX: 34,
                    cropY: 14
                },
                {
                    html: `<span class="stress-syllable">GÉD</span>-sers lange <span class="stress-syllable">ÓD</span>-de`,
                    speakText: 'Gedsers lange odde',
                    cropTitle: 'Gedser Odde (Danmarks sydspids)',
                    cropDesc: 'Udsnit af Danmarkskortet: Gedser Odde på Falster, Danmarks sydligste punkt ud mod Østersøen.',
                    cropX: 70,
                    cropY: 90
                },
                {
                    html: `vores <span class="stress-syllable">PRÍK</span> mod <span class="stress-syllable">NÓRD</span>`,
                    speakText: 'vores prik mod nord',
                    cropTitle: 'Vores prik mod nord på jordkloden',
                    cropDesc: 'Udsnit af Danmarkskortet: Danmarks placering højt mod nord på den runde klode.',
                    cropX: 34,
                    cropY: 10
                },
                {
                    html: `fra <span class="stress-syllable">NÓRD</span> til <span class="stress-syllable">SÝD</span>`,
                    speakText: 'fra nord til syd',
                    cropTitle: 'Fra nord til syd gennem hele landet',
                    cropDesc: 'Udsnit af Danmarkskortet: Den geografiske akse tværs gennem Danmarks øer og landsdele.',
                    cropX: 48,
                    cropY: 50
                }
            ]
        },
        {
            themeNum: '4. del af sangen',
            title: 'Mennesker, sprog og fællesskab',
            themeTag: 'Fællesskab',
            explanation: 'Sangen slutter med et budskab om menneskelig kontakt og åbenhed: Ingen i landet er alene, når vi byder dagen og verden velkommen og taler sammen – "bygger vi bro fra sind til sind".',
            spokenKeywords: 'Bygger vi bro fra sind til sind. Ingen er alene. Gletsjervæggen af is.',
            terms: [
                {
                    html: `bygger vi <span class="stress-syllable">BRÓ</span> fra <span class="stress-syllable">SÍND</span> til <span class="stress-syllable">SÍND</span>`,
                    speakText: 'bygger vi bro fra sind til sind',
                    cropTitle: 'Bro fra sind til sind & Bornholm',
                    cropDesc: 'Udsnit af Danmarkskortet: Mødet mellem mennesker, samtale og fællesskab på tværs af landet.',
                    cropX: 91,
                    cropY: 80
                },
                {
                    html: `<span class="stress-syllable">ÍN</span>-gen er a-<span class="stress-syllable">LÉ</span>-ne`,
                    speakText: 'ingen er alene',
                    cropTitle: 'Ingen er alene i landet',
                    cropDesc: 'Udsnit af Danmarkskortet: Fællesskab i byer, landsbyer og hjem overalt i Danmark.',
                    cropX: 74,
                    cropY: 63
                },
                {
                    html: `<span class="stress-syllable">GLETS</span>-jer-væg og <span class="stress-syllable">BÍ</span>-son`,
                    speakText: 'gletsjervæg og bison',
                    cropTitle: 'Gletsjervæggen & bisonjagt i istiden',
                    cropDesc: 'Udsnit af Danmarkskortet: Den mægtige gletsjervæg af is og istidsjægere, der jager bisoner.',
                    cropX: 86,
                    cropY: 27
                }
            ]
        }
    ];

    const seqFlow = document.createElement('div');
    seqFlow.className = 'song-sequence-flow';

    themesData.forEach((themeItem, themeIdx) => {
        const card = document.createElement('div');
        card.className = 'verse-card';

        const titleTrans = t(`gm_t2_v${themeIdx + 1}_title`, themeItem.title);
        const tagTrans = t(`gm_t2_v${themeIdx + 1}_tag`, themeItem.themeTag);
        const expTrans = t(`gm_t2_v${themeIdx + 1}_forklaring`, themeItem.explanation);

        // Chips HTML
        const chipsHtml = themeItem.terms.map((term, idx) => `
            <button type="button" class="clickable-song-verb" data-idx="${idx}" title="Klik for at høre udtale og se kortudsnit">
                ${term.html}
            </button>
        `).join('');

        const firstTerm = themeItem.terms[0];

        card.innerHTML = `
            <div class="verse-card-header">
                <div class="verse-day-title">
                    ${themeItem.themeNum}: ${themeItem.title}
                    ${!isDa && titleTrans !== themeItem.title ? `<div style="font-size: 0.95rem; font-weight: 500; color: #94a3b8; margin-top: 0.15rem;">${titleTrans}</div>` : ''}
                </div>
                <span class="verse-theme-tag">${tagTrans}</span>
            </div>
            <div class="key-expr-box">
                <div class="key-expr-label">${t('gm_t2_banner_badge', 'Nøgleudtryk med udtalerytme & stavelser (klik for udtale & kort):')}</div>
                <div class="key-expr-chips">
                    ${chipsHtml}
                </div>
            </div>
            <div style="font-size: 0.94rem; color: #cbd5e1; line-height: 1.5; background: rgba(15, 23, 42, 0.55); padding: 0.85rem 1.1rem; border-radius: 10px;">
                <strong style="color: #38bdf8;">Betydning & Geografi:</strong> ${themeItem.explanation}
                ${!isDa && expTrans !== themeItem.explanation ? `<div style="color: #94a3b8; font-size: 0.88rem; margin-top: 0.2rem;">${expTrans}</div>` : ''}
            </div>
            <div class="verse-crop-drawer">
                <div class="verse-crop-thumb" style="background-size: 380% 380%; background-position: ${firstTerm.cropX}% ${firstTerm.cropY}%;"></div>
                <div class="verse-crop-info">
                    <span class="verse-crop-badge">${t('gm_t2_crop_title', 'Udsnit fra Danmarkskortet')} · ${themeItem.themeNum}</span>
                    <div class="verse-crop-title">${firstTerm.cropTitle}</div>
                    <div class="verse-crop-desc">${firstTerm.cropDesc}</div>
                    <button type="button" class="verse-crop-close">${t('gm_t2_crop_close', 'Luk udsnit')}</button>
                </div>
            </div>
            <div>
                <button type="button" class="listen-btn btn-theme-speak" style="padding: 0.55rem 1.1rem; font-size: 0.88rem;">
                    ${t('gm_btn_listen_sentence', 'Lyt til temaets nøgleudtryk')} (${themeItem.themeNum})
                </button>
            </div>
        `;

        const drawer = card.querySelector('.verse-crop-drawer');
        const cropThumb = card.querySelector('.verse-crop-thumb');
        const cropTitle = card.querySelector('.verse-crop-title');
        const cropDesc = card.querySelector('.verse-crop-desc');
        const closeBtn = card.querySelector('.verse-crop-close');
        const termBtns = card.querySelectorAll('.clickable-song-verb');

        termBtns.forEach(btn => {
            btn.onclick = () => {
                const idx = Number(btn.dataset.idx);
                const selectedTerm = themeItem.terms[idx];
                termBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                cropThumb.style.backgroundPosition = `${selectedTerm.cropX}% ${selectedTerm.cropY}%`;
                cropTitle.textContent = selectedTerm.cropTitle;
                cropDesc.textContent = selectedTerm.cropDesc;

                drawer.classList.add('open');
                speakDanish(selectedTerm.speakText);
            };
        });

        if (closeBtn && drawer) {
            closeBtn.onclick = () => {
                drawer.classList.remove('open');
                termBtns.forEach(b => b.classList.remove('active'));
            };
        }

        card.querySelector('.btn-theme-speak').onclick = (e) => {
            speakDanish(themeItem.spokenKeywords, e.currentTarget, 0.85);
        };

        seqFlow.appendChild(card);
    });

    panelSang.appendChild(seqFlow);
    panelsHolder.appendChild(panelSang);

    // =========================================================================
    // TAB 3: ORD-DETEKTIV (GEOGRAFI-JAGT & FORSTÅELSESOPGAVER)
    // =========================================================================
    const panelDetektiv = document.createElement('div');
    panelDetektiv.className = `song-panel ${currentTab === 'tab_detektiv' ? 'active' : ''}`;
    panelDetektiv.dataset.panel = 'tab_detektiv';

    const detCard = document.createElement('div');
    detCard.className = 'detective-card';

    const detTasks = [
        {
            q: 'Hvad hedder Danmarks nordligste punkt, som nævnes i 3. vers ("fra Skagens hvide ...")?',
            target: 'Skagens Gren (i Nordjylland)',
            options: ['Skagens Gren (i Nordjylland)', 'Gedser Odde (på Falster)', 'Storebæltsbroen', 'Bornholm'],
            tip: 'Skagens Gren ligger helt mod nord i Jylland, hvor Skagerrak og Kattegat mødes.'
        },
        {
            q: 'Hvad hedder Danmarks sydligste punkt, som nævnes i 3. vers ("til Gedsers lange ...")?',
            target: 'Gedser Odde (på Falster)',
            options: ['Gedser Odde (på Falster)', 'Skagens Gren', 'Lillebælt', 'København'],
            tip: 'Gedser Odde på øen Falster er Danmarks sydligste spids ud mod Østersøen.'
        },
        {
            q: 'Hvilken begivenhed blev sangen "Godmorgen, lille land" skrevet til i 1998?',
            target: 'Åbningen af Storebæltsbroen mellem Fyn og Sjælland',
            options: [
                'Åbningen af Storebæltsbroen mellem Fyn og Sjælland',
                'Nytårsaften i København',
                'En fodboldkamp i Parken',
                'Byggeriet af et fyrtårn i Skagen'
            ],
            tip: 'Sangen vandt sangkonkurrencen ved indvielsen af Storebæltsbroen den 14. juni 1998.'
        },
        {
            q: 'Hvad har ifølge 1. vers skabt de runde danske bakker ("med bakker skabt af ...")?',
            target: 'Isen under istiden',
            options: ['Isen under istiden', 'Vulkaner og jordskælv', 'Store floder fra syd', 'Mennesker med skovle'],
            tip: 'Det danske morænelandskab med bløde bakker er formet af isen under istiden.'
        },
        {
            q: 'Hvad består den danske kyst af i 1. vers ("med kyst af ...")?',
            target: 'Sten og sand',
            options: ['Sten og sand', 'Høje isbjerge', 'Kun dybe skove', 'Palmetræer'],
            tip: 'I 1. vers hedder det: "med kyst af sten og sand, som havets bølger slikker".'
        },
        {
            q: 'Hvad betyder ordet "dis" i linjen "Et land med sol, et land med dis"?',
            target: 'Let tåge eller sløret luft over landskabet',
            options: [
                'Let tåge eller sløret luft over landskabet',
                'Stærk storm og orkan',
                'Hård frost og sne',
                'Torden og lyn'
            ],
            tip: 'Dis er en let, lys tåge, som man ofte ser over havet og markerne om morgenen.'
        },
        {
            q: 'Hvilken ø ligger i midten mellem Jylland og Sjælland?',
            target: 'Fyn',
            options: ['Fyn', 'Bornholm', 'Falster', 'Læsø'],
            tip: 'Når man rejser fra Jylland til Sjælland, kører man over Lillebælt til Fyn og derfra over Storebælt til Sjælland.'
        },
        {
            q: 'Hvad betyder udtrykket "bygger vi bro fra sind til sind" i 4. vers?',
            target: 'At vi skaber kontakt, forståelse og fællesskab mellem mennesker',
            options: [
                'At vi skaber kontakt, forståelse og fællesskab mellem mennesker',
                'At vi kun bygger broer af beton og stål',
                'At vi lukker døren og bliver alene hjemme',
                'At vi sejler i båd over søen'
            ],
            tip: '"Fra sind til sind" er et billede på menneskelig forståelse og sammenhold.'
        }
    ];

    let detIdx = 0;
    let detScore = 0;

    function renderDetQuiz() {
        detCard.innerHTML = '';
        const item = detTasks[detIdx];
        const taskNum = detIdx + 1;
        const qTrans = t(`gm_t3_q${taskNum}_text`, item.q);
        const tipTrans = t(`gm_t3_q${taskNum}_tip`, item.tip);
        const taskBadgeText = t('gm_t3_score_badge', { num: taskNum, total: detTasks.length }, `Geografi-opgave ${taskNum} / ${detTasks.length}`);

        const scoreBar = document.createElement('div');
        scoreBar.className = 'detective-score-bar';
        scoreBar.innerHTML = `
            <span style="font-weight: 800; color: #fbbf24;">${taskBadgeText}</span>
            <span style="font-weight: 800; color: #4ade80;">Point: ${detScore}</span>
        `;
        detCard.appendChild(scoreBar);

        const clueBox = document.createElement('div');
        clueBox.className = 'detective-clue-box';
        clueBox.innerHTML = `
            <div class="detective-clue-title">${t('gm_t3_clue_label', 'Godmorgen, lille land · Danmarks geografi')}</div>
            <div class="detective-clue-text">
                "${item.q}"
                ${!isDa && qTrans !== item.q ? `<div style="font-size: 0.95rem; color: #94a3b8; font-weight: 500; margin-top: 0.25rem;">"${qTrans}"</div>` : ''}
            </div>
            <button type="button" class="listen-btn" id="btn-listen-det-q" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                ${t('gm_samtale_listen_q', 'Lyt til spørgsmål')}
            </button>
        `;
        clueBox.querySelector('#btn-listen-det-q').onclick = () => speakDanish(item.q);
        detCard.appendChild(clueBox);

        const optsGrid = document.createElement('div');
        optsGrid.className = 'detective-options-grid';

        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'detective-feedback-box';

        let answered = false;
        item.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'detective-opt-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                if (answered) return;
                answered = true;
                const isCorrect = opt === item.target;
                if (isCorrect) {
                    btn.classList.add('correct');
                    detScore++;
                    scoreBar.querySelector('span:nth-child(2)').textContent = `Point: ${detScore}`;
                    feedbackBox.innerHTML = `
                        <div style="color: #4ade80; font-weight: 800; font-size: 1.12rem; margin-bottom: 0.35rem;">
                            ${t('gm_t3_correct', 'Helt rigtigt!')} <strong>${opt}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.94rem;">
                            ${item.tip}
                            ${!isDa && tipTrans !== item.tip ? `<div style="color: #94a3b8; font-size: 0.88rem; margin-top: 0.15rem;">${tipTrans}</div>` : ''}
                        </div>
                    `;
                    speakDanish(opt);
                } else {
                    btn.classList.add('wrong');
                    optsGrid.querySelectorAll('.detective-opt-btn').forEach(b => {
                        if (b.textContent === item.target) b.classList.add('correct');
                    });
                    feedbackBox.innerHTML = `
                        <div style="color: #f87171; font-weight: 800; font-size: 1.12rem; margin-bottom: 0.35rem;">
                            ${t('gm_t3_wrong', 'Det rigtige svar er:')} <strong>${item.target}</strong>
                        </div>
                        <div style="color: #cbd5e1; font-size: 0.94rem;">
                            ${item.tip}
                            ${!isDa && tipTrans !== item.tip ? `<div style="color: #94a3b8; font-size: 0.88rem; margin-top: 0.15rem;">${tipTrans}</div>` : ''}
                        </div>
                    `;
                }
                feedbackBox.style.display = 'block';
                const nextBtn = document.createElement('button');
                nextBtn.className = 'detective-next-btn';
                nextBtn.textContent = detIdx + 1 < detTasks.length ? `${t('gm_t3_btn_next', 'Næste spørgsmål')} →` : t('gm_quiz_see_result', 'Se dit resultat');
                nextBtn.onclick = () => {
                    if (detIdx + 1 < detTasks.length) {
                        detIdx++;
                        renderDetQuiz();
                    } else {
                        detCard.innerHTML = `
                            <div style="text-align: center; padding: 2rem 1rem;">
                                <h2 style="font-size: 1.8rem; color: #fbbf24; margin-bottom: 0.6rem;">${t('gm_t3_done_title', 'Flot klaret!')}</h2>
                                <p style="font-size: 1.2rem; color: #f8fafc; margin-bottom: 1.5rem;">
                                    ${t('gm_t3_done_desc', { score: detScore, total: detTasks.length }, `Du fik ${detScore} ud af ${detTasks.length} rigtige i Danmarks geografi!`)}
                                </p>
                                <button type="button" class="detective-next-btn" id="btn-restart-det">${t('gm_t3_btn_restart', 'Prøv igen')}</button>
                            </div>
                        `;
                        detCard.querySelector('#btn-restart-det').onclick = () => {
                            detIdx = 0;
                            detScore = 0;
                            renderDetQuiz();
                        };
                    }
                };
                feedbackBox.appendChild(nextBtn);
            };
            optsGrid.appendChild(btn);
        });

        detCard.appendChild(optsGrid);
        detCard.appendChild(feedbackBox);
    }

    renderDetQuiz();
    panelDetektiv.appendChild(detCard);
    panelsHolder.appendChild(panelDetektiv);

    // =========================================================================
    // TAB 4: SÆTNINGSBYGGER & PUSLESPIL (GEOGRAFI & V2-ORDSTILLING)
    // =========================================================================
    const panelSaetning = document.createElement('div');
    panelSaetning.className = `song-panel ${currentTab === 'tab_saetning' ? 'active' : ''}`;
    panelSaetning.dataset.panel = 'tab_saetning';

    const builderCard = document.createElement('div');
    builderCard.className = 'builder-card';

    const introBanner = document.createElement('div');
    introBanner.className = 'saetning-intro-banner';
    introBanner.innerHTML = `
        <span class="saetning-intro-badge">${t('gm_t4_banner_badge', 'Sætningsbygning & Danmarks geografi')}</span>
        <h2 class="saetning-intro-title">${t('gm_t4_banner_title', 'Byg sætninger om Danmark med verbet på 2. plads')}</h2>
        <p class="saetning-intro-desc">
            ${t('gm_t4_banner_desc', 'Når sætningen begynder med et sted eller en tid (f.eks. "I Danmark" eller "Mod nord"), står verbet altid på 2. plads.')}
        </p>
    `;
    builderCard.appendChild(introBanner);

    const subTabs = document.createElement('div');
    subTabs.className = 'saetning-sub-tabs';
    subTabs.innerHTML = `
        <button type="button" class="saetning-sub-tab-btn active" data-st="puzzle">
            ${t('gm_t4_subtab_puzzle', '1. Pusleopgaver (8 sætninger)')}
        </button>
        <button type="button" class="saetning-sub-tab-btn" data-st="step">
            ${t('gm_t4_subtab_step', '2. Trin-for-trin sætningsbygger')}
        </button>
    `;
    builderCard.appendChild(subTabs);

    const puzzleBox = document.createElement('div');
    puzzleBox.className = 'saetning-sub-panel active';

    const stepBox = document.createElement('div');
    stepBox.className = 'saetning-sub-panel';

    builderCard.appendChild(puzzleBox);
    builderCard.appendChild(stepBox);

    subTabs.querySelectorAll('.saetning-sub-tab-btn').forEach(btn => {
        btn.onclick = () => {
            subTabs.querySelectorAll('.saetning-sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.st === 'puzzle') {
                puzzleBox.classList.add('active');
                stepBox.classList.remove('active');
            } else {
                stepBox.classList.add('active');
                puzzleBox.classList.remove('active');
            }
        };
    });

    // A. Pusleopgaver
    (function setupGeoPuzzle(containerEl) {
        const tasks = [
            {
                question: 'Hvad forbinder Storebæltsbroen?',
                correct: ['Over Storebælt', 'forbinder', 'broen', 'Fyn og Sjælland.'],
                scrambled: ['broen', 'Fyn og Sjælland.', 'Over Storebælt', 'forbinder'],
                ruleTip: 'Stedet "Over Storebælt" står på 1. plads, og verbet "forbinder" står på 2. plads.'
            },
            {
                question: 'Hvor ligger Skagen?',
                correct: ['Mod nord', 'ligger', 'Skagen', 'i Jylland.'],
                scrambled: ['Skagen', 'i Jylland.', 'Mod nord', 'ligger'],
                ruleTip: 'Mod nord (1) + ligger (2) + Skagen (3) + i Jylland (4).'
            },
            {
                question: 'Hvad gør bølgerne ved kysten?',
                correct: ['Ved kysten', 'rammer', 'bølgerne', 'sten og sand.'],
                scrambled: ['bølgerne', 'Ved kysten', 'sten og sand.', 'rammer'],
                ruleTip: 'Ved kysten (1) + rammer (2) + bølgerne (3) + sten og sand (4).'
            },
            {
                question: 'Hvordan er vejret i Danmark?',
                correct: ['I Danmark', 'skifter', 'vejret', 'meget hurtigt.'],
                scrambled: ['vejret', 'meget hurtigt.', 'I Danmark', 'skifter'],
                ruleTip: 'I Danmark (1) + skifter (2) + vejret (3) + meget hurtigt (4).'
            },
            {
                question: 'Hvad gør familien om morgenen?',
                correct: ['Om morgenen', 'sidder', 'vi', 'ved morgenbordet.'],
                scrambled: ['vi', 'ved morgenbordet.', 'Om morgenen', 'sidder'],
                ruleTip: 'Om morgenen (1) + sidder (2) + vi (3) + ved morgenbordet (4).'
            },
            {
                question: 'Hvor ligger København?',
                correct: ['På Sjælland', 'ligger', 'hovedstaden', 'København.'],
                scrambled: ['København.', 'ligger', 'På Sjælland', 'hovedstaden'],
                ruleTip: 'På Sjælland (1) + ligger (2) + hovedstaden (3) + København (4).'
            },
            {
                question: 'Hvad har skabt de danske bakker?',
                correct: ['Under istiden', 'skabte', 'isen', 'de grønne bakker.'],
                scrambled: ['isen', 'de grønne bakker.', 'Under istiden', 'skabte'],
                ruleTip: 'Under istiden (1) + skabte (2) + isen (3) + de grønne bakker (4).'
            },
            {
                question: 'Hvad gør vi, når vi taler sammen?',
                correct: ['I hverdagen', 'bygger', 'vi', 'bro mellem mennesker.'],
                scrambled: ['vi', 'bro mellem mennesker.', 'bygger', 'I hverdagen'],
                ruleTip: 'I hverdagen (1) + bygger (2) + vi (3) + bro mellem mennesker (4).'
            }
        ];

        let currentIdx = 0;
        let userSlots = [null, null, null, null];
        const doneSet = new Set();

        const wrap = document.createElement('div');
        wrap.className = 'puzzle-wrapper';

        const slotPrompts = [
            { text: t('gm_t4_slot_time_place', 'Hvor / Hvornår?'), grammar: 'Sted / Tid (1)', colorClass: 'slot-tid', tagClass: 'tag-tid' },
            { text: t('gm_t4_slot_verb', 'Verbum'), grammar: 'Verbum (2)', colorClass: 'slot-verbum', tagClass: 'tag-verbum' },
            { text: t('gm_t4_slot_subject', 'Hvem / Hvad?'), grammar: 'Subjekt (3)', colorClass: 'slot-subjekt', tagClass: 'tag-subjekt' },
            { text: t('gm_t4_slot_rest', 'Resten'), grammar: 'Led (4)', colorClass: 'slot-objekt', tagClass: 'tag-objekt' }
        ];

        function renderTask() {
            wrap.innerHTML = '';
            userSlots = [null, null, null, null];
            const task = tasks[currentIdx];
            const pzNum = currentIdx + 1;
            const qTrans = t(`gm_t4_p${pzNum}_prompt`, task.question);
            const tipTrans = t(`gm_t4_p${pzNum}_ruleTip`, task.ruleTip);

            const pillsRow = document.createElement('div');
            pillsRow.className = 'puzzle-pills-row';
            tasks.forEach((_, i) => {
                const pill = document.createElement('button');
                pill.className = `puzzle-pill ${i === currentIdx ? 'active' : ''} ${doneSet.has(i) ? 'completed' : ''}`;
                pill.textContent = i + 1;
                pill.onclick = () => {
                    currentIdx = i;
                    renderTask();
                };
                pillsRow.appendChild(pill);
            });
            wrap.appendChild(pillsRow);

            const qCard = document.createElement('div');
            qCard.className = 'puzzle-question-card';
            qCard.innerHTML = `
                <h3 class="puzzle-question-title">
                    ${task.question}
                    ${!isDa && qTrans !== task.question ? `<div style="font-size: 0.95rem; color: #94a3b8; font-weight: 500; margin-top: 0.25rem;">${qTrans}</div>` : ''}
                </h3>
            `;
            wrap.appendChild(qCard);

            const slotsContainer = document.createElement('div');
            slotsContainer.className = 'puzzle-slots';
            slotPrompts.forEach((p, idx) => {
                const slot = document.createElement('div');
                slot.className = `puzzle-slot ${p.colorClass}`;
                slot.onclick = () => {
                    if (userSlots[idx]) {
                        userSlots[idx] = null;
                        updateUI();
                    }
                };
                slotsContainer.appendChild(slot);
            });
            wrap.appendChild(slotsContainer);

            const bank = document.createElement('div');
            bank.className = 'puzzle-word-bank';
            wrap.appendChild(bank);

            const feedback = document.createElement('div');
            feedback.className = 'puzzle-feedback-area';
            wrap.appendChild(feedback);

            function updateUI() {
                slotsContainer.querySelectorAll('.puzzle-slot').forEach((s, idx) => {
                    const w = userSlots[idx];
                    const p = slotPrompts[idx];
                    if (w) {
                        s.classList.add('filled');
                        s.innerHTML = `
                            <span class="slot-badge-num">${idx + 1}</span>
                            <div class="slot-word-content">${w}</div>
                            <span class="slot-grammar-tag ${p.tagClass}">[${p.grammar}]</span>
                        `;
                    } else {
                        s.classList.remove('filled');
                        s.innerHTML = `
                            <span class="slot-badge-num">${idx + 1}</span>
                            <div class="slot-hint-text">${p.text}</div>
                            <span class="slot-grammar-tag ${p.tagClass}">[${p.grammar}]</span>
                        `;
                    }
                });

                bank.innerHTML = '';
                task.scrambled.forEach(w => {
                    const btn = document.createElement('button');
                    btn.className = 'puzzle-chip-btn';
                    btn.textContent = w;
                    btn.disabled = userSlots.includes(w);
                    btn.onclick = () => {
                        const empty = userSlots.indexOf(null);
                        if (empty !== -1) {
                            userSlots[empty] = w;
                            updateUI();
                            if (!userSlots.includes(null)) {
                                const ok = userSlots.every((val, i) => val === task.correct[i]);
                                const sent = userSlots.join(' ');
                                if (ok) {
                                    doneSet.add(currentIdx);
                                    feedback.innerHTML = `
                                        <div class="puzzle-msg success">
                                            <div style="font-size: 1.15rem; font-weight: 800;">${t('gm_t4_feedback_correct', 'Helt rigtigt!')} "<strong>${sent}</strong>"</div>
                                            <div style="font-size: 0.9rem; margin-top: 0.25rem;">
                                                ${task.ruleTip}
                                                ${!isDa && tipTrans !== task.ruleTip ? `<div style="color: #94a3b8; font-size: 0.85rem; margin-top: 0.15rem;">${tipTrans}</div>` : ''}
                                            </div>
                                        </div>
                                        <div class="puzzle-action-row">
                                            <button type="button" class="next-task-btn" id="gm-pz-listen" style="background:#f59e0b; color:#0f172a;">${t('gm_btn_listen_sentence', 'Lyt')}</button>
                                            <button type="button" class="next-task-btn" id="gm-pz-next">${t('gm_btn_next', 'Næste')} →</button>
                                        </div>
                                    `;
                                    feedback.querySelector('#gm-pz-listen').onclick = () => speakDanish(sent);
                                    feedback.querySelector('#gm-pz-next').onclick = () => {
                                        currentIdx = (currentIdx + 1) % tasks.length;
                                        renderTask();
                                    };
                                    speakDanish(sent);
                                } else {
                                    feedback.innerHTML = `
                                        <div class="puzzle-msg error">${t('gm_t4_feedback_wrong', 'Prøv igen! Husk at verbet skal stå på 2. plads.')}</div>
                                        <div class="puzzle-action-row">
                                            <button type="button" class="retry-task-btn" id="gm-pz-retry">${t('gm_t3_btn_restart', 'Prøv igen')}</button>
                                        </div>
                                    `;
                                    feedback.querySelector('#gm-pz-retry').onclick = () => {
                                        userSlots = [null, null, null, null];
                                        feedback.innerHTML = '';
                                        updateUI();
                                    };
                                }
                            }
                        }
                    };
                    bank.appendChild(btn);
                });
            }

            updateUI();
        }

        renderTask();
        containerEl.appendChild(wrap);
    })(puzzleBox);

    // B. Trin-for-trin sætningsbygger
    (function setupGeoStepBuilder(containerEl) {
        const categories = [
            {
                q: t('gm_t4_step_cat_time', '1. Hvor i Danmark? (1. plads)'),
                grammar: 'Sted (1)',
                rowClass: 'row-tid',
                selClass: 'sel-tid',
                options: ['I Jylland', 'På Fyn', 'På Sjælland', 'Ved Vesterhavet', 'Over Storebælt', 'I Skagen']
            },
            {
                q: t('gm_t4_step_cat_verb', '2. Hvad gør man? (Verbum på 2. plads)'),
                grammar: 'Verbum (2)',
                rowClass: 'row-verbum',
                selClass: 'sel-verbum',
                options: ['kører', 'ser', 'besøger', 'oplever', 'nyder', 'går']
            },
            {
                q: t('gm_t4_step_cat_sub', '3. Hvem? (Subjekt på 3. plads)'),
                grammar: 'Subjekt (3)',
                rowClass: 'row-subjekt',
                selClass: 'sel-subjekt',
                options: ['jeg', 'vi', 'familien', 'kursisterne', 'turisterne']
            },
            {
                q: t('gm_t4_step_cat_rest', '4. Hvad eller hvor? (4. plads)'),
                grammar: 'Objekt / Sted (4)',
                rowClass: 'row-objekt',
                selClass: 'sel-objekt',
                options: ['over den lyse bro', 'kysten af sten og sand', 'de grønne bakker', 'morgensolen ved vandet', 'de to have mødes']
            }
        ];

        let selections = ['Over Storebælt', 'kører', 'vi', 'over den lyse bro'];

        const wrapper = document.createElement('div');
        wrapper.className = 'step-builder-wrapper';

        const outputBox = document.createElement('div');
        outputBox.className = 'live-sentence-display';

        function updateLive() {
            outputBox.innerHTML = `
                <div class="live-badge-label">${t('gm_t4_step_live_label', 'Din sætning om Danmarks geografi')}</div>
                <div class="live-sentence-text">
                    <span class="word-color-tid">${selections[0]}</span>
                    <span class="word-color-verbum">${selections[1]}</span>
                    <span class="word-color-subjekt">${selections[2]}</span>
                    <span class="word-color-objekt">${selections[3]}</span>.
                </div>
                <button type="button" class="listen-btn" id="btn-gm-live-listen">
                    ${t('gm_t4_step_btn_listen', 'Lyt til sætningen')}
                </button>
            `;
            outputBox.querySelector('#btn-gm-live-listen').onclick = () => {
                speakDanish(`${selections[0]} ${selections[1]} ${selections[2]} ${selections[3]}`);
            };
        }

        categories.forEach((cat, catIdx) => {
            const row = document.createElement('div');
            row.className = `builder-guided-row ${cat.rowClass}`;
            row.innerHTML = `
                <div class="builder-guided-title">
                    <span>${cat.q}</span>
                    <span class="slot-grammar-tag ${cat.rowClass.replace('row-', 'tag-')}">[${cat.grammar}]</span>
                </div>
            `;
            const chipsWrap = document.createElement('div');
            chipsWrap.className = 'builder-options-chips';

            cat.options.forEach(opt => {
                const chip = document.createElement('button');
                const isSelected = selections[catIdx] === opt;
                chip.className = `builder-choice-chip ${isSelected ? 'selected ' + cat.selClass : ''}`;
                chip.textContent = opt;
                chip.onclick = () => {
                    selections[catIdx] = opt;
                    row.querySelectorAll('.builder-choice-chip').forEach(c => {
                        c.className = 'builder-choice-chip';
                    });
                    chip.classList.add('selected', cat.selClass);
                    updateLive();
                };
                chipsWrap.appendChild(chip);
            });
            row.appendChild(chipsWrap);
            wrapper.appendChild(row);
        });

        wrapper.appendChild(outputBox);
        containerEl.appendChild(wrapper);
        updateLive();
    })(stepBox);

    panelSaetning.appendChild(builderCard);
    panelsHolder.appendChild(panelSaetning);

    // =========================================================================
    // TAB 5: DANMARKS LANDSDELE & PARRING
    // =========================================================================
    const panelUdvikling = document.createElement('div');
    panelUdvikling.className = `song-panel ${currentTab === 'tab_udvikling' ? 'active' : ''}`;
    panelUdvikling.dataset.panel = 'tab_udvikling';

    const historyCard = document.createElement('div');
    historyCard.className = 'history-card';

    const matchSection = document.createElement('div');
    matchSection.className = 'matching-game-section';
    matchSection.innerHTML = `
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #60a5fa; margin: 0 0 0.35rem; text-align: center;">
            ${t('gm_t5_banner_badge', 'Parring: Forbind sangens udtryk med Danmarks geografi')}
        </h3>
        <p style="text-align: center; color: #cbd5e1; font-size: 0.92rem; margin: 0 0 1rem;">
            ${t('gm_t5_banner_desc', 'Klik først på et udtryk fra sangen til venstre og derefter på den geografiske forklaring til højre.')}
        </p>
    `;

    const matchPairs = [
        { id: 'm1', left: t('gm_t5_pair_nord', '"Skagens hvide gren"'), right: t('gm_t5_pair_nord_desc', 'Danmarks nordligste spids i Nordjylland') },
        { id: 'm2', left: t('gm_t5_pair_syd', '"Gedsers lange odde"'), right: t('gm_t5_pair_syd_desc', 'Danmarks sydligste punkt på Falster') },
        { id: 'm3', left: t('gm_t5_pair_broer', '"De slanke, lyse broer"'), right: t('gm_t5_pair_broer_desc', 'Storebæltsbroen og broerne mellem landsdelene') },
        { id: 'm4', left: t('gm_t5_pair_bakker', '"Bakker skabt af is"'), right: t('gm_t5_pair_bakker_desc', 'Det runde morænelandskab fra istiden') },
        { id: 'm5', left: t('gm_item_oe_ved_oe_title', '"Ø ved ø"'), right: t('gm_item_oe_ved_oe_forklaring', 'Det danske ø-rige med Fyn, Sjælland og over 400 øer') },
        { id: 'm6', left: t('gm_t5_pair_kyst', '"Kyst af sten og sand"'), right: t('gm_t5_pair_kyst_desc', 'De mere end 7.000 km danske strande og kyster') }
    ];

    const matchCols = document.createElement('div');
    matchCols.className = 'matching-columns-container';
    const leftCol = document.createElement('div');
    leftCol.className = 'matching-col';
    const rightCol = document.createElement('div');
    rightCol.className = 'matching-col';

    let selLeft = null;
    const matchedIds = new Set();

    const shuffledRight = [...matchPairs].sort(() => Math.random() - 0.5);

    function renderMatchCols() {
        leftCol.innerHTML = '';
        rightCol.innerHTML = '';

        matchPairs.forEach(p => {
            const btn = document.createElement('button');
            btn.className = `match-card-btn ${matchedIds.has(p.id) ? 'matched' : ''} ${selLeft === p.id ? 'selected' : ''}`;
            btn.textContent = p.left;
            btn.disabled = matchedIds.has(p.id);
            btn.onclick = () => {
                selLeft = p.id;
                renderMatchCols();
            };
            leftCol.appendChild(btn);
        });

        shuffledRight.forEach(p => {
            const btn = document.createElement('button');
            btn.className = `match-card-btn ${matchedIds.has(p.id) ? 'matched' : ''}`;
            btn.textContent = p.right;
            btn.disabled = matchedIds.has(p.id);
            btn.onclick = () => {
                if (!selLeft) return;
                if (selLeft === p.id) {
                    matchedIds.add(p.id);
                    speakDanish(`${p.left} betyder ${p.right}`);
                    selLeft = null;
                    renderMatchCols();
                } else {
                    selLeft = null;
                    renderMatchCols();
                }
            };
            rightCol.appendChild(btn);
        });
    }

    renderMatchCols();
    matchCols.appendChild(leftCol);
    matchCols.appendChild(rightCol);
    matchSection.appendChild(matchCols);
    historyCard.appendChild(matchSection);

    // Oversigt over Danmarks hoveddele (med korrekt præposition: "i Jylland" vs. "på Fyn / på Sjælland / på Bornholm")
    const landsdeleHeader = document.createElement('h3');
    landsdeleHeader.style.cssText = 'font-size: 1.3rem; font-weight: 800; color: #fbbf24; margin: 1.5rem 0 0.4rem;';
    landsdeleHeader.textContent = t('gm_t5_landsdele_title', 'Danmarks landsdele: Husk "i" eller "på"');
    historyCard.appendChild(landsdeleHeader);

    const landsdeleSub = document.createElement('p');
    landsdeleSub.style.cssText = 'color: #cbd5e1; font-size: 0.94rem; margin-bottom: 1rem;';
    landsdeleSub.textContent = t('gm_t5_prep_rule', 'På dansk siger vi "i Jylland" (halvø), men "på Fyn", "på Sjælland", "på Lolland-Falster" og "på Bornholm" (øer).');
    historyCard.appendChild(landsdeleSub);

    const landsdeleGrid = document.createElement('div');
    landsdeleGrid.className = 'comparison-grid';

    const landsdeleData = [
        {
            title: 'Jylland (Halvøen)',
            prep: t('gm_t5_prep_jylland', 'Man bor I Jylland'),
            cities: 'Største byer: Aarhus, Aalborg, Esbjerg, Kolding, Vejle, Randers.',
            sent: 'Jeg har været i Skagen og i Aarhus i Jylland.'
        },
        {
            title: 'Fyn (Øen i midten)',
            prep: t('gm_t5_prep_fyn', 'Man bor PÅ Fyn'),
            cities: 'Største byer: Odense (H.C. Andersens fødeby), Svendborg, Nyborg, Middelfart.',
            sent: 'Jeg har besøgt Odense på Fyn.'
        },
        {
            title: 'Sjælland (Den største ø)',
            prep: t('gm_t5_prep_sjaelland', 'Man bor PÅ Sjælland'),
            cities: 'Største byer: København (hovedstaden), Roskilde, Helsingør, Næstved, Køge.',
            sent: 'Jeg bor på Sjælland tæt på København.'
        },
        {
            title: 'Lolland, Falster & Bornholm',
            prep: t('gm_t5_prep_oeerne', 'Man bor PÅ Lolland, PÅ Falster og PÅ Bornholm'),
            cities: 'Byer og steder: Nykøbing Falster, Gedser Odde, Maribo, Rønne og Hammershus.',
            sent: 'Gedser Odde ligger på Falster, og Bornholm ligger i Østersøen.'
        }
    ];

    landsdeleData.forEach(ld => {
        const box = document.createElement('div');
        box.className = 'comparison-item';
        box.innerHTML = `
            <div style="font-size: 1.12rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.25rem;">${ld.title}</div>
            <div style="font-size: 0.85rem; font-weight: 800; color: #38bdf8; margin-bottom: 0.45rem;">${ld.prep}</div>
            <div style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 0.65rem; line-height: 1.45;">${ld.cities}</div>
            <div class="detail-saetning-box" style="font-size: 0.92rem; margin-bottom: 0.6rem;">"${ld.sent}"</div>
            <button type="button" class="listen-btn" style="padding: 0.45rem 0.95rem; font-size: 0.82rem;">${t('gm_btn_listen_sentence', 'Lyt til sætning')}</button>
        `;
        box.querySelector('.listen-btn').onclick = () => speakDanish(ld.sent);
        landsdeleGrid.appendChild(box);
    });

    historyCard.appendChild(landsdeleGrid);
    panelUdvikling.appendChild(historyCard);
    panelsHolder.appendChild(panelUdvikling);

    // =========================================================================
    // TAB 6: SAMTALE-PUSLESÆTNINGER: DIT DANMARK (BYG DIT EGET SVAR)
    // =========================================================================
    const panelSamtale = document.createElement('div');
    panelSamtale.className = `song-panel ${currentTab === 'tab_samtale' ? 'active' : ''}`;
    panelSamtale.dataset.panel = 'tab_samtale';

    const samtaleCard = document.createElement('div');
    samtaleCard.className = 'history-card';

    const samtaleIntro = document.createElement('div');
    samtaleIntro.className = 'saetning-intro-banner';
    samtaleIntro.innerHTML = `
        <span class="saetning-intro-badge">${t('gm_samtale_intro_badge', 'Mundtlig samtale & Puslesætninger')}</span>
        <h2 class="saetning-intro-title">${t('gm_samtale_intro_title', 'Byg dine egne svar: Fortæl om dit Danmark')}</h2>
        <p class="saetning-intro-desc">
            ${t('gm_samtale_intro_desc', 'Hvert spørgsmål er en puslesætning i stedet for en færdig skabelon. Vælg de brikker og ord i boksene, som passer bedst til dit liv og dine egne oplevelser i Danmark. Klik på brikkerne for at sammensætte dit svar, og lyt til sætningen for at øve udtalen!')}
        </p>
    `;
    samtaleCard.appendChild(samtaleIntro);

    const samtalePuzzles = [
        {
            num: 1,
            q: 'Hvor har du været i Danmark?',
            slots: [
                {
                    label: 'Start (Verbum)',
                    color: '1',
                    chips: ['Jeg har været', 'Jeg har kun været', 'Vi har rejst rundt']
                },
                {
                    label: 'Sted i Danmark',
                    color: '2',
                    chips: ['i København', 'i Aarhus og Odense', 'i Jylland', 'på Fyn', 'på Sjælland', 'på Bornholm', 'ved Vesterhavet', 'i Skagen helt mod nord']
                },
                {
                    label: 'Ledsager / Tid',
                    color: '3',
                    chips: ['med min familie', 'med mine venner', 'alene', 'på ferie', 'mange gange', 'for nylig', 'indtil nu']
                },
                {
                    label: 'Ekstra bemærkning',
                    color: '4',
                    chips: ['og det var en dejlig tur.', 'men jeg vil gerne se mere.', 'og naturen var helt fantastisk.', 'og jeg elskede det.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        },
        {
            num: 2,
            q: 'Hvad er dit yndlingssted i Danmark – og hvorfor?',
            slots: [
                {
                    label: 'Mit yndlingssted',
                    color: '1',
                    chips: ['Mit yndlingssted er', 'Jeg kan bedst lide', 'Mit favoritsted er', 'Jeg elsker mest']
                },
                {
                    label: 'Stedet i naturen eller byen',
                    color: '2',
                    chips: ['stranden og havet', 'skoven og de grønne bakker', 'den store by med caféer', 'min egen have og by', 'kysten med sten og sand', 'en hyggelig lille ø']
                },
                {
                    label: 'Begrundelse (fordi...)',
                    color: '3',
                    chips: ['fordi der er roligt og smukt', 'fordi jeg elsker frisk luft', 'fordi der er liv og mange mennesker', 'fordi min familie bor her', 'fordi det minder mig om sommer']
                },
                {
                    label: 'Afrunding',
                    color: '4',
                    chips: ['og jeg slapper godt af der.', 'og jeg føler mig hjemme.', 'især når solen skinner.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        },
        {
            num: 3,
            q: 'Hvilken by og landsdel bor du i nu?',
            slots: [
                {
                    label: 'Hvor bor du?',
                    color: '1',
                    chips: ['Jeg bor i', 'Lige nu bor jeg i', 'Min familie og jeg bor i', 'Jeg har boet to år i']
                },
                {
                    label: 'By & Landsdel',
                    color: '2',
                    chips: ['en by i Jylland', 'en by på Sjælland', 'Odense på Fyn', 'København i hovedstaden', 'en by tæt på vandet', 'en hyggelig landsby']
                },
                {
                    label: 'Nærområde',
                    color: '3',
                    chips: ['tæt på kysten og stranden', 'tæt på togstationen og skolen', 'midt i byens centrum', 'i et roligt og grønt kvarter']
                },
                {
                    label: 'Trivsel & Naboer',
                    color: '4',
                    chips: ['og jeg er rigtig glad for at bo her.', 'hvor der er rart og trygt.', 'og jeg kender mine naboer godt.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        },
        {
            num: 4,
            q: 'Har du kørt over Storebæltsbroen eller sejlet med en færge?',
            slots: [
                {
                    label: 'Start (Erfaring)',
                    color: '1',
                    chips: ['Ja, jeg har kørt over Storebæltsbroen', 'Ja, jeg har sejlet med en færge', 'Ja, jeg har prøvet både bro og færge', 'Nej, jeg har ikke prøvet det endnu']
                },
                {
                    label: 'Transport & Rute',
                    color: '2',
                    chips: ['i bil med familien', 'med tog over vandet', 'til en lille dansk ø', 'mellem Fyn og Sjælland', 'men jeg vil gerne prøve det']
                },
                {
                    label: 'Oplevelse & Udsigt',
                    color: '3',
                    chips: ['og udsigten over vandet var fantastisk', 'og turen gik overraskende hurtigt', 'i flot solskin og frisk blæst', 'en dag i fremtiden']
                },
                {
                    label: 'Afrunding',
                    color: '4',
                    chips: ['på vej på ferie.', 'som en uforglemmelig oplevelse.', 'når jeg besøger andre landsdele.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        },
        {
            num: 5,
            q: 'Kan du bedst lide byen, skoven eller kysten med sten og sand?',
            slots: [
                {
                    label: 'Præference',
                    color: '1',
                    chips: ['Jeg foretrækker', 'Jeg kan bedst lide', 'Jeg elsker mest', 'I weekenden vælger jeg']
                },
                {
                    label: 'Område',
                    color: '2',
                    chips: ['kysten med sten, sand og bølger', 'den grønne skov og bakkerne', 'den travle by med butikker og liv', 'både havet og skoven']
                },
                {
                    label: 'Aktivitet',
                    color: '3',
                    chips: ['hvor jeg kan gå lange ture', 'hvor jeg kan mærke den friske luft', 'hvor jeg kan drikke kaffe med venner', 'hvor børnene kan lege og bade']
                },
                {
                    label: 'Følelse & Selskab',
                    color: '4',
                    chips: ['for at slappe helt af.', 'i al slags vejr.', 'sammen med min familie.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        },
        {
            num: 6,
            q: 'Hvordan synes du, det danske vejr er?',
            slots: [
                {
                    label: 'Din holdning',
                    color: '1',
                    chips: ['Jeg synes, at vejret i Danmark', 'Efter min mening er vejret her', 'Jeg har vænnet mig til, at vejret', 'Jeg kan godt lide, at vejret']
                },
                {
                    label: 'Vejrtype',
                    color: '2',
                    chips: ['skifter rigtig hurtigt', 'ofte byder på blæst, dis og regn', 'er helt fantastisk og lyst om sommeren', 'kan være meget koldt og mørkt om vinteren']
                },
                {
                    label: 'Hvad gør man?',
                    color: '3',
                    chips: ['så man skal altid huske en god jakke', 'men de lyse sommeraftener er skønne', 'så vi hygger os indendørs med varm te', 'og man lærer at gå ud alligevel']
                },
                {
                    label: 'Afrunding',
                    color: '4',
                    chips: ['koldt eller venligt skiftevis.', 'når årstiderne skifter.', 'i det lille land mod nord.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        },
        {
            num: 7,
            q: 'Hvilket sted i Danmark vil du gerne besøge i fremtiden?',
            slots: [
                {
                    label: 'Fremtidsønske',
                    color: '1',
                    chips: ['I fremtiden vil jeg meget gerne besøge', 'Jeg drømmer om at tage til', 'Næste sommer har jeg lyst til at se', 'Mit næste rejsemål i Danmark er']
                },
                {
                    label: 'Stedet',
                    color: '2',
                    chips: ['Grenen ved Skagen mod nord', 'klippeøen Bornholm mod øst', 'Gedser Odde på Falster mod syd', 'Vesterhavet og de store klitter i vest', 'flere af de små danske øer']
                },
                {
                    label: 'Formål & Oplevelse',
                    color: '3',
                    chips: ['for at se, hvor havene mødes', 'for at bade og gå ture på stranden', 'for at opleve den vilde natur', 'sammen med dem, jeg holder af']
                },
                {
                    label: 'Tidshorisont',
                    color: '4',
                    chips: ['på en god weekendtur.', 'så hurtigt som muligt.', 'når vi har ferie.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        },
        {
            num: 8,
            q: 'Hvordan er naturen i Danmark sammenlignet med dit hjemland?',
            slots: [
                {
                    label: 'Sammenligning',
                    color: '1',
                    chips: ['I mit hjemland er der', 'Sammenlignet med mit hjemland har Danmark', 'I Danmark er der', 'Både i Danmark og i mit hjemland er der']
                },
                {
                    label: 'Landskab & Klima',
                    color: '2',
                    chips: ['høje bjerge, men i Danmark er der bløde bakker', 'et varmere klima, men her er luften ren og frisk', 'altid kort afstand til kysten og havet', 'mange grønne marker og skove']
                },
                {
                    label: 'Følelse & Betydning',
                    color: '3',
                    chips: ['og jeg holder meget af begge steder', 'selvom jeg nogle gange savner solen', 'hvilket gør landskabet her helt unikt', 'hvor man kan finde ro i hverdagen']
                },
                {
                    label: 'Afrunding',
                    color: '4',
                    chips: ['på hver sin måde.', 'fra egn til egn.', 'og bygge bro mellem to verdener.', '(ingen ekstra)']
                }
            ],
            defaults: [0, 0, 0, 0]
        }
    ];

    const puzzleList = document.createElement('div');
    puzzleList.className = 'samtale-puzzle-list';

    samtalePuzzles.forEach(pz => {
        const pzCard = document.createElement('div');
        pzCard.className = 'samtale-puzzle-card';

        let currentChoices = [...pz.defaults];
        const qTrans = t(`gm_sq_${pz.num}`, pz.q);
        const badgeText = t('gm_samtale_q_badge', { num: pz.num }, `Puslesætning · Spørgsmål ${pz.num}`);

        // Header
        const header = document.createElement('div');
        header.className = 'samtale-q-header';
        header.innerHTML = `
            <div>
                <span class="samtale-q-badge">${badgeText}</span>
                <h3 class="samtale-q-title">
                    ${pz.q}
                    ${!isDa && qTrans !== pz.q ? `<div style="font-size: 0.95rem; color: #94a3b8; font-weight: 500; margin-top: 0.25rem;">${qTrans}</div>` : ''}
                </h3>
            </div>
            <button type="button" class="ah-step-btn btn-speak-q" style="font-size: 0.85rem; padding: 0.45rem 0.9rem;">
                ${t('gm_samtale_listen_q', 'Lyt til spørgsmål')}
            </button>
        `;
        header.querySelector('.btn-speak-q').onclick = () => speakDanish(pz.q);
        pzCard.appendChild(header);

        // Assembled Box
        const assembledBox = document.createElement('div');
        assembledBox.className = 'samtale-assembled-box';

        const assembledLabel = document.createElement('div');
        assembledLabel.className = 'samtale-assembled-label';
        assembledLabel.textContent = t('gm_samtale_assembled_label', 'Dit sammensatte svar (opdateres når du klikker på brikkerne):');
        assembledBox.appendChild(assembledLabel);

        const assembledText = document.createElement('div');
        assembledText.className = 'samtale-assembled-text';
        assembledBox.appendChild(assembledText);

        const actionsRow = document.createElement('div');
        actionsRow.className = 'samtale-assembled-actions';
        actionsRow.innerHTML = `
            <button type="button" class="listen-btn btn-listen-ans" style="padding: 0.55rem 1.15rem; font-size: 0.9rem;">
                ${t('gm_samtale_listen_ans', 'Lyt til dit svar')}
            </button>
            <button type="button" class="ah-step-btn btn-reset-ans" style="font-size: 0.85rem; padding: 0.5rem 0.9rem;">
                ${t('gm_samtale_reset_ans', 'Nulstil valg')}
            </button>
        `;
        assembledBox.appendChild(actionsRow);
        pzCard.appendChild(assembledBox);

        // Builder Rows
        const builderBox = document.createElement('div');
        builderBox.className = 'samtale-slots-builder';

        function getSentenceParts() {
            const parts = [];
            pz.slots.forEach((slot, sIdx) => {
                const text = slot.chips[currentChoices[sIdx]];
                if (text && text !== '(ingen ekstra)') {
                    parts.push({ text, color: slot.color });
                }
            });
            return parts;
        }

        function getSpokenSentence(parts) {
            let full = parts.map(p => p.text).join(' ').trim();
            full = full.replace(/\s+([.,!?;])/g, '$1');
            if (!/[.!?]$/.test(full)) full += '.';
            return full;
        }

        function updateSentenceDisplay() {
            const parts = getSentenceParts();
            let htmlParts = parts.map(p => `<span class="assembled-piece assembled-piece-${p.color}">${p.text}</span>`).join(' ');
            if (parts.length > 0 && !/[.!?]$/.test(parts[parts.length - 1].text)) {
                htmlParts += '<span style="font-weight: 800; color: #ffffff;">.</span>';
            }
            assembledText.innerHTML = `"${htmlParts}"`;
        }

        pz.slots.forEach((slot, sIdx) => {
            const row = document.createElement('div');
            row.className = 'samtale-slot-row';

            const rowHeader = document.createElement('div');
            rowHeader.className = 'samtale-slot-header';
            rowHeader.innerHTML = `
                <span class="slot-num-badge slot-num-${slot.color}">${sIdx + 1}</span>
                <span class="slot-label-${slot.color}">${slot.label}:</span>
            `;
            row.appendChild(rowHeader);

            const chipGroup = document.createElement('div');
            chipGroup.className = 'samtale-chip-group';

            slot.chips.forEach((cText, cIdx) => {
                const chipBtn = document.createElement('button');
                chipBtn.type = 'button';
                chipBtn.className = `samtale-chip-btn ${currentChoices[sIdx] === cIdx ? `active slot-active-${slot.color}` : ''}`;
                chipBtn.textContent = cText;
                chipBtn.onclick = () => {
                    currentChoices[sIdx] = cIdx;
                    chipGroup.querySelectorAll('.samtale-chip-btn').forEach((b, idx) => {
                        b.className = `samtale-chip-btn ${idx === cIdx ? `active slot-active-${slot.color}` : ''}`;
                    });
                    updateSentenceDisplay();
                };
                chipGroup.appendChild(chipBtn);
            });

            row.appendChild(chipGroup);
            builderBox.appendChild(row);
        });

        pzCard.appendChild(builderBox);

        actionsRow.querySelector('.btn-listen-ans').onclick = () => {
            const parts = getSentenceParts();
            const textToSpeak = getSpokenSentence(parts);
            speakDanish(textToSpeak);
        };

        actionsRow.querySelector('.btn-reset-ans').onclick = () => {
            currentChoices = [...pz.defaults];
            builderBox.querySelectorAll('.samtale-slot-row').forEach((row, sIdx) => {
                const color = pz.slots[sIdx].color;
                row.querySelectorAll('.samtale-chip-btn').forEach((b, cIdx) => {
                    b.className = `samtale-chip-btn ${cIdx === pz.defaults[sIdx] ? `active slot-active-${color}` : ''}`;
                });
            });
            updateSentenceDisplay();
        };

        updateSentenceDisplay();
        puzzleList.appendChild(pzCard);
    });

    samtaleCard.appendChild(puzzleList);
    panelSamtale.appendChild(samtaleCard);
    panelsHolder.appendChild(panelSamtale);

    // =========================================================================
    // NEDERST: Melodi- og lydafspiller (YouTube)
    // =========================================================================
    const audioFooterCard = document.createElement('div');
    audioFooterCard.className = 'song-audio-footer-card';
    audioFooterCard.innerHTML = `
        <div class="saf-header">
            <div class="saf-left">
                <div class="saf-text">
                    <div class="saf-title">${t('gm_saf_title', 'Lyt til melodien: "Godmorgen, lille land"')}</div>
                    <div class="saf-sub">${t('gm_saf_sub', 'Melodi af Carsten Johs. Mørch (1998) fra Højskolesangbogen')}</div>
                </div>
            </div>
            <div class="saf-actions">
                <a href="https://youtu.be/OKkRngOcxRQ?si=zgtHxY9Mm8XXiIKF" target="_blank" rel="noopener noreferrer" class="saf-youtube-btn">
                    ${t('gm_saf_open_yt', 'Hør melodi på YouTube')}
                </a>
                <button class="saf-embed-toggle-btn" id="btn-toggle-yt-player-gm">
                    <span id="yt-toggle-label-gm">${t('gm_saf_show_player', 'Vis afspiller')}</span>
                </button>
            </div>
        </div>
        <div class="saf-embed-container" id="yt-embed-box-gm" style="display: none;">
            <iframe 
                width="100%" 
                height="320" 
                src="https://www.youtube-nocookie.com/embed/OKkRngOcxRQ" 
                title="Godmorgen, lille land - Melodi" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        </div>
    `;

    let ytPlayerOpen = false;
    const toggleBtn = audioFooterCard.querySelector('#btn-toggle-yt-player-gm');
    const embedBox = audioFooterCard.querySelector('#yt-embed-box-gm');
    const toggleLabel = audioFooterCard.querySelector('#yt-toggle-label-gm');

    toggleBtn.onclick = () => {
        ytPlayerOpen = !ytPlayerOpen;
        embedBox.style.display = ytPlayerOpen ? 'block' : 'none';
        toggleBtn.classList.toggle('active', ytPlayerOpen);
        toggleLabel.textContent = ytPlayerOpen ? t('gm_saf_hide_player', 'Skjul afspiller') : t('gm_saf_show_player', 'Vis afspiller');
    };

    viewContainer.appendChild(audioFooterCard);

    // Initial subPath routing check
    if (extraData && extraData.subPath) {
        switchTab(extraData.subPath);
    }

    container.appendChild(viewContainer);
}
