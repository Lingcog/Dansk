import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderTalemaaderView(container, navigateFn, extraData = {}) {
  // Read progress from localStorage
  let progress = JSON.parse(localStorage.getItem('danskTalemaaderProgress') || '{"mod1":false,"mod2":false,"mod3":false,"mod4":false}');

  // Determine current active subview: 'dashboard', 'module1', 'module2', 'module3', 'module4', 'module5', or 'arcade'
  let subView = extraData.subView || 'dashboard';

  // Define modules data
  const modules = {
    mod1: {
      id: 'mod1',
      title: 'At lykkes & Målrettet flid',
      desc: 'Blind høne, skyde papegøjen, ramme plet og at kaste frugt af sig.',
      image: 'succes_flid.png',
      overemne: 'At lykkes',
      items: [
        { id: '1', name: 'Blind høne finder også korn', coords: { left: 9, top: 48, width: 17, height: 10 }, options: ['Blind høne finder også korn', 'At skyde papegøjen', 'At ramme plet'] },
        { id: '2', name: 'At skyde papegøjen', coords: { left: 30, top: 78, width: 17, height: 10 }, options: ['At skyde papegøjen', 'Det kører på skinner', 'At kaste frugt af sig'] },
        { id: '3', name: 'At ramme plet', coords: { left: 56, top: 52, width: 17, height: 10 }, options: ['At ramme plet', 'Det kører på skinner', 'Blind høne finder også korn'] },
        { id: '4', name: 'Det kører på skinner', coords: { left: 79, top: 48, width: 17, height: 10 }, options: ['Det kører på skinner', 'At kaste frugt af sig', 'At skyde papegøjen'] },
        { id: '5', name: 'At kaste frugt af sig', coords: { left: 76, top: 78, width: 17, height: 10 }, options: ['At kaste frugt af sig', 'At ramme plet', 'At stikke piben ind'] }
      ]
    },
    mod2: {
      id: 'mod2',
      title: 'Mental & Handlingsretræte',
      desc: 'At stikke piben ind, trække i land, slå bak og kaste håndklædet i ringen.',
      image: 'retraete.png',
      overemne: 'Retræte',
      items: [
        { id: '1', name: 'At trække følerne til sig', coords: { left: 4, top: 57, width: 17, height: 10 }, options: ['At trække følerne til sig', 'At stikke piben ind', 'At slå bak'] },
        { id: '2', name: 'At stikke piben ind', coords: { left: 27, top: 70, width: 17, height: 10 }, options: ['At stikke piben ind', 'At trække i land', 'At kaste håndklædet i ringen'] },
        { id: '3', name: 'At trække i land', coords: { left: 72, top: 32, width: 17, height: 10 }, options: ['At trække i land', 'At slå bak', 'At trække følerne til sig'] },
        { id: '4', name: 'At slå bak', coords: { left: 56, top: 55, width: 17, height: 10 }, options: ['At slå bak', 'At kaste håndklædet i ringen', 'At stikke piben ind'] },
        { id: '5', name: 'At kaste håndklædet i ringen', coords: { left: 72, top: 78, width: 17, height: 10 }, options: ['At kaste håndklædet i ringen', 'At trække i land', 'At slå bak'] }
      ]
    },
    mod3: {
      id: 'mod3',
      title: 'Fejltrin & Kollaps',
      desc: 'At træde i spinaten, gå i baglås, stå med håret i postkassen og gå ned med flaget.',
      image: 'fejltrin_kollaps.png',
      overemne: 'Fejltrin & Kollaps',
      items: [
        { id: '1', name: 'At træde i spinaten', coords: { left: 23, top: 27, width: 17, height: 10 }, options: ['At træde i spinaten', 'At gå i baglås', 'At stå med håret i postkassen'] },
        { id: '2', name: 'At gå i baglås', coords: { left: 8, top: 52, width: 17, height: 10 }, options: ['At gå i baglås', 'At slå et større brød op, end man kan bage', 'At gå ned med flaget'] },
        { id: '3', name: 'At slå et større brød op, end man kan bage', coords: { left: 25, top: 76, width: 17, height: 10 }, options: ['At slå et større brød op, end man kan bage', 'At træde i spinaten', 'At stå med håret i postkassen'] },
        { id: '4', name: 'At stå med håret i postkassen', coords: { left: 69, top: 27, width: 17, height: 10 }, options: ['At stå med håret i postkassen', 'At gå ned med flaget', 'At gå i baglås'] },
        { id: '5', name: 'At gå ned med flaget', coords: { left: 77, top: 78, width: 17, height: 10 }, options: ['At gå ned med flaget', 'At slå et større brød op, end man kan bage', 'At træde i spinaten'] }
      ]
    },
    mod4: {
      id: 'mod4',
      title: 'Starte på en frisk',
      desc: 'At begynde på en frisk, rejse sig ved det træ man er faldet ved, og op på hesten igen.',
      image: 'starte_igen.png',
      overemne: 'Starte igen',
      items: [
        { id: '1', name: 'At begynde på en frisk', coords: { left: 7, top: 58, width: 17, height: 10 }, options: ['At begynde på en frisk', 'At rejse sig ved det træ, man er faldet ved', 'På med vanten igen'] },
        { id: '2', name: 'At rejse sig ved det træ, man er faldet ved', coords: { left: 28, top: 56, width: 17, height: 10 }, options: ['At rejse sig ved det træ, man er faldet ved', 'At tage skeen i den anden hånd', 'At komme op på hesten igen'] },
        { id: '3', name: 'At tage skeen i den anden hånd', coords: { left: 24, top: 79, width: 17, height: 10 }, options: ['At tage skeen i den anden hånd', 'At begynde på en frisk', 'På med vanten igen'] },
        { id: '4', name: 'På med vanten igen', coords: { left: 57, top: 57, width: 17, height: 10 }, options: ['På med vanten igen', 'At komme op på hesten igen', 'At rejse sig ved det træ, man er faldet ved'] },
        { id: '5', name: 'At komme op på hesten igen', coords: { left: 74, top: 76, width: 17, height: 10 }, options: ['At komme op på hesten igen', 'At tage skeen i den anden hånd', 'At begynde på en frisk'] }
      ]
    }
  };

  // Check if Mod 5 is unlocked
  const isMod5Unlocked = progress.mod1 && progress.mod2 && progress.mod3 && progress.mod4;

  function render() {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Global Styles for Talemåder View
    const style = document.createElement('style');
    style.textContent = `
      .talemaader-dashboard {
        max-width: 900px;
        margin: 0 auto;
      }
      .module-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }
      .module-card {
        background: var(--card-bg, rgba(255,255,255,0.05));
        border: 2px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .module-card:hover:not(.locked) {
        transform: translateY(-5px);
        border-color: var(--primary-color, #ffc107);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
      }
      .module-card.locked {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .module-card.completed {
        border-color: #2e7d32;
      }
      .completion-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #2e7d32;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
      .lock-icon {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 1.2rem;
      }
      .module-title {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: white;
      }
      .module-desc {
        font-size: 0.9rem;
        color: var(--text-muted, #ccc);
        line-height: 1.4;
        margin-bottom: 1.5rem;
      }
      .module-action-btn {
        background: var(--primary-color, #ffc107);
        color: black;
        border: none;
        border-radius: 8px;
        padding: 0.6rem 1.2rem;
        font-weight: 700;
        cursor: pointer;
        text-align: center;
        width: 100%;
        margin-top: auto;
      }
      .locked .module-action-btn {
        background: #555;
        color: #aaa;
      }

      /* Quiz view styling */
      .worksheet-outer {
        max-width: 1000px;
        margin: 2rem auto;
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        border: 3px solid rgba(255,255,255,0.15);
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      }
      .worksheet-container {
        position: relative;
        width: 100%;
      }
      .worksheet-img {
        width: 100%;
        height: auto;
        display: block;
      }
      .hotspot-mask {
        position: absolute;
        background: rgba(21, 42, 36, 0.96);
        border: 2px dashed var(--primary-color, #ffc107);
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color, #ffc107);
        font-weight: 700;
        font-size: 1.2rem;
        transition: all 0.2s ease;
      }
      .hotspot-mask:hover {
        background: rgba(255, 193, 7, 0.15);
        transform: scale(1.02);
      }
      .hotspot-mask.answered {
        background: transparent;
        border: 2px solid #2e7d32;
        color: #2e7d32;
        font-size: 0.85rem;
        cursor: default;
      }
      .hotspot-mask.answered::after {
        content: '✓';
        position: absolute;
        bottom: -10px;
        right: -10px;
        background: #2e7d32;
        color: white;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        border: 1px solid white;
      }

      /* Overemne Guessing Input */
      .overemne-overlay {
        position: absolute;
        top: 2%;
        left: 20%;
        width: 60%;
        height: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }
      .overemne-btn {
        background: rgba(21, 42, 36, 0.95);
        color: var(--primary-color, #ffc107);
        border: 2px dashed var(--primary-color, #ffc107);
        border-radius: 8px;
        padding: 0.4rem 1.5rem;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .overemne-btn:hover {
        background: rgba(255,193,7,0.15);
      }
      .overemne-btn.answered {
        background: transparent;
        border: 2px solid #2e7d32;
        color: #2e7d32;
        cursor: default;
      }

      /* Mobile Drawer for selections */
      .drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 1000;
        display: none;
        align-items: flex-end;
      }
      .drawer-overlay.active {
        display: flex;
      }
      .drawer-content {
        background: #152a24;
        width: 100%;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        padding: 2rem;
        box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
        border-top: 2px solid rgba(255,255,255,0.1);
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.1, 0.76, 0.55, 0.94);
      }
      .drawer-overlay.active .drawer-content {
        transform: translateY(0);
      }
      .drawer-title {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: white;
        text-align: center;
      }
      .options-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }
      .option-item {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 1rem;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }
      .option-item:hover {
        background: var(--primary-color, #ffc107);
        color: black;
        border-color: var(--primary-color, #ffc107);
      }
      .drawer-close {
        background: transparent;
        color: var(--text-muted, #ccc);
        border: none;
        font-size: 1.5rem;
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
      }

      /* Arcade section */
      .arcade-section {
        margin-top: 3rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 16px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
      .arcade-frame-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 1.5rem;
      }
      .arcade-wrapper {
        border-radius: 12px;
        overflow: hidden;
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      }
      .arcade-title {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: white;
      }
      .arcade-iframe {
        width: 100%;
        height: 550px;
        border: none;
        display: block;
      }

      /* Final view nodes coordinates */
      .node-final {
        position: absolute;
        background: rgba(21, 42, 36, 0.96);
        border: 2.5px dashed var(--primary-color, #ffc107);
        border-radius: 8px;
        cursor: pointer;
        padding: 0.3rem 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.2s ease;
        text-align: center;
      }
      .node-final:hover {
        background: rgba(255, 193, 7, 0.15);
      }
      .node-final.answered {
        background: rgba(46, 125, 50, 0.1);
        border: 2.5px solid #2e7d32;
        color: white;
      }
      .node-final .label-title {
        font-size: 0.65rem;
        opacity: 0.7;
        text-transform: uppercase;
        margin-bottom: 2px;
      }
      .node-final .label-value {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--primary-color, #ffc107);
      }
      .node-final.answered .label-value {
        color: #4caf50;
      }

      /* Notification Toast */
      .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2e7d32;
        color: white;
        padding: 1rem 2rem;
        border-radius: 30px;
        font-weight: 700;
        z-index: 2000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        display: none;
      }
      .toast.show {
        display: block;
        animation: fadeInUp 0.3s ease, fadeOutDown 0.3s ease 2.7s;
      }
      .toast.error {
        background: #c62828;
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
    `;
    viewContainer.appendChild(style);

    // Toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    viewContainer.appendChild(toast);

    function showToast(msg, isError = false) {
      toast.textContent = msg;
      toast.className = 'toast show' + (isError ? ' error' : '');
      setTimeout(() => {
        toast.className = 'toast';
      }, 3000);
    }

    // Top Bar (Back Button)
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => {
      if (subView === 'dashboard') {
        navigateFn('main');
      } else {
        subView = 'dashboard';
        render();
      }
    };
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Render Subview
    if (subView === 'dashboard') {
      renderDashboard(viewContainer);
    } else if (subView.startsWith('module') && subView !== 'module5') {
      const moduleId = subView.replace('module', 'mod');
      renderModuleExercise(viewContainer, modules[moduleId]);
    } else if (subView === 'module5') {
      renderFinalExercise(viewContainer);
    }

    container.appendChild(viewContainer);
  }

  // --- SUBVIEW 1: DASHBOARD ---
  function renderDashboard(parent) {
    const title = document.createElement('h1');
    title.textContent = 'Talemåder & Mønstre';
    parent.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Lær danske talemåder trin-for-trin og find de overordnede mønstre ("Erfaringens Kredsløb").';
    parent.appendChild(subtitle);

    const dashboard = document.createElement('div');
    dashboard.className = 'talemaader-dashboard';

    const cardGrid = document.createElement('div');
    cardGrid.className = 'module-grid';

    // Add cards for Mod 1-4
    Object.keys(modules).forEach((key, idx) => {
      const mod = modules[key];
      const card = document.createElement('div');
      const isCompleted = progress[key];

      card.className = 'module-card' + (isCompleted ? ' completed' : '');
      card.onclick = () => {
        subView = `module${idx + 1}`;
        render();
      };

      if (isCompleted) {
        const badge = document.createElement('div');
        badge.className = 'completion-badge';
        badge.textContent = '✓';
        card.appendChild(badge);
      }

      const modTitle = document.createElement('div');
      modTitle.className = 'module-title';
      modTitle.textContent = `Kapitel ${idx + 1}`;
      card.appendChild(modTitle);

      const modDesc = document.createElement('div');
      modDesc.className = 'module-desc';
      modDesc.textContent = mod.desc;
      card.appendChild(modDesc);

      const actionBtn = document.createElement('button');
      actionBtn.className = 'module-action-btn';
      actionBtn.textContent = isCompleted ? 'Øv igen' : 'Start kapitel';
      card.appendChild(actionBtn);

      cardGrid.appendChild(card);
    });

    // Add card for Mod 5 (Final)
    const card5 = document.createElement('div');
    card5.className = 'module-card' + (!isMod5Unlocked ? ' locked' : '') + (progress.mod5 ? ' completed' : '');
    card5.onclick = () => {
      if (isMod5Unlocked) {
        subView = 'module5';
        render();
      } else {
        showToast('Du skal fuldføre kapitel 1-4 for at låse op for finalen!', true);
      }
    };

    if (progress.mod5) {
      const badge = document.createElement('div');
      badge.className = 'completion-badge';
      badge.textContent = '🏆';
      card5.appendChild(badge);
    } else if (!isMod5Unlocked) {
      const lock = document.createElement('div');
      lock.className = 'lock-icon';
      lock.textContent = '🔒';
      card5.appendChild(lock);
    }

    const title5 = document.createElement('div');
    title5.className = 'module-title';
    title5.textContent = '🏆 Finale: Erfaringens Kredsløb';
    card5.appendChild(title5);

    const desc5 = document.createElement('div');
    desc5.className = 'module-desc';
    desc5.textContent = 'Saml alle emnerne og talemåderne i det store, overordnede kredsløb og gæt mønsteret.';
    card5.appendChild(desc5);

    const btn5 = document.createElement('button');
    btn5.className = 'module-action-btn';
    btn5.textContent = progress.mod5 ? 'Gennemført (Spil igen)' : (isMod5Unlocked ? 'Start finalen!' : 'Låst');
    card5.appendChild(btn5);

    cardGrid.appendChild(card5);
    dashboard.appendChild(cardGrid);

    // --- Padlet Arcade Room with engaging link boxes ---
    const arcadeSection = document.createElement('div');
    arcadeSection.className = 'arcade-section';

    const arcadeHeader = document.createElement('h2');
    arcadeHeader.textContent = '🕹️ Arcade Træningsrummet';
    arcadeHeader.style.marginBottom = '0.5rem';
    arcadeSection.appendChild(arcadeHeader);

    const arcadeSub = document.createElement('p');
    arcadeSub.className = 'subtitle';
    arcadeSub.style.fontSize = '0.95rem';
    arcadeSub.textContent = 'Træn dine talemåder med interaktive onlinespil. Spillene åbner i en ny fane, så alle tegninger indlæses fejlfrit.';
    arcadeSection.appendChild(arcadeSub);

    const frameContainer = document.createElement('div');
    frameContainer.className = 'arcade-frame-container';
    frameContainer.style.display = 'grid';
    frameContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    frameContainer.style.gap = '1.5rem';
    frameContainer.style.marginTop = '1.5rem';

    // Game 1 Card
    const game1Card = document.createElement('div');
    game1Card.className = 'arcade-wrapper';
    game1Card.style.padding = '2rem';
    game1Card.style.background = 'rgba(255,255,255,0.03)';
    game1Card.style.border = '2px solid rgba(255,255,255,0.08)';
    game1Card.style.borderRadius = '16px';
    game1Card.style.display = 'flex';
    game1Card.style.flexDirection = 'column';
    game1Card.style.alignItems = 'center';
    game1Card.style.textAlign = 'center';
    game1Card.style.transition = 'all 0.3s ease';

    game1Card.onmouseenter = () => {
      game1Card.style.borderColor = '#ffc107';
      game1Card.style.transform = 'translateY(-3px)';
    };
    game1Card.onmouseleave = () => {
      game1Card.style.borderColor = 'rgba(255,255,255,0.08)';
      game1Card.style.transform = 'none';
    };

    const g1Icon = document.createElement('div');
    g1Icon.style.fontSize = '3rem';
    g1Icon.style.marginBottom = '1rem';
    g1Icon.textContent = '🧩';
    game1Card.appendChild(g1Icon);

    const g1Title = document.createElement('h3');
    g1Title.style.fontSize = '1.25rem';
    g1Title.style.fontWeight = '700';
    g1Title.style.marginBottom = '0.5rem';
    g1Title.style.color = 'white';
    g1Title.textContent = 'Spil 1: Par tegninger';
    game1Card.appendChild(g1Title);

    const g1Desc = document.createElement('p');
    g1Desc.style.fontSize = '0.9rem';
    g1Desc.style.color = '#ccc';
    g1Desc.style.lineHeight = '1.4';
    g1Desc.style.marginBottom = '1.5rem';
    g1Desc.textContent = 'Kan du matche de fine illustrationer med de rigtige danske talemåder? Sæt din viden på prøve!';
    game1Card.appendChild(g1Desc);

    const g1Link = document.createElement('a');
    g1Link.href = 'https://arcade.padlet.com/game/6wK7zL1NpJ?link_shared=1';
    g1Link.target = '_blank';
    g1Link.className = 'module-action-btn';
    g1Link.textContent = 'Start spillet ➜';
    g1Link.style.textDecoration = 'none';
    g1Link.style.display = 'inline-block';
    game1Card.appendChild(g1Link);

    frameContainer.appendChild(game1Card);

    // Game 2 Card
    const game2Card = document.createElement('div');
    game2Card.className = 'arcade-wrapper';
    game2Card.style.padding = '2rem';
    game2Card.style.background = 'rgba(255,255,255,0.03)';
    game2Card.style.border = '2px solid rgba(255,255,255,0.08)';
    game2Card.style.borderRadius = '16px';
    game2Card.style.display = 'flex';
    game2Card.style.flexDirection = 'column';
    game2Card.style.alignItems = 'center';
    game2Card.style.textAlign = 'center';
    game2Card.style.transition = 'all 0.3s ease';

    game2Card.onmouseenter = () => {
      game2Card.style.borderColor = '#ffc107';
      game2Card.style.transform = 'translateY(-3px)';
    };
    game2Card.onmouseleave = () => {
      game2Card.style.borderColor = 'rgba(255,255,255,0.08)';
      game2Card.style.transform = 'none';
    };

    const g2Icon = document.createElement('div');
    g2Icon.style.fontSize = '3rem';
    g2Icon.style.marginBottom = '1rem';
    g2Icon.textContent = '🧠';
    game2Card.appendChild(g2Icon);

    const g2Title = document.createElement('h3');
    g2Title.style.fontSize = '1.25rem';
    g2Title.style.fontWeight = '700';
    g2Title.style.marginBottom = '0.5rem';
    g2Title.style.color = 'white';
    g2Title.textContent = 'Spil 2: Gæt overemner';
    game2Card.appendChild(g2Title);

    const g2Desc = document.createElement('p');
    g2Desc.style.fontSize = '0.9rem';
    g2Desc.style.color = '#ccc';
    g2Desc.style.lineHeight = '1.4';
    g2Desc.style.marginBottom = '1.5rem';
    g2Desc.textContent = 'Se de forskellige kategorier og gæt, hvilke overordnede emner talemåderne hører under.';
    game2Card.appendChild(g2Desc);

    const g2Link = document.createElement('a');
    g2Link.href = 'https://arcade.padlet.com/game/9Ljk9qvVKO?link_shared=1';
    g2Link.target = '_blank';
    g2Link.className = 'module-action-btn';
    g2Link.textContent = 'Start spillet ➜';
    g2Link.style.textDecoration = 'none';
    g2Link.style.display = 'inline-block';
    game2Card.appendChild(g2Link);

    frameContainer.appendChild(game2Card);

    arcadeSection.appendChild(frameContainer);
    dashboard.appendChild(arcadeSection);
    parent.appendChild(dashboard);
  }

  // --- SUBVIEW 2: INDIVIDUAL MODULES (1-4) ---
  function renderModuleExercise(parent, mod) {
    const title = document.createElement('h1');
    title.textContent = mod.title;
    parent.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Tryk på de stiplede områder på arket for at gætte talemåderne og overemnet.';
    parent.appendChild(subtitle);

    // Worksheet container
    const outer = document.createElement('div');
    outer.className = 'worksheet-outer';

    const container = document.createElement('div');
    container.className = 'worksheet-container';

    const img = document.createElement('img');
    img.className = 'worksheet-img';
    img.src = `${baseUrl}images/talemaader/${mod.image}`;
    container.appendChild(img);

    // State for current answers inside module
    const userAnswers = JSON.parse(localStorage.getItem(`danskTalemaader_${mod.id}`) || '{}');

    // Create interactive hotspots for each idiom
    mod.items.forEach(item => {
      const isAnswered = userAnswers[item.id] !== undefined;

      const hotspot = document.createElement('div');
      hotspot.className = 'hotspot-mask' + (isAnswered ? ' answered' : '');
      hotspot.style.left = `${item.coords.left}%`;
      hotspot.style.top = `${item.coords.top}%`;
      hotspot.style.width = `${item.coords.width}%`;
      hotspot.style.height = `${item.coords.height}%`;

      if (isAnswered) {
        hotspot.textContent = userAnswers[item.id];
      } else {
        hotspot.textContent = '?';
        hotspot.onclick = () => openDrawer(item, hotspot);
      }

      container.appendChild(hotspot);
    });

    // Create interactive hotspot for the Overemne at the top
    const isOveremneAnswered = userAnswers.overemne !== undefined;
    const overemneWrapper = document.createElement('div');
    overemneWrapper.className = 'overemne-overlay';

    const overemneBtn = document.createElement('button');
    overemneBtn.className = 'overemne-btn' + (isOveremneAnswered ? ' answered' : '');
    overemneBtn.textContent = isOveremneAnswered ? `Overemne: ${userAnswers.overemne}` : 'Tryk for at gætte Overemnet';
    if (!isOveremneAnswered) {
      overemneBtn.onclick = () => {
        const item = {
          id: 'overemne',
          name: mod.overemne,
          options: ['At lykkes', 'Retræte', 'Fejltrin & Kollaps', 'Starte igen']
        };
        openDrawer(item, overemneBtn, true);
      };
    }
    overemneWrapper.appendChild(overemneBtn);
    container.appendChild(overemneWrapper);

    outer.appendChild(container);
    parent.appendChild(outer);

    // Drawer markup
    const drawerOverlay = document.createElement('div');
    drawerOverlay.className = 'drawer-overlay';

    const drawerContent = document.createElement('div');
    drawerContent.className = 'drawer-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'drawer-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => drawerOverlay.classList.remove('active');
    drawerContent.appendChild(closeBtn);

    const drawerTitle = document.createElement('div');
    drawerTitle.className = 'drawer-title';
    drawerContent.appendChild(drawerTitle);

    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    drawerContent.appendChild(optionsList);

    drawerOverlay.appendChild(drawerContent);
    parent.appendChild(drawerOverlay);

    // Handle drawer opening
    function openDrawer(item, targetEl, isOveremne = false) {
      drawerTitle.textContent = isOveremne ? 'Gæt Overemnet:' : 'Hvilken talemåde passer her?';
      optionsList.innerHTML = '';

      // Shuffle options slightly to make it interesting
      const shuffledOptions = [...item.options].sort(() => Math.random() - 0.5);

      shuffledOptions.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option-item';
        btn.textContent = opt;
        btn.onclick = () => {
          if (opt === item.name) {
            // Correct Answer!
            drawerOverlay.classList.remove('active');
            showToast('✓ Helt rigtigt!');
            
            if (isOveremne) {
              userAnswers.overemne = opt;
              targetEl.textContent = `Overemne: ${opt}`;
              targetEl.className = 'overemne-btn answered';
              targetEl.onclick = null;
            } else {
              userAnswers[item.id] = opt;
              targetEl.textContent = opt;
              targetEl.className = 'hotspot-mask answered';
              targetEl.onclick = null;
            }
            
            // Save state
            localStorage.setItem(`danskTalemaader_${mod.id}`, JSON.stringify(userAnswers));
            
            // Check if entire module is complete
            checkModuleCompletion();
          } else {
            // Incorrect Answer
            showToast('❌ Prøv igen!', true);
          }
        };
        optionsList.appendChild(btn);
      });

      drawerOverlay.classList.add('active');
    }

    // Check if all items and overemne are complete
    function checkModuleCompletion() {
      const itemsCount = mod.items.length;
      const answeredCount = Object.keys(userAnswers).filter(k => k !== 'overemne').length;
      const isComplete = (answeredCount === itemsCount) && (userAnswers.overemne !== undefined);

      if (isComplete) {
        progress[mod.id] = true;
        localStorage.setItem('danskTalemaaderProgress', JSON.stringify(progress));
        setTimeout(() => {
          showToast('🏆 Kapitel gennemført! Flot klaret!');
          subView = 'dashboard';
          render();
        }, 1200);
      }
    }
  }

  // --- SUBVIEW 3: THE FINAL CHALLENGE (MODULE 5) ---
  function renderFinalExercise(parent) {
    const title = document.createElement('h1');
    title.textContent = '🏆 Finale: Erfaringens Kredsløb';
    parent.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Gæt de overordnede emner og talemåder for at samle mønsteret.';
    parent.appendChild(subtitle);

    const outer = document.createElement('div');
    outer.className = 'worksheet-outer';

    const container = document.createElement('div');
    container.className = 'worksheet-container';

    const img = document.createElement('img');
    img.className = 'worksheet-img';
    img.src = `${baseUrl}images/talemaader/kredsloeb.png`;
    container.appendChild(img);

    // Final state persistence
    const finalAnswers = JSON.parse(localStorage.getItem('danskTalemaader_final') || '{}');

    // Coordinates of the 5 circles on kredsloeb.png (Aspect ratio 571x1024 - portrait)
    // We will place two labels on each node: one for Emne, one for Idiom.
    const nodesFinal = [
      {
        id: 'top',
        title: 'Forberedelse',
        correctEmne: 'Mental parathed & beslutning',
        correctIdiom: 'At tage skeen i den anden hånd',
        coords: { left: 24, top: 29, width: 52, height: 8 },
        emneOptions: ['Mental parathed & beslutning', 'Målrettet flid & resultat', 'Retræte i handling & handlingsskift'],
        idiomOptions: ['At tage skeen i den anden hånd', 'At ramme plet', 'At kaste håndklædet i ringen']
      },
      {
        id: 'left',
        title: 'Succes',
        correctEmne: 'Målrettet flid & resultat',
        correctIdiom: 'At ramme plet',
        coords: { left: 4, top: 57, width: 44, height: 8 },
        emneOptions: ['Målrettet flid & resultat', 'Fejltrin & procesblokering', 'Mental parathed & beslutning'],
        idiomOptions: ['At ramme plet', 'At træde i spinaten', 'At begynde på en frisk']
      },
      {
        id: 'right',
        title: 'Fejltrin',
        correctEmne: 'Fejltrin & procesblokering',
        correctIdiom: 'At træde i spinaten',
        coords: { left: 52, top: 57, width: 44, height: 8 },
        emneOptions: ['Fejltrin & procesblokering', 'Mental parathed & beslutning', 'Retræte i handling & handlingsskift'],
        idiomOptions: ['At træde i spinaten', 'At tage skeen i den anden hånd', 'At kaste håndklædet i ringen']
      },
      {
        id: 'bottom_left',
        title: 'Start Igen',
        correctEmne: 'Fra forberedelse til handling',
        correctIdiom: 'At komme op på hesten igen',
        coords: { left: 4, top: 90, width: 44, height: 8 },
        emneOptions: ['Fra forberedelse til handling', 'Målrettet flid & resultat', 'Mental parathed & beslutning'],
        idiomOptions: ['At komme op på hesten igen', 'At ramme plet', 'At stikke piben ind']
      },
      {
        id: 'bottom_right',
        title: 'Giv Op',
        correctEmne: 'Retræte i handling & handlingsskift',
        correctIdiom: 'At kaste håndklædet i ringen',
        coords: { left: 52, top: 90, width: 44, height: 8 },
        emneOptions: ['Retræte i handling & handlingsskift', 'Fejltrin & procesblokering', 'Fra forberedelse til handling'],
        idiomOptions: ['At kaste håndklædet i ringen', 'At træde i spinaten', 'At komme op på hesten igen']
      }
    ];

    nodesFinal.forEach(node => {
      const isEmneCorrect = finalAnswers[`${node.id}_emne`] === node.correctEmne;
      const isIdiomCorrect = finalAnswers[`${node.id}_idiom`] === node.correctIdiom;

      const block = document.createElement('div');
      block.className = 'node-final' + (isEmneCorrect && isIdiomCorrect ? ' answered' : '');
      block.style.left = `${node.coords.left}%`;
      block.style.top = `${node.coords.top}%`;
      block.style.width = `${node.coords.width}%`;
      block.style.height = `${node.coords.height}%`;

      if (isEmneCorrect && isIdiomCorrect) {
        block.innerHTML = `
          <div class="label-title">${node.correctEmne}</div>
          <div class="label-value">${node.correctIdiom}</div>
        `;
      } else {
        block.innerHTML = `
          <div class="label-title">${isEmneCorrect ? node.correctEmne : 'Tryk for Emne'}</div>
          <div class="label-value">${isIdiomCorrect ? node.correctIdiom : 'Tryk for Talemåde'}</div>
        `;
        block.onclick = () => openFinalSelector(node, block);
      }

      container.appendChild(block);
    });

    // Overemne Guess for kredsloeb (Title: "Erfaringens Kredsløb")
    const isOveremneCorrect = finalAnswers.overemne === 'Erfaringens Kredsløb';
    const overemneWrapper = document.createElement('div');
    overemneWrapper.className = 'overemne-overlay';
    overemneWrapper.style.top = '10%'; // Adjust height relative to portrait kredsloeb.png

    const overemneBtn = document.createElement('button');
    overemneBtn.className = 'overemne-btn' + (isOveremneCorrect ? ' answered' : '');
    overemneBtn.textContent = isOveremneCorrect ? 'Overemne: Erfaringens Kredsløb' : 'Gæt Overemnet for kredsløbet';
    if (!isOveremneCorrect) {
      overemneBtn.onclick = () => {
        openFinalOveremne(overemneBtn);
      };
    }
    overemneWrapper.appendChild(overemneBtn);
    container.appendChild(overemneWrapper);

    outer.appendChild(container);
    parent.appendChild(outer);

    // Final Drawer
    const drawerOverlay = document.createElement('div');
    drawerOverlay.className = 'drawer-overlay';

    const drawerContent = document.createElement('div');
    drawerContent.className = 'drawer-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'drawer-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => drawerOverlay.classList.remove('active');
    drawerContent.appendChild(closeBtn);

    const drawerTitle = document.createElement('div');
    drawerTitle.className = 'drawer-title';
    drawerContent.appendChild(drawerTitle);

    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    drawerContent.appendChild(optionsList);

    drawerOverlay.appendChild(drawerContent);
    parent.appendChild(drawerOverlay);

    function openFinalSelector(node, targetEl) {
      const isEmneCorrect = finalAnswers[`${node.id}_emne`] === node.correctEmne;
      
      // If Emne is not answered yet, let them answer Emne. Once answered, let them do Idiom.
      if (!isEmneCorrect) {
        drawerTitle.textContent = `Hvilket emne passer til "${node.title}"?`;
        optionsList.innerHTML = '';
        node.emneOptions.forEach(opt => {
          const btn = document.createElement('div');
          btn.className = 'option-item';
          btn.textContent = opt;
          btn.onclick = () => {
            if (opt === node.correctEmne) {
              finalAnswers[`${node.id}_emne`] = opt;
              localStorage.setItem('danskTalemaader_final', JSON.stringify(finalAnswers));
              showToast('✓ Emne korrekt!');
              drawerOverlay.classList.remove('active');
              render();
            } else {
              showToast('❌ Forkert emne!', true);
            }
          };
          optionsList.appendChild(btn);
        });
      } else {
        drawerTitle.textContent = `Hvilken talemåde passer til "${node.title}"?`;
        optionsList.innerHTML = '';
        node.idiomOptions.forEach(opt => {
          const btn = document.createElement('div');
          btn.className = 'option-item';
          btn.textContent = opt;
          btn.onclick = () => {
            if (opt === node.correctIdiom) {
              finalAnswers[`${node.id}_idiom`] = opt;
              localStorage.setItem('danskTalemaader_final', JSON.stringify(finalAnswers));
              showToast('✓ Talemåde korrekt!');
              drawerOverlay.classList.remove('active');
              render();
              checkFinalCompletion();
            } else {
              showToast('❌ Forkert talemåde!', true);
            }
          };
          optionsList.appendChild(btn);
        });
      }
      drawerOverlay.classList.add('active');
    }

    function openFinalOveremne(targetEl) {
      drawerTitle.textContent = 'Gæt kredsløbets samlede mønster / overemne:';
      optionsList.innerHTML = '';
      const options = ['Erfaringens Kredsløb', 'Lykke & Succes', 'Fejl & Genstart', 'Dansk Grammatik'];
      options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option-item';
        btn.textContent = opt;
        btn.onclick = () => {
          if (opt === 'Erfaringens Kredsløb') {
            finalAnswers.overemne = opt;
            localStorage.setItem('danskTalemaader_final', JSON.stringify(finalAnswers));
            showToast('✓ Helt rigtigt! Det samlede mønster er Erfaringens Kredsløb.');
            drawerOverlay.classList.remove('active');
            render();
            checkFinalCompletion();
          } else {
            showToast('❌ Forkert overemne!', true);
          }
        };
        optionsList.appendChild(btn);
      });
      drawerOverlay.classList.add('active');
    }

    function checkFinalCompletion() {
      // Must have all 5 emner and 5 idioms correct + the overemne
      const isComplete = nodesFinal.every(n => 
        finalAnswers[`${n.id}_emne`] === n.correctEmne && 
        finalAnswers[`${n.id}_idiom`] === n.correctIdiom
      ) && finalAnswers.overemne === 'Erfaringens Kredsløb';

      if (isComplete) {
        progress.mod5 = true;
        localStorage.setItem('danskTalemaaderProgress', JSON.stringify(progress));
        setTimeout(() => {
          showToast('🏆 TILLYKKE! Du har gennemført hele mønsteret og mestret talemåderne!');
          subView = 'dashboard';
          render();
        }, 1200);
      }
    }
  }

  // Initial call to render the view
  render();
}
