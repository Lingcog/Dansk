import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';
import { packagesData, getPackageProgress, savePackageProgress } from '../data/talemaaderPackages.js';

export function renderTalemaaderView(container, navigateFn, extraData = {}) {
  // Determine current active package and subview
  let activePkg = extraData.package || 'pkg1';
  let subView = extraData.subView || 'overview';

  let currentPkgData = null;
  let progress = null;
  let isMod5Unlocked = false;

  function updatePkgState() {
    if (activePkg && packagesData[activePkg]) {
      currentPkgData = packagesData[activePkg];
      progress = getPackageProgress(activePkg);
      isMod5Unlocked = progress.mod1 && progress.mod2 && progress.mod3 && progress.mod4;
    }
  }

  updatePkgState();

  const toast = document.createElement('div');
  toast.className = 'toast';
  // Attach to body so it never gets destroyed by container.innerHTML = ''
  document.body.appendChild(toast);

  function showToast(msg, isError = false) {
    toast.textContent = msg;
    toast.className = 'toast show' + (isError ? ' error' : '');
    setTimeout(() => {
      toast.className = 'toast';
    }, 3000);
  }

  function render() {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'talemaader-view';

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
        opacity: 0.5;
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
      .module-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      .module-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--text-color, #ffffff);
      }
      .module-desc {
        font-size: 0.95rem;
        color: rgba(255,255,255,0.7);
        line-height: 1.4;
      }
      .module-status {
        margin-top: 1rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .status-done {
        color: #4caf50;
      }
      .status-locked {
        color: #ff9800;
      }
      .top-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      .back-btn {
        background: transparent;
        color: var(--primary-color, #ffc107);
        border: 1px solid var(--primary-color, #ffc107);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }
      .back-btn:hover {
        background: var(--primary-color, #ffc107);
        color: #121212;
      }
      .worksheet-outer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 1rem;
        border-radius: 12px;
        overflow: hidden;
      }
      .worksheet-container {
        position: relative;
        width: 100%;
        max-width: 1000px; /* Big enough for desktop */
      }
      .worksheet-img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.4);
      }
      .hotspot-mask {
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        border: 2px dashed rgba(255, 255, 255, 0.4);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 0.9rem;
        text-align: center;
        padding: 5px;
      }
      .hotspot-mask:hover {
        background: rgba(255, 193, 7, 0.3);
        border-color: #ffc107;
      }
      .hotspot-mask.answered {
        background: rgba(0, 0, 0, 0.9);
        border-color: #4caf50;
        border-style: solid;
        color: white;
        font-size: 0.75rem;
        line-height: 1.2;
        padding: 4px;
        overflow-y: auto;
        cursor: default;
      }
      
      /* Overemne Guessing Input */
      .overemne-overlay {
        position: absolute;
        top: 2%;
        left: 35%;
        width: 60%;
        height: 10%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .overemne-btn {
        background: rgba(0,0,0,0.8);
        border: 2px dashed #ffc107;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.2s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      }
      .overemne-btn:hover {
        background: #ffc107;
        color: #000;
      }
      .overemne-btn.answered {
        background: rgba(0, 0, 0, 0.9);
        border-color: #4caf50;
        border-style: solid;
        color: white;
        cursor: default;
      }

      /* Drawer Menu */
      .drawer-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6);
        display: none;
        align-items: flex-end;
        z-index: 2000;
      }
      .drawer-overlay.active {
        display: flex;
      }
      .drawer-content {
        background: var(--bg-color, #1a1a2e);
        width: 100%;
        max-height: 55vh;
        overflow-y: auto;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 2rem;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.7);
        animation: slideUp 0.3s ease-out;
        position: relative;
      }
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .drawer-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: white;
      }
      .options-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }
      .option-item {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        padding: 1rem;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        color: white;
        font-size: 1rem;
      }
      .option-item:hover {
        background: rgba(255, 193, 7, 0.1);
        border-color: #ffc107;
      }
      .close-drawer {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        background: none;
        border: none;
        opacity: 0.7;
      }
      .close-drawer:hover {
        opacity: 1;
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
        background: rgba(0, 0, 0, 0.6);
        border: 2px dashed rgba(255, 255, 255, 0.4);
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
        overflow-y: auto;
      }
      .node-final:hover {
        background: rgba(255, 193, 7, 0.3);
        border-color: #ffc107;
      }
      .node-final.answered {
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #4caf50;
        color: white;
      }
      .node-final .label-title {
        font-size: 0.65rem;
        opacity: 0.7;
        text-transform: uppercase;
        margin-bottom: 2px;
        color: #ffc107;
      }
      .node-final .label-value {
        font-size: 0.75rem;
        font-weight: 700;
        color: white;
      }
      .node-final.answered .label-title {
        color: #4caf50;
      }
      .node-final.answered .label-value {
        color: white;
      }

      /* Master-ark / Finale Selects */
      .finale-select {
        position: absolute;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        padding: 4px;
        font-size: 0.85rem;
        cursor: pointer;
        width: 100%;
        height: 100%;
        outline: none;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      }
      .finale-select:focus {
        border-color: #ffc107;
      }
      .finale-select.correct {
        border-color: #4caf50;
        background: rgba(76, 175, 80, 0.2);
        color: #4caf50;
        font-weight: bold;
        pointer-events: none;
      }

      .final-overemne-overlay {
        position: absolute;
        top: 2%;
        left: 20%;
        width: 60%;
        height: 8%;
      }
      .final-overemne-select {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        color: #ffc107;
        border: 2px dashed #ffc107;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
        padding: 5px 10px;
        cursor: pointer;
        outline: none;
        text-align: center;
      }
      .final-overemne-select.correct {
        border-color: #4caf50;
        color: #4caf50;
        pointer-events: none;
      }

      .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .toast.show {
        opacity: 1;
      }
      .toast.error {
        background: #d32f2f;
      }
    `;
    viewContainer.appendChild(style);

    // Top Bar (Back Button)
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => {
      if (subView === 'overview') {
        navigateFn('main');
      } else if (subView === 'dashboard') {
        subView = 'overview';
        render();
      } else {
        subView = 'dashboard';
        render();
      }
    };
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Render Subview
    if (subView === 'overview') {
      renderOverview(viewContainer);
    } else if (subView === 'dashboard') {
      renderDashboard(viewContainer);
    } else if (subView.startsWith('module') && subView !== 'module5') {
      const moduleId = subView.replace('module', 'mod');
      renderModuleExercise(viewContainer, currentPkgData.modules[moduleId]);
    } else if (subView === 'module5') {
      renderFinalExercise(viewContainer);
    }

    container.appendChild(viewContainer);
  }

  // --- SUBVIEW 0: OVERVIEW ---
  function renderOverview(parent) {
    const title = document.createElement('h1');
    title.textContent = 'Talemåder & Mønstre';
    parent.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Lær danske talemåder trin-for-trin og find de overordnede mønstre';
    parent.appendChild(subtitle);

    const overviewDiv = document.createElement('div');
    overviewDiv.className = 'talemaader-dashboard';

    const cardGrid = document.createElement('div');
    cardGrid.className = 'module-grid';

    Object.keys(packagesData).forEach(pkgKey => {
      const pkg = packagesData[pkgKey];
      const card = document.createElement('div');
      card.className = 'module-card';
      card.onclick = () => {
        activePkg = pkgKey;
        updatePkgState();
        subView = 'dashboard';
        render();
      };

      const cardTitle = document.createElement('div');
      cardTitle.className = 'module-title';
      cardTitle.textContent = pkg.title;
      card.appendChild(cardTitle);

      const cardDesc = document.createElement('div');
      cardDesc.className = 'module-desc';
      cardDesc.textContent = pkg.desc;
      card.appendChild(cardDesc);

      const actionBtn = document.createElement('button');
      actionBtn.className = 'module-action-btn';
      actionBtn.textContent = 'Åbn flade';
      card.appendChild(actionBtn);

      cardGrid.appendChild(card);
    });

    overviewDiv.appendChild(cardGrid);
    parent.appendChild(overviewDiv);
  }

  // --- SUBVIEW 1: DASHBOARD ---
  function renderDashboard(parent) {
    const title = document.createElement('h1');
    title.textContent = currentPkgData.title;
    parent.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Gennemfør kapitlerne for at låse op for finalen ("Erfaringens Kredsløb").';
    parent.appendChild(subtitle);

    const dashboard = document.createElement('div');
    dashboard.className = 'talemaader-dashboard';

    const cardGrid = document.createElement('div');
    cardGrid.className = 'module-grid';

    const modules = currentPkgData.modules;

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
    if (currentPkgData.arcadeGames && currentPkgData.arcadeGames.length > 0) {
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

      currentPkgData.arcadeGames.forEach((game) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'arcade-wrapper';
        gameCard.style.padding = '2rem';
        gameCard.style.background = 'rgba(255,255,255,0.03)';
        gameCard.style.border = '2px solid rgba(255,255,255,0.08)';
        gameCard.style.borderRadius = '16px';
        gameCard.style.display = 'flex';
        gameCard.style.flexDirection = 'column';
        gameCard.style.alignItems = 'center';
        gameCard.style.textAlign = 'center';
        gameCard.style.transition = 'all 0.3s ease';

        gameCard.onmouseenter = () => {
          gameCard.style.borderColor = '#ffc107';
          gameCard.style.transform = 'translateY(-3px)';
        };
        gameCard.onmouseleave = () => {
          gameCard.style.borderColor = 'rgba(255,255,255,0.08)';
          gameCard.style.transform = 'none';
        };

        const gIcon = document.createElement('div');
        gIcon.style.fontSize = '3rem';
        gIcon.style.marginBottom = '1rem';
        gIcon.textContent = game.icon || '🕹️';
        gameCard.appendChild(gIcon);

        const gTitle = document.createElement('h3');
        gTitle.style.fontSize = '1.25rem';
        gTitle.style.fontWeight = '700';
        gTitle.style.marginBottom = '0.5rem';
        gTitle.style.color = 'white';
        gTitle.textContent = game.title;
        gameCard.appendChild(gTitle);

        const gDesc = document.createElement('p');
        gDesc.style.fontSize = '0.9rem';
        gDesc.style.color = '#ccc';
        gDesc.style.lineHeight = '1.4';
        gDesc.style.marginBottom = '1.5rem';
        gDesc.textContent = game.desc || 'Kan du matche de fine illustrationer med de rigtige danske talemåder?';
        gameCard.appendChild(gDesc);

        const gLink = document.createElement('a');
        gLink.href = game.url;
        gLink.target = '_blank';
        gLink.className = 'module-action-btn';
        gLink.textContent = 'Start spillet ➜';
        gLink.style.textDecoration = 'none';
        gLink.style.display = 'inline-block';
        gameCard.appendChild(gLink);

        frameContainer.appendChild(gameCard);
      });

      arcadeSection.appendChild(frameContainer);
      dashboard.appendChild(arcadeSection);
    }
    parent.appendChild(dashboard);
  }

  // --- SUBVIEW 2: INDIVIDUAL MODULES (1-4) ---
  function renderModuleExercise(parent, mod) {
    const title = document.createElement('h1');
    title.textContent = 'Kapitel ' + mod.id.replace('mod', '');
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
    const userAnswers = JSON.parse(localStorage.getItem(`danskTalemaader_${activePkg}_${mod.id}`) || '{}');

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
          options: Object.values(currentPkgData.modules).map(m => m.overemne)
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
            localStorage.setItem(`danskTalemaader_${activePkg}_${mod.id}`, JSON.stringify(userAnswers));
            
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
        savePackageProgress(activePkg, progress);
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
    img.src = `${baseUrl}images/talemaader/${currentPkgData.finale.image}`;
    container.appendChild(img);

    // Final state persistence
    const finalAnswers = JSON.parse(localStorage.getItem(`danskTalemaader_${activePkg}_final`) || '{}');

    const nodesFinal = currentPkgData.finale.nodes;

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

    // Overemne Guess for kredsloeb
    const isOveremneCorrect = finalAnswers.overemne === currentPkgData.finale.expectedOveremne;
    const overemneWrapper = document.createElement('div');
    overemneWrapper.className = 'overemne-overlay';
    overemneWrapper.style.top = '10%'; // Adjust height relative to portrait kredsloeb.png

    const overemneBtn = document.createElement('button');
    overemneBtn.className = 'overemne-btn' + (isOveremneCorrect ? ' answered' : '');
    overemneBtn.textContent = isOveremneCorrect ? `Overemne: ${currentPkgData.finale.expectedOveremne}` : 'Gæt Overemnet for kredsløbet';
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
              localStorage.setItem(`danskTalemaader_${activePkg}_final`, JSON.stringify(finalAnswers));
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
              localStorage.setItem(`danskTalemaader_${activePkg}_final`, JSON.stringify(finalAnswers));
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
      const options = currentPkgData.finale.overemneOptions;
      options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option-item';
        btn.textContent = opt;
        btn.onclick = () => {
          if (opt === currentPkgData.finale.expectedOveremne) {
            finalAnswers.overemne = opt;
            localStorage.setItem(`danskTalemaader_${activePkg}_final`, JSON.stringify(finalAnswers));
            showToast(`✓ Helt rigtigt! Det samlede mønster er ${currentPkgData.finale.expectedOveremne}.`);
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
      ) && finalAnswers.overemne === currentPkgData.finale.expectedOveremne;

      if (isComplete) {
        progress.mod5 = true;
        savePackageProgress(activePkg, progress);
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
