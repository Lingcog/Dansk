import { getTranslation } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';

function stripLeadingEmoji(text) {
    if (!text) return '';
    return text.replace(/^[\p{Extended_Pictographic}\s\uFE0F]+/u, '').trim();
}

/**
 * Top100SubstantiverMenuView - Hub for de 100 mest almindelige danske substantiver.
 * Giver kursisten overblik over de semantiske felter/vrimlebilleder.
 */
export function renderTop100SubstantiverMenuView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container top100-substantiver-hub';

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
        .top100-substantiver-hub {
            --by-bg: #4A040B;
            --by-surface: #073518;
            --by-surface-hover: #0c4f24;
            --by-surface-input: #02220e;
            --by-border: #136832;
            --by-border-light: #1b793c;
            --by-primary: #22c55e;
            --by-text: #FFFFFF;
            --by-text-muted: #a7f3d0;
            --by-text-subtle: #86efac;

            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .top100-substantiver-hub .ds-icon-emoji {
            display: none !important;
        }
        .top100-substantiver-hub .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }
        .top100-substantiver-hub .ds-icon-svg svg {
            display: inline-block;
            vertical-align: middle;
            stroke: currentColor;
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
        }
        .hub-hero p {
            color: #FFFFFF !important;
            opacity: 0.95;
            font-size: 1.15rem;
            max-width: 750px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }
        .hub-facts-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #4ade80;
            padding: 0.5rem 1.2rem;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 700;
        }
        .tag-substantiv {
            background: rgba(34, 197, 94, 0.2) !important;
            border-color: #22c55e !important;
            color: #4ade80 !important;
            font-weight: 700 !important;
        }
        .grammar-system-banner {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.2rem;
            margin: 1rem auto 2.5rem;
            padding: 0.8rem 1.4rem;
            background: var(--by-surface-input, #02220e);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 16px;
            max-width: 850px;
            font-size: 0.9rem;
        }
        .grammar-system-item {
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .grammar-dot {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            display: inline-block;
        }

        .hub-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .scene-card {
            background: var(--by-surface, #073518);
            border: 1.5px solid var(--by-border, #136832);
            border-radius: 24px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.35s ease;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        }
        .scene-card:hover {
            transform: translateY(-8px);
            border-color: var(--by-primary, #22c55e);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(34, 197, 94, 0.3);
        }
        .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: var(--by-surface-input, #02220e);
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
        .scene-pill-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(2, 34, 14, 0.88);
            border: 1px solid var(--by-border-light, #1b793c);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .badge-scene-1 { border-color: #38bdf8; color: #38bdf8; }
        .badge-scene-2 { border-color: #f59e0b; color: #f59e0b; }
        .badge-scene-3 { border-color: #a855f7; color: #d8b4fe; }

        .scene-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .scene-card-content h3 {
            font-size: 1.4rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .scene-card-content p {
            color: var(--by-text-muted, #a7f3d0);
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .scene-card-content p em {
            color: #FFFFFF;
            font-style: normal;
            font-weight: 700;
        }
        .scene-features-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-bottom: 1.2rem;
        }
        .feature-tag {
            background: var(--by-surface-input, #02220e);
            border: 1px solid var(--by-border, #136832);
            color: var(--by-text-subtle, #86efac);
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .scene-action-btn {
            background: var(--by-primary, #22c55e);
            color: #02220e;
            border: none;
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            text-align: center;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        .scene-card:hover .scene-action-btn {
            background: #4ade80;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.45);
        }

        /* Coming soon card */
        .scene-card.coming-soon {
            cursor: default;
            opacity: 0.75;
        }
        .scene-card.coming-soon:hover {
            transform: none;
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .scene-card.coming-soon .scene-action-btn {
            background: #334155;
            color: #94a3b8;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <h1>${getTranslation('top100_hub_title')}</h1>
        <p>${getTranslation('top100_hub_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    // Scenes Grid
    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    // 1. Scene 1: Byen (gaden og hverdagen)
    const cardByrum = document.createElement('div');
    cardByrum.className = 'scene-card';
    cardByrum.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/byrum_vrimmel.jpg" alt="Byen vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('city', '', { size: 24 })} <span>${stripLeadingEmoji(getTranslation('top100_scene1_title'))}</span></h3>
            <p>${getTranslation('top100_scene1_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_scene1_btn'))} →</button>
        </div>
    `;
    cardByrum.onclick = () => navigateFn('byrummet_vrimmel');
    grid.appendChild(cardByrum);

    // 2. Scene 2: Hjemmet & Køkkenet
    const cardKoekken = document.createElement('div');
    cardKoekken.className = 'scene-card';
    cardKoekken.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/koekken_vrimmel.jpg" alt="Hjemmet og køkkenet vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('coffee', '', { size: 24 })} <span>${stripLeadingEmoji(getTranslation('top100_scene2_title'))}</span></h3>
            <p>${getTranslation('top100_scene2_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_scene2_btn'))} →</button>
        </div>
    `;
    cardKoekken.onclick = () => navigateFn('koekken_hjemmet');
    grid.appendChild(cardKoekken);

    // 3. Scene 3: Undervisningslokalet og kontoret
    const cardKlasse = document.createElement('div');
    cardKlasse.className = 'scene-card';
    cardKlasse.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/klasse_kontor_vrimmel.jpg" alt="Undervisningslokalet og kontoret vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('graduationCap', '', { size: 24 })} <span>${stripLeadingEmoji(getTranslation('top100_scene3_title'))}</span></h3>
            <p>${getTranslation('top100_scene3_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_scene3_btn'))} →</button>
        </div>
    `;
    cardKlasse.onclick = () => navigateFn('klasse_kontor');
    grid.appendChild(cardKlasse);

    // 4. Scene 4: Naturen og fritiden
    const cardNatur = document.createElement('div');
    cardNatur.className = 'scene-card';
    cardNatur.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/natur_fritid_vrimmel.jpg" alt="Naturen og fritiden vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('compass', '', { size: 24 })} <span>${stripLeadingEmoji(getTranslation('top100_scene4_title'))}</span></h3>
            <p>${getTranslation('top100_scene4_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_scene4_btn'))} →</button>
        </div>
    `;
    cardNatur.onclick = () => navigateFn('natur_fritid');
    grid.appendChild(cardNatur);

    // 5. Scene 5: Stationen, indkøb og tiden
    const cardStation = document.createElement('div');
    cardStation.className = 'scene-card';
    cardStation.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/station_indkoeb_vrimmel.jpg" alt="Stationen, indkøb og tiden vrimlebillede" class="scene-card-img">
        </div>
        <div class="scene-card-content">
            <h3>${renderDsIcon('clock', '', { size: 24 })} <span>${stripLeadingEmoji(getTranslation('top100_scene5_title'))}</span></h3>
            <p>${getTranslation('top100_scene5_desc')}</p>
            <button class="scene-action-btn">${stripLeadingEmoji(getTranslation('top100_scene5_btn'))} →</button>
        </div>
    `;
    cardStation.onclick = () => navigateFn('station_indkoeb');
    grid.appendChild(cardStation);

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
