import { getTranslation } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveVerbNuance, applyVerbNuance } from '../components/DesignSystemToggle.js';

function stripLeadingEmoji(text) {
    if (!text) return '';
    return text.replace(/^[\p{Extended_Pictographic}\s\uFE0F]+/u, '').trim();
}

/**
 * Top100VerberMenuView - Hub for de 100 mest almindelige danske verber.
 * Giver kursisten overblik over de fem handlingsfyldte vrimlebilleder.
 */
export function renderTop100VerberMenuView(container, navigateFn) {
    container.innerHTML = '';

    // Aktivér valgt verbum-nuance (standard: Brændt Briket)
    applyVerbNuance(getActiveVerbNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container top100-verber-hub';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('word_learning');
    topBar.appendChild(backBtn);

    viewContainer.appendChild(topBar);

    // Common styles
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --verb-bg: #45050C;
            --verb-bg-glow: #660914;
            --verb-surface: #280D10;
            --verb-surface-hover: #381419;
            --verb-surface-input: #150608;
            --verb-border: #6B1F26;
            --verb-border-focus: #F87171;
            --verb-primary: #EF4444;
            --verb-primary-hover: #DC2626;
            --verb-glow: rgba(239, 68, 68, 0.45);
            --verb-text: #FFFFFF;
            --verb-text-muted: #FEE2E2;
            --verb-text-subtle: #FECACA;
        }

        body[data-verb-nuance] {
            background-color: var(--verb-bg, #45050C) !important;
            background-image: radial-gradient(circle at top right, var(--verb-bg-glow, #660914), var(--verb-bg, #45050C)) !important;
        }

        .top100-verber-hub {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: var(--verb-text, #FFFFFF);
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .top100-verber-hub .ds-icon-emoji {
            display: none !important;
        }
        .top100-verber-hub .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }
        .top100-verber-hub .ds-icon-svg svg {
            display: inline-block;
            vertical-align: middle;
            stroke: currentColor;
        }

        /* Top Bar & Back Button */
        .top100-verber-hub .top-bar {
            margin-bottom: 1.2rem;
        }
        .top100-verber-hub .back-btn {
            background: var(--verb-surface-input, #150608);
            border: 1.5px solid var(--verb-border, #6B1F26);
            color: #FFFFFF;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .top100-verber-hub .back-btn:hover {
            background: var(--verb-surface-hover, #381419);
            border-color: var(--verb-primary, #EF4444);
        }

        .hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .hub-hero h1 {
            font-size: 2.4rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            color: #FFFFFF !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #FFFFFF !important;
            letter-spacing: -0.02em;
        }
        .hub-hero p {
            color: var(--verb-text-muted, #FEE2E2);
            font-size: 1.15rem;
            max-width: 750px;
            margin: 0 auto 1.2rem;
            line-height: 1.6;
        }
        .hub-facts-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(239, 68, 68, 0.16);
            border: 1px solid var(--verb-primary, #EF4444);
            color: var(--verb-text-muted, #FEE2E2);
            padding: 0.5rem 1.2rem;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 700;
            box-shadow: 0 0 12px var(--verb-glow, rgba(239, 68, 68, 0.3));
        }

        .hub-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .scene-card {
            background: var(--verb-surface, #280D10);
            border: 1.5px solid var(--verb-border, #6B1F26);
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }
        .scene-card:hover {
            transform: translateY(-4px);
            border-color: var(--verb-border-focus, #F87171);
            background: var(--verb-surface-hover, #381419);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px var(--verb-glow, rgba(239, 68, 68, 0.3));
        }
        .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: var(--verb-surface-input, #150608);
        }
        .scene-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .scene-card:hover .scene-card-img {
            transform: scale(1.05);
        }

        .scene-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .scene-card-content h3 {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .scene-card-content p {
            color: var(--verb-text-muted, #FEE2E2);
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .scene-action-btn {
            background: var(--verb-primary, #EF4444);
            color: #FFFFFF;
            border: none;
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            text-align: center;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
            box-shadow: 0 4px 14px var(--verb-glow, rgba(239, 68, 68, 0.35));
        }
        .scene-card:hover .scene-action-btn {
            background: var(--verb-primary-hover, #DC2626);
            box-shadow: 0 6px 18px var(--verb-glow, rgba(239, 68, 68, 0.55));
            transform: translateY(-1px);
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <h1>${getTranslation('top100_verber_hub_title')}</h1>
        <p>${getTranslation('top100_verber_hub_desc')}</p>
        <div class="hub-facts-badge">
            ${renderDsIcon('activity', '', { size: 16 })}
            <span>${stripLeadingEmoji(getTranslation('top100_verber_hub_class_badge'))}</span>
        </div>
    `;
    viewContainer.appendChild(hero);

    // Scenes Grid
    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    // 1. Scene 1: Byen og gaden
    const cardByrum = document.createElement('div');
    cardByrum.className = 'scene-card';
    cardByrum.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/verber_byrum_vrimmel.jpg" alt="Byen vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('city', '', { size: 22 })} <span>${stripLeadingEmoji(getTranslation('top100_verber_scene1_title'))}</span></h3>
            <p>${getTranslation('top100_verber_scene1_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_verber_scene1_btn'))}</button>
        </div>
    `;
    cardByrum.onclick = () => navigateFn('verber_byrum');
    grid.appendChild(cardByrum);

    // 2. Scene 2: Hjemmet & Køkkenet
    const cardHjem = document.createElement('div');
    cardHjem.className = 'scene-card';
    cardHjem.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/verber_hjem_vrimmel.jpg" alt="Hjemmet vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('home', '', { size: 22 })} <span>${stripLeadingEmoji(getTranslation('top100_verber_scene2_title'))}</span></h3>
            <p>${getTranslation('top100_verber_scene2_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_verber_scene2_btn'))}</button>
        </div>
    `;
    cardHjem.onclick = () => navigateFn('verber_hjem');
    grid.appendChild(cardHjem);

    // 3. Scene 3: Klasseværelset & Kontoret
    const cardKlasse = document.createElement('div');
    cardKlasse.className = 'scene-card';
    cardKlasse.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/verber_klasse_vrimmel.jpg" alt="Klasseværelset vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('graduationCap', '', { size: 22 })} <span>${stripLeadingEmoji(getTranslation('top100_verber_scene3_title'))}</span></h3>
            <p>${getTranslation('top100_verber_scene3_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_verber_scene3_btn'))}</button>
        </div>
    `;
    cardKlasse.onclick = () => navigateFn('verber_klasse');
    grid.appendChild(cardKlasse);

    // 4. Scene 4: Parken & Fritiden
    const cardPark = document.createElement('div');
    cardPark.className = 'scene-card';
    cardPark.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/verber_park_vrimmel.jpg" alt="Parken vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('activity', '', { size: 22 })} <span>${stripLeadingEmoji(getTranslation('top100_verber_scene4_title'))}</span></h3>
            <p>${getTranslation('top100_verber_scene4_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_verber_scene4_btn'))}</button>
        </div>
    `;
    cardPark.onclick = () => navigateFn('verber_park');
    grid.appendChild(cardPark);

    // 5. Scene 5: Banegården & Rejsen
    const cardStation = document.createElement('div');
    cardStation.className = 'scene-card';
    cardStation.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/verber_station_vrimmel.jpg" alt="Banegården vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('compass', '', { size: 22 })} <span>${stripLeadingEmoji(getTranslation('top100_verber_scene5_title'))}</span></h3>
            <p>${getTranslation('top100_verber_scene5_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_verber_scene5_btn'))}</button>
        </div>
    `;
    cardStation.onclick = () => navigateFn('verber_station');
    grid.appendChild(cardStation);

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
