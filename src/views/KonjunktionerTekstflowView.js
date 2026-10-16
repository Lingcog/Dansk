import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

/**
 * KonjunktionerTekstflowView - Felt 8: Tekstens trafik og tekstflow
 * Minimalistisk og kognitiv tilgang uden overflødig tekst eller syntaks-teori.
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
    topBar.style.marginBottom = '1rem';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← Tilbage til konjunktioner`;
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

    // 8 Traffic Signals
    const TRAFIK_SIGNALS_DATA = [
        {
            id: 'og',
            word: 'og',
            role: 'Ligeud (forbindelse)',
            category: 'sideordning',
            color: '#38bdf8',
            x: 26,
            y: 49,
            desc: 'Forbinder to sætninger i samme retning.',
            example: 'Solen skinner, og fuglene synger.',
            example_en: 'The sun is shining, and the birds are singing.',
            translations: { en: 'and', de: 'und', es: 'y', ar: 'وَ', tr: 've', uk: 'і' }
        },
        {
            id: 'men',
            word: 'men',
            role: 'Sving (modsætning)',
            category: 'kontrast',
            color: '#f97316',
            x: 53,
            y: 47,
            desc: 'Viser en modsætning eller kontrast.',
            example: 'Jeg ville gerne med, men jeg har travlt.',
            example_en: 'I would like to come, but I am busy.',
            translations: { en: 'but', de: 'aber', es: 'pero', ar: 'لَكِنْ', tr: 'ama', uk: 'але' }
        },
        {
            id: 'fordi',
            word: 'fordi',
            role: 'Årsag (hvorfor)',
            category: 'aarsag',
            color: '#06b6d4',
            x: 81,
            y: 38,
            desc: 'Forklarer årsagen bag handlingen.',
            example: 'Han kom for sent, fordi bussen punkterede.',
            example_en: 'He was late because the bus had a flat tire.',
            translations: { en: 'because', de: 'weil', es: 'porque', ar: 'لِأَنَّ', tr: 'çünkü', uk: 'тому що' }
        },
        {
            id: 'derfor',
            word: 'derfor',
            role: 'Konsekvens (resultat)',
            category: 'virkning',
            color: '#8b5cf6',
            x: 66,
            y: 30,
            desc: 'Viser resultatet eller handlingen der følger.',
            example: 'Bussen var aflyst. Derfor tog jeg cyklen.',
            example_en: 'The bus was cancelled. Therefore I took my bike.',
            translations: { en: 'therefore', de: 'deshalb', es: 'por eso', ar: 'لِذَلِكَ', tr: 'bu yüzden', uk: 'тому' }
        },
        {
            id: 'selvom',
            word: 'selvom',
            role: 'Forhindring',
            category: 'trods',
            color: '#ec4899',
            x: 84,
            y: 75,
            desc: 'Viser en forhindring eller indrømmelse.',
            example: 'Selvom det regnede, gik vi en tur.',
            example_en: 'Even though it was raining, we went for a walk.',
            translations: { en: 'even though', de: 'obwohl', es: 'aunque', ar: 'رَغْمَ أَنَّ', tr: '-e rağmen', uk: 'хоча' }
        },
        {
            id: 'alligevel',
            word: 'alligevel',
            role: 'Trods forhindringen',
            category: 'trods',
            color: '#3b82f6',
            x: 63,
            y: 65,
            desc: 'Handlingen gennemføres på trods af forhindringen.',
            example: 'Det regnede kraftigt, men vi gik alligevel.',
            example_en: 'It rained heavily, but we went anyway.',
            translations: { en: 'anyway', de: 'trotzdem', es: 'aun así', ar: 'مَعَ ذَلِكَ', tr: 'yine de', uk: 'все одно' }
        },
        {
            id: 'når',
            word: 'når',
            role: 'Vane og fremtid',
            category: 'tid',
            color: '#10b981',
            x: 44,
            y: 56,
            desc: 'Gentagne vaner eller noget der sker i fremtiden.',
            example: 'Når vækkeuret ringer, står jeg op.',
            example_en: 'When the alarm rings, I get up.',
            translations: { en: 'when / whenever', de: 'wenn', es: 'cuando', ar: 'عِنْدَمَا', tr: 'zaman', uk: 'коли' }
        },
        {
            id: 'da',
            word: 'da',
            role: 'Fortid',
            category: 'tid',
            color: '#ef4444',
            x: 36,
            y: 22,
            desc: 'Én bestemt begivenhed eller periode i fortiden.',
            example: 'Da jeg boede i Aarhus, cyklede jeg hver dag.',
            example_en: 'When I lived in Aarhus, I cycled every day.',
            translations: { en: 'when (past)', de: 'als', es: 'cuando (pasado)', ar: 'عِنْدَمَا', tr: '-diğinde', uk: 'коли' }
        }
    ];

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .tekstflow-view {
            max-width: 900px;
            margin: 0 auto;
            padding: 0.8rem 1rem 3rem;
            color: #f8fafc;
        }
        .tf-hero {
            text-align: center;
            margin-bottom: 1.2rem;
        }
        .tf-hero h1 {
            font-size: 1.6rem;
            font-weight: 800;
            margin: 0 0 0.3rem;
            color: #f8fafc;
        }
        .tf-hero p {
            color: #94a3b8;
            font-size: 1rem;
            margin: 0;
            line-height: 1.5;
        }

        /* Tabs Nav */
        .tf-tabs-nav {
            display: flex;
            gap: 0.4rem;
            overflow-x: auto;
            padding-bottom: 0.4rem;
            margin-bottom: 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .tf-tab-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.5rem 0.9rem;
            border-radius: 10px;
            font-size: 0.92rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
        }
        .tf-tab-btn:hover {
            color: #f8fafc;
            border-color: #38bdf8;
            background: #334155;
        }
        .tf-tab-btn.active {
            background: #0284c7;
            color: white;
            border-color: #38bdf8;
        }

        /* Trafik-kort stage */
        .tf-stage-wrap {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 1.2rem;
            max-width: 840px;
            margin-left: auto;
            margin-right: auto;
        }
        .tf-stage-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.7rem 1rem;
            background: #1e293b;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-wrap: wrap;
            gap: 0.5rem;
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
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 2.5px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.82rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            z-index: 10;
        }
        .tf-pin:hover, .tf-pin.active {
            transform: translate(-50%, -50%) scale(1.25);
            z-index: 30;
            box-shadow: 0 0 15px #38bdf8;
            border-color: #fde047;
        }
        .tf-pin-label {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            color: #f8fafc;
            border: 1px solid rgba(255,255,255,0.25);
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
            font-size: 0.72rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 4px;
            pointer-events: none;
        }

        /* Inspector Panel */
        .tf-inspector {
            background: #1e293b;
            border: 1.5px solid #38bdf8;
            border-radius: 14px;
            padding: 1.2rem;
            margin-top: 1rem;
            animation: fadeIn 0.25s ease;
        }

        /* Story Container */
        .tf-story-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 1.2rem;
            margin-bottom: 1.2rem;
        }
        .tf-select {
            display: inline-block;
            padding: 0.3rem 0.6rem;
            border-radius: 8px;
            font-weight: 800;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin: 0 0.25rem;
            outline: none;
        }
        .tf-select.unanswered {
            background: #0f172a;
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
            background: #059669;
            color: white;
            border: none;
            padding: 0.55rem 1.1rem;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.92rem;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .action-btn-primary:hover {
            background: #10b981;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            .tekstflow-view { padding: 0.5rem 0.5rem 2.5rem; }
            .tf-hero h1 { font-size: 1.35rem; }
            .tf-hero p { font-size: 0.9rem; }
            .tf-tab-btn { padding: 0.4rem 0.65rem; font-size: 0.82rem; }
            .tf-pin { width: 24px; height: 24px; font-size: 0.72rem; }
            .tf-pin-label { font-size: 0.65rem; padding: 0.15rem 0.4rem; }
            .tf-story-card { padding: 1rem; }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section - Minimalist
    const hero = document.createElement('div');
    hero.className = 'tf-hero';
    hero.innerHTML = `
        <h1>Tekstens trafik og tekstflow</h1>
        <p>Bindeord styrer retningen og skaber et naturligt flow i sproget.</p>
    `;
    viewContainer.appendChild(hero);

    // 5 Tabs (Syntax/ordstilling tab completely removed)
    const tabs = [
        { id: 'kort', label: '1. Trafikkortet' },
        { id: 'historier', label: '2. Historierne' },
        { id: 'trafikprop', label: '3. Trafikproppen' },
        { id: 'staccato', label: '4. Fra staccato til flow' },
        { id: 'duel', label: '5. Trafik-duellen' }
    ];

    const nav = document.createElement('div');
    nav.className = 'tf-tabs-nav';

    let currentTab = (extraData && (extraData.subPath || extraData.tab)) ? (extraData.subPath || extraData.tab) : 'kort';
    if (currentTab === 'traening3' || currentTab === 'tekstflow' || currentTab === 'ordstilling') currentTab = 'kort';

    tabs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `tf-tab-btn ${currentTab === t.id ? 'active' : ''}`;
        btn.id = `tf-tab-${t.id}`;
        btn.innerText = t.label;
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
    }

    // ==========================================
    // 1. TRAFIKKORTET
    // ==========================================
    function renderTabTrafikkort(parent) {
        const stageWrap = document.createElement('div');
        stageWrap.className = 'tf-stage-wrap';

        // Stage Header
        const header = document.createElement('div');
        header.className = 'tf-stage-header';
        header.innerHTML = `
            <div style="font-weight: 700; font-size: 0.95rem; color: #f8fafc;">
                Trafikcentralen: 8 centrale signaler
            </div>
            <div id="tf-filter-btns" style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                <button class="action-btn-primary" data-filter="all" style="padding: 0.3rem 0.65rem; font-size: 0.8rem;">Alle (8)</button>
                <button class="action-btn-primary" data-filter="sideordning" style="padding: 0.3rem 0.65rem; font-size: 0.8rem; background: #334155;">og, men</button>
                <button class="action-btn-primary" data-filter="aarsag" style="padding: 0.3rem 0.65rem; font-size: 0.8rem; background: #334155;">fordi, derfor</button>
                <button class="action-btn-primary" data-filter="trods" style="padding: 0.3rem 0.65rem; font-size: 0.8rem; background: #334155;">selvom, alligevel</button>
                <button class="action-btn-primary" data-filter="tid" style="padding: 0.3rem 0.65rem; font-size: 0.8rem; background: #334155;">da, når</button>
            </div>
        `;
        stageWrap.appendChild(header);

        // Stage Body with natural traffic image
        const body = document.createElement('div');
        body.className = 'tf-stage-body';
        body.innerHTML = `
            <img src="${baseUrl}assets/tekstens_trafik_vrimmel.jpg" alt="Naturligt trafik-vrimlebillede" class="tf-stage-img" />
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
                <span>${sig.word.charAt(0).toUpperCase()}</span>
                <div class="tf-pin-label">${sig.word}</div>
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
                btn.style.background = '#059669';
                const f = btn.getAttribute('data-filter');
                body.querySelectorAll('.tf-pin').forEach(p => {
                    const cat = p.getAttribute('data-category');
                    if (f === 'all') {
                        p.style.display = 'flex';
                    } else if (f === 'sideordning' && (cat === 'sideordning' || cat === 'kontrast')) {
                        p.style.display = 'flex';
                    } else if (f === 'aarsag' && (cat === 'aarsag' || cat === 'virkning')) {
                        p.style.display = 'flex';
                    } else if (f === 'trods' && cat === 'trods') {
                        p.style.display = 'flex';
                    } else if (f === 'tid' && cat === 'tid') {
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
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.8rem;">
                    <div>
                        <span style="font-size: 1.6rem; font-weight: 800; color: ${sig.color};">${sig.word}</span>
                        <span style="font-size: 0.95rem; color: #94a3b8; font-weight: 700; margin-left: 0.5rem;">– ${sig.role}</span>
                        <div style="font-size: 0.95rem; color: #cbd5e1; margin-top: 0.2rem;">${sig.desc}</div>
                    </div>
                    <button type="button" id="btn-speak-signal" class="action-btn-primary" style="background: ${sig.color};">
                        🔊 Lyt
                    </button>
                </div>

                <div style="background: rgba(15, 23, 42, 0.7); padding: 0.9rem 1.1rem; border-radius: 10px; border-left: 3px solid ${sig.color}; margin-bottom: 0.8rem;">
                    <div style="font-size: 1.15rem; font-weight: 700; color: #ffffff; line-height: 1.5;">
                        "${sig.example}"
                    </div>
                    <div style="font-size: 0.95rem; color: #94a3b8; margin-top: 0.3rem;">
                        🌍 "${sig.example_en}"
                    </div>
                </div>

                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; font-size: 0.85rem; color: #94a3b8;">
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.2rem 0.5rem; border-radius: 6px;">🇬🇧 ${sig.translations.en}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.2rem 0.5rem; border-radius: 6px;">🇩🇪 ${sig.translations.de}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.2rem 0.5rem; border-radius: 6px;">🇪🇸 ${sig.translations.es}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.2rem 0.5rem; border-radius: 6px;">🇸🇦 ${sig.translations.ar}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.2rem 0.5rem; border-radius: 6px;">🇹🇷 ${sig.translations.tr}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.2rem 0.5rem; border-radius: 6px;">🇺🇦 ${sig.translations.uk}</span>
                </div>
            </div>
        `;

        container.querySelector('#btn-speak-signal').onclick = () => {
            speakDanish(`${sig.word}. ${sig.example}`);
        };
    }

    // ==========================================
    // 2. HISTORIERNE (KORTE FORTÆLLINGER)
    // ==========================================
    const EXTENDED_STORIES = [
        {
            id: 'historie1',
            title: '1. Mathias på cykel',
            desc: 'Cykelbuddet i snestorm.',
            text: "Mathias arbejder som cykelbud. [blank_0] det sner, er det hårdt at cykle. I dag vælter sneen ned. [blank_1] kører han forsigtigt. Han fryser om fingrene, [blank_2] han glemte sine handsker. [blank_3] det er koldt, smiler han til kunderne. Han er træt, men han fortsætter [blank_4] med at levere pakkerne. [blank_5] klokken slog 16 i går, var cyklen flad.",
            blanks: {
                "0": { options: ["Når", "Da", "Fordi"], answer: "Når", hint: "'Når' bruges om gentagne vaner." },
                "1": { options: ["Derfor", "Fordi", "Men"], answer: "Derfor", hint: "Den forsigtige kørsel er resultatet: 'Derfor'." },
                "2": { options: ["fordi", "derfor", "selvom"], answer: "fordi", hint: "De glemte handsker er årsagen til kulden: 'fordi'." },
                "3": { options: ["Selvom", "Alligevel", "Da"], answer: "Selvom", hint: "Kulden er en forhindring: 'Selvom'." },
                "4": { options: ["alligevel", "selvom", "fordi"], answer: "alligevel", hint: "Han fortsætter på trods: 'alligevel'." },
                "5": { options: ["Da", "Når", "Derfor"], answer: "Da", hint: "Én bestemt begivenhed i fortiden: 'Da'." }
            }
        },
        {
            id: 'historie2',
            title: '2. Anna i drivhuset',
            desc: 'Gartneren mod frosten.',
            text: "Anna er gartner. Hun klipper kun græsset, [blank_0] det er tørvejr. I går regnede det hele dagen. [blank_1] hun mødte på arbejde, var alting vådt. Hun klippede ikke græs, [blank_2] jorden var for blød. [blank_3] arbejdede hun i drivhuset i stedet. [blank_4] det regnede udenfor, var der lunt i drivhuset. Hun svedte, men hun fortsatte [blank_5].",
            blanks: {
                "0": { options: ["når", "da", "derfor"], answer: "når", hint: "En fast vane i tørvejr: 'når'." },
                "1": { options: ["Da", "Når", "Fordi"], answer: "Da", hint: "Tidspunkt i fortiden i går: 'Da'." },
                "2": { options: ["fordi", "derfor", "alligevel"], answer: "fordi", hint: "Den bløde jord er årsagen: 'fordi'." },
                "3": { options: ["Derfor", "Fordi", "Selvom"], answer: "Derfor", hint: "Løsningen og konsekvensen: 'Derfor'." },
                "4": { options: ["Selvom", "Alligevel", "Da"], answer: "Selvom", hint: "Kontrasten mellem ude og inde: 'Selvom'." },
                "5": { options: ["alligevel", "selvom", "derfor"], answer: "alligevel", hint: "Hun fortsætter på trods: 'alligevel'." }
            }
        },
        {
            id: 'historie3',
            title: '3. Lars på caféen',
            desc: 'Fredag aften i byen.',
            text: "Lars er tjener. [blank_0] solen skinner, vil gæsterne sidde udenfor. I dag er det sommer og varmt. [blank_1] har Lars ekstra travlt. Han løber hurtigt, [blank_2] mange venter på maden. [blank_3] han har ondt i fødderne, smiler han til alle. Han tager en ekstra vagt [blank_4]. [blank_5] caféen lukkede klokken 23 i går, drak personalet en sodavand sammen.",
            blanks: {
                "0": { options: ["Når", "Da", "Derfor"], answer: "Når", hint: "Gentagen vane hver gang solen skinner: 'Når'." },
                "1": { options: ["Derfor", "Fordi", "Men"], answer: "Derfor", hint: "Travlheden er resultatet: 'Derfor'." },
                "2": { options: ["fordi", "derfor", "alligevel"], answer: "fordi", hint: "Gæsternes ventetid er grunden: 'fordi'." },
                "3": { options: ["Selvom", "Alligevel", "Da"], answer: "Selvom", hint: "Smerten er en forhindring han overvinder: 'Selvom'." },
                "4": { options: ["alligevel", "selvom", "fordi"], answer: "alligevel", hint: "Han tager vagten på trods: 'alligevel'." },
                "5": { options: ["Da", "Når", "Fordi"], answer: "Da", hint: "Lukketid i går var en bestemt fortidig hændelse: 'Da'." }
            }
        },
        {
            id: 'historie4',
            title: '4. Amina til samtale',
            desc: 'Den vigtige jobsamtale.',
            text: "Amina søger job. [blank_0] hun skal til en vigtig samtale, forbereder hun sig grundigt. I går morges var hun spændt. [blank_1] hun trådte ind ad døren, bankede hendes hjerte. Hun var nervøs, [blank_2] hun gerne ville gøre et godt indtryk. [blank_3] øvede hun sin præsentation en ekstra gang. [blank_4] spørgsmålene var svære, svarede hun roligt. Da samtalen sluttede, fik hun jobbet [blank_5]!",
            blanks: {
                "0": { options: ["Når", "Da", "Derfor"], answer: "Når", hint: "Hendes faste forberedelsesvane: 'Når'." },
                "1": { options: ["Da", "Når", "Fordi"], answer: "Da", hint: "Tidspunktet i går da hun trådte ind: 'Da'." },
                "2": { options: ["fordi", "derfor", "alligevel"], answer: "fordi", hint: "Ønsket om et godt indtryk er årsagen: 'fordi'." },
                "3": { options: ["Derfor", "Fordi", "Selvom"], answer: "Derfor", hint: "Handlingen der følger af nervøsiteten: 'Derfor'." },
                "4": { options: ["Selvom", "Alligevel", "Da"], answer: "Selvom", hint: "De svære spørgsmål var forhindringen: 'Selvom'." },
                "5": { options: ["med det samme", "alligevel", "fordi"], answer: "med det samme", hint: "Succesen kom lige efter samtalen." }
            }
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
        switcher.style.gap = '0.4rem';
        switcher.style.marginBottom = '1rem';
        switcher.style.flexWrap = 'wrap';

        EXTENDED_STORIES.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = 'action-btn-primary';
            btn.style.background = idx === currentStoryIdx ? '#0284c7' : '#334155';
            btn.style.padding = '0.4rem 0.8rem';
            btn.style.fontSize = '0.85rem';
            btn.innerText = s.title;
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
        header.style.alignItems = 'center';
        header.style.flexWrap = 'wrap';
        header.style.gap = '0.5rem';
        header.style.marginBottom = '1rem';
        header.innerHTML = `
            <div>
                <h2 style="margin: 0; font-size: 1.3rem; color: #f8fafc;">${story.title}</h2>
                <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.9rem;">${story.desc}</p>
            </div>
            <button type="button" id="btn-speak-flow-story" class="action-btn-primary" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);">
                🔊 Lyt til historien
            </button>
        `;
        card.appendChild(header);

        // Story Paragraph with interactive blanks
        const textBox = document.createElement('div');
        textBox.style.fontSize = '1.18rem';
        textBox.style.lineHeight = '2';
        textBox.style.color = '#f8fafc';
        textBox.style.background = '#0f172a';
        textBox.style.padding = '1.2rem';
        textBox.style.borderRadius = '12px';
        textBox.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        textBox.style.marginBottom = '1rem';

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
                if (chosen) cls = isCorrect ? 'correct' : 'wrong';

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

        // Feedback Area
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'tf-live-feedback';
        feedbackDiv.style.display = 'none';
        feedbackDiv.style.padding = '0.8rem 1rem';
        feedbackDiv.style.borderRadius = '10px';
        feedbackDiv.style.marginBottom = '1rem';
        feedbackDiv.style.fontSize = '0.95rem';
        card.appendChild(feedbackDiv);

        // Bottom status & navigation
        const bottom = document.createElement('div');
        bottom.style.display = 'flex';
        bottom.style.justifyContent = 'space-between';
        bottom.style.alignItems = 'center';
        bottom.style.flexWrap = 'wrap';
        bottom.style.gap = '0.8rem';

        const statusText = document.createElement('div');
        statusText.style.fontWeight = '700';
        statusText.style.color = '#94a3b8';
        statusText.style.fontSize = '0.92rem';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'action-btn-primary';
        nextBtn.innerText = currentStoryIdx < EXTENDED_STORIES.length - 1 
            ? `Næste historie ➔` 
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
            statusText.innerHTML = `Fremgang: <span style="color:#4ade80; font-weight:800;">${correct}</span> af ${total} korrekt`;
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
                    feedbackDiv.style.border = '1px solid #22c55e';
                    feedbackDiv.style.color = '#4ade80';
                    feedbackDiv.innerHTML = `✓ Rigtigt! "${val}" passer perfekt.`;
                } else {
                    sel.className = 'tf-select wrong';
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedbackDiv.style.border = '1px solid #ef4444';
                    feedbackDiv.style.color = '#f87171';
                    feedbackDiv.innerHTML = `Prøv igen. ${blankData.hint}`;
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
    // 3. TRAFIKPROPPEN (FIND OG RET FEJLEN)
    // ==========================================
    const TRAFIKPROP_PUZZLES = [
        {
            id: 1,
            badText: "Kasper tog paraplyen med, DERFOR det regnede voldsomt udenfor.",
            wrongWord: "DERFOR",
            correctWord: "fordi",
            options: ["fordi", "derfor", "men", "selvom"],
            reason: "Regnen er årsagen (fordi), ikke resultatet."
        },
        {
            id: 2,
            badText: "DA jeg bliver færdig næste sommer, vil jeg rejse til Japan.",
            wrongWord: "DA",
            correctWord: "når",
            options: ["da", "når", "fordi", "hvis"],
            reason: "Næste sommer er i fremtiden. Brug 'når'."
        },
        {
            id: 3,
            badText: "Jeg elsker kaffe, OG jeg må ikke drikke det om aftenen.",
            wrongWord: "OG",
            correctWord: "men",
            options: ["og", "men", "derfor", "da"],
            reason: "Der er en modsætning. Brug 'men'."
        },
        {
            id: 4,
            badText: "Hun cyklede på arbejde, FORDI cyklen var punkteret.",
            wrongWord: "FORDI",
            correctWord: "selvom",
            options: ["fordi", "selvom", "derfor", "når"],
            reason: "Den flade cykel er en forhindring. Brug 'selvom'."
        },
        {
            id: 5,
            badText: "Der var frostvejr, SELVOM tog han den tykke vinterjakke på.",
            wrongWord: "SELVOM",
            correctWord: "derfor",
            options: ["selvom", "derfor", "fordi", "alligevel"],
            reason: "Vinterjakken er den logiske konsekvens: 'derfor'."
        },
        {
            id: 6,
            badText: "NÅR jeg var barn i 1995, klatrede jeg i æbletræerne.",
            wrongWord: "NÅR",
            correctWord: "da",
            options: ["når", "da", "derfor", "fordi"],
            reason: "Afsluttet tid i fortiden. Brug 'da'."
        },
        {
            id: 7,
            badText: "Toget var aflyst, FORDI kom vi for sent til mødet.",
            wrongWord: "FORDI",
            correctWord: "derfor",
            options: ["fordi", "derfor", "men", "da"],
            reason: "Forsinkelsen er resultatet: 'derfor'."
        },
        {
            id: 8,
            badText: "Kagen smagte godt, ALLIGEVEL bunden var blevet lidt brændt.",
            wrongWord: "ALLIGEVEL",
            correctWord: "selvom",
            options: ["alligevel", "selvom", "derfor", "og"],
            reason: "Indleder forhindringen: 'selvom'."
        },
        {
            id: 9,
            badText: "DA solen skinner, spiser vi altid frokost i haven.",
            wrongWord: "DA",
            correctWord: "når",
            options: ["da", "når", "fordi", "men"],
            reason: "Gentagen vane ('altid'). Brug 'når'."
        },
        {
            id: 10,
            badText: "Jonas taler flydende dansk, MEN han har boet her i 15 år.",
            wrongWord: "MEN",
            correctWord: "fordi",
            options: ["men", "fordi", "selvom", "derfor"],
            reason: "De 15 år er forklaringen og årsagen: 'fordi'."
        }
    ];

    let currentPuzzleIdx = 0;
    let puzzleScore = 0;

    function renderTabTrafikprop(parent) {
        const pz = TRAFIKPROP_PUZZLES[currentPuzzleIdx];

        const card = document.createElement('div');
        card.className = 'tf-story-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <h2 style="margin: 0; color: #f8fafc; font-size: 1.3rem;">Find fejlen i sætningen</h2>
                    <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.9rem;">Opgave ${currentPuzzleIdx + 1} af ${TRAFIKPROP_PUZZLES.length}</p>
                </div>
                <div style="font-weight: 700; color: #4ade80; font-size: 0.95rem;">
                    Point: ${puzzleScore} / ${currentPuzzleIdx}
                </div>
            </div>

            <div style="background: rgba(239, 68, 68, 0.1); border: 1.5px dashed #ef4444; padding: 1.1rem; border-radius: 12px; margin-bottom: 1rem;">
                <div style="font-size: 1.25rem; font-weight: 700; color: #ffffff; line-height: 1.5;">
                    "${pz.badText.replace(pz.wrongWord, `<span style="background: rgba(239, 68, 68, 0.4); text-decoration: line-through; padding: 0 4px; border-radius: 4px;">${pz.wrongWord}</span>`)}"
                </div>
            </div>

            <div style="font-size: 1rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.8rem;">
                Vælg det rigtige ord i stedet:
            </div>

            <div id="pz-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem; margin-bottom: 1rem;">
                ${pz.options.map(opt => `
                    <button class="action-btn-primary pz-opt-btn" data-val="${opt}" style="background: #334155; justify-content: center; font-size: 1.05rem; padding: 0.7rem;">
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div id="pz-feedback" style="display: none; padding: 0.9rem 1rem; border-radius: 10px; font-size: 0.95rem; margin-bottom: 1rem;"></div>

            <div style="display: flex; justify-content: flex-end;">
                <button id="btn-next-puzzle" class="action-btn-primary" style="display: none;">
                    ${currentPuzzleIdx < TRAFIKPROP_PUZZLES.length - 1 ? 'Næste sætning ➔' : 'Se resultat 🏆'}
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
                    btn.style.background = '#059669';

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedback.style.border = '1px solid #22c55e';
                    feedback.style.color = '#4ade80';
                    feedback.innerHTML = `✓ <strong>Rigtigt!</strong> "${pz.correctWord}" er det rigtige ord. ${pz.reason}`;
                    speakDanish(`Rigtigt! ${pz.badText.replace(pz.wrongWord, pz.correctWord)}`);
                } else {
                    btn.style.background = '#dc2626';

                    optBtns.forEach(b => {
                        if (b.getAttribute('data-val').toLowerCase() === pz.correctWord.toLowerCase()) {
                            b.style.background = '#059669';
                        }
                    });

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedback.style.border = '1px solid #ef4444';
                    feedback.style.color = '#f87171';
                    feedback.innerHTML = `Det rigtige ord er "${pz.correctWord}". ${pz.reason}`;
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
                    <div style="text-align: center; padding: 1.5rem;">
                        <h2 style="font-size: 1.5rem; color: #4ade80; margin: 0 0 0.5rem;">Øvelsen er fuldført!</h2>
                        <p style="font-size: 1.1rem; color: #cbd5e1; margin: 0 0 1rem;">Du fik <strong style="color:#38bdf8;">${puzzleScore}</strong> ud af ${TRAFIKPROP_PUZZLES.length} rigtige!</p>
                        <button class="action-btn-primary" id="btn-restart-prop">Prøv igen 🔄</button>
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
    // 4. FRA STACCATO TIL FLOW
    // ==========================================
    const STACCATO_DATA = [
        {
            title: "Morgen på vej til job",
            staccato: [
                "Vækkeuret ringede ikke klokken 7.",
                "Mette vågnede først klokken 8.",
                "Hun skyndte sig ud til bussen i regnvejr.",
                "Bussen kørte lige foran næsen på hende.",
                "Hun tog en taxa for at nå frem til tiden."
            ],
            flowStory: "I morges ringede vækkeuret ikke klokken 7. [blank_0] vågnede Mette først klokken 8. Hun skyndte sig ud til bussen, [blank_1] det regnede voldsomt. [blank_2] hun nåede stoppestedet, kørte bussen desværre lige foran hende. Hun tog [blank_3] en taxa for at nå frem.",
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
                "Det var koldt udenfor.",
                "Familien tog varme flyverdragter på.",
                "De kørte ud til den store skov.",
                "Børnene legede gemmeleg mellem træerne.",
                "Solen gik ned og de kørte hjem."
            ],
            flowStory: "Det var koldt udenfor i søndags. [blank_0] tog familien varme flyverdragter på. [blank_1] de kom ud til skoven, legede børnene gemmeleg, [blank_2] kulden bed i kinderne. [blank_3] solen gik ned, kørte de glade hjem.",
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <h2 style="margin: 0; color: #f8fafc; font-size: 1.3rem;">Fra korte sætninger til flydende sprog</h2>
                    <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.9rem;">Forbind sætningerne med de rette bindeord</p>
                </div>
                <div style="display: flex; gap: 0.4rem;">
                    ${STACCATO_DATA.map((s, idx) => `
                        <button class="action-btn-primary" id="btn-stac-${idx}" style="background: ${idx === currentStaccatoIdx ? '#0284c7' : '#334155'}; padding: 0.35rem 0.7rem; font-size: 0.85rem;">
                            Tekst ${idx + 1}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <!-- Uden bindeord -->
                <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 1rem;">
                    <div style="font-weight: 700; font-size: 0.88rem; color: #f87171; margin-bottom: 0.5rem;">
                        1. Uden bindeord (korte sætninger):
                    </div>
                    <ul style="margin: 0; padding-left: 1.1rem; color: #cbd5e1; font-size: 1rem; line-height: 1.7;">
                        ${item.staccato.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                    <div style="margin-top: 0.8rem;">
                        <button type="button" id="btn-listen-staccato" class="action-btn-primary" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 0.35rem 0.7rem; font-size: 0.82rem;">
                            🔊 Lyt
                        </button>
                    </div>
                </div>

                <!-- Med bindeord -->
                <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 1rem;">
                    <div style="font-weight: 700; font-size: 0.88rem; color: #4ade80; margin-bottom: 0.5rem;">
                        2. Med bindeord (flydende flow):
                    </div>
                    <div id="stac-flow-text" style="font-size: 1.12rem; line-height: 1.9; color: #ffffff;">
                    </div>
                    <div style="margin-top: 0.8rem;">
                        <button type="button" id="btn-listen-flow" class="action-btn-primary" style="padding: 0.35rem 0.7rem; font-size: 0.82rem;">
                            🔊 Lyt til flow
                        </button>
                    </div>
                </div>
            </div>

            <div id="stac-status-banner" style="background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.8rem 1rem; border-radius: 10px; font-weight: 700; color: #cbd5e1; font-size: 0.92rem;"></div>
        `;

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

        STACCATO_DATA.forEach((s, idx) => {
            card.querySelector(`#btn-stac-${idx}`).onclick = () => {
                currentStaccatoIdx = idx;
                renderTabStaccato(parent);
            };
        });

        const selects = flowTextDiv.querySelectorAll('.tf-select');
        const statusBanner = card.querySelector('#stac-status-banner');

        function updateProgress() {
            const total = Object.keys(item.blanks).length;
            let correct = 0;
            for (let i = 0; i < total; i++) {
                if (staccatoChoices[currentStaccatoIdx][i] === item.blanks[i].answer) correct++;
            }
            if (correct === total) {
                statusBanner.innerHTML = `✓ <strong style="color:#4ade80;">Perfekt!</strong> Sætningen flyder naturligt.`;
            } else {
                statusBanner.innerHTML = `Fremgang: <span style="color:#38bdf8;">${correct}</span> af ${total} korrekt.`;
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
    // 5. TRAFIK-DUELLEN (12 HURTIGE SCENARIER)
    // ==========================================
    const DUEL_DATA = [
        { q: "Jeg spiser frokost, ____ jeg er sulten.", pair: ["fordi", "derfor"], ans: "fordi", expl: "Sulten er årsagen: 'fordi'." },
        { q: "Jeg var meget sulten. ____ spiste jeg en pizza.", pair: ["Fordi", "Derfor"], ans: "Derfor", expl: "Pizzaen er resultatet: 'Derfor'." },
        { q: "____ jeg boede i Spanien i 2018, talte jeg spansk.", pair: ["Da", "Når"], ans: "Da", expl: "Enkeltstående tid i fortiden: 'Da'." },
        { q: "____ det bliver sommer, skal vi på ferie.", pair: ["Da", "Når"], ans: "Når", expl: "Fremtid kræver altid 'Når'." },
        { q: "____ det regnede kraftigt, løb hun en tur.", pair: ["Selvom", "Alligevel"], ans: "Selvom", expl: "Indleder forhindringen: 'Selvom'." },
        { q: "Det regnede kraftigt, men hun løb ____ en tur.", pair: ["selvom", "alligevel"], ans: "alligevel", expl: "Handling på trods: 'alligevel'." },
        { q: "Han ville gerne med, ____ han havde ikke råd.", pair: ["og", "men"], ans: "men", expl: "Kontrast og modsætning: 'men'." },
        { q: "Hun købte en kjole, ____ hun købte også sko.", pair: ["og", "men"], ans: "og", expl: "Tilføjer information: 'og'." },
        { q: "____ vækkeuret ringer, vågner jeg med det samme.", pair: ["Da", "Når"], ans: "Når", expl: "Gentagen hverdagsrutine: 'Når'." },
        { q: "Han var syg. ____ gik han glip af festen.", pair: ["Fordi", "Derfor"], ans: "Derfor", expl: "Resultatet af sygdommen: 'Derfor'." },
        { q: "Han bestod, ____ han havde læst grundigt.", pair: ["fordi", "derfor"], ans: "fordi", expl: "Læsningen var årsagen: 'fordi'." },
        { q: "____ jeg var barn, troede jeg på julemanden.", pair: ["Da", "Når"], ans: "Da", expl: "Afsluttet tid i fortiden: 'Da'." }
    ];

    let duelIdx = 0;
    let duelScore = 0;

    function renderTabDuel(parent) {
        const item = DUEL_DATA[duelIdx];

        const card = document.createElement('div');
        card.className = 'tf-story-card';

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <h2 style="margin: 0; color: #f8fafc; font-size: 1.3rem;">Vælg det rigtige ord</h2>
                    <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.9rem;">Spørgsmål ${duelIdx + 1} af ${DUEL_DATA.length}</p>
                </div>
                <div style="font-weight: 700; color: #4ade80; font-size: 0.95rem;">
                    Score: ${duelScore} / ${duelIdx}
                </div>
            </div>

            <div style="background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; padding: 1.3rem; margin-bottom: 1.2rem; text-align: center;">
                <div style="font-size: 1.25rem; font-weight: 700; color: #f8fafc; line-height: 1.6;">
                    "${item.q.replace('____', `<span style="background: rgba(56, 189, 248, 0.2); border-bottom: 2px solid #38bdf8; padding: 0.1rem 1rem; border-radius: 4px; color:#38bdf8;">?</span>`)}"
                </div>
            </div>

            <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                ${item.pair.map(opt => `
                    <button class="action-btn-primary duel-btn" data-opt="${opt}" style="font-size: 1.1rem; padding: 0.8rem 2rem; border-radius: 12px; background: #334155; min-width: 140px; justify-content: center;">
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div id="duel-feedback" style="display: none; padding: 0.8rem 1rem; border-radius: 10px; font-size: 0.95rem; margin-bottom: 1rem; text-align: center;"></div>

            <div style="display: flex; justify-content: center;">
                <button id="btn-next-duel" class="action-btn-primary" style="display: none; padding: 0.6rem 1.5rem;">
                    ${duelIdx < DUEL_DATA.length - 1 ? 'Næste spørgsmål ➔' : 'Se resultat 🏆'}
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
                    b.style.background = '#059669';

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedback.style.border = '1px solid #22c55e';
                    feedback.style.color = '#4ade80';
                    feedback.innerHTML = `✓ <strong>Rigtigt!</strong> "${item.ans}" er korrekt. ${item.expl}`;
                    speakDanish(`Rigtigt! ${item.q.replace('____', item.ans)}`);
                } else {
                    b.style.background = '#dc2626';

                    btns.forEach(btn => {
                        if (btn.getAttribute('data-opt').toLowerCase() === item.ans.toLowerCase()) {
                            btn.style.background = '#059669';
                        }
                    });

                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(239, 68, 68, 0.15)';
                    feedback.style.border = '1px solid #ef4444';
                    feedback.style.color = '#f87171';
                    feedback.innerHTML = `Det rigtige ord er "${item.ans}". ${item.expl}`;
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
                    <div style="text-align: center; padding: 1.5rem;">
                        <h2 style="font-size: 1.5rem; color: #4ade80; margin: 0 0 0.5rem;">Duellen er fuldført!</h2>
                        <p style="font-size: 1.1rem; color: #cbd5e1; margin: 0 0 1rem;">Du fik <strong style="color:#38bdf8;">${duelScore}</strong> ud af ${DUEL_DATA.length} rigtige!</p>
                        <button class="action-btn-primary" id="btn-restart-duel">Prøv igen 🔄</button>
                    </div>
                `;
                card.querySelector('#btn-restart-duel').onclick = () => {
                    duelIdx = 0;
                    duelScore = 0;
                    renderTabDuel(parent);
                };
            }
        };

        parent.appendChild(card);
    }

    // Initialize View
    switchTab(currentTab);
    container.appendChild(viewContainer);
}
