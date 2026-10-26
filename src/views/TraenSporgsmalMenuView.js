import { getTranslation } from '../utils/i18n.js';
import { targetTrainingTracks } from '../utils/target_training_data.js';

export function renderTraenSporgsmalMenuView(container, navigateFn) {
    const t = (key, fallback) => {
        const val = getTranslation(key);
        return (!val || val === key) ? fallback : val;
    };

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';
    viewContainer.style.maxWidth = '900px';
    viewContainer.style.margin = '0 auto';
    viewContainer.style.padding = '1rem';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.alignItems = 'center';
    topBar.style.marginBottom = '1.5rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${t('back', 'Tilbage')}`;
    backBtn.onclick = () => navigateFn('lav_sporgsmal');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Header
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '2.5rem';

    const title = document.createElement('h1');
    title.textContent = t('sporgsmal_target_training_title', 'Målrettet Træning');
    title.style.fontSize = '2.2rem';
    title.style.marginBottom = '0.5rem';

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = t('sporgsmal_target_menu_desc', 'Vælg en træningsbane for at træne semantik (Hv-ord), ja/nej-spørgsmål og ordstilling.');
    subtitle.style.color = 'var(--text-muted, #aaa)';
    subtitle.style.fontSize = '1.15rem';

    header.appendChild(title);
    header.appendChild(subtitle);
    viewContainer.appendChild(header);

    // Grid Container for 6 cards
    const grid = document.createElement('div');
    grid.className = 'target-tracks-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    grid.style.gap = '1.5rem';

    targetTrainingTracks.forEach(track => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.style.margin = '0';
        card.style.padding = '1.5rem';
        card.style.borderRadius = '14px';
        card.style.background = 'var(--card-bg, rgba(255, 255, 255, 0.05))';
        card.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';
        card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease';
        card.style.cursor = 'pointer';

        card.onmouseenter = () => {
            card.style.transform = 'translateY(-4px)';
            card.style.borderColor = 'var(--accent-color, #4a90e2)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
        };
        card.onmouseleave = () => {
            card.style.transform = 'none';
            card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            card.style.boxShadow = 'none';
        };

        // Header portion
        const cardHeader = document.createElement('div');

        const cardTitle = document.createElement('h2');
        cardTitle.innerHTML = `${track.icon} ${t(track.titleKey, track.defaultTitle)}`;
        cardTitle.style.fontSize = '1.35rem';
        cardTitle.style.marginBottom = '0.6rem';
        cardTitle.style.color = '#ffffff';

        const cardDesc = document.createElement('p');
        cardDesc.textContent = t(track.descKey, track.defaultDesc);
        cardDesc.style.color = 'var(--text-muted, #aaa)';
        cardDesc.style.fontSize = '0.95rem';
        cardDesc.style.lineHeight = '1.4';
        cardDesc.style.marginBottom = '1.25rem';

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardDesc);
        card.appendChild(cardHeader);

        // Click on card body opens track at tab 1
        card.onclick = (e) => {
            // Only trigger if clicked outside action pills
            if (!e.target.closest('.track-action-pill')) {
                navigateFn('traen_sporgsmal_track', { trackId: track.id, initialTab: 1 });
            }
        };

        // Exercise Pills / Direct Launcher buttons
        const pillsContainer = document.createElement('div');
        pillsContainer.style.display = 'flex';
        pillsContainer.style.flexDirection = 'column';
        pillsContainer.style.gap = '0.5rem';
        pillsContainer.style.marginTop = 'auto';

        const exercises = [
            { tab: 1, icon: '🎯', labelKey: 'traen_badge_semantic', defaultLabel: '1. Semantisk (Hv-ord)', color: 'rgba(74, 144, 226, 0.15)', border: 'rgba(74, 144, 226, 0.4)', text: '#90caf9' },
            { tab: 2, icon: '❓', labelKey: 'traen_badge_yesno', defaultLabel: '2. Ja/Nej-spørgsmål', color: 'rgba(76, 175, 80, 0.15)', border: 'rgba(76, 175, 80, 0.4)', text: '#a5d6a7' },
            { tab: 3, icon: '🧩', labelKey: 'traen_badge_wordorder', defaultLabel: '3. Ordstilling (Puslespil)', color: 'rgba(255, 152, 0, 0.15)', border: 'rgba(255, 152, 0, 0.4)', text: '#ffcc80' }
        ];

        exercises.forEach(ex => {
            const pill = document.createElement('button');
            pill.className = 'track-action-pill';
            pill.style.display = 'flex';
            pill.style.alignItems = 'center';
            pill.style.gap = '0.5rem';
            pill.style.padding = '0.5rem 0.75rem';
            pill.style.borderRadius = '8px';
            pill.style.background = ex.color;
            pill.style.border = `1px solid ${ex.border}`;
            pill.style.color = ex.text;
            pill.style.fontSize = '0.88rem';
            pill.style.fontWeight = '500';
            pill.style.cursor = 'pointer';
            pill.style.textAlign = 'left';
            pill.style.transition = 'all 0.15s ease';

            pill.innerHTML = `<span>${ex.icon}</span> <span>${t(ex.labelKey, ex.defaultLabel)}</span>`;

            pill.onmouseenter = () => {
                pill.style.background = ex.border;
                pill.style.color = '#ffffff';
            };
            pill.onmouseleave = () => {
                pill.style.background = ex.color;
                pill.style.color = ex.text;
            };

            pill.onclick = (e) => {
                e.stopPropagation();
                navigateFn('traen_sporgsmal_track', { trackId: track.id, initialTab: ex.tab });
            };

            pillsContainer.appendChild(pill);
        });

        card.appendChild(pillsContainer);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
