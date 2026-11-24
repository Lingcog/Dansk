import { getTranslation, getLang } from '../utils/i18n.js';
import { shT } from '../utils/samtalehjaelp_translations.js';

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
            iconSvg: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>`,
            title: shT('card_title', getLang()),
            action: () => navigateFn('samtale_hjaelp')
        },
        {
            icon: '🔊',
            title: 'Små lyde der får en samtale til at fungere',
            action: () => navigateFn('samtale_smaalyde')
        },
        {
            icon: '💬',
            title: 'Små ord der får en samtale til at fungere',
            action: () => navigateFn('samtale_smaaord')
        },
        {
            icon: '🎩',
            title: 'Høflighed på dansk',
            action: () => navigateFn('samtale_hoeflighed')
        },
        {
            icon: '🗣',
            titleKey: 'hverdagssamtale',
            action: () => navigateFn('samtale_hverdag')
        },
        {
            icon: '🏠',
            titleKey: 'samtaleBolig',
            action: () => navigateFn('samtale_bolig_menu')
        },
        {
            icon: '💼',
            titleKey: 'samtaleArbejde',
            action: () => navigateFn('samtale_arbejde_menu')
        },
        {
            icon: '🏫',
            titleKey: 'samtaleSprogskole',
            title: 'Samtale om Sprogskole',
            action: () => navigateFn('samtale_sprogskole_menu')
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
        if (data.iconSvg) {
            icon.innerHTML = data.iconSvg;
        } else {
            icon.textContent = data.icon;
        }

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = data.title || getTranslation(data.titleKey);

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
