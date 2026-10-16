import { getTranslation } from '../utils/i18n.js';

/**
 * Top100VerberMenuView - Hub for de 100 mest almindelige danske verber.
 * Giver kursisten overblik over de tre handlingsfyldte vrimlebilleder.
 */
export function renderTop100VerberMenuView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container top100-verber-hub';

    // Top Bar with back button and grammar bridge
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('word_learning');
    topBar.appendChild(backBtn);

    const grammarBridgeBtn = document.createElement('button');
    grammarBridgeBtn.className = 'back-btn';
    grammarBridgeBtn.style.background = 'rgba(245, 158, 11, 0.15)';
    grammarBridgeBtn.style.borderColor = '#f59e0b';
    grammarBridgeBtn.style.color = '#fbbf24';
    grammarBridgeBtn.innerHTML = `🌉 ${getTranslation('verberTider')} ➔`;
    grammarBridgeBtn.onclick = () => navigateFn('punktet_og_broen', { from: 'top100_verber' });
    topBar.appendChild(grammarBridgeBtn);

    viewContainer.appendChild(topBar);

    // Common styles
    const style = document.createElement('style');
    style.textContent = `
        .top100-verber-hub {
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
            background: linear-gradient(135deg, #ef4444, #f97316, #fbbf24);
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
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid #ef4444;
            color: #f87171;
            padding: 0.5rem 1.2rem;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 700;
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
            border-color: #ef4444;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(239, 68, 68, 0.3);
        }
        .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 210px;
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
        .badge-verber-1 { border-color: #38bdf8; color: #38bdf8; }
        .badge-verber-2 { border-color: #f59e0b; color: #f59e0b; }
        .badge-verber-3 { border-color: #a855f7; color: #c084fc; }
        .badge-verber-4 { border-color: #22c55e; color: #4ade80; }
        .badge-verber-5 { border-color: #ec4899; color: #f472b6; }

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
        .scene-action-btn {
            background: #ef4444;
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
            background: #dc2626;
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
            ${getTranslation('top100_verber_hub_class_badge')}
        </div>
    `;
    viewContainer.appendChild(hero);

    // Scenes Grid
    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    // 1. Scene 1: Byrummet & Gaden
    const cardByrum = document.createElement('div');
    cardByrum.className = 'scene-card';
    cardByrum.innerHTML = `
        <div class="scene-card-img-wrap">
            <img src="assets/verber_byrum_vrimmel.jpg" alt="Byrummet vrimlebillede" class="scene-card-img">
            <div class="scene-pill-badge badge-verber-1">🏙️ Scene 1 • 20 verber</div>
        </div>
        <div class="scene-card-content">
            <h3>${getTranslation('top100_verber_scene1_title')}</h3>
            <p>${getTranslation('top100_verber_scene1_desc')}</p>
            <button class="scene-action-btn">${getTranslation('top100_verber_scene1_btn')}</button>
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
            <div class="scene-pill-badge badge-verber-2">🍳 Scene 2 • 20 verber</div>
        </div>
        <div class="scene-card-content">
            <h3>${getTranslation('top100_verber_scene2_title')}</h3>
            <p>${getTranslation('top100_verber_scene2_desc')}</p>
            <button class="scene-action-btn">${getTranslation('top100_verber_scene2_btn')}</button>
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
            <div class="scene-pill-badge badge-verber-3">🏫 Scene 3 • 20 verber</div>
        </div>
        <div class="scene-card-content">
            <h3>${getTranslation('top100_verber_scene3_title')}</h3>
            <p>${getTranslation('top100_verber_scene3_desc')}</p>
            <button class="scene-action-btn">${getTranslation('top100_verber_scene3_btn')}</button>
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
            <div class="scene-pill-badge badge-verber-4">🌳 Scene 4 • 20 verber</div>
        </div>
        <div class="scene-card-content">
            <h3>${getTranslation('top100_verber_scene4_title')}</h3>
            <p>${getTranslation('top100_verber_scene4_desc')}</p>
            <button class="scene-action-btn">${getTranslation('top100_verber_scene4_btn')}</button>
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
            <div class="scene-pill-badge badge-verber-5">🚆 Scene 5 • 20 verber</div>
        </div>
        <div class="scene-card-content">
            <h3>${getTranslation('top100_verber_scene5_title')}</h3>
            <p>${getTranslation('top100_verber_scene5_desc')}</p>
            <button class="scene-action-btn">${getTranslation('top100_verber_scene5_btn')}</button>
        </div>
    `;
    cardStation.onclick = () => navigateFn('verber_station');
    grid.appendChild(cardStation);

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
