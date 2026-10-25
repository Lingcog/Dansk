import { getTranslation, getLang, appState } from '../utils/i18n.js';
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

    // Tilstand for om det klæbende animationsvindue er foldet sammen
    let isStageCollapsed = false;

    // Kongruens laboratorie-state & hjælpefunktioner
    const agreementState = {
        type: isDefiniteAnchor() ? 'bestemt' : 'ubestemt',
        word: 'barn',
        stem: 'stor'
    };

    function getAgreementDetails(type, word, stem) {
        const isDef = type === 'bestemt';
        let stemDisplay = stem;
        let suffixDisplay = '';
        let fullAdj = '';
        let phrase = '';
        let subRole = '';
        const nounIcon = word === 'barn' ? '👶' : '🚗';
        const nounDisplay = word === 'barn' ? 'Barn' : 'Bil';
        const nounGender = word === 'barn' ? 'et-ord (intetkøn)' : 'en-ord (fælleskøn)';

        if (isDef) {
            // STÆRK BINDING: ALTID -e
            if (stem === 'sulten') {
                stemDisplay = 'sultn';
                suffixDisplay = '-e';
                fullAdj = 'sultne';
            } else if (stem === 'stor') {
                stemDisplay = 'stor';
                suffixDisplay = '-e';
                fullAdj = 'store';
            } else if (stem === 'hurtig') {
                stemDisplay = 'hurtig';
                suffixDisplay = '-e';
                fullAdj = 'hurtige';
            }
            phrase = word === 'barn' ? `Det ${fullAdj} barn` : `Den ${fullAdj} bil`;
            subRole = '⚡ Fastlåst: -e';
        } else {
            // SVAG BINDING: KØN AFGØR
            if (word === 'barn') {
                if (stem === 'sulten') {
                    stemDisplay = 'sulten';
                    suffixDisplay = '-t';
                    fullAdj = 'sultent';
                } else if (stem === 'stor') {
                    stemDisplay = 'stor';
                    suffixDisplay = '-t';
                    fullAdj = 'stort';
                } else if (stem === 'hurtig') {
                    stemDisplay = 'hurtig';
                    suffixDisplay = '-t';
                    fullAdj = 'hurtigt';
                }
                phrase = `Et ${fullAdj} barn`;
                subRole = '⚪ Intetkøn: -t';
            } else {
                stemDisplay = stem;
                suffixDisplay = '-ø';
                fullAdj = stem;
                phrase = `En ${fullAdj} bil`;
                subRole = '⚪ Fælleskøn: -ø';
            }
        }

        return {
            isDef,
            stemDisplay,
            suffixDisplay,
            fullAdj,
            phrase,
            subRole,
            nounIcon,
            nounDisplay,
            nounGender
        };
    }

    function getWavesSvg(isDef) {
        if (isDef) {
            // STÆRK BINDING: Tykke, intense, pulserende grønne bølger mod venstre
            return `
                <svg viewBox="0 0 220 70" preserveAspectRatio="none" class="magnet-waves-svg-el">
                    <defs>
                        <filter id="strongWaveGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="waveGradStrong" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stop-color="#4ade80" />
                            <stop offset="50%" stop-color="#22c55e" />
                            <stop offset="100%" stop-color="#16a34a" />
                        </linearGradient>
                    </defs>

                    <!-- Bølge 1 (Top) -->
                    <path d="M 210 16 Q 110 8 10 16" fill="none" stroke="url(#waveGradStrong)" stroke-width="3.5" opacity="0.9" stroke-dasharray="14 7" filter="url(#strongWaveGlow)">
                        <animate attributeName="stroke-dashoffset" from="0" to="42" dur="0.9s" repeatCount="infinite" />
                    </path>

                    <!-- Bølge 2 (Øvre midte med oscillerende kurve) -->
                    <path d="M 210 27 Q 110 18 10 27" fill="none" stroke="url(#waveGradStrong)" stroke-width="4.5" opacity="0.95" filter="url(#strongWaveGlow)">
                        <animate attributeName="d" values="M 210 27 Q 110 14 10 27; M 210 27 Q 110 40 10 27; M 210 27 Q 110 14 10 27" dur="1.2s" repeatCount="infinite" />
                    </path>

                    <!-- Bølge 3 (Kernecenter med højeste styrke) -->
                    <path d="M 210 35 L 10 35" fill="none" stroke="#86efac" stroke-width="6" opacity="1.0" stroke-dasharray="16 8" filter="url(#strongWaveGlow)">
                        <animate attributeName="stroke-dashoffset" from="0" to="48" dur="0.75s" repeatCount="infinite" />
                    </path>

                    <!-- Bølge 4 (Nedre midte med modsat kurve) -->
                    <path d="M 210 43 Q 110 52 10 43" fill="none" stroke="url(#waveGradStrong)" stroke-width="4.5" opacity="0.95" filter="url(#strongWaveGlow)">
                        <animate attributeName="d" values="M 210 43 Q 110 56 10 43; M 210 43 Q 110 30 10 43; M 210 43 Q 110 56 10 43" dur="1.3s" repeatCount="infinite" />
                    </path>

                    <!-- Bølge 5 (Bund) -->
                    <path d="M 210 54 Q 110 62 10 54" fill="none" stroke="url(#waveGradStrong)" stroke-width="3.5" opacity="0.9" stroke-dasharray="14 7" filter="url(#strongWaveGlow)">
                        <animate attributeName="stroke-dashoffset" from="0" to="42" dur="0.9s" repeatCount="infinite" />
                    </path>
                </svg>
            `;
        } else {
            // SVAG BINDING: Tynde, stiplede, kølige grå/blå bølger
            return `
                <svg viewBox="0 0 220 70" preserveAspectRatio="none" class="magnet-waves-svg-el">
                    <linearGradient id="waveGradWeak" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="0%" stop-color="#94a3b8" />
                        <stop offset="50%" stop-color="#64748b" />
                        <stop offset="100%" stop-color="#475569" />
                    </linearGradient>

                    <!-- Bølge 1 (Top) -->
                    <path d="M 210 18 Q 110 10 10 18" fill="none" stroke="url(#waveGradWeak)" stroke-width="1.8" opacity="0.45" stroke-dasharray="7 7">
                        <animate attributeName="stroke-dashoffset" from="0" to="28" dur="2.4s" repeatCount="infinite" />
                    </path>

                    <!-- Bølge 2 (Midte) -->
                    <path d="M 210 35 Q 110 35 10 35" fill="none" stroke="url(#waveGradWeak)" stroke-width="2.2" opacity="0.5" stroke-dasharray="8 8">
                        <animate attributeName="stroke-dashoffset" from="0" to="32" dur="2.1s" repeatCount="infinite" />
                    </path>

                    <!-- Bølge 3 (Bund) -->
                    <path d="M 210 52 Q 110 60 10 52" fill="none" stroke="url(#waveGradWeak)" stroke-width="1.8" opacity="0.45" stroke-dasharray="7 7">
                        <animate attributeName="stroke-dashoffset" from="0" to="28" dur="2.4s" repeatCount="infinite" />
                    </path>
                </svg>
            `;
        }
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
            <div class="stage-frame-wrapper" style="--adj-accent: ${beamColor};">
                <!-- SVG SCENE (360x126) -->
                <div class="stage-svg-body">
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

                <!-- INTEGRERET LIVE SÆTNING I DEN KLÆBENDE BAR -->
                <div class="sticky-sentence-summary">
                    <span class="summary-prefix">Sætning:</span>
                    <span class="summary-phrase">"${getFullSentence()}"</span>
                </div>
            </div>
        `;

    }



    // -------------------------------------------------------------
    // RENDER: INTERAKTIONS-OMRÅDE (4 Adjektiv-Kort + Kongruens)
    // -------------------------------------------------------------
    function renderInteractionArea() {
        taskArea.innerHTML = '';

        const activeAdj = ADJECTIVES[state.selectedAdjectiveId] || ADJECTIVES['sulten'];
        const isDef = isDefiniteAnchor();
        const adjWord = state.selectedAdjective || getInflectedAdjective(state.selectedAdjectiveId);

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
            <!-- KONGRUENS: MAGNETISK BINDING & BØLGE-ANIMATION             -->
            <div class="agreement-interactive-card" id="agreement-interactive-card"></div>

            <!-- ========================================================= -->
            <!-- NUVÆRENDE SÆTNING PÅ DETTE TRIN -->
            <div class="current-sentence-badge-box">
                <span class="cs-label">Din sætning nu:</span>
                <div class="cs-sentence-row">
                    <span class="cs-word tag-subjekt">${state.nounAnchor}</span>
                    <span class="cs-word tag-adjektiv">${adjWord}</span>
                    <span class="cs-word tag-subjekt">${state.selectedNoun}</span>
                    <span class="cs-word tag-verbum">${getModalWord()}</span>
                    <span class="cs-word tag-verbum">spise.</span>
                </div>
                <div class="cs-tags-legend">
                    <span class="legend-pill tag-subjekt-pill"><span class="legend-dot" style="background:#22c55e;"></span> Subjekt (Grøn)</span>
                    <span class="legend-pill tag-adjektiv-pill"><span class="legend-dot" style="background:#f97316;"></span> Adjektiv (Orange)</span>
                    <span class="legend-pill tag-verbum-pill"><span class="legend-dot" style="background:#ef4444;"></span> Verber (Rød)</span>
                </div>
            </div>

            <!-- RELEVANT LINK TIL ORDSTILLINGSFLADEN: DEL 4 (UDVIDET MODEL) -->
            <div class="ordstilling-bridge-link-card">
                <div class="obl-left">
                    <span class="obl-icon">📐</span>
                    <div class="obl-text">
                        <span class="obl-badge">Ordstilling</span>
                        <div class="obl-title">Adjektiver & Nominalled (Del 4)</div>
                        <div class="obl-desc">Lær hvordan adjektiver og udvidede nominalled placeres i sætningsskemaet.</div>
                    </div>
                </div>
                <a href="#/${getLang()}/ordstilling_intro/part4" class="btn-goto-ordstilling" id="btn-link-ordstilling-adj">
                    <span>Gå til Ordstilling (Del 4) ➔</span>
                </a>
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
                if (chosen === 'sulten') {
                    agreementState.stem = 'sulten';
                }
                speakDanish(state.selectedAdjective);
                refreshUI();
            };
        });

        // ---------------------------------------------------------
        // KOGNITIV KONGRUENS: MAGNETISKE BØLGER & STÆRK BINDING
        // ---------------------------------------------------------
        const agreementCardEl = box.querySelector('#agreement-interactive-card');

        function renderAgreementCard() {
            if (!agreementCardEl) return;
            const details = getAgreementDetails(agreementState.type, agreementState.word, agreementState.stem);
            const isDef = details.isDef;

            agreementCardEl.innerHTML = `
                <div class="agreement-header">
                    <span class="agreement-pill">🧲 Kognitiv Kongruens</span>
                    <h3 class="agreement-h3">${getTranslation('agreementTitle')}</h3>
                    <p class="agreement-p">${getTranslation('agreementDesc')}</p>
                </div>

                <!-- 3 KONTROL-RÆKKER -->
                <div class="agreement-controls-row">
                    <!-- 1. Forankring / Binding -->
                    <div class="control-subgroup">
                        <span class="ctrl-legend">1. Form & Bindingens styrke:</span>
                        <div class="ctrl-btn-group">
                            <button type="button" class="ctrl-btn ${isDef ? 'active-strong' : ''}" data-type="bestemt">
                                <span>⚡ Bestemt (Stærk binding: altid -e)</span>
                            </button>
                            <button type="button" class="ctrl-btn ${!isDef ? 'active-weak' : ''}" data-type="ubestemt">
                                <span>⚪ Ubestemt (Svag binding: køn afgør)</span>
                            </button>
                        </div>
                    </div>

                    <!-- 2. Substantiv & Køn -->
                    <div class="control-subgroup">
                        <span class="ctrl-legend">2. Substantiv & grammatisk køn:</span>
                        <div class="ctrl-btn-group">
                            <button type="button" class="ctrl-btn ${agreementState.word === 'barn' ? 'active-noun' : ''}" data-word="barn">
                                <span>👶 Barn (et-ord / intetkøn)</span>
                            </button>
                            <button type="button" class="ctrl-btn ${agreementState.word === 'bil' ? 'active-noun' : ''}" data-word="bil">
                                <span>🚗 Bil (en-ord / fælleskøn)</span>
                            </button>
                        </div>
                    </div>

                    <!-- 3. Adjektiv-stamme -->
                    <div class="control-subgroup">
                        <span class="ctrl-legend">3. Adjektiv-stamme:</span>
                        <div class="ctrl-btn-group adj-stems-group">
                            <button type="button" class="ctrl-stem-btn ${agreementState.stem === 'stor' ? 'active-stem' : ''}" data-stem="stor">
                                <span>stor</span>
                            </button>
                            <button type="button" class="ctrl-stem-btn ${agreementState.stem === 'hurtig' ? 'active-stem' : ''}" data-stem="hurtig">
                                <span>hurtig</span>
                            </button>
                            <button type="button" class="ctrl-stem-btn ${agreementState.stem === 'sulten' ? 'active-stem' : ''}" data-stem="sulten">
                                <span>sulten</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- DYNAMISK STATUS-STRIP -->
                <div class="magnet-status-strip ${isDef ? 'status-strong' : 'status-weak'}">
                    ${isDef ? 
                        `⚡ <strong>STÆRK BINDING:</strong> Magneten trækker med maksimal kraft! Endelsen låses fast på <strong>-e</strong> uanset køn (<em>${details.phrase}</em>).` : 
                        `⚪ <strong>SVAG BINDING:</strong> Løsere tilknytning. Endelsen bestemmes af substantivets køn: ${agreementState.word === 'barn' ? 'intetkøn (et-ord) trækker <strong>-t</strong>' : 'fælleskøn (en-ord) trækker <strong>-ø</strong> (ingen endelse)'} (<em>${details.phrase}</em>).`
                    }
                </div>

                <!-- DEN GRAFISKE MAGNETISKE BØLGE-ILLUSTRATION (SVG) -->
                <div class="magnet-container ${isDef ? 'strong' : 'weak'}">
                    <!-- ADJEKTIV BOKS (MODTAGER) -->
                    <div class="adjective-shape-box ${isDef ? 'strong' : 'weak'}">
                        <div class="box-tag-label">Adjektiv</div>
                        <div class="adj-stem-suffix-wrap">
                            <span class="adj-stem-txt">${details.stemDisplay}</span><span class="adj-suffix-txt ${isDef ? 'suffix-strong' : (details.suffixDisplay === '-t' ? 'suffix-t' : 'suffix-empty')}">${details.suffixDisplay}</span>
                        </div>
                        <div class="adj-sub-role ${isDef ? 'strong' : 'weak'}">${details.subRole}</div>
                    </div>

                    <!-- MAGNETISKE BØLGER (SVG) DER FLYDER FRA HØJRE MOD VENSTRE -->
                    <div class="magnet-waves" id="magnet-waves-box">
                        ${getWavesSvg(isDef)}
                        <div class="flux-badge ${isDef ? 'strong' : 'weak'}">
                            ${isDef ? '⚡ STÆRK BINDING ⚡' : '⚪ SVAG BINDING ⚪'}
                        </div>
                    </div>

                    <!-- SUBSTANTIV MAGNET (KRAFTKILDE) -->
                    <div class="noun-influence-box ${isDef ? 'strong' : 'weak'}">
                        <div class="box-tag-label">Substantiv (Magnet)</div>
                        <div class="noun-flex-wrap">
                            <span class="noun-emoji">${details.nounIcon}</span>
                            <span class="noun-txt">${details.nounDisplay}</span>
                        </div>
                        <div class="noun-sub-role ${isDef ? 'strong' : 'weak'}">
                            ${isDef ? (agreementState.word === 'barn' ? 'Det barn (bestemt)' : 'Den bil (bestemt)') : (agreementState.word === 'barn' ? 'Et barn (intetkøn)' : 'En bil (fælleskøn)')}
                        </div>
                    </div>
                </div>

                <!-- LIVE SYNTESE-BÅND MED LYD -->
                <div class="syntese-banner ${isDef ? 'syntese-strong' : 'syntese-weak'}">
                    <div class="syntese-left">
                        <span class="syntese-type-tag">${isDef ? '⚡ Stærk binding (-e):' : '⚪ Svag binding:'}</span>
                        <span class="syntese-phrase">${details.phrase}</span>
                    </div>
                    <button type="button" class="btn-tts-listen-mini" id="btn-listen-agreement">
                        <span>🔊</span>
                        <span>Lyt</span>
                    </button>
                </div>

                <!-- KOGNITIV GRAMMATIK FORKLARING -->
                <div class="agreement-pedagogical-box ${isDef ? 'box-strong' : 'box-weak'}">
                    <div class="ped-icon">${isDef ? '⚡' : '🧲'}</div>
                    <div class="ped-text">
                        ${isDef ? 
                            `<strong>Kognitiv forankring (Bestemt form):</strong> Når vi taler om noget <em>bestemt</em> ("vi ved præcis, hvilket barn/hvilken bil der er i fokus"), er den mentale reference så stærk, at substantivets køn træder i baggrunden. Den magnetiske kraft låser altid adjektivet fast i den fælles bestemte form med <strong>-e</strong> (<em>${details.phrase}</em>).` : 
                            `<strong>Kognitiv reference (Ubestemt form):</strong> I ubestemt form introduceres en ukendt eller generel entitet. Forankringen er åben og bindingen er svagere – derfor må adjektivet overtage substantivets køn: intetkøn (et-ord) trækker et <strong>-t</strong> (<em>et stort barn</em>), mens fælleskøn (en-ord) ikke trækker nogen endelse (<em>en hurtig bil</em>).`
                        }
                    </div>
                </div>
            `;

            // Knap-handlinger
            agreementCardEl.querySelectorAll('.ctrl-btn[data-type]').forEach(btn => {
                btn.onclick = () => {
                    const newType = btn.dataset.type;
                    if (agreementState.type !== newType) {
                        agreementState.type = newType;
                        if (agreementState.word === 'barn') {
                            state.nounAnchor = newType === 'bestemt' ? 'Mit' : 'Et';
                            state.selectedAdjective = getInflectedAdjective(state.selectedAdjectiveId);
                            renderStage();
                        }
                        renderAgreementCard();
                        const updated = getAgreementDetails(agreementState.type, agreementState.word, agreementState.stem);
                        speakDanish(updated.phrase);
                    }
                };
            });

            agreementCardEl.querySelectorAll('.ctrl-btn[data-word]').forEach(btn => {
                btn.onclick = () => {
                    const newWord = btn.dataset.word;
                    if (agreementState.word !== newWord) {
                        agreementState.word = newWord;
                        if (newWord === 'bil' && agreementState.stem === 'sulten') {
                            agreementState.stem = 'hurtig';
                        }
                        renderAgreementCard();
                        const updated = getAgreementDetails(agreementState.type, agreementState.word, agreementState.stem);
                        speakDanish(updated.phrase);
                    }
                };
            });

            agreementCardEl.querySelectorAll('.ctrl-stem-btn').forEach(btn => {
                btn.onclick = () => {
                    const newStem = btn.dataset.stem;
                    if (agreementState.stem !== newStem) {
                        agreementState.stem = newStem;
                        renderAgreementCard();
                        const updated = getAgreementDetails(agreementState.type, agreementState.word, agreementState.stem);
                        speakDanish(updated.phrase);
                    }
                };
            });

            const listenBtn = agreementCardEl.querySelector('#btn-listen-agreement');
            if (listenBtn) {
                listenBtn.onclick = () => speakDanish(details.phrase);
            }
        }

        renderAgreementCard();

        // Ordstilling link
        const btnOrdstilling = box.querySelector('#btn-link-ordstilling-adj');
        if (btnOrdstilling) {
            btnOrdstilling.onclick = (e) => {
                e.preventDefault();
                navigateFn('ordstilling_intro', { subPath: 'part4' });
            };
        }

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
        renderInteractionArea();
        flashStage();
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

        /* KLÆBENDE SCENE-RAMME (SMART STICKY HUD) */
        .adj-stage-card {
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
            border-color: var(--adj-accent, #38bdf8) !important;
            box-shadow: 0 0 25px var(--adj-accent, rgba(56, 189, 248, 0.6)) !important;
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

        .adj-svg-fluid {
            width: 100%;
            height: auto;
            display: block;
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
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
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

        /* 3 Kontrol-rækker */
        .agreement-controls-row {
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            margin-bottom: 0.95rem;
        }
        .control-subgroup {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.6rem 0.75rem;
        }
        .ctrl-legend {
            font-size: 0.76rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            display: block;
            margin-bottom: 0.4rem;
        }
        .ctrl-btn-group {
            display: flex;
            gap: 0.4rem;
            width: 100%;
        }
        .ctrl-btn {
            flex: 1;
            padding: 0.55rem 0.4rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: #cbd5e1;
            font-size: 0.86rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .ctrl-btn.active-strong {
            background: rgba(34, 197, 94, 0.22);
            border-color: #22c55e;
            color: #86efac;
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.35);
            transform: translateY(-1px);
        }
        .ctrl-btn.active-weak {
            background: rgba(148, 163, 184, 0.22);
            border-color: #94a3b8;
            color: #f1f5f9;
            box-shadow: 0 0 8px rgba(148, 163, 184, 0.25);
            transform: translateY(-1px);
        }
        .ctrl-btn.active-noun {
            background: rgba(56, 189, 248, 0.22);
            border-color: #38bdf8;
            color: #bae6fd;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
            transform: translateY(-1px);
        }
        .ctrl-stem-btn {
            flex: 1;
            padding: 0.45rem 0.4rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1.5px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: #cbd5e1;
            font-size: 0.86rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .ctrl-stem-btn.active-stem {
            background: rgba(245, 158, 11, 0.22);
            border-color: #f59e0b;
            color: #fde68a;
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.35);
            transform: translateY(-1px);
        }

        /* Dynamisk status-strip */
        .magnet-status-strip {
            padding: 0.65rem 0.85rem;
            border-radius: 10px;
            font-size: 0.88rem;
            line-height: 1.4;
            margin-bottom: 0.85rem;
            transition: all 0.3s;
        }
        .magnet-status-strip.status-strong {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.45);
            color: #86efac;
        }
        .magnet-status-strip.status-weak {
            background: rgba(148, 163, 184, 0.12);
            border: 1px solid rgba(148, 163, 184, 0.3);
            color: #cbd5e1;
        }

        /* Magnet-container med bølge-animation */
        .magnet-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            width: 100%;
            background: #0b1120;
            padding: 1.15rem 0.85rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            position: relative;
            box-sizing: border-box;
            margin-bottom: 0.95rem;
            overflow: hidden;
            transition: all 0.35s ease;
        }
        .magnet-container.strong {
            border-color: rgba(34, 197, 94, 0.45);
            box-shadow: inset 0 0 25px rgba(34, 197, 94, 0.15), 0 0 20px rgba(34, 197, 94, 0.15);
        }

        .adjective-shape-box {
            flex: 0 0 120px;
            text-align: center;
            padding: 0.85rem 0.5rem;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-sizing: border-box;
            z-index: 2;
        }
        .adjective-shape-box.strong {
            border: 2px solid #22c55e;
            background: rgba(34, 197, 94, 0.15);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        .adjective-shape-box.weak {
            border: 1.5px dashed rgba(255, 255, 255, 0.2);
            background: rgba(15, 23, 42, 0.7);
            box-shadow: none;
        }

        .noun-influence-box {
            flex: 0 0 120px;
            text-align: center;
            padding: 0.85rem 0.5rem;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-sizing: border-box;
            z-index: 2;
        }
        .noun-influence-box.strong {
            border: 2px solid #22c55e;
            background: linear-gradient(135deg, rgba(21, 128, 61, 0.6), rgba(34, 197, 94, 0.25));
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        .noun-influence-box.weak {
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            background: rgba(30, 41, 59, 0.8);
            box-shadow: none;
        }

        .box-tag-label {
            font-size: 0.68rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            margin-bottom: 0.25rem;
        }
        .adj-stem-suffix-wrap, .noun-flex-wrap {
            font-size: 1.45rem;
            font-weight: 900;
            line-height: 1.2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.15rem;
            margin-bottom: 0.25rem;
        }
        .adj-stem-txt {
            color: #ffffff;
        }
        .adj-suffix-txt {
            display: inline-block;
            font-weight: 900;
        }
        .suffix-strong {
            color: #4ade80;
            animation: pulse-suffix-strong 1.2s infinite ease-in-out;
            text-shadow: 0 0 10px rgba(74, 222, 128, 0.8);
        }
        .suffix-t {
            color: #38bdf8;
            text-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
        }
        .suffix-empty {
            color: #64748b;
            font-size: 0.85em;
            opacity: 0.7;
        }
        @keyframes pulse-suffix-strong {
            0% {
                transform: scale(1);
                color: #4ade80;
                text-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
            }
            50% {
                transform: scale(1.22);
                color: #86efac;
                text-shadow: 0 0 16px rgba(74, 222, 128, 1);
            }
            100% {
                transform: scale(1);
                color: #4ade80;
                text-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
            }
        }

        .noun-emoji {
            font-size: 1.25rem;
            margin-right: 0.2rem;
        }
        .noun-txt {
            color: #ffffff;
        }

        .adj-sub-role, .noun-sub-role {
            font-size: 0.72rem;
            font-weight: 700;
            white-space: nowrap;
        }
        .adj-sub-role.strong, .noun-sub-role.strong {
            color: #86efac;
        }
        .adj-sub-role.weak, .noun-sub-role.weak {
            color: #94a3b8;
        }

        /* Magnetiske Bølger (SVG) */
        .magnet-waves {
            flex: 1 1 auto;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 60px;
            height: 65px;
            overflow: visible;
            z-index: 1;
        }
        .magnet-waves-svg-el {
            width: 100%;
            height: 100%;
            display: block;
            overflow: visible;
        }
        .flux-badge {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.7rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding: 0.2rem 0.55rem;
            border-radius: 9999px;
            white-space: nowrap;
            z-index: 5;
            pointer-events: none;
        }
        .flux-badge.strong {
            background: rgba(15, 23, 42, 0.95);
            border: 1.5px solid #22c55e;
            color: #4ade80;
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.5);
            animation: pulse-badge-strong 1.2s infinite alternate;
        }
        .flux-badge.weak {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(148, 163, 184, 0.4);
            color: #94a3b8;
        }
        @keyframes pulse-badge-strong {
            from { transform: translate(-50%, -50%) scale(0.97); }
            to { transform: translate(-50%, -50%) scale(1.05); }
        }

        /* Syntese-bånd */
        .syntese-banner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            padding: 0.75rem 0.9rem;
            border-radius: 12px;
            margin-bottom: 0.85rem;
            box-sizing: border-box;
        }
        .syntese-banner.syntese-strong {
            background: rgba(34, 197, 94, 0.12);
            border: 1.5px solid rgba(34, 197, 94, 0.4);
        }
        .syntese-banner.syntese-weak {
            background: rgba(56, 189, 248, 0.1);
            border: 1.5px solid rgba(56, 189, 248, 0.35);
        }
        .syntese-left {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .syntese-type-tag {
            font-size: 0.76rem;
            font-weight: 800;
            text-transform: uppercase;
            color: #94a3b8;
        }
        .syntese-phrase {
            font-size: 1.15rem;
            font-weight: 900;
            color: #ffffff;
        }
        .btn-tts-listen-mini {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 0.25rem 0.65rem;
            border-radius: 16px;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            flex-shrink: 0;
            transition: all 0.2s;
        }
        .btn-tts-listen-mini:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }

        /* Kognitiv forklaring */
        .agreement-pedagogical-box {
            display: flex;
            gap: 0.75rem;
            align-items: flex-start;
            padding: 0.85rem 0.95rem;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.45;
            color: #e2e8f0;
            box-sizing: border-box;
        }
        .agreement-pedagogical-box.box-strong {
            background: rgba(34, 197, 94, 0.08);
            border-left: 3px solid #22c55e;
        }
        .agreement-pedagogical-box.box-weak {
            background: rgba(56, 189, 248, 0.08);
            border-left: 3px solid #38bdf8;
        }
        .agreement-pedagogical-box .ped-icon {
            font-size: 1.3rem;
            flex-shrink: 0;
            margin-top: 0.1rem;
        }
        .agreement-pedagogical-box .ped-text {
            flex: 1;
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
            .adjective-mobile-view { padding: 0 0.25rem 2.5rem !important; }
            .stage-sticky-bar { padding-right: 94px !important; }
            .adj-cards-grid { grid-template-columns: 1fr; }
            .card-word { font-size: 1.3rem; }
            .adj-main-title { font-size: 1.3rem; }
            .strip-blocks-5-row { gap: 0.2rem; }
            .adjective-shape-box, .noun-influence-box { flex: 0 0 92px; width: 92px; padding: 0.55rem 0.35rem; }
            .adj-stem-suffix-wrap, .noun-flex-wrap { font-size: 1.15rem; }
            .flux-badge { font-size: 0.62rem; padding: 0.15rem 0.35rem; }
            .magnet-container { padding: 0.75rem 0.35rem; gap: 0.25rem; }
            .ctrl-btn { font-size: 0.78rem; padding: 0.5rem 0.25rem; }
            .syntese-phrase { font-size: 1.02rem; }
        }
    `;
    document.head.appendChild(style);

    container.appendChild(viewContainer);
}
