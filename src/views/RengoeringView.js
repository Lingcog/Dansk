import { getTranslation, baseUrl } from '../main.js';

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
    contentContainer.className = 'rengoering-content';
    contentContainer.style.display = 'flex';
    contentContainer.style.flexDirection = 'column';
    contentContainer.style.alignItems = 'center';
    contentContainer.style.gap = '2rem';
    contentContainer.style.marginTop = '2rem';
    contentContainer.style.width = '100%';

    // Images section (Gallery style)
    const galleryContainer = document.createElement('div');
    galleryContainer.style.display = 'grid';
    galleryContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    galleryContainer.style.gap = '1.5rem';
    galleryContainer.style.width = '100%';
    galleryContainer.style.maxWidth = '800px';

    ['rent1.png', 'rent2.png'].forEach(fileName => {
        const imgWrapper = document.createElement('div');
        imgWrapper.style.borderRadius = 'var(--border-radius)';
        imgWrapper.style.overflow = 'hidden';
        imgWrapper.style.boxShadow = 'var(--box-shadow)';

        const img = document.createElement('img');
        img.src = `${baseUrl}${fileName}`;
        img.alt = 'Rengøring illustration';
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';

        imgWrapper.appendChild(img);
        galleryContainer.appendChild(imgWrapper);
    });

    // Padlet Link section
    const linkContainer = document.createElement('div');
    linkContainer.className = 'padlet-link-container';
    linkContainer.style.width = '100%';
    linkContainer.style.maxWidth = '600px';
    linkContainer.style.textAlign = 'center';
    linkContainer.style.backgroundColor = 'var(--card-bg)';
    linkContainer.style.padding = '2rem';
    linkContainer.style.borderRadius = 'var(--border-radius)';
    linkContainer.style.boxShadow = 'var(--box-shadow)';
    linkContainer.style.border = '1px solid var(--accent-red)';

    const linkText = document.createElement('p');
    linkText.textContent = getTranslation('rengoeringPadletDesc');
    linkText.style.marginBottom = '1.5rem';
    linkText.style.fontSize = '1.2rem';

    const padletBtn = document.createElement('a');
    padletBtn.href = "https://padlet.com/mibf/jeg-g-r-rent-5udv7g0gczbo7vq9";
    padletBtn.target = "_blank";
    padletBtn.className = 'padlet-btn';
    padletBtn.textContent = getTranslation('padletBtnText');

    // Style properties
    padletBtn.style.display = 'inline-block';
    padletBtn.style.padding = '1rem 3rem';
    padletBtn.style.backgroundColor = 'var(--text-light)';
    padletBtn.style.color = 'var(--bg-deep-red)';
    padletBtn.style.textDecoration = 'none';
    padletBtn.style.borderRadius = '30px';
    padletBtn.style.fontWeight = '700';
    padletBtn.style.fontSize = '1.2rem';
    padletBtn.style.transition = 'all 0.3s ease';
    padletBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';

    padletBtn.onmouseover = () => {
        padletBtn.style.transform = 'translateY(-2px)';
        padletBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    };
    padletBtn.onmouseout = () => {
        padletBtn.style.transform = 'translateY(0)';
        padletBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    };

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
