import { getTranslation, getLang } from '../utils/i18n.js';
import { kitchenWordTranslations } from '../utils/top100_translations.js';
import { shuffleArray } from '../utils/shuffle.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getGrammarSlotHint, renderPuzzleSlotInnerHtml, renderPuzzleSlotFilledHtml } from '../utils/puzzle_slot_hints.js';

function stripLeadingEmoji(text) {
    if (!text) return '';
    return text.replace(/^[\p{Extended_Pictographic}\s\uFE0F]+/u, '').trim();
}

/**
 * KoekkenHjemmetView - Test-prototype for semantisk ordforråd: Køkkenet & Hjemmet
 * Implementerer 4-trins modellen + kønstræning (farve-radar) + detektiv + mikro-historie + sætningsbygger.
 */
export function renderKoekkenHjemmetView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container koekken-vrimmel-view';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('word_learning');
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

    // Similarity checker for Danish pronunciation
    function isWordSimilar(w1, w2) {
        if (!w1 || !w2) return false;
        if (w1 === w2) return true;
        if (w1.length >= 3 && w2.length >= 3) {
            if (w1.includes(w2) || w2.includes(w1)) return true;
            if (Math.abs(w1.length - w2.length) <= 1 && w1.length >= 4) {
                let diffs = 0;
                const minLen = Math.min(w1.length, w2.length);
                for (let i = 0; i < minLen; i++) {
                    if (w1[i] !== w2[i]) diffs++;
                }
                if (diffs <= 1) return true;
            }
        }
        return false;
    }

    // Sentence match evaluator comparing spoken transcript against target sentence
    function evaluateSentenceMatch(targetSentence, spokenText) {
        const cleanWord = (w) => w.toLowerCase().replace(/[.,!?:;—–"']/g, '').trim();
        const targetWords = targetSentence.trim().split(/\s+/);
        const targetClean = targetWords.map(cleanWord);
        const spokenWords = spokenText.trim().split(/\s+/).map(cleanWord).filter(Boolean);

        let matchCount = 0;
        let spokenIdx = 0;
        const wordResults = [];

        targetClean.forEach((targetW, i) => {
            let matched = false;
            for (let j = spokenIdx; j < Math.min(spokenIdx + 4, spokenWords.length); j++) {
                const spkW = spokenWords[j];
                if (spkW === targetW || isWordSimilar(spkW, targetW)) {
                    matched = true;
                    spokenIdx = j + 1;
                    break;
                }
            }
            if (matched) {
                matchCount++;
                wordResults.push({ word: targetWords[i], correct: true });
            } else {
                wordResults.push({ word: targetWords[i], correct: false });
            }
        });

        const isSuccess = targetClean.length > 0 && (matchCount / targetClean.length >= 0.70 || matchCount === targetClean.length);
        return {
            isSuccess,
            matchCount,
            totalCount: targetClean.length,
            wordResults,
            spoken: spokenText
        };
    }

    // Reusable SpeechRecognition handler for sentence-level training
    function setupSentenceMic(micBtn, feedbackBox, targetSentenceOrFn, onSuccess = null, onResultCallback = null) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            micBtn.onclick = () => {
                feedbackBox.className = 'speech-feedback-box incorrect';
                feedbackBox.textContent = getTranslation('vrimmel_mic_unsupported') || 'Tale-genkendelse understøttes i Chrome, Safari og Edge.';
            };
            return;
        }

        let rec = null;
        let isListening = false;
        const originalHtml = micBtn.innerHTML;

        micBtn.onclick = () => {
            if (isListening && rec) {
                rec.stop();
                return;
            }

            const target = typeof targetSentenceOrFn === 'function' ? targetSentenceOrFn() : targetSentenceOrFn;
            if (!target) return;

            try {
                rec = new SpeechRecognition();
                rec.lang = 'da-DK';
                rec.interimResults = false;
                rec.maxAlternatives = 1;

                rec.onstart = () => {
                    isListening = true;
                    micBtn.classList.add('listening');
                    micBtn.innerHTML = `<span>🔴</span> ${getTranslation('vrimmel_mic_listening') || 'Lytter...'}`;
                    feedbackBox.className = 'speech-feedback-box listening';
                    feedbackBox.textContent = `Sig: "${target}"`;
                };

                rec.onresult = (evt) => {
                    const spoken = evt.results[0][0].transcript.trim();
                    const evalResult = evaluateSentenceMatch(target, spoken);

                    if (onResultCallback) {
                        onResultCallback(evalResult);
                    }

                    if (evalResult.isSuccess) {
                        feedbackBox.className = 'speech-feedback-box correct';
                        feedbackBox.innerHTML = `🎉 Flot udtalt! "<strong>${spoken}</strong>" ✓`;
                        if (onSuccess) onSuccess(evalResult);
                    } else {
                        feedbackBox.className = 'speech-feedback-box incorrect';
                        feedbackBox.innerHTML = `Prøv igen. Maskinen hørte: "<em>${spoken}</em>"`;
                    }
                };

                rec.onerror = (err) => {
                    isListening = false;
                    micBtn.classList.remove('listening');
                    micBtn.innerHTML = originalHtml;
                    if (err.error !== 'no-speech') {
                        feedbackBox.className = 'speech-feedback-box incorrect';
                        feedbackBox.textContent = `Mikrofon: ${err.error}`;
                    }
                };

                rec.onend = () => {
                    isListening = false;
                    micBtn.classList.remove('listening');
                    micBtn.innerHTML = originalHtml;
                };

                rec.start();
            } catch (e) {
                feedbackBox.className = 'speech-feedback-box incorrect';
                feedbackBox.textContent = 'Kunne ikke starte mikrofonen.';
                micBtn.classList.remove('listening');
                micBtn.innerHTML = originalHtml;
            }
        };
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .koekken-vrimmel-view {
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
        .koekken-vrimmel-view .ds-icon-emoji {
            display: none !important;
        }
        .koekken-vrimmel-view .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }
        .koekken-vrimmel-view .ds-icon-svg svg {
            display: inline-block;
            vertical-align: middle;
            stroke: currentColor;
        }

        .kv-hero-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .kv-hero-header h1 {
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
        .kv-hero-header p {
            color: #FFFFFF !important;
            font-size: 1.1rem;
            max-width: 780px;
            margin: 0 auto;
            line-height: 1.5;
            opacity: 0.95;
        }

        /* Tabs Navigation */
        .kv-tabs {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 2rem;
            background: var(--by-surface-input, #02220e);
            padding: 0.5rem;
            border-radius: 16px;
            border: 1.5px solid var(--by-border, #136832);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }
        .kv-tab-btn {
            background: transparent;
            color: var(--by-text-muted, #a7f3d0);
            border: none;
            padding: 0.7rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .kv-tab-btn:hover {
            color: #ffffff;
            background: var(--by-surface-hover, #0c4f24);
        }
        .kv-tab-btn.active {
            background: var(--by-primary, #22c55e);
            color: #02220e;
            font-weight: 800;
            box-shadow: 0 4px 14px rgba(34, 197, 94, 0.45);
        }

        /* Panel Container */
        .kv-panel {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        .kv-panel.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* =========================================
           TAB 1: VRIMLEBILLEDE & FARVE-RADAR
           ========================================= */
        .vrimmel-card {
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
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
        .radar-toggle-wrapper {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .radar-toggle-btn {
            background: #1e293b;
            color: #f1f5f9;
            border: 2px solid #64748b;
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
        .radar-toggle-btn.active {
            background: linear-gradient(135deg, #0284c7, #ea580c);
            border-color: #38bdf8;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
            color: white;
        }
        .pure-image-toggle-btn {
            background: var(--by-surface-input, #02220e);
            color: #f1f5f9;
            border: 1.5px solid var(--by-border, #136832);
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
            background: var(--by-primary, #22c55e);
            color: #02220e;
            border-color: #86efac;
            box-shadow: 0 0 18px rgba(34, 197, 94, 0.5);
        }
        .vrimmel-stage.pure-mode .vrimmel-hotspot {
            display: none !important;
        }
        .radar-legend {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            font-size: 0.9rem;
        }
        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .legend-dot-en {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #38bdf8;
            box-shadow: 0 0 8px #38bdf8;
        }
        .legend-dot-et {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #f97316;
            box-shadow: 0 0 8px #f97316;
        }

        /* Image with Hotspots */
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
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.8rem;
            border: 2px solid white;
            transition: all 0.25s ease;
            z-index: 10;
            background: rgba(2, 34, 14, 0.85);
            color: #f8fafc;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }
        .vrimmel-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.3);
            z-index: 20;
            background: var(--by-primary, #22c55e);
            color: #02220e;
        }

        /* When Radar is Active */
        .radar-active .vrimmel-hotspot.hotspot-en {
            background: rgba(2, 132, 199, 0.92);
            color: white;
            border-color: #7dd3fc;
            box-shadow: 0 0 14px rgba(56, 189, 248, 0.9);
            animation: pulseBlue 1.6s infinite;
        }
        .radar-active .vrimmel-hotspot.hotspot-et {
            background: rgba(234, 88, 12, 0.92);
            color: white;
            border-color: #fdba74;
            box-shadow: 0 0 14px rgba(249, 115, 22, 0.9);
            animation: pulseOrange 1.6s infinite;
        }
        @keyframes pulseBlue {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px #38bdf8; }
            50% { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 22px #38bdf8, 0 0 35px rgba(56, 189, 248, 0.6); }
        }
        @keyframes pulseOrange {
            0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px #f97316; }
            50% { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 22px #f97316, 0 0 35px rgba(249, 115, 22, 0.6); }
        }

        /* Hotspot popup card */
        .hotspot-detail-card {
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
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
        .detail-main-word {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.3rem;
        }
        .detail-forms {
            font-size: 0.95rem;
            color: var(--by-text-muted, #a7f3d0);
            margin-bottom: 0.5rem;
        }
        .detail-sentence {
            font-size: 1.05rem;
            color: #FFFFFF;
            font-style: italic;
        }
        .detail-sentence .udtale-word {
            display: inline-block;
            transition: all 0.25s ease;
            padding: 0 2px;
            border-radius: 4px;
        }
        .detail-sentence .udtale-word.correct {
            color: #4ade80 !important;
            font-weight: 700;
        }
        .detail-sentence .udtale-word.incorrect {
            color: #f87171 !important;
            text-decoration: underline wavy #ef4444;
        }
        .listen-word-btn {
            background: var(--by-surface-hover, #0c4f24);
            color: white;
            border: 1.5px solid var(--by-border-light, #1b793c);
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
        .listen-word-btn:hover {
            background: var(--by-primary, #22c55e);
            color: #02220e;
            transform: scale(1.05);
        }
        .mic-speak-btn {
            background: var(--by-surface-input, #02220e);
            color: #f8fafc;
            border: 1.5px solid var(--by-border, #136832);
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

        /* En/Et Sorting Game */
        .sorting-game-box {
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 18px;
            padding: 1.5rem;
            margin-top: 2rem;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
        }
        .sorting-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.2rem;
        }
        .sorting-header-row h3 {
            font-size: 1.3rem;
            margin: 0;
            color: #FFFFFF;
        }
        .sort-progress-badge {
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
            border: 1px solid var(--by-border, #136832);
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
            min-height: 180px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .bin-en {
            background: rgba(2, 132, 199, 0.12);
            border: 2px dashed #0284c7;
        }
        .bin-en:hover {
            background: rgba(2, 132, 199, 0.22);
        }
        .bin-et {
            background: rgba(234, 88, 12, 0.12);
            border: 2px dashed #ea580c;
        }
        .bin-et:hover {
            background: rgba(234, 88, 12, 0.22);
        }
        .bin-title {
            font-size: 1.15rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            text-align: center;
        }
        .bin-title-en { color: #38bdf8; }
        .bin-title-et { color: #fb923c; }
        .bin-items-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
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
            gap: 0.6rem;
            justify-content: center;
            background: var(--by-surface-input, #02220e);
            padding: 1.2rem;
            border-radius: 14px;
            border: 1px solid var(--by-border, #136832);
        }
        .sort-word-chip {
            background: var(--by-surface-hover, #0c4f24);
            color: white;
            border: 1.5px solid var(--by-border, #136832);
            padding: 0.55rem 1.1rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sort-word-chip:hover {
            border-color: var(--by-primary, #22c55e);
            background: #15803d;
            transform: translateY(-2px);
        }
        .sort-word-chip.selected {
            border-color: #86efac;
            box-shadow: 0 0 14px rgba(34, 197, 94, 0.6);
            background: var(--by-primary, #22c55e);
            color: #02220e;
        }
        .sort-word-chip.placed {
            opacity: 0.35;
            pointer-events: none;
            background: #02220e;
            text-decoration: line-through;
        }
        .sort-actions-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1.2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .reset-sort-btn {
            background: var(--by-surface-input, #02220e);
            color: white;
            border: 1px solid var(--by-border, #136832);
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .reset-sort-btn:hover {
            background: var(--by-surface-hover, #0c4f24);
        }

        /* =========================================
           TAB 2: DETEKTIV-MISSIONEN
           ========================================= */
        .mission-card {
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
        }
        .mission-header {
            text-align: center;
            margin-bottom: 1.8rem;
        }
        .mission-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #f59e0b;
            color: #000;
            font-weight: 800;
            font-size: 0.85rem;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            text-transform: uppercase;
            margin-bottom: 0.6rem;
        }
        .mission-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.4rem;
        }
        .mission-counter {
            font-size: 0.95rem;
            color: var(--by-text-muted, #a7f3d0);
        }
        .clues-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .clue-btn {
            background: var(--by-surface-input, #02220e);
            border: 1.5px solid var(--by-border, #136832);
            color: white;
            padding: 1.2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
        }
        .clue-btn:hover {
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
            transform: translateY(-3px);
        }
        .clue-btn.selected-correct {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            border-color: #86efac !important;
            color: #ffffff !important;
            font-weight: 800 !important;
        }
        .clue-btn.selected-wrong {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            border-color: #fca5a5 !important;
            color: #ffffff !important;
            font-weight: 800 !important;
        }
        .mission-feedback {
            text-align: center;
            min-height: 50px;
            margin-top: 1rem;
        }
        .mission-next-btn {
            background: var(--by-primary, #22c55e);
            color: #02220e;
            font-weight: 800;
            border: none;
            padding: 0.8rem 1.6rem;
            border-radius: 12px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 1rem;
        }
        .mission-next-btn:hover {
            background: #4ade80;
            transform: scale(1.05);
        }

        /* =========================================
           TAB 3: EN LILLE HISTORIE
           ========================================= */
        .story-container {
            max-width: 800px;
            margin: 0 auto;
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
        }
        .story-nav-pills {
            display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.8rem;
        }
        .story-nav-btn {
            background: var(--by-surface-input, #02220e); color: var(--by-text-muted, #a7f3d0); border: 1.5px solid var(--by-border, #136832); padding: 0.6rem 1.2rem;
            border-radius: 12px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease;
        }
        .story-nav-btn:hover { border-color: var(--by-primary, #22c55e); color: white; transform: translateY(-2px); }
        .story-nav-btn.active {
            background: var(--by-primary, #22c55e); color: #02220e; border-color: #86efac; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35); font-weight: 800;
        }
        .story-step-card {
            background: var(--by-surface-input, #02220e);
            border: 1px solid var(--by-border, #136832);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border-left: 5px solid var(--by-primary, #22c55e);
            transition: all 0.3s ease;
        }
        .story-step-card.active-step {
            border-left-color: #f59e0b;
            box-shadow: 0 4px 20px rgba(245, 158, 11, 0.2);
        }
        .story-step-card h4 {
            font-size: 1.15rem;
            margin-bottom: 0.6rem;
            color: #f1f5f9;
        }
        .story-options-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-top: 0.8rem;
        }
        .story-opt-btn {
            background: var(--by-surface, #073518);
            color: white;
            border: 1px solid var(--by-border, #136832);
            padding: 0.6rem 1.2rem;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .story-opt-btn:hover {
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
        }
        .story-opt-btn.correct {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            border-color: #86efac !important;
            color: #ffffff !important;
            font-weight: 800 !important;
        }
        .story-opt-btn.wrong {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            border-color: #fca5a5 !important;
            color: #ffffff !important;
            font-weight: 800 !important;
        }
        .story-explanation-box {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            border-radius: 14px;
            padding: 1.2rem;
            margin-top: 1.5rem;
            font-size: 1rem;
            color: #4ade80;
            text-align: center;
        }

        /* =========================================
           TAB 4: OVEREMNE OG UNDEREMNE
           ========================================= */
        .category-card {
            max-width: 800px;
            margin: 0 auto;
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
        }
        .category-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #8b5cf6;
            color: white;
            font-weight: 800;
            font-size: 0.85rem;
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.8rem;
        }
        .category-subwords-row {
            display: flex;
            justify-content: center;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin: 1.2rem 0 1.6rem;
        }
        .category-word-chip {
            background: var(--by-surface-input, #02220e);
            border: 1.5px solid var(--by-border, #136832);
            color: #f8fafc;
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.1rem;
        }
        .category-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-top: 1.2rem;
        }
        .category-opt-btn {
            background: var(--by-surface-input, #02220e);
            border: 1.5px solid var(--by-border, #136832);
            color: white;
            padding: 1.1rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .category-opt-btn:hover {
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
            transform: translateY(-2px);
        }
        .category-opt-btn.selected-correct {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            border-color: #86efac !important;
            color: #ffffff !important;
            font-weight: 800 !important;
        }
        .category-opt-btn.selected-wrong {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            border-color: #fca5a5 !important;
            color: #ffffff !important;
            font-weight: 800 !important;
        }

        /* =========================================
           TAB 5: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
           ========================================= */
        .sentence-builder-card {
            max-width: 960px;
            margin: 0 auto;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* =========================================
           TAB 5: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
           ========================================= */
        .sentence-builder-card {
            max-width: 960px;
            margin: 0 auto;
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
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
            border: 1.5px solid var(--by-border, #136832);
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
            border-color: #86efac;
            font-weight: 800;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.45);
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
            background: var(--by-surface-input, #02220e);
            border-radius: 14px;
            padding: 1rem 1.2rem;
            border: 1px solid var(--by-border, #136832);
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
            color: #ffffff;
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
        .badge-cat-subjekt { background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.4); }
        .badge-cat-verbum { background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); }
        .badge-cat-objekt { background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.4); }
        .badge-cat-sted { background: rgba(2, 132, 199, 0.2); color: #93c5fd; border: 1px solid rgba(2, 132, 199, 0.4); }

        .sb-chips-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .sb-chip-btn {
            background: rgba(255, 255, 255, 0.08);
            color: #f8fafc;
            border: 1.5px solid rgba(255, 255, 255, 0.18);
            padding: 0.55rem 1rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .sb-chip-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.16);
            border-color: rgba(255, 255, 255, 0.35);
            transform: translateY(-2px);
        }
        .sb-chip-btn.selected {
            font-weight: 800;
            transform: translateY(-2px);
        }

        /* LØSNING 1: SOLIDE BRIKKER */
        .sb-cat-subjekt .sb-chip-btn.selected,
        .sb-cat-objekt .sb-chip-btn.selected {
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%) !important;
            color: #FFFFFF !important;
            border: 1.5px solid #86efac !important;
            box-shadow: 0 4px 16px rgba(34, 197, 94, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.2) inset !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;
        }
        .sb-cat-verbum .sb-chip-btn.selected {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
            color: #FFFFFF !important;
            border: 1.5px solid #fca5a5 !important;
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.2) inset !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;
        }
        .sb-cat-sted .sb-chip-btn.selected {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;
            color: #FFFFFF !important;
            border: 1.5px solid #93c5fd !important;
            box-shadow: 0 4px 16px rgba(2, 132, 199, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.2) inset !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;
        }

        /* Live Result Box */
        .sb-live-box {
            background: var(--by-surface-input, #02220e);
            border: 2px solid var(--by-border, #136832);
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
            background: var(--by-surface, #073518);
            color: #f8fafc;
            border: 1.5px solid var(--by-primary, #22c55e);
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
            background: var(--by-surface-hover, #0c4f24);
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.35);
            transform: scale(1.03);
        }
        .sb-mic-btn {
            background: rgba(239, 68, 68, 0.15) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }
        .sb-mic-btn:hover {
            background: rgba(239, 68, 68, 0.3) !important;
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.5) !important;
            transform: scale(1.03);
        }
        .sb-mic-btn.listening {
            background: #ef4444 !important;
            color: #ffffff !important;
            border-color: #f87171 !important;
            animation: micGlow 1.2s infinite ease-in-out;
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
            background: var(--by-surface-input, #02220e);
            color: var(--by-text-muted, #a7f3d0);
            border: 1px solid var(--by-border, #136832);
            font-size: 0.8rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .sb-task-pill.active {
            border-color: var(--by-primary, #22c55e);
            color: #02220e;
            background: var(--by-primary, #22c55e);
            font-weight: 800;
        }
        .sb-task-pill.done {
            background: #16a34a;
            color: #ffffff;
            border-color: #22c55e;
        }

        /* Step 1: Semantic Match */
        .sb-context-card {
            background: var(--by-surface-input, #02220e);
            border: 1px solid var(--by-border, #136832);
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .sb-context-title {
            font-size: 1.05rem;
            color: var(--by-text-muted, #a7f3d0);
            margin-bottom: 0.8rem;
        }
        .sb-context-elements {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 0.8rem;
        }
        .sb-context-chip {
            padding: 0.6rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1.05rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }
        .sb-context-chip.subjekt { background: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.4); }
        .sb-context-chip.verbum { background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); }
        .sb-context-chip.sted { background: rgba(2, 132, 199, 0.2); color: #93c5fd; border: 1px solid rgba(2, 132, 199, 0.4); }
        .sb-chip-role {
            font-size: 0.82rem;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.5px;
            opacity: 0.95;
        }

        .sb-question-box {
            background: rgba(34, 197, 94, 0.12);
            border: 1px solid rgba(34, 197, 94, 0.3);
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
            background: var(--by-surface-input, #02220e);
            color: white;
            border: 1.5px solid var(--by-border, #136832);
            padding: 1rem 1.2rem;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .sb-option-btn:hover {
            border-color: var(--by-primary, #22c55e);
            background: var(--by-surface-hover, #0c4f24);
            transform: translateY(-2px);
        }
        .sb-option-btn.correct {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            border-color: #86efac !important;
            color: #ffffff !important;
            font-weight: 800 !important;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.5) !important;
        }
        .sb-option-btn.incorrect {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            border-color: #fca5a5 !important;
            color: #ffffff !important;
            font-weight: 800 !important;
            animation: shakeBin 0.4s ease;
        }

        /* Step 2: Puzzle */
        .sb-puzzle-section {
            background: var(--by-surface-input, #02220e);
            border: 1px solid var(--by-border, #136832);
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
            color: var(--by-text-muted, #a7f3d0);
            margin-bottom: 1.2rem;
        }
        .sb-puzzle-slots {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .sb-puzzle-slot {
            background: #041d0b;
            border: 2px dashed var(--by-border, #136832);
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
            box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.35);
        }
        .sb-puzzle-slot.slot-0 {
            border-color: rgba(34, 197, 94, 0.55);
            background: linear-gradient(180deg, rgba(34, 197, 94, 0.12) 0%, rgba(4, 29, 11, 0.95) 100%);
        }
        .sb-puzzle-slot.slot-1 {
            border-color: rgba(239, 68, 68, 0.55);
            background: linear-gradient(180deg, rgba(239, 68, 68, 0.12) 0%, rgba(4, 29, 11, 0.95) 100%);
        }
        .sb-puzzle-slot.slot-2 {
            border-color: rgba(34, 197, 94, 0.55);
            background: linear-gradient(180deg, rgba(34, 197, 94, 0.12) 0%, rgba(4, 29, 11, 0.95) 100%);
        }
        .sb-puzzle-slot.slot-3 {
            border-color: rgba(56, 189, 248, 0.55);
            background: linear-gradient(180deg, rgba(56, 189, 248, 0.12) 0%, rgba(4, 29, 11, 0.95) 100%);
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

        .sb-puzzle-slot.filled {
            border-style: solid;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
        }
        .sb-puzzle-slot.filled.slot-0 {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            border-color: #86efac !important;
        }
        .sb-puzzle-slot.filled.slot-1 {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            border-color: #fca5a5 !important;
        }
        .sb-puzzle-slot.filled.slot-2 {
            background: linear-gradient(135deg, #16a34a, #15803d) !important;
            border-color: #86efac !important;
        }
        .sb-puzzle-slot.filled.slot-3 {
            background: linear-gradient(135deg, #0284c7, #0369a1) !important;
            border-color: #93c5fd !important;
        }
        .sb-puzzle-slot.filled .slot-filled-word {
            font-weight: 800;
            font-size: 1.25rem;
            line-height: 1.2;
            color: #ffffff;
            margin-bottom: 0.15rem;
        }
        .sb-puzzle-slot.filled .slot-remove {
            position: absolute;
            top: 6px;
            right: 8px;
            font-size: 0.85rem;
            color: #ffffff;
            opacity: 0.8;
            transition: all 0.2s;
        }
        .sb-puzzle-slot.filled:hover .slot-remove {
            opacity: 1;
            transform: scale(1.1);
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
            background: rgba(0, 0, 0, 0.35);
            border: 1px solid var(--by-border, #136832);
            border-radius: 12px;
            min-height: 60px;
        }
        .sb-puzzle-chip {
            background: var(--by-surface, #073518);
            color: white;
            border: 1.5px solid var(--by-border, #136832);
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
            text-decoration: line-through;
        }

        /* Feedback box */
        .sb-feedback-box {
            text-align: center;
            margin-top: 1rem;
        }
        .sb-feedback-msg {
            font-size: 1.15rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            padding: 0.8rem 1.2rem;
            border-radius: 12px;
            display: inline-block;
        }
        .sb-feedback-msg.success {
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            border: 1px solid #22c55e;
        }
        .sb-feedback-msg.error {
            background: rgba(239, 68, 68, 0.15);
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
    heroHeader.className = 'kv-hero-header';
    const cleanHeroTitle = stripLeadingEmoji(getTranslation('koekken_hero_title')) || 'Køkkenet og hjemmet';
    heroHeader.innerHTML = `
        <h1><span class="kv-hero-icon">${renderDsIcon('coffee', '', { size: 30 })}</span> <span>${cleanHeroTitle}</span></h1>
        <p>${getTranslation('koekken_hero_desc')}</p>
    `;
    viewContainer.appendChild(heroHeader);

    // Tabs Menu
    const tabsMenu = document.createElement('div');
    tabsMenu.className = 'kv-tabs';
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
        btn.className = `kv-tab-btn ${t.id === currentTab ? 'active' : ''}`;
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span class="kv-tab-icon">${t.icon}</span> <span>${t.label}</span>`;
        btn.onclick = () => switchTab(t.id);
        tabsMenu.appendChild(btn);
    });
    viewContainer.appendChild(tabsMenu);

    // Panels Holder
    const panelsHolder = document.createElement('div');
    viewContainer.appendChild(panelsHolder);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/koekken_hjemmet/' + tabId);
        tabsMenu.querySelectorAll('.kv-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        panelsHolder.querySelectorAll('.kv-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === tabId);
        });
    }

    // ========================================================
    // --- NØGLEORD DATA (Præcis 20 ord fra top 100 frekvensliste)
    // ========================================================
    const kitchenWords = [
        { word: 'en sol', clean: 'sol', gender: 'en', bestemt: 'solen', flertal: 'sole', x: 8.8, y: 18, iconName: 'lightbulb', sentence: 'Solen skinner ind ad vinduet.' },
        { word: 'et vindue', clean: 'vindue', gender: 'et', bestemt: 'vinduet', flertal: 'vinduer', x: 15, y: 11, iconName: 'home', sentence: 'Hun åbner et vindue.' },
        { word: 'et træ', clean: 'træ', gender: 'et', bestemt: 'træet', flertal: 'træer', x: 19.5, y: 23, iconName: 'mapPin', sentence: 'Der står et træ i haven.' },
        { word: 'en hund', clean: 'hund', gender: 'en', bestemt: 'hunden', flertal: 'hunde', x: 11.5, y: 70, iconName: 'user', sentence: 'Hunden spiser mad.' },
        { word: 'en kat', clean: 'kat', gender: 'en', bestemt: 'katten', flertal: 'katte', x: 18.5, y: 67, iconName: 'eye', sentence: 'Katten kigger på madskålen.' },
        { word: 'et barn', clean: 'barn', gender: 'et', bestemt: 'barnet', flertal: 'børn', x: 28.5, y: 55, iconName: 'user', sentence: 'Barnet spiser mad.' },
        { word: 'en mor', clean: 'mor', gender: 'en', bestemt: 'moren', flertal: 'mødre', x: 34, y: 44, iconName: 'user', sentence: 'Moren laver mad.' },
        { word: 'en far', clean: 'far', gender: 'en', bestemt: 'faren', flertal: 'fædre', x: 49, y: 46, iconName: 'user', sentence: 'Faren taler ved bordet.' },
        { word: 'en seng', clean: 'seng', gender: 'en', bestemt: 'sengen', flertal: 'senge', x: 60, y: 38, iconName: 'home', sentence: 'Sengen står inde i soveværelset.' },
        { word: 'et stykke tøj', clean: 'stykke tøj', gender: 'et', bestemt: 'tøjet', flertal: 'tøj', x: 71, y: 32, iconName: 'tag', sentence: 'Tøjet hænger på en knage.' },
        { word: 'en sko', clean: 'sko', gender: 'en', bestemt: 'skoen', flertal: 'sko', x: 71, y: 53, iconName: 'tag', sentence: 'Skoene står på gulvet.' },
        { word: 'en stol', clean: 'stol', gender: 'en', bestemt: 'stolen', flertal: 'stole', x: 29, y: 83, iconName: 'home', sentence: 'Drengen sidder på en stol.' },
        { word: 'en mad', clean: 'mad', gender: 'en', bestemt: 'maden', flertal: 'madder', x: 38, y: 64, iconName: 'coffee', sentence: 'De spiser mad sammen.' },
        { word: 'en kop', clean: 'kop', gender: 'en', bestemt: 'koppen', flertal: 'kopper', x: 42, y: 58, iconName: 'coffee', sentence: 'Hun drikker en kop kaffe.' },
        { word: 'et stykke kød', clean: 'stykke kød', gender: 'et', bestemt: 'kødet', flertal: 'kød', x: 44.5, y: 68, iconName: 'coffee', sentence: 'De spiser kød til aften.' },
        { word: 'en fisk', clean: 'fisk', gender: 'en', bestemt: 'fisken', flertal: 'fisk', x: 47.5, y: 70, iconName: 'coffee', sentence: 'De spiser fisk til frokost.' },
        { word: 'et glas', clean: 'glas', gender: 'et', bestemt: 'glasset', flertal: 'glas', x: 54.5, y: 64, iconName: 'coffee', sentence: 'Hun drikker et glas vand.' },
        { word: 'et bord', clean: 'bord', gender: 'et', bestemt: 'bordet', flertal: 'borde', x: 57, y: 68, iconName: 'home', sentence: 'Familien sidder ved bordet.' },
        { word: 'en kaffe', clean: 'kaffe', gender: 'en', bestemt: 'kaffen', flertal: 'kaffe', x: 90.5, y: 49, iconName: 'coffee', sentence: 'Faren drikker varm kaffe.' },
        { word: 'et problem', clean: 'problem', gender: 'et', bestemt: 'problemet', flertal: 'problemer', x: 93, y: 79, iconName: 'alertTriangle', sentence: 'Kaffen vælter – det er et problem.' }
    ];

    // ========================================================
    // --- 1. DEL: VRIMLEBILLEDE MED FARVE-RADAR (EN / ET)
    // ========================================================
    const vrimmelPanel = document.createElement('div');
    vrimmelPanel.className = 'kv-panel active';
    vrimmelPanel.dataset.panel = 'tab_vrimmel';

    const vrimmelCard = document.createElement('div');
    vrimmelCard.className = 'vrimmel-card';

    // Control bar
    const controlBar = document.createElement('div');
    controlBar.className = 'radar-control-bar';

    const pureBtn = document.createElement('button');
    pureBtn.className = 'pure-image-toggle-btn';
    pureBtn.innerHTML = `<span>${renderDsIcon('image', '', { size: 16 })}</span> <span>${getTranslation('vrimmel_pure_btn')}</span> <strong id="pure-mode-status">${getTranslation('vrimmel_status_off')}</strong>`;

    let pureModeActive = false;
    pureBtn.onclick = () => {
        pureModeActive = !pureModeActive;
        stage.classList.toggle('pure-mode', pureModeActive);
        pureBtn.classList.toggle('active', pureModeActive);
        pureBtn.querySelector('#pure-mode-status').textContent = pureModeActive ? getTranslation('vrimmel_status_on') : getTranslation('vrimmel_status_off');
    };

    controlBar.appendChild(pureBtn);
    vrimmelCard.appendChild(controlBar);

    // Stage with Image + Hotspots
    const stage = document.createElement('div');
    stage.className = 'vrimmel-stage';

    const img = document.createElement('img');
    img.src = 'assets/koekken_vrimmel.jpg';
    img.alt = 'Køkkenet og hjemmet vrimlebillede';
    img.className = 'vrimmel-img';
    stage.appendChild(img);

    // Detail Display Box below image
    const detailBox = document.createElement('div');
    detailBox.className = 'hotspot-detail-card';
    detailBox.innerHTML = `
        <div>
            <div class="detail-word-badge badge-en">${getTranslation('koekken_default_badge')}</div>
            <div class="detail-main-word">${getTranslation('koekken_default_title')}</div>
            <div class="detail-forms">${getTranslation('koekken_default_desc')}</div>
        </div>
    `;

    // Render Hotspots on Stage
    const renderedHotspots = [];
    kitchenWords.forEach((kw) => {
        const spot = document.createElement('div');
        spot.className = `vrimmel-hotspot hotspot-${kw.gender}`;
        spot.style.left = `${kw.x}%`;
        spot.style.top = `${kw.y}%`;
        spot.textContent = '?';
        spot.title = kw.word;

        spot.onclick = () => {
            const lang = getLang();
            const wordTrans = kitchenWordTranslations[kw.word]?.[lang] || (lang !== 'da' ? kitchenWordTranslations[kw.word]?.['en'] : null);
            const transMeaning = wordTrans?.meaning;
            const transSentence = wordTrans?.sentence;

            const sentenceWordsHtml = kw.sentence.split(' ').map(w => `<span class="udtale-word">${w}</span>`).join(' ');

            detailBox.innerHTML = `
                <div style="flex: 1; min-width: 250px;">
                    <div>
                        <span class="badge-substantiv">${getTranslation('vrimmel_badge_substantiv')}</span>
                        <span class="detail-word-badge badge-${kw.gender}">${kw.gender === 'en' ? stripLeadingEmoji(getTranslation('vrimmel_badge_en')) : stripLeadingEmoji(getTranslation('vrimmel_badge_et'))}</span>
                    </div>
                    <div class="detail-main-word" style="display: flex; align-items: center; gap: 0.6rem;">
                        <span>${renderDsIcon(kw.iconName || 'tag', '', { size: 24 })}</span>
                        <span>${kw.word}</span>
                        <button id="listen-curr-word" style="background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; color: var(--by-text-subtle, #86efac);" title="Hør ordet">${renderDsIcon('volume', '', { size: 18 })}</button>
                        ${transMeaning ? `<span style="font-size: 1.1rem; color: #a7f3d0; font-weight: 500; margin-left: 0.5rem;">(${transMeaning})</span>` : ''}
                    </div>
                    <div class="detail-forms">${getTranslation('vrimmel_form_bestemt')} <strong>${kw.bestemt}</strong> | ${getTranslation('vrimmel_form_flertal')} <strong>${kw.flertal}</strong></div>
                    <div class="detail-sentence" id="vrimmel-sentence-display">"${sentenceWordsHtml}"</div>
                    ${transSentence ? `<div style="font-size: 0.95rem; color: #a7f3d0; font-style: italic; margin-top: 0.2rem;">"${transSentence}"</div>` : ''}
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start;">
                    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                        <button class="listen-word-btn" id="listen-curr-sentence">
                            <span>${renderDsIcon('volume', '', { size: 18 })}</span> <span>Hør sætning</span>
                        </button>
                        <button class="mic-speak-btn" id="mic-curr-sentence">
                            <span>${renderDsIcon('mic', '', { size: 18 })}</span> <span>Udtal sætning</span>
                        </button>
                    </div>
                    <div class="speech-feedback-box" id="speech-feedback"></div>
                </div>
            `;

            detailBox.querySelector('#listen-curr-sentence').onclick = () => {
                speakDanish(kw.sentence);
            };

            detailBox.querySelector('#listen-curr-word').onclick = () => {
                if (kw.audioFile) {
                    const audio = new Audio(kw.audioFile);
                    audio.play().catch(() => speakDanish(kw.word));
                } else {
                    speakDanish(kw.word);
                }
            };

            const micBtn = detailBox.querySelector('#mic-curr-sentence');
            const feedbackBox = detailBox.querySelector('#speech-feedback');

            setupSentenceMic(
                micBtn,
                feedbackBox,
                kw.sentence,
                (evalResult) => {
                    const spans = detailBox.querySelectorAll('#vrimmel-sentence-display .udtale-word');
                    evalResult.wordResults.forEach((res, idx) => {
                        if (spans[idx]) {
                            spans[idx].className = `udtale-word ${res.correct ? 'correct' : 'incorrect'}`;
                        }
                    });
                },
                (evalResult) => {
                    const spans = detailBox.querySelectorAll('#vrimmel-sentence-display .udtale-word');
                    evalResult.wordResults.forEach((res, idx) => {
                        if (spans[idx]) {
                            spans[idx].className = `udtale-word ${res.correct ? 'correct' : 'incorrect'}`;
                        }
                    });
                }
            );

            if (kw.audioFile) {
                const audio = new Audio(kw.audioFile);
                audio.play().catch(() => speakDanish(kw.sentence));
            } else {
                speakDanish(kw.sentence);
            }
        };

        stage.appendChild(spot);
        renderedHotspots.push({ el: spot, kw });
    });

    vrimmelCard.appendChild(stage);
    vrimmelCard.appendChild(detailBox);
    vrimmelPanel.appendChild(vrimmelCard);

    // ========================================================
    // --- KOMPLET EN / ET KASSE-SORTERING (ALLE 20 ORD) ---
    // ========================================================
    const sortingBox = document.createElement('div');
    sortingBox.className = 'sorting-game-box';

    const sortHeader = document.createElement('div');
    sortHeader.className = 'sorting-header-row';
    const cleanSortTitle = stripLeadingEmoji(getTranslation('sort_kitchen_title'));
    sortHeader.innerHTML = `
        <div>
            <h3 style="font-size: 1.3rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>${renderDsIcon('layers', '', { size: 20 })}</span>
                <span>${cleanSortTitle}</span>
            </h3>
            <p style="color: var(--by-text-muted, #a7f3d0); margin: 0.2rem 0 0; font-size: 0.95rem;">${getTranslation('sort_instruction')}</p>
        </div>
        <div class="sort-progress-badge" id="sort-progress-text">${getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', 20)}</div>
    `;
    sortingBox.appendChild(sortHeader);

    const binsContainer = document.createElement('div');
    binsContainer.className = 'bins-container';

    const cleanBinEnTitle = stripLeadingEmoji(getTranslation('sort_bin_en_title'));
    const binEn = document.createElement('div');
    binEn.className = 'sort-bin bin-en';
    binEn.innerHTML = `<div class="bin-title bin-title-en" style="display: flex; align-items: center; justify-content: center; gap: 0.4rem;">${renderDsIcon('tag', '', { size: 16 })} <span>${cleanBinEnTitle}</span></div><div class="bin-items-list" id="bin-en-items"></div>`;

    const cleanBinEtTitle = stripLeadingEmoji(getTranslation('sort_bin_et_title'));
    const binEt = document.createElement('div');
    binEt.className = 'sort-bin bin-et';
    binEt.innerHTML = `<div class="bin-title bin-title-et" style="display: flex; align-items: center; justify-content: center; gap: 0.4rem;">${renderDsIcon('tag', '', { size: 16 })} <span>${cleanBinEtTitle}</span></div><div class="bin-items-list" id="bin-et-items"></div>`;

    binsContainer.appendChild(binEn);
    binsContainer.appendChild(binEt);
    sortingBox.appendChild(binsContainer);

    const wordsBank = document.createElement('div');
    wordsBank.className = 'words-bank-row';

    // Alle 20 ord fra listen:
    const allSortingWords = [
        { name: 'mor', gender: 'en' },
        { name: 'far', gender: 'en' },
        { name: 'barn', gender: 'et' },
        { name: 'bord', gender: 'et' },
        { name: 'stol', gender: 'en' },
        { name: 'seng', gender: 'en' },
        { name: 'kop', gender: 'en' },
        { name: 'kaffe', gender: 'en' },
        { name: 'glas', gender: 'et' },
        { name: 'mad', gender: 'en' },
        { name: 'stykke kød', gender: 'et' },
        { name: 'fisk', gender: 'en' },
        { name: 'hund', gender: 'en' },
        { name: 'kat', gender: 'en' },
        { name: 'vindue', gender: 'et' },
        { name: 'sol', gender: 'en' },
        { name: 'træ', gender: 'et' },
        { name: 'stykke tøj', gender: 'et' },
        { name: 'sko', gender: 'en' },
        { name: 'problem', gender: 'et' }
    ];

    let currentSelectedWord = null;
    let placedCount = 0;

    function renderSortingBank() {
        wordsBank.innerHTML = '';
        allSortingWords.forEach(item => {
            const chip = document.createElement('button');
            chip.className = 'sort-word-chip';
            chip.textContent = item.name;

            chip.onclick = () => {
                currentSelectedWord = item;
                wordsBank.querySelectorAll('.sort-word-chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
            };
            wordsBank.appendChild(chip);
        });
    }

    renderSortingBank();

    binEn.onclick = () => handleBinDrop('en', binEn.querySelector('#bin-en-items'));
    binEt.onclick = () => handleBinDrop('et', binEt.querySelector('#bin-et-items'));

    function handleBinDrop(targetGender, binListEl) {
        if (!currentSelectedWord) {
            return;
        }

        if (currentSelectedWord.gender === targetGender) {
            const placedChip = document.createElement('div');
            placedChip.className = 'chip-in-bin';
            placedChip.textContent = `${targetGender} ${currentSelectedWord.name}`;
            binListEl.appendChild(placedChip);

            placedCount++;
            sortHeader.querySelector('#sort-progress-text').textContent = getTranslation('sort_progress_text').replace('{n}', placedCount).replace('{total}', allSortingWords.length);

            // Disable button in bank
            wordsBank.querySelectorAll('.sort-word-chip').forEach(c => {
                if (c.textContent === currentSelectedWord.name) {
                    c.classList.add('placed');
                    c.classList.remove('selected');
                }
            });

            if (placedCount === allSortingWords.length) {
                sortHeader.querySelector('#sort-progress-text').innerHTML = getTranslation('sort_all_complete');
            }

            currentSelectedWord = null;
        } else {
            const wrongBin = targetGender === 'en' ? binEn : binEt;
            wrongBin.classList.add('bin-shake');
            setTimeout(() => wrongBin.classList.remove('bin-shake'), 400);
        }
    }

    // Actions bar with reset
    const actionsBar = document.createElement('div');
    actionsBar.className = 'sort-actions-bar';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-sort-btn';
    const cleanResetBtn = stripLeadingEmoji(getTranslation('sort_reset_btn'));
    resetBtn.innerHTML = `<span>${renderDsIcon('refresh', '', { size: 16 })}</span> <span>${cleanResetBtn}</span>`;
    resetBtn.style.display = 'inline-flex';
    resetBtn.style.alignItems = 'center';
    resetBtn.style.gap = '0.5rem';
    resetBtn.onclick = () => {
        placedCount = 0;
        currentSelectedWord = null;
        binEn.querySelector('#bin-en-items').innerHTML = '';
        binEt.querySelector('#bin-et-items').innerHTML = '';
        sortHeader.querySelector('#sort-progress-text').textContent = getTranslation('sort_progress_text').replace('{n}', 0).replace('{total}', allSortingWords.length);
        renderSortingBank();
    };

    actionsBar.appendChild(resetBtn);
    sortingBox.appendChild(wordsBank);
    sortingBox.appendChild(actionsBar);
    vrimmelPanel.appendChild(sortingBox);
    panelsHolder.appendChild(vrimmelPanel);

    // ========================================================
    // --- 2. DEL: DETEKTIV-MISSIONEN (KATEGORISERING)
    // ========================================================
    const detektivPanel = document.createElement('div');
    detektivPanel.className = 'kv-panel';
    detektivPanel.dataset.panel = 'tab_detektiv';

    const missions = [
        {
            title: "Find 3 ting, man kan drikke",
            iconName: "coffee",
            targetCount: 3,
            options: [
                { text: "en kaffe", correct: true },
                { text: "et bord", correct: false },
                { text: "et glas vand", correct: true },
                { text: "en stol", correct: false },
                { text: "en kop te", correct: true },
                { text: "en sko", correct: false }
            ]
        },
        {
            title: "Find 3 ting, man kan spise",
            iconName: "coffee",
            targetCount: 3,
            options: [
                { text: "en mad", correct: true },
                { text: "en seng", correct: false },
                { text: "et stykke kød", correct: true },
                { text: "et vindue", correct: false },
                { text: "en fisk", correct: true },
                { text: "en hund", correct: false }
            ]
        },
        {
            title: "Find 3 personer eller familiemedlemmer",
            iconName: "users",
            targetCount: 3,
            options: [
                { text: "en mor", correct: true },
                { text: "et bord", correct: false },
                { text: "en far", correct: true },
                { text: "et barn", correct: true },
                { text: "en kop", correct: false },
                { text: "et stykke tøj", correct: false }
            ]
        },
        {
            title: "Find 3 møbler i hjemmet",
            iconName: "home",
            targetCount: 3,
            options: [
                { text: "et bord", correct: true },
                { text: "en stol", correct: true },
                { text: "en sol", correct: false },
                { text: "en seng", correct: true },
                { text: "en fisk", correct: false },
                { text: "et glas", correct: false }
            ]
        },
        {
            title: "Find 3 dyr eller kæledyr",
            iconName: "user",
            targetCount: 3,
            options: [
                { text: "en hund", correct: true },
                { text: "et bord", correct: false },
                { text: "en kat", correct: true },
                { text: "en kop", correct: false },
                { text: "en fisk", correct: true },
                { text: "en sol", correct: false }
            ]
        },
        {
            title: "Find 3 ting man kan have på",
            iconName: "tag",
            targetCount: 3,
            options: [
                { text: "et stykke tøj", correct: true },
                { text: "en sko", correct: true },
                { text: "en jakke", correct: true },
                { text: "en seng", correct: false },
                { text: "en kaffe", correct: false },
                { text: "et træ", correct: false }
            ]
        },
        {
            title: "Find 3 genstande af glas eller porcelæn",
            iconName: "coffee",
            targetCount: 3,
            options: [
                { text: "et glas", correct: true },
                { text: "en mad", correct: false },
                { text: "en kop", correct: true },
                { text: "en hund", correct: false },
                { text: "en tallerken", correct: true },
                { text: "et problem", correct: false }
            ]
        },
        {
            title: "Find 3 ting man ser ud ad vinduet",
            iconName: "mapPin",
            targetCount: 3,
            options: [
                { text: "en sol", correct: true },
                { text: "en stol", correct: false },
                { text: "et træ", correct: true },
                { text: "en seng", correct: false },
                { text: "en fugl", correct: true },
                { text: "et stykke kød", correct: false }
            ]
        }
    ];

    let currentMissionIdx = 0;

    const missionCard = document.createElement('div');
    missionCard.className = 'mission-card';

    function renderMission() {
        missionCard.innerHTML = '';
        const m = missions[currentMissionIdx];
        let selectedCount = 0;

        const header = document.createElement('div');
        header.className = 'mission-header';
        header.innerHTML = `
            <div class="mission-badge" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                <span>${renderDsIcon('search', '', { size: 14 })}</span>
                <span>${getTranslation('tab_label_detektiv')} ${currentMissionIdx + 1} / ${missions.length}</span>
            </div>
            <div style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem;">
                <span>${renderDsIcon(m.iconName || 'search', '', { size: 22 })}</span>
                <span>${m.title}</span>
            </div>
            <div class="mission-counter">${getTranslation('koekken_detektiv_count_prompt')}</div>
        `;
        missionCard.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'clues-grid';

        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'mission-feedback';

        const lang = getLang();

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
                        const cleanDetektivComplete = stripLeadingEmoji(getTranslation('koekken_detektiv_complete'));
                        const nextBtnText = currentMissionIdx < missions.length - 1 ? getTranslation('koekken_detektiv_next') : stripLeadingEmoji(getTranslation('koekken_detektiv_restart'));
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <span>${renderDsIcon('check', '', { size: 20 })}</span>
                                <span>Rigtigt svaret! ${cleanDetektivComplete}</span>
                            </div>
                            <button class="mission-next-btn" id="next-mission-btn">
                                ${nextBtnText}
                            </button>
                        `;
                        feedbackEl.querySelector('#next-mission-btn').onclick = () => {
                            currentMissionIdx = (currentMissionIdx + 1) % missions.length;
                            renderMission();
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
                    setTimeout(() => {
                        btn.classList.remove('selected-wrong');
                    }, 800);
                }
            };
            grid.appendChild(btn);
        });

        missionCard.appendChild(grid);
        missionCard.appendChild(feedbackEl);
    }

    renderMission();
    detektivPanel.appendChild(missionCard);
    panelsHolder.appendChild(detektivPanel);

    // ========================================================
    // --- 3. DEL: EN LILLE HISTORIE (4 ENKLE HISTORIER) ---
    // ========================================================
    const historiePanel = document.createElement('div');
    historiePanel.className = 'kv-panel';
    historiePanel.dataset.panel = 'tab_historie';

    const kitchenStories = [
        {
            title: "1. Kaffen vælter",
            fullStoryText: "En kop kaffe står på bordet. Der sker et uheld. Der er et problem. Kvinden bruger en klud.",
            steps: [
                {
                    q: "1. Hvad står på bordet?",
                    options: [
                        { text: "En kop kaffe", correct: true },
                        { text: "En sko", correct: false },
                        { text: "Et træ", correct: false }
                    ]
                },
                {
                    q: "2. Hvad sker der?",
                    options: [
                        { text: "En ferie", correct: false },
                        { text: "Et uheld", correct: true },
                        { text: "En hund", correct: false }
                    ]
                },
                {
                    q: "3. Hvad er der nu?",
                    options: [
                        { text: "Et problem", correct: true },
                        { text: "En gave", correct: false },
                        { text: "Et barn", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør kvinden?",
                    options: [
                        { text: "Hun sover i sengen", correct: false },
                        { text: "Hun bruger en klud", correct: true }
                    ]
                }
            ]
        },
        {
            title: "2. Godmorgen i huset",
            fullStoryText: "Barnet vågner i sengen. Barnet tager sko på. Barnet sidder på en stol. Familien spiser mad.",
            steps: [
                {
                    q: "1. Hvor vågner barnet?",
                    options: [
                        { text: "I sengen", correct: true },
                        { text: "I køleskabet", correct: false },
                        { text: "På bordet", correct: false }
                    ]
                },
                {
                    q: "2. Hvad tager barnet på?",
                    options: [
                        { text: "En tallerken", correct: false },
                        { text: "Tøj og sko", correct: true },
                        { text: "En lampe", correct: false }
                    ]
                },
                {
                    q: "3. Hvor sidder barnet?",
                    options: [
                        { text: "I vasken", correct: false },
                        { text: "På en stol", correct: true },
                        { text: "Under sengen", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør familien?",
                    options: [
                        { text: "De spiser mad", correct: true },
                        { text: "De sover igen", correct: false },
                        { text: "De køber et hus", correct: false }
                    ]
                }
            ]
        },
        {
            title: "3. Aftensmad sammen",
            fullStoryText: "Moren laver mad. Familien spiser fisk. De drikker et glas vand. Faren taler ved bordet.",
            steps: [
                {
                    q: "1. Hvem laver mad?",
                    options: [
                        { text: "Moren laver mad", correct: true },
                        { text: "Hunden", correct: false },
                        { text: "Katten", correct: false }
                    ]
                },
                {
                    q: "2. Hvad spiser de?",
                    options: [
                        { text: "De spiser papir", correct: false },
                        { text: "De spiser fisk", correct: true },
                        { text: "De spiser sko", correct: false }
                    ]
                },
                {
                    q: "3. Hvad drikker de?",
                    options: [
                        { text: "En gryde", correct: false },
                        { text: "Et glas vand", correct: true },
                        { text: "En kop te", correct: false }
                    ]
                },
                {
                    q: "4. Hvad gør faren?",
                    options: [
                        { text: "Faren sover", correct: false },
                        { text: "Faren taler ved bordet", correct: true },
                        { text: "Faren løber", correct: false }
                    ]
                }
            ]
        },
        {
            title: "4. Katten vil have mad",
            fullStoryText: "Katten kigger på madskålen. Faren giver katten mad. Dyrene spiser mad.",
            steps: [
                {
                    q: "1. Hvor kigger katten hen?",
                    options: [
                        { text: "På madskålen", correct: true },
                        { text: "På et tog", correct: false },
                        { text: "På en cykel", correct: false }
                    ]
                },
                {
                    q: "2. Hvad gør faren?",
                    options: [
                        { text: "Han taber koppen", correct: false },
                        { text: "Han giver katten mad", correct: true },
                        { text: "Han går i seng", correct: false }
                    ]
                },
                {
                    q: "3. Hvad gør katten og hunden?",
                    options: [
                        { text: "De læser en bog", correct: false },
                        { text: "De spiser mad", correct: true },
                        { text: "De sover på bordet", correct: false }
                    ]
                }
            ]
        }
    ];

    let currKitchenStoryIdx = 0;
    const storyContainer = document.createElement('div');
    storyContainer.className = 'story-container';

    function renderActiveKitchenStory() {
        storyContainer.innerHTML = '';
        const story = kitchenStories[currKitchenStoryIdx];

        const navBar = document.createElement('div');
        navBar.className = 'story-nav-pills';
        kitchenStories.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = `story-nav-btn ${idx === currKitchenStoryIdx ? 'active' : ''}`;
            btn.textContent = `Historie ${idx + 1}`;
            btn.onclick = () => {
                currKitchenStoryIdx = idx;
                renderActiveKitchenStory();
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
            stepCard.id = `koekken-step-${sIdx}`;
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

                        const nextStepCard = stepsHolder.querySelector(`#koekken-step-${sIdx + 1}`);
                        if (nextStepCard) {
                            nextStepCard.style.opacity = '1';
                            nextStepCard.style.pointerEvents = 'auto';
                            nextStepCard.classList.add('active-step');
                        } else {
                            const completeBox = storyContainer.querySelector('#koekken-story-complete-box');
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
        completeBox.id = 'koekken-story-complete-box';
        completeBox.className = 'story-explanation-box';
        completeBox.style.display = 'none';

        const isLastStory = currKitchenStoryIdx === kitchenStories.length - 1;
        completeBox.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
                🎉 Flot klaret! Du har gennemført historien.
            </div>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                <button class="story-opt-btn" id="btn-next-koekken-story" style="background: #22c55e; color: #0f172a; font-weight: 800;">
                    ${isLastStory ? 'Start forfra ↺' : 'Gå til næste historie ➔'}
                </button>
            </div>
        `;
        storyContainer.appendChild(completeBox);

        completeBox.querySelector('#btn-next-koekken-story').onclick = () => {
            currKitchenStoryIdx = (currKitchenStoryIdx + 1) % kitchenStories.length;
            renderActiveKitchenStory();
        };
    }

    renderActiveKitchenStory();
    historiePanel.appendChild(storyContainer);
    panelsHolder.appendChild(historiePanel);

    // ========================================================
    // --- 4. DEL: OVEREMNE OG UNDEREMNE (Model C)
    // ========================================================
    const kontekstPanel = document.createElement('div');
    kontekstPanel.className = 'kv-panel';
    kontekstPanel.dataset.panel = 'tab_kontekst';

    const kitchenCategoryTasks = [
        {
            type: "find_overemne",
            subwords: ["et bord", "en stol", "en seng"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Møbler", correct: true },
                { text: "Transport", correct: false },
                { text: "Vejr", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en hund", "en kat", "en fisk"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Dyr og kæledyr", correct: true },
                { text: "Bygninger", correct: false },
                { text: "Tøj", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Service og køkkenting",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en tallerken", correct: true },
                { text: "en kop", correct: true },
                { text: "et glas", correct: true },
                { text: "et træ", correct: false },
                { text: "en cykel", correct: false },
                { text: "en sol", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Mad og drikke",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "brød", correct: true },
                { text: "mælk", correct: true },
                { text: "kaffe", correct: true },
                { text: "en lampe", correct: false },
                { text: "en dør", correct: false },
                { text: "en radio", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["en hund", "en kat", "en fisk"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Dyr og kæledyr", correct: true },
                { text: "Tøj", correct: false },
                { text: "Transport", correct: false }
            ]
        },
        {
            type: "find_overemne",
            subwords: ["et stykke tøj", "en sko", "en jakke"],
            question: "Hvilket overemne passer til disse underemner?",
            options: [
                { text: "Tøj og påklædning", correct: true },
                { text: "Møbler", correct: false },
                { text: "Mad", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Morgenmad og drikkevarer",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "kaffe", correct: true },
                { text: "en mad", correct: true },
                { text: "et glas vand", correct: true },
                { text: "en sko", correct: false },
                { text: "en seng", correct: false },
                { text: "et træ", correct: false }
            ]
        },
        {
            type: "find_underemner",
            overemne: "Husets rum og inventar",
            targetCount: 3,
            question: "Vælg de 3 underemner, der passer til overemnet:",
            options: [
                { text: "en seng", correct: true },
                { text: "en stol", correct: true },
                { text: "et vindue", correct: true },
                { text: "en kat", correct: false },
                { text: "en fisk", correct: false },
                { text: "et stykke kød", correct: false }
            ]
        }
    ];

    let currKitchenCategoryIdx = 0;
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';

    function renderKitchenCategoryTask() {
        categoryCard.innerHTML = '';

        if (currKitchenCategoryIdx >= kitchenCategoryTasks.length) {
            categoryCard.innerHTML = `
                <div style="font-size: 2.8rem; margin-bottom: 0.6rem;">${renderDsIcon('trophy', '', { size: 48 })}</div>
                <h2 style="font-size: 1.8rem; color: #4ade80; margin-bottom: 0.6rem;">${getTranslation('top100_category_complete_title')}</h2>
                <p style="color: #cbd5e1; font-size: 1.05rem; margin-bottom: 1.6rem;">
                    ${getTranslation('top100_category_complete_desc')}
                </p>
                <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
                    <button class="mission-next-btn" id="restart-kitchen-category-btn" style="background: #475569; color: white;">
                        ${getTranslation('top100_start_over_btn')}
                    </button>
                    <button class="mission-next-btn" id="kitchen-category-next-tab-btn" style="background: #22c55e; color: #0f172a;">
                        ${getTranslation('top100_goto_saetning_btn')}
                    </button>
                </div>
            `;
            categoryCard.querySelector('#restart-kitchen-category-btn').onclick = () => {
                currKitchenCategoryIdx = 0;
                renderKitchenCategoryTask();
            };
            categoryCard.querySelector('#kitchen-category-next-tab-btn').onclick = () => {
                switchTab('tab_saetning');
            };
            return;
        }

        const task = kitchenCategoryTasks[currKitchenCategoryIdx];
        let selectedCount = 0;

        const badge = document.createElement('div');
        badge.className = 'category-badge';
        badge.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 0.4rem;">${renderDsIcon('tag', '', { size: 14 })} <span>${getTranslation('top100_task_counter').replace('{current}', currKitchenCategoryIdx + 1).replace('{total}', kitchenCategoryTasks.length)}</span></span>`;
        categoryCard.appendChild(badge);

        if (task.type === 'find_overemne') {
            const promptTitle = document.createElement('h3');
            promptTitle.style.fontSize = '1.35rem';
            promptTitle.style.color = '#94a3b8';
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
                        feedbackEl.innerHTML = `
                            <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem;">
                                ✓ ${getTranslation("top100_correct_overemne_prefix")} ${opt.text}
                            </div>
                            <button class="mission-next-btn" id="next-category-btn">${getTranslation('top100_next_task_btn')}</button>
                        `;
                        feedbackEl.querySelector('#next-category-btn').onclick = () => {
                            currKitchenCategoryIdx++;
                            renderKitchenCategoryTask();
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
            qEl.style.color = '#cbd5e1';
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
                            feedbackEl.innerHTML = `
                                <div style="color: #4ade80; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem;">
                                    🎉 ${getTranslation('top100_correct_all_underemner')}
                                </div>
                                <button class="mission-next-btn" id="next-category-btn">
                                    ${currKitchenCategoryIdx < kitchenCategoryTasks.length - 1 ? getTranslation('top100_next_task_btn') : getTranslation('top100_see_result_btn')}
                                </button>
                            `;
                            feedbackEl.querySelector('#next-category-btn').onclick = () => {
                                currKitchenCategoryIdx++;
                                renderKitchenCategoryTask();
                            };
                        } else {
                            feedbackEl.innerHTML = `
                                <div style="color: #4ade80; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem;">
                                    ✓ Rigtigt svaret! (${selectedCount} af ${task.targetCount})
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

    renderKitchenCategoryTask();
    kontekstPanel.appendChild(categoryCard);
    panelsHolder.appendChild(kontekstPanel);

    // ========================================================
    // --- 5. DEL: SÆTNINGSBYGGER (UDFORSK & OPGAVER)
    // ========================================================
    const saetningPanel = document.createElement('div');
    saetningPanel.className = 'kv-panel';
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
        freeBuilderContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.7rem; color: white; margin-bottom: 0.4rem;">Byg dine egne sætninger</h3>
                <p style="color: var(--by-text-muted, #a7f3d0); font-size: 1.05rem; max-width: 650px; margin: 0 auto;">
                    Vælg et element fra hver række herunder. Prøv forskellige kombinationer og lyt til hvordan sætningen lyder på dansk!
                </p>
            </div>

            <!-- Grammatisk farveforklaring -->
            <div class="grammar-legend-bar">
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>1. Hvem?</strong> (Subjekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-verbum"></span> <strong>2. Handling</strong> (Verbum - rød)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-substantiv"></span> <strong>3. Hvilken ting?</strong> (Objekt - grøn)</div>
                <div class="grammar-legend-item"><span class="legend-chip chip-sted"></span> <strong>4. Hvor?</strong> (Sted - blå)</div>
            </div>

            <div id="free-builder-rows"></div>

            <!-- Live Output Sentence -->
            <div class="sb-live-box">
                <div class="sb-live-label">Din samlede sætning</div>
                <div class="sb-live-sentence" id="free-live-sentence"></div>
                <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
                    <button class="sb-listen-btn" id="free-listen-btn">
                        <span>${renderDsIcon('volume', '', { size: 16 })}</span> <span>Hør udtale</span>
                    </button>
                    <button class="sb-listen-btn sb-mic-btn" id="free-mic-btn">
                        <span>${renderDsIcon('mic', '', { size: 16 })}</span> <span>Test din udtale</span>
                    </button>
                </div>
                <div class="speech-feedback-box" id="free-speech-feedback" style="max-width: 600px; margin: 0.8rem auto 0; text-align: center;"></div>
            </div>
        `;

        const freeCategories = [
            {
                id: 'subjekt',
                title: '1. Hvem taler vi om?',
                role: 'Subjekt',
                catClass: 'sb-cat-subjekt',
                badgeClass: 'badge-cat-subjekt',
                icon: renderDsIcon('user', '', { size: 16 }),
                options: ['Faren', 'Moren', 'Barnet', 'Hunden', 'Katten', 'Gæsten', 'Pigen', 'Drengen']
            },
            {
                id: 'verbum',
                title: '2. Hvad laver personen / dyret?',
                role: 'Verbum',
                catClass: 'sb-cat-verbum',
                badgeClass: 'badge-cat-verbum',
                icon: renderDsIcon('zap', '', { size: 16 }),
                options: ['drikker', 'spiser', 'sidder på', 'åbner', 'kigger på', 'finder', 'tager', 'steger']
            },
            {
                id: 'objekt',
                title: '3. Hvilken genstand eller ting?',
                role: 'Objekt (Ting)',
                catClass: 'sb-cat-objekt',
                badgeClass: 'badge-cat-objekt',
                icon: renderDsIcon('tag', '', { size: 16 }),
                options: ['en kop kaffe', 'et glas vand', 'en mad', 'et vindue', 'en stol', 'en sko', 'et stykke kød', 'en fisk']
            },
            {
                id: 'sted',
                title: '4. Hvor i hjemmet sker det?',
                role: 'Sted (Rum)',
                catClass: 'sb-cat-sted',
                badgeClass: 'badge-cat-sted',
                icon: renderDsIcon('mapPin', '', { size: 16 }),
                options: ['i køkkenet', 'ved bordet', 'i stuen', 'i haven', 'i soveværelset', 'på gulvet', 'ved vinduet', 'i sofaen']
            }
        ];

        let selected = ['Moren', 'drikker', 'en kop kaffe', 'i køkkenet'];

        const rowsContainer = freeBuilderContainer.querySelector('#free-builder-rows');
        const liveSentenceEl = freeBuilderContainer.querySelector('#free-live-sentence');
        const listenBtn = freeBuilderContainer.querySelector('#free-listen-btn');
        const freeMicBtn = freeBuilderContainer.querySelector('#free-mic-btn');
        const freeFeedbackEl = freeBuilderContainer.querySelector('#free-speech-feedback');

        function updateSentence() {
            liveSentenceEl.innerHTML = `
                <span class="grammar-word word-substantiv">${selected[0]}</span>
                <span class="grammar-word word-verbum">${selected[1]}</span>
                <span class="grammar-word word-substantiv">${selected[2]}</span>
                <span class="grammar-word word-sted">${selected[3]}</span>.
            `;
            if (freeFeedbackEl) {
                freeFeedbackEl.className = 'speech-feedback-box';
                freeFeedbackEl.style.display = 'none';
            }
        }

        listenBtn.onclick = () => {
            speakDanish(`${selected[0]} ${selected[1]} ${selected[2]} ${selected[3]}`);
        };

        setupSentenceMic(
            freeMicBtn,
            freeFeedbackEl,
            () => `${selected[0]} ${selected[1]} ${selected[2]} ${selected[3]}.`,
            (evalResult) => {
                liveSentenceEl.querySelectorAll('.grammar-word').forEach(w => {
                    w.style.boxShadow = '0 0 16px rgba(74, 222, 128, 0.7)';
                    setTimeout(() => w.style.boxShadow = '', 2000);
                });
            }
        );

        freeCategories.forEach((cat, catIdx) => {
            const row = document.createElement('div');
            row.className = `sb-category-row ${cat.catClass}`;

            row.innerHTML = `
                <div class="sb-category-header">
                    <div class="sb-category-title">
                        <span>${cat.icon}</span> ${cat.title}
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
    const challengeTasks = [
        {
            context: "Det er tidlig morgen i køkkenet.",
            subjekt: "Moren",
            verbum: "drikker",
            sted: "i køkkenet",
            questionPrompt: "Hvad drikker moren i køkkenet?",
            targetWord: "en kop kaffe",
            distractors: ["en stol", "et vindue", "en sko"],
            pedagogyNote: "Man drikker kaffe for at vågne om morgenen!"
        },
        {
            context: "Familien skal spise aftensmad ved bordet.",
            subjekt: "Faren",
            verbum: "sidder på",
            sted: "ved bordet",
            questionPrompt: "Hvad sidder faren på ved bordet?",
            targetWord: "en stol",
            distractors: ["en kaffe", "et vindue", "en sol"],
            pedagogyNote: "Man sidder på en stol ved bordet."
        },
        {
            context: "Barnet er sultent efter børnehaven.",
            subjekt: "Barnet",
            verbum: "spiser",
            sted: "i stuen",
            questionPrompt: "Hvad spiser barnet i stuen?",
            targetWord: "en mad",
            distractors: ["en seng", "et træ", "et stykke tøj"],
            pedagogyNote: "Barnet spiser en mad, når det er sultent."
        },
        {
            context: "Katten sidder sulten foran madskålen.",
            subjekt: "Katten",
            verbum: "kigger på",
            sted: "på gulvet",
            questionPrompt: "Hvad kigger katten på på gulvet?",
            targetWord: "en fisk",
            distractors: ["en kop", "et problem", "solen"],
            pedagogyNote: "Katte elsker fisk!"
        },
        {
            context: "Hunden er meget træt efter en lang gåtur.",
            subjekt: "Hunden",
            verbum: "sover i",
            sted: "i soveværelset",
            questionPrompt: "Hvad sover hunden i i soveværelset?",
            targetWord: "sengen",
            distractors: ["koppen", "glasset", "vinduet"],
            pedagogyNote: "Hunden sover trygt i den bløde seng."
        },
        {
            context: "Solen bager udenfor i haven på en varm sommerdag.",
            subjekt: "Gæsten",
            verbum: "drikker",
            sted: "i haven",
            questionPrompt: "Hvad drikker gæsten i haven?",
            targetWord: "et glas vand",
            distractors: ["et bord", "et stykke tøj", "en sko"],
            pedagogyNote: "Gæsten slukker tørsten med koldt vand."
        },
        {
            context: "Der er varmt og indelukket inde i huset.",
            subjekt: "Faren",
            verbum: "åbner",
            sted: "i stuen",
            questionPrompt: "Hvad åbner faren i stuen?",
            targetWord: "et vindue",
            distractors: ["en kaffe", "et stykke kød", "en hund"],
            pedagogyNote: "Faren åbner et vindue for at få frisk luft ind."
        },
        {
            context: "Barnet skal ud at lege i haven og skal have fodtøj på.",
            subjekt: "Barnet",
            verbum: "tager",
            sted: "på fødderne",
            questionPrompt: "Hvad tager barnet på fødderne?",
            targetWord: "skoene",
            distractors: ["træet", "solen", "maden"],
            pedagogyNote: "Man tager sko på fødderne, før man går ud."
        },
        {
            context: "Moren tilbereder et varmt aftensmåltid til familien.",
            subjekt: "Moren",
            verbum: "steger",
            sted: "i køkkenet",
            questionPrompt: "Hvad steger moren i køkkenet?",
            targetWord: "et stykke kød",
            distractors: ["en seng", "en stol", "et vindue"],
            pedagogyNote: "Moren steger et stykke kød på panden."
        },
        {
            context: "Faren kigger ud ad ruden på naturen i haven.",
            subjekt: "Faren",
            verbum: "kigger på",
            sted: "i haven",
            questionPrompt: "Hvad kigger faren på i haven?",
            targetWord: "et træ",
            distractors: ["sengen", "tøjet", "koppen"],
            pedagogyNote: "Ude i haven står der et stort grønt træ."
        }
    ];

    let currentChallengeIdx = 0;
    const completedChallenges = new Set();

    function setupChallenge() {
        challengeContainer.innerHTML = '';

        const task = challengeTasks[currentChallengeIdx];

        // Header with pills
        const header = document.createElement('div');
        header.className = 'sb-task-header';

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = `
            <div style="font-size: 0.85rem; color: #86efac; font-weight: 800; text-transform: uppercase;">
                Udfordring ${currentChallengeIdx + 1} af ${challengeTasks.length}
            </div>
            <h3 style="font-size: 1.5rem; color: white; margin: 0.2rem 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>${renderDsIcon('puzzle', '', { size: 22 })}</span>
                <span>Find tingen & saml puslespillet</span>
            </h3>
        `;
        header.appendChild(titleDiv);

        const pills = document.createElement('div');
        pills.className = 'sb-task-pills';
        challengeTasks.forEach((_, idx) => {
            const pill = document.createElement('div');
            pill.className = `sb-task-pill ${idx === currentChallengeIdx ? 'active' : ''} ${completedChallenges.has(idx) ? 'done' : ''}`;
            pill.textContent = idx + 1;
            pill.onclick = () => {
                currentChallengeIdx = idx;
                setupChallenge();
            };
            pills.appendChild(pill);
        });
        header.appendChild(pills);
        challengeContainer.appendChild(header);

        // Step 1: Context & Semantic Match
        const contextCard = document.createElement('div');
        contextCard.className = 'sb-context-card';
        contextCard.innerHTML = `
            <div class="sb-context-title" style="display: flex; align-items: center; gap: 0.4rem;"><span>${renderDsIcon('mapPin', '', { size: 16 })}</span> <em>${task.context}</em></div>
            <div class="sb-context-elements">
                <div class="sb-context-chip subjekt">
                    <span class="sb-chip-role">1. Hvem?</span>
                    <span>${task.subjekt}</span>
                </div>
                <div class="sb-context-chip verbum">
                    <span class="sb-chip-role">2. Handling</span>
                    <span>${task.verbum}</span>
                </div>
                <div class="sb-context-chip sted">
                    <span class="sb-chip-role">4. Hvor?</span>
                    <span>${task.sted}</span>
                </div>
            </div>
        `;
        challengeContainer.appendChild(contextCard);

        // Question box: Spørgsmål 3 (Genstand / Objekt)
        const qBox = document.createElement('div');
        qBox.className = 'sb-question-box';
        qBox.innerHTML = `
            <div style="font-size: 0.85rem; color: #38bdf8; font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">
                Spørgsmål 3: Genstand / Objekt (Kernen i opgaven)
            </div>
            <div class="sb-question-text">${task.questionPrompt}</div>
        `;
        challengeContainer.appendChild(qBox);

        // Options Grid (4 substantiver fra scenen)
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'sb-options-grid';

        const allOptions = [task.targetWord, ...task.distractors].sort(() => Math.random() - 0.5);
        let chosenObject = null;

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

                    chosenObject = opt;
                    speakDanish(opt);

                    // Show Step 2: Puslespil
                    renderPuzzleStep(puzzleContainer, task);
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
    function renderPuzzleStep(container, task) {
        const lang = getLang();

        container.innerHTML = `
            <div class="sb-puzzle-title" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <span>${renderDsIcon('puzzle', '', { size: 20 })}</span> <span>Trin 2: Puslespillet – Saml hele sætningen!</span>
            </div>
            <div class="sb-puzzle-desc">
                Klik på brikkerne i den rigtige danske ordstilling: <strong>1. Hvem ➔ 2. Handling ➔ 3. Hvilken ting ➔ 4. Hvor</strong>.
            </div>

            <!-- 4 Slots -->
            <div class="sb-puzzle-slots" id="puzzle-slots">
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
            <div class="sb-puzzle-bank" id="puzzle-bank"></div>

            <!-- Feedback -->
            <div class="sb-feedback-box" id="puzzle-feedback"></div>
        `;

        const correctOrder = [task.subjekt, task.verbum, task.targetWord, task.sted];
        const scrambledWords = [...correctOrder].sort(() => Math.random() - 0.5);

        let placedSlots = [null, null, null, null];

        const slotsEl = container.querySelector('#puzzle-slots');
        const bankEl = container.querySelector('#puzzle-bank');
        const feedbackEl = container.querySelector('#puzzle-feedback');

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
                completedChallenges.add(currentChallengeIdx);
                speakDanish(fullSentence);

                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg success" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <span>${renderDsIcon('check', '', { size: 20 })}</span>
                        <span>Fantastisk! "<strong>${fullSentence}</strong>"</span>
                    </div>
                    <div style="color: var(--by-text-muted, #a7f3d0); font-size: 0.95rem; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
                        <span>${renderDsIcon('lightbulb', '', { size: 16 })}</span>
                        <span>${task.pedagogyNote}</span>
                    </div>
                    <div class="sb-action-row">
                        <button class="sb-listen-btn" id="puzzle-listen-full">
                            <span>${renderDsIcon('volume', '', { size: 16 })}</span> <span>Hør sætningen igen</span>
                        </button>
                        <button class="sb-listen-btn sb-mic-btn" id="puzzle-mic-btn">
                            <span>${renderDsIcon('mic', '', { size: 16 })}</span> <span>Gentag sætningen</span>
                        </button>
                        <button class="sb-action-btn" id="puzzle-next-btn">
                            ${currentChallengeIdx < challengeTasks.length - 1 ? 'Næste opgave ➔' : 'Start forfra ↺'}
                        </button>
                    </div>
                    <div class="speech-feedback-box" id="puzzle-speech-feedback" style="margin-top: 0.8rem; text-align: center;"></div>
                `;

                feedbackEl.querySelector('#puzzle-listen-full').onclick = () => speakDanish(fullSentence);
                feedbackEl.querySelector('#puzzle-next-btn').onclick = () => {
                    currentChallengeIdx = (currentChallengeIdx + 1) % challengeTasks.length;
                    setupChallenge();
                };

                const puzzleMicBtn = feedbackEl.querySelector('#puzzle-mic-btn');
                const puzzleFeedback = feedbackEl.querySelector('#puzzle-speech-feedback');
                setupSentenceMic(
                    puzzleMicBtn,
                    puzzleFeedback,
                    fullSentence,
                    (evalResult) => {
                        puzzleFeedback.className = 'speech-feedback-box correct';
                        puzzleFeedback.innerHTML = `Perfekt udtalt! "<strong>${evalResult.spoken}</strong>" ⭐`;
                        slotsEl.querySelectorAll('.sb-puzzle-slot').forEach(s => {
                            s.style.boxShadow = '0 0 18px rgba(74, 222, 128, 0.8)';
                            setTimeout(() => s.style.boxShadow = '', 2500);
                        });
                    }
                );
            } else {
                feedbackEl.innerHTML = `
                    <div class="sb-feedback-msg error">
                        ✗ Rækkefølgen er ikke helt rigtig.
                    </div>
                    <div style="color: var(--by-text-muted, #a7f3d0); font-size: 0.95rem; margin-bottom: 0.6rem;">
                        Husk rækkefølgen på dansk: 1. Hvem (Subjekt) ➔ 2. Handling (Verbum) ➔ 3. Hvilken ting (Objekt) ➔ 4. Hvor (Sted).
                    </div>
                    <button class="sb-action-btn" id="puzzle-retry-btn" style="background: #475569; display: inline-flex; align-items: center; gap: 0.4rem;">
                        <span>${renderDsIcon('refresh', '', { size: 16 })}</span> <span>Nulstil brikker</span>
                    </button>
                `;

                feedbackEl.querySelector('#puzzle-retry-btn').onclick = () => {
                    placedSlots = [null, null, null, null];
                    updateSlotsAndBank();
                };
            }
        }

        updateSlotsAndBank();
    }

    // Initialize both sub-tabs
    setupFreeBuilder();
    setupChallenge();

    saetningPanel.appendChild(sentenceCard);
    panelsHolder.appendChild(saetningPanel);

    const initialTab = (extraData && (extraData.subPath || extraData.activeTab || extraData.tab)) || 'tab_vrimmel';
    switchTab(initialTab);

    container.appendChild(viewContainer);
}
