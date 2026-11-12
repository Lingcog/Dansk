import { baseUrl } from '../utils/config.js';

/**
 * Station 2.5: Kroppens sfære – sin vs. hans samt fordelingsental
 * Hovedflade 2: Rum, tid og relationer (Nærhed vs. Afstand)
 */
export function renderSansningSinHansView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container sansning-station-view';

    const pairs = [
        {
            id: 'kone',
            icon: '💏',
            shortTitle: 'Sin kone vs. hans kone',
            wordTitle: 'Sin / hans (fælleskøn)',
            category: 'Kroppens intime sfære',
            leftLabel: 'Egen sfære: sin kone',
            rightLabel: 'Udenforstående: hans kone',
            leftPos: { x: 19, y: 76 },
            rightPos: { x: 21, y: 78 },
            leftSent: 'Manden kysser <span class="ss-box-verb-highlight">sin</span> kone.',
            rightSent: 'Manden kysser <span class="ss-box-verb-highlight">hans</span> kone.',
            leftExp: 'Den blonde kvinde i rød trøje tilhører subjektets egen nære sfære. På dansk peger <strong>sin</strong> tilbage på sætningens handlingssubjekt.',
            rightExp: 'Nu kysser han den mørkhårede kvinde i grøn trøje, mens naboen står chokeret lige ved siden af! <strong>Hans</strong> fortæller øjeblikkeligt, at det er en anden mands kone.',
            aha: 'Et eneste bogstav forandrer hele dramaet: <strong>sin</strong> binder sammen inden for samme person; <strong>hans</strong> skaber afstand til en anden.',
            langs: {
                en: 'his (own) wife vs. his (another man’s) wife',
                de: 'seine (eigene) Frau vs. die Frau eines anderen Mannes',
                ar: 'زوجته هو مقابل زوجة رجل آخر',
                es: 'su (propia) esposa vs. la esposa de él (otro)'
            }
        },
        {
            id: 'bil',
            icon: '🚗',
            shortTitle: 'Sin bil vs. hans bil',
            wordTitle: 'Sin / hans (ejerskab)',
            category: 'Fælleskøn (ejerskab)',
            leftLabel: 'Egen bil: sin bil',
            rightLabel: 'Naboens bil: hans bil',
            leftPos: { x: 34, y: 43 },
            rightPos: { x: 36, y: 42 },
            leftSent: 'Han vasker <span class="ss-box-verb-highlight">sin</span> røde bil.',
            rightSent: 'Han vasker <span class="ss-box-verb-highlight">hans</span> grønne bil.',
            leftExp: 'Manden vasker den bil, han selv ejer. Subjektet i sætningen er lig med ejeren, så dansk vælger <strong>sin</strong>.',
            rightExp: 'Naboen står i baggrunden med nøglerne til sin grønne bil. Ejeren er en person uden for subjektet, så vi bruger <strong>hans</strong>.',
            aha: 'Spørg altid: "Ejer sætningens hovedperson (jeg/du/han/hun) det?" Hvis svaret er ja om ham eller hende i ental, skal du bruge <strong>sin / sit / sine</strong>.',
            langs: {
                en: 'his own car vs. his neighbor’s car',
                de: 'sein eigenes Auto vs. dessen Auto',
                ar: 'سيارته مقابل سيارة جاره',
                es: 'su propio coche vs. el coche de aquel hombre'
            }
        },
        {
            id: 'hund',
            icon: '🐕',
            shortTitle: 'Sin hund vs. hendes hund',
            wordTitle: 'Sin / hendes (omsorg)',
            category: 'Fælleskøn (hun-ejer)',
            leftLabel: 'Egen hund: sin hund',
            rightLabel: 'Naboens hund: hendes hund',
            leftPos: { x: 61, y: 58 },
            rightPos: { x: 62, y: 60 },
            leftSent: 'Hun går tur med <span class="ss-box-verb-highlight">sin</span> hund.',
            rightSent: 'Hun går tur med <span class="ss-box-verb-highlight">hendes</span> hund.',
            leftExp: 'Det er kvindens egen hund i snoren. <strong>Sin</strong> fungerer både for "han" og for "hun".',
            rightExp: 'Den ældre dame i baggrunden sidder med gips på benet og ejer hunden. Så går nabokvinden tur med <strong>hendes</strong> hund.',
            aha: '<strong>Sin</strong> skelner ikke mellem mænd og kvinder, men kun mellem "inden for subjektets zone" vs. "uden for zonen (hans/hendes)".',
            langs: {
                en: 'her own dog vs. her (another woman’s) dog',
                de: 'ihren eigenen Hund vs. den Hund der Nachbarin',
                ar: 'كلبها مقابل كلب امرأة أخرى',
                es: 'su propio perro vs. el perro de ella (otra mujer)'
            }
        },
        {
            id: 'taske',
            icon: '🎒',
            shortTitle: 'Sin taske vs. hans taske',
            wordTitle: 'Sin / hans (skolevej)',
            category: 'Fælleskøn (hjælp på vejen)',
            leftLabel: 'Egen skoletaske: sin taske',
            rightLabel: 'Vennens skoletaske: hans taske',
            leftPos: { x: 82, y: 66 },
            rightPos: { x: 82, y: 75 },
            leftSent: 'Drengen bærer <span class="ss-box-verb-highlight">sin</span> grønne taske.',
            rightSent: 'Drengen bærer <span class="ss-box-verb-highlight">hans</span> blå taske.',
            leftExp: 'Han går alene til skole med rygsækken spændt på ryggen: hans egen opgave og <strong>sin</strong> taske.',
            rightExp: 'Vennen går med krykker ved siden af, så drengen bærer vennens taske i hånden: det er <strong>hans</strong> taske.',
            aha: 'Flertal har aldrig <em>sin</em> på rigsdansk! Når to eller flere ejer noget sammen, bruges altid <strong>deres</strong> (f.eks. <em>Drengene tager deres tasker</em>).',
            langs: {
                en: 'his own backpack vs. his friend’s backpack',
                de: 'seinen eigenen Rucksack vs. den Rucksack seines Freundes',
                ar: 'حقيبته مقابل حقيبة صديقه',
                es: 'su propia mochila vs. la mochila de su amigo'
            }
        },
        {
            id: 'haanden',
            icon: '✋',
            shortTitle: 'Rakte hånden op (fordelingsental)',
            wordTitle: 'Fordelingsental vs. flertal',
            category: 'Kroppens ental i gruppen',
            leftLabel: 'Fordelingsental: hånden',
            rightLabel: 'Flertals-ejerskab: deres bøger',
            leftPos: { x: 85, y: 29 },
            rightPos: { x: 86, y: 31 },
            leftSent: 'Eleverne rakte <span class="ss-box-verb-highlight">hånden</span> op.',
            rightSent: 'Eleverne åbner <span class="ss-box-verb-highlight">deres</span> bøger.',
            leftExp: 'Selvom der er tre elever, rækker hver elev én hånd op af sin egen krop. Derfor siger dansk i bestemt ental: <strong>hånden</strong> (ikke <em>*hænderne</em>).',
            rightExp: 'Bøgerne på bordet ligger som en fælles mængde genstande ude foran eleverne, og flertals-subjektet giver <strong>deres</strong> bøger.',
            aha: 'Når en gruppe mennesker gør noget med deres egen krop én ad gangen (<em>De tog hatten af</em>, <em>De vaskede hænder / hånden</em>, <em>De mistede livet</em>), står kropsdelen og tingen i dansk ofte i ental: <strong>fordelingsental</strong>.',
            langs: {
                en: 'The students raised their hands (Danish uses singular "the hand")',
                de: 'Die Schüler hoben die Hand (Distributiver Singular)',
                ar: 'رفع الطلاب أيديهم (الدنماركية تستخدم المفرد لكل شخص)',
                es: 'Los alumnos levantaron la mano (singular distributivo)'
            }
        }
    ];

    const quizQuestions = [
        {
            prompt: 'Jonas passer på familiens gamle hus. Jonas maler ... eget hus i weekenden.',
            options: ['sit', 'hans'],
            correct: 'sit',
            expl: 'Jonas er subjektet og ejer selv huset (et hus = intetkøn). Derfor bruges det refleksive "sit".'
        },
        {
            prompt: 'Mads besøger sin syge bror Emil og vasker op i køkkenet. Mads vasker ... tallerkener.',
            options: ['sine', 'hans'],
            correct: 'hans',
            expl: 'Tallerkenerne tilhører broren Emil, ikke subjektet Mads selv. Derfor skal der stå "hans".'
        },
        {
            prompt: 'Alle i klassen var enige med læreren og ... (fordelingsental)',
            options: ['nikkede med hovedet', 'nikkede med hovederne'],
            correct: 'nikkede med hovedet',
            expl: 'Hver person har ét hoved. Dansk bruger fordelingsental ved kropsdele i en gruppe: "nikkede med hovedet".'
        },
        {
            prompt: 'Maria og Sofie glæder sig til ferien. De pakker ... kufferter.',
            options: ['sine', 'deres'],
            correct: 'deres',
            expl: 'Når subjektet er i flertal ("De", to personer), bruges altid "deres" — aldrig "sin/sit/sine".'
        },
        {
            prompt: 'Klara elsker at fotografere naturen. Hun tager altid ... kamera med i skoven.',
            options: ['sit', 'hendes'],
            correct: 'sit',
            expl: 'Kameraet tilhører Klara selv, som er sætningens subjekt. Intetkøn (et kamera) giver "sit".'
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
    stationBadge.textContent = 'Station 2.5 • Kroppens sfære';
    topBar.appendChild(stationBadge);
    viewContainer.appendChild(topBar);

    const hero = document.createElement('div');
    hero.className = 'ss-hero';
    hero.innerHTML = `
        <h1>Kroppens sfære: sin vs. hans og fordelingsental</h1>
        <p>
            På dansk mærker du straks forskel på, om noget hører hjemme i subjektets egen kropslige og nære zone
            (<strong>sin / sit / sine</strong>), eller om det tilhører en anden person uden for zonen (<strong>hans / hendes / deres</strong>).
        </p>
    `;
    viewContainer.appendChild(hero);

    const tabsNav = document.createElement('div');
    tabsNav.className = 'ss-tabs-nav';
    tabsNav.innerHTML = `
        <button class="ss-tab-btn active" data-tab="stage">1. Egen sfære vs. udenforstående</button>
        <button class="ss-tab-btn" data-tab="quiz">2. Sfæreprøven</button>
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
                Klik på en markering på gaden for at se hvem ejeren er i de to verdener.
            </div>
            <button class="pure-toggle-btn" id="btn-pure-mode">Vis rene billeder</button>
        </div>
        <div class="contrast-split-stage" id="split-stage-container">
            <div class="stage-half left-half" id="stage-left">
                <div class="stage-half-header cool">Nærhed: sin / sit / sine (egen sfære)</div>
                <img src="${baseUrl}assets/sansning_sin_venstre.jpg" alt="Kroppens sfære: subjektet handler med sin egen ting eller person" />
            </div>
            <div class="stage-half right-half" id="stage-right">
                <div class="stage-half-header warm">Afstand: hans / hendes / deres (anden ejer)</div>
                <img src="${baseUrl}assets/sansning_hans_hoejre.jpg" alt="Udenforstående ejer: subjektet handler med en andens ting eller kone" />
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
                    <span class="ss-box-badge">Inden for sfæren: ${p.leftLabel}</span>
                    <div class="ss-box-sent">${p.leftSent}</div>
                    <div class="ss-box-exp">${p.leftExp}</div>
                </div>
                <div class="ss-contrast-box afstand">
                    <span class="ss-box-badge">Uden for sfæren: ${p.rightLabel}</span>
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
                        Sfæreprøven gennemført!
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
                    feedbackBox.innerHTML = `<strong>Mærk ejerskabet:</strong> Det rigtige svar er <em>"${q.correct}"</em>. ${q.expl}`;
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
