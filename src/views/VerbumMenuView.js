import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderVerbumMenuView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const title = document.createElement('h1');
    title.textContent = getTranslation('verbumLearning');
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('hvilketVerbDesc');
    viewContainer.appendChild(subtitle);

    const grid = document.createElement('div');
    grid.className = 'grid';

    const verbGroups = [
        { key: 'verberHjaelpe', type: 'hjaelpe', icon: '💡' },
        { key: 'verberTilstand', type: 'tilstand', icon: '🏠' },
        { key: 'verberBevaegelse', type: 'bevaegelse', icon: '🚶' },
        { key: 'verberHandling', type: 'handling', icon: '🛠️' },
        { key: 'verberInteraktion', type: 'interaktion', icon: '🗣️' },
        { key: 'verberIndreLiv', type: 'indre_liv', icon: '🧠' },
        { key: 'verberDatid', type: 'datid', icon: '⏳' },
        { key: 'verberDatidRegelm', type: 'datid_regelm', icon: '📝' },
        { key: 'verberTider', type: 'tider', icon: '🌉' }
    ];

    verbGroups.forEach(group => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => navigateFn('verbum_learning', { categoryId: group.type, backView: 'verbum_menu' });

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.textContent = group.icon;

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = getTranslation(group.key);

        card.appendChild(icon);
        card.appendChild(cardTitle);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
