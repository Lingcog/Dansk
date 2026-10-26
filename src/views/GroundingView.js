import { getTranslation, getLang } from '../utils/i18n.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';
import { baseUrl } from '../utils/config.js';

/**
 * GroundingView 2.0 - 100% Mobiloptimeret & Responsiv.
 * 
 * Vigtigste forbedringer:
 * 1. NUL vandret overflow på telefoner (ingen afklippede overskrifter eller bokse).
 * 2. Ultra-kompakt ballon-scene (kun ~90px på mobil), så opgaven og svarkortene
 *    er synlige MED DET SAMME på skærmen uden at skulle scrolle!
 * 3. Stor, tydelig og letlæselig typografi.
 * 4. Den levende ballon-scene og linen der sætter sig fast live er bevaret 100%.
 * 5. Kæden videre til Modalverber -> Adjektiver -> Adverbier -> Konjunktioner er intakt.
 */
export function renderGroundingView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container grounding-mobile-view';

    // Audio TTS Helper
    function speakDanish(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // Top bar med tilbageknap
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('dagens_opgave');
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Grammatik-menu
    viewContainer.appendChild(renderGrammarMenu('intro', navigateFn));

    // Kompakt overskrift (mobilvenlig)
    const headerEl = document.createElement('div');
    headerEl.className = 'grounding-hero-compact';
    headerEl.innerHTML = `
        <h1 class="grounding-main-title">${getTranslation('howToBuildSentence')}</h1>
        <p class="grounding-sub-desc">${getTranslation('howToBuildSentenceDesc')}</p>
    `;
    viewContainer.appendChild(headerEl);

    // State for øvelsen
    let state = {
        step: 1, // 1: Noun anchor, 2: Verb anchor, 3: Assemble, 4: Visual, 5: Bridge
        nounAnchor: '',
        verbAnchor: '',
        sentenceParts: []
    };

    // ==========================================================
    // ULTRA-KOMPAKT SCENE (360x90) + LIVE SÆTNINGSBÅND
    // ==========================================================
    const stageCard = document.createElement('div');
    stageCard.className = 'grounding-stage-compact';

    stageCard.innerHTML = `
        <div class="stage-frame-wrapper" style="--grounding-accent: #38bdf8;">
            <!-- SVG SCENE (360x94) -->
            <div class="stage-svg-body">
                <div class="sky-frame-mobile">
                    <svg class="sky-svg-fluid" viewBox="0 0 360 94" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="skyGradMob" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#0c4a6e" stop-opacity="0.95"/>
                                <stop offset="65%" stop-color="#0284c7" stop-opacity="0.45"/>
                                <stop offset="100%" stop-color="#064e3b" stop-opacity="0.75"/>
                            </linearGradient>

                            <linearGradient id="groundGradMob" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#16a34a"/>
                                <stop offset="100%" stop-color="#14532d"/>
                            </linearGradient>

                            <linearGradient id="balloonGradMob" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stop-color="#f43f5e"/>
                                <stop offset="60%" stop-color="#e11d48"/>
                                <stop offset="100%" stop-color="#9f1239"/>
                            </linearGradient>

                            <filter id="glowGoldMob" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                            </filter>
                        </defs>

                        <!-- Himmel -->
                        <rect x="0" y="0" width="360" height="94" fill="url(#skyGradMob)" rx="10"/>

                        <!-- Drivende skyer med levende animation -->
                        <g opacity="0.35">
                            <g>
                                <path d="M 25 15 Q 40 8 55 15 Q 70 8 85 15 A 8 8 0 0 1 80 25 L 30 25 A 8 8 0 0 1 25 15 Z" fill="#ffffff"/>
                                <animateTransform attributeName="transform" type="translate" values="0,0; 25,0; 0,0" dur="20s" repeatCount="infinite"/>
                            </g>
                            <g>
                                <path d="M 270 12 Q 285 5 300 12 Q 315 5 330 12 A 8 8 0 0 1 325 22 L 275 22 A 8 8 0 0 1 270 12 Z" fill="#ffffff"/>
                                <animateTransform attributeName="transform" type="translate" values="0,0; -20,0; 0,0" dur="24s" repeatCount="infinite"/>
                            </g>
                        </g>

                        <!-- Jorden i bunden -->
                        <rect x="0" y="74" width="360" height="16" fill="url(#groundGradMob)" rx="0 0 10 10"/>
                        <line x1="0" y1="74" x2="360" y2="74" stroke="#4ade80" stroke-width="1.5" opacity="0.8"/>

                        <!-- Taleren på jorden -->
                        <g class="speaker-figure" transform="translate(65, 48)">
                            <circle cx="0" cy="6" r="4.5" fill="#f8fafc"/>
                            <line x1="0" y1="10" x2="0" y2="19" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
                            <line x1="0" y1="13" x2="8" y2="17" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
                            <line x1="0" y1="13" x2="-6" y2="18" stroke="#f8fafc" stroke-width="1.5" stroke-linecap="round"/>
                            <line x1="0" y1="19" x2="-4" y2="26" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
                            <line x1="0" y1="19" x2="4" y2="26" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
                            <text x="0" y="34" font-size="9" fill="#cbd5e1" text-anchor="middle" font-weight="700">Taleren</text>
                        </g>

                        <!-- TØJRESNOR & ANKER (Trin 1 live animation) -->
                        <g id="tether-group">
                            <path id="tether-rope" d="M 260 42 Q 170 58 75 74" 
                                  stroke="#fbbf24" stroke-width="2" stroke-dasharray="250" stroke-dashoffset="250" 
                                  fill="none" filter="url(#glowGoldMob)" stroke-linecap="round"/>
                            
                            <!-- Animeret energistrøm gennem tøjresnoren -->
                            <path id="tether-rope-flux" d="M 260 42 Q 170 58 75 74" 
                                  stroke="#fef08a" stroke-width="2.5" stroke-dasharray="8 8" 
                                  fill="none" opacity="0" stroke-linecap="round">
                                <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="0.9s" repeatCount="infinite"/>
                            </path>
                            
                            <g id="ground-anchor" transform="translate(75, 74) scale(0)" opacity="0">
                                <!-- Udvidende anker-ringe -->
                                <circle cx="0" cy="0" r="3" fill="none" stroke="#fbbf24" stroke-width="1.5">
                                    <animate attributeName="r" values="3; 14; 3" dur="2s" repeatCount="infinite"/>
                                    <animate attributeName="opacity" values="0.9; 0.1; 0.9" dur="2s" repeatCount="infinite"/>
                                </circle>
                                <circle cx="0" cy="0" r="3" fill="#fbbf24"/>
                                <path d="M -6 1.5 Q 0 8 6 1.5" stroke="#fbbf24" stroke-width="2" fill="none" stroke-linecap="round"/>
                                <line x1="0" y1="-1.5" x2="0" y2="5" stroke="#fbbf24" stroke-width="1.5"/>
                            </g>
                        </g>

                        <!-- Landing-chokbølge ved jorden (aktiveres ved trin >= 4) -->
                        <g id="landing-ripple" transform="translate(260, 74)" opacity="0">
                            <ellipse cx="0" cy="0" rx="4" ry="2" fill="none" stroke="#4ade80" stroke-width="2">
                                <animate attributeName="rx" values="4; 34; 4" dur="2s" repeatCount="infinite"/>
                                <animate attributeName="ry" values="2; 8; 2" dur="2s" repeatCount="infinite"/>
                                <animate attributeName="opacity" values="0.9; 0.1; 0.9" dur="2s" repeatCount="infinite"/>
                            </ellipse>
                        </g>

                        <!-- LUFTBALLONEN (Ordet "barn") -->
                        <g id="balloon-craft" class="balloon-craft balloon-floating-anim" transform="translate(260, 31)">
                            <!-- Ballon kuppel -->
                            <path d="M 0 -17 C -17 -17 -22 2 -8 14 L -4 18 L 4 18 L 8 14 C 22 2 17 -17 0 -17 Z" 
                                  fill="url(#balloonGradMob)" stroke="#fda4af" stroke-width="1.2" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.35))"/>
                            
                            <!-- Mønsterstribe -->
                            <path d="M 0 -17 C -6 -17 -8 2 -2 18 L 2 18 C 8 2 6 -17 0 -17 Z" fill="rgba(255,255,255,0.25)"/>

                            <!-- Tidsmotor / flamme (Trin 2 live med levende flamme-animation) -->
                            <g id="burner-flame" opacity="0" transform="translate(0, 19)">
                                <circle cx="0" cy="2" r="3.5" fill="#f59e0b" filter="url(#glowGoldMob)">
                                    <animate attributeName="r" values="3; 5.5; 3" dur="0.45s" repeatCount="infinite"/>
                                    <animate attributeName="opacity" values="0.7; 1; 0.7" dur="0.45s" repeatCount="infinite"/>
                                </circle>
                                <polygon points="-2,1 0,-3 2,1" fill="#fbbf24">
                                    <animate attributeName="points" values="-2,1 0,-3 2,1; -2.5,1.5 0,-5.5 2.5,1.5; -2,1 0,-3 2,1" dur="0.32s" repeatCount="infinite"/>
                                </polygon>
                                <polygon points="-1,1 0,-1.5 1,1" fill="#ffffff">
                                    <animate attributeName="opacity" values="0.6; 1; 0.6" dur="0.22s" repeatCount="infinite"/>
                                </polygon>
                            </g>

                            <!-- Snore til kurven -->
                            <line x1="-4" y1="18" x2="-5" y2="23" stroke="#e2e8f0" stroke-width="1"/>
                            <line x1="4" y1="18" x2="5" y2="23" stroke="#e2e8f0" stroke-width="1"/>

                            <!-- Kurven -->
                            <rect x="-13" y="23" width="26" height="14" rx="3" fill="#78350f" stroke="#b45309" stroke-width="1.2"/>

                            <!-- Teksten BARN (TYDELIG) -->
                            <text x="0" y="34" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="0.3">
                                barn
                            </text>

                            <!-- Svævende status over ballonen -->
                            <g id="balloon-badge" transform="translate(0, -23)">
                                <rect x="-50" y="-8" width="100" height="16" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="1"/>
                                <text id="balloon-badge-text" x="0" y="3.5" fill="#38bdf8" font-size="8.5" font-weight="800" text-anchor="middle">
                                    🎈 Abstrakt (svæver)
                                </text>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>

            <!-- INTEGRERET SÆTNINGSBÅND I ÉN FLOT RÆKKE -->
            <div class="compact-strip-container">
                <div class="strip-header-title">Sætningen:</div>
                <div class="slots-mobile-row">
                    <span class="slot-item slot-empty" id="live-slot-noun">1. Anker ?</span>
                    <span class="slot-item slot-fixed">barn</span>
                    <span class="slot-item slot-empty" id="live-slot-verb">2. Tid ?</span>
                </div>
            </div>
        </div>
    `;

    viewContainer.appendChild(stageCard);

    // ==========================================================
    // INTERAKTIONS-OMRÅDET (SYNLIGT MED DET SAMME PÅ MOBIL)
    // ==========================================================
    const interactionCard = document.createElement('div');
    interactionCard.className = 'grounding-mobile-task-card';
    viewContainer.appendChild(interactionCard);

    // DOM referencer
    const stageFrame = stageCard.querySelector('.stage-frame-wrapper');

    function flashStage() {
        if (stageFrame) {
            stageFrame.classList.remove('pulse-stage-glow');
            void stageFrame.offsetWidth;
            stageFrame.classList.add('pulse-stage-glow');
            setTimeout(() => stageFrame.classList.remove('pulse-stage-glow'), 600);
        }
    }

    const balloonCraft = stageCard.querySelector('#balloon-craft');
    const tetherRope = stageCard.querySelector('#tether-rope');
    const tetherRopeFlux = stageCard.querySelector('#tether-rope-flux');
    const groundAnchor = stageCard.querySelector('#ground-anchor');
    const burnerFlame = stageCard.querySelector('#burner-flame');
    const landingRipple = stageCard.querySelector('#landing-ripple');
    const balloonBadgeText = stageCard.querySelector('#balloon-badge-text');

    const liveSlotNoun = stageCard.querySelector('#live-slot-noun');
    const liveSlotVerb = stageCard.querySelector('#live-slot-verb');

    // Opdater synkron scene
    function updateLiveStage() {
        if (!state.nounAnchor) {
            tetherRope.style.strokeDashoffset = '250';
            groundAnchor.style.transform = 'translate(75px, 74px) scale(0)';
            groundAnchor.style.opacity = '0';
            if (tetherRopeFlux) tetherRopeFlux.style.opacity = '0';
            balloonBadgeText.textContent = '🎈 Abstrakt (svæver)';
            balloonBadgeText.style.fill = '#38bdf8';
            liveSlotNoun.className = 'slot-item slot-empty';
            liveSlotNoun.textContent = '1. Anker ?';
        } else {
            tetherRope.style.strokeDashoffset = '0';
            tetherRope.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            groundAnchor.style.transform = 'translate(75px, 74px) scale(1)';
            groundAnchor.style.opacity = '1';
            groundAnchor.style.transition = 'transform 0.4s ease 0.6s, opacity 0.4s ease 0.6s';

            if (tetherRopeFlux) {
                tetherRopeFlux.style.opacity = '0.95';
                tetherRopeFlux.style.transition = 'opacity 0.6s ease 0.5s';
            }

            balloonBadgeText.textContent = `⚓ Forankret: "${state.nounAnchor}"`;
            balloonBadgeText.style.fill = '#fcd34d';

            liveSlotNoun.className = 'slot-item slot-active-noun';
            liveSlotNoun.textContent = state.nounAnchor;
        }

        if (!state.verbAnchor) {
            burnerFlame.style.opacity = '0';
            liveSlotVerb.className = 'slot-item slot-empty';
            liveSlotVerb.textContent = '2. Tid ?';
        } else {
            burnerFlame.style.opacity = '1';
            burnerFlame.style.transition = 'opacity 0.4s ease';

            liveSlotVerb.className = 'slot-item slot-active-verb';
            liveSlotVerb.textContent = state.verbAnchor;

            balloonBadgeText.textContent = `⏰ I tid: "${state.verbAnchor}"`;
            balloonBadgeText.style.fill = '#4ade80';
        }

        if (state.step >= 4) {
            balloonCraft.classList.remove('balloon-floating-anim');
            balloonCraft.style.transform = 'translate(260px, 46px)';
            balloonCraft.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            if (landingRipple) {
                landingRipple.style.opacity = '1';
                landingRipple.style.transition = 'opacity 0.6s ease 0.8s';
            }
            balloonBadgeText.textContent = `🌱 Landet på jorden!`;
            balloonBadgeText.style.fill = '#4ade80';
        } else {
            balloonCraft.classList.add('balloon-floating-anim');
            balloonCraft.style.transform = '';
            if (landingRipple) {
                landingRipple.style.opacity = '0';
            }
        }

        flashStage();
    }

    // Skift trin
    function renderStep() {
        interactionCard.innerHTML = '';

        if (state.step === 1) {
            renderNounStep();
        } else if (state.step === 2) {
            renderVerbStep();
        } else if (state.step === 3) {
            renderAssembleStep();
        } else if (state.step === 4) {
            renderVisualExplorationStep();
        } else if (state.step === 5) {
            renderFinalBridgeStep();
        }

        updateLiveStage();
    }

    // -------------------------------------------------------------
    // TRIN 1: RUMMET / RELATIONEN (Substantiv-ankeret)
    // -------------------------------------------------------------
    function renderNounStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box-flow animate-in';

        stepDiv.innerHTML = `
            <div class="task-step-pill">Trin 1 af 3: Rumligt anker</div>
            <h2 class="task-step-h2">${getTranslation('groundingStep1')}</h2>
            <p class="task-step-p">
                Ordet <strong>"barn"</strong> svæver abstrakt oppe i luften. Vælg et anker, der tøjrer barnet til virkeligheden:
            </p>

            <div class="cards-layout-2x2">
                <button type="button" class="mobile-anchor-btn" data-anchor="Mit">
                    <div class="btn-top">
                        <span class="btn-emoji">🏷️</span>
                        <span class="btn-word">Mit</span>
                    </div>
                    <div class="btn-role">${getTranslation('relation') || 'Relation (ejerskab)'}</div>
                    <div class="btn-subtext">Barnet tilhører taleren.</div>
                </button>

                <button type="button" class="mobile-anchor-btn" data-anchor="Et">
                    <div class="btn-top">
                        <span class="btn-emoji">🔦</span>
                        <span class="btn-word">Et</span>
                    </div>
                    <div class="btn-role">${getTranslation('indefinite') || 'Ubestemt (et af mange)'}</div>
                    <div class="btn-subtext">Et vilkårligt barn blandt mange.</div>
                </button>

                <button type="button" class="mobile-anchor-btn" data-anchor="Det">
                    <div class="btn-top">
                        <span class="btn-emoji">👉</span>
                        <span class="btn-word">Det</span>
                    </div>
                    <div class="btn-role">${getTranslation('pointing') || 'Udpegning (på afstand)'}</div>
                    <div class="btn-subtext">Barnet derovre på afstand.</div>
                </button>

                <button type="button" class="mobile-anchor-btn" data-anchor="Dette">
                    <div class="btn-top">
                        <span class="btn-emoji">📍</span>
                        <span class="btn-word">Dette</span>
                    </div>
                    <div class="btn-role">${getTranslation('nearness') || 'Nærhed (lige her)'}</div>
                    <div class="btn-subtext">Barnet lige her i nærværet.</div>
                </button>
            </div>
        `;

        stepDiv.querySelectorAll('.mobile-anchor-btn').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.getAttribute('data-anchor');
                state.nounAnchor = chosen;
                btn.classList.add('selected-active');

                speakDanish(chosen + ' barn');
                updateLiveStage();

                setTimeout(() => {
                    state.step = 2;
                    renderStep();
                }, 650);
            };
        });

        interactionCard.appendChild(stepDiv);
    }

    // -------------------------------------------------------------
    // TRIN 2: TIDEN (Verbum-ankeret)
    // -------------------------------------------------------------
    function renderVerbStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box-flow animate-in';

        stepDiv.innerHTML = `
            <div class="task-step-pill">Trin 2 af 3: Tidsanker</div>
            <h2 class="task-step-h2">${getTranslation('groundingStep2')}</h2>
            <p class="task-step-p">
                Handlingen <strong>"at spise"</strong> skal have et tidspunkt for at finde sted:
            </p>

            <div class="cards-layout-stack">
                <button type="button" class="mobile-anchor-btn" data-verb="spiser">
                    <div class="btn-top">
                        <span class="btn-emoji">🟢</span>
                        <span class="btn-word">spiser</span>
                    </div>
                    <div class="btn-role" style="color: #4ade80;">Lige nu (${getTranslation('presentTense') || 'Nutid'})</div>
                    <div class="btn-subtext">Handlingen sker lige nu i nutiden.</div>
                </button>

                <button type="button" class="mobile-anchor-btn" data-verb="spiste">
                    <div class="btn-top">
                        <span class="btn-emoji">📍</span>
                        <span class="btn-word">spiste</span>
                    </div>
                    <div class="btn-role" style="color: #f87171;">I går / fortid (${getTranslation('pastTense') || 'Datid'})</div>
                    <div class="btn-subtext">Handlingen skete i fortiden.</div>
                </button>

                <button type="button" class="mobile-anchor-btn" data-verb="skal spise">
                    <div class="btn-top">
                        <span class="btn-emoji">🔵</span>
                        <span class="btn-word">skal spise</span>
                    </div>
                    <div class="btn-role" style="color: #38bdf8;">Planlagt (${getTranslation('futureTense') || 'Fremtid'})</div>
                    <div class="btn-subtext">Handlingen er planlagt ude i fremtiden.</div>
                </button>
            </div>
        `;

        stepDiv.querySelectorAll('.mobile-anchor-btn').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.getAttribute('data-verb');
                state.verbAnchor = chosen;
                btn.classList.add('selected-active');

                speakDanish(chosen);
                updateLiveStage();

                setTimeout(() => {
                    state.step = 3;
                    renderStep();
                }, 650);
            };
        });

        interactionCard.appendChild(stepDiv);
    }

    // -------------------------------------------------------------
    // TRIN 3: GROUNDING (Landing på jorden)
    // -------------------------------------------------------------
    function renderAssembleStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box-flow animate-in';

        // Bland brikkerne, så de ikke allerede står i korrekt rækkefølge
        const initialWords = ['barn', state.nounAnchor, state.verbAnchor];
        const shuffledWords = [...initialWords].sort(() => Math.random() - 0.5);

        stepDiv.innerHTML = `
            <div class="task-step-pill">Trin 3 af 3: Landing på Jorden</div>
            <h2 class="task-step-h2">${getTranslation('groundingStep3')}</h2>
            <p class="task-step-p">
                Tryk på brikkerne i rigtig rækkefølge for at samle sætningen på jorden:
            </p>

            <div class="assembly-source-area">
                <div class="area-tag-label">Tryk på brikkerne for at placere dem på jorden:</div>
                <div class="chips-pool-row" id="drag-source">
                    ${shuffledWords.map(w => `<button type="button" class="tap-brick-btn" data-word="${w}">${w}</button>`).join('')}
                </div>
            </div>

            <div class="assembly-ground-zone">
                <div class="ground-zone-title">🌱 Jorden (The Ground):</div>
                <div class="chips-landing-row" id="drag-target"></div>
            </div>

            <div class="assembly-actions-row">
                <button type="button" class="btn-confirm-ground" id="btn-check-assembly">
                    <span>⚓</span>
                    <span>${getTranslation('checkResult')}</span>
                </button>
                <button type="button" class="btn-reset-ground" id="btn-reset-slots">
                    Nulstil 🔄
                </button>
            </div>

            <div class="assembly-feedback-banner" id="assembly-feedback" style="display: none;"></div>
        `;

        const sourceRow = stepDiv.querySelector('#drag-source');
        const targetRow = stepDiv.querySelector('#drag-target');
        const checkBtn = stepDiv.querySelector('#btn-check-assembly');
        const resetBtn = stepDiv.querySelector('#btn-reset-slots');
        const feedbackBox = stepDiv.querySelector('#assembly-feedback');

        function attachEvents() {
            sourceRow.querySelectorAll('.tap-brick-btn').forEach(brick => {
                brick.onclick = () => {
                    targetRow.appendChild(brick);
                    brick.classList.add('brick-placed');
                    speakDanish(brick.dataset.word);
                    attachEvents();
                };
            });

            targetRow.querySelectorAll('.tap-brick-btn').forEach(brick => {
                brick.onclick = () => {
                    sourceRow.appendChild(brick);
                    brick.classList.remove('brick-placed');
                    attachEvents();
                };
            });
        }
        attachEvents();

        resetBtn.onclick = () => {
            targetRow.querySelectorAll('.tap-brick-btn').forEach(b => {
                sourceRow.appendChild(b);
                b.classList.remove('brick-placed');
            });
            feedbackBox.style.display = 'none';
        };

        checkBtn.onclick = () => {
            const placedWords = Array.from(targetRow.querySelectorAll('.tap-brick-btn')).map(b => b.dataset.word.trim());
            const constructed = placedWords.join(' ').toLowerCase();
            const expected = `${state.nounAnchor} barn ${state.verbAnchor}`.toLowerCase();

            if (constructed === expected) {
                const fullSentence = `${state.nounAnchor} barn ${state.verbAnchor}.`;
                feedbackBox.style.display = 'block';
                feedbackBox.className = 'assembly-feedback-banner success';
                feedbackBox.innerHTML = `
                    <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.2rem;">
                        🎉 ${getTranslation('groundingSuccess')}
                    </div>
                    <div style="font-size: 1.15rem; color: #f8fafc; font-weight: 800; margin-bottom: 0.3rem;">
                        "${fullSentence}"
                    </div>
                    <p style="margin: 0; color: #e2e8f0; font-size: 0.95rem;">
                        Ballonen er landet trygt på jorden! Sætningen har nu jordforbindelse.
                    </p>
                `;

                speakDanish(fullSentence);
                checkBtn.disabled = true;

                state.step = 4;
                updateLiveStage();

                setTimeout(() => {
                    renderStep();
                }, 1500);
            } else {
                feedbackBox.style.display = 'block';
                feedbackBox.className = 'assembly-feedback-banner error';
                feedbackBox.innerHTML = `
                    <strong>${getTranslation('wrongOrder')}</strong><br>
                    Rækkefølgen er: Først anker (<em>${state.nounAnchor}</em>), derefter <em>barn</em> og til sidst <em>${state.verbAnchor}</em>.
                `;
            }
        };

        interactionCard.appendChild(stepDiv);
    }

    // -------------------------------------------------------------
    // TRIN 4: VISUEL FORANKRING (Scenen & Tidsaksen)
    // -------------------------------------------------------------
    function renderVisualExplorationStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box-flow animate-in';

        const anchor = state.nounAnchor;
        let sceneTitle = '';
        let sceneHtml = '';

        if (anchor === 'Mit') {
            sceneTitle = getTranslation('groundingRelation');
            sceneHtml = `
                <div class="scene-frame-inner">
                    <svg viewBox="0 0 320 120" class="scene-vector-svg">
                        <circle cx="100" cy="40" r="13" fill="#38bdf8"/>
                        <path d="M 85 68 Q 100 58 115 68 L 115 105 L 85 105 Z" fill="#0284c7"/>
                        <circle cx="180" cy="58" r="9" fill="#f43f5e"/>
                        <path d="M 170 78 Q 180 70 190 78 L 190 105 L 170 105 Z" fill="#e11d48"/>
                        
                        <!-- Forbindende kærligheds-/relationsbue med aktivt strømmende partikler -->
                        <path d="M 115 74 Q 148 60 170 80" stroke="#f43f5e" stroke-width="3" stroke-dasharray="6 4" fill="none" stroke-linecap="round">
                            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.9s" repeatCount="infinite"/>
                        </path>
                        
                        <!-- Pulserende hjerte-ikon -->
                        <text x="145" y="55" font-size="16" text-anchor="middle">
                            ❤️
                            <animate attributeName="font-size" values="14; 18; 14" dur="1.2s" repeatCount="infinite"/>
                        </text>
                        <text x="100" y="115" font-size="11" fill="#cbd5e1" font-weight="700" text-anchor="middle">Mig (taleren)</text>
                        <text x="180" y="115" font-size="11" fill="#cbd5e1" font-weight="700" text-anchor="middle">Mit barn</text>
                    </svg>
                </div>
            `;
        } else if (anchor === 'Et') {
            sceneTitle = getTranslation('groundingIndefinite');
            sceneHtml = `
                <div class="scene-frame-inner">
                    <svg viewBox="0 0 320 120" class="scene-vector-svg">
                        <!-- Lysende kegle/spotlight der pulserer -->
                        <polygon points="160,10 90,110 230,110" fill="rgba(250, 204, 21, 0.22)">
                            <animate attributeName="opacity" values="0.7; 1; 0.7" dur="2s" repeatCount="infinite"/>
                        </polygon>
                        <g opacity="0.35">
                            <circle cx="70" cy="65" r="8" fill="#94a3b8"/>
                            <path d="M 62 80 Q 70 75 78 80 L 78 105 L 62 105 Z" fill="#64748b"/>
                            <circle cx="250" cy="65" r="8" fill="#94a3b8"/>
                            <path d="M 242 80 Q 250 75 258 80 L 258 105 L 242 105 Z" fill="#64748b"/>
                        </g>
                        <!-- Udvalgt barn med pulserende lyskrone -->
                        <circle cx="160" cy="60" r="10" fill="#facc15" filter="drop-shadow(0 0 6px #facc15)">
                            <animate attributeName="r" values="9.5; 11.5; 9.5" dur="1.5s" repeatCount="infinite"/>
                        </circle>
                        <path d="M 150 80 Q 160 72 170 80 L 170 105 L 150 105 Z" fill="#eab308"/>
                        <text x="160" y="115" font-size="11" fill="#facc15" font-weight="800" text-anchor="middle">Et barn (i mængden)</text>
                    </svg>
                </div>
            `;
        } else if (anchor === 'Det') {
            sceneTitle = getTranslation('groundingDistal');
            sceneHtml = `
                <div class="scene-frame-inner">
                    <svg viewBox="0 0 320 120" class="scene-vector-svg">
                        <g transform="translate(60, 35)">
                            <circle cx="0" cy="10" r="11" fill="#38bdf8"/>
                            <path d="M -11 32 Q 0 22 11 32 L 11 68 L -11 68 Z" fill="#0284c7"/>
                            <line x1="8" y1="34" x2="42" y2="29" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>
                        </g>
                        <!-- Animeret udpegende laser-/strålelinje mod barnet -->
                        <line x1="110" y1="65" x2="230" y2="65" stroke="#38bdf8" stroke-width="3" stroke-dasharray="8 5">
                            <animate attributeName="stroke-dashoffset" from="26" to="0" dur="0.8s" repeatCount="infinite"/>
                        </line>
                        <polygon points="230,62 238,65 230,68" fill="#38bdf8"/>
                        <g transform="translate(260, 50)">
                            <circle cx="0" cy="9" r="8.5" fill="#f43f5e"/>
                            <path d="M -8 24 Q 0 16 8 24 L 8 55 L -8 55 Z" fill="#e11d48"/>
                        </g>
                        <text x="60" y="115" font-size="11" fill="#cbd5e1" font-weight="700" text-anchor="middle">Taleren</text>
                        <text x="260" y="115" font-size="11" fill="#38bdf8" font-weight="800" text-anchor="middle">Det barn (på afstand)</text>
                    </svg>
                </div>
            `;
        } else {
            sceneTitle = getTranslation('groundingProximal');
            sceneHtml = `
                <div class="scene-frame-inner">
                    <svg viewBox="0 0 320 120" class="scene-vector-svg">
                        <!-- Nærhedssfære med pulserende omkreds -->
                        <ellipse cx="160" cy="70" rx="80" ry="34" fill="rgba(56, 189, 248, 0.14)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 5">
                            <animate attributeName="stroke-dashoffset" from="0" to="26" dur="1.4s" repeatCount="infinite"/>
                            <animate attributeName="rx" values="78; 83; 78" dur="2s" repeatCount="infinite"/>
                        </ellipse>
                        <g transform="translate(135, 40)">
                            <circle cx="0" cy="10" r="11" fill="#38bdf8"/>
                            <path d="M -11 32 Q 0 22 11 32 L 11 64 L -11 64 Z" fill="#0284c7"/>
                        </g>
                        <g transform="translate(185, 50)">
                            <circle cx="0" cy="9" r="8.5" fill="#f43f5e"/>
                            <path d="M -8 24 Q 0 16 8 24 L 8 54 L -8 54 Z" fill="#e11d48"/>
                        </g>
                        <text x="160" y="115" font-size="11" fill="#38bdf8" font-weight="800" text-anchor="middle">Dette barn (lige her)</text>
                    </svg>
                </div>
            `;
        }

        let tenseLabel = getTranslation('presentTense');
        let pointerPercent = '50%';
        let tenseColor = '#4ade80';

        if (state.verbAnchor === 'spiste') {
            tenseLabel = getTranslation('pastTense');
            pointerPercent = '15%';
            tenseColor = '#f87171';
        } else if (state.verbAnchor === 'skal spise') {
            tenseLabel = getTranslation('futureTense');
            pointerPercent = '85%';
            tenseColor = '#38bdf8';
        }

        stepDiv.innerHTML = `
            <div class="task-step-pill" style="background: rgba(34, 197, 94, 0.2); color: #4ade80;">
                Forankring bekræftet!
            </div>
            <h2 class="task-step-h2">"${state.nounAnchor} barn ${state.verbAnchor}."</h2>

            <div class="result-card-box">
                <div class="result-card-h3">${sceneTitle}</div>
                ${sceneHtml}
            </div>

            <div class="result-card-box">
                <div class="timeline-header-compact">
                    <span class="timeline-label-title">Handlingen i tiden:</span>
                    <span class="timeline-tense-badge" style="color: ${tenseColor}; border-color: ${tenseColor};">
                        ${state.verbAnchor} (${tenseLabel})
                    </span>
                </div>
                <div class="timeline-track-compact">
                    <div class="track-center-line"></div>
                    <div class="track-labels-row">
                        <span class="time-step ${state.verbAnchor === 'spiste' ? 'active' : ''}">Fortid</span>
                        <span class="time-step ${state.verbAnchor === 'spiser' ? 'active' : ''}">Nutid</span>
                        <span class="time-step ${state.verbAnchor === 'skal spise' ? 'active' : ''}">Fremtid</span>
                    </div>
                    <div class="track-glow-dot" style="left: ${pointerPercent}; background: ${tenseColor};"></div>
                </div>
            </div>

            <div style="margin-top: 1.5rem; text-align: center;">
                <button type="button" class="btn-continue-chain" id="btn-goto-final">
                    <span>Se hele grammatik-rejsen ➔</span>
                </button>
            </div>
        `;

        stepDiv.querySelector('#btn-goto-final').onclick = () => {
            state.step = 5;
            renderStep();
        };

        interactionCard.appendChild(stepDiv);
    }

    // -------------------------------------------------------------
    // TRIN 5: HELE GRAMMATIK-REJSEN (Fra Intro til Konjunktioner)
    // -------------------------------------------------------------
    function renderFinalBridgeStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box-flow animate-in';

        const completedSentence = `${state.nounAnchor} barn ${state.verbAnchor}.`;

        stepDiv.innerHTML = `
            <div class="celebration-hero-card">
                <div class="celebration-icon">🏆</div>
                <h2 style="font-size: 1.6rem; color: white; margin-bottom: 0.6rem; font-weight: 800;">
                    Grundsætningen er forankret!
                </h2>
                <div class="current-sentence-badge-box">
                    <span class="cs-label">Din sætning nu:</span>
                    <div class="cs-sentence-row">
                        <span class="cs-word tag-subjekt">${state.nounAnchor} barn</span>
                        <span class="cs-word tag-verbum">${state.verbAnchor}.</span>
                    </div>
                    <div class="cs-tags-legend">
                        <span class="legend-pill tag-subjekt-pill"><span class="legend-dot" style="background:#22c55e;"></span> Subjekt (Grøn)</span>
                        <span class="legend-pill tag-verbum-pill"><span class="legend-dot" style="background:#ef4444;"></span> Verbum (Rød)</span>
                    </div>
                    <button type="button" class="btn-hear-sentence" id="btn-speak-final" style="margin-top: 0.75rem;">
                        <span>🔊</span>
                        <span>Lyt til sætningen</span>
                    </button>
                </div>
                <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 540px; margin: 1rem auto 0; line-height: 1.5;">
                    ${getTranslation('groundingFinalMsg')}
                </p>
            </div>

            <!-- MODAL TEASER KNAP -->
            <div class="modal-callout-card">
                <h3 style="color: #fbbf24; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.4rem;">
                    Tag "${completedSentence}" med ind i Modalverber
                </h3>
                <p style="color: #f1f5f9; font-size: 0.95rem; max-width: 520px; margin: 0 auto 1.2rem; line-height: 1.45;">
                    Hvad sker der, når barnet ikke bare <em>spiser</em>, men <strong>vil</strong>, <strong>skal</strong> eller <strong>må</strong> spise?
                </p>
                <button type="button" class="btn-primary-modal-launch" id="btn-start-modal-chain">
                    <span>${getTranslation('nextStepModalVerbs')} ➔</span>
                </button>
            </div>

            <div style="text-align: center; margin-top: 1.25rem; margin-bottom: 1.25rem;">
                <button type="button" class="btn-text-restart" id="btn-restart-all">
                    Prøv med et andet anker 🔄
                </button>
            </div>

            <!-- RELEVANT LINK TIL ORDSTILLINGSFLADEN: DEL 1 (GRUNDSÆTNINGENS 4 LED) -->
            <div class="ordstilling-bridge-link-card">
                <div class="obl-left">
                    <span class="obl-icon">📐</span>
                    <div class="obl-text">
                        <span class="obl-badge">Ordstilling</span>
                        <div class="obl-title">Grundsætningens 4 led (Enkel model)</div>
                        <div class="obl-desc">Lær hvordan Subjekt, Verbum, Sted og Tid danner den grundlæggende danske sætning.</div>
                    </div>
                </div>
                <a href="#/${getLang()}/ordstilling_intro/part1" class="btn-goto-ordstilling" id="btn-link-ordstilling-grounding">
                    <span>Gå til Ordstilling (Del 1) ➔</span>
                </a>
            </div>
        `;

        stepDiv.querySelector('#btn-speak-final').onclick = () => speakDanish(completedSentence);

        // Link til ordstilling del 1
        const btnLinkOrdstilling = stepDiv.querySelector('#btn-link-ordstilling-grounding');
        if (btnLinkOrdstilling) {
            btnLinkOrdstilling.onclick = (e) => {
                e.preventDefault();
                navigateFn('ordstilling_intro', { subPath: 'part1' });
            };
        }

        stepDiv.querySelector('#btn-start-modal-chain').onclick = () => {
            navigateFn('modal_force', {
                nounAnchor: state.nounAnchor,
                verbAnchor: state.verbAnchor,
                selectedNoun: 'barn',
                selectedVerb: state.verbAnchor
            });
        };

        stepDiv.querySelector('#btn-restart-all').onclick = () => {
            state.step = 1;
            state.nounAnchor = '';
            state.verbAnchor = '';
            renderStep();
        };

        interactionCard.appendChild(stepDiv);
    }

    renderStep();

    // ==========================================================
    // 100% MOBIL-SIKRE STYLES (INGEN VANDRET OVERFLOW)
    // ==========================================================
    const oldMobile = document.getElementById('grounding-mobile-styles');
    if (oldMobile) oldMobile.remove();
    const oldCompact = document.getElementById('grounding-compact-styles');
    if (oldCompact) oldCompact.remove();
    const oldStyles = document.getElementById('grounding-view-styles');
    if (oldStyles) oldStyles.remove();

    const style = document.createElement('style');
    style.id = 'grounding-mobile-styles';
    style.textContent = `
        .grounding-mobile-view {
            width: 100% !important;
            max-width: 760px !important;
            margin: 0 auto;
            padding: 0 0.2rem 2.5rem !important;
            box-sizing: border-box;
            color: #f8fafc;
        }

        .grounding-mobile-view .top-bar {
            margin-bottom: 0.35rem !important;
        }

        .grounding-mobile-view .grammar-nav-menu {
            margin-bottom: 0.5rem !important;
            padding: 0.25rem 0 !important;
        }

            /* Header */
            .grounding-hero-compact {
                text-align: center;
                margin-bottom: 0.75rem;
                padding: 0 0.4rem;
                width: 100%;
                box-sizing: border-box;
            }
            .grounding-step-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                background: rgba(56, 189, 248, 0.15);
                border: 1px solid rgba(56, 189, 248, 0.35);
                padding: 0.2rem 0.65rem;
                border-radius: 9999px;
                font-size: 0.78rem;
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
            .grounding-main-title {
                font-size: 1.45rem;
                font-weight: 800;
                margin: 0 0 0.25rem;
                color: #ffffff;
                line-height: 1.25;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }
            .grounding-sub-desc {
                color: #cbd5e1;
                font-size: 0.92rem;
                max-width: 600px;
                margin: 0 auto;
                line-height: 1.4;
            }

            /* KLÆBENDE SCENE-RAMME (SMART STICKY HUD) */
            .grounding-stage-compact {
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
                border-color: var(--grounding-accent, #38bdf8) !important;
                box-shadow: 0 0 25px var(--grounding-accent, rgba(56, 189, 248, 0.6)) !important;
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
                max-height: 125px;
                overflow: hidden;
                transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
                opacity: 1;
            }
            .stage-frame-wrapper.is-collapsed .stage-svg-body {
                max-height: 0;
                opacity: 0;
            }

            .sky-frame-mobile {
                width: 100%;
                max-width: 100%;
                border-radius: 0;
                overflow: hidden;
            }
            .sky-svg-fluid {
                width: 100%;
                max-width: 100%;
                height: auto;
                display: block;
                aspect-ratio: 360 / 94;
            }

            /* Integreret sætningsbånd */
            .compact-strip-container {
                margin-top: 0.6rem;
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                padding: 0.45rem 0.6rem;
                display: flex;
                flex-direction: column;
                gap: 0.35rem;
            }
            .strip-header-title {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #94a3b8;
                font-weight: 700;
            }
            .slots-mobile-row {
                display: flex;
                gap: 0.4rem;
                width: 100%;
                box-sizing: border-box;
            }
            .slot-item {
                flex: 1;
                min-width: 0;
                padding: 0.45rem 0.2rem;
                border-radius: 6px;
                font-size: 1rem;
                font-weight: 800;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                box-sizing: border-box;
            }
            .slot-empty {
                background: rgba(255, 255, 255, 0.04);
                border: 1.5px dashed rgba(255, 255, 255, 0.25);
                color: #94a3b8;
                font-size: 0.85rem;
                font-weight: 700;
            }
            .slot-fixed {
                background: rgba(34, 197, 94, 0.15);
                border: 1.5px solid rgba(34, 197, 94, 0.4);
                color: #86efac;
            }
            .slot-active-noun {
                background: rgba(34, 197, 94, 0.25);
                border: 1.5px solid #22c55e;
                color: #4ade80;
            }
            .slot-active-verb {
                background: rgba(239, 68, 68, 0.25);
                border: 1.5px solid #ef4444;
                color: #f87171;
            }

            /* Nuværende sætning boks & globale grammatik tags */
            .current-sentence-badge-box {
                background: rgba(15, 23, 42, 0.85);
                border: 1.5px solid rgba(255, 255, 255, 0.15);
                border-radius: 14px;
                padding: 1rem 1.25rem;
                margin: 0.85rem auto 0;
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
                color: #60a5fa;
                background: rgba(2, 132, 199, 0.15);
                border-bottom: 2px solid #0284c7;
                padding: 0.1rem 0.4rem;
                border-radius: 4px;
            }
            .tag-konjunktion {
                color: #c084fc;
                background: rgba(168, 85, 247, 0.15);
                border-bottom: 2px solid #a855f7;
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

            /* Opgave-kort */
            .grounding-mobile-task-card {
                background: #1e293b;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 1.15rem 1rem;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
                width: 100%;
                box-sizing: border-box;
            }
            .task-step-pill {
                display: inline-block;
                background: rgba(56, 189, 248, 0.15);
                color: #38bdf8;
                font-size: 0.78rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                padding: 0.2rem 0.6rem;
                border-radius: 5px;
                margin-bottom: 0.35rem;
            }
            .task-step-h2 {
                font-size: 1.35rem;
                font-weight: 800;
                color: white;
                margin: 0 0 0.3rem;
                line-height: 1.3;
            }
            .task-step-p {
                color: #cbd5e1;
                font-size: 1rem;
                margin: 0 0 1rem;
                line-height: 1.45;
            }

            /* Knapper i 2x2 grid */
            .cards-layout-2x2 {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.65rem;
                width: 100%;
                box-sizing: border-box;
            }
            .cards-layout-stack {
                display: flex;
                flex-direction: column;
                gap: 0.65rem;
                width: 100%;
                box-sizing: border-box;
            }
            .mobile-anchor-btn {
                background: #0f172a;
                border: 1.5px solid rgba(255, 255, 255, 0.12);
                border-radius: 12px;
                padding: 0.85rem 0.75rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                width: 100%;
                box-sizing: border-box;
            }
            .mobile-anchor-btn:hover {
                border-color: #38bdf8;
                background: rgba(56, 189, 248, 0.08);
            }
            .mobile-anchor-btn.selected-active {
                border-color: #4ade80 !important;
                background: rgba(34, 197, 94, 0.18) !important;
            }
            .btn-top {
                display: flex;
                align-items: center;
                gap: 0.45rem;
            }
            .btn-emoji {
                font-size: 1.6rem;
            }
            .btn-word {
                font-size: 1.45rem;
                font-weight: 900;
                color: #ffffff;
            }
            .btn-role {
                font-size: 0.92rem;
                color: #38bdf8;
                font-weight: 700;
            }
            .btn-subtext {
                font-size: 0.82rem;
                color: #cbd5e1;
                line-height: 1.35;
            }

            /* Assembly / Puslespil */
            .assembly-source-area {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 0.85rem;
                margin-bottom: 1rem;
            }
            .area-tag-label {
                font-size: 0.85rem;
                color: #cbd5e1;
                font-weight: 700;
                margin-bottom: 0.5rem;
            }
            .chips-pool-row {
                display: flex;
                gap: 0.65rem;
                flex-wrap: wrap;
                min-height: 44px;
                align-items: center;
            }
            .tap-brick-btn {
                background: #1e293b;
                border: 1.5px solid rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 1.2rem;
                font-weight: 800;
                padding: 0.55rem 1.1rem;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .tap-brick-btn.brick-placed {
                background: rgba(34, 197, 94, 0.2);
                border-color: #22c55e;
                color: #86efac;
            }
            .assembly-ground-zone {
                background: rgba(21, 128, 61, 0.15);
                border: 2px dashed rgba(74, 222, 128, 0.5);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1.2rem;
            }
            .ground-zone-title {
                font-size: 0.95rem;
                font-weight: 800;
                color: #4ade80;
                margin-bottom: 0.6rem;
            }
            .chips-landing-row {
                display: flex;
                gap: 0.65rem;
                flex-wrap: wrap;
                min-height: 48px;
                align-items: center;
            }
            .assembly-actions-row {
                display: flex;
                gap: 0.75rem;
                align-items: center;
                flex-wrap: wrap;
            }
            .btn-confirm-ground {
                background: #22c55e;
                color: #0f172a;
                border: none;
                padding: 0.75rem 1.4rem;
                border-radius: 10px;
                font-size: 1.05rem;
                font-weight: 800;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
            }
            .btn-reset-ground {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.25);
                color: #cbd5e1;
                padding: 0.7rem 1rem;
                border-radius: 10px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
            }
            .assembly-feedback-banner {
                margin-top: 1rem;
                padding: 1rem;
                border-radius: 10px;
                line-height: 1.5;
            }
            .assembly-feedback-banner.success {
                background: rgba(34, 197, 94, 0.18);
                border: 1px solid rgba(34, 197, 94, 0.5);
                color: #86efac;
            }
            .assembly-feedback-banner.error {
                background: rgba(239, 68, 68, 0.18);
                border: 1px solid rgba(239, 68, 68, 0.5);
                color: #fca5a5;
            }

            /* Visual Exploration (Trin 4) */
            .result-card-box {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1rem;
            }
            .result-card-h3 {
                font-size: 1rem;
                font-weight: 800;
                color: #38bdf8;
                margin-bottom: 0.6rem;
            }
            .scene-frame-inner {
                width: 100%;
                overflow: hidden;
            }
            .scene-vector-svg {
                width: 100%;
                max-width: 360px;
                height: auto;
                display: block;
                margin: 0 auto;
            }
            .timeline-header-compact {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.75rem;
                font-size: 0.88rem;
                flex-wrap: wrap;
                gap: 0.4rem;
            }
            .timeline-label-title {
                color: #cbd5e1;
                font-weight: 700;
            }
            .timeline-tense-badge {
                font-weight: 800;
                border: 1px solid currentColor;
                padding: 0.15rem 0.5rem;
                border-radius: 5px;
            }
            .timeline-track-compact {
                position: relative;
                padding: 1.2rem 0.4rem 0.4rem;
            }
            .track-center-line {
                height: 4px;
                background: rgba(255, 255, 255, 0.18);
                border-radius: 2px;
                position: absolute;
                top: 50%;
                left: 6%;
                right: 6%;
                transform: translateY(-50%);
            }
            .track-labels-row {
                display: flex;
                justify-content: space-between;
                position: relative;
                z-index: 2;
            }
            .time-step {
                font-size: 0.82rem;
                font-weight: 700;
                color: #94a3b8;
                background: #0f172a;
                padding: 0.15rem 0.45rem;
                border-radius: 4px;
            }
            .time-step.active {
                color: white;
                font-weight: 900;
            }
            .track-glow-dot {
                position: absolute;
                top: 50%;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 10px currentColor;
                z-index: 3;
                transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                animation: pulseGlowDot 1.4s ease-in-out infinite alternate;
            }
            @keyframes pulseGlowDot {
                0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 6px currentColor; }
                100% { transform: translate(-50%, -50%) scale(1.35); box-shadow: 0 0 16px currentColor; }
            }

            /* Animeret svævende luftballon */
            .balloon-floating-anim {
                animation: balloonFloat 3.2s ease-in-out infinite alternate;
            }
            @keyframes balloonFloat {
                0% {
                    transform: translate(260px, 26px);
                }
                50% {
                    transform: translate(260px, 19px);
                }
                100% {
                    transform: translate(260px, 26px);
                }
            }
            .btn-continue-chain {
                background: #38bdf8;
                color: #0f172a;
                border: none;
                padding: 0.8rem 1.6rem;
                border-radius: 12px;
                font-size: 1.05rem;
                font-weight: 800;
                cursor: pointer;
            }

            /* Final Completion (Trin 5) */
            .celebration-hero-card {
                text-align: center;
                margin-bottom: 1.4rem;
            }
            .celebration-icon {
                font-size: 2.4rem;
                margin-bottom: 0.3rem;
            }
            .final-sentence-chip-row {
                display: inline-flex;
                align-items: center;
                gap: 0.6rem;
                background: rgba(34, 197, 94, 0.18);
                border: 1.5px solid rgba(34, 197, 94, 0.5);
                padding: 0.5rem 1.1rem;
                border-radius: 9999px;
                margin-bottom: 0.85rem;
            }
            .final-sentence-text {
                font-size: 1.35rem;
                font-weight: 900;
                color: #4ade80;
            }
            .btn-hear-sentence {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.25);
                color: white;
                padding: 0.25rem 0.65rem;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
            }

            /* Roadmap / Kæden */
            .grammar-roadmap-card {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 14px;
                padding: 1.15rem;
                margin-bottom: 1.4rem;
            }
            .roadmap-header {
                font-size: 0.95rem;
                font-weight: 800;
                color: #38bdf8;
                margin-bottom: 0.8rem;
            }
            .roadmap-steps-list {
                display: flex;
                flex-direction: column;
                gap: 0.55rem;
            }
            .roadmap-step-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 0.65rem 0.85rem;
            }
            .roadmap-step-item.done {
                border-color: rgba(34, 197, 94, 0.4);
                background: rgba(34, 197, 94, 0.1);
            }
            .roadmap-step-item.next {
                border-color: rgba(251, 191, 36, 0.5);
                background: rgba(251, 191, 36, 0.12);
            }
            .step-icon-badge {
                font-size: 1.2rem;
                width: 24px;
                text-align: center;
            }
            .step-text-body {
                flex: 1;
                min-width: 0;
            }
            .step-head-txt {
                font-size: 0.95rem;
                font-weight: 800;
                color: white;
            }
            .step-example-txt {
                font-size: 0.85rem;
                color: #cbd5e1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .step-status-pill {
                font-size: 0.75rem;
                font-weight: 800;
                padding: 0.2rem 0.55rem;
                border-radius: 5px;
            }
            .step-status-pill.done {
                background: rgba(34, 197, 94, 0.25);
                color: #4ade80;
            }
            .step-status-pill.next {
                background: rgba(251, 191, 36, 0.25);
                color: #fbbf24;
            }
            .step-status-pill.future {
                background: rgba(255, 255, 255, 0.06);
                color: #94a3b8;
            }

            .modal-callout-card {
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(245, 158, 11, 0.08));
                border: 1.5px solid rgba(251, 191, 36, 0.5);
                border-radius: 14px;
                padding: 1.35rem 1rem;
                text-align: center;
            }
            .btn-primary-modal-launch {
                background: #fbbf24;
                color: #0f172a;
                border: none;
                padding: 0.85rem 1.8rem;
                border-radius: 12px;
                font-size: 1.12rem;
                font-weight: 900;
                cursor: pointer;
            }
            .btn-text-restart {
                background: transparent;
                border: none;
                color: #cbd5e1;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                text-decoration: underline;
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

            @media (max-width: 480px) {
                .grounding-mobile-view { padding: 0.2rem 0.4rem 2.5rem; }
                .cards-layout-2x2 { grid-template-columns: 1fr; }
                .btn-word { font-size: 1.35rem; }
            }
        `;
        document.head.appendChild(style);

    container.appendChild(viewContainer);
}
