import { baseUrl } from '../utils/config.js';

/**
 * Station 2.1: Præpositioner – i (hulens tryghed) vs. på (eksponeret flade)
 * Hovedflade 2: Rum, tid og relationer (Nærhed vs. Afstand)
 */
export function renderSansningIPaaView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    const pairs = [
        {
            id: 'noegler',
            icon: '🔑',
            shortTitle: 'I tasken vs. på bordet',
            wordTitle: 'I tasken / på bordet',
            category: 'Omslutning vs. overflade',
            leftLabel: 'Indrammet: i tasken',
            rightLabel: 'Eksponeret: på bordet',
            leftPos: { x: 28, y: 29 },
            rightPos: { x: 34, y: 41 },
            leftSent: 'Nøglerne ligger dybt <span class="ss-box-verb-highlight">i</span> tasken.',
            rightSent: 'Nøglerne ligger synligt <span class="ss-box-verb-highlight">på</span> bordet.',
            leftExp: 'Taskens vægge omslutter nøglerne fra flere sider som en lille hule. Derfor siger dansk <strong>i tasken</strong>.',
            rightExp: 'Nu ligger nøglerne frit fremme oven på den åbne træplade uden vægge omkring sig: <strong>på bordet</strong>.',
            aha: '<strong>I</strong> ser rummets omsluttende vægge og trygge rum. <strong>På</strong> ser kun den åbne, flade overflade.',
            langs: {
                en: 'in the bag vs. on the table',
                de: 'in der Tasche vs. auf dem Tisch',
                ar: 'في الحقيبة (داخل) مقابل على الطاولة (سطح)',
                es: 'en el bolso vs. sobre la mesa'
            }
        },
        {
            id: 'hule',
            icon: '⛺',
            shortTitle: 'I hulen vs. på stolen',
            wordTitle: 'I hulen / på stolen',
            category: 'Hule vs. åben plads',
            leftLabel: 'Omsluttet: i hulen',
            rightLabel: 'Frit fremme: på stolen',
            leftPos: { x: 24, y: 74 },
            rightPos: { x: 22, y: 65 },
            leftSent: 'Drengen sidder trygt inde <span class="ss-box-verb-highlight">i</span> hulen.',
            rightSent: 'Drengen sidder åbent oppe <span class="ss-box-verb-highlight">på</span> stolen.',
            leftExp: 'Tæpperne danner tag og sider omkring ham. Rummet omfavner kroppen, præcis som når vi siger <strong>i stuen</strong> eller <strong>i Danmark</strong>.',
            rightExp: 'Uden hulen sidder han frit oven på stolesædet under åbent loft, ligesom vi færdes <strong>på gaden</strong> eller bor <strong>på Fyn</strong>.',
            aha: 'På dansk ligger faste lande med grænser <strong>i</strong> (<em>i Danmark</em>), mens mange danske øer opleves som en flade ude i havet: <strong>på</strong> (<em>på Fyn, på Sjælland, på Bornholm</em>).',
            langs: {
                en: 'in the fort / in Denmark vs. on the chair / on Funen',
                de: 'in der Höhle / in Dänemark vs. auf dem Stuhl / auf Fünen',
                ar: 'في الخيمة / في الدنمارك مقابل على الكرسي',
                es: 'en la cueva / en Dinamarca vs. en la silla / en Fionia'
            }
        },
        {
            id: 'kat',
            icon: '🐱',
            shortTitle: 'I kassen vs. på kassen',
            wordTitle: 'I kassen / på kassen',
            category: 'Beholder vs. låg',
            leftLabel: 'Nede i: i kassen',
            rightLabel: 'Ovenpå: på kassen',
            leftPos: { x: 54, y: 74 },
            rightPos: { x: 54, y: 73 },
            leftSent: 'Katten sover nede <span class="ss-box-verb-highlight">i</span> papkassen.',
            rightSent: 'Katten ligger oppe <span class="ss-box-verb-highlight">på</span> papkassen.',
            leftExp: 'Når lågene er åbne, er kassen en dyb skål med fire vægge om katten: den hviler <strong>i kassen</strong>.',
            rightExp: 'Så snart låget foldes sammen, forvandles kassen til en flade uden vægge. Nu ligger katten <strong>på kassen</strong>.',
            aha: 'Det er den samme papkasse, men kameraet mærker om du er inde mellem væggene (<strong>i</strong>) eller oven på låget (<strong>på</strong>).',
            langs: {
                en: 'inside the box vs. on top of the box',
                de: 'in der Kiste vs. auf der Kiste',
                ar: 'داخل الصندوق مقابل فوق الصندوق',
                es: 'dentro de la caja vs. encima de la caja'
            }
        },
        {
            id: 'aebler',
            icon: '🍎',
            shortTitle: 'I skålen vs. på tallerkenen',
            wordTitle: 'I skålen / på tallerkenen',
            category: 'Dybde vs. flade',
            leftLabel: 'Dyb beholder: i skålen',
            rightLabel: 'Flad overflade: på tallerkenen',
            leftPos: { x: 70, y: 47 },
            rightPos: { x: 73, y: 51 },
            leftSent: 'Æblerne ligger samlet <span class="ss-box-verb-highlight">i</span> skålen.',
            rightSent: 'Æblerne ligger spredt <span class="ss-box-verb-highlight">på</span> tallerkenen.',
            leftExp: 'En dyb skål har høje sider, der holder frugten inde i et rum: derfor siger dansk altid <strong>i skålen</strong>.',
            rightExp: 'En flad tallerken eller et fad mangler omsluttende sider. Maden ligger eksponeret <strong>på tallerkenen</strong>.',
            aha: 'Forskellen på en dyb tallerken (suppe <strong>i</strong> skålen) og en flad tallerken (mad <strong>på</strong> tallerkenen) afgøres af dybden.',
            langs: {
                en: 'in the bowl vs. on the plate',
                de: 'in der Schüssel vs. auf dem Teller',
                ar: 'في الوعاء العميق مقابل على الطبق المسطح',
                es: 'en el cuenco vs. en el plato'
            }
        },
        {
            id: 'kopper',
            icon: '☕',
            shortTitle: 'I skabet vs. på hylden',
            wordTitle: 'I skabet / på hylden',
            category: 'Lukket rum vs. åben hylde',
            leftLabel: 'Bag døre: i skabet',
            rightLabel: 'Åben række: på hylden',
            leftPos: { x: 84, y: 24 },
            rightPos: { x: 83, y: 15 },
            leftSent: 'Kopperne står gemt <span class="ss-box-verb-highlight">i</span> skabet.',
            rightSent: 'Kopperne står fremme <span class="ss-box-verb-highlight">på</span> hylden.',
            leftExp: 'Skabet er en trækasse med sider, top, bund og låge. Kopperne er beskyttet inde <strong>i skabet</strong>.',
            rightExp: 'En hylde har kun én vandret flade og intet rum omkring sig. Kopperne står frit fremme <strong>på hylden</strong>.',
            aha: 'Tjek om du kan lukke en dør om tingen: kan du det, er den <strong>i</strong>; står den kun støttet nedefra, er den <strong>på</strong>.',
            langs: {
                en: 'in the cupboard vs. on the shelf',
                de: 'im Schrank vs. auf dem Regal',
                ar: 'في الخزانة مقابل على الرف',
                es: 'en el armario vs. en la estantería'
            }
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Min søster bor i København, og min bror bor i Odense ... Fyn.',
            options: ['i', 'på'],
            correct: 'på',
            expl: 'Danske øer (Fyn, Sjælland, Bornholm, Samsø) opleves som eksponerede flader i vandet og får "på". Lande og byer får "i" (i Danmark, i Odense).'
        },
        {
            prompt: 'Du kan ikke finde din mobil, men opdager den ligger synligt fremme ... køkkenbordet.',
            options: ['i', 'på'],
            correct: 'på',
            expl: 'Et bord er en flad overflade uden omsluttende vægge, så mobilen ligger "på bordet".'
        },
        {
            prompt: 'Vi serverer varm tomatsuppe ... en dyb skål.',
            options: ['i', 'på'],
            correct: 'i',
            expl: 'En dyb skål omslutter suppen med sine høje sider — derfor bruges "i skålen".'
        },
        {
            prompt: 'Alle mine vinterhandsker ligger samlet nede ... tasken.',
            options: ['i', 'på'],
            correct: 'i',
            expl: 'Taskens stof og sider omslutter handskerne som et beskyttet rum: "i tasken".'
        },
        {
            prompt: 'Om søndagen er der næsten ingen biler ude ... gaden.',
            options: ['i', 'på'],
            correct: 'på',
            expl: 'Gaden, torvet og fortovet opleves som åbne færdselsflader: "på gaden" og "på torvet".'
        },
        {
            prompt: 'Jeg mangler mælk til kaffen, så jeg går lige ... supermarkedet.',
            options: ['i', 'på'],
            correct: 'i',
            expl: 'Dagligdagslokaler og butikker opleves som omsluttende rum, vi træder ind i: "går i supermarkedet", "går i biografen", "går i banken".'
        },
        {
            prompt: 'Skal vi ikke gå ... biografen på fredag og se den nye danske film?',
            options: ['i', 'på'],
            correct: 'i',
            expl: 'Biografen, teatret og svømmehallen opleves som mørke/lukkede oplevelsesrum omkring os: "går i biografen".'
        },
        {
            prompt: 'Min søn er otte år og går ... skole hvert år fra august til juni.',
            options: ['i', 'på'],
            correct: 'i',
            expl: 'Når vi taler generelt om selve skolegangen, bruges "i": "han går i skole". (Men nævner du skolens eget navn, skifter det til "på"!)'
        },
        {
            prompt: 'Min nevø går ... Vesterbroskole lige her i nærheden.',
            options: ['i', 'på'],
            correct: 'på',
            expl: 'Så snart en skole har et præcist egennavn eller er en videregående uddannelse, skifter dansk til "på": "han går på Vesterbroskole", "på gymnasiet", "på universitetet".'
        },
        {
            prompt: 'Efter gymnasiet vil hun gerne læse jura og gå ... universitetet.',
            options: ['i', 'på'],
            correct: 'på',
            expl: 'Offentlige uddannelses- og samfundsinstitutioner bruger "på": "går på universitetet", "går på biblioteket", "tager på hospitalet".'
        },
        {
            prompt: 'Han slog foden slemt i fodboldkampen og måtte tage ... hospitalet.',
            options: ['i', 'på'],
            correct: 'på',
            expl: 'Offentlige institutioner og servicebygninger opleves som steder i samfundet man opsøger udefra: "tager på hospitalet", "går på biblioteket", "på rådhuset".'
        },
        {
            prompt: 'I aften skal vi fejre vores årsdag, så vi går ... restaurant.',
            options: ['i', 'på'],
            correct: 'på',
            expl: 'Alle steder hvor man spiser og får serveret mad eller drikke tager "på": "går på restaurant", "på café", "på pizzeria", "på kro".'
        }
    ];

    const style = document.createElement('style');
    style.textContent = `
        .sansning-station-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.25rem 5rem;
            color: #ffffff;
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
        .ss-back-btn:hover {
            border-color: #FFC9CD;
            background: #73101C;
            transform: translateX(-2px);
        }
        .ss-station-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(92, 8, 18, 0.9);
            border: 1px solid #851825;
            border-radius: 999px;
            padding: 0.35rem 0.95rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #FFC9CD;
            letter-spacing: 0.04em;
        }
        .ss-hero {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .ss-hero h1 {
            font-size: 2.15rem;
            font-weight: 900;
            margin: 0 0 0.45rem;
            letter-spacing: -0.02em;
            color: #ffffff;
        }
        .ss-hero p {
            color: #FFC9CD;
            font-size: 1.02rem;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.55;
        }
        .ss-tabs-nav {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1.8rem;
            background: #5C0812;
            border: 1.5px solid #851825;
            padding: 0.45rem;
            border-radius: 16px;
        }
        .ss-tab-btn {
            background: transparent;
            border: none;
            color: #FFC9CD;
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            font-size: 0.88rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-tab-btn:hover { color: #ffffff; background: rgba(255, 255, 255, 0.08); }
        .ss-tab-btn.active { background: #FF4D5E; color: #ffffff; }
        .ss-tab-panel { display: none; }
        .ss-tab-panel.active { display: block; animation: ssFade 0.25s ease; }
        @keyframes ssFade {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .contrast-canvas-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
            margin-bottom: 1.5rem;
        }
        .contrast-control-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1.25rem;
            background: #4A040B;
            border-bottom: 1px solid #851825;
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        .contrast-instruction { color: #FFC9CD; font-size: 0.88rem; }
        .pure-toggle-btn {
            background: #5C0812;
            border: 1px solid #851825;
            color: #FFC9CD;
            padding: 0.4rem 0.85rem;
            border-radius: 10px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .pure-toggle-btn:hover { border-color: #FFC9CD; color: #ffffff; }
        .pure-toggle-btn.active { background: #FF4D5E; border-color: #FF4D5E; color: #ffffff; }
        .contrast-split-stage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
            background: #090d16;
        }
        @media (max-width: 820px) {
            .contrast-split-stage { grid-template-columns: 1fr; }
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
            backdrop-filter: blur(8px);
            padding: 0.4rem 0.9rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.03em;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
            line-height: 1.4;
        }
        .stage-half-header.cool {
            color: #7dd3fc;
            border: 1.5px solid rgba(56, 189, 248, 0.65);
            background: rgba(12, 74, 110, 0.88);
        }
        .stage-half-header.warm {
            color: #fed7aa;
            border: 1.5px solid rgba(251, 146, 60, 0.65);
            background: rgba(154, 52, 18, 0.88);
        }
        .stage-half img { width: 100%; height: auto; display: block; }
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
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.55);
            transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 5;
        }
        .stage-half.left-half .ss-hotspot { background: #0284c7; }
        .stage-half.right-half .ss-hotspot { background: #ea580c; }
        .ss-hotspot:hover { transform: translate(-50%, -50%) scale(1.22); z-index: 8; }
        .ss-hotspot.active {
            background: #10b981 !important;
            border-color: #ffffff !important;
            transform: translate(-50%, -50%) scale(1.28);
            box-shadow: 0 0 22px rgba(16, 185, 129, 0.9);
            z-index: 10;
        }
        .ss-hotspot.partner-active {
            border-color: #fde68a !important;
            transform: translate(-50%, -50%) scale(1.2);
            z-index: 9;
        }
        .pure-mode .ss-hotspot { display: none !important; }
        .ss-hotspots-strip {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.75rem 1.25rem;
            background: #4A040B;
            border-top: 1px solid #851825;
        }
        .ss-strip-btn {
            flex-shrink: 0;
            background: #5C0812;
            border: 1px solid #851825;
            border-radius: 10px;
            padding: 0.45rem 0.85rem;
            color: #FFC9CD;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .ss-strip-btn:hover { border-color: #FFC9CD; color: #ffffff; }
        .ss-strip-btn.active { background: #FF4D5E; border-color: #FF4D5E; color: #ffffff; }
        .ss-detail-card {
            background: #5C0812;
            border-radius: 20px;
            border: 1.5px solid #851825;
            padding: 1.4rem 1.6rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
        }
        .ss-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            border-bottom: 1px solid #851825;
            padding-bottom: 0.8rem;
        }
        .ss-main-word { font-size: 1.45rem; font-weight: 900; color: #ffffff; }
        .ss-cat-pill {
            background: #4A040B;
            border: 1px solid #851825;
            color: #FFC9CD;
            padding: 0.35rem 0.85rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 800;
        }
        .ss-congruence-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        @media (max-width: 720px) {
            .ss-congruence-grid { grid-template-columns: 1fr; }
        }
        .ss-contrast-box {
            border-radius: 14px;
            padding: 1.1rem 1.2rem;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
            background: #4A040B;
        }
        .ss-contrast-box.naerhed { border: 1.5px solid rgba(56, 189, 248, 0.55); }
        .ss-contrast-box.afstand { border: 1.5px solid rgba(251, 146, 60, 0.55); }
        .ss-box-badge { font-size: 0.78rem; font-weight: 900; letter-spacing: 0.04em; }
        .ss-contrast-box.naerhed .ss-box-badge { color: #7dd3fc; }
        .ss-contrast-box.afstand .ss-box-badge { color: #fdba74; }
        .ss-box-sent { font-size: 1.1rem; font-weight: 800; color: #ffffff; line-height: 1.4; }
        .ss-box-verb-highlight { padding: 0.08rem 0.4rem; border-radius: 6px; }
        .ss-contrast-box.naerhed .ss-box-verb-highlight {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
            border-bottom: 2px solid #38bdf8;
        }
        .ss-contrast-box.afstand .ss-box-verb-highlight {
            background: rgba(251, 146, 60, 0.25);
            color: #fb923c;
            border-bottom: 2px solid #fb923c;
        }
        .ss-box-exp { font-size: 0.9rem; color: #FFC9CD; line-height: 1.5; }
        .ss-insp-aha {
            background: #4A040B;
            border: 1px dashed #851825;
            border-radius: 12px;
            padding: 0.85rem 1.15rem;
            font-size: 0.92rem;
            color: #fde68a;
            line-height: 1.5;
        }
        .ss-insp-languages {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 0.6rem;
            background: #4A040B;
            border-radius: 10px;
            padding: 0.75rem 0.95rem;
            font-size: 0.84rem;
            color: #FFC9CD;
            border: 1px solid #851825;
        }
        .ss-quiz-card {
            background: #5C0812;
            border-radius: 20px;
            border: 1.5px solid #851825;
            padding: 1.8rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
            max-width: 780px;
            margin: 0 auto;
        }
        .ss-quiz-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.4rem;
            font-size: 0.86rem;
            color: #FFC9CD;
            font-weight: 700;
        }
        .ss-quiz-question-box {
            font-size: 1.22rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.4rem;
            text-align: center;
            line-height: 1.45;
            background: #4A040B;
            padding: 1.2rem;
            border-radius: 14px;
            border: 1px solid #851825;
        }
        .ss-quiz-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.4rem;
        }
        @media (max-width: 540px) {
            .ss-quiz-options { grid-template-columns: 1fr; }
        }
        .ss-quiz-opt-btn {
            background: #4A040B;
            border: 2px solid #851825;
            border-radius: 14px;
            padding: 1rem 1.2rem;
            font-size: 1.05rem;
            font-weight: 800;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .ss-quiz-opt-btn:hover:not(:disabled) { border-color: #FFC9CD; background: #73101C; }
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
            font-size: 0.94rem;
            margin-bottom: 1.2rem;
            display: none;
            line-height: 1.5;
        }
        .ss-quiz-feedback.show { display: block; }
        .ss-quiz-feedback.correct {
            background: rgba(16, 185, 129, 0.16);
            border: 1px solid rgba(16, 185, 129, 0.45);
            color: #a7f3d0;
        }
        .ss-quiz-feedback.wrong {
            background: rgba(239, 68, 68, 0.16);
            border: 1px solid rgba(239, 68, 68, 0.45);
            color: #fecaca;
        }
        .ss-quiz-next-btn {
            display: none;
            background: #FF4D5E;
            border: none;
            color: #ffffff;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 800;
            cursor: pointer;
            margin: 0 auto;
        }
        /* Bygninger & Institutioner panel */
        .ss-bld-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.15rem;
            margin-bottom: 1.4rem;
        }
        @media (max-width: 780px) {
            .ss-bld-grid { grid-template-columns: 1fr; }
        }
        .ss-bld-card {
            background: #5C0812;
            border: 1.5px solid #851825;
            border-radius: 18px;
            padding: 1.25rem 1.35rem;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
        }
        .ss-bld-card.naerhed { border-color: rgba(56, 189, 248, 0.5); }
        .ss-bld-card.afstand { border-color: rgba(251, 146, 60, 0.5); }
        .ss-bld-title {
            font-size: 1.15rem;
            font-weight: 900;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .ss-bld-pill {
            font-size: 0.74rem;
            font-weight: 900;
            padding: 0.2rem 0.65rem;
            border-radius: 999px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .ss-bld-card.naerhed .ss-bld-pill {
            background: rgba(56, 189, 248, 0.2);
            color: #7dd3fc;
            border: 1px solid rgba(56, 189, 248, 0.45);
        }
        .ss-bld-card.afstand .ss-bld-pill {
            background: rgba(251, 146, 60, 0.2);
            color: #fdba74;
            border: 1px solid rgba(251, 146, 60, 0.45);
        }
        .ss-bld-list {
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
        }
        .ss-bld-item {
            background: #4A040B;
            border: 1px solid #851825;
            border-radius: 12px;
            padding: 0.7rem 0.9rem;
            display: flex;
            flex-direction: column;
            gap: 0.22rem;
        }
        .ss-bld-phrase {
            font-size: 1.02rem;
            font-weight: 800;
            color: #ffffff;
        }
        .ss-bld-note {
            font-size: 0.85rem;
            color: #FFC9CD;
            line-height: 1.45;
        }
        .ss-bld-card.naerhed .ss-bld-prep {
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.22);
            padding: 0.05rem 0.38rem;
            border-radius: 6px;
            border-bottom: 2px solid #38bdf8;
        }
        .ss-bld-card.afstand .ss-bld-prep {
            color: #fb923c;
            background: rgba(251, 146, 60, 0.22);
            padding: 0.05rem 0.38rem;
            border-radius: 6px;
            border-bottom: 2px solid #fb923c;
        }
        .ss-school-contrast {
            background: linear-gradient(135deg, rgba(12, 74, 110, 0.45), rgba(154, 52, 18, 0.4));
            border: 1.5px solid #851825;
            border-radius: 18px;
            padding: 1.25rem 1.4rem;
            margin-bottom: 1.4rem;
        }
        .ss-school-contrast h3 {
            margin: 0 0 0.75rem;
            font-size: 1.15rem;
            font-weight: 900;
            color: #fde68a;
        }
        .ss-school-pair {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.9rem;
        }
        @media (max-width: 720px) {
            .ss-school-pair { grid-template-columns: 1fr; }
        }
    `;
    viewContainer.appendChild(style);

    const topBar = document.createElement('div');
    topBar.className = 'ss-top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'ss-back-btn';
    backBtn.textContent = extraData.from === 'overview'
        ? '← Tilbage til sansningsoversigten'
        : '← Tilbage til hovedflade 2';
    backBtn.onclick = () => navigateFn(extraData.from === 'overview' ? 'grammatik_sansning' : 'sansning_flade2');
    topBar.appendChild(backBtn);

    const stationBadge = document.createElement('span');
    stationBadge.className = 'ss-station-badge';
    stationBadge.textContent = 'Station 2.1 • Præpositioner: i vs. på';
    topBar.appendChild(stationBadge);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Hulen vs. overfladen: i vs. på</h1>
        <p>
            <strong>I</strong> lukker verden inde i hulens og rummets trygge favn (<em>i tasken, i stuen, i Danmark, i supermarkedet</em>),
            mens <strong>på</strong> peger på åbne flader, øer, offentlige institutioner og spisesteder (<em>på bordet, på Fyn, på hospitalet, på restaurant</em>).
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="stage">1. Hulens rum vs. den åbne flade</button>
        <button class="ss-tab-btn" data-tab="buildings">2. Bygninger, institutioner & spisesteder</button>
        <button class="ss-tab-btn" data-tab="quiz">3. Stedsprøven</button>
    `;
    viewContainer.appendChild(tabsNav);

    const panelsContainer = document.createElement('div');
    viewContainer.appendChild(panelsContainer);

    const panelStage = document.createElement('div');
    panelStage.className = 'ss-tab-panel active';
    panelStage.id = 'panel-stage';

    let activePairId = pairs[0].id;
    let pureMode = false;

    const canvasCard = document.createElement('div');
    canvasCard.className = 'contrast-canvas-card';
    canvasCard.innerHTML = `
        <div class="contrast-control-bar">
            <div class="contrast-instruction">
                Klik på en markering i stuen for at mærke forskellen mellem at være omsluttet (i) og ligge på en flade (på).
            </div>
            <button class="pure-toggle-btn" id="btn-pure-mode">Vis rene billeder</button>
        </div>
        <div class="contrast-split-stage" id="split-stage-container">
            <div class="stage-half left-half" id="stage-left">
                <div class="stage-half-header cool">Nærhed: i (omsluttet af rum)</div>
                <img src="${baseUrl}assets/sansning_i_venstre.jpg" alt="Hulens tryghed: nøgler i taske, dreng i hule, kat i kasse, æbler i skål, kopper i skab" />
            </div>
            <div class="stage-half right-half" id="stage-right">
                <div class="stage-half-header warm">Afstand: på (eksponeret på flade)</div>
                <img src="${baseUrl}assets/sansning_paa_hoejre.jpg" alt="Åben overflade: nøgler på bord, dreng på stol, kat på kasse, æbler på tallerken, kopper på hylde" />
            </div>
        </div>
        <div class="ss-hotspots-strip" id="hotspots-strip"></div>
    `;
    panelStage.appendChild(canvasCard);

    const detailCard = document.createElement('div');
    detailCard.className = 'ss-detail-card';
    detailCard.id = 'detail-inspector-card';
    panelStage.appendChild(detailCard);

    function renderStageHotspots() {
        const leftHalf = canvasCard.querySelector('#stage-left');
        const rightHalf = canvasCard.querySelector('#stage-right');
        const strip = canvasCard.querySelector('#hotspots-strip');

        leftHalf.querySelectorAll('.ss-hotspot').forEach(el => el.remove());
        rightHalf.querySelectorAll('.ss-hotspot').forEach(el => el.remove());
        strip.innerHTML = '';

        pairs.forEach(p => {
            const isSel = p.id === activePairId;

            const hLeft = document.createElement('button');
            hLeft.className = `ss-hotspot ${isSel ? 'active' : ''}`;
            hLeft.style.left = `${p.leftPos.x}%`;
            hLeft.style.top = `${p.leftPos.y}%`;
            hLeft.textContent = p.icon;
            hLeft.title = p.leftLabel;
            hLeft.onclick = () => selectPair(p.id);
            leftHalf.appendChild(hLeft);

            const hRight = document.createElement('button');
            hRight.className = `ss-hotspot ${isSel ? 'partner-active' : ''}`;
            hRight.style.left = `${p.rightPos.x}%`;
            hRight.style.top = `${p.rightPos.y}%`;
            hRight.textContent = p.icon;
            hRight.title = p.rightLabel;
            hRight.onclick = () => selectPair(p.id);
            rightHalf.appendChild(hRight);

            const stripBtn = document.createElement('button');
            stripBtn.className = `ss-strip-btn ${isSel ? 'active' : ''}`;
            stripBtn.textContent = p.shortTitle;
            stripBtn.onclick = () => selectPair(p.id);
            strip.appendChild(stripBtn);
        });
    }

    function renderInspector() {
        const p = pairs.find(x => x.id === activePairId) || pairs[0];
        detailCard.innerHTML = `
            <div class="ss-detail-header">
                <span class="ss-main-word">${p.wordTitle}</span>
                <span class="ss-cat-pill">${p.category}</span>
            </div>
            <div class="ss-congruence-grid">
                <div class="ss-contrast-box naerhed">
                    <span class="ss-box-badge">Omsluttet: ${p.leftLabel}</span>
                    <div class="ss-box-sent">${p.leftSent}</div>
                    <div class="ss-box-exp">${p.leftExp}</div>
                </div>
                <div class="ss-contrast-box afstand">
                    <span class="ss-box-badge">Overflade: ${p.rightLabel}</span>
                    <div class="ss-box-sent">${p.rightSent}</div>
                    <div class="ss-box-exp">${p.rightExp}</div>
                </div>
            </div>
            <div class="ss-insp-aha">
                <strong>Aha-indsigt:</strong> ${p.aha}
            </div>
            <div class="ss-insp-languages">
                <div><strong>Engelsk:</strong> ${p.langs.en}</div>
                <div><strong>Tysk:</strong> ${p.langs.de}</div>
                <div><strong>Spansk:</strong> ${p.langs.es}</div>
                <div><strong>Arabisk:</strong> ${p.langs.ar}</div>
            </div>
        `;
    }

    function selectPair(id) {
        activePairId = id;
        renderStageHotspots();
        renderInspector();
    }

    canvasCard.querySelector('#btn-pure-mode').onclick = (e) => {
        pureMode = !pureMode;
        const stage = canvasCard.querySelector('#split-stage-container');
        stage.classList.toggle('pure-mode', pureMode);
        e.target.classList.toggle('active', pureMode);
        e.target.textContent = pureMode ? 'Vis markeringer igen' : 'Vis rene billeder';
    };

    renderStageHotspots();
    renderInspector();
    panelsContainer.appendChild(panelStage);

    const panelBuildings = document.createElement('div');
    panelBuildings.className = 'ss-tab-panel';
    panelBuildings.id = 'panel-buildings';
    panelBuildings.innerHTML = `
        <div class="ss-detail-card" style="margin-bottom: 1.4rem;">
            <div class="ss-detail-header">
                <span class="ss-main-word">Bygninger i dansk: Omsluttet hule (i) vs. Institution & spisested (på)</span>
                <span class="ss-cat-pill">Hverdagsrum vs. samfundets adresser</span>
            </div>
            <p style="margin:0; color:#FFC9CD; font-size:0.95rem; line-height:1.55;">
                Selvom man fysisk går ind ad en dør til alle disse bygninger, skelner dansk skarpt mellem <strong>at træde ind i et omsluttet hverdagsrum (i)</strong>
                og <strong>at opsøge en offentlig institution, et præcist egennavn eller et spisested (på)</strong>.
            </p>
        </div>

        <div class="ss-school-contrast">
            <h3>🎯 Skole-eksemplet: Generel ramme vs. præcis navngiven skole</h3>
            <div class="ss-school-pair">
                <div class="ss-contrast-box naerhed">
                    <span class="ss-box-badge">Generel ramme (uden navn) ➔ I</span>
                    <div class="ss-box-sent">Han går <span class="ss-box-verb-highlight">i</span> skole.</div>
                    <div class="ss-box-exp">
                        Når du taler om selve det at være elev eller befinde sig inde i skolens hverdag uden at nævne et bestemt navn, er skolen et omsluttende rum: <strong>i skole</strong> (ligesom <em>i børnehave</em> og <em>i vuggestue</em>).
                    </div>
                </div>
                <div class="ss-contrast-box afstand">
                    <span class="ss-box-badge">Præcis navngiven skole / højere trin ➔ PÅ</span>
                    <div class="ss-box-sent">Han går <span class="ss-box-verb-highlight">på</span> Vesterbroskole.</div>
                    <div class="ss-box-exp">
                        Så snart du peger præcist på <strong>skolens navn</strong> (<em>på Vesterbroskole</em>) eller et videregående trin (<em>på gymnasiet, på efterskole, på universitetet</em>), bruger dansk altid <strong>på</strong>!
                    </div>
                </div>
            </div>
        </div>

        <div class="ss-bld-grid">
            <div class="ss-bld-card naerhed">
                <div class="ss-bld-title">
                    <span>🏠 Omsluttede bygninger & hverdagsrum</span>
                    <span class="ss-bld-pill">Bruger I</span>
                </div>
                <div class="ss-bld-list">
                    <div class="ss-bld-item">
                        <div class="ss-bld-phrase">går <span class="ss-bld-prep">i</span> supermarkedet</div>
                        <div class="ss-bld-note">Butikker og indkøbsrum sanses som lukkede rum fulde af hylder omkring dig (også <em>i Netto, i bageren, i tøjbutikken</em>).</div>
                    </div>
                    <div class="ss-bld-item">
                        <div class="ss-bld-phrase">går <span class="ss-bld-prep">i</span> biograf(en)</div>
                        <div class="ss-bld-note">Oplevelsesrum med vægge og mørke omkring tilskueren: <em>går i biograf, i teatret, i svømmehallen, i fitnesscenteret</em>.</div>
                    </div>
                    <div class="ss-bld-item">
                        <div class="ss-bld-phrase">går <span class="ss-bld-prep">i</span> skole</div>
                        <div class="ss-bld-note">Den generelle daglige ramme uden navn (også <em>går i børnehave, i kirke, i banken</em>).</div>
                    </div>
                </div>
            </div>

            <div class="ss-bld-card afstand">
                <div class="ss-bld-title">
                    <span>🏛️ Offentlige institutioner & navngivne steder</span>
                    <span class="ss-bld-pill">Bruger PÅ</span>
                </div>
                <div class="ss-bld-list">
                    <div class="ss-bld-item">
                        <div class="ss-bld-phrase">går <span class="ss-bld-prep">på</span> Vesterbroskole &bull; går <span class="ss-bld-prep">på</span> universitetet</div>
                        <div class="ss-bld-note">Præcise navngivne skoler og videregående uddannelser ses som institutioner på samfundets kort: <em>på Vesterbroskole, på gymnasiet, på universitetet</em>.</div>
                    </div>
                    <div class="ss-bld-item">
                        <div class="ss-bld-phrase">går <span class="ss-bld-prep">på</span> biblioteket &bull; tager <span class="ss-bld-prep">på</span> hospitalet</div>
                        <div class="ss-bld-note">Offentlige bygninger og samfundsfunktioner bruger fast <strong>på</strong>: <em>på biblioteket, på hospitalet, på rådhuset, på politistationen, på apoteket, på posthuset</em>.</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ss-bld-card afstand" style="margin-bottom: 1.4rem;">
            <div class="ss-bld-title">
                <span>🍽️ Alle steder hvor man spiser og drikker</span>
                <span class="ss-bld-pill">Altid PÅ</span>
            </div>
            <div class="ss-bld-list" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.7rem;">
                <div class="ss-bld-item">
                    <div class="ss-bld-phrase">går <span class="ss-bld-prep">på</span> restaurant</div>
                    <div class="ss-bld-note">Man tager ud til en serveringsflade og sidder ved et dækket bord.</div>
                </div>
                <div class="ss-bld-item">
                    <div class="ss-bld-phrase">går <span class="ss-bld-prep">på</span> café / <span class="ss-bld-prep">på</span> pizzeria</div>
                    <div class="ss-bld-note">Gælder alle spisesteder og udskænkningssteder: <em>på café, på kro, på burgerbar, på bodega</em>.</div>
                </div>
                <div class="ss-bld-item">
                    <div class="ss-bld-phrase">spiser <span class="ss-bld-prep">på</span> McDonald's / <span class="ss-bld-prep">på</span> hotel</div>
                    <div class="ss-bld-note">Også konkrete restaurantnavne og hoteller følger spisested-reglen med <strong>på</strong>.</div>
                </div>
            </div>
        </div>

        <div class="ss-insp-aha">
            <strong>Huskeregel til bygninger:</strong> Hverdagens indkøb og oplevelsesrum føles som huler du træder ind <strong>i</strong> (<em>i supermarkedet, i biograf, i skole</em>).
            Men så snart det er en <strong>offentlig institution</strong> (<em>på biblioteket, på hospitalet, på universitetet</em>), en <strong>præcis navngiven skole</strong> (<em>på Vesterbroskole</em>) eller et <strong>sted man spiser</strong> (<em>på restaurant, på café</em>), skifter kameraet til <strong>på</strong>!
        </div>
    `;
    panelsContainer.appendChild(panelBuildings);

    const panelQuiz = document.createElement('div');
    panelQuiz.className = 'ss-tab-panel';
    panelQuiz.id = 'panel-quiz';

    let currentQuestionIdx = 0;
    let quizScore = 0;

    function renderQuizTrack() {
        if (currentQuestionIdx >= quizQuestions.length) {
            panelQuiz.innerHTML = `
                <div class="ss-quiz-card" style="text-align: center;">
                    <h2 style="font-size: 1.75rem; margin: 0.4rem 0 0.9rem; color: #fde68a;">
                        Stedsprøven gennemført!
                    </h2>
                    <p style="font-size: 1.08rem; color: #FFC9CD; margin-bottom: 1.5rem;">
                        Du fik <strong>${quizScore} af ${quizQuestions.length}</strong> rigtige.
                    </p>
                    <button class="ss-back-btn" id="btn-restart-quiz" style="margin: 0 auto; background: #FF4D5E; border-color: #FF4D5E;">
                        Tag prøven igen
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

        const q = quizQuestions[currentQuestionIdx];
        panelQuiz.innerHTML = `
            <div class="ss-quiz-card">
                <div class="ss-quiz-progress">
                    <span>Opgave ${currentQuestionIdx + 1} af ${quizQuestions.length}</span>
                    <span>Score: ${quizScore} rigtige</span>
                </div>
                <div class="ss-quiz-question-box">${q.prompt}</div>
                <div class="ss-quiz-options">
                    ${q.options.map(opt => `<button class="ss-quiz-opt-btn" data-val="${opt}">${opt}</button>`).join('')}
                </div>
                <div class="ss-quiz-feedback" id="quiz-feedback"></div>
                <button class="ss-quiz-next-btn" id="quiz-next-btn">Næste opgave →</button>
            </div>
        `;

        const feedbackBox = panelQuiz.querySelector('#quiz-feedback');
        const nextBtn = panelQuiz.querySelector('#quiz-next-btn');

        panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(btn => {
            btn.onclick = () => {
                panelQuiz.querySelectorAll('.ss-quiz-opt-btn').forEach(b => { b.disabled = true; });
                const isCorrect = btn.getAttribute('data-val') === q.correct;
                if (isCorrect) {
                    quizScore++;
                    btn.classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show correct';
                    feedbackBox.innerHTML = `<strong>Rigtigt!</strong> ${q.expl}`;
                } else {
                    btn.classList.add('wrong');
                    const rightBtn = panelQuiz.querySelector(`[data-val="${q.correct}"]`);
                    if (rightBtn) rightBtn.classList.add('correct');
                    feedbackBox.className = 'ss-quiz-feedback show wrong';
                    feedbackBox.innerHTML = `<strong>Se på formen af rummet:</strong> Det rigtige svar er <em>"${q.correct}"</em>. ${q.expl}`;
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

    tabsNav.querySelectorAll('.ss-tab-btn').forEach(btn => {
        btn.onclick = () => {
            tabsNav.querySelectorAll('.ss-tab-btn').forEach(b => b.classList.remove('active'));
            panelsContainer.querySelectorAll('.ss-tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = `panel-${btn.getAttribute('data-tab')}`;
            panelsContainer.querySelector(`#${targetId}`).classList.add('active');
        };
    });

    container.appendChild(viewContainer);
}
