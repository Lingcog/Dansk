import { getTranslation, baseUrl } from '../main.js';

export function renderTransportSprogskoleView(container, navigateFn) {
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
    title.textContent = getTranslation('transportSprogskole');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('transportDesc');

    // Content Container for side-by-side or stacked layout
    const contentContainer = document.createElement('div');
    contentContainer.className = 'transport-content';
    contentContainer.style.display = 'flex';
    contentContainer.style.flexDirection = 'column';
    contentContainer.style.alignItems = 'center';
    contentContainer.style.gap = '2rem';
    contentContainer.style.marginTop = '2rem';
    contentContainer.style.width = '100%';

    // Image section
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.style.width = '100%';
    imageContainer.style.maxWidth = '600px';
    imageContainer.style.borderRadius = 'var(--border-radius)';
    imageContainer.style.overflow = 'hidden';
    imageContainer.style.boxShadow = 'var(--box-shadow)';

    const img = document.createElement('img');
    // Referencing the image sitting in the public folder
    img.src = `${baseUrl}Gemini_Generated_Image_bnobabnobabnobab.png`;
    img.alt = 'Transport illustration';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';

    imageContainer.appendChild(img);

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
    linkText.textContent = getTranslation('padletDesc');
    linkText.style.marginBottom = '1.5rem';
    linkText.style.fontSize = '1.2rem';

    const padletBtn = document.createElement('a');
    padletBtn.href = "https://padlet.com/mibf/hvordan-kommer-du-til-sprogskole-gm97y985khw1csk1";
    padletBtn.target = "_blank";
    padletBtn.className = 'padlet-btn';
    padletBtn.textContent = getTranslation('padletBtnText');

    // Styling the button similar to the gemini one but maybe a different color to distinguish
    padletBtn.style.display = 'inline-block';
    padletBtn.style.padding = '1rem 3rem';
    padletBtn.style.backgroundColor = 'var(--text-light)'; // White button for contrast against deep red
    padletBtn.style.color = 'var(--bg-deep-red)';
    padletBtn.style.textDecoration = 'none';
    padletBtn.style.borderRadius = '30px';
    padletBtn.style.fontWeight = '700';
    padletBtn.style.fontSize = '1.2rem';
    padletBtn.style.transition = 'all 0.3s ease';
    padletBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';

    // Hover effects (using CSS classes would be cleaner, but doing inline for quick scaffolding of unique button)
    padletBtn.onmouseover = () => {
        padletBtn.style.transform = 'translateY(-2px)';
        padletBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        padletBtn.style.outline = '2px solid var(--text-light)';
        padletBtn.style.outlineOffset = '2px';
    };
    padletBtn.onmouseout = () => {
        padletBtn.style.transform = 'translateY(0)';
        padletBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        padletBtn.style.outline = 'none';
    };

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
