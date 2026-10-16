import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

/**
 * WordLearningView with a selection state.
 */
export function renderWordLearningView(container, navigateFn) {
  let currentState = 'selection'; // 'selection', 'exercise_semantic', or 'exercise_naboord'

  function render() {
    container.innerHTML = '';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container word-learning-container';

    // Top bar with Back Button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => {
      if (currentState.startsWith('exercise')) {
        currentState = 'selection';
        render();
      } else {
        navigateFn('main');
      }
    };
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Common Styles
    const style = document.createElement('style');
    style.textContent = `
      .word-learning-container h1 { margin-bottom: 1.5rem; text-align: center; }
      
      /* Byggeplads Card */
      .byggeplads-card {
        background: rgba(15, 23, 42, 0.75);
        border: 1.5px solid rgba(255, 255, 255, 0.15);
        border-radius: 20px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        backdrop-filter: blur(12px);
      }
      .byggeplads-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.2rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .byggeplads-title {
        font-size: 1.3rem;
        font-weight: 800;
        color: #f8fafc;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .byggeplads-subtitle {
        font-size: 0.85rem;
        color: #94a3b8;
        margin-top: 0.2rem;
      }
      .sentence-flow-box {
        position: relative;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.5rem 1rem 1rem;
      }
      .svg-curve-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
      .pulsing-curve {
        stroke-dasharray: 6;
        animation: pulseDash 25s linear infinite;
      }
      @keyframes pulseDash {
        to { stroke-dashoffset: -1000; }
      }
      .chips-row {
        position: relative;
        z-index: 2;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1.2rem;
      }
      .flow-chip {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem 1.1rem;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.25s ease;
        user-select: none;
        border-width: 2px;
        border-style: solid;
        background: rgba(15, 23, 42, 0.8);
      }
      .flow-chip:hover {
        transform: translateY(-2px) scale(1.03);
      }
      .flow-chip.active-adj {
        border-color: #f97316;
        color: #fb923c;
        box-shadow: 0 0 16px rgba(249, 115, 22, 0.5);
      }
      .flow-chip.active-sub {
        border-color: #22c55e;
        color: #4ade80;
        box-shadow: 0 0 16px rgba(34, 197, 94, 0.5);
      }
      .flow-chip.active-vrb {
        border-color: #ef4444;
        color: #f87171;
        box-shadow: 0 0 16px rgba(239, 68, 68, 0.5);
      }
      .flow-chip.active-adv {
        border-color: #38bdf8;
        color: #38bdf8;
        box-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
      }
      .flow-chip.active-konj {
        border-color: #a855f7;
        color: #c084fc;
        box-shadow: 0 0 16px rgba(168, 85, 247, 0.5);
      }
      .flow-explanation {
        position: relative;
        z-index: 2;
        background: rgba(30, 41, 59, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 0.8rem 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .explanation-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
      }
      .explanation-badge {
        font-size: 0.75rem;
        font-weight: 800;
        color: white;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        white-space: nowrap;
      }
      .explanation-text {
        font-size: 0.9rem;
        color: #f1f5f9;
        line-height: 1.4;
      }
      .explanation-cta-btn {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 0.35rem 0.85rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      .explanation-cta-btn:hover {
        background: white;
        color: #0f172a;
        transform: translateX(2px);
      }
      
      /* Primary Modules Grid */
      .primary-modules-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.2rem;
        margin-bottom: 2.5rem;
      }
      .module-card {
        background: rgba(30, 41, 59, 0.7);
        border-radius: 18px;
        padding: 1.4rem;
        border-width: 2px;
        border-style: solid;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      }
      .module-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.35);
      }
      .module-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.8rem;
      }
      .module-icon {
        font-size: 2.4rem;
      }
      .module-badge {
        font-size: 0.72rem;
        font-weight: 800;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .module-title {
        font-size: 1.25rem;
        font-weight: 800;
        color: white;
        margin-bottom: 0.35rem;
      }
      .module-subtext {
        font-size: 0.78rem;
        color: #94a3b8;
        margin-bottom: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
      }
      .module-desc {
        font-size: 0.88rem;
        color: #cbd5e1;
        line-height: 1.45;
        margin-bottom: 1.2rem;
      }
      .module-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.8rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      .module-progress-bar {
        flex: 1;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 999px;
        margin-right: 1rem;
        overflow: hidden;
      }
      .module-progress-fill {
        height: 100%;
        border-radius: 999px;
      }
      .module-open-link {
        font-size: 0.85rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }

      /* Secondary Collapsible Section */
      .secondary-section-toggle {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 0.9rem 1.4rem;
        color: #cbd5e1;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        transition: all 0.2s ease;
      }
      .secondary-section-toggle:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
      .secondary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .secondary-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1.2rem;
        cursor: pointer;
        transition: all 0.25s ease;
        text-align: center;
      }
      .secondary-card:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-3px);
      }
      .secondary-icon { font-size: 2rem; margin-bottom: 0.4rem; }
      .secondary-title { font-size: 1rem; font-weight: 700; color: white; margin-bottom: 0.2rem; }
      .secondary-desc { font-size: 0.8rem; color: #94a3b8; }

      @media (max-width: 650px) {
        .svg-curve-overlay { display: none; }
        .chips-row { gap: 0.5rem; }
        .flow-chip { font-size: 0.85rem; padding: 0.5rem 0.8rem; }
        .primary-modules-grid { grid-template-columns: 1fr; }
      }

      .semantic-network {
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 400px;
        margin: 2rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .network-lines { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; }
      .node {
        position: absolute;
        background: var(--card-bg);
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        border: 2px solid rgba(255,255,255,0.1);
        z-index: 1;
        text-align: center;
        width: 130px;
        height: 140px;
        padding: 0.8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      .node img { width: 70px; height: 50px; object-fit: contain; margin-bottom: 8px; }
      .node.center { background: rgba(255, 255, 255, 0.1); border: 3px solid white; width: 160px; height: 170px; z-index: 2; }
      .node.center img { width: 100px; height: 70px; }
      .node.top { top: -10%; left: 50%; transform: translateX(-50%); }
      .node.bottom { bottom: -10%; left: 50%; transform: translateX(-50%); }
      .node.left { left: -10%; top: 50%; transform: translateY(-50%); }
      .node.right { right: -10%; top: 50%; transform: translateY(-50%); }
      .node .word { font-weight: 700; color: white; }
      .node .hint { font-size: 0.75rem; opacity: 0.8; color: var(--text-muted); text-transform: uppercase; }

      .word-explanation { margin: 3rem auto 2rem; max-width: 650px; line-height: 1.7; text-align: center; font-size: 1.1rem; }
      .consent-container { margin: 2rem 0; text-align: center; }
      .gemini-btn-container { text-align: center; margin-top: 1rem; }
      .gemini-btn {
        display: inline-block;
        padding: 1rem 2.5rem;
        background: var(--primary-color);
        color: white;
        text-decoration: none;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .gemini-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
      .gemini-btn.disabled { opacity: 0.5; pointer-events: none; filter: grayscale(1); }

      @media (max-width: 700px) {
        .semantic-network { height: auto; flex-direction: column; gap: 1.5rem; }
        .network-lines { display: none; }
        .node { position: static; width: 100%; max-width: 320px; height: auto; transform: none !important; }
      }
    `;
    viewContainer.appendChild(style);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('laerNyeOrd');
    viewContainer.appendChild(title);

    if (currentState === 'selection') {
      renderSelection(viewContainer);
    } else if (currentState === 'exercise_semantic') {
      renderSemanticExercise(viewContainer);
    } else if (currentState === 'exercise_naboord') {
      renderNaboordExercise(viewContainer);
    } else if (currentState === 'exercise_ordfamilier') {
      renderOrdfamilierExercise(viewContainer);
    } else if (currentState === 'exercise_historier') {
      renderHistorierExercise(viewContainer);
    }

    container.appendChild(viewContainer);
  }

  function renderSelection(parent) {
    // --- 1. SPROGETS BYGGEPLADS (INTERAKTIVT SÆTNINGSFLOW) ---
    const byggepladsCard = document.createElement('div');
    byggepladsCard.className = 'byggeplads-card';

    const flowData = {
      adjektiv: {
        badge: "🟠 Adjektiv",
        color: "#f97316",
        chipClass: "active-adj",
        text: "Beskriver <strong>substantivet</strong>: Hvilken bil? Den <em>røde</em> bil.",
        target: "top100_adjektiver",
        targetTitle: "Gå til Adjektiver ➔"
      },
      substantiv: {
        badge: "🟢 Substantiv",
        color: "#22c55e",
        chipClass: "active-sub",
        text: "Kernen i scenen: Hvem eller hvad taler vi om? En <em>bil</em>, en <em>mand</em>, et <em>hus</em>.",
        target: "top100_substantiver",
        targetTitle: "Gå til Substantiver ➔"
      },
      verbum: {
        badge: "🔴 Verbum",
        color: "#ef4444",
        chipClass: "active-vrb",
        text: "Motoren i sætningen: Hvad gør bilen? Den <em>kører</em>.",
        target: "top100_verber",
        targetTitle: "Gå til Verber ➔"
      },
      adverbium: {
        badge: "🔵 Adverbium",
        color: "#38bdf8",
        chipClass: "active-adv",
        text: "Knytter sig til <strong>verbet</strong>: Hvordan kører den? Den kører <em>hurtigt</em> (eller <em>i dag</em>, <em>ikke</em>).",
        target: "top100_adverbier",
        targetTitle: "Gå til Adverbier ➔"
      },
      konjunktion: {
        badge: "🟣 Konjunktion",
        color: "#a855f7",
        chipClass: "active-konj",
        text: "Broen, der samler to billeder eller rammesætter indhold: <em>...fordi solen skinner</em> eller <em>Jeg tror, at...</em>",
        target: "top_konjunktioner",
        targetTitle: "Gå til Konjunktioner ➔"
      }
    };

    byggepladsCard.innerHTML = `
      <div class="byggeplads-header">
        <div>
          <div class="byggeplads-title">
            <span>✨</span>
            <span>Sprogets Byggeplads</span>
          </div>
          <div class="byggeplads-subtitle">Tryk på en ordklasse for at se, hvordan ordene hænger sammen</div>
        </div>
      </div>

      <div class="sentence-flow-box">
        <svg class="svg-curve-overlay" viewBox="0 0 540 65" preserveAspectRatio="none">
          <!-- Bue 1: Orange Adjektiv -> Grønt Substantiv -->
          <path d="M 65 38 Q 110 8 155 38" fill="none" stroke="#f97316" stroke-width="2.5" class="pulsing-curve" />
          <!-- Bue 2: Blåt Adverbium -> Rødt Verbum -->
          <path d="M 385 38 Q 330 8 275 38" fill="none" stroke="#38bdf8" stroke-width="2.5" class="pulsing-curve" />
          <!-- Bue 3: Lilla Konjunktion binder hele sætningen videre -->
          <path d="M 435 44 Q 485 64 530 44" fill="none" stroke="#a855f7" stroke-width="2.5" class="pulsing-curve" />
        </svg>

        <div class="chips-row">
          <button type="button" class="flow-chip active-adj" data-type="adjektiv" id="chip-adj">
            <span>🟠</span>
            <span>den røde</span>
          </button>
          <button type="button" class="flow-chip" data-type="substantiv" id="chip-sub">
            <span>🟢</span>
            <span>bil</span>
          </button>
          <button type="button" class="flow-chip" data-type="verbum" id="chip-vrb">
            <span>🔴</span>
            <span>kører</span>
          </button>
          <button type="button" class="flow-chip" data-type="adverbium" id="chip-adv">
            <span>🔵</span>
            <span>hurtigt</span>
          </button>
          <button type="button" class="flow-chip" data-type="konjunktion" id="chip-konj">
            <span>🟣</span>
            <span>fordi...</span>
          </button>
        </div>

        <div class="flow-explanation" id="flow-explanation">
          <div class="explanation-content">
            <span class="explanation-badge" id="flow-badge" style="background: #f97316;">🟠 Adjektiv</span>
            <span class="explanation-text" id="flow-text">Beskriver <strong>substantivet</strong>: Hvilken bil? Den <em>røde</em> bil.</span>
          </div>
          <button type="button" class="explanation-cta-btn" id="flow-cta">Gå til Adjektiver ➔</button>
        </div>
      </div>
    `;

    // Chip click interactions
    let currentFlowTarget = 'top100_adjektiver';
    const chips = byggepladsCard.querySelectorAll('.flow-chip');
    const badgeEl = byggepladsCard.querySelector('#flow-badge');
    const textEl = byggepladsCard.querySelector('#flow-text');
    const ctaBtn = byggepladsCard.querySelector('#flow-cta');

    chips.forEach(chip => {
      chip.onclick = () => {
        const type = chip.getAttribute('data-type');
        const item = flowData[type];
        if (!item) return;

        chips.forEach(c => {
          c.className = 'flow-chip';
        });
        chip.classList.add(item.chipClass);

        badgeEl.textContent = item.badge;
        badgeEl.style.background = item.color;
        textEl.innerHTML = item.text;
        ctaBtn.textContent = item.targetTitle;
        currentFlowTarget = item.target;

        // Highlight matching module card below
        const matchingCard = document.getElementById(`module-card-${type}`);
        if (matchingCard) {
          matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          matchingCard.style.transform = 'translateY(-8px) scale(1.02)';
          setTimeout(() => {
            matchingCard.style.transform = '';
          }, 600);
        }
      };
    });

    ctaBtn.onclick = () => {
      navigateFn(currentFlowTarget);
    };

    parent.appendChild(byggepladsCard);

    // --- 2. DE 5 PRIMÆRE MODULKORT ---
    const primaryModules = [
      {
        id: 'exercise_top100_substantiver',
        key: 'substantiv',
        target: 'top100_substantiver',
        icon: '🚗',
        title: '1. Substantiver',
        subtext: 'Tingene & personerne',
        desc: 'De 100 mest almindelige navneord fordelt på Byen, Hjemmet, Klassen, Naturen og Stationen.',
        badge: '100 ord',
        badgeBg: 'rgba(34, 197, 94, 0.2)',
        color: '#22c55e',
        progress: '75%'
      },
      {
        id: 'exercise_top100_adjektiver',
        key: 'adjektiv',
        target: 'top100_adjektiver',
        icon: '🎨',
        title: '2. Adjektiver',
        subtext: 'Farver, former & følelser',
        desc: 'Beskriver ting og personer: Fysisk, kvalitet, tid, følelser og tilstande. Knytter sig til substantivet.',
        badge: '➔ Knytter til 🟢',
        badgeBg: 'rgba(249, 115, 22, 0.2)',
        color: '#f97316',
        progress: '45%'
      },
      {
        id: 'exercise_top100_verber',
        key: 'verbum',
        target: 'top100_verber',
        icon: '🏃',
        title: '3. Verber',
        subtext: 'Handlingerne & motoren',
        desc: 'De 100 vigtigste hverdagsverber i nutid, datid og førnutid i hverdagen.',
        badge: '100 ord',
        badgeBg: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
        progress: '60%'
      },
      {
        id: 'exercise_top100_adverbier',
        key: 'adverbium',
        target: 'top100_adverbier',
        icon: '🧭',
        title: '4. Adverbier',
        subtext: 'Tid, sted, måde & holdning',
        desc: 'Små og præcise ord der knytter sig til verbet: Sted, tid, måde, grad, holdning og konnektion.',
        badge: '➔ Knytter til 🔴',
        badgeBg: 'rgba(56, 189, 248, 0.2)',
        color: '#38bdf8',
        progress: '30%'
      },
      {
        id: 'exercise_top_konjunktioner',
        key: 'konjunktion',
        target: 'top_konjunktioner',
        icon: '🌉',
        title: '5. Konjunktioner & "AT"',
        subtext: 'Brobyggerne & bindeord',
        desc: 'Bindeordene (og, men, fordi, da/når, selvom) og et særskilt kognitivt felt om brugen af "at".',
        badge: 'Brobyggeren',
        badgeBg: 'rgba(168, 85, 247, 0.2)',
        color: '#a855f7',
        progress: '20%'
      }
    ];

    const primaryGrid = document.createElement('div');
    primaryGrid.className = 'primary-modules-grid';

    primaryModules.forEach(mod => {
      const card = document.createElement('div');
      card.className = 'module-card';
      card.id = `module-card-${mod.key}`;
      card.style.borderColor = mod.color;
      card.style.background = `linear-gradient(145deg, ${mod.color}15, rgba(15, 23, 42, 0.85))`;

      card.innerHTML = `
        <div>
          <div class="module-top">
            <span class="module-icon">${mod.icon}</span>
            <span class="module-badge" style="background: ${mod.badgeBg}; color: ${mod.color}; border: 1px solid ${mod.color}50;">${mod.badge}</span>
          </div>
          <div class="module-title">${mod.title}</div>
          <div class="module-subtext">${mod.subtext}</div>
          <div class="module-desc">${mod.desc}</div>
        </div>
        <div class="module-footer">
          <div class="module-progress-bar">
            <div class="module-progress-fill" style="width: ${mod.progress}; background: ${mod.color};"></div>
          </div>
          <div class="module-open-link" style="color: ${mod.color};">
            <span>Åbn</span>
            <span>➔</span>
          </div>
        </div>
      `;

      card.onclick = () => {
        navigateFn(mod.target);
      };

      primaryGrid.appendChild(card);
    });

    parent.appendChild(primaryGrid);

    // --- 3. SEKUNDÆRE / SUPPLERENDE ØVELSER (COLLAPSIBLE) ---
    const secondaryToggle = document.createElement('div');
    secondaryToggle.className = 'secondary-section-toggle';
    secondaryToggle.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span>📁</span>
        <span>Flere ordøvelser (Semantik, naboord & historier)</span>
      </div>
      <span id="secondary-arrow" style="transition: transform 0.2s;">▾</span>
    `;

    const secondaryGrid = document.createElement('div');
    secondaryGrid.className = 'secondary-grid';
    secondaryGrid.style.display = 'none';

    const legacyTasks = [
      { id: 'exercise_semantic', title: 'laerEtNytOrd', desc: 'laerEtNytOrdDesc', icon: '✨' },
      { id: 'exercise_naboord', title: 'laerNaboord', desc: 'laerNaboordDesc', icon: '👯' },
      { id: 'exercise_ordfamilier', title: 'laerOrdfamilier', desc: 'laerOrdfamilierDesc', icon: '🌳' },
      { id: 'exercise_historier', title: 'laerNyeOrdHistorier', desc: 'laerNyeOrdHistorierDesc', icon: '📖' }
    ];

    legacyTasks.forEach(task => {
      const card = document.createElement('div');
      card.className = 'secondary-card';
      const t = getTranslation(task.title);
      const d = getTranslation(task.desc);

      card.innerHTML = `
        <div class="secondary-icon">${task.icon}</div>
        <div class="secondary-title">${t || task.title}</div>
        <div class="secondary-desc">${d || task.desc}</div>
      `;

      card.onclick = () => {
        currentState = task.id;
        render();
      };

      secondaryGrid.appendChild(card);
    });

    secondaryToggle.onclick = () => {
      const isHidden = secondaryGrid.style.display === 'none';
      secondaryGrid.style.display = isHidden ? 'grid' : 'none';
      secondaryToggle.querySelector('#secondary-arrow').style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    };

    parent.appendChild(secondaryToggle);
    parent.appendChild(secondaryGrid);

    // --- 4. SUPPORT LINKS ---
    const supportArea = document.createElement('div');
    supportArea.className = 'support-links';
    supportArea.style.display = 'flex';
    supportArea.style.justifyContent = 'center';
    supportArea.style.flexWrap = 'wrap';
    supportArea.style.gap = '1rem';
    supportArea.style.marginTop = '2rem';
    supportArea.style.paddingBottom = '2rem';

    const kofiLink = document.createElement('a');
    kofiLink.href = 'https://ko-fi.com/dansktraening';
    kofiLink.target = '_blank';
    kofiLink.className = 'gemini-btn';
    kofiLink.style.textDecoration = 'none';
    kofiLink.style.backgroundColor = '#ff5e5b';
    kofiLink.textContent = '☕ Buy me a coffee';

    const mpLink = document.createElement('a');
    mpLink.href = 'https://qr.mobilepay.dk/box/0cfe35a7-fccc-4cb9-85e7-b246d3bfa48a/pay-in';
    mpLink.target = '_blank';
    mpLink.className = 'gemini-btn';
    mpLink.style.textDecoration = 'none';
    mpLink.style.backgroundColor = '#5a78ff';
    mpLink.textContent = '📱 Støt med MobilePay';

    supportArea.appendChild(kofiLink);
    supportArea.appendChild(mpLink);
    parent.appendChild(supportArea);
  }

  function renderSemanticExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerEtNytOrd');
    card.appendChild(t);

    const networkContainer = document.createElement('div');
    networkContainer.className = 'semantic-network';
    const nodes = [
      { class: 'node center', label: getTranslation('targetWord'), img: 'car_main.png' },
      { class: 'node top', label: getTranslation('hypernymWord'), hint: getTranslation('hypernym'), img: 'vehicle_group.png' },
      { class: 'node bottom', label: getTranslation('hyponymWord'), hint: getTranslation('hyponym'), img: 'electric_car.png' },
      { class: 'node left', label: getTranslation('synonymWord'), hint: getTranslation('synonym'), img: 'sedan_car.png' },
      { class: 'node right', label: getTranslation('antonymWord'), hint: getTranslation('antonym'), img: 'bicycle.png' }
    ];

    nodes.forEach(n => {
      const el = document.createElement('div');
      el.className = n.class;
      el.innerHTML = `<img src="${baseUrl}${n.img}" alt="${n.label}"><div class="word">${n.label}</div><span style="font-size: 0.68rem; font-weight: 700; color: #4ade80; background: rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; border-radius: 4px; padding: 1px 6px; margin-top: 4px;">${getTranslation('top100_legend_substantiv')}</span>`;
      if (n.hint) el.innerHTML += `<div class="hint">${n.hint}</div>`;
      networkContainer.appendChild(el);
    });

    networkContainer.insertAdjacentHTML('afterbegin', `
      <svg class="network-lines"><line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2"/></svg>
    `);
    card.appendChild(networkContainer);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('wordNetworkExplanation');
    card.appendChild(exp);

    renderAIControl(card, "https://gemini.google.com/gem/1mnr6c6GaSiftVf5RMJ2cfxqgwH8p9djT?usp=sharing");
    parent.appendChild(card);
  }

  function renderNaboordExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerNaboord');
    card.appendChild(t);

    const img = document.createElement('img');
    img.src = `${baseUrl}naboord.png`;
    img.className = 'full-width-img';
    img.alt = 'Naboord';
    card.appendChild(img);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('laerNaboordDesc');
    card.appendChild(exp);

    renderAIControl(card, "https://gemini.google.com/gem/19kTcKuh8N5tRIxoqPXN0ryhlJyuRpb-R?usp=sharing");
    parent.appendChild(card);
  }

  function renderOrdfamilierExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerOrdfamilier');
    card.appendChild(t);

    const img = document.createElement('img');
    img.src = `${baseUrl}ordpar.png`;
    img.className = 'full-width-img';
    img.alt = 'Ordfamilier';
    card.appendChild(img);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('laerOrdfamilierDesc');
    card.appendChild(exp);

    renderAIControl(card, "https://gemini.google.com/gem/1STqY0Ea8HW0AWPyrXXj5jgA0H1doVlEP?usp=sharing");
    parent.appendChild(card);
  }

  function renderHistorierExercise(parent) {
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerNyeOrdHistorier');
    card.appendChild(t);

    const img = document.createElement('img');
    img.src = `${baseUrl}historier.png`;
    img.className = 'full-width-img';
    img.alt = 'Historier';
    card.appendChild(img);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('laerNyeOrdHistorierDesc');
    card.appendChild(exp);

    const guideBox = document.createElement('div');
    guideBox.style.marginTop = "2rem";
    guideBox.style.marginBottom = "2rem";
    guideBox.style.padding = "1.5rem";
    guideBox.style.background = "rgba(255, 255, 255, 0.05)";
    guideBox.style.borderLeft = "4px solid var(--primary-color)";
    guideBox.style.borderRadius = "8px";
    guideBox.style.textAlign = "left";
    guideBox.style.fontSize = "0.95rem";
    guideBox.style.lineHeight = "1.6";
    guideBox.style.color = "var(--text-color, white)";
    guideBox.innerHTML = getTranslation('historierPromptGuide');
    card.appendChild(guideBox);

    renderAIControl(card, "https://gemini.google.com/gem/1d8R8VVlBLmF9Sfdh3zXwtM1u9uRuvZp3?usp=sharing");
    parent.appendChild(card);
  }

  function renderAIControl(parent, url) {
    const container = document.createElement('div');
    container.className = 'consent-container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'gemini-consent-' + Math.random().toString(36).substr(2, 9);

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = ' ' + getTranslation('geminiConsentText');

    container.appendChild(checkbox);
    container.appendChild(label);
    parent.appendChild(container);

    const btnContainer = document.createElement('div');
    btnContainer.className = 'gemini-btn-container';
    const btn = document.createElement('a');
    btn.href = url;
    btn.target = "_blank";
    btn.className = 'gemini-btn disabled';
    btn.textContent = getTranslation('geminiBtnText');
    btnContainer.appendChild(btn);
    parent.appendChild(btnContainer);

    checkbox.addEventListener('change', (e) => {
      btn.classList.toggle('disabled', !e.target.checked);
    });
  }

  render();
}
