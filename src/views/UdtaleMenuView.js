import { getTranslation } from '../utils/i18n.js';

export function renderUdtaleMenuView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = getTranslation('traenUdtale') || 'Træn udtale';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('udtaleSubtitle') || 'Vælg hvordan du vil træne din udtale';
    viewContainer.appendChild(subtitle);

    // Menu Cards
    const cardsData = [
        {
            icon: '🅰️',
            title: getTranslation('udtaleLettersTitle') || 'Træn bogstaverne D, R og G',
            desc: getTranslation('udtaleLettersDesc') || 'Målrettet træning af de svære danske bogstaver med specifikke sætninger.',
            action: () => navigateFn('traen_bogstaver')
        },
        {
            icon: '🎤',
            title: getTranslation('udtaleDictaphoneTitle') || 'Diktafon - leg med udtale',
            desc: getTranslation('udtaleDictaphoneDesc') || 'Den frie diktafon: Skriv en sætning og test din udtale, eller tal frit fra leveren.',
            action: () => navigateFn('leg_med_udtale')
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

        const cardDesc = document.createElement('div');
        cardDesc.className = 'card-desc';
        cardDesc.textContent = data.desc;

        card.appendChild(icon);
        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
