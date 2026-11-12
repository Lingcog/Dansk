import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * SansningFlade1DynamikView - Hovedflade 1: Dynamik & Form (Væren og tilblivelse)
 * 
 * Viser:
 * 1. 🔵 Det Blå Rige (Væren & Stilstand) vs. 🟠 Det Gyldne Rige (Tilblivelse & Forvandling)
 * 2. ⚡ Sanse-Simulatoren (1-klik interaktiv kontrast med lyd)
 * 3. 🖼️ Split-Stage Vrimlebilleder på forsiden (Showcase + dual-thumbnails på alle kort)
 * 4. 🧭 De 5 stationer i Hovedflade 1
 */
export function renderSansningFlade1DynamikView(container, navigateFn, extraData = {}) {
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

        .gs-hero {
            text-align: center;
            margin-bottom: 2rem;
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
            max-width: 840px;
            margin: 0 auto;
            line-height: 1.55;
        }

        .gs-compass-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
            .gs-compass-wrapper { grid-template-columns: 1fr; }
        }
        .gs-realm-card {
            border-radius: 18px;
            padding: 1.35rem 1.45rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
            transition: all 0.25s ease;
        }
        .gs-realm-card.tilstand {
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(12, 74, 110, 0.3));
            border: 1.5px solid rgba(56, 189, 248, 0.4);
        }
        .gs-realm-card.forvandling {
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(154, 52, 18, 0.3));
            border: 1.5px solid rgba(251, 146, 60, 0.45);
        }
        .gs-realm-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.65rem;
        }
        .gs-realm-badge {
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
        .gs-realm-symbol { font-size: 1.8rem; }
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
        .gs-realm-ex-word { font-weight: 800; }
        .gs-realm-card.tilstand .gs-realm-ex-word { color: #38bdf8; }
        .gs-realm-card.forvandling .gs-realm-ex-word { color: #fb923c; }

        /* Simulator */
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
            grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
            gap: 0.75rem;
        }
        .gs-sim-chip {
            background: rgba(15, 23, 42, 0.65);
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            border: 1px solid rgba(148, 163, 184, 0.12);
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
            font-size: 0.95rem;
            transition: background 0.15s ease;
        }
        .gs-sim-tts-btn:hover {
            background: rgba(56, 189, 248, 0.3);
        }

        /* Large Split-Stage Showcase */
        .gs-showcase-box {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 22px;
            padding: 1.3rem 1.4rem;
            margin-bottom: 2.5rem;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        }
        .gs-showcase-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 1.1rem;
        }
        .gs-showcase-title-wrap h2 {
            font-size: 1.3rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.2rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gs-showcase-title-wrap p {
            margin: 0;
            font-size: 0.85rem;
            color: #94a3b8;
        }
        .gs-showcase-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            background: rgba(15, 23, 42, 0.8);
            padding: 0.3rem;
            border-radius: 12px;
            border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .gs-showcase-tab {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.45rem 0.8rem;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .gs-showcase-tab:hover {
            color: #f8fafc;
            background: rgba(255, 255, 255, 0.08);
        }
        .gs-showcase-tab.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: #ffffff;
            box-shadow: 0 2px 10px rgba(2, 132, 199, 0.4);
        }
        .gs-showcase-stage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            border-radius: 16px;
            overflow: hidden;
            background: #020617;
            padding: 0.75rem;
            position: relative;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.6);
            margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
            .gs-showcase-stage {
                grid-template-columns: 1fr;
            }
        }
        .gs-showcase-pane {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            background: #0b132b;
            display: flex;
            flex-direction: column;
            border: 1.5px solid rgba(148, 163, 184, 0.2);
        }
        .gs-showcase-pane.left {
            border-color: rgba(56, 189, 248, 0.45);
        }
        .gs-showcase-pane.right {
            border-color: rgba(251, 146, 60, 0.45);
        }
        .gs-showcase-pane-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.55rem 0.85rem;
            font-weight: 800;
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .gs-showcase-pane.left .gs-showcase-pane-head {
            background: rgba(14, 116, 144, 0.35);
            color: #7dd3fc;
            border-bottom: 1px solid rgba(56, 189, 248, 0.25);
        }
        .gs-showcase-pane.right .gs-showcase-pane-head {
            background: rgba(194, 65, 12, 0.35);
            color: #fed7aa;
            border-bottom: 1px solid rgba(251, 146, 60, 0.25);
        }
        .gs-showcase-img-wrap {
            position: relative;
            height: 280px;
            overflow: hidden;
            background: #0f172a;
            cursor: pointer;
        }
        @media (min-width: 1024px) {
            .gs-showcase-img-wrap {
                height: 340px;
            }
        }
        .gs-showcase-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.35s ease;
        }
        .gs-showcase-img-wrap:hover .gs-showcase-img {
            transform: scale(1.03);
        }
        .gs-showcase-caption {
            padding: 0.75rem 0.9rem;
            background: rgba(15, 23, 42, 0.9);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            font-size: 0.92rem;
            font-weight: 700;
            color: #ffffff;
            border-top: 1px solid rgba(148, 163, 184, 0.15);
        }
        .gs-showcase-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            padding-top: 0.3rem;
        }
        .gs-showcase-hint {
            color: #cbd5e1;
            font-size: 0.88rem;
        }
        .gs-showcase-cta-btn {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: #ffffff;
            border: none;
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }
        .gs-showcase-cta-btn:hover {
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(2, 132, 199, 0.5);
        }

        /* Section Separator */
        .gs-section-divider {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.3rem;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .gs-section-divider h2 {
            font-size: 1.35rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gs-section-divider p {
            margin: 0;
            font-size: 0.85rem;
            color: #94a3b8;
        }

        /* Stations Grid with Dual-Thumbnails */
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
            padding: 1.2rem;
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
            margin-bottom: 0.55rem;
            gap: 0.5rem;
        }
        .gs-station-number {
            font-size: 0.85rem;
            font-weight: 900;
            color: #94a3b8;
            background: rgba(15, 23, 42, 0.8);
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .gs-station-tag {
            font-size: 0.74rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--station-accent, #38bdf8);
        }
        .gs-station-title {
            font-size: 1.18rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.35rem;
        }
        .gs-station-sub {
            color: #cbd5e1;
            font-size: 0.86rem;
            line-height: 1.45;
            margin: 0 0 0.9rem;
        }
        .gs-station-contrast-box {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 12px;
            padding: 0.7rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            border: 1px solid rgba(148, 163, 184, 0.12);
            margin-bottom: 1rem;
        }
        .gs-contrast-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.86rem;
            gap: 0.5rem;
        }
        .gs-contrast-label.tilstand { color: #38bdf8; font-weight: 700; font-size: 0.78rem; }
        .gs-contrast-label.forvandling { color: #fb923c; font-weight: 700; font-size: 0.78rem; }
        .gs-contrast-sent { font-weight: 700; color: #f8fafc; }

        .gs-station-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-top: 0.5rem;
            border-top: 1px solid rgba(148, 163, 184, 0.12);
        }
        .gs-station-badge-vrimmel {
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
        }
        .gs-station-card:hover .gs-station-enter-btn {
            transform: translateX(3px);
            color: #ffffff;
        }
    `;
    viewContainer.appendChild(style);

    // 1. Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'gs-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'gs-back-btn';
    backBtn.innerHTML = `← Tilbage til Sansningsoversigten`;
    backBtn.onclick = () => navigateFn('grammatik_sansning');
    topBar.appendChild(backBtn);

    const fladeBadge = document.createElement('span');
    fladeBadge.className = 'gs-hero-badge';
    fladeBadge.innerHTML = `⚡ Hovedflade 1 • Kropslig Fysik`;
    topBar.appendChild(fladeBadge);

    viewContainer.appendChild(topBar);

    // 2. Hero Header
    const hero = document.createElement('div');
    hero.className = 'gs-hero';
    hero.innerHTML = `
        <div class="gs-hero-badge">⚡ HOVEDFLADE 1 • DYNAMIK & FORM</div>
        <h1>Dynamik & Form – (Væren og tilblivelse)</h1>
        <p>
            På dansk afslører dine verber og ord, om universet befinder sig i en <strong>stabil, uforandret tilstand</strong> 
            (Det Blå Rige), eller om der overføres <strong>muskulær kraft, bevægelse og forvandling</strong> (Det Gyldne Rige).
            Se de diktomiske vrimlebilleder og udforsk de 5 sanse-stationer nedenunder.
        </p>
    `;
    viewContainer.appendChild(hero);

    // 3. Compass Cards (Det Blå Rige vs. Det Gyldne Rige - Nøjagtig som anmodet)
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

    // 4. Sanse-Simulatoren (Nøjagtig de 6 emner fra brugerens specifikation)
    const simulator = document.createElement('div');
    simulator.className = 'gs-simulator-box';

    const simState = { activeMode: 'tilstand' };

    const simData = [
        {
            topic: '1. VÆREN VS. TILBLIVELSE',
            tilstand: 'Kaffen er kold.',
            forvandling: 'Kaffen bliver kold.'
        },
        {
            topic: '2. TIDENS SANSNING',
            tilstand: 'Vejret havde været koldt længe.',
            forvandling: 'Vejret var blevet koldt, da bilen ankom.'
        },
        {
            topic: '3. AKTIVITET VS. RESULTAT',
            tilstand: 'Huset er malet nu.',
            forvandling: 'Malerne har malet facaden.'
        },
        {
            topic: '4. TINGENS HVILE VS. KRAFT',
            tilstand: 'Nøglerne ligger på bordet.',
            forvandling: 'Hun lægger nøglerne på bordet.'
        },
        {
            topic: '5. RUMMET & TÆRSKLEN',
            tilstand: 'Børnene leger inde i stuen.',
            forvandling: 'Børnene løber ind i stuen.'
        },
        {
            topic: '6. SINDETS SANSNING',
            tilstand: 'Jeg synes, kagen er lækker.',
            forvandling: 'Jeg tror, kagen smager sødt.'
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

    // 5. Stations Data med billeder og vrimlebilleder
    const stations = [
        {
            id: 'vaere_blive',
            route: 'sansning_vaere_blive',
            num: '1.1',
            tag: 'Verbernes Kerne',
            title: 'Væren vs. Tilblivelse (Er vs. Bliver)',
            sub: 'At være vs. At blive i ren form. Roen i havnebyen over for morgensolens forvandling.',
            accent: '#38bdf8',
            tilstandLabel: 'Væren (Er)',
            tilstandSent: 'Kaffen er kold.',
            forvandlingLabel: 'Tilblivelse (Bliver)',
            forvandlingSent: 'Kaffen bliver kold.',
            vrimmel: 'Havnebyen & Hverdagsstuen',
            leftImg: 'assets/sansning_vaere_venstre.jpg',
            rightImg: 'assets/sansning_blive_hoejre.jpg',
            leftCaption: 'Kaffen er kold • Havnebyen hviler i ro',
            rightCaption: 'Kaffen bliver kold • Morgensolen bryder frem'
        },
        {
            id: 'kraft_hvile',
            route: 'sansning_kraft_hvile',
            num: '1.2',
            tag: 'Positionsverber',
            title: 'Tingens Hvile vs. Kroppens Kraft (Ligge vs. Lægge)',
            sub: 'Lægge/ligge, sætte/sidde, stille/stå. Hånden der flytter over for tingen der hviler i ro.',
            accent: '#ec4899',
            tilstandLabel: 'Tingens hvile',
            tilstandSent: 'Bogen ligger på bordet.',
            forvandlingLabel: 'Kroppens kraft',
            forvandlingSent: 'Jeg lægger bogen på bordet.',
            vrimmel: 'Stuen & Arbejdsværelset',
            leftImg: 'assets/sansning_kraft_hvile_venstre.jpg',
            rightImg: 'assets/sansning_kraft_hvile_hoejre.jpg',
            leftCaption: 'Bogen ligger / Vasen står på hylden',
            rightCaption: 'Jeg lægger bogen / stiller vasen med håndkraft'
        },
        {
            id: 'form_masse',
            route: 'sansning_form_masse',
            num: '1.3',
            tag: 'Form & Masse',
            title: 'Utællelig Masse vs. Tællelig Form',
            sub: 'Den uafgrænsede masse (vand, kaffe, mel) over for genstanden med klar form (en kop, to æbler, tre boller).',
            accent: '#10b981',
            tilstandLabel: 'Utællelig masse',
            tilstandSent: 'Der er koldt vand og mel.',
            forvandlingLabel: 'Tællelig form',
            forvandlingSent: 'Hun køber en flaske og to æbler.',
            vrimmel: 'Bageriet & Køkkenbordet',
            leftImg: 'assets/sansning_masse_venstre.jpg',
            rightImg: 'assets/sansning_form_hoejre.jpg',
            leftCaption: 'Uafgrænset flydende masse: vand, kaffe og mel',
            rightCaption: 'Formstøbte genstande: en flaske, to kopper, tre boller'
        },
        {
            id: 'har_er',
            route: 'sansning_har_er',
            num: '1.4',
            tag: 'Førnutid',
            title: 'Aktivitet vs. Resultat (Har vs. Er)',
            sub: 'Har (motoren der arbejder forud) vs. Er (den nye tilstand og flyttede grænse).',
            accent: '#f59e0b',
            tilstandLabel: 'Motoren (Har)',
            tilstandSent: 'Malerne har malet facaden.',
            forvandlingLabel: 'Resultatet (Er)',
            forvandlingSent: 'Huset er malet / Hun er cyklet på arbejde.',
            vrimmel: 'Bykvarteret & Gaden',
            leftImg: 'assets/sansning_har_er_venstre.jpg',
            rightImg: 'assets/sansning_har_er_hoejre.jpg',
            leftCaption: 'Malerne har malet facaden (processen)',
            rightCaption: 'Huset er nymalet nu (det færdige resultat)'
        },
        {
            id: 'aspekt_maade',
            route: 'sansning_aspekt_maade',
            num: '1.5',
            tag: 'Aspekt & Fart',
            title: 'Kroppens Dvælen vs. Retningsskift & Fart',
            sub: 'Uafgrænset dvælen ("ligger og læser") og roligt tempo vs. bevidst retningsskift ("sætter sig til") og høj fart.',
            accent: '#8b5cf6',
            tilstandLabel: 'Dvælen & Roligt',
            tilstandSent: 'Mads ligger og læser / går langsomt.',
            forvandlingLabel: 'Retningsskift & Fart',
            forvandlingSent: 'Mads sætter sig til at læse / løber hurtigt.',
            vrimmel: 'Havestuen & Terrassen',
            leftImg: 'assets/sansning_aspekt_venstre.jpg',
            rightImg: 'assets/sansning_aspekt_hoejre.jpg',
            leftCaption: 'Mads ligger og læser i ro / går langsomt',
            rightCaption: 'Mads sætter sig til at læse / løber hurtigt'
        }
    ];

    // 6. Featured Split-Stage Showcase (Vrimlebilleder direkte på forsiden)
    const showcaseBox = document.createElement('div');
    showcaseBox.className = 'gs-showcase-box';

    let activeShowcaseIdx = 0;

    function renderShowcaseStage() {
        const curSt = stations[activeShowcaseIdx];
        showcaseBox.innerHTML = `
            <div class="gs-showcase-header">
                <div class="gs-showcase-title-wrap">
                    <h2>🖼️ Vrimlebilleder: Oplev modsætningerne i billeder</h2>
                    <p>Klik på fanerne nedenfor for at udforske scenerne for hver station direkte på forsiden.</p>
                </div>
                <div class="gs-showcase-nav">
                    ${stations.map((st, idx) => `
                        <button class="gs-showcase-tab ${idx === activeShowcaseIdx ? 'active' : ''}" data-idx="${idx}">
                            ${st.num} ${st.tag}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="gs-showcase-stage">
                <!-- Venstre side: Væren & Stilstand -->
                <div class="gs-showcase-pane left">
                    <div class="gs-showcase-pane-head">
                        <span>🔵 Væren & Stilstand (Tilstand)</span>
                        <span>${curSt.tilstandLabel}</span>
                    </div>
                    <div class="gs-showcase-img-wrap" title="Klik for at åbne ${curSt.title}">
                        <img src="${curSt.leftImg}" alt="${curSt.leftCaption}" class="gs-showcase-img" />
                    </div>
                    <div class="gs-showcase-caption">
                        <span>${curSt.leftCaption}</span>
                        <button class="gs-sim-tts-btn" title="Lyt på dansk" data-speak="${curSt.tilstandSent}">
                            🔊
                        </button>
                    </div>
                </div>

                <!-- Højre side: Tilblivelse & Forvandling -->
                <div class="gs-showcase-pane right">
                    <div class="gs-showcase-pane-head">
                        <span>🟠 Tilblivelse & Forvandling (Kraft)</span>
                        <span>${curSt.forvandlingLabel}</span>
                    </div>
                    <div class="gs-showcase-img-wrap" title="Klik for at åbne ${curSt.title}">
                        <img src="${curSt.rightImg}" alt="${curSt.rightCaption}" class="gs-showcase-img" />
                    </div>
                    <div class="gs-showcase-caption">
                        <span>${curSt.rightCaption}</span>
                        <button class="gs-sim-tts-btn" title="Lyt på dansk" data-speak="${curSt.forvandlingSent}">
                            🔊
                        </button>
                    </div>
                </div>
            </div>

            <div class="gs-showcase-footer">
                <div class="gs-showcase-hint">
                    📍 Vrimlebillede-scene: <strong>${curSt.vrimmel}</strong>
                </div>
                <button class="gs-showcase-cta-btn" id="btn-open-active-station">
                    Åbn Station ${curSt.num} træningsbane & opgaver →
                </button>
            </div>
        `;

        showcaseBox.querySelectorAll('.gs-showcase-tab').forEach(btn => {
            btn.onclick = () => {
                activeShowcaseIdx = parseInt(btn.getAttribute('data-idx'), 10);
                renderShowcaseStage();
            };
        });

        showcaseBox.querySelectorAll('.gs-showcase-img-wrap').forEach(wrap => {
            wrap.onclick = () => {
                navigateFn(curSt.route);
            };
        });

        showcaseBox.querySelectorAll('.gs-sim-tts-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                speakDanish(btn.getAttribute('data-speak'));
            };
        });

        const ctaBtn = showcaseBox.querySelector('#btn-open-active-station');
        if (ctaBtn) {
            ctaBtn.onclick = () => {
                navigateFn(curSt.route);
            };
        }
    }

    renderShowcaseStage();
    viewContainer.appendChild(showcaseBox);

    // 7. Sektions-overskrift for stationerne
    const sectionDivider = document.createElement('div');
    sectionDivider.className = 'gs-section-divider';
    sectionDivider.innerHTML = `
        <div>
            <h2>🧭 Alle 5 Sanse-Stationer i Hovedflade 1</h2>
            <p>Hver station har sit eget interaktive vrimlebillede, didaktiske aha-boks og træningsbane.</p>
        </div>
    `;
    viewContainer.appendChild(sectionDivider);

    // 8. Stations Grid med Dual-Thumbnail vrimlebilleder
    const grid = document.createElement('div');
    grid.className = 'gs-stations-grid';

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
                    <div class="gs-contrast-row">
                        <span class="gs-contrast-label tilstand">🔵 ${st.tilstandLabel}:</span>
                        <span class="gs-contrast-sent">${st.tilstandSent}</span>
                    </div>
                    <div class="gs-contrast-row">
                        <span class="gs-contrast-label forvandling">🟠 ${st.forvandlingLabel}:</span>
                        <span class="gs-contrast-sent">${st.forvandlingSent}</span>
                    </div>
                </div>
            </div>

            <div class="gs-station-footer">
                <span class="gs-station-badge-vrimmel">🖼️ ${st.vrimmel}</span>
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

    viewContainer.appendChild(grid);

    container.appendChild(viewContainer);
}
