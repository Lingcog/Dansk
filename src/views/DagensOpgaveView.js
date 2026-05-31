import { getTranslation } from '../utils/i18n.js';

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
            icon: '🏗️',
            titleKey: 'howToBuildSentence',
            descKey: 'howToBuildSentenceDesc',
            action: () => navigateFn('grounding')
        },
        {
            icon: '⏰',
            titleKey: 'traenTidsudtryk',
            descKey: 'traenTidsudtrykDesc',
            action: () => navigateFn('traen_tidsudtryk')
        },
        {
            icon: '📖',
            titleKey: 'traenGrammatik',
            descKey: 'grammatikDesc',
            action: () => navigateFn('traen_grammatik')
        },
        {
            icon: '🧩',
            titleKey: 'ordstilling',
            descKey: 'ordstillingDesc',
            action: () => navigateFn('ordstilling')
        },
        {
            icon: '🫂',
            titleKey: 'hvilketOrd',
            descKey: 'hvilketOrdDesc',
            action: () => navigateFn('pronomen')
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

    // --- Support Links ---
    const supportArea = document.createElement('div');
    supportArea.className = 'support-links';
    supportArea.style.display = 'flex';
    supportArea.style.justifyContent = 'center';
    supportArea.style.flexWrap = 'wrap';
    supportArea.style.gap = '1rem';
    supportArea.style.marginTop = '3rem';
    supportArea.style.paddingBottom = '2rem';

    const kofiLink = document.createElement('a');
    kofiLink.href = 'https://ko-fi.com/dansktraening';
    kofiLink.target = '_blank';
    kofiLink.className = 'gemini-btn';
    kofiLink.style.textDecoration = 'none';
    kofiLink.style.backgroundColor = '#ff5e5b';
    kofiLink.textContent = '☕ Buy me a coffee';

    const mpLink = document.createElement('a');
    mpLink.href = 'https://qr.mobilepay.dk/box/0cfe35a7-fccc-4cb9-85e7-b246d3bfa48a/pay-in';
    mpLink.target = '_blank';
    mpLink.className = 'gemini-btn';
    mpLink.style.textDecoration = 'none';
    mpLink.style.backgroundColor = '#5a78ff';
    mpLink.textContent = '📱 Støt med MobilePay';

    supportArea.appendChild(kofiLink);
    supportArea.appendChild(mpLink);
    viewContainer.appendChild(supportArea);

    container.appendChild(viewContainer);
}
