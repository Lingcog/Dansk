import { getTranslation } from '../main.js';

export function renderMainView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Header Title & Subtitle
    const title = document.createElement('h1');
    title.textContent = getTranslation('title');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('subtitle');

    // Change Language Button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.justifyContent = 'flex-end';
    topBar.style.marginBottom = '20px';
    const langBtn = document.createElement('button');
    langBtn.className = 'back-btn';
    langBtn.textContent = '🌐 ' + getTranslation('selectLanguage');
    langBtn.onclick = () => navigateFn('language');
    topBar.appendChild(langBtn);

    // Cards Data Wrapper
    const cardsData = [
        {
            icon: '✨',
            titleKey: 'dagensOpgave',
            descKey: 'dagensOpgaveDesc',
            action: () => navigateFn('dagens_opgave') // Navigates to DagensOpgaveView
        },
        {
            icon: '🎓',
            titleKey: 'modulTest',
            descKey: 'modulTestDesc',
            action: () => alert('Mock: Gå til Træning til modultest')
        },
        {
            icon: '📘',
            titleKey: 'notes',
            descKey: 'notesDesc',
            action: () => navigateFn('notes') // Navigates to NotesView
        },
        {
            icon: '💬',
            titleKey: 'lavSporgsmal',
            descKey: 'lavSporgsmalDesc',
            action: () => navigateFn('lav_sporgsmal')
        },
        {
            icon: '🗣️',
            titleKey: 'samtaleTraening',
            descKey: 'samtaleTraeningDesc',
            action: () => navigateFn('samtale_traening')
        },
        {
            icon: '✍️',
            titleKey: 'skriveHjaelp',
            descKey: 'skriveHjaelpDesc',
            action: () => navigateFn('skrive_hjaelp')
        },
        {
            icon: '📖',
            titleKey: 'traenGrammatik',
            descKey: 'grammatikDesc',
            action: () => navigateFn('traen_grammatik')
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

        const cardDesc = document.createElement('div');
        cardDesc.className = 'card-desc';
        cardDesc.textContent = getTranslation(data.descKey);

        card.appendChild(icon);
        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        grid.appendChild(card);
    });

    const footer = document.createElement('footer');
    footer.innerHTML = `© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.`;

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(grid);
    viewContainer.appendChild(footer);
    container.appendChild(viewContainer);
}
