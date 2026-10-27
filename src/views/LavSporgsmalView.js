import { getTranslation } from '../utils/i18n.js';
import { navigate } from '../main.js';
import { baseUrl } from '../utils/config.js';

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

    // --- Option 1: Anna (Indkøb) ---
    const annaCard = document.createElement('div');
    annaCard.className = 'exercise-card';
    annaCard.style.cursor = 'pointer';
    annaCard.style.textAlign = 'center';
    annaCard.style.margin = '0';
    annaCard.onclick = () => navigateFn('sporgsmal_interactive', { storyId: 'anna' });
    
    const annaTitle = document.createElement('h2');
    annaTitle.textContent = t('menu_anna_title', '🛒 Indkøb (Anna)');
    annaTitle.style.marginBottom = '1rem';
    
    const annaDesc = document.createElement('p');
    annaDesc.textContent = t('menu_anna_desc', 'Træn interaktivt i appen: Anna køber ind i Netto.');
    annaDesc.style.color = 'var(--text-muted)';
    annaDesc.style.lineHeight = '1.5';
    
    annaCard.appendChild(annaTitle);
    annaCard.appendChild(annaDesc);
    optionsContainer.appendChild(annaCard);
    
    // --- Option 2: Sara (Fødselsdag) ---
    const saraCard = document.createElement('div');
    saraCard.className = 'exercise-card';
    saraCard.style.cursor = 'pointer';
    saraCard.style.textAlign = 'center';
    saraCard.style.margin = '0';
    saraCard.onclick = () => navigateFn('sporgsmal_interactive', { storyId: 'sara' });
    
    const saraTitle = document.createElement('h2');
    saraTitle.textContent = t('menu_sara_title', '🎂 Fødselsdag (Sara)');
    saraTitle.style.marginBottom = '1rem';
    
    const saraDesc = document.createElement('p');
    saraDesc.textContent = t('menu_sara_desc', 'Træn interaktivt i appen: Sara holder fødselsdagsfest.');
    saraDesc.style.color = 'var(--text-muted)';
    saraDesc.style.lineHeight = '1.5';
    
    saraCard.appendChild(saraTitle);
    saraCard.appendChild(saraDesc);
    optionsContainer.appendChild(saraCard);
    
    // --- Option 3: Lars (Familie) ---
    const larsCard = document.createElement('div');
    larsCard.className = 'exercise-card';
    larsCard.style.cursor = 'pointer';
    larsCard.style.textAlign = 'center';
    larsCard.style.margin = '0';
    larsCard.onclick = () => navigateFn('sporgsmal_interactive', { storyId: 'lars' });
    
    const larsTitle = document.createElement('h2');
    larsTitle.textContent = t('menu_lars_title', '👨‍👩‍👧‍👦 Familie (Lars)');
    larsTitle.style.marginBottom = '1rem';
    
    const larsDesc = document.createElement('p');
    larsDesc.textContent = t('menu_lars_desc', 'Træn interaktivt i appen: Lars og hans familie.');
    larsDesc.style.color = 'var(--text-muted)';
    larsDesc.style.lineHeight = '1.5';
    
    larsCard.appendChild(larsTitle);
    larsCard.appendChild(larsDesc);
    optionsContainer.appendChild(larsCard);

    // --- Option 4: Jonas (Mad) ---
    const jonasCard = document.createElement('div');
    jonasCard.className = 'exercise-card';
    jonasCard.style.cursor = 'pointer';
    jonasCard.style.textAlign = 'center';
    jonasCard.style.margin = '0';
    jonasCard.onclick = () => navigateFn('sporgsmal_interactive', { storyId: 'jonas' });
    
    const jonasTitle = document.createElement('h2');
    jonasTitle.textContent = t('menu_jonas_title', '🍎 Mad (Jonas)');
    jonasTitle.style.marginBottom = '1rem';
    
    const jonasDesc = document.createElement('p');
    jonasDesc.textContent = t('menu_jonas_desc', 'Træn interaktivt i appen: Jonas spiser sundt.');
    jonasDesc.style.color = 'var(--text-muted)';
    jonasDesc.style.lineHeight = '1.5';
    
    jonasCard.appendChild(jonasTitle);
    jonasCard.appendChild(jonasDesc);
    optionsContainer.appendChild(jonasCard);

    // --- Option 5: Lise (Sundhed) ---
    const liseCard = document.createElement('div');
    liseCard.className = 'exercise-card';
    liseCard.style.cursor = 'pointer';
    liseCard.style.textAlign = 'center';
    liseCard.style.margin = '0';
    liseCard.onclick = () => navigateFn('sporgsmal_interactive', { storyId: 'lise' });
    
    const liseTitle = document.createElement('h2');
    liseTitle.textContent = t('menu_lise_title', '🩺 Sundhed (Lise)');
    liseTitle.style.marginBottom = '1rem';
    
    const liseDesc = document.createElement('p');
    liseDesc.textContent = t('menu_lise_desc', 'Træn interaktivt i appen: Lises helbred og vaner.');
    liseDesc.style.color = 'var(--text-muted)';
    liseDesc.style.lineHeight = '1.5';
    
    liseCard.appendChild(liseTitle);
    liseCard.appendChild(liseDesc);
    optionsContainer.appendChild(liseCard);

    // --- Option 6: Jens (Transport) ---
    const jensCard = document.createElement('div');
    jensCard.className = 'exercise-card';
    jensCard.style.cursor = 'pointer';
    jensCard.style.textAlign = 'center';
    jensCard.style.margin = '0';
    jensCard.onclick = () => navigateFn('sporgsmal_interactive', { storyId: 'jens' });
    
    const jensTitle = document.createElement('h2');
    jensTitle.textContent = t('menu_jens_title', '🚌 Transport (Jens)');
    jensTitle.style.marginBottom = '1rem';
    
    const jensDesc = document.createElement('p');
    jensDesc.textContent = t('menu_jens_desc', 'Træn interaktivt i appen: Jens og offentlig transport.');
    jensDesc.style.color = 'var(--text-muted)';
    jensDesc.style.lineHeight = '1.5';
    
    jensCard.appendChild(jensTitle);
    jensCard.appendChild(jensDesc);
    optionsContainer.appendChild(jensCard);

    
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
