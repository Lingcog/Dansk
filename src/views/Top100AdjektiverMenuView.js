import { getTranslation } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveAdjNuance, applyAdjNuance } from '../components/DesignSystemToggle.js';

/**
 * Top100AdjektiverMenuView - Hub for de 100 mest almindelige danske adjektiver.
 * Giver kursisten overblik over de 5 semantiske felter med 20 adjektiver i hver.
 */
export function renderTop100AdjektiverMenuView(container, navigateFn) {
    container.innerHTML = '';

    // Aktivér mørk rav nuance som standard
    applyAdjNuance(getActiveAdjNuance());

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
        :root {
            --adj-bg: #4A040B;
            --adj-bg-glow: #6B0F1A;
            --adj-surface: #341808;
            --adj-surface-hover: #48230D;
            --adj-surface-input: #1C0B03;
            --adj-border: #6E3311;
            --adj-border-focus: #fb923c;
            --adj-primary: #ea580c;
            --adj-primary-hover: #f97316;
            --adj-text: #FFFFFF;
            --adj-text-muted: #fed7aa;
            --adj-text-subtle: #fdba74;
        }

        body[data-adj-nuance] {
            background-color: var(--adj-bg) !important;
            background-image: radial-gradient(circle at top right, var(--adj-bg-glow), var(--adj-bg)) !important;
        }

        .top100-adjektiver-hub {
            max-width: 1240px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: var(--adj-text, #FFFFFF);
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        /* Top Bar & Back Button */
        .top100-adjektiver-hub .top-bar {
            margin-bottom: 1.2rem;
        }
        .top100-adjektiver-hub .back-btn {
            background: var(--adj-surface-input, #1C0B03);
            border: 1.5px solid var(--adj-border, #6E3311);
            color: #FFFFFF;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .top100-adjektiver-hub .back-btn:hover {
            background: var(--adj-surface-hover, #48230D);
            border-color: var(--adj-primary, #ea580c);
        }

        .adj-hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .adj-hub-hero h1 {
            font-size: 2.4rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            color: #FFFFFF;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }
        .adj-hub-hero p {
            color: var(--adj-text-muted, #fed7aa);
            font-size: 1.15rem;
            max-width: 800px;
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
            background: var(--adj-surface, #341808);
            border: 1.5px solid var(--adj-border, #6E3311);
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            position: relative;
        }
        .adj-scene-card:hover:not(.disabled) {
            transform: translateY(-4px);
            border-color: var(--adj-border-focus, #fb923c);
            background: var(--adj-surface-hover, #48230D);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(234, 88, 12, 0.25);
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
            background: var(--adj-surface-input, #1C0B03);
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
            color: #FFFFFF;
        }
        .adj-scene-card-desc {
            color: var(--adj-text-muted, #fed7aa);
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .adj-scene-card-btn {
            background: var(--adj-primary, #ea580c);
            color: #FFFFFF;
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
            box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35);
        }
        .adj-scene-card:hover:not(.disabled) .adj-scene-card-btn {
            background: var(--adj-primary-hover, #f97316);
            box-shadow: 0 6px 18px rgba(234, 88, 12, 0.55);
            transform: translateY(-1px);
        }
        .adj-scene-card-btn.coming-soon-btn {
            background: #334155;
            color: #94a3b8;
            cursor: not-allowed;
            box-shadow: none;
        }

        .adj-pedagogical-box {
            background: var(--adj-surface, #341808);
            border: 1.5px solid var(--adj-border, #6E3311);
            border-radius: 20px;
            padding: 2rem;
            margin-top: 1rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .adj-pedagogical-box h2 {
            font-size: 1.4rem;
            color: #FFFFFF;
            margin-bottom: 1.2rem;
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
            background: var(--adj-surface-input, #1C0B03);
            border: 1.5px solid var(--adj-border, #6E3311);
            border-radius: 14px;
            padding: 1.2rem;
        }
        .adj-pedagogical-item h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--adj-text-subtle, #fdba74);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .adj-pedagogical-item p {
            color: var(--adj-text-muted, #fed7aa);
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
        <h2>${renderDsIcon('lightbulb', '', { size: 22 })} <span>${getTranslation('top100_adj_ped_title')}</span></h2>
        <div class="adj-pedagogical-grid">
            <div class="adj-pedagogical-item">
                <h3>${renderDsIcon('scale', '', { size: 18 })} <span>${getTranslation('top100_adj_ped_item1_title')}</span></h3>
                <p>${getTranslation('top100_adj_ped_item1_desc')}</p>
            </div>
            <div class="adj-pedagogical-item">
                <h3>${renderDsIcon('puzzle', '', { size: 18 })} <span>${getTranslation('top100_adj_ped_item2_title')}</span></h3>
                <p>${getTranslation('top100_adj_ped_item2_desc')}</p>
            </div>
            <div class="adj-pedagogical-item">
                <h3>${renderDsIcon('thermometer', '', { size: 18 })} <span>${getTranslation('top100_adj_ped_item3_title')}</span></h3>
                <p>${getTranslation('top100_adj_ped_item3_desc')}</p>
            </div>
        </div>
    `;
    viewContainer.appendChild(infoBox);

    container.appendChild(viewContainer);
}
