import { getTranslation } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveKonjNuance, applyKonjNuance } from '../components/DesignSystemToggle.js';

function stripLeadingEmoji(text) {
    if (!text) return '';
    return text.replace(/^[\p{Extended_Pictographic}\s\uFE0F]+/u, '').trim();
}

/**
 * TopKonjunktionerMenuView - Hub for danske konjunktioner og bindeord.
 * 8 didaktiske felter med kognitive modeller, pædagogiske råd og flersproget støtte.
 * 'Vinrød Præcision' design system med Skifer-Violet Midnat (#160C28) og monokrome vektorsymboler.
 */
export function renderTopKonjunktionerMenuView(container, navigateFn) {
    container.innerHTML = '';

    // Aktivér valgt konjunktion-nuance (standard: Skifer-Violet Midnat / konj-violet)
    applyKonjNuance(getActiveKonjNuance());

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container top100-konjunktioner-hub';

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
            --konj-bg: #4A040B;
            --konj-bg-glow: #6B0F1A;
            --konj-surface: #160C28;
            --konj-surface-hover: #22123D;
            --konj-surface-input: #0D061A;
            --konj-border: #3B1E6D;
            --konj-border-focus: #A78BFA;
            --konj-primary: #8B5CF6;
            --konj-primary-hover: #7C3AED;
            --konj-glow: rgba(139, 92, 246, 0.6);
            --konj-text: #FFFFFF;
            --konj-text-muted: #DDD6FE;
            --konj-text-subtle: #A78BFA;
        }

        body[data-konj-nuance] {
            background-color: var(--konj-bg, #4A040B) !important;
            background-image: radial-gradient(circle at top right, var(--konj-bg-glow, #6B0F1A), var(--konj-bg, #4A040B)) !important;
        }

        .top100-konjunktioner-hub {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #FFFFFF;
            font-family: var(--vp-font-family, 'Outfit', sans-serif);
        }

        .top100-konjunktioner-hub .ds-icon-emoji {
            display: none !important;
        }
        .top100-konjunktioner-hub .ds-icon-svg {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            vertical-align: -0.15em;
            color: currentColor;
        }
        .top100-konjunktioner-hub .ds-icon-svg svg {
            display: inline-block;
            vertical-align: middle;
            stroke: currentColor;
        }

        .top100-konjunktioner-hub .top-bar {
            margin-bottom: 1.2rem;
        }
        .top100-konjunktioner-hub .back-btn {
            background: var(--konj-surface-input, #0D061A);
            border: 1.5px solid var(--konj-border, #3B1E6D);
            color: #FFFFFF;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .top100-konjunktioner-hub .back-btn:hover {
            background: var(--konj-surface-hover, #22123D);
            border-color: var(--konj-primary, #8B5CF6);
            box-shadow: 0 0 12px var(--konj-glow);
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
            color: var(--konj-text-muted, #DDD6FE);
            font-size: 1.15rem;
            max-width: 780px;
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
            background: var(--konj-surface, #160C28);
            border: 1.5px solid var(--konj-border, #3B1E6D);
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
            border-color: var(--konj-border-focus, #A78BFA);
            background: var(--konj-surface-hover, #22123D);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55), 0 0 20px var(--konj-glow);
        }
        .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: #090410;
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
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: var(--konj-surface-input, #0D061A);
            border: 1px solid var(--konj-border, #3B1E6D);
            color: var(--konj-text-subtle, #A78BFA);
            font-size: 0.82rem;
            font-weight: 700;
            padding: 0.3rem 0.85rem;
            border-radius: 9999px;
            margin-bottom: 0.75rem;
            width: fit-content;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .scene-card-title {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            color: #FFFFFF;
        }
        .scene-card-desc {
            color: var(--konj-text-muted, #DDD6FE);
            font-size: 0.95rem;
            line-height: 1.55;
            margin-bottom: 1.4rem;
            flex-grow: 1;
        }
        .scene-action-btn {
            background: var(--konj-primary, #8B5CF6);
            color: #FFFFFF;
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
            box-shadow: 0 4px 14px var(--konj-glow);
        }
        .scene-card:hover .scene-action-btn {
            background: var(--konj-primary-hover, #7C3AED);
            box-shadow: 0 6px 18px var(--konj-glow);
            transform: translateY(-1px);
        }

        /* Pedagogical Advice Box */
        .adv-pedagogical-box {
            background: var(--konj-surface, #160C28);
            border: 1.5px solid var(--konj-border, #3B1E6D);
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
            font-weight: 800;
        }
        .adv-pedagogical-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 1.2rem;
        }
        .adv-pedagogical-item {
            background: var(--konj-surface-input, #0D061A);
            border: 1px solid var(--konj-border, #3B1E6D);
            border-radius: 14px;
            padding: 1.3rem;
        }
        .adv-pedagogical-item h3 {
            font-size: 1.05rem;
            font-weight: 800;
            color: var(--konj-border-focus, #A78BFA);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .adv-pedagogical-item p {
            color: var(--konj-text-muted, #DDD6FE);
            font-size: 0.92rem;
            line-height: 1.55;
            margin: 0;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <h1>${getTranslation('top_konj_hub_title')}</h1>
        <p>${getTranslation('top_konj_hub_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    const fields = [
        {
            id: 'konj_felt_1',
            badge: getTranslation('top_konj_f1_badge'),
            icon: 'bridge',
            fallbackEmoji: '🌉',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: getTranslation('top_konj_f1_title'),
            desc: getTranslation('top_konj_f1_desc'),
            btnText: getTranslation('top_konj_f1_btn'),
            action: () => navigateFn('konjunktioner_helsaetning', { felt: 1, filter: 'helsaetning', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_2',
            badge: getTranslation('top_konj_f2_badge'),
            icon: 'compare',
            fallbackEmoji: '🎯',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: getTranslation('top_konj_f2_title'),
            desc: getTranslation('top_konj_f2_desc'),
            btnText: getTranslation('top_konj_f2_btn'),
            action: () => navigateFn('konjunktioner_logik', { felt: 2, filter: 'ledsaetning_logik', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_3',
            badge: getTranslation('top_konj_f3_badge'),
            icon: 'clock',
            fallbackEmoji: '⏳',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: getTranslation('top_konj_f3_title'),
            desc: getTranslation('top_konj_f3_desc'),
            btnText: getTranslation('top_konj_f3_btn'),
            action: () => navigateFn('konjunktioner_tid', { felt: 3, filter: 'ledsaetning_tid', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_4_at',
            badge: getTranslation('top_konj_f4_badge'),
            icon: 'thought',
            fallbackEmoji: '💭',
            img: 'assets/konjunktioner_at_vrimmel.jpg',
            title: getTranslation('top_konj_f4_title'),
            desc: getTranslation('top_konj_f4_desc'),
            btnText: getTranslation('top_konj_f4_btn'),
            action: () => navigateFn('konjunktioner_at', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_5_da_naar',
            badge: getTranslation('top_konj_f5_badge'),
            icon: 'pointInTime',
            fallbackEmoji: '⏰',
            img: 'assets/da_naar_vrimmel.jpg',
            title: getTranslation('top_konj_f5_title'),
            desc: getTranslation('top_konj_f5_desc'),
            btnText: getTranslation('top_konj_f5_btn'),
            action: () => navigateFn('konjunktioner_da_naar', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_6_selvom_alligevel',
            badge: getTranslation('top_konj_f6_badge'),
            icon: 'prohibited',
            fallbackEmoji: '🧱',
            img: 'assets/selvom_alligevel_vrimmel.jpg',
            title: getTranslation('top_konj_f6_title'),
            desc: getTranslation('top_konj_f6_desc'),
            btnText: getTranslation('top_konj_f6_btn'),
            action: () => navigateFn('konjunktioner_selvom_alligevel', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_7_fordi_derfor',
            badge: getTranslation('top_konj_f7_badge'),
            icon: 'zap',
            fallbackEmoji: '⚡',
            img: 'assets/fordi_derfor_vrimmel.jpg',
            title: getTranslation('top_konj_f7_title'),
            desc: getTranslation('top_konj_f7_desc'),
            btnText: getTranslation('top_konj_f7_btn'),
            action: () => navigateFn('konjunktioner_fordi_derfor', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_8_tekstflow',
            badge: getTranslation('top_konj_f8_badge'),
            icon: 'compass',
            fallbackEmoji: '🚦',
            img: 'assets/tekstens_trafik_vrimmel.jpg',
            title: getTranslation('top_konj_f8_title'),
            desc: getTranslation('top_konj_f8_desc'),
            btnText: getTranslation('top_konj_f8_btn'),
            action: () => navigateFn('konjunktioner_tekstflow', { from: 'top_konjunktioner' })
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
                <span class="scene-card-badge">
                    ${renderDsIcon(f.icon, f.fallbackEmoji, { size: 16 })}
                    <span>${stripLeadingEmoji(f.badge)}</span>
                </span>
                <div class="scene-card-title">${stripLeadingEmoji(f.title)}</div>
                <div class="scene-card-desc">${f.desc}</div>
                <button class="scene-action-btn">${stripLeadingEmoji(f.btnText)}</button>
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
        <h2>${renderDsIcon('lightbulb', '💡', { size: 22 })} <span>${stripLeadingEmoji(getTranslation('top_konj_ped_title'))}</span></h2>
        <div class="adv-pedagogical-grid">
            <div class="adv-pedagogical-item">
                <h3>${renderDsIcon('refresh', '🔄', { size: 18 })} <span>${stripLeadingEmoji(getTranslation('top_konj_ped_item1_title'))}</span></h3>
                <p>${getTranslation('top_konj_ped_item1_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>${renderDsIcon('compare', '⚖️', { size: 18 })} <span>${stripLeadingEmoji(getTranslation('top_konj_ped_item2_title'))}</span></h3>
                <p>${getTranslation('top_konj_ped_item2_desc')}</p>
            </div>
            <div class="adv-pedagogical-item">
                <h3>${renderDsIcon('thought', '💬', { size: 18 })} <span>${stripLeadingEmoji(getTranslation('top_konj_ped_item3_title'))}</span></h3>
                <p>${getTranslation('top_konj_ped_item3_desc')}</p>
            </div>
        </div>
    `;
    viewContainer.appendChild(infoBox);

    container.appendChild(viewContainer);
}
