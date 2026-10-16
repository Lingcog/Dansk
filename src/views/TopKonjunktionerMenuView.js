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
    viewContainer.className = 'view-container top-konjunktioner-hub';

    // Top Bar with back button & bridge to Felt 7
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

    const felt7Btn = document.createElement('button');
    felt7Btn.className = 'back-btn';
    felt7Btn.style.background = 'rgba(234, 179, 8, 0.15)';
    felt7Btn.style.borderColor = '#eab308';
    felt7Btn.style.color = '#fde047';
    felt7Btn.innerHTML = `Se også felt 7: konnektive adverbier (derfor, alligevel...) ➔`;
    felt7Btn.onclick = () => navigateFn('adverbier_konnektion');
    topBar.appendChild(felt7Btn);

    viewContainer.appendChild(topBar);

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .top-konjunktioner-hub {
            max-width: 1150px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .konj-hub-hero {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .konj-hub-hero h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #6ee7b7, #10b981, #38bdf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .konj-hub-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 780px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        .konj-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        @media (max-width: 600px) {
            .konj-scenes-grid {
                grid-template-columns: 1fr;
            }
        }
        .konj-scene-card {
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
        .konj-scene-card:hover {
            transform: translateY(-8px);
            border-color: #10b981;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.3);
        }
        .konj-scene-card.special-at-card {
            border-color: rgba(245, 158, 11, 0.6);
            background: linear-gradient(160deg, rgba(245, 158, 11, 0.08), #1e293b 45%);
        }
        .konj-scene-card.special-at-card:hover {
            border-color: #f59e0b;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.4);
        }
        .konj-card-img-wrap {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: #0f172a;
        }
        .konj-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .konj-scene-card:hover .konj-card-img {
            transform: scale(1.05);
        }

        .konj-card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .konj-card-title {
            font-size: 1.35rem;
            font-weight: 700;
            margin-bottom: 0.6rem;
            color: white;
        }
        .konj-card-desc {
            color: #94a3b8;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .konj-action-btn {
            background: #059669;
            color: white;
            border: none;
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.95rem;
            text-align: center;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        .konj-scene-card:hover .konj-action-btn {
            background: #10b981;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
        }
        .konj-scene-card.special-at-card .konj-action-btn {
            background: #d97706;
        }
        .konj-scene-card.special-at-card:hover .konj-action-btn {
            background: #f59e0b;
            color: #0f172a;
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'konj-hub-hero';
    hero.innerHTML = `
        <h1>Helsætnings- og ledsætningskonjunktioner</h1>
        <p>Lær hvordan danske sætninger bindes sammen: Hvornår står <em>ikke</em> efter verbet (helsætning), hvornår rykker <em>ikke</em> frem før verbet (ledsætning), og hvordan mestrer man alle de forskellige konstruktioner med <strong><em>at</em></strong>?</p>
    `;
    viewContainer.appendChild(hero);

    const grid = document.createElement('div');
    grid.className = 'konj-scenes-grid';

    const fields = [
        {
            id: 'konj_felt_1',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '1. Helsætningskonjunktioner',
            desc: 'Binder to helsætninger sammen (og, men, eller, for, så) uden at ændre ordstillingen: Verbet står foran "ikke", og "så" udløser ikke inversion.',
            btnText: 'Gå til felt 1 ➔',
            action: () => navigateFn('konjunktioner_all', { filter: 'helsaetning', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_2',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '2. Ledsætninger: årsag, betingelse og kontrast',
            desc: 'Lær "ikke"-magneten (fordi, selvom, hvis, om), hvor nægtelsen rykker foran verbet, samt inversion når ledsætningen står forrest.',
            btnText: 'Gå til felt 2 ➔',
            action: () => navigateFn('konjunktioner_all', { filter: 'ledsaetning_logik', tab: 'laboratorium', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_3',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '3. Tidskonjunktioner',
            desc: 'Udtryk tid, rækkefølge og samtidighed med da, når, mens, inden, før, efter at, siden og indtil.',
            btnText: 'Gå til felt 3 ➔',
            action: () => navigateFn('konjunktioner_all', { filter: 'ledsaetning_tid', tab: 'tid', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_4_at',
            isSpecial: true,
            img: 'assets/konjunktioner_at_vrimmel.jpg',
            title: '4. Ordet "at"',
            desc: 'De forskellige roller for "at": Som ledsætningsbinder, som infinitivmærke (og hvornår det udelades efter modalverber), foran præpositioner og i faste udtryk.',
            btnText: 'Gå til felt 4 ➔',
            action: () => navigateFn('konjunktioner_at', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_5_da_naar',
            isSpecial: true,
            img: 'assets/da_naar_vrimmel.jpg',
            title: '5. "Da" og "når"',
            desc: 'Forskellen på fortid én gang (da) over for vaner og fremtid (når), forklaret visuelt gennem tegnestiften, cirklen og pilen.',
            btnText: 'Gå til felt 5 ➔',
            action: () => navigateFn('konjunktioner_da_naar', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_6_selvom_alligevel',
            isSpecial: true,
            img: 'assets/selvom_alligevel_vrimmel.jpg',
            title: '6. "Selvom" og "alligevel"',
            desc: 'Forstå kontrast og modstand: "Selvom" introducerer forhindringen i en ledsætning, mens "alligevel" bryder igennem i helsætningen.',
            btnText: 'Gå til felt 6 ➔',
            action: () => navigateFn('konjunktioner_selvom_alligevel', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_7_fordi_derfor',
            isSpecial: true,
            img: 'assets/fordi_derfor_vrimmel.jpg',
            title: '7. "Fordi" og "derfor"',
            desc: 'Forbind årsag og virkning med den rette ordstilling: Ledsætning med "fordi" over for helsætning med inversion efter "derfor".',
            btnText: 'Gå til felt 7 ➔',
            action: () => navigateFn('konjunktioner_fordi_derfor', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_8_tekstflow',
            isSpecial: true,
            img: 'assets/tekstens_trafik_vrimmel.jpg',
            title: '8. Tekstens trafik og tekstflow',
            desc: 'Træn hvordan konjunktioner og adverbier skaber sammenhæng, flow og retning i længere historier og dialoger.',
            btnText: 'Gå til felt 8 ➔',
            action: () => navigateFn('konjunktioner_tekstflow', { from: 'top_konjunktioner' })
        }
    ];

    fields.forEach(f => {
        const card = document.createElement('div');
        card.className = `konj-scene-card ${f.isSpecial ? 'special-at-card' : ''}`;
        card.innerHTML = `
            <div class="konj-card-img-wrap">
                <img src="${f.img}" alt="${f.title}" class="konj-card-img">
            </div>
            <div class="konj-card-content">
                <div class="konj-card-title">${f.title}</div>
                <div class="konj-card-desc">${f.desc}</div>
                <button class="konj-action-btn">${f.btnText}</button>
            </div>
        `;
        card.onclick = f.action;
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
