import { getTranslation } from '../utils/i18n.js';

export function renderWordLearningView(container, navigateFn) {
  const viewContainer = document.createElement('div');
  viewContainer.className = 'view-container word-learning-container';

  // Top bar with Back Button
  const topBar = document.createElement('div');
  topBar.className = 'top-bar';

  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.textContent = '← ' + getTranslation('back');
  backBtn.onclick = () => navigateFn('dagens_opgave');
  topBar.appendChild(backBtn);

  // Header
  const title = document.createElement('h1');
  title.textContent = getTranslation('laerEtNytOrd');

  // Internal Styles for Semantic Network
  const style = document.createElement('style');
  style.textContent = `
    .semantic-network {
      position: relative;
      width: 100%;
      height: 400px;
      margin: 2rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .network-lines {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
    }
    .node {
      position: absolute;
      background: var(--card-bg);
      padding: 1rem 1.5rem;
      border-radius: 50px;
      box-shadow: var(--box-shadow);
      border: 1px solid rgba(255,255,255,0.1);
      z-index: 1;
      text-align: center;
      min-width: 100px;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    }
    .node.center { background: #4a040b; color: white; border: 2px solid white; scale: 1.1; }
    .node.top { top: 5%; }
    .node.bottom { bottom: 5%; }
    .node.left { left: 5%; }
    .node.right { right: 5%; }
    
    .node .word { font-weight: 700; font-size: 1.1rem; }
    .node .hint { font-size: 0.8rem; opacity: 0.7; margin-top: 2px; }

    .word-explanation {
      margin: 2rem auto;
      max-width: 600px;
      line-height: 1.6;
      opacity: 0.9;
    }

    @media (max-width: 600px) {
      .semantic-network {
        height: auto;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;
      }
      .network-lines { display: none; }
      .node {
        position: static;
        width: 100%;
        max-width: 280px;
        padding: 0.8rem 1.2rem;
      }
      .node.center { order: -1; margin-bottom: 0.5rem; }
    }
  `;
  viewContainer.appendChild(style);

  // Semantic Network Graphic
  const networkContainer = document.createElement('div');
  networkContainer.className = 'semantic-network';

  const nodes = [
    { class: 'node center', label: getTranslation('targetWord'), hint: '' },
    { class: 'node top', label: getTranslation('hypernymWord'), hint: getTranslation('hypernym') },
    { class: 'node bottom', label: getTranslation('hyponymWord'), hint: getTranslation('hyponym') },
    { class: 'node left', label: getTranslation('synonymWord'), hint: getTranslation('synonym') },
    { class: 'node right', label: getTranslation('antonymWord'), hint: getTranslation('antonym') }
  ];

  nodes.forEach(nodeData => {
    const nodeEl = document.createElement('div');
    nodeEl.className = nodeData.class;

    const wordEl = document.createElement('div');
    wordEl.className = 'word';
    wordEl.textContent = nodeData.label;
    nodeEl.appendChild(wordEl);

    if (nodeData.hint) {
      const hintEl = document.createElement('div');
      hintEl.className = 'hint';
      hintEl.textContent = nodeData.hint;
      nodeEl.appendChild(hintEl);
    }

    networkContainer.appendChild(nodeEl);
  });

  // Connecting Lines (SVG)
  networkContainer.insertAdjacentHTML('afterbegin', `
      <svg class="network-lines" xmlns="http://www.w3.org/2000/svg">
        <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
      </svg>
    `);

  // Explanation Text
  const explanation = document.createElement('p');
  explanation.className = 'word-explanation';
  explanation.textContent = getTranslation('wordNetworkExplanation');

  // Consent Checkbox area
  const consentContainer = document.createElement('div');
  consentContainer.className = 'consent-container';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'consent-checkbox';
  checkbox.id = 'gemini-consent';

  const consentText = document.createElement('label');
  consentText.htmlFor = 'gemini-consent';
  consentText.className = 'consent-text';
  consentText.textContent = getTranslation('geminiConsentText');

  consentContainer.appendChild(checkbox);
  consentContainer.appendChild(consentText);

  // Gemini Link Button
  const geminiBtnContainer = document.createElement('div');
  geminiBtnContainer.className = 'gemini-btn-container';

  const geminiBtn = document.createElement('a');
  geminiBtn.href = "https://gemini.google.com/gem/1053Zk0akFAs0u3zMgYkZbtae9CO55Tyb?usp=sharing";
  geminiBtn.target = "_blank";
  geminiBtn.className = 'gemini-btn disabled';
  geminiBtn.textContent = getTranslation('geminiBtnText');

  geminiBtnContainer.appendChild(geminiBtn);

  // Toggle logic
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      geminiBtn.classList.remove('disabled');
    } else {
      geminiBtn.classList.add('disabled');
    }
  });

  viewContainer.appendChild(topBar);
  viewContainer.appendChild(title);
  viewContainer.appendChild(networkContainer);
  viewContainer.appendChild(explanation);
  viewContainer.appendChild(consentContainer);
  viewContainer.appendChild(geminiBtnContainer);

  container.appendChild(viewContainer);
}
