import { getTranslation } from '../utils/i18n.js';

export function renderOpdragelseView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('du2_modul5'); // Back to DU2 Mod 5 menu
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('opdragelse');

    // Padlet Card
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cursor = 'pointer';
    card.onclick = () => window.open('https://padlet.com/mibf/fort-l-om-hvordan-du-blev-opdraget-se-opgave-16-side-48-i-fo-zhgtyifmg9e4f5ut', '_blank');

    const icon = document.createElement('div');
    icon.className = 'card-icon';
    icon.textContent = '👨‍👩‍👧‍👦';

    const cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';
    cardTitle.textContent = getTranslation('opdragelse') + ' (padlet)';

    card.appendChild(icon);
    card.appendChild(cardTitle);

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(card);
    container.appendChild(viewContainer);
}
