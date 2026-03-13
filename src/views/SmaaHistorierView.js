import { getTranslation } from '../utils/i18n.js';

export function renderSmaaHistorierView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('du2_modul1'); // Back to DU2 Mod 1 menu
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('smaahistorier');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('du1mod3Desc'); // Reusing "Vælg et emne at øve"

    // Cards
    const cardsData = [
        {
            icon: '📝',
            title: 'Lisa og Jens',
            action: () => window.open('https://padlet.com/mibf/historie-om-lisa-og-jens-omv7710nz0tnp49', '_blank')
        },
        {
            icon: '📝',
            title: 'Andrea',
            action: () => window.open('https://padlet.com/mibf/historie-om-andrea-26kzbgxc28yhl436', '_blank')
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
        cardTitle.textContent = data.title;

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
