import { getTranslation, getLang } from '../utils/i18n.js';
import { conjunctionData } from '../utils/conjunctionData.js';
import { baseUrl } from '../utils/config.js';

/**
 * KonjunktionerTekstflowView - Felt 8: Tekstens Trafik & Tekstflow
 * 
 * Nytænkt didaktisk flade for sammenhængende sprogflow:
 * Bindeord fungerer som trafikskilte og færdselsregler:
 *  - 🛣️ Den lige motorvej (og)
 *  - 🔀 Det skarpe sving (men)
 *  - ⛽ Tankstationen & Motoren (fordi)
 *  - 🏹 Retningspilen & Afkørslen (derfor)
 *  - 🧱 Vejspærringen & Muren (selvom)
 *  - 🚙 Terrænbilen / Gennembruddet (alligevel)
 *  - 🔁 Rundkørslen & Fremtidsvejen (når)
 *  - 📍 GPS-Tegnestiften i fortiden (da)
 *
 * 6 Øvelsesbaner:
 * 1. 🗺️ Trafikkortet & Trafikcentralen (Det Kognitive Overblik & Hotspots)
 * 2. 📖 Historie-Værkstedet (4 Autentiske Fortællinger: Mathias, Anna, Lars, Amina)
 * 3. 🚧 Trafikproppen: Find og ret fejlen i flowet! (10 gåder)
 * 4. 🔀 Fra Staccato til Flow: Forbind sætningerne til flydende sprog
 * 5. ⚡ Trafik-Duellen: Vælg det rette signal (12 hurtige scenarier)
 * 6. 🧲 Trafikpolitiets Ordstillings-Laboratorium ("IKKE"-Magneten & Inversion)
 */
export function renderKonjunktionerTekstflowView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container tekstflow-view';

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.flexWrap = 'wrap';
    topBar.style.gap = '0.8rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← Tilbage til Konjunktioner-fladen`;
    backBtn.onclick = () => navigateFn(extraData.from || 'top_konjunktioner');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // TTS Audio Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // 8 Traffic Signals Data (Trafikcentralen)
    const TRAFIK_SIGNALS_DATA = [
        {
            id: 'da',
            word: 'da',
            role: 'GPS-Tegnestiften',
            category: 'tid_fortid',
            icon: '📍',
            color: '#ef4444',
            x: 9,
            y: 55,
            metaphor: 'GPS-nålen, der låser et fast punkt i fortiden',
            desc: 'Bruges til én bestemt, afsluttet begivenhed eller periode i fortiden ("when" in past). Kan aldrig pege på fremtiden!',
            example: 'Da jeg boede i Aarhus, cyklede jeg til universitetet hver morgen.',
            syntaxRule: 'Ledsætning! "Ikke" står FØR verbet ("da jeg IKKE havde penge"). Ledsætning i front giver inversion.',
            translations: {
                en: { word: 'when (past single)', role: 'GPS Pin' },
                de: { word: 'als (Vergangenheit)', role: 'GPS-Stecknadel' },
                es: { word: 'cuando (pasado)', role: 'Chincheta GPS' },
                ar: { word: 'عِنْدَمَا (في الماضي)', role: 'دبوس الخريطة' },
                tr: { word: '-diğinde (geçmiş)', role: 'GPS İğnesi' },
                uk: { word: 'коли (минуле)', role: 'GPS-шпилька' }
            }
        },
        {
            id: 'naar',
            word: 'når',
            role: 'Rundkørslen & Tidsmaskinen',
            category: 'vane_fremtid',
            icon: '🔁',
            color: '#10b981',
            x: 33,
            y: 31,
            metaphor: 'Rundkørslen for vaner og motorvejen ind i fremtiden',
            desc: 'Bruges til gentagne vaner ("hver gang") i nutid/fortid, samt ALT der sker i fremtiden.',
            example: 'Når vækkeuret ringer i morgen, hopper jeg ud af sengen.',
            syntaxRule: 'Ledsætning! "Ikke" står FØR verbet ("når han IKKE kommer").',
            translations: {
                en: { word: 'when / whenever', role: 'Roundabout & Future' },
                de: { word: 'wenn (wiederholt / Zukunft)', role: 'Kreisverkehr' },
                es: { word: 'cuando (hábito / futuro)', role: 'Rotonda y Futuro' },
                ar: { word: 'عِنْدَمَا (عادة / مستقبل)', role: 'الدوار والمستقبل' },
                tr: { word: 'zaman / her seferinde', role: 'Döner Kavşak' },
                uk: { word: 'коли (звичка / майбутнє)', role: 'Кільцевий рух' }
            }
        },
        {
            id: 'og',
            word: 'og',
            role: 'Den lige motorvej',
            category: 'sideordning',
            icon: '🛣️',
            color: '#38bdf8',
            x: 49,
            y: 54,
            metaphor: 'Kør videre i samme spor i fuld fart',
            desc: 'Sideordner to ligeværdige helsætninger eller ord. Handlingen fortsætter i samme retning uden forhindringer.',
            example: 'Solen skinner over byen, og fuglene synger i træerne.',
            syntaxRule: 'Helsætningskonjunktion (Felt 0). Ændrer IKKE ordstillingen ("ikke" står EFTER verbet).',
            translations: {
                en: { word: 'and', role: 'Straight Highway' },
                de: { word: 'und', role: 'Gerade Autobahn' },
                es: { word: 'y / e', role: 'Autopista recta' },
                ar: { word: 'وَ (عطف)', role: 'الطريق السريع المباشر' },
                tr: { word: 've', role: 'Düz Otoyol' },
                uk: { word: 'і / та', role: 'Пряма магістраль' }
            }
        },
        {
            id: 'men',
            word: 'men',
            role: 'Det skarpe sving',
            category: 'kontrast',
            icon: '🔀',
            color: '#f97316',
            x: 44,
            y: 76,
            metaphor: 'U-vendingen eller det uventede kurvesving',
            desc: 'Viser en modsætning, et brud med forventningen eller en kontrast mellem to situationer.',
            example: 'Jeg ville gerne med i biografen, men jeg har for travlt med lektierne.',
            syntaxRule: 'Helsætningskonjunktion (Felt 0). Normal ligefrem ordstilling ("ikke" efter verbet).',
            translations: {
                en: { word: 'but', role: 'Sharp Turn' },
                de: { word: 'aber', role: 'Scharfe Kurve' },
                es: { word: 'pero', role: 'Curva cerrada' },
                ar: { word: 'لَكِنْ', role: 'المنعطف الحاد' },
                tr: { word: 'ama / fakat', role: 'Keskin Viraj' },
                uk: { word: 'але', role: 'Крутий поворот' }
            }
        },
        {
            id: 'fordi',
            word: 'fordi',
            role: 'Motoren & Tankstationen',
            category: 'aarsag',
            icon: '⛽',
            color: '#06b6d4',
            x: 81,
            y: 49,
            metaphor: 'El-ladestationen, der giver kraft og begrunder handlingen bagud',
            desc: 'Peger BAGUD på årsagen og grunden: Hvorfor skete det? Hvad startede motoren?',
            example: 'Han kom for sent til mødet, fordi bussen punkterede på motorvejen.',
            syntaxRule: 'Ledsætning! "Ikke" rykker FØR verbet: "... fordi han IKKE hørte vækkeuret".',
            translations: {
                en: { word: 'because', role: 'Engine & Fuel' },
                de: { word: 'weil', role: 'Motor & Tankstelle' },
                es: { word: 'porque', role: 'Motor y Gasolinera' },
                ar: { word: 'لِأَنَّ', role: 'المحرك والوقود' },
                tr: { word: 'çünkü', role: 'Motor ve Yakıt' },
                uk: { word: 'тому що', role: 'Двигун і пальне' }
            }
        },
        {
            id: 'derfor',
            word: 'derfor',
            role: 'Retningspilen & Afkørslen',
            category: 'virkning',
            icon: '🏹',
            color: '#8b5cf6',
            x: 77,
            y: 22,
            metaphor: 'Det store grønne motorvejsskilt, der skyder konsekvensen fremad',
            desc: 'Peger FREMAD på virkningen og resultatet. Årsagen er allerede nævnt – nu sendes bolden videre!',
            example: 'Bussen var aflyst i morges. Derfor tog jeg min cykel på arbejde.',
            syntaxRule: 'Konnektivt adverbium! Udløser INVERSION (verbet på 2. plads: "Derfor TOG (V) JEG (S)...").',
            translations: {
                en: { word: 'therefore / that is why', role: 'Direction Arrow' },
                de: { word: 'deshalb / darum', role: 'Richtungspfeil' },
                es: { word: 'por eso / por lo tanto', role: 'Flecha de dirección' },
                ar: { word: 'لِذَلِكَ', role: 'سهم الاتجاه' },
                tr: { word: 'bu yüzden / bundan dolayı', role: 'Yön Oku' },
                uk: { word: 'тому / через це', role: 'Стрілка напрямку' }
            }
        },
        {
            id: 'selvom',
            word: 'selvom',
            role: 'Vejspærringen & Muren',
            category: 'hindring',
            icon: '🧱',
            color: '#ec4899',
            x: 71,
            y: 73,
            metaphor: 'Den massive mur eller vejarbejdet på kørebanen',
            desc: 'Bygger en forhindring eller indrømmelse op: Selvom vejen er blokeret, findes der en vej videre.',
            example: 'Selvom det stormede og sneede voldsomt, afleverede cykelbuddet pakken til tiden.',
            syntaxRule: 'Ledsætning! "Ikke" står foran verbet: "Selvom han IKKE havde sovet...". Ledsætning i front giver inversion.',
            translations: {
                en: { word: 'even though / although', role: 'Roadblock / Wall' },
                de: { word: 'obwohl', role: 'Straßensperre / Mauer' },
                es: { word: 'aunque', role: 'Muro de obstáculos' },
                ar: { word: 'رَغْمَ أَنَّ', role: 'حاجز الطريق' },
                tr: { word: '-e rağmen / olsa bile', role: 'Yol Engeli' },
                uk: { word: 'хоча / незважаючи на те що', role: 'Дорожній бар\'єр' }
            }
        },
        {
            id: 'alligevel',
            word: 'alligevel',
            role: 'Terrænbilen / Bulldozeren',
            category: 'trods',
            icon: '🚙',
            color: '#3b82f6',
            x: 79,
            y: 83,
            metaphor: 'Den robuste bil, der smadrer lige igennem vejspærringen og når frem',
            desc: 'Handlingen gennemføres PÅ TRODS AF forhindringen. Bolden bryder muren!',
            example: 'Det regnede hele eftermiddagen, men vi gik alligevel en lang tur i skoven.',
            syntaxRule: 'Adverbium i hovedsætningen. Viser triumfen over forhindringen (på trods).',
            translations: {
                en: { word: 'anyway / nevertheless', role: 'The Bulldozer Car' },
                de: { word: 'trotzdem / dennoch', role: 'Der Geländewagen' },
                es: { word: 'de todos modos / aun así', role: 'El coche todoterreno' },
                ar: { word: 'مَعَ ذَلِكَ / عَلَى أَيِّ حَالٍ', role: 'سيارة الدفع الرباعي' },
                tr: { word: 'yine de / her şeye rağmen', role: 'Engeli Aşan Araç' },
                uk: { word: 'все одно / попри це', role: 'Позашляховик' }
            }
        }
    ];

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .tekstflow-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem 1.5rem 4rem;
            color: #f8fafc;
        }
        .tf-hero {
            text-align: center;
            margin-bottom: 2.2rem;
        }
        .tf-hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid #10b981;
            color: #6ee7b7;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.92rem;
            font-weight: 800;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .tf-hero h1 {
            font-size: 2.6rem;
            font-weight: 900;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #38bdf8 0%, #10b981 50%, #fde047 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .tf-hero p {
            color: #cbd5e1;
            font-size: 1.15rem;
            max-width: 860px;
            margin: 0 auto;
            line-height: 1.6;
        }

        /* Tabs Nav */
        .tf-tabs-nav {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            margin-bottom: 2rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }
        .tf-tab-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.75rem 1.25rem;
            border-radius: 14px;
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .tf-tab-btn:hover {
            color: #f8fafc;
            border-color: #38bdf8;
            background: #334155;
        }
        .tf-tab-btn.active {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: white;
            border-color: #38bdf8;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
        }

        /* Trafik-kort stage */
        .tf-stage-wrap {
            background: #0f172a;
            border: 2px solid rgba(255, 255, 255, 0.12);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            margin-bottom: 2rem;
        }
        .tf-stage-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background: rgba(15, 23, 42, 0.9);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        .tf-stage-body {
            position: relative;
            width: 100%;
            line-height: 0;
            overflow: hidden;
        }
        .tf-stage-img {
            width: 100%;
            height: auto;
            display: block;
        }
        .tf-pin {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #0284c7;
            border: 3px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.15rem;
            cursor: pointer;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
            transition: all 0.25s ease;
            z-index: 10;
        }
        .tf-pin:hover, .tf-pin.active {
            transform: translate(-50%, -50%) scale(1.35);
            z-index: 30;
            box-shadow: 0 0 25px #38bdf8;
            border-color: #fde047;
        }
        .tf-pin-label {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            color: #f8fafc;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 5px;
            pointer-events: none;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        /* Inspector Panel */
        .tf-inspector {
            background: #1e293b;
            border: 2px solid #38bdf8;
            border-radius: 20px;
            padding: 1.8rem;
            margin-top: 1.5rem;
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 2rem;
            align-items: start;
            animation: fadeIn 0.3s ease;
        }
        @media (max-width: 850px) {
            .tf-inspector { grid-template-columns: 1fr; }
        }

        /* Story Container */
        .tf-story-card {
            background: #1e293b;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
        }
        .tf-select {
            display: inline-block;
            padding: 0.35rem 0.8rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 1.15rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin: 0 0.3rem;
            outline: none;
        }
        .tf-select.unanswered {
            background: rgba(30, 41, 59, 0.9);
            border: 2px dashed #38bdf8;
            color: #38bdf8;
        }
        .tf-select.correct {
            background: rgba(34, 197, 94, 0.2);
            border: 2px solid #22c55e;
            color: #4ade80;
        }
        .tf-select.wrong {
            background: rgba(239, 68, 68, 0.2);
            border: 2px solid #ef4444;
            color: #f87171;
        }

        /* Action Buttons */
        .action-btn-primary {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            border: none;
            padding: 0.85rem 1.8rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .action-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'tf-hero';
    hero.innerHTML = `
        <h1>Tekstens trafik og det flydende sprog</h1>
        <p>Bindeord er sprogets færdselsregler og trafikskilte: De bestemmer, om teksten kører ligeud på motorvejen (<strong>og</strong>), tager et skarpt sving (<strong>men</strong>), tanker brændstof på årsagen (<strong>fordi</strong>), skyder konsekvensen afsted med en pil (<strong>derfor</strong>), bygger en vejspærring (<strong>selvom</strong>), gennembryder forhindringen (<strong>alligevel</strong>), tager en rundkørsel for vaner (<strong>når</strong>) eller sætter en GPS-tegnestift i fortiden (<strong>da</strong>)!</p>
    `;
    viewContainer.appendChild(hero);

    // 6 Tabs Configuration
    const tabs = [
        { id: 'kort', label: '1. Trafikkortet og trafikcentralen (overblik)', icon: '🗺️' },
        { id: 'historier', label: '2. Historie-værkstedet (4 fortællinger)', icon: '📖' },
        { id: 'trafikprop', label: '3. Trafikproppen: ret fejlen i flowet!', icon: '🚧' },
        { id: 'staccato', label: '4. Fra staccato til flow (sammenkædning)', icon: '🔀' },
        { id: 'duel', label: '5. Trafik-duellen (hurtige scenarier)', icon: '⚡' },
        { id: 'ordstilling', label: '6. Trafikpolitiets ordstilling ("ikke" og inversion)', icon: '🧲' }
    ];

    const nav = document.createElement('div');
    nav.className = 'tf-tabs-nav';

    let currentTab = (extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'kort';
    // If incoming subPath was 'traening3' or 'tekstflow', default to 'historier'
    if (currentTab === 'traening3' || currentTab === 'tekstflow') currentTab = 'historier';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `tf-tab-btn ${currentTab === t.id ? 'active' : ''}`;
        btn.id = `tf-tab-${t.id}`;
        btn.innerHTML = `<span>${t.icon}</span> ${t.label}`;
        btn.onclick = () => switchTab(t.id);
        nav.appendChild(btn);
    });
    viewContainer.appendChild(nav);

    const tabContent = document.createElement('div');
    viewContainer.appendChild(tabContent);

    function switchTab(tabId) {
        currentTab = tabId;
        const lang = getLang();
        history.pushState(null, '', '#/' + lang + '/konjunktioner_tekstflow/' + tabId);
        nav.querySelectorAll('.tf-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = nav.querySelector(`#tf-tab-${tabId}`);
        if (activeBtn) activeBtn.classList.add('active');

        tabContent.innerHTML = '';
        if (tabId === 'kort') renderTabTrafikkort(tabContent);
        else if (tabId === 'historier') renderTabHistorier(tabContent);
        else if (tabId === 'trafikprop') renderTabTrafikprop(tabContent);
        else if (tabId === 'staccato') renderTabStaccato(tabContent);
        else if (tabId === 'duel') renderTabDuel(tabContent);
        else if (tabId === 'ordstilling') renderTabOrdstilling(tabContent);
    }

    // ==========================================
    // BANE 1: TRAFIKKORTET & TRAFIKCENTRALEN
    // ==========================================
    function renderTabTrafikkort(parent) {
        const stageWrap = document.createElement('div');
        stageWrap.className = 'tf-stage-wrap';

        // Stage Header with Category Filters
        const header = document.createElement('div');
        header.className = 'tf-stage-header';
        header.innerHTML = `
            <div style="font-weight: 800; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>🚦</span> Trafikcentralen: 8 centrale signaler i tekstens flow
            </div>
            <div id="tf-filter-btns" style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                <button class="action-btn-primary" data-filter="all" style="padding: 0.35rem 0.8rem; font-size: 0.85rem;">Alle Signaler (8)</button>
                <button class="action-btn-primary" data-filter="fremdrift" style="padding: 0.35rem 0.8rem; font-size: 0.85rem; background: #334155;">🛣️ Fremdrift & Sving (og, men)</button>
                <button class="action-btn-primary" data-filter="aarsag" style="padding: 0.35rem 0.8rem; font-size: 0.85rem; background: #334155;">⛽ Årsag & Pilen (fordi, derfor)</button>
                <button class="action-btn-primary" data-filter="trods" style="padding: 0.35rem 0.8rem; font-size: 0.85rem; background: #334155;">🧱 Muren & Trods (selvom, alligevel)</button>
                <button class="action-btn-primary" data-filter="tid" style="padding: 0.35rem 0.8rem; font-size: 0.85rem; background: #334155;">📍 Tid & Vaner (da, når)</button>
            </div>
        `;
        stageWrap.appendChild(header);

        // Stage Body with Image & Pins
        const body = document.createElement('div');
        body.className = 'tf-stage-body';
        body.innerHTML = `
            <img src="${baseUrl}assets/tekstens_trafik_vrimmel.jpg" alt="Tekstens Trafik Vrimlebillede" class="tf-stage-img" />
        `;

        let selectedSignal = TRAFIK_SIGNALS_DATA[0];

        TRAFIK_SIGNALS_DATA.forEach(sig => {
            const pin = document.createElement('div');
            pin.className = `tf-pin tf-pin-${sig.id} ${sig.id === selectedSignal.id ? 'active' : ''}`;
            pin.style.left = `${sig.x}%`;
            pin.style.top = `${sig.y}%`;
            pin.style.background = sig.color;
            pin.setAttribute('data-category', sig.category);
            pin.innerHTML = `
                <span>${sig.icon}</span>
                <div class="tf-pin-label">${sig.word.toUpperCase()}</div>
            `;
            pin.onclick = (e) => {
                e.stopPropagation();
                body.querySelectorAll('.tf-pin').forEach(p => p.classList.remove('active'));
                pin.classList.add('active');
                selectedSignal = sig;
                renderInspector(inspectorDiv, sig);
                speakDanish(`${sig.word}. ${sig.example}`);
            };
            body.appendChild(pin);
        });

        stageWrap.appendChild(body);
        parent.appendChild(stageWrap);

        // Filter Logic
        const filterBtns = header.querySelectorAll('#tf-filter-btns button');
        filterBtns.forEach(btn => {
            btn.onclick = () => {
                filterBtns.forEach(b => b.style.background = '#334155');
                btn.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                const f = btn.getAttribute('data-filter');
                body.querySelectorAll('.tf-pin').forEach(p => {
                    const cat = p.getAttribute('data-category');
                    if (f === 'all') {
                        p.style.display = 'flex';
                    } else if (f === 'fremdrift' && (cat === 'sideordning' || cat === 'kontrast')) {
                        p.style.display = 'flex';
                    } else if (f === 'aarsag' && (cat === 'aarsag' || cat === 'virkning')) {
                        p.style.display = 'flex';
                    } else if (f === 'trods' && (cat === 'hindring' || cat === 'trods')) {
                        p.style.display = 'flex';
                    } else if (f === 'tid' && (cat === 'tid_fortid' || cat === 'vane_fremtid')) {
                        p.style.display = 'flex';
                    } else {
                        p.style.display = 'none';
                    }
                });
            };
        });

        // Inspector Container
        const inspectorDiv = document.createElement('div');
        inspectorDiv.id = 'tf-signal-inspector';
        parent.appendChild(inspectorDiv);
        renderInspector(inspectorDiv, selectedSignal);
    }

    function renderInspector(container, sig) {
        container.innerHTML = `
            <div class="tf-inspector">
                <div>
                    <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 2rem;">${sig.icon}</span>
                        <div>
                            <h2 style="margin: 0; font-size: 1.8rem; color: ${sig.color};">${sig.word.toUpperCase()}</h2>
                            <span style="font-size: 0.9rem; color: #94a3b8; font-weight: 700;">Trafik-rolle: ${sig.role}</span>
                        </div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem 1.2rem; border-radius: 12px; margin: 1rem 0; border-left: 4px solid ${sig.color};">
                        <div style="font-size: 0.85rem; font-weight: 800; color: ${sig.color}; text-transform: uppercase;">Metafor & Færdselsregel:</div>
                        <div style="font-size: 1.05rem; color: #f8fafc; margin-top: 0.3rem; font-weight: 700;">"${sig.metaphor}"</div>
                        <div style="font-size: 0.95rem; color: #cbd5e1; margin-top: 0.4rem; line-height: 1.5;">${sig.desc}</div>
                    </div>
                    <div style="margin-top: 1rem;">
                        <button type="button" id="btn-speak-signal" class="action-btn-primary" style="background: ${sig.color};">
                            <span>🔊</span> Lyt til færdselsreglen & eksemplet
                        </button>
                    </div>
                </div>

                <div style="background: rgba(15, 23, 42, 0.6); padding: 1.3rem; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="font-size: 0.82rem; font-weight: 800; color: #fde047; text-transform: uppercase; margin-bottom: 0.4rem;">
                        ⚡ Autentisk Eksempel i Teksten:
                    </div>
                    <div style="font-size: 1.2rem; line-height: 1.6; color: #ffffff; font-weight: 600; margin-bottom: 1rem;">
                        ${sig.example}
                    </div>

                    <div style="font-size: 0.82rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; margin-bottom: 0.4rem;">
                        🧲 Færdselslovens Ordstilling:
                    </div>
                    <div style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 1rem;">
                        ${sig.syntaxRule}
                    </div>

                    <div style="border-top: 1px dashed rgba(255, 255, 255, 0.15); padding-top: 0.8rem; display: flex; gap: 0.6rem; flex-wrap: wrap;">
                        <span style="font-size: 0.8rem; background: rgba(255, 255, 255, 0.1); padding: 0.2rem 0.6rem; border-radius: 6px;">🇬🇧 EN: ${sig.translations.en.word}</span>
                        <span style="font-size: 0.8rem; background: rgba(255, 255, 255, 0.1); padding: 0.2rem 0.6rem; border-radius: 6px;">🇩🇪 DE: ${sig.translations.de.word}</span>
                        <span style="font-size: 0.8rem; background: rgba(255, 255, 255, 0.1); padding: 0.2rem 0.6rem; border-radius: 6px;">🇪🇸 ES: ${sig.translations.es.word}</span>
                        <span style="font-size: 0.8rem; background: rgba(255, 255, 255, 0.1); padding: 0.2rem 0.6rem; border-radius: 6px;">🇸🇦 AR: ${sig.translations.ar.word}</span>
                    </div>
                </div>
            </div>
        `;

        container.querySelector('#btn-speak-signal').onclick = () => {
            speakDanish(`${sig.word}. ${sig.metaphor}. ${sig.example}`);
        };
    }

    // ==========================================
    // BANE 2: HISTORIE-VÆRKSTEDET (4 FORTÆLLINGER)
    // ==========================================
    const EXTENDED_STORIES = [
        {
            id: 'historie1',
            title: '1. Mathias i snevejret 🚲 (cykelbuddet i snestorm)',
            desc: 'Om snekaos i Københavns gader, punkteringer og leveringsfrister.',
            text: "Mathias arbejder som cykelbud i København. [blank_0] det sner, er det altid ekstra hårdt at cykle. I dag vælter sneen ned fra himlen. [blank_1] kører han meget forsigtigt. Han fryser om fingrene, [blank_2] han glemte sine varme handsker derhjemme i morges. [blank_3] det er bidende koldt, smiler han til kunderne. Han er træt, men han fortsætter [blank_4] med at levere pakkerne. [blank_5] klokken slog 16 i går, var cyklen flad for anden gang.",
            blanks: {
                "0": {
                    options: ["Når", "Da", "Fordi"],
                    answer: "Når",
                    trafficIcon: "🔁 Rundkørslen (vane)",
                    feedback: {
                        "Da": "At det sner i Danmark, sker mange gange hver vinter. Det er en gentagen vane, så vi bruger 'Når'!",
                        "Fordi": "Vi angiver tidspunktet/betingelsen for hvornår det er hårdt, ikke en årsag her."
                    }
                },
                "1": {
                    options: ["Derfor", "Fordi", "Men"],
                    answer: "Derfor",
                    trafficIcon: "🏹 Retningspilen (virkning)",
                    feedback: {
                        "Fordi": "Sneen er allerede nævnt som årsag. Den forsigtige kørsel er konsekvensen, så 'Derfor' skyder pilen fremad!",
                        "Men": "Der er ingen modsætning. Det er helt logisk at køre forsigtigt i snevejr."
                    }
                },
                "2": {
                    options: ["fordi", "derfor", "selvom"],
                    answer: "fordi",
                    trafficIcon: "⛽ Brændstoffet (årsag bagud)",
                    feedback: {
                        "derfor": "'Derfor' peger fremad. Her kigger vi tilbage på grunden til de frosne fingre: de glemte handsker.",
                        "selvom": "Der er ingen modstand her; man fryser naturligvis fingrene, hvis man mangler handsker."
                    }
                },
                "3": {
                    options: ["Selvom", "Alligevel", "Da"],
                    answer: "Selvom",
                    trafficIcon: "🧱 Vejspærringen / Muren",
                    feedback: {
                        "Alligevel": "'Alligevel' bryder igennem muren, men her bygger vi forhindringen (kulden) op forrest i ledsætningen med 'Selvom'.",
                        "Da": "Vi beskriver ikke bare et fortidigt øjeblik, men en modsætning til hans smil."
                    }
                },
                "4": {
                    options: ["alligevel", "selvom", "fordi"],
                    answer: "alligevel",
                    trafficIcon: "🚙 Terrænbilen (på trods)",
                    feedback: {
                        "selvom": "'Selvom' kræver en ny sætning med forhindringen. 'Alligevel' bryder muren og gennemfører handlingen på trods.",
                        "fordi": "Han fortsætter ikke FORDI han er træt! Han gør det på trods af trætheden."
                    }
                },
                "5": {
                    options: ["Da", "Når", "Derfor"],
                    answer: "Da",
                    trafficIcon: "📍 GPS-Tegnestiften (fortid)",
                    feedback: {
                        "Når": "'Klokken 16 i går' skete kun én enkelt gang i fortiden. Sæt GPS-tegnestiften med 'Da'!",
                        "Derfor": "Klokkeslættet er et specifikt tidspunkt, ikke en konsekvens."
                    }
                }
            },
            flowInsight: "Flow-analyse: 'Når' etablerer vanen ➔ 'Derfor' styrer den forsigtige kørsel ➔ 'Fordi' tanker forklaringen på kulden op ➔ 'Selvom' bygger muren af frost ➔ 'Alligevel' kører terrænbilen igennem med et smil ➔ 'Da' sætter GPS-nålen ved gårsdagens punktering!"
        },
        {
            id: 'historie2',
            title: '2. Anna i drivhuset 🌿 (gartneren mod frosten)',
            desc: 'Om nattefrost, sarte tomatplanter og det lune drivhus.',
            text: "Anna arbejder som gartner i en stor park. Hun klipper kun græsset, [blank_0] det er tørvejr. I går regnede det hele dagen. [blank_1] hun mødte på arbejde, var alting vådt. Hun kunne ikke klippe græsset, [blank_2] jorden var for blød. [blank_3] arbejdede hun inde i det store drivhus i stedet. [blank_4] det regnede og var koldt udenfor, var der meget varmt i drivhuset. Hun svedte, men hun fortsatte [blank_5] med at arbejde.",
            blanks: {
                "0": {
                    options: ["når", "da", "derfor"],
                    answer: "når",
                    trafficIcon: "🔁 Rundkørslen (vane)",
                    feedback: {
                        "da": "At klippe græsset i tørvejr er en fast regel og vane. 'Da' bruges kun om fortid.",
                        "derfor": "'Derfor' bruges til en logisk konsekvens i en ny helsætning."
                    }
                },
                "1": {
                    options: ["Da", "Når", "Fordi"],
                    answer: "Da",
                    trafficIcon: "📍 GPS-Tegnestiften (i går)",
                    feedback: {
                        "Når": "Det handler om en specifik dag (i går morges). Brug 'Da' for enkelthændelser i fortiden.",
                        "Fordi": "At hun mødte på arbejde, var ikke årsagen til regnen!"
                    }
                },
                "2": {
                    options: ["fordi", "derfor", "alligevel"],
                    answer: "fordi",
                    trafficIcon: "⛽ Motoren / Årsagen",
                    feedback: {
                        "derfor": "Den bløde jord er årsagen til problemet, så vi peger bagud med 'fordi'.",
                        "alligevel": "Der er tale om en direkte årsag, ikke handling på trods."
                    }
                },
                "3": {
                    options: ["Derfor", "Fordi", "Selvom"],
                    answer: "Derfor",
                    trafficIcon: "🏹 Retningspilen (konsekvens)",
                    feedback: {
                        "Fordi": "Arbejdet i drivhuset er den nye retning/løsning som følge af regnen. Skyd afsted med 'Derfor'!",
                        "Selvom": "At hun ikke klippede græs, er ikke en forhindring for drivhuset."
                    }
                },
                "4": {
                    options: ["Selvom", "Alligevel", "Da"],
                    answer: "Selvom",
                    trafficIcon: "🧱 Muren (kontrast ude/inde)",
                    feedback: {
                        "Alligevel": "Muren er kulden udenfor. Vi bygger kontrasten op med 'Selvom'.",
                        "Da": "Det er en modsætning mellem ude og inde, ikke blot en tidsangivelse."
                    }
                },
                "5": {
                    options: ["alligevel", "selvom", "derfor"],
                    answer: "alligevel",
                    trafficIcon: "🚙 Gennembruddet",
                    feedback: {
                        "selvom": "Forhindringen (sveden) er allerede nævnt, nu bryder hun igennem med 'alligevel'.",
                        "derfor": "Man fortsætter ikke arbejdet FORDI man sveder, men på trods af det."
                    }
                }
            },
            flowInsight: "Flow-analyse: 'Når' styrer arbejdsrutinen ➔ 'Da' rammer gårsdagens regnvejr ➔ 'Fordi' begrunder den bløde jord ➔ 'Derfor' leder os ind i drivhuset ➔ 'Selvom' og 'Alligevel' løser modsætningen mellem frost og sved!"
        },
        {
            id: 'historie3',
            title: '3. Lars på caféen ☕ (den travle fredag aften)',
            desc: 'Om fyldte udendørsborde, væltede kopper og et smilende personale.',
            text: "Lars er tjener på en populær café i byen. [blank_0] solen skinner, vil alle gæsterne sidde udenfor. I dag er det sommer og meget varmt. [blank_1] har Lars ekstra travlt. Han løber hurtigt mellem bordene, [blank_2] mange gæster venter på deres mad. [blank_3] han har ondt i fødderne, smiler han høfligt til alle. Han tager en ekstra aftenvagt [blank_4]. [blank_5] caféen lukkede klokken 23 i går, drak personalet en kold sodavand sammen.",
            blanks: {
                "0": {
                    options: ["Når", "Da", "Derfor"],
                    answer: "Når",
                    trafficIcon: "🔁 Rundkørslen (vane)",
                    feedback: {
                        "Da": "Det er en gentagen vane for gæsterne hver gang solen titter frem. Brug 'Når'.",
                        "Derfor": "Her beskriver vi betingelsen i tiden, ikke en konsekvens."
                    }
                },
                "1": {
                    options: ["Derfor", "Fordi", "Men"],
                    answer: "Derfor",
                    trafficIcon: "🏹 Retningspilen",
                    feedback: {
                        "Fordi": "Solskinnet og varmen er allerede nævnt; travlheden er konsekvensen heraf: 'Derfor'!",
                        "Men": "Der er ingen overraskende modsætning i, at en café får travlt i godt vejr."
                    }
                },
                "2": {
                    options: ["fordi", "derfor", "alligevel"],
                    answer: "fordi",
                    trafficIcon: "⛽ Tankstationen (årsag)",
                    feedback: {
                        "derfor": "Gæsternes ventetid er selve årsagen til, at han løber stærkt.",
                        "alligevel": "Han løber ikke stærkt på trods af gæsterne, men på grund af dem."
                    }
                },
                "3": {
                    options: ["Selvom", "Alligevel", "Da"],
                    answer: "Selvom",
                    trafficIcon: "🧱 Vejspærringen",
                    feedback: {
                        "Alligevel": "Vi starter med at bygge smerten i fødderne (muren) op i ledsætningen med 'Selvom'.",
                        "Da": "Det handler om overvindelse af smerte, ikke om fortid."
                    }
                },
                "4": {
                    options: ["alligevel", "selvom", "fordi"],
                    answer: "alligevel",
                    trafficIcon: "🚙 Gennembruddet",
                    feedback: {
                        "selvom": "Handlingen udføres på trods af trætheden: han tager vagten 'alligevel'.",
                        "fordi": "Man tager ikke ekstra vagter fordi man har ondt i benene, men på trods af det."
                    }
                },
                "5": {
                    options: ["Da", "Når", "Fordi"],
                    answer: "Da",
                    trafficIcon: "📍 GPS-Tegnestiften",
                    feedback: {
                        "Når": "Lukketid klokken 23 i går var en bestemt fortidig begivenhed. Sæt tegnestiften: 'Da'!",
                        "Fordi": "Lukningen var ikke årsagen, men tidspunktet hvor de drak sodavand."
                    }
                }
            },
            flowInsight: "Flow-analyse: Fra vanen ('Når') over konsekvensen ('Derfor') og grunden ('Fordi') til udholdenheden over muren ('Selvom' + 'Alligevel') og hyggen ved fyraften ('Da')."
        },
        {
            id: 'historie4',
            title: '4. Amina til jobsamtalen 💼 (den store chance)',
            desc: 'Om nervøsitet, grundig forberedelse og et fast håndtryk fra chefen.',
            text: "Amina søger job som regnskabsassistent. [blank_0] hun skal til en vigtig samtale, forbereder hun sig altid grundigt. I går morges var hun spændt. [blank_1] hun trådte ind ad døren til firmaet, bankede hendes hjerte hurtigt. Hun var nervøs, [blank_2] hun gerne ville gøre et godt indtryk. [blank_3] øvede hun sin præsentation en ekstra gang på gangen. [blank_4] spørgsmålene var svære, svarede hun roligt og præcist. Da samtalen sluttede, tilbød chefen hende stillingen [blank_5]!",
            blanks: {
                "0": {
                    options: ["Når", "Da", "Derfor"],
                    answer: "Når",
                    trafficIcon: "🔁 Rundkørslen (vane)",
                    feedback: {
                        "Da": "'altid grundigt' viser at det er hendes faste vane. Brug 'Når'.",
                        "Derfor": "Her beskriver vi hvornår hun gør det, ikke en konsekvens."
                    }
                },
                "1": {
                    options: ["Da", "Når", "Fordi"],
                    answer: "Da",
                    trafficIcon: "📍 GPS-Tegnestiften (i går)",
                    feedback: {
                        "Når": "Det skete på et præcist tidspunkt i går morges. Brug 'Da'!",
                        "Fordi": "Det var tidspunktet hvor hjertet bankede, ikke årsagen til døren."
                    }
                },
                "2": {
                    options: ["fordi", "derfor", "alligevel"],
                    answer: "fordi",
                    trafficIcon: "⛽ Motoren / Årsagen",
                    feedback: {
                        "derfor": "Ønsket om et godt indtryk er årsagen bag hendes nervøsitet.",
                        "alligevel": "Der er tale om en logisk årsag, ikke handling på trods."
                    }
                },
                "3": {
                    options: ["Derfor", "Fordi", "Selvom"],
                    answer: "Derfor",
                    trafficIcon: "🏹 Retningspilen",
                    feedback: {
                        "Fordi": "At øve præsentationen er handlingen/resultatet af nervøsiteten. Retningspilen er 'Derfor'!",
                        "Selvom": "Nervøsiteten var grunden til handlingen, ikke en modstand."
                    }
                },
                "4": {
                    options: ["Selvom", "Alligevel", "Da"],
                    answer: "Selvom",
                    trafficIcon: "🧱 Muren / Forhindringen",
                    feedback: {
                        "Alligevel": "De svære spørgsmål er muren. Den introduceres i ledsætningen med 'Selvom'.",
                        "Da": "Det handler om en udfordring hun overvinder, ikke om tid."
                    }
                },
                "5": {
                    options: ["med det samme", "alligevel", "fordi"],
                    answer: "med det samme",
                    trafficIcon: "🎉 Succesen!",
                    feedback: {
                        "alligevel": "Chefen var begejstret for hendes svar, så det var ikke på trods.",
                        "fordi": "'Fordi' ville kræve en ny sætning med begrundelse."
                    }
                }
            },
            flowInsight: "Flow-analyse: Aminas rejse fra forberedelsesvanen ('Når') over det historiske øjeblik ('Da') til overvindelsen af muren ('Selvom') og den velfortjente ansættelse!"
        }
    ];

    let currentStoryIdx = 0;
    let storyChoices = {};

    function renderTabHistorier(parent) {
        const story = EXTENDED_STORIES[currentStoryIdx];
        if (!storyChoices[currentStoryIdx]) storyChoices[currentStoryIdx] = {};

        const card = document.createElement('div');
        card.className = 'tf-story-card';

        // Story Switcher Buttons
        const switcher = document.createElement('div');
        switcher.style.display = 'flex';
        switcher.style.gap = '0.5rem';
        switcher.style.marginBottom = '1.8rem';
        switcher.style.flexWrap = 'wrap';

        EXTENDED_STORIES.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = 'action-btn-primary';
            btn.style.background = idx === currentStoryIdx ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : '#334155';
            btn.style.padding = '0.5rem 1rem';
            btn.style.fontSize = '0.88rem';
            btn.innerHTML = `${s.title.split(' ')[0]} ${s.title.split(' ')[1]}`;
            btn.onclick = () => {
                currentStoryIdx = idx;
                renderTabHistorier(parent);
            };
            switcher.appendChild(btn);
        });
        card.appendChild(switcher);

        // Story Header
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'flex-start';
        header.style.flexWrap = 'wrap';
        header.style.gap = '1rem';
        header.style.marginBottom = '1.5rem';
        header.innerHTML = `
            <div>
                <h2 style="margin: 0 0 0.3rem; font-size: 1.6rem; color: #6ee7b7;">${story.title}</h2>
                <p style="margin: 0; color: #94a3b8; font-size: 0.95rem;">${story.desc}</p>
            </div>
            <button type="button" id="btn-speak-flow-story" class="action-btn-primary" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);">
                <span>🔊</span> Lyt til historien
            </button>
        `;
        card.appendChild(header);

        // Story Paragraph with interactive blanks
        const textBox = document.createElement('div');
        textBox.style.fontSize = '1.3rem';
        textBox.style.lineHeight = '2.2';
        textBox.style.color = '#f8fafc';
        textBox.style.background = 'rgba(15, 23, 42, 0.7)';
        textBox.style.padding = '2rem';
        textBox.style.borderRadius = '16px';
        textBox.style.border = '1px solid rgba(255, 255, 255, 0.12)';
        textBox.style.marginBottom = '1.5rem';

        const parts = story.text.split(/(\[blank_\d+\])/);
        let html = '';

        parts.forEach(part => {
            const match = part.match(/\[blank_(\d+)\]/);
            if (match) {
                const bIdx = match[1];
                const blankData = story.blanks[bIdx];
                const chosen = storyChoices[currentStoryIdx][bIdx] || '';
                const isCorrect = chosen === blankData.answer;

                let cls = 'unanswered';
                if (chosen) {
                    cls = isCorrect ? 'correct' : 'wrong';
                }

                html += `
                    <select class="tf-select ${cls}" data-blank="${bIdx}">
                        <option value="">${chosen || '...'}</option>
                        ${blankData.options.map(opt => `<option value="${opt}" ${chosen === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                `;
            } else {
                html += `<span>${part}</span>`;
            }
        });

        textBox.innerHTML = html;
        card.appendChild(textBox);

        // Live Traffic Feedback Area
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'tf-live-feedback';
        feedbackDiv.style.display = 'none';
        feedbackDiv.style.padding = '1.2rem';
        feedbackDiv.style.borderRadius = '12px';
        feedbackDiv.style.marginBottom = '1.5rem';
        feedbackDiv.style.fontSize = '1.05rem';
        feedbackDiv.style.lineHeight = '1.5';
        card.appendChild(feedbackDiv);

        // Flow Insight Box
        const insightBox = document.createElement('div');
        insightBox.style.background = 'rgba(255, 255, 255, 0.04)';
        insightBox.style.border = '1px solid rgba(255, 255, 255, 0.08)';
        insightBox.style.borderRadius = '14px';
        insightBox.style.padding = '1.2rem 1.5rem';
        insightBox.style.marginBottom = '1.5rem';
        insightBox.innerHTML = `
            <div style="font-weight: 800; font-size: 0.95rem; color: #fde047; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
                <span>💡</span> Hvorfor fungerer dette tekstflow?
            </div>
            <div style="font-size: 0.94rem; color: #cbd5e1; line-height: 1.55;">
                ${story.flowInsight}
            </div>
        `;
        card.appendChild(insightBox);

        // Bottom status & navigation
        const bottom = document.createElement('div');
        bottom.style.display = 'flex';
        bottom.style.justifyContent = 'space-between';
        bottom.style.alignItems = 'center';
        bottom.style.flexWrap = 'wrap';
        bottom.style.gap = '1rem';

        const statusText = document.createElement('div');
        statusText.style.fontWeight = '700';
        statusText.style.color = '#94a3b8';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'action-btn-primary';
        nextBtn.innerHTML = currentStoryIdx < EXTENDED_STORIES.length - 1 
            ? `Næste historie (${currentStoryIdx + 2}/${EXTENDED_STORIES.length}) ➔` 
            : `Tilbage til historie 1 🔄`;
        nextBtn.onclick = () => {
            currentStoryIdx = (currentStoryIdx + 1) % EXTENDED_STORIES.length;
            renderTabHistorier(parent);
        };

        bottom.appendChild(statusText);
        bottom.appendChild(nextBtn);
        card.appendChild(bottom);

        // Event Listeners for Selects
        const selects = textBox.querySelectorAll('.tf-select');
        function updateStoryProgress() {
            const total = Object.keys(story.blanks).length;
            let correct = 0;
            for (let i = 0; i < total; i++) {
                if (storyChoices[currentStoryIdx][i] === story.blanks[i].answer) correct++;
            }
            statusText.innerHTML = `Fremgang: <span style="color:#6ee7b7; font-weight:900;">${correct}</span> af ${total} bindeord korrekt`;
        }

        selects.forEach(sel => {
            sel.onchange = () => {
                const bIdx = sel.getAttribute('data-blank');
                const val = sel.value;
                const blankData = story.blanks[bIdx];

                storyChoices[currentStoryIdx][bIdx] = val;

                if (!val) {
                    sel.className = 'tf-select unanswered';
                    feedbackDiv.style.display = 'none';
                } else if (val === blankData.answer) {
                    sel.className = 'tf-select correct';
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedbackDiv.style.border = '1.5px solid #22c55e';
                    feedbackDiv.style.color = '#4ade80';
                    feedbackDiv.innerHTML = `🟢 <strong>Grønt lys!</strong> "${val}" passer perfekt som ${blankData.trafficIcon}. Trafikken flyder ubesværet videre!`;
                } else {
                    sel.className = 'tf-select wrong';
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedbackDiv.style.border = '1.5px solid #ef4444';
                    feedbackDiv.style.color = '#f87171';
                    const hint = (blankData.feedback && blankData.feedback[val]) || `Prøv igen. Det rigtige signal her er "${blankData.answer}".`;
                    feedbackDiv.innerHTML = `🔴 <strong>Trafikprop / Forkert signal:</strong> ${hint}`;
                }

                updateStoryProgress();
            };
        });

        // Speech listener
        header.querySelector('#btn-speak-flow-story').onclick = () => {
            let spoken = story.text;
            Object.keys(story.blanks).forEach(i => {
                const repl = storyChoices[currentStoryIdx][i] || story.blanks[i].answer;
                spoken = spoken.replace(`[blank_${i}]`, repl);
            });
            speakDanish(spoken);
        };

        updateStoryProgress();
        parent.appendChild(card);
    }

    // ==========================================
    // BANE 3: TRAFIKPROPPEN: FIND FEJLEN! (10 GÅDER)
    // ==========================================
    const TRAFIKPROP_PUZZLES = [
        {
            id: 1,
            badText: "Kasper tog den store paraply med, DERFOR det regnede voldsomt udenfor.",
            wrongWord: "DERFOR",
            correctWord: "fordi",
            options: ["fordi", "derfor", "men", "selvom"],
            reason: "Regnen er årsagen (bagud), mens paraplyen var handlingen. 'Derfor' kan ikke pege bagud mod grunden – det kan kun 'fordi'!"
        },
        {
            id: 2,
            badText: "DA jeg bliver færdig med min uddannelse næste sommer, vil jeg rejse til Japan.",
            wrongWord: "DA",
            correctWord: "når",
            options: ["da", "når", "fordi", "hvis"],
            reason: "Næste sommer er i FREMTIDEN! Man kan aldrig bruge 'da' om fremtidige begivenheder – kun 'når' (pilen)!"
        },
        {
            id: 3,
            badText: "Jeg elsker at drikke kaffe, OG jeg må ikke drikke det efter klokken 18 for min søvn.",
            wrongWord: "OG",
            correctWord: "men",
            options: ["og", "men", "derfor", "da"],
            reason: "Der er en klar modsætning mellem at elske kaffe og ikke måtte drikke det. Det kræver det skarpe sving: 'men'!"
        },
        {
            id: 4,
            badText: "Hun cyklede på arbejde, FORDI hendes forhjul var punkteret og helt fladt.",
            wrongWord: "FORDI",
            correctWord: "selvom",
            options: ["fordi", "selvom", "derfor", "når"],
            reason: "Man cykler ikke FORDI cyklen er punkteret! Den flade cykel er en forhindring (muren), så vi skal bruge 'selvom'!"
        },
        {
            id: 5,
            badText: "Termometeret viste minus fem grader, SELVOM tog han en tyk vinterjakke på.",
            wrongWord: "SELVOM",
            correctWord: "derfor",
            options: ["selvom", "derfor", "fordi", "alligevel"],
            reason: "At tage vinterjakke på i frostvejr er en helt logisk konsekvens (retningspilen), ikke en handling på trods. Brug 'derfor'!"
        },
        {
            id: 6,
            badText: "NÅR jeg var lille dreng i Odense i 1995, klatrede jeg tit i æbletræerne.",
            wrongWord: "NÅR",
            correctWord: "da",
            options: ["når", "da", "derfor", "fordi"],
            reason: "Barndommen i 1995 er et afsluttet kapitel i fortiden. GPS-tegnestiften kræver 'da'!"
        },
        {
            id: 7,
            badText: "Toget brød sammen på skinnerne, FORDI kom vi to timer for sent til brylluppet.",
            wrongWord: "FORDI",
            correctWord: "derfor",
            options: ["fordi", "derfor", "men", "da"],
            reason: "Togets sammenbrud var årsagen; forsinkelsen til brylluppet var konsekvensen, der skal skydes afsted med 'derfor' (med inversion)!"
        },
        {
            id: 8,
            badText: "Kagen smagte himmelsk godt, ALLIGEVEL bunden var blevet en smule brændt.",
            wrongWord: "ALLIGEVEL",
            correctWord: "selvom",
            options: ["alligevel", "selvom", "derfor", "og"],
            reason: "'Alligevel' står i hovedsætningen. Her bygger vi forhindringen op i en ledsætning, så der skal stå 'selvom'!"
        },
        {
            id: 9,
            badText: "DA solen skinner på terrassen, drikker mine forældre altid kold hvidvin.",
            wrongWord: "DA",
            correctWord: "når",
            options: ["da", "når", "fordi", "men"],
            reason: "Ordet 'altid' afslører, at det er en tilbagevendende vane i nutid. Rundkørslen kræver 'når'!"
        },
        {
            id: 10,
            badText: "Jonas taler fejlfrit og flydende dansk, MEN han har boet i Danmark i 15 år.",
            wrongWord: "MEN",
            correctWord: "fordi",
            options: ["men", "fordi", "selvom", "derfor"],
            reason: "At bo i landet i 15 år forklarer naturligt, hvorfor han taler godt. Det er ikke en modstand, men årsagen: 'fordi'!"
        }
    ];

    let currentPuzzleIdx = 0;
    let puzzleScore = 0;

    function renderTabTrafikprop(parent) {
        const pz = TRAFIKPROP_PUZZLES[currentPuzzleIdx];

        const card = document.createElement('div');
        card.className = 'tf-story-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <span style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 0.3rem 0.8rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem;">
                        🚧 Trafikulykke i teksten #${currentPuzzleIdx + 1} af 10
                    </span>
                    <h2 style="margin: 0.5rem 0 0; color: #f8fafc; font-size: 1.5rem;">Find fejlen & reparér trafikskiltet</h2>
                </div>
                <div style="font-weight: 800; color: #6ee7b7; font-size: 1.1rem;">
                    Point: ${puzzleScore} / ${currentPuzzleIdx}
                </div>
            </div>

            <div style="background: rgba(239, 68, 68, 0.12); border: 2px dashed #ef4444; padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem;">
                <div style="font-size: 0.85rem; font-weight: 800; color: #f87171; text-transform: uppercase; margin-bottom: 0.3rem;">
                    ⚠️ Tekst med trafikprop (forkert signal):
                </div>
                <div style="font-size: 1.35rem; font-weight: 700; color: #ffffff; line-height: 1.6;">
                    "${pz.badText.replace(pz.wrongWord, `<span style="background: rgba(239, 68, 68, 0.4); border-bottom: 3px solid #ef4444; padding: 0 4px; border-radius: 4px;">${pz.wrongWord}</span>`)}"
                </div>
            </div>

            <div style="font-size: 1.1rem; font-weight: 700; color: #cbd5e1; margin-bottom: 1rem;">
                Hvilket trafiksignal skal indsættes i stedet for <span style="color:#f87171; text-decoration:line-through;">${pz.wrongWord}</span> for at genoprette flowet?
            </div>

            <div id="pz-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                ${pz.options.map(opt => `
                    <button class="action-btn-primary pz-opt-btn" data-val="${opt}" style="background: #334155; border: 2px solid rgba(255,255,255,0.1); justify-content: center; font-size: 1.15rem; padding: 1rem;">
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div id="pz-feedback" style="display: none; padding: 1.2rem; border-radius: 14px; font-size: 1.05rem; line-height: 1.5; margin-bottom: 1.5rem;"></div>

            <div style="display: flex; justify-content: flex-end;">
                <button id="btn-next-puzzle" class="action-btn-primary" style="display: none;">
                    ${currentPuzzleIdx < TRAFIKPROP_PUZZLES.length - 1 ? 'Næste trafikprop ➔' : 'Se dit resultat 🏆'}
                </button>
            </div>
        `;

        const feedback = card.querySelector('#pz-feedback');
        const nextBtn = card.querySelector('#btn-next-puzzle');
        const optBtns = card.querySelectorAll('.pz-opt-btn');

        optBtns.forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.getAttribute('data-val');
                optBtns.forEach(b => b.disabled = true);

                if (chosen.toLowerCase() === pz.correctWord.toLowerCase()) {
                    puzzleScore++;
                    btn.style.background = 'rgba(34, 197, 94, 0.3)';
                    btn.style.borderColor = '#22c55e';
                    btn.style.color = '#4ade80';

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedback.style.border = '1.5px solid #22c55e';
                    feedback.style.color = '#4ade80';
                    feedback.innerHTML = `🎉 <strong>Perfekt reparation!</strong> Det rigtige ord er "${pz.correctWord}".<br><span style="color:#e2e8f0; font-size:0.95rem; display:block; margin-top:0.4rem;">${pz.reason}</span>`;
                    speakDanish(`Rigtigt! ${pz.badText.replace(pz.wrongWord, pz.correctWord)}`);
                } else {
                    btn.style.background = 'rgba(239, 68, 68, 0.3)';
                    btn.style.borderColor = '#ef4444';
                    btn.style.color = '#fca5a5';

                    // Highlight correct
                    optBtns.forEach(b => {
                        if (b.getAttribute('data-val').toLowerCase() === pz.correctWord.toLowerCase()) {
                            b.style.borderColor = '#22c55e';
                            b.style.color = '#4ade80';
                        }
                    });

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedback.style.border = '1.5px solid #ef4444';
                    feedback.style.color = '#f87171';
                    feedback.innerHTML = `⚠️ <strong>Stadig trafikprop:</strong> "${chosen}" passer ikke her. Det rigtige skilt er "${pz.correctWord}".<br><span style="color:#e2e8f0; font-size:0.95rem; display:block; margin-top:0.4rem;">${pz.reason}</span>`;
                }

                nextBtn.style.display = 'inline-flex';
            };
        });

        nextBtn.onclick = () => {
            if (currentPuzzleIdx < TRAFIKPROP_PUZZLES.length - 1) {
                currentPuzzleIdx++;
                renderTabTrafikprop(parent);
            } else {
                card.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <span style="font-size: 3.5rem;">🏆</span>
                        <h2 style="font-size: 2rem; color: #6ee7b7; margin: 0.5rem 0;">Trafikmester-Eksamen Bestået!</h2>
                        <p style="font-size: 1.2rem; color: #cbd5e1;">Du fik <strong style="color:#38bdf8;">${puzzleScore}</strong> ud af 10 trafikpropper løst korrekt!</p>
                        <button class="action-btn-primary" id="btn-restart-prop" style="margin-top: 1.5rem;">Prøv igen 🔄</button>
                    </div>
                `;
                card.querySelector('#btn-restart-prop').onclick = () => {
                    currentPuzzleIdx = 0;
                    puzzleScore = 0;
                    renderTabTrafikprop(parent);
                };
            }
        };

        parent.appendChild(card);
    }

    // ==========================================
    // BANE 4: FRA STACCATO TIL FLOW
    // ==========================================
    const STACCATO_DATA = [
        {
            title: "Morgenkaos på vej til job",
            staccato: [
                "Vækkeuret ringede ikke klokken 7.",
                "Mette vågnede først klokken 8.",
                "Hun skyndte sig ud til bussen i regnvejr.",
                "Bussen kørte lige foran næsen på hende.",
                "Hun tog en taxa for at nå frem til tiden."
            ],
            flowStory: "I morges ringede vækkeuret ikke klokken 7. [blank_0] vågnede Mette først klokken 8. Hun skyndte sig ud til bussen, [blank_1] det regnede voldsomt. [blank_2] hun nåede frem til stoppestedet, kørte bussen desværre lige foran næsen på hende. Hun tog [blank_3] en taxa for at nå frem til tiden.",
            blanks: {
                "0": { options: ["Derfor", "Fordi", "Men"], answer: "Derfor" },
                "1": { options: ["selvom", "fordi", "hvis"], answer: "selvom" },
                "2": { options: ["Da", "Når", "Derfor"], answer: "Da" },
                "3": { options: ["alligevel", "derfor", "men"], answer: "alligevel" }
            }
        },
        {
            title: "Søndagsturen i skoven",
            staccato: [
                "Det var bidende koldt udenfor.",
                "Familien tog varme flyverdragter og støvler på.",
                "De kørte ud til den store skov.",
                "Børnene legede gemmeleg mellem træerne.",
                "Solen gik ned klokken 16 og de kørte hjem."
            ],
            flowStory: "Det var bidende koldt udenfor i søndags. [blank_0] tog familien varme flyverdragter og støvler på. [blank_1] de kom ud til den store skov, legede børnene gemmeleg mellem træerne, [blank_2] kulden bed i kinderne. [blank_3] solen gik ned klokken 16, kørte de trætte og glade hjem til varm kakao.",
            blanks: {
                "0": { options: ["Derfor", "Fordi", "Men"], answer: "Derfor" },
                "1": { options: ["Da", "Når", "Selvom"], answer: "Da" },
                "2": { options: ["selvom", "fordi", "hvis"], answer: "selvom" },
                "3": { options: ["Da", "Når", "Derfor"], answer: "Da" }
            }
        }
    ];

    let currentStaccatoIdx = 0;
    let staccatoChoices = {};

    function renderTabStaccato(parent) {
        const item = STACCATO_DATA[currentStaccatoIdx];
        if (!staccatoChoices[currentStaccatoIdx]) staccatoChoices[currentStaccatoIdx] = {};

        const card = document.createElement('div');
        card.className = 'tf-story-card';

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <h2 style="margin: 0; color: #6ee7b7; font-size: 1.6rem;">Fra Staccato-dansk til Flydende Sprog</h2>
                    <p style="margin: 0.3rem 0 0; color: #94a3b8; font-size: 0.95rem;">Sammenlign begyndersprog med voksensprog med bindeord</p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    ${STACCATO_DATA.map((s, idx) => `
                        <button class="action-btn-primary" id="btn-stac-${idx}" style="background: ${idx === currentStaccatoIdx ? '#0284c7' : '#334155'}; padding: 0.4rem 0.8rem; font-size: 0.85rem;">
                            Scenarie ${idx + 1}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                <!-- Staccato Left Column -->
                <div style="background: rgba(239, 68, 68, 0.08); border: 2px solid rgba(239, 68, 68, 0.25); border-radius: 16px; padding: 1.5rem;">
                    <div style="font-weight: 800; font-size: 0.85rem; color: #f87171; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
                        <span>❌</span> 1. Uden Bindeord (Hakkende Staccato)
                    </div>
                    <ul style="margin: 0; padding-left: 1.2rem; color: #cbd5e1; font-size: 1.05rem; line-height: 1.8;">
                        ${item.staccato.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                    <div style="margin-top: 1rem;">
                        <button type="button" id="btn-listen-staccato" class="action-btn-primary" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 0.4rem 0.8rem; font-size: 0.85rem;">
                            <span>🔊</span> Lyt til den hakkende rytme
                        </button>
                    </div>
                </div>

                <!-- Flow Right Column -->
                <div style="background: rgba(16, 185, 129, 0.08); border: 2px solid rgba(16, 185, 129, 0.3); border-radius: 16px; padding: 1.5rem;">
                    <div style="font-weight: 800; font-size: 0.85rem; color: #6ee7b7; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
                        <span>✨</span> 2. Med Bindeord (Flydende Tekstflow)
                    </div>
                    <div id="stac-flow-text" style="font-size: 1.15rem; line-height: 2; color: #ffffff;">
                        <!-- Will be populated below -->
                    </div>
                    <div style="margin-top: 1.2rem;">
                        <button type="button" id="btn-listen-flow" class="action-btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
                            <span>🔊</span> Lyt til den flydende tekst
                        </button>
                    </div>
                </div>
            </div>

            <div id="stac-status-banner" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); padding: 1rem 1.5rem; border-radius: 12px; font-weight: 700; color: #cbd5e1;"></div>
        `;

        // Populate flow text with selects
        const flowTextDiv = card.querySelector('#stac-flow-text');
        const parts = item.flowStory.split(/(\[blank_\d+\])/);
        let flowHtml = '';

        parts.forEach(part => {
            const match = part.match(/\[blank_(\d+)\]/);
            if (match) {
                const bIdx = match[1];
                const blankData = item.blanks[bIdx];
                const chosen = staccatoChoices[currentStaccatoIdx][bIdx] || '';
                const isCorrect = chosen === blankData.answer;

                let cls = 'unanswered';
                if (chosen) cls = isCorrect ? 'correct' : 'wrong';

                flowHtml += `
                    <select class="tf-select ${cls}" data-blank="${bIdx}">
                        <option value="">${chosen || '...'}</option>
                        ${blankData.options.map(opt => `<option value="${opt}" ${chosen === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                `;
            } else {
                flowHtml += `<span>${part}</span>`;
            }
        });

        flowTextDiv.innerHTML = flowHtml;

        // Switcher handlers
        STACCATO_DATA.forEach((s, idx) => {
            card.querySelector(`#btn-stac-${idx}`).onclick = () => {
                currentStaccatoIdx = idx;
                renderTabStaccato(parent);
            };
        });

        // Select handlers
        const selects = flowTextDiv.querySelectorAll('.tf-select');
        const statusBanner = card.querySelector('#stac-status-banner');

        function updateProgress() {
            const total = Object.keys(item.blanks).length;
            let correct = 0;
            for (let i = 0; i < total; i++) {
                if (staccatoChoices[currentStaccatoIdx][i] === item.blanks[i].answer) correct++;
            }
            if (correct === total) {
                statusBanner.innerHTML = `🎉 <strong style="color:#6ee7b7;">Fremragende!</strong> Du har forvandlet teksten til flydende, naturligt dansk! Tryk på "Lyt til den flydende tekst" for at høre forskellen.`;
            } else {
                statusBanner.innerHTML = `Fremgang: <span style="color:#38bdf8;">${correct}</span> af ${total} bindeord korrekt forbundet.`;
            }
        }

        selects.forEach(sel => {
            sel.onchange = () => {
                const bIdx = sel.getAttribute('data-blank');
                const val = sel.value;
                const blankData = item.blanks[bIdx];
                staccatoChoices[currentStaccatoIdx][bIdx] = val;

                if (!val) {
                    sel.className = 'tf-select unanswered';
                } else if (val === blankData.answer) {
                    sel.className = 'tf-select correct';
                } else {
                    sel.className = 'tf-select wrong';
                }
                updateProgress();
            };
        });

        // Audio buttons
        card.querySelector('#btn-listen-staccato').onclick = () => {
            speakDanish(item.staccato.join('. '));
        };
        card.querySelector('#btn-listen-flow').onclick = () => {
            let spoken = item.flowStory;
            Object.keys(item.blanks).forEach(i => {
                const repl = staccatoChoices[currentStaccatoIdx][i] || item.blanks[i].answer;
                spoken = spoken.replace(`[blank_${i}]`, repl);
            });
            speakDanish(spoken);
        };

        updateProgress();
        parent.appendChild(card);
    }

    // ==========================================
    // BANE 5: TRAFIK-DUELLEN (12 SCENARIER)
    // ==========================================
    const DUEL_DATA = [
        { q: "Jeg spiser frokost, ____ jeg er sulten.", pair: ["fordi", "derfor"], ans: "fordi", expl: "Sulten er årsagen, som vi peger bagud mod." },
        { q: "Jeg var meget sulten. ____ spiste jeg en stor pizza.", pair: ["Fordi", "Derfor"], ans: "Derfor", expl: "Pizzaen er den direkte konsekvens af sulten." },
        { q: "____ jeg boede i Spanien i 2018, talte jeg spansk hver dag.", pair: ["Da", "Når"], ans: "Da", expl: "Enkeltstående, afsluttet periode i fortiden = Tegnestiften 'Da'." },
        { q: "____ det bliver sommer næste år, skal vi på ferie.", pair: ["Da", "Når"], ans: "Når", expl: "Alt i fremtiden kræver 'Når'!" },
        { q: "____ det regnede voldsomt, løb hun en tur i skoven.", pair: ["Selvom", "Alligevel"], ans: "Selvom", expl: "Muren/forhindringen præsenteres i ledsætningen med 'Selvom'." },
        { q: "Det regnede kraftigt, men hun løb ____ en tur.", pair: ["selvom", "alligevel"], ans: "alligevel", expl: "Handlingen gennemføres på trods i hovedsætningen." },
        { q: "Han ville gerne med til koncerten, ____ han havde ikke råd.", pair: ["og", "men"], ans: "men", expl: "Kontrast og modsætning kræver 'men'." },
        { q: "Hun købte en ny kjole, ____ hun købte også et par sko.", pair: ["og", "men"], ans: "og", expl: "Sideordning i samme retning ad motorvejen = 'og'." },
        { q: "____ vækkeuret ringer om morgenen, vågner jeg med det samme.", pair: ["Da", "Når"], ans: "Når", expl: "Gentagen hverdagsrutine = 'Når'." },
        { q: "Han var syg i tre dage. ____ gik han glip af eksamen.", pair: ["Fordi", "Derfor"], ans: "Derfor", expl: "At misse eksamen var resultatet: 'Derfor'!" },
        { q: "Han fik et 12-tal, ____ han havde forberedt sig fantastisk.", pair: ["fordi", "derfor"], ans: "fordi", expl: "Forberedelsen var grunden og årsagen." },
        { q: "____ jeg var barn, troede jeg på julemanden.", pair: ["Da", "Når"], ans: "Da", expl: "Barndommen er afsluttet i fortiden = 'Da'." }
    ];

    let duelIdx = 0;
    let duelScore = 0;
    let duelStreak = 0;

    function renderTabDuel(parent) {
        const item = DUEL_DATA[duelIdx];

        const card = document.createElement('div');
        card.className = 'tf-story-card';

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <h2 style="margin: 0; color: #6ee7b7; font-size: 1.5rem;">⚡ Trafik-Duellen: Vælg det rette signal</h2>
                    <p style="margin: 0.2rem 0 0; color: #94a3b8; font-size: 0.95rem;">Spørgsmål ${duelIdx + 1} af ${DUEL_DATA.length}</p>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #fde68a; padding: 0.3rem 0.8rem; border-radius: 8px; font-weight: 800;">
                        🔥 Streak: ${duelStreak}
                    </div>
                    <div style="font-weight: 800; color: #38bdf8;">
                        Score: ${duelScore} / ${duelIdx}
                    </div>
                </div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 2rem; margin-bottom: 1.8rem; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: #f8fafc; line-height: 1.8;">
                    "${item.q.replace('____', `<span style="background: rgba(56, 189, 248, 0.2); border-bottom: 3px solid #38bdf8; padding: 0.2rem 1.5rem; border-radius: 6px; color:#38bdf8;">?</span>`)}"
                </div>
            </div>

            <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                ${item.pair.map(opt => `
                    <button class="action-btn-primary duel-btn" data-opt="${opt}" style="font-size: 1.3rem; padding: 1.2rem 2.8rem; border-radius: 16px; background: #334155; border: 2px solid rgba(255,255,255,0.15); min-width: 180px; justify-content: center;">
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div id="duel-feedback" style="display: none; padding: 1.2rem; border-radius: 12px; font-size: 1.05rem; line-height: 1.5; margin-bottom: 1.5rem; text-align: center;"></div>

            <div style="display: flex; justify-content: center;">
                <button id="btn-next-duel" class="action-btn-primary" style="display: none; padding: 0.8rem 2rem;">
                    ${duelIdx < DUEL_DATA.length - 1 ? 'Næste duel ➔' : 'Se duel-resultat 🏆'}
                </button>
            </div>
        `;

        const feedback = card.querySelector('#duel-feedback');
        const nextBtn = card.querySelector('#btn-next-duel');
        const btns = card.querySelectorAll('.duel-btn');

        btns.forEach(b => {
            b.onclick = () => {
                const val = b.getAttribute('data-opt');
                btns.forEach(btn => btn.disabled = true);

                if (val.toLowerCase() === item.ans.toLowerCase()) {
                    duelScore++;
                    duelStreak++;
                    b.style.background = 'rgba(34, 197, 94, 0.3)';
                    b.style.borderColor = '#22c55e';
                    b.style.color = '#4ade80';

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedback.style.border = '1.5px solid #22c55e';
                    feedback.style.color = '#4ade80';
                    feedback.innerHTML = `🎉 <strong>Lynhurtigt & Rigtigt!</strong> "${item.ans}" er korrekt.<br><span style="color:#cbd5e1; font-size:0.95rem;">${item.expl}</span>`;
                    speakDanish(`Rigtigt! ${item.q.replace('____', item.ans)}`);
                } else {
                    duelStreak = 0;
                    b.style.background = 'rgba(239, 68, 68, 0.3)';
                    b.style.borderColor = '#ef4444';
                    b.style.color = '#fca5a5';

                    btns.forEach(btn => {
                        if (btn.getAttribute('data-opt').toLowerCase() === item.ans.toLowerCase()) {
                            btn.style.borderColor = '#22c55e';
                            btn.style.color = '#4ade80';
                        }
                    });

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedback.style.border = '1.5px solid #ef4444';
                    feedback.style.color = '#f87171';
                    feedback.innerHTML = `⚠️ <strong>Hov!</strong> Det rigtige ord her er "${item.ans}".<br><span style="color:#cbd5e1; font-size:0.95rem;">${item.expl}</span>`;
                }

                nextBtn.style.display = 'inline-flex';
            };
        });

        nextBtn.onclick = () => {
            if (duelIdx < DUEL_DATA.length - 1) {
                duelIdx++;
                renderTabDuel(parent);
            } else {
                card.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <span style="font-size: 3.5rem;">⚡</span>
                        <h2 style="font-size: 2rem; color: #6ee7b7; margin: 0.5rem 0;">Trafik-Duellen Fuldendt!</h2>
                        <p style="font-size: 1.2rem; color: #cbd5e1;">Flot kørt! Du scorede <strong style="color:#38bdf8;">${duelScore}</strong> ud af ${DUEL_DATA.length} med en bedste streak på ${duelStreak}!</p>
                        <button class="action-btn-primary" id="btn-restart-duel" style="margin-top: 1.5rem;">Tag en ny tur 🔄</button>
                    </div>
                `;
                card.querySelector('#btn-restart-duel').onclick = () => {
                    duelIdx = 0;
                    duelScore = 0;
                    duelStreak = 0;
                    renderTabDuel(parent);
                };
            }
        };

        parent.appendChild(card);
    }

    // ==========================================
    // BANE 6: TRAFIKPOLITIETS ORDSTILLING
    // ==========================================
    function renderTabOrdstilling(parent) {
        const card = document.createElement('div');
        card.className = 'tf-story-card';

        card.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <h2 style="margin: 0; color: #6ee7b7; font-size: 1.6rem;">🧲 Trafikpolitiets Færdselsregler: Ordstillingen bag Bindeord</h2>
                <p style="margin: 0.4rem 0 0; color: #94a3b8; font-size: 1.05rem;">
                    Bindeord styrer ikke kun betydningen – de er magneter, der flytter rundt på verber og det lille ord <em>"ikke"</em>!
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <!-- Regel 1: F0 -->
                <div style="background: rgba(56, 189, 248, 0.08); border: 2px solid #0284c7; border-radius: 16px; padding: 1.5rem;">
                    <div style="font-size: 0.82rem; font-weight: 800; color: #38bdf8; text-transform: uppercase;">
                        🛣️ Regel 1 • Helsætnings-Motorvejen (Felt 0)
                    </div>
                    <h3 style="margin: 0.4rem 0 0.8rem; color: #f8fafc; font-size: 1.25rem;">og, men, eller, for, så</h3>
                    <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; margin: 0 0 1rem;">
                        Står i forbinderfeltet (Felt 0). De ændrer <strong>INGEN</strong> ordstilling. Subjektet og verbet står normalt, og <em>"ikke"</em> står <strong>EFTER</strong> verbet!
                    </p>
                    <div style="background: rgba(15, 23, 42, 0.8); padding: 0.8rem 1rem; border-radius: 10px; font-weight: 700; color: #7dd3fc; font-size: 1rem;">
                        Jeg har lyst, <span style="color:#fde047;">men</span> jeg <span style="color:#4ade80;">vil</span> <span style="color:#f87171;">ikke</span> spise mere.
                    </div>
                </div>

                <!-- Regel 2: Ledsætnings-zonen -->
                <div style="background: rgba(239, 68, 68, 0.08); border: 2px solid #ef4444; border-radius: 16px; padding: 1.5rem;">
                    <div style="font-size: 0.82rem; font-weight: 800; color: #f87171; text-transform: uppercase;">
                        🧲 Regel 2 • "IKKE"-Magneten i Ledsætninger
                    </div>
                    <h3 style="margin: 0.4rem 0 0.8rem; color: #f8fafc; font-size: 1.25rem;">fordi, selvom, når, da, hvis, at</h3>
                    <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; margin: 0 0 1rem;">
                        Tænder for ledsætnings-magneten! Centraladverbiet <em>"ikke"</em> rykker <strong>FØR</strong> verbet!
                    </p>
                    <div style="background: rgba(15, 23, 42, 0.8); padding: 0.8rem 1rem; border-radius: 10px; font-weight: 700; color: #fca5a5; font-size: 1rem;">
                        ... <span style="color:#fde047;">fordi</span> jeg <span style="color:#f87171;">IKKE</span> <span style="color:#4ade80;">hørte</span> vækkeuret.
                    </div>
                </div>

                <!-- Regel 3: Inversion -->
                <div style="background: rgba(139, 92, 246, 0.08); border: 2px solid #8b5cf6; border-radius: 16px; padding: 1.5rem;">
                    <div style="font-size: 0.82rem; font-weight: 800; color: #c4b5fd; text-transform: uppercase;">
                        🏹 Regel 3 • Inversions-Afkørslen (Plads 2!)
                    </div>
                    <h3 style="margin: 0.4rem 0 0.8rem; color: #f8fafc; font-size: 1.25rem;">derfor, alligevel, eller ledsætning i front</h3>
                    <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5; margin: 0 0 1rem;">
                        Når <em>derfor</em> eller en hel ledsætning står forrest i helsætningen, tvinger V2-reglen verbet frem på 2. plads foran subjektet!
                    </p>
                    <div style="background: rgba(15, 23, 42, 0.8); padding: 0.8rem 1rem; border-radius: 10px; font-weight: 700; color: #ddd6fe; font-size: 1rem;">
                        <span style="color:#fde047;">Derfor</span> <span style="color:#4ade80;">tog</span> (V) <span style="color:#38bdf8;">jeg</span> (S) min cykel.
                    </div>
                </div>
            </div>

            <!-- Interaktiv Mini-Test af Ordstilling -->
            <div style="background: rgba(15, 23, 42, 0.7); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 18px; padding: 1.8rem;">
                <h3 style="margin: 0 0 1rem; color: #fde047; font-size: 1.2rem;">
                    🧪 Test din færdsels-hukommelse: Hvor skal "IKKE" placeres?
                </h3>
                <div style="font-size: 1.2rem; color: #ffffff; line-height: 1.8; margin-bottom: 1.2rem;">
                    Han kom for sent til mødet, fordi han [ &nbsp; ] hørte [ &nbsp; ] vækkeuret.
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="action-btn-primary" id="btn-ord-1" style="background:#334155;">A) ... fordi han IKKE hørte vækkeuret</button>
                    <button class="action-btn-primary" id="btn-ord-2" style="background:#334155;">B) ... fordi han hørte IKKE vækkeuret</button>
                </div>
                <div id="ord-feedback" style="display:none; margin-top:1.2rem; padding:1rem; border-radius:10px; font-size:1rem; font-weight:700;"></div>
            </div>
        `;

        const btn1 = card.querySelector('#btn-ord-1');
        const btn2 = card.querySelector('#btn-ord-2');
        const fb = card.querySelector('#ord-feedback');

        btn1.onclick = () => {
            fb.style.display = 'block';
            fb.style.background = 'rgba(34, 197, 94, 0.15)';
            fb.style.border = '1.5px solid #22c55e';
            fb.style.color = '#4ade80';
            fb.innerHTML = `🎉 <strong>Lige i øjet!</strong> "Fordi" starter en ledsætning, så centraladverbiet <em>"ikke"</em> stiller sig FØR verbet ("ikke hørte")!`;
            speakDanish("Rigtigt! Fordi han ikke hørte vækkeuret.");
        };
        btn2.onclick = () => {
            fb.style.display = 'block';
            fb.style.background = 'rgba(239, 68, 68, 0.15)';
            fb.style.border = '1.5px solid #ef4444';
            fb.style.color = '#f87171';
            fb.innerHTML = `⚠️ <strong>Hov!</strong> Det ville passe i en helsætning, men "fordi" er en ledsætningskonjunktion, så <em>"ikke"</em> rykker frem foran verbet!`;
        };

        parent.appendChild(card);
    }

    // Initialize View
    switchTab(currentTab);
    container.appendChild(viewContainer);
}
