import { getTranslation } from '../main.js';

export function renderDu1MinHverdagView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('du1_modul3');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('minHverdag');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('minHverdagDesc');

    // Cards - Transport, Madlavning, Rengøring
    const cardsData = [
        {
            icon: '🚌',
            titleKey: 'transportSprogskole',
            action: () => navigateFn('transport_sprogskole')
        },
        {
            icon: '🍳',
            titleKey: 'madlavning',
            action: () => navigateFn('du1_madlavning')
        },
        {
            icon: '🧹',
            titleKey: 'rengoering',
            action: () => navigateFn('du1_rengoering')
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
