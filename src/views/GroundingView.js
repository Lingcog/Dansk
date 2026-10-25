import { getTranslation } from '../utils/i18n.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';
import { baseUrl } from '../utils/config.js';

/**
 * GroundingView 2.0 - Den pædagogiske grundsten for sætningsopbygning.
 * 
 * Vigtigste pædagogiske principper:
 * 1. Den levende metafor: Ordet "barn" svæver abstrakt som en ballon.
 *    - Trin 1: Substantiv-ankeret (Mit, Et, Det, Dette) skyder en tøjresnor/et anker ned live.
 *    - Trin 2: Tidsankeret (spiser, spiste, skal spise) tænder tidsmotoren på ballonen.
 *    - Trin 3: Grounding: Sætningen samles på jorden, og ballonen lander trygt.
 * 2. Gradvis sætningsopbygning i realtid:
 *    [ Anker ] + [ barn ] + [ Handling ]
 * 3. Kæden videre: Sætningen overføres direkte videre til Modalverber -> Adjektiver -> Adverbier -> Konjunktioner!
 */
export function renderGroundingView(container, navigateFn) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container grounding-view-2';

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

    // Grammatik-menu (Intro / Modalverber / Adjektiver / Adverbier / Konjunktioner)
    viewContainer.appendChild(renderGrammarMenu('intro', navigateFn));

    // Overskrift og intro
    const headerEl = document.createElement('div');
    headerEl.className = 'grounding-header-hero';
    headerEl.innerHTML = `
        <div class="grounding-journey-badge">
            <span class="badge-dot"></span>
            <span>Trin 1 af 5: Grundsætningen</span>
        </div>
        <h1>${getTranslation('howToBuildSentence')}</h1>
        <p class="grounding-subtitle">${getTranslation('howToBuildSentenceDesc')}</p>
    `;
    viewContainer.appendChild(headerEl);

    // State for øvelsen
    let state = {
        step: 1, // 1: Noun anchor, 2: Verb anchor, 3: Assemble sentence, 4: Visual scenes, 5: Master bridge
        nounAnchor: '',
        verbAnchor: '',
        sentenceParts: []
    };

    // ==========================================================
    // DEN LEVENDE INTERAKTIVE BALLON-SCENE (SVG)
    // ==========================================================
    const stageCard = document.createElement('div');
    stageCard.className = 'grounding-stage-card';

    stageCard.innerHTML = `
        <div class="sky-canvas-wrapper">
            <svg class="grounding-sky-svg" viewBox="0 0 500 230" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <!-- Sky & Ground Gradients -->
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#0c4a6e" stop-opacity="0.8"/>
                        <stop offset="60%" stop-color="#0284c7" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#042f2e" stop-opacity="0.6"/>
                    </linearGradient>

                    <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#15803d"/>
                        <stop offset="100%" stop-color="#14532d"/>
                    </linearGradient>

                    <linearGradient id="balloonGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#f43f5e"/>
                        <stop offset="50%" stop-color="#e11d48"/>
                        <stop offset="100%" stop-color="#be123c"/>
                    </linearGradient>

                    <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>

                <!-- Himmel baggrund -->
                <rect x="0" y="0" width="500" height="230" fill="url(#skyGrad)" rx="16"/>

                <!-- Skyer der driver let -->
                <g class="drifting-clouds" opacity="0.35">
                    <path d="M 40 45 Q 60 30 85 45 Q 110 30 135 45 A 15 15 0 0 1 125 65 L 45 65 A 15 15 0 0 1 40 45 Z" fill="#ffffff"/>
                    <path d="M 330 35 Q 350 20 375 35 Q 400 20 425 35 A 15 15 0 0 1 415 55 L 335 55 A 15 15 0 0 1 330 35 Z" fill="#ffffff"/>
                </g>

                <!-- JORDEN / THE GROUND (Fundamentet i bunden) -->
                <rect x="0" y="195" width="500" height="35" fill="url(#groundGrad)" rx="0 0 16 16"/>
                <line x1="0" y1="195" x2="500" y2="195" stroke="#4ade80" stroke-width="2" opacity="0.6"/>

                <!-- Taleren / Personen på jorden -->
                <g class="ground-speaker" transform="translate(110, 150)">
                    <circle cx="0" cy="12" r="7" fill="#cbd5e1"/>
                    <line x1="0" y1="19" x2="0" y2="35" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
                    <line x1="0" y1="24" x2="-8" y2="32" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="0" y1="24" x2="10" y2="28" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
                    <line x1="0" y1="35" x2="-6" y2="45" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
                    <line x1="0" y1="35" x2="6" y2="45" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
                    <text x="0" y="55" font-size="8.5" fill="#94a3b8" text-anchor="middle" font-weight="600">Taleren</text>
                </g>

                <!-- TØJRESNORE & ANKER (Trin 1 live animation) -->
                <g id="anchor-system" class="anchor-system">
                    <!-- Linen der kastes ned -->
                    <path id="tether-rope" d="M 250 115 Q 180 155 120 185" 
                          stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="300" stroke-dashoffset="300" 
                          fill="none" filter="url(#glowGold)" stroke-linecap="round"/>
                    
                    <!-- Selve ankeret der griber i jorden -->
                    <g id="ground-anchor" transform="translate(120, 185) scale(0)" opacity="0">
                        <circle cx="0" cy="0" r="4" fill="#fbbf24"/>
                        <path d="M -8 2 Q 0 12 8 2" stroke="#fbbf24" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                        <line x1="0" y1="-3" x2="0" y2="7" stroke="#fbbf24" stroke-width="2.5"/>
                    </g>
                </g>

                <!-- LUFTBALLONEN (Ordet "barn") -->
                <g id="balloon-craft" class="balloon-craft" transform="translate(250, 65)">
                    <!-- Ballon kuppel -->
                    <path d="M 0 -35 C -32 -35 -40 2 -15 25 L -8 32 L 8 32 L 15 25 C 40 2 32 -35 0 -35 Z" 
                          fill="url(#balloonGrad)" stroke="#fda4af" stroke-width="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.35))"/>
                    
                    <!-- Mønsterstriber på ballonen -->
                    <path d="M 0 -35 C -12 -35 -15 2 -5 32 L 5 32 C 15 2 12 -35 0 -35 Z" 
                          fill="rgba(255,255,255,0.22)"/>

                    <!-- Tidsmotor / flamme (Trin 2 live animation) -->
                    <g id="burner-flame" opacity="0" transform="translate(0, 34)">
                        <circle cx="0" cy="3" r="5" fill="#f59e0b" filter="url(#glowGold)"/>
                        <polygon points="-3,2 0,-5 3,2" fill="#fbbf24"/>
                    </g>

                    <!-- Snore til kurven -->
                    <line x1="-7" y1="32" x2="-8" y2="43" stroke="#e2e8f0" stroke-width="1.2"/>
                    <line x1="7" y1="32" x2="8" y2="43" stroke="#e2e8f0" stroke-width="1.2"/>

                    <!-- Kurven -->
                    <rect x="-14" y="43" width="28" height="18" rx="4" fill="#78350f" stroke="#b45309" stroke-width="1.5"/>

                    <!-- Teksten BARN på kurven -->
                    <text x="0" y="56" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="0.5">
                        barn
                    </text>

                    <!-- Svævende statusmærkat over ballonen -->
                    <g id="balloon-badge" transform="translate(0, -44)">
                        <rect x="-55" y="-10" width="110" height="20" rx="10" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" stroke-width="1"/>
                        <text id="balloon-badge-text" x="0" y="4" fill="#38bdf8" font-size="9.5" font-weight="700" text-anchor="middle">
                            🎈 Abstrakt (svæver)
                        </text>
                    </g>
                </g>
            </svg>
        </div>

        <!-- LIVE SÆTNINGSBÅND LIGE UNDER SCENEN -->
        <div class="grounding-live-strip">
            <div class="strip-label">Sætningens opbygning i realtid:</div>
            <div class="live-sentence-slots">
                <span class="sentence-slot slot-noun-anchor" id="live-slot-noun">
                    <span class="slot-placeholder">1. Rumligt anker ?</span>
                </span>
                <span class="sentence-slot slot-noun" id="live-slot-noun-word">
                    <span class="slot-fixed">barn</span>
                </span>
                <span class="sentence-slot slot-verb-anchor" id="live-slot-verb">
                    <span class="slot-placeholder">2. Tidsanker ?</span>
                </span>
            </div>
        </div>
    `;

    viewContainer.appendChild(stageCard);

    // ==========================================================
    // INTERAKTIONS-OMRÅDET (TRIN 1, 2, 3, 4, 5)
    // ==========================================================
    const interactionCard = document.createElement('div');
    interactionCard.className = 'grounding-interaction-card';
    viewContainer.appendChild(interactionCard);

    // DOM referencer til SVG elementer
    const balloonCraft = stageCard.querySelector('#balloon-craft');
    const tetherRope = stageCard.querySelector('#tether-rope');
    const groundAnchor = stageCard.querySelector('#ground-anchor');
    const burnerFlame = stageCard.querySelector('#burner-flame');
    const balloonBadgeText = stageCard.querySelector('#balloon-badge-text');

    const liveSlotNoun = stageCard.querySelector('#live-slot-noun');
    const liveSlotVerb = stageCard.querySelector('#live-slot-verb');

    // Opdater synkron scene
    function updateLiveStage() {
        // Noun anchor status
        if (state.nounAnchor) {
            // Animer linen der kastes og låser
            tetherRope.style.strokeDashoffset = '0';
            tetherRope.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            groundAnchor.style.transform = 'translate(120px, 185px) scale(1)';
            groundAnchor.style.opacity = '1';
            groundAnchor.style.transition = 'transform 0.4s ease 0.6s, opacity 0.4s ease 0.6s';

            balloonBadgeText.textContent = `⚓ Forankret med "${state.nounAnchor}"`;
            balloonBadgeText.style.fill = '#fcd34d';

            liveSlotNoun.innerHTML = `<span class="slot-active slot-noun-filled">${state.nounAnchor}</span>`;
        }

        // Verb anchor status
        if (state.verbAnchor) {
            burnerFlame.style.opacity = '1';
            burnerFlame.style.transition = 'opacity 0.4s ease';

            liveSlotVerb.innerHTML = `<span class="slot-active slot-verb-filled">${state.verbAnchor}</span>`;
            balloonBadgeText.textContent = `⏰ Forankret i tid: "${state.verbAnchor}"`;
            balloonBadgeText.style.fill = '#4ade80';
        }

        // Grounded (Trin 3 færdiggjort)
        if (state.step >= 4) {
            balloonCraft.style.transform = 'translate(250px, 125px)';
            balloonCraft.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
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
            <div class="step-badge">Trin 1 af 3: Forankr navneordet</div>
            <h2 class="step-title">${getTranslation('groundingStep1')}</h2>
            <p class="step-guide">
                Ordet <strong>"barn"</strong> svæver abstrakt oppe i luften. Vælg hvordan du vil tøjre barnet til virkeligheden:
            </p>

            <div class="anchor-chips-grid">
                <button type="button" class="anchor-pick-card" data-anchor="Mit">
                    <div class="card-icon">🏷️</div>
                    <div class="card-main">
                        <span class="card-word">Mit</span>
                        <span class="card-label">${getTranslation('groundingRelationPrefix')}</span>
                    </div>
                    <div class="card-desc">Barnet har en personlig relation til taleren.</div>
                </button>

                <button type="button" class="anchor-pick-card" data-anchor="Et">
                    <div class="card-icon">🔦</div>
                    <div class="card-main">
                        <span class="card-word">Et</span>
                        <span class="card-label">${getTranslation('groundingIndefinitePrefix')}</span>
                    </div>
                    <div class="card-desc">Et tilfældigt barn blandt alle verdens børn.</div>
                </button>

                <button type="button" class="anchor-pick-card" data-anchor="Det">
                    <div class="card-icon">👉</div>
                    <div class="card-main">
                        <span class="card-word">Det</span>
                        <span class="card-label">${getTranslation('groundingDistalPrefix')}</span>
                    </div>
                    <div class="card-desc">Barnet derhenne på afstand (pegefelt).</div>
                </button>

                <button type="button" class="anchor-pick-card" data-anchor="Dette">
                    <div class="card-icon">📍</div>
                    <div class="card-main">
                        <span class="card-word">Dette</span>
                        <span class="card-label">${getTranslation('groundingProximalPrefix')}</span>
                    </div>
                    <div class="card-desc">Barnet lige her og nu i umiddelbar nærhed.</div>
                </button>
            </div>
        `;

        stepDiv.querySelectorAll('.anchor-pick-card').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.getAttribute('data-anchor');
                state.nounAnchor = chosen;
                btn.classList.add('selected');

                // Lyd & live opdatering
                speakDanish(chosen + ' barn');
                updateLiveStage();

                setTimeout(() => {
                    state.step = 2;
                    renderStep();
                }, 750);
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
            <div class="step-badge">Trin 2 af 3: Forankr handlingen i tiden</div>
            <h2 class="step-title">${getTranslation('groundingStep2')}</h2>
            <p class="step-guide">
                Handlingen <strong>"at spise"</strong> skal have et tidspunkt for at kunne finde sted i virkeligheden:
            </p>

            <div class="anchor-chips-grid grid-3-cols">
                <button type="button" class="anchor-pick-card" data-verb="spiser">
                    <div class="card-icon">🟢</div>
                    <div class="card-main">
                        <span class="card-word">spiser</span>
                        <span class="card-label">${getTranslation('tenseNow')}</span>
                    </div>
                    <div class="card-desc">Handlingen foregår lige nu i nutiden.</div>
                </button>

                <button type="button" class="anchor-pick-card" data-verb="spiste">
                    <div class="card-icon">📍</div>
                    <div class="card-main">
                        <span class="card-word">spiste</span>
                        <span class="card-label">${getTranslation('tensePast')}</span>
                    </div>
                    <div class="card-desc">Handlingen skete i går eller tidligere.</div>
                </button>

                <button type="button" class="anchor-pick-card" data-verb="skal spise">
                    <div class="card-icon">🔵</div>
                    <div class="card-main">
                        <span class="card-word">skal spise</span>
                        <span class="card-label">${getTranslation('tenseFuture')}</span>
                    </div>
                    <div class="card-desc">Handlingen er planlagt ude i fremtiden.</div>
                </button>
            </div>
        `;

        stepDiv.querySelectorAll('.anchor-pick-card').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.getAttribute('data-verb');
                state.verbAnchor = chosen;
                btn.classList.add('selected');

                speakDanish(chosen);
                updateLiveStage();

                setTimeout(() => {
                    state.step = 3;
                    renderStep();
                }, 750);
            };
        });

        interactionCard.appendChild(stepDiv);
    }

    // -------------------------------------------------------------
    // TRIN 3: GROUNDING (Samling på Jorden)
    // -------------------------------------------------------------
    function renderAssembleStep() {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-box animate-in';

        stepDiv.innerHTML = `
            <div class="step-badge">Trin 3 af 3: Landing på Jorden</div>
            <h2 class="step-title">${getTranslation('groundingStep3')}</h2>
            <p class="step-guide">
                Tryk på brikkerne i den rigtige rækkefølge (eller træk dem) for at samle den komplette sætning på jorden:
            </p>

            <div class="drag-pool-box">
                <div class="pool-label">Kildebrikker (tryk for at placere på jorden):</div>
                <div class="drag-pool-row" id="drag-source">
                    <button type="button" class="puzzle-brick" data-word="${state.nounAnchor}">${state.nounAnchor}</button>
                    <button type="button" class="puzzle-brick" data-word="barn">barn</button>
                    <button type="button" class="puzzle-brick" data-word="${state.verbAnchor}">${state.verbAnchor}</button>
                </div>
            </div>

            <div class="ground-landing-box">
                <div class="ground-landing-label">🌱 Jorden (The Ground):</div>
                <div class="ground-landing-zone" id="drag-target"></div>
            </div>

            <div class="ground-actions-row">
                <button type="button" class="btn-check-ground" id="btn-check-assembly">
                    <span>⚓</span>
                    <span>${getTranslation('checkResult')}</span>
                </button>
                <button type="button" class="btn-reset-assembly" id="btn-reset-slots">
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

        // Tap-to-place interaktion
        function attachBrickEvents() {
            sourceRow.querySelectorAll('.puzzle-brick').forEach(brick => {
                brick.onclick = () => {
                    targetRow.appendChild(brick);
                    brick.classList.add('in-ground');
                    speakDanish(brick.dataset.word);
                    attachBrickEvents();
                };
            });

            targetRow.querySelectorAll('.puzzle-brick').forEach(brick => {
                brick.onclick = () => {
                    sourceRow.appendChild(brick);
                    brick.classList.remove('in-ground');
                    attachBrickEvents();
                };
            });
        }
        attachBrickEvents();

        // Nulstil
        resetBtn.onclick = () => {
            targetRow.querySelectorAll('.puzzle-brick').forEach(b => {
                sourceRow.appendChild(b);
                b.classList.remove('in-ground');
            });
            feedbackBox.style.display = 'none';
        };

        // Tjek sætning
        checkBtn.onclick = () => {
            const placedWords = Array.from(targetRow.querySelectorAll('.puzzle-brick')).map(b => b.dataset.word.trim());
            const constructed = placedWords.join(' ').toLowerCase();
            const expected = `${state.nounAnchor} barn ${state.verbAnchor}`.toLowerCase();

            if (constructed === expected) {
                const fullSentence = `${state.nounAnchor} barn ${state.verbAnchor}.`;
                feedbackBox.style.display = 'block';
                feedbackBox.className = 'grounding-feedback-box success-box';
                feedbackBox.innerHTML = `
                    <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.3rem;">
                        🎉 ${getTranslation('groundingSuccess')}
                    </div>
                    <div style="font-size: 1.15rem; color: #f8fafc; font-weight: 700; margin-bottom: 0.8rem;">
                        "${fullSentence}"
                    </div>
                    <p style="margin: 0; color: #cbd5e1; font-size: 0.95rem;">
                        Ballonen er nu landet trygt på jorden. Lad os se den konkrete visuelle forankring og tidsaksen!
                    </p>
                `;

                speakDanish(fullSentence);
                checkBtn.disabled = true;

                // Opdater scenen: Ballonen lander blødt
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
                    Husk rækkefølgen: Først rumligt anker (<em>${state.nounAnchor}</em>), derefter navneordet (<em>barn</em>) og til sidst tidsankeret (<em>${state.verbAnchor}</em>).
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
                    <svg viewBox="0 0 320 140" class="modern-scene-svg">
                        <defs>
                            <linearGradient id="relWarm" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stop-color="#f43f5e"/>
                                <stop offset="100%" stop-color="#fb7185"/>
                            </linearGradient>
                        </defs>
                        <!-- Voksen -->
                        <circle cx="100" cy="50" r="14" fill="#38bdf8"/>
                        <path d="M 85 80 Q 100 68 115 80 L 115 125 L 85 125 Z" fill="#0284c7"/>
                        <!-- Barn -->
                        <circle cx="180" cy="70" r="10" fill="#f43f5e"/>
                        <path d="M 170 92 Q 180 84 190 92 L 190 125 L 170 125 Z" fill="#e11d48"/>
                        <!-- Varm forbindelseslinje & Hjerte -->
                        <path d="M 115 85 Q 148 70 170 95" stroke="url(#relWarm)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                        <text x="145" y="70" font-size="18" text-anchor="middle">❤️</text>
                        <text x="100" y="137" font-size="10" fill="#94a3b8" text-anchor="middle">Mig (taleren)</text>
                        <text x="180" y="137" font-size="10" fill="#94a3b8" text-anchor="middle">Mit barn</text>
                    </svg>
                </div>
            `;
        } else if (anchor === 'Et') {
            sceneTitle = getTranslation('groundingIndefinite');
            sceneHtml = `
                <div class="visual-scene-box">
                    <svg viewBox="0 0 320 140" class="modern-scene-svg">
                        <!-- Spotlys kegle -->
                        <polygon points="160,10 90,130 230,130" fill="rgba(250, 204, 21, 0.15)"/>
                        <!-- Børn i skyggen -->
                        <g opacity="0.3">
                            <circle cx="70" cy="75" r="9" fill="#94a3b8"/>
                            <path d="M 62 95 Q 70 88 78 95 L 78 125 L 62 125 Z" fill="#64748b"/>
                            <circle cx="250" cy="75" r="9" fill="#94a3b8"/>
                            <path d="M 242 95 Q 250 88 258 95 L 258 125 L 242 125 Z" fill="#64748b"/>
                        </g>
                        <!-- Det udvalgte barn i spotlyset -->
                        <circle cx="160" cy="70" r="10" fill="#facc15" filter="drop-shadow(0 0 8px #facc15)"/>
                        <path d="M 150 92 Q 160 84 170 92 L 170 125 L 150 125 Z" fill="#eab308"/>
                        <text x="160" y="137" font-size="10" fill="#facc15" font-weight="700" text-anchor="middle">Et barn (vilkårligt)</text>
                    </svg>
                </div>
            `;
        } else if (anchor === 'Det') {
            sceneTitle = getTranslation('groundingDistal');
            sceneHtml = `
                <div class="visual-scene-box">
                    <svg viewBox="0 0 320 140" class="modern-scene-svg">
                        <!-- Taleren der peger -->
                        <g transform="translate(60, 45)">
                            <circle cx="0" cy="12" r="12" fill="#38bdf8"/>
                            <path d="M -12 38 Q 0 28 12 38 L 12 80 L -12 80 Z" fill="#0284c7"/>
                            <!-- Pegende arm -->
                            <line x1="8" y1="40" x2="45" y2="35" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
                        </g>
                        <!-- Laser-pegestråle mod barnet på afstand -->
                        <line x1="110" y1="80" x2="230" y2="80" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6 4" opacity="0.8"/>
                        <polygon points="230,76 240,80 230,84" fill="#38bdf8"/>
                        <!-- Barnet på afstand -->
                        <g transform="translate(260, 60)">
                            <circle cx="0" cy="10" r="9" fill="#f43f5e"/>
                            <path d="M -9 28 Q 0 20 9 28 L 9 65 L -9 65 Z" fill="#e11d48"/>
                        </g>
                        <text x="60" y="137" font-size="10" fill="#94a3b8" text-anchor="middle">Taleren</text>
                        <text x="260" y="137" font-size="10" fill="#38bdf8" font-weight="700" text-anchor="middle">Det barn (på afstand)</text>
                    </svg>
                </div>
            `;
        } else {
            sceneTitle = getTranslation('groundingProximal');
            sceneHtml = `
                <div class="visual-scene-box">
                    <svg viewBox="0 0 320 140" class="modern-scene-svg">
                        <!-- Nærværs-boble / cirkel -->
                        <ellipse cx="160" cy="85" rx="90" ry="40" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5 3"/>
                        <!-- Taleren og barnet helt tæt på hinanden -->
                        <g transform="translate(135, 50)">
                            <circle cx="0" cy="12" r="12" fill="#38bdf8"/>
                            <path d="M -12 38 Q 0 28 12 38 L 12 75 L -12 75 Z" fill="#0284c7"/>
                        </g>
                        <g transform="translate(185, 62)">
                            <circle cx="0" cy="10" r="9" fill="#f43f5e"/>
                            <path d="M -9 28 Q 0 20 9 28 L 9 63 L -9 63 Z" fill="#e11d48"/>
                        </g>
                        <text x="160" y="137" font-size="10" fill="#38bdf8" font-weight="700" text-anchor="middle">Dette barn (lige her i nærværet)</text>
                    </svg>
                </div>
            `;
        }

        // Tidslinje markering
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
            <div class="step-badge" style="background: rgba(34, 197, 94, 0.15); color: #4ade80;">
                Forankring bekræftet!
            </div>
            <h2 class="step-title">Sætningen: "${state.nounAnchor} barn ${state.verbAnchor}."</h2>

            <div class="visual-anchor-card">
                <div class="card-mini-title">${sceneTitle}</div>
                ${sceneHtml}
            </div>

            <!-- Tidsaksen for verbet -->
            <div class="visual-timeline-card">
                <div class="timeline-header-row">
                    <span class="timeline-title">Handlingen forankret i tiden:</span>
                    <span class="timeline-active-tag" style="color: ${tenseColor};">${state.verbAnchor} (${tenseLabel})</span>
                </div>
                <div class="timeline-track-bar">
                    <div class="track-line"></div>
                    <div class="track-nodes">
                        <span class="track-node ${state.verbAnchor === 'spiste' ? 'active-node' : ''}">Fortid (datid)</span>
                        <span class="track-node ${state.verbAnchor === 'spiser' ? 'active-node' : ''}">Nutid (lige nu)</span>
                        <span class="track-node ${state.verbAnchor === 'skal spise' ? 'active-node' : ''}">Fremtid (planlagt)</span>
                    </div>
                    <div class="timeline-glow-cursor" style="left: ${pointerPercent}; background: ${tenseColor};"></div>
                </div>
            </div>

            <div style="margin-top: 2rem; text-align: center;">
                <button type="button" class="btn-proceed-bridge" id="btn-goto-final">
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
            <div class="completion-hero">
                <div class="completion-crown">🏆</div>
                <h2 style="font-size: 1.8rem; color: white; margin-bottom: 0.5rem;">
                    Grundsætningen er solidt forankret!
                </h2>
                <div class="hero-sentence-showcase">
                    <span class="hero-sentence-text">"${completedSentence}"</span>
                    <button type="button" class="btn-audio-hero" id="btn-speak-final">
                        <span>🔊</span>
                        <span>Lyt</span>
                    </button>
                </div>
                <p style="color: #94a3b8; font-size: 1.05rem; max-width: 620px; margin: 0 auto 2rem; line-height: 1.6;">
                    ${getTranslation('groundingFinalMsg')}
                </p>
            </div>

            <!-- DEN STORE SAMMENHÆNGENDE GRAMMATIK-STI -->
            <div class="grammar-chain-card">
                <div class="chain-title">
                    <span>Den store grammatik-sti: Se hvordan sætningen vokser</span>
                </div>

                <div class="chain-steps-list">
                    <!-- Trin 1: Intro (Gennemført) -->
                    <div class="chain-step-row step-done">
                        <div class="step-status-icon">✓</div>
                        <div class="step-info">
                            <div class="step-name">1. Grundsætning (Intro)</div>
                            <div class="step-sentence-preview">"${state.nounAnchor} barn ${state.verbAnchor}."</div>
                        </div>
                        <div class="step-badge-status">Gennemført</div>
                    </div>

                    <!-- Trin 2: Modalverber (Næste skridt!) -->
                    <div class="chain-step-row step-next">
                        <div class="step-status-icon">⚡</div>
                        <div class="step-info">
                            <div class="step-name">2. Modalverber (Vilje, pligt og evne)</div>
                            <div class="step-sentence-preview">"Mit barn <strong>[vil / skal / kan]</strong> spise..."</div>
                        </div>
                        <div class="step-badge-status status-next">Næste skridt</div>
                    </div>

                    <!-- Trin 3: Adjektiver -->
                    <div class="chain-step-row step-upcoming">
                        <div class="step-status-icon">🏷️</div>
                        <div class="step-info">
                            <div class="step-name">3. Adjektiver (Beskrivelse)</div>
                            <div class="step-sentence-preview">"Mit <strong>[lille / sultne]</strong> barn vil spise..."</div>
                        </div>
                        <div class="step-badge-status status-upcoming">Trin 3</div>
                    </div>

                    <!-- Trin 4: Adverbier -->
                    <div class="chain-step-row step-upcoming">
                        <div class="step-status-icon">🌊</div>
                        <div class="step-info">
                            <div class="step-name">4. Adverbier (Måde, grad og tid)</div>
                            <div class="step-sentence-preview">"Mit lille barn vil spise <strong>[langsomt / gerne]</strong>..."</div>
                        </div>
                        <div class="step-badge-status status-upcoming">Trin 4</div>
                    </div>

                    <!-- Trin 5: Konjunktioner -->
                    <div class="chain-step-row step-upcoming">
                        <div class="step-status-icon">🌉</div>
                        <div class="step-info">
                            <div class="step-name">5. Konjunktioner (Tekstflow & bindeord)</div>
                            <div class="step-sentence-preview">"Mit lille barn vil spise, <strong>[fordi]</strong> det er sultent..."</div>
                        </div>
                        <div class="step-badge-status status-upcoming">Trin 5</div>
                    </div>
                </div>
            </div>

            <!-- TEASER OG KNAP TIL MODALVERBER -->
            <div class="modal-launch-card">
                <h3 style="color: #fbbf24; font-size: 1.3rem; margin-bottom: 0.5rem;">
                    Tag "${completedSentence}" med ind i Modalverber
                </h3>
                <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 580px; margin: 0 auto 1.5rem; line-height: 1.5;">
                    Hvad sker der, når barnet ikke bare <em>spiser</em>, men <strong>vil</strong>, <strong>skal</strong> eller <strong>må</strong> spise?
                </p>
                <button type="button" class="btn-start-modal-primary" id="btn-start-modal-chain">
                    <span>${getTranslation('nextStepModalVerbs')} ➔</span>
                </button>
            </div>

            <!-- Start forfra mulighed -->
            <div style="text-align: center; margin-top: 1.5rem;">
                <button type="button" class="btn-restart-intro" id="btn-restart-all">
                    Prøv med et andet anker 🔄
                </button>
            </div>
        `;

        stepDiv.querySelector('#btn-speak-final').onclick = () => speakDanish(completedSentence);

        // SEND STATE DIREKTE VIDERE TIL MODALVERBER!
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

    // Initial kørsel
    renderStep();

    // ==========================================================
    // STYLES FOR GROUNDING 2.0
    // ==========================================================
    if (!document.getElementById('grounding-2-styles')) {
        const style = document.createElement('style');
        style.id = 'grounding-2-styles';
        style.textContent = `
            .grounding-view-2 {
                max-width: 900px;
                margin: 0 auto;
                padding: 0.5rem 1rem 4rem;
                color: #f8fafc;
            }

            .grounding-header-hero {
                text-align: center;
                margin-bottom: 1.5rem;
            }
            .grounding-journey-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(56, 189, 248, 0.12);
                border: 1px solid rgba(56, 189, 248, 0.3);
                padding: 0.3rem 0.85rem;
                border-radius: 9999px;
                font-size: 0.8rem;
                font-weight: 700;
                color: #38bdf8;
                margin-bottom: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .badge-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #38bdf8;
                box-shadow: 0 0 8px #38bdf8;
            }
            .grounding-header-hero h1 {
                font-size: 2rem;
                font-weight: 800;
                margin: 0 0 0.4rem;
                color: #ffffff;
                letter-spacing: -0.02em;
            }
            .grounding-subtitle {
                color: #94a3b8;
                font-size: 1.05rem;
                max-width: 660px;
                margin: 0 auto;
                line-height: 1.5;
            }

            /* Stage Card */
            .grounding-stage-card {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 20px;
                padding: 1.25rem;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
                margin-bottom: 1.75rem;
            }
            .sky-canvas-wrapper {
                width: 100%;
                border-radius: 14px;
                overflow: hidden;
            }
            .grounding-sky-svg {
                width: 100%;
                height: auto;
                display: block;
            }

            /* Live Sentence Strip */
            .grounding-live-strip {
                margin-top: 1rem;
                background: rgba(15, 23, 42, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 0.8rem 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            .strip-label {
                font-size: 0.78rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #94a3b8;
                font-weight: 600;
            }
            .live-sentence-slots {
                display: flex;
                gap: 0.6rem;
                flex-wrap: wrap;
                justify-content: center;
            }
            .sentence-slot {
                padding: 0.45rem 1rem;
                border-radius: 8px;
                font-size: 1.15rem;
                font-weight: 700;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .slot-noun-anchor, .slot-verb-anchor {
                background: rgba(255, 255, 255, 0.04);
                border: 1.5px dashed rgba(255, 255, 255, 0.2);
                color: #64748b;
                min-width: 110px;
            }
            .slot-noun {
                background: rgba(244, 63, 94, 0.15);
                border: 1.5px solid rgba(244, 63, 94, 0.4);
                color: #fda4af;
            }
            .slot-noun-filled {
                background: rgba(251, 191, 36, 0.2);
                border: 1.5px solid #fbbf24;
                color: #fde68a;
                padding: 0.2rem 0.6rem;
                border-radius: 6px;
            }
            .slot-verb-filled {
                background: rgba(34, 197, 94, 0.2);
                border: 1.5px solid #22c55e;
                color: #86efac;
                padding: 0.2rem 0.6rem;
                border-radius: 6px;
            }

            /* Interaction Card */
            .grounding-interaction-card {
                background: #1e293b;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 1.8rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
            }
            .step-badge {
                display: inline-block;
                background: rgba(56, 189, 248, 0.15);
                color: #38bdf8;
                font-size: 0.78rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                padding: 0.25rem 0.65rem;
                border-radius: 6px;
                margin-bottom: 0.5rem;
            }
            .step-title {
                font-size: 1.45rem;
                font-weight: 800;
                color: white;
                margin: 0 0 0.5rem;
            }
            .step-guide {
                color: #94a3b8;
                font-size: 1rem;
                margin: 0 0 1.5rem;
                line-height: 1.5;
            }

            /* Anchor Chips Grid */
            .anchor-chips-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
                gap: 1rem;
            }
            .grid-3-cols {
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            }
            .anchor-pick-card {
                background: #0f172a;
                border: 1.5px solid rgba(255, 255, 255, 0.12);
                border-radius: 14px;
                padding: 1.2rem;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
            }
            .anchor-pick-card:hover {
                border-color: #38bdf8;
                background: rgba(56, 189, 248, 0.08);
                transform: translateY(-2px);
            }
            .anchor-pick-card.selected {
                border-color: #4ade80 !important;
                background: rgba(34, 197, 94, 0.15) !important;
            }
            .card-icon {
                font-size: 1.6rem;
                margin-bottom: 0.2rem;
            }
            .card-main {
                display: flex;
                align-items: baseline;
                gap: 0.4rem;
            }
            .card-word {
                font-size: 1.4rem;
                font-weight: 800;
                color: #ffffff;
            }
            .card-label {
                font-size: 0.8rem;
                color: #94a3b8;
                font-weight: 600;
            }
            .card-desc {
                font-size: 0.82rem;
                color: #cbd5e1;
                line-height: 1.4;
            }

            /* Puzzle / Assembly */
            .drag-pool-box {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 1rem;
                margin-bottom: 1.25rem;
            }
            .pool-label {
                font-size: 0.82rem;
                color: #94a3b8;
                font-weight: 600;
                margin-bottom: 0.6rem;
            }
            .drag-pool-row {
                display: flex;
                gap: 0.8rem;
                flex-wrap: wrap;
                min-height: 48px;
                align-items: center;
            }
            .puzzle-brick {
                background: #1e293b;
                border: 1.5px solid rgba(255, 255, 255, 0.18);
                color: white;
                font-size: 1.15rem;
                font-weight: 700;
                padding: 0.6rem 1.2rem;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }
            .puzzle-brick:hover {
                border-color: #38bdf8;
                transform: translateY(-2px);
            }
            .puzzle-brick.in-ground {
                background: rgba(34, 197, 94, 0.18);
                border-color: #22c55e;
                color: #86efac;
            }

            .ground-landing-box {
                background: rgba(21, 128, 61, 0.12);
                border: 2px dashed rgba(74, 222, 128, 0.4);
                border-radius: 14px;
                padding: 1.25rem;
                margin-bottom: 1.5rem;
            }
            .ground-landing-label {
                font-size: 0.85rem;
                font-weight: 700;
                color: #4ade80;
                margin-bottom: 0.6rem;
            }
            .ground-landing-zone {
                display: flex;
                gap: 0.8rem;
                flex-wrap: wrap;
                min-height: 52px;
                align-items: center;
            }

            .ground-actions-row {
                display: flex;
                gap: 1rem;
                align-items: center;
                flex-wrap: wrap;
            }
            .btn-check-ground {
                background: #22c55e;
                color: #0f172a;
                border: none;
                padding: 0.8rem 1.6rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }
            .btn-check-ground:hover {
                background: #16a34a;
                transform: translateY(-1px);
            }
            .btn-reset-assembly {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #94a3b8;
                padding: 0.75rem 1.2rem;
                border-radius: 12px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
            }
            .btn-reset-assembly:hover {
                color: white;
                border-color: white;
            }

            .grounding-feedback-box {
                margin-top: 1.2rem;
                padding: 1.2rem;
                border-radius: 12px;
                line-height: 1.5;
            }
            .success-box {
                background: rgba(34, 197, 94, 0.15);
                border: 1px solid rgba(34, 197, 94, 0.4);
                color: #86efac;
            }
            .error-box {
                background: rgba(239, 68, 68, 0.15);
                border: 1px solid rgba(239, 68, 68, 0.4);
                color: #fca5a5;
            }

            /* Visual Exploration */
            .visual-anchor-card, .visual-timeline-card {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                padding: 1.25rem;
                margin-bottom: 1.25rem;
            }
            .card-mini-title {
                font-size: 0.95rem;
                font-weight: 700;
                color: #38bdf8;
                margin-bottom: 0.8rem;
            }
            .modern-scene-svg {
                width: 100%;
                max-width: 440px;
                height: auto;
                display: block;
                margin: 0 auto;
            }

            /* Timeline */
            .timeline-header-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                font-size: 0.9rem;
            }
            .timeline-title { color: #94a3b8; font-weight: 600; }
            .timeline-active-tag { font-weight: 800; }
            .timeline-track-bar {
                position: relative;
                padding: 1.5rem 0.5rem 0.5rem;
            }
            .track-line {
                height: 4px;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 2px;
                position: absolute;
                top: 50%;
                left: 10%;
                right: 10%;
                transform: translateY(-50%);
            }
            .track-nodes {
                display: flex;
                justify-content: space-between;
                position: relative;
                z-index: 2;
            }
            .track-node {
                font-size: 0.82rem;
                font-weight: 600;
                color: #64748b;
                background: #0f172a;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
            }
            .track-node.active-node {
                color: white;
                font-weight: 800;
            }
            .timeline-glow-cursor {
                position: absolute;
                top: 50%;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 12px currentColor;
                z-index: 3;
                transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* Progression Buttons */
            .btn-proceed-bridge {
                background: #38bdf8;
                color: #0f172a;
                border: none;
                padding: 0.85rem 1.8rem;
                border-radius: 12px;
                font-size: 1.05rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-proceed-bridge:hover {
                background: #7dd3fc;
                transform: translateY(-2px);
            }

            /* Final Completion & Chain */
            .completion-hero {
                text-align: center;
                margin-bottom: 2rem;
            }
            .completion-crown {
                font-size: 3rem;
                margin-bottom: 0.5rem;
            }
            .hero-sentence-showcase {
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                background: rgba(34, 197, 94, 0.15);
                border: 1.5px solid rgba(34, 197, 94, 0.4);
                padding: 0.6rem 1.4rem;
                border-radius: 9999px;
                margin-bottom: 1.2rem;
            }
            .hero-sentence-text {
                font-size: 1.45rem;
                font-weight: 800;
                color: #4ade80;
            }
            .btn-audio-hero {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 0.3rem 0.75rem;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.3rem;
            }
            .btn-audio-hero:hover {
                background: rgba(255, 255, 255, 0.25);
            }

            /* Grammar Chain Card */
            .grammar-chain-card {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 16px;
                padding: 1.5rem;
                margin-bottom: 2rem;
            }
            .chain-title {
                font-size: 1rem;
                font-weight: 700;
                color: #38bdf8;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.4rem;
            }
            .chain-steps-list {
                display: flex;
                flex-direction: column;
                gap: 0.65rem;
            }
            .chain-step-row {
                display: flex;
                align-items: center;
                gap: 0.9rem;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.07);
                border-radius: 12px;
                padding: 0.75rem 1rem;
            }
            .step-done {
                border-color: rgba(34, 197, 94, 0.3);
                background: rgba(34, 197, 94, 0.08);
            }
            .step-next {
                border-color: rgba(251, 191, 36, 0.4);
                background: rgba(251, 191, 36, 0.1);
            }
            .step-status-icon {
                font-size: 1.25rem;
                width: 28px;
                text-align: center;
            }
            .step-info {
                flex: 1;
            }
            .step-name {
                font-size: 0.92rem;
                font-weight: 700;
                color: white;
            }
            .step-sentence-preview {
                font-size: 0.85rem;
                color: #94a3b8;
                margin-top: 0.15rem;
            }
            .step-badge-status {
                font-size: 0.75rem;
                font-weight: 700;
                padding: 0.2rem 0.6rem;
                border-radius: 6px;
                background: rgba(34, 197, 94, 0.2);
                color: #4ade80;
            }
            .status-next {
                background: rgba(251, 191, 36, 0.2);
                color: #fbbf24;
            }
            .status-upcoming {
                background: rgba(255, 255, 255, 0.06);
                color: #64748b;
            }

            /* Modal Launch Card */
            .modal-launch-card {
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.05));
                border: 1.5px solid rgba(251, 191, 36, 0.4);
                border-radius: 18px;
                padding: 1.8rem;
                text-align: center;
                box-shadow: 0 8px 25px rgba(251, 191, 36, 0.15);
            }
            .btn-start-modal-primary {
                background: #fbbf24;
                color: #0f172a;
                border: none;
                padding: 0.9rem 2rem;
                border-radius: 14px;
                font-size: 1.15rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
            }
            .btn-start-modal-primary:hover {
                background: #f59e0b;
                transform: scale(1.02);
                box-shadow: 0 6px 20px rgba(251, 191, 36, 0.5);
            }
            .btn-restart-intro {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                text-decoration: underline;
            }
            .btn-restart-intro:hover {
                color: white;
            }

            @media (max-width: 640px) {
                .grounding-header-hero h1 { font-size: 1.6rem; }
                .anchor-chips-grid { grid-template-columns: 1fr; }
                .live-sentence-slots { flex-direction: column; width: 100%; }
                .sentence-slot { width: 100%; }
            }
        `;
        document.head.appendChild(style);
    }

    container.appendChild(viewContainer);
}
