import { getTranslation, getLang } from '../utils/i18n.js';
import { isHCDevMode, setHCDevMode } from '../utils/devMode.js';

export function renderHistorierMenuView(container, navigateFn) {
    const isEn = getLang() === 'en';
    const isDev = isHCDevMode();
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
            action: () => navigateFn('hc_andersen_eventyr'),
            comingSoon: true
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

    let tapCount = 0;
    let tapResetTimer = null;

    cardsData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';

        if (data.comingSoon) {
            if (!isDev) {
                card.classList.add('card-coming-soon');
                card.onclick = (e) => {
                    e.preventDefault();
                    // Hidden 5-tap developer unlock
                    tapCount++;
                    clearTimeout(tapResetTimer);
                    tapResetTimer = setTimeout(() => { tapCount = 0; }, 2000);

                    if (tapCount >= 5) {
                        setHCDevMode(true);
                        alert(isEn ? '🔓 Developer mode activated!' : '🔓 Udviklertilstand aktiveret!');
                        navigateFn('hc_andersen_eventyr');
                        return;
                    }

                    showComingSoonModal();
                };
            } else {
                card.onclick = data.action;
            }
        } else {
            card.onclick = data.action;
        }

        const icon = document.createElement('div');
        icon.className = 'card-icon';
        icon.textContent = data.icon;

        card.appendChild(icon);

        // Add badge if applicable
        if (data.comingSoon) {
            if (!isDev) {
                const badge = document.createElement('div');
                badge.className = 'card-coming-soon-badge';
                badge.innerHTML = `<span>🚧</span> <span>${isEn ? 'Coming soon' : 'Kommer snart'}</span>`;
                card.appendChild(badge);
            } else {
                const badge = document.createElement('div');
                badge.className = 'card-dev-badge';
                badge.innerHTML = `<span>🔓</span> <span>${isEn ? 'Dev Mode (Active)' : 'Udviklertilstand (Aktiv)'}</span>`;
                card.appendChild(badge);
            }
        }

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = data.title;

        const cardDesc = document.createElement('div');
        cardDesc.className = 'card-desc';
        cardDesc.textContent = data.desc;

        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);

    function showComingSoonModal() {
        if (document.getElementById('hc-coming-soon-modal')) return;

        const overlay = document.createElement('div');
        overlay.id = 'hc-coming-soon-modal';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            animation: fadeIn 0.2s ease-out;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 2px solid #eab308;
            border-radius: 24px;
            max-width: 480px;
            width: 100%;
            padding: 2.2rem 2rem;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            color: #f8fafc;
            position: relative;
        `;

        modal.innerHTML = `
            <div style="font-size: 3.2rem; margin-bottom: 0.8rem;">🏰</div>
            <div style="display: inline-block; background: rgba(234, 179, 8, 0.2); border: 1px solid rgba(234, 179, 8, 0.5); color: #fde047; padding: 0.25rem 0.8rem; border-radius: 20px; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1rem;">
                🚧 ${isEn ? 'Under Development' : 'Under udvikling'}
            </div>
            <h2 style="font-size: 1.5rem; font-weight: 800; margin: 0 0 0.8rem; color: #f8fafc;">
                ${isEn ? "H.C. Andersen's Fairy Tales are coming soon!" : 'H.C. Andersens eventyr åbner snart!'}
            </h2>
            <p style="font-size: 0.98rem; line-height: 1.6; color: #cbd5e1; margin-bottom: 1.8rem;">
                ${isEn 
                    ? 'We are busy crafting an interactive fairy tale experience with search-and-find illustrations, sentence flow practice, vocabulary notes, and audio. It will be available very soon!' 
                    : 'Vi lægger i øjeblikket sidste hånd på en eventyrlig læringsflade med interaktive vrimlebilleder, sætningstræning, gloser og oplæsning for danskkursister. Siden åbner inden længe!'}
            </p>
            <button id="hc-close-modal-btn" style="
                background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
                color: #0f172a;
                border: none;
                font-size: 1rem;
                font-weight: 700;
                padding: 0.8rem 2rem;
                border-radius: 12px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(234, 179, 8, 0.4);
                transition: transform 0.15s ease;
            ">
                ${isEn ? 'Got it!' : 'Forstået!'}
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const close = () => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        };

        modal.querySelector('#hc-close-modal-btn').onclick = close;
        overlay.onclick = (e) => {
            if (e.target === overlay) close();
        };
    }
}
