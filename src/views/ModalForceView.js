import { getTranslation } from '../utils/i18n.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';
import { baseUrl } from '../utils/config.js';

/**
 * ModalForceView 2.0 - Kognitiv Force Dynamics (Leonard Talmy).
 * 
 * Didaktisk fundament:
 * 1. Modalverber udtrykker fysiske og sociale kraftfelter:
 *    - SKAL: Ydre pres / social nødvendighed (External compulsion)
 *    - MÅ: Fjernelse af barriere / tilladelse (Removal of barrier)
 *    - VIL: Indre drivkraft / vilje & intention (Internal volition & attraction)
 *    - KAN: Kapacitet / mulighedsfelt (Sphere of potential & capability)
 * 2. Finithed: Modalverbet stjæler tidsankeret (vil -> ville), mens
 *    hovedverbet (spise) forbliver uforanderligt i infinitiv (mental projektion).
 * 3. Fuldt integreret i master-kæden: Grundsætning -> Modalverber -> Adjektiver.
 */
export function renderModalForceView(container, navigateFn, inheritedState = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container modal-force-mobile-view';

    // State videreført fra GroundingView eller defaults
    const state = {
        nounAnchor: inheritedState.nounAnchor || 'Mit',
        selectedNoun: inheritedState.selectedNoun || 'barn',
        verbAnchor: (inheritedState.verbAnchor || 'spiser').replace(' (nu)', '').replace(' (i går)', '').replace(' (senere)', ''),
        selectedModal: inheritedState.selectedModal || 'vil',
        isPast: inheritedState.verbAnchor === 'spiste' || inheritedState.isPast === true,
        showFiniteness: false
    };

    // TTS Audio Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Modal bøjnings-ordbog
    const MODAL_FORMS = {
        'skal': { present: 'skal', past: 'skulle', en: 'must / shall', icon: '⚡', color: '#f97316' },
        'må': { present: 'må', past: 'måtte', en: 'may / allowed to', icon: '🚪', color: '#22c55e' },
        'vil': { present: 'vil', past: 'ville', en: 'wants to / will', icon: '❤️', color: '#f43f5e' },
        'kan': { present: 'kan', past: 'kunne', en: 'can / able to', icon: '🌐', color: '#38bdf8' }
    };

    function getBaseModal(m) {
        if (['skal', 'skulle'].includes(m)) return 'skal';
        if (['må', 'måtte'].includes(m)) return 'må';
        if (['vil', 'ville'].includes(m)) return 'vil';
        if (['kan', 'kunne'].includes(m)) return 'kan';
        return m || 'vil';
    }

    function getCurrentModalWord() {
        const base = getBaseModal(state.selectedModal);
        return state.isPast ? MODAL_FORMS[base].past : MODAL_FORMS[base].present;
    }

    function getFullSentence() {
        return `${state.nounAnchor} ${state.selectedNoun} ${getCurrentModalWord()} spise.`;
    }

    // Tilstand for om det klæbende animationsvindue er foldet sammen
    let isStageCollapsed = false;

    // -------------------------------------------------------------
    // TOP BAR & NAVIGATION
    // -------------------------------------------------------------
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('grounding');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Grammatik-menu
    viewContainer.appendChild(renderGrammarMenu('modalverber', navigateFn));

    // Kompakt overskrift
    const headerEl = document.createElement('div');
    headerEl.className = 'modal-hero-compact';
    headerEl.innerHTML = `
        <div class="modal-step-badge">
            <span class="badge-dot-live"></span>
            <span>Trin 2 af 5: Modalverber</span>
        </div>
        <h1 class="modal-main-title">${getTranslation('modalForceTitle')}</h1>
        <p class="modal-sub-desc">${getTranslation('modalForceSubtitle')}</p>
    `;
    viewContainer.appendChild(headerEl);

    // =============================================================
    // DYNAMISK KRAFTFELT-SCENE (Aspect-ratio responsive SVG)
    // =============================================================
    const stageCard = document.createElement('div');
    stageCard.className = 'modal-stage-card';
    viewContainer.appendChild(stageCard);

    // =============================================================
    // LIVE SÆTNINGSBÅND (Mit barn [modal] spise)
    // =============================================================
    const stripCard = document.createElement('div');
    stripCard.className = 'modal-sentence-strip-card';
    viewContainer.appendChild(stripCard);

    // =============================================================
    // INTERAKTIONSKORT & DIDAKTISKE MODULER
    // =============================================================
    const taskArea = document.createElement('div');
    taskArea.className = 'modal-task-area';
    viewContainer.appendChild(taskArea);

    // -------------------------------------------------------------
    // RENDER: KRAFTFELT-SCENE (Barn og mad tættere på hinanden + større tekst)
    // -------------------------------------------------------------
    function renderStage() {
        const base = getBaseModal(state.selectedModal);
        const modalWord = getCurrentModalWord();
        const activeColor = MODAL_FORMS[base].color;

        let forceSvgOverlay = '';
        let badgeText = '';

        if (base === 'skal') {
            badgeText = `⚡ SKAL: Ydre pres & Nødvendighed`;
            forceSvgOverlay = `
                <!-- SKAL: Ydre trykbølger / kraftvektorer bag agens med aktiv skubbende animation -->
                <defs>
                    <linearGradient id="thrustGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#f97316" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.95"/>
                    </linearGradient>
                    <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>

                <!-- 3 kraftfulde fremaddrivende pile bag barnet med skubbende animation -->
                <g class="force-push-group" transform="translate(34, 42)">
                    <path d="M 0 0 L 16 14 L 0 28" stroke="#f97316" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.6">
                        <animateTransform attributeName="transform" type="translate" values="0,0; 10,0; 0,0" dur="0.9s" repeatCount="infinite" />
                    </path>
                    <path d="M 12 0 L 28 14 L 12 28" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85">
                        <animateTransform attributeName="transform" type="translate" values="0,0; 10,0; 0,0" dur="0.9s" begin="0.15s" repeatCount="infinite" />
                    </path>
                    <path d="M 24 0 L 40 14 L 24 28" stroke="#fbbf24" stroke-width="4.5" stroke-linecap="round" fill="none" filter="url(#glowOrange)">
                        <animateTransform attributeName="transform" type="translate" values="0,0; 10,0; 0,0" dur="0.9s" begin="0.3s" repeatCount="infinite" />
                    </path>
                </g>

                <!-- Trykstråle der pumper direkte i ryggen -->
                <path d="M 15 56 L 74 56" stroke="#fbbf24" stroke-width="4.5" stroke-dasharray="12 6" stroke-linecap="round" filter="url(#glowOrange)">
                    <animate attributeName="stroke-dashoffset" from="36" to="0" dur="0.65s" repeatCount="infinite" />
                </path>

                <!-- Trykfelt der skubber direkte i ryggen med bølgebevægelse -->
                <path d="M 75 50 Q 86 60 75 70" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" fill="none" filter="url(#glowOrange)">
                    <animate attributeName="d" values="M 72 49 Q 84 59 72 69; M 77 49 Q 90 59 77 69; M 72 49 Q 84 59 72 69" dur="0.8s" repeatCount="infinite" />
                </path>

                <!-- Uundgåelig kraftlinje på jorden mellem barn og mad med fremadrettet flow -->
                <line x1="102" y1="86" x2="242" y2="86" stroke="#f97316" stroke-width="3.5" stroke-dasharray="10 5" stroke-linecap="round" filter="url(#glowOrange)">
                    <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.8s" repeatCount="infinite" />
                </line>
            `;
        } else if (base === 'må') {
            badgeText = `🚪 MÅ: Barrieren er løftet / Fri bane`;
            forceSvgOverlay = `
                <!-- MÅ: Barriere der glider væk, og grøn åben passage -->
                <defs>
                    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>

                <!-- Løftet barriere/bom præcis i midten (x=172) med grønt svaj -->
                <g transform="translate(172, 38)">
                    <!-- Stolpe -->
                    <rect x="-3" y="18" width="6" height="30" rx="2" fill="#334155"/>
                    <circle cx="0" cy="18" r="4.5" fill="#22c55e"/>

                    <!-- Bommen er svunget opad i fri position -->
                    <line x1="0" y1="18" x2="24" y2="-16" stroke="#4ade80" stroke-width="4.5" stroke-linecap="round" filter="url(#glowGreen)">
                        <animate attributeName="y2" values="-12; -18; -12" dur="2s" repeatCount="infinite" />
                    </line>

                    <!-- Opløsnings-partikler i luften der svæver opad -->
                    <circle cx="8" cy="8" r="2" fill="#86efac">
                        <animate attributeName="cy" values="16; -8; 16" dur="1.8s" repeatCount="infinite" />
                        <animate attributeName="opacity" values="0.3; 1; 0.3" dur="1.8s" repeatCount="infinite" />
                    </circle>
                    <circle cx="18" cy="0" r="2.5" fill="#86efac">
                        <animate attributeName="cy" values="12; -14; 12" dur="2s" begin="0.3s" repeatCount="infinite" />
                        <animate attributeName="opacity" values="0.4; 1; 0.4" dur="2s" begin="0.3s" repeatCount="infinite" />
                    </circle>
                    <circle cx="26" cy="-8" r="2" fill="#86efac">
                        <animate attributeName="cy" values="6; -20; 6" dur="2.2s" begin="0.6s" repeatCount="infinite" />
                        <animate attributeName="opacity" values="0.3; 0.9; 0.3" dur="2.2s" begin="0.6s" repeatCount="infinite" />
                    </circle>
                </g>

                <!-- Åben, grøn lysvej hen over jorden mellem barn og mad der strømmer frit -->
                <line x1="102" y1="86" x2="242" y2="86" stroke="#22c55e" stroke-width="4" stroke-dasharray="14 7" stroke-linecap="round" filter="url(#glowGreen)">
                    <animate attributeName="stroke-dashoffset" from="42" to="0" dur="1.2s" repeatCount="infinite" />
                </line>
                <circle cx="132" cy="86" r="3.5" fill="#86efac">
                    <animate attributeName="r" values="2.5; 5; 2.5" dur="1.4s" repeatCount="infinite"/>
                    <animate attributeName="opacity" values="0.6; 1; 0.6" dur="1.4s" repeatCount="infinite"/>
                </circle>
                <circle cx="172" cy="86" r="3.5" fill="#86efac">
                    <animate attributeName="r" values="2.5; 5; 2.5" dur="1.4s" begin="0.45s" repeatCount="infinite"/>
                    <animate attributeName="opacity" values="0.6; 1; 0.6" dur="1.4s" begin="0.45s" repeatCount="infinite"/>
                </circle>
                <circle cx="212" cy="86" r="3.5" fill="#86efac">
                    <animate attributeName="r" values="2.5; 5; 2.5" dur="1.4s" begin="0.9s" repeatCount="infinite"/>
                    <animate attributeName="opacity" values="0.6; 1; 0.6" dur="1.4s" begin="0.9s" repeatCount="infinite"/>
                </circle>
            `;
        } else if (base === 'vil') {
            badgeText = `❤️ VIL: Indre vilje & Magnetisk træk`;
            forceSvgOverlay = `
                <!-- VIL: Glødende indre kerne og magnetisk tiltrækningsbue -->
                <defs>
                    <filter id="glowRose" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>

                <!-- Glødende hjerte/vilje-kerne i barnets bryst der pulserer livagtigt -->
                <circle cx="86" cy="52" r="7.5" fill="#f43f5e" filter="url(#glowRose)">
                    <animate attributeName="r" values="6; 9.5; 6.5; 10; 6" dur="1.3s" repeatCount="infinite" />
                </circle>
                <circle cx="86" cy="52" r="3.5" fill="#ffffff">
                    <animate attributeName="opacity" values="0.7; 1; 0.7" dur="1.3s" repeatCount="infinite" />
                </circle>

                <!-- Magnetisk attraktionsbue fra barn mod mad med aktivt partikelflow -->
                <path d="M 96 52 Q 172 20 244 54" stroke="#fb7185" stroke-width="3.5" fill="none" stroke-linecap="round" 
                      stroke-dasharray="10 6" filter="url(#glowRose)">
                    <animate attributeName="stroke-dashoffset" from="32" to="0" dur="0.75s" repeatCount="infinite" />
                </path>
                <path d="M 96 56 Q 172 30 244 58" stroke="#f43f5e" stroke-width="2" fill="none" opacity="0.6">
                    <animate attributeName="d" values="M 96 56 Q 172 26 244 58; M 96 56 Q 172 36 244 58; M 96 56 Q 172 26 244 58" dur="1.5s" repeatCount="infinite" />
                </path>

                <!-- Fremadrettede intentionsstråler der pulserer -->
                <line x1="98" y1="48" x2="114" y2="45" stroke="#fda4af" stroke-width="2.5" stroke-linecap="round">
                    <animate attributeName="x2" values="108; 118; 108" dur="1s" repeatCount="infinite"/>
                </line>
                <line x1="100" y1="53" x2="120" y2="53" stroke="#fda4af" stroke-width="3" stroke-linecap="round">
                    <animate attributeName="x2" values="112; 124; 112" dur="1s" repeatCount="infinite"/>
                </line>
                <line x1="98" y1="58" x2="114" y2="61" stroke="#fda4af" stroke-width="2.5" stroke-linecap="round">
                    <animate attributeName="x2" values="108; 118; 108" dur="1s" repeatCount="infinite"/>
                </line>

                <!-- Magnetiske tiltrækningsringe ved maden -->
                <circle cx="254" cy="54" r="14" fill="none" stroke="#fb7185" stroke-width="1.8">
                    <animate attributeName="r" values="10; 22; 10" dur="1.5s" repeatCount="infinite"/>
                    <animate attributeName="opacity" values="0.9; 0.1; 0.9" dur="1.5s" repeatCount="infinite"/>
                </circle>
            `;
        } else if (base === 'kan') {
            badgeText = `🌐 KAN: Kapacitet & Mulighedsfelt`;
            forceSvgOverlay = `
                <!-- KAN: Ekspanderende kompetence-sfære og solid platform -->
                <defs>
                    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                    <linearGradient id="auraGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#0284c7" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>

                <!-- Stor kompetence-aura omkring agens og målet der udvider sig med energi -->
                <ellipse cx="165" cy="56" rx="75" ry="32" fill="url(#auraGrad)" stroke="#38bdf8" stroke-width="2" 
                         stroke-dasharray="10 6" filter="url(#glowCyan)">
                    <animate attributeName="stroke-dashoffset" from="0" to="48" dur="2s" repeatCount="infinite" />
                    <animate attributeName="rx" values="72; 82; 72" dur="2.4s" repeatCount="infinite" />
                    <animate attributeName="ry" values="30; 34; 30" dur="2.4s" repeatCount="infinite" />
                </ellipse>

                <!-- Roterende og pulserende kompetence-ringe omkring barnets hoved/ressource -->
                <circle cx="86" cy="38" r="14" fill="none" stroke="#38bdf8" stroke-width="1.8">
                    <animate attributeName="r" values="10; 22; 10" dur="1.8s" repeatCount="infinite" />
                    <animate attributeName="opacity" values="0.9; 0.1; 0.9" dur="1.8s" repeatCount="infinite" />
                </circle>
                <circle cx="86" cy="38" r="14" fill="none" stroke="#38bdf8" stroke-width="1.2">
                    <animate attributeName="r" values="16; 28; 16" dur="1.8s" begin="0.4s" repeatCount="infinite" />
                    <animate attributeName="opacity" values="0.7; 0.05; 0.7" dur="1.8s" repeatCount="infinite" />
                </circle>

                <!-- Solid cyan bro langs jorden mellem barn og mad med aktiv lysstrøm -->
                <line x1="102" y1="86" x2="242" y2="86" stroke="#38bdf8" stroke-width="4.5" stroke-dasharray="14 7" filter="url(#glowCyan)">
                    <animate attributeName="stroke-dashoffset" from="42" to="0" dur="1.1s" repeatCount="infinite" />
                </line>
            `;
        }

        stageCard.innerHTML = `
            <div class="stage-frame-wrapper ${isStageCollapsed ? 'is-collapsed' : ''}" style="--modal-accent: ${activeColor};">
                <!-- KLÆBENDE TOPBAR MED STATUS, LYD OG FOLD-KNAP -->
                <div class="stage-sticky-bar">
                    <div class="sticky-left-info">
                        <span class="sticky-lamp-dot" style="background: ${activeColor}; box-shadow: 0 0 8px ${activeColor};"></span>
                        <span class="sticky-status-title">${badgeText}</span>
                    </div>
                    <div class="sticky-right-actions">
                        <button type="button" class="btn-mini-audio" id="btn-sticky-audio" title="Lyt til sætningen">
                            <span>🔊</span>
                            <span class="btn-audio-text">Lyt</span>
                        </button>
                        <button type="button" class="btn-toggle-collapse" id="btn-toggle-collapse" title="${isStageCollapsed ? 'Fold scenen ud' : 'Gør scenen kompakt'}">
                            <span>${isStageCollapsed ? '⊞ Vis scene' : '⊟ Skjul scene'}</span>
                        </button>
                    </div>
                </div>

                <!-- SVG SCENE (KAN MINIMERES VED BEHOV) -->
                <div class="stage-svg-body">
                    <svg class="force-svg-fluid" viewBox="0 0 360 126" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="spaceGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#0b1329"/>
                                <stop offset="70%" stop-color="#1e293b"/>
                                <stop offset="100%" stop-color="#0f172a"/>
                            </linearGradient>
                            <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#15803d"/>
                                <stop offset="100%" stop-color="#14532d"/>
                            </linearGradient>
                        </defs>

                        <!-- Baggrund & nattehimmel -->
                        <rect x="0" y="0" width="360" height="126" rx="12" fill="url(#spaceGrad)"/>

                        <!-- Jorden / Terrænet -->
                        <rect x="0" y="86" width="360" height="40" rx="0 0 12 12" fill="url(#grassGrad)"/>
                        <line x1="0" y1="86" x2="360" y2="86" stroke="#4ade80" stroke-width="1.5" opacity="0.6"/>

                        <!-- Dynamiske kraftvektorer (SKAL, MÅ, VIL, KAN) -->
                        ${forceSvgOverlay}

                        <!-- AGENS: Barnet (Tættere på maden: placeret ved x=86) -->
                        <g class="agent-character" transform="translate(86, 28)">
                            <!-- Hoved -->
                            <circle cx="0" cy="11" r="7.5" fill="#f8fafc"/>
                            <!-- Krop -->
                            <path d="M -7 21 Q 0 18 7 21 L 8 42 L -8 42 Z" fill="#0284c7" rx="3"/>
                            <!-- Ben til jorden (y=86, så 28 + 58 = 86) -->
                            <line x1="-4" y1="42" x2="-4" y2="58" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                            <line x1="4" y1="42" x2="4" y2="58" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                            
                            <!-- Navnemærke (STOR OG TYDELIG TEKST) -->
                            <text x="0" y="74" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">
                                ${state.nounAnchor} ${state.selectedNoun}
                            </text>
                            <text x="0" y="86" fill="#cbd5e1" font-size="8.5" font-weight="700" text-anchor="middle">
                                (subjekt)
                            </text>
                        </g>

                        <!-- MÅLET: Handlingen "spise" (Tættere på barnet: placeret ved x=258) -->
                        <g class="target-action" transform="translate(258, 30)">
                            <!-- Bord -->
                            <rect x="-18" y="34" width="36" height="12" rx="2" fill="#78350f" stroke="#b45309" stroke-width="1"/>
                            <line x1="-12" y1="46" x2="-12" y2="56" stroke="#78350f" stroke-width="2.5"/>
                            <line x1="12" y1="46" x2="12" y2="56" stroke="#78350f" stroke-width="2.5"/>
                            
                            <!-- Tallerken -->
                            <ellipse cx="0" cy="33" rx="14" ry="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
                            <!-- Mad -->
                            <circle cx="0" cy="31" r="4.5" fill="#f59e0b"/>
                            <!-- Duft/Damp med levende opdrift -->
                            <path d="M -3 25 Q -5 19 0 14" stroke="#fde68a" stroke-width="1.3" fill="none" opacity="0.8">
                                <animate attributeName="d" values="M -3 25 Q -5 19 0 14; M -3 25 Q -2 18 -4 13; M -3 25 Q -5 19 0 14" dur="2s" repeatCount="infinite"/>
                                <animate attributeName="opacity" values="0.4; 0.9; 0.4" dur="2s" repeatCount="infinite"/>
                            </path>
                            <path d="M 3 26 Q 5 20 1 15" stroke="#fde68a" stroke-width="1.3" fill="none" opacity="0.8">
                                <animate attributeName="d" values="M 3 26 Q 5 20 1 15; M 3 26 Q 2 19 4 14; M 3 26 Q 5 20 1 15" dur="2.3s" begin="0.4s" repeatCount="infinite"/>
                                <animate attributeName="opacity" values="0.3; 0.85; 0.3" dur="2.3s" begin="0.4s" repeatCount="infinite"/>
                            </path>

                            <!-- Mærkaten for handlingen (STOR OG TYDELIG TEKST) -->
                            <text x="0" y="72" fill="#4ade80" font-size="14.5" font-weight="900" text-anchor="middle">
                                spise
                            </text>
                            <text x="0" y="84" fill="#86efac" font-size="8.5" font-weight="700" text-anchor="middle">
                                (handling / idé)
                            </text>
                        </g>

                        <!-- Statusbadge i toppen af scenen med pulserende glød -->
                        <g class="stage-top-badge" transform="translate(180, 15)">
                            <rect x="-108" y="-10" width="216" height="21" rx="10.5" fill="rgba(15, 23, 42, 0.94)" stroke="${activeColor}" stroke-width="1.3">
                                <animate attributeName="stroke-opacity" values="0.6; 1; 0.6" dur="2s" repeatCount="infinite"/>
                            </rect>
                            <text x="0" y="4" fill="${activeColor}" font-size="10.2" font-weight="900" text-anchor="middle">
                                ${badgeText}
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

        const audioBtn = stageCard.querySelector('#btn-sticky-audio');
        if (audioBtn) audioBtn.onclick = () => speakDanish(getFullSentence());

        const toggleBtn = stageCard.querySelector('#btn-toggle-collapse');
        if (toggleBtn) toggleBtn.onclick = () => {
            isStageCollapsed = !isStageCollapsed;
            renderStage();
        };
    }

    // -------------------------------------------------------------
    // RENDER: LIVE SÆTNINGSBÅND
    // -------------------------------------------------------------
    function renderSentenceStrip() {
        const base = getBaseModal(state.selectedModal);
        const modalWord = getCurrentModalWord();
        const activeColor = MODAL_FORMS[base].color;

        stripCard.innerHTML = `
            <div class="strip-top-row">
                <span class="strip-header-tag">Sætningens opbygning:</span>
                <button type="button" class="btn-tts-listen" id="btn-listen-strip">
                    <span>🔊</span>
                    <span>Lyt</span>
                </button>
            </div>

            <div class="strip-blocks-row">
                <!-- Led 1: Subjektet -->
                <div class="strip-block block-subject">
                    <span class="block-word">${state.nounAnchor} ${state.selectedNoun}</span>
                    <span class="block-role">Hvem (Subjekt)</span>
                </div>

                <!-- Led 2: Modalverbet (Verbum 1 - Finit tidsanker) -->
                <div class="strip-block block-modal" style="border-color: ${activeColor}; background: rgba(15, 23, 42, 0.85);">
                    <span class="block-word" style="color: ${activeColor};">${modalWord}</span>
                    <span class="block-role" style="color: ${activeColor};">V1 (${state.isPast ? 'Datid' : 'Nutid'})</span>
                </div>

                <!-- Led 3: Handlingen (Verbum 2 - Infinitiv) -->
                <div class="strip-block block-action">
                    <span class="block-word" style="color: #4ade80;">spise</span>
                    <span class="block-role">V2 (Infinitiv)</span>
                </div>
            </div>
        `;

        stripCard.querySelector('#btn-listen-strip').onclick = () => {
            speakDanish(getFullSentence());
        };
    }

    // -------------------------------------------------------------
    // RENDER: DE 4 MODAL-KORT & FINITHEDS-MODUL
    // -------------------------------------------------------------
    function renderInteractionArea() {
        taskArea.innerHTML = '';

        const base = getBaseModal(state.selectedModal);

        // Kognitiv forklaringstekst for det valgte modalverbum
        let explanationText = '';
        if (base === 'skal') explanationText = getTranslation('modalForceSkal');
        else if (base === 'må') explanationText = getTranslation('modalForceMaa');
        else if (base === 'vil') explanationText = getTranslation('modalForceVil');
        else if (base === 'kan') explanationText = getTranslation('modalForceKan');

        const box = document.createElement('div');
        box.className = 'modal-controls-container animate-in';

        box.innerHTML = `
            <div class="controls-title-row">
                <span class="section-label">Vælg et modalverbum for at ændre kraften:</span>
            </div>

            <!-- DE 4 TAKTILE MODAL-KORT -->
            <div class="modal-cards-grid">
                <!-- SKAL -->
                <button type="button" class="modal-card-btn ${base === 'skal' ? 'active-card' : ''}" data-modal="skal" style="--card-accent: #f97316;">
                    <div class="card-head">
                        <span class="card-icon">⚡</span>
                        <span class="card-word">${state.isPast ? 'skulle' : 'skal'}</span>
                    </div>
                    <div class="card-badge" style="color: #f97316;">Ydre pres</div>
                    <div class="card-desc">Handlingen er en nødvendighed eller en fastlagt aftale.</div>
                </button>

                <!-- MÅ -->
                <button type="button" class="modal-card-btn ${base === 'må' ? 'active-card' : ''}" data-modal="må" style="--card-accent: #22c55e;">
                    <div class="card-head">
                        <span class="card-icon">🚪</span>
                        <span class="card-word">${state.isPast ? 'måtte' : 'må'}</span>
                    </div>
                    <div class="card-badge" style="color: #22c55e;">Fri bane / Tilladelse</div>
                    <div class="card-desc">Barrieren er fjernet. Regel eller tilladelse giver grønt lys.</div>
                </button>

                <!-- VIL -->
                <button type="button" class="modal-card-btn ${base === 'vil' ? 'active-card' : ''}" data-modal="vil" style="--card-accent: #f43f5e;">
                    <div class="card-head">
                        <span class="card-icon">❤️</span>
                        <span class="card-word">${state.isPast ? 'ville' : 'vil'}</span>
                    </div>
                    <div class="card-badge" style="color: #f43f5e;">Indre vilje / Lyst</div>
                    <div class="card-desc">Kraften kommer indefra agens. Et personligt ønske trækker fremad.</div>
                </button>

                <!-- KAN -->
                <button type="button" class="modal-card-btn ${base === 'kan' ? 'active-card' : ''}" data-modal="kan" style="--card-accent: #38bdf8;">
                    <div class="card-head">
                        <span class="card-icon">🌐</span>
                        <span class="card-word">${state.isPast ? 'kunne' : 'kan'}</span>
                    </div>
                    <div class="card-badge" style="color: #38bdf8;">Kapacitet / Mulighed</div>
                    <div class="card-desc">Evnen og ressourcerne er til stede. Handlingen er mulig.</div>
                </button>
            </div>

            <!-- KOGNITIV FORKLARINGS-BANNER -->
            <div class="force-explanation-box">
                <div class="expl-icon">💡</div>
                <div class="expl-body">${explanationText}</div>
            </div>

            <!-- ========================================================= -->
            <!-- FINITHED: HVORFOR BØJES KUN DET FØRSTE ORD?              -->
            <!-- ========================================================= -->
            <div class="finiteness-interactive-card">
                <div class="finiteness-header">
                    <span class="finiteness-pill">Tidsankerets hemmelighed</span>
                    <h3 class="finiteness-h3">${getTranslation('finitenessTitle')}</h3>
                    <p class="finiteness-p">${getTranslation('finitenessDesc')}</p>
                </div>

                <!-- TIDS-VIPPE: NUTID VS. DATID -->
                <div class="time-toggle-wrapper">
                    <span class="time-toggle-label">Skift sætningens tid:</span>
                    <div class="time-toggle-pill">
                        <button type="button" class="time-btn ${!state.isPast ? 'active' : ''}" id="btn-toggle-present">
                            <span>🟢</span>
                            <span>Nutid (lige nu)</span>
                        </button>
                        <button type="button" class="time-btn ${state.isPast ? 'active' : ''}" id="btn-toggle-past">
                            <span>🟠</span>
                            <span>Datid (i går)</span>
                        </button>
                    </div>
                </div>

                <!-- ANIMERET TIDS-LINJE MED GLIDENDE MARKØR -->
                <div class="timeline-slider-track">
                    <svg viewBox="0 0 320 46" class="timeline-svg-fluid" preserveAspectRatio="xMidYMid meet">
                        <line x1="45" y1="20" x2="275" y2="20" stroke="rgba(255,255,255,0.2)" stroke-width="3.5" stroke-linecap="round" />
                        
                        <!-- Flow-strøm langs tidsaksen -->
                        <line x1="45" y1="20" x2="275" y2="20" stroke="${MODAL_FORMS[base].color}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="10 6" opacity="0.45">
                            <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="infinite"/>
                        </line>
                        
                        <!-- Datid punkt -->
                        <circle cx="80" cy="20" r="5" fill="#475569" />
                        <text x="80" y="38" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="middle">Datid (i går)</text>
                        
                        <!-- Nutid punkt -->
                        <circle cx="240" cy="20" r="5" fill="#475569" />
                        <text x="240" y="38" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="middle">Nutid (lige nu)</text>
                        
                        <!-- Glidende tidsmarkør med pulserende glød -->
                        <circle id="timeline-moving-dot" cx="${state.isPast ? '80' : '240'}" cy="20" r="9" 
                                fill="${MODAL_FORMS[base].color}" style="transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); filter: drop-shadow(0 0 8px ${MODAL_FORMS[base].color});">
                            <animate attributeName="r" values="8; 10.5; 8" dur="1.5s" repeatCount="infinite" />
                        </circle>
                    </svg>
                </div>

                <!-- VISUELT TIDS-DIAGRAM -->
                <div class="finiteness-diagram">
                    <div class="diagram-box box-v1 pulse-finite-active">
                        <div class="diag-tag">Verbum 1 (Modalverbum)</div>
                        <div class="diag-word" id="v1-display" style="color: ${MODAL_FORMS[base].color};">
                            ${getCurrentModalWord()}
                        </div>
                        <div class="diag-role">⚓ Tidsankeret (${state.isPast ? 'Datid' : 'Nutid'})</div>
                        <div class="diag-sub">Bøjes i tid!</div>
                    </div>

                    <div class="diagram-arrow">➔</div>

                    <div class="diagram-box box-v2">
                        <div class="diag-tag">Verbum 2 (Handlingen)</div>
                        <div class="diag-word" style="color: #4ade80;">spise</div>
                        <div class="diag-role">💭 Ren idé (Infinitiv)</div>
                        <div class="diag-sub">Uforanderlig! Bøjes IKKE!</div>
                    </div>
                </div>

                <div class="finiteness-callout-msg">
                    ${getTranslation('finitenessExpl')}
                </div>
            </div>

            <!-- ========================================================= -->
            <!-- DEN STORE GRAMMATIK-STI: BROEN TIL ADJEKTIVER             -->
            <!-- ========================================================= -->
            <div class="grammar-roadmap-card">
                <div class="roadmap-header">
                    <span>Den store grammatik-sti: Se hvordan sætningen udbygges</span>
                </div>

                <div class="roadmap-steps-list">
                    <div class="roadmap-step-item done">
                        <div class="step-icon-badge">✓</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">1. Grundsætning (Intro)</div>
                            <div class="step-example-txt">"${state.nounAnchor} ${state.selectedNoun} ${state.verbAnchor}."</div>
                        </div>
                        <div class="step-status-pill done">Gennemført</div>
                    </div>

                    <div class="roadmap-step-item current">
                        <div class="step-icon-badge">⚡</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">2. Modalverber (Kraft & vilje)</div>
                            <div class="step-example-txt">"${getFullSentence()}"</div>
                        </div>
                        <div class="step-status-pill current">Aktiv nu</div>
                    </div>

                    <div class="roadmap-step-item next">
                        <div class="step-icon-badge">🏷️</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">3. Adjektiver (Beskrivelse)</div>
                            <div class="step-example-txt">"${state.nounAnchor} <strong>[lille / sultne]</strong> ${state.selectedNoun} ${getCurrentModalWord()} spise..."</div>
                        </div>
                        <div class="step-status-pill next">Næste skridt</div>
                    </div>

                    <div class="roadmap-step-item future">
                        <div class="step-icon-badge">🌊</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">4. Adverbier (Måde, grad og tid)</div>
                            <div class="step-example-txt">"${state.nounAnchor} lille ${state.selectedNoun} ${getCurrentModalWord()} spise <strong>[langsomt / gerne]</strong>..."</div>
                        </div>
                        <div class="step-status-pill future">Trin 4</div>
                    </div>

                    <div class="roadmap-step-item future">
                        <div class="step-icon-badge">🌉</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">5. Konjunktioner (Tekstflow & bindeord)</div>
                            <div class="step-example-txt">"${state.nounAnchor} lille ${state.selectedNoun} ${getCurrentModalWord()} spise, <strong>[fordi]</strong>..."</div>
                        </div>
                        <div class="step-status-pill future">Trin 5</div>
                    </div>
                </div>
            </div>

            <!-- GÅ VIDERE KNAP -->
            <div class="next-bridge-action-card">
                <h3 style="color: #fbbf24; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.35rem;">
                    Klar til næste trin: Tilføj Adjektiver
                </h3>
                <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.15rem; line-height: 1.45;">
                    Tag sætningen <strong>"${getFullSentence()}"</strong> med videre og lær, hvordan adjektiver maler og beskriver barnet.
                </p>
                <button type="button" class="btn-launch-adjective" id="btn-goto-adjectives">
                    <span>${getTranslation('nextStepAdjective') || 'Fortsæt til Adjektiver'} ➔</span>
                </button>
            </div>
        `;

        // Klik på modal-kort
        box.querySelectorAll('.modal-card-btn').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.dataset.modal;
                state.selectedModal = chosen;
                speakDanish(getCurrentModalWord());
                refreshUI();
            };
        });

        // Tidsvippe (Nutid / Datid)
        const btnPresent = box.querySelector('#btn-toggle-present');
        const btnPast = box.querySelector('#btn-toggle-past');

        btnPresent.onclick = () => {
            if (state.isPast) {
                state.isPast = false;
                speakDanish(getFullSentence());
                refreshUI();
            }
        };

        btnPast.onclick = () => {
            if (!state.isPast) {
                state.isPast = true;
                speakDanish(getFullSentence());
                refreshUI();
            }
        };

        // Gå til adjektiver
        box.querySelector('#btn-goto-adjectives').onclick = () => {
            navigateFn('adjective_bridge', {
                nounAnchor: state.nounAnchor,
                selectedNoun: state.selectedNoun,
                selectedModal: getCurrentModalWord(),
                verbAnchor: state.isPast ? 'spiste' : 'spiser',
                isPast: state.isPast
            });
        };

        taskArea.appendChild(box);
    }

    function flashStage() {
        const frame = stageCard.querySelector('.stage-frame-wrapper');
        if (frame) {
            frame.classList.remove('pulse-stage-glow');
            void frame.offsetWidth;
            frame.classList.add('pulse-stage-glow');
            setTimeout(() => frame.classList.remove('pulse-stage-glow'), 600);
        }
    }

    function refreshUI() {
        renderStage();
        renderSentenceStrip();
        renderInteractionArea();
        flashStage();
    }

    refreshUI();

    // =============================================================
    // 100% MOBIL-SIKRE STYLES (INGEN VANDRET OVERFLOW)
    // =============================================================
    const oldStyles = document.getElementById('modal-force-styles');
    if (oldStyles) oldStyles.remove();

    const style = document.createElement('style');
    style.id = 'modal-force-styles';
    style.textContent = `
        .modal-force-mobile-view {
            width: 100% !important;
            max-width: 760px !important;
            margin: 0 auto;
            padding: 0 0.2rem 3rem !important;
            box-sizing: border-box;
            color: #f8fafc;
        }

        .modal-force-mobile-view .top-bar {
            margin-bottom: 0.35rem !important;
        }

        .modal-force-mobile-view .grammar-nav-menu {
            margin-bottom: 0.5rem !important;
            padding: 0.25rem 0 !important;
        }

        /* Hero */
        .modal-hero-compact {
            text-align: center;
            margin-bottom: 0.75rem;
            padding: 0 0.4rem;
        }
        .modal-step-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(251, 191, 36, 0.15);
            border: 1px solid rgba(251, 191, 36, 0.35);
            padding: 0.2rem 0.65rem;
            border-radius: 9999px;
            font-size: 0.78rem;
            font-weight: 700;
            color: #fbbf24;
            margin-bottom: 0.35rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .modal-main-title {
            font-size: 1.45rem;
            font-weight: 800;
            margin: 0 0 0.25rem;
            color: #ffffff;
            line-height: 1.25;
        }
        .modal-sub-desc {
            color: #cbd5e1;
            font-size: 0.92rem;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.4;
        }

        /* KLÆBENDE SCENE-RAMME (SMART STICKY HUD) */
        .modal-stage-card {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
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
            border-color: var(--modal-accent, #38bdf8) !important;
            box-shadow: 0 0 25px var(--modal-accent, rgba(56, 189, 248, 0.6)) !important;
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
            max-height: 145px;
            overflow: hidden;
            transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
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

        .force-svg-fluid {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Sætningsbånd */
        .modal-sentence-strip-card {
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.6rem 0.8rem;
            margin-bottom: 1rem;
            box-sizing: border-box;
        }
        .strip-top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.45rem;
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
            display: flex;
            gap: 0.45rem;
            width: 100%;
            box-sizing: border-box;
        }
        .strip-block {
            flex: 1;
            min-width: 0;
            padding: 0.5rem 0.3rem;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-sizing: border-box;
        }
        .block-subject {
            background: rgba(255, 255, 255, 0.05);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
        }
        .block-modal {
            border: 2px solid #f43f5e;
            box-shadow: 0 0 12px rgba(244, 63, 94, 0.25);
        }
        .block-action {
            background: rgba(34, 197, 94, 0.12);
            border: 1.5px solid rgba(74, 222, 128, 0.4);
        }
        .block-word {
            font-size: 1.15rem;
            font-weight: 900;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }
        .block-role {
            font-size: 0.72rem;
            font-weight: 700;
            color: #94a3b8;
            margin-top: 0.15rem;
            white-space: nowrap;
        }

        /* Kontrolområde */
        .modal-task-area {
            width: 100%;
            box-sizing: border-box;
        }
        .controls-title-row {
            margin-bottom: 0.6rem;
        }
        .section-label {
            font-size: 0.95rem;
            color: #e2e8f0;
            font-weight: 700;
        }

        /* 4 Modal Kort (2x2 Grid) */
        .modal-cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.65rem;
            margin-bottom: 1rem;
            width: 100%;
            box-sizing: border-box;
        }
        .modal-card-btn {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            padding: 0.75rem 0.65rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            width: 100%;
            box-sizing: border-box;
        }
        .modal-card-btn:hover {
            border-color: var(--card-accent);
            background: rgba(255, 255, 255, 0.05);
        }
        .modal-card-btn.active-card {
            border-color: var(--card-accent) !important;
            background: rgba(15, 23, 42, 0.95) !important;
            box-shadow: 0 0 16px var(--card-accent);
            animation: cardActiveGlow 2.4s ease-in-out infinite alternate;
        }
        @keyframes cardActiveGlow {
            0% { box-shadow: 0 0 8px var(--card-accent); transform: scale(1.005); }
            100% { box-shadow: 0 0 18px var(--card-accent); transform: scale(1.02); }
        }
        .card-head {
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .card-icon {
            font-size: 1.35rem;
        }
        .card-word {
            font-size: 1.35rem;
            font-weight: 900;
            color: #ffffff;
        }
        .card-badge {
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.02em;
        }
        .card-desc {
            font-size: 0.76rem;
            color: #94a3b8;
            line-height: 1.3;
        }

        /* Forklaringsboks */
        .force-explanation-box {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.85rem 1rem;
            margin-bottom: 1.2rem;
            display: flex;
            gap: 0.75rem;
            align-items: flex-start;
            box-sizing: border-box;
        }
        .expl-icon {
            font-size: 1.4rem;
            flex-shrink: 0;
            margin-top: 0.1rem;
        }
        .expl-body {
            font-size: 0.94rem;
            color: #f1f5f9;
            line-height: 1.45;
        }
        .expl-body strong {
            color: #fbbf24;
        }

        /* Finithed Card */
        .finiteness-interactive-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 1.15rem 1rem;
            margin-bottom: 1.4rem;
            box-sizing: border-box;
        }
        .finiteness-pill {
            display: inline-block;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.15rem 0.55rem;
            border-radius: 5px;
            margin-bottom: 0.35rem;
        }
        .finiteness-h3 {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
            margin: 0 0 0.3rem;
            line-height: 1.3;
        }
        .finiteness-p {
            color: #cbd5e1;
            font-size: 0.92rem;
            margin: 0 0 1rem;
            line-height: 1.4;
        }

        /* Tids-vippe */
        .time-toggle-wrapper {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 0.75rem;
            margin-bottom: 1rem;
        }
        .time-toggle-label {
            display: block;
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
        .time-toggle-pill {
            display: flex;
            gap: 0.4rem;
            width: 100%;
        }
        .time-btn {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
            padding: 0.55rem 0.4rem;
            border-radius: 8px;
            font-size: 0.92rem;
            font-weight: 800;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            transition: all 0.2s;
        }
        .time-btn.active {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            color: #ffffff;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
        }

        /* Animeret Tidslinje-slider */
        .timeline-slider-track {
            background: #0b1120;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.4rem 0.6rem;
            margin-bottom: 0.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .timeline-svg-fluid {
            width: 100%;
            max-width: 320px;
            height: auto;
            display: block;
        }

        .pulse-finite-active {
            animation: pulseV1Flash 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes pulseV1Flash {
            0% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.18); filter: brightness(1.5); }
            100% { transform: scale(1); filter: brightness(1); }
        }

        /* Finithed Diagram */
        .finiteness-diagram {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.85rem;
            width: 100%;
            box-sizing: border-box;
        }
        .diagram-box {
            flex: 1;
            min-width: 0;
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 0.65rem 0.4rem;
            text-align: center;
            box-sizing: border-box;
        }
        .diagram-arrow {
            font-size: 1.3rem;
            color: #94a3b8;
            flex-shrink: 0;
        }
        .diag-tag {
            font-size: 0.7rem;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
        }
        .diag-word {
            font-size: 1.35rem;
            font-weight: 900;
            margin: 0.2rem 0;
        }
        .diag-role {
            font-size: 0.78rem;
            font-weight: 800;
            color: #cbd5e1;
        }
        .diag-sub {
            font-size: 0.7rem;
            color: #94a3b8;
            margin-top: 0.1rem;
        }
        .finiteness-callout-msg {
            background: rgba(56, 189, 248, 0.1);
            border-left: 3px solid #38bdf8;
            padding: 0.6rem 0.8rem;
            font-size: 0.88rem;
            color: #e2e8f0;
            line-height: 1.4;
            border-radius: 0 6px 6px 0;
        }

        /* Roadmap */
        .grammar-roadmap-card {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 1rem;
            margin-bottom: 1.25rem;
            box-sizing: border-box;
        }
        .roadmap-header {
            font-size: 0.92rem;
            font-weight: 800;
            color: #38bdf8;
            margin-bottom: 0.75rem;
        }
        .roadmap-steps-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .roadmap-step-item {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 0.6rem 0.75rem;
        }
        .roadmap-step-item.done {
            border-color: rgba(34, 197, 94, 0.4);
            background: rgba(34, 197, 94, 0.1);
        }
        .roadmap-step-item.current {
            border-color: rgba(251, 191, 36, 0.5);
            background: rgba(251, 191, 36, 0.12);
        }
        .step-icon-badge {
            font-size: 1.15rem;
            width: 22px;
            text-align: center;
        }
        .step-text-body {
            flex: 1;
            min-width: 0;
        }
        .step-head-txt {
            font-size: 0.92rem;
            font-weight: 800;
            color: white;
        }
        .step-example-txt {
            font-size: 0.82rem;
            color: #cbd5e1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .step-status-pill {
            font-size: 0.72rem;
            font-weight: 800;
            padding: 0.15rem 0.5rem;
            border-radius: 5px;
        }
        .step-status-pill.done {
            background: rgba(34, 197, 94, 0.25);
            color: #4ade80;
        }
        .step-status-pill.current {
            background: rgba(251, 191, 36, 0.25);
            color: #fbbf24;
        }
        .step-status-pill.next {
            background: rgba(56, 189, 248, 0.25);
            color: #38bdf8;
        }
        .step-status-pill.future {
            background: rgba(255, 255, 255, 0.06);
            color: #94a3b8;
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
        .btn-launch-adjective {
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
        .btn-launch-adjective:hover {
            background: #7dd3fc;
            transform: scale(1.02);
        }

        @media (max-width: 480px) {
            .modal-force-mobile-view { padding: 0 0.15rem 2.5rem !important; }
            .modal-cards-grid { grid-template-columns: 1fr; }
            .card-word { font-size: 1.3rem; }
            .modal-main-title { font-size: 1.3rem; }
            .finiteness-diagram { flex-direction: column; }
            .diagram-arrow { transform: rotate(90deg); margin: 0.2rem 0; }
        }
    `;
    document.head.appendChild(style);

    container.appendChild(viewContainer);
}
