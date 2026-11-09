import { getTranslation } from '../utils/i18n.js';
import { dsSvgIcons } from '../utils/designSystemIcons.js';

export function renderUdtaleMenuView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container udtale-menu-view';

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
            icon: '🍏',
            svgIcon: dsSvgIcons.letters(22),
            title: 'Træn bogstaverne D, R og G',
            desc: 'Disse bogstaver forandrer lyd forskellige steder i et ord',
            action: () => navigateFn('traen_bogstaver', { level: 'let' })
        },
        {
            icon: '💬',
            svgIcon: dsSvgIcons.messageSquare(22),
            title: 'Dialoger - træn udtale i rigtige dialoger',
            desc: 'Trinvis samtaletræning i hverdagen',
            action: () => navigateFn('dialoger_udtale')
        },
        {
            icon: '📖',
            svgIcon: dsSvgIcons.bookOpen(22),
            title: getTranslation('menu_laesetraening_title', 'Læsetræning (lyd for lyd)'),
            desc: getTranslation('menu_laesetraening_desc', 'Tæl lyde, byg et ord og hør forskel.'),
            action: () => navigateFn('laesetraening')
        },
        {
            icon: '🅰️',
            svgIcon: dsSvgIcons.type(22),
            title: 'Leg med vokaler',
            desc: 'Træn fonetisk præcision med sjove rimesætninger.',
            action: () => navigateFn('leg_med_vokaler')
        },
        {
            icon: '🎤',
            svgIcon: dsSvgIcons.mic(22),
            title: getTranslation('udtaleDictaphoneTitle') || 'Diktafon - leg med udtale',
            desc: getTranslation('udtaleDictaphoneDesc') || 'Den frie diktafon: Skriv en sætning og test din udtale, eller tal frit fra leveren.',
            action: () => navigateFn('leg_med_udtale')
        },
        {
            icon: '⚡',
            svgIcon: dsSvgIcons.zap(22),
            title: 'Det danske stød',
            desc: 'Træn det unikke danske stød. Rammer du forkert, fanger maskinen et helt andet ord!',
            action: () => navigateFn('det_danske_stoed')
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
        icon.innerHTML = `
            <span class="card-icon-emoji">${data.icon}</span>
            <span class="card-icon-svg" aria-hidden="true">${data.svgIcon}</span>
        `;

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
