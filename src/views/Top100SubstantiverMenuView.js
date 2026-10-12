import { getTranslation } from '../utils/i18n.js';

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
            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .hub-hero h1 {
            font-size: 2.4rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #38bdf8, #818cf8, #f43f5e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hub-hero p {
            color: #94a3b8;
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
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.1);
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
            background: var(--card-bg, #1e293b);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.35s ease;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .scene-card:hover {
            transform: translateY(-8px);
            border-color: #38bdf8;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.3);
        }
        .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: #0f172a;
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
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.2);
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
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .scene-card-content p {
            color: #94a3b8;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .scene-features-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-bottom: 1.2rem;
        }
        .feature-tag {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .scene-action-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.8rem 1.4rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            text-align: center;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .scene-card:hover .scene-action-btn {
            background: #3b82f6;
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
            <h3>${getTranslation('top100_scene1_title')}</h3>
            <p>${getTranslation('top100_scene1_desc')}</p>
            <button class="scene-action-btn">${getTranslation('top100_scene1_btn')}</button>
        </div>
    `;
    cardByrum.onclick = () => navigateFn('byrummet_vrimmel');
    grid.appendChild(cardByrum);

    // 2. Scene 2: Køkkenet & Hjemmet
    const cardKoekken = document.createElement('div');
    cardKoekken.className = 'scene-card';
    cardKoekken.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/koekken_vrimmel.jpg" alt="Køkkenet og hjemmet vrimlebillede" class="scene-card-img">
            <div class="scene-pill-badge badge-scene-2">${getTranslation('top100_scene2_badge')}</div>
        </div>
        <div class="scene-card-content">
            <h3>${getTranslation('top100_scene2_title')}</h3>
            <p>${getTranslation('top100_scene2_desc')}</p>
            <div class="scene-features-tags">
                <span class="feature-tag tag-substantiv">${getTranslation('top100_tag_20_substantiver')}</span>
                <span class="feature-tag">${getTranslation('top100_tag_farve_radar')}</span>
                <span class="feature-tag">${getTranslation('top100_tag_sorting')}</span>
                <span class="feature-tag">${getTranslation('top100_tag_kaffe')}</span>
                <span class="feature-tag">${getTranslation('top100_tag_bygger')}</span>
            </div>
            <button class="scene-action-btn">${getTranslation('top100_scene2_btn')}</button>
        </div>
    `;
    cardKoekken.onclick = () => navigateFn('koekken_hjemmet');
    grid.appendChild(cardKoekken);

    // 3. Scene 3: Undervisningslokalet & Kontoret (Forberedt)
    const cardKlasse = document.createElement('div');
    cardKlasse.className = 'scene-card coming-soon';
    cardKlasse.innerHTML = `
        <div class="scene-card-img-wrap" style="background: linear-gradient(135deg, #1e1b4b, #312e81); display: flex; align-items: center; justify-content: center;">
            <div style="font-size: 4rem;">🏫</div>
            <div class="scene-pill-badge badge-scene-3">${getTranslation('top100_scene3_badge')}</div>
        </div>
        <div class="scene-card-content">
            <h3>${getTranslation('top100_scene3_title')}</h3>
            <p>${getTranslation('top100_scene3_desc')}</p>
            <div class="scene-features-tags">
                <span class="feature-tag">${getTranslation('top100_tag_learning')}</span>
                <span class="feature-tag">${getTranslation('top100_tag_tech')}</span>
                <span class="feature-tag">${getTranslation('top100_tag_time')}</span>
            </div>
            <button class="scene-action-btn">${getTranslation('top100_scene3_btn')}</button>
        </div>
    `;
    grid.appendChild(cardKlasse);

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
