import { getTranslation } from '../utils/i18n.js';

/**
 * Top100AdverbierMenuView - Hub for de mest almindelige danske adverbier.
 * 7 semantiske felter med pædagogiske råd og flersproget støtte.
 */
export function renderTop100AdverbierMenuView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container top100-adverbier-hub';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back')}`;
    backBtn.onclick = () => navigateFn('word_learning');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .top100-adverbier-hub {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .hub-hero h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #38bdf8, #0ea5e9, #0284c7);
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

        .hub-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
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
            color: inherit;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        .scene-card:hover {
            transform: translateY(-8px);
            border-color: #38bdf8;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(56, 189, 248, 0.35);
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

        .scene-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .scene-card-badge {
            align-self: flex-start;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.3rem 0.75rem;
            border-radius: 9999px;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.3);
            margin-bottom: 0.75rem;
        }
        .scene-card-content h3 {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
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
            background: #0284c7;
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
            background: #0369a1;
        }

        /* Pedagogical Advice Box */
        .adv-pedagogical-box {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            margin-top: 1rem;
        }
        .adv-pedagogical-box h2 {
            font-size: 1.4rem;
            color: #f8fafc;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .adv-pedagogical-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 1.2rem;
        }
        .adv-pedagogical-item {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 14px;
            padding: 1.2rem;
        }
        .adv-pedagogical-item h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: #38bdf8;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .adv-pedagogical-item p {
            color: #94a3b8;
            font-size: 0.92rem;
            line-height: 1.5;
            margin: 0;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <h1>${getTranslation('top100_adv_hub_title')}</h1>
        <p>${getTranslation('top100_adv_hub_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    // Scenes Grid (7 fields)
    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    const fields = [
        {
            id: 'adverbier_sted',
            badge: getTranslation('top100_adv_f1_badge'),
            img: 'assets/adverbier_sted_vrimmel.jpg',
            title: getTranslation('top100_adv_f1_title'),
            desc: getTranslation('top100_adv_f1_desc'),
            btnText: getTranslation('top100_adv_f1_btn')
        },
        {
            id: 'adverbier_tid',
            badge: getTranslation('top100_adv_f2_badge'),
            img: 'assets/adverbier_tid_vrimmel.jpg',
            title: getTranslation('top100_adv_f2_title'),
            desc: getTranslation('top100_adv_f2_desc'),
            btnText: getTranslation('top100_adv_f2_btn')
        },
        {
            id: 'adverbier_maade',
            badge: getTranslation('top100_adv_f3_badge'),
            img: 'assets/adverbier_maade_vrimmel.jpg',
            title: getTranslation('top100_adv_f3_title'),
            desc: getTranslation('top100_adv_f3_desc'),
            btnText: getTranslation('top100_adv_f3_btn')
        },
        {
            id: 'adverbier_grad',
            badge: getTranslation('top100_adv_f4_badge'),
            img: 'assets/adverbier_grad_vrimmel.jpg',
            title: getTranslation('top100_adv_f4_title'),
            desc: getTranslation('top100_adv_f4_desc'),
            btnText: getTranslation('top100_adv_f4_btn')
        },
        {
            id: 'adverbier_smaaord',
            badge: getTranslation('top100_adv_f5_badge'),
            img: 'assets/adverbier_smaaord_vrimmel.jpg',
            title: getTranslation('top100_adv_f5_title'),
            desc: getTranslation('top100_adv_f5_desc'),
            btnText: getTranslation('top100_adv_f5_btn')
        },
        {
            id: 'adverbier_holdning',
            badge: getTranslation('top100_adv_f6_badge'),
            img: 'assets/adverbier_holdning_vrimmel.jpg',
            title: getTranslation('top100_adv_f6_title'),
            desc: getTranslation('top100_adv_f6_desc'),
            btnText: getTranslation('top100_adv_f6_btn')
        },
        {
            id: 'adverbier_konnektion',
            badge: getTranslation('top100_adv_f7_badge'),
            img: 'assets/adverbier_konnektion_vrimmel.jpg',
            title: getTranslation('top100_adv_f7_title'),
            desc: getTranslation('top100_adv_f7_desc'),
            btnText: getTranslation('top100_adv_f7_btn')
        }
    ];

    fields.forEach(f => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.innerHTML = `
            <div class="scene-card-img-wrap">
                <img src="${f.img}" alt="${f.title}" class="scene-card-img">
            </div>
            <div class="scene-card-content">
                <span class="scene-card-badge">${f.badge}</span>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
                <button class="scene-action-btn">${f.btnText}</button>
            </div>
        `;
        card.onclick = () => navigateFn(f.id);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);

    // Pedagogical Advice Box
    const infoBox = document.createElement('div');
    infoBox.className = 'adv-pedagogical-box';
    infoBox.innerHTML = `
        <h2>💡 ${getTranslation('top100_adv_ped_title')}</h2>
        <div class="adv-pedagogical-grid">
            <div class="adv-pedagogical-item">
                <h3>🔄 ${getTranslation('top100_adv_ped_item1_title')}</h3>
                <p>${getTranslation('top100_adv_ped_item1_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>⚖️ ${getTranslation('top100_adv_ped_item2_title')}</h3>
                <p>${getTranslation('top100_adv_ped_item2_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>💬 ${getTranslation('top100_adv_ped_item3_title')}</h3>
                <p>${getTranslation('top100_adv_ped_item3_desc')}</p>
            </div>
        </div>
    `;
    viewContainer.appendChild(infoBox);

    container.appendChild(viewContainer);
}
