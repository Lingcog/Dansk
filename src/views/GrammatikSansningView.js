import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * GrammatikSansningView - "Grammatik og min sansning af verdenen"
 * En fænomenologisk og taoistisk overflade, der samler dansk grammatik under
 * den fundamentale sanselige dikotomi:
 *  🔵 TILSTAND (Stilstand / Ro / Yin / Væren)
 *  🟠 FORVANDLING (Bevægelse / Kraft / Yang / Tilblivelse)
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
        .gs-contrast-label.yin { color: #38bdf8; }
        .gs-contrast-label.yang { color: #fb923c; }
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
        <div class="gs-hero-badge">☯️ Taoistisk & Fænomenologisk Grammatik</div>
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
            <h2 class="gs-realm-title">Tilstand & Stilstand (Yin / Væren)</h2>
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
            <h2 class="gs-realm-title">Forvandling & Kraft (Yang / Tilblivelse)</h2>
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

    // 4. Interactive Live Simulator: Flick between Yin and Yang
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
                        🔵 Tilstand (Ro / Yin)
                    </button>
                    <button class="gs-sim-toggle-btn forvandling ${simState.activeMode === 'forvandling' ? 'active' : ''}" id="btn-sim-forvandling">
                        🟠 Forvandling (Kraft / Yang)
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

    // 5. Stations Data
    const stations = [
        {
            id: 'vaere_blive',
            route: 'sansning_vaere_blive',
            num: '1',
            tag: 'Grundbegreberne',
            title: 'Væren & Tilblivelse',
            sub: 'At være vs. At blive i ren form. Vandet i ro vs. vandet der fryser.',
            accent: '#38bdf8',
            yinLabel: 'Tilstand',
            yinSent: 'Kaffen er kold.',
            yangLabel: 'Forvandling',
            yangSent: 'Kaffen bliver kold.',
            vrimmel: 'Hverdagsstuen & Terrassen'
        },
        {
            id: 'verbernes_tider',
            route: 'sansning_verber_tider',
            num: '2',
            tag: 'Tidens Kikkert',
            title: 'Tidens Sansning (Verbernes tider)',
            sub: 'Forskellen på "hadde været" (uforandret tilstand) og "var blevet" (omslaget der fandt sted).',
            accent: '#f59e0b',
            yinLabel: 'Havde været',
            yinSent: 'Vejret havde været koldt længe.',
            yangLabel: 'Var blevet',
            yangSent: 'Vejret var blevet koldt, da bilen ankom.',
            vrimmel: 'Vinterhuset & Indkørslen'
        },
        {
            id: 'har_er',
            route: 'sansning_har_er',
            num: '3',
            tag: 'Førnutid & Resultat',
            title: 'Aktivitet vs. Tilstandsskift',
            sub: 'Har (motoren der arbejder) vs. Er (den nye tilstand og flyttede grænse).',
            accent: '#10b981',
            yinLabel: 'Tilstand / Er',
            yinSent: 'Huset er malet / Hun er cyklet på arbejde.',
            yangLabel: 'Aktivitet / Har',
            yangSent: 'Malerne har malet / Hun har cyklet i skoven.',
            vrimmel: 'Det Travle Kvarter & Gaden'
        },
        {
            id: 'kraft_hvile',
            route: 'sansning_kraft_hvile',
            num: '4',
            tag: 'Kausative Verber',
            title: 'Kroppens Kraft vs. Tingens Hvile',
            sub: 'Lægge/ligge, sætte/sidde, stille/stå. Hånden der flytter vs. tingen der hviler.',
            accent: '#ec4899',
            yinLabel: 'Tingens hvile',
            yinSent: 'Bogen ligger / Vasen står på hylden.',
            yangLabel: 'Håndens kraft',
            yangSent: 'Jeg lægger bogen / stiller vasen.',
            vrimmel: 'Stuen & Arbejdsværelset'
        },
        {
            id: 'rummet_taersklen',
            route: 'sansning_rummet_taersklen',
            num: '5',
            tag: 'Sted vs. Retning',
            title: 'Rummet & Tærsklen',
            sub: 'Hjemme vs. Hjem, Inde vs. Ind, Oppe vs. Op. Ro i rummet vs. krydsning af dørtrinet.',
            accent: '#8b5cf6',
            yinLabel: 'Ro i rummet (-e)',
            yinSent: 'Vi hygger os hjemme / inde i varmen.',
            yangLabel: 'Krydser tærsklen',
            yangSent: 'Vi tager hjem / går ind i stuen.',
            vrimmel: 'Huset, Døren & Haven'
        },
        {
            id: 'sindets_sansning',
            route: 'sansning_sindet',
            num: '6',
            tag: 'Krop vs. Tanke',
            title: 'Sindets Sansning',
            sub: 'Synes (mærket med kroppen og smagsløgene) vs. Tror (uvis formodning i hovedet).',
            accent: '#06b6d4',
            yinLabel: 'Kroppen mærker',
            yinSent: 'Jeg synes, kaffen smager bittert.',
            yangLabel: 'Hjernen gætter',
            yangSent: 'Jeg tror, kaffen er økologisk.',
            vrimmel: 'Middagsbordet & Samtalen'
        }
    ];

    // Filter Bar
    const filterBar = document.createElement('div');
    filterBar.className = 'gs-filter-bar';
    filterBar.innerHTML = `
        <div class="gs-filter-title">
            <span>🗺️ De 6 Sanse-Stationer</span>
        </div>
        <div class="gs-filter-pills">
            <button class="gs-filter-pill active" data-filter="all">Vis alle (6)</button>
            <button class="gs-filter-pill" data-filter="tilstand">🔵 Kun Tilstand (Yin)</button>
            <button class="gs-filter-pill" data-filter="forvandling">🟠 Kun Forvandling (Yang)</button>
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
                    <div class="gs-station-head">
                        <div class="gs-station-number">${st.num}</div>
                        <div class="gs-station-tag">${st.tag}</div>
                    </div>
                    <h3 class="gs-station-title">${st.title}</h3>
                    <p class="gs-station-sub">${st.sub}</p>
                    
                    <div class="gs-station-contrast-box">
                        <div class="gs-contrast-row" style="display: ${filter === 'forvandling' ? 'none' : 'flex'}">
                            <span class="gs-contrast-label yin">🔵 ${st.yinLabel}:</span>
                            <span class="gs-contrast-sent">${st.yinSent}</span>
                        </div>
                        <div class="gs-contrast-row" style="display: ${filter === 'tilstand' ? 'none' : 'flex'}">
                            <span class="gs-contrast-label yang">🟠 ${st.yangLabel}:</span>
                            <span class="gs-contrast-sent">${st.yangSent}</span>
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
