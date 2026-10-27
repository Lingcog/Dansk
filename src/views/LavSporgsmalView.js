import { getTranslation } from '../utils/i18n.js';
import { navigate } from '../main.js';
import { baseUrl } from '../utils/config.js';
import { getTrackMastery, isTrackFullyMastered, getFirstUnmasteredTab } from '../utils/target_training_data.js';

export function renderLavSporgsmalView(container, navigateFn) {
    const t = (key, fallback) => { const val = getTranslation(key); return val === key ? fallback : val; };
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
    title.textContent = getTranslation('lavSporgsmal');
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('lavSporgsmalDesc');

    // Image section
    const imageContainer = document.createElement('div');
    imageContainer.className = 'thematic-image-container';

    const img = document.createElement('img');
    img.src = `${baseUrl}questions.png`;
    img.alt = t('menu_img_alt', 'Spørgsmålsdannelse illustration');

    imageContainer.appendChild(img);

    // Options Container
    const optionsContainer = document.createElement('div');
    optionsContainer.style.display = 'flex';
    optionsContainer.style.flexDirection = 'column';
    optionsContainer.style.gap = '2rem';
    optionsContainer.style.marginTop = '2rem';
    
    // --- Option 0: Targeted Training ---
    const targetCard = document.createElement('div');
    targetCard.className = 'exercise-card';
    targetCard.style.cursor = 'pointer';
    targetCard.style.textAlign = 'center';
    targetCard.style.margin = '0';
    targetCard.onclick = () => navigateFn('traen_sporgsmal_menu');
    
    const targetTitle = document.createElement('h2');
    targetTitle.textContent = t('menu_target_title', 'Målrettet Træning');
    targetTitle.style.marginBottom = '1rem';
    
    const targetDesc = document.createElement('p');
    targetDesc.textContent = t('menu_target_desc', 'Træn specifikke elementer, fx betydningen af Hv-ord eller ordstilling i spørgsmål.');
    targetDesc.style.color = 'var(--text-muted)';
    targetDesc.style.lineHeight = '1.5';
    
    targetCard.appendChild(targetTitle);
    targetCard.appendChild(targetDesc);
    optionsContainer.appendChild(targetCard);

    const storyItems = [
        { storyId: 'anna', titleKey: 'menu_anna_title', defaultTitle: '🛒 Indkøb (Anna)', descKey: 'menu_anna_desc', defaultDesc: 'Træn interaktivt i appen: Anna køber ind i Netto.' },
        { storyId: 'sara', titleKey: 'menu_sara_title', defaultTitle: '🎂 Fødselsdag (Sara)', descKey: 'menu_sara_desc', defaultDesc: 'Træn interaktivt i appen: Sara holder fødselsdagsfest.' },
        { storyId: 'lars', titleKey: 'menu_lars_title', defaultTitle: '👨‍👩‍👧‍👦 Familie (Lars)', descKey: 'menu_lars_desc', defaultDesc: 'Træn interaktivt i appen: Lars og hans familie.' },
        { storyId: 'jonas', titleKey: 'menu_jonas_title', defaultTitle: '🍎 Mad (Jonas)', descKey: 'menu_jonas_desc', defaultDesc: 'Træn interaktivt i appen: Jonas spiser sundt.' },
        { storyId: 'lise', titleKey: 'menu_lise_title', defaultTitle: '🩺 Sundhed (Lise)', descKey: 'menu_lise_desc', defaultDesc: 'Træn interaktivt i appen: Lises helbred og vaner.' },
        { storyId: 'jens', titleKey: 'menu_jens_title', defaultTitle: '🚌 Transport (Jens)', descKey: 'menu_jens_desc', defaultDesc: 'Træn interaktivt i appen: Jens og offentlig transport.' }
    ];

    storyItems.forEach(item => {
        const masteredSet = getTrackMastery(item.storyId);
        const masteredCount = masteredSet.size;
        const isUnlocked = isTrackFullyMastered(item.storyId);

        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'center';
        card.style.margin = '0';
        card.style.position = 'relative';
        card.style.transition = 'all 0.2s ease';

        if (isUnlocked) {
            card.style.border = '1px solid rgba(76, 175, 80, 0.45)';
            card.onclick = () => navigateFn('sporgsmal_interactive', { storyId: item.storyId });
        } else {
            card.style.border = '1px dashed rgba(255, 152, 0, 0.4)';
            card.style.opacity = '0.92';
            card.onclick = () => navigateFn('traen_sporgsmal_track', {
                trackId: item.storyId,
                initialTab: getFirstUnmasteredTab(item.storyId),
                fromLockedStory: true
            });
        }

        const cardTitle = document.createElement('h2');
        cardTitle.textContent = isUnlocked
            ? t(item.titleKey, item.defaultTitle)
            : `🔒 ${t(item.titleKey, item.defaultTitle)}`;
        cardTitle.style.marginBottom = '0.75rem';

        const cardDesc = document.createElement('p');
        cardDesc.textContent = t(item.descKey, item.defaultDesc);
        cardDesc.style.color = 'var(--text-muted)';
        cardDesc.style.lineHeight = '1.5';
        cardDesc.style.marginBottom = '1rem';

        const statusBadge = document.createElement('div');
        statusBadge.style.display = 'inline-block';
        statusBadge.style.padding = '0.45rem 0.9rem';
        statusBadge.style.borderRadius = '20px';
        statusBadge.style.fontSize = '0.9rem';
        statusBadge.style.fontWeight = '600';

        if (isUnlocked) {
            statusBadge.style.background = 'rgba(76, 175, 80, 0.18)';
            statusBadge.style.border = '1px solid rgba(76, 175, 80, 0.45)';
            statusBadge.style.color = '#a5d6a7';
            statusBadge.textContent = `🔓 ${t('sporgsmal_story_unlocked', 'Låst op! (3/3 baner med 100%) — Klik for at starte →')}`;
        } else {
            statusBadge.style.background = 'rgba(255, 152, 0, 0.15)';
            statusBadge.style.border = '1px solid rgba(255, 152, 0, 0.4)';
            statusBadge.style.color = '#ffcc80';
            statusBadge.textContent = `🔒 ${t('sporgsmal_story_locked', 'Låst ({count}/3 baner med 100% i Målrettet træning) — Klik for at træne først →').replace('{count}', masteredCount)}`;
        }

        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        card.appendChild(statusBadge);
        optionsContainer.appendChild(card);
    });

    
    // --- Option 2: AI Bot Flow ---
    const botCard = document.createElement('div');
    botCard.className = 'exercise-card';
    botCard.style.margin = '0';
    
    const botTitle = document.createElement('h2');
    botTitle.textContent = t('menu_bot_title', 'Træn fritekst med AI-Bot');
    botTitle.style.marginBottom = '1rem';
    botTitle.style.textAlign = 'center';
    
    const botDesc = document.createElement('p');
    botDesc.textContent = t('menu_bot_desc', 'Træn ved at skrive frit til den eksterne AI-lærer. Kræver at du accepterer brugervilkår for Google Gemini.');
    botDesc.style.color = 'var(--text-muted)';
    botDesc.style.lineHeight = '1.5';
    botDesc.style.textAlign = 'center';
    botDesc.style.marginBottom = '1.5rem';

    // Consent Checkbox area
    const consentContainer = document.createElement('div');
    consentContainer.className = 'consent-container';
    consentContainer.style.margin = '0 auto';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'consent-checkbox';
    checkbox.id = 'gemini-consent-lav-sporgsmal';

    const consentText = document.createElement('label');
    consentText.htmlFor = 'gemini-consent-lav-sporgsmal';
    consentText.className = 'consent-text';
    consentText.textContent = getTranslation('geminiConsentText');

    consentContainer.appendChild(checkbox);
    consentContainer.appendChild(consentText);

    // Gemini Link Button
    const geminiBtnContainer = document.createElement('div');
    geminiBtnContainer.className = 'gemini-btn-container';
    geminiBtnContainer.style.textAlign = 'center';

    const geminiBtn = document.createElement('a');
    geminiBtn.href = "https://gemini.google.com/gem/1OKZRFhv_TlP2M32ApMHWsFVh4aCLHdNU?usp=sharing";
    geminiBtn.target = "_blank";
    geminiBtn.className = 'gemini-btn disabled';
    geminiBtn.textContent = getTranslation('lavSporgsmalBtnText');

    geminiBtnContainer.appendChild(geminiBtn);

    // Toggle logic
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            geminiBtn.classList.remove('disabled');
        } else {
            geminiBtn.classList.add('disabled');
        }
    });
    
    botCard.appendChild(botTitle);
    botCard.appendChild(botDesc);
    botCard.appendChild(consentContainer);
    botCard.appendChild(geminiBtnContainer);
    optionsContainer.appendChild(botCard);

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(imageContainer);
    viewContainer.appendChild(optionsContainer);

    container.appendChild(viewContainer);
}
