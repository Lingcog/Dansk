import { getTranslation, getLang } from '../utils/i18n.js';

export function renderHistorierMenuView(container, navigateFn) {
    const isEn = getLang() === 'en';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || (isEn ? 'Back' : 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('main');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header Title
    const title = document.createElement('h1');
    title.textContent = isEn ? 'Interactive Stories' : 'Interaktive historier';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = isEn ? 'Learn Danish by reading stories' : 'Lær dansk ved at læse historier';
    viewContainer.appendChild(subtitle);

    // Menu Cards
    const cardsData = [
        {
            icon: '🕹️',
            title: isEn ? "Anna's fun day at Netto" : 'Annas sjove dag i Netto',
            desc: isEn 
                ? 'Guide Anna through hilarious situations at Netto while practicing pronunciation and sentences.'
                : 'Styr Anna igennem absurde situationer i Netto, imens du træner udtale og sætninger.',
            action: () => navigateFn('branching_story', { storyId: 'anna_rat' })
        },
        {
            icon: '📖',
            title: isEn ? 'Your Everyday Life' : 'Din dagligdag',
            desc: isEn 
                ? 'Play through everyday situations (language school, green grocer, kitchen), build sentences yourself, and practice pronunciation.'
                : 'Gennemspil hverdags-situationer (sprogskolen, grønthandleren og køkkenet), byg sætningerne selv, og øv udtalen.',
            action: () => navigateFn('interactive_story')
        },
        {
            icon: '🩺',
            title: isEn ? '1. An employee calls the doctor' : '1. En ansat ringer til lægen',
            desc: isEn 
                ? 'Series: Illness & Job (Part 1). Build lines in the word puzzle and speak with the doctor about symptoms.'
                : 'Serie: Sygdom & job (Del 1). Byg replikkerne i ordpuslespillet og tal med lægen om symptomer.',
            action: () => navigateFn('laege_story')
        },
        {
            icon: '📞',
            title: isEn ? '2. The employee calls the boss' : '2. Den ansatte ringer til chefen',
            desc: isEn 
                ? 'Series: Illness & Job (Part 2). Build lines in the word puzzle and call in sick to the boss.'
                : 'Serie: Sygdom & job (Del 2). Byg replikkerne i ordpuslespillet og meld dig syg hos chefen.',
            action: () => navigateFn('chef_story')
        },
        {
            icon: '💼',
            title: isEn ? '4. Back to work after illness' : '4. Tilbage på job efter sygdom',
            desc: isEn 
                ? 'Series: Illness & Job (Part 4). Build your lines in the word puzzle and talk with your manager Lene.'
                : 'Serie: Sygdom & job (Del 4). Byg dine replikker i ordpuslespillet og tal med din leder Lene.',
            action: () => navigateFn('job_story')
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
