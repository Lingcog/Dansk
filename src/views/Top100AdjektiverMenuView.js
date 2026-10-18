import { getTranslation } from '../utils/i18n.js';

/**
 * Top100AdjektiverMenuView - Hub for de 100 mest almindelige danske adjektiver.
 * Giver kursisten overblik over de 5 semantiske felter med 20 adjektiver i hver.
 */
export function renderTop100AdjektiverMenuView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container top100-adjektiver-hub';

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
        .top100-adjektiver-hub {
            max-width: 1150px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .adj-hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .adj-hub-hero h1 {
            font-size: 2.4rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #a855f7, #38bdf8, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .adj-hub-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 780px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        .adj-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .adj-scene-card {
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
            position: relative;
        }
        .adj-scene-card:hover:not(.disabled) {
            transform: translateY(-8px);
            border-color: #a855f7;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
        }
        .adj-scene-card.disabled {
            opacity: 0.65;
            cursor: not-allowed;
            filter: grayscale(0.2);
        }
        .adj-scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: #0f172a;
        }
        .adj-scene-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .adj-scene-card:hover:not(.disabled) .adj-scene-card-img {
            transform: scale(1.05);
        }
        .adj-scene-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .adj-scene-card-title {
            font-size: 1.35rem;
            font-weight: 700;
            margin-bottom: 0.6rem;
            color: white;
        }
        .adj-scene-card-desc {
            color: #94a3b8;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .adj-scene-card-btn {
            background: #a855f7;
            color: white;
            border: none;
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .adj-scene-card:hover:not(.disabled) .adj-scene-card-btn {
            background: #9333ea;
            box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);
        }
        .adj-scene-card-btn.coming-soon-btn {
            background: #334155;
            color: #94a3b8;
            cursor: not-allowed;
        }

        .adj-pedagogical-box {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            margin-top: 1rem;
        }
        .adj-pedagogical-box h2 {
            font-size: 1.4rem;
            color: #f8fafc;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .adj-pedagogical-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 1.2rem;
        }
        .adj-pedagogical-item {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 14px;
            padding: 1.2rem;
        }
        .adj-pedagogical-item h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: #c084fc;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .adj-pedagogical-item p {
            color: #94a3b8;
            font-size: 0.92rem;
            line-height: 1.5;
            margin: 0;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'adj-hub-hero';
    hero.innerHTML = `
        <h1>${getTranslation('top100_adj_hub_title')}</h1>
        <p>${getTranslation('top100_adj_hub_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    // Scenes Grid
    const scenesGrid = document.createElement('div');
    scenesGrid.className = 'adj-scenes-grid';

    const fields = [
        {
            id: 'adjektiver_fysik',
            badge: getTranslation('top100_adj_f1_badge'),
            title: getTranslation('top100_adj_f1_title'),
            desc: getTranslation('top100_adj_f1_desc'),
            img: 'assets/adjektiver_fysik_venstre.jpg',
            active: true,
            btnText: getTranslation('top100_adj_f1_btn')
        },
        {
            id: 'adjektiver_tid',
            badge: getTranslation('top100_adj_f2_badge'),
            title: getTranslation('top100_adj_f2_title'),
            desc: getTranslation('top100_adj_f2_desc'),
            img: 'assets/station_indkoeb_vrimmel.jpg',
            active: true,
            btnText: getTranslation('top100_adj_f2_btn')
        },
        {
            id: 'adjektiver_kvalitet',
            badge: getTranslation('top100_adj_f3_badge'),
            title: getTranslation('top100_adj_f3_title'),
            desc: getTranslation('top100_adj_f3_desc'),
            img: 'assets/adjektiver_kvalitet_venstre.jpg',
            active: true,
            btnText: getTranslation('top100_adj_f3_btn')
        },
        {
            id: 'adjektiver_folelser',
            badge: getTranslation('top100_adj_f4_badge'),
            title: getTranslation('top100_adj_f4_title'),
            desc: getTranslation('top100_adj_f4_desc'),
            img: 'assets/adjektiver_folelser_venstre.jpg',
            active: true,
            btnText: getTranslation('top100_adj_f4_btn')
        },
        {
            id: 'adjektiver_tilstande',
            badge: getTranslation('top100_adj_f5_badge'),
            title: getTranslation('top100_adj_f5_title'),
            desc: getTranslation('top100_adj_f5_desc'),
            img: 'assets/adjektiver_tilstande_venstre.jpg',
            active: true,
            btnText: getTranslation('top100_adj_f5_btn')
        },
        {
            id: 'adjective_comparison',
            badge: getTranslation('top100_adj_f6_badge'),
            title: getTranslation('top100_adj_f6_title'),
            desc: getTranslation('top100_adj_f6_desc'),
            img: 'assets/adjektiver_comparison_guide.jpg',
            active: true,
            btnText: getTranslation('top100_adj_f6_btn'),
            action: () => navigateFn('adjective_comparison', { from: 'top100_adjektiver' })
        }
    ];

    fields.forEach(f => {
        const card = document.createElement('div');
        card.className = `adj-scene-card ${f.active ? '' : 'disabled'}`;
        card.innerHTML = `
            <div class="adj-scene-card-img-wrap">
                <img src="${f.img}" alt="${f.title}" class="adj-scene-card-img" />
            </div>
            <div class="adj-scene-card-content">
                <div class="adj-scene-card-title">${f.title}</div>
                <div class="adj-scene-card-desc">${f.desc}</div>
                <button class="adj-scene-card-btn ${f.active ? '' : 'coming-soon-btn'}">${f.btnText}</button>
            </div>
        `;
        if (f.active) {
            card.onclick = f.action || (() => navigateFn(f.id, { from: 'top100_adjektiver' }));
        }
        scenesGrid.appendChild(card);
    });

    viewContainer.appendChild(scenesGrid);

    // Pedagogical info box
    const infoBox = document.createElement('div');
    infoBox.className = 'adj-pedagogical-box';
    infoBox.innerHTML = `
        <h2>${getTranslation('top100_adj_ped_title')}</h2>
        <div class="adj-pedagogical-grid">
            <div class="adj-pedagogical-item">
                <h3>${getTranslation('top100_adj_ped_item1_title')}</h3>
                <p>${getTranslation('top100_adj_ped_item1_desc')}</p>
            </div>
            <div class="adj-pedagogical-item">
                <h3>${getTranslation('top100_adj_ped_item2_title')}</h3>
                <p>${getTranslation('top100_adj_ped_item2_desc')}</p>
            </div>
            <div class="adj-pedagogical-item">
                <h3>${getTranslation('top100_adj_ped_item3_title')}</h3>
                <p>${getTranslation('top100_adj_ped_item3_desc')}</p>
            </div>
        </div>
    `;
    viewContainer.appendChild(infoBox);

    container.appendChild(viewContainer);
}
