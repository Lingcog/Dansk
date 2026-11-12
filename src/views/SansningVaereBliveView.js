import { getTranslation, getLang } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

/**
 * SansningVaereBliveView - Station 1: Væren & Tilblivelse
 * Diktomisk Split-Stage Vrimlebillede (som i adjektiver_kvalitet/tab_kontrast):
 * 
 *  🔵 VENSTRE SIDE: VÆREN (At være / Er) — Verden i Ro (Yin)
 *  🟠 HØJRE SIDE: TILBLIVELSE (At blive / Bliver) — Verden i Forvandling (Yang)
 */
export function renderSansningVaereBliveView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    function speakDanish(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'da-DK';
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
    }

    let activeItemKey = 'kaffe';
    let isPureMode = false;

    const contrastPairs = [
        {
            key: 'kaffe',
            title: 'Kaffekoppen på bordet',
            icon: '☕',
            // Venstre side: Er (Væren)
            left: {
                x: 28,
                y: 72,
                word: 'er kold',
                sent: 'Kaffen er kold.',
                exp: 'Koppen har stået der længe. Kulden er et uforandret faktum i ro.'
            },
            // Højre side: Bliver (Tilblivelse)
            right: {
                x: 28,
                y: 72,
                word: 'bliver kold',
                sent: 'Kaffen bliver kold.',
                exp: 'Dampen siver væk i den kølige luft lige nu. Temperaturen falder aktivt.'
            },
            aha: 'Drikker du en kop, der ALLEREDE ER kold, eller ser du dampen forsvinde, mens den BLIVER kold?',
            lang: {
                en: 'is cold vs. gets/becomes cold',
                ar: 'القهوة باردة (حال ثابت) vs. القهوة تبرد / تصبح باردة (تحول)',
                zh: '咖啡是凉的 (状态) vs. 咖啡变凉了 (转变过程)'
            }
        },
        {
            key: 'lys',
            title: 'Lyset gennem vinduet',
            icon: '☀️',
            left: {
                x: 75,
                y: 28,
                word: 'er lys',
                sent: 'Stuen er lys.',
                exp: 'Klokken er 12:00 middag. Solen oplyser hele rummet i en stabil, rolig tilstand.'
            },
            right: {
                x: 75,
                y: 28,
                word: 'bliver lys',
                sent: 'Stuen bliver lys.',
                exp: 'Klokken er 06:00 om morgenen. Mørket trækker sig tilbage, og dagslyset bryder frem.'
            },
            aha: 'Er = solen står højt i ro. Bliver = natten forvandler sig langsomt til dag.',
            lang: {
                en: 'is bright vs. is getting bright',
                ar: 'الغرفة مضيئة vs. الغرفة تشرق وتصبح مضيئة',
                zh: '房间是明亮的 vs. 房间变亮了'
            }
        },
        {
            key: 'sovn',
            title: 'Personen i lænestolen',
            icon: '🛋️',
            left: {
                x: 50,
                y: 56,
                word: 'er træt',
                sent: 'Mads er træt.',
                exp: 'Han sover allerede tungt med lukkede øjne i stolen. Tilstand i ro.'
            },
            right: {
                x: 50,
                y: 56,
                word: 'bliver træt',
                sent: 'Mads bliver træt.',
                exp: 'Han gaber og gnider sine øjne efter en lang arbejdsdag. Trætheden sniger sig ind.'
            },
            aha: 'Er du allerede træt (og sover), eller mærker du trætheden komme rullende over dig (bliver træt)?',
            lang: {
                en: 'is tired vs. gets/becomes tired',
                ar: 'مادس متعب vs. مادس يتعب ويشعر بالنعاس',
                zh: '马兹累了 vs. 马兹感到困了/变累了'
            }
        },
        {
            key: 'bil',
            title: 'Bilen i indkørslen',
            icon: '🚗',
            left: {
                x: 18,
                y: 40,
                word: 'er ren',
                sent: 'Bilen er ren.',
                exp: 'Bilen står nypudset, tør og skinnende uden en eneste snavset plet.'
            },
            right: {
                x: 18,
                y: 40,
                word: 'bliver ren',
                sent: 'Bilen bliver ren.',
                exp: 'Vandslangen og sæbeskummet er i fuld gang med at vaske snavset væk.'
            },
            aha: 'Ren i ro (er ren) vs. handlingen der gør den ren skridt for skridt (bliver ren).',
            lang: {
                en: 'is clean vs. gets cleaned / becomes clean',
                ar: 'السيارة نظيفة vs. السيارة تُغسل وتصبح نظيفة',
                zh: '车是干净的 vs. 车正在变干净'
            }
        },
        {
            key: 'barn',
            title: 'Målebåndet på dørkarmen',
            icon: '📏',
            left: {
                x: 60,
                y: 45,
                word: 'er 125 cm',
                sent: 'Emil er 125 cm høj.',
                exp: 'Målebåndet viser hans faste, målte højde lige nu på denne dag.'
            },
            right: {
                x: 60,
                y: 45,
                word: 'bliver høj',
                sent: 'Emil bliver høj som sin far.',
                exp: 'Kroppen vokser uge for uge. Den biologiske forvandling over tid.'
            },
            aha: 'Højde i dag som et faktum (er) vs. biologisk vækst fremadrettet (bliver).',
            lang: {
                en: 'is 125 cm tall vs. will grow / become tall',
                ar: 'إميل طوله 125 سم vs. إميل سيكبر ويصبح طويلاً',
                zh: '埃米尔身高125厘米 vs. 埃米尔将长得很高'
            }
        },
        {
            key: 'suppe',
            title: 'Suppen på komfuret',
            icon: '🍲',
            left: {
                x: 35,
                y: 50,
                word: 'er varm',
                sent: 'Suppen er varm.',
                exp: 'Suppen er hældt op i tallerkenen og er rygende klar til at blive spist.'
            },
            right: {
                x: 35,
                y: 50,
                word: 'bliver varm',
                sent: 'Suppen bliver varm.',
                exp: 'Blusset er tændt på trin 6, og varmen stiger støt i gryden.'
            },
            aha: 'Varm mad på spisebordet (er) vs. opvarmningsprocessen på kogepladen (bliver).',
            lang: {
                en: 'is hot vs. gets/becomes hot',
                ar: 'الحساء ساخن vs. الحساء يسخن / يصبح ساخناً',
                zh: '汤是热的 vs. 汤正在变热'
            }
        },
        {
            key: 'vejr',
            title: 'Himlen over haven',
            icon: '⛅',
            left: {
                x: 88,
                y: 20,
                word: 'er kold',
                sent: 'Vejret er koldt i dag.',
                exp: 'Termometeret viser 2 grader, og kulden ligger fast og ubevægelig over landskabet.'
            },
            right: {
                x: 88,
                y: 20,
                word: 'bliver koldt',
                sent: 'Vejret bliver koldt i weekenden.',
                exp: 'Vejrudsigten viser, at en polarfront fejer ind over Danmark og skaber kuldeomslaget.'
            },
            aha: 'Det aktuelle vejr uden for vinduet (er) vs. temperatur-omslaget der kommer (bliver).',
            lang: {
                en: 'is cold today vs. will get/become cold',
                ar: 'الطقس بارد اليوم vs. الطقس سيصبح بارداً',
                zh: '今天天气冷 vs. 天气会变冷'
            }
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Det regner, og du glemte din paraply. Tøjet ... vådt.',
            options: ['er', 'bliver'],
            correct: 'bliver',
            expl: 'Regndråberne rammer tøjet lige nu, så det gennemgår en forvandling fra tørt til vådt.'
        },
        {
            prompt: 'Du har sovet i 9 timer i nat og spist en god morgenmad. Du ... frisk.',
            options: ['er', 'bliver'],
            correct: 'er',
            expl: 'Du er allerede udhvilet. Det er en stabil tilstand her og nu.'
        },
        {
            prompt: 'Klokken er 18:00 om vinteren. Det ... hurtigt mørkt udenfor.',
            options: ['er', 'bliver'],
            correct: 'bliver',
            expl: 'Solen går ned, og mørket tager til minut for minut (overgang).'
        },
        {
            prompt: 'Vores nabo har arbejdet i haven hele formiddagen. Nu ... han sulten.',
            options: ['er', 'bliver'],
            correct: 'er',
            expl: 'Efter arbejdet befinder han sig i tilstanden: sulten og klar til frokost.'
        },
        {
            prompt: 'Hvis du ikke stiller mælken i køleskabet, ... den sur.',
            options: ['er', 'bliver'],
            correct: 'bliver',
            expl: 'Mælken er god nu, men vil forvandle sig og blive sur over tid.'
        },
        {
            prompt: 'Tænd for ovnen på 200 grader, så den ... varm til brødet.',
            options: ['er', 'bliver'],
            correct: 'bliver',
            expl: 'Ovnen starter kold og skal nå 200 grader igennem opvarmning.'
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

        /* Tabs */
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

        /* -------------------------------------------------------------
           DIKTOMISK SPLIT-STAGE (som i adjektiver_kvalitet/tab_kontrast)
           ------------------------------------------------------------- */
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

        /* Hotspots */
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
        .stage-half.left-half .ss-hotspot {
            background: #0284c7;
        }
        .stage-half.right-half .ss-hotspot {
            background: #ea580c;
        }

        .ss-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.22);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            z-index: 8;
        }

        /* Active hotspot state */
        .ss-hotspot.active {
            background: #10b981 !important;
            border-color: #ffffff !important;
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 24px rgba(16, 185, 129, 0.95);
            z-index: 10;
        }

        /* Partner hotspot state (Modpol) */
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

        @keyframes pulsePartner {
            0%, 100% { transform: translate(-50%, -50%) scale(1.2); }
            50% { transform: translate(-50%, -50%) scale(1.32); }
        }

        .pure-mode .ss-hotspot {
            display: none !important;
        }

        /* Hotspots Selection Strip */
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
        .ss-strip-btn:hover {
            border-color: #38bdf8;
            color: #ffffff;
        }
        .ss-strip-btn.active {
            background: rgba(2, 132, 199, 0.35);
            border-color: #38bdf8;
            color: #ffffff;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }

        /* -------------------------------------------------------------
           DETAIL INSPECTOR CARD (SIDE-OM-SIDE MODPOLER)
           ------------------------------------------------------------- */
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
            border: 1.5px solid rgba(251, 146, 60, 0.5);
            color: #fdba74;
            padding: 0.4rem 0.9rem;
            border-radius: 999px;
            font-size: 0.84rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .adj-modpol-pill:hover {
            background: rgba(251, 146, 60, 0.2);
            border-color: #fb923c;
            color: #ffffff;
            transform: scale(1.04);
        }

        .adj-congruence-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.15rem;
        }
        @media (max-width: 768px) {
            .adj-congruence-grid { grid-template-columns: 1fr; }
        }

        .ss-contrast-box {
            border-radius: 14px;
            padding: 1.15rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
        }
        .ss-contrast-box.tilstand {
            background: linear-gradient(145deg, rgba(12, 74, 110, 0.25), rgba(15, 23, 42, 0.85));
            border: 1.5px solid rgba(56, 189, 248, 0.45);
        }
        .ss-contrast-box.forvandling {
            background: linear-gradient(145deg, rgba(154, 52, 18, 0.25), rgba(15, 23, 42, 0.85));
            border: 1.5px solid rgba(251, 146, 60, 0.45);
        }
        .ss-box-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.76rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0.25rem 0.65rem;
            border-radius: 6px;
            width: fit-content;
        }
        .ss-contrast-box.tilstand .ss-box-badge {
            background: rgba(56, 189, 248, 0.2);
            color: #7dd3fc;
        }
        .ss-contrast-box.forvandling .ss-box-badge {
            background: rgba(251, 146, 60, 0.2);
            color: #fdba74;
        }
        .ss-box-sent-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.6rem;
        }
        .ss-box-sent {
            font-size: 1.18rem;
            font-weight: 800;
            color: #ffffff;
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
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.65rem;
            background: rgba(15, 23, 42, 0.55);
            border-radius: 12px;
            padding: 0.8rem 1rem;
            border: 1px solid rgba(148, 163, 184, 0.15);
        }
        .ss-lang-item {
            font-size: 0.82rem;
            color: #94a3b8;
        }
        .ss-lang-item strong { color: #f8fafc; }

        /* Quiz styles */
        .ss-quiz-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
            border: 1.5px solid rgba(56, 189, 248, 0.35);
            border-radius: 20px;
            padding: 1.75rem 1.85rem;
            max-width: 780px;
            margin: 0 auto;
            box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
        }
        .ss-quiz-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
            font-size: 0.86rem;
            font-weight: 800;
            color: #94a3b8;
        }
        .ss-quiz-question-box {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            padding: 1.25rem 1.4rem;
            margin-bottom: 1.35rem;
            font-size: 1.15rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.5;
        }
        .ss-quiz-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.25rem;
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
    `;
    viewContainer.appendChild(style);

    // 1. Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.innerHTML = `← Tilbage til Sansningsoversigten`;
    backBtn.onclick = () => navigateFn('grammatik_sansning');
    topBar.appendChild(backBtn);

    const badge = document.createElement('span');
    badge.className = 'ss-station-badge';
    badge.innerHTML = `Station 1 • Diktomisk Kontrast`;
    topBar.appendChild(badge);

    viewContainer.appendChild(topBar);

    // 2. Hero
    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Væren (Er) vs. Tilblivelse (Bliver)</h1>
        <p>
            Se de to verdener side om side: 
            <strong>Venstre side</strong> viser tilstanden i ro (<em>"Kaffen er kold"</em>), 
            mens <strong>højre side</strong> viser selve forvandlingen (<em>"Kaffen bliver kold"</em>).
            Klik på et motiv for at se modpolen lyse op!
        </p>
    `;
    viewContainer.appendChild(hero);

    // 3. Tabs
    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="tab_kontrast">
            ⚖️ 1. Diktomisk Vrimlebillede
        </button>
        <button class="ss-tab-btn" data-tab="tab_quiz">
            🎯 2. Træningsbane: Er eller Bliver?
        </button>
    `;
    viewContainer.appendChild(tabsNav);

    const panelsContainer = document.createElement('div');

    // -------------------------------------------------------------
    // TAB 1: DIKTOMISK SPLIT-STAGE
    // -------------------------------------------------------------
    const panelKontrast = document.createElement('div');
    panelKontrast.className = 'ss-tab-panel active';
    panelKontrast.id = 'panel-kontrast';

    panelKontrast.innerHTML = `
        <div class="contrast-canvas-card">
            <!-- Control bar -->
            <div class="contrast-control-bar">
                <div class="contrast-instruction">
                    💡 <em>Klik på et motiv på venstre side (Væren) for at se dets spejlbillede på højre side (Tilblivelse).</em>
                </div>
                <button class="pure-toggle-btn" id="pure-toggle-btn">
                    🖼️ Ren visning: <strong id="pure-status-label">FRA</strong>
                </button>
            </div>

            <!-- Split Stage -->
            <div class="contrast-split-stage" id="split-stage">
                <!-- VENSTRE HALVDEL: VÆREN (ER / RO) -->
                <div class="stage-half left-half">
                    <div class="stage-half-header cool">🔵 VÆREN (At være / Er) — Verden i Ro</div>
                    <img src="assets/sansning_vaere_venstre.jpg" alt="Væren og ro i havnebyen" class="stage-half-img" />

                    <!-- Hotspots Venstre -->
                    <div id="left-hotspots-container"></div>
                </div>

                <!-- HØJRE HALVDEL: TILBLIVELSE (BLIVER / FORVANDLING) -->
                <div class="stage-half right-half">
                    <div class="stage-half-header warm">🟠 TILBLIVELSE (At blive / Bliver) — Forvandling</div>
                    <img src="assets/sansning_blive_hoejre.jpg" alt="Tilblivelse og forvandling i havnebyen" class="stage-half-img" />

                    <!-- Hotspots Højre -->
                    <div id="right-hotspots-container"></div>
                </div>
            </div>

            <!-- Hotspots Strip -->
            <div class="ss-hotspots-strip" id="hotspots-strip"></div>
        </div>

        <!-- Detail Inspector Card (Modpol-kort) -->
        <div class="adj-detail-card" id="detail-card"></div>
    `;
    panelsContainer.appendChild(panelKontrast);

    // -------------------------------------------------------------
    // TAB 2: QUIZ TRACK
    // -------------------------------------------------------------
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
                    <span style="font-size: 3rem;">🎉</span>
                    <h2 style="font-size: 1.8rem; margin: 0.5rem 0 1rem; color: #fde68a;">
                        Træningsbane Gennemført!
                    </h2>
                    <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore} af ${quizQuestions.length}</strong> rigtige!
                    </p>
                    <button class="ss-back-btn" id="btn-restart-quiz" style="margin: 0 auto; background: #0284c7;">
                        🔄 Tag træningsbanen igen
                    </button>
                </div>
            `;
            panelQuiz.querySelector('#btn-restart-quiz').onclick = () => {
                currentQuestionIdx = 0;
                quizScore = 0;
                renderQuizTrack();
            };
            return;
        }

        panelQuiz.innerHTML = `
            <div class="ss-quiz-card">
                <div class="ss-quiz-progress">
                    <span>Opgave ${currentQuestionIdx + 1} af ${quizQuestions.length}</span>
                    <span>Score: ${quizScore} rigtige</span>
                </div>
                
                <div class="ss-quiz-question-box">
                    "${q.prompt}"
                </div>

                <div class="ss-quiz-options">
                    <button class="ss-quiz-opt-btn" data-val="er">
                        🔵 er (Tilstand i ro)
                    </button>
                    <button class="ss-quiz-opt-btn" data-val="bliver">
                        🟠 bliver (Forvandling / omslag)
                    </button>
                </div>

                <div class="ss-quiz-feedback" id="quiz-feedback"></div>

                <button class="ss-quiz-next-btn" id="quiz-next-btn">
                    Næste opgave →
                </button>
            </div>
        `;

        const feedbackBox = panelQuiz.querySelector('#quiz-feedback');
        const nextBtn = panelQuiz.querySelector('#quiz-next-btn');

        panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(btn => {
            btn.onclick = () => {
                panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(b => b.disabled = true);
                const isCorrect = btn.getAttribute('data-val') === q.correct;
                if (isCorrect) {
                    quizScore++;
                    btn.classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show correct';
                    feedbackBox.innerHTML = `<strong>Rigtigt!</strong> ${q.expl}`;
                } else {
                    btn.classList.add('wrong');
                    panelQuiz.querySelector(`[data-val="${q.correct}"]`).classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show wrong';
                    feedbackBox.innerHTML = `<strong>Prøv igen:</strong> Det rigtige er <em>"${q.correct}"</em>. ${q.expl}`;
                }
                nextBtn.style.display = 'inline-flex';
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

    // -------------------------------------------------------------
    // Diktomisk Hotspot & Modpol-logik
    // -------------------------------------------------------------
    const leftContainer = panelKontrast.querySelector('#left-hotspots-container');
    const rightContainer = panelKontrast.querySelector('#right-hotspots-container');
    const stripContainer = panelKontrast.querySelector('#hotspots-strip');
    const detailCard = panelKontrast.querySelector('#detail-card');
    const pureBtn = panelKontrast.querySelector('#pure-toggle-btn');
    const splitStage = panelKontrast.querySelector('#split-stage');

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

        // TTS på det valgte ord
        speakDanish(triggerSide === 'left' ? pair.left.sent : pair.right.sent);

        // Opdater venstre hotspots
        leftContainer.querySelectorAll('.ss-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.key === key) {
                if (triggerSide === 'left') dot.classList.add('active');
                else dot.classList.add('partner-active');
            }
        });

        // Opdater højre hotspots
        rightContainer.querySelectorAll('.ss-hotspot').forEach(dot => {
            dot.classList.remove('active', 'partner-active');
            if (dot.dataset.key === key) {
                if (triggerSide === 'right') dot.classList.add('active');
                else dot.classList.add('partner-active');
            }
        });

        // Opdater strip knapper
        stripContainer.querySelectorAll('.ss-strip-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.key === key);
        });

        // Opdater Detail Card (Modpol)
        detailCard.innerHTML = `
            <div class="adj-detail-header">
                <div class="adj-title-group">
                    <span style="font-size: 1.6rem;">${pair.icon}</span>
                    <span class="adj-main-word">${pair.title}</span>
                </div>
                <div class="adj-modpol-pill" id="card-swap-btn" title="Klik for at skifte fokus">
                    <span>${triggerSide === 'left' ? 'Skift til Forvandling' : 'Skift til Væren'}</span>
                    <strong>${triggerSide === 'left' ? 'bliver ➔' : 'er ➔'}</strong>
                </div>
            </div>

            <div class="adj-congruence-grid">
                <!-- 🔵 Venstre Halvdel: Væren (er) -->
                <div class="ss-contrast-box tilstand">
                    <span class="ss-box-badge">🔵 Venstre: Væren i Ro (er)</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.left.sent.replace('er', '<span class="ss-box-verb-highlight">er</span>')}
                        </span>
                        <button class="ss-tts-audio-btn" data-tts="${pair.left.sent}" title="Lyt">🔊</button>
                    </div>
                    <div class="ss-box-exp">${pair.left.exp}</div>
                </div>

                <!-- 🟠 Højre Halvdel: Tilblivelse (bliver) -->
                <div class="ss-contrast-box forvandling">
                    <span class="ss-box-badge">🟠 Højre: Forvandling i Bevægelse (bliver)</span>
                    <div class="ss-box-sent-row">
                        <span class="ss-box-sent">
                            ${pair.right.sent.replace('bliver', '<span class="ss-box-verb-highlight">bliver</span>')}
                        </span>
                        <button class="ss-tts-audio-btn" data-tts="${pair.right.sent}" title="Lyt">🔊</button>
                    </div>
                    <div class="ss-box-exp">${pair.right.exp}</div>
                </div>
            </div>

            <div class="ss-insp-aha">
                <span style="font-size: 1.3rem;">💡</span>
                <span><strong>Aha-oplevelsen:</strong> ${pair.aha}</span>
            </div>

            <div class="ss-insp-languages">
                <div class="ss-lang-item">🇬🇧 <strong>Engelsk:</strong> ${pair.lang.en}</div>
                <div class="ss-lang-item">🇸🇦 <strong>Arabisk:</strong> ${pair.lang.ar}</div>
                <div class="ss-lang-item">🇨🇳 <strong>Kinesisk:</strong> ${pair.lang.zh}</div>
            </div>
        `;

        detailCard.querySelector('#card-swap-btn').onclick = () => {
            selectPair(key, triggerSide === 'left' ? 'right' : 'left');
        };

        detailCard.querySelectorAll('.ss-tts-audio-btn').forEach(btn => {
            btn.onclick = () => speakDanish(btn.getAttribute('data-tts'));
        });
    }

    function renderHotspotsUI() {
        leftContainer.innerHTML = '';
        rightContainer.innerHTML = '';
        stripContainer.innerHTML = '';

        contrastPairs.forEach((pair) => {
            // Venstre hotspot (Er)
            const leftDot = document.createElement('button');
            leftDot.className = 'ss-hotspot';
            leftDot.style.left = `${pair.left.x}%`;
            leftDot.style.top = `${pair.left.y}%`;
            leftDot.dataset.key = pair.key;
            leftDot.innerHTML = pair.icon;
            leftDot.title = `${pair.title} (Væren: ${pair.left.word})`;
            leftDot.onclick = () => selectPair(pair.key, 'left');
            leftContainer.appendChild(leftDot);

            // Højre hotspot (Bliver)
            const rightDot = document.createElement('button');
            rightDot.className = 'ss-hotspot';
            rightDot.style.left = `${pair.right.x}%`;
            rightDot.style.top = `${pair.right.y}%`;
            rightDot.dataset.key = pair.key;
            rightDot.innerHTML = pair.icon;
            rightDot.title = `${pair.title} (Tilblivelse: ${pair.right.word})`;
            rightDot.onclick = () => selectPair(pair.key, 'right');
            rightContainer.appendChild(rightDot);

            // Strip-knap
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

    // Tabs switching
    tabsNav.querySelectorAll('.ss-tab-btn').forEach(btn => {
        btn.onclick = () => {
            tabsNav.querySelectorAll('.ss-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            panelsContainer.querySelectorAll('.ss-tab-panel').forEach(p => p.classList.remove('active'));

            if (targetId === 'tab_kontrast') panelKontrast.classList.add('active');
            else if (targetId === 'tab_quiz') panelQuiz.classList.add('active');
        };
    });

    container.appendChild(viewContainer);
}
