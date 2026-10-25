import { getTranslation, getLang, appState } from '../utils/i18n.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';

export function renderAdverbBridgeView(container, navigateFn, extraData = {}) {
    // -------------------------------------------------------------
    // KORPUS & STATUS: Akkumuleret grammatik-tilstand fra trin 1-3
    // -------------------------------------------------------------
    const state = {
        nounAnchor: extraData.nounAnchor || 'Mit',
        selectedNoun: extraData.selectedNoun || 'barn',
        selectedAdjective: extraData.selectedAdjective || extraData.adjectivePart || 'lille',
        adjectiveForm: extraData.adjectiveForm || 'definite',
        selectedModal: extraData.selectedModal || 'skal',
        verbAnchor: extraData.verbAnchor || 'spiser',
        selectedVerb: extraData.selectedVerb || 'spise',
        isPast: extraData.isPast || false,
        selectedAdverb: extraData.selectedAdverb || 'langsomt'
    };

    // Tilstand for om det klæbende animationsvindue er foldet sammen
    let isStageCollapsed = false;

    // -------------------------------------------------------------
    // TALE-SYNTHESE (TTS)
    // -------------------------------------------------------------
    function speakDanish(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // -------------------------------------------------------------
    // ADVERBIE-DATABASE MED KOGNITIVE ROLLER & ANIMATIONSEFFEKTER
    // -------------------------------------------------------------
    const ADVERBS = {
        'langsomt': {
            id: 'langsomt',
            word: 'langsomt',
            category: 'maade',
            categoryTitle: 'Mådesadverbium (Hvordan?)',
            tag: 'Måde (tempo)',
            icon: '🐢',
            color: '#38bdf8',
            colorGlow: 'rgba(56, 189, 248, 0.45)',
            badge: 'Roligt tempo (langsomt)',
            desc: 'Handlingen foregår med tålmodighed, ro og uden hastværk.',
            ruleNote: 'Dannes af adjektivet <em>langsom</em> + endelsen <strong>-t</strong>.',
            isCentral: false
        },
        'hurtigt': {
            id: 'hurtigt',
            word: 'hurtigt',
            category: 'maade',
            categoryTitle: 'Mådesadverbium (Hvordan?)',
            tag: 'Måde (høj fart)',
            icon: '⚡',
            color: '#22c55e',
            colorGlow: 'rgba(34, 197, 94, 0.5)',
            badge: 'Høj fart & energi (hurtigt)',
            desc: 'Handlingen accelererer med hurtige bevægelser og fremdrift.',
            ruleNote: 'Dannes af adjektivet <em>hurtig</em> + endelsen <strong>-t</strong>.',
            isCentral: false
        },
        'pænt': {
            id: 'pænt',
            word: 'pænt',
            category: 'maade',
            categoryTitle: 'Mådesadverbium (Hvordan?)',
            tag: 'Måde (adfærd)',
            icon: '✨',
            color: '#ec4899',
            colorGlow: 'rgba(236, 72, 153, 0.45)',
            badge: 'Gode manerer & orden (pænt)',
            desc: 'Handlingen udføres ordentligt, høfligt og nydeligt ved bordet.',
            ruleNote: 'Dannes af adjektivet <em>pæn</em> + endelsen <strong>-t</strong>.',
            isCentral: false
        },
        'meget': {
            id: 'meget',
            word: 'meget',
            category: 'grad',
            categoryTitle: 'Gradsadverbium (Hvor meget?)',
            tag: 'Grad (høj styrke)',
            icon: '🔥',
            color: '#f59e0b',
            colorGlow: 'rgba(245, 158, 11, 0.5)',
            badge: 'Høj intensitet & mængde (meget)',
            desc: 'Skruer helt op for handlingens styrke, appetit og volumen.',
            ruleNote: 'Gradsadverbium der forstærker handlingens intensitet.',
            isCentral: false
        },
        'lidt': {
            id: 'lidt',
            word: 'lidt',
            category: 'grad',
            categoryTitle: 'Gradsadverbium (Hvor meget?)',
            tag: 'Grad (dæmpet)',
            icon: '💧',
            color: '#a855f7',
            colorGlow: 'rgba(168, 85, 247, 0.45)',
            badge: 'Lille mængde & forsigtighed (lidt)',
            desc: 'En beskeden, tilbageholdende og dæmpet mængde af handlingen.',
            ruleNote: 'Gradsadverbium der dæmper verbets kraft.',
            isCentral: false
        },
        'ikke': {
            id: 'ikke',
            word: 'ikke',
            category: 'central',
            categoryTitle: 'Centraladverbium (Nægtelse)',
            tag: 'Centraladverbium',
            icon: '🛑',
            color: '#ef4444',
            colorGlow: 'rgba(239, 68, 68, 0.55)',
            badge: 'Nægtelse / Afvisning (ikke)',
            desc: 'Benægter handlingen totalt. Handlingen afbrydes eller finder ikke sted!',
            ruleNote: 'Benægter handlingen totalt (sætningens betydning vendes om).',
            isCentral: true
        },
        'gerne': {
            id: 'gerne',
            word: 'gerne',
            category: 'central',
            categoryTitle: 'Centraladverbium (Holdning & Lyst)',
            tag: 'Central (vilje)',
            icon: '💖',
            color: '#fb7185',
            colorGlow: 'rgba(251, 113, 133, 0.5)',
            badge: 'Lyst & personlig vilje (gerne)',
            desc: 'Udtrykker en positiv holdning, velvilje og lyst til handlingen.',
            ruleNote: 'Udtrykker positiv holdning og velvilje (at gøre noget med glæde).',
            isCentral: true
        },
        'nu': {
            id: 'nu',
            word: 'nu',
            category: 'tid',
            categoryTitle: 'Tidsadverbium (Hvornår?)',
            tag: 'Tid (i dette nu)',
            icon: '⏰',
            color: '#10b981',
            colorGlow: 'rgba(16, 185, 129, 0.45)',
            badge: 'Tidsanker i øjeblikket (nu)',
            desc: 'Forankrer handlingen præcist i dette nuværende sekund.',
            ruleNote: 'Tidsadverbium der svarer på "hvornår sker handlingen?".',
            isCentral: false
        }
    };

    function getActiveAdverb() {
        return ADVERBS[state.selectedAdverb] || ADVERBS['langsomt'];
    }

    // Saml hele den akkumulerede sætning med korrekt ordstilling
    function getFullSentence() {
        const adv = getActiveAdverb();
        const modal = state.selectedModal;
        const verb = state.selectedVerb;
        const subj = `${state.nounAnchor} ${state.selectedAdjective} ${state.selectedNoun}`;

        if (adv.isCentral) {
            // Centraladverbium placeres på 3. pladsen lige efter V1
            if (modal) {
                return `${subj} ${modal} ${adv.word} ${verb}.`;
            } else {
                return `${subj} ${state.verbAnchor} ${adv.word}.`;
            }
        } else {
            // Mådes-, grads- eller tidsadverbium placeres efter verbet
            if (modal) {
                return `${subj} ${modal} ${verb} ${adv.word}.`;
            } else {
                return `${subj} ${state.verbAnchor} ${adv.word}.`;
            }
        }
    }

    // =============================================================
    // HOVED-LAYOUT (100% MOBIL-SIKKERT)
    // =============================================================
    container.innerHTML = '';
    const viewContainer = document.createElement('div');
    viewContainer.className = 'adverb-mobile-view animate-in';

    // Top-bar med tilbage-knap
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-back-nav';
    backBtn.innerHTML = '← Tilbage til Adjektiver';
    backBtn.onclick = () => {
        navigateFn('adjective_bridge', {
            nounAnchor: state.nounAnchor,
            selectedNoun: state.selectedNoun,
            selectedAdjective: state.selectedAdjective,
            adjectiveForm: state.adjectiveForm,
            selectedModal: state.selectedModal,
            verbAnchor: state.verbAnchor,
            selectedVerb: state.selectedVerb,
            isPast: state.isPast
        });
    };
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Fælles grammatik-menu
    viewContainer.appendChild(renderGrammarMenu('adverbier', navigateFn));

    // Hero Header
    const heroHeader = document.createElement('div');
    heroHeader.className = 'adverb-hero-compact';
    heroHeader.innerHTML = `
        <h1 class="adverb-main-title">${getTranslation('adverbTitle') || 'Hvordan beskriver vi en handling?'}</h1>
        <p class="adverb-subtitle">
            Hvor adjektiver maler <strong>tingen</strong> (<em>det ${state.selectedAdjective} barn</em>), er adverbiet 
            en <strong>projektør</strong>, der kaster lys over <strong>selve handlingen</strong> (<em>hvordan barnet spiser</em>).
        </p>
    `;
    viewContainer.appendChild(heroHeader);

    // =============================================================
    // KOGNITIV SCENE-KORT (PROJEKTØREN & HANDLINGS-BØLGERNE)
    // =============================================================
    const stageCard = document.createElement('div');
    stageCard.className = 'adverb-stage-card';
    viewContainer.appendChild(stageCard);

    // =============================================================
    // INTERAKTIONS-OMRÅDE: ADVERBIE-LAB & DIDAKTISKE KORT
    // =============================================================
    const taskArea = document.createElement('div');
    taskArea.className = 'adverb-task-area';
    viewContainer.appendChild(taskArea);

    // -------------------------------------------------------------
    // RENDER: DEN KOGNITIVE PROJEKTØR-SCENE (SVG 360 x 132)
    // -------------------------------------------------------------
    function renderStage() {
        const adv = getActiveAdverb();
        const activeColor = adv.color;

        let dynamicActionOverlay = '';

        if (adv.id === 'langsomt') {
            dynamicActionOverlay = `
                <!-- LANGSOMT: Brede, blide cyan bølger der svajer i roligt tempo -->
                <g class="wave-slow-group">
                    <path d="M 112 58 Q 186 42 248 58" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="10 6" opacity="0.85">
                        <animate attributeName="stroke-dashoffset" from="32" to="0" dur="3s" repeatCount="infinite" />
                        <animate attributeName="d" values="M 112 58 Q 186 42 248 58; M 112 58 Q 186 52 248 58; M 112 58 Q 186 42 248 58" dur="3.4s" repeatCount="infinite" />
                    </path>
                    <path d="M 112 66 Q 186 52 248 66" stroke="#0284c7" stroke-width="2" fill="none" opacity="0.6">
                        <animate attributeName="d" values="M 112 66 Q 186 52 248 66; M 112 66 Q 186 62 248 66; M 112 66 Q 186 52 248 66" dur="3.8s" repeatCount="infinite" />
                    </path>
                    <!-- Rolige partikler -->
                    <circle cx="178" cy="52" r="3" fill="#7dd3fc">
                        <animate attributeName="cx" values="120; 240; 120" dur="4s" repeatCount="infinite" />
                        <animate attributeName="opacity" values="0.3; 1; 0.3" dur="4s" repeatCount="infinite" />
                    </circle>
                </g>
            `;
        } else if (adv.id === 'hurtigt') {
            dynamicActionOverlay = `
                <!-- HURTIGT: Højfrekvente grønne zigzag/fart-linjer og hurtige vindstriber -->
                <g class="wave-fast-group">
                    <path d="M 108 56 Q 140 40 170 56 T 230 56 T 252 56" stroke="#22c55e" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-dasharray="8 4">
                        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.55s" repeatCount="infinite" />
                    </path>
                    <!-- Fartstriber over bordet -->
                    <line x1="220" y1="44" x2="276" y2="44" stroke="#4ade80" stroke-width="2" stroke-linecap="round">
                        <animate attributeName="x1" values="210; 235; 210" dur="0.45s" repeatCount="infinite" />
                        <animate attributeName="x2" values="260; 288; 260" dur="0.45s" repeatCount="infinite" />
                    </line>
                    <line x1="226" y1="52" x2="284" y2="52" stroke="#86efac" stroke-width="2.5" stroke-linecap="round">
                        <animate attributeName="x1" values="215; 240; 215" dur="0.4s" begin="0.1s" repeatCount="infinite" />
                        <animate attributeName="x2" values="265; 295; 265" dur="0.4s" begin="0.1s" repeatCount="infinite" />
                    </line>
                    <line x1="222" y1="60" x2="274" y2="60" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round">
                        <animate attributeName="x1" values="212; 236; 212" dur="0.5s" begin="0.2s" repeatCount="infinite" />
                    </line>
                </g>
            `;
        } else if (adv.id === 'pænt') {
            dynamicActionOverlay = `
                <!-- PÆNT: Glitrende stjerner og harmoniske lysreflekser over tallerkenen -->
                <g class="sparkle-group">
                    <path d="M 112 60 Q 185 45 250 60" stroke="#ec4899" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="6 4">
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="infinite" />
                    </path>
                    <!-- Glitrende 4-takkede stjerner -->
                    <g transform="translate(242, 38)">
                        <polygon points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="#f472b6">
                            <animate attributeName="transform" type="scale" values="0.7; 1.3; 0.7" dur="1.4s" repeatCount="infinite"/>
                        </polygon>
                    </g>
                    <g transform="translate(276, 32)">
                        <polygon points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5" fill="#fbcfe8">
                            <animate attributeName="transform" type="scale" values="1.2; 0.6; 1.2" dur="1.6s" begin="0.3s" repeatCount="infinite"/>
                        </polygon>
                    </g>
                    <g transform="translate(258, 24)">
                        <polygon points="0,-4 1,-1 4,0 1,1 0,4 -1,1 -4,0 -1,-1" fill="#f472b6">
                            <animate attributeName="transform" type="scale" values="0.8; 1.4; 0.8" dur="1.8s" begin="0.6s" repeatCount="infinite"/>
                        </polygon>
                    </g>
                </g>
            `;
        } else if (adv.id === 'meget') {
            dynamicActionOverlay = `
                <!-- MEGET: Kraftige, ekspanderende amber energiringe fra handlingen -->
                <g class="power-burst-group">
                    <line x1="112" y1="62" x2="246" y2="62" stroke="#f59e0b" stroke-width="4" stroke-dasharray="12 6" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" from="36" to="0" dur="0.8s" repeatCount="infinite" />
                    </line>
                    <!-- Ekspanderende intensitets-ringe ved maden -->
                    <ellipse cx="258" cy="62" rx="14" ry="10" fill="none" stroke="#fbbf24" stroke-width="2.5">
                        <animate attributeName="rx" values="12; 38; 12" dur="1.4s" repeatCount="infinite"/>
                        <animate attributeName="ry" values="8; 24; 8" dur="1.4s" repeatCount="infinite"/>
                        <animate attributeName="opacity" values="0.9; 0.1; 0.9" dur="1.4s" repeatCount="infinite"/>
                    </ellipse>
                    <ellipse cx="258" cy="62" rx="20" ry="14" fill="none" stroke="#f59e0b" stroke-width="1.8">
                        <animate attributeName="rx" values="18; 46; 18" dur="1.4s" begin="0.4s" repeatCount="infinite"/>
                        <animate attributeName="ry" values="12; 30; 12" dur="1.4s" begin="0.4s" repeatCount="infinite"/>
                        <animate attributeName="opacity" values="0.8; 0.05; 0.8" dur="1.4s" begin="0.4s" repeatCount="infinite"/>
                    </ellipse>
                </g>
            `;
        } else if (adv.id === 'lidt') {
            dynamicActionOverlay = `
                <!-- LIDT: Fine, delikate lilla mikrobølger med svag dæmpet amplitude -->
                <g class="subtle-micro-group">
                    <path d="M 112 62 Q 185 58 248 62" stroke="#a855f7" stroke-width="2" fill="none" stroke-dasharray="4 6" opacity="0.6">
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.8s" repeatCount="infinite" />
                    </path>
                    <circle cx="258" cy="62" r="8" fill="none" stroke="#c084fc" stroke-width="1.2">
                        <animate attributeName="r" values="6; 14; 6" dur="2s" repeatCount="infinite"/>
                        <animate attributeName="opacity" values="0.7; 0.15; 0.7" dur="2s" repeatCount="infinite"/>
                    </circle>
                </g>
            `;
        } else if (adv.id === 'ikke') {
            dynamicActionOverlay = `
                <!-- IKKE: Rød stop-barriere der afskærer handlingen -->
                <g class="negation-barrier-group" transform="translate(195, 42)">
                    <!-- Lodret spærrelinje -->
                    <line x1="0" y1="0" x2="0" y2="46" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8 4">
                        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.9s" repeatCount="infinite" />
                    </line>
                    <!-- Stopskilt / forbudsskilt i midten -->
                    <circle cx="0" cy="23" r="13" fill="#ef4444" stroke="#ffffff" stroke-width="2">
                        <animate attributeName="r" values="12; 15; 12" dur="1.2s" repeatCount="infinite"/>
                    </circle>
                    <line x1="-7" y1="23" x2="7" y2="23" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    <!-- Afvisende advarsels-bølger -->
                    <path d="M 10 13 Q 18 23 10 33" stroke="#f87171" stroke-width="2.5" fill="none" stroke-linecap="round">
                        <animate attributeName="opacity" values="0.3; 1; 0.3" dur="0.8s" repeatCount="infinite"/>
                    </path>
                </g>
            `;
        } else if (adv.id === 'gerne') {
            dynamicActionOverlay = `
                <!-- GERNE: Pulserende hjerte-partikler og velvilje-stråler mod maden -->
                <g class="warm-intent-group">
                    <path d="M 112 60 Q 185 40 248 60" stroke="#fb7185" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="10 6">
                        <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="infinite" />
                    </path>
                    <g transform="translate(182, 44)">
                        <circle cx="0" cy="0" r="7" fill="#f43f5e">
                            <animate attributeName="r" values="6; 9; 6" dur="1.1s" repeatCount="infinite"/>
                        </circle>
                        <text x="0" y="4" font-size="10" text-anchor="middle">❤️</text>
                    </g>
                </g>
            `;
        } else if (adv.id === 'nu') {
            dynamicActionOverlay = `
                <!-- NU: Tidsfokus i dette øjeblik -->
                <g class="instant-clock-group" transform="translate(258, 25)">
                    <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#10b981" stroke-width="2">
                        <animate attributeName="r" values="9; 12; 9" dur="1.5s" repeatCount="infinite"/>
                    </circle>
                    <line x1="0" y1="0" x2="0" y2="-5" stroke="#34d399" stroke-width="2" stroke-linecap="round"/>
                    <line x1="0" y1="0" x2="4" y2="0" stroke="#34d399" stroke-width="1.8" stroke-linecap="round"/>
                </g>
            `;
        }

        stageCard.innerHTML = `
            <div class="stage-frame-wrapper" style="--adv-accent: ${activeColor};">
                <!-- SVG SCENE (360x146) -->
                <div class="stage-svg-body">
                    <svg class="adverb-svg-fluid" viewBox="0 0 360 146" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="advSpaceGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#0b1329"/>
                                <stop offset="70%" stop-color="#1e293b"/>
                                <stop offset="100%" stop-color="#0f172a"/>
                            </linearGradient>
                            <linearGradient id="advGrassGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#15803d"/>
                                <stop offset="100%" stop-color="#14532d"/>
                            </linearGradient>
                            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="${activeColor}" stop-opacity="0.6"/>
                                <stop offset="60%" stop-color="${activeColor}" stop-opacity="0.25"/>
                                <stop offset="100%" stop-color="${activeColor}" stop-opacity="0.05"/>
                            </linearGradient>
                            <filter id="advGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                            </filter>
                        </defs>

                        <!-- Himmelbaggrund -->
                        <rect x="0" y="0" width="360" height="146" rx="12" fill="url(#advSpaceGrad)"/>

                        <!-- Jorden / terræn -->
                        <rect x="0" y="94" width="360" height="52" rx="0 0 12 12" fill="url(#advGrassGrad)"/>
                        <line x1="0" y1="94" x2="360" y2="94" stroke="#4ade80" stroke-width="1.5" opacity="0.6"/>

                        <!-- PROJEKTØRENS LYSKEGLE DER BELYSER HANDLINGEN -->
                        <polygon points="252,18 264,18 304,94 212,94" fill="url(#beamGrad)">
                            <animate attributeName="opacity" values="0.75; 1; 0.75" dur="2s" repeatCount="infinite"/>
                        </polygon>

                        <!-- PROJEKTØR-LAMPE I LOFTET/TOPPEN -->
                        <g class="projector-fixture" transform="translate(258, 14)">
                            <!-- Ophæng -->
                            <line x1="0" y1="-14" x2="0" y2="0" stroke="#64748b" stroke-width="2"/>
                            <!-- Lampehus -->
                            <path d="M -14 0 L 14 0 L 10 8 L -10 8 Z" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
                            <!-- Glødende pære med adverbiets farve -->
                            <ellipse cx="0" cy="8" rx="8" ry="3.5" fill="${activeColor}" filter="url(#advGlow)">
                                <animate attributeName="rx" values="7.5; 9.5; 7.5" dur="1.6s" repeatCount="infinite"/>
                            </ellipse>
                            <text x="0" y="-3" font-size="7.5" fill="#94a3b8" font-weight="800" text-anchor="middle">PROJEKTØR</text>
                        </g>

                        <!-- DYNAMISKE KRAFT- OG BØLGEEFFEKTER -->
                        ${dynamicActionOverlay}

                        <!-- AGENS / SUBJEKT: Barnet (med adjektiv påført) -->
                        <g class="agent-character" transform="translate(86, 36)">
                            <!-- Hoved -->
                            <circle cx="0" cy="11" r="7.5" fill="#f8fafc"/>
                            <!-- Krop (med adjektiv-farvet trøje) -->
                            <path d="M -7 21 Q 0 18 7 21 L 8 42 L -8 42 Z" fill="#0284c7" rx="3"/>
                            <!-- Ben til jorden (y=94, så 36 + 58 = 94) -->
                            <line x1="-4" y1="42" x2="-4" y2="58" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                            <line x1="4" y1="42" x2="4" y2="58" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                            
                            <!-- Navnemærke-boks på jorden (TILPASSET OG TYDELIG) -->
                            <g class="character-label-pill" transform="translate(0, 64)">
                                <rect x="-60" y="0" width="120" height="30" rx="8" fill="rgba(15, 23, 42, 0.92)" stroke="#38bdf8" stroke-width="1.2"/>
                                <text x="0" y="14" fill="#ffffff" font-size="10.8" font-weight="900" text-anchor="middle">
                                    ${state.nounAnchor} ${state.selectedAdjective} ${state.selectedNoun}
                                </text>
                                <text x="0" y="24" fill="#93c5fd" font-size="7.5" font-weight="700" text-anchor="middle">
                                    Subjekt
                                </text>
                            </g>
                        </g>

                        <!-- MÅLET / HANDLINGEN: "spise" ved bordet under projektøren -->
                        <g class="target-action" transform="translate(258, 36)">
                            <!-- Bord -->
                            <rect x="-18" y="34" width="36" height="12" rx="2" fill="#78350f" stroke="#b45309" stroke-width="1"/>
                            <line x1="-12" y1="46" x2="-12" y2="58" stroke="#78350f" stroke-width="2.5"/>
                            <line x1="12" y1="46" x2="12" y2="58" stroke="#78350f" stroke-width="2.5"/>
                            
                            <!-- Tallerken -->
                            <ellipse cx="0" cy="33" rx="14" ry="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
                            <!-- Mad -->
                            <circle cx="0" cy="31" r="4.5" fill="#f59e0b"/>
                            
                            <!-- Damp fra maden med levende opdrift -->
                            <path d="M -3 25 Q -5 19 0 14" stroke="#fde68a" stroke-width="1.3" fill="none" opacity="0.8">
                                <animate attributeName="d" values="M -3 25 Q -5 19 0 14; M -3 25 Q -2 18 -4 13; M -3 25 Q -5 19 0 14" dur="2s" repeatCount="infinite"/>
                                <animate attributeName="opacity" values="0.4; 0.9; 0.4" dur="2s" repeatCount="infinite"/>
                            </path>
                            <path d="M 3 26 Q 5 20 1 15" stroke="#fde68a" stroke-width="1.3" fill="none" opacity="0.8">
                                <animate attributeName="d" values="M 3 26 Q 5 20 1 15; M 3 26 Q 2 19 4 14; M 3 26 Q 5 20 1 15" dur="2.3s" begin="0.4s" repeatCount="infinite"/>
                                <animate attributeName="opacity" values="0.3; 0.85; 0.3" dur="2.3s" begin="0.4s" repeatCount="infinite"/>
                            </path>

                            <!-- Handlings-mærkeboks på jorden (TILPASSET OG TYDELIG) -->
                            <g class="action-label-pill" transform="translate(0, 64)">
                                <rect x="-60" y="0" width="120" height="30" rx="8" fill="rgba(15, 23, 42, 0.92)" stroke="${activeColor}" stroke-width="1.2"/>
                                <text x="0" y="14" fill="#4ade80" font-size="12" font-weight="900" text-anchor="middle">
                                    ${state.selectedVerb}
                                </text>
                                <text x="0" y="24" fill="${activeColor}" font-size="8" font-weight="800" text-anchor="middle">
                                    modificeres: "${adv.word}"
                                </text>
                            </g>
                        </g>

                        <!-- Statusbadge i toppen mellem agens og projektør (INGEN KOLLISION) -->
                        <g class="stage-top-badge" transform="translate(152, 14)">
                            <rect x="-65" y="-9" width="130" height="20" rx="10" fill="rgba(15, 23, 42, 0.94)" stroke="${activeColor}" stroke-width="1.4">
                                <animate attributeName="stroke-opacity" values="0.6; 1; 0.6" dur="2s" repeatCount="infinite"/>
                            </rect>
                            <text x="0" y="4" fill="${activeColor}" font-size="8.8" font-weight="900" text-anchor="middle">
                                ${adv.icon} ${adv.word.toUpperCase()} · ${adv.tag}
                            </text>
                        </g>
                    </svg>
                </div>

                <!-- INTEGRERET LIVE SÆTNING I DEN KLÆBENDE BAR -->
                <div class="sticky-sentence-summary">
                    <span class="summary-prefix">Sætning:</span>
                    <span class="summary-phrase">"${getFullSentence()}"</span>
                </div>
            </div>
        `;

    }



    // -------------------------------------------------------------
    // RENDER: ADVERBIE-LABORATORIUM & FORKLARINGER
    // -------------------------------------------------------------
    function renderInteractionArea() {
        taskArea.innerHTML = '';
        const adv = getActiveAdverb();

        const box = document.createElement('div');
        box.className = 'adverb-controls-container animate-in';

        // Opbyg kort for de forskellige adverbier
        const adverbKeys = Object.keys(ADVERBS);

        box.innerHTML = `
            <!-- SEKTION: VÆLG ET ADVERBIUM -->
            <div class="controls-title-row">
                <span class="section-label">Vælg et adverbium for at belyse og ændre handlingen:</span>
            </div>

            <div class="adverb-categories-grid">
                <!-- 1. MÅDESADVERBIER -->
                <div class="category-group-header">
                    <span>🚀 Mådesadverbier (Hvordan spiser barnet?):</span>
                </div>
                <div class="adverb-cards-row">
                    ${['langsomt', 'hurtigt', 'pænt'].map(key => {
                        const a = ADVERBS[key];
                        const isActive = state.selectedAdverb === key;
                        return `
                            <button type="button" class="adverb-card-btn ${isActive ? 'active-card' : ''}" data-adv="${key}" style="--adv-accent: ${a.color};">
                                <div class="card-head">
                                    <span class="card-icon">${a.icon}</span>
                                    <span class="card-word">${a.word}</span>
                                </div>
                                <div class="card-badge" style="color: ${a.color};">${a.tag}</div>
                                <div class="card-desc">${a.desc}</div>
                            </button>
                        `;
                    }).join('')}
                </div>

                <!-- 2. GRADSADVERBIER -->
                <div class="category-group-header" style="margin-top: 0.6rem;">
                    <span>📊 Gradsadverbier (Hvor meget?):</span>
                </div>
                <div class="adverb-cards-row">
                    ${['meget', 'lidt'].map(key => {
                        const a = ADVERBS[key];
                        const isActive = state.selectedAdverb === key;
                        return `
                            <button type="button" class="adverb-card-btn ${isActive ? 'active-card' : ''}" data-adv="${key}" style="--adv-accent: ${a.color};">
                                <div class="card-head">
                                    <span class="card-icon">${a.icon}</span>
                                    <span class="card-word">${a.word}</span>
                                </div>
                                <div class="card-badge" style="color: ${a.color};">${a.tag}</div>
                                <div class="card-desc">${a.desc}</div>
                            </button>
                        `;
                    }).join('')}
                </div>

                <!-- 3. CENTRALADVERBIER -->
                <div class="category-group-header" style="margin-top: 0.6rem;">
                    <span>🛑 Centraladverbier (Holdning & Nægtelse):</span>
                </div>
                <div class="adverb-cards-row">
                    ${['ikke', 'gerne', 'nu'].map(key => {
                        const a = ADVERBS[key];
                        const isActive = state.selectedAdverb === key;
                        return `
                            <button type="button" class="adverb-card-btn ${isActive ? 'active-card' : ''}" data-adv="${key}" style="--adv-accent: ${a.color};">
                                <div class="card-head">
                                    <span class="card-icon">${a.icon}</span>
                                    <span class="card-word">${a.word}</span>
                                </div>
                                <div class="card-badge" style="color: ${a.color};">${a.tag}</div>
                                <div class="card-desc">${a.desc}</div>
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- DIDAKTISK KOGNITIV FORKLARINGS-KORT -->
            <div class="adverb-deep-expl-card">
                <div class="expl-header-row">
                    <span class="expl-icon-bulb">💡</span>
                    <h3 class="expl-title">Hvad er forskellen på et adjektiv og et adverbium?</h3>
                </div>
                <div class="expl-body-content">
                    <p style="margin: 0 0 0.65rem; line-height: 1.45;">
                        Mange forveksler adjektiver og adverbier, fordi de ofte ligner hinanden (f.eks. <em>langsom</em> vs. <em>langsomt</em>). Men kognitivt peger de på to helt forskellige ting:
                    </p>
                    <div class="comparison-boxes-grid">
                        <div class="comp-box box-adj">
                            <div class="comp-title">🎨 Adjektiver beskriver TINGEN</div>
                            <div class="comp-example">"Et <strong>langsomt</strong> tog"</div>
                            <div class="comp-note">Svarer på: <em>Hvilket</em> barn / tog? Bøjes efter køn og bestemthed (<em>stort</em> vs. <em>store</em>).</div>
                        </div>
                        <div class="comp-box box-adv">
                            <div class="comp-title">🔦 Adverbier belyser HANDLINGEN</div>
                            <div class="comp-example">"Toget kører <strong>langsomt</strong>"</div>
                            <div class="comp-note">Svarer på: <em>Hvordan</em> kører det? Får ofte et fast <strong>-t</strong>, men bøjes <strong>ALDRIG</strong> efter subjektets køn!</div>
                        </div>
                    </div>
                    <div class="rule-callout-banner">
                        <span class="rule-icon">📌</span>
                        <div class="rule-text">
                            <strong>Det valgte adverbium:</strong> ${adv.ruleNote}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ========================================================= -->
            <!-- NUVÆRENDE SÆTNING PÅ DETTE TRIN -->
            <!-- ========================================================= -->
            <div class="current-sentence-badge-box">
                <span class="cs-label">Din sætning nu:</span>
                <div class="cs-sentence-row">
                    ${adv.isCentral 
                        ? `<span class="cs-word tag-subjekt">${state.nounAnchor}</span> <span class="cs-word tag-adjektiv">${state.selectedAdjective}</span> <span class="cs-word tag-subjekt">${state.selectedNoun}</span> <span class="cs-word tag-verbum">${state.selectedModal || state.verbAnchor}</span> <span class="cs-word tag-adverbium">${adv.word}</span> <span class="cs-word tag-verbum">${state.selectedVerb}.</span>`
                        : `<span class="cs-word tag-subjekt">${state.nounAnchor}</span> <span class="cs-word tag-adjektiv">${state.selectedAdjective}</span> <span class="cs-word tag-subjekt">${state.selectedNoun}</span> <span class="cs-word tag-verbum">${state.selectedModal || state.verbAnchor}</span> <span class="cs-word tag-verbum">${state.selectedVerb}</span> <span class="cs-word tag-adverbium">${adv.word}.</span>`
                    }
                </div>
                <div class="cs-tags-legend">
                    <span class="legend-pill tag-subjekt-pill"><span class="legend-dot" style="background:#22c55e;"></span> Subjekt (Grøn)</span>
                    <span class="legend-pill tag-adjektiv-pill"><span class="legend-dot" style="background:#f97316;"></span> Adjektiv (Orange)</span>
                    <span class="legend-pill tag-verbum-pill"><span class="legend-dot" style="background:#ef4444;"></span> Verber (Rød)</span>
                    <span class="legend-pill tag-adverbium-pill"><span class="legend-dot" style="background:#eab308;"></span> Adverbium (Gul)</span>
                </div>
            </div>

            <!-- RELEVANT LINK TIL ORDSTILLINGSFLADEN: DEL 2 (CENTRALADVERBIER) -->
            <div class="ordstilling-bridge-link-card">
                <div class="obl-left">
                    <span class="obl-icon">📐</span>
                    <div class="obl-text">
                        <span class="obl-badge">Ordstilling</span>
                        <div class="obl-title">Centraladverbiets Plads (5 led)</div>
                        <div class="obl-desc">Lær hvordan centraladverbier som 'ikke', 'gerne' og 'altid' placeres i sætningsskemaet.</div>
                    </div>
                </div>
                <a href="#/${getLang()}/ordstilling_intro/part2" class="btn-goto-ordstilling" id="btn-link-ordstilling-adverb">
                    <span>Gå til Ordstilling (Del 2) ➔</span>
                </a>
            </div>

            <!-- GÅ VIDERE TIL TRIN 5 (KONJUNKTIONER) -->
            <div class="next-bridge-action-card">
                <h3 style="color: #fbbf24; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.35rem;">
                    Klar til sidste trin: Forbind sætninger med Konjunktioner
                </h3>
                <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.15rem; line-height: 1.45;">
                    Tag hele sætningen <strong>"${getFullSentence()}"</strong> med over på broen og lær, hvordan bindeord som <em>fordi</em>, <em>da</em>, <em>når</em> og <em>selvom</em> skaber flydende tekst.
                </p>
                <button type="button" class="btn-launch-conjunction" id="btn-goto-conjunctions">
                    <span>${getTranslation('nextStepAfterAdverb') || 'Fortsæt til Konjunktioner'} ➔</span>
                </button>

                <div style="margin-top: 1rem;">
                    <a href="javascript:void(0)" id="link-adverb-exercises" class="link-sub-practice">
                        <span>✍️ Træn flere adverbier i hverdagssituationer</span>
                    </a>
                </div>
            </div>
        `;

        // Klik på adverbium-kort
        box.querySelectorAll('.adverb-card-btn').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.dataset.adv;
                state.selectedAdverb = chosen;
                speakDanish(chosen);
                refreshUI();

                const frame = stageCard.querySelector('.stage-frame-wrapper');
                if (frame) {
                    frame.classList.add('pulse-stage-glow');
                    setTimeout(() => frame.classList.remove('pulse-stage-glow'), 600);
                }
            };
        });

        // Ordstilling link
        const btnOrdstilling = box.querySelector('#btn-link-ordstilling-adverb');
        if (btnOrdstilling) {
            btnOrdstilling.onclick = (e) => {
                e.preventDefault();
                navigateFn('ordstilling_intro', { subPath: 'part2' });
            };
        }

        // Gå til konjunktioner
        box.querySelector('#btn-goto-conjunctions').onclick = () => {
            navigateFn('conjunction_bridge', {
                nounAnchor: state.nounAnchor,
                selectedNoun: state.selectedNoun,
                selectedAdjective: state.selectedAdjective,
                adjectivePart: state.selectedAdjective,
                adjectiveForm: state.adjectiveForm,
                selectedModal: state.selectedModal,
                verbAnchor: state.verbAnchor,
                selectedVerb: state.selectedVerb,
                selectedAdverb: state.selectedAdverb,
                isPast: state.isPast
            });
        };

        // Træningslink
        const practiceLink = box.querySelector('#link-adverb-exercises');
        if (practiceLink) {
            practiceLink.onclick = () => {
                navigateFn('adverb_choice');
            };
        }

        taskArea.appendChild(box);
    }

    function refreshUI() {
        renderStage();
        renderInteractionArea();
    }

    refreshUI();

    // =============================================================
    // 100% MOBIL-SIKRE STYLES (INGEN VANDRET OVERFLOW)
    // =============================================================
    const oldStyles = document.getElementById('adverb-bridge-styles');
    if (oldStyles) oldStyles.remove();
    const oldMobile = document.getElementById('adverb-bridge-mobile-styles');
    if (oldMobile) oldMobile.remove();

    const style = document.createElement('style');
    style.id = 'adverb-bridge-mobile-styles';
    style.textContent = `
        .adverb-mobile-view {
            width: 100% !important;
            max-width: 760px !important;
            margin: 0 auto;
            padding: 0 0.2rem 3rem !important;
            box-sizing: border-box;
            color: #f8fafc;
        }

        .adverb-mobile-view .top-bar {
            margin-bottom: 0.35rem !important;
        }

        .adverb-mobile-view .grammar-nav-menu {
            margin-bottom: 0.5rem !important;
            padding: 0.25rem 0 !important;
        }

        /* Hero */
        .adverb-hero-compact {
            text-align: center;
            margin-bottom: 0.75rem;
            padding: 0 0.4rem;
            width: 100%;
            box-sizing: border-box;
        }
        .adverb-step-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid rgba(56, 189, 248, 0.35);
            padding: 0.2rem 0.65rem;
            border-radius: 9999px;
            font-size: 0.76rem;
            font-weight: 700;
            color: #38bdf8;
            margin-bottom: 0.35rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .badge-dot-live {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #38bdf8;
            box-shadow: 0 0 6px #38bdf8;
        }
        .adverb-main-title {
            font-size: 1.45rem;
            font-weight: 800;
            margin: 0 0 0.25rem;
            color: #ffffff;
            line-height: 1.25;
            word-wrap: break-word;
        }
        .adverb-subtitle {
            font-size: 0.9rem;
            color: #cbd5e1;
            margin: 0 auto;
            max-width: 600px;
            line-height: 1.4;
        }

        /* KLÆBENDE SCENE-RAMME (STICKY STAGE HUD) */
        .adverb-stage-card {
            position: -webkit-sticky;
            position: sticky;
            top: 0.5rem;
            z-index: 60;
            margin-bottom: 0.85rem;
            width: 100%;
            box-sizing: border-box;
        }
        .stage-frame-wrapper {
            position: relative;
            width: 100%;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 26px rgba(0, 0, 0, 0.6);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            background: #0f172a;
            transition: all 0.25s ease;
        }
        .stage-frame-wrapper.pulse-stage-glow {
            border-color: var(--adv-accent, #38bdf8) !important;
            box-shadow: 0 0 25px var(--adv-accent, rgba(56, 189, 248, 0.6)) !important;
        }

        .stage-sticky-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.35rem 0.65rem;
            background: rgba(15, 23, 42, 0.96);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            gap: 0.4rem;
        }
        .sticky-left-info {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            min-width: 0;
            flex: 1;
        }
        .sticky-lamp-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .sticky-status-title {
            font-size: 0.8rem;
            font-weight: 800;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .sticky-right-actions {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            flex-shrink: 0;
        }
        .btn-mini-audio, .btn-toggle-collapse {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.18);
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            transition: all 0.2s;
        }
        .btn-mini-audio:hover, .btn-toggle-collapse:hover {
            background: rgba(255, 255, 255, 0.16);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .stage-svg-body {
            width: 100%;
            max-height: 320px;
            overflow: hidden;
            transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
            opacity: 1;
        }
        .stage-frame-wrapper.is-collapsed .stage-svg-body {
            max-height: 0;
            opacity: 0;
        }

        .sticky-sentence-summary {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.35rem 0.65rem;
            background: rgba(0, 0, 0, 0.35);
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 0.88rem;
        }
        .summary-prefix {
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #94a3b8;
            flex-shrink: 0;
        }
        .summary-phrase {
            font-weight: 800;
            color: #fcd34d;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
        }

        .adverb-svg-fluid {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Sætningsbånd */
        .adverb-strip-card {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.75rem;
            margin-bottom: 1rem;
            width: 100%;
            box-sizing: border-box;
        }
        .strip-top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .strip-header-tag {
            font-size: 0.76rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            font-weight: 800;
        }
        .btn-tts-listen {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 0.2rem 0.6rem;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
        }
        .strip-blocks-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.55rem;
            width: 100%;
            box-sizing: border-box;
        }
        .strip-block {
            position: relative;
            padding: 0.65rem 0.5rem;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            box-sizing: border-box;
            min-height: 72px;
        }
        .block-num-pill {
            position: absolute;
            top: 5px;
            left: 7px;
            font-size: 0.65rem;
            font-weight: 900;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            color: #e2e8f0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
        }
        .block-subject {
            background: rgba(255, 255, 255, 0.05);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
        }
        .block-v1 {
            background: rgba(56, 189, 248, 0.1);
            border: 1.5px solid rgba(56, 189, 248, 0.35);
        }
        .block-v2 {
            background: rgba(34, 197, 94, 0.1);
            border: 1.5px solid rgba(34, 197, 94, 0.35);
        }
        .block-adverb {
            border: 2px solid #38bdf8;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }
        .pulse-block-glow {
            animation: blockGlow 2.5s ease-in-out infinite alternate;
        }
        @keyframes blockGlow {
            0% { transform: scale(1); filter: brightness(1); }
            100% { transform: scale(1.02); filter: brightness(1.2); }
        }
        .block-word {
            font-size: 1.05rem;
            font-weight: 900;
            color: #ffffff;
            white-space: normal;
            word-break: break-word;
            overflow-wrap: break-word;
            line-height: 1.25;
            text-align: center;
            max-width: 100%;
            margin-top: 0.35rem;
        }
        .block-role {
            font-size: 0.72rem;
            font-weight: 700;
            color: #94a3b8;
            margin-top: 0.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }

        /* Kontrolområde */
        .adverb-task-area {
            width: 100%;
            box-sizing: border-box;
        }
        .controls-title-row {
            margin-bottom: 0.5rem;
        }
        .section-label {
            font-size: 0.95rem;
            color: #e2e8f0;
            font-weight: 700;
        }

        .category-group-header {
            font-size: 0.82rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 0.4rem;
        }
        .adverb-cards-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.6rem;
            margin-bottom: 0.75rem;
            width: 100%;
            box-sizing: border-box;
        }

        .adverb-card-btn {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            padding: 0.7rem 0.6rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            width: 100%;
            box-sizing: border-box;
        }
        .adverb-card-btn:hover {
            border-color: var(--adv-accent);
            background: rgba(255, 255, 255, 0.05);
        }
        .adverb-card-btn.active-card {
            border-color: var(--adv-accent) !important;
            background: rgba(15, 23, 42, 0.95) !important;
            box-shadow: 0 0 16px var(--adv-accent);
            animation: advCardGlow 2.4s ease-in-out infinite alternate;
        }
        @keyframes advCardGlow {
            0% { box-shadow: 0 0 8px var(--adv-accent); transform: scale(1.005); }
            100% { box-shadow: 0 0 18px var(--adv-accent); transform: scale(1.02); }
        }
        .card-head {
            display: flex;
            align-items: center;
            gap: 0.35rem;
        }
        .card-icon {
            font-size: 1.25rem;
        }
        .card-word {
            font-size: 1.25rem;
            font-weight: 900;
            color: #ffffff;
        }
        .card-badge {
            font-size: 0.75rem;
            font-weight: 800;
        }
        .card-desc {
            font-size: 0.78rem;
            color: #94a3b8;
            line-height: 1.3;
            margin-top: 0.15rem;
        }

        /* Forklaringskort */
        .adverb-deep-expl-card {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 1rem;
            margin: 1rem 0 1.25rem;
            box-sizing: border-box;
        }
        .expl-header-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.65rem;
        }
        .expl-icon-bulb {
            font-size: 1.35rem;
        }
        .expl-title {
            font-size: 1rem;
            font-weight: 800;
            color: #38bdf8;
            margin: 0;
        }
        .comparison-boxes-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.6rem;
            margin-bottom: 0.75rem;
        }
        .comp-box {
            padding: 0.65rem 0.75rem;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .comp-box.box-adj {
            background: rgba(56, 189, 248, 0.08);
            border: 1px solid rgba(56, 189, 248, 0.25);
        }
        .comp-box.box-adv {
            background: rgba(34, 197, 94, 0.08);
            border: 1px solid rgba(34, 197, 94, 0.25);
        }
        .comp-title {
            font-size: 0.8rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.25rem;
        }
        .comp-example {
            font-size: 0.95rem;
            font-weight: 900;
            color: #fcd34d;
            margin-bottom: 0.25rem;
        }
        .comp-note {
            font-size: 0.78rem;
            color: #cbd5e1;
            line-height: 1.35;
        }
        .rule-callout-banner {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            background: rgba(251, 191, 36, 0.1);
            border-left: 3px solid #fbbf24;
            padding: 0.55rem 0.75rem;
            border-radius: 0 8px 8px 0;
            font-size: 0.85rem;
            color: #e2e8f0;
            line-height: 1.4;
        }

        /* Nuværende sætning boks & globale grammatik tags */
        .current-sentence-badge-box {
            background: rgba(15, 23, 42, 0.85);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            border-radius: 14px;
            padding: 1rem 1.25rem;
            margin: 1rem auto;
            max-width: 540px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
        }
        .cs-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #94a3b8;
            font-weight: 800;
        }
        .cs-sentence-row {
            font-size: 1.45rem;
            font-weight: 900;
            color: #ffffff;
            line-height: 1.35;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.4rem;
        }
        .tag-subjekt {
            color: #4ade80;
            background: rgba(34, 197, 94, 0.15);
            border-bottom: 2px solid #22c55e;
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
        }
        .tag-verbum {
            color: #f87171;
            background: rgba(239, 68, 68, 0.15);
            border-bottom: 2px solid #ef4444;
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
        }
        .tag-adjektiv {
            color: #fb923c;
            background: rgba(249, 115, 22, 0.15);
            border-bottom: 2px solid #f97316;
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
        }
        .tag-adverbium {
            color: #facc15;
            background: rgba(234, 179, 8, 0.15);
            border-bottom: 2px solid #eab308;
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
        }
        .tag-konjunktion {
            color: #38bdf8;
            background: rgba(6, 182, 212, 0.15);
            border-bottom: 2px solid #06b6d4;
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
        }
        .cs-tags-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-top: 0.35rem;
        }
        .legend-pill {
            font-size: 0.75rem;
            font-weight: 700;
            color: #cbd5e1;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.15rem 0.5rem;
            border-radius: 12px;
        }
        .legend-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
        }

        /* Action card for næste trin */
        .next-bridge-action-card {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(14, 165, 233, 0.06));
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 14px;
            padding: 1.25rem 1rem;
            text-align: center;
            box-sizing: border-box;
        }
        .btn-launch-conjunction {
            background: #38bdf8;
            color: #0f172a;
            border: none;
            padding: 0.85rem 1.6rem;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35);
            transition: all 0.2s;
        }
        .btn-launch-conjunction:hover {
            background: #7dd3fc;
            transform: scale(1.02);
        }
        .link-sub-practice {
            color: #94a3b8;
            font-size: 0.88rem;
            font-weight: 600;
            text-decoration: underline;
            cursor: pointer;
        }
        .link-sub-practice:hover {
            color: #38bdf8;
        }

        /* Ordstilling Bridge Link Card */
        .ordstilling-bridge-link-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 12px;
            padding: 0.9rem 1.15rem;
            margin: 1.1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            box-sizing: border-box;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
            transition: all 0.2s ease;
        }
        .ordstilling-bridge-link-card:hover {
            border-color: rgba(56, 189, 248, 0.6);
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(56, 189, 248, 0.15);
        }
        .obl-left {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            flex: 1;
            min-width: 0;
        }
        .obl-icon {
            font-size: 1.6rem;
            line-height: 1;
            flex-shrink: 0;
        }
        .obl-text {
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            min-width: 0;
        }
        .obl-badge {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            color: #38bdf8;
            letter-spacing: 0.06em;
        }
        .obl-title {
            font-size: 0.98rem;
            font-weight: 800;
            color: #f8fafc;
            line-height: 1.25;
        }
        .obl-desc {
            font-size: 0.82rem;
            color: #94a3b8;
            line-height: 1.35;
        }
        .btn-goto-ordstilling {
            background: rgba(56, 189, 248, 0.15);
            border: 1.5px solid #38bdf8;
            color: #38bdf8;
            padding: 0.6rem 1rem;
            border-radius: 8px;
            font-size: 0.88rem;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s ease;
            flex-shrink: 0;
            text-decoration: none;
        }
        .btn-goto-ordstilling:hover {
            background: #38bdf8;
            color: #0f172a;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
        }
        @media (max-width: 600px) {
            .ordstilling-bridge-link-card {
                flex-direction: column;
                align-items: stretch;
                text-align: left;
                gap: 0.85rem;
                padding: 0.85rem 1rem;
            }
            .btn-goto-ordstilling {
                justify-content: center;
                width: 100%;
            }
        }

        @media (max-width: 640px) {
            .adverb-mobile-view { padding: 0 0.25rem 2.5rem !important; }
            .stage-sticky-bar { padding-right: 94px !important; }
            .strip-blocks-row { grid-template-columns: repeat(2, 1fr) !important; gap: 0.5rem !important; }
            .adverb-cards-row { grid-template-columns: 1fr !important; }
            .comparison-boxes-grid { grid-template-columns: 1fr !important; }
            .card-word { font-size: 1.15rem; }
            .adverb-main-title { font-size: 1.25rem; }
            .block-word { font-size: 1rem; }
        }
        @media (max-width: 380px) {
            .strip-block { padding: 0.55rem 0.35rem !important; }
            .block-word { font-size: 0.92rem !important; }
            .block-role { font-size: 0.68rem !important; }
            .adverb-main-title { font-size: 1.15rem; }
        }
    `;
    document.head.appendChild(style);

    container.appendChild(viewContainer);
}
