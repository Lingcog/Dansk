import { getTranslation } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveAdvNuance, applyAdvNuance } from '../components/DesignSystemToggle.js';

function stripLeadingEmoji(text) {
    if (!text) return '';
    return text.replace(/^[\p{Extended_Pictographic}\s\uFE0F]+/u, '').trim();
}

/**
 * Top100AdverbierMenuView - Hub for de mest almindelige danske adverbier.
 * 7 semantiske felter med pædagogiske råd og flersproget støtte.
 * 'Vinrød Præcision' design system med Dyb safirblå tema og monokrome vektorsymboler.
 */
export function renderTop100AdverbierMenuView(container, navigateFn) {
    container.innerHTML = '';

    // Aktivér valgt adverbium-nuance (standard: Dyb safirblå / adv-safir)
    applyAdvNuance(getActiveAdvNuance());

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
        :root {
            --adv-bg: #4A040B;
            --adv-bg-glow: #6B0F1A;
            --adv-surface: #0A192F;
            --adv-surface-hover: #112240;
            --adv-surface-input: #050E1A;
            --adv-border: #1E3A66;
            --adv-border-focus: #93C5FD;
            --adv-primary: #3B82F6;
            --adv-primary-hover: #1D4ED8;
            --adv-glow: rgba(59, 130, 246, 0.7);
            --adv-text: #FFFFFF;
            --adv-text-muted: #BFDBFE;
            --adv-text-subtle: #93C5FD;
        }

        body[data-adv-nuance] {
            background-color: var(--adv-bg, #4A040B) !important;
            background-image: radial-gradient(circle at top right, var(--adv-bg-glow, #6B0F1A), var(--adv-bg, #4A040B)) !important;
        }

        .top100-adverbier-hub {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #FFFFFF;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .top100-adverbier-hub .ds-icon-emoji {
            display: none !important;
        }
        .top100-adverbier-hub .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }
        .top100-adverbier-hub .ds-icon-svg svg {
            display: inline-block;
            vertical-align: middle;
            stroke: currentColor;
        }

        .top100-adverbier-hub .top-bar {
            margin-bottom: 1.2rem;
        }
        .top100-adverbier-hub .back-btn {
            background: var(--adv-surface-input, #050E1A);
            border: 1.5px solid var(--adv-border, #1E3A66);
            color: #FFFFFF;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .top100-adverbier-hub .back-btn:hover {
            background: var(--adv-surface-hover, #112240);
            border-color: var(--adv-primary, #3B82F6);
        }

        .hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .hub-hero h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            color: #FFFFFF !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #FFFFFF !important;
            letter-spacing: -0.02em;
        }
        .hub-hero p {
            color: var(--adv-text-muted, #BFDBFE);
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
            background: var(--adv-surface, #0A192F);
            border: 1.5px solid var(--adv-border, #1E3A66);
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            color: inherit;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
            position: relative;
        }
        .scene-card:hover {
            transform: translateY(-4px);
            border-color: var(--adv-border-focus, #93C5FD);
            background: var(--adv-surface-hover, #112240);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55), 0 0 20px var(--adv-glow, rgba(59, 130, 246, 0.5));
        }
        .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: var(--adv-surface-input, #050E1A);
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
            background: rgba(59, 130, 246, 0.16);
            color: var(--adv-text-subtle, #93C5FD);
            border: 1px solid var(--adv-border, #1E3A66);
            margin-bottom: 0.75rem;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .scene-card-content h3 {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .scene-card-content p {
            color: var(--adv-text-muted, #BFDBFE);
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .scene-action-btn {
            background: var(--adv-primary, #3B82F6);
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
            box-shadow: 0 4px 14px var(--adv-glow, rgba(59, 130, 246, 0.35));
        }
        .scene-card:hover .scene-action-btn {
            background: var(--adv-primary-hover, #1D4ED8);
            box-shadow: 0 6px 18px var(--adv-glow, rgba(59, 130, 246, 0.55));
        }

        /* Pedagogical Advice Box */
        .adv-pedagogical-box {
            background: var(--adv-surface, #0A192F);
            border: 1.5px solid var(--adv-border, #1E3A66);
            border-radius: 20px;
            padding: 2rem;
            margin-top: 1rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
        }
        .adv-pedagogical-box h2 {
            font-size: 1.4rem;
            color: #FFFFFF;
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
            background: var(--adv-surface-input, #050E1A);
            border: 1px solid var(--adv-border, #1E3A66);
            border-radius: 14px;
            padding: 1.2rem;
        }
        .adv-pedagogical-item h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--adv-text-subtle, #93C5FD);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .adv-pedagogical-item p {
            color: var(--adv-text-muted, #BFDBFE);
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
            icon: 'mapPin',
            badge: getTranslation('top100_adv_f1_badge'),
            img: 'assets/adverbier_sted_vrimmel.jpg',
            title: getTranslation('top100_adv_f1_title'),
            desc: getTranslation('top100_adv_f1_desc'),
            btnText: getTranslation('top100_adv_f1_btn')
        },
        {
            id: 'adverbier_tid',
            icon: 'clock',
            badge: getTranslation('top100_adv_f2_badge'),
            img: 'assets/adverbier_tid_vrimmel.jpg',
            title: getTranslation('top100_adv_f2_title'),
            desc: getTranslation('top100_adv_f2_desc'),
            btnText: getTranslation('top100_adv_f2_btn')
        },
        {
            id: 'adverbier_maade',
            icon: 'zap',
            badge: getTranslation('top100_adv_f3_badge'),
            img: 'assets/adverbier_maade_vrimmel.jpg',
            title: getTranslation('top100_adv_f3_title'),
            desc: getTranslation('top100_adv_f3_desc'),
            btnText: getTranslation('top100_adv_f3_btn')
        },
        {
            id: 'adverbier_grad',
            icon: 'thermometer',
            badge: getTranslation('top100_adv_f4_badge'),
            img: 'assets/adverbier_grad_vrimmel.jpg',
            title: getTranslation('top100_adv_f4_title'),
            desc: getTranslation('top100_adv_f4_desc'),
            btnText: getTranslation('top100_adv_f4_btn')
        },
        {
            id: 'adverbier_smaaord',
            icon: 'messageSquare',
            badge: getTranslation('top100_adv_f5_badge'),
            img: 'assets/adverbier_smaaord_vrimmel.jpg',
            title: getTranslation('top100_adv_f5_title'),
            desc: getTranslation('top100_adv_f5_desc'),
            btnText: getTranslation('top100_adv_f5_btn')
        },
        {
            id: 'adverbier_holdning',
            icon: 'compass',
            badge: getTranslation('top100_adv_f6_badge'),
            img: 'assets/adverbier_holdning_vrimmel.jpg',
            title: getTranslation('top100_adv_f6_title'),
            desc: getTranslation('top100_adv_f6_desc'),
            btnText: getTranslation('top100_adv_f6_btn')
        },
        {
            id: 'adverbier_konnektion',
            icon: 'bridge',
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
                <span class="scene-card-badge">${renderDsIcon(f.icon, '', { size: 14 })} <span>${stripLeadingEmoji(f.badge)}</span></span>
                <h3>${renderDsIcon(f.icon, '', { size: 22 })} <span>${stripLeadingEmoji(f.title)}</span></h3>
                <p>${f.desc}</p>
                <button class="scene-action-btn">${stripLeadingEmoji(f.btnText)}</button>
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
        <h2>${renderDsIcon('lightbulb', '', { size: 22 })} <span>${stripLeadingEmoji(getTranslation('top100_adv_ped_title'))}</span></h2>
        <div class="adv-pedagogical-grid">
            <div class="adv-pedagogical-item">
                <h3>${renderDsIcon('refresh', '', { size: 18 })} <span>${stripLeadingEmoji(getTranslation('top100_adv_ped_item1_title'))}</span></h3>
                <p>${getTranslation('top100_adv_ped_item1_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>${renderDsIcon('scale', '', { size: 18 })} <span>${stripLeadingEmoji(getTranslation('top100_adv_ped_item2_title'))}</span></h3>
                <p>${getTranslation('top100_adv_ped_item2_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>${renderDsIcon('messageSquare', '', { size: 18 })} <span>${stripLeadingEmoji(getTranslation('top100_adv_ped_item3_title'))}</span></h3>
                <p>${getTranslation('top100_adv_ped_item3_desc')}</p>
            </div>
        </div>
    `;
    viewContainer.appendChild(infoBox);

    container.appendChild(viewContainer);
}
