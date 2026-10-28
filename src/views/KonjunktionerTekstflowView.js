import { getTranslation, getLang } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';
import { getConjunctionWordTranslation } from '../utils/top100_konjunktioner_translations.js';

/**
 * KonjunktionerTekstflowView - Felt 8: Tekstens trafik og tekstflow
 * Super kompakt, skærmtilpasset og kognitiv tilgang til tekstflow.
 */
export function renderKonjunktionerTekstflowView(container, navigateFn, extraData = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container tekstflow-view';

    // Top Bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar tf-top-bar';
    topBar.innerHTML = `
        <button class="back-btn tf-back-btn">${getTranslation('konj_btn_back')}</button>
    `;
    topBar.querySelector('.tf-back-btn').onclick = () => navigateFn(extraData.from || 'top_konjunktioner');
    viewContainer.appendChild(topBar);

    // Oplæsning deaktiveret i Konjunktioner og bindeord
    function speakDanish(text) {
        return;
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

    // Compact Styles
    const style = document.createElement('style');
    style.textContent = `
        .tekstflow-view {
            width: 100%;
            max-width: 760px;
            min-width: 0;
            margin: 0 auto;
            padding: 0 0.2rem 2rem;
            box-sizing: border-box;
            overflow-x: hidden;
            color: #f8fafc;
        }
        .tf-top-bar {
            margin-bottom: 0.4rem !important;
        }
        .tf-back-btn {
            font-size: 0.88rem !important;
            padding: 0.25rem 0.5rem !important;
        }
        .tf-hero {
            text-align: center;
            margin-bottom: 0.7rem;
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
        }
        .tf-hero h1 {
            font-size: 1.35rem;
            font-weight: 800;
            margin: 0 0 0.15rem;
            color: #f8fafc;
            line-height: 1.25;
        }
        .tf-hero p {
            color: #94a3b8;
            font-size: 0.85rem;
            margin: 0;
            line-height: 1.35;
        }

        /* Tabs Nav */
        .tf-tabs-nav {
            display: flex;
            gap: 0.3rem;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            padding-bottom: 0.3rem;
            margin-bottom: 0.8rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-sizing: border-box;
        }
        .tf-tabs-nav::-webkit-scrollbar {
            display: none;
        }
        .tf-tab-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.4rem 0.75rem;
            border-radius: 8px;
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;
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
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 0.7rem;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }
        .tf-stage-header {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            padding: 0.5rem 0.75rem;
            background: #1e293b;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            box-sizing: border-box;
        }
        #tf-filter-btns {
            display: flex;
            gap: 0.25rem;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
        }
        #tf-filter-btns::-webkit-scrollbar {
            display: none;
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
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 2px solid #ffffff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            z-index: 10;
        }
        .tf-pin:hover, .tf-pin.active {
            transform: translate(-50%, -50%) scale(1.25);
            z-index: 30;
            box-shadow: 0 0 12px #38bdf8;
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
            padding: 0.15rem 0.4rem;
            border-radius: 4px;
            font-size: 0.68rem;
            font-weight: 800;
            white-space: nowrap;
            margin-top: 3px;
            pointer-events: none;
        }

        /* Inspector Panel */
        .tf-inspector {
            background: #1e293b;
            border: 1.5px solid #38bdf8;
            border-radius: 12px;
            padding: 0.75rem 0.9rem;
            margin-top: 0.6rem;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            animation: fadeIn 0.2s ease;
        }

        /* Story Container */
        .tf-story-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.85rem;
            margin-bottom: 0.8rem;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }
        .tf-select {
            display: inline-block;
            padding: 0.2rem 0.45rem;
            border-radius: 6px;
            font-weight: 800;
            font-size: 0.96rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin: 0 0.15rem;
            outline: none;
            max-width: 100%;
        }
        .tf-select.unanswered {
            background: #0f172a;
            border: 1.5px dashed #38bdf8;
            color: #38bdf8;
        }
        .tf-select.correct {
            background: rgba(34, 197, 94, 0.2);
            border: 1.5px solid #22c55e;
            color: #4ade80;
        }
        .tf-select.wrong {
            background: rgba(239, 68, 68, 0.2);
            border: 1.5px solid #ef4444;
            color: #f87171;
        }

        /* Action Buttons */
        .action-btn-primary {
            background: #059669;
            color: white;
            border: none;
            padding: 0.45rem 0.9rem;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.86rem;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            white-space: nowrap;
        }
        .action-btn-primary:hover {
            background: #10b981;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(3px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
            .tekstflow-view { padding: 0 0.1rem 1.8rem; }
            .tf-hero h1 { font-size: 1.25rem; }
            .tf-hero p { font-size: 0.82rem; }
            .tf-tab-btn { padding: 0.35rem 0.65rem; font-size: 0.8rem; }
            .tf-pin { width: 22px; height: 22px; font-size: 0.68rem; }
            .tf-pin-label { font-size: 0.62rem; padding: 0.1rem 0.35rem; }
            .tf-story-card { padding: 0.75rem; }
        }

        /* Model A & B: Tekstopbygning Styles */
        .opbygning-subnav {
            display: flex;
            gap: 0.35rem;
            margin-bottom: 0.75rem;
            flex-wrap: wrap;
        }
        .opbygning-subnav-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.35rem 0.75rem;
            border-radius: 8px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .opbygning-subnav-btn:hover {
            color: #f8fafc;
            border-color: #38bdf8;
            background: #334155;
        }
        .opbygning-subnav-btn.active {
            background: #0284c7;
            color: #ffffff;
            border-color: #38bdf8;
        }
        .opbygning-card {
            background: #1e293b;
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 0.7rem 0.85rem;
            margin-bottom: 0.5rem;
            transition: all 0.2s ease;
            position: relative;
            user-select: none;
            touch-action: manipulation;
        }
        .opbygning-card.selected {
            border-color: #38bdf8;
            background: #1e3a5f;
            box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.4);
            transform: scale(1.01);
        }
        .opbygning-card.is-correct {
            border-color: #22c55e;
            background: rgba(34, 197, 94, 0.08);
        }
        .opbygning-card.is-wrong {
            border-color: #f59e0b;
            border-style: dashed;
            background: rgba(245, 158, 11, 0.08);
        }
        .opbygning-arrow-btn {
            background: #334155;
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            width: 32px;
            height: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.15s ease;
            touch-action: manipulation;
        }
        .opbygning-arrow-btn:hover:not(:disabled) {
            background: #0284c7;
            border-color: #38bdf8;
        }
        .opbygning-arrow-btn:disabled {
            opacity: 0.25;
            cursor: not-allowed;
        }
        .byggeklods-block {
            background: #1e293b;
            border-radius: 10px;
            padding: 0.75rem 0.9rem;
            margin-bottom: 0.7rem;
            border-left: 4px solid;
            box-sizing: border-box;
        }
        .print-only {
            display: none;
        }
        @media print {
            body * {
                visibility: hidden;
            }
            .print-area, .print-area * {
                visibility: visible;
            }
            .print-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                color: #000000 !important;
                background: #ffffff !important;
                padding: 1.5cm;
                font-family: Arial, sans-serif;
            }
            .print-only {
                display: block !important;
            }
            .no-print {
                display: none !important;
            }
        }
    `;
    viewContainer.appendChild(style);

    // Hero Section - Super compact
    const hero = document.createElement('div');
    hero.className = 'tf-hero';
    hero.innerHTML = `
        <h1>${getTranslation('top_konj_f8_title')}</h1>
        <p>${getTranslation('top_konj_f8_desc')}</p>
    `;
    viewContainer.appendChild(hero);

    // 6 Compact Tabs
    const tabs = [
        { id: 'kort', label: getTranslation('flow_tab_kort') },
        { id: 'historier', label: getTranslation('flow_tab_historier') },
        { id: 'trafikprop', label: getTranslation('flow_tab_trafikprop') },
        { id: 'staccato', label: getTranslation('flow_tab_staccato') },
        { id: 'duel', label: getTranslation('flow_tab_duel') },
        { id: 'opbygning', label: (getTranslation('flow_tab_opbygning') && getTranslation('flow_tab_opbygning') !== 'flow_tab_opbygning') ? getTranslation('flow_tab_opbygning') : '6. Tekstopbygning ✉️' }
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
    tabContent.style.width = '100%';
    tabContent.style.minWidth = '0';
    tabContent.style.boxSizing = 'border-box';
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
        else if (tabId === 'opbygning') renderTabOpbygning(tabContent);
    }

    // ==========================================
    // 1. TRAFIKKORTET (KOMPAKT)
    // ==========================================
    function renderTabTrafikkort(parent) {
        const stageWrap = document.createElement('div');
        stageWrap.className = 'tf-stage-wrap';

        // Stage Header with responsive horizontal filter bar
        const header = document.createElement('div');
        header.className = 'tf-stage-header';
        header.innerHTML = `
            <div style="font-weight: 700; font-size: 0.88rem; color: #f8fafc;">
                Trafikcentralen: 8 centrale signaler
            </div>
            <div id="tf-filter-btns">
                <button class="action-btn-primary" data-filter="all" style="padding: 0.25rem 0.55rem; font-size: 0.76rem; flex-shrink: 0;">Alle (8)</button>
                <button class="action-btn-primary" data-filter="sideordning" style="padding: 0.25rem 0.55rem; font-size: 0.76rem; background: #334155; flex-shrink: 0;">og, men</button>
                <button class="action-btn-primary" data-filter="aarsag" style="padding: 0.25rem 0.55rem; font-size: 0.76rem; background: #334155; flex-shrink: 0;">fordi, derfor</button>
                <button class="action-btn-primary" data-filter="trods" style="padding: 0.25rem 0.55rem; font-size: 0.76rem; background: #334155; flex-shrink: 0;">selvom, alligevel</button>
                <button class="action-btn-primary" data-filter="tid" style="padding: 0.25rem 0.55rem; font-size: 0.76rem; background: #334155; flex-shrink: 0;">da, når</button>
            </div>
        `;
        stageWrap.appendChild(header);

        // Stage Body
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
            };
            body.appendChild(pin);
        });

        stageWrap.appendChild(body);
        parent.appendChild(stageWrap);

        // Filter Handlers
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

        // Compact Inspector Container
        const inspectorDiv = document.createElement('div');
        inspectorDiv.id = 'tf-signal-inspector';
        parent.appendChild(inspectorDiv);
        renderInspector(inspectorDiv, selectedSignal);
    }

    function renderInspector(container, sig) {
        const lang = getLang();
        const trans = getConjunctionWordTranslation('flow_' + sig.id, lang) || getConjunctionWordTranslation(sig.id, lang);
        const translatedSentence = (trans && trans.sentence) ? trans.sentence : (sig.example_en || '');
        const translatedDesc = (trans && trans.meaning) ? trans.meaning : sig.desc;

        container.innerHTML = `
            <div class="tf-inspector">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem;">
                    <div>
                        <span style="font-size: 1.35rem; font-weight: 800; color: ${sig.color};">${sig.word}</span>
                        <span style="font-size: 0.88rem; color: #94a3b8; font-weight: 700; margin-left: 0.4rem;">– ${sig.role}</span>
                        <div style="font-size: 0.88rem; color: #cbd5e1; margin-top: 0.1rem;">${translatedDesc}</div>
                    </div>
                </div>

                <div style="background: rgba(15, 23, 42, 0.7); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3px solid ${sig.color}; margin-bottom: 0.5rem;">
                    <div style="font-size: 1.05rem; font-weight: 700; color: #ffffff; line-height: 1.45;">
                        "${sig.example}"
                    </div>
                    <div style="font-size: 0.88rem; color: #94a3b8; margin-top: 0.2rem;">
                        🌍 "${translatedSentence}"
                    </div>
                </div>

                <div style="display: flex; gap: 0.3rem; flex-wrap: wrap; font-size: 0.78rem; color: #94a3b8;">
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.45rem; border-radius: 4px;">🇬🇧 ${sig.translations.en}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.45rem; border-radius: 4px;">🇩🇪 ${sig.translations.de}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.45rem; border-radius: 4px;">🇪🇸 ${sig.translations.es}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.45rem; border-radius: 4px;">🇸🇦 ${sig.translations.ar}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.45rem; border-radius: 4px;">🇹🇷 ${sig.translations.tr}</span>
                    <span style="background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.45rem; border-radius: 4px;">🇺🇦 ${sig.translations.uk}</span>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 2. HISTORIERNE (SUPER KOMPAKT)
    // ==========================================
    const EXTENDED_STORIES = [
        {
            id: 'historie1',
            title: '1. Mathias på cykel',
            desc: 'Cykelbuddet i snevejr.',
            text: "Mathias er cykelbud. [blank_0] det sner, er det hårdt at cykle. I dag vælter sneen ned. [blank_1] kører han forsigtigt. Han fryser om fingrene, [blank_2] han glemte sine handsker. [blank_3] det er koldt, smiler han til kunderne. Han er træt, men han fortsætter [blank_4] med pakkerne. [blank_5] klokken slog 16 i går, var cyklen flad.",
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

        // Horizontally scrolling compact story switcher
        const switcher = document.createElement('div');
        switcher.style.display = 'flex';
        switcher.style.gap = '0.3rem';
        switcher.style.overflowX = 'auto';
        switcher.style.webkitOverflowScrolling = 'touch';
        switcher.style.scrollbarWidth = 'none';
        switcher.style.width = '100%';
        switcher.style.minWidth = '0';
        switcher.style.boxSizing = 'border-box';
        switcher.style.marginBottom = '0.7rem';

        EXTENDED_STORIES.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.className = 'action-btn-primary';
            btn.style.background = idx === currentStoryIdx ? '#0284c7' : '#334155';
            btn.style.padding = '0.3rem 0.6rem';
            btn.style.fontSize = '0.78rem';
            btn.style.flexShrink = '0';
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
        header.style.gap = '0.4rem';
        header.style.marginBottom = '0.6rem';
        header.innerHTML = `
            <div>
                <h2 style="margin: 0; font-size: 1.15rem; color: #f8fafc;">${story.title}</h2>
                <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.82rem;">${story.desc}</p>
            </div>
        `;
        card.appendChild(header);

        // Story Paragraph with interactive blanks
        const textBox = document.createElement('div');
        textBox.style.fontSize = '1.02rem';
        textBox.style.lineHeight = '1.7';
        textBox.style.color = '#f8fafc';
        textBox.style.background = '#0f172a';
        textBox.style.padding = '0.8rem 0.95rem';
        textBox.style.borderRadius = '10px';
        textBox.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        textBox.style.marginBottom = '0.7rem';
        textBox.style.width = '100%';
        textBox.style.boxSizing = 'border-box';

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
        feedbackDiv.style.padding = '0.5rem 0.75rem';
        feedbackDiv.style.borderRadius = '8px';
        feedbackDiv.style.marginBottom = '0.7rem';
        feedbackDiv.style.fontSize = '0.88rem';
        card.appendChild(feedbackDiv);

        // Bottom status & navigation
        const bottom = document.createElement('div');
        bottom.style.display = 'flex';
        bottom.style.justifyContent = 'space-between';
        bottom.style.alignItems = 'center';
        bottom.style.flexWrap = 'wrap';
        bottom.style.gap = '0.5rem';

        const statusText = document.createElement('div');
        statusText.style.fontWeight = '700';
        statusText.style.color = '#94a3b8';
        statusText.style.fontSize = '0.84rem';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'action-btn-primary';
        nextBtn.style.padding = '0.35rem 0.75rem';
        nextBtn.style.fontSize = '0.82rem';
        nextBtn.innerText = currentStoryIdx < EXTENDED_STORIES.length - 1 
            ? `Næste historie ➔` 
            : `Historie 1 🔄`;
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
            statusText.innerHTML = `Fremgang: <span style="color:#4ade80; font-weight:800;">${correct}</span> af ${total}`;
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

        updateStoryProgress();
        parent.appendChild(card);
    }

    // ==========================================
    // 3. TRAFIKPROPPEN (KOMPAKT)
    // ==========================================
    const TRAFIKPROP_PUZZLES = [
        {
            id: 1,
            badText: "Kasper tog paraplyen med, DERFOR det regnede voldsomt.",
            wrongWord: "DERFOR",
            correctWord: "fordi",
            options: ["fordi", "derfor", "men", "selvom"],
            reason: "Regnen er årsagen: 'fordi'."
        },
        {
            id: 2,
            badText: "DA jeg bliver færdig næste sommer, vil jeg rejse til Japan.",
            wrongWord: "DA",
            correctWord: "når",
            options: ["da", "når", "fordi", "hvis"],
            reason: "Fremtid kræver 'når'."
        },
        {
            id: 3,
            badText: "Jeg elsker kaffe, OG jeg må ikke drikke det om aftenen.",
            wrongWord: "OG",
            correctWord: "men",
            options: ["og", "men", "derfor", "da"],
            reason: "Modsætning kræver 'men'."
        },
        {
            id: 4,
            badText: "Hun cyklede på arbejde, FORDI cyklen var punkteret.",
            wrongWord: "FORDI",
            correctWord: "selvom",
            options: ["fordi", "selvom", "derfor", "når"],
            reason: "Forhindring kræver 'selvom'."
        },
        {
            id: 5,
            badText: "Der var frostvejr, SELVOM tog han den tykke jakke på.",
            wrongWord: "SELVOM",
            correctWord: "derfor",
            options: ["selvom", "derfor", "fordi", "alligevel"],
            reason: "Logisk resultat: 'derfor'."
        },
        {
            id: 6,
            badText: "NÅR jeg var barn i 1995, klatrede jeg i æbletræerne.",
            wrongWord: "NÅR",
            correctWord: "da",
            options: ["når", "da", "derfor", "fordi"],
            reason: "Afsluttet tid i fortiden: 'da'."
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
            badText: "Kagen smagte godt, ALLIGEVEL bunden var lidt brændt.",
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
            reason: "Gentagen vane ('altid'): 'når'."
        },
        {
            id: 10,
            badText: "Jonas taler flydende dansk, MEN han har boet her i 15 år.",
            wrongWord: "MEN",
            correctWord: "fordi",
            options: ["men", "fordi", "selvom", "derfor"],
            reason: "Forklaring og årsag: 'fordi'."
        }
    ];

    let currentPuzzleIdx = 0;
    let puzzleScore = 0;

    function renderTabTrafikprop(parent) {
        const pz = TRAFIKPROP_PUZZLES[currentPuzzleIdx];

        const card = document.createElement('div');
        card.className = 'tf-story-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.4rem;">
                <div>
                    <h2 style="margin: 0; color: #f8fafc; font-size: 1.15rem;">Find fejlen i sætningen</h2>
                    <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.82rem;">Opgave ${currentPuzzleIdx + 1} af ${TRAFIKPROP_PUZZLES.length}</p>
                </div>
                <div style="font-weight: 700; color: #4ade80; font-size: 0.88rem;">
                    Point: ${puzzleScore} / ${currentPuzzleIdx}
                </div>
            </div>

            <div style="background: rgba(239, 68, 68, 0.1); border: 1.5px dashed #ef4444; padding: 0.75rem 0.9rem; border-radius: 10px; margin-bottom: 0.7rem;">
                <div style="font-size: 1.1rem; font-weight: 700; color: #ffffff; line-height: 1.45;">
                    "${pz.badText.replace(pz.wrongWord, `<span style="background: rgba(239, 68, 68, 0.4); text-decoration: line-through; padding: 0 3px; border-radius: 4px;">${pz.wrongWord}</span>`)}"
                </div>
            </div>

            <div style="font-size: 0.9rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.5rem;">
                Vælg det rigtige ord i stedet:
            </div>

            <div id="pz-options" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.45rem; margin-bottom: 0.7rem; width: 100%; box-sizing: border-box;">
                ${pz.options.map(opt => `
                    <button class="action-btn-primary pz-opt-btn" data-val="${opt}" style="background: #334155; justify-content: center; font-size: 0.98rem; padding: 0.55rem; width: 100%; border-radius: 8px;">
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div id="pz-feedback" style="display: none; padding: 0.6rem 0.8rem; border-radius: 8px; font-size: 0.88rem; margin-bottom: 0.7rem;"></div>

            <div style="display: flex; justify-content: flex-end;">
                <button id="btn-next-puzzle" class="action-btn-primary" style="display: none; padding: 0.4rem 0.9rem; font-size: 0.85rem;">
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
                    feedback.innerHTML = `✓ <strong>Rigtigt!</strong> "${pz.correctWord}" er korrekt. ${pz.reason}`;
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
                    <div style="text-align: center; padding: 1.2rem;">
                        <h2 style="font-size: 1.35rem; color: #4ade80; margin: 0 0 0.4rem;">Færdig!</h2>
                        <p style="font-size: 1rem; color: #cbd5e1; margin: 0 0 0.8rem;">Du fik <strong style="color:#38bdf8;">${puzzleScore}</strong> ud af ${TRAFIKPROP_PUZZLES.length} rigtige.</p>
                        <button class="action-btn-primary" id="btn-restart-prop" style="padding: 0.45rem 1rem;">Prøv igen 🔄</button>
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
    // 4. FRA STACCATO TIL FLOW (KOMPAKT)
    // ==========================================
    const STACCATO_DATA = [
        {
            title: "Morgen på vej til job",
            staccatoSummary: "1. Uret ringede ikke klokken 7. 2. Mette vågnede sent. 3. Bussen kørte foran hende. 4. Hun tog en taxa for at nå frem.",
            staccato: [
                "Vækkeuret ringede ikke klokken 7.",
                "Mette vågnede først klokken 8.",
                "Hun skyndte sig ud til bussen i regnvejr.",
                "Bussen kørte lige foran næsen på hende.",
                "Hun tog en taxa for at nå frem til tiden."
            ],
            flowStory: "I morges ringede vækkeuret ikke klokken 7. [blank_0] vågnede Mette først klokken 8. Hun skyndte sig ud til bussen, [blank_1] det regnede voldsomt. [blank_2] hun nåede stoppestedet, kørte bussen desværre lige foran hende. [blank_3] hun tog en taxa for at nå frem.",
            blanks: {
                "0": { options: ["Derfor", "Fordi", "Men"], answer: "Derfor" },
                "1": { options: ["selvom", "fordi", "hvis"], answer: "selvom" },
                "2": { options: ["Da", "Når", "Derfor"], answer: "Da" },
                "3": { options: ["Så", "Alligevel", "Men"], answer: "Så" }
            }
        },
        {
            title: "Søndagsturen i skoven",
            staccatoSummary: "1. Det var koldt udenfor. 2. Familien tog flyverdragter på. 3. De kørte ud til skoven. 4. Børnene legede gemmeleg. 5. De kørte hjem da solen gik ned.",
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
        },
        {
            title: "Aftensmad og lektielæsning",
            staccatoSummary: "1. Sofie kom træt hjem. 2. Hun fortalte sin far om lektierne. 3. De spiste aftensmad tidligt. 4. Hun kunne få god tid.",
            staccato: [
                "Sofie kom træt hjem fra skole.",
                "Hun fortalte sin far noget.",
                "Hun havde mange lektier for til i morgen.",
                "De spiste aftensmad tidligt.",
                "Hun fik god tid til matematikken."
            ],
            flowStory: "Sofie kom træt hjem fra skole i dag. Hun fortalte sin far, [blank_0] hun havde mange lektier for til i morgen. [blank_1] hun satte sig til bordet, var maden allerede færdig. De spiste aftensmad tidligt, [blank_2] hun kunne få god tid til lektierne, [blank_3] matematikken var ret svær.",
            blanks: {
                "0": { options: ["at", "så", "om"], answer: "at" },
                "1": { options: ["Da", "Hvis", "Fordi"], answer: "Da" },
                "2": { options: ["så", "men", "da"], answer: "så" },
                "3": { options: ["fordi", "selvom", "hvis"], answer: "fordi" }
            }
        },
        {
            title: "Et uventet opkald fra mekanikeren",
            staccatoSummary: "1. Peter håbede bilen blev klar. 2. Mekanikeren ringede. 3. Reservedelen var forsinket. 4. Peter måtte tage toget.",
            staccato: [
                "Peter håbede bilen snart blev klar.",
                "Mekanikeren ringede over middag.",
                "Reservedelen var desværre forsinket.",
                "Peter tog toget på arbejde resten af ugen."
            ],
            flowStory: "Peter håbede inderligt, [blank_0] bilen snart blev klar til syn. [blank_1] mekanikeren ringede over middag, forklarede han, [blank_2] reservedelen desværre var forsinket. [blank_3] Peter måtte tage toget på arbejde resten af ugen.",
            blanks: {
                "0": { options: ["at", "hvis", "når"], answer: "at" },
                "1": { options: ["Da", "Fordi", "Selvom"], answer: "Da" },
                "2": { options: ["at", "så", "om"], answer: "at" },
                "3": { options: ["Så", "Men", "Fordi"], answer: "Så" }
            }
        },
        {
            title: "Jobsamtalen i kantinen",
            staccatoSummary: "1. Hassan var nervøs før samtalen. 2. Han vidste han havde erfaring. 3. Chefen var imponeret. 4. Hassan fik jobbet.",
            staccato: [
                "Hassan var lidt nervøs før samtalen.",
                "Han vidste han havde gode erfaringer.",
                "Køkkenchefen hørte om hans erfaring.",
                "Hassan fik tilbudt stillingen straks."
            ],
            flowStory: "Hassan var lidt nervøs før samtalen, [blank_0] han vidste godt, [blank_1] han havde gode erfaringer fra et storkøkken. [blank_2] chefen hørte om hans erfaring, blev hun meget imponeret. [blank_3] Hassan fik tilbudt stillingen med det samme!",
            blanks: {
                "0": { options: ["men", "så", "da"], answer: "men" },
                "1": { options: ["at", "om", "hvis"], answer: "at" },
                "2": { options: ["Da", "Hvis", "Fordi"], answer: "Da" },
                "3": { options: ["Så", "Selvom", "Fordi"], answer: "Så" }
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.4rem;">
                <div>
                    <h2 style="margin: 0; color: #f8fafc; font-size: 1.15rem;">Fra staccato til flydende flow</h2>
                    <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.82rem;">Forbind sætningerne med de rette bindeord</p>
                </div>
                <div style="display: flex; gap: 0.3rem;">
                    ${STACCATO_DATA.map((s, idx) => `
                        <button class="action-btn-primary" id="btn-stac-${idx}" style="background: ${idx === currentStaccatoIdx ? '#0284c7' : '#334155'}; padding: 0.3rem 0.6rem; font-size: 0.78rem;">
                            Tekst ${idx + 1}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Kompakt sammenligning: Uden bindeord øverst -->
            <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 0.55rem 0.75rem; margin-bottom: 0.6rem;">
                <div style="margin-bottom: 0.25rem;">
                    <span style="font-weight: 700; font-size: 0.8rem; color: #f87171;">Uden bindeord (hakkende):</span>
                </div>
                <div style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.45;">
                    ${item.staccatoSummary}
                </div>
            </div>

            <!-- Med bindeord: Den interaktive opgave -->
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 0.75rem 0.85rem; margin-bottom: 0.6rem;">
                <div style="margin-bottom: 0.4rem;">
                    <span style="font-weight: 700; font-size: 0.82rem; color: #4ade80;">Med bindeord (flydende sprog):</span>
                </div>
                <div id="stac-flow-text" style="font-size: 1.02rem; line-height: 1.75; color: #ffffff;">
                </div>
            </div>

            <div id="stac-status-banner" style="background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.5rem 0.75rem; border-radius: 8px; font-weight: 700; color: #cbd5e1; font-size: 0.84rem;"></div>
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

        updateProgress();
        parent.appendChild(card);
    }

    // ==========================================
    // 5. TRAFIK-DUELLEN (KOMPAKT)
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.4rem;">
                <div>
                    <h2 style="margin: 0; color: #f8fafc; font-size: 1.15rem;">Vælg det rigtige ord</h2>
                    <p style="margin: 0.1rem 0 0; color: #94a3b8; font-size: 0.82rem;">Spørgsmål ${duelIdx + 1} af ${DUEL_DATA.length}</p>
                </div>
                <div style="font-weight: 700; color: #4ade80; font-size: 0.88rem;">
                    Score: ${duelScore} / ${duelIdx}
                </div>
            </div>

            <div style="background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; padding: 0.75rem 0.9rem; margin-bottom: 0.75rem; text-align: center;">
                <div style="font-size: 1.1rem; font-weight: 700; color: #f8fafc; line-height: 1.5;">
                    "${item.q.replace('____', `<span style="background: rgba(56, 189, 248, 0.2); border-bottom: 2px solid #38bdf8; padding: 0.1rem 0.6rem; border-radius: 4px; color:#38bdf8;">?</span>`)}"
                </div>
            </div>

            <div style="display: flex; justify-content: center; gap: 0.6rem; margin-bottom: 0.75rem; width: 100%; box-sizing: border-box;">
                ${item.pair.map(opt => `
                    <button class="action-btn-primary duel-btn" data-opt="${opt}" style="font-size: 1rem; padding: 0.6rem 1.2rem; border-radius: 8px; background: #334155; flex: 1; max-width: 160px; justify-content: center;">
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div id="duel-feedback" style="display: none; padding: 0.55rem 0.75rem; border-radius: 8px; font-size: 0.88rem; margin-bottom: 0.75rem; text-align: center;"></div>

            <div style="display: flex; justify-content: center;">
                <button id="btn-next-duel" class="action-btn-primary" style="display: none; padding: 0.4rem 1.1rem; font-size: 0.85rem;">
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
                    <div style="text-align: center; padding: 1.2rem;">
                        <h2 style="font-size: 1.35rem; color: #4ade80; margin: 0 0 0.4rem;">Duellen er fuldført!</h2>
                        <p style="font-size: 1rem; color: #cbd5e1; margin: 0 0 0.8rem;">Du fik <strong style="color:#38bdf8;">${duelScore}</strong> ud af ${DUEL_DATA.length} rigtige.</p>
                        <button class="action-btn-primary" id="btn-restart-duel" style="padding: 0.45rem 1rem;">Prøv igen 🔄</button>
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

    // ==========================================
    // 6. TEKSTOPBYGNING (MODEL A, MODEL B & KLIPPEARK)
    // ==========================================
    const OPBYGNING_EXERCISES = [
        {
            id: 'spare_penge',
            title: '1. Spare penge 💰',
            topic: 'Svar på din e-mail – om at spare penge',
            data: [
                {
                    id: 1,
                    text: "Emne: Svar på din e-mail – om at spare penge",
                    category: "indledning",
                    color: "#38bdf8",
                    catName: "Hilsen & Indledning",
                    preview: "Emne: Svar på din e-mail – om at spare penge",
                    connector: "Emne",
                    roleDesc: "Præsenterer e-mailens emne direkte."
                },
                {
                    id: 2,
                    text: "Hej Carl. Tak for din e-mail! Det var virkelig hyggeligt at høre fra dig igen.",
                    category: "indledning",
                    color: "#38bdf8",
                    catName: "Hilsen & Indledning",
                    preview: "Hej Carl. Tak for din e-mail!...",
                    connector: "Hilsen",
                    roleDesc: "Skaber venlig kontakt til modtageren."
                },
                {
                    id: 3,
                    text: "Du spørger, hvordan jeg lever billigt i hverdagen.",
                    category: "indledning",
                    color: "#38bdf8",
                    catName: "Hilsen & Indledning",
                    preview: "Du spørger, hvordan jeg lever billigt...",
                    connector: "Refererende indledning",
                    roleDesc: "Refererer til spørgsmålet og slår emnet fast."
                },
                {
                    id: 4,
                    text: "For det første køber jeg næsten altid ind i discountbutikker, og jeg kigger altid efter gule tilbudsmærker.",
                    category: "handlinger",
                    color: "#22c55e",
                    catName: "Svar på \"HVORDAN\" (Handlinger)",
                    preview: "For det første køber jeg næsten altid ind...",
                    connector: "For det første ... og",
                    roleDesc: "Første praktiske handling (opremsende bindeled)."
                },
                {
                    id: 5,
                    text: "Derudover laver jeg store portioner mad til flere dage, så jeg undgår madspild og sparer tid.",
                    category: "handlinger",
                    color: "#22c55e",
                    catName: "Svar på \"HVORDAN\" (Handlinger)",
                    preview: "Derudover laver jeg store portioner mad...",
                    connector: "Derudover ... så",
                    roleDesc: "Næste praktiske handling med konsekvens (så)."
                },
                {
                    id: 6,
                    text: "Mange tror, at det er kedeligt at spare, men for mig giver det en stor frihed.",
                    category: "argumenter",
                    color: "#f97316",
                    catName: "Svar på \"HVORFOR\" (Argumenter)",
                    preview: "Mange tror, at det er kedeligt..., men...",
                    connector: "Mange tror, at ... men",
                    roleDesc: "Skifter til argumenter via kontrast (men)."
                },
                {
                    id: 7,
                    text: "Fordi mine faste udgifter er lave, behøver jeg nemlig ikke at arbejde over.",
                    category: "argumenter",
                    color: "#f97316",
                    catName: "Svar på \"HVORFOR\" (Argumenter)",
                    preview: "Fordi mine faste udgifter er lave...",
                    connector: "Fordi ... nemlig",
                    roleDesc: "Begrundelse bag friheden (fordi + ledsætning)."
                },
                {
                    id: 8,
                    text: "Derfor har jeg mere tid til mine børn og mine fritidsinteresser.",
                    category: "argumenter",
                    color: "#f97316",
                    catName: "Svar på \"HVORFOR\" (Argumenter)",
                    preview: "Derfor har jeg mere tid til mine børn...",
                    connector: "Derfor",
                    roleDesc: "Konkluderende konsekvens (derfor + V2)."
                },
                {
                    id: 9,
                    text: "Hvad med dig? Har du nogle gode sparetip? Mange hilsner Jens",
                    category: "afslutning",
                    color: "#a855f7",
                    catName: "Afslutning & Modspørgsmål",
                    preview: "Hvad med dig? Har du nogle gode sparetip?...",
                    connector: "Modspørgsmål & Hilsen",
                    roleDesc: "Sender bolden tilbage til modtageren og runder af."
                }
            ],
            categories: [
                { id: 'indledning', label: '🔵 Blå: Hilsen & Indledning', color: '#38bdf8', desc: 'Skaber kontakt og præsenterer emnet', strips: [1, 2, 3] },
                { id: 'handlinger', label: '🟢 Grøn: Svar på "HVORDAN"', color: '#22c55e', desc: 'Praktiske handlinger (discount, madspild)', strips: [4, 5] },
                { id: 'argumenter', label: '🟠 Orange: Svar på "HVORFOR"', color: '#f97316', desc: 'Argumenter og begrundelser (frihed, tid)', strips: [6, 7, 8] },
                { id: 'afslutning', label: '🟣 Lilla: Afslutning & Modspørgsmål', color: '#a855f7', desc: 'Sender bolden tilbage og runder af', strips: [9] }
            ]
        },
        {
            id: 'boernehave',
            title: '2. Nyt job i børnehaven 👶',
            topic: 'Svar på din e-mail – om mit nye arbejde i en børnehave',
            data: [
                {
                    id: 1,
                    text: "Hej Emma. Tak for din e-mail. Det var dejligt at høre fra dig!",
                    category: "indledning",
                    color: "#38bdf8",
                    catName: "Hilsen & Indledning",
                    preview: "Hej Emma. Tak for din e-mail...",
                    connector: "Hilsen & Tak",
                    roleDesc: "Skaber venlig kontakt til modtageren."
                },
                {
                    id: 2,
                    text: "Du spørger om mit nye arbejde. Jeg er startet som medhjælper i en børnehave. Børnene er søde, og arbejdet er godt.",
                    category: "indledning",
                    color: "#38bdf8",
                    catName: "Hilsen & Indledning",
                    preview: "Du spørger om mit nye arbejde...",
                    connector: "Refererende indledning",
                    roleDesc: "Refererer til spørgsmålet og introducerer det nye job."
                },
                {
                    id: 3,
                    text: "For det første kan jeg godt lide at lege med børnene i gården.",
                    category: "handlinger",
                    color: "#22c55e",
                    catName: "Svar på \"HVORDAN\" (Det positive job)",
                    preview: "For det første kan jeg godt lide...",
                    connector: "For det første",
                    roleDesc: "Første positive handling i hverdagen."
                },
                {
                    id: 4,
                    text: "For det andet har jeg besluttet at lære alle deres navne, fordi det er nemt og praktisk.",
                    category: "handlinger",
                    color: "#22c55e",
                    catName: "Svar på \"HVORDAN\" (Det positive job)",
                    preview: "For det andet har jeg besluttet...",
                    connector: "For det andet ... fordi",
                    roleDesc: "Anden positive handling med begrundelse (fordi)."
                },
                {
                    id: 5,
                    text: "Du spørger også, hvorfor arbejdet somme tider er hårdt og stressende. Det er mest, fordi der ofte er meget larm i børnehaven.",
                    category: "argumenter",
                    color: "#f97316",
                    catName: "Svar på \"HVORFOR\" (Udfordringer & Begrundelser)",
                    preview: "Du spørger også, hvorfor arbejdet...",
                    connector: "Du spørger også ... fordi",
                    roleDesc: "Skifter til udfordringer og angiver den første årsag (larm)."
                },
                {
                    id: 6,
                    text: "Når mange børn græder på samme tid, kan det være svært at være helt rolig.",
                    category: "argumenter",
                    color: "#f97316",
                    catName: "Svar på \"HVORFOR\" (Udfordringer & Begrundelser)",
                    preview: "Når mange børn græder på samme tid...",
                    connector: "Når ... (inversion: kan det)",
                    roleDesc: "Uddyber årsagen med betingelse (når) og inversion."
                },
                {
                    id: 7,
                    text: "Desuden mener jeg, at vi ikke altid har nok voksne på arbejdet, når en kollega er syg. Så skal vi arbejde meget hurtigt.",
                    category: "argumenter",
                    color: "#f97316",
                    catName: "Svar på \"HVORFOR\" (Udfordringer & Begrundelser)",
                    preview: "Desuden mener jeg, at vi ikke...",
                    connector: "Desuden ... at ... Så",
                    roleDesc: "Tilføjer nyt argument med holdning (at) og konsekvens (Så)."
                },
                {
                    id: 8,
                    text: "Alligevel er jeg glad for at arbejde der, fordi det er et godt job.",
                    category: "argumenter",
                    color: "#f97316",
                    catName: "Svar på \"HVORFOR\" (Udfordringer & Begrundelser)",
                    preview: "Alligevel er jeg glad for at arbejde der...",
                    connector: "Alligevel ... fordi",
                    roleDesc: "Gennembrud: Trods udfordringerne opretholdes glæden."
                },
                {
                    id: 9,
                    text: "Hvordan går det med dig? Lad os snart drikke en kop kaffe sammen! De bedste hilsner",
                    category: "afslutning",
                    color: "#a855f7",
                    catName: "Afslutning & Modspørgsmål",
                    preview: "Hvordan går det med dig? Lad os snart...",
                    connector: "Modspørgsmål & Afsked",
                    roleDesc: "Sender bolden tilbage til modtageren og runder e-mailen af."
                }
            ],
            categories: [
                { id: 'indledning', label: '🔵 Blå: Hilsen & Indledning', color: '#38bdf8', desc: 'Skaber kontakt og præsenterer emnet', strips: [1, 2] },
                { id: 'handlinger', label: '🟢 Grøn: Svar på "HVORDAN"', color: '#22c55e', desc: 'Det positive ved jobbet: lege, lære navne', strips: [3, 4] },
                { id: 'argumenter', label: '🟠 Orange: Svar på "HVORFOR"', color: '#f97316', desc: 'Udfordringer & begrundelser: larm, sygdom, alligevel glad', strips: [5, 6, 7, 8] },
                { id: 'afslutning', label: '🟣 Lilla: Afslutning & Modspørgsmål', color: '#a855f7', desc: 'Sender bolden tilbage: kaffe og hilsen', strips: [9] }
            ]
        }
    ];

    // Local persistent state across exercises & subtabs
    let currentOpbygningExId = 'spare_penge';
    let opbygningSubTab = 'model_a';
    let opbygningCompact = false;
    let byggeklodsMode = 'anatomi';

    // State per exercise
    const exState = {
        'spare_penge': {
            userOrder: [4, 2, 8, 1, 7, 3, 9, 5, 6].map(id => OPBYGNING_EXERCISES[0].data.find(s => s.id === id)),
            selectedIdx: null,
            checked: false,
            userCatSelections: {},
            userCatChecked: false
        },
        'boernehave': {
            userOrder: [5, 2, 7, 1, 8, 3, 9, 4, 6].map(id => OPBYGNING_EXERCISES[1].data.find(s => s.id === id)),
            selectedIdx: null,
            checked: false,
            userCatSelections: {},
            userCatChecked: false
        }
    };

    function renderTabOpbygning(parent) {
        parent.innerHTML = '';

        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.boxSizing = 'border-box';

        const currentEx = OPBYGNING_EXERCISES.find(e => e.id === currentOpbygningExId) || OPBYGNING_EXERCISES[0];
        const state = exState[currentOpbygningExId];

        // 1. Exercise Switcher Row
        const exSwitcher = document.createElement('div');
        exSwitcher.className = 'no-print';
        exSwitcher.style.cssText = 'display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.65rem; flex-wrap: wrap; background: #0f172a; padding: 0.4rem 0.6rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.08);';
        exSwitcher.innerHTML = `
            <span style="font-size: 0.78rem; font-weight: 700; color: #94a3b8; margin-right: 0.2rem;">Vælg tekst:</span>
            ${OPBYGNING_EXERCISES.map(ex => `
                <button class="opbygning-subnav-btn ${currentOpbygningExId === ex.id ? 'active' : ''}" data-ex="${ex.id}" style="${currentOpbygningExId === ex.id ? 'background: #059669; border-color: #10b981; color: white;' : ''}">
                    ${ex.title}
                </button>
            `).join('')}
        `;

        exSwitcher.querySelectorAll('.opbygning-subnav-btn').forEach(btn => {
            btn.onclick = () => {
                const exId = btn.getAttribute('data-ex');
                if (exId !== currentOpbygningExId) {
                    currentOpbygningExId = exId;
                    renderTabOpbygning(parent);
                }
            };
        });
        container.appendChild(exSwitcher);

        // 2. Subnav Pills: Model A | Model B | Klippeark
        const subNav = document.createElement('div');
        subNav.className = 'opbygning-subnav no-print';
        subNav.innerHTML = `
            <button class="opbygning-subnav-btn ${opbygningSubTab === 'model_a' ? 'active' : ''}" data-sub="model_a">
                🧩 Model A: Puslespil
            </button>
            <button class="opbygning-subnav-btn ${opbygningSubTab === 'model_b' ? 'active' : ''}" data-sub="model_b">
                🧱 Model B: Byggeklodser
            </button>
            <button class="opbygning-subnav-btn ${opbygningSubTab === 'klippeark' ? 'active' : ''}" data-sub="klippeark">
                ✂️ Klippeark (Print)
            </button>
        `;

        subNav.querySelectorAll('.opbygning-subnav-btn').forEach(btn => {
            btn.onclick = () => {
                opbygningSubTab = btn.getAttribute('data-sub');
                renderTabOpbygning(parent);
            };
        });
        container.appendChild(subNav);

        const subContent = document.createElement('div');
        subContent.style.width = '100%';
        subContent.style.boxSizing = 'border-box';
        container.appendChild(subContent);

        if (opbygningSubTab === 'model_a') {
            renderOpbygningModelA(subContent, currentEx, state, parent);
        } else if (opbygningSubTab === 'model_b') {
            renderOpbygningModelB(subContent, currentEx, state, parent);
        } else {
            renderOpbygningKlippeark(subContent, currentEx);
        }

        parent.appendChild(container);
    }

    // --- Sub-view: Model A (Puslespil) ---
    function renderOpbygningModelA(container, currentEx, state, parent) {
        container.innerHTML = `
            <div style="background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.45rem;">
                    <div>
                        <h2 style="font-size: 1.15rem; font-weight: 800; color: #f8fafc; margin: 0;">
                            Model A: Puslespil – ${currentEx.title}
                        </h2>
                        <p style="margin: 0.15rem 0 0; color: #94a3b8; font-size: 0.82rem;">
                            Genskab e-mailens logiske rækkefølge. Brug <strong>▲ / ▼</strong> eller tryk på to strimler for at bytte plads.
                        </p>
                    </div>
                    <button id="btn-toggle-compact" class="opbygning-subnav-btn" style="padding: 0.25rem 0.6rem; font-size: 0.78rem;">
                        ${opbygningCompact ? '📄 Fuld tekst' : '📑 Kompakt overblik'}
                    </button>
                </div>
            </div>

            <div id="opbygning-strips-list" style="margin-bottom: 0.75rem;"></div>

            <div id="opbygning-feedback-box" style="display: none; padding: 0.75rem 0.9rem; border-radius: 10px; margin-bottom: 0.75rem; text-align: center;"></div>

            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center;">
                <button id="btn-check-order" class="action-btn-primary" style="padding: 0.5rem 1.1rem; font-size: 0.9rem;">
                    ✓ Tjek rækkefølge
                </button>
                <button id="btn-shuffle-order" class="opbygning-subnav-btn" style="padding: 0.5rem 0.9rem; font-size: 0.86rem;">
                    🔀 Bland igen
                </button>
                <button id="btn-show-solution" class="opbygning-subnav-btn" style="padding: 0.5rem 0.9rem; font-size: 0.86rem;">
                    👁️ Se facit
                </button>
            </div>
        `;

        container.querySelector('#btn-toggle-compact').onclick = () => {
            opbygningCompact = !opbygningCompact;
            renderOpbygningModelA(container, currentEx, state, parent);
        };

        const listDiv = container.querySelector('#opbygning-strips-list');
        const feedbackBox = container.querySelector('#opbygning-feedback-box');

        function updateList() {
            listDiv.innerHTML = '';
            state.userOrder.forEach((strip, idx) => {
                const isCorrect = state.checked && (strip.id === idx + 1);
                const isWrong = state.checked && (strip.id !== idx + 1);
                const isSelected = (state.selectedIdx === idx);

                const card = document.createElement('div');
                card.className = `opbygning-card ${isSelected ? 'selected' : ''} ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`;
                card.style.cursor = 'pointer';

                let statusBadge = '';
                if (isSelected) {
                    statusBadge = `<span style="background: #0284c7; color: white; padding: 0.1rem 0.45rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">Valgt – tryk på en anden for at bytte</span>`;
                } else if (isCorrect) {
                    statusBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #4ade80; padding: 0.1rem 0.45rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">✓ Rigtig plads</span>`;
                } else if (isWrong) {
                    statusBadge = `<span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; padding: 0.1rem 0.45rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">Flyt denne</span>`;
                }

                if (opbygningCompact) {
                    card.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.4rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1; min-width: 0;">
                                <span style="background: #334155; color: #f8fafc; font-weight: 800; font-size: 0.78rem; padding: 0.2rem 0.45rem; border-radius: 6px; flex-shrink: 0;">
                                    #${idx + 1}
                                </span>
                                <div style="min-width: 0; flex: 1;">
                                    <div style="font-weight: 700; color: #f8fafc; font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                        ${strip.preview}
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.35rem; margin-top: 0.1rem;">
                                        <span style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">${strip.connector}</span>
                                        ${statusBadge}
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 0.25rem; flex-shrink: 0;" onclick="event.stopPropagation();">
                                <button class="opbygning-arrow-btn btn-up" ${idx === 0 ? 'disabled' : ''} title="Flyt op">▲</button>
                                <button class="opbygning-arrow-btn btn-down" ${idx === state.userOrder.length - 1 ? 'disabled' : ''} title="Flyt ned">▼</button>
                            </div>
                        </div>
                    `;
                } else {
                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                            <div style="flex: 1; min-width: 0;">
                                <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.3rem;">
                                    <span style="background: #334155; color: #f8fafc; font-weight: 800; font-size: 0.78rem; padding: 0.15rem 0.45rem; border-radius: 6px;">
                                        Plads #${idx + 1}
                                    </span>
                                    <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 4px;">
                                        ${strip.connector}
                                    </span>
                                    ${statusBadge}
                                </div>
                                <div style="color: #f8fafc; font-size: 0.94rem; line-height: 1.45; font-weight: 500;">
                                    ${strip.text}
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 0.25rem; flex-shrink: 0;" onclick="event.stopPropagation();">
                                <button class="opbygning-arrow-btn btn-up" ${idx === 0 ? 'disabled' : ''} title="Flyt op">▲</button>
                                <button class="opbygning-arrow-btn btn-down" ${idx === state.userOrder.length - 1 ? 'disabled' : ''} title="Flyt ned">▼</button>
                            </div>
                        </div>
                    `;
                }

                // Card click for tap-to-swap
                card.onclick = () => {
                    if (state.selectedIdx === null) {
                        state.selectedIdx = idx;
                    } else if (state.selectedIdx === idx) {
                        state.selectedIdx = null;
                    } else {
                        // Swap
                        const temp = state.userOrder[state.selectedIdx];
                        state.userOrder[state.selectedIdx] = state.userOrder[idx];
                        state.userOrder[idx] = temp;
                        state.selectedIdx = null;
                        state.checked = false;
                        feedbackBox.style.display = 'none';
                    }
                    updateList();
                };

                // Button handlers
                card.querySelector('.btn-up').onclick = (e) => {
                    e.stopPropagation();
                    if (idx > 0) {
                        const temp = state.userOrder[idx - 1];
                        state.userOrder[idx - 1] = state.userOrder[idx];
                        state.userOrder[idx] = temp;
                        state.selectedIdx = null;
                        state.checked = false;
                        feedbackBox.style.display = 'none';
                        updateList();
                    }
                };
                card.querySelector('.btn-down').onclick = (e) => {
                    e.stopPropagation();
                    if (idx < state.userOrder.length - 1) {
                        const temp = state.userOrder[idx + 1];
                        state.userOrder[idx + 1] = state.userOrder[idx];
                        state.userOrder[idx] = temp;
                        state.selectedIdx = null;
                        state.checked = false;
                        feedbackBox.style.display = 'none';
                        updateList();
                    }
                };

                listDiv.appendChild(card);
            });
        }

        updateList();

        // Bottom Actions
        container.querySelector('#btn-check-order').onclick = () => {
            state.checked = true;
            state.selectedIdx = null;

            let correctCount = 0;
            state.userOrder.forEach((s, i) => {
                if (s.id === i + 1) correctCount++;
            });

            feedbackBox.style.display = 'block';
            if (correctCount === 9) {
                feedbackBox.style.background = 'rgba(34, 197, 94, 0.15)';
                feedbackBox.style.border = '1.5px solid #22c55e';
                feedbackBox.style.color = '#4ade80';
                feedbackBox.innerHTML = `
                    <div style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.3rem;">🎉 Perfekt klaret!</div>
                    <div style="font-size: 0.88rem; color: #f8fafc; margin-bottom: 0.6rem;">
                        Alle 9 strimler står i den logiske rækkefølge. Tekstflowet hænger nu fuldstændigt sammen.
                    </div>
                    <div style="display: flex; gap: 0.4rem; justify-content: center; flex-wrap: wrap;">
                        <button id="btn-go-model-b" class="action-btn-primary" style="background: #8b5cf6; padding: 0.35rem 0.8rem; font-size: 0.82rem;">
                            Se byggeklodserne (Model B) ➔
                        </button>
                    </div>
                `;
                feedbackBox.querySelector('#btn-go-model-b').onclick = () => {
                    opbygningSubTab = 'model_b';
                    renderTabOpbygning(parent);
                };
            } else {
                feedbackBox.style.background = 'rgba(245, 158, 11, 0.12)';
                feedbackBox.style.border = '1.5px solid #f59e0b';
                feedbackBox.style.color = '#fbbf24';
                feedbackBox.innerHTML = `
                    <div style="font-weight: 700; font-size: 0.95rem;">
                        ${correctCount} af 9 strimler er på rette plads.
                    </div>
                    <div style="font-size: 0.82rem; color: #cbd5e1; margin-top: 0.2rem;">
                        Kig efter brobyggerne og logiske overgange, og prøv igen.
                    </div>
                `;
            }
            updateList();
        };

        container.querySelector('#btn-shuffle-order').onclick = () => {
            state.checked = false;
            state.selectedIdx = null;
            feedbackBox.style.display = 'none';
            state.userOrder = [...currentEx.data].sort(() => Math.random() - 0.5);
            updateList();
        };

        container.querySelector('#btn-show-solution').onclick = () => {
            state.checked = true;
            state.selectedIdx = null;
            state.userOrder = [...currentEx.data];
            feedbackBox.style.display = 'block';
            feedbackBox.style.background = 'rgba(56, 189, 248, 0.15)';
            feedbackBox.style.border = '1.5px solid #38bdf8';
            feedbackBox.style.color = '#38bdf8';
            feedbackBox.innerHTML = `
                <div style="font-weight: 700; font-size: 0.92rem;">Facit vist: Logisk tekstflow</div>
                <div style="font-size: 0.82rem; color: #cbd5e1; margin-top: 0.2rem;">
                    Hilsen ➔ Handlinger (Hvordan) ➔ Argumenter (Hvorfor) ➔ Afslutning.
                </div>
            `;
            updateList();
        };
    }

    // --- Sub-view: Model B (Byggeklodser) ---
    function renderOpbygningModelB(container, currentEx, state, parent) {
        container.innerHTML = `
            <div style="background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.45rem;">
                    <div>
                        <h2 style="font-size: 1.15rem; font-weight: 800; color: #f8fafc; margin: 0;">
                            Model B: Byggeklodser – ${currentEx.title}
                        </h2>
                        <p style="margin: 0.15rem 0 0; color: #94a3b8; font-size: 0.82rem;">
                            En stærk tekst er bygget af 4 funktioner: Indledning ➔ Handlinger ➔ Argumenter ➔ Afslutning.
                        </p>
                    </div>
                    <div style="display: flex; gap: 0.3rem;">
                        <button id="btn-mode-anatomi" class="opbygning-subnav-btn ${byggeklodsMode === 'anatomi' ? 'active' : ''}">
                            👁️ Tekstens anatomi
                        </button>
                        <button id="btn-mode-traening" class="opbygning-subnav-btn ${byggeklodsMode === 'traening' ? 'active' : ''}">
                            🎨 Farvelæg selv
                        </button>
                    </div>
                </div>
            </div>

            <div id="byggeklods-content"></div>
        `;

        container.querySelector('#btn-mode-anatomi').onclick = () => {
            byggeklodsMode = 'anatomi';
            renderOpbygningModelB(container, currentEx, state, parent);
        };
        container.querySelector('#btn-mode-traening').onclick = () => {
            byggeklodsMode = 'traening';
            renderOpbygningModelB(container, currentEx, state, parent);
        };

        const contentDiv = container.querySelector('#byggeklods-content');

        if (byggeklodsMode === 'anatomi') {
            // Anatomi Oversigt: The 4 distinct functional blocks
            contentDiv.innerHTML = `
                ${currentEx.categories.map(cat => {
                    const strips = currentEx.data.filter(s => cat.strips.includes(s.id));
                    return `
                        <div class="byggeklods-block" style="border-left-color: ${cat.color};">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
                                <div>
                                    <span style="font-weight: 800; color: ${cat.color}; font-size: 0.95rem;">${cat.label}</span>
                                    <span style="color: #94a3b8; font-size: 0.8rem; margin-left: 0.35rem;">(${cat.desc})</span>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                                ${strips.map(s => `
                                    <div style="background: rgba(15, 23, 42, 0.6); padding: 0.5rem 0.65rem; border-radius: 8px;">
                                        <div style="display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.2rem;">
                                            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700;">Strimmel ${s.id}:</span>
                                            <span style="font-size: 0.72rem; color: ${cat.color}; font-weight: 700;">${s.connector}</span>
                                            <span style="font-size: 0.72rem; color: #64748b;">• ${s.roleDesc}</span>
                                        </div>
                                        <div style="color: #f8fafc; font-size: 0.9rem; line-height: 1.4;">${s.text}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            `;
        } else {
            // Farvelæg selv: Interactive categorization
            contentDiv.innerHTML = `
                <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 0.65rem 0.8rem; margin-bottom: 0.65rem;">
                    <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.35rem; font-weight: 700;">4 farvekoder:</div>
                    <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                        ${currentEx.categories.map(cat => `
                            <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid ${cat.color}; color: ${cat.color}; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">
                                ${cat.label}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <div id="traening-strips-list" style="margin-bottom: 0.75rem;"></div>

                <div id="traening-feedback" style="display: none; padding: 0.65rem 0.85rem; border-radius: 8px; margin-bottom: 0.75rem; text-align: center;"></div>

                <div style="display: flex; gap: 0.4rem; justify-content: center;">
                    <button id="btn-check-colors" class="action-btn-primary" style="padding: 0.45rem 1rem;">
                        ✓ Tjek farvekoder
                    </button>
                    <button id="btn-reset-colors" class="opbygning-subnav-btn" style="padding: 0.45rem 0.85rem;">
                        🔄 Nulstil
                    </button>
                </div>
            `;

            const listEl = contentDiv.querySelector('#traening-strips-list');
            const feedEl = contentDiv.querySelector('#traening-feedback');

            function updateTraeningList() {
                listEl.innerHTML = '';
                currentEx.data.forEach(strip => {
                    const userCat = state.userCatSelections[strip.id];
                    const isRight = state.userCatChecked && (userCat === strip.category);
                    const isFault = state.userCatChecked && (userCat !== strip.category);

                    const card = document.createElement('div');
                    card.className = `opbygning-card ${isRight ? 'is-correct' : ''} ${isFault ? 'is-wrong' : ''}`;
                    card.style.borderColor = userCat ? (currentEx.categories.find(c => c.id === userCat)?.color || 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.1)';

                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 0.3rem;">
                            <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 700;">Strimmel ${strip.id}</span>
                            <div style="display: flex; gap: 0.25rem;">
                                ${currentEx.categories.map(cat => `
                                    <button class="cat-select-btn" data-cat="${cat.id}" style="
                                        background: ${userCat === cat.id ? cat.color : '#334155'};
                                        color: ${userCat === cat.id ? '#ffffff' : '#cbd5e1'};
                                        border: 1px solid ${cat.color};
                                        padding: 0.15rem 0.45rem;
                                        border-radius: 4px;
                                        font-size: 0.72rem;
                                        font-weight: 700;
                                        cursor: pointer;
                                    ">
                                        ${cat.id === 'indledning' ? '🔵 Indledning' : cat.id === 'handlinger' ? '🟢 Handlinger' : cat.id === 'argumenter' ? '🟠 Argumenter' : '🟣 Afslutning'}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div style="color: #f8fafc; font-size: 0.9rem; line-height: 1.4;">${strip.text}</div>
                    `;

                    card.querySelectorAll('.cat-select-btn').forEach(btn => {
                        btn.onclick = () => {
                            state.userCatSelections[strip.id] = btn.getAttribute('data-cat');
                            state.userCatChecked = false;
                            feedEl.style.display = 'none';
                            updateTraeningList();
                        };
                    });

                    listEl.appendChild(card);
                });
            }

            updateTraeningList();

            contentDiv.querySelector('#btn-check-colors').onclick = () => {
                state.userCatChecked = true;
                let correctCount = 0;
                currentEx.data.forEach(s => {
                    if (state.userCatSelections[s.id] === s.category) correctCount++;
                });

                feedEl.style.display = 'block';
                if (correctCount === 9) {
                    feedEl.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedEl.style.border = '1px solid #22c55e';
                    feedEl.style.color = '#4ade80';
                    feedEl.innerHTML = `✓ <strong>Perfekt!</strong> Alle 9 strimler er placeret i deres rigtige byggeklods.`;
                } else {
                    feedEl.style.background = 'rgba(245, 158, 11, 0.15)';
                    feedEl.style.border = '1px solid #f59e0b';
                    feedEl.style.color = '#fbbf24';
                    feedEl.innerHTML = `${correctCount} af 9 rigtige. Tjek om strimlen hører til <em>Hilsen</em>, <em>Handlinger</em>, <em>Argumenter</em> eller <em>Afslutning</em>.`;
                }
                updateTraeningList();
            };

            contentDiv.querySelector('#btn-reset-colors').onclick = () => {
                state.userCatSelections = {};
                state.userCatChecked = false;
                feedEl.style.display = 'none';
                updateTraeningList();
            };
        }
    }

    // --- Sub-view: Klippeark (Print) ---
    function renderOpbygningKlippeark(container, currentEx) {
        container.innerHTML = `
            <div class="no-print" style="background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0.85rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <h2 style="font-size: 1.15rem; font-weight: 800; color: #f8fafc; margin: 0;">
                        Klippeark til parøvelse – ${currentEx.title}
                    </h2>
                    <p style="margin: 0.15rem 0 0; color: #94a3b8; font-size: 0.82rem;">
                        Print arket og klip strimlerne ud langs de stiplede linjer.
                    </p>
                </div>
                <button id="btn-print-sheet" class="action-btn-primary" style="padding: 0.45rem 1rem;">
                    🖨️ Udskriv klippeark
                </button>
            </div>

            <div class="print-area" style="background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; padding: 1rem; color: #f8fafc;">
                <div style="border-bottom: 2px solid #38bdf8; padding-bottom: 0.5rem; margin-bottom: 0.8rem;">
                    <div style="font-size: 1.1rem; font-weight: 800; color: #38bdf8;">
                        Model A: "Det argumenterende puslespil" – ${currentEx.title}
                    </div>
                    <div style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.2rem; font-style: italic;">
                        Instruks til læreren: Kursisterne arbejder sammen i par om at genskabe den rigtige rækkefølge ud fra tekstens logiske opbygning.
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.4rem; font-family: monospace;">
                    ${currentEx.data.map(strip => `
                        <div>
                            <div style="color: #64748b; font-size: 0.8rem; letter-spacing: 2px;">
                                ✂️ ----------------------------------------------------------------------------------
                            </div>
                            <div style="background: rgba(30, 41, 59, 0.7); border: 1px dashed rgba(255, 255, 255, 0.2); padding: 0.55rem 0.75rem; border-radius: 6px; margin: 0.2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                <span style="font-weight: 800; color: #38bdf8; font-size: 0.85rem;">[ STRIMMEL ${strip.id} ]</span>
                                <span style="color: #f8fafc; font-size: 0.92rem; margin-left: 0.4rem;">${strip.text}</span>
                            </div>
                        </div>
                    `).join('')}
                    <div style="color: #64748b; font-size: 0.8rem; letter-spacing: 2px;">
                        ✂️ ----------------------------------------------------------------------------------
                    </div>
                </div>
            </div>
        `;

        container.querySelector('#btn-print-sheet').onclick = () => {
            window.print();
        };
    }

    // Initialize View
    switchTab(currentTab);
    container.appendChild(viewContainer);
}
