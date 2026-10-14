import { getTranslation, getLang } from '../utils/i18n.js';

export function renderHistorierSygdomJobView(container, navigateFn) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('historier_menu');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = isEn ? '🩺 Illness and job' : '🩺 Sygdom og job';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = isEn 
        ? 'Interactive stories in 4 parts: Build your lines in the word puzzle and practice conversations'
        : 'Interaktive historier i 4 dele: Byg dine replikker i ordpuslespillet og træn samtaler';
    viewContainer.appendChild(subtitle);

    // Cards Data
    const cardsData = [
        {
            icon: '🩺',
            title: isEn ? '1. An employee calls the doctor' : '1. En ansat ringer til lægen',
            desc: isEn 
                ? 'Series: Illness & Job (Part 1). Build lines in the word puzzle and speak with the doctor about symptoms.'
                : 'Serie: Sygdom & job (Del 1). Byg replikkerne i ordpuslespillet og tal med lægen om symptomer.',
            status: 'active',
            action: () => navigateFn('laege_story')
        },
        {
            icon: '📞',
            title: isEn ? '2. The employee calls the boss' : '2. Den ansatte ringer til chefen',
            desc: isEn 
                ? 'Series: Illness & Job (Part 2). Build lines in the word puzzle and call in sick to the boss.'
                : 'Serie: Sygdom & job (Del 2). Byg replikkerne i ordpuslespillet og meld dig syg hos chefen.',
            status: 'active',
            action: () => navigateFn('chef_story')
        },
        {
            icon: '💊',
            title: isEn ? '3. At the pharmacy' : '3. På apoteket',
            desc: isEn 
                ? 'Series: Illness & Job (Part 3). Coming soon.'
                : 'Serie: Sygdom & job (Del 3). Kommer snart.',
            status: 'coming_soon'
        },
        {
            icon: '💼',
            title: isEn ? '4. Back to work after illness' : '4. Tilbage på job efter sygdom',
            desc: isEn 
                ? 'Series: Illness & Job (Part 4). Build your lines in the word puzzle and talk with your manager Lene.'
                : 'Serie: Sygdom & job (Del 4). Byg dine replikker i ordpuslespillet og tal med din leder Lene.',
            status: 'active',
            action: () => navigateFn('job_story')
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
