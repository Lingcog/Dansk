import { getTranslation } from '../utils/i18n.js';
import { renderDsIcon } from '../utils/designSystemIcons.js';
import { getActiveKonjNuance, applyKonjNuance } from '../components/DesignSystemToggle.js';

function stripLeadingEmoji(text) {
    if (!text) return '';
    return text.replace(/^[\p{Extended_Pictographic}\s\uFE0F]+/u, '').trim();
}

/**
 * TopKonjunktionerMenuView - Hub for danske konjunktioner og bindeord (Forslag 3: Grammatisk Renhed).
 * Opdelt skarpt i:
 *  1) De 4 rene Konjunktions-familier + Tekstflow (5 hovedmoduler)
 *  2) 4 Tværgående Ordstillings-Dueller (Konjunktion vs. Adverbium & Tvillinger - kompakte duelkort uden vrimlebilleder)
 */
export function renderTopKonjunktionerMenuView(container, navigateFn) {
    container.innerHTML = '';

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
            margin-bottom: 2.2rem;
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
            font-size: 1.12rem;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .hub-section-header {
            margin: 0 0 1.4rem;
            padding-bottom: 0.8rem;
            border-bottom: 1.5px solid rgba(167, 139, 250, 0.25);
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }
        .hub-section-title {
            font-size: 1.5rem;
            font-weight: 900;
            color: #FFFFFF;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .hub-section-subtitle {
            color: var(--konj-text-muted, #DDD6FE);
            font-size: 0.96rem;
            margin: 0;
            line-height: 1.5;
        }

        .hub-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
            gap: 1.75rem;
            margin-bottom: 3.2rem;
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
            height: 185px;
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
            padding: 1.4rem;
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
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.28rem 0.8rem;
            border-radius: 9999px;
            margin-bottom: 0.7rem;
            width: fit-content;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .scene-card-title {
            font-size: 1.3rem;
            font-weight: 800;
            margin-bottom: 0.55rem;
            color: #FFFFFF;
        }
        .scene-card-desc {
            color: var(--konj-text-muted, #DDD6FE);
            font-size: 0.94rem;
            line-height: 1.55;
            margin-bottom: 1.25rem;
            flex-grow: 1;
        }
        .scene-action-btn {
            background: var(--konj-primary, #8B5CF6);
            color: #FFFFFF;
            border: none;
            padding: 0.75rem 1.3rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 0.96rem;
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

        /* Compact Duel Cards (No Wimmelbild, Formula-driven) */
        .duel-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
            gap: 1.4rem;
            margin-bottom: 3rem;
        }
        .duel-card {
            background: linear-gradient(155deg, var(--konj-surface, #160C28) 0%, #0D061A 100%);
            border: 1.5px solid var(--konj-border, #3B1E6D);
            border-top: 4px solid var(--konj-border-focus, #A78BFA);
            border-radius: 18px;
            padding: 1.4rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.45);
        }
        .duel-card:hover {
            transform: translateY(-4px);
            border-color: var(--konj-border-focus, #A78BFA);
            background: var(--konj-surface-hover, #22123D);
            box-shadow: 0 14px 32px rgba(0, 0, 0, 0.55), 0 0 18px var(--konj-glow);
        }
        .duel-formula-pill {
            background: rgba(13, 6, 26, 0.85);
            border: 1px solid var(--konj-border, #3B1E6D);
            border-radius: 10px;
            padding: 0.55rem 0.75rem;
            font-size: 0.82rem;
            font-weight: 800;
            color: #FDE68A;
            line-height: 1.4;
        }
        .duel-card-btn {
            margin-top: auto;
            background: rgba(139, 92, 246, 0.2);
            border: 1.5px solid var(--konj-primary, #8B5CF6);
            color: #FFFFFF;
            padding: 0.65rem 1rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .duel-card:hover .duel-card-btn {
            background: var(--konj-primary, #8B5CF6);
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

    // =========================================================
    // SEKTION 1: DE 4 RENE KONJUNKTIONS-FAMILIER + TEKSTFLOW
    // =========================================================
    const sec1Header = document.createElement('div');
    sec1Header.className = 'hub-section-header';
    sec1Header.innerHTML = `
        <h2 class="hub-section-title">${renderDsIcon('bridge', '', { size: 22 })} <span>1. De 4 Konjunktions-Familier & Tekstflow</span></h2>
        <p class="hub-section-subtitle">Hvert bindeord præsenteres kun ét sted efter sin grammatiske familie (sideordnende helsætningskonjunktioner vs. underordnende ledsætningskonjunktioner).</p>
    `;
    viewContainer.appendChild(sec1Header);

    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    const coreModules = [
        {
            id: 'konj_felt_1',
            badge: 'Felt 1 • Sideordnende (Helsætning)',
            icon: 'bridge',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '1. De 5 helsætningskonjunktioner (og, men, eller, for, så)',
            desc: 'Står i forbinderfeltet (F0) mellem to ligeværdige helsætninger: Ændrer ikke ordstillingen, og "ikke" står altid EFTER verbet.',
            btnText: 'Åbn Felt 1 (Helsætning) →',
            action: () => navigateFn('konjunktioner_helsaetning', { felt: 1, filter: 'helsaetning', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_2',
            badge: 'Felt 2 • Underordnende (Logik)',
            icon: 'compare',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '2. Ledsætningskonjunktioner: Årsag, betingelse og kontrast',
            desc: 'De logiske ledsætningsbindeord (fordi, selvom, hvis): Her trækker "ikke"-magneten altid "ikke" ind FØR verbet i ledsætningen.',
            btnText: 'Åbn Felt 2 (Logik) →',
            action: () => navigateFn('konjunktioner_logik', { felt: 2, filter: 'ledsaetning_logik', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_3',
            badge: 'Felt 3 • Underordnende (Tid)',
            icon: 'clock',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '3. Ledsætningskonjunktioner: Tid og rækkefølge',
            desc: 'Placér handlinger på tidslinjen (da, når, mens, inden, efter at, siden, indtil, så snart) – og træn inversion, når tids-ledsætningen står forrest.',
            btnText: 'Åbn Felt 3 (Tid) →',
            action: () => navigateFn('konjunktioner_tid', { felt: 3, filter: 'ledsaetning_tid', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_4_at',
            badge: 'Felt 4 • Tankeboblen ("at" & "om")',
            icon: 'thought',
            img: 'assets/konjunktioner_at_vrimmel.jpg',
            title: '4. Indholds-konjunktioner & Infinitiv ("at" og "om")',
            desc: 'Mestr forskellen på "at" (fakta/tankeboble) og "om" (tvivl/spørgsmål) samt alle 5 sætningskonstruktioner med "at" (for at, ved at, uden at).',
            btnText: 'Åbn Felt 4 ("at" & "om") →',
            action: () => navigateFn('konjunktioner_at', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_5_tekstflow',
            badge: 'Felt 5 • Helhed & Tekstbygning',
            icon: 'compass',
            img: 'assets/tekstens_trafik_vrimmel.jpg',
            title: '5. Tekstens trafik og tekstflow',
            desc: 'Saml trådene i sammenhængende tekster: Se bindeord som sprogets trafiksignaler, reparér "trafikpropper" og byg flydende historier.',
            btnText: 'Åbn Felt 5 (Tekstflow) →',
            action: () => navigateFn('konjunktioner_tekstflow', { from: 'top_konjunktioner' })
        }
    ];

    coreModules.forEach(f => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.innerHTML = `
            <div class="scene-card-img-wrap">
                <img src="${f.img}" alt="${f.title}" class="scene-card-img">
            </div>
            <div class="scene-card-content">
                <span class="scene-card-badge">
                    ${renderDsIcon(f.icon, '', { size: 16 })}
                    <span>${f.badge}</span>
                </span>
                <div class="scene-card-title">${f.title}</div>
                <div class="scene-card-desc">${f.desc}</div>
                <button class="scene-action-btn">${f.btnText}</button>
            </div>
        `;
        card.onclick = f.action;
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);

    // =========================================================
    // SEKTION 2: TVÆRGÅENDE ORDSTILLINGS-DUELLER (4 DUELKORT)
    // =========================================================
    const sec2Header = document.createElement('div');
    sec2Header.className = 'hub-section-header';
    sec2Header.innerHTML = `
        <h2 class="hub-section-title">${renderDsIcon('zap', '', { size: 22 })} <span>2. Tværgående Ordstillings-Dueller (Konjunktion vs. Adverbium & Tvillinger)</span></h2>
        <p class="hub-section-subtitle">Kompakte kontrast-værksteder uden vrimlebilleder: Træn direkte forskellen på konjunktioner og adverbier, der ligner hinanden i betydning eller stavning, men kræver vidt forskellig ordstilling.</p>
    `;
    viewContainer.appendChild(sec2Header);

    const duelGrid = document.createElement('div');
    duelGrid.className = 'duel-cards-grid';

    const duels = [
        {
            badge: 'Duel 1 • Årsag & Virkning',
            icon: 'zap',
            title: '"fordi" vs. "derfor" (og "for" / "så")',
            formula: 'fordi + Subjekt + ikke + Verbum  ↔  Derfor + Verbum + Subjekt',
            desc: 'Kognitiv vendemaskine: Skift sikkert mellem årsag i ledsætning (fordi), årsag i helsætning (for) og virkning med inversion (derfor).',
            btnText: 'Start Duel 1: Fordi ↔ Derfor →',
            action: () => navigateFn('konjunktioner_fordi_derfor', { tab: 'kognitiv', from: 'top_konjunktioner' })
        },
        {
            badge: 'Duel 2 • Modstand & Gennembrud',
            icon: 'prohibited',
            title: '"selvom" vs. "alligevel" (og "men")',
            formula: 'Selvom + Subjekt + ikke + Verbum  ↔  Alligevel + Verbum + Subjekt',
            desc: 'Muren (ledsætningskonjunktionen "selvom") over for bolden, der bryder igennem forhindringen (adverbiet "alligevel" med inversion).',
            btnText: 'Start Duel 2: Selvom ↔ Alligevel →',
            action: () => navigateFn('konjunktioner_selvom_alligevel', { tab: 'kognitiv', from: 'top_konjunktioner' })
        },
        {
            badge: 'Duel 3 • Fortid vs. Vane & Fremtid',
            icon: 'pointInTime',
            title: '"da" vs. "når"',
            formula: 'da = 1 gang i fortiden (Tegnestift)  ↔  når = hver gang / fremtid (Cirkel)',
            desc: 'Træn den klassiske tidsduel mellem et fastlåst punkt i fortiden ("da") og gentagne vaner eller fremtidige begivenheder ("når").',
            btnText: 'Start Duel 3: Da ↔ Når →',
            action: () => navigateFn('konjunktioner_da_naar', { tab: 'kognitiv', from: 'top_konjunktioner' })
        },
        {
            badge: 'Duel 4 • Konsekvens vs. Rækkefølge',
            icon: 'compare',
            title: '"så" (konsekvens) vs. "så" (senere i rækkefølge)',
            formula: ', så + Subjekt + Verbum (Konsekvens)  ↔  (og) så + Verbum + Subjekt (Derefter)',
            desc: 'To ansigter af ordet "så": Konjunktionen "så" (= resultat, ingen inversion: "så jeg gik") mod tidsadverbiet "så" (= bagefter i en rækkefølge: "og så gik jeg" med inversion!).',
            btnText: 'Start Duel 4: "Så" ↔ "Så" →',
            action: () => navigateFn('konjunktioner_saa_duel', { tab: 'kognitiv', from: 'top_konjunktioner' })
        }
    ];

    duels.forEach(d => {
        const dCard = document.createElement('div');
        dCard.className = 'duel-card';
        dCard.innerHTML = `
            <span class="scene-card-badge" style="margin-bottom:0.2rem;">
                ${renderDsIcon(d.icon, '', { size: 15 })}
                <span>${d.badge}</span>
            </span>
            <div class="scene-card-title" style="margin-bottom:0.15rem; font-size:1.22rem;">${d.title}</div>
            <div class="duel-formula-pill">${d.formula}</div>
            <div class="scene-card-desc" style="margin-bottom:0.6rem; font-size:0.9rem;">${d.desc}</div>
            <button class="duel-card-btn">${d.btnText}</button>
        `;
        dCard.onclick = d.action;
        duelGrid.appendChild(dCard);
    });

    viewContainer.appendChild(duelGrid);

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
