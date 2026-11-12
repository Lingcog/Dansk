import { baseUrl } from '../utils/config.js';

/**
 * Station 2.2: Pronominal deiksis – denne (i hånden) vs. den (på afstand)
 * Hovedflade 2: Rum, tid og relationer (Nærhed vs. Afstand)
 */
export function renderSansningDenneDenView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    const pairs = [
        {
            id: 'bog',
            icon: '📘',
            shortTitle: 'Denne bog vs. den bil',
            wordTitle: 'Denne / den (fælleskøn)',
            category: 'Fælleskøn (n-ord)',
            leftLabel: 'I hånden: denne bog',
            rightLabel: 'På afstand: den bil',
            leftPos: { x: 27, y: 42 },
            rightPos: { x: 82, y: 40 },
            leftSent: 'Jeg holder <span class="ss-box-verb-highlight">denne</span> bog i mine hænder.',
            rightSent: 'Se på <span class="ss-box-verb-highlight">den</span> røde bil derovre.',
            leftExp: 'Bogen rører ved din krop. Når tingen er inden for din rækkevidde, bruger dansk <strong>denne</strong>.',
            rightExp: 'Bilen står ude på gaden uden for rækkevidde. Så strækker dansk pegefingeren med <strong>den</strong>.',
            aha: 'På dansk er <strong>denne</strong> altid gribekroppens ord (her), mens <strong>den</strong> er kikkertens og pegefingerens ord (der).',
            langs: {
                en: 'this book vs. that car',
                de: 'dieses Buch vs. jenes Auto / das Auto dort',
                ar: 'هذا الكتاب (قريب) مقابل تلك السيارة (بعيد)',
                es: 'este libro vs. ese/aquel coche'
            }
        },
        {
            id: 'aeble',
            icon: '🍎',
            shortTitle: 'Dette æble vs. det hus',
            wordTitle: 'Dette / det (intetkøn)',
            category: 'Intetkøn (t-ord)',
            leftLabel: 'I hånden: dette æble',
            rightLabel: 'På afstand: det hus',
            leftPos: { x: 71, y: 54 },
            rightPos: { x: 77, y: 24 },
            leftSent: 'Pigen holder <span class="ss-box-verb-highlight">dette</span> røde æble i hånden.',
            rightSent: 'Kvinden peger på <span class="ss-box-verb-highlight">det</span> gule hus derovre.',
            leftExp: 'Æblet hviler direkte i pigens håndflade. Intetkøn i nærhed bliver til <strong>dette</strong>.',
            rightExp: 'Huset ligger langt væk på den anden side af gaden. Intetkøn på afstand bliver til <strong>det</strong>.',
            aha: 'Husk t-reglen i nærhed: et hus → <strong>dette</strong> hus (lige her) / <strong>det</strong> hus (derhenne).',
            langs: {
                en: 'this apple vs. that house',
                de: 'dieser Apfel vs. jenes Haus',
                ar: 'هذه التفاحة مقابل ذلك البيت',
                es: 'esta manzana vs. aquella casa'
            }
        },
        {
            id: 'ark',
            icon: '📄',
            shortTitle: 'Dette ark vs. det bord',
            wordTitle: 'Dette / det (berøring vs. afstand)',
            category: 'Intetkøn (berøring vs. afstand)',
            leftLabel: 'Under hænderne: dette ark',
            rightLabel: 'Længere væk: det æble og den bog',
            leftPos: { x: 56, y: 57 },
            rightPos: { x: 64, y: 53 },
            leftSent: 'Hun har hænderne direkte på <span class="ss-box-verb-highlight">dette</span> ark papir.',
            rightSent: 'Hun har sluppet <span class="ss-box-verb-highlight">den</span> bog og <span class="ss-box-verb-highlight">det</span> æble på bordet.',
            leftExp: 'Så længe hænderne rører ved papiret foran hende, er det stadig <strong>dette</strong> ark.',
            rightExp: 'Så snart hænderne trækkes tilbage og peger på afstand, skifter kameraet til <strong>den</strong> og <strong>det</strong>.',
            aha: 'Grænsen mellem <strong>dette</strong> og <strong>det</strong> går lige ved spidsen af dine fingre.',
            langs: {
                en: 'this sheet vs. that book and that apple',
                de: 'dieses Blatt vs. jenes Buch und jener Apfel',
                ar: 'هذه الورقة تحت اليد مقابل ذلك الكتاب',
                es: 'esta hoja vs. aquel libro'
            }
        },
        {
            id: 'kop',
            icon: '☕',
            shortTitle: 'Denne kop vs. den kop',
            wordTitle: 'Denne / den (førstepersons-blik)',
            category: 'Fælleskøn (jeg-perspektiv)',
            leftLabel: 'Mellem hænderne: denne kop',
            rightLabel: 'På bordkanten: den kop',
            leftPos: { x: 21, y: 78 },
            rightPos: { x: 9, y: 74 },
            leftSent: 'Jeg holder om <span class="ss-box-verb-highlight">denne</span> varme kop.',
            rightSent: 'Jeg peger over på <span class="ss-box-verb-highlight">den</span> kop derhenne.',
            leftExp: 'Begge hænder slutter sig om kruset. Varmen og kontakten giver naturligt ordet <strong>denne</strong>.',
            rightExp: 'Hånden peger med strakt finger hen mod kruset på bordet: afstanden kalder på <strong>den</strong>.',
            aha: 'Efter <strong>denne / dette / disse</strong> står navneordet altid i ubestemt form (<em>denne kop</em>, aldrig <em>*denne koppen</em>).',
            langs: {
                en: 'this mug in my hands vs. that mug over there',
                de: 'diese Tasse vs. jene Tasse dort',
                ar: 'هذا الكوب في يدي مقابل ذلك الكوب هناك',
                es: 'esta taza vs. esa taza'
            }
        },
        {
            id: 'tulipaner',
            icon: '🌷',
            shortTitle: 'Disse tulipaner vs. de blomster',
            wordTitle: 'Disse / de (flertal)',
            category: 'Flertal',
            leftLabel: 'I hænderne: disse tulipaner',
            rightLabel: 'I vindueskarmen: de tulipaner',
            leftPos: { x: 85, y: 74 },
            rightPos: { x: 85, y: 48 },
            leftSent: 'Jeg har <span class="ss-box-verb-highlight">disse</span> gule tulipaner i hånden.',
            rightSent: 'Pigen peger hen mod <span class="ss-box-verb-highlight">de</span> gule tulipaner i karmen.',
            leftExp: 'Flere ting tæt i favnen eller hånden hedder altid <strong>disse</strong> på dansk.',
            rightExp: 'Flere ting længere væk, som man peger over mod, hedder altid <strong>de</strong>.',
            aha: 'I talt dansk forstærkes forskellen ofte med små stedsord: <strong>denne her</strong> (tæt) vs. <strong>den der</strong> (fjernt).',
            langs: {
                en: 'these tulips vs. those flowers',
                de: 'diese Tulpen vs. jene Blumen dort',
                ar: 'هذه الأزهار مقابل تلك الأزهار هناك',
                es: 'estos tulipanes vs. aquellas flores'
            }
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Du holder en ny billet lige mellem tommel- og pegefinger og siger: "... billet gælder i dag."',
            options: ['Denne', 'Den'],
            correct: 'Denne',
            expl: 'Billetten er fysisk i din hånd (gribekroppen), så kameraet står i nærhed: "Denne billet".'
        },
        {
            prompt: 'I står på perronen og kigger over på et tog på spor 4: "Skal vi nå ... tog derovre?"',
            options: ['dette', 'det'],
            correct: 'det',
            expl: 'Toget (intetkøn) holder langt væk på afstand. Derfor bruger dansk "det tog".'
        },
        {
            prompt: 'Du rækker en skål med friske bær frem mod din ven: "Smag lige på ... bær!"',
            options: ['disse', 'de'],
            correct: 'disse',
            expl: 'Bærrene (flertal) står lige i din hånd mellem jer i den nære zone, så det er "disse bær".'
        },
        {
            prompt: 'Hvilken form er grammatisk rigtig på dansk?',
            options: ['denne opgave', 'denne opgaven'],
            correct: 'denne opgave',
            expl: 'Efter påpegende stedord (denne, dette, disse, den, det, de) står navneordet altid i ubestemt form uden endelse.'
        },
        {
            prompt: 'Du peger op på et skilt højt oppe på den modsatte husmur: "Kan du læse ... skilt deroppe?"',
            options: ['dette', 'det'],
            correct: 'det',
            expl: 'Skiltet hænger på afstand uden for gribekroppens rækkevidde, så man peger med "det skilt".'
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
        .ss-tab-btn:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.08);
        }
        .ss-tab-btn.active {
            background: #FF4D5E;
            color: #ffffff;
        }
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
        .contrast-instruction {
            color: #FFC9CD;
            font-size: 0.88rem;
        }
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
        .pure-toggle-btn.active {
            background: #FF4D5E;
            border-color: #FF4D5E;
            color: #ffffff;
        }
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
        .stage-half img {
            width: 100%;
            height: auto;
            display: block;
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
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.55);
            transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 5;
        }
        .stage-half.left-half .ss-hotspot { background: #0284c7; }
        .stage-half.right-half .ss-hotspot { background: #ea580c; }
        .ss-hotspot:hover {
            transform: translate(-50%, -50%) scale(1.22);
            z-index: 8;
        }
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
        .ss-strip-btn.active {
            background: #FF4D5E;
            border-color: #FF4D5E;
            color: #ffffff;
        }
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
        .ss-main-word {
            font-size: 1.45rem;
            font-weight: 900;
            color: #ffffff;
        }
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
        .ss-box-badge {
            font-size: 0.78rem;
            font-weight: 900;
            letter-spacing: 0.04em;
        }
        .ss-contrast-box.naerhed .ss-box-badge { color: #7dd3fc; }
        .ss-contrast-box.afstand .ss-box-badge { color: #fdba74; }
        .ss-box-sent {
            font-size: 1.1rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.4;
        }
        .ss-box-verb-highlight {
            padding: 0.08rem 0.4rem;
            border-radius: 6px;
        }
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
        .ss-box-exp {
            font-size: 0.9rem;
            color: #FFC9CD;
            line-height: 1.5;
        }
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
        .ss-quiz-opt-btn:hover:not(:disabled) {
            border-color: #FFC9CD;
            background: #73101C;
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
    stationBadge.textContent = 'Station 2.2 • Pronominal deiksis';
    topBar.appendChild(stationBadge);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Pronominal deiksis: denne (her) vs. den (der)</h1>
        <p>
            Står kameraet ved gribekroppen, hvor du holder eller rører ved tingen (<strong>denne / dette / disse</strong>),
            eller peger du ud over afstand med strakt finger (<strong>den / det / de</strong>)?
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="stage">1. Gribekroppen vs. pegefingeren</button>
        <button class="ss-tab-btn" data-tab="quiz">2. Afstandsprøven</button>
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
                Klik på en markering for at se skiftet mellem berøring og pegen på afstand.
            </div>
            <button class="pure-toggle-btn" id="btn-pure-mode">Vis rene billeder</button>
        </div>
        <div class="contrast-split-stage" id="split-stage-container">
            <div class="stage-half left-half" id="stage-left">
                <div class="stage-half-header cool">Nærhed: denne / dette / disse (her)</div>
                <img src="${baseUrl}assets/sansning_denne_venstre.jpg" alt="Gribekroppen: ting holdt direkte i hånden" />
            </div>
            <div class="stage-half right-half" id="stage-right">
                <div class="stage-half-header warm">Afstand: den / det / de (derovre)</div>
                <img src="${baseUrl}assets/sansning_den_hoejre.jpg" alt="Pegefingeren: pegen mod ting på afstand" />
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
                    <span class="ss-box-badge">Gribekroppen (i hånden): ${p.leftLabel}</span>
                    <div class="ss-box-sent">${p.leftSent}</div>
                    <div class="ss-box-exp">${p.leftExp}</div>
                </div>
                <div class="ss-contrast-box afstand">
                    <span class="ss-box-badge">Pegefingeren (på afstand): ${p.rightLabel}</span>
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
                        Afstandsprøven gennemført!
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
                    feedbackBox.innerHTML = `<strong>Se efter kameraets placering:</strong> Det rigtige svar er <em>"${q.correct}"</em>. ${q.expl}`;
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
