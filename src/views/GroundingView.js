import { getTranslation } from '../utils/i18n.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';
import { baseUrl } from '../utils/config.js';

/**
 * GroundingView 2.0 - Kompakt, skarp og letlæselig.
 * 
 * Designoptimeringer:
 * 1. Kompakt scene øverst (mindre spildplads i højden, så opgaverne er synlige med det samme).
 * 2. Markant større, tydeligere typografi på kort, ord og forklaringer.
 * 3. Den levende ballon-scene og linen der sætter sig fast i realtid.
 * 4. Kæden videre mod Modalverber bevaret 100%.
 */
export function renderGroundingView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container grounding-view-compact';

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

    // Kompakt overskrift
    const headerEl = document.createElement('div');
    headerEl.className = 'grounding-compact-header';
    headerEl.innerHTML = `
        <div class="grounding-step-pill">
            <span class="pill-dot"></span>
            <span>Trin 1 af 5: Grundsætningen</span>
        </div>
        <h1>${getTranslation('howToBuildSentence')}</h1>
        <p class="grounding-lead-text">${getTranslation('howToBuildSentenceDesc')}</p>
    `;
    viewContainer.appendChild(headerEl);

    // State for øvelsen
    let state = {
        step: 1, // 1: Noun anchor, 2: Verb anchor, 3: Assemble, 4: Visual scenes, 5: Bridge
        nounAnchor: '',
        verbAnchor: '',
        sentenceParts: []
    };

    // ==========================================================
    // KOMPAKT LEVENDE BALLON-SCENE + SÆTNINGSBÅND
    // ==========================================================
    const stageCard = document.createElement('div');
    stageCard.className = 'grounding-compact-stage';

    stageCard.innerHTML = `
        <!-- Slank, panoramisk SVG-himmel (kun 130px høj) -->
        <div class="compact-sky-frame">
            <svg class="compact-sky-svg" viewBox="0 0 500 130" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="skyGradCompact" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#0c4a6e" stop-opacity="0.9"/>
                        <stop offset="60%" stop-color="#0284c7" stop-opacity="0.45"/>
                        <stop offset="100%" stop-color="#064e3b" stop-opacity="0.7"/>
                    </linearGradient>

                    <linearGradient id="groundGradCompact" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#16a34a"/>
                        <stop offset="100%" stop-color="#14532d"/>
                    </linearGradient>

                    <linearGradient id="balloonGradCompact" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#f43f5e"/>
                        <stop offset="50%" stop-color="#e11d48"/>
                        <stop offset="100%" stop-color="#9f1239"/>
                    </linearGradient>

                    <filter id="glowGoldCompact" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>

                <!-- Himmel -->
                <rect x="0" y="0" width="500" height="130" fill="url(#skyGradCompact)" rx="12"/>

                <!-- Drivende skyer -->
                <g opacity="0.3">
                    <path d="M 40 25 Q 55 15 70 25 Q 85 15 100 25 A 10 10 0 0 1 95 38 L 45 38 A 10 10 0 0 1 40 25 Z" fill="#ffffff"/>
                    <path d="M 370 20 Q 385 10 400 20 Q 415 10 430 20 A 10 10 0 0 1 425 33 L 375 33 A 10 10 0 0 1 370 20 Z" fill="#ffffff"/>
                </g>

                <!-- Jorden i bunden -->
                <rect x="0" y="105" width="500" height="25" fill="url(#groundGradCompact)" rx="0 0 12 12"/>
                <line x1="0" y1="105" x2="500" y2="105" stroke="#4ade80" stroke-width="2" opacity="0.7"/>

                <!-- Taleren på jorden -->
                <g class="speaker-figure" transform="translate(95, 68)">
                    <circle cx="0" cy="8" r="6" fill="#f8fafc"/>
                    <line x1="0" y1="14" x2="0" y2="27" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="0" y1="18" x2="10" y2="23" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="0" y1="18" x2="-7" y2="25" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
                    <line x1="0" y1="27" x2="-5" y2="37" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="0" y1="27" x2="5" y2="37" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                    <text x="0" y="48" font-size="11" fill="#cbd5e1" text-anchor="middle" font-weight="700">Taleren</text>
                </g>

                <!-- TØJRESNOR & ANKER (Trin 1 live animation) -->
                <g id="tether-group">
                    <path id="tether-rope" d="M 270 56 Q 180 80 108 105" 
                          stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="250" stroke-dashoffset="250" 
                          fill="none" filter="url(#glowGoldCompact)" stroke-linecap="round"/>
                    
                    <g id="ground-anchor" transform="translate(108, 105) scale(0)" opacity="0">
                        <circle cx="0" cy="0" r="3.5" fill="#fbbf24"/>
                        <path d="M -7 2 Q 0 10 7 2" stroke="#fbbf24" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                        <line x1="0" y1="-2" x2="0" y2="6" stroke="#fbbf24" stroke-width="2"/>
                    </g>
                </g>

                <!-- LUFTBALLONEN (Ordet "barn") -->
                <g id="balloon-craft" class="balloon-craft" transform="translate(270, 36)">
                    <!-- Ballon kuppel -->
                    <path d="M 0 -22 C -22 -22 -28 3 -10 18 L -5 23 L 5 23 L 10 18 C 28 3 22 -22 0 -22 Z" 
                          fill="url(#balloonGradCompact)" stroke="#fda4af" stroke-width="1.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"/>
                    
                    <!-- Mønsterstribe -->
                    <path d="M 0 -22 C -8 -22 -10 3 -3 23 L 3 23 C 10 3 8 -22 0 -22 Z" fill="rgba(255,255,255,0.25)"/>

                    <!-- Tidsmotor / flamme (Trin 2 live) -->
                    <g id="burner-flame" opacity="0" transform="translate(0, 24)">
                        <circle cx="0" cy="2" r="4" fill="#f59e0b" filter="url(#glowGoldCompact)"/>
                        <polygon points="-2.5,1 0,-4 2.5,1" fill="#fbbf24"/>
                    </g>

                    <!-- Snore til kurven -->
                    <line x1="-5" y1="23" x2="-6" y2="29" stroke="#e2e8f0" stroke-width="1.2"/>
                    <line x1="5" y1="23" x2="6" y2="29" stroke="#e2e8f0" stroke-width="1.2"/>

                    <!-- Kurven -->
                    <rect x="-16" y="29" width="32" height="17" rx="3.5" fill="#78350f" stroke="#b45309" stroke-width="1.5"/>

                    <!-- Teksten BARN (STOR OG TYDELIG) -->
                    <text x="0" y="42" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="0.5">
                        barn
                    </text>

                    <!-- Svævende statusmærkat over ballonen -->
                    <g id="balloon-badge" transform="translate(0, -30)">
                        <rect x="-65" y="-10" width="130" height="20" rx="10" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="1.2"/>
                        <text id="balloon-badge-text" x="0" y="4" fill="#38bdf8" font-size="11.5" font-weight="800" text-anchor="middle">
                            🎈 Abstrakt (svæver)
                        </text>
                    </g>
                </g>
            </svg>
        </div>

        <!-- INTEGRERET LIVE SÆTNINGSBÅND -->
        <div class="compact-sentence-strip">
            <span class="strip-lead">Sætningen:</span>
            <div class="live-sentence-row">
                <span class="slot-chip slot-empty" id="live-slot-noun">1. Rumligt anker ?</span>
                <span class="slot-chip slot-fixed">barn</span>
                <span class="slot-chip slot-empty" id="live-slot-verb">2. Tidsanker ?</span>
            </div>
        </div>
    `;

    viewContainer.appendChild(stageCard);

    // ==========================================================
    // INTERAKTIONS-OMRÅDET (STOR, TYDELIG TYPOGRAFI)
    // ==========================================================
    const interactionCard = document.createElement('div');
    interactionCard.className = 'grounding-task-card';
    viewContainer.appendChild(interactionCard);

    // DOM referencer
    const balloonCraft = stageCard.querySelector('#balloon-craft');
    const tetherRope = stageCard.querySelector('#tether-rope');
    const groundAnchor = stageCard.querySelector('#ground-anchor');
    const burnerFlame = stageCard.querySelector('#burner-flame');
    const balloonBadgeText = stageCard.querySelector('#balloon-badge-text');

    const liveSlotNoun = stageCard.querySelector('#live-slot-noun');
    const liveSlotVerb = stageCard.querySelector('#live-slot-verb');

    // Opdater synkron scene
    function updateLiveStage() {
        if (state.nounAnchor) {
            tetherRope.style.strokeDashoffset = '0';
            tetherRope.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            groundAnchor.style.transform = 'translate(108px, 105px) scale(1)';
            groundAnchor.style.opacity = '1';
            groundAnchor.style.transition = 'transform 0.4s ease 0.6s, opacity 0.4s ease 0.6s';

            balloonBadgeText.textContent = `⚓ Forankret med "${state.nounAnchor}"`;
            balloonBadgeText.style.fill = '#fcd34d';

            liveSlotNoun.className = 'slot-chip slot-filled-noun';
            liveSlotNoun.textContent = state.nounAnchor;
        }

        if (state.verbAnchor) {
            burnerFlame.style.opacity = '1';
            burnerFlame.style.transition = 'opacity 0.4s ease';

            liveSlotVerb.className = 'slot-chip slot-filled-verb';
            liveSlotVerb.textContent = state.verbAnchor;

            balloonBadgeText.textContent = `⏰ Forankret i tid: "${state.verbAnchor}"`;
            balloonBadgeText.style.fill = '#4ade80';
        }

        if (state.step >= 4) {
            balloonCraft.style.transform = 'translate(270px, 66px)';
            balloonCraft.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            balloonBadgeText.textContent = `🌱 Fuldstændig Grounded!`;
            balloonBadgeText.style.fill = '#4ade80';
        }
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
        stepDiv.className = 'step-box animate-in';

        stepDiv.innerHTML = `
            <div class="step-progress-tag">Trin 1 af 3: Hvem eller hvad taler vi om?</div>
            <h2 class="step-heading">${getTranslation('groundingStep1')}</h2>
            <p class="step-instruction">
                Ordet <strong>"barn"</strong> svæver abstrakt oppe i luften. Vælg et anker, der tøjrer barnet til virkeligheden:
            </p>

            <div class="big-cards-grid">
                <button type="button" class="big-anchor-card" data-anchor="Mit">
                    <div class="card-top-row">
                        <span class="card-icon-big">🏷️</span>
                        <span class="card-title-word">Mit</span>
                    </div>
                    <div class="card-highlight-label">${getTranslation('groundingRelationPrefix')}</div>
                    <div class="card-explanation-text">Barnet tilhører taleren (personlig relation).</div>
                </button>

                <button type="button" class="big-anchor-card" data-anchor="Et">
                    <div class="card-top-row">
                        <span class="card-icon-big">🔦</span>
                        <span class="card-title-word">Et</span>
                    </div>
                    <div class="card-highlight-label">${getTranslation('groundingIndefinitePrefix')}</div>
                    <div class="card-explanation-text">Et tilfældigt barn blandt alle verdens børn.</div>
                </button>

                <button type="button" class="big-anchor-card" data-anchor="Det">
                    <div class="card-top-row">
                        <span class="card-icon-big">👉</span>
                        <span class="card-title-word">Det</span>
                    </div>
                    <div class="card-highlight-label">${getTranslation('groundingDistalPrefix')}</div>
                    <div class="card-explanation-text">Barnet derhenne på afstand (pegefelt).</div>
                </button>

                <button type="button" class="big-anchor-card" data-anchor="Dette">
                    <div class="card-top-row">
                        <span class="card-icon-big">📍</span>
                        <span class="card-title-word">Dette</span>
                    </div>
                    <div class="card-highlight-label">${getTranslation('groundingProximalPrefix')}</div>
                    <div class="card-explanation-text">Barnet lige her og nu i umiddelbar nærhed.</div>
                </button>
            </div>
        `;

        stepDiv.querySelectorAll('.big-anchor-card').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.getAttribute('data-anchor');
                state.nounAnchor = chosen;
                btn.classList.add('active-selected');

                speakDanish(chosen + ' barn');
                updateLiveStage();

                setTimeout(() => {
                    state.step = 2;
                    renderStep();
                }, 700);
            };
        });

        interactionCard.appendChild(stepDiv);
    }

    // -------------------------------------------------------------
    // TRIN 2: TIDEN (Verbum-ankeret)
    // -------------------------------------------------------------
    function renderVerbStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box animate-in';

        stepDiv.innerHTML = `
            <div class="step-progress-tag">Trin 2 af 3: Hvornår sker handlingen?</div>
            <h2 class="step-heading">${getTranslation('groundingStep2')}</h2>
            <p class="step-instruction">
                Handlingen <strong>"at spise"</strong> skal forankres i tiden for at blive virkelig:
            </p>

            <div class="big-cards-grid grid-3">
                <button type="button" class="big-anchor-card" data-verb="spiser">
                    <div class="card-top-row">
                        <span class="card-icon-big">🟢</span>
                        <span class="card-title-word">spiser</span>
                    </div>
                    <div class="card-highlight-label" style="color: #4ade80;">${getTranslation('tenseNow')}</div>
                    <div class="card-explanation-text">Handlingen foregår lige nu i nutiden.</div>
                </button>

                <button type="button" class="big-anchor-card" data-verb="spiste">
                    <div class="card-top-row">
                        <span class="card-icon-big">📍</span>
                        <span class="card-title-word">spiste</span>
                    </div>
                    <div class="card-highlight-label" style="color: #f87171;">${getTranslation('tensePast')}</div>
                    <div class="card-explanation-text">Handlingen skete i går eller i fortiden.</div>
                </button>

                <button type="button" class="big-anchor-card" data-verb="skal spise">
                    <div class="card-top-row">
                        <span class="card-icon-big">🔵</span>
                        <span class="card-title-word">skal spise</span>
                    </div>
                    <div class="card-highlight-label" style="color: #38bdf8;">${getTranslation('tenseFuture')}</div>
                    <div class="card-explanation-text">Handlingen er planlagt ude i fremtiden.</div>
                </button>
            </div>
        `;

        stepDiv.querySelectorAll('.big-anchor-card').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.getAttribute('data-verb');
                state.verbAnchor = chosen;
                btn.classList.add('active-selected');

                speakDanish(chosen);
                updateLiveStage();

                setTimeout(() => {
                    state.step = 3;
                    renderStep();
                }, 700);
            };
        });

        interactionCard.appendChild(stepDiv);
    }

    // -------------------------------------------------------------
    // TRIN 3: GROUNDING (Landing på jorden)
    // -------------------------------------------------------------
    function renderAssembleStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box animate-in';

        stepDiv.innerHTML = `
            <div class="step-progress-tag">Trin 3 af 3: Landing på Jorden</div>
            <h2 class="step-heading">${getTranslation('groundingStep3')}</h2>
            <p class="step-instruction">
                Tryk på brikkerne i den rigtige rækkefølge for at samle sætningen nede på jorden:
            </p>

            <div class="puzzle-source-card">
                <div class="puzzle-title-label">Kildebrikker (tryk for at flytte til jorden):</div>
                <div class="puzzle-chips-pool" id="drag-source">
                    <button type="button" class="big-puzzle-chip" data-word="${state.nounAnchor}">${state.nounAnchor}</button>
                    <button type="button" class="big-puzzle-chip" data-word="barn">barn</button>
                    <button type="button" class="big-puzzle-chip" data-word="${state.verbAnchor}">${state.verbAnchor}</button>
                </div>
            </div>

            <div class="puzzle-target-card">
                <div class="target-title-label">🌱 Jorden (The Ground):</div>
                <div class="puzzle-landing-bay" id="drag-target"></div>
            </div>

            <div class="puzzle-controls-bar">
                <button type="button" class="btn-ground-confirm" id="btn-check-assembly">
                    <span>⚓</span>
                    <span>${getTranslation('checkResult')}</span>
                </button>
                <button type="button" class="btn-ground-clear" id="btn-reset-slots">
                    Nulstil brikker 🔄
                </button>
            </div>

            <div class="grounding-feedback-box" id="assembly-feedback" style="display: none;"></div>
        `;

        const sourceRow = stepDiv.querySelector('#drag-source');
        const targetRow = stepDiv.querySelector('#drag-target');
        const checkBtn = stepDiv.querySelector('#btn-check-assembly');
        const resetBtn = stepDiv.querySelector('#btn-reset-slots');
        const feedbackBox = stepDiv.querySelector('#assembly-feedback');

        function attachEvents() {
            sourceRow.querySelectorAll('.big-puzzle-chip').forEach(brick => {
                brick.onclick = () => {
                    targetRow.appendChild(brick);
                    brick.classList.add('chip-placed');
                    speakDanish(brick.dataset.word);
                    attachEvents();
                };
            });

            targetRow.querySelectorAll('.big-puzzle-chip').forEach(brick => {
                brick.onclick = () => {
                    sourceRow.appendChild(brick);
                    brick.classList.remove('chip-placed');
                    attachEvents();
                };
            });
        }
        attachEvents();

        resetBtn.onclick = () => {
            targetRow.querySelectorAll('.big-puzzle-chip').forEach(b => {
                sourceRow.appendChild(b);
                b.classList.remove('chip-placed');
            });
            feedbackBox.style.display = 'none';
        };

        checkBtn.onclick = () => {
            const placedWords = Array.from(targetRow.querySelectorAll('.big-puzzle-chip')).map(b => b.dataset.word.trim());
            const constructed = placedWords.join(' ').toLowerCase();
            const expected = `${state.nounAnchor} barn ${state.verbAnchor}`.toLowerCase();

            if (constructed === expected) {
                const fullSentence = `${state.nounAnchor} barn ${state.verbAnchor}.`;
                feedbackBox.style.display = 'block';
                feedbackBox.className = 'grounding-feedback-box success-box';
                feedbackBox.innerHTML = `
                    <div style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.3rem;">
                        🎉 ${getTranslation('groundingSuccess')}
                    </div>
                    <div style="font-size: 1.25rem; color: #f8fafc; font-weight: 800; margin-bottom: 0.5rem;">
                        "${fullSentence}"
                    </div>
                    <p style="margin: 0; color: #e2e8f0; font-size: 1.05rem;">
                        Ballonen er landet trygt på jorden! Sætningen har nu fast holdepunkt i virkeligheden.
                    </p>
                `;

                speakDanish(fullSentence);
                checkBtn.disabled = true;

                state.step = 4;
                updateLiveStage();

                setTimeout(() => {
                    renderStep();
                }, 1600);
            } else {
                feedbackBox.style.display = 'block';
                feedbackBox.className = 'grounding-feedback-box error-box';
                feedbackBox.innerHTML = `
                    <strong>${getTranslation('wrongOrder')}</strong><br>
                    Rækkefølgen skal være: Først rumligt anker (<em>${state.nounAnchor}</em>), derefter navneordet (<em>barn</em>) og til sidst tidsankeret (<em>${state.verbAnchor}</em>).
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
        stepDiv.className = 'step-box animate-in';

        const anchor = state.nounAnchor;
        let sceneTitle = '';
        let sceneHtml = '';

        if (anchor === 'Mit') {
            sceneTitle = getTranslation('groundingRelation');
            sceneHtml = `
                <div class="visual-scene-box">
                    <svg viewBox="0 0 320 130" class="scene-clear-svg">
                        <circle cx="100" cy="45" r="14" fill="#38bdf8"/>
                        <path d="M 85 75 Q 100 64 115 75 L 115 115 L 85 115 Z" fill="#0284c7"/>
                        <circle cx="180" cy="65" r="10" fill="#f43f5e"/>
                        <path d="M 170 86 Q 180 78 190 86 L 190 115 L 170 115 Z" fill="#e11d48"/>
                        <path d="M 115 80 Q 148 65 170 88" stroke="#f43f5e" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                        <text x="145" y="62" font-size="18" text-anchor="middle">❤️</text>
                        <text x="100" y="126" font-size="12" fill="#cbd5e1" font-weight="700" text-anchor="middle">Mig (taleren)</text>
                        <text x="180" y="126" font-size="12" fill="#cbd5e1" font-weight="700" text-anchor="middle">Mit barn</text>
                    </svg>
                </div>
            `;
        } else if (anchor === 'Et') {
            sceneTitle = getTranslation('groundingIndefinite');
            sceneHtml = `
                <div class="visual-scene-box">
                    <svg viewBox="0 0 320 130" class="scene-clear-svg">
                        <polygon points="160,10 90,120 230,120" fill="rgba(250, 204, 21, 0.18)"/>
                        <g opacity="0.35">
                            <circle cx="70" cy="70" r="9" fill="#94a3b8"/>
                            <path d="M 62 88 Q 70 82 78 88 L 78 115 L 62 115 Z" fill="#64748b"/>
                            <circle cx="250" cy="70" r="9" fill="#94a3b8"/>
                            <path d="M 242 88 Q 250 82 258 88 L 258 115 L 242 115 Z" fill="#64748b"/>
                        </g>
                        <circle cx="160" cy="65" r="10" fill="#facc15" filter="drop-shadow(0 0 8px #facc15)"/>
                        <path d="M 150 86 Q 160 78 170 86 L 170 115 L 150 115 Z" fill="#eab308"/>
                        <text x="160" y="126" font-size="12" fill="#facc15" font-weight="800" text-anchor="middle">Et barn (vilkårligt i mængden)</text>
                    </svg>
                </div>
            `;
        } else if (anchor === 'Det') {
            sceneTitle = getTranslation('groundingDistal');
            sceneHtml = `
                <div class="visual-scene-box">
                    <svg viewBox="0 0 320 130" class="scene-clear-svg">
                        <g transform="translate(60, 40)">
                            <circle cx="0" cy="12" r="12" fill="#38bdf8"/>
                            <path d="M -12 36 Q 0 26 12 36 L 12 75 L -12 75 Z" fill="#0284c7"/>
                            <line x1="8" y1="38" x2="45" y2="33" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                        </g>
                        <line x1="110" y1="73" x2="230" y2="73" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 4"/>
                        <polygon points="230,69 240,73 230,77" fill="#38bdf8"/>
                        <g transform="translate(260, 55)">
                            <circle cx="0" cy="10" r="9" fill="#f43f5e"/>
                            <path d="M -9 26 Q 0 18 9 26 L 9 60 L -9 60 Z" fill="#e11d48"/>
                        </g>
                        <text x="60" y="126" font-size="12" fill="#cbd5e1" font-weight="700" text-anchor="middle">Taleren</text>
                        <text x="260" y="126" font-size="12" fill="#38bdf8" font-weight="800" text-anchor="middle">Det barn (på afstand)</text>
                    </svg>
                </div>
            `;
        } else {
            sceneTitle = getTranslation('groundingProximal');
            sceneHtml = `
                <div class="visual-scene-box">
                    <svg viewBox="0 0 320 130" class="scene-clear-svg">
                        <ellipse cx="160" cy="78" rx="85" ry="38" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6 4"/>
                        <g transform="translate(135, 45)">
                            <circle cx="0" cy="12" r="12" fill="#38bdf8"/>
                            <path d="M -12 36 Q 0 26 12 36 L 12 70 L -12 70 Z" fill="#0284c7"/>
                        </g>
                        <g transform="translate(185, 56)">
                            <circle cx="0" cy="10" r="9" fill="#f43f5e"/>
                            <path d="M -9 26 Q 0 18 9 26 L 9 59 L -9 59 Z" fill="#e11d48"/>
                        </g>
                        <text x="160" y="126" font-size="12" fill="#38bdf8" font-weight="800" text-anchor="middle">Dette barn (lige her i nærværet)</text>
                    </svg>
                </div>
            `;
        }

        let tenseLabel = getTranslation('presentTense');
        let pointerPercent = '50%';
        let tenseColor = '#4ade80';

        if (state.verbAnchor === 'spiste') {
            tenseLabel = getTranslation('pastTense');
            pointerPercent = '16%';
            tenseColor = '#f87171';
        } else if (state.verbAnchor === 'skal spise') {
            tenseLabel = getTranslation('futureTense');
            pointerPercent = '84%';
            tenseColor = '#38bdf8';
        }

        stepDiv.innerHTML = `
            <div class="step-progress-tag" style="background: rgba(34, 197, 94, 0.2); color: #4ade80;">
                Forankring bekræftet!
            </div>
            <h2 class="step-heading">Sætningen: "${state.nounAnchor} barn ${state.verbAnchor}."</h2>

            <div class="visual-card-block">
                <div class="visual-card-title">${sceneTitle}</div>
                ${sceneHtml}
            </div>

            <div class="visual-card-block">
                <div class="timeline-row-top">
                    <span class="timeline-big-title">Handlingen forankret i tiden:</span>
                    <span class="timeline-status-pill" style="color: ${tenseColor}; border-color: ${tenseColor};">
                        ${state.verbAnchor} (${tenseLabel})
                    </span>
                </div>
                <div class="timeline-bar-wrapper">
                    <div class="timeline-center-rail"></div>
                    <div class="timeline-points-row">
                        <span class="time-label ${state.verbAnchor === 'spiste' ? 'time-label-active' : ''}">Fortid (datid)</span>
                        <span class="time-label ${state.verbAnchor === 'spiser' ? 'time-label-active' : ''}">Nutid (lige nu)</span>
                        <span class="time-label ${state.verbAnchor === 'skal spise' ? 'time-label-active' : ''}">Fremtid (planlagt)</span>
                    </div>
                    <div class="timeline-marker-orb" style="left: ${pointerPercent}; background: ${tenseColor};"></div>
                </div>
            </div>

            <div style="margin-top: 1.8rem; text-align: center;">
                <button type="button" class="btn-goto-chain" id="btn-goto-final">
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
        stepDiv.className = 'step-box animate-in';

        const completedSentence = `${state.nounAnchor} barn ${state.verbAnchor}.`;

        stepDiv.innerHTML = `
            <div class="completion-banner">
                <div class="trophy-emoji">🏆</div>
                <h2 style="font-size: 1.8rem; color: white; margin-bottom: 0.5rem; font-weight: 800;">
                    Grundsætningen er solidt forankret!
                </h2>
                <div class="big-sentence-badge">
                    <span class="badge-text">"${completedSentence}"</span>
                    <button type="button" class="btn-badge-audio" id="btn-speak-final">
                        <span>🔊</span>
                        <span>Lyt</span>
                    </button>
                </div>
                <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 620px; margin: 0 auto 1.8rem; line-height: 1.55;">
                    ${getTranslation('groundingFinalMsg')}
                </p>
            </div>

            <!-- GRAMMATIK-STIEN -->
            <div class="grammar-path-box">
                <div class="path-box-title">
                    <span>Den store grammatik-sti: Se hvordan sætningen udbygges</span>
                </div>

                <div class="path-steps-column">
                    <div class="path-step-item item-completed">
                        <div class="step-num-icon">✓</div>
                        <div class="step-text-content">
                            <div class="step-title-bold">1. Grundsætning (Intro)</div>
                            <div class="step-sub-sentence">"${state.nounAnchor} barn ${state.verbAnchor}."</div>
                        </div>
                        <div class="step-tag-completed">Gennemført</div>
                    </div>

                    <div class="path-step-item item-next-highlight">
                        <div class="step-num-icon">⚡</div>
                        <div class="step-text-content">
                            <div class="step-title-bold">2. Modalverber (Vilje, pligt og evne)</div>
                            <div class="step-sub-sentence">"Mit barn <strong>[vil / skal / kan]</strong> spise..."</div>
                        </div>
                        <div class="step-tag-next">Næste skridt</div>
                    </div>

                    <div class="path-step-item item-future">
                        <div class="step-num-icon">🏷️</div>
                        <div class="step-text-content">
                            <div class="step-title-bold">3. Adjektiver (Beskrivelse)</div>
                            <div class="step-sub-sentence">"Mit <strong>[lille / sultne]</strong> barn vil spise..."</div>
                        </div>
                        <div class="step-tag-future">Trin 3</div>
                    </div>

                    <div class="path-step-item item-future">
                        <div class="step-num-icon">🌊</div>
                        <div class="step-text-content">
                            <div class="step-title-bold">4. Adverbier (Måde, grad og tid)</div>
                            <div class="step-sub-sentence">"Mit lille barn vil spise <strong>[langsomt / gerne]</strong>..."</div>
                        </div>
                        <div class="step-tag-future">Trin 4</div>
                    </div>

                    <div class="path-step-item item-future">
                        <div class="step-num-icon">🌉</div>
                        <div class="step-text-content">
                            <div class="step-title-bold">5. Konjunktioner (Tekstflow & bindeord)</div>
                            <div class="step-sub-sentence">"Mit lille barn vil spise, <strong>[fordi]</strong> det er sultent..."</div>
                        </div>
                        <div class="step-tag-future">Trin 5</div>
                    </div>
                </div>
            </div>

            <!-- MODAL TEASER KNAP -->
            <div class="modal-bridge-card">
                <h3 style="color: #fbbf24; font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem;">
                    Tag "${completedSentence}" med ind i Modalverber
                </h3>
                <p style="color: #f1f5f9; font-size: 1.05rem; max-width: 580px; margin: 0 auto 1.5rem; line-height: 1.5;">
                    Hvad sker der, når barnet ikke bare <em>spiser</em>, men <strong>vil</strong>, <strong>skal</strong> eller <strong>må</strong> spise?
                </p>
                <button type="button" class="btn-launch-modal" id="btn-start-modal-chain">
                    <span>${getTranslation('nextStepModalVerbs')} ➔</span>
                </button>
            </div>

            <div style="text-align: center; margin-top: 1.5rem;">
                <button type="button" class="btn-restart-action" id="btn-restart-all">
                    Prøv med et andet anker 🔄
                </button>
            </div>
        `;

        stepDiv.querySelector('#btn-speak-final').onclick = () => speakDanish(completedSentence);

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
    // CSS MED STORE, LETLÆSELIGE TEKSTER & KOMPAKT SCENE
    // ==========================================================
    if (!document.getElementById('grounding-compact-styles')) {
        const style = document.createElement('style');
        style.id = 'grounding-compact-styles';
        style.textContent = `
            .grounding-view-compact {
                max-width: 860px;
                margin: 0 auto;
                padding: 0.5rem 1rem 3.5rem;
                color: #f8fafc;
            }

            /* Kompakt header */
            .grounding-compact-header {
                text-align: center;
                margin-bottom: 1rem;
            }
            .grounding-step-pill {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                background: rgba(56, 189, 248, 0.15);
                border: 1px solid rgba(56, 189, 248, 0.35);
                padding: 0.25rem 0.8rem;
                border-radius: 9999px;
                font-size: 0.85rem;
                font-weight: 700;
                color: #38bdf8;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .pill-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #38bdf8;
                box-shadow: 0 0 6px #38bdf8;
            }
            .grounding-compact-header h1 {
                font-size: 1.85rem;
                font-weight: 800;
                margin: 0 0 0.35rem;
                color: #ffffff;
                letter-spacing: -0.02em;
            }
            .grounding-lead-text {
                color: #cbd5e1;
                font-size: 1.05rem;
                max-width: 650px;
                margin: 0 auto;
                line-height: 1.5;
            }

            /* Kompakt scene */
            .grounding-compact-stage {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 0.85rem 1rem;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                margin-bottom: 1.25rem;
            }
            .compact-sky-frame {
                width: 100%;
                max-height: 145px;
                border-radius: 10px;
                overflow: hidden;
            }
            .compact-sky-svg {
                width: 100%;
                height: auto;
                display: block;
                max-height: 145px;
            }

            /* Integreret sætningsbånd */
            .compact-sentence-strip {
                margin-top: 0.75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.8rem;
                flex-wrap: wrap;
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 0.5rem 0.8rem;
            }
            .strip-lead {
                font-size: 0.95rem;
                font-weight: 700;
                color: #cbd5e1;
            }
            .live-sentence-row {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            .slot-chip {
                padding: 0.4rem 0.9rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 800;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .slot-empty {
                background: rgba(255, 255, 255, 0.04);
                border: 1.5px dashed rgba(255, 255, 255, 0.25);
                color: #94a3b8;
                font-size: 0.95rem;
                font-weight: 700;
            }
            .slot-fixed {
                background: rgba(244, 63, 94, 0.18);
                border: 1.5px solid rgba(244, 63, 94, 0.5);
                color: #fda4af;
            }
            .slot-filled-noun {
                background: rgba(251, 191, 36, 0.22);
                border: 1.5px solid #fbbf24;
                color: #fde68a;
            }
            .slot-filled-verb {
                background: rgba(34, 197, 94, 0.22);
                border: 1.5px solid #22c55e;
                color: #86efac;
            }

            /* Opgavekort med stor typografi */
            .grounding-task-card {
                background: #1e293b;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 18px;
                padding: 1.5rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
            }
            .step-progress-tag {
                display: inline-block;
                background: rgba(56, 189, 248, 0.15);
                color: #38bdf8;
                font-size: 0.85rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                padding: 0.25rem 0.7rem;
                border-radius: 6px;
                margin-bottom: 0.4rem;
            }
            .step-heading {
                font-size: 1.55rem;
                font-weight: 800;
                color: white;
                margin: 0 0 0.4rem;
            }
            .step-instruction {
                color: #cbd5e1;
                font-size: 1.12rem;
                margin: 0 0 1.25rem;
                line-height: 1.55;
            }

            /* Store anker-kort med letlæselig tekst */
            .big-cards-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 1rem;
            }
            .grid-3 {
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            }
            .big-anchor-card {
                background: #0f172a;
                border: 2px solid rgba(255, 255, 255, 0.12);
                border-radius: 14px;
                padding: 1.2rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                gap: 0.35rem;
            }
            .big-anchor-card:hover {
                border-color: #38bdf8;
                background: rgba(56, 189, 248, 0.08);
                transform: translateY(-2px);
            }
            .big-anchor-card.active-selected {
                border-color: #4ade80 !important;
                background: rgba(34, 197, 94, 0.18) !important;
            }
            .card-top-row {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                margin-bottom: 0.2rem;
            }
            .card-icon-big {
                font-size: 2.2rem;
            }
            .card-title-word {
                font-size: 1.75rem;
                font-weight: 900;
                color: #ffffff;
            }
            .card-highlight-label {
                font-size: 1.05rem;
                color: #38bdf8;
                font-weight: 700;
            }
            .card-explanation-text {
                font-size: 1rem;
                color: #e2e8f0;
                line-height: 1.45;
                margin-top: 0.2rem;
            }

            /* Puslespil (Trin 3) */
            .puzzle-source-card {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 1.1rem;
                margin-bottom: 1.25rem;
            }
            .puzzle-title-label {
                font-size: 1rem;
                color: #cbd5e1;
                font-weight: 700;
                margin-bottom: 0.75rem;
            }
            .puzzle-chips-pool {
                display: flex;
                gap: 0.9rem;
                flex-wrap: wrap;
                min-height: 52px;
                align-items: center;
            }
            .big-puzzle-chip {
                background: #1e293b;
                border: 2px solid rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 1.35rem;
                font-weight: 800;
                padding: 0.7rem 1.4rem;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            }
            .big-puzzle-chip:hover {
                border-color: #38bdf8;
                transform: translateY(-2px);
            }
            .big-puzzle-chip.chip-placed {
                background: rgba(34, 197, 94, 0.2);
                border-color: #22c55e;
                color: #86efac;
            }

            .puzzle-target-card {
                background: rgba(21, 128, 61, 0.15);
                border: 2px dashed rgba(74, 222, 128, 0.5);
                border-radius: 14px;
                padding: 1.25rem;
                margin-bottom: 1.5rem;
            }
            .target-title-label {
                font-size: 1.1rem;
                font-weight: 800;
                color: #4ade80;
                margin-bottom: 0.75rem;
            }
            .puzzle-landing-bay {
                display: flex;
                gap: 0.9rem;
                flex-wrap: wrap;
                min-height: 56px;
                align-items: center;
            }

            .puzzle-controls-bar {
                display: flex;
                gap: 1rem;
                align-items: center;
                flex-wrap: wrap;
            }
            .btn-ground-confirm {
                background: #22c55e;
                color: #0f172a;
                border: none;
                padding: 0.85rem 1.8rem;
                border-radius: 12px;
                font-size: 1.15rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }
            .btn-ground-confirm:hover {
                background: #16a34a;
                transform: translateY(-1px);
            }
            .btn-ground-clear {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.25);
                color: #cbd5e1;
                padding: 0.8rem 1.25rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            }
            .btn-ground-clear:hover {
                color: white;
                border-color: white;
            }

            .grounding-feedback-box {
                margin-top: 1.2rem;
                padding: 1.2rem;
                border-radius: 12px;
                line-height: 1.55;
            }
            .success-box {
                background: rgba(34, 197, 94, 0.18);
                border: 1.5px solid rgba(34, 197, 94, 0.5);
                color: #86efac;
            }
            .error-box {
                background: rgba(239, 68, 68, 0.18);
                border: 1.5px solid rgba(239, 68, 68, 0.5);
                color: #fca5a5;
            }

            /* Visual Exploration (Trin 4) */
            .visual-card-block {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                padding: 1.25rem;
                margin-bottom: 1.25rem;
            }
            .visual-card-title {
                font-size: 1.1rem;
                font-weight: 800;
                color: #38bdf8;
                margin-bottom: 0.8rem;
            }
            .scene-clear-svg {
                width: 100%;
                max-width: 420px;
                height: auto;
                display: block;
                margin: 0 auto;
            }
            .timeline-row-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            .timeline-big-title {
                font-size: 1.05rem;
                font-weight: 700;
                color: #cbd5e1;
            }
            .timeline-status-pill {
                font-size: 1.05rem;
                font-weight: 800;
                border: 1.5px solid currentColor;
                padding: 0.2rem 0.65rem;
                border-radius: 6px;
            }
            .timeline-bar-wrapper {
                position: relative;
                padding: 1.5rem 0.5rem 0.5rem;
            }
            .timeline-center-rail {
                height: 5px;
                background: rgba(255, 255, 255, 0.18);
                border-radius: 3px;
                position: absolute;
                top: 50%;
                left: 8%;
                right: 8%;
                transform: translateY(-50%);
            }
            .timeline-points-row {
                display: flex;
                justify-content: space-between;
                position: relative;
                z-index: 2;
            }
            .time-label {
                font-size: 0.95rem;
                font-weight: 700;
                color: #94a3b8;
                background: #0f172a;
                padding: 0.25rem 0.6rem;
                border-radius: 6px;
            }
            .time-label-active {
                color: white;
                font-weight: 900;
            }
            .timeline-marker-orb {
                position: absolute;
                top: 50%;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 14px currentColor;
                z-index: 3;
                transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .btn-goto-chain {
                background: #38bdf8;
                color: #0f172a;
                border: none;
                padding: 0.9rem 2rem;
                border-radius: 14px;
                font-size: 1.15rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-goto-chain:hover {
                background: #7dd3fc;
                transform: translateY(-2px);
            }

            /* Final Completion (Trin 5) */
            .completion-banner {
                text-align: center;
                margin-bottom: 1.75rem;
            }
            .trophy-emoji {
                font-size: 2.8rem;
                margin-bottom: 0.4rem;
            }
            .big-sentence-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.8rem;
                background: rgba(34, 197, 94, 0.18);
                border: 2px solid rgba(34, 197, 94, 0.5);
                padding: 0.65rem 1.5rem;
                border-radius: 9999px;
                margin-bottom: 1rem;
            }
            .badge-text {
                font-size: 1.5rem;
                font-weight: 900;
                color: #4ade80;
            }
            .btn-badge-audio {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.25);
                color: white;
                padding: 0.35rem 0.85rem;
                border-radius: 20px;
                font-size: 0.95rem;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
            }
            .btn-badge-audio:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            /* Grammatik-stien */
            .grammar-path-box {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.4rem;
                margin-bottom: 1.75rem;
            }
            .path-box-title {
                font-size: 1.1rem;
                font-weight: 800;
                color: #38bdf8;
                margin-bottom: 1rem;
            }
            .path-steps-column {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            .path-step-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 0.85rem 1.1rem;
            }
            .item-completed {
                border-color: rgba(34, 197, 94, 0.4);
                background: rgba(34, 197, 94, 0.1);
            }
            .item-next-highlight {
                border-color: rgba(251, 191, 36, 0.5);
                background: rgba(251, 191, 36, 0.12);
            }
            .step-num-icon {
                font-size: 1.35rem;
                width: 30px;
                text-align: center;
            }
            .step-text-content {
                flex: 1;
            }
            .step-title-bold {
                font-size: 1.05rem;
                font-weight: 800;
                color: white;
            }
            .step-sub-sentence {
                font-size: 0.95rem;
                color: #cbd5e1;
                margin-top: 0.15rem;
            }
            .step-tag-completed {
                font-size: 0.85rem;
                font-weight: 800;
                padding: 0.25rem 0.65rem;
                border-radius: 6px;
                background: rgba(34, 197, 94, 0.25);
                color: #4ade80;
            }
            .step-tag-next {
                font-size: 0.85rem;
                font-weight: 800;
                padding: 0.25rem 0.65rem;
                border-radius: 6px;
                background: rgba(251, 191, 36, 0.25);
                color: #fbbf24;
            }
            .step-tag-future {
                font-size: 0.85rem;
                font-weight: 700;
                padding: 0.25rem 0.65rem;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.06);
                color: #94a3b8;
            }

            .modal-bridge-card {
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(245, 158, 11, 0.08));
                border: 2px solid rgba(251, 191, 36, 0.5);
                border-radius: 18px;
                padding: 1.75rem;
                text-align: center;
                box-shadow: 0 8px 25px rgba(251, 191, 36, 0.2);
            }
            .btn-launch-modal {
                background: #fbbf24;
                color: #0f172a;
                border: none;
                padding: 1rem 2.2rem;
                border-radius: 14px;
                font-size: 1.25rem;
                font-weight: 900;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 16px rgba(251, 191, 36, 0.35);
            }
            .btn-launch-modal:hover {
                background: #f59e0b;
                transform: scale(1.02);
            }
            .btn-restart-action {
                background: transparent;
                border: none;
                color: #cbd5e1;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                text-decoration: underline;
            }
            .btn-restart-action:hover {
                color: white;
            }

            @media (max-width: 640px) {
                .grounding-compact-header h1 { font-size: 1.5rem; }
                .big-cards-grid { grid-template-columns: 1fr; }
                .compact-sentence-strip { flex-direction: column; }
            }
        `;
        document.head.appendChild(style);
    }

    container.appendChild(viewContainer);
}
