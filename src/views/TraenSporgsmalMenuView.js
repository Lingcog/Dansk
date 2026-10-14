import { getTranslation } from '../utils/i18n.js';

export function renderTraenSporgsmalMenuView(container, navigateFn) {
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + (getTranslation('back') || 'Tilbage');
    backBtn.onclick = () => navigateFn('lav_sporgsmal');
    topBar.appendChild(backBtn);

    // Header
    const title = document.createElement('h1');
    title.textContent = getTranslation('sporgsmal_target_training_title') || 'Målrettet Træning';
    title.style.textAlign = 'center';
    
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = getTranslation('sporgsmal_choose_training') || 'Vælg hvad du vil træne.';
    subtitle.style.textAlign = 'center';

    // Options Container
    const optionsContainer = document.createElement('div');
    optionsContainer.style.display = 'flex';
    optionsContainer.style.flexDirection = 'column';
    optionsContainer.style.gap = '2rem';
    optionsContainer.style.marginTop = '2.5rem';
    
    // --- Option 1: Hv-Betydning ---
    const hvCard = document.createElement('div');
    hvCard.className = 'exercise-card';
    hvCard.style.cursor = 'pointer';
    hvCard.style.textAlign = 'center';
    hvCard.style.margin = '0';
    hvCard.onclick = () => navigateFn('sporgsmal_hv_betydning');
    
    const hvTitle = document.createElement('h2');
    hvTitle.textContent = getTranslation('sporgsmal_hv_title') || 'Betydning af Hv-ord';
    hvTitle.style.marginBottom = '1rem';
    
    const hvDesc = document.createElement('p');
    hvDesc.textContent = getTranslation('sporgsmal_hv_desc') || 'Træn hvilket spørgeord, der passer til situationen (fx Hvad, Hvor, Hvornår).';
    hvDesc.style.color = 'var(--text-muted)';
    hvDesc.style.lineHeight = '1.5';
    
    hvCard.appendChild(hvTitle);
    hvCard.appendChild(hvDesc);
    optionsContainer.appendChild(hvCard);
    
    // --- Option 2: Ordstilling ---
    const ordCard = document.createElement('div');
    ordCard.className = 'exercise-card';
    ordCard.style.cursor = 'pointer';
    ordCard.style.textAlign = 'center';
    ordCard.style.margin = '0';
    ordCard.onclick = () => navigateFn('sporgsmal_ordstilling');
    
    const ordTitle = document.createElement('h2');
    ordTitle.textContent = getTranslation('sporgsmal_ord_title') || 'Ordstilling i Spørgsmål';
    ordTitle.style.marginBottom = '1rem';
    
    const ordDesc = document.createElement('p');
    ordDesc.textContent = getTranslation('sporgsmal_ord_desc') || 'Træn hvordan man bygger sætningen korrekt op i spørgsmål.';
    ordDesc.style.color = 'var(--text-muted)';
    ordDesc.style.lineHeight = '1.5';
    
    ordCard.appendChild(ordTitle);
    ordCard.appendChild(ordDesc);
    optionsContainer.appendChild(ordCard);

    viewContainer.appendChild(topBar);
    viewContainer.appendChild(title);
    viewContainer.appendChild(subtitle);
    viewContainer.appendChild(optionsContainer);

    container.appendChild(viewContainer);
}
