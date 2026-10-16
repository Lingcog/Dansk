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
    felt7Btn.innerHTML = `🔗 Se også Felt 7: Konnektive Adverbier (derfor, alligevel...) ➔`;
    felt7Btn.onclick = () => navigateFn('adverbier_konnektion');
    topBar.appendChild(felt7Btn);

    viewContainer.appendChild(topBar);

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .top-konjunktioner-hub {
            max-width: 1200px;
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
            font-weight: 900;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #6ee7b7, #10b981, #38bdf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .konj-hub-hero p {
            color: #94a3b8;
            font-size: 1.15rem;
            max-width: 800px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }
        .konj-hub-facts-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #6ee7b7;
            padding: 0.5rem 1.3rem;
            border-radius: 20px;
            font-size: 0.95rem;
            font-weight: 700;
        }

        .konj-scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
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
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(16, 185, 129, 0.35);
        }
        .konj-scene-card.special-at-card {
            border-color: rgba(245, 158, 11, 0.6);
            background: linear-gradient(160deg, rgba(245, 158, 11, 0.08), #1e293b 45%);
        }
        .konj-scene-card.special-at-card:hover {
            border-color: #f59e0b;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 28px rgba(245, 158, 11, 0.45);
        }
        .konj-card-img-wrap {
            position: relative;
            width: 100%;
            height: 210px;
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
        .konj-pill-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(15, 23, 42, 0.88);
            border: 1px solid rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.85rem;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 800;
            color: #f1f5f9;
        }
        .badge-konj-1 { border-color: #22c55e; color: #86efac; }
        .badge-konj-2 { border-color: #06b6d4; color: #67e8f9; }
        .badge-konj-3 { border-color: #a855f7; color: #d8b4fe; }
        .badge-konj-4 { border-color: #f59e0b; color: #fde68a; }

        .konj-card-content {
            padding: 1.6rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .konj-card-content h3 {
            font-size: 1.4rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            color: white;
        }
        .konj-card-content p {
            color: #94a3b8;
            font-size: 0.96rem;
            line-height: 1.55;
            margin-bottom: 1.2rem;
            flex-grow: 1;
        }
        .konj-word-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-bottom: 1.3rem;
        }
        .konj-chip {
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #e2e8f0;
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 700;
        }
        .konj-action-btn {
            background: #059669;
            color: white;
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
        .konj-scene-card:hover .konj-action-btn {
            background: #10b981;
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
        <h1>Helsætnings- & Ledsætningskonjunktioner</h1>
        <p>Lær hvordan danske sætninger bindes sammen: Hvornår står <em>ikke</em> efter verbet (helsætning), hvornår rykker <em>ikke</em> frem før verbet (ledsætning), og hvordan mestrer man alle de forskellige konstruktioner med <strong><em>at</em></strong>?</p>
        <div class="konj-hub-facts-badge">
            <span>🌉</span> 8 felter • Fra isolerede regler og vrimlebilleder til sammenhængende Tekstflow & Historier!
        </div>
    `;
    viewContainer.appendChild(hero);

    const grid = document.createElement('div');
    grid.className = 'konj-scenes-grid';

    const fields = [
        {
            id: 'konj_felt_1',
            badge: '🟢 Felt 1 • 5 helsætningskonjunktioner',
            badgeClass: 'badge-konj-1',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '1. Helsætningskonjunktioner (Forbinderfelt F0)',
            desc: 'De 5 sideordnende konjunktioner, der binder to helsætninger sammen uden at ændre ordstillingen: Verbet står FØR "ikke", og "så" udløser IKKE inversion!',
            chips: ['og', 'men', 'eller', 'for (+ V + ikke)', 'så (+ S + V)'],
            btnText: 'Træn helsætningskonjunktioner ➔',
            action: () => navigateFn('konjunktioner_all', { filter: 'helsaetning', tab: 'vrimmel', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_2',
            badge: '🔵 Felt 2 • Ledsætning & "Ikke"-Magneten',
            badgeClass: 'badge-konj-2',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '2. Ledsætninger: Årsag, Betingelse & Kontrast',
            desc: 'Mestre "IKKE"-magneten i ledsætninger (Subjekt + IKKE + Verbum), forskellen på "for" vs. "fordi", "hvis" vs. "om" samt inversion når ledsætningen står forrest.',
            chips: ['fordi (+ ikke + V)', 'selvom', 'hvis', 'om (spørgsmål/tvivl)'],
            btnText: 'Træn ledsætninger & ordstilling ➔',
            action: () => navigateFn('konjunktioner_all', { filter: 'ledsaetning_logik', tab: 'laboratorium', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_3',
            badge: '🟣 Felt 3 • 8 tidskonjunktioner',
            badgeClass: 'badge-konj-3',
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '3. Tidskonjunktioner: Da vs. Når, Mens & Inden',
            desc: 'Hvornår bruger man "da" (én gang i fortiden), og hvornår bruger man "når" (nutid, fremtid og vaner)? Samt samtidighed og rækkefølge i tid.',
            chips: ['da (fortid 1 gang)', 'når (fremtid/vane)', 'mens', 'inden / før', 'efter at', 'siden', 'indtil', 'så snart'],
            btnText: 'Træn da/når & tidskonjunktioner ➔',
            action: () => navigateFn('konjunktioner_all', { filter: 'ledsaetning_tid', tab: 'tid', from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_4_at',
            badge: '🌟 Felt 4 • Særskilt Fokusfelt (18 konstruktioner)',
            badgeClass: 'badge-konj-4',
            isSpecial: true,
            img: 'assets/konjunktioner_at_vrimmel.jpg',
            title: '4. Ordet "AT" i alle sætningskonstruktioner',
            desc: 'Kognitiv ramme (Tankeboblen & Billedrammen) og træning i de 5 konstruktioner med "at": Konjunktionen "at", infinitivmærket "at" (vs. modalverber uden "at"), præposition + "at" og sammensatte bindeord.',
            chips: ['siger/tror, at + S + V', 'elsker at + infinitiv', 'kan/skal (UDEN at!)', 'glad for at / god til at', 'kom til at', 'for at / uden at / ved at', 'så ... at'],
            btnText: 'Åbn det særskilte "AT"-Felt 🌟 ➔',
            action: () => navigateFn('konjunktioner_at', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_5_da_naar',
            badge: '📅 Felt 5 • Særskilt Flade (Vrimlebillede + Kognitiv Guide)',
            badgeClass: 'badge-konj-1',
            isSpecial: true,
            img: 'assets/da_naar_vrimmel.jpg',
            title: '5. "DA" og "NÅR" – Tegnestiften 📌, Cirklen 🔁 & Pilen 🏹',
            desc: 'Særskilt flade med eget vrimlebillede og de 3 kognitive kalender-symboler: 📌 Tegnestiften (da = én gang i fortiden), 🔁 Cirklen (når = gentagne vaner) og 🏹 Pilen (når = fremtiden).',
            chips: ['📌 da (fortid 1 gang)', '🔁 når (vane i nutid & fortid)', '🏹 når (fremtid)', 'Ledsætning + Inversion'],
            btnText: 'Åbn "DA og NÅR"-Fladen 📅 ➔',
            action: () => navigateFn('konjunktioner_da_naar', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_6_selvom_alligevel',
            badge: '🧱☄️ Felt 6 • Særskilt Flade (Vrimlebillede + Mur & Bold)',
            badgeClass: 'badge-konj-4',
            isSpecial: true,
            img: 'assets/selvom_alligevel_vrimmel.jpg',
            title: '6. "SELVOM" og "ALLIGEVEL" – Muren 🧱 & Bolden ☄️',
            desc: 'Særskilt flade med eget vrimlebillede og den kognitive Mur/Bold-illustration: 🧱 Selvom bygger forhindringen i en ledsætning, mens ☄️ Alligevel er bolden, der bryder igennem muren i hovedsætningen!',
            chips: ['🧱 selvom (+ S + ikke + V)', '☄️ alligevel (på trods)', 'Sætnings-Transformeren', 'Inversion i front'],
            btnText: 'Åbn "SELVOM og ALLIGEVEL"-Fladen 🧱 ➔',
            action: () => navigateFn('konjunktioner_selvom_alligevel', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_7_fordi_derfor',
            badge: '⛽➡️ Felt 7 • Særskilt Flade (Vrimlebillede + Årsag & Virkning)',
            badgeClass: 'badge-konj-2',
            isSpecial: true,
            img: 'assets/fordi_derfor_vrimmel.jpg',
            title: '7. "FORDI" og "DERFOR" – Årsag ⛽ vs. Virkning ➡️',
            desc: 'Særskilt flade med eget vrimlebillede og Årsag/Virkning-illustrationen: ⛽ Virkning + FORDI ➔ Årsag (ledsætning med "ikke" før verbet) over for ➡️ Årsag. DERFOR ➔ Virkning (med Inversion)!',
            chips: ['⛽ fordi (+ S + ikke + V)', '➡️ derfor (+ V + S = Inversion!)', 'Sætnings-Vendemaskinen', 'Årsag ↔ Virkning'],
            btnText: 'Åbn "FORDI og DERFOR"-Fladen ➡️ ➔',
            action: () => navigateFn('konjunktioner_fordi_derfor', { from: 'top_konjunktioner' })
        },
        {
            id: 'konj_felt_8_tekstflow',
            badge: '📖 Felt 8 • Kulminationen: Tekstflow & Historier',
            badgeClass: 'badge-konj-1',
            isSpecial: true,
            img: 'assets/konjunktioner_vrimmel.jpg',
            title: '8. Tekstflow & Historier (Sæt det hele sammen!)',
            desc: 'Se hvordan alle bindeordene arbejder sammen i 3 levende hverdagsfortællinger med fuldt tekstflow: Mathias i snevejret 🚲, Anna i drivhuset 🌿 og Lars på caféen ☕. Oplev hvordan konjunktioner skaber flydende dansk!',
            chips: ['📖 Tekstflow', 'Historie 1: Mathias i sneen 🚲', 'Historie 2: Anna i drivhuset 🌿', 'Historie 3: Lars på caféen ☕', 'Sammenhængende dansk'],
            btnText: 'Åbn Tekstflow & Historier 📖 ➔',
            action: () => navigateFn('conjunction_choice', { subPath: 'traening3', from: 'top_konjunktioner' })
        }
    ];

    fields.forEach(f => {
        const card = document.createElement('div');
        card.className = `konj-scene-card ${f.isSpecial ? 'special-at-card' : ''}`;
        card.innerHTML = `
            <div class="konj-card-img-wrap">
                <img src="${f.img}" alt="${f.title}" class="konj-card-img">
                <div class="konj-pill-badge ${f.badgeClass}">${f.badge}</div>
            </div>
            <div class="konj-card-content">
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
                <div class="konj-word-chips">
                    ${f.chips.map(c => `<span class="konj-chip">${c}</span>`).join('')}
                </div>
                <button class="konj-action-btn">${f.btnText}</button>
            </div>
        `;
        card.onclick = f.action;
        grid.appendChild(card);
    });

    viewContainer.appendChild(grid);
    container.appendChild(viewContainer);
}
