import { getTranslation } from '../utils/i18n.js';

export function renderHistorierMenuView(container, navigateFn) {
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
    title.textContent = 'Interaktive historier';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Lær dansk ved at læse historier';
    viewContainer.appendChild(subtitle);

    // Menu Cards
    const cardsData = [
        {
            icon: '🕹️',
            title: 'Annas sjove dag i Netto',
            desc: 'Styr Anna igennem absurde situationer i Netto, imens du træner udtale og sætninger.',
            action: () => navigateFn('branching_story', { storyId: 'anna_rat' })
        },
        {
            icon: '📖',
            title: 'Din dagligdag',
            desc: 'Gennemspil hverdags-situationer, byg sætningerne selv, og øv udtalen.',
            action: () => navigateFn('interactive_story')
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
