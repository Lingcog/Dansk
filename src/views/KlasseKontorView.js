import { getTranslation, getLang } from '../utils/i18n.js';
import { klasseWordTranslations } from '../utils/top100_translations.js';
import { shuffleArray } from '../utils/shuffle.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getGrammarSlotHint, renderPuzzleSlotInnerHtml, renderPuzzleSlotFilledHtml } from '../utils/puzzle_slot_hints.js';
import {
    getSubstantivInstruction,
    getSubstantivCategoryQuestion,
    getSubstantivContextTranslation,
    getSubstantivQuestionPromptTranslation
} from '../utils/substantiv_saetningsbygger_translations.js';

function stripLeadingEmoji(text) {
    if (!text) return '';
    return text.replace(/^[\p{Extended_Pictographic}\s\uFE0F]+/u, '').trim();
}

/**
 * KlasseKontorView - Didaktisk vrimlebillede for semantisk felt: Undervisningslokalet og kontoret
 * Dækker centrale højfrekvente substantiver om læring, sprog, teknologi og arbejde.
 */
export function renderKlasseKontorView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container klasse-vrimmel-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('top100_substantiver');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper
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
        .klasse-vrimmel-view {
            --by-bg: #4A040B;
            --by-surface: #073518;
            --by-surface-hover: #0c4f24;
            --by-surface-input: #02220e;
            --by-border: #136832;
            --by-border-light: #1b793c;
            --by-primary: #22c55e;
            --by-text: #FFFFFF;
            --by-text-muted: #a7f3d0;
            --by-text-subtle: #86efac;

            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .klasse-vrimmel-view .ds-icon-emoji {
            display: none !important;
        }
        .klasse-vrimmel-view .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }
        .klasse-vrimmel-view .ds-icon-svg svg {
            display: inline-block;
            vertical-align: middle;
            stroke: currentColor;
        }

        .klasse-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .klasse-hero-header h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: #FFFFFF !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #FFFFFF !important;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
        }
        .klasse-hero-header p {
            color: #FFFFFF !important;
            font-size: 1.1rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
            opacity: 0.95;
        }

        /* Tabs Navigation */
        .klasse-tabs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 2rem;
            background: var(--by-surface, #073518);
            padding: 0.5rem;
            border-radius: 16px;
            border: 1px solid var(--by-border, #136832);
        }
        .klasse-tab-btn {
            background: transparent;
            color: var(--by-text-muted, #a7f3d0);
            border: none;
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .klasse-tab-btn:hover {
            color: white;
            background: var(--by-surface-hover, #0c4f24);
        }
        .klasse-tab-btn.active {
            background: var(--by-primary, #22c55e);
            color: #02220e;
            font-weight: 800;
            box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);
        }

        /* Panels */
        .klasse-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .klasse-panel.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Stage Card */
        .vrimmel-card {
            background: var(--by-surface, #073518);
            border: 1px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        .radar-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--by-border, #136832);
        }
        .pure-image-toggle-btn {
            background: var(--by-surface-input, #02220e);
            color: var(--by-text);
            border: 2px solid var(--by-border, #136832);
            padding: 0.6rem 1.3rem;
            border-radius: 25px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .pure-image-toggle-btn:hover {
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
        }
        .pure-image-toggle-btn.active {
            background: linear-gradient(135deg, #15803d, #22c55e);
            border-color: #86efac;
            box-shadow: 0 0 18px rgba(34, 197, 94, 0.5);
            color: white;
        }
        .vrimmel-stage.pure-mode .vrimmel-hotspot {
            display: none !important;
        }

        /* Stage */
        .vrimmel-stage {
            position: relative;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            line-height: 0;
            background: var(--by-surface-input, #02220e);
        }
        .vrimmel-img {
            width: 100%;
            height: auto;
            display: block;
            user-select: none;
        }
        .vrimmel-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.75rem;
            border: 2px solid white;
            transition: all 0.25s ease;
            z-index: 10;
            background: rgba(7, 53, 24, 0.85);
            color: #f8fafc;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }
        .vrimmel-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.3);
            z-index: 20;
            background: var(--by-primary, #22c55e);
            color: #02220e;
        }

        /* Detail card */
        .hotspot-detail-card {
            background: var(--by-surface, #073518);
            border: 1px solid var(--by-border, #136832);
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
            flex-wrap: wrap;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .detail-word-badge {
            display: inline-block;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }
        .badge-substantiv {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid #22c55e;
            padding: 0.35rem 0.8rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            display: inline-block;
            margin-bottom: 0.5rem;
            margin-right: 0.4rem;
        }
        .badge-en { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid #0284c7; }
        .badge-et { background: rgba(249, 115, 22, 0.2); color: #fb923c; border: 1px solid #ea580c; }
        .detail-main-word { font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.3rem; }
        .detail-forms { font-size: 0.95rem; color: var(--by-text-muted, #a7f3d0); margin-bottom: 0.5rem; }
        .detail-sentence { font-size: 1.05rem; color: #e2e8f0; font-style: italic; }
        .listen-word-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .listen-word-btn:hover { background: #1d4ed8; transform: scale(1.05); }
        .mic-speak-btn {
            background: var(--by-surface-input, #02220e);
            color: #f8fafc;
            border: 2px solid var(--by-border, #136832);
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .mic-speak-btn:hover {
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
        }
        .mic-speak-btn.listening {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            animation: micGlow 1.2s infinite ease-in-out;
        }
        @keyframes micGlow {
            0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.4); transform: scale(1); }
            50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.8); transform: scale(1.05); }
        }
        .speech-feedback-box {
            width: 100%;
            margin-top: 0.6rem;
            font-size: 0.95rem;
            font-weight: 600;
            padding: 0.5rem 0.8rem;
            border-radius: 8px;
            display: none;
        }
        .speech-feedback-box.correct {
            display: block;
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            border: 1px solid #22c55e;
        }
        .speech-feedback-box.incorrect {
            display: block;
            background: rgba(249, 115, 22, 0.15);
            color: #fb923c;
            border: 1px solid #ea580c;
        }
        .speech-feedback-box.listening {
            display: block;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border: 1px solid #0284c7;
        }
        @keyframes shakeBin {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
        }
        .bin-shake {
            animation: shakeBin 0.4s ease;
            border-color: #ef4444 !important;
        }

        /* Sorting Game */
        .sorting-game-box {
            background: var(--by-surface, #073518);
            border: 1px solid var(--by-border, #136832);
            border-radius: 18px;
            padding: 1.5rem;
            margin-top: 2rem;
        }
        .sorting-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.2rem;
        }
        .sort-progress-badge {
            background: rgba(34, 197, 94, 0.2);
            color: var(--by-text-subtle, #86efac);
            border: 1px solid var(--by-border-light, #1b793c);
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.9rem;
        }
        .bins-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .sort-bin {
            border-radius: 16px;
            padding: 1.2rem;
            min-height: 200px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .bin-en { background: rgba(2, 132, 199, 0.12); border: 2px dashed #0284c7; }
        .bin-en:hover { background: rgba(2, 132, 199, 0.22); }
        .bin-et { background: rgba(234, 88, 12, 0.12); border: 2px dashed #ea580c; }
        .bin-et:hover { background: rgba(234, 88, 12, 0.22); }
        .bin-title { font-size: 1.15rem; font-weight: 800; margin-bottom: 0.8rem; text-align: center; }
        .bin-title-en { color: #38bdf8; }
        .bin-title-et { color: #fb923c; }
        .bin-items-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .chip-in-bin {
            background: var(--by-surface-input, #02220e);
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            color: white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border: 1px solid var(--by-border, #136832);
        }
        .words-bank-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            background: var(--by-surface-input, #02220e);
            padding: 1.2rem;
            border-radius: 14px;
            border: 1px solid var(--by-border, #136832);
        }
        .sort-word-chip {
            background: var(--by-surface, #073518);
            color: white;
            border: 2px solid var(--by-border, #136832);
            padding: 0.5rem 1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sort-word-chip:hover { background: var(--by-surface-hover, #0c4f24); transform: translateY(-2px); }
        .sort-word-chip.selected { border-color: var(--by-primary, #22c55e); box-shadow: 0 0 14px rgba(34, 197, 94, 0.6); background: var(--by-surface-hover, #0c4f24); }
        .sort-word-chip.placed { opacity: 0.35; pointer-events: none; background: #02220e; text-decoration: line-through; }
        .reset-sort-btn {
            background: #475569; color: white; border: none; padding: 0.6rem 1.2rem;
            border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
        }
        .reset-sort-btn:hover { background: #64748b; }

        /* Detective Cards */
        .mission-card {
            background: var(--by-surface, #073518);
            border: 1px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        .mission-badge {
            display: inline-block; background: #f59e0b; color: #000; font-weight: 800;
            font-size: 0.85rem; padding: 0.3rem 0.8rem; border-radius: 20px; text-transform: uppercase; margin-bottom: 0.6rem;
        }
        .clues-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;
        }
        .clue-btn {
            background: var(--by-surface-input, #02220e); border: 2px solid var(--by-border, #136832); color: white; padding: 1.2rem;
            border-radius: 14px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.25s ease;
            text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .clue-btn:hover { border-color: var(--by-primary, #22c55e); transform: translateY(-3px); }
        .clue-btn.selected-correct { background: rgba(34, 197, 94, 0.25); border-color: #22c55e; color: #4ade80; }
        .clue-btn.selected-wrong { background: rgba(239, 68, 68, 0.25); border-color: #ef4444; color: #f87171; }
        .mission-next-btn {
            background: var(--by-primary, #22c55e); color: #02220e; font-weight: 800; border: none; padding: 0.8rem 1.6rem;
            border-radius: 12px; font-size: 1rem; cursor: pointer; transition: all 0.2s ease;
        }

        /* Micro-story */
        .story-container {
            max-width: 800px; margin: 0 auto; background: var(--by-surface, #073518);
            border: 1px solid var(--by-border, #136832); border-radius: 20px; padding: 2rem;
        }
        .story-nav-pills {
            display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.8rem;
        }
        .story-nav-btn {
            background: var(--by-surface-input, #02220e); color: var(--by-text-muted, #a7f3d0); border: 2px solid var(--by-border, #136832); padding: 0.6rem 1.2rem;
            border-radius: 12px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease;
        }
        .story-nav-btn:hover { border-color: var(--by-primary, #22c55e); color: white; transform: translateY(-2px); }
        .story-nav-btn.active {
            background: var(--by-primary, #22c55e); color: #02220e; border-color: var(--by-border-light, #1b793c); font-weight: 800; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);
        }
        .story-step-card {
            background: var(--by-surface-input, #02220e); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 5px solid var(--by-primary, #22c55e);
            transition: all 0.3s ease;
        }
        .story-options-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.8rem; }
        .story-opt-btn {
            background: var(--by-surface, #073518); color: white; border: 1px solid var(--by-border, #136832); padding: 0.6rem 1.2rem;
            border-radius: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
        }
        .story-opt-btn:hover { background: var(--by-surface-hover, #0c4f24); }
        .story-opt-btn.correct { background: #22c55e !important; color: #0f172a; }
        .story-opt-btn.wrong { background: #ef4444 !important; color: white; }
        .story-explanation-box {
            background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; border-radius: 14px;
            padding: 1.2rem; margin-top: 1.5rem; font-size: 1rem; color: #4ade80; text-align: center;
        }

        /* Overemne & Underemne (Model C) */
        .category-card {
            max-width: 800px; margin: 0 auto; background: var(--by-surface, #073518);
            border: 1px solid var(--by-border, #136832); border-radius: 20px; padding: 2rem;
            text-align: center;
        }
        .category-badge {
            display: inline-block; background: #8b5cf6; color: white; font-weight: 800;
            font-size: 0.85rem; padding: 0.35rem 0.9rem; border-radius: 20px; text-transform: uppercase;
            letter-spacing: 0.5px; margin-bottom: 0.8rem;
        }
        .category-subwords-row {
            display: flex; justify-content: center; gap: 0.8rem; flex-wrap: wrap; margin: 1.2rem 0 1.6rem;
        }
        .category-word-chip {
            background: var(--by-surface-input, #02220e); border: 2px solid var(--by-primary, #22c55e); color: #f8fafc;
            padding: 0.6rem 1.2rem; border-radius: 12px; font-weight: 700; font-size: 1.1rem;
        }
        .category-options-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.2rem;
        }
        .category-opt-btn {
            background: var(--by-surface-input, #02220e); border: 2px solid var(--by-border, #136832); color: white; padding: 1.1rem;
            border-radius: 14px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
            text-align: center;
        }
        .category-opt-btn:hover { border-color: var(--by-primary, #22c55e); transform: translateY(-2px); }
        .category-opt-btn.selected-correct {
            background: rgba(34, 197, 94, 0.25) !important; border-color: #22c55e !important; color: #4ade80 !important;
        }
        .category-opt-btn.selected-wrong {
            background: rgba(239, 68, 68, 0.25) !important; border-color: #ef4444 !important; color: #f87171 !important;
        }

        /* =========================================
           TAB 5: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
           ========================================= */
        .sentence-builder-card {
            max-width: 960px;
            margin: 0 auto;
            background: var(--by-surface, #073518);
            border: 1px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* Sub-navigation for Tab 5 */
        .sb-sub-nav {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--by-border, #136832);
            padding-bottom: 1rem;
            flex-wrap: wrap;
        }
        .sb-sub-btn {
            background: var(--by-surface-input, #02220e);
            color: var(--by-text-muted, #a7f3d0);
            border: 1px solid var(--by-border, #136832);
            padding: 0.75rem 1.4rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-sub-btn:hover {
            color: white;
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
        }
        .sb-sub-btn.active {
            background: var(--by-primary, #22c55e);
            color: #02220e;
            font-weight: 800;
            border-color: var(--by-border-light, #1b793c);
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }

        /* Grammar Legend */
        .grammar-legend-bar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            margin-bottom: 1.5rem;
            padding: 0.6rem 1rem;
            background: var(--by-surface-input, #02220e);
            border-radius: 12px;
            border: 1px solid var(--by-border, #136832);
            font-size: 0.85rem;
        }
            margin-bottom: 1.5rem;
            padding: 0.6rem 1rem;
            background: rgba(15, 23, 42, 0.7);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.85rem;
        }
        .grammar-legend-item { display: flex; align-items: center; gap: 0.4rem; }
        .legend-chip { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
        .chip-substantiv { background: #22c55e; box-shadow: 0 0 6px rgba(34, 197, 94, 0.6); }
        .chip-verbum { background: #ef4444; box-shadow: 0 0 6px rgba(239, 68, 68, 0.6); }
        .chip-adjektiv { background: #f97316; box-shadow: 0 0 6px rgba(249, 115, 22, 0.6); }
        .chip-sted { background: #0284c7; box-shadow: 0 0 6px rgba(2, 132, 199, 0.6); }
        .chip-tid { background: #8b5cf6; box-shadow: 0 0 6px rgba(139, 92, 246, 0.6); }

        /* Free Builder Styles */
        .sb-category-row {
            margin-bottom: 1.3rem;
            background: rgba(15, 23, 42, 0.45);
            border-radius: 14px;
            padding: 1rem 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-left: 4px solid #64748b;
        }
        .sb-cat-subjekt { border-left-color: #22c55e; }
        .sb-cat-verbum { border-left-color: #ef4444; }
        .sb-cat-objekt { border-left-color: #22c55e; }
        .sb-cat-sted { border-left-color: #0284c7; }

        .sb-category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.7rem;
            flex-wrap: wrap;
            gap: 0.4rem;
        }
        .sb-category-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-category-badge {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
        }
        .badge-cat-subjekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .badge-cat-verbum { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-cat-objekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .badge-cat-sted { background: rgba(2, 132, 199, 0.15); color: #60a5fa; border: 1px solid rgba(2, 132, 199, 0.3); }

        .sb-chips-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .sb-chip-btn {
            background: #1e293b;
            color: #cbd5e1;
            border: 1px solid #475569;
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-chip-btn:hover {
            color: white;
            border-color: #94a3b8;
            transform: translateY(-2px);
        }
        .sb-chip-btn.selected {
            font-weight: 800;
            transform: translateY(-2px);
        }
        /* Løsning 1: Højkontrast solide chips */
        .sb-category-row.sb-cat-subjekt .sb-chip-btn.selected,
        .sb-category-row.sb-cat-objekt .sb-chip-btn.selected {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            color: #FFFFFF !important;
            border-color: #86efac !important;
            font-weight: 800 !important;
            box-shadow: 0 4px 14px rgba(22, 163, 74, 0.45) !important;
        }
        .sb-category-row.sb-cat-verbum .sb-chip-btn.selected {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            color: #FFFFFF !important;
            border-color: #fca5a5 !important;
            font-weight: 800 !important;
            box-shadow: 0 4px 14px rgba(220, 38, 38, 0.45) !important;
        }
        .sb-category-row.sb-cat-sted .sb-chip-btn.selected {
            background: linear-gradient(135deg, #0284c7, #0369a1) !important;
            color: #FFFFFF !important;
            border-color: #93c5fd !important;
            font-weight: 800 !important;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.45) !important;
        }

        /* Live Result Box */
        .sb-live-box {
            background: #0f172a;
            border: 2px solid #334155;
            border-radius: 16px;
            padding: 1.4rem;
            margin-top: 1.5rem;
            text-align: center;
        }
        .sb-live-label {
            font-size: 0.8rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.6rem;
            font-weight: 700;
        }
        .sb-live-sentence {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .grammar-word { font-weight: 800; }
        .word-substantiv { color: #4ade80; }
        .word-verbum { color: #f87171; }
        .word-adjektiv { color: #fb923c; }
        .word-sted { color: #60a5fa; }
        .word-tid { color: #c084fc; }

        .sb-listen-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 1px solid #38bdf8;
            padding: 0.65rem 1.4rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-listen-btn:hover {
            background: rgba(56, 189, 248, 0.15);
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
            transform: scale(1.03);
        }

        /* Challenge / Task Mode */
        .sb-task-container {
            animation: fadeIn 0.3s ease;
        }
        .sb-task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .sb-task-pills {
            display: flex;
            gap: 0.35rem;
            flex-wrap: wrap;
        }
        .sb-task-pill {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid #475569;
            font-size: 0.8rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .sb-task-pill.active {
            border-color: #38bdf8;
            color: white;
            background: #0284c7;
        }
        .sb-task-pill.done {
            background: #22c55e;
            color: #0f172a;
            border-color: #22c55e;
        }

        /* Step 1: Semantic Match */
        .sb-context-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .sb-context-title {
            font-size: 1.05rem;
            color: #94a3b8;
            margin-bottom: 0.8rem;
        }
        .sb-context-elements {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 0.8rem;
        }
        .sb-context-chip {
            padding: 0.5rem 0.9rem;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.95rem;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
        }
        .sb-context-chip.subjekt { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .sb-context-chip.verbum { background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }
        .sb-context-chip.sted { background: rgba(2, 132, 199, 0.15); color: #93c5fd; border: 1px solid rgba(2, 132, 199, 0.3); }
        .sb-chip-role { font-size: 0.72rem; text-transform: uppercase; opacity: 0.8; }

        .sb-question-box {
            background: rgba(56, 189, 248, 0.08);
            border: 1px solid rgba(56, 189, 248, 0.25);
            border-radius: 12px;
            padding: 1rem 1.3rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .sb-question-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
        }
        .sb-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.8rem;
            margin-bottom: 1.5rem;
        }
        .sb-option-btn {
            background: #1e293b;
            color: white;
            border: 2px solid #475569;
            padding: 1rem 1.2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .sb-option-btn:hover {
            border-color: #38bdf8;
            background: #334155;
            transform: translateY(-2px);
        }
        .sb-option-btn.correct {
            background: rgba(34, 197, 94, 0.25);
            border-color: #22c55e;
            color: #4ade80;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
        }
        .sb-option-btn.incorrect {
            background: rgba(239, 68, 68, 0.2);
            border-color: #ef4444;
            color: #f87171;
            animation: shakeBin 0.4s ease;
        }

        /* Step 2: Puzzle */
        .sb-puzzle-section {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            animation: fadeIn 0.35s ease;
        }
        .sb-puzzle-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 0.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sb-puzzle-desc {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 1.2rem;
        }
        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .sb-puzzle-slot {
            background: #0b1329;
            border: 2px dashed #475569;
            border-radius: 14px;
            padding: 1rem 0.8rem;
            min-height: 104px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.25s ease;
            text-align: center;
            position: relative;
            box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.25);
        }
        .sb-puzzle-slot.slot-0 {
            border-color: rgba(34, 197, 94, 0.55);
            background: linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, rgba(11, 19, 41, 0.95) 100%);
        }
        .sb-puzzle-slot.slot-1 {
            border-color: rgba(239, 68, 68, 0.55);
            background: linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(11, 19, 41, 0.95) 100%);
        }
        .sb-puzzle-slot.slot-2 {
            border-color: rgba(34, 197, 94, 0.55);
            background: linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, rgba(11, 19, 41, 0.95) 100%);
        }
        .sb-puzzle-slot.slot-3 {
            border-color: rgba(56, 189, 248, 0.55);
            background: linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, rgba(11, 19, 41, 0.95) 100%);
        }

        .sb-puzzle-slot .slot-hint {
            font-size: 1.15rem;
            color: #ffffff;
            font-weight: 800;
            line-height: 1.25;
            letter-spacing: -0.2px;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
        }
        .sb-puzzle-slot .slot-trans {
            font-size: 0.92rem;
            font-weight: 600;
            line-height: 1.25;
            margin-top: 0.2rem;
            letter-spacing: 0.2px;
        }
        .sb-puzzle-slot.slot-0 .slot-trans { color: #86efac; }
        .sb-puzzle-slot.slot-1 .slot-trans { color: #fca5a5; }
        .sb-puzzle-slot.slot-2 .slot-trans { color: #86efac; }
        .sb-puzzle-slot.slot-3 .slot-trans { color: #7dd3fc; }

        .sb-puzzle-slot .slot-role {
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-top: 0.35rem;
            font-weight: 800;
            opacity: 0.9;
        }
        .sb-puzzle-slot.slot-0 .slot-role { color: #4ade80; }
        .sb-puzzle-slot.slot-1 .slot-role { color: #f87171; }
        .sb-puzzle-slot.slot-2 .slot-role { color: #4ade80; }
        .sb-puzzle-slot.slot-3 .slot-role { color: #38bdf8; }

        /* Løsning 1: Højkontrast solide slots */
        .sb-puzzle-slot.filled {
            border-style: solid !important;
            color: #FFFFFF !important;
        }
        .sb-puzzle-slot.filled.slot-0,
        .sb-puzzle-slot.filled.slot-2 {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            border-color: #86efac !important;
            box-shadow: 0 4px 16px rgba(22, 163, 74, 0.5) !important;
        }
        .sb-puzzle-slot.filled.slot-1 {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            border-color: #fca5a5 !important;
            box-shadow: 0 4px 16px rgba(220, 38, 38, 0.5) !important;
        }
        .sb-puzzle-slot.filled.slot-3 {
            background: linear-gradient(135deg, #0284c7, #0369a1) !important;
            border-color: #93c5fd !important;
            box-shadow: 0 4px 16px rgba(2, 132, 199, 0.5) !important;
        }
        .sb-puzzle-slot.filled .sb-puzzle-slot-role {
            color: #FFFFFF !important;
            opacity: 0.9 !important;
        }
        .sb-puzzle-slot.filled .sb-puzzle-slot-text {
            color: #FFFFFF !important;
            font-weight: 800 !important;
        }
        .sb-puzzle-slot.filled .slot-remove {
            position: absolute;
            top: 6px;
            right: 8px;
            font-size: 0.85rem;
            color: #FFFFFF;
            transition: color 0.2s;
        }
        .sb-puzzle-slot.filled:hover .slot-remove {
            color: #fca5a5;
        }

        @media (max-width: 640px) {
            .sb-puzzle-slots {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.6rem;
            }
            .sb-puzzle-slot {
                min-height: 96px;
                padding: 0.8rem 0.5rem;
            }
            .sb-puzzle-slot .slot-hint {
                font-size: 1.05rem;
            }
            .sb-puzzle-slot .slot-trans {
                font-size: 0.85rem;
            }
            .sb-puzzle-slot .slot-role {
                font-size: 0.72rem;
            }
        }

        .sb-puzzle-bank {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            justify-content: center;
            margin-bottom: 1.2rem;
            padding: 1rem;
            background: var(--by-surface-input, #02220e);
            border: 1px solid var(--by-border, #136832);
            border-radius: 12px;
            min-height: 60px;
        }
        .sb-puzzle-chip {
            background: var(--by-surface, #073518);
            color: white;
            border: 2px solid var(--by-border, #136832);
            padding: 0.65rem 1.2rem;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-puzzle-chip:hover {
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
            transform: translateY(-2px);
        }
        .sb-puzzle-chip.placed {
            opacity: 0.25;
            pointer-events: none;
            cursor: default;
        }
        .sb-feedback-box {
            margin-top: 1rem;
            text-align: center;
        }
        .sb-feedback-msg {
            padding: 0.8rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1.05rem;
            margin-bottom: 0.8rem;
            display: inline-block;
        }
        .sb-feedback-msg.success {
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid #22c55e;
        }
        .sb-feedback-msg.error {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border: 1px solid #ef4444;
        }
        .sb-action-row {
            display: flex;
            justify-content: center;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-top: 0.6rem;
        }
        .sb-action-btn {
            background: var(--by-primary, #22c55e);
            color: #02220e;
            border: none;
            padding: 0.7rem 1.4rem;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .sb-action-btn:hover {
            background: #4ade80;
            transform: translateY(-2px);
        }
    `;
    viewContainer.appendChild(style);

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'klasse-hero-header';
    const cleanHeroTitle = stripLeadingEmoji(getTranslation('klasse_hero_title')) || 'Undervisningslokalet og kontoret';
    heroHeader.innerHTML = `
        <h1><span class="klasse-hero-icon">${renderDsIcon('graduationCap', '', { size: 30 })}</span> <span>${cleanHeroTitle}</span></h1>
        <p>${getTranslation('klasse_hero_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'klasse-tabs';
    const tabs = [
        { id: 'tab_vrimmel', label: getTranslation('tab_label_vrimmel'), icon: renderDsIcon('search', '', { size: 16 }) },
        { id: 'tab_detektiv', label: getTranslation('tab_label_detektiv'), icon: renderDsIcon('eye', '', { size: 16 }) },
        { id: 'tab_historie', label: getTranslation('tab_label_historie'), icon: renderDsIcon('thought', '', { size: 16 }) },
        { id: 'tab_kontekst', label: getTranslation('tab_label_kontekst'), icon: renderDsIcon('layers', '', { size: 16 }) },
        { id: 'tab_saetning', label: getTranslation('tab_label_saetning'), icon: renderDsIcon('edit', '', { size: 16 }) }
    ];

    let currentTab = 'tab_vrimmel';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `klasse-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span class="klasse-tab-icon">${t.icon}</span> <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/klasse_kontor/' + tabId);
        tabsMenu.querySelectorAll('.klasse-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.klasse-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- 24 NØGLEORD I UNDERVISNINGSLOKALET OG KONTORET
    // ========================================================
    const klasseWords = [
        { word: 'et billede', clean: 'billede', gender: 'et', bestemt: 'billedet', flertal: 'billeder', x: 9, y: 35, iconName: 'image', sentence: 'Der hænger et billede på væggen.' },
        { word: 'en lampe', clean: 'lampe', gender: 'en', bestemt: 'lampen', flertal: 'lamper', x: 26, y: 16, iconName: 'lightbulb', sentence: 'Lampen giver lys.' },
        { word: 'et ur', clean: 'ur', gender: 'et', bestemt: 'uret', flertal: 'ure', x: 42.5, y: 19, iconName: 'clock', sentence: 'Uret hænger på væggen.' },
        { word: 'en tavle', clean: 'tavle', gender: 'en', bestemt: 'tavlen', flertal: 'tavler', x: 33, y: 41, iconName: 'edit', sentence: 'Læreren skriver på tavlen.' },
        { word: 'et sprog', clean: 'sprog', gender: 'et', bestemt: 'sproget', flertal: 'sprog', x: 38, y: 34, iconName: 'globe', sentence: 'Kursisterne lærer dansk.' },
        { word: 'et spørgsmål', clean: 'spørgsmål', gender: 'et', bestemt: 'spørgsmålet', flertal: 'spørgsmål', x: 23.5, y: 36, iconName: 'thought', sentence: 'Eleven stiller et spørgsmål.' },
        { word: 'en elev', clean: 'elev', gender: 'en', bestemt: 'eleven', flertal: 'elever', x: 22, y: 53, iconName: 'user', sentence: 'En elev rækker hånden op.' },
        { word: 'en lærer', clean: 'lærer', gender: 'en', bestemt: 'læreren', flertal: 'lærere', x: 54.5, y: 45, iconName: 'graduationCap', sentence: 'En lærer underviser klassen.' },
        { word: 'et svar', clean: 'svar', gender: 'et', bestemt: 'svaret', flertal: 'svar', x: 61, y: 29, iconName: 'check', sentence: 'Læreren kender svaret.' },
        { word: 'en bog', clean: 'bog', gender: 'en', bestemt: 'bogen', flertal: 'bøger', x: 19.5, y: 67, iconName: 'bookOpen', sentence: 'Han læser i en bog.' },
        { word: 'et bord', clean: 'bord', gender: 'et', bestemt: 'bordet', flertal: 'borde', x: 23, y: 73, iconName: 'home', sentence: 'Bogen ligger på bordet.' },
        { word: 'en stol', clean: 'stol', gender: 'en', bestemt: 'stolen', flertal: 'stole', x: 9, y: 75, iconName: 'home', sentence: 'Kursisten sidder på en stol.' },
        { word: 'et papir', clean: 'papir', gender: 'et', bestemt: 'papiret', flertal: 'papirer', x: 39, y: 70, iconName: 'fileText', sentence: 'Hun skriver på et papir.' },
        { word: 'en opgave', clean: 'opgave', gender: 'en', bestemt: 'opgaven', flertal: 'opgaver', x: 34, y: 64, iconName: 'edit', sentence: 'Hun løser en opgave.' },
        { word: 'en blyant', clean: 'blyant', gender: 'en', bestemt: 'blyanten', flertal: 'blyanter', x: 43, y: 71.5, iconName: 'edit', sentence: 'Han skriver med en blyant.' },
        { word: 'en telefon', clean: 'telefon', gender: 'en', bestemt: 'telefonen', flertal: 'telefoner', x: 46, y: 71, iconName: 'smartphone', sentence: 'Telefonen ligger på bordet.' },
        { word: 'en taske', clean: 'taske', gender: 'en', bestemt: 'tasken', flertal: 'tasker', x: 50, y: 90, iconName: 'tag', sentence: 'Tasken står på gulvet.' },
        { word: 'et arbejde', clean: 'arbejde', gender: 'et', bestemt: 'arbejdet', flertal: 'arbejder', x: 70, y: 47, iconName: 'fileText', sentence: 'Hun er på arbejde.' },
        { word: 'et møde', clean: 'møde', gender: 'et', bestemt: 'mødet', flertal: 'møder', x: 78.5, y: 44, iconName: 'handshake', sentence: 'De har et møde i dag.' },
        { word: 'en idé', clean: 'idé', gender: 'en', bestemt: 'idéen', flertal: 'idéer', x: 84.5, y: 25.5, iconName: 'lightbulb', sentence: 'Han får en god idé.' },
        { word: 'et brev', clean: 'brev', gender: 'et', bestemt: 'brevet', flertal: 'breve', x: 83.5, y: 47.5, iconName: 'fileText', sentence: 'Hun åbner et brev.' },
        { word: 'et vindue', clean: 'vindue', gender: 'et', bestemt: 'vinduet', flertal: 'vinduer', x: 97, y: 31, iconName: 'home', sentence: 'Lyset kommer ind ad et vindue.' },
        { word: 'en computer', clean: 'computer', gender: 'en', bestemt: 'computeren', flertal: 'computere', x: 82.5, y: 83, iconName: 'smartphone', sentence: 'Manden arbejder ved en computer.' },
        { word: 'et problem', clean: 'problem', gender: 'et', bestemt: 'problemet', flertal: 'problemer', x: 80.5, y: 74, iconName: 'alertTriangle', sentence: 'Der er et problem med computeren.' }
    ];

    // ========================================================
    // --- 1. DEL: UDFORSK BILLEDET
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = 'klasse-panel active';
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'radar-control-bar';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>${renderDsIcon('image', '', { size: 16 })}</span> <span>${getTranslation('vrimmel_pure_btn')}</span> <strong id="pure-mode-status-klasse">${getTranslation('vrimmel_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status-klasse').textContent = pureModeActive ? getTranslation('vrimmel_status_on') : getTranslation('vrimmel_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage with Image
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/klasse_kontor_vrimmel.jpg';
    img.alt = 'Undervisningslokalet og kontoret vrimlebillede';
    img.className = 'vrimmel-img';
    stage.appendChild(img);

    // Detail display box
    const detailBox = document.createElement('div');
    detailBox.className = 'hotspot-detail-card';
    detailBox.innerHTML = `
        <div>
            <div class="detail-word-badge badge-en">${getTranslation('klasse_default_badge')}</div>
            <div class="detail-main-word">${getTranslation('klasse_default_title')}</div>
            <div class="detail-forms">${getTranslation('klasse_default_desc')}</div>
        </div>
    `;

    // Render hotspots
    const renderedHotspots = [];
    klasseWords.forEach(kw => {
        const spot = document.createElement('div');
        spot.className = `vrimmel-hotspot hotspot-${kw.gender}`;
        spot.style.left = `${kw.x}%`;
        spot.style.top = `${kw.y}%`;
        spot.textContent = '?';
        spot.title = kw.word;

        spot.onclick = () => {
            const lang = getLang();
            const wordTrans = klasseWordTranslations[kw.word]?.[lang] || (lang !== 'da' ? klasseWordTranslations[kw.word]?.['en'] : null);
            const transMeaning = wordTrans?.meaning;
            const transSentence = wordTrans?.sentence;

            detailBox.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                    <div>
                        <span class="badge-substantiv">${getTranslation('vrimmel_badge_substantiv')}</span>
                        <span class="detail-word-badge badge-${kw.gender}">${kw.gender === 'en' ? stripLeadingEmoji(getTranslation('vrimmel_badge_en')) : stripLeadingEmoji(getTranslation('vrimmel_badge_et'))}</span>
                    </div>
                    <div class="detail-main-word" style="display: flex; align-items: center; gap: 0.6rem;">
                        <span>${renderDsIcon(kw.iconName || 'tag', '', { size: 24 })}</span>
                        <span>${kw.word}</span>
                        ${transMeaning ? `<span style="font-size: 1.1rem; color: #a7f3d0; font-weight: 500; margin-left: 0.5rem;">(${transMeaning})</span>` : ''}
                    </div>
                    <div class="detail-forms">${getTranslation('vrimmel_form_bestemt')} <strong>${kw.bestemt}</strong> | ${getTranslation('vrimmel_form_flertal')} <strong>${kw.flertal}</strong></div>
                    <div class="detail-sentence">"${kw.sentence}"</div>
                    ${transSentence ? `<div style="font-size: 0.95rem; color: #a7f3d0; font-style: italic; margin-top: 0.2rem;">"${transSentence}"</div>` : ''}
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                        <button class="listen-word-btn" id="listen-klasse-word">
                            <span>${renderDsIcon('volume', '', { size: 18 })}</span> <span>${getTranslation('vrimmel_listen_btn')}</span>
                        </button>
                        <button class="mic-speak-btn" id="mic-klasse-word">
                            <span>${renderDsIcon('mic', '', { size: 18 })}</span> <span>${getTranslation('vrimmel_mic_btn')}</span>
                        </button>
                    </div>
                    <div class="speech-feedback-box" id="speech-feedback-klasse"></div>
                </div>
            `;

            detailBox.querySelector('#listen-klasse-word').onclick = () => {
                speakDanish(kw.word);
            };

            const micBtn = detailBox.querySelector('#mic-klasse-word');
            const feedbackBox = detailBox.querySelector('#speech-feedback-klasse');
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                micBtn.onclick = () => {
                    feedbackBox.className = 'speech-feedback-box incorrect';
                    feedbackBox.textContent = getTranslation('vrimmel_mic_unsupported');
                };
            } else {
                let rec = null;
                let isListening = false;
                micBtn.onclick = () => {
                    if (isListening && rec) {
                        rec.stop();
                        return;
                    }
                    try {
                        rec = new SpeechRecognition();
                        rec.lang = 'da-DK';
                        rec.interimResults = false;
                        rec.maxAlternatives = 1;

                        rec.onstart = () => {
                            isListening = true;
                            micBtn.classList.add('listening');
                            micBtn.innerHTML = `<span>${renderDsIcon('activity', '', { size: 18 })}</span> <span>${getTranslation('vrimmel_mic_listening')}</span>`;
                            feedbackBox.className = 'speech-feedback-box listening';
                            feedbackBox.textContent = `${getTranslation('vrimmel_mic_prompt')} "${kw.clean}"...`;
                        };

                        rec.onresult = (evt) => {
                            const spoken = evt.results[0][0].transcript.toLowerCase().trim();
                            const cleanSpoken = spoken.replace(/[.,!?]/g, '').trim();
                            const cleanTarget = kw.clean.toLowerCase().trim();
                            const fullTarget = kw.word.toLowerCase().trim();
                            const isMatch = cleanSpoken === cleanTarget ||
                                            cleanSpoken === fullTarget ||
                                            cleanSpoken.split(' ').includes(cleanTarget) ||
                                            cleanTarget.includes(cleanSpoken);

                            if (isMatch) {
                                feedbackBox.className = 'speech-feedback-box correct';
                                feedbackBox.innerHTML = `${getTranslation('vrimmel_mic_correct')} <strong>"${spoken}"</strong> ✓`;
                            } else {
                                feedbackBox.className = 'speech-feedback-box incorrect';
                                feedbackBox.innerHTML = getTranslation('vrimmel_mic_incorrect').replace('{spoken}', spoken);
                            }
                        };

                        rec.onerror = (err) => {
                            isListening = false;
                            micBtn.classList.remove('listening');
                            micBtn.innerHTML = `<span>${renderDsIcon('mic', '', { size: 18 })}</span> <span>${getTranslation('vrimmel_mic_btn')}</span>`;
                            if (err.error !== 'no-speech') {
                                feedbackBox.className = 'speech-feedback-box incorrect';
                                feedbackBox.textContent = `Mikrofon: ${err.error}`;
                            }
                        };

                        rec.onend = () => {
                            isListening = false;
                            micBtn.classList.remove('listening');
                            micBtn.innerHTML = `<span>${renderDsIcon('mic', '', { size: 18 })}</span> <span>${getTranslation('vrimmel_mic_btn')}</span>`;
                        };

                        rec.start();
                    } catch (e) {
                        feedbackBox.className = 'speech-feedback-box incorrect';
                        feedbackBox.textContent = 'Kunne ikke starte mikrofonen.';
                    }
                };
            }

            speakDanish(kw.word);
        };

        stage.appendChild(spot);
        renderedHotspots.push({ el: spot, kw });
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailBox);
    vrimmelPanel.appendChild(vrimmelCard);

    // ========================================================
    // --- EN / ET KASSE-SORTERING (ALLE 24 ORD) ---
    // ========================================================
    const sortingBox = document.createElement('div');
    sortingBox.className = 'sorting-game-box';

    const sortHeader = document.createElement('div');
    sortHeader.className = 'sorting-header-row';
    const cleanSortTitle = stripLeadingEmoji(getTranslation('sort_klasse_title'));
    sortHeader.innerHTML = `
        <div>
            <h3 style="font-size: 1.3rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>${renderDsIcon('layers', '', { size: 20 })}</span>
                <span>${cleanSortTitle}</span>
            </h3>
            <p style="color: var(--by-text-muted, #a7f3d0); margin: 0.2rem 0 0; font-size: 0.95rem;">${getTranslation('sort_instruction')}</p>
        </div>
        <div class="sort-progress-badge" id="klasse-sort-progress">${getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', klasseWords.length)}</div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsContainer = document.createElement('div');
    binsContainer.className = 'bins-container';

    const cleanBinEnTitle = stripLeadingEmoji(getTranslation('sort_bin_en_title'));
    const binEn = document.createElement('div');
    binEn.className = 'sort-bin bin-en';
    binEn.innerHTML = `<div class="bin-title bin-title-en" style="display: flex; align-items: center; justify-content: center; gap: 0.4rem;">${renderDsIcon('tag', '', { size: 16 })} <span>${cleanBinEnTitle}</span></div><div class="bin-items-list" id="bin-klasse-en"></div>`;

    const cleanBinEtTitle = stripLeadingEmoji(getTranslation('sort_bin_et_title'));
    const binEt = document.createElement('div');
    binEt.className = 'sort-bin bin-et';
    binEt.innerHTML = `<div class="bin-title bin-title-et" style="display: flex; align-items: center; justify-content: center; gap: 0.4rem;">${renderDsIcon('tag', '', { size: 16 })} <span>${cleanBinEtTitle}</span></div><div class="bin-items-list" id="bin-klasse-et"></div>`;

    binsContainer.appendChild(binEn);
    binsContainer.appendChild(binEt);
    sortingBox.appendChild(binsContainer);

    const wordsBank = document.createElement('div');
    wordsBank.className = 'words-bank-row';

    let selectedSortWord = null;
    let klassePlacedCount = 0;

    function renderKlasseBank() {
        wordsBank.innerHTML = '';
        klasseWords.forEach(item => {
            const chip = document.createElement('button');
            chip.className = 'sort-word-chip';
            chip.textContent = item.clean;

            chip.onclick = () => {
                selectedSortWord = item;
                wordsBank.querySelectorAll('.sort-word-chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
            };
            wordsBank.appendChild(chip);
        });
    }

    renderKlasseBank();

    binEn.onclick = () => handleKlasseBinDrop('en', binEn.querySelector('#bin-klasse-en'));
    binEt.onclick = () => handleKlasseBinDrop('et', binEt.querySelector('#bin-klasse-et'));

    function handleKlasseBinDrop(targetGender, binListEl) {
        if (!selectedSortWord) {
            return;
        }

        if (selectedSortWord.gender === targetGender) {
            const placedChip = document.createElement('div');
            placedChip.className = 'chip-in-bin';
            placedChip.textContent = `${targetGender} ${selectedSortWord.clean}`;
            binListEl.appendChild(placedChip);

            klassePlacedCount++;
            sortHeader.querySelector('#klasse-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', klassePlacedCount).replace('{total}', klasseWords.length);

            wordsBank.querySelectorAll('.sort-word-chip').forEach(c => {
                if (c.textContent === selectedSortWord.clean) {
                    c.classList.add('placed');
                    c.classList.remove('selected');
                }
            });

            if (klassePlacedCount === klasseWords.length) {
                const cleanComplete = stripLeadingEmoji(getTranslation('sort_all_complete'));
                sortHeader.querySelector('#klasse-sort-progress').innerHTML = `✓ ${cleanComplete}`;
            }

            selectedSortWord = null;
        } else {
            const wrongBin = targetGender === 'en' ? binEn : binEt;
            wrongBin.classList.add('bin-shake');
            setTimeout(() => wrongBin.classList.remove('bin-shake'), 400);
        }
    }

    const resetBar = document.createElement('div');
    resetBar.style.marginTop = '1.2rem';
    resetBar.style.display = 'flex';
    resetBar.style.justifyContent = 'flex-end';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-sort-btn';
    const cleanResetBtn = stripLeadingEmoji(getTranslation('sort_reset_btn'));
    resetBtn.innerHTML = `<span>${renderDsIcon('refresh', '', { size: 16 })}</span> <span>${cleanResetBtn}</span>`;
    resetBtn.style.display = 'inline-flex';
    resetBtn.style.alignItems = 'center';
    resetBtn.style.gap = '0.5rem';
    resetBtn.onclick = () => {
        klassePlacedCount = 0;
        selectedSortWord = null;
        binEn.querySelector('#bin-klasse-en').innerHTML = '';
        binEt.querySelector('#bin-klasse-et').innerHTML = '';
        sortHeader.querySelector('#klasse-sort-progress').textContent = getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', klasseWords.length);
        renderKlasseBank();
    };
    resetBar.appendChild(resetBtn);

    sortingBox.appendChild(wordsBank);
    sortingBox.appendChild(resetBar);
    vrimmelPanel.appendChild(sortingBox);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- 2. DEL: FIND ORD DER HÆNGER SAMMEN
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = 'klasse-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const klasseMissions = [
        {
            title: "Find 3 ting, man læser eller skriver med",
            iconName: "bookOpen",
            targetCount: 3,
            options: [
                { text: "en bog", correct: true },
                { text: "en lampe", correct: false },
                { text: "et papir", correct: true },
                { text: "et vindue", correct: false },
                { text: "en blyant", correct: true },
                { text: "en stol", correct: false }
            ]
        },
        {
            title: "Find 3 ord om sprog og kommunikation",
            iconName: "thought",
            targetCount: 3,
            options: [
                { text: "et spørgsmål", correct: true },
                { text: "en taske", correct: false },
                { text: "et svar", correct: true },
                { text: "et bord", correct: false },
                { text: "et sprog", correct: true },
                { text: "et ur", correct: false }
            ]
        },
        {
            title: "Find 3 personer eller aktiviteter i lokalet",
            iconName: "users",
            targetCount: 3,
            options: [
                { text: "en lærer", correct: true },
                { text: "en blyant", correct: false },
                { text: "en elev", correct: true },
                { text: "et møde", correct: true },
                { text: "et billede", correct: false },
                { text: "en lampe", correct: false }
            ]
        },
        {
            title: "Find 3 ting med teknologi eller kontor",
            iconName: "smartphone",
            targetCount: 3,
            options: [
                { text: "en computer", correct: true },
                { text: "en stol", correct: false },
                { text: "en telefon", correct: true },
                { text: "et brev", correct: true },
                { text: "en tavle", correct: false },
                { text: "en taske", correct: false }
            ]
        },
        {
            title: "Find 3 møbler eller inventar i lokalet",
            iconName: "home",
            targetCount: 3,
            options: [
                { text: "et bord", correct: true },
                { text: "en blyant", correct: false },
                { text: "en stol", correct: true },
                { text: "en elev", correct: false },
                { text: "en lampe", correct: true },
                { text: "et sprog", correct: false }
            ]
        },
        {
            title: "Find 3 ting i skoletasken",
            iconName: "tag",
            targetCount: 3,
            options: [
                { text: "en taske", correct: true },
                { text: "en tavle", correct: false },
                { text: "en bog", correct: true },
                { text: "et vindue", correct: false },
                { text: "en blyant", correct: true },
                { text: "et møde", correct: false }
            ]
        },
        {
            title: "Find 3 ord om tid og planlægning",
            iconName: "clock",
            targetCount: 3,
            options: [
                { text: "et ur", correct: true },
                { text: "en lærer", correct: false },
                { text: "en opgave", correct: true },
                { text: "en computer", correct: false },
                { text: "et møde", correct: true },
                { text: "et papir", correct: false }
            ]
        },
        {
            title: "Find 3 ord om tanker og idéer",
            iconName: "lightbulb",
            targetCount: 3,
            options: [
                { text: "en idé", correct: true },
                { text: "en stol", correct: false },
                { text: "et spørgsmål", correct: true },
                { text: "en taske", correct: false },
                { text: "et svar", correct: true },
                { text: "en lampe", correct: false }
            ]
        }
    ];

    let currMissionIdx = 0;
    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderKlasseMission() {
        missionCard.innerHTML = '';
        const m = klasseMissions[currMissionIdx];
        let selectedCount = 0;

        const header = document.createElement('div');
        header.className = 'mission-header';
        header.innerHTML = `
            <div class="mission-badge" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                <span>${renderDsIcon('search', '', { size: 14 })}</span>
                <span>${getTranslation('tab_label_detektiv')} ${currMissionIdx + 1} / ${klasseMissions.length}</span>
            </div>
            <div style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem;">
                <span>${renderDsIcon(m.iconName || 'search', '', { size: 22 })}</span>
                <span>${m.title}</span>
            </div>
            <div style="font-size: 0.95rem; color: var(--by-text-muted, #a7f3d0);">${getTranslation('klasse_detektiv_count_prompt')}</div>
        `;
        missionCard.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'clues-grid';

        const feedbackEl = document.createElement('div');
        feedbackEl.style.textAlign = 'center';
        feedbackEl.style.minHeight = '50px';
        feedbackEl.style.marginTop = '1rem';

        shuffleArray(m.options).forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'clue-btn';
            btn.innerHTML = `<span>${opt.text}</span>`;

            btn.onclick = () => {
                if (btn.classList.contains('selected-correct') || btn.classList.contains('selected-wrong')) return;

                if (opt.correct) {
                    btn.classList.add('selected-correct');
                    selectedCount++;

                    if (selectedCount === m.targetCount) {
                        const cleanDetektivComplete = stripLeadingEmoji(getTranslation('klasse_detektiv_complete'));
                        const nextBtnText = currMissionIdx < klasseMissions.length - 1 ? getTranslation('klasse_detektiv_next') : stripLeadingEmoji(getTranslation('klasse_detektiv_restart'));
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <span>${renderDsIcon('check', '', { size: 20 })}</span>
                                <span>Rigtigt svaret! ${cleanDetektivComplete}</span>
                            </div>
                            <button class="mission-next-btn" id="next-klasse-mission">
                                ${nextBtnText}
                            </button>
                        `;
                        feedbackEl.querySelector('#next-klasse-mission').onclick = () => {
                            currMissionIdx = (currMissionIdx + 1) % klasseMissions.length;
                            renderKlasseMission();
                        };
                    } else {
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
                                <span>${renderDsIcon('check', '', { size: 16 })}</span>
                                <span>Rigtigt svaret! (${selectedCount} af ${m.targetCount})</span>
                            </div>
                        `;
                    }
                } else {
                    btn.classList.add('selected-wrong');
                    feedbackEl.innerHTML = `
                        <div style="color: #f87171; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                            ✗ ${getTranslation('top100_wrong_try_again')}
                        </div>
                    `;
                    setTimeout(() => btn.classList.remove('selected-wrong'), 800);
                }
            };
            grid.appendChild(btn);
        });

        missionCard.appendChild(grid);
        missionCard.appendChild(feedbackEl);
    }

    renderKlasseMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: EN LILLE HISTORIE (4 ENKLE HISTORIER) ---
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'klasse-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const klasseStories = [
        {
            title: "1. Computeren driller",
            fullStoryText: "Manden arbejder ved en computer. Der er en fejl på skærmen. Manden har et problem med computeren. Han stiller et spørgsmål og får hjælp.",
            steps: [
                {
                    q: "1. Hvad arbejder han ved?",
                    options: [
                        { text: "En computer", correct: true },
                        { text: "En seng", correct: false },
                        { text: "Et træ", correct: false }
                    ]
                },
                {
                    q: "2. Hvad sker der?",
                    options: [
                        { text: "En ferie", correct: false },
                        { text: "Der er en fejl", correct: true },
                        { text: "En kage", correct: false }
                    ]
                },
                {
                    q: "3. Hvad har manden?",
                    options: [
                        { text: "Et problem med computeren", correct: true },
                        { text: "En gave", correct: false },
                        { text: "En sol", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør han?",
                    options: [
                        { text: "Han sover på gulvet", correct: false },
                        { text: "Han stiller et spørgsmål", correct: true }
                    ]
                }
            ]
        },
        {
            title: "2. Kursisterne lærer dansk",
            fullStoryText: "Læreren skriver på tavlen. Kursisterne læser i en bog. En elev stiller et spørgsmål. Læreren giver et svar.",
            steps: [
                {
                    q: "1. Hvad gør læreren?",
                    options: [
                        { text: "Læreren skriver på tavlen", correct: true },
                        { text: "Læreren sover", correct: false },
                        { text: "Læreren spiser is", correct: false }
                    ]
                },
                {
                    q: "2. Hvad læser kursisterne i?",
                    options: [
                        { text: "De kigger på en sko", correct: false },
                        { text: "De læser i en bog", correct: true },
                        { text: "De læser på et træ", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør en elev?",
                    options: [
                        { text: "Eleven stiller et spørgsmål", correct: true },
                        { text: "Eleven løber hjem", correct: false },
                        { text: "Eleven gemmer sig", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør læreren?",
                    options: [
                        { text: "Læreren giver et svar", correct: true },
                        { text: "Læreren slukker lyset", correct: false },
                        { text: "Læreren går", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Et møde på kontoret",
            fullStoryText: "To kolleger har et møde. De kigger på et papir. En kollega får en god idé.",
            steps: [
                {
                    q: "1. Hvad har de to kolleger?",
                    options: [
                        { text: "De har et møde", correct: true },
                        { text: "De holder en fest", correct: false },
                        { text: "De sover", correct: false }
                    ]
                },
                {
                    q: "2. Hvad kigger de på?",
                    options: [
                        { text: "En hund", correct: false },
                        { text: "Et papir", correct: true },
                        { text: "En bil", correct: false }
                    ]
                },
                {
                    q: "3. Hvad får kollegaen?",
                    options: [
                        { text: "En god idé", correct: true },
                        { text: "En kop te", correct: false },
                        { text: "En ny sko", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Opgaven er færdig",
            fullStoryText: "Hun tager en blyant fra tasken. Hun skriver ord med blyanten. Hun løser opgaven.",
            steps: [
                {
                    q: "1. Hvor tager hun blyanten fra?",
                    options: [
                        { text: "Fra tasken", correct: true },
                        { text: "Fra køleskabet", correct: false },
                        { text: "Fra haven", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør hun?",
                    options: [
                        { text: "Hun klipper papiret", correct: false },
                        { text: "Hun skriver ord med en blyant", correct: true },
                        { text: "Hun sover", correct: false }
                    ]
                },
                {
                    q: "3. Hvad sker der til sidst?",
                    options: [
                        { text: "Hun glemmer opgaven", correct: false },
                        { text: "Hun løser opgaven", correct: true },
                        { text: "Hun går hjem", correct: false }
                    ]
                }
            ]
        }
    ];

    let currKlasseStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveKlasseStory() {
        storyContainer.innerHTML = '';
        const story = klasseStories[currKlasseStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        klasseStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currKlasseStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currKlasseStoryIdx = idx;
                renderActiveKlasseStory();
            };
            navBar.appendChild(btn);
        });
        storyContainer.appendChild(navBar);

        const titleEl = document.createElement('h2');
        titleEl.style.fontSize = '1.8rem';
        titleEl.style.marginBottom = '0.4rem';
        titleEl.style.textAlign = 'center';
        titleEl.textContent = story.title;
        storyContainer.appendChild(titleEl);

        const descEl = document.createElement('p');
        descEl.style.color = '#94a3b8';
        descEl.style.textAlign = 'center';
        descEl.style.marginBottom = '1.8rem';
        descEl.textContent = 'Vælg det rigtige ord for at bygge historien:';
        storyContainer.appendChild(descEl);

        const stepsHolder = document.createElement('div');
        stepsHolder.className = 'story-steps-list';

        story.steps.forEach((step, sIdx) => {
            const stepCard = document.createElement('div');
            stepCard.className = `story-step-card ${sIdx === 0 ? 'active-step' : ''}`;
            stepCard.id = `klasse-step-${sIdx}`;
            if (sIdx > 0) {
                stepCard.style.opacity = '0.35';
                stepCard.style.pointerEvents = 'none';
            }

            const qEl = document.createElement('h4');
            qEl.style.marginBottom = '0.6rem';
            qEl.textContent = step.q;
            stepCard.appendChild(qEl);

            const optRow = document.createElement('div');
            optRow.className = 'story-options-row';

            const stepFeedback = document.createElement('div');
            stepFeedback.className = 'story-step-feedback';

            shuffleArray(step.options).forEach(opt => {
                const optBtn = document.createElement('button');
                optBtn.className = 'story-opt-btn';
                optBtn.textContent = opt.text;

                optBtn.onclick = () => {
                    if (opt.correct) {
                        optBtn.classList.add('correct');
                        stepFeedback.innerHTML = `<div style="color: #4ade80; font-weight: 700; margin-top: 0.6rem;">✓ Rigtigt svaret!</div>`;

                        optRow.querySelectorAll('.story-opt-btn').forEach(b => {
                            b.style.pointerEvents = 'none';
                        });

                        const nextStepCard = stepsHolder.querySelector(`#klasse-step-${sIdx + 1}`);
                        if (nextStepCard) {
                            nextStepCard.style.opacity = '1';
                            nextStepCard.style.pointerEvents = 'auto';
                            nextStepCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#klasse-story-complete-box');
                            if (completeBox) {
                                completeBox.style.display = 'block';
                                completeBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }
                    } else {
                        optBtn.classList.add('wrong');
                        stepFeedback.innerHTML = `<div style="color: #f87171; font-weight: 700; margin-top: 0.6rem;">✗ ${getTranslation('top100_wrong_try_again')}</div>`;
                        setTimeout(() => optBtn.classList.remove('wrong'), 700);
                    }
                };
                optRow.appendChild(optBtn);
            });

            stepCard.appendChild(optRow);
            stepCard.appendChild(stepFeedback);
            stepsHolder.appendChild(stepCard);
        });
        storyContainer.appendChild(stepsHolder);

        const completeBox = document.createElement('div');
        completeBox.id = 'klasse-story-complete-box';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';

        const isLastStory = currKlasseStoryIdx === klasseStories.length - 1;
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                <button class="story-opt-btn" id="btn-next-klasse-story" style="background: #22c55e; color: #0f172a; font-weight: 800;">
                    ${isLastStory ? 'Start forfra ↺' : 'Gå til næste historie ➔'}
                </button>
            </div>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#btn-next-klasse-story').onclick = () => {
            currKlasseStoryIdx = (currKlasseStoryIdx + 1) % klasseStories.length;
            renderActiveKlasseStory();
        };
    }

    renderActiveKlasseStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: SAMMENHÆNG (Samme ord – ny scene)
    // ========================================================
    // ========================================================
    // --- 4. DEL: OVEREMNE OG UNDEREMNE (Model C)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'klasse-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const klasseCategoryTasks = [
        {
            type: "find_overemne",
            subwords: ["en lærer", "en elev", "en klasse"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Skole og undervisning", correct: true },
                { text: "Transport", correct: false },
                { text: "Køkken", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en computer", "en skærm", "en mus"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Teknologi og IT", correct: true },
                { text: "Møbler", correct: false },
                { text: "Dyr", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Skrive- og læsemateriale",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en bog", correct: true },
                { text: "en blyant", correct: true },
                { text: "et papir", correct: true },
                { text: "et komfur", correct: false },
                { text: "en seng", correct: false },
                { text: "en bil", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Arbejde og opgaver",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "et møde", correct: true },
                { text: "en opgave", correct: true },
                { text: "en pause", correct: true },
                { text: "et træ", correct: false },
                { text: "en kat", correct: false },
                { text: "en vej", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["et bord", "en stol", "en reol"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Møbler i lokalet", correct: true },
                { text: "Mad", correct: false },
                { text: "Dyr", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en telefon", "et brev", "en e-mail"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Kommunikation", correct: true },
                { text: "Transport", correct: false },
                { text: "Tøj", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Udstyr i undervisningen",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en taske", correct: true },
                { text: "en tavle", correct: true },
                { text: "en lampe", correct: true },
                { text: "en cykel", correct: false },
                { text: "en hund", correct: false },
                { text: "et brød", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Sprog og læring",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "et sprog", correct: true },
                { text: "et spørgsmål", correct: true },
                { text: "et svar", correct: true },
                { text: "en seng", correct: false },
                { text: "et vindue", correct: false },
                { text: "en kop", correct: false }
            ]
        }
    ];

    let currKlasseCategoryIdx = 0;
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';

    function renderKlasseCategoryTask() {
        categoryCard.innerHTML = '';

        if (currKlasseCategoryIdx >= klasseCategoryTasks.length) {
            categoryCard.innerHTML = `
                <div style="margin-bottom: 0.6rem; color: var(--by-primary, #22c55e); display: flex; justify-content: center;">
                    ${renderDsIcon('trophy', '', { size: 48 })}
                </div>
                <h2 style="font-size: 1.8rem; color: #4ade80; margin-bottom: 0.6rem;">${getTranslation('top100_category_complete_title')}</h2>
                <p style="color: var(--by-text-muted, #a7f3d0); font-size: 1.05rem; margin-bottom: 1.6rem;">
                    ${getTranslation('top100_category_complete_desc')}
                </p>
                <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
                    <button class="mission-next-btn" id="restart-klasse-category-btn" style="background: #475569; color: white;">
                        ${getTranslation('top100_start_over_btn')}
                    </button>
                    <button class="mission-next-btn" id="klasse-category-next-tab-btn" style="background: var(--by-primary, #22c55e); color: #02220e; font-weight: 800;">
                        ${getTranslation('top100_goto_saetning_btn')}
                    </button>
                </div>
            `;
            categoryCard.querySelector('#restart-klasse-category-btn').onclick = () => {
                currKlasseCategoryIdx = 0;
                renderKlasseCategoryTask();
            };
            categoryCard.querySelector('#klasse-category-next-tab-btn').onclick = () => {
                switchTab('tab_saetning');
            };
            return;
        }

        const task = klasseCategoryTasks[currKlasseCategoryIdx];
        let selectedCount = 0;

        const badge = document.createElement('div');
        badge.className = 'category-badge';
        badge.innerHTML = `${renderDsIcon('tag', '', { size: 14 })} <span>${getTranslation('top100_task_counter').replace('{current}', currKlasseCategoryIdx + 1).replace('{total}', klasseCategoryTasks.length)}</span>`;
        categoryCard.appendChild(badge);

        if (task.type === 'find_overemne') {
            const promptTitle = document.createElement('h3');
            promptTitle.style.fontSize = '1.35rem';
            promptTitle.style.color = 'var(--by-text-muted, #a7f3d0)';
            promptTitle.style.margin = '0.3rem 0 0.8rem';
            promptTitle.textContent = getTranslation('top100_underemner_label');
            categoryCard.appendChild(promptTitle);

            const wordsRow = document.createElement('div');
            wordsRow.className = 'category-subwords-row';
            task.subwords.forEach(w => {
                const chip = document.createElement('span');
                chip.className = 'category-word-chip';
                chip.textContent = w;
                wordsRow.appendChild(chip);
            });
            categoryCard.appendChild(wordsRow);

            const qEl = document.createElement('div');
            qEl.style.fontSize = '1.25rem';
            qEl.style.fontWeight = '800';
            qEl.style.color = '#f8fafc';
            qEl.style.marginBottom = '1.2rem';
            qEl.textContent = getTranslation('top100_q_find_overemne');
            categoryCard.appendChild(qEl);

            const grid = document.createElement('div');
            grid.className = 'category-options-grid';

            const feedbackEl = document.createElement('div');
            feedbackEl.style.marginTop = '1.2rem';

            shuffleArray(task.options).forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'category-opt-btn';
                btn.textContent = opt.text;

                btn.onclick = () => {
                    if (opt.correct) {
                        btn.classList.add('selected-correct');
                        grid.querySelectorAll('.category-opt-btn').forEach(b => b.style.pointerEvents = 'none');
                        const cleanOveremnePrefix = getTranslation("top100_correct_overemne_prefix").replace(/^[\s\p{Emoji}\uFE0F]+/u, '').trim();
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <span>${renderDsIcon('check', '', { size: 20 })}</span>
                                <span>${cleanOveremnePrefix} ${opt.text}</span>
                            </div>
                            <button class="mission-next-btn" id="next-category-btn">${getTranslation('top100_next_task_btn')}</button>
                        `;
                        feedbackEl.querySelector('#next-category-btn').onclick = () => {
                            currKlasseCategoryIdx++;
                            renderKlasseCategoryTask();
                        };
                    } else {
                        btn.classList.add('selected-wrong');
                        feedbackEl.innerHTML = `
                            <div style="color: #f87171; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                ✗ ${getTranslation('top100_wrong_try_again')}
                            </div>
                        `;
                        setTimeout(() => btn.classList.remove('selected-wrong'), 700);
                    }
                };
                grid.appendChild(btn);
            });

            categoryCard.appendChild(grid);
            categoryCard.appendChild(feedbackEl);
        } else {
            // task.type === 'find_underemner'
            const promptTitle = document.createElement('div');
            promptTitle.style.fontSize = '0.95rem';
            promptTitle.style.color = '#94a3b8';
            promptTitle.style.textTransform = 'uppercase';
            promptTitle.style.letterSpacing = '0.5px';
            promptTitle.textContent = getTranslation('top100_overemne_label');
            categoryCard.appendChild(promptTitle);

            const mainCategoryTitle = document.createElement('h2');
            mainCategoryTitle.style.fontSize = '1.8rem';
            mainCategoryTitle.style.color = '#38bdf8';
            mainCategoryTitle.style.margin = '0.3rem 0 0.8rem';
            mainCategoryTitle.textContent = task.overemne;
            categoryCard.appendChild(mainCategoryTitle);

            const qEl = document.createElement('p');
            qEl.style.color = 'var(--by-text-muted, #a7f3d0)';
            qEl.style.fontSize = '1.05rem';
            qEl.style.marginBottom = '1.2rem';
            qEl.textContent = getTranslation('top100_q_find_underemner');
            categoryCard.appendChild(qEl);

            const grid = document.createElement('div');
            grid.className = 'category-options-grid';

            const feedbackEl = document.createElement('div');
            feedbackEl.style.marginTop = '1.2rem';

            shuffleArray(task.options).forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'category-opt-btn';
                btn.textContent = opt.text;

                btn.onclick = () => {
                    if (btn.classList.contains('selected-correct') || btn.classList.contains('selected-wrong')) return;

                    if (opt.correct) {
                        btn.classList.add('selected-correct');
                        selectedCount++;

                        if (selectedCount === task.targetCount) {
                            const cleanUnderemnerComplete = getTranslation('top100_correct_all_underemner').replace(/^[\s\p{Emoji}\uFE0F]+/u, '').trim();
                            feedbackEl.innerHTML = `
                                <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                    <span>${renderDsIcon('check', '', { size: 20 })}</span>
                                    <span>${cleanUnderemnerComplete}</span>
                                </div>
                                <button class="mission-next-btn" id="next-category-btn">
                                    ${currKlasseCategoryIdx < klasseCategoryTasks.length - 1 ? getTranslation('top100_next_task_btn') : getTranslation('top100_see_result_btn')}
                                </button>
                            `;
                            feedbackEl.querySelector('#next-category-btn').onclick = () => {
                                currKlasseCategoryIdx++;
                                renderKlasseCategoryTask();
                            };
                        } else {
                            feedbackEl.innerHTML = `
                                <div style="color: #4ade80; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                    <span>${renderDsIcon('check', '', { size: 16 })}</span>
                                    <span>Rigtigt svaret! (${selectedCount} af ${task.targetCount})</span>
                                </div>
                            `;
                        }
                    } else {
                        btn.classList.add('selected-wrong');
                        feedbackEl.innerHTML = `
                            <div style="color: #f87171; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                ✗ ${getTranslation('top100_wrong_try_again')}
                            </div>
                        `;
                        setTimeout(() => btn.classList.remove('selected-wrong'), 700);
                    }
                };
                grid.appendChild(btn);
            });

            categoryCard.appendChild(grid);
            categoryCard.appendChild(feedbackEl);
        }
    }

    renderKlasseCategoryTask();
    kontekstPanel.appendChild(categoryCard);
    panelsHolder.appendChild(kontekstPanel);

    // ========================================================
    // --- 5. DEL: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'klasse-panel';
    saetningPanel.dataset.panel = 'tab_saetning';

    const sentenceCard = document.createElement('div');
    sentenceCard.className = 'sentence-builder-card';

    // Sub-navigation: 1. Udforsk & Byg selv vs 2. Opgave & Puslespil
    const sbSubNav = document.createElement('div');
    sbSubNav.className = 'sb-sub-nav';

    const subTab1Btn = document.createElement('button');
    subTab1Btn.className = 'sb-sub-btn active';
    subTab1Btn.innerHTML = `<span>${renderDsIcon('edit', '', { size: 16 })}</span> <span>1. Udforsk & Byg selv</span>`;

    const subTab2Btn = document.createElement('button');
    subTab2Btn.className = 'sb-sub-btn';
    subTab2Btn.innerHTML = `<span>${renderDsIcon('puzzle', '', { size: 16 })}</span> <span>2. Opgave & Puslespil</span>`;

    sbSubNav.appendChild(subTab1Btn);
    sbSubNav.appendChild(subTab2Btn);
    sentenceCard.appendChild(sbSubNav);

    // Containers for the two sub-tabs
    const freeBuilderContainer = document.createElement('div');
    freeBuilderContainer.className = 'sb-free-container';

    const challengeContainer = document.createElement('div');
    challengeContainer.className = 'sb-challenge-container';
    challengeContainer.style.display = 'none';

    sentenceCard.appendChild(freeBuilderContainer);
    sentenceCard.appendChild(challengeContainer);

    subTab1Btn.onclick = () => {
        subTab1Btn.classList.add('active');
        subTab2Btn.classList.remove('active');
        freeBuilderContainer.style.display = 'block';
        challengeContainer.style.display = 'none';
    };

    subTab2Btn.onclick = () => {
        subTab2Btn.classList.add('active');
        subTab1Btn.classList.remove('active');
        freeBuilderContainer.style.display = 'none';
        challengeContainer.style.display = 'block';
    };

    // ========================================================
    // --- SUB-TAB 1: DEN FRIE SÆTNINGSBYGGER (UDFORSK)
    // ========================================================
    function setupFreeBuilder() {
        const lang = getLang();
        const instructionTrans = getSubstantivInstruction(lang);

        freeBuilderContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger i klassen & på kontoret</h3>
                <p style="color: var(--by-text-muted, #a7f3d0); font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                    Vælg et element fra hver række herunder. Prøv forskellige kombinationer og lyt til hvordan sætningen lyder på dansk!
                </p>
                ${lang !== 'da' && instructionTrans ? `
                <p style="color: #e2e8f0; font-size: 0.95rem; opacity: 0.88; max-width: 650px; margin: 0.35rem auto 0; font-style: italic;">
                    ${instructionTrans}
                </p>` : ''}
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>1. Hvem?</strong> (Subjekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>2. Handling</strong> (Verbum - rød)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>3. Hvilken ting?</strong> (Objekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>4. Hvor?</strong> (Sted - blå)</div>
            </div>

            <div id="free-builder-rows-klasse"></div>

            <!-- Live Output Sentence -->
            <div class="sb-live-box">
                <div class="sb-live-label">Din samlede sætning</div>
                <div class="sb-live-sentence" id="free-live-sentence-klasse"></div>
                <button class="sb-listen-btn" id="free-listen-btn-klasse">
                    <span>${renderDsIcon('volume', '', { size: 16 })}</span> <span>Hør udtale</span>
                </button>
            </div>
        `;

        const freeCategories = [
            {
                id: 'subjekt',
                title: '1. Hvem taler vi om?',
                role: 'Subjekt',
                catClass: 'sb-cat-subjekt',
                badgeClass: 'badge-cat-subjekt',
                iconName: 'user',
                options: ['Læreren', 'Eleven', 'Kursisten', 'Kollegaen', 'Chefen', 'Manden', 'Kvinden', 'Gruppen']
            },
            {
                id: 'verbum',
                title: '2. Hvad laver personen / dyret?',
                role: 'Verbum',
                catClass: 'sb-cat-verbum',
                badgeClass: 'badge-cat-verbum',
                iconName: 'zap',
                options: ['læser i', 'skriver med', 'løser', 'stiller', 'åbner', 'tænder for', 'holder', 'kigger på']
            },
            {
                id: 'objekt',
                title: '3. Hvilken genstand eller ting?',
                role: 'Objekt (Ting)',
                catClass: 'sb-cat-objekt',
                badgeClass: 'badge-cat-objekt',
                iconName: 'tag',
                options: ['en bog', 'en blyant', 'en opgave', 'et spørgsmål', 'computeren', 'et møde', 'et brev', 'uret']
            },
            {
                id: 'sted',
                title: '4. Hvor sker det?',
                role: 'Sted (Rum)',
                catClass: 'sb-cat-sted',
                badgeClass: 'badge-cat-sted',
                iconName: 'mapPin',
                options: ['i klassen', 'på kontoret', 'ved bordet', 'på stolen', 'foran tavlen', 'ved computeren', 'i lokalet', 'ved vinduet']
            }
        ];

        let selected = ['Læreren', 'skriver med', 'en blyant', 'ved bordet'];

        const rowsContainer = freeBuilderContainer.querySelector('#free-builder-rows-klasse');
        const liveSentenceEl = freeBuilderContainer.querySelector('#free-live-sentence-klasse');
        const listenBtn = freeBuilderContainer.querySelector('#free-listen-btn-klasse');

        function updateSentence() {
            liveSentenceEl.innerHTML = `
                <span class="grammar-word word-substantiv">${selected[0]}</span>
                <span class="grammar-word word-verbum">${selected[1]}</span>
                <span class="grammar-word word-substantiv">${selected[2]}</span>
                <span class="grammar-word word-sted">${selected[3]}</span>.
            `;
        }

        listenBtn.onclick = () => {
            speakDanish(`${selected[0]} ${selected[1]} ${selected[2]} ${selected[3]}`);
        };

        freeCategories.forEach((cat, catIdx) => {
            const row = document.createElement('div');
            row.className = `sb-category-row ${cat.catClass}`;
            const catTrans = lang !== 'da' ? getSubstantivCategoryQuestion(cat.title, lang) : '';

            row.innerHTML = `
                <div class="sb-category-header">
                    <div class="sb-category-title" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        <span>${renderDsIcon(cat.iconName, '', { size: 18 })}</span>
                        <span>${cat.title}</span>
                        ${catTrans ? `<span class="sb-cat-trans" style="font-size: 0.88rem; opacity: 0.85; font-weight: normal; color: #a7f3d0;">(${catTrans})</span>` : ''}
                    </div>
                    <span class="sb-category-badge ${cat.badgeClass}">${cat.role}</span>
                </div>
                <div class="sb-chips-grid"></div>
            `;

            const grid = row.querySelector('.sb-chips-grid');

            cat.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = `sb-chip-btn ${selected[catIdx] === opt ? 'selected' : ''}`;
                btn.textContent = opt;

                btn.onclick = () => {
                    selected[catIdx] = opt;
                    grid.querySelectorAll('.sb-chip-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    updateSentence();
                    speakDanish(opt);
                };

                grid.appendChild(btn);
            });

            rowsContainer.appendChild(row);
        });

        updateSentence();
    }

    // ========================================================
    // --- SUB-TAB 2: OPGAVE & PUSLESPIL (UDFORDRINGEN)
    // ========================================================
    const klasseChallengeTasks = [
        {
            context: "Læreren retter en dansk opgave på papiret.",
            subjekt: "Læreren",
            verbum: "skriver med",
            sted: "ved bordet",
            questionPrompt: "Hvad skriver læreren med ved bordet?",
            targetWord: "en blyant",
            distractors: ["en stol", "en taske", "et vindue"],
            pedagogyNote: "Man skriver med en spidset blyant på papiret."
        },
        {
            context: "Eleven forstår ikke et ord i grammatikken.",
            subjekt: "Eleven",
            verbum: "stiller",
            sted: "i timen",
            questionPrompt: "Hvad stiller eleven i timen?",
            targetWord: "et spørgsmål",
            distractors: ["et ur", "et billede", "en lampe"],
            pedagogyNote: "Man rækker hånden op og stiller et spørgsmål til læreren."
        },
        {
            context: "Kursisten forbereder sig til dagens læseundervisning.",
            subjekt: "Kursisten",
            verbum: "læser i",
            sted: "i klassen",
            questionPrompt: "Hvad læser kursisten i i klassen?",
            targetWord: "en bog",
            distractors: ["en computer", "en telefon", "et møde"],
            pedagogyNote: "Kursisten fordyber sig og læser teksten i bogen."
        },
        {
            context: "Manden sætter sig ved sit skrivebord for at arbejde.",
            subjekt: "Manden",
            verbum: "tænder for",
            sted: "på kontoret",
            questionPrompt: "Hvad tænder manden for på kontoret?",
            targetWord: "computeren",
            distractors: ["tasken", "stolen", "brevet"],
            pedagogyNote: "Manden tænder skærmen og computeren for at skrive e-mails."
        },
        {
            context: "Postbudet har lige afleveret dagens vigtige post.",
            subjekt: "Chefen",
            verbum: "åbner",
            sted: "ved bordet",
            questionPrompt: "Hvad åbner chefen ved bordet?",
            targetWord: "et brev",
            distractors: ["en blyant", "en tavle", "et ur"],
            pedagogyNote: "Chefen sprætter konvolutten op og læser brevet."
        },
        {
            context: "Eleverne har fået udleveret dagens grammatikøvelse.",
            subjekt: "Pigen",
            verbum: "løser",
            sted: "i lokalet",
            questionPrompt: "Hvad løser pigen i lokalet?",
            targetWord: "en opgave",
            distractors: ["en stol", "et vindue", "en lampe"],
            pedagogyNote: "Pigen tænker sig godt om og løser opgaven."
        },
        {
            context: "Kollegerne samles i mødelokalet for at aftale nye projekter.",
            subjekt: "Gruppen",
            verbum: "holder",
            sted: "på kontoret",
            questionPrompt: "Hvad holder gruppen på kontoret?",
            targetWord: "et møde",
            distractors: ["en taske", "en blyant", "en bog"],
            pedagogyNote: "Kollegerne diskuterer og holder et vigtigt møde."
        },
        {
            context: "Læreren vil se, hvor mange minutter der er tilbage af timen.",
            subjekt: "Læreren",
            verbum: "kigger på",
            sted: "på væggen",
            questionPrompt: "Hvad kigger læreren på på væggen?",
            targetWord: "uret",
            distractors: ["bordet", "brevet", "sproget"],
            pedagogyNote: "Uret viser præcis hvad klokken er."
        }
    ];

    let currentKlasseChallengeIdx = 0;
    const completedKlasseChallenges = new Set();

    function setupKlasseChallenge() {
        challengeContainer.innerHTML = '';
        const task = klasseChallengeTasks[currentKlasseChallengeIdx];

        // Header with pills
        const header = document.createElement('div');
        header.className = 'sb-task-header';

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = `
            <div style="font-size: 0.85rem; color: #38bdf8; font-weight: 800; text-transform: uppercase;">
                Udfordring ${currentKlasseChallengeIdx + 1} af ${klasseChallengeTasks.length}
            </div>
            <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0;">Find tingen & saml puslespillet</h3>
        `;
        header.appendChild(titleDiv);

        const pills = document.createElement('div');
        pills.className = 'sb-task-pills';
        klasseChallengeTasks.forEach((_, idx) => {
            const pill = document.createElement('div');
            pill.className = `sb-task-pill ${idx === currentKlasseChallengeIdx ? 'active' : ''} ${completedKlasseChallenges.has(idx) ? 'done' : ''}`;
            pill.textContent = idx + 1;
            pill.onclick = () => {
                currentKlasseChallengeIdx = idx;
                setupKlasseChallenge();
            };
            pills.appendChild(pill);
        });
        header.appendChild(pills);
        challengeContainer.appendChild(header);

        // Step 1: Context & Semantic Match
        const lang = getLang();
        const h0 = getGrammarSlotHint(0, lang);
        const h1 = getGrammarSlotHint(1, lang);
        const h2 = getGrammarSlotHint(2, lang);
        const h3 = getGrammarSlotHint(3, lang);
        const contextTrans = lang !== 'da' ? getSubstantivContextTranslation(task.context, lang) : '';
        const qTrans = lang !== 'da' ? getSubstantivQuestionPromptTranslation(task.questionPrompt, lang) : '';

        const contextCard = document.createElement('div');
        contextCard.className = 'sb-context-card';
        contextCard.innerHTML = `
            <div class="sb-context-title" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.25rem; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                    <span>${renderDsIcon('mapPin', '', { size: 16 })}</span>
                    <em>${task.context}</em>
                </div>
                ${contextTrans ? `<div class="sb-context-trans" style="font-size: 0.92rem; opacity: 0.9; color: #a7f3d0; font-style: italic;">(${contextTrans})</div>` : ''}
            </div>
            <div class="sb-context-elements">
                <div class="sb-context-chip subjekt">
                    <span class="sb-chip-role">${h0.danish} <span class="chip-trans">(${h0.translation})</span></span>
                    <span>${task.subjekt}</span>
                </div>
                <div class="sb-context-chip verbum">
                    <span class="sb-chip-role">${h1.danish} <span class="chip-trans">(${h1.translation})</span></span>
                    <span>${task.verbum}</span>
                </div>
                <div class="sb-context-chip sted">
                    <span class="sb-chip-role">${h3.danish} <span class="chip-trans">(${h3.translation})</span></span>
                    <span>${task.sted}</span>
                </div>
            </div>
        `;
        challengeContainer.appendChild(contextCard);

        // Question box: Spørgsmål 3 (Genstand / Objekt)
        const qBox = document.createElement('div');
        qBox.className = 'sb-question-box';
        qBox.innerHTML = `
            <div style="font-size: 0.92rem; color: #38bdf8; font-weight: 800; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.5px;">
                Spørgsmål 3: ${h2.danish} <span style="opacity: 0.85; font-weight: 600; text-transform: none;">(${h2.translation})</span> – Genstand / Objekt
            </div>
            <div class="sb-question-text">
                ${task.questionPrompt}
                ${qTrans ? `<div style="font-size: 0.92rem; opacity: 0.88; font-weight: normal; margin-top: 0.25rem; color: #bae6fd;">(${qTrans})</div>` : ''}
            </div>
        `;
        challengeContainer.appendChild(qBox);

        // Options Grid (4 substantiver fra scenen)
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'sb-options-grid';

        const allOptions = [task.targetWord, ...task.distractors].sort(() => Math.random() - 0.5);

        const puzzleContainer = document.createElement('div');
        puzzleContainer.className = 'sb-puzzle-section';
        puzzleContainer.style.display = 'none';

        allOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'sb-option-btn';
            btn.textContent = opt;

            btn.onclick = () => {
                if (btn.classList.contains('correct')) return;

                if (opt === task.targetWord) {
                    btn.classList.add('correct');
                    optionsGrid.querySelectorAll('.sb-option-btn').forEach(b => {
                        if (b !== btn) b.style.opacity = '0.4';
                        b.style.pointerEvents = 'none';
                    });

                    speakDanish(opt);

                    // Show Step 2: Puslespil
                    renderKlassePuzzleStep(puzzleContainer, task);
                    puzzleContainer.style.display = 'block';
                    puzzleContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    btn.classList.add('incorrect');
                    speakDanish("Nej, prøv igen");
                    setTimeout(() => btn.classList.remove('incorrect'), 600);
                }
            };

            optionsGrid.appendChild(btn);
        });

        challengeContainer.appendChild(optionsGrid);
        challengeContainer.appendChild(puzzleContainer);
    }

    // Step 2: Puzzle (Saml sætningen i V2 / SVO-rækkefølge)
    function renderKlassePuzzleStep(container, task) {
        const lang = getLang();

        container.innerHTML = `
            <div class="sb-puzzle-title" style="display: flex; align-items: center; gap: 0.5rem;">
                <span>${renderDsIcon('puzzle', '', { size: 20 })}</span>
                <span>Trin 2: Puslespillet – Saml hele sætningen!</span>
            </div>
            <div class="sb-puzzle-desc">
                Klik på brikkerne i den rigtige danske ordstilling: <strong>1. Hvem ➔ 2. Handling ➔ 3. Hvilken ting ➔ 4. Hvor</strong>.
            </div>

            <!-- 4 Slots -->
            <div class="sb-puzzle-slots" id="klasse-puzzle-slots">
                <div class="sb-puzzle-slot slot-0" data-idx="0">
                    ${renderPuzzleSlotInnerHtml(0, lang)}
                </div>
                <div class="sb-puzzle-slot slot-1" data-idx="1">
                    ${renderPuzzleSlotInnerHtml(1, lang)}
                </div>
                <div class="sb-puzzle-slot slot-2" data-idx="2">
                    ${renderPuzzleSlotInnerHtml(2, lang)}
                </div>
                <div class="sb-puzzle-slot slot-3" data-idx="3">
                    ${renderPuzzleSlotInnerHtml(3, lang)}
                </div>
            </div>

            <!-- Bank of chips -->
            <div class="sb-puzzle-bank" id="klasse-puzzle-bank"></div>

            <!-- Feedback -->
            <div class="sb-feedback-box" id="klasse-puzzle-feedback"></div>
        `;

        const correctOrder = [task.subjekt, task.verbum, task.targetWord, task.sted];
        const scrambledWords = [...correctOrder].sort(() => Math.random() - 0.5);

        let placedSlots = [null, null, null, null];

        const slotsEl = container.querySelector('#klasse-puzzle-slots');
        const bankEl = container.querySelector('#klasse-puzzle-bank');
        const feedbackEl = container.querySelector('#klasse-puzzle-feedback');

        function updateSlotsAndBank() {
            // Update slots
            slotsEl.querySelectorAll('.sb-puzzle-slot').forEach((slot, idx) => {
                const word = placedSlots[idx];
                const hint = getGrammarSlotHint(idx, lang);

                if (word) {
                    slot.className = `sb-puzzle-slot filled slot-${idx}`;
                    slot.innerHTML = renderPuzzleSlotFilledHtml(word, hint.role);
                    slot.onclick = () => {
                        placedSlots[idx] = null;
                        updateSlotsAndBank();
                    };
                } else {
                    slot.className = `sb-puzzle-slot slot-${idx}`;
                    slot.innerHTML = renderPuzzleSlotInnerHtml(idx, lang);
                    slot.onclick = null;
                }
            });

            // Update bank
            bankEl.innerHTML = '';
            const usedCounts = {};
            placedSlots.filter(Boolean).forEach(w => usedCounts[w] = (usedCounts[w] || 0) + 1);

            scrambledWords.forEach(word => {
                const btn = document.createElement('button');
                btn.className = 'sb-puzzle-chip';
                btn.textContent = word;

                const isPlaced = (usedCounts[word] || 0) > 0;
                if (isPlaced) {
                    btn.classList.add('placed');
                    usedCounts[word]--;
                } else {
                    btn.onclick = () => {
                        const firstEmpty = placedSlots.indexOf(null);
                        if (firstEmpty !== -1) {
                            placedSlots[firstEmpty] = word;
                            speakDanish(word);
                            updateSlotsAndBank();
                        }
                    };
                }

                bankEl.appendChild(btn);
            });

            // Check if all 4 are filled
            if (!placedSlots.includes(null)) {
                checkPuzzle();
            } else {
                feedbackEl.innerHTML = '';
            }
        }

        function checkPuzzle() {
            const isCorrect = placedSlots.every((w, i) => w === correctOrder[i]);
            const fullSentence = `${placedSlots[0]} ${placedSlots[1]} ${placedSlots[2]} ${placedSlots[3]}.`;

            if (isCorrect) {
                completedKlasseChallenges.add(currentKlasseChallengeIdx);
                speakDanish(fullSentence);

                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg success" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                        <span>${renderDsIcon('check', '', { size: 18 })}</span>
                        <span>Fantastisk! "<strong>${fullSentence}</strong>"</span>
                    </div>
                    <div style="color: var(--by-text-muted, #a7f3d0); font-size: 0.95rem; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
                        <span>${renderDsIcon('lightbulb', '', { size: 16 })}</span>
                        <span>${task.pedagogyNote}</span>
                    </div>
                    <div class="sb-action-row">
                        <button class="sb-listen-btn" id="klasse-listen-full">
                            <span>${renderDsIcon('volume', '', { size: 16 })}</span> <span>Hør sætningen igen</span>
                        </button>
                        <button class="sb-action-btn" id="klasse-next-btn">
                            ${currentKlasseChallengeIdx < klasseChallengeTasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra ➔'}
                        </button>
                    </div>
                `;

                feedbackEl.querySelector('#klasse-listen-full').onclick = () => speakDanish(fullSentence);
                feedbackEl.querySelector('#klasse-next-btn').onclick = () => {
                    currentKlasseChallengeIdx = (currentKlasseChallengeIdx + 1) % klasseChallengeTasks.length;
                    setupKlasseChallenge();
                };
            } else {
                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg error">
                        ✗ Rækkefølgen er ikke helt rigtig.
                    </div>
                    <div style="color: var(--by-text-muted, #a7f3d0); font-size: 0.95rem; margin-bottom: 0.6rem;">
                        Husk rækkefølgen på dansk: 1. Hvem (Subjekt) ➔ 2. Handling (Verbum) ➔ 3. Hvilken ting (Objekt) ➔ 4. Hvor (Sted).
                    </div>
                    <button class="sb-action-btn" id="klasse-retry-btn" style="background: #475569;">
                        Nulstil brikker
                    </button>
                `;

                feedbackEl.querySelector('#klasse-retry-btn').onclick = () => {
                    placedSlots = [null, null, null, null];
                    updateSlotsAndBank();
                };
            }
        }

        updateSlotsAndBank();
    }

    // Initialize both sub-tabs
    setupFreeBuilder();
    setupKlasseChallenge();

    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_vrimmel';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
