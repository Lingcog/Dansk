import { getTranslation } from '../utils/i18n.js';

/**
 * Top100AdverbierMenuView - Hub for de mest almindelige danske adverbier.
 * 6 semantiske felter i et balanceret 3x2 grid.
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
        .hub-facts-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            background: rgba(14, 165, 233, 0.15);
            border: 1px solid #38bdf8;
            color: #38bdf8;
            padding: 0.5rem 1.3rem;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 700;
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
        .badge-adv-1 { border-color: #38bdf8; color: #38bdf8; }
        .badge-adv-2 { border-color: #f59e0b; color: #f59e0b; }
        .badge-adv-3 { border-color: #ec4899; color: #f472b6; }
        .badge-adv-4 { border-color: #a855f7; color: #c084fc; }
        .badge-adv-5 { border-color: #22c55e; color: #4ade80; }
        .badge-adv-6 { border-color: #eab308; color: #fde047; }

        .scene-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
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
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'hub-hero';
    hero.innerHTML = `
        <h1>De mest almindelige adverbier</h1>
        <p>Lær de afgørende ord, der skaber sammenhæng, beskriver måden, viser tid og retning samt udtrykker din holdning i dansk samtale.</p>
        <div class="hub-facts-badge">
            <span>🧭</span> 6 semantiske felter • Nøglen til flydende dansk
        </div>
    `;
    viewContainer.appendChild(hero);

    // Scenes Grid (3x2)
    const grid = document.createElement('div');
    grid.className = 'hub-scenes-grid';

    const fields = [
        {
            id: 'adverbier_sted',
            badge: '📍 Felt 1 • 18 ord',
            badgeClass: 'badge-adv-1',
            img: 'assets/adverbier_sted_vrimmel.jpg',
            title: '1. Sted: Retning vs. Hvile',
            desc: 'Mestre den berømte forskel mellem bevægelse mod et mål (hjem, ind, ud, op) og stilstand på stedet (hjemme, inde, ude, oppe).',
            btnText: 'Udforsk retning & hvile ➔'
        },
        {
            id: 'adverbier_tid',
            badge: '⏳ Felt 2 • 19 ord',
            badgeClass: 'badge-adv-2',
            img: 'assets/natur_fritid_vrimmel.jpg',
            title: '2. Tid & Frekvens',
            desc: 'Hvornår og hvor tit? Lær vaner (altid, ofte, sjældent, aldrig) og tidsforløb (nu, snart, allerede, endnu, stadig).',
            btnText: 'Udforsk tid & frekvens ➔'
        },
        {
            id: 'adverbier_maade',
            badge: '⚡ Felt 3 • 20 ord',
            badgeClass: 'badge-adv-3',
            img: 'assets/byrum_vrimmel.jpg',
            title: '3. Måde (-t reglen)',
            desc: 'Hvordan foregår handlingen? Forstå den gyldne regel: Ting (en hurtig bil) vs. Handling (kører hurtigt).',
            btnText: 'Udforsk mådesadverbier ➔'
        },
        {
            id: 'adverbier_grad',
            badge: '🌡️ Felt 4 • 20 ord',
            badgeClass: 'badge-adv-4',
            img: 'assets/koekken_vrimmel.jpg',
            title: '4. Grad & Intensitet',
            desc: 'Hvor meget gælder det? Træn skalaen fra 0% til over 100% (slet ikke, lidt, ret, meget, for varmt).',
            btnText: 'Udforsk intensitetsskalaen ➔'
        },
        {
            id: 'adverbier_holdning',
            badge: '💬 Felt 5 • 20 ord',
            badgeClass: 'badge-adv-5',
            img: 'assets/klasse_kontor_vrimmel.jpg',
            title: '5. Holdning & Småord',
            desc: 'Talerens stemme og de danske modalpartikler: heldigvis, desværre, selvfølgelig og de uundværlige småord (jo, vel, nok, vist).',
            btnText: 'Udforsk talerens stemme ➔'
        },
        {
            id: 'adverbier_konnektion',
            badge: '🔗 Felt 6 • 19 ord',
            badgeClass: 'badge-adv-6',
            img: 'assets/station_indkoeb_vrimmel.jpg',
            title: '6. Konnektion & Tekstbindere',
            desc: 'Skab logisk sammenhæng mellem sætninger og afsnit: derfor (årsag), alligevel (kontrast), nemlig (begrundelse) og ellers.',
            btnText: 'Udforsk tekstbindere ➔'
        }
    ];

    fields.forEach(f => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.innerHTML = `
            <div class="scene-card-img-wrap">
                <img src="${f.img}" alt="${f.title}" class="scene-card-img">
                <div class="scene-pill-badge ${f.badgeClass}">${f.badge}</div>
            </div>
            <div class="scene-card-content">
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
                <button class="scene-action-btn">${f.btnText}</button>
            </div>
        `;
        card.onclick = () => navigateFn(f.id);
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
