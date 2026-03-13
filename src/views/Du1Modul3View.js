import { getTranslation } from '../utils/i18n.js';

export function renderDu1Modul3View(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('notes'); // Back to teaching notes
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('du1mod3');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('du1mod3Desc');

    // Cards
    const cardsData = [
        {
            icon: '📅',
            titleKey: 'minHverdag',
            action: () => navigateFn('du1_min_hverdag')
        },
        {
            icon: '🏠',
            titleKey: 'minBolig',
            action: () => alert('Mock: Åbner ' + getTranslation('minBolig'))
        },
        {
            icon: '💼',
            titleKey: 'mitArbejde',
            action: () => alert('Mock: Åbner ' + getTranslation('mitArbejde'))
        }
    ];

    const grid = document.createElement('div');
    grid.className = 'grid';

    cardsData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = data.action;

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.textContent = data.icon;

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = getTranslation(data.titleKey);

        card.appendChild(icon);
        card.appendChild(cardTitle);
        grid.appendChild(card);
    });

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
