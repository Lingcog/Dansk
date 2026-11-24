import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';
import {
    renderSansningGlobalNav,
    renderRedThreadStoryStrip,
    renderSansningTactileLab,
    renderSansningFooterBridge,
    speakSansningDanish
} from '../components/SansningIntegration.js';

/**
 * SansningFlade1SubstansView - Hovedflade 1: Substans, Form & Bestemthed (Model B)
 *
 * Samler hele substantivets kognitive grammatik i 4 sammenhængende stationer:
 *  1.1 Masse vs. Form (utælleligt stof vs. tællelig beholder/enhed: kaffe/mel vs. en kop/to boller)
 *  1.2 Stof vs. Individ (når samme ord skifter mellem materiale og individ + køn & kvantificering: træ/et træ, fisk/en fisk, meget/mange)
 *  1.3 Ubestemt vs. Bestemt Form (mentalt spotlight: en kop / stole vs. koppen / stolene)
 *  1.4 Baghængt vs. Foranstillet Bestemthed (adjektiv-kilen: huset / koppen vs. det røde hus / den varme kop)
 */
export function renderSansningFlade1SubstansView(container, navigateFn, extraData = {}) {
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
            max-width: 860px;
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
            font-weight: 900;
            margin: 0 0 0.4rem;
            color: #ffffff;
        }
        .gs-realm-desc {
            color: #FFC9CD;
            font-size: 0.92rem;
            line-height: 1.5;
            margin: 0 0 1rem;
        }
        .gs-realm-examples {
            display: flex;
            flex-direction: column;
            gap: 0.48rem;
        }
        .gs-realm-ex-item {
            background: #4A040B;
            padding: 0.55rem 0.85rem;
            border-radius: 10px;
            font-size: 0.88rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #851825;
            color: #FFC9CD;
            gap: 0.5rem;
        }
        .gs-realm-ex-word {
            font-weight: 800;
            color: #ffffff;
        }

        /* 4-Trins Substans-Rejse Simulator */
        .gs-simulator-box {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            padding: 1.35rem 1.5rem;
            margin-bottom: 2.2rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }
        .gs-sim-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.85rem;
            margin-bottom: 1.1rem;
        }
        .gs-sim-title {
            font-size: 1.15rem;
            font-weight: 900;
            color: #ffffff;
        }
        .gs-sim-toggle-group {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .gs-sim-toggle-btn {
            background: #4A040B;
            border: 1.5px solid #851825;
            color: #FFC9CD;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.84rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .gs-sim-toggle-btn.tilstand.active {
            background: #0284c7;
            border-color: #7dd3fc;
            color: #ffffff;
        }
        .gs-sim-toggle-btn.forvandling.active {
            background: #ea580c;
            border-color: #fdba74;
            color: #ffffff;
        }
        .gs-sim-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
            gap: 0.85rem;
        }
        .gs-sim-chip {
            background: #4A040B;
            border: 1px solid #851825;
            border-radius: 12px;
            padding: 0.85rem 1rem;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .gs-sim-chip:hover {
            transform: translateY(-2px);
            border-color: #7dd3fc;
        }
        .gs-sim-chip-topic {
            display: block;
            font-size: 0.75rem;
            font-weight: 800;
            color: #94a3b8;
            margin-bottom: 0.3rem;
            text-transform: uppercase;
        }
        .gs-sim-chip-sentence {
            font-size: 0.96rem;
            font-weight: 800;
            color: #ffffff;
        }

        /* Showcase Vrimlebilleder */
        .gs-card-thumb-split, .gs-station-thumb, .gs-card-split-preview { display: none !important; }
        .gs-showcase-box {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 22px;
            padding: 1.4rem 1.5rem;
            margin-bottom: 2.2rem;
            box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
        }
        .gs-showcase-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.15rem;
        }
        .gs-showcase-title-wrap h2 {
            margin: 0 0 0.25rem;
            font-size: 1.35rem;
            font-weight: 900;
            color: #ffffff;
        }
        .gs-showcase-title-wrap p {
            margin: 0;
            font-size: 0.88rem;
            color: #FFC9CD;
        }
        .gs-showcase-nav {
            display: flex;
            gap: 0.4rem;
            flex-wrap: wrap;
        }
        .gs-showcase-tab {
            background: #4A040B;
            border: 1px solid #851825;
            color: #FFC9CD;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: 800;
            cursor: pointer;
        }
        .gs-showcase-tab.active {
            background: #0284c7;
            border-color: #7dd3fc;
            color: #ffffff;
        }
        .gs-showcase-stage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
            .gs-showcase-stage { grid-template-columns: 1fr; }
        }
        .gs-showcase-pane {
            background: #4A040B;
            border-radius: 16px;
            overflow: hidden;
            border: 1.5px solid #851825;
        }
        .gs-showcase-pane.left { border-color: rgba(56, 189, 248, 0.5); }
        .gs-showcase-pane.right { border-color: rgba(251, 146, 60, 0.5); }
        .gs-showcase-pane-head {
            display: flex;
            justify-content: space-between;
            padding: 0.6rem 0.9rem;
            font-size: 0.78rem;
            font-weight: 800;
            background: rgba(15, 23, 42, 0.65);
            color: #ffffff;
        }
        .gs-showcase-img-wrap {
            height: 220px;
            overflow: hidden;
            cursor: pointer;
        }
        .gs-showcase-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.3s ease;
        }
        .gs-showcase-img-wrap:hover .gs-showcase-img {
            transform: scale(1.04);
        }
        .gs-showcase-caption {
            padding: 0.65rem 0.9rem;
            font-size: 0.86rem;
            font-weight: 700;
            color: #f8fafc;
        }
        .gs-showcase-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        .gs-showcase-hint {
            font-size: 0.85rem;
            color: #FFC9CD;
        }
        .gs-showcase-cta-btn {
            background: #FF4D5E;
            color: #ffffff;
            border: none;
            padding: 0.6rem 1.15rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.86rem;
            cursor: pointer;
        }

        /* Stations Grid */
        .gs-section-divider {
            margin-bottom: 1rem;
        }
        .gs-section-divider h2 {
            margin: 0 0 0.25rem;
            font-size: 1.4rem;
            font-weight: 900;
            color: #ffffff;
        }
        .gs-section-divider p {
            margin: 0;
            color: #FFC9CD;
            font-size: 0.9rem;
        }
        .gs-stations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
            gap: 1.15rem;
        }
        .gs-station-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 18px;
            padding: 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.22s ease;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.38);
        }
        .gs-station-card:hover {
            transform: translateY(-4px);
            border-color: var(--station-accent, #38bdf8);
        }
        .gs-card-split-preview {
            display: grid;
            grid-template-columns: 1fr 1fr;
            height: 115px;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            margin-bottom: 0.85rem;
            border: 1px solid #851825;
        }
        .gs-card-preview-half {
            position: relative;
            height: 100%;
            overflow: hidden;
        }
        .gs-card-preview-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .gs-card-preview-label {
            position: absolute;
            bottom: 6px;
            left: 6px;
            background: rgba(15, 23, 42, 0.85);
            color: #fff;
            font-size: 0.68rem;
            font-weight: 800;
            padding: 0.15rem 0.45rem;
            border-radius: 5px;
        }
        .gs-card-preview-divider {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
        }
        .gs-card-preview-badge {
            background: #4A040B;
            border: 1.5px solid #FFC9CD;
            color: #ffffff;
            font-size: 0.66rem;
            font-weight: 900;
            padding: 0.2rem 0.4rem;
            border-radius: 999px;
        }
        .gs-station-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .gs-station-number {
            font-size: 0.84rem;
            font-weight: 800;
            color: #FFC9CD;
            background: #4A040B;
            padding: 0.22rem 0.58rem;
            border-radius: 8px;
            border: 1px solid #851825;
        }
        .gs-station-tag {
            font-size: 0.74rem;
            font-weight: 800;
            color: var(--station-accent, #38bdf8);
        }
        .gs-station-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 0.35rem;
        }
        .gs-station-sub {
            color: #FFC9CD;
            font-size: 0.85rem;
            line-height: 1.45;
            margin: 0 0 0.9rem;
        }
        .gs-station-contrast-box {
            background: #4A040B;
            border-radius: 12px;
            padding: 0.7rem 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.42rem;
            border: 1px solid #851825;
            margin-bottom: 0.95rem;
        }
        .gs-contrast-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.84rem;
            gap: 0.5rem;
        }
        .gs-contrast-label.tilstand { color: #38bdf8; font-weight: 700; font-size: 0.76rem; }
        .gs-contrast-label.forvandling { color: #fb923c; font-weight: 700; font-size: 0.76rem; }
        .gs-contrast-sent { font-weight: 700; color: #ffffff; text-align: right; }
        .gs-station-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
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
            cursor: pointer;
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
    fladeBadge.innerHTML = `Hovedflade 1 • Substans, form & bestemthed`;
    topBar.appendChild(fladeBadge);

    // topBar fjernet (erstattet af global nav)

    // 1b. Global Hovedflade- & Stations-navigation
    viewContainer.appendChild(renderSansningGlobalNav('flade1', navigateFn));

    // 2. Hero Header
    const hero = document.createElement('div');
    hero.className = 'gs-hero';
    hero.innerHTML = `
        <div class="gs-hero-badge">Hovedflade 1 • Substans, Form & Bestemthed</div>
        <h1>Substans, form og bestemthed – (tingene og deres grænser)</h1>
        <p>
            Før vi sætter verden i bevægelse, må vores sanser gribe om selve <strong>substansen</strong>:
            Møder vi et <strong>uafgrænset stof</strong> (<em>vand, kaffe, træ, fisk</em>) eller en <strong>tællelig enhed med kontur</strong> (<em>en kop, et træ, en fisk</em>)?
            Peger vi på en <strong>ny, ubestemt enhed</strong> (<em>en kop</em>), låser vi spotlightet i <strong>bestemt form bagpå</strong> (<em>koppen</em>),
            eller kiler et adjektiv sig ind og skubber bestemtheds-ankeret <strong>frem foran</strong> (<em>den varme kop</em>)?
        </p>
    `;
    viewContainer.appendChild(hero);

    // 2b. Den Røde Tråd + Taktilt Grounding-Laboratorium
    const tactileLab = renderSansningTactileLab('flade1', navigateFn, 0, false);
    const redThreadCard = renderRedThreadStoryStrip('flade1', navigateFn, (idx) => tactileLab.setStationIdx(idx));
    // redThreadCard fjernet (undgår dobbelt-information)
    viewContainer.appendChild(tactileLab);

    // 3. Compass Cards (1:1 afstemt med Flade 1's 4 stationer: 1.1 – 1.4)
    const compass = document.createElement('div');
    compass.className = 'gs-compass-wrapper';
    compass.innerHTML = `
        <div class="gs-realm-card tilstand">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">🔵 Åben Substans & Søgekegle</span>
            </div>
            <h2 class="gs-realm-title">Uafgrænset stof, ubestemt mængde & baghængt anker</h2>
            <p class="gs-realm-desc">
                Når stoffet flyder frit uden fast beholder (1.1), når vi zoomer tæt ind på materialet uden kontur (1.2), når vi griber en ny ubestemt enhed ud af mængden (1.3), eller når bestemtheds-ankeret hviler bag på det nøgne substantiv (1.4).
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>1.1 Utællelig masse (0 artikel):</span>
                    <span class="gs-realm-ex-word">meget KAFFE, VAND og MEL</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>1.2 Stof-linsen (materiale):</span>
                    <span class="gs-realm-ex-word">lavet af TRÆ • spiser FISK</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>1.3 Ubestemt søgekegle (ny):</span>
                    <span class="gs-realm-ex-word">EN kop • ET hus • STOLE</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>1.4 Baghængt bestemthed:</span>
                    <span class="gs-realm-ex-word">hus-ET • kop-PEN • stol-ENE</span>
                </div>
            </div>
        </div>

        <div class="gs-realm-card forvandling">
            <div class="gs-realm-head">
                <span class="gs-realm-badge">🟠 Afgrænset Enhed, Spotlight & Kile</span>
            </div>
            <h2 class="gs-realm-title">Fast kontur, tælleligt individ, spotlight & adjektiv-kile</h2>
            <p class="gs-realm-desc">
                Når massen støbes i en tællelig beholder (1.1), når vi ser hele det afgrænsede individ (1.2), når vi låser projektøren på den kendte ting i rummet (1.3), eller når et adjektiv kiler sig ind og skubber bestemtheds-ankeret frem foran (1.4).
            </p>
            <div class="gs-realm-examples">
                <div class="gs-realm-ex-item">
                    <span>1.1 Tællelig form & beholder:</span>
                    <span class="gs-realm-ex-word">EN kop kaffe • MANGE boller</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>1.2 Individ-linsen (enhed):</span>
                    <span class="gs-realm-ex-word">ET træ i skoven • EN fisk</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>1.3 Bestemt spotlight (kendt):</span>
                    <span class="gs-realm-ex-word">Kaffen er i KOPPEN</span>
                </div>
                <div class="gs-realm-ex-item">
                    <span>1.4 Foranstillet adjektiv-kile:</span>
                    <span class="gs-realm-ex-word">DET røde hus • DEN varme kop</span>
                </div>
            </div>
        </div>
    `;
    // compass fjernet (undgår dobbelt-information)

    // 4. Substans-Simulatoren (1:1 med Station 1.1 – 1.4)
    const simulator = document.createElement('div');
    simulator.className = 'gs-simulator-box';
    const simState = { activeMode: 'tilstand' };

    const simData = [
        {
            topic: '1.1 Utællelig masse vs. tællelig form',
            tilstand: 'Der er meget kaffe, vand og mel i køkkenet.',
            forvandling: 'Hun hælder en kop kaffe op og bager fire boller.'
        },
        {
            topic: '1.2 Stof-linsen vs. individ-linsen (træ / et træ)',
            tilstand: 'Bordet er lavet af træ, og vi spiser fisk og drikker øl.',
            forvandling: 'I haven står et træ, og Mads fanger en fisk og åbner en øl.'
        },
        {
            topic: '1.3 Ubestemt søgekegle vs. bestemt spotlight',
            tilstand: 'Mads åbner skabet og leder efter en kop og to stole.',
            forvandling: 'Nu står koppen på bordet, og vi sidder på stolene.'
        },
        {
            topic: '1.4 Baghængt anker (-en/-et) vs. foranstillet adjektiv-kile',
            tilstand: 'Huset ligger ved skoven, og koppen står på bordet.',
            forvandling: 'Det røde hus ligger ved skoven, og den varme kop står på bordet.'
        }
    ];

    function renderSimulatorContent() {
        simulator.innerHTML = `
            <div class="gs-sim-header">
                <span class="gs-sim-title">Substans-simulatoren: Skift linse i 1 klik (klik på en boks for lyd 🔊)</span>
                <div class="gs-sim-toggle-group">
                    <button class="gs-sim-toggle-btn tilstand ${simState.activeMode === 'tilstand' ? 'active' : ''}" id="btn-sim-tilstand">
                        🔵 Stof, ubestemt & baghængt
                    </button>
                    <button class="gs-sim-toggle-btn forvandling ${simState.activeMode === 'forvandling' ? 'active' : ''}" id="btn-sim-forvandling">
                        🟠 Enhed, bestemt & adjektiv-kile
                    </button>
                </div>
            </div>
            <div class="gs-sim-cards-grid">
                ${simData.map(item => {
                    const text = simState.activeMode === 'tilstand' ? item.tilstand : item.forvandling;
                    const accentColor = simState.activeMode === 'tilstand' ? '#38bdf8' : '#fb923c';
                    return `
                        <div class="gs-sim-chip" data-speak="${text}" style="border-left: 3px solid ${accentColor}">
                            <span class="gs-sim-chip-topic">${item.topic}</span>
                            <div class="gs-sim-chip-sentence">
                                <span>🔊 ${text}</span>
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
        simulator.querySelectorAll('[data-speak]').forEach(chip => {
            chip.onclick = () => speakSansningDanish(chip.getAttribute('data-speak'));
        });
    }

    renderSimulatorContent();
    // simulator fjernet (erstattet af Det Blå Taktile Laboratorium)

    // 5. De 4 Stationer i Hovedflade 1
    const stations = [
        {
            id: 'form_masse',
            route: 'sansning_form_masse',
            num: '1.1',
            tag: 'Masse og form',
            title: 'Utællelig masse vs. tællelig form',
            sub: 'Den uafgrænsede masse (vand, kaffe, mel, meget) over for genstanden med klar kontur og beholder (en kop, to æbler, mange boller).',
            accent: '#10b981',
            tilstandLabel: 'Utællelig masse',
            tilstandSent: 'Der er koldt vand og meget kaffe.',
            forvandlingLabel: 'Tællelig form',
            forvandlingSent: 'Hun tager en kop kaffe og to boller.',
            vrimmel: 'Bageriet og køkkenbordet',
            leftImg: 'assets/sansning_masse_venstre.jpg',
            rightImg: 'assets/sansning_form_hoejre.jpg',
            leftCaption: 'Uafgrænset flydende masse: vand, kaffe og mel',
            rightCaption: 'Formstøbte genstande: en flaske, to kopper, tre boller'
        },
        {
            id: 'stof_enhed',
            route: 'sansning_stof_enhed',
            num: '1.2',
            tag: 'Stof vs. individ',
            title: 'Når samme ord skifter mellem stof og enhed',
            sub: 'Zoom tæt på materialet (træ, glas, fisk, øl, chokolade, alt vandet) eller træk linsen ud til individet (et træ, et glas, en fisk, en øl, alle kopperne).',
            accent: '#38bdf8',
            tilstandLabel: 'Stof-linsen (0)',
            tilstandSent: 'Bordet er af træ • Vi får fisk.',
            forvandlingLabel: 'Individ-linsen (en/et)',
            forvandlingSent: 'Der står et træ • Han fanger en fisk.',
            vrimmel: 'Snedkerværkstedet og frokostbordet',
            leftImg: 'assets/sansning_masse_venstre.jpg',
            rightImg: 'assets/sansning_form_hoejre.jpg',
            leftCaption: 'Makro-fokus på stoffet: træ, glas, fisk, øl (uden artikel)',
            rightCaption: 'Helheds-fokus på individet: et træ, et glas, en fisk, en øl'
        },
        {
            id: 'bestemthed',
            route: 'sansning_bestemthed',
            num: '1.3',
            tag: 'Ubestemt vs. bestemt',
            title: 'Mentalt spotlight: En kop vs. koppen',
            sub: 'Hvornår griber vi en ny, ukendt enhed ud af mængden (en kop, et bord, stole), og hvornår låser vi fokus på den kendte ting i vores fælles synsfelt (koppen, bordet, stolene)?',
            accent: '#f59e0b',
            tilstandLabel: 'Ubestemt (ny)',
            tilstandSent: 'Jeg leder efter en kop og to stole.',
            forvandlingLabel: 'Bestemt (kendt)',
            forvandlingSent: 'Kaffen er i koppen ved stolene.',
            vrimmel: 'Køkkenskabet og spisebordet',
            leftImg: 'assets/sansning_vaere_venstre.jpg',
            rightImg: 'assets/sansning_blive_hoejre.jpg',
            leftCaption: 'Bred søgekegle i mængden: en kop, et hus, stole',
            rightCaption: 'Låst spotlight i fælles synsfelt: koppen, huset, stolene'
        },
        {
            id: 'adjektiv_bestemthed',
            route: 'sansning_adjektiv_bestemthed',
            num: '1.4',
            tag: 'Adjektiv-kilen',
            title: 'Baghængt vs. foranstillet bestemthed',
            sub: 'På dansk sidder bestemtheds-ankeret bagpå (hus-et, kop-pen), men så snart et adjektiv kiler sig ind foran, skubbes ankeret fysisk frem som den/det/de (det røde hus, den varme kop).',
            accent: '#ec4899',
            tilstandLabel: 'Baghængt (-en/-et)',
            tilstandSent: 'Huset og koppen står klar.',
            forvandlingLabel: 'Adjektiv-kile (den/det/de)',
            forvandlingSent: 'Det røde hus og den varme kop.',
            vrimmel: 'Facaden og kaffebordet',
            leftImg: 'assets/sansning_har_er_venstre.jpg',
            rightImg: 'assets/sansning_har_er_hoejre.jpg',
            leftCaption: 'Uden adjektiv: Ankeret sidder bagpå (hus-et, kop-pen)',
            rightCaption: 'Med adjektiv-kile: Ankeret skubbes frem (det røde hus)'
        },
        {
            id: 'aktivitet_til_ting',
            route: 'sansning_aktivitet_til_ting',
            num: '1.5',
            tag: 'Fra aktivitet til ting',
            title: 'Fra aktivitet til ting (at træne ➔ træning)',
            sub: 'Når en handling i bevægelse (at træne, at læse, at bevæge sig) pakkes ind med -ing / -else, bliver den til en fast ting, man kan pege på og sætte forrest i sætningen.',
            accent: '#38bdf8',
            tilstandLabel: 'Aktivitet (at + verbum)',
            tilstandSent: 'Det er sundt at træne hver dag.',
            forvandlingLabel: 'Fast ting (substantiv)',
            forvandlingSent: 'Træning er sundt — træningen starter kl. 17.',
            vrimmel: 'Taktilt støbelaboratorium (uden vrimlebillede)',
            noVrimmel: true
        }
    ];

    // 6. Featured Split-Stage Showcase (kun stationer med vrimlebillede)
    const showcaseStations = stations.filter(st => !st.noVrimmel);
    const showcaseBox = document.createElement('div');
    showcaseBox.className = 'gs-showcase-box';
    let activeShowcaseIdx = 0;

    function renderShowcaseStage() {
        const curSt = showcaseStations[activeShowcaseIdx];
        showcaseBox.innerHTML = `
            <div class="gs-showcase-header">
                <div class="gs-showcase-title-wrap">
                    <h2>Vrimlebilleder: Oplev substans, kontur og bestemthed</h2>
                    <p>Klik på de 4 stationer nedenfor for at udforske forskellen på stof, enhed, spotlight og adjektiv-kile.</p>
                </div>
                <div class="gs-showcase-nav">
                    ${showcaseStations.map((st, idx) => `
                        <button class="gs-showcase-tab ${idx === activeShowcaseIdx ? 'active' : ''}" data-idx="${idx}">
                            ${st.num} ${st.tag}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="gs-showcase-stage">
                <div class="gs-showcase-pane left">
                    <div class="gs-showcase-pane-head">
                        <span>🔵 Stof / Ubestemt / Baghængt</span>
                        <span>${curSt.tilstandLabel}</span>
                    </div>
                    <div class="gs-showcase-img-wrap" title="Klik for at åbne ${curSt.title}">
                        <img src="${curSt.leftImg}" alt="${curSt.leftCaption}" class="gs-showcase-img" />
                    </div>
                    <div class="gs-showcase-caption">
                        <span>${curSt.leftCaption}</span>
                    </div>
                </div>

                <div class="gs-showcase-pane right">
                    <div class="gs-showcase-pane-head">
                        <span>🟠 Enhed / Bestemt / Adjektiv-kile</span>
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
                    Scene: <strong>${curSt.vrimmel}</strong>
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
            wrap.onclick = () => navigateFn(curSt.route);
        });
        const ctaBtn = showcaseBox.querySelector('#btn-open-active-station');
        if (ctaBtn) {
            ctaBtn.onclick = () => navigateFn(curSt.route);
        }
    }

    renderShowcaseStage();
    // Vrimlebillede-showcase fjernet — taktile diagrammer er i hovedrollen

    // 7. Stations Grid
    const sectionDivider = document.createElement('div');
    sectionDivider.className = 'gs-section-divider';
    sectionDivider.innerHTML = `
        <div>
            <h2>Alle 4 sansestationer i Hovedflade 1 (Substans, Form & Bestemthed)</h2>
            <p>Hver station har sit eget taktile Grounding-laboratorium, kognitivt kontrast-studie og interaktive værksted.</p>
        </div>
    `;
    viewContainer.appendChild(sectionDivider);

    const grid = document.createElement('div');
    grid.className = 'gs-stations-grid';

    stations.forEach(st => {
        const card = document.createElement('div');
        card.className = 'gs-station-card';
        card.style.setProperty('--station-accent', st.accent);

        card.innerHTML = `
            <div>
                <div class="gs-card-split-preview" title="Klik for at åbne ${st.title}">
                    <div class="gs-card-preview-half left">
                        <img src="${st.leftImg}" alt="${st.tilstandLabel}" class="gs-card-preview-img" />
                        <span class="gs-card-preview-label">${st.tilstandLabel}</span>
                    </div>
                    <div class="gs-card-preview-divider">
                        <span class="gs-card-preview-badge">VS</span>
                    </div>
                    <div class="gs-card-preview-half right">
                        <img src="${st.rightImg}" alt="${st.forvandlingLabel}" class="gs-card-preview-img" />
                        <span class="gs-card-preview-label">${st.forvandlingLabel}</span>
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

        card.onclick = () => navigateFn(st.route);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    // footerBridge fjernet (undgår dobbelt navigation)

    container.appendChild(viewContainer);
}
