import { getTranslation, appState } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderDanskKulturView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Navigation Bar
    const navBar = document.createElement('div');
    navBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('main');
    navBar.appendChild(backBtn);
    viewContainer.appendChild(navBar);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('laerDanskKultur');
    viewContainer.appendChild(title);

    // Content Card
    const card = document.createElement('div');
    card.className = 'exercise-card';

    const t = document.createElement('h2');
    t.className = 'exercise-card-title';
    t.textContent = getTranslation('laerDanskKultur');
    card.appendChild(t);

    const img = document.createElement('img');
    img.src = `${baseUrl}kultur.png`;
    img.className = 'full-width-img';
    img.alt = 'Dansk Kultur';
    card.appendChild(img);

    const exp = document.createElement('p');
    exp.className = 'word-explanation';
    exp.textContent = getTranslation('laerDanskKulturDesc');
    card.appendChild(exp);

    renderAIControl(card, "https://gemini.google.com/gem/1pobzG-1uJCU3qCn-wv7VoLUcUujpbXXv?usp=sharing");
    viewContainer.appendChild(card);

    container.appendChild(viewContainer);

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
}
