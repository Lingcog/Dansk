import { getTranslation } from '../utils/i18n.js';

/**
 * TopKonjunktionerMenuView - Selvstændig flade (Hub) for danske konjunktioner.
 * Indeholder 4 skarpe felter:
 *  - Felt 1: Helsætningskonjunktioner (og, men, eller, for, så)
 *  - Felt 2: Ledsætningskonjunktioner: Årsag, Betingelse, Kontrast & Spørgsmål (fordi, selvom, hvis, om)
 *  - Felt 3: Tidskonjunktioner (da vs. når, mens, inden, efter at, siden, indtil, så snart)
 *  - Felt 4 (Særskilt felt): Ordet "AT" i alle sætningskonstruktioner (ledsætnings-at, infinitiv-at, præposition + at, for at, uden at, så...at)
 */
export function renderTopKonjunktionerMenuView(container, navigateFn) {
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

    // Common styles matching Top100AdjektiverMenuView
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
            background: linear-gradient(135deg, #10b981, #38bdf8, #6366f1);
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
            border-color: #10b981;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.3);
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
            background: #059669;
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
        .adj-scene-card-badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.3rem 0.75rem;
            border-radius: 9999px;
            margin-bottom: 0.75rem;
            width: fit-content;
            border: 1px solid rgba(16, 185, 129, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .adj-scene-card:hover:not(.disabled) .adj-scene-card-btn {
            background: #10b981;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
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
    hero.className = 'adj-hub-hero';
    hero.innerHTML = `
        <h1>${getTranslation('top_konj_hub_title')}</h1>
        <p>${getTranslation('top_konj_hub_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    const grid = document.createElement('div');
    grid.className = 'adj-scenes-grid';

    const fields = [
        {
            id: 'konj_felt_1',
            badge: getTranslation('top_konj_f1_badge'),
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: getTranslation('top_konj_f1_title'),
            desc: getTranslation('top_konj_f1_desc'),
            btnText: getTranslation('top_konj_f1_btn'),
            action: () => navigateFn('konjunktioner_all', { filter: 'helsaetning', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_2',
            badge: getTranslation('top_konj_f2_badge'),
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: getTranslation('top_konj_f2_title'),
            desc: getTranslation('top_konj_f2_desc'),
            btnText: getTranslation('top_konj_f2_btn'),
            action: () => navigateFn('konjunktioner_all', { filter: 'ledsaetning_logik', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_3',
            badge: getTranslation('top_konj_f3_badge'),
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: getTranslation('top_konj_f3_title'),
            desc: getTranslation('top_konj_f3_desc'),
            btnText: getTranslation('top_konj_f3_btn'),
            action: () => navigateFn('konjunktioner_all', { filter: 'ledsaetning_tid', tab: 'tid', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_4_at',
            badge: getTranslation('top_konj_f4_badge'),
            img: 'assets/konjunktioner_at_vrimmel.jpg',
            title: getTranslation('top_konj_f4_title'),
            desc: getTranslation('top_konj_f4_desc'),
            btnText: getTranslation('top_konj_f4_btn'),
            action: () => navigateFn('konjunktioner_at', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_5_da_naar',
            badge: getTranslation('top_konj_f5_badge'),
            img: 'assets/da_naar_vrimmel.jpg',
            title: getTranslation('top_konj_f5_title'),
            desc: getTranslation('top_konj_f5_desc'),
            btnText: getTranslation('top_konj_f5_btn'),
            action: () => navigateFn('konjunktioner_da_naar', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_6_selvom_alligevel',
            badge: getTranslation('top_konj_f6_badge'),
            img: 'assets/selvom_alligevel_vrimmel.jpg',
            title: getTranslation('top_konj_f6_title'),
            desc: getTranslation('top_konj_f6_desc'),
            btnText: getTranslation('top_konj_f6_btn'),
            action: () => navigateFn('konjunktioner_selvom_alligevel', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_7_fordi_derfor',
            badge: getTranslation('top_konj_f7_badge'),
            img: 'assets/fordi_derfor_vrimmel.jpg',
            title: getTranslation('top_konj_f7_title'),
            desc: getTranslation('top_konj_f7_desc'),
            btnText: getTranslation('top_konj_f7_btn'),
            action: () => navigateFn('konjunktioner_fordi_derfor', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_8_tekstflow',
            badge: getTranslation('top_konj_f8_badge'),
            img: 'assets/tekstens_trafik_vrimmel.jpg',
            title: getTranslation('top_konj_f8_title'),
            desc: getTranslation('top_konj_f8_desc'),
            btnText: getTranslation('top_konj_f8_btn'),
            action: () => navigateFn('konjunktioner_tekstflow', { from: 'top_konjunktioner' })
        }
    ];

    fields.forEach(f => {
        const card = document.createElement('div');
        card.className = 'adj-scene-card';
        card.innerHTML = `
            <div class="adj-scene-card-img-wrap">
                <img src="${f.img}" alt="${f.title}" class="adj-scene-card-img">
            </div>
            <div class="adj-scene-card-content">
                <span class="adj-scene-card-badge">${f.badge}</span>
                <div class="adj-scene-card-title">${f.title}</div>
                <div class="adj-scene-card-desc">${f.desc}</div>
                <button class="adj-scene-card-btn">${f.btnText}</button>
            </div>
        `;
        card.onclick = f.action;
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);

    // Pedagogical Advice Box
    const infoBox = document.createElement('div');
    infoBox.className = 'adv-pedagogical-box';
    infoBox.innerHTML = `
        <h2>💡 ${getTranslation('top_konj_ped_title')}</h2>
        <div class="adv-pedagogical-grid">
            <div class="adv-pedagogical-item">
                <h3>🔄 ${getTranslation('top_konj_ped_item1_title')}</h3>
                <p>${getTranslation('top_konj_ped_item1_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>⚖️ ${getTranslation('top_konj_ped_item2_title')}</h3>
                <p>${getTranslation('top_konj_ped_item2_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>💬 ${getTranslation('top_konj_ped_item3_title')}</h3>
                <p>${getTranslation('top_konj_ped_item3_desc')}</p>
            </div>
        </div>
    `;
    viewContainer.appendChild(infoBox);

    container.appendChild(viewContainer);
}
