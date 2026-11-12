import { baseUrl } from '../utils/config.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * SansningFlade2RumTidView - Hovedflade 2: Rum, tid og relationer (nærhed vs. afstand)
 *
 * Metafor: Hvor står observatørens kamera? I hånden og hjertet (nærhed) eller i kikkerten på afstand?
 * Rummer:
 * 1. De to perspektiv-riger (Nærhed / gribekroppen vs. Afstand / kikkerten)
 * 2. Sanse-simulatoren (1-klik skift mellem nærhed og afstand)
 * 3. Interaktiv vrimle-showcase for alle 6 stationer
 * 4. De 6 stationer (2.1 - 2.6) med dual-thumbnails og rene danske overskrifter
 */
export function renderSansningFlade2RumTidView(container, navigateFn, extraData = {}) {
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
        .gs-realm-ex-word { font-weight: 800; }
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
        }

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

    const topBar = document.createElement('div');
    topBar.className = 'gs-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'gs-back-btn';
    backBtn.textContent = '← Tilbage til sansningsoversigten';
    backBtn.onclick = () => navigateFn('grammatik_sansning');
    topBar.appendChild(backBtn);

    const fladeBadge = document.createElement('span');
    fladeBadge.className = 'gs-hero-badge';
    fladeBadge.textContent = 'Hovedflade 2 • Kamera og perspektiv';
    topBar.appendChild(fladeBadge);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'gs-hero';
    hero.innerHTML = `
        <div class="gs-hero-badge">Hovedflade 2 • Rum, tid og relationer</div>
        <h1>Rum, tid og relationer – (nærhed vs. afstand)</h1>
        <p>
            Hvor står dit kamera på dansk? Står det helt tæt ved <strong>gribekroppen, hulen og hjertet</strong> (nærhed her og nu),
            eller kigger du ud gennem <strong>kikkerten på afstand</strong> med strakt pegefinger, datid og høflighedsbuffer?
        </p>
    `;
    viewContainer.appendChild(hero);

    const compass = document.createElement('div');
    compass.className = 'gs-compass-wrapper';
    compass.innerHTML = `
        <div class="gs-realm-card tilstand">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">Kameraet i hånden</span>
            </div>
            <h2 class="gs-realm-title">Nærhed (gribekroppen og her-og-nu)</h2>
            <p class="gs-realm-desc">
                Når tingen rører ved din hånd, eller rummet omslutter dig: tryghed i hulen, nutidens levende scene, egen sfære og direkte tale.
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>Omsluttet i hulen:</span>
                    <span class="gs-realm-ex-word">Nøglerne ligger I tasken</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Direkte i hånden:</span>
                    <span class="gs-realm-ex-word">Jeg læser DENNE bog</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Levende nu-scene:</span>
                    <span class="gs-realm-ex-word">Jeg HAR SPIST frokost</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Ro i zonen:</span>
                    <span class="gs-realm-ex-word">Vi bliver HJEMME</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Kroppens egen sfære:</span>
                    <span class="gs-realm-ex-word">Han kysser SIN kone</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Direkte nærhed:</span>
                    <span class="gs-realm-ex-word">Hvad VIL du have?</span>
                </div>
            </div>
        </div>

        <div class="gs-realm-card forvandling">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">Kikkerten på afstand</span>
            </div>
            <h2 class="gs-realm-title">Afstand (pegefingeren og det fjerne)</h2>
            <p class="gs-realm-desc">
                Når blikket peger ud over en flade eller et skel: eksponering på overfladen, en lukket datids-kikkert, andres sfære og høflighedsbuffer.
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>Eksponeret flade:</span>
                    <span class="gs-realm-ex-word">Nøglerne ligger PÅ bordet</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Udstrakt pegefinger:</span>
                    <span class="gs-realm-ex-word">Se på DEN bil derovre</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Lukket kikkert:</span>
                    <span class="gs-realm-ex-word">Jeg SPISTE i går</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Retning over tærsklen:</span>
                    <span class="gs-realm-ex-word">Vi tager HJEM</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Udenforstående ejer:</span>
                    <span class="gs-realm-ex-word">Han kysser HANS kone</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>Høflighedsbuffer:</span>
                    <span class="gs-realm-ex-word">VAR der andet?</span>
                </div>
            </div>
        </div>
    `;
    viewContainer.appendChild(compass);

    const simulator = document.createElement('div');
    simulator.className = 'gs-simulator-box';
    const simState = { activeMode: 'tilstand' };

    const simData = [
        {
            topic: '2.1 Præpositioner: i vs. på',
            tilstand: 'Nøglerne ligger trygt i tasken.',
            forvandling: 'Nøglerne ligger åbent på bordet.'
        },
        {
            topic: '2.2 Pronominal deiksis: denne vs. den',
            tilstand: 'Jeg holder denne bog her i hånden.',
            forvandling: 'Kan du se den røde bil derovre?'
        },
        {
            topic: '2.3 Tempus og tidens rum',
            tilstand: 'Jeg har spist, og bordet er stadig varmt.',
            forvandling: 'Jeg spiste klokken seks i går.'
        },
        {
            topic: '2.4 Rummet og tærsklen',
            tilstand: 'Børnene leger trygt inde i stuen.',
            forvandling: 'Børnene løber ind gennem døren.'
        },
        {
            topic: '2.5 Kroppens sfære: sin vs. hans',
            tilstand: 'Manden vasker sin egen bil i indkørslen.',
            forvandling: 'Manden vasker hans bil for naboen.'
        },
        {
            topic: '2.6 Social deiksis: nærhed vs. buffer',
            tilstand: 'Kom indenfor, hvad vil du have?',
            forvandling: 'Undskyld, havde du et øjeblik – var der andet?'
        }
    ];

    function renderSimulator() {
        const isNaer = simState.activeMode === 'tilstand';
        simulator.innerHTML = `
            <div class="gs-sim-header">
                <div class="gs-sim-title">Sanse-simulator – skift kameraets afstand</div>
                <div class="gs-sim-toggle-group">
                    <button class="gs-sim-toggle-btn tilstand ${isNaer ? 'active' : ''}" id="sim-btn-tilstand">
                        Nærhed (i hånden / nu)
                    </button>
                    <button class="gs-sim-toggle-btn forvandling ${!isNaer ? 'active' : ''}" id="sim-btn-forvandling">
                        Afstand (kikkerten / fjernt)
                    </button>
                </div>
            </div>
            <div class="gs-sim-cards-grid">
                ${simData.map(item => `
                    <div class="gs-sim-chip" style="border-left: 3px solid ${isNaer ? '#38bdf8' : '#fb923c'};">
                        <span class="gs-sim-chip-topic">${item.topic}</span>
                        <div class="gs-sim-chip-sentence">
                            <span>${isNaer ? item.tilstand : item.forvandling}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        simulator.querySelector('#sim-btn-tilstand').onclick = () => {
            simState.activeMode = 'tilstand';
            renderSimulator();
        };
        simulator.querySelector('#sim-btn-forvandling').onclick = () => {
            simState.activeMode = 'forvandling';
            renderSimulator();
        };
    }

    renderSimulator();
    viewContainer.appendChild(simulator);

    const stations = [
        {
            num: '2.1',
            id: 'sansning_i_paa',
            tag: 'Hule vs. flade',
            accent: '#38bdf8',
            title: 'Præpositioner: i vs. på',
            sub: 'Omsluttet i hulens tryghed eller eksponeret på den åbne overflade – også mellem Danmark og øerne.',
            leftImg: `${baseUrl}assets/sansning_i_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_paa_hoejre.svg`,
            leftLabel: 'I (omsluttet)',
            rightLabel: 'På (flade)',
            leftEx: 'I tasken / i Danmark',
            rightEx: 'På bordet / på Fyn',
            vrimmelBadge: 'Dobbelt vrimlebillede og ø-regel'
        },
        {
            num: '2.2',
            id: 'sansning_denne_den',
            tag: 'Hånd vs. pegefinger',
            accent: '#60a5fa',
            title: 'Pronominal deiksis: denne vs. den',
            sub: 'Når tingen hviler i din håndflade (denne/dette/disse) over for pegen ud over afstand (den/det/de).',
            leftImg: `${baseUrl}assets/sansning_denne_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_den_hoejre.jpg`,
            leftLabel: 'Denne (i hånden)',
            rightLabel: 'Den (derovre)',
            leftEx: 'Jeg læser denne bog',
            rightEx: 'Se på den røde bil',
            vrimmelBadge: '5 par på vrimlebillede'
        },
        {
            num: '2.3',
            id: 'sansning_verber_tider',
            tag: 'Scenen vs. kikkerten',
            accent: '#f59e0b',
            title: 'Tempus og tidens rum',
            sub: 'Nutid og førnutid holder scenen levende foran dig, mens datid og førdatid lukker fortiden i kikkerten.',
            leftImg: `${baseUrl}assets/sansning_verber_tider_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_verber_tider_hoejre.jpg`,
            leftLabel: 'Nu og førnutid',
            rightLabel: 'Datid i kikkerten',
            leftEx: 'Jeg har spist (nu)',
            rightEx: 'Jeg spiste / havde spist',
            vrimmelBadge: 'Interaktiv tids-scene'
        },
        {
            num: '2.4',
            id: 'sansning_rummet_taersklen',
            tag: 'Zone vs. tærskel',
            accent: '#34d399',
            title: 'Rummet og tærsklen (-e vs. kort)',
            sub: 'Roen inden for en kendt zone (hjemme, inde, oppe) over for bevægelsen der krydser tærsklen (hjem, ind, op).',
            leftImg: `${baseUrl}assets/sansning_rummet_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_rummet_hoejre.jpg`,
            leftLabel: 'Ro (-e form)',
            rightLabel: 'Retning (kort)',
            leftEx: 'Vi er hjemme / inde',
            rightEx: 'Vi går hjem / ind',
            vrimmelBadge: 'Dobbelt rum-vrimlebillede'
        },
        {
            num: '2.5',
            id: 'sansning_sin_hans',
            tag: 'Kroppens sfære',
            accent: '#a78bfa',
            title: 'Sin vs. hans og fordelingsental',
            sub: 'Subjektets egen kropslige og nære zone (sin/sit/sine + hånden op) over for en udenforstående person (hans/hendes).',
            leftImg: `${baseUrl}assets/sansning_sin_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_hans_hoejre.jpg`,
            leftLabel: 'Egen sfære: sin',
            rightLabel: 'Anden ejer: hans',
            leftEx: 'Han kysser sin kone',
            rightEx: 'Han kysser hans kone',
            vrimmelBadge: '5 scener incl. fordelingsental'
        },
        {
            num: '2.6',
            id: 'sansning_social_deiksis',
            tag: 'Social distance',
            accent: '#f472b6',
            title: 'Social deiksis: nærhed vs. buffer',
            sub: 'Hvordan dansk bruger nutid til nære relationer ("Hvad vil du have?") og datidsbuffer til høflig afstand ("Var der andet?").',
            leftImg: `${baseUrl}assets/sansning_social_naerhed_venstre.jpg`,
            rightImg: `${baseUrl}assets/sansning_social_afstand_hoejre.jpg`,
            leftLabel: 'Direkte nærhed',
            rightLabel: 'Høflighedsbuffer',
            leftEx: 'Hvad vil du have?',
            rightEx: 'Var der andet?',
            vrimmelBadge: 'Café- og diskscener'
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
                    <p>Sammenlign alle 6 perspektiver mellem nærhed i hånden og afstand i kikkerten</p>
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
            el.onclick = () => navigateFn(el.getAttribute('data-nav'), { from: 'flade2' });
        });
    }

    renderShowcaseStage();
    viewContainer.appendChild(showcaseBox);

    const divider = document.createElement('div');
    divider.className = 'gs-section-divider';
    divider.innerHTML = `
        <h2>Alle 6 stationer i hovedflade 2</h2>
        <p>Vælg en station og mærk forskellen mellem nærhed og afstand</p>
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
                        <span class="gs-contrast-label tilstand">Nærhed:</span>
                        <span class="gs-contrast-sent">${s.leftEx}</span>
                    </div>
                    <div class="gs-contrast-row">
                        <span class="gs-contrast-label forvandling">Afstand:</span>
                        <span class="gs-contrast-sent">${s.rightEx}</span>
                    </div>
                </div>
                <div class="gs-station-footer">
                    <span class="gs-station-badge-vrimmel">${s.vrimmelBadge}</span>
                    <button class="gs-station-enter-btn">Udforsk station →</button>
                </div>
            </div>
        `;
        card.onclick = () => navigateFn(s.id, { from: 'flade2' });
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
