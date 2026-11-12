import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * GrammatikSansningView - "Grammatik og min sansning af verdenen"
 * En fænomenologisk overflade, der samler dansk grammatik under
 * den fundamentale sanselige dikotomi:
 *  🔵 VÆREN & STILSTAND (Tilstand i Ro)
 *  🟠 TILBLIVELSE & FORVANDLING (Bevægelse & Kraft)
 */
export function renderGrammatikSansningView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container grammatik-sansning-view';

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
        .grammatik-sansning-view {
            max-width: 1180px;
            margin: 0 auto;
            padding: 1rem 1.25rem 5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .gs-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        .gs-back-btn {
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
        .gs-back-btn:hover {
            border-color: #38bdf8;
            background: rgba(30, 41, 59, 0.9);
            transform: translateX(-2px);
        }

        /* Hero */
        .gs-hero {
            text-align: center;
            margin-bottom: 2rem;
            position: relative;
        }
        .gs-hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(249, 115, 22, 0.18));
            border: 1px solid rgba(251, 191, 36, 0.4);
            border-radius: 999px;
            padding: 0.35rem 1rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #fde68a;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 0.75rem;
        }
        .gs-hero h1 {
            font-size: 2.3rem;
            font-weight: 900;
            margin: 0 0 0.5rem;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #ffffff 40%, #fde68a 85%, #fb923c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .gs-hero p {
            color: #cbd5e1;
            font-size: 1.05rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.55;
        }

        /* Compass Cards (Tilstand vs. Forvandling) */
        .gs-compass-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
            .gs-compass-wrapper {
                grid-template-columns: 1fr;
            }
        }
        .gs-realm-card {
            border-radius: 18px;
            padding: 1.35rem 1.45rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
            transition: all 0.25s ease;
            position: relative;
            overflow: hidden;
        }
        .gs-realm-card.tilstand {
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(12, 74, 110, 0.3));
            border: 1.5px solid rgba(56, 189, 248, 0.4);
        }
        .gs-realm-card.forvandling {
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(154, 52, 18, 0.3));
            border: 1.5px solid rgba(251, 146, 60, 0.45);
        }
        .gs-realm-card:hover {
            transform: translateY(-2px);
        }
        .gs-realm-card.tilstand:hover {
            border-color: #38bdf8;
            box-shadow: 0 14px 36px rgba(56, 189, 248, 0.2);
        }
        .gs-realm-card.forvandling:hover {
            border-color: #fb923c;
            box-shadow: 0 14px 36px rgba(251, 146, 60, 0.2);
        }
        .gs-realm-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.65rem;
        }
        .gs-realm-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.78rem;
            font-weight: 900;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .gs-realm-card.tilstand .gs-realm-badge {
            background: rgba(56, 189, 248, 0.2);
            color: #7dd3fc;
            border: 1px solid rgba(56, 189, 248, 0.4);
        }
        .gs-realm-card.forvandling .gs-realm-badge {
            background: rgba(251, 146, 60, 0.2);
            color: #fdba74;
            border: 1px solid rgba(251, 146, 60, 0.4);
        }
        .gs-realm-symbol {
            font-size: 1.8rem;
        }
        .gs-realm-title {
            font-size: 1.35rem;
            font-weight: 800;
            margin: 0 0 0.35rem;
            color: #ffffff;
        }
        .gs-realm-desc {
            color: #cbd5e1;
            font-size: 0.92rem;
            line-height: 1.5;
            margin: 0 0 0.9rem;
        }
        .gs-realm-examples {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
            padding: 0.75rem 0.9rem;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            border: 1px dashed rgba(148, 163, 184, 0.2);
        }
        .gs-realm-ex-item {
            font-size: 0.88rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
        }
        .gs-realm-ex-word {
            font-weight: 800;
        }
        .gs-realm-card.tilstand .gs-realm-ex-word { color: #38bdf8; }
        .gs-realm-card.forvandling .gs-realm-ex-word { color: #fb923c; }

        /* Simulator Bar */
        .gs-simulator-box {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95));
            border: 1.5px solid rgba(251, 191, 36, 0.35);
            border-radius: 18px;
            padding: 1.2rem 1.4rem;
            margin-bottom: 2.2rem;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
        }
        .gs-sim-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 0.9rem;
        }
        .gs-sim-title {
            font-weight: 800;
            font-size: 1.05rem;
            color: #fde68a;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gs-sim-toggle-group {
            display: inline-flex;
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            border-radius: 12px;
            padding: 0.25rem;
            gap: 0.25rem;
        }
        .gs-sim-toggle-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.45rem 0.9rem;
            border-radius: 8px;
            font-size: 0.84rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .gs-sim-toggle-btn.active.tilstand {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
        }
        .gs-sim-toggle-btn.active.forvandling {
            background: rgba(251, 146, 60, 0.25);
            color: #fb923c;
            box-shadow: 0 0 12px rgba(251, 146, 60, 0.35);
        }
        .gs-sim-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 0.75rem;
        }
        .gs-sim-chip {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            transition: all 0.2s ease;
        }
        .gs-sim-chip-topic {
            font-size: 0.74rem;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.05em;
            color: #94a3b8;
        }
        .gs-sim-chip-sentence {
            font-size: 0.95rem;
            font-weight: 700;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .gs-sim-tts-btn {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: #e2e8f0;
            border-radius: 8px;
            width: 28px;
            height: 28px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s ease;
        }
        .gs-sim-tts-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
        }

        /* Filter bar */
        .gs-filter-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 1.25rem;
        }
        .gs-filter-title {
            font-weight: 800;
            font-size: 1.15rem;
            color: #f8fafc;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gs-filter-pills {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .gs-filter-pill {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.25);
            color: #cbd5e1;
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .gs-filter-pill:hover {
            border-color: #f8fafc;
            color: #ffffff;
        }
        .gs-filter-pill.active {
            background: #ef4444;
            border-color: #f87171;
            color: #ffffff;
            box-shadow: 0 0 14px rgba(239, 68, 68, 0.35);
        }

        /* Stations Grid */
        .gs-stations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 1.3rem;
            margin-bottom: 2.5rem;
        }
        .gs-station-card {
            background: linear-gradient(165deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 1.5px solid rgba(148, 163, 184, 0.22);
            border-radius: 20px;
            padding: 1.3rem 1.4rem;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
        }
        .gs-station-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: var(--station-accent, #38bdf8);
            opacity: 0.7;
            transition: width 0.2s ease, opacity 0.2s ease;
        }
        .gs-station-card:hover {
            transform: translateY(-4px);
            border-color: var(--station-accent, #38bdf8);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(56, 189, 248, 0.18);
        }
        .gs-station-card:hover::before {
            width: 8px;
            opacity: 1;
        }

        /* Dual-Thumbnail Split Image on Cards */
        .gs-card-split-preview {
            width: 100%;
            height: 140px;
            border-radius: 14px;
            overflow: hidden;
            display: flex;
            position: relative;
            margin-bottom: 1rem;
            border: 1px solid rgba(148, 163, 184, 0.25);
            background: #0f172a;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        }
        .gs-card-preview-half {
            flex: 1;
            position: relative;
            overflow: hidden;
        }
        .gs-card-preview-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.35s ease;
        }
        .gs-station-card:hover .gs-card-preview-img {
            transform: scale(1.06);
        }
        .gs-card-preview-label {
            position: absolute;
            bottom: 6px;
            font-size: 0.68rem;
            font-weight: 900;
            padding: 2px 7px;
            border-radius: 6px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 1;
        }
        .gs-card-preview-half.left .gs-card-preview-label {
            left: 6px;
            background: rgba(14, 116, 144, 0.88);
            color: #7dd3fc;
            border: 1px solid rgba(56, 189, 248, 0.4);
        }
        .gs-card-preview-half.right .gs-card-preview-label {
            right: 6px;
            background: rgba(194, 65, 12, 0.88);
            color: #fed7aa;
            border: 1px solid rgba(251, 146, 60, 0.4);
        }
        .gs-card-preview-divider {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 2px;
            background: rgba(255, 255, 255, 0.35);
            transform: translateX(-50%);
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .gs-card-preview-badge {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(251, 191, 36, 0.5);
            color: #fde68a;
            font-size: 0.65rem;
            font-weight: 900;
            border-radius: 999px;
            padding: 2px 5px;
            line-height: 1;
        }
        .gs-station-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.75rem;
            gap: 0.5rem;
        }
        .gs-station-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            font-weight: 900;
            font-size: 0.92rem;
            color: #f8fafc;
        }
        .gs-station-tag {
            font-size: 0.74rem;
            font-weight: 800;
            padding: 0.25rem 0.6rem;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            color: #cbd5e1;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .gs-station-title {
            font-size: 1.22rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.35rem;
            line-height: 1.3;
        }
        .gs-station-sub {
            font-size: 0.88rem;
            color: #94a3b8;
            margin: 0 0 1rem;
            line-height: 1.45;
        }

        .gs-station-contrast-box {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            padding: 0.75rem 0.9rem;
            margin-bottom: 1.1rem;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
        }
        .gs-contrast-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.86rem;
            gap: 0.5rem;
        }
        .gs-contrast-label {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            font-weight: 700;
            font-size: 0.78rem;
        }
        .gs-contrast-label.tilstand { color: #38bdf8; }
        .gs-contrast-label.forvandling { color: #fb923c; }
        .gs-contrast-sent {
            font-weight: 700;
            color: #f8fafc;
        }

        .gs-station-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-top: 0.5rem;
            border-top: 1px solid rgba(148, 163, 184, 0.12);
        }
        .gs-station-badge-vrimmel {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.75rem;
            font-weight: 800;
            color: #fde68a;
        }
        .gs-station-enter-btn {
            background: transparent;
            border: none;
            color: #38bdf8;
            font-weight: 800;
            font-size: 0.84rem;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            cursor: pointer;
            transition: transform 0.18s ease;
        }
        .gs-station-card:hover .gs-station-enter-btn {
            transform: translateX(3px);
            color: #ffffff;
        }

        /* Pedagogical Guide (Accordion) */
        .gs-guide-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
            border: 1.5px solid rgba(251, 191, 36, 0.4);
            border-radius: 20px;
            padding: 1.3rem 1.5rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }
        .gs-guide-summary {
            cursor: pointer;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            font-weight: 900;
            font-size: 1.12rem;
            color: #fde68a;
        }
        .gs-guide-summary::-webkit-details-marker { display: none; }
        .gs-guide-content {
            margin-top: 1.1rem;
            padding-top: 1.1rem;
            border-top: 1px solid rgba(251, 191, 36, 0.25);
            color: #cbd5e1;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        .gs-guide-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.1rem;
            margin-top: 1rem;
        }
        .gs-guide-col {
            background: rgba(15, 23, 42, 0.65);
            border-radius: 14px;
            padding: 1rem 1.1rem;
            border: 1px solid rgba(148, 163, 184, 0.18);
        }
        .gs-guide-col h3 {
            margin: 0 0 0.5rem;
            font-size: 1rem;
            font-weight: 800;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }

        /* 4 Bodily Realms / Hovedflader Grid */
        .gs-realms-section {
            margin-bottom: 2.2rem;
        }
        .gs-section-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .gs-section-header h2 {
            font-size: 1.35rem;
            font-weight: 800;
            margin: 0;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gs-section-header p {
            margin: 0.25rem 0 0;
            color: #94a3b8;
            font-size: 0.88rem;
        }
        .gs-hovedflader-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.1rem;
        }
        .gs-hovedflade-card {
            border-radius: 18px;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.25s ease;
            position: relative;
            background: linear-gradient(165deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 1.5px solid rgba(148, 163, 184, 0.25);
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
        }
        .gs-hovedflade-card.active-flade {
            border-color: #38bdf8;
            background: linear-gradient(165deg, rgba(14, 116, 144, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%);
            box-shadow: 0 12px 30px rgba(56, 189, 248, 0.22);
            cursor: pointer;
        }
        .gs-hovedflade-card.active-flade:hover {
            transform: translateY(-4px);
            border-color: #7dd3fc;
            box-shadow: 0 16px 36px rgba(56, 189, 248, 0.35);
        }
        .gs-hf-tag {
            font-size: 0.72rem;
            font-weight: 900;
            padding: 0.22rem 0.55rem;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: inline-block;
            margin-bottom: 0.6rem;
            align-self: flex-start;
        }
        .gs-hf-tag.ready {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.4);
        }
        .gs-hf-tag.planned {
            background: rgba(148, 163, 184, 0.15);
            color: #94a3b8;
            border: 1px solid rgba(148, 163, 184, 0.3);
        }
        .gs-hf-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.35rem;
        }
        .gs-hf-sub {
            font-size: 0.84rem;
            color: #cbd5e1;
            margin: 0 0 0.8rem;
            line-height: 1.45;
        }
        .gs-hf-bullets {
            list-style: none;
            padding: 0;
            margin: 0 0 1rem;
            font-size: 0.8rem;
            color: #94a3b8;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }
        .gs-hf-bullets li::before {
            content: "• ";
            color: #38bdf8;
            font-weight: bold;
        }
        .gs-hf-btn {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: #ffffff;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.86rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .gs-hf-btn:hover {
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            transform: scale(1.02);
        }
    `;
    viewContainer.appendChild(style);

    // 1. Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'gs-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'gs-back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage til forsiden'}`;
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);

    const langBadge = document.createElement('span');
    langBadge.className = 'gs-hero-badge';
    langBadge.innerHTML = `🧭 Sanse-Grammatik • DU1 & DU2`;
    topBar.appendChild(langBadge);

    viewContainer.appendChild(topBar);

    // 2. Hero Header
    const hero = document.createElement('div');
    hero.className = 'gs-hero';
    hero.innerHTML = `
        <div class="gs-hero-badge">🧭 Fænomenologisk & Sanselig Grammatik</div>
        <h1>Grammatik og min sansning af verdenen</h1>
        <p>
            På dansk afslører dine verber og ord, <strong>hvordan du oplever virkeligheden</strong>.
            Står verden stille i ro, eller er der en kraft, der skaber en forvandling? 
            Gå på opdagelse i de 6 sanse-stationer med interaktive vrimlebilleder og træningsbaner.
        </p>
    `;
    viewContainer.appendChild(hero);

    // 3. Compass Cards (Det Blå Rige vs. Det Gyldne Rige)
    const compass = document.createElement('div');
    compass.className = 'gs-compass-wrapper';
    compass.innerHTML = `
        <div class="gs-realm-card tilstand">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">🔵 Det Blå Rige</span>
                <span class="gs-realm-symbol">🌊</span>
            </div>
            <h2 class="gs-realm-title">Væren & Stilstand (Tilstand i Ro)</h2>
            <p class="gs-realm-desc">
                Når verden hviler. Tingen befinder sig et sted, tilstanden er uforandret, kroppen sanser smagen indefra, og handlingen er stabil.
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>Væren i ro:</span>
                    <span class="gs-realm-ex-word">Kaffen ER kold</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Fastfrosset fortid:</span>
                    <span class="gs-realm-ex-word">Vejret HAVDE VÆRET koldt</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Tingens hvile:</span>
                    <span class="gs-realm-ex-word">Bogen LIGGER på bordet</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Ro i rummet:</span>
                    <span class="gs-realm-ex-word">Vi er HJEMME</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Kroppens sansning:</span>
                    <span class="gs-realm-ex-word">Jeg SYNES suppen smager godt</span>
                </div>
            </div>
        </div>

        <div class="gs-realm-card forvandling">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">🟠 Det Gyldne Rige</span>
                <span class="gs-realm-symbol">🔥</span>
            </div>
            <h2 class="gs-realm-title">Tilblivelse & Forvandling (Bevægelse & Kraft)</h2>
            <p class="gs-realm-desc">
                Når verden er i bevægelse. Der sker et omslag, en overgang, en kraft anbringer en genstand, tærsklen krydses, eller tanken gætter fremad.
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>Overgang i nuet:</span>
                    <span class="gs-realm-ex-word">Kaffen BLIVER kold</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Omslaget der indtræffer:</span>
                    <span class="gs-realm-ex-word">Vejret VAR BLEVET koldt</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Håndens kraft:</span>
                    <span class="gs-realm-ex-word">Jeg LÆGGER bogen</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Krydser tærsklen:</span>
                    <span class="gs-realm-ex-word">Vi tager HJEM</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Hovedets gæt:</span>
                    <span class="gs-realm-ex-word">Jeg TROR det regner i morgen</span>
                </div>
            </div>
        </div>
    `;
    viewContainer.appendChild(compass);

    // 4. Interactive Live Simulator: Skift mellem Væren/Stilstand og Tilblivelse/Forvandling
    const simulator = document.createElement('div');
    simulator.className = 'gs-simulator-box';

    const simState = { activeMode: 'tilstand' };

    const simData = [
        {
            topic: '1. Væren vs. Tilblivelse',
            tilstand: 'Kaffen er kold.',
            forvandling: 'Kaffen bliver kold.',
            hint: 'Er = uforandret / Bliver = proces igang'
        },
        {
            topic: '2. Tidens Sansning',
            tilstand: 'Vejret havde været koldt længe.',
            forvandling: 'Vejret var blevet koldt, da han ankom.',
            hint: 'Havde været = stabil baggrund / Var blevet = selve omslaget'
        },
        {
            topic: '3. Aktivitet vs. Resultat',
            tilstand: 'Huset er malet nu.',
            forvandling: 'Malerne har malet facaden.',
            hint: 'Er = ny tilstand / Har = motoren i arbejde'
        },
        {
            topic: '4. Tingens Hvile vs. Kraft',
            tilstand: 'Nøglerne ligger på bordet.',
            forvandling: 'Hun lægger nøglerne på bordet.',
            hint: 'Ligger = hviler / Lægger = hånden flytter'
        },
        {
            topic: '5. Rummet & Tærsklen',
            tilstand: 'Børnene leger inde i stuen.',
            forvandling: 'Børnene løber ind i stuen.',
            hint: 'Inde = ro i rummet / Ind = krydser dørtrinet'
        },
        {
            topic: '6. Sindets Sansning',
            tilstand: 'Jeg synes, kagen er lækker.',
            forvandling: 'Jeg tror, kagen smager sødt.',
            hint: 'Synes = sanset med tungen / Tror = gæt i hovedet'
        }
    ];

    function renderSimulatorContent() {
        simulator.innerHTML = `
            <div class="gs-sim-header">
                <span class="gs-sim-title">⚡ Sanse-Simulatoren: Oplev forvandlingen i 1 klik</span>
                <div class="gs-sim-toggle-group">
                    <button class="gs-sim-toggle-btn tilstand ${simState.activeMode === 'tilstand' ? 'active' : ''}" id="btn-sim-tilstand">
                        🔵 Væren & Stilstand
                    </button>
                    <button class="gs-sim-toggle-btn forvandling ${simState.activeMode === 'forvandling' ? 'active' : ''}" id="btn-sim-forvandling">
                        🟠 Tilblivelse & Forvandling
                    </button>
                </div>
            </div>
            <div class="gs-sim-cards-grid">
                ${simData.map(item => {
                    const text = simState.activeMode === 'tilstand' ? item.tilstand : item.forvandling;
                    const accentColor = simState.activeMode === 'tilstand' ? '#38bdf8' : '#fb923c';
                    return `
                        <div class="gs-sim-chip" style="border-left: 3px solid ${accentColor}">
                            <span class="gs-sim-chip-topic">${item.topic}</span>
                            <div class="gs-sim-chip-sentence">
                                <span>${text}</span>
                                <button class="gs-sim-tts-btn" title="Lyt på dansk" data-speak="${text}">
                                    🔊
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        simulator.querySelector('#btn-sim-tilstand').onclick = () => {
            simState.activeMode = 'tilstand';
            renderSimulatorContent();
        };
        simulator.querySelector('#btn-sim-forvandling').onclick = () => {
            simState.activeMode = 'forvandling';
            renderSimulatorContent();
        };
        simulator.querySelectorAll('.gs-sim-tts-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                speakDanish(btn.getAttribute('data-speak'));
            };
        });
    }

    renderSimulatorContent();
    viewContainer.appendChild(simulator);

    // 5. De 4 Kropslige Hovedflader (Det store arkitektur-overblik)
    const realmsSection = document.createElement('div');
    realmsSection.className = 'gs-realms-section';
    realmsSection.innerHTML = `
        <div class="gs-section-header">
            <div>
                <h2>🏛️ Appens 4 Kropslige Hovedflader</h2>
                <p>Udforsk grammatikken gennem kroppens fire primære sansninger af virkeligheden.</p>
            </div>
        </div>
        <div class="gs-hovedflader-grid">
            <div class="gs-hovedflade-card active-flade" id="btn-open-flade1">
                <div>
                    <span class="gs-hf-tag ready">✨ 100% Færdig & Aktiv</span>
                    <h3 class="gs-hf-title">Flade 1: Dynamik & Form</h3>
                    <p class="gs-hf-sub">Inde i tingen og kroppen: Stilstand vs. Forvandling.</p>
                    <ul class="gs-hf-bullets">
                        <li>Være vs. Blive (verbernes grundkerne)</li>
                        <li>Ligge vs. Lægge (positionsverber)</li>
                        <li>Form & Masse (utællelig vs. tællelig)</li>
                        <li>Har vs. Er i førnutid (motoren vs. døren)</li>
                        <li>Aspekt, Måde & Diatese (dvælen vs. fart)</li>
                    </ul>
                </div>
                <button class="gs-hf-btn">
                    Åbn Hovedflade 1 Portal →
                </button>
            </div>

            <div class="gs-hovedflade-card">
                <div>
                    <span class="gs-hf-tag planned">🚧 Næste Fase</span>
                    <h3 class="gs-hf-title">Flade 2: Rum, Tid & Relationer</h3>
                    <p class="gs-hf-sub">Hvor står mit kamera? Nærhed i hånden vs. Afstand i kikkerten.</p>
                    <ul class="gs-hf-bullets">
                        <li>I vs. På (hulen vs. fladen)</li>
                        <li>Denne vs. Den (hånden vs. pegefingeren)</li>
                        <li>Nutid vs. Datid (scenen vs. kikkerten)</li>
                        <li>Hjemme vs. Hjem (zonen vs. tærsklen)</li>
                        <li>Sin vs. Hans (kroppens intime sfære)</li>
                    </ul>
                </div>
            </div>

            <div class="gs-hovedflade-card">
                <div>
                    <span class="gs-hf-tag planned">📋 Planlagt</span>
                    <h3 class="gs-hf-title">Flade 3: Modalitet & Evidens</h3>
                    <p class="gs-hf-sub">Hvor fast er grunden under mine fødder? Vished vs. Tvivl.</p>
                    <ul class="gs-hf-bullets">
                        <li>Klippegrund vs. Tynd is (sikkert, måske)</li>
                        <li>Evidensens kilde: Nok, Jo, Vel, Vist</li>
                        <li>Kroppens mærken: Synes vs. Tror</li>
                        <li>Modalverbernes pres: Skal, vil, må, kan</li>
                    </ul>
                </div>
            </div>

            <div class="gs-hovedflade-card">
                <div>
                    <span class="gs-hf-tag planned">📋 Planlagt</span>
                    <h3 class="gs-hf-title">Flade 4: Kraft & Tekstflow</h3>
                    <p class="gs-hf-sub">Hængslerne mellem scenerne. Kausalitet og sætningsdans.</p>
                    <ul class="gs-hf-bullets">
                        <li>Fri bane: Fordi (kilde) vs. Derfor (fremdrift)</li>
                        <li>Modstand: Selvom (muren) vs. Alligevel (gennembrud)</li>
                        <li>Betingelser: Hvis (springbræt) vs. Eller</li>
                        <li>Sætningsdansen & Inversion (felt 1 & 2)</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    const openFlade1Btn = realmsSection.querySelector('#btn-open-flade1');
    if (openFlade1Btn) {
        openFlade1Btn.onclick = () => navigateFn('sansning_flade1');
    }
    viewContainer.appendChild(realmsSection);

    // 6. Stations Data (Nu med alle Hovedflade 1 & 2 stationer)
    const stations = [
        {
            id: 'vaere_blive',
            route: 'sansning_vaere_blive',
            num: '1.1',
            tag: 'Grundbegreberne',
            title: 'Væren vs. Tilblivelse',
            sub: 'At være vs. At blive i ren form. Vandet i ro vs. vandet der fryser.',
            accent: '#38bdf8',
            tilstandLabel: 'Tilstand',
            tilstandSent: 'Kaffen er kold.',
            forvandlingLabel: 'Forvandling',
            forvandlingSent: 'Kaffen bliver kold.',
            vrimmel: 'Hverdagsstuen & Terrassen',
            leftImg: 'assets/sansning_vaere_venstre.jpg',
            rightImg: 'assets/sansning_blive_hoejre.jpg'
        },
        {
            id: 'kraft_hvile',
            route: 'sansning_kraft_hvile',
            num: '1.2',
            tag: 'Positionsverber',
            title: 'Kroppens Kraft vs. Tingens Hvile',
            sub: 'Lægge/ligge, sætte/sidde, stille/stå. Hånden der flytter vs. tingen der hviler.',
            accent: '#ec4899',
            tilstandLabel: 'Tingens hvile',
            tilstandSent: 'Bogen ligger / Vasen står på hylden.',
            forvandlingLabel: 'Håndens kraft',
            forvandlingSent: 'Jeg lægger bogen / stiller vasen.',
            vrimmel: 'Stuen & Arbejdsværelset',
            leftImg: 'assets/sansning_kraft_hvile_venstre.jpg',
            rightImg: 'assets/sansning_kraft_hvile_hoejre.jpg'
        },
        {
            id: 'form_masse',
            route: 'sansning_form_masse',
            num: '1.3',
            tag: 'Form & Masse',
            title: 'Utællelig Masse vs. Tællelig Form',
            sub: 'Det flydende og uafgrænsede (vand, mel) over for genstanden med klar kontur (en kop, to æbler).',
            accent: '#10b981',
            tilstandLabel: 'Utællelig masse',
            tilstandSent: 'Der er koldt vand og mel.',
            forvandlingLabel: 'Tællelig form',
            forvandlingSent: 'Hun køber en flaske og to æbler.',
            vrimmel: 'Bageriet & Køkkenbordet',
            leftImg: 'assets/sansning_masse_venstre.jpg',
            rightImg: 'assets/sansning_form_hoejre.jpg'
        },
        {
            id: 'har_er',
            route: 'sansning_har_er',
            num: '1.4',
            tag: 'Førnutid & Resultat',
            title: 'Aktivitet vs. Tilstandsskift (Har vs. Er)',
            sub: 'Har (motoren der arbejder) vs. Er (den nye tilstand og flyttede grænse).',
            accent: '#f59e0b',
            tilstandLabel: 'Tilstand / Er',
            tilstandSent: 'Huset er malet / Hun er cyklet på arbejde.',
            forvandlingLabel: 'Aktivitet / Har',
            forvandlingSent: 'Malerne har malet / Hun har cyklet i skoven.',
            vrimmel: 'Det Travle Kvarter & Gaden',
            leftImg: 'assets/sansning_har_er_venstre.jpg',
            rightImg: 'assets/sansning_har_er_hoejre.jpg'
        },
        {
            id: 'aspekt_maade',
            route: 'sansning_aspekt_maade',
            num: '1.5',
            tag: 'Aspekt & Måde',
            title: 'Kroppens Dvælen vs. Retningsskift & Fart',
            sub: 'Uafgrænset dvælen ("ligger og læser") og roligt tempo vs. bevidst retningsskift og høj fart.',
            accent: '#8b5cf6',
            tilstandLabel: 'Dvælen & Roligt',
            tilstandSent: 'Mads ligger og læser / går langsomt.',
            forvandlingLabel: 'Retningsskift & Fart',
            forvandlingSent: 'Mads sætter sig til at læse / løber hurtigt.',
            vrimmel: 'Havestuen & Terrassen',
            leftImg: 'assets/sansning_aspekt_venstre.jpg',
            rightImg: 'assets/sansning_aspekt_hoejre.jpg'
        },
        {
            id: 'rummet_taersklen',
            route: 'sansning_rummet_taersklen',
            num: '2.1',
            tag: 'Sted vs. Retning',
            title: 'Rummet & Tærsklen',
            sub: 'Hjemme vs. Hjem, Inde vs. Ind, Oppe vs. Op. Ro i rummet vs. krydsning af dørtrinet.',
            accent: '#3b82f6',
            tilstandLabel: 'Ro i rummet (-e)',
            tilstandSent: 'Vi hygger os hjemme / inde i varmen.',
            forvandlingLabel: 'Krydser tærsklen',
            forvandlingSent: 'Vi tager hjem / går ind i stuen.',
            vrimmel: 'Huset, Døren & Haven',
            leftImg: 'assets/sansning_rummet_venstre.jpg',
            rightImg: 'assets/sansning_rummet_hoejre.jpg'
        },
        {
            id: 'verbernes_tider',
            route: 'sansning_verber_tider',
            num: '2.3',
            tag: 'Tidens Kikkert',
            title: 'Tidens Sansning (Verbernes tider)',
            sub: 'Forskellen på "havde været" (uforandret tilstand) og "var blevet" (omslaget der fandt sted).',
            accent: '#d97706',
            tilstandLabel: 'Havde været',
            tilstandSent: 'Vejret havde været koldt længe.',
            forvandlingLabel: 'Var blevet',
            forvandlingSent: 'Vejret var blevet koldt, da bilen ankom.',
            vrimmel: 'Vinterhuset & Indkørslen',
            leftImg: 'assets/sansning_verber_tider_venstre.jpg',
            rightImg: 'assets/sansning_verber_tider_hoejre.jpg'
        },
        {
            id: 'sindets_sansning',
            route: 'sansning_sindet',
            num: '3.3',
            tag: 'Krop vs. Tanke',
            title: 'Sindets Sansning',
            sub: 'Synes (mærket med kroppen og smagsløgene) vs. Tror (uvis formodning i hovedet).',
            accent: '#06b6d4',
            tilstandLabel: 'Kroppen mærker',
            tilstandSent: 'Jeg synes, kaffen smager bittert.',
            forvandlingLabel: 'Hjernen gætter',
            forvandlingSent: 'Jeg tror, kaffen er økologisk.',
            vrimmel: 'Middagsbordet & Samtalen',
            leftImg: 'assets/sansning_sindet_venstre.jpg',
            rightImg: 'assets/sansning_sindet_hoejre.jpg'
        }
    ];

    // Filter Bar
    const filterBar = document.createElement('div');
    filterBar.className = 'gs-filter-bar';
    filterBar.innerHTML = `
        <div class="gs-filter-title">
            <span>🗺️ De 8 Sanse-Stationer</span>
        </div>
        <div class="gs-filter-pills">
            <button class="gs-filter-pill active" data-filter="all">Vis alle (8)</button>
            <button class="gs-filter-pill" data-filter="tilstand">🔵 Kun Væren & Stilstand</button>
            <button class="gs-filter-pill" data-filter="forvandling">🟠 Kun Tilblivelse & Forvandling</button>
        </div>
    `;
    viewContainer.appendChild(filterBar);

    // Stations Grid Container
    const grid = document.createElement('div');
    grid.className = 'gs-stations-grid';

    function renderStations(filter = 'all') {
        grid.innerHTML = '';
        stations.forEach(st => {
            const card = document.createElement('div');
            card.className = 'gs-station-card';
            card.style.setProperty('--station-accent', st.accent);

            card.innerHTML = `
                <div>
                    <!-- Split Thumbnail Vrimlebillede direkte på kortet -->
                    <div class="gs-card-split-preview" title="Klik for at åbne ${st.title}">
                        <div class="gs-card-preview-half left">
                            <img src="${st.leftImg}" alt="Væren" class="gs-card-preview-img" />
                            <span class="gs-card-preview-label">🔵 Tilstand</span>
                        </div>
                        <div class="gs-card-preview-divider">
                            <span class="gs-card-preview-badge">VS</span>
                        </div>
                        <div class="gs-card-preview-half right">
                            <img src="${st.rightImg}" alt="Forvandling" class="gs-card-preview-img" />
                            <span class="gs-card-preview-label">🟠 Forvandling</span>
                        </div>
                    </div>

                    <div class="gs-station-head">
                        <div class="gs-station-number">${st.num}</div>
                        <div class="gs-station-tag">${st.tag}</div>
                    </div>
                    <h3 class="gs-station-title">${st.title}</h3>
                    <p class="gs-station-sub">${st.sub}</p>
                    
                    <div class="gs-station-contrast-box">
                        <div class="gs-contrast-row" style="display: ${filter === 'forvandling' ? 'none' : 'flex'}">
                            <span class="gs-contrast-label tilstand">🔵 ${st.tilstandLabel}:</span>
                            <span class="gs-contrast-sent">${st.tilstandSent}</span>
                        </div>
                        <div class="gs-contrast-row" style="display: ${filter === 'tilstand' ? 'none' : 'flex'}">
                            <span class="gs-contrast-label forvandling">🟠 ${st.forvandlingLabel}:</span>
                            <span class="gs-contrast-sent">${st.forvandlingSent}</span>
                        </div>
                    </div>
                </div>

                <div class="gs-station-footer">
                    <span class="gs-station-badge-vrimmel">🖼️ Vrimlebillede: ${st.vrimmel}</span>
                    <button class="gs-station-enter-btn">
                        Gå til station →
                    </button>
                </div>
            `;

            card.onclick = () => {
                navigateFn(st.route);
            };

            grid.appendChild(card);
        });
    }

    renderStations('all');
    viewContainer.appendChild(grid);

    // Filter button logic
    filterBar.querySelectorAll('.gs-filter-pill').forEach(btn => {
        btn.onclick = () => {
            filterBar.querySelectorAll('.gs-filter-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderStations(btn.getAttribute('data-filter'));
        };
    });

    // 6. Pedagogical Guide for Teachers and Students
    const guide = document.createElement('details');
    guide.className = 'gs-guide-card';
    guide.innerHTML = `
        <summary class="gs-guide-summary">
            <span>🧘 Lærerens & Kursistens Sanseguide: Sådan sanses grammatikken</span>
            <span>▼</span>
        </summary>
        <div class="gs-guide-content">
            <p>
                Mange sprogkursister kæmper med regler som <em>transitiv/intransitiv</em>, <em>perfektum participium</em> 
                og <em>adverbiel stedfæstelse</em>, fordi disse betegnelser er abstrakte og kliniske. 
                Når vi i stedet forbinder sproget med <strong>kroppens umiddelbare sansning af rum, tid og bevægelse</strong>, 
                opstår forståelsen organisk:
            </p>
            <div class="gs-guide-grid">
                <div class="gs-guide-col">
                    <h3>🤚 1. Kropssprogets Fagter</h3>
                    <p>
                        Brug hænderne i undervisningen: En flad, rolig håndflade mod bordet symboliserer <strong>Tilstand (ligger / er / hjemme)</strong>. 
                        En gribende eller skubbende hånd i fart symboliserer <strong>Forvandling (lægger / bliver / hjem)</strong>.
                    </p>
                </div>
                <div class="gs-guide-col">
                    <h3>🚪 2. Tærsklens Grænse</h3>
                    <p>
                        Vis dørtrinet: Står kursisten inden for døren, er det en lukket ro med <strong>-e</strong> (inde, oppe, hjemme). 
                        Så snart foden løftes og krydser tærsklen, forsvinder <strong>-e</strong>'et (ind, op, hjem).
                    </p>
                </div>
                <div class="gs-guide-col">
                    <h3>👅 3. Tunge vs. Pande</h3>
                    <p>
                        Hvor sidder verbet? <strong>"Jeg synes"</strong> sidder i smagsløgene, i maven og på huden (sanseindtryk). 
                        <strong>"Jeg tror"</strong> sidder i panden foran (hovedets gæt uden sansning her og nu).
                    </p>
                </div>
            </div>
        </div>
    `;
    viewContainer.appendChild(guide);

    container.appendChild(viewContainer);
}
