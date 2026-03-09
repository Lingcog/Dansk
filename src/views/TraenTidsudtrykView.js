import { getTranslation, baseUrl } from '../main.js';

export function renderTraenTidsudtrykView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('traenTidsudtryk');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('traenTidsudtrykDesc');

    // Content Container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'tidsudtryk-content';
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
    imageContainer.style.maxWidth = '800px';
    imageContainer.style.borderRadius = 'var(--border-radius)';
    imageContainer.style.overflow = 'hidden';
    imageContainer.style.boxShadow = 'var(--box-shadow)';

    const img = document.createElement('img');
    img.src = `${baseUrl}tid1.png`;
    img.alt = 'Tidsudtryk illustration';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';

    imageContainer.appendChild(img);

    // Consent Checkbox area
    const consentContainer = document.createElement('div');
    consentContainer.className = 'consent-container';
    consentContainer.style.margin = '2rem auto';
    consentContainer.style.padding = '1rem';
    consentContainer.style.backgroundColor = 'rgba(255,255,255,0.1)';
    consentContainer.style.borderRadius = '10px';
    consentContainer.style.display = 'flex';
    consentContainer.style.alignItems = 'center';
    consentContainer.style.gap = '10px';
    consentContainer.style.maxWidth = '600px';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'gemini-consent-tidsudtryk';
    checkbox.style.cursor = 'pointer';

    const consentLabel = document.createElement('label');
    consentLabel.htmlFor = 'gemini-consent-tidsudtryk';
    consentLabel.textContent = getTranslation('geminiConsentText');
    consentLabel.style.cursor = 'pointer';
    consentLabel.style.fontSize = '0.9rem';

    consentContainer.appendChild(checkbox);
    consentContainer.appendChild(consentLabel);

    // Gemini Link Button
    const btnContainer = document.createElement('div');
    btnContainer.style.textAlign = 'center';

    const geminiBtn = document.createElement('a');
    geminiBtn.href = "https://gemini.google.com/share/487eaa7bbb27";
    geminiBtn.target = "_blank";
    geminiBtn.className = 'gemini-btn disabled'; // We'll handle this in style.css or inline
    geminiBtn.textContent = getTranslation('traenTidsudtrykBtnText');

    // Inline styling for disabled state simulation if CSS isn't updated
    const setBtnState = (enabled) => {
        if (enabled) {
            geminiBtn.classList.remove('disabled');
            geminiBtn.style.opacity = '1';
            geminiBtn.style.pointerEvents = 'auto';
            geminiBtn.style.backgroundColor = 'var(--text-light)';
            geminiBtn.style.color = 'var(--bg-deep-red)';
        } else {
            geminiBtn.classList.add('disabled');
            geminiBtn.style.opacity = '0.5';
            geminiBtn.style.pointerEvents = 'none';
            geminiBtn.style.backgroundColor = '#ccc';
            geminiBtn.style.color = '#666';
        }
    };

    // Initial state
    setBtnState(false);

    // Button base styles (reusing logic from skrivehjaelp)
    geminiBtn.style.display = 'inline-block';
    geminiBtn.style.padding = '1rem 3rem';
    geminiBtn.style.textDecoration = 'none';
    geminiBtn.style.borderRadius = '30px';
    geminiBtn.style.fontWeight = '700';
    geminiBtn.style.transition = 'all 0.3s ease';
    geminiBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';

    // Toggle logic
    checkbox.addEventListener('change', (e) => {
        setBtnState(e.target.checked);
    });

    btnContainer.appendChild(geminiBtn);

    contentContainer.appendChild(imageContainer);
    contentContainer.appendChild(consentContainer);
    contentContainer.appendChild(btnContainer);

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(contentContainer);

    container.appendChild(viewContainer);
}
