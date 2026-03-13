import { getTranslation } from '../utils/i18n.js';

export function renderSkrivehjaelpView(container, navigateFn) {
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
    title.textContent = getTranslation('skriveHjaelp');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('skriveHjaelpDesc');

    // Consent Checkbox area
    const consentContainer = document.createElement('div');
    consentContainer.className = 'consent-container';
    consentContainer.style.margin = '2rem auto';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'consent-checkbox';
    checkbox.id = 'gemini-consent-skrive';

    const consentText = document.createElement('label');
    consentText.htmlFor = 'gemini-consent-skrive';
    consentText.className = 'consent-text';
    consentText.textContent = getTranslation('geminiConsentText');

    consentContainer.appendChild(checkbox);
    consentContainer.appendChild(consentText);

    // Gemini Link Button
    const geminiBtnContainer = document.createElement('div');
    geminiBtnContainer.style.textAlign = 'center';

    const geminiBtn = document.createElement('a');
    geminiBtn.href = "https://gemini.google.com/gem/1Ke_Ges6JxMDC51hTM744lHSQm_fi9BhQ?usp=sharing";
    geminiBtn.target = "_blank";
    geminiBtn.className = 'gemini-btn disabled';
    geminiBtn.textContent = getTranslation('skriveHjaelpBtnText');

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
    viewContainer.appendChild(consentContainer);
    viewContainer.appendChild(geminiBtnContainer);

    container.appendChild(viewContainer);
}
