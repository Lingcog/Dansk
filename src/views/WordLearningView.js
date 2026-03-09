import { getTranslation, getLang } from '../main.js';

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

    // For translation context, sometimes targetWord is Danish, sometimes we want learning word.
    // Let's assume the learning word itself is Danish but the translation shows mapping if needed.
    // For this example, we'll keep the word in Danish if learning target is Danish context, or just show translated word.
    // "Translations" manages this for now as user just wants a mock representation.
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
        <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.9)" stroke-width="2" />
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
  const geminiBtn = document.createElement('a');
  geminiBtn.href = "https://gemini.google.com/gem/1053Zk0akFAs0u3zMgYkZbtae9CO55Tyb?usp=sharing";
  geminiBtn.target = "_blank";
  geminiBtn.className = 'gemini-btn disabled';
  geminiBtn.textContent = getTranslation('geminiBtnText');

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
  viewContainer.appendChild(geminiBtn);

  container.appendChild(viewContainer);
}
