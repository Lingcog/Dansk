import { getTranslation, getLang } from '../utils/i18n.js';
import { adjektiverWordTranslations } from '../utils/top100_adjektiver_translations.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';
import { shuffleArray } from '../utils/shuffle.js';
import { isLocalhost, getActiveAdjNuance, applyAdjNuance, ADJ_PALETTES } from '../components/DesignSystemToggle.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';

/**
 * AdjektiverFysikView - Felt 1: Fysiske egenskaber, form & sanser
 * Testversion for de 20 mest almindelige fysiske adjektiver på dansk.
 * Dækker 10 kontrast-par (20 ord) i 6 didaktiske tabs:
 * 1. Kontrast-studiet (Split-screen visuelt billede med 20 hotspots)
 * 2. Find modpolen (Antonym-duellen - simple sætninger med kendte substantiver)
 * 3. Synonymer i hverdagen (Nuancer)
 * 4. Barometret (Gradbøjning & skala)
 * 5. Kongruens-byggeren (Fælde-træning: -t og -e + direkte link til bøjningsguide)
 * 6. Kontekst & Historie (Simple hverdagssituationer med ord fra De 100 substantiver)
 */
export function renderAdjektiverFysikView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    // Aktivér mørk orange nuance (standard: Mørk Rav)
    applyAdjNuance(getActiveAdjNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjektiver-fysik-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_adjektiver');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Localhost Nuance Vælger Toolbar
    if (isLocalhost()) {
        const activeNuance = getActiveAdjNuance();
        const testBar = document.createElement('div');
        testBar.className = 'adj-localhost-toggle-bar';
        testBar.innerHTML = `
            <div class="adj-toggle-label">
                <span class="adj-pulse-dot"></span>
                <strong>Localhost Nuance-vælger:</strong>
                <span class="adj-toggle-hint">Vælg mellem 4 mørke orange nuancer live:</span>
            </div>
            <div class="adj-toggle-buttons">
                ${Object.values(ADJ_PALETTES).map(p => `
                    <button class="adj-nuance-btn ${p.id === activeNuance ? 'active' : ''}" 
                            data-nuance="${p.id}" 
                            title="${p.desc}">
                        ${p.name}
                    </button>
                `).join('')}
            </div>
        `;

        testBar.querySelectorAll('.adj-nuance-btn').forEach(btn => {
            btn.onclick = () => {
                const nuance = btn.dataset.nuance;
                applyAdjNuance(nuance);
                testBar.querySelectorAll('.adj-nuance-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.nuance === nuance);
                });
            };
        });
        viewContainer.appendChild(testBar);
    }

    // TTS Audio Helper (isoleret udtale)
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --adj-bg: #4A040B;
            --adj-bg-glow: #6B0F1A;
            --adj-surface: #341808;
            --adj-surface-hover: #48230D;
            --adj-surface-input: #1C0B03;
            --adj-border: #6E3311;
            --adj-border-focus: #fb923c;
            --adj-primary: #ea580c;
            --adj-primary-hover: #f97316;
            --adj-text: #FFFFFF;
            --adj-text-muted: #fed7aa;
            --adj-text-subtle: #fdba74;
        }

        body[data-adj-nuance] {
            background-color: var(--adj-bg) !important;
            background-image: radial-gradient(circle at top right, var(--adj-bg-glow), var(--adj-bg)) !important;
        }

        .adjektiver-fysik-view {
            max-width: 1240px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: var(--adj-text, #FFFFFF);
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        /* Localhost Nuance Toggle Bar */
        .adj-localhost-toggle-bar {
            background: var(--adj-surface-input, #1C0B03);
            border: 1.5px solid var(--adj-border, #6E3311);
            border-radius: 16px;
            padding: 0.85rem 1.2rem;
            margin-bottom: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .adj-toggle-label {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 0.92rem;
            color: #FFFFFF;
        }
        .adj-pulse-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--adj-primary, #ea580c);
            box-shadow: 0 0 10px var(--adj-primary, #ea580c);
            display: inline-block;
            animation: adjPulse 1.8s infinite ease-in-out;
        }
        @keyframes adjPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
        }
        .adj-toggle-hint {
            color: var(--adj-text-muted, #fed7aa);
            font-size: 0.85rem;
        }
        .adj-toggle-buttons {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .adj-nuance-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1.5px solid var(--adj-border, #6E3311);
            color: var(--adj-text-muted, #fed7aa);
            padding: 0.45rem 0.9rem;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 0.84rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .adj-nuance-btn:hover {
            color: #FFFFFF;
            background: var(--adj-surface-hover, #48230D);
            border-color: var(--adj-primary, #ea580c);
            transform: translateY(-1px);
        }
        .adj-nuance-btn.active {
            background: var(--adj-primary, #ea580c);
            color: #FFFFFF;
            border-color: var(--adj-border-focus, #fb923c);
            box-shadow: 0 0 12px rgba(234, 88, 12, 0.5);
            font-weight: 800;
        }

        /* Top Bar & Back Button */
        .adjektiver-fysik-view .top-bar {
            margin-bottom: 1.2rem;
        }
        .adjektiver-fysik-view .back-btn {
            background: var(--adj-surface-input, #1C0B03);
            border: 1.5px solid var(--adj-border, #6E3311);
            color: #FFFFFF;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .adjektiver-fysik-view .back-btn:hover {
            background: var(--adj-surface-hover, #48230D);
            border-color: var(--adj-primary, #ea580c);
        }

        /* Hero Header: Ren hvid tekst uden forstyrrende gradient-fill */
        .adj-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .adj-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: #FFFFFF;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }
        .adj-hero-header p {
            color: var(--adj-text-muted, #fed7aa);
            font-size: 1.05rem;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.5;
        }

        /* Tabs Navigation */
        .adj-tabs-nav {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 2rem;
            background: var(--adj-surface-input, #1C0B03);
            padding: 0.5rem;
            border-radius: 16px;
            border: 1.5px solid var(--adj-border, #6E3311);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }
        .adj-tab-btn {
            background: transparent;
            color: var(--adj-text-muted, #fed7aa);
            border: none;
            padding: 0.65rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .adj-tab-btn:hover {
            color: #FFFFFF;
            background: var(--adj-surface-hover, #48230D);
        }
        .adj-tab-btn.active {
            background: var(--adj-primary, #ea580c);
            color: #FFFFFF;
            font-weight: 800;
            box-shadow: 0 4px 14px rgba(234, 88, 12, 0.45);
        }

        /* Panels */
        .adj-panel {
            display: none;
        }
        .adj-panel.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Tab 1: Split-Screen Contrast Canvas */
        .contrast-canvas-card {
            background: var(--adj-surface, #341808);
            border-radius: 20px;
            border: 1.5px solid var(--adj-border, #6E3311);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
            margin-bottom: 2rem;
        }
        .contrast-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.9rem 1.4rem;
            background: var(--adj-surface-input, #1C0B03);
            border-bottom: 1.5px solid var(--adj-border, #6E3311);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .contrast-instruction {
            color: var(--adj-text-muted, #fed7aa);
            font-size: 0.95rem;
            font-weight: 600;
        }
        .pure-toggle-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--adj-border, #6E3311);
            color: var(--adj-text-muted, #fed7aa);
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-toggle-btn:hover {
            background: var(--adj-surface-hover, #48230D);
            color: #FFFFFF;
        }
        .pure-toggle-btn.active {
            background: var(--adj-primary, #ea580c);
            border-color: var(--adj-border-focus, #fb923c);
            color: #FFFFFF;
        }

        .contrast-split-stage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
            background: var(--adj-surface-input, #1C0B03);
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
            background: var(--adj-surface-input, #1C0B03);
        }
        .stage-half-header {
            position: absolute;
            top: 12px;
            left: 12px;
            z-index: 10;
            background: rgba(20, 8, 3, 0.88);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 700;
            border: 1px solid var(--adj-border, #6E3311);
            pointer-events: none;
            color: var(--adj-text-muted, #fed7aa);
        }
        .stage-half-header.warm { color: #f59e0b; border-color: rgba(245, 158, 11, 0.4); }
        .stage-half-header.cool { color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); }

        .stage-half img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }

        /* Hotspots */
        .adj-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: var(--adj-primary, #ea580c);
            border: 2px solid white;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            z-index: 5;
        }
        .adj-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.22);
            background: var(--adj-primary-hover, #f97316);
            box-shadow: 0 0 18px rgba(234, 88, 12, 0.8);
        }
        .adj-hotspot.active {
            background: #22c55e !important;
            border-color: white !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.9);
            z-index: 8;
        }
        .adj-hotspot.partner-active {
            background: #38bdf8 !important;
            border-color: white !important;
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.8);
            animation: pulseBlue 1.6s infinite ease-in-out;
            z-index: 7;
        }
        @keyframes pulseBlue {
            0%, 100% { box-shadow: 0 0 10px rgba(56, 189, 248, 0.6); }
            50% { box-shadow: 0 0 24px rgba(56, 189, 248, 1); }
        }
        .pure-mode .adj-hotspot {
            display: none !important;
        }

        /* Detail Card */
        .adj-detail-card {
            background: var(--adj-surface, #341808);
            border-radius: 20px;
            border: 1.5px solid var(--adj-border, #6E3311);
            padding: 1.8rem;
            margin-top: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        .adj-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            border-bottom: 1px solid var(--adj-border, #6E3311);
            padding-bottom: 1rem;
        }
        .adj-title-group {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }
        .adj-main-word {
            font-size: 2rem;
            font-weight: 800;
            color: #FFFFFF;
        }
        .adj-tts-btn {
            background: var(--adj-primary, #ea580c);
            border: none;
            color: white;
            padding: 0.5rem 0.9rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s ease;
        }
        .adj-tts-btn:hover {
            background: var(--adj-primary-hover, #f97316);
            transform: scale(1.05);
        }
        .adj-modpol-pill {
            background: rgba(234, 88, 12, 0.15);
            border: 1px solid var(--adj-primary, #ea580c);
            color: var(--adj-border-focus, #fb923c);
            padding: 0.5rem 1.1rem;
            border-radius: 20px;
            font-size: 1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .adj-modpol-pill:hover {
            background: rgba(234, 88, 12, 0.25);
            transform: translateY(-2px);
        }

        .adj-congruence-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
        }
        .adj-congruence-box {
            background: var(--adj-surface-input, #1C0B03);
            border: 1px solid var(--adj-border, #6E3311);
            padding: 1rem;
            border-radius: 14px;
        }
        .adj-congruence-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            font-weight: 800;
            color: var(--adj-text-muted, #fed7aa);
            letter-spacing: 0.5px;
            margin-bottom: 0.4rem;
        }
        .adj-congruence-val {
            font-size: 1.15rem;
            font-weight: 700;
            color: #FFFFFF;
        }
        .adj-congruence-val mark {
            background: transparent;
            color: var(--adj-border-focus, #fb923c);
            font-weight: 800;
        }
        .adj-example-box {
            background: var(--adj-surface-input, #1C0B03);
            border-left: 4px solid var(--adj-primary, #ea580c);
            border-top: 1px solid var(--adj-border, #6E3311);
            border-right: 1px solid var(--adj-border, #6E3311);
            border-bottom: 1px solid var(--adj-border, #6E3311);
            padding: 1.2rem;
            border-radius: 10px;
            font-size: 1.15rem;
            color: #FFFFFF;
            line-height: 1.5;
        }

        /* Generic Interactive Task Layouts */
        .task-card {
            max-width: 850px;
            margin: 0 auto;
            background: var(--adj-surface, #341808);
            border: 1.5px solid var(--adj-border, #6E3311);
            border-radius: 24px;
            padding: 2.2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
            color: #FFFFFF;
        }
        .task-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid var(--adj-border, #6E3311);
            padding-bottom: 1rem;
        }
        .task-counter {
            font-size: 0.95rem;
            font-weight: 800;
            color: var(--adj-border-focus, #fb923c);
        }
        .task-score {
            font-size: 0.95rem;
            color: var(--adj-text-muted, #fed7aa);
            font-weight: 700;
        }
        .task-prompt-box {
            background: var(--adj-surface-input, #1C0B03);
            border: 1.5px solid var(--adj-border, #6E3311);
            padding: 1.4rem;
            border-radius: 16px;
            margin-bottom: 1.6rem;
            font-size: 1.3rem;
            line-height: 1.5;
            color: #FFFFFF;
            text-align: center;
        }
        .task-prompt-box strong {
            color: var(--adj-border-focus, #fb923c);
            font-size: 1.4rem;
        }
        .task-subprompt {
            font-size: 1.1rem;
            color: var(--adj-text-muted, #fed7aa);
            margin-top: 0.6rem;
        }
        .task-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .task-opt-btn {
            background: var(--adj-surface-input, #1C0B03);
            border: 2px solid var(--adj-border, #6E3311);
            color: white;
            padding: 1.1rem;
            border-radius: 14px;
            font-size: 1.15rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .task-opt-btn:hover:not(:disabled) {
            border-color: var(--adj-primary, #ea580c);
            transform: translateY(-2px);
            background: var(--adj-surface-hover, #48230D);
        }
        .task-opt-btn.correct {
            background: rgba(34, 197, 94, 0.25) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
        }
        .task-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            color: #f87171 !important;
        }
        .task-feedback-box {
            background: var(--adj-surface-input, #1C0B03);
            border: 1.5px solid var(--adj-border, #6E3311);
            padding: 1.3rem;
            border-radius: 14px;
            margin-top: 1.2rem;
            font-size: 1.05rem;
            line-height: 1.5;
        }
        .task-feedback-box.correct {
            border-color: #22c55e;
            color: #86efac;
        }
        .task-feedback-box.wrong {
            border-color: #ef4444;
            color: #fca5a5;
        }
        .task-next-btn {
            background: var(--adj-primary, #ea580c);
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 1.5rem;
            display: inline-block;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4);
        }
        .task-next-btn:hover {
            background: var(--adj-primary-hover, #f97316);
            box-shadow: 0 6px 18px rgba(234, 88, 12, 0.55);
            transform: translateY(-2px);
        }
        .task-secondary-btn {
            background: var(--adj-surface-hover, #48230D);
            border: 1.5px solid var(--adj-border, #6E3311);
            color: #FFFFFF;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 1.5rem;
            display: inline-block;
            transition: all 0.2s ease;
        }
        .task-secondary-btn:hover {
            background: var(--adj-border, #6E3311);
            transform: translateY(-2px);
        }

        /* Grammar Guide Link Banner in Tab 5 */
        .adj-grammar-link-box {
            background: var(--adj-surface-input, #1C0B03);
            border: 1.5px solid var(--adj-border, #6E3311);
            border-radius: 16px;
            padding: 1.2rem 1.5rem;
            margin-bottom: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .adj-go-grammar-btn {
            background: var(--adj-primary, #ea580c);
            color: white;
            border: none;
            padding: 0.65rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .adj-go-grammar-btn:hover {
            background: var(--adj-primary-hover, #f97316);
            transform: translateY(-2px);
        }
        .feedback-grammar-link {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            color: var(--adj-border-focus, #fb923c);
            font-weight: 700;
            margin-top: 0.6rem;
            text-decoration: underline;
            cursor: pointer;
        }
        .feedback-grammar-link:hover {
            color: #fed7aa;
        }

        /* Tab 4: Barometret Specific Styles */
        .barometer-container {
            margin: 1.5rem 0;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        .barometer-track {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: var(--adj-surface-input, #1C0B03);
            border: 2px dashed var(--adj-border, #6E3311);
            padding: 1.2rem;
            border-radius: 16px;
            min-height: 85px;
            gap: 0.8rem;
            overflow-x: auto;
            box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .barometer-slot {
            flex: 1;
            min-width: 125px;
            height: 64px;
            border: 2px solid var(--adj-border, #6E3311);
            background: rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: var(--adj-text-muted, #fed7aa);
            font-size: 0.95rem;
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }
        .barometer-slot:hover {
            border-color: var(--adj-primary, #ea580c);
            background: var(--adj-surface-hover, #48230D);
        }
        .barometer-slot.filled {
            border-color: var(--adj-border-focus, #fb923c);
            background: linear-gradient(135deg, var(--adj-primary, #ea580c) 0%, #c2410c 100%);
            color: #FFFFFF;
            font-weight: 800;
            font-size: 1.05rem;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }
        .barometer-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            justify-content: center;
            margin: 1.4rem 0;
        }
        .barometer-chip {
            background: var(--adj-surface-input, #1C0B03);
            border: 2px solid var(--adj-primary, #ea580c);
            color: #FFFFFF;
            padding: 0.75rem 1.4rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .barometer-chip:hover:not(.used) {
            transform: scale(1.06) translateY(-2px);
            background: var(--adj-primary, #ea580c);
            color: #FFFFFF;
            box-shadow: 0 6px 18px rgba(234, 88, 12, 0.45);
        }
        .barometer-chip.used {
            opacity: 0.25;
            pointer-events: none;
            border-color: var(--adj-border, #6E3311);
            transform: none;
        }
        .scale-indicators {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            font-weight: 800;
            color: var(--adj-text-muted, #fed7aa);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 0 0.5rem;
        }
        #check-scale-btn {
            background: var(--adj-primary, #ea580c) !important;
            border: none !important;
            color: #FFFFFF !important;
            font-weight: 800 !important;
            box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4) !important;
        }
        #check-scale-btn:hover:not(:disabled) {
            background: var(--adj-primary-hover, #f97316) !important;
            box-shadow: 0 6px 18px rgba(234, 88, 12, 0.55) !important;
            transform: translateY(-2px);
        }
        #check-scale-btn:disabled {
            opacity: 0.4 !important;
            cursor: not-allowed !important;
            box-shadow: none !important;
            transform: none !important;
        }

        @media (max-width: 680px) {
            .view-container.adjektiver-fysik-view {
                padding: 0.5rem 0.65rem 3rem;
            }
            .adj-hero-header {
                margin-bottom: 1.2rem;
            }
            .adj-hero-header h1 {
                font-size: 1.35rem;
            }
            .adj-hero-header p {
                font-size: 0.88rem;
                line-height: 1.45;
            }
            .adj-tabs-nav {
                overflow-x: auto;
                padding: 0.25rem;
                gap: 0.25rem;
                margin-bottom: 1.2rem;
            }
            .adj-tab-btn {
                padding: 0.45rem 0.75rem;
                font-size: 0.82rem;
                white-space: nowrap;
            }
            .task-card {
                padding: 1.1rem 0.85rem;
                border-radius: 16px;
                margin: 0 auto;
                width: 100%;
                box-sizing: border-box;
            }
            .task-top-bar {
                margin-bottom: 1rem;
                padding-bottom: 0.75rem;
            }
            .task-prompt-box {
                padding: 0.85rem 1rem;
                margin-bottom: 1rem;
                border-radius: 12px;
            }
            .task-prompt-box div:first-child {
                font-size: 1.1rem !important;
            }
            .task-subprompt {
                font-size: 0.88rem !important;
            }
            .barometer-container {
                margin: 0.85rem 0;
                gap: 0.75rem;
            }
            .barometer-track {
                flex-direction: column;
                padding: 0.65rem;
                gap: 0.45rem;
                min-height: auto;
                overflow-x: visible;
                width: 100%;
                box-sizing: border-box;
            }
            .barometer-slot {
                min-width: 0;
                width: 100%;
                height: 48px;
                font-size: 0.95rem;
                border-radius: 10px;
                box-sizing: border-box;
            }
            .barometer-slot.filled {
                font-size: 1rem;
            }
            .scale-indicators {
                display: flex;
                justify-content: space-between;
                font-size: 0.82rem;
                padding: 0 0.3rem;
                margin-bottom: 0.4rem;
                font-weight: 700;
            }
            .barometer-pool {
                gap: 0.45rem;
                margin: 0.9rem 0;
            }
            .barometer-chip {
                padding: 0.55rem 0.95rem;
                font-size: 0.92rem;
                border-radius: 14px;
            }
            .task-secondary-btn, .task-next-btn {
                padding: 0.65rem 1.2rem;
                font-size: 0.92rem;
                border-radius: 10px;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'adj-hero-header';
    heroHeader.innerHTML = `
        <h1>${getTranslation('top100_adj_f1_title')}</h1>
        <p>${getTranslation('top100_adj_f1_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // 6 Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'adj-tabs-nav';
    const tabs = [
        { id: 'tab_kontrast', label: getTranslation('adj_tab_1'), icon: renderDsIcon('eye', '', { size: 18 }) },
        { id: 'tab_antonym', label: getTranslation('adj_tab_2'), icon: renderDsIcon('compare', '', { size: 18 }) },
        { id: 'tab_synonym', label: getTranslation('adj_tab_3'), icon: renderDsIcon('refresh', '', { size: 18 }) },
        { id: 'tab_barometer', label: getTranslation('adj_tab_4'), icon: renderDsIcon('thermometer', '', { size: 18 }) },
        { id: 'tab_kongruens', label: getTranslation('adj_tab_5'), icon: renderDsIcon('puzzle', '', { size: 18 }) },
        { id: 'tab_historie', label: getTranslation('adj_tab_6'), icon: renderDsIcon('bookOpen', '', { size: 18 }) }
    ];

    let currentTab = 'tab_kontrast';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `adj-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span class="adj-tab-icon">${t.icon}</span> <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/adjektiver_fysik/' + tabId);
        tabsMenu.querySelectorAll('.adj-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.adj-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- DATA: 10 MODPOL-PAR (20 ADJEKTIVER) I FELT 1 ---
    // Substantiver brugt: KUN fra "De 100 mest almindelige hverdagsord":
    // taske, hus, vej, pause/tid, mand, stol, bord, seng, dør, vindue, pose, kaffe, vand, glas, mælk, sko, bus, butik
    // ========================================================
    const adjektivPar = [
        {
            id: 'par_1',
            wordA: {
                word: 'stor',
                side: 'left',
                x: 82, y: 86,
                itemLabel: 'Stor taske',
                faelles: 'en stor taske',
                intet: 'et stort hus',
                flertal: 'de store tasker',
                context: 'Manden bærer en stor taske.'
            },
            wordB: {
                word: 'lille',
                side: 'right',
                x: 51, y: 49,
                itemLabel: 'Lille taske',
                faelles: 'en lille taske',
                intet: 'et lille hus',
                flertal: 'de små huse (bemærk: små!)',
                context: 'Pigen har en lille taske.'
            }
        },
        {
            id: 'par_2',
            wordA: {
                word: 'lang',
                side: 'left',
                x: 67, y: 39,
                itemLabel: 'Lang vej',
                faelles: 'en lang vej',
                intet: 'et langt brev',
                flertal: 'de lange veje',
                context: 'Det er en lang vej til skolen.'
            },
            wordB: {
                word: 'kort',
                side: 'right',
                x: 48, y: 22,
                itemLabel: 'Kort pause',
                faelles: 'en kort tur',
                intet: 'et kort brev',
                flertal: 'de korte ture',
                context: 'De holder en kort pause på arbejdet.'
            }
        },
        {
            id: 'par_3',
            wordA: {
                word: 'høj',
                side: 'left',
                x: 12, y: 34,
                itemLabel: 'Høj mand',
                faelles: 'en høj mand',
                intet: 'et højt træ',
                flertal: 'de høje træer',
                context: 'Læreren i klassen er en høj mand.'
            },
            wordB: {
                word: 'lav',
                side: 'right',
                x: 43, y: 86,
                itemLabel: 'Lav stol',
                faelles: 'en lav stol',
                intet: 'et lavt bord',
                flertal: 'de lave stole',
                context: 'Barnet sidder på en lav stol.'
            }
        },
        {
            id: 'par_4',
            wordA: {
                word: 'bred',
                side: 'left',
                x: 25, y: 58,
                itemLabel: 'Bred vej',
                faelles: 'en bred vej',
                intet: 'et bredt bord',
                flertal: 'de brede veje',
                context: 'Bilen kører på en bred vej.'
            },
            wordB: {
                word: 'smal',
                side: 'right',
                x: 65, y: 83,
                itemLabel: 'Smal dør',
                faelles: 'en smal dør',
                intet: 'et smalt vindue',
                flertal: 'de smalle døre',
                context: 'Det er en meget smal dør.'
            }
        },
        {
            id: 'par_5',
            wordA: {
                word: 'tung',
                side: 'right',
                x: 59, y: 65,
                itemLabel: 'Tung taske',
                faelles: 'en tung taske',
                intet: 'et tungt bord',
                flertal: 'de tunge tasker',
                context: 'Tasken med bøger er meget tung.'
            },
            wordB: {
                word: 'let',
                side: 'left',
                x: 49, y: 11,
                itemLabel: 'Let pose',
                faelles: 'en let pose',
                intet: 'et let arbejde',
                flertal: 'de lette poser',
                context: 'Posen med brød er let at bære.'
            }
        },
        {
            id: 'par_6',
            wordA: {
                word: 'varm',
                side: 'left',
                x: 64, y: 67,
                itemLabel: 'Varm kaffe',
                faelles: 'en varm kop kaffe',
                intet: 'et varmt brød',
                flertal: 'de varme kopper',
                context: 'Kaffen i koppen er dejlig varm.'
            },
            wordB: {
                word: 'kold',
                side: 'right',
                x: 10, y: 53,
                itemLabel: 'Koldt vand',
                faelles: 'en kold mælk',
                intet: 'et koldt glas vand',
                flertal: 'de kolde dage',
                context: 'Vandet i glasset er koldt.'
            }
        },
        {
            id: 'par_7',
            wordA: {
                word: 'hård',
                side: 'right',
                x: 32, y: 69,
                itemLabel: 'Hård stol',
                faelles: 'en hård stol',
                intet: 'et hårdt bord',
                flertal: 'de hårde stole',
                context: 'Stolen af træ er hård at sidde på.'
            },
            wordB: {
                word: 'blød',
                side: 'left',
                x: 52, y: 63,
                itemLabel: 'Blød seng',
                faelles: 'en blød seng',
                intet: 'et blødt stykke tøj',
                flertal: 'de bløde senge',
                context: 'Sengen i soveværelset er dejlig blød.'
            }
        },
        {
            id: 'par_8',
            wordA: {
                word: 'fast',
                side: 'right',
                x: 89, y: 81,
                itemLabel: 'Fast arbejde',
                faelles: 'en fast dør',
                intet: 'et fast arbejde',
                flertal: 'de faste stole',
                context: 'Manden har et fast arbejde.'
            },
            wordB: {
                word: 'løs',
                side: 'left',
                x: 12, y: 80,
                itemLabel: 'Løs sko',
                faelles: 'en løs sko',
                intet: 'et løst stykke tøj',
                flertal: 'de løse sko',
                context: 'Skoen er for stor, så den er løs.'
            }
        },
        {
            id: 'par_9',
            wordA: {
                word: 'fuld',
                side: 'left',
                x: 70, y: 65,
                itemLabel: 'Fuld bus',
                faelles: 'en fuld bus',
                intet: 'et fuldt glas',
                flertal: 'de fulde busser',
                context: 'Bussen til byen er helt fuld.'
            },
            wordB: {
                word: 'tom',
                side: 'right',
                x: 91, y: 16,
                itemLabel: 'Tom kop',
                faelles: 'en tom taske',
                intet: 'et tomt glas',
                flertal: 'de tomme kopper',
                context: 'Koppen er tom, fordi hun har drukket kaffen.'
            }
        },
        {
            id: 'par_10',
            wordA: {
                word: 'åben',
                side: 'left',
                x: 83, y: 46,
                itemLabel: 'Åben dør',
                faelles: 'en åben dør',
                intet: 'et åbent vindue',
                flertal: 'de åbne butikker',
                context: 'Døren til huset er åben.'
            },
            wordB: {
                word: 'lukket',
                side: 'right',
                x: 65, y: 29,
                itemLabel: 'Lukket butik',
                faelles: 'en lukket butik',
                intet: 'et lukket vindue',
                flertal: 'de lukkede døre',
                context: 'Butikken er lukket om aftenen.'
            }
        }
    ];

    const alleOrdMap = {};
    adjektivPar.forEach(pair => {
        alleOrdMap[pair.wordA.word] = { me: pair.wordA, other: pair.wordB, pairId: pair.id };
        alleOrdMap[pair.wordB.word] = { me: pair.wordB, other: pair.wordA, pairId: pair.id };
    });

    // ========================================================
    // --- TAB 1: KONTRAST-STUDIET (SPLIT SCREEN VISUEL FLADE)
    // ========================================================
    const panelKontrast = document.createElement('div');
    panelKontrast.className = 'adj-panel active';
    panelKontrast.dataset.panel = 'tab_kontrast';

    const contrastCard = document.createElement('div');
    contrastCard.className = 'contrast-canvas-card';

    const ctrlBar = document.createElement('div');
    ctrlBar.className = 'contrast-control-bar';

    const instructionText = document.createElement('div');
    instructionText.className = 'contrast-instruction';
    instructionText.innerHTML = `<em>${getTranslation('adj_click_hotspot_hint')}</em>`;
    ctrlBar.appendChild(instructionText);

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-toggle-btn';
    pureBtn.innerHTML = `<span>${renderDsIcon('image', '', { size: 16 })}</span> <span>${getTranslation('adj_pure_label')}</span> <strong id="pure-status-label">${getTranslation('adj_status_off')}</strong>`;
    let isPureMode = false;
    pureBtn.onclick = () => {
        isPureMode = !isPureMode;
        stage.classList.toggle('pure-mode', isPureMode);
        pureBtn.classList.toggle('active', isPureMode);
        pureBtn.querySelector('#pure-status-label').textContent = isPureMode ? getTranslation('adj_status_on') : getTranslation('adj_status_off');
    };
    ctrlBar.appendChild(pureBtn);
    contrastCard.appendChild(ctrlBar);

    const stage = document.createElement('div');
    stage.className = 'contrast-split-stage';

    const leftHalf = document.createElement('div');
    leftHalf.className = 'stage-half';
    leftHalf.innerHTML = `
        <div class="stage-half-header warm">${getTranslation('adj_f1_stage_warm')}</div>
        <img src="assets/adjektiver_fysik_venstre.jpg" alt="Det lune og bløde hjem" />
    `;

    const rightHalf = document.createElement('div');
    rightHalf.className = 'stage-half';
    rightHalf.innerHTML = `
        <div class="stage-half-header cool">${getTranslation('adj_f1_stage_cool')}</div>
        <img src="assets/adjektiver_fysik_hoejre.jpg" alt="Det kølige og faste værksted" />
    `;

    stage.appendChild(leftHalf);
    stage.appendChild(rightHalf);
    contrastCard.appendChild(stage);
    panelKontrast.appendChild(contrastCard);

    const detailCard = document.createElement('div');
    detailCard.className = 'adj-detail-card';
    detailCard.style.display = 'none';
    panelKontrast.appendChild(detailCard);

    function selectAdjective(wordKey) {
        const item = alleOrdMap[wordKey];
        if (!item) return;

        speakDanish(item.me.word);

        stage.querySelectorAll('.adj-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.word === item.me.word) {
                dot.classList.add('active');
            } else if (dot.dataset.word === item.other.word) {
                dot.classList.add('partner-active');
            }
        });

        const lang = getLang();
        const wordTrans = adjektiverWordTranslations[item.me.word]?.[lang]
            || (lang !== 'da' ? adjektiverWordTranslations[item.me.word]?.['en'] : null);
        const transMeaning = wordTrans?.meaning;
        const transSentence = wordTrans?.sentence;

        detailCard.style.display = 'flex';
        detailCard.innerHTML = `
            <div class="adj-detail-header">
                <div class="adj-title-group">
                    <span class="adj-main-word">${item.me.word}</span>
                    ${transMeaning ? `<span class="adj-trans-meaning" style="font-size: 1.15rem; color: #cbd5e1; font-weight: 600; margin-left: 0.6rem;">(${transMeaning})</span>` : ''}
                    <button class="adj-tts-btn" id="card-tts-btn">${renderDsIcon('volume', '', { size: 16 })} <span>${getTranslation('adj_listen_pronunciation')}</span></button>
                    <span style="color: #94a3b8; font-size: 0.95rem; margin-left: 0.5rem;">(${item.me.itemLabel})</span>
                </div>
                <div class="adj-modpol-pill" id="card-swap-btn" title="Klik for at se modpolen">
                    <span>${getTranslation('adj_modpol_label')}</span>
                    <strong>${item.other.word}</strong>
                    <span>➔</span>
                </div>
            </div>

            <div class="adj-congruence-grid">
                <div class="adj-congruence-box">
                    <div class="adj-congruence-label">${getTranslation('adj_faelles_label')}</div>
                    <div class="adj-congruence-val">${formatNounLinks(item.me.faelles)}</div>
                </div>
                <div class="adj-congruence-box">
                    <div class="adj-congruence-label">${getTranslation('adj_intet_label')}</div>
                    <div class="adj-congruence-val"><mark>${formatNounLinks(item.me.intet)}</mark></div>
                </div>
                <div class="adj-congruence-box">
                    <div class="adj-congruence-label">${getTranslation('adj_flertal_label')}</div>
                    <div class="adj-congruence-val">${formatNounLinks(item.me.flertal)}</div>
                </div>
            </div>

            <div class="adj-example-box">
                <strong>${getTranslation('adj_example_sentence')}</strong><br>
                "${formatNounLinks(item.me.context)}"
                ${transSentence ? `<div class="adj-trans-sentence" style="font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-top: 0.35rem;">"${transSentence}"</div>` : ''}
            </div>
        `;

        attachNounLinkListeners(detailCard);
        detailCard.querySelector('#card-tts-btn').onclick = () => speakDanish(item.me.word);
        detailCard.querySelector('#card-swap-btn').onclick = () => selectAdjective(item.other.word);
    }

    adjektivPar.forEach(pair => {
        const dotA = document.createElement('div');
        dotA.className = 'adj-hotspot';
        dotA.style.left = `${pair.wordA.x}%`;
        dotA.style.top = `${pair.wordA.y}%`;
        dotA.textContent = '●';
        dotA.title = `${pair.wordA.word} ➔ Modpol: ${pair.wordB.word}`;
        dotA.dataset.word = pair.wordA.word;
        dotA.onclick = () => selectAdjective(pair.wordA.word);
        (pair.wordA.side === 'left' ? leftHalf : rightHalf).appendChild(dotA);

        const dotB = document.createElement('div');
        dotB.className = 'adj-hotspot';
        dotB.style.left = `${pair.wordB.x}%`;
        dotB.style.top = `${pair.wordB.y}%`;
        dotB.textContent = '●';
        dotB.title = `${pair.wordB.word} ➔ Modpol: ${pair.wordA.word}`;
        dotB.dataset.word = pair.wordB.word;
        dotB.onclick = () => selectAdjective(pair.wordB.word);
        (pair.wordB.side === 'left' ? leftHalf : rightHalf).appendChild(dotB);
    });

    panelsHolder.appendChild(panelKontrast);


    // ========================================================
    // --- TAB 2: FIND MODPOLEN (ANTONYM-DUELLEN) ---
    // Simple sætninger med KUN kendte substantiver fra Top 100
    // ========================================================
    const panelAntonym = document.createElement('div');
    panelAntonym.className = 'adj-panel';
    panelAntonym.dataset.panel = 'tab_antonym';

    const antonymDuels = [
        {
            stimulus: 'Kaffen i koppen er meget <strong>VARM</strong>.',
            question: 'Hvad er vandet med isterninger i glasset?',
            targetWord: 'varm',
            correct: 'kold',
            options: ['kold', 'hård', 'blød', 'lun'],
            wrongExplanation: 'Hård og blød handler om overfladen på en stol. Til temperatur hedder det kold!',
            congruenceBonus: 'En <strong>varm</strong> kop kaffe ↔ Et <strong>koldt</strong> glas vand.'
        },
        {
            stimulus: 'Manden bærer en taske med 20 bøger. Den er meget <strong>TUNG</strong>.',
            question: 'Hvad er posen med ét brød?',
            targetWord: 'tung',
            correct: 'let',
            options: ['let', 'lille', 'løs', 'lav'],
            wrongExplanation: 'Når det gælder vægt og kilo, er modpolen til tung altid let!',
            congruenceBonus: 'En <strong>tung</strong> taske ↔ En <strong>let</strong> pose.'
        },
        {
            stimulus: 'Stolen af træ er <strong>HÅRD</strong> at sidde på.',
            question: 'Hvad er sengen at sove i?',
            targetWord: 'hård',
            correct: 'blød',
            options: ['blød', 'varm', 'let', 'fast'],
            wrongExplanation: 'Varm handler om temperatur. Når vi mærker på en stol eller seng, er modpolen blød!',
            congruenceBonus: 'En <strong>hård</strong> stol ↔ En <strong>blød</strong> seng.'
        },
        {
            stimulus: 'Familien bor i et <strong>STORT</strong> hus med mange værelser.',
            question: 'Hvad er et hus med kun ét lille værelse?',
            targetWord: 'stor',
            correct: 'lille',
            options: ['lille', 'kort', 'smal', 'lav'],
            wrongExplanation: 'Kort er tid, og smal er bredde. Modpolen til stor er lille!',
            congruenceBonus: 'Et <strong>stort</strong> hus ↔ Et <strong>lille</strong> hus (og de små børn).'
        },
        {
            stimulus: 'Døren til butikken er <strong>ÅBEN</strong>.',
            question: 'Hvad er døren, når butikken lukker om aftenen?',
            targetWord: 'åben',
            correct: 'lukket',
            options: ['lukket', 'tom', 'fast', 'smal'],
            wrongExplanation: 'En dør eller et vindue er enten åbent eller lukket!',
            congruenceBonus: 'En <strong>åben</strong> dør ↔ En <strong>lukket</strong> dør (et åbent vindue ↔ et lukket vindue).'
        },
        {
            stimulus: 'Bussen er helt <strong>FULD</strong> af mennesker klokken 8.',
            question: 'Hvad er bussen, når der ikke er nogen mennesker?',
            targetWord: 'fuld',
            correct: 'tom',
            options: ['tom', 'løs', 'let', 'kort'],
            wrongExplanation: 'Når en bus eller et glas ikke har noget indhold, er den tom!',
            congruenceBonus: 'En <strong>fuld</strong> bus ↔ En <strong>tom</strong> bus (et fuldt glas ↔ et tomt glas).'
        },
        {
            stimulus: 'Vejen til byen er meget <strong>LANG</strong>.',
            question: 'Hvad er en pause på to minutter?',
            targetWord: 'lang',
            correct: 'kort',
            options: ['kort', 'lille', 'smal', 'lav'],
            wrongExplanation: 'Om tid og vej er modpolen til lang altid kort!',
            congruenceBonus: 'En <strong>lang</strong> vej ↔ En <strong>kort</strong> pause (en kort tur).'
        },
        {
            stimulus: 'Læreren i klassen er en meget <strong>HØJ</strong> mand.',
            question: 'Hvad er det lille barn på fire år?',
            targetWord: 'høj',
            correct: 'lav',
            options: ['lav', 'kort', 'lille', 'blød'],
            wrongExplanation: 'Når vi måler højden på en person eller et bord, er modpolen lav!',
            congruenceBonus: 'En <strong>høj</strong> mand ↔ En <strong>lav</strong> mand (et højt bord ↔ et lavt bord).'
        },
        {
            stimulus: 'Bilen kører på en <strong>BRED</strong> vej.',
            question: 'Hvad er stien, hvor to cykler ikke kan køre ved siden af hinanden?',
            targetWord: 'bred',
            correct: 'smal',
            options: ['smal', 'kort', 'lav', 'lille'],
            wrongExplanation: 'Når vi taler om vejens bredde, hedder modpolerne bred og smal!',
            congruenceBonus: 'En <strong>bred</strong> vej ↔ En <strong>smal</strong> vej (en bred seng ↔ en smal seng).'
        },
        {
            stimulus: 'Døren er låst og sidder helt <strong>FAST</strong>.',
            question: 'Hvad er skoen, hvis den er lige ved at falde af?',
            targetWord: 'fast',
            correct: 'løs',
            options: ['løs', 'blød', 'let', 'åben'],
            wrongExplanation: 'Når en sko eller en dør ikke sidder fast, er den løs!',
            congruenceBonus: 'En <strong>fast</strong> dør ↔ En <strong>løs</strong> sko.'
        }
    ];

    let currentDuelIndex = 0;
    let duelScore = 0;

    const antonymCard = document.createElement('div');
    antonymCard.className = 'task-card';
    panelAntonym.appendChild(antonymCard);

    function renderDuel() {
        const item = antonymDuels[currentDuelIndex];
        antonymCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">Duel ${currentDuelIndex + 1} af ${antonymDuels.length}</span>
                <span class="task-score">Point: <strong>${duelScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                ${formatNounLinks(item.stimulus)}
                <div class="task-subprompt">${formatNounLinks(item.question)}</div>
            </div>
            <div class="task-options-grid" id="duel-options"></div>
            <div id="duel-feedback"></div>
        `;

        attachNounLinkListeners(antonymCard);

        const optionsGrid = antonymCard.querySelector('#duel-options');
        const feedbackContainer = antonymCard.querySelector('#duel-feedback');

        const shuffled = shuffleArray(item.options);

        shuffled.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    duelScore++;
                    antonymCard.querySelector('.task-score strong').textContent = duelScore;
                    speakDanish(item.correct.split(' ')[0]);

                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>Rigtigt!</strong> Modpolen til <em>${item.targetWord}</em> er <strong>${item.correct}</strong>.<br>
                            <span style="display:inline-block; margin-top:0.5rem; color:#f8fafc;"><strong>Sætnings-par:</strong> ${formatNounLinks(item.congruenceBonus)}</span>
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Ikke helt:</strong> ${item.wrongExplanation}<br>
                            Det rigtige svar er <strong>${item.correct}</strong>.
                        </div>
                    `;
                }

                attachNounLinkListeners(feedbackContainer);

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentDuelIndex + 1 < antonymDuels.length) {
                    nextBtn.textContent = 'Næste duel ➔';
                    nextBtn.onclick = () => {
                        currentDuelIndex++;
                        renderDuel();
                    };
                } else {
                    nextBtn.textContent = `Se resultat (${duelScore}/${antonymDuels.length})`;
                    nextBtn.onclick = () => {
                        antonymCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="margin-bottom: 1rem; color: #f59e0b;">${renderDsIcon("trophy", "", { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Flot klaret i Antonym-duellen!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 2rem;">Du fik <strong>${duelScore}</strong> ud af <strong>${antonymDuels.length}</strong> rigtige modpoler.</p>
                                <button class="task-next-btn" id="restart-duel-btn">Prøv igen</button>
                            </div>
                        `;
                        antonymCard.querySelector('#restart-duel-btn').onclick = () => {
                            currentDuelIndex = 0;
                            duelScore = 0;
                            renderDuel();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderDuel();
    panelsHolder.appendChild(panelAntonym);


    // ========================================================
    // --- TAB 3: SYNONYMER I HVERDAGEN (NUANCER) ---
    // Simple sætninger med kendte ord
    // ========================================================
    const panelSynonym = document.createElement('div');
    panelSynonym.className = 'adj-panel';
    panelSynonym.dataset.panel = 'tab_synonym';

    const synonymTasks = [
        {
            word: 'hurtig',
            sentence: 'Manden cykler meget <strong>HURTIGT</strong> på vejen.',
            question: 'Hvilket ord betyder næsten det samme som hurtig?',
            correct: 'kvik / rap',
            options: ['kvik / rap', 'stille', 'tung', 'langsom'],
            explanation: '"Kvik" og "rap" bruges om nogen, der bevæger sig eller tænker hurtigt.'
        },
        {
            word: 'kold',
            sentence: 'Vandet i glasset er meget <strong>KOLDT</strong>.',
            question: 'Hvilket ord betyder næsten det samme?',
            correct: 'kølig / iskold',
            options: ['kølig / iskold', 'våd', 'blød', 'varm'],
            explanation: '"Kølig" er let kold, og "iskold" er meget kold.'
        },
        {
            word: 'hård',
            sentence: 'Stolen af træ er alt for <strong>HÅRD</strong> at sidde på.',
            question: 'Hvilket ord betyder næsten det samme?',
            correct: 'fast / stiv',
            options: ['fast / stiv', 'tung', 'rund', 'skarp'],
            explanation: 'En "fast" eller "stiv" stol giver sig ikke, når man sidder på den.'
        },
        {
            word: 'blød',
            sentence: 'Katten sover i en dejlig <strong>BLØD</strong> seng.',
            question: 'Hvilket ord beskriver noget rart og blødt?',
            correct: 'vamset / behagelig',
            options: ['vamset / behagelig', 'varm', 'løs', 'let'],
            explanation: '"Vamset" bruges om bløde trøjer, tæpper og senge.'
        },
        {
            word: 'stor',
            sentence: 'Familien bor i et <strong>STORT</strong> hus.',
            question: 'Hvilket ord betyder næsten det samme som stor?',
            correct: 'rummelig / kæmpe',
            options: ['rummelig / kæmpe', 'bred', 'høj', 'tung'],
            explanation: 'Et "rummeligt" hus har masser af plads og store værelser.'
        },
        {
            word: 'lille',
            sentence: 'De holder en <strong>LILLE</strong> pause fra arbejdet.',
            question: 'Hvilket ord betyder næsten det samme som en lille pause?',
            correct: 'kort / beskeden',
            options: ['kort / beskeden', 'smal', 'lav', 'stille'],
            explanation: 'En "kort" pause varer kun få minutter.'
        },
        {
            word: 'tung',
            sentence: 'Manden bærer et meget <strong>TUNGT</strong> bord.',
            question: 'Hvilket ord betyder det samme om vægten?',
            correct: 'massiv / vægtig',
            options: ['massiv / vægtig', 'hård', 'stor', 'mørk'],
            explanation: 'Et "massivt" bord af træ vejer mange kilo.'
        },
        {
            word: 'let',
            sentence: 'Barnet bærer en pose, som kun vejer lidt – posen er <strong>LET</strong>.',
            question: 'Hvilket udtryk betyder næsten det samme?',
            correct: 'fjerlet / luftig',
            options: ['fjerlet / luftig', 'tynd', 'hurtig', 'løs'],
            explanation: '"Fjerlet" betyder, at det næsten intet vejer (som en fjer).'
        },
        {
            word: 'fuld',
            sentence: 'Bussen til byen er helt <strong>FULD</strong> af mennesker.',
            question: 'Hvilket ord bruges tit i hverdagen?',
            correct: 'proppet / overfyldt',
            options: ['proppet / overfyldt', 'tung', 'bred', 'hel'],
            explanation: 'Man siger tit: "Bussen var helt proppet med mennesker!"'
        },
        {
            word: 'tom',
            sentence: 'Gaden og byen var helt <strong>TOM</strong> om natten.',
            question: 'Hvilket ord betyder det samme som en tom gade?',
            correct: 'øde / forladt',
            options: ['øde / forladt', 'ren', 'stille', 'åben'],
            explanation: 'En "øde" by har ingen mennesker på gaden.'
        }
    ];

    let currentSynonymIndex = 0;
    let synonymScore = 0;

    const synonymCard = document.createElement('div');
    synonymCard.className = 'task-card';
    panelSynonym.appendChild(synonymCard);

    function renderSynonymTask() {
        const item = synonymTasks[currentSynonymIndex];
        synonymCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">Nuance ${currentSynonymIndex + 1} af ${synonymTasks.length}</span>
                <span class="task-score">Point: <strong>${synonymScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                ${formatNounLinks(item.sentence)}
                <div class="task-subprompt">${formatNounLinks(item.question)}</div>
            </div>
            <div class="task-options-grid" id="synonym-options"></div>
            <div id="synonym-feedback"></div>
        `;

        attachNounLinkListeners(synonymCard);

        const optionsGrid = synonymCard.querySelector('#synonym-options');
        const feedbackContainer = synonymCard.querySelector('#synonym-feedback');

        const shuffled = shuffleArray(item.options);

        shuffled.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    synonymScore++;
                    synonymCard.querySelector('.task-score strong').textContent = synonymScore;
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>Rigtigt!</strong> ${item.explanation}
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Svaret er:</strong> ${item.correct}.<br>${item.explanation}
                        </div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentSynonymIndex + 1 < synonymTasks.length) {
                    nextBtn.textContent = 'Næste nuance ➔';
                    nextBtn.onclick = () => {
                        currentSynonymIndex++;
                        renderSynonymTask();
                    };
                } else {
                    nextBtn.textContent = `Afslut synonymer (${synonymScore}/${synonymTasks.length})`;
                    nextBtn.onclick = () => {
                        synonymCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="margin-bottom: 1rem; color: #f59e0b;">${renderDsIcon("trophy", "", { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Godt ordforråd!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 2rem;">Du fik <strong>${synonymScore}</strong> ud af <strong>${synonymTasks.length}</strong> rigtige nuancer.</p>
                                <button class="task-next-btn" id="restart-syn-btn">Prøv igen</button>
                            </div>
                        `;
                        synonymCard.querySelector('#restart-syn-btn').onclick = () => {
                            currentSynonymIndex = 0;
                            synonymScore = 0;
                            renderSynonymTask();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderSynonymTask();
    panelsHolder.appendChild(panelSynonym);


    // ========================================================
    // --- TAB 4: BAROMETRET (GRADBØJNING & SKALA) ---
    // ========================================================
    const panelBarometer = document.createElement('div');
    panelBarometer.className = 'adj-panel';
    panelBarometer.dataset.panel = 'tab_barometer';

    const barometerChallenges = [
        {
            id: 'f1_s1',
            title: 'Skala 1: Temperatur',
            desc: 'Arranger ordene efter temperatur fra koldest til varmest:',
            lowLabel: '🥶 Koldest',
            highLabel: '🔥 Varmest',
            correctOrder: ['iskold', 'kold', 'lun', 'varm', 'kogende']
        },
        {
            id: 'f1_s2',
            title: 'Skala 2: Størrelse',
            desc: 'Arranger ordene efter størrelse fra mindst til størst:',
            lowLabel: 'Mindst',
            highLabel: 'Størst',
            correctOrder: ['lillebitte', 'lille', 'mellemstor', 'stor', 'enorm']
        },
        {
            id: 'f1_s3',
            title: 'Skala 3: Vægt',
            desc: 'Arranger ordene fra lettest til tungest:',
            lowLabel: 'Lettest',
            highLabel: 'Tungest',
            correctOrder: ['fjerlet', 'let', 'tung', 'blytung']
        },
        {
            id: 'f1_s4',
            title: 'Skala 4: Hårdhed og tekstur',
            desc: 'Arranger ordene fra blødest til hårdest:',
            lowLabel: 'Blødest',
            highLabel: 'Hårdest',
            correctOrder: ['fløjlsblød', 'blød', 'fast', 'stenhård']
        },
        {
            id: 'f1_s5',
            title: 'Skala 5: Rumindhold',
            desc: 'Arranger ordene fra tomt til fuldt:',
            lowLabel: 'Helt tomt',
            highLabel: 'Helt fyldt',
            correctOrder: ['helt tom', 'halvtom', 'halvfuld', 'propfuld']
        },
        {
            id: 'f1_s6',
            title: 'Skala 6: Længde og varighed',
            desc: 'Arranger ordene fra kortest til længst:',
            lowLabel: 'Kortest',
            highLabel: 'Længst',
            correctOrder: ['ultrakort', 'kort', 'lang', 'uendelig lang']
        }
    ];

    let currentBarometerIndex = 0;
    const barometerCard = document.createElement('div');
    barometerCard.className = 'task-card';
    panelBarometer.appendChild(barometerCard);

    function renderBarometerChallenge() {
        const item = barometerChallenges[currentBarometerIndex];
        const totalSlots = item.correctOrder.length;
        let placed = [];
        let pool = shuffleArray(item.correctOrder);

        const bTitle = getTranslation(`adj_baro_${item.id}_title`) || item.title;
        const bDesc = getTranslation(`adj_baro_${item.id}_desc`) || item.desc;
        const bLow = getTranslation(`adj_baro_${item.id}_low`) || item.lowLabel;
        const bHigh = getTranslation(`adj_baro_${item.id}_high`) || item.highLabel;

        barometerCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">${getTranslation('adj_baro_counter').replace('{current}', currentBarometerIndex + 1).replace('{total}', barometerChallenges.length)}</span>
                <span class="task-score">${bTitle}</span>
            </div>
            <div class="task-prompt-box">
                <div style="font-size:1.3rem; font-weight:700; margin-bottom:0.4rem;">${bTitle}</div>
                <div class="task-subprompt">${bDesc}</div>
            </div>

            <div class="scale-indicators">
                <span>1. ${bLow}</span>
                <span>${totalSlots}. ${bHigh}</span>
            </div>

            <div class="barometer-track" id="barometer-slots"></div>

            <div class="barometer-pool" id="barometer-chips"></div>

            <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem; flex-wrap:wrap;">
                <button class="task-secondary-btn" id="reset-scale-btn">${getTranslation('adj_baro_reset_btn')}</button>
                <button class="task-next-btn" id="check-scale-btn" disabled>${getTranslation('adj_baro_check_btn')}</button>
            </div>
            <div id="barometer-feedback" style="margin-top:1.2rem;"></div>
        `;

        const slotsContainer = barometerCard.querySelector('#barometer-slots');
        const chipsContainer = barometerCard.querySelector('#barometer-chips');
        const checkBtn = barometerCard.querySelector('#check-scale-btn');
        const resetBtn = barometerCard.querySelector('#reset-scale-btn');
        const feedbackBox = barometerCard.querySelector('#barometer-feedback');

        function updateUI() {
            slotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlots; i++) {
                const slot = document.createElement('div');
                slot.className = `barometer-slot ${placed[i] ? 'filled' : ''}`;
                slot.textContent = placed[i] ? `${i + 1}. ${placed[i]}` : getTranslation('adj_baro_step').replace('{n}', i + 1);
                if (placed[i]) {
                    slot.title = getTranslation('adj_baro_remove_tooltip');
                    slot.onclick = () => {
                        placed.splice(i, 1);
                        updateUI();
                    };
                }
                slotsContainer.appendChild(slot);
            }

            chipsContainer.innerHTML = '';
            pool.forEach(word => {
                const chip = document.createElement('button');
                chip.className = `barometer-chip ${placed.includes(word) ? 'used' : ''}`;
                chip.textContent = word;
                chip.onclick = () => {
                    if (placed.length < totalSlots && !placed.includes(word)) {
                        placed.push(word);
                        updateUI();
                    }
                };
                chipsContainer.appendChild(chip);
            });

            checkBtn.disabled = placed.length !== totalSlots;
        }

        resetBtn.onclick = () => {
            placed = [];
            feedbackBox.innerHTML = '';
            updateUI();
        };

        checkBtn.onclick = () => {
            const isAllCorrect = placed.every((w, idx) => w === item.correctOrder[idx]);
            if (isAllCorrect) {
                feedbackBox.innerHTML = `
                    <div class="task-feedback-box correct">
                        <strong>${getTranslation('adj_baro_success')}</strong><br>
                        <em>${item.correctOrder.join(' ➔ ')}</em>
                    </div>
                `;
                checkBtn.style.display = 'none';

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentBarometerIndex + 1 < barometerChallenges.length) {
                    nextBtn.textContent = getTranslation('adj_baro_next_btn');
                    nextBtn.onclick = () => {
                        currentBarometerIndex++;
                        renderBarometerChallenge();
                    };
                } else {
                    nextBtn.textContent = getTranslation('adj_baro_master_btn');
                    nextBtn.onclick = () => {
                        currentBarometerIndex = 0;
                        renderBarometerChallenge();
                    };
                }
                feedbackBox.appendChild(nextBtn);
            } else {
                feedbackBox.innerHTML = `
                    <div class="task-feedback-box wrong">
                        <strong>${getTranslation('adj_baro_wrong')}</strong><br>
                        ${getTranslation('adj_baro_hint')}
                    </div>
                `;
            }
        };

        updateUI();
    }

    renderBarometerChallenge();
    panelsHolder.appendChild(panelBarometer);


    // ========================================================
    // --- TAB 5: KONGRUENS-BYGGEREN (FÆLDE-TRÆNING: -T OG -E)
    // Med direkte link til den store grammatiske bøjningsguide!
    // KUN kendte substantiver fra Top 100
    // ========================================================
    const panelKongruens = document.createElement('div');
    panelKongruens.className = 'adj-panel';
    panelKongruens.dataset.panel = 'tab_kongruens';

    const kongruensTasks = [
        {
            sentence: 'Børnene bader i det ______ vand ved stranden.',
            correct: 'kolde',
            options: ['kold', 'koldt', 'kolde'],
            rule: '<strong>1. Bestemt form (det ... vand):</strong> Når der står <em>det</em> foran et intetkønsord, får adjektivet altid <strong>-e</strong>: <em>det kolde vand</em> (ikke "koldt"!).'
        },
        {
            sentence: 'Manden drikker et ______ glas mælk.',
            correct: 'koldt',
            options: ['kold', 'koldt', 'kolde'],
            rule: '<strong>Ubestemt form (et glas):</strong> Intetkøn uden "det" foran får <strong>-t</strong>: <em>et koldt glas</em>.'
        },
        {
            sentence: 'Kvinden sover i den ______ seng på værelset.',
            correct: 'bløde',
            options: ['blød', 'blødt', 'bløde'],
            rule: '<strong>2. Bestemt form (den ... seng):</strong> Når der står <em>den</em> foran, får adjektivet altid <strong>-e</strong>: <em>den bløde seng</em>.'
        },
        {
            sentence: 'Peter drikker en ______ kop kaffe om morgenen.',
            correct: 'varm',
            options: ['varm', 'varmt', 'varme'],
            rule: '<strong>Ubestemt form (en kop):</strong> Fælleskøn ental har <strong>ingen endelse</strong>: <em>en varm kop</em>.'
        },
        {
            sentence: 'Familien købte det ______ hus i byen.',
            correct: 'store',
            options: ['stor', 'stort', 'store'],
            rule: '<strong>3. Bestemt form (det ... hus):</strong> Får altid <strong>-e</strong> foran substantivet: <em>det store hus</em>.'
        },
        {
            sentence: 'Manden bærer et meget ______ bord.',
            correct: 'tungt',
            options: ['tung', 'tungt', 'tunge'],
            rule: '<strong>Ubestemt intetkøn (et bord):</strong> Får <strong>-t</strong>: <em>et tungt bord</em>.'
        },
        {
            sentence: 'Manden har to ______ tasker med bøger.',
            correct: 'tunge',
            options: ['tung', 'tungt', 'tunge'],
            rule: '<strong>Ubestemt flertal (to tasker):</strong> Adjektiver i flertal får altid <strong>-e</strong>: <em>tunge tasker</em>.'
        },
        {
            sentence: 'Hvor er de ______ kopper til kaffen?',
            correct: 'store',
            options: ['stor', 'stort', 'store'],
            rule: '<strong>4. Bestemt flertal (de ... kopper):</strong> I bestemt flertal får adjektivet altid <strong>-e</strong>: <em>de store kopper</em>.'
        },
        {
            sentence: 'Koppen på bordet er helt ______.',
            correct: 'tom',
            options: ['tom', 'tomt', 'tomme'],
            rule: '<strong>Prædikativ form (koppen er...):</strong> Kop er fælleskøn ("en kop") ➔ <em>koppen er tom</em> (et glas er tomt).'
        },
        {
            sentence: 'Vinduet i stuen er ______.',
            correct: 'åbent',
            options: ['åben', 'åbent', 'åbne'],
            rule: '<strong>Prædikativ form (vinduet er...):</strong> Vindue er intetkøn ("et vindue") ➔ får <strong>-t</strong>: <em>vinduet er åbent</em> (døren er åben).'
        }
    ];

    let currentKongruensIndex = 0;
    let kongruensScore = 0;

    const kongruensCard = document.createElement('div');
    kongruensCard.className = 'task-card';
    panelKongruens.appendChild(kongruensCard);

    function renderKongruensTask() {
        const item = kongruensTasks[currentKongruensIndex];
        kongruensCard.innerHTML = `
            <!-- Grammatisk Guide Banner med direkte link -->
            <div class="adj-grammar-link-box">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <span style="display:inline-flex; align-items:center; color:#f8fafc;">${renderDsIcon("bookOpen", "", { size: 28 })}</span>
                    <div>
                        <div style="font-weight: 700; color: #f8fafc; font-size: 1.05rem;">
                            ${getTranslation('adj_grammar_banner_title')}
                        </div>
                        <div style="color: #94a3b8; font-size: 0.92rem; margin-top: 0.2rem;">
                            ${getTranslation('adj_grammar_banner_desc')}
                        </div>
                    </div>
                </div>
                <button class="adj-go-grammar-btn" id="go-comparison-guide-btn">
                    ${getTranslation('adj_grammar_banner_btn')}
                </button>
            </div>

            <div class="task-top-bar">
                <span class="task-counter">${getTranslation('adj_kongruens_counter').replace('{current}', currentKongruensIndex + 1).replace('{total}', kongruensTasks.length)}</span>
                <span class="task-score">${getTranslation('adj_score_label')} <strong>${kongruensScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                ${formatNounLinks(item.sentence)}
                <div class="task-subprompt">${getTranslation('adj_kongruens_subprompt')}</div>
            </div>
            <div class="task-options-grid" id="kongruens-options"></div>
            <div id="kongruens-feedback"></div>
        `;

        attachNounLinkListeners(kongruensCard);

        // Knap til grammatikguide
        kongruensCard.querySelector('#go-comparison-guide-btn').onclick = () => {
            navigateFn('adjective_comparison');
        };

        const optionsGrid = kongruensCard.querySelector('#kongruens-options');
        const feedbackContainer = kongruensCard.querySelector('#kongruens-feedback');

        item.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    kongruensScore++;
                    kongruensCard.querySelector('.task-score strong').textContent = kongruensScore;
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>Helt rigtigt!</strong><br>
                            ${item.rule}
                            <div>
                                <a class="feedback-grammar-link" id="feedback-link-grammar">
                                    Læs hele reglen i bøjningsguiden her ➔
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Forkert form:</strong> Rigtigt er <strong>${item.correct}</strong>.<br>
                            ${item.rule}
                            <div>
                                <a class="feedback-grammar-link" id="feedback-link-grammar">
                                    Se bøjningsguiden for hjælp til -t og -e ➔
                                </a>
                            </div>
                        </div>
                    `;
                }

                const linkEl = feedbackContainer.querySelector('#feedback-link-grammar');
                if (linkEl) {
                    linkEl.onclick = () => navigateFn('adjective_comparison');
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentKongruensIndex + 1 < kongruensTasks.length) {
                    nextBtn.textContent = 'Næste sætning ➔';
                    nextBtn.onclick = () => {
                        currentKongruensIndex++;
                        renderKongruensTask();
                    };
                } else {
                    nextBtn.textContent = `Se bøjningsresultat (${kongruensScore}/${kongruensTasks.length})`;
                    nextBtn.onclick = () => {
                        kongruensCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="margin-bottom: 1rem; color: #f59e0b;">${renderDsIcon("trophy", "", { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Stærk kongruens-træning!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 1.5rem;">Du fik <strong>${kongruensScore}</strong> ud af <strong>${kongruensTasks.length}</strong> rigtige endelser.</p>
                                <div style="margin-bottom: 2rem;">
                                    <button class="adj-go-grammar-btn" id="finish-guide-link-btn" style="margin: 0 auto;">
                                        Gå til den store bøjningsguide ➔
                                    </button>
                                </div>
                                <button class="task-next-btn" id="restart-kong-btn">Prøv igen</button>
                            </div>
                        `;
                        kongruensCard.querySelector('#finish-guide-link-btn').onclick = () => navigateFn('adjective_comparison');
                        kongruensCard.querySelector('#restart-kong-btn').onclick = () => {
                            currentKongruensIndex = 0;
                            kongruensScore = 0;
                            renderKongruensTask();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderKongruensTask();
    panelsHolder.appendChild(panelKongruens);


    // ========================================================
    // --- TAB 6: KONTEKST & HISTORIE (VÆLG DET RIGTIGE ADJEKTIV)
    // Meget enkle hverdagssituationer med KUN ord fra De 100 substantiver
    // ========================================================
    const panelHistorie = document.createElement('div');
    panelHistorie.className = 'adj-panel';
    panelHistorie.dataset.panel = 'tab_historie';

    const historieTasks = [
        {
            story: 'Manden har 20 bøger i sin taske. Tasken er meget ______.',
            correct: 'tung',
            options: ['tung', 'let', 'blød', 'kort'],
            explanation: 'Bøger vejer mange kilo, så tasken er tung.'
        },
        {
            story: 'Kaffen koger i kanden. Den er for ______ at drikke lige nu.',
            correct: 'varm',
            options: ['varm', 'kold', 'hård', 'bred'],
            explanation: 'Kogende kaffe er for varm til at drikke med det samme.'
        },
        {
            story: 'Det sner udenfor, og der er frost. Vejret er meget ______.',
            correct: 'koldt',
            options: ['koldt', 'varmt', 'blødt', 'let'],
            explanation: 'Sne og frost betyder, at vejret er koldt.'
        },
        {
            story: 'Pigen på fire år kan ikke nå æblet på træet. Hun er for ______.',
            correct: 'lav',
            options: ['lav', 'høj', 'varm', 'tung'],
            explanation: 'Et lille barn er for lavt til at nå op i træet.'
        },
        {
            story: 'Der er ikke en dråbe vand i flasken. Den er helt ______.',
            correct: 'tom',
            options: ['tom', 'fuld', 'fast', 'åben'],
            explanation: 'Når der ikke er noget vand tilbage, er flasken tom.'
        },
        {
            story: 'Kvinden er træt og lægger sig i sengen. Sengen er dejlig ______.',
            correct: 'blød',
            options: ['blød', 'hård', 'smal', 'tom'],
            explanation: 'En god seng er blød og behagelig at sove i.'
        },
        {
            story: 'Bilen kan ikke køre ind ad vejen. Vejen er for ______.',
            correct: 'smal',
            options: ['smal', 'bred', 'lav', 'varm'],
            explanation: 'Hvis der ikke er plads til bilen, er vejen for smal.'
        },
        {
            story: 'Klokken er 23 om natten. Butikken er mørk og ______.',
            correct: 'lukket',
            options: ['lukket', 'åben', 'hård', 'tung'],
            explanation: 'Sent om natten er butikken lukket.'
        }
    ];

    let currentStoryIndex = 0;
    let storyScore = 0;

    const storyCard = document.createElement('div');
    storyCard.className = 'task-card';
    panelHistorie.appendChild(storyCard);

    function renderStoryTask() {
        const item = historieTasks[currentStoryIndex];
        storyCard.innerHTML = `
            <div class="task-top-bar">
                <span class="task-counter">${getTranslation('adj_situation_counter').replace('{current}', currentStoryIndex + 1).replace('{total}', historieTasks.length)}</span>
                <span class="task-score">${getTranslation('adj_score_label')} <strong>${storyScore}</strong></span>
            </div>
            <div class="task-prompt-box">
                "${formatNounLinks(item.story)}"
                <div class="task-subprompt">${getTranslation('adj_story_subprompt')}</div>
            </div>
            <div class="task-options-grid" id="story-options"></div>
            <div id="story-feedback"></div>
        `;

        attachNounLinkListeners(storyCard);

        const optionsGrid = storyCard.querySelector('#story-options');
        const feedbackContainer = storyCard.querySelector('#story-feedback');

        shuffleArray(item.options).forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'task-opt-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = opt === item.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    storyScore++;
                    storyCard.querySelector('.task-score strong').textContent = storyScore;
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box correct">
                            <strong>Helt rigtigt!</strong> ${item.explanation}
                        </div>
                    `;
                } else {
                    btn.classList.add('wrong');
                    optionsGrid.querySelectorAll('.task-opt-btn').forEach(b => {
                        if (b.textContent === item.correct) b.classList.add('correct');
                    });
                    feedbackContainer.innerHTML = `
                        <div class="task-feedback-box wrong">
                            <strong>Svaret er "${item.correct}":</strong> ${item.explanation}
                        </div>
                    `;
                }

                const nextBtn = document.createElement('button');
                nextBtn.className = 'task-next-btn';
                if (currentStoryIndex + 1 < historieTasks.length) {
                    nextBtn.textContent = 'Næste situation ➔';
                    nextBtn.onclick = () => {
                        currentStoryIndex++;
                        renderStoryTask();
                    };
                } else {
                    nextBtn.textContent = `Se resultat (${storyScore}/${historieTasks.length})`;
                    nextBtn.onclick = () => {
                        storyCard.innerHTML = `
                            <div style="text-align:center; padding: 2rem;">
                                <div style="margin-bottom: 1rem; color: #f59e0b;">${renderDsIcon("trophy", "", { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #f8fafc;">Super flot forståelse!</h2>
                                <p style="font-size: 1.15rem; color: #94a3b8; margin-bottom: 2rem;">Du fik <strong>${storyScore}</strong> ud af <strong>${historieTasks.length}</strong> rigtige svar.</p>
                                <button class="task-next-btn" id="restart-story-btn">Prøv igen</button>
                            </div>
                        `;
                        storyCard.querySelector('#restart-story-btn').onclick = () => {
                            currentStoryIndex = 0;
                            storyScore = 0;
                            renderStoryTask();
                        };
                    };
                }
                feedbackContainer.appendChild(nextBtn);
            };

            optionsGrid.appendChild(btn);
        });
    }

    renderStoryTask();
    panelsHolder.appendChild(panelHistorie);

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_kontrast';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
