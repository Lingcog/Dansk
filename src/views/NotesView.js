import { getTranslation } from '../utils/i18n.js';

export function renderNotesView(container, navigateFn) {
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

    // Header Title & Subtitle
    const title = document.createElement('h1');
    title.textContent = getTranslation('notes');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('notesDesc');

    const checkModuleAccess = (moduleId, targetNavigate, correctCode) => {
        const savedCode = localStorage.getItem(`access_${moduleId}`);
        if (savedCode === correctCode) {
            navigateFn(targetNavigate);
            return;
        }

        const input = prompt(getTranslation('enterPassword'));
        if (input === correctCode) {
            localStorage.setItem(`access_${moduleId}`, correctCode);
            navigateFn(targetNavigate);
        } else if (input !== null) {
            alert('Forkert adgangskode / Incorrect password');
        }
    };

    // Cards Data Wrapper
    const cardsData = [
        {
            icon: '📓',
            titleKey: 'du1mod3',
            descKey: '',
            action: () => checkModuleAccess('du1_mod3', 'du1_modul3', 'dansk103')
        },
        {
            icon: '📖',
            titleKey: 'du2mod1',
            descKey: '',
            action: () => checkModuleAccess('du2_mod1', 'du2_modul1', 'dansk307')
        },
        {
            icon: '📂',
            titleKey: 'du2mod5',
            descKey: '',
            action: () => navigateFn('du2_modul5')
        },
        {
            icon: '📚',
            titleKey: 'du3mod4',
            descKey: '',
            action: () => alert('Mock: Åbner DU3, modul 4')
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

    const footer = document.createElement('footer');
    footer.innerHTML = `© 2026 Træning i dansk. Udviklet af <a href="https://dk.linkedin.com/in/mikael-fabrin-2805b28b" target="_blank">Mikael Fabrin</a>.`;

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(grid);
    viewContainer.appendChild(footer);
    container.appendChild(viewContainer);
}
