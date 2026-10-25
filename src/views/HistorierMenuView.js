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
            icon: '🏰',
            title: isEn ? "H.C. Andersen's Fairy Tales" : 'H.C. Andersens eventyr',
            desc: isEn 
                ? 'Read and learn Danish with simplified, shortened editions of classic fairy tales. Includes audio read-aloud, vocabulary notes, and quizzes.'
                : 'Læs og lær dansk med forkortede og forsimplede udgaver af klassiske eventyr. Med indbygget oplæsning, gloser og quiz.',
            action: () => navigateFn('hc_andersen_eventyr')
        },
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
            title: isEn ? 'Illness and job' : 'Sygdom og job',
            desc: isEn 
                ? 'Series in 4 parts: The doctor, the boss, the pharmacy, and back to work. Build lines in the word puzzle and converse.'
                : 'Serie i 4 dele: Lægen, chefen, apoteket og tilbage på job. Byg sætningerne i ordpuslespillet og tal med personerne.',
            action: () => navigateFn('historier_sygdom_job')
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
