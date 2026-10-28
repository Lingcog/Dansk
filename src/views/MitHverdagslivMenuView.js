import { getTranslation } from '../utils/i18n.js';
import { renderArbejdeBilvaerkstedView } from './ArbejdeBilvaerkstedView.js';
import { renderArbejdeKoekkenView } from './ArbejdeKoekkenView.js';

export { renderArbejdeBilvaerkstedView, renderArbejdeKoekkenView };

/**
 * MitHverdagslivMenuView - Hub for "Mit hverdagsliv" under "Lær nye ord".
 * Indeholder de tre scenarie-flader: "Arbejde", "Fritid" og "Årstider".
 */
export function renderMitHverdagslivMenuView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container mit-hverdagsliv-hub';

    // Top Bar with back button
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('word_learning');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const style = document.createElement('style');
    style.textContent = `
        .mit-hverdagsliv-hub {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .mit-hverdagsliv-hub .hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .mit-hverdagsliv-hub .hub-hero h1 {
            font-size: 2.4rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #14b8a6, #38bdf8, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .mit-hverdagsliv-hub .hub-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 750px;
            margin: 0 auto 1.2rem;
            line-height: 1.6;
        }
        .mit-hverdagsliv-hub .hub-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(20, 184, 166, 0.15);
            border: 1px solid #14b8a6;
            color: #2dd4bf;
            padding: 0.45rem 1.1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
        }
        .mit-hverdagsliv-hub .hub-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .mit-hverdagsliv-hub .scene-card {
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
        .mit-hverdagsliv-hub .scene-card:hover {
            transform: translateY(-8px);
            border-color: var(--scene-accent, #14b8a6);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(20, 184, 166, 0.25);
        }
        .mit-hverdagsliv-hub .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 210px;
            overflow: hidden;
            background: #0f172a;
        }
        .mit-hverdagsliv-hub .scene-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .mit-hverdagsliv-hub .scene-card:hover .scene-card-img {
            transform: scale(1.05);
        }
        .mit-hverdagsliv-hub .scene-pill-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(15, 23, 42, 0.88);
            border: 1px solid rgba(255, 255, 255, 0.22);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .mit-hverdagsliv-hub .scene-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .mit-hverdagsliv-hub .scene-card-content h3 {
            font-size: 1.45rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .mit-hverdagsliv-hub .scene-card-content p {
            color: #94a3b8;
            font-size: 0.96rem;
            line-height: 1.55;
            margin-bottom: 1.4rem;
            flex-grow: 1;
        }
        .mit-hverdagsliv-hub .scene-action-btn {
            background: var(--scene-accent, #14b8a6);
            color: #0f172a;
            border: none;
            padding: 0.85rem 1.4rem;
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
        .mit-hverdagsliv-hub .scene-card:hover .scene-action-btn {
            filter: brightness(1.1);
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <div class="hub-badge">${getTranslation('mit_hverdagsliv_badge', '🏡 Vrimlebilleder & Scenarier')}</div>
        <h1 style="margin-top: 0.8rem;">${getTranslation('mit_hverdagsliv_title', 'Mit hverdagsliv')}</h1>
        <p>${getTranslation('mit_hverdagsliv_desc', 'Udforsk forskellige emner og scenarier fra hverdagslivet gennem interaktive vrimlebilleder.')}</p>
    `;
    viewContainer.appendChild(hero);

    // 3 Flader: Arbejde, Fritid og Årstider
    const scenes = [
        {
            id: 'mit_hverdagsliv_arbejde',
            badge: getTranslation('mit_hverdagsliv_arbejde_badge', '💼 Scenarie 1 • 2 arbejdspladser'),
            icon: '💼',
            title: getTranslation('mit_hverdagsliv_arbejde_title', 'Arbejde'),
            desc: getTranslation('mit_hverdagsliv_arbejde_desc', 'Træn dansk på arbejdspladsen (de første 3 måneder): Vælg mellem 🔧 På bilværkstedet og 👩‍🍳 Som køkkenassistent i storkøkken og kantine.'),
            btnText: getTranslation('mit_hverdagsliv_arbejde_btn', 'Vælg arbejdsplads (2 scenarier) ➔'),
            img: 'assets/koekkenassistent_vrimmel.jpg',
            accent: '#38bdf8'
        },
        {
            id: 'mit_hverdagsliv_fritid',
            badge: getTranslation('mit_hverdagsliv_fritid_badge', '⚽ Scenarie 2'),
            icon: '⚽',
            title: getTranslation('mit_hverdagsliv_fritid_title', 'Fritid'),
            desc: getTranslation('mit_hverdagsliv_fritid_desc', 'Udforsk fritidslivet, hobbyer, sport, samvær med venner og familie samt oplevelser i hverdagen.'),
            btnText: getTranslation('mit_hverdagsliv_fritid_btn', 'Åbn Fritid ➔'),
            img: 'assets/natur_fritid_vrimmel.jpg',
            accent: '#22c55e'
        },
        {
            id: 'mit_hverdagsliv_aarstider',
            badge: getTranslation('mit_hverdagsliv_aarstider_badge', '🍂 Scenarie 3'),
            icon: '🍂',
            title: getTranslation('mit_hverdagsliv_aarstider_title', 'Årstider'),
            desc: getTranslation('mit_hverdagsliv_aarstider_desc', 'Udforsk forår, sommer, efterår og vinter – vejret, naturen og hverdagens skiftende aktiviteter året rundt.'),
            btnText: getTranslation('mit_hverdagsliv_aarstider_btn', 'Åbn Årstider ➔'),
            img: 'assets/adverbier_tid_vrimmel.jpg',
            accent: '#f59e0b'
        }
    ];

    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    scenes.forEach(scene => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.style.setProperty('--scene-accent', scene.accent);
        card.innerHTML = `
            <div class="scene-card-img-wrap">
                <img src="${scene.img}" alt="${scene.title} vrimlebillede" class="scene-card-img">
                <span class="scene-pill-badge" style="border-color: ${scene.accent}; color: ${scene.accent};">${scene.badge}</span>
            </div>
            <div class="scene-card-content">
                <h3><span>${scene.icon}</span> <span>${scene.title}</span></h3>
                <p>${scene.desc}</p>
                <button class="scene-action-btn">${scene.btnText}</button>
            </div>
        `;
        card.onclick = () => navigateFn(scene.id);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}

/**
 * Fælles opbygning for de tre underflader ("Arbejde", "Fritid", "Årstider") under "Mit hverdagsliv"
 */
function renderScenarioSubView(container, navigateFn, config) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container mit-hverdagsliv-subview';

    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('back') || 'Tilbage'}`;
    backBtn.onclick = () => navigateFn('mit_hverdagsliv');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const style = document.createElement('style');
    style.textContent = `
        .mit-hverdagsliv-subview {
            max-width: 1150px;
            margin: 0 auto;
            padding: 1rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .mit-hverdagsliv-subview .sub-hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        .mit-hverdagsliv-subview .sub-hero h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: ${config.accent};
        }
        .mit-hverdagsliv-subview .sub-hero p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 750px;
            margin: 0 auto;
            line-height: 1.5;
        }
        .mit-hverdagsliv-subview .vrimmel-stage-card {
            background: rgba(15, 23, 42, 0.78);
            border: 2px solid ${config.accent}45;
            border-radius: 24px;
            padding: 1.5rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
            text-align: center;
        }
        .mit-hverdagsliv-subview .vrimmel-preview-img {
            width: 100%;
            max-height: 520px;
            object-fit: cover;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            margin-bottom: 1.2rem;
        }
        .mit-hverdagsliv-subview .vrimmel-status-note {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.65rem 1.2rem;
            border-radius: 14px;
            color: #cbd5e1;
            font-size: 0.95rem;
        }
    `;
    viewContainer.appendChild(style);

    const hero = document.createElement('div');
    hero.className = 'sub-hero';
    hero.innerHTML = `
        <h1>${config.icon} ${config.title}</h1>
        <p>${config.desc}</p>
    `;
    viewContainer.appendChild(hero);

    const stageCard = document.createElement('div');
    stageCard.className = 'vrimmel-stage-card';
    stageCard.innerHTML = `
        <img src="${config.img}" alt="${config.title} vrimlebillede" class="vrimmel-preview-img">
        <div class="vrimmel-status-note">
            <span>✨</span>
            <span>Fladen <strong>${config.title}</strong> under <em>Mit hverdagsliv</em> er klar til dine vrimlebilleder og scenarier.</span>
        </div>
    `;
    viewContainer.appendChild(stageCard);

    container.appendChild(viewContainer);
}

export function renderMitHverdagslivArbejdeView(container, navigateFn, extraData = {}) {
    if (extraData && extraData.workplace === 'bilvaerksted') {
        renderArbejdeBilvaerkstedView(container, navigateFn, extraData);
        return;
    }
    if (extraData && extraData.workplace === 'koekken') {
        renderArbejdeKoekkenView(container, navigateFn, extraData);
        return;
    }

    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container mit-hverdagsliv-hub';

    const topBar = document.createElement('div');
    topBar.className = 'top-bar';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← ${getTranslation('arbejde_back_to_hub', 'Tilbage til Mit hverdagsliv')}`;
    backBtn.onclick = () => navigateFn('mit_hverdagsliv');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    const style = document.createElement('style');
    style.textContent = `
        .mit-hverdagsliv-hub {
            max-width: 1100px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .mit-hverdagsliv-hub .hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .mit-hverdagsliv-hub .hub-hero h1 {
            font-size: 2.35rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #38bdf8, #fb923c, #22c55e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .mit-hverdagsliv-hub .hub-hero p {
            color: #94a3b8;
            font-size: 1.1rem;
            max-width: 760px;
            margin: 0 auto 1.2rem;
            line-height: 1.6;
        }
        .mit-hverdagsliv-hub .hub-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.45rem 1.1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
        }
        .mit-hverdagsliv-hub .hub-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .mit-hverdagsliv-hub .scene-card {
            background: var(--card-bg, #1e293b);
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-radius: 24px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.35s ease;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .mit-hverdagsliv-hub .scene-card:hover {
            transform: translateY(-8px);
            border-color: var(--scene-accent, #38bdf8);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 22px rgba(56, 189, 248, 0.25);
        }
        .mit-hverdagsliv-hub .scene-card-img-wrap {
            position: relative;
            width: 100%;
            height: 235px;
            overflow: hidden;
            background: #0f172a;
        }
        .mit-hverdagsliv-hub .scene-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .mit-hverdagsliv-hub .scene-card:hover .scene-card-img {
            transform: scale(1.05);
        }
        .mit-hverdagsliv-hub .scene-pill-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.22);
            backdrop-filter: blur(8px);
            padding: 0.38rem 0.9rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .mit-hverdagsliv-hub .scene-card-content {
            padding: 1.6rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .mit-hverdagsliv-hub .scene-card-content h3 {
            font-size: 1.45rem;
            font-weight: 800;
            margin-bottom: 0.65rem;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .mit-hverdagsliv-hub .scene-card-content p {
            color: #94a3b8;
            font-size: 0.96rem;
            line-height: 1.55;
            margin-bottom: 1.1rem;
            flex-grow: 1;
        }
        .mit-hverdagsliv-hub .scene-feature-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-bottom: 1.3rem;
        }
        .mit-hverdagsliv-hub .scene-feature-tag {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 700;
        }
        .mit-hverdagsliv-hub .scene-action-btn {
            background: var(--scene-accent, #38bdf8);
            color: #0f172a;
            border: none;
            padding: 0.9rem 1.4rem;
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
        .mit-hverdagsliv-hub .scene-card:hover .scene-action-btn {
            filter: brightness(1.1);
        }
    `;
    viewContainer.appendChild(style);

    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <div class="hub-badge">${getTranslation('arbejde_hub_badge', '💼 Mit hverdagsliv • Arbejde')}</div>
        <h1 style="margin-top: 0.8rem;">${getTranslation('arbejde_hub_title', 'Vælg arbejdsplads')}</h1>
        <p>${getTranslation('arbejde_hub_desc', 'Træn de vigtigste målord, fagudtryk, historier, mundtlige dialoger og faste automatiserede sætninger med dansk betoning til de første 3 måneder på jobbet.')}</p>
    `;
    viewContainer.appendChild(hero);

    const workplaces = [
        {
            id: 'mit_hverdagsliv_arbejde_bilvaerksted',
            badge: getTranslation('arbejde_bilvaerksted_badge', '🔧 Arbejdsplads 1 • Bilværksted'),
            icon: '🔧',
            title: getTranslation('arbejde_bilvaerksted_title', 'På bilværkstedet'),
            desc: getTranslation('arbejde_bilvaerksted_desc', 'Arbejd som mekaniker eller værkstedsassistent: Lær 32 centrale ord fra autoværkstedet, læs 4 praksisnære historier med klikbare ord, sæt værkstedsdialoger i rækkefølge og træn udtale med dansk betoning.'),
            tags: ['🖼️ 32 Målord', '🕵️‍♂️ Ord-detektiv', '📖 4 Historier', '🗣️ 5 Dialoger', '🎙️ Sig det højt (Betoning)'],
            btnText: getTranslation('arbejde_bilvaerksted_btn', 'Åbn Bilværkstedet ➔'),
            img: 'assets/bilvaerksted_vrimmel.jpg',
            accent: '#38bdf8'
        },
        {
            id: 'mit_hverdagsliv_arbejde_koekken',
            badge: getTranslation('arbejde_koekken_badge', '👩‍🍳 Arbejdsplads 2 • Storkøkken & Kantine'),
            icon: '👩‍🍳',
            title: getTranslation('arbejde_koekken_title', 'Som køkkenassistent'),
            desc: getTranslation('arbejde_koekken_desc', 'Arbejd i et dansk storkøkken og kantine: Lær 32 vigtige ord om fødevaresikkerhed, hygiejne, køkkenudstyr og opvask, læs 4 historier med klikbare ord, løs køkkendialoger og træn faste sætninger med betoning.'),
            tags: ['🖼️ 32 Målord', '🕵️‍♂️ Ord-detektiv', '📖 4 Historier', '🗣️ 5 Dialoger', '🎙️ Sig det højt (Betoning)'],
            btnText: getTranslation('arbejde_koekken_btn', 'Åbn Køkkenassistent ➔'),
            img: 'assets/koekkenassistent_vrimmel.jpg',
            accent: '#fb923c'
        }
    ];

    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    workplaces.forEach(wp => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.style.setProperty('--scene-accent', wp.accent);
        card.innerHTML = `
            <div class="scene-card-img-wrap">
                <img src="${wp.img}" alt="${wp.title} vrimlebillede" class="scene-card-img">
                <span class="scene-pill-badge" style="border-color: ${wp.accent}; color: ${wp.accent};">${wp.badge}</span>
            </div>
            <div class="scene-card-content">
                <h3><span>${wp.icon}</span> <span>${wp.title}</span></h3>
                <p>${wp.desc}</p>
                <div class="scene-feature-tags">
                    ${wp.tags.map(t => `<span class="scene-feature-tag">${t}</span>`).join('')}
                </div>
                <button class="scene-action-btn">${wp.btnText}</button>
            </div>
        `;
        card.onclick = () => navigateFn(wp.id);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}

export function renderMitHverdagslivFritidView(container, navigateFn) {
    renderScenarioSubView(container, navigateFn, {
        icon: '⚽',
        title: getTranslation('mit_hverdagsliv_fritid_title', 'Fritid'),
        desc: getTranslation('mit_hverdagsliv_fritid_desc', 'Udforsk fritidslivet, hobbyer, sport, samvær med venner og familie samt oplevelser i hverdagen.'),
        img: 'assets/natur_fritid_vrimmel.jpg',
        accent: '#22c55e'
    });
}

export function renderMitHverdagslivAarstiderView(container, navigateFn) {
    renderScenarioSubView(container, navigateFn, {
        icon: '🍂',
        title: getTranslation('mit_hverdagsliv_aarstider_title', 'Årstider'),
        desc: getTranslation('mit_hverdagsliv_aarstider_desc', 'Udforsk forår, sommer, efterår og vinter – vejret, naturen og hverdagens skiftende aktiviteter året rundt.'),
        img: 'assets/adverbier_tid_vrimmel.jpg',
        accent: '#f59e0b'
    });
}
