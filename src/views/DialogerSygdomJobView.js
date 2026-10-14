import { getTranslation, getLang } from '../utils/i18n.js';

export function renderDialogerSygdomJobView(container, navigateFn) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('dialoger_udtale');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = isEn ? '🩺 Illness & Job' : '🩺 Sygdom & job';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = isEn 
        ? 'Step-by-step dialogue training in 4 parts: From calling the doctor and boss to returning to work'
        : 'Trinvis samtaletræning i 4 dele: Fra opkald til lægen og chefen til tilbage på job';
    viewContainer.appendChild(subtitle);

    // Cards Data
    const cardsData = [
        {
            icon: '🩺',
            title: isEn ? '1. An employee calls the doctor' : '1. En ansat ringer til lægen',
            status: 'active',
            action: () => navigateFn('dialog_laege')
        },
        {
            icon: '📞',
            title: isEn ? '2. The employee calls the boss' : '2. Den ansatte ringer til chefen',
            status: 'active',
            action: () => navigateFn('dialog_chef')
        },
        {
            icon: '💊',
            title: isEn ? '3. At the pharmacy' : '3. På apoteket',
            status: 'coming_soon'
        },
        {
            icon: '💼',
            title: isEn ? '4. Back to work after illness' : '4. Tilbage på job efter sygdom',
            status: 'active',
            action: () => navigateFn('dialog_job')
        }
    ];

    const grid = document.createElement('div');
    grid.className = 'grid';

    cardsData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        if (data.status === 'active') {
            card.onclick = data.action;
        } else {
            card.style.opacity = '0.6';
            card.style.cursor = 'not-allowed';
        }

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.textContent = data.icon;

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = data.title;

        if (data.status === 'coming_soon') {
            const badge = document.createElement('span');
            badge.style.fontSize = '0.75rem';
            badge.style.background = 'rgba(255,255,255,0.15)';
            badge.style.padding = '0.2rem 0.5rem';
            badge.style.borderRadius = '8px';
            badge.style.marginLeft = '0.5rem';
            badge.textContent = isEn ? 'Coming soon' : 'Kommer snart';
            cardTitle.appendChild(badge);
        }

        card.appendChild(icon);
        card.appendChild(cardTitle);

        if (data.desc) {
            const cardDesc = document.createElement('div');
            cardDesc.className = 'card-desc';
            cardDesc.textContent = data.desc;
            card.appendChild(cardDesc);
        }

        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
