import { getTranslation, getLang } from '../utils/i18n.js';
import { adjektiverWordTranslations } from '../utils/top100_adjektiver_translations.js';
import { formatNounLinks, attachNounLinkListeners } from '../utils/nounQuickPeekModal.js';
import { shuffleArray } from '../utils/shuffle.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { isLocalhost, ADJ_PALETTES, getActiveAdjNuance, applyAdjNuance } from '../components/DesignSystemToggle.js';

/**
 * AdjektiverTidView - Felt 2: Tid, alder og tempo
 * Dækker 20 af de mest almindelige tids- og tempoadjektiver på dansk (10 kontrast-par):
 * 1. Kontrast-studiet (Visuel flade på stationen med 20 hotspots og modpol-kobling)
 * 2. Find modpolen (Antonym-duellen - simple sætninger med kendte substantiver)
 * 3. Synonymer & Nuancer (Hverdagsnuancer)
 * 4. Barometret (Tids- og hastighedsskalaer)
 * 5. Kongruens-byggeren (Fælde-træning: -t og -e + link til bøjningsguiden)
 * 6. Kontekst & Historie (Hverdagssituationer fra stationen og hverdagen)
 */
export function renderAdjektiverTidView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    // Aktivér mørk orange nuance (standard: Mørk Rav)
    applyAdjNuance(getActiveAdjNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjektiver-fysik-view adjektiver-tid-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('adj_back')}`;
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

    // TTS Audio Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Styles (reusing the high-end design from Felt 1)
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

        .adjektiver-tid-view {
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
        .adjektiver-tid-view .top-bar {
            margin-bottom: 1.2rem;
        }
        .adjektiver-tid-view .back-btn {
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
        .adjektiver-tid-view .back-btn:hover {
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

        /* Tab 1: Single Stage Contrast Canvas */
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
            display: flex;
            align-items: center;
            gap: 0.5rem;
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

        .contrast-single-stage {
            position: relative;
            overflow: hidden;
            background: var(--adj-surface-input, #1C0B03);
        }
        .contrast-single-stage img {
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
            color: white !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.9);
            z-index: 8;
        }
        .adj-hotspot.partner-active {
            background: #38bdf8 !important;
            border-color: white !important;
            color: white !important;
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
            .view-container.adjektiver-tid-view {
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
        <h1>${getTranslation('top100_adj_f2_title')}</h1>
        <p>${getTranslation('top100_adj_f2_desc')}</p>
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
        history.pushState(null, '', '#/' + lang + '/adjektiver_tid/' + tabId);
        tabsMenu.querySelectorAll('.adj-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.adj-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- DATA: 10 MODPOL-PAR (20 ADJEKTIVER) I FELT 2 ---
    // ========================================================
    const adjektivPar = [
        {
            id: 'par_1',
            wordA: {
                word: 'ny',
                x: 18, y: 72,
                itemLabel: 'Ny cykel',
                faelles: 'en ny cykel',
                intet: 'et nyt ur',
                flertal: 'de nye sko',
                context: 'Hun cykler på arbejde på en ny cykel.'
            },
            wordB: {
                word: 'gammel',
                x: 32, y: 68,
                itemLabel: 'Gammel cykel',
                faelles: 'en gammel taske',
                intet: 'et gammelt hus',
                flertal: 'de gamle bøger (bemærk: gamle!)',
                context: 'Den gamle cykel står ved stationen.'
            }
        },
        {
            id: 'par_2',
            wordA: {
                word: 'ung',
                x: 48, y: 65,
                itemLabel: 'Ung studerende',
                faelles: 'en ung kvinde',
                intet: 'et ungt menneske',
                flertal: 'de unge elever',
                context: 'En ung kvinde venter på bussen.'
            },
            wordB: {
                word: 'gammel',
                x: 62, y: 74,
                itemLabel: 'Gammel mand',
                faelles: 'en gammel mand',
                intet: 'et gammelt træ',
                flertal: 'de gamle naboer',
                context: 'En gammel mand sidder på bænken.'
            }
        },
        {
            id: 'par_3',
            wordA: {
                word: 'tidlig',
                x: 58, y: 22,
                itemLabel: 'Tidlig afgang',
                faelles: 'en tidlig morgen',
                intet: 'et tidligt tog',
                flertal: 'de tidlige timer',
                context: 'Hun tager et tidligt tog på arbejde.'
            },
            wordB: {
                word: 'sen',
                x: 74, y: 22,
                itemLabel: 'Sen aften',
                faelles: 'en sen aften',
                intet: 'et sent tog',
                flertal: 'de sene timer',
                context: 'Han tager en sen bus hjem om aftenen.'
            }
        },
        {
            id: 'par_4',
            wordA: {
                word: 'hurtig',
                x: 82, y: 55,
                itemLabel: 'Hurtigt tog',
                faelles: 'en hurtig bus',
                intet: 'et hurtigt tog',
                flertal: 'de hurtige cyklister',
                context: 'Toget til København er meget hurtigt.'
            },
            wordB: {
                word: 'langsom',
                x: 12, y: 52,
                itemLabel: 'Langsom gåtur',
                faelles: 'en langsom bus',
                intet: 'et langsomt tog',
                flertal: 'de langsomme biler',
                context: 'Bussen i myldretiden er meget langsom.'
            }
        },
        {
            id: 'par_5',
            wordA: {
                word: 'kortvarig',
                x: 38, y: 34,
                itemLabel: 'Kortvarig regn',
                faelles: 'en kortvarig pause',
                intet: 'et kortvarigt stop',
                flertal: 'de kortvarige pauser',
                context: 'De holder en kortvarig pause i arbejdet.'
            },
            wordB: {
                word: 'langvarig',
                x: 44, y: 45,
                itemLabel: 'Langvarig ventetid',
                faelles: 'en langvarig uddannelse',
                intet: 'et langvarigt kursus',
                flertal: 'de langvarige samtaler',
                context: 'Ventetiden på bussen var meget langvarig.'
            }
        },
        {
            id: 'par_6',
            wordA: {
                word: 'hyppig',
                x: 25, y: 36,
                itemLabel: 'Hyppig afgang',
                faelles: 'en hyppig gæst',
                intet: 'et hyppigt problem',
                flertal: 'de hyppige togafgange',
                context: 'Afgangen med metroen er meget hyppig.'
            },
            wordB: {
                word: 'sjælden',
                x: 88, y: 38,
                itemLabel: 'Sjælden bus',
                faelles: 'en sjælden fugl',
                intet: 'et sjældent syn',
                flertal: 'de sjældne afgange',
                context: 'Bussen til landsbyen er et sjældent syn.'
            }
        },
        {
            id: 'par_7',
            wordA: {
                word: 'nuværende',
                x: 68, y: 48,
                itemLabel: 'Nuværende køreplan',
                faelles: 'den nuværende adresse',
                intet: 'det nuværende arbejde',
                flertal: 'de nuværende regler',
                context: 'Kunderne kigger på den nuværende køreplan.'
            },
            wordB: {
                word: 'tidligere',
                x: 72, y: 62,
                itemLabel: 'Tidligere billet',
                faelles: 'den tidligere bolig',
                intet: 'det tidligere job',
                flertal: 'de tidligere priser',
                context: 'De tidligere billetter gælder ikke mere.'
            }
        },
        {
            id: 'par_8',
            wordA: {
                word: 'pludselig',
                x: 52, y: 82,
                itemLabel: 'Pludseligt stop',
                faelles: 'en pludselig lyd',
                intet: 'et pludseligt stop',
                flertal: 'de pludselige ændringer',
                context: 'Det var et pludseligt stop ved krydset.'
            },
            wordB: {
                word: 'gradvis',
                x: 35, y: 84,
                itemLabel: 'Gradvis fart',
                faelles: 'en gradvis stigning',
                intet: 'et gradvist fald',
                flertal: 'de gradvise forbedringer',
                context: 'Der er en gradvis stigning i billetprisen.'
            }
        },
        {
            id: 'par_9',
            wordA: {
                word: 'travl',
                x: 60, y: 55,
                itemLabel: 'Travl perron',
                faelles: 'en travl dag',
                intet: 'et travlt kontor',
                flertal: 'de travle gader',
                context: 'Perronen er meget travl om morgenen.'
            },
            wordB: {
                word: 'rolig',
                x: 15, y: 26,
                itemLabel: 'Rolig krog',
                faelles: 'en rolig aften',
                intet: 'et roligt sted',
                flertal: 'de rolige stunder',
                context: 'Manden sidder i et roligt hjørne og drikker kaffe.'
            }
        },
        {
            id: 'par_10',
            wordA: {
                word: 'forsinket',
                x: 80, y: 76,
                itemLabel: 'Forsinket bus',
                faelles: 'en forsinket bus',
                intet: 'et forsinket tog',
                flertal: 'de forsinkede passagerer',
                context: 'Toget til Odense er 10 minutter forsinket.'
            },
            wordB: {
                word: 'punktlig',
                x: 85, y: 18,
                itemLabel: 'Punktlig afgang',
                faelles: 'en punktlig chauffør',
                intet: 'et punktligt tog',
                flertal: 'de punktlige afgange',
                context: 'Toget til Odense er altid punktligt.'
            }
        }
    ];

    const alleOrdMap = {};
    adjektivPar.forEach(pair => {
        alleOrdMap[pair.wordA.word] = { me: pair.wordA, other: pair.wordB, pairId: pair.id };
        alleOrdMap[pair.wordB.word] = { me: pair.wordB, other: pair.wordA, pairId: pair.id };
    });

    // ========================================================
    // --- TAB 1: KONTRAST-STUDIET (VISUEL FLADE MED 20 HOTSPOTS)
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
    instructionText.innerHTML = `${renderDsIcon('lightbulb', '', { size: 18 })} <em>${getTranslation('adj_click_hotspot_hint')}</em>`;
    ctrlBar.appendChild(instructionText);

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-toggle-btn';
    pureBtn.innerHTML = `${renderDsIcon('image', '', { size: 16 })} ${getTranslation('adj_pure_label')} <strong id="pure-status-label">${getTranslation('adj_status_off')}</strong>`;
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
    stage.className = 'contrast-single-stage';
    stage.innerHTML = `<img src="assets/station_indkoeb_vrimmel.jpg" alt="Station og indkøb - Tid og tempo" />`;

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
        const lookupKey = (item.me.word === 'gammel' && item.pairId === 'par_2') ? 'gammel_2' : item.me.word;
        const wordTrans = adjektiverWordTranslations[lookupKey]?.[lang]
            || (lang !== 'da' ? adjektiverWordTranslations[lookupKey]?.['en'] : null);
        const transMeaning = wordTrans?.meaning;
        const transSentence = wordTrans?.sentence;

        detailCard.style.display = 'flex';
        detailCard.innerHTML = `
            <div class="adj-detail-header">
                <div class="adj-title-group">
                    <span class="adj-main-word">${item.me.word}</span>
                    ${transMeaning ? `<span class="adj-trans-meaning" style="font-size: 1.15rem; color: #fed7aa; font-weight: 600; margin-left: 0.6rem;">(${transMeaning})</span>` : ''}
                    <button class="adj-tts-btn" id="card-tts-btn">${renderDsIcon('volume', '', { size: 16 })} ${getTranslation('adj_listen_pronunciation')}</button>
                    <span style="color: #fed7aa; font-size: 0.95rem; margin-left: 0.5rem;">(${item.me.itemLabel})</span>
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
        stage.appendChild(dotA);

        const dotB = document.createElement('div');
        dotB.className = 'adj-hotspot';
        dotB.style.left = `${pair.wordB.x}%`;
        dotB.style.top = `${pair.wordB.y}%`;
        dotB.textContent = '●';
        dotB.title = `${pair.wordB.word} ➔ Modpol: ${pair.wordA.word}`;
        dotB.dataset.word = pair.wordB.word;
        dotB.onclick = () => selectAdjective(pair.wordB.word);
        stage.appendChild(dotB);
    });

    panelsHolder.appendChild(panelKontrast);

    // ========================================================
    // --- TAB 2: FIND MODPOLEN (ANTONYM-DUELLEN) ---
    // ========================================================
    const panelAntonym = document.createElement('div');
    panelAntonym.className = 'adj-panel';
    panelAntonym.dataset.panel = 'tab_antonym';

    const antonymDuels = [
        {
            stimulus: 'Manden købte en <strong>NY</strong> cykel i butikken.',
            question: 'Hvad er den cykel, han har haft i 15 år?',
            targetWord: 'ny',
            correct: 'gammel',
            options: ['gammel', 'sen', 'langsom', 'kortvarig'],
            wrongExplanation: 'Når noget er købt for nylig, er det nyt. Det modsatte af nyt er gammelt!',
            congruenceBonus: 'En <strong>ny</strong> cykel ↔ En <strong>gammel</strong> cykel (og et nyt ur ↔ et gammelt ur).'
        },
        {
            stimulus: 'Toget kører klokken 05:30 på en meget <strong>TIDLIG</strong> morgen.',
            question: 'Hvad er toget, der først kører klokken 23:45?',
            targetWord: 'tidlig',
            correct: 'sen',
            options: ['sen', 'langsom', 'rolig', 'ung'],
            wrongExplanation: 'Tidlig og sen handler om tidspunktet på døgnet.',
            congruenceBonus: 'En <strong>tidlig</strong> morgen ↔ En <strong>sen</strong> aften (et tidligt tog ↔ et sent tog).'
        },
        {
            stimulus: 'Lyntoget til Odense er meget <strong>HURTIGT</strong>.',
            question: 'Hvad er bussen, som holder for rødt lys hele tiden?',
            targetWord: 'hurtig',
            correct: 'langsom',
            options: ['langsom', 'forsinket', 'gammel', 'tidlig'],
            wrongExplanation: 'Forsinket betyder, at man kommer for sent. Men selve tempoet er langsomt!',
            congruenceBonus: 'En <strong>hurtig</strong> bus ↔ En <strong>langsom</strong> bus (et hurtigt tog ↔ et langsomt tog).'
        },
        {
            stimulus: 'Perronen på stationen er utrolig <strong>TRAVL</strong> klokken otte.',
            question: 'Hvad er ventesalen, hvor der næsten ingen mennesker er?',
            targetWord: 'travl',
            correct: 'rolig',
            options: ['rolig', 'sjælden', 'punktlig', 'kortvarig'],
            wrongExplanation: 'Når der ikke er stress og mange mennesker, er der roligt.',
            congruenceBonus: 'En <strong>travl</strong> dag ↔ En <strong>rolig</strong> dag (et travlt kontor ↔ et roligt kontor).'
        },
        {
            stimulus: 'Bussen kom 15 minutter for sent og var <strong>FORSINKET</strong>.',
            question: 'Hvad er toget, der ankommer præcis på sekundet?',
            targetWord: 'forsinket',
            correct: 'punktlig',
            options: ['punktlig', 'hurtig', 'ny', 'tidlig'],
            wrongExplanation: 'Når man overholder køreplanen præcist til tiden, er man punktlig!',
            congruenceBonus: 'En <strong>forsinket</strong> bus ↔ En <strong>punktlig</strong> bus (et forsinket tog ↔ et punktligt tog).'
        },
        {
            stimulus: 'Der kørte en <strong>UNG</strong> kvinde med bussen.',
            question: 'Hvad kalder man personen, der er 85 år gammel?',
            targetWord: 'ung',
            correct: 'gammel',
            options: ['gammel', 'sen', 'travl', 'tidligere'],
            wrongExplanation: 'Modpolen til ung i alder er gammel.',
            congruenceBonus: 'En <strong>ung</strong> person ↔ En <strong>gammel</strong> person (og de unge ↔ de gamle).'
        },
        {
            stimulus: 'Det var et <strong>KORTVARIGT</strong> stop på to minutter.',
            question: 'Hvad kalder man en ventetid på tre timer?',
            targetWord: 'kortvarig',
            correct: 'langvarig',
            options: ['langvarig', 'langsom', 'forsinket', 'hyppig'],
            wrongExplanation: 'Noget, der tager lang tid at gennemføre eller vente på, er langvarigt.',
            congruenceBonus: 'Et <strong>kortvarigt</strong> stop ↔ En <strong>langvarig</strong> ventetid.'
        },
        {
            stimulus: 'Metroen i byen har en <strong>HYPPIG</strong> afgang hvert andet minut.',
            question: 'Hvad er bussen, der kun kører én gang om dagen?',
            targetWord: 'hyppig',
            correct: 'sjælden',
            options: ['sjælden', 'forsinket', 'rolig', 'sen'],
            wrongExplanation: 'Noget, der sker tit, er hyppigt. Noget, der sker sjældent, har modsat frekvens!',
            congruenceBonus: 'En <strong>hyppig</strong> afgang ↔ En <strong>sjælden</strong> afgang.'
        },
        {
            stimulus: 'De kigger på den <strong>NUVÆRENDE</strong> køreplan for i år.',
            question: 'Hvad kalder man køreplanen fra sidste år?',
            targetWord: 'nuværende',
            correct: 'tidligere',
            options: ['tidligere', 'gammel', 'sen', 'forsinket'],
            wrongExplanation: 'Den der gælder nu er nuværende, og den førhenværende er tidligere.',
            congruenceBonus: 'Den <strong>nuværende</strong> adresse ↔ Den <strong>tidligere</strong> adresse.'
        },
        {
            stimulus: 'Toget standsede med et <strong>PLUDSELIGT</strong> ryk.',
            question: 'Hvad kalder man en forandring, der sker stille og roligt trin for trin?',
            targetWord: 'pludselig',
            correct: 'gradvis',
            options: ['gradvis', 'langsom', 'rolig', 'forsinket'],
            wrongExplanation: 'En gradvis ændring sker lidt efter lidt, modsat en pludselig hændelse.',
            congruenceBonus: 'Et <strong>pludseligt</strong> stop ↔ En <strong>gradvis</strong> opbremsning.'
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
                            <span style="display:inline-block; margin-top:0.5rem; color:#fed7aa;"><strong>Sætnings-par:</strong> ${formatNounLinks(item.congruenceBonus)}</span>
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
                                <div style="display: flex; justify-content: center; margin-bottom: 1rem;">${renderDsIcon('trophy', '', { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #FFFFFF;">Flot klaret i Antonym-duellen!</h2>
                                <p style="font-size: 1.15rem; color: #fed7aa; margin-bottom: 2rem;">Du fik <strong>${duelScore}</strong> ud af <strong>${antonymDuels.length}</strong> rigtige modpoler.</p>
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
    // --- TAB 3: SYNONYMER & NUANCER ---
    // ========================================================
    const panelSynonym = document.createElement('div');
    panelSynonym.className = 'adj-panel';
    panelSynonym.dataset.panel = 'tab_synonym';

    const synonymTasks = [
        {
            word: 'hurtig',
            sentence: 'Toget kørte utrolig <strong>HURTIGT</strong>.',
            question: 'Hvilket ord betyder ekstremt hurtigt?',
            correct: 'lynhurtig',
            options: ['lynhurtig', 'langsom', 'forsinket', 'tidlig'],
            explanation: '"Lynhurtig" betyder så hurtig som et lyn.'
        },
        {
            word: 'ny',
            sentence: 'Hun har købt en <strong>NY</strong> jakke i butikken.',
            question: 'Hvilket ord understreger, at den aldrig er brugt før?',
            correct: 'splinterny',
            options: ['splinterny', 'gammeldags', 'pæn', 'sjælden'],
            explanation: '"Splinterny" bruges om ting, der lige er pakket ud af æsken.'
        },
        {
            word: 'gammel',
            sentence: 'Slottet i byen er meget <strong>GAMMELT</strong>.',
            question: 'Hvilket ord betyder flere hundrede år gammelt?',
            correct: 'urgammel / antik',
            options: ['urgammel / antik', 'tidligere', 'langvarig', 'rolig'],
            explanation: '"Urgammel" og "antik" bruges om meget høj alder og historie.'
        },
        {
            word: 'rolig',
            sentence: 'Byen og gaden var helt <strong>ROLIG</strong> om natten.',
            question: 'Hvilket ord betyder næsten det samme som rolig?',
            correct: 'fredelig / stille',
            options: ['fredelig / stille', 'travl', 'hurtig', 'sen'],
            explanation: '"Fredelig" og "stille" beskriver en atmosfære uden støj og stress.'
        },
        {
            word: 'punktlig',
            sentence: 'Chaufføren ankommer altid <strong>PUNKTLIGT</strong> på minuttet.',
            question: 'Hvilket udtryk betyder det samme i daglig tale?',
            correct: 'præcis til tiden',
            options: ['præcis til tiden', 'tidligt om morgenen', 'i god behold', 'med det samme'],
            explanation: 'At være punktlig betyder præcis at overholde det aftalte klokkeslæt.'
        },
        {
            word: 'kortvarig',
            sentence: 'De holdt en <strong>KORTVARIG</strong> pause fra arbejdet.',
            question: 'Hvilket ord beskriver noget, der kun varer et lille øjeblik?',
            correct: 'midlertidig / kort',
            options: ['midlertidig / kort', 'uendelig', 'forsinket', 'travl'],
            explanation: '"Midlertidig" og "kort" betyder, at det kun eksisterer i en begrænset stund.'
        },
        {
            word: 'travl',
            sentence: 'Kontoret havde en meget <strong>TRAVL</strong> uge.',
            question: 'Hvilket ord betyder, at der er masser af pres og gøremål?',
            correct: 'hektisk',
            options: ['hektisk', 'rolig', 'tom', 'sjælden'],
            explanation: '"Hektisk" beskriver høj aktivitet med højt tempo og travlhed.'
        },
        {
            word: 'pludselig',
            sentence: 'Bilen bremsede med en <strong>PLUDSELIG</strong> bevægelse.',
            question: 'Hvilket ord betyder næsten det samme?',
            correct: 'uventet / brat',
            options: ['uventet / brat', 'gradvis', 'langvarig', 'rolig'],
            explanation: 'Et "brat" stop sker helt uden varsel og uventet.'
        },
        {
            word: 'hyppig',
            sentence: 'Der er <strong>HYPPIGE</strong> tog mellem byerne.',
            question: 'Hvilket ord betyder næsten det samme?',
            correct: 'tætte / regelmæssige',
            options: ['tætte / regelmæssige', 'sjældne', 'langsomme', 'enkelte'],
            explanation: 'Når togafgange er tætte og regelmæssige, afgår de hyppigt.'
        },
        {
            word: 'tidligere',
            sentence: 'Han mødte sin <strong>TIDLIGERE</strong> kollega på banegården.',
            question: 'Hvilket ord betyder det samme som tidligere?',
            correct: 'forhenværende',
            options: ['forhenværende', 'nuværende', 'kommende', 'punktlige'],
            explanation: '"Forhenværende" betyder en person eller stilling, man havde før i tiden.'
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
                                <div style="display: flex; justify-content: center; margin-bottom: 1rem;">${renderDsIcon('trophy', '', { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #FFFFFF;">Godt tidsordforråd!</h2>
                                <p style="font-size: 1.15rem; color: #fed7aa; margin-bottom: 2rem;">Du fik <strong>${synonymScore}</strong> ud af <strong>${synonymTasks.length}</strong> rigtige nuancer.</p>
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
    // --- TAB 4: BAROMETRET (SKALAER FOR TID OG HASTIGHED) ---
    // ========================================================
    const panelBarometer = document.createElement('div');
    panelBarometer.className = 'adj-panel';
    panelBarometer.dataset.panel = 'tab_barometer';

    const barometerChallenges = [
        {
            id: 'f2_s1',
            title: '🏃 Skala 1: Hastighed og tempo',
            desc: 'Arranger ordene efter hastighed fra langsomst til hurtigst:',
            lowLabel: '🐢 Langsomst',
            highLabel: '⚡ Hurtigst',
            correctOrder: ['sneglelangsom', 'langsom', 'moderat', 'hurtig', 'lynhurtig']
        },
        {
            id: 'f2_s2',
            title: '🎂 Skala 2: Alder',
            desc: 'Arranger ordene fra yngst til ældst:',
            lowLabel: '👶 Yngst',
            highLabel: '👴 Ældst',
            correctOrder: ['spæd', 'ung', 'midaldrende', 'gammel', 'urgammel']
        },
        {
            id: 'f2_s3',
            title: '⏳ Skala 3: Varighed',
            desc: 'Arranger begivenhederne fra kortest til længst varighed:',
            lowLabel: '⚡ Få sekunder',
            highLabel: '♾️ Meget lang tid',
            correctOrder: ['kortvarig', 'midlertidig', 'langvarig', 'permanent']
        },
        {
            id: 'f2_s4',
            title: '🔄 Skala 4: Hyppighed',
            desc: 'Arranger ordene efter hvor ofte noget sker:',
            lowLabel: '🚫 Næsten aldrig',
            highLabel: '🔁 Hele tiden',
            correctOrder: ['sjælden', 'lejlighedsvis', 'hyppig', 'konstant']
        },
        {
            id: 'f2_s5',
            title: '🎯 Skala 5: Punktlighed og præcision',
            desc: 'Arranger fra mest forsinket til absolut præcis:',
            lowLabel: '⚠️ Meget for sent',
            highLabel: '🎯 Lige til tiden',
            correctOrder: ['meget forsinket', 'lidt forsinket', 'rettidig', 'punktlig']
        },
        {
            id: 'f2_s6',
            title: '📅 Skala 6: Aktualitet',
            desc: 'Arranger stadierne i en proces fra fortid til nutid:',
            lowLabel: '📜 Fortid',
            highLabel: '📍 Lige nu',
            correctOrder: ['tidligere', 'forhenværende', 'aktuel', 'nuværende']
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

            <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
                <button class="task-next-btn" style="background:#475569;" id="reset-scale-btn">${getTranslation('adj_baro_reset_btn')}</button>
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
    // --- TAB 5: KONGRUENS-BYGGEREN (-T OG -E I TID) ---
    // ========================================================
    const panelKongruens = document.createElement('div');
    panelKongruens.className = 'adj-panel';
    panelKongruens.dataset.panel = 'tab_kongruens';

    const kongruensTasks = [
        {
            sentence: 'Vi nåede det ______ tog mod Aarhus.',
            correct: 'tidlige',
            options: ['tidlig', 'tidligt', 'tidlige'],
            rule: '<strong>Bestemt form (det ... tog):</strong> Når der står <em>det</em> foran, ender adjektivet altid på <strong>-e</strong>: <em>det tidlige tog</em> (ikke "tidligt"!).'
        },
        {
            sentence: 'Hun har købt et ______ ur i butikken.',
            correct: 'nyt',
            options: ['ny', 'nyt', 'nye'],
            rule: '<strong>Ubestemt intetkøn (et ur):</strong> Får <strong>-t</strong>: <em>et nyt ur</em> (en ny cykel).'
        },
        {
            sentence: 'Manden kørte i det ______ tog.',
            correct: 'hurtige',
            options: ['hurtig', 'hurtigt', 'hurtige'],
            rule: '<strong>Bestemt form (det ... tog):</strong> Får altid <strong>-e</strong>: <em>det hurtige tog</em>.'
        },
        {
            sentence: 'Toget til København var meget ______.',
            correct: 'hurtigt',
            options: ['hurtig', 'hurtigt', 'hurtige'],
            rule: '<strong>Prædikativ form (toget var...):</strong> Tog er intetkøn ("et tog") ➔ <em>toget var hurtigt</em> (bussen var hurtig).'
        },
        {
            sentence: 'Hvor er de ______ sko henne?',
            correct: 'nye',
            options: ['ny', 'nyt', 'nye'],
            rule: '<strong>Flertal (de sko):</strong> I flertal får adjektivet <strong>-e</strong>: <em>de nye sko</em>.'
        },
        {
            sentence: 'Manden boede i et ______ hus på landet.',
            correct: 'gammelt',
            options: ['gammel', 'gammelt', 'gamle'],
            rule: '<strong>Ubestemt intetkøn (et hus):</strong> Gammel hedder <em>gammelt</em> i intetkøn.'
        },
        {
            sentence: 'De to ______ venner gik en tur i parken.',
            correct: 'gamle',
            options: ['gammel', 'gammelt', 'gamle'],
            rule: '<strong>Flertal (to venner):</strong> Hedder <em>gamle</em> i flertal.'
        },
        {
            sentence: 'Vi ventede i en ______ pause.',
            correct: 'kortvarig',
            options: ['kortvarig', 'kortvarigt', 'kortvarige'],
            rule: '<strong>Ubestemt fælleskøn (en pause):</strong> Ingen endelse: <em>en kortvarig pause</em>.'
        },
        {
            sentence: 'Bussen var desværre ______ i morges.',
            correct: 'forsinket',
            options: ['forsinket', 'forsinkede', 'forsinketere'],
            rule: '<strong>Prædikativ ental (bussen var...):</strong> Fælleskøn ental: <em>bussen var forsinket</em> (busserne var forsinkede).'
        },
        {
            sentence: 'Alle togene var ______ på grund af sneen.',
            correct: 'forsinkede',
            options: ['forsinket', 'forsinkede', 'forsinketere'],
            rule: '<strong>Prædikativ flertal (togene var...):</strong> Flertal får altid <strong>-e</strong>: <em>togene var forsinkede</em>.'
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
            <div class="adj-grammar-link-box">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    ${renderDsIcon('bookOpen', '', { size: 28 })}
                    <div>
                        <div style="font-weight: 700; color: #FFFFFF; font-size: 1.05rem;">
                            ${getTranslation('adj_grammar_banner_title')}
                        </div>
                        <div style="color: #fed7aa; font-size: 0.92rem; margin-top: 0.2rem;">
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
                                    ${renderDsIcon('bookOpen', '', { size: 16 })} Læs hele reglen i bøjningsguiden her ➔
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
                                    ${renderDsIcon('bookOpen', '', { size: 16 })} Se bøjningsguiden for hjælp til -t og -e ➔
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
                                <div style="display: flex; justify-content: center; margin-bottom: 1rem;">${renderDsIcon('trophy', '', { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #FFFFFF;">Stærk tids-kongruens!</h2>
                                <p style="font-size: 1.15rem; color: #fed7aa; margin-bottom: 1.5rem;">Du fik <strong>${kongruensScore}</strong> ud af <strong>${kongruensTasks.length}</strong> rigtige endelser.</p>
                                <div style="margin-bottom: 2rem;">
                                    <button class="adj-go-grammar-btn" id="finish-guide-link-btn" style="margin: 0 auto;">
                                        ${renderDsIcon('bookOpen', '', { size: 16 })} Gå til den store bøjningsguide ➔
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
    // --- TAB 6: KONTEKST & HISTORIE ---
    // ========================================================
    const panelHistorie = document.createElement('div');
    panelHistorie.className = 'adj-panel';
    panelHistorie.dataset.panel = 'tab_historie';

    const historieTasks = [
        {
            story: 'Klokken er kun 05:00 om morgenen, og gaden er mørk. Det er en meget ______ morgen.',
            correct: 'tidlig',
            options: ['tidlig', 'sen', 'hurtig', 'ung'],
            explanation: 'Fem om morgenen er et meget tidligt tidspunkt på døgnet.'
        },
        {
            story: 'Toget skulle have kørt klokken 14:10, men det kører først 14:40. Toget er ______.',
            correct: 'forsinket',
            options: ['forsinket', 'punktligt', 'tidligt', 'roligt'],
            explanation: 'Når et tog kører en halv time for sent, er det forsinket.'
        },
        {
            story: 'Lyntoget stopper ikke i de små byer. Det er et meget ______ tog.',
            correct: 'hurtigt',
            options: ['hurtigt', 'langsomt', 'gammelt', 'tidligt'],
            explanation: 'Et lyntog kører hurtigt forbi de små stationer.'
        },
        {
            story: 'Han har arbejdet som læge i 40 år. Han er en ______ mand nu.',
            correct: 'gammel',
            options: ['gammel', 'ung', 'ny', 'kortvarig'],
            explanation: 'Efter 40 års arbejde er man en ældre eller gammel mand.'
        },
        {
            story: 'Mange mennesker løber for at nå deres tog på banegården. Der er meget ______.',
            correct: 'travlt',
            options: ['travlt', 'roligt', 'sjældent', 'forsinket'],
            explanation: 'Når folk løber frem og tilbage, er der travlt på stationen.'
        },
        {
            story: 'Kaffen på bordet blev kold under mødet, fordi mødet var meget ______.',
            correct: 'langvarigt',
            options: ['langvarigt', 'kortvarigt', 'hurtigt', 'punktligt'],
            explanation: 'Et langvarigt møde tager mange timer.'
        },
        {
            story: 'Bussen kører hvert femte minut hele dagen. Det er en meget ______ afgang.',
            correct: 'hyppig',
            options: ['hyppig', 'sjælden', 'rolig', 'tidlig'],
            explanation: 'Afgange hvert 5. minut er særdeles hyppige.'
        },
        {
            story: 'Toget standsede med ét stort brag, helt uden varsel. Det var et ______ stop.',
            correct: 'pludseligt',
            options: ['pludseligt', 'gradvist', 'roligt', 'langsomt'],
            explanation: 'Et stop uden varsel kaldes et pludseligt stop.'
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
                                <div style="display: flex; justify-content: center; margin-bottom: 1rem;">${renderDsIcon('trophy', '', { size: 56 })}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; color: #FFFFFF;">Super flot forståelse af tid og tempo!</h2>
                                <p style="font-size: 1.15rem; color: #fed7aa; margin-bottom: 2rem;">Du fik <strong>${storyScore}</strong> ud af <strong>${historieTasks.length}</strong> rigtige svar.</p>
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
