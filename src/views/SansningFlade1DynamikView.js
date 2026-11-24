import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import {
    renderSansningGlobalNav,
    renderRedThreadStoryStrip,
    renderSansningTactileLab,
    renderSansningFooterBridge
} from '../components/SansningIntegration.js';

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
            background: #5C0812;
            border: 1.5px solid #851825;
            color: #ffffff;
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
            border-color: #FFC9CD;
            background: #73101C;
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
            background: rgba(92, 8, 18, 0.85);
            border: 1px solid #851825;
            border-radius: 999px;
            padding: 0.35rem 1rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #FFC9CD;
            letter-spacing: 0.04em;
            margin-bottom: 0.75rem;
        }
        .gs-hero h1 {
            font-size: 2.3rem;
            font-weight: 900;
            margin: 0 0 0.5rem;
            letter-spacing: -0.02em;
            color: #ffffff;
        }
        .gs-hero p {
            color: #FFC9CD;
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
            background: #5C0812;
            border: 1.5px solid #851825;
        }
        .gs-realm-card.tilstand {
            border-color: #38bdf8;
            background: linear-gradient(145deg, #5C0812 0%, rgba(14, 116, 144, 0.25) 100%);
        }
        .gs-realm-card.forvandling {
            border-color: #fb923c;
            background: linear-gradient(145deg, #5C0812 0%, rgba(194, 65, 12, 0.25) 100%);
        }
        .gs-realm-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.65rem;
        }
        .gs-realm-badge {
            font-size: 0.78rem;
            font-weight: 800;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            letter-spacing: 0.04em;
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
        .gs-realm-symbol { font-size: 1.4rem; }
        .gs-realm-title {
            font-size: 1.35rem;
            font-weight: 800;
            margin: 0 0 0.35rem;
            color: #ffffff;
        }
        .gs-realm-desc {
            color: #FFC9CD;
            font-size: 0.92rem;
            line-height: 1.5;
            margin: 0 0 0.9rem;
        }
        .gs-realm-examples {
            background: #4A040B;
            border-radius: 12px;
            padding: 0.75rem 0.9rem;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            border: 1px dashed #851825;
        }
        .gs-realm-ex-item {
            font-size: 0.88rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            color: #FFC9CD;
        }
        .gs-realm-ex-word { font-weight: 800; }
        .gs-realm-card.tilstand .gs-realm-ex-word { color: #38bdf8; }
        .gs-realm-card.forvandling .gs-realm-ex-word { color: #fb923c; }

        /* Simulator */
        .gs-simulator-box {
            background: #5C0812;
            border: 1.5px solid #851825;
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
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gs-sim-toggle-group {
            display: inline-flex;
            background: #4A040B;
            border: 1.5px solid #851825;
            border-radius: 12px;
            padding: 0.25rem;
            gap: 0.25rem;
        }
        .gs-sim-toggle-btn {
            background: transparent;
            border: none;
            color: #FFC9CD;
            padding: 0.45rem 0.9rem;
            border-radius: 8px;
            font-size: 0.84rem;
            font-weight: 700;
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
            background: #4A040B;
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            border: 1px solid #851825;
        }
        .gs-sim-chip-topic {
            font-size: 0.74rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            color: #FFC9CD;
        }
        .gs-sim-chip-sentence {
            font-size: 0.95rem;
            font-weight: 700;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        /* Large Split-Stage Showcase */
        .gs-card-thumb-split, .gs-station-thumb, .gs-card-split-preview { display: none !important; }
        .gs-showcase-box {
            background: #5C0812;
            border: 1.5px solid #851825;
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
            color: #FFC9CD;
        }
        .gs-showcase-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            background: #4A040B;
            padding: 0.3rem;
            border-radius: 12px;
            border: 1px solid #851825;
        }
        .gs-showcase-tab {
            background: transparent;
            border: none;
            color: #FFC9CD;
            padding: 0.45rem 0.8rem;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .gs-showcase-tab:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.08);
        }
        .gs-showcase-tab.active {
            background: #FF4D5E;
            color: #ffffff;
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
            background: #FF4D5E;
            color: #ffffff;
            border: none;
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
        }
        .gs-showcase-cta-btn:hover {
            background: #ff6b7a;
            transform: translateY(-2px);
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
            color: #FFC9CD;
        }

        /* Stations Grid with Dual-Thumbnails */
        .gs-stations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 1.3rem;
            margin-bottom: 2.5rem;
        }
        .gs-station-card {
            background: #5C0812;
            border: 1.5px solid #851825;
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
            border: 1px solid #851825;
            background: #4A040B;
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
            font-weight: 800;
            padding: 2px 7px;
            border-radius: 6px;
            letter-spacing: 0.04em;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
            z-index: 1;
        }
        .gs-card-preview-half.left .gs-card-preview-label {
            left: 6px;
            background: rgba(14, 116, 144, 0.9);
            color: #7dd3fc;
            border: 1px solid rgba(56, 189, 248, 0.4);
        }
        .gs-card-preview-half.right .gs-card-preview-label {
            right: 6px;
            background: rgba(194, 65, 12, 0.9);
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
            background: #5C0812;
            border: 1px solid #851825;
            color: #FFC9CD;
            font-size: 0.65rem;
            font-weight: 800;
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
            font-weight: 800;
            color: #FFC9CD;
            background: #4A040B;
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            border: 1px solid #851825;
        }
        .gs-station-tag {
            font-size: 0.74rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            color: var(--station-accent, #38bdf8);
        }
        .gs-station-title {
            font-size: 1.18rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.35rem;
        }
        .gs-station-sub {
            color: #FFC9CD;
            font-size: 0.86rem;
            line-height: 1.45;
            margin: 0 0 0.9rem;
        }
        .gs-station-contrast-box {
            background: #4A040B;
            border-radius: 12px;
            padding: 0.7rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            border: 1px solid #851825;
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
        .gs-contrast-sent { font-weight: 700; color: #ffffff; }

        .gs-station-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-top: 0.5rem;
            border-top: 1px solid #851825;
        }
        .gs-station-badge-vrimmel {
            font-size: 0.75rem;
            font-weight: 800;
            color: #FFC9CD;
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
    backBtn.innerHTML = `← Tilbage til sansningsoversigten`;
    backBtn.onclick = () => navigateFn('grammatik_sansning');
    topBar.appendChild(backBtn);

    const fladeBadge = document.createElement('span');
    fladeBadge.className = 'gs-hero-badge';
    fladeBadge.innerHTML = `Hovedflade 2 • Tilstand & bevægelse`;
    topBar.appendChild(fladeBadge);

    // topBar fjernet (erstattet af global nav)

    // 1b. Global Hovedflade- & Stations-navigation (Den røde tråd)
    viewContainer.appendChild(renderSansningGlobalNav('flade2', navigateFn));

    // 2. Hero Header
    const hero = document.createElement('div');
    hero.className = 'gs-hero';
    hero.innerHTML = `
        <div class="gs-hero-badge">Hovedflade 2 • Tilstand og bevægelse</div>
        <h1>Tilstand og bevægelse – (hvile, kraft og forandring)</h1>
        <p>
            På dansk har alle disse 4 stationer én fælles kognitiv kerne: Befinder kroppen og tingen sig i en <strong>stabil tilstand i hvile</strong> 
            (Det blå rige: <em>er, ligger, har arbejdet, sidder og læser</em>), eller sker der en <strong>bevægelse, muskulær kraftoverførsel og faseforandring</strong> (Det gyldne rige: <em>bliver, lægger, er gået, sætter sig til</em>)?
        </p>
    `;
    viewContainer.appendChild(hero);

    // 2b. Den Røde Tråd + Taktilt Grounding-Laboratorium (Etape 1 + Etape 2)
    const tactileLab = renderSansningTactileLab('flade2', navigateFn, 0, false);
    const redThreadCard = renderRedThreadStoryStrip('flade2', navigateFn, (idx) => tactileLab.setStationIdx(idx));
    // redThreadCard fjernet (undgår dobbelt-information)
    viewContainer.appendChild(tactileLab);

    // 3. Compass Cards (1:1 afstemt med Flade 2's 5 rene tilstand/bevægelse-stationer: 2.1 – 2.5)
    const compass = document.createElement('div');
    compass.className = 'gs-compass-wrapper';
    compass.innerHTML = `
        <div class="gs-realm-card tilstand">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">🔵 Det blå rige • Tilstand & Hvile</span>
            </div>
            <h2 class="gs-realm-title">Væren, hvile, ro i rummet (-e), proces & dvælen</h2>
            <p class="gs-realm-desc">
                Når verden hviler i en uforandret tilstand: temperaturen står stille (2.1), tingen hviler på fladen (2.2), kroppen er i ro i zonen med -e (2.3), proces-motoren arbejder på stedet (2.4), og kroppen dvæler i nuet (2.5).
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>2.1 Væren i ro:</span>
                    <span class="gs-realm-ex-word">Kaffen ER varm</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.2 Tingens hvile (0 N):</span>
                    <span class="gs-realm-ex-word">Bogen LIGGER på bordet</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.3 Ro i rummet (-e):</span>
                    <span class="gs-realm-ex-word">Vi bliver HJEMME og INDE</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.4 Proces-motoren på stedet:</span>
                    <span class="gs-realm-ex-word">Mads HAR cyklet rundt ude</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.5 Kroppens dvælen:</span>
                    <span class="gs-realm-ex-word">Mads SIDDER OG drikker kaffe</span>
                </div>
            </div>
        </div>

        <div class="gs-realm-card forvandling">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">🟠 Det gyldne rige • Bevægelse & Forandring</span>
            </div>
            <h2 class="gs-realm-title">Tilblivelse, kraft, tærskelskift, grænse & fart</h2>
            <p class="gs-realm-desc">
                Når bevægelsen og kraften griber ind: tilstanden skifter fase (2.1), hånden overfører kraft til et objekt (2.2), foden krydser tærsklen uden -e (2.3), subjektet krydser grænsen til et nyt sted/resultat (2.4), og en ny handling skydes i gang (2.5).
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>2.1 Fase-overgang:</span>
                    <span class="gs-realm-ex-word">Kaffen BLIVER kold</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.2 Håndens kraft (+objekt):</span>
                    <span class="gs-realm-ex-word">Jeg LÆGGER bogen på bordet</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.3 Retning over tærsklen (0):</span>
                    <span class="gs-realm-ex-word">Vi går HJEM og IND</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.4 Grænseskift & ny tilstand:</span>
                    <span class="gs-realm-ex-word">Huset ER malet / Han ER cyklet hjem</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>2.5 Retningsskift & fart:</span>
                    <span class="gs-realm-ex-word">Mads SÆTTER SIG TIL AT arbejde</span>
                </div>
            </div>
        </div>
    `;
    // compass fjernet (undgår dobbelt-information)

    // 4. Sanse-Simulatoren (1:1 afstemt med Station 2.1 – 2.5)
    const simulator = document.createElement('div');
    simulator.className = 'gs-simulator-box';

    const simState = { activeMode: 'tilstand' };

    const simData = [
        {
            topic: '2.1 Væren vs. tilblivelse (er vs. bliver)',
            tilstand: 'Kaffen er varm i kanden.',
            forvandling: 'Kaffen bliver kold på bordet.'
        },
        {
            topic: '2.2 Tingens hvile vs. håndens kraft (ligger vs. lægger)',
            tilstand: 'Nøglerne ligger stille på bordet.',
            forvandling: 'Hun lægger nøglerne ned på bordet.'
        },
        {
            topic: '2.3 Rummet og tærsklen: ro (-e) vs. bevægelse (0)',
            tilstand: 'Børnene leger trygt hjemme og inde i stuen.',
            forvandling: 'Børnene løber hjem og ind gennem døren.'
        },
        {
            topic: '2.4 Proces-motor vs. grænseskift og resultat (har vs. er)',
            tilstand: 'Malerne har malet facaden (og Mads har cyklet ude).',
            forvandling: 'Huset er nymalet nu, og Mads er cyklet hjem.'
        },
        {
            topic: '2.5 Kroppens dvælen vs. retningsskift og fart',
            tilstand: 'Mads ligger og læser i roligt tempo.',
            forvandling: 'Mads sætter sig til at læse og arbejder hurtigt.'
        }
    ];

    function renderSimulatorContent() {
        simulator.innerHTML = `
            <div class="gs-sim-header">
                <span class="gs-sim-title">Sanse-simulatoren: Oplev skiftet mellem tilstand og bevægelse i 1 klik</span>
                <div class="gs-sim-toggle-group">
                    <button class="gs-sim-toggle-btn tilstand ${simState.activeMode === 'tilstand' ? 'active' : ''}" id="btn-sim-tilstand">
                        🔵 Tilstand og stilstand
                    </button>
                    <button class="gs-sim-toggle-btn forvandling ${simState.activeMode === 'forvandling' ? 'active' : ''}" id="btn-sim-forvandling">
                        🟠 Bevægelse og forandring
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
    }

    renderSimulatorContent();
    // simulator fjernet (erstattet af Det Blå Taktile Laboratorium)

    // 5. De 5 rene Tilstand/Bevægelse-stationer i Hovedflade 2
    const stations = [
        {
            id: 'vaere_blive',
            route: 'sansning_vaere_blive',
            num: '2.1',
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
            num: '2.2',
            tag: 'Positionsverber',
            title: 'Tingens hvile vs. kroppens kraft (ligge vs. lægge)',
            sub: 'Lægge/ligge, sætte/sidde, stille/stå. Hånden der flytter over for tingen der hviler i ro.',
            accent: '#ec4899',
            tilstandLabel: 'Tingens hvile',
            tilstandSent: 'Bogen ligger på bordet.',
            forvandlingLabel: 'Kroppens kraft',
            forvandlingSent: 'Jeg lægger bogen på bordet.',
            vrimmel: 'Stuen og arbejdsværelset',
            leftImg: 'assets/sansning_kraft_hvile_venstre.jpg',
            rightImg: 'assets/sansning_kraft_hvile_hoejre.jpg',
            leftCaption: 'Bogen ligger / Vasen står på hylden',
            rightCaption: 'Jeg lægger bogen / stiller vasen med håndkraft'
        },
        {
            id: 'rummet_taersklen',
            route: 'sansning_rummet_taersklen',
            num: '2.3',
            tag: 'Rummet & tærsklen',
            title: 'Rummet og tærsklen: hjemme vs. hjem / inde vs. ind',
            sub: 'På dansk afslører det lille bogstav -e, om du er i ro i rummet (hjemme, inde, ude, oppe, nede), eller om din krop krydser tærsklen i en retningsbevægelse (hjem, ind, ud, op, ned).',
            accent: '#34d399',
            tilstandLabel: 'Ro i zonen (-e)',
            tilstandSent: 'Vi er hjemme / Bogen ligger inde.',
            forvandlingLabel: 'Over tærsklen (0)',
            forvandlingSent: 'Vi går hjem / Jeg bærer den ind.',
            vrimmel: 'Dobbelt rum-vrimlebillede & 5 dimensioner',
            leftImg: 'assets/sansning_rummet_venstre.jpg',
            rightImg: 'assets/sansning_rummet_hoejre.jpg',
            leftCaption: 'Tilstand i ro med -e: hjemme, inde, ude, oppe, nede',
            rightCaption: 'Bevægelse over tærsklen uden -e: hjem, ind, ud, op, ned'
        },
        {
            id: 'har_er',
            route: 'sansning_har_er',
            num: '2.4',
            tag: 'Førnutid',
            title: 'Aktivitet vs. tilstandsskift (har vs. er)',
            sub: 'Har (motoren der arbejder på stedet: har løbet ude) vs. Er (den nye tilstand og flyttede grænse: er løbet ud / er malet).',
            accent: '#f59e0b',
            tilstandLabel: 'Motoren (Har)',
            tilstandSent: 'Malerne har malet facaden.',
            forvandlingLabel: 'Grænseskiftet (Er)',
            forvandlingSent: 'Huset er malet / Hun er cyklet hjem.',
            vrimmel: 'Bykvarteret og gaden',
            leftImg: 'assets/sansning_har_er_venstre.jpg',
            rightImg: 'assets/sansning_har_er_hoejre.jpg',
            leftCaption: 'Malerne har malet facaden (processen)',
            rightCaption: 'Huset er nymalet nu (det færdige resultat)'
        },
        {
            id: 'aspekt_maade',
            route: 'sansning_aspekt_maade',
            num: '2.5',
            tag: 'Aspekt og fart',
            title: 'Kroppens dvælen vs. retningsskift og fart',
            sub: 'Uafgrænset dvælen ("ligger og læser") og roligt tempo vs. bevidst retningsskift ("sætter sig til") og høj fart.',
            accent: '#8b5cf6',
            tilstandLabel: 'Dvælen og roligt',
            tilstandSent: 'Mads ligger og læser / går langsomt.',
            forvandlingLabel: 'Retningsskift og fart',
            forvandlingSent: 'Mads sætter sig til at læse / løber hurtigt.',
            vrimmel: 'Havestuen og terrassen',
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
                    <h2>Vrimlebilleder: Oplev modsætningerne i billeder</h2>
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
                        <span>Væren og stilstand (tilstand)</span>
                        <span>${curSt.tilstandLabel}</span>
                    </div>
                    <div class="gs-showcase-img-wrap" title="Klik for at åbne ${curSt.title}">
                        <img src="${curSt.leftImg}" alt="${curSt.leftCaption}" class="gs-showcase-img" />
                    </div>
                    <div class="gs-showcase-caption">
                        <span>${curSt.leftCaption}</span>
                    </div>
                </div>

                <!-- Højre side: Tilblivelse & Forvandling -->
                <div class="gs-showcase-pane right">
                    <div class="gs-showcase-pane-head">
                        <span>Tilblivelse og forvandling (kraft)</span>
                        <span>${curSt.forvandlingLabel}</span>
                    </div>
                    <div class="gs-showcase-img-wrap" title="Klik for at åbne ${curSt.title}">
                        <img src="${curSt.rightImg}" alt="${curSt.rightCaption}" class="gs-showcase-img" />
                    </div>
                    <div class="gs-showcase-caption">
                        <span>${curSt.rightCaption}</span>
                    </div>
                </div>
            </div>

            <div class="gs-showcase-footer">
                <div class="gs-showcase-hint">
                    Vrimlebillede-scene: <strong>${curSt.vrimmel}</strong>
                </div>
                <button class="gs-showcase-cta-btn" id="btn-open-active-station">
                    Åbn station ${curSt.num} træningsbane og opgaver →
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

        const ctaBtn = showcaseBox.querySelector('#btn-open-active-station');
        if (ctaBtn) {
            ctaBtn.onclick = () => {
                navigateFn(curSt.route);
            };
        }
    }

    renderShowcaseStage();
    // Vrimlebillede-showcase fjernet — taktile diagrammer er i hovedrollen

    // 7. Sektions-overskrift for stationerne
    const sectionDivider = document.createElement('div');
    sectionDivider.className = 'gs-section-divider';
    sectionDivider.innerHTML = `
        <div>
            <h2>Alle 5 sansestationer i Hovedflade 2 (Tilstand & Bevægelse)</h2>
            <p>Hver station har sit eget interaktive vrimlebillede, taktilt Grounding-laboratorium og træningsbane.</p>
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
                        <span class="gs-card-preview-label">Tilstand</span>
                    </div>
                    <div class="gs-card-preview-divider">
                        <span class="gs-card-preview-badge">VS</span>
                    </div>
                    <div class="gs-card-preview-half right">
                        <img src="${st.rightImg}" alt="Forvandling" class="gs-card-preview-img" />
                        <span class="gs-card-preview-label">Forvandling</span>
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
                        <span class="gs-contrast-label tilstand">${st.tilstandLabel}:</span>
                        <span class="gs-contrast-sent">${st.tilstandSent}</span>
                    </div>
                    <div class="gs-contrast-row">
                        <span class="gs-contrast-label forvandling">${st.forvandlingLabel}:</span>
                        <span class="gs-contrast-sent">${st.forvandlingSent}</span>
                    </div>
                </div>
            </div>

            <div class="gs-station-footer">
                <span class="gs-station-badge-vrimmel">${st.vrimmel}</span>
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
    // footerBridge fjernet (undgår dobbelt navigation)

    container.appendChild(viewContainer);
}
