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
      .word-learning-container h1 { margin-bottom: 2rem; }
      .task-selection-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }
      .task-choice-card {
        background: var(--card-bg);
        border-radius: 20px;
        padding: 2rem;
        cursor: pointer;
        border: 2px solid rgba(255,255,255,0.1);
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .task-choice-card:hover {
        transform: translateY(-10px);
        border-color: var(--primary-color);
        background: var(--card-hover);
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      }
      .task-choice-icon { font-size: 3rem; margin-bottom: 1rem; }
      .task-choice-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: white; }
      .task-choice-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.4; }

      /* Removed local exercise-card and full-width-img styles - now global in style.css */

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
    const grid = document.createElement('div');
    grid.className = 'task-selection-grid';

    const tasks = [
      { id: 'exercise_semantic', title: 'laerEtNytOrd', desc: 'laerEtNytOrdDesc', icon: '🎨' },
      { id: 'exercise_naboord', title: 'laerNaboord', desc: 'laerNaboordDesc', icon: '👯' },
      { id: 'exercise_ordfamilier', title: 'laerOrdfamilier', desc: 'laerOrdfamilierDesc', icon: '🌳' },
      { id: 'exercise_historier', title: 'laerNyeOrdHistorier', desc: 'laerNyeOrdHistorierDesc', icon: '📖' }
    ];

    tasks.forEach(task => {
      const choice = document.createElement('div');
      choice.className = 'task-choice-card';
      choice.onclick = () => { currentState = task.id; render(); };

      const icon = document.createElement('div');
      icon.className = 'task-choice-icon';
      icon.textContent = task.icon;
      choice.appendChild(icon);

      const t = document.createElement('div');
      t.className = 'task-choice-title';
      t.textContent = getTranslation(task.title);
      choice.appendChild(t);

      const d = document.createElement('div');
      d.className = 'task-choice-desc';
      d.textContent = getTranslation(task.desc);
      choice.appendChild(d);

      grid.appendChild(choice);
    });

    parent.appendChild(grid);

    // --- Support Links ---
    const supportArea = document.createElement('div');
    supportArea.className = 'support-links';
    supportArea.style.display = 'flex';
    supportArea.style.justifyContent = 'center';
    supportArea.style.flexWrap = 'wrap';
    supportArea.style.gap = '1rem';
    supportArea.style.marginTop = '3rem';
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
      el.innerHTML = `<img src="${baseUrl}${n.img}" alt="${n.label}"><div class="word">${n.label}</div>`;
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
