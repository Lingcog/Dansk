import { getTranslation, getLang, appState } from '../utils/i18n.js';
import { renderGrammarMenu } from '../components/GrammarMenu.js';

export function renderConjunctionBridgeView(container, navigateFn, extraData = {}) {
    // -------------------------------------------------------------
    // AKKUMULERET TILSTAND FRA HELE GRAMMATIK-REJSEN (TRIN 1 TIL 5)
    // -------------------------------------------------------------
    const state = {
        nounAnchor: extraData.nounAnchor || 'Mit',
        selectedNoun: extraData.selectedNoun || 'barn',
        selectedAdjective: extraData.selectedAdjective || 'lille',
        adjectivePart: extraData.adjectivePart || 'lille',
        selectedModal: extraData.selectedModal || 'vil',
        verbAnchor: extraData.verbAnchor || 'spiser',
        selectedVerb: extraData.selectedVerb || 'spise',
        selectedAdverb: extraData.selectedAdverb || 'gerne',
        selectedConjId: extraData.selectedConjId || 'fordi',
        isPast: extraData.isPast || false
    };

    container.innerHTML = '';

    const viewContainer = document.createElement('div');
    viewContainer.className = 'conjunction-mobile-view';
    container.appendChild(viewContainer);

    // Dansk talesyntese (TTS)
    function speakDanish(text) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const clean = text.replace(/[*_#\[\]]/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = 'da-DK';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }

    // -------------------------------------------------------------
    // FØRSTE SÆTNINGSHALVDEL (Hovedsætningen fra Trin 1-4)
    // -------------------------------------------------------------
    // Centraladverbier står altid foran infinitiven (V2) i hovedsætninger:
    // f.eks. "vil GERNE spise", "skal IKKE spise", "kan ALTID spise".
    const CENTRAL_ADVERBS = new Set([
        'ikke', 'gerne', 'altid', 'aldrig', 'ofte', 'måske', 'faktisk', 
        'heldigvis', 'nok', 'vist', 'jo', 'vel', 'knap', 'næppe', 'sjældent'
    ]);

    function isCentralAdverb(adv) {
        if (!adv) return false;
        const clean = adv.toLowerCase().trim();
        return CENTRAL_ADVERBS.has(clean);
    }

    function getClause1() {
        const adj = state.selectedAdjective ? ` ${state.selectedAdjective}` : '';
        const subj = `${state.nounAnchor}${adj} ${state.selectedNoun}`;
        const advWord = (state.selectedAdverb && state.selectedAdverb !== 'ingen') ? state.selectedAdverb.trim() : '';

        if (state.selectedModal) {
            if (advWord && isCentralAdverb(advWord)) {
                // Centraladverbium står på 3. pladsen mellem V1 og V2: "vil gerne spise"
                return `${subj} ${state.selectedModal} ${advWord} ${state.selectedVerb}`.trim();
            } else if (advWord) {
                // Mådesadverbium står efter V2: "vil spise langsomt"
                return `${subj} ${state.selectedModal} ${state.selectedVerb} ${advWord}`.trim();
            } else {
                return `${subj} ${state.selectedModal} ${state.selectedVerb}`.trim();
            }
        }

        const v = state.isPast ? (state.verbAnchor === 'spiste' ? 'spiste' : state.verbAnchor) : (state.verbAnchor || 'spiser');
        if (advWord) {
            return `${subj} ${v} ${advWord}`.trim();
        }
        return `${subj} ${v}`.trim();
    }

    function renderColoredClause1() {
        const parts = [];
        parts.push(`<span style="color: #4ade80;">${state.nounAnchor}</span>`);
        if (state.selectedAdjective) {
            parts.push(`<span style="color: #fb923c;">${state.selectedAdjective}</span>`);
        }
        parts.push(`<span style="color: #4ade80;">${state.selectedNoun}</span>`);

        const advWord = (state.selectedAdverb && state.selectedAdverb !== 'ingen') ? state.selectedAdverb.trim() : '';
        const isCentral = isCentralAdverb(advWord);

        if (state.selectedModal) {
            parts.push(`<span style="color: #f87171;">${state.selectedModal}</span>`);
            if (advWord && isCentral) {
                // Centraladverbium (f.eks. gerne, ikke) står mellem V1 og V2!
                parts.push(`<span style="color: #facc15;">${advWord}</span>`);
                parts.push(`<span style="color: #f87171;">${state.selectedVerb}</span>`);
            } else if (advWord) {
                // Mådesadverbium (f.eks. langsomt, hurtigt) står efter V2!
                parts.push(`<span style="color: #f87171;">${state.selectedVerb}</span>`);
                parts.push(`<span style="color: #facc15;">${advWord}</span>`);
            } else {
                parts.push(`<span style="color: #f87171;">${state.selectedVerb}</span>`);
            }
        } else {
            const v = state.isPast ? (state.verbAnchor === 'spiste' ? 'spiste' : state.verbAnchor) : (state.verbAnchor || 'spiser');
            parts.push(`<span style="color: #f87171;">${v}</span>`);
            if (advWord) {
                parts.push(`<span style="color: #facc15;">${advWord}</span>`);
            }
        }
        return parts.join(' ');
    }

    function renderColoredSentenceSpans(conj, c2Text) {
        if (conj.id === 'derfor') {
            const verb1 = state.selectedModal || (state.isPast ? 'spiste' : 'spiser');
            const advWord = (state.selectedAdverb && state.selectedAdverb !== 'ingen') ? state.selectedAdverb.trim() : '';
            const isCentral = isCentralAdverb(advWord);

            let v1SubjectPart = '';
            if (state.selectedModal) {
                if (advWord && isCentral) {
                    v1SubjectPart = `<span class="cs-word tag-verbum">${state.selectedModal}</span> <span class="cs-word tag-subjekt">det</span> <span class="cs-word tag-adverbium">${advWord}</span> <span class="cs-word tag-verbum">${state.selectedVerb}.</span>`;
                } else if (advWord) {
                    v1SubjectPart = `<span class="cs-word tag-verbum">${state.selectedModal}</span> <span class="cs-word tag-subjekt">det</span> <span class="cs-word tag-verbum">${state.selectedVerb}</span> <span class="cs-word tag-adverbium">${advWord}.</span>`;
                } else {
                    v1SubjectPart = `<span class="cs-word tag-verbum">${state.selectedModal}</span> <span class="cs-word tag-subjekt">det</span> <span class="cs-word tag-verbum">${state.selectedVerb}.</span>`;
                }
            } else {
                const v = state.isPast ? 'spiste' : 'spiser';
                if (advWord) {
                    v1SubjectPart = `<span class="cs-word tag-verbum">${v}</span> <span class="cs-word tag-subjekt">det</span> <span class="cs-word tag-adverbium">${advWord}.</span>`;
                } else {
                    v1SubjectPart = `<span class="cs-word tag-verbum">${v}</span> <span class="cs-word tag-subjekt">det.</span>`;
                }
            }

            return `
                <span class="cs-word tag-subjekt">Barnet</span>
                <span class="cs-word tag-verbum">er</span>
                <span class="cs-word tag-adjektiv">sultent</span>.
                <span class="cs-word tag-konjunktion">Derfor</span>
                ${v1SubjectPart}
            `;
        }

        const advWord = (state.selectedAdverb && state.selectedAdverb !== 'ingen') ? state.selectedAdverb.trim() : '';
        const isCentral = isCentralAdverb(advWord);
        const comma = conj.id === 'og' ? '' : ',';
        const cleanC2 = c2Text.endsWith('.') ? c2Text : c2Text + '.';

        const spans = [];
        spans.push(`<span class="cs-word tag-subjekt">${state.nounAnchor}</span>`);
        if (state.selectedAdjective) {
            spans.push(`<span class="cs-word tag-adjektiv">${state.selectedAdjective}</span>`);
        }
        spans.push(`<span class="cs-word tag-subjekt">${state.selectedNoun}</span>`);

        if (state.selectedModal) {
            spans.push(`<span class="cs-word tag-verbum">${state.selectedModal}</span>`);
            if (advWord && isCentral) {
                // Centraladverbium (f.eks. gerne, ikke) står foran infinitiven (V2)!
                spans.push(`<span class="cs-word tag-adverbium">${advWord}</span>`);
                spans.push(`<span class="cs-word tag-verbum">${state.selectedVerb}</span>${comma}`);
            } else if (advWord) {
                // Mådesadverbium (f.eks. langsomt, hurtigt) står efter infinitiven (V2)!
                spans.push(`<span class="cs-word tag-verbum">${state.selectedVerb}</span>`);
                spans.push(`<span class="cs-word tag-adverbium">${advWord}</span>${comma}`);
            } else {
                spans.push(`<span class="cs-word tag-verbum">${state.selectedVerb}</span>${comma}`);
            }
        } else {
            const v = state.isPast ? (state.verbAnchor === 'spiste' ? 'spiste' : state.verbAnchor) : (state.verbAnchor || 'spiser');
            spans.push(`<span class="cs-word tag-verbum">${v}</span>`);
            if (advWord) {
                spans.push(`<span class="cs-word tag-adverbium">${advWord}</span>${comma}`);
            }
        }

        spans.push(`<span class="cs-word tag-konjunktion">${conj.word}</span>`);
        spans.push(`<span class="cs-word" style="color: #cbd5e1;">${cleanC2}</span>`);

        return spans.join(' ');
    }

    // -------------------------------------------------------------
    // DE 8 KOGNITIVE KONJUNKTIONER & BINDEORD I 4 FAMILIER
    // -------------------------------------------------------------
    const CONJUNCTIONS = {
        'fordi': {
            id: 'fordi',
            word: 'fordi',
            category: 'cause',
            categoryLabel: 'Årsag & Følge',
            icon: '🌱',
            badge: 'Årsag (Hvorfor?)',
            color: '#22c55e', // Grøn
            colorGlow: 'rgba(34, 197, 94, 0.45)',
            role: 'Årsagen bag handlingen',
            clause2Text: 'det er sultent',
            clause2Desc: 'Årsag: Kroppen mangler energi',
            getFullSentence: (c1) => `${c1}, fordi det er sultent.`,
            cognitiveVisualDesc: 'En pulserende grøn energibro, der forbinder handlingen direkte til årsagens nærende rod.',
            wordOrderType: 'subordinate',
            wordOrderBadge: 'Bisætning (S-A-V)',
            wordOrderExpl: 'Efter "fordi" følger bisætningsordstilling: Subjekt ("det") kommer før verbet ("er"). Hvis der er et centraladverbium (f.eks. "ikke"), står det altid før verbet: "..., fordi det <em>ikke</em> er sultent".'
        },
        'derfor': {
            id: 'derfor',
            word: 'derfor',
            category: 'cause',
            categoryLabel: 'Årsag & Følge',
            icon: '⚡',
            badge: 'Konsekvens (Resultat)',
            color: '#f59e0b', // Amber / Guld
            colorGlow: 'rgba(245, 158, 11, 0.45)',
            role: 'Konsekvensen af en tilstand',
            clause2Text: (c1) => {
                const advWord = (state.selectedAdverb && state.selectedAdverb !== 'ingen') ? state.selectedAdverb.trim() : '';
                const isCentral = isCentralAdverb(advWord);
                if (state.selectedModal) {
                    if (advWord && isCentral) {
                        return `Derfor ${state.selectedModal} det ${advWord} ${state.selectedVerb}`;
                    } else if (advWord) {
                        return `Derfor ${state.selectedModal} det ${state.selectedVerb} ${advWord}`;
                    }
                    return `Derfor ${state.selectedModal} det ${state.selectedVerb}`;
                }
                const v = state.isPast ? 'spiste' : 'spiser';
                return advWord ? `Derfor ${v} det ${advWord}` : `Derfor ${v} det`;
            },
            clause2Desc: 'Konsekvens: Handlingen udløses',
            getFullSentence: () => {
                const advWord = (state.selectedAdverb && state.selectedAdverb !== 'ingen') ? state.selectedAdverb.trim() : '';
                const isCentral = isCentralAdverb(advWord);
                if (state.selectedModal) {
                    if (advWord && isCentral) {
                        return `Barnet er sultent. Derfor ${state.selectedModal} det ${advWord} ${state.selectedVerb}.`;
                    } else if (advWord) {
                        return `Barnet er sultent. Derfor ${state.selectedModal} det ${state.selectedVerb} ${advWord}.`;
                    }
                    return `Barnet er sultent. Derfor ${state.selectedModal} det ${state.selectedVerb}.`;
                }
                const v = state.isPast ? 'spiste' : 'spiser';
                return advWord ? `Barnet er sultent. Derfor ${v} det ${advWord}.` : `Barnet er sultent. Derfor ${v} det.`;
            },
            cognitiveVisualDesc: 'En gylden resultat-vektor, der slynger handlingen fremad som en uundgåelig konsekvens.',
            wordOrderType: 'inversion',
            wordOrderBadge: 'Inversion (V-S)',
            wordOrderExpl: '<strong>VIGTIG REGEL:</strong> "Derfor" er et bindeord/konjunktionaladverbium, IKKE en underordnende konjunktion. Derfor kommer verbet på 2. pladsen lige efter "derfor" (omvendt ordstilling): "Barnet er sultent. Derfor <em>vil</em> det spise" (ikke "Derfor det vil spise").'
        },
        'når': {
            id: 'når',
            word: 'når',
            category: 'time',
            categoryLabel: 'Tid & Tidsfæstelse',
            icon: '⏰',
            badge: 'Nutid & Gentagelse',
            color: '#38bdf8', // Himmelblå
            colorGlow: 'rgba(56, 189, 248, 0.45)',
            role: 'Hver gang eller i fremtiden',
            clause2Text: 'maden er serveret',
            clause2Desc: 'Tidsanker: Når tidspunktet indtræffer',
            getFullSentence: (c1) => `${c1}, når maden er serveret.`,
            cognitiveVisualDesc: 'Et cyklisk tids-ur og fremadrettede lyseblå tidsbølger, der aktiverer handlingen hver gang.',
            wordOrderType: 'subordinate',
            wordOrderBadge: 'Tids-bisætning (S-A-V)',
            wordOrderExpl: '"Når" bruges om nutid, fremtid eller noget, der sker gentagne gange ("hver gang"). Ordstillingen er bisætningsstruktur: Subjekt + (centraladverbium) + Verbum.'
        },
        'da': {
            id: 'da',
            word: 'da',
            category: 'time',
            categoryLabel: 'Tid & Tidsfæstelse',
            icon: '🕰️',
            badge: 'Fortid (Dengang)',
            color: '#818cf8', // Indigo
            colorGlow: 'rgba(129, 140, 248, 0.45)',
            role: 'Én bestemt gang i datid',
            clause2Text: 'klokken slog tolv',
            clause2Desc: 'Historisk anker: Dengang i fortiden',
            getFullSentence: () => `${state.nounAnchor} ${state.selectedAdjective ? state.selectedAdjective + ' ' : ''}${state.selectedNoun} spiste, da klokken slog tolv.`,
            cognitiveVisualDesc: 'Et historisk tidsanker, der kastes dybt tilbage i datiden mod et bestemt unikt øjeblik.',
            wordOrderType: 'subordinate',
            wordOrderBadge: 'Datids-anker (S-A-V)',
            wordOrderExpl: '<strong>DA vs. NÅR:</strong> "Da" bruges KUN i datid om en enkeltstående begivenhed ("dengang"). Husk reglen: <em>"Dengang da – hver gang når"</em>.'
        },
        'selvom': {
            id: 'selvom',
            word: 'selvom',
            category: 'contrast',
            categoryLabel: 'Forhindring & Kontrast',
            icon: '🛡️',
            badge: 'Trods modstand',
            color: '#ec4899', // Pink / Magenta
            colorGlow: 'rgba(236, 72, 153, 0.45)',
            role: 'Handlingen trodser barrieren',
            clause2Text: 'det er meget træt',
            clause2Desc: 'Forhindring: Træthed forsøger at bremse',
            getFullSentence: (c1) => `${c1}, selvom det er meget træt.`,
            cognitiveVisualDesc: 'Handlingsbroen bryder direkte igennem en massiv barriere – handlingen sejrer trods modstand.',
            wordOrderType: 'subordinate',
            wordOrderBadge: 'Indrømmelse (S-A-V)',
            wordOrderExpl: '"Selvom" indleder en koncessiv bisætning (indrømmelse). Det viser, at handlingen i hovedsætningen gennemføres på trods af en reel forhindring.'
        },
        'men': {
            id: 'men',
            word: 'men',
            category: 'contrast',
            categoryLabel: 'Forhindring & Kontrast',
            icon: '⚖️',
            badge: 'Modsætning (Kontrast)',
            color: '#ef4444', // Rød
            colorGlow: 'rgba(239, 68, 68, 0.45)',
            role: 'To modsatrettede fakta mødes',
            clause2Text: 'maden er stadig lidt varm',
            clause2Desc: 'Kontrast: Et modstridende faktum',
            getFullSentence: (c1) => `${c1}, men maden er stadig lidt varm.`,
            cognitiveVisualDesc: 'To adskilte veje, der mødes på midten med en skarp kontrastmarkør og advarselslys.',
            wordOrderType: 'coordinate',
            wordOrderBadge: 'Sideordning (Hovedsætning)',
            wordOrderExpl: '"Men" er en sideordnende konjunktion. Den forbinder to selvstændige hovedsætninger med ligeværdig, normal ordstilling (Subjekt + Verbum).'
        },
        'og': {
            id: 'og',
            word: 'og',
            category: 'connect',
            categoryLabel: 'Forbindelse & Hensigt',
            icon: '🌉',
            badge: 'Forbindelse (Addition)',
            color: '#14b8a6', // Teal
            colorGlow: 'rgba(20, 184, 166, 0.45)',
            role: 'To handlinger i harmoni',
            clause2Text: 'drikker et glas vand',
            clause2Desc: 'Ekstra handling: Side om side',
            getFullSentence: (c1) => `${c1} og drikker et glas vand.`,
            cognitiveVisualDesc: 'En gylden, uafbrudt hængebro, hvor to handlinger flyder sammen i en ubrudt harmonisk strøm.',
            wordOrderType: 'coordinate',
            wordOrderBadge: 'Sideordning (Addition)',
            wordOrderExpl: '"Og" er det simpleste bindeord på dansk. Det forbinder to ensartede led eller sætninger i fredelig ligevægt uden at ændre ordstillingen.'
        },
        'så': {
            id: 'så',
            word: 'så',
            category: 'connect',
            categoryLabel: 'Forbindelse & Hensigt',
            icon: '🎯',
            badge: 'Hensigt & Mål',
            color: '#a855f7', // Lilla
            colorGlow: 'rgba(168, 85, 247, 0.45)',
            role: 'Viser formålet bag handlingen',
            clause2Text: 'det kan blive mæt og glad',
            clause2Desc: 'Mål: Den ønskede tilstand opnås',
            getFullSentence: (c1) => `${c1}, så det kan blive mæt og glad.`,
            cognitiveVisualDesc: 'En laserfokuseret sigtelinje, der peger direkte mod en lysende måltavle på den modsatte bred.',
            wordOrderType: 'subordinate',
            wordOrderBadge: 'Hensigt / Følge (S-A-V)',
            wordOrderExpl: '"Så" bruges her til at angive hensigten eller formålet med handlingen: "Hvorfor spiser barnet? <em>Så det kan blive mæt</em>".'
        }
    };

    function getActiveConj() {
        return CONJUNCTIONS[state.selectedConjId] || CONJUNCTIONS['fordi'];
    }

    function getFullSentence() {
        const conj = getActiveConj();
        const c1 = getClause1();
        return conj.getFullSentence(c1);
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
    backBtn.textContent = '← ' + (getTranslation('back') || 'Tilbage til Adverbier');
    backBtn.onclick = () => navigateFn('adverb_bridge', {
        nounAnchor: state.nounAnchor,
        selectedNoun: state.selectedNoun,
        selectedAdjective: state.selectedAdjective,
        adjectivePart: state.adjectivePart,
        selectedModal: state.selectedModal,
        verbAnchor: state.verbAnchor,
        selectedVerb: state.selectedVerb,
        selectedAdverb: state.selectedAdverb,
        isPast: state.isPast
    });
    topBar.appendChild(backBtn);
    viewContainer.appendChild(topBar);

    // Grammatik-menu
    viewContainer.appendChild(renderGrammarMenu('konjunktioner', navigateFn));

    // Kompakt overskrift
    const headerEl = document.createElement('div');
    headerEl.className = 'conjunction-hero-compact';
    headerEl.innerHTML = `
        <h1 class="conj-main-title">${getTranslation('conjunctionTitle') || 'Byg bro mellem to sætninger'}</h1>
        <p class="conj-sub-desc">${getTranslation('conjunctionDesc') || 'Konjunktioner (bindeord) er den kognitive bro, der forbinder handlinger med årsager, tidspunkter og modsætninger.'}</p>
    `;
    viewContainer.appendChild(headerEl);

    // =============================================================
    // KLÆBENDE HÆNGEBRO-SCENE (Aspect-ratio responsive SVG)
    // =============================================================
    const stageCard = document.createElement('div');
    stageCard.className = 'conjunction-stage-card';
    viewContainer.appendChild(stageCard);

    // =============================================================
    // INTERAKTIONS-OMRÅDE
    // =============================================================
    const taskArea = document.createElement('div');
    taskArea.className = 'conj-task-area';
    viewContainer.appendChild(taskArea);

    // -------------------------------------------------------------
    // RENDER: HÆNGEBRO-SCENEN MED KINETISKE EFFEKTER
    // -------------------------------------------------------------
    function renderStage() {
        const conj = getActiveConj();
        const activeColor = conj.color;
        const c1Text = getClause1();
        const c2Text = typeof conj.clause2Text === 'function' ? conj.clause2Text(c1Text) : conj.clause2Text;

        // Dynamiske kinetiske effekter over broen afhængigt af bindeordet
        let dynamicBridgeOverlay = '';

        if (conj.id === 'fordi') {
            dynamicBridgeOverlay = `
                <!-- FORDI: Grønne pulserende energipartikler og livsstrøm over broen -->
                <g class="bridge-energy-cause">
                    <!-- Strømlinje -->
                    <path d="M 125 78 Q 190 60 255 78" stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="10 6">
                        <animate attributeName="stroke-dashoffset" from="32" to="0" dur="0.9s" repeatCount="infinite"/>
                    </path>
                    <!-- Små grønne lysbobler -->
                    <circle cx="155" cy="71" r="3.5" fill="#4ade80">
                        <animate attributeName="cx" values="135; 245" dur="1.4s" repeatCount="infinite"/>
                        <animate attributeName="opacity" values="0.2; 1; 0.2" dur="1.4s" repeatCount="infinite"/>
                    </circle>
                    <circle cx="190" cy="65" r="2.8" fill="#86efac">
                        <animate attributeName="cx" values="140; 250" dur="1.7s" begin="0.4s" repeatCount="infinite"/>
                        <animate attributeName="opacity" values="0.3; 1; 0.3" dur="1.7s" begin="0.4s" repeatCount="infinite"/>
                    </circle>
                </g>
            `;
        } else if (conj.id === 'derfor') {
            dynamicBridgeOverlay = `
                <!-- DERFOR: Gyldent fremadrettet lyn / konsekvens-stråle (Inversion V-S) -->
                <g class="bridge-consequence-bolt">
                    <line x1="125" y1="78" x2="255" y2="78" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="14 8">
                        <animate attributeName="stroke-dashoffset" from="44" to="0" dur="0.65s" repeatCount="infinite"/>
                    </line>
                    <!-- Ekspanderende konsekvens-ring ved målet -->
                    <circle cx="255" cy="78" r="8" fill="none" stroke="#fbbf24" stroke-width="2">
                        <animate attributeName="r" values="4; 16; 4" dur="1.2s" repeatCount="infinite"/>
                        <animate attributeName="opacity" values="0.9; 0.1; 0.9" dur="1.2s" repeatCount="infinite"/>
                    </circle>
                </g>
            `;
        } else if (conj.id === 'når') {
            dynamicBridgeOverlay = `
                <!-- NÅR: Himmelblåt pulserende ur og fremadrettede tidsbølger -->
                <g class="bridge-time-wave">
                    <path d="M 125 78 Q 190 62 255 78" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="8 6">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.2s" repeatCount="infinite"/>
                    </path>
                    <!-- Roterende tids-ur over broen -->
                    <g transform="translate(190, 50)">
                        <circle cx="0" cy="0" r="10" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="1.6"/>
                        <line x1="0" y1="0" x2="0" y2="-6" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round">
                            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="infinite"/>
                        </line>
                        <line x1="0" y1="0" x2="4" y2="0" stroke="#fcd34d" stroke-width="1.4" stroke-linecap="round">
                            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="infinite"/>
                        </line>
                    </g>
                </g>
            `;
        } else if (conj.id === 'da') {
            dynamicBridgeOverlay = `
                <!-- DA: Indigo tidsanker der peger bagud mod datiden (dengang) -->
                <g class="bridge-past-anchor">
                    <line x1="125" y1="78" x2="255" y2="78" stroke="#818cf8" stroke-width="2.5" stroke-dasharray="6 6" opacity="0.6"/>
                    <!-- Anker i fortiden mod venstre -->
                    <g transform="translate(145, 54)">
                        <circle cx="0" cy="0" r="8" fill="rgba(15, 23, 42, 0.9)" stroke="#a5b4fc" stroke-width="1.5"/>
                        <text x="0" y="3" font-size="8" fill="#e0e7ff" text-anchor="middle" font-weight="900">DATID</text>
                        <!-- Pilen peger bagud mod venstre -->
                        <path d="M -8 14 L -16 14 L -12 10 M -16 14 L -12 18" stroke="#818cf8" stroke-width="2" fill="none" stroke-linecap="round"/>
                    </g>
                </g>
            `;
        } else if (conj.id === 'selvom') {
            dynamicBridgeOverlay = `
                <!-- SELVOM: Pink kraftfelt der gennembryder en lodret mur uden at standse -->
                <g class="bridge-barrier-break">
                    <!-- Mur/forhindring i midten -->
                    <rect x="187" y="58" width="6" height="36" rx="2" fill="#991b1b" stroke="#f87171" stroke-width="1" opacity="0.8"/>
                    <!-- Gennembrydende energistråle -->
                    <line x1="125" y1="78" x2="255" y2="78" stroke="#ec4899" stroke-width="4" stroke-linecap="round">
                        <animate attributeName="stroke-dasharray" values="0,200; 130,0" dur="1.2s" repeatCount="infinite"/>
                    </line>
                    <!-- Gnister ved gennembrud -->
                    <circle cx="190" cy="78" r="7" fill="none" stroke="#f472b6" stroke-width="2">
                        <animate attributeName="r" values="3; 14; 3" dur="0.8s" repeatCount="infinite"/>
                        <animate attributeName="opacity" values="1; 0.2; 1" dur="0.8s" repeatCount="infinite"/>
                    </circle>
                </g>
            `;
        } else if (conj.id === 'men') {
            dynamicBridgeOverlay = `
                <!-- MEN: Modgående røde pile der mødes i skarp kontrastmidte -->
                <g class="bridge-contrast-collision">
                    <line x1="125" y1="75" x2="182" y2="75" stroke="#ef4444" stroke-width="3" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="infinite"/>
                    </line>
                    <line x1="255" y1="81" x2="198" y2="81" stroke="#f87171" stroke-width="3" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" from="-20" to="0" dur="0.8s" repeatCount="infinite"/>
                    </line>
                    <!-- Kontrast-mærke i midten -->
                    <polygon points="190,66 195,78 190,90 185,78" fill="#ef4444">
                        <animate attributeName="transform" type="scale" values="0.9; 1.25; 0.9" dur="1s" repeatCount="infinite"/>
                    </polygon>
                </g>
            `;
        } else if (conj.id === 'og') {
            dynamicBridgeOverlay = `
                <!-- OG: Harmonisk turkis dobbelt-strøm der ubesværet binder sammen -->
                <g class="bridge-harmony-and">
                    <path d="M 125 74 Q 190 62 255 74" stroke="#14b8a6" stroke-width="2.5" fill="none" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.5s" repeatCount="infinite"/>
                    </path>
                    <path d="M 125 82 Q 190 92 255 82" stroke="#2dd4bf" stroke-width="2.5" fill="none" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.5s" repeatCount="infinite"/>
                    </path>
                </g>
            `;
        } else if (conj.id === 'så') {
            dynamicBridgeOverlay = `
                <!-- SÅ: Violet fokuseret sigtelinje mod en fremtidig måltavle -->
                <g class="bridge-target-goal">
                    <line x1="125" y1="78" x2="255" y2="78" stroke="#a855f7" stroke-width="3.5" stroke-dasharray="10 4" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.85s" repeatCount="infinite"/>
                    </line>
                    <!-- Måltavle ved højre ø -->
                    <circle cx="255" cy="78" r="8" fill="none" stroke="#c084fc" stroke-width="2"/>
                    <circle cx="255" cy="78" r="4" fill="#a855f7"/>
                </g>
            `;
        }

        stageCard.innerHTML = `
            <div class="stage-frame-wrapper" style="--conj-accent: ${activeColor};">
                <!-- SVG SCENE (380x136) -->
                <div class="stage-svg-body">
                    <svg class="conjunction-svg-fluid" viewBox="0 0 380 136" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="conjSkyGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#090d1a"/>
                                <stop offset="70%" stop-color="#1e293b"/>
                                <stop offset="100%" stop-color="#0f172a"/>
                            </linearGradient>
                            <linearGradient id="cliffGradLeft" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stop-color="#1e293b"/>
                                <stop offset="100%" stop-color="#0f172a"/>
                            </linearGradient>
                            <linearGradient id="cliffGradRight" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stop-color="#1e293b"/>
                                <stop offset="100%" stop-color="#0f172a"/>
                            </linearGradient>
                            <filter id="bridgeGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                            </filter>
                        </defs>

                        <!-- Himmel / baggrund -->
                        <rect x="0" y="0" width="380" height="136" rx="12" fill="url(#conjSkyGrad)"/>

                        <!-- Afgrund / dyb slugt under broen -->
                        <path d="M 115 136 Q 190 120 265 136 Z" fill="#030712" opacity="0.7"/>

                        <!-- VENSTRE Ø / FUNDAMENT (Hovedsætning) -->
                        <path d="M 0 88 Q 60 84 115 88 L 125 136 L 0 136 Z" fill="url(#cliffGradLeft)"/>
                        <line x1="0" y1="88" x2="115" y2="88" stroke="#38bdf8" stroke-width="1.8" opacity="0.6"/>

                        <!-- HØJRE Ø / FUNDAMENT (Bisætning / Konsekvens) -->
                        <path d="M 265 88 Q 320 84 380 88 L 380 136 L 255 136 Z" fill="url(#cliffGradRight)"/>
                        <line x1="265" y1="88" x2="380" y2="88" stroke="${activeColor}" stroke-width="1.8" opacity="0.7"/>

                        <!-- HÆNGEBROENS HOVEDSTRUKTUR -->
                        <!-- Pylon Venstre -->
                        <line x1="115" y1="38" x2="115" y2="105" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
                        <circle cx="115" cy="38" r="4.5" fill="#94a3b8"/>

                        <!-- Pylon Højre -->
                        <line x1="265" y1="38" x2="265" y2="105" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
                        <circle cx="265" cy="38" r="4.5" fill="#94a3b8"/>

                        <!-- Vejbane henover broen -->
                        <line x1="115" y1="78" x2="265" y2="78" stroke="#334155" stroke-width="3.5" stroke-linecap="round"/>

                        <!-- Hovedkabel i elegant parabel -->
                        <path d="M 115 38 Q 190 70 265 38" fill="none" stroke="${activeColor}" stroke-width="2" opacity="0.85"/>
                        <!-- Vertikale hængeliner -->
                        <line x1="140" y1="49" x2="140" y2="78" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
                        <line x1="165" y1="60" x2="165" y2="78" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
                        <line x1="215" y1="60" x2="215" y2="78" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
                        <line x1="240" y1="49" x2="240" y2="78" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>

                        <!-- DYNAMISKE KINETISKE EFFEKTER HENOVER BROEN -->
                        ${dynamicBridgeOverlay}

                        <!-- MIDTER-SKILT MED KONJUNKTIONEN -->
                        <g class="bridge-center-sign" transform="translate(190, 78)">
                            <!-- Glødende plade med konjunktionens farve -->
                            <rect x="-38" y="-13" width="76" height="26" rx="8" fill="rgba(15, 23, 42, 0.96)" stroke="${activeColor}" stroke-width="1.8">
                                <animate attributeName="stroke-opacity" values="0.7; 1; 0.7" dur="2s" repeatCount="infinite"/>
                            </rect>
                            <text x="0" y="4" fill="${activeColor}" font-size="12.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">
                                ${conj.word}
                            </text>
                            <text x="0" y="-16" fill="#94a3b8" font-size="7.5" font-weight="800" text-anchor="middle">
                                BRO-LED
                            </text>
                        </g>

                        <!-- VENSTRE INDHOLD: BARNET VED BORDET (Handlingen) -->
                        <g class="character-left-island" transform="translate(60, 32)">
                            <!-- Hoved -->
                            <circle cx="0" cy="11" r="7" fill="#f8fafc"/>
                            <!-- Krop -->
                            <path d="M -6 19 Q 0 17 6 19 L 7 38 L -7 38 Z" fill="#0284c7" rx="2.5"/>
                            <!-- Ben -->
                            <line x1="-3" y1="38" x2="-3" y2="56" stroke="#f8fafc" stroke-width="2.2" stroke-linecap="round"/>
                            <line x1="3" y1="38" x2="3" y2="56" stroke="#f8fafc" stroke-width="2.2" stroke-linecap="round"/>
                            
                            <!-- Bord med mad -->
                            <rect x="10" y="32" width="22" height="8" rx="2" fill="#78350f"/>
                            <circle cx="21" cy="29" r="3.5" fill="#f59e0b"/>

                            <!-- Navnemærke -->
                            <text x="0" y="70" fill="#ffffff" font-size="11.5" font-weight="900" text-anchor="middle">
                                ${state.nounAnchor} ${state.selectedNoun}
                            </text>
                            <text x="0" y="81" fill="#38bdf8" font-size="8" font-weight="700" text-anchor="middle">
                                [Hovedsætning]
                            </text>
                        </g>

                        <!-- HØJRE INDHOLD: FORKLARINGEN / MÅLET (Bisætningen) -->
                        <g class="target-right-island" transform="translate(320, 36)">
                            <!-- Ikon / Illustration for forklaringen -->
                            <circle cx="0" cy="12" r="16" fill="rgba(15, 23, 42, 0.9)" stroke="${activeColor}" stroke-width="1.8"/>
                            <text x="0" y="18" font-size="15" text-anchor="middle">${conj.icon}</text>

                            <!-- Navnemærke for 2. sætningsled -->
                            <text x="0" y="66" fill="${activeColor}" font-size="11.5" font-weight="900" text-anchor="middle">
                                "${c2Text}"
                            </text>
                            <text x="0" y="78" fill="#cbd5e1" font-size="8" font-weight="700" text-anchor="middle">
                                [${conj.role}]
                            </text>
                        </g>

                        <!-- TOP STATUS BADGE -->
                        <g class="stage-top-badge" transform="translate(190, 14)">
                            <rect x="-115" y="-10" width="230" height="20" rx="10" fill="rgba(15, 23, 42, 0.94)" stroke="${activeColor}" stroke-width="1.3">
                                <animate attributeName="stroke-opacity" values="0.6; 1; 0.6" dur="2s" repeatCount="infinite"/>
                            </rect>
                            <text x="0" y="4" fill="${activeColor}" font-size="9.5" font-weight="900" text-anchor="middle">
                                ${conj.icon} Bro: "${conj.word}" (${conj.badge})
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
    // RENDER: INTERAKTIONS-OMRÅDET (KORT, ORDSTILLINGS-RADAR & STI)
    // -------------------------------------------------------------
    function renderInteractionArea() {
        taskArea.innerHTML = '';
        const conj = getActiveConj();
        const c1Text = getClause1();
        const c2Text = typeof conj.clause2Text === 'function' ? conj.clause2Text(c1Text) : conj.clause2Text;

        const box = document.createElement('div');
        box.className = 'conjunction-interactive-box';

        // Gruppér i 4 pædagogiske familier
        const categories = [
            { key: 'cause', title: 'Årsag & Følge', icon: '🌱' },
            { key: 'time', title: 'Tid & Tidsfæstelse', icon: '⏰' },
            { key: 'contrast', title: 'Forhindring & Kontrast', icon: '🛡️' },
            { key: 'connect', title: 'Forbindelse & Hensigt', icon: '🌉' }
        ];

        let cardsHtml = '';
        categories.forEach(cat => {
            const items = Object.values(CONJUNCTIONS).filter(c => c.category === cat.key);
            cardsHtml += `
                <div class="conj-category-group">
                    <div class="category-header-title">
                        <span>${cat.icon}</span>
                        <span>${cat.title}</span>
                    </div>
                    <div class="conj-cards-grid">
                        ${items.map(item => {
                            const isActive = item.id === state.selectedConjId;
                            return `
                                <button type="button" 
                                        class="conj-card-btn ${isActive ? 'active-card' : ''}" 
                                        data-conj="${item.id}"
                                        style="--card-accent: ${item.color};">
                                    <div class="card-head">
                                        <span class="card-icon">${item.icon}</span>
                                        <span class="card-word" style="color: ${isActive ? item.color : '#ffffff'};">${item.word}</span>
                                    </div>
                                    <div class="card-badge" style="color: ${item.color};">${item.badge}</div>
                                    <div class="card-desc">${item.role}</div>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });

        box.innerHTML = `
            <div class="task-head-instructions">
                <h2 class="task-step-h2">Vælg et bindeord for at bygge broen:</h2>
                <p class="task-step-p">
                    Tryk på et bindeord for at se, hvordan det forbinder barnets handling med årsag, tid eller modsætning:
                </p>
            </div>

            <!-- DE 4 FAMILIER MED DE 8 BINDEORD -->
            ${cardsHtml}

            <!-- KOGNITIV FORKLARINGSBOKS -->
            <div class="conj-explanation-card">
                <div class="expl-icon-side">${conj.icon}</div>
                <div class="expl-body-side">
                    <h3 style="color: ${conj.color}; font-size: 1.05rem; font-weight: 800; margin: 0 0 0.3rem;">
                        Kognitiv funktion: ${conj.word}
                    </h3>
                    <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.45; margin: 0 0 0.6rem;">
                        ${conj.cognitiveVisualDesc}
                    </p>
                    <div class="expl-sentence-preview">
                        <strong>Fuldt eksempel:</strong> "${getFullSentence()}"
                    </div>
                </div>
            </div>

            <!-- ========================================================= -->
            <!-- NUVÆRENDE SÆTNING PÅ DETTE TRIN: HELE REJSEN ER SAMLET    -->
            <!-- ========================================================= -->
            <div class="current-sentence-badge-box">
                <span class="cs-label">Din fulde sætning er bygget:</span>
                <div class="cs-sentence-row">
                    ${renderColoredSentenceSpans(conj, c2Text)}
                </div>
                <div class="cs-tags-legend">
                    <span class="legend-pill tag-subjekt-pill"><span class="legend-dot" style="background:#22c55e;"></span> Subjekt (Grøn)</span>
                    <span class="legend-pill tag-adjektiv-pill"><span class="legend-dot" style="background:#f97316;"></span> Adjektiv (Orange)</span>
                    <span class="legend-pill tag-verbum-pill"><span class="legend-dot" style="background:#ef4444;"></span> Verber (Rød)</span>
                    <span class="legend-pill tag-adverbium-pill"><span class="legend-dot" style="background:#eab308;"></span> Adverbium (Gul)</span>
                    <span class="legend-pill tag-konjunktion-pill"><span class="legend-dot" style="background:#a855f7;"></span> Konjunktion (Lilla)</span>
                </div>
            </div>

            <!-- RELEVANT LINK TIL ORDSTILLINGSFLADEN: DEL 4 (UDVIDET MODEL) -->
            <div class="ordstilling-bridge-link-card">
                <div class="obl-left">
                    <span class="obl-icon">📐</span>
                    <div class="obl-text">
                        <span class="obl-badge">Ordstilling</span>
                        <div class="obl-title">Ledsætninger & Udvidet Model (Del 4)</div>
                        <div class="obl-desc">Lær hvordan konjunktioner, ledsætninger og inversionsregler placeres i sætningsskemaet.</div>
                    </div>
                </div>
                <a href="#/${getLang()}/ordstilling_intro/part4" class="btn-goto-ordstilling" id="btn-link-ordstilling-conj">
                    <span>Gå til Ordstilling (Del 4) ➔</span>
                </a>
            </div>

            <!-- TRÆNINGSAKTIONER -->
            <div class="conjunction-actions-container">
                <button type="button" class="btn-launch-training" id="btn-goto-conjunction-exercises">
                    <span>Træn konjunktioner i øvelser ➔</span>
                </button>
                <div class="secondary-actions-row">
                    <button type="button" class="btn-secondary-link" id="btn-restart-grammar">
                        <span>↺ Start forfra på grammatik-stien</span>
                    </button>
                    <button type="button" class="btn-secondary-link" id="btn-goto-daily">
                        <span>Lær grammatik 🎯</span>
                    </button>
                </div>
            </div>
        `;

        // Klik på konjunktions-kort
        box.querySelectorAll('.conj-card-btn').forEach(btn => {
            btn.onclick = () => {
                const chosen = btn.dataset.conj;
                state.selectedConjId = chosen;
                speakDanish(chosen);
                refreshUI();
            };
        });

        // Ordstilling link
        const btnOrdstilling = box.querySelector('#btn-link-ordstilling-conj');
        if (btnOrdstilling) {
            btnOrdstilling.onclick = (e) => {
                e.preventDefault();
                navigateFn('ordstilling_intro', { subPath: 'part4' });
            };
        }

        // Link til øvelser
        box.querySelector('#btn-goto-conjunction-exercises').onclick = () => {
            navigateFn('conjunction_choice');
        };

        // Genstart grammatik-sti
        box.querySelector('#btn-restart-grammar').onclick = () => {
            navigateFn('grounding');
        };

        // Dagens opgave
        box.querySelector('#btn-goto-daily').onclick = () => {
            navigateFn('dagens_opgave');
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
    const oldStyles = document.getElementById('conjunction-mobile-styles');
    if (oldStyles) oldStyles.remove();
    const oldBridgeStyles = document.getElementById('conj-bridge-styles');
    if (oldBridgeStyles) oldBridgeStyles.remove();

    const style = document.createElement('style');
    style.id = 'conjunction-mobile-styles';
    style.textContent = `
        .conjunction-mobile-view {
            width: 100% !important;
            max-width: 760px !important;
            margin: 0 auto;
            padding: 0 0.2rem 3rem !important;
            box-sizing: border-box;
            color: #f8fafc;
        }

        .conjunction-mobile-view .top-bar {
            margin-bottom: 0.35rem !important;
        }

        .conjunction-mobile-view .grammar-nav-menu {
            margin-bottom: 0.5rem !important;
            padding: 0.25rem 0 !important;
        }

        /* Hero */
        .conjunction-hero-compact {
            text-align: center;
            margin-bottom: 0.75rem;
            padding: 0 0.4rem;
            width: 100%;
            box-sizing: border-box;
        }
        .conj-step-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.35);
            padding: 0.2rem 0.65rem;
            border-radius: 9999px;
            font-size: 0.76rem;
            font-weight: 700;
            color: #4ade80;
            margin-bottom: 0.35rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .badge-dot-live {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #4ade80;
            box-shadow: 0 0 6px #4ade80;
        }
        .conj-main-title {
            font-size: 1.45rem;
            font-weight: 800;
            margin: 0 0 0.25rem;
            color: #ffffff;
            line-height: 1.25;
        }
        .conj-sub-desc {
            color: #cbd5e1;
            font-size: 0.92rem;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.4;
        }

        /* KLÆBENDE SCENE-RAMME (SMART STICKY HUD) */
        .conjunction-stage-card {
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
            border-color: var(--conj-accent, #22c55e) !important;
            box-shadow: 0 0 25px var(--conj-accent, rgba(34, 197, 94, 0.6)) !important;
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

        .conjunction-svg-fluid {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Sætningsbånd */
        .conj-sentence-strip-card {
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
            transition: all 0.2s;
        }
        .btn-tts-listen:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        .strip-blocks-row {
            display: flex;
            gap: 0.4rem;
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
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.2s ease;
        }
        .strip-block.block-clause1 {
            flex: 1.2;
            background: rgba(2, 132, 199, 0.12);
            border-color: rgba(56, 189, 248, 0.4);
        }
        .strip-block.block-conjunction {
            flex: 0.9;
        }
        .strip-block.block-clause2 {
            flex: 1.2;
            background: rgba(255, 255, 255, 0.03);
        }
        .block-word {
            font-size: 0.98rem;
            font-weight: 800;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }
        .block-role {
            font-size: 0.68rem;
            font-weight: 700;
            color: #94a3b8;
            margin-top: 0.15rem;
            white-space: nowrap;
        }

        /* Interaktionsområde */
        .task-head-instructions {
            margin-bottom: 0.85rem;
            padding: 0 0.2rem;
        }
        .task-step-h2 {
            font-size: 1.2rem;
            font-weight: 800;
            color: white;
            margin: 0 0 0.25rem;
            line-height: 1.3;
        }
        .task-step-p {
            color: #cbd5e1;
            font-size: 0.9rem;
            margin: 0;
            line-height: 1.4;
        }

        /* 4 Kategori-grupper */
        .conj-category-group {
            margin-bottom: 1.15rem;
        }
        .category-header-title {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            margin-bottom: 0.45rem;
            padding: 0 0.2rem;
        }
        .conj-cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.65rem;
            width: 100%;
            box-sizing: border-box;
        }
        .conj-card-btn {
            background: #0f172a;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 12px;
            padding: 0.7rem 0.65rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            width: 100%;
            box-sizing: border-box;
        }
        .conj-card-btn:hover {
            border-color: var(--card-accent);
            background: rgba(255, 255, 255, 0.05);
        }
        .conj-card-btn.active-card {
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
            font-size: 1.25rem;
            font-weight: 900;
        }
        .card-badge {
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.02em;
        }
        .card-desc {
            font-size: 0.74rem;
            color: #94a3b8;
            line-height: 1.3;
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

        /* Kognitiv forklaringsboks */
        .conj-explanation-card {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.85rem 1rem;
            margin-bottom: 1.35rem;
            display: flex;
            gap: 0.75rem;
            align-items: flex-start;
            box-sizing: border-box;
        }
        .expl-icon-side {
            font-size: 1.5rem;
            flex-shrink: 0;
            margin-top: 0.1rem;
        }
        .expl-body-side {
            flex: 1;
        }
        .expl-sentence-preview {
            background: rgba(0, 0, 0, 0.35);
            border-left: 3px solid var(--conj-accent, #22c55e);
            padding: 0.45rem 0.65rem;
            border-radius: 6px;
            font-size: 0.88rem;
            color: #f8fafc;
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
            font-size: 1.35rem;
            font-weight: 900;
            color: #ffffff;
            line-height: 1.4;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.35rem;
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

        /* Træningsaktioner */
        .conjunction-actions-container {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 1rem;
        }
        .btn-launch-training {
            width: 100%;
            background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
            color: white;
            border: none;
            padding: 0.95rem 1.2rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(34, 197, 94, 0.35);
            transition: all 0.2s ease;
            text-align: center;
            box-sizing: border-box;
        }
        .btn-launch-training:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 22px rgba(34, 197, 94, 0.5);
        }
        .secondary-actions-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
        }
        .btn-secondary-link {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #e2e8f0;
            padding: 0.65rem 0.5rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        @media (max-width: 640px) {
            .conjunction-bridge-view { padding: 0 0.25rem 2.5rem !important; }
            .stage-sticky-bar { padding-right: 94px !important; }
            .secondary-actions-row { grid-template-columns: 1fr; }
        }
    `;
    document.head.appendChild(style);
}
