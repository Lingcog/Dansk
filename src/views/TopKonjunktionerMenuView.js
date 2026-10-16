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
        .adj-scene-card:hover:not(.disabled) .adj-scene-card-btn {
            background: #10b981;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'adj-hub-hero';
    hero.innerHTML = `
        <h1>Helsætnings- og ledsætningskonjunktioner</h1>
        <p>Lær hvordan danske sætninger bindes sammen: Hvornår står <em>ikke</em> efter verbet (helsætning), hvornår rykker <em>ikke</em> frem før verbet (ledsætning), og hvordan mestrer man alle de forskellige konstruktioner med <strong><em>at</em></strong>?</p>
    `;
    viewContainer.appendChild(hero);

    const grid = document.createElement('div');
    grid.className = 'adj-scenes-grid';

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
            img: 'assets/konjunktioner_at_vrimmel.jpg',
            title: '4. Ordet "at"',
            desc: 'De forskellige roller for "at": Som ledsætningsbinder, som infinitivmærke (og hvornår det udelades efter modalverber), foran præpositioner og i faste udtryk.',
            btnText: 'Gå til felt 4 ➔',
            action: () => navigateFn('konjunktioner_at', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_5_da_naar',
            img: 'assets/da_naar_vrimmel.jpg',
            title: '5. "Da" og "når"',
            desc: 'Forskellen på fortid én gang (da) over for vaner og fremtid (når), forklaret visuelt gennem tegnestiften, cirklen og pilen.',
            btnText: 'Gå til felt 5 ➔',
            action: () => navigateFn('konjunktioner_da_naar', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_6_selvom_alligevel',
            img: 'assets/selvom_alligevel_vrimmel.jpg',
            title: '6. "Selvom" og "alligevel"',
            desc: 'Forstå kontrast og modstand: "Selvom" introducerer forhindringen i en ledsætning, mens "alligevel" bryder igennem i helsætningen.',
            btnText: 'Gå til felt 6 ➔',
            action: () => navigateFn('konjunktioner_selvom_alligevel', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_7_fordi_derfor',
            img: 'assets/fordi_derfor_vrimmel.jpg',
            title: '7. "Fordi" og "derfor"',
            desc: 'Forbind årsag og virkning med den rette ordstilling: Ledsætning med "fordi" over for helsætning med inversion efter "derfor".',
            btnText: 'Gå til felt 7 ➔',
            action: () => navigateFn('konjunktioner_fordi_derfor', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_8_tekstflow',
            img: 'assets/tekstens_trafik_vrimmel.jpg',
            title: '8. Tekstens trafik og tekstflow',
            desc: 'Træn hvordan konjunktioner og adverbier skaber sammenhæng, flow og retning i længere historier og dialoger.',
            btnText: 'Gå til felt 8 ➔',
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
                <div class="adj-scene-card-title">${f.title}</div>
                <div class="adj-scene-card-desc">${f.desc}</div>
                <button class="adj-scene-card-btn">${f.btnText}</button>
            </div>
        `;
        card.onclick = f.action;
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
