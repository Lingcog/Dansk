import { getTranslation } from '../main.js';

export function renderSamtaleTraeningView(container, navigateFn) {
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
    title.textContent = getTranslation('samtaleTraening');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('samtaleTraeningDesc');

    // Cards
    const cardsData = [
        {
            icon: '🗣',
            titleKey: 'hverdagssamtale',
            action: () => navigateFn('samtale_hverdag')
        },
        {
            icon: '🏠',
            titleKey: 'samtaleBolig',
            action: () => alert('Mock: Åbner ' + getTranslation('samtaleBolig'))
        },
        {
            icon: '💼',
            titleKey: 'samtaleArbejde',
            action: () => alert('Mock: Åbner ' + getTranslation('samtaleArbejde'))
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
