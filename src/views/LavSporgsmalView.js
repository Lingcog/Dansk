import { getTranslation, baseUrl } from '../main.js';

export function renderLavSporgsmalView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('lavSporgsmal');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('lavSporgsmalDesc');

    // Image section
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.style.width = '100%';
    imageContainer.style.maxWidth = '600px';
    imageContainer.style.margin = '2rem auto';
    imageContainer.style.borderRadius = 'var(--border-radius)';
    imageContainer.style.overflow = 'hidden';
    imageContainer.style.boxShadow = 'var(--box-shadow)';

    const img = document.createElement('img');
    img.src = `${baseUrl}questions.png`;
    img.alt = 'Spørgsmålsdannelse illustration';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';

    imageContainer.appendChild(img);

    // Consent Checkbox area
    const consentContainer = document.createElement('div');
    consentContainer.className = 'consent-container';
    consentContainer.style.margin = '2rem auto';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'consent-checkbox';
    checkbox.id = 'gemini-consent-lav-sporgsmal';

    const consentText = document.createElement('label');
    consentText.htmlFor = 'gemini-consent-lav-sporgsmal';
    consentText.className = 'consent-text';
    consentText.textContent = getTranslation('geminiConsentText');

    consentContainer.appendChild(checkbox);
    consentContainer.appendChild(consentText);

    // Gemini Link Button
    const geminiBtnContainer = document.createElement('div');
    geminiBtnContainer.style.textAlign = 'center';

    const geminiBtn = document.createElement('a');
    geminiBtn.href = "https://gemini.google.com/gem/1OKZRFhv_TlP2M32ApMHWsFVh4aCLHdNU?usp=sharing";
    geminiBtn.target = "_blank";
    geminiBtn.className = 'gemini-btn disabled';
    geminiBtn.textContent = getTranslation('lavSporgsmalBtnText');

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
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(imageContainer);
    viewContainer.appendChild(consentContainer);
    viewContainer.appendChild(geminiBtnContainer);

    container.appendChild(viewContainer);
}
