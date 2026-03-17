import { getTranslation } from '../utils/i18n.js';

export function renderRengoeringView(container, navigateFn) {
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
    title.textContent = getTranslation('rengoering');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('rengoeringDesc');

    // Content Container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'thematic-content';

    // Images section (Gallery style)
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'grid'; // Reusing grid class
    galleryContainer.style.maxWidth = '800px';

    ['rent1.png', 'rent2.png'].forEach(fileName => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'thematic-image-container';

        const img = document.createElement('img');
        img.src = `${baseUrl}${fileName}`;
        img.alt = 'Rengøring illustration';

        imgWrapper.appendChild(img);
        galleryContainer.appendChild(imgWrapper);
    });

    // Padlet Link section
    const linkContainer = document.createElement('div');
    linkContainer.className = 'thematic-link-container';

    const linkText = document.createElement('p');
    linkText.className = 'thematic-link-text';
    linkText.textContent = getTranslation('rengoeringPadletDesc');

    const padletBtn = document.createElement('a');
    padletBtn.href = "https://padlet.com/mibf/jeg-g-r-rent-5udv7g0gczbo7vq9";
    padletBtn.target = "_blank";
    padletBtn.className = 'padlet-btn';
    padletBtn.textContent = getTranslation('padletBtnText');

    linkContainer.appendChild(linkText);
    linkContainer.appendChild(padletBtn);

    contentContainer.appendChild(galleryContainer);
    contentContainer.appendChild(linkContainer);

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(contentContainer);

    container.appendChild(viewContainer);
}
