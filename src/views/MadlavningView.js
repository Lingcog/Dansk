import { getTranslation } from '../utils/i18n.js';

export function renderMadlavningView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('du1_min_hverdag');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('madlavning');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('madlavningDesc');

    // Content Container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'thematic-content';

    // Image section
    const imageContainer = document.createElement('div');
    imageContainer.className = 'thematic-image-container';

    const img = document.createElement('img');
    img.src = `${baseUrl}mad.png`;
    img.alt = 'Madlavning illustration';

    imageContainer.appendChild(img);

    // Padlet Link section
    const linkContainer = document.createElement('div');
    linkContainer.className = 'thematic-link-container';

    const linkText = document.createElement('p');
    linkText.className = 'thematic-link-text';
    linkText.textContent = getTranslation('madlavningPadletDesc');

    const padletBtn = document.createElement('a');
    padletBtn.href = "https://padlet.com/mibf/b-rn-og-mad-fvyr130ka0n9f2yu";
    padletBtn.target = "_blank";
    padletBtn.className = 'padlet-btn';
    padletBtn.textContent = getTranslation('padletBtnText');

    linkContainer.appendChild(linkText);
    linkContainer.appendChild(padletBtn);

    contentContainer.appendChild(imageContainer);
    contentContainer.appendChild(linkContainer);

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(contentContainer);

    container.appendChild(viewContainer);
}
