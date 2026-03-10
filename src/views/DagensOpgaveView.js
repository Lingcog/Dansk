import { getTranslation } from '../main.js';

export function renderDagensOpgaveView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar with Back Button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('dagensOpgave');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('dagensOpgaveDesc');

    // Cards Data Wrapper
    const cardsData = [
        {
            icon: '🧠',
            titleKey: 'laerEtNytOrd',
            descKey: 'laerEtNytOrdDesc',
            action: () => navigateFn('word_learning')
        },
        {
            icon: '⏰',
            titleKey: 'traenTidsudtryk',
            descKey: 'traenTidsudtrykDesc',
            action: () => navigateFn('traen_tidsudtryk')
        },
        {
            icon: '🧩',
            titleKey: 'ordstillingLet',
            descKey: 'levelA1',
            action: () => navigateFn('ordstilling', { level: 'A1' })
        },
        {
            icon: '🧩',
            titleKey: 'ordstillingSvaer',
            descKey: 'levelA2',
            action: () => navigateFn('ordstilling', { level: 'A2' })
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

        if (data.descKey) {
            const cardDesc = document.createElement('div');
            cardDesc.className = 'card-desc';
            cardDesc.textContent = getTranslation(data.descKey);
            card.appendChild(cardDesc);
        }

        grid.appendChild(card);
    });

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
