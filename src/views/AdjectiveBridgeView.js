import { getTranslation, appState } from '../utils/i18n.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';
import { baseUrl } from '../utils/config.js';

/**
 * AdjectiveBridgeView 2.0 - Kognitiv Projektør & Magnetisk Kongruens.
 * 
 * Didaktisk fundament:
 * 1. Projektøren: Adjektiver kaster lys og farve på substantivet ("barn"),
 *    og definerer dets egenskaber, tilstande eller følelser.
 * 2. Kongruens (Magneten): Substantivets køn og bestemthed (ankeret) fungerer
 *    som en magnet, der trækker den korrekte endelse på adjektivet:
 *    - Et barn (ubestemt intetkøn) -> T-magnet: sulten-T / stor-T
 *    - Mit / Det barn (bestemt form) -> E-magnet: sultn-E / stor-E
 * 3. Kæden udbygges:
 *    Mit + [lille / sultne] + barn + vil + spise.
 */
export function renderAdjectiveBridgeView(container, navigateFn, inheritedState = {}) {
    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container adjective-mobile-view';

    // State videreført fra Modalverber
    const state = {
        nounAnchor: inheritedState.nounAnchor || 'Mit',
        selectedNoun: inheritedState.selectedNoun || 'barn',
        selectedModal: inheritedState.selectedModal || 'vil',
        verbAnchor: inheritedState.verbAnchor || 'spiser',
        isPast: inheritedState.isPast || false,
        selectedAdjectiveId: inheritedState.selectedAdjectiveId || 'sulten',
        selectedAdjective: ''
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

    // Adjektiv-database med kognitive farver og former
    const ADJECTIVES = {
        'sulten': {
            id: 'sulten',
            icon: '🍏',
            labelEn: 'hungry',
            type: 'Tilstand',
            color: '#f59e0b',
            colorGlow: 'rgba(245, 158, 11, 0.45)',
            // Form afhænger af ankeret:
            forms: {
                indefEt: 'sultent',
                indefEn: 'sulten',
                definite: 'sultne',
                plural: 'sultne'
            },
            desc: 'Barnets fysiologiske tilstand (har brug for mad).'
        },
        'lille': {
            id: 'lille',
            icon: '🐣',
            labelEn: 'little / small',
            type: 'Størrelse',
            color: '#38bdf8',
            colorGlow: 'rgba(56, 189, 248, 0.45)',
            forms: {
                indefEt: 'lille',
                indefEn: 'lille',
                definite: 'lille',
                plural: 'små'
            },
            desc: 'Barnets fysiske alder og proportion.'
        },
        'glad': {
            id: 'glad',
            icon: '😊',
            labelEn: 'happy',
            type: 'Humør',
            color: '#22c55e',
            colorGlow: 'rgba(34, 197, 94, 0.45)',
            forms: {
                indefEt: 'glad',
                indefEn: 'glad',
                definite: 'glade',
                plural: 'glade'
            },
            desc: 'Barnets positive følelsesmæssige energi.'
        },
        'træt': {
            id: 'træt',
            icon: '💤',
            labelEn: 'tired',
            type: 'Energi',
            color: '#a855f7',
            colorGlow: 'rgba(168, 85, 247, 0.45)',
            forms: {
                indefEt: 'træt',
                indefEn: 'træt',
                definite: 'trætte',
                plural: 'trætte'
            },
            desc: 'Lavt energiniveau efter en lang dag.'
        }
    };

    // Er ankeret bestemt (Mit, Det, Dette) eller ubestemt (Et)?
    function isDefiniteAnchor() {
        return state.nounAnchor !== 'Et' && state.nounAnchor !== 'En';
    }

    // Beregn den korrekte bøjede form af adjektivet
    function getInflectedAdjective(adjId) {
        const item = ADJECTIVES[adjId] || ADJECTIVES['sulten'];
        if (isDefiniteAnchor()) {
            return item.forms.definite;
        }
        return item.forms.indefEt;
    }

    state.selectedAdjective = getInflectedAdjective(state.selectedAdjectiveId);

    function getModalWord() {
        return state.selectedModal || 'vil';
    }

    function getActionWord() {
        return state.selectedModal ? 'spise' : state.verbAnchor;
    }

    function getFullSentence() {
        return `${state.nounAnchor} ${state.selectedAdjective} ${state.selectedNoun} ${getModalWord()} ${getActionWord()}.`;
    }

    // -------------------------------------------------------------
    // TOP BAR & NAVIGATION
    // -------------------------------------------------------------
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '← ' + getTranslation('back');
    backBtn.onclick = () => navigateFn('modal_force', {
        nounAnchor: state.nounAnchor,
        selectedNoun: state.selectedNoun,
        selectedModal: state.selectedModal,
        verbAnchor: state.verbAnchor,
        isPast: state.isPast
    });
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Grammatik-menu
    viewContainer.appendChild(renderGrammarMenu('adjektiver', navigateFn));

    // Kompakt overskrift
    const headerEl = document.createElement('div');
    headerEl.className = 'adjective-hero-compact';
    headerEl.innerHTML = `
        <div class="adj-step-badge">
            <span class="badge-dot-live"></span>
            <span>Trin 3 af 5: Adjektiver</span>
        </div>
        <h1 class="adj-main-title">${getTranslation('adjectiveTitle')}</h1>
        <p class="adj-sub-desc">${getTranslation('adjectiveDesc')}</p>
    `;
    viewContainer.appendChild(headerEl);

    // =============================================================
    // DYNAMISK PROJEKTØR-SCENE (Aspect-ratio responsive SVG)
    // =============================================================
    const stageCard = document.createElement('div');
    stageCard.className = 'adj-stage-card';
    viewContainer.appendChild(stageCard);

    // =============================================================
    // LIVE SÆTNINGSBÅND (Mit + [lille] + barn + vil + spise)
    // =============================================================
    const stripCard = document.createElement('div');
    stripCard.className = 'adj-sentence-strip-card';
    viewContainer.appendChild(stripCard);

    // =============================================================
    // INTERAKTIONS-OMRÅDE
    // =============================================================
    const taskArea = document.createElement('div');
    taskArea.className = 'adj-task-area';
    viewContainer.appendChild(taskArea);

    // -------------------------------------------------------------
    // RENDER: PROJEKTØR-SCENEN
    // -------------------------------------------------------------
    function renderStage() {
        const adj = ADJECTIVES[state.selectedAdjectiveId] || ADJECTIVES['sulten'];
        const adjWord = getInflectedAdjective(state.selectedAdjectiveId);
        const beamColor = adj.color;
        const beamGlow = adj.colorGlow;

        stageCard.innerHTML = `
            <div class="stage-frame-wrapper">
                <svg class="adj-svg-fluid" viewBox="0 0 360 126" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id="adjNightGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#0a1128"/>
                            <stop offset="65%" stop-color="#1e293b"/>
                            <stop offset="100%" stop-color="#0f172a"/>
                        </linearGradient>

                        <linearGradient id="groundGradAdj" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#15803d"/>
                            <stop offset="100%" stop-color="#14532d"/>
                        </linearGradient>

                        <!-- Projektør lyskegle gradient -->
                        <linearGradient id="spotlightBeamGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stop-color="${beamColor}" stop-opacity="0.85"/>
                            <stop offset="30%" stop-color="${beamColor}" stop-opacity="0.45"/>
                            <stop offset="85%" stop-color="${beamColor}" stop-opacity="0.2"/>
                            <stop offset="100%" stop-color="${beamColor}" stop-opacity="0.0"/>
                        </linearGradient>

                        <filter id="beamFilter" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur"/>
                            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                        </filter>
                    </defs>

                    <!-- Baggrund -->
                    <rect x="0" y="0" width="360" height="126" rx="12" fill="url(#adjNightGrad)"/>

                    <!-- Jorden -->
                    <rect x="0" y="86" width="360" height="40" rx="0 0 12 12" fill="url(#groundGradAdj)"/>
                    <line x1="0" y1="86" x2="360" y2="86" stroke="#4ade80" stroke-width="1.5" opacity="0.6"/>

                    <!-- DYNAMISK LYSKEGLE FRA PROJEKTØREN (Mod barnet) -->
                    <path d="M 68 54 L 285 24 L 285 86 L 68 62 Z" fill="url(#spotlightBeamGrad)" filter="url(#beamFilter)"/>

                    <!-- LYS-AURA OMKRING BARNET -->
                    <ellipse cx="248" cy="56" rx="34" ry="28" fill="${beamGlow}" opacity="0.85" filter="url(#beamFilter)"/>

                    <!-- PROJEKTØREN TIL VENSTRE (x=45, y=56) -->
                    <g class="projector-hardware" transform="translate(42, 40)">
                        <!-- Stativ / holder -->
                        <line x1="12" y1="32" x2="12" y2="46" stroke="#64748b" stroke-width="3"/>
                        <line x1="12" y1="46" x2="0" y2="46" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="12" y1="46" x2="24" y2="46" stroke="#475569" stroke-width="2.5" stroke-linecap="round"/>

                        <!-- Projektør-lampehus -->
                        <path d="M 0 10 L 22 16 L 22 28 L 0 34 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
                        <!-- Pære / linse med glød -->
                        <ellipse cx="22" cy="22" rx="4" ry="8" fill="${beamColor}" filter="url(#beamFilter)"/>

                        <!-- Mærkat -->
                        <text x="12" y="58" fill="#94a3b8" font-size="8.5" font-weight="700" text-anchor="middle">
                            Projektør
                        </text>
                    </g>

                    <!-- BARNET I LYSET (Placeret ved x=248) -->
                    <g class="illuminated-child" transform="translate(248, 28)">
                        <!-- Hoved -->
                        <circle cx="0" cy="11" r="7.5" fill="#f8fafc"/>
                        <!-- Krop i projektørens farve -->
                        <path d="M -7 21 Q 0 18 7 21 L 8 42 L -8 42 Z" fill="${beamColor}" rx="3"/>
                        <!-- Ben til jorden (y=86, så 28 + 58 = 86) -->
                        <line x1="-4" y1="42" x2="-4" y2="58" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="4" y1="42" x2="4" y2="58" stroke="#f8fafc" stroke-width="2.5" stroke-linecap="round"/>

                        <!-- Egenskab / Ikon over hovedet -->
                        <g transform="translate(0, -6)">
                            <circle cx="0" cy="0" r="10" fill="rgba(15, 23, 42, 0.9)" stroke="${beamColor}" stroke-width="1.5"/>
                            <text x="0" y="3.5" font-size="10.5" text-anchor="middle">${adj.icon}</text>
                        </g>

                        <!-- STOR, TYDELIG TEKST PÅ JORDEN -->
                        <text x="0" y="74" fill="#ffffff" font-size="13.5" font-weight="900" text-anchor="middle">
                            ${state.nounAnchor} <tspan fill="${beamColor}">${adjWord}</tspan> ${state.selectedNoun}
                        </text>
                        <text x="0" y="86" fill="#cbd5e1" font-size="8.5" font-weight="700" text-anchor="middle">
                            (beskrevet med adjektiv)
                        </text>
                    </g>

                    <!-- TOP STATUS-BADGE -->
                    <g class="stage-top-badge" transform="translate(180, 15)">
                        <rect x="-105" y="-10" width="210" height="21" rx="10.5" fill="rgba(15, 23, 42, 0.94)" stroke="${beamColor}" stroke-width="1.3"/>
                        <text x="0" y="4" fill="${beamColor}" font-size="10" font-weight="900" text-anchor="middle">
                            💡 Projektør: Lyser med "${adjWord}"
                        </text>
                    </g>
                </svg>
            </div>
        `;
    }

    // -------------------------------------------------------------
    // RENDER: LIVE SÆTNINGSBÅND (5 sammenhængende led)
    // -------------------------------------------------------------
    function renderSentenceStrip() {
        const adj = ADJECTIVES[state.selectedAdjectiveId] || ADJECTIVES['sulten'];
        const adjWord = getInflectedAdjective(state.selectedAdjectiveId);
        const adjColor = adj.color;

        stripCard.innerHTML = `
            <div class="strip-top-row">
                <span class="strip-header-tag">Sætningens 5 led:</span>
                <button type="button" class="btn-tts-listen" id="btn-listen-strip">
                    <span>🔊</span>
                    <span>Lyt</span>
                </button>
            </div>

            <div class="strip-blocks-5-row">
                <!-- 1. Anker -->
                <div class="strip-block-part block-anchor">
                    <span class="part-word">${state.nounAnchor}</span>
                    <span class="part-tag">Anker</span>
                </div>

                <!-- 2. Adjektiv (Nyt led) -->
                <div class="strip-block-part block-adj-active" style="border-color: ${adjColor};">
                    <span class="part-word" style="color: ${adjColor};">${adjWord}</span>
                    <span class="part-tag" style="color: ${adjColor};">Adjektiv</span>
                </div>

                <!-- 3. Subjekt -->
                <div class="strip-block-part block-noun">
                    <span class="part-word">${state.selectedNoun}</span>
                    <span class="part-tag">Subjekt</span>
                </div>

                <!-- 4. Modal -->
                <div class="strip-block-part block-modal">
                    <span class="part-word" style="color: #fbbf24;">${getModalWord()}</span>
                    <span class="part-tag">Modal</span>
                </div>

                <!-- 5. Handling -->
                <div class="strip-block-part block-action">
                    <span class="part-word" style="color: #4ade80;">${getActionWord()}</span>
                    <span class="part-tag">Handling</span>
                </div>
            </div>
        `;

        stripCard.querySelector('#btn-listen-strip').onclick = () => {
            speakDanish(getFullSentence());
        };
    }

    // -------------------------------------------------------------
    // RENDER: INTERAKTIONS-OMRÅDE (4 Adjektiv-Kort + Kongruens)
    // -------------------------------------------------------------
    function renderInteractionArea() {
        taskArea.innerHTML = '';

        const activeAdj = ADJECTIVES[state.selectedAdjectiveId] || ADJECTIVES['sulten'];
        const isDef = isDefiniteAnchor();

        const box = document.createElement('div');
        box.className = 'adj-controls-container animate-in';

        box.innerHTML = `
            <div class="controls-title-row">
                <span class="section-label">Vælg en projektør-farve for at ændre barnets egenskab:</span>
            </div>

            <!-- DE 4 TAKTILE ADJEKTIV-KORT -->
            <div class="adj-cards-grid">
                ${Object.values(ADJECTIVES).map(item => {
                    const word = isDef ? item.forms.definite : item.forms.indefEt;
                    const isSelected = state.selectedAdjectiveId === item.id;
                    return `
                        <button type="button" class="adj-card-btn ${isSelected ? 'active-card' : ''}" 
                                data-id="${item.id}" style="--card-accent: ${item.color};">
                            <div class="card-head">
                                <span class="card-icon">${item.icon}</span>
                                <span class="card-word" style="color: ${item.color};">${word}</span>
                            </div>
                            <div class="card-badge" style="color: ${item.color};">${item.type} (${item.labelEn})</div>
                            <div class="card-desc">${item.desc}</div>
                        </button>
                    `;
                }).join('')}
            </div>

            <!-- KOGNITIV FORKLARINGSBOKS -->
            <div class="adj-explanation-box">
                <div class="expl-icon">💡</div>
                <div class="expl-body">
                    <strong>${state.nounAnchor} ${state.selectedAdjective} ${state.selectedNoun}:</strong><br>
                    Adjektivet lægger sig direkte foran substantivet og maler et specifikt billede. 
                    Når vi ændrer adjektivet, ændres barnets tilstand – men selve handlingen <em>(${getModalWord()} spise)</em> forbliver den samme.
                </div>
            </div>

            <!-- ========================================================= -->
            <!-- KONGRUENS: MAGNETEN BAG -T OG -E ENDELSER                 -->
            <!-- ========================================================= -->
            <div class="agreement-interactive-card">
                <div class="agreement-header">
                    <span class="agreement-pill">Kongruens-reglen</span>
                    <h3 class="agreement-h3">Hvorfor hedder det "${state.selectedAdjective}"?</h3>
                    <p class="agreement-p">${getTranslation('agreementDesc')}</p>
                </div>

                <!-- T/E MAGNET-VIPPE -->
                <div class="magnet-toggle-wrapper">
                    <span class="magnet-toggle-label">Test hvordan ankeret former adjektivets endelse:</span>
                    <div class="magnet-toggle-pill">
                        <button type="button" class="magnet-btn ${!isDef ? 'active' : ''}" id="btn-toggle-indef">
                            <span>🧲 Ubestemt (Et barn)</span>
                        </button>
                        <button type="button" class="magnet-btn ${isDef ? 'active' : ''}" id="btn-toggle-def">
                            <span>🧲 Bestemt (${state.nounAnchor} barn)</span>
                        </button>
                    </div>
                </div>

                <!-- DYNAMISK MAGNET-ILLUSTRATION -->
                <div class="magnet-diagram">
                    <div class="magnet-box box-magnet-noun">
                        <div class="diag-tag">Substantiv / Anker</div>
                        <div class="diag-word" style="color: #f8fafc;">
                            ${isDef ? state.nounAnchor + ' barn' : 'Et barn'}
                        </div>
                        <div class="diag-role">${isDef ? '🌟 Bestemt form' : '⚪ Ubestemt (intetkøn)'}</div>
                    </div>

                    <div class="magnet-flow-symbol">➔ trækker ➔</div>

                    <div class="magnet-box box-magnet-adj" style="border-color: ${activeAdj.color};">
                        <div class="diag-tag">Adjektivets form</div>
                        <div class="diag-word" style="color: ${activeAdj.color};">
                            ${state.selectedAdjective}
                        </div>
                        <div class="diag-role">
                            ${isDef ? 'Endelse: <strong>-e</strong>' : 'Endelse: <strong>-t</strong>'}
                        </div>
                    </div>
                </div>

                <div class="agreement-callout-msg">
                    ${getTranslation('agreementExpl')}
                </div>
            </div>

            <!-- ========================================================= -->
            <!-- DEN STORE GRAMMATIK-STI: BROEN TIL ADVERBIER              -->
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

                    <div class="roadmap-step-item done">
                        <div class="step-icon-badge">✓</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">2. Modalverber (Kraft & vilje)</div>
                            <div class="step-example-txt">"${state.nounAnchor} ${state.selectedNoun} ${getModalWord()} spise."</div>
                        </div>
                        <div class="step-status-pill done">Gennemført</div>
                    </div>

                    <div class="roadmap-step-item current">
                        <div class="step-icon-badge">🏷️</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">3. Adjektiver (Beskrivelse)</div>
                            <div class="step-example-txt">"${getFullSentence()}"</div>
                        </div>
                        <div class="step-status-pill current">Aktiv nu</div>
                    </div>

                    <div class="roadmap-step-item next">
                        <div class="step-icon-badge">🌊</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">4. Adverbier (Måde, grad og tid)</div>
                            <div class="step-example-txt">"${state.nounAnchor} ${state.selectedAdjective} ${state.selectedNoun} ${getModalWord()} spise <strong>[langsomt / gerne]</strong>..."</div>
                        </div>
                        <div class="step-status-pill next">Næste skridt</div>
                    </div>

                    <div class="roadmap-step-item future">
                        <div class="step-icon-badge">🌉</div>
                        <div class="step-text-body">
                            <div class="step-head-txt">5. Konjunktioner (Tekstflow & bindeord)</div>
                            <div class="step-example-txt">"${state.nounAnchor} ${state.selectedAdjective} ${state.selectedNoun} ${getModalWord()} spise, <strong>[fordi]</strong>..."</div>
                        </div>
                        <div class="step-status-pill future">Trin 5</div>
                    </div>
                </div>
            </div>

            <!-- GÅ VIDERE TIL ADVERBIER -->
            <div class="next-bridge-action-card">
                <h3 style="color: #38bdf8; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.35rem;">
                    Klar til næste trin: Tilføj Adverbier
                </h3>
                <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.15rem; line-height: 1.45;">
                    Tag sætningen <strong>"${getFullSentence()}"</strong> med videre og lær, hvordan adverbier beskriver selve måden, barnet spiser på.
                </p>
                <button type="button" class="btn-launch-adverb" id="btn-goto-adverbs">
                    <span>${getTranslation('nextStepAdverb') || 'Fortsæt til Adverbier'} ➔</span>
                </button>
            </div>
        `;

        // Klik på adjektiv-kort
        box.querySelectorAll('.adj-card-btn').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.dataset.id;
                state.selectedAdjectiveId = chosen;
                state.selectedAdjective = getInflectedAdjective(chosen);
                speakDanish(state.selectedAdjective);
                refreshUI();
            };
        });

        // Magnet-vippe: Ubestemt vs Bestemt
        const btnIndef = box.querySelector('#btn-toggle-indef');
        const btnDef = box.querySelector('#btn-toggle-def');

        btnIndef.onclick = () => {
            if (isDefiniteAnchor()) {
                state.nounAnchor = 'Et';
                state.selectedAdjective = getInflectedAdjective(state.selectedAdjectiveId);
                speakDanish(getFullSentence());
                refreshUI();
            }
        };

        btnDef.onclick = () => {
            if (!isDefiniteAnchor()) {
                state.nounAnchor = 'Mit';
                state.selectedAdjective = getInflectedAdjective(state.selectedAdjectiveId);
                speakDanish(getFullSentence());
                refreshUI();
            }
        };

        // Gå til adverbier
        box.querySelector('#btn-goto-adverbs').onclick = () => {
            navigateFn('adverb_bridge', {
                nounAnchor: state.nounAnchor,
                selectedNoun: state.selectedNoun,
                selectedAdjective: state.selectedAdjective,
                adjectivePart: state.selectedAdjective,
                selectedModal: state.selectedModal,
                verbAnchor: state.verbAnchor,
                selectedVerb: getActionWord(),
                isPast: state.isPast
            });
        };

        taskArea.appendChild(box);
    }

    function refreshUI() {
        renderStage();
        renderSentenceStrip();
        renderInteractionArea();
    }

    refreshUI();

    // =============================================================
    // 100% MOBIL-SIKRE STYLES (INGEN VANDRET OVERFLOW)
    // =============================================================
    const oldStyles = document.getElementById('adjective-mobile-styles');
    if (oldStyles) oldStyles.remove();
    const oldBridgeStyles = document.getElementById('adj-bridge-styles');
    if (oldBridgeStyles) oldBridgeStyles.remove();

    const style = document.createElement('style');
    style.id = 'adjective-mobile-styles';
    style.textContent = `
        .adjective-mobile-view {
            width: 100% !important;
            max-width: 760px !important;
            margin: 0 auto;
            padding: 0 0.2rem 3rem !important;
            box-sizing: border-box;
            overflow-x: hidden !important;
            color: #f8fafc;
        }

        .adjective-mobile-view .top-bar {
            margin-bottom: 0.35rem !important;
        }

        .adjective-mobile-view .grammar-nav-menu {
            margin-bottom: 0.5rem !important;
            padding: 0.25rem 0 !important;
        }

        /* Hero */
        .adjective-hero-compact {
            text-align: center;
            margin-bottom: 0.75rem;
            padding: 0 0.4rem;
        }
        .adj-step-badge {
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
        .adj-main-title {
            font-size: 1.45rem;
            font-weight: 800;
            margin: 0 0 0.25rem;
            color: #ffffff;
            line-height: 1.25;
        }
        .adj-sub-desc {
            color: #cbd5e1;
            font-size: 0.92rem;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.4;
        }

        /* Projektør-scene */
        .adj-stage-card {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 0.65rem 0.75rem;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
            margin-bottom: 0.85rem;
            width: 100%;
            box-sizing: border-box;
        }
        .stage-frame-wrapper {
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
        }
        .adj-svg-fluid {
            width: 100%;
            max-width: 100%;
            height: auto;
            display: block;
            aspect-ratio: 360 / 126;
        }

        /* Sætningsbånd - 5 led */
        .adj-sentence-strip-card {
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
        .strip-blocks-5-row {
            display: flex;
            gap: 0.35rem;
            width: 100%;
            box-sizing: border-box;
        }
        .strip-block-part {
            flex: 1;
            min-width: 0;
            padding: 0.45rem 0.2rem;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .block-adj-active {
            border: 2px solid #f59e0b;
            background: rgba(15, 23, 42, 0.9);
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.25);
        }
        .part-word {
            font-size: 1.05rem;
            font-weight: 900;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }
        .part-tag {
            font-size: 0.68rem;
            font-weight: 700;
            color: #94a3b8;
            margin-top: 0.15rem;
            white-space: nowrap;
        }

        /* 4 Adjektiv Kort (2x2 Grid) */
        .adj-cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.65rem;
            margin-bottom: 1rem;
            width: 100%;
            box-sizing: border-box;
        }
        .adj-card-btn {
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
        .adj-card-btn:hover {
            border-color: var(--card-accent);
            background: rgba(255, 255, 255, 0.05);
        }
        .adj-card-btn.active-card {
            border-color: var(--card-accent) !important;
            background: rgba(15, 23, 42, 0.95) !important;
            box-shadow: 0 0 16px var(--card-accent);
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
        .adj-explanation-box {
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
            color: #f59e0b;
        }

        /* Kongruens / Magnet Kort */
        .agreement-interactive-card {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 1.15rem 1rem;
            margin-bottom: 1.4rem;
            box-sizing: border-box;
        }
        .agreement-pill {
            display: inline-block;
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.15rem 0.55rem;
            border-radius: 5px;
            margin-bottom: 0.35rem;
        }
        .agreement-h3 {
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
            margin: 0 0 0.3rem;
            line-height: 1.3;
        }
        .agreement-p {
            color: #cbd5e1;
            font-size: 0.92rem;
            margin: 0 0 1rem;
            line-height: 1.4;
        }

        /* Magnet-vippe */
        .magnet-toggle-wrapper {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 0.75rem;
            margin-bottom: 1rem;
        }
        .magnet-toggle-label {
            display: block;
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
        .magnet-toggle-pill {
            display: flex;
            gap: 0.4rem;
            width: 100%;
        }
        .magnet-btn {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
            padding: 0.55rem 0.4rem;
            border-radius: 8px;
            font-size: 0.88rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .magnet-btn.active {
            background: rgba(34, 197, 94, 0.2);
            border-color: #22c55e;
            color: #86efac;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }

        /* Magnet Diagram */
        .magnet-diagram {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.85rem;
            width: 100%;
            box-sizing: border-box;
        }
        .magnet-box {
            flex: 1;
            min-width: 0;
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 0.65rem 0.4rem;
            text-align: center;
            box-sizing: border-box;
        }
        .magnet-flow-symbol {
            font-size: 0.78rem;
            font-weight: 800;
            color: #94a3b8;
            flex-shrink: 0;
            text-align: center;
        }
        .agreement-callout-msg {
            background: rgba(34, 197, 94, 0.1);
            border-left: 3px solid #22c55e;
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
            border-color: rgba(245, 158, 11, 0.5);
            background: rgba(245, 158, 11, 0.12);
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
            background: rgba(245, 158, 11, 0.25);
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

        /* Næste trin: Adverbier */
        .next-bridge-action-card {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(14, 165, 233, 0.06));
            border: 1.5px solid rgba(56, 189, 248, 0.4);
            border-radius: 14px;
            padding: 1.25rem 1rem;
            text-align: center;
            box-sizing: border-box;
        }
        .btn-launch-adverb {
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
        .btn-launch-adverb:hover {
            background: #7dd3fc;
            transform: scale(1.02);
        }

        @media (max-width: 480px) {
            .adjective-mobile-view { padding: 0 0.15rem 2.5rem !important; }
            .adj-cards-grid { grid-template-columns: 1fr; }
            .card-word { font-size: 1.3rem; }
            .adj-main-title { font-size: 1.3rem; }
            .strip-blocks-5-row { gap: 0.2rem; }
            .part-word { font-size: 0.95rem; }
            .magnet-diagram { flex-direction: column; }
            .magnet-flow-symbol { transform: rotate(90deg); margin: 0.2rem 0; }
        }
    `;
    document.head.appendChild(style);

    container.appendChild(viewContainer);
}
