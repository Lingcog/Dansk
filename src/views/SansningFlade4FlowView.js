import { baseUrl } from '../utils/config.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import {
    renderSansningGlobalNav,
    renderRedThreadStoryStrip,
    renderSansningTactileLab,
    renderSansningFooterBridge
} from '../components/SansningIntegration.js';

/**
 * SansningFlade4FlowView - Hovedflade 4: Kraftoverførsel og tekstflow (hængslerne)
 *
 * Metafor: Scenernes mekaniske led — hvordan forbinder ordene årsag, modstand, valg og syntaktisk dans?
 * Uden dominobrikker: bygger på vandring i natur og trafik i byen.
 * Rummer:
 * 1. De to riger (Fri fremdrift & åbne valg vs. Modstand & syntaktisk V2-fjeder)
 * 2. Sanse-simulatoren (1-klik skift mellem Uhindret fremdrift, Modstand og Inversion)
 * 3. Split-stage vrimle-galleri for alle 4 stationer (4.1 - 4.4)
 * 4. De 4 stationer (4.1 Uhindret fremdrift, 4.2 Kraft mod modstand, 4.3 Valg & skilleveje, 4.4 Sætningsdansen)
 */
export function renderSansningFlade4FlowView(container, navigateFn, extraData = {}) {
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
        .gs-realm-ex-word { font-weight: 800; text-align: right; }
        .gs-realm-card.tilstand .gs-realm-ex-word { color: #38bdf8; }
        .gs-realm-card.forvandling .gs-realm-ex-word { color: #fb923c; }

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
        }
        .gs-sim-toggle-group {
            display: inline-flex;
            flex-wrap: wrap;
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
        .gs-sim-toggle-btn.active.fremdrift {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
        }
        .gs-sim-toggle-btn.active.modstand {
            background: rgba(250, 204, 21, 0.22);
            color: #fde047;
            box-shadow: 0 0 12px rgba(250, 204, 21, 0.3);
        }
        .gs-sim-toggle-btn.active.inversion {
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
            background: #4A040B;
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
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
        }

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
            .gs-showcase-stage { grid-template-columns: 1fr; }
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
        .gs-showcase-pane.left { border-color: rgba(56, 189, 248, 0.45); }
        .gs-showcase-pane.right { border-color: rgba(251, 146, 60, 0.45); }
        .gs-showcase-pane-head {
            padding: 0.55rem 0.85rem;
            font-weight: 800;
            font-size: 0.82rem;
            letter-spacing: 0.03em;
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
            .gs-showcase-img-wrap { height: 340px; }
        }
        .gs-showcase-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.35s ease;
        }
        .gs-showcase-img-wrap:hover .gs-showcase-img { transform: scale(1.03); }
        .gs-showcase-caption {
            padding: 0.75rem 0.9rem;
            background: rgba(15, 23, 42, 0.9);
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
        .gs-showcase-hint { color: #cbd5e1; font-size: 0.88rem; }
        .gs-showcase-cta-btn {
            background: #FF4D5E;
            color: #ffffff;
            border: none;
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .gs-showcase-cta-btn:hover { background: #ff6b7a; transform: translateY(-2px); }

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
        }
        .gs-section-divider p {
            margin: 0;
            font-size: 0.85rem;
            color: #FFC9CD;
        }

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
        .gs-station-card:hover::before { width: 8px; opacity: 1; }
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
        .gs-card-preview-half { flex: 1; position: relative; overflow: hidden; }
        .gs-card-preview-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.35s ease;
        }
        .gs-station-card:hover .gs-card-preview-img { transform: scale(1.06); }
        .gs-card-preview-label {
            position: absolute;
            bottom: 6px;
            font-size: 0.68rem;
            font-weight: 800;
            padding: 2px 7px;
            border-radius: 6px;
            letter-spacing: 0.03em;
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
        .gs-contrast-sent { font-weight: 700; color: #ffffff; text-align: right; }
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

    const topBar = document.createElement('div');
    topBar.className = 'gs-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'gs-back-btn';
    backBtn.textContent = '← Tilbage til sansningsoversigten';
    backBtn.onclick = () => navigateFn('grammatik_sansning');
    topBar.appendChild(backBtn);

    const fladeBadge = document.createElement('span');
    fladeBadge.className = 'gs-hero-badge';
    fladeBadge.textContent = 'Hovedflade 5 • Kraftoverførsel og tekstflow';
    topBar.appendChild(fladeBadge);
    // topBar fjernet (erstattet af global nav)
    viewContainer.appendChild(renderSansningGlobalNav('flade5', navigateFn));

    const hero = document.createElement('div');
    hero.className = 'gs-hero';
    hero.innerHTML = `
        <div class="gs-hero-badge">Hovedflade 5 • Hængslerne i sætningen</div>
        <h1>Kraftoverførsel & tekstflow (hængslerne)</h1>
        <p>
            Scenernes mekaniske led: hvordan forbinder små danske bindeord årsag, fremdrift, modstand og skilleveje
            i bytrafikken og på vandreturen — og hvornår skubber <strong>V2-fjederen</strong> verbet frem på plads 2?
        </p>
    `;
    viewContainer.appendChild(hero);

    const tactileLab = renderSansningTactileLab('flade5', navigateFn, 0, false);
    const redThreadCard = renderRedThreadStoryStrip('flade5', navigateFn, (idx) => tactileLab.setStationIdx(idx));
    // redThreadCard fjernet (undgår dobbelt-information)
    viewContainer.appendChild(tactileLab);

    const compass = document.createElement('div');
    compass.className = 'gs-compass-wrapper';
    compass.innerHTML = `
        <div class="gs-realm-card tilstand">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">Uhindret strøm & bakspejl</span>
            </div>
            <h2 class="gs-realm-title">Fremdrift, årsag og åbne stier</h2>
            <p class="gs-realm-desc">
                Grøn bølge gennem byen og klare stier i skoven: sideordning holder farten lige ud, mens blikket i bakspejlet forklarer hvorfor.
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>Jævn fremadskriden:</span>
                    <span class="gs-realm-ex-word">Solen skinnede, OG vi gik en tur</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Trykbølge fremad:</span>
                    <span class="gs-realm-ex-word">Bussen punkterede. DERFOR kom jeg sent</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Blikket i bakspejlet:</span>
                    <span class="gs-realm-ex-word">... FORDI bussen punkterede i myldretiden</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Hængebro & skillevej:</span>
                    <span class="gs-realm-ex-word">HVIS det bliver koldt... • Tog ELLER cykel</span>
                </div>
            </div>
        </div>

        <div class="gs-realm-card forvandling">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">Modstand & syntaktisk fjeder</span>
            </div>
            <h2 class="gs-realm-title">Muren, knækket og sætningsdansen</h2>
            <p class="gs-realm-desc">
                Når regnmuren rejser sig, skarpe sving skifter retning, eller tid, sted og ledsætninger spænder V2-fjederen og sender verbet frem på plads 2.
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>Muren & gennembrud:</span>
                    <span class="gs-realm-ex-word">SELVOM det regner, går vi ALLIGEVEL</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Skarpt knæk i krydset:</span>
                    <span class="gs-realm-ex-word">Lyset var grønt, MEN vejen var spærret</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Normal lige vej (SVO):</span>
                    <span class="gs-realm-ex-word">Jeg CYKLER i parken i morgen</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>V2-fjederens dans (XVS):</span>
                    <span class="gs-realm-ex-word">I morgen CYKLER jeg i parken</span>
                </div>
            </div>
        </div>
    `;
    // compass fjernet (undgår dobbelt-information)

    const simulatorBox = document.createElement('div');
    simulatorBox.className = 'gs-simulator-box';
    let simMode = 'fremdrift';

    const simItems = [
        {
            topic: '5.1 Uhindret fremdrift',
            fremdrift: 'Solen skinnede over søen, og vi gik en lang tur.',
            modstand: 'Bussen punkterede på broen, for dækket var helt fladt.',
            inversion: 'Bussen punkterede. Derfor gik vi resten af vejen.'
        },
        {
            topic: '5.2 Kraft mod modstand',
            fremdrift: 'Stien var tør, så vi cyklede hurtigt gennem skoven.',
            modstand: 'Selvom det øsregnede over byen, cyklede hun alligevel.',
            inversion: 'Trods den tunge modvind nåede han alligevel toget.'
        },
        {
            topic: '5.3 Valg & skilleveje',
            fremdrift: 'Vi tager enten stien langs stranden eller vejen gennem skoven.',
            modstand: 'Hvis vejen er spærret, må bussen dreje til venstre.',
            inversion: 'Hvis det bliver koldt i aften, tænder vi brændeovnen.'
        },
        {
            topic: '5.4 Sætningsdansen (V2)',
            fremdrift: 'Vi vandrer gennem bøgeskoven klokken ni i morgen.',
            modstand: 'Og klokken ni vandrer vi stadig uden pause.',
            inversion: 'Klokken ni i morgen vandrer vi gennem bøgeskoven.'
        }
    ];

    function renderSim() {
        const modeColors = { fremdrift: '#38bdf8', modstand: '#fde047', inversion: '#fb923c' };
        const color = modeColors[simMode];
        simulatorBox.innerHTML = `
            <div class="gs-sim-header">
                <div class="gs-sim-title">Sanse-simulatoren: Skift mellem jævn strøm, modstand og V2-dans</div>
                <div class="gs-sim-toggle-group">
                    <button class="gs-sim-toggle-btn fremdrift ${simMode === 'fremdrift' ? 'active' : ''}" data-mode="fremdrift">
                        Fremdrift (lige ud)
                    </button>
                    <button class="gs-sim-toggle-btn modstand ${simMode === 'modstand' ? 'active' : ''}" data-mode="modstand">
                        Modstand & knæk
                    </button>
                    <button class="gs-sim-toggle-btn inversion ${simMode === 'inversion' ? 'active' : ''}" data-mode="inversion">
                        V2-fjeder (inversion)
                    </button>
                </div>
            </div>
            <div class="gs-sim-cards-grid">
                ${simItems.map(it => `
                    <div class="gs-sim-chip" style="border-left: 3px solid ${color};">
                        <span class="gs-sim-chip-topic">${it.topic}</span>
                        <span class="gs-sim-chip-sentence">${it[simMode]}</span>
                    </div>
                `).join('')}
            </div>
        `;
        simulatorBox.querySelectorAll('.gs-sim-toggle-btn').forEach(btn => {
            btn.onclick = () => {
                simMode = btn.getAttribute('data-mode');
                renderSim();
            };
        });
    }
    renderSim();
    // simulatorBox fjernet (erstattet af Det Blå Taktile Laboratorium)

    const stations = [
        {
            num: '5.1',
            id: 'sansning_fremdrift',
            tag: 'Bytrafik & vandresti',
            accent: '#38bdf8',
            title: 'Uhindret fremdrift: og, derfor / så & fordi / for',
            sub: 'Jævn fremadskriden gennem grønt lys (og), trykbølgen fremad (derfor / så) og blikket i bakspejlet mod årsagen bag os (fordi / for).',
            leftImg: `${baseUrl}assets/sansning_fremdrift_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_fremdrift_hoejre.jpg`,
            leftLabel: 'Fremad (og, derfor, så)',
            rightLabel: 'Bakspejl (fordi, for)',
            leftEx: 'Bussen punkterede. Derfor gik vi.',
            rightEx: 'Vi gik, fordi bussen punkterede.',
            vrimmelBadge: 'Kæde- og ordstillings-lab'
        },
        {
            num: '5.2',
            id: 'sansning_modstand',
            tag: 'Muren vs. gennembruddet',
            accent: '#f59e0b',
            title: 'Kraft mod modstand: selvom, alligevel & men',
            sub: 'Muren af regn og vejarbejde der burde stoppe turen (selvom), cyklisten eller vandreren der bryder igennem (alligevel) og det skarpe knæk i vejen (men).',
            leftImg: `${baseUrl}assets/sansning_modstand_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_modstand_hoejre.jpg`,
            leftLabel: 'Muren (selvom)',
            rightLabel: 'Gennembrud & knæk (alligevel, men)',
            leftEx: 'Selvom regnen vælter ned...',
            rightEx: '... går vi alligevel en tur!',
            vrimmelBadge: 'Modstands-værksted & quiz'
        },
        {
            num: '5.3',
            id: 'sansning_skilleveje',
            tag: 'Hængebro & vejgaffel',
            accent: '#a78bfa',
            title: 'Valg & skilleveje: hvis & eller',
            sub: 'Den hypotetiske hængebro over kløften der udløser et resultat (hvis ..., så ...) og skillevejen i skoven eller bykrydset (eller).',
            leftImg: `${baseUrl}assets/sansning_skilleveje_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_skilleveje_hoejre.svg`,
            leftLabel: 'Hængebroen (hvis)',
            rightLabel: 'Skillevejen (eller)',
            leftEx: 'Hvis vi krydser broen, når vi hytten.',
            rightEx: 'Kyststi eller skovvej — sporvogn eller cykel?',
            vrimmelBadge: 'Hængebro- & skillevejs-lab'
        },
        {
            num: '5.4',
            id: 'sansning_inversion',
            tag: 'V2-fjederen i dans',
            accent: '#f472b6',
            title: 'Sætningsdansen: inversion & felt 1–3',
            sub: 'Fjederen der skubber verbet ind på plads 2 hver gang tid, sted eller ledsætning træder frem på plads 1 — så subjektet må danse bagved.',
            leftImg: `${baseUrl}assets/sansning_inversion_venstre.svg`,
            rightImg: `${baseUrl}assets/sansning_inversion_hoejre.svg`,
            leftLabel: 'Lige frem (subjekt + verbum)',
            rightLabel: 'V2-dans (forfelt + verbum + subjekt)',
            leftEx: 'Jeg cykler i parken i dag.',
            rightEx: 'I dag cykler jeg i parken.',
            vrimmelBadge: 'V2-fjeder-dansegulv & quiz'
        }
    ];

    const showcaseBox = document.createElement('div');
    showcaseBox.className = 'gs-showcase-box';
    let currentShowcaseIdx = 0;

    function renderShowcaseStage() {
        const s = stations[currentShowcaseIdx];
        showcaseBox.innerHTML = `
            <div class="gs-showcase-header">
                <div class="gs-showcase-title-wrap">
                    <h2>Split-stage vrimle-galleri</h2>
                    <p>Sammenlign alle 4 mekaniske hængsler i bytrafik og naturvandring</p>
                </div>
                <div class="gs-showcase-nav">
                    ${stations.map((st, idx) => `
                        <button class="gs-showcase-tab ${idx === currentShowcaseIdx ? 'active' : ''}" data-idx="${idx}">
                            ${st.num}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="gs-showcase-stage">
                <div class="gs-showcase-pane left">
                    <div class="gs-showcase-pane-head">${s.leftLabel}</div>
                    <div class="gs-showcase-img-wrap" data-nav="${s.id}">
                        <img class="gs-showcase-img" src="${s.leftImg}" alt="${s.leftLabel}">
                    </div>
                    <div class="gs-showcase-caption">
                        <span>${s.leftEx}</span>
                    </div>
                </div>
                <div class="gs-showcase-pane right">
                    <div class="gs-showcase-pane-head">${s.rightLabel}</div>
                    <div class="gs-showcase-img-wrap" data-nav="${s.id}">
                        <img class="gs-showcase-img" src="${s.rightImg}" alt="${s.rightLabel}">
                    </div>
                    <div class="gs-showcase-caption">
                        <span>${s.rightEx}</span>
                    </div>
                </div>
            </div>
            <div class="gs-showcase-footer">
                <div class="gs-showcase-hint">
                    <strong>${s.title}:</strong> ${s.sub}
                </div>
                <button class="gs-showcase-cta-btn" data-nav="${s.id}">
                    Åbn station ${s.num} →
                </button>
            </div>
        `;

        showcaseBox.querySelectorAll('.gs-showcase-tab').forEach(btn => {
            btn.onclick = () => {
                currentShowcaseIdx = parseInt(btn.getAttribute('data-idx'), 10);
                renderShowcaseStage();
            };
        });

        showcaseBox.querySelectorAll('[data-nav]').forEach(el => {
            el.onclick = () => navigateFn(el.getAttribute('data-nav'), { from: 'flade4' });
        });
    }

    renderShowcaseStage();
    // Vrimlebillede-showcase fjernet — taktile diagrammer er i hovedrollen

    const divider = document.createElement('div');
    divider.className = 'gs-section-divider';
    divider.innerHTML = `
        <h2>Alle 4 stationer i Hovedflade 5 (Tankens Vej & Flow)</h2>
        <p>Vælg en station og mærk kraftoverførslen i sætningerne</p>
    `;
    viewContainer.appendChild(divider);

    const grid = document.createElement('div');
    grid.className = 'gs-stations-grid';

    stations.forEach(s => {
        const card = document.createElement('div');
        card.className = 'gs-station-card';
        card.style.setProperty('--station-accent', s.accent);
        card.innerHTML = `
            <div>
                <div class="gs-card-split-preview">
                    <div class="gs-card-preview-half left">
                        <img class="gs-card-preview-img" src="${s.leftImg}" alt="${s.leftLabel}" loading="lazy">
                        <span class="gs-card-preview-label">${s.leftLabel}</span>
                    </div>
                    <div class="gs-card-preview-divider">
                        <span class="gs-card-preview-badge">vs.</span>
                    </div>
                    <div class="gs-card-preview-half right">
                        <img class="gs-card-preview-img" src="${s.rightImg}" alt="${s.rightLabel}" loading="lazy">
                        <span class="gs-card-preview-label">${s.rightLabel}</span>
                    </div>
                </div>
                <div class="gs-station-head">
                    <span class="gs-station-number">Station ${s.num}</span>
                    <span class="gs-station-tag">${s.tag}</span>
                </div>
                <h3 class="gs-station-title">${s.title}</h3>
                <p class="gs-station-sub">${s.sub}</p>
            </div>
            <div>
                <div class="gs-station-contrast-box">
                    <div class="gs-contrast-row">
                        <span class="gs-contrast-label tilstand">Venstre:</span>
                        <span class="gs-contrast-sent">${s.leftEx}</span>
                    </div>
                    <div class="gs-contrast-row">
                        <span class="gs-contrast-label forvandling">Højre:</span>
                        <span class="gs-contrast-sent">${s.rightEx}</span>
                    </div>
                </div>
                <div class="gs-station-footer">
                    <span class="gs-station-badge-vrimmel">${s.vrimmelBadge}</span>
                    <button class="gs-station-enter-btn">Udforsk station →</button>
                </div>
            </div>
        `;
        card.onclick = () => navigateFn(s.id, { from: 'flade4' });
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    // footerBridge fjernet (undgår dobbelt navigation)
    container.appendChild(viewContainer);
}
