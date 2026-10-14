import { getTranslation } from '../utils/i18n.js';

export function renderDialogerUdtaleMenuView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('traen_udtale');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = '💬 Dialoger - træn udtale i rigtige dialoger';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Træn udtale og lenisering af D, R og G i virkelighedsnære samtaler';
    viewContainer.appendChild(subtitle);

    // Section title
    const sectionHeader = document.createElement('h2');
    sectionHeader.style.margin = '2rem 0 1rem 0';
    sectionHeader.style.fontSize = '1.35rem';
    sectionHeader.style.color = '#ffcc00';
    sectionHeader.textContent = '📋 Serie: Sygdom & job';
    viewContainer.appendChild(sectionHeader);

    // Cards Data
    const cardsData = [
        {
            icon: '🩺',
            title: '1. En ansat ringer til lægen',
            status: 'active',
            action: () => navigateFn('dialog_laege')
        },
        {
            icon: '📞',
            title: '2. Den ansatte ringer til chefen',
            status: 'active',
            action: () => navigateFn('dialog_chef')
        },
        {
            icon: '💊',
            title: '3. På apoteket',
            status: 'coming_soon'
        },
        {
            icon: '💼',
            title: '4. Tilbage på job efter sygdom',
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
            badge.textContent = 'Kommer snart';
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
