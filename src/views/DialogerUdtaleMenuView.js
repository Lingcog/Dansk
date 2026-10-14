import { getTranslation, getLang } from '../utils/i18n.js';

export function renderDialogerUdtaleMenuView(container, navigateFn) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('traen_udtale');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = isEn ? '💬 Dialogues - practice pronunciation in real dialogues' : '💬 Dialoger - træn udtale i rigtige dialoger';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = isEn ? 'Practice pronunciation and lenition of D, R, and G in real-life conversations' : 'Træn udtale og lenisering af D, R og G i virkelighedsnære samtaler';
    viewContainer.appendChild(subtitle);

    // Cards Data (Temaer / Dialoger)
    const cardsData = [
        {
            icon: '🤝',
            title: isEn ? 'Introduce yourself to someone' : 'Præsenter dig for en anden',
            status: 'active',
            action: () => navigateFn('dialog_praesenter')
        },
        {
            icon: '🩺',
            title: isEn ? 'Illness & job' : 'Sygdom & job',
            status: 'active',
            action: () => navigateFn('dialoger_sygdom_job')
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
