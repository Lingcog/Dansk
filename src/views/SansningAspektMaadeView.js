import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * SansningAspektMaadeView - Station 1.5: Aspekt, Måde & Diatese
 * Diktomisk Split-Stage Vrimlebillede:
 * 
 *  🔵 VENSTRE SIDE: DVÆLEN & ROLIG TILSTAND (Ligger og læser, går langsomt, åbnes, rødt hus)
 *  🟠 HØJRE SIDE: RETNINGSSKIFT & FART (Sætter sig til, løber hurtigt, åbner døren, malet hus)
 */
export function renderSansningAspektMaadeView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    const contrastPairs = [
        {
            key: 'laeser',
            title: 'Læsning i stuen',
            icon: '📖',
            left: {
                x: 24,
                y: 50,
                word: 'ligger og læser',
                sent: 'Mads ligger og læser avisen i sofaen.',
                exp: 'Dobbeltverbet "ligger og..." viser en uafgrænset, fredfyldt dvælen over tid. Kroppen er i total hvile.'
            },
            right: {
                x: 43,
                y: 37,
                word: 'sætter sig til at læse',
                sent: 'Mads sætter sig til at læse ved skrivebordet.',
                exp: '"Sætter sig til at..." markerer et bevidst skift i kroppens retning og handling. En ny proces sættes i gang med vilje.'
            },
            aha: 'Uafgrænset dvælen ("ligger og læser") vs. retningsskift ("sætter sig til at læse").',
            lang: {
                en: 'lies reading vs. sits down to read',
                ar: 'مستلقٍ يقرأ vs. يجلس ليبدأ القراءة',
                zh: '躺着看报 vs. 坐下来开始阅读'
            }
        },
        {
            key: 'fart',
            title: 'Kroppens tempo og fart',
            icon: '🏃',
            left: {
                x: 80,
                y: 60,
                word: 'går langsomt',
                sent: 'Bedstefar går langsomt gennem haven og tænker.',
                exp: 'Mådesadverbiet "langsomt" dæmper muskelkraften. Kroppen bevæger sig i lavt gear i stilhed.'
            },
            right: {
                x: 81,
                y: 71,
                word: 'løber hurtigt',
                sent: 'Drengen løber hurtigt hen over stien.',
                exp: 'Adverbiet "hurtigt" pumper fart og dynamisk energi ind i verbet. Hvert skridt kræver kraft.'
            },
            aha: 'Mådesadverbier afkoder kroppens muskelspænding: roligt og langsomt vs. eksplosivt og hurtigt.',
            lang: {
                en: 'walks slowly vs. runs quickly',
                ar: 'يمشي ببطء vs. يركض بسرعة',
                zh: '慢慢走 vs. 快速跑'
            }
        },
        {
            key: 'doer',
            title: 'Dørens åbning (diatese)',
            icon: '🚪',
            left: {
                x: 60,
                y: 49,
                word: 'døren åbnes',
                sent: 'Døren åbnes automatisk kl. 8.',
                exp: 'S-passiv lader handlingen ske som et roligt naturfænomen uden en synlig menneskelig person bag.'
            },
            right: {
                x: 61,
                y: 49,
                word: 'manden åbner døren',
                sent: 'Manden åbner døren med håndtaget.',
                exp: 'Aktiv diatese viser agentens muskulære arm og kropslige indgreb, der skubber døren op.'
            },
            aha: 'Selvvirkende naturfænomen ("åbnes") vs. menneskets muskulære kraft ("åbner").',
            lang: {
                en: 'the door opens vs. the man opens the door',
                ar: 'الباب يُفتح vs. الرجل يفتح الباب',
                zh: '门打开了（被动） vs. 男人开门'
            }
        },
        {
            key: 'hus',
            title: 'Husets natur vs. aftryk',
            icon: '🏡',
            left: {
                x: 72,
                y: 28,
                word: 'et rødt hus',
                sent: 'Familien bor i et rødt murstenshus.',
                exp: 'Et rent adjektiv beskriver tingen som den er i sin iboende, hvilende natur.'
            },
            right: {
                x: 72,
                y: 28,
                word: 'et malet hus',
                sent: 'Huset står som et nymalet hus efter sommerferien.',
                exp: 'Kort tillægsform (participium) bærer arret og aftrykket af en forvandling: nogen har malet det!'
            },
            aha: 'Iboende natur ("rødt") vs. historisk aftryk af et menneskeligt indgreb ("malet").',
            lang: {
                en: 'a red house vs. a painted house',
                ar: 'بيت أحمر vs. بيت مدهون / مطلي',
                zh: '红色的房子 vs. 粉刷过的房子'
            }
        },
        {
            key: 'stille',
            title: 'Katten og stilheden',
            icon: '🐾',
            left: {
                x: 27,
                y: 73,
                word: 'sover roligt',
                sent: 'Katten sover roligt på det varme gulvtæppe.',
                exp: 'Ingen uventede ryk. Kroppens vejrtrækning er dyb og uforstyrret.'
            },
            right: {
                x: 27,
                y: 58,
                word: 'springer pludselig op',
                sent: 'Katten springer pludselig op efter en flue.',
                exp: 'Hvilen brydes af et eksplosivt retningsskift i et splitsekund.'
            },
            aha: 'Rolig dvælen ("sover roligt") vs. pludselig impuls ("springer pludselig op").',
            lang: {
                en: 'sleeps calmly vs. leaps suddenly',
                ar: 'تنام بهدوء vs. تقفز فجأة',
                zh: '安静地睡觉 vs. 突然跳起来'
            }
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Mads er træt og har fri i dag. Han ... på sofaen.',
            options: ['ligger og slapper af', 'sætter sig til at slappe af'],
            correct: 'ligger og slapper af',
            expl: '"Ligger og..." beskriver den vedvarende, uafgrænsede dvælen i ro over tid.'
        },
        {
            prompt: 'Klokken er 09:00, og eksamen starter nu. Mads ... skrive.',
            options: ['ligger og', 'sætter sig til at'],
            correct: 'sætter sig til at',
            expl: '"Sætter sig til at..." markerer det bevidste skift i kroppens fokus og start på en ny handling.'
        },
        {
            prompt: 'Gaden er glat af is, så vi må køre ...',
            options: ['forsigtigt', 'forsigtig'],
            correct: 'forsigtigt',
            expl: 'Når vi beskriver verbet (hvordan vi kører), tilføjer mådesadverbiet et -t.'
        },
        {
            prompt: 'Biblioteket er et offentligt sted. Dørene ... kl. 10.',
            options: ['åbner', 'åbnes'],
            correct: 'åbnes',
            expl: 'S-passiv bruges, når institutionen eller reglen gælder uden en specifik person nævnt.'
        },
        {
            prompt: 'Bordet bærer tydeligt præg af håndværkerens arbejde. Det er et ... bord.',
            options: ['slebet', 'rundt'],
            correct: 'slebet',
            expl: '"Slebet" (participium) bærer aftrykket af handlingen: nogen har aktivt slebet bordet.'
        }
    ];

    const style = document.createElement('style');
    style.textContent = `
        .sansning-station-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.25rem 5rem;
            color: #f8fafc;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .ss-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.2rem;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        .ss-back-btn {
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
        .ss-back-btn:hover {
            border-color: #38bdf8;
            background: rgba(30, 41, 59, 0.9);
            transform: translateX(-2px);
        }

        .ss-station-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid rgba(56, 189, 248, 0.45);
            border-radius: 999px;
            padding: 0.35rem 0.85rem;
            font-size: 0.8rem;
            font-weight: 800;
            color: #7dd3fc;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .ss-hero {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .ss-hero h1 {
            font-size: 2.2rem;
            font-weight: 900;
            margin: 0 0 0.4rem;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #38bdf8 20%, #ffffff 60%, #fb923c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .ss-hero p {
            color: #cbd5e1;
            font-size: 1.02rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.5;
        }

        .ss-tabs-nav {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1.8rem;
            background: rgba(15, 23, 42, 0.8);
            border: 1.5px solid rgba(148, 163, 184, 0.22);
            padding: 0.45rem;
            border-radius: 16px;
        }
        .ss-tab-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.6rem 1.15rem;
            border-radius: 12px;
            font-size: 0.88rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
        }
        .ss-tab-btn:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.06);
        }
        .ss-tab-btn.active {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: #ffffff;
            box-shadow: 0 0 16px rgba(2, 132, 199, 0.4);
        }

        .ss-tab-panel {
            display: none;
            animation: fadeIn 0.25s ease;
        }
        .ss-tab-panel.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .contrast-canvas-card {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(9, 14, 28, 0.98));
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
            margin-bottom: 1.5rem;
        }

        .contrast-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1.25rem;
            background: rgba(15, 23, 42, 0.9);
            border-bottom: 1px solid rgba(148, 163, 184, 0.18);
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        .contrast-instruction {
            color: #cbd5e1;
            font-size: 0.88rem;
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .pure-toggle-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.25);
            color: #cbd5e1;
            padding: 0.4rem 0.85rem;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .pure-toggle-btn:hover {
            border-color: #38bdf8;
            color: #ffffff;
        }
        .pure-toggle-btn.active {
            background: rgba(2, 132, 199, 0.3);
            border-color: #38bdf8;
            color: #7dd3fc;
        }

        .contrast-split-stage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
            background: #090d16;
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
            background: #090d16;
            line-height: 0;
        }
        .stage-half-header {
            position: absolute;
            top: 12px;
            left: 12px;
            z-index: 10;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(8px);
            padding: 0.4rem 0.9rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            line-height: 1.4;
        }
        .stage-half-header.cool {
            color: #7dd3fc;
            border: 1.5px solid rgba(56, 189, 248, 0.6);
            background: rgba(12, 74, 110, 0.85);
        }
        .stage-half-header.warm {
            color: #fed7aa;
            border: 1.5px solid rgba(251, 146, 60, 0.6);
            background: rgba(154, 52, 18, 0.85);
        }

        .stage-half img,
        .stage-half-img {
            width: 100%;
            height: auto;
            display: block;
            filter: brightness(0.98);
        }

        .ss-hotspot {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
            transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 5;
        }
        .stage-half.left-half .ss-hotspot { background: #0284c7; }
        .stage-half.right-half .ss-hotspot { background: #ea580c; }

        .ss-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.22);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            z-index: 8;
        }
        .ss-hotspot.active {
            background: #10b981 !important;
            border-color: #ffffff !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.95);
            z-index: 10;
        }
        .ss-hotspot.partner-active {
            border-color: #fde68a !important;
            transform: translate(-50%, -50%) scale(1.22);
            animation: pulsePartner 1.5s infinite ease-in-out;
            z-index: 9;
        }
        .stage-half.left-half .ss-hotspot.partner-active {
            background: #38bdf8 !important;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.9);
        }
        .stage-half.right-half .ss-hotspot.partner-active {
            background: #fb923c !important;
            box-shadow: 0 0 20px rgba(251, 146, 60, 0.9);
        }

        .pure-mode .ss-hotspot { display: none !important; }

        .ss-hotspots-strip {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.75rem 1.25rem;
            background: rgba(15, 23, 42, 0.8);
            border-top: 1px solid rgba(148, 163, 184, 0.15);
        }
        .ss-strip-btn {
            flex-shrink: 0;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 10px;
            padding: 0.45rem 0.85rem;
            color: #cbd5e1;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .ss-strip-btn:hover { border-color: #38bdf8; color: #ffffff; }
        .ss-strip-btn.active {
            background: rgba(2, 132, 199, 0.35);
            border-color: #38bdf8;
            color: #ffffff;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }

        .adj-detail-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border-radius: 20px;
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            padding: 1.5rem 1.6rem;
            margin-top: 1.5rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }
        .adj-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            border-bottom: 1px solid rgba(148, 163, 184, 0.18);
            padding-bottom: 0.8rem;
        }
        .adj-title-group {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .adj-main-word {
            font-size: 1.5rem;
            font-weight: 900;
            color: #ffffff;
        }
        .adj-modpol-pill {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(56, 189, 248, 0.5);
            color: #7dd3fc;
            padding: 0.45rem 1rem;
            border-radius: 999px;
            font-size: 0.86rem;
            font-weight: 800;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .adj-modpol-pill:hover {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            transform: scale(1.03);
        }

        .adj-congruence-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        @media (max-width: 720px) {
            .adj-congruence-grid { grid-template-columns: 1fr; }
        }

        .ss-contrast-box {
            border-radius: 14px;
            padding: 1.1rem 1.2rem;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            transition: all 0.2s ease;
        }
        .ss-contrast-box.tilstand {
            background: rgba(12, 74, 110, 0.25);
            border: 1.5px solid rgba(56, 189, 248, 0.35);
        }
        .ss-contrast-box.forvandling {
            background: rgba(154, 52, 18, 0.25);
            border: 1.5px solid rgba(251, 146, 60, 0.35);
        }
        .ss-box-badge {
            font-size: 0.76rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .ss-contrast-box.tilstand .ss-box-badge { color: #7dd3fc; }
        .ss-contrast-box.forvandling .ss-box-badge { color: #fdba74; }

        .ss-box-sent-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
        }
        .ss-box-sent {
            font-size: 1.12rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.4;
        }
        .ss-box-verb-highlight {
            padding: 0.1rem 0.45rem;
            border-radius: 6px;
        }
        .ss-contrast-box.tilstand .ss-box-verb-highlight {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
            border-bottom: 2px solid #38bdf8;
        }
        .ss-contrast-box.forvandling .ss-box-verb-highlight {
            background: rgba(251, 146, 60, 0.25);
            color: #fb923c;
            border-bottom: 2px solid #fb923c;
        }
        .ss-tts-audio-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            border-radius: 8px;
            width: 34px;
            height: 34px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.18s ease;
        }
        .ss-tts-audio-btn:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.08);
        }
        .ss-box-exp {
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.5;
        }

        .ss-insp-aha {
            background: rgba(15, 23, 42, 0.7);
            border: 1px dashed rgba(251, 191, 36, 0.45);
            border-radius: 12px;
            padding: 0.85rem 1.15rem;
            font-size: 0.92rem;
            color: #fde68a;
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }

        .ss-insp-languages {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.6rem;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 10px;
            padding: 0.65rem 0.9rem;
            font-size: 0.82rem;
            color: #cbd5e1;
        }

        .ss-quiz-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border-radius: 20px;
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            padding: 1.8rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
            max-width: 780px;
            margin: 0 auto;
        }
        .ss-quiz-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 700;
        }
        .ss-quiz-prompt {
            font-size: 1.35rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.5rem;
            text-align: center;
            line-height: 1.4;
        }
        .ss-quiz-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        @media (max-width: 540px) {
            .ss-quiz-options { grid-template-columns: 1fr; }
        }
        .ss-quiz-opt-btn {
            background: rgba(30, 41, 59, 0.85);
            border: 2px solid rgba(148, 163, 184, 0.25);
            border-radius: 14px;
            padding: 1rem 1.25rem;
            font-size: 1.1rem;
            font-weight: 800;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        .ss-quiz-opt-btn:hover {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
            transform: translateY(-2px);
        }
        .ss-quiz-opt-btn.correct {
            background: rgba(16, 185, 129, 0.25);
            border-color: #10b981;
            color: #34d399;
        }
        .ss-quiz-opt-btn.wrong {
            background: rgba(239, 68, 68, 0.25);
            border-color: #ef4444;
            color: #fca5a5;
        }
        .ss-quiz-feedback {
            padding: 1rem 1.2rem;
            border-radius: 12px;
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
            display: none;
            line-height: 1.5;
        }
        .ss-quiz-feedback.show { display: block; }
        .ss-quiz-feedback.correct {
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(16, 185, 129, 0.4);
            color: #a7f3d0;
        }
        .ss-quiz-feedback.wrong {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #fecaca;
        }
        .ss-quiz-next-btn {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: none;
            color: #ffffff;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            display: none;
            margin-left: auto;
            transition: all 0.2s ease;
        }
        .ss-quiz-next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
        }
    `;
    viewContainer.appendChild(style);

    // 1. Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.innerHTML = (extraData && extraData.from === 'overview') ? `← Tilbage til sansningsoversigten` : `← Tilbage til hovedflade 1`;
    backBtn.onclick = () => {
        if (extraData && extraData.from === 'overview') {
            navigateFn('grammatik_sansning');
        } else {
            navigateFn('sansning_flade1');
        }
    };
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.innerHTML = `Station 1.5 • Aspekt og måde`;
    topBar.appendChild(badge);

    viewContainer.appendChild(topBar);

    // 2. Hero
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Aspekt og bevægelse: dvælen vs. retningsskift</h1>
        <p>
            Oplev kroppens sansning af handlinger i tid: 
            <strong>Venstre side</strong> viser den rolige dvælen (<em>"ligger og læser", "går langsomt", "åbnes"</em>), 
            mens <strong>højre side</strong> viser det pludselige skift i retning og fart (<em>"sætter sig til at læse", "løber hurtigt", "åbner"</em>).
            Klik på et motiv for at se modpolen lyse op.
        </p>
    `;
    viewContainer.appendChild(hero);

    // 3. Tabs
    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="tab_kontrast">
            1. Diktomisk vrimlebillede
        </button>
        <button class="ss-tab-btn" data-tab="tab_quiz">
            2. Træningsbane: dvælen eller retningsskift?
        </button>
    `;
    viewContainer.appendChild(tabsNav);

    const panelsContainer = document.createElement('div');

    // TAB 1: DIKTOMISK SPLIT-STAGE
    const panelKontrast = document.createElement('div');
    panelKontrast.className = 'ss-tab-panel active';
    panelKontrast.id = 'panel-kontrast';

    panelKontrast.innerHTML = `
        <div class="contrast-canvas-card">
            <div class="contrast-control-bar">
                <div class="contrast-instruction">
                    <em>Klik på et motiv på venstre side (dvælen) for at se dets spejlbillede på højre side (retningsskift).</em>
                </div>
                <button class="pure-toggle-btn" id="pure-toggle-btn">
                    Ren visning: <strong id="pure-status-label">FRA</strong>
                </button>
            </div>

            <div class="contrast-split-stage" id="split-stage">
                <!-- VENSTRE HALVDEL: DVÆLEN & STILSTAND -->
                <div class="stage-half left-half">
                    <div class="stage-half-header cool">Venstre: Dvælen — uafgrænset ro over tid</div>
                    <img src="assets/sansning_aspekt_venstre.jpg" alt="Rolig dvælen i stuen" class="stage-half-img" />
                    <div id="left-hotspots-container"></div>
                </div>

                <!-- HØJRE HALVDEL: RETNINGSSKIFT & FART -->
                <div class="stage-half right-half">
                    <div class="stage-half-header warm">Højre: Retningsskift — fart og ny impuls</div>
                    <img src="assets/sansning_aspekt_hoejre.jpg" alt="Retningsskift og fart" class="stage-half-img" />
                    <div id="right-hotspots-container"></div>
                </div>
            </div>

            <div class="ss-hotspots-strip" id="hotspots-strip"></div>
        </div>

        <div class="adj-detail-card" id="detail-card"></div>
    `;
    panelsContainer.appendChild(panelKontrast);

    // TAB 2: QUIZ
    const panelQuiz = document.createElement('div');
    panelQuiz.className = 'ss-tab-panel';
    panelQuiz.id = 'panel-quiz';

    let currentQuestionIdx = 0;
    let quizScore = 0;

    function renderQuizTrack() {
        const q = quizQuestions[currentQuestionIdx];
        if (currentQuestionIdx >= quizQuestions.length) {
            panelQuiz.innerHTML = `
                <div class="ss-quiz-card" style="text-align: center;">
                    <h2 style="font-size: 1.8rem; margin: 0.5rem 0 1rem; color: #38bdf8;">
                        Træningsbane gennemført!
                    </h2>
                    <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore}</strong> ud af <strong>${quizQuestions.length}</strong> rigtige!
                    </p>
                    <button class="ss-quiz-opt-btn" id="restart-quiz-btn" style="display: inline-block; width: auto; padding: 0.8rem 2rem;">
                        Prøv igen
                    </button>
                </div>
            `;
            panelQuiz.querySelector('#restart-quiz-btn').onclick = () => {
                currentQuestionIdx = 0;
                quizScore = 0;
                renderQuizTrack();
            };
            return;
        }

        panelQuiz.innerHTML = `
            <div class="ss-quiz-card">
                <div class="ss-quiz-progress">
                    <span>Spørgsmål ${currentQuestionIdx + 1} af ${quizQuestions.length}</span>
                    <span>Score: ${quizScore}</span>
                </div>
                <div class="ss-quiz-prompt">${q.prompt}</div>
                <div class="ss-quiz-options">
                    ${q.options.map(opt => `
                        <button class="ss-quiz-opt-btn" data-val="${opt}">${opt}</button>
                    `).join('')}
                </div>
                <div class="ss-quiz-feedback" id="quiz-feedback"></div>
                <button class="ss-quiz-next-btn" id="quiz-next-btn">Næste spørgsmål →</button>
            </div>
        `;

        const optButtons = panelQuiz.querySelectorAll('.ss-quiz-opt-btn');
        const feedback = panelQuiz.querySelector('#quiz-feedback');
        const nextBtn = panelQuiz.querySelector('#quiz-next-btn');

        optButtons.forEach(btn => {
            btn.onclick = () => {
                optButtons.forEach(b => b.disabled = true);
                const selected = btn.dataset.val;
                const isCorrect = selected === q.correct;

                if (isCorrect) {
                    btn.classList.add('correct');
                    feedback.className = 'ss-quiz-feedback show correct';
                    feedback.innerHTML = `<strong>Rigtigt!</strong> ${q.expl}`;
                    quizScore++;
                } else {
                    btn.classList.add('wrong');
                    feedback.className = 'ss-quiz-feedback show wrong';
                    feedback.innerHTML = `<strong>Ikke helt:</strong> Det rigtige svar er <em>${q.correct}</em>. ${q.expl}`;
                    optButtons.forEach(b => {
                        if (b.dataset.val === q.correct) b.classList.add('correct');
                    });
                }
                nextBtn.style.display = 'block';
            };
        });

        nextBtn.onclick = () => {
            currentQuestionIdx++;
            renderQuizTrack();
        };
    }

    renderQuizTrack();
    panelsContainer.appendChild(panelQuiz);

    viewContainer.appendChild(panelsContainer);

    // Diktomisk Hotspot & Modpol-logik
    const leftContainer = panelKontrast.querySelector('#left-hotspots-container');
    const rightContainer = panelKontrast.querySelector('#right-hotspots-container');
    const stripContainer = panelKontrast.querySelector('#hotspots-strip');
    const detailCard = panelKontrast.querySelector('#detail-card');
    const pureBtn = panelKontrast.querySelector('#pure-toggle-btn');
    const splitStage = panelKontrast.querySelector('#split-stage');

    let activeItemKey = contrastPairs[0].key;
    let isPureMode = false;

    pureBtn.onclick = () => {
        isPureMode = !isPureMode;
        splitStage.classList.toggle('pure-mode', isPureMode);
        pureBtn.classList.toggle('active', isPureMode);
        pureBtn.querySelector('#pure-status-label').textContent = isPureMode ? 'TIL' : 'FRA';
    };

    function selectPair(key, triggerSide = 'left') {
        activeItemKey = key;
        const pair = contrastPairs.find(p => p.key === key);
        if (!pair) return;

        leftContainer.querySelectorAll('.ss-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.key === key) {
                if (triggerSide === 'left') dot.classList.add('active');
                else dot.classList.add('partner-active');
            }
        });

        rightContainer.querySelectorAll('.ss-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.key === key) {
                if (triggerSide === 'right') dot.classList.add('active');
                else dot.classList.add('partner-active');
            }
        });

        stripContainer.querySelectorAll('.ss-strip-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.key === key);
        });

        detailCard.innerHTML = `
            <div class="adj-detail-header">
                <div class="adj-title-group">
                    <span class="adj-main-word">${pair.title}</span>
                </div>
                <div class="adj-modpol-pill" id="card-swap-btn" title="Klik for at skifte fokus">
                    <span>${triggerSide === 'left' ? 'Skift til retningsskift' : 'Skift til dvælen'}</span>
                    <strong>${triggerSide === 'left' ? pair.right.word + ' ➔' : pair.left.word + ' ➔'}</strong>
                </div>
            </div>

            <div class="adj-congruence-grid">
                <div class="ss-contrast-box tilstand">
                    <span class="ss-box-badge">Venstre: Dvælen i ro</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.left.sent.replace(pair.left.word, `<span class="ss-box-verb-highlight">${pair.left.word}</span>`)}
                        </span>
                    </div>
                    <div class="ss-box-exp">${pair.left.exp}</div>
                </div>

                <div class="ss-contrast-box forvandling">
                    <span class="ss-box-badge">Højre: Retningsskift og fart</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.right.sent.replace(pair.right.word, `<span class="ss-box-verb-highlight">${pair.right.word}</span>`)}
                        </span>
                    </div>
                    <div class="ss-box-exp">${pair.right.exp}</div>
                </div>
            </div>

            <div class="ss-insp-aha">
                <span><strong>Aha-oplevelsen:</strong> ${pair.aha}</span>
            </div>

            <div class="ss-insp-languages">
                <div class="ss-lang-item"><strong>Engelsk:</strong> ${pair.lang.en}</div>
                <div class="ss-lang-item"><strong>Arabisk:</strong> ${pair.lang.ar}</div>
                <div class="ss-lang-item"><strong>Kinesisk:</strong> ${pair.lang.zh}</div>
            </div>
        `;

        detailCard.querySelector('#card-swap-btn').onclick = () => {
            selectPair(key, triggerSide === 'left' ? 'right' : 'left');
        };
    }

    function renderHotspotsUI() {
        leftContainer.innerHTML = '';
        rightContainer.innerHTML = '';
        stripContainer.innerHTML = '';

        contrastPairs.forEach((pair) => {
            const leftDot = document.createElement('button');
            leftDot.className = 'ss-hotspot';
            leftDot.style.left = `${pair.left.x}%`;
            leftDot.style.top = `${pair.left.y}%`;
            leftDot.dataset.key = pair.key;
            leftDot.innerHTML = pair.icon;
            leftDot.title = `${pair.title} (Dvælen: ${pair.left.word})`;
            leftDot.onclick = () => selectPair(pair.key, 'left');
            leftContainer.appendChild(leftDot);

            const rightDot = document.createElement('button');
            rightDot.className = 'ss-hotspot';
            rightDot.style.left = `${pair.right.x}%`;
            rightDot.style.top = `${pair.right.y}%`;
            rightDot.dataset.key = pair.key;
            rightDot.innerHTML = pair.icon;
            rightDot.title = `${pair.title} (Retningsskift: ${pair.right.word})`;
            rightDot.onclick = () => selectPair(pair.key, 'right');
            rightContainer.appendChild(rightDot);

            const sBtn = document.createElement('button');
            sBtn.className = 'ss-strip-btn';
            sBtn.dataset.key = pair.key;
            sBtn.innerHTML = `${pair.icon} ${pair.title.split(' ')[0]}`;
            sBtn.onclick = () => selectPair(pair.key, 'left');
            stripContainer.appendChild(sBtn);
        });

        selectPair(activeItemKey, 'left');
    }

    renderHotspotsUI();

    tabsNav.querySelectorAll('.ss-tab-btn').forEach(btn => {
        btn.onclick = () => {
            tabsNav.querySelectorAll('.ss-tab-btn').forEach(b => b.classList.remove('active'));
            panelsContainer.querySelectorAll('.ss-tab-panel').forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.dataset.tab === 'tab_kontrast' ? 'panel-kontrast' : 'panel-quiz';
            const targetPanel = panelsContainer.querySelector(`#${targetId}`);
            if (targetPanel) targetPanel.classList.add('active');
        };
    });

    container.appendChild(viewContainer);
}
